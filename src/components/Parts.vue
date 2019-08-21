<template>
  <v-container id="parts">
    <div class="display-3">Make Ready Requests</div>
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
          <th class="text-left">CCP</th>
          <th class="text-left">Accessories</th>
          <th class="text-left">List of Accessories</th>
          <th class="text-left">Notes to Parts</th>
          <th class="text-left"></th>
          <th class="text-left"></th>
          <th></th>
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
          <!-- Customer Care Package Options -->
          <td v-if="req.customer_care_package === 'Yes'">
            <v-chip color="success">{{ req.customer_care_package }}</v-chip>
          </td>
          <td v-if="req.customer_care_package === 'No'">
            <v-chip color="error">{{ req.customer_care_package }}</v-chip>
          </td>

          <!-- Accessories Options -->
          <td v-if="req.accessories == 'Yes'">
            <v-chip color="success">{{ req.accessories }}</v-chip>
          </td>
          <td v-if="req.accessories == 'No'">
            <v-chip color="error">{{ req.accessories }}</v-chip>
          </td>

          <!-- List accessories options -->
          <td v-if="req.accessories == 'Yes'">{{ req.list_accessories }}</td>
          <td v-if="req.accessories == 'No'">No additional accessories were sold</td>

          <td v-if="req.parts_notes !== ''">{{ req.parts_notes }}</td>
          <td v-else-if="req.parts_notes == ''">No notes...</td>

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
                      <div class="title modalbody">
                        Stock #:
                        <div class="body-1">{{ req.stock_number }}</div>
                      </div>
                      <div class="title modaltitle">
                        Sales Associate:
                        <div class="body-1">{{ req.associate }}</div>
                      </div>
                      <div class="title modaltitle">
                        Type of Vehicle:
                        <div class="body-1">{{ req.vehicle_type }}</div>
                      </div>
                      <div class="title modaltitle">
                        Customer Care Package:
                        <div class="body-1">{{ req.customer_care_package }}</div>
                      </div>
                      <div class="title modaltitle">
                        Accessories:
                        <div class="body-1">{{ req.accessories }}</div>
                      </div>
                      <div v-if="req.accessories =='Yes'" class="title modaltitle">
                        List of Accessories:
                        <div class="body-1">{{ req.list_accessories }}</div>
                      </div>
                      <v-select
                        color="deep-orange darken-2"
                        v-model="req.afterhours"
                        :items="boolean"
                        label="Was this request after hours?"
                      ></v-select>
                      <v-select
                        color="deep-orange darken-2"
                        v-model="req.parts_on_order"
                        :items="boolean"
                        label="Did parts need to be ordered?"
                      ></v-select>
                      <v-text-field
                        v-if="req.customer_care_package == 'Yes' || req.accessories == 'Yes'"
                        color="deep-orange darken-2"
                        v-model="req.invoice_number"
                        label="Invoice Number"
                        required
                      ></v-text-field>
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
                        v-if="req.customer_care_package == 'Yes' || req.accessories =='Yes'"
                        color="success"
                        type="button"
                        class="btn btn-primary"
                        @click="completeMakeReadyCCP(req)"
                      >Complete</v-btn>
                      <v-btn
                        v-else
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
              v-if="req.parts_status == 'Currently Waiting'"
              @click="claimMakeReady(req)"
              :data-target="'#' + req.id"
              color="success"
            >Claim</v-btn>
            <v-btn
              v-if="req.parts_status == 'Claimed'"
              @click="claimMakeReady(req)"
              :data-target="'#' + req.id"
              color="success"
            >Continue Working</v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    <div class="display-3 bottom">We Owe Quotes</div>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Sales Associate</th>
          <th class="text-left">Type of Vehicle</th>
          <th class="text-left">Stock #</th>
          <th class="text-left">Vehicle Make</th>
          <th class="text-left">Vehicle Model</th>
          <th class="text-left">Year</th>
          <th class="text-left">Accessories</th>
          <th class="text-left"></th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(weowe, i) in weowequotes" :key="i">
          <td>{{ i + 1 }}</td>
          <td>
            <v-avatar size="36">
              <img :src="weowe.photo_url" alt="user" />
            </v-avatar>
            {{ weowe.associate }}
          </td>
          <td>{{ weowe.vehicle_type }}</td>
          <td>{{ weowe.stock_number }}</td>
          <td>{{ weowe.vehicle_make }}</td>
          <td>{{ weowe.vehicle_model }}</td>
          <td>{{ weowe.vehicle_year }}</td>
          <td>{{ weowe.list_accessories }}</td>
          <td>
            <div class="container">
              <div
                class="modal fade"
                :id="weowe.id"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div
                  class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                  role="document"
                >
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5
                        class="modal-title"
                        id="exampleModalLabel"
                      >We Owe - Stock # {{ weowe.stock_number }}</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div class="modalmodalmodal">
                        <div class="title modalbody">
                          Stock #:
                          <div class="body-1">{{ weowe.stock_number }}</div>
                        </div>
                        <div class="title modaltitle">
                          Sales Associate:
                          <div class="body-1">{{ weowe.associate }}</div>
                        </div>
                        <div class="title modaltitle">
                          Customer Name:
                          <div class="body-1">{{ weowe.customer_name }}</div>
                        </div>
                        <div class="title modaltitle">
                          Type of Vehicle:
                          <div class="body-1">{{ weowe.vehicle_type }}</div>
                        </div>

                        <div class="title modaltitle">
                          List of Accessories:
                          <div class="body-1">{{ weowe.list_accessories }}</div>
                        </div>
                        <div class="title modaltitle">
                          Parts Associate:
                          <div class="body-1">{{ weowe.parts_quote_associate }}</div>
                        </div>
                      </div>
                      <v-text-field
                        color="deep-orange darken-2"
                        v-model="weowe.quote_number"
                        label="Quote #"
                      ></v-text-field>

                      <v-text-field
                        color="deep-orange darken-2"
                        v-model="weowe.quote_price"
                        label="Price"
                      ></v-text-field>
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
                        @click="unclaimWeOweQuote(weowe)"
                      >Unclaim</v-btn>
                      <v-btn
                        color="success"
                        type="button"
                        class="btn btn-primary"
                        @click="weOweCompleteQuote(weowe)"
                      >Complete</v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Did you have to order parts? -->
          </td>
          <td>
            <v-btn
              v-if="weowe.parts_quote_status == 'Waiting for Parts to Quote'"
              @click="weOweClaimQuote(weowe)"
              color="success"
              :data-target="'#' + weowe.id"
            >Claim</v-btn>
            <v-btn
              v-if="weowe.parts_quote_status == 'Claimed'"
              @click="weOweClaimQuote(weowe)"
              color="success"
              :data-target="'#' + weowe.id"
            >Continue Working</v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    <div class="display-3 bottom">Approved We Owes</div>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Sales Associate</th>
          <th class="text-left">Type of Vehicle</th>
          <th class="text-left">Stock #</th>
          <th class="text-left">Vehicle Make</th>
          <th class="text-left">Vehicle Model</th>
          <th class="text-left">Year</th>
          <th class="text-left">Accessories</th>
          <th class="text-left"></th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(weowe, i) in weowes" :key="i">
          <td>{{ i + 1 }}</td>
          <td>
            <v-avatar size="36">
              <img :src="weowe.photo_url" alt="user" />
            </v-avatar>
            {{ weowe.associate }}
          </td>
          <td>{{ weowe.vehicle_type }}</td>
          <td>{{ weowe.stock_number }}</td>
          <td>{{ weowe.vehicle_make }}</td>
          <td>{{ weowe.vehicle_model }}</td>
          <td>{{ weowe.vehicle_year }}</td>
          <td>{{ weowe.list_accessories }}</td>
          <td>
            <div class="container">
              <div
                class="modal fade"
                :id="weowe.id"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div
                  class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                  role="document"
                >
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5
                        class="modal-title"
                        id="exampleModalLabel"
                      >We Owe - Stock # {{ weowe.stock_number }}</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div class="modalmodalmodal">
                        <div class="title modalbody">
                          Stock #:
                          <div class="body-1">{{ weowe.stock_number }}</div>
                        </div>
                        <div class="title modaltitle">
                          Sales Associate:
                          <div class="body-1">{{ weowe.associate }}</div>
                        </div>
                        <div class="title modaltitle">
                          Customer Name:
                          <div class="body-1">{{ weowe.customer_name }}</div>
                        </div>
                        <div class="title modaltitle">
                          Type of Vehicle:
                          <div class="body-1">{{ weowe.vehicle_type }}</div>
                        </div>

                        <div class="title modaltitle">
                          List of Accessories:
                          <div class="body-1">{{ weowe.list_accessories }}</div>
                        </div>
                        <div class="title modaltitle">
                          Parts Associate:
                          <div class="body-1">{{ weowe.parts_associate }}</div>
                        </div>
                      </div>

                      <v-select
                        v-if="weowe.parts_status == 'Claimed'"
                        color="deep-orange darken-2"
                        v-model="weowe.parts_on_order"
                        :items="boolean"
                        label="Did you have to order parts?"
                      ></v-select>
                      <v-text-field
                        v-if="weowe.parts_status == 'Claimed'"
                        color="deep-orange darken-2"
                        v-model="weowe.invoice_number"
                        label="Invoice #"
                      ></v-text-field>
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
                        @click="unclaimWeOwe(weowe)"
                      >Unclaim</v-btn>
                      <v-btn
                        color="success"
                        type="button"
                        class="btn btn-primary"
                        @click="weOweComplete(weowe)"
                      >Complete</v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Did you have to order parts? -->
          </td>
          <td>
            <v-btn
              v-if="weowe.parts_status == 'Currently Waiting'"
              @click="weOweClaim(weowe)"
              color="success"
              :data-target="'#' + weowe.id"
            >Claim</v-btn>
            <v-btn
              v-if="weowe.parts_status == 'Claimed'"
              @click="weOweClaim(weowe)"
              color="success"
              :data-target="'#' + weowe.id"
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
      weowequotes: [],
      status: ["Approved", "Denied"],
      claimed: ["Claim"],
      boolean: ["Yes", "No"],
      user: firebase.auth().currentUser.displayName,
      photo: firebase.auth().currentUser.photoURL
    };
  },
  firestore() {
    return {
      reqs: db
        .collection("makeReady")
        .where("parts_state", "==", true)
        .orderBy("make_ready_init_timestamp", "desc"),
      weowequotes: db
        .collection("weowe")
        .where("parts_quote_state", "==", true)
        .orderBy("initial_timestamp", "desc"),
      weowes: db
        .collection("weowe")
        .where("parts_state", "==", true)
        .where("sales_state", "==", "Approved")
        .orderBy("initial_timestamp", "desc")
    };
  },
  methods: {
    weOweClaim(wo) {
      db.collection("weowe")
        .doc(wo.id)
        .update({
          parts_claimed_timestamp: new Date(),
          parts_associate: this.user,
          parts_status: "Claimed"
        });
      $("#" + wo.id).modal("show");
    },
    weOweClaimQuote(wo) {
      db.collection("weowe")
        .doc(wo.id)
        .update({
          parts_quote_claimed_timestamp: new Date(),
          parts_quote_associate: this.user,
          parts_quote_status: "Claimed"
        });
      $("#" + wo.id).modal("show");
    },
    unclaimWeOwe(wo) {
      db.collection("weowe")
        .doc(wo.id)
        .update({
          parts_claimed_timestamp: "",
          parts_associate: "",
          parts_status: "Currently Waiting"
        });
      $("#" + wo.id).modal("hide");
    },
    unclaimWeOweQuote(wo) {
      db.collection("weowe")
        .doc(wo.id)
        .update({
          parts_quote_claimed_timestamp: "",
          parts_quote_associate: "",
          parts_quote_status: "Waiting for Parts to Quote"
        });
      $("#" + wo.id).modal("hide");
    },
    weOweComplete(wo) {
      $("#" + wo.stock_number).modal("show");
      db.collection("weowe")
        .doc(wo.id)
        .update({
          parts_complete_timestamp: new Date(),
          parts_associate: this.user,
          parts_status: "Complete",
          parts_on_order: wo.parts_on_order,
          invoice_number: wo.invoice_number,
          parts_state: false
        });
      window.print();
      $("#" + wo.id).modal("hide");
    },
    weOweCompleteQuote(wo) {
      $("#" + wo.stock_number).modal("show");
      db.collection("weowe")
        .doc(wo.id)
        .update({
          parts_quote_complete_timestamp: new Date(),
          parts_quote_associate: this.user,
          parts_quote_status: "Complete",
          quote_number: wo.quote_number,
          quote_price: wo.quote_price,
          parts_quote_state: false,
          sales_state: "Waiting for Approval"
        });
      $("#" + wo.id).modal("hide");
    },
    claimMakeReady(req) {
      db.collection("makeReady")
        .doc(req.id)
        .update({
          parts_claimed_timestamp: new Date(),
          parts_associate: this.user,
          parts_status: "Claimed",
          parts_photo: this.photo
        });
      $("#" + req.id).modal("show");
    },
    unclaimMakeReady(req) {
      db.collection("makeReady")
        .doc(req.id)
        .update({
          parts_claimed_timestamp: "",
          parts_associate: "",
          parts_status: "Currently Waiting",
          parts_photo: ""
        });
      $("#" + req.id).modal("hide");
    },
    completeMakeReady(req) {
      if (req.finance_state == false && req.detail_state == false) {
        db.collection("makeReady")
          .doc(req.id)
          .update({
            parts_complete_timestamp: new Date(),
            parts_associate: this.user,
            parts_status: "Complete",
            parts_state: false,
            afterhours: req.afterhours,
            invoice_number: req.invoice_number,
            parts_on_order: req.parts_on_order,
            status: false
          });
        $("#" + req.id).modal("hide");
      }
      db.collection("makeReady")
        .doc(req.id)
        .update({
          parts_complete_timestamp: new Date(),
          parts_associate: this.user,
          parts_status: "Complete",
          parts_state: false,
          afterhours: req.afterhours,
          invoice_number: req.invoice_number,
          parts_on_order: req.parts_on_order
        });
      $("#" + req.id).modal("hide");
    },
    completeMakeReadyCCP(req) {
      if (req.finance_state == false && req.detail_state == false) {
        db.collection("makeReady")
          .doc(req.id)
          .update({
            parts_complete_timestamp: new Date(),
            parts_associate: this.user,
            parts_status: "Complete",
            parts_state: false,
            afterhours: req.afterhours,
            invoice_number: req.invoice_number,
            parts_on_order: req.parts_on_order,
            status: false
          });
        window.print();
        $("#" + req.id).modal("hide");
      }
      db.collection("makeReady")
        .doc(req.id)
        .update({
          parts_complete_timestamp: new Date(),
          parts_associate: this.user,
          parts_status: "Complete",
          parts_state: false,
          afterhours: req.afterhours,
          invoice_number: req.invoice_number,
          parts_on_order: req.parts_on_order
        });
      window.print();
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

.modaltitle {
  margin-bottom: 10px;
}

.modalbody {
  margin-bottom: 10px;
}
</style>