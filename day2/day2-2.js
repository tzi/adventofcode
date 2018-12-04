#!/usr/bin/env node
const fs = require('fs');

const data = fs.readFileSync(__dirname + '/input.txt', 'utf8')
    .split('\n')
    .filter(Boolean);

const jokerMap = {};
let duplicateJokerId = '';
data.find(string => {
    for (let i=0; i < string.length; i++) {
        const jokerId = string.substr(0, i) + '*' + string.substr(i + 1);
        if (jokerMap[jokerId]) {
            duplicateJokerId = jokerId;
            return true;
        }
        jokerMap[jokerId] = true;
    }

    return false;
});

console.log('Closest ids: ', duplicateJokerId.replace('*', ''));

