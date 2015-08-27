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
(function (undef) { "use strict"; var global = _ ; _ = global._ ; //////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
ig.module( 'zotohlabs.ents.base-elevator').requires( 'impact.entity',
'zotohlabs.ents.base-platform' ).defines(function () {

  var sys= ig.system;
  global.EntityBaseElevator = EntityBasePlatform.extend({

    collides:ig.Entity.COLLIDES.NONE,
    type:ig.Entity.TYPE.NONE,
    _wmIgnore: true,
    cord:null,
    cords:[],
    zIndex:-1,

    update: function () {
      this.parent();
      if (this.topEntity && this.bottomEntity) {
          this.bottomEntity.vel.y = this.vel.y;
          this.topEntity.vel.y = this.vel.y;
      }
    },

    onReachTarget: function () {
      this.parent();
      if (this.topEntity && this.bottomEntity) {
          this.bottomEntity.pos.y = this.pos.y + this.size.y - 8;
          this.topEntity.pos.y = this.pos.y;
      }
    },

    draw: function () {
      //TODO need to optimize this, it should probably just be a set of tiles.
      if (this.cords.length === 2) {
        this.drawLineToTarget(this, this.cords[0]);
        this.drawLineToTarget(this, this.cords[1]);
      }
      this.parent();
    },

    drawLineToTarget: function (ent, target) {
      target = ig.game.getEntityByName(target);
      if (!target) { return; }
      sys.context.strokeStyle = '#000';
      sys.context.lineWidth = 3;
      sys.context.beginPath();
      sys.context.moveTo(
        sys.getDrawPos(ent.pos.x + ent.size.x / 2 - ig.game.screen.x),
        sys.getDrawPos(ent.pos.y + ent.size.y / 2 - ig.game.screen.y));
      sys.context.lineTo(
        sys.getDrawPos(target.pos.x + target.size.x / 2 - ig.game.screen.x),
        sys.getDrawPos(target.pos.y + target.size.y / 2 - ig.game.screen.y));
      sys.context.stroke();
      sys.context.closePath();
    },

    init: function (x, y, settings) {
      this.parent(x, y, settings);
      this.cords = ig.ksort(this.cord);
      if (typeof wm == "undefined") {
        this.topEntity = ig.game.spawnEntity("EntityElevatorPlatform", this.pos.x, this.pos.y, {name:"top"});
        this.bottomEntity = ig.game.spawnEntity("EntityElevatorPlatform", this.pos.x, this.pos.y + this.size.y - 8, {name:"bottom"});
      }
    }

  });

  global.EntityElevatorPlatform = ig.Entity.extend({

    collides:ig.Entity.COLLIDES.FIXED,
    checkAgainst:ig.Entity.TYPE.BOTH,
    type:ig.Entity.TYPE.B,
    size:{x:32, y:8},
    speed:20,
    gravityFactor:0,
    maxVel:{x:100, y:100},
    debug:false,

    draw: function () {
      if (this.debug) {
        this.parent();
        var y = this.pos.y * sys.scale - ig.game.screen.y * sys.scale;
        var x = this.pos.x * sys.scale - ig.game.screen.x * sys.scale;
        var sizeX = this.size.x * sys.scale;
        var sizeY = this.size.y * sys.scale;
        sys.context.save();
        sys.context.fillStyle = "rgba(128, 28, 230, 0.7)";
        sys.context.fillRect(x, y, sizeX, sizeY);
        //this.parent();
        sys.context.restore();
      }
    },

    receiveDamage: function (amount, from) {
        // Takes no damage
    }

  });



});

}).call(this);


