import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    type_of_vehicles: ["New", "Pre-Owned", "Loaner"],
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
      "Audi",
      "Buick",
      "Cadillac",
      "Chevrolet",
      "Chrysler",
      "Dodge",
      "Fiat",
      "Ford",
      "GMC",
      "Honda",
      "Hyundai",
      "Jaguar",
      "Jeep",
      "Kia",
      "Land Rover",
      "Lexus",
      "Lincoln",
      "Mercedes",
      "Nissan",
      "Porsche",
      "Scion",
      "Subaru",
      "Tesla",
      "Toyota",
      "Volvo",
      "VW",
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
    customer: [
      "Here waiting",
      "Coming in later",
      "Customer isn't coming in for Finance"
    ],
    booleans: ["Yes", "No"],
    delivery: ["Bay 1", "Bay 2", "Bay 3", "Bay 4", "Delivery Bay Overflow"],
    make: ["BMW", "MINI", "Other"]
  },
  getters: {},
  mutations: {}
});
