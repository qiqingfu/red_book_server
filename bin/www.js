#!/usr/bin/env node

require("module-alias/register");
const debug = require("debug")("www");
const http = require("http");
const app = require("../app");
const config = require("../config");

const port = normalizePort(config.SERVER_PORT);

const server = http.createServer(app.callback());

server.listen(port);
server.on("error", onError);

// net listener
server.on("listening", onListening);

/**
 * 将端口标准化
 * @param val
 * @returns {boolean|number|*}
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }

  if (port > 0) {
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
