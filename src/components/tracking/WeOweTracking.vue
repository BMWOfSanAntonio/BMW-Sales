<template>
  <div>
    <div class="display-4">All We Owes</div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Sales Associate</th>
          <th scope="col">Customer Name</th>
          <th scope="col">Invoice Number</th>
          <th scope="col">Stock Number</th>
          <th scope="col">Info</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(weowe, i) in weowes" :key="i">
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ dateFormat(weowe) }}</td>
          <td>{{ weowe.userinfo.associate }}</td>
          <td>{{ weowe.data.customer_name }}</td>
          <td>{{ weowe.invoice_number }}</td>
          <td>{{ weowe.data.stock_number }}</td>
          <td>
            <i v-b-modal="weowe.id" class="material-icons">info</i>
            <!-- // * Modal: Start -->
            <b-modal
              centered
              size="lg"
              :id="weowe.id"
              title="More Information: "
            >
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
              <h5 class="ml-4">Items:</h5>
              <ul>
                <li v-for="(item, i) in weowe.data.accessories" :key="i">
                  {{ item.accessory }} - {{ item.total_install_price }}
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
            </b-modal>
            <!-- // * Modal: End -->
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
  name: "WeOweTracking",
  props: ["user"],
  data() {
    return {
      weowes: []
    };
  },
  methods: {
    dateFormat(weowe) {
      return new Date(weowe.initial_timestamp).toLocaleString();
    }
  },
  firestore() {
    return {
      weowes: db
        .collection("weowes")
        .orderBy("initial_timestamp", "desc")
        .limit(100)
    };
  }
};
</script>

<style scoped>
/* //* Centers text in the table */
table {
  text-align: center;
}
span,
h5 {
  font-weight: bold;
}
</style>