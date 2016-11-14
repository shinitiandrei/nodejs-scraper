var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var Xray    = require('x-ray')
var cheerioTable  = require ('cheerio-tableparser');
var app = express();

app.get('/get-endpoint', function(req, res){

  url = 'http://docs.aws.amazon.com/general/latest/gr/rande.html';

  var xray = new Xray();

  xray(url, '.informaltable-contents',
    [{
      region_name: 'td',
      region: 'td+',
      endpoint: 'td++',
      protocol: 'td+++'
    }]
   ) 
  .write('results.json');

  console.log('File successfully written! - Check your project directory for the results.json file');

  res.send('Check your console!')
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
