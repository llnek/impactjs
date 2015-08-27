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

(function(undef) { "use strict"; var global=this; var _ = global._;
var asterix = global.ZotohLabs.Asterix;
var sh= asterix.Shell;
var pg= asterix.Pong;
var echt= global.ZotohLabs.echt;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////

sh.xcfg.game.proto = asterix.XGame.extend({

  fontScore: sh.newFonFile('impact', 'ocr_white_16_font.png'),

  scores : { 'O': 0, 'X': 0 },
  max_score: 1, //11,

  sfx: {
  },

  players: [],
  ball: null,
  name: 'pong',

  preStart: function() {
    var csts= sh.xcfg.csts;
    var c= this.getCenter();
    this.maybeReset();
    var p1 = this.spawnEntity(pg.EntityHuman,
                csts.SIDE * csts.TILE + pg.EntityBall.prototype.size.x + 4,
                c.y - pg.EntityPaddle.prototype.size.y/2,
                { colorValue: 'X' });
    var p2= null;
    switch (csts.GAME_MODE) {
    case 1:
    p2 = this.spawnEntity(pg.EntityRobot,
                               (csts.GRID_W - csts.SIDE) * csts.TILE -
                               pg.EntityBall.prototype.size.x -
                               pg.EntityPaddle.prototype.size.x  - 4 ,
                               c.y - pg.EntityPaddle.prototype.size.y/2,
                               { colorValue: 'O' });
    break;
    case 2:
    p2 = this.spawnEntity(pg.EntityHuman,
                               (csts.GRID_W - csts.SIDE) * csts.TILE -
                               pg.EntityBall.prototype.size.x -
                               pg.EntityPaddle.prototype.size.x  - 4 ,
                               c.y - pg.EntityPaddle.prototype.size.y/2,
                               { colorValue: 'O' });
    case 3:
    break;
    };
    this.players= [ null, p1, p2];
    this.spawnBall();
  },

  spawnBall: function() {
    var c= this.getCenter();
    this.ball = this.spawnEntity(pg.EntityBall,
                c.x - pg.EntityBall.prototype.size.x / 2,
                c.y - pg.EntityBall.prototype.size.y/2, {});
  },

  onRestart: function() {
    sh.xcfg.smac.resetplay();
    this.stop();
    this.start();
  },

  onStart: function() {
  },

  maybeReset: function() {
    this.removeEntityTypes(pg.EntityPaddle);
    this.removeEntityTypes(pg.EntityBall);
    this.players=[];
    this.ball=null;
  },

  update: function() {
    if (echt(this.ball)) {
      this.checkWinner();
    }
    this.parent();
  },

  draw: function() {
    this.parent();
  },

  checkWinner: function() {
    if ( this.ball.pos.x + this.ball.size.x < this.players[1].pos.x) {
      return this.onWinner(this.players[2]);
    } else if (this.ball.pos.x > this.players[2].pos.x + this.players[2].size.x) {
      return this.onWinner(this.players[1]);
    } else {
      return false;
    }
  },

  onWinner: function(p) {
    var s = this.scores[p.getColor()];
    this.scores[p.getColor()] = s + 1;
    this.ball.kill();
    this.ball=null;
    if (s+1 >= this.max_score) {
      this.onDone(p);
    } else {
      this.spawnBall();
    }
  },

  onDone: function(p) {
    //sh.xcfg.sfxPlay(this.sfx.game_end);
    this.replayBtn.toggleVisible(true);
    this.lastWinner = p;
  },

  guiBtns: function() {
    var x, y, me=this, csts= sh.xcfg.csts;
    var c= this.getCenter();
    var gid= 'gui-btns';
    this.createLayerEx(gid);

    // settings btn
    //x= (csts.GRID_W - csts.SIDE) * csts.TILE - csts.BTN_SIZE - 4;
    //x= (csts.GRID_W  * csts.TILE) - csts.BTN_SIZE;
    y= csts.TILE + csts.S_OFF;
    x= c.x - csts.BTN_SIZE / 2;
    var setts= asterix.XButtonFactory.define({
      animSheet: new ig.AnimationSheet('media/impact/btns/settings-x32.png', 32, 32),
      size: { x: 32, y: 32 },
      _layer: gid,
      typeiid: 'EntityHomeBtn',
      clicker: function() { sh.xcfg.smac.settings(); }
    });
    this.spawnEntity(setts, x , y, {});

    // replay btn
    y = ig.system.height - csts.TILE - csts.BTN_SIZE - csts.S_OFF;
    //y = c.y - csts.BTN_SIZE / 2;
    x = c.x - csts.BTN_SIZE / 2;
    var repy= asterix.XButtonFactory.define({
      animSheet: new ig.AnimationSheet('media/impact/btns/replay-x32.png', 32, 32),
      size: { x:32, y:32 },
      _layer: gid,
      typeiid: 'EntityReplayBtn',
      clicker: function() {
        sh.xcfg.smac.replay();
        this.visible=false;
      }
    });
    this.replayBtn= this.spawnEntity(repy, x , y, {});
    this.replayBtn.toggleVisible(false);
  },

  gui: function() {
    var c= this.getCenter(this.pos, this.size);
    var lbl, csts = sh.xcfg.csts;
    var me=this, gid= 'gui';

    this.createLayer(gid);

    // scores
    lbl = new ig.XLabel(gid, this.fontScore);
    lbl.update= function() {
      var s1 = me.scores[me.players[1].getColor()];
      this.text = global.ZotohLabs.prettyNumber(s1,2);
      this.x = c.x - 20 - this.font.widthForString(this.text) - csts.BTN_SIZE / 2;
      this.y = csts.TILE + 10 ;
    };
    this.addItem(lbl);

    lbl = new ig.XLabel(gid, this.fontScore);
    lbl.update= function() {
      var s2 = me.scores[me.players[2].getColor()];
      this.text = global.ZotohLabs.prettyNumber(s2,2);
      this.y = csts.TILE + 10 ;
      this.x = c.x + 20 + csts.BTN_SIZE / 2;
    };
    this.addItem(lbl);
    this.guiBtns();
  },

  setGameMode: function(mode) {
    this.parent(mode);
    this.p2ID= sh.l10n("%p2");
    this.p1ID= sh.l10n("%p1");
    if (mode === 1) {
      this.p2Long= sh.l10n('%computer');
      this.p2ID= sh.l10n('%cpu');
    }
  },

  init: function(mode) {
    this.setGameMode(mode);
    this.parent();
    this.gui();
    this.start();
  }

});






}).call(this);





