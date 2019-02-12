const http = require('http');

const port = '8080';

http.createServer((req,res) => {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
        });
        res.on('finish', () => console.log('echo'));
        req.pipe(res);
    })
    .listen(port, () => console.log(`Listening port: ${port}`));
