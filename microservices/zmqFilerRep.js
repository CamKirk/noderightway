'use strict';
const fs = require('fs');
const zmq = require('zmq');

const responder = zmq.socket('rep');

responder.on('message', (data)=> {
    const request = JSON.parse(data);
    console.log(`received request for ${request.path}`);

    fs.readFile(request.path,(err, content)=>{
        console.log(`sending response content`);
        responder.send(JSON.stringify({
            content: content.toString(),
            timestamp: Date.now(),
            pid: process.id
        }));

        
    })
    
});

responder.bind('tcp://localhost:60401', (err)=>{
    console.log(`listening to zmq requesters`);
    
})

process.on('SIGINT',()=>{
    console.log('shutdown');
    responder.close();
    
})