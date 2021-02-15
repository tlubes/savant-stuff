const config = {};

config.host = "Your Savant Host Name here"; // The name of the system as it shows up in system monitor
config.pro = true; // please determine whether you use the pro host or not
config.lutron_controller_name = "Lighting Controller"; // the name your lighting controller has in the blueprint config
config.script_path = "/path/to/scripts"; // the path where the scripts are located, can be located by navigating into the script folder via terminal and executing the 'pwd' command

module.exports = config;