import Vue from "vue";
import PingWorker from "../workers/ping.worker";

export default class UserWorkerWrapper {
  userId = null;
  worker = null;
  events = null;

  constructor(userId) {
    if (!userId || !`${userId}`) {
      throw new Error("[userId] must be passed in!");
    }

    this.userId = userId;
    this.events = new Vue();
    this.worker = new PingWorker();
    this.attachWorkerEvents();
  }

  init() {
    this.worker.postMessage(this.userId);
  }

  attachWorkerEvents() {
    this.worker.onmessage = event => this.userPingResponse(event);
    // TODO: Add error handling
    this.worker.onerror = error => console.log("ONERROR: ", error);
  }

  onUserUpdate(callback) {
    this.events.$on("user-update", callback);
  }

  userPingResponse(event) {
    const { data } = event;
    this.events.$emit("user-update", data);
  }

  destroy() {
    this.events.$off("user-update");
    this.worker.terminate();
  }
}
