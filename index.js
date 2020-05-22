#!/usr/bin/env node
let argv = require('minimist')(process.argv.slice(2))
const chalk = require('chalk')
const inquirer = require('inquirer');
const sass = require('node-sass')
const fs = require('fs')
const path = require('path')


//ImprotLibs
const fileFunctions = require('./lib/fileFunctions')
const mainFuntions = require('./lib/mainFunctions') 

if(argv._[0] === 'init'){
    if(!fileFunctions.fileExists('cfconfig.json')){
        mainFuntions.init();
    }
    else{
        console.log(chalk.red('\n\nColorify: Config file already Exists.\n'))
        inquirer.prompt([{
            type:'confirm',
            name:'re-init-prompt',
            message:'Do you want to still continue? (Note: This will overwrite the current config)',
            default:false,
        }]).then(answers=>{
            if(answers["re-init-prompt"]){
                mainFuntions.init();
            }
            else{
                console.log(chalk.yellow('\nColorify: cfconfig.json already exists, init Aborted\n'))
            }
        })
    }
}
if(argv._[0] === 'create'){
        const file = fs.createWriteStream('colorify.css')
        const config = require(path.join(process.cwd(),'/cfconfig.json'))
        config.types.map((type)=>{
            const sassfile =path.join(__dirname,'lib/colorify/src/properties/backgroundColor/'+type+'/_'+type+'bg.scss')
            sass.render({
                file:sassfile,
                outputStyle:config.outputStyle
            },(error,result)=>{
                if(!error)
                    fs.appendFile(file.path,result.css,(err)=>{
                        if(!err)
                            console.log('Done')
                    })
            })
        })
}

