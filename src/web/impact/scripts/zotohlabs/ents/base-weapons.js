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
(function (undef) { "use strict"; var global = this; var _ = global._ ; ///////////////////////
//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
ig.module( 'zotohlabs.ents.base-weapons').requires( 'zotohlabs.ents.base-player').defines(function () {

  //TODO need to add logic that if the weapon is on the map it shows an icon and can be picked up, if equipped then it doesn't display any graphics
  global.EntityBaseWeapons = ig.Entity.extend({

    automatic:false,
    recoil:1,
    maxPool:-1,
    distance:-1,
    parentEntity:null,

    kill: function () {
      this.parent();
      //TODO this should also check that it is the active weapon?
      if (this.parentEntity && this.parentEntity.removeWeaponFromPool) {
        this.parentEntity.removeWeaponFromPool();
      }
    },

    outOfBounds:function () {
      this.kill();
    }

  });

});

//////////////////////////////////////////////////////////////////////////////
// extension
//////////////////////////////////////////////////////////////////////////////

global.EntityBasePlayer.inject({

  activeWeapon: "none",
  shotPressed: false,
  fireDelay: null,
  fireRate: 0,
  maxPool: 2,
  weapon: 0,

  onVisibleUpdate: function() {
    this.parent();
    if (this.shotPressed) {
      if ( this.fireDelay.delta() > this.fireRate ) {
        this.fireWeapon();
        this.fireDelay.reset();
      }
    }
  },

  fireWeapon: function() {
    if (this.activeWeapon == "none") { return; }
    if (this.maxPool == -1 || this.pool < this.maxPool ) {
      //console.log("Pool", this.pool, this.pool < this.maxPool)
      var entity = ig.game.spawnEntity( this.activeWeapon, this.pos.x, this.pos.y, {flip:this.flip, parentEntity: this} );
      this.addWeaponToPool();
      this.maxPool = entity.maxPool;
      this.shotPressed = entity.automatic;
      this.fireRate = entity.automatic ? entity.fireRate : 0;
      //TODO bug where this isn't reapplied if the weapon is automatic
      var accel = this.standing ? this.accelGround : this.accelAir;
      if ( !this.flip ) {
        this.accel.x = -accel * entity.recoil;
      } else {
        this.accel.x = accel * entity.recoil;
      }
      this.fireDelay.reset();
    }
  },

  fireWeaponRelease: function() {
      this.shotPressed = false;
  },

  addWeaponToPool: function() {
    ++this.pool;
  },

  removeWeaponFromPool: function() {
    --this.pool;
    if (this.pool < 0) { this.pool = 0; }
  },

  clearWeaponPool: function() {
    this.maxPool = -1;
    this.pool = 0;
  }

});


}).call(this);


