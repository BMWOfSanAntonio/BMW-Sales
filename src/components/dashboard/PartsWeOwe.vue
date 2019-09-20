<template>
  <div class="parts-we-owe">
    <h4 class="mt-2">We Owe</h4>
    <!-- // * Table Header Component -->
    <TableHeader />
    <tbody>
      <tr v-for="(weowe, i) in partsPackages" :key="i">
        <!-- // * index of the document -->
        <td>{{ i + 1 }}</td>
        <!-- // * date -->
        <td v-if="weowe.sales">{{ dateFormat(weowe) }} minutes</td>
        <td v-else>{{ date(weowe) }} minutes</td>
        <!-- // * associate name -->
        <td>{{ weowe.userinfo.associate }}</td>
        <!-- // * customer's name -->
        <td>{{ weowe.data.customer_name }}</td>
        <!-- // * stock number -->
        <td>{{ weowe.data.stock_number }}</td>
        <!-- // * type of vehicle -->
        <td>{{ weowe.data.type_of_vehicle }}</td>
        <!-- // * type of weoweuest -->
        <template>
          <!-- // * make ready -->
          <td v-if="weowe.sales">Approved We Owe</td>
          <td v-else>We Owe</td>
        </template>
        <!-- // * Status -->
        <template>
          <td v-if="weowe.status.parts_status !== 'Claimed'">Pending...</td>
          <td v-if="weowe.status.parts_status == 'Claimed'">Claimed by {{ weowe.parts.associate }}</td>
        </template>

        <td>
          <i @click="this.$bvModal.show(weowe.id)" v-b-modal="weowe.id" class="material-icons">info</i>
          <!-- // * Modal: Start -->
          <b-modal hide-footer centered size="lg" :id="weowe.id" title="More Information: ">
            <!-- // * ~~~ Deal infromation sections ~~~ -->
            <h5 class="ml-4">We Owe Information</h5>
            <ul>
              <li>
                <span>Sales Associate:</span>
                {{ weowe.userinfo.associate }}
              </li>
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
            <h5 class="ml-4">Notes:</h5>
            <div class="ml-3" v-if="weowe.sales">
              <span>Quote Number:</span>
              - {{ weowe.quote_number }}
            </div>
            <ul>
              <li>
                <span>Sales Manager Notes:</span>
                {{ weowe.sales_manager_comments }}
              </li>
            </ul>
            <ul>
              <template v-if="weowe.no_coordinate">
                <li v-for="(item, i) in weowe.no_coordinate" :key="i">
                  <p>{{ item.accessory }} - {{ item.total_install_price }}</p>
                </li>
              </template>
              <template v-else>
                <li v-for="(item, i) in weowe.data.accessories" :key="i">
                  <p>{{ item.accessory }} - {{ item.total_install_price }}</p>
                </li>
              </template>
            </ul>
            <!-- // * Parts weoweuired Information Form -->
            <template v-if="weowe.status.parts_status == 'Claimed'">
              <!-- // * Header -->
              <h5 class="ml-4">Required Information:</h5>
              <b-form @submit.prevent="complete(weowe)" class="ml-4">
                <div v-if="!weowe.sales">
                  <b-form-group
                    v-for="(item, i) in weowe.data.accessories"
                    :key="i"
                    id="input-Price"
                    label="Price:"
                    label-for="price"
                  >
                    <b-form-input
                      id="price"
                      v-model="item.total_install_price"
                      :placeholder="item.accessory + ' price....'"
                    ></b-form-input>
                    <b-button @click="updatePrice(weowe, item)">Update Parts Price</b-button>
                  </b-form-group>
                </div>
                <!-- // * Parts on Order: this should be for both the customer care package and the carpet mats -->
                <b-form-group
                  class="group"
                  id="parts_on_order"
                  label="Did any parts need to be ordered?"
                >
                  <b-form-radio
                    v-model="weowe.parts.parts_on_order"
                    name="some-other-radios"
                    value="Yes"
                    required
                  >Yes, parts needed to be ordered.</b-form-radio>
                  <b-form-radio
                    v-model="weowe.parts.parts_on_order"
                    name="some-other-radios"
                    value="No"
                    required
                  >No, parts did not need to be ordered.</b-form-radio>
                </b-form-group>
                <div v-if="!weowe.sales">
                  <b-form-group
                    id="input-quote-number"
                    label="Quote Number:"
                    label-for="quote-number"
                  >
                    <b-form-input
                      id="quote-number"
                      v-model="weowe.quote_number"
                      placeholder="Enter quote number here..."
                    ></b-form-input>
                  </b-form-group>
                </div>
                <div v-if="weowe.sales">
                  <b-form-group
                    id="input-invoice-number"
                    label="Invoice Number:"
                    label-for="invoice-number"
                  >
                    <b-form-input
                      id="invoice-number"
                      v-model="weowe.invoice_number"
                      placeholder="Enter invoice number here..."
                    ></b-form-input>
                  </b-form-group>
                </div>

                <hr />
                <!-- // * ~~~ Modal Buttons ~~~ -->
                <template>
                  <!-- // * Unclaim: should only show if weowe.status.parts_status is equal to 'Claimed' -->
                  <template v-if="weowe.status.parts_status == 'Claimed'">
                    <b-button @click="unclaim(weowe)" variant="danger">Unclaim</b-button>
                  </template>

                  <!-- // * Complete: should appear disabled until all fields have a value -->
                  <template v-if="weowe.status.parts_status == 'Claimed'">
                    <b-button type="submit" variant="success">Complete</b-button>
                  </template>
                </template>
              </b-form>
            </template>
            <!-- // * ~~~ Buttons ~~~ -->
            <!-- // * Claim: should show only when weowe.status.parts_status does not equal "Claimed" -->
            <template v-if="weowe.status.parts_status !== 'Claimed'">
              <b-button class="ml-4" @click="claim(weowe)" variant="success">Claim</b-button>
            </template>
          </b-modal>
          <!-- // * Modal: End -->
        </td>
      </tr>
    </tbody>
  </div>
