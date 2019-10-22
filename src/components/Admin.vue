<template>
  <div class="reports">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(detail, i) in details" :key="i">
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ dateFormat(detail.initial_timestamp) }}</td>
          <td>{{ detail.userinfo.associate }}</td>
          <td>{{ detail.data.stock_number }}</td>
          <td>{{ detail.data.type_of_vehicle }}</td>
        </tr>
        <tr v-for="(detail, i) in old" :key="i">
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ oldDate(detail.initial_timestamp) }}</td>
          <td>{{ detail.associate }}</td>
          <td>{{ detail.stock_number }}</td>
          <td>{{ detail.vehicle_type }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { db } from "../main";
import firebase from "firebase";

export default {
  name: "Admin",
  data() {
    return {
      details: [],
      old: []
    };
  },
  methods: {
    dateFormat(t) {
      return new Date(t).toDateString();
    },
    oldDate(date) {
      return new Date(date.seconds * 1000).toDateString();
    }
  },
  firestore() {
    return {
      details: db
        .collection("makeready")
        .where("status.detail_status", "==", "Complete"),
      old: db.collection("makeReady").where("detail_status", "==", "Complete")
    };
  }
};
</script>

<style scoped>
</style>
