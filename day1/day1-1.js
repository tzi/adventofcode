#!/usr/bin/env node
const fs = require('fs');

const data = fs.readFileSync(__dirname + '/input.txt', 'utf8')
    .split('\n')
    .map(value => parseInt(value))
    .filter(Boolean);

let sum = 0;
data.forEach(value => {
   sum += value;
});

console.log('Total: ', sum);

