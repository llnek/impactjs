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
(function (undef) { "use strict"; var global = this; _ = global._ ;   /////////////////////

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
ig.module('zotohlabs.ents.text').requires( 'impact.entity',
'impact.font').defines(function () {

  global.EntityText = ig.Entity.extend({

    font: new ig.Font('media/main/fon/04b03.font.png'),
    alignment: ig.Font.ALIGN.LEFT,
    text: "undefined",
    alpha:1,
    maxVel:{x:0, y:0},
    zIndex: -1,
    cache: true,

    draw: function () {
      if (this.alpha != 1) {
        ig.system.context.globalAlpha = this.alpha;
      }
      this.parent();
      this.size = { x: this.font.widthForString(this.text), y:8};
      this.font.draw(this.text,
          Math.round(this.pos.x) - this.offset.x - ig.game.screen.x,
          Math.round(this.pos.y) - this.offset.y - ig.game.screen.y,
          this.alignment);
      if (this.alpha != 1) {
        ig.system.context.globalAlpha = 1;
      }
    }

  });

});

}).call(this);


