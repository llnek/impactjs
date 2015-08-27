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

(function (undef) { "use strict"; var global = this; var _ = global._ ;
var asterix= global.ZotohLabs.Asterix;
var loggr= global.ZotohLabs.logger;
var echt= global.ZotohLabs.echt;

//////////////////////////////////////////////////////////////////////////////
// module def: button
//////////////////////////////////////////////////////////////////////////////
ig.XClickable = ig.Entity.extend({

  bindClicker: function(cb) {
    this.clicker= cb;
  },

  checkSelect: function(mx,my) {
    return ig.game.pressed(this.eventid) && this.isHover(mx,my);
  },

  onUpdate: function() {
    if (this.checkSelect(ig.input.mouse.x,ig.input.mouse.y)) {
      this.onclick();
    }
  },

  update: function() {
    if (this.visible) {
      this.parent();
      this.onUpdate();
    }
  },

  isHover: function(mx,my) {
    var px = this.pos.x - this.offset.x - ig.game._rscreen.x;
    var py = this.pos.y - this.offset.y - ig.game._rscreen.y;
    //var mx = ig.input.mouse.x;
    //var my = ig.input.mouse.y;
    return mx >= px && mx < (px + this.size.x) && my >= py && my < py + this.size.y;
  },

  onclick: function() {
    if (this.clicker) {
      this.clicker.call(this.clickerContext || this);
    }
  },

  draw: function() {
    if (this.visible) {
      this.parent();
      this.drawMore();
    }
  },

  drawMore: function() {
    if (this.textExtra) {
      var sz= ig.game.getTextSize(this.textExtra.font, this.textExtra.text);
      var offy= this.textExtra.offy || 0;
      var offx= this.textExtra.offx || 0;
      var x,y;
      if (this.textExtra.center === true) {
        y= this.pos.y + (this.size.y - sz[1] ) /2  + offy;
        x= this.pos.x + (this.size.x - sz[0] ) /2  + offx;
      } else {
        y= this.pos.y + ( this.size.y - sz[1] ) / 2 ;
        x= this.pos.x + this.textExtra.offx;
      }
      this.textExtra.font.draw(this.textExtra.text, x, y);
    }
  },

  init: function(x,y,settings) {
    this.parent(x,y,settings);
    this.eventid = this.eventid || 'clicked';
  }

});

ig.XTextButton= ig.XClickable.extend({

  getFont: function() { return this.font; },

  getText: function() { return this.text; },

  draw: function() {
    if (this.visible) {
      this.font.draw(this.text, this.pos.x,this.pos.y);
    }
  },

  init: function(x,y,options) {
    this.parent(x,y,options);
  }

});

ig.XButton = ig.XClickable.extend({

  setAnims: function() {
  },

  typeiid: 'XButton',

  init: function(x, y, options) {
    this.parent(x, y, options);
    if (_.isObject(this.animDefs)) {
    } else {
      this.animDefs= { 'show' : [1, [0]] };
    }
    var me=this; _.each(this.animDefs,function(v,k) {
      me.addAnim(k, v[0], v[1]);
    });
    this.setAnims();
  }

});

//////////////////////////////////////////////////////////////////////////////
// module def: caption
//////////////////////////////////////////////////////////////////////////////
ig.XCaption = ig.Class.extend({

  timer: null,
  text: null,

  direction: 1,
  delay: -1,
  font: null, //new ig.Font('media/impact/fon/04b03.font.png'),

  x: 0,
  y: 0,

  draw: function () {
    if (this.timer && this.delay < 0) {
      return;
    }
    /*
    ig.system.context.fillStyle = 'rgba(0,0,0,0.8)';
    ig.system.context.fillRect(0, //0 * ig.system.scale,
      (ig.system.height - 16) * ig.system.scale,
      ig.system.width * ig.system.scale, ig.system.height * ig.system.scale);
    */
    if (echt(this.text)) {
      this.font.draw(this.text, this.x, this.y, ig.Font.ALIGN.CENTER);
    }

    if (this.timer && this.timer.delta() > this.delay) {
      this.delay = -1;
    }
  },

  show: function (value, delay) {
    if (this.timer) {
      this.delay = delay;
      this.timer.reset();
    }
    this.text = value;
  },

  hide: function () {
    this.delay = -1;
  },

  init: function (x,y,fixed) {
    fixed = echt(fixed) ? fixed : true;
    this.fixed= fixed;
    this.y= y;
    this.x= x;
    if (! fixed) {
      this.timer = new ig.Timer();
    }
  }


});

//////////////////////////////////////////////////////////////////////////////
// module def: text label
//////////////////////////////////////////////////////////////////////////////
ig.XLabel = ig.Class.extend({

  update: function() {
    //throw new Error("You need to implement update()");
  },

  moveTo: function(newx,newy) {
    this.x = newx;
    this.y = newy;
  },

  setText: function(msg) {
    this.text= msg || '';
  },

  getPos: function() {
    return [this.x, this.y];
  },

  getSize: function() {
    return ig.game.getTextSize(this.font,this.text);
  },

  draw: function() {
    this.font.draw(this.text, this.x, this.y, ig.Font.ALIGN.LEFT);
  },

  x: 0,
  y: 0,

  init: function(group,font,text) {
    this._layer= group;
    this.font=font;
    this.text= text || '';
  }

});


}).call(this);