</template>

<script>
// * Imports
import { db } from "../../main";
import firebase from "firebase";
import Dashboard from "./Dashboard";
import TableHeader from "./pieces/TableHeader";

export default {
  name: "Parts",
  props: ["weowe", "user", "id"],
  components: {
    TableHeader
  },
  data() {
    return {
      currentTime: Date.now(),
      state: "started",
      update: null,
      partsPackages: []
    };
  },
  methods: {
    claim(weowe) {
      db.collection("weowes")
        .doc(weowe.id)
        .update({
          "status.parts_status": "Claimed",
          "parts.associate": this.user.display_name,
          "parts.photo": firebase.auth().currentUser.photoURL
        });
    },
    unclaim(weowe) {
      db.collection("weowes")
        .doc(weowe.id)
        .update({
          "status.parts_status": "Pending...",
          "parts.associate": "",
          "parts.photo": ""
        });
    },
    complete(weowe) {
      if (weowe.update !== true && !weowe.sales) {
        alert("Please enter the price of the item and then hit update price.");
      } else {
        if (weowe.sales) {
          db.collection("weowes")
            .doc(weowe.id)
            .update({
              "status.parts_status": "Complete",
              "parts.associate": this.user.display_name,
              "parts.photo": firebase.auth().currentUser.photoURL,
              "parts.parts_on_order": weowe.parts.parts_on_order,
              "states.parts_state": false,
              "states.weowe_state": false,
              "status.weowe_status": "Complete",
              invoice_number: weowe.invoice_number
            });
        } else {
          db.collection("weowes")
            .doc(weowe.id)
            .update({
              "status.parts_status": "Complete",
              "parts.associate": this.user.display_name,
              "parts.photo": firebase.auth().currentUser.photoURL,
              "states.parts_state": false,
              "states.sales_state": true,
              "status.sales_status": "Pending...",
              "parts.parts_on_order": weowe.parts.parts_on_order,
              quote_number: weowe.quote_number
            });
        }
        window.print();
        this.$bvModal.hide(weowe.id);
      }
    },
    // ! VERY IMPORTANT DON"T TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING!
    updatePrice(weowe, item) {
      db.collection("weowes")
        .doc(weowe.id)
        .update({
          "data.accessories": weowe.data.accessories.filter(item => {
            return item.total_install_price !== null;
          })
        });
      db.collection("weowes")
        .doc(weowe.id)
        .update({
          "data.accessories": firebase.firestore.FieldValue.arrayUnion(item),
          update: true
        });
    },
    // * Other Methods
    updateCurrentTime: function() {
      if (this.$data.state == "started") {
        this.currentTime = Date.now();
      }
    },
    dateFormat(weowe) {
      return Math.floor(
        (this.currentTime - weowe.sales.completion_timestamp) / 60000
      );
    },
    date(weowe) {
      return Math.floor((this.currentTime - weowe.initial_timestamp) / 60000);
    }
  },
  mounted() {
    this.interval = setInterval(this.updateCurrentTime, 1000);
    console.log(this.weowe);
    /* SmtpJS.com - v3.0.0 */
  },
  firestore() {
    return {
      partsPackages: db
        .collection("weowes")
        .where("states.parts_state", "==", true)
        .orderBy("initial_timestamp")
    };
  }
};
</script>

<style scoped>
.parts-we-owe {
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