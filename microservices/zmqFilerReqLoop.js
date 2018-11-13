'use strict'
const zmq = require('zeromq')
const filename = process.argv[2];

const requester = zmq.socket('req');

requester.on('message', (data=>{
    const response = JSON.parse(data);
    console.log('received response: ', response);
    
}));

requester.connect('tcp://localhost:60402');

for (let i = 0; i < 5; i++) {
    console.log((`sending a req for ${filename}`));
    requester.send(JSON.stringify({path: filename}));   
}

