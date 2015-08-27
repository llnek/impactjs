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
(function (undef) { "use strict";  var global = this ; _ = global._ ;   /////////////////////////

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
ig.module('zotohlabs.ents.spawner').requires( 'impact.entity').defines(function () {

  global.EntitySpawner = ig.Entity.extend({

    _wmBoxColor:'rgba(0, 0, 255, 0.7)',
    randomSpawnPoint:false,
    idleTimer:null,
    _wmDrawBox:true,
    _wmScalable:true,
    delay:4,
    maxVel:{x:0, y:0},
    spawnEntity:null,
    target:null,
    targets:[],
    pool:0,
    maxPool:-1,

    update: function () {
      if (this.idleTimer.delta() > this.delay) {
          this.idleTimer.reset();
          this.spawnNewEntity();
      }
      this.parent();
    },

    spawnNewEntity: function (settings) {
      var x,y, me=this;
      if (this.pool < this.maxPool || this.maxPool == -1) {
          settings = settings || { spawner: me };
          x = this.pos.x;
          y = this.pos.y;
          if (this.targets.length > 0) {
              //TODO make sure this is always in bounds
              var index = Math.floor(Math.random() * (this.targets.length - 1));
              var newTarget = ig.game.getEntityByName(this.targets[index]);
              x = this.randomSpawnPoint ? Math.round(Math.random() * newTarget.size.x) + newTarget.pos.x : newTarget.pos.x;
              y = newTarget.pos.y;
          }

          if (this.spawnEntity) {
              ig.game.spawnEntity(this.spawnEntity, x, y, settings);
          }

          // Sort entites to make sure newly spawned entites are at the correct Z index
          ig.game.sortEntitiesDeferred();
          ++this.pool;
      }
    },

    draw:function () {
    },

    removeItem:function () {
        --this.pool;
    },

    init: function (x, y, settings) {
      this.parent(x, y, settings);
      this.idleTimer = new ig.Timer();
      // Transform the target object into an ordered array of targets
      this.targets = ig.ksort(this.target);
    }

  });

});

}).call(this);

