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

(function(undef){ "use strict"; var global = this; var _ = global._ ;
var asterix = global.ZotohLabs.Asterix;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
asterix.TicTacToe.EntityNought = asterix.XEntity.extend({

  animSheet: new ig.AnimationSheet('media/tictactoe/game/markers.png', 72, 72),
  size: { x: 72, y: 72 },
  typeiid: 'EntityNought',

  setAnims: function() {
    this.addAnim('show', 1, [1]);
    this.addAnim('lose', 1, [3]);
    this.currentAnim= this.anims.show;
  },

  update: function() {
    if (this.visible && this.flip) {
      this.currentAnim= this.anims.lose;
    }
  }

});





}).call(this);


