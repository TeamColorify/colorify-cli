#!/usr/bin/env node
let argv = require('minimist')(process.argv.slice(2))
const chalk = require('chalk')
const inquirer = require('inquirer');
const sass = require('node-sass')
const fs = require('fs')
const path = require('path')
const updateNotifier = require('update-notifier');

// Update Notifications
const pkg = require('./package.json');
updateNotifier({pkg}).notify();


//ImprotLibs
const fileFunctions = require('./lib/fileFunctions')
const mainFuntions = require('./lib/mainFunctions')

if (argv._[0] === 'init') {
    if (!fileFunctions.fileExists('cfconfig.json')) {
        mainFuntions.init();
    }
    else {
        console.log(chalk.red('\n\nColorify: Config file already Exists.\n'))
        inquirer.prompt([{
            type: 'confirm',
            name: 're-init-prompt',
            message: 'Do you want to still continue? (Note: This will overwrite the current config)',
            default: false,
        }]).then(answers => {
            if (answers["re-init-prompt"]) {
                mainFuntions.init();
            }
            else {
                console.log(chalk.yellow('\nColorify: cfconfig.json already exists, init Aborted\n'))
            }
        })
    }
}
if (argv._[0] === 'create') {
    const config = require(path.join(process.cwd(), '/cfconfig.json'))
    const file = fs.createWriteStream(config.filename || 'colorify.css')
    config.types.map((type) => {
        let types = ['material', 'flatui', 'metro', 'social']
        if (!types.includes(type.name)) {
            console.log(chalk.yellow('\nError: No Type with the name of "' + type.name + '" found.\nSkipping: Type - "' + type.name + '".'));
        }
        else {
            type.properties.map(prop => {
                if (prop.prop !== 'bg' && prop.prop !== 'text' && prop.prop !== 'bd') {
                    console.log(chalk.yellow('\nError: No Property with the Abbrieviation "' + prop.prop + '" is found.\nSkipping: Property - "' + prop.prop + '" in "' + type.name + '".'))
                }
                else {
                    if (prop.colors) {
                        if (type.name === 'metro' || type.name === 'social') {
                            console.log(chalk.yellow('\nError: Type "' + type.name + '" does not support color variation yet.\nSkipping: Type - "' + type.name + '".'))
                        }
                        else {
                            prop.colors.map(color => {
                                try {
                                    const sassfile = path.join(__dirname, 'lib/colorify/src/properties/' + prop.prop + '/' + type.name + '/_' + color + '.scss')
                                    var result = sass.renderSync({
                                        file: sassfile,
                                        outputStyle: config.outputStyle
                                    })
                                    fs.appendFile(file.path, result.css, (err) => {
                                        if (err)
                                            console.log(chalk.red('Something Went Wrong'))
                                    })
                                } catch (error) {
                                    console.log(chalk.yellow('\nError: No color with the name "' + color + '" found in ' + type.name + '.\nSkipping: Color - "' + color + '" in "' + type.name + '".'))
                                }

                            })
                        }
                    }
                    else {
                        const sassfile = path.join(__dirname, 'lib/colorify/src/properties/' + prop.prop + '/' + type.name + '/_' + type.name + prop.prop + '.scss')
                        var result = sass.renderSync({
                            file: sassfile,
                            outputStyle: config.outputStyle
                        })
                        fs.appendFile(file.path, result.css, (err) => {
                            if (err)
                                console.log(chalk.red('Something Went Wrong'))
                        })
                    }
                }

            })
        }

    })
    console.log(chalk.green('\nColorify file created succesfully\n'))
}



