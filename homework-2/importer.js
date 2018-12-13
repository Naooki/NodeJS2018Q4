const fs = require('fs');
const util = require('util');
const EventEmitter = require('events');

class Importer extends EventEmitter {
    constructor(dirWatcher, isAsync) {
        super();
        this.filesData = {};

        dirWatcher.on('changed', filePath => {
            if (isAsync) {
                this._import(filePath).then(data => this.emit('processed', data));
            } else {
                this.emit('processed', this._importSync(filePath));
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
