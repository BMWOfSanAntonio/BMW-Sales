<template>
  <div class="parts">
    <h4 class="mt-2">Make Ready</h4>
    <TableHeader />
    <tbody>
      <tr
        v-for="(req, i) in partsView"
        :key="i"
        v-if="(req.data.type_of_vehicle == 'New' || (req.data.type_of_vehicle == 'Loaner' && req.data.ccp == 'Yes')) && req.states.parts_state == true"
      >
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
          <td v-if="req.status.parts_status !== 'Claimed'">Pending...</td>
          <td v-if="req.status.parts_status == 'Claimed'">Claimed by {{ user.display_name }}</td>
          <td v-if="req.status.parts_status == 'Complete'">Claimed by {{ user.display_name }}</td>
        </template>

        <td>
          <i v-b-modal="req.id" class="material-icons">info</i>
          <!-- // * Modal: Start -->
          <b-modal hide-footer centered size="lg" :id="req.id" title="More Information: ">
            <!-- // * ~~~ Deal infromation sections ~~~ -->
            <h5 class="ml-4">Make Ready Information:</h5>
            <ul>
              <li>
                <span>Sales Associate:</span>
                {{ req.userinfo.associate }}
              </li>
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
              <li>
                <span>Mileage:</span>
                {{ req.data.mileage }}
              </li>
              <li>
                <span>Deal #:</span>
                {{ req.data.deal_number }}
              </li>
            </ul>
            <h5 class="ml-4">Notes:</h5>
            <ul>
              <li>
                <span>Notes for Parts:</span>
                {{ req.data.notes_parts }}
              </li>
              <!-- // * Customer care package -->
              <!-- // * if ccp is yes -->
              <li v-if="req.data.ccp == 'Yes'">
                <span>Parts Needed:</span>
                Customer Care Package
              </li>
              <!-- // * if ccp is no -->
              <li v-if="req.data.ccp == 'No'">
                <span>Parts Needed:</span>
                Carpet Mats
              </li>
            </ul>
            <!-- // * Parts Required Information Form -->
            <template v-if="req.status.parts_status == 'Claimed'">
              <!-- // * Header -->
              <h5 class="ml-4">Required Information:</h5>
              <b-form @submit.prevent="complete(req)" class="ml-4">
                <!-- // * Afterhours Request: should only appear if the sales associate needs carpet mats, customer care packages should be billed out regardless -->
                <b-form-group
                  v-if="req.data.ccp == 'No'"
                  class="group"
                  id="afterhours"
                  label="Was this request received afterhours?"
                  required
                >
                  <b-form-radio
                    v-model="req.parts.afterhours"
                    name="some-radios"
                    value="Yes"
                  >Yes, it was.</b-form-radio>
                  <b-form-radio
                    v-model="req.parts.afterhours"
                    name="some-radios"
                    value="No"
                  >No, it was not.</b-form-radio>
                </b-form-group>

                <!-- // * Parts on Order: this should be for both the customer care package and the carpet mats -->
                <b-form-group
                  class="group"
                  id="parts_on_order"
                  label="Did any parts need to be ordered?"
                >
                  <b-form-radio
                    v-model="req.parts.parts_on_order"
                    name="some-other-radios"
                    value="Yes"
                    required
                  >Yes, parts needed to be ordered.</b-form-radio>
                  <b-form-radio
                    v-model="req.parts.parts_on_order"
                    name="some-other-radios"
                    value="No"
                    required
                  >No, parts did not need to be ordered.</b-form-radio>
                </b-form-group>

                <!-- // * Invoice Number: this should be for the customer care package only -->
                <b-form-group
                  v-if="req.data.ccp == 'Yes'"
                  class="group"
                  id="input-invoice-number"
                  label="Invoice Number:"
                  label-for="invoice-number"
                >
                  <b-form-input
                    id="invoice-number"
                    v-model="req.parts.invoice_number"
                    type="text"
                    required
                    placeholder="Please enter the invoice number here..."
                  ></b-form-input>
                </b-form-group>
                <hr />
                <!-- // * ~~~ Modal Buttons ~~~ -->
                <template>
                  <!-- // * Unclaim: should only show if req.status.parts_status is equal to 'Claimed' -->
                  <template v-if="req.status.parts_status == 'Claimed'">
                    <b-button @click="unclaim(req)" variant="danger">Unclaim</b-button>
                  </template>

                  <!-- // * Complete: should appear disabled until all fields have a value -->
                  <template v-if="req.status.parts_status == 'Claimed'">
                    <b-button type="submit" variant="success">Complete Request</b-button>
                  </template>
                </template>
              </b-form>
            </template>
            <!-- // * ~~~ Buttons ~~~ -->
            <!-- // * Claim: should show only when req.status.parts_status does not equal "Claimed" -->
            <template v-if="req.status.parts_status !== 'Claimed'">
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
  name: "Parts",
  props: ["req", "user", "id"],
  components: { TableHeader },
  data() {
    return {
      currentTime: Date.now(),
      state: "started",
      partsView: []
    };
  },
  methods: {
    claim(req) {
      db.collection("makeready")
        .doc(req.id)
        .update({
          "parts.parts_claimed_timestamp": Date.now(),
          "status.parts_status": "Claimed",
          "parts.parts_associate": this.user.display_name,
          "parts.parts_photo": firebase.auth().currentUser.photoURL
        });
    },
    unclaim(req) {
      db.collection("makeready")
        .doc(req.id)
        .update({
          "parts.parts_claimed_timestamp": "",
          "status.parts_status": "Pending...",
          "parts.parts_associate": "",
          "parts.parts_photo": ""
        });
    },
    complete(req) {
      if (
        // * If both finance and detail are finished with the vehicle it should be ready to drop off everyones view and be seen as complete.
        req.status.finance_state == false &&
        req.status.detail_state == false
      ) {
        db.collection("makeready")
          .doc(req.id)
          .update({
            "parts.parts_complete_timestamp": Date.now(),
            "status.parts_status": "Complete",
            "states.parts_state": false,
            "parts.parts_associate": this.user.display_name,
            "parts.parts_photo": firebase.auth().currentUser.photoURL,
            "parts.afterhours": req.parts.afterhours,
            "parts.invoice_number": req.parts.invoice_number,
            "parts.parts_on_order": req.parts.parts_on_order,
            "states.request_state": false
          });
      } else {
        db.collection("makeready")
          .doc(req.id)
          .update({
            "parts.parts_complete_timestamp": Date.now(),
            "status.parts_status": "Complete",
            "states.parts_state": false,
            "parts.parts_associate": this.user.display_name,
            "parts.parts_photo": firebase.auth().currentUser.photoURL,
            "parts.afterhours": req.parts.afterhours,
            "parts.invoice_number": req.parts.invoice_number,
            "parts.parts_on_order": req.parts.parts_on_order
          });
      }
      window.print();
    },
    // * Other Methods
    updateCurrentTime: function() {
      if (this.$data.state == "started") {
        this.currentTime = Date.now();
      }
    },
    dateFormat(req) {
      return Math.floor(
        (this.currentTime - req.sales.completion_timestamp) / 60000
      );
    }
  },
  mounted() {
    this.interval = setInterval(this.updateCurrentTime, 1000);
    /* SmtpJS.com - v3.0.0 */
  },
  firestore() {
    return {
      partsView: db
        .collection("makeready")
        .where("states.parts_state", "==", true)
    };
  }
};
</script>

<style scoped>
.parts {
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