// Generated by CoffeeScript 1.7.1
define(function(require, exports, module) {
  "use strict";
  var Collection, LocalDB;
  LocalDB = require("localdb");
  Collection = require("lib/collection");
  return describe("LocalDB", function() {
    var db;
    it("LocalStorage Support", function() {
      return expect(LocalDB.support().localStorage).toEqual(true);
    });
    it("SessionStorage Support", function() {
      return expect(LocalDB.support().sessionStorage).toEqual(true);
    });
    it("IndexedDB Support", function() {
      if (navigator.userAgent.toLowerCase().indexOf("mozilla") !== -1) {
        return expect(LocalDB.support().indexedDB).toEqual(false);
      } else {
        return expect(LocalDB.support().indexedDB).toEqual(true);
      }
    });
    it("wrong usage", function() {
      var db, e;
      try {
        return db = new LocalDB();
      } catch (_error) {
        e = _error;
        return expect(e.message).toEqual("dbName should be specified.");
      }
    });
    db = new LocalDB('foo', {
      type: 2
    });
    it("new LocalDB", function() {
      return expect(db instanceof LocalDB).toEqual(true);
    });
    it("options", function() {
      var options;
      options = db.options();
      expect(options).toBeDefined();
      expect(options.name).toEqual("foo");
      return expect(options.type).toEqual(2);
    });
    it("collection", function() {
      var collection;
      collection = db.collection("bar");
      collection.insert({
        a: 1
      });
      return expect(collection instanceof Collection).toEqual(true);
    });
    it("collections", function() {
      var collections;
      collections = db.collections();
      console.log(db.ls.size());
      console.log(db.collections());
      return expect(collections).toEqual(["bar"]);
    });
    it("drop collection", function() {
      var collections;
      db.drop("bar");
      collections = db.collections();
      return expect(collections).toEqual([]);
    });
    it("drop db", function() {
      var bar1, bar2, collections;
      bar1 = db.collection("bar1");
      bar2 = db.collection("bar2");
      bar1.insert({
        a: 1
      });
      bar2.insert({
        b: 2
      });
      db.drop();
      collections = db.collections();
      return expect(collections).toEqual([]);
    });
    it("timestamp", function() {
      expect(LocalDB.getTimestamp("543509d5f3692b00001b2b61")).toBeDefined();
      return expect(LocalDB.getTime("543509d5f3692b00001b2b61")).toEqual(1412762069000);
    });
    return it("window.LocalDB", function() {
      return expect(typeof window.LocalDB).toBe("undefined");
    });
  });
});
