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
          <td>
            <h5 v-if="weowe.data.type_of_vehicle == 'New'">
              <b-badge pill variant="danger">{{ weowe.data.type_of_vehicle }}</b-badge>
            </h5>
            <h5 v-if="weowe.data.type_of_vehicle == 'Loaner'">
              <b-badge pill variant="success">{{ weowe.data.type_of_vehicle }}</b-badge>
            </h5>
            <h5 v-if="weowe.data.type_of_vehicle == 'Pre-Owned'">
              <b-badge pill variant="warning">{{ weowe.data.type_of_vehicle }}</b-badge>
            </h5>
          </td>
          <!-- // * Type of Request -->
          <td>We Owe</td>
          <!-- // * type of weoweuest -->
          <template>
            <td v-if="weowe.detail">Make Ready</td>
          </template>
          <!-- // * status -->
          <template>
            <!-- // TODO: fix this issue, won't load this -->
            <!-- // * Parts Ordered: Yes
            <td
              v-if="weowe.parts.parts_on_order && weowe.status.parts_status == 'Complete' && weowe.status.sales_status == 'Complete'"
            >
              <h5>
                <b-badge pill variant="danger">Complete w/ Parts On Order</b-badge>
              </h5>
            </td>-->
            <!-- // * Status: Complete -->
            <td
              v-if="weowe.status.parts_status == 'Complete' && weowe.status.sales_status == 'Complete'"
            >
              <h5>
                <b-badge pill variant="success">Complete</b-badge>
              </h5>
            </td>
            <!-- // * Status: Denied -->
            <td v-else-if="weowe.status.sales_status == 'Denied Request'">
              <h5>
                <b-badge>{{ weowe.status.sales_status }}</b-badge>
              </h5>
            </td>
            <!-- // * Status: In Process -->
            <td v-else>
              <h5>
                <b-badge pill variant="warning">In Process...</b-badge>
              </h5>
            </td>
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
                <!-- // * Sales Status: Start -->
                <li>
                  <span>Sales Status:</span>
                  <!-- // * Sales status: pending... -->
                  <template v-if="weowe.status.sales_status == 'Pending...'">
                    <h5 class="inline">
                      <b-badge pill variant="warning">{{ weowe.status.sales_status }}</b-badge>
                    </h5>
                  </template>
                  <!-- // * Sales status: pending... -->
                  <template v-if="weowe.status.sales_status == 'Complete'">
                    <h5 class="inline">
                      <b-badge pill variant="success">Approved</b-badge>
                    </h5>
                  </template>
                </li>
                <!-- // * Sales Status: End -->
                <!-- // * Parts Status: Start -->
                <li>
                  <span>Parts Status:</span>
                  <!-- // * Parts status: Yes Coordinate Fee -->
                  <template
                    v-if="weowe.status.parts_status == null && weowe.status.sales_status == 'Complete'"
                  >
                    <h5 class="inline">
                      <b-badge pill variant="info">Parts Department was not needed</b-badge>
                    </h5>
                  </template>
                  <!-- // * Parts status: Pending -->
                  <template v-if="weowe.status.parts_status == 'Pending...'">
                    <h5 class="inline">
                      <b-badge pill variant="warning">{{ weowe.status.parts_status }}</b-badge>
                    </h5>
                  </template>
                  <!-- // * Parts status: Claimed -->
                  <template v-if="weowe.status.parts_status == 'Claimed'">
                    <h5 class="inline">
                      <b-badge
                        pill
                        variant="primary"
                      >{{ weowe.status.parts_status }} by {{ weowe.parts.associate }}</b-badge>
                    </h5>
                  </template>
                  <!-- // * Parts status: Complete -->
                  <template v-if="weowe.status.parts_status == 'Complete'">
                    <h5 class="inline">
                      <b-badge
                        pill
                        variant="success"
                      >{{ weowe.status.parts_status }} by {{ weowe.parts.associate }}</b-badge>
                    </h5>
                  </template>
                </li>
                <!-- // * Parts Status: End -->
                <!-- // * Genius Status: Start -->
                <li v-if="weowe.status.genius_status">
                  <span>Genius Status</span>
                  <template>
                    <h5 class="inline">
                      <b-badge pill variant="warning">{{ weowe.status.genius_status }}</b-badge>
                    </h5>
                  </template>
                </li>
              </ul>
              <h5 v-if="weowe.status.genius_status" class="ml-4">Scheduling:</h5>
              <ul v-if="weowe.status.genius_status">
                <li>
                  <!-- // * Did parts need to be ordered? -->
                  <span>Did parts need to be ordered?:</span>
                  <template v-if="weowe.parts_in_stock == null">
                    <h5 class="inline">
                      <b-badge pill variant="success">No infromation at this time</b-badge>
                    </h5>
                  </template>
                  <template v-if="weowe.parts_in_stock == 'Yes'">
                    <h5 class="inline">
                      <b-badge pill variant="danger">Parts on Order</b-badge>
                    </h5>
                  </template>
                </li>
                <li>
                  <span>Appointment Date:</span>
                  <template v-if="weowe.appointment_date">
                    <h5 class="inline">
                      <b-badge pill variant="info">{{ weowe.appointment_date }}</b-badge>
                    </h5>
                  </template>
                </li>
                <li>
                  <span>Estimated Completion Date:</span>
                  <template v-if="weowe.completion_date">
                    <h5 class="inline">
                      <b-badge pill variant="info">{{ weowe.completion_date }}</b-badge>
                    </h5>
                  </template>
                </li>
                <li>
                  <span>Invoice Number:</span>
                  <template v-if="weowe.invoice_number">
                    <h5 class="inline">
                      <b-badge pill variant="info">{{ weowe.invoice_number }}</b-badge>
                    </h5>
                  </template>
                </li>
              </ul>
              <!-- // * Genius Status: End -->
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
import "firebase/firestore";
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
.sales-we-owe,
.inline {
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