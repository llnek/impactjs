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

(function (undef) { "use strict"; var global = this; var _ = global._ ;
var loggr= global.ZotohLabs.logger;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
ig.module('plugins.menu').requires( 'impact.game',
'impact.font').defines(function () {

  ig.XMenu = ig.Class.extend({

    menuFont: new ig.Font('media/impact/fon/04b03.font.png'),
    borderColor: '#fff',
    bgColor: 'rgba(0,0,0,0.8)',
    title: null,

    update: function() {
    },

    draw: function () {
      this.drawModal();
      this.drawTitle();
    },

    drawTitle: function() {
      if (this.title) {
        this.menuFont.draw(this.title,
          ig.system.realWidth * 0.5,
          16,
          ig.Font.ALIGN.CENTER);
      }
    },

    drawModal: function() {
      ig.system.context.fillStyle = this.bgColor;
      ig.system.context.fillRect(0, 0, ig.system.realWidth, ig.system.realHeight);
      ig.system.context.strokeStyle = this.borderColor;
      ig.system.context.lineWidth = 4;
      ig.system.context.strokeRect(0, 0, ig.system.realWidth, ig.system.realHeight);
    },

    finz: function() {
    },

    init: function (settings) {
      settings = settings || {};
      if (settings.title) { this.title = settings.title; }
      //this.title = settings.title ? settings.title : "Menu Title";
    }

  });

  ig.Game.inject({

    modalMenu: null,

    update: function () {
      this.parent();
      if (this.modalMenu) {
        this.modalMenu.update();
      }
    },

    draw: function () {
      this.parent();
      if (this.modalMenu) {
        this.modalMenu.draw();
      }
    },

    showMenu: function (m) {
      if (m && m.draw) {
        this.modalMenu = m;
      }
    },

    hideMenu: function () {
      var m= this.modalMenu;
      try {
        if (m && m.finz) { m.finz(); }
      } finally {
        this.modalMenu = null;
      }
    },

    loadLevel: function (data) {
      this.hideMenu();
      this.parent(data);
    }

  });


});



}).call(this);


