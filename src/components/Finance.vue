<template>
  <v-container id="parts">
    <div class="display-3">Finance</div>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Timer</th>
          <th class="text-left">Sales Associate</th>
          <th class="text-left">Customer Name</th>
          <th class="text-left">Type of Vehicle</th>
          <th class="text-left">Deal #</th>
          <th class="text-left">Finance Associate</th>
          <th class="text-left">Comments</th>
          <th class="text-left"></th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(req, i) in reqs" :key="i">
          <!-- Request number in queue -->
          <td>{{ i + 1 }}</td>
          <td
            v-if="!req.finance_claimed_timestamp"
          >Currently waiting for {{ elapsedTime(req) }} min.</td>
          <td v-if="req.finance_claimed_timestamp">Claimed for {{ financeTime(req) }} min.</td>
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
          <td>{{ req.deal_number }}</td>
          <td>{{ req.finance_associate }}</td>
          <td>{{ req.finance_comments }}</td>
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
                      <h5 class="modal-title" id="exampleModalLabel">Deal #: {{ req.deal_number }}</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <v-textarea
                        color="deep-orange darken-2"
                        v-model="req.finance_comments"
                        label="Comments"
                      ></v-textarea>
                      <v-btn
                        color="success"
                        type="button"
                        class="btn btn-secondary"
                        @click="updateComments(req)"
                      >Update Comments</v-btn>
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
              v-if="req.finance_status == 'Currently Waiting'"
              @click="claimMakeReady(req)"
              :data-target="'#' + req.id"
              color="success"
            >Claim</v-btn>
            <v-btn
              v-if="req.finance_status == 'Claimed'"
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
      currentTime: Date.now(),
      state: "started"
    };
  },
  firestore() {
    return {
      reqs: db
        .collection("makeReady")
        .where("finance_state", "==", true)
        .orderBy("finance_init_timestamp", "desc")
    };
  },
  methods: {
    claimMakeReady(req) {
      db.collection("makeReady")
        .doc(req.id)
        .update({
          finance_claimed_timestamp: new Date(),
          finance_associate: this.user,
          finance_status: "Claimed"
        });
      $("#" + req.id).modal("show");
    },
    unclaimMakeReady(req) {
      db.collection("makeReady")
        .doc(req.id)
        .update({
          finance_claimed_timestamp: "",
          finance_associate: "",
          finance_status: "Currently Waiting"
        });
      $("#" + req.id).modal("hide");
    },
    completeMakeReady(req) {
      if (req.parts_state == false && req.detail_state == false) {
        db.collection("makeReady")
          .doc(req.id)
          .update({
            finance_complete_timestamp: new Date(),
            finance_associate: this.user,
            finance_status: "Complete",
            finance_state: false,
            status: false
          });
        $("#" + req.id).modal("hide");
      }
      db.collection("makeReady")
        .doc(req.id)
        .update({
          finance_complete_timestamp: new Date(),
          finance_associate: this.user,
          finance_status: "Complete",
          finance_state: false
        });
      $("#" + req.id).modal("hide");
    },
    updateComments(req) {
      db.collection("makeReady")
        .doc(req.id)
        .update({
          finance_comments: req.finance_comments
        });
    },
    dateFormat(date) {
      return new Date(date.seconds * 1000).toLocaleString();
    },
    elapsedTime(req) {
      const timestamp = req.finance_init_timestamp;
      const startTime = timestamp.seconds * 1000;
      return Math.floor((this.currentTime - startTime) / 60000);
    },
    financeTime(req) {
      const timestamp = req.finance_claimed_timestamp;
      const startTime = timestamp.seconds * 1000;
      return Math.floor((this.currentTime - startTime) / 60000);
    },
    updateCurrentTime: function() {
      if (this.$data.state == "started") {
        this.currentTime = Date.now();
      }
    }
  },
  mounted: function() {
    this.interval = setInterval(this.updateCurrentTime, 1000);
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
