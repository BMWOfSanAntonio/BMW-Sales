<template>
  <div class="detail">
    <h4 class="mt-2">Make Ready</h4>
    <TableHeader />
    <tbody>
      <!-- // * Says that the request has a detail state of true and either detail or admin assess -->
      <tr v-for="(req, i) in detailView" :key="i">
        <!-- // * index of the document -->
        <td>{{ i + 1 }}</td>
        <!-- // * date -->
        <td>{{ dateFormat(req) }} minutes</td>
        <!-- // * associate name -->
        <td>{{ req.userinfo.associate }}</td>
        <!-- // * customer's name -->
        <td>{{ req.data.customer_name }}</td>
        <!-- // * stock number -->
        <td>{{ req.data.stock_number }}</td>
        <!-- // * type of vehicle -->
        <td>{{ req.data.type_of_vehicle }}</td>
        <!-- // * type of request -->
        <template>
          <!-- // * make ready -->
          <td v-if="req.detail">Make Ready</td>
        </template>
        <!-- // * Status -->
        <template>
          <td v-if="req.status.detail_status !== 'Claimed'">Pending...</td>
          <td
            v-if="req.status.detail_status == 'Claimed'"
          >Claimed by {{ req.detail.detail_associate }}</td>
        </template>
        <td>
          <i v-b-modal="req.id" class="material-icons">info</i>
          <!-- // * Modal: Start -->
          <b-modal hide-footer centered size="lg" :id="req.id" title="More Information: ">
            <!-- // * ~~~ Deal infromation sections ~~~ -->
            <h5 class="ml-4">Make Ready Information:</h5>
            <ul>
              <li>
                <span>Customer Name:</span>
                {{ req.data.customer_name }}
              </li>
              <li>
                <span>Stock #:</span>
                {{ req.data.stock_number }}
              </li>
              <li>
                <span>Type of Vehicle:</span>
                {{ req.data.type_of_vehicle }}
              </li>
              <li>
                <span>Model:</span>
                {{ req.data.model }}
              </li>
              <li>
                <span>Year:</span>
                {{ req.data.year }}
              </li>
            </ul>
            <h5 class="ml-4">Notes:</h5>
            <ul>
              <li>
                <span>Notes for Detail:</span>
                {{ req.data.notes_detail }}
              </li>
              <!-- // * Front Plate Bracket -->
              <!-- // * if front bracket is yes -->
              <li v-if="req.data.front_plate == 'Yes'">
                <span>Front Plate Install:</span>
                Yes
              </li>
              <!-- // * if front bracket is no -->
              <li v-if="req.data.front_plate == 'No'">
                <span>Front Plate Install:</span>
                No
              </li>
              <!-- // * Nano Care -->
              <li v-if="req.finance.nano_care == 'Yes'">
                <span>Nano Care</span>
                Yes
              </li>
            </ul>
            <!-- // * Detail Required Information Form -->
            <template v-if="req.status.detail_status == 'Claimed'">
              <!-- // * Header -->
              <h5 class="ml-4">Required Information:</h5>
              <b-form @submit.prevent="complete(req)" class="ml-4">
                <!-- // * Front Plate Bracket Install: this should only apprear if the front license plate bracket is going to be installed on the vehicle. -->
                <b-form-group
                  v-if="req.data.front_plate == 'Yes'"
                  class="group"
                  id="front-plate"
                  label="Have you installed the customers front plate bracket?"
                  required
                >
                  <b-form-radio
                    v-model="req.detail.front_plate_install"
                    name="some-radios"
                    value="Yes"
                  >Yes, it was.</b-form-radio>
                  <b-form-radio
                    v-model="req.detail.front_plate_install"
                    name="some-radios"
                    value="No"
                  >No, it was not.</b-form-radio>
                </b-form-group>

                <!-- // * Delivery Bay: this should be where the car is parked. Should show up for every detail vehicle -->
                <b-form-group
                  class="group"
                  id="input-delivery-bay"
                  label="Which delivery bay did you park the car?"
                  label-for="delivery-bay"
                >
                  <b-form-select
                    id="delivery-bay"
                    v-model="req.detail.delivery_bay"
                    :options="$store.state.delivery"
                    required
                  ></b-form-select>
                </b-form-group>
                <hr />
                <!-- // * ~~~ Modal Buttons ~~~ -->
                <template>
                  <!-- // * Unclaim: should only show if req.status.detail_status is equal to 'Claimed' -->
                  <template v-if="req.status.detail_status == 'Claimed'">
                    <b-button @click="unclaim(req)" variant="danger">Unclaim</b-button>
                  </template>

                  <!-- // * Complete: should appear disabled until all fields have a value -->
                  <template v-if="req.status.detail_status == 'Claimed'">
                    <b-button type="submit" variant="success">Complete Request</b-button>
                  </template>
                </template>
              </b-form>
            </template>
            <!-- // * ~~~ Buttons ~~~ -->
            <!-- // * Claim: should show only when req.status.parts_status does not equal "Claimed" -->
            <template v-if="req.status.detail_status !== 'Claimed'">
              <b-button class="ml-4" @click="claim(req)" variant="success">Claim</b-button>
            </template>
          </b-modal>
          <!-- // * Modal: End -->
        </td>
      </tr>
    </tbody>
  </div>
