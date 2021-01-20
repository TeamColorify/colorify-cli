const fs = require("fs");
const path = require("path");

/**
 *
 * @param {String} filePath Relative path to the directory
 * @return {Boolean} true -> if Directory Exists, false -> if Directory Does't Exist
 */
let directoryExists = function directoryExists(filePath) {
  return fs.existsSync(filePath);
};

/**
 *
 * @param {String} filePath Relative path to the File
 * @return {Boolean} true -> if File Exists , false -> if File doesn't Exist
 */
let fileExists = function fileExists(filePath) {
  try {
    const val = fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
    if (!val) return true;
  } catch (error) {
    return false;
  }
};

module.exports = { directoryExists, fileExists };
