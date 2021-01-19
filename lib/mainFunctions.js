const fs = require('fs');
const chalk = require('chalk');

const defaultConfig = "{\"filename\":\"myColors.css\",\"types\":[{\"name\":\"material\",\"properties\":[{\"prop\":\"bg\"},{\"prop\":\"text\"},{\"prop\":\"bd\"}]},{\"name\":\"flatui\",\"properties\":[{\"prop\":\"bg\"},{\"prop\":\"text\"},{\"prop\":\"bd\"}]},{\"name\":\"metro\",\"properties\":[{\"prop\":\"bg\"},{\"prop\":\"text\"},{\"prop\":\"bd\"}]},{\"name\":\"social\",\"properties\":[{\"prop\":\"bg\"},{\"prop\":\"text\"},{\"prop\":\"bd\"}]}]}"

/**
 * * Generates a config file in the root directory
 */ 
let init = function init() {
    fs.writeFile('cfconfig.json',defaultConfig,(err)=>{
        if(err)
            console.log(err)
        else
            console.log(chalk.green('Colorify: Succesfully initialised config file - cfconfig.json'));
    })
}

module.exports = {
    init
}