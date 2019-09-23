<template>
  <div>
    <div class="display-4">Make Ready</div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Sales Associate</th>
          <th scope="col">Customer Name</th>
          <th scope="col">Stock Number</th>
          <th scope="col">Info</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(req, i) in reqs" :key="i">
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ dateFormat(req) }}</td>
          <td>{{ req.userinfo.associate }}</td>
          <td>{{ req.data.customer_name }}</td>
          <td>{{ req.data.stock_number }}</td>
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
                  <span>CCP:</span>
                  {{ req.data.ccp }}
                </li>
              </ul>
              <h5 class="ml-4">Status:</h5>
              <ul>
                <template>
                  <li>
                    <span>Sales Status:</span>
                    <span>
                      {{ req.status.sales_status }} -
                      <span
                        v-if="req.status.finance_status == 'Complete'"
                      >Finance Approved</span>
                    </span>
                  </li>
                </template>
                <li>
                  <template
                    v-if="req.data.ccp == 'No' && req.data.type_of_vehicle =='Loaner' && req.status.parts_status"
                  >
                    <span>Parts Status:</span>
                    No Parts Needed
                  </template>
                  <template v-else>
                    <span>Parts Status:</span>
                    {{ req.status.parts_status }}
                  </template>
                </li>
                <li>
                  <span>Finance Status:</span>
                  {{ req.status.finance_status }}
                </li>
                <li>
                  <span>Detail Status:</span>
                  {{ req.status.detail_status }}
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
  name: "reqTracking",
  props: ["user"],
  data() {
    return {
      reqs: []
    };
  },
  methods: {
    dateFormat(req) {
      return new Date(req.initial_timestamp).toLocaleString();
    }
  },
  firestore() {
    return {
      reqs: db
        .collection("makeready")
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