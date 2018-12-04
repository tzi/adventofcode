#!/usr/bin/env node
const fs = require('fs');

const destruct = /#(\d*) @ (\d*),(\d*): (\d*)x(\d*)/;
const data = fs.readFileSync(__dirname + '/input.txt', 'utf8')
    .split('\n')
    .filter(Boolean)
    .map(string => {
        const matches = destruct.exec(string);
        if (!matches) {
            console.error('Error with: ', string);
            process.exit();
        }

        return {
            id: parseInt(matches[1]),
            x: parseInt(matches[2]),
            y: parseInt(matches[3]),
            width: parseInt(matches[4]),
            height: parseInt(matches[5])
        };
    });

let claims = {};
data.forEach(({x, y, width, height}) => {
    let key;
    for (var i = x; i < x + width; i++) {
        for (var j = y; j < y + height; j++) {
            key = i + ':' + j;
            claims[key] = claims[key] ? claims[key] + 1 : 1;
        }
    }
});

console.log('Claims overlap: ', Object.values(claims).filter(a => a >= 2).length);

