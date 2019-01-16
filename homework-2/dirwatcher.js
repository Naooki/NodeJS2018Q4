const util = require('util');
const EventEmitter = require('events');
const fs = require('fs');
const md5 = require('md5');
const path = require('path');
const _ = require('lodash');

const readDir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const resolvePath = path.resolve;

class DirWatcher extends EventEmitter {
    constructor() {
        super();
        this._pollingInterval = null;
        this._filesHashMap = null;
    }

    watch(path, delay = 5000) {
        this.unwatch();
        this._filesHashMap = new Map();
        this._pollingInterval = setInterval(() => this._runPollingCycle(path), delay);
    }

    unwatch() {
        this._filesHashMap = null;
        clearInterval(this._pollingInterval);
    }

    _runPollingCycle(path) {
        this._pollDirectory(path)
            .then(filePaths => this._checkForUpdates(filePaths));
    }

    _pollDirectory(path) {
        const that = this;
        const results = [];

        return new Promise((resolve, reject) => {
            readDir(path).then(files => {
                let i = 0;
                (function next() {
                    const file = files[i++];
                    if (!file) {
                        return resolve(results);
                    }

                    const filePath = resolvePath(path, file);
                    stat(filePath).then(stat => {
                        if (stat && stat.isDirectory()) {
                            that._pollDirectory(filePath)
                                .then(res => {
                                    results.push(...res);
                                    next();
                                }).catch(err => reject(err));
                        } else {
                            results.push(filePath);
                            next();
                        }
                    });
                })();
            }).catch(err => reject(err));
        });
    }

    _checkForUpdates(filePaths) {
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
    }
}

module.exports = DirWatcher;
