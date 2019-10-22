<template>
  <div class="complete-deal-log">
    <h4 class="display-4">Completed Deals</h4>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Sales Associate</th>
          <th scope="col">Customer Name</th>
          <th scope="col">Stock Number</th>
          <th scope="col">Deal Number</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="deal in deals" :key="deal.data.stock_number">
          <td>{{ deal.userinfo.associate }}</td>
          <td>{{ deal.data.customer_name }}</td>
          <td>{{ deal.data.stock_number }}</td>
          <td>{{ deal.data.deal_number }}</td>
          <td>
            <b-button variant="primary" @click="rdr(deal)">RDR Complete</b-button>
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
    rdr(deal) {
      db.collection("makeready")
        .doc(deal.id)
        .update({
          rdr: "Complete",
          rdr_timestamp: Date.now(),
          rdr_associate: firebase.auth().currentUser.displayName
        });
    }
  },
  firestore() {
    return {
      deals: db
        .collection("makeready")
        .where("status.finance_status", "==", "Complete")
        .where("rdr", "==", null)
    };
  }
};
</script>

<style scoped>
</style>