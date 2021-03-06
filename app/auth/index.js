'use strict';
const passport = require('passport');
const config = require('../config');
const logger = require('../logger');
const h = require('../helpers');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
	passport.serializeUser((user, done) => {
         done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		h.findById(id)
		    .then (user => done(null, user))
		    .catch (error => logger.log('error', 'Error while deserializing the user' + error));
	});
	let authProcessor = (accessToken, refreshToken, profile, done) => {
        logger.log('info', 'AUTH PROCESSOR');
        h.findOne(profile.id)
            .then ((result) => {
             	if (result) {
             		done(null, result);
             	}
             	else {
             		h.createNewUser(profile)
             		    .then ((newChatUser) => done(null, newChatUser))
             		    .catch ((error) => logger.log('error', 'Error when creating new user ' + error));
             	}
             });
	};

	passport.use(new FacebookStrategy(config.fb, authProcessor));
}

