<template>
  <div class="user">
    <p><strong>ID: </strong> {{ user.id }}</p>
    <p><strong>Name: </strong> {{ user.name }}</p>
    <p><strong>Ping: </strong> {{ user.ping }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import UserWorkerWrapper from "../helpers/UserWorkerWrapper";

export default {
  name: "User",
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    worker: null
  }),
  methods: {
    ...mapActions(["updateUser"])
  },
  created() {
    // Because we're freezing it in the created hook, this
    // data property won't be reactive and thus we won't
    // have have any performance hits due to that.
    this.worker = Object.freeze(new UserWorkerWrapper(this.user.id));
    // Attach an event "listener/callback" in order to perform the Vuex update
    this.worker.onUserUpdate(user => this.updateUser(user));
    // Initialize the worker with the polling mechanism
    this.worker.init();
  },
  beforeDestroy() {
    this.worker.destroy();
  }
};
</script>

<style lang="scss" scoped>
.user {
  padding: 0 20px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  text-align: left;
  border-bottom: 1px solid #e3e3e3;

  &:last-child {
    border-bottom: none;
  }
}
</style>
