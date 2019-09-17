<template>
  <div class="sales-dashboard">
    <h4 class="mt-2">Make Ready</h4>
    <TableHeader />
    <tbody>
      <tr v-for="(req, i) in salesView" :key="i">
        <!-- // * index of the document -->
        <td>{{ i + 1 }}</td>
        <!-- // * elapsed timer -->
        <td>{{ dateFormat(req) }}</td>
        <!-- // * associate name -->
        <td>{{ req.userinfo.associate }}</td>
        <!-- // * customer's name -->
        <td>{{ req.data.customer_name }}</td>
        <!-- // * stock number -->
        <td>{{ req.data.stock_number }}</td>
        <!-- // * type of request -->
        <template>
          <td v-if="req.detail">Make Ready</td>
        </template>
        <!-- // * status -->
        <template>
          <td
            v-if="req.status.parts_status !== 'Complete' || req.status.detail_status !== 'Complete' || req.status.finance_status !== 'Complete'"
          >In Process...</td>
          <td
            class="table-danger"
            v-else-if="req.parts.parts_on_order == 'Yes' && req.status.parts_status =='Complete' && req.status.detail_status == 'Complete' && req.status.finance_status == 'Complete'"
          >Complete w/ Parts on Order</td>
          <td class="table-success" v-else>Complete</td>
        </template>
        <td>
          <i v-b-modal="req.id" class="material-icons">info</i>
          <!-- // * Modal: Start -->
          <b-modal centered size="lg" :id="req.id" title="More Information: ">
            <!-- // * ~~~ Deal infromation sections ~~~ -->
            <h5 class="ml-4">Deal Information:</h5>
            <ul>
              <li>
                <span>Customer Name:</span>
                {{ req.data.customer_name }}
              </li>
              <li>
                <span>Stock #:</span>
                {{ req.data.stock_number }}
              </li>
              <li>
                <span>Type of Vehicle:</span>
                {{ req.data.type_of_vehicle }}
              </li>
              <li>
                <span>Model:</span>
                {{ req.data.model }}
              </li>
              <li>
                <span>Year:</span>
                {{ req.data.year }}
              </li>
              <li>
                <span>Mileage:</span>
                {{ req.data.mileage }}
              </li>
              <li>
                <span>Deal #:</span>
                {{ req.data.deal_number }}
              </li>
            </ul>
            <h5 class="ml-4">Notes:</h5>
            <ul>
              <li>
                <span>Notes for Sales Managers:</span>
                {{ req.data.notes_sales_managers }}
              </li>
              <li>
                <span>Notes for Parts:</span>
                {{ req.data.notes_parts }}
              </li>
              <li>
                <span>Notes for Finance:</span>
                {{ req.data.notes_finance }}
              </li>
              <li>
                <span>Notes for Detail:</span>
                {{ req.data.notes_detail }}
              </li>
            </ul>
            <h5 class="ml-4">Status:</h5>
            <ul>
              <li>
                <span>Sales Status:</span>
                <span v-if="req.detail">{{ req.status.sales_status }}</span>
                <span v-if="req.status.finance_status !== null">, Finance Approved</span>
              </li>
              <li>
                <template v-if="req.status.parts_status == null">
                  <span>Parts Status:</span>
                  {{ req.status.parts_status }}
                </template>
                <template v-if="req.parts.parts_on_order == 'No'">
                  <span>Parts Status:</span>
                  {{ req.status.parts_status }}
                </template>
                <template v-if="req.parts.parts_on_order == 'Yes'">
                  <span>Parts Status:</span>
                  {{ req.status.parts_status }} - Parts need to be ordered!
                </template>
              </li>
              <li>
                <template>
                  <span>Finance Status:</span>
                  {{ req.status.finance_status }}
                </template>

                <template v-if="req.finance.nano_care == 'Yes'">- Nano Care was sold.</template>
              </li>
              <li>
                <span>Detail Status:</span>
                {{ req.status.detail_status }} - {{ req.detail.delivery_bay }}
              </li>
            </ul>
          </b-modal>
          <!-- // * Modal: End -->
        </td>
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
  props: ["req", "user", "id"],
  components: {
    TableHeader
  },
  data() {
    return {
      salesView: []
    };
  },
  methods: {
    dateFormat(req) {
      return new Date(req.initial_timestamp).toLocaleString();
    }
  },
  firestore() {
    return {
      salesView: db
        .collection("makeready")
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
.sales-dashboard {
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