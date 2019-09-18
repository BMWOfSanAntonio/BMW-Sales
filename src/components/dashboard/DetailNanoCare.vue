<template>
  <div class="detail-nano-care">
    <h4 class="mt-2">Nano care</h4>
    <TableHeader />
    <tbody>
      <!-- // * Says that the request has a detail state of true and either detail or admin assess -->
      <tr v-for="(req, i) in detailNanoCare" :key="i">
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
        <!-- // * type of request -->
        <template>
          <!-- // * make ready -->
          <td v-if="req.detail">Make Ready</td>
        </template>
        <!-- // * Status -->
        <template>
          <td>Nano Care</td>
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
                <!-- // * Nano Care: this should only apprear if nano care was sold in finance -->
                <b-form-group
                  v-if="req.finance.nano_care == 'Yes'"
                  class="group"
                  id="nano-care"
                  label="Was the nano care applied to the vehicle?"
                  required
                >
                  <b-form-radio
                    v-model="req.detail.detail_complete_nano"
                    name="some-radios"
                    value="Yes"
                  >Yes, it was.</b-form-radio>
                  <b-form-radio
                    v-model="req.detail.detail_complete_nano"
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
      detailNanoCare: []
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
      db.collection("makeready")
        .doc(req.id)
        .update({
          "detail.detail_complete_nano": req.detail.detail_complete_nano,
          "status.detail_status": "Complete",
          "finance.nano_care": "Finished",
          "detail.nano_care_timestamp": Date.now()
        });
    },
    // * Other Methods
    updateCurrentTime: function() {
      if (this.$data.state == "started") {
        this.currentTime = Date.now();
      }
    },
    dateFormat(req) {
      return Math.floor(
        (this.currentTime - req.finance.nano_care_timestamp) / 60000
      );
    }
  },
  mounted() {
    this.interval = setInterval(this.updateCurrentTime, 1000);
    /* SmtpJS.com - v3.0.0 */
  },
  firestore() {
    return {
      detailNanoCare: db
        .collection("makeready")
        .where("finance.nano_care", "==", "Yes")
    };
  }
};
</script>

<style scoped>
.detail-nano-care {
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