<template>
  <v-container id="parts">
    <div class="display-3">Detail</div>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Sales Associate</th>
          <th class="text-left">Customer Name</th>
          <th class="text-left">Type of Vehicle</th>
          <th class="text-left">Stock #</th>
          <th class="text-left">Year</th>
          <th class="text-left">Model</th>
          <th class="text-left">Detail Notes</th>
          <th class="text-left">Detail Associate</th>
          <th class="text-left"></th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(req, i) in reqs" :key="i">
          <!-- Request number in queue -->
          <td>{{ i + 1 }}</td>
          <!-- Associates Name + Avatar -->
          <td>
            <v-avatar size="36">
              <img :src="req.photo_url" alt="user" />
            </v-avatar>
            {{ req.associate }}
          </td>
          <!-- Customer Name -->
          <td>{{ req.customer_name }}</td>
          <!-- Vehicle Type -->
          <td>{{ req.vehicle_type }}</td>
          <!-- Stock Number -->
          <td>{{ req.stock_number }}</td>
          <!-- Vehicle Year -->
          <td>{{ req.vehicle_year }}</td>
          <!-- Vehicle Model -->
          <td>{{ req.vehicle_model }}</td>
          <!-- Detail Notes -->
          <td>{{ req.detail_notes }}</td>
          <!-- Customer Care Package Options -->
          <td>{{ req.detail_associate }}</td>
          <td>
            <div class="container">
              <div
                class="modal fade"
                :id="req.id"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Stock #: {{ req.stock_number }}</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <v-select
                        v-if="req.detail_status == 'Claimed'"
                        color="deep-orange darken-2"
                        v-model="req.delivery_bay"
                        :items="bays"
                        label="Which delivery bay?"
                      ></v-select>
                    </div>
                    <div class="modal-footer">
                      <v-btn
                        color="info"
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >Close</v-btn>
                      <v-btn
                        outlined
                        color="error"
                        type="button"
                        class="btn btn-secondary"
                        @click="unclaimMakeReady(req)"
                      >Unclaim</v-btn>
                      <v-btn
                        color="success"
                        type="button"
                        class="btn btn-primary"
                        @click="completeMakeReady(req)"
                      >Complete</v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td>
            <v-btn
              v-if="req.detail_status == 'Currently Waiting'"
              @click="claimMakeReady(req)"
              :data-target="'#' + req.id"
              color="success"
            >Claim</v-btn>
            <v-btn
              v-if="req.detail_status == 'Claimed'"
              @click="claimMakeReady(req)"
              :data-target="'#' + req.id"
              color="success"
            >Continue Working</v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
import { db } from "../main";
import firebase from "firebase";

export default {
  name: "Parts",
  data() {
    return {
      weowes: [],
      reqs: [],
      bays: ["Bay 1", "Bay 2", "Bay 3", "Bay 4", "Overflow"],
      status: ["Approved", "Denied"],
      claimed: ["Claim"],
      boolean: ["Yes", "No"],
      user: firebase.auth().currentUser.displayName,
      photo: firebase.auth().currentUser.photoURL,
      dialog: false
    };
  },
  firestore() {
    return {
      reqs: db
        .collection("makeReady")
        .where("detail_state", "==", true)
        .orderBy("make_ready_init_timestamp", "desc")
    };
  },
  methods: {
    claimMakeReady(req) {
      db.collection("makeReady")
        .doc(req.id)
        .update({
          detail_claimed_timestamp: new Date(),
          detail_associate: this.user,
          detail_status: "Claimed"
        });
      $("#" + req.id).modal("show");
    },
    unclaimMakeReady(req) {
      db.collection("makeReady")
        .doc(req.id)
        .update({
          detail_claimed_timestamp: "",
          detail_associate: "",
          detail_status: "Currently Waiting"
        });
      $("#" + req.id).modal("hide");
    },
    completeMakeReady(req) {
      if (req.finance_state == false && req.parts_state == false) {
        db.collection("makeReady")
          .doc(req.id)
          .update({
            detail_complete_timestamp: new Date(),
            detail_associate: this.user,
            detail_status: "Complete",
            detail_state: false,
            delivery_bay: req.delivery_bay,
            status: false
          });
        $("#" + req.id).modal("hide");
      }
      db.collection("makeReady")
        .doc(req.id)
        .update({
          detail_complete_timestamp: new Date(),
          detail_associate: this.user,
          detail_status: "Complete",
          detail_state: false,
          delivery_bay: req.delivery_bay
        });
      $("#" + req.id).modal("hide");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  margin-right: 10px;
}

.display-3 {
  margin-bottom: 40px;
  margin-top: 20px;
}

.bottom {
  margin-top: 100px;
}
</style>
