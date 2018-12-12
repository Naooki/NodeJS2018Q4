const util = require('util');
const EventEmitter = require('events');
const fs = require('fs');
const md5 = require('md5');
const _ = require('lodash');

const readDir = util.promisify(fs.readdir);

class DirWatcher {
    constructor() {
        this._eventEmiiter = null;
        this._pollingInterval = null;
        this._prevFilesHashMap = null;
    }

    watch(path, delay = 5000) {
        this.unwatch();
        this._eventEmiiter = new EventEmitter();
        this._pollingInterval = setInterval(() => this._pollDirectory(path), delay);
        return this._eventEmiiter;
    }

    unwatch() {
        this._eventEmiiter = null;
        this._prevFilesHashMap = null;
        clearInterval(this._pollingInterval);
    }

    _pollDirectory(path) {
        readDir(path)
            .then(files => this._calculateFilesHashMap(path, files))
            .then(filesHasMap => {
                if (this._eventEmiiter && !_.isEqual(this._prevFilesHashMap, filesHasMap)) {
                    this._prevFilesHashMap = filesHasMap;
                    this._eventEmiiter.emit('changed');
                }
            });
    }

    _calculateFilesHashMap(path, files) {
        return _.reduce(files, (hashMap, file) => {
            const filePath = `${path}/${file}`;
            hashMap[filePath] = md5(fs.readFileSync(filePath));
            return hashMap;
        }, {});
    }
}

module.exports = DirWatcher;
