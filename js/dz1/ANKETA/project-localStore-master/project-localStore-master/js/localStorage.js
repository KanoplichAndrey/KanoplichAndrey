	"use strict";

function tLocalStorage(lsKeyName) {
	var self = this;

	self.lsHash = {};

	if (localStorage.getItem(lsKeyName)) {
		if (lsKeyName == "lsDish") {
			var myObject = JSON.parse(localStorage.lsDish);
			self.lsHash = myObject;
		}
		if (lsKeyName == "lsDrink") {
			myObject = JSON.parse(localStorage.lsDrink);
			self.lsHash = myObject;
		}
	}

	self.addValue = function(key, value) {
		self.lsHash[key] = value;
	}

	self.getValue = function(key) {
		if (key in self.lsHash) {
			return self.lsHash[key];
		} else {
			return undefined;
		}
	}

	self.deleteValue = function(key) {
		if (key in self.lsHash) {
			delete self.lsHash[key];
			return true;
		} else {
			return false;
		}
	}

	self.getKeys = function() {
		var keys = [];
		for (var key in self.lsHash) {
			keys.push(" " + key);
		}

		return keys;
	}
		
	self.store = function() {
		// ls - local storage
		localStorage.setItem(lsKeyName, JSON.stringify(self.lsHash));
	}
}