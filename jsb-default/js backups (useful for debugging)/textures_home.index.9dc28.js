window.__require = function e(t, o, a) {
function n(i, s) {
if (!o[i]) {
if (!t[i]) {
var c = i.split("/");
c = c[c.length - 1];
if (!t[c]) {
var r = "function" == typeof __require && __require;
if (!s && r) return r(c, !0);
if (l) return l(c, !0);
throw new Error("Cannot find module '" + i + "'");
}
i = c;
}
var d = o[i] = {
exports: {}
};
t[i][0].call(d.exports, function(e) {
return n(t[i][1][e] || e);
}, d, d.exports, e, t, o, a);
}
return o[i].exports;
}
for (var l = "function" == typeof __require && __require, i = 0; i < a.length; i++) n(a[i]);
return n;
}({
Code: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "621109ieSZNH5aMQff17woV", "Code");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator, s = i.ccclass, c = i.property, r = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.codebg = [];
return t;
}
t.prototype.onLoad = function() {};
t.prototype.start = function() {};
t.prototype.onEnable = function() {
this.codebg[0].on(cc.Node.EventType.TOUCH_START, this.on_touch_start_0, this);
this.codebg[0].on(cc.Node.EventType.TOUCH_END, this.on_touch_end_0, this);
this.codebg[1].on(cc.Node.EventType.TOUCH_START, this.on_touch_start_1, this);
this.codebg[1].on(cc.Node.EventType.TOUCH_END, this.on_touch_end_1, this);
this.codebg[2].on(cc.Node.EventType.TOUCH_START, this.on_touch_start_2, this);
this.codebg[2].on(cc.Node.EventType.TOUCH_END, this.on_touch_end_2, this);
this.codebg[3].on(cc.Node.EventType.TOUCH_START, this.on_touch_start_3, this);
this.codebg[3].on(cc.Node.EventType.TOUCH_END, this.on_touch_end_3, this);
};
t.prototype.onDestroy = function() {
this.codebg[0].off(cc.Node.EventType.TOUCH_START, this.on_touch_start_0, this);
this.codebg[0].off(cc.Node.EventType.TOUCH_END, this.on_touch_end_0, this);
this.codebg[1].off(cc.Node.EventType.TOUCH_START, this.on_touch_start_1, this);
this.codebg[1].off(cc.Node.EventType.TOUCH_END, this.on_touch_end_1, this);
this.codebg[2].off(cc.Node.EventType.TOUCH_START, this.on_touch_start_2, this);
this.codebg[2].off(cc.Node.EventType.TOUCH_END, this.on_touch_end_2, this);
this.codebg[3].off(cc.Node.EventType.TOUCH_START, this.on_touch_start_3, this);
this.codebg[3].off(cc.Node.EventType.TOUCH_END, this.on_touch_end_3, this);
};
t.prototype.on_touch_start_0 = function() {};
t.prototype.on_touch_end_0 = function() {
var e = Number(this.codebg[0].children[0].getComponent(cc.Label).string);
e += 1;
this.codebg[0].children[0].getComponent(cc.Label).string = e % 10 + "";
};
t.prototype.on_touch_start_1 = function() {};
t.prototype.on_touch_end_1 = function() {
var e = Number(this.codebg[1].children[0].getComponent(cc.Label).string);
e += 1;
this.codebg[1].children[0].getComponent(cc.Label).string = e % 10 + "";
};
t.prototype.on_touch_start_2 = function() {};
t.prototype.on_touch_end_2 = function() {
var e = Number(this.codebg[2].children[0].getComponent(cc.Label).string);
e += 1;
this.codebg[2].children[0].getComponent(cc.Label).string = e % 10 + "";
};
t.prototype.on_touch_start_3 = function() {};
t.prototype.on_touch_end_3 = function() {
var e = Number(this.codebg[3].children[0].getComponent(cc.Label).string);
e += 1;
this.codebg[3].children[0].getComponent(cc.Label).string = e % 10 + "";
};
t.prototype.update = function() {};
l([ c(cc.Node) ], t.prototype, "codebg", void 0);
return l([ s ], t);
}(cc.Component);
o.default = r;
cc._RF.pop();
}, {} ],
ComTipDesxc: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f4d36uJg5JNhLU6XyY4aPbx", "ComTipDesxc");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../way/Toast"), s = cc._decorator, c = s.ccclass, r = s.property, d = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.descLabelNode = null;
t.localp = null;
return t;
}
t.prototype.onLoad = function() {
this.localp = this.node.position;
this.restart();
};
t.prototype.restart = function() {
for (var e = this, t = [], o = 0; o < arguments.length; o++) t[o] = arguments[o];
for (var a = "", n = 0; n < t.length; n++) a += t[n] + " ";
this.node.position = this.localp, i.default.updateString(this.descLabelNode, a), 
this.node.stopAllActions();
var l = [];
l.push(cc.fadeIn(.2)), l.push(cc.moveBy(.5, cc.v2(0, 200))), l.push(cc.delayTime(1)), 
l.push(cc.fadeOut(.2)), l.push(cc.callFunc(function(t) {
e.node.removeFromParent(), i.default.repushNode(t);
})), this.node.runAction(cc.sequence(l));
};
l([ r(cc.Node) ], t.prototype, "descLabelNode", void 0);
return l([ c ], t);
}(cc.Component);
o.default = d;
cc._RF.pop();
}, {
"../way/Toast": "Toast"
} ],
Deblock_talk_peo: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "61b30p/Bl1HeZCamas8JQ3r", "Deblock_talk_peo");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../userStore/stateType"), s = e("../../../textures_load/scripts/music/musicControl"), c = e("../../../textures_load/scripts/userStore/userStore"), r = e("../../../textures_load/scripts/ways/eventPost"), d = e("../../../textures_load/scripts/ways/load_Json_Pic"), u = cc._decorator, p = u.ccclass, f = u.property, h = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.label = null;
t.peopic = null;
t.guesshad = !1;
t.shua = !1;
return t;
}
t.prototype.onLoad = function() {
r.default.Env_data("setting_state", "off");
console.log("deblock", c.default.deblock);
this.node.getChildByName("sure").active = !1;
this.node.getChildByName("name").active = !1;
this.node.getChildByName("text").active = !1;
this.deblock_storge();
this.initdeblcokSce();
};
t.prototype.start = function() {};
t.prototype.deblock_storge = function() {
this.guesshad = !1;
c.default.deblock[0] == i.talkStrikeType.deblock_peo ? d.default.loadJson(c.default.peopleTable).then(function(e) {
if (e) for (var t = 0; t < e.length; t++) if (e[t].peoName == c.default.deblock[1]) if (-1 != c.default.localdate.people.indexOf(e[t].peoId)) console.log("people", c.default.localdate.people); else {
c.default.localdate.people.push(e[t].peoId);
c.default.localdate.peoplenew.push(1);
r.default.Env("updata_tip");
console.log("people", c.default.localdate.people);
console.log("peoplenew", c.default.localdate.peoplenew);
}
}) : c.default.deblock[0] == i.talkStrikeType.deblock_room || c.default.deblock[0] == i.talkStrikeType.deblock_guess || (c.default.deblock[0], 
i.talkStrikeType.deblock_prop);
};
t.prototype.initdeblcokSce = function() {
var e = this;
d.default.loadJson(c.default.peopleTable).then(function(t) {
if (t) for (var o = function(o) {
if (t[o].peoName == c.default.deblock[1]) {
e.peodeta = t[o].peoDeta;
e.namepic = t[o].peoname;
var a = t[o].peoPic;
d.default.loadJson(c.default.picTable).then(function(t) {
if (t) for (var o = 0, n = t.length; o < n; o++) if (t[o].picId == a) {
var l = t[o].picName;
d.default.loadPic(l).then(function(t) {
t && (e.peopic.getComponent(cc.Sprite).spriteFrame = t);
});
}
});
}
}, a = 0; a < t.length; a++) o(a);
});
this.shua = !0;
};
t.prototype.namexinshi = function() {
var e = this;
this.node.getChildByName("text").active = !0;
this.label.string = this.peodeta;
d.default.loadJson(c.default.picTable).then(function(t) {
if (t) for (var o = 0, a = t.length; o < a; o++) if (t[o].picId == e.namepic) {
var n = t[o].picName;
d.default.loadPic(n).then(function(t) {
if (t) {
e.node.getChildByName("name").active = !0;
e.node.getChildByName("name").getComponent(cc.Sprite).spriteFrame = t;
s.default.playEffect("music_010");
e.node.getChildByName("name").runAction(cc.sequence(cc.scaleTo(.1, 2, 2), cc.scaleTo(.1, 1, 1), cc.callFunc(function() {
e.node.getChildByName("sure").active = !0;
})));
}
});
}
});
};
t.prototype.sure = function() {
s.default.playEffect("music_009");
r.default.Env("ontouch");
r.default.Env_data("setting_state", "on");
this.node.destroy();
};
t.prototype.update = function() {
if (this.shua) {
this.node.getChildByName("mask").height += 100;
if (this.node.getChildByName("mask").height >= 3200) {
this.shua = !1;
this.namexinshi();
}
}
};
l([ f(cc.Label) ], t.prototype, "label", void 0);
l([ f(cc.Node) ], t.prototype, "peopic", void 0);
return l([ p ], t);
}(cc.Component);
o.default = h;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0,
"../userStore/stateType": "stateType"
} ],
Deblock_talk: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "b74dflg1NtP87kMT/FKOVnA", "Deblock_talk");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../userStore/stateType"), s = e("../userStore/guessData"), c = e("../../../textures_load/scripts/music/musicControl"), r = e("../bannerMan/bannerMan"), d = e("../../../textures_load/scripts/userStore/userStore"), u = e("../../../textures_load/scripts/ways/eventPost"), p = e("../../../textures_load/scripts/ways/load_Json_Pic"), f = cc._decorator, h = f.ccclass, g = f.property, _ = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.label = null;
t.peopic = null;
t.guesshad = !1;
return t;
}
t.prototype.onLoad = function() {
console.log("deblock", d.default.deblock);
this.deblock_storge();
this.initdeblcokSce();
};
t.prototype.start = function() {
r.default.show("解锁猜想");
};
t.prototype.deblock_storge = function() {
var e = this;
this.guesshad = !1;
if (d.default.deblock[0] == i.talkStrikeType.deblock_peo) ; else if (d.default.deblock[0] == i.talkStrikeType.deblock_room) ; else if (d.default.deblock[0] == i.talkStrikeType.deblock_guess) {
console.log("猜想", d.default.deblock);
p.default.loadJson(d.default.guessTable).then(function(t) {
if (t) for (var o = 0; o < t.length; o++) if (t[o].guessName == d.default.deblock[1]) {
for (var a = 0; a < d.default.localdate.guess.length; a++) d.default.localdate.guess[a].id == t[o].guessOrder && (e.guesshad = !0);
if (!e.guesshad) {
d.default.localdate.guess.push(new s.guessData(t[o].guessOrder, null, i.guessType.unLocked));
console.log("guess", d.default.localdate.guess);
d.default.localdate.guessnew.push(1);
console.log("guessnew", d.default.localdate.guessnew);
u.default.Env("updata_tip");
u.default.Env_apkevent_param("event_guess", "第" + d.default.localdate.chapter + "章/" + t[o].guessOrder + "/解锁猜想");
}
}
});
} else d.default.deblock[0], i.talkStrikeType.deblock_prop;
};
t.prototype.initdeblcokSce = function() {
var e = this;
this.label.string = d.default.deblock[1];
this.peopic.getChildByName("lab").getComponent(cc.Label).string = d.default.deblock[1];
var t = d.default.deblock[2];
p.default.loadPic(t).then(function(t) {
t && (e.peopic.getComponent(cc.Sprite).spriteFrame = t);
});
};
t.prototype.sure = function() {
c.default.playEffect("music_009");
d.default.deblock[0] == i.talkStrikeType.deblock_guess && (d.default.isnowatmenu ? u.default.Env_data("flytonote_guess", "guess") : u.default.Env_data("flytonote", "guess"));
r.default.hide();
};
t.prototype.update = function() {};
l([ g(cc.Label) ], t.prototype, "label", void 0);
l([ g(cc.Node) ], t.prototype, "peopic", void 0);
return l([ h ], t);
}(cc.Component);
o.default = _;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0,
"../bannerMan/bannerMan": "bannerMan",
"../userStore/guessData": "guessData",
"../userStore/stateType": "stateType"
} ],
Deblock_touch: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "6e2b2YYLJ1Nt7Y9jfQDuNkO", "Deblock_touch");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../userStore/stateType"), s = e("../userStore/propData"), c = e("../../../textures_load/scripts/music/musicControl"), r = e("../way/guideNew"), d = e("../bannerMan/bannerMan"), u = e("../../../textures_load/scripts/userStore/userStore"), p = e("../../../textures_load/scripts/ways/eventPost"), f = e("../../../textures_load/scripts/ways/load_Json_Pic"), h = cc._decorator, g = h.ccclass, _ = h.property, y = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.label = null;
t.peopic = null;
t.prophave = !1;
return t;
}
t.prototype.onLoad = function() {
console.log("deblock", u.default.deblock);
this.deblock_storge();
this.initdeblcokSce();
};
t.prototype.start = function() {
d.default.show("解锁道具");
};
t.prototype.deblock_storge = function() {
var e = this;
u.default.deblock[0] == i.touchPicaffect.go_room || (u.default.deblock[0] == i.touchPicaffect.get_prop ? f.default.loadJson(u.default.propTable).then(function(t) {
if (t) for (var o = 0; o < t.length; o++) if (t[o].prop == u.default.deblock[1]) {
for (var a = 0; a < u.default.localdate.prop.length; a++) u.default.localdate.prop[a].id == t[o].propNum && (e.prophave = !0);
if (!e.prophave) {
u.default.localdate.prop.unshift(new s.propData(t[o].propNum, t[o].prop, i.propType.New, t[o].time, !1, null, t[o].verPower));
console.log("propnohave", u.default.localdate.prop);
p.default.Env("updata_tip");
p.default.Env_apkevent_param("event_prop", "第" + u.default.localdate.chapter + "章/" + t[o].propNum + "/解锁道具");
}
}
}) : (u.default.deblock[0], i.touchPicaffect.loupe));
};
t.prototype.initdeblcokSce = function() {
var e = this;
console.log("获得道具", u.default.deblock);
this.label.string = u.default.deblock[1];
var t = u.default.deblock[2];
f.default.loadJson(u.default.propTable).then(function(o) {
if (o) for (var a = function() {
if (o[n].propNum == t) {
var a = o[n].propPic;
f.default.loadJson(u.default.picTable).then(function(t) {
if (t) for (var o = 0; o < t.length; o++) if (t[o].picId == a) {
var n = t[o].picName;
f.default.loadPic(n).then(function(t) {
t && (e.peopic.getComponent(cc.Sprite).spriteFrame = t);
});
}
});
}
}, n = 0; n < o.length; n++) a();
});
};
t.prototype.sure = function() {
c.default.playEffect("music_009");
u.default.isnowatmenu ? p.default.Env_data("flytonote_guess", "prop") : p.default.Env_data("flytonote", "prop");
r.default.next_guide();
d.default.hide();
};
t.prototype.update = function() {};
l([ _(cc.Label) ], t.prototype, "label", void 0);
l([ _(cc.Node) ], t.prototype, "peopic", void 0);
return l([ g ], t);
}(cc.Component);
o.default = y;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0,
"../bannerMan/bannerMan": "bannerMan",
"../userStore/propData": "propData",
"../userStore/stateType": "stateType",
"../way/guideNew": "guideNew"
} ],
Home: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e93abLmIgFEZY69ZJl2EJYJ", "Home");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../userStore/postLocaldata"), s = e("../way/recomScene"), c = e("../userStore/stateType"), r = e("../way/Toast"), d = e("../way/guideNew"), u = e("../../../textures_load/scripts/music/musicControl"), p = e("../way/new_Tip_num"), f = e("../../../textures_load/scripts/userStore/userStore"), h = e("../../../textures_load/scripts/ways/addPower"), g = e("../../../textures_load/scripts/ways/canvasSize"), _ = e("../../../textures_load/scripts/ways/eventPost"), y = e("../../../textures_load/scripts/ways/load_Json_Pic"), m = e("../way/recode"), v = e("../music/music_effect"), C = cc._decorator, b = C.ccclass, N = C.property, w = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.top = null;
t.notes = null;
t.code = null;
t.talk = null;
t.deblock = [];
t.guess_choose = null;
t.close_case_pre = null;
t.close_case_false_pre = null;
t.up_text_video = null;
t.up_watch_video_get_power = null;
t.poweranimpre = null;
t.proptippre = null;
t.guide_new_pre = null;
t.maskpre = null;
t.turnScep = null;
t.mappre = null;
t.case_true_false_pre = null;
t.jiean_animpic = [];
t.settingpre = null;
t.nextchapter_power = null;
t.deblockpre = null;
t.deblockpre_guess = null;
t.deblockpre_peo = null;
t.deblockpre_prop = null;
t.toppre = null;
t.prophave = !1;
t.prophaverecode = !1;
t.notespre = null;
t.isLoupe = !1;
t.Loupenode = null;
t.this_btn_clicked = !1;
t.startchangejieananim = !1;
t.timejiean = 0;
t.num = 0;
t.up_watch_video_get_power_tc = null;
t.up_text_video_tc = null;
return t;
}
t.prototype.onLoad = function() {
g.default.canvasSize();
this.goonLoad();
this.node.getChildByName("mus").zIndex = 100;
};
t.prototype.goonLoad = function() {
var e = this;
_.default.Env_apkevent_param("event_miss", "加载结束");
f.default.localdate.chapter == f.default.recode_startchapter && _.default.Env_apkevent_param("event_newmiss", "加载结束");
console.log("是否新手", f.default.is_new, f.default.localdate);
this.node.getChildByName("timejishi").zIndex = 100;
this.node.getChildByName("return").zIndex = 2;
this.node.getChildByName("memtalk").zIndex = 2;
i.default.start();
this.initMus_Eff();
m.default.recodeData().then(function(t) {
if (t) {
e.creatorTop();
null != f.default.localdate.sceneId && "" != f.default.localdate.sceneId || (f.default.localdate.sceneId = f.default.recode_startscene);
console.log("lll", f.default.localdate.sceneId);
e.isnewplayerGuide();
}
});
cc.game.on(cc.game.EVENT_HIDE, function() {
console.log("游戏进入后台");
f.default.offlineTime = new Date().getTime();
}, this);
cc.game.on(cc.game.EVENT_SHOW, function() {
console.log("游戏进入前台");
f.default.timepower(f.default.offlineTime);
cc.director.off("OnRewardVideoAdReward");
cc.director.off("OnRewardVideoAdFailed");
cc.director.off("OnRewardVideoAdPlayFailed");
f.default.timevideonum = 0;
}, this);
};
t.prototype.creatorTop = function() {
if (this.toppre) {
console.log("有top了");
this.toppre.destroy();
this.toppre = cc.instantiate(this.top);
this.node.addChild(this.toppre);
this.toppre.zIndex = 15;
} else {
this.toppre = cc.instantiate(this.top);
this.node.addChild(this.toppre);
this.toppre.zIndex = 15;
}
};
t.prototype.isnewplayerGuide = function() {
if (f.default.localdate.guideisok) {
console.log("新手引导结束");
this.nextsce();
} else switch (f.default.localdate.chapter) {
case 0:
if (f.default.localdate.isgo_my_room) {
console.log("新手引导清数据重新开始");
f.default.localdate.power = f.default.recode_allpowers ? f.default.recode_allpowers : 200;
f.default.localdate.prop = [];
f.default.localdate.guess = [];
f.default.localdate.guessnew = [];
f.default.localdate.guess_tl = [];
f.default.localdate.timepower = 300;
f.default.localdate.scheduleNumtimepower = !1;
f.default.localdate.allSceneOpen = [ "a_sce_001", "a_sce_002", "a_sce_003" ];
f.default.localdate.sceneId = "a_sce_004";
s.default.initScene(this.node);
} else {
console.log("继续新手下一步");
this.nextsce();
}
break;

case 3:
console.log("新手引导清数据重新开始");
f.default.localdate.power = f.default.recode_allpowers ? f.default.recode_allpowers : 200;
f.default.localdate.prop = [];
f.default.localdate.guess = [];
f.default.localdate.guessnew = [];
f.default.localdate.guess_tl = [];
f.default.localdate.timepower = 300;
f.default.localdate.scheduleNumtimepower = !1;
f.default.localdate.allSceneOpen = [];
f.default.localdate.sceneId = "d_sce_001";
s.default.initScene(this.node);
}
};
t.prototype.nextsce = function() {
var e = this;
y.default.loadJson(f.default.sceneTable).then(function(t) {
if (t) for (var o = 0; o < t.length; o++) if (t[o].sceneNum == f.default.localdate.sceneId) {
f.default.localdate.sceneId = t[o].startGameSceNum;
console.log("userStore.localdate.sceneId", f.default.localdate.sceneId, t[o].back);
s.default.initScene(e.node);
}
});
};
t.prototype.initMus_Eff = function() {
f.default.localdate.musicgoutime % 2 == 1 ? v.default.offMus() : f.default.localdate.musicgoutime % 2 == 0 && v.default.onMus();
f.default.localdate.effectgoutime % 2 == 1 ? v.default.offEFF() : f.default.localdate.effectgoutime % 2 == 0 && v.default.onEff();
f.default.localdate.talkgoutime % 2 == 1 ? v.default.offTalk() : f.default.localdate.talkgoutime % 2 == 0 && v.default.onTalk();
};
t.prototype.start = function() {
var e = this;
cc.systemEvent.on("upnotes", function() {
console.log("接收出笔记");
e.notespre = cc.instantiate(e.notes);
e.node.addChild(e.notespre);
e.notespre.zIndex = 10;
}, this);
cc.systemEvent.on("uptalk", function() {
console.log("接收出对话");
e.talknode && e.talknode.destroy();
e.talknode = cc.instantiate(e.talk);
e.node.addChild(e.talknode);
e.talknode.zIndex = 20;
}, this);
cc.systemEvent.on("deblock_guess", function(t) {
f.default.deblock = t.getUserData();
console.log("接收出新解锁");
e.deblockpre_guess = cc.instantiate(e.deblock[0]);
e.node.addChild(e.deblockpre_guess);
e.deblockpre_guess.zIndex = 30;
}, this);
cc.systemEvent.on("deblock_peo", function(t) {
console.log("接收出新解锁");
f.default.deblock = t.getUserData();
e.deblockpre_peo = cc.instantiate(e.deblock[3]);
e.node.addChild(e.deblockpre_peo);
e.deblockpre_peo.zIndex = 30;
}, this);
cc.systemEvent.on("deblock_prop", function(t) {
console.log("接收出新解锁");
f.default.deblock = t.getUserData();
e.deblockpre_prop = cc.instantiate(e.deblock[1]);
e.node.addChild(e.deblockpre_prop);
e.deblockpre_prop.zIndex = 30;
}, this);
cc.systemEvent.on("flytonote", function(t) {
console.log("接收新物品飞");
var o = t.getUserData(), a = cc.instantiate(e.maskpre);
e.node.addChild(a);
a.zIndex = 39;
var n = e.toppre.getChildByName("notes").getChildByName("decnotes").position.x, l = e.toppre.getChildByName("notes").getChildByName("decnotes").position.y;
console.log("飞的位置", n, l);
if ("guess" == o) {
e.deblockpre_guess.getChildByName("bg").getChildByName("sure").active = !1;
e.deblockpre_guess.runAction(cc.spawn(cc.moveTo(.8, n, l + e.toppre.getChildByName("notes").position.y), cc.scaleTo(.8, 0, 0)));
e.scheduleOnce(function() {
e.deblockpre_guess.destroy();
a.destroy();
}, .8);
} else if ("prop" == o) {
e.deblockpre_prop.getChildByName("bg").getChildByName("sure").active = !1;
e.deblockpre_prop.runAction(cc.spawn(cc.moveTo(.8, n, l + e.toppre.getChildByName("notes").position.y), cc.scaleTo(.8, 0, 0)));
e.scheduleOnce(function() {
e.deblockpre_prop.destroy();
a.destroy();
}, .8);
}
_.default.Env("ontouch");
}, this);
cc.systemEvent.on("flytonote_guess", function(t) {
console.log("接收新物品飞");
var o, a = t.getUserData(), n = cc.instantiate(e.maskpre);
e.node.addChild(n);
n.zIndex = 39;
if ("prop" == a) {
var l = (o = e.notespre.getChildByName("desibg").getChildByName("tips").getChildByName("prop").position).x, i = o.y;
console.log("飞的位置", l, i);
e.deblockpre_prop.getChildByName("bg").getChildByName("sure").active = !1;
e.deblockpre_prop.runAction(cc.spawn(cc.moveTo(.8, l, i + e.notespre.getChildByName("desibg").getChildByName("tips").position.y), cc.scaleTo(.8, 0, 0)));
e.scheduleOnce(function() {
e.deblockpre_prop.destroy();
n.destroy();
}, .8);
} else if ("guess" == a) {
l = (o = e.notespre.getChildByName("desibg").getChildByName("tips").getChildByName("guess").position).x, 
i = o.y;
console.log("飞的位置", l, i);
e.deblockpre_guess.getChildByName("bg").getChildByName("sure").active = !1;
e.deblockpre_guess.runAction(cc.spawn(cc.moveTo(.8, l, i + e.notespre.getChildByName("desibg").getChildByName("tips").position.y), cc.scaleTo(.8, 0, 0)));
e.scheduleOnce(function() {
e.deblockpre_guess.destroy();
n.destroy();
}, .8);
}
_.default.Env("ontouch");
}, this);
cc.systemEvent.on("upreturn", function(t) {
console.log("接收出返回按钮", t.getUserData());
e.returnSce = t.getUserData().returnbtn;
if (t.getUserData().isthree) e.scheduleOnce(function() {
e.node.getChildByName("return").active = !0;
e.node.getChildByName("return").zIndex = 2;
}, 1); else {
e.node.getChildByName("return").active = !0;
e.node.getChildByName("return").zIndex = 2;
}
}, this);
cc.systemEvent.on("downreturn", function() {
console.log("接收隐返回按钮");
e.node.getChildByName("return").active = !1;
e.node.getChildByName("map").active = !1;
}, this);
cc.systemEvent.on("up_guess_choose", function() {
console.log("接收出猜想选择");
var t = cc.instantiate(e.guess_choose);
e.node.addChild(t);
t.zIndex = 30;
}, this);
cc.systemEvent.on("close_case", function() {
console.log("接收出结案");
var t = cc.instantiate(e.close_case_pre);
e.node.addChild(t);
t.zIndex = 30;
f.default.isclosecasestate = !0;
}, this);
cc.systemEvent.on("close_case_false", function() {
var t = cc.instantiate(e.close_case_false_pre);
e.node.addChild(t);
t.zIndex = 30;
}, this);
cc.systemEvent.on("up_text_video", function(t) {
f.default.watch_video_data = t.getUserData();
e.up_text_video_tc && e.up_text_video_tc.destroy();
e.up_text_video_tc = cc.instantiate(e.up_text_video);
e.node.addChild(e.up_text_video_tc);
e.up_text_video_tc.zIndex = 30;
}, this);
cc.systemEvent.on("up_watch_video_get_power", function() {
e.up_watch_video_get_power_tc && e.up_watch_video_get_power_tc.destroy();
e.up_watch_video_get_power_tc = cc.instantiate(e.up_watch_video_get_power);
e.node.addChild(e.up_watch_video_get_power_tc);
e.up_watch_video_get_power_tc.zIndex = 30;
}, this);
cc.systemEvent.on("powerAnim", function(t) {
e.powerAnim(t.getUserData());
}, this);
cc.systemEvent.on("upproptip", function() {
e.upproptip();
}, this);
cc.systemEvent.on("up_loupe", function() {
e.deblockpre = cc.instantiate(e.deblock[2]);
e.node.addChild(e.deblockpre);
e.deblockpre.zIndex = 16;
}, this);
cc.systemEvent.on("upnewguide", function(t) {
var o = t.getUserData().targetType, a = t.getUserData().target, n = t.getUserData().strikeType, l = t.getUserData().strike, i = t.getUserData().guidenewId;
f.default.localdate.guideObj = [ i, o, a, n, l ];
e.maskpre_node = cc.instantiate(e.maskpre);
e.node.addChild(e.maskpre_node);
e.maskpre_node.zIndex = 39;
console.log("出新手引导动画", f.default.localdate.guideObj);
if (o == c.guidetargetType.pic) y.default.loadJson(f.default.touchTable).then(function(t) {
if (t) for (var o = 0, n = t.length; o < n; o++) if (t[o].touchId == a) {
var l;
if ("touch_007" == a) {
l = [];
var i = Number(t[o].posx), c = Number(t[o].posy);
l = [ i + .5 * Number(t[o].width) - 334, 334 - (c + .5 * Number(t[o].height)) + 100 ];
} else l = s.default.anyicPos(t[o].posx, t[o].posy, t[o].width, t[o].height);
console.log("pos", l, a);
e.guide_new = cc.instantiate(e.guide_new_pre);
e.node.addChild(e.guide_new);
e.guide_new.zIndex = 40;
e.guide_new.setPosition(l[0], l[1]);
e.guide_new.runAction(cc.sequence(cc.scaleTo(.6, 1, 1), cc.callFunc(function() {
e.scheduleOnce(function() {
e.maskpre_node.destroy();
}, .2);
})));
}
}); else if (o == c.guidetargetType.ui) {
console.log("新手引导ui", a);
d.default.guide_buzou(a, e.node);
}
}, this);
cc.systemEvent.on("click_ui_guide", function(t) {
var o = t.getUserData();
e.guide_new = cc.instantiate(e.guide_new_pre);
e.node.addChild(e.guide_new);
e.guide_new.zIndex = 40;
e.guide_new.setPosition(o);
e.guide_new.runAction(cc.sequence(cc.scaleTo(.6, 1, 1), cc.callFunc(function() {
e.scheduleOnce(function() {
e.maskpre_node.destroy();
}, .2);
})));
}, this);
cc.systemEvent.on("guess_anim_des", function() {
e.guide_new && e.guide_new.destroy();
}, this);
cc.systemEvent.on("next_chapter", function() {
var t = JSON.stringify(f.default.localdate);
f.default.chapterData.push(t);
console.log("章节数据", f.default.chapterData);
var o = cc.instantiate(e.turnScep);
e.node.addChild(o);
o.zIndex = 50;
_.default.Env_apkevent_param("event_clert", "第" + f.default.localdate.chapter + "章/章节结束");
f.default.localdate.chapter == f.default.recode_startchapter && _.default.Env_apkevent_param("event_newmiss", "章节结束");
_.default.Env_apkevent_param("event_close_case", "第" + f.default.localdate.chapter + "章/结案完成");
}, this);
cc.systemEvent.on("homebgIndex", function() {
e.node.getChildByName("homebg").zIndex = 1;
}, this);
cc.systemEvent.on("nextchapter", function() {
e.node.getChildByName("mus").active = !0;
e.goonLoad();
}, this);
cc.systemEvent.on("choose_case_true_false", function(t) {
var o = t.getUserData();
f.default.choose_case_true_false = o;
var a = cc.instantiate(e.case_true_false_pre);
e.node.addChild(a);
a.zIndex = 30;
}, this);
cc.systemEvent.on("up_jiaan_anim", function() {
e.node.getChildByName("jiean_anim").active = !0;
e.node.getChildByName("jiean_anim").zIndex = 60;
e.jiean_anim();
}, this);
cc.systemEvent.on("upmap", function() {
console.log("出地图按钮", f.default.localdate.door);
if (0 !== f.default.localdate.chapter && f.default.localdate.door.length > 0) {
e.node.getChildByName("map").active = !0;
e.node.getChildByName("map").zIndex = 2;
p.default.map_tip_up_down();
}
}, this);
cc.systemEvent.on("map_up_tip", function() {
console.log("出地图红点");
e.node.getChildByName("map").getChildByName("ti").active = !0;
}, this);
cc.systemEvent.on("map_down_tip", function() {
console.log("隐藏地图红点");
e.node.getChildByName("map").getChildByName("ti").active = !1;
}, this);
cc.systemEvent.on("close_menu", function() {
console.log("退出菜单");
_.default.Env("show_notes_tips");
e.notespre && e.notespre.destroy();
f.default.isnowatmenu = !1;
}, this);
cc.systemEvent.on("setting_state", function(t) {
var o = t.getUserData();
"on" == o ? e.node.getChildByName("mus").active = !0 : "off" == o && (e.node.getChildByName("mus").active = !1);
}, this);
cc.systemEvent.on("watchvideo_power", function() {
var t = cc.instantiate(e.nextchapter_power);
e.node.addChild(t);
t.zIndex = 51;
}, this);
};
t.prototype.touchCallback = function(e, t) {
var o = this;
if (f.default.localdate.power - 1 >= 0) if (this.this_btn_clicked) console.log("点过一个了"); else {
this.this_btn_clicked = !0;
this.prophave = !1;
var a = t.split("#");
console.log("点击贴图回调", a);
var n = a[4].split(","), l = {
x: n[0],
y: n[1]
}, i = a[0].split("|");
console.log("target_affect", i);
if (i[0][0] == c.touchPicaffect.go_room) {
console.log("出场景");
if (f.default.localdate.door.includes(a[3])) {
if ("" !== a[1] && null !== a[1]) {
f.default.localdate.sceneId = a[1];
s.default.initScene(this.node);
}
} else console.log("未开启");
} else if (i[0][0] == c.touchPicaffect.get_prop) {
console.log("得道具");
console.log("on_touch");
this.powerAnim(l);
var u = a[1];
y.default.loadJson(f.default.propTable).then(function(e) {
if (e) for (var t = 0; t < e.length; t++) if (e[t].propNum == u) {
var n, l = e[t].prop;
n = [ a[0], l, a[1] ];
console.log("点击贴图得道具", n);
f.default.deblock = n;
for (var i = 0; i < f.default.localdate.prop.length; i++) if (f.default.localdate.prop[i].id == e[t].propNum) {
console.log("prophave", f.default.localdate.prop);
o.prophave = !0;
r.default.showTip("线索已记录！");
}
if (!o.prophave) {
o.deblockpre_prop = cc.instantiate(o.deblock[1]);
o.node.addChild(o.deblockpre_prop);
o.deblockpre_prop.zIndex = 30;
d.default.next_guide();
}
}
});
} else if (i[0][0] == c.touchPicaffect.loupe) {
console.log("放大镜", a);
console.log("on_touch");
this.powerAnim(l);
f.default.deblock = a;
console.log("fangdajing");
this.deblockpre = cc.instantiate(this.deblock[2]);
this.node.addChild(this.deblockpre);
this.deblockpre.zIndex = 16;
this.node.getChildByName("return").active = !1;
d.default.next_guide();
} else if (i[0][0] == c.touchPicaffect.armoire) {
console.log("出场景大橱");
console.log("on_touch");
this.powerAnim(l);
if ("" !== a[1] && null !== a[1]) {
f.default.localdate.sceneId = a[1];
s.default.initScene(this.node).then(function(e) {
e && d.default.next_guide();
});
}
} else if (i[0][0] == c.touchPicaffect.codeCase) {
console.log("出密码箱");
this.powerAnim(l);
f.default.deblock = a;
console.log("target", f.default.localdate.codeisok, f.default.deblock);
console.log("target_affect", i);
if (f.default.localdate.codeisok) {
if (i[1] == c.touchPicaffect.armoire) {
if ("" !== a[1] && null !== a[1]) {
f.default.localdate.sceneId = a[1];
s.default.initScene(this.node);
}
} else if (i[1] == c.touchPicaffect.loupe) {
console.log("fangdajing");
this.deblockpre = cc.instantiate(this.deblock[2]);
this.node.addChild(this.deblockpre);
this.deblockpre.zIndex = 16;
}
} else {
var p = cc.instantiate(this.code);
this.node.addChild(p);
p.zIndex = 30;
}
}
_.default.Env("up_note_tip");
this.scheduleOnce(function() {
o.this_btn_clicked = !1;
}, .3);
} else _.default.Env("up_watch_video_get_power");
};
t.prototype.return = function() {
u.default.playEffect("music_009");
console.log("retrun", this.returnSce);
f.default.localdate.sceneId = this.returnSce;
s.default.initScene(this.node);
_.default.Env("up_note_tip");
d.default.next_guide();
};
t.prototype.on_map = function() {
var e = this;
console.log("开启地图");
u.default.playEffect("music_009");
p.default.map_sce().then(function(t) {
if (t) {
var o = cc.instantiate(e.mappre);
e.node.addChild(o);
o.zIndex = 30;
}
});
};
t.prototype.onEnable = function() {
this.node.getChildByName("homebg").on(cc.Node.EventType.TOUCH_START, this.on_touch_start, this);
this.node.getChildByName("homebg").on(cc.Node.EventType.TOUCH_END, this.on_touch_end, this);
};
t.prototype.onDisable = function() {
this.node.getChildByName("homebg").off(cc.Node.EventType.TOUCH_START, this.on_touch_start, this);
this.node.getChildByName("homebg").off(cc.Node.EventType.TOUCH_END, this.on_touch_end, this);
this.node.getChildByName("jiean_anim").getChildByName("bg").off(cc.Node.EventType.TOUCH_START, this.on_touch_start_jiean, this);
this.node.getChildByName("jiean_anim").getChildByName("bg").off(cc.Node.EventType.TOUCH_END, this.on_touch_end_jiean, this);
};
t.prototype.on_touch_start = function() {};
t.prototype.on_touch_end = function(e) {
var t = this.node.getChildByName("homebg").convertToNodeSpaceAR(e.getLocation());
console.log("on_touch", t.x, t.y);
this.powerAnim(t);
};
t.prototype.powerAnim = function(e) {
var t = this;
console.log("sceneid", f.default.localdate.sceneId);
null !== f.default.recode_click_power && 1 == f.default.recode_click_power && y.default.loadJson(f.default.sceneTable).then(function(o) {
if (o) for (var a = 0; a < o.length; a++) if (o[a].sceneNum == f.default.localdate.sceneId && 1 == o[a].sceneTouchPower) if (f.default.localdate.power - 1 >= 0) {
h.default.addpower(-1);
f.default.poweranimnum = 1;
h.default.downpoweranim(t.poweranimpre, e, t.node);
} else _.default.Env("up_watch_video_get_power");
});
};
t.prototype.upproptip = function() {
var e = cc.instantiate(this.proptippre);
this.node.addChild(e);
e.zIndex = 30;
};
t.prototype.memtalk = function() {
console.log("回忆对话", f.default.localdate.allSceneOpen);
};
t.prototype.setting = function() {
console.log("出设置");
var e = cc.instantiate(this.settingpre);
this.node.addChild(e);
e.zIndex = 100;
};
t.prototype.jiean_anim = function() {
var e = this;
this.closejieanbgtouch();
var t = this.node.getChildByName("jiean_anim").getChildByName("bg"), o = this.node.getChildByName("jiean_anim").getChildByName("white");
o.opacity = 0;
t.getComponent(cc.Sprite).spriteFrame = this.jiean_animpic[0];
this.scheduleOnce(function() {
u.default.playEffect("music_016");
t.getComponent(cc.Sprite).spriteFrame = e.jiean_animpic[1];
o.runAction(cc.spawn(cc.scaleTo(.7, 10, 10), cc.fadeTo(.7, 255)));
e.scheduleOnce(function() {
o.setPosition(-75, 240);
t.getComponent(cc.Sprite).spriteFrame = e.jiean_animpic[2];
o.runAction(cc.spawn(cc.scaleTo(.35, 0, 0), cc.fadeTo(.35, 0)));
e.scheduleOnce(function() {
t.getComponent(cc.Sprite).spriteFrame = e.jiean_animpic[3];
e.startchangejieananim = !0;
e.jieanbgtouch();
}, .5);
}, .5);
}, .6);
};
t.prototype.jieanbgtouch = function() {
this.node.getChildByName("jiean_anim").getChildByName("bg").on(cc.Node.EventType.TOUCH_START, this.on_touch_start_jiean, this);
this.node.getChildByName("jiean_anim").getChildByName("bg").on(cc.Node.EventType.TOUCH_END, this.on_touch_end_jiean, this);
};
t.prototype.closejieanbgtouch = function() {
this.node.getChildByName("jiean_anim").getChildByName("bg").off(cc.Node.EventType.TOUCH_START, this.on_touch_start_jiean, this);
this.node.getChildByName("jiean_anim").getChildByName("bg").off(cc.Node.EventType.TOUCH_END, this.on_touch_end_jiean, this);
};
t.prototype.on_touch_start_jiean = function() {};
t.prototype.on_touch_end_jiean = function() {
this.startchangejieananim = !1;
this.node.getChildByName("jiean_anim").active = !1;
_.default.Env("jieanduihua");
};
t.prototype.update = function(e) {
if (this.startchangejieananim) {
this.timejiean += e;
if (this.timejiean >= .5) {
this.timejiean = 0;
this.num++;
this.num >= 2 && (this.num = 0);
this.node.getChildByName("jiean_anim").getChildByName("bg").getComponent(cc.Sprite).spriteFrame = this.jiean_animpic[this.num + 2];
}
}
};
t.prototype.cleandata = function() {
var e = f.default.cleanData();
console.log("是否已清", e);
};
l([ N(cc.Prefab) ], t.prototype, "top", void 0);
l([ N(cc.Prefab) ], t.prototype, "notes", void 0);
l([ N(cc.Prefab) ], t.prototype, "code", void 0);
l([ N(cc.Prefab) ], t.prototype, "talk", void 0);
l([ N(cc.Prefab) ], t.prototype, "deblock", void 0);
l([ N(cc.Prefab) ], t.prototype, "guess_choose", void 0);
l([ N(cc.Prefab) ], t.prototype, "close_case_pre", void 0);
l([ N(cc.Prefab) ], t.prototype, "close_case_false_pre", void 0);
l([ N(cc.Prefab) ], t.prototype, "up_text_video", void 0);
l([ N(cc.Prefab) ], t.prototype, "up_watch_video_get_power", void 0);
l([ N(cc.Prefab) ], t.prototype, "poweranimpre", void 0);
l([ N(cc.Prefab) ], t.prototype, "proptippre", void 0);
l([ N(cc.Prefab) ], t.prototype, "guide_new_pre", void 0);
l([ N(cc.Prefab) ], t.prototype, "maskpre", void 0);
l([ N(cc.Prefab) ], t.prototype, "turnScep", void 0);
l([ N(cc.Prefab) ], t.prototype, "mappre", void 0);
l([ N(cc.Prefab) ], t.prototype, "case_true_false_pre", void 0);
l([ N(cc.SpriteFrame) ], t.prototype, "jiean_animpic", void 0);
l([ N(cc.Prefab) ], t.prototype, "settingpre", void 0);
l([ N(cc.Prefab) ], t.prototype, "nextchapter_power", void 0);
return l([ b ], t);
}(cc.Component);
o.default = w;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/addPower": void 0,
"../../../textures_load/scripts/ways/canvasSize": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0,
"../music/music_effect": "music_effect",
"../userStore/postLocaldata": "postLocaldata",
"../userStore/stateType": "stateType",
"../way/Toast": "Toast",
"../way/guideNew": "guideNew",
"../way/new_Tip_num": "new_Tip_num",
"../way/recode": "recode",
"../way/recomScene": "recomScene"
} ],
LoupeCode: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "c5ae2X7IetLu46ptn3F3eUb", "LoupeCode");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/userStore/userStore"), s = e("../../../textures_load/scripts/ways/eventPost"), c = e("../../../textures_load/scripts/ways/load_Json_Pic"), r = e("../bannerMan/bannerMan"), d = e("../../../textures_load/scripts/music/musicControl"), u = e("../userStore/stateType"), p = e("../way/recomScene"), f = e("../way/Toast"), h = cc._decorator, g = h.ccclass, _ = (h.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
console.log("LoupeCode");
s.default.Env("downreturn");
this.initdeblcokSce();
1 == i.default.localdate.chapter ? this.codearr = [ 0, 4, 2, 1 ] : 2 == i.default.localdate.chapter && (this.codearr = [ 6, 2, 3, 1 ]);
};
t.prototype.start = function() {
r.default.show("密码箱");
};
t.prototype.sure = function() {
d.default.playEffect("music_009");
var e = this.node.getChildByName("rander_mask").getChildByName("bg").getChildByName("code"), t = e.getChildByName("layout").getChildByName("bg1").getChildByName("one").getComponent(cc.Label).string, o = e.getChildByName("layout").getChildByName("bg2").getChildByName("two").getComponent(cc.Label).string, a = e.getChildByName("layout").getChildByName("bg3").getChildByName("three").getComponent(cc.Label).string, n = e.getChildByName("layout").getChildByName("bg4").getChildByName("four").getComponent(cc.Label).string;
if (t == this.codearr[0] && o == this.codearr[1] && a == this.codearr[2] && n == this.codearr[3]) {
i.default.localdate.codeisok = !0;
var l = i.default.deblock[0].split("|");
console.log("target_affect", l);
if (Number(l[1]) == u.touchPicaffect.armoire) "" !== i.default.deblock[1] && null !== i.default.deblock[1] && p.default.initScene(cc.find("Canvas")); else if (Number(l[1]) == u.touchPicaffect.loupe) {
console.log("放大镜");
s.default.Env("up_loupe");
}
this.node.destroy();
} else f.default.showTip("密码错误！");
};
t.prototype.initdeblcokSce = function() {
var e = this, t = i.default.deblock[3];
c.default.loadJson(i.default.touchTable).then(function(o) {
if (o) for (var a = 0, n = o.length; a < n; a++) o[a].touchId == t && (e.returnbtnSce = o[a].sceneNum);
});
};
t.prototype.onEnable = function() {
this.node.on(cc.Node.EventType.TOUCH_START, this.on_touch_start, this);
this.node.on(cc.Node.EventType.TOUCH_END, this.on_touch_end, this);
this.node.getChildByName("rander_mask").on(cc.Node.EventType.TOUCH_START, this.on_touch_start1, this);
this.node.getChildByName("rander_mask").on(cc.Node.EventType.TOUCH_END, this.on_touch_end1, this);
};
t.prototype.onDisable = function() {
this.node.off(cc.Node.EventType.TOUCH_START, this.on_touch_start, this);
this.node.off(cc.Node.EventType.TOUCH_END, this.on_touch_end, this);
this.node.getChildByName("rander_mask").off(cc.Node.EventType.TOUCH_START, this.on_touch_start1, this);
this.node.getChildByName("rander_mask").off(cc.Node.EventType.TOUCH_END, this.on_touch_end1, this);
};
t.prototype.on_touch_start = function() {};
t.prototype.on_touch_end = function() {
var e = this;
console.log("密码箱返回放大镜", this.returnbtnSce);
c.default.loadJson(i.default.sceneTable).then(function(t) {
if (t) for (var o = 0, a = t.length; o < a; o++) if (t[o].sceneNum == e.returnbtnSce) {
e.returnbtnSce = t[o].back;
r.default.hide();
"" !== e.returnbtnSce && null !== e.returnbtnSce ? s.default.Env_data("upreturn", {
returnbtn: e.returnbtnSce,
isthree: !1
}) : s.default.Env("upmap");
e.node.destroy();
}
});
};
t.prototype.on_touch_start1 = function() {};
t.prototype.on_touch_end1 = function(e) {
var t = this.node.convertToNodeSpaceAR(e.getLocation());
console.log("on_touch1", t.x, t.y);
s.default.Env_data("powerAnim", t);
};
return l([ g ], t);
}(cc.Component));
o.default = _;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0,
"../bannerMan/bannerMan": "bannerMan",
"../userStore/stateType": "stateType",
"../way/Toast": "Toast",
"../way/recomScene": "recomScene"
} ],
Loupe: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "3c730iPbJtJGrVEwLQUStHI", "Loupe");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/userStore/userStore"), s = e("../../../textures_load/scripts/ways/eventPost"), c = e("../../../textures_load/scripts/ways/load_Json_Pic"), r = e("../../../textures_load/scripts/music/musicControl"), d = e("../way/guideNew"), u = cc._decorator, p = u.ccclass, f = u.property, h = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.peopic = null;
t.prophave = !1;
t.sceneChart = [];
return t;
}
t.prototype.onLoad = function() {
console.log("Loupe", i.default.deblock);
s.default.Env("downreturn");
if (this.sceneChart.length > 0) {
for (var e = 0; e < this.sceneChart.length; e++) this.sceneChart[e].destroy();
this.sceneChart = [];
}
this.initdeblcokSce();
};
t.prototype.start = function() {};
t.prototype.initdeblcokSce = function() {
var e = this, t = i.default.deblock[1], o = t;
console.log("贴图", o);
c.default.loadJson(i.default.touchTable).then(function(a) {
if (a) {
var n = e.sceneChartlet(a, o);
console.log("num", n);
for (var l = function(t) {
var o = e.anyicPos(a[n[t]].posx, a[n[t]].posy, a[n[t]].width, a[n[t]].height), l = a[n[t]].picName;
c.default.loadJson(i.default.picTable).then(function(i) {
if (i) for (var s = function(s) {
if (i[s].picId == l) {
var r = i[s].picName, d = t;
c.default.loadPic(r).then(function(t) {
if (t) {
var l = new cc.Node();
e.peopic.addChild(l);
l.addComponent(cc.Sprite).spriteFrame = t;
l.addComponent(cc.Sprite).sizeMode = cc.Sprite.SizeMode.TRIMMED;
l.opacity = 0;
l.setPosition(o[0], o[1]);
l.width = a[n[d]].width;
l.height = a[n[d]].height;
l.name = a[n[d]].touchId;
var i = new cc.Component.EventHandler();
i.target = cc.find("Canvas");
i.component = "Home";
i.handler = "touchCallback";
i.customEventData = a[n[d]].affect + "#" + a[n[d]].target + "#" + a[n[d]].picName + "#" + a[n[d]].touchId + "#" + o;
l.addComponent(cc.Button).clickEvents.push(i);
e.sceneChart.push(l);
}
});
}
}, r = 0; r < i.length; r++) s(r);
});
}, s = 0; s < n.length; s++) l(s);
c.default.loadJson(i.default.sceneTable).then(function(o) {
if (o) for (var a = function(a) {
if (o[a].sceneNum == t) {
var n = o[a].bgPic;
c.default.loadJson(i.default.picTable).then(function(t) {
if (t) for (var o = 0; o < t.length; o++) if (t[o].picId == n) {
var a = t[o].picName;
c.default.loadPic(a).then(function(t) {
t && (e.peopic.getComponent(cc.Sprite).spriteFrame = t);
});
}
});
if (!i.default.istalkMusic) {
var l = o[a].strikeMusic;
console.log("场景音乐id", l, i.default.musicId);
if (i.default.musicId && i.default.musicId == l) ; else {
r.default.playBgm(l);
i.default.musicId = l;
}
}
if ("" !== o[a].back && null !== o[a].back) {
var s = o[a].back;
e.returnbtnSce = s;
}
}
}, n = 0; n < o.length; n++) a(n);
});
}
});
};
t.prototype.sceneChartlet = function(e, t) {
for (var o = [], a = 0; a < e.length; a++) e[a].sceneNum == t && o.push(a);
return o;
};
t.prototype.anyicPos = function(e, t, o, a) {
var n = Number(e), l = Number(t);
return [ n + .5 * Number(o) - 334, 334 - (l + .5 * Number(a)) ];
};
t.prototype.onEnable = function() {
this.node.on(cc.Node.EventType.TOUCH_START, this.on_touch_start, this);
this.node.on(cc.Node.EventType.TOUCH_END, this.on_touch_end, this);
this.node.getChildByName("rander_mask").on(cc.Node.EventType.TOUCH_START, this.on_touch_start1, this);
this.node.getChildByName("rander_mask").on(cc.Node.EventType.TOUCH_END, this.on_touch_end1, this);
};
t.prototype.onDisable = function() {
this.node.off(cc.Node.EventType.TOUCH_START, this.on_touch_start, this);
this.node.off(cc.Node.EventType.TOUCH_END, this.on_touch_end, this);
this.node.getChildByName("rander_mask").off(cc.Node.EventType.TOUCH_START, this.on_touch_start1, this);
this.node.getChildByName("rander_mask").off(cc.Node.EventType.TOUCH_END, this.on_touch_end1, this);
};
t.prototype.on_touch_start = function() {};
t.prototype.on_touch_end = function(e) {
var t = this;
console.log("放大镜返回", this.returnbtnSce);
c.default.loadJson(i.default.sceneTable).then(function(o) {
if (o) for (var a = 0, n = o.length; a < n; a++) if (o[a].sceneNum == t.returnbtnSce) {
t.returnbtnSce = o[a].back;
var l = t.node.convertToNodeSpaceAR(e.getLocation());
console.log("on_touch", l.x, l.y);
"" !== t.returnbtnSce && null !== t.returnbtnSce ? s.default.Env_data("upreturn", {
returnbtn: t.returnbtnSce,
isthree: !1
}) : s.default.Env("upmap");
d.default.next_guide();
t.node.destroy();
}
});
};
t.prototype.on_touch_start1 = function() {};
t.prototype.on_touch_end1 = function(e) {
var t = this.node.convertToNodeSpaceAR(e.getLocation());
console.log("on_touch", t.x, t.y);
s.default.Env_data("powerAnim", t);
};
t.prototype.update = function() {};
l([ f(cc.Node) ], t.prototype, "peopic", void 0);
return l([ p ], t);
}(cc.Component);
o.default = h;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0,
"../way/guideNew": "guideNew"
} ],
Mapchild: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "6b3aalpdVtMMazbgGXuSUZd", "Mapchild");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/userStore/userStore"), s = e("../../../textures_load/scripts/ways/eventPost"), c = e("../way/recomScene"), r = cc._decorator, d = r.ccclass, u = (r.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {};
t.prototype.start = function() {};
t.prototype.click = function() {
console.log("id", this.node.getChildByName("map").getChildByName("sce_id").getComponent(cc.Label).string);
var e = this.node.getChildByName("map").getChildByName("sce_id").getComponent(cc.Label).string;
i.default.localdate.sceneId = e;
c.default.initScene(cc.find("Canvas"));
this.node.getChildByName("map").getChildByName("ti").active = !1;
s.default.Env("des_map");
for (var t = 0, o = 0, a = i.default.mapSces.length; o < a; o++) {
var n = o;
if (i.default.localdate.allSceneOpen.includes(i.default.mapSces[n])) {
t++;
this.node.getChildByName("map").getChildByName("ti").active = !1;
if (t == i.default.mapSces.length) {
console.log("场景全进过");
s.default.Env("map_down_tip");
}
} else this.node.getChildByName("map").getChildByName("ti").active = !0;
}
};
return l([ d ], t);
}(cc.Component));
o.default = u;
cc._RF.pop();
}, {
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../way/recomScene": "recomScene"
} ],
Map: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "3f211apMHRFyJrzrI8ccJSn", "Map");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/userStore/userStore"), s = e("../../../textures_load/scripts/ways/eventPost"), c = e("../../../textures_load/scripts/ways/load_Json_Pic"), r = e("../../../textures_load/scripts/music/musicControl"), d = cc._decorator, u = d.ccclass, p = d.property, f = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.mapchildpre = null;
t.content = null;
return t;
}
t.prototype.onLoad = function() {
console.log("mapchild", i.default.mapSces);
this.initSce();
};
t.prototype.start = function() {
var e = this;
cc.systemEvent.on("des_map", function() {
e.return();
}, this);
};
t.prototype.initSce = function() {
if (i.default.mapSces.length > 0) for (var e = 0, t = function() {
var t = cc.instantiate(o.mapchildpre);
o.content.addChild(t);
var n = a;
if (i.default.localdate.allSceneOpen.includes(i.default.mapSces[n])) {
e++;
t.getChildByName("map").getChildByName("ti").active = !1;
if (e == i.default.mapSces.length) {
console.log("场景全进过");
s.default.Env("map_down_tip");
}
} else t.getChildByName("map").getChildByName("ti").active = !0;
c.default.loadJson(i.default.sceneTable).then(function(e) {
if (e) for (var o = 0, a = i.default.sceneTable.length; o < a; o++) if (i.default.mapSces[n] == i.default.sceneTable[o].sceneNum) {
var l = i.default.sceneTable[o].sceneName;
console.log("name", l);
t.getChildByName("map").getChildByName("sce_name").getComponent(cc.Label).string = l;
t.getChildByName("map").getChildByName("sce_id").getComponent(cc.Label).string = i.default.sceneTable[o].sceneNum;
0 != i.default.sceneTable[o].sceneTouchPower && "0" != i.default.sceneTable[o].sceneTouchPower || (t.getChildByName("map").getChildByName("percentage").active = !1);
}
});
var l = [], r = 0, d = 0;
c.default.loadJson(i.default.propTable).then(function(e) {
if (e) for (var o = 0, a = i.default.propTable.length; o < a; o++) {
r++;
i.default.propTable[o].fromScene_map == i.default.mapSces[n] && l.push(i.default.propTable[o].propNum);
if (r == i.default.propTable.length) {
var s = [];
if (0 == i.default.localdate.prop.length) {
t.getChildByName("map").getChildByName("percentage").getComponent(cc.Label).string = "0%";
t.getChildByName("map").getChildByName("ok").active = !1;
} else for (var c = 0, u = i.default.localdate.prop.length; c < u; c++) {
d++;
l.includes(i.default.localdate.prop[c].id) && s.push(i.default.localdate.prop[c].id);
if (d == i.default.localdate.prop.length) {
console.log("道具已有", s);
t.getChildByName("map").getChildByName("percentage").getComponent(cc.Label).string = Math.ceil(s.length / l.length * 100) + "%";
"100%" == t.getChildByName("map").getChildByName("percentage").getComponent(cc.Label).string ? t.getChildByName("map").getChildByName("ok").active = !0 : t.getChildByName("map").getChildByName("ok").active = !1;
}
}
}
}
});
}, o = this, a = 0, n = i.default.mapSces.length; a < n; a++) t();
};
t.prototype.return = function() {
r.default.playEffect("music_009");
this.node.destroy();
};
l([ p(cc.Prefab) ], t.prototype, "mapchildpre", void 0);
l([ p(cc.Node) ], t.prototype, "content", void 0);
return l([ u ], t);
}(cc.Component);
o.default = f;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0
} ],
Notes: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "4d800io5KNBk7aFF4W8iRNM", "Notes");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../way/new_Tip_num"), s = e("../userStore/stateType"), c = e("../../../textures_load/scripts/music/musicControl"), r = e("../way/guideNew"), d = e("../../../textures_load/scripts/userStore/userStore"), u = e("../../../textures_load/scripts/ways/eventPost"), p = cc._decorator, f = p.ccclass, h = p.property, g = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.clicktop = [];
return t;
}
t.prototype.onLoad = function() {
this.sces = this.node.getChildByName("desibg").getChildByName("sces");
this.updata_tip();
};
t.prototype.start = function() {
cc.systemEvent.on("returnhome", this.returnhome, this);
cc.systemEvent.on("updata_tip", this.updata_tip, this);
};
t.prototype.updata_tip = function() {
console.log("接收更新红点");
console.log("red_code", i.default.new_tip(d.default.localdate.peoplenew), i.default.new_tip(d.default.localdate.guessnew));
var e = this.node.getChildByName("desibg").getChildByName("tips"), t = e.getChildByName("peo"), o = e.getChildByName("prop"), a = e.getChildByName("guess");
t.getChildByName("ti").active = !1;
o.getChildByName("ti").active = !1;
a.getChildByName("ti").active = !1;
i.default.new_tip(d.default.localdate.peoplenew) > 0 ? t.getChildByName("ti").active = !0 : t.getChildByName("ti").active = !1;
i.default.new_tip(d.default.localdate.guessnew) > 0 || d.default.localdate.close_case_done ? a.getChildByName("ti").active = !0 : a.getChildByName("ti").active = !1;
for (var n = [], l = 0; l < d.default.localdate.prop.length; l++) d.default.localdate.prop[l].propType != s.propType.New && d.default.localdate.prop[l].propType != s.propType.Locked_unlook || n.push(d.default.localdate.prop[l]);
n.length > 0 ? o.getChildByName("ti").active = !0 : o.getChildByName("ti").active = !1;
};
t.prototype.update = function() {};
t.prototype.downallSce = function() {
for (var e = 0; e < this.sces.children.length; e++) this.sces.children[e].active = !1;
this.node.getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess") && this.node.getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").destroy();
};
t.prototype.anclicktop = function() {
var e = this.node.getChildByName("desibg").getChildByName("tips"), t = e.getChildByName("peo"), o = e.getChildByName("prop"), a = e.getChildByName("guess");
t.getComponent(cc.Sprite).spriteFrame = this.clicktop[1];
o.getComponent(cc.Sprite).spriteFrame = this.clicktop[3];
a.getComponent(cc.Sprite).spriteFrame = this.clicktop[5];
};
t.prototype.clickpeo = function() {
c.default.playEffect("music_009");
c.default.playEffect("music_008");
console.log("点击人物");
u.default.Env("close_prop_schedule");
this.anclicktop();
this.node.getChildByName("desibg").getChildByName("tips").getChildByName("peo").getComponent(cc.Sprite).spriteFrame = this.clicktop[0];
this.downallSce();
this.sces.getChildByName("scepeo").active = !0;
d.default.localdate.peoplenew[0] = 0;
this.updata_tip();
u.default.Env("updata_tip");
d.default.now_click_prop = null;
d.default.last_click_prop = null;
u.default.Env("initContent");
this.node.getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess") && this.node.getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").destroy();
};
t.prototype.clickprop = function() {
c.default.playEffect("music_009");
c.default.playEffect("music_008");
console.log("点击道具");
u.default.Env("close_prop_schedule");
this.anclicktop();
this.node.getChildByName("desibg").getChildByName("tips").getChildByName("prop").getComponent(cc.Sprite).spriteFrame = this.clicktop[2];
this.downallSce();
this.sces.getChildByName("sceprop").active = !0;
u.default.Env("initpropList");
this.node.getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess") && this.node.getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").destroy();
};
t.prototype.clickguess = function() {
c.default.playEffect("music_009");
c.default.playEffect("music_008");
console.log("点击猜想", this.node.getChildByName("desibg").getChildByName("sces").getChildByName("sceguess"));
u.default.Env("close_prop_schedule");
this.anclicktop();
this.node.getChildByName("desibg").getChildByName("tips").getChildByName("guess").getComponent(cc.Sprite).spriteFrame = this.clicktop[4];
this.downallSce();
this.sces.getChildByName("sceguess").active = !0;
d.default.now_click_prop = null;
d.default.last_click_prop = null;
u.default.Env("initGuess");
r.default.next_guide();
};
t.prototype.returnhome = function() {
c.default.playEffect("music_007");
c.default.playEffect("music_009");
console.log("接收笔记返回");
u.default.Env("close_prop_schedule");
u.default.Env("show_notes_tips");
d.default.isnowatmenu = !1;
r.default.next_guide();
this.node.destroy();
};
t.prototype.onDestroy = function() {};
l([ h(cc.SpriteFrame) ], t.prototype, "clicktop", void 0);
return l([ f ], t);
}(cc.Component);
o.default = g;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../userStore/stateType": "stateType",
"../way/guideNew": "guideNew",
"../way/new_Tip_num": "new_Tip_num"
} ],
Proptips: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "27c71Ksv4lBbrnIjcBATDX4", "Proptips");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../userStore/stateType"), s = e("../way/new_Tip_num"), c = e("../way/Toast"), r = e("../userStore/propTipData"), d = e("../../../textures_load/scripts/music/musicControl"), u = e("../bannerMan/bannerMan"), p = e("../../../textures_load/scripts/userStore/userStore"), f = e("../../../textures_load/scripts/ways/load_Json_Pic"), h = e("../../../textures_load/scripts/ways/eventPost"), g = cc._decorator, _ = g.ccclass, y = g.property, m = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.sptip = null;
t.labtime = null;
t.wu = null;
return t;
}
t.prototype.onLoad = function() {
this.node.getChildByName("num").getChildByName("done").active = !1;
this.inittimelab();
this.initpropdata();
this.inittip();
};
t.prototype.start = function() {
cc.systemEvent.on("proptipright", this.proptipright, this);
u.default.show("道具提示");
};
t.prototype.inittimelab = function() {
this.labtime.string = p.default.localdate.proptipnumtime + "";
this.num = Number(this.labtime.string);
};
t.prototype.initpropdata = function() {
for (var e = 0; e < p.default.localdate.proptip.length; e++) for (var t = 0; t < p.default.localdate.prop.length; t++) p.default.localdate.prop[t].id == p.default.localdate.proptip[e].id && (p.default.localdate.proptip[e].propTipType = i.propTipType.Locked);
};
t.prototype.inittip = function() {
if (p.default.localdate.proptip.length > 0) {
this.node.getChildByName("direction").active = !0;
this.node.getChildByName("golast").active = !0;
var e = p.default.localdate.proptip[0].id, t = p.default.localdate.proptip[0].propTipType;
this.ganpic(e, t);
this.init_share_video();
} else {
this.wu.active = !0;
this.wu.getChildByName("btn").getChildByName("look").getComponent(cc.Label).string = "消耗次数获得提示";
this.node.getChildByName("direction").active = !1;
this.node.getChildByName("golast").active = !1;
}
};
t.prototype.init_share_video = function() {
this.node.getChildByName("golast").active = !0;
if (+this.num > 0) {
this.wu.active = !0;
this.wu.getChildByName("btn").getChildByName("look").getComponent(cc.Label).string = "消耗次数获得提示";
this.node.getChildByName("direction").active = !1;
this.node.getChildByName("golast").active = !1;
} else this.node.getChildByName("golast").getChildByName("look").getComponent(cc.Label).string = "看视频获得提示";
};
t.prototype.left = function() {
var e = this.num_nowpropid();
if (e - 1 >= 0) {
var t = p.default.localdate.proptip[e - 1].id, o = p.default.localdate.proptip[e - 1].propTipType;
this.ganpic(t, o);
} else c.default.showTip("没有更多了哦！");
};
t.prototype.right = function() {
var e = this, t = this.num_nowpropid();
if (t + 1 <= p.default.localdate.proptip.length - 1) {
var o = p.default.localdate.proptip[t + 1].id, a = p.default.localdate.proptip[t + 1].propTipType;
this.ganpic(o, a);
} else {
console.log("看视频");
s.default.not_find_prop().then(function(t) {
if (t) {
console.log("未找到道具", t);
if (t.length > 0) {
e.not_find_prop_len = t;
for (var o = p.default.localdate.proptip, a = 0, n = o.length; a < n; a++) for (var l = 0, i = e.not_find_prop_len.length; l < i; l++) o[a].id == e.not_find_prop_len[l] && e.not_find_prop_len.splice(l, 1);
if (e.not_find_prop_len.length > 0) e.watch_share(); else {
console.log("照完了");
c.default.showTip("已无道具可查找!");
}
} else {
console.log("照完了");
c.default.showTip("已无道具可查找!");
}
}
});
}
};
t.prototype.watch_share = function() {
c.default.showTip("暂无视频，稍后再试~");
};
t.prototype.proptipright = function() {
d.default.playBgm(p.default.musicId);
this.wu.active = !1;
console.log("not_find_prop", this.not_find_prop_len);
var e = this.not_find_prop_len[0];
this.ganpic(e);
p.default.localdate.proptip.push(new r.porpTipData(e, 0));
this.node.getChildByName("golast").active = !0;
this.init_share_video();
h.default.Env_apkevent_param("event_proptip", "第" + p.default.localdate.chapter + "章/" + e);
h.default.Env_apkevent_param("event_all_watchvideo", "道具提示");
};
t.prototype.golast = function() {
var e = this;
this.node.getChildByName("golast").active = !1;
s.default.not_find_prop().then(function(t) {
if (t) {
console.log("未找到道具", t);
if (t.length > 0) {
e.not_find_prop_len = t;
for (var o = p.default.localdate.proptip, a = 0, n = o.length; a < n; a++) for (var l = 0, i = e.not_find_prop_len.length; l < i; l++) o[a].id == e.not_find_prop_len[l] && e.not_find_prop_len.splice(l, 1);
if (e.not_find_prop_len.length > 0) e.watch_share(); else {
console.log("照完了");
c.default.showTip("已无道具可查找!");
}
} else {
console.log("照完了");
c.default.showTip("已无道具可查找!");
e.init_share_video();
}
}
});
};
t.prototype.num_nowpropid = function() {
for (var e = p.default.localdate.proptip.length, t = 0; t < e; t++) if (p.default.localdate.proptip[t].id == this.now_propid) var o = t;
return o;
};
t.prototype.look = function() {
var e = this;
s.default.not_find_prop().then(function(t) {
if (t) {
console.log("未找到道具", t);
e.node.getChildByName("direction").active = !0;
e.node.getChildByName("golast").active = !0;
if (t.length > 0) {
e.not_find_prop_len = t;
if (e.num > 0) {
p.default.localdate.proptipnumtime--;
e.inittimelab();
e.wu.active = !1;
var o = t[0];
e.ganpic(o);
e.init_share_video();
p.default.localdate.proptip.push(new r.porpTipData(o, 0));
} else e.watch_share();
} else {
console.log("照完了");
c.default.showTip("已无道具可查找");
e.init_share_video();
}
}
});
};
t.prototype.ganpic = function(e, t) {
var o = this;
f.default.loadJson(p.default.propTable).then(function(a) {
if (a) for (var n = function(n) {
if (a[n].propNum == e) {
var l = a[n].prop;
o.node.getChildByName("tip").getChildByName("name").getComponent(cc.Label).string = l;
var i = a[n].propTipPic;
f.default.loadJson(p.default.picTable).then(function(a) {
if (a) for (var n = 0, l = a.length; n < l; n++) if (a[n].picId == i) {
var s = a[n].picName;
f.default.loadPic(s).then(function(a) {
if (a) {
o.sptip.getComponent(cc.Sprite).spriteFrame = a;
o.now_propid = e;
var n = o.num_nowpropid(), l = p.default.localdate.proptip.length;
o.node.getChildByName("tip").getChildByName("ordernum").getComponent(cc.Label).string = n + 1 + "/" + l;
}
o.node.getChildByName("num").getChildByName("done").active = !!t;
});
}
});
}
}, l = 0, i = a.length; l < i; l++) n(l);
});
};
t.prototype.return = function() {
d.default.playEffect("music_009");
u.default.hide();
this.node.destroy();
};
l([ y(cc.Node) ], t.prototype, "sptip", void 0);
l([ y(cc.Label) ], t.prototype, "labtime", void 0);
l([ y(cc.Node) ], t.prototype, "wu", void 0);
return l([ _ ], t);
}(cc.Component);
o.default = m;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0,
"../bannerMan/bannerMan": "bannerMan",
"../userStore/propTipData": "propTipData",
"../userStore/stateType": "stateType",
"../way/Toast": "Toast",
"../way/new_Tip_num": "new_Tip_num"
} ],
Talk: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "117c4D+W4xFPLpXuL5AJoj3", "Talk");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../userStore/stateType"), s = e("../way/talkStrike"), c = e("../way/recomScene"), r = e("../../../textures_load/scripts/music/musicControl"), d = e("../way/new_Tip_num"), u = e("../../../textures_load/scripts/userStore/userStore"), p = e("../../../textures_load/scripts/ways/eventPost"), f = e("../../../textures_load/scripts/ways/load_Json_Pic"), h = cc._decorator, g = h.ccclass, _ = h.property, y = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.label = null;
t.peoname = [];
t.man = [];
t.xianshi = null;
t.overupword = !1;
t.timeint = .16;
t.timespeed = 0;
t.clertarrlen = 0;
t.strong_turn_scence = !1;
t.is_close_case = !1;
t.close_case_answer = !1;
t.close_case_answer_false = !1;
t.firsttalk = 0;
t.talknomus = 0;
t.clickfast = 0;
t.newplayerguide = !1;
t.prop_strike1 = !1;
t.next_chapter_to_talk = !1;
t.close_menu = !1;
return t;
}
t.prototype.onLoad = function() {
this.initobj();
this.plottalk();
this.xianshi.active = !1;
u.default.talknomus = 0;
if (u.default.ispropstrike1) {
console.log("接收出道具strike1");
this.prop_strike1 = !0;
}
u.default.istalkstate = !0;
};
t.prototype.start = function() {
var e = this;
cc.systemEvent.on("strong_turn_sce", function(t) {
console.log("接收强转场景", t.getUserData());
e.sceneId = t.getUserData();
e.strong_turn_scence = !0;
}, this);
cc.systemEvent.on("ontouch", function() {
console.log("接收开启触摸");
e.onEnable();
}, this);
cc.systemEvent.on("talk_strike_talk", function(t) {
console.log("接收触发对话", t.getUserData());
u.default.is_close_case = t.getUserData();
e.is_close_case = !0;
}, this);
cc.systemEvent.on("talk_choose_case", function() {
console.log("接收触发结案选择预制");
e.close_case_answer = !0;
}, this);
cc.systemEvent.on("talk_strike_talk_false", function() {
console.log("接收出结案看视频");
e.close_case_answer_false = !0;
}, this);
cc.systemEvent.on("next_chapter_to_talk", function() {
console.log("出下一章节");
e.next_chapter_to_talk = !0;
}, this);
};
t.prototype.initobj = function() {
for (var e = 0; e < this.man.length; e++) {
this.man[e].active = !1;
this.peoname[e].active = !1;
this.man[e].getComponent(cc.Sprite).spriteFrame = null;
}
};
t.prototype.talkpro = function() {
var e = this;
if (1 == u.default.talkClert[this.clertarrlen].direction) {
if (this.clertarrlen >= 1) if (u.default.talkClert[this.clertarrlen].direction == u.default.talkClert[this.clertarrlen - 1].direction && u.default.talkClert[this.clertarrlen].people == u.default.talkClert[this.clertarrlen - 1].people) ; else {
this.initobj();
this.man[0].active = !0;
this.peoname[0].active = !0;
} else {
this.initobj();
this.man[0].active = !0;
this.peoname[0].active = !0;
}
console.log("000000000", u.default.talkClert[this.clertarrlen].peopleId);
if ("" !== u.default.talkClert[this.clertarrlen].peopleId) {
var t = u.default.talkClert[this.clertarrlen].peopleId;
f.default.loadJson(u.default.peopleTable).then(function(o) {
if (o) for (var a = function(a) {
if (o[a].peoId == t) {
var n = o[a].peoPic;
f.default.loadJson(u.default.picTable).then(function(t) {
if (o) for (var a = 0; a < t.length; a++) if (t[a].picId == n) {
var l = t[a].picName;
f.default.loadPic(l).then(function(t) {
t && e.man && (e.man[0].getComponent(cc.Sprite).spriteFrame = t);
});
}
});
}
}, n = 0; n < o.length; n++) a(n);
});
} else this.man && (this.man[0].getComponent(cc.Sprite).spriteFrame = null);
this.peoname[0].children[0].getComponent(cc.Label).string = u.default.talkClert[this.clertarrlen].people;
} else if (0 == u.default.talkClert[this.clertarrlen].direction) {
if (this.clertarrlen >= 1) if (u.default.talkClert[this.clertarrlen].direction == u.default.talkClert[this.clertarrlen - 1].direction && u.default.talkClert[this.clertarrlen].people == u.default.talkClert[this.clertarrlen - 1].people) ; else {
this.initobj();
this.man[1].active = !0;
this.peoname[1].active = !0;
} else {
this.initobj();
this.man[1].active = !0;
this.peoname[1].active = !0;
}
if ("" !== u.default.talkClert[this.clertarrlen].peopleId) {
var o = u.default.talkClert[this.clertarrlen].peopleId;
f.default.loadJson(u.default.peopleTable).then(function(t) {
if (t) for (var a = function(a) {
if (t[a].peoId == o) {
var n = t[a].peoPic;
f.default.loadJson(u.default.picTable).then(function(o) {
if (t) for (var a = 0; a < o.length; a++) if (o[a].picId == n) {
var l = o[a].picName;
f.default.loadPic(l).then(function(t) {
t && e.man && (e.man[1].getComponent(cc.Sprite).spriteFrame = t);
});
}
});
}
}, n = 0; n < t.length; n++) a(n);
});
} else this.man && (this.man[1].getComponent(cc.Sprite).spriteFrame = null);
this.peoname[1].children[0].getComponent(cc.Label).string = u.default.talkClert[this.clertarrlen].people;
}
u.default.talkClert[this.clertarrlen].shake && p.default.Env("shake");
};
t.prototype.plottalk = function() {
this.newplayerguide = !1;
if (u.default.talkClert[this.clertarrlen]) {
this.node.active = !0;
this.talkpro();
this.start_up(u.default.talkClert[this.clertarrlen].talk, null, null, null);
} else this.node.active = !1;
};
t.prototype.on_touch_start = function() {};
t.prototype.on_touch_end = function() {
if (this.overupword) if (this.clertarrlen >= u.default.talkClert.length) {
console.log("播放完了");
if (u.default.ismomery) {
u.default.ismomery = !1;
u.default.oldprop_strikeguess = !1;
if (this.strong_turn_scence) {
console.log("对话完强转场景");
this.strong_turn_scence = !1;
u.default.stongturnSceontalk = !1;
u.default.localdate.sceneId = this.sceneId;
c.default.initScene(cc.find("Canvas"));
}
} else {
if (u.default.talkClert_prop) {
console.log("不是询问道具不改状态");
p.default.Env_data("state_Locked", u.default.talkClert_prop);
u.default.talkClert_prop = null;
}
console.log("说完话保存场景", u.default.localdate.sceneId, u.default.temptalkSce);
if (-1 != u.default.localdate.allSceneOpen.indexOf(u.default.temptalkSce)) ; else {
u.default.localdate.allSceneOpen.push(u.default.temptalkSce);
console.log("allSceneOpen存储", u.default.localdate.allSceneOpen);
switch (u.default.localdate.chapter) {
case 0:
"a_sce_004" == u.default.temptalkSce && (u.default.localdate.isgo_my_room = !0);
}
d.default.map_tip_up_down();
}
this.musicid && (u.default.musicId = this.musicid);
if (this.strong_turn_scence) {
console.log("对话完强转场景");
this.strong_turn_scence = !1;
u.default.stongturnSceontalk = !1;
u.default.localdate.sceneId = this.sceneId;
c.default.initScene(cc.find("Canvas"));
}
if (this.newplayerguide) {
console.log("触发新手引导", u.default.talkClert, u.default.talkClert[this.clertarrlen - 1].talkClert);
switch (u.default.localdate.chapter) {
case 0:
"a_004" == u.default.talkClert[this.clertarrlen - 1].talkClert && p.default.Env_apkevent_param("event_newmiss", "开始新手引导");
break;

case 3:
"d_101" == u.default.talkClert[this.clertarrlen - 1].talkClert && p.default.Env_apkevent_param("event_newmiss", "开始新手引导");
}
s.default.guide_new(u.default.talkClert[this.clertarrlen - 1].target);
}
if (this.is_close_case) {
console.log("触发结案动画", u.default.is_close_case);
if ("900" == u.default.is_close_case.split("_")[1]) {
p.default.Env("up_jiaan_anim");
c.default.initScene(cc.find("Canvas"));
}
s.default.strikeTalk(u.default.is_close_case);
}
this.close_case_answer && p.default.Env("close_case");
this.close_case_answer_false && p.default.Env("close_case_false");
if (this.next_chapter_to_talk) {
p.default.Env("next_chapter");
u.default.TalkId = null;
}
this.close_menu && p.default.Env("close_menu");
if (u.default.localdate.guideisok) if (u.default.talk_return_isupordown) {
console.log("延迟出返回");
f.default.loadJson(u.default.sceneTable).then(function(e) {
if (e) for (var t = 0, o = e.length; t < o; t++) e[t].sceneNum == u.default.localdate.sceneId && (null !== e[t].back && "" !== e[t].back ? p.default.Env_data("upreturn", {
returnbtn: e[t].back,
isthree: !0
}) : p.default.Env("upmap"));
});
} else {
console.log("不触发延迟出返回，是立即出返回还是出地图", u.default.localdate.sceneId);
f.default.loadJson(u.default.sceneTable).then(function(e) {
if (e) for (var t = 0, o = e.length; t < o; t++) e[t].sceneNum == u.default.localdate.sceneId && (null !== e[t].back && "" !== e[t].back ? p.default.Env_data("upreturn", {
returnbtn: e[t].back,
isthree: !1
}) : p.default.Env("upmap"));
});
}
if (this.prop_strike1) {
console.log("接收出道具strike1");
p.default.Env("prop_strike1_ok");
u.default.ispropstrike1 = !1;
}
p.default.Env("guess_anim_des");
if (u.default.endnewguide) {
p.default.Env_apkevent_param("event_newmiss", "结束新手引导");
u.default.localdate.guideisok = !0;
}
p.default.Env("guess_ask_isok");
u.default.istalkstate = !1;
}
p.default.Env("homebgIndex");
r.default.stopTalk(u.default.TalkId);
this.node.destroy();
} else {
this.timeint = .16;
this.label.getComponent(cc.Label).string = "";
this.start_up(u.default.talkClert[this.clertarrlen].talk, null, "closetalk", null);
this.xianshi.active = !1;
if (this.strong_turn_scence) {
console.log("对话中强转场景");
u.default.localdate.sceneId = this.sceneId;
c.default.initScene(cc.find("Canvas"));
this.strong_turn_scence = !1;
}
this.close_menu && p.default.Env("close_menu");
if (this.next_chapter_to_talk) {
r.default.stopTalk(u.default.TalkId);
p.default.Env("next_chapter");
u.default.TalkId = null;
}
this.talkpro();
} else {
this.timespeed++;
if (this.timespeed <= 1) {
this.unschedule(this.action);
this.timeint = 0;
this.start_up(u.default.talkClert[this.clertarrlen].talk, "talkeffect", null, null);
}
}
};
t.prototype.start_up = function(e, t, o, a) {
var n = this;
this.overupword = !1;
console.log("talkmusic", u.default.talkClert[this.clertarrlen].talkNum);
if (t && "talkeffect" == t) ; else {
r.default.playTalk(u.default.talkClert[this.clertarrlen].talkNum);
u.default.TalkId = u.default.talkClert[this.clertarrlen].talkNum;
}
o && "closetalk" == o && r.default.stopTalk(u.default.talkClert[this.clertarrlen - 1].talkNum);
if ("" !== u.default.talkClert[this.clertarrlen].strikeMusic) {
console.log("谈话触发音乐", u.default.talkClert[this.clertarrlen].strikeMusic);
this.musicid = u.default.talkClert[this.clertarrlen].strikeMusic;
u.default.istalkMusic = !0;
if (u.default.talkClert[this.clertarrlen - 1]) if (u.default.talkClert[this.clertarrlen].strikeMusic !== u.default.talkClert[this.clertarrlen - 1].strikeMusic) {
this.clickfast++;
if (this.clickfast <= 1) {
r.default.playBgm(this.musicid);
console.log("与上句话音乐不相同");
}
} else {
console.log("与上句话音乐相同");
u.default.playbgmusicing || r.default.playBgm(this.musicid);
} else {
this.firsttalk++;
if (this.firsttalk <= 1) if (u.default.musicId !== this.musicid) {
r.default.playBgm(this.musicid);
console.log("与上段话音乐不相同");
} else {
console.log("与上段话音乐相同");
u.default.playbgmusicing || r.default.playBgm(this.musicid);
} else console.log("滚蛋");
}
} else {
console.log("谈话没有音乐");
this.talknomus++;
if (this.talknomus <= 1) {
var l = u.default.localdate.sceneId;
console.log("eeeeeeeeeeeeeeee", l);
f.default.loadJson(u.default.sceneTable).then(function(e) {
if (e) for (var t = 0, o = e.length; t < o; t++) if (e[t].sceneNum == l) {
n.musicid = e[t].strikeMusic;
if (n.musicid !== u.default.musicId) {
u.default.istalkMusic = !1;
r.default.playBgm(n.musicid);
} else console.log("音乐相同");
}
});
}
}
if (a && "all" == a) {
this.label.getComponent(cc.Label).string = e;
var i = e.length;
this.overclertlen(i, e);
} else if (this.label.getComponent(cc.Label).string.length > 0) {
var s = this.label.getComponent(cc.Label).string.length;
this.action = function() {
n.label.getComponent(cc.Label).string += e[s];
s++;
n.overclertlen(s, e);
};
this.schedule(this.action, this.timeint, e.length - s - 1);
} else {
s = 0;
this.label.getComponent(cc.Label).string = "";
this.action = function() {
n.label.getComponent(cc.Label).string += e[s];
s++;
n.overclertlen(s, e);
};
this.schedule(this.action, this.timeint, e.length - 1);
}
};
t.prototype.overclertlen = function(e, t) {
if (e >= t.length) {
this.overupword = !0;
this.xianshi.active = !0;
this.onDisable();
if ("" !== u.default.talkClert[this.clertarrlen].story) {
var o = u.default.talkClert[this.clertarrlen].story, a = u.default.talkClert[this.clertarrlen].target;
this.strike(o, a);
} else this.onEnable();
this.clertarrlen++;
this.timespeed = 0;
this.clickfast = 0;
}
};
t.prototype.strike = function(e, t) {
var o = String(e).split("#");
switch (Number(o[0])) {
case i.talkStrikeType.deblock_peo:
console.log("解锁人物");
s.default.talk_deblock_peo(u.default.talkClert[this.clertarrlen].target);
break;

case i.talkStrikeType.deblock_room:
console.log("解锁入口");
s.default.talk_deblock_room(u.default.talkClert[this.clertarrlen].target);
break;

case i.talkStrikeType.deblock_guess:
console.log("解锁猜想", u.default.oldprop_strikeguess);
u.default.oldprop_strikeguess ? this.onEnable() : s.default.talk_deblock_guess(u.default.talkClert[this.clertarrlen].target);
break;

case i.talkStrikeType.deblock_prop:
console.log("解锁道具");
s.default.talk_deblock_prop(u.default.talkClert[this.clertarrlen].target);
break;

case i.talkStrikeType.turn_scene:
console.log("强转场景");
switch (Number(o[1])) {
case 10:
console.log("触发音效", String(t).split("#")[1]);
t && r.default.playEffect(String(t).split("#")[1]);
break;

case 13:
console.log("home层级为1");
u.default.stongturnSceontalk = !1;
break;

case 14:
console.log("home层级为11");
u.default.stongturnSceontalk = !0;
}
s.default.talk_turn_scene(String(u.default.talkClert[this.clertarrlen].target).split("#")[0]);
break;

case i.talkStrikeType.choose_case:
console.log("结案选择");
var a = u.default.talkClert[this.clertarrlen].people, n = u.default.talkClert[this.clertarrlen].peopleId, l = u.default.talkClert[this.clertarrlen].talk, c = u.default.talkClert[this.clertarrlen].target;
u.default.close_case_answer_data = [ a, n, l, c ];
s.default.talk_choose_case(u.default.talkClert[this.clertarrlen].target);
break;

case i.talkStrikeType.strike_talk:
console.log("触发对话");
s.default.talk_strike_talk(u.default.talkClert[this.clertarrlen].target);
break;

case i.talkStrikeType.strike_talk_false:
console.log("触发对话结案错误");
s.default.talk_strike_talk_false(u.default.talkClert[this.clertarrlen].target);
break;

case i.talkStrikeType.over_clert:
console.log("结束章节");
s.default.over_clert();
break;

case i.talkStrikeType.guide_new:
console.log("新手引导");
u.default.startnewplayerguide = !0;
this.newplayerguide = !0;
this.onEnable();
break;

case i.talkStrikeType.effect:
console.log("各种音效");
t && r.default.playEffect(t);
this.onEnable();
break;

case i.talkStrikeType.close_menu_turnScene:
console.log("关闭菜单");
this.close_menu = !0;
this.onEnable();
break;

case i.talkStrikeType.blotter_sce_999:
console.log("临时记录场景", u.default.localdate.sceneId);
u.default.localdate.blotter_sce_999 = u.default.localdate.sceneId;
this.onEnable();
}
};
t.prototype.update = function() {};
t.prototype.onEnable = function() {
this.node.on(cc.Node.EventType.TOUCH_START, this.on_touch_start, this);
this.node.on(cc.Node.EventType.TOUCH_END, this.on_touch_end, this);
};
t.prototype.onDisable = function() {
this.node.off(cc.Node.EventType.TOUCH_START, this.on_touch_start, this);
this.node.off(cc.Node.EventType.TOUCH_END, this.on_touch_end, this);
};
l([ _(cc.Node) ], t.prototype, "label", void 0);
l([ _(cc.Node) ], t.prototype, "peoname", void 0);
l([ _(cc.Node) ], t.prototype, "man", void 0);
l([ _(cc.Node) ], t.prototype, "xianshi", void 0);
return l([ g ], t);
}(cc.Component);
o.default = y;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0,
"../userStore/stateType": "stateType",
"../way/new_Tip_num": "new_Tip_num",
"../way/recomScene": "recomScene",
"../way/talkStrike": "talkStrike"
} ],
TimerManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "b54ffP7aOxCg4gulIqkA0vb", "TimerManager");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
o.Timer = void 0;
var i = cc._decorator, s = i.ccclass, c = (i.property, function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.timerMap = new Map();
return t;
}
o = t;
t.prototype.onLoad = function() {
cc.game.addPersistRootNode(this.node);
o.instance = this;
this.timerMap = new Map();
};
t.prototype.update = function(e) {
var t = this;
null == this.timerMap || this.timerMap.size <= 0 || this.timerMap.forEach(function(o, a) {
if (null == a || a.active && a.isValid) if (null == o || o.length <= 0) t.timerMap.delete(a); else for (var n = 0; n < o.length; n++) {
var l = o[n];
if (null != l) {
if (l.execute(e, a)) {
o.splice(n, 1);
n--;
}
} else {
o.splice(n, 1);
n--;
}
} else t.timerMap.delete(a);
});
};
t.addTimer = function(e, t, a) {
var n = o.instance;
if (null != n && null != e && null != t) {
null == a && (a = n.node);
var l = new r(e, t);
if (n.timerMap.has(a)) {
null == (i = n.timerMap.get(a)) && (i = []);
i.push(l);
} else {
var i;
(i = []).push(l);
n.timerMap.set(a, i);
}
return l;
}
};
t.removeTargetTimer = function(e, t) {
var a = o.instance;
if (null != a && null != t) {
null == e && (e = a.node);
if (a.timerMap.has(e)) {
var n = a.timerMap.get(e);
if (null == n || n.length <= 0) return;
for (var l = 0; l < n.length; l++) {
var i = n[l];
if (null != i && i == t) {
n.splice(l, 1);
break;
}
}
}
}
};
t.pasueAllTimers = function(e) {
var t = o.instance;
if (null != t) {
null == e && (e = t.node);
if (t.timerMap.has(e)) {
var a = t.timerMap.get(e);
if (null == a || a.length <= 0) return;
for (var n = 0; n < a.length; n++) {
var l = a[n];
null != l && l.pauseTimer();
}
}
}
};
t.resumeAllTimers = function(e) {
var t = o.instance;
if (null != t) {
null == e && (e = t.node);
if (t.timerMap.has(e)) {
var a = t.timerMap.get(e);
if (null == a || a.length <= 0) return;
for (var n = 0; n < a.length; n++) {
var l = a[n];
null != l && l.resumeTimer();
}
}
}
};
t.removeAllTimers = function(e) {
var t = o.instance;
if (null != t) {
null == e && (e = t.node);
t.timerMap.has(e) && t.timerMap.delete(e);
}
};
t.clearTimers = function() {
var e = o.instance;
null != e && e.timerMap.clear();
};
var o;
t.instance = null;
return o = l([ s ], t);
}(cc.Component));
o.default = c;
var r = function() {
function e(e, t) {
this._isPause = !1;
this.delayTime = null;
this.callFunc = null;
this.delayTime = e;
this.callFunc = t;
}
Object.defineProperty(e.prototype, "isPause", {
get: function() {
return this._isPause;
},
enumerable: !1,
configurable: !0
});
e.prototype.execute = function(e) {
if (this.isPause) return !1;
this.delayTime -= e;
if (this.delayTime <= 0) {
this.callFunc && this.callFunc();
return !0;
}
};
e.prototype.pauseTimer = function() {
this._isPause = !0;
};
e.prototype.resumeTimer = function() {
this._isPause = !1;
};
return e;
}();
o.Timer = r;
cc._RF.pop();
}, {} ],
Toast: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2bd32IAFfxEM6j495rAJ25f", "Toast");
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = function() {
function e() {
this.preDatas = {};
}
e.prototype.showTip = function(e) {
for (var t = [], o = 0; o < arguments.length; o++) t[o] = arguments[o];
this.getNode("prefab/ComTipDesc", function(o) {
var a;
o.parent = cc.find("Canvas"), o.zIndex = 1e3, o.children[0].getComponent(cc.Label).string = e, 
o && o.getComponent && o.getComponent("ComTipDesc") && (a = o.getComponent("ComTipDesc")).restart.apply(a, t);
});
};
e.prototype.getNode = function(e, t) {
this.createNodeByName(e, t);
};
e.prototype.createNodeByName = function(e, t) {
var o = this;
if (this.preDatas[e]) {
var a = cc.instantiate(this.preDatas[e]);
a ? t && t(a) : console.error("创建节点出错3: ", e);
} else this.loadPrefab(e, function(a) {
if (a) {
o.preDatas[e] = a;
var n = cc.instantiate(a);
n ? t && t(n) : console.error("创建节点出错1: ", e);
} else console.error("创建节点出错2: ", e);
});
};
e.prototype.loadPrefab = function(e, t) {
cc.resources.load(e, cc.Prefab, function(o, a) {
a ? t(a) : (console.log("path:", e), t({}));
});
};
e.prototype.updateString = function(e, t) {
if (e) {
if (t && t.indexOf && t.indexOf("\\n") > -1) {
console.log("laibu");
t = t.replace(/\\n/g, "\n");
}
e.getComponent(cc.Label) || e.addComponent(cc.Label);
e.getComponent(cc.Label).string = t;
}
};
e.prototype.repushNode = function(e) {
e && e.destroy && e.destroy();
};
return e;
}();
o.default = new a();
cc._RF.pop();
}, {} ],
Top: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "dfcbebhI1JNy7NMYgepSnRh", "Top");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../way/new_Tip_num"), s = e("../userStore/stateType"), c = e("../way/Toast"), r = e("../../../textures_load/scripts/music/musicControl"), d = e("../way/guideNew"), u = e("../../../textures_load/scripts/userStore/userStore"), p = e("../../../textures_load/scripts/ways/eventPost"), f = cc._decorator, h = f.ccclass, g = f.property, _ = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.labelpowernum = null;
t.powerpro = null;
t.labeltimepower = null;
t.labeltimepowerspeed = null;
t.nodepar = [];
t.timedt = 0;
t.tiptime = 0;
t.guabi = 0;
t.settings = null;
return t;
}
t.prototype.onLoad = function() {
this.updata_tip();
this.guess_prefect();
this.hand = this.node.getChildByName("tips").getChildByName("tippar").getChildByName("1");
this.hand.active = !1;
u.default.localdate.isspeed ? this.node.getChildByName("power").getChildByName("speedbg").active = !1 : this.node.getChildByName("power").getChildByName("speedbg").active = !0;
this.node.getChildByName("power").getChildByName("powernode").getChildByName("lab").getComponent(cc.Label).string = "/" + (u.default.recode_allpowers ? u.default.recode_allpowers : 200);
};
t.prototype.start = function() {
var e = this;
cc.systemEvent.on("initpower", this.initpower, this);
this.initpower();
cc.systemEvent.on("show_notes_tips", function() {
console.log("接收显示笔记和提示");
e.node.getChildByName("notes").active = !0;
e.node.getChildByName("tips").active = !0;
p.default.Env_data("setting_state", "on");
}, this);
cc.systemEvent.on("up_note_tip", function() {
console.log("接收出笔记和提示");
e.upnotes_up();
e.uptips_up();
}, this);
cc.systemEvent.on("back_note_tip", function() {
console.log("接收隐藏笔记和提示");
e.upnotes_back();
e.uptips_back();
}, this);
cc.systemEvent.on("updata_tip", this.updata_tip, this);
cc.systemEvent.on("timepower", function(t) {
var o = t.getUserData();
e.updata_timepower(o);
}, this);
this.inittimepower();
cc.systemEvent.on("powerspeed", function() {
e.powerspeed();
}, this);
cc.systemEvent.on("timepowerspeed", function(t) {
var o = t.getUserData();
e.updata_timepowerspeed(o);
}, this);
cc.systemEvent.on("initpowerspeed", this.initpowerspeed, this);
this.inittimepowerspeed();
cc.systemEvent.on("chuxianjieantip", function() {
e.node.getChildByName("notes").getChildByName("decnotes").getChildByName("jiean").active = !0;
e.guess_prefect();
}, this);
};
t.prototype.guess_prefect = function() {
this.node.getChildByName("notes").getChildByName("decnotes").getChildByName("jiean").runAction(cc.repeatForever(cc.sequence(cc.fadeTo(.5, 150), cc.fadeTo(.5, 255))));
};
t.prototype.updata_tip = function() {
console.log("接收更新红点");
console.log("red_code", i.default.new_tip(u.default.localdate.peoplenew), i.default.new_tip(u.default.localdate.guessnew));
for (var e = [], t = 0; t < u.default.localdate.prop.length; t++) u.default.localdate.prop[t].propType != s.propType.New && u.default.localdate.prop[t].propType != s.propType.Locked_unlook || e.push(u.default.localdate.prop[t]);
i.default.new_tip(u.default.localdate.peoplenew) > 0 || i.default.new_tip(u.default.localdate.guessnew) > 0 || e.length > 0 || u.default.localdate.close_case_done ? this.node.getChildByName("notes").getChildByName("decnotes").getChildByName("ti").active = !0 : this.node.getChildByName("notes").getChildByName("decnotes").getChildByName("ti").active = !1;
this.iscantipcloseclert();
};
t.prototype.iscantipcloseclert = function() {
console.log("ssssss", u.default.localdate.chapter, u.default.localdate.guess.length);
var e = !0;
if (u.default.localdate.guess.length == u.default.recode_guessAllNum) {
for (var t = 0; t < u.default.localdate.guess.length; t++) 0 == u.default.localdate.guess[t].guessType && (e = !1);
e && (this.node.getChildByName("notes").getChildByName("decnotes").getChildByName("jiean").active = !0);
}
};
t.prototype.upnotes = function() {
this.nodepar[0].x < -350 ? this.nodepar[0].runAction(cc.moveTo(.5, this.nodepar[0].x + this.nodepar[0].width, this.nodepar[0].y)) : this.nodepar[0].runAction(cc.moveTo(.5, this.nodepar[0].x - this.nodepar[0].width, this.nodepar[0].y));
};
t.prototype.upnotes_back = function() {
this.nodepar[0].x < -350 || this.nodepar[0].runAction(cc.moveTo(.5, this.nodepar[0].x - this.nodepar[0].width, this.nodepar[0].y));
};
t.prototype.upnotes_up = function() {
this.nodepar[0].x < -350 && this.nodepar[0].runAction(cc.moveTo(.5, this.nodepar[0].x + this.nodepar[0].width, this.nodepar[0].y));
};
t.prototype.gonotes = function() {
r.default.playEffect("music_009");
r.default.playEffect("music_007");
p.default.Env("upnotes");
u.default.isnowatmenu = !0;
this.node.getChildByName("notes").active = !1;
this.node.getChildByName("tips").active = !1;
p.default.Env_data("setting_state", "off");
d.default.next_guide();
};
t.prototype.uptips = function() {
this.nodepar[1].x > 350 ? this.nodepar[1].runAction(cc.moveTo(.5, this.nodepar[1].x - this.nodepar[1].width, this.nodepar[1].y)) : this.nodepar[1].runAction(cc.moveTo(.5, this.nodepar[1].x + this.nodepar[1].width, this.nodepar[1].y));
};
t.prototype.uptips_back = function() {
this.nodepar[1].x > 350 || this.nodepar[1].runAction(cc.moveTo(.5, this.nodepar[1].x + this.nodepar[1].width, this.nodepar[1].y));
};
t.prototype.uptips_up = function() {
this.nodepar[1].x > 350 && this.nodepar[1].runAction(cc.moveTo(.5, this.nodepar[1].x - this.nodepar[1].width, this.nodepar[1].y));
};
t.prototype.gotips = function() {
if (u.default.localdate.chapter > 6) c.default.showTip("此功能暂未开放！"); else {
r.default.playEffect("music_009");
console.log("出道具提示");
p.default.Env("upproptip");
}
};
t.prototype.initpower = function() {
console.log("接收更新体力");
this.labelpowernum.getComponent(cc.Label).string = u.default.localdate.power + "";
this.powerpro.width = Math.ceil(u.default.localdate.power / (u.default.recode_allpowers ? u.default.recode_allpowers : 200) * 290) >= 290 ? 290 : Math.ceil(u.default.localdate.power / (u.default.recode_allpowers ? u.default.recode_allpowers : 200) * 290);
u.default.localdate.power >= (u.default.recode_allpowers ? u.default.recode_allpowers : 200) && (this.labeltimepower.string = "已满");
u.default.localdate.isspeed ? this.node.getChildByName("power").getChildByName("speedbg").active = !1 : this.node.getChildByName("power").getChildByName("speedbg").active = !0;
};
t.prototype.updata_timepower = function(e) {
e && (this.labeltimepower.string = e.getComponent(cc.Label).string);
};
t.prototype.inittimepower = function() {
u.default.localdate.scheduleNumtimepower && p.default.Env("timepower");
};
t.prototype.speed = function() {
r.default.playEffect("music_009");
u.default.localdate.isspeed ? c.default.showTip("已经在加速了哦！") : p.default.Env_data("up_text_video", "powerspeed");
};
t.prototype.powerspeed = function() {
u.default.localdate.isspeed = !0;
this.labeltimepowerspeed.node.active = !0;
this.node.getChildByName("power").getChildByName("speedbg").active = !1;
p.default.Env("timepowerspeed");
p.default.Env_apkevent_param("event_speed", "加速成功");
p.default.Env_apkevent_param("event_all_watchvideo", "加速成功");
};
t.prototype.updata_timepowerspeed = function(e) {
e && (this.labeltimepowerspeed.string = e.getComponent(cc.Label).string);
};
t.prototype.initpowerspeed = function() {
u.default.localdate.isspeed = !1;
this.node.getChildByName("power").getChildByName("speedbg").active = !0;
this.labeltimepowerspeed.node.active = !1;
};
t.prototype.inittimepowerspeed = function() {
u.default.localdate.isspeed ? p.default.Env("timepowerspeed") : this.labeltimepowerspeed.node.active = !1;
};
t.prototype.update = function(e) {
if (!u.default.localdate.guideisok || u.default.istalkstate || u.default.isclosecasestate) this.hand.active = !1; else if (u.default.tiptime5s) {
this.timedt += e;
if (this.timedt >= 1) {
this.timedt = 0;
this.tiptime++;
if (this.tiptime >= 5) {
this.tiptime = 0;
u.default.tiptime5s = !1;
this.hand.active = !0;
}
}
} else {
this.timedt += e;
if (this.timedt >= 1) {
this.timedt = 0;
this.tiptime++;
if (this.tiptime >= 2) {
this.tiptime = 0;
u.default.tiptime5s = !0;
this.hand.active = !1;
}
}
}
};
t.prototype.guapower = function() {};
l([ g(cc.Label) ], t.prototype, "labelpowernum", void 0);
l([ g(cc.Node) ], t.prototype, "powerpro", void 0);
l([ g(cc.Label) ], t.prototype, "labeltimepower", void 0);
l([ g(cc.Label) ], t.prototype, "labeltimepowerspeed", void 0);
l([ g(cc.Node) ], t.prototype, "nodepar", void 0);
return l([ h ], t);
}(cc.Component);
o.default = _;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../userStore/stateType": "stateType",
"../way/Toast": "Toast",
"../way/guideNew": "guideNew",
"../way/new_Tip_num": "new_Tip_num"
} ],
bannerMan: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "ec997thuuhPqb4MWNEcV1LA", "bannerMan");
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = e("../../../textures_load/scripts/userStore/userStore");
o.default = {
show: function(e) {
console.log("from  banner", e);
a.default.localdate.guideisok && (a.default.bannerishide = !1);
},
hide: function() {
a.default.localdate.guideisok && (a.default.bannerishide = !0);
},
init: function() {}
};
cc._RF.pop();
}, {
"../../../textures_load/scripts/userStore/userStore": void 0
} ],
choose_case_true_false: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "6d19fzKyRJN5rvvoenrXcD5", "choose_case_true_false");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/userStore/userStore"), s = e("../../../textures_load/scripts/ways/eventPost"), c = e("../../../textures_load/scripts/music/musicControl"), r = cc._decorator, d = r.ccclass, u = r.property, p = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.case_true = [];
t.case_false = [];
t.answer_ok_no = [];
t.true_anim = !1;
t.false_anim = !1;
t.case_time = 0;
t.num = 0;
return t;
}
t.prototype.onLoad = function() {
this.true_anim = !1;
this.false_anim = !1;
this.case_time = 0;
this.num = 0;
this.sp = this.node.getChildByName("case");
this.span = this.node.getChildByName("case").getChildByName("ok");
};
t.prototype.start = function() {
var e = this;
if ("true" == i.default.choose_case_true_false) {
this.true_anim = !0;
this.span.getComponent(cc.Sprite).spriteFrame = this.answer_ok_no[0];
this.span.runAction(cc.sequence(cc.scaleTo(1e-10, 1.8, 1.8), cc.scaleTo(.3, 2, 2), cc.scaleTo(.1, 1, 1), cc.callFunc(function() {
c.default.playEffect("music_010");
e.scheduleOnce(function() {
e.true_anim = !1;
s.default.Env("case_true_talk");
e.node.destroy();
}, 1);
})));
} else if ("false" == i.default.choose_case_true_false) {
this.false_anim = !0;
this.span.getComponent(cc.Sprite).spriteFrame = this.answer_ok_no[1];
this.span.runAction(cc.sequence(cc.scaleTo(1e-10, 1.8, 1.8), cc.scaleTo(.3, 2, 2), cc.scaleTo(.1, 1, 1), cc.callFunc(function() {
c.default.playEffect("music_010");
e.scheduleOnce(function() {
e.true_anim = !1;
s.default.Env("case_false_talk");
e.node.destroy();
}, 1);
})));
}
};
t.prototype.update = function(e) {
if (this.true_anim) {
this.case_time += e;
if (this.case_time >= .2) {
this.case_time = 0;
this.num++;
this.num > 2 && (this.num = 0);
this.sp.getComponent(cc.Sprite).spriteFrame = this.case_true[this.num];
}
}
if (this.false_anim) {
this.case_time += e;
if (this.case_time >= .2) {
this.case_time = 0;
this.num++;
this.num > 2 && (this.num = 0);
this.sp.getComponent(cc.Sprite).spriteFrame = this.case_false[this.num];
}
}
};
l([ u(cc.SpriteFrame) ], t.prototype, "case_true", void 0);
l([ u(cc.SpriteFrame) ], t.prototype, "case_false", void 0);
l([ u(cc.SpriteFrame) ], t.prototype, "answer_ok_no", void 0);
return l([ d ], t);
}(cc.Component);
o.default = p;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0
} ],
close_case_false: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "04e6eXxidhOs4yxnsGd+d6d", "close_case_false");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../way/Toast"), s = e("../../../textures_load/scripts/music/musicControl"), c = e("../bannerMan/bannerMan"), r = e("../../../textures_load/scripts/userStore/userStore"), d = e("../../../textures_load/scripts/ways/eventPost"), u = e("../way/close_clert_def"), p = cc._decorator, f = p.ccclass, h = (p.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
this.node.getChildByName("lab").getComponent(cc.Label).string = "是否看视频重新选择";
r.default.timevideonum = 0;
};
t.prototype.start = function() {
c.default.show("结案");
};
t.prototype.yes = function() {
i.default.showTip("暂无视频~");
};
t.prototype.success = function() {
var e = this;
this.scheduleOnce(function() {
d.default.Env_apkevent_param("event_closecase_fail", "第" + r.default.localdate.chapter + "章/出现结案失败看视频");
d.default.Env_apkevent_param("event_all_watchvideo", "结案选择失败");
console.log("userStore.musicId", r.default.musicId);
s.default.playBgm(r.default.musicId);
d.default.Env("close_case");
c.default.hide();
e.node.destroy();
}, .5);
};
t.prototype.no = function() {
r.default.timevideonum = 0;
s.default.playEffect("music_009");
console.log("重新结案");
u.default.close_clert_def();
c.default.hide();
this.node.destroy();
};
return l([ f ], t);
}(cc.Component));
o.default = h;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../bannerMan/bannerMan": "bannerMan",
"../way/Toast": "Toast",
"../way/close_clert_def": "close_clert_def"
} ],
close_case: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "faa90l6ASlAnaf2Vhv/h/wR", "close_case");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/userStore/userStore"), s = e("../../../textures_load/scripts/ways/eventPost"), c = e("../../../textures_load/scripts/ways/load_Json_Pic"), r = e("../../../textures_load/scripts/music/musicControl"), d = e("../way/talkStrike"), u = cc._decorator, p = u.ccclass, f = u.property, h = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.man = null;
t.namelab = null;
t.talklab = null;
t.guessscr = null;
return t;
}
t.prototype.onLoad = function() {
console.log("结案答案", i.default.close_case_answer_data);
this.initSce();
};
t.prototype.start = function() {
cc.systemEvent.on("case_true_talk", this.case_true_talk, this);
cc.systemEvent.on("case_false_talk", this.case_false_talk, this);
};
t.prototype.initSce = function() {
var e = this;
c.default.loadJson(i.default.peopleTable).then(function(t) {
if (t) for (var o = function(o) {
if (t[o].peoId == i.default.close_case_answer_data[1]) {
var a = t[o].peoPic;
c.default.loadJson(i.default.picTable).then(function(t) {
if (t) for (var o = 0; o < t.length; o++) if (t[o].picId == a) {
var n = t[o].picName;
c.default.loadPic(n).then(function(t) {
t && (e.man.getComponent(cc.Sprite).spriteFrame = t);
});
}
});
}
}, a = 0; a < t.length; a++) o(a);
});
this.namelab.getComponent(cc.Label).string = i.default.close_case_answer_data[0];
this.talklab.getComponent(cc.Label).string = i.default.close_case_answer_data[2];
this.yinallguess();
console.log("guesslist", i.default.localdate.guess);
for (var t = function(t) {
var o = t;
c.default.loadJson(i.default.guessTable).then(function(t) {
if (t) for (var a = function(a) {
if (t[a].guessOrder == i.default.localdate.guess[o].id && t[a].guessNum == i.default.localdate.guess[o].id + "_00") {
var n = i.default.localdate.guess[o].pos;
e.guessscr.children[n].active = !0;
e.guessscr.children[n].getChildByName("lab").getComponent(cc.Label).string = t[a].guessName;
var l = t[a].guessPic;
c.default.loadJson(i.default.picTable).then(function(t) {
if (t) for (var o = 0; o < t.length; o++) if (t[o].picId == l) {
var a = t[o].picName;
c.default.loadPic(a).then(function(t) {
t && (e.guessscr.children[n].getChildByName("icon").getChildByName("bg").getChildByName("peopic").getComponent(cc.Sprite).spriteFrame = t);
});
}
});
}
}, n = 0; n < t.length; n++) a(n);
});
}, o = 0; o < i.default.localdate.guess.length; o++) t(o);
};
t.prototype.yinallguess = function() {
for (var e = 0; e < this.guessscr.children.length; e++) this.guessscr.children[e].active = !1;
};
t.prototype.click_close_case = function(e) {
var t = this;
console.log("e", e.target.getChildByName("lab").getComponent(cc.Label).string);
var o = e.target.getChildByName("lab").getComponent(cc.Label).string;
c.default.loadJson(i.default.guessTable).then(function(e) {
if (e) for (var a = 0; a < e.length; a++) if (e[a].guessNum == i.default.close_case_answer_data[3] + "_00") {
t.resobj = e[a];
var n = e[a].guessName;
console.log("lll", n, i.default.close_case_answer_data);
if (n == o) {
s.default.Env_data("choose_case_true_false", "true");
console.log("正确", t.resobj.close_case_true);
r.default.playEffect("music_012");
} else {
s.default.Env_data("choose_case_true_false", "false");
console.log("错误", t.resobj.close_case_false);
r.default.playEffect("music_013");
}
}
});
};
t.prototype.case_true_talk = function() {
console.log("正确返回");
d.default.strikeTalk(this.resobj.close_case_true);
this.node.destroy();
};
t.prototype.case_false_talk = function() {
console.log("错误返回");
d.default.strikeTalk(this.resobj.close_case_false);
this.node.destroy();
};
l([ f(cc.Node) ], t.prototype, "man", void 0);
l([ f(cc.Node) ], t.prototype, "namelab", void 0);
l([ f(cc.Node) ], t.prototype, "talklab", void 0);
l([ f(cc.Node) ], t.prototype, "guessscr", void 0);
return l([ p ], t);
}(cc.Component);
o.default = h;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0,
"../way/talkStrike": "talkStrike"
} ],
close_clert_def: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "798f3B/ZXBCX6BLf4NZJ8WF", "close_clert_def");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.close_clert_def = void 0;
var a = e("../../../textures_load/scripts/userStore/userStore"), n = e("./talkStrike");
function l() {
switch (a.default.localdate.chapter) {
case 0:
n.default.strikeTalk("a_899");
a.default.is_close_case = "a_899";
break;

case 1:
n.default.strikeTalk("b_899");
a.default.is_close_case = "b_899";
break;

case 2:
n.default.strikeTalk("c_899");
a.default.is_close_case = "c_899";
break;

case 3:
n.default.strikeTalk("d_899");
a.default.is_close_case = "d_899";
break;

case 4:
n.default.strikeTalk("e_899");
a.default.is_close_case = "e_899";
break;

case 5:
n.default.strikeTalk("f_899");
a.default.is_close_case = "f_899";
break;

case 6:
n.default.strikeTalk("g_899");
a.default.is_close_case = "g_899";
}
}
o.close_clert_def = l;
o.default = {
close_clert_def: l
};
cc._RF.pop();
}, {
"../../../textures_load/scripts/userStore/userStore": void 0,
"./talkStrike": "talkStrike"
} ],
ganImports: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "24651bG2gJGM4+V0y3DZ4Zt", "ganImports");
Object.defineProperty(o, "__esModule", {
value: !0
});
var a = e("../../../textures_load/scripts/userStore/userStore"), n = function() {
function e() {}
e.prototype.getHeartbeatData = function() {
return {
localdate: a.default.localdate,
chapterData: a.default.chapterData,
offlineTime: new Date().getTime()
};
};
return e;
}();
o.default = new n();
cc._RF.pop();
}, {
"../../../textures_load/scripts/userStore/userStore": void 0
} ],
guessData: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "a4eadBPzz5Pr7BW5UWAtOmg", "guessData");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.guessData = void 0;
o.guessData = function(e, t, o) {
this.guessType = null;
this.id = "";
this.pos = 0;
this.guessType = o;
this.id = e;
this.pos = t;
};
cc._RF.pop();
}, {} ],
guessList: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "8f339smYCND7Jpm2JrZsgY3", "guessList");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../userStore/stateType"), s = e("../way/guideNew"), c = e("../../../textures_load/scripts/userStore/userStore"), r = e("../../../textures_load/scripts/ways/addPower"), d = e("../../../textures_load/scripts/ways/eventPost"), u = e("../../../textures_load/scripts/ways/load_Json_Pic"), p = e("../way/close_clert_def"), f = cc._decorator, h = f.ccclass, g = f.property, _ = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.guessscr = null;
t.guessclickpre = null;
t.onlyguess = null;
t.poweranimpre = null;
t.guessbgsma = null;
t.jieanbtn = 0;
return t;
}
t.prototype.onLoad = function() {
this.cleanallChild();
this.initGuess();
this.node.getChildByName("close_case").active = !1;
this.updata_tip();
};
t.prototype.updata_tip = function() {
this.initGuess();
for (var e = 0; e < this.node.getChildByName("guessscr").children.length; e++) this.node.getChildByName("guessscr").children[e].getChildByName("ti").active = !1;
console.log("sss", c.default.localdate.guessnew, c.default.localdate.guess);
for (e = 0; e < c.default.localdate.guessnew.length; e++) if (1 == c.default.localdate.guessnew[e]) {
var t = c.default.localdate.guess[e].pos;
this.node.getChildByName("guessscr").children[t].getChildByName("ti").active = !0;
}
};
t.prototype.start = function() {
var e = this;
cc.systemEvent.on("uponlyguess", function(t) {
console.log("接收出猜想验证");
var o = t.getUserData();
u.default.loadJson(c.default.guessTable).then(function(t) {
if (t) for (var a = 0; a < t.length; a++) if (t[a].guessName == o) {
c.default.clickguessId = t[a].guessOrder;
e.uponlyguess();
}
});
}, this);
cc.systemEvent.on("initGuess", this.initGuess, this);
cc.systemEvent.on("replace_guess_pro", this.replace_guess_pro, this);
cc.systemEvent.on("updata_tip", this.updata_tip, this);
cc.systemEvent.on("jieanduihua", this.jieanduihua, this);
};
t.prototype.replace_guess_pro = function() {
var e = this;
console.log("接收更新猜想进度");
u.default.loadJson(c.default.recodeTable).then(function(t) {
if (t) {
var o = t[c.default.localdate.chapter].guessAllNum;
console.log("接收更新猜想进度", t, t[c.default.localdate.chapter]);
for (var a = [], n = 0; n < c.default.localdate.guess.length; n++) c.default.localdate.guess[n].guessType == i.guessType.Locked && a.push(c.default.localdate.guess[n]);
var l = e.node.getChildByName("guessprogress").getChildByName("labprogress");
a.length > 0 ? l.getComponent(cc.Label).string = Math.floor(a.length / o * 100) + "%" : l.getComponent(cc.Label).string = "0%";
if (a.length == o) {
e.judge_close_case();
d.default.Env("chuxianjieantip");
}
}
});
};
t.prototype.cleanallChild = function() {
for (var e = 0; e < this.guessscr.children.length; e++) {
this.guessscr.children[e].getComponent(cc.Button).interactable = !1;
this.guessscr.children[e].active = !1;
this.guessscr.children[e].getChildByName("lab").getComponent(cc.Label).string = "";
this.guessscr.children[e].getChildByName("ok").active = !1;
this.guessscr.children[e].getChildByName("ti").active = !1;
}
};
t.prototype.initGuess = function() {
var e = this;
console.log("接收完成猜想验证返回更新状态");
this.replace_guess_pro();
console.log("guesslist", c.default.localdate.guess);
var t = [ 0, 1, 2, 3, 4, 5, 6, 7 ], o = [], a = 0;
if (c.default.localdate.guess.length > 0) for (var n = 0; n < c.default.localdate.guess.length; n++) {
a++;
null == c.default.localdate.guess[n].pos || (-1 != o.indexOf(c.default.localdate.guess[n].pos) ? c.default.localdate.guess[n].pos = null : o.push(c.default.localdate.guess[n].pos));
if (a == c.default.localdate.guess.length) {
var l = this.array_diff(t, o);
console.log("剩余的位置", l);
var s = 0;
if (c.default.localdate.guess.length > 0) for (var r = 0; r < c.default.localdate.guess.length; r++) {
s++;
if (null == c.default.localdate.guess[r].pos) {
var d = Math.floor(Math.random() * (Number(l.length) - .1)), p = l[d];
c.default.localdate.guess[r].pos = p;
l.splice(d, 1);
console.log("yupos", l);
}
if (s == c.default.localdate.guess.length) for (var f = function(t) {
h.guessscr.children[o[t]].active = !0;
for (var a = function(a) {
if (c.default.localdate.guess[a].pos == o[t]) {
var n = c.default.localdate.guess[a].id, l = c.default.localdate.guess[a].guessType, s = o[t];
u.default.loadJson(c.default.guessTable).then(function(a) {
if (a) for (var c = 0; c < a.length; c++) if (a[c].guessOrder == n && a[c].guessNum == n + "_00") {
console.log("该出现的猜想", a[c].guessOrder);
e.guessscr.children[s].getComponent(cc.Sprite).spriteFrame = e.guessbgsma;
e.guessscr.children[s].getChildByName("lab").getComponent(cc.Label).string = a[c].guessName;
if (l == i.guessType.unLocked) {
console.log("没完成");
e.guessscr.children[o[t]].getComponent(cc.Button).interactable = !0;
e.node.getChildByName("close_case").active = !1;
} else {
console.log("完成");
e.guessscr.children[o[t]].getChildByName("ok").active = !0;
e.guessscr.children[o[t]].getComponent(cc.Button).interactable = !0;
}
}
});
}
}, n = 0; n < c.default.localdate.guess.length; n++) a(n);
}, h = this, g = 0; g < o.length; g++) f(g);
}
}
}
};
t.prototype.array_diff = function(e, t) {
for (var o = 0; o < t.length; o++) for (var a = 0; a < e.length; a++) if (e[a] == t[o]) {
e.splice(a, 1);
a -= 1;
}
return e;
};
t.prototype.clickguess = function(e) {
console.log("e", e.target.getChildByName("lab").getComponent(cc.Label).string);
var t = e.target.getChildByName("lab").getComponent(cc.Label).string, o = cc.instantiate(this.guessclickpre);
o.parent = this.node.parent.parent.parent;
o.getChildByName("bg").getChildByName("tip").getChildByName("lab").getComponent(cc.Label).string = t;
u.default.loadJson(c.default.guessTable).then(function(e) {
if (e) for (var a = function(a) {
if (e[a].guessName == t) {
o.getChildByName("bg").getChildByName("guessdec").getChildByName("lab").getComponent(cc.Label).string = e[a].guessDes;
o.getChildByName("bg").getChildByName("mask").getChildByName("peopic").getChildByName("lab").getComponent(cc.Label).string = e[a].guessName;
var n = e[a].guessPic;
u.default.loadJson(c.default.picTable).then(function(e) {
if (e) for (var t = 0; t < e.length; t++) if (e[t].picId == n) {
var a = e[t].picName;
u.default.loadPic(a).then(function(e) {
e && (o.getChildByName("bg").getChildByName("mask").getChildByName("peopic").getComponent(cc.Sprite).spriteFrame = e);
});
}
});
}
}, n = 0; n < e.length; n++) a(n);
});
s.default.next_guide();
};
t.prototype.uponlyguess = function() {
var e = cc.instantiate(this.onlyguess);
this.node.addChild(e);
};
t.prototype.judge_close_case = function() {
d.default.Env_apkevent_param("event_close_case", "第" + c.default.localdate.chapter + "章/出现结案按钮");
this.jieanbtn++;
console.log("结案按钮", this.jieanbtn);
if (this.jieanbtn <= 1) {
this.node.getChildByName("close_case").active = !0;
c.default.localdate.close_case_done = !0;
var e = this.node.getChildByName("close_case").getChildByName("1");
e.runAction(cc.repeatForever(cc.sequence(cc.moveTo(.3, cc.v2(e.x, e.y - 20)), cc.moveTo(.3, cc.v2(e.x, e.y)))));
}
};
t.prototype.close_case_btn = function() {
d.default.Env_apkevent_param("event_close_case", "第" + c.default.localdate.chapter + "章/点击结案按钮");
c.default.localdate.power - (c.default.recode_closeclert ? c.default.recode_closeclert : 20) >= 0 ? this.jieanduihua() : d.default.Env("up_watch_video_get_power");
};
t.prototype.jieanduihua = function() {
r.default.addpower(-(c.default.recode_closeclert ? c.default.recode_closeclert : 20));
c.default.poweranimnum = c.default.recode_closeclert ? c.default.recode_closeclert : 20;
r.default.downpoweranim(this.poweranimpre, this.node.getChildByName("close_case").position, this.node);
d.default.Env("returnhome");
p.default.close_clert_def();
};
t.prototype.update = function() {};
l([ g(cc.Node) ], t.prototype, "guessscr", void 0);
l([ g(cc.Prefab) ], t.prototype, "guessclickpre", void 0);
l([ g(cc.Prefab) ], t.prototype, "onlyguess", void 0);
l([ g(cc.Prefab) ], t.prototype, "poweranimpre", void 0);
l([ g(cc.SpriteFrame) ], t.prototype, "guessbgsma", void 0);
return l([ h ], t);
}(cc.Component);
o.default = _;
cc._RF.pop();
}, {
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/addPower": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0,
"../userStore/stateType": "stateType",
"../way/close_clert_def": "close_clert_def",
"../way/guideNew": "guideNew"
} ],
guessPre: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "d94356wbu9Ll55owQ7Y94FJ", "guessPre");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/music/musicControl"), s = e("../bannerMan/bannerMan"), c = e("../../../textures_load/scripts/userStore/userStore"), r = e("../../../textures_load/scripts/ways/eventPost"), d = e("../../../textures_load/scripts/ways/load_Json_Pic"), u = cc._decorator, p = u.ccclass, f = (u.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {};
t.prototype.start = function() {
s.default.show("查看猜想");
};
t.prototype.sure = function(e) {
i.default.playEffect("music_009");
i.default.playEffect("music_008");
var t = e.target.parent.getChildByName("tip").getChildByName("lab").getComponent(cc.Label).string;
console.log("name", t);
r.default.Env_data("uponlyguess", t);
this.close();
d.default.loadJson(c.default.guessTable).then(function(e) {
if (e) for (var o = 0; o < e.length; o++) if ("" !== e[o].guessName && null !== e[o].guessName && e[o].guessName == t) for (var a = e[o].guessOrder, n = 0; n < c.default.localdate.guess.length; n++) if (c.default.localdate.guess[n].id == a) {
var l = n;
c.default.localdate.guessnew[l] = 0;
r.default.Env("updata_tip");
}
});
};
t.prototype.close = function() {
i.default.playEffect("music_009");
s.default.hide();
this.node.destroy();
};
return l([ p ], t);
}(cc.Component));
o.default = f;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0,
"../bannerMan/bannerMan": "bannerMan"
} ],
guess_choose_icon: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "3f1695I4D1HuYFh8jDFAZn+", "guess_choose_icon");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/ways/eventPost"), s = cc._decorator, c = s.ccclass, r = (s.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {};
t.prototype.start = function() {};
t.prototype.clickicon = function(e) {
var t = e.target.getChildByName("mask").getChildByName("pic").getComponent(cc.Sprite).spriteFrame.name;
i.default.Env_data("chooseicon", t);
};
return l([ c ], t);
}(cc.Component));
o.default = r;
cc._RF.pop();
}, {
"../../../textures_load/scripts/ways/eventPost": void 0
} ],
guess_choose: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "92283z4/pRCDrRxJIWnSG7D", "guess_choose");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../way/Toast"), s = e("../../../textures_load/scripts/music/musicControl"), c = e("../way/guideNew"), r = e("../bannerMan/bannerMan"), d = e("../../../textures_load/scripts/userStore/userStore"), u = e("../../../textures_load/scripts/ways/eventPost"), p = e("../../../textures_load/scripts/ways/load_Json_Pic"), f = cc._decorator, h = f.ccclass, g = f.property, _ = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.content = null;
t.labname = null;
t.choosepre = null;
t.prop_had = !1;
t.this_prop_unlocked = !1;
return t;
}
t.prototype.onLoad = function() {
this.init_guess_choose_data();
};
t.prototype.start = function() {
var e = this;
cc.systemEvent.on("chooseicon", function(t) {
console.log("接收选择猜想");
e.choose_icon(t.getUserData());
}, this);
cc.systemEvent.on("up_guess_tip", function() {
e.lookanswer();
}, this);
r.default.show("选择猜想答案");
};
t.prototype.init_guess_choose_data = function() {
var e = this;
this.prop_had = !1;
this.this_prop_unlocked = !1;
console.log("猜想选择数据", d.default.guess_choose_data);
var t = d.default.guess_choose_data[0].split("#");
console.log(t);
for (var o = 0; o < t.length; o++) {
var a = cc.instantiate(this.choosepre);
this.content.addChild(a);
}
switch (d.default.guess_choose_data[2].split("_")[0]) {
case "dj":
var n = function(o) {
var a = o;
p.default.loadJson(d.default.propTable).then(function(o) {
if (o) for (var n = function(n) {
if (o[n].propNum == t[a]) {
console.log("fffff", t[a]);
for (var l = 0; l < d.default.localdate.prop.length; l++) d.default.localdate.prop[l].id == t[a] && d.default.localdate.prop[l].propType >= 5 && (e.prop_had = !0);
if (e.prop_had) {
e.prop_had = !1;
var i = o[n].propPic;
p.default.loadJson(d.default.picTable).then(function(o) {
if (o) for (var n = 0; n < o.length; n++) if (o[n].picId == i) {
var l = o[n].picName;
p.default.loadPic(l).then(function(o) {
if (o) {
console.log("ppppp", a);
e.content.children[a].getChildByName("mask").getChildByName("pic").getComponent(cc.Sprite).spriteFrame = o;
t[a] == d.default.guess_choose_data[3] && (e.pic_prop_spriteFrame = o);
}
});
}
});
if (t[a] == d.default.guess_choose_data[3]) {
e.choose_ok = t[a];
e.content.children[a].getChildByName("clickon").active = !0;
p.default.loadJson(d.default.propTable).then(function(o) {
if (o) for (var n = 0; n < o.length; n++) o[n].propNum == t[a] && ("" !== o[n].askedDes && null !== o[n].askedDes ? e.labname.string = o[n].prop + ":\n" + o[n].askedDes : e.labname.string = o[n].prop + ":\n" + o[n].veredDes);
});
}
} else {
console.log("此道具未解锁");
e.this_prop_unlocked = !0;
p.default.loadJson(d.default.picTable).then(function(t) {
if (t) for (var o = 0; o < t.length; o++) if (t[o].picId == d.default.guess_choose_data[1]) {
var n = t[o].picName;
p.default.loadPic(n).then(function(t) {
if (t) {
e.content.children[a].getComponent(cc.Sprite).spriteFrame = null;
e.content.children[a].getChildByName("mask").getChildByName("pic").getComponent(cc.Sprite).spriteFrame = t;
}
});
}
});
}
}
}, l = 0; l < o.length; l++) n(l);
});
};
for (o = 0; o < t.length; o++) n(o);
break;

case "pl":
var l = function(o) {
var a = o;
p.default.loadJson(d.default.peopleTable).then(function(o) {
if (o) for (var n = function(n) {
if (o[n].peoId == t[a]) {
console.log("fffff", t[a]);
if (-1 != d.default.localdate.people.indexOf(t[a])) {
console.log("people", d.default.localdate.people);
var l = o[n].peoIcon;
p.default.loadJson(d.default.picTable).then(function(o) {
if (o) for (var n = 0; n < o.length; n++) if (o[n].picId == l) {
var i = o[n].picName;
p.default.loadPic(i).then(function(o) {
if (o) {
console.log("ppppp", a);
e.content.children[a].getChildByName("mask").getChildByName("pic").getComponent(cc.Sprite).spriteFrame = o;
t[a] == d.default.guess_choose_data[3] && (e.pic_prop_spriteFrame = o);
}
});
}
});
if (t[a] == d.default.guess_choose_data[3]) {
e.choose_ok = t[a];
e.content.children[a].getChildByName("clickon").active = !0;
p.default.loadJson(d.default.peopleTable).then(function(o) {
if (o) for (var n = 0; n < o.length; n++) o[n].peoId == t[a] && (e.labname.string = o[n].peoName + ":\n" + o[n].peoSimp);
});
}
} else {
console.log("此人物未解锁");
e.this_prop_unlocked = !0;
p.default.loadJson(d.default.picTable).then(function(t) {
if (t) for (var o = 0; o < t.length; o++) if (t[o].picId == d.default.guess_choose_data[1]) {
var n = t[o].picName;
p.default.loadPic(n).then(function(t) {
if (t) {
e.content.children[a].getComponent(cc.Sprite).spriteFrame = null;
e.content.children[a].getChildByName("mask").getChildByName("pic").getComponent(cc.Sprite).spriteFrame = t;
}
});
}
});
}
}
}, l = 0; l < o.length; l++) n(l);
});
};
for (o = 0; o < t.length; o++) l(o);
}
};
t.prototype.choose_icon = function(e) {
console.log("ppp", e);
for (var t = 0; t < this.content.children.length; t++) this.content.children[t].getChildByName("clickon").active = !1;
if ("tl_000" == e) {
this.labname.string = "请选择一条线索！";
this.choose_ok = void 0;
} else {
for (t = 0; t < this.content.children.length; t++) if (this.content.children[t].getChildByName("mask").getChildByName("pic").getComponent(cc.Sprite).spriteFrame.name == e) {
var o = t;
this.pic_prop_spriteFrame = this.content.children[t].getChildByName("mask").getChildByName("pic").getComponent(cc.Sprite).spriteFrame;
}
var a = d.default.guess_choose_data[0].split("#");
console.log("p", a[o]);
this.choose_ok = a[o];
this.content.children[o].getChildByName("clickon").active = !0;
this.get_answer_pic_data(a[o]);
}
c.default.next_guide();
};
t.prototype.sure = function() {
s.default.playEffect("music_009");
console.log("确定选择", this.choose_ok);
if (null == this.choose_ok || null == this.choose_ok) console.log("没选"); else {
console.log("pic", this.pic_prop_spriteFrame, this.labname.string);
u.default.Env_data("choose_ok_vary_pic", this.choose_ok);
u.default.Env_data("up_guesstree_down_des", {
pic: this.pic_prop_spriteFrame,
des: this.labname.string
});
}
c.default.next_guide();
r.default.hide();
this.return();
};
t.prototype.look = function() {
s.default.playEffect("music_009");
this.this_prop_unlocked ? i.default.showTip("还有道具未解锁哦！") : u.default.Env_data("up_text_video", "guess_choose");
};
t.prototype.lookanswer = function() {
for (var e = 0; e < this.content.children.length; e++) this.content.children[e].getChildByName("clickon").active = !1;
console.log("答案", d.default.guess_choose_data, d.default.guess_choose_data[2]);
this.choose_ok = d.default.guess_choose_data[2];
for (var t = d.default.guess_choose_data[0].split("#"), o = 0; o < t.length; o++) if (t[o] == d.default.guess_choose_data[2]) var a = o;
this.content.children[a].getChildByName("clickon").active = !0;
this.pic_prop_spriteFrame = this.content.children[a].getChildByName("mask").getChildByName("pic").getComponent(cc.Sprite).spriteFrame;
this.get_answer_pic_data(t[a]);
};
t.prototype.get_answer_pic_data = function(e) {
var t = this;
switch (d.default.guess_choose_data[2].split("_")[0]) {
case "dj":
p.default.loadJson(d.default.propTable).then(function(o) {
if (o) for (var a = 0; a < o.length; a++) o[a].propNum == e && ("" !== o[a].askedDes && null !== o[a].askedDes ? t.labname.string = o[a].prop + ":\n" + o[a].askedDes : t.labname.string = o[a].prop + ":\n" + o[a].veredDes);
});
break;

case "pl":
p.default.loadJson(d.default.peopleTable).then(function(o) {
if (o) for (var a = 0; a < o.length; a++) o[a].peoId == e && (t.labname.string = o[a].peoName + ":\n" + o[a].peoSimp);
});
}
};
t.prototype.off_guess_choose = function() {
s.default.playEffect("music_009");
console.log("确定选择", this.choose_ok);
c.default.next_guide();
r.default.hide();
this.return();
};
t.prototype.return = function() {
this.node.destroy();
};
l([ g(cc.Node) ], t.prototype, "content", void 0);
l([ g(cc.Label) ], t.prototype, "labname", void 0);
l([ g(cc.Prefab) ], t.prototype, "choosepre", void 0);
return l([ h ], t);
}(cc.Component);
o.default = _;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0,
"../bannerMan/bannerMan": "bannerMan",
"../way/Toast": "Toast",
"../way/guideNew": "guideNew"
} ],
guess_suddly: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "7a11bqo1h9NcLPe3puTuhT7", "guess_suddly");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/userStore/userStore"), s = e("../../../textures_load/scripts/ways/eventPost"), c = e("../../../textures_load/scripts/ways/load_Json_Pic"), r = e("../userStore/stateType"), d = e("../way/guideNew"), u = cc._decorator, p = u.ccclass, f = u.property, h = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.base_map = [];
return t;
}
t.prototype.onLoad = function() {};
t.prototype.start = function() {};
t.prototype.clickguess = function(e) {
var t = this;
console.log("guess_suddly", e.target.name);
for (var o = 0; o < i.default.localdate.guess_tl.length; o++) i.default.localdate.guess_tl[o].tl_id == e.target.name && (this.answer = i.default.localdate.guess_tl[o].answer);
this.yinalllight();
e.target.children[0].active = !0;
var a = function(o) {
if (i.default.localdate.guess[o].id == i.default.clickguessId) if (i.default.localdate.guess[o].guessType == r.guessType.unLocked) {
s.default.Env_data("recom_tl", e.target.name);
c.default.loadJson(i.default.guessTable).then(function(o) {
if (o) for (var a = 0; a < o.length; a++) if (o[a].guessNum == e.target.name && ("" == o[a].guessName || "" == o[a].guessDes)) {
var n = o[a].guessOpt, l = o[a].guessAnswer, c = o[a].guessPic;
i.default.guess_choose_data = [ n, c, l, t.answer ];
s.default.Env("up_guess_choose");
}
});
} else {
console.log("完成了猜想选择");
var a = e.target.name;
c.default.loadJson(i.default.guessTable).then(function(t) {
if (t) for (var o = 0, n = t.length; o < n; o++) if (t[o].guessNum == a) if ("" !== t[o].guessName || "" !== t[o].guessDes) s.default.Env_data("recom_tl", e.target.name); else for (var l = 0; l < i.default.localdate.guess_tl.length; l++) if (i.default.localdate.guess_tl[l].tl_id == e.target.name) {
var c = i.default.localdate.guess_tl[l].answer;
s.default.Env_data("recom_tl_done", c);
}
});
}
};
for (o = 0; o < i.default.localdate.guess.length; o++) a(o);
d.default.next_guide();
};
t.prototype.yinalllight = function() {
for (var e = this.node.getChildByName("tl_icon"), t = 0; t < e.children.length; t++) {
e.children[t].children[0].active = !1;
e.children[t].getChildByName("wrong") && (e.children[t].getChildByName("wrong").active = !1);
}
};
l([ f(cc.SpriteFrame) ], t.prototype, "base_map", void 0);
return l([ p ], t);
}(cc.Component);
o.default = h;
cc._RF.pop();
}, {
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0,
"../userStore/stateType": "stateType",
"../way/guideNew": "guideNew"
} ],
guess_tl_answer: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "4ef62jJaeVKSaq/IvB50yN/", "guess_tl_answer");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.guess_tl_answer = void 0;
o.guess_tl_answer = function(e, t, o, a) {
this.id = "";
this.tl_id = "";
this.answer = "";
this.answer_true_false = !1;
this.id = e;
this.tl_id = t;
this.answer = o;
this.answer_true_false = a;
};
cc._RF.pop();
}, {} ],
guessonlyPre: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "70c1aEE0sdL14QiqDAMZzfJ", "guessonlyPre");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../userStore/guess_tl_answer"), s = e("../userStore/stateType"), c = e("../way/talkStrike"), r = e("../../../textures_load/scripts/music/musicControl"), d = e("../way/guideNew"), u = e("../../../textures_load/scripts/userStore/userStore"), p = e("../../../textures_load/scripts/ways/addPower"), f = e("../../../textures_load/scripts/ways/eventPost"), h = e("../../../textures_load/scripts/ways/load_Json_Pic"), g = cc._decorator, _ = g.ccclass, y = g.property, m = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.poweranimpre = null;
t.prefact = null;
t.bgguess = null;
t.guess_tl_had = !1;
t.guess_choose_answer = !0;
return t;
}
t.prototype.onLoad = function() {
console.log("guessonlyPre", u.default.clickguessId);
this.guess_choose_answer = !0;
this.prefact.active = !1;
this.initSce();
};
t.prototype.start = function() {
var e = this;
cc.systemEvent.on("recom_tl", function(t) {
console.log("接收点击图的介绍");
e.tl_name = t.getUserData();
e.supplyRecom(e.tl_name);
}, this);
cc.systemEvent.on("recom_tl_done", function(t) {
console.log("接收完成后的点击显示信息");
var o = t.getUserData();
e.recom_tl_done(o);
}, this);
cc.systemEvent.on("choose_ok_vary_pic", function(t) {
console.log("接收确定选项换图");
var o = t.getUserData();
e.choose_ok_vary_pic(o);
}, this);
cc.systemEvent.on("guess_ask_isok", function() {
console.log("接收是否说完话");
e.guess_ask_isok();
}, this);
cc.systemEvent.on("up_guesstree_down_des", function(t) {
console.log("接收出现猜想分支图处下方的道具描述");
var o = t.getUserData().pic, a = t.getUserData().des;
e.up_guesstree_down_des(o, a);
}, this);
};
t.prototype.up_guesstree_down_des = function(e, t) {
console.log("下方图显示", e, t);
var o = t.split("\n"), a = this.node.getChildByName("guessdes");
a.getChildByName("lab1").getComponent(cc.Label).string = o[0];
a.getChildByName("lab").getComponent(cc.Label).string = o[1];
a.getChildByName("mask").getChildByName("icon").getComponent(cc.Sprite).spriteFrame = e;
};
t.prototype.init_choose_answer = function() {
for (var e = this, t = [], o = 0; o < u.default.localdate.guess_tl.length; o++) u.default.localdate.guess_tl[o].id == u.default.clickguessId && t.push(u.default.localdate.guess_tl[o]);
console.log("init_choose_answer", t, this.node.getChildByName("guessxianshi").children);
var a = this.node.getChildByName("guessxianshi").children[0].getChildByName("tl_icon");
for (o = 0; o < t.length; o++) for (var n = t[o].tl_id, l = function(l) {
if (a.children[l].name == n) {
var i = o, s = l, c = t[i].answer.split("_");
"dj" == c[0] ? h.default.loadJson(u.default.propTable).then(function(o) {
if (o) for (var n = function(n) {
if (o[n].propNum == t[i].answer) {
var l = o[n].propPic;
h.default.loadJson(u.default.picTable).then(function(t) {
if (t) for (var o = 0; o < t.length; o++) if (t[o].picId == l) {
var n = t[o].picName;
h.default.loadPic(n).then(function(t) {
if (t) {
a.children[s].getChildByName("mask").getChildByName("pic").getComponent(cc.Sprite).spriteFrame = t;
a.children[s].getComponent(cc.Sprite).spriteFrame = e.bgguess;
}
});
}
});
}
}, l = 0; l < o.length; l++) n(l);
}) : "pl" == c[0] && h.default.loadJson(u.default.peopleTable).then(function(o) {
if (o) for (var n = function(n) {
if (o[n].peoId == t[i].answer) {
var l = o[n].peoIcon;
h.default.loadJson(u.default.picTable).then(function(t) {
if (t) for (var o = 0; o < t.length; o++) if (t[o].picId == l) {
var n = t[o].picName;
h.default.loadPic(n).then(function(t) {
if (t) {
a.children[s].getChildByName("mask").getChildByName("pic").getComponent(cc.Sprite).spriteFrame = t;
a.children[s].getComponent(cc.Sprite).spriteFrame = e.bgguess;
}
});
}
});
}
}, l = 0; l < o.length; l++) n(l);
});
}
}, i = 0; i < a.children.length; i++) l(i);
};
t.prototype.initSce = function() {
for (var e = 0; e < u.default.localdate.guess.length; e++) if (u.default.localdate.guess[e].id == u.default.clickguessId) if (u.default.localdate.guess[e].guessType == s.guessType.unLocked) {
this.node.getChildByName("guessbtn").active = !1;
this.ischooseall();
} else {
console.log("完成了");
this.prefact.active = !0;
this.node.getChildByName("guessbtn").active = !1;
}
this.graphicnode();
};
t.prototype.graphicnode = function() {
var e = this, t = Number(u.default.clickguessId.split("_")[1]);
console.log("排版（推理表）", u.default.clickguessId, t);
switch (u.default.localdate.chapter) {
case 0:
var o = "prefabs/guess_1_" + t;
u.default.n_chapter_0.load(o, cc.Prefab, function(t, o) {
if (o) {
var a = cc.instantiate(o);
e.node.getChildByName("guessxianshi").addChild(a);
e.guessSupply(a);
d.default.next_guide();
} else console.log("err", t);
});
break;

case 1:
var a = "prefabs/guess_2_" + t;
u.default.n_chapter_1.load(a, cc.Prefab, function(t, o) {
if (o) {
var a = cc.instantiate(o);
e.node.getChildByName("guessxianshi").addChild(a);
e.guessSupply(a);
} else console.log("err", t);
});
break;

case 2:
var n = "prefabs/guess_3_" + t;
u.default.n_chapter_2.load(n, cc.Prefab, function(t, o) {
if (o) {
var a = cc.instantiate(o);
e.node.getChildByName("guessxianshi").addChild(a);
e.guessSupply(a);
} else console.log("err", t);
});
break;

case 3:
var l = "prefabs/guess_4_" + t;
u.default.n_chapter_3.load(l, cc.Prefab, function(t, o) {
if (o) {
var a = cc.instantiate(o);
e.node.getChildByName("guessxianshi").addChild(a);
e.guessSupply(a);
d.default.next_guide();
} else console.log("err", t);
});
break;

case 4:
var i = "prefabs/guess_5_" + t;
u.default.n_chapter_4.load(i, cc.Prefab, function(t, o) {
if (o) {
var a = cc.instantiate(o);
e.node.getChildByName("guessxianshi").addChild(a);
e.guessSupply(a);
} else console.log("err", t);
});
break;

case 5:
var s = "prefabs/guess_6_" + t;
u.default.n_chapter_5.load(s, cc.Prefab, function(t, o) {
if (o) {
var a = cc.instantiate(o);
e.node.getChildByName("guessxianshi").addChild(a);
e.guessSupply(a);
} else console.log("err", t);
});
break;

case 6:
var c = "prefabs/guess_7_" + t;
u.default.n_chapter_6.load(c, cc.Prefab, function(t, o) {
if (o) {
var a = cc.instantiate(o);
e.node.getChildByName("guessxianshi").addChild(a);
e.guessSupply(a);
} else console.log("err", t);
});
}
};
t.prototype.guessSupply = function(e) {
var t = this, o = e.getChildByName("tl_icon"), a = [];
h.default.loadJson(u.default.guessTable).then(function(e) {
if (e) {
for (var n = 0; n < e.length; n++) e[n].guessOrder == u.default.clickguessId && a.push(e[n]);
for (n = 0; n < a.length; n++) for (var l = function(e) {
if (o.children[e].name == a[n].guessNum) {
var l = a[n].guessPic, i = a[n].guessName;
o.children[e].getChildByName("lab") && (o.children[e].getChildByName("lab").getComponent(cc.Label).string = i);
h.default.loadJson(u.default.picTable).then(function(a) {
if (a) for (var n = 0; n < a.length; n++) if (a[n].picId == l) {
var i = a[n].picName;
h.default.loadPic(i).then(function(a) {
if (a) {
o.children[e].getComponent(cc.Sprite).spriteFrame = a;
t.init_choose_answer();
}
});
}
});
}
}, i = 0; i < o.children.length; i++) l(i);
}
});
};
t.prototype.supplyRecom = function(e) {
var t = this.node.getChildByName("guessdes");
h.default.loadJson(u.default.guessTable).then(function(o) {
if (o) for (var a = function(a) {
if (o[a].guessNum == e) {
t.getChildByName("lab1").getComponent(cc.Label).string = "";
t.getChildByName("lab").getComponent(cc.Label).string = o[a].guessName + "\n" + o[a].guessDes;
var n = o[a].guessPic;
h.default.loadJson(u.default.picTable).then(function(e) {
if (e) for (var l = 0; l < e.length; l++) if (e[l].picId == n) {
var i = e[l].picName;
h.default.loadPic(i).then(function(e) {
if (e) {
t.getChildByName("mask").getChildByName("icon").getComponent(cc.Sprite).spriteFrame = e;
"" !== o[a].guessName && null !== o[a].guessName && void 0 !== o[a].guessName ? t.getChildByName("mask").getChildByName("icon").getChildByName("lab").getComponent(cc.Label).string = o[a].guessName : t.getChildByName("mask").getChildByName("icon").getChildByName("lab").getComponent(cc.Label).string = "";
}
});
}
});
}
}, n = 0; n < o.length; n++) a(n);
});
};
t.prototype.recom_tl_done = function(e) {
var t = this;
h.default.loadJson(u.default.propTable).then(function(o) {
if (o) for (var a = function(a) {
if (o[a].propNum == e) {
t.node.getChildByName("guessdes").getChildByName("lab1").getComponent(cc.Label).string = o[a].prop;
"" !== o[a].askedDes && null !== o[a].askedDes ? t.node.getChildByName("guessdes").getChildByName("lab").getComponent(cc.Label).string = o[a].askedDes : t.node.getChildByName("guessdes").getChildByName("lab").getComponent(cc.Label).string = o[a].veredDes;
var n = o[a].propPic;
h.default.loadJson(u.default.picTable).then(function(e) {
if (e) for (var l = 0; l < e.length; l++) if (e[l].picId == n) {
var i = e[l].picName;
h.default.loadPic(i).then(function(e) {
if (e) {
t.node.getChildByName("guessdes").getChildByName("mask").getChildByName("icon").getComponent(cc.Sprite).spriteFrame = e;
"" !== o[a].guessName && null !== o[a].guessName && void 0 !== o[a].guessName ? t.node.getChildByName("guessdes").getChildByName("mask").getChildByName("icon").getChildByName("lab").getComponent(cc.Label).string = o[a].guessName : t.node.getChildByName("guessdes").getChildByName("mask").getChildByName("icon").getChildByName("lab").getComponent(cc.Label).string = "";
}
});
}
});
}
}, n = 0; n < o.length; n++) a(n);
});
};
t.prototype.choose_ok_vary_pic = function(e) {
var t = this;
console.log("choose_ok_vary_pic", e, u.default.clickguessId, u.default.guess_choose_data, this.tl_name);
this.guess_tl_had = !1;
var o, a = u.default.guess_choose_data[2].split("_");
"dj" == a[0] ? h.default.loadJson(u.default.propTable).then(function(o) {
if (o) for (var a = function(a) {
if (o[a].propNum == e) {
var n = o[a].propPic;
h.default.loadJson(u.default.picTable).then(function(e) {
if (e) for (var o = 0; o < e.length; o++) if (e[o].picId == n) {
var a = e[o].picName;
h.default.loadPic(a).then(function(e) {
if (e) {
t.node.getChildByName("guessxianshi").children[0].getChildByName("tl_icon").getChildByName(t.tl_name).getComponent(cc.Sprite).spriteFrame = t.bgguess;
t.node.getChildByName("guessxianshi").children[0].getChildByName("tl_icon").getChildByName(t.tl_name).getChildByName("mask").getChildByName("pic").getComponent(cc.Sprite).spriteFrame = e;
}
});
}
});
}
}, n = 0; n < o.length; n++) a(n);
}) : "pl" == a[0] && h.default.loadJson(u.default.peopleTable).then(function(o) {
if (o) for (var a = function(a) {
if (o[a].peoId == e) {
var n = o[a].peoIcon;
h.default.loadJson(u.default.picTable).then(function(e) {
if (e) for (var o = 0; o < e.length; o++) if (e[o].picId == n) {
var a = e[o].picName;
h.default.loadPic(a).then(function(e) {
if (e) {
t.node.getChildByName("guessxianshi").children[0].getChildByName("tl_icon").getChildByName(t.tl_name).getComponent(cc.Sprite).spriteFrame = t.bgguess;
t.node.getChildByName("guessxianshi").children[0].getChildByName("tl_icon").getChildByName(t.tl_name).getChildByName("mask").getChildByName("pic").getComponent(cc.Sprite).spriteFrame = e;
}
});
}
});
}
}, n = 0; n < o.length; n++) a(n);
});
o = e == u.default.guess_choose_data[2];
for (var n = 0; n < u.default.localdate.guess_tl.length; n++) if (u.default.localdate.guess_tl[n].tl_id == this.tl_name) {
this.guess_tl_had = !0;
u.default.localdate.guess_tl[n].answer_true_false = o;
u.default.localdate.guess_tl[n].answer = e;
console.log("guess_tl", u.default.localdate.guess_tl);
}
if (!this.guess_tl_had) {
u.default.localdate.guess_tl.push(new i.guess_tl_answer(u.default.clickguessId, this.tl_name, e, o));
console.log("guess_tl", u.default.localdate.guess_tl);
}
this.ischooseall();
};
t.prototype.ischooseall = function() {
for (var e = this, t = [], o = 0; o < u.default.localdate.guess_tl.length; o++) u.default.localdate.guess_tl[o].id == u.default.clickguessId && t.push(u.default.localdate.guess_tl[o]);
var a = [];
h.default.loadJson(u.default.guessTable).then(function(o) {
if (o) {
for (var n = 0; n < o.length; n++) o[n].guessOrder == u.default.clickguessId && "" == o[n].guessName && "" == o[n].guessDes && a.push(o[n]);
console.log("是否已选完", t, a);
if (t.length == a.length) {
e.node.getChildByName("tiptext").active = !1;
e.node.getChildByName("guessbtn").active = !0;
}
}
});
};
t.prototype.checking = function() {
f.default.Env_apkevent_param("event_guess", "第" + u.default.localdate.chapter + "章/" + u.default.clickguessId + "/猜想验证");
this.node.getChildByName("guessbtn").active = !1;
r.default.playEffect("music_009");
if (u.default.localdate.power - (u.default.recode_guess ? u.default.recode_guess : 10) >= 0) {
p.default.addpower(-(u.default.recode_guess ? u.default.recode_guess : 10));
u.default.poweranimnum = u.default.recode_guess ? u.default.recode_guess : 10;
p.default.downpoweranim(this.poweranimpre, this.node.getChildByName("guessbtn").getChildByName("check").position, this.node);
for (var e = 0; e < u.default.localdate.guess_tl.length; e++) if (u.default.localdate.guess_tl[e].id == u.default.clickguessId && !u.default.localdate.guess_tl[e].answer_true_false) {
console.log("错误", u.default.localdate.guess_tl[e].answer_true_false);
this.node.getChildByName("tiptext").active = !0;
h.default.loadJson(u.default.guessTable).then(function(e) {
if (e) for (var t = 0; t < e.length; t++) if (e[t].guessOrder == u.default.clickguessId && "" !== e[t].guessName && "" !== e[t].guessDes && "00" == e[t].guessNum.split("_")[2]) {
r.default.playEffect("music_013");
c.default.strikeTalk(e[t].guessAnswer_false);
}
});
return;
}
console.log("正确");
h.default.loadJson(u.default.guessTable).then(function(e) {
if (e) for (var t = 0; t < e.length; t++) if (e[t].guessOrder == u.default.clickguessId && "" !== e[t].guessName && "" !== e[t].guessDes && "00" == e[t].guessNum.split("_")[2]) {
r.default.playEffect("music_012");
c.default.strikeTalk(e[t].guessAnswer_true);
}
});
} else {
this.node.getChildByName("guessbtn").active = !0;
f.default.Env("up_watch_video_get_power");
}
d.default.next_guide();
u.default.checkguess = !0;
};
t.prototype.guess_ask_isok = function() {
if (u.default.localdate.guideisok) {
for (var e = 0; e < u.default.localdate.guess_tl.length; e++) u.default.localdate.guess_tl[e].id == u.default.clickguessId && (u.default.localdate.guess_tl[e].answer_true_false || (this.guess_choose_answer = !1));
if (this.guess_choose_answer) {
this.true_guess();
this.node.getChildByName("tiptext").active = !1;
} else {
console.log("有错");
this.guess_choose_answer = !0;
for (e = 0; e < u.default.localdate.guess_tl.length; e++) if (u.default.localdate.guess_tl[e].id == u.default.clickguessId && !u.default.localdate.guess_tl[e].answer_true_false) {
var t = u.default.localdate.guess_tl[e].tl_id;
this.node.getChildByName("guessxianshi").children[0].getChildByName("tl_icon").getChildByName(t).getChildByName("wrong").active = !0;
return;
}
}
} else switch (u.default.localdate.chapter) {
case 0:
if (3 == u.default.localdate.guess_tl.length && u.default.checkguess) {
this.true_guess();
this.node.getChildByName("tiptext").active = !1;
}
break;

case 3:
if (2 == u.default.localdate.guess_tl.length && u.default.checkguess) {
this.true_guess();
this.node.getChildByName("tiptext").active = !1;
}
}
};
t.prototype.true_guess = function() {
console.log("正确大章");
r.default.playEffect("music_010");
for (var e = 0; e < u.default.localdate.guess.length; e++) u.default.localdate.guess[e].id == u.default.clickguessId && (u.default.localdate.guess[e].guessType = s.guessType.Locked);
this.prefact.active = !0;
this.prefact.runAction(cc.sequence(cc.scaleTo(1e-10, 1.8, 1.8), cc.scaleTo(.3, 2, 2), cc.scaleTo(.1, 1, 1)));
this.node.getChildByName("guessbtn").active = !1;
f.default.Env("initGuess");
f.default.Env_apkevent_param("event_guess", "第" + u.default.localdate.chapter + "章/" + u.default.clickguessId + "/猜想验证完成");
};
t.prototype.return = function() {
this.node.destroy();
};
l([ y(cc.Prefab) ], t.prototype, "poweranimpre", void 0);
l([ y(cc.Node) ], t.prototype, "prefact", void 0);
l([ y(cc.SpriteFrame) ], t.prototype, "bgguess", void 0);
return l([ _ ], t);
}(cc.Component);
o.default = m;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/addPower": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0,
"../userStore/guess_tl_answer": "guess_tl_answer",
"../userStore/stateType": "stateType",
"../way/guideNew": "guideNew",
"../way/talkStrike": "talkStrike"
} ],
guideNew: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "cd0f0GkqXpJSb5MOyA9VZJo", "guideNew");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.next_guide = o.guide_buzou = o.guide_strike = void 0;
var a = e("../../../textures_load/scripts/userStore/userStore"), n = e("../../../textures_load/scripts/ways/eventPost"), l = e("../userStore/stateType"), i = e("./talkStrike");
function s(e) {
console.log("新手引导strike", e);
e[3] == l.guidestrikeType.talk && "" !== e[3] && null !== e[3] ? i.default.strikeTalk(e[4]) : e[3] == l.guidestrikeType.guidenewid && "" !== e[4] && null !== e[4] && i.default.guide_new(e[4]);
}
o.guide_strike = s;
function c(e, t) {
if (a.default.localdate.guideisok) ; else switch (a.default.localdate.chapter) {
case 0:
d(e, t);
break;

case 3:
u(e, t);
}
}
o.guide_buzou = c;
var r = 0;
function d(e, t) {
var o, l, i;
switch (e) {
case 0:
console.log("弹窗点确定");
o = t.getChildByName("deblock_touch").getChildByName("bg").getChildByName("sure").getPosition();
n.default.Env_data("click_ui_guide", o);
break;

case 1:
console.log("返回");
o = t.getChildByName("return").getPosition();
n.default.Env_data("click_ui_guide", o);
break;

case 2:
console.log("菜单笔记");
var s = t.getChildByName("top").getChildByName("notes").getChildByName("decnotes");
l = s.x;
i = s.y + t.getChildByName("top").getChildByName("notes").position.y;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 3:
console.log("点第一个道具");
var c = t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceprop").getChildByName("propscr").getChildByName("view").getChildByName("content");
l = c.x;
i = c.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceprop").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceprop").getChildByName("propscr").y - 75;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 4:
console.log("点第二个道具");
var d = t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceprop").getChildByName("propscr").getChildByName("view").getChildByName("content");
l = d.x;
i = d.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceprop").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceprop").getChildByName("propscr").y - 75 - 100;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 5:
console.log("点分析");
var u = t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceprop").getChildByName("propdec").getChildByName("propasy").getChildByName("propasystate");
l = u.x;
i = u.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceprop").getChildByName("propdec").getChildByName("propasy").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceprop").getChildByName("propdec").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceprop").y;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 6:
console.log("点推理ui");
var p = t.getChildByName("notes").getChildByName("desibg").getChildByName("tips").getChildByName("guess");
l = p.x + t.getChildByName("notes").getChildByName("desibg").getChildByName("tips").x;
i = p.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("tips").y;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 7:
console.log("出现的推理");
var f = a.default.localdate.guess[0].pos, h = t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("guessscr").children[f];
l = h.x;
i = h.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("guessscr").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").y;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 8:
console.log("推理查看");
o = t.getChildByName("notes").getChildByName("guessclick").getChildByName("bg").getChildByName("sure").getPosition();
n.default.Env_data("click_ui_guide", o);
break;

