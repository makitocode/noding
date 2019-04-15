'use strict'

const express = require('express');
const app = express();
const color = require('colors');

/**
 * process.argv
 * The process.argv property returns an array containing 
 * the command line arguments passed when the Node.js 
 * process was launched.
 * 
 * The first element will be process.execPath
 * The second element will be the path to the JavaScript file being executed.
 * 
 * The remaining elements will be any additional command line arguments.
 * ex. 
 * $ node process-args.js one two=three four
 * 
 * output
 * 0: /usr/local/bin/node
 * 1: /Users/mjr/work/node/process-args.js
 * 2: one
 * 3: two=three
 * 4: four
 *  
 */

//Print args from node process
// console.log('Argumentos del proceso de node:');
// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });

if(!process.argv[2]){
    console.log(`⚠️ Please define a port to express server.`.yellow);
}else{
    app.listen(process.argv[2]);
    console.log(`Express server listen port ${process.argv[2]}`.green);
}

app.get('/home', function(req, res) {
    try {
        res.end('Hello World!')    
    } catch (error) {
        throw new Error(error);
    }
});
