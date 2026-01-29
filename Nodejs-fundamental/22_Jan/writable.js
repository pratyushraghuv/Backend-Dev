
const fs = require('fs');
const path = require('path');

const inputStream = path.resolve(__dirname, 'Streams', 'input.txt')
const outputStream = path.resolve(__dirname, 'Streams', 'output.txt')

const readStream = fs.createReadStream(inputStream)
const writeStream = fs.createWriteStream(outputStream)

readStream.pipe(writeStream);

console.log('file copied successfully');