/**
 NOTE: search for 'site-specific' in this file to see the site-specific stuff in here (i.e. for fillInfo for adding in other data to the user object for one time / initial returns for performance reasons).

 User module representing the end-users of the system
 @module hue
 @class hue

 @toc
 1. readFilter
 1.5. fillInfo        //site-specific
 1.52.fillFollow
 2. search
 3. update
 4. delete1
 5. read
 6. searchByEmail
 7. searchByPhone
 9. fixPhoneFormat
 */

'use strict';

var Q = require('q');
var lodash = require('lodash');
var async = require('async');

var dependency = require('../../../dependency.js');
var pathParts = dependency.buildPaths(__dirname, {});

var StringMod = require(pathParts.services + 'string/string.js');
var MongoDBMod = require(pathParts.services + 'mongodb/mongodb.js');
var CrudMod = require(pathParts.services + 'crud/crud.js');
var LookupMod = require(pathParts.services + 'lookup/lookup.js');
var LookupMod = require(pathParts.services + 'lookup/lookup.js');

var hueUserId = "3e639e243e11468f37f4c24c1c9a7817";
var hostname = "192.168.0.196";

// var TextMod =require(pathParts.services+'texter/index.js');		//TESTING SMS

var self;

var defaults = {
    // searchFields: ['email', 'first_name', 'last_name'],
    // sort: {
    // first_name: 1,
    // last_name:  1
    // },
    // page: {
    // skip:       0,
    // limit:      25,
    // maxLimit:   51
    // },
    // resetTokenLength: 6,
    // resetTokenChars: 'alphanumeric'
};
//var readFilter = {
//    'public': {
//		'include':['_id', 'email', 'first_name', 'last_name', 'phone']
//	},
//	'login': {
//		'include':['_id', 'email', 'first_name', 'last_name', 'sess_id', 'phone']
//	},
//	'full': {
//		'omit':['password', 'password_reset_key', 'password_salt']
//	}
//};
/**
 Hue module constructor
 @class Hue
 @constructor
 @param options {Object} constructor options
 **/
function Hue(options) {
    this.opts = lodash.merge({}, defaults, options || {});

    self = this;
}

/**
 Reads one or more users
 @toc 5.
 @method read
 @param {Object} data One of '_id' or '_ids' or 'fullQuery' is required
 @param {String} [_id] Id for object to lookup. Will be converted to mongo object id if necessary.
 @param {Array} [_ids] Ids to look up object info on Will be converted to mongo object ids if necessary.
 @param {Object} [fullQuery] Full mongo query to use directly for read
 @param {Array} [fields ={'_id':1, 'first_name':1, 'last_name':1}] Mongo query for which fields in the record to return. Use the empty object {} to get all fields.
 @example {'_id':1, 'first_name':1, 'last_name':1}
 @param {Object} [query] Additional query for lookup (will be added to the id(s) query).
 @param {Object} params
 @return {Promise}
 @param {Object} user (or users)
 **/
Hue.prototype.read = function (db, data, params) {
    var deferred = Q.defer();
    var ret = {code: 0, msg: 'User.read '};

    var ppSend = {
        'collection': 'hue'
    };
//	if(data._ids !==undefined) {		//for bulk read, return less info
//		ppSend.defaults = {
//			'fields':{'_id':1, 'first_name':1, 'last_name':1}
//		};
//	}
//	else if(data.fields !== undefined)
//	{
//		ppSend.defaults =
//		{
//			'fields': data.fields
//		};
//	}
//	else
//	{
    ppSend.defaults =
    {
        'fields': {}
    };
//	}
//	CrudMod.read(db, data, ppSend, function(err, ret1) {
//		/*
//		//TESTING SMS
//		if(ret1.result && ret1.result.phone) {
//			TextMod.send({textParams: {to: ret1.result.phone.number, text:'Test Text!'} });
//		}
//		//end: TESTING SMS
//		*/
//


    var displayBridges = function (bridge) {
        console.log("Hue Bridges Found: " + JSON.stringify(bridge));
        //      return("Hue Bridges Found: " + bridge);
        deferred.resolve("Hue Bridges Found: " + bridge);

    };

    // --------------------------
    // Using a promise
//            hue.locateBridges().then(displayBridges).done();

//    HueApi.locateBridges(function(err, result) {
//        if (err) throw err;
//        displayBridges(result);
//    });
    var HueApi = require("node-hue-api");

//    HueApi.searchForBridges(2000).then(displayBridges).done();
    HueApi.locateBridges().then(displayBridges).done();

//    deferred.resolve(ret1);
//	});

    return deferred.promise;
};

