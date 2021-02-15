const shell = require('shelljs');

const triggers = require('./triggers');
const config = require('./config');
const pkgs = require('./package');

const node_call = config.pro ? '/usr/local/bin/node' : `/data/RPM/.nvm/versions/node/${process.version}/bin/node`;

// this creates all the triggers in the savant system
triggers.map(trigger => {
    let res = shell.exec(`${config.pro ? '/Users/RPM/Applications/RacePointMedia/sclibridge' : 'sclibridge'} settrigger "${trigger.key}_trigger" "1" "String" "${config.lutron_controller_name}.Lighting_controller" "CurrentButtonStatus_${trigger.keypad.toString()}_${trigger.button.toString()}" "Equal" "${trigger.action}" "0" "Global" "${config.host}" "" "1" "SVC_GEN_GENERIC" "RunCLIProgram" "COMMAND_STRING" "${node_call} ${config.script_path}/callTriggers.js ${trigger.key}"`);
    console.log(` Created "${trigger.key}_trigger   Return Code: ${res.code}"`);
})