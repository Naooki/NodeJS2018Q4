const http = require('http');
const fs = require('fs');
const through2  = require('through2');

const port = '8080';

http.createServer()
    .on('request', (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });
        const readable = fs.createReadStream('./http-servers/index.html');
        readable
            .pipe(through2(function(chunk, encoding, next) {
                const msg = chunk.toString().replace('{message}', 'Hello, World!');
                this.push(msg);
                next();
            }))
            .pipe(res);
    })
    .listen(port, () => console.log(`Listening port: ${port}`));
