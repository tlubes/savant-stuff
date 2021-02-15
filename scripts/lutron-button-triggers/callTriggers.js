const shell = require('shelljs');

const triggers = require('./triggers');
const config = require('./config');

// ********************************************************************************************************************************
//
//  This is just an example of a house with 4 airplays, 4 music streams (rca from an MMS5A) and 2 xm radios as pure audio sources.
//  The switch case is triggered depending on the json config of the buttons pressed. Services can be accessed in a round robin config
//  depending how often a button is pressed. Also direct dials to all services are possible with simple shortcodes like '1' or 'A' that I chose. 
//  The off command grabs the current running video or audio service and shuts it down. The volume commands check periodically if
//  the button is still pressed and invoke the commands again after a set times in a manner of 'press and hold'.
//  Any logic or combination is possible in the Savant sclibridge and additinal variables can be created on the system host that can be
//  shared between the Blueprint configuration and scripts running elsewhere on the host. I would be excited to see what other integrators
//  can create with this approach.
//
//  An additional last case I just added, is the ability to call scenes from the buttons. Just have a look at the json to see how the
//  fields have to be filled out. The scenes are called in the last step of the switch case.
//
//  To retrieve scene information just run 'sclibridge getSceneNames' in the terminal on your host.
//  To retrieve available services, I added a little helper script called 'listServices.js'
// 
// ********************************************************************************************************************************

const vol_base = '-His Airplay-Audio Source-1-SVC_AV_GENERALAUDIO'

const xm_1_base = '-His and Her XM-Satellite_radio-1-SVC_AV_SATELLITERADIO';
const xm_2_base = '-Kids and Guest XM-Satellite_radio-1-SVC_AV_SATELLITERADIO';

const music_A_base = '-Media Server-Player_A-1-SVC_AV_LIVEMEDIAQUERY_SAVANTMEDIAAUDIO';
const music_B_base = '-Media Server-Player_B-1-SVC_AV_LIVEMEDIAQUERY_SAVANTMEDIAAUDIO';
const music_C_base = '-Media Server-Player_C-1-SVC_AV_LIVEMEDIAQUERY_SAVANTMEDIAAUDIO';
const music_D_base = '-Media Server-Player_D-1-SVC_AV_LIVEMEDIAQUERY_SAVANTMEDIAAUDIO';

const his_airplay_base = '-His Airplay-Audio Source-1-SVC_AV_GENERALAUDIO';
const her_airplay_base = '-Her Airplay-Audio Source-1-SVC_AV_GENERALAUDIO';
const kids_airplay_base = '-Kids Airplay-Audio Source-1-SVC_AV_GENERALAUDIO';
const guest_airplay_base = '-Guest Airplay-Audio Source-1-SVC_AV_GENERALAUDIO';

const off_base = `-${config.host}--1-SVC_GEN_GENERIC`;

const sleep = ms => new Promise((resolve) => setTimeout(resolve, ms));

const triggerValues = triggers.find(trigger => trigger.key === process.argv[2]);

const bridge = config.pro ? '/Users/RPM/Applications/RacePointMedia/sclibridge' : 'sclibridge'

const main = async () => {
    switch(triggerValues.mode){
        case 'vol up': {
            shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${vol_base}-VolumeUp"`);
            await sleep(700);
            while(shell.exec(`${bridge} readstate "${config.lutron_controller_name}.Lighting_controller.CurrentButtonStatus_${triggerValues.keypad}_${triggerValues.button}"`).stdout === 'Press\n'){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${vol_base}-VolumeUp"`);
                await sleep(300); 
            }
        }; break;
        case 'vol dn': {
            shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${vol_base}-VolumeDown"`);
            await sleep(700);
            while(shell.exec(`${bridge} readstate "${config.lutron_controller_name}.Lighting_controller.CurrentButtonStatus_${triggerValues.keypad}_${triggerValues.button}"`).stdout === 'Press\n'){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${vol_base}-VolumeDown"`);
                await sleep(300); 
            }
        }; break;
        case 'xm fixed': {
            if(triggerValues.fixed === '1'){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${xm_1_base}-PowerOn"`);
            }else if(triggerValues.fixed === '2'){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${xm_2_base}-PowerOn"`);
            }
        }; break;
        case 'music fixed': {
            if(triggerValues.fixed === 'A'){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${music_A_base}-PowerOn"`);
            }else if(triggerValues.fixed === 'B'){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${music_B_base}-PowerOn"`);
            }else if(triggerValues.fixed === 'C'){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${music_C_base}-PowerOn"`);
            }else if(triggerValues.fixed === 'D'){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${music_D_base}-PowerOn"`);
            }
        }; break;
        case 'airplay fixed': {
            if(triggerValues.fixed === '1'){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${his_airplay_base}-PowerOn"`);
            }else if(triggerValues.fixed === '2'){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${her_airplay_base}-PowerOn"`);
            }else if(triggerValues.fixed === '3'){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${kids_airplay_base}-PowerOn"`);
            }else if(triggerValues.fixed === '4'){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${guest_airplay_base}-PowerOn"`);
            }
        }; break;
        case 'xm cycle': {
            let ret = shell.exec(`${bridge} readstate "${triggerValues.room}.ActiveService"`)
            if(ret.stdout === `${triggerValues.room}${xm_1_base}\n`){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${xm_2_base}-PowerOn"`);
            }else if(ret.stdout === `${triggerValues.room}${xm_2_base}\n`){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${xm_1_base}-PowerOn"`);
            }else{
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${xm_1_base}-PowerOn"`);
            }
        }; break;
        case 'music cycle': {
            let ret = shell.exec(`${bridge} readstate "${triggerValues.room}.ActiveService"`)
            if(ret.stdout === `${triggerValues.room}${music_A_base}\n`){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${music_B_base}-PowerOn"`);
            }else if(ret.stdout === `${triggerValues.room}${music_B_base}\n`){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${music_C_base}-PowerOn"`);
            }else if(ret.stdout === `${triggerValues.room}${music_C_base}\n`){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${music_D_base}-PowerOn"`);
            }else if(ret.stdout === `${triggerValues.room}${music_D_base}\n`){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${music_A_base}-PowerOn"`);
            }else{
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${music_A_base}-PowerOn"`);
            }
        }; break;
        case 'airplay cycle': {
            let ret = shell.exec(`${bridge} readstate "${triggerValues.room}.ActiveService"`)
            if(ret.stdout === `${triggerValues.room}${his_airplay_base}\n`){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${her_airplay_base}-PowerOn"`);
            }else if(ret.stdout === `${triggerValues.room}${her_airplay_base}\n`){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${kids_airplay_base}-PowerOn"`);
            }else if(ret.stdout === `${triggerValues.room}${kids_airplay_base}\n`){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${guest_airplay_base}-PowerOn"`);
            }else if(ret.stdout === `${triggerValues.room}${guest_airplay_base}\n`){
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${his_airplay_base}-PowerOn"`);
            }else{
                shell.exec(`${bridge} servicerequestcommand "${triggerValues.room}${his_airplay_base}-PowerOn"`);
            }
        }; break;
        case 'off': {
            let active = shell.exec(`${bridge} readstate "${triggerValues.room}.ActiveService"`);
            active = active.stdout.replace(/\r?\n|\r/g, "");
            shell.exec(`${bridge} servicerequestcommand "${active}-PowerOff"`);
        }; break;
        case 'scene': {
            shell.exec(`${bridge} activatescene ${triggerValues.scene}`);
        }; break;
        default: break;
    }
}

main();