// This library is distributed in  the hope that it will be useful but without
// any  warranty; without  even  the  implied  warranty of  merchantability or
// fitness for a particular purpose.
// The use and distribution terms for this software are covered by the Eclipse
// Public License 1.0  (http://opensource.org/licenses/eclipse-1.0.php)  which
// can be found in the file epl-v10.html at the root of this distribution.
// By using this software in any  fashion, you are agreeing to be bound by the
// terms of this license. You  must not remove this notice, or any other, from
// this software.
// Copyright (c) 2013 Cherimoia, LLC. All rights reserved.

(function(undef) { "use strict"; var global=this; var _ = global._ ;
var asterix= global.ZotohLabs.Asterix;
var loggr= global.ZotohLabs.logger;
var echt= global.ZotohLabs.echt;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////

ig.Entity.inject({

  getCenter: function() {
    return {
      x: Math.floor(this.pos.x + this.size.x / 2),
      y: Math.floor(this.pos.y + this.size.y / 2)
    };
  },

  maybeWrapOOB: function() {
    if (this.pos.x > ig.system.width) {
      this.pos.x = -this.size.x;
    } else if(this.pos.x < -this.size.x) {
      this.pos.x = ig.system.width;
    }
    if (this.pos.y > ig.system.height) {
      this.pos.y = -this.size.y;
    } else if (this.pos.y < -this.size.y) {
      this.pos.y = ig.system.height;
    }
  },

  visible: true,

  toggleVisible: function(override) {
    this.visible = echt(override) ? override : !this.visible;
  },

  kill: function() {
    loggr.debug('entity of type ['  + this.typeiid  + '] killed.');
    this.parent();
  },

  typeiid: ''

});

asterix.XEntity = ig.Entity.extend({

  setAnims: function() {},

  init: function(x,y,settings) {
    this.parent(x,y,settings);
    this.setAnims();
  }
});




}).call(this);


