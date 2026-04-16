const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '../files');

if (!fs.existsSync(BASE_DIR)) {
fs.mkdirSync(BASE_DIR);
}

function listFiles() {
return fs.readdirSync(BASE_DIR).join('\n') || 'No files';
}

function readFile(filename) {
if (!filename) return 'Missing filename';
const filePath = path.join(BASE_DIR, filename);
if (!fs.existsSync(filePath)) return 'File not found';
return fs.readFileSync(filePath, 'utf-8');
}