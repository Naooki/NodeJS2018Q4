const DirWatcher = require('./dirwatcher');
const Importer = require('./importer');

process.chdir(__dirname);


const dirWatcher = new DirWatcher();
const importer = new Importer(dirWatcher, true);

importer.on('processed', data => console.log(`Processed data: ${data}`));

dirWatcher.watch('data/');
