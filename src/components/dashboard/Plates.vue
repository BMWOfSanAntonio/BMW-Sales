<template>
  <div>
    <div class="display-4">License Plates</div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Check In Date</th>
          <th scope="col">Customer Name</th>
          <th scope="col">Sales Associate</th>
          <th scope="col">Stock Number</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(plate, i) in plates" :key="i">
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ dateFormat(plate) }}</td>
          <td>{{ plate.data.customer_name }}</td>
          <td>{{ plate.userinfo.associate }}</td>
          <td>{{plate.data.stock_number}}</td>
          <td>
            <b-button @click="complete(plate)">Complete</b-button>
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
  name: "Plates",
  data() {
    return {
      plates: []
    };
  },
  methods: {
    dateFormat(time) {
      return new Date(time.plates_timestamp).toDateString();
    },
    complete(plate) {
      db.collection("makeready")
        .doc(plate.id)
        .update({
          plates: "Finished",
          plates_to_customer: Date.now()
        });
    }
  },
  firestore() {
    return {
      plates: db.collection("makeready").where("plates", "==", "Complete")
    };
  }
};
</script>