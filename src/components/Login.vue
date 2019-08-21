<template>
  <v-container id="login" class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" xs="12" sm="12" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="blue darken-3" dark flat>
            <v-toolbar-title>BMW | Make Ready Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="text-center">
            <h1 class="headline">Welcome to BMW Make Ready!</h1>
            <h3
              class="subtitle-1 d-none d-sm-flex"
            >Please use your Principle Auto email address to log in.</h3>
          </v-card-text>
          <v-row justify="center">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click.prevent="signup">
                <img
                  width="20px"
                  alt="Google &quot;G&quot; Logo"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                />Login with Google
              </v-btn>
            </v-card-actions>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "../main";
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {};
  },
  methods: {
    signup() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(cred => {
          let ref = db.collection("users").doc(cred.user.email);
          ref.get().then(doc => {
            if (doc.exists) {
              console.log("this user is logged in");
              let access = doc.data().access_level;
              if (access == "Sales") {
                this.$router.push("/");
              } else if (access == "SalesManager") {
                this.$router.push("/sales");
              } else if (access == "Parts") {
                this.$router.push("/parts");
              } else if (access == "Finance") {
                this.$router.push("/finance");
              } else if (access == "Detail") {
                this.$router.push("/detail");
              } else if (access == "Admin") {
                this.$router.push("/");
              } else {
                this.$router.push("/undefined");
              }
              console.log("this user is logged");
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.heading {
  margin-bottom: 10px;
}

button {
  margin-bottom: 10px;
}

.text-center {
  text-align: center;
  margin-top: 10px;
}

img {
  margin-right: 10px;
}
</style>
