const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

const pg = require('pg');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/demoapp';

if (process.env.DATABASE_URL !== undefined) {
  pg.defaults.ssl = true;
}

const client = new pg.Client(connectionString);
client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
});

// API calls

let propertyTable = 'property__c';
let favoriteTable = 'favorite__c';
let brokerTable = 'broker__c';

// setup the demo data if needed
client.query('SELECT * FROM salesforce.broker__c', function(error, data) {
  if (error !== null) {
    client.query('SELECT * FROM broker__c', function(error, data) {
      if (error !== null) {
        console.log('Loading Demo Data...');
        require('./db/demo.js')(client);
        console.log('Done Loading Demo Data!');
      }
    });
  }
  else {
    const schema = 'salesforce.';
    propertyTable = schema + 'property__c';
    favoriteTable = schema + 'favorite__c';
    brokerTable = schema + 'broker__c';
  }
});


app.get('/properties', function(req, res) {
  client.query('SELECT * FROM ' + propertyTable, function(error, data) {
    res.send({ payload: data.rows });
  });
});

app.get('/properties/:id', function(req, res) {
  client.query('SELECT ' + propertyTable + '.*, ' + brokerTable + '.sfid AS broker__c_sfid, ' + brokerTable + '.name AS broker__c_name, ' + brokerTable + '.email__c AS broker__c_email__c, ' + brokerTable + '.phone__c AS broker__c_phone__c, ' + brokerTable + '.mobile_phone__c AS broker__c_mobile_phone__c, ' + brokerTable + '.title__c AS broker__c_title__c, ' + brokerTable + '.picture__c AS broker__c_picture__c FROM ' + propertyTable + ' INNER JOIN ' + brokerTable + ' ON ' + propertyTable + '.broker__c = ' + brokerTable + '.sfid WHERE ' + propertyTable + '.sfid = $1', [req.params.id], function(error, data) {
    res.json({ payload: data.rows[0] });
  });
});

// production build
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));
