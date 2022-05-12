"use strict";

const Hapi = require("@hapi/hapi");
const path = require("path");

const init = async () => {
  const server = Hapi.server({
    port: 8000,
    host: "localhost",
    routes: { files: { relativeTo: path.join(__dirname, "static") } },
  });

  //plugin
  await server.register({
    plugin: require("@hapi/inert"),
  });

  //routes
  server.route([
    {
      method: "GET",
      path: "/",
      handler: (request, h) => {
        return "hello hapi world";
      },
    },
    {
      method: "POST",
      path: "/signup",
      handler: (request, h) => {
        const payload = request.payload;
        return payload;
      },
    },
    {
      method: "GET",
      path: "/static",
      handler: (request, h) => {
        return h.file("index.html");
      },
    },
  ]);

  await server.start();
  console.log(`server is listening at ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
