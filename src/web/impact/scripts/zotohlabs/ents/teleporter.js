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
(function (undef) { "use strict"; var global = this; _ = global._ ; ////////////////////////

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
ig.module('zotohlabs.ents.teleporter').requires( 'impact.entity').defines(function () {

  global.EntityTeleporter = ig.Entity.extend({

    _wmBoxColor:'rgba(128, 28, 230, 0.7)',
    _wmIgnore: false,
    _wmDrawBox:true,
    _wmScalable:true,

    checkAgainst:ig.Entity.TYPE.A,
    size:{x:16, y:16},

    target:null,
    targets:[],
    debug: false,

    check: function (other) {
      var newTarget = ig.game.getEntityByName(this.targets.random());
      if (newTarget) {
        this.onTeleport(other, newTarget.pos.x, newTarget.pos.y);
      }
    },

    onTeleport: function(target, x, y) {
      target.pos.x = x;
      target.pos.y = y;
    },

    draw: function() {
      if (this.debug) {
        ig.system.context.fillStyle = 'rgba(255,0,255,0.3)';
        ig.system.context.fillRect(ig.system.getDrawPos(this.pos.x.round() - ig.game.screen.x),
            ig.system.getDrawPos(this.pos.y.round() - ig.game.screen.y),
            this.size.x * ig.system.scale,
            this.size.y * ig.system.scale);
      }
    },

    init:function (x, y, settings) {
      this.parent(x, y, settings);
      this.targets = ig.ksort(this.target);
    }

  });

});


}).call(this);


