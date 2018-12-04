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

let singleIds = {};
let claims = {};
data.forEach(({id, x, y, width, height}) => {
    const keys = [];
    for (var i = x; i < x + width; i++) {
        for (var j = y; j < y + height; j++) {
            keys.push({i, j, key: i + ':' + j});
        }
    }

    singleIds[id] = true;
    keys.forEach(({i, j, key}) => {
        if (claims[key]) {
            singleIds[claims[key]] = false;
            singleIds[id] = false;
        } else {
            claims[key] = id;
        }
    });
});



console.log('Claims overlap: ', Object.keys(singleIds).filter(id => singleIds[id]));

