const admin = require('firebase-admin');
admin.initializeApp();
const database = admin.database();

module.exports.database = database;