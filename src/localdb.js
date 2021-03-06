// Generated by CoffeeScript 1.7.1
define(function(require, exports, module) {
  'use strict';
  var Collection, Engine, LocalDB, Utils, dbPrefix;
  Utils = require('lib/utils');
  Collection = require('lib/collection');
  Engine = require('lib/engine');
  dbPrefix = "ldb_";
  LocalDB = (function() {

    /*
     *  Constructor
     *  var db = new LocalDB('foo')
     *  var db = new LocalDB('foo', {type: 1})
     *  var db = new LocalDB('foo', {type: 2})
     *
     *  Engine will decide to choose the best waty to handle the data automatically.
     *  when type is 1, the data will be alive while browser stay open. e.g. sessionStorage
     *  when type is 2, the data will be alive even after browser is closed. e.g. localStorage
     *  1 by default
     */
    function LocalDB(dbName, options) {
      if (options == null) {
        options = {};
      }
      if (dbName === void 0) {
        throw new Error("dbName should be specified.");
      }
      this.name = dbPrefix + dbName;
      this.ls = new Engine(options.type || 1);
    }

    LocalDB.prototype.options = function() {
      return {
        name: this.name.substr(dbPrefix.length),
        type: this.ls.type
      };
    };


    /*
     *  Get Collection Names
     *  db.collections()    //['foo','foo1','foo2','foo3',....]
     */

    LocalDB.prototype.collections = function() {
      var i, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.ls.size(); 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (this.ls.key(i).indexOf("" + this.name + "_") === 0) {
          _results.push(this.ls.key(i).substr(("" + this.name + "_").length));
        }
      }
      return _results;
    };


    /*
     *  Get Collection
     *  var collection = db.collection('bar')
     */

    LocalDB.prototype.collection = function(collectionName) {
      return new Collection(collectionName, this);
    };


    /*
     *  Delete Collection: db.drop(collectionName)
     *  Delete DB: db.drop()
     */

    LocalDB.prototype.drop = function(collectionName) {
      var i, j, keys, _i, _len;
      collectionName = collectionName != null ? "_" + collectionName : "";
      keys = (function() {
        var _i, _ref, _results;
        _results = [];
        for (i = _i = 0, _ref = this.ls.size(); 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          if (this.ls.key(i).indexOf(this.name + collectionName) === 0) {
            _results.push(this.ls.key(i));
          }
        }
        return _results;
      }).call(this);
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        j = keys[_i];
        this.ls.removeItem(j);
      }
      return true;
    };

    return LocalDB;

  })();

  /*
   *  Check Browser Compatibility
   *  use LocalDB.isSupport() to check whether the browser support LocalDB or not.
   */
  LocalDB.support = function() {
    return {
      localStorage: typeof localStorage !== "undefined" && localStorage !== null ? true : false,
      sessionStorage: typeof sessionStorage !== "undefined" && sessionStorage !== null ? true : false,
      indexedDB: false
    };
  };

  /*
   *  Get Timestamp
   *  Convert ObjectId to timestamp
   */
  LocalDB.getTimestamp = function(objectId) {
    return Utils.getTimestamp(objectId);
  };

  /*
   *  Get Time
   *  Convert ObjectId to time
   */
  LocalDB.getTime = function(objectId) {
    return Utils.getTime(objectId);
  };
  return module.exports = LocalDB;
});
