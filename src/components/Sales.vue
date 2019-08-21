<template>
  <v-container id="sales">
    <div class="display-3">Sold Units</div>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Sales Associate</th>
          <th class="text-left">Customer Name</th>
          <th class="text-left">Type of Vehicle</th>
          <th class="text-left">Stock #</th>
          <th class="text-left">Year</th>
          <th class="text-left">Model</th>
          <th class="text-left">Deal #</th>
          <th class="text-left">Customer Care Package</th>
          <th class="text-left">Accessories</th>
          <th class="text-left">List of Accessories</th>
          <th class="text-left">Customer Status</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(req, i) in reqs" :key="i">
          <!-- Request number in queue -->
          <td>{{ i + 1 }}</td>
          <!-- Associates Name + Avatar -->
          <td>
            <v-avatar size="36">
              <img :src="req.photo_url" alt="user" />
            </v-avatar>
            {{ req.associate }}
          </td>
          <!-- Customer Name -->
          <td>{{ req.customer_name }}</td>
          <!-- Vehicle Type -->
          <td>{{ req.vehicle_type }}</td>
          <!-- Stock Number -->
          <td>{{ req.stock_number }}</td>
          <!-- Vehicle Year -->
          <td>{{ req.vehicle_year }}</td>
          <!-- Vehicle Model -->
          <td>{{ req.vehicle_model }}</td>
          <!-- Deal Number -->
          <td>{{ req.deal_number }}</td>
          <!-- Customer Care Package Options -->
          <td v-if="req.customer_care_package === 'Yes'">
            <v-chip color="success">{{ req.customer_care_package }}</v-chip>
          </td>
          <td v-if="req.customer_care_package === 'No'">
            <v-chip color="error">{{ req.customer_care_package }}</v-chip>
          </td>

          <!-- Accessories Options -->
          <td v-if="req.accessories == 'Yes'">
            <v-chip color="success">{{ req.accessories }}</v-chip>
          </td>
          <td v-if="req.accessories == 'No'">
            <v-chip color="error">{{ req.accessories }}</v-chip>
          </td>

          <!-- List accessories options -->
          <td v-if="req.accessories == 'Yes'">{{ req.list_accessories }}</td>
          <td v-if="req.accessories == 'No'">No additional accessories were sold</td>

          <!-- Customer Status Options -->
          <td v-if="req.customer_status =='Customer Is Here Waiting'">
            <v-chip color="success">Waiter</v-chip>
          </td>
          <td v-if="req.customer_status =='Customer Is Coming In Later'">
            <v-chip color="yellow">Later</v-chip>
          </td>
          <td v-if="req.customer_status =='Customer Is Not Coming In'">
            <v-chip color="error">Never</v-chip>
          </td>
          <td>
            <v-btn
              @click="makeReady(req)"
              v-if="!req.make_ready_init_timestamp"
              color="info"
            >Make Ready</v-btn>
            <v-btn v-if="req.make_ready_init_timestamp" disabled color="info">Make Ready</v-btn>
            <v-btn
              disabled
              v-if="req.finance_init_timestamp"
              @click="finance(req)"
              color="error"
            >Finance</v-btn>
            <v-btn v-if="!req.finance_init_timestamp" @click="finance(req)" color="error">Finance</v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    <div class="display-3 bottom">We Owes</div>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Sales Associate</th>
          <th class="text-left">Type of Vehicle</th>
          <th class="text-left">Stock #</th>
          <th class="text-left">Accessories</th>
          <th class="text-left">Price</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(weowe, i) in weowes" :key="i">
          <td>{{ i + 1 }}</td>
          <td>
            <v-avatar size="36">
              <img :src="weowe.photo_url" alt="user" />
            </v-avatar>
            {{ weowe.associate }}
          </td>
          <td>{{ weowe.vehicle_type }}</td>
          <td>{{ weowe.stock_number }}</td>
          <td>{{ weowe.list_accessories }}</td>
          <td>{{ weowe.quote_price }}</td>
          <td>
            <v-btn color="success" @click="approveWeOwe(weowe)">Approve</v-btn>
            <v-btn color="error" @click="denyWeOwe(weowe)">Deny</v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
import { db } from "../main";
import firebase from "firebase";

export default {
  name: "Sales",
  data() {
    return {
      weowes: [],
      reqs: [],
      status: ["Approved", "Denied"],
      user: firebase.auth().currentUser.displayName,
      photo: firebase.auth().currentUser.photoURL
    };
  },
  firestore() {
    return {
      reqs: db
        .collection("makeReady")
        .where("sales_state", "==", true)
        .orderBy("initial_timestamp", "desc"),
      weowes: db
        .collection("weowe")
        .where("sales_state", "==", "Waiting for Approval")
        .orderBy("initial_timestamp", "desc")
    };
  },
  methods: {
    approveWeOwe(wo) {
      db.collection("weowe")
        .doc(wo.id)
        .update({
          sales_completion_timestamp: new Date(),
          sales_state: "Approved",
          sales_manager: this.user,
          parts_status: "Currently Waiting"
        });
    },
    denyWeOwe(wo) {
      db.collection("weowe")
        .doc(wo.id)
        .update({
          sales_completion_timestamp: new Date(),
          sales_state: "Denied",
          sales_manager: this.user,
          parts_status: "Denied",
          parts_state: false
        });
    },
    makeReady(req) {
      if (req.finance_state === true) {
        if (
          req.vehicle_type == "Pre-Owned" &&
          req.accessories == "No" &&
          req.customer_care_package == "No"
        ) {
          db.collection("makeReady")
            .doc(req.id)
            .update({
              make_ready_init_timestamp: new Date(),
              sales_manager: this.user,
              sales_manager_photo: this.photo,
              parts_state: false,
              detail_state: true,
              sales_state: false,
              parts_status: "Complete",
              detail_status: "Currently Waiting"
            });
        } else {
          db.collection("makeReady")
            .doc(req.id)
            .update({
              make_ready_init_timestamp: new Date(),
              sales_manager: this.user,
              sales_manager_photo: this.photo,
              parts_state: true,
              detail_state: true,
              sales_state: false,
              parts_status: "Currently Waiting",
              detail_status: "Currently Waiting"
            });
        }
      } else {
        if (
          req.vehicle_type == "Pre-Owned" &&
          req.accessories == "No" &&
          req.customer_care_package == "No"
        ) {
          db.collection("makeReady")
            .doc(req.id)
            .update({
              make_ready_init_timestamp: new Date(),
              sales_manager: this.user,
              sales_manager_photo: this.photo,
              parts_state: false,
              detail_state: true,
              parts_status: "Complete",
              detail_status: "Currently Waiting"
            });
        } else {
          db.collection("makeReady")
            .doc(req.id)
            .update({
              make_ready_init_timestamp: new Date(),
              sales_manager: this.user,
              sales_manager_photo: this.photo,
              parts_state: true,
              detail_state: true,
              parts_status: "Currently Waiting",
              detail_status: "Currently Waiting"
            });
        }
      }
    },
    finance(req) {
      if (
        req.detail_status == "Currently Waiting" ||
        req.detail_status == "Claimed" ||
        req.detail_status == "Complete"
      ) {
        db.collection("makeReady")
          .doc(req.id)
          .update({
            finance_init_timestamp: new Date(),
            finance_sales_manager: this.user,
            finance_sales_manager_pic: this.photo,
            finance_state: true,
            sales_state: false,
            sales_status: "Approved",
            finance_status: "Currently Waiting"
          });
      } else {
        db.collection("makeReady")
          .doc(req.id)
          .update({
            finance_init_timestamp: new Date(),
            finance_sales_manager: this.user,
            finance_sales_manager_pic: this.photo,
            finance_state: true,
            sales_status: "Approved",
            finance_status: "Currently Waiting"
          });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  margin-right: 10px;
}

.display-3 {
  margin-bottom: 40px;
  margin-top: 20px;
}

.bottom {
  margin-top: 100px;
}
</style>
