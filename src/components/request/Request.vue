<template>
  <div class="request">
    <!-- // * Make Ready / We Owe Switch: Start -->
    <div class="mt-4">
      <b-button-group size="md">
        <b-button @click="request_type = false" :pressed="!request_type" variant="danger">Make Ready</b-button>
        <b-button @click="request_type = true" :pressed="request_type" variant="danger">We Owe</b-button>
      </b-button-group>
    </div>
    <!-- // * Make Ready / We Owe Switch: End -->
    <!-- // ! Make Ready Request Form: START -->
    <!-- // * Make Ready Request Form: START -->
    <div v-if="request_type == null || request_type == false">
      <!-- // * Main Heading -->
      <h1 class="display-3 text-center heading">Make Ready Request</h1>
      <!-- // * ~~~ Form: Start ~~~ -->
      <b-form class="mb-4" @submit.prevent="onSubmit">
        <!-- // * customers name input -->
        <b-form-group
          class="group"
          id="input-customer-name"
          label="Customer Name:"
          label-for="customer-name"
        >
          <b-form-input
            id="customer-name"
            v-model="customer_name"
            type="text"
            required
            placeholder="Please enter your customers name..."
          ></b-form-input>
        </b-form-group>

        <!-- // * type of vehicle select -->
        <b-form-group
          class="group"
          id="input-type-of-vehicle"
          label="Type of Vehicle:"
          label-for="type-of-vehicle"
        >
          <b-form-select
            id="type-of-vehicle"
            v-model="type_of_vehicle"
            :options="this.$store.state.type_of_vehicles"
            required
          ></b-form-select>
        </b-form-group>

        <!-- // * model select -->
        <b-form-group class="group" id="input-model" label="Model:" label-for="model">
          <b-form-select id="model" v-model="model" :options="$store.state.preowned" required></b-form-select>
        </b-form-group>

        <!-- // * year select -->
        <b-form-group class="group" id="input-year" label="Year:" label-for="year">
          <b-form-select id="year" v-model="year" :options="this.$store.state.years" required></b-form-select>
        </b-form-group>

        <!-- // * stock number input -->
        <b-form-group
          class="group"
          id="input-stock-number"
          label="Stock Number:"
          label-for="stock-number"
        >
          <b-form-input
            id="stock-number"
            v-model="stock_number"
            type="text"
            required
            placeholder="Please enter the vehicle stock #..."
          ></b-form-input>
        </b-form-group>

        <!-- // * mileage input -->
        <b-form-group class="group" id="input-mileage" label="Mileage:" label-for="mileage">
          <b-form-input
            id="mileage"
            v-model="mileage"
            type="text"
            required
            placeholder="Please enter the current mileage..."
          ></b-form-input>
        </b-form-group>

        <!-- // * deal number input -->
        <b-form-group
          class="group"
          id="input-deal_number"
          label="Deal Number:"
          label-for="deal-number"
        >
          <b-form-input
            id="deal-number"
            v-model="deal_number"
            type="text"
            required
            placeholder="Please enter your deal number..."
          ></b-form-input>
        </b-form-group>

        <!-- // * front plate radio select -->
        <b-form-group v-if="type_of_vehicle !== 'Pre-Owned'" class="group" id="front-plate">
          <b-form-group
            label="Would your customer like their front license plate bracket installed?"
          >
            <b-form-radio v-model="front_plate" name="some-radios" value="Yes">Yes, they would.</b-form-radio>
            <b-form-radio v-model="front_plate" name="some-radios" value="No">No, they would not.</b-form-radio>
          </b-form-group>
        </b-form-group>

        <!-- // * Customer care package -->
        <b-form-group
          class="group"
          id="input-ccp"
          label="Did you sell the customer care package?"
          label-for="ccp"
        >
          <b-form-select id="ccp" v-model="ccp" :options="this.$store.state.booleans" required></b-form-select>
        </b-form-group>

        <!-- // * notes for sales managers -->
        <b-row class="group">
          <b-col sm="2">
            <label for="notes-sales-managers">Notes for Sales Managers</label>
          </b-col>
          <b-col sm="10">
            <b-form-textarea
              v-model="notes_sales_managers"
              id="notes-sales-managers"
              placeholder="Please enter your notes for the sales managers here..."
            ></b-form-textarea>
          </b-col>
        </b-row>

        <!-- // * notes for parts -->
        <b-row class="group">
          <b-col sm="2">
            <label for="notes-parts">Notes for Parts</label>
          </b-col>
          <b-col sm="10">
            <b-form-textarea
              v-model="notes_parts"
              id="notes-parts"
              placeholder="Please enter your notes for parts here..."
            ></b-form-textarea>
          </b-col>
        </b-row>

        <!-- // * notes for finance -->
        <b-row class="group">
          <b-col sm="2">
            <label for="notes-finance">Notes for Finance</label>
          </b-col>
          <b-col sm="10">
            <b-form-textarea
              v-model="notes_finance"
              id="notes-finance"
              placeholder="Please enter your notes for finanace here..."
            ></b-form-textarea>
          </b-col>
        </b-row>

        <!-- // * notes for detail -->
        <b-row class="group">
          <b-col sm="2">
            <label for="notes-detail">Notes for Detail</label>
          </b-col>
          <b-col sm="10">
            <b-form-textarea
              v-model="notes_detail"
              id="notes-detail"
              placeholder="Please enter your notes for detail here..."
            ></b-form-textarea>
          </b-col>
        </b-row>

        <!-- // * customer status select -->
        <b-form-group
          class="group"
          id="input-customer-status"
          label="Where is your customer?"
          label-for="customer-status"
        >
          <b-form-select
            id="customer-status"
            v-model="customer_status"
            :options="this.$store.state.customer"
            required
          ></b-form-select>
        </b-form-group>

        <!-- // * Buttons -->
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
    <!-- // ! We Owe Request Form: Start -->
    <!-- // * We Owe Request Form: Start -->
    <div v-if="request_type == true">
      <!-- // * Main Heading -->
      <h1 class="display-3 text-center heading">We Owe Request</h1>
      <b-form>
        <!-- // * Customer Name -->
        <b-form-group id="weowe-customer-name" label="Customer Name:" label-for="customer-name">
          <b-form-input
            id="customer-name"
            v-model="customer_name"
            type="text"
            required
            placeholder="Please enter your customers first and last name..."
          ></b-form-input>
        </b-form-group>

        <!-- // * Stock Number -->
        <b-form-group id="weowe-stock-number" label="Stock Number:" label-for="stock-number">
          <b-form-input
            id="stock-number"
            v-model="stock_number"
            required
            placeholder="Please enter the vehicle stock #"
          ></b-form-input>
        </b-form-group>

        <!-- // * Type of Vehicle -->
        <b-form-group
          id="weowe-type-of-vehicle"
          label="Type of Vehicle:"
          label-for="type-of-vehicle"
        >
          <b-form-select
            id="type-of-vehicle"
            v-model="type_of_vehicle"
            :options="$store.state.type_of_vehicles"
            required
          ></b-form-select>
        </b-form-group>

        <!-- // * Make -->
        <b-form-group id="weowe-make" label="Make:" label-for="make">
          <b-form-select id="make" v-model="make" :options="$store.state.make" required></b-form-select>
        </b-form-group>

        <!-- // * Model -->
        <b-form-group id="weowe-model" label="Model:" label-for="model">
          <b-form-select id="model" v-model="model" :options="$store.state.preowned" required></b-form-select>
        </b-form-group>

        <!-- // * Year -->
        <b-form-group id="weowe-year" label="Year:" label-for="year">
          <b-form-select id="year" v-model="year" :options="$store.state.years" required></b-form-select>
        </b-form-group>
        <template v-if="!model || !year">
          <b-alert show variant="info">Please fill out the above information to continute...</b-alert>
        </template>
        <!-- // * Hiding everything below the form until they choose a model and a year -->
        <template v-if="model && year !== ''">
          <!-- // * prebuilt / other item switch -->
          <div class="mt-4 mb-3">
            <b-button-group size="md">
              <b-button
                v-b-tooltip.hover
                title="Xpel, Floor Mats, Hats, etc."
                @click="accessory_type = false"
                :pressed="!accessory_type"
                variant="primary"
              >Pre-Built Packages</b-button>
              <b-button
                v-b-tooltip.hover
                title="This is where you enter items that are not in a pre built package (replacement keys, tow hook covers, etc)"
                @click="accessory_type = true"
                :pressed="accessory_type"
                variant="primary"
              >Other Items</b-button>
            </b-button-group>
          </div>
          <!-- // * Pre-built packages -->
          <template v-if="accessory_type == null || accessory_type == false">
            <b-form-group id="weowe-packages" label="Pre-Built Packages:" label-for="packages">
              <!-- // * Select Menu -->
              <b-form-select
                id="packages"
                v-model="item"
                text-field="accessory"
                value-field="id"
                :options="filterPackage"
              ></b-form-select>
              <b-button class="mt-3" @click="addPackages" variant="danger">Add</b-button>
            </b-form-group>
          </template>

          <!-- // * Other Items -->
          <b-alert
            v-if="accessory_type == true"
            show
            variant="info"
          >Remember, you can only put a we owe in for a single "Other" item at this time.</b-alert>
          <template v-if="accessory_type == true && items.length < 1">
            <b-form-group id="weowe-other" label="Other Items:" label-for="other">
              <b-form-input
                id="other"
                v-model="other"
                type="text"
                placeholder="Please enter any accessory that is not in the pre built dropdown"
              ></b-form-input>
              <b-button class="mt-3" @click="addOther" variant="danger">Add</b-button>
            </b-form-group>
          </template>

          <!-- // * List of Items the associate has picked -->

          <h4 v-for="(item, i) in items" :key="i">
            <!-- // * If the accessory is a pre-built package -->
            <b-badge
              v-b-tooltip.hover
              :title="item.adviser_spiff"
              v-if="item.type"
            >{{ item.accessory }} - ${{ item.total_install_price }}</b-badge>
            <!-- // * if the accessory is not a pre-built package -->
            <b-badge v-else>{{ item.accessory }} - Price will be quoted</b-badge>
            <i @click="deleteItem(item, i)" class="text-danger material-icons">delete</i>
          </h4>
          <hr />
          <template v-if="items.length > 0">
            <!-- // * Pre built package submit button -->
            <b-button
              v-if="accessory_type == null || accessory_type == false"
              variant="primary"
              @click="weowePackageSubmit"
            >Submit</b-button>
            <!-- // * other submit button -->
            <b-button
              @click="weoweOtherSubmit"
              v-if="accessory_type == true"
              type="submit"
              variant="primary"
            >Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </template>
        </template>
      </b-form>
    </div>
  </div>
