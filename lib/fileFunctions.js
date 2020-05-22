const fs = require('fs')
const path = require('path')

module.exports = {
    getCurrentDirectoryBase: () => {
      return path.basename(process.cwd());
    },
  
    directoryExists: (filePath) => {
      return fs.existsSync(filePath);
    },
    fileExists: (filePath)=>{
      try {
        const val = fs.accessSync(filePath,fs.constants.R_OK | fs.constants.W_OK)
        if(!val)
          return true;
      } catch (error) {
        return false;
      }
    },
  };