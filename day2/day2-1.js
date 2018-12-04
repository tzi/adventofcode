#!/usr/bin/env node
const fs = require('fs');

const data = fs.readFileSync(__dirname + '/input.txt', 'utf8')
    .split('\n')
    .filter(Boolean);

let twoMatch = 0;
let threeMatch = 0;
data.forEach(string => {
    const letterCount = Array.from(string)
        .reduce((acc, letter) => {
            acc[letter] = acc[letter] ? acc[letter] + 1 : 1;

            return acc;
        }, {});
    if (Object.values(letterCount).includes(2)) {
        twoMatch++;
    }
    if (Object.values(letterCount).includes(3)) {
        threeMatch++;
    }
});

console.log('Checksum: ', twoMatch * threeMatch);

