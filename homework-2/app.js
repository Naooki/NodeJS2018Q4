const DirWatcher = require('./dirwatcher');

process.chdir(__dirname);


new DirWatcher().watch('data/').on('changed', file => {
    console.log(`Changed: ${file}`);
});

// const dirWatcher = new DirWatcher();
// const importer = new Importer(dirWatcher);

