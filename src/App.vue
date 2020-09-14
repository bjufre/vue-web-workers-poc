<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>Vue web workers</h1>
    <div class="users">
      <h2>Users</h2>
      <ul>
        <User v-for="user in users" :key="user.id" :user="user" />
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "App",
  data: () => ({}),
  computed: {
    ...mapState(["users"])
  },
  methods: {
    ...mapActions(["fetchUsers"])
  },
  async mounted() {
    await this.fetchUsers();
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.users {
  padding: 60px;
  text-align-last: left;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}
</style>
