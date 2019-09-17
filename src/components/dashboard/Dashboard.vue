<template>
  <div class="dashboard">
    <!-- // * Titles -->
    <div class="titles">
      <!-- // * Sales Associate View Title -->
      <h1
        class="display-4"
        v-if="this.user.access_level == 'Sales'"
      >{{ this.user.display_name }}'s Requests</h1>
      <!-- // * Sales Manager View Title -->
      <h1 class="display-4" v-if="this.user.access_level == 'SalesManager'">Sales Manager</h1>
      <!-- // * Finance View Title -->
      <h1 class="display-4" v-if="this.user.access_level == 'Finance'">Finance Queue</h1>
      <!-- // * Parts View Title -->
      <h1 class="display-4" v-if="this.user.access_level == 'Parts'">Parts Queue</h1>
      <!-- // * Detail View Title -->
      <h1 class="display-4" v-if="this.user.access_level == 'Detail'">Detail Queue</h1>
    </div>
    <table class="table table-hover">
      <!-- // ! user/department views: Start -->
      <!-- // ! each component has a id, req, user property: id - helps to calculate the index, req - gives access to the document in firestore, user - gives you the information about the current user logged in -->
      <!-- // TODO: Figure out a bette way to get a  -->
      <!-- // * Parts View -->
      <Parts
        class="space"
        v-if="user.access_level == 'Parts' || user.access_level == 'Admin'"
        :user="user"
      />
      <PartsWeOwe
        class="space parts-we-owe"
        v-if="(user.access_level == 'Parts' || user.access_level == 'Admin')"
        :user="user"
      />
      <!-- // * Sales View -->
      <SalesDashboard
        class="space"
        v-if="user.access_level == 'Sales' || user.access_level == 'Admin'"
        :user="user"
      />
      <SalesWeOwe
        class="space"
        v-if="user.access_level == 'Sales' || user.access_level == 'Admin'"
        :user="user"
      />
      <!-- // * Sales Manager View -->
      <SalesManagerDashboard
        class="space"
        v-if="user.access_level == 'SalesManager' || user.access_level == 'Admin'"
        :user="user"
      />
      <SalesManagerWeOwe
        class="space"
        v-if="(user.access_level == 'SalesManager' || user.access_level == 'Admin')"
        :user="user"
      />
      <!-- // * Detail View -->
      <Detail
        class="space"
        v-if="user.access_level == 'Detail' || user.access_level == 'Admin'"
        :user="user"
      />
      <DetailNanoCare
        class="space"
        v-if="
    user.access_level == 'Detail' || user.access_level == 'Admin'"
        :user="user"
      />
      <!-- // * Finance View -->
      <Finance
        class="space"
        v-if="user.access_level == 'Finance' || user.access_level == 'Admin'"
        :user="user"
      />
      <Genius class="space" v-if="user.access_level == 'Genius' || user.access_level == 'Admin'" />
      <!-- // ! user/department views: End -->
    </table>
  </div>
</template>

<script>
// * Database & Firebase
import { db } from "../../main";
import firebase from "firebase";

// * Component imports
import SalesDashboard from "./SalesDashboard";
import SalesManagerDashboard from "./SalesManagerDashboard";
import Parts from "./Parts";
import Detail from "./Detail";
import Finance from "./Finance";
import SalesWeOwe from "./SalesWeOwe";
import SalesManagerWeOwe from "./SalesManagerWeOwe";
import PartsWeOwe from "./PartsWeOwe";
import DetailNanoCare from "./DetailNanoCare";
import Genius from "./Genius";

export default {
  name: "Dashboard",
  components: {
    SalesDashboard,
    SalesManagerDashboard,
    Parts,
    Detail,
    Finance,
    SalesWeOwe,
    SalesManagerWeOwe,
    PartsWeOwe,
    DetailNanoCare,
    Genius
  },
  props: ["user"],
  data() {
    return {
      salesView: [],
      salesManagerView: [],
      partsView: [],
      detailView: [],
      financeView: [],
      weowePackages: [],
      weoweSalesManager: [],
      partsPackages: [],
      detailNanoCare: [],
      activeVue: ""
    };
  },
  methods: {},
  computed: {
    filterParts() {
      this.partsPackages.forEach(element => {
        element.data.accessories.forEach(item => {
          if (item.coordinate == "No") {
            return item;
          }
        });
      });
    }
  }
};
</script>

<style scoped >
.space {
  margin-bottom: 100px;
}
.display-4 {
  text-align: center;
}
/* //* Centers text in the table */
table {
  text-align: center;
}
span,
h5 {
  font-weight: bold;
}
.titles {
  margin-top: 25px;
  margin-bottom: 20px;
}
</style>