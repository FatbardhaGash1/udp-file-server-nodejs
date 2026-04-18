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

function uploadFile(filename, content) {
if (!filename) return 'Missing filename';
const filePath = path.join(BASE_DIR, filename);
fs.writeFileSync(filePath, content || '');
return 'File uploaded';
}

function deleteFile(filename) {
if (!filename) return 'Missing filename';
const filePath = path.join(BASE_DIR, filename);
if (!fs.existsSync(filePath)) return 'File not found';
fs.unlinkSync(filePath);
return 'File deleted';
}

function searchFiles(keyword) {
if (!keyword) return 'Missing keyword';
return fs.readdirSync(BASE_DIR).filter(f => f.includes(keyword)).join('\n') || 'No match';
}

function fileInfo(filename) {
if (!filename) return 'Missing filename';
const filePath = path.join(BASE_DIR, filename);
if (!fs.existsSync(filePath)) return 'File not found';

const stats = fs.statSync(filePath);
return `Size: ${stats.size}\nCreated: ${stats.birthtime}\nModified: ${stats.mtime}`;
}

module.exports = { listFiles, readFile, uploadFile, deleteFile, searchFiles, fileInfo };
