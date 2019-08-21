// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// Vue Imports for Vue + Router
import Vue from "vue";
import App from "./App";
import router from "./router";

// Firebase firestore imports
import { firestorePlugin } from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";

// Vuetify Imports, library + css
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

// Plugins
Vue.use(Vuetify);
Vue.use(firestorePlugin);

// Default Vue Setting
Vue.config.productionTip = false;

// Firebase config information
firebase.initializeApp({
  apiKey: "AIzaSyDLiWuwmqt0LUt96DQH1D6vacBBBObQkAI",
  authDomain: "keytracker-e176b.firebaseapp.com",
  databaseURL: "https://keytracker-e176b.firebaseio.com",
  projectId: "keytracker-e176b",
  storageBucket: "keytracker-e176b.appspot.com",
  messagingSenderId: "1084196062284",
  appId: "1:1084196062284:web:5d81b521c622eb31"
});

/* eslint-disable no-new */

let app = null;

// Vue init
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      el: "#app",
      vuetify: new Vuetify(),
      router,
      components: { App },
      template: "<App/>"
    });
  }
});

// Exporting the database for use in components
export const db = firebase.firestore();
