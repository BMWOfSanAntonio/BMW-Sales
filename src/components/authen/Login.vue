<template>
  <div class="text-center row middle">
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <main role="main" class="inner cover">
        <h1 class="cover-heading">Please Sign In</h1>
        <p
          class="lead"
        >Please user your Principle Auto email address when signing in. If you have any issues please contact James Shiflett via email.</p>
        <p class="lead">
          <b-button @click="signin" variant="primary">Sign In With Google</b-button>
        </p>
      </main>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../../main";
export default {
  name: "Login",
  data() {
    return {};
  },
  methods: {
    signin() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(cred => {
          let ref = db.collection("users").doc(cred.user.email);
          ref.get().then(doc => {
            if (doc.exists) {
              this.$router.push("/makeready/user/" + cred.display_name);
            } else {
              console.log(cred);
              ref.set({
                display_name: cred.user.displayName,
                user_id: cred.user.uid,
                email: cred.user.email,
                access_level: "Unidentified"
              });
              this.$router.push("/unidentified");
            }
          });
        })
        .catch(err => {
          alert("Oops. " + err.message);
        });
      console.log("done");
    }
  }
};
</script>

<style scoped>
.middle {
  margin: 0 auto;
  margin-top: 30%;
  width: 50%;
}
</style>