case 9:
console.log("tl_03_00");
var g = t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessxianshi").getChildByName("guess_1_3").getChildByName("tl_icon").getChildByName("tl_03_00");
l = g.x;
i = g.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessxianshi").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").y;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 10:
console.log("tl_03_03");
var _ = t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessxianshi").getChildByName("guess_1_3").getChildByName("tl_icon").getChildByName("tl_03_03");
l = _.x;
i = _.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessxianshi").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").y;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 11:
console.log("推理选项");
o = t.getChildByName("guess_choose").getChildByName("bg").getChildByName("chooselist").getPosition();
n.default.Env_data("click_ui_guide", o);
break;

case 12:
console.log("推理选项确定");
o = t.getChildByName("guess_choose").getChildByName("bg").getChildByName("sure").getPosition();
n.default.Env_data("click_ui_guide", o);
break;

case 13:
console.log("tl_03_04");
var y = t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessxianshi").getChildByName("guess_1_3").getChildByName("tl_icon").getChildByName("tl_03_04");
l = y.x;
i = y.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessxianshi").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").y;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 14:
console.log("tl_03_02");
var m = t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessxianshi").getChildByName("guess_1_3").getChildByName("tl_icon").getChildByName("tl_03_02");
l = m.x;
i = m.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessxianshi").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").y;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 15:
console.log("tl_03_01");
var v = t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessxianshi").getChildByName("guess_1_3").getChildByName("tl_icon").getChildByName("tl_03_01");
l = v.x;
i = v.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessxianshi").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").y;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 16:
console.log("菜单返回");
r++;
o = t.getChildByName("notes").getChildByName("return").getPosition();
n.default.Env_data("click_ui_guide", o);
r >= 2 && (a.default.localdate.guideisok = !0);
break;

