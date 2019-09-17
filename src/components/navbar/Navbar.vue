<template>
  <div class="nav-container">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <!-- // * Brand Title -->
      <b-navbar-brand href="#">Make Ready</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <template v-if="this.user.display_name">
        <b-collapse id="nav-collapse" is-nav>
          <!-- // * -->
          <b-navbar-nav>
            <!-- // * loops through all items in the links array. Links to the department views, contains path, name, and icon for each -->
            <b-nav-item
              v-if="user.access_level == 'Sales' || user.access_level == 'SalesManager'"
              href="#/makeready/"
            >
              <i class="material-icons align-middle">description</i>
              <h6 class="inline align-middle">Request</h6>
            </b-nav-item>
            <b-nav-item href="#/makeready/user/dashboard">
              <i class="material-icons align-middle">dashboard</i>
              <h6 class="inline align-middle">Dashboard</h6>
            </b-nav-item>
          </b-navbar-nav>

          <!-- // * Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!-- // * Tracking changes dropdown title with items -->
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <i class="material-icons align-middle">track_changes</i>
                <em>Track</em>
              </template>
              <b-dropdown-item v-for="(track, i) in tracks" :key="i" :href="track.path">
                <i class="material-icons align-middle">{{ track.icon }}</i>
                <h6 class="align-middle inline">{{ track.name }}</h6>
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <!-- // * User dropdown with photo -->
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>{{ user.display_name }}</em>
              </template>
              <!-- // TODO: Add a profile and setting  -->
              <!-- <b-dropdown-item href>
                <i class="material-icons align-middle">settings_applications</i>
                <h6 class="align-middle inline">Profile & Settings</h6>
              </b-dropdown-item>-->
              <b-dropdown-item @click="logout">
                <i class="material-icons align-middle">directions_run</i>
                <h6 class="align-middle inline">Log Out</h6>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </template>
    </b-navbar>
  </div>
</template>

    </b-navbar>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Navbar",
  props: ["user"],
  data() {
    return {
      // ! Don't remove mainProps: sets the size of the profile image in the navigation bar
      mainProps: {
        width: 30,
        height: 30
      },
      links: [
        {
          name: "Request",
          path: "#/makeready/",
          icon: "description"
        },
        {
          name: "Dashboard",
          path: "#/makeready/user/" + this.user.display_name,
          icon: "attach_money"
        }
      ],
      tracks: [
        {
          name: "We Owes",
          path: "#/makeready/tracking/weowes",
          icon: "payment"
        },
        {
          name: "Make Ready",
          path: "#/makeready/tracking/makeready",
          icon: "done"
        }
      ]
    };
  },
  methods: {
    logout() {
      firebase.auth().signOut();
      this.$router.push("/makeready/auth/login");
    }
  }
};
</script>

<style scoped>
/* // * put icons next to text in the navigation */
.inline {
  display: inline;
}
</style>