const fs = require('fs');
const util = require('util');
const EventEmitter = require('events');
const parse = require('csv-parse/lib/sync');

class Importer extends EventEmitter {
    constructor(dirWatcher, isAsync) {
        super();
        dirWatcher.on('changed', filePath => {
            if (isAsync) {
                this._import(filePath)
                    .then(data => data.toString())
                    .then(text => parse(text, {
                        columns: true,
                        skip_empty_lines: true,
                    }))
                    .then(parsed => this.emit('processed', JSON.stringify(parsed)));
            } else {
                const text = this._importSync(filePath).toString();
                const parsedData = parse(text, {
                    columns: true,
                    skip_empty_lines: true,
                });
                this.emit('processed', JSON.stringify(parsedData));
            }
        });
    }

    _import(path) {
        return util.promisify(fs.readFile)(path);
    }

    _importSync(path) {
        return fs.readFileSync(path);
    }
}

module.exports = Importer;
