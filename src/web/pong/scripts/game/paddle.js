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

(function(undef){ "use strict"; var global= this; var _ = global._ ;
var asterix= global.ZotohLabs.Asterix;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////

asterix.Pong.EntityPaddle = asterix.XEntity.extend({

  collides: ig.Entity.COLLIDES.FIXED,

  getColor: function() {
    return this.colorValue;
  },

  size: { x: 14, y: 48 },

  typeiid: 'EntityPaddle',

  init: function(x, y, options) {
    this.parent(x, y, options);
    this.maxVel.x = 200;
    this.maxVel.y = 200;
    this.maxVelx = 100;
    this.friction.x = 150;
    this.friction.y = 0;
  }

});




}).call(this);


