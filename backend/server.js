// Configure dotenv
import "dotenv/config";
import { createServer } from "http";
// import app, { set } from "./app";
import app from "./app.js";

function normalizePort(value) {
  const port = parseInt(value);
  if (isNaN(port)) {
    return value;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || 3000);
// set("port", port);
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;

  switch (error.code) {
    case "EACCESS":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;

    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;

    default:
      throw error;
  }
};

// Create HTTP server
const server = createServer(app);
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);
