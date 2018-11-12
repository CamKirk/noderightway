'use strict';
const zmq = require('zeromq');

const sub = zmq.socket('sub');

sub.subscribe('');

sub.on('message', (data)=>{
    const msg = JSON.parse(data);
    const date = new Date(msg.timestamp);
    console.log(`file ${msg.file} changed at ${date}`);
    
})

sub.connect("tcp://localhost:60400");
