"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var card_1 = require("./card");
var fs_1 = require("fs");
var path = require('path');
var Cards = /** @class */ (function () {
    function Cards() {
        this._easyCards = Cards._loadCards('easy');
        this._hardCards = Cards._loadCards('hard');
    }
    Object.defineProperty(Cards.prototype, "easyCards", {
        get: function () {
            return Cards._shuffleCards(this._easyCards);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cards.prototype, "hardCards", {
        get: function () {
            return Cards._shuffleCards(this._hardCards);
        },
        enumerable: true,
        configurable: true
    });
    Cards._loadCards = function (fileName) {
        var data = fs_1["default"].readFileSync(this._filePrefix + fileName + '.md', 'utf8');
        var cardData = data
            .split('\n**')
            .map(function (str) { return str.split('\n').filter(function (str) { return str.length > 0; }); });
        return cardData.map(function (data) {
            var secretWord = data.shift();
            secretWord = secretWord.substring(0, secretWord.indexOf('**'));
            return new card_1["default"](secretWord, data);
        });
    };
    Cards._shuffleCards = function (cards) {
        // Duplicate the cards.
        cards = __spreadArrays(cards);
        // Shuffle.
        for (var index = 0; index < cards.length; index++) {
            var randomIndex = Math.floor(Math.random() * (cards.length - index));
            // Swap cards with current index and random index.
            var tempCard = cards[index];
            cards[index] = cards[randomIndex];
            cards[randomIndex] = tempCard;
        }
        return cards;
    };
    Cards._filePrefix = path.join(__dirname, '../../src/data/');
    return Cards;
}());
var cards = new Cards();
exports["default"] = cards;
