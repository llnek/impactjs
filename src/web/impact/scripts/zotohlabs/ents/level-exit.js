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
(function (undef) { "use strict"; var global = _ ; var _ = global._ ; //////////////////////
//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
ig.module( 'zotohlabs.ents.level-exit').requires( 'impact.entity',
'impact.game').defines(function () {

  global.EntityLevelexit = ig.Entity.extend({

    collides: ig.Entity.COLLIDES.NEVER,
    checkAgainst: ig.Entity.TYPE.A,
    size: { x: 16, y: 16 },
    _wmScalable: true,
    _wmDrawBox: true,
    _wmBoxColor: 'rgba(196, 0, 255, 0.7)',
    type: ig.Entity.TYPE.NONE,

    check: function (other) {
      if (other instanceof EntityPlayer) {
        ig.game.exitLevel();
      }
    },

    update: function () {
    }

  });

});

//////////////////////////////////////////////////////////////////////////////
// game extension
//////////////////////////////////////////////////////////////////////////////

ig.Game.inject({

  exitLevel: function (data) {
      //console.log("exit level");
  }

});



}).call(this);


