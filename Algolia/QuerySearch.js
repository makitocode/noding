'use strict'
'use strict'
/* *******
Dependencies
* *******/
//Lib for algolia
const algoliasearch = require('algoliasearch');

/* *******
Initialize
* *******/
//load env file
dotenv.load();
//load algolia
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
//*************************************** Biz Logic *********************************/
//************************************************************************************
