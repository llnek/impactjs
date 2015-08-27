// This library is distributed in  the hope that it will be useful but without
// any  warranty; without  even  the  implied  warranty of  merchantability or
// fitness for a particular purpose.
//
// The use and distribution terms for this software are covered by the Eclipse
// Public License 1.0  (http://opensource.org/licenses/eclipse-1.0.php)  which
// can be found in the file epl-v10.html at the root of this distribution.
//
// By using this software in any  fashion, you are agreeing to be bound by the
// terms of this license. You  must not remove this notice, or any other, from
// this software.
//
// Copyright (c) 2013 Cherimoia, LLC. All rights reserved.

(function (undef) { "use strict"; var global = this; _ = global._ ;
var loggr= global.ZotohLabs.logger;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
ig.module('plugins.mini-map').requires( 'impact.debug.menu',
'impact.game',
'impact.background-map').defines(function () {

  ig.XMiniMap = ig.Class.extend({

    mapScreens: [],
    maps: [],
    scale: 1,

    load: function (game, scale) {
      if (!game || game.backgroundMaps.length === 0) { return; }
      this.ctx = this.mapCanvas.getContext('2d');
      this.mapCanvas = ig.$new('canvas');
      this.scale = scale;

      this.maps = game.backgroundMaps;
      this.mapScreens = [];

      var me=this; _.each(this.maps, function(z) {
        me.generateMiniMap(me.ctx, z);
      });
    },

    generateMiniMap: function (context, map) {
      var s = this.scale;//ig.system.scale; // we'll need this a lot
      // resize the tileset, so that one tile is 's' pixels wide and high
      var ts = ig.$new('canvas');
      var h = map.tiles.height * s;
      var w = map.tiles.width * s;
      var ws = w / map.tilesize;
      var hs = h / map.tilesize;
      ts.getContext('2d').drawImage(map.tiles.data, 0, 0, w, h, 0, 0, ws, hs);
      loggr.log("Mini map size", w, h, ws, hs);
      // create the minimap canvas
      var mapCanvas = ig.$new('canvas');
      mapCanvas.height = map.height * s;
      mapCanvas.width = map.width * s;
      var ctx = context;//mapCanvas.getContext('2d');

      if (ig.game.clearColor) {
        ctx.fillStyle = ig.game.clearColor;
        ctx.fillRect(0, 0, ws, hs);
      }

      // draw the map
      var r,c,tile;
      for (c = 0; c < map.width; ++c) {
        for (r = 0; r < map.height; ++r) {
          tile = map.data[r][c];
          if (tile) {
            ctx.drawImage( ts,
                  Math.floor(((tile - 1) * s) % ws),
                  Math.floor((tile - 1) * s / ws) * s,
                  s, s,
                  x * s, y * s,
                  s, s
                  );
          }
        }
      }
    }

  });

  ig.Game.inject({

    miniMapInstance: new ig.XMiniMap(), //TODO need a way to set the scale of the mini-map
    miniMapHighlightColor: '#f00',
    showMiniMap:true,
    miniMapScale: 4,

    miniMapPosition: {x:10, y:10},
    miniMapViewPort: {x:0, y:0},
    miniMapView:{x:0, y:0},

    loadLevel: function (data) {
      this.parent(data);
      this.miniMapInstance.load(this, this.miniMapScale);
      var map = this.backgroundMaps[0];
      var s = ig.system.scale;
      this.miniMapViewPort = { x: ((ig.system.width / map.tilesize) * s - 2), y:((ig.system.height / map.tilesize) * s - 2) };
    },

    draw: function () {
      this.parent();
      this.onDrawMiniMap();
    },

    onDrawMiniMap: function() {
      if (this.showMiniMap && this.miniMapInstance.mapCanvas && this.backgroundMaps) {
          var s = this.miniMapInstance.scale;//ig.system.scale;
          var ctx = ig.system.context;
          // Draw Map
          ctx.drawImage(this.miniMapInstance.mapCanvas, this.miniMapPosition.x, this.miniMapPosition.y);
          var map = this.backgroundMaps[0];
          // Get visible area
          var x = map.scroll.x / map.tilesize;
          var y = map.scroll.y / map.tilesize;
          // Draw box around visible area
          ctx.strokeStyle = this.miniMapHighlightColor;
          ctx.strokeRect(x * s + this.miniMapPosition.x, y * s + this.miniMapPosition.y, this.miniMapViewPort.x, this.miniMapViewPort.y);
      }
    }

  });


});

}).call( this);

