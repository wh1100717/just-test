// Generated by CoffeeScript 1.7.1
define(function(require, exports, module) {
  'use strict';
  var Engine, Support, UserData;
  Support = require('lib/support');
  Engine = (function() {
    function Engine(type) {
      this.type = type === 2 ? 2 : 1;
      if (!Support.sessionstorage()) {
        if (type === 1) {
          throw new Error("sessionStorage is not supported!");
        }
        if (Support.userdata()) {
          throw new Error("no browser storage engine is supported in your browser!");
        }
        this.type = 2;
      }
      if (this.type === 2 && Support.localstorage()) {
        this.userdata = new UserData();
      }
      return;
    }

    Engine.prototype.key = function(index) {
      if (this.type === 1) {
        return sessionStorage.key(index);
      } else if (Support.localstorage()) {
        return localStorage.key(index);
      } else {
        return this.userdata.key(index);
      }
    };

    Engine.prototype.size = function() {
      if (this.type === 1) {
        return sessionStorage.length;
      } else if (Support.localstorage()) {
        return localStorage.length;
      } else {
        return this.userdata.size();
      }
    };

    Engine.prototype.setItem = function(key, val) {
      if (this.type === 1) {
        return sessionStorage.setItem(key, val);
      } else if (Support.localstorage()) {
        return localStorage.setItem(key, val);
      } else {
        return this.userdata.setItem(key, val);
      }
    };

    Engine.prototype.getItem = function(key) {
      if (this.type === 1) {
        return sessionStorage.getItem(key);
      } else if (Support.localstorage()) {
        return localStorage.getItem(key);
      } else {
        return this.userdata.getItem(key, val);
      }
    };

    Engine.prototype.removeItem = function(key) {
      if (this.type === 1) {
        return sessionStorage.removeItem(key);
      } else if (Support.localstorage()) {
        return localStorage.removeItem(key);
      } else {
        return this.userdata.removeItem(key, val);
      }
    };

    Engine.prototype.usage = function() {

      /*
       *  check it out: http://stackoverflow.com/questions/4391575/how-to-find-the-size-of-localstorage
       */
      var allStrings, key, val;
      allStrings = "";
      if (this.tyep === 1) {
        for (key in sessionStorage) {
          val = sessionStorage[key];
          allStrings += val;
        }
      } else if (Support.localstorage()) {
        for (key in localStorage) {
          val = localStorage[key];
          allStrings += val;
        }
      } else {
        console.log("todo");
      }
      return allStrings.length / 512;
    };

    return Engine;

  })();
  UserData = (function() {

    /* rewrite with coffee from https://github.com/marcuswestin/store.js
    // Since #userData storage applies only to specific paths, we need to
    // somehow link our data to a specific path.  We choose /favicon.ico
    // as a pretty safe option, since all browsers already make a request to
    // this URL anyway and being a 404 will not hurt us here.  We wrap an
    // iframe pointing to the favicon in an ActiveXObject(htmlfile) object
    // (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
    // since the iframe access rules appear to allow direct access and
    // manipulation of the document element, even for a 404 page.  This
    // document can be used instead of the current document (which would
    // have been limited to the current path) to perform #userData storage.
     */
    function UserData() {
      var e, storageContainer;
      try {
        storageContainer = new ActiveXObject('htmlfile');
        storageContainer.open();
        storageContainer.write('<script>document.w=window</script><iframe src="/favicon.ico"></iframe>');
        storageContainer.close();
        this.storageOwner = storageContainer.w.frames[0].document;
        this.storage = this.storageOwner.createElement('div');
      } catch (_error) {
        e = _error;

        /*
        // somehow ActiveXObject instantiation failed (perhaps some special
        // security settings or otherwse), fall back to per-path storage
         */
        this.storage = document.createElement('div');
        this.storageOwner = document.body;
      }
    }

    UserData.prototype.localStorageName = "localStorage";

    UserData.prototype.forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");

    UserData.prototype.ieKeyFix = function(key) {
      return key.replace(/^d/, '___$&').replace(this.forbiddenCharsRegex, '___');
    };

    UserData.prototype.setItem = function(key, val) {
      key = this.ieKeyFix(key);
      this.storageOwner.appendChild(this.storage);
      this.storage.addBehavior("#default#userData");
      this.storage.load(this.localStorageName);
      this.storage.setAttribute(key, val);
      this.storage.save(this.localStorageName);
      return true;
    };

    UserData.prototype.getItem = function(key) {
      key = this.ieKeyFix(key);
      this.storageOwner.appendChild(this.storage);
      this.storage.addBehavior("#default#userData");
      this.storage.load(this.localStorageName);
      return this.storage.getAttribute(key);
    };

    UserData.prototype.removeItem = function(key) {
      key = this.ieKeyFix(key);
      this.storageOwner.appendChild(this.storage);
      this.storage.addBehavior("#default#userData");
      this.storage.load(this.localStorageName);
      this.storage.removeAttribute(key);
      return this.storage.save(this.localStorageName);
    };

    UserData.prototype.size = function() {
      return this.storage.XMLDocument.documentElement.attributes.length;
    };

    UserData.prototype.key = function(index) {
      return this.storage.XMLDocument.documentElement.attributes[index];
    };

    return UserData;

  })();
  return module.exports = Engine;
});
