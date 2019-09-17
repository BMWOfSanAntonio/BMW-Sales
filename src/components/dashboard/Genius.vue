<template>
  <div class="genius">
    <h4 class="mt-2">Genius</h4>
    <TableHeader />
    <tbody>
      <tr v-for="(weowe, i) in genius" :key="i">
        <td>{{ i + 1 }}</td>
        <td>{{ dateFormat(weowe) }} minutes</td>
        <td>{{ weowe.userinfo.associate}}</td>
        <td>{{ weowe.data.customer_name }}</td>
        <td>{{ weowe.data.stock_number }}</td>
        <td>Approved We Owe</td>
        <td>{{ weowe.status.genius_status }}</td>
        <td>
          <i v-b-modal="weowe.id" class="material-icons">info</i>
          <!-- // * Modal: Start -->
          <b-modal hide-footer centered size="lg" :id="weowe.id" title="More Information: ">
            <!-- // * ~~~ Deal infromation sections ~~~ -->
            <h5 class="ml-4">We Owe Information:</h5>
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
            <!-- // * Parts Required Information Form -->
            <template>
              <!-- // * Header -->
              <h5 class="ml-4">Required Information:</h5>
              <b-form>
                <!-- // * Did we have the parts in stock? -->
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
              </b-form>
            </template>
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
      genius: []
    };
  },
  methods: {
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
    }
  },
  mounted() {
    this.interval = setInterval(this.updateCurrentTime, 1000);
    /* SmtpJS.com - v3.0.0 */
  },
  firestore() {
    return {
      genius: db.collection("weowes").where("states.genius_state", "==", true)
    };
  }
};
</script>

<style scoped>
.genius {
  display: inline-block;
}
span {
  font-weight: bold;
}
</style>