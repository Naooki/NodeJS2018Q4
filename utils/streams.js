const minimist = require('minimist');
const through2 = require('through2');
const fs = require('fs');

const streamConstants = require('./streams.constants.js');

function reverse() {
    process.stdin
        .pipe(through2(function(chunk, encoding, next) {
            this.push(chunk.reverse().slice(1));
            this.push('\n');
            next();
        }))
        .pipe(process.stdout);
}
function transform() {
    process.stdin
        .pipe(through2(function(chunk, encoding, next) {
            this.push(chunk.toString().toUpperCase());
            next();
        }))
        .pipe(process.stdout);
}
function outputFile(filePath) {
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(process.stdout);
    readStream.on('end', () => console.log('---End of file----'));
}
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
                reverse();
                break;
            case 'transform':
                transform();
                break;
            case 'outputFile':
                if (args.file) {
                    outputFile(args.file);
                } else {
                    console.error('File path is not provided!\n');
                }
                break;
            case 'convertFromFile':
                break;
            case 'convertToFile':
                break;
            default:
                console.error('Invalid action provided!\n');
        }
    } else {
        console.log('Invalid options.');
    }
}

function getMinimistArgs() {
    const minimistArgs = minimist(process.argv.slice(2), { alias: aliasConfig });
    const aliasConifigKeys = Object.keys(aliasConfig);
    aliasConifigKeys.forEach(key => delete minimistArgs[aliasConfig[key]]);
    return minimistArgs;
}
