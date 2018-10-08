const fs = require('fs');
const filename = process.argv[2];

if (!filename) throw Error('must watch a file');

fs.watch(filename, () => console.log(`file ${filename} changed.`));
console.log(`now watching ${filename}`);
