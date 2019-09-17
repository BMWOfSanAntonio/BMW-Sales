<template>
  <div class="genius">
    <h4 class="mt-2">Genius</h4>
    <TableHeader />
    <tbody>
      <tr></tr>
    </tbody>
  </div>
</template>

<script>
import { db } from "../../main";
import firebase from "firebase";

export default {
  name: "Genius",
  data() {
    return {};
  },
  firestore() {
    return {
      genius: db.collection("weowes")
    };
  }
};
</script>

<style scoped>
</style>