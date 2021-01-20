#!/usr/bin/env node

let argv = require("minimist")(process.argv.slice(2));
const chalk = require("chalk");
const sass = require("sass");
const fs = require("fs");
const path = require("path");
const updateNotifier = require("update-notifier");

// Enabling Update Notifier
const pkg = require("./package.json");
updateNotifier({ pkg }).notify();

//Import Libs
const fileFunctions = require("./lib/fileFunctions");
const mainFuntions = require("./lib/mainFunctions");
const { configCreationConfirmationPrompt } = require("./lib/inquirerFunctions");

if (String(argv._[0]) == "init") {
    if (!fileFunctions.fileExists("colorify.config.js")) {
        mainFuntions.init();
    } else {
        console.log(chalk.red("Colorify: Config file already Exists."));
        configCreationConfirmationPrompt();
    }
}

if (argv._[0] === "create") {
    var config;
    if (fileFunctions.fileExists("colorify.config.js")) {
        config = require(path.join(process.cwd(), "/colorify.config.js"));
    } else {
        console.log(chalk.red("\nConfig file `colorify.config.js` doesn't exist."));
        console.log(chalk.blue("\nYou might wanna run the following command in your project folder before the \'create\' command."));
        console.log("\ncolorify-cli init\n");
        process.exit(1);
    }
    // Config File Defaultify
    let types = config.types
    ? config.types
    : [
        { name: "material", properties: [{ prop: "bg" }, { prop: "text" }, { prop: "bd" }] },
        { name: "flatui", properties: [{ prop: "bg" }, { prop: "text" }, { prop: "bd" }] },
        { name: "metro", properties: [{ prop: "bg" }, { prop: "text" }, { prop: "bd" }] },
        { name: "social", properties: [{ prop: "bg" }, { prop: "text" }, { prop: "bd" }] },
    ];

    const file = fs.createWriteStream(config.filename || "colorify.css");
   
    types.map((type) => {
        let types = ["material", "flatui", "metro", "social"];
        if (!types.includes(type.name)) {
            console.log(
                chalk.yellow(
                    '\nError: No Type with the name of "' +
                    type.name +
                    '" found.\nSkipping: Type - "' +
                    type.name +
                    '".'
                )
            );
        } else {
            type.properties.map((prop) => {
                if (prop.prop !== "bg" && prop.prop !== "text" && prop.prop !== "bd") {
                    console.log(
                        chalk.yellow(
                            '\nError: No Property with the Abbrieviation "' +
                            prop.prop +
                            '" is found.\nSkipping: Property - "' +
                            prop.prop +
                            '" in "' +
                            type.name +
                            '".'
                        )
                    );
                } else {
                    if (prop.colors) {
                        if (type.name === "metro" || type.name === "social") {
                            console.log(
                                chalk.yellow(
                                    '\nError: Type "' +
                                    type.name +
                                    '" does not support color variation yet.\nSkipping: Type - "' +
                                    type.name +
                                    '".'
                                )
                            );
                        } else {
                            prop.colors.map((color) => {
                                try {
                                    const sassfile = path.join(
                                        __dirname,
                                        "lib/colorify/src/properties/" +
                                        prop.prop +
                                        "/" +
                                        type.name +
                                        "/_" +
                                        color +
                                        ".scss"
                                    );
                                    var result = sass.renderSync({
                                        file: sassfile,
                                        outputStyle: config.outputStyle,
                                    });
                                    fs.appendFile(file.path, result.css, (err) => {
                                        if (err) console.log(chalk.red("Something Went Wrong"));
                                    });
                                } catch (error) {
                                    console.log(
                                        chalk.yellow(
                                            '\nError: No color with the name "' +
                                            color +
                                            '" found in ' +
                                            type.name +
                                            '.\nSkipping: Color - "' +
                                            color +
                                            '" in "' +
                                            type.name +
                                            '".'
                                        )
                                    );
                                }
                            });
                        }
                    } else {
                        const sassfile = path.join(
                            __dirname,
                            "lib/colorify/src/properties/" +
                            prop.prop +
                            "/" +
                            type.name +
                            "/_" +
                            type.name +
                            prop.prop +
                            ".scss"
                        );
                        var result = sass.renderSync({
                            file: sassfile,
                            outputStyle: config.outputStyle,
                        });
                        fs.appendFile(file.path, result.css, (err) => {
                            if (err) console.log(chalk.red("Something Went Wrong"));
                        });
                    }
                }
            });
        }
    });
    console.log(chalk.green("\nColorify file created succesfully\n"));
}
