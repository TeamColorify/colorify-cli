const fs = require("fs");
const chalk = require("chalk");
const { join } = require("path");

const defaultConfig = fs.readFileSync(join(__dirname,'./presets/colorify.config.preset.js')).toString()

/**
 * * Generates a config file in the root directory
 */
let init = function init() {
  fs.writeFile("colorify.config.js", defaultConfig, (err) => {
    if (err) console.log(err);
    else
      console.log(
        chalk.green(
          "Colorify: Succesfully initialised config file - colorify.config.js"
        )
      );
  });
};

module.exports = {
  init,
};
