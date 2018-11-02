'use strict';
const net = require('net');
const client = net.connect({port:8000});

client.on('data', (data)=>{
    const message = JSON.parse(data);
    switch (message.type){
        case 'watching':
            console.log(`now watching ${message.file}`);
            break;
        case 'changed':
            const date = new Date(message.timestamp);            
            console.log(`file changed at ${date}`);
            break;
        default:
            console.log("Unrecognized message type: ${message.type}");
    }

            
}).on('error',(err)=>console.log(err));