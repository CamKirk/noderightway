'use strict'
const zmq = require('zeromq')
const filename = process.argv[2];

const requester = zmq.socket('req');

requester.on('message', (data=>{
    const response = JSON.parse(data);
    console.log('received response: ', response);
    
}));

requester.connect('tcp://127.0.0.1:60401');

console.log((`sending a req for ${filename}`));
requester.send(JSON.stringify({path: filename}));
