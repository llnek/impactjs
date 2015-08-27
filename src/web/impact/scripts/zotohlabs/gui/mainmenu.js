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
var menuFont= sh.newFonFile('impact', 'downlink_white_10_font.png');
var YesBtn= asterix.XButtonFactory.define({
  animSheet: new ig.AnimationSheet(sh.imgFile('impact','btns','xbx-A-x32.png'), 64,32),
  size: { x: 64, y: 32 },
  clicker: function() { sh.xcfg.smac.quit(); }
});
var NoBtn= asterix.XButtonFactory.define({
  animSheet: new ig.AnimationSheet(sh.imgFile('impact','btns','xbx-B-x32.png'), 64,32),
  size: { x: 64, y: 32 }
});
var OnePBtn= asterix.XButtonFactory.define({
  animSheet: new ig.AnimationSheet(sh.imgFile('tictactoe','gui','onep_btn.png'), 226,24),
  size: { x: 226,y:24},
  clicker: function() { sh.xcfg.smac.play1(); }
});
var TwoPBtn= asterix.XButtonFactory.define({
  animSheet: new ig.AnimationSheet(sh.imgFile('tictactoe','gui','twop_btn.png'), 203,24),
  size: { x: 203,y:24},
  clicker: function() { sh.xcfg.smac.play2(); }
});
var NetPBtn= asterix.XButtonFactory.define({
  animSheet: new ig.AnimationSheet(sh.imgFile('tictactoe','gui','netp_btn.png'), 105,24),
  size: { x: 105,y:24},
  clicker: function() { sh.xcfg.smac.play3(); }
});
var QuitBtn= asterix.XButtonFactory.define({
  animSheet: new ig.AnimationSheet(sh.imgFile('impact','btns','xbx-Y-x32.png'), 64,32),
  size: { x: 64, y: 32 }
});
var BackBtn= asterix.XButtonFactory.define({
  animSheet: new ig.AnimationSheet(sh.imgFile('impact','btns','xbx-B-x32.png'), 64,32),
  size: { x: 64, y: 32 }
});
var AudioBtn= asterix.XAudioBtnFactory.define({
  animSheet: new ig.AnimationSheet('media/impact/btns/audio_onoff_white.png', 32,32),
  size: { x: 32, y: 32 },
  animDefs: {'open': [1,[1]], 'mute': [1,[0]] }
});
var TitleBtn= asterix.XTextButtonFactory.define({
  font: sh.newFonFile('impact', 'tinybox_white_24_font.png'),
  text: sh.l10n('%mmenu'),
  clicker: function() {}
});

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
asterix.XMainMenu = asterix.XDialogFactory.define({

  preStart: function() {
    var hy= ig.system.height - _.max( [ YesBtn.prototype.size.y, NoBtn.prototype.size.y ] ) - sh.xcfg.csts.TILE - sh.xcfg.csts.S_OFF;
    var me=this;
    this.appObj.confirmer= asterix.XDialogFactory.create({
      font: sh.newFonFile('impact','256_white_16_font.png'),
      msg: sh.l10n('%quit?'),
      name: 'confirmbox',
      btns: [
        { ctor: YesBtn,
          x: ig.system.width - YesBtn.prototype.size.x - NoBtn.prototype.size.x - sh.xcfg.csts.TILE - 20 - sh.xcfg.csts.S_OFF,
          y: hy },
        { ctor: NoBtn,
          x: ig.system.width - NoBtn.prototype.size.x - sh.xcfg.csts.TILE - 10 - sh.xcfg.csts.S_OFF,
          y: hy,
          action: function() {
            ig.system.setDelegateEx(me,false);
          }}
      ]
    });
  },

  gui: function() {
    var topy = (ig.system.height - OnePBtn.prototype.size.y - TwoPBtn.prototype.size.y -
    NetPBtn.prototype.size.y - (2 * 10)) / 2;
    var topx = (ig.system.width - _.max( [ OnePBtn.prototype.size.x,
                                TwoPBtn.prototype.size.x,
                                NetPBtn.prototype.size.x] )) / 2;
    var me=this,
    hy = ig.system.height - _.max([QuitBtn.prototype.size.y, BackBtn.prototype.size.y]) - sh.xcfg.csts.TILE - sh.xcfg.csts.S_OFF;
    asterix.XTextButtonFactory.resolveSize(TitleBtn);
    this.btns= [
      { ctor: TitleBtn,
          x: ( ig.system.width - TitleBtn.prototype.size.x) / 2,
          y :  sh.xcfg.csts.TILE + 10 },
      { ctor: OnePBtn, x: topx, y : topy },
      { ctor: TwoPBtn, x: topx, y: topy + OnePBtn.prototype.size.y + 10 },
      { ctor: NetPBtn,
        x: topx,
        y: topy + OnePBtn.prototype.size.y + TwoPBtn.prototype.size.y + 20 },
      { ctor: QuitBtn,
        action: function() { me.onQuit(); },
        x: ig.system.width - QuitBtn.prototype.size.x - BackBtn.prototype.size.x - sh.xcfg.csts.TILE - 20 - sh.xcfg.csts.S_OFF,
        y: hy },
      { ctor: BackBtn,
        action: function() { me.onBack(); },
        x: ig.system.width - BackBtn.prototype.size.x - sh.xcfg.csts.TILE -  10 - sh.xcfg.csts.S_OFF,
        y: hy  },
      { ctor: AudioBtn,
        x: sh.xcfg.csts.TILE + sh.xcfg.csts.S_OFF,
        y: hy  }

    ];
    this.parent();
  },

  name: 'mainmenu',

  onBack: function() {
    if (this.previous && this.previous.name === 'startscreen') {
      sh.xcfg.smac.quit();
    } else {
      sh.xcfg.smac.back();
    }
  },

  onQuit: function() {
    ig.system.setDelegateEx(this.appObj.confirmer);
  }

});



}).call(this);


