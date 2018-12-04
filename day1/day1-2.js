#!/usr/bin/env node
const fs = require('fs');

const data = fs.readFileSync(__dirname + '/input.txt', 'utf8')
    .split('\n')
    .map(value => parseInt(value))
    .filter(Boolean);

let sum = 0;
let firstTwice = false;
let reaches = {
   0: true
};
while (!firstTwice) {
    data.find(value => {
        sum += value;
        if (reaches[sum]) {
            firstTwice = sum;
            return true;
        }
        reaches[sum] = true;
        return false;
    });
}

console.log('Twice: ', firstTwice);

