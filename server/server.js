const dgram = require('dgram');
const udpHandler = require('./udpHandler');
const httpServer = require('./httpServer');
const PORT = 41234;
const HOST = '0.0.0.0';

const server = dgram.createSocket('udp4');
udpHandler.init(server);
server.bind(PORT, HOST, () => {
  console.log(`UDP Server running at ${HOST}:${PORT}`);
});
httpServer.start(5000);