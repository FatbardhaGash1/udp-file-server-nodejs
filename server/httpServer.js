const http = require('http');
const clientManager = require('./clientManager');
const udpHandler = require('./udpHandler');

function start(port) {
    const server = http.createServer((req, res) => {
        if (req.url === '/stats') {
            const messages = udpHandler.getMessages();


            const stats = {
                activeClients: clientManager.getStats().activeClients,
                clients: clientManager.getStats().clients,
                messageCount: messages.length,
                messages: messages
            };
                
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(stats, null, 2));
        } else {
            res.writeHead(404);
            res.end('Not found');
        }
    });

    server.listen(port, () => {
        console.log(`HTTP server running on port ${port}`);
    });
}

module.exports = { start };

