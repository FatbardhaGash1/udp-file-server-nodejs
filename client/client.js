const dgram = require('dgram');
const readline = require('readline');
const client = dgram.createSocket('udp4');
const PORT = 41234;
const HOST = '127.0.0.1';

client.bind();

client.on('message', (msg) => {
    console.log('Server:', msg.toString());
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function sendMessage(message) {
    client.send(Buffer.from(message), PORT, HOST);
}

function prompt() {
    rl.question('> ', (input) => {
        sendMessage(input);
        prompt();
    });
}

console.log('Client started. Try: /list');
prompt();