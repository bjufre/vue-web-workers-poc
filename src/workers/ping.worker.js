import api from "../helpers/api";

/**
 * MIN & MAX: Should be allowed to be configured dynamically
 *            based on an `ENV` variable per organization.
 */
const MIN = 5000;
const MAX = 10000;
const MINUS = 1000;
const MAX_INTERVAL = 60 * 1000 * 2;

let timer = null;

const updateTimer = changed => {
  timer = changed
    ? Math.max(Math.min(timer - MIN, MAX), MIN)
    : Math.min(timer + MINUS, MAX_INTERVAL);
};

const fetchMemberPing = userId => {
  const url = `/${userId}/ping`;
  setTimeout(() => {
    api.get(url).then(user => {
      // NOTE: This will be an ETAG header check
      //       that will tell use whether or not the
      //       data has changed in the server.
      if (user.changed) {
        // If the user has changed, go ahead and
        // send the update to the main thread.
        self.postMessage(user);
      }

      // Update the timer based on whether
      // the data changed or not.
      updateTimer(user.changed);
      // Schedule a new fetch call
      fetchMemberPing(userId);
    });
  }, timer);
};

self.onmessage = event => {
  // Initialize timer
  updateTimer(true);
  // Schedule first fetch call
  fetchMemberPing(event.data);
};
