# Lutron Button Triggers
I use this setup when I have to assign services to lots of Lutron keypad buttons.
The information about the buttons and their functions is just contained in a JSON structure and the script can remove or add all triggers with a simple call.
Also more comprehensive functions can be executed with these scripts, like for example a ring counter that circles through all music sources of one type on a job, just like in my example here.
I use node for scripting as of now because I am most familiar with it, but more performing choices would probably be Python Bash or Ruby. I will probably take this on in the near future.
The scripts can actually be used with other lighting systems like Vantage or Litetouch, there just need to be some logic changes regarding the IDs.

## Prerequisites

### Install Node Js on the Savant Pro Hosts

In System Monitor, start a screenshare with the host and navigate to the Safari browser.
Download the MACOS LTS version of Node Js <a href="https://nodejs.org/en/download/">here</a>  and follow the installation instructions

Now you can test Node Js in the terminal

    /usr/local/bin/node -v

### Install Node Js on the Savant Smart Hosts

In System Monitor, start a terminal session with the host and start to download the node version manager with the following command

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash

Execute the commands to load nvm into your terminal session

    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

Install the latest Node Js LTS version (for example 14.15.5)

    nvm install 14.15.5

Now you can test Node Js in the terminal

    /data/RPM/.nvm/versions/node/v14.15.5/bin/node -v

### Moving finished scripts over to Savant Pro Hosts

Simply drag and drop the file structure into a screenshare with the Pro Host

### Moving finished scripts over to Savant Smart Hosts

You can use the <a href="https://linuxize.com/post/how-to-use-scp-command-to-securely-transfer-files/">SCP</a> command or simply use a transfer service like <a href="https://transfer.sh/">this one</a>

### Installing packages

After moving the files over, navigate into their directory and execute the following command

    /data/RPM/.nvm/versions/node/v14.15.5/bin/node i (Smart Host)
    /usr/local/bin/node i (Pro Host)

## Usage

### Running scripts on the Savant Pro Hosts

Navigate into the directory of the scripts and enter this command for example

    /usr/local/bin/node createTriggers.js

### Running scripts on the Savant Smart Hosts

Navigate into the directory of the scripts and enter this command for example

    /data/RPM/.nvm/versions/node/v14.15.5/bin/node createTriggers.js

### General Information

The scripts that are executable are

    createTriggers.js   - creates triggers on the savant host
    removeTriggers.js   - removes triggers from the savant host
    listServices.js     - lists services per user zone, this is just a little helper

Lots of information can be found in the source files in this folder since they have to be fitted to an installation anyway.
Just a quick info for the remaining important files

    callTriggers.js     - this file is called from the Savant trigger engine and determines the service that is performed
    triggers.json       - The triggers are defined here
    config.json         - some global constants and settings for your job

## Heads up

I just assume that there is a global area in your setup that does not have to be shown as a room in the app. This is just nicer to make it clear where the General Programmable Service Requests without ties to any area reside or to call on global scenes. If that area is not present, just exchange the area in the createTrigger section to anything, since the RunCLIProgramm is accessible from any zone. Also when creating scenes in the trigger json any zone should work really instead of global as in the example. 




I just posted this as an initial version after using it on a job. I will make improvements in the future and add a proper guide. Any questions feel free to send me a message or comment, I will try to answer.
