/**
 * Provide API endpoints for searching bookx index
 */
'use strict';
const request = require('request');

//where es is elasticsearch app config
module.exports = (app, es) => {
    const url = `http://${es.host}:${es.port}/${es.books_index}/book/_search`
    
    app.get('/api/search/books/:field/:query', (req,res)=>{
        
        const esReqBody={
            size: 10,
            query:{
                match:{
                    [req.params.field]:req.params.query
                }
            }
        }

        const options = {url, json:true, body: esReqBody};
        
        request.get(options, (err, esRes, esResBody)=>{
            // console.log(options);

            if(err){
                return res.status(502).json({
                    error: 'bad_gateway',
                    reason: err.code
                })
            }

            if(esRes.statusCode !== 200){
                return res.status(esRes.statusCode).json(esResBody);
            }

            res.status(200)
                .json(esResBody.hits.hits.map(({_source})=> _source))
        })
    })

    app.get('/api/suggest/:field/:query', (req, res)=>{

        const esReqBody = {
            size: 0,
            suggest:{
                suggestions:{
                    text: req.params.query,
                    term: {
                        field: req.params.field,
                        suggest_mode: 'always'
                    }
                }
            }
        }

        const options = {url, json:true, body:esReqBody}

        const promise = new Promise((resolve, reject)=>{
            request.get(options, (err, esRes, esResBody)=>{
                if(err){
                    return reject({error:err})
                }
                if(esRes.statusCode !== 200){
                    return reject({error: esResBody})
                }
                resolve(esResBody);
            })
        })

        promise
            .then((esResBody)=> res.status(200).json(esResBody.suggest.suggestions))
            .catch(({error})=> res.status(error.status || 502).json(error))

    })
}
