<template>
  <div class="finance">
    <TableHeader />
    <tbody>
      <!-- // * Says that the request has a finance state of true and either finance or admin assess -->
      <tr v-for="(req, i) in financeView" :key="i">
        <!-- // * index of the document -->
        <td>{{ i + 1 }}</td>
        <!-- // * elapsed timer -->
        <td>
          <h5>
            <b-badge pill variant="info">{{ dateFormat(req) }} minutes</b-badge>
          </h5>
        </td>
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
        <!-- // * current status (multiple) -->
        <template>
          <td v-if="req.status.finance_status == 'Pending...'">{{ req.status.finance_status }}</td>
          <td
            v-if="req.status.finance_status == 'Claimed'"
          >{{ req.status.finance_status }} by {{ req.userinfo.associate }}</td>
        </template>
        <td>
          <i v-b-modal="req.id" class="material-icons">info</i>
          <!-- // * Modal: Start -->
          <b-modal hide-footer centered size="lg" :id="req.id" title="More Information: ">
            <!-- // * ~~~ Deal infromation sections ~~~ -->
            <h5 class="ml-4">Finance Information:</h5>
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
              <li>
                <span>Deal Number:</span>
                {{ req.data.deal_number }}
              </li>
            </ul>
            <h5 class="ml-4">Notes:</h5>
            <ul>
              <li>
                <span>Notes for Finance:</span>
                {{ req.data.notes_finance }}
              </li>
            </ul>
            <!-- // * Finance Required Information Form -->
            <template v-if="req.status.finance_status == 'Claimed'">
              <!-- // * Header -->
              <h5 class="ml-4">Required Information:</h5>
              <b-form @submit.prevent="complete(req)" class="ml-4">
                <!-- // * Nano Care: Asks the question if the finance associate sold  -->
                <b-form-group class="group" id="nano-care" label="Did you sell nano care?" required>
                  <b-form-radio
                    v-model="req.finance.nano_care"
                    name="some-other-radios"
                    value="Yes"
                  >Yes, I did.</b-form-radio>
                  <b-form-radio
                    v-model="req.finance.nano_care"
                    name="some-other-radios"
                    value="No"
                  >No, I did not.</b-form-radio>
                </b-form-group>

                <!-- // * Finance comments -->
                <b-row class="group">
                  <b-col sm="2">
                    <label for="finance-comments">Comments:</label>
                  </b-col>
                  <b-col sm="10">
                    <b-form-textarea
                      v-model="req.finance.comments"
                      id="finance-comments"
                      placeholder="Please enter any information you belive should be saved with this request..."
                    ></b-form-textarea>
                  </b-col>
                </b-row>
                <hr />
                <!-- // * ~~~ Modal Buttons ~~~ -->
                <template>
                  <!-- // TODO: Kill deal option -->
                  <!-- // * Kill Deal -->
                  <template>
                    <b-button @click="kill(req)" variant="danger">Kill Deal</b-button>
                  </template>

                  <!-- // * Unclaim: should only show if req.status.finance_status is equal to 'Claimed' -->
                  <template v-if="req.status.finance_status == 'Claimed'">
                    <b-button @click="unclaim(req)" variant="danger">Unclaim</b-button>
                  </template>

                  <!-- // * Reject incomplete deal folder -->
                  <template v-if="req.status.finance_status == 'Claimed'">
                    <b-button @click="reject(req)" variant="warning">Reject Deal Folder</b-button>
                  </template>

                  <!-- // * Complete: should appear disabled until all fields have a value -->
                  <template v-if="req.status.finance_status == 'Claimed'">
                    <b-button type="submit" variant="success">Complete Request</b-button>
                  </template>
                </template>
              </b-form>
            </template>
            <!-- // * ~~~ Buttons ~~~ -->
            <!-- // * Claim: should show only when req.status.finance_status does not equal "Claimed" -->
            <template v-if="req.status.finance_status !== 'Claimed'">
              <b-button class="ml-4" @click="claim(req)" variant="success">Claim</b-button>
            </template>
            <!-- // TODO: Customer left option -->
            <!-- <template v-if="req.status.finance_status !== 'Claimed'">
          <b-button class="ml-4" @click="claim(req)" variant="success">Claim</b-button>
            </template>-->
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
  components: {
    TableHeader
  },
  data() {
    return {
      currentTime: Date.now(),
      state: "started",
      financeView: []
    };
  },
  methods: {
    claim(req) {
      db.collection("makeready")
        .doc(req.id)
        .update({
          "finance.finance_claimed_timestamp": Date.now(),
          "status.finance_status": "Claimed",
          "finance.finance_associate": this.user.display_name,
          "finance.finance_photo": firebase.auth().currentUser.photoURL
        });
    },
    unclaim(req) {
      db.collection("makeready")
        .doc(req.id)
        .update({
          "finance.finance_claimed_timestamp": "",
          "status.finance_status": "Pending...",
          "finance.finance_associate": "",
          "finance.finance_photo": ""
        });
    },
    reject(req) {
      // * If the deal folder is incomplete then the request will go back to the sales manager to have to resend to finance.
      db.collection("makeready")
        .doc(req.id)
        .update({
          "sales.finance_completion_timestamp": "",
          "sales.finance_sales_manager": "",
          "sales.finance_sales_manager_photo": "",
          "states.finance_state": false,
          "status.finance_status": null,
          "states.sales_state": true
        });
    },
    complete(req) {
      if (
        // * If both detail and parts are finished with the vehicle it should be ready to drop off everyones view and be seen as complete.
        req.status.detail_status == "Complete" &&
        req.status.parts_status == "Complete"
      ) {
        db.collection("makeready")
          .doc(req.id)
          .update({
            "finance.finance_complete_timestamp": Date.now(),
            "status.finance_status": "Complete",
            "states.finance_state": false,
            "finance.finance_associate": this.user.display_name,
            "finance.finance_photo": firebase.auth().currentUser.photoURL,
            "finance.nano_care": req.finance.nano_care,
            "states.request_state": false
          });
      } else {
        db.collection("makeready")
          .doc(req.id)
          .update({
            "finance.finance_complete_timestamp": Date.now(),
            "status.finance_status": "Complete",
            "states.finance_state": false,
            "finance.finance_associate": this.user.display_name,
            "finance.finance_photo": firebase.auth().currentUser.photoURL,
            "finance.nano_care": req.finance.nano_care
          });
      }
    },
    kill(req) {
      db.collection("makeready")
        .doc(req.id)
        .update({
          "states.sales_state": false,
          "states.parts_state": false,
          "states.finance_state": false,
          "states.detail_state": false,
          "states.request_state": false,
          "status.overall_status": 0,
          "status.sales_status": "This request has been removed by a manager",
          "status.parts_status": "This request has been removed by a manager",
          "status.detail_status": "This request has been removed by a manager",
          "status.finance_status": "This request has been removed by a manager",
          "kill.associate": this.user.display_name,
          "kill.kill_time": Date.now()
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
        (this.currentTime - req.sales.finance_completion_timestamp) / 60000
      );
    }
  },
  mounted() {
    this.interval = setInterval(this.updateCurrentTime, 1000);
    /* SmtpJS.com - v3.0.0 */
  },
  firestore() {
    return {
      financeView: db
        .collection("makeready")
        .where("states.finance_state", "==", true)
        .orderBy("sales.completion_timestamp")
    };
  }
};
</script>

<style scoped>
.finance {
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