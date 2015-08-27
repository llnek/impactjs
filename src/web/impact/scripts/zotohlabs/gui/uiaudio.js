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

(function (undef){ "use strict"; var global = this; var _ = global._ ;
var asterix = global.ZotohLabs.Asterix;
var sh = asterix.Shell;
var loggr= global.ZotohLabs.logger;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
asterix.XAudioBtnFactory = {
  create: function(conf) {
    var p= this.define(conf);
    return new (p)();
  },
  define: function(conf) {
    var p= ig.XButton.extend({
      typeiid: 'EntityAudioBtn',
      clicker: function() {
        sh.xcfg.toggleSfx();
        this.setAnims();
      },
      setAnims: function() {
        this.currentAnim = this.anims[ sh.xcfg.sound.open ? 'open' : 'mute' ];
      },
      init: function(x, y, options) {
        this.parent(x, y, options);
      }
    });
    return p.extend(conf);
  }
};



}).call(this);


