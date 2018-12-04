#!/usr/bin/env node
const { data, types } = require('./data');

const currentKey = (function() {

    function getKey(log, i) {
        const currentDate = new Date(log.beginDate.getTime() + i * 60000);
        const currentMinute = currentDate.getMinutes();

        return log.guard + ':' + currentMinute;
    }

    let eachMinuteAsleep = {};
    let currentKey;
    data.forEach(log => {
        if (log.type === types.SLEEPS) {
            let minutes = Math.floor((log.endDate - log.beginDate) / 60000);
            for (let i = 0; i < minutes; i++) {
                currentKey = getKey(log, i);
                if (!eachMinuteAsleep[currentKey]) {
                    eachMinuteAsleep[currentKey] = 0;
                }
                eachMinuteAsleep[currentKey] += 1;
            }
        }
    });

    return Object.keys(eachMinuteAsleep)
        .reduce((a, b) => eachMinuteAsleep[a] > eachMinuteAsleep[b] ? a : b);
})();


console.log(currentKey, 'result:', currentKey.split(':')[0] * currentKey.split(':')[1]);