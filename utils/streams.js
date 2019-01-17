const minimist = require('minimist');
const streamConstants = require('./streams.constants.js');

function reverse(str) {}
function transform(str) {}
function outputFile(filePath) {}
function convertFromFile(filePath) {}
function convertToFile(filePath) {}

const aliasConfig = {
    'help': 'h',
    'action': 'a',
    'file': 'f',
    'path': 'p',
};

processCommand();

function processCommand() {
    const args = getMinimistArgs();
    console.log(JSON.stringify(args));

    const options = Object.keys(args);

    if (options.length === 1) {
        console.log('Invalid input. Options are not provided.\n');
        console.log(streamConstants.helpMessage);
    } else if (options.indexOf('help') === 1) {
        console.log(streamConstants.helpMessage);
    } else if (options.indexOf('action') === 1) {
        switch (args.action) {
            case 'reverse':
                break;
            case 'transform':
                break;
            case 'outputFile':
                break;
            case 'convertFromFile':
                break;
            case 'convertToFile':
                break;
            default:
                console.error('Invalid action provided!\n');
        }
    } else {
        console.log('Invalid otions.');
    }
}

function getMinimistArgs() {
    const minimistArgs = minimist(process.argv.slice(2), { alias: aliasConfig });
    const aliasConifigKeys = Object.keys(aliasConfig);
    aliasConifigKeys.forEach(key => delete minimistArgs[aliasConfig[key]]);
    return minimistArgs;
}
