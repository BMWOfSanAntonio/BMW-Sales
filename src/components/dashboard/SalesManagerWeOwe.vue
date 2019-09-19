<template>
  <div class="sales-manager-we-owe">
    <h4 class="mt-2">We Owe</h4>
    <TableHeader />
    <tbody>
      <tr v-for="(weowe, i) in weoweSalesManager" :key="i">
        <!-- // * index of the document -->
        <td>{{ i + 1 }}</td>
        <!-- // * elapsed timer -->
        <td>{{ dateFormat(weowe) }} minutes</td>
        <!-- // * associate name -->
        <td>{{ weowe.userinfo.associate }}</td>
        <!-- // * customer's name -->
        <td>{{ weowe.data.customer_name }}</td>
        <!-- // * stock number -->
        <td>{{ weowe.data.stock_number }}</td>
        <!-- // * type of vehicle -->
        <td>{{ weowe.data.type_of_vehicle }}</td>
        <!-- // * type of weoweuests -->
        <template>
          <td>We Owe</td>
        </template>
        <!-- // * status -->
        <template>
          <td v-if="weowe.status.sales_status == 'Pending...'">{{ weowe.status.sales_status }}</td>
        </template>
        <td>
          <i v-b-modal="weowe.id" class="material-icons">info</i>
          <!-- // * Modal: Start -->
          <b-modal hide-footer centered size="lg" :id="weowe.id" title="More Information: ">
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
            <h5 class="ml-4">Notes:</h5>
            <ul>
              <li
                v-for="(item, i) in weowe.data.accessories"
                :key="i"
              >{{ item.accessory }} - {{ item.total_install_price }}</li>
            </ul>
            <hr />
            <div class="buttons">
              <!-- // * ~~~ Buttons ~~~ -->
              <!-- // * Approve We Owe -->
              <template>
                <b-button @click="approve(weowe)" variant="success">Approve</b-button>
              </template>

              <!-- // *Decline We Owe -->
              <template>
                <b-button @click="deny(weowe)" variant="danger">Deny</b-button>
              </template>
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
import TableHeader from "./pieces/TableHeader";

export default {
  name: "SalesManagerWeOwe",
  props: ["weowe", "user", "id"],
  components: { TableHeader },
  data() {
    return {
      currentTime: Date.now(),
      state: "started",
      weoweSalesManager: []
    };
  },
  methods: {
    approve(weowe) {
      // * creates an array of only the accessories that do not have a coordinate fee
      let no_coordinate = weowe.data.accessories.filter(item => {
        if (item.coordinate == "No") {
          console.log(item);
          return item;
        }
      });
      // * creates an array of only the accessories that have a coordinate fee
      let coordinate = weowe.data.accessories.filter(item => {
        if (item.coordinate == "Yes") {
          console.log(item);
          return item;
        }
      });
      // * Needs to go to both parts and genius
      if (no_coordinate.length > 0 && coordinate.length > 0) {
        db.collection("weowes")
          .doc(weowe.id)
          .update({
            no_coordinate: no_coordinate,
            coordinate: coordinate,
            "sales.completion_timestamp": Date.now(),
            "sales.manager": this.user.display_name,
            "sales.photo": firebase.auth().currentUser.photoURL,
            "states.sales_state": false,
            "status.sales_status": "Complete",
            "states.parts_state": true,
            "status.parts_status": "Pending...",
            "states.genius_state": true,
            "status.genius_status": "Pending"
          });
      }
      // * Needs to go to just genius
      else if (coordinate.length > 0) {
        db.collection("weowes")
          .doc(weowe.id)
          .update({
            no_coordinate: no_coordinate,
            coordinate: coordinate,
            "sales.completion_timestamp": Date.now(),
            "sales.manager": this.user.display_name,
            "sales.photo": firebase.auth().currentUser.photoURL,
            "states.sales_state": false,
            "status.sales_status": "Complete",
            "states.genius_state": true,
            "status.genius_status": "Pending"
          });
      }
      // * Needs to go to just parts
      else if (no_coordinate.length > 0) {
        db.collection("weowes")
          .doc(weowe.id)
          .update({
            no_coordinate: no_coordinate,
            coordinate: coordinate,
            "sales.completion_timestamp": Date.now(),
            "sales.manager": this.user.display_name,
            "sales.photo": firebase.auth().currentUser.photoURL,
            "states.sales_state": false,
            "status.sales_status": "Complete",
            "states.parts_state": true,
            "status.parts_status": "Pending..."
          });
      } else {
        db.collection("weowes")
          .doc(weowe.id)
          .update({
            "sales.completion_timestamp": Date.now(),
            "sales.manager": this.user.display_name,
            "sales.photo": firebase.auth().currentUser.photoURL,
            "states.sales_state": false,
            "status.sales_status": "Complete",
            "states.parts_state": true,
            "status.parts_status": "Pending..."
          });
      }
      console.log(coordinate);
      this.$bvModal.hide(weowe.id);
    },
    deny(weowe) {
      db.collection("weowes")
        .doc(weowe.id)
        .update({
          "states.parts_state": false,
          "states.sales_state": false,
          "states.weowe_state": false,
          "status.parts_status": "Denied Request",
          "status.sales_status": "Denied Request",
          "status.weowe_status": "Denied Request"
        });
    },
    updateCurrentTime: function() {
      if (this.$data.state == "started") {
        this.currentTime = Date.now();
      }
    },
    dateFormat(weowe) {
      return Math.floor((this.currentTime - weowe.initial_timestamp) / 60000);
    }
  },
  mounted() {
    this.interval = setInterval(this.updateCurrentTime, 1000);
    /* SmtpJS.com - v3.0.0 */
  },
  firestore() {
    return {
      weoweSalesManager: db
        .collection("weowes")
        .where("states.sales_state", "==", true)
        .orderBy("initial_timestamp")
    };
  }
};
</script>

<style scoped>
.sales-manager-we-owe {
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
.buttons {
  text-align: right;
}
</style>