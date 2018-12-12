const util = require('util');
const EventEmitter = require('events');
const fs = require('fs');

const readDir = util.promisify(fs.readdir);


class DirWatcher {
    constructor(pollingInteval = 5000) {
        this._pollingInteval = pollingInteval;
        this._polling = null;
        this._changeEmitter = new EventEmitter();
    }

    watch(path, delay) {
        clearInterval(this._polling);
        this._polling = setInterval(() => this._pollDirectory(path), this._pollingInteval);
        return this._changeEmitter;
    }

    _pollDirectory(path) {
        readDir(path).then(files => {
            console.log(files);
        });
    }
}

module.exports = DirWatcher;
