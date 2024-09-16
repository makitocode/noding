//nodejs-common-ecenarios

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// To excecute these exercises you need to run this file `node index.js`
// and then, you see nothing.. but, if you type anythin and then
// press enter you can see now the input words made buffer
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::



// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// 1. Terminal inputs
// 
// > Output
//Hey you!, what's up budy!
//teminal input was <Buffer 48 65 79 20 79 6f 75 21 2c 20 77 68 61 74 27 73 20 75 70 20 62 6f 64 79 21 0a>

//process.stdin.on('data', msj => console.log('teminal input was', msj))




// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// 2. Terminal inputs with stdout
//
// > Output
// hello my friend
// HELLO MY FRIEND 

// const stdin = process.stdin //The stdin property of the process object is a Readable Stream
//   .on("data", (msj) => console.log("teminal input was", msj));
// const stdout = process.stdout
//   .on('data', msj => console.log(msj.toString().toUpperCase()));

// stdin.pipe(stdout);




// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// 3. Use HTTP to cosume a file with a almost 1gb - PART 1
//
// To Generate a file for almost 1GamepadButton, please put in the console 
// > node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

// Output 
// To run this exercise you need to open 2 consoles
// In one of them, you need to run the server > node index.js
// and in the other one put > curl localhost:3000 --output output.big
// the result... It takes some seconds to complete the request and chunks

// import http from 'http'
// import { readFileSync } from 'fs'

// http
//   .createServer((req, res) => {
//     const file = readFileSync("big.file");
//     res.write(file);
//     res.end()
//   })
//   .listen(3000)
//   .on("listening", () => console.log(`server listening on port 3000`));


// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// 3. Use HTTP to cosume a file with a almost 1gb - PART 2
// The result is very similar than the previos (nowdays), however
// the chunks are smaller and has a better performance.

import http from "http";
import { createReadStream, readFileSync } from "fs";

http
  .createServer((req, res) => {
    createReadStream('big.file')
      .pipe(res)
  })
  .listen(3000)
  .on("listening", () => console.log(`server listening on port 3000`));