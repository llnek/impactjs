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

(function(undef) { "use strict"; var global= this; var _ = global._ ;
var asterix= global.ZotohLabs.Asterix;
var sh= asterix.Shell;
var loggr= global.ZotohLabs.logger;
var echt= global.ZotohLabs.echt;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////

asterix.XGame = ig.Game.extend({

  eveids: ['clicked','space','enter','ctrl','esc','right','left','down','up'],
  font: new ig.Font('media/impact/fon/en/04b03.font.png'),

  previous: null,

  gravity: sh.xcfg.system.gravity,
  levelTimer:new ig.Timer(),
  name: '',
  stats:null,
  isGameOver:false,

  loadLevel: function (data) {
    //this.stats = {time:0, deaths:0};
    this.parent(data);
    this.levelTimer.reset();
    if (this.defaultInstructions) {
      switch (this.defaultInstructions.toLowerCase()) {
        case "none":
        case "":
        break;
        default:
          this.displayCaption(this.defaultInstructions, 7);
      }
    }
  },

  getGameMode: function() { return sh.xcfg.csts.GAME_MODE; },
  setGameMode: function(mode) {
    if (mode) {
      sh.xcfg.csts.GAME_MODE = mode;
    }
  },

  /*
  run: function() {
    if (! sh.xcfg.firstRun()) {
      sh.xcfg.fireFirstRun();
    }
    this.parent();
  },
  */

  disableSound: function() {
    sh.xcfg.toggleSfx(false);
  },

  enableSound: function() {
    sh.xcfg.toggleSfx(true);
  },

  /*
  update: function () {
    this.parent();
  },
  */

  onPause: function () {
    this.parent();
    this.levelTimer.pause();
    this.hideCaption();
  },

  onResume: function() {
    this.parent();
    this.levelTimer.unpause();
  },

  onPlayerDeath: function () {
    // Set the isGameOver and pause value to false
    this.isGameOver = true;
    this.paused = true;
    this.showDeathMessage();
  },

  showDeathMessage: function() {
      // Show the game over menu
      //this.showMenu(new Menu("Game Over"));
  },

  reloadLevel: function () {
    this.isGameOver = false;
    if (this.paused) { this.togglePause(false); }
    this.loadLevelByFileName(this.currentLevelName, true);
  },

  preStart: function() {},
  start: function() {
    this.bindEvents();
    this.preStart();
    this.onStart();
  },

  restart: function() {
    this.onRestart();
  },

  onRestart: function() {
    this.start();
  },

  onStart: function() {},
  onEnd: function() {},

  stop: function() {
    this.unbindEvents();
    this.onEnd();
  },

  unbindEvents: function() {
    //ig.input.unbindAll();
  },

  bindEvents: function() {
  /*
    ig.input.bind( ig.KEY.MOUSE1, this.eveids[0]);
    ig.input.bind( ig.KEY.SPACE, this.eveids[1]);
    ig.input.bind( ig.KEY.ENTER, this.eveids[2]);
    ig.input.bind( ig.KEY.CTRL, this.eveids[3]);
    ig.input.bind( ig.KEY.ESC, this.eveids[4]);
    ig.input.bind( ig.KEY.RIGHT_ARROW, this.eveids[5]);
    ig.input.bind( ig.KEY.LEFT_ARROW, this.eveids[6]);
    ig.input.bind( ig.KEY.DOWN_ARROW, this.eveids[7]);
    ig.input.bind( ig.KEY.UP_ARROW, this.eveids[8]);
    */
  },

  pressed: function(event,now) {
    return now ? ig.input.state(event) : ig.input.pressed(event);
  },

  init: function() {
    this.parent();
    var lv = sh.xcfg.levels[ this.name ];
    if (lv) {
      this.loadLevelByFileName(lv.main);
    }

    sh.xcfg.sfxInit();
    sh.xcfg.ioInit();
  }

});





}).call(this);


