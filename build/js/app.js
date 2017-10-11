(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _rpg = require('./../js/rpg.js');

},{"./../js/rpg.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Character = exports.Character = function () {
  function Character(chrType) {
    _classCallCheck(this, Character);

    this.chrType = chrType;
    this.strength = 1;
    this.intellect = 1;
    this.dexterity = 1;
    this.stamina = 3;
    this.level = 1;
    this.hitPoints = this.stamina * 3;
    this.equippedWeapon;
    this.equippedArmor;
    this.experience = 0;
    this.expBar = 500;

    if (chrType == "warrior") {
      this.strength += 2;
    } else if (chrType == "mage") {
      this.intellect += 2;
    } else {
      this.dexterity += 2;
    }
  }

  _createClass(Character, [{
    key: "readChrType",
    value: function readChrType() {
      return self.chrType;
    }
  }, {
    key: "cast",
    value: function cast(target) {
      var attackPower = this.intellect;
      if (this.equippedWeapon != null) {
        attackPower += this.equippedWeapon.bonus;
      }
      target.receive(attackPower);
    }
  }, {
    key: "strike",
    value: function strike(target) {
      var attackPower = this.strength;
      if (this.equippedWeapon != null) {
        attackPower += this.equippedWeapon.bonus;
      }
      target.receive(attackPower);
    }
  }, {
    key: "sneak",
    value: function sneak(target) {
      var attackPower = this.dexterity;
      if (this.equippedWeapon != null) {
        attackPower += this.equippedWeapon.bonus;
      }
      target.receive(attackPower);
    }
  }, {
    key: "receive",
    value: function receive(damage) {
      if (this.equippedArmor != null) {
        damage -= this.equippedArmor.bonus;
      }
      this.hitPoints -= damage;
    }
  }, {
    key: "heal",
    value: function heal() {
      this.hitPoints = this.stamina * 3;
    }
  }, {
    key: "experience",
    value: function experience() {
      this.experience += 250;
      if (this.experience >= this.expBar) {
        self.levelUp;
      }
    }
  }, {
    key: "levelUp",
    value: function levelUp() {
      this.level += 1;
      this.stamina += 2;
      this.strength += 1;
      this.intellect += 1;
      this.dexterity += 1;
      if (chrType == "warrior") {
        this.strength += 1;
      } else if (chrType == "mage") {
        this.intellect += 1;
      } else {
        this.dexterity += 1;
      }
      this.expBar += 750;
      this.experience = 0;
    }
  }]);

  return Character;
}();

},{}]},{},[1]);
