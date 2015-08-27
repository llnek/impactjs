// Copyright (c) 2013 Cherimoia, LLC. All rights reserved.
//
// This library is distributed in the hope that it will be useful
// but without any warranty; without even the implied warranty of
// merchantability or fitness for a particular purpose.
//
// The use and distribution terms for this software are covered by the
// Eclipse Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
// which can be found in the file epl-v10.html at the root of this distribution.
//
// By using this software in any fashion, you are agreeing to be bound by
// the terms of this license.
// You must not remove this notice, or any other, from this software.
//
(function (undef) { "use strict"; var global = this; _ = global._ ; //////////////////////////

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
ig.module('zotohlabs.ents.void').requires('impact.entity').defines(function () {

  global.EntityVoid = ig.Entity.extend({

    _wmBoxColor:'rgba(128, 28, 230, 0.7)',
    _wmDrawBox:true,
    _wmScalable:true,

    size:{x:8, y:8},

    update: function () {},

    init: function(x,y,settings) {
      this.parent(x,y,settings);
    }

  });

});

}).call(this);


