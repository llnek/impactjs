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
var loggr= global.ZotohLabs.logger;
var echt= global.ZotohLabs.echt;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////

ig.Game.inject({

  displayCaption: function (value, delay) {
    this.captionInst.show(value, delay ? delay : 2);
  },

  hideCaption: function () {
    this.captionInst.hide();
  },

  captionInst: new ig.XCaption(),
  flip: false,

  // this field is used in layers but not defined?, so define it here
  _pauseRun: false,
  paused: false,
  pauseDelayTimer: new ig.Timer(),
  pauseButtonDelay: 0.3,

  togglePause: function (override) {
    if (this.pauseDelayTimer.delta() > this.pauseButtonDelay) {
      this.paused = override != null ? override : !this.paused;
      this._pauseRun = this.paused;
      if (!this.paused) {
        this.onResume();
      } else {
        this.onPause();
      }
      this.pauseDelayTimer.reset();
    }
  },

  onResume: function () { },

  onPause: function () { },

  update: function() {
    if (this.paused) {} else {
      this.parent();
      this.frameUpdate();
    }
  },

  frameUpdate: function() {
  },

  drawGui: function() {
  },

  draw: function() {
    this.parent();
    this.drawGui();
    //this.captionInst.draw();
  },

  loadLevelByFileName: function (value, deferred) {
    this.currentLevelName = value.replace(/^(Level)?(\w)(\w*)/,
        function (m, l, a, b) {
            return a.toUpperCase() + b;
        }).replace(".js", "");
    var levelData = ig.global['Level' + this.currentLevelName];
    if (!levelData) {
      throw new Error("Cannot find levelData: " + this.currentLevelName);
    }
    this[ deferred ? "loadLevelDeferred" : "loadLevel"](levelData);
    loggr.debug("levelData", this.currentLevelName);
  },

  currentLevelName: null,

  getCenter: function() {
    return { x: Math.floor( ig.system.width / 2), y: Math.floor( ig.system.height / 2) };
  },

  removeEntityTypes: function(ent) {
    _.each(this.getEntitiesByType(ent), function(e) {
      e.kill();
    });
  },

  getTextSize: function(ft,msg) {
    return [ ft.widthForString(msg), ft.heightForString(msg) ];
  },

  createLayerEx: function(layerid) {
    this.createLayer(layerid, { clearOnLoad: true, entityLayer: true });
  }

});




}).call(this);


