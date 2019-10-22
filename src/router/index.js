import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";
import { db } from "../main";
// * component imports
// ! Behind the scenes components (admin, reports, etc)
import Admin from "@/components/Admin";
// ! Make Ready Components
import Request from "@/components/request/Request";
import Success from "@/components/request/Success";
import Dashboard from "@/components/dashboard/Dashboard";
import WeOweTracking from "@/components/tracking/WeOweTracking";
import Login from "@/components/authen/Login";
import MakeReadyTracking from "@/components/tracking/MakeReadyTracking";
import CompleteDealLog from "@/components/tracking/CompleteDealLog";
import Title from "@/components/tracking/Title";
import Plates from "@/components/dashboard/Plates";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Admin",
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/makeready/plates",
      name: "Plates",
      component: Plates,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/makeready/completedeallog",
      name: "CompleteDealLog",
      component: CompleteDealLog,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/makeready/titling",
      name: "Title",
      component: Title,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/makeready/",
      name: "Request",
      component: Request,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/makeready/user/:user",
      name: "Dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/makeready/tracking/weowes",
      name: "WeOweTracking",
      component: WeOweTracking,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/makeready/tracking/makeready",
      name: "MakeReadyTracking",
      component: MakeReadyTracking,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/makeready/:id",
      name: "Success",
      component: Success,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/makeready/auth/login",
      name: "Login",
      component: Login
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
          let access = doc.data().access_level;
          // * If there is a user logged in you have access to: Plates, Make Ready Tracking, We Owe Tracking
          if (
            cred &&
            (to.name == "Plates" ||
              to.name == "MakeReadyTracking" ||
              to.name == "WeOweTracking")
          ) {
            next();
          }
          // * If the users access level is equal to "Sales"
          else if (
            access == "Sales" &&
            (to.name == "Request" ||
              to.name == "Dashboard" ||
              to.name == "Success")
          ) {
            next();
          }
          // * If the users access level is equal to "SalesManager"
          else if (
            (access == "SalesManager" || access == "Genius") &&
            (to.name == "Request" ||
              to.name == "Dashboard" ||
              to.name == "CompleteDealLog" ||
              to.name == "Success")
          ) {
            next();
          } else if (to.path == "/") {
            next("/makeready/user/dashboard");
          }
          // * If the users access level is equal to "Parts"
          else if (access == "Parts" && to.name == "Dashboard") {
            next();
          }
          // * If the users access level is equal to "Finance"
          else if (access == "Finance" && to.name == "Dashboard") {
            next();
          }
          // * If the users access level is equal to "Detail"
          else if (access == "Detail" && to.name == "Dashboard") {
            next();
          }
          // * If the users access level is equal to "Title"
          else if (access == "Title" && to.name == "Title") {
            next();
          } else {
            next("/makeready/user/dashboard");
          }
        });
    }
    // * If authorization is required and the user is not logged in yet
    else {
      next("/makeready/auth/login");
    }
  }
  // * If no authorization is required
  else {
    next();
  }
});

export default router;
