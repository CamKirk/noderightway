'use strict';
const fs = require('fs');
const zmq = require('zeromq');

const responder = zmq.socket('rep');

responder.on('message', (data)=> {
    const request = JSON.parse(data);
    console.log(`received request for ${request.path}`);

    fs.readFile(request.path,(err, content)=>{
        if (err) throw err;
        console.log(`sending response content`);
        responder.send(JSON.stringify({
            content: content.toString(),
            timestamp: Date.now(),
            pid: process.id
        }));

        
    });
    
});

responder.bind('tcp://127.0.0.1:60401', (err)=>{//apparently zmq is very picky about using 127.0.0.1 instead of localhost on the port bind?
    console.log(`listening to zmq requesters`);
    
});

process.on('SIGINT',()=>{
    console.log('shutdown');
    responder.close();
    
});