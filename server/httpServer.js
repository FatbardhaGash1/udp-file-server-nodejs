const http = require('http');
const clientManager = require('./clientManager');

function start(port) {
    const server = http.createServer((req, res) => {
        if (req.url === '/stats') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(clientManager.getStats(), null, 2));
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