case 17:
console.log("验证");
var C = t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessbtn").getChildByName("check");
l = C.x;
i = C.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessbtn").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").y;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
a.default.localdate.chapter == a.default.recode_startchapter && n.default.Env_apkevent_param("event_newmiss", "结束新手引导");
}
}
function u(e, t) {
var o, l, i;
switch (e) {
case 0:
console.log("弹窗点确定");
o = t.getChildByName("deblock_touch").getChildByName("bg").getChildByName("sure").getPosition();
n.default.Env_data("click_ui_guide", o);
break;

case 1:
console.log("返回");
o = t.getChildByName("return").getPosition();
n.default.Env_data("click_ui_guide", o);
break;

case 2:
console.log("菜单笔记");
var s = t.getChildByName("top").getChildByName("notes").getChildByName("decnotes");
l = s.x;
i = s.y + t.getChildByName("top").getChildByName("notes").position.y;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 3:
console.log("点第一个道具");
var c = t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceprop").getChildByName("propscr").getChildByName("view").getChildByName("content");
l = c.x;
i = c.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceprop").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceprop").getChildByName("propscr").y - 75;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 4:
console.log("点第二个道具");
var r = t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceprop").getChildByName("propscr").getChildByName("view").getChildByName("content");
l = r.x;
i = r.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceprop").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceprop").getChildByName("propscr").y - 75 - 100;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 5:
console.log("点分析");
var d = t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceprop").getChildByName("propdec").getChildByName("propasy").getChildByName("propasystate");
l = d.x;
i = d.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceprop").getChildByName("propdec").getChildByName("propasy").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceprop").getChildByName("propdec").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceprop").y;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 6:
console.log("点推理ui");
var u = t.getChildByName("notes").getChildByName("desibg").getChildByName("tips").getChildByName("guess");
l = u.x + t.getChildByName("notes").getChildByName("desibg").getChildByName("tips").x;
i = u.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("tips").y;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 7:
console.log("出现的推理");
var p = a.default.localdate.guess[0].pos, f = t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("guessscr").children[p];
l = f.x;
i = f.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("guessscr").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").y;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 8:
console.log("推理查看");
o = t.getChildByName("notes").getChildByName("guessclick").getChildByName("bg").getChildByName("sure").getPosition();
n.default.Env_data("click_ui_guide", o);
break;

