'use strict';
console.log('Loading function');

const doc = require('dynamodb-doc');
const fs      = require('fs');
const Xray    = require('x-ray')

const dynamo = new doc.DynamoDB();
const url = 'http://www.imdb.com/title/tt1229340/';

/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    var xray = new Xray();

    var result = xray(url, '.informaltable-contents',
        [{
            region_name: "td".trim(),
            region: "td+".trim(),
            endpoint: "td++".trim(),
            protocol: "td+++".trim()
        }]
    ).stream();

    const done = (err, res) => callback(null, {
      statusCode: err ? '400' : '200',
      body: err ? err.message : result.pipe(res),
      headers: {
        'Content-Type': 'application/json',
      },
  });
    console.log('Results: ' + done.body);
    callback(null, result);
};


// var express = require('express');
// var fs      = require('fs');
// var request = require('request');
// var Xray    = require('x-ray')
// var app = express();

// app.get('/get-endpoint', function(req, res){

//   url = 'http://docs.aws.amazon.com/general/latest/gr/rande.html';

//   var xray = new Xray();

//   xray(url, '.informaltable-contents',
//     [{
//       region_name: 'td',
//       region: 'td+',
//       endpoint: 'td++',
//       protocol: 'td+++'
//     }]
//    )
//    .write('results.json');

//   console.log('File successfully written! - Check your project directory for the results.json file');

//   res.send('Check your console!')
// })

// app.listen('8081')
// console.log('Magic happens on port 8081');
// exports = module.exports = app;
