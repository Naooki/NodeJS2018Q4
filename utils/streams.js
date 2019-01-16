const minimist = require('minimist');

function reverse(str) {}
function transform(str) {}
function outputFile(filePath) {}
function convertFromFile(filePath) {}
function convertToFile(filePath) {}

const args = minimist(process.argv.slice(2), {
    alias: {
      'help': 'h',
      'action': 'a',
      'file': 'f',
      'path': 'p',
    },
});

console.log(JSON.stringify(args));
