<template>
  <div class="sales-manager-dashboard">
    <h4 class="mt-2">Make Ready</h4>
    <TableHeader />
    <tbody>
      <tr v-for="(req, i) in salesManagerView" :key="i">
        <!-- // * index of the document -->
        <td>{{ i + 1 }}</td>
        <!-- // * elapsed timer -->
        <td>{{ dateFormat(req) }} minutes</td>
        <!-- // * associate name -->
        <td>{{ req.userinfo.associate }}</td>
        <!-- // * customer's name -->
        <td>{{ req.data.customer_name }}</td>
        <!-- // * stock number -->
        <td>{{ req.data.stock_number }}</td>
        <!-- // * type of vehicle -->
        <td>{{ req.data.type_of_vehicle }}</td>
        <!-- // * type of requests -->
        <template>
          <td v-if="req.data.deal_number">Make Ready</td>
        </template>
        <!-- // * status -->
        <template>
          <!-- // ! if finance is approved & make ready is approved -->
          <td v-if="req.status.finance_status && req.status.parts_status">Finance Approved</td>
          <!-- // ! if make ready is approved -->
          <td v-else-if="req.status.parts_status">Make Ready Approved</td>
          <!-- // ! if finance is approved -->
          <td v-else-if="req.status.finance_status !== null">Finance Approved</td>
          <!-- // ! nothing is approved -->
          <td v-else-if="!req.status.parts_status">Pending...</td>
        </template>
        <td>
          <i v-b-modal="req.id" class="material-icons">info</i>
          <!-- // * Modal: Start -->
          <b-modal hide-footer centered size="lg" :id="req.id" title="More Information: ">
            <!-- // * ~~~ Deal infromation sections ~~~ -->
            <h5 class="ml-4">Deal Information:</h5>
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
              <!-- // * Sales Managers Notes -->
              <li>
                <span>Notes for Sales Managers:</span>
                {{ req.data.notes_sales_managers }}
              </li>
              <!-- // * Customer Care Package -->
              <li>
                <span>Customer Care Package:</span>
                {{ req.data.ccp }}
              </li>
            </ul>
            <hr />
            <div class="buttons">
              <!-- // * ~~~ Make Ready Button ~~~ -->
              <template>
                <!-- // * Stop the Deal: click this button will remove the deal from everyones view, it will also go into a special queue of deals that were stopped short. -->
                <template>
                  <b-button @click="kill(req)" variant="danger">Kill Deal</b-button>
                </template>

                <!-- // * Make Ready: before click -->
                <template v-if="!req.status.parts_status">
                  <b-button @click="startMakeReady(req)" variant="primary">Make Ready</b-button>
                </template>

                <!-- // * Make Ready: after click -->
                <template v-if="req.status.parts_status">
                  <b-button disabled variant="primary">Make Ready</b-button>
                </template>
              </template>

              <!-- // * Finance: before click -->
              <template v-if="!req.status.finance_status">
                <b-button class="text-light" @click="startFinance(req)" variant="warning">Finance</b-button>
              </template>
              <!-- // * Finance: after click -->
              <template v-if="req.status.finance_status">
                <b-button class="text-light" disabled variant="warning">Finance</b-button>
              </template>
            </div>
          </b-modal>
          <!-- // * Modal: End -->
        </td>
      </tr>
    </tbody>
  </div>
</template>

<script>
import { db } from "../../main";
import firebase from "firebase";
import TableHeader from "./pieces/TableHeader";

export default {
  name: "SalesManagerDashboard",
  props: ["req", "user", "id"],
  components: {
    TableHeader
  },
  data() {
    return {
      currentTime: Date.now(),
      state: "started",
      salesManagerView: []
    };
  },
  methods: {
    startMakeReady(req) {
      if (req.data.type_of_vehicle == "Pre-Owned") {
        // * If finance has been initiated , starts off at null, then the request will be removed from the sales managers view
        if (req.status.finance_status !== null) {
          db.collection("makeready")
            .doc(req.id)
            .update({
              "sales.completion_makeready_timestamp": Date.now(),
              "sales.sales_manager": this.user.display_name,
              "sales.sales_manager_photo": firebase.auth().currentUser.photoURL,
              "status.sales_status": "Make ready approved",
              "states.parts_state": false,
              "status.parts_status": "Complete",
              "states.detail_state": true,
              "status.detail_status": "Pending...",
              "states.sales_state": false
            });
          // * Else the make ready process will begin and the request will stay up until finance has been pushed through
        } else {
          db.collection("makeready")
            .doc(req.id)
            .update({
              "sales.completion_timestamp": Date.now(),
              "sales.sales_manager": this.user.display_name,
              "sales.sales_manager_photo": firebase.auth().currentUser.photoURL,
              "status.sales_status": "Make ready approved",
              "states.parts_state": false,
              "status.parts_status": "Complete",
              "states.detail_state": true,
              "status.detail_status": "Pending..."
            });
        }
      } else {
        // * If finance has been initiated , starts off at null, then the request will be removed from the sales managers view
        if (req.status.finance_status !== null) {
          db.collection("makeready")
            .doc(req.id)
            .update({
              "sales.completion_makeready_timestamp": Date.now(),
              "sales.sales_manager": this.user.display_name,
              "sales.sales_manager_photo": firebase.auth().currentUser.photoURL,
              "status.sales_status": "Make ready approved",
              "states.parts_state": true,
              "status.parts_status": "Pending...",
              "states.detail_state": true,
              "status.detail_status": "Pending...",
              "states.sales_state": false
            });
          // * Else the make ready process will begin and the request will stay up until finance has been pushed through
        } else {
          db.collection("makeready")
            .doc(req.id)
            .update({
              "sales.completion_timestamp": Date.now(),
              "sales.sales_manager": this.user.display_name,
              "sales.sales_manager_photo": firebase.auth().currentUser.photoURL,
              "status.sales_status": "Make ready approved",
              "states.parts_state": true,
              "status.parts_status": "Pending...",
              "states.detail_state": true,
              "status.detail_status": "Pending..."
            });
        }
      }
    },
    startFinance(req) {
      // * If the make ready process has already started then finance needs to remove the request from the sales manager view
      if (req.status.parts_status) {
        db.collection("makeready")
          .doc(req.id)
          .update({
            "sales.finance_completion_timestamp": Date.now(),
            "sales.finance_sales_manager": this.user.display_name,
            "sales.finance_sales_manager_photo": firebase.auth().currentUser
              .photoURL,
            "states.finance_state": true,
            "status.finance_status": "Pending...",
            "states.sales_state": false
          });
      } else {
        db.collection("makeready")
          .doc(req.id)
          .update({
            "sales.finance_completion_timestamp": Date.now(),
            "sales.finance_sales_manager": this.user.display_name,
            "sales.finance_sales_manager_photo": firebase.auth().currentUser
              .photoURL,
            "states.finance_state": true,
            "status.finance_status": "Pending..."
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
      return Math.floor((this.currentTime - req.initial_timestamp) / 60000);
    }
  },
  mounted() {
    this.interval = setInterval(this.updateCurrentTime, 1000);
    /* SmtpJS.com - v3.0.0 */
  },
  firestore() {
    return {
      salesManagerView: db
        .collection("makeready")
        .where("states.sales_state", "==", true)
        .orderBy("initial_timestamp")
    };
  }
};
</script>

<style scoped>
.sales-manager-dashboard {
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
.buttons {
  text-align: right;
}
</style>