#!/usr/bin/env node
const { data, types } = require('./data');

const mostAsleepGuard = (function() {
    let minutesAsleep = {};
    data.forEach(log => {
        if (log.type === types.SLEEPS) {
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
        if (log.type === types.SLEEPS && log.guard === mostAsleepGuard) {
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