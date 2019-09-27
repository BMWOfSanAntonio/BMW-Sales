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
      component: Admin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/makeready/plates",
      name: "Plates",
      component: Plates
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
      component: WeOweTracking
    },
    {
      path: "/makeready/tracking/makeready",
      name: "MakeReadyTracking",
      component: MakeReadyTracking
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
          // check auth state of user
          if (doc.data().access_level == "Admin") {
            next();
          } else if (
            (doc.data().access_level == "SalesManager" ||
              doc.data().access_level == "Sales" ||
              doc.data().access_level == "Genius") &&
            to.name == "Request" &&
            to.name !== "Admin" &&
            to.name !== "Title" &&
            to.name !== "CompleteDealLog"
          ) {
            next();
          } else if (
            doc.data().access_level !== "Undefined" &&
            to.name !== "Request" &&
            to.name !== "Admin" &&
            to.name !== "Title" &&
            to.name !== "CompleteDealLog"
          ) {
            next();
          } else if (doc.data().access_level == "Title" && to.name == "Title") {
            next();
          } else if (
            doc.data().access_level == "SalesManager" &&
            to.name == "CompleteDealLog"
          ) {
            next();
          } else {
            if (doc.data().access_level == "Title") {
              next("/makeready/titling");
            } else if (doc.data().access_level == "rdr") {
              next("/makeready/completedeallog");
            } else {
              next("/makeready/user/dashboard");
            }
          }
          // User is signed in. Proceed to route
        });
    } else {
      next("/makeready/auth/login");
    }
  } else {
    next();
  }
});

export default router;
