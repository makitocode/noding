'use strict'

//Algolia search lib
const algoliasearch = require('algoliasearch');
//Initialice algolia
const algolia = algoliasearch('appid','appkey');

//Initialize Algolia index
const index = algolia.initIndex("getstarted_actors");
var usersJSON = require('./user.json');

//Sent object to Algolia
index.addObjects(usersJSON, function(err, content) {
    if (err)
      console.error(`Error: ${err}`);
    console.log(`Datos enviados a algolia correctamente. ${content}`);
  });

//Search word in object documment
// firstname
index.search('cath', function(err, content) {
  console.log(content.hits);
});

//FIlters by Category
// index.search({
//   query: '',
//   facets: ['category', 'author'],
//   facetingAfterDistinct: true
// }).then(res => {
//   console.log(res);
// });