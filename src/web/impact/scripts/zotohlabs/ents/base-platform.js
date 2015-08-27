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
(function (undef) { "use strict"; var global = this; var _ = global._ ; /////////////////////////
//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
ig.module( 'zotohlabs.ents.base-platform').requires( 'impact.entity',
'impact.sound' ).defines(function () {

  global.EntityBasePlatform = ig.Entity.extend({
    /*animSheet:new ig.AnimationSheet('media/bootstrap/images/elevator.png', 32, 10),
            size:{x:32, y:10},*/
    checkAgainst:  ig.Entity.TYPE.BOTH,
    collides:ig.Entity.COLLIDES.FIXED,
    _wmIgnore: true,
    type:ig.Entity.TYPE.B,
    target:null,
    targets:[],
    currentTarget:0,
    speed:20,
    gravityFactor:0,
    delay:1,
    delayTimer:null,
    angle:0,

    update: function () {
      if (this.targets.length === 0) { this.parent(); return; }
      if (this.delayTimer.delta() > this.delay) {
        var oldDistance = 0;
        var target = ig.game.getEntityByName(this.targets[this.currentTarget]);
        if (target) {
          oldDistance = this.distanceTo(target);
          this.angle = this.angleTo(target);
          this.vel.x = Math.cos(this.angle) * this.speed;
          this.vel.y = Math.sin(this.angle) * this.speed;
        } else {
          this.vel.x = 0;
          this.vel.y = 0;
        }
        this.parent();
        var newDistance = this.distanceTo(target);
        if (target && (newDistance > oldDistance || newDistance < 0.5)) {
          this.angle = 0;
          this.pos.x = target.pos.x + target.size.x / 2 - this.size.x / 2;
          this.pos.y = target.pos.y + target.size.y / 2 - this.size.y / 2;
          ++this.currentTarget;
          if (this.currentTarget >= this.targets.length && this.targets.length > 1) {
            this.currentTarget = 1;
            this.targets.reverse();
          }
          this.onReachTarget();
        }
      }
    },

    onReachTarget: function () {
      this.vel.y = 0;
      this.delayTimer.set(this.delay);
    },

    receiveDamage: function (amount, from) {
    },

    init:function (x, y, settings) {
      //TODO setup graphic
      this.parent(x, y, settings);
      this.targets = ig.ksort(this.target);
      this.delayTimer = new ig.Timer();
    }

  });



});




}).call(this);


