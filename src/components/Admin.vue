<template>
  <div class="hello">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Stock Number</th>
          <th scope="col">Sales Associate</th>
          <th scope="col">Dollar Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(s, i) in spiff" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ s.data.stock_number }}</td>
          <td>{{ s.userinfo.associate }}</td>
          <td>{{ amount(s) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
export default {
  name: "HelloWorld",
  data() {
    return {
      spiff: []
    };
  },
  methods: {
    amount(s) {
      let dollar = 0;
      s.data.accessories.forEach(item => {
        dollar = dollar + Number(item.adviser_spiff.replace(/[^0-9.-]+/g, ""));
      });
      return dollar;
    }
  },
  firestore() {
    return {
      spiff: db.collection("weowes").where("data.spiff", "==", "Yes")
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
