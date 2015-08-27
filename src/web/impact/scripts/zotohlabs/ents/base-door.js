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
(function (undef) { "use strict"; var global = this; _ = global._ ; ////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
ig.module('zotohlabs.ents.base-door').requires( 'impact.entity',
'impact.sound',
'zotohlabs.ents.base-player').defines(function () {

  global.EntityBaseDoor = ig.Entity.extend({

    checkAgainst:ig.Entity.TYPE.A,
    _wmIgnore: true,
    zIndex:-1,
    locked:false,
    isClosing:false,
    isOpening:false,

    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.activate(this.locked);
        console.log("Door is ready");
    },

    check: function (other) {
      if (this.locked || this.isClosing || this.isOpening) { return; }
      if (other.atDoor && (other.pos.x > this.pos.x)) {
        this.entityCanOpenDoor(other);
      }
    },

    entityCanOpenDoor: function (other) {
      other.atDoor(this);
    },

    receiveDamage: function (value) {
        // Do nothing
    },

    open: function (target) {
      this.isOpening = true;
      this.target = target;
    },

    onOpen: function () {
      this.isOpening = false;
    },

    close: function () {
      this.isClosing = true;
      this.target = null;
    },

    onClose: function () {
      this.isClosing = false;
    },

    activate: function (value) {
      this.locked = value;
    }

  });

  global.EntityBasePlayer.inject({

    currentDoor:null,

    atDoor: function (door) {
      if (this.standing) {
        this.currentDoor = door;
      }
    },

    openDoor: function () {
      if (this.currentDoor) {
        this.currentDoor.open(this);
        this.visible = false;
        this.accel.x = this.accel.y = 0;
        this.vel.x = this.vel.y = 0;

        //this.type = ig.Entity.TYPE.NONE;
        this.collides = ig.Entity.COLLIDES.NONE;

        if (this.inputFilter.indexOf("open") == -1) {
          this.inputFilter.push("open");
            //console.log("Add open to filter", this.inputFilter, this.inputFilter.indexOf("open"));
        }
      }
    },

    exitDoor: function () {
      if (this.currentDoor) {
        this.currentDoor.close();
        this.currentDoor = null;
        this.visible = true;

        //this.type = ig.Entity.TYPE.A;
        this.collides = ig.Entity.COLLIDES.ACTIVE;

        var index = this.inputFilter.indexOf("open");
        if (index != -1) {
          this.inputFilter.splice(index, 1);
              //console.log("remove open from filter", this.inputFilter);
        }
      }
    },

    openPressed: function() {
        //console.log("isOpening", this.isOpening, "isClosing", this.isClosing);
      if (this.currentDoor) {
        if(this.currentDoor.isOpening || this.currentDoor.isClosing) { return; }
        //console.log("Open Down", this.currentDoor);
        if (this.visible) {
          this.openDoor();
        } else {
          this.exitDoor();
        }
      }
    },

    openReleased: function() {
      // Does nothing
    },

    update: function() {
      // Clear out any current door value
      this.parent();
      this.currentDoor = null;
    }

  });

});

}).call(this);


