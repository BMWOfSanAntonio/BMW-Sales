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
        <!-- // * type of vehicle -->
        <td>
          <h5 v-if="req.data.type_of_vehicle == 'New'">
            <b-badge pill variant="danger">{{
              req.data.type_of_vehicle
            }}</b-badge>
          </h5>
          <h5 v-if="req.data.type_of_vehicle == 'Loaner'">
            <b-badge pill variant="success">{{
              req.data.type_of_vehicle
            }}</b-badge>
          </h5>
          <h5 v-if="req.data.type_of_vehicle == 'Pre-Owned'">
            <b-badge pill variant="warning">{{
              req.data.type_of_vehicle
            }}</b-badge>
          </h5>
        </td>
        <!-- // * type of request -->
        <template>
          <td v-if="req.detail">Make Ready</td>
        </template>
        <!-- // * status -->
        <template>
          <td
            v-if="
              req.status.parts_status !== 'Complete' ||
                req.status.detail_status !== 'Complete' ||
                req.status.finance_status !== 'Complete'
            "
          >
            <h5>
              <b-badge pill variant="warning">In Process...</b-badge>
            </h5>
          </td>
          <td
            v-else-if="
              req.parts.parts_on_order == 'Yes' &&
                req.status.parts_status == 'Complete' &&
                req.status.detail_status == 'Complete' &&
                req.status.finance_status == 'Complete'
            "
          >
            <h5>
              <b-badge pill variant="danger">Complete w/ Parts Ordered</b-badge>
            </h5>
          </td>
          <td v-else>
            <h5>
              <b-badge pill variant="success">Complete</b-badge>
            </h5>
          </td>
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
              <!-- // * Sales Status: Start -->
              <li>
                <span>Sales Status:</span>
                <!-- // * Sales Status: Complete -->
                <template v-if="req.sales">
                  <h5 class="inline">
                    <b-badge pill variant="success">{{
                      req.status.sales_status
                    }}</b-badge>
                  </h5>
                </template>

                <!-- // * Sales Status: Pending -->
                <template v-else-if="req.detail">
                  <h5 class="inline">
                    <b-badge pill variant="warning">{{
                      req.status.sales_status
                    }}</b-badge>
                  </h5>
                </template>

                <!-- // * Finance Status: Pending -->
                <template v-if="req.status.finance_status == null">
                  <h5 class="inline">
                    <b-badge pill variant="warning"
                      >Finance Pending Approval</b-badge
                    >
                  </h5>
                </template>

                <!-- // * Finance Status: Approved -->
                <template v-else-if="req.status.finance_status !== null">
                  <h5 class="inline">
                    <b-badge pill variant="success">Finance Approved</b-badge>
                  </h5>
                </template>
              </li>
              <!-- // * Sales Status: End -->
              <!-- // * Parts Status: Start -->
              <li>
                <span>Parts Status:</span>
                <!-- // * Parts Status: Pending -->
                <template v-if="req.status.parts_status == 'Pending...'">
                  <h5 class="inline">
                    <b-badge pill variant="warning">{{
                      req.status.parts_status
                    }}</b-badge>
                  </h5>
                </template>
                <!-- // * Parts Status: Claimed -->
                <template v-else-if="req.status.parts_status == 'Claimed'">
                  <h5 class="inline">
                    <b-badge pill variant="primary"
                      >{{ req.status.parts_status }} by
                      {{ req.parts.parts_associate }}</b-badge
                    >
                  </h5>
                </template>
                <!-- // * Parts Status: Complete -->
                <template v-else-if="req.status.parts_status == 'Complete'">
                  <h5 class="inline">
                    <b-badge pill variant="success"
                      >Complete
                      <span v-if="req.parts.parts_associate"
                        >by {{ req.parts.parts_associate }}</span
                      ></b-badge
                    >
                  </h5>
                </template>
                <!-- // * Parts Status: Parts need to be ordered -->
                <template v-if="req.parts.parts_on_order == 'Yes'">
                  <h5>
                    <b-badge pill variant="danger"
                      >Parts need to be ordered!</b-badge
                    >
                  </h5>
                </template>
              </li>
              <!-- // * Parts Status: End -->
              <!-- // * Finance Status: Start -->
              <li>
                <span>Finance Status:</span>
                <!-- // * Finance Status: Pending -->
                <template v-if="req.status.finance_status == 'Pending...'">
                  <h5 class="inline">
                    <b-badge pill variant="warning">{{
                      req.status.finance_status
                    }}</b-badge>
                  </h5>
                </template>

                <!-- // * Finance Status: Claimed -->
                <template v-if="req.status.finance_status == 'Claimed'">
                  <h5 class="inline">
                    <b-badge pill variant="primary"
                      >{{ req.status.finance_status }} by
                      {{ req.finance.finance_associate }}</b-badge
                    >
                  </h5>
                </template>

                <!-- // * Finance Status: Complete -->
                <template v-if="req.status.finance_status == 'Complete'">
                  <h5 class="inline">
                    <b-badge pill variant="success"
                      >{{ req.status.finance_status }} by
                      {{ req.finance.finance_associate }}</b-badge
                    >
                  </h5>
                </template>
                <!-- // * Nano Care: Yes -->
                <template v-if="req.finance.nano_care == 'Yes'">
                  <h5 class="inline">
                    <b-badge pill variant="info">Nano Care Sold</b-badge>
                  </h5>
                </template>
              </li>
              <!-- // * Finance Status: End -->
              <!-- // * Detail Status: Start -->
              <li>
                <span>Detail Status:</span>
                <!-- // * Detail Status: Pending -->
                <template v-if="req.status.detail_status == 'Pending...'">
                  <h5 class="inline">
                    <b-badge pill variant="warning">{{
                      req.status.detail_status
                    }}</b-badge>
                  </h5>
                </template>
                <!-- // * Detail Status: Complete -->
                <template v-if="req.status.detail_status == 'Complete'">
                  <h5 class="inline">
                    <b-badge pill variant="success">{{
                      req.status.detail_status
                    }}</b-badge>
                  </h5>
                </template>
              </li>
              <!-- // * Detail Status: End -->
            </ul>
            <b-button
              v-if="req.states.request_state == false"
              @click="clearFromView(req)"
              class="ml-3"
              variant="info"
              >Clear From View</b-button
            >
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
      return new Date(req.initial_timestamp).toDateString();
    },
    clearFromView(req) {
      db.collection("makeready")
        .doc(req.id)
        .update({
          "status.overall_status": 12
        });
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
        .where("status.overall_status", "==", 10)
    };
  }
};
</script>

<style scoped>
.sales-dashboard,
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