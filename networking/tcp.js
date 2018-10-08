'use strict';
const net = require('net');
const server = net.createServer((connection)=>{
    console.log('hello world');
    
});
server.listen(8000,()=>{
    console.log('listening');
    
})