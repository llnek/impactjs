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
(function (undef) { "use strict"; var global = this; var _ = global._ ; ///////////////////////////
//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
ig.module( 'zotohlabs.ents.base-player').requires( 'zotohlabs.ents.base-actor').defines(function () {

  global.EntityBasePlayer = EntityBaseActor.extend({

    bloodColorOffset:0, // By default this is set to 0
    checkAgainst:ig.Entity.TYPE.NONE,
    collides:ig.Entity.COLLIDES.ACTIVE,
    _wmIgnore: true,
    name: "player",
    maxVel:{x:100, y:150},
    friction:{x:600, y:20},
    accelGround:400,
    accelAir:100,
    jump:200,
    type:ig.Entity.TYPE.A,
    inputFilter: [],

    update: function () {
      // move left or right
      if (this.visible) {
          this.onVisibleUpdate();
      }
      // Check for input
      this.onCheckInput();
      // move!
      this.parent();
    },

    onVisibleUpdate: function() {
      //Reset acceleration X
      this.accel.x = 0;
      this.accel.y = 0;
     /* if (!this.states)
      {

      }*/
      this.currentAnim.flip.x = this.flip;
    },

    onCheckInput: function () {
      // Loop through input states and call action handlers
      var me=this; _.each(ig.input.actions,function(act) {
        _.each(me.totalStates,function(st) {
          var state = st.state;
          var stateValue = ig.input[state][act];
          if (stateValue && (me.inputFilter.length === 0 ||
                             me.inputFilter.indexOf(act) != -1)) {
            me.onInputAction(act, st.method);
          }
        });
      });
    },

    updateAnimation: function () {
      //Replace with logic to set the correct animation
    },

    onInputAction: function (value, method) {
      var mtd = '' + value + method;
      if (_.has(this, mtd)) {
        this[ mtd]();
      }
    },

    onKill: function () {
      ig.game.onPlayerDeath();
    },

    receiveDamage: function (value, from) {
      this.parent(value, from);
      if (!this.invincible) { this.makeInvincible(); }
    },

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      // Setup values to handle input
      this.states = [
          {state:"actions", method:"Down"},
          {state:"presses", method:"Pressed"},
          {state:"delayedKeyup", method:"Released"}
      ];
      this.totalStates = this.states.length;
    }

  });

});

//////////////////////////////////////////////////////////////////////////////
// game extension
//////////////////////////////////////////////////////////////////////////////
ig.Game.inject({

  player:null,

  loadLevel: function(data) {
    this.parent(data);
    this.player = this.getEntityByName("player");
    if (this.player) { this.player.makeInvincible(); }
  },

  onPlayerDeath: function() {
    // Override this in your game class to handle death of the player
  }

});


}).call(this);


