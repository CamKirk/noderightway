'use strict';

const fs = require('fs');
const expect = require('chai').expect;

const rdf = fs.readFileSync(`${__dirname}/pg132.rdf`);

const parseRDF = require('../lib/parseRDF.js')


describe('parseRDF', ()=>{
    it('should be a function', ()=>{
        expect(parseRDF).to.be.a('function');
    });
})