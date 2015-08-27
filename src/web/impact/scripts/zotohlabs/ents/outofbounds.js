//
// Copyright (c) 2013 Cherimoia, LLC. All rights reserved.
//
// This library is distributed in the hope that it will be useful
// but without any warranty; without even the implied warranty of
// merchantability or fitness for a particular purpose.
//
// The use and distribution terms for this software are covered by the
// Eclipse Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
// which can be found in the file epl-v10.html at the root of this distribution.
//
// By using this software in any fashion, you are agreeing to be bound by
// the terms of this license.
// You must not remove this notice, or any other, from this software.
//
(function (undef) { "use strict";  var global = this; var _ = global._ ; ////////////////////////
//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
ig.module( 'zotohlabs.ents.outofbounds').requires( 'impact.entity').defines(function () {

  global.EntityOutofbounds = ig.Entity.extend({

    collides:ig.Entity.COLLIDES.NEVER,
    checkAgainst:ig.Entity.TYPE.BOTH,
    type:ig.Entity.TYPE.NONE,
    size:{x:16, y:16},
    _wmScalable:true,
    _wmDrawBox:true,
    _wmBoxColor:'rgba(196, 255, 0, 0.7)',

    check: function (other) {
      if (other.outOfBounds) { other.outOfBounds(); }
    },

    update: function () {
    },

    init: function (x, y, settings) {
      if (settings.checks) {
        this.checkAgainst = ig.Entity.TYPE[ settings.checks.toUpperCase() ] ||
                            ig.Entity.TYPE.A;
        delete settings.check;
      }
      this.parent(x, y, settings);
    }

  });

});

//////////////////////////////////////////////////////////////////////////////
// game extension
//////////////////////////////////////////////////////////////////////////////
//TODO make sure this didn't break anything in the base actor class
ig.Entity.inject({

  outOfBounds: function() {
      this.kill();
  }

});




}).call(this);



