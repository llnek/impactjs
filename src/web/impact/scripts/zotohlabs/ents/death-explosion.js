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
(function (undef) { "use strict"; var global = this;  var _ = global._ ; ////////////////////////
//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
ig.module( 'zotohlabs.ents.death-explosion').requires( 'impact.entity').defines(function () {

  global.EntityDeathExplosion = ig.Entity.extend({

    _wmIgnore: true,
    delay:1,
    callBack:null,
    particles:25,

    update: function () {
      if (this.idleTimer.delta() > this.delay) {
        this.kill();
        if (this.callBack) { this.callBack(); }
      }
    },

    init: function (x, y, settings) {
      this.parent(x, y, settings);
      _.each(_.range(this.particles),function(n) {
        ig.game.spawnEntity(EntityDeathExplosionParticle, x, y,
          { colorOffset: settings.colorOffset ? settings.colorOffset : 0});
      });
      this.idleTimer = new ig.Timer();
    }

  });

  global.EntityDeathExplosionParticle = ig.Entity.extend({
    collides:ig.Entity.COLLIDES.NONE,
    _wmIgnore: true,
    size:{x:2, y:2},
    maxVel:{x:160, y:200},
    delay:1,
    fadetime:1,
    bounciness:0,
    vel:{x:100, y:30},
    friction:{x:100, y:0},
    colorOffset:0,
    totalColors:7,
    baseVelocity:{x:2, y:2},
    animSheet:new ig.AnimationSheet('media/main/game/blood.png', 2, 2),

    update: function () {
      if (this.idleTimer.delta() > this.delay) {
        this.kill();
        return;
      }
      this.currentAnim.alpha = this.idleTimer.delta().map(
          this.delay - this.fadetime, this.delay,
          1, 0
      );
      this.parent();
    },

    init: function (x, y, settings) {
      this.parent(x, y, settings);
      var frameID = Math.round(Math.random() * this.totalColors) + (this.colorOffset * (this.totalColors + 1));
      this.addAnim('idle', 0.2, [frameID]);
      this.vel.x = (Math.random() * this.baseVelocity.x - 1) * this.vel.x;
      this.vel.y = (Math.random() * this.baseVelocity.y - 1) * this.vel.y;
      this.idleTimer = new ig.Timer();
    }

  });

});


}).call(this);


