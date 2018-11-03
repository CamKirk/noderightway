const EventEmitter = require('events').EventEmitter;
class LDJClient extends EventEmitter{ //LDJ = line-delimited JSON

    constructor(stream){
        super();
        let buffer = '';
        stream.on('data', (data)=> {
            buffer += data;
            console.log(buffer);
            
            let boundary = buffer.indexOf('\n');
            while (boundary !== -1){
                const input = buffer.substring(0, boundary);
                buffer = buffer.substring(boundary+1);
                console.log(buffer);
                
                this.emit('message', JSON.parse(input)); //returning an unexpected end of input? Looks like chunkOne is writing but chunkTwo is not.
                boundary = buffer.indexOf('\n');
                
            }

        })
    }

    static connect(stream){
        return new LDJClient(stream);
    }
}

module.exports = LDJClient;