case 9:
console.log("tl_04_00");
var h = t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessxianshi").getChildByName("guess_4_1").getChildByName("tl_icon").getChildByName("tl_01_00");
l = h.x;
i = h.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessxianshi").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").y;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 10:
console.log("tl_01_01");
var g = t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessxianshi").getChildByName("guess_4_1").getChildByName("tl_icon").getChildByName("tl_01_01");
l = g.x;
i = g.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessxianshi").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").y;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 11:
console.log("推理选项");
o = t.getChildByName("guess_choose").getChildByName("bg").getChildByName("chooselist").getPosition();
n.default.Env_data("click_ui_guide", o);
break;

case 12:
console.log("推理选项确定");
o = t.getChildByName("guess_choose").getChildByName("bg").getChildByName("sure").getPosition();
n.default.Env_data("click_ui_guide", o);
break;

case 13:
console.log("tl_01_02");
var _ = t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessxianshi").getChildByName("guess_4_1").getChildByName("tl_icon").getChildByName("tl_01_02");
l = _.x;
i = _.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessxianshi").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").y;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 14:
console.log("tl_03_02");
var y = t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessxianshi").getChildByName("guess_4_1").getChildByName("tl_icon").getChildByName("tl_03_02");
l = y.x;
i = y.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessxianshi").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").y;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 15:
console.log("tl_03_01");
var m = t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessxianshi").getChildByName("guess_4_1").getChildByName("tl_icon").getChildByName("tl_03_01");
l = m.x;
i = m.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessxianshi").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").y;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
break;

