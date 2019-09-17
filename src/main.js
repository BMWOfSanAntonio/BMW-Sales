// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// * default Vue config w/ router
import Vue from "vue";
import App from "./App";
import router from "./router";
Vue.config.productionTip = false;

// * import Firebase & vuefire
import firebase from "firebase";
import { firestorePlugin } from "vuefire";
import "firebase/firestore";

// * Import Vuex store const
import { store } from "./store/store";

// * Import Portal Vue
import PortalVue from "portal-vue";

// * import date picker
import VCalendar from "v-calendar";

// * Import BootstrapVue
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// * plugins
Vue.use(firestorePlugin);
Vue.use(PortalVue);
Vue.use(BootstrapVue);
Vue.use(VCalendar);

// * initialize Firebase
// * setting database config infromation
const config = {
  apiKey: "AIzaSyDLiWuwmqt0LUt96DQH1D6vacBBBObQkAI",
  authDomain: "keytracker-e176b.firebaseapp.com",
  databaseURL: "https://keytracker-e176b.firebaseio.com",
  projectId: "keytracker-e176b",
  storageBucket: "keytracker-e176b.appspot.com",
  messagingSenderId: "1084196062284",
  appId: "1:1084196062284:web:5d81b521c622eb31"
};
// * initalizing Firebase
firebase.initializeApp(config);

// * Exporting the database out
export const db = firebase.firestore();

let app = null;

/* eslint-disable no-new */
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      el: "#app",
      // * vuex
      store,
      // * router
      router,
      components: { App },
      template: "<App/>"
    });
  }
});
