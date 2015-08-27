// This library is distributed in  the hope that it will be useful but without
// any  warranty; without  even  the  implied  warranty of  merchantability or
// fitness for a particular purpose.
// The use and distribution terms for this software are covered by the Eclipse
// Public License 1.0  (http://opensource.org/licenses/eclipse-1.0.php)  which
// can be found in the file epl-v10.html at the root of this distribution.
// By using this software in any  fashion, you are agreeing to be bound by the
// terms of this license. You  must not remove this notice, or any other, from
// this software.
// Copyright (c) 2013 Cherimoia, LLC. All rights reserved.

(function(undef) { "use strict"; var global = this ; var _ = global._ ;
var asterix = global.ZotohLabs.Asterix;
var negax= global.ZotohLabs.NegaMax;
var klass= global.ZotohLabs.klass;
var loggr= global.ZotohLabs.logger;

//var O_CLR = '#8ADE35';
//var X_CLR = '#F59631';

var Player = klass.extends({

  takeTurn: function() { throw new Error("Abstract call"); },

  isRobot: function() { return !this.isHuman(); },

  isHuman: function() { return this.human; },

  getColor: function() { return this.picColor; },

  getPic: function() { return this.pic; },

  isValue: function(n) { return this.value === n; },

  getValue: function() { return this.value; },

  setBoard: function(b) { this.board=b; },

  init: function(value, human, pic, picColor) {
    this.picColor = picColor;
    this.pic = pic;
    this.value = value;
    this.human = human;
  }

});

var Robot = Player.extends({

  isMax: function() { return true; },

  init: function(idv, pic, color) {
    this.parent(idv, false, pic, color);
  }

});


asterix.TicTacToe.Human = Player.extends({

  isMax: function() { return false; },
  takeTurn: function() {},
  init: function (idv, pic, color) {
    this.parent(idv, true, pic, color);
  }

});

asterix.TicTacToe.AlgoBot = Robot.extends({

  takeTurn: function() {
    return this.mmAlgo.eval();
  },

  setBoard: function(b) {
    this.parent(b);
    this.mmAlgo = new negax.Algo(b);
  },

  init: function ( idv, pic, color) {
    this.parent( idv, pic, color);
    this.mmAlgo= null;
  }

});



}).call(this);


