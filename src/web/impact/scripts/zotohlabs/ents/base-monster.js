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
(function (undef) { "use strict"; var global = _ ; var _ = global._ ; //////////////////////////
//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
ig.module( 'zotohlabs.ents.base-monster').requires( 'zotohlabs.ents.base-actor').defines(function () {

  global.EntityBaseMonster = EntityBaseActor.extend({

    collides:ig.Entity.COLLIDES.PASSIVE,
    checkAgainst:ig.Entity.TYPE.A,
    _wmIgnore: true,
    maxVel:{x:100, y:100},
    friction:{x:150, y:0},
    speed:14,
    type:ig.Entity.TYPE.B,
    collisionDamage: 1,
    lookAhead: 0,
    stayOnPlatform: true,

    update: function () {
        this.parent();
        this.onUpdateAI();
    },

    onUpdateAI: function() {
      if (this.stayOnPlatform) {
        // near an edge? return!
        if (ig.game.collisionMap.getTile(
            this.pos.x + (this.flip ? - this.lookAhead : this.size.x + this.lookAhead),
            this.pos.y + this.size.y + 1
        ) == 0
            && this.standing) {
          this.flip = !this.flip;
        }
      }
      //TODO need to look into why monsters get stuck and switch back and forth on edges, maybe need a delay?
      var xdir = this.flip ? -1 : 1;
      this.vel.x = this.speed * xdir;
      if (this.currentAnim) {
        this.currentAnim.flip.x = this.flip;
      }
    },

    handleMovementTrace: function (res) {
      this.parent(res);
      // collision with a wall? return!
      if (res.collision.x) {
        this.flip = !this.flip;
      }
    },

    check: function (other) {
      //Do a quick test to make sure the other object is visible
      if (other.visible) {
        other.receiveDamage(this.collisionDamage, this);
        // Player is on top of monster so just keep walking in same direction
        if(other.pos.y > this.pos.y) { return; }
        // Test what side the player is on and flip direction based on that.
        this.flip = (other.pos.x > this.pos.x) ? true : false;
      }
    },

    init: function (x, y, settings) {
      this.parent(x, y, settings);
      this.spawner = settings.spawner;
      this.setupAnimation(settings.spriteOffset ? settings.spriteOffset : 0);
    }

  });

});


}).call(this);


