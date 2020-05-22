const fs = require('fs');
const chalk = require('chalk');

function init() {
    fs.writeFile('cfconfig.json','{ \n \n }',(err)=>{
        if(err)
            console.log(err)
        else
            console.log(chalk.green('Colorify: Succesfully initialised config file - cfconfig.json'));
    })
}

module.exports = {
    init
}