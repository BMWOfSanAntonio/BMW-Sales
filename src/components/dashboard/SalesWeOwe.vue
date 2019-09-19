<template>
  <div class="sales-we-owe">
    <h4 class="mt-2">We Owes</h4>
    <TableHeader />
    <tbody>
      <tr v-for="(weowe, i) in weowePackages" :key="i">
        <template v-if="weowe.status.weowe_status !== 'Finished'">
          <!-- // * index of the document -->
          <td>{{ i + 1 }}</td>
          <!-- // * elapsed timer -->
          <td>{{ dateFormat(weowe) }}</td>
          <!-- // * associate name -->
          <td>{{ weowe.userinfo.associate }}</td>
          <!-- // * customer's name -->
          <td>{{ weowe.data.customer_name }}</td>
          <!-- // * stock number -->
          <td>{{ weowe.data.stock_number }}</td>
          <!-- // * type of vehicle -->
          <td>{{ weowe.data.type_of_vehicle }}</td>
          <!-- // * Type of Request -->
          <td>We Owe</td>
          <!-- // * type of weoweuest -->
          <template>
            <td v-if="weowe.detail">Make Ready</td>
          </template>
          <!-- // * status -->
          <template>
            <td
              class="table-success"
              v-if="weowe.status.parts_status == 'Complete' && weowe.status.sales_status == 'Complete'"
            >Complete</td>
            <td
              class="table-danger"
              v-else-if="weowe.status.sales_status == 'Denied Request'"
            >{{ weowe.status.sales_status }}</td>
            <td v-else>In Process...</td>
          </template>
          <td>
            <i v-b-modal="weowe.id" class="material-icons">info</i>
            <!-- // * Modal: Start -->
            <b-modal centered size="lg" :id="weowe.id" title="More Information: ">
              <!-- // * ~~~ Deal infromation sections ~~~ -->
              <h5 class="ml-4">Deal Information:</h5>
              <ul>
                <li>
                  <span>Customer Name:</span>
                  {{ weowe.data.customer_name }}
                </li>
                <li>
                  <span>Stock #:</span>
                  {{ weowe.data.stock_number }}
                </li>
                <li>
                  <span>Type of Vehicle:</span>
                  {{ weowe.data.type_of_vehicle }}
                </li>
                <li>
                  <span>Model:</span>
                  {{ weowe.data.model }}
                </li>
                <li>
                  <span>Year:</span>
                  {{ weowe.data.year }}
                </li>
              </ul>
              <h5 class="ml-4">Status:</h5>
              <ul>
                <li>
                  <span>Sales Status:</span>
                  <span>{{ weowe.status.sales_status }}</span>
                </li>
                <li>
                  <span>Parts Status:</span>
                  {{ weowe.status.parts_status }}
                </li>
              </ul>
              <b-button
                v-if="weowe.status.weowe_status == 'Complete'"
                @click="clearFromView(weowe)"
                class="ml-3"
                variant="info"
              >Clear From View</b-button>
            </b-modal>
            <!-- // * Modal: End -->
          </td>
        </template>
      </tr>
    </tbody>
  </div>
</template>

<script>
import { db } from "../../main";
import firebase from "firebase";
import TableHeader from "./pieces/TableHeader";

export default {
  name: "SalesDashboard",
  props: ["weowe", "user", "id"],
  components: {
    TableHeader
  },
  data() {
    return {
      weowePackages: []
    };
  },
  methods: {
    dateFormat(weowe) {
      return new Date(weowe.initial_timestamp).toLocaleString();
    },
    clearFromView(weowe) {
      db.collection("weowes")
        .doc(weowe.id)
        .update({
          "status.weowe_status": "Finished"
        });
    }
  },
  firestore() {
    return {
      weowePackages: db
        .collection("weowes")
        .where(
          "userinfo.associate",
          "==",
          firebase.auth().currentUser.displayName
        )
    };
  }
};
</script>

<style scoped>
.sales-we-owe {
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