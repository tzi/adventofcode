#!/usr/bin/env node
const fs = require('fs');

const BEGINS_SHIFT = 'begins shift';
const FALLS_ASLEEP = 'falls asleep';
const WAKES_UP = 'wakes up';
const SLEEPS = 'sleep';

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
        let type = WAKES_UP;
        let guard = null;
        if (text.includes(FALLS_ASLEEP)) {
            type = FALLS_ASLEEP;
        } else if (text.includes(BEGINS_SHIFT)) {
            type = BEGINS_SHIFT;
            guard = text.split(' ')[1].slice(1);
        }

        return { date, type, guard };
    })
    .sort((a, b) => a.date - b.date);

data = (function() {
    let currentGuard;
    let currentAsleepDate;
    return data.reduce((newData, log) => {
        if (log.type === BEGINS_SHIFT) {
            currentGuard = log.guard;
            newData.push(log);
        }
        if (log.type === FALLS_ASLEEP) {
            currentAsleepDate = log.date;
        }
        if (log.type === WAKES_UP) {
            newData.push({
                beginDate: currentAsleepDate,
                endDate: log.date,
                type: SLEEPS,
                guard: currentGuard
            });
        }

        return newData;
    }, []);
})();

const mostAsleepGuard = (function() {
    let minutesAsleep = {};
    data.forEach(log => {
        if (log.type === SLEEPS) {
            let minutes = Math.floor((log.endDate - log.beginDate) / 60000);
            if (!minutesAsleep[log.guard]) {
                minutesAsleep[log.guard] = 0;
            }
            minutesAsleep[log.guard] += minutes;
        }
    });

    return Object.keys(minutesAsleep)
        .reduce((a, b) => minutesAsleep[a] > minutesAsleep[b] ? a : b);
})();

const mostMinuteAsleep = (function() {
    let eachMinuteAsleep = {};
    let currentMinute;
    data.forEach(log => {
        if (log.type === SLEEPS && log.guard === mostAsleepGuard) {
            let minutes = Math.floor((log.endDate - log.beginDate) / 60000);
            for (let i = 0; i < minutes; i++) {
                currentMinute = (new Date(log.beginDate.getTime() + i * 60000)).getMinutes();
                if (!eachMinuteAsleep[currentMinute]) {
                    eachMinuteAsleep[currentMinute] = 0;
                }
                eachMinuteAsleep[currentMinute] += 1;
            }
        }
    });
    return Object.keys(eachMinuteAsleep)
        .reduce((a, b) => eachMinuteAsleep[a] > eachMinuteAsleep[b] ? a : b);
})();


console.log({mostAsleepGuard, mostMinuteAsleep}, 'result:', mostAsleepGuard * mostMinuteAsleep);