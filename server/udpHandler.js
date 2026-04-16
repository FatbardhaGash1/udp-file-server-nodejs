const fileManager = require('./fileManager');
const clientManager = require('./clientManager');

let server;
function init(srv) {
  server = srv;

  server.on('message', (msg, rinfo) => {
    const message = msg.toString().trim();
    const clientId = `${rinfo.address}:${rinfo.port}`;

    clientManager.registerClient(clientId, rinfo);
    clientManager.updateActivity(clientId);

    let response;

    try {
      response = handleCommand(message, clientId);
    } catch (err) {
      response = 'Error: ' + err.message;
    }

    server.send(Buffer.from(response), rinfo.port, rinfo.address);
  });
}