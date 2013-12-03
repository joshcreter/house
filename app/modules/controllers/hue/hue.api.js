/**
 RPC user endpoints
 @module hue
 @class hueApi

 @toc
 1. rpcSearch
 2. rpcRead
 3. rpcUpdate
 4. rpcDelete
 */

'use strict';

var lodash = require('lodash');
var inherits = require('util').inherits;

var dependency = require('../../../dependency.js');
var pathParts = dependency.buildPaths(__dirname, {});

// var Base = require('./base');
// var Base = require('../../../routes/api/base.js');		//can't pass this in since it's used with inherits (which has to be outside the function definition??)
var Base = require(pathParts.routes + 'api/base.js');

var HueMod = require(pathParts.controllers + 'hue/hue.js');

var sampleHueReturn = {
    _id: "objectid",
    email: "string",
    first_name: "string",
    last_name: "string"
};

var defaults = {
    group: 'hue',
    info: 'Hue API',
    namespace: 'Hue'
};

var db;

module.exports = HueApi;

/**
 @param {Object} options
 @param {Object} db
 // @param {Object} Base
 // @param {Object} userMod
 */
function HueApi(options) {
    this.opts = lodash.extend({}, defaults, options || {});
    Base.call(this, this.opts);

    db = this.opts.db;
    // this.userMod = this.opts.userMod;
}

inherits(HueApi, Base);

HueApi.prototype.getRpcMethods = function () {
    return {
        read: this.rpcRead(),
        registerUser: this.rpcRegisterUser(),
        allLightsOn: this.rpcAllLightsOn(),
        allLightsOff: this.rpcAllLightsOff()
    };
};


/**
 @toc 1.
 @method rpcRead
 **/
HueApi.prototype.rpcRead = function () {
    var self = this;

    return {
        info: 'Read one or more hues',
        params: {
        },
        returns: {
            hue: sampleHueReturn
        },

        /*
         _id: { type: 'string', info: "Id for object to lookup. Will be converted to mongo object id if necessary." },
         _ids: { type: 'array', info: "Ids to look up object info on Will be converted to mongo object ids if necessary." },
         fullQuery: { type: 'object', info: "Full mongo query to use directly for read" },
         fields: { type: 'object', info: "Mongo query for which fields in the record to return. Use the empty object {} to get all fields." },
         query: { type: 'object', info: "Additional query for lookup (will be added to the id(s) query)." }

         */
        /**
         @method action
         @param {Object} params
         @param {Object} data new user params (detailed above)
         @param {Object} out callback object which provides `win` and `fail` functions for handling `success` and `fail` callbacks
         @param {Function} win Success callback
         @param {Function} fail Fail callback
         **/
        action: function (params, out) {

            var promise = HueMod.read(db, params, {});
            promise.then(function (ret1) {
                //strip out some fields (i.e. password)
//				if(ret1.result !==undefined) {
//					ret1.result =UserMod.readFilter(ret1.result, {type:'full'});		//only return certain fields (i.e strip out password)
//				}
//				else if(ret1.results !==undefined) {
//					var ii;
//					for(ii =0; ii<ret1.results.length; ii++) {
//						ret1.results[ii] =UserMod.readFilter(ret1.results[ii], {type:'full'});		//only return certain fields (i.e strip out password)
//					}
//				}
                out.win(ret1);
            }, function (err) {
                self.handleError(out, err, {});
            });
        }
    };
};

HueApi.prototype.rpcRegisterUser = function () {
    var self = this;

    return {
        info: 'Create a Hue user',
        params: {
        },
        returns: {
            hue: sampleHueReturn
        },

        action: function (params, out) {
            var promise = HueMod.registerUser(db, params, {});
            promise.then(function (ret1) {
                //strip out some fields (i.e. password)
//				if(ret1.result !==undefined) {
//					ret1.result =UserMod.readFilter(ret1.result, {type:'full'});		//only return certain fields (i.e strip out password)
//				}
//				else if(ret1.results !==undefined) {
//					var ii;
//					for(ii =0; ii<ret1.results.length; ii++) {
//						ret1.results[ii] =UserMod.readFilter(ret1.results[ii], {type:'full'});		//only return certain fields (i.e strip out password)
//					}
//				}
                out.win(ret1);
            }, function (err) {
                self.handleError(out, err, {});
            });
//            HueMod.registerUser(db, params, {});
        }
    };
};


HueApi.prototype.rpcAllLightsOn = function () {
    var self = this;

    return {
        info: 'Set lights',
        params: {
        },
        returns: {
            hue: sampleHueReturn
        },

        action: function (params, out) {
            var promise = HueMod.allLightsOn(db, params, {});
            promise.then(function (ret1) {
                out.win(ret1);
            }, function (err) {
                self.handleError(out, err, {});
            });
//            HueMod.setLight(db, params, {});
        }
    };
};

HueApi.prototype.rpcAllLightsOff = function () {
    var self = this;

    return {
        info: 'Set lights',
        params: {
        },
        returns: {
            hue: sampleHueReturn
        },

        action: function (params, out) {
            var promise = HueMod.allLightsOff(db, params, {});
            promise.then(function (ret1) {
                out.win(ret1);
            }, function (err) {
                self.handleError(out, err, {});
            });
//            HueMod.setLight(db, params, {});
        }
    };
};