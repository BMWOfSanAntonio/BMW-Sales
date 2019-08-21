<template>
  <v-app id="app">
    <v-content>
      <v-navigation-drawer v-model="drawer" app>
        <v-list dense>
          <div v-if="user">
            <v-list-item :to="link.path" v-for="(link, i) in links" :key="i">
              <v-list-item-action>
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ link.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-group prepend-icon="track_changes" value="true">
              <template v-slot:activator>
                <v-list-item-title>Track Request</v-list-item-title>
              </template>

              <v-list-group sub-group no-action>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>Make Ready</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item :to="make.path" v-for="(make, i) in makeready" :key="i">
                  <v-list-item-title v-text="make.title"></v-list-item-title>
                  <v-list-item-action>
                    <v-icon v-text="make.icon"></v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-list-group>

              <v-list-group sub-group no-action>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>We Owe</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item :to="we.path" v-for="(we, i) in weowe" :key="i">
                  <v-list-item-title v-text="we.title"></v-list-item-title>
                  <v-list-item-action>
                    <v-icon v-text="we.icon"></v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-list-group>
            </v-list-group>
          </div>
          <div v-if="!user">
            <v-list-item to="/login">
              <v-list-item-action>
                <v-icon>face</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Login</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>

          <v-list-item to="/help">
            <v-list-item-action>
              <v-icon>help</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Help</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="user" @click="logout">
            <v-list-item-action>
              <v-icon>clear</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Log Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app color="blue darken-3" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer">
          <v-icon>menu</v-icon>
        </v-app-bar-nav-icon>
        <!-- Title (screens larger than a phone) -->
        <v-toolbar-title class="d-none d-sm-flex">BMW of San Antonio | Make Ready</v-toolbar-title>
        <!-- Title (phone size) -->
        <v-toolbar-title class="d-flex d-sm-none mobile-title">BMW</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-avatar class="d-none d-sm-flex" v-if="user">
          <img :src="photo" alt="user" />
        </v-avatar>
        <v-toolbar-title v-if="user" class="user-info">{{ user.displayName }}</v-toolbar-title>
        <v-btn class="d-none d-sm-flex" to="/help" elevation="0" flat color="blue darken-3">
          <v-icon>help_outline</v-icon>
        </v-btn>
      </v-app-bar>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";

export default {
  name: "App",
  data() {
    return {
      drawer: false,
      links: [
        {
          title: "Request",
          path: "/",
          icon: "note_add"
        },
        {
          title: "Sales",
          path: "/sales",
          icon: "directions_car"
        },
        {
          title: "Parts",
          path: "/parts",
          icon: "build"
        },
        {
          title: "Finance",
          path: "/finance",
          icon: "all_inclusive"
        },
        {
          title: "Detail",
          path: "/detail",
          icon: "local_car_wash"
        }
      ],
      weowe: [
        {
          title: "We Owes: In Progress",
          path: "/weowesinprogress",
          icon: "chevron_right"
        },
        {
          title: "We Owes: Complete",
          path: "/weowescomplete",
          icon: "chevron_right"
        }
      ],
      makeready: [
        {
          title: "Make Ready: In Progress",
          path: "/makereadyinprogress",
          icon: "chevron_right"
        }
      ],
      user: firebase.auth().currentUser
    };
  },
  methods: {
    logout() {
      firebase.auth().signOut();
      this.drawer = false;
      this.$router.push("/login");
    }
  },
  mounted() {
    console.log(firebase.auth().currentUser);
    (this.user = firebase.auth().currentUser),
      (this.photo = firebase.auth().currentUser.photoURL);
  }
};
</script>

<style scoped>
img {
  margin-right: 20px;
}
</style>
