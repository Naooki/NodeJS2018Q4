const DirWatcher = require('./dirwatcher');

process.chdir(__dirname);


new DirWatcher().watch('data/').on('changed', () => {
    console.log('Changed event occured');
});
