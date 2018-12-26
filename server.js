'use strict';
var dotenv = require('dotenv').config({path: 'env.config'});
var fs = require('fs');
var Nuxt = require('nuxt').Nuxt;
var resolve = require('path').resolve;
var app = require('express')();

var host = process.env.CREDIT_CLIENT_HOST || '127.0.0.1';
var port = process.env.CREDIT_CLIENT_PORT || 9035;
var apiUrl = process.env.CREDIT_API_URL || "https://loan-portfolio-api.herokuapp.com/"
var prefix = process.env.CREDIT_CLIENT_PREFIX || '';

// Import and Set Nuxt.js options
var rootDir = resolve('.');
var nuxtConfigFile = resolve(rootDir, './nuxt.config.js');

var options = {};
if (fs.existsSync(nuxtConfigFile)) {
  options = require(nuxtConfigFile);
}
if (typeof options.rootDir !== 'string') {
  options.rootDir = rootDir;
}
options.dev = false; // Force production mode (no webpack middleware called)
options.axios.baseURL = apiUrl;

var nuxt = new Nuxt(options);

app.use(nuxt.render);
app.listen(port, host);
console.log('Server listening on ' + 'http://' + host + ':' + port); // eslint-disable-line no-console
console.log('Resolved API URL: ' + options.axios.baseURL); // eslint-disable-line no-console

