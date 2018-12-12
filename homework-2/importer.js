const fs = require('fs');
const util = require('util');

class Importer {
    constructor(dirWatcher, isAsync) {
        this.filesData = {};

        dirWatcher.on('changed', filePath => {
            if (isAsync) {
                this._import(filePath).then(console.log);
            } else {
                console.log(this._importSync(filePath));
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
