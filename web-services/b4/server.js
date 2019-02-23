'use strict';
const express = require('express');
const morgan = require('morgan');
const nconf = require('nconf');
const pkg = require('./package.json');

nconf.argv().env('__'); // double underscore enables env variables using es__host
nconf.defaults({conf: `${__dirname}/config.json`});
nconf.file(nconf.get('conf'));

const app = express();

app.use(morgan('dev'));

app.get('/api/version', (req, res) => res.status(200).send(pkg.version));

//loading in search
require('./lib/search.js')(app, nconf.get('es'))

app.listen(nconf.get('port'), ()=> console.log('Ready.'));