const util = require('util');
const EventEmitter = require('events');
const fs = require('fs');
const md5 = require('md5');
const _ = require('lodash');

const readDir = util.promisify(fs.readdir);

class DirWatcher extends EventEmitter {
    constructor() {
        super();
        this._pollingInterval = null;
        this._filesHashMap = null;
    }

    watch(path, delay = 5000) {
        this.unwatch();
        this._filesHashMap = new Map();
        this._pollingInterval = setInterval(() => this._pollDirectory(path), delay);
    }

    unwatch() {
        this._filesHashMap = null;
        clearInterval(this._pollingInterval);
    }

    _pollDirectory(path) {
        readDir(path)
            .then(files => _.map(files, file => `${path}/${file}`))
            .then(filePaths => {
                if (this._filesHashMap) {
                    for (let key of this._filesHashMap.keys()) {
                        if (!_.includes(filePaths, key)) {
                            this._filesHashMap.delete(key);
                        }
                    }

                    _.forEach(filePaths, filePath => {
                        const fileHash =  md5(fs.readFileSync(filePath));
        
                        if (!this._filesHashMap.has(filePath)) {
                            this._filesHashMap.set(filePath, fileHash);
                        } else if (this._filesHashMap.get(filePath) !== fileHash) {
                            this._filesHashMap.set(filePath, fileHash);
                            this.emit('changed', filePath);
                        }
                    });
                }
            });
    }
}

module.exports = DirWatcher;