</template>
       
      </b-form>
    </div>
  </div>
</template>

<script>
// * Imports
import { db } from "../../main";
import firebase from "firebase";

export default {
  name: "Request",
  props: ["user"],
  data() {
    return {
      packages: [],
      items: [],
      item: "",
      other: "",
      accessory_type: "",
      // * ~~~ FORM INPUT INFORMATION: Start ~~~
      customer_name: "",
      type_of_vehicle: "",
      make: "",
      model: "",
      year: "",
      stock_number: "",
      mileage: "",
      deal_number: "",
      front_plate: "",
      notes_sales_managers: "",
      notes_parts: "",
      notes_finance: "",
      notes_detail: "",
      customer_status: "",
      // * ~~~ FORM INPUT INFORMATION: End ~~~
      // * ~~~ States: Start ~~~
      // ! request_state is the overall state of the request, will be true until the request is complete
      request_state: true,
      sales_state: true,
      parts_state: false,
      detail_state: false,
      finance_state: false,
      // * ~~~ States: End ~~~
      // * ~~~ Statuses: Start ~~~
      // ! overall_status and sales_status are starting off with values because after this the request is live and will not have another step before needing to be shown on the sales managers view
      overall_status: 10,
      sales_status: "Pending...",
      parts_status: "",
      finance_status: "",
      detail_status: "",
      // * ~~~ Statuses: End ~~~
      // * ~~~ User Information: Start ~~~
      associate: this.user.display_name,
      associate_photo: this.user.photo,
      associate_email: this.user.email,
      associate_uid: this.user.uid,
      // * ~~~ User Information: End ~~~
      // * ~~~ Department Specific Variables: Start ~~~
      //   ! Parts Variables
      invoice_number: "",
      parts_on_order: "",
      afterhours: "",
      //   ! Detail Variables
      delivery_bay: "",
      //   ! Finance Variables
      nano_care: "",
      ccp: "",
      // * REQUEST TYPE SELECTION
      request_type: null,
      sales_manager_comments: ""
    };
  },
  methods: {
    // ! This function set the vast majority of the variables for the entire project
    // ! Alter wisely...
    onSubmit() {
      db.collection("makeready")
        .add({
          initial_timestamp: Date.now(),
          data: {
            // * Form input values
            customer_name: this.customer_name,
            type_of_vehicle: this.type_of_vehicle,
            model: this.model,
            year: this.year,
            stock_number: this.stock_number,
            mileage: this.mileage,
            deal_number: this.deal_number,
            front_plate: this.front_plate,
            notes_sales_managers: this.notes_sales_managers,
            notes_parts: this.notes_parts,
            notes_finance: this.notes_finance,
            notes_detail: this.notes_detail,
            customer_status: this.customer_status,
            ccp: this.ccp
          },
          // * Department states
          states: {
            request_state: true,
            sales_state: true,
            parts_state: false,
            detail_state: false,
            finance_state: false
          },
          // * Department statuses
          status: {
            overall_status: 10,
            sales_status: "Pending...",
            parts_status: null,
            finance_status: null,
            detail_status: null
          },
          // * Additional user information
          userinfo: {
            associate: this.user.display_name,
            associate_email: this.user.email
          },
          // * Parts specific variables
          parts: {
            invoice_number: null,
            parts_on_order: null,
            afterhours: null
          },
          // * Detail specific variables
          detail: {
            delivery_bay: null,
            front_plate_install: ""
          },
          finance: {
            nano_care: null
          }
        })
        .then(doc => {
          this.$router.push({
            name: "Success",
            params: { id: doc.id }
          });
        });
      //   TODO: Reset certain variables (ones with inputs)
    },
    weowePackageSubmit() {
      db
        .collection("weowes")
        .add({
          initial_timestamp: Date.now(),
          request_type: this.request_type,
          data: {
            customer_name: this.customer_name,
            stock_number: this.stock_number,
            type_of_vehicle: this.type_of_vehicle,
            make: this.make,
            model: this.model,
            year: this.year,
            accessories: this.items,
            spiff: null
          },
          userinfo: {
            associate: this.user.display_name,
            photo: firebase.auth().currentUser.photoURL,
            email: this.user.email
          },
          states: {
            weowe_state: true,
            sales_state: true,
            parts_state: false
          },
          status: {
            weowe_status: "In Process...",
            sales_status: "Pending...",
            parts_status: null
          }
        })
        .then(doc => {
          this.$router.push({
            name: "Success",
            params: { id: doc.id }
          });
        })((this.customer_name = "")),
        (this.stock_number = ""),
        (this.type_of_vehicle = ""),
        (this.make = ""),
        (this.model = ""),
        (this.year = ""),
        (this.accessories = ""),
        (this.request_state = null),
        (this.items = []);
      console.log(this.user);
    },
    weoweOtherSubmit() {
      db
        .collection("weowes")
        .add({
          initial_timestamp: Date.now(),
          // TODO: this is a bandaid fix, come up with a better solution
          update: false,
          request_type: this.request_type,
          data: {
            customer_name: this.customer_name,
            stock_number: this.stock_number,
            type_of_vehicle: this.type_of_vehicle,
            make: this.make,
            model: this.model,
            year: this.year,
            accessories: this.items
          },
          userinfo: {
            associate: this.user.display_name,
            photo: firebase.auth().currentUser.photoURL,
            email: this.user.email
          },
          states: {
            weowe_state: true,
            sales_state: false,
            parts_state: true
          },
          status: {
            weowe_status: "In Process...",
            sales_status: null,
            parts_status: "Pending..."
          }
        })
        .then(doc => {
          this.$router.push({
            name: "Success",
            params: { id: doc.id }
          });
        })((this.customer_name = "")),
        (this.stock_number = ""),
        (this.type_of_vehicle = ""),
        (this.make = ""),
        (this.model = ""),
        (this.year = ""),
        (this.accessories = ""),
        (this.request_state = null),
        (this.items = []);
      console.log(this.user);
    },
    // * Delete Feature
    deleteItem(item, i) {
      this.items.splice(i, 1);
    },
    // * grabbing the item that is selected and filtering throught the pricing data and returning the object that matches
    addPackages() {
      console.log(this.item);
      let iteminfo = this.packages.filter(item => {
        if (this.item == item.id) {
          return item;
        }
      });
      iteminfo.forEach(element => {
        this.items.push(element);
      });
      console.log(this.items);
      iteminfo = null;
      this.item = null;
    },
    addOther() {
      this.items.push({
        accessory: this.other,
        total_install_price: null
      });
      console.log(this.items);
      this.other = null;
    }
  },
  computed: {
    // * this filters the pricing data base to only the car that is selected. It goes off the year and model of the car
    filterPackage() {
      let filterModel = this.packages.filter(item => {
        return item.id.includes(
          this.year +
            this.model
              .replace(/\s/g, "")
              .substring(0, 4)
              .toUpperCase()
        );
      });
      let filterAll = this.packages.filter(item => {
        return item.id.includes("AllAll");
      });

      let filter = this.packages.filter(item => {
        return item.id.includes("OTHER");
      });
      return filterModel.concat(filterAll).concat(filter);
    }
  },
  firestore() {
    return {
      packages: db.collection("pricing")
    };
  }
};
</script>

<style scoped>
/* //* adds margin to the top and bottom of each form group/question */
.group {
  margin-top: 20px;
  margin-bottom: 40px;
}
/* //* adds margin to the top and bottom of the title/heading */
.heading {
  margin-top: 50px;
  margin-bottom: 25px;
}

.switch {
  margin-top: 15px;
}

.switch-2 {
  margin-bottom: 30px;
}
</style>