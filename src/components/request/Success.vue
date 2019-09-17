<template>
  <div class="success">
    <b-row>
      <b-col>
        <b-jumbotron bg-variant="success" text-variant="white">
          <template v-slot:header>Submission Successful!</template>

          <template v-slot:lead>
            Your make ready request was submitted successfully! Your request identification number is
            <span>{{ id }}</span>. Remember, it is now your responsibility to go speak with a sales manager and get your request approved.
          </template>

          <hr class="my-4" />

          <p>Click the button below to track your request.</p>
          <b-button variant="info" :href="'#/makeready/user/' + user.name">Track Request</b-button>
        </b-jumbotron>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  name: "Success",
  props: ["user"],
  data() {
    return {
      id: this.$route.params.id
    };
  }
};
</script>
<style scoped>
span {
  font-weight: bold;
}
.success {
  margin-top: 15%;
}
</style>