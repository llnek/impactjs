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
(function (undef) { ""; var global = this; var _ = global._ ; ////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
ig.module('zotohlabs.ents.base-actor').requires( 'impact.entity',
'impact.sound',
'zotohlabs.ents.death-explosion').defines(function () {

  global.EntityBaseActor = ig.Entity.extend({
    _wmIgnore: true,
    visible:true,
    weapon:0,
    activeWeapon:"none",
    startPosition:null,
    invincible:false,
    invincibleDelay:2,
    captionTimer:null,
    healthMax:10,
    health:10,
    markedForDeath:false,
    fallDistance:0,
    maxFallDistance:10000,
    shotPressed:false,
    fireDelay:null,
    fireRate:0,
    bloodColorOffset:0,
    equipment: [],

    setupAnimation:function (offset) {
    },

    receiveDamage: function (value, from) {
      if (this.invincible || !this.visible) { return; }
      this.parent(value, from);
      if (this.health > 0) {
        this.spawnParticles(2);
      }
    },

    kill: function (noAnimation) {
      this.parent();
      //TODO need to rename all this to make more sense
      if (!noAnimation) {
        this.markedForDeath = true;
        this.onDeathAnimation();
      } else {
        this.onKill();
      }
    },

    onKill: function () {
        //Handler for when the entity is killed
    },

    onDeathAnimation: function () {
      ig.game.spawnEntity( EntityDeathExplosion, this.pos.x, this.pos.y, 
        {colorOffset: this.bloodColorOffset, callBack:this.onKill});
      //TODO need to think through this better
    },

    outOfBounds: function () {
      this.kill(true);
    },

    collideWith: function (other, axis) {
      // check for crushing damage from a moving platform (or any FIXED entity)
      if (other.collides == ig.Entity.COLLIDES.FIXED && this.touches(other)) {
        // we're still overlapping, but by how much?
        var overlap;
        var size;
        if (axis == 'y') {
          if (this.pos.y < other.pos.y) {
            overlap = this.pos.y + this.size.y - other.pos.y;
          } else { 
            overlap = this.pos.y - (other.pos.y + other.size.y);
          }
          size = this.size.y;
        } else {
          if (this.pos.x < other.pos.x) {
            overlap = this.pos.x + this.size.x - other.pos.x;
          } else {
            overlap = this.pos.x - (other.pos.x + other.size.x);
          }
          size = this.size.x;
        }
        overlap = Math.abs(overlap);
        // overlapping by more than 1/2 of our size?
        if (overlap > 3) {
          // we're being crushed - this is damage per-frame, so not 100% the same at different frame rates
          this.kill();
        }
      }
    },

    spawnParticles: function (total) {
      var me=this; _.each(_.range(total), function(n) {
        ig.game.spawnEntity(EntityDeathExplosionParticle,
          me.pos.x, me.pos.y, {colorOffset: me.bloodColorOffset});
      });
    },

    makeInvincible: function () {
      this.invincible = true;
      this.captionTimer.reset();
      //this.collides = ig.Entity.COLLIDES.NONE;
    },

    equip: function (target) {
      this.equipment.push(target);
    },

    update: function () {
      //TODO maybe we need to add invincible to draw or consolidate the two
      if (this.captionTimer.delta() > this.invincibleDelay) {
        this.invincible = false;
        if (this.currentAnim) { this.currentAnim.alpha = 1; }
          //Reset active collision setting
          //this.collides = ig.Entity.COLLIDES.ACTIVE;
      }
      if (this.visible) { this.updateAnimation(); }
      this.parent();
    },

    updateAnimation: function () {
        //Replace with logic to set the correct animation
    },

    draw: function () {
      // Exit draw call if the entity is not visible
      if (!this.visible) { return; }

      //TODO do we really need this?
      if (this.currentAnim) {
        if (!this.visible) {
          this.currentAnim.alpha = 0;
        } else {
          this.currentAnim.alpha = 1;
        }
      }
      if (this.invincible) {
        this.currentAnim.alpha = this.captionTimer.delta() / this.invincibleDelay * 1 + 0.2;
      }
      this.parent();
    },

    handleMovementTrace: function (res) {
      this.parent(res);
      //TODO need to add some kind of check to make sure we are not calling this too many times
      if ((res.collision.y) && (this.fallDistance > this.maxFallDistance)) {
        this.onFallToDeath();
      }
    },

    onFallToDeath:function () {
      this.kill();
    },

    repel:function (direction, force) {
    },

    init:function (x, y, settings) {
      this.parent(x, y, settings);
      this.spawner = settings.spawner;
      //TODO need to figure out if we should call this here?
      this.setupAnimation(settings.spriteOffset ? settings.spriteOffset : 0);
      this.startPosition = {x:x, y:y};
      this.captionTimer = new ig.Timer();
      this.fireDelay = new ig.Timer();
    }

  });

});


}).call(this);


