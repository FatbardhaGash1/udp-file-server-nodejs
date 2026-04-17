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
function handleCommand(message, clientId) {
  const [cmd, ...args] = message.split(' ');
  const isAdmin = clientManager.isAdmin(clientId);

  switch (cmd) {
    case '/list': return fileManager.listFiles();
    case '/read': return fileManager.readFile(args[0]);
    case '/upload':
      if (!isAdmin) return 'Permission denied';
      return fileManager.uploadFile(args[0], args.slice(1).join(' '));
    case '/download': return fileManager.readFile(args[0]);
    case '/delete':
      if (!isAdmin) return 'Permission denied';
      return fileManager.deleteFile(args[0]);
    case '/search': return fileManager.searchFiles(args[0]);
    case '/info': return fileManager.fileInfo(args[0]);
    default: return 'Unknown command';
  }
}

module.exports = { init };