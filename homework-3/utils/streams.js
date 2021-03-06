const minimist = require('minimist');
const through2 = require('through2');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/lib/sync');
const util = require('util');
const request = require('request');

const streamConstants = require('./streams.constants.js');

function reverse() {
    console.log(chalk.green('reverse:'));
    process.stdin
        .pipe(through2(function(chunk, encoding, next) {
            this.push(chunk.reverse().slice(1));
            this.push('\n');
            next();
        }))
        .pipe(process.stdout);
}
function transform() {
    console.log(chalk.green('trasform:'));
    process.stdin
        .pipe(through2(function(chunk, encoding, next) {
            this.push(chunk.toString().toUpperCase());
            next();
        }))
        .pipe(process.stdout);
}
function outputFile(filePath) {
    const readStream = fs.createReadStream(filePath);
    console.log(chalk.green(`---Output file: ${filePath}---`));
    readStream.pipe(process.stdout);
}
function convertFromFile(filePath) {
    console.log(chalk.green(`---Convert from file: ${filePath}---`));
    fs.createReadStream(filePath)
        .pipe(through2(function (chunk, encoding, next) {
            const csvText = chunk.toString();
            const jsonText = JSON.stringify(parse(csvText, {
                columns: true,
                skip_empty_lines: true,
            }));
            this.push(jsonText);
            next();
        }))
        .pipe(process.stdout);
}
function convertToFile(filePath) {
    const baseName = path.basename(filePath, 'csv').slice(0, -1);
    const pathName = path.dirname(filePath);
    const writeStream = fs.createWriteStream(`${pathName}/${baseName}.json`);

    console.log(chalk.green(`Convert to JSON file: ${filePath}`));

    fs.createReadStream(filePath)
        .pipe(through2(function (chunk, enc, next) {
            const csvText = chunk.toString();
            const jsonText = JSON.stringify(parse(csvText, {
                columns: true,
                skip_empty_lines: true,
            })).replace(/\s/g, '');
            this.push(jsonText);
            next();
        }))
        .pipe(writeStream);

    writeStream.on('finish', () => console.log(chalk.green(`${baseName}.json has been generated.`)));
}

function cssBundler(filePath) {
    util.promisify(fs.readdir)(filePath)
        .then(files => {
            if (!files || !files.length) {
                console.log(chalk.red('No files to bundle.'));
                return;
            }
            const bundleFileName = 'bundle.css';
            const writeStream = fs.createWriteStream(`${filePath}/${bundleFileName}`, { flags: 'a'});

            files.map(file => {
                if (path.extname(file).toLowerCase() === '.css' && file !== bundleFileName) {
                    fs.createReadStream(`${filePath}/${file}`)
                    .pipe(through2(function(chunk, encoding, next) {
                      const text = `${chunk.toString()}\n`;
                      this.push(text);
                      next();
                    }))
                    .pipe(writeStream);
                }
            });

            const remoteFileWriteStream = fs.createWriteStream(`${filePath}/${bundleFileName}`, { flags: 'a'});
            request(streamConstants.remoteCssFileUrl).pipe(remoteFileWriteStream);
            remoteFileWriteStream.on('finish', () => console.log(chalk.green('Bundle.css has been generated.')));
        })
        .catch(err => console.error(chalk.red(err)));
}

const aliasConfig = {
    'help': 'h',
    'action': 'a',
    'file': 'f',
    'path': 'p',
};

processCommand();

function processCommand() {
    const args = getMinimistArgs();
    const options = Object.keys(args);

    if (options.length === 1) {
        console.log(chalk.red('Invalid input. Options are not provided.\n'));
        console.log(chalk.cyan(streamConstants.helpMessage));
    } else if (options.indexOf('help') === 1) {
        console.log(chalk.cyan(streamConstants.helpMessage));
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
                    console.error(chalk.red('File path is not provided!\n'));
                }
                break;
            case 'convertFromFile':
                if (args.file) {
                    convertFromFile(args.file);
                } else {
                    console.error(chalk.red('File path is not provided!\n'));
                }
                break;
            case 'convertToFile':
                if (args.file) {
                    convertToFile(args.file);
                } else {
                    console.error(chalk.red('File path is not provided!\n'));
                }
                break;
            case 'cssBundler':
                if (args.path) {
                    cssBundler(args.path);
                } else {
                    console.error(chalk.red('Path is not provided!\n'));
                }
                break;
            default:
                console.error(chalk.red('Invalid action provided!\n'));
        }
    } else {
        console.log(chalk.red('Invalid options.'));
    }
}

function getMinimistArgs() {
    const minimistArgs = minimist(process.argv.slice(2), { alias: aliasConfig });
    const aliasConifigKeys = Object.keys(aliasConfig);
    aliasConifigKeys.forEach(key => delete minimistArgs[aliasConfig[key]]);
    return minimistArgs;
}
