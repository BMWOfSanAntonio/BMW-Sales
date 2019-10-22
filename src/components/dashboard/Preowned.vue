<template>
  <div class="preowned">
    <h4>Pre-Owned</h4>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">VIN</th>
          <th scope="col">Make</th>
          <th scope="col">Model</th>
          <th scope="col">Color</th>
          <th scope="col">Pictures</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(d, i) in detail" :key="i">
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ d.vin }}</td>
          <td>{{ d.make }}</td>
          <td>{{ d.model }}</td>
          <td>{{ d.color }}</td>
          <td>
            <b-form-checkbox
              id="checkbox-1"
              v-model="d.pictures"
              name="checkbox-1"
              value="Yes"
              unchecked-value="No"
            >Pictures Taken</b-form-checkbox>
          </td>
          <td>
            <b-button @click="complete(d)">Complete</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// * Imports
import { db } from "../../main";
import firebase from "firebase";
export default {
  name: "Preowned",
  data() {
    return {
      detail: []
    };
  },
  methods: {
    complete(d) {
      db.collection("tpo")
        .doc(d.id)
        .update({
          detail: "Complete",
          detail_complete_timestamp: Date.now(),
          detail_complete_associate: firebase.auth().currentUser.displayName,
          pictures: d.pictures
        });
    }
  },
  firestore() {
    return {
      detail: db
        .collection("tpo")
        .where("sublet", "==", "Complete")
        .where("detail", "==", "In process")
        .orderBy("initial_timestamp")
    };
  }
};
</script>

<style scoped>
.inline {
  display: inline;
}
</style>

