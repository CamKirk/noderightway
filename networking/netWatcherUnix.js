'use strict';
const fs = require('fs');
const net = require('net');
const filename = process.argv[2];

if (!filename) throw Error('no filename');

net.createServer((connection)=>{
    console.log('sub connected');
    connection.write(`now watching ${filename}`);

    const watcher = fs.watch(filename, ()=> {
        connection.write(`file changed ${new Date}`);
    });

    connection.on('close',()=>{
        console.log('sub disconnect');
        watcher.close();
    });

}).listen(8000);

