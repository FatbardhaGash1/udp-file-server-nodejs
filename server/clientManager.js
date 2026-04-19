const clients = {};
const TIMEOUT = 15000;
const MAX_CLIENTS = 4;

function registerClient(id, info) {
  if (!clients[id]) {
    if (Object.keys(clients).length >= MAX_CLIENTS) {
      return false;
    }

    clients[id] = {
      info,
      lastSeen: Date.now(),
      isAdmin: Object.keys(clients).length === 0
    };
  }
  return true;
}

function updateActivity(id) {
  if (clients[id]) {
    clients[id].lastSeen = Date.now();
  }
}

function isAdmin(id) {
  return clients[id]?.isAdmin;
}

setInterval(() => {
  const now = Date.now();
  for (let id in clients) {
    if (now - clients[id].lastSeen > TIMEOUT) {
      console.log(`Client ${id} timed out`);
      delete clients[id];
    }
  }
}, 5000);

function getStats() {
  return {
    activeClients: Object.keys(clients).length,
    clients
  };
}

module.exports = { registerClient, updateActivity, isAdmin, getStats };
