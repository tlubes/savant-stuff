// this is just a helper script to find the service notations for the callTrigger section

const readline = require('readline');
const shell = require('shelljs');

const config = require('./config');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dirtyAreas = shell.exec(`${config.pro ? '/Users/RPM/Applications/RacePointMedia/sclibridge' : 'sclibridge'} userzones`).stdout;

const areas = dirtyAreas.split('\n').slice(0, -1);;

areas.map((area, index) => {
    console.log(`${index + 1}) ${area}`);
});

console.log('\n')

rl.question('Please enter the zone number to retrieve its realized services:', (answer) => {
    const index = parseInt(answer);
    if(isNaN(index) || index < 1 || index > areas.length){
        console.log('\n')
        console.log('Invalid number, please rerun the script!');
        process.exit(1);
    }else{
        const services = shell.exec(`${config.pro ? '/Users/RPM/Applications/RacePointMedia/sclibridge' : 'sclibridge'} servicesforzone ${areas[index - 1]}`).stdout;
        console.log(services);
    }
    rl.close();
});