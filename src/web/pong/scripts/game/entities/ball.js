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

(function(undef) { "use strict"; var global = this; var _ = global._ ;
var asterix= global.ZotohLabs.Asterix;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
asterix.Pong.EntityBall = asterix.XEntity.extend({

  animSheet: new ig.AnimationSheet('media/pong/game/coin.png', 18,18),
  collides: ig.Entity.COLLIDES.ACTIVE,

  size: { x: 18, y: 18 },
  typeiid: 'EntityBall',
  bounciness: 1,

  update: function() {
    this.parent();
  },

  init: function(x, y, options) {
    this.parent(x, y, options);
    this.addAnim('show', 1, [0]);
    this.maxVel.y = 200;
    this.vel.y = 100 * asterix.fns.randomSign();
    this.vel.x = 100 * asterix.fns.randomSign();
  }

});




}).call(this);


