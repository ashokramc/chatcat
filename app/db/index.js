'use strict';
const config = require('../config');
const logger = require('../logger');
const mongoose = require('mongoose');
const Mongoose = mongoose.connect(config.dbURI,{
	useNewUrlParser:true,
	dbName:'myclass'
}).catch(error => {
	logger.log('error', 'MongoDb Initial Error ' + error);
})
mongoose.connection.on('error', (error) => {
	logger.log('error', 'MongoDb Error ' + error);
});

const chatUser = new mongoose.Schema({
	profileId: String,
	fullName: String,
	profilePic: String
});
let userModel = mongoose.model('chatUser', chatUser);

module.exports = {
	'Mongoose' : Mongoose,
	'userModel' : userModel
}

