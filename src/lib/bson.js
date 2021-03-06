// Generated by CoffeeScript 1.7.1
define(function(require, exports, module) {
  var BinaryParser, MACHINE_ID, ObjectID, checkForHexRegExp, hexTable, i;
  BinaryParser = require('lib/binary-parser');
  hexTable = (function() {
    var _i, _results;
    _results = [];
    for (i = _i = 0; _i < 256; i = ++_i) {
      _results.push((i <= 15 ? '0' : '') + i.toString(16));
    }
    return _results;
  })();
  MACHINE_ID = parseInt(Math.random() * 0xFFFFFF, 10);
  checkForHexRegExp = /^[0-9a-fA-F]{24}$/;
  ObjectID = function(id, _hex) {
    this._bsontype = 'ObjectID';
    if ((id != null) && id.length !== 12 && id.length !== 24) {
      throw new Error("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
    }
    if (id == null) {
      return this.id = this.generate();
    } else if ((id != null) && id.length === 12) {
      return this.id = id;
    } else if (checkForHexRegExp.test(id)) {
      return ObjectID.createFromHexString(id);
    } else {
      throw new Error("Value passed in is not a valid 24 character hex string");
    }
  };
  ObjectID.prototype.generate = function() {
    var index3Bytes, machine3Bytes, pid2Bytes, time4Bytes, unixTime;
    unixTime = parseInt(Date.now() / 1000, 10);
    time4Bytes = BinaryParser.encodeInt(unixTime, 32, true, true);
    machine3Bytes = BinaryParser.encodeInt(MACHINE_ID, 24, false);
    pid2Bytes = BinaryParser.fromShort(typeof process === 'undefined' ? Math.floor(Math.random() * 100000) : process.pid);
    index3Bytes = BinaryParser.encodeInt(this.get_inc(), 24, false, true);
    return time4Bytes + machine3Bytes + pid2Bytes + index3Bytes;
  };
  ObjectID.prototype.toHexString = function() {
    var hexString, _i, _ref;
    hexString = '';
    for (i = _i = 0, _ref = this.id.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      hexString += hexTable[this.id.charCodeAt(i)];
    }
    return hexString;
  };
  ObjectID.prototype.toString = function() {
    return this.toHexString();
  };
  ObjectID.prototype.inspect = ObjectID.prototype.toString;
  ObjectID.prototype.getTime = function() {
    return Math.floor(BinaryParser.decodeInt(this.id.substring(0, 4), 32, true, true)) * 1000;
  };
  ObjectID.prototype.getTimestamp = function() {
    var timestamp;
    timestamp = new Date();
    timestamp.setTime(this.getTime());
    return timestamp;
  };
  ObjectID.prototype.get_inc = function() {
    return ObjectID.index = (ObjectID.index + 1) % 0xFFFFFF;
  };
  ObjectID.index = parseInt(Math.random() * 0xFFFFFF, 10);
  ObjectID.createFromHexString = function(hexString) {
    var result, _i;
    result = '';
    for (i = _i = 0; _i < 24; i = ++_i) {
      if (i % 2 === 0) {
        result += BinaryParser.fromByte(parseInt(hexString.substr(i, 2), 16));
      }
    }
    return new ObjectID(result, hexString);
  };
  return module.exports = ObjectID;
});
