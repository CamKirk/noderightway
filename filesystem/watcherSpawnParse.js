'use strict';
const fs = require('fs');
const spawn = require('child_process').spawn;
const filename = process.argv[2];

if (!filename) throw Error('must watch a file');

fs.watch(filename, () => {
    const ls = spawn('ls', ['-l','-h',filename]);
    let output = '';

    ls.stdout.on('data', (chunk) => output += chunk);
    ls.on('close',()=> {
        const parts = output.split(" ");
        console.log(parts);
        
    })
});
console.log(`now watching ${filename}`);
