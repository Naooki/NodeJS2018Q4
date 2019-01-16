const minimist = require('minimist');

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
        console.log('Wrong input. Options are not provided.');
    } else if (options.indexOf('help') === 1) {
        console.log('---help info---');
    } else if (options.indexOf('action') === 1) {
        switch (args.action) {
            case '':
                break;
            case '':
                break;
            default:
                console.error();
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
