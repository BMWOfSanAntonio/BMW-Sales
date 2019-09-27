<template>
  <div class="complete-deal-log">
    <h4 class="display-4">Titling</h4>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Sales Associate</th>
          <th scope="col">Customer Name</th>
          <th scope="col">Stock Number</th>
          <th scope="col">Deal Number</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(deal, i) in deals" :key="i">
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ deal.userinfo.associate }}</td>
          <td>{{ deal.data.customer_name }}</td>
          <td>{{ deal.data.stock_number }}</td>
          <td>{{ deal.data.deal_number }}</td>
          <td>
            <b-button variant="primary" @click="plates(deal)">Plates Issued</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { db } from "../../main";
import firebase from "firebase";
export default {
  name: "CompleteDealLog",
  data() {
    return {
      deals: []
    };
  },
  methods: {
    plates(deal) {
      db.collection("makeready")
        .doc(deal.id)
        .update({
          plates: "Complete",
          plates_timestamp: Date.now(),
          plates_associate: firebase.auth().currentUser.displayName
        });
    }
  },
  firestore() {
    return {
      deals: db
        .collection("makeready")
        .where("status.finance_status", "==", "Complete")
        .where("rdr", "==", "Complete")
        .where("plates", "==", null)
    };
  }
};
</script>

<style scoped>
</style>