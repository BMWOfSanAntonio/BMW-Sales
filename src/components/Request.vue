<template>
  <v-container>
    <v-row justify="center">
      <v-form>
        <v-col class="d-flex" cols="12">
          <v-switch
            color="deep-orange darken-2"
            v-model="request_type"
            inset
            :label="!request_type ? 'Make Ready' : 'We Owe'"
          ></v-switch>
        </v-col>

        <!-- ***** MAKE READY SECTION ***** -->

        <div v-if="request_type == null || request_type == false">
          <v-col class="d-flex" cols="12">
            <div class="display-3">Make Ready Request Form</div>
          </v-col>
          <!-- ROW 1 -->
          <!-- Customer Name -->
          <v-col class="d-flex" cols="12">
            <v-text-field
              class="top-form"
              color="deep-orange darken-2"
              v-model="customer_name"
              label="Customer Name *"
              required
            ></v-text-field>
          </v-col>
          <!-- ROW 2 -->
          <v-col class="d-none d-sm-flex" cols="12" sm="10" md="12" lg="12">
            <!-- Type of Vehicle -->
            <v-select
              color="deep-orange darken-2"
              v-model="vehicle_type"
              :items="type_of_vehicle"
              label="Type of Vehicle *"
              required
            ></v-select>
            <!-- If type of vehicle is new or loaner it will show this -->
            <v-select
              color="deep-orange darken-2"
              v-model="vehicle_model"
              :items="preowned"
              label="Vehicle Model *"
              v-if="vehicle_type === 'Pre-Owned' "
              required
            ></v-select>
            <!-- If type of vehicle is preowned it will show this -->
            <v-select
              color="deep-orange darken-2"
              v-model="vehicle_model"
              :items="vehicles"
              label="Vehicle Model *"
              required
              v-else
            ></v-select>
            <!-- Vehicle Year -->
            <v-select
              color="deep-orange darken-2"
              v-model="vehicle_year"
              :items="years"
              label="Vehicle Year *"
              required
            ></v-select>
          </v-col>
          <v-col class="d-flex d-sm-none" cols="12" sm="10" md="12" lg="12">
            <!-- Type of Vehicle -->
            <v-select
              color="deep-orange darken-2"
              v-model="vehicle_type"
              :items="type_of_vehicle"
              label="Type of Vehicle *"
              required
            ></v-select>
          </v-col>
          <v-col
            v-if="vehicle_type === 'Pre-Owned' "
            class="d-flex d-sm-none"
            cols="12"
            sm="10"
            md="12"
            lg="12"
          >
            <!-- If type of vehicle is new or loaner it will show this -->
            <v-select
              color="deep-orange darken-2"
              v-model="vehicle_model"
              :items="preowned"
              label="Vehicle Model *"
              required
            ></v-select>
          </v-col>
          <v-col v-else class="d-flex d-sm-none" cols="12" sm="10" md="12" lg="12">
            <!-- If type of vehicle is preowned it will show this -->
            <v-select
              color="deep-orange darken-2"
              v-model="vehicle_model"
              :items="vehicles"
              label="Vehicle Model *"
              required
            ></v-select>
          </v-col>
          <v-col class="d-flex d-sm-none" cols="12" sm="10" md="12" lg="12">
            <!-- Vehicle Year -->
            <v-select
              color="deep-orange darken-2"
              v-model="vehicle_year"
              :items="years"
              label="Vehicle Year *"
              required
            ></v-select>
          </v-col>
          <!-- ROW 3 -->
          <v-col class="d-none d-sm-flex" cols="12" sm="10" md="12" lg="12">
            <!-- Stock Number -->
            <v-text-field
              color="deep-orange darken-2"
              v-model="stock_number"
              label="Stock # *"
              required
            ></v-text-field>
            <!-- Mileage -->
            <v-text-field color="deep-orange darken-2" v-model="mileage" label="Mileage *" required></v-text-field>
          </v-col>
          <v-col class="d-flex d-sm-none" cols="12" sm="10" md="12" lg="12">
            <!-- Stock Number -->
            <v-text-field
              color="deep-orange darken-2"
              v-model="stock_number"
              label="Stock # *"
              required
            ></v-text-field>
          </v-col>
          <v-col class="d-flex d-sm-none" cols="12" sm="10" md="12" lg="12">
            <!-- Mileage -->
            <v-text-field color="deep-orange darken-2" v-model="mileage" label="Mileage *" required></v-text-field>
          </v-col>
          <!-- ROW 4 -->
          <v-col class="d-none d-sm-flex" cols="12" sm="10" md="12" lg="12">
            <!-- Deal Number -->
            <v-text-field
              color="deep-orange darken-2"
              v-model="deal_number"
              label="Deal # *"
              required
            ></v-text-field>
            <!-- Customer Care Package -->
            <v-select
              color="deep-orange darken-2"
              v-model="customer_care_package"
              :items="booleans"
              label="Customer Care Package *"
              required
            ></v-select>
          </v-col>
          <v-col class="d-flex d-sm-none" cols="12" sm="10" md="12" lg="12">
            <!-- Deal Number -->
            <v-text-field
              color="deep-orange darken-2"
              v-model="deal_number"
              label="Deal # *"
              required
            ></v-text-field>
          </v-col>
          <v-col class="d-flex d-sm-none" cols="12" sm="10" md="12" lg="12">
            <!-- Customer Care Package -->
            <v-select
              color="deep-orange darken-2"
              v-model="customer_care_package"
              :items="booleans"
              label="Customer Care Package *"
              required
            ></v-select>
          </v-col>
          <!-- ROW 5 -->
          <v-col class="d-none d-sm-flex" cols="12" sm="10" md="12" lg="12">
            <!-- Front Plate Bracket -->
            <v-select
              color="deep-orange darken-2"
              v-model="front_bracket"
              :items="booleans"
              label="Does your customer want their front plate bracket installed? *"
              required
            ></v-select>
            <!-- Accessories -->
            <v-select
              color="deep-orange darken-2"
              v-model="accessories"
              :items="booleans"
              label="Did you sell extra accessories with the vehicle? *"
              required
            ></v-select>
          </v-col>
          <v-col class="d-flex d-sm-none" cols="12" sm="10" md="12" lg="12">
            <!-- Front Plate Bracket -->
            <v-select
              color="deep-orange darken-2"
              v-model="front_bracket"
              :items="booleans"
              label="Does your customer want their front plate bracket installed? *"
              required
            ></v-select>
          </v-col>
          <v-col class="d-flex d-sm-none" cols="12" sm="10" md="12" lg="12">
            <!-- Accessories -->
            <v-select
              color="deep-orange darken-2"
              v-model="accessories"
              :items="booleans"
              label="Did you sell extra accessories with the vehicle? *"
              required
            ></v-select>
          </v-col>
          <!-- ROW 6 -->
          <v-col v-if="accessories == 'Yes'" class="d-flex" cols="12" sm="10" md="12" lg="12">
            <!-- List of accessories -->
            <v-text-field
              color="deep-orange darken-2"
              v-model="list_accessories"
              label="Accessories Sold *"
              required
            ></v-text-field>
          </v-col>
          <!-- ROW 7 -->
          <v-col class="d-none d-sm-flex" cols="12" sm="10" md="12" lg="12">
            <!-- Notes to Parts -->
            <v-text-field color="deep-orange darken-2" v-model="parts_notes" label="Notes to Parts"></v-text-field>
            <!-- Notes to Detail -->
            <v-text-field
              color="deep-orange darken-2"
              v-model="detail_notes"
              label="Notes to Detail"
            ></v-text-field>
          </v-col>
          <v-col class="d-none d-sm-flex" cols="12" sm="10" md="12" lg="12">
            <!-- Accessories -->
            <v-select
              color="deep-orange darken-2"
              v-model="customer_status"
              :items="customer_statuses"
              label="Where is your customer? *"
              required
            ></v-select>
          </v-col>
          <v-col class="d-flex d-sm-none" cols="12" sm="10" md="12" lg="12">
            <!-- Notes to Parts -->
            <v-text-field
              color="deep-orange darken-2"
              v-model="parts_notes"
              label="Notes to Parts"
              required
            ></v-text-field>
          </v-col>
          <v-col class="d-flex d-sm-none" cols="12" sm="10" md="12" lg="12">
            <v-text-field
              color="deep-orange darken-2"
              v-model="detail_notes"
              label="Notes to Detail"
              required
            ></v-text-field>
          </v-col>
          <!-- Notes to Detail -->
          <v-col class="d-flex d-sm-none" cols="12" sm="10" md="12" lg="12">
            <v-select
              color="deep-orange darken-2"
              v-model="customer_status"
              :items="customer_statuses"
              label="Where is your customer? *"
              required
            ></v-select>
          </v-col>
          <!-- Accessories -->

          <v-row justify="center">
            <v-btn
              justify="center"
              @click="makeReadyRequest"
              color="error"
              dark
              large
            >Submit Make Ready Request</v-btn>
          </v-row>
        </div>

        <!-- ***** WE OWE SECTION ***** -->
        <div v-else-if="request_type == true">
          <v-col class="d-flex" cols="12">
            <div class="display-3">We Owe Request Form</div>
          </v-col>

          <!-- ROW 1 -->
          <!-- Customer Name -->
          <v-col class="top-form d-none d-sm-flex" cols="12">
            <v-text-field
              color="deep-orange darken-2"
              v-model="customer_name"
              label="Customer's First and Last Name *"
              required
            ></v-text-field>
            <!-- Stock Number -->
            <v-text-field
              color="deep-orange darken-2"
              v-model="stock_number"
              label="Stock # *"
              required
            ></v-text-field>
          </v-col>
          <v-col class="top-form d-flex d-sm-none" cols="12">
            <v-text-field
              color="deep-orange darken-2"
              v-model="customer_name"
              label="Customer's First and Last Name *"
              required
            ></v-text-field>
          </v-col>
          <v-col class="top-form d-flex d-sm-none" cols="12">
            <!-- Stock Number -->
            <v-text-field
              color="deep-orange darken-2"
              v-model="stock_number"
              label="Stock # *"
              required
            ></v-text-field>
          </v-col>

          <!-- ROW 2 -->
          <v-col class="d-none d-sm-flex" cols="12" sm="10" md="12" lg="12">
            <!-- Type of Vehicle -->
            <v-select
              color="deep-orange darken-2"
              v-model="vehicle_type"
              :items="type_of_vehicle"
              label="Type of Vehicle *"
              required
            ></v-select>
            <!-- Vehicle Make -->
            <v-select
              color="deep-orange darken-2"
              v-model="vehicle_make"
              :items="makes"
              label="Vehicle Make *"
              required
            ></v-select>
          </v-col>
          <v-col class="d-flex d-sm-none" cols="12" sm="10" md="12" lg="12">
            <!-- Type of Vehicle -->
            <v-select
              color="deep-orange darken-2"
              v-model="vehicle_type"
              :items="type_of_vehicle"
              label="Type of Vehicle *"
              required
            ></v-select>
          </v-col>
          <v-col class="d-flex d-sm-none" cols="12" sm="10" md="12" lg="12">
            <!-- Vehicle Make -->
            <v-select
              color="deep-orange darken-2"
              v-model="vehicle_make"
              :items="makes"
              label="Vehicle Make *"
              required
            ></v-select>
          </v-col>
          <v-col class="d-none d-sm-flex" cols="12" sm="10" md="12" lg="12">
            <!-- If type of vehicle is new or loaner it will show this -->
            <v-select
              color="deep-orange darken-2"
              v-model="vehicle_model"
              :items="preowned"
              label="Vehicle Model *"
              required
            ></v-select>
            <!-- Vehicle Year -->
            <v-select
              color="deep-orange darken-2"
              v-model="vehicle_year"
              :items="years"
              label="Vehicle Year *"
              required
            ></v-select>
          </v-col>
          <v-col class="d-flex d-sm-none" cols="12" sm="10" md="12" lg="12">
            <!-- If type of vehicle is new or loaner it will show this -->
            <v-select
              color="deep-orange darken-2"
              v-model="vehicle_model"
              :items="preowned"
              label="Vehicle Model *"
              required
            ></v-select>
          </v-col>
          <v-col class="d-flex d-sm-none" cols="12" sm="10" md="12" lg="12">
            <!-- Vehicle Year -->
            <v-select
              color="deep-orange darken-2"
              v-model="vehicle_year"
              :items="years"
              label="Vehicle Year *"
              required
            ></v-select>
          </v-col>
          <!-- ROW 5 -->
          <v-col class="d-flex" cols="12" sm="10" md="12" lg="12">
            <!-- List of accessories -->
            <v-textarea
              name="input-7-1"
              label="List Items for We Owe *"
              v-model="list_accessories"
              hint="List all the items you need are paying for, only items on this list will be billed out and pulled/ordered."
              required
            ></v-textarea>
          </v-col>
          <v-row justify="center">
            <v-btn @click="weOweRequest" color="error" dark large>Submit We Owe Request</v-btn>
          </v-row>
        </div>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
