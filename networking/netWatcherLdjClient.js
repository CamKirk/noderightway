'use strict';
const netClient = require('net').connect({
    port: 8000
});
const ldjClient = require('./lib/ldjClient.js').connect(netClient);

ldjClient.on('message', (message) => {
    if(message.type === 'watching'){
        console.log(`Now watching: ${message.file}`);
    } else if (message.type === 'changed') {
        console.log(`File changed: ${ new Date(message.timestamp)}`);        
    } else {
        throw Error(`Unrecognized message type: ${message.type}`);
    }
});
