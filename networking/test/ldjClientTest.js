'use strict';
const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib/ldjClient.js');

describe('LDJClient',()=>{
    let stream = null;
    let client = null;

    beforeEach(()=>{
        stream = new EventEmitter();
        client = new LDJClient(stream);
    });

    it('emit message event from single data event',(done)=>{
        client.on('message', (message)=>{
            assert.deepEqual(message, {foo:'bar'});
            done();
        });
        stream.emit('data','{"foo":"bar"}\n');
    });
});