import express from "express";
import cors from "cors";
// import socketIO from "socket.io";

const usersMap = {
  1: {
    id: 1,
    name: "Bernat",
    ping: 0,
    changed: false
  },
  2: {
    id: 2,
    name: "Alex",
    ping: 0,
    changed: false
  }
};

function shouldChange() {
  const rand = Math.floor(Math.random() * 10) + 1;
  return rand >= 0 && rand <= 5;
}

// eslint-disable-next-line no-unused-vars
export default (app, http) => {
  app.use(cors({ origin: "*" }));
  app.use(express.json());

  app.get("/users", (req, res) => {
    const users = Object.keys(usersMap).map(id => usersMap[id]);
    res.json({ users });
  });

  app.get("/:id/ping", (req, res) => {
    const id = req.params.id;
    const user = usersMap[id];

    console.group(`/${id}/ping`);

    if (!user) {
      console.log("404: No user found");
      console.groupEnd();
      return res.status(404).json({
        error: `User with id ${id} not found`
      });
    }

    const changed = shouldChange();
    user.changed = changed;
    user.ping = changed ? user.ping + 1 : user.ping;
    usersMap[id] = user;

    console.log(JSON.stringify(user, null, 2));
    console.groupEnd();

    return res.json(user);
  });

  // optional support for socket.io
  //
  // let io = socketIO(http);
  // io.on("connection", client => {
  //   client.on("message", function(data) {
  //     // do something
  //   });
  //   client.emit("message", "Welcome");
  // });
};
