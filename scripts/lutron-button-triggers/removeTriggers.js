const shell = require('shelljs');

const triggers = require('./triggers');
const config = require('./config');

// this removes all the triggers in the savant system
triggers.map(trigger => {
    let res = shell.exec(`${config.pro ? '/Users/RPM/Applications/RacePointMedia/sclibridge' : 'sclibridge'} removetrigger "${trigger.key}_trigger"`);
    console.log(` Removed "${trigger.key}_trigger   Return Code: ${res.code}"`);
})