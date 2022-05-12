"use strict";

const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.server({
    port: 8000,
    host: "localhost",
  });

  //routes
  server.route({
    method: "GET",
    path: "/",
    handler: (requrest, h) => {
      return "hello hapi world";
    },
  });

  await server.start();
  console.log(`server is listening at ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
