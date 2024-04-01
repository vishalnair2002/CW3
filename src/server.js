const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());

let db;
const uri = 'mongodb+srv://vishalsunilnair30:Vishal2002@cluster1.mh2vfi9.mongodb.net/';

// Connect to MongoDB
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db('Activities');

    // Middleware to handle collection name parameter
    app.param('collectionName', (req, res, next, collectionName) => {
      req.collection = db.collection(collectionName);
      return next();
    });

    // Default route
    app.get('/', function (req, res) {
      res.send('Select a collection, e.g., /collection/products');
    });

    // Retrieve all documents in a collection
    app.get('/collection/:collectionName', (req, res, next) => {
      req.collection.find({}).toArray((err, results) => {
        if (err) return next(err);
        res.json(results);
      });
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });

    // Start Express server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Express.js server running at localhost:${PORT}`);
    });
  })
  .catch(err => {
    // Handle MongoDB connection error
    console.error('Error connecting to MongoDB:', err.message);
    console.error('Make sure MongoDB is running and the connection URI is correct.');
    process.exit(1);
  });