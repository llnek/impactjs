// This library is distributed in  the hope that it will be useful but without
// any  warranty; without  even  the  implied  warranty of  merchantability or
// fitness for a particular purpose.
//
// The use and distribution terms for this software are covered by the Eclipse
// Public License 1.0  (http://opensource.org/licenses/eclipse-1.0.php)  which
// can be found in the file epl-v10.html at the root of this distribution.
//
// By using this software in any  fashion, you are agreeing to be bound by the
// terms of this license. You  must not remove this notice, or any other, from
// this software.
//
// Copyright (c) 2013 Cherimoia, LLC. All rights reserved.

(function (undef) { "use strict"; var global = this; var _ = global._;
var loggr= global.ZotohLabs.logger;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
ig.module('plugins.camera').requires( 'impact.game',
'impact.image').defines(function () {

  ig.XCamera = ig.Class.extend({

    currentLookAhead: {x:0, y:100},
    lightOffset: {x:0, y:0},
    lookAhead: {x:0, y:0},

    quakeRunning : false,
    quakeTimer: null,

    trap: {
        pos:{x:0, y:0},
        size:{x:16, y:16}},

    offset: {x:0, y:0},
    pos: {x:0, y:0},
    min: {x:0, y:0},
    max: {x:0, y:0},

    lightMask: null,
    duration: 1,
    damping: 5,
    strength: 3,

    set: function (entity) {
      this.pos.x = entity.pos.x - this.offset.x;
      this.pos.y = entity.pos.y - this.offset.y;
      this.entity = entity;
      //TODO took this out because it was causing an issue with the camera not being correct when the player was too close to the bottom
      /*this.trap.pos.x = this.entity.pos.x - this.trap.size.x / 2;
      this.trap.pos.y = this.entity.pos.y - this.trap.size.y;*/
      ig.game.screen.x = this.pos.x;
      ig.game.screen.y = this.pos.y;
    },

    update: function () {
      if (this.entity) {
        this.pos.x = this.move('x', this.entity.pos.x, this.entity.size.x);
        this.pos.y = this.move('y', this.entity.pos.y, this.entity.size.y);
        ig.game.screen.x = this.pos.x;
        ig.game.screen.y = this.pos.y;
      }
      // handle screen shake
      var delta = this.quakeTimer.delta();
      if (delta < -0.1) {
        this.quakeRunning = true;
        var s = this.strength * Math.pow(-delta / this.duration, 2);
        if (s > 0.5) {
          ig.game.screen.x += Math.random().map(0, 1, -s, s);
          ig.game.screen.y += Math.random().map(0, 1, -s, s);
        }
      } else {
        this.quakeRunning = false;
      }
      if (this.lightMask) {
        this.lightOffset.y = (this.entity.pos.y - this.pos.y) - this.lightMask.height * 0.5;
        this.lightOffset.x = (this.entity.pos.x - this.pos.x) - this.lightMask.width * 0.5;
      }
    },

    move: function (axis, pos, size) {
      //var lookAhead = 0;
      if (pos < this.trap.pos[axis]) {
        this.trap.pos[axis] = pos;
        this.currentLookAhead[axis] = this.lookAhead[axis];
      }
      else if (pos + size > this.trap.pos[axis] + this.trap.size[axis]) {
        this.trap.pos[axis] = pos + size - this.trap.size[axis];
        this.currentLookAhead[axis] = -this.lookAhead[axis];
      }
      return (this.pos[axis] - (this.pos[axis] - this.trap.pos[axis] + this.offset[axis]
            + this.currentLookAhead[axis]) * ig.system.tick * this.damping).limit(this.min[axis], this.max[axis]);
    },

    draw: function () {
      if (ig.xcfg.system.debug) {
        ig.system.context.fillStyle = 'rgba(255,0,255,0.3)';
        ig.system.context.fillRect((this.trap.pos.x - this.pos.x) * ig.system.scale, (this.trap.pos.y - this.pos.y) * ig.system.scale, this.trap.size.x * ig.system.scale, this.trap.size.y * ig.system.scale);
      }
      if (this.lightMask) {
        this.lightMask.draw(this.lightOffset.x, this.lightOffset.y);
      }
    },

    shake: function (duration, strength, ignoreShakeLock) {
      this.duration = duration ? duration : 1;
      this.strength = strength ? strength : 3;
      if (!ignoreShakeLock && this.quakeRunning) {} else {
        this.quakeTimer.set(this.duration);
      }
    },

    init: function (offsetX, offsetY, damping, lightMask) {
      this.quakeTimer = new ig.Timer();
      this.offset.x = offsetX;
      this.offset.y = offsetY;
      this.damping = damping;
      this.lightMask = lightMask;
    }

  });

  ig.Game.inject({

    //camera: new ig.XCamera(50, 25, 5),
    camera: null,

    loadLevel: function(data) {
      this.parent(data);
      if ( ! this.camera) { return; }
      var pi = this.getEntityByName("player");
      if (pi) {
        this.camera.set(pi);
        this.configureCamera();
      } else {
        loggr.error("Couldn't find player for camera.");
      }
    },

    configureCamera: function() {
      //TODO need to explain this better
      // This sets the camera's max x to the width of the screen
      if (this.camera) {
        this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
        this.camera.min.y = 0;
        this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;
      }
    },

    //TODO should I add in duration & strength arguments?
    shakeScreen: function (duration, strength, ignoreShakeLock) {
      if (this.camera) {
        this.camera.shake(duration, strength, ignoreShakeLock);
      }
    },

    updateEntities: function () {
      this.parent();
      if ( this.camera) {
        if (!this.paused) {
          this.camera.update();
        }
      }
    },

    drawEntities: function () {
      this.parent();
      if (this.camera) {
        this.camera.draw();
      }
    }

  });


});


}).call(this);


