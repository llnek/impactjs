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
(function (undef) { "use strict"; var global = this; _ = global._ ;  /////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
ig.module('zotohlabs.ents.particle').requires( 'impact.entity').defines(function() {

  global.EntityParticleEmitter = ig.Entity.extend({

    _wmBoxColor:'rgba(128, 28, 230, 0.7)',
    _wmIgnore: false,
    _wmDrawBox: true,
    _wmScalable:true,

    size: {x: 8, y: 8},
    lifetime: .1,
    particles: 3,
    colorOffset: 0,

    instances: [],
    pool: [],
    maxInstances: 10,

    target:null,
    targets:[],
    spawnEntity:null,
    particleLifeTime: 1,
    fadetime: 1,

    update: function() {
      if (this.targets.length < 1 || !this.spawnEntity) { return; }
      if ( this.idleTimer.delta() > this.lifetime ) {
        if ( this.createParticle()) {
          this.idleTimer.reset();
        }
      }
    },

    createParticle: function() {
      var instanceName = this.targets.random();
      var instance;
        //Find random target
      var newTarget = ig.game.getEntityByName(instanceName);

      if (!newTarget) {
        this.instances.splice(this.instances.indexOf(instanceName), 1);
        return;
      }

      var x = (Math.random() * newTarget.size.x-2) + newTarget.pos.x;
      var y = newTarget.pos.y + (newTarget.size.y - 5);

      if (this.instances.length < this.maxInstances) {
        instance = ig.game.spawnEntity(this.spawnEntity, x, y,
          { spawner: this, lifetime: this.particleLifeTime, fadetime: this.fadetime});
        this.instances.push(instance);
        this.pool.push(instance);
      } else {
        instance = this.pool.pop();
        if (instance) { instance.reset(x, y); }
      }
      return instance;
    }

  });

  global.EntityBaseParticle = ig.Entity.extend({

    collides: ig.Entity.COLLIDES.NONE,
    size: {x: 2, y: 2},
    lifetime: 1,
    fadetime: 1,
    bounciness: 0,
    colorOffset: 0,
    totalColors: 7,
    idleTimer: null,
    animSheet: new ig.AnimationSheet( 'media/main/game/blood.png', 2, 2 ), //TODO need to create element particle sprite sheet

    update: function() {
        /*if(this.currentAnim.alpha < .1)
            return;*/
      if ( this.idleTimer.delta() > this.lifetime ) {
        this.kill();
        return;
      }
      this.currentAnim.alpha = this.idleTimer.delta().map(
          this.lifetime - this.fadetime, this.lifetime,
          1, 0
      ) -.2;
      this.parent();
    },

    reset: function(x, y) {
      this.currentAnim.alpha = 1;
      this.idleTimer.reset();
      this.pos.x = x;
      this.pos.y = y;
    },

    kill: function() {
      this.spawner.pool.push(this);
      this.currentAnim.alpha = 0;
    },

    draw: function() {
      if (this.currentAnim.alpha < .1) { return; }
      this.parent();
    },

    handleMovementTrace: function (res) {
      this.parent(res);
      if (res.collision.x || res.collision.y) {
          this.kill();
      }
    },

    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      var frameID = Math.round(Math.random()*this.totalColors) + (this.colorOffset * (this.totalColors+1));
      this.addAnim( 'idle', 0.2, [frameID] );
      this.idleTimer = new ig.Timer();
    }


  });

  global.EntityFlameParticle = EntityBaseParticle.extend({

    maxVel: {x: 20, y: -20},
    vel: {x: 10, y: 30},
    friction: {x:10, y: 0},
    colorOffset: 2,

    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.vel.y = (Math.random() * 5 - 1) * this.vel.y;
      this.vel.x = (Math.random() * 1) * this.vel.x;
    }

  });

  global.EntityWaterParticle = EntityFlameParticle.extend({

    maxVel: {x: 50, y: 150},
    vel: {x: 40, y: 0},
    friction: {x:10, y: 100},
    colorOffset: 5,

    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.vel.x = (Math.random() * 5) * this.vel.x;
      //TODO need to fix the reset so these particles shoot out
    }

  });

  global.EntitySnowParticle = EntityFlameParticle.extend({

    maxVel: {x: 160, y: 200},
    vel: {x: 100, y: 30},
    friction: {x:100, y: 100},
    lifetime: 3,
    fadetime: 3,
    colorOffset: 4,
    totalColors: 7,

    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
      this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
    }


  });




});

}).call(this);

