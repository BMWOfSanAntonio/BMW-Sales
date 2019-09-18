<template>
  <div class="genius">
    <h4 class="mt-2">Genius</h4>
    <TableHeader />
    <tbody>
      <tr v-for="(weowe, i) in genius" :key="i">
        <!-- // * We Owe Table information -->
        <td>{{ i + 1 }}</td>
        <td>{{ dateFormat(weowe) }} minutes</td>
        <td>{{ weowe.userinfo.associate}}</td>
        <td>{{ weowe.data.customer_name }}</td>
        <td>{{ weowe.data.stock_number }}</td>
        <td>Approved We Owe</td>
        <td>{{ weowe.status.genius_status }}</td>
        <td>
          <!-- // * "i" button, opens the modal window, based on weowe.id -->
          <i v-b-modal="weowe.id" class="material-icons">info</i>
          <!-- // * Modal: Start -->
          <b-modal
            header-bg-variant="primary"
            header-text-variant="white"
            hide-footer
            centered
            size="lg"
            :id="weowe.id"
            title="Additional Information"
          >
            <!-- // * ~~~ We owe information modal window ~~~ -->
            <div class="ml-4">
              <h5>We Owe Information:</h5>
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

              <!-- // *  -->
              <h5>Items:</h5>
              <ul>
                <li
                  v-for="(coor, i) in weowe.coordinate"
                  :key="i"
                >{{ coor.accessory}} - ${{ coor.total_install_price }}</li>
              </ul>
              <h5>Required Information:</h5>
              <b-form>
                <ol>
                  <li class="mt-3">
                    <!-- // * Did we need to order parts? -->
                    <b-form-group
                      class="group"
                      id="parts_in_stock"
                      label="Did any parts need to be ordered?"
                    >
                      <b-form-radio
                        v-model="weowe.parts_in_stock"
                        name="some-other-radios"
                        value="Yes"
                        required
                      >Yes, parts needed to be ordered.</b-form-radio>
                      <b-form-radio
                        v-model="weowe.parts_in_stock"
                        name="some-other-radios"
                        value="No"
                        required
                      >No, parts did not need to be ordered.</b-form-radio>
                    </b-form-group>
                  </li>
                  <li class="mt-3">
                    <div class="cal">
                      <p>
                        <span>Appointment Date</span>
                      </p>
                      <p
                        v-if="formatAppointment(weowe) !== 'Invalid Date'"
                      >{{ formatAppointment(weowe) }}</p>
                      <v-date-picker v-model="weowe.appointment_date" />
                    </div>
                  </li>
                  <li class="mt-3">
                    <div class="cal">
                      <p>
                        <span>Estimated Completion Date</span>
                      </p>
                      <p
                        v-if="formatCompletion(weowe) !== 'Invalid Date'"
                      >{{ formatCompletion(weowe) }}</p>
                      <v-date-picker v-model="weowe.completion_date" />
                    </div>
                  </li>
                  <li class="invoice mt-3">
                    <!-- // * Invoice Number -->
                    <b-form-group
                      class="w-100 group"
                      id="input-invoice-number"
                      label="Invoice Number:"
                      label-for="invoice-number"
                    >
                      <b-form-input
                        id="invoice-number"
                        v-model="weowe.invoice_number"
                        type="text"
                        required
                        placeholder="Please enter the invoice number here..."
                      ></b-form-input>
                    </b-form-group>
                  </li>
                </ol>
                <hr />
                <template>
                  <b-button
                    @click="complete(weowe)"
                    class="float-right mr-4"
                    variant="success"
                  >Complete</b-button>
                  <b-button
                    @click="update(weowe)"
                    class="float-right mr-1"
                    variant="info"
                  >Update Information</b-button>
                </template>
              </b-form>
            </div>
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
// * Components
import TableHeader from "./pieces/TableHeader";

export default {
  name: "Genius",
  components: {
    TableHeader
  },
  data() {
    return {
      currentTime: Date.now(),
      state: "started",
      genius: [],
      date: ""
    };
  },
  methods: {
    complete(weowe) {
      db.collection("weowes")
        .doc(weowe.id)
        .update({
          parts_in_stock: weowe.parts_in_stock,
          appointment_date: weowe.appointment_date,
          completion_date: weowe.completion_date,
          invoice_number: weowe.invoice_number,
          "status.genius_status": "Complete",
          "states.genius_state": false
        });
    },
    update(weowe) {
      db.collection("weowes")
        .doc(weowe.id)
        .update({
          parts_in_stock: weowe.parts_in_stock,
          appointment_date: weowe.appointment_date,
          completion_date: weowe.completion_date,
          invoice_number: weowe.invoice_number,
          "status.genius_status": "In process..."
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
    formatAppointment(weowe) {
      const timestamp = weowe.appointment_date;
      const startTime = timestamp.seconds * 1000;
      return new Date(startTime).toDateString();
    },
    formatCompletion(weowe) {
      const timestamp = weowe.completion_date;
      const startTime = timestamp.seconds * 1000;
      return new Date(startTime).toDateString();
    }
  },
  mounted() {
    this.interval = setInterval(this.updateCurrentTime, 1000);
    /* SmtpJS.com - v3.0.0 */
  },
  firestore() {
    return {
      genius: db
        .collection("weowes")
        .where("states.genius_state", "==", true)
        .orderBy("sales.completion_timestamp")
    };
  }
};
</script>

<style scoped>
h5,
span {
  font-weight: bold;
}

.genius {
  display: inline-block;
}

.cal {
  display: inline-block;
}

.invoice {
  width: 75%;
}
</style>