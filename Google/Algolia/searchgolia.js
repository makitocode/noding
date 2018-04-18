'use strict'

//Algolia search lib
const algoliasearch = require('algoliasearch');
//Initialice algolia
const algolia = algoliasearch('appId','appkey');

//Initialize Algolia index
const index = algolia.initIndex("user");
var usersJSON = require('./user.json');

//Sent object to Algolia
index.addObjects(usersJSON, function(err, content) {
    if (err)
      console.error(`Error: ${err}`);
    console.log(`Datos enviados a algolia correctamente. ${content}`);
  });



