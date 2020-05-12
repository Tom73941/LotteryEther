// JavaScript source code
const path = require('path');
const fs = require('fs');

const solc = require('solc');

const filepath = path.resolve(__dirname, 'contracts', 'Lottery.sol');

const source = fs.readFileSync(filepath, "utf8");
//console.log(filepath);
module.exports = solc.compile(source, 1).contracts[':Lottery'];
console.log(solc.compile(source, 1).contracts[':Lottery']);
//console.log(solc.compile(source, 1));