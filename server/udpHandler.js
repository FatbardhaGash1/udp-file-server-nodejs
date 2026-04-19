const fileManager = require('./fileManager');
const clientManager = require('./clientManager');

let server;
const messages = [];
function init(srv) {
  server = srv;

  server.on('message', (msg, rinfo) => {
    const message = msg.toString().trim();
    const clientId = `${rinfo.address}:${rinfo.port}`;

    console.log(`[${clientId}] -> ${message}`);

    if (!clientManager.registerClient(clientId, rinfo)) {
      return server.send(Buffer.from('Server full'), rinfo.port, rinfo.address);
    }

    clientManager.updateActivity(clientId);

    messages.push({
      clientId,
      message,
      time: new Date().toISOString()
    });

    if (messages.length > 100) {
      messages.shift();
    }

    let response;
    try {
      response = handleCommand(message, clientId);
    } catch (err) {
      response = 'Error: ' + err.message;
    }

    const isAdmin = clientManager.isAdmin(clientId);

    const sendResponse = () => {
      server.send(Buffer.from(response), rinfo.port, rinfo.address);
    };

    if (isAdmin) {
      sendResponse();
    } else {
      setTimeout(sendResponse, 300);
    }
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
    case '/download': return `Downloading:\n${fileManager.readFile(args[0])}`;
    case '/delete':
      if (!isAdmin) return 'Permission denied';
      return fileManager.deleteFile(args[0]);
    case '/search': return fileManager.searchFiles(args[0]);
    case '/info': return fileManager.fileInfo(args[0]);
    default: return `Message received: ${message}`;
  }
}

  function getMessages() {
  return messages;
}

module.exports = { init,getMessages };