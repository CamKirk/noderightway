'use strict';
const server = require('net').createServer((connection)=>{
    console.log('sub connected');

    const chunkOne = `{ 
        "type":"changed",
        "timesta`;

    
    const chunkTwo = 'mp":1538975350426}';

    connection.write(chunkOne);

    const timer = setTimeout(()=>{
        connection.write(chunkTwo);
        connection.end();
    }, 100);

    connection.on('end',()=>{
        clearTimeout(timer);
        console.log('sub disconnect');
        
    });
}).listen(8000,()=>console.log('port listening for subs'));

