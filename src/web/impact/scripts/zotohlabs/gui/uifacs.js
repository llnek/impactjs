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

(function (undef) { "use strict"; var global= this; var _ = global._ ;
var asterix = global.ZotohLabs.Asterix;
var sh = asterix.Shell;
var loggr = global.ZotohLabs.logger;
var echt = global.ZotohLabs.echt;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////

asterix.XScreenFactory = {

  create: function(conf) {
    var p= this.define(conf);
    return new (p)();
  },

  define: function(conf) {
    return asterix.XSplashScreen.extend(conf);
  }
};

asterix.XTextButtonFactory = {

  resolveSize: function(ctor) {
    var f= ctor.prototype.font;
    var s= ctor.prototype.text;
    if (f && s) {
      var sz= sh.getTextSize(f,s);
      ctor.prototype.size= { x: sz[0], y: sz[1] };
    }
  },

  create: function(conf) {
    var p= this.define(conf);
    return new (p)();
  },

  define: function(conf) {
    return ig.XTextButton.extend(conf);
  }
};

asterix.XButtonFactory = {

  create: function(conf) {
    var p= this.define(conf);
    return new (p)();
  },

  define: function(conf) {
    return ig.XButton.extend(conf);
  }
};

asterix.XDialogFactory = {

  create: function(conf) {
    var p= this.define(conf);
    return new (p)();
  },

  define: function(conf) {
    var tpl= asterix.XSplashScreen.extend({
      draw: function() {
        this.parent();
        if (echt(this.msg)) {
          var mi = this.getTextSize(this.font,this.msg);
          this.font.draw(this.msg,
            (ig.system.width - mi[0] ) / 2,
            (ig.system.height - mi[1] ) / 2);
        }
      },
      gui: function() {
        var me=this, b, yid= 'gui';
        this.createLayerEx(yid);
        _.each(this.btns,function(z) {
          b= me.spawnEntity(z.ctor, z.x, z.y, { _layer: yid });
          if (z.action) { b.clicker= z.action; }
        });
      },
      init: function() {
        this.parent();
        this.gui();
        this.start();
      }
    });
    return tpl.extend(conf);
  }

};



}).call(this);


