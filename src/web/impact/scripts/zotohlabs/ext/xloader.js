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

(function(undef) { "use stricts"; var global = this ; var _ = global._ ;
var asterix= global.ZotohLabs.Asterix;
var sh = asterix.Shell;
var loggr= global.ZotohLabs.logger;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////

asterix.XLoader = ig.Loader.extend({

  end: function () {
    // make sure all the usual stuff are all wrapped up.
    this.parent();
    // mark the time now, used for nice fade out.
    this.endTime = Date.now();
    ig.system.setDelegate(this);
  },

  endTime: 0,

  run: function () {
    var t = Date.now() - this.endTime;
    var alpha = 1;
    if (t > sh.xcfg.system.fadeToGameMillis) {
      ig.system.setDelegate(ig.game);
    } else {
      if (t < sh.xcfg.system.fadeToWhiteMillis) {
        this.draw();
        alpha = t.map( 0, sh.xcfg.system.fadeToWhiteMillis, 0, 1);
      }
      else {
        ig.game.run();
        alpha = t.map( sh.xcfg.system.fadeToWhiteMillis, sh.xcfg.system.fadeToGameMillis, 1, 0);
      }
      ig.system.context.fillStyle = sh.xcfg.system.fadeColor.replace(')', ',' + alpha + ')');
      ig.system.context.fillRect(0, 0, ig.system.realWidth, ig.system.realHeight);
    }
  },

  draw: function () {
    // some damping for the status bar
    this._drawStatus += (this.status - this._drawStatus) / 5;

    var h = ig.system.realHeight;
    var w = ig.system.realWidth;

    var barSpacing = Math.min(w, h) * 0.005;
    var spacing = Math.min(w, h) * 0.02;
    var barHeight = h * 0.025;
    var barWidth = w * 0.25;

    var logoMainHeight = this.logoMain.height;
    var logoMainWidth = this.logoMain.width;
    var totalWidth = Math.max(barWidth, logoMainWidth);
    var totalHeight = logoMainHeight + spacing + barHeight + spacing  ;

    var pctY = totalHeight / h;
    var pctX = totalWidth / w;
    var scaleX = 1;
    var scaleY = 1;

    if (pctX > 0.5) { scaleX = 1 - ( pctX - 0.5); }
    if (pctY > 0.5) { scaleY = 1 - ( pctY - 0.5); }

    var scale = Math.min(1, scaleX, scaleY);
    var centerY = ( h - totalHeight * scale ) / 2;
    var centerX = ( w - totalWidth * scale ) / 2;

    ig.system.context.fillStyle = 'rgb(0,0,0,0.8)';
    ig.system.context.clearRect(0, 0, w, h);
    ig.system.context.save();

    ig.system.context.translate(centerX, centerY);
    ig.system.context.scale(scale, scale);
    ig.system.context.drawImage(this.logoMain, ( totalWidth - logoMainWidth ) * 0.5, 0);

    ig.system.context.lineWidth = 3;
    ig.system.context.strokeStyle = 'rgb(245,150,49)';
    //ig.system.context.strokeStyle = 'rgb(255,255,255)';
    ig.system.context.strokeRect(( totalWidth - barWidth ) * 0.5, logoMainHeight + spacing, barWidth, barHeight);

    ig.system.context.fillStyle = 'rgb(245,150,49)';
    //ig.system.context.fillStyle = 'rgb(255,255,255)';
    ig.system.context.fillRect(( totalWidth - barWidth ) * 0.5 + barSpacing, logoMainHeight + spacing + barSpacing, Math.max(0, barWidth * this._drawStatus - barSpacing * 2), barHeight - barSpacing * 2);

    ig.system.context.restore();
  },

  init: function (game, resources) {
    this.logoMain = ig.$new('img');
    this.logoMain.src = sh.xcfg.mainLogo;
    //this.logoMain.style= "border: solid 1px; border-color: #F59631;";
    this.parent(game, resources);
  }

});




}).call(this);


