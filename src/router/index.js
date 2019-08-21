import Vue from "vue";
import Router from "vue-router";

import firebase from "firebase";
import { db } from "../main";

import Login from "@/components/Login";
import Request from "@/components/Request";
import Sales from "@/components/Sales";
import Parts from "@/components/Parts";
import WeOwesInProgress from "@/components/WeOwesInProgress";
import WeOwesComplete from "@/components/WeOwesComplete";
import MakeReadyInProgress from "@/components/MakeReadyInProgress";
import Detail from "@/components/Detail";
import Finance from "@/components/Finance";
import Help from "@/components/Help";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      // Root Page | Request
      path: "/",
      name: "Request",
      component: Request,
      meta: {
        requiresAuth: true
      }
    },
    {
      // Login Page
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/sales",
      name: "Sales",
      component: Sales,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/parts",
      name: "Parts",
      component: Parts,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/weowesinprogress",
      name: "WeOwesInProgress",
      component: WeOwesInProgress,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/weowescomplete",
      name: "WeOwesComplete",
      component: WeOwesComplete,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/makereadyinprogress",
      name: "MakeReadyInProgress",
      component: MakeReadyInProgress,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/detail",
      name: "Detail",
      component: Detail,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/finance",
      name: "Finance",
      component: Finance,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/help",
      name: "Help",
      component: Help
    }
  ]
});

router.beforeEach((to, from, next) => {
  let cred = firebase.auth().currentUser;
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    if (cred) {
      db.collection("users")
        .doc(cred.email)
        .get()
        .then(doc => {
          // check auth state of user
          if (
            doc.data().access_level == "Sales" &&
            to.name !== "Parts" &&
            to.name !== "Finance" &&
            to.name !== "Sales" &&
            to.name !== "Detail"
          ) {
            next();
          } else if (
            doc.data().access_level == "SalesManager" &&
            to.name !== "Parts" &&
            to.name !== "Finance" &&
            to.name !== "Detail"
          ) {
            next();
          } else if (
            doc.data().access_level == "Parts" &&
            to.name !== "Sales" &&
            to.name !== "Finance" &&
            to.name !== "Detail" &&
            to.name !== "Request"
          ) {
            next();
          } else if (
            doc.data().access_level == "Finance" &&
            to.name !== "Sales" &&
            to.name !== "Parts" &&
            to.name !== "Detail" &&
            to.name !== "Request"
          ) {
            next();
          } else if (
            doc.data().access_level == "Detail" &&
            to.name !== "Sales" &&
            to.name !== "Parts" &&
            to.name !== "Finance" &&
            to.name !== "Request"
          ) {
            next();
          } else if (doc.data().access_level == "Admin") {
            next();
          } else if (doc.data().access_level == "Unidentified") {
            next("/unidentified");
          } else {
            next("/oops");
          }
          // User is signed in. Proceed to route
        });
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
