<template>
  <div id="app">
    <!-- // * navigation component -->
    <Navbar :user="user" />

    <!-- // * bootstrap container -->
    <b-container>
      <!-- // * component router view -->
      <transition name="fade" mode="out-in">
        <router-view :user="user" />
      </transition>
    </b-container>
  </div>
</template>

<script>
// * ~~~ Imports ~~~
// * database
import { db } from "./main";
// * import Firebase
import firebase from "firebase";
// * components
import Navbar from "@/components/navbar/Navbar";

export default {
  name: "App",
  components: { Navbar: Navbar },
  data() {
    return {
      // * this variable contains the current users name, email, photo and access level (access is gotten from matching emails in the Firestore database)
      user: {},
      makeready: null
    };
  },
  methods: {},
  firestore() {
    return {
      makeready: db.collection("makeready")
    };
  },
  created() {
    //  ! Placing information in the user object: Start - Do not touch this!
    //  * calling the Firestore database, going through each document in the users collection looking to see if the currently logged in users email matches one in the database. If it does then an access level is set.
    //  TODO: Set up a fail safe of if the user email does not match something the data base.
    db.collection("users")
      .get()
      .then(doc => {
        doc.forEach(snap => {
          // * Setting the values of the user object in the data property
          if (firebase.auth().currentUser.email === snap.data().email) {
            this.user = snap.data();
          }
        });
      });
    // ! End
  }
};
</script>

<style>
* {
  font-family: "Open Sans", sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