// Imports
import { db } from "../main";
import firebase from "firebase";

export default {
  name: "Request",
  data() {
    return {
      // Form Arrays
      type_of_vehicle: ["New", "Pre-Owned", "Loaner"],
      vehicles: [
        "1 series",
        "2 series",
        "3 series",
        "4 series",
        "5 series",
        "6 series",
        "7 series",
        "8 series",
        "X1",
        "X2",
        "X3",
        "X4",
        "X5",
        "X6",
        "X7",
        "Z4",
        "i8",
        "i3",
        "M2",
        "M3",
        "M4",
        "M5",
        "M6",
        "M8"
      ],
      preowned: [
        "Chrysler",
        "Dodge",
        "Jeep",
        "Ford",
        "Lincoln",
        "Buick",
        "Cadillac",
        "Chevrolet",
        "GMC",
        "Audi",
        "Lexus",
        "Land Rover",
        "Mercedes",
        "Jaguar",
        "Volvo",
        "VW",
        "Porsche",
        "Tesla",
        "Subaru",
        "Honda",
        "Nissan",
        "Toyota",
        "Kia",
        "Hyundai",
        "Fiat",
        "Scion",
        "1 series",
        "2 series",
        "3 series",
        "4 series",
        "5 series",
        "6 series",
        "7 series",
        "8 series",
        "X1",
        "X2",
        "X3",
        "X4",
        "X5",
        "X6",
        "X7",
        "Z4",
        "i8",
        "i3",
        "M2",
        "M3",
        "M4",
        "M5",
        "M6",
        "M8",
        "Other"
      ],
      years: [
        "2020",
        "2019",
        "2018",
        "2017",
        "2016",
        "2015",
        "2014",
        "2013",
        "2012",
        "2011",
        "2010",
        "2009",
        "2008",
        "2007",
        "2006",
        "2005",
        "2004",
        "2003",
        "2002",
        "2001",
        "2000"
      ],
      booleans: ["Yes", "No"],
      customer_statuses: [
        "Customer Is Here Waiting",
        "Customer Is Coming In Later",
        "Customer Is Not Coming In"
      ],
      makes: ["BMW", "MINI", "Other"],
      // Form Variables
      request_type: "",
      // Variables
      customer_name: "",
      vehicle_type: "",
      vehicle_model: "",
      customer_status: "",
      vehicle_year: "",
      stock_number: "",
      mileage: "",
      deal_number: "",
      customer_care_package: "",
      front_bracket: "",
      accessories: "No",
      list_accessories: "",
      parts_notes: "",
      detail_notes: "",
      vehicle_make: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      checkbox: true,
      ship_to_customer: "",
      user: firebase.auth().currentUser.displayName,
      photo: firebase.auth().currentUser.photoURL,
      email: firebase.auth().currentUser.email,
      alert: false
    };
  },
  methods: {
    makeReadyRequest() {
      if (
        this.customer_name !== "" &&
        this.vehicle_type !== "" &&
        this.vehicle_model !== "" &&
        this.vehicle_year !== "" &&
        this.stock_number !== "" &&
        this.mileage !== "" &&
        this.deal_number !== "" &&
        this.customer_care_package !== "" &&
        this.accessories !== "" &&
        this.front_bracket !== "" &&
        this.customer_status !== ""
      ) {
        db.collection("makeReady").add({
          // Form input values START
          associate: this.user,
          request_type: this.request_type,
          customer_name: this.customer_name,
          vehicle_type: this.vehicle_type,
          vehicle_model: this.vehicle_model,
          stock_number: this.stock_number,
          customer_status: this.customer_status,
          vehicle_year: this.vehicle_year,
          mileage: this.mileage,
          deal_number: this.deal_number,
          customer_care_package: this.customer_care_package,
          front_bracket: this.front_bracket,
          accessories: this.accessories,
          list_accessories: this.list_accessories,
          parts_notes: this.parts_notes,
          detail_notes: this.detail_notes,
          // Form input values END
          // States
          sales_state: true,
          parts_state: true,
          detail_state: false,
          finance_state: false,
          // Statuses
          sales_status: "Waiting for Approval",
          parts_status: "",
          detail_status: "",
          finance_status: "",
          status: true,
          // Timestamps
          initial_timestamp: new Date(),
          // Requestor Information
          photo_url: this.photo,
          email: this.email,
          // Extra
          invoice_number: "",
          parts_on_order: "",
          afterhours: "",
          delivery_bay: "",
          finance_comments: ""
        });
        this.request_type = "";
        this.customer_name = "";
        this.vehicle_type = "";
        this.vehicle_model = "";
        this.stock_number = "";
        this.customer_status = "";
        this.vehicle_year = "";
        this.mileage = "";
        this.deal_number = "";
        this.customer_care_package = "";
        this.front_bracket = "";
        this.accessories = "";
        this.list_accessories = "";
        this.parts_notes = "";
        this.detail_notes = "";
        this.alert = true;
      } else {
        alert(
          "Please fill in all required fields. Required Field are noted with an *"
        );
      }
    },
    weOweRequest() {
      db.collection("weowe").add({
        // Form Values Start
        associate: this.user,
        request_type: this.request_type,
        customer_name: this.customer_name,
        stock_number: this.stock_number,
        vehicle_type: this.vehicle_type,
        vehicle_make: this.vehicle_make,
        vehicle_model: this.vehicle_model,
        vehicle_year: this.vehicle_year,
        list_accessories: this.list_accessories,
        // Form Values Start
        // States
        sales_state: "",
        parts_state: true,
        parts_status: "",
        parts_quote_state: true,
        parts_quote_status: "Waiting for Parts to Quote",
        quote_number: "",
        quote_price: "", // Other Parts Variables
        parts_on_order: "",
        invoice_number: "",
        // Timestamp
        initial_timestamp: new Date(),
        // Requestor Information
        photo_url: this.photo,
        email: this.email
      });
      this.request_type = "";
      this.customer_name = "";
      this.stock_number = "";
      this.vehicle_type = "";
      this.vehicle_make = "";
      this.vehicle_model = "";
      this.vehicle_year = "";
      this.list_accessories = "";
    }
  },
  firestore() {
    return {
      reqs: db.collection("makeReady"),
      weowes: db.collection("weowe")
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-center {
  text-align: center;
  margin-top: 10px;
}
.top-form {
  margin-top: 20px;
}

button {
  margin-top: 10px;
}
</style>
