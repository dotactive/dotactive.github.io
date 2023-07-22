const fs = require('fs');
const path = require('path');

const directoryPath = './'; // Change this to the directory path where your text files are located

const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.txt'));

const json = JSON.stringify(files);

fs.writeFileSync('files.json', json);
console.log('files.json updated successfully.');