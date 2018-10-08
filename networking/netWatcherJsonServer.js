'use strict';
const fs = require('fs');
const net = require('net');
const filename = process.argv[2];

if (!filename) throw Error('no filename');

net.createServer((connection)=>{
    console.log('sub connected');
    connection.write(JSON.stringify({
        type: 'watching',
        file: filename
     },"",2));

    const watcher = fs.watch(filename, ()=> {
        connection.write(JSON.stringify({
            type: 'changed',
            timestamp: Date.now()
        },"",2));
    });

    connection.on('close',()=>{
        console.log('sub disconnect');
        watcher.close();
    });

}).listen(8000);

