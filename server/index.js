require('dotenv').config();
require('newrelic');
const express = require('express');
const compression = require('compression');

const app = express();
app.use(compression());
const PORT = 3000 || process.env.PORT;
const axios = require('axios');
const bodyParser = require('body-parser');
const { cloudinary } = require('./utils/cloudinary')


app.use(express.static('client/dist'));
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());
app.listen(PORT, () => { console.log(`Server listening on port: ${PORT}`); })



//overview backend;
const routerOverview=require('./routerOverview.js');
app.use('/overview',routerOverview);