</template>

<script>
// * Imports
import { db } from "../../main";
import firebase from "firebase";
import Dashboard from "./Dashboard";
import TableHeader from "./pieces/TableHeader";

export default {
  name: "Detail",
  props: ["req", "user", "id"],
  components: { TableHeader },
  data() {
    return {
      currentTime: Date.now(),
      state: "started",
      detailView: []
    };
  },
  methods: {
    claim(req) {
      db.collection("makeready")
        .doc(req.id)
        .update({
          "detail.detail_claimed_timestamp": Date.now(),
          "status.detail_status": "Claimed",
          "detail.detail_associate": this.user.display_name,
          "detail.detail_photo": firebase.auth().currentUser.photoURL
        });
    },
    unclaim(req) {
      db.collection("makeready")
        .doc(req.id)
        .update({
          "detail.detail_claimed_timestamp": "",
          "status.detail_status": "Pending...",
          "detail.detail_associate": "",
          "detail.detail_photo": ""
        });
    },
    complete(req) {
      if (
        // * If both finance and parts are finished with the vehicle it should be ready to drop off everyones view and be seen as complete.
        req.status.finance_status == "Complete" &&
        req.status.parts_status == "Complete"
      ) {
        db.collection("makeready")
          .doc(req.id)
          .update({
            "detail.detail_complete_timestamp": Date.now(),
            "status.detail_status": "Complete",
            "states.detail_state": false,
            "detail.detail_associate": this.user.display_name,
            "detail.detail_photo": firebase.auth().currentUser.photoURL,
            "detail.delivery_bay": req.detail.delivery_bay,
            "detail.front_plate_install": req.detail.front_plate_install,
            "states.request_state": false
          });
      } else {
        db.collection("makeready")
          .doc(req.id)
          .update({
            "detail.parts_complete_timestamp": Date.now(),
            "status.detail_status": "Complete",
            "states.detail_state": false,
            "parts.detail_associate": this.user.display_name,
            "parts.detail_photo": firebase.auth().currentUser.photoURL,
            "detail.delivery_bay": req.detail.delivery_bay,
            "detail.front_plate_install": req.detail.front_plate_install
          });
      }
    },
    // * Other Methods
    updateCurrentTime: function() {
      if (this.$data.state == "started") {
        this.currentTime = Date.now();
      }
    },
    dateFormat(req) {
      return Math.floor(
        (this.currentTime - req.sales.completion_makeready_timestamp) / 60000
      );
    }
  },
  mounted() {
    this.interval = setInterval(this.updateCurrentTime, 1000);
    /* SmtpJS.com - v3.0.0 */
  },
  firestore() {
    return {
      detailView: db
        .collection("makeready")
        .where("states.detail_state", "==", true)
        .orderBy("sales.completion_makeready_timestamp")
    };
  }
};
</script>

<style scoped>
.detail {
  display: inline-block;
}
/* //* Centers text in the table */
table {
  text-align: center;
}
span,
h5 {
  font-weight: bold;
}
</style>