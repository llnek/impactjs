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

(function (document, undef) { "use strict"; var global = this; _ = global._ ;
var asterix= global.ZotohLabs.Asterix;
var sh = asterix.Shell;
var loggr= global.ZotohLabs.logger;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////

sh.xcfg.setGameSize('default');

if (ig.ua.mobile) {
  ig.Sound.enabled = false;
} else {
  var controls = document.getElementById("controls");
  if (controls) {
    document.getElementById('game-container').removeChild(controls);
  }
}

if (ig.ua.iPhone) {
  sh.xcfg.setGameSize('iphone');
}
else if (ig.ua.android) {
  sh.xcfg.setGameSize('android');
}
else if (ig.ua.iPad) {
  sh.xcfg.setGameSize('ipad');
}


}).call(this, document);


