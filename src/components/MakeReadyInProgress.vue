<template>
  <v-container>
    <div class="display-3">In Progress Make Ready/Finance</div>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Sales Associate</th>
          <th class="text-left">Type of Vehicle</th>
          <th class="text-left">Stock #</th>
          <th class="text-left">Sales Make Ready Status</th>
          <th class="text-left">Sales Finance Status</th>
          <th class="text-left">Parts Status</th>
          <th class="text-left">Finance Status</th>
          <th class="text-left">Detail Status</th>
          <th class="text-left">Delivery Bay</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(req, i) in reqs" :key="i">
          <td>{{ i + 1 }}</td>
          <td>
            <v-avatar size="36">
              <img :src="req.photo_url" alt="user" />
            </v-avatar>
            {{ req.associate }}
          </td>
          <td>{{ req.vehicle_type }}</td>
          <td>{{ req.stock_number }}</td>
          <td v-if="!req.make_ready_init_timestamp">
            <v-chip color="yellow">Waiting for Approval</v-chip>
          </td>
          <td v-else-if="req.make_ready_init_timestamp !== ''">
            <v-chip color="success">
              Approved
              by
              {{ req.sales_manager }}
            </v-chip>
          </td>
          <td>
            <v-chip
              color="yellow"
              v-if="req.sales_status == 'Waiting for Approval'"
            >{{ req.sales_status }}</v-chip>
            <v-chip
              color="success"
              v-if="req.sales_status == 'Approved'"
            >{{ req.sales_status }} by {{ req.finance_sales_manager }}</v-chip>
          </td>
          <td>
            <v-chip color="yellow" v-if="req.parts_status == ''">Waiting for Approval</v-chip>
            <v-chip color="success" v-else-if="!req.parts_associate">No Parts Were Needed</v-chip>
            <v-chip
              color="yellow"
              v-else-if="req.parts_status == 'Currently Waiting'"
            >{{ req.parts_status }}</v-chip>
            <v-chip
              color="success"
              v-else-if="req.parts_status == 'Complete'"
            >{{ req.parts_status }} by {{ req.parts_associate }}</v-chip>
            <v-chip
              color="primary"
              v-else-if="req.parts_status == 'Claimed'"
            >{{ req.parts_status }} by {{ req.parts_associate }}</v-chip>
            <v-chip
              color="error"
              v-if="req.parts_status == 'Complete' && req.parts_on_order == 'Yes'"
            >Parts On Order</v-chip>
          </td>

          <td v-if="req.finance_status == ''">
            <v-chip color="yellow">Waiting for Approval</v-chip>
          </td>
          <td v-if="req.finance_status == 'Currently Waiting'">
            <v-chip color="yellow">{{ req.finance_status }}</v-chip>
          </td>
          <td v-else-if="req.finance_status == 'Claimed'">
            <v-chip color="primary">{{ req.finance_status }} by {{ req.finance_associate }}</v-chip>
          </td>
          <td v-else-if="req.finance_status == 'Complete'">
            <v-chip color="success">{{ req.finance_status }} by {{ req.finance_associate }}</v-chip>
          </td>

          <td>
            <v-chip v-if="req.detail_status ==''" color="yellow">Waiting for Approval</v-chip>
            <v-chip
              v-if="req.detail_status =='Complete'"
              color="success"
            >{{ req.detail_status }} by {{ req.detail_associate }}</v-chip>
            <v-chip
              v-if="req.detail_status =='Currently Waiting'"
              color="yellow"
            >{{ req.detail_status }}</v-chip>
            <v-chip
              v-if="req.detail_status =='Claimed'"
              color="primary"
            >{{ req.detail_status }} by {{ req.detail_associate }}</v-chip>
          </td>
          <td>{{ req.delivery_bay }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
import { db } from "../main";
import firebase from "firebase";

export default {
  name: "WeOwesInProgress",
  data() {
    return {
      reqs: []
    };
  },
  firestore() {
    return {
      reqs: db
        .collection("makeReady")
        .where("status", "==", true)
        .orderBy("initial_timestamp", "desc")
    };
  }
};
</script>

<style scoped>
.display-3 {
  margin-top: 10px;
  margin-bottom: 20px;
}

v-spacer {
  margin-right: 30px;
}

img {
  margin-right: 10px;
}

.bold {
  font-weight: bold;
}
</style>