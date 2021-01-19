const chalk = require('chalk')
const {prompt} = require('inquirer')
const { init } = require('./mainFunctions')

/**
 * Prompts in the CLI with a confirmation to overwrite config file, if Yes, then calls init()
 */
let configCreationConfirmationPrompt = function () {
    prompt([{
        type: 'confirm',
        name: 're-init-prompt',
        message: 'Do you want to still continue? (Note: This will overwrite the current config)',
        default: false,
    }]).then(answers => {
        if (answers["re-init-prompt"]) {
            init()
        }
        else {
            console.log(chalk.yellow('\nColorify: cfconfig.json already exists, init Aborted\n'))
        }
    })
}

module.exports = { configCreationConfirmationPrompt }