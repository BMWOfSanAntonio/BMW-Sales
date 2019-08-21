<template>
  <v-container>
    <div class="display-3">In Progress We Owes</div>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Sales Associate</th>
          <th class="text-left">Type of Vehicle</th>
          <th class="text-left">Stock #</th>
          <th class="text-left">Sales Status</th>
          <th class="text-left">Parts Status</th>
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
          <!-- Sales Chips -->
          <td v-if="weowe.sales_state == 'Waiting for Approval'">
            <v-chip color="yellow">{{ weowe.sales_state }}</v-chip>
          </td>
          <td v-else-if="weowe.sales_state == 'Approved'">
            <v-chip color="success">{{ weowe.sales_state }} by {{ weowe.sales_manager }}</v-chip>
          </td>
          <!-- Parts Chips -->
          <td v-if="weowe.parts_status == 'Waiting for Sales to Approve'">
            <v-chip color="yellow">{{ weowe.parts_status }}</v-chip>
          </td>
          <td v-else-if="weowe.parts_status == 'Currently Waiting'">
            <v-chip color="yellow">{{ weowe.parts_status }}</v-chip>
          </td>
          <td v-else-if="weowe.parts_status == 'Claimed'">
            <v-chip color="primary">{{ weowe.parts_status }} by {{ weowe.parts_associate }}</v-chip>
          </td>
          <td v-else-if="weowe.parts_status == 'Complete'">
            <v-chip color="success">{{ weowe.parts_status }} by {{ weowe.parts_associate }}</v-chip>
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
  name: "WeOwesInProgress",
  data() {
    return {
      weowes: []
    };
  },
  firestore() {
    return {
      weowes: db.collection("weowe").where("parts_state", "==", true)
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
</style>