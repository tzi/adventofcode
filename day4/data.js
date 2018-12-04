#!/usr/bin/env node
const fs = require('fs');

const types = {
    BEGINS_SHIFT:'begins shift',
    FALLS_ASLEEP: 'falls asleep',
    WAKES_UP: 'wakes up',
    SLEEPS: 'sleep'
};

const destruct = /\[(\d*)-(\d*)-(\d*) (\d*):(\d*)\] (.*)/;
let data = fs.readFileSync(__dirname + '/input.txt', 'utf8')
    .split('\n')
    .filter(Boolean)
    .map(string => {
        const matches = destruct.exec(string);
        if (!matches) {
            console.error('Error with: ', string);
            process.exit();
        }

        const date = new Date(
            parseInt(matches[1]),
            parseInt(matches[2]) - 1,
            parseInt(matches[3]),
            parseInt(matches[4]),
            parseInt(matches[5])
        );

        const text = matches[6];
        let type = types.WAKES_UP;
        let guard = null;
        if (text.includes(types.FALLS_ASLEEP)) {
            type = types.FALLS_ASLEEP;
        } else if (text.includes(types.BEGINS_SHIFT)) {
            type = types.BEGINS_SHIFT;
            guard = text.split(' ')[1].slice(1);
        }

        return { date, type, guard };
    })
    .sort((a, b) => a.date - b.date);

data = (function() {
    let currentGuard;
    let currentAsleepDate;
    return data.reduce((newData, log) => {
        if (log.type === types.BEGINS_SHIFT) {
            currentGuard = log.guard;
            newData.push(log);
        }
        if (log.type === types.FALLS_ASLEEP) {
            currentAsleepDate = log.date;
        }
        if (log.type === types.WAKES_UP) {
            newData.push({
                beginDate: currentAsleepDate,
                endDate: log.date,
                type: types.SLEEPS,
                guard: currentGuard
            });
        }

        return newData;
    }, []);
})();

module.exports = {
    data,
    types
};