Hue.prototype.registerUser = function (db, data, params) {
    var deferred = Q.defer();
    var ret = {code: 0, msg: 'User.read '};

    var ppSend = {
        'collection': 'hue'
    };

    ppSend.defaults =
    {
        'fields': {}
    };


    var newUserName = null,
        userDescription = "device description goes here";

    var displayUserResult = function (result) {
        console.log("Created user: " + JSON.stringify(result));
        deferred.resolve("Created user: " + result);

    };

    var displayError = function (err) {
        console.log(err);
    };

    var HueApi = require("node-hue-api").HueApi;
    var hueApiInstance = new HueApi();

    hueApiInstance.registerUser(hostname, newUserName, userDescription)
        .then(displayUserResult)
        .fail(displayUserResult)
        .done();

    return deferred.promise;
};




Hue.prototype.allLightsOn = function (db, data, params) {
    var deferred = Q.defer();
    var ret = {code: 0, msg: 'User.read '};

    var ppSend = {
        'collection': 'hue'
    };

    ppSend.defaults =
    {
        'fields': {}
    };

    var hueRequire = require("node-hue-api");
    var hueApi = hueRequire.HueApi;
    var hueApiInstance = new hueApi(hostname, hueUserId);
    var hueLightState = hueRequire.lightState;

    var displayResult = function (result) {
        console.log("Created user: " + JSON.stringify(result));
        deferred.resolve("Created user: " + result);

    };

// Set light state to 'on' with warm white value of 500 and brightness set to 100%
    var state = hueLightState.create().on().white(500, 100);

// --------------------------
// Using a promise
    hueApiInstance.setLightState(1, state);
    hueApiInstance.setLightState(2, state);
    hueApiInstance.setLightState(3, state);
    hueApiInstance.setLightState(4, state);
    hueApiInstance.setLightState(5, state);
    hueApiInstance.setLightState(6, state)
        .then(displayResult)
        .done();

    return deferred.promise;
};


Hue.prototype.allLightsOff = function (db, data, params) {
    var deferred = Q.defer();
    var ret = {code: 0, msg: 'User.read '};

    var ppSend = {
        'collection': 'hue'
    };

    ppSend.defaults =
    {
        'fields': {}
    };

    var hueRequire = require("node-hue-api");
    var hueApi = hueRequire.HueApi;
    var hueApiInstance = new hueApi(hostname, hueUserId);
    var hueLightState = hueRequire.lightState;

    var displayResult = function (result) {
        console.log("Created user: " + JSON.stringify(result));
        deferred.resolve("Created user: " + result);

    };

// Set light state to 'on' with warm white value of 500 and brightness set to 100%
    var state = hueLightState.create().on().white(500, 10);

    hueApiInstance.setLightState(1, state);
    hueApiInstance.setLightState(2, state);
    hueApiInstance.setLightState(3, state);
    hueApiInstance.setLightState(4, state);
    hueApiInstance.setLightState(5, state);
    hueApiInstance.setLightState(6, state)
        .then(displayResult)
        .done();

    return deferred.promise;
};



/**
 Module exports
 @method exports
 @return {User} User constructor
 **/
module.exports = new Hue({});