case 16:
console.log("菜单返回");
o = t.getChildByName("notes").getChildByName("return").getPosition();
n.default.Env_data("click_ui_guide", o);
break;

case 17:
console.log("验证");
var v = t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessbtn").getChildByName("check");
l = v.x;
i = v.y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").getChildByName("onlyguess").getChildByName("guessbtn").y + t.getChildByName("notes").getChildByName("desibg").getChildByName("sces").getChildByName("sceguess").y;
o = cc.v2(l, i);
n.default.Env_data("click_ui_guide", o);
a.default.endnewguide = !0;
}
}
function p() {
n.default.Env("guess_anim_des");
if (!a.default.localdate.guideisok) if (a.default.startnewplayerguide) {
console.log("新手触发下一步");
s(a.default.localdate.guideObj);
} else console.log("还没触发新手引导");
}
o.next_guide = p;
o.default = {
guide_strike: s,
guide_buzou: c,
next_guide: p
};
cc._RF.pop();
}, {
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../userStore/stateType": "stateType",
"./talkStrike": "talkStrike"
} ],
move: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "632a92FgAFCCqcIvWsOi7Z/", "move");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator, s = i.ccclass, c = (i.property, function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {};
t.prototype.start = function() {
this.node.runAction(cc.repeatForever(cc.sequence(cc.moveTo(.3, cc.v2(this.node.x, this.node.y - 20)), cc.moveTo(.3, cc.v2(this.node.x, this.node.y)))));
};
return l([ s ], t);
}(cc.Component));
o.default = c;
cc._RF.pop();
}, {} ],
musicSetting: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "31460vUJGZI15dopyl49oLV", "musicSetting");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/userStore/userStore"), s = e("../bannerMan/bannerMan"), c = e("../way/sort"), r = e("../../../textures_load/scripts/music/musicControl"), d = e("./music_effect"), u = cc._decorator, p = u.ccclass, f = u.property, h = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.musicgou = null;
t.effectgou = null;
t.talkgou = null;
t.musictip = null;
t.effecttip = null;
t.talktip = null;
t.musicbai = null;
t.effectbai = null;
t.talkbai = null;
return t;
}
t.prototype.onLoad = function() {
s.default.show();
this.init();
};
t.prototype.start = function() {};
t.prototype.init = function() {
console.log("初始化音", i.default.localdate.musicgoutime, i.default.localdate.effectgoutime);
console.log("是否播放音乐", i.default.playbgmusicing);
this.initMus("start");
this.initEff();
this.initTalk("start");
};
t.prototype.initMus = function(e) {
if (i.default.localdate.musicgoutime % 2 == 1) {
this.musicgou.opacity = 0;
d.default.offMus();
} else if (i.default.localdate.musicgoutime % 2 == 0) {
this.musicgou.opacity = 250;
i.default.playbgmusicing || e && "start" == e || d.default.onMus();
}
console.log("init", i.default.localdate.musicgouVoice);
var t = 100 * i.default.localdate.musicgouVoice, o = 2 * t - 100;
this.musictip.parent.setPosition(o, 0);
this.musicbai.string = String(parseInt(String(t)));
};
t.prototype.initEff = function() {
if (i.default.localdate.effectgoutime % 2 == 1) {
this.effectgou.opacity = 0;
d.default.offEFF();
} else if (i.default.localdate.effectgoutime % 2 == 0) {
this.effectgou.opacity = 250;
d.default.onEff();
}
var e = 100 * i.default.localdate.effectgouVoice, t = 2 * e - 100;
this.effecttip.parent.setPosition(t, 0);
this.effectbai.string = String(parseInt(String(e)));
};
t.prototype.initTalk = function(e) {
if (i.default.localdate.talkgoutime % 2 == 1) {
this.talkgou.opacity = 0;
d.default.offTalk();
} else if (i.default.localdate.talkgoutime % 2 == 0) {
this.talkgou.opacity = 250;
e && "start" == e || d.default.onTalk();
}
var t = 100 * i.default.localdate.talkgouVoice, o = 2 * t - 100;
this.talktip.parent.setPosition(o, 0);
this.talkbai.string = String(parseInt(String(t)));
};
t.prototype.musicgoux = function() {
i.default.localdate.musicgoutime++;
console.log("点击音乐", i.default.localdate.musicgoutime);
this.initMus();
};
t.prototype.effectgoux = function() {
i.default.localdate.effectgoutime++;
console.log("点击音效", i.default.localdate.effectgoutime);
this.initEff();
};
t.prototype.talkgoux = function() {
i.default.localdate.talkgoutime++;
console.log("点击对话", i.default.localdate.talkgoutime);
this.initTalk();
};
t.prototype.close = function() {
r.default.playEffect("music_009");
s.default.hide();
this.node.destroy();
};
t.prototype.onEnable = function() {
this.musictip.on(cc.Node.EventType.TOUCH_START, this.on_touch_start, this);
this.musictip.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this);
this.musictip.on(cc.Node.EventType.TOUCH_END, this.on_touch_end, this);
this.effecttip.on(cc.Node.EventType.TOUCH_START, this.on_touch_start1, this);
this.effecttip.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move1, this);
this.effecttip.on(cc.Node.EventType.TOUCH_END, this.on_touch_end1, this);
this.talktip.on(cc.Node.EventType.TOUCH_START, this.on_touch_start2, this);
this.talktip.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move2, this);
this.talktip.on(cc.Node.EventType.TOUCH_END, this.on_touch_end2, this);
};
t.prototype.onDisable = function() {
this.musictip.off(cc.Node.EventType.TOUCH_START, this.on_touch_start, this);
this.musictip.off(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this);
this.musictip.off(cc.Node.EventType.TOUCH_END, this.on_touch_end, this);
this.effecttip.off(cc.Node.EventType.TOUCH_START, this.on_touch_start1, this);
this.effecttip.off(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move1, this);
this.effecttip.off(cc.Node.EventType.TOUCH_END, this.on_touch_end1, this);
this.talktip.off(cc.Node.EventType.TOUCH_START, this.on_touch_start2, this);
this.talktip.off(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move2, this);
this.talktip.off(cc.Node.EventType.TOUCH_END, this.on_touch_end2, this);
};
t.prototype.on_touch_start = function() {};
t.prototype.on_touch_end = function() {};
t.prototype.on_touch_move = function(e) {
var t = this.musictip.parent.parent.convertToNodeSpaceAR(e.getLocation()).x;
t = (t = t >= 100 ? 100 : t) <= -100 ? -100 : t;
this.musictip.parent.setPosition(t, 0);
var o = t + 100;
this.musicbai.string = String(parseInt(String(o / 2)));
i.default.localdate.musicgouVoice = Number(c.default.fomatFloat(Number(this.musicbai.string) / 100, 2));
r.default.BgmVoice(i.default.audioId, i.default.localdate.musicgouVoice);
};
t.prototype.on_touch_start1 = function() {};
t.prototype.on_touch_end1 = function() {};
t.prototype.on_touch_move1 = function(e) {
var t = this.effecttip.parent.parent.convertToNodeSpaceAR(e.getLocation()).x;
t = (t = t >= 100 ? 100 : t) <= -100 ? -100 : t;
this.effecttip.parent.setPosition(t, 0);
var o = t + 100;
this.effectbai.string = String(parseInt(String(o / 2)));
i.default.localdate.effectgouVoice = Number(c.default.fomatFloat(Number(this.effectbai.string) / 100, 2));
};
t.prototype.on_touch_start2 = function() {};
t.prototype.on_touch_end2 = function() {};
t.prototype.on_touch_move2 = function(e) {
var t = this.talktip.parent.parent.convertToNodeSpaceAR(e.getLocation()).x;
t = (t = t >= 100 ? 100 : t) <= -100 ? -100 : t;
this.talktip.parent.setPosition(t, 0);
var o = t + 100;
this.talkbai.string = String(parseInt(String(o / 2)));
i.default.localdate.talkgouVoice = Number(c.default.fomatFloat(Number(this.talkbai.string) / 100, 2));
r.default.TalkVoice(i.default.TalkaudioId, i.default.localdate.talkgouVoice);
};
l([ f(cc.Node) ], t.prototype, "musicgou", void 0);
l([ f(cc.Node) ], t.prototype, "effectgou", void 0);
l([ f(cc.Node) ], t.prototype, "talkgou", void 0);
l([ f(cc.Node) ], t.prototype, "musictip", void 0);
l([ f(cc.Node) ], t.prototype, "effecttip", void 0);
l([ f(cc.Node) ], t.prototype, "talktip", void 0);
l([ f(cc.Label) ], t.prototype, "musicbai", void 0);
l([ f(cc.Label) ], t.prototype, "effectbai", void 0);
l([ f(cc.Label) ], t.prototype, "talkbai", void 0);
return l([ p ], t);
}(cc.Component);
o.default = h;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../bannerMan/bannerMan": "bannerMan",
"../way/sort": "sort",
"./music_effect": "music_effect"
} ],
music_effect: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "23e2baRFNNNbq2VsO6o6720", "music_effect");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.offTalk = o.onTalk = o.offEFF = o.onEff = o.offMus = o.onMus = void 0;
var a = e("../../../textures_load/scripts/userStore/userStore"), n = e("../../../textures_load/scripts/music/musicControl");
function l() {
a.default.isBgmEnabled = !0;
n.default.playBgm(a.default.musicId);
}
o.onMus = l;
function i() {
a.default.isBgmEnabled = !1;
n.default.stopBgm();
}
o.offMus = i;
function s() {
a.default.isEffEnabled = !0;
}
o.onEff = s;
function c() {
a.default.isEffEnabled = !1;
}
o.offEFF = c;
function r() {
a.default.isTalkEnabled = !0;
n.default.playTalk(a.default.TalkId);
}
o.onTalk = r;
function d() {
a.default.isTalkEnabled = !1;
n.default.stopTalk(a.default.TalkId);
}
o.offTalk = d;
o.default = {
onMus: l,
offMus: i,
onEff: s,
offEFF: c,
onTalk: r,
offTalk: d
};
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0
} ],
new_Tip_num: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "5924cOMrctCbJpFhUv3vhKQ", "new_Tip_num");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.prop_asy_power = o.map_tip_up_down = o.map_sce = o.not_find_prop = o.new_tip = void 0;
var a = e("../../../textures_load/scripts/userStore/userStore"), n = e("../../../textures_load/scripts/ways/eventPost"), l = e("../../../textures_load/scripts/ways/load_Json_Pic");
function i(e) {
for (var t = [], o = 0; o < e.length; o++) 1 == e[o] && t.push(e[o]);
return t.length;
}
o.new_tip = i;
function s() {
return new Promise(function(e) {
var t = [], o = 0;
a.default.localdate.allSceneOpen.forEach(function(n) {
l.default.loadJson(a.default.propTable).then(function(a) {
if (a) for (var l = 0, i = a.length; l < i; l++) {
a[l].fromScene == n && t.push(a[l].propNum);
c(++o, t).then(function(t) {
t && e(t);
});
}
});
});
});
}
o.not_find_prop = s;
function c(e, t) {
return new Promise(function(o) {
if (e == a.default.localdate.allSceneOpen.length * a.default.propTable.length) {
var n = [], l = !0;
t.forEach(function(e) {
l = !0;
for (var t = 0, o = a.default.localdate.prop.length; t < o; t++) if (e == a.default.localdate.prop[t].id) {
l = !1;
break;
}
l && n.push(e);
});
o(n);
}
});
}
function r() {
return new Promise(function(e) {
var t = [], o = 0, n = a.default.localdate.door;
l.default.loadJson(a.default.touchTable).then(function(l) {
console.log("res", l);
if (l) for (var i = 0, s = n.length; i < s; i++) {
o++;
for (var c = 0, r = l.length; c < r; c++) if (n[i] == l[c].touchId && null !== l[c].state && "" !== l[c].state) {
t.push(l[c].target);
if (o == n.length) {
console.log("map", t, n);
a.default.mapSces = t;
e(!0);
}
}
}
});
});
}
o.map_sce = r;
function d() {
r().then(function(e) {
if (e) {
var t = 0;
console.log("userStore.mapSces", a.default.mapSces);
if (null !== a.default.mapSces && a.default.mapSces.length > 0) for (var o = 0, l = a.default.mapSces.length; o < l; o++) {
var i = o;
if (a.default.localdate.allSceneOpen.includes(a.default.mapSces[i])) {
if (++t == a.default.mapSces.length) {
console.log("场景全进过");
n.default.Env("map_down_tip");
}
} else {
console.log("场景没全进过");
n.default.Env("map_up_tip");
}
}
}
});
}
o.map_tip_up_down = d;
o.default = {
new_tip: i,
not_find_prop: s,
map_sce: r,
map_tip_up_down: d,
prop_asy_power: u
};
function u() {
return new Promise(function(e) {
l.default.loadJson(a.default.propTable).then(function(t) {
t && e(a.default.propTable[0].time);
});
});
}
o.prop_asy_power = u;
cc._RF.pop();
}, {
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0
} ],
nextchapter_power: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "1136ahXeJ1N/aLFPKMJsXIX", "nextchapter_power");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("./Toast"), s = e("../bannerMan/bannerMan"), c = e("../../../textures_load/scripts/userStore/userStore"), r = e("../../../textures_load/scripts/ways/eventPost"), d = cc._decorator, u = d.ccclass, p = (d.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
c.default.timevideonum = 0;
};
t.prototype.start = function() {
s.default.show("是否看视频");
};
t.prototype.yes = function() {
i.default.showTip("暂无视频！");
};
t.prototype.success = function() {
var e = this;
this.scheduleOnce(function() {
c.default.localdate.power = c.default.recode_allpowers ? c.default.recode_allpowers : 200;
e.no();
}, .5);
};
t.prototype.no = function() {
c.default.timevideonum = 0;
s.default.hide();
r.default.Env("return_nextchapter");
this.node.destroy();
};
return l([ u ], t);
}(cc.Component));
o.default = p;
cc._RF.pop();
}, {
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../bannerMan/bannerMan": "bannerMan",
"./Toast": "Toast"
} ],
peopleIcon: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "9787dLnG2BOgJRCjCqCtuoi", "peopleIcon");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/userStore/userStore"), s = e("../../../textures_load/scripts/ways/eventPost"), c = e("../../../textures_load/scripts/ways/load_Json_Pic"), r = e("../../../textures_load/scripts/music/musicControl"), d = cc._decorator, u = d.ccclass, p = (d.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {};
t.prototype.start = function() {};
t.prototype.clickicon = function(e) {
r.default.playEffect("music_008");
console.log(e.target.getChildByName("lab").getComponent(cc.Label).string);
var t = e.target.getChildByName("lab").getComponent(cc.Label).string;
c.default.loadJson(i.default.peopleTable).then(function(e) {
if (e) for (var o = 0; o < e.length; o++) if (e[o].peoName == t) for (var a = e[o].peoId, n = 0; n < i.default.localdate.people.length; n++) if (i.default.localdate.people[n] == a) {
var l = n;
i.default.localdate.peoplenew[l] = 0;
console.log("peoplenew", i.default.localdate.peoplenew);
s.default.Env("down_tip");
}
});
s.default.Env_data("downallicon", t);
if ("???" !== t) {
e.target.parent.getChildByName("icon").active = !0;
c.default.loadJson(i.default.peopleTable).then(function(o) {
if (o) for (var a = function(a) {
if (o[a].peoName == t) {
var n = o[a].peoIcon;
c.default.loadJson(i.default.picTable).then(function(t) {
if (t) for (var o = 0; o < t.length; o++) if (t[o].picId == n) {
var a = t[o].picName;
c.default.loadPic(a).then(function(t) {
t && (e.target.parent.getChildByName("icon").getChildByName("bg").getChildByName("peopic").getComponent(cc.Sprite).spriteFrame = t);
});
}
});
s.default.Env_data("clickicon", o[a]);
}
}, n = 0; n < o.length; n++) a(n);
});
}
};
return l([ u ], t);
}(cc.Component));
o.default = p;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0
} ],
peopleList: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "8665fq1h7ZDmqCQ7aJ+rD5T", "peopleList");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/userStore/userStore"), s = e("../../../textures_load/scripts/ways/eventPost"), c = e("../../../textures_load/scripts/ways/load_Json_Pic"), r = cc._decorator, d = r.ccclass, u = r.property, p = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.iconpre = null;
t.SimpLab = null;
t.DetaLab = null;
t.content = null;
t.peonode = null;
t.peoname = null;
t.unlockedpeo = null;
return t;
}
t.prototype.onLoad = function() {
this.initContent();
};
t.prototype.start = function() {
var e = this;
cc.systemEvent.on("clickicon", function(t) {
console.log("接收点击icon显示信息");
var o = t.getUserData();
e.clickicon(o);
}, this);
cc.systemEvent.on("downallicon", function(t) {
console.log("接收收回之前点开的");
var o = t.getUserData();
e.downallicon(o);
}, this);
cc.systemEvent.on("initContent", this.initContent, this);
cc.systemEvent.on("down_tip", this.down_tip, this);
};
t.prototype.growOrder = function() {
var e = this;
this.content.children[0].getChildByName("icon").active = !0;
c.default.loadJson(i.default.peopleTable).then(function(t) {
if (t) for (var o = function(o) {
if ("pl_001" == t[o].peoId) {
e.clickicon(t[o]);
var a = t[o].peoIcon;
c.default.loadJson(i.default.picTable).then(function(t) {
if (t) for (var o = 0; o < t.length; o++) if (t[o].picId == a) {
var n = t[o].picName;
c.default.loadPic(n).then(function(t) {
t && e.content.children[0] && (e.content.children[0].getChildByName("icon").getChildByName("bg").getChildByName("peopic").getComponent(cc.Sprite).spriteFrame = t);
});
}
});
}
}, a = 0, n = t.length; a < n; a++) o(a);
});
};
t.prototype.downallicon = function(e) {
if ("???" !== e) for (var t = 0; t < this.content.children.length; t++) this.content.children[t].getChildByName("name").getChildByName("lab").getComponent(cc.Label).string == e || (this.content.children[t].getChildByName("icon").active = !1);
};
t.prototype.initContent = function() {
var e = this;
console.log("接收初始化people");
console.log("people", i.default.localdate.people);
if (this.content.children.length > 0) for (var t = 0; t < this.content.children.length; t++) this.content.children[t].destroy();
c.default.loadJson(i.default.peopleTable).then(function(t) {
if (t) {
for (var o = 0; o < i.default.localdate.people.length; o++) for (var a = 0; a < t.length; a++) if (t[a].peoId == i.default.localdate.people[o]) {
console.log("eeee", t[a].peoIcon);
e.upcontent(t[a].peoIcon, t[a].peoName);
}
console.log("peoplenew", i.default.localdate.peoplenew);
var n = function() {
if (1 == i.default.localdate.peoplenew[o]) {
var t = i.default.localdate.people[o];
c.default.loadJson(i.default.peopleTable).then(function(o) {
if (o) for (var a = 0; a < o.length; a++) if (o[a].peoId == t) for (var n = o[a].peoName, l = 0; l < e.content.children.length; l++) e.content.children[l].getChildByName("name").getChildByName("lab").getComponent(cc.Label).string == n && (e.content.children[l].getChildByName("name").getChildByName("ti").active = !0);
});
}
};
for (o = 0; o < i.default.localdate.peoplenew.length; o++) n();
for (var l = 0; l < 9 - i.default.localdate.people.length; l++) e.upcontent1();
e.growOrder();
}
});
};
t.prototype.upcontent = function(e, t) {
var o = cc.instantiate(this.iconpre);
o.parent = this.content;
o.getChildByName("name").getChildByName("lab").getComponent(cc.Label).string = t;
"pic_plicon_001" == e || (o.getChildByName("icon").active = !1);
o.getChildByName("name").getChildByName("ti").active = !1;
};
t.prototype.upcontent1 = function() {
var e = cc.instantiate(this.iconpre);
e.parent = this.content;
e.getChildByName("name").getChildByName("lab").getComponent(cc.Label).string = "???";
e.getChildByName("name").getComponent(cc.Sprite).spriteFrame = this.unlockedpeo;
e.getChildByName("icon").active = !1;
};
t.prototype.down_tip = function() {
var e = this;
console.log("接收隐藏红点");
for (var t = function() {
if (0 == i.default.localdate.peoplenew[o]) {
var t = i.default.localdate.people[o];
c.default.loadJson(i.default.peopleTable).then(function(o) {
if (o) for (var a = 0; a < o.length; a++) if (o[a].peoId == t) {
for (var n = o[a].peoName, l = 0; l < e.content.children.length; l++) e.content.children[l].getChildByName("name").getChildByName("lab").getComponent(cc.Label).string == n && (e.content.children[l].getChildByName("name").getChildByName("ti").active = !1);
s.default.Env("updata_tip");
}
});
}
}, o = 0; o < i.default.localdate.peoplenew.length; o++) t();
};
t.prototype.clickicon = function(e) {
var t = this;
this.SimpLab.string = e.peoSimp;
this.DetaLab.string = e.peoDeta;
c.default.loadJson(i.default.picTable).then(function(o) {
if (o) for (var a = 0; a < o.length; a++) {
if (o[a].picId == e.peoPic) {
var n = o[a].picName;
c.default.loadPic(n).then(function(e) {
e && (t.peonode.getComponent(cc.Sprite).spriteFrame = e);
});
}
if (o[a].picId == e.peoname) {
n = o[a].picName;
c.default.loadPic(n).then(function(e) {
e && (t.peoname.getComponent(cc.Sprite).spriteFrame = e);
});
}
}
});
};
t.prototype.update = function() {};
l([ u(cc.Prefab) ], t.prototype, "iconpre", void 0);
l([ u(cc.Label) ], t.prototype, "SimpLab", void 0);
l([ u(cc.Label) ], t.prototype, "DetaLab", void 0);
l([ u(cc.Node) ], t.prototype, "content", void 0);
l([ u(cc.Node) ], t.prototype, "peonode", void 0);
l([ u(cc.Node) ], t.prototype, "peoname", void 0);
l([ u(cc.SpriteFrame) ], t.prototype, "unlockedpeo", void 0);
return l([ d ], t);
}(cc.Component);
o.default = p;
cc._RF.pop();
}, {
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0
} ],
postLocaldata: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "c783ajpHq5CqZ6QsvT76Gar", "postLocaldata");
var a = this && this.__awaiter || function(e, t, o, a) {
return new (o || (o = Promise))(function(n, l) {
function i(e) {
try {
c(a.next(e));
} catch (e) {
l(e);
}
}
function s(e) {
try {
c(a.throw(e));
} catch (e) {
l(e);
}
}
function c(e) {
e.done ? n(e.value) : (t = e.value, t instanceof o ? t : new o(function(e) {
e(t);
})).then(i, s);
var t;
}
c((a = a.apply(e, t || [])).next());
});
}, n = this && this.__generator || function(e, t) {
var o, a, n, l, i = {
label: 0,
sent: function() {
if (1 & n[0]) throw n[1];
return n[1];
},
trys: [],
ops: []
};
return l = {
next: s(0),
throw: s(1),
return: s(2)
}, "function" == typeof Symbol && (l[Symbol.iterator] = function() {
return this;
}), l;
function s(e) {
return function(t) {
return c([ e, t ]);
};
}
function c(l) {
if (o) throw new TypeError("Generator is already executing.");
for (;i; ) try {
if (o = 1, a && (n = 2 & l[0] ? a.return : l[0] ? a.throw || ((n = a.return) && n.call(a), 
0) : a.next) && !(n = n.call(a, l[1])).done) return n;
(a = 0, n) && (l = [ 2 & l[0], n.value ]);
switch (l[0]) {
case 0:
case 1:
n = l;
break;

case 4:
i.label++;
return {
value: l[1],
done: !1
};

case 5:
i.label++;
a = l[1];
l = [ 0 ];
continue;

case 7:
l = i.ops.pop();
i.trys.pop();
continue;

default:
if (!(n = i.trys, n = n.length > 0 && n[n.length - 1]) && (6 === l[0] || 2 === l[0])) {
i = 0;
continue;
}
if (3 === l[0] && (!n || l[1] > n[0] && l[1] < n[3])) {
i.label = l[1];
break;
}
if (6 === l[0] && i.label < n[1]) {
i.label = n[1];
n = l;
break;
}
if (n && i.label < n[2]) {
i.label = n[2];
i.ops.push(l);
break;
}
n[2] && i.ops.pop();
i.trys.pop();
continue;
}
l = t.call(e, i);
} catch (e) {
l = [ 6, e ];
a = 0;
} finally {
o = n = 0;
}
if (5 & l[0]) throw l[1];
return {
value: l[0] ? l[1] : void 0,
done: !0
};
}
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var l = e("../../../textures_load/scripts/userStore/userStore"), i = e("../../../textures_load/scripts/userStore/Utils"), s = e("./ganImports"), c = function() {
function e() {
var e = this;
this.emitEvent = function() {
e.send();
};
this.send = function() {
return a(e, void 0, void 0, function() {
var e, t, o;
return n(this, function() {
e = s.default.getHeartbeatData().localdate;
t = e;
o = i.default.encrypt(JSON.stringify(t));
cc.sys.localStorage.setItem("data_local", o);
cc.sys.localStorage.setItem("data_local_chapterData", l.default.chapterData);
cc.sys.localStorage.setItem("data_local_offlineTime", new Date().getTime());
return [ 2 ];
});
});
};
}
e.prototype.getSchedular = function() {
return cc.director.getScheduler();
};
e.prototype.start = function() {
this.restart();
};
e.prototype.restart = function() {
this.stop();
this.getSchedular().schedule(this.emitEvent, cc.director.getScene(), 1);
};
e.prototype.stop = function() {
this.getSchedular().unschedule(this.emitEvent, cc.director.getScene());
};
return e;
}();
o.default = new c();
cc._RF.pop();
}, {
"../../../textures_load/scripts/userStore/Utils": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"./ganImports": "ganImports"
} ],
powerAnim: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "bfe2fzLSUVO+qjgJSmUismN", "powerAnim");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/userStore/userStore"), s = cc._decorator, c = s.ccclass, r = s.property, d = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lab = null;
return t;
}
t.prototype.onLoad = function() {};
t.prototype.start = function() {
this.lab.string = i.default.poweranimnum + "";
this.anim();
};
t.prototype.anim = function() {
this.node.runAction(cc.sequence(cc.moveTo(1, this.node.x, this.node.y + 100), cc.fadeOut(.5)));
};
l([ r(cc.Label) ], t.prototype, "lab", void 0);
return l([ c ], t);
}(cc.Component);
o.default = d;
cc._RF.pop();
}, {
"../../../textures_load/scripts/userStore/userStore": void 0
} ],
propAsy: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "243fefK/4tHgYYxBL0KDX6E", "propAsy");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../way/talkStrike"), s = e("../way/Toast"), c = e("../../../textures_load/scripts/music/musicControl"), r = e("../way/guideNew"), d = e("../../../textures_load/scripts/userStore/userStore"), u = e("../../../textures_load/scripts/ways/addPower"), p = e("../../../textures_load/scripts/ways/eventPost"), f = e("../../../textures_load/scripts/ways/load_Json_Pic"), h = cc._decorator, g = h.ccclass, _ = h.property, y = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.judgeonlyasy = !1;
t.poweranimpre = null;
return t;
}
t.prototype.onLoad = function() {};
t.prototype.start = function() {
cc.systemEvent.on("can_asypropmore", this.can_asypropmore, this);
cc.systemEvent.on("can_asypropsuddly", this.can_asypropsuddly, this);
};
t.prototype.asyprop = function(e) {
r.default.next_guide();
c.default.playEffect("music_009");
this.judgeonlyasy = !1;
this.clickpropnode = e;
this.propname = e.target.parent.parent.getChildByName("proptip").getChildByName("lab").getComponent(cc.Label).string;
for (var t = 0; t < d.default.localdate.prop.length; t++) if (d.default.localdate.prop[t].name == this.propname) if (d.default.localdate.prop[t].propType <= 1) {
this.asypower = d.default.localdate.prop[t].asypower;
for (var o = 0; o < d.default.localdate.prop.length; o++) 2 == d.default.localdate.prop[o].propType && (this.judgeonlyasy = !0);
if (this.judgeonlyasy) d.default.localdate.scheduleList.length > 0 ? this.can_asypropmore() : s.default.showTip("同时分析已达上限！"); else {
console.log("减体力", d.default.localdate.prop[t].asypower);
if (d.default.localdate.power - d.default.localdate.prop[t].asypower >= 0) {
u.default.addpower(-d.default.localdate.prop[t].asypower);
d.default.poweranimnum = d.default.localdate.prop[t].asypower;
u.default.downpoweranim(this.poweranimpre, this.node.getChildByName("propasystate").position, this.node);
var a = [ this.propname, e ];
p.default.Env_data("starttime", a);
p.default.Env_data("state_Locking", this.propname);
p.default.Env("downpowerfuhao");
} else p.default.Env("up_watch_video_get_power");
}
} else if (2 == d.default.localdate.prop[t].propType) {
c.default.playEffect("music_009");
if (d.default.localdate.power - (d.default.recode_asy_atonce ? d.default.recode_asy_atonce : 10) >= 0) {
u.default.addpower(-(d.default.recode_asy_atonce ? d.default.recode_asy_atonce : 10));
d.default.poweranimnum = d.default.recode_asy_atonce ? d.default.recode_asy_atonce : 10;
u.default.downpoweranim(this.poweranimpre, this.node.getChildByName("propasystate").position, this.node);
this.can_asypropsuddly();
} else p.default.Env("up_watch_video_get_power");
}
};
t.prototype.can_asypropmore = function() {
if (d.default.localdate.power - this.asypower >= 0) {
u.default.addpower(-this.asypower);
d.default.poweranimnum = this.asypower;
u.default.downpoweranim(this.poweranimpre, this.node.getChildByName("propasystate").position, this.node);
p.default.Env_data("state_Locking", this.propname);
var e = [ this.propname, this.clickpropnode ];
p.default.Env_data("starttime", e);
} else p.default.Env("up_watch_video_get_power");
};
t.prototype.can_asypropsuddly = function() {
for (var e = 0; e < d.default.localdate.prop.length; e++) if (d.default.localdate.prop[e].name == this.propname) {
var t = d.default.localdate.prop[e].scheNum;
console.log("看视频立即完成分析", t);
p.default.Env_data("downtimesudd", {
name: this.propname,
schenum: t
});
}
};
t.prototype.clickask = function(e) {
c.default.playEffect("music_009");
if (d.default.localdate.power - (d.default.recode_ask ? d.default.recode_ask : 3) >= 0) {
u.default.addpower(-(d.default.recode_ask ? d.default.recode_ask : 3));
d.default.poweranimnum = d.default.recode_ask ? d.default.recode_ask : 3;
u.default.downpoweranim(this.poweranimpre, this.node.getChildByName("propasystate").position, this.node);
var t = e.target.parent.parent.getChildByName("proptip").getChildByName("lab").getComponent(cc.Label).string;
f.default.loadJson(d.default.propTable).then(function(e) {
if (e) for (var o = 0; o < e.length; o++) if (e[o].prop == t && "" !== e[o].strike2 && null !== e[o].strike2) {
var a = e[o].strike2;
i.default.strikeTalk(a, t);
}
});
} else p.default.Env("up_watch_video_get_power");
};
t.prototype.memory = function(e) {
c.default.playEffect("music_009");
if (d.default.localdate.power - (d.default.recode_memory ? d.default.recode_memory : 5) >= 0) {
u.default.addpower(-(d.default.recode_memory ? d.default.recode_memory : 5));
d.default.poweranimnum = d.default.recode_memory ? d.default.recode_memory : 5;
u.default.downpoweranim(this.poweranimpre, this.node.getChildByName("propasystate").position, this.node);
var t = e.target.parent.parent.getChildByName("proptip").getChildByName("lab").getComponent(cc.Label).string;
console.log("回忆", t);
var o = [];
f.default.loadJson(d.default.propTable).then(function(e) {
if (e) for (var a = 0; a < e.length; a++) if (e[a].prop == t) {
var n = e[a].propNum.split("_");
console.log("11111111", Number(n[1]), d.default.localdate.chapter);
if (Number(n[1]) !== d.default.localdate.chapter + 1) {
console.log("是承接的道具");
d.default.oldprop_strikeguess = !0;
} else d.default.oldprop_strikeguess = !1;
"" !== e[a].strike1 && null !== e[a].strike1 && o.push(e[a].strike1);
"" !== e[a].strike2 && null !== e[a].strike2 && o.push(e[a].strike2);
"" !== e[a].strike3 && null !== e[a].strike3 && o.push(e[a].strike3);
console.log("alltalk", o);
o.length >= 1 && f.default.loadJson(d.default.talkTable).then(function(e) {
if (e) for (var t = [], a = 0, n = 0; n < o.length; n++) {
a++;
for (var l = 0; l < e.length; l++) e[l].talkClert == o[n] && t.push(e[l]);
if (a == o.length) {
d.default.talkClert = t;
d.default.ismomery = !0;
p.default.Env("uptalk");
}
}
});
}
});
} else p.default.Env("up_watch_video_get_power");
};
l([ _(cc.Prefab) ], t.prototype, "poweranimpre", void 0);
return l([ g ], t);
}(cc.Component);
o.default = y;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/addPower": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0,
"../way/Toast": "Toast",
"../way/guideNew": "guideNew",
"../way/talkStrike": "talkStrike"
} ],
propData: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "a97f5gcJJhPzb89zLZG5SNp", "propData");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.propData = void 0;
o.propData = function(e, t, o, a, n, l, i) {
this.propType = null;
this.name = "";
this.id = "";
this.time = 0;
this.asypower = 0;
this.isasying = !1;
this.scheNum = 0;
this.id = e;
this.propType = o;
this.name = t;
this.time = a;
this.isasying = n;
this.scheNum = l;
this.asypower = i;
};
cc._RF.pop();
}, {} ],
propList: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "24c0eqIErdMdqH4kQWaorIg", "propList");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../userStore/stateType"), s = e("../way/talkStrike"), c = e("../way/sort"), r = e("../way/guideNew"), d = e("../../../textures_load/scripts/music/musicControl"), u = e("../../../textures_load/scripts/userStore/userStore"), p = e("../../../textures_load/scripts/ways/eventPost"), f = e("../../../textures_load/scripts/ways/load_Json_Pic"), h = cc._decorator, g = h.ccclass, _ = h.property, y = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.iconpre = null;
t.content = null;
t.propasypre = null;
t.state_prop = [];
t.click_light = [];
t.judgeonlyasy = !1;
return t;
}
t.prototype.onLoad = function() {
this.initpropList();
};
t.prototype.start = function() {
var e = this;
cc.systemEvent.on("clickprop", function(t) {
console.log("接收clickprop");
var o = t.getUserData();
e.clickprop(o);
}, this);
cc.systemEvent.on("statebtn", function(t) {
console.log("接收statebtn");
var o = t.getUserData();
e.statebtn(o);
}, this);
cc.systemEvent.on("state_Locked", function(t) {
console.log("接收state_Locked");
var o = t.getUserData();
e.state_Locked(o);
}, this);
cc.systemEvent.on("state_Locking", function(t) {
console.log("接收state_Locking");
var o = t.getUserData();
e.state_Locking(o);
}, this);
cc.systemEvent.on("starttime", function(t) {
console.log("接收starttime");
var o = t.getUserData();
e.starttime(o[0], o[1]);
}, this);
cc.systemEvent.on("downtime", function(t) {
console.log("接收downtime");
var o = t.getUserData().propname, a = t.getUserData().schname;
e.downtime(o, a);
}, this);
cc.systemEvent.on("downtimesudd", function(t) {
console.log("接收downtimesudd");
var o = t.getUserData().name, a = t.getUserData().schenum;
e.downtimesudd(o, a);
}, this);
cc.systemEvent.on("timejishi", function(t) {
var o = t.getUserData().name, a = t.getUserData().node, n = t.getUserData().num, l = t.getUserData().schname;
e.timejishi(o, a, n, l);
}, this);
cc.systemEvent.on("up_height_light", function(t) {
console.log("接收up_height_light");
var o = t.getUserData();
e.up_height_light(o);
}, this);
cc.systemEvent.on("initpropList", this.initpropList, this);
cc.systemEvent.on("prop_strike1_ok", this.prop_strike1_ok, this);
cc.systemEvent.on("downpowerfuhao", this.downpowerfuhao, this);
cc.systemEvent.on("close_prop_schedule", function() {
e.propsch && e.unschedule(e.propsch);
}, this);
};
t.prototype.downpowerfuhao = function() {
console.log("隐藏体力图标");
this.propasynode.getChildByName("asyclue").getChildByName("tili").active = !1;
this.propasynode.getChildByName("asyclue").getChildByName("lab").setPosition(-60, 0);
};
t.prototype.uppowerfuhao = function() {
console.log("显示体力图标");
this.propasynode.getChildByName("asyclue").getChildByName("tili").active = !0;
this.propasynode.getChildByName("asyclue").getChildByName("pro").getComponent(cc.ProgressBar).progress = 0;
this.propasynode.getChildByName("asyclue").getChildByName("lab").setPosition(0, 0);
};
t.prototype.initpropList = function() {
var e = this;
console.log("接收initpropList");
console.log("prop", u.default.localdate.prop);
u.default.now_click_prop = null;
u.default.last_click_prop = null;
this.cleanpropdec();
this.node.getChildByName("propdec").getChildByName("tiplab").active = !0;
this.propasynode && (this.propasynode.getChildByName("prefect").active = !1);
c.default.sort(u.default.localdate.prop);
if (this.content.children.length > 0) for (var t = 0; t < this.content.children.length; t++) this.content.children[t].destroy();
var o = [], a = 0;
f.default.loadJson(u.default.propTable).then(function(t) {
if (t) for (var n = 0; n < u.default.localdate.prop.length; n++) for (var l = 0; l < t.length; l++) if (t[l].propNum == u.default.localdate.prop[n].id) {
a++;
o.push(t[l]);
if (a == u.default.localdate.prop.length) {
console.log("prpppp", o);
e.upcontent(o);
}
}
});
this.node.getChildByName("propscr").getComponent(cc.ScrollView).scrollToTop(.001);
};
t.prototype.upcontent = function(e) {
var t = this;
this._loadPrefabFrame(2, e.length, e, function(e) {
if (e && null != e) {
var o = cc.instantiate(t.iconpre);
o.parent = t.content;
f.default.loadJson(u.default.picTable).then(function(t) {
if (t) for (var a = 0; a < t.length; a++) if (t[a].picId == e.propPic) {
var n = t[a].picName;
f.default.loadPic(n).then(function(e) {
e && null !== o.children && (o.getChildByName("xianshi").getChildByName("propicon").getChildByName("icon").getChildByName("bg").getChildByName("proppic").getComponent(cc.Sprite).spriteFrame = e);
});
}
});
o.getChildByName("xianshi").getChildByName("propname").getChildByName("lab").getComponent(cc.Label).string = e.prop;
t.showstate(e, o);
}
});
};
t.prototype._loadPrefabFrame = function(e, t, o, a) {
var n = this, l = 0;
this.propsch = function() {
if (l < t) for (var i = 0; i < e; i++) {
a && a(o[l]);
if (++l == t) {
console.log("加载完了");
n.unschedule(n.propsch);
}
}
};
this.schedule(this.propsch, 1 / 60, Math.ceil(t / e), 0);
};
t.prototype.showstate = function(e, t) {
var o = t.getChildByName("xianshi").getChildByName("propstate"), a = o.getChildByName("lab");
a.getComponent(cc.Label).string = "";
o.getComponent(cc.Sprite).spriteFrame = null;
for (var n = 0; n < u.default.localdate.prop.length; n++) if (u.default.localdate.prop[n].id == e.propNum) {
var l = u.default.localdate.prop[n].propType;
if (l == i.propType.New) o.getComponent(cc.Sprite).spriteFrame = this.state_prop[0]; else if (l == i.propType.unLocaked) o.getComponent(cc.Sprite).spriteFrame = this.state_prop[1]; else if (l == i.propType.Locking) {
for (n = 0; n < u.default.localdate.prop.length; n++) u.default.localdate.prop[n].name == e.prop && (a.getComponent(cc.Label).string = "分析中...");
o.getComponent(cc.Sprite).spriteFrame = this.state_prop[2];
} else l == i.propType.Locked_unlook ? o.getComponent(cc.Sprite).spriteFrame = this.state_prop[3] : l == i.propType.Locked ? o.getComponent(cc.Sprite).spriteFrame = this.state_prop[4] : l == i.propType.Locked_ask && (o.getComponent(cc.Sprite).spriteFrame = this.state_prop[5]);
}
p.default.Env("updata_tip");
};
t.prototype.up_height_light = function(e) {
console.log("当前点击的道具", e);
u.default.now_click_prop = e;
for (var t = 0; t < this.content.children.length; t++) {
this.content.children[t].getChildByName("xianshi").getComponent(cc.Sprite).spriteFrame = this.click_light[0];
this.content.children[t].getChildByName("xianshi").getChildByName("propname").getChildByName("lab").getComponent(cc.Label).string == e && (this.content.children[t].getChildByName("xianshi").getComponent(cc.Sprite).spriteFrame = this.click_light[1]);
}
};
t.prototype.clickprop = function(e) {
this.node.getChildByName("propdec").getChildByName("tiplab").active = !1;
if (u.default.last_click_prop !== u.default.now_click_prop) {
u.default.last_click_prop = u.default.now_click_prop;
var t = this.node.getChildByName("propdec");
this.propasynode && this.propasynode.destroy();
this.propasynode = cc.instantiate(this.propasypre);
t.addChild(this.propasynode);
r.default.next_guide();
this.state_asy(e, "look_isok");
} else console.log("同一道具不刷新");
};
t.prototype.state_asy = function(e, t) {
var o = this.propasynode;
o.getChildByName("prefect").active = !1;
var a = this.node.getChildByName("propdec");
a.getChildByName("proptip").getChildByName("lab").getComponent(cc.Label).string = e.prop;
a.getChildByName("propdes").getChildByName("lab").getComponent(cc.Label).string = e.initDes;
o.getChildByName("tili").active = !1;
o.getChildByName("tili").getChildByName("lab").getComponent(cc.Label).string = "- " + (u.default.recode_asy_atonce ? u.default.recode_asy_atonce : 10);
this.downpropicon(e.propPic);
for (var n = 0; n < u.default.localdate.prop.length; n++) if (u.default.localdate.prop[n].id == e.propNum) {
var l = u.default.localdate.prop[n].propType;
console.log("stats", l);
if (l == i.propType.New || l == i.propType.unLocaked) {
o.getChildByName("propasystate").getChildByName("lab").getComponent(cc.Label).string = "分析";
o.getChildByName("asyclue").getChildByName("lab").getComponent(cc.Label).string = "- " + u.default.localdate.prop[n].asypower;
} else if (l == i.propType.Locking) {
this.downpowerfuhao();
o.getChildByName("propasystate").getChildByName("lab").getComponent(cc.Label).string = "立即完成";
o.getChildByName("tili").active = !0;
o.getChildByName("tili").getChildByName("lab").getComponent(cc.Label).string = "- " + (u.default.recode_asy_atonce ? u.default.recode_asy_atonce : 10);
for (var c = 0, r = this.content.children.length; c < r; c++) this.content.children[c].getChildByName("xianshi").getChildByName("propname").getChildByName("lab").getComponent(cc.Label).string == e.prop && (o.getChildByName("asyclue").getChildByName("lab").getComponent(cc.Label).string = this.content.children[c].getChildByName("xianshi").getChildByName("propstate").getChildByName("lab").getComponent(cc.Label).string);
for (var d = o.getChildByName("asyclue").getChildByName("lab").getComponent(cc.Label).string.split(":"), p = 60 * Number(d[0]) + 60 * Number(d[1]) + Number(d[2]), f = o.getChildByName("asyclue").getChildByName("pro"), h = 0; h < u.default.localdate.prop.length; h++) u.default.localdate.prop[h].name == e.prop && ("timecode1" == u.default.localdate.prop[h].scheNum ? f.getComponent(cc.ProgressBar).progress = (u.default.numall1 - p) / u.default.numall1 * 151 / 151 : "timecode2" == u.default.localdate.prop[h].scheNum ? f.getComponent(cc.ProgressBar).progress = (u.default.numall2 - p) / u.default.numall2 * 151 / 151 : "timecode3" == u.default.localdate.prop[h].scheNum && (f.getComponent(cc.ProgressBar).progress = (u.default.numall3 - p) / u.default.numall3 * 151 / 151));
} else if (l == i.propType.Locked_unlook) {
console.log("分析触发对话");
o.getChildByName("propasystate").active = !1;
o.getChildByName("asyclue").active = !1;
o.getChildByName("askpeoicon").active = !1;
o.getChildByName("peoclue").active = !1;
o.getChildByName("ask").active = !1;
if ("" !== e.strike1 && null !== e.strike1) {
this.propjson = [ e, t ];
s.default.strikeTalk(e.strike1, "prop");
if ("" !== e.askPeople && null !== e.askPeople) {
u.default.localdate.prop[n].propType = i.propType.Locked_ask;
this.statebtnupprefab(e.prop);
o.getChildByName("ask").active = !0;
o.getChildByName("asyclue").active = !0;
o.getChildByName("asyclue").getChildByName("lab").getComponent(cc.Label).string = "- " + (u.default.recode_ask ? u.default.recode_ask : 3);
o.getChildByName("ask").getChildByName("lab").getComponent(cc.Label).string = "询问";
o.getChildByName("askpeoicon").active = !0;
this.askpeoicon(e, o);
} else console.log("无询问");
} else if ("" !== e.askPeople && null !== e.askPeople) {
console.log("询问", l);
u.default.localdate.prop[n].propType = i.propType.Locked_ask;
this.statebtnupprefab(e.prop);
o.getChildByName("ask").active = !0;
o.getChildByName("asyclue").active = !0;
o.getChildByName("propasyend").getChildByName("lab").getComponent(cc.Label).string = e.veredDes;
o.getChildByName("asyclue").getChildByName("lab").getComponent(cc.Label).string = "- " + (u.default.recode_ask ? u.default.recode_ask : 3);
o.getChildByName("ask").getChildByName("lab").getComponent(cc.Label).string = "询问";
o.getChildByName("askpeoicon").active = !0;
this.askpeoicon(e, o);
} else {
console.log("无询问");
u.default.localdate.prop[n].propType = i.propType.Locked;
this.statebtnupprefab(e.prop);
o.getChildByName("propasyend").getChildByName("lab").getComponent(cc.Label).string = e.veredDes;
this.prop_asy_prefact(o, t);
}
} else if (l == i.propType.Locked_ask) {
this.statebtnupprefab(e.prop);
console.log("进不进");
o.getChildByName("ask").active = !0;
o.getChildByName("asyclue").active = !0;
o.getChildByName("askpeoicon").active = !0;
o.getChildByName("propasyend").getChildByName("lab").getComponent(cc.Label).string = e.veredDes;
o.getChildByName("asyclue").getChildByName("lab").getComponent(cc.Label).string = "- " + (u.default.recode_ask ? u.default.recode_ask : 3);
o.getChildByName("ask").getChildByName("lab").getComponent(cc.Label).string = "询问";
this.askpeoicon(e, o);
} else if (l == i.propType.Locked) {
o.getChildByName("propasystate").active = !1;
o.getChildByName("asyclue").active = !1;
o.getChildByName("askpeoicon").active = !1;
o.getChildByName("peoclue").active = !1;
o.getChildByName("ask").active = !1;
if ("" !== e.askPeople && null !== e.askPeople) {
o.getChildByName("askpeoicon").active = !0;
o.getChildByName("peoclue").active = !0;
o.getChildByName("propasyend").getChildByName("lab").getComponent(cc.Label).string = e.veredDes;
o.getChildByName("peoclue").getChildByName("lab").getComponent(cc.Label).string = e.askedDes;
this.askpeoicon(e, o);
} else o.getChildByName("propasyend").getChildByName("lab").getComponent(cc.Label).string = e.veredDes;
this.prop_asy_prefact(o, t);
this.statebtnupprefab(e.prop);
}
}
};
t.prototype.prop_strike1_ok = function() {
var e = this.propasynode, t = this.propjson[0];
e.getChildByName("propasyend").getChildByName("lab").getComponent(cc.Label).string = t.veredDes;
for (var o = 0; o < u.default.localdate.prop.length; o++) if (t.prop == u.default.localdate.prop[o].name) {
u.default.localdate.prop[o].propType = i.propType.Locked;
this.statebtnupprefab(t.prop);
}
this.prop_asy_prefact(e, this.propjson[1]);
};
t.prototype.askpeoicon = function(e, t) {
f.default.loadJson(u.default.peopleTable).then(function(o) {
if (o) for (var a = function(a) {
if (o[a].peoId == e.askPeople) {
var n = o[a].peoIcon;
f.default.loadJson(u.default.picTable).then(function(e) {
if (e) for (var o = 0; o < e.length; o++) if (e[o].picId == n) {
var a = e[o].picName;
f.default.loadPic(a).then(function(e) {
e && null !== t.children && (t.getChildByName("askpeoicon").getChildByName("bg").getChildByName("peopic").getComponent(cc.Sprite).spriteFrame = e);
});
}
});
}
}, n = 0; n < o.length; n++) a(n);
});
};
t.prototype.downpropicon = function(e) {
var t = this.node.getChildByName("propdec");
f.default.loadJson(u.default.picTable).then(function(o) {
if (o) for (var a = 0; a < o.length; a++) if (o[a].picId == e) {
var n = o[a].picName;
f.default.loadPic(n).then(function(e) {
e && (t.getChildByName("propicon").getChildByName("icon").getChildByName("bg").getChildByName("proppic").getComponent(cc.Sprite).spriteFrame = e);
});
}
});
};
t.prototype.prop_asy_prefact = function(e, t) {
if (t && "look_isok" == t) {
console.log("已完成道具分析");
e.getChildByName("prefect").active = !0;
this.ismemory(e);
} else {
console.log("刚完成道具分析");
e.getChildByName("prefect").active = !0;
this.ismemory(e);
d.default.playEffect("music_010");
e.getChildByName("prefect").runAction(cc.sequence(cc.scaleTo(1e-10, 1.8, 1.8), cc.scaleTo(.3, 2, 2), cc.scaleTo(.1, .9, .9)));
}
f.default.loadJson(u.default.propTable).then(function(e) {
if (e) for (var t = 0; t < e.length; t++) if (e[t].prop == u.default.now_click_prop) {
var o = e[t].propNum;
p.default.Env_apkevent_param("event_prop", "第" + u.default.localdate.chapter + "章/" + o + "/道具已解锁");
}
});
};
t.prototype.ismemory = function(e) {
f.default.loadJson(u.default.propTable).then(function(t) {
if (t) for (var o = 0; o < t.length; o++) if (t[o].prop == u.default.now_click_prop && ("" !== t[o].strike1 && null !== t[o].strike1 || "" !== t[o].strike2 && null !== t[o].strike2 || "" !== t[o].strike3 && null !== t[o].strike3)) {
e.getChildByName("memory").active = !0;
e.getChildByName("asyclue").active = !0;
e.getChildByName("asyclue").getChildByName("lab").getComponent(cc.Label).string = "- " + (u.default.recode_memory ? u.default.recode_memory : 5);
}
});
};
t.prototype.state_Locking = function(e) {
for (var t = 0; t < u.default.localdate.prop.length; t++) u.default.localdate.prop[t].name == e && (u.default.localdate.prop[t].propType = i.propType.Locking);
this.statebtn(e);
};
t.prototype.state_unLock = function(e) {
for (var t = 0; t < u.default.localdate.prop.length; t++) u.default.localdate.prop[t].name == e && (u.default.localdate.prop[t].propType = i.propType.Locked_unlook);
this.statebtnupprefab(e);
};
t.prototype.state_Locked = function(e) {
for (var t = 0; t < u.default.localdate.prop.length; t++) u.default.localdate.prop[t].name == e && (u.default.localdate.prop[t].propType = i.propType.Locked);
this.statebtn(e);
this.statebtnupprefab(e);
f.default.loadJson(u.default.propTable).then(function(t) {
if (t) for (var o = 0; o < t.length; o++) if (t[o].prop == e && "" !== t[o].strike3 && null !== t[o].strike3) {
var a = t[o].strike3;
s.default.strikeTalk(a, e);
}
});
};
t.prototype.starttime = function(e) {
for (var t = 0; t < u.default.localdate.prop.length; t++) if (u.default.localdate.prop[t].name == e) for (var o = 0; o < this.content.children.length; o++) if (this.content.children[o].getChildByName("xianshi").getChildByName("propname").getChildByName("lab").getComponent(cc.Label).string == e) {
var a = u.default.localdate.scheduleList[Math.floor(Math.random() * u.default.localdate.scheduleList.length)], n = u.default.localdate.scheduleList.indexOf(a);
u.default.localdate.scheduleList.splice(n, 1);
console.log("计时器组1", u.default.localdate.scheduleList);
for (var l = 0; l < u.default.localdate.prop.length; l++) if (u.default.localdate.prop[l].name == e) {
u.default.localdate.prop[l].isasying = !0;
u.default.localdate.prop[l].scheNum = a;
}
console.log("道具组", u.default.localdate.prop);
if ("timecode1" == a) {
var i = u.default.localdate.timelab2 - u.default.localdate.timelab3 > 0 ? u.default.localdate.timelab2 : u.default.localdate.timelab3;
p.default.Env_data(a, {
time: u.default.localdate.prop[t].time,
name: e,
max: i
});
} else if ("timecode2" == a) {
i = u.default.localdate.timelab1 - u.default.localdate.timelab3 > 0 ? u.default.localdate.timelab1 : u.default.localdate.timelab3;
p.default.Env_data(a, {
time: u.default.localdate.prop[t].time,
name: e,
max: i
});
} else if ("timecode3" == a) {
i = u.default.localdate.timelab1 - u.default.localdate.timelab2 > 0 ? u.default.localdate.timelab1 : u.default.localdate.timelab2;
p.default.Env_data(a, {
time: u.default.localdate.prop[t].time,
name: e,
max: i
});
}
}
};
t.prototype.downtime = function(e, t) {
var o = this;
console.log("倒计时结束");
for (var a = 0; a < u.default.localdate.prop.length; a++) if (u.default.localdate.prop[a].name == e) {
u.default.localdate.prop[a].isasying = !1;
u.default.localdate.prop[a].scheNum = null;
u.default.localdate.prop[a].propType = i.propType.Locked_unlook;
}
if (u.default.now_click_prop == e) {
this.cleanpropdec();
f.default.loadJson(u.default.propTable).then(function(t) {
if (t) for (var a = 0; a < t.length; a++) if (t[a].prop == e) {
o.state_asy(t[a]);
o.uppowerfuhao();
}
});
} else this.state_unLock(e);
if ("timecode1" == t) {
u.default.sch1 = 0;
u.default.numall1 = 0;
} else if ("timecode2" == t) {
u.default.sch2 = 0;
u.default.numall2 = 0;
} else if ("timecode3" == t) {
u.default.sch3 = 0;
u.default.numall3 = 0;
}
};
t.prototype.downtimesudd = function(e, t) {
var o = this;
console.log("立即结束倒计时");
for (var a = 0; a < u.default.localdate.prop.length; a++) if (u.default.localdate.prop[a].name == e) {
u.default.localdate.prop[a].isasying = !1;
u.default.localdate.prop[a].scheNum = null;
u.default.localdate.prop[a].propType = i.propType.Locked_unlook;
}
this.cleanpropdec();
f.default.loadJson(u.default.propTable).then(function(t) {
if (t) for (var a = 0; a < t.length; a++) if (t[a].prop == e) {
o.state_asy(t[a]);
o.uppowerfuhao();
}
});
if (-1 != u.default.localdate.scheduleList.indexOf(t)) console.log("计时器组2", u.default.localdate.scheduleList); else {
u.default.localdate.scheduleList.push(t);
console.log("计时器组2", u.default.localdate.scheduleList);
}
var n = t + "end";
p.default.Env(n);
if ("timecode1" == t) {
u.default.sch1 = 0;
u.default.numall1 = 0;
} else if ("timecode2" == t) {
u.default.sch2 = 0;
u.default.numall2 = 0;
} else if ("timecode3" == t) {
u.default.sch3 = 0;
u.default.numall3 = 0;
}
};
t.prototype.timejishi = function(e, t, o, a) {
for (var n = 0; n < u.default.localdate.prop.length; n++) if (u.default.localdate.prop[n].name == e) if (u.default.localdate.prop[n].propType == i.propType.Locking) {
for (var l = 0; l < this.content.children.length; l++) this.content.children[l].getChildByName("xianshi").getChildByName("propname").getChildByName("lab").getComponent(cc.Label).string == e && (this.content.children[l].getChildByName("xianshi").getChildByName("propstate").getChildByName("lab").getComponent(cc.Label).string = t.children[o].getComponent(cc.Label).string);
if (this.node.getChildByName("propdec").getChildByName("proptip").getChildByName("lab").getComponent(cc.Label).string == e) {
this.node.getChildByName("propdec").getChildByName("propasy").getChildByName("asyclue").getChildByName("lab").getComponent(cc.Label).string = t.children[o].getComponent(cc.Label).string;
this.timejishiprogress(e, t.children[o].getComponent(cc.Label).string, a);
} else console.log("不一样的道具");
} else console.log("分析完成");
};
t.prototype.timejishiprogress = function(e, t, o) {
var a = this, n = t.split(":"), l = 60 * Number(n[0]) + 60 * Number(n[1]) + Number(n[2]);
f.default.loadJson(u.default.propTable).then(function(t) {
if (t) for (var n = 0, i = t.length; n < i; n++) if (t[n].prop == e) {
t[n].time;
var s = a.node.getChildByName("propdec").getChildByName("propasy").getChildByName("asyclue").getChildByName("pro");
if ("timecode1" == o) {
u.default.sch1++;
u.default.sch1 <= 1 && (u.default.numall1 = u.default.numall1 ? u.default.numall1 : l);
s.getComponent(cc.ProgressBar).progress = (u.default.numall1 - l) / u.default.numall1 * 151 / 151;
} else if ("timecode2" == o) {
u.default.sch2++;
u.default.sch2 <= 1 && (u.default.numall2 = u.default.numall2 ? u.default.numall2 : l);
s.getComponent(cc.ProgressBar).progress = (u.default.numall2 - l) / u.default.numall2 * 151 / 151;
} else if ("timecode3" == o) {
u.default.sch3++;
u.default.sch3 <= 1 && (u.default.numall3 = u.default.numall3 ? u.default.numall3 : l);
s.getComponent(cc.ProgressBar).progress = (u.default.numall3 - l) / u.default.numall3 * 151 / 151;
}
}
});
};
t.prototype.statebtn = function(e) {
var t = this;
this.cleanpropdec();
var o = this.node.getChildByName("propdec"), a = o.getChildByName("propasy");
this.statebtnupprefab(e);
if (a) {
for (var n = 0; n < u.default.localdate.prop.length; n++) if (u.default.localdate.prop[n].name == e && u.default.localdate.prop[n].propType <= 3) {
a.getChildByName("propasystate").active = !0;
a.getChildByName("asyclue").active = !0;
a.getChildByName("ask").active = !1;
}
f.default.loadJson(u.default.propTable).then(function(a) {
if (a) for (var n = 0; n < a.length; n++) if (a[n].prop == e) {
o.getChildByName("proptip").getChildByName("lab").getComponent(cc.Label).string = a[n].prop;
o.getChildByName("propdes").getChildByName("lab").getComponent(cc.Label).string = a[n].initDes;
t.state_asy(a[n]);
}
});
}
};
t.prototype.statebtnupprefab = function(e) {
var t = this;
f.default.loadJson(u.default.propTable).then(function(o) {
if (o) for (var a = 0; a < o.length; a++) if (o[a].prop == e) for (var n = 0; n < t.content.children.length; n++) t.content.children[n].getChildByName("xianshi").getChildByName("propname").getChildByName("lab").getComponent(cc.Label).string == e && t.showstate(o[a], t.content.children[n]);
});
};
t.prototype.cleanpropdec = function() {
var e = this.node.getChildByName("propdec");
e.getChildByName("proptip").getChildByName("lab").getComponent(cc.Label).string = "";
e.getChildByName("propdes").getChildByName("lab").getComponent(cc.Label).string = "";
e.getChildByName("propicon").getChildByName("icon").getChildByName("bg").getChildByName("proppic").getComponent(cc.Sprite).spriteFrame = null;
var t = e.getChildByName("propasy");
if (t) {
t.getChildByName("propasyend").getChildByName("lab").getComponent(cc.Label).string = "";
t.getChildByName("peoclue").getChildByName("lab").getComponent(cc.Label).string = "";
t.getChildByName("askpeoicon").active = !1;
t.getChildByName("askpeoicon").getChildByName("bg").getChildByName("peopic").getComponent(cc.Sprite).spriteFrame = null;
t.getChildByName("propasystate").active = !1;
t.getChildByName("asyclue").active = !1;
t.getChildByName("ask").active = !1;
t.getChildByName("tili").active = !1;
t.getChildByName("memory").active = !1;
}
};
t.prototype.update = function() {};
l([ _(cc.Prefab) ], t.prototype, "iconpre", void 0);
l([ _(cc.Node) ], t.prototype, "content", void 0);
l([ _(cc.Prefab) ], t.prototype, "propasypre", void 0);
l([ _(cc.SpriteFrame) ], t.prototype, "state_prop", void 0);
l([ _(cc.SpriteFrame) ], t.prototype, "click_light", void 0);
return l([ g ], t);
}(cc.Component);
o.default = y;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0,
"../userStore/stateType": "stateType",
"../way/guideNew": "guideNew",
"../way/sort": "sort",
"../way/talkStrike": "talkStrike"
} ],
propPre: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "6a251qp9qlFv5Uip3QOTpop", "propPre");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/userStore/userStore"), s = e("../../../textures_load/scripts/ways/eventPost"), c = e("../../../textures_load/scripts/ways/load_Json_Pic"), r = e("../userStore/stateType"), d = cc._decorator, u = d.ccclass, p = (d.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {};
t.prototype.start = function() {};
t.prototype.clickpeopicon = function(e) {
var t = e.target.getChildByName("propname").getChildByName("lab").getComponent(cc.Label).string;
this.state_unLocked_Locaed(t);
c.default.loadJson(i.default.propTable).then(function(e) {
if (e) for (var o = 0; o < e.length; o++) e[o].prop == t && s.default.Env_data("clickprop", e[o]);
});
s.default.Env_data("up_height_light", t);
};
t.prototype.state_unLocked_Locaed = function(e) {
for (var t = 0; t < i.default.localdate.prop.length; t++) if (i.default.localdate.prop[t].name == e) if (i.default.localdate.prop[t].propType <= 1) {
i.default.localdate.prop[t].propType = r.propType.unLocaked;
s.default.Env_data("statebtn", e);
} else i.default.localdate.prop[t].propType;
};
return l([ u ], t);
}(cc.Component));
o.default = p;
cc._RF.pop();
}, {
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0,
"../userStore/stateType": "stateType"
} ],
propTipData: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "3f149U+UyNF3pRO3R4EC1TO", "propTipData");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.porpTipData = void 0;
o.porpTipData = function(e, t) {
this.propTipType = null;
this.id = "";
this.propTipType = t;
this.id = e;
};
cc._RF.pop();
}, {} ],
recode: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "653c8IstaJE8Zm1Ds5ntGXK", "recode");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.recodeData = void 0;
var a = e("../../../textures_load/scripts/userStore/userStore"), n = e("../../../textures_load/scripts/ways/load_Json_Pic"), l = e("../userStore/propData"), i = e("../userStore/stateType"), s = !1;
function c() {
return new Promise(function(e) {
n.default.loadJson(a.default.recodeTable).then(function(t) {
if (t) {
for (var o = 0; o < t.length; o++) if (t[o].chapterNum == a.default.localdate.chapter) {
for (var n = t[o].people.split("#"), c = 0, r = n.length; c < r; c++) if (-1 != a.default.localdate.people.indexOf(n[c])) console.log("people", a.default.localdate.people); else {
a.default.localdate.people.push(n[c]);
a.default.localdate.peoplenew.push(0);
console.log("people", a.default.localdate.people);
console.log("peoplenew", a.default.localdate.peoplenew);
}
"" !== t[o].guessAllNum && null !== t[o].guessAllNum && (a.default.recode_guessAllNum = t[o].guessAllNum);
"" !== t[o].ask && null !== t[o].ask && (a.default.recode_ask = t[o].ask);
"" !== t[o].guess && null !== t[o].guess && (a.default.recode_guess = t[o].guess);
"" !== t[o].closeclert && null !== t[o].closeclert && (a.default.recode_closeclert = t[o].closeclert);
"" !== t[o].addpower && null !== t[o].addpower && (a.default.recode_addpower = t[o].addpower);
"" !== t[o].asy_atonce && null !== t[o].asy_atonce && (a.default.recode_asy_atonce = t[o].asy_atonce);
"" !== t[o].asy_memory && null !== t[o].asy_memory && (a.default.recode_memory = t[o].asy_memory);
"" !== t[o].click_power && null !== t[o].click_power && (a.default.recode_click_power = t[o].click_power);
"" !== t[o].startscene && null !== t[o].startscene && (a.default.recode_startscene = t[o].startscene);
}
for (var d = a.default.localdate.chapter + 1, u = [], p = 0, f = 0, h = a.default.propTable.length; f < h; f++) {
p++;
var g = a.default.propTable[f].propNum.split("_");
Number(g[1]) !== d && u.push(a.default.propTable[f].propNum);
if (p == a.default.propTable.length) if (a.default.localdate.prop.length > 0) for (var _ = 0, y = 0; y < u.length; y++) {
for (var m = 0; m < a.default.localdate.prop.length; m++) {
_++;
a.default.localdate.prop[m].id == u[y] && (s = !0);
}
if (_ == a.default.localdate.prop.length && !s) for (c = 0, r = a.default.propTable.length; c < r; c++) a.default.propTable[c].propNum == u[y] && a.default.localdate.prop.unshift(new l.propData(a.default.propTable[c].propNum, a.default.propTable[c].prop, i.propType.Locked, a.default.propTable[c].time, !0, null, a.default.propTable[c].verPower));
} else for (y = 0; y < u.length; y++) for (c = 0, r = a.default.propTable.length; c < r; c++) a.default.propTable[c].propNum == u[y] && a.default.localdate.prop.unshift(new l.propData(a.default.propTable[c].propNum, a.default.propTable[c].prop, i.propType.Locked, a.default.propTable[c].time, !0, null, a.default.propTable[c].verPower));
}
e(!0);
}
});
});
}
o.recodeData = c;
o.default = {
recodeData: c
};
cc._RF.pop();
}, {
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0,
"../userStore/propData": "propData",
"../userStore/stateType": "stateType"
} ],
recomScene: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "52ad5kNRhhJyqCgIT56bcM6", "recomScene");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.anyicPos = o.sceneChartlet = o.recomScenetip = o.recomScene = o.getNum = o.initScene = o.clearpic = void 0;
var a = e("./talkStrike"), n = e("../../../textures_load/scripts/music/musicControl"), l = e("../../../textures_load/scripts/userStore/userStore"), i = e("../../../textures_load/scripts/ways/eventPost"), s = e("../../../textures_load/scripts/ways/load_Json_Pic"), c = e("./new_Tip_num"), r = [], d = !1;
function u() {
if (r.length > 0) {
for (var e = 0; e < r.length; e++) r[e].destroy();
r = [];
}
}
o.clearpic = u;
function p(e) {
return new Promise(function(t) {
u();
i.default.Env("downreturn");
s.default.loadJson(l.default.sceneTable).then(function(o) {
if (o) {
var u = f(o);
if (!l.default.istalkMusic) {
var p = o[u].strikeMusic;
console.log("场景音乐id", p, l.default.musicId);
if (l.default.musicId && l.default.musicId == p) ; else {
n.default.playBgm(p);
l.default.musicId = p;
}
}
var h = o[u].sceneNum;
console.log("贴图", h);
s.default.loadJson(l.default.touchTable).then(function(t) {
if (t) {
var o = y(t, h);
console.log("num", o);
for (var a = function(a) {
var n = m(t[o[a]].posx, t[o[a]].posy, t[o[a]].width, t[o[a]].height), i = t[o[a]].picName;
s.default.loadJson(l.default.picTable).then(function(l) {
if (l) for (var c = function(c) {
if (l[c].picId == i) {
var d = l[c].picName, u = a;
s.default.loadPic(d).then(function(a) {
if (a) {
var l = new cc.Node();
e.getChildByName("homebg").addChild(l);
var i = l.addComponent(cc.Sprite);
i.spriteFrame = a;
i.sizeMode = cc.Sprite.SizeMode.TRIMMED;
l.opacity = 0;
l.setPosition(n[0], n[1]);
l.width = t[o[u]].width;
l.height = t[o[u]].height;
l.name = t[o[u]].touchId;
var s = new cc.Component.EventHandler();
s.target = e;
s.component = "Home";
s.handler = "touchCallback";
s.customEventData = t[o[u]].affect + "#" + t[o[u]].target + "#" + t[o[u]].picName + "#" + t[o[u]].touchId + "#" + n;
l.addComponent(cc.Button).clickEvents.push(s);
r.push(l);
}
});
}
}, d = 0; d < l.length; d++) c(d);
});
}, n = 0; n < o.length; n++) a(n);
}
});
var g = o[u].bgPic;
s.default.loadJson(l.default.picTable).then(function(t) {
if (t) for (var n = 0; n < t.length; n++) if (t[n].picId == g) {
var r = t[n].picName;
s.default.loadPic(r).then(function(t) {
if (t) {
e.getChildByName("homebg").getComponent(cc.Sprite).spriteFrame = t;
console.log("是否对话中强转场景", l.default.stongturnSceontalk);
l.default.stongturnSceontalk ? e.getChildByName("homebg").zIndex = 11 : e.getChildByName("homebg").zIndex = 1;
console.log("转换场景是否999", d);
if (d) {
d = !1;
l.default.temptalkSce = l.default.localdate.sceneId;
console.log("userStore.temptalkSce=", l.default.temptalkSce);
console.log("allSceneOpen999", l.default.localdate.allSceneOpen);
if ("" !== o[u].back && null !== o[u].back) {
var n = o[u].back;
console.log("出现返回按钮");
i.default.Env_data("upreturn", {
returnbtn: n,
isthree: !1
});
} else {
console.log("出现地图");
i.default.Env("upmap");
}
} else {
console.log("转换场景", l.default.localdate.sceneId);
l.default.temptalkSce = l.default.localdate.sceneId;
if (-1 != l.default.localdate.allSceneOpen.indexOf(l.default.localdate.sceneId)) {
console.log("allSceneOpen1", l.default.localdate.allSceneOpen);
if ("" !== o[u].back && null !== o[u].back) {
n = o[u].back;
console.log("出现返回");
i.default.Env_data("upreturn", {
returnbtn: n,
isthree: !1
});
} else {
console.log("出现地图");
i.default.Env("upmap");
}
} else {
console.log("allSceneOpen2", l.default.localdate.allSceneOpen);
if ("" != o[u].strike && null != o[u].strike) {
a.default.strikeTalk(o[u].strike);
console.log("back", o[u].back);
if ("" !== o[u].back && null !== o[u].back) {
console.log("back1");
l.default.talk_return_isupordown = !0;
} else {
console.log("back2");
l.default.talk_return_isupordown = !1;
}
} else {
console.log("不触发对话");
if ("" !== o[u].back && null !== o[u].back) {
n = o[u].back;
console.log("出现返回按钮");
i.default.Env_data("upreturn", {
returnbtn: n,
isthree: !1
});
} else {
console.log("出现地图");
i.default.Env("upmap");
}
if (-1 != l.default.localdate.allSceneOpen.indexOf(l.default.temptalkSce)) ; else {
l.default.localdate.allSceneOpen.push(l.default.temptalkSce);
console.log("allSceneOpen存储", l.default.localdate.allSceneOpen);
c.default.map_tip_up_down();
}
}
}
}
console.log("场景所属", e.getChildByName("homebg"));
}
});
}
});
t(!0);
}
});
});
}
o.initScene = p;
function f(e) {
console.log("getNum=", l.default.localdate.sceneId);
if ("blotter_sce_999" == l.default.localdate.sceneId) {
l.default.localdate.sceneId = l.default.localdate.blotter_sce_999;
d = !0;
}
for (var t = 0; t < e.length; t++) if (e[t].sceneNum == l.default.localdate.sceneId) var o = t;
return o;
}
o.getNum = f;
function h(e, t) {
console.log("名字", t, e);
var o = new cc.Node("name"), a = o.addComponent(cc.Label);
e.addChild(o);
o.active = !0;
o.zIndex = 100;
var n = a.string.length, l = function() {
a.string += t[n];
if (++n >= t.length) {
cc.director.getScheduler().unschedule(l, cc.director.getScene());
g(o);
}
};
cc.director.getScheduler().schedule(l, cc.director.getScene(), .05);
o.addComponent(cc.Widget);
var i = o.getComponent(cc.Widget);
i.enabled = !0;
i.top = 200;
i.isAlignTop = !0;
i.updateAlignment();
}
o.recomScene = h;
function g(e) {
var t = function() {
cc.director.getScheduler().unschedule(t, cc.director.getScene());
e.destroy();
};
cc.director.getScheduler().schedule(t, cc.director.getScene(), 1);
}
function _(e, t) {
var o = new cc.Node(), a = o.addComponent(cc.Label);
e.addChild(o);
var n = a.string.length, l = function() {
a.string += t[n];
if (++n >= t.length) {
cc.director.getScheduler().unschedule(l, cc.director.getScene());
g(o);
}
};
cc.director.getScheduler().schedule(l, cc.director.getScene(), .1);
o.addComponent(cc.Widget);
var i = o.getComponent(cc.Widget);
i.enabled = !0;
i.top = 800;
i.isAlignTop = !0;
i.updateAlignment();
}
o.recomScenetip = _;
function y(e, t) {
for (var o = [], a = 0; a < e.length; a++) e[a].sceneNum == t && o.push(a);
return o;
}
o.sceneChartlet = y;
function m(e, t, o, a) {
var n = Number(e), l = Number(t);
return [ n + .5 * Number(o) - 360, 825 - (l + .5 * Number(a)) ];
}
o.anyicPos = m;
o.default = {
initScene: p,
recomScene: h,
recomScenetip: _,
getNum: f,
sceneChartlet: y,
anyicPos: m,
clearpic: u
};
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0,
"./new_Tip_num": "new_Tip_num",
"./talkStrike": "talkStrike"
} ],
returnScenechapter: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "c8a62URzMJE2qCwM0K+JC/8", "returnScenechapter");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/userStore/userStore"), s = e("../../../textures_load/scripts/ways/eventPost"), c = e("../../../textures_load/scripts/ways/load_Json_Pic"), r = e("../../../textures_load/scripts/music/musicControl"), d = cc._decorator, u = d.ccclass, p = d.property, f = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.labnode = null;
t.startgopro = !1;
t.time = 0;
return t;
}
t.prototype.onLoad = function() {
r.default.stopBgm();
r.default.playEffect("music_006");
s.default.Env_data("setting_state", "off");
this.progressBar = this.node.getChildByName("progressBar").getComponent(cc.ProgressBar);
this.pro = this.node.getChildByName("pro").getComponent(cc.ProgressBar);
if (i.default.localdate.chapter >= 3) this.labnode.getComponent(cc.Label).string = "本章节已结束，敬请期待续作..."; else {
this.allpro = 4;
this.labnode.runAction(cc.repeatForever(cc.sequence(cc.fadeTo(.8, 75), cc.fadeTo(.8, 255))));
this.startgamedata();
}
};
t.prototype.start = function() {
var e = this;
cc.systemEvent.on("return_nextchapter", function() {
s.default.Env("nextchapter");
e.node.destroy();
}, this);
};
t.prototype.startgamedata = function() {
var e = this;
console.log("章节数据是否保存", i.default.chapterData);
i.default.handleInitUserDatalocal().then(function(t) {
t && i.default.chapter_cleanData().then(function(t) {
if (t) {
i.default.localdate.chapter++;
console.log("第几章节", i.default.localdate.chapter);
console.log("新章节数据", i.default.localdate);
console.log("老章节数据", i.default.chapterData);
e.loadSce();
switch (i.default.localdate.chapter) {
case 1:
e.releasebundle();
cc.assetManager.loadBundle("n_chapter_public", function(t, o) {
if (o) {
i.default.n_chapter_public = o;
cc.assetManager.loadBundle("n_chapter_1", function(t, o) {
if (o) {
i.default.n_chapter_1 = o;
e.pacetoJson();
}
});
}
});
break;

case 2:
e.releasebundle();
cc.assetManager.loadBundle("n_chapter_public", function(t, o) {
if (o) {
i.default.n_chapter_public = o;
cc.assetManager.loadBundle("n_chapter_2", function(t, o) {
if (o) {
i.default.n_chapter_2 = o;
e.pacetoJson();
}
});
}
});
break;

case 3:
cc.assetManager.loadBundle("n_chapter_public", function(t, o) {
if (o) {
i.default.n_chapter_public = o;
cc.assetManager.loadBundle("n_chapter_3", function(t, o) {
if (o) {
i.default.n_chapter_3 = o;
e.pacetoJson();
}
});
}
});
break;

case 4:
cc.assetManager.loadBundle("n_chapter_public", function(t, o) {
if (o) {
i.default.n_chapter_public = o;
cc.assetManager.loadBundle("n_chapter_3", function(e, t) {
t && (i.default.n_chapter_3 = t);
});
cc.assetManager.loadBundle("n_chapter_4", function(t, o) {
if (o) {
i.default.n_chapter_4 = o;
e.pacetoJson();
}
});
}
});
break;

case 5:
cc.assetManager.loadBundle("n_chapter_public", function(t, o) {
if (o) {
i.default.n_chapter_public = o;
cc.assetManager.loadBundle("n_chapter_3", function(e, t) {
t && (i.default.n_chapter_3 = t);
});
cc.assetManager.loadBundle("n_chapter_4", function(e, t) {
t && (i.default.n_chapter_4 = t);
});
cc.assetManager.loadBundle("n_chapter_5", function(t, o) {
if (o) {
i.default.n_chapter_5 = o;
e.pacetoJson();
}
});
}
});
break;

case 6:
cc.assetManager.loadBundle("n_chapter_public", function(t, o) {
if (o) {
i.default.n_chapter_public = o;
cc.assetManager.loadBundle("n_chapter_3", function(e, t) {
t && (i.default.n_chapter_3 = t);
});
cc.assetManager.loadBundle("n_chapter_4", function(e, t) {
t && (i.default.n_chapter_4 = t);
});
cc.assetManager.loadBundle("n_chapter_5", function(e, t) {
t && (i.default.n_chapter_5 = t);
});
cc.assetManager.loadBundle("n_chapter_6", function(t, o) {
if (o) {
i.default.n_chapter_6 = o;
e.pacetoJson();
}
});
}
});
}
}
});
});
};
t.prototype.pacetoJson = function() {
var e = this;
c.default.loadJsonAll().then(function(t) {
t && e.loadSce();
});
};
t.prototype.loadSce = function() {
this.progressBar.progress += 1 / this.allpro;
if (this.progressBar.progress >= .5) {
this.progressBar.progress = .5;
this.startgopro = !0;
}
};
t.prototype.nextchapter = function() {
s.default.Env("watchvideo_power");
};
t.prototype.nextchaptergo = function() {
s.default.Env("nextchapter");
this.node.destroy();
};
t.prototype.update = function(e) {
if (this.startgopro) {
this.progressBar.progress += e;
if (this.progressBar.progress >= 1) {
this.startgopro = !1;
this.godown();
}
}
};
t.prototype.godown = function() {
this.node.getChildByName("node").active = !0;
};
t.prototype.releasebundle = function() {
var e = "n_chapter_" + (i.default.localdate.chapter - 1), t = cc.assetManager.getBundle(e);
t.releaseAll();
cc.assetManager.removeBundle(t);
};
l([ p(cc.Node) ], t.prototype, "labnode", void 0);
return l([ u ], t);
}(cc.Component);
o.default = f;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0
} ],
shakeNode: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f1be7PR5ohDXKlAoom2cQ2w", "shakeNode");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator, s = i.ccclass, c = (i.property, function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
cc.systemEvent.on("shake", this.shake, this);
};
t.prototype.shake = function() {
var e = this;
console.log("接收shake");
var t = this.node.x, o = this.node.y, a = cc.repeatForever(cc.sequence(cc.moveTo(.018, cc.v2(t + 5, o + 7)), cc.moveTo(.018, cc.v2(t - 6, o + 7)), cc.moveTo(.018, cc.v2(t - 13, o + 3)), cc.moveTo(.018, cc.v2(t + 3, o - 6)), cc.moveTo(.018, cc.v2(t - 5, o + 5)), cc.moveTo(.018, cc.v2(t + 2, o - 8)), cc.moveTo(.018, cc.v2(t - 8, o - 10)), cc.moveTo(.018, cc.v2(t + 3, o + 10)), cc.moveTo(.018, cc.v2(t + 0, o + 0))));
this.node.runAction(a);
setTimeout(function() {
if (e.node) {
e.node.stopAction(a);
e.node.x = t;
e.node.y = o;
}
}, 300);
};
return l([ s ], t);
}(cc.Component));
o.default = c;
cc._RF.pop();
}, {} ],
shakeTalk: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f8df9uCl29DXrvN35NByGFS", "shakeTalk");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator, s = i.ccclass, c = (i.property, function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
cc.systemEvent.on("shake", this.shake, this);
};
t.prototype.shake = function() {
var e = this;
console.log("接收shake");
var t = this.node.x, o = this.node.y, a = cc.repeatForever(cc.sequence(cc.moveTo(.018, cc.v2(t - 5, o - -7)), cc.moveTo(.018, cc.v2(t + 6, o - -7)), cc.moveTo(.018, cc.v2(t + 13, o - -3)), cc.moveTo(.018, cc.v2(t - 3, o + 6)), cc.moveTo(.018, cc.v2(t + 5, o - -5)), cc.moveTo(.018, cc.v2(t - 2, o + 8)), cc.moveTo(.018, cc.v2(t + 8, o + 10)), cc.moveTo(.018, cc.v2(t - 3, o - -10)), cc.moveTo(.018, cc.v2(t - 0, o - 0))));
this.node.runAction(a);
setTimeout(function() {
if (e.node) {
e.node.stopAction(a);
e.node.x = t;
e.node.y = o;
}
}, 300);
};
return l([ s ], t);
}(cc.Component));
o.default = c;
cc._RF.pop();
}, {} ],
sort: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "fdb6a04rFxJdYQx353KYqP6", "sort");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.fomatFloat = o.sort = void 0;
function a(e) {
e.sort(("propType", !0, function(e, t) {
return e.propType - t.propType;
}));
}
o.sort = a;
function n(e, t) {
var o = (Math.round(e * Math.pow(10, t)) / Math.pow(10, t)).toString();
o.indexOf(".") < 0 && (o += ".");
for (var a = o.length - o.indexOf("."); a <= t; a++) o += "0";
return o;
}
o.fomatFloat = n;
o.default = {
sort: a,
fomatFloat: n
};
cc._RF.pop();
}, {} ],
stateType: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "16061hwkLJGEaYuIyYvqA9J", "stateType");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.guidestrikeType = o.guidetargetType = o.propTipType = o.talkStrikeType = o.guessType = o.touchPicaffect = o.propType = void 0;
(function(e) {
e[e.New = 0] = "New";
e[e.unLocaked = 1] = "unLocaked";
e[e.Locking = 2] = "Locking";
e[e.Locked_unlook = 3] = "Locked_unlook";
e[e.Locked_ask = 4] = "Locked_ask";
e[e.Locked = 5] = "Locked";
})(o.propType || (o.propType = {}));
(function(e) {
e[e.go_room = 0] = "go_room";
e[e.get_prop = 1] = "get_prop";
e[e.loupe = 2] = "loupe";
e[e.armoire = 3] = "armoire";
e[e.codeCase = 4] = "codeCase";
})(o.touchPicaffect || (o.touchPicaffect = {}));
(function(e) {
e[e.unLocked = 0] = "unLocked";
e[e.Locked = 1] = "Locked";
})(o.guessType || (o.guessType = {}));
(function(e) {
e[e.deblock_peo = 0] = "deblock_peo";
e[e.deblock_room = 1] = "deblock_room";
e[e.deblock_guess = 2] = "deblock_guess";
e[e.deblock_prop = 3] = "deblock_prop";
e[e.turn_scene = 4] = "turn_scene";
e[e.choose_case = 5] = "choose_case";
e[e.strike_talk = 6] = "strike_talk";
e[e.strike_talk_false = 7] = "strike_talk_false";
e[e.over_clert = 8] = "over_clert";
e[e.guide_new = 9] = "guide_new";
e[e.effect = 10] = "effect";
e[e.close_menu_turnScene = 11] = "close_menu_turnScene";
e[e.blotter_sce_999 = 12] = "blotter_sce_999";
e[e.openUi = 13] = "openUi";
e[e.closeUi = 14] = "closeUi";
})(o.talkStrikeType || (o.talkStrikeType = {}));
(function(e) {
e[e.unLocked = 0] = "unLocked";
e[e.Locked = 1] = "Locked";
})(o.propTipType || (o.propTipType = {}));
(function(e) {
e[e.pic = 0] = "pic";
e[e.ui = 1] = "ui";
})(o.guidetargetType || (o.guidetargetType = {}));
(function(e) {
e[e.talk = 0] = "talk";
e[e.guidenewid = 1] = "guidenewid";
})(o.guidestrikeType || (o.guidestrikeType = {}));
cc._RF.pop();
}, {} ],
talkStrike: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "d6ea8hbzG1NgJNfiA9sR/Sw", "talkStrike");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.guide_new = o.over_clert = o.talk_strike_talk_false = o.talk_strike_talk = o.talk_choose_case = o.talk_turn_scene = o.talk_deblock_prop = o.talk_deblock_guess = o.talk_deblock_room = o.talk_deblock_peo = o.strikeTalk = void 0;
var a = e("../../../textures_load/scripts/userStore/userStore"), n = e("../../../textures_load/scripts/ways/eventPost"), l = e("../../../textures_load/scripts/ways/load_Json_Pic"), i = e("../userStore/stateType");
function s(e, t) {
console.log("strikeTalk", e);
l.default.loadJson(a.default.talkTable).then(function(o) {
if (o) {
for (var l = [], i = 0; i < o.length; i++) o[i].talkClert == e && l.push(o[i]);
a.default.talkClert = l;
t && "prop" !== t ? a.default.talkClert_prop = t : "prop" == t && (a.default.ispropstrike1 = !0);
a.default.ismomery = !1;
n.default.Env("uptalk");
}
});
}
o.strikeTalk = s;
function c(e) {
console.log("解锁人物", e);
l.default.loadJson(a.default.peopleTable).then(function(t) {
if (t) for (var o = function() {
if (t[s].peoId == e) {
var o = t[s].peoName, c = t[s].peoIcon;
l.default.loadJson(a.default.picTable).then(function(e) {
if (e) for (var t = 0; t < e.length; t++) if (e[t].picId == c) {
var a = e[t].picName, l = [ i.talkStrikeType.deblock_peo, o, a ];
n.default.Env_data("deblock_peo", l);
}
});
}
}, s = 0; s < t.length; s++) o();
});
}
o.talk_deblock_peo = c;
function r(e) {
console.log("解锁入口", e);
n.default.Env("ontouch");
if (a.default.localdate.door.includes(e)) ; else {
a.default.localdate.door.push(e);
n.default.Env("map_up_tip");
}
}
o.talk_deblock_room = r;
function d(e) {
console.log("解锁猜想", e);
l.default.loadJson(a.default.guessTable).then(function(t) {
if (t) for (var o = function() {
if (t[s].guessOrder == e && t[s].guessNum == e + "_00") {
var o = t[s].guessName, c = t[s].guessPic;
l.default.loadJson(a.default.picTable).then(function(e) {
if (e) for (var t = 0; t < e.length; t++) if (e[t].picId == c) {
var a = e[t].picName, l = [ i.talkStrikeType.deblock_guess, o, a ];
n.default.Env_data("deblock_guess", l);
}
});
}
}, s = 0; s < t.length; s++) o();
});
}
o.talk_deblock_guess = d;
function u(e) {
console.log("解锁道具", e);
l.default.loadJson(a.default.propTable).then(function(t) {
if (t) for (var o = 0; o < t.length; o++) if (t[o].propNum == e) {
var a = t[o].prop, l = [ i.touchPicaffect.get_prop, a, e ];
n.default.Env_data("deblock_prop", l);
}
});
}
o.talk_deblock_prop = u;
function p(e) {
console.log("强转场景", e);
n.default.Env_data("strong_turn_sce", e);
n.default.Env("ontouch");
}
o.talk_turn_scene = p;
function f(e) {
console.log("结案选择", e);
n.default.Env("talk_choose_case");
n.default.Env("ontouch");
}
o.talk_choose_case = f;
function h(e) {
console.log("触发对话", e);
n.default.Env_data("talk_strike_talk", e);
n.default.Env("ontouch");
}
o.talk_strike_talk = h;
function g(e) {
console.log("触发对话错误", e);
a.default.close_case_answer_false = e;
n.default.Env("talk_strike_talk_false");
n.default.Env("ontouch");
}
o.talk_strike_talk_false = g;
function _() {
console.log("结束章节");
n.default.Env("next_chapter_to_talk");
n.default.Env("ontouch");
}
o.over_clert = _;
function y(e) {
console.log("新手引导");
a.default.localdate.guideisok || l.default.loadJson(a.default.guidenewTable).then(function(t) {
if (t) for (var o = 0, a = t.length; o < a; o++) if (t[o].guidenewId == e) {
var l = t[o].targetType, i = t[o].target, s = t[o].strikeType, c = t[o].strike;
n.default.Env_data("upnewguide", {
targetType: l,
target: i,
strikeType: s,
strike: c,
guidenewId: e
});
n.default.Env("ontouch");
}
});
}
o.guide_new = y;
o.default = {
strikeTalk: s,
talk_deblock_peo: c,
talk_deblock_room: r,
talk_deblock_guess: d,
talk_deblock_prop: u,
talk_turn_scene: p,
talk_choose_case: f,
talk_strike_talk: h,
talk_strike_talk_false: g,
over_clert: _,
guide_new: y
};
cc._RF.pop();
}, {
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../../../textures_load/scripts/ways/load_Json_Pic": void 0,
"../userStore/stateType": "stateType"
} ],
timeCode1: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f5ad499jqFEjqZ14CODnY77", "timeCode1");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/userStore/userStore"), s = e("../../../textures_load/scripts/ways/eventPost"), c = e("../userStore/stateType"), r = cc._decorator, d = r.ccclass, u = (r.property, 
function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.timejishi = 0;
t.nodetarget = null;
return t;
}
t.prototype.onLoad = function() {
cc.game.addPersistRootNode(this.node);
};
t.prototype.start = function() {
this.countDownNode = cc.find("Canvas/timejishi/lab1").getComponent(cc.Label);
this.countDownNode.string = "00:00:00";
cc.systemEvent.on("timecode1", function(e) {
i.default.localdate.timelab1 = e.getUserData().time + e.getUserData().max;
i.default.localdate.timelab1_nodename1 = e.getUserData().name;
i.default.localdate.scheduleNumtime1 = !0;
}, this);
cc.systemEvent.on("timecode1end", function() {
i.default.localdate.scheduleNumtime1 = !1;
i.default.localdate.timelab1 = 0;
}, this);
};
t.prototype.update = function(e) {
if (i.default.localdate.scheduleNumtime1) {
this.timejishi += e;
if (this.timejishi >= 1) {
this.timejishi = 0;
i.default.localdate.timelab1--;
if (i.default.localdate.timelab1 <= 0) {
i.default.localdate.timelab1 = 0;
this.over();
return;
}
var t = Math.trunc(i.default.localdate.timelab1 / 60), o = Math.trunc(i.default.localdate.timelab1 % 60), a = Math.trunc(t / 60), n = a > 60 ? a % 24 : a;
Math.trunc(a / 24);
t %= 60;
var l = "";
l = l = a <= 0 ? "00:" + Math.trunc(t / 10) + t % 10 + ":" + Math.trunc(o / 10) + o % 10 : Math.trunc(n / 10) + "" + n % 10 + ":" + Math.trunc(t / 10) + t % 10 + ":" + Math.trunc(o / 10) + o % 10;
this.countDownNode.string = l;
s.default.Env_data("timejishi", {
name: i.default.localdate.timelab1_nodename1,
node: cc.find("Canvas/timejishi"),
num: 0,
schname: "timecode1"
});
}
}
};
t.prototype.over = function() {
for (var e = 0; e < i.default.localdate.prop.length; e++) i.default.localdate.prop[e].name == i.default.localdate.timelab1_nodename1 && (i.default.localdate.prop[e].propType = c.propType.Locked_unlook);
s.default.Env_data("downtime", {
propname: i.default.localdate.timelab1_nodename1,
schname: "timecode1"
});
if (-1 != i.default.localdate.scheduleList.indexOf("timecode1")) console.log("计时器组3", i.default.localdate.scheduleList); else {
i.default.localdate.scheduleList.push("timecode1");
console.log("计时器组3", i.default.localdate.scheduleList);
}
i.default.localdate.scheduleNumtime1 = !1;
};
return l([ d ], t);
}(cc.Component));
o.default = u;
cc._RF.pop();
}, {
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../userStore/stateType": "stateType"
} ],
timeCode2: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "85f99DfcBlIqpm7vwNmzyuJ", "timeCode2");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/userStore/userStore"), s = e("../../../textures_load/scripts/ways/eventPost"), c = e("../userStore/stateType"), r = cc._decorator, d = r.ccclass, u = (r.property, 
function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.timejishi = 0;
t.nodetarget = null;
return t;
}
t.prototype.onLoad = function() {
cc.game.addPersistRootNode(this.node);
};
t.prototype.start = function() {
this.countDownNode = cc.find("Canvas/timejishi/lab2").getComponent(cc.Label);
this.countDownNode.string = "00:00:00";
cc.systemEvent.on("timecode2", function(e) {
i.default.localdate.timelab2 = e.getUserData().time + e.getUserData().max;
i.default.localdate.timelab1_nodename2 = e.getUserData().name;
i.default.localdate.scheduleNumtime2 = !0;
}, this);
cc.systemEvent.on("timecode2end", function() {
i.default.localdate.scheduleNumtime2 = !1;
i.default.localdate.timelab2 = 0;
}, this);
};
t.prototype.update = function(e) {
if (i.default.localdate.scheduleNumtime2) {
this.timejishi += e;
if (this.timejishi >= 1) {
this.timejishi = 0;
i.default.localdate.timelab2--;
if (i.default.localdate.timelab2 <= 0) {
i.default.localdate.timelab2 = 0;
this.over();
return;
}
var t = Math.trunc(i.default.localdate.timelab2 / 60), o = Math.trunc(i.default.localdate.timelab2 % 60), a = Math.trunc(t / 60), n = a > 60 ? a % 24 : a;
Math.trunc(a / 24);
t %= 60;
var l = "";
l = l = a <= 0 ? "00:" + Math.trunc(t / 10) + t % 10 + ":" + Math.trunc(o / 10) + o % 10 : Math.trunc(n / 10) + "" + n % 10 + ":" + Math.trunc(t / 10) + t % 10 + ":" + Math.trunc(o / 10) + o % 10;
this.countDownNode.string = l;
s.default.Env_data("timejishi", {
name: i.default.localdate.timelab1_nodename2,
node: cc.find("Canvas/timejishi"),
num: 1,
schname: "timecode2"
});
}
}
};
t.prototype.over = function() {
for (var e = 0; e < i.default.localdate.prop.length; e++) i.default.localdate.prop[e].name == i.default.localdate.timelab1_nodename2 && (i.default.localdate.prop[e].propType = c.propType.Locked_unlook);
s.default.Env_data("downtime", {
propname: i.default.localdate.timelab1_nodename2,
schname: "timecode2"
});
if (-1 != i.default.localdate.scheduleList.indexOf("timecode2")) console.log("计时器组3", i.default.localdate.scheduleList); else {
i.default.localdate.scheduleList.push("timecode2");
console.log("计时器组3", i.default.localdate.scheduleList);
}
i.default.localdate.scheduleNumtime2 = !1;
};
return l([ d ], t);
}(cc.Component));
o.default = u;
cc._RF.pop();
}, {
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../userStore/stateType": "stateType"
} ],
timeCode3: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e371a4L4zlDF6yIdnEjYw1T", "timeCode3");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/userStore/userStore"), s = e("../../../textures_load/scripts/ways/eventPost"), c = e("../userStore/stateType"), r = cc._decorator, d = r.ccclass, u = (r.property, 
function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.timejishi = 0;
t.nodetarget = null;
return t;
}
t.prototype.onLoad = function() {
cc.game.addPersistRootNode(this.node);
};
t.prototype.start = function() {
this.countDownNode = cc.find("Canvas/timejishi/lab3").getComponent(cc.Label);
this.countDownNode.string = "00:00:00";
cc.systemEvent.on("timecode3", function(e) {
i.default.localdate.timelab3 = e.getUserData().time + e.getUserData().max;
i.default.localdate.timelab1_nodename3 = e.getUserData().name;
i.default.localdate.scheduleNumtime3 = !0;
}, this);
cc.systemEvent.on("timecode3end", function() {
i.default.localdate.scheduleNumtime3 = !1;
i.default.localdate.timelab3 = 0;
}, this);
};
t.prototype.update = function(e) {
if (i.default.localdate.scheduleNumtime3) {
this.timejishi += e;
if (this.timejishi >= 1) {
this.timejishi = 0;
i.default.localdate.timelab3--;
if (i.default.localdate.timelab3 <= 0) {
i.default.localdate.timelab3 = 0;
this.over();
return;
}
var t = Math.trunc(i.default.localdate.timelab3 / 60), o = Math.trunc(i.default.localdate.timelab3 % 60), a = Math.trunc(t / 60), n = a > 60 ? a % 24 : a;
Math.trunc(a / 24);
t %= 60;
var l = "";
l = l = a <= 0 ? "00:" + Math.trunc(t / 10) + t % 10 + ":" + Math.trunc(o / 10) + o % 10 : Math.trunc(n / 10) + "" + n % 10 + ":" + Math.trunc(t / 10) + t % 10 + ":" + Math.trunc(o / 10) + o % 10;
this.countDownNode.string = l;
s.default.Env_data("timejishi", {
name: i.default.localdate.timelab1_nodename3,
node: cc.find("Canvas/timejishi"),
num: 2,
schname: "timecode3"
});
}
}
};
t.prototype.over = function() {
for (var e = 0; e < i.default.localdate.prop.length; e++) i.default.localdate.prop[e].name == i.default.localdate.timelab1_nodename3 && (i.default.localdate.prop[e].propType = c.propType.Locked_unlook);
s.default.Env_data("downtime", {
propname: i.default.localdate.timelab1_nodename3,
schname: "timecode3"
});
if (-1 != i.default.localdate.scheduleList.indexOf("timecode3")) console.log("计时器组3", i.default.localdate.scheduleList); else {
i.default.localdate.scheduleList.push("timecode3");
console.log("计时器组3", i.default.localdate.scheduleList);
}
i.default.localdate.scheduleNumtime3 = !1;
};
return l([ d ], t);
}(cc.Component));
o.default = u;
cc._RF.pop();
}, {
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../userStore/stateType": "stateType"
} ],
timePowerSpeed: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "3e12eq8KvZKCLseUyM+j6aZ", "timePowerSpeed");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/userStore/userStore"), s = e("../../../textures_load/scripts/ways/eventPost"), c = cc._decorator, r = c.ccclass, d = (c.property, 
function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.timejishi = 0;
t.nodetarget = null;
return t;
}
t.prototype.onLoad = function() {
cc.game.addPersistRootNode(this.node);
};
t.prototype.start = function() {
this.countDownNode = cc.find("Canvas/timepower/lab2").getComponent(cc.Label);
this.countDownNode.string = "00:00:00";
cc.systemEvent.on("timepowerspeed", function() {
i.default.localdate.isspeed ? i.default.localdate.scheduleNumtimepowerspeed = !0 : i.default.localdate.scheduleNumtimepowerspeed = !1;
}, this);
};
t.prototype.update = function(e) {
if (i.default.localdate.scheduleNumtimepowerspeed) {
this.timejishi += e;
if (this.timejishi >= 1) {
this.timejishi = 0;
var t = Math.trunc(i.default.localdate.timepowerspeed / 60), o = Math.trunc(i.default.localdate.timepowerspeed % 60), a = Math.trunc(t / 60), n = a > 60 ? a % 24 : a;
Math.trunc(a / 24);
t %= 60;
var l = "";
l = l = a <= 0 ? "00:" + Math.trunc(t / 10) + t % 10 + ":" + Math.trunc(o / 10) + o % 10 : Math.trunc(n / 10) + "" + n % 10 + ":" + Math.trunc(t / 10) + t % 10 + ":" + Math.trunc(o / 10) + o % 10;
this.countDownNode.string = l;
s.default.Env_data("timepowerspeed", cc.find("Canvas/timepower/lab2"));
i.default.localdate.timepowerspeed--;
if (i.default.localdate.timepowerspeed <= 0) {
i.default.localdate.timepowerspeed = 43200;
i.default.localdate.isspeed = !1;
i.default.localdate.scheduleNumtimepowerspeed = !1;
s.default.Env("initpowerspeed");
return;
}
}
}
};
return l([ r ], t);
}(cc.Component));
o.default = d;
cc._RF.pop();
}, {
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0
} ],
timePower: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "3cc9bDqokRJ1qY8JfsG2wUu", "timePower");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/userStore/userStore"), s = e("../../../textures_load/scripts/ways/addPower"), c = e("../../../textures_load/scripts/ways/eventPost"), r = cc._decorator, d = r.ccclass, u = (r.property, 
function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.timejishi = 0;
t.nodetarget = null;
return t;
}
t.prototype.onLoad = function() {
cc.game.addPersistRootNode(this.node);
};
t.prototype.start = function() {
this.countDownNode = cc.find("Canvas/timepower/lab1").getComponent(cc.Label);
this.countDownNode.string = "00:00";
cc.systemEvent.on("timepower", function() {
i.default.localdate.power < (i.default.recode_allpowers ? i.default.recode_allpowers : 200) ? i.default.localdate.scheduleNumtimepower = !0 : i.default.localdate.scheduleNumtimepower = !1;
}, this);
console.log("222222", i.default.localdate.scheduleNumtimepower);
};
t.prototype.update = function(e) {
if (i.default.localdate.scheduleNumtimepower) {
this.timejishi += e;
if (this.timejishi >= 1) {
this.timejishi = 0;
var t = Math.trunc(i.default.localdate.timepower / 60), o = Math.trunc(i.default.localdate.timepower % 60), a = Math.trunc(t / 60), n = a > 60 ? a % 24 : a;
Math.trunc(a / 24);
t %= 60;
var l = "";
l = l = a <= 0 ? Math.trunc(t / 10) + "" + t % 10 + ":" + Math.trunc(o / 10) + o % 10 : Math.trunc(n / 10) + "" + n % 10 + ":" + Math.trunc(t / 10) + t % 10 + ":" + Math.trunc(o / 10) + o % 10;
this.countDownNode.string = l;
c.default.Env_data("timepower", cc.find("Canvas/timepower/lab1"));
i.default.localdate.isspeed ? i.default.localdate.timepower -= 2 : i.default.localdate.timepower--;
if (i.default.localdate.timepower <= 0) {
i.default.localdate.timepower = 300;
s.default.addpower(3);
if (i.default.localdate.power >= (i.default.recode_allpowers ? i.default.recode_allpowers : 200)) {
i.default.localdate.scheduleNumtimepower = !1;
c.default.Env("initpower");
}
return;
}
}
}
};
return l([ d ], t);
}(cc.Component));
o.default = u;
cc._RF.pop();
}, {
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/addPower": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0
} ],
video: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "43b83JBeEdE1oSCI+LhGGMO", "video");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.default = {
WX: "adunit-c062bac16a035536"
};
cc._RF.pop();
}, {} ],
watchVideo_getpower: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "5aa32p5ibRKqLxQZGL/GTvT", "watchVideo_getpower");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/music/musicControl"), s = e("../way/Toast"), c = e("../bannerMan/bannerMan"), r = e("../../../textures_load/scripts/userStore/userStore"), d = e("../../../textures_load/scripts/ways/addPower"), u = e("../../../textures_load/scripts/ways/eventPost"), p = cc._decorator, f = p.ccclass, h = (p.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
this.node.getChildByName("lab").getComponent(cc.Label).string = "看视频获得" + (r.default.recode_addpower ? r.default.recode_addpower : 50) + "点体力";
r.default.timevideonum = 0;
};
t.prototype.start = function() {
c.default.show("看视频得体力");
};
t.prototype.yes = function() {
s.default.showTip("暂无视频，稍后再试~");
};
t.prototype.success = function() {
u.default.Env_apkevent_param("event_getpower", "第" + r.default.localdate.chapter + "章/获得" + (r.default.recode_addpower ? r.default.recode_addpower : 50) + "体力");
u.default.Env_apkevent_param("event_all_watchvideo", "获得体力");
console.log("userStore.musicId", r.default.musicId);
i.default.playBgm(r.default.musicId);
d.default.addpower(r.default.recode_addpower ? r.default.recode_addpower : 50);
s.default.showTip("恭喜获得+ " + (r.default.recode_addpower ? r.default.recode_addpower : 50) + "体力~");
this.no();
};
t.prototype.no = function() {
r.default.timevideonum = 0;
i.default.playEffect("music_009");
c.default.hide();
this.node.destroy();
};
return l([ f ], t);
}(cc.Component));
o.default = h;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/addPower": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../bannerMan/bannerMan": "bannerMan",
"../way/Toast": "Toast"
} ],
watchVideo: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "9c82b6oWIxMl5jfBtuV1+3/", "watchVideo");
var a, n = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(e, t);
}, function(e, t) {
a(e, t);
function o() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
}), l = this && this.__decorate || function(e, t, o, a) {
var n, l = arguments.length, i = l < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, o) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, a); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i);
return l > 3 && i && Object.defineProperty(t, o, i), i;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../textures_load/scripts/music/musicControl"), s = e("./Toast"), c = e("../bannerMan/bannerMan"), r = e("../../../textures_load/scripts/userStore/userStore"), d = e("../../../textures_load/scripts/ways/eventPost"), u = cc._decorator, p = u.ccclass, f = (u.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
"guess_choose" == r.default.watch_video_data ? this.node.getChildByName("lab").getComponent(cc.Label).string = "是否看视频获得提示" : "powerspeed" == r.default.watch_video_data && (this.node.getChildByName("lab").getComponent(cc.Label).string = "是否看视频加速恢复体力");
r.default.timevideonum = 0;
};
t.prototype.start = function() {
c.default.show("是否看视频");
};
t.prototype.yes = function() {
s.default.showTip("暂无视频！");
};
t.prototype.success = function() {
console.log("userStore.musicId", r.default.musicId);
i.default.playBgm(r.default.musicId);
r.default.watch_video = !0;
if ("guess_choose" == r.default.watch_video_data) {
d.default.Env("up_guess_tip");
d.default.Env_apkevent_param("event_guess_tip", "第" + r.default.localdate.chapter + "章/获得猜想选择道具提示");
d.default.Env_apkevent_param("event_all_watchvideo", "猜想选择道具提示");
} else "powerspeed" == r.default.watch_video_data && d.default.Env("powerspeed");
this.no();
};
t.prototype.no = function() {
r.default.timevideonum = 0;
i.default.playEffect("music_009");
c.default.hide();
this.node.destroy();
};
return l([ p ], t);
}(cc.Component));
o.default = f;
cc._RF.pop();
}, {
"../../../textures_load/scripts/music/musicControl": void 0,
"../../../textures_load/scripts/userStore/userStore": void 0,
"../../../textures_load/scripts/ways/eventPost": void 0,
"../bannerMan/bannerMan": "bannerMan",
"./Toast": "Toast"
} ],
wechat: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "36c2aLiKyhHlLvcWqchyvyW", "wechat");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.openRewardVideo = o.createBanner = o.onHide = o.getLaunchOptionsSync = o.setStorage = o.getStorage = o.loginqq = o.login = o.showToast = o.shareNorm = o.shareWithAction = void 0;
var a = e("../../../textures_load/scripts/userStore/userStore"), n = e("../way/Toast"), l = [ "我一定会揪出凶手！", "他们之中，谁是凶手？", "恩怨交错的关系，何去何从？", "让我这个演员，带你寻找真相！", "善与恶，仅在一念之间！" ], i = [ "https://mmocgame.qpic.cn/wechatgame/J8KW0XKWw5Mf1ian2KXH0YuDiakSiaD6XL1hiaFgsFHgKBHjvj7plag9LiawHqjYyU4HL/0", "https://mmocgame.qpic.cn/wechatgame/J8KW0XKWw5Pv9HibueI6ib6MibsjWGREVcGsGq6Qla21nDMH0Kt1OOES5nuGKJu04tn/0", "https://mmocgame.qpic.cn/wechatgame/J8KW0XKWw5MJHQF2YnibjaYwCmcJH2m4y8AfeW7icqKQkQeNPkdoKz921rNTgEuZ2k/0", "https://mmocgame.qpic.cn/wechatgame/J8KW0XKWw5PwQj3SryasGMGxxDfaXL9bZXC4iaTtBSeoDLLxic2d9QrPpicMOvtHkvF/0", "https://mmocgame.qpic.cn/wechatgame/J8KW0XKWw5OcprtWQ7BqTkgRhbLgAxFo2Lnibx2dia5g8uXIpicvo5LDOcdK9s6CqFW/0" ];
if (window.wx) {
wx.updateShareMenu({
withShareTicket: !0
});
wx.showShareMenu({
withShareTicket: !0
});
var s = Math.floor(4.9 * Math.random());
console.log("num", s);
wx.onShareAppMessage(function() {
return {
title: l[s],
imageUrl: i[s]
};
});
}
function c() {
if (window.wx) {
var e = Math.floor(4.9 * Math.random()), t = l[e], o = i[e];
wx.shareAppMessage({
title: t,
imageUrl: o
});
}
}
o.shareWithAction = c;
function r() {
var e = this;
return new Promise(function(t) {
c();
if (window.wx) {
wx.onShow(function() {
cc.game.resume();
var o = (new Date().getTime() - e.currentTime) / 1e3;
console.log("当前时间差为", o);
if (o >= 3) {
console.log("分享成功");
t(!0);
} else {
console.log("分享失败");
t(!1);
}
});
wx.onHide(function() {
var t = new Date();
e.currentTime = t.getTime();
cc.game.pause();
});
}
});
}
o.shareNorm = r;
function d(e) {
var t = e.title;
e.icon;
window.wx && (window.qq ? qq.showToast({
title: t,
icon: "none",
duration: 2e3
}) : wx.showToast({
title: t,
icon: "none",
duration: 2e3
}));
}
o.showToast = d;
function u() {
return new Promise(function(e, t) {
wx.login({
success: e,
fail: t
});
});
}
o.login = u;
function p() {
return new Promise(function(e, t) {
qq.login({
success: e,
fail: t
});
});
}
o.loginqq = p;
function f(e) {
return wx.getStorageSync(e);
}
o.getStorage = f;
function h(e, t) {
return wx.setStorageSync(e, t);
}
o.setStorage = h;
function g() {
return window.wx ? window.qq ? qq.getLaunchOptionsSync() : wx.getLaunchOptionsSync() : {
query: {
inviter_openid: a.default.openid,
action: "action"
}
};
}
o.getLaunchOptionsSync = g;
function _() {
window.wx && (window.qq ? qq.onHide(function() {}) : wx.onHide(function() {}));
}
o.onHide = _;
function y(e) {
if (window.wx) {
if (window.tt) {
var t = tt.getSystemInfoSync(), o = t.windowHeight, a = t.windowWidth, n = tt.createBannerAd({
adUnitId: e,
style: {
top: 100,
left: 50,
width: 300
}
});
console.log("banner", n);
var l = 1;
n.onResize(function(e) {
if (!(l <= 0)) {
l = 0;
n.style.top = o - e.height - 15;
n.style.left = (a - e.width) / 2;
n.show();
}
});
n.onError(function(e) {
console.log("error", e);
});
return n;
}
if (window.qq) {
var i = window.qq.getSystemInfoSync(), s = i.windowHeight, c = i.windowWidth, r = window.qq.createBannerAd({
adUnitId: e,
style: {
top: s - 100,
left: 0,
width: c
},
testDemoType: "65"
});
r.onResize(function(e) {
r.style.top = s - e.height;
r.style.left = (c - e.width) / 2;
});
r.onError(function(e) {
console.log("bannerAd onError", e);
});
r.onLoad(function(e) {
console.log("bannerAd onLoad", e);
});
return r;
}
var d = wx.getSystemInfoSync(), u = d.windowHeight, p = d.windowWidth, f = wx.createBannerAd({
adUnitId: e,
style: {
top: 100,
left: 50,
width: p - 30 > 300 ? p - 30 : 300
}
});
f.onResize(function(e) {
f.style.top = u - e.height - 15;
f.style.left = (p - e.width) / 2;
});
f.show(function(e) {
console.log("onshow", e);
});
f.onError(function(e) {
console.log("error", e);
});
return f;
}
}
o.createBanner = y;
function m(e) {
if (window.wx) return window.tt ? new Promise(function(t, o) {
var a = tt.createRewardedVideoAd({
adUnitId: e
});
a.onError(function(e) {
console.log("video load error", e);
});
a.onClose(function(e) {
if (e.isEnded) {
console.log("放完");
t(!0);
cc.game.resume();
} else {
console.log("没放完");
t(!1);
cc.game.resume();
}
});
a.load().then(function() {
a.show();
cc.game.pause();
}).catch(function(e) {
o(e.errMsg);
});
}) : window.qq ? new Promise(function(t) {
var o = window.qq.createRewardedVideoAd({
adUnitId: e
});
o.onError(function(e) {
console.log("激励视频错误", e);
});
o.onLoad(function() {
console.log("视频加载完成");
});
o.onClose(function(e) {
console.log("激励视频结束");
if (e.isEnded) {
t(!0);
cc.game.resume();
} else {
t(!1);
cc.game.resume();
}
});
o.load().then(function() {
o.show();
cc.game.pause();
}).catch(function(e) {
return console.log(e);
});
}) : new Promise(function(t, o) {
var a = wx.createRewardedVideoAd({
adUnitId: e
});
a.onError(function(e) {
console.log("video load error", e);
n.default.showTip("视频还未准备好哦~");
});
a.onClose(function(e) {
a.offClose();
if (e.isEnded) {
console.log("放完");
t(!0);
cc.game.resume();
} else {
console.log("没放完");
t(!1);
cc.game.resume();
}
});
a.load().then(function() {
a.show();
cc.game.pause();
}).catch(function(e) {
o(e.errMsg);
});
});
}
o.openRewardVideo = m;
o.default = {
shareWithAction: c,
showToast: d,
openRewardVideo: m,
createBanner: y,
shareNorm: r,
getLaunchOptionsSync: g,
onHide: _,
getStorage: f,
setStorage: h,
login: u,
loginqq: p
};
cc._RF.pop();
}, {
"../../../textures_load/scripts/userStore/userStore": void 0,
"../way/Toast": "Toast"
} ]
}, {}, [ "bannerMan", "video", "Code", "ComTipDesxc", "Deblock_talk", "Deblock_talk_peo", "Deblock_touch", "Loupe", "LoupeCode", "Talk", "Home", "Map", "Mapchild", "Proptips", "Top", "returnScenechapter", "watchVideo_getpower", "musicSetting", "music_effect", "Notes", "close_case", "close_case_false", "guessList", "guessPre", "guess_choose", "guess_choose_icon", "guess_suddly", "guessonlyPre", "peopleIcon", "peopleList", "propAsy", "propList", "propPre", "ganImports", "guessData", "guess_tl_answer", "postLocaldata", "propData", "propTipData", "stateType", "wechat", "TimerManager", "Toast", "choose_case_true_false", "close_clert_def", "guideNew", "move", "new_Tip_num", "nextchapter_power", "powerAnim", "recode", "recomScene", "shakeNode", "shakeTalk", "sort", "talkStrike", "timeCode1", "timeCode2", "timeCode3", "timePower", "timePowerSpeed", "watchVideo" ]);