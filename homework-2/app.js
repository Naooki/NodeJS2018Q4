const DirWatcher = require('./dirwatcher');

process.chdir(__dirname);


const dirWatcher = new DirWatcher();
dirWatcher.on('changed', file => {
    console.log(`Changed: ${file}`);
});
dirWatcher.watch('data/');

// const dirWatcher = new DirWatcher();
// const importer = new Importer(dirWatcher);

