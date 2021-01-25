(function(t, e, i) {
function n(i) {
var r = e[i];
if (!r) {
var s = t[i];
if (!s) return;
var a = {};
r = e[i] = {
exports: a
};
s[0]((function(t) {
return n(s[1][t] || t);
}), r, a);
}
return r.exports;
}
for (var r = 0; r < i.length; r++) n(i[r]);
})({
1: [ (function(t) {
"use strict";
t("../core/platform/CCClass");
var e = t("../core/utils/misc");
cc.Action = cc.Class({
name: "cc.Action",
ctor: function() {
this.originalTarget = null;
this.target = null;
this.tag = cc.Action.TAG_INVALID;
},
clone: function() {
var t = new cc.Action();
t.originalTarget = null;
t.target = null;
t.tag = this.tag;
return t;
},
isDone: function() {
return !0;
},
startWithTarget: function(t) {
this.originalTarget = t;
this.target = t;
},
stop: function() {
this.target = null;
},
step: function() {
cc.logID(1006);
},
update: function() {
cc.logID(1007);
},
getTarget: function() {
return this.target;
},
setTarget: function(t) {
this.target = t;
},
getOriginalTarget: function() {
return this.originalTarget;
},
setOriginalTarget: function(t) {
this.originalTarget = t;
},
getTag: function() {
return this.tag;
},
setTag: function(t) {
this.tag = t;
},
retain: function() {},
release: function() {}
});
cc.Action.TAG_INVALID = -1;
cc.FiniteTimeAction = cc.Class({
name: "cc.FiniteTimeAction",
extends: cc.Action,
ctor: function() {
this._duration = 0;
},
getDuration: function() {
return this._duration * (this._timesForRepeat || 1);
},
setDuration: function(t) {
this._duration = t;
},
reverse: function() {
cc.logID(1008);
return null;
},
clone: function() {
return new cc.FiniteTimeAction();
}
});
cc.Speed = cc.Class({
name: "cc.Speed",
extends: cc.Action,
ctor: function(t, e) {
this._speed = 0;
this._innerAction = null;
t && this.initWithAction(t, e);
},
getSpeed: function() {
return this._speed;
},
setSpeed: function(t) {
this._speed = t;
},
initWithAction: function(t, e) {
if (!t) {
cc.errorID(1021);
return !1;
}
this._innerAction = t;
this._speed = e;
return !0;
},
clone: function() {
var t = new cc.Speed();
t.initWithAction(this._innerAction.clone(), this._speed);
return t;
},
startWithTarget: function(t) {
cc.Action.prototype.startWithTarget.call(this, t);
this._innerAction.startWithTarget(t);
},
stop: function() {
this._innerAction.stop();
cc.Action.prototype.stop.call(this);
},
step: function(t) {
this._innerAction.step(t * this._speed);
},
isDone: function() {
return this._innerAction.isDone();
},
reverse: function() {
return new cc.Speed(this._innerAction.reverse(), this._speed);
},
setInnerAction: function(t) {
this._innerAction !== t && (this._innerAction = t);
},
getInnerAction: function() {
return this._innerAction;
}
});
cc.speed = function(t, e) {
return new cc.Speed(t, e);
};
cc.Follow = cc.Class({
name: "cc.Follow",
extends: cc.Action,
ctor: function(t, e) {
this._followedNode = null;
this._boundarySet = !1;
this._boundaryFullyCovered = !1;
this._halfScreenSize = null;
this._fullScreenSize = null;
this.leftBoundary = 0;
this.rightBoundary = 0;
this.topBoundary = 0;
this.bottomBoundary = 0;
this._worldRect = cc.rect(0, 0, 0, 0);
t && (e ? this.initWithTarget(t, e) : this.initWithTarget(t));
},
clone: function() {
var t = new cc.Follow(), e = this._worldRect, i = new cc.Rect(e.x, e.y, e.width, e.height);
t.initWithTarget(this._followedNode, i);
return t;
},
isBoundarySet: function() {
return this._boundarySet;
},
setBoudarySet: function(t) {
this._boundarySet = t;
},
initWithTarget: function(t, e) {
if (!t) {
cc.errorID(1022);
return !1;
}
e = e || cc.rect(0, 0, 0, 0);
this._followedNode = t;
this._worldRect = e;
this._boundarySet = !(0 === e.width && 0 === e.height);
this._boundaryFullyCovered = !1;
var i = cc.winSize;
this._fullScreenSize = cc.v2(i.width, i.height);
this._halfScreenSize = this._fullScreenSize.mul(.5);
if (this._boundarySet) {
this.leftBoundary = -(e.x + e.width - this._fullScreenSize.x);
this.rightBoundary = -e.x;
this.topBoundary = -e.y;
this.bottomBoundary = -(e.y + e.height - this._fullScreenSize.y);
this.rightBoundary < this.leftBoundary && (this.rightBoundary = this.leftBoundary = (this.leftBoundary + this.rightBoundary) / 2);
this.topBoundary < this.bottomBoundary && (this.topBoundary = this.bottomBoundary = (this.topBoundary + this.bottomBoundary) / 2);
this.topBoundary === this.bottomBoundary && this.leftBoundary === this.rightBoundary && (this._boundaryFullyCovered = !0);
}
return !0;
},
step: function() {
var t = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO), i = this._followedNode.convertToWorldSpaceAR(cc.Vec2.ZERO), n = t.sub(i), r = this.target.parent.convertToNodeSpaceAR(n.add(this._halfScreenSize));
if (this._boundarySet) {
if (this._boundaryFullyCovered) return;
this.target.setPosition(e.clampf(r.x, this.leftBoundary, this.rightBoundary), e.clampf(r.y, this.bottomBoundary, this.topBoundary));
} else this.target.setPosition(r.x, r.y);
},
isDone: function() {
return !this._followedNode.activeInHierarchy;
},
stop: function() {
this.target = null;
cc.Action.prototype.stop.call(this);
}
});
cc.follow = function(t, e) {
return new cc.Follow(t, e);
};
}), {
"../core/platform/CCClass": 128,
"../core/utils/misc": 196
} ],
2: [ (function() {
"use strict";
function t(t, e) {
return t[Math.min(t.length - 1, Math.max(e, 0))];
}
function e(t) {
for (var e = [], i = t.length - 1; i >= 0; i--) e.push(cc.v2(t[i].x, t[i].y));
return e;
}
function i(t) {
for (var e = [], i = 0; i < t.length; i++) e.push(cc.v2(t[i].x, t[i].y));
return e;
}
cc.CardinalSplineTo = cc.Class({
name: "cc.CardinalSplineTo",
extends: cc.ActionInterval,
ctor: function(t, e, i) {
this._points = [];
this._deltaT = 0;
this._tension = 0;
this._previousPosition = null;
this._accumulatedDiff = null;
void 0 !== i && cc.CardinalSplineTo.prototype.initWithDuration.call(this, t, e, i);
},
initWithDuration: function(t, e, i) {
if (!e || 0 === e.length) {
cc.errorID(1024);
return !1;
}
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this.setPoints(e);
this._tension = i;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.CardinalSplineTo();
t.initWithDuration(this._duration, i(this._points), this._tension);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._deltaT = 1 / (this._points.length - 1);
this._previousPosition = cc.v2(this.target.x, this.target.y);
this._accumulatedDiff = cc.v2(0, 0);
},
update: function(e) {
e = this._computeEaseTime(e);
var i, n, r = this._points;
if (1 === e) {
i = r.length - 1;
n = 1;
} else {
var s = this._deltaT;
n = (e - s * (i = 0 | e / s)) / s;
}
var a, o, c, u, l, h, f, _, d, p, v, g, m, y, E = (a = t(r, i - 1), o = t(r, i - 0), 
c = t(r, i + 1), u = t(r, i + 2), d = (_ = (1 - this._tension) / 2) * (2 * (h = (l = n) * l) - (f = h * l) - l), 
p = _ * (-f + h) + (2 * f - 3 * h) + 1, v = _ * (f - 2 * h + l) + -2 * f + 3 * h, 
g = _ * (f - h), m = a.x * d + o.x * p + c.x * v + u.x * g, y = a.y * d + o.y * p + c.y * v + u.y * g, 
cc.v2(m, y));
if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
var T, C;
T = this.target.x - this._previousPosition.x;
C = this.target.y - this._previousPosition.y;
if (0 !== T || 0 !== C) {
var A = this._accumulatedDiff;
T = A.x + T;
C = A.y + C;
A.x = T;
A.y = C;
E.x += T;
E.y += C;
}
}
this.updatePosition(E);
},
reverse: function() {
var t = e(this._points);
return cc.cardinalSplineTo(this._duration, t, this._tension);
},
updatePosition: function(t) {
this.target.setPosition(t);
this._previousPosition = t;
},
getPoints: function() {
return this._points;
},
setPoints: function(t) {
this._points = t;
}
});
cc.cardinalSplineTo = function(t, e, i) {
return new cc.CardinalSplineTo(t, e, i);
};
cc.CardinalSplineBy = cc.Class({
name: "cc.CardinalSplineBy",
extends: cc.CardinalSplineTo,
ctor: function(t, e, i) {
this._startPosition = cc.v2(0, 0);
void 0 !== i && this.initWithDuration(t, e, i);
},
startWithTarget: function(t) {
cc.CardinalSplineTo.prototype.startWithTarget.call(this, t);
this._startPosition.x = t.x;
this._startPosition.y = t.y;
},
reverse: function() {
for (var t, i = this._points.slice(), n = i[0], r = 1; r < i.length; ++r) {
t = i[r];
i[r] = t.sub(n);
n = t;
}
var s = e(i);
n = s[s.length - 1];
s.pop();
n.x = -n.x;
n.y = -n.y;
s.unshift(n);
for (r = 1; r < s.length; ++r) {
(t = s[r]).x = -t.x;
t.y = -t.y;
t.x += n.x;
t.y += n.y;
s[r] = t;
n = t;
}
return cc.cardinalSplineBy(this._duration, s, this._tension);
},
updatePosition: function(t) {
var e = this._startPosition, i = t.x + e.x, n = t.y + e.y;
this._previousPosition.x = i;
this._previousPosition.y = n;
this.target.setPosition(i, n);
},
clone: function() {
var t = new cc.CardinalSplineBy();
t.initWithDuration(this._duration, i(this._points), this._tension);
return t;
}
});
cc.cardinalSplineBy = function(t, e, i) {
return new cc.CardinalSplineBy(t, e, i);
};
cc.CatmullRomTo = cc.Class({
name: "cc.CatmullRomTo",
extends: cc.CardinalSplineTo,
ctor: function(t, e) {
e && this.initWithDuration(t, e);
},
initWithDuration: function(t, e) {
return cc.CardinalSplineTo.prototype.initWithDuration.call(this, t, e, .5);
},
clone: function() {
var t = new cc.CatmullRomTo();
t.initWithDuration(this._duration, i(this._points));
return t;
}
});
cc.catmullRomTo = function(t, e) {
return new cc.CatmullRomTo(t, e);
};
cc.CatmullRomBy = cc.Class({
name: "cc.CatmullRomBy",
extends: cc.CardinalSplineBy,
ctor: function(t, e) {
e && this.initWithDuration(t, e);
},
initWithDuration: function(t, e) {
return cc.CardinalSplineTo.prototype.initWithDuration.call(this, t, e, .5);
},
clone: function() {
var t = new cc.CatmullRomBy();
t.initWithDuration(this._duration, i(this._points));
return t;
}
});
cc.catmullRomBy = function(t, e) {
return new cc.CatmullRomBy(t, e);
};
}), {} ],
3: [ (function() {
"use strict";
cc.easeIn = function(t) {
return {
_rate: t,
easing: function(t) {
return Math.pow(t, this._rate);
},
reverse: function() {
return cc.easeIn(1 / this._rate);
}
};
};
cc.easeOut = function(t) {
return {
_rate: t,
easing: function(t) {
return Math.pow(t, 1 / this._rate);
},
reverse: function() {
return cc.easeOut(1 / this._rate);
}
};
};
cc.easeInOut = function(t) {
return {
_rate: t,
easing: function(t) {
return (t *= 2) < 1 ? .5 * Math.pow(t, this._rate) : 1 - .5 * Math.pow(2 - t, this._rate);
},
reverse: function() {
return cc.easeInOut(this._rate);
}
};
};
var t = {
easing: function(t) {
return 0 === t ? 0 : Math.pow(2, 10 * (t - 1));
},
reverse: function() {
return e;
}
};
cc.easeExponentialIn = function() {
return t;
};
var e = {
easing: function(t) {
return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
},
reverse: function() {
return t;
}
};
cc.easeExponentialOut = function() {
return e;
};
var i = {
easing: function(t) {
return 1 !== t && 0 !== t ? (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1))) : t;
},
reverse: function() {
return i;
}
};
cc.easeExponentialInOut = function() {
return i;
};
var n = {
easing: function(t) {
return 0 === t || 1 === t ? t : -1 * Math.cos(t * Math.PI / 2) + 1;
},
reverse: function() {
return r;
}
};
cc.easeSineIn = function() {
return n;
};
var r = {
easing: function(t) {
return 0 === t || 1 === t ? t : Math.sin(t * Math.PI / 2);
},
reverse: function() {
return n;
}
};
cc.easeSineOut = function() {
return r;
};
var s = {
easing: function(t) {
return 0 === t || 1 === t ? t : -.5 * (Math.cos(Math.PI * t) - 1);
},
reverse: function() {
return s;
}
};
cc.easeSineInOut = function() {
return s;
};
var a = {
easing: function(t) {
if (0 === t || 1 === t) return t;
t -= 1;
return -Math.pow(2, 10 * t) * Math.sin((t - .075) * Math.PI * 2 / .3);
},
reverse: function() {
return o;
}
};
cc.easeElasticIn = function(t) {
return t && .3 !== t ? {
_period: t,
easing: function(t) {
if (0 === t || 1 === t) return t;
t -= 1;
return -Math.pow(2, 10 * t) * Math.sin((t - this._period / 4) * Math.PI * 2 / this._period);
},
reverse: function() {
return cc.easeElasticOut(this._period);
}
} : a;
};
var o = {
easing: function(t) {
return 0 === t || 1 === t ? t : Math.pow(2, -10 * t) * Math.sin((t - .075) * Math.PI * 2 / .3) + 1;
},
reverse: function() {
return a;
}
};
cc.easeElasticOut = function(t) {
return t && .3 !== t ? {
_period: t,
easing: function(t) {
return 0 === t || 1 === t ? t : Math.pow(2, -10 * t) * Math.sin((t - this._period / 4) * Math.PI * 2 / this._period) + 1;
},
reverse: function() {
return cc.easeElasticIn(this._period);
}
} : o;
};
cc.easeElasticInOut = function(t) {
return {
_period: t = t || .3,
easing: function(t) {
var e = 0, i = this._period;
if (0 === t || 1 === t) e = t; else {
t *= 2;
i || (i = this._period = .3 * 1.5);
var n = i / 4;
e = (t -= 1) < 0 ? -.5 * Math.pow(2, 10 * t) * Math.sin((t - n) * Math.PI * 2 / i) : Math.pow(2, -10 * t) * Math.sin((t - n) * Math.PI * 2 / i) * .5 + 1;
}
return e;
},
reverse: function() {
return cc.easeElasticInOut(this._period);
}
};
};
function c(t) {
return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
}
var u = {
easing: function(t) {
return 1 - c(1 - t);
},
reverse: function() {
return l;
}
};
cc.easeBounceIn = function() {
return u;
};
var l = {
easing: function(t) {
return c(t);
},
reverse: function() {
return u;
}
};
cc.easeBounceOut = function() {
return l;
};
var h = {
easing: function(t) {
return t < .5 ? .5 * (1 - c(1 - (t *= 2))) : .5 * c(2 * t - 1) + .5;
},
reverse: function() {
return h;
}
};
cc.easeBounceInOut = function() {
return h;
};
var f = {
easing: function(t) {
return 0 === t || 1 === t ? t : t * t * (2.70158 * t - 1.70158);
},
reverse: function() {
return _;
}
};
cc.easeBackIn = function() {
return f;
};
var _ = {
easing: function(t) {
return 0 === t ? 0 : (t -= 1) * t * (2.70158 * t + 1.70158) + 1;
},
reverse: function() {
return f;
}
};
cc.easeBackOut = function() {
return _;
};
var d = {
easing: function(t) {
return (t *= 2) < 1 ? t * t * (3.5949095 * t - 2.5949095) / 2 : (t -= 2) * t * (3.5949095 * t + 2.5949095) / 2 + 1;
},
reverse: function() {
return d;
}
};
cc.easeBackInOut = function() {
return d;
};
cc.easeBezierAction = function(t, e, i, n) {
return {
easing: function(r) {
return Math.pow(1 - r, 3) * t + 3 * r * Math.pow(1 - r, 2) * e + 3 * Math.pow(r, 2) * (1 - r) * i + Math.pow(r, 3) * n;
},
reverse: function() {
return cc.easeBezierAction(n, i, e, t);
}
};
};
var p = {
easing: function(t) {
return Math.pow(t, 2);
},
reverse: function() {
return p;
}
};
cc.easeQuadraticActionIn = function() {
return p;
};
var v = {
easing: function(t) {
return -t * (t - 2);
},
reverse: function() {
return v;
}
};
cc.easeQuadraticActionOut = function() {
return v;
};
var g = {
easing: function(t) {
return (t *= 2) < 1 ? t * t * .5 : -.5 * (--t * (t - 2) - 1);
},
reverse: function() {
return g;
}
};
cc.easeQuadraticActionInOut = function() {
return g;
};
var m = {
easing: function(t) {
return t * t * t * t;
},
reverse: function() {
return m;
}
};
cc.easeQuarticActionIn = function() {
return m;
};
var y = {
easing: function(t) {
return -((t -= 1) * t * t * t - 1);
},
reverse: function() {
return y;
}
};
cc.easeQuarticActionOut = function() {
return y;
};
var E = {
easing: function(t) {
return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2);
},
reverse: function() {
return E;
}
};
cc.easeQuarticActionInOut = function() {
return E;
};
var T = {
easing: function(t) {
return t * t * t * t * t;
},
reverse: function() {
return T;
}
};
cc.easeQuinticActionIn = function() {
return T;
};
var C = {
easing: function(t) {
return (t -= 1) * t * t * t * t + 1;
},
reverse: function() {
return C;
}
};
cc.easeQuinticActionOut = function() {
return C;
};
var A = {
easing: function(t) {
return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2);
},
reverse: function() {
return A;
}
};
cc.easeQuinticActionInOut = function() {
return A;
};
var S = {
easing: function(t) {
return -1 * (Math.sqrt(1 - t * t) - 1);
},
reverse: function() {
return S;
}
};
cc.easeCircleActionIn = function() {
return S;
};
var x = {
easing: function(t) {
t -= 1;
return Math.sqrt(1 - t * t);
},
reverse: function() {
return x;
}
};
cc.easeCircleActionOut = function() {
return x;
};
var b = {
easing: function(t) {
if ((t *= 2) < 1) return -.5 * (Math.sqrt(1 - t * t) - 1);
t -= 2;
return .5 * (Math.sqrt(1 - t * t) + 1);
},
reverse: function() {
return b;
}
};
cc.easeCircleActionInOut = function() {
return b;
};
var R = {
easing: function(t) {
return t * t * t;
},
reverse: function() {
return R;
}
};
cc.easeCubicActionIn = function() {
return R;
};
var w = {
easing: function(t) {
return (t -= 1) * t * t + 1;
},
reverse: function() {
return w;
}
};
cc.easeCubicActionOut = function() {
return w;
};
var O = {
easing: function(t) {
return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2);
},
reverse: function() {
return O;
}
};
cc.easeCubicActionInOut = function() {
return O;
};
}), {} ],
4: [ (function() {
"use strict";
cc.ActionInstant = cc.Class({
name: "cc.ActionInstant",
extends: cc.FiniteTimeAction,
isDone: function() {
return !0;
},
step: function() {
this.update(1);
},
update: function() {},
reverse: function() {
return this.clone();
},
clone: function() {
return new cc.ActionInstant();
}
});
cc.Show = cc.Class({
name: "cc.Show",
extends: cc.ActionInstant,
update: function() {
for (var t = this.target.getComponentsInChildren(cc.RenderComponent), e = 0; e < t.length; ++e) t[e].enabled = !0;
},
reverse: function() {
return new cc.Hide();
},
clone: function() {
return new cc.Show();
}
});
cc.show = function() {
return new cc.Show();
};
cc.Hide = cc.Class({
name: "cc.Hide",
extends: cc.ActionInstant,
update: function() {
for (var t = this.target.getComponentsInChildren(cc.RenderComponent), e = 0; e < t.length; ++e) t[e].enabled = !1;
},
reverse: function() {
return new cc.Show();
},
clone: function() {
return new cc.Hide();
}
});
cc.hide = function() {
return new cc.Hide();
};
cc.ToggleVisibility = cc.Class({
name: "cc.ToggleVisibility",
extends: cc.ActionInstant,
update: function() {
for (var t = this.target.getComponentsInChildren(cc.RenderComponent), e = 0; e < t.length; ++e) {
var i = t[e];
i.enabled = !i.enabled;
}
},
reverse: function() {
return new cc.ToggleVisibility();
},
clone: function() {
return new cc.ToggleVisibility();
}
});
cc.toggleVisibility = function() {
return new cc.ToggleVisibility();
};
cc.RemoveSelf = cc.Class({
name: "cc.RemoveSelf",
extends: cc.ActionInstant,
ctor: function(t) {
this._isNeedCleanUp = !0;
void 0 !== t && this.init(t);
},
update: function() {
this.target.removeFromParent(this._isNeedCleanUp);
},
init: function(t) {
this._isNeedCleanUp = t;
return !0;
},
reverse: function() {
return new cc.RemoveSelf(this._isNeedCleanUp);
},
clone: function() {
return new cc.RemoveSelf(this._isNeedCleanUp);
}
});
cc.removeSelf = function(t) {
return new cc.RemoveSelf(t);
};
cc.DestroySelf = cc.Class({
name: "cc.DestroySelf",
extends: cc.ActionInstant,
update: function() {
this.target.destroy();
},
reverse: function() {
return new cc.DestroySelf();
},
clone: function() {
return new cc.DestroySelf();
}
});
cc.destroySelf = function() {
return new cc.DestroySelf();
};
cc.FlipX = cc.Class({
name: "cc.FlipX",
extends: cc.ActionInstant,
ctor: function(t) {
this._flippedX = !1;
void 0 !== t && this.initWithFlipX(t);
},
initWithFlipX: function(t) {
this._flippedX = t;
return !0;
},
update: function() {
this.target.scaleX = Math.abs(this.target.scaleX) * (this._flippedX ? -1 : 1);
},
reverse: function() {
return new cc.FlipX(!this._flippedX);
},
clone: function() {
var t = new cc.FlipX();
t.initWithFlipX(this._flippedX);
return t;
}
});
cc.flipX = function(t) {
return new cc.FlipX(t);
};
cc.FlipY = cc.Class({
name: "cc.FlipY",
extends: cc.ActionInstant,
ctor: function(t) {
this._flippedY = !1;
void 0 !== t && this.initWithFlipY(t);
},
initWithFlipY: function(t) {
this._flippedY = t;
return !0;
},
update: function() {
this.target.scaleY = Math.abs(this.target.scaleY) * (this._flippedY ? -1 : 1);
},
reverse: function() {
return new cc.FlipY(!this._flippedY);
},
clone: function() {
var t = new cc.FlipY();
t.initWithFlipY(this._flippedY);
return t;
}
});
cc.flipY = function(t) {
return new cc.FlipY(t);
};
cc.Place = cc.Class({
name: "cc.Place",
extends: cc.ActionInstant,
ctor: function(t, e) {
this._x = 0;
this._y = 0;
if (void 0 !== t) {
if (void 0 !== t.x) {
e = t.y;
t = t.x;
}
this.initWithPosition(t, e);
}
},
initWithPosition: function(t, e) {
this._x = t;
this._y = e;
return !0;
},
update: function() {
this.target.setPosition(this._x, this._y);
},
clone: function() {
var t = new cc.Place();
t.initWithPosition(this._x, this._y);
return t;
}
});
cc.place = function(t, e) {
return new cc.Place(t, e);
};
cc.CallFunc = cc.Class({
name: "cc.CallFunc",
extends: cc.ActionInstant,
ctor: function(t, e, i) {
this._selectorTarget = null;
this._function = null;
this._data = null;
this.initWithFunction(t, e, i);
},
initWithFunction: function(t, e, i) {
t && (this._function = t);
e && (this._selectorTarget = e);
void 0 !== i && (this._data = i);
return !0;
},
execute: function() {
this._function && this._function.call(this._selectorTarget, this.target, this._data);
},
update: function() {
this.execute();
},
getTargetCallback: function() {
return this._selectorTarget;
},
setTargetCallback: function(t) {
if (t !== this._selectorTarget) {
this._selectorTarget && (this._selectorTarget = null);
this._selectorTarget = t;
}
},
clone: function() {
var t = new cc.CallFunc();
t.initWithFunction(this._function, this._selectorTarget, this._data);
return t;
}
});
cc.callFunc = function(t, e, i) {
return new cc.CallFunc(t, e, i);
};
}), {} ],
5: [ (function() {
"use strict";
cc.ActionInterval = cc.Class({
name: "cc.ActionInterval",
extends: cc.FiniteTimeAction,
ctor: function(t) {
this.MAX_VALUE = 2;
this._elapsed = 0;
this._firstTick = !1;
this._easeList = null;
this._speed = 1;
this._timesForRepeat = 1;
this._repeatForever = !1;
this._repeatMethod = !1;
this._speedMethod = !1;
void 0 !== t && cc.ActionInterval.prototype.initWithDuration.call(this, t);
},
getElapsed: function() {
return this._elapsed;
},
initWithDuration: function(t) {
this._duration = 0 === t ? cc.macro.FLT_EPSILON : t;
this._elapsed = 0;
this._firstTick = !0;
return !0;
},
isDone: function() {
return this._elapsed >= this._duration;
},
_cloneDecoration: function(t) {
t._repeatForever = this._repeatForever;
t._speed = this._speed;
t._timesForRepeat = this._timesForRepeat;
t._easeList = this._easeList;
t._speedMethod = this._speedMethod;
t._repeatMethod = this._repeatMethod;
},
_reverseEaseList: function(t) {
if (this._easeList) {
t._easeList = [];
for (var e = 0; e < this._easeList.length; e++) t._easeList.push(this._easeList[e].reverse());
}
},
clone: function() {
var t = new cc.ActionInterval(this._duration);
this._cloneDecoration(t);
return t;
},
easing: function() {
this._easeList ? this._easeList.length = 0 : this._easeList = [];
for (var t = 0; t < arguments.length; t++) this._easeList.push(arguments[t]);
return this;
},
_computeEaseTime: function(t) {
var e = this._easeList;
if (!e || 0 === e.length) return t;
for (var i = 0, n = e.length; i < n; i++) t = e[i].easing(t);
return t;
},
step: function(t) {
if (this._firstTick) {
this._firstTick = !1;
this._elapsed = 0;
} else this._elapsed += t;
var e = this._elapsed / (this._duration > 1.192092896e-7 ? this._duration : 1.192092896e-7);
e = 1 > e ? e : 1;
this.update(e > 0 ? e : 0);
if (this._repeatMethod && this._timesForRepeat > 1 && this.isDone()) {
this._repeatForever || this._timesForRepeat--;
this.startWithTarget(this.target);
this.step(this._elapsed - this._duration);
}
},
startWithTarget: function(t) {
cc.Action.prototype.startWithTarget.call(this, t);
this._elapsed = 0;
this._firstTick = !0;
},
reverse: function() {
cc.logID(1010);
return null;
},
setAmplitudeRate: function() {
cc.logID(1011);
},
getAmplitudeRate: function() {
cc.logID(1012);
return 0;
},
speed: function(t) {
if (t <= 0) {
cc.logID(1013);
return this;
}
this._speedMethod = !0;
this._speed *= t;
return this;
},
getSpeed: function() {
return this._speed;
},
setSpeed: function(t) {
this._speed = t;
return this;
},
repeat: function(t) {
t = Math.round(t);
if (isNaN(t) || t < 1) {
cc.logID(1014);
return this;
}
this._repeatMethod = !0;
this._timesForRepeat *= t;
return this;
},
repeatForever: function() {
this._repeatMethod = !0;
this._timesForRepeat = this.MAX_VALUE;
this._repeatForever = !0;
return this;
}
});
cc.actionInterval = function(t) {
return new cc.ActionInterval(t);
};
cc.Sequence = cc.Class({
name: "cc.Sequence",
extends: cc.ActionInterval,
ctor: function(t) {
this._actions = [];
this._split = null;
this._last = 0;
this._reversed = !1;
var e = t instanceof Array ? t : arguments;
if (1 !== e.length) {
var i = e.length - 1;
i >= 0 && null == e[i] && cc.logID(1015);
if (i >= 0) {
for (var n, r = e[0], s = 1; s < i; s++) if (e[s]) {
n = r;
r = cc.Sequence._actionOneTwo(n, e[s]);
}
this.initWithTwoActions(r, e[i]);
}
} else cc.errorID(1019);
},
initWithTwoActions: function(t, e) {
if (!t || !e) {
cc.errorID(1025);
return !1;
}
var i = t._duration, n = e._duration, r = (i *= t._repeatMethod ? t._timesForRepeat : 1) + (n *= e._repeatMethod ? e._timesForRepeat : 1);
this.initWithDuration(r);
this._actions[0] = t;
this._actions[1] = e;
return !0;
},
clone: function() {
var t = new cc.Sequence();
this._cloneDecoration(t);
t.initWithTwoActions(this._actions[0].clone(), this._actions[1].clone());
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._split = this._actions[0]._duration / this._duration;
this._split *= this._actions[0]._repeatMethod ? this._actions[0]._timesForRepeat : 1;
this._last = -1;
},
stop: function() {
-1 !== this._last && this._actions[this._last].stop();
cc.Action.prototype.stop.call(this);
},
update: function(t) {
var e, i, n = 0, r = this._split, s = this._actions, a = this._last;
if ((t = this._computeEaseTime(t)) < r) {
e = 0 !== r ? t / r : 1;
if (0 === n && 1 === a && this._reversed) {
s[1].update(0);
s[1].stop();
}
} else {
n = 1;
e = 1 === r ? 1 : (t - r) / (1 - r);
if (-1 === a) {
s[0].startWithTarget(this.target);
s[0].update(1);
s[0].stop();
}
if (0 === a) {
s[0].update(1);
s[0].stop();
}
}
i = s[n];
if (a !== n || !i.isDone()) {
a !== n && i.startWithTarget(this.target);
e *= i._timesForRepeat;
i.update(e > 1 ? e % 1 : e);
this._last = n;
}
},
reverse: function() {
var t = cc.Sequence._actionOneTwo(this._actions[1].reverse(), this._actions[0].reverse());
this._cloneDecoration(t);
this._reverseEaseList(t);
t._reversed = !0;
return t;
}
});
cc.sequence = function(t) {
var e = t instanceof Array ? t : arguments;
if (1 === e.length) {
cc.errorID(1019);
return null;
}
var i = e.length - 1;
i >= 0 && null == e[i] && cc.logID(1015);
var n = null;
if (i >= 0) {
n = e[0];
for (var r = 1; r <= i; r++) e[r] && (n = cc.Sequence._actionOneTwo(n, e[r]));
}
return n;
};
cc.Sequence._actionOneTwo = function(t, e) {
var i = new cc.Sequence();
i.initWithTwoActions(t, e);
return i;
};
cc.Repeat = cc.Class({
name: "cc.Repeat",
extends: cc.ActionInterval,
ctor: function(t, e) {
this._times = 0;
this._total = 0;
this._nextDt = 0;
this._actionInstant = !1;
this._innerAction = null;
void 0 !== e && this.initWithAction(t, e);
},
initWithAction: function(t, e) {
var i = t._duration * e;
if (this.initWithDuration(i)) {
this._times = e;
this._innerAction = t;
if (t instanceof cc.ActionInstant) {
this._actionInstant = !0;
this._times -= 1;
}
this._total = 0;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.Repeat();
this._cloneDecoration(t);
t.initWithAction(this._innerAction.clone(), this._times);
return t;
},
startWithTarget: function(t) {
this._total = 0;
this._nextDt = this._innerAction._duration / this._duration;
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._innerAction.startWithTarget(t);
},
stop: function() {
this._innerAction.stop();
cc.Action.prototype.stop.call(this);
},
update: function(t) {
t = this._computeEaseTime(t);
var e = this._innerAction, i = this._duration, n = this._times, r = this._nextDt;
if (t >= r) {
for (;t > r && this._total < n; ) {
e.update(1);
this._total++;
e.stop();
e.startWithTarget(this.target);
r += e._duration / i;
this._nextDt = r > 1 ? 1 : r;
}
if (t >= 1 && this._total < n) {
e.update(1);
this._total++;
}
this._actionInstant || (this._total === n ? e.stop() : e.update(t - (r - e._duration / i)));
} else e.update(t * n % 1);
},
isDone: function() {
return this._total === this._times;
},
reverse: function() {
var t = new cc.Repeat(this._innerAction.reverse(), this._times);
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
},
setInnerAction: function(t) {
this._innerAction !== t && (this._innerAction = t);
},
getInnerAction: function() {
return this._innerAction;
}
});
cc.repeat = function(t, e) {
return new cc.Repeat(t, e);
};
cc.RepeatForever = cc.Class({
name: "cc.RepeatForever",
extends: cc.ActionInterval,
ctor: function(t) {
this._innerAction = null;
t && this.initWithAction(t);
},
initWithAction: function(t) {
if (!t) {
cc.errorID(1026);
return !1;
}
this._innerAction = t;
return !0;
},
clone: function() {
var t = new cc.RepeatForever();
this._cloneDecoration(t);
t.initWithAction(this._innerAction.clone());
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._innerAction.startWithTarget(t);
},
step: function(t) {
var e = this._innerAction;
e.step(t);
if (e.isDone()) {
e.startWithTarget(this.target);
e.step(e.getElapsed() - e._duration);
}
},
isDone: function() {
return !1;
},
reverse: function() {
var t = new cc.RepeatForever(this._innerAction.reverse());
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
},
setInnerAction: function(t) {
this._innerAction !== t && (this._innerAction = t);
},
getInnerAction: function() {
return this._innerAction;
}
});
cc.repeatForever = function(t) {
return new cc.RepeatForever(t);
};
cc.Spawn = cc.Class({
name: "cc.Spawn",
extends: cc.ActionInterval,
ctor: function(t) {
this._one = null;
this._two = null;
var e = t instanceof Array ? t : arguments;
if (1 !== e.length) {
var i = e.length - 1;
i >= 0 && null == e[i] && cc.logID(1015);
if (i >= 0) {
for (var n, r = e[0], s = 1; s < i; s++) if (e[s]) {
n = r;
r = cc.Spawn._actionOneTwo(n, e[s]);
}
this.initWithTwoActions(r, e[i]);
}
} else cc.errorID(1020);
},
initWithTwoActions: function(t, e) {
if (!t || !e) {
cc.errorID(1027);
return !1;
}
var i = !1, n = t._duration, r = e._duration;
if (this.initWithDuration(Math.max(n, r))) {
this._one = t;
this._two = e;
n > r ? this._two = cc.Sequence._actionOneTwo(e, cc.delayTime(n - r)) : n < r && (this._one = cc.Sequence._actionOneTwo(t, cc.delayTime(r - n)));
i = !0;
}
return i;
},
clone: function() {
var t = new cc.Spawn();
this._cloneDecoration(t);
t.initWithTwoActions(this._one.clone(), this._two.clone());
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._one.startWithTarget(t);
this._two.startWithTarget(t);
},
stop: function() {
this._one.stop();
this._two.stop();
cc.Action.prototype.stop.call(this);
},
update: function(t) {
t = this._computeEaseTime(t);
this._one && this._one.update(t);
this._two && this._two.update(t);
},
reverse: function() {
var t = cc.Spawn._actionOneTwo(this._one.reverse(), this._two.reverse());
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
}
});
cc.spawn = function(t) {
var e = t instanceof Array ? t : arguments;
if (1 === e.length) {
cc.errorID(1020);
return null;
}
e.length > 0 && null == e[e.length - 1] && cc.logID(1015);
for (var i = e[0], n = 1; n < e.length; n++) null != e[n] && (i = cc.Spawn._actionOneTwo(i, e[n]));
return i;
};
cc.Spawn._actionOneTwo = function(t, e) {
var i = new cc.Spawn();
i.initWithTwoActions(t, e);
return i;
};
cc.RotateTo = cc.Class({
name: "cc.RotateTo",
extends: cc.ActionInterval,
statics: {
_reverse: !1
},
ctor: function(t, e) {
this._startAngle = 0;
this._dstAngle = 0;
this._angle = 0;
void 0 !== e && this.initWithDuration(t, e);
},
initWithDuration: function(t, e) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._dstAngle = e;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.RotateTo();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._dstAngle);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
var e = t.angle % 360, i = cc.RotateTo._reverse ? this._dstAngle - e : this._dstAngle + e;
i > 180 && (i -= 360);
i < -180 && (i += 360);
this._startAngle = e;
this._angle = cc.RotateTo._reverse ? i : -i;
},
reverse: function() {
cc.logID(1016);
},
update: function(t) {
t = this._computeEaseTime(t);
this.target && (this.target.angle = this._startAngle + this._angle * t);
}
});
cc.rotateTo = function(t, e) {
return new cc.RotateTo(t, e);
};
cc.RotateBy = cc.Class({
name: "cc.RotateBy",
extends: cc.ActionInterval,
statics: {
_reverse: !1
},
ctor: function(t, e) {
e *= cc.RotateBy._reverse ? 1 : -1;
this._deltaAngle = 0;
this._startAngle = 0;
void 0 !== e && this.initWithDuration(t, e);
},
initWithDuration: function(t, e) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._deltaAngle = e;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.RotateBy();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._deltaAngle);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._startAngle = t.angle;
},
update: function(t) {
t = this._computeEaseTime(t);
this.target && (this.target.angle = this._startAngle + this._deltaAngle * t);
},
reverse: function() {
var t = new cc.RotateBy();
t.initWithDuration(this._duration, -this._deltaAngle);
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
}
});
cc.rotateBy = function(t, e) {
return new cc.RotateBy(t, e);
};
cc.MoveBy = cc.Class({
name: "cc.MoveBy",
extends: cc.ActionInterval,
ctor: function(t, e, i) {
this._positionDelta = cc.v2(0, 0);
this._startPosition = cc.v2(0, 0);
this._previousPosition = cc.v2(0, 0);
void 0 !== e && cc.MoveBy.prototype.initWithDuration.call(this, t, e, i);
},
initWithDuration: function(t, e, i) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
if (void 0 !== e.x) {
i = e.y;
e = e.x;
}
this._positionDelta.x = e;
this._positionDelta.y = i;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.MoveBy();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._positionDelta);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
var e = t.x, i = t.y;
this._previousPosition.x = e;
this._previousPosition.y = i;
this._startPosition.x = e;
this._startPosition.y = i;
},
update: function(t) {
t = this._computeEaseTime(t);
if (this.target) {
var e = this._positionDelta.x * t, i = this._positionDelta.y * t, n = this._startPosition;
if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
var r = this.target.x, s = this.target.y, a = this._previousPosition;
n.x = n.x + r - a.x;
n.y = n.y + s - a.y;
e += n.x;
i += n.y;
a.x = e;
a.y = i;
this.target.setPosition(e, i);
} else this.target.setPosition(n.x + e, n.y + i);
}
},
reverse: function() {
var t = new cc.MoveBy(this._duration, cc.v2(-this._positionDelta.x, -this._positionDelta.y));
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
}
});
cc.moveBy = function(t, e, i) {
return new cc.MoveBy(t, e, i);
};
cc.MoveTo = cc.Class({
name: "cc.MoveTo",
extends: cc.MoveBy,
ctor: function(t, e, i) {
this._endPosition = cc.v2(0, 0);
void 0 !== e && this.initWithDuration(t, e, i);
},
initWithDuration: function(t, e, i) {
if (cc.MoveBy.prototype.initWithDuration.call(this, t, e, i)) {
if (void 0 !== e.x) {
i = e.y;
e = e.x;
}
this._endPosition.x = e;
this._endPosition.y = i;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.MoveTo();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._endPosition);
return t;
},
startWithTarget: function(t) {
cc.MoveBy.prototype.startWithTarget.call(this, t);
this._positionDelta.x = this._endPosition.x - t.x;
this._positionDelta.y = this._endPosition.y - t.y;
}
});
cc.moveTo = function(t, e, i) {
return new cc.MoveTo(t, e, i);
};
cc.SkewTo = cc.Class({
name: "cc.SkewTo",
extends: cc.ActionInterval,
ctor: function(t, e, i) {
this._skewX = 0;
this._skewY = 0;
this._startSkewX = 0;
this._startSkewY = 0;
this._endSkewX = 0;
this._endSkewY = 0;
this._deltaX = 0;
this._deltaY = 0;
void 0 !== i && cc.SkewTo.prototype.initWithDuration.call(this, t, e, i);
},
initWithDuration: function(t, e, i) {
var n = !1;
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._endSkewX = e;
this._endSkewY = i;
n = !0;
}
return n;
},
clone: function() {
var t = new cc.SkewTo();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._endSkewX, this._endSkewY);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._startSkewX = t.skewX % 180;
this._deltaX = this._endSkewX - this._startSkewX;
this._deltaX > 180 && (this._deltaX -= 360);
this._deltaX < -180 && (this._deltaX += 360);
this._startSkewY = t.skewY % 360;
this._deltaY = this._endSkewY - this._startSkewY;
this._deltaY > 180 && (this._deltaY -= 360);
this._deltaY < -180 && (this._deltaY += 360);
},
update: function(t) {
t = this._computeEaseTime(t);
this.target.skewX = this._startSkewX + this._deltaX * t;
this.target.skewY = this._startSkewY + this._deltaY * t;
}
});
cc.skewTo = function(t, e, i) {
return new cc.SkewTo(t, e, i);
};
cc.SkewBy = cc.Class({
name: "cc.SkewBy",
extends: cc.SkewTo,
ctor: function(t, e, i) {
void 0 !== i && this.initWithDuration(t, e, i);
},
initWithDuration: function(t, e, i) {
var n = !1;
if (cc.SkewTo.prototype.initWithDuration.call(this, t, e, i)) {
this._skewX = e;
this._skewY = i;
n = !0;
}
return n;
},
clone: function() {
var t = new cc.SkewBy();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._skewX, this._skewY);
return t;
},
startWithTarget: function(t) {
cc.SkewTo.prototype.startWithTarget.call(this, t);
this._deltaX = this._skewX;
this._deltaY = this._skewY;
this._endSkewX = this._startSkewX + this._deltaX;
this._endSkewY = this._startSkewY + this._deltaY;
},
reverse: function() {
var t = new cc.SkewBy(this._duration, -this._skewX, -this._skewY);
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
}
});
cc.skewBy = function(t, e, i) {
return new cc.SkewBy(t, e, i);
};
cc.JumpBy = cc.Class({
name: "cc.JumpBy",
extends: cc.ActionInterval,
ctor: function(t, e, i, n, r) {
this._startPosition = cc.v2(0, 0);
this._previousPosition = cc.v2(0, 0);
this._delta = cc.v2(0, 0);
this._height = 0;
this._jumps = 0;
void 0 !== n && cc.JumpBy.prototype.initWithDuration.call(this, t, e, i, n, r);
},
initWithDuration: function(t, e, i, n, r) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
if (void 0 === r) {
r = n;
n = i;
i = e.y;
e = e.x;
}
this._delta.x = e;
this._delta.y = i;
this._height = n;
this._jumps = r;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.JumpBy();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._delta, this._height, this._jumps);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
var e = t.x, i = t.y;
this._previousPosition.x = e;
this._previousPosition.y = i;
this._startPosition.x = e;
this._startPosition.y = i;
},
update: function(t) {
t = this._computeEaseTime(t);
if (this.target) {
var e = t * this._jumps % 1, i = 4 * this._height * e * (1 - e);
i += this._delta.y * t;
var n = this._delta.x * t, r = this._startPosition;
if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
var s = this.target.x, a = this.target.y, o = this._previousPosition;
r.x = r.x + s - o.x;
r.y = r.y + a - o.y;
n += r.x;
i += r.y;
o.x = n;
o.y = i;
this.target.setPosition(n, i);
} else this.target.setPosition(r.x + n, r.y + i);
}
},
reverse: function() {
var t = new cc.JumpBy(this._duration, cc.v2(-this._delta.x, -this._delta.y), this._height, this._jumps);
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
}
});
cc.jumpBy = function(t, e, i, n, r) {
return new cc.JumpBy(t, e, i, n, r);
};
cc.JumpTo = cc.Class({
name: "cc.JumpTo",
extends: cc.JumpBy,
ctor: function(t, e, i, n, r) {
this._endPosition = cc.v2(0, 0);
void 0 !== n && this.initWithDuration(t, e, i, n, r);
},
initWithDuration: function(t, e, i, n, r) {
if (cc.JumpBy.prototype.initWithDuration.call(this, t, e, i, n, r)) {
if (void 0 === r) {
i = e.y;
e = e.x;
}
this._endPosition.x = e;
this._endPosition.y = i;
return !0;
}
return !1;
},
startWithTarget: function(t) {
cc.JumpBy.prototype.startWithTarget.call(this, t);
this._delta.x = this._endPosition.x - this._startPosition.x;
this._delta.y = this._endPosition.y - this._startPosition.y;
},
clone: function() {
var t = new cc.JumpTo();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._endPosition, this._height, this._jumps);
return t;
}
});
cc.jumpTo = function(t, e, i, n, r) {
return new cc.JumpTo(t, e, i, n, r);
};
function t(t, e, i, n, r) {
return Math.pow(1 - r, 3) * t + 3 * r * Math.pow(1 - r, 2) * e + 3 * Math.pow(r, 2) * (1 - r) * i + Math.pow(r, 3) * n;
}
cc.BezierBy = cc.Class({
name: "cc.BezierBy",
extends: cc.ActionInterval,
ctor: function(t, e) {
this._config = [];
this._startPosition = cc.v2(0, 0);
this._previousPosition = cc.v2(0, 0);
e && cc.BezierBy.prototype.initWithDuration.call(this, t, e);
},
initWithDuration: function(t, e) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._config = e;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.BezierBy();
this._cloneDecoration(t);
for (var e = [], i = 0; i < this._config.length; i++) {
var n = this._config[i];
e.push(cc.v2(n.x, n.y));
}
t.initWithDuration(this._duration, e);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
var e = t.x, i = t.y;
this._previousPosition.x = e;
this._previousPosition.y = i;
this._startPosition.x = e;
this._startPosition.y = i;
},
update: function(e) {
e = this._computeEaseTime(e);
if (this.target) {
var i = this._config, n = i[0].x, r = i[1].x, s = i[2].x, a = i[0].y, o = i[1].y, c = i[2].y, u = t(0, n, r, s, e), l = t(0, a, o, c, e), h = this._startPosition;
if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
var f = this.target.x, _ = this.target.y, d = this._previousPosition;
h.x = h.x + f - d.x;
h.y = h.y + _ - d.y;
u += h.x;
l += h.y;
d.x = u;
d.y = l;
this.target.setPosition(u, l);
} else this.target.setPosition(h.x + u, h.y + l);
}
},
reverse: function() {
var t = this._config, e = t[0].x, i = t[0].y, n = t[1].x, r = t[1].y, s = t[2].x, a = t[2].y, o = [ cc.v2(n - s, r - a), cc.v2(e - s, i - a), cc.v2(-s, -a) ], c = new cc.BezierBy(this._duration, o);
this._cloneDecoration(c);
this._reverseEaseList(c);
return c;
}
});
cc.bezierBy = function(t, e) {
return new cc.BezierBy(t, e);
};
cc.BezierTo = cc.Class({
name: "cc.BezierTo",
extends: cc.BezierBy,
ctor: function(t, e) {
this._toConfig = [];
e && this.initWithDuration(t, e);
},
initWithDuration: function(t, e) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._toConfig = e;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.BezierTo();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._toConfig);
return t;
},
startWithTarget: function(t) {
cc.BezierBy.prototype.startWithTarget.call(this, t);
var e = this._startPosition, i = this._toConfig, n = this._config;
n[0] = i[0].sub(e);
n[1] = i[1].sub(e);
n[2] = i[2].sub(e);
}
});
cc.bezierTo = function(t, e) {
return new cc.BezierTo(t, e);
};
cc.ScaleTo = cc.Class({
name: "cc.ScaleTo",
extends: cc.ActionInterval,
ctor: function(t, e, i) {
this._scaleX = 1;
this._scaleY = 1;
this._startScaleX = 1;
this._startScaleY = 1;
this._endScaleX = 0;
this._endScaleY = 0;
this._deltaX = 0;
this._deltaY = 0;
void 0 !== e && cc.ScaleTo.prototype.initWithDuration.call(this, t, e, i);
},
initWithDuration: function(t, e, i) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._endScaleX = e;
this._endScaleY = null != i ? i : e;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.ScaleTo();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._endScaleX, this._endScaleY);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._startScaleX = t.scaleX;
this._startScaleY = t.scaleY;
this._deltaX = this._endScaleX - this._startScaleX;
this._deltaY = this._endScaleY - this._startScaleY;
},
update: function(t) {
t = this._computeEaseTime(t);
if (this.target) {
this.target.scaleX = this._startScaleX + this._deltaX * t;
this.target.scaleY = this._startScaleY + this._deltaY * t;
}
}
});
cc.scaleTo = function(t, e, i) {
return new cc.ScaleTo(t, e, i);
};
cc.ScaleBy = cc.Class({
name: "cc.ScaleBy",
extends: cc.ScaleTo,
startWithTarget: function(t) {
cc.ScaleTo.prototype.startWithTarget.call(this, t);
this._deltaX = this._startScaleX * this._endScaleX - this._startScaleX;
this._deltaY = this._startScaleY * this._endScaleY - this._startScaleY;
},
reverse: function() {
var t = new cc.ScaleBy(this._duration, 1 / this._endScaleX, 1 / this._endScaleY);
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
},
clone: function() {
var t = new cc.ScaleBy();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._endScaleX, this._endScaleY);
return t;
}
});
cc.scaleBy = function(t, e, i) {
return new cc.ScaleBy(t, e, i);
};
cc.Blink = cc.Class({
name: "cc.Blink",
extends: cc.ActionInterval,
ctor: function(t, e) {
this._times = 0;
this._originalState = !1;
void 0 !== e && this.initWithDuration(t, e);
},
initWithDuration: function(t, e) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._times = e;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.Blink();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._times);
return t;
},
update: function(t) {
t = this._computeEaseTime(t);
if (this.target && !this.isDone()) {
var e = 1 / this._times, i = t % e;
this.target.opacity = i > e / 2 ? 255 : 0;
}
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._originalState = t.opacity;
},
stop: function() {
this.target.opacity = this._originalState;
cc.ActionInterval.prototype.stop.call(this);
},
reverse: function() {
var t = new cc.Blink(this._duration, this._times);
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
}
});
cc.blink = function(t, e) {
return new cc.Blink(t, e);
};
cc.FadeTo = cc.Class({
name: "cc.FadeTo",
extends: cc.ActionInterval,
ctor: function(t, e) {
this._toOpacity = 0;
this._fromOpacity = 0;
void 0 !== e && cc.FadeTo.prototype.initWithDuration.call(this, t, e);
},
initWithDuration: function(t, e) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._toOpacity = e;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.FadeTo();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._toOpacity);
return t;
},
update: function(t) {
t = this._computeEaseTime(t);
var e = void 0 !== this._fromOpacity ? this._fromOpacity : 255;
this.target.opacity = e + (this._toOpacity - e) * t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._fromOpacity = t.opacity;
}
});
cc.fadeTo = function(t, e) {
return new cc.FadeTo(t, e);
};
cc.FadeIn = cc.Class({
name: "cc.FadeIn",
extends: cc.FadeTo,
ctor: function(t) {
null == t && (t = 0);
this._reverseAction = null;
this.initWithDuration(t, 255);
},
reverse: function() {
var t = new cc.FadeOut();
t.initWithDuration(this._duration, 0);
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
},
clone: function() {
var t = new cc.FadeIn();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._toOpacity);
return t;
},
startWithTarget: function(t) {
this._reverseAction && (this._toOpacity = this._reverseAction._fromOpacity);
cc.FadeTo.prototype.startWithTarget.call(this, t);
}
});
cc.fadeIn = function(t) {
return new cc.FadeIn(t);
};
cc.FadeOut = cc.Class({
name: "cc.FadeOut",
extends: cc.FadeTo,
ctor: function(t) {
null == t && (t = 0);
this._reverseAction = null;
this.initWithDuration(t, 0);
},
reverse: function() {
var t = new cc.FadeIn();
t._reverseAction = this;
t.initWithDuration(this._duration, 255);
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
},
clone: function() {
var t = new cc.FadeOut();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._toOpacity);
return t;
}
});
cc.fadeOut = function(t) {
return new cc.FadeOut(t);
};
cc.TintTo = cc.Class({
name: "cc.TintTo",
extends: cc.ActionInterval,
ctor: function(t, e, i, n) {
this._to = cc.color(0, 0, 0);
this._from = cc.color(0, 0, 0);
if (e instanceof cc.Color) {
n = e.b;
i = e.g;
e = e.r;
}
void 0 !== n && this.initWithDuration(t, e, i, n);
},
initWithDuration: function(t, e, i, n) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._to = cc.color(e, i, n);
return !0;
}
return !1;
},
clone: function() {
var t = new cc.TintTo();
this._cloneDecoration(t);
var e = this._to;
t.initWithDuration(this._duration, e.r, e.g, e.b);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._from = this.target.color;
},
update: function(t) {
t = this._computeEaseTime(t);
var e = this._from, i = this._to;
e && (this.target.color = cc.color(e.r + (i.r - e.r) * t, e.g + (i.g - e.g) * t, e.b + (i.b - e.b) * t));
}
});
cc.tintTo = function(t, e, i, n) {
return new cc.TintTo(t, e, i, n);
};
cc.TintBy = cc.Class({
name: "cc.TintBy",
extends: cc.ActionInterval,
ctor: function(t, e, i, n) {
this._deltaR = 0;
this._deltaG = 0;
this._deltaB = 0;
this._fromR = 0;
this._fromG = 0;
this._fromB = 0;
void 0 !== n && this.initWithDuration(t, e, i, n);
},
initWithDuration: function(t, e, i, n) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._deltaR = e;
this._deltaG = i;
this._deltaB = n;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.TintBy();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._deltaR, this._deltaG, this._deltaB);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
var e = t.color;
this._fromR = e.r;
this._fromG = e.g;
this._fromB = e.b;
},
update: function(t) {
t = this._computeEaseTime(t);
this.target.color = cc.color(this._fromR + this._deltaR * t, this._fromG + this._deltaG * t, this._fromB + this._deltaB * t);
},
reverse: function() {
var t = new cc.TintBy(this._duration, -this._deltaR, -this._deltaG, -this._deltaB);
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
}
});
cc.tintBy = function(t, e, i, n) {
return new cc.TintBy(t, e, i, n);
};
cc.DelayTime = cc.Class({
name: "cc.DelayTime",
extends: cc.ActionInterval,
update: function() {},
reverse: function() {
var t = new cc.DelayTime(this._duration);
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
},
clone: function() {
var t = new cc.DelayTime();
this._cloneDecoration(t);
t.initWithDuration(this._duration);
return t;
}
});
cc.delayTime = function(t) {
return new cc.DelayTime(t);
};
cc.ReverseTime = cc.Class({
name: "cc.ReverseTime",
extends: cc.ActionInterval,
ctor: function(t) {
this._other = null;
t && this.initWithAction(t);
},
initWithAction: function(t) {
if (!t) {
cc.errorID(1028);
return !1;
}
if (t === this._other) {
cc.errorID(1029);
return !1;
}
if (cc.ActionInterval.prototype.initWithDuration.call(this, t._duration)) {
this._other = t;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.ReverseTime();
this._cloneDecoration(t);
t.initWithAction(this._other.clone());
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._other.startWithTarget(t);
},
update: function(t) {
t = this._computeEaseTime(t);
this._other && this._other.update(1 - t);
},
reverse: function() {
return this._other.clone();
},
stop: function() {
this._other.stop();
cc.Action.prototype.stop.call(this);
}
});
cc.reverseTime = function(t) {
return new cc.ReverseTime(t);
};
cc.TargetedAction = cc.Class({
name: "cc.TargetedAction",
extends: cc.ActionInterval,
ctor: function(t, e) {
this._action = null;
this._forcedTarget = null;
e && this.initWithTarget(t, e);
},
initWithTarget: function(t, e) {
if (this.initWithDuration(e._duration)) {
this._forcedTarget = t;
this._action = e;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.TargetedAction();
this._cloneDecoration(t);
t.initWithTarget(this._forcedTarget, this._action.clone());
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._action.startWithTarget(this._forcedTarget);
},
stop: function() {
this._action.stop();
},
update: function(t) {
t = this._computeEaseTime(t);
this._action.update(t);
},
getForcedTarget: function() {
return this._forcedTarget;
},
setForcedTarget: function(t) {
this._forcedTarget !== t && (this._forcedTarget = t);
}
});
cc.targetedAction = function(t, e) {
return new cc.TargetedAction(t, e);
};
}), {} ],
6: [ (function(t) {
"use strict";
t("../core/platform/CCClass");
var e = t("../core/platform/js"), i = function() {
this.actions = [];
this.target = null;
this.actionIndex = 0;
this.currentAction = null;
this.paused = !1;
this.lock = !1;
};
cc.ActionManager = function() {
this._hashTargets = e.createMap(!0);
this._arrayTargets = [];
this._currentTarget = null;
cc.director._scheduler && cc.director._scheduler.enableForTarget(this);
};
cc.ActionManager.prototype = {
constructor: cc.ActionManager,
_elementPool: [],
_searchElementByTarget: function(t, e) {
for (var i = 0; i < t.length; i++) if (e === t[i].target) return t[i];
return null;
},
_getElement: function(t, e) {
var n = this._elementPool.pop();
n || (n = new i());
n.target = t;
n.paused = !!e;
return n;
},
_putElement: function(t) {
t.actions.length = 0;
t.actionIndex = 0;
t.currentAction = null;
t.paused = !1;
t.target = null;
t.lock = !1;
this._elementPool.push(t);
},
addAction: function(t, e, i) {
if (t && e) {
var n = this._hashTargets[e._id];
if (n) n.actions || (n.actions = []); else {
n = this._getElement(e, i);
this._hashTargets[e._id] = n;
this._arrayTargets.push(n);
}
n.actions.push(t);
t.startWithTarget(e);
} else cc.errorID(1e3);
},
removeAllActions: function() {
for (var t = this._arrayTargets, i = 0; i < t.length; i++) {
var n = t[i];
n && this._putElement(n);
}
this._arrayTargets.length = 0;
this._hashTargets = e.createMap(!0);
},
removeAllActionsFromTarget: function(t) {
if (null != t) {
var e = this._hashTargets[t._id];
if (e) {
e.actions.length = 0;
this._deleteHashElement(e);
}
}
},
removeAction: function(t) {
if (t) {
var e = t.getOriginalTarget(), i = this._hashTargets[e._id];
if (i) for (var n = 0; n < i.actions.length; n++) if (i.actions[n] === t) {
i.actions.splice(n, 1);
i.actionIndex >= n && i.actionIndex--;
break;
}
}
},
_removeActionByTag: function(t, e, i) {
for (var n = 0, r = e.actions.length; n < r; ++n) {
var s = e.actions[n];
if (s && s.getTag() === t) {
if (i && s.getOriginalTarget() !== i) continue;
this._removeActionAtIndex(n, e);
break;
}
}
},
removeActionByTag: function(t, e) {
t === cc.Action.TAG_INVALID && cc.logID(1002);
var i = this._hashTargets;
if (e) {
var n = i[e._id];
n && this._removeActionByTag(t, n, e);
} else for (var r in i) {
var s = i[r];
this._removeActionByTag(t, s);
}
},
getActionByTag: function(t, e) {
t === cc.Action.TAG_INVALID && cc.logID(1004);
var i = this._hashTargets[e._id];
if (i) {
if (null != i.actions) for (var n = 0; n < i.actions.length; ++n) {
var r = i.actions[n];
if (r && r.getTag() === t) return r;
}
cc.logID(1005, t);
}
return null;
},
getNumberOfRunningActionsInTarget: function(t) {
var e = this._hashTargets[t._id];
return e && e.actions ? e.actions.length : 0;
},
pauseTarget: function(t) {
var e = this._hashTargets[t._id];
e && (e.paused = !0);
},
resumeTarget: function(t) {
var e = this._hashTargets[t._id];
e && (e.paused = !1);
},
pauseAllRunningActions: function() {
for (var t = [], e = this._arrayTargets, i = 0; i < e.length; i++) {
var n = e[i];
if (n && !n.paused) {
n.paused = !0;
t.push(n.target);
}
}
return t;
},
resumeTargets: function(t) {
if (t) for (var e = 0; e < t.length; e++) t[e] && this.resumeTarget(t[e]);
},
pauseTargets: function(t) {
if (t) for (var e = 0; e < t.length; e++) t[e] && this.pauseTarget(t[e]);
},
purgeSharedManager: function() {
cc.director.getScheduler().unscheduleUpdate(this);
},
_removeActionAtIndex: function(t, e) {
e.actions[t];
e.actions.splice(t, 1);
e.actionIndex >= t && e.actionIndex--;
0 === e.actions.length && this._deleteHashElement(e);
},
_deleteHashElement: function(t) {
var e = !1;
if (t && !t.lock && this._hashTargets[t.target._id]) {
delete this._hashTargets[t.target._id];
for (var i = this._arrayTargets, n = 0, r = i.length; n < r; n++) if (i[n] === t) {
i.splice(n, 1);
break;
}
this._putElement(t);
e = !0;
}
return e;
},
update: function(t) {
for (var e, i = this._arrayTargets, n = 0; n < i.length; n++) {
this._currentTarget = i[n];
if (!(e = this._currentTarget).paused && e.actions) {
e.lock = !0;
for (e.actionIndex = 0; e.actionIndex < e.actions.length; e.actionIndex++) {
e.currentAction = e.actions[e.actionIndex];
if (e.currentAction) {
e.currentAction.step(t * (e.currentAction._speedMethod ? e.currentAction._speed : 1));
if (e.currentAction && e.currentAction.isDone()) {
e.currentAction.stop();
var r = e.currentAction;
e.currentAction = null;
this.removeAction(r);
}
e.currentAction = null;
}
}
e.lock = !1;
}
0 === e.actions.length && this._deleteHashElement(e) && n--;
}
}
};
}), {
"../core/platform/CCClass": 128,
"../core/platform/js": 149
} ],
7: [ (function(t) {
"use strict";
t("./CCActionManager");
t("./CCAction");
t("./CCActionInterval");
t("./CCActionInstant");
t("./CCActionEase");
t("./CCActionCatmullRom");
t("./tween");
}), {
"./CCAction": 1,
"./CCActionCatmullRom": 2,
"./CCActionEase": 3,
"./CCActionInstant": 4,
"./CCActionInterval": 5,
"./CCActionManager": 6,
"./tween": 8
} ],
8: [ (function(t) {
"use strict";
var e = t("../animation/bezier"), i = 0, n = cc.Class({
name: "cc.TweenAction",
extends: cc.ActionInterval,
ctor: function(t, e, i) {
this._opts = i = i || Object.create(null);
this._props = Object.create(null);
i.progress = i.progress || this.progress;
if (i.easing && "string" == typeof i.easing) {
var n = i.easing;
i.easing = cc.easing[n];
!i.easing && cc.warnID(1031, n);
}
var r = this._opts.relative;
for (var s in e) {
var a = e[s], o = void 0, c = void 0;
if (void 0 !== a.value && (a.easing || a.progress)) {
"string" == typeof a.easing ? !(o = cc.easing[a.easing]) && cc.warnID(1031, a.easing) : o = a.easing;
c = a.progress;
a = a.value;
}
if ("number" == typeof a || a.lerp && (!r || a.add || a.mul) && a.clone) {
var u = Object.create(null);
u.value = a;
u.easing = o;
u.progress = c;
this._props[s] = u;
} else cc.warn("Can not animate " + s + " property, because it do not have [lerp, (add|mul), clone] function.");
}
this._originProps = e;
this.initWithDuration(t);
},
clone: function() {
var t = new n(this._duration, this._originProps, this._opts);
this._cloneDecoration(t);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
var e = !!this._opts.relative, i = this._props;
for (var n in i) {
var r = t[n], s = i[n];
if ("number" == typeof r) {
s.start = r;
s.current = r;
s.end = e ? r + s.value : s.value;
} else {
s.start = r.clone();
s.current = r.clone();
s.end = e ? (r.add || r.mul).call(r, s.value) : s.value;
}
}
},
update: function(t) {
var e = this._opts, i = t;
e.easing && (i = e.easing(t));
var n = this.target;
if (n) {
var r = this._props, s = this._opts.progress;
for (var a in r) {
var o = r[a], c = o.easing ? o.easing(t) : i, u = o.current = (o.progress || s)(o.start, o.end, o.current, c);
n[a] = u;
}
}
},
progress: function(t, e, i, n) {
"number" == typeof t ? i = t + (e - t) * n : t.lerp(e, n, i);
return i;
}
}), r = cc.Class({
name: "cc.SetAction",
extends: cc.ActionInstant,
ctor: function(t) {
this._props = {};
void 0 !== t && this.init(t);
},
init: function(t) {
for (var e in t) this._props[e] = t[e];
return !0;
},
update: function() {
var t = this._props, e = this.target;
for (var i in t) e[i] = t[i];
},
clone: function() {
var t = new r();
t.init(this._props);
return t;
}
});
function s(t) {
this._actions = [];
this._finalAction = null;
this._target = t;
this._tag = cc.Action.TAG_INVALID;
}
s.stopAll = function() {
cc.director.getActionManager().removeAllActions();
};
s.stopAllByTag = function(t) {
cc.director.getActionManager().removeActionByTag(t);
};
s.stopAllByTarget = function(t) {
cc.director.getActionManager().removeAllActionsFromTarget(t);
};
s.prototype.then = function(t) {
t instanceof cc.Action ? this._actions.push(t.clone()) : this._actions.push(t._union());
return this;
};
s.prototype.target = function(t) {
this._target = t;
return this;
};
s.prototype.start = function() {
var t = this._target;
if (!t) {
cc.warn("Please set target to tween first");
return this;
}
if (!(t instanceof cc.Object) || t.isValid) {
this._finalAction && cc.director.getActionManager().removeAction(this._finalAction);
this._finalAction = this._union();
void 0 === t._id && (t._id = ++i);
this._finalAction.setTag(this._tag);
cc.director.getActionManager().addAction(this._finalAction, t, !1);
return this;
}
};
s.prototype.stop = function() {
this._finalAction && cc.director.getActionManager().removeAction(this._finalAction);
return this;
};
s.prototype.tag = function(t) {
this._tag = t;
return this;
};
s.prototype.clone = function(t) {
var e = this._union();
return cc.tween(t).then(e.clone());
};
s.prototype.union = function() {
var t = this._union();
this._actions.length = 0;
this._actions.push(t);
return this;
};
s.prototype._union = function() {
var t = this._actions;
return 1 === t.length ? t[0] : cc.sequence(t);
};
Object.assign(s.prototype, {
bezierTo: function(t, i, n, r, s) {
var a = i.x, o = i.y, c = n.x, u = n.y;
(s = s || Object.create(null)).progress = function(t, i, n, r) {
n.x = (0, e.bezier)(t.x, a, c, i.x, r);
n.y = (0, e.bezier)(t.y, o, u, i.y, r);
return n;
};
return this.to(t, {
position: r
}, s);
},
bezierBy: function(t, i, n, r, s) {
var a = i.x, o = i.y, c = n.x, u = n.y;
(s = s || Object.create(null)).progress = function(t, i, n, r) {
var s = t.x, l = t.y;
n.x = (0, e.bezier)(s, a + s, c + s, i.x, r);
n.y = (0, e.bezier)(l, o + l, u + l, i.y, r);
return n;
};
return this.by(t, {
position: r
}, s);
},
flipX: function() {
var t = this;
return this.call((function() {
t._target.scaleX *= -1;
}), this);
},
flipY: function() {
var t = this;
return this.call((function() {
t._target.scaleY *= -1;
}), this);
},
blink: function(t, e, i) {
var n = 1 / e;
(i = i || Object.create(null)).progress = function(t, e, i, r) {
return r >= 1 ? t : r % n > n / 2 ? 255 : 0;
};
return this.to(t, {
opacity: 1
}, i);
}
});
var a = [];
function o(t) {
return function() {
a.length = 0;
for (var e = arguments.length, i = 0; i < e; i++) {
var n = a[i] = arguments[i];
n instanceof s && (a[i] = n._union());
}
return t.apply(this, a);
};
}
for (var c = {
to: function(t, e, i) {
(i = i || Object.create(null)).relative = !1;
return new n(t, e, i);
},
by: function(t, e, i) {
(i = i || Object.create(null)).relative = !0;
return new n(t, e, i);
},
set: function(t) {
return new r(t);
},
delay: cc.delayTime,
call: cc.callFunc,
hide: cc.hide,
show: cc.show,
removeSelf: cc.removeSelf,
sequence: o(cc.sequence),
parallel: o(cc.spawn)
}, u = {
repeat: cc.repeat,
repeatForever: function(t) {
return cc.repeat(t, 1e9);
},
reverseTime: cc.reverseTime
}, l = Object.keys(c), h = function(t) {
var e = l[t];
s.prototype[e] = function() {
var t = c[e].apply(this, arguments);
this._actions.push(t);
return this;
};
}, f = 0; f < l.length; f++) h(f);
l = Object.keys(u);
for (var _ = function(t) {
var e = l[t];
s.prototype[e] = function() {
var t = this._actions, i = arguments[arguments.length - 1], n = arguments.length - 1;
if (i instanceof cc.Tween) i = i._union(); else if (!(i instanceof cc.Action)) {
i = t[t.length - 1];
t.length -= 1;
n += 1;
}
for (var r = [ i ], s = 0; s < n; s++) r.push(arguments[s]);
i = u[e].apply(this, r);
t.push(i);
return this;
};
}, d = 0; d < l.length; d++) _(d);
cc.tween = function(t) {
return new s(t);
};
cc.Tween = s;
}), {
"../animation/bezier": 14
} ],
9: [ (function(t, e) {
"use strict";
var i = cc.js, n = t("./playable"), r = t("./animation-curves"), s = r.EventAnimCurve, a = r.EventInfo, o = t("./types").WrapModeMask, c = t("../core/utils/binary-search").binarySearchEpsilon;
function u(t, e) {
n.call(this);
this.target = t;
this.animation = e;
this._anims = new i.array.MutableForwardIterator([]);
}
i.extend(u, n);
var l = u.prototype;
l.playState = function(t, e) {
if (t.clip) {
t.curveLoaded || h(this.target, t);
t.animator = this;
t.play();
"number" == typeof e && t.setTime(e);
this.play();
}
};
l.stopStatesExcept = function(t) {
var e = this._anims, i = e.array;
for (e.i = 0; e.i < i.length; ++e.i) {
var n = i[e.i];
n !== t && this.stopState(n);
}
};
l.addAnimation = function(t) {
-1 === this._anims.array.indexOf(t) && this._anims.push(t);
t._setEventTarget(this.animation);
};
l.removeAnimation = function(t) {
var e = this._anims.array.indexOf(t);
if (e >= 0) {
this._anims.fastRemoveAt(e);
0 === this._anims.array.length && this.stop();
} else cc.errorID(3907);
t.animator = null;
};
l.sample = function() {
var t = this._anims, e = t.array;
for (t.i = 0; t.i < e.length; ++t.i) e[t.i].sample();
};
l.stopState = function(t) {
t && t.stop();
};
l.pauseState = function(t) {
t && t.pause();
};
l.resumeState = function(t) {
t && t.resume();
this.isPaused && this.resume();
};
l.setStateTime = function(t, e) {
if (void 0 !== e) {
if (t) {
t.setTime(e);
t.sample();
}
} else {
e = t;
for (var i = this._anims.array, n = 0; n < i.length; ++n) {
var r = i[n];
r.setTime(e);
r.sample();
}
}
};
l.onStop = function() {
var t = this._anims, e = t.array;
for (t.i = 0; t.i < e.length; ++t.i) e[t.i].stop();
};
l.onPause = function() {
for (var t = this._anims.array, e = 0; e < t.length; ++e) {
var i = t[e];
i.pause();
i.animator = null;
}
};
l.onResume = function() {
for (var t = this._anims.array, e = 0; e < t.length; ++e) {
var i = t[e];
i.animator = this;
i.resume();
}
};
l._reloadClip = function(t) {
h(this.target, t);
};
function h(t, e) {
var i = e.clip;
e.duration = i.duration;
e.speed = i.speed;
e.wrapMode = i.wrapMode;
e.frameRate = i.sample;
(e.wrapMode & o.Loop) === o.Loop ? e.repeatCount = Infinity : e.repeatCount = 1;
var n = e.curves = i.createCurves(e, t), r = i.events;
if (r) for (var u, l = 0, h = r.length; l < h; l++) {
if (!u) {
(u = new s()).target = t;
n.push(u);
}
var f = r[l], _ = f.frame / e.duration, d = void 0, p = c(u.ratios, _);
if (p >= 0) d = u.events[p]; else {
d = new a();
u.ratios.push(_);
u.events.push(d);
}
d.add(f.func, f.params);
}
}
e.exports = u;
}), {
"../core/utils/binary-search": 190,
"./animation-curves": 11,
"./playable": 18,
"./types": 19
} ],
10: [ (function(t, e) {
"use strict";
var i = t("./types").WrapMode, n = t("./animation-curves"), r = n.DynamicAnimCurve, s = n.quickFindIndex, a = t("./motion-path-helper").sampleMotionPaths, o = t("../core/utils/binary-search").binarySearchEpsilon, c = cc.Class({
name: "cc.AnimationClip",
extends: cc.Asset,
properties: {
_duration: {
default: 0,
type: cc.Float
},
duration: {
get: function() {
return this._duration;
}
},
sample: {
default: 60
},
speed: {
default: 1
},
wrapMode: {
default: i.Normal
},
curveData: {
default: {},
visible: !1
},
events: {
default: [],
visible: !1
}
},
statics: {
createWithSpriteFrames: function(t, e) {
if (!Array.isArray(t)) {
cc.errorID(3905);
return null;
}
var i = new c();
i.sample = e || i.sample;
i._duration = t.length / i.sample;
for (var n = [], r = 1 / i.sample, s = 0, a = t.length; s < a; s++) n[s] = {
frame: s * r,
value: t[s]
};
i.curveData = {
comps: {
"cc.Sprite": {
spriteFrame: n
}
}
};
return i;
}
},
onLoad: function() {
this._duration = Number.parseFloat(this.duration);
this.speed = Number.parseFloat(this.speed);
this.wrapMode = Number.parseInt(this.wrapMode);
this.frameRate = Number.parseFloat(this.sample);
},
createPropCurve: function(t, e, i) {
var n = [], c = t instanceof cc.Node && "position" === e, u = new r();
u.target = t;
u.prop = e;
for (var l = 0, h = i.length; l < h; l++) {
var f = i[l], _ = f.frame / this.duration;
u.ratios.push(_);
c && n.push(f.motionPath);
var d = f.value;
u.values.push(d);
var p = f.curve;
if (p) {
if ("string" == typeof p) {
u.types.push(p);
continue;
}
if (Array.isArray(p)) {
p[0] === p[1] && p[2] === p[3] ? u.types.push(r.Linear) : u.types.push(r.Bezier(p));
continue;
}
}
u.types.push(r.Linear);
}
c && a(n, u, this.duration, this.sample, t);
for (var v, g, m = u.ratios, y = !0, E = 1, T = m.length; E < T; E++) {
v = m[E] - m[E - 1];
if (1 === E) g = v; else if (Math.abs(v - g) > 1e-6) {
y = !1;
break;
}
}
u._findFrameIndex = y ? s : o;
var C = u.values[0];
null == C || u._lerp || ("number" == typeof C ? u._lerp = r.prototype._lerpNumber : C instanceof cc.Quat ? u._lerp = r.prototype._lerpQuat : C instanceof cc.Vec2 ? u._lerp = r.prototype._lerpVector2 : C instanceof cc.Vec3 ? u._lerp = r.prototype._lerpVector3 : C.lerp && (u._lerp = r.prototype._lerpObject));
return u;
},
createTargetCurves: function(t, e, i) {
var n = e.props, r = e.comps;
if (n) for (var s in n) {
var a = n[s], o = this.createPropCurve(t, s, a);
i.push(o);
}
if (r) for (var c in r) {
var u = t.getComponent(c);
if (u) {
var l = r[c];
for (var h in l) {
var f = l[h], _ = this.createPropCurve(u, h, f);
i.push(_);
}
}
}
},
createCurves: function(t, e) {
var i = this.curveData, n = i.paths, r = [];
this.createTargetCurves(e, i, r);
for (var s in n) {
var a = cc.find(s, e);
if (a) {
var o = n[s];
this.createTargetCurves(a, o, r);
}
}
return r;
}
});
cc.AnimationClip = e.exports = c;
}), {
"../core/utils/binary-search": 190,
"./animation-curves": 11,
"./motion-path-helper": 17,
"./types": 19
} ],
11: [ (function(t, e) {
"use strict";
var i = t("./bezier").bezierByTime, n = t("../core/utils/binary-search").binarySearchEpsilon, r = t("./types").WrapModeMask, s = t("./types").WrappedInfo;
function a(t, e) {
if ("string" == typeof e) {
var n = cc.easing[e];
n ? t = n(t) : cc.errorID(3906, e);
} else Array.isArray(e) && (t = i(e, t));
return t;
}
var o = cc.Class({
name: "cc.AnimCurve",
sample: function() {},
onTimeChangedManually: void 0
});
var c, u = cc.Class({
name: "cc.DynamicAnimCurve",
extends: o,
ctor: function() {
this._cachedIndex = 0;
},
properties: {
target: null,
prop: "",
values: [],
ratios: [],
types: []
},
_findFrameIndex: n,
_lerp: void 0,
_lerpNumber: function(t, e, i) {
return t + (e - t) * i;
},
_lerpObject: function(t, e, i) {
return t.lerp(e, i);
},
_lerpQuat: (c = cc.quat(), function(t, e, i) {
return t.lerp(e, i, c);
}),
_lerpVector2: (function() {
var t = cc.v2();
return function(e, i, n) {
return e.lerp(i, n, t);
};
})(),
_lerpVector3: (function() {
var t = cc.v3();
return function(e, i, n) {
return e.lerp(i, n, t);
};
})(),
sample: function(t, e) {
var i = this.values, n = this.ratios, r = n.length;
if (0 !== r) {
var s, o = !0, c = this._cachedIndex;
if (c < 0 && (c = ~c) > 0 && c < n.length) {
var u = n[c - 1], l = n[c];
e > u && e < l && (o = !1);
}
o && (this._cachedIndex = this._findFrameIndex(n, e));
var h = this._cachedIndex;
if (h < 0) if ((h = ~h) <= 0) s = i[0]; else if (h >= r) s = i[r - 1]; else {
var f = i[h - 1];
if (this._lerp) {
var _ = n[h - 1], d = n[h], p = this.types[h - 1], v = (e - _) / (d - _);
p && (v = a(v, p));
var g = i[h];
s = this._lerp(f, g, v);
} else s = f;
} else s = i[h];
this.target[this.prop] = s;
}
}
});
u.Linear = null;
u.Bezier = function(t) {
return t;
};
var l = function() {
this.events = [];
};
l.prototype.add = function(t, e) {
this.events.push({
func: t || "",
params: e || []
});
};
var h = cc.Class({
name: "cc.EventAnimCurve",
extends: o,
properties: {
target: null,
ratios: [],
events: [],
_wrappedInfo: {
default: function() {
return new s();
}
},
_lastWrappedInfo: null,
_ignoreIndex: NaN
},
_wrapIterations: function(t) {
t - (0 | t) == 0 && (t -= 1);
return 0 | t;
},
sample: function(t, e, i) {
var a = this.ratios.length, o = i.getWrappedInfo(i.time, this._wrappedInfo), c = o.direction, u = n(this.ratios, o.ratio);
if (u < 0) {
u = ~u - 1;
c < 0 && (u += 1);
}
this._ignoreIndex !== u && (this._ignoreIndex = NaN);
o.frameIndex = u;
if (this._lastWrappedInfo) {
var l = i.wrapMode, h = this._wrapIterations(o.iterations), f = this._lastWrappedInfo, _ = this._wrapIterations(f.iterations), d = f.frameIndex, p = f.direction, v = -1 !== _ && h !== _;
if (d === u && v && 1 === a) this._fireEvent(0); else if (d !== u || v) {
c = p;
do {
if (d !== u) {
if (-1 === c && 0 === d && u > 0) {
(l & r.PingPong) === r.PingPong ? c *= -1 : d = a;
_++;
} else if (1 === c && d === a - 1 && u < a - 1) {
(l & r.PingPong) === r.PingPong ? c *= -1 : d = -1;
_++;
}
if (d === u) break;
if (_ > h) break;
}
d += c;
cc.director.getAnimationManager().pushDelayEvent(this, "_fireEvent", [ d ]);
} while (d !== u && d > -1 && d < a);
}
this._lastWrappedInfo.set(o);
} else {
this._fireEvent(u);
this._lastWrappedInfo = new s(o);
}
},
_fireEvent: function(t) {
if (!(t < 0 || t >= this.events.length || this._ignoreIndex === t)) {
var e = this.events[t].events;
if (this.target.isValid) for (var i = this.target._components, n = 0; n < e.length; n++) for (var r = e[n], s = r.func, a = 0; a < i.length; a++) {
var o = i[a], c = o[s];
c && c.apply(o, r.params);
}
}
},
onTimeChangedManually: function(t, e) {
this._lastWrappedInfo = null;
this._ignoreIndex = NaN;
var i = e.getWrappedInfo(t, this._wrappedInfo), r = i.direction, s = n(this.ratios, i.ratio);
if (s < 0) {
s = ~s - 1;
r < 0 && (s += 1);
this._ignoreIndex = s;
}
}
});
e.exports = {
AnimCurve: o,
DynamicAnimCurve: u,
EventAnimCurve: h,
EventInfo: l,
computeRatioByType: a,
quickFindIndex: function(t, e) {
var i = t.length - 1;
if (0 === i) return 0;
var n = t[0];
if (e < n) return 0;
var r = t[i];
if (e > r) return ~t.length;
var s = (e = (e - n) / (r - n)) / (1 / i), a = 0 | s;
return s - a < 1e-6 ? a : a + 1 - s < 1e-6 ? a + 1 : ~(a + 1);
}
};
}), {
"../core/utils/binary-search": 190,
"./bezier": 14,
"./types": 19
} ],
12: [ (function(t, e) {
"use strict";
var i = cc.js, n = cc.Class({
ctor: function() {
this._anims = new i.array.MutableForwardIterator([]);
this._delayEvents = [];
cc.director._scheduler && cc.director._scheduler.enableForTarget(this);
},
update: function(t) {
var e = this._anims, i = e.array;
for (e.i = 0; e.i < i.length; ++e.i) {
var n = i[e.i];
n._isPlaying && !n._isPaused && n.update(t);
}
for (var r = this._delayEvents, s = 0; s < r.length; s++) {
var a = r[s];
a.target[a.func].apply(a.target, a.args);
}
r.length = 0;
},
destruct: function() {},
addAnimation: function(t) {
-1 === this._anims.array.indexOf(t) && this._anims.push(t);
},
removeAnimation: function(t) {
var e = this._anims.array.indexOf(t);
e >= 0 ? this._anims.fastRemoveAt(e) : cc.errorID(3907);
},
pushDelayEvent: function(t, e, i) {
this._delayEvents.push({
target: t,
func: e,
args: i
});
}
});
cc.AnimationManager = e.exports = n;
}), {} ],
13: [ (function(t, e) {
"use strict";
var i = cc.js, n = t("./playable"), r = t("./types"), s = r.WrappedInfo, a = r.WrapMode, o = r.WrapModeMask;
function c(t, e) {
n.call(this);
this._currentFramePlayed = !1;
this._delay = 0;
this._delayTime = 0;
this._wrappedInfo = new s();
this._lastWrappedInfo = null;
this._process = l;
this._clip = t;
this._name = e || t && t.name;
this.animator = null;
this.curves = [];
this.delay = 0;
this.repeatCount = 1;
this.duration = 1;
this.speed = 1;
this.wrapMode = a.Normal;
this.time = 0;
this._target = null;
this._lastframeEventOn = !1;
this.emit = function() {
for (var t = new Array(arguments.length), e = 0, i = t.length; e < i; e++) t[e] = arguments[e];
cc.director.getAnimationManager().pushDelayEvent(this, "_emit", t);
};
}
i.extend(c, n);
var u = c.prototype;
u._emit = function(t, e) {
this._target && this._target.isValid && this._target.emit(t, t, e);
};
u.on = function(t, e, i) {
if (this._target && this._target.isValid) {
"lastframe" === t && (this._lastframeEventOn = !0);
return this._target.on(t, e, i);
}
return null;
};
u.once = function(t, e, i) {
if (this._target && this._target.isValid) {
"lastframe" === t && (this._lastframeEventOn = !0);
var n = this;
return this._target.once(t, (function(t) {
e.call(i, t);
n._lastframeEventOn = !1;
}));
}
return null;
};
u.off = function(t, e, i) {
if (this._target && this._target.isValid) {
"lastframe" === t && (this._target.hasEventListener(t) || (this._lastframeEventOn = !1));
this._target.off(t, e, i);
}
};
u._setEventTarget = function(t) {
this._target = t;
};
u.onPlay = function() {
this.setTime(0);
this._delayTime = this._delay;
cc.director.getAnimationManager().addAnimation(this);
this.animator && this.animator.addAnimation(this);
this.emit("play", this);
};
u.onStop = function() {
this.isPaused || cc.director.getAnimationManager().removeAnimation(this);
this.animator && this.animator.removeAnimation(this);
this.emit("stop", this);
};
u.onResume = function() {
cc.director.getAnimationManager().addAnimation(this);
this.emit("resume", this);
};
u.onPause = function() {
cc.director.getAnimationManager().removeAnimation(this);
this.emit("pause", this);
};
u.setTime = function(t) {
this._currentFramePlayed = !1;
this.time = t || 0;
for (var e = this.curves, i = 0, n = e.length; i < n; i++) {
var r = e[i];
r.onTimeChangedManually && r.onTimeChangedManually(t, this);
}
};
function l() {
var t = this.sample();
if (this._lastframeEventOn) {
var e;
e = this._lastWrappedInfo ? this._lastWrappedInfo : this._lastWrappedInfo = new s(t);
this.repeatCount > 1 && (0 | t.iterations) > (0 | e.iterations) && this.emit("lastframe", this);
e.set(t);
}
if (t.stopped) {
this.stop();
this.emit("finished", this);
}
}
function h() {
var t = this.time, e = this.duration;
t > e ? 0 == (t %= e) && (t = e) : t < 0 && 0 != (t %= e) && (t += e);
for (var i = t / e, n = this.curves, r = 0, s = n.length; r < s; r++) n[r].sample(t, i, this);
if (this._lastframeEventOn) {
void 0 === this._lastIterations && (this._lastIterations = i);
(this.time > 0 && this._lastIterations > i || this.time < 0 && this._lastIterations < i) && this.emit("lastframe", this);
this._lastIterations = i;
}
}
u.update = function(t) {
if (this._delayTime > 0) {
this._delayTime -= t;
if (this._delayTime > 0) return;
}
this._currentFramePlayed ? this.time += t * this.speed : this._currentFramePlayed = !0;
this._process();
};
u._needRevers = function(t) {
var e = this.wrapMode, i = !1;
if ((e & o.PingPong) === o.PingPong) {
t - (0 | t) == 0 && t > 0 && (t -= 1);
1 & t && (i = !i);
}
(e & o.Reverse) === o.Reverse && (i = !i);
return i;
};
u.getWrappedInfo = function(t, e) {
e = e || new s();
var i = !1, n = this.duration, r = this.repeatCount, a = t > 0 ? t / n : -t / n;
if (a >= r) {
a = r;
i = !0;
var c = r - (0 | r);
0 === c && (c = 1);
t = c * n * (t > 0 ? 1 : -1);
}
if (t > n) {
var u = t % n;
t = 0 === u ? n : u;
} else t < 0 && 0 != (t %= n) && (t += n);
var l = !1, h = this._wrapMode & o.ShouldWrap;
h && (l = this._needRevers(a));
var f = l ? -1 : 1;
this.speed < 0 && (f *= -1);
h && l && (t = n - t);
e.ratio = t / n;
e.time = t;
e.direction = f;
e.stopped = i;
e.iterations = a;
return e;
};
u.sample = function() {
for (var t = this.getWrappedInfo(this.time, this._wrappedInfo), e = this.curves, i = 0, n = e.length; i < n; i++) e[i].sample(t.time, t.ratio, this);
return t;
};
i.get(u, "clip", (function() {
return this._clip;
}));
i.get(u, "name", (function() {
return this._name;
}));
i.obsolete(u, "AnimationState.length", "duration");
i.getset(u, "curveLoaded", (function() {
return this.curves.length > 0;
}), (function() {
this.curves.length = 0;
}));
i.getset(u, "wrapMode", (function() {
return this._wrapMode;
}), (function(t) {
this._wrapMode = t;
this.time = 0;
t & o.Loop ? this.repeatCount = Infinity : this.repeatCount = 1;
}));
i.getset(u, "repeatCount", (function() {
return this._repeatCount;
}), (function(t) {
this._repeatCount = t;
var e = this._wrapMode & o.ShouldWrap, i = (this.wrapMode & o.Reverse) === o.Reverse;
this._process = Infinity !== t || e || i ? l : h;
}));
i.getset(u, "delay", (function() {
return this._delay;
}), (function(t) {
this._delayTime = this._delay = t;
}));
cc.AnimationState = e.exports = c;
}), {
"./playable": 18,
"./types": 19
} ],
14: [ (function(t, e) {
"use strict";
var i = Math.cos, n = Math.acos, r = Math.max, s = 2 * Math.PI, a = Math.sqrt;
function o(t) {
return t < 0 ? -Math.pow(-t, 1 / 3) : Math.pow(t, 1 / 3);
}
function c(t, e) {
var c, u, l, h, f = e - 0, _ = e - t[0], d = 3 * f, p = 3 * _, v = 3 * (e - t[2]), g = 1 / (-f + p - v + (e - 1)), m = (d - 6 * _ + v) * g, y = m * (1 / 3), E = (-d + p) * g, T = 1 / 3 * (3 * E - m * m), C = T * (1 / 3), A = (2 * m * m * m - 9 * m * E + f * g * 27) / 27, S = A / 2, x = S * S + C * C * C;
if (x < 0) {
var b = 1 / 3 * -T, R = a(b * b * b), w = -A / (2 * R), O = n(w < -1 ? -1 : w > 1 ? 1 : w), I = 2 * o(R);
u = I * i(O * (1 / 3)) - y;
l = I * i((O + s) * (1 / 3)) - y;
h = I * i((O + 2 * s) * (1 / 3)) - y;
return 0 <= u && u <= 1 ? 0 <= l && l <= 1 ? 0 <= h && h <= 1 ? r(u, l, h) : r(u, l) : 0 <= h && h <= 1 ? r(u, h) : u : 0 <= l && l <= 1 ? 0 <= h && h <= 1 ? r(l, h) : l : h;
}
if (0 === x) {
l = -(c = S < 0 ? o(-S) : -o(S)) - y;
return 0 <= (u = 2 * c - y) && u <= 1 ? 0 <= l && l <= 1 ? r(u, l) : u : l;
}
var D = a(x);
return (c = o(-S + D)) - o(S + D) - y;
}
e.exports = {
bezier: function(t, e, i, n, r) {
var s = 1 - r;
return s * (s * (t + (3 * e - t) * r) + 3 * i * r * r) + n * r * r * r;
},
bezierByTime: function(t, e) {
var i = c(t, e), n = t[1];
return ((1 - i) * (n + (t[3] - n) * i) * 3 + i * i) * i;
}
};
}), {} ],
15: [ (function(t, e) {
"use strict";
var i = {
constant: function() {
return 0;
},
linear: function(t) {
return t;
},
quadIn: function(t) {
return t * t;
},
quadOut: function(t) {
return t * (2 - t);
},
quadInOut: function(t) {
return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1);
},
cubicIn: function(t) {
return t * t * t;
},
cubicOut: function(t) {
return --t * t * t + 1;
},
cubicInOut: function(t) {
return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2);
},
quartIn: function(t) {
return t * t * t * t;
},
quartOut: function(t) {
return 1 - --t * t * t * t;
},
quartInOut: function(t) {
return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2);
},
quintIn: function(t) {
return t * t * t * t * t;
},
quintOut: function(t) {
return --t * t * t * t * t + 1;
},
quintInOut: function(t) {
return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2);
},
sineIn: function(t) {
return 1 - Math.cos(t * Math.PI / 2);
},
sineOut: function(t) {
return Math.sin(t * Math.PI / 2);
},
sineInOut: function(t) {
return .5 * (1 - Math.cos(Math.PI * t));
},
expoIn: function(t) {
return 0 === t ? 0 : Math.pow(1024, t - 1);
},
expoOut: function(t) {
return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
},
expoInOut: function(t) {
return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)));
},
circIn: function(t) {
return 1 - Math.sqrt(1 - t * t);
},
circOut: function(t) {
return Math.sqrt(1 - --t * t);
},
circInOut: function(t) {
return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
},
elasticIn: function(t) {
var e, i = .1;
if (0 === t) return 0;
if (1 === t) return 1;
if (!i || i < 1) {
i = 1;
e = .1;
} else e = .4 * Math.asin(1 / i) / (2 * Math.PI);
return -i * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / .4);
},
elasticOut: function(t) {
var e, i = .1;
if (0 === t) return 0;
if (1 === t) return 1;
if (!i || i < 1) {
i = 1;
e = .1;
} else e = .4 * Math.asin(1 / i) / (2 * Math.PI);
return i * Math.pow(2, -10 * t) * Math.sin(2 * (t - e) * Math.PI / .4) + 1;
},
elasticInOut: function(t) {
var e, i = .1;
if (0 === t) return 0;
if (1 === t) return 1;
if (!i || i < 1) {
i = 1;
e = .1;
} else e = .4 * Math.asin(1 / i) / (2 * Math.PI);
return (t *= 2) < 1 ? i * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / .4) * -.5 : i * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / .4) * .5 + 1;
},
backIn: function(t) {
var e = 1.70158;
return t * t * ((e + 1) * t - e);
},
backOut: function(t) {
var e = 1.70158;
return --t * t * ((e + 1) * t + e) + 1;
},
backInOut: function(t) {
var e = 2.5949095;
return (t *= 2) < 1 ? t * t * ((e + 1) * t - e) * .5 : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);
},
bounceIn: function(t) {
return 1 - i.bounceOut(1 - t);
},
bounceOut: function(t) {
return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
},
bounceInOut: function(t) {
return t < .5 ? .5 * i.bounceIn(2 * t) : .5 * i.bounceOut(2 * t - 1) + .5;
},
smooth: function(t) {
return t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);
},
fade: function(t) {
return t <= 0 ? 0 : t >= 1 ? 1 : t * t * t * (t * (6 * t - 15) + 10);
}
};
function n(t, e) {
return function(i) {
return i < .5 ? e(2 * i) / 2 : t(2 * i - 1) / 2 + .5;
};
}
i.quadOutIn = n(i.quadIn, i.quadOut);
i.cubicOutIn = n(i.cubicIn, i.cubicOut);
i.quartOutIn = n(i.quartIn, i.quartOut);
i.quintOutIn = n(i.quintIn, i.quintOut);
i.sineOutIn = n(i.sineIn, i.sineOut);
i.expoOutIn = n(i.expoIn, i.expoOut);
i.circOutIn = n(i.circIn, i.circOut);
i.backOutIn = n(i.backIn, i.backOut);
i.bounceIn = function(t) {
return 1 - i.bounceOut(1 - t);
};
i.bounceInOut = function(t) {
return t < .5 ? .5 * i.bounceIn(2 * t) : .5 * i.bounceOut(2 * t - 1) + .5;
};
i.bounceOutIn = n(i.bounceIn, i.bounceOut);
cc.easing = e.exports = i;
}), {} ],
16: [ (function(t) {
"use strict";
t("./bezier");
t("./easing");
t("./types");
t("./motion-path-helper");
t("./animation-curves");
t("./animation-clip");
t("./animation-manager");
t("./animation-state");
t("./animation-animator");
}), {
"./animation-animator": 9,
"./animation-clip": 10,
"./animation-curves": 11,
"./animation-manager": 12,
"./animation-state": 13,
"./bezier": 14,
"./easing": 15,
"./motion-path-helper": 17,
"./types": 19
} ],
17: [ (function(t, e) {
"use strict";
var i = t("./animation-curves").DynamicAnimCurve, n = t("./animation-curves").computeRatioByType, r = t("./bezier").bezier, s = t("../core/utils/binary-search").binarySearchEpsilon, a = cc.v2;
function o(t) {
this.points = t || [];
this.beziers = [];
this.ratios = [];
this.progresses = [];
this.length = 0;
this.computeBeziers();
}
o.prototype.computeBeziers = function() {
this.beziers.length = 0;
this.ratios.length = 0;
this.progresses.length = 0;
this.length = 0;
for (var t, e = 1; e < this.points.length; e++) {
var i = this.points[e - 1], n = this.points[e];
(t = new c()).start = i.pos;
t.startCtrlPoint = i.out;
t.end = n.pos;
t.endCtrlPoint = n.in;
this.beziers.push(t);
this.length += t.getLength();
}
var r = 0;
for (e = 0; e < this.beziers.length; e++) {
t = this.beziers[e];
this.ratios[e] = t.getLength() / this.length;
this.progresses[e] = r += this.ratios[e];
}
return this.beziers;
};
function c() {
this.start = a();
this.end = a();
this.startCtrlPoint = a();
this.endCtrlPoint = a();
}
c.prototype.getPointAt = function(t) {
var e = this.getUtoTmapping(t);
return this.getPoint(e);
};
c.prototype.getPoint = function(t) {
var e = r(this.start.x, this.startCtrlPoint.x, this.endCtrlPoint.x, this.end.x, t), i = r(this.start.y, this.startCtrlPoint.y, this.endCtrlPoint.y, this.end.y, t);
return new a(e, i);
};
c.prototype.getLength = function() {
var t = this.getLengths();
return t[t.length - 1];
};
c.prototype.getLengths = function(t) {
t || (t = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200);
if (this.cacheArcLengths && this.cacheArcLengths.length === t + 1) return this.cacheArcLengths;
var e, i, n = [], r = this.getPoint(0), s = a(), o = 0;
n.push(0);
for (i = 1; i <= t; i++) {
e = this.getPoint(i / t);
s.x = r.x - e.x;
s.y = r.y - e.y;
o += s.mag();
n.push(o);
r = e;
}
this.cacheArcLengths = n;
return n;
};
c.prototype.getUtoTmapping = function(t, e) {
var i, n = this.getLengths(), r = 0, s = n.length;
i = e || t * n[s - 1];
for (var a, o = 0, c = s - 1; o <= c; ) if ((a = n[r = Math.floor(o + (c - o) / 2)] - i) < 0) o = r + 1; else {
if (!(a > 0)) {
c = r;
break;
}
c = r - 1;
}
if (n[r = c] === i) return r / (s - 1);
var u = n[r];
return (r + (i - u) / (n[r + 1] - u)) / (s - 1);
};
function u(t) {
if (!Array.isArray(t)) return !1;
for (var e = 0, i = t.length; e < i; e++) {
var n = t[e];
if (!Array.isArray(n) || 6 !== n.length) return !1;
}
return !0;
}
e.exports = {
sampleMotionPaths: function(t, e, r, c, l) {
function h(t) {
return t instanceof cc.Vec2 ? {
in: t,
pos: t,
out: t
} : Array.isArray(t) && 6 === t.length ? {
in: a(t[2], t[3]),
pos: a(t[0], t[1]),
out: a(t[4], t[5])
} : {
in: cc.Vec2.ZERO,
pos: cc.Vec2.ZERO,
out: cc.Vec2.ZERO
};
}
var f = e.values = e.values.map((function(t) {
Array.isArray(t) && (t = 2 === t.length ? cc.v2(t[0], t[1]) : cc.v3(t[0], t[1], t[2]));
return t;
}));
if (0 !== t.length && 0 !== f.length) {
for (var _ = !1, d = 0; d < t.length; d++) {
var p = t[d];
if (p && !u(p)) {
cc.errorID(3904, l ? l.name : "", "position", d);
p = null;
}
if (p && p.length > 0) {
_ = !0;
break;
}
}
if (_ && 1 !== f.length) {
for (var v = e.types, g = e.ratios, m = e.values = [], y = e.types = [], E = e.ratios = [], T = 0, C = i.Linear, A = 0, S = t.length; A < S - 1; A++) {
var x, b = t[A], R = g[A], w = g[A + 1] - R, O = f[A], I = f[A + 1], D = v[A], M = [], L = T / w, N = 1 / (w * r * c);
if (b && b.length > 0) {
var P = [];
P.push(h(O));
for (var F = 0, B = b.length; F < B; F++) {
var z = h(b[F]);
P.push(z);
}
P.push(h(I));
var U = new o(P);
U.computeBeziers();
for (var k = U.progresses; 1 - L > 1e-6; ) {
var V, H, G, W;
if ((x = n(x = L, D)) < 0) {
W = (0 - x) * (H = U.beziers[0]).getLength();
G = H.start.sub(H.endCtrlPoint).normalize();
V = H.start.add(G.mul(W));
} else if (x > 1) {
W = (x - 1) * (H = U.beziers[U.beziers.length - 1]).getLength();
G = H.end.sub(H.startCtrlPoint).normalize();
V = H.end.add(G.mul(W));
} else {
var j = s(k, x);
j < 0 && (j = ~j);
x -= j > 0 ? k[j - 1] : 0;
x /= U.ratios[j];
V = U.beziers[j].getPointAt(x);
}
M.push(V);
L += N;
}
} else for (;1 - L > 1e-6; ) {
x = n(x = L, D);
M.push(O.lerp(I, x));
L += N;
}
C = "constant" === D ? D : i.Linear;
for (F = 0, B = M.length; F < B; F++) {
var Y = R + T + N * F * w;
X(M[F], C, Y);
}
T = Math.abs(L - 1) > 1e-6 ? (L - 1) * w : 0;
}
g[g.length - 1] !== E[E.length - 1] && X(f[f.length - 1], C, g[g.length - 1]);
}
}
function X(t, e, i) {
m.push(t);
y.push(e);
E.push(i);
}
},
Curve: o,
Bezier: c
};
}), {
"../core/utils/binary-search": 190,
"./animation-curves": 11,
"./bezier": 14
} ],
18: [ (function(t, e) {
"use strict";
var i = cc.js, n = t("../core/CCDebug");
function r() {
this._isPlaying = !1;
this._isPaused = !1;
this._stepOnce = !1;
}
var s = r.prototype;
i.get(s, "isPlaying", (function() {
return this._isPlaying;
}), !0);
i.get(s, "isPaused", (function() {
return this._isPaused;
}), !0);
var a = function() {};
s.onPlay = a;
s.onPause = a;
s.onResume = a;
s.onStop = a;
s.onError = a;
s.play = function() {
if (this._isPlaying) if (this._isPaused) {
this._isPaused = !1;
this.onResume();
} else this.onError(n.getError(3912)); else {
this._isPlaying = !0;
this.onPlay();
}
};
s.stop = function() {
if (this._isPlaying) {
this._isPlaying = !1;
this.onStop();
this._isPaused = !1;
}
};
s.pause = function() {
if (this._isPlaying && !this._isPaused) {
this._isPaused = !0;
this.onPause();
}
};
s.resume = function() {
if (this._isPlaying && this._isPaused) {
this._isPaused = !1;
this.onResume();
}
};
s.step = function() {
this.pause();
this._stepOnce = !0;
this._isPlaying || this.play();
};
e.exports = r;
}), {
"../core/CCDebug": 22
} ],
19: [ (function(t, e) {
"use strict";
var i = {
Loop: 2,
ShouldWrap: 4,
PingPong: 22,
Reverse: 36
}, n = cc.Enum({
Default: 0,
Normal: 1,
Reverse: i.Reverse,
Loop: i.Loop,
LoopReverse: i.Loop | i.Reverse,
PingPong: i.PingPong,
PingPongReverse: i.PingPong | i.Reverse
});
cc.WrapMode = n;
function r(t) {
if (t) this.set(t); else {
this.ratio = 0;
this.time = 0;
this.direction = 1;
this.stopped = !0;
this.iterations = 0;
this.frameIndex = void 0;
}
}
r.prototype.set = function(t) {
this.ratio = t.ratio;
this.time = t.time;
this.direction = t.direction;
this.stopped = t.stopped;
this.iterations = t.iterations;
this.frameIndex = t.frameIndex;
};
e.exports = {
WrapModeMask: i,
WrapMode: n,
WrappedInfo: r
};
}), {} ],
20: [ (function(t, e) {
"use strict";
var i, n = t("../core/event/event-target"), r = t("../core/platform/CCSys"), s = t("../core/assets/CCAudioClip").LoadMode, a = !1, o = [], c = function t(e) {
n.call(this);
this._shouldRecycleOnEnded = !1;
this._src = e;
this._element = null;
this.id = 0;
this._state = t.State.INITIALZING;
this._onended = function() {
this._state = t.State.STOPPED;
this.emit("ended");
}.bind(this);
};
cc.js.extend(c, n);
c.State = {
ERROR: -1,
INITIALZING: 0,
PLAYING: 1,
PAUSED: 2,
STOPPED: 3
};
(function(t) {
t._bindEnded = function(t) {
t = t || this._onended;
var e = this._element;
this._src && e instanceof HTMLAudioElement ? e.addEventListener("ended", t) : e.onended = t;
};
t._unbindEnded = function() {
var t = this._element;
t instanceof HTMLAudioElement ? t.removeEventListener("ended", this._onended) : t && (t.onended = null);
};
t._onLoaded = function() {
this._createElement();
this._state = c.State.INITIALZING;
this.setVolume(1);
this.setLoop(!1);
};
t._createElement = function() {
var t = this._src._nativeAsset;
if (t instanceof HTMLAudioElement) {
this._element || (this._element = document.createElement("audio"));
this._element.src = t.src;
} else this._element = new u(t, this);
};
t.play = function() {
var t = this;
this._src && this._src._ensureLoaded((function() {
t._state = c.State.PLAYING;
t._bindEnded();
var e = t._element.play();
window.Promise && e instanceof Promise && e.catch((function() {}));
t._touchToPlay();
}));
};
t._touchToPlay = function() {
this._src && this._src.loadMode === s.DOM_AUDIO && this._element.paused && o.push({
instance: this,
offset: 0,
audio: this._element
});
if (!a) {
a = !0;
var t = "ontouchend" in window ? "touchend" : "mousedown";
cc.game.canvas.addEventListener(t, (function() {
for (var t; t = o.pop(); ) t.audio.play(t.offset);
}));
}
};
t.destroy = function() {
this._element = null;
};
t.pause = function() {
if (this.getState() === c.State.PLAYING) {
var t = this;
this._src && this._src._ensureLoaded((function() {
t._unbindEnded();
t._element.pause();
t._state = c.State.PAUSED;
}));
}
};
t.resume = function() {
if (this.getState() === c.State.PAUSED) {
var t = this;
this._src && this._src._ensureLoaded((function() {
t._bindEnded();
t._element.play();
t._state = c.State.PLAYING;
}));
}
};
t.stop = function() {
var t = this;
this._src && this._src._ensureLoaded((function() {
t._element.pause();
t._element.currentTime = 0;
for (var e = 0; e < o.length; e++) if (o[e].instance === t) {
o.splice(e, 1);
break;
}
t._unbindEnded();
t.emit("stop");
t._state = c.State.STOPPED;
}));
};
t.setLoop = function(t) {
var e = this;
this._src && this._src._ensureLoaded((function() {
e._element.loop = t;
}));
};
t.getLoop = function() {
return !!this._element && this._element.loop;
};
t.setVolume = function(t) {
var e = this;
this._src && this._src._ensureLoaded((function() {
e._element.volume = t;
}));
};
t.getVolume = function() {
return this._element ? this._element.volume : 1;
};
t.setCurrentTime = function(t) {
var e = this;
this._src && this._src._ensureLoaded((function() {
e._unbindEnded();
e._bindEnded((function() {
e._bindEnded();
}));
e._element.currentTime = t;
}));
};
t.getCurrentTime = function() {
return this._element ? this._element.currentTime : 0;
};
t.getDuration = function() {
return this._src ? this._src.duration : 0;
};
t.getState = function(t) {
void 0 === t && (t = !0);
t && this._forceUpdatingState();
return this._state;
};
t._forceUpdatingState = function() {
var t = this._element;
t && (c.State.PLAYING === this._state && t.paused ? this._state = c.State.STOPPED : c.State.STOPPED !== this._state || t.paused || (this._state = c.State.PLAYING));
};
Object.defineProperty(t, "src", {
get: function() {
return this._src;
},
set: function(t) {
this._unbindEnded();
if (t) {
if (t !== this._src) {
this._src = t;
if (t.loaded) this._onLoaded(); else {
var e = this;
t.once("load", (function() {
t === e._src && e._onLoaded();
}));
}
}
} else {
this._src = null;
this._element instanceof u ? this._element = null : this._element && (this._element.src = "");
this._state = c.State.INITIALZING;
}
return t;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t, "paused", {
get: function() {
return !this._element || this._element.paused;
},
enumerable: !0,
configurable: !0
});
})(c.prototype);
i = cc.sys.browserType === cc.sys.BROWSER_TYPE_EDGE || cc.sys.browserType === cc.sys.BROWSER_TYPE_BAIDU || cc.sys.browserType === cc.sys.BROWSER_TYPE_UC ? .01 : 0;
var u = function(t, e) {
this._audio = e;
this._context = r.__audioSupport.context;
this._buffer = t;
this._gainObj = this._context.createGain();
this.volume = 1;
this._gainObj.connect(this._context.destination);
this._loop = !1;
this._startTime = -1;
this._currentSource = null;
this.playedLength = 0;
this._currentTimer = null;
this._endCallback = function() {
this.onended && this.onended(this);
}.bind(this);
};
(function(t) {
t.play = function(t) {
if (this._currentSource && !this.paused) {
this._currentSource.onended = null;
this._currentSource.stop(0);
this.playedLength = 0;
}
var e = this._context.createBufferSource();
e.buffer = this._buffer;
e.connect(this._gainObj);
e.loop = this._loop;
this._startTime = this._context.currentTime;
(t = t || this.playedLength) && (this._startTime -= t);
var i, n = this._buffer.duration, r = t;
if (this._loop) e.start ? e.start(0, r) : e.notoGrainOn ? e.noteGrainOn(0, r) : e.noteOn(0, r); else {
i = n - t;
e.start ? e.start(0, r, i) : e.noteGrainOn ? e.noteGrainOn(0, r, i) : e.noteOn(0, r, i);
}
this._currentSource = e;
e.onended = this._endCallback;
if ((!e.context.state || "suspended" === e.context.state) && 0 === this._context.currentTime) {
var s = this;
clearTimeout(this._currentTimer);
this._currentTimer = setTimeout((function() {
0 === s._context.currentTime && o.push({
instance: s._audio,
offset: t,
audio: s
});
}), 10);
}
var a = cc.sys;
a.os === a.OS_IOS && a.isBrowser && a.isMobile && ("suspended" === e.context.state && 0 !== this._context.currentTime || "interrupted" === e.context.state) && e.context.resume();
};
t.pause = function() {
clearTimeout(this._currentTimer);
if (!this.paused) {
this.playedLength = this._context.currentTime - this._startTime;
this.playedLength %= this._buffer.duration;
var t = this._currentSource;
this._currentSource = null;
this._startTime = -1;
t && t.stop(0);
}
};
Object.defineProperty(t, "paused", {
get: function() {
return (!this._currentSource || !this._currentSource.loop) && (-1 === this._startTime || this._context.currentTime - this._startTime > this._buffer.duration);
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t, "loop", {
get: function() {
return this._loop;
},
set: function(t) {
this._currentSource && (this._currentSource.loop = t);
return this._loop = t;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t, "volume", {
get: function() {
return this._volume;
},
set: function(t) {
this._volume = t;
if (this._gainObj.gain.setTargetAtTime) try {
this._gainObj.gain.setTargetAtTime(t, this._context.currentTime, i);
} catch (e) {
this._gainObj.gain.setTargetAtTime(t, this._context.currentTime, .01);
} else this._gainObj.gain.value = t;
if (r.os === r.OS_IOS && !this.paused && this._currentSource) {
this._currentSource.onended = null;
this.pause();
this.play();
}
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t, "currentTime", {
get: function() {
if (this.paused) return this.playedLength;
this.playedLength = this._context.currentTime - this._startTime;
this.playedLength %= this._buffer.duration;
return this.playedLength;
},
set: function(t) {
if (this.paused) this.playedLength = t; else {
this.pause();
this.playedLength = t;
this.play();
}
return t;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t, "duration", {
get: function() {
return this._buffer.duration;
},
enumerable: !0,
configurable: !0
});
})(u.prototype);
e.exports = cc._Audio = c;
}), {
"../core/assets/CCAudioClip": 59,
"../core/event/event-target": 118,
"../core/platform/CCSys": 137
} ],
21: [ (function(t, e) {
"use strict";
var i = t("./CCAudio"), n = t("../core/assets/CCAudioClip"), r = cc.js, s = 0, a = r.createMap(!0), o = {}, c = [], u = function(t) {
if (t._shouldRecycleOnEnded) {
t._finishCallback = null;
t.off("ended");
t.off("stop");
t.src = null;
c.includes(t) || (c.length < 32 ? c.push(t) : t.destroy());
t._shouldRecycleOnEnded = !1;
}
}, l = function(t) {
var e = s++, n = o[t];
n || (n = o[t] = []);
if (_._maxAudioInstance <= n.length) {
var r = n.shift();
h(r).stop();
}
var l = c.pop() || new i(), f = function() {
if (h(this.id)) {
delete a[this.id];
var t = n.indexOf(this.id);
cc.js.array.fastRemoveAt(n, t);
}
u(this);
};
l.on("ended", (function() {
this._finishCallback && this._finishCallback();
this.getLoop() || f.call(this);
}), l);
l.on("stop", f, l);
l.id = e;
a[e] = l;
n.push(e);
return l;
}, h = function(t) {
return a[t];
}, f = function(t) {
void 0 === t ? t = 1 : "string" == typeof t && (t = Number.parseFloat(t));
return t;
}, _ = {
AudioState: i.State,
_maxAudioInstance: 24,
_id2audio: a,
play: function(t, e, i) {
if (!(t instanceof n)) return cc.error("Wrong type of AudioClip.");
var r = t.nativeUrl, s = l(r);
s.src = t;
t._ensureLoaded();
s._shouldRecycleOnEnded = !0;
s.setLoop(e || !1);
i = f(i);
s.setVolume(i);
s.play();
return s.id;
},
setLoop: function(t, e) {
var i = h(t);
i && i.setLoop && i.setLoop(e);
},
isLoop: function(t) {
var e = h(t);
return !(!e || !e.getLoop) && e.getLoop();
},
setVolume: function(t, e) {
var i = h(t);
i && i.setVolume(e);
},
getVolume: function(t) {
var e = h(t);
return e ? e.getVolume() : 1;
},
setCurrentTime: function(t, e) {
var i = h(t);
if (i) {
i.setCurrentTime(e);
return !0;
}
return !1;
},
getCurrentTime: function(t) {
var e = h(t);
return e ? e.getCurrentTime() : 0;
},
getDuration: function(t) {
var e = h(t);
return e ? e.getDuration() : 0;
},
getState: function(t) {
var e = h(t);
return e ? e.getState() : this.AudioState.ERROR;
},
setFinishCallback: function(t, e) {
var i = h(t);
i && (i._finishCallback = e);
},
pause: function(t) {
var e = h(t);
if (e) {
e.pause();
return !0;
}
return !1;
},
_pauseIDCache: [],
pauseAll: function() {
for (var t in a) {
var e = a[t];
if (e.getState() === i.State.PLAYING) {
this._pauseIDCache.push(t);
e.pause();
}
}
},
resume: function(t) {
var e = h(t);
e && e.resume();
},
resumeAll: function() {
for (var t = 0; t < this._pauseIDCache.length; ++t) {
var e = this._pauseIDCache[t], i = h(e);
i && i.resume();
}
this._pauseIDCache.length = 0;
},
stop: function(t) {
var e = h(t);
if (e) {
e.stop();
return !0;
}
return !1;
},
stopAll: function() {
for (var t in a) {
var e = a[t];
e && e.stop();
}
},
setMaxAudioInstance: function() {},
getMaxAudioInstance: function() {
return this._maxAudioInstance;
},
uncache: function(t) {
var e = t;
if ("string" == typeof t) {
cc.warnID(8401, "cc.audioEngine", "cc.AudioClip", "AudioClip", "cc.AudioClip", "audio");
e = t;
} else {
if (!t) return;
e = t.nativeUrl;
}
var i = o[e];
if (i) for (;i.length > 0; ) {
var n = i.pop(), r = a[n];
if (r) {
r.stop();
delete a[n];
}
}
},
uncacheAll: function() {
this.stopAll();
var t;
for (var e in a) (t = a[e]) && t.destroy();
for (;t = c.pop(); ) t.destroy();
a = r.createMap(!0);
o = {};
},
_breakCache: null,
_break: function() {
this._breakCache = [];
for (var t in a) {
var e = a[t];
if (e.getState() === i.State.PLAYING) {
this._breakCache.push(t);
e.pause();
}
}
},
_restore: function() {
if (this._breakCache) {
for (;this._breakCache.length > 0; ) {
var t = this._breakCache.pop(), e = h(t);
e && e.resume && e.resume();
}
this._breakCache = null;
}
},
_music: {
id: -1,
loop: !1,
volume: 1
},
_effect: {
volume: 1,
pauseCache: []
},
playMusic: function(t, e) {
var i = this._music;
this.stop(i.id);
i.id = this.play(t, e, i.volume);
i.loop = e;
return i.id;
},
stopMusic: function() {
this.stop(this._music.id);
},
pauseMusic: function() {
this.pause(this._music.id);
return this._music.id;
},
resumeMusic: function() {
this.resume(this._music.id);
return this._music.id;
},
getMusicVolume: function() {
return this._music.volume;
},
setMusicVolume: function(t) {
t = f(t);
var e = this._music;
e.volume = t;
this.setVolume(e.id, e.volume);
return e.volume;
},
isMusicPlaying: function() {
return this.getState(this._music.id) === this.AudioState.PLAYING;
},
playEffect: function(t, e) {
return this.play(t, e || !1, this._effect.volume);
},
setEffectsVolume: function(t) {
t = f(t);
var e = this._music.id;
this._effect.volume = t;
for (var i in a) {
var n = a[i];
n && n.id !== e && _.setVolume(i, t);
}
},
getEffectsVolume: function() {
return this._effect.volume;
},
pauseEffect: function(t) {
return this.pause(t);
},
pauseAllEffects: function() {
var t = this._music.id, e = this._effect;
e.pauseCache.length = 0;
for (var i in a) {
var n = a[i];
if (n && n.id !== t && n.getState() === this.AudioState.PLAYING) {
e.pauseCache.push(i);
n.pause();
}
}
},
resumeEffect: function(t) {
this.resume(t);
},
resumeAllEffects: function() {
for (var t = this._effect.pauseCache, e = 0; e < t.length; ++e) {
var i = t[e], n = a[i];
n && n.resume();
}
},
stopEffect: function(t) {
return this.stop(t);
},
stopAllEffects: function() {
var t = this._music.id;
for (var e in a) {
var i = a[e];
i && i.id !== t && i.getState() === _.AudioState.PLAYING && i.stop();
}
}
};
e.exports = cc.audioEngine = _;
}), {
"../core/assets/CCAudioClip": 59,
"./CCAudio": 20
} ],
22: [ (function(t, e) {
"use strict";
var i, n = t("./platform/utils"), r = (t("../../DebugInfos"), "https://github.com/cocos-creator/engine/blob/master/EngineErrorMap.md");
cc.log = cc.warn = cc.error = cc.assert = console.log.bind ? console.log.bind(console) : console.log;
cc._throw = function(t) {
n.callInNextTick((function() {
throw t;
}));
};
function s(t) {
return function() {
var e = arguments[0], i = t + " " + e + ", please go to " + r + "#" + e + " to see details.";
if (1 === arguments.length) return i;
if (2 === arguments.length) return i + " Arguments: " + arguments[1];
var n = cc.js.shiftArguments.apply(null, arguments);
return i + " Arguments: " + n.join(", ");
};
}
var a = s("Log");
cc.logID = function() {
cc.log(a.apply(null, arguments));
};
var o = s("Warning");
cc.warnID = function() {
cc.warn(o.apply(null, arguments));
};
var c = s("Error");
cc.errorID = function() {
cc.error(c.apply(null, arguments));
};
var u = s("Assert");
cc.assertID = function(t) {
t || cc.assert(!1, u.apply(null, cc.js.shiftArguments.apply(null, arguments)));
};
var l = cc.Enum({
NONE: 0,
INFO: 1,
WARN: 2,
ERROR: 3,
INFO_FOR_WEB_PAGE: 4,
WARN_FOR_WEB_PAGE: 5,
ERROR_FOR_WEB_PAGE: 6
});
e.exports = cc.debug = {
DebugMode: l,
_resetDebugSetting: function(t) {
cc.log = cc.warn = cc.error = cc.assert = function() {};
if (t !== l.NONE) {
if (t > l.ERROR) {
var e = function(t) {
if (cc.game.canvas) {
if (!i) {
var e = document.createElement("Div");
e.setAttribute("id", "logInfoDiv");
e.setAttribute("width", "200");
e.setAttribute("height", cc.game.canvas.height);
var n = e.style;
n.zIndex = "99999";
n.position = "absolute";
n.top = n.left = "0";
(i = document.createElement("textarea")).setAttribute("rows", "20");
i.setAttribute("cols", "30");
i.setAttribute("disabled", "true");
var r = i.style;
r.backgroundColor = "transparent";
r.borderBottom = "1px solid #cccccc";
r.borderTopWidth = r.borderLeftWidth = r.borderRightWidth = "0px";
r.borderTopStyle = r.borderLeftStyle = r.borderRightStyle = "none";
r.padding = "0px";
r.margin = 0;
e.appendChild(i);
cc.game.canvas.parentNode.appendChild(e);
}
i.value = i.value + t + "\r\n";
i.scrollTop = i.scrollHeight;
}
};
cc.error = function() {
e("ERROR :  " + cc.js.formatStr.apply(null, arguments));
};
cc.assert = function(t, i) {
if (!t && i) {
i = cc.js.formatStr.apply(null, cc.js.shiftArguments.apply(null, arguments));
e("ASSERT: " + i);
}
};
t !== l.ERROR_FOR_WEB_PAGE && (cc.warn = function() {
e("WARN :  " + cc.js.formatStr.apply(null, arguments));
});
t === l.INFO_FOR_WEB_PAGE && (cc.log = function() {
e(cc.js.formatStr.apply(null, arguments));
});
} else if (console && console.log.apply) {
console.error || (console.error = console.log);
console.warn || (console.warn = console.log);
console.error.bind ? cc.error = console.error.bind(console) : cc.error = console.error;
cc.assert = function(t, e) {
if (!t) {
e && (e = cc.js.formatStr.apply(null, cc.js.shiftArguments.apply(null, arguments)));
throw new Error(e);
}
};
}
t !== l.ERROR && (console.warn.bind ? cc.warn = console.warn.bind(console) : cc.warn = console.warn);
t === l.INFO && ("JavaScriptCore" === scriptEngineType ? cc.log = function() {
return console.log.apply(console, arguments);
} : cc.log = console.log);
}
},
getError: s("ERROR"),
isDisplayStats: function() {
return !!cc.profiler && cc.profiler.isShowingStats();
},
setDisplayStats: function(t) {
if (cc.profiler && cc.game.renderType !== cc.game.RENDER_TYPE_CANVAS) {
t ? cc.profiler.showStats() : cc.profiler.hideStats();
cc.game.config.showFPS = !!t;
}
}
};
}), {
"../../DebugInfos": void 0,
"./platform/utils": 152
} ],
23: [ (function(t, e) {
"use strict";
var i = t("./event/event-target"), n = t("./component-scheduler"), r = t("./node-activator"), s = t("./platform/CCObject"), a = t("./CCGame"), o = t("./renderer"), c = t("./event-manager"), u = t("./CCScheduler");
cc.Director = function() {
i.call(this);
this._paused = !1;
this._purgeDirectorInNextLoop = !1;
this._winSizeInPoints = null;
this._scene = null;
this._loadingScene = "";
this._totalFrames = 0;
this._lastUpdate = 0;
this._deltaTime = 0;
this._startTime = 0;
this._maxParticleDeltaTime = 0;
this._scheduler = null;
this._compScheduler = null;
this._nodeActivator = null;
this._actionManager = null;
var t = this;
a.on(a.EVENT_SHOW, (function() {
t._lastUpdate = performance.now();
}));
a.once(a.EVENT_ENGINE_INITED, this.init, this);
};
cc.Director.prototype = {
constructor: cc.Director,
init: function() {
this._totalFrames = 0;
this._lastUpdate = performance.now();
this._startTime = this._lastUpdate;
this._paused = !1;
this._purgeDirectorInNextLoop = !1;
this._winSizeInPoints = cc.size(0, 0);
this._scheduler = new u();
if (cc.ActionManager) {
this._actionManager = new cc.ActionManager();
this._scheduler.scheduleUpdate(this._actionManager, u.PRIORITY_SYSTEM, !1);
} else this._actionManager = null;
this.sharedInit();
return !0;
},
sharedInit: function() {
this._compScheduler = new n();
this._nodeActivator = new r();
c && c.setEnabled(!0);
if (cc.AnimationManager) {
this._animationManager = new cc.AnimationManager();
this._scheduler.scheduleUpdate(this._animationManager, u.PRIORITY_SYSTEM, !1);
} else this._animationManager = null;
if (cc.CollisionManager) {
this._collisionManager = new cc.CollisionManager();
this._scheduler.scheduleUpdate(this._collisionManager, u.PRIORITY_SYSTEM, !1);
} else this._collisionManager = null;
if (cc.PhysicsManager) {
this._physicsManager = new cc.PhysicsManager();
this._scheduler.scheduleUpdate(this._physicsManager, u.PRIORITY_SYSTEM, !1);
} else this._physicsManager = null;
cc.Physics3DManager;
this._physics3DManager = null;
cc._widgetManager && cc._widgetManager.init(this);
},
calculateDeltaTime: function(t) {
t || (t = performance.now());
this._deltaTime = t > this._lastUpdate ? (t - this._lastUpdate) / 1e3 : 0;
this._lastUpdate = t;
},
convertToGL: function(t) {
var e = a.container, i = cc.view, n = e.getBoundingClientRect(), r = n.left + window.pageXOffset - e.clientLeft, s = n.top + window.pageYOffset - e.clientTop, o = i._devicePixelRatio * (t.x - r), c = i._devicePixelRatio * (s + n.height - t.y);
return i._isRotated ? cc.v2(i._viewportRect.width - c, o) : cc.v2(o, c);
},
convertToUI: function(t) {
var e = a.container, i = cc.view, n = e.getBoundingClientRect(), r = n.left + window.pageXOffset - e.clientLeft, s = n.top + window.pageYOffset - e.clientTop, o = cc.v2(0, 0);
if (i._isRotated) {
o.x = r + t.y / i._devicePixelRatio;
o.y = s + n.height - (i._viewportRect.width - t.x) / i._devicePixelRatio;
} else {
o.x = r + t.x * i._devicePixelRatio;
o.y = s + n.height - t.y * i._devicePixelRatio;
}
return o;
},
end: function() {
this._purgeDirectorInNextLoop = !0;
},
getWinSize: function() {
return cc.size(cc.winSize);
},
getWinSizeInPixels: function() {
return cc.size(cc.winSize);
},
pause: function() {
this._paused || (this._paused = !0);
},
purgeCachedData: function() {
cc.assetManager.releaseAll();
},
purgeDirector: function() {
this._scheduler.unscheduleAll();
this._compScheduler.unscheduleAll();
this._nodeActivator.reset();
c && c.setEnabled(!1);
cc.isValid(this._scene) && this._scene.destroy();
this._scene = null;
cc.renderer.clear();
cc.assetManager.builtins.clear();
cc.game.pause();
cc.assetManager.releaseAll();
},
reset: function() {
this.purgeDirector();
c && c.setEnabled(!0);
this._actionManager && this._scheduler.scheduleUpdate(this._actionManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
this._animationManager && this._scheduler.scheduleUpdate(this._animationManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
this._collisionManager && this._scheduler.scheduleUpdate(this._collisionManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
this._physicsManager && this._scheduler.scheduleUpdate(this._physicsManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
cc.game.resume();
},
runSceneImmediate: function(t, e, i) {
cc.assertID(t instanceof cc.Scene || t instanceof cc.SceneAsset, 1216);
t instanceof cc.SceneAsset && (t = t.scene);
t._load();
for (var n = Object.keys(a._persistRootNodes).map((function(t) {
return a._persistRootNodes[t];
})), r = 0; r < n.length; r++) {
var o = n[r], c = t.getChildByUuid(o.uuid);
if (c) {
var u = c.getSiblingIndex();
c._destroyImmediate();
t.insertChild(o, u);
} else o.parent = t;
}
var l = this._scene;
cc.assetManager._releaseManager._autoRelease(l, t, n);
cc.isValid(l) && l.destroy();
this._scene = null;
s._deferredDestroy();
e && e();
this.emit(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, t);
this._scene = t;
t._activate();
cc.game.resume();
i && i(null, t);
this.emit(cc.Director.EVENT_AFTER_SCENE_LAUNCH, t);
},
runScene: function(t, e, i) {
cc.assertID(t, 1205);
cc.assertID(t instanceof cc.Scene || t instanceof cc.SceneAsset, 1216);
t instanceof cc.SceneAsset && (t = t.scene);
t._load();
this.once(cc.Director.EVENT_AFTER_DRAW, (function() {
this.runSceneImmediate(t, e, i);
}), this);
},
loadScene: function(t, e, i) {
if (this._loadingScene) {
cc.warnID(1208, t, this._loadingScene);
return !1;
}
var n = cc.assetManager.bundles.find((function(e) {
return e.getSceneInfo(t);
}));
if (n) {
this.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, t);
this._loadingScene = t;
var r = this;
console.time("LoadScene " + t);
n.loadScene(t, (function(n, s) {
console.timeEnd("LoadScene " + t);
r._loadingScene = "";
if (n) {
n = "Failed to load scene: " + n;
cc.error(n);
e && e(n);
} else r.runSceneImmediate(s, i, e);
}));
return !0;
}
cc.errorID(1209, t);
return !1;
},
preloadScene: function(t, e, i) {
var n = cc.assetManager.bundles.find((function(e) {
return e.getSceneInfo(t);
}));
if (!n) {
cc.errorID(1209, t);
return null;
}
n.preloadScene(t, null, e, i);
},
resume: function() {
if (this._paused) {
this._lastUpdate = performance.now();
this._lastUpdate || cc.logID(1200);
this._paused = !1;
this._deltaTime = 0;
}
},
setDepthTest: function(t) {
cc.Camera.main && (cc.Camera.main.depth = !!t);
},
setClearColor: function(t) {
cc.Camera.main && (cc.Camera.main.backgroundColor = t);
},
getRunningScene: function() {
return this._scene;
},
getScene: function() {
return this._scene;
},
getAnimationInterval: function() {
return 1e3 / a.getFrameRate();
},
setAnimationInterval: function(t) {
a.setFrameRate(Math.round(1e3 / t));
},
getDeltaTime: function() {
return this._deltaTime;
},
getTotalTime: function() {
return performance.now() - this._startTime;
},
getTotalFrames: function() {
return this._totalFrames;
},
isPaused: function() {
return this._paused;
},
getScheduler: function() {
return this._scheduler;
},
setScheduler: function(t) {
this._scheduler !== t && (this._scheduler = t);
},
getActionManager: function() {
return this._actionManager;
},
setActionManager: function(t) {
if (this._actionManager !== t) {
this._actionManager && this._scheduler.unscheduleUpdate(this._actionManager);
this._actionManager = t;
this._scheduler.scheduleUpdate(this._actionManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
}
},
getAnimationManager: function() {
return this._animationManager;
},
getCollisionManager: function() {
return this._collisionManager;
},
getPhysicsManager: function() {
return this._physicsManager;
},
getPhysics3DManager: function() {
return this._physics3DManager;
},
startAnimation: function() {
cc.game.resume();
},
stopAnimation: function() {
cc.game.pause();
},
_resetDeltaTime: function() {
this._lastUpdate = performance.now();
this._deltaTime = 0;
},
mainLoop: function(t) {
if (this._purgeDirectorInNextLoop) {
this._purgeDirectorInNextLoop = !1;
this.purgeDirector();
} else {
this.calculateDeltaTime(t);
if (!this._paused) {
this.emit(cc.Director.EVENT_BEFORE_UPDATE);
this._compScheduler.startPhase();
this._compScheduler.updatePhase(this._deltaTime);
this._scheduler.update(this._deltaTime);
this._compScheduler.lateUpdatePhase(this._deltaTime);
this.emit(cc.Director.EVENT_AFTER_UPDATE);
s._deferredDestroy();
}
this.emit(cc.Director.EVENT_BEFORE_DRAW);
o.render(this._scene, this._deltaTime);
this.emit(cc.Director.EVENT_AFTER_DRAW);
c.frameUpdateListeners();
this._totalFrames++;
}
},
__fastOn: function(t, e, i) {
this.on(t, e, i);
},
__fastOff: function(t, e, i) {
this.off(t, e, i);
}
};
cc.js.addon(cc.Director.prototype, i.prototype);
cc.Director.EVENT_PROJECTION_CHANGED = "director_projection_changed";
cc.Director.EVENT_BEFORE_SCENE_LOADING = "director_before_scene_loading";
cc.Director.EVENT_BEFORE_SCENE_LAUNCH = "director_before_scene_launch";
cc.Director.EVENT_AFTER_SCENE_LAUNCH = "director_after_scene_launch";
cc.Director.EVENT_BEFORE_UPDATE = "director_before_update";
cc.Director.EVENT_AFTER_UPDATE = "director_after_update";
cc.Director.EVENT_BEFORE_VISIT = "director_before_draw";
cc.Director.EVENT_AFTER_VISIT = "director_before_draw";
cc.Director.EVENT_BEFORE_DRAW = "director_before_draw";
cc.Director.EVENT_AFTER_DRAW = "director_after_draw";
cc.Director.PROJECTION_2D = 0;
cc.Director.PROJECTION_3D = 1;
cc.Director.PROJECTION_CUSTOM = 3;
cc.Director.PROJECTION_DEFAULT = cc.Director.PROJECTION_2D;
cc.Director.EVENT_BEFORE_PHYSICS = "director_before_physics";
cc.Director.EVENT_AFTER_PHYSICS = "director_after_physics";
cc.director = new cc.Director();
e.exports = cc.director;
}), {
"./CCGame": 24,
"./CCScheduler": 28,
"./component-scheduler": 88,
"./event-manager": 116,
"./event/event-target": 118,
"./node-activator": 127,
"./platform/CCObject": 134,
"./renderer": 159
} ],
24: [ (function(t, e) {
"use strict";
var i = t("./event/event-target");
t("../audio/CCAudioEngine");
var n = t("./CCDebug"), r = t("./renderer/index.js"), s = t("../core/renderer/utils/dynamic-atlas/manager"), a = {
EVENT_HIDE: "game_on_hide",
EVENT_SHOW: "game_on_show",
EVENT_RESTART: "game_on_restart",
EVENT_GAME_INITED: "game_inited",
EVENT_ENGINE_INITED: "engine_inited",
EVENT_RENDERER_INITED: "engine_inited",
RENDER_TYPE_CANVAS: 0,
RENDER_TYPE_WEBGL: 1,
RENDER_TYPE_OPENGL: 2,
_persistRootNodes: {},
_paused: !0,
_configLoaded: !1,
_isCloning: !1,
_prepared: !1,
_rendererInitialized: !1,
_renderContext: null,
_intervalId: null,
_lastTime: null,
_frameTime: null,
frame: null,
container: null,
canvas: null,
renderType: -1,
config: null,
onStart: null,
setFrameRate: function(t) {
this.config.frameRate = t;
this._intervalId && window.cancelAnimFrame(this._intervalId);
this._intervalId = 0;
this._paused = !0;
this._setAnimFrame();
this._runMainLoop();
},
getFrameRate: function() {
return this.config.frameRate;
},
step: function() {
cc.director.mainLoop();
},
pause: function() {
if (!this._paused) {
this._paused = !0;
cc.audioEngine && cc.audioEngine._break();
this._intervalId && window.cancelAnimFrame(this._intervalId);
this._intervalId = 0;
}
},
resume: function() {
if (this._paused) {
this._paused = !1;
cc.audioEngine && cc.audioEngine._restore();
cc.director._resetDeltaTime();
this._runMainLoop();
}
},
isPaused: function() {
return this._paused;
},
restart: function() {
cc.director.once(cc.Director.EVENT_AFTER_DRAW, (function() {
for (var t in a._persistRootNodes) a.removePersistRootNode(a._persistRootNodes[t]);
cc.director.getScene().destroy();
cc.Object._deferredDestroy();
cc.audioEngine && cc.audioEngine.uncacheAll();
cc.director.reset();
a.pause();
cc.assetManager.builtins.init((function() {
a.onStart();
a.emit(a.EVENT_RESTART);
}));
}));
},
end: function() {
close();
},
_initEngine: function() {
if (!this._rendererInitialized) {
this._initRenderer();
this._initEvents();
this.emit(this.EVENT_ENGINE_INITED);
}
},
_loadPreviewScript: function(t) {
t();
},
_prepareFinished: function(t) {
var e = this;
this._initEngine();
this._setAnimFrame();
cc.assetManager.builtins.init((function() {
console.log("Cocos Creator v" + cc.ENGINE_VERSION);
e._prepared = !0;
e._runMainLoop();
e.emit(e.EVENT_GAME_INITED);
t && t();
}));
},
eventTargetOn: i.prototype.on,
eventTargetOnce: i.prototype.once,
on: function(t, e, i, n) {
this._prepared && t === this.EVENT_ENGINE_INITED || !this._paused && t === this.EVENT_GAME_INITED ? e.call(i) : this.eventTargetOn(t, e, i, n);
},
once: function(t, e, i) {
this._prepared && t === this.EVENT_ENGINE_INITED || !this._paused && t === this.EVENT_GAME_INITED ? e.call(i) : this.eventTargetOnce(t, e, i);
},
prepare: function(t) {
var e = this;
this._prepared ? t && t() : this._loadPreviewScript((function() {
e._prepareFinished(t);
}));
},
run: function(t, e) {
this._initConfig(t);
this.onStart = e;
this.prepare(a.onStart && a.onStart.bind(a));
},
addPersistRootNode: function(t) {
if (cc.Node.isNode(t) && t.uuid) {
var e = t.uuid;
if (!this._persistRootNodes[e]) {
var i = cc.director._scene;
if (cc.isValid(i)) if (t.parent) {
if (!(t.parent instanceof cc.Scene)) {
cc.warnID(3801);
return;
}
if (t.parent !== i) {
cc.warnID(3802);
return;
}
} else t.parent = i;
this._persistRootNodes[e] = t;
t._persistNode = !0;
cc.assetManager._releaseManager._addPersistNodeRef(t);
}
} else cc.warnID(3800);
},
removePersistRootNode: function(t) {
var e = t.uuid || "";
if (t === this._persistRootNodes[e]) {
delete this._persistRootNodes[e];
t._persistNode = !1;
cc.assetManager._releaseManager._removePersistNodeRef(t);
}
},
isPersistRootNode: function(t) {
return t._persistNode;
},
_setAnimFrame: function() {
this._lastTime = performance.now();
var t = a.config.frameRate;
this._frameTime = 1e3 / t;
cc.director._maxParticleDeltaTime = this._frameTime / 1e3 * 2;
jsb.setPreferredFramesPerSecond(t);
window.requestAnimFrame = window.requestAnimationFrame;
window.cancelAnimFrame = window.cancelAnimationFrame;
},
_stTime: function(t) {
var e = performance.now(), i = Math.max(0, a._frameTime - (e - a._lastTime)), n = window.setTimeout((function() {
t();
}), i);
a._lastTime = e + i;
return n;
},
_ctTime: function(t) {
window.clearTimeout(t);
},
_runMainLoop: function() {
if (this._prepared) {
var t, e = this, i = e.config, r = cc.director;
i.frameRate;
n.setDisplayStats(i.showFPS);
t = function(i) {
if (!e._paused) {
e._intervalId = window.requestAnimFrame(t);
r.mainLoop(i);
}
};
e._intervalId = window.requestAnimFrame(t);
e._paused = !1;
}
},
_initConfig: function(t) {
"number" != typeof t.debugMode && (t.debugMode = 0);
t.exposeClassName = !!t.exposeClassName;
"number" != typeof t.frameRate && (t.frameRate = 60);
var e = t.renderMode;
("number" != typeof e || e > 2 || e < 0) && (t.renderMode = 0);
"boolean" != typeof t.registerSystemEvent && (t.registerSystemEvent = !0);
t.showFPS = 1 !== e && !!t.showFPS;
this.collisionMatrix = t.collisionMatrix || [];
this.groupList = t.groupList || [];
n._resetDebugSetting(t.debugMode);
this.config = t;
this._configLoaded = !0;
},
_determineRenderType: function() {
var t = this.config, e = parseInt(t.renderMode) || 0;
this.renderType = this.RENDER_TYPE_CANVAS;
var i = !1;
if (0 === e) {
if (cc.sys.capabilities.opengl) {
this.renderType = this.RENDER_TYPE_WEBGL;
i = !0;
} else if (cc.sys.capabilities.canvas) {
this.renderType = this.RENDER_TYPE_CANVAS;
i = !0;
}
} else if (1 === e && cc.sys.capabilities.canvas) {
this.renderType = this.RENDER_TYPE_CANVAS;
i = !0;
} else if (2 === e && cc.sys.capabilities.opengl) {
this.renderType = this.RENDER_TYPE_WEBGL;
i = !0;
}
if (!i) throw new Error(n.getError(3820, e));
},
_initRenderer: function() {
if (!this._rendererInitialized) {
var t, e;
this.config.id;
this.container = e = document.createElement("DIV");
this.frame = e.parentNode === document.body ? document.documentElement : e.parentNode;
t = window.__canvas;
this.canvas = t;
this._determineRenderType();
if (this.renderType === this.RENDER_TYPE_WEBGL) {
var i = {
stencil: !0,
antialias: cc.macro.ENABLE_WEBGL_ANTIALIAS,
alpha: cc.macro.ENABLE_TRANSPARENT_CANVAS
};
r.initWebGL(t, i);
this._renderContext = r.device._gl;
!cc.macro.CLEANUP_IMAGE_CACHE && s && (s.enabled = !0);
}
if (!this._renderContext) {
this.renderType = this.RENDER_TYPE_CANVAS;
r.initCanvas(t);
this._renderContext = r.device._ctx;
}
this.canvas.oncontextmenu = function() {
if (!cc._isContextMenuEnable) return !1;
};
this._rendererInitialized = !0;
}
},
_initEvents: function() {
var t, e = window;
this.config.registerSystemEvent && cc.internal.inputManager.registerSystemEvent(this.canvas);
"undefined" != typeof document.hidden ? t = "hidden" : "undefined" != typeof document.mozHidden ? t = "mozHidden" : "undefined" != typeof document.msHidden ? t = "msHidden" : "undefined" != typeof document.webkitHidden && (t = "webkitHidden");
var i = !1;
function n() {
if (!i) {
i = !0;
a.emit(a.EVENT_HIDE);
}
}
function r(t, e, n, r, s) {
if (i) {
i = !1;
a.emit(a.EVENT_SHOW, t, e, n, r, s);
}
}
if (t) for (var s = [ "visibilitychange", "mozvisibilitychange", "msvisibilitychange", "webkitvisibilitychange", "qbrowserVisibilityChange" ], o = 0; o < s.length; o++) document.addEventListener(s[o], (function(e) {
var i = document[t];
(i = i || e.hidden) ? n() : r();
})); else {
e.addEventListener("blur", n);
e.addEventListener("focus", r);
}
navigator.userAgent.indexOf("MicroMessenger") > -1 && (e.onfocus = r);
if ("onpageshow" in window && "onpagehide" in window) {
e.addEventListener("pagehide", n);
e.addEventListener("pageshow", r);
document.addEventListener("pagehide", n);
document.addEventListener("pageshow", r);
}
this.on(a.EVENT_HIDE, (function() {
a.pause();
}));
this.on(a.EVENT_SHOW, (function() {
a.resume();
}));
}
};
i.call(a);
cc.js.addon(a, i.prototype);
cc.game = e.exports = a;
}), {
"../audio/CCAudioEngine": 21,
"../core/renderer/utils/dynamic-atlas/manager": void 0,
"./CCDebug": 22,
"./event/event-target": 118,
"./renderer/index.js": 159
} ],
25: [ (function(t, e) {
"use strict";
var i = t("./value-types"), n = t("./utils/base-node"), r = t("./utils/prefab-helper"), s = t("./utils/trans-pool").NodeMemPool, a = t("./utils/affine-transform"), o = t("./event-manager"), c = t("./platform/CCMacro"), u = t("./platform/js"), l = (t("./event/event"), 
t("./event/event-target")), h = t("./renderer/render-flow"), f = cc.Object.Flags.Destroying, _ = Math.PI / 180, d = !!cc.ActionManager, p = function() {}, v = new i.Vec3(), g = new i.Quat(), m = new i.Vec3(), y = new i.Vec3(), E = new i.Quat(), T = new i.Quat(), C = new i.Vec3(), A = new i.Vec3(), S = new i.Vec3(), x = new i.Vec3(), b = new i.Vec3(), R = new i.Quat(), w = new i.Quat(), O = new i.Vec3(), I = new i.Quat(), D = new i.Vec3(), M = new i.Quat(), L = new i.Vec3(), N = new i.Vec3(), P = new i.Quat(), F = new i.Quat(), B = (new i.Quat(), 
cc.mat4()), z = new i.Vec3(), U = new Array(16);
U.length = 0;
var k = cc.Enum({
DEBUG: 31
}), V = cc.Enum({
POSITION: 1,
SCALE: 2,
ROTATION: 4,
SKEW: 8,
TRS: 7,
RS: 6,
TRSS: 15,
PHYSICS_POSITION: 16,
PHYSICS_SCALE: 32,
PHYSICS_ROTATION: 64,
PHYSICS_TRS: 112,
PHYSICS_RS: 96,
ALL_POSITION: 17,
ALL_SCALE: 34,
ALL_ROTATION: 68,
ALL_TRS: 119,
ALL: 65535
}), H = cc.Enum({
TOUCH_START: "touchstart",
TOUCH_MOVE: "touchmove",
TOUCH_END: "touchend",
TOUCH_CANCEL: "touchcancel",
MOUSE_DOWN: "mousedown",
MOUSE_MOVE: "mousemove",
MOUSE_ENTER: "mouseenter",
MOUSE_LEAVE: "mouseleave",
MOUSE_UP: "mouseup",
MOUSE_WHEEL: "mousewheel",
POSITION_CHANGED: "position-changed",
ROTATION_CHANGED: "rotation-changed",
SCALE_CHANGED: "scale-changed",
SIZE_CHANGED: "size-changed",
ANCHOR_CHANGED: "anchor-changed",
COLOR_CHANGED: "color-changed",
CHILD_ADDED: "child-added",
CHILD_REMOVED: "child-removed",
CHILD_REORDER: "child-reorder",
GROUP_CHANGED: "group-changed",
SIBLING_ORDER_CHANGED: "sibling-order-changed"
}), G = [ H.TOUCH_START, H.TOUCH_MOVE, H.TOUCH_END, H.TOUCH_CANCEL ], W = [ H.MOUSE_DOWN, H.MOUSE_ENTER, H.MOUSE_MOVE, H.MOUSE_LEAVE, H.MOUSE_UP, H.MOUSE_WHEEL ], j = !0, Y = function(t) {
if (0 !== t) {
j && cc.warn("`cc.Node.skewX/Y` is deprecated since v2.2.1, please use 3D node instead.", "");
j = !1;
}
}, X = null, q = function(t, e) {
var i = t.getLocation(), n = this.owner;
if (n._hitTest(i, this)) {
e.type = H.TOUCH_START;
e.touch = t;
e.bubbles = !0;
n.dispatchEvent(e);
return !0;
}
return !1;
}, Z = function(t, e) {
var i = this.owner;
e.type = H.TOUCH_MOVE;
e.touch = t;
e.bubbles = !0;
i.dispatchEvent(e);
}, K = function(t, e) {
var i = t.getLocation(), n = this.owner;
n._hitTest(i, this) ? e.type = H.TOUCH_END : e.type = H.TOUCH_CANCEL;
e.touch = t;
e.bubbles = !0;
n.dispatchEvent(e);
}, Q = function(t, e) {
t.getLocation();
var i = this.owner;
e.type = H.TOUCH_CANCEL;
e.touch = t;
e.bubbles = !0;
i.dispatchEvent(e);
}, J = function(t) {
var e = t.getLocation(), i = this.owner;
if (i._hitTest(e, this)) {
t.type = H.MOUSE_DOWN;
t.bubbles = !0;
i.dispatchEvent(t);
}
}, $ = function(t) {
var e = t.getLocation(), i = this.owner;
if (i._hitTest(e, this)) {
if (!this._previousIn) {
if (X && X._mouseListener) {
t.type = H.MOUSE_LEAVE;
X.dispatchEvent(t);
X._mouseListener._previousIn = !1;
}
X = this.owner;
t.type = H.MOUSE_ENTER;
i.dispatchEvent(t);
this._previousIn = !0;
}
t.type = H.MOUSE_MOVE;
t.bubbles = !0;
i.dispatchEvent(t);
} else {
if (!this._previousIn) return;
t.type = H.MOUSE_LEAVE;
i.dispatchEvent(t);
this._previousIn = !1;
X = null;
}
t.stopPropagation();
}, tt = function(t) {
var e = t.getLocation(), i = this.owner;
if (i._hitTest(e, this)) {
t.type = H.MOUSE_UP;
t.bubbles = !0;
i.dispatchEvent(t);
t.stopPropagation();
}
}, et = function(t) {
var e = t.getLocation(), i = this.owner;
if (i._hitTest(e, this)) {
t.type = H.MOUSE_WHEEL;
t.bubbles = !0;
i.dispatchEvent(t);
t.stopPropagation();
}
};
function it(t, e) {
if (e) {
for (var i = 0, n = null, r = t; r && cc.Node.isNode(r); r = r._parent, ++i) if (r.getComponent(e)) {
var s = {
index: i,
node: r
};
n ? n.push(s) : n = [ s ];
}
return n;
}
return null;
}
function nt(t, e) {
if (!(t._objFlags & f)) {
if (t._bubblingListeners) for (var i = 0, n = e.length; i < n; ++i) if (t._bubblingListeners.hasEventListener(e[i])) return !0;
if (t._capturingListeners) for (var r = 0, s = e.length; r < s; ++r) if (t._capturingListeners.hasEventListener(e[r])) return !0;
return !1;
}
return !0;
}
function rt(t, e) {
var i, n;
e.target = t;
U.length = 0;
t._getCapturingTargets(e.type, U);
e.eventPhase = 1;
for (n = U.length - 1; n >= 0; --n) if ((i = U[n])._capturingListeners) {
e.currentTarget = i;
i._capturingListeners.emit(e.type, e, U);
if (e._propagationStopped) {
U.length = 0;
return;
}
}
U.length = 0;
e.eventPhase = 2;
e.currentTarget = t;
t._capturingListeners && t._capturingListeners.emit(e.type, e);
!e._propagationImmediateStopped && t._bubblingListeners && t._bubblingListeners.emit(e.type, e);
if (!e._propagationStopped && e.bubbles) {
t._getBubblingTargets(e.type, U);
e.eventPhase = 3;
for (n = 0; n < U.length; ++n) if ((i = U[n])._bubblingListeners) {
e.currentTarget = i;
i._bubblingListeners.emit(e.type, e);
if (e._propagationStopped) {
U.length = 0;
return;
}
}
}
U.length = 0;
}
function st(t) {
var e = t.groupIndex;
0 === e && t.parent && (e = st(t.parent));
return e;
}
function at(t) {
var e = st(t);
t._cullingMask = 1 << e;
t._proxy && t._proxy.updateCullingMask();
for (var i = 0; i < t._children.length; i++) at(t._children[i]);
}
function ot() {
if (this._localMatDirty & V.TRSS) {
var t = this._matrix, e = t.m;
i.Trs.toMat4(t, this._trs);
if (this._skewX || this._skewY) {
var n = e[0], r = e[1], s = e[4], a = e[5], o = Math.tan(this._skewX * _), c = Math.tan(this._skewY * _);
Infinity === o && (o = 99999999);
Infinity === c && (c = 99999999);
e[0] = n + s * c;
e[1] = r + a * c;
e[4] = s + n * o;
e[5] = a + r * o;
}
this._localMatDirty &= ~V.TRSS;
this._worldMatDirty = !0;
}
}
function ct() {
var t = this._localMatDirty;
if (t & V.TRSS) {
var e = this._matrix.m, i = this._trs;
if (t & (V.RS | V.SKEW)) {
var n = -this._eulerAngles.z, r = this._skewX || this._skewY, s = i[7], a = i[8];
if (n || r) {
var o = 1, c = 0, u = 0, l = 1;
if (n) {
var h = n * _;
u = Math.sin(h);
o = l = Math.cos(h);
c = -u;
}
e[0] = o *= s;
e[1] = c *= s;
e[4] = u *= a;
e[5] = l *= a;
if (r) {
var f = e[0], d = e[1], p = e[4], v = e[5], g = Math.tan(this._skewX * _), m = Math.tan(this._skewY * _);
Infinity === g && (g = 99999999);
Infinity === m && (m = 99999999);
e[0] = f + p * m;
e[1] = d + v * m;
e[4] = p + f * g;
e[5] = v + d * g;
}
} else {
e[0] = s;
e[1] = 0;
e[4] = 0;
e[5] = a;
}
}
e[12] = i[0];
e[13] = i[1];
this._localMatDirty &= ~V.TRSS;
this._worldMatDirty = !0;
}
}
function ut() {
this._localMatDirty & V.TRSS && this._updateLocalMatrix();
if (this._parent) {
var t = this._parent._worldMatrix;
i.Mat4.mul(this._worldMatrix, t, this._matrix);
} else i.Mat4.copy(this._worldMatrix, this._matrix);
this._worldMatDirty = !1;
}
function lt() {
this._localMatDirty & V.TRSS && this._updateLocalMatrix();
var t = this._parent;
t ? this._mulMat(this._worldMatrix, t._worldMatrix, this._matrix) : i.Mat4.copy(this._worldMatrix, this._matrix);
this._worldMatDirty = !1;
}
function ht(t, e, i) {
var n = e.m, r = i.m, s = t.m, a = n[0], o = n[1], c = n[4], u = n[5], l = n[12], h = n[13], f = r[0], _ = r[1], d = r[4], p = r[5], v = r[12], g = r[13];
if (0 !== o || 0 !== c) {
s[0] = f * a + _ * c;
s[1] = f * o + _ * u;
s[4] = d * a + p * c;
s[5] = d * o + p * u;
s[12] = a * v + c * g + l;
s[13] = o * v + u * g + h;
} else {
s[0] = f * a;
s[1] = _ * u;
s[4] = d * a;
s[5] = p * u;
s[12] = a * v + l;
s[13] = u * g + h;
}
}
var ft = i.Mat4.mul, _t = {
name: "cc.Node",
extends: n,
properties: {
_opacity: 255,
_color: cc.Color.WHITE,
_contentSize: cc.Size,
_anchorPoint: cc.v2(.5, .5),
_position: void 0,
_scale: void 0,
_trs: null,
_eulerAngles: cc.Vec3,
_skewX: 0,
_skewY: 0,
_zIndex: {
default: void 0,
type: cc.Integer
},
_localZOrder: {
default: 0,
serializable: !1
},
_is3DNode: !1,
_groupIndex: {
default: 0,
formerlySerializedAs: "groupIndex"
},
groupIndex: {
get: function() {
return this._groupIndex;
},
set: function(t) {
this._groupIndex = t;
at(this);
this.emit(H.GROUP_CHANGED, this);
}
},
group: {
get: function() {
return cc.game.groupList[this.groupIndex] || "";
},
set: function(t) {
this.groupIndex = cc.game.groupList.indexOf(t);
}
},
x: {
get: function() {
return this._trs[0];
},
set: function(t) {
var e = this._trs;
if (t !== e[0]) {
e[0] = t;
this.setLocalDirty(V.ALL_POSITION);
1 & this._eventMask && this.emit(H.POSITION_CHANGED);
}
}
},
y: {
get: function() {
return this._trs[1];
},
set: function(t) {
var e = this._trs;
if (t !== e[1]) {
e[1] = t;
this.setLocalDirty(V.ALL_POSITION);
1 & this._eventMask && this.emit(H.POSITION_CHANGED);
}
}
},
z: {
get: function() {
return this._trs[2];
},
set: function(t) {
var e = this._trs;
if (t !== e[2]) {
e[2] = t;
this.setLocalDirty(V.ALL_POSITION);
1 & this._eventMask && this.emit(H.POSITION_CHANGED);
}
}
},
rotation: {
get: function() {
return -this.angle;
},
set: function(t) {
this.angle = -t;
}
},
angle: {
get: function() {
return this._eulerAngles.z;
},
set: function(t) {
i.Vec3.set(this._eulerAngles, 0, 0, t);
i.Trs.fromAngleZ(this._trs, t);
this.setLocalDirty(V.ALL_ROTATION);
4 & this._eventMask && this.emit(H.ROTATION_CHANGED);
}
},
rotationX: {
get: function() {
return this._eulerAngles.x;
},
set: function(t) {
if (this._eulerAngles.x !== t) {
this._eulerAngles.x = t;
this._eulerAngles.x === this._eulerAngles.y ? i.Trs.fromAngleZ(this._trs, -t) : i.Trs.fromEulerNumber(this._trs, t, this._eulerAngles.y, 0);
this.setLocalDirty(V.ALL_ROTATION);
4 & this._eventMask && this.emit(H.ROTATION_CHANGED);
}
}
},
rotationY: {
get: function() {
return this._eulerAngles.y;
},
set: function(t) {
if (this._eulerAngles.y !== t) {
this._eulerAngles.y = t;
this._eulerAngles.x === this._eulerAngles.y ? i.Trs.fromAngleZ(this._trs, -t) : i.Trs.fromEulerNumber(this._trs, this._eulerAngles.x, t, 0);
this.setLocalDirty(V.ALL_ROTATION);
4 & this._eventMask && this.emit(H.ROTATION_CHANGED);
}
}
},
eulerAngles: {
get: function() {
return i.Trs.toEuler(this._eulerAngles, this._trs);
},
set: function(t) {
i.Trs.fromEuler(this._trs, t);
this.setLocalDirty(V.ALL_ROTATION);
4 & this._eventMask && this.emit(H.ROTATION_CHANGED);
}
},
quat: {
get: function() {
var t = this._trs;
return new i.Quat(t[3], t[4], t[5], t[6]);
},
set: function(t) {
this.setRotation(t);
}
},
scale: {
get: function() {
return this._trs[7];
},
set: function(t) {
this.setScale(t);
}
},
scaleX: {
get: function() {
return this._trs[7];
},
set: function(t) {
if (this._trs[7] !== t) {
this._trs[7] = t;
this.setLocalDirty(V.ALL_SCALE);
2 & this._eventMask && this.emit(H.SCALE_CHANGED);
}
}
},
scaleY: {
get: function() {
return this._trs[8];
},
set: function(t) {
if (this._trs[8] !== t) {
this._trs[8] = t;
this.setLocalDirty(V.ALL_SCALE);
2 & this._eventMask && this.emit(H.SCALE_CHANGED);
}
}
},
scaleZ: {
get: function() {
return this._trs[9];
},
set: function(t) {
if (this._trs[9] !== t) {
this._trs[9] = t;
this.setLocalDirty(V.ALL_SCALE);
2 & this._eventMask && this.emit(H.SCALE_CHANGED);
}
}
},
skewX: {
get: function() {
return this._skewX;
},
set: function(t) {
Y(t);
this._skewX = t;
this.setLocalDirty(V.SKEW);
this._proxy.updateSkew();
}
},
skewY: {
get: function() {
return this._skewY;
},
set: function(t) {
Y(t);
this._skewY = t;
this.setLocalDirty(V.SKEW);
this._proxy.updateSkew();
}
},
opacity: {
get: function() {
return this._opacity;
},
set: function(t) {
t = cc.misc.clampf(t, 0, 255);
if (this._opacity !== t) {
this._opacity = t;
this._proxy.updateOpacity();
this._renderFlag |= h.FLAG_OPACITY_COLOR;
}
},
range: [ 0, 255 ]
},
color: {
get: function() {
return this._color.clone();
},
set: function(t) {
if (!this._color.equals(t)) {
this._color.set(t);
this._renderFlag |= h.FLAG_COLOR;
32 & this._eventMask && this.emit(H.COLOR_CHANGED, t);
}
}
},
anchorX: {
get: function() {
return this._anchorPoint.x;
},
set: function(t) {
var e = this._anchorPoint;
if (e.x !== t) {
e.x = t;
16 & this._eventMask && this.emit(H.ANCHOR_CHANGED);
}
}
},
anchorY: {
get: function() {
return this._anchorPoint.y;
},
set: function(t) {
var e = this._anchorPoint;
if (e.y !== t) {
e.y = t;
16 & this._eventMask && this.emit(H.ANCHOR_CHANGED);
}
}
},
width: {
get: function() {
return this._contentSize.width;
},
set: function(t) {
if (t !== this._contentSize.width) {
this._contentSize.width = t;
8 & this._eventMask && this.emit(H.SIZE_CHANGED);
}
}
},
height: {
get: function() {
return this._contentSize.height;
},
set: function(t) {
if (t !== this._contentSize.height) {
this._contentSize.height = t;
8 & this._eventMask && this.emit(H.SIZE_CHANGED);
}
}
},
zIndex: {
get: function() {
return this._localZOrder >> 16;
},
set: function(t) {
if (t > c.MAX_ZINDEX) {
cc.warnID(1636);
t = c.MAX_ZINDEX;
} else if (t < c.MIN_ZINDEX) {
cc.warnID(1637);
t = c.MIN_ZINDEX;
}
if (this.zIndex !== t) {
this._localZOrder = 65535 & this._localZOrder | t << 16;
this.emit(H.SIBLING_ORDER_CHANGED);
this._onSiblingIndexChanged();
}
}
},
is3DNode: {
get: function() {
return this._is3DNode;
},
set: function(t) {
this._is3DNode = t;
this._update3DFunction();
}
},
up: {
get: function() {
return i.Vec3.transformQuat(D, i.Vec3.UP, this.getWorldRotation(M)).clone();
}
},
right: {
get: function() {
return i.Vec3.transformQuat(D, i.Vec3.RIGHT, this.getWorldRotation(M)).clone();
}
},
forward: {
get: function() {
return i.Vec3.transformQuat(D, i.Vec3.FORWARD, this.getWorldRotation(M)).clone();
}
}
},
ctor: function() {
this._reorderChildDirty = !1;
this._widget = null;
this._renderComponent = null;
this._capturingListeners = null;
this._bubblingListeners = null;
this._touchListener = null;
this._mouseListener = null;
this._initDataFromPool();
this._eventMask = 0;
this._cullingMask = 1;
this._childArrivalOrder = 1;
this._proxy = new renderer.NodeProxy(this._spaceInfo.unitID, this._spaceInfo.index, this._id, this._name);
this._proxy.init(this);
this._renderFlag = h.FLAG_TRANSFORM | h.FLAG_OPACITY_COLOR;
},
statics: {
EventType: H,
_LocalDirtyFlag: V,
isNode: function(t) {
return t instanceof dt && (t.constructor === dt || !(t instanceof cc.Scene));
},
BuiltinGroupIndex: k
},
_onSiblingIndexChanged: function() {
this._parent && this._parent._delaySort();
},
_onPreDestroy: function() {
this._onPreDestroyBase();
d && cc.director.getActionManager().removeAllActionsFromTarget(this);
X === this && (X = null);
this._bubblingListeners && this._bubblingListeners.clear();
this._capturingListeners && this._capturingListeners.clear();
if (this._touchListener || this._mouseListener) {
o.removeListeners(this);
if (this._touchListener) {
this._touchListener.owner = null;
this._touchListener.mask = null;
this._touchListener = null;
}
if (this._mouseListener) {
this._mouseListener.owner = null;
this._mouseListener.mask = null;
this._mouseListener = null;
}
}
this._proxy.destroy();
this._proxy = null;
this._backDataIntoPool();
this._reorderChildDirty && cc.director.__fastOff(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
},
_onPostActivated: function(t) {
var e = d ? cc.director.getActionManager() : null;
if (t) {
this._renderFlag |= h.FLAG_WORLD_TRANSFORM;
e && e.resumeTarget(this);
o.resumeTarget(this);
this._checkListenerMask();
} else {
e && e.pauseTarget(this);
o.pauseTarget(this);
}
},
_onHierarchyChanged: function(t) {
this._updateOrderOfArrival();
at(this);
this._parent && this._parent._delaySort();
this._renderFlag |= h.FLAG_WORLD_TRANSFORM;
this._onHierarchyChangedBase(t);
cc._widgetManager && (cc._widgetManager._nodesOrderDirty = !0);
t && this._activeInHierarchy && this._checkListenerMask();
this._proxy.updateParent();
},
_update3DFunction: function() {
if (this._is3DNode) {
this._updateLocalMatrix = ot;
this._calculWorldMatrix = ut;
this._mulMat = ft;
} else {
this._updateLocalMatrix = ct;
this._calculWorldMatrix = lt;
this._mulMat = ht;
}
this._renderComponent && this._renderComponent._on3DNodeChanged && this._renderComponent._on3DNodeChanged();
this._renderFlag |= h.FLAG_TRANSFORM;
this._localMatDirty = V.ALL;
this._proxy.update3DNode();
},
_initDataFromPool: function() {
this._spaceInfo || (this._spaceInfo = s.pop());
var t = this._spaceInfo;
this._matrix = cc.mat4(t.localMat);
i.Mat4.identity(this._matrix);
this._worldMatrix = cc.mat4(t.worldMat);
i.Mat4.identity(this._worldMatrix);
this._localMatDirty = V.ALL;
this._worldMatDirty = !0;
var e = this._trs = t.trs;
e[0] = 0;
e[1] = 0;
e[2] = 0;
e[3] = 0;
e[4] = 0;
e[5] = 0;
e[6] = 1;
e[7] = 1;
e[8] = 1;
e[9] = 1;
},
_backDataIntoPool: function() {
s.push(this._spaceInfo);
this._matrix = null;
this._worldMatrix = null;
this._trs = null;
this._spaceInfo = null;
},
_toEuler: function() {
if (this.is3DNode) i.Trs.toEuler(this._eulerAngles, this._trs); else {
var t = Math.asin(this._trs[5]) / _ * 2;
i.Vec3.set(this._eulerAngles, 0, 0, t);
}
},
_fromEuler: function() {
this.is3DNode ? i.Trs.fromEuler(this._trs, this._eulerAngles) : i.Trs.fromAngleZ(this._trs, this._eulerAngles.z);
},
_initProperties: function() {
this._is3DNode && this._update3DFunction();
var t = this._trs;
if (t) {
var e = t;
t = this._trs = this._spaceInfo.trs;
11 === e.length ? t.set(e.subarray(1)) : t.set(e);
} else t = this._trs = this._spaceInfo.trs;
this._fromEuler();
this._renderFlag |= h.FLAG_TRANSFORM | h.FLAG_OPACITY_COLOR;
},
_onBatchCreated: function(t) {
this._initProperties();
this._cullingMask = 1 << st(this);
this._proxy && this._proxy.updateCullingMask();
if (!this._activeInHierarchy) {
d && cc.director.getActionManager().pauseTarget(this);
o.pauseTarget(this);
}
for (var e = this._children, i = 0, n = e.length; i < n; i++) {
var s = e[i];
if (!t) {
var a = s._prefab;
a && a.sync && a.root === s && r.syncWithPrefab(s);
s._updateOrderOfArrival();
}
s._onBatchCreated(t);
}
e.length > 0 && (this._renderFlag |= h.FLAG_CHILDREN);
this._proxy.initNative();
},
_checkListenerMask: function() {
if (this._touchListener) {
var t = this._touchListener.mask = it(this, cc.Mask);
this._mouseListener && (this._mouseListener.mask = t);
} else this._mouseListener && (this._mouseListener.mask = it(this, cc.Mask));
},
_checknSetupSysEvent: function(t) {
var e = !1, i = !1;
if (-1 !== G.indexOf(t)) {
if (!this._touchListener) {
this._touchListener = cc.EventListener.create({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
owner: this,
mask: it(this, cc.Mask),
onTouchBegan: q,
onTouchMoved: Z,
onTouchEnded: K,
onTouchCancelled: Q
});
o.addListener(this._touchListener, this);
e = !0;
}
i = !0;
} else if (-1 !== W.indexOf(t)) {
if (!this._mouseListener) {
this._mouseListener = cc.EventListener.create({
event: cc.EventListener.MOUSE,
_previousIn: !1,
owner: this,
mask: it(this, cc.Mask),
onMouseDown: J,
onMouseMove: $,
onMouseUp: tt,
onMouseScroll: et
});
o.addListener(this._mouseListener, this);
e = !0;
}
i = !0;
}
e && !this._activeInHierarchy && cc.director.getScheduler().schedule((function() {
this._activeInHierarchy || o.pauseTarget(this);
}), this, 0, 0, 0, !1);
return i;
},
on: function(t, e, i, n) {
if (this._checknSetupSysEvent(t)) return this._onDispatch(t, e, i, n);
switch (t) {
case H.POSITION_CHANGED:
this._eventMask |= 1;
break;

case H.SCALE_CHANGED:
this._eventMask |= 2;
break;

case H.ROTATION_CHANGED:
this._eventMask |= 4;
break;

case H.SIZE_CHANGED:
this._eventMask |= 8;
break;

case H.ANCHOR_CHANGED:
this._eventMask |= 16;
break;

case H.COLOR_CHANGED:
this._eventMask |= 32;
}
this._bubblingListeners || (this._bubblingListeners = new l());
return this._bubblingListeners.on(t, e, i);
},
once: function(t, e, i, n) {
var r = this, s = null;
(s = this._checknSetupSysEvent(t) && n ? this._capturingListeners = this._capturingListeners || new l() : this._bubblingListeners = this._bubblingListeners || new l()).once(t, e, i);
s.once(t, (function() {
r.off(t, e, i);
}), void 0);
},
_onDispatch: function(t, e, i, n) {
if ("boolean" == typeof i) {
n = i;
i = void 0;
} else n = !!n;
if (e) {
var r = null;
if (!(r = n ? this._capturingListeners = this._capturingListeners || new l() : this._bubblingListeners = this._bubblingListeners || new l()).hasEventListener(t, e, i)) {
r.on(t, e, i);
i && i.__eventTargets && i.__eventTargets.push(this);
}
return e;
}
cc.errorID(6800);
},
off: function(t, e, i, n) {
var r = -1 !== G.indexOf(t), s = !r && -1 !== W.indexOf(t);
if (r || s) {
this._offDispatch(t, e, i, n);
if (r) {
if (this._touchListener && !nt(this, G)) {
o.removeListener(this._touchListener);
this._touchListener = null;
}
} else if (s && this._mouseListener && !nt(this, W)) {
o.removeListener(this._mouseListener);
this._mouseListener = null;
}
} else if (this._bubblingListeners) {
this._bubblingListeners.off(t, e, i);
if (!this._bubblingListeners.hasEventListener(t)) switch (t) {
case H.POSITION_CHANGED:
this._eventMask &= -2;
break;

case H.SCALE_CHANGED:
this._eventMask &= -3;
break;

case H.ROTATION_CHANGED:
this._eventMask &= -5;
break;

case H.SIZE_CHANGED:
this._eventMask &= -9;
break;

case H.ANCHOR_CHANGED:
this._eventMask &= -17;
break;

case H.COLOR_CHANGED:
this._eventMask &= -33;
}
}
},
_offDispatch: function(t, e, i, n) {
if ("boolean" == typeof i) {
n = i;
i = void 0;
} else n = !!n;
if (e) {
var r = n ? this._capturingListeners : this._bubblingListeners;
if (r) {
r.off(t, e, i);
i && i.__eventTargets && u.array.fastRemove(i.__eventTargets, this);
}
} else {
this._capturingListeners && this._capturingListeners.removeAll(t);
this._bubblingListeners && this._bubblingListeners.removeAll(t);
}
},
targetOff: function(t) {
var e = this._bubblingListeners;
if (e) {
e.targetOff(t);
1 & this._eventMask && !e.hasEventListener(H.POSITION_CHANGED) && (this._eventMask &= -2);
2 & this._eventMask && !e.hasEventListener(H.SCALE_CHANGED) && (this._eventMask &= -3);
4 & this._eventMask && !e.hasEventListener(H.ROTATION_CHANGED) && (this._eventMask &= -5);
8 & this._eventMask && !e.hasEventListener(H.SIZE_CHANGED) && (this._eventMask &= -9);
16 & this._eventMask && !e.hasEventListener(H.ANCHOR_CHANGED) && (this._eventMask &= -17);
32 & this._eventMask && !e.hasEventListener(H.COLOR_CHANGED) && (this._eventMask &= -33);
}
this._capturingListeners && this._capturingListeners.targetOff(t);
t && t.__eventTargets && u.array.fastRemove(t.__eventTargets, this);
if (this._touchListener && !nt(this, G)) {
o.removeListener(this._touchListener);
this._touchListener = null;
}
if (this._mouseListener && !nt(this, W)) {
o.removeListener(this._mouseListener);
this._mouseListener = null;
}
},
hasEventListener: function(t) {
var e = !1;
this._bubblingListeners && (e = this._bubblingListeners.hasEventListener(t));
!e && this._capturingListeners && (e = this._capturingListeners.hasEventListener(t));
return e;
},
emit: function(t, e, i, n, r, s) {
this._bubblingListeners && this._bubblingListeners.emit(t, e, i, n, r, s);
},
dispatchEvent: function(t) {
rt(this, t);
U.length = 0;
},
pauseSystemEvents: function(t) {
o.pauseTarget(this, t);
},
resumeSystemEvents: function(t) {
o.resumeTarget(this, t);
},
_hitTest: function(t, e) {
var n = this._contentSize.width, r = this._contentSize.height, s = L, a = N, o = cc.Camera.findCamera(this);
o ? o.getScreenToWorldPoint(t, s) : s.set(t);
this._updateWorldMatrix();
if (!i.Mat4.invert(B, this._worldMatrix)) return !1;
i.Vec2.transformMat4(a, s, B);
a.x += this._anchorPoint.x * n;
a.y += this._anchorPoint.y * r;
var c = !1;
if (a.x >= 0 && a.y >= 0 && a.x <= n && a.y <= r) {
c = !0;
if (e && e.mask) for (var u = e.mask, l = this, h = u ? u.length : 0, f = 0, _ = 0; l && _ < h; ++f, 
l = l.parent) {
var d = u[_];
if (f === d.index) {
if (l !== d.node) {
u.length = _;
break;
}
var p = l.getComponent(cc.Mask);
if (p && p._enabled && !p._hitTest(s)) {
c = !1;
break;
}
_++;
} else if (f > d.index) {
u.length = _;
break;
}
}
}
return c;
},
_getCapturingTargets: function(t, e) {
for (var i = this.parent; i; ) {
i._capturingListeners && i._capturingListeners.hasEventListener(t) && e.push(i);
i = i.parent;
}
},
_getBubblingTargets: function(t, e) {
for (var i = this.parent; i; ) {
i._bubblingListeners && i._bubblingListeners.hasEventListener(t) && e.push(i);
i = i.parent;
}
},
runAction: d ? function(t) {
if (this.active) {
cc.assertID(t, 1618);
var e = cc.director.getActionManager();
if (!e._suppressDeprecation) {
e._suppressDeprecation = !0;
cc.warnID(1639);
}
e.addAction(t, this, !1);
return t;
}
} : p,
pauseAllActions: d ? function() {
cc.director.getActionManager().pauseTarget(this);
} : p,
resumeAllActions: d ? function() {
cc.director.getActionManager().resumeTarget(this);
} : p,
stopAllActions: d ? function() {
cc.director.getActionManager().removeAllActionsFromTarget(this);
} : p,
stopAction: d ? function(t) {
cc.director.getActionManager().removeAction(t);
} : p,
stopActionByTag: d ? function(t) {
t !== cc.Action.TAG_INVALID ? cc.director.getActionManager().removeActionByTag(t, this) : cc.logID(1612);
} : p,
getActionByTag: d ? function(t) {
if (t === cc.Action.TAG_INVALID) {
cc.logID(1613);
return null;
}
return cc.director.getActionManager().getActionByTag(t, this);
} : function() {
return null;
},
getNumberOfRunningActions: d ? function() {
return cc.director.getActionManager().getNumberOfRunningActionsInTarget(this);
} : function() {
return 0;
},
getPosition: function(t) {
t = t || new i.Vec3();
return i.Trs.toPosition(t, this._trs);
},
setPosition: function(t, e, i) {
var n;
if (void 0 === e) {
n = t.x;
e = t.y;
i = t.z;
} else n = t;
var r = this._trs;
void 0 === i && (i = r[2]);
if (r[0] !== n || r[1] !== e || r[2] !== i) {
r[0] = n;
r[1] = e;
r[2] = i;
this.setLocalDirty(V.ALL_POSITION);
1 & this._eventMask && this.emit(H.POSITION_CHANGED);
}
},
getScale: function(t) {
if (void 0 !== t) return i.Trs.toScale(t, this._trs);
cc.errorID(1400, "cc.Node.getScale", "cc.Node.scale or cc.Node.getScale(cc.Vec3)");
return this._trs[7];
},
setScale: function(t, e, i) {
var n;
if (t && "number" != typeof t) {
n = t.x;
e = t.y;
i = t.z;
} else if (void 0 !== t && void 0 === e) {
n = t;
e = t;
i = t;
} else n = t;
var r = this._trs;
void 0 === i && (i = r[9]);
if (r[7] !== n || r[8] !== e || r[9] !== i) {
r[7] = n;
r[8] = e;
r[9] = i;
this.setLocalDirty(V.ALL_SCALE);
2 & this._eventMask && this.emit(H.SCALE_CHANGED);
}
},
getRotation: function(t) {
return t instanceof i.Quat ? i.Trs.toRotation(t, this._trs) : -this.angle;
},
setRotation: function(t, e, i, n) {
if ("number" == typeof t && void 0 === e) this.angle = -t; else {
var r = t;
if (void 0 === e) {
r = t.x;
e = t.y;
i = t.z;
n = t.w;
}
var s = this._trs;
if (s[3] !== r || s[4] !== e || s[5] !== i || s[6] !== n) {
s[3] = r;
s[4] = e;
s[5] = i;
s[6] = n;
this.setLocalDirty(V.ALL_ROTATION);
4 & this._eventMask && this.emit(H.ROTATION_CHANGED);
}
}
},
getContentSize: function() {
return cc.size(this._contentSize.width, this._contentSize.height);
},
setContentSize: function(t, e) {
var i = this._contentSize;
if (void 0 === e) {
if (t.width === i.width && t.height === i.height) return;
i.width = t.width;
i.height = t.height;
} else {
if (t === i.width && e === i.height) return;
i.width = t;
i.height = e;
}
8 & this._eventMask && this.emit(H.SIZE_CHANGED);
},
getAnchorPoint: function() {
return cc.v2(this._anchorPoint);
},
setAnchorPoint: function(t, e) {
var i = this._anchorPoint;
if (void 0 === e) {
if (t.x === i.x && t.y === i.y) return;
i.x = t.x;
i.y = t.y;
} else {
if (t === i.x && e === i.y) return;
i.x = t;
i.y = e;
}
this.setLocalDirty(V.ALL_POSITION);
16 & this._eventMask && this.emit(H.ANCHOR_CHANGED);
},
_invTransformPoint: function(t, e) {
this._parent ? this._parent._invTransformPoint(t, e) : i.Vec3.copy(t, e);
var n = this._trs;
i.Trs.toPosition(m, n);
i.Vec3.sub(t, t, m);
i.Trs.toRotation(E, n);
i.Quat.conjugate(T, E);
i.Vec3.transformQuat(t, t, T);
i.Trs.toScale(m, n);
i.Vec3.inverseSafe(y, m);
i.Vec3.mul(t, t, y);
return t;
},
getWorldPosition: function(t) {
i.Trs.toPosition(t, this._trs);
for (var e, n = this._parent; n; ) {
e = n._trs;
i.Trs.toScale(v, e);
i.Vec3.mul(t, t, v);
i.Trs.toRotation(g, e);
i.Vec3.transformQuat(t, t, g);
i.Trs.toPosition(v, e);
i.Vec3.add(t, t, v);
n = n._parent;
}
return t;
},
setWorldPosition: function(t) {
var e = this._trs;
this._parent ? this._parent._invTransformPoint(C, t) : i.Vec3.copy(C, t);
i.Trs.fromPosition(e, C);
this.setLocalDirty(V.ALL_POSITION);
1 & this._eventMask && this.emit(H.POSITION_CHANGED);
},
getWorldRotation: function(t) {
i.Trs.toRotation(P, this._trs);
i.Quat.copy(t, P);
for (var e = this._parent; e; ) {
i.Trs.toRotation(P, e._trs);
i.Quat.mul(t, P, t);
e = e._parent;
}
return t;
},
setWorldRotation: function(t) {
if (this._parent) {
this._parent.getWorldRotation(F);
i.Quat.conjugate(F, F);
i.Quat.mul(F, F, t);
} else i.Quat.copy(F, t);
i.Trs.fromRotation(this._trs, F);
this.setLocalDirty(V.ALL_ROTATION);
},
getWorldScale: function(t) {
i.Trs.toScale(A, this._trs);
i.Vec3.copy(t, A);
for (var e = this._parent; e; ) {
i.Trs.toScale(A, e._trs);
i.Vec3.mul(t, t, A);
e = e._parent;
}
return t;
},
setWorldScale: function(t) {
if (this._parent) {
this._parent.getWorldScale(S);
i.Vec3.div(S, t, S);
} else i.Vec3.copy(S, t);
i.Trs.fromScale(this._trs, S);
this.setLocalDirty(V.ALL_SCALE);
},
getWorldRT: function(t) {
var e = x, n = R, r = this._trs;
i.Trs.toPosition(e, r);
i.Trs.toRotation(n, r);
for (var s = this._parent; s; ) {
r = s._trs;
i.Trs.toScale(b, r);
i.Vec3.mul(e, e, b);
i.Trs.toRotation(w, r);
i.Vec3.transformQuat(e, e, w);
i.Trs.toPosition(b, r);
i.Vec3.add(e, e, b);
i.Quat.mul(n, w, n);
s = s._parent;
}
i.Mat4.fromRT(t, n, e);
return t;
},
lookAt: function(t, e) {
this.getWorldPosition(O);
i.Vec3.sub(O, O, t);
i.Vec3.normalize(O, O);
i.Quat.fromViewUp(I, O, e);
this.setWorldRotation(I);
},
_updateLocalMatrix: ct,
_calculWorldMatrix: function() {
this._localMatDirty & V.TRSS && this._updateLocalMatrix();
var t = this._parent;
t ? this._mulMat(this._worldMatrix, t._worldMatrix, this._matrix) : i.Mat4.copy(this._worldMatrix, this._matrix);
this._worldMatDirty = !1;
},
_mulMat: ht,
_updateWorldMatrix: function() {
this._parent && this._parent._updateWorldMatrix();
if (this._worldMatDirty) {
this._calculWorldMatrix();
for (var t = this._children, e = 0, i = t.length; e < i; e++) t[e]._worldMatDirty = !0;
}
},
setLocalDirty: function(t) {
this._localMatDirty |= t;
this._worldMatDirty = !0;
t === V.ALL_POSITION || t === V.POSITION ? this._renderFlag |= h.FLAG_WORLD_TRANSFORM : this._renderFlag |= h.FLAG_TRANSFORM;
},
setWorldDirty: function() {
this._worldMatDirty = !0;
},
getLocalMatrix: function(t) {
this._updateLocalMatrix();
return i.Mat4.copy(t, this._matrix);
},
getWorldMatrix: function(t) {
this._updateWorldMatrix();
return i.Mat4.copy(t, this._worldMatrix);
},
convertToNodeSpaceAR: function(t, e) {
this._updateWorldMatrix();
i.Mat4.invert(B, this._worldMatrix);
if (t instanceof cc.Vec2) {
e = e || new cc.Vec2();
return i.Vec2.transformMat4(e, t, B);
}
e = e || new cc.Vec3();
return i.Vec3.transformMat4(e, t, B);
},
convertToWorldSpaceAR: function(t, e) {
this._updateWorldMatrix();
if (t instanceof cc.Vec2) {
e = e || new cc.Vec2();
return i.Vec2.transformMat4(e, t, this._worldMatrix);
}
e = e || new cc.Vec3();
return i.Vec3.transformMat4(e, t, this._worldMatrix);
},
convertToNodeSpace: function(t) {
this._updateWorldMatrix();
i.Mat4.invert(B, this._worldMatrix);
var e = new cc.Vec2();
i.Vec2.transformMat4(e, t, B);
e.x += this._anchorPoint.x * this._contentSize.width;
e.y += this._anchorPoint.y * this._contentSize.height;
return e;
},
convertToWorldSpace: function(t) {
this._updateWorldMatrix();
var e = new cc.Vec2(t.x - this._anchorPoint.x * this._contentSize.width, t.y - this._anchorPoint.y * this._contentSize.height);
return i.Vec2.transformMat4(e, e, this._worldMatrix);
},
getNodeToParentTransform: function(t) {
t || (t = a.identity());
this._updateLocalMatrix();
var e = this._contentSize;
z.x = -this._anchorPoint.x * e.width;
z.y = -this._anchorPoint.y * e.height;
i.Mat4.copy(B, this._matrix);
i.Mat4.transform(B, B, z);
return a.fromMat4(t, B);
},
getNodeToParentTransformAR: function(t) {
t || (t = a.identity());
this._updateLocalMatrix();
return a.fromMat4(t, this._matrix);
},
getNodeToWorldTransform: function(t) {
t || (t = a.identity());
this._updateWorldMatrix();
var e = this._contentSize;
z.x = -this._anchorPoint.x * e.width;
z.y = -this._anchorPoint.y * e.height;
i.Mat4.copy(B, this._worldMatrix);
i.Mat4.transform(B, B, z);
return a.fromMat4(t, B);
},
getNodeToWorldTransformAR: function(t) {
t || (t = a.identity());
this._updateWorldMatrix();
return a.fromMat4(t, this._worldMatrix);
},
getParentToNodeTransform: function(t) {
t || (t = a.identity());
this._updateLocalMatrix();
i.Mat4.invert(B, this._matrix);
return a.fromMat4(t, B);
},
getWorldToNodeTransform: function(t) {
t || (t = a.identity());
this._updateWorldMatrix();
i.Mat4.invert(B, this._worldMatrix);
return a.fromMat4(t, B);
},
convertTouchToNodeSpace: function(t) {
return this.convertToNodeSpace(t.getLocation());
},
convertTouchToNodeSpaceAR: function(t) {
return this.convertToNodeSpaceAR(t.getLocation());
},
getBoundingBox: function() {
this._updateLocalMatrix();
var t = this._contentSize.width, e = this._contentSize.height, i = cc.rect(-this._anchorPoint.x * t, -this._anchorPoint.y * e, t, e);
return i.transformMat4(i, this._matrix);
},
getBoundingBoxToWorld: function() {
if (this._parent) {
this._parent._updateWorldMatrix();
return this._getBoundingBoxTo();
}
return this.getBoundingBox();
},
_getBoundingBoxTo: function() {
var t = this._contentSize.width, e = this._contentSize.height, i = cc.rect(-this._anchorPoint.x * t, -this._anchorPoint.y * e, t, e);
this._calculWorldMatrix();
i.transformMat4(i, this._worldMatrix);
if (!this._children) return i;
for (var n = this._children, r = 0; r < n.length; r++) {
var s = n[r];
if (s && s.active) {
var a = s._getBoundingBoxTo();
a && i.union(i, a);
}
}
return i;
},
_updateOrderOfArrival: function() {
var t = this._parent ? ++this._parent._childArrivalOrder : 0;
this._localZOrder = 4294901760 & this._localZOrder | t;
this.emit(H.SIBLING_ORDER_CHANGED);
},
addChild: function(t, e, i) {
cc.assertID(t, 1606);
cc.assertID(null === t._parent, 1605);
t.parent = this;
void 0 !== e && (t.zIndex = e);
void 0 !== i && (t.name = i);
},
cleanup: function() {
d && cc.director.getActionManager().removeAllActionsFromTarget(this);
o.removeListeners(this);
var t, e, i = this._children.length;
for (t = 0; t < i; ++t) (e = this._children[t]) && e.cleanup();
},
sortAllChildren: function() {
if (this._reorderChildDirty) {
this._reorderChildDirty = !1;
var t = this._children;
this._childArrivalOrder = 1;
for (var e = 0, i = t.length; e < i; e++) t[e]._updateOrderOfArrival();
o._setDirtyForNode(this);
if (t.length > 1) {
for (var n, r, s = 1, a = t.length; s < a; s++) {
n = t[s];
for (var c = s; c > 0 && (r = t[c - 1])._localZOrder > n._localZOrder; c--) t[c] = r;
t[c] = n;
}
this.emit(H.CHILD_REORDER, this);
}
cc.director.__fastOff(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
}
},
_delaySort: function() {
if (!this._reorderChildDirty) {
this._reorderChildDirty = !0;
cc.director.__fastOn(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
}
},
_restoreProperties: !1,
onRestore: !1
}, dt = cc.Class(_t), pt = dt.prototype;
u.getset(pt, "position", pt.getPosition, pt.setPosition, !1, !0);
cc.Node = e.exports = dt;
}), {
"./event-manager": 116,
"./event/event": 119,
"./event/event-target": 118,
"./platform/CCMacro": 133,
"./platform/js": 149,
"./renderer/render-flow": 160,
"./utils/affine-transform": 188,
"./utils/base-node": 189,
"./utils/prefab-helper": 199,
"./utils/trans-pool": 205,
"./value-types": 211
} ],
26: [ (function(t, e) {
"use strict";
var i = t("./CCNode"), n = (t("./renderer/render-flow"), cc.Object.Flags.HideInHierarchy, 
i._LocalDirtyFlag), r = cc.Class({
name: "cc.PrivateNode",
extends: i,
properties: {
x: {
get: function() {
return this._originPos.x;
},
set: function(t) {
var e = this._originPos;
if (t !== e.x) {
e.x = t;
this._posDirty(!0);
}
},
override: !0
},
y: {
get: function() {
return this._originPos.y;
},
set: function(t) {
var e = this._originPos;
if (t !== e.y) {
e.y = t;
this._posDirty(!0);
}
},
override: !0
},
zIndex: {
get: function() {
return cc.macro.MIN_ZINDEX;
},
set: function() {},
override: !0
},
showInEditor: {
default: !1,
editorOnly: !0,
override: !0
}
},
ctor: function() {
this._localZOrder = cc.macro.MIN_ZINDEX << 16;
this._originPos = cc.v2();
},
_posDirty: function(t) {
this.setLocalDirty(n.POSITION);
!0 === t && 1 & this._eventMask && this.emit(i.EventType.POSITION_CHANGED);
},
_updateLocalMatrix: function() {
if (this._localMatDirty) {
var t = this.parent;
if (t) {
this._trs[0] = this._originPos.x - (t._anchorPoint.x - .5) * t._contentSize.width;
this._trs[1] = this._originPos.y - (t._anchorPoint.y - .5) * t._contentSize.height;
}
this._super();
}
},
getPosition: function() {
return new cc.Vec2(this._originPos);
},
setPosition: function(t, e) {
void 0 === e && (e = (t = t.x).y);
var i = this._originPos;
if (i.x !== t || i.y !== e) {
i.x = t;
i.y = e;
this._posDirty(!0);
}
},
setParent: function(t) {
var e = this._parent;
this._super(t);
if (e !== t) {
e && e.off(i.EventType.ANCHOR_CHANGED, this._posDirty, this);
t && t.on(i.EventType.ANCHOR_CHANGED, this._posDirty, this);
}
},
_updateOrderOfArrival: function() {}
}), s = r.prototype;
cc.js.getset(s, "parent", s.getParent, s.setParent);
cc.js.getset(s, "position", s.getPosition, s.setPosition);
cc.PrivateNode = e.exports = r;
}), {
"./CCNode": 25,
"./renderer/render-flow": 160
} ],
27: [ (function(t, e) {
"use strict";
cc.Scene = cc.Class({
name: "cc.Scene",
extends: t("./CCNode"),
properties: {
_is3DNode: {
default: !0,
override: !0
},
autoReleaseAssets: !1
},
ctor: function() {
this._anchorPoint.x = 0;
this._anchorPoint.y = 0;
this._activeInHierarchy = !1;
this._inited = !cc.game._isCloning;
this.dependAssets = null;
},
destroy: function() {
if (cc.Object.prototype.destroy.call(this)) for (var t = this._children, e = 0; e < t.length; ++e) t[e].active = !1;
this._active = !1;
this._activeInHierarchy = !1;
},
_onHierarchyChanged: function() {},
_instantiate: null,
_load: function() {
if (!this._inited) {
this._onBatchCreated(!1);
this._inited = !0;
}
},
_activate: function(t) {
t = !1 !== t;
cc.director._nodeActivator.activateNode(this, t);
}
});
e.exports = cc.Scene;
}), {
"./CCNode": 25
} ],
28: [ (function(t, e) {
"use strict";
var i = t("./platform/js"), n = new (t("./platform/id-generater"))("Scheduler"), r = function(t, e, i, n) {
this.target = t;
this.priority = e;
this.paused = i;
this.markedForDeletion = n;
}, s = [];
r.get = function(t, e, i, n) {
var a = s.pop();
if (a) {
a.target = t;
a.priority = e;
a.paused = i;
a.markedForDeletion = n;
} else a = new r(t, e, i, n);
return a;
};
r.put = function(t) {
if (s.length < 20) {
t.target = null;
s.push(t);
}
};
var a = function(t, e, i, n) {
this.list = t;
this.entry = e;
this.target = i;
this.callback = n;
}, o = [];
a.get = function(t, e, i, n) {
var r = o.pop();
if (r) {
r.list = t;
r.entry = e;
r.target = i;
r.callback = n;
} else r = new a(t, e, i, n);
return r;
};
a.put = function(t) {
if (o.length < 20) {
t.list = t.entry = t.target = t.callback = null;
o.push(t);
}
};
var c = function(t, e, i, n, r, s) {
var a = this;
a.timers = t;
a.target = e;
a.timerIndex = i;
a.currentTimer = n;
a.currentTimerSalvaged = r;
a.paused = s;
}, u = [];
c.get = function(t, e, i, n, r, s) {
var a = u.pop();
if (a) {
a.timers = t;
a.target = e;
a.timerIndex = i;
a.currentTimer = n;
a.currentTimerSalvaged = r;
a.paused = s;
} else a = new c(t, e, i, n, r, s);
return a;
};
c.put = function(t) {
if (u.length < 20) {
t.timers = t.target = t.currentTimer = null;
u.push(t);
}
};
function l() {
this._lock = !1;
this._scheduler = null;
this._elapsed = -1;
this._runForever = !1;
this._useDelay = !1;
this._timesExecuted = 0;
this._repeat = 0;
this._delay = 0;
this._interval = 0;
this._target = null;
this._callback = null;
}
var h = l.prototype;
h.initWithCallback = function(t, e, i, n, r, s) {
this._lock = !1;
this._scheduler = t;
this._target = i;
this._callback = e;
this._elapsed = -1;
this._interval = n;
this._delay = s;
this._useDelay = this._delay > 0;
this._repeat = r;
this._runForever = this._repeat === cc.macro.REPEAT_FOREVER;
return !0;
};
h.getInterval = function() {
return this._interval;
};
h.setInterval = function(t) {
this._interval = t;
};
h.update = function(t) {
if (-1 === this._elapsed) {
this._elapsed = 0;
this._timesExecuted = 0;
} else {
this._elapsed += t;
if (this._runForever && !this._useDelay) {
if (this._elapsed >= this._interval) {
this.trigger();
this._elapsed = 0;
}
} else {
if (this._useDelay) {
if (this._elapsed >= this._delay) {
this.trigger();
this._elapsed -= this._delay;
this._timesExecuted += 1;
this._useDelay = !1;
}
} else if (this._elapsed >= this._interval) {
this.trigger();
this._elapsed = 0;
this._timesExecuted += 1;
}
this._callback && !this._runForever && this._timesExecuted > this._repeat && this.cancel();
}
}
};
h.getCallback = function() {
return this._callback;
};
h.trigger = function() {
if (this._target && this._callback) {
this._lock = !0;
this._callback.call(this._target, this._elapsed);
this._lock = !1;
}
};
h.cancel = function() {
this._scheduler.unschedule(this._callback, this._target);
};
var f = [];
l.get = function() {
return f.pop() || new l();
};
l.put = function(t) {
if (f.length < 20 && !t._lock) {
t._scheduler = t._target = t._callback = null;
f.push(t);
}
};
cc.Scheduler = function() {
this._timeScale = 1;
this._updatesNegList = [];
this._updates0List = [];
this._updatesPosList = [];
this._hashForUpdates = i.createMap(!0);
this._hashForTimers = i.createMap(!0);
this._currentTarget = null;
this._currentTargetSalvaged = !1;
this._updateHashLocked = !1;
this._arrayForTimers = [];
};
cc.Scheduler.prototype = {
constructor: cc.Scheduler,
_removeHashElement: function(t) {
delete this._hashForTimers[t.target._id];
for (var e = this._arrayForTimers, i = 0, n = e.length; i < n; i++) if (e[i] === t) {
e.splice(i, 1);
break;
}
c.put(t);
},
_removeUpdateFromHash: function(t) {
var e = t.target._id, i = this._hashForUpdates[e];
if (i) {
for (var n = i.list, s = i.entry, o = 0, c = n.length; o < c; o++) if (n[o] === s) {
n.splice(o, 1);
break;
}
delete this._hashForUpdates[e];
r.put(s);
a.put(i);
}
},
_priorityIn: function(t, e, i) {
for (var n = 0; n < t.length; n++) if (i < t[n].priority) {
t.splice(n, 0, e);
return;
}
t.push(e);
},
_appendIn: function(t, e) {
t.push(e);
},
enableForTarget: function(t) {
t._id || (t.__instanceId ? cc.warnID(1513) : t._id = n.getNewId());
},
setTimeScale: function(t) {
this._timeScale = t;
},
getTimeScale: function() {
return this._timeScale;
},
update: function(t) {
this._updateHashLocked = !0;
1 !== this._timeScale && (t *= this._timeScale);
var e, i, n, r;
for (e = 0, n = (i = this._updatesNegList).length; e < n; e++) (r = i[e]).paused || r.markedForDeletion || r.target.update(t);
for (e = 0, n = (i = this._updates0List).length; e < n; e++) (r = i[e]).paused || r.markedForDeletion || r.target.update(t);
for (e = 0, n = (i = this._updatesPosList).length; e < n; e++) (r = i[e]).paused || r.markedForDeletion || r.target.update(t);
var s, a = this._arrayForTimers;
for (e = 0; e < a.length; e++) {
s = a[e];
this._currentTarget = s;
this._currentTargetSalvaged = !1;
if (!s.paused) for (s.timerIndex = 0; s.timerIndex < s.timers.length; ++s.timerIndex) {
s.currentTimer = s.timers[s.timerIndex];
s.currentTimerSalvaged = !1;
s.currentTimer.update(t);
s.currentTimer = null;
}
if (this._currentTargetSalvaged && 0 === this._currentTarget.timers.length) {
this._removeHashElement(this._currentTarget);
--e;
}
}
for (e = 0, i = this._updatesNegList; e < i.length; ) (r = i[e]).markedForDeletion ? this._removeUpdateFromHash(r) : e++;
for (e = 0, i = this._updates0List; e < i.length; ) (r = i[e]).markedForDeletion ? this._removeUpdateFromHash(r) : e++;
for (e = 0, i = this._updatesPosList; e < i.length; ) (r = i[e]).markedForDeletion ? this._removeUpdateFromHash(r) : e++;
this._updateHashLocked = !1;
this._currentTarget = null;
},
schedule: function(t, e, i, n, r, s) {
if ("function" != typeof t) {
var a = t;
t = e;
e = a;
}
if (4 === arguments.length || 5 === arguments.length) {
s = !!n;
n = cc.macro.REPEAT_FOREVER;
r = 0;
}
cc.assertID(e, 1502);
var o = e._id;
if (!o) if (e.__instanceId) {
cc.warnID(1513);
o = e._id = e.__instanceId;
} else cc.errorID(1510);
var u, h, f = this._hashForTimers[o];
if (f) f.paused !== s && cc.warnID(1511); else {
f = c.get(null, e, 0, null, null, s);
this._arrayForTimers.push(f);
this._hashForTimers[o] = f;
}
if (null == f.timers) f.timers = []; else for (h = 0; h < f.timers.length; ++h) if ((u = f.timers[h]) && t === u._callback) {
cc.logID(1507, u.getInterval(), i);
u._interval = i;
return;
}
(u = l.get()).initWithCallback(this, t, e, i, n, r);
f.timers.push(u);
this._currentTarget === f && this._currentTargetSalvaged && (this._currentTargetSalvaged = !1);
},
scheduleUpdate: function(t, e, i) {
var n = t._id;
if (!n) if (t.__instanceId) {
cc.warnID(1513);
n = t._id = t.__instanceId;
} else cc.errorID(1510);
var s = this._hashForUpdates[n];
if (s && s.entry) {
if (s.entry.priority === e) {
s.entry.markedForDeletion = !1;
s.entry.paused = i;
return;
}
if (this._updateHashLocked) {
cc.logID(1506);
s.entry.markedForDeletion = !1;
s.entry.paused = i;
return;
}
this.unscheduleUpdate(t);
}
var o, c = r.get(t, e, i, !1);
if (0 === e) {
o = this._updates0List;
this._appendIn(o, c);
} else {
o = e < 0 ? this._updatesNegList : this._updatesPosList;
this._priorityIn(o, c, e);
}
this._hashForUpdates[n] = a.get(o, c, t, null);
},
unschedule: function(t, e) {
if (e && t) {
var i = e._id;
if (!i) if (e.__instanceId) {
cc.warnID(1513);
i = e._id = e.__instanceId;
} else cc.errorID(1510);
var n = this._hashForTimers[i];
if (n) for (var r = n.timers, s = 0, a = r.length; s < a; s++) {
var o = r[s];
if (t === o._callback) {
o !== n.currentTimer || n.currentTimerSalvaged || (n.currentTimerSalvaged = !0);
r.splice(s, 1);
l.put(o);
n.timerIndex >= s && n.timerIndex--;
0 === r.length && (this._currentTarget === n ? this._currentTargetSalvaged = !0 : this._removeHashElement(n));
return;
}
}
}
},
unscheduleUpdate: function(t) {
if (t) {
var e = t._id;
if (!e) if (t.__instanceId) {
cc.warnID(1513);
e = t._id = t.__instanceId;
} else cc.errorID(1510);
var i = this._hashForUpdates[e];
i && (this._updateHashLocked ? i.entry.markedForDeletion = !0 : this._removeUpdateFromHash(i.entry));
}
},
unscheduleAllForTarget: function(t) {
if (t) {
var e = t._id;
if (!e) if (t.__instanceId) {
cc.warnID(1513);
e = t._id = t.__instanceId;
} else cc.errorID(1510);
var i = this._hashForTimers[e];
if (i) {
var n = i.timers;
n.indexOf(i.currentTimer) > -1 && !i.currentTimerSalvaged && (i.currentTimerSalvaged = !0);
for (var r = 0, s = n.length; r < s; r++) l.put(n[r]);
n.length = 0;
this._currentTarget === i ? this._currentTargetSalvaged = !0 : this._removeHashElement(i);
}
this.unscheduleUpdate(t);
}
},
unscheduleAll: function() {
this.unscheduleAllWithMinPriority(cc.Scheduler.PRIORITY_SYSTEM);
},
unscheduleAllWithMinPriority: function(t) {
var e, i, n, r = this._arrayForTimers;
for (e = r.length - 1; e >= 0; e--) {
i = r[e];
this.unscheduleAllForTarget(i.target);
}
var s = 0;
if (t < 0) for (e = 0; e < this._updatesNegList.length; ) {
s = this._updatesNegList.length;
(n = this._updatesNegList[e]) && n.priority >= t && this.unscheduleUpdate(n.target);
s == this._updatesNegList.length && e++;
}
if (t <= 0) for (e = 0; e < this._updates0List.length; ) {
s = this._updates0List.length;
(n = this._updates0List[e]) && this.unscheduleUpdate(n.target);
s == this._updates0List.length && e++;
}
for (e = 0; e < this._updatesPosList.length; ) {
s = this._updatesPosList.length;
(n = this._updatesPosList[e]) && n.priority >= t && this.unscheduleUpdate(n.target);
s == this._updatesPosList.length && e++;
}
},
isScheduled: function(t, e) {
cc.assertID(t, 1508);
cc.assertID(e, 1509);
var i = e._id;
if (!i) if (e.__instanceId) {
cc.warnID(1513);
i = e._id = e.__instanceId;
} else cc.errorID(1510);
var n = this._hashForTimers[i];
if (!n) return !1;
if (null == n.timers) return !1;
for (var r = n.timers, s = 0; s < r.length; ++s) if (t === r[s]._callback) return !0;
return !1;
},
pauseAllTargets: function() {
return this.pauseAllTargetsWithMinPriority(cc.Scheduler.PRIORITY_SYSTEM);
},
pauseAllTargetsWithMinPriority: function(t) {
var e, i, n, r, s = [], a = this._arrayForTimers;
for (i = 0, n = a.length; i < n; i++) if (e = a[i]) {
e.paused = !0;
s.push(e.target);
}
if (t < 0) for (i = 0; i < this._updatesNegList.length; i++) if ((r = this._updatesNegList[i]) && r.priority >= t) {
r.paused = !0;
s.push(r.target);
}
if (t <= 0) for (i = 0; i < this._updates0List.length; i++) if (r = this._updates0List[i]) {
r.paused = !0;
s.push(r.target);
}
for (i = 0; i < this._updatesPosList.length; i++) if ((r = this._updatesPosList[i]) && r.priority >= t) {
r.paused = !0;
s.push(r.target);
}
return s;
},
resumeTargets: function(t) {
if (t) for (var e = 0; e < t.length; e++) this.resumeTarget(t[e]);
},
pauseTarget: function(t) {
cc.assertID(t, 1503);
var e = t._id;
if (!e) if (t.__instanceId) {
cc.warnID(1513);
e = t._id = t.__instanceId;
} else cc.errorID(1510);
var i = this._hashForTimers[e];
i && (i.paused = !0);
var n = this._hashForUpdates[e];
n && (n.entry.paused = !0);
},
resumeTarget: function(t) {
cc.assertID(t, 1504);
var e = t._id;
if (!e) if (t.__instanceId) {
cc.warnID(1513);
e = t._id = t.__instanceId;
} else cc.errorID(1510);
var i = this._hashForTimers[e];
i && (i.paused = !1);
var n = this._hashForUpdates[e];
n && (n.entry.paused = !1);
},
isTargetPaused: function(t) {
cc.assertID(t, 1505);
var e = t._id;
if (!e) if (t.__instanceId) {
cc.warnID(1513);
e = t._id = t.__instanceId;
} else cc.errorID(1510);
var i = this._hashForTimers[e];
if (i) return i.paused;
var n = this._hashForUpdates[e];
return !!n && n.entry.paused;
}
};
cc.Scheduler.PRIORITY_SYSTEM = 1 << 31;
cc.Scheduler.PRIORITY_NON_SYSTEM = cc.Scheduler.PRIORITY_SYSTEM + 1;
e.exports = cc.Scheduler;
}), {
"./platform/id-generater": 145,
"./platform/js": 149
} ],
29: [ (function(t, e) {
"use strict";
var i = t("./preprocess"), n = t("./fetch"), r = t("./cache"), s = t("./helper"), a = t("./releaseManager"), o = t("./depend-util"), c = t("./load"), u = t("./pipeline"), l = t("./task"), h = t("./request-item"), f = t("./downloader"), _ = t("./parser"), d = t("./pack-manager"), p = t("./bundle"), v = t("./builtins"), g = t("./factory"), m = t("./urlTransformer"), y = m.parse, E = m.combine, T = t("./utilities"), C = T.parseParameters, A = T.asyncify, S = t("./shared"), x = S.assets, b = S.files, R = S.parsed, w = S.pipeline, O = S.transformPipeline, I = S.fetchPipeline, D = S.RequestType, M = S.bundles, L = S.BuiltinBundleName;
function N() {
this._preprocessPipe = i;
this._fetchPipe = n;
this._loadPipe = c;
this.pipeline = w.append(i).append(c);
this.fetchPipeline = I.append(i).append(n);
this.transformPipeline = O.append(y).append(E);
this.bundles = M;
this.assets = x;
this._files = b;
this._parsed = R;
this.generalImportBase = "";
this.generalNativeBase = "";
this.dependUtil = o;
this._releaseManager = a;
this.cacheAsset = !0;
this.force = !1;
this.utils = s;
this.downloader = f;
this.parser = _;
this.builtins = v;
this.packManager = d;
this.factory = g;
this.cacheManager = null;
this.presets = {
default: {
priority: 0
},
preload: {
maxConcurrency: 2,
maxRequestsPerFrame: 2,
priority: -1
},
scene: {
maxConcurrency: 8,
maxRequestsPerFrame: 8,
priority: 1
},
bundle: {
maxConcurrency: 8,
maxRequestsPerFrame: 8,
priority: 2
},
remote: {
maxRetryCount: 4
},
script: {
maxConcurrency: 1024,
maxRequestsPerFrame: 1024,
priority: 2
}
};
}
N.Pipeline = u;
N.Task = l;
N.Cache = r;
N.RequestItem = h;
N.Bundle = p;
N.BuiltinBundleName = L;
N.prototype = {
constructor: N,
get main() {
return M.get(L.MAIN);
},
get resources() {
return M.get(L.RESOURCES);
},
get internal() {
return M.get(L.INTERNAL);
},
init: function(t) {
t = t || Object.create(null);
this._files.clear();
this._parsed.clear();
this._releaseManager.init();
this.assets.clear();
this.bundles.clear();
this.packManager.init();
this.downloader.init(t.bundleVers, t.server);
this.parser.init();
this.dependUtil.init();
this.generalImportBase = t.importBase;
this.generalNativeBase = t.nativeBase;
},
getBundle: function(t) {
return M.get(t);
},
removeBundle: function(t) {
t._destroy();
M.remove(t.name);
},
loadAny: function(t, e, i, n) {
var r = C(e, i, n);
e = r.options, i = r.onProgress, n = r.onComplete;
e.preset = e.preset || "default";
t = Array.isArray(t) ? t.concat() : t;
var s = new l({
input: t,
onProgress: i,
onComplete: A(n),
options: e
});
w.async(s);
},
preloadAny: function(t, e, i, n) {
var r = C(e, i, n);
e = r.options, i = r.onProgress, n = r.onComplete;
e.preset = e.preset || "preload";
t = Array.isArray(t) ? t.concat() : t;
var s = new l({
input: t,
onProgress: i,
onComplete: A(n),
options: e
});
I.async(s);
},
postLoadNative: function(t, e, i) {
if (!(t instanceof cc.Asset)) throw new Error("input is not asset");
var n = C(e, void 0, i);
e = n.options, i = n.onComplete;
if (!t._native || t._nativeAsset) return A(i)(null);
var r = o.getNativeDep(t._uuid);
if (r) {
if (!M.has(r.bundle)) {
var s = M.find((function(e) {
return e.getAssetInfo(t._uuid);
}));
s && (r.bundle = s.name);
}
this.loadAny(r, e, (function(e, n) {
e ? cc.error(e.message, e.stack) : !t._nativeAsset && (t._nativeAsset = n);
i && i(e);
}));
}
},
loadRemote: function(t, e, i) {
var n = C(e, void 0, i);
e = n.options, i = n.onComplete;
if (this.assets.has(t)) return A(i)(null, this.assets.get(t));
e.__isNative__ = !0;
e.preset = e.preset || "remote";
this.loadAny({
url: t
}, e, null, (function(n, r) {
if (n) {
cc.error(n.message, n.stack);
i && i(n, null);
} else g.create(t, r, e.ext || cc.path.extname(t), e, (function(t, e) {
i && i(t, e);
}));
}));
},
loadScript: function(t, e, i) {
var n = C(e, void 0, i);
e = n.options, i = n.onComplete;
e.__requestType__ = D.URL;
e.preset = e.preset || "script";
this.loadAny(t, e, i);
},
loadBundle: function(t, e, i) {
var n = C(e, void 0, i), r = (e = n.options, i = n.onComplete, cc.path.basename(t));
if (this.bundles.has(r)) return A(i)(null, this.getBundle(r));
e.preset = e.preset || "bundle";
e.ext = "bundle";
this.loadRemote(t, e, i);
},
releaseAsset: function(t) {
a.tryRelease(t, !0);
},
releaseUnusedAssets: function() {
x.forEach((function(t) {
a.tryRelease(t);
}));
},
releaseAll: function() {
x.forEach((function(t) {
a.tryRelease(t, !0);
}));
},
_transform: function(t, e) {
var i = l.create({
input: t,
options: e
}), n = [];
try {
for (var r = O.sync(i), s = 0, a = r.length; s < a; s++) {
var o = r[s], c = o.url;
o.recycle();
n.push(c);
}
} catch (t) {
for (s = 0, a = i.output.length; s < a; s++) i.output[s].recycle();
cc.error(t.message, t.stack);
}
i.recycle();
return n.length > 1 ? n : n[0];
}
};
cc.AssetManager = N;
cc.assetManager = new N();
Object.defineProperty(cc, "resources", {
get: function() {
return M.get(L.RESOURCES);
}
});
e.exports = cc.assetManager;
}), {
"./builtins": 30,
"./bundle": 31,
"./cache": 32,
"./depend-util": 34,
"./downloader": 41,
"./factory": 42,
"./fetch": 43,
"./helper": 45,
"./load": 47,
"./pack-manager": 48,
"./parser": 49,
"./pipeline": 50,
"./preprocess": 51,
"./releaseManager": 52,
"./request-item": 53,
"./shared": 54,
"./task": 55,
"./urlTransformer": 56,
"./utilities": 57
} ],
30: [ (function(t, e) {
"use strict";
var i = t("./cache"), n = t("./releaseManager"), r = t("./shared").BuiltinBundleName, s = {
_assets: new i({
material: new i(),
effect: new i()
}),
_loadBuiltins: function(t, e) {
var i = t + "s", n = this._assets.get(t);
return cc.assetManager.internal.loadDir(i, null, null, (function(t, i) {
if (t) cc.error(t.message, t.stack); else for (var r = 0; r < i.length; r++) {
var s = i[r];
n.add(s.name, s.addRef());
}
e();
}));
},
init: function(t) {
var e = this;
this.clear();
if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS || !cc.assetManager.bundles.has(r.INTERNAL)) return t && t();
this._loadBuiltins("effect", (function() {
e._loadBuiltins("material", t);
}));
},
getBuiltin: function(t, e) {
return 0 === arguments.length ? this._assets : 1 === arguments.length ? this._assets.get(t) : this._assets.get(t).get(e);
},
clear: function() {
this._assets.forEach((function(t) {
t.forEach((function(t) {
n.tryRelease(t, !0);
}));
t.clear();
}));
}
};
e.exports = s;
}), {
"./cache": 32,
"./releaseManager": 52,
"./shared": 54
} ],
31: [ (function(t, e) {
"use strict";
var i = t("./config"), n = t("./releaseManager"), r = t("./utilities"), s = r.parseParameters, a = r.parseLoadResArgs, o = t("./shared"), c = o.RequestType, u = o.assets, l = o.bundles;
function h() {
this._config = new i();
}
h.prototype = {
constructor: h,
get name() {
return this._config.name;
},
get deps() {
return this._config.deps;
},
get base() {
return this._config.base;
},
getInfoWithPath: function(t, e) {
return this._config.getInfoWithPath(t, e);
},
getDirWithPath: function(t, e, i) {
return this._config.getDirWithPath(t, e, i);
},
getAssetInfo: function(t) {
return this._config.getAssetInfo(t);
},
getSceneInfo: function(t) {
return this._config.getSceneInfo(t);
},
init: function(t) {
this._config.init(t);
l.add(t.name, this);
},
load: function(t, e, i, n) {
var r = a(e, i, n);
e = r.type, i = r.onProgress, n = r.onComplete;
cc.assetManager.loadAny(t, {
__requestType__: c.PATH,
type: e,
bundle: this.name,
__outputAsArray__: Array.isArray(t)
}, i, n);
},
preload: function(t, e, i, n) {
var r = a(e, i, n);
e = r.type, i = r.onProgress, n = r.onComplete;
cc.assetManager.preloadAny(t, {
__requestType__: c.PATH,
type: e,
bundle: this.name
}, i, n);
},
loadDir: function(t, e, i, n) {
var r = a(e, i, n);
e = r.type, i = r.onProgress, n = r.onComplete;
cc.assetManager.loadAny(t, {
__requestType__: c.DIR,
type: e,
bundle: this.name,
__outputAsArray__: !0
}, i, n);
},
preloadDir: function(t, e, i, n) {
var r = a(e, i, n);
e = r.type, i = r.onProgress, n = r.onComplete;
cc.assetManager.preloadAny(t, {
__requestType__: c.DIR,
type: e,
bundle: this.name
}, i, n);
},
loadScene: function(t, e, i, n) {
var r = s(e, i, n);
e = r.options, i = r.onProgress, n = r.onComplete;
e.preset = e.preset || "scene";
e.bundle = this.name;
cc.assetManager.loadAny({
scene: t
}, e, i, (function(t, e) {
if (t) {
cc.error(t.message, t.stack);
n && n(t);
} else if (e instanceof cc.SceneAsset) {
var i = e.scene;
i._id = e._uuid;
i._name = e._name;
n && n(null, e);
} else n && n(new Error("The asset " + e._uuid + " is not a scene"));
}));
},
preloadScene: function(t, e, i, n) {
var r = s(e, i, n);
e = r.options, i = r.onProgress, n = r.onComplete;
e.bundle = this.name;
cc.assetManager.preloadAny({
scene: t
}, e, i, (function(e) {
e && cc.errorID(1210, t, e.message);
n && n(e);
}));
},
get: function(t, e) {
var i = this.getInfoWithPath(t, e);
return u.get(i && i.uuid);
},
release: function(t, e) {
n.tryRelease(this.get(t, e), !0);
},
releaseUnusedAssets: function() {
var t = this;
u.forEach((function(e) {
var i = t.getAssetInfo(e._uuid);
i && !i.redirect && n.tryRelease(e);
}));
},
releaseAll: function() {
var t = this;
u.forEach((function(e) {
var i = t.getAssetInfo(e._uuid);
i && !i.redirect && n.tryRelease(e, !0);
}));
},
_destroy: function() {
this._config.destroy();
}
};
e.exports = h;
}), {
"./config": 33,
"./releaseManager": 52,
"./shared": 54,
"./utilities": 57
} ],
32: [ (function(t, e) {
"use strict";
var i = t("../platform/js");
function n(t) {
if (t) {
this._map = t;
this._count = Object.keys(t).length;
} else {
this._map = i.createMap(!0);
this._count = 0;
}
}
n.prototype = {
constructor: n,
add: function(t, e) {
t in this._map || this._count++;
return this._map[t] = e;
},
get: function(t) {
return this._map[t];
},
has: function(t) {
return t in this._map;
},
remove: function(t) {
var e = this._map[t];
if (t in this._map) {
delete this._map[t];
this._count--;
}
return e;
},
clear: function() {
if (0 !== this._count) {
this._map = i.createMap(!0);
this._count = 0;
}
},
forEach: function(t) {
for (var e in this._map) t(this._map[e], e);
},
find: function(t) {
for (var e in this._map) if (t(this._map[e], e)) return this._map[e];
return null;
},
get count() {
return this._count;
},
destroy: function() {
this._map = null;
}
};
e.exports = n;
}), {
"../platform/js": 149
} ],
33: [ (function(t, e) {
"use strict";
var i = t("../platform/js"), n = t("./cache"), r = t("./helper").normalize, s = t("./utilities").processOptions;
function a() {
this.name = "";
this.base = "";
this.importBase = "";
this.nativeBase = "";
this.deps = null;
this.assetInfos = new n();
this.scenes = new n();
this.paths = new n();
}
a.prototype = {
constructor: a,
init: function(t) {
s(t);
this.importBase = t.importBase || "";
this.nativeBase = t.nativeBase || "";
this.base = t.base || "";
this.name = t.name || "";
this.deps = t.deps || [];
this._initUuid(t.uuids);
this._initPath(t.paths);
this._initScene(t.scenes);
this._initPackage(t.packs);
this._initVersion(t.versions);
this._initRedirect(t.redirect);
},
_initUuid: function(t) {
if (t) {
this.assetInfos.clear();
for (var e = 0, i = t.length; e < i; e++) {
var n = t[e];
this.assetInfos.add(n, {
uuid: n
});
}
}
},
_initPath: function(t) {
if (t) {
var e = this.paths;
e.clear();
for (var n in t) {
var r = t[n], s = r[0], a = r[1], o = 3 === r.length, c = this.assetInfos.get(n);
c.path = s;
c.ctor = i._getClassById(a);
e.has(s) ? o ? e.get(s).push(c) : e.get(s).splice(0, 0, c) : e.add(s, [ c ]);
}
}
},
_initScene: function(t) {
if (t) {
var e = this.scenes;
e.clear();
var i = this.assetInfos;
for (var n in t) {
var r = t[n], s = i.get(r);
s.url = n;
e.add(n, s);
}
}
},
_initPackage: function(t) {
if (t) {
var e = this.assetInfos;
for (var i in t) {
var n = t[i], r = {
uuid: i,
packs: n,
ext: ".json"
};
e.add(i, r);
for (var s = 0, a = n.length; s < a; s++) {
var o = n[s], c = e.get(o), u = c.packs;
u ? 1 === a ? u.splice(0, 0, r) : u.push(r) : c.packs = [ r ];
}
}
}
},
_initVersion: function(t) {
if (t) {
var e = this.assetInfos, i = t.import;
if (i) for (var n = 0, r = i.length; n < r; n += 2) {
var s = i[n];
e.get(s).ver = i[n + 1];
}
if (i = t.native) for (n = 0, r = i.length; n < r; n += 2) {
s = i[n];
e.get(s).nativeVer = i[n + 1];
}
}
},
_initRedirect: function(t) {
if (t) for (var e = this.assetInfos, i = 0, n = t.length; i < n; i += 2) {
var r = t[i];
e.get(r).redirect = t[i + 1];
}
},
getInfoWithPath: function(t, e) {
if (!t) return null;
t = r(t);
var n = this.paths.get(t);
if (n) {
if (!e) return n[0];
for (var s = 0, a = n.length; s < a; s++) {
var o = n[s];
if (i.isChildClassOf(o.ctor, e)) return o;
}
}
return null;
},
getDirWithPath: function(t, e, n) {
"/" === (t = r(t))[t.length - 1] && (t = t.slice(0, -1));
var s = n || [];
function a(t, e) {
return !(t.length > e.length) || 47 === t.charCodeAt(e.length);
}
this.paths.forEach((function(n, r) {
if (r.startsWith(t) && a(r, t) || !t) for (var o = 0, c = n.length; o < c; o++) {
var u = n[o];
e && !i.isChildClassOf(u.ctor, e) || s.push(u);
}
}));
return s;
},
getAssetInfo: function(t) {
return this.assetInfos.get(t);
},
getSceneInfo: function(t) {
t.endsWith(".fire") || (t += ".fire");
"/" === t[0] || t.startsWith("db://") || (t = "/" + t);
return this.scenes.find((function(e, i) {
return i.endsWith(t);
}));
},
destroy: function() {
this.paths.destroy();
this.scenes.destroy();
this.assetInfos.destroy();
}
};
e.exports = a;
}), {
"../platform/js": 149,
"./cache": 32,
"./helper": 45,
"./utilities": 57
} ],
34: [ (function(t, e) {
"use strict";
var i = (function(t) {
if (t && t.__esModule) return t;
if (null === t || "object" != typeof t && "function" != typeof t) return {
default: t
};
var e = n();
if (e && e.has(t)) return e.get(t);
var i = {}, r = Object.defineProperty && Object.getOwnPropertyDescriptor;
for (var s in t) if (Object.prototype.hasOwnProperty.call(t, s)) {
var a = r ? Object.getOwnPropertyDescriptor(t, s) : null;
a && (a.get || a.set) ? Object.defineProperty(i, s, a) : i[s] = t[s];
}
i.default = t;
e && e.set(t, i);
return i;
})(t("../platform/deserialize-compiled"));
function n() {
if ("function" != typeof WeakMap) return null;
var t = new WeakMap();
n = function() {
return t;
};
return t;
}
var r = t("./cache"), s = t("./deserialize"), a = t("./shared"), o = a.files, c = a.parsed, u = {
_depends: new r(),
init: function() {
this._depends.clear();
},
getNativeDep: function(t) {
var e = this._depends.get(t);
return e ? e.nativeDep && Object.assign({}, e.nativeDep) : null;
},
getDeps: function(t) {
return this._depends.has(t) ? this._depends.get(t).deps : [];
},
getDepsRecursively: function(t) {
var e = Object.create(null), i = [];
this._descend(t, e, i);
return i;
},
_descend: function(t, e, i) {
for (var n = this.getDeps(t), r = 0; r < n.length; r++) {
var s = n[r];
if (!e[s]) {
e[s] = !0;
i.push(s);
this._descend(s, e, i);
}
}
},
remove: function(t) {
this._depends.remove(t);
},
parse: function(t, e) {
var n = null;
if (Array.isArray(e) || e.__type__) {
if (n = this._depends.get(t)) return n;
if (Array.isArray(e) && !(0, i.hasNativeDep)(e)) n = {
deps: this._parseDepsFromJson(e)
}; else try {
var r = s(e);
(n = this._parseDepsFromAsset(r)).nativeDep && (n.nativeDep.uuid = t);
c.add(t + "@import", r);
} catch (e) {
o.remove(t + "@import");
n = {
deps: []
};
}
} else {
if ((n = this._depends.get(t)) && n.parsedFromExistAsset) return n;
n = this._parseDepsFromAsset(e);
}
this._depends.add(t, n);
return n;
},
_parseDepsFromAsset: function(t) {
for (var e = {
deps: [],
parsedFromExistAsset: !0,
preventPreloadNativeObject: t.constructor.preventPreloadNativeObject,
preventDeferredLoadDependents: t.constructor.preventDeferredLoadDependents
}, i = t.__depends__, n = 0, r = i.length; n < r; n++) {
var s = i[n].uuid;
e.deps.push(s);
}
t.__nativeDepend__ && (e.nativeDep = t._nativeDep);
return e;
},
_parseDepsFromJson: function(t) {
var e = (0, i.getDependUuidList)(t);
e.forEach((function(t, i) {
return e[i] = cc.assetManager.utils.decodeUuid(t);
}));
return e;
}
};
e.exports = u;
}), {
"../platform/deserialize-compiled": 143,
"./cache": 32,
"./deserialize": 36,
"./shared": 54
} ],
35: [ (function(t) {
"use strict";
var e = t("../platform/js");
t("../CCDirector");
var i = t("./utilities"), n = t("./depend-util"), r = t("./releaseManager"), s = t("./downloader"), a = t("./factory"), o = [ ".png", ".jpg", ".bmp", ".jpeg", ".gif", ".ico", ".tiff", ".webp", ".image", ".pvr", ".pkm" ], c = [ ".mp3", ".ogg", ".wav", ".m4a" ];
function u() {
return !0;
}
var l = {
transformURL: function(t) {
return t = t.replace(/.*[\/\\][0-9a-fA-F]{2}[\/\\]([0-9a-fA-F-]{8,})/, (function(e, i) {
var n = cc.assetManager.bundles.find((function(t) {
return t.getAssetInfo(i);
})), r = "";
if (n) {
var s = n.getAssetInfo(i);
r = t.startsWith(n.base + n._config.nativeBase) ? s.nativeVer : s.ver;
}
return r ? e + "." + r : e;
}));
}
}, h = {
onProgress: null,
_autoReleaseSetting: Object.create(null),
get _cache() {
return cc.assetManager.assets._map;
},
load: function(t, e, i) {
if (void 0 === i && void 0 !== e) {
i = e;
e = null;
}
t = Array.isArray(t) ? t : [ t ];
for (var n = 0; n < t.length; n++) {
var r = t[n];
if ("string" == typeof r) t[n] = {
url: r,
__isNative__: !0
}; else {
if (r.type) {
r.ext = "." + r.type;
r.type = void 0;
}
r.url && (r.__isNative__ = !0);
}
}
var s = [], l = [];
cc.assetManager.loadAny(t, null, (function(t, i, n) {
n.content && (o.includes(n.ext) ? s.push(n.content) : c.includes(n.ext) && l.push(n.content));
e && e(t, i, n);
}), (function(e, n) {
var r = null;
if (!e) {
n = Array.isArray(n) ? n : [ n ];
for (var o = 0; o < n.length; o++) {
var c = n[o];
if (!(c instanceof cc.Asset)) {
var h = c, f = t[o].url;
s.includes(h) ? a.create(f, c, ".png", null, (function(t, e) {
h = n[o] = e;
})) : l.includes(h) && a.create(f, c, ".mp3", null, (function(t, e) {
h = n[o] = e;
}));
cc.assetManager.assets.add(f, h);
}
}
if (n.length > 1) {
var _ = Object.create(null);
n.forEach((function(t) {
_[t._uuid] = t;
}));
r = {
isCompleted: u,
_map: _
};
} else r = n[0];
}
i && i(e, r);
}));
},
getXMLHttpRequest: function() {
return new XMLHttpRequest();
},
_parseLoadResArgs: i.parseLoadResArgs,
getItem: function(t) {
return cc.assetManager.assets.has(t) ? {
content: cc.assetManager.assets.get(t)
} : null;
},
loadRes: function(t, e, i, n) {
var r = this._parseLoadResArgs(e, i, n), s = (e = r.type, r.onProgress), a = r.onComplete, o = cc.path.extname(t);
o && (t = t.slice(0, -o.length));
cc.resources.load(t, e, s, a);
},
loadResArray: function(t, e, i, n) {
var r = this._parseLoadResArgs(e, i, n), s = (e = r.type, r.onProgress), a = r.onComplete;
t.forEach((function(e, i) {
var n = cc.path.extname(e);
n && (t[i] = e.slice(0, -n.length));
}));
cc.resources.load(t, e, s, a);
},
loadResDir: function(t, e, i, n) {
var r = this._parseLoadResArgs(e, i, n), s = (e = r.type, r.onProgress), a = r.onComplete;
cc.resources.loadDir(t, e, s, (function(i, n) {
var r = [];
i || (r = cc.resources.getDirWithPath(t, e).map((function(t) {
return t.path;
})));
a && a(i, n, r);
}));
},
getRes: function(t, e) {
return cc.assetManager.assets.has(t) ? cc.assetManager.assets.get(t) : cc.resources.get(t, e);
},
getResCount: function() {
return cc.assetManager.assets.count;
},
getDependsRecursively: function(t) {
return t ? n.getDepsRecursively("string" == typeof t ? t : t._uuid).concat([ t._uuid ]) : [];
},
get assetLoader() {},
get md5Pipe() {
return l;
},
get downloader() {
return cc.assetManager.downloader;
},
get loader() {
return cc.assetManager.parser;
},
addDownloadHandlers: function(t) {
var e = Object.create(null);
for (var i in t) {
var n = t[i];
e["." + i] = function(t, e, i) {
n({
url: t
}, i);
};
}
cc.assetManager.downloader.register(e);
},
addLoadHandlers: function(t) {
var e = Object.create(null);
for (var i in t) {
var n = t[i];
e["." + i] = function(t, e, i) {
n({
content: t
}, i);
};
}
cc.assetManager.parser.register(e);
},
flowInDeps: function() {},
release: function(t) {
if (Array.isArray(t)) for (var e = 0; e < t.length; e++) {
var i = t[e];
"string" == typeof i && (i = cc.assetManager.assets.get(i));
cc.assetManager.builtins._assets.find((function(t) {
return t.find((function(t) {
return t === i;
}));
})) || cc.assetManager.releaseAsset(i);
} else if (t) {
"string" == typeof t && (t = cc.assetManager.assets.get(t));
if (cc.assetManager.builtins._assets.find((function(e) {
return e.find((function(e) {
return e === t;
}));
}))) return;
cc.assetManager.releaseAsset(t);
}
},
releaseAsset: function(t) {
cc.assetManager.releaseAsset(t);
},
releaseRes: function(t, e) {
cc.resources.release(t, e);
},
releaseResDir: function() {},
releaseAll: function() {
cc.assetManager.releaseAll();
cc.assetManager.assets.clear();
},
removeItem: function(t) {
cc.assetManager.assets.remove(t);
},
setAutoRelease: function(t, e) {
"object" == typeof t && (t = t._uuid);
this._autoReleaseSetting[t] = !!e;
},
setAutoReleaseRecursively: function(t, e) {
"object" == typeof t && (t = t._uuid);
e = !!e;
this._autoReleaseSetting[t] = e;
for (var i = n.getDepsRecursively(t), r = 0; r < i.length; r++) {
var s = i[r];
this._autoReleaseSetting[s] = e;
}
},
isAutoRelease: function(t) {
"object" == typeof t && (t = t._uuid);
return !!this._autoReleaseSetting[t];
}
};
s.loadSubpackage = function(t, e) {
cc.assetManager.loadBundle(t, null, e);
};
var f = {
init: function(t) {
t.importBase = t.libraryPath;
t.nativeBase = t.rawAssetsBase;
cc.assetManager.init(t);
t.rawAssets && new cc.AssetManager.Bundle().init({
name: cc.AssetManager.BuiltinBundleName.RESOURCES,
importBase: t.importBase,
nativeBase: t.nativeBase,
paths: t.rawAssets.assets,
uuids: Object.keys(t.rawAssets.assets)
});
},
loadAsset: function(t, e) {
cc.assetManager.loadAny(t, e);
},
getLibUrlNoExt: function() {},
queryAssetInfo: function() {}
};
cc.url = {
normalize: function(t) {
cc.warnID(1400, "cc.url.normalize", "cc.assetManager.utils.normalize");
return cc.assetManager.utils.normalize(t);
},
raw: function(t) {
cc.warnID(1400, "cc.url.raw", "cc.resources.load");
return t.startsWith("resources/") ? cc.assetManager._transform({
path: cc.path.changeExtname(t.substr(10)),
bundle: cc.AssetManager.BuiltinBundleName.RESOURCES,
__isNative__: !0,
ext: cc.path.extname(t)
}) : "";
}
};
Object.defineProperties(cc, {
loader: {
get: function() {
return h;
}
},
AssetLibrary: {
get: function() {
return f;
}
},
LoadingItems: {
get: function() {
cc.warnID(1400, "cc.LoadingItems", "cc.AssetManager.Task");
return cc.AssetManager.Task;
}
},
Pipeline: {
get: function() {
cc.warnID(1400, "cc.Pipeline", "cc.AssetManager.Pipeline");
return cc.AssetManager.Pipeline;
}
}
});
e.obsolete(cc, "cc.RawAsset", "cc.Asset");
e.obsolete(cc.Asset.prototype, "cc.Asset.url", "nativeUrl");
Object.defineProperties(cc.macro, {
DOWNLOAD_MAX_CONCURRENT: {
get: function() {
return cc.assetManager.downloader.maxConcurrency;
},
set: function(t) {
cc.assetManager.downloader.maxConcurrency = t;
}
}
});
Object.assign(cc.director, {
_getSceneUuid: function(t) {
cc.assetManager.main.getSceneInfo(t);
}
});
Object.defineProperties(cc.game, {
_sceneInfos: {
get: function() {
var t = [];
cc.assetManager.main._config.scenes.forEach((function(e) {
t.push(e);
}));
return t;
}
}
});
var _ = i.parseParameters;
i.parseParameters = function(t, e, i) {
var n = _(t, e, i);
n.onProgress = n.onProgress || h.onProgress;
return n;
};
var d = r._autoRelease;
r._autoRelease = function() {
d.apply(this, arguments);
for (var t = h._autoReleaseSetting, e = Object.keys(t), i = 0; i < e.length; i++) {
var n = e[i];
if (!0 === t[n]) {
var s = cc.assetManager.assets.get(n);
s && r.tryRelease(s);
}
}
};
}), {
"../CCDirector": 23,
"../platform/js": 149,
"./depend-util": 34,
"./downloader": 41,
"./factory": 42,
"./releaseManager": 52,
"./utilities": 57
} ],
36: [ (function(t, e) {
"use strict";
var i = t("./helper");
t("../platform/deserialize");
e.exports = function(t, e) {
var n;
n = cc._MissingScript.safeFindClass;
var r, s = null, a = (s = cc.deserialize.Details.pool).get();
try {
r = cc.deserialize(t, a, {
classFinder: n,
customEnv: e
});
} catch (t) {
s.put(a);
throw t;
}
for (var o = a.uuidList, c = a.uuidObjList, u = a.uuidPropList, l = [], h = 0; h < o.length; h++) {
var f = o[h];
l[h] = {
uuid: i.decodeUuid(f),
owner: c[h],
prop: u[h]
};
}
r.__depends__ = l;
r._native && (r.__nativeDepend__ = !0);
s.put(a);
return r;
};
}), {
"../platform/deserialize": 144,
"../platform/deserialize-compiled": 143,
"../platform/deserialize-editor": void 0,
"./helper": 45
} ],
37: [ (function(t, e) {
"use strict";
var i = cc.sys.__audioSupport, n = t("./utilities").parseParameters;
e.exports = function(t, e, r) {
var s = n(e, void 0, r), a = (e = s.options, r = s.onComplete, document.createElement("audio"));
a.src = t;
var o = function() {
clearTimeout(c);
a.removeEventListener("canplaythrough", u, !1);
a.removeEventListener("error", l, !1);
i.USE_LOADER_EVENT && a.removeEventListener(i.USE_LOADER_EVENT, u, !1);
}, c = setTimeout((function() {
0 === a.readyState ? l() : u();
}), 8e3), u = function() {
o();
r && r(null, a);
}, l = function() {
o();
var e = "load audio failure - " + t;
cc.log(e);
r && r(new Error(e));
};
a.addEventListener("canplaythrough", u, !1);
a.addEventListener("error", l, !1);
i.USE_LOADER_EVENT && a.addEventListener(i.USE_LOADER_EVENT, u, !1);
return a;
};
}), {
"./utilities": 57
} ],
38: [ (function(t, e) {
"use strict";
var i = t("./utilities").parseParameters;
e.exports = function(t, e, n) {
var r = i(e, void 0, n), s = (e = r.options, n = r.onComplete, new Image());
"file:" !== window.location.protocol && (s.crossOrigin = "anonymous");
function a() {
s.removeEventListener("load", a);
s.removeEventListener("error", o);
n && n(null, s);
}
function o() {
s.removeEventListener("load", a);
s.removeEventListener("error", o);
n && n(new Error(cc.debug.getError(4930, t)));
}
s.addEventListener("load", a);
s.addEventListener("error", o);
s.src = t;
return s;
};
}), {
"./utilities": 57
} ],
39: [ (function(t, e) {
"use strict";
var i = t("./utilities").parseParameters;
e.exports = function(t, e, n, r) {
var s = i(e, n, r), a = (e = s.options, n = s.onProgress, r = s.onComplete, new XMLHttpRequest()), o = "download failed: " + t + ", status: ";
a.open("GET", t, !0);
void 0 !== e.responseType && (a.responseType = e.responseType);
void 0 !== e.withCredentials && (a.withCredentials = e.withCredentials);
void 0 !== e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType);
void 0 !== e.timeout && (a.timeout = e.timeout);
if (e.header) for (var c in e.header) a.setRequestHeader(c, e.header[c]);
a.onload = function() {
200 === a.status || 0 === a.status ? r && r(null, a.response) : r && r(new Error(o + a.status + "(no response)"));
};
n && (a.onprogress = function(t) {
t.lengthComputable && n(t.loaded, t.total);
});
a.onerror = function() {
r && r(new Error(o + a.status + "(error)"));
};
a.ontimeout = function() {
r && r(new Error(o + a.status + "(time out)"));
};
a.onabort = function() {
r && r(new Error(o + a.status + "(abort)"));
};
a.send(null);
return a;
};
}), {
"./utilities": 57
} ],
40: [ (function(t, e) {
"use strict";
var i = t("./utilities").parseParameters, n = {};
e.exports = function(t, e, r) {
var s = i(e, void 0, r);
e = s.options, r = s.onComplete;
if (n[t]) return r && r(null);
var a = document, o = document.createElement("script");
"file:" !== window.location.protocol && (o.crossOrigin = "anonymous");
o.async = e.async;
o.src = t;
function c() {
o.parentNode.removeChild(o);
o.removeEventListener("load", c, !1);
o.removeEventListener("error", u, !1);
n[t] = !0;
r && r(null);
}
function u() {
o.parentNode.removeChild(o);
o.removeEventListener("load", c, !1);
o.removeEventListener("error", u, !1);
r && r(new Error(cc.debug.getError(4928, t)));
}
o.addEventListener("load", c, !1);
o.addEventListener("error", u, !1);
a.body.appendChild(o);
};
}), {
"./utilities": 57
} ],
41: [ (function(t, e) {
"use strict";
var i = t("../platform/js"), n = t("../CCDebug"), r = t("./font-loader").loadFont, s = t("../platform/utils").callInNextTick, a = t("./download-dom-image"), o = t("./download-dom-audio"), c = t("./download-file"), u = t("./download-script.js"), l = t("./cache"), h = t("./shared").files, f = t("../platform/CCSys"), _ = f.__audioSupport, d = f.capabilities, p = t("./utilities"), v = p.urlAppendTimestamp, g = p.retry, m = /^\w+:\/\/.*/, y = function(t, e, i) {
e.audioLoadMode !== cc.AudioClip.LoadMode.DOM_AUDIO ? A(t, e, i) : o(t, e, i);
}, E = (y = 0 === (_.format || []).length ? function(t, e, i) {
i(new Error(n.getError(4927)));
} : _.WEB_AUDIO ? y : o, function() {
var t = d.imageBitmap && cc.macro.ALLOW_IMAGE_BITMAP ? T : a;
t.apply(this, arguments);
}), T = function(t, e, i) {
e.responseType = "blob";
c(t, e, e.onFileProgress, i);
}, C = function(t, e, i) {
e.responseType = "json";
c(t, e, e.onFileProgress, (function(t, e) {
if (!t && "string" == typeof e) try {
e = JSON.parse(e);
} catch (e) {
t = e;
}
i && i(t, e);
}));
}, A = function(t, e, i) {
e.responseType = "arraybuffer";
c(t, e, e.onFileProgress, i);
}, S = function(t, e, i) {
e.responseType = "text";
c(t, e, e.onFileProgress, i);
}, x = function(t, e, i) {
i(null, t);
}, b = new l(), R = [], w = !1, O = 0, I = 0, D = -1, M = !1, L = function() {
var t = Date.now();
if (t - D > 1e3 * cc.director._deltaTime) {
I = 0;
D = t;
}
}, N = function t(e, i) {
M = !1;
L();
for (;R.length > 0 && O < e && I < i; ) {
if (w) {
R.sort((function(t, e) {
return t.priority - e.priority;
}));
w = !1;
}
var n = R.pop();
if (!n) break;
O++;
I++;
n.invoke();
}
if (R.length > 0 && O < e) {
s(t, e, i);
M = !0;
}
}, P = {
_remoteServerAddress: "",
get remoteServerAddress() {
return this._remoteServerAddress;
},
maxConcurrency: 6,
maxRequestsPerFrame: 6,
maxRetryCount: 3,
appendTimeStamp: !1,
limited: !0,
retryInterval: 2e3,
bundleVers: null,
downloadDomImage: a,
downloadDomAudio: o,
downloadFile: c,
downloadScript: u,
init: function(t, e) {
b.clear();
R.length = 0;
this._remoteServerAddress = e || "";
this.bundleVers = t || Object.create(null);
},
register: function(t, e) {
"object" == typeof t ? i.mixin(F, t) : F[t] = e;
},
download: function(t, e, i, n, r) {
var a, o, c = F[i] || F.default, u = this;
if (a = h.get(t)) r(null, a); else if (o = b.get(t)) {
o.push(r);
for (var l = 0, f = R.length; l < f; l++) {
var _ = R[l];
if (_.id === t) {
var d = n.priority || 0;
if (_.priority < d) {
_.priority = d;
w = !0;
}
return;
}
}
} else {
var p = n.maxRetryCount || this.maxRetryCount, m = n.maxConcurrency || this.maxConcurrency, y = n.maxRequestsPerFrame || this.maxRequestsPerFrame;
g((function(i, a) {
0 === i && b.add(t, [ r ]);
if (!u.limited) return c(v(e), n, a);
L();
function o() {
c(v(e), n, (function() {
O--;
if (!M && R.length > 0) {
s(N, m, y);
M = !0;
}
a.apply(this, arguments);
}));
}
if (O < m && I < y) {
o();
O++;
I++;
} else {
R.push({
id: t,
priority: n.priority || 0,
invoke: o
});
w = !0;
if (!M && O < m) {
s(N, m, y);
M = !0;
}
}
}), p, this.retryInterval, (function(e, i) {
e || h.add(t, i);
for (var n = b.remove(t), r = 0, s = n.length; r < s; r++) n[r](e, i);
}));
}
}
}, F = {
".png": E,
".jpg": E,
".bmp": E,
".jpeg": E,
".gif": E,
".ico": E,
".tiff": E,
".webp": E,
".image": E,
".pvr": A,
".pkm": A,
".mp3": y,
".ogg": y,
".wav": y,
".m4a": y,
".txt": S,
".xml": S,
".vsh": S,
".fsh": S,
".atlas": S,
".tmx": S,
".tsx": S,
".json": C,
".ExportJson": C,
".plist": S,
".fnt": S,
".font": r,
".eot": r,
".ttf": r,
".woff": r,
".svg": r,
".ttc": r,
".mp4": x,
".avi": x,
".mov": x,
".mpg": x,
".mpeg": x,
".rm": x,
".rmvb": x,
".binary": A,
".bin": A,
".dbbin": A,
".skel": A,
".js": u,
bundle: function(t, e, i) {
var n = cc.path.basename(t), r = t;
m.test(r) || (r = "assets/" + n);
var s = e.version || P.bundleVers[n], a = 0, o = null, c = null;
C(r + "/config." + (s ? s + "." : "") + "json", e, (function(t, e) {
t && (c = t);
(o = e) && (o.base = r + "/");
2 == ++a && i(c, o);
}));
u(r + "/index." + (s ? s + "." : "") + "js", e, (function(t) {
t && (c = t);
2 == ++a && i(c, o);
}));
},
default: S
};
e.exports = P;
}), {
"../CCDebug": 22,
"../platform/CCSys": 137,
"../platform/js": 149,
"../platform/utils": 152,
"./cache": 32,
"./download-dom-audio": 37,
"./download-dom-image": 38,
"./download-file": 39,
"./download-script.js": 40,
"./font-loader": 44,
"./shared": 54,
"./utilities": 57
} ],
42: [ (function(t, e) {
"use strict";
var i = t("./bundle"), n = t("./cache"), r = t("./shared"), s = r.assets, a = r.bundles, o = new n();
function c(t, e, i, n) {
var r = null, s = null;
try {
(r = new cc.Texture2D())._nativeUrl = t;
r._nativeAsset = e;
} catch (t) {
s = t;
}
n && n(s, r);
}
function u(t, e, i, n) {
var r = new cc.AudioClip();
r._nativeUrl = t;
r._nativeAsset = e;
r.duration = e.duration;
n && n(null, r);
}
function l(t, e, i, n) {
var r = new cc.JsonAsset();
r.json = e;
n && n(null, r);
}
function h(t, e, i, n) {
var r = new cc.TextAsset();
r.text = e;
n && n(null, r);
}
function f(t, e, i, n) {
var r = new cc.TTFFont();
r._nativeUrl = t;
r._nativeAsset = e;
n && n(null, r);
}
function _(t, e, i, n) {
var r = new cc.BufferAsset();
r._nativeUrl = t;
r._nativeAsset = e;
n && n(null, r);
}
var d = {
register: function(t, e) {
"object" == typeof t ? cc.js.mixin(p, t) : p[t] = e;
},
create: function(t, e, i, n, r) {
var a, c, u = p[i] || p.default;
if (a = s.get(t)) r(null, a); else if (c = o.get(t)) c.push(r); else {
o.add(t, [ r ]);
u(t, e, n, (function(e, i) {
if (!e && i instanceof cc.Asset) {
i._uuid = t;
s.add(t, i);
}
for (var n = o.remove(t), r = 0, a = n.length; r < a; r++) n[r](e, i);
}));
}
}
}, p = {
".png": c,
".jpg": c,
".bmp": c,
".jpeg": c,
".gif": c,
".ico": c,
".tiff": c,
".webp": c,
".image": c,
".pvr": c,
".pkm": c,
".mp3": u,
".ogg": u,
".wav": u,
".m4a": u,
".txt": h,
".xml": h,
".vsh": h,
".fsh": h,
".atlas": h,
".tmx": h,
".tsx": h,
".fnt": h,
".json": l,
".ExportJson": l,
".font": f,
".eot": f,
".ttf": f,
".woff": f,
".svg": f,
".ttc": f,
".binary": _,
".bin": _,
".dbbin": _,
".skel": _,
bundle: function(t, e, n, r) {
var s = a.get(e.name);
if (!s) {
s = new i();
e.base = e.base || t + "/";
s.init(e);
}
r && r(null, s);
},
default: function(t, e, i, n) {
var r = new cc.Asset();
r._nativeUrl = t;
r._nativeAsset = e;
n && n(null, r);
}
};
e.exports = d;
}), {
"./bundle": 31,
"./cache": 32,
"./shared": 54
} ],
43: [ (function(t, e) {
"use strict";
var i = t("./pack-manager"), n = t("./task"), r = t("./utilities"), s = r.getDepends, a = r.clear, o = r.forEach, c = t("./shared"), u = c.assets, l = c.fetchPipeline;
function h(t) {
for (var e = t.output, i = 0, n = e.length; i < n; i++) e[i].content && e[i].content.decRef(!1);
}
function f(t, e, i, n, r, a, o) {
var c = e.options.__exclude__, u = e.progress;
t.content = i;
t.file = n;
e.output.push(t);
if (r) {
c[t.uuid] = !0;
s(t.uuid, n || i, c, a, !0, !1, t.config);
u.total = o + a.length;
}
u.canInvoke && e.dispatch("progress", ++u.finish, u.total, t);
}
e.exports = function(t, e) {
var r = !1;
if (!t.progress) {
t.progress = {
finish: 0,
total: t.input.length,
canInvoke: !0
};
r = !0;
}
var s = t.options, c = [], _ = t.progress, d = _.total;
s.__exclude__ = s.__exclude__ || Object.create(null);
t.output = [];
o(t.input, (function(n, s) {
if (!n.isNative && u.has(n.uuid)) {
var a = u.get(n.uuid);
a.addRef();
f(n, t, a, null, a.__asyncLoadAssets__, c, d);
return s();
}
i.load(n, t.options, (function(i, a) {
if (i) {
if (!t.isFinish) if (!cc.assetManager.force || r) {
cc.error(i.message, i.stack);
_.canInvoke = !1;
e(i);
} else f(n, t, null, null, !1, c, d);
} else t.isFinish || f(n, t, null, a, !n.isNative, c, d);
s();
}));
}), (function() {
if (t.isFinish) {
a(t, !0);
return t.dispatch("error");
}
if (c.length > 0) {
var i = n.create({
name: t.name + " dependencies",
input: c,
progress: _,
options: s,
onProgress: t.onProgress,
onError: n.prototype.recycle,
onComplete: function(n) {
if (!n) {
t.output.push.apply(t.output, this.output);
i.recycle();
}
r && h(t);
e(n);
}
});
l.async(i);
} else {
r && h(t);
e();
}
}));
};
}), {
"./pack-manager": 48,
"./shared": 54,
"./task": 55,
"./utilities": 57
} ],
44: [ (function(t, e) {
"use strict";
var i, n = t("../utils/text-utils"), r = null, s = "BES bswy:->@123丁ぁᄁ", a = Object.create(null), o = -1, c = [], u = 3e3, l = (i = void 0, 
function() {
if (void 0 === i) if (window.FontFace) {
var t = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent), e = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
i = t ? parseInt(t[1], 10) > 42 : !e;
} else i = !1;
return i;
});
function h() {
for (var t = !0, e = Date.now(), i = c.length - 1; i >= 0; i--) {
var a = c[i], l = a.fontFamilyName;
if (e - a.startTime > u) {
cc.warnID(4933, l);
a.onComplete(null, l);
c.splice(i, 1);
} else {
var h = a.refWidth, f = "40px " + l;
r.font = f;
if (h !== n.safeMeasureText(r, s, f)) {
c.splice(i, 1);
a.onComplete(null, l);
} else t = !1;
}
}
if (t) {
clearInterval(o);
o = -1;
}
}
var f = {
loadFont: function(t, e, i) {
var _ = f._getFontFamily(t);
if (a[_]) return i(null, _);
if (!r) {
var d = document.createElement("canvas");
d.width = 100;
d.height = 100;
r = d.getContext("2d");
}
var p = "40px " + _;
r.font = p;
var v = n.safeMeasureText(r, s, p), g = document.createElement("style");
g.type = "text/css";
var m = "";
isNaN(_ - 0) ? m += "@font-face { font-family:" + _ + "; src:" : m += "@font-face { font-family:'" + _ + "'; src:";
m += "url('" + t + "');";
g.textContent = m + "}";
document.body.appendChild(g);
var y, E, T, C, A, S, x = document.createElement("div"), b = x.style;
b.fontFamily = _;
x.innerHTML = ".";
b.position = "absolute";
b.left = "-100px";
b.top = "-100px";
document.body.appendChild(x);
if (l()) y = Date.now(), E = _, T = i, C = new Promise(function(t, e) {
(function i() {
Date.now() - y >= u ? e() : document.fonts.load("40px " + E).then((function(e) {
e.length >= 1 ? t() : setTimeout(i, 100);
}), (function() {
e();
}));
})();
}), A = null, S = new Promise(function(t, e) {
A = setTimeout(e, u);
}), Promise.race([ S, C ]).then((function() {
if (A) {
clearTimeout(A);
A = null;
}
T(null, E);
}), (function() {
cc.warnID(4933, E);
T(null, E);
})); else {
var R = {
fontFamilyName: _,
refWidth: v,
onComplete: i,
startTime: Date.now()
};
c.push(R);
-1 === o && (o = setInterval(h, 100));
}
a[_] = g;
},
_getFontFamily: function(t) {
var e = t.lastIndexOf(".ttf");
if (-1 === e) return t;
var i, n = t.lastIndexOf("/");
-1 !== (i = -1 === n ? t.substring(0, e) + "_LABEL" : t.substring(n + 1, e) + "_LABEL").indexOf(" ") && (i = '"' + i + '"');
return i;
}
};
e.exports = f;
}), {
"../utils/text-utils": 203
} ],
45: [ (function(t, e) {
"use strict";
var i, n = t("./shared").bundles, r = {
decodeUuid: t("../utils/decode-uuid"),
getUuidFromURL: (i = /.*[\/\\][0-9a-fA-F]{2}[\/\\]([0-9a-fA-F-]{8,})/, function(t) {
var e = t.match(i);
return e ? e[1] : "";
}),
getUrlWithUuid: function(t, e) {
(e = e || Object.create(null)).__isNative__ = e.isNative;
e.ext = e.nativeExt;
var i = n.find((function(e) {
return e.getAssetInfo(t);
}));
i && (e.bundle = i.name);
return cc.assetManager._transform(t, e);
},
isScene: function(t) {
return t && (t.constructor === cc.SceneAsset || t instanceof cc.Scene);
},
normalize: function(t) {
t && (46 === t.charCodeAt(0) && 47 === t.charCodeAt(1) ? t = t.slice(2) : 47 === t.charCodeAt(0) && (t = t.slice(1)));
return t;
}
};
e.exports = r;
}), {
"../utils/decode-uuid": 192,
"./shared": 54
} ],
46: [ (function(t) {
"use strict";
t("./deprecated");
t("./CCAssetManager");
}), {
"./CCAssetManager": 29,
"./deprecated": 35
} ],
47: [ (function(t, e) {
"use strict";
var i = t("./pack-manager"), n = t("./pipeline"), r = t("./parser"), s = t("./utilities"), a = s.getDepends, o = s.cache, c = s.gatherAsset, u = s.setProperties, l = s.forEach, h = s.clear, f = s.checkCircleReference, _ = t("./shared"), d = _.assets, p = _.files, v = _.parsed, g = _.pipeline, m = t("./task"), y = new n("loadOneAsset", [ function(t, e) {
var n = t.output = t.input, r = n.options, s = n.isNative, a = n.uuid, o = n.file, c = r.reload;
if (o || !c && !s && d.has(a)) return e();
i.load(n, t.options, (function(t, i) {
n.file = i;
e(t);
}));
}, function(t, e) {
var i = t.output = t.input, n = t.progress, s = t.options.__exclude__, a = i.id, o = i.file, c = i.options;
if (i.isNative) r.parse(a, o, i.ext, c, (function(r, s) {
if (r) return e(r);
i.content = s;
n.canInvoke && t.dispatch("progress", ++n.finish, n.total, i);
p.remove(a);
v.remove(a);
e();
})); else {
var u = i.uuid;
if (u in s) {
var l = s[u], h = l.finish, _ = l.content, g = l.err, m = l.callbacks;
n.canInvoke && t.dispatch("progress", ++n.finish, n.total, i);
if (h || f(u, u, s)) {
_ && _.addRef && _.addRef();
i.content = _;
e(g);
} else m.push({
done: e,
item: i
});
} else if (!c.reload && d.has(u)) {
var y = d.get(u);
if (c.__asyncLoadAssets__ || !y.__asyncLoadAssets__) {
i.content = y.addRef();
n.canInvoke && t.dispatch("progress", ++n.finish, n.total, i);
e();
} else E(t, y, e, !1);
} else r.parse(a, o, "import", c, (function(i, n) {
if (i) return e(i);
n._uuid = u;
E(t, n, e, !0);
}));
}
} ]);
function E(t, e, i, n) {
var r = t.input, s = t.progress, c = r.uuid, l = r.id, h = r.options, f = r.config, _ = h.__asyncLoadAssets__, d = h.cacheAsset, y = [];
e.addRef && e.addRef();
a(c, e, Object.create(null), y, !1, _, f);
s.canInvoke && t.dispatch("progress", ++s.finish, s.total += y.length, r);
var E = t.options.__exclude__[c] = {
content: e,
finish: !1,
callbacks: [ {
done: i,
item: r
} ]
}, T = m.create({
input: y,
options: t.options,
onProgress: t.onProgress,
onError: m.prototype.recycle,
progress: s,
onComplete: function(t) {
e.decRef && e.decRef(!1);
e.__asyncLoadAssets__ = _;
E.finish = !0;
E.err = t;
if (!t) {
for (var i = Array.isArray(T.output) ? T.output : [ T.output ], r = Object.create(null), s = 0, a = i.length; s < a; s++) {
var h = i[s];
h && (r[h instanceof cc.Asset ? h._uuid + "@import" : c + "@native"] = h);
}
if (n) {
if (!u(c, e, r)) try {
e.onLoad && e.onLoad();
} catch (t) {
cc.error(t.message, t.stack);
}
p.remove(l);
v.remove(l);
o(c, e, void 0 !== d ? d : cc.assetManager.cacheAsset);
} else if (e.__nativeDepend__ && !e._nativeAsset && !u(c, e, r)) try {
e.onLoad && e.onLoad();
} catch (t) {
cc.error(t.message, t.stack);
}
T.recycle();
}
for (var f = E.callbacks, g = 0, m = f.length; g < m; g++) {
var y = f[g];
e.addRef && e.addRef();
y.item.content = e;
y.done(t);
}
f.length = 0;
}
});
g.async(T);
}
e.exports = function(t, e) {
var i = !1;
if (!t.progress) {
t.progress = {
finish: 0,
total: t.input.length,
canInvoke: !0
};
i = !0;
}
var n = t.options, r = t.progress;
n.__exclude__ = n.__exclude__ || Object.create(null);
t.output = [];
l(t.input, (function(s, a) {
var o = m.create({
input: s,
onProgress: t.onProgress,
options: n,
progress: r,
onComplete: function(n, s) {
if (n && !t.isFinish) if (!cc.assetManager.force || i) {
cc.error(n.message, n.stack);
r.canInvoke = !1;
e(n);
} else r.canInvoke && t.dispatch("progress", ++r.finish, r.total, s);
t.output.push(s);
o.recycle();
a();
}
});
y.async(o);
}), (function() {
n.__exclude__ = null;
if (t.isFinish) {
h(t, !0);
return t.dispatch("error");
}
c(t);
h(t, !0);
e();
}));
};
}), {
"./pack-manager": 48,
"./parser": 49,
"./pipeline": 50,
"./shared": 54,
"./task": 55,
"./utilities": 57
} ],
48: [ (function(t, e) {
"use strict";
var i = t("../platform/deserialize-compiled"), n = t("./downloader"), r = t("./cache"), s = t("../platform/js"), a = t("./shared").files, o = new r();
function c(t) {
return o.has(t.uuid);
}
var u = {
unpackJson: function(t, e, n, r) {
var a = s.createMap(!0), o = null;
if (Array.isArray(e)) {
(e = (0, i.unpackJSONs)(e, cc._MissingScript.safeFindClass)).length !== t.length && cc.errorID(4915);
for (var c = 0; c < t.length; c++) a[t[c] + "@import"] = e[c];
} else {
var u = s._getClassId(cc.Texture2D);
if (e.type === u) {
if (e.data) {
var l = e.data.split("|");
l.length !== t.length && cc.errorID(4915);
for (var h = 0; h < t.length; h++) a[t[h] + "@import"] = (0, i.packCustomObjData)(u, l[h]);
}
} else {
o = new Error("unmatched type pack!");
a = null;
}
}
r && r(o, a);
},
init: function() {
o.clear();
},
register: function(t, e) {
"object" == typeof t ? s.mixin(l, t) : l[t] = e;
},
unpack: function(t, e, i, n, r) {
e ? (0, l[i])(t, e, n, r) : r && r(new Error("package data is wrong!"));
},
load: function(t, e, i) {
if (t.isNative || !t.info || !t.info.packs) return n.download(t.id, t.url, t.ext, t.options, i);
if (a.has(t.id)) return i(null, a.get(t.id));
var r = t.info.packs, s = r.find(c);
if (s) return o.get(s.uuid).push({
onComplete: i,
id: t.id
});
s = r[0];
o.add(s.uuid, [ {
onComplete: i,
id: t.id
} ]);
var l = cc.assetManager._transform(s.uuid, {
ext: s.ext,
bundle: t.config.name
});
n.download(s.uuid, l, s.ext, t.options, (function(e, i) {
a.remove(s.uuid);
e && cc.error(e.message, e.stack);
u.unpack(s.packs, i, s.ext, t.options, (function(t, e) {
if (!t) for (var i in e) a.add(i, e[i]);
for (var n = o.remove(s.uuid), r = 0, c = n.length; r < c; r++) {
var u = n[r];
if (t) u.onComplete(t); else {
var l = e[u.id];
l ? u.onComplete(null, l) : u.onComplete(new Error("can not retrieve data from package"));
}
}
}));
}));
}
}, l = {
".json": u.unpackJson
};
e.exports = u;
}), {
"../platform/deserialize-compiled": 143,
"../platform/js": 149,
"./cache": 32,
"./downloader": 41,
"./shared": 54
} ],
49: [ (function(t, e) {
"use strict";
var i = t("../platform/CCSAXParser").plistParser, n = t("../platform/js"), r = t("./deserialize"), s = t("./cache"), a = t("./helper").isScene, o = t("./shared"), c = o.parsed, u = o.files, l = t("../platform/CCSys"), h = l.__audioSupport, f = l.capabilities, _ = new s(), d = {
parseImage: function(t, e, i) {
if (f.imageBitmap && t instanceof Blob) {
var n = {};
n.imageOrientation = e.__flipY__ ? "flipY" : "none";
n.premultiplyAlpha = e.__premultiplyAlpha__ ? "premultiply" : "none";
createImageBitmap(t, n).then((function(t) {
t.flipY = !!e.__flipY__;
t.premultiplyAlpha = !!e.__premultiplyAlpha__;
i && i(null, t);
}), (function(t) {
i && i(t, null);
}));
} else i && i(null, t);
},
parseAudio: function(t, e, i) {
t instanceof ArrayBuffer ? h.context.decodeAudioData(t, (function(t) {
i && i(null, t);
}), (function(t) {
i && i(t, null);
})) : i && i(null, t);
},
parsePVRTex: function(t, e, i) {
var n = null, r = null;
try {
var s = t instanceof ArrayBuffer ? t : t.buffer, a = new Int32Array(s, 0, 13);
if (55727696 != a[0]) throw new Error("Invalid magic number in PVR header");
var o = a[7], c = a[6], u = a[12] + 52;
r = {
_data: new Uint8Array(s, u),
_compressed: !0,
width: o,
height: c
};
} catch (t) {
n = t;
}
i && i(n, r);
},
parsePKMTex: (function() {
function t(t, e) {
return t[e] << 8 | t[e + 1];
}
return function(e, i, n) {
var r = null, s = null;
try {
var a = e instanceof ArrayBuffer ? e : e.buffer, o = new Uint8Array(a), c = t(o, 6);
if (0 !== c && 1 !== c && 3 !== c) return new Error("Invalid magic number in ETC header");
var u = t(o, 12), l = t(o, 14);
t(o, 8), t(o, 10);
s = {
_data: new Uint8Array(a, 16),
_compressed: !0,
width: u,
height: l
};
} catch (t) {
r = t;
}
n && n(r, s);
};
})(),
parsePlist: function(t, e, n) {
var r = null, s = i.parse(t);
s || (r = new Error("parse failed"));
n && n(r, s);
},
parseImport: function(t, e, i) {
if (!t) return i && i(new Error("Json is empty"));
var n, s = null;
try {
n = r(t, e);
} catch (t) {
s = t;
}
i && i(s, n);
},
init: function() {
_.clear();
},
register: function(t, e) {
"object" == typeof t ? n.mixin(p, t) : p[t] = e;
},
parse: function(t, e, i, n, r) {
var s, o, l;
if (s = c.get(t)) r(null, s); else if (o = _.get(t)) o.push(r); else if (l = p[i]) {
_.add(t, [ r ]);
l(e, n, (function(e, i) {
e ? u.remove(t) : a(i) || c.add(t, i);
for (var n = _.remove(t), r = 0, s = n.length; r < s; r++) n[r](e, i);
}));
} else r(null, e);
}
}, p = {
".png": d.parseImage,
".jpg": d.parseImage,
".bmp": d.parseImage,
".jpeg": d.parseImage,
".gif": d.parseImage,
".ico": d.parseImage,
".tiff": d.parseImage,
".webp": d.parseImage,
".image": d.parseImage,
".pvr": d.parsePVRTex,
".pkm": d.parsePKMTex,
".mp3": d.parseAudio,
".ogg": d.parseAudio,
".wav": d.parseAudio,
".m4a": d.parseAudio,
".plist": d.parsePlist,
import: d.parseImport
};
e.exports = d;
}), {
"../platform/CCSAXParser": 135,
"../platform/CCSys": 137,
"../platform/js": 149,
"./cache": 32,
"./deserialize": 36,
"./helper": 45,
"./shared": 54
} ],
50: [ (function(t, e) {
"use strict";
var i = t("./task"), n = 0;
function r(t, e) {
if (Array.isArray(e)) {
this.id = n++;
this.name = t;
this.pipes = [];
for (var i = 0, r = e.length; i < r; i++) "function" == typeof e[i] && this.pipes.push(e[i]);
} else cc.warn("funcs must be an array");
}
r.prototype = {
constructor: r,
insert: function(t, e) {
if (!("function" != typeof t || e > this.pipes.length)) {
this.pipes.splice(e, 0, t);
return this;
}
cc.warnID(4921);
},
append: function(t) {
if ("function" == typeof t) {
this.pipes.push(t);
return this;
}
},
remove: function(t) {
if ("number" == typeof t) {
this.pipes.splice(t, 1);
return this;
}
},
sync: function(t) {
var e = this.pipes;
if (t instanceof i && 0 !== e.length) {
if (null != t.output) {
t.input = t.output;
t.output = null;
}
t._isFinish = !1;
for (var n = 0, r = e.length; n < r; ) {
var s = (0, e[n])(t);
if (s) {
t._isFinish = !0;
return s;
}
if (++n !== r) {
t.input = t.output;
t.output = null;
}
}
t._isFinish = !0;
return t.output;
}
},
async: function(t) {
var e = this.pipes;
if (t instanceof i && 0 !== e.length) {
if (null != t.output) {
t.input = t.output;
t.output = null;
}
t._isFinish = !1;
this._flow(0, t);
}
},
_flow: function(t, e) {
var i = this;
(0, this.pipes[t])(e, (function(n) {
if (n) {
e._isFinish = !0;
e.onComplete && e.onComplete(n);
} else if (++t < i.pipes.length) {
e.input = e.output;
e.output = null;
i._flow(t, e);
} else {
e._isFinish = !0;
e.onComplete && e.onComplete(n, e.output);
}
}));
}
};
e.exports = r;
}), {
"./task": 55
} ],
51: [ (function(t, e) {
"use strict";
var i = t("./task"), n = t("./shared"), r = n.transformPipeline, s = n.RequestType;
e.exports = function(t, e) {
var n = t.options, a = Object.create(null), o = Object.create(null);
for (var c in n) switch (c) {
case s.PATH:
case s.UUID:
case s.DIR:
case s.SCENE:
case s.URL:
break;

case "__requestType__":
case "__isNative__":
case "ext":
case "type":
case "__nativeName__":
case "audioLoadMode":
case "bundle":
a[c] = n[c];
break;

case "__exclude__":
case "__outputAsArray__":
o[c] = n[c];
break;

default:
a[c] = n[c];
o[c] = n[c];
}
t.options = o;
var u = i.create({
input: t.input,
options: a
}), l = null;
try {
t.output = t.source = r.sync(u);
} catch (t) {
l = t;
for (var h = 0, f = u.output.length; h < f; h++) u.output[h].recycle();
}
u.recycle();
e(l);
};
}), {
"./shared": 54,
"./task": 55
} ],
52: [ (function(t, e) {
"use strict";
var i = t("./depend-util"), n = t("./cache");
t("../assets/CCAsset");
var r = t("./shared").assets;
function s(t, e) {
t._uuid && e.push(t._uuid);
}
function a(t, e) {
for (var i = Object.getOwnPropertyNames(t), n = 0; n < i.length; n++) {
var r = i[n];
if ("node" !== r && "__eventTargets" !== r) {
var a = t[r];
if ("object" == typeof a && a) if (Array.isArray(a)) for (var o = 0; o < a.length; o++) {
var c = a[o];
c instanceof cc.Asset && s(c, e);
} else if (a.constructor && a.constructor !== Object) a instanceof cc.Asset && s(a, e); else for (var u = Object.getOwnPropertyNames(a), l = 0; l < u.length; l++) {
var h = a[u[l]];
h instanceof cc.Asset && s(h, e);
}
}
}
}
var o = [];
function c(t, e) {
for (var i = 0; i < t._components.length; i++) a(t._components[i], e);
for (var n = 0; n < t._children.length; n++) c(t._children[n], e);
}
function u(t, e, n, s) {
n.push(t._uuid);
for (var a = i.getDeps(t._uuid), o = 0, c = a.length; o < c; o++) {
var l = r.get(a[o]);
if (l) {
var h = l._uuid;
h in e ? e[h] += s : e[h] = l.refCount + s;
if (n.includes(h)) continue;
u(l, e, n, s);
}
}
}
function l(t) {
var e = Object.create(null);
e[t._uuid] = t.refCount;
u(t, e, o, -1);
o.length = 0;
if (0 !== e[t._uuid]) return e[t._uuid];
for (var i in e) 0 !== e[i] && u(r.get(i), e, o, 1);
o.length = 0;
return e[t._uuid];
}
var h = new n(), f = new n(), _ = !1;
function d() {
_ = !1;
f.forEach((function(t) {
p._free(t);
}));
f.clear();
}
var p = {
init: function() {
h.clear();
f.clear();
},
_addPersistNodeRef: function(t) {
var e = [];
c(t, e);
for (var i = 0, n = e.length; i < n; i++) {
var s = r.get(e[i]);
s && s.addRef();
}
h.add(t.uuid, e);
},
_removePersistNodeRef: function(t) {
if (h.has(t.uuid)) {
for (var e = h.get(t.uuid), i = 0, n = e.length; i < n; i++) {
var s = r.get(e[i]);
s && s.decRef();
}
h.remove(t.uuid);
}
},
_autoRelease: function(t, e, n) {
for (var s = 0, a = n.length; s < a; s++) {
for (var o = n[s], c = i._depends.get(e._id), u = h.get(o.uuid), l = 0, f = u.length; l < f; l++) {
var _ = r.get(u[l]);
_ && _.addRef();
}
if (c) {
!c.persistDeps && (c.persistDeps = []);
c.persistDeps.push.apply(c.persistDeps, u);
}
}
if (t) {
for (var d = i.getDeps(t._id), p = 0, v = d.length; p < v; p++) {
var g = r.get(d[p]);
g && g.decRef(t.autoReleaseAssets);
}
var m = i._depends.get(t._id);
if (m && m.persistDeps) for (var y = m.persistDeps, E = 0, T = y.length; E < T; E++) {
var C = r.get(y[E]);
C && C.decRef(t.autoReleaseAssets);
}
i.remove(t._id);
}
},
_free: function(t, e) {
f.remove(t._uuid);
if (cc.isValid(t, !0) && !(!e && t.refCount > 0 && l(t) > 0)) {
r.remove(t._uuid);
for (var n = i.getDeps(t._uuid), s = 0, a = n.length; s < a; s++) {
var o = r.get(n[s]);
if (o) {
o.decRef(!1);
p._free(o, !1);
}
}
t.destroy();
i.remove(t._uuid);
}
},
tryRelease: function(t, e) {
if (t instanceof cc.Asset) if (e) p._free(t, e); else {
f.add(t._uuid, t);
if (!_) {
_ = !0;
cc.director.once(cc.Director.EVENT_AFTER_DRAW, d);
}
}
}
};
e.exports = p;
}), {
"../assets/CCAsset": 58,
"./cache": 32,
"./depend-util": 34,
"./shared": 54
} ],
53: [ (function(t, e) {
"use strict";
var i = [];
function n() {
this._id = "";
this.uuid = "";
this.url = "";
this.ext = ".json";
this.content = null;
this.file = null;
this.info = null;
this.config = null;
this.isNative = !1;
this.options = Object.create(null);
}
n.prototype = {
constructor: n,
get id() {
this._id || (this._id = this.uuid + "@" + (this.isNative ? "native" : "import"));
return this._id;
},
recycle: function() {
if (500 !== i.length) {
this._id = "";
this.uuid = "";
this.url = "";
this.ext = ".json";
this.content = null;
this.file = null;
this.info = null;
this.config = null;
this.isNative = !1;
this.options = Object.create(null);
i.push(this);
}
}
};
n.create = function() {
return 0 !== i.length ? i.pop() : new n();
};
e.exports = n;
}), {} ],
54: [ (function(t, e) {
"use strict";
var i = t("./cache"), n = t("./pipeline"), r = new i(), s = new i(), a = new i(), o = new i(), c = new n("normal load", []), u = new n("fetch", []), l = new n("transform url", []);
e.exports = {
assets: r,
files: s,
parsed: a,
pipeline: c,
fetchPipeline: u,
transformPipeline: l,
RequestType: {
UUID: "uuid",
PATH: "path",
DIR: "dir",
URL: "url",
SCENE: "scene"
},
bundles: o,
BuiltinBundleName: {
RESOURCES: "resources",
INTERNAL: "internal",
MAIN: "main",
START_SCENE: "start-scene"
}
};
}), {
"./cache": 32,
"./pipeline": 50
} ],
55: [ (function(t, e) {
"use strict";
var i = 0, n = [];
function r(t) {
this.id = i++;
this._isFinish = !0;
this.onComplete = null;
this.onProgress = null;
this.onError = null;
this.source = null;
this.output = null;
this.input = null;
this.progress = null;
this.options = null;
this.set(t);
}
r.prototype = {
constructor: r,
set: function(t) {
t = t || Object.create(null);
this.onComplete = t.onComplete;
this.onProgress = t.onProgress;
this.onError = t.onError;
this.source = this.input = t.input;
this.output = null;
this.progress = t.progress;
this.options = t.options || Object.create(null);
},
dispatch: function(t, e, i, n, r) {
switch (t) {
case "complete":
this.onComplete && this.onComplete(e, i, n, r);
break;

case "progress":
this.onProgress && this.onProgress(e, i, n, r);
break;

case "error":
this.onError && this.onError(e, i, n, r);
break;

default:
var s = "on" + t[0].toUpperCase() + t.substr(1);
"function" == typeof this[s] && this[s](e, i, n, r);
}
},
recycle: function() {
if (500 !== n.length) {
this.onComplete = null;
this.onProgress = null;
this.onError = null;
this.source = this.output = this.input = null;
this.progress = null;
this.options = null;
n.push(this);
}
},
get isFinish() {
return this._isFinish;
}
};
r.create = function(t) {
var e = null;
0 !== n.length ? (e = n.pop()).set(t) : e = new r(t);
return e;
};
e.exports = r;
}), {} ],
56: [ (function(t, e) {
"use strict";
var i = t("./helper").decodeUuid, n = t("./request-item"), r = t("./shared"), s = r.RequestType, a = r.bundles;
e.exports = {
parse: function(t) {
var e = t.input, r = t.options;
e = Array.isArray(e) ? e : [ e ];
t.output = [];
for (var o = 0; o < e.length; o++) {
var c = e[o], u = n.create();
"string" == typeof c && ((c = Object.create(null))[r.__requestType__ || s.UUID] = e[o]);
if ("object" == typeof c) {
cc.js.addon(c, r);
c.preset && cc.js.addon(c, cc.assetManager.presets[c.preset]);
for (var l in c) {
switch (l) {
case s.UUID:
var h = u.uuid = i(c.uuid);
if (a.has(c.bundle)) {
if ((p = (v = a.get(c.bundle)._config).getAssetInfo(h)) && p.redirect) {
if (!a.has(p.redirect)) throw new Error("Please load bundle " + p.redirect + " first");
p = (v = a.get(p.redirect)._config).getAssetInfo(h);
}
u.config = v;
u.info = p;
}
u.ext = c.ext || ".json";
break;

case "__requestType__":
case "ext":
case "bundle":
case "preset":
case "type":
break;

case s.DIR:
if (a.has(c.bundle)) {
var f = [];
a.get(c.bundle)._config.getDirWithPath(c.dir, c.type, f);
for (var _ = 0, d = f.length; _ < d; _++) {
var p = f[_];
e.push({
uuid: p.uuid,
__isNative__: !1,
ext: ".json",
bundle: c.bundle
});
}
}
u.recycle();
u = null;
break;

case s.PATH:
if (a.has(c.bundle)) {
if ((p = (v = a.get(c.bundle)._config).getInfoWithPath(c.path, c.type)) && p.redirect) {
if (!a.has(p.redirect)) throw new Error("you need to load bundle " + p.redirect + " first");
p = (v = a.get(p.redirect)._config).getAssetInfo(p.uuid);
}
if (!p) {
u.recycle();
throw new Error("Bundle " + c.bundle + " doesn't contain " + c.path);
}
u.config = v;
u.uuid = p.uuid;
u.info = p;
}
u.ext = c.ext || ".json";
break;

case s.SCENE:
if (a.has(c.bundle)) {
var v;
if ((p = (v = a.get(c.bundle)._config).getSceneInfo(c.scene)) && p.redirect) {
if (!a.has(p.redirect)) throw new Error("you need to load bundle " + p.redirect + " first");
p = (v = a.get(p.redirect)._config).getAssetInfo(p.uuid);
}
if (!p) {
u.recycle();
throw new Error("Bundle " + v.name + " doesn't contain scene " + c.scene);
}
u.config = v;
u.uuid = p.uuid;
u.info = p;
}
break;

case "__isNative__":
u.isNative = c.__isNative__;
break;

case s.URL:
u.url = c.url;
u.uuid = c.uuid || c.url;
u.ext = c.ext || cc.path.extname(c.url);
u.isNative = void 0 === c.__isNative__ || c.__isNative__;
break;

default:
u.options[l] = c[l];
}
if (!u) break;
}
}
if (u) {
t.output.push(u);
if (!u.uuid && !u.url) throw new Error("unknown input:" + c.toString());
}
}
return null;
},
combine: function(t) {
for (var e = t.output = t.input, i = 0; i < e.length; i++) {
var n = e[i];
if (!n.url) {
var r, s, a = n.config;
s = n.isNative ? a && a.nativeBase ? a.base + a.nativeBase : cc.assetManager.generalNativeBase : a && a.importBase ? a.base + a.importBase : cc.assetManager.generalImportBase;
var o = n.uuid, c = "";
n.info && (c = n.isNative ? n.info.nativeVer ? "." + n.info.nativeVer : "" : n.info.ver ? "." + n.info.ver : "");
r = ".ttf" === n.ext ? s + "/" + o.slice(0, 2) + "/" + o + c + "/" + n.options.__nativeName__ : s + "/" + o.slice(0, 2) + "/" + o + c + n.ext;
n.url = r;
}
}
return null;
}
};
}), {
"./helper": 45,
"./request-item": 53,
"./shared": 54
} ],
57: [ (function(t, e) {
"use strict";
var i = t("./depend-util"), n = t("./helper"), r = n.isScene, s = n.decodeUuid, a = t("./shared").assets, o = t("../platform/utils").callInNextTick;
t("../assets/CCAsset");
var c = {
processOptions: function(t) {
var e = t.uuids, i = t.paths, n = t.types, r = t.deps, a = t.paths = Object.create(null);
if (!1 === t.debug) {
for (var o = 0, c = e.length; o < c; o++) e[o] = s(e[o]);
for (var u in i) {
var l = i[u], h = l[1];
l[1] = n[h];
}
} else {
for (var f = Object.create(null), _ = 0, d = e.length; _ < d; _++) {
var p = e[_];
e[_] = f[p] = s(p);
}
e = f;
}
for (var v in i) {
var g = i[v];
a[e[v]] = g;
}
var m = t.scenes;
for (var y in m) {
var E = m[y];
m[y] = e[E];
}
var T = t.packs;
for (var C in T) for (var A = T[C], S = 0; S < A.length; ++S) A[S] = e[A[S]];
var x = t.versions;
if (x) for (var b in x) for (var R = x[b], w = 0; w < R.length; w += 2) {
var O = R[w];
R[w] = e[O] || O;
}
var I = t.redirect;
if (I) for (var D = 0; D < I.length; D += 2) {
I[D] = e[I[D]];
I[D + 1] = r[I[D + 1]];
}
},
clear: function(t, e) {
for (var i = 0, n = t.input.length; i < n; i++) {
var r = t.input[i];
e && !r.isNative && r.content && r.content.decRef && r.content.decRef(!1);
r.recycle();
}
t.input = null;
},
urlAppendTimestamp: function(t) {
return cc.assetManager.downloader.appendTimeStamp && "string" == typeof t ? /\?/.test(t) ? t + "&_t=" + (new Date() - 0) : t + "?_t=" + (new Date() - 0) : t;
},
retry: function(t, e, i, n, r) {
t(r = r || 0, (function(s, a) {
r++;
!s || r > e ? n && n(s, a) : setTimeout((function() {
c.retry(t, e, i, n, r);
}), i);
}));
},
getDepends: function(t, e, n, r, s, a, o) {
try {
var c = i.parse(t, e), u = !0;
e instanceof cc.Asset && (!e.__nativeDepend__ || e._nativeAsset) && (u = !1);
if (s) {
for (var l = 0, h = c.deps.length; l < h; l++) {
var f = c.deps[l];
if (!(f in n)) {
n[f] = !0;
r.push({
uuid: f,
bundle: o && o.name
});
}
}
if (u && c.nativeDep) {
o && (c.nativeDep.bundle = o.name);
r.push(Object.assign({}, c.nativeDep));
}
} else {
a = !!e.asyncLoadAssets || a && !c.preventDeferredLoadDependents;
for (var _ = 0, d = c.deps.length; _ < d; _++) {
var p = c.deps[_];
if (!(p in n)) {
n[p] = !0;
r.push({
uuid: p,
__asyncLoadAssets__: a,
bundle: o && o.name
});
}
}
if (u && !a && !c.preventPreloadNativeObject && c.nativeDep) {
o && (c.nativeDep.bundle = o.name);
r.push(Object.assign({}, c.nativeDep));
}
}
} catch (t) {
cc.error(t.message, t.stack);
}
},
cache: function(t, e, i) {
if (e) {
!r(e) && i && a.add(t, e);
}
},
setProperties: function(t, e, i) {
var n = !1, r = e.__depends__;
if (r) {
for (var s = 0, a = r.length; s < a; s++) {
var o = r[s], c = i[o.uuid + "@import"];
if (c) o.owner[o.prop] = c.addRef(); else {
cc.error("The asset " + o.uuid + " is missing!");
n = !0;
}
}
e.__depends__ = void 0;
}
if (e.__nativeDepend__) {
e._nativeAsset || (i[t + "@native"] ? e._nativeAsset = i[t + "@native"] : n = !0);
e.__nativeDepend__ = void 0;
}
return n;
},
gatherAsset: function(t) {
var e = t.source;
if (t.options.__outputAsArray__ || 1 !== e.length) for (var i = t.output = [], n = 0, r = e.length; n < r; n++) i.push(e[n].content); else t.output = e[0].content;
},
forEach: function(t, e, i) {
var n = 0, r = [];
0 === t.length && i && i(r);
for (var s = 0, a = t.length; s < a; s++) e(t[s], (function(t) {
t && r.push(t);
++n === a && i && i(r);
}));
},
parseParameters: function(t, e, i) {
if (void 0 === i) {
var n = "function" == typeof t;
if (e) {
i = e;
n || (e = null);
} else if (void 0 === e && n) {
i = t;
t = null;
e = null;
}
if (void 0 !== e && n) {
e = t;
t = null;
}
}
return {
options: t = t || Object.create(null),
onProgress: e,
onComplete: i
};
},
parseLoadResArgs: function(t, e, i) {
if (void 0 === i) {
var n = cc.js.isChildClassOf(t, cc.Asset);
if (e) {
i = e;
n && (e = null);
} else if (void 0 === e && !n) {
i = t;
e = null;
t = null;
}
if (void 0 !== e && !n) {
e = t;
t = null;
}
}
return {
type: t,
onProgress: e,
onComplete: i
};
},
checkCircleReference: function(t, e, n, r) {
r || (r = Object.create(null));
if (!n[e] || r[e]) return !1;
r[e] = !0;
var s = !1, a = i.getDeps(e);
if (a) for (var o = 0, u = a.length; o < u; o++) {
var l = a[o];
if (l === t || c.checkCircleReference(t, l, n, r)) {
s = !0;
break;
}
}
return s;
},
asyncify: function(t) {
return function(e, i) {
t && o(t, e, i);
};
}
};
e.exports = c;
}), {
"../assets/CCAsset": 58,
"../platform/utils": 152,
"./depend-util": 34,
"./helper": 45,
"./shared": 54
} ],
58: [ (function(t, e) {
"use strict";
var i = t("../platform/CCObject");
cc.Asset = cc.Class({
name: "cc.Asset",
extends: i,
ctor: function() {
Object.defineProperty(this, "_uuid", {
value: "",
writable: !0
});
this.loaded = !0;
this._nativeUrl = "";
this._ref = 0;
},
properties: {
nativeUrl: {
get: function() {
if (!this._nativeUrl && this._native) {
var t = this._native;
if (47 === t.charCodeAt(0)) return t.slice(1);
46 === t.charCodeAt(0) ? this._nativeUrl = cc.assetManager.utils.getUrlWithUuid(this._uuid, {
nativeExt: t,
isNative: !0
}) : this._nativeUrl = cc.assetManager.utils.getUrlWithUuid(this._uuid, {
__nativeName__: t,
nativeExt: cc.path.extname(t),
isNative: !0
});
}
return this._nativeUrl;
},
visible: !1
},
refCount: {
get: function() {
return this._ref;
}
},
_native: "",
_nativeAsset: {
get: function() {
return this._$nativeAsset;
},
set: function(t) {
this._$nativeAsset = t;
}
},
_nativeDep: {
get: function() {
if (this._native) return {
__isNative__: !0,
uuid: this._uuid,
ext: this._native
};
}
}
},
statics: {
deserialize: !1,
preventDeferredLoadDependents: !1,
preventPreloadNativeObject: !1
},
toString: function() {
return this.nativeUrl;
},
serialize: !1,
createNode: null,
_setRawAsset: function(t, e) {
this._native = !1 !== e ? t || void 0 : "/" + t;
},
addRef: function() {
this._ref++;
return this;
},
decRef: function(t) {
this._ref--;
!1 !== t && cc.assetManager._releaseManager.tryRelease(this);
return this;
}
});
e.exports = cc.Asset;
}), {
"../platform/CCObject": 134
} ],
59: [ (function(t, e) {
"use strict";
var i = t("./CCAsset"), n = t("../event/event-target"), r = cc.Enum({
WEB_AUDIO: 0,
DOM_AUDIO: 1
}), s = cc.Class({
name: "cc.AudioClip",
extends: i,
mixins: [ n ],
ctor: function() {
this._loading = !1;
this.loaded = !1;
this._audio = null;
},
properties: {
duration: 0,
loadMode: {
default: r.WEB_AUDIO,
type: r
},
_nativeAsset: {
get: function() {
return this._audio;
},
set: function(t) {
t instanceof cc.AudioClip ? this._audio = t._nativeAsset : this._audio = t;
if (this._audio) {
this.loaded = !0;
this.emit("load");
}
},
override: !0
},
_nativeDep: {
get: function() {
return {
uuid: this._uuid,
audioLoadMode: this.loadMode,
ext: cc.path.extname(this._native),
__isNative__: !0
};
},
override: !0
}
},
statics: {
LoadMode: r,
_loadByUrl: function(t, e) {
var i = cc.assetManager.assets.get(t);
i ? e(null, i) : cc.assetManager.loadRemote(t, (function(t, i) {
if (t) return e(t);
e(null, i);
}));
}
},
_ensureLoaded: function(t) {
if (this.loaded) return t && t();
t && this.once("load", t);
if (!this._loading) {
this._loading = !0;
var e = this;
cc.assetManager.postLoadNative(this, (function() {
e._loading = !1;
}));
}
},
destroy: function() {
cc.audioEngine.uncache(this);
this._super();
}
});
cc.AudioClip = s;
e.exports = s;
}), {
"../event/event-target": 118,
"./CCAsset": 58
} ],
60: [ (function(t, e) {
"use strict";
var i = function() {
this.u = 0;
this.v = 0;
this.w = 0;
this.h = 0;
this.offsetX = 0;
this.offsetY = 0;
this.textureID = 0;
this.valid = !1;
this.xAdvance = 0;
}, n = function(t) {
this._letterDefinitions = {};
this._texture = t;
};
n.prototype = {
constructor: n,
addLetterDefinitions: function(t, e) {
this._letterDefinitions[t] = e;
},
cloneLetterDefinition: function() {
var t = {};
for (var e in this._letterDefinitions) {
var n = new i();
cc.js.mixin(n, this._letterDefinitions[e]);
t[e] = n;
}
return t;
},
getTexture: function() {
return this._texture;
},
getLetter: function(t) {
return this._letterDefinitions[t];
},
getLetterDefinitionForChar: function(t) {
var e = t.charCodeAt(0);
return this._letterDefinitions.hasOwnProperty(e) ? this._letterDefinitions[e] : null;
},
clear: function() {
this._letterDefinitions = {};
}
};
var r = cc.Class({
name: "cc.BitmapFont",
extends: cc.Font,
properties: {
fntDataStr: {
default: ""
},
spriteFrame: {
default: null,
type: cc.SpriteFrame
},
fontSize: {
default: -1
},
_fntConfig: null,
_fontDefDictionary: null
},
onLoad: function() {
var t = this.spriteFrame;
!this._fontDefDictionary && t && (this._fontDefDictionary = new n(t._texture));
var e = this._fntConfig;
if (e) {
var r = e.fontDefDictionary;
for (var s in r) {
var a = new i(), o = r[s].rect;
a.offsetX = r[s].xOffset;
a.offsetY = r[s].yOffset;
a.w = o.width;
a.h = o.height;
a.u = o.x;
a.v = o.y;
a.textureID = 0;
a.valid = !0;
a.xAdvance = r[s].xAdvance;
this._fontDefDictionary.addLetterDefinitions(s, a);
}
}
}
});
cc.BitmapFont = r;
cc.BitmapFont.FontLetterDefinition = i;
cc.BitmapFont.FontAtlas = n;
e.exports = r;
}), {} ],
61: [ (function(t, e) {
"use strict";
var i = cc.Class({
name: "cc.BufferAsset",
extends: cc.Asset,
ctor: function() {
this._buffer = null;
},
properties: {
_nativeAsset: {
get: function() {
return this._buffer;
},
set: function(t) {
this._buffer = t.buffer || t;
},
override: !0
},
buffer: function() {
return this._buffer;
}
}
});
cc.BufferAsset = e.exports = i;
}), {} ],
62: [ (function(t, e) {
"use strict";
var i = cc.Class({
name: "cc.Font",
extends: cc.Asset
});
cc.Font = e.exports = i;
}), {} ],
63: [ (function(t, e) {
"use strict";
var i = cc.Class({
name: "cc.JsonAsset",
extends: cc.Asset,
properties: {
json: null
}
});
e.exports = cc.JsonAsset = i;
}), {} ],
64: [ (function(t, e) {
"use strict";
var i = cc.Class({
name: "cc.LabelAtlas",
extends: cc.BitmapFont,
onLoad: function() {
this.spriteFrame ? this._fntConfig ? this._super() : cc.warnID(9101, this.name) : cc.warnID(9100, this.name);
}
});
cc.LabelAtlas = i;
e.exports = i;
}), {} ],
65: [ (function(t, e) {
"use strict";
var i = cc.Enum({
AUTO: 0,
SINGLE_INSTANCE: 1,
MULTI_INSTANCE: 2
}), n = cc.Class({
name: "cc.Prefab",
extends: cc.Asset,
ctor: function() {
this._createFunction = null;
this._instantiatedTimes = 0;
},
properties: {
data: null,
optimizationPolicy: i.AUTO,
asyncLoadAssets: !1,
readonly: {
default: !1,
editorOnly: !0
}
},
statics: {
OptimizationPolicy: i,
OptimizationPolicyThreshold: 3
},
createNode: !1,
compileCreateFunction: function() {
var e = t("../platform/instantiate-jit");
this._createFunction = e.compile(this.data);
},
_doInstantiate: function(t) {
this.data._prefab || cc.warnID(3700);
this._createFunction || this.compileCreateFunction();
return this._createFunction(t);
},
_instantiate: function() {
var t;
if (this.optimizationPolicy !== i.SINGLE_INSTANCE && (this.optimizationPolicy === i.MULTI_INSTANCE || this._instantiatedTimes + 1 >= n.OptimizationPolicyThreshold)) {
t = this._doInstantiate();
this.data._instantiate(t);
} else t = this.data._instantiate();
++this._instantiatedTimes;
return t;
},
destroy: function() {
this.data && this.data.destroy();
this._super();
}
});
cc.Prefab = e.exports = n;
cc.js.obsolete(cc, "cc._Prefab", "Prefab");
}), {
"../platform/instantiate-jit": 147
} ],
66: [ (function(t, e) {
"use strict";
var i, n = (i = t("../../renderer/gfx")) && i.__esModule ? i : {
default: i
}, r = t("../renderer"), s = t("./CCTexture2D"), a = cc.Enum({
RB_FMT_D24S8: n.default.RB_FMT_D24S8,
RB_FMT_S8: n.default.RB_FMT_S8,
RB_FMT_D16: n.default.RB_FMT_D16
}), o = cc.Class({
name: "cc.RenderTexture",
extends: s,
statics: {
DepthStencilFormat: a
},
ctor: function() {
this._framebuffer = null;
},
initWithSize: function(t, e, i) {
this.width = Math.floor(t || cc.visibleRect.width);
this.height = Math.floor(e || cc.visibleRect.height);
this._resetUnderlyingMipmaps();
var s, a = {
colors: [ this._texture ]
};
this._depthStencilBuffer && this._depthStencilBuffer.destroy();
if (i) {
s = new n.default.RenderBuffer(r.device, i, t, e);
i === n.default.RB_FMT_D24S8 ? a.depthStencil = s : i === n.default.RB_FMT_S8 ? a.stencil = s : i === n.default.RB_FMT_D16 && (a.depth = s);
}
this._depthStencilBuffer = s;
this._framebuffer && this._framebuffer.destroy();
this._framebuffer = new n.default.FrameBuffer(r.device, t, e, a);
this._packable = !1;
this.loaded = !0;
this.emit("load");
},
updateSize: function(t, e) {
this.width = Math.floor(t || cc.visibleRect.width);
this.height = Math.floor(e || cc.visibleRect.height);
this._resetUnderlyingMipmaps();
var i = this._depthStencilBuffer;
i && i.update(this.width, this.height);
this._framebuffer._width = t;
this._framebuffer._height = e;
},
drawTextureAt: function(t, e, i) {
t._image && 0 !== t._image.width && this._texture.updateSubImage({
x: e,
y: i,
image: t._image,
width: t.width,
height: t.height,
level: 0,
flipY: !1,
premultiplyAlpha: t._premultiplyAlpha
});
},
readPixels: function(t, e, i, n, r) {
if (!this._framebuffer || !this._texture) return t;
e = e || 0;
i = i || 0;
var s = n || this.width, a = r || this.height;
t = t || new Uint8Array(s * a * 4);
var o = cc.game._renderContext, c = o.getParameter(o.FRAMEBUFFER_BINDING);
o.bindFramebuffer(o.FRAMEBUFFER, this._framebuffer.getHandle());
o.readPixels(e, i, s, a, o.RGBA, o.UNSIGNED_BYTE, t);
o.bindFramebuffer(o.FRAMEBUFFER, c);
return t;
},
destroy: function() {
this._super();
if (this._framebuffer) {
this._framebuffer.destroy();
this._framebuffer = null;
}
}
});
cc.RenderTexture = e.exports = o;
}), {
"../../renderer/gfx": 231,
"../renderer": 159,
"./CCTexture2D": 73
} ],
67: [ (function(t, e) {
"use strict";
var i = cc.Class({
name: "cc.SceneAsset",
extends: cc.Asset,
properties: {
scene: null,
asyncLoadAssets: void 0
}
});
cc.SceneAsset = i;
e.exports = i;
}), {} ],
68: [ (function() {
"use strict";
var t = cc.Class({
name: "cc.Script",
extends: cc.Asset
});
cc._Script = t;
var e = cc.Class({
name: "cc.JavaScript",
extends: t
});
cc._JavaScript = e;
var i = cc.Class({
name: "cc.TypeScript",
extends: t
});
cc._TypeScript = i;
}), {} ],
69: [ (function(t, e) {
"use strict";
var i = cc.Class({
name: "cc.SpriteAtlas",
extends: cc.Asset,
properties: {
_spriteFrames: {
default: {}
}
},
getTexture: function() {
var t = Object.keys(this._spriteFrames);
if (t.length > 0) {
var e = this._spriteFrames[t[0]];
return e ? e.getTexture() : null;
}
return null;
},
getSpriteFrame: function(t) {
var e = this._spriteFrames[t];
if (!e) return null;
e.name || (e.name = t);
return e;
},
getSpriteFrames: function() {
var t = [], e = this._spriteFrames;
for (var i in e) t.push(this.getSpriteFrame(i));
return t;
}
});
cc.SpriteAtlas = i;
e.exports = i;
}), {} ],
70: [ (function(t, e) {
"use strict";
var i = t("../event/event-target"), n = [ {
u: 0,
v: 0
}, {
u: 0,
v: 0
}, {
u: 0,
v: 0
}, {
u: 0,
v: 0
} ], r = cc.Class({
name: "cc.SpriteFrame",
extends: t("../assets/CCAsset"),
mixins: [ i ],
properties: {
_textureSetter: {
set: function(t) {
t && this._texture !== t && this._refreshTexture(t);
}
},
insetTop: {
get: function() {
return this._capInsets[1];
},
set: function(t) {
this._capInsets[1] = t;
this._texture && this._calculateSlicedUV();
}
},
insetBottom: {
get: function() {
return this._capInsets[3];
},
set: function(t) {
this._capInsets[3] = t;
this._texture && this._calculateSlicedUV();
}
},
insetLeft: {
get: function() {
return this._capInsets[0];
},
set: function(t) {
this._capInsets[0] = t;
this._texture && this._calculateSlicedUV();
}
},
insetRight: {
get: function() {
return this._capInsets[2];
},
set: function(t) {
this._capInsets[2] = t;
this._texture && this._calculateSlicedUV();
}
}
},
ctor: function() {
i.call(this);
var t = arguments[0], e = arguments[1], n = arguments[2], r = arguments[3], s = arguments[4];
this._rect = null;
this.uv = [];
this._texture = null;
this._original = null;
this._offset = null;
this._originalSize = null;
this._rotated = !1;
this._flipX = !1;
this._flipY = !1;
this.vertices = null;
this._capInsets = [ 0, 0, 0, 0 ];
this.uvSliced = [];
void 0 !== t && this.setTexture(t, e, n, r, s);
},
textureLoaded: function() {
return this._texture && this._texture.loaded;
},
onTextureLoaded: function(t, e) {
if (!this.textureLoaded()) {
this.once("load", t, e);
this.ensureLoadTexture();
return !1;
}
t.call(e);
return !0;
},
isRotated: function() {
return this._rotated;
},
setRotated: function(t) {
this._rotated = t;
this._texture && this._calculateUV();
},
isFlipX: function() {
return this._flipX;
},
isFlipY: function() {
return this._flipY;
},
setFlipX: function(t) {
this._flipX = t;
this._texture && this._calculateUV();
},
setFlipY: function(t) {
this._flipY = t;
this._texture && this._calculateUV();
},
getRect: function() {
return cc.rect(this._rect);
},
setRect: function(t) {
this._rect = t;
this._texture && this._calculateUV();
},
getOriginalSize: function() {
return cc.size(this._originalSize);
},
setOriginalSize: function(t) {
if (this._originalSize) {
this._originalSize.width = t.width;
this._originalSize.height = t.height;
} else this._originalSize = cc.size(t);
},
getTexture: function() {
return this._texture;
},
_textureLoadedCallback: function() {
var t = this._texture;
if (t) {
var e = t.width, i = t.height;
this._rect ? this._checkRect(this._texture) : this._rect = cc.rect(0, 0, e, i);
this._originalSize || this.setOriginalSize(cc.size(e, i));
this._offset || this.setOffset(cc.v2(0, 0));
this._calculateUV();
this.emit("load");
}
},
_refreshTexture: function(t) {
this._texture = t;
t.loaded ? this._textureLoadedCallback() : t.once("load", this._textureLoadedCallback, this);
},
getOffset: function() {
return cc.v2(this._offset);
},
setOffset: function(t) {
this._offset = cc.v2(t);
},
clone: function() {
return new r(this._texture, this.getRect(), this._rotated, this.getOffset(), this.getOriginalSize());
},
setTexture: function(t, e, i, n, r) {
if (1 !== arguments.length || t !== this._texture) {
this._rect = e || null;
n ? this.setOffset(n) : this._offset = null;
r ? this.setOriginalSize(r) : this._originalSize = null;
this._rotated = i || !1;
if ("string" != typeof t) {
t instanceof cc.Texture2D && this._refreshTexture(t);
return !0;
}
cc.errorID(3401);
}
},
ensureLoadTexture: function() {
if (this._texture && !this._texture.loaded) {
this._refreshTexture(this._texture);
cc.assetManager.postLoadNative(this._texture);
}
},
_checkRect: function(t) {
var e = this._rect, i = e.x, n = e.y;
if (this._rotated) {
i += e.height;
n += e.width;
} else {
i += e.width;
n += e.height;
}
i > t.width && cc.errorID(3300, t.nativeUrl + "/" + this.name, i, t.width);
n > t.height && cc.errorID(3400, t.nativeUrl + "/" + this.name, n, t.height);
},
_flipXY: function(t) {
if (this._flipX) {
var e = t[0];
t[0] = t[1];
t[1] = e;
e = t[2];
t[2] = t[3];
t[3] = e;
}
if (this._flipY) {
var i = t[0];
t[0] = t[2];
t[2] = i;
i = t[1];
t[1] = t[3];
t[3] = i;
}
},
_calculateSlicedUV: function() {
var t = this._rect, e = this._texture.width, i = this._texture.height, r = this._capInsets[0], s = this._capInsets[2], a = t.width - r - s, o = this._capInsets[1], c = this._capInsets[3], u = t.height - o - c, l = this.uvSliced;
l.length = 0;
if (this._rotated) {
n[0].u = t.x / e;
n[1].u = (t.x + c) / e;
n[2].u = (t.x + c + u) / e;
n[3].u = (t.x + t.height) / e;
n[3].v = t.y / i;
n[2].v = (t.y + r) / i;
n[1].v = (t.y + r + a) / i;
n[0].v = (t.y + t.width) / i;
this._flipXY(n);
for (var h = 0; h < 4; ++h) for (var f = n[h], _ = 0; _ < 4; ++_) {
var d = n[3 - _];
l.push({
u: f.u,
v: d.v
});
}
} else {
n[0].u = t.x / e;
n[1].u = (t.x + r) / e;
n[2].u = (t.x + r + a) / e;
n[3].u = (t.x + t.width) / e;
n[3].v = t.y / i;
n[2].v = (t.y + o) / i;
n[1].v = (t.y + o + u) / i;
n[0].v = (t.y + t.height) / i;
this._flipXY(n);
for (var p = 0; p < 4; ++p) for (var v = n[p], g = 0; g < 4; ++g) {
var m = n[g];
l.push({
u: m.u,
v: v.v
});
}
}
},
_setDynamicAtlasFrame: function(t) {
if (t) {
this._original = {
_texture: this._texture,
_x: this._rect.x,
_y: this._rect.y
};
this._texture = t.texture;
this._rect.x = t.x;
this._rect.y = t.y;
this._calculateUV();
}
},
_resetDynamicAtlasFrame: function() {
if (this._original) {
this._rect.x = this._original._x;
this._rect.y = this._original._y;
this._texture = this._original._texture;
this._original = null;
this._calculateUV();
}
},
_calculateUV: function() {
var t = this._rect, e = this._texture, i = this.uv, n = e.width, r = e.height;
if (this._rotated) {
var s = 0 === n ? 0 : t.x / n, a = 0 === n ? 0 : (t.x + t.height) / n, o = 0 === r ? 0 : (t.y + t.width) / r, c = 0 === r ? 0 : t.y / r;
i[0] = s;
i[1] = c;
i[2] = s;
i[3] = o;
i[4] = a;
i[5] = c;
i[6] = a;
i[7] = o;
} else {
var u = 0 === n ? 0 : t.x / n, l = 0 === n ? 0 : (t.x + t.width) / n, h = 0 === r ? 0 : (t.y + t.height) / r, f = 0 === r ? 0 : t.y / r;
i[0] = u;
i[1] = h;
i[2] = l;
i[3] = h;
i[4] = u;
i[5] = f;
i[6] = l;
i[7] = f;
}
if (this._flipX) {
var _ = i[0];
i[0] = i[2];
i[2] = _;
_ = i[1];
i[1] = i[3];
i[3] = _;
_ = i[4];
i[4] = i[6];
i[6] = _;
_ = i[5];
i[5] = i[7];
i[7] = _;
}
if (this._flipY) {
var d = i[0];
i[0] = i[4];
i[4] = d;
d = i[1];
i[1] = i[5];
i[5] = d;
d = i[2];
i[2] = i[6];
i[6] = d;
d = i[3];
i[3] = i[7];
i[7] = d;
}
var p = this.vertices;
if (p) {
p.nu.length = 0;
p.nv.length = 0;
for (var v = 0; v < p.u.length; v++) {
p.nu[v] = p.u[v] / n;
p.nv[v] = p.v[v] / r;
}
}
this._calculateSlicedUV();
},
_serialize: !1,
_deserialize: function(t) {
var e = t.rect;
e && (this._rect = new cc.Rect(e[0], e[1], e[2], e[3]));
t.offset && this.setOffset(new cc.Vec2(t.offset[0], t.offset[1]));
t.originalSize && this.setOriginalSize(new cc.Size(t.originalSize[0], t.originalSize[1]));
this._rotated = 1 === t.rotated;
this._name = t.name;
var i = t.capInsets;
if (i) {
this._capInsets[0] = i[0];
this._capInsets[1] = i[1];
this._capInsets[2] = i[2];
this._capInsets[3] = i[3];
}
this.vertices = t.vertices;
if (this.vertices) {
this.vertices.nu = [];
this.vertices.nv = [];
}
}
}), s = r.prototype;
s.copyWithZone = s.clone;
s.copy = s.clone;
s.initWithTexture = s.setTexture;
cc.SpriteFrame = r;
e.exports = r;
}), {
"../assets/CCAsset": 58,
"../event/event-target": 118
} ],
71: [ (function(t, e) {
"use strict";
var i = t("./CCFont"), n = cc.Class({
name: "cc.TTFFont",
extends: i,
properties: {
_fontFamily: null,
_nativeAsset: {
type: cc.String,
get: function() {
return this._fontFamily;
},
set: function(t) {
this._fontFamily = t || "Arial";
},
override: !0
},
_nativeDep: {
get: function() {
return {
uuid: this._uuid,
__nativeName__: this._native,
ext: cc.path.extname(this._native),
__isNative__: !0
};
},
override: !0
}
}
});
cc.TTFFont = e.exports = n;
}), {
"./CCFont": 62
} ],
72: [ (function(t, e) {
"use strict";
var i = cc.Class({
name: "cc.TextAsset",
extends: cc.Asset,
properties: {
text: ""
},
toString: function() {
return this.text;
}
});
e.exports = cc.TextAsset = i;
}), {} ],
73: [ (function(t, e) {
"use strict";
var i, n = (i = t("../../renderer/gfx")) && i.__esModule ? i : {
default: i
}, r = t("../event/event-target"), s = t("../renderer");
t("../platform/CCClass");
var a = new (t("../platform/id-generater"))("Tex"), o = 1024, c = cc.Enum({
RGB565: n.default.TEXTURE_FMT_R5_G6_B5,
RGB5A1: n.default.TEXTURE_FMT_R5_G5_B5_A1,
RGBA4444: n.default.TEXTURE_FMT_R4_G4_B4_A4,
RGB888: n.default.TEXTURE_FMT_RGB8,
RGBA8888: n.default.TEXTURE_FMT_RGBA8,
RGBA32F: n.default.TEXTURE_FMT_RGBA32F,
A8: n.default.TEXTURE_FMT_A8,
I8: n.default.TEXTURE_FMT_L8,
AI8: n.default.TEXTURE_FMT_L8_A8,
RGB_PVRTC_2BPPV1: n.default.TEXTURE_FMT_RGB_PVRTC_2BPPV1,
RGBA_PVRTC_2BPPV1: n.default.TEXTURE_FMT_RGBA_PVRTC_2BPPV1,
RGB_A_PVRTC_2BPPV1: o++,
RGB_PVRTC_4BPPV1: n.default.TEXTURE_FMT_RGB_PVRTC_4BPPV1,
RGBA_PVRTC_4BPPV1: n.default.TEXTURE_FMT_RGBA_PVRTC_4BPPV1,
RGB_A_PVRTC_4BPPV1: o++,
RGB_ETC1: n.default.TEXTURE_FMT_RGB_ETC1,
RGBA_ETC1: o++,
RGB_ETC2: n.default.TEXTURE_FMT_RGB_ETC2,
RGBA_ETC2: n.default.TEXTURE_FMT_RGBA_ETC2
}), u = cc.Enum({
REPEAT: 10497,
CLAMP_TO_EDGE: 33071,
MIRRORED_REPEAT: 33648
}), l = cc.Enum({
LINEAR: 9729,
NEAREST: 9728
}), h = {
9728: 0,
9729: 1
}, f = [], _ = {
width: void 0,
height: void 0,
minFilter: void 0,
magFilter: void 0,
wrapS: void 0,
wrapT: void 0,
format: void 0,
genMipmaps: void 0,
images: void 0,
image: void 0,
flipY: void 0,
premultiplyAlpha: void 0
};
function d() {
for (var t in _) _[t] = void 0;
f.length = 0;
_.images = f;
return _;
}
var p = cc.Class({
name: "cc.Texture2D",
extends: t("../assets/CCAsset"),
mixins: [ r ],
properties: {
_nativeAsset: {
get: function() {
return this._image;
},
set: function(t) {
t._compressed && t._data ? this.initWithData(t._data, this._format, t.width, t.height) : this.initWithElement(t);
},
override: !0
},
_format: c.RGBA8888,
_premultiplyAlpha: !1,
_flipY: !1,
_minFilter: l.LINEAR,
_magFilter: l.LINEAR,
_mipFilter: l.LINEAR,
_wrapS: u.CLAMP_TO_EDGE,
_wrapT: u.CLAMP_TO_EDGE,
_isAlphaAtlas: !1,
_genMipmaps: !1,
genMipmaps: {
get: function() {
return this._genMipmaps;
},
set: function(t) {
if (this._genMipmaps !== t) {
var e = d();
e.genMipmaps = t;
this.update(e);
}
}
},
_packable: !0,
packable: {
get: function() {
return this._packable;
},
set: function(t) {
this._packable = t;
}
},
_nativeDep: {
get: function() {
return {
__isNative__: !0,
uuid: this._uuid,
ext: this._native,
__flipY__: this._flipY,
__premultiplyAlpha__: this._premultiplyAlpha
};
},
override: !0
}
},
statics: {
PixelFormat: c,
WrapMode: u,
Filter: l,
_FilterIndex: h,
extnames: [ ".png", ".jpg", ".jpeg", ".bmp", ".webp", ".pvr", ".pkm" ],
_parseExt: function(t, e) {
for (var i = cc.renderer.device, n = t.split("_"), r = "", s = "", a = 999, o = e, u = cc.macro.SUPPORT_TEXTURE_FORMATS, l = 0; l < n.length; l++) {
var h = n[l].split("@"), f = h[0];
f = p.extnames[f.charCodeAt(0) - 48] || f;
var _ = u.indexOf(f);
if (-1 !== _ && _ < a) {
var d = h[1] ? parseInt(h[1]) : e;
if (".pvr" === f && !i.ext("WEBGL_compressed_texture_pvrtc")) continue;
if (!(d !== c.RGB_ETC1 && d !== c.RGBA_ETC1 || i.ext("WEBGL_compressed_texture_etc1"))) continue;
if (!(d !== c.RGB_ETC2 && d !== c.RGBA_ETC2 || i.ext("WEBGL_compressed_texture_etc"))) continue;
if (".webp" === f && !cc.sys.capabilities.webp) continue;
a = _;
s = f;
o = d;
} else r || (r = f);
}
return {
bestExt: s,
bestFormat: o,
defaultExt: r
};
}
},
ctor: function() {
this._id = a.getNewId();
this.loaded = !1;
this.width = 0;
this.height = 0;
this._hashDirty = !0;
this._hash = 0;
this._texture = null;
},
getImpl: function() {
this._texture || (this._texture = new s.Texture2D(s.device, {}));
return this._texture;
},
getId: function() {
return this._id;
},
toString: function() {
return this.nativeUrl || "";
},
update: function(t) {
if (t) {
var e = !1;
void 0 !== t.width && (this.width = t.width);
void 0 !== t.height && (this.height = t.height);
if (void 0 !== t.minFilter) {
this._minFilter = t.minFilter;
t.minFilter = h[t.minFilter];
}
if (void 0 !== t.magFilter) {
this._magFilter = t.magFilter;
t.magFilter = h[t.magFilter];
}
if (void 0 !== t.mipFilter) {
this._mipFilter = t.mipFilter;
t.mipFilter = h[t.mipFilter];
}
void 0 !== t.wrapS && (this._wrapS = t.wrapS);
void 0 !== t.wrapT && (this._wrapT = t.wrapT);
void 0 !== t.format && (this._format = t.format);
if (void 0 !== t.flipY) {
this._flipY = t.flipY;
e = !0;
}
if (void 0 !== t.premultiplyAlpha) {
this._premultiplyAlpha = t.premultiplyAlpha;
e = !0;
}
void 0 !== t.genMipmaps && (this._genMipmaps = t.genMipmaps);
cc.sys.capabilities.imageBitmap && this._image instanceof ImageBitmap ? this._checkImageBitmap(this._upload.bind(this, t, e)) : this._upload(t, e);
}
},
_upload: function(t, e) {
e && this._image && (t.image = this._image);
if (t.images && t.images.length > 0) this._image = t.images[0]; else if (void 0 !== t.image) {
this._image = t.image;
if (!t.images) {
f.length = 0;
t.images = f;
}
t.images.push(t.image);
}
this._texture && this._texture.update(t);
this._hashDirty = !0;
},
initWithElement: function(t) {
if (t) {
this._image = t;
if (t.complete || t instanceof HTMLCanvasElement) this.handleLoadedTexture(); else if (cc.sys.capabilities.imageBitmap && t instanceof ImageBitmap) this._checkImageBitmap(this.handleLoadedTexture.bind(this)); else {
var e = this;
t.addEventListener("load", (function() {
e.handleLoadedTexture();
}));
t.addEventListener("error", (function(t) {
cc.warnID(3119, t.message);
}));
}
}
},
initWithData: function(t, e, i, n) {
var r = d();
r.image = t;
r.images = [ r.image ];
r.genMipmaps = this._genMipmaps;
r.premultiplyAlpha = this._premultiplyAlpha;
r.flipY = this._flipY;
r.minFilter = h[this._minFilter];
r.magFilter = h[this._magFilter];
r.wrapS = this._wrapS;
r.wrapT = this._wrapT;
r.format = this._getGFXPixelFormat(e);
r.width = i;
r.height = n;
this._texture ? this._texture.update(r) : this._texture = new s.Texture2D(s.device, r);
this.width = i;
this.height = n;
this._updateFormat();
this._checkPackable();
this.loaded = !0;
this.emit("load");
return !0;
},
getHtmlElementObj: function() {
return this._image;
},
destroy: function() {
cc.sys.capabilities.imageBitmap && this._image instanceof ImageBitmap && this._image.close && this._image.close();
this._packable && cc.dynamicAtlasManager && cc.dynamicAtlasManager.deleteAtlasTexture(this);
this._image = null;
this._texture && this._texture.destroy();
this._super();
},
getPixelFormat: function() {
return this._format;
},
hasPremultipliedAlpha: function() {
return this._premultiplyAlpha || !1;
},
isAlphaAtlas: function() {
return this._isAlphaAtlas;
},
handleLoadedTexture: function() {
if (this._image && this._image.width && this._image.height) {
this.width = this._image.width;
this.height = this._image.height;
var t = d();
t.image = this._image;
t.images = [ t.image ];
t.width = this.width;
t.height = this.height;
t.genMipmaps = this._genMipmaps;
t.format = this._getGFXPixelFormat(this._format);
t.premultiplyAlpha = this._premultiplyAlpha;
t.flipY = this._flipY;
t.minFilter = h[this._minFilter];
t.magFilter = h[this._magFilter];
t.wrapS = this._wrapS;
t.wrapT = this._wrapT;
this._texture ? this._texture.update(t) : this._texture = new s.Texture2D(s.device, t);
this._updateFormat();
this._checkPackable();
this.loaded = !0;
this.emit("load");
cc.macro.CLEANUP_IMAGE_CACHE && (this._image instanceof HTMLImageElement ? this._clearImage() : cc.sys.capabilities.imageBitmap && this._image instanceof ImageBitmap && this._image.close && this._image.close());
}
},
description: function() {
return "<cc.Texture2D | Name = " + this.nativeUrl + " | Dimensions = " + this.width + " x " + this.height + ">";
},
releaseTexture: function() {
this._image = null;
this._texture && this._texture.destroy();
},
setWrapMode: function(t, e) {
if (this._wrapS !== t || this._wrapT !== e) {
var i = d();
i.wrapS = t;
i.wrapT = e;
this.update(i);
}
},
setFilters: function(t, e) {
if (this._minFilter !== t || this._magFilter !== e) {
var i = d();
i.minFilter = t;
i.magFilter = e;
this.update(i);
}
},
setFlipY: function(t) {
if (this._flipY !== t) {
var e = d();
e.flipY = t;
e.premultiplyAlpha = this._premultiplyAlpha;
this.update(e);
}
},
setPremultiplyAlpha: function(t) {
if (this._premultiplyAlpha !== t) {
var e = d();
e.flipY = this._flipY;
e.premultiplyAlpha = t;
this.update(e);
}
},
_updateFormat: function() {
this._isAlphaAtlas = this._format === c.RGBA_ETC1 || this._format === c.RGB_A_PVRTC_4BPPV1 || this._format === c.RGB_A_PVRTC_2BPPV1;
this._texture.setAlphaAtlas(this._isAlphaAtlas);
},
_checkPackable: function() {
var t = cc.dynamicAtlasManager;
if (t) if (this._isCompressed()) this._packable = !1; else {
var e = this.width, i = this.height;
!this._image || e > t.maxFrameSize || i > t.maxFrameSize || this._getHash() !== t.Atlas.DEFAULT_HASH ? this._packable = !1 : this._image && this._image instanceof HTMLCanvasElement && (this._packable = !0);
}
},
_getOpts: function() {
var t = d();
t.width = this.width;
t.height = this.height;
t.genMipmaps = this._genMipmaps;
t.format = this._format;
t.premultiplyAlpha = this._premultiplyAlpha;
t.anisotropy = this._anisotropy;
t.flipY = this._flipY;
t.minFilter = h[this._minFilter];
t.magFilter = h[this._magFilter];
t.mipFilter = h[this._mipFilter];
t.wrapS = this._wrapS;
t.wrapT = this._wrapT;
return t;
},
_getGFXPixelFormat: function(t) {
t === c.RGBA_ETC1 ? t = c.RGB_ETC1 : t === c.RGB_A_PVRTC_4BPPV1 ? t = c.RGB_PVRTC_4BPPV1 : t === c.RGB_A_PVRTC_2BPPV1 && (t = c.RGB_PVRTC_2BPPV1);
return t;
},
_resetUnderlyingMipmaps: function(t) {
var e = this._getOpts();
e.images = t || [ null ];
this._texture ? this._texture.update(e) : this._texture = new s.Texture2D(s.device, e);
},
_serialize: !1,
_deserialize: function(t) {
var e = t.split(","), i = e[0];
if (i) {
var n = p._parseExt(i, this._format);
if (n.bestExt) {
this._setRawAsset(n.bestExt);
this._format = n.bestFormat;
} else {
if (!n.defaultExt) throw new Error(cc.debug.getError(3121));
this._setRawAsset(n.defaultExt);
cc.warnID(3120, n.defaultExt, n.defaultExt);
}
}
if (8 === e.length) {
this._minFilter = parseInt(e[1]);
this._magFilter = parseInt(e[2]);
this._wrapS = parseInt(e[3]);
this._wrapT = parseInt(e[4]);
this._premultiplyAlpha = 49 === e[5].charCodeAt(0);
this._genMipmaps = 49 === e[6].charCodeAt(0);
this._packable = 49 === e[7].charCodeAt(0);
}
},
_getHash: function() {
if (!this._hashDirty) return this._hash;
var t = this._genMipmaps ? 1 : 0, e = this._premultiplyAlpha ? 1 : 0, i = this._flipY ? 1 : 0, n = this._minFilter === l.LINEAR ? 1 : 2, r = this._magFilter === l.LINEAR ? 1 : 2, s = this._wrapS === u.REPEAT ? 1 : this._wrapS === u.CLAMP_TO_EDGE ? 2 : 3, a = this._wrapT === u.REPEAT ? 1 : this._wrapT === u.CLAMP_TO_EDGE ? 2 : 3, o = this._format, c = this._image;
if (c) {
c._glFormat && 6408 !== c._glFormat && (o = 0);
e = c._premultiplyAlpha ? 1 : 0;
}
this._hash = Number("" + n + r + o + s + a + t + e + i);
this._hashDirty = !1;
return this._hash;
},
_isCompressed: function() {
return this._format < c.A8 || this._format > c.RGBA32F;
},
_clearImage: function() {
this._image.src = "";
},
_checkImageBitmap: function(t) {
var e = this, i = this._image, n = this._flipY, r = this._premultiplyAlpha;
this._flipY !== i.flipY || this._premultiplyAlpha !== i.premultiplyAlpha ? createImageBitmap(i, {
imageOrientation: n !== i.flipY ? "flipY" : "none",
premultiplyAlpha: r ? "premultiply" : "none"
}).then((function(s) {
i.close && i.close();
s.flipY = n;
s.premultiplyAlpha = r;
e._image = s;
t();
}), (function(t) {
cc.error(t.message);
})) : t();
}
});
cc.Texture2D = e.exports = p;
}), {
"../../renderer/gfx": 231,
"../assets/CCAsset": 58,
"../event/event-target": 118,
"../platform/CCClass": 128,
"../platform/id-generater": 145,
"../renderer": 159
} ],
74: [ (function(t) {
"use strict";
t("./CCAsset");
t("./CCFont");
t("./CCPrefab");
t("./CCAudioClip");
t("./CCScripts");
t("./CCSceneAsset");
t("./CCSpriteFrame");
t("./CCTexture2D");
t("./CCRenderTexture");
t("./CCTTFFont");
t("./CCSpriteAtlas");
t("./CCBitmapFont");
t("./CCLabelAtlas");
t("./CCTextAsset");
t("./CCJsonAsset");
t("./CCBufferAsset");
t("./material");
}), {
"./CCAsset": 58,
"./CCAudioClip": 59,
"./CCBitmapFont": 60,
"./CCBufferAsset": 61,
"./CCFont": 62,
"./CCJsonAsset": 63,
"./CCLabelAtlas": 64,
"./CCPrefab": 65,
"./CCRenderTexture": 66,
"./CCSceneAsset": 67,
"./CCScripts": 68,
"./CCSpriteAtlas": 69,
"./CCSpriteFrame": 70,
"./CCTTFFont": 71,
"./CCTextAsset": 72,
"./CCTexture2D": 73,
"./material": 81
} ],
75: [ (function(t, e) {
"use strict";
var i, n = (i = t("../CCAsset")) && i.__esModule ? i : {
default: i
}, r = t("./effect-parser"), s = cc.Class({
name: "cc.EffectAsset",
extends: n.default,
ctor: function() {
this._effect = null;
},
properties: {
properties: Object,
techniques: [],
shaders: []
},
onLoad: function() {
if (cc.game.renderType !== cc.game.RENDER_TYPE_CANVAS) {
for (var t = cc.renderer._forward._programLib, e = 0; e < this.shaders.length; e++) t.define(this.shaders[e]);
this._initEffect();
}
},
_initEffect: function() {
if (!this._effect) {
this._effect = (0, r.parseEffect)(this);
Object.freeze(this._effect);
}
},
getInstantiatedEffect: function() {
this._initEffect();
return this._effect.clone();
},
getEffect: function() {
this._initEffect();
return this._effect;
}
});
e.exports = cc.EffectAsset = s;
}), {
"../CCAsset": 58,
"./effect-parser": 78
} ],
76: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = t("../CCAsset"), r = t("../CCTexture2D"), s = (r.PixelFormat, t("./CCEffectAsset")), a = (t("../../utils/texture-util"), 
cc.gfx), o = cc.Enum({
SPRITE: "2d-sprite",
GRAY_SPRITE: "2d-gray-sprite",
UNLIT: "unlit"
}), c = cc.Class({
name: "cc.Material",
extends: n,
ctor: function() {
this.loaded = !1;
this._manualHash = !1;
this._dirty = !0;
this._effect = null;
},
properties: {
_defines: {
default: void 0,
type: Object
},
_props: {
default: void 0,
type: Object
},
_effectAsset: {
type: s,
default: null
},
_techniqueIndex: 0,
_techniqueData: Object,
effectName: void 0,
effectAsset: {
get: function() {
return this._effectAsset;
},
set: function(t) {
if (cc.game.renderType !== cc.game.RENDER_TYPE_CANVAS) {
this._effectAsset = t;
t ? this._effect = this._effectAsset.getInstantiatedEffect() : cc.error("Can not set an empty effect asset.");
}
}
},
effect: {
get: function() {
return this._effect;
}
},
techniqueIndex: {
get: function() {
return this._techniqueIndex;
},
set: function(t) {
this._techniqueIndex = t;
this._effect.switchTechnique(t);
}
}
},
statics: {
getBuiltinMaterial: function(t) {
return cc.game.renderType === cc.game.RENDER_TYPE_CANVAS ? new cc.Material() : cc.assetManager.builtins.getBuiltin("material", "builtin-" + t);
},
BUILTIN_NAME: o,
createWithBuiltin: function(t, e) {
void 0 === e && (e = 0);
var i = cc.assetManager.builtins.getBuiltin("effect", "builtin-" + t);
return c.create(i, e);
},
create: function(t, e) {
void 0 === e && (e = 0);
if (!t) return null;
var i = new c();
i.effectAsset = t;
i.techniqueIndex = e;
return i;
}
},
setProperty: function(t, e, i, n) {
if (cc.game.renderType !== cc.game.RENDER_TYPE_CANVAS) {
"string" == typeof i && (i = parseInt(i));
if (e instanceof r) {
var s = e.isAlphaAtlas(), a = "CC_USE_ALPHA_ATLAS_" + t, o = this.getDefine(a, i);
(s || o) && this.define(a, s);
e.loaded || cc.assetManager.postLoadNative(e);
}
this._effect.setProperty(t, e, i, n);
}
},
getProperty: function(t, e) {
"string" == typeof e && (e = parseInt(e));
return this._effect.getProperty(t, e);
},
define: function(t, e, i, n) {
if (cc.game.renderType !== cc.game.RENDER_TYPE_CANVAS) {
"string" == typeof i && (i = parseInt(i));
this._effect.define(t, e, i, n);
}
},
getDefine: function(t, e) {
"string" == typeof e && (e = parseInt(e));
return this._effect.getDefine(t, e);
},
setCullMode: function(t, e) {
void 0 === t && (t = a.CULL_BACK);
this._effect.setCullMode(t, e);
},
setDepth: function(t, e, i, n) {
void 0 === t && (t = !1);
void 0 === e && (e = !1);
void 0 === i && (i = a.DS_FUNC_LESS);
this._effect.setDepth(t, e, i, n);
},
setBlend: function(t, e, i, n, r, s, o, c, u) {
void 0 === t && (t = !1);
void 0 === e && (e = a.BLEND_FUNC_ADD);
void 0 === i && (i = a.BLEND_SRC_ALPHA);
void 0 === n && (n = a.BLEND_ONE_MINUS_SRC_ALPHA);
void 0 === r && (r = a.BLEND_FUNC_ADD);
void 0 === s && (s = a.BLEND_SRC_ALPHA);
void 0 === o && (o = a.BLEND_ONE_MINUS_SRC_ALPHA);
void 0 === c && (c = 4294967295);
this._effect.setBlend(t, e, i, n, r, s, o, c, u);
},
setStencilEnabled: function(t, e) {
void 0 === t && (t = a.STENCIL_INHERIT);
this._effect.setStencilEnabled(t, e);
},
setStencil: function(t, e, i, n, r, s, o, c, u) {
void 0 === t && (t = a.STENCIL_INHERIT);
void 0 === e && (e = a.DS_FUNC_ALWAYS);
void 0 === i && (i = 0);
void 0 === n && (n = 255);
void 0 === r && (r = a.STENCIL_OP_KEEP);
void 0 === s && (s = a.STENCIL_OP_KEEP);
void 0 === o && (o = a.STENCIL_OP_KEEP);
void 0 === c && (c = 255);
this._effect.setStencil(t, e, i, n, r, s, o, c, u);
},
updateHash: function(t) {
this._manualHash = t;
this._effect && this._effect.updateHash(t);
},
getHash: function() {
return this._manualHash || this._effect && this._effect.getHash();
},
onLoad: function() {
this.effectAsset = this._effectAsset;
if (this._effect) {
this._techniqueIndex && this._effect.switchTechnique(this._techniqueIndex);
this._techniqueData = this._techniqueData || {};
var t = this._techniqueData;
for (var e in t) {
var i = t[e = parseInt(e)];
if (i) {
for (var n in i.defines) this.define(n, i.defines[n], e);
for (var r in i.props) this.setProperty(r, i.props[r], e);
}
}
}
}
}), u = c;
i.default = u;
cc.Material = c;
e.exports = i.default;
}), {
"../../utils/texture-util": 204,
"../CCAsset": 58,
"../CCTexture2D": 73,
"./CCEffectAsset": 75
} ],
77: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n, r = (n = t("../../../renderer/core/pass")) && n.__esModule ? n : {
default: n
};
function s(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function a(t, e, i) {
e && s(t.prototype, e);
i && s(t, i);
return t;
}
var o = cc.gfx, c = (function() {
function t() {
this._dirty = !0;
this._name = "";
this._technique = null;
}
var e = t.prototype;
e._createPassProp = function(t, e) {
var i = e._properties[t];
if (i) {
var n = Object.create(null);
n.name = t;
n.type = i.type;
i.value instanceof Float32Array ? n.value = new Float32Array(i.value) : n.value = i.value;
e._properties[t] = n;
return n;
}
};
e._setPassProperty = function(t, e, i, n) {
var s = i._properties.hasOwnProperty(t);
if (s) {
if (s.value === e) return;
} else s = this._createPassProp(t, i);
this._dirty = !0;
return r.default.prototype.setProperty.call(i, t, e, n);
};
e.setProperty = function(t, e, i, n) {
var r = !1, s = this.passes, a = 0, o = s.length;
void 0 !== i && (a = i, o = i + 1);
for (var c = a; c < o; c++) this._setPassProperty(t, e, s[c], n) && (r = !0);
r || cc.warnID(9103, this.name, t);
};
e.getProperty = function(t, e) {
var i = this.passes;
if (!(e >= i.length)) {
var n = 0, r = i.length;
void 0 !== e && (n = e, r = e + 1);
for (var s = n; s < r; s++) {
var a = i[s].getProperty(t);
if (void 0 !== a) return a;
}
}
};
e.define = function(t, e, i, n) {
var r = !1, s = this.passes, a = 0, o = s.length;
void 0 !== i && (a = i, o = i + 1);
for (var c = a; c < o; c++) s[c].define(t, e, n) && (r = !0);
r || cc.warnID(9104, this.name, t);
};
e.getDefine = function(t, e) {
var i = this.passes;
if (!(e >= i.length)) {
var n = 0, r = i.length;
void 0 !== e && (n = e, r = e + 1);
for (var s = n; s < r; s++) {
var a = i[s].getDefine(t);
if (void 0 !== a) return a;
}
}
};
e.setCullMode = function(t, e) {
void 0 === t && (t = o.CULL_BACK);
var i = this.passes, n = 0, r = i.length;
void 0 !== e && (n = e, r = e + 1);
for (var s = n; s < r; s++) i[s].setCullMode(t);
this._dirty = !0;
};
e.setDepth = function(t, e, i, n) {
var r = this.passes, s = 0, a = r.length;
void 0 !== n && (s = n, a = n + 1);
for (var o = s; o < a; o++) r[o].setDepth(t, e, i);
this._dirty = !0;
};
e.setBlend = function(t, e, i, n, r, s, a, o, c) {
var u = this.passes, l = 0, h = u.length;
void 0 !== c && (l = c, h = c + 1);
for (var f = l; f < h; f++) u[f].setBlend(t, e, i, n, r, s, a, o);
this._dirty = !0;
};
e.setStencilEnabled = function(t, e) {
void 0 === t && (t = o.STENCIL_INHERIT);
var i = this.passes, n = 0, r = i.length;
void 0 !== e && (n = e, r = e + 1);
for (var s = n; s < r; s++) i[s].setStencilEnabled(t);
this._dirty = !0;
};
e.setStencil = function(t, e, i, n, r, s, a, o, c) {
var u = this.passes, l = 0, h = u.length;
void 0 !== c && (l = c, h = c + 1);
for (var f = l; f < h; f++) {
var _ = u[f];
_.setStencilFront(t, e, i, n, r, s, a, o);
_.setStencilBack(t, e, i, n, r, s, a, o);
}
this._dirty = !0;
};
a(t, [ {
key: "name",
get: function() {
return this._name;
}
}, {
key: "technique",
get: function() {
return this._technique;
}
}, {
key: "passes",
get: function() {
return [];
}
} ]);
return t;
})();
i.default = c;
cc.EffectBase = c;
e.exports = i.default;
}), {
"../../../renderer/core/pass": 228
} ],
78: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.parseEffect = function(t) {
var e = f(t);
return new a.default(t.name, e, 0, t);
};
var n = c(t("../../../renderer/core/pass")), r = t("../../../renderer/types"), s = c(t("../../../renderer/enums")), a = c(t("./effect")), o = c(t("../../../renderer/core/technique"));
function c(t) {
return t && t.__esModule ? t : {
default: t
};
}
function u(t) {
return cc.renderer._forward._programLib.getTemplate(t);
}
function l(t, e) {
var i = e.properties || {}, n = u(e.program), a = function(e) {
if (!n.uniforms.find((function(t) {
return t.name === e;
}))) {
cc.warnID(9107, t.name, e);
return "continue";
}
};
for (var o in i) a(o);
var c = {};
n.uniforms.forEach((function(t) {
var e = t.name, n = c[e] = Object.assign({}, t), a = i[e], o = r.enums2default[t.type];
o = a ? a.type === s.default.PARAM_TEXTURE_2D ? null : a.type === s.default.PARAM_INT || a.type === s.default.PARAM_FLOAT ? Array.isArray(a.value) ? a.value[0] : a.value : new Float32Array(a.value) : r.enums2default[t.type];
n.value = o;
}));
return c;
}
function h(t) {
var e = {};
u(t.program).defines.forEach((function(t) {
e[t.name] = r.enums2default[t.type];
}));
return e;
}
function f(t) {
for (var e = t.techniques.length, i = new Array(e), r = 0; r < e; ++r) {
for (var s = t.techniques[r], a = s.name || r, c = s.passes.length, u = new Array(c), f = 0; f < c; ++f) {
var _ = s.passes[f], d = _.name || f, p = t.name + "-" + a + "-" + d, v = _.stage || "opaque", g = l(t, _), m = h(_), y = u[f] = new n.default(d, p, _.program, v, g, m);
_.rasterizerState && y.setCullMode(_.rasterizerState.cullMode);
var E = _.blendState && _.blendState.targets[0];
E && y.setBlend(E.blend, E.blendEq, E.blendSrc, E.blendDst, E.blendAlphaEq, E.blendSrcAlpha, E.blendDstAlpha, E.blendColor);
var T = _.depthStencilState;
if (T) {
y.setDepth(T.depthTest, T.depthWrite, T.depthFunc);
y.setStencilFront(T.stencilTest, T.stencilFuncFront, T.stencilRefFront, T.stencilMaskFront, T.stencilFailOpFront, T.stencilZFailOpFront, T.stencilZPassOpFront, T.stencilWriteMaskFront);
y.setStencilBack(T.stencilTest, T.stencilFuncBack, T.stencilRefBack, T.stencilMaskBack, T.stencilFailOpBack, T.stencilZFailOpBack, T.stencilZPassOpBack, T.stencilWriteMaskBack);
}
}
i[r] = new o.default(a, u);
}
return i;
}
}), {
"../../../renderer/core/pass": 228,
"../../../renderer/core/technique": 229,
"../../../renderer/enums": 230,
"../../../renderer/types": 233,
"./effect": 80
} ],
79: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = a(t("../../../renderer/murmurhash2_gc")), r = a(t("./utils")), s = a(t("./effect-base"));
function a(t) {
return t && t.__esModule ? t : {
default: t
};
}
function o(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function c(t, e, i) {
e && o(t.prototype, e);
i && o(t, i);
return t;
}
function u(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
cc.gfx;
var l = (function(t) {
u(e, t);
c(e, [ {
key: "effect",
get: function() {
return this._effect;
}
}, {
key: "name",
get: function() {
return this._effect && this._effect.name + " (variant)";
}
}, {
key: "passes",
get: function() {
return this._passes;
}
}, {
key: "stagePasses",
get: function() {
return this._stagePasses;
}
} ]);
function e(e) {
var i;
(i = t.call(this) || this)._effect = void 0;
i._passes = [];
i._stagePasses = {};
i._hash = 0;
i.init(e);
return i;
}
var i = e.prototype;
i._onEffectChanged = function() {};
i.init = function(t) {
t instanceof e && (t = t.effect);
this._effect = t;
this._dirty = !0;
if (t) {
var i = t.passes, n = this._passes;
n.length = 0;
for (var r = this._stagePasses = {}, s = 0; s < i.length; s++) {
var a = n[s] = Object.setPrototypeOf({}, i[s]);
a._properties = Object.setPrototypeOf({}, i[s]._properties);
a._defines = Object.setPrototypeOf({}, i[s]._defines);
r[a._stage] || (r[a._stage] = []);
r[a._stage].push(a);
}
}
};
i.updateHash = function() {};
i.getHash = function() {
if (!this._dirty) return this._hash;
this._dirty = !1;
var t = "";
t += r.default.serializePasses(this._passes);
var e = this._effect;
e && (t += r.default.serializePasses(e.passes));
this._hash = (0, n.default)(t, 666);
this.updateHash(this._hash);
return this._hash;
};
return e;
})(s.default);
i.default = l;
cc.EffectVariant = l;
e.exports = i.default;
}), {
"../../../renderer/murmurhash2_gc": 232,
"./effect-base": 77,
"./utils": 84
} ],
80: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n;
function r(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function s(t, e, i) {
e && r(t.prototype, e);
i && r(t, i);
return t;
}
function a(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var o = (function(t) {
a(e, t);
s(e, [ {
key: "technique",
get: function() {
return this._technique;
}
}, {
key: "passes",
get: function() {
return this._technique.passes;
}
} ]);
function e(e, i, n, r) {
var s;
(s = t.call(this) || this)._techniques = [];
s._asset = null;
s.init(e, i, n, r, !0);
return s;
}
var i = e.prototype;
i.init = function(t, e, i, n) {
this._name = t;
this._techniques = e;
this._technique = e[i];
this._asset = n;
};
i.switchTechnique = function(t) {
t >= this._techniques.length ? cc.warn("Can not switch to technique with index [" + t + "]") : this._technique = this._techniques[t];
};
i.clear = function() {
this._techniques = [];
};
i.clone = function() {
for (var t = [], i = 0; i < this._techniques.length; i++) t.push(this._techniques[i].clone());
var n = this._techniques.indexOf(this._technique);
return new e(this._name, t, n, this._asset);
};
return e;
})(((n = t("./effect-base")) && n.__esModule ? n : {
default: n
}).default);
i.default = o;
cc.Effect = o;
e.exports = i.default;
}), {
"./effect-base": 77
} ],
81: [ (function(t) {
"use strict";
t("./CCEffectAsset");
t("./CCMaterial");
t("./material-variant");
}), {
"./CCEffectAsset": 75,
"./CCMaterial": 76,
"./material-variant": 83
} ],
82: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = s(t("./utils")), r = s(t("../../utils/pool"));
function s(t) {
return t && t.__esModule ? t : {
default: t
};
}
function a(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var o = new (function(t) {
a(e, t);
function e() {
for (var e, i = arguments.length, n = new Array(i), r = 0; r < i; r++) n[r] = arguments[r];
(e = t.call.apply(t, [ this ].concat(n)) || this).enabled = !1;
e._pool = {};
return e;
}
var i = e.prototype;
i.get = function(t, e) {
var i, r = this._pool;
if (t instanceof cc.MaterialVariant) {
if (!t._owner) {
t._owner = e;
return t;
}
if (t._owner === e) return t;
t = t.material;
}
if (this.enabled) {
var s = t.effectAsset._uuid;
if (r[s]) {
var a = n.default.serializeDefines(t._effect._defines) + n.default.serializeTechniques(t._effect._techniques);
i = r[s][a] && r[s][a].pop();
}
}
if (i) this.count--; else {
(i = new cc.MaterialVariant(t))._name = t._name + " (Instance)";
i._uuid = t._uuid;
}
i._owner = e;
return i;
};
i.put = function(t) {
if (this.enabled && t._owner) {
var e = this._pool, i = t.effectAsset._uuid;
e[i] || (e[i] = {});
var r = n.default.serializeDefines(t._effect._defines) + n.default.serializeTechniques(t._effect._techniques);
e[i][r] || (e[i][r] = []);
if (!(this.count > this.maxSize)) {
this._clean(t);
e[i][r].push(t);
this.count++;
}
}
};
i.clear = function() {
this._pool = {};
this.count = 0;
};
i._clean = function(t) {
t._owner = null;
};
return e;
}(r.default))();
r.default.register("material", o);
var c = o;
i.default = c;
e.exports = i.default;
}), {
"../../utils/pool": 198,
"./utils": 84
} ],
83: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n, r = o(t("./CCMaterial")), s = o(t("./effect-variant")), a = o(t("./material-pool"));
function o(t) {
return t && t.__esModule ? t : {
default: t
};
}
function c(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function u(t, e, i) {
e && c(t.prototype, e);
i && c(t, i);
return t;
}
function l(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var h = (0, cc._decorator.ccclass)("cc.MaterialVariant")(n = (function(t) {
l(e, t);
e.createWithBuiltin = function(t, i) {
return e.create(r.default.getBuiltinMaterial(t), i);
};
e.create = function(t, e) {
return t ? a.default.get(t, e) : null;
};
u(e, [ {
key: "uuid",
get: function() {
return this._material.uuid;
}
}, {
key: "owner",
get: function() {
return this._owner;
}
}, {
key: "material",
get: function() {
return this._material;
}
} ]);
function e(e) {
var i;
(i = t.call(this) || this)._owner = null;
i._material = null;
i.init(e);
return i;
}
e.prototype.init = function(t) {
this._effect = new s.default(t.effect);
this._effectAsset = t._effectAsset;
this._material = t;
};
return e;
})(r.default)) || n;
i.default = h;
cc.MaterialVariant = h;
e.exports = i.default;
}), {
"./CCMaterial": 76,
"./effect-variant": 79,
"./material-pool": 82
} ],
84: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n, r = (n = t("../../../renderer/enums")) && n.__esModule ? n : {
default: n
};
function s(t) {
var e = "";
for (var i in t) e += i + t[i];
return e;
}
function a(t, e) {
var i = t._programName + t._cullMode;
t._blend && (i += t._blendEq + t._blendAlphaEq + t._blendSrc + t._blendDst + t._blendSrcAlpha + t._blendDstAlpha + t._blendColor);
t._depthTest && (i += t._depthWrite + t._depthFunc);
t._stencilTest && (i += t._stencilFuncFront + t._stencilRefFront + t._stencilMaskFront + t._stencilFailOpFront + t._stencilZFailOpFront + t._stencilZPassOpFront + t._stencilWriteMaskFront + t._stencilFuncBack + t._stencilRefBack + t._stencilMaskBack + t._stencilFailOpBack + t._stencilZFailOpBack + t._stencilZPassOpBack + t._stencilWriteMaskBack);
e || (i += o(t._properties));
return i + s(t._defines);
}
function o(t) {
var e = "";
for (var i in t) {
var n = t[i], s = n.value;
s && (n.type === r.default.PARAM_TEXTURE_2D || n.type === r.default.PARAM_TEXTURE_CUBE ? e += s._id + ";" : e += s.toString() + ";");
}
return e;
}
var c = {
serializeDefines: s,
serializePasses: function(t) {
for (var e = "", i = 0; i < t.length; i++) e += a(t[i]);
return e;
},
serializeUniforms: o
};
i.default = c;
e.exports = i.default;
}), {
"../../../renderer/enums": 230
} ],
85: [ (function(t, e) {
"use strict";
t("../CCNode").EventType;
var i = 56, n = 7, r = cc.Enum({
ONCE: 0,
ON_WINDOW_RESIZE: 1,
ALWAYS: 2
});
function s(t, e, i, n) {
for (var r = t._parent.scaleX, s = t._parent.scaleY, a = 0, o = 0, c = t._parent; ;) {
a += c.x;
o += c.y;
if (!(c = c._parent)) {
i.x = i.y = 0;
n.x = n.y = 1;
return;
}
if (c === e) break;
var u = c.scaleX, l = c.scaleY;
a *= u;
o *= l;
r *= u;
s *= l;
}
n.x = 0 !== r ? 1 / r : 1;
n.y = 0 !== s ? 1 / s : 1;
i.x = -a;
i.y = -o;
}
var a = cc.Vec2.ZERO, o = cc.Vec2.ONE;
function c(t, e) {
var r, c, u, l = e._target;
l ? s(t, r = l, c = a, u = o) : r = t._parent;
var h, f = (h = r) instanceof cc.Scene ? cc.visibleRect : h._contentSize, _ = r._anchorPoint, d = r instanceof cc.Scene, p = t.x, v = t.y, g = t._anchorPoint;
if (e._alignFlags & i) {
var m, y, E = f.width;
if (d) {
m = cc.visibleRect.left.x;
y = cc.visibleRect.right.x;
} else y = (m = -_.x * E) + E;
m += e._isAbsLeft ? e._left : e._left * E;
y -= e._isAbsRight ? e._right : e._right * E;
if (l) {
m += c.x;
m *= u.x;
y += c.x;
y *= u.x;
}
var T, C = g.x, A = t.scaleX;
if (A < 0) {
C = 1 - C;
A = -A;
}
if (e.isStretchWidth) {
T = y - m;
0 !== A && (t.width = T / A);
p = m + C * T;
} else {
T = t.width * A;
if (e.isAlignHorizontalCenter) {
var S = e._isAbsHorizontalCenter ? e._horizontalCenter : e._horizontalCenter * E, x = (.5 - _.x) * f.width;
if (l) {
S *= u.x;
x += c.x;
x *= u.x;
}
p = x + (C - .5) * T + S;
} else p = e.isAlignLeft ? m + C * T : y + (C - 1) * T;
}
}
if (e._alignFlags & n) {
var b, R, w = f.height;
if (d) {
R = cc.visibleRect.bottom.y;
b = cc.visibleRect.top.y;
} else b = (R = -_.y * w) + w;
R += e._isAbsBottom ? e._bottom : e._bottom * w;
b -= e._isAbsTop ? e._top : e._top * w;
if (l) {
R += c.y;
R *= u.y;
b += c.y;
b *= u.y;
}
var O, I = g.y, D = t.scaleY;
if (D < 0) {
I = 1 - I;
D = -D;
}
if (e.isStretchHeight) {
O = b - R;
0 !== D && (t.height = O / D);
v = R + I * O;
} else {
O = t.height * D;
if (e.isAlignVerticalCenter) {
var M = e._isAbsVerticalCenter ? e._verticalCenter : e._verticalCenter * w, L = (.5 - _.y) * f.height;
if (l) {
M *= u.y;
L += c.y;
L *= u.y;
}
v = L + (I - .5) * O + M;
} else v = e.isAlignBottom ? R + I * O : b + (I - 1) * O;
}
}
t.setPosition(p, v);
}
function u(t) {
var e = t._widget;
if (e) {
c(t, e);
e.alignMode !== r.ALWAYS ? f.remove(e) : h.push(e);
}
for (var i = t._children, n = 0; n < i.length; n++) {
var s = i[n];
s._active && u(s);
}
}
function l() {
var t = cc.director.getScene();
if (t) {
f.isAligning = !0;
if (f._nodesOrderDirty) {
h.length = 0;
u(t);
f._nodesOrderDirty = !1;
} else {
var e, i = f._activeWidgetsIterator;
for (i.i = 0; i.i < h.length; ++i.i) c((e = h[i.i]).node, e);
}
f.isAligning = !1;
}
}
var h = [], f = cc._widgetManager = e.exports = {
_AlignFlags: {
TOP: 1,
MID: 2,
BOT: 4,
LEFT: 8,
CENTER: 16,
RIGHT: 32
},
isAligning: !1,
_nodesOrderDirty: !1,
_activeWidgetsIterator: new cc.js.array.MutableForwardIterator(h),
init: function(t) {
t.on(cc.Director.EVENT_AFTER_UPDATE, l);
var e = this.onResized.bind(this);
cc.view.on("canvas-resize", e);
window.addEventListener("orientationchange", e);
},
add: function(t) {
t.node._widget = t;
this._nodesOrderDirty = !0;
},
remove: function(t) {
t.node._widget = null;
this._activeWidgetsIterator.remove(t);
},
onResized: function() {
var t = cc.director.getScene();
t && this.refreshWidgetOnResized(t);
},
refreshWidgetOnResized: function(t) {
var e = cc.Node.isNode(t) && t.getComponent(cc.Widget);
e && e.enabled && e.alignMode === r.ON_WINDOW_RESIZE && this.add(e);
for (var i = t._children, n = 0; n < i.length; n++) {
var s = i[n];
this.refreshWidgetOnResized(s);
}
},
updateAlignment: function t(e) {
var i = e._parent;
cc.Node.isNode(i) && t(i);
var n = e._widget || e.getComponent(cc.Widget);
n && i && c(e, n);
},
AlignMode: r
};
}), {
"../CCNode": 25
} ],
86: [ (function(t, e) {
"use strict";
var i = t("../value-types"), n = t("../geom-utils"), r = t("../utils/affine-transform"), s = t("../renderer/index"), a = t("../renderer/render-flow"), o = t("../CCGame"), c = null;
c = window.renderer.Camera;
var u = cc.mat4(), l = cc.mat4(), h = cc.v3(), f = cc.v3(), _ = cc.v3(), d = [];
function p() {
for (var t = 0, e = Number.MAX_VALUE; t < d.length; t++) {
var i = d[t];
if (i._depth < e) {
E.main = i;
e = i._depth;
}
}
}
var v = null;
function g() {
if (v) {
var t = v.getNode(), e = cc.game.canvas;
t.z = e.height / 1.1566;
t.x = e.width / 2;
t.y = e.height / 2;
}
}
var m = cc.Enum({
COLOR: 1,
DEPTH: 2,
STENCIL: 4
}), y = cc.Enum({
OPAQUE: 1,
TRANSPARENT: 2
}), E = cc.Class({
name: "cc.Camera",
extends: cc.Component,
ctor: function() {
if (o.renderType !== o.RENDER_TYPE_CANVAS) {
var t = new c();
t.setStages([ "opaque" ]);
t.dirty = !0;
this._inited = !1;
this._camera = t;
} else this._inited = !0;
},
editor: !1,
properties: {
_cullingMask: 4294967295,
_clearFlags: m.DEPTH | m.STENCIL,
_backgroundColor: cc.color(0, 0, 0, 255),
_depth: 0,
_zoomRatio: 1,
_targetTexture: null,
_fov: 60,
_orthoSize: 10,
_nearClip: 1,
_farClip: 4096,
_ortho: !0,
_rect: cc.rect(0, 0, 1, 1),
_renderStages: 1,
_alignWithScreen: !0,
zoomRatio: {
get: function() {
return this._zoomRatio;
},
set: function(t) {
this._zoomRatio = t;
},
tooltip: !1
},
fov: {
get: function() {
return this._fov;
},
set: function(t) {
this._fov = t;
},
tooltip: !1
},
orthoSize: {
get: function() {
return this._orthoSize;
},
set: function(t) {
this._orthoSize = t;
},
tooltip: !1
},
nearClip: {
get: function() {
return this._nearClip;
},
set: function(t) {
this._nearClip = t;
this._updateClippingpPlanes();
},
tooltip: !1
},
farClip: {
get: function() {
return this._farClip;
},
set: function(t) {
this._farClip = t;
this._updateClippingpPlanes();
},
tooltip: !1
},
ortho: {
get: function() {
return this._ortho;
},
set: function(t) {
this._ortho = t;
this._updateProjection();
},
tooltip: !1
},
rect: {
get: function() {
return this._rect;
},
set: function(t) {
this._rect = t;
this._updateRect();
},
tooltip: !1
},
cullingMask: {
get: function() {
return this._cullingMask;
},
set: function(t) {
this._cullingMask = t;
this._updateCameraMask();
},
tooltip: !1
},
clearFlags: {
get: function() {
return this._clearFlags;
},
set: function(t) {
this._clearFlags = t;
this._camera && this._camera.setClearFlags(t);
},
tooltip: !1
},
backgroundColor: {
get: function() {
return this._backgroundColor;
},
set: function(t) {
if (!this._backgroundColor.equals(t)) {
this._backgroundColor.set(t);
this._updateBackgroundColor();
}
},
tooltip: !1
},
depth: {
get: function() {
return this._depth;
},
set: function(t) {
E.main === this ? this._depth < t && p() : E.main && t < E.main._depth && d.includes(this) && (E.main = this);
this._depth = t;
this._camera && this._camera.setPriority(t);
},
tooltip: !1
},
targetTexture: {
get: function() {
return this._targetTexture;
},
set: function(t) {
this._targetTexture = t;
this._updateTargetTexture();
},
tooltip: !1
},
renderStages: {
get: function() {
return this._renderStages;
},
set: function(t) {
this._renderStages = t;
this._updateStages();
},
tooltip: !1
},
alignWithScreen: {
get: function() {
return this._alignWithScreen;
},
set: function(t) {
this._alignWithScreen = t;
}
},
_is3D: {
get: function() {
return this.node && this.node._is3DNode;
}
}
},
statics: {
main: null,
cameras: d,
ClearFlags: m,
findCamera: function(t) {
for (var e = 0, i = d.length; e < i; e++) {
var n = d[e];
if (n.containsNode(t)) return n;
}
return null;
},
_findRendererCamera: function(t) {
for (var e = s.scene._cameras, i = 0; i < e._count; i++) if (e._data[i]._cullingMask & t._cullingMask) return e._data[i];
return null;
},
_setupDebugCamera: function() {
if (!v && o.renderType !== o.RENDER_TYPE_CANVAS) {
var t = new c();
v = t;
t.setStages([ "opaque" ]);
t.setFov(60 * Math.PI / 180);
t.setNear(.1);
t.setFar(4096);
t.dirty = !0;
t.cullingMask = 1 << cc.Node.BuiltinGroupIndex.DEBUG;
t.setPriority(cc.macro.MAX_ZINDEX);
t.setClearFlags(0);
t.setColor(0, 0, 0, 0);
var e = new cc.Node();
t.setNode(e);
g();
cc.view.on("design-resolution-changed", g);
s.scene.addCamera(t);
}
}
},
_updateCameraMask: function() {
if (this._camera) {
var t = this._cullingMask & ~(1 << cc.Node.BuiltinGroupIndex.DEBUG);
this._camera.cullingMask = t;
}
},
_updateBackgroundColor: function() {
if (this._camera) {
var t = this._backgroundColor;
this._camera.setColor(t.r / 255, t.g / 255, t.b / 255, t.a / 255);
}
},
_updateTargetTexture: function() {
if (this._camera) {
var t = this._targetTexture;
this._camera.setFrameBuffer(t ? t._framebuffer : null);
}
},
_updateClippingpPlanes: function() {
if (this._camera) {
this._camera.setNear(this._nearClip);
this._camera.setFar(this._farClip);
}
},
_updateProjection: function() {
if (this._camera) {
var t = this._ortho ? 1 : 0;
this._camera.setType(t);
}
},
_updateRect: function() {
if (this._camera) {
var t = this._rect;
this._camera.setRect(t.x, t.y, t.width, t.height);
}
},
_updateStages: function() {
var t = this._renderStages, e = [];
t & y.OPAQUE && e.push("opaque");
t & y.TRANSPARENT && e.push("transparent");
this._camera.setStages(e);
},
_init: function() {
if (!this._inited) {
this._inited = !0;
var t = this._camera;
if (t) {
t.setNode(this.node);
t.setClearFlags(this._clearFlags);
t.setPriority(this._depth);
this._updateBackgroundColor();
this._updateCameraMask();
this._updateTargetTexture();
this._updateClippingpPlanes();
this._updateProjection();
this._updateStages();
this._updateRect();
this.beforeDraw();
}
}
},
__preload: function() {
this._init();
},
onEnable: function() {
if (o.renderType !== o.RENDER_TYPE_CANVAS) {
cc.director.on(cc.Director.EVENT_BEFORE_DRAW, this.beforeDraw, this);
s.scene.addCamera(this._camera);
}
d.push(this);
(!E.main || this._depth < E.main._depth) && (E.main = this);
},
onDisable: function() {
if (o.renderType !== o.RENDER_TYPE_CANVAS) {
cc.director.off(cc.Director.EVENT_BEFORE_DRAW, this.beforeDraw, this);
s.scene.removeCamera(this._camera);
}
cc.js.array.fastRemove(d, this);
if (E.main === this) {
E.main = null;
p();
}
},
getScreenToWorldMatrix2D: function(t) {
this.getWorldToScreenMatrix2D(t);
i.Mat4.invert(t, t);
return t;
},
getWorldToScreenMatrix2D: function(t) {
this.node.getWorldRT(u);
var e = this.zoomRatio, n = u.m;
n[0] *= e;
n[1] *= e;
n[4] *= e;
n[5] *= e;
var r = n[12], s = n[13], a = cc.visibleRect.center;
n[12] = a.x - (n[0] * r + n[4] * s);
n[13] = a.y - (n[1] * r + n[5] * s);
t !== u && i.Mat4.copy(t, u);
return t;
},
getScreenToWorldPoint: function(t, e) {
if (this.node.is3DNode) {
e = e || new cc.Vec3();
this._camera.screenToWorld(e, t, cc.visibleRect.width, cc.visibleRect.height);
} else {
e = e || new cc.Vec2();
this.getScreenToWorldMatrix2D(u);
i.Vec2.transformMat4(e, t, u);
}
return e;
},
getWorldToScreenPoint: function(t, e) {
if (this.node.is3DNode) {
e = e || new cc.Vec3();
this._camera.worldToScreen(e, t, cc.visibleRect.width, cc.visibleRect.height);
} else {
e = e || new cc.Vec2();
this.getWorldToScreenMatrix2D(u);
i.Vec2.transformMat4(e, t, u);
}
return e;
},
getRay: function(t) {
if (!cc.geomUtils) return t;
i.Vec3.set(_, t.x, t.y, 1);
this._camera.screenToWorld(f, _, cc.visibleRect.width, cc.visibleRect.height);
if (this.ortho) {
i.Vec3.set(_, t.x, t.y, -1);
this._camera.screenToWorld(h, _, cc.visibleRect.width, cc.visibleRect.height);
} else this.node.getWorldPosition(h);
return n.Ray.fromPoints(new n.Ray(), h, f);
},
containsNode: function(t) {
return (t._cullingMask & this.cullingMask) > 0;
},
render: function(t) {
if (!(t = t || cc.director.getScene())) return null;
this.node.getWorldMatrix(u);
this.beforeDraw();
a.renderCamera(this._camera, t);
},
_onAlignWithScreen: function() {
var t = cc.game.canvas.height / cc.view._scaleY;
this._targetTexture && (t = cc.visibleRect.height);
var e = this._fov * cc.macro.RAD;
this.node.z = t / (2 * Math.tan(e / 2));
e = 2 * Math.atan(Math.tan(e / 2) / this.zoomRatio);
this._camera.setFov(e);
this._camera.setOrthoHeight(t / 2 / this.zoomRatio);
this.node.setRotation(0, 0, 0, 1);
},
beforeDraw: function() {
if (this._camera) {
if (this._alignWithScreen) this._onAlignWithScreen(); else {
var t = this._fov * cc.macro.RAD;
t = 2 * Math.atan(Math.tan(t / 2) / this.zoomRatio);
this._camera.setFov(t);
this._camera.setOrthoHeight(this._orthoSize / this.zoomRatio);
}
this._camera.dirty = !0;
}
}
});
cc.js.mixin(E.prototype, {
getNodeToCameraTransform: function(t) {
var e = r.identity();
t.getWorldMatrix(l);
if (this.containsNode(t)) {
this.getWorldToCameraMatrix(u);
i.Mat4.mul(l, l, u);
}
r.fromMat4(e, l);
return e;
},
getCameraToWorldPoint: function(t, e) {
return this.getScreenToWorldPoint(t, e);
},
getWorldToCameraPoint: function(t, e) {
return this.getWorldToScreenPoint(t, e);
},
getCameraToWorldMatrix: function(t) {
return this.getScreenToWorldMatrix2D(t);
},
getWorldToCameraMatrix: function(t) {
return this.getWorldToScreenMatrix2D(t);
}
});
e.exports = cc.Camera = E;
}), {
"../../renderer/scene/camera": void 0,
"../CCGame": 24,
"../geom-utils": void 0,
"../renderer/index": 159,
"../renderer/render-flow": 160,
"../utils/affine-transform": 188,
"../value-types": 211
} ],
87: [ (function(t, e) {
"use strict";
var i = {};
function n(t, e, i, n) {
var r = (n.x - i.x) * (t.y - i.y) - (n.y - i.y) * (t.x - i.x), s = (e.x - t.x) * (t.y - i.y) - (e.y - t.y) * (t.x - i.x), a = (n.y - i.y) * (e.x - t.x) - (n.x - i.x) * (e.y - t.y);
if (0 !== a) {
var o = r / a, c = s / a;
if (0 <= o && o <= 1 && 0 <= c && c <= 1) return !0;
}
return !1;
}
i.lineLine = n;
i.lineRect = function(t, e, i) {
var r = new cc.Vec2(i.x, i.y), s = new cc.Vec2(i.x, i.yMax), a = new cc.Vec2(i.xMax, i.yMax), o = new cc.Vec2(i.xMax, i.y);
return !!(n(t, e, r, s) || n(t, e, s, a) || n(t, e, a, o) || n(t, e, o, r));
};
function r(t, e, i) {
for (var r = i.length, s = 0; s < r; ++s) if (n(t, e, i[s], i[(s + 1) % r])) return !0;
return !1;
}
i.linePolygon = r;
i.rectRect = function(t, e) {
var i = t.x, n = t.y, r = t.x + t.width, s = t.y + t.height, a = e.x, o = e.y, c = e.x + e.width, u = e.y + e.height;
return i <= c && r >= a && n <= u && s >= o;
};
i.rectPolygon = function(t, e) {
var i, n, a = new cc.Vec2(t.x, t.y), o = new cc.Vec2(t.x, t.yMax), c = new cc.Vec2(t.xMax, t.yMax), u = new cc.Vec2(t.xMax, t.y);
if (r(a, o, e)) return !0;
if (r(o, c, e)) return !0;
if (r(c, u, e)) return !0;
if (r(u, a, e)) return !0;
for (i = 0, n = e.length; i < n; ++i) if (s(e[i], t)) return !0;
return !!(s(a, e) || s(o, e) || s(c, e) || s(u, e));
};
i.polygonPolygon = function(t, e) {
var i, n;
for (i = 0, n = t.length; i < n; ++i) if (r(t[i], t[(i + 1) % n], e)) return !0;
for (i = 0, n = e.length; i < n; ++i) if (s(e[i], t)) return !0;
for (i = 0, n = t.length; i < n; ++i) if (s(t[i], e)) return !0;
return !1;
};
i.circleCircle = function(t, e) {
return t.position.sub(e.position).mag() < t.radius + e.radius;
};
i.polygonCircle = function(t, e) {
var i = e.position;
if (s(i, t)) return !0;
for (var n = 0, r = t.length; n < r; n++) if (a(i, 0 === n ? t[t.length - 1] : t[n - 1], t[n], !0) < e.radius) return !0;
return !1;
};
function s(t, e) {
for (var i = !1, n = t.x, r = t.y, s = e.length, a = 0, o = s - 1; a < s; o = a++) {
var c = e[a].x, u = e[a].y, l = e[o].x, h = e[o].y;
u > r != h > r && n < (l - c) * (r - u) / (h - u) + c && (i = !i);
}
return i;
}
i.pointInPolygon = s;
function a(t, e, i, n) {
var r, s = i.x - e.x, a = i.y - e.y, o = s * s + a * a, c = ((t.x - e.x) * s + (t.y - e.y) * a) / o;
r = n ? o ? c < 0 ? e : c > 1 ? i : cc.v2(e.x + c * s, e.y + c * a) : e : cc.v2(e.x + c * s, e.y + c * a);
s = t.x - r.x;
a = t.y - r.y;
return Math.sqrt(s * s + a * a);
}
i.pointLineDistance = a;
cc.Intersection = e.exports = i;
}), {} ],
88: [ (function(t, e) {
"use strict";
t("./platform/CCClass");
var i = t("./platform/CCObject").Flags, n = t("./platform/js").array, r = i.IsStartCalled, s = i.IsOnEnableCalled;
i.IsEditorOnEnableCalled;
function a(t, e) {
for (var i = e.constructor._executionOrder, n = e._id, r = 0, s = t.length - 1, a = s >>> 1; r <= s; a = r + s >>> 1) {
var o = t[a], c = o.constructor._executionOrder;
if (c > i) s = a - 1; else if (c < i) r = a + 1; else {
var u = o._id;
if (u > n) s = a - 1; else {
if (!(u < n)) return a;
r = a + 1;
}
}
}
return ~r;
}
function o(t, e) {
for (var i = t.array, n = t.i + 1; n < i.length; ) {
var r = i[n];
if (r._enabled && r.node._activeInHierarchy) ++n; else {
t.removeAt(n);
e && (r._objFlags &= ~e);
}
}
}
var c = cc.Class({
__ctor__: function(t) {
var e = n.MutableForwardIterator;
this._zero = new e([]);
this._neg = new e([]);
this._pos = new e([]);
this._invoke = t;
},
statics: {
stableRemoveInactive: o
},
add: null,
remove: null,
invoke: null
});
function u(t, e) {
return t.constructor._executionOrder - e.constructor._executionOrder;
}
var l = cc.Class({
extends: c,
add: function(t) {
var e = t.constructor._executionOrder;
(0 === e ? this._zero : e < 0 ? this._neg : this._pos).array.push(t);
},
remove: function(t) {
var e = t.constructor._executionOrder;
(0 === e ? this._zero : e < 0 ? this._neg : this._pos).fastRemove(t);
},
cancelInactive: function(t) {
o(this._zero, t);
o(this._neg, t);
o(this._pos, t);
},
invoke: function() {
var t = this._neg;
if (t.array.length > 0) {
t.array.sort(u);
this._invoke(t);
t.array.length = 0;
}
this._invoke(this._zero);
this._zero.array.length = 0;
var e = this._pos;
if (e.array.length > 0) {
e.array.sort(u);
this._invoke(e);
e.array.length = 0;
}
}
}), h = cc.Class({
extends: c,
add: function(t) {
var e = t.constructor._executionOrder;
if (0 === e) this._zero.array.push(t); else {
var i = e < 0 ? this._neg.array : this._pos.array, n = a(i, t);
n < 0 && i.splice(~n, 0, t);
}
},
remove: function(t) {
var e = t.constructor._executionOrder;
if (0 === e) this._zero.fastRemove(t); else {
var i = e < 0 ? this._neg : this._pos, n = a(i.array, t);
n >= 0 && i.removeAt(n);
}
},
invoke: function(t) {
this._neg.array.length > 0 && this._invoke(this._neg, t);
this._invoke(this._zero, t);
this._pos.array.length > 0 && this._invoke(this._pos, t);
}
});
function f(t, e, i, n) {
var r = "var a=it.array;for(it.i=0;it.i<a.length;++it.i){var c=a[it.i];" + t + "}";
n = e ? Function("it", "dt", r) : Function("it", r);
t = Function("c", "dt", t);
return function(e, r) {
try {
n(e, r);
} catch (n) {
cc._throw(n);
var s = e.array;
i && (s[e.i]._objFlags |= i);
++e.i;
for (;e.i < s.length; ++e.i) try {
t(s[e.i], r);
} catch (t) {
cc._throw(t);
i && (s[e.i]._objFlags |= i);
}
}
};
}
var _ = f("c.start();c._objFlags|=" + r, !1, r), d = f("c.update(dt)", !0), p = f("c.lateUpdate(dt)", !0);
function v() {
this.startInvoker = new l(_);
this.updateInvoker = new h(d);
this.lateUpdateInvoker = new h(p);
this._deferredComps = [];
this._updating = !1;
}
var g = cc.Class({
ctor: v,
unscheduleAll: v,
statics: {
LifeCycleInvoker: c,
OneOffInvoker: l,
createInvokeImpl: f,
invokeOnEnable: function(t) {
var e = cc.director._compScheduler, i = t.array;
for (t.i = 0; t.i < i.length; ++t.i) {
var n = i[t.i];
if (n._enabled) {
n.onEnable();
!n.node._activeInHierarchy || e._onEnabled(n);
}
}
}
},
_onEnabled: function(t) {
cc.director.getScheduler().resumeTarget(t);
t._objFlags |= s;
this._updating ? this._deferredComps.push(t) : this._scheduleImmediate(t);
},
_onDisabled: function(t) {
cc.director.getScheduler().pauseTarget(t);
t._objFlags &= ~s;
var e = this._deferredComps.indexOf(t);
if (e >= 0) n.fastRemoveAt(this._deferredComps, e); else {
!t.start || t._objFlags & r || this.startInvoker.remove(t);
t.update && this.updateInvoker.remove(t);
t.lateUpdate && this.lateUpdateInvoker.remove(t);
}
},
enableComp: function(t, e) {
if (!(t._objFlags & s)) {
if (t.onEnable) {
if (e) {
e.add(t);
return;
}
t.onEnable();
if (!t.node._activeInHierarchy) return;
}
this._onEnabled(t);
}
},
disableComp: function(t) {
if (t._objFlags & s) {
t.onDisable && t.onDisable();
this._onDisabled(t);
}
},
_scheduleImmediate: function(t) {
"function" != typeof t.start || t._objFlags & r || this.startInvoker.add(t);
"function" == typeof t.update && this.updateInvoker.add(t);
"function" == typeof t.lateUpdate && this.lateUpdateInvoker.add(t);
},
_deferredSchedule: function() {
for (var t = this._deferredComps, e = 0, i = t.length; e < i; e++) this._scheduleImmediate(t[e]);
t.length = 0;
},
_startForNewComps: function() {
if (this._deferredComps.length > 0) {
this._deferredSchedule();
this.startInvoker.invoke();
}
},
startPhase: function() {
this._updating = !0;
this.startInvoker.invoke();
this._startForNewComps();
},
updatePhase: function(t) {
this.updateInvoker.invoke(t);
},
lateUpdatePhase: function(t) {
this.lateUpdateInvoker.invoke(t);
this._updating = !1;
this._startForNewComps();
}
});
e.exports = g;
}), {
"./platform/CCClass": 128,
"./platform/CCObject": 134,
"./platform/js": 149,
"./utils/misc": 196
} ],
89: [ (function(t, e) {
"use strict";
var i = t("../../animation/animation-animator"), n = t("../../animation/animation-clip"), r = t("../event/event-target"), s = t("../platform/js"), a = function(t, e) {
return t === e;
}, o = cc.Enum({
PLAY: "play",
STOP: "stop",
PAUSE: "pause",
RESUME: "resume",
LASTFRAME: "lastframe",
FINISHED: "finished"
}), c = cc.Class({
name: "cc.Animation",
extends: t("./CCComponent"),
mixins: [ r ],
editor: !1,
statics: {
EventType: o
},
ctor: function() {
cc.EventTarget.call(this);
this._animator = null;
this._nameToState = s.createMap(!0);
this._didInit = !1;
this._currentClip = null;
},
properties: {
_defaultClip: {
default: null,
type: n
},
defaultClip: {
type: n,
get: function() {
return this._defaultClip;
},
set: function() {},
tooltip: !1
},
currentClip: {
get: function() {
return this._currentClip;
},
set: function(t) {
this._currentClip = t;
},
type: n,
visible: !1
},
_writableClips: {
get: function() {
return this._clips;
},
set: function(t) {
this._didInit = !1;
this._clips = t;
this._init();
},
type: [ n ]
},
_clips: {
default: [],
type: [ n ],
tooltip: !1,
visible: !0
},
playOnLoad: {
default: !1,
tooltip: !1
}
},
start: function() {
if (this.playOnLoad && this._defaultClip && (!this._animator || !this._animator.isPlaying)) {
var t = this.getAnimationState(this._defaultClip.name);
this._animator.playState(t);
}
},
onEnable: function() {
this._animator && this._animator.resume();
},
onDisable: function() {
this._animator && this._animator.pause();
},
onDestroy: function() {
this.stop();
},
getClips: function() {
return this._clips;
},
play: function(t, e) {
var i = this.playAdditive(t, e);
this._animator.stopStatesExcept(i);
return i;
},
playAdditive: function(t, e) {
this._init();
var i = this.getAnimationState(t || this._defaultClip && this._defaultClip.name);
if (i) {
this.enabled = !0;
var n = this._animator;
if (n.isPlaying && i.isPlaying) if (i.isPaused) n.resumeState(i); else {
n.stopState(i);
n.playState(i, e);
} else n.playState(i, e);
this.enabledInHierarchy || n.pause();
this.currentClip = i.clip;
}
return i;
},
stop: function(t) {
if (this._didInit) if (t) {
var e = this._nameToState[t];
e && this._animator.stopState(e);
} else this._animator.stop();
},
pause: function(t) {
if (this._didInit) if (t) {
var e = this._nameToState[t];
e && this._animator.pauseState(e);
} else this.enabled = !1;
},
resume: function(t) {
if (this._didInit) if (t) {
var e = this._nameToState[t];
e && this._animator.resumeState(e);
} else this.enabled = !0;
},
setCurrentTime: function(t, e) {
this._init();
if (e) {
var i = this._nameToState[e];
i && this._animator.setStateTime(i, t);
} else this._animator.setStateTime(t);
},
getAnimationState: function(t) {
this._init();
var e = this._nameToState[t];
e && !e.curveLoaded && this._animator._reloadClip(e);
return e || null;
},
addClip: function(t, e) {
if (t) {
this._init();
cc.js.array.contains(this._clips, t) || this._clips.push(t);
e = e || t.name;
var i = this._nameToState[e];
if (i) {
if (i.clip === t) return i;
var n = this._clips.indexOf(i.clip);
-1 !== n && this._clips.splice(n, 1);
}
var r = new cc.AnimationState(t, e);
this._nameToState[e] = r;
return r;
}
cc.warnID(3900);
},
removeClip: function(t, e) {
if (t) {
this._init();
var i;
for (var n in this._nameToState) {
i = this._nameToState[n];
if (a(i.clip, t)) break;
}
if (t === this._defaultClip) {
if (!e) {
cc.warnID(3902);
return;
}
this._defaultClip = null;
}
if (i && i.isPlaying) {
if (!e) {
cc.warnID(3903);
return;
}
this.stop(i.name);
}
this._clips = this._clips.filter((function(e) {
return !a(e, t);
}));
i && delete this._nameToState[i.name];
} else cc.warnID(3901);
},
sample: function(t) {
this._init();
if (t) {
var e = this._nameToState[t];
e && e.sample();
} else this._animator.sample();
},
on: function(t, e, i, n) {
this._init();
var r = this._EventTargetOn(t, e, i, n);
if ("lastframe" === t) {
var s = this._nameToState;
for (var a in s) s[a]._lastframeEventOn = !0;
}
return r;
},
off: function(t, e, i, n) {
this._init();
if ("lastframe" === t) {
var r = this._nameToState;
for (var s in r) r[s]._lastframeEventOn = !1;
}
this._EventTargetOff(t, e, i, n);
},
_init: function() {
if (!this._didInit) {
this._didInit = !0;
this._animator = new i(this.node, this);
this._createStates();
}
},
_createStates: function() {
this._nameToState = s.createMap(!0);
for (var t = null, e = !1, i = 0; i < this._clips.length; ++i) {
var n = this._clips[i];
if (n) {
t = new cc.AnimationState(n);
this._nameToState[t.name] = t;
a(this._defaultClip, n) && (e = t);
}
}
if (this._defaultClip && !e) {
t = new cc.AnimationState(this._defaultClip);
this._nameToState[t.name] = t;
}
}
});
c.prototype._EventTargetOn = r.prototype.on;
c.prototype._EventTargetOff = r.prototype.off;
cc.Animation = e.exports = c;
}), {
"../../animation/animation-animator": 9,
"../../animation/animation-clip": 10,
"../event/event-target": 118,
"../platform/js": 149,
"./CCComponent": 94
} ],
90: [ (function(t, e) {
"use strict";
var i = t("../utils/misc"), n = t("./CCComponent"), r = t("../assets/CCAudioClip"), s = cc.Class({
name: "cc.AudioSource",
extends: n,
editor: !1,
ctor: function() {
this.audio = new cc._Audio();
},
properties: {
_clip: {
default: null,
type: r
},
_volume: 1,
_mute: !1,
_loop: !1,
_pausedFlag: {
default: !1,
serializable: !1
},
_firstlyEnabled: !0,
isPlaying: {
get: function() {
return this.audio.getState() === cc._Audio.State.PLAYING;
},
visible: !1
},
clip: {
get: function() {
return this._clip;
},
set: function(t) {
if (t !== this._clip) {
if (!(t instanceof r)) return cc.error("Wrong type of AudioClip.");
this._clip = t;
this.audio.stop();
this.audio.src = this._clip;
this.preload && this._clip._ensureLoaded();
}
},
type: r,
tooltip: !1,
animatable: !1
},
volume: {
get: function() {
return this._volume;
},
set: function(t) {
t = i.clamp01(t);
this._volume = t;
this._mute || this.audio.setVolume(t);
return t;
},
tooltip: !1
},
mute: {
get: function() {
return this._mute;
},
set: function(t) {
this._mute = t;
this.audio.setVolume(t ? 0 : this._volume);
return t;
},
animatable: !1,
tooltip: !1
},
loop: {
get: function() {
return this._loop;
},
set: function(t) {
this._loop = t;
this.audio.setLoop(t);
return t;
},
animatable: !1,
tooltip: !1
},
playOnLoad: {
default: !1,
tooltip: !1,
animatable: !1
},
preload: {
default: !1,
animatable: !1
}
},
_pausedCallback: function() {
if (this.audio.getState() === cc._Audio.State.PLAYING) {
this.audio.pause();
this._pausedFlag = !0;
}
},
_restoreCallback: function() {
this._pausedFlag && this.audio.resume();
this._pausedFlag = !1;
},
onLoad: function() {
this.audio.src || (this.audio.src = this._clip);
this.preload && this._clip._ensureLoaded();
},
onEnable: function() {
if (this.playOnLoad && this._firstlyEnabled) {
this._firstlyEnabled = !1;
this.play();
}
cc.game.on(cc.game.EVENT_HIDE, this._pausedCallback, this);
cc.game.on(cc.game.EVENT_SHOW, this._restoreCallback, this);
},
onDisable: function() {
this.stop();
cc.game.off(cc.game.EVENT_HIDE, this._pausedCallback, this);
cc.game.off(cc.game.EVENT_SHOW, this._restoreCallback, this);
},
onDestroy: function() {
this.audio.destroy();
},
play: function() {
if (this._clip) {
var t = this.audio;
t.setVolume(this._mute ? 0 : this._volume);
t.setLoop(this._loop);
t.setCurrentTime(0);
t.play();
}
},
stop: function() {
this.audio.stop();
},
pause: function() {
this.audio.pause();
},
resume: function() {
this.audio.resume();
},
rewind: function() {
this.audio.setCurrentTime(0);
},
getCurrentTime: function() {
return this.audio.getCurrentTime();
},
setCurrentTime: function(t) {
this.audio.setCurrentTime(t);
return t;
},
getDuration: function() {
return this.audio.getDuration();
}
});
cc.AudioSource = e.exports = s;
}), {
"../assets/CCAudioClip": 59,
"../utils/misc": 196,
"./CCComponent": 94
} ],
91: [ (function(t, e) {
"use strict";
var i = [ "touchstart", "touchmove", "touchend", "mousedown", "mousemove", "mouseup", "mouseenter", "mouseleave", "mousewheel" ];
function n(t) {
t.stopPropagation();
}
var r = cc.Class({
name: "cc.BlockInputEvents",
extends: t("./CCComponent"),
editor: {
menu: "i18n:MAIN_MENU.component.ui/Block Input Events",
inspector: "packages://inspector/inspectors/comps/block-input-events.js",
help: "i18n:COMPONENT.help_url.block_input_events"
},
onEnable: function() {
for (var t = 0; t < i.length; t++) this.node.on(i[t], n, this);
},
onDisable: function() {
for (var t = 0; t < i.length; t++) this.node.off(i[t], n, this);
}
});
cc.BlockInputEvents = e.exports = r;
}), {
"./CCComponent": 94
} ],
92: [ (function(t, e) {
"use strict";
var i = t("./CCComponent"), n = t("../utils/gray-sprite-state"), r = cc.Enum({
NONE: 0,
COLOR: 1,
SPRITE: 2,
SCALE: 3
}), s = cc.Enum({
NORMAL: 0,
HOVER: 1,
PRESSED: 2,
DISABLED: 3
}), a = cc.Class({
name: "cc.Button",
extends: i,
mixins: [ n ],
ctor: function() {
this._pressed = !1;
this._hovered = !1;
this._fromColor = null;
this._toColor = null;
this._time = 0;
this._transitionFinished = !0;
this._fromScale = cc.Vec2.ZERO;
this._toScale = cc.Vec2.ZERO;
this._originalScale = null;
this._graySpriteMaterial = null;
this._spriteMaterial = null;
this._sprite = null;
},
editor: !1,
properties: {
interactable: {
default: !0,
tooltip: !1,
notify: function() {
this._updateState();
this.interactable || this._resetState();
},
animatable: !1
},
_resizeToTarget: {
animatable: !1,
set: function(t) {
t && this._resizeNodeToTargetNode();
}
},
enableAutoGrayEffect: {
default: !1,
tooltip: !1,
notify: function() {
this._updateDisabledState(!0);
}
},
transition: {
default: r.NONE,
tooltip: !1,
type: r,
animatable: !1,
notify: function(t) {
this._updateTransition(t);
},
formerlySerializedAs: "transition"
},
normalColor: {
default: cc.Color.WHITE,
displayName: "Normal",
tooltip: !1,
notify: function() {
this.transition === r.Color && this._getButtonState() === s.NORMAL && (this._getTarget().opacity = this.normalColor.a);
this._updateState();
}
},
pressedColor: {
default: cc.color(211, 211, 211),
displayName: "Pressed",
tooltip: !1,
notify: function() {
this.transition === r.Color && this._getButtonState() === s.PRESSED && (this._getTarget().opacity = this.pressedColor.a);
this._updateState();
},
formerlySerializedAs: "pressedColor"
},
hoverColor: {
default: cc.Color.WHITE,
displayName: "Hover",
tooltip: !1,
notify: function() {
this.transition === r.Color && this._getButtonState() === s.HOVER && (this._getTarget().opacity = this.hoverColor.a);
this._updateState();
},
formerlySerializedAs: "hoverColor"
},
disabledColor: {
default: cc.color(124, 124, 124),
displayName: "Disabled",
tooltip: !1,
notify: function() {
this.transition === r.Color && this._getButtonState() === s.DISABLED && (this._getTarget().opacity = this.disabledColor.a);
this._updateState();
}
},
duration: {
default: .1,
range: [ 0, 10 ],
tooltip: !1
},
zoomScale: {
default: 1.2,
tooltip: !1
},
normalSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Normal",
tooltip: !1,
notify: function() {
this._updateState();
}
},
pressedSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Pressed",
tooltip: !1,
formerlySerializedAs: "pressedSprite",
notify: function() {
this._updateState();
}
},
hoverSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Hover",
tooltip: !1,
formerlySerializedAs: "hoverSprite",
notify: function() {
this._updateState();
}
},
disabledSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Disabled",
tooltip: !1,
notify: function() {
this._updateState();
}
},
target: {
default: null,
type: cc.Node,
tooltip: !1,
notify: function(t) {
this._applyTarget();
t && this.target !== t && this._unregisterTargetEvent(t);
}
},
clickEvents: {
default: [],
type: cc.Component.EventHandler,
tooltip: !1
}
},
statics: {
Transition: r
},
__preload: function() {
this._applyTarget();
this._resetState();
},
_resetState: function() {
this._pressed = !1;
this._hovered = !1;
var t = this._getTarget(), e = this.transition, i = this._originalScale;
e === r.COLOR && this.interactable ? this._setTargetColor(this.normalColor) : e === r.SCALE && i && t.setScale(i.x, i.y);
this._transitionFinished = !0;
},
onEnable: function() {
this.normalSprite && this.normalSprite.ensureLoadTexture();
this.hoverSprite && this.hoverSprite.ensureLoadTexture();
this.pressedSprite && this.pressedSprite.ensureLoadTexture();
this.disabledSprite && this.disabledSprite.ensureLoadTexture();
this._registerNodeEvent();
this._updateState();
},
onDisable: function() {
this._resetState();
this._unregisterNodeEvent();
},
_getTarget: function() {
return this.target ? this.target : this.node;
},
_onTargetSpriteFrameChanged: function(t) {
this.transition === r.SPRITE && this._setCurrentStateSprite(t.spriteFrame);
},
_onTargetColorChanged: function(t) {
this.transition === r.COLOR && this._setCurrentStateColor(t);
},
_onTargetScaleChanged: function() {
var t = this._getTarget();
if (this._originalScale && (this.transition !== r.SCALE || this._transitionFinished)) {
this._originalScale.x = t.scaleX;
this._originalScale.y = t.scaleY;
}
},
_setTargetColor: function(t) {
var e = this._getTarget(), i = t.clone();
e.opacity = i.a;
i.a = 255;
e.color = i;
},
_getStateColor: function(t) {
switch (t) {
case s.NORMAL:
return this.normalColor;

case s.HOVER:
return this.hoverColor;

case s.PRESSED:
return this.pressedColor;

case s.DISABLED:
return this.disabledColor;
}
},
_getStateSprite: function(t) {
switch (t) {
case s.NORMAL:
return this.normalSprite;

case s.HOVER:
return this.hoverSprite;

case s.PRESSED:
return this.pressedSprite;

case s.DISABLED:
return this.disabledSprite;
}
},
_setCurrentStateColor: function(t) {
switch (this._getButtonState()) {
case s.NORMAL:
this.normalColor = t;
break;

case s.HOVER:
this.hoverColor = t;
break;

case s.PRESSED:
this.pressedColor = t;
break;

case s.DISABLED:
this.disabledColor = t;
}
},
_setCurrentStateSprite: function(t) {
switch (this._getButtonState()) {
case s.NORMAL:
this.normalSprite = t;
break;

case s.HOVER:
this.hoverSprite = t;
break;

case s.PRESSED:
this.pressedSprite = t;
break;

case s.DISABLED:
this.disabledSprite = t;
}
},
update: function(t) {
var e = this._getTarget();
if (!this._transitionFinished && (this.transition === r.COLOR || this.transition === r.SCALE)) {
this.time += t;
var i = 1;
this.duration > 0 && (i = this.time / this.duration);
i >= 1 && (i = 1);
if (this.transition === r.COLOR) {
var n = this._fromColor.lerp(this._toColor, i);
this._setTargetColor(n);
} else this.transition === r.SCALE && this._originalScale && (e.scale = this._fromScale.lerp(this._toScale, i));
1 === i && (this._transitionFinished = !0);
}
},
_registerNodeEvent: function() {
this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
this.node.on(cc.Node.EventType.MOUSE_ENTER, this._onMouseMoveIn, this);
this.node.on(cc.Node.EventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
},
_unregisterNodeEvent: function() {
this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
this.node.off(cc.Node.EventType.MOUSE_ENTER, this._onMouseMoveIn, this);
this.node.off(cc.Node.EventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
},
_registerTargetEvent: function(t) {
t.on(cc.Node.EventType.SCALE_CHANGED, this._onTargetScaleChanged, this);
},
_unregisterTargetEvent: function(t) {
t.off(cc.Node.EventType.SCALE_CHANGED, this._onTargetScaleChanged, this);
},
_getTargetSprite: function(t) {
var e = null;
t && (e = t.getComponent(cc.Sprite));
return e;
},
_applyTarget: function() {
var t = this._getTarget();
this._sprite = this._getTargetSprite(t);
this._originalScale || (this._originalScale = cc.Vec2.ZERO);
this._originalScale.x = t.scaleX;
this._originalScale.y = t.scaleY;
this._registerTargetEvent(t);
},
_onTouchBegan: function(t) {
if (this.interactable && this.enabledInHierarchy) {
this._pressed = !0;
this._updateState();
t.stopPropagation();
}
},
_onTouchMove: function(t) {
if (this.interactable && this.enabledInHierarchy && this._pressed) {
var e = t.touch, i = this.node._hitTest(e.getLocation()), n = this._getTarget(), a = this._originalScale;
if (this.transition === r.SCALE && a) if (i) {
this._fromScale.x = a.x;
this._fromScale.y = a.y;
this._toScale.x = a.x * this.zoomScale;
this._toScale.y = a.y * this.zoomScale;
this._transitionFinished = !1;
} else {
this.time = 0;
this._transitionFinished = !0;
n.setScale(a.x, a.y);
} else {
var o;
o = i ? s.PRESSED : s.NORMAL;
this._applyTransition(o);
}
t.stopPropagation();
}
},
_onTouchEnded: function(t) {
if (this.interactable && this.enabledInHierarchy) {
if (this._pressed) {
cc.Component.EventHandler.emitEvents(this.clickEvents, t);
this.node.emit("click", this);
}
this._pressed = !1;
this._updateState();
t.stopPropagation();
}
},
_onTouchCancel: function() {
if (this.interactable && this.enabledInHierarchy) {
this._pressed = !1;
this._updateState();
}
},
_onMouseMoveIn: function() {
if (!this._pressed && this.interactable && this.enabledInHierarchy && (this.transition !== r.SPRITE || this.hoverSprite) && !this._hovered) {
this._hovered = !0;
this._updateState();
}
},
_onMouseMoveOut: function() {
if (this._hovered) {
this._hovered = !1;
this._updateState();
}
},
_updateState: function() {
var t = this._getButtonState();
this._applyTransition(t);
this._updateDisabledState();
},
_getButtonState: function() {
return this.interactable ? this._pressed ? s.PRESSED : this._hovered ? s.HOVER : s.NORMAL : s.DISABLED;
},
_updateColorTransitionImmediately: function(t) {
var e = this._getStateColor(t);
this._setTargetColor(e);
this._fromColor = e.clone();
this._toColor = e;
},
_updateColorTransition: function(t) {
if (t === s.DISABLED) this._updateColorTransitionImmediately(t); else {
var e = this._getTarget(), i = this._getStateColor(t);
this._fromColor = e.color.clone();
this._toColor = i;
this.time = 0;
this._transitionFinished = !1;
}
},
_updateSpriteTransition: function(t) {
var e = this._getStateSprite(t);
this._sprite && e && (this._sprite.spriteFrame = e);
},
_updateScaleTransition: function(t) {
t === s.PRESSED ? this._zoomUp() : this._zoomBack();
},
_zoomUp: function() {
if (this._originalScale) {
this._fromScale.x = this._originalScale.x;
this._fromScale.y = this._originalScale.y;
this._toScale.x = this._originalScale.x * this.zoomScale;
this._toScale.y = this._originalScale.y * this.zoomScale;
this.time = 0;
this._transitionFinished = !1;
}
},
_zoomBack: function() {
if (this._originalScale) {
var t = this._getTarget();
this._fromScale.x = t.scaleX;
this._fromScale.y = t.scaleY;
this._toScale.x = this._originalScale.x;
this._toScale.y = this._originalScale.y;
this.time = 0;
this._transitionFinished = !1;
}
},
_updateTransition: function(t) {
t === r.COLOR ? this._updateColorTransitionImmediately(s.NORMAL) : t === r.SPRITE && this._updateSpriteTransition(s.NORMAL);
this._updateState();
},
_applyTransition: function(t) {
var e = this.transition;
e === r.COLOR ? this._updateColorTransition(t) : e === r.SPRITE ? this._updateSpriteTransition(t) : e === r.SCALE && this._updateScaleTransition(t);
},
_resizeNodeToTargetNode: !1,
_updateDisabledState: function(t) {
if (this._sprite && (this.enableAutoGrayEffect || t)) {
var e = !1;
this.transition === r.SPRITE && this.disabledSprite || (e = this.enableAutoGrayEffect && !this.interactable);
this._switchGrayMaterial(e, this._sprite);
}
}
});
cc.Button = e.exports = a;
}), {
"../utils/gray-sprite-state": 194,
"./CCComponent": 94
} ],
93: [ (function(t, e) {
"use strict";
var i = t("../camera/CCCamera"), n = t("./CCComponent"), r = cc.Class({
name: "cc.Canvas",
extends: n,
editor: !1,
resetInEditor: !1,
statics: {
instance: null
},
properties: {
_designResolution: cc.size(960, 640),
designResolution: {
get: function() {
return cc.size(this._designResolution);
},
set: function(t) {
this._designResolution.width = t.width;
this._designResolution.height = t.height;
this.applySettings();
},
tooltip: !1
},
_fitWidth: !1,
_fitHeight: !0,
fitHeight: {
get: function() {
return this._fitHeight;
},
set: function(t) {
if (this._fitHeight !== t) {
this._fitHeight = t;
this.applySettings();
}
},
tooltip: !1
},
fitWidth: {
get: function() {
return this._fitWidth;
},
set: function(t) {
if (this._fitWidth !== t) {
this._fitWidth = t;
this.applySettings();
}
},
tooltip: !1
}
},
_fitDesignResolution: !1,
__preload: function() {
if (r.instance) return cc.warnID(6700, this.node.name, r.instance.node.name);
r.instance = this;
this.applySettings();
var t = this.getComponent(cc.Widget);
t && t.updateAlignment();
},
start: function() {
if (!i.main && cc.game.renderType !== cc.game.RENDER_TYPE_CANVAS) {
var t = new cc.Node("Main Camera");
t.parent = this.node;
t.setSiblingIndex(0);
var e = t.addComponent(i), n = i.ClearFlags;
e.clearFlags = n.COLOR | n.DEPTH | n.STENCIL;
e.depth = -1;
}
},
onDestroy: function() {
r.instance === this && (r.instance = null);
},
applySettings: function() {
var t, e = cc.ResolutionPolicy;
t = this.fitHeight && this.fitWidth ? e.SHOW_ALL : this.fitHeight || this.fitWidth ? this.fitWidth ? e.FIXED_WIDTH : e.FIXED_HEIGHT : e.NO_BORDER;
var i = this._designResolution;
cc.view.setDesignResolutionSize(i.width, i.height, t);
}
});
cc.Canvas = e.exports = r;
}), {
"../camera/CCCamera": 86,
"./CCComponent": 94
} ],
94: [ (function(t, e) {
"use strict";
var i = t("../platform/CCObject"), n = t("../platform/js"), r = new (t("../platform/id-generater"))("Comp"), s = (i.Flags.IsOnEnableCalled, 
i.Flags.IsOnLoadCalled), a = !!cc.ActionManager, o = cc.Class({
name: "cc.Component",
extends: i,
ctor: function() {
this._id = r.getNewId();
this.__eventTargets = [];
},
properties: {
node: {
default: null,
visible: !1
},
name: {
get: function() {
if (this._name) return this._name;
var t = cc.js.getClassName(this), e = t.lastIndexOf(".");
e >= 0 && (t = t.slice(e + 1));
return this.node.name + "<" + t + ">";
},
set: function(t) {
this._name = t;
},
visible: !1
},
uuid: {
get: function() {
return this._id;
},
visible: !1
},
__scriptAsset: !1,
_enabled: !0,
enabled: {
get: function() {
return this._enabled;
},
set: function(t) {
if (this._enabled !== t) {
this._enabled = t;
if (this.node._activeInHierarchy) {
var e = cc.director._compScheduler;
t ? e.enableComp(this) : e.disableComp(this);
}
}
},
visible: !1,
animatable: !0
},
enabledInHierarchy: {
get: function() {
return this._enabled && this.node._activeInHierarchy;
},
visible: !1
},
_isOnLoadCalled: {
get: function() {
return this._objFlags & s;
}
}
},
update: null,
lateUpdate: null,
__preload: null,
onLoad: null,
start: null,
onEnable: null,
onDisable: null,
onDestroy: null,
onFocusInEditor: null,
onLostFocusInEditor: null,
resetInEditor: null,
addComponent: function(t) {
return this.node.addComponent(t);
},
getComponent: function(t) {
return this.node.getComponent(t);
},
getComponents: function(t) {
return this.node.getComponents(t);
},
getComponentInChildren: function(t) {
return this.node.getComponentInChildren(t);
},
getComponentsInChildren: function(t) {
return this.node.getComponentsInChildren(t);
},
_getLocalBounds: null,
onRestore: null,
destroy: function() {
this._super() && this._enabled && this.node._activeInHierarchy && cc.director._compScheduler.disableComp(this);
},
_onPreDestroy: function() {
a && cc.director.getActionManager().removeAllActionsFromTarget(this);
this.unscheduleAllCallbacks();
for (var t = this.__eventTargets, e = t.length - 1; e >= 0; --e) {
var i = t[e];
i && i.targetOff(this);
}
t.length = 0;
cc.director._nodeActivator.destroyComp(this);
this.node._removeComponent(this);
},
_instantiate: function(t) {
t || (t = cc.instantiate._clone(this, this));
t.node = null;
return t;
},
schedule: function(t, e, i, n) {
cc.assertID(t, 1619);
e = e || 0;
cc.assertID(e >= 0, 1620);
i = isNaN(i) ? cc.macro.REPEAT_FOREVER : i;
n = n || 0;
var r = cc.director.getScheduler(), s = r.isTargetPaused(this);
r.schedule(t, this, e, i, n, s);
},
scheduleOnce: function(t, e) {
this.schedule(t, 0, 0, e);
},
unschedule: function(t) {
t && cc.director.getScheduler().unschedule(t, this);
},
unscheduleAllCallbacks: function() {
cc.director.getScheduler().unscheduleAllForTarget(this);
}
});
o._requireComponent = null;
o._executionOrder = 0;
n.value(o, "_registerEditorProps", (function(t, e) {
var i = e.requireComponent;
i && (t._requireComponent = i);
var n = e.executionOrder;
n && "number" == typeof n && (t._executionOrder = n);
}));
o.prototype.__scriptUuid = "";
cc.Component = e.exports = o;
}), {
"../platform/CCObject": 134,
"../platform/id-generater": 145,
"../platform/js": 149
} ],
95: [ (function() {
"use strict";
cc.Component.EventHandler = cc.Class({
name: "cc.ClickEvent",
properties: {
target: {
default: null,
type: cc.Node
},
component: "",
_componentId: "",
_componentName: {
get: function() {
this._genCompIdIfNeeded();
return this._compId2Name(this._componentId);
},
set: function(t) {
this._componentId = this._compName2Id(t);
}
},
handler: {
default: ""
},
customEventData: {
default: ""
}
},
statics: {
emitEvents: function(t) {
var e;
if (arguments.length > 0) for (var i = 0, n = (e = new Array(arguments.length - 1)).length; i < n; i++) e[i] = arguments[i + 1];
for (var r = 0, s = t.length; r < s; r++) {
var a = t[r];
a instanceof cc.Component.EventHandler && a.emit(e);
}
}
},
emit: function(t) {
var e = this.target;
if (cc.isValid(e)) {
this._genCompIdIfNeeded();
var i = cc.js._getClassById(this._componentId), n = e.getComponent(i);
if (cc.isValid(n)) {
var r = n[this.handler];
if ("function" == typeof r) {
null != this.customEventData && "" !== this.customEventData && (t = t.slice()).push(this.customEventData);
r.apply(n, t);
}
}
}
},
_compName2Id: function(t) {
var e = cc.js.getClassByName(t);
return cc.js._getClassId(e);
},
_compId2Name: function(t) {
var e = cc.js._getClassById(t);
return cc.js.getClassName(e);
},
_genCompIdIfNeeded: function() {
if (!this._componentId) {
this._componentName = this.component;
this.component = "";
}
}
});
}), {} ],
96: [ (function(t, e) {
"use strict";
var i = t("../platform/CCMacro"), n = t("./CCRenderComponent"), r = (t("../assets/material/CCMaterial"), 
t("../renderer/utils/label/label-frame")), s = t("../utils/blend-func"), a = t("../renderer/utils/utils").deleteFromDynamicAtlas, o = i.TextAlignment, c = i.VerticalTextAlignment, u = cc.Enum({
NONE: 0,
CLAMP: 1,
SHRINK: 2,
RESIZE_HEIGHT: 3
}), l = cc.Enum({
NONE: 0,
BITMAP: 1,
CHAR: 2
}), h = cc.Class({
name: "cc.Label",
extends: n,
mixins: [ s ],
ctor: function() {
this._actualFontSize = 0;
this._assemblerData = null;
this._frame = null;
this._ttfTexture = null;
this._letterTexture = null;
cc.game.renderType === cc.game.RENDER_TYPE_CANVAS ? this._updateMaterial = this._updateMaterialCanvas : this._updateMaterial = this._updateMaterialWebgl;
},
editor: !1,
properties: {
_string: {
default: "",
formerlySerializedAs: "_N$string"
},
string: {
get: function() {
return this._string;
},
set: function(t) {
var e = this._string;
this._string = "" + t;
this.string !== e && this.setVertsDirty();
this._checkStringEmpty();
},
multiline: !0,
tooltip: !1
},
horizontalAlign: {
default: o.LEFT,
type: o,
tooltip: !1,
notify: function(t) {
this.horizontalAlign !== t && this.setVertsDirty();
},
animatable: !1
},
verticalAlign: {
default: c.TOP,
type: c,
tooltip: !1,
notify: function(t) {
this.verticalAlign !== t && this.setVertsDirty();
},
animatable: !1
},
actualFontSize: {
displayName: "Actual Font Size",
animatable: !1,
readonly: !0,
get: function() {
return this._actualFontSize;
},
tooltip: !1
},
_fontSize: 40,
fontSize: {
get: function() {
return this._fontSize;
},
set: function(t) {
if (this._fontSize !== t) {
this._fontSize = t;
this.setVertsDirty();
}
},
range: [ 0, 512 ],
tooltip: !1
},
fontFamily: {
default: "Arial",
tooltip: !1,
notify: function(t) {
this.fontFamily !== t && this.setVertsDirty();
},
animatable: !1
},
_lineHeight: 40,
lineHeight: {
get: function() {
return this._lineHeight;
},
set: function(t) {
if (this._lineHeight !== t) {
this._lineHeight = t;
this.setVertsDirty();
}
},
tooltip: !1
},
overflow: {
default: u.NONE,
type: u,
tooltip: !1,
notify: function(t) {
this.overflow !== t && this.setVertsDirty();
},
animatable: !1
},
_enableWrapText: !0,
enableWrapText: {
get: function() {
return this._enableWrapText;
},
set: function(t) {
if (this._enableWrapText !== t) {
this._enableWrapText = t;
this.setVertsDirty();
}
},
animatable: !1,
tooltip: !1
},
_N$file: null,
font: {
get: function() {
return this._N$file;
},
set: function(t) {
if (this.font !== t) {
t || (this._isSystemFontUsed = !0);
this._N$file = t;
t && this._isSystemFontUsed && (this._isSystemFontUsed = !1);
this.enabledInHierarchy && this._forceUpdateRenderData();
}
},
type: cc.Font,
tooltip: !1,
animatable: !1
},
_isSystemFontUsed: !0,
useSystemFont: {
get: function() {
return this._isSystemFontUsed;
},
set: function(t) {
if (this._isSystemFontUsed !== t) {
this._isSystemFontUsed = !!t;
if (t) {
this.font = null;
if (!this.enabledInHierarchy) return;
this._forceUpdateRenderData();
}
this.markForValidate();
}
},
animatable: !1,
tooltip: !1
},
_bmFontOriginalSize: {
displayName: "BMFont Original Size",
get: function() {
return this._N$file instanceof cc.BitmapFont ? this._N$file.fontSize : -1;
},
visible: !0,
animatable: !1
},
_spacingX: 0,
spacingX: {
get: function() {
return this._spacingX;
},
set: function(t) {
this._spacingX = t;
this.setVertsDirty();
},
tooltip: !1
},
_batchAsBitmap: !1,
cacheMode: {
default: l.NONE,
type: l,
tooltip: !1,
notify: function(t) {
if (this.cacheMode !== t) {
t !== l.BITMAP || this.font instanceof cc.BitmapFont || this._frame && this._frame._resetDynamicAtlasFrame();
t === l.CHAR && (this._ttfTexture = null);
this.enabledInHierarchy && this._forceUpdateRenderData();
}
},
animatable: !1
},
_styleFlags: 0,
enableBold: {
get: function() {
return !!(1 & this._styleFlags);
},
set: function(t) {
t ? this._styleFlags |= 1 : this._styleFlags &= -2;
this.setVertsDirty();
},
animatable: !1,
tooltip: !1
},
enableItalic: {
get: function() {
return !!(2 & this._styleFlags);
},
set: function(t) {
t ? this._styleFlags |= 2 : this._styleFlags &= -3;
this.setVertsDirty();
},
animatable: !1,
tooltip: !1
},
enableUnderline: {
get: function() {
return !!(4 & this._styleFlags);
},
set: function(t) {
t ? this._styleFlags |= 4 : this._styleFlags &= -5;
this.setVertsDirty();
},
animatable: !1,
tooltip: !1
},
_underlineHeight: 0,
underlineHeight: {
get: function() {
return this._underlineHeight;
},
set: function(t) {
if (this._underlineHeight !== t) {
this._underlineHeight = t;
this.setVertsDirty();
}
},
tooltip: !1
}
},
statics: {
HorizontalAlign: o,
VerticalAlign: c,
Overflow: u,
CacheMode: l,
_shareAtlas: null,
clearCharCache: function() {
h._shareAtlas && h._shareAtlas.clearAllCache();
}
},
onLoad: function() {
if (this._batchAsBitmap && this.cacheMode === l.NONE) {
this.cacheMode = l.BITMAP;
this._batchAsBitmap = !1;
}
cc.game.renderType === cc.game.RENDER_TYPE_CANVAS && (this.cacheMode = l.NONE);
},
onEnable: function() {
this._super();
this.node.on(cc.Node.EventType.SIZE_CHANGED, this._nodeSizeChanged, this);
this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this.setVertsDirty, this);
this.node.on(cc.Node.EventType.COLOR_CHANGED, this._nodeColorChanged, this);
this._forceUpdateRenderData();
},
onDisable: function() {
this._super();
this.node.off(cc.Node.EventType.SIZE_CHANGED, this._nodeSizeChanged, this);
this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this.setVertsDirty, this);
this.node.off(cc.Node.EventType.COLOR_CHANGED, this._nodeColorChanged, this);
},
onDestroy: function() {
this._assembler && this._assembler._resetAssemblerData && this._assembler._resetAssemblerData(this._assemblerData);
this._assemblerData = null;
this._letterTexture = null;
if (this._ttfTexture) {
this._ttfTexture.destroy();
this._ttfTexture = null;
}
this._super();
},
_nodeSizeChanged: function() {
this.overflow !== u.NONE && this.setVertsDirty();
},
_nodeColorChanged: function() {
this.font instanceof cc.BitmapFont || this.setVertsDirty();
},
setVertsDirty: function() {
this._nativeTTF() && this._assembler && this._assembler.updateRenderData(this);
this._super();
},
_updateColor: function() {
this.font instanceof cc.BitmapFont || this._srcBlendFactor === cc.macro.BlendFactor.SRC_ALPHA && this.node._renderFlag & cc.RenderFlow.FLAG_OPACITY || this.setVertsDirty();
n.prototype._updateColor.call(this);
},
_validateRender: function() {
if (this.string) {
if (this._materials[0]) {
var t = this.font;
if (!(t instanceof cc.BitmapFont)) return;
var e = t.spriteFrame;
if (e && e.textureLoaded() && t._fntConfig) return;
}
this.disableRender();
} else this.disableRender();
},
_resetAssembler: function() {
this._resetFrame();
n.prototype._resetAssembler.call(this);
},
_resetFrame: function() {
if (this._frame) {
a(this, this._frame);
this._frame = null;
}
},
_checkStringEmpty: function() {
this.markForRender(!!this.string);
},
_on3DNodeChanged: function() {
this._resetAssembler();
this._applyFontTexture();
},
_onBMFontTextureLoaded: function() {
this._frame._texture = this.font.spriteFrame._texture;
this.markForRender(!0);
this._updateMaterial();
this._assembler && this._assembler.updateRenderData(this);
},
_onBlendChanged: function() {
this.useSystemFont && this.enabledInHierarchy && this._forceUpdateRenderData();
},
_applyFontTexture: function() {
var t = this.font;
if (t instanceof cc.BitmapFont) {
var e = t.spriteFrame;
this._frame = e;
e && e.onTextureLoaded(this._onBMFontTextureLoaded, this);
} else {
if (!this._nativeTTF()) {
this._frame || (this._frame = new r());
if (this.cacheMode === l.CHAR) {
this._letterTexture = this._assembler._getAssemblerData();
this._frame._refreshTexture(this._letterTexture);
} else if (!this._ttfTexture) {
this._ttfTexture = new cc.Texture2D();
this._assemblerData = this._assembler._getAssemblerData();
this._ttfTexture.initWithElement(this._assemblerData.canvas);
}
if (this.cacheMode !== l.CHAR) {
this._frame._resetDynamicAtlasFrame();
this._frame._refreshTexture(this._ttfTexture);
this._srcBlendFactor, cc.macro.BlendFactor.ONE;
}
this._updateMaterial();
}
this._assembler && this._assembler.updateRenderData(this);
}
this.markForValidate();
},
_updateMaterialCanvas: function() {
this._frame && (this._frame._texture._nativeUrl = this.uuid + "_texture");
},
_updateMaterialWebgl: function() {
var t = this.getMaterial(0);
if (this._nativeTTF()) t && this._assembler._updateTTFMaterial(this); else if (this._frame) {
t && t.setProperty("texture", this._frame._texture);
s.prototype._updateMaterial.call(this);
}
},
_forceUseCanvas: !1,
_useNativeTTF: function() {
return cc.macro.ENABLE_NATIVE_TTF_RENDERER && !this._forceUseCanvas;
},
_nativeTTF: function() {
return this._useNativeTTF() && !!this._assembler && !!this._assembler._updateTTFMaterial;
},
_forceUpdateRenderData: function() {
this.setVertsDirty();
this._resetAssembler();
this._applyFontTexture();
},
_enableBold: function(t) {
this.enableBold = !!t;
},
_enableItalics: function(t) {
this.enableItalic = !!t;
},
_enableUnderline: function(t) {
this.enableUnderline = !!t;
}
});
cc.Label = e.exports = h;
}), {
"../assets/material/CCMaterial": 76,
"../platform/CCMacro": 133,
"../renderer/utils/label/label-frame": 162,
"../renderer/utils/utils": 165,
"../utils/blend-func": 191,
"./CCRenderComponent": 102
} ],
97: [ (function(t, e) {
"use strict";
var i = cc.Class({
name: "cc.LabelOutline",
extends: t("./CCComponent"),
editor: !1,
properties: {
_color: cc.Color.WHITE,
_width: 1,
color: {
tooltip: !1,
get: function() {
return this._color.clone();
},
set: function(t) {
this._color.equals(t) || this._color.set(t);
this._updateRenderData();
}
},
width: {
tooltip: !1,
get: function() {
return this._width;
},
set: function(t) {
if (this._width !== t) {
this._width = t;
this._updateRenderData();
}
},
range: [ 0, 512 ]
}
},
onEnable: function() {
this._updateRenderData();
},
onDisable: function() {
this._updateRenderData();
},
_updateRenderData: function() {
var t = this.node.getComponent(cc.Label);
t && t.setVertsDirty();
}
});
cc.LabelOutline = e.exports = i;
}), {
"./CCComponent": 94
} ],
98: [ (function(t, e) {
"use strict";
var i = cc.Class({
name: "cc.LabelShadow",
extends: t("./CCComponent"),
editor: !1,
properties: {
_color: cc.Color.WHITE,
_offset: cc.v2(2, 2),
_blur: 2,
color: {
tooltip: !1,
get: function() {
return this._color.clone();
},
set: function(t) {
this._color.equals(t) || this._color.set(t);
this._updateRenderData();
}
},
offset: {
tooltip: !1,
get: function() {
return this._offset;
},
set: function(t) {
this._offset = t;
this._updateRenderData();
}
},
blur: {
tooltip: !1,
get: function() {
return this._blur;
},
set: function(t) {
this._blur = t;
this._updateRenderData();
},
range: [ 0, 1024 ]
}
},
onEnable: function() {
this._updateRenderData();
},
onDisable: function() {
this._updateRenderData();
},
_updateRenderData: function() {
var t = this.node.getComponent(cc.Label);
t && t.markForRender(!0);
}
});
cc.LabelShadow = e.exports = i;
}), {
"./CCComponent": 94
} ],
99: [ (function(t, e) {
"use strict";
var i = t("../CCNode").EventType, n = cc.Enum({
NONE: 0,
HORIZONTAL: 1,
VERTICAL: 2,
GRID: 3
}), r = cc.Enum({
NONE: 0,
CONTAINER: 1,
CHILDREN: 2
}), s = cc.Enum({
HORIZONTAL: 0,
VERTICAL: 1
}), a = cc.Enum({
BOTTOM_TO_TOP: 0,
TOP_TO_BOTTOM: 1
}), o = cc.Enum({
LEFT_TO_RIGHT: 0,
RIGHT_TO_LEFT: 1
}), c = cc.Class({
name: "cc.Layout",
extends: t("./CCComponent"),
editor: !1,
properties: {
_layoutSize: cc.size(300, 200),
_layoutDirty: {
default: !0,
serializable: !1
},
_resize: r.NONE,
_N$layoutType: n.NONE,
type: {
type: n,
get: function() {
return this._N$layoutType;
},
set: function(t) {
this._N$layoutType = t;
this._doLayoutDirty();
},
tooltip: !1,
animatable: !1
},
resizeMode: {
type: r,
tooltip: !1,
animatable: !1,
get: function() {
return this._resize;
},
set: function(t) {
if (this.type !== n.NONE || t !== r.CHILDREN) {
this._resize = t;
this._doLayoutDirty();
}
}
},
cellSize: {
default: cc.size(40, 40),
tooltip: !1,
type: cc.Size,
notify: function() {
this._doLayoutDirty();
}
},
startAxis: {
default: s.HORIZONTAL,
tooltip: !1,
type: s,
notify: function() {
this._doLayoutDirty();
},
animatable: !1
},
paddingLeft: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
paddingRight: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
paddingTop: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
paddingBottom: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
spacingX: {
default: 0,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1
},
spacingY: {
default: 0,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1
},
verticalDirection: {
default: a.TOP_TO_BOTTOM,
type: a,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1,
animatable: !1
},
horizontalDirection: {
default: o.LEFT_TO_RIGHT,
type: o,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1,
animatable: !1
},
affectedByScale: {
default: !1,
notify: function() {
this._doLayoutDirty();
},
animatable: !1,
tooltip: !1
}
},
statics: {
Type: n,
VerticalDirection: a,
HorizontalDirection: o,
ResizeMode: r,
AxisDirection: s
},
onEnable: function() {
this._addEventListeners();
this.node.getContentSize().equals(cc.size(0, 0)) && this.node.setContentSize(this._layoutSize);
this._doLayoutDirty();
},
onDisable: function() {
this._removeEventListeners();
},
_doLayoutDirty: function() {
this._layoutDirty = !0;
},
_doScaleDirty: function() {
this._layoutDirty = this._layoutDirty || this.affectedByScale;
},
_addEventListeners: function() {
cc.director.on(cc.Director.EVENT_AFTER_UPDATE, this.updateLayout, this);
this.node.on(i.SIZE_CHANGED, this._resized, this);
this.node.on(i.ANCHOR_CHANGED, this._doLayoutDirty, this);
this.node.on(i.CHILD_ADDED, this._childAdded, this);
this.node.on(i.CHILD_REMOVED, this._childRemoved, this);
this.node.on(i.CHILD_REORDER, this._doLayoutDirty, this);
this._addChildrenEventListeners();
},
_removeEventListeners: function() {
cc.director.off(cc.Director.EVENT_AFTER_UPDATE, this.updateLayout, this);
this.node.off(i.SIZE_CHANGED, this._resized, this);
this.node.off(i.ANCHOR_CHANGED, this._doLayoutDirty, this);
this.node.off(i.CHILD_ADDED, this._childAdded, this);
this.node.off(i.CHILD_REMOVED, this._childRemoved, this);
this.node.off(i.CHILD_REORDER, this._doLayoutDirty, this);
this._removeChildrenEventListeners();
},
_addChildrenEventListeners: function() {
for (var t = this.node.children, e = 0; e < t.length; ++e) {
var n = t[e];
n.on(i.SCALE_CHANGED, this._doScaleDirty, this);
n.on(i.SIZE_CHANGED, this._doLayoutDirty, this);
n.on(i.POSITION_CHANGED, this._doLayoutDirty, this);
n.on(i.ANCHOR_CHANGED, this._doLayoutDirty, this);
n.on("active-in-hierarchy-changed", this._doLayoutDirty, this);
}
},
_removeChildrenEventListeners: function() {
for (var t = this.node.children, e = 0; e < t.length; ++e) {
var n = t[e];
n.off(i.SCALE_CHANGED, this._doScaleDirty, this);
n.off(i.SIZE_CHANGED, this._doLayoutDirty, this);
n.off(i.POSITION_CHANGED, this._doLayoutDirty, this);
n.off(i.ANCHOR_CHANGED, this._doLayoutDirty, this);
n.off("active-in-hierarchy-changed", this._doLayoutDirty, this);
}
},
_childAdded: function(t) {
t.on(i.SCALE_CHANGED, this._doScaleDirty, this);
t.on(i.SIZE_CHANGED, this._doLayoutDirty, this);
t.on(i.POSITION_CHANGED, this._doLayoutDirty, this);
t.on(i.ANCHOR_CHANGED, this._doLayoutDirty, this);
t.on("active-in-hierarchy-changed", this._doLayoutDirty, this);
this._doLayoutDirty();
},
_childRemoved: function(t) {
t.off(i.SCALE_CHANGED, this._doScaleDirty, this);
t.off(i.SIZE_CHANGED, this._doLayoutDirty, this);
t.off(i.POSITION_CHANGED, this._doLayoutDirty, this);
t.off(i.ANCHOR_CHANGED, this._doLayoutDirty, this);
t.off("active-in-hierarchy-changed", this._doLayoutDirty, this);
this._doLayoutDirty();
},
_resized: function() {
this._layoutSize = this.node.getContentSize();
this._doLayoutDirty();
},
_doLayoutHorizontally: function(t, e, i, s) {
var c = this.node.getAnchorPoint(), u = this.node.children, l = 1, h = this.paddingLeft, f = -c.x * t;
if (this.horizontalDirection === o.RIGHT_TO_LEFT) {
l = -1;
f = (1 - c.x) * t;
h = this.paddingRight;
}
for (var _ = f + l * h - l * this.spacingX, d = 0, p = 0, v = 0, g = 0, m = 0, y = 0, E = 0, T = 0; T < u.length; ++T) (A = u[T]).activeInHierarchy && E++;
var C = this.cellSize.width;
this.type !== n.GRID && this.resizeMode === r.CHILDREN && (C = (t - (this.paddingLeft + this.paddingRight) - (E - 1) * this.spacingX) / E);
for (T = 0; T < u.length; ++T) {
var A = u[T], S = this._getUsedScaleValue(A.scaleX), x = this._getUsedScaleValue(A.scaleY);
if (A.activeInHierarchy) {
if (this._resize === r.CHILDREN) {
A.width = C / S;
this.type === n.GRID && (A.height = this.cellSize.height / x);
}
var b = A.anchorX, R = A.width * S, w = A.height * x;
v > p && (p = v);
if (w >= p) {
v = p;
p = w;
y = A.getAnchorPoint().y;
}
this.horizontalDirection === o.RIGHT_TO_LEFT && (b = 1 - A.anchorX);
_ = _ + l * b * R + l * this.spacingX;
var O = l * (1 - b) * R;
if (e) {
var I = _ + O + l * (l > 0 ? this.paddingRight : this.paddingLeft), D = this.horizontalDirection === o.LEFT_TO_RIGHT && I > (1 - c.x) * t, M = this.horizontalDirection === o.RIGHT_TO_LEFT && I < -c.x * t;
if (D || M) {
if (w >= p) {
0 === v && (v = p);
d += v;
v = p;
} else {
d += p;
v = w;
p = 0;
}
_ = f + l * (h + b * R);
g++;
}
}
var L = i(A, d, g);
t >= R + this.paddingLeft + this.paddingRight && s && A.setPosition(cc.v2(_, L));
var N, P = 1, F = 0 === p ? w : p;
if (this.verticalDirection === a.TOP_TO_BOTTOM) {
m = m || this.node._contentSize.height;
(N = L + (P = -1) * (F * y + this.paddingBottom)) < m && (m = N);
} else {
m = m || -this.node._contentSize.height;
(N = L + P * (F * y + this.paddingTop)) > m && (m = N);
}
_ += O;
}
}
return m;
},
_getVerticalBaseHeight: function(t) {
var e = 0, i = 0;
if (this.resizeMode === r.CONTAINER) {
for (var n = 0; n < t.length; ++n) {
var s = t[n];
if (s.activeInHierarchy) {
i++;
e += s.height * this._getUsedScaleValue(s.scaleY);
}
}
e += (i - 1) * this.spacingY + this.paddingBottom + this.paddingTop;
} else e = this.node.getContentSize().height;
return e;
},
_doLayoutVertically: function(t, e, i, s) {
var c = this.node.getAnchorPoint(), u = this.node.children, l = 1, h = this.paddingBottom, f = -c.y * t;
if (this.verticalDirection === a.TOP_TO_BOTTOM) {
l = -1;
f = (1 - c.y) * t;
h = this.paddingTop;
}
for (var _ = f + l * h - l * this.spacingY, d = 0, p = 0, v = 0, g = 0, m = 0, y = 0, E = 0, T = 0; T < u.length; ++T) (A = u[T]).activeInHierarchy && E++;
var C = this.cellSize.height;
this.type !== n.GRID && this.resizeMode === r.CHILDREN && (C = (t - (this.paddingTop + this.paddingBottom) - (E - 1) * this.spacingY) / E);
for (T = 0; T < u.length; ++T) {
var A = u[T], S = this._getUsedScaleValue(A.scaleX), x = this._getUsedScaleValue(A.scaleY);
if (A.activeInHierarchy) {
if (this.resizeMode === r.CHILDREN) {
A.height = C / x;
this.type === n.GRID && (A.width = this.cellSize.width / S);
}
var b = A.anchorY, R = A.width * S, w = A.height * x;
v > p && (p = v);
if (R >= p) {
v = p;
p = R;
y = A.getAnchorPoint().x;
}
this.verticalDirection === a.TOP_TO_BOTTOM && (b = 1 - A.anchorY);
_ = _ + l * b * w + l * this.spacingY;
var O = l * (1 - b) * w;
if (e) {
var I = _ + O + l * (l > 0 ? this.paddingTop : this.paddingBottom), D = this.verticalDirection === a.BOTTOM_TO_TOP && I > (1 - c.y) * t, M = this.verticalDirection === a.TOP_TO_BOTTOM && I < -c.y * t;
if (D || M) {
if (R >= p) {
0 === v && (v = p);
d += v;
v = p;
} else {
d += p;
v = R;
p = 0;
}
_ = f + l * (h + b * w);
g++;
}
}
var L = i(A, d, g);
t >= w + (this.paddingTop + this.paddingBottom) && s && A.setPosition(cc.v2(L, _));
var N, P = 1, F = 0 === p ? R : p;
if (this.horizontalDirection === o.RIGHT_TO_LEFT) {
P = -1;
m = m || this.node._contentSize.width;
(N = L + P * (F * y + this.paddingLeft)) < m && (m = N);
} else {
m = m || -this.node._contentSize.width;
(N = L + P * (F * y + this.paddingRight)) > m && (m = N);
}
_ += O;
}
}
return m;
},
_doLayoutBasic: function() {
for (var t = this.node.children, e = null, i = 0; i < t.length; ++i) {
var n = t[i];
n.activeInHierarchy && (e ? e.union(e, n.getBoundingBoxToWorld()) : e = n.getBoundingBoxToWorld());
}
if (e) {
var r = this.node.convertToNodeSpaceAR(cc.v2(e.x, e.y));
r = cc.v2(r.x - this.paddingLeft, r.y - this.paddingBottom);
var s = this.node.convertToNodeSpaceAR(cc.v2(e.xMax, e.yMax)), a = (s = cc.v2(s.x + this.paddingRight, s.y + this.paddingTop)).sub(r);
if (0 !== (a = cc.size(parseFloat(a.x.toFixed(2)), parseFloat(a.y.toFixed(2)))).width) {
var o = -r.x / a.width;
this.node.anchorX = parseFloat(o.toFixed(2));
}
if (0 !== a.height) {
var c = -r.y / a.height;
this.node.anchorY = parseFloat(c.toFixed(2));
}
this.node.setContentSize(a);
}
},
_doLayoutGridAxisHorizontal: function(t, e) {
var i = e.width, n = 1, s = -t.y * e.height, o = this.paddingBottom;
if (this.verticalDirection === a.TOP_TO_BOTTOM) {
n = -1;
s = (1 - t.y) * e.height;
o = this.paddingTop;
}
var c = function(t, e, i) {
return s + n * (e + t.anchorY * t.height * this._getUsedScaleValue(t.scaleY) + o + i * this.spacingY);
}.bind(this), u = 0;
if (this.resizeMode === r.CONTAINER) {
var l = this._doLayoutHorizontally(i, !0, c, !1);
(u = s - l) < 0 && (u *= -1);
s = -t.y * u;
if (this.verticalDirection === a.TOP_TO_BOTTOM) {
n = -1;
s = (1 - t.y) * u;
}
}
this._doLayoutHorizontally(i, !0, c, !0);
this.resizeMode === r.CONTAINER && this.node.setContentSize(i, u);
},
_doLayoutGridAxisVertical: function(t, e) {
var i = e.height, n = 1, s = -t.x * e.width, a = this.paddingLeft;
if (this.horizontalDirection === o.RIGHT_TO_LEFT) {
n = -1;
s = (1 - t.x) * e.width;
a = this.paddingRight;
}
var c = function(t, e, i) {
return s + n * (e + t.anchorX * t.width * this._getUsedScaleValue(t.scaleX) + a + i * this.spacingX);
}.bind(this), u = 0;
if (this.resizeMode === r.CONTAINER) {
var l = this._doLayoutVertically(i, !0, c, !1);
(u = s - l) < 0 && (u *= -1);
s = -t.x * u;
if (this.horizontalDirection === o.RIGHT_TO_LEFT) {
n = -1;
s = (1 - t.x) * u;
}
}
this._doLayoutVertically(i, !0, c, !0);
this.resizeMode === r.CONTAINER && this.node.setContentSize(u, i);
},
_doLayoutGrid: function() {
var t = this.node.getAnchorPoint(), e = this.node.getContentSize();
this.startAxis === s.HORIZONTAL ? this._doLayoutGridAxisHorizontal(t, e) : this.startAxis === s.VERTICAL && this._doLayoutGridAxisVertical(t, e);
},
_getHorizontalBaseWidth: function(t) {
var e = 0, i = 0;
if (this.resizeMode === r.CONTAINER) {
for (var n = 0; n < t.length; ++n) {
var s = t[n];
if (s.activeInHierarchy) {
i++;
e += s.width * this._getUsedScaleValue(s.scaleX);
}
}
e += (i - 1) * this.spacingX + this.paddingLeft + this.paddingRight;
} else e = this.node.getContentSize().width;
return e;
},
_doLayout: function() {
if (this.type === n.HORIZONTAL) {
var t = this._getHorizontalBaseWidth(this.node.children);
this._doLayoutHorizontally(t, !1, (function(t) {
return t.y;
}), !0);
this.node.width = t;
} else if (this.type === n.VERTICAL) {
var e = this._getVerticalBaseHeight(this.node.children);
this._doLayoutVertically(e, !1, (function(t) {
return t.x;
}), !0);
this.node.height = e;
} else this.type === n.NONE ? this.resizeMode === r.CONTAINER && this._doLayoutBasic() : this.type === n.GRID && this._doLayoutGrid();
},
_getUsedScaleValue: function(t) {
return this.affectedByScale ? Math.abs(t) : 1;
},
updateLayout: function() {
if (this._layoutDirty && this.node.children.length > 0) {
this._doLayout();
this._layoutDirty = !1;
}
}
});
cc.Layout = e.exports = c;
}), {
"../CCNode": 25,
"./CCComponent": 94
} ],
100: [ (function(t, e) {
"use strict";
var i = a(t("../../renderer/gfx")), n = a(t("../value-types/mat4")), r = a(t("../value-types/vec2")), s = a(t("../assets/material/material-variant"));
function a(t) {
return t && t.__esModule ? t : {
default: t
};
}
var o = t("../utils/misc"), c = t("./CCRenderComponent"), u = t("../renderer/render-flow"), l = t("../graphics/graphics"), h = new r.default(), f = new n.default(), _ = [];
function d(t, e, i) {
_.length = 0;
for (var n = 2 * Math.PI / i, r = 0; r < i; ++r) _.push(cc.v2(e.x * Math.cos(n * r) + t.x, e.y * Math.sin(n * r) + t.y));
return _;
}
var p = cc.Enum({
RECT: 0,
ELLIPSE: 1,
IMAGE_STENCIL: 2
}), v = cc.Class({
name: "cc.Mask",
extends: c,
editor: !1,
ctor: function() {
this._graphics = null;
this._enableMaterial = null;
this._exitMaterial = null;
this._clearMaterial = null;
},
properties: {
_spriteFrame: {
default: null,
type: cc.SpriteFrame
},
_type: p.RECT,
type: {
get: function() {
return this._type;
},
set: function(t) {
this._type !== t && this._resetAssembler();
this._type = t;
if (this._type !== p.IMAGE_STENCIL) {
this.spriteFrame = null;
this.alphaThreshold = 0;
this._updateGraphics();
}
this._activateMaterial();
},
type: p,
tooltip: !1
},
spriteFrame: {
type: cc.SpriteFrame,
tooltip: !1,
get: function() {
return this._spriteFrame;
},
set: function(t) {
if (this._spriteFrame !== t) {
this._spriteFrame = t;
this.setVertsDirty();
this._updateMaterial();
}
}
},
alphaThreshold: {
default: .1,
type: cc.Float,
range: [ 0, 1, .1 ],
slide: !0,
tooltip: !1,
notify: function() {
cc.game.renderType !== cc.game.RENDER_TYPE_CANVAS ? this._updateMaterial() : cc.warnID(4201);
}
},
inverted: {
default: !1,
type: cc.Boolean,
tooltip: !1,
notify: function() {
cc.game.renderType === cc.game.RENDER_TYPE_CANVAS && cc.warnID(4202);
}
},
_segments: 64,
segements: {
get: function() {
return this._segments;
},
set: function(t) {
this._segments = o.clampf(t, 3, 1e4);
this._updateGraphics();
},
type: cc.Integer,
tooltip: !1
},
_resizeToTarget: {
animatable: !1,
set: function(t) {
t && this._resizeNodeToTargetNode();
}
}
},
statics: {
Type: p
},
onRestore: function() {
this._activateMaterial();
},
onEnable: function() {
this._super();
this._type !== p.IMAGE_STENCIL && this._updateGraphics();
this.node.on(cc.Node.EventType.POSITION_CHANGED, this._updateGraphics, this);
this.node.on(cc.Node.EventType.ROTATION_CHANGED, this._updateGraphics, this);
this.node.on(cc.Node.EventType.SCALE_CHANGED, this._updateGraphics, this);
this.node.on(cc.Node.EventType.SIZE_CHANGED, this._updateGraphics, this);
this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this._updateGraphics, this);
},
onDisable: function() {
this._super();
this.node.off(cc.Node.EventType.POSITION_CHANGED, this._updateGraphics, this);
this.node.off(cc.Node.EventType.ROTATION_CHANGED, this._updateGraphics, this);
this.node.off(cc.Node.EventType.SCALE_CHANGED, this._updateGraphics, this);
this.node.off(cc.Node.EventType.SIZE_CHANGED, this._updateGraphics, this);
this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this._updateGraphics, this);
this.node._renderFlag &= ~u.FLAG_POST_RENDER;
},
onDestroy: function() {
this._super();
this._removeGraphics();
},
_resizeNodeToTargetNode: !1,
_validateRender: function() {
if (this._type === p.IMAGE_STENCIL) {
var t = this._spriteFrame;
t && t.textureLoaded() || this.disableRender();
}
},
_activateMaterial: function() {
this._createGraphics();
var t = this._materials[0];
(t = t ? s.default.create(t, this) : s.default.createWithBuiltin("2d-sprite", this)).define("USE_ALPHA_TEST", !0);
if (this._type === p.IMAGE_STENCIL) {
t.define("CC_USE_MODEL", !1);
t.define("USE_TEXTURE", !0);
} else {
t.define("CC_USE_MODEL", !0);
t.define("USE_TEXTURE", !1);
}
this._enableMaterial || (this._enableMaterial = s.default.createWithBuiltin("2d-sprite", this));
if (!this._exitMaterial) {
this._exitMaterial = s.default.createWithBuiltin("2d-sprite", this);
this._exitMaterial.setStencilEnabled(i.default.STENCIL_DISABLE);
}
this._clearMaterial || (this._clearMaterial = s.default.createWithBuiltin("clear-stencil", this));
this.setMaterial(0, t);
this._graphics._materials[0] = t;
this._updateMaterial();
},
_updateMaterial: function() {
var t = this._materials[0];
if (t) {
if (this._type === p.IMAGE_STENCIL && this.spriteFrame) {
var e = this.spriteFrame.getTexture();
t.setProperty("texture", e);
}
t.setProperty("alphaThreshold", this.alphaThreshold);
}
},
_createGraphics: function() {
if (!this._graphics) {
this._graphics = new l();
cc.Assembler.init(this._graphics);
this._graphics.node = this.node;
this._graphics.lineWidth = 0;
this._graphics.strokeColor = cc.color(0, 0, 0, 0);
}
},
_updateGraphics: function() {
var t = this.node, e = this._graphics;
e.clear(!1);
var i = t._contentSize.width, n = t._contentSize.height, r = -i * t._anchorPoint.x, s = -n * t._anchorPoint.y;
if (this._type === p.RECT) e.rect(r, s, i, n); else if (this._type === p.ELLIPSE) {
for (var a = d(cc.v2(r + i / 2, s + n / 2), {
x: i / 2,
y: n / 2
}, this._segments), o = 0; o < a.length; ++o) {
var c = a[o];
0 === o ? e.moveTo(c.x, c.y) : e.lineTo(c.x, c.y);
}
e.close();
}
cc.game.renderType === cc.game.RENDER_TYPE_CANVAS ? e.stroke() : e.fill();
},
_removeGraphics: function() {
if (this._graphics) {
this._graphics.destroy();
this._graphics._destroyImmediate();
this._graphics = null;
}
},
_hitTest: function(t) {
var e = this.node, i = e.getContentSize(), s = i.width, a = i.height, o = h;
e._updateWorldMatrix();
if (!n.default.invert(f, e._worldMatrix)) return !1;
r.default.transformMat4(o, t, f);
o.x += e._anchorPoint.x * s;
o.y += e._anchorPoint.y * a;
var c = !1;
if (this.type === p.RECT || this.type === p.IMAGE_STENCIL) c = o.x >= 0 && o.y >= 0 && o.x <= s && o.y <= a; else if (this.type === p.ELLIPSE) {
var u = s / 2, l = a / 2, _ = o.x - .5 * s, d = o.y - .5 * a;
c = _ * _ / (u * u) + d * d / (l * l) < 1;
}
this.inverted && (c = !c);
return c;
},
markForRender: function(t) {
var e = u.FLAG_RENDER | u.FLAG_UPDATE_RENDER_DATA | u.FLAG_POST_RENDER;
if (t) {
this.node._renderFlag |= e;
this.markForValidate();
} else t || (this.node._renderFlag &= ~e);
},
disableRender: function() {
this.node._renderFlag &= ~(u.FLAG_RENDER | u.FLAG_UPDATE_RENDER_DATA | u.FLAG_POST_RENDER);
}
});
cc.Mask = e.exports = v;
}), {
"../../renderer/gfx": 231,
"../assets/material/material-variant": 83,
"../graphics/graphics": 122,
"../renderer/render-flow": 160,
"../utils/misc": 196,
"../value-types/mat4": 213,
"../value-types/vec2": 220,
"./CCRenderComponent": 102
} ],
101: [ (function(t, e) {
"use strict";
var i = t("../utils/misc"), n = t("./CCComponent"), r = cc.Enum({
HORIZONTAL: 0,
VERTICAL: 1,
FILLED: 2
}), s = cc.Class({
name: "cc.ProgressBar",
extends: n,
editor: !1,
_initBarSprite: function() {
if (this.barSprite) {
var t = this.barSprite.node;
if (!t) return;
var e = this.node.getContentSize(), i = this.node.getAnchorPoint(), n = t.getContentSize();
t.parent === this.node && this.node.setContentSize(n);
this.barSprite.fillType === cc.Sprite.FillType.RADIAL && (this.mode = r.FILLED);
var s = t.getContentSize();
this.mode === r.HORIZONTAL ? this.totalLength = s.width : this.mode === r.VERTICAL ? this.totalLength = s.height : this.totalLength = this.barSprite.fillRange;
if (t.parent === this.node) {
var a = -e.width * i.x;
t.setPosition(cc.v2(a, 0));
}
}
},
_updateBarStatus: function() {
if (this.barSprite) {
var t = this.barSprite.node;
if (!t) return;
var e, n, s, a = t.getAnchorPoint(), o = t.getContentSize(), c = t.getPosition(), u = cc.v2(0, .5), l = i.clamp01(this.progress), h = this.totalLength * l;
switch (this.mode) {
case r.HORIZONTAL:
this.reverse && (u = cc.v2(1, .5));
e = cc.size(h, o.height);
n = this.totalLength;
s = o.height;
break;

case r.VERTICAL:
u = this.reverse ? cc.v2(.5, 1) : cc.v2(.5, 0);
e = cc.size(o.width, h);
n = o.width;
s = this.totalLength;
}
if (this.mode === r.FILLED) if (this.barSprite.type !== cc.Sprite.Type.FILLED) cc.warn("ProgressBar FILLED mode only works when barSprite's Type is FILLED!"); else {
this.reverse && (h *= -1);
this.barSprite.fillRange = h;
} else if (this.barSprite.type !== cc.Sprite.Type.FILLED) {
var f = u.x - a.x, _ = u.y - a.y, d = cc.v2(n * f, s * _);
t.setPosition(c.x + d.x, c.y + d.y);
t.setAnchorPoint(u);
t.setContentSize(e);
} else cc.warn("ProgressBar non-FILLED mode only works when barSprite's Type is non-FILLED!");
}
},
properties: {
barSprite: {
default: null,
type: cc.Sprite,
tooltip: !1,
notify: function() {
this._initBarSprite();
},
animatable: !1
},
mode: {
default: r.HORIZONTAL,
type: r,
tooltip: !1,
notify: function() {
if (this.barSprite) {
var t = this.barSprite.node;
if (!t) return;
var e = t.getContentSize();
this.mode === r.HORIZONTAL ? this.totalLength = e.width : this.mode === r.VERTICAL ? this.totalLength = e.height : this.mode === r.FILLED && (this.totalLength = this.barSprite.fillRange);
}
},
animatable: !1
},
_N$totalLength: 1,
totalLength: {
range: [ 0, Number.MAX_VALUE ],
tooltip: !1,
get: function() {
return this._N$totalLength;
},
set: function(t) {
this.mode === r.FILLED && (t = i.clamp01(t));
this._N$totalLength = t;
this._updateBarStatus();
}
},
progress: {
default: 1,
type: cc.Float,
range: [ 0, 1, .1 ],
slide: !0,
tooltip: !1,
notify: function() {
this._updateBarStatus();
}
},
reverse: {
default: !1,
tooltip: !1,
notify: function() {
this.barSprite && (this.barSprite.fillStart = 1 - this.barSprite.fillStart);
this._updateBarStatus();
},
animatable: !1
}
},
statics: {
Mode: r
}
});
cc.ProgressBar = e.exports = s;
}), {
"../utils/misc": 196,
"./CCComponent": 94
} ],
102: [ (function(t, e) {
"use strict";
var i = s(t("../renderer/assembler")), n = s(t("../assets/material/material-variant")), r = t("../value-types");
function s(t) {
return t && t.__esModule ? t : {
default: t
};
}
var a = t("./CCComponent"), o = t("../renderer/render-flow"), c = t("../assets/material/CCMaterial"), u = new r.Color(), l = cc.Class({
name: "RenderComponent",
extends: a,
editor: !1,
properties: {
_materials: {
default: [],
type: c
},
materials: {
get: function() {
return this._materials;
},
set: function(t) {
this._materials = t;
this._activateMaterial();
},
type: [ c ],
displayName: "Materials",
animatable: !1
}
},
ctor: function() {
this._vertsDirty = !0;
this._assembler = null;
},
_resetAssembler: function() {
i.default.init(this);
this._updateColor();
this.setVertsDirty();
},
__preload: function() {
this._resetAssembler();
this._activateMaterial();
},
onEnable: function() {
this.node._renderComponent && (this.node._renderComponent.enabled = !1);
this.node._renderComponent = this;
this.node._renderFlag |= o.FLAG_OPACITY_COLOR;
this.setVertsDirty();
},
onDisable: function() {
this.node._renderComponent = null;
this.disableRender();
},
onDestroy: function() {
for (var t = this._materials, e = 0; e < t.length; e++) cc.pool.material.put(t[e]);
t.length = 0;
cc.pool.assembler.put(this._assembler);
},
setVertsDirty: function() {
this._vertsDirty = !0;
this.markForRender(!0);
},
_on3DNodeChanged: function() {
this._resetAssembler();
},
_validateRender: function() {},
markForValidate: function() {
cc.RenderFlow.registerValidate(this);
},
markForRender: function(t) {
var e = o.FLAG_RENDER | o.FLAG_UPDATE_RENDER_DATA;
if (t) {
this.node._renderFlag |= e;
this.markForValidate();
} else this.node._renderFlag &= ~e;
},
disableRender: function() {
this.node._renderFlag &= ~(o.FLAG_RENDER | o.FLAG_UPDATE_RENDER_DATA);
},
getMaterial: function(t) {
if (t < 0 || t >= this._materials.length) return null;
var e = this._materials[t];
if (!e) return null;
var i = n.default.create(e, this);
i !== e && this.setMaterial(t, i);
return i;
},
getMaterials: function() {
for (var t = this._materials, e = 0; e < t.length; e++) t[e] = n.default.create(t[e], this);
return t;
},
setMaterial: function(t, e) {
if (e !== this._materials[t]) {
e = n.default.create(e, this);
this._materials[t] = e;
}
this._updateMaterial();
this.markForRender(!0);
return e;
},
_getDefaultMaterial: function() {
return c.getBuiltinMaterial("2d-sprite");
},
_activateMaterial: function() {
var t = this._materials;
if (!t[0]) {
var e = this._getDefaultMaterial();
t[0] = e;
}
for (var i = 0; i < t.length; i++) t[i] = n.default.create(t[i], this);
this._updateMaterial();
},
_updateMaterial: function() {},
_updateColor: function() {
if (this._assembler.updateColor) {
var t = this.srcBlendFactor === cc.macro.BlendFactor.ONE;
t && r.Color.premultiplyAlpha(u, this.node._color);
var e = t ? u._val : null;
this._assembler.updateColor(this, e);
}
},
_checkBacth: function(t, e) {
var i = this._materials[0];
if (i && i.getHash() !== t.material.getHash() || t.cullingMask !== e) {
t._flush();
t.node = i.getDefine("CC_USE_MODEL") ? this.node : t._dummyNode;
t.material = i;
t.cullingMask = e;
}
}
});
cc.RenderComponent = e.exports = l;
}), {
"../assets/material/CCMaterial": 76,
"../assets/material/material-variant": 83,
"../renderer/assembler": 156,
"../renderer/render-flow": 160,
"../value-types": 211,
"./CCComponent": 94
} ],
103: [ (function(t, e) {
"use strict";
var i = t("../utils/misc"), n = (t("./CCComponent"), cc.Enum({
HORIZONTAL: 0,
VERTICAL: 1
})), r = cc.Class({
name: "cc.Scrollbar",
extends: t("./CCComponent"),
editor: !1,
properties: {
_scrollView: null,
_touching: !1,
_autoHideRemainingTime: {
default: 0,
serializable: !1
},
_opacity: 255,
handle: {
default: null,
type: cc.Sprite,
tooltip: !1,
notify: function() {
this._onScroll(cc.v2(0, 0));
},
animatable: !1
},
direction: {
default: n.HORIZONTAL,
type: n,
tooltip: !1,
notify: function() {
this._onScroll(cc.v2(0, 0));
},
animatable: !1
},
enableAutoHide: {
default: !0,
animatable: !1,
tooltip: !1
},
autoHideTime: {
default: 1,
animatable: !1,
tooltip: !1
}
},
statics: {
Direction: n
},
setTargetScrollView: function(t) {
this._scrollView = t;
},
_convertToScrollViewSpace: function(t) {
var e = this._scrollView.node, i = t.convertToWorldSpaceAR(cc.v2(-t.anchorX * t.width, -t.anchorY * t.height)), n = e.convertToNodeSpaceAR(i);
n.x += e.anchorX * e.width;
n.y += e.anchorY * e.height;
return n;
},
_setOpacity: function(t) {
if (this.handle) {
this.node.opacity = t;
this.handle.node.opacity = t;
}
},
_onScroll: function(t) {
if (this._scrollView) {
var e = this._scrollView.content;
if (e) {
var i = e.getContentSize(), r = this._scrollView.node.getContentSize(), s = this.node.getContentSize();
if (this._conditionalDisableScrollBar(i, r)) return;
if (this.enableAutoHide) {
this._autoHideRemainingTime = this.autoHideTime;
this._setOpacity(this._opacity);
}
var a = 0, o = 0, c = 0, u = 0, l = 0;
if (this.direction === n.HORIZONTAL) {
a = i.width;
o = r.width;
l = s.width;
c = t.x;
u = -this._convertToScrollViewSpace(e).x;
} else if (this.direction === n.VERTICAL) {
a = i.height;
o = r.height;
l = s.height;
c = t.y;
u = -this._convertToScrollViewSpace(e).y;
}
var h = this._calculateLength(a, o, l, c), f = this._calculatePosition(a, o, l, u, c, h);
this._updateLength(h);
this._updateHanlderPosition(f);
}
}
},
_updateHanlderPosition: function(t) {
if (this.handle) {
var e = this._fixupHandlerPosition();
this.handle.node.setPosition(t.x + e.x, t.y + e.y);
}
},
_fixupHandlerPosition: function() {
var t = this.node.getContentSize(), e = this.node.getAnchorPoint(), i = this.handle.node.getContentSize(), r = this.handle.node.parent, s = this.node.convertToWorldSpaceAR(cc.v2(-t.width * e.x, -t.height * e.y)), a = r.convertToNodeSpaceAR(s);
this.direction === n.HORIZONTAL ? a = cc.v2(a.x, a.y + (t.height - i.height) / 2) : this.direction === n.VERTICAL && (a = cc.v2(a.x + (t.width - i.width) / 2, a.y));
this.handle.node.setPosition(a);
return a;
},
_onTouchBegan: function() {
this.enableAutoHide && (this._touching = !0);
},
_conditionalDisableScrollBar: function(t, e) {
return t.width <= e.width && this.direction === n.HORIZONTAL || t.height <= e.height && this.direction === n.VERTICAL;
},
_onTouchEnded: function() {
if (this.enableAutoHide) {
this._touching = !1;
if (!(this.autoHideTime <= 0)) {
if (this._scrollView) {
var t = this._scrollView.content;
if (t) {
var e = t.getContentSize(), i = this._scrollView.node.getContentSize();
if (this._conditionalDisableScrollBar(e, i)) return;
}
}
this._autoHideRemainingTime = this.autoHideTime;
}
}
},
_calculateLength: function(t, e, i, n) {
var r = t;
n && (r += 20 * (n > 0 ? n : -n));
return i * (e / r);
},
_calculatePosition: function(t, e, r, s, a, o) {
var c = t - e;
a && (c += Math.abs(a));
var u = 0;
if (c) {
u = s / c;
u = i.clamp01(u);
}
var l = (r - o) * u;
return this.direction === n.VERTICAL ? cc.v2(0, l) : cc.v2(l, 0);
},
_updateLength: function(t) {
if (this.handle) {
var e = this.handle.node, i = e.getContentSize();
e.setAnchorPoint(cc.v2(0, 0));
this.direction === n.HORIZONTAL ? e.setContentSize(t, i.height) : e.setContentSize(i.width, t);
}
},
_processAutoHide: function(t) {
if (this.enableAutoHide && !(this._autoHideRemainingTime <= 0) && !this._touching) {
this._autoHideRemainingTime -= t;
if (this._autoHideRemainingTime <= this.autoHideTime) {
this._autoHideRemainingTime = Math.max(0, this._autoHideRemainingTime);
var e = this._opacity * (this._autoHideRemainingTime / this.autoHideTime);
this._setOpacity(e);
}
}
},
start: function() {
this.enableAutoHide && this._setOpacity(0);
},
hide: function() {
this._autoHideRemainingTime = 0;
this._setOpacity(0);
},
show: function() {
this._autoHideRemainingTime = this.autoHideTime;
this._setOpacity(this._opacity);
},
update: function(t) {
this._processAutoHide(t);
}
});
cc.Scrollbar = e.exports = r;
}), {
"../utils/misc": 196,
"./CCComponent": 94
} ],
104: [ (function(t, e) {
"use strict";
var i = t("../CCNode").EventType, n = cc.v2(), r = cc.v2(), s = function() {
return new Date().getMilliseconds();
}, a = cc.Enum({
SCROLL_TO_TOP: 0,
SCROLL_TO_BOTTOM: 1,
SCROLL_TO_LEFT: 2,
SCROLL_TO_RIGHT: 3,
SCROLLING: 4,
BOUNCE_TOP: 5,
BOUNCE_BOTTOM: 6,
BOUNCE_LEFT: 7,
BOUNCE_RIGHT: 8,
SCROLL_ENDED: 9,
TOUCH_UP: 10,
AUTOSCROLL_ENDED_WITH_THRESHOLD: 11,
SCROLL_BEGAN: 12
}), o = {
"scroll-to-top": a.SCROLL_TO_TOP,
"scroll-to-bottom": a.SCROLL_TO_BOTTOM,
"scroll-to-left": a.SCROLL_TO_LEFT,
"scroll-to-right": a.SCROLL_TO_RIGHT,
scrolling: a.SCROLLING,
"bounce-bottom": a.BOUNCE_BOTTOM,
"bounce-left": a.BOUNCE_LEFT,
"bounce-right": a.BOUNCE_RIGHT,
"bounce-top": a.BOUNCE_TOP,
"scroll-ended": a.SCROLL_ENDED,
"touch-up": a.TOUCH_UP,
"scroll-ended-with-threshold": a.AUTOSCROLL_ENDED_WITH_THRESHOLD,
"scroll-began": a.SCROLL_BEGAN
}, c = cc.Class({
name: "cc.ScrollView",
extends: t("./CCViewGroup"),
editor: !1,
ctor: function() {
this._topBoundary = 0;
this._bottomBoundary = 0;
this._leftBoundary = 0;
this._rightBoundary = 0;
this._touchMoveDisplacements = [];
this._touchMoveTimeDeltas = [];
this._touchMovePreviousTimestamp = 0;
this._touchMoved = !1;
this._autoScrolling = !1;
this._autoScrollAttenuate = !1;
this._autoScrollStartPosition = cc.v2(0, 0);
this._autoScrollTargetDelta = cc.v2(0, 0);
this._autoScrollTotalTime = 0;
this._autoScrollAccumulatedTime = 0;
this._autoScrollCurrentlyOutOfBoundary = !1;
this._autoScrollBraking = !1;
this._autoScrollBrakingStartPosition = cc.v2(0, 0);
this._outOfBoundaryAmount = cc.v2(0, 0);
this._outOfBoundaryAmountDirty = !0;
this._stopMouseWheel = !1;
this._mouseWheelEventElapsedTime = 0;
this._isScrollEndedWithThresholdEventFired = !1;
this._scrollEventEmitMask = 0;
this._isBouncing = !1;
this._scrolling = !1;
},
properties: {
content: {
default: void 0,
type: cc.Node,
tooltip: !1,
formerlySerializedAs: "content",
notify: function() {
this._calculateBoundary();
}
},
horizontal: {
default: !0,
animatable: !1,
tooltip: !1
},
vertical: {
default: !0,
animatable: !1,
tooltip: !1
},
inertia: {
default: !0,
tooltip: !1
},
brake: {
default: .5,
type: cc.Float,
range: [ 0, 1, .1 ],
tooltip: !1
},
elastic: {
default: !0,
animatable: !1,
tooltip: !1
},
bounceDuration: {
default: 1,
range: [ 0, 10 ],
tooltip: !1
},
horizontalScrollBar: {
default: void 0,
type: cc.Scrollbar,
tooltip: !1,
notify: function() {
if (this.horizontalScrollBar) {
this.horizontalScrollBar.setTargetScrollView(this);
this._updateScrollBar(0);
}
},
animatable: !1
},
verticalScrollBar: {
default: void 0,
type: cc.Scrollbar,
tooltip: !1,
notify: function() {
if (this.verticalScrollBar) {
this.verticalScrollBar.setTargetScrollView(this);
this._updateScrollBar(0);
}
},
animatable: !1
},
scrollEvents: {
default: [],
type: cc.Component.EventHandler,
tooltip: !1
},
cancelInnerEvents: {
default: !0,
animatable: !1,
tooltip: !1
},
_view: {
get: function() {
if (this.content) return this.content.parent;
}
}
},
statics: {
EventType: a
},
scrollToBottom: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.v2(0, 0),
applyToHorizontal: !1,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i, !0);
},
scrollToTop: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.v2(0, 1),
applyToHorizontal: !1,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToLeft: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.v2(0, 0),
applyToHorizontal: !0,
applyToVertical: !1
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToRight: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.v2(1, 0),
applyToHorizontal: !0,
applyToVertical: !1
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToTopLeft: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.v2(0, 1),
applyToHorizontal: !0,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToTopRight: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.v2(1, 1),
applyToHorizontal: !0,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToBottomLeft: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.v2(0, 0),
applyToHorizontal: !0,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToBottomRight: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.v2(1, 0),
applyToHorizontal: !0,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToOffset: function(t, e, i) {
var n = this.getMaxScrollOffset(), r = cc.v2(0, 0);
0 === n.x ? r.x = 0 : r.x = t.x / n.x;
0 === n.y ? r.y = 1 : r.y = (n.y - t.y) / n.y;
this.scrollTo(r, e, i);
},
getScrollOffset: function() {
var t = this._getContentTopBoundary() - this._topBoundary, e = this._getContentLeftBoundary() - this._leftBoundary;
return cc.v2(e, t);
},
getMaxScrollOffset: function() {
var t = this._view.getContentSize(), e = this.content.getContentSize(), i = e.width - t.width, n = e.height - t.height;
i = i >= 0 ? i : 0;
n = n >= 0 ? n : 0;
return cc.v2(i, n);
},
scrollToPercentHorizontal: function(t, e, i) {
var n = this._calculateMovePercentDelta({
anchor: cc.v2(t, 0),
applyToHorizontal: !0,
applyToVertical: !1
});
e ? this._startAutoScroll(n, e, !1 !== i) : this._moveContent(n);
},
scrollTo: function(t, e, i) {
var n = this._calculateMovePercentDelta({
anchor: cc.v2(t),
applyToHorizontal: !0,
applyToVertical: !0
});
e ? this._startAutoScroll(n, e, !1 !== i) : this._moveContent(n);
},
scrollToPercentVertical: function(t, e, i) {
var n = this._calculateMovePercentDelta({
anchor: cc.v2(0, t),
applyToHorizontal: !1,
applyToVertical: !0
});
e ? this._startAutoScroll(n, e, !1 !== i) : this._moveContent(n);
},
stopAutoScroll: function() {
this._autoScrolling = !1;
this._autoScrollAccumulatedTime = this._autoScrollTotalTime;
},
setContentPosition: function(t) {
if (!t.fuzzyEquals(this.getContentPosition(), 1e-4)) {
this.content.setPosition(t);
this._outOfBoundaryAmountDirty = !0;
}
},
getContentPosition: function() {
return this.content.getPosition();
},
isScrolling: function() {
return this._scrolling;
},
isAutoScrolling: function() {
return this._autoScrolling;
},
_registerEvent: function() {
this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this, !0);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, !0);
this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this, !0);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this, !0);
this.node.on(cc.Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, !0);
},
_unregisterEvent: function() {
this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this, !0);
this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, !0);
this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this, !0);
this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this, !0);
this.node.off(cc.Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, !0);
},
_onMouseWheel: function(t, e) {
if (this.enabledInHierarchy && !this._hasNestedViewGroup(t, e)) {
var i = cc.v2(0, 0);
-7;
this.vertical ? i = cc.v2(0, -7 * t.getScrollY()) : this.horizontal && (i = cc.v2(-7 * t.getScrollY(), 0));
this._mouseWheelEventElapsedTime = 0;
this._processDeltaMove(i);
if (!this._stopMouseWheel) {
this._handlePressLogic();
this.schedule(this._checkMouseWheel, 1 / 60);
this._stopMouseWheel = !0;
}
this._stopPropagationIfTargetIsMe(t);
}
},
_checkMouseWheel: function(t) {
if (this._getHowMuchOutOfBoundary().fuzzyEquals(cc.v2(0, 0), 1e-4)) {
this._mouseWheelEventElapsedTime += t;
if (this._mouseWheelEventElapsedTime > .1) {
this._onScrollBarTouchEnded();
this.unschedule(this._checkMouseWheel);
this._dispatchEvent("scroll-ended");
this._stopMouseWheel = !1;
}
} else {
this._processInertiaScroll();
this.unschedule(this._checkMouseWheel);
this._dispatchEvent("scroll-ended");
this._stopMouseWheel = !1;
}
},
_calculateMovePercentDelta: function(t) {
var e = t.anchor, i = t.applyToHorizontal, n = t.applyToVertical;
this._calculateBoundary();
e = e.clampf(cc.v2(0, 0), cc.v2(1, 1));
var r = this._view.getContentSize(), s = this.content.getContentSize(), a = this._getContentBottomBoundary() - this._bottomBoundary;
a = -a;
var o = this._getContentLeftBoundary() - this._leftBoundary;
o = -o;
var c = cc.v2(0, 0), u = 0;
if (i) {
u = s.width - r.width;
c.x = o - u * e.x;
}
if (n) {
u = s.height - r.height;
c.y = a - u * e.y;
}
return c;
},
_moveContentToTopLeft: function(t) {
var e = this.content.getContentSize(), i = this._getContentBottomBoundary() - this._bottomBoundary;
i = -i;
var n = cc.v2(0, 0), r = 0, s = this._getContentLeftBoundary() - this._leftBoundary;
s = -s;
if (e.height < t.height) {
r = e.height - t.height;
n.y = i - r;
}
if (e.width < t.width) {
r = e.width - t.width;
n.x = s;
}
this._updateScrollBarState();
this._moveContent(n);
this._adjustContentOutOfBoundary();
},
_calculateBoundary: function() {
if (this.content) {
var t = this.content.getComponent(cc.Layout);
t && t.enabledInHierarchy && t.updateLayout();
var e = this._view.getContentSize(), i = e.width * this._view.anchorX, n = e.height * this._view.anchorY;
this._leftBoundary = -i;
this._bottomBoundary = -n;
this._rightBoundary = this._leftBoundary + e.width;
this._topBoundary = this._bottomBoundary + e.height;
this._moveContentToTopLeft(e);
}
},
_hasNestedViewGroup: function(t, e) {
if (t.eventPhase === cc.Event.CAPTURING_PHASE) {
if (e) for (var i = 0; i < e.length; ++i) {
var n = e[i];
if (this.node === n) return !!t.target.getComponent(cc.ViewGroup);
if (n.getComponent(cc.ViewGroup)) return !0;
}
return !1;
}
},
_stopPropagationIfTargetIsMe: function(t) {
t.eventPhase === cc.Event.AT_TARGET && t.target === this.node && t.stopPropagation();
},
_onTouchBegan: function(t, e) {
if (this.enabledInHierarchy && !this._hasNestedViewGroup(t, e)) {
var i = t.touch;
this.content && this._handlePressLogic(i);
this._touchMoved = !1;
this._stopPropagationIfTargetIsMe(t);
}
},
_onTouchMoved: function(t, e) {
if (this.enabledInHierarchy && !this._hasNestedViewGroup(t, e)) {
var i = t.touch;
this.content && this._handleMoveLogic(i);
if (this.cancelInnerEvents) {
if (i.getLocation().sub(i.getStartLocation()).mag() > 7 && !this._touchMoved && t.target !== this.node) {
var n = new cc.Event.EventTouch(t.getTouches(), t.bubbles);
n.type = cc.Node.EventType.TOUCH_CANCEL;
n.touch = t.touch;
n.simulate = !0;
t.target.dispatchEvent(n);
this._touchMoved = !0;
}
this._stopPropagationIfTargetIsMe(t);
}
}
},
_onTouchEnded: function(t, e) {
if (this.enabledInHierarchy && !this._hasNestedViewGroup(t, e)) {
this._dispatchEvent("touch-up");
var i = t.touch;
this.content && this._handleReleaseLogic(i);
this._touchMoved ? t.stopPropagation() : this._stopPropagationIfTargetIsMe(t);
}
},
_onTouchCancelled: function(t, e) {
if (this.enabledInHierarchy && !this._hasNestedViewGroup(t, e)) {
if (!t.simulate) {
var i = t.touch;
this.content && this._handleReleaseLogic(i);
}
this._stopPropagationIfTargetIsMe(t);
}
},
_processDeltaMove: function(t) {
this._scrollChildren(t);
this._gatherTouchMove(t);
},
_getLocalAxisAlignDelta: function(t) {
this.node.convertToNodeSpaceAR(t.getLocation(), n);
this.node.convertToNodeSpaceAR(t.getPreviousLocation(), r);
return n.sub(r);
},
_handleMoveLogic: function(t) {
var e = this._getLocalAxisAlignDelta(t);
this._processDeltaMove(e);
},
_scrollChildren: function(t) {
var e, i = t = this._clampDelta(t);
if (this.elastic) {
e = this._getHowMuchOutOfBoundary();
i.x *= 0 === e.x ? 1 : .5;
i.y *= 0 === e.y ? 1 : .5;
}
if (!this.elastic) {
e = this._getHowMuchOutOfBoundary(i);
i = i.add(e);
}
var n = -1;
i.y > 0 ? this.content.y - this.content.anchorY * this.content.height + i.y >= this._bottomBoundary && (n = "scroll-to-bottom") : i.y < 0 && this.content.y - this.content.anchorY * this.content.height + this.content.height + i.y <= this._topBoundary && (n = "scroll-to-top");
i.x < 0 ? this.content.x - this.content.anchorX * this.content.width + this.content.width + i.x <= this._rightBoundary && (n = "scroll-to-right") : i.x > 0 && this.content.x - this.content.anchorX * this.content.width + i.x >= this._leftBoundary && (n = "scroll-to-left");
this._moveContent(i, !1);
if (0 !== i.x || 0 !== i.y) {
if (!this._scrolling) {
this._scrolling = !0;
this._dispatchEvent("scroll-began");
}
this._dispatchEvent("scrolling");
}
-1 !== n && this._dispatchEvent(n);
},
_handlePressLogic: function() {
this._autoScrolling && this._dispatchEvent("scroll-ended");
this._autoScrolling = !1;
this._isBouncing = !1;
this._touchMovePreviousTimestamp = s();
this._touchMoveDisplacements.length = 0;
this._touchMoveTimeDeltas.length = 0;
this._onScrollBarTouchBegan();
},
_clampDelta: function(t) {
var e = this.content.getContentSize(), i = this._view.getContentSize();
e.width < i.width && (t.x = 0);
e.height < i.height && (t.y = 0);
return t;
},
_gatherTouchMove: function(t) {
t = this._clampDelta(t);
for (;this._touchMoveDisplacements.length >= 5; ) {
this._touchMoveDisplacements.shift();
this._touchMoveTimeDeltas.shift();
}
this._touchMoveDisplacements.push(t);
var e = s();
this._touchMoveTimeDeltas.push((e - this._touchMovePreviousTimestamp) / 1e3);
this._touchMovePreviousTimestamp = e;
},
_startBounceBackIfNeeded: function() {
if (!this.elastic) return !1;
var t = this._getHowMuchOutOfBoundary();
if ((t = this._clampDelta(t)).fuzzyEquals(cc.v2(0, 0), 1e-4)) return !1;
var e = Math.max(this.bounceDuration, 0);
this._startAutoScroll(t, e, !0);
if (!this._isBouncing) {
t.y > 0 && this._dispatchEvent("bounce-top");
t.y < 0 && this._dispatchEvent("bounce-bottom");
t.x > 0 && this._dispatchEvent("bounce-right");
t.x < 0 && this._dispatchEvent("bounce-left");
this._isBouncing = !0;
}
return !0;
},
_processInertiaScroll: function() {
if (!this._startBounceBackIfNeeded() && this.inertia) {
var t = this._calculateTouchMoveVelocity();
!t.fuzzyEquals(cc.v2(0, 0), 1e-4) && this.brake < 1 && this._startInertiaScroll(t);
}
this._onScrollBarTouchEnded();
},
_handleReleaseLogic: function(t) {
var e = this._getLocalAxisAlignDelta(t);
this._gatherTouchMove(e);
this._processInertiaScroll();
if (this._scrolling) {
this._scrolling = !1;
this._autoScrolling || this._dispatchEvent("scroll-ended");
}
},
_isOutOfBoundary: function() {
return !this._getHowMuchOutOfBoundary().fuzzyEquals(cc.v2(0, 0), 1e-4);
},
_isNecessaryAutoScrollBrake: function() {
if (this._autoScrollBraking) return !0;
if (this._isOutOfBoundary()) {
if (!this._autoScrollCurrentlyOutOfBoundary) {
this._autoScrollCurrentlyOutOfBoundary = !0;
this._autoScrollBraking = !0;
this._autoScrollBrakingStartPosition = this.getContentPosition();
return !0;
}
} else this._autoScrollCurrentlyOutOfBoundary = !1;
return !1;
},
getScrollEndedEventTiming: function() {
return 1e-4;
},
_processAutoScrolling: function(t) {
var e = this._isNecessaryAutoScrollBrake(), i = e ? .05 : 1;
this._autoScrollAccumulatedTime += t * (1 / i);
var n, r = Math.min(1, this._autoScrollAccumulatedTime / this._autoScrollTotalTime);
this._autoScrollAttenuate && (r = (n = r, (n -= 1) * n * n * n * n + 1));
var s = this._autoScrollStartPosition.add(this._autoScrollTargetDelta.mul(r)), a = Math.abs(r - 1) <= 1e-4;
if (Math.abs(r - 1) <= this.getScrollEndedEventTiming() && !this._isScrollEndedWithThresholdEventFired) {
this._dispatchEvent("scroll-ended-with-threshold");
this._isScrollEndedWithThresholdEventFired = !0;
}
if (this.elastic) {
var o = s.sub(this._autoScrollBrakingStartPosition);
e && (o = o.mul(i));
s = this._autoScrollBrakingStartPosition.add(o);
} else {
var c = s.sub(this.getContentPosition()), u = this._getHowMuchOutOfBoundary(c);
if (!u.fuzzyEquals(cc.v2(0, 0), 1e-4)) {
s = s.add(u);
a = !0;
}
}
a && (this._autoScrolling = !1);
var l = s.sub(this.getContentPosition());
this._moveContent(this._clampDelta(l), a);
this._dispatchEvent("scrolling");
if (!this._autoScrolling) {
this._isBouncing = !1;
this._scrolling = !1;
this._dispatchEvent("scroll-ended");
}
},
_startInertiaScroll: function(t) {
var e = t.mul(.7);
this._startAttenuatingAutoScroll(e, t);
},
_calculateAttenuatedFactor: function(t) {
return this.brake <= 0 ? 1 - this.brake : (1 - this.brake) * (1 / (1 + 14e-6 * t + t * t * 8e-9));
},
_startAttenuatingAutoScroll: function(t, e) {
var i = this._calculateAutoScrollTimeByInitalSpeed(e.mag()), n = t.normalize(), r = this.content.getContentSize(), s = this._view.getContentSize(), a = r.width - s.width, o = r.height - s.height, c = this._calculateAttenuatedFactor(a), u = this._calculateAttenuatedFactor(o);
n = cc.v2(n.x * a * (1 - this.brake) * c, n.y * o * u * (1 - this.brake));
var l = t.mag(), h = n.mag() / l;
n = n.add(t);
if (this.brake > 0 && h > 7) {
h = Math.sqrt(h);
n = t.mul(h).add(t);
}
this.brake > 0 && h > 3 && (i *= h = 3);
0 === this.brake && h > 1 && (i *= h);
this._startAutoScroll(n, i, !0);
},
_calculateAutoScrollTimeByInitalSpeed: function(t) {
return Math.sqrt(Math.sqrt(t / 5));
},
_startAutoScroll: function(t, e, i) {
var n = this._flattenVectorByDirection(t);
this._autoScrolling = !0;
this._autoScrollTargetDelta = n;
this._autoScrollAttenuate = i;
this._autoScrollStartPosition = this.getContentPosition();
this._autoScrollTotalTime = e;
this._autoScrollAccumulatedTime = 0;
this._autoScrollBraking = !1;
this._isScrollEndedWithThresholdEventFired = !1;
this._autoScrollBrakingStartPosition = cc.v2(0, 0);
this._getHowMuchOutOfBoundary().fuzzyEquals(cc.v2(0, 0), 1e-4) || (this._autoScrollCurrentlyOutOfBoundary = !0);
},
_calculateTouchMoveVelocity: function() {
var t = 0;
if ((t = this._touchMoveTimeDeltas.reduce((function(t, e) {
return t + e;
}), t)) <= 0 || t >= .5) return cc.v2(0, 0);
var e = cc.v2(0, 0);
e = this._touchMoveDisplacements.reduce((function(t, e) {
return t.add(e);
}), e);
return cc.v2(e.x * (1 - this.brake) / t, e.y * (1 - this.brake) / t);
},
_flattenVectorByDirection: function(t) {
var e = t;
e.x = this.horizontal ? e.x : 0;
e.y = this.vertical ? e.y : 0;
return e;
},
_moveContent: function(t, e) {
var i = this._flattenVectorByDirection(t), n = this.getContentPosition().add(i);
this.setContentPosition(n);
var r = this._getHowMuchOutOfBoundary();
this._updateScrollBar(r);
this.elastic && e && this._startBounceBackIfNeeded();
},
_getContentLeftBoundary: function() {
return this.getContentPosition().x - this.content.getAnchorPoint().x * this.content.getContentSize().width;
},
_getContentRightBoundary: function() {
var t = this.content.getContentSize();
return this._getContentLeftBoundary() + t.width;
},
_getContentTopBoundary: function() {
var t = this.content.getContentSize();
return this._getContentBottomBoundary() + t.height;
},
_getContentBottomBoundary: function() {
return this.getContentPosition().y - this.content.getAnchorPoint().y * this.content.getContentSize().height;
},
_getHowMuchOutOfBoundary: function(t) {
if ((t = t || cc.v2(0, 0)).fuzzyEquals(cc.v2(0, 0), 1e-4) && !this._outOfBoundaryAmountDirty) return this._outOfBoundaryAmount;
var e = cc.v2(0, 0);
this._getContentLeftBoundary() + t.x > this._leftBoundary ? e.x = this._leftBoundary - (this._getContentLeftBoundary() + t.x) : this._getContentRightBoundary() + t.x < this._rightBoundary && (e.x = this._rightBoundary - (this._getContentRightBoundary() + t.x));
this._getContentTopBoundary() + t.y < this._topBoundary ? e.y = this._topBoundary - (this._getContentTopBoundary() + t.y) : this._getContentBottomBoundary() + t.y > this._bottomBoundary && (e.y = this._bottomBoundary - (this._getContentBottomBoundary() + t.y));
if (t.fuzzyEquals(cc.v2(0, 0), 1e-4)) {
this._outOfBoundaryAmount = e;
this._outOfBoundaryAmountDirty = !1;
}
return this._clampDelta(e);
},
_updateScrollBarState: function() {
if (this.content) {
var t = this.content.getContentSize(), e = this._view.getContentSize();
this.verticalScrollBar && (t.height < e.height ? this.verticalScrollBar.hide() : this.verticalScrollBar.show());
this.horizontalScrollBar && (t.width < e.width ? this.horizontalScrollBar.hide() : this.horizontalScrollBar.show());
}
},
_updateScrollBar: function(t) {
this.horizontalScrollBar && this.horizontalScrollBar._onScroll(t);
this.verticalScrollBar && this.verticalScrollBar._onScroll(t);
},
_onScrollBarTouchBegan: function() {
this.horizontalScrollBar && this.horizontalScrollBar._onTouchBegan();
this.verticalScrollBar && this.verticalScrollBar._onTouchBegan();
},
_onScrollBarTouchEnded: function() {
this.horizontalScrollBar && this.horizontalScrollBar._onTouchEnded();
this.verticalScrollBar && this.verticalScrollBar._onTouchEnded();
},
_dispatchEvent: function(t) {
if ("scroll-ended" === t) this._scrollEventEmitMask = 0; else if ("scroll-to-top" === t || "scroll-to-bottom" === t || "scroll-to-left" === t || "scroll-to-right" === t) {
var e = 1 << o[t];
if (this._scrollEventEmitMask & e) return;
this._scrollEventEmitMask |= e;
}
cc.Component.EventHandler.emitEvents(this.scrollEvents, this, o[t]);
this.node.emit(t, this);
},
_adjustContentOutOfBoundary: function() {
this._outOfBoundaryAmountDirty = !0;
if (this._isOutOfBoundary()) {
var t = this._getHowMuchOutOfBoundary(cc.v2(0, 0)), e = this.getContentPosition().add(t);
if (this.content) {
this.content.setPosition(e);
this._updateScrollBar(0);
}
}
},
start: function() {
this._calculateBoundary();
this.content && cc.director.once(cc.Director.EVENT_BEFORE_DRAW, this._adjustContentOutOfBoundary, this);
},
_hideScrollbar: function() {
this.horizontalScrollBar && this.horizontalScrollBar.hide();
this.verticalScrollBar && this.verticalScrollBar.hide();
},
onDisable: function() {
this._unregisterEvent();
if (this.content) {
this.content.off(i.SIZE_CHANGED, this._calculateBoundary, this);
this.content.off(i.SCALE_CHANGED, this._calculateBoundary, this);
if (this._view) {
this._view.off(i.POSITION_CHANGED, this._calculateBoundary, this);
this._view.off(i.SCALE_CHANGED, this._calculateBoundary, this);
this._view.off(i.SIZE_CHANGED, this._calculateBoundary, this);
}
}
this._hideScrollbar();
this.stopAutoScroll();
},
onEnable: function() {
this._registerEvent();
if (this.content) {
this.content.on(i.SIZE_CHANGED, this._calculateBoundary, this);
this.content.on(i.SCALE_CHANGED, this._calculateBoundary, this);
if (this._view) {
this._view.on(i.POSITION_CHANGED, this._calculateBoundary, this);
this._view.on(i.SCALE_CHANGED, this._calculateBoundary, this);
this._view.on(i.SIZE_CHANGED, this._calculateBoundary, this);
}
}
this._updateScrollBarState();
},
update: function(t) {
this._autoScrolling && this._processAutoScrolling(t);
}
});
cc.ScrollView = e.exports = c;
}), {
"../CCNode": 25,
"./CCViewGroup": 108
} ],
105: [ (function(t, e) {
"use strict";
var i = t("../utils/misc"), n = t("./CCComponent"), r = cc.Enum({
Horizontal: 0,
Vertical: 1
}), s = cc.Class({
name: "cc.Slider",
extends: n,
editor: !1,
ctor: function() {
this._offset = cc.v2();
this._touchHandle = !1;
this._dragging = !1;
},
properties: {
handle: {
default: null,
type: cc.Button,
tooltip: !1,
notify: function() {}
},
direction: {
default: r.Horizontal,
type: r,
tooltip: !1
},
progress: {
default: .5,
type: cc.Float,
range: [ 0, 1, .1 ],
slide: !0,
tooltip: !1,
notify: function() {
this._updateHandlePosition();
}
},
slideEvents: {
default: [],
type: cc.Component.EventHandler,
tooltip: !1
}
},
statics: {
Direction: r
},
__preload: function() {
this._updateHandlePosition();
},
onEnable: function() {
this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this);
if (this.handle && this.handle.isValid) {
this.handle.node.on(cc.Node.EventType.TOUCH_START, this._onHandleDragStart, this);
this.handle.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
this.handle.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
}
},
onDisable: function() {
this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this);
if (this.handle && this.handle.isValid) {
this.handle.node.off(cc.Node.EventType.TOUCH_START, this._onHandleDragStart, this);
this.handle.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
this.handle.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
}
},
_onHandleDragStart: function(t) {
this._dragging = !0;
this._touchHandle = !0;
this._offset = this.handle.node.convertToNodeSpaceAR(t.touch.getLocation());
t.stopPropagation();
},
_onTouchBegan: function(t) {
if (this.handle) {
this._dragging = !0;
this._touchHandle || this._handleSliderLogic(t.touch);
t.stopPropagation();
}
},
_onTouchMoved: function(t) {
if (this._dragging) {
this._handleSliderLogic(t.touch);
t.stopPropagation();
}
},
_onTouchEnded: function(t) {
this._dragging = !1;
this._touchHandle = !1;
this._offset = cc.v2();
t.stopPropagation();
},
_onTouchCancelled: function(t) {
this._dragging = !1;
t.stopPropagation();
},
_handleSliderLogic: function(t) {
this._updateProgress(t);
this._emitSlideEvent();
},
_emitSlideEvent: function() {
cc.Component.EventHandler.emitEvents(this.slideEvents, this);
this.node.emit("slide", this);
},
_updateProgress: function(t) {
if (this.handle) {
var e = this.node, n = e.convertToNodeSpaceAR(t.getLocation());
this.direction === r.Horizontal ? this.progress = i.clamp01((n.x - this._offset.x + e.anchorX * e.width) / e.width) : this.progress = i.clamp01((n.y - this._offset.y + e.anchorY * e.height) / e.height);
}
},
_updateHandlePosition: function() {
if (this.handle) {
var t;
t = this.direction === r.Horizontal ? cc.v2(-this.node.width * this.node.anchorX + this.progress * this.node.width, 0) : cc.v2(0, -this.node.height * this.node.anchorY + this.progress * this.node.height);
var e = this.node.convertToWorldSpaceAR(t);
this.handle.node.position = this.handle.node.parent.convertToNodeSpaceAR(e);
}
}
});
cc.Slider = e.exports = s;
}), {
"../utils/misc": 196,
"./CCComponent": 94
} ],
106: [ (function(t, e) {
"use strict";
var i = t("../utils/misc"), n = (t("../CCNode").EventType, t("./CCRenderComponent")), r = t("../utils/blend-func"), s = cc.Enum({
SIMPLE: 0,
SLICED: 1,
TILED: 2,
FILLED: 3,
MESH: 4
}), a = cc.Enum({
HORIZONTAL: 0,
VERTICAL: 1,
RADIAL: 2
}), o = cc.Enum({
CUSTOM: 0,
TRIMMED: 1,
RAW: 2
}), c = cc.Enum({
NORMAL: 0,
GRAY: 1
}), u = cc.Class({
name: "cc.Sprite",
extends: n,
mixins: [ r ],
editor: !1,
properties: {
_spriteFrame: {
default: null,
type: cc.SpriteFrame
},
_type: s.SIMPLE,
_sizeMode: o.TRIMMED,
_fillType: 0,
_fillCenter: cc.v2(0, 0),
_fillStart: 0,
_fillRange: 0,
_isTrimmedMode: !0,
_atlas: {
default: null,
type: cc.SpriteAtlas,
tooltip: !1,
editorOnly: !0,
visible: !0,
animatable: !1
},
spriteFrame: {
get: function() {
return this._spriteFrame;
},
set: function(t) {
var e = this._spriteFrame;
if (e !== t) {
this._spriteFrame = t;
this._applySpriteFrame(e);
}
},
type: cc.SpriteFrame
},
type: {
get: function() {
return this._type;
},
set: function(t) {
if (this._type !== t) {
this._type = t;
this.setVertsDirty();
this._resetAssembler();
}
},
type: s,
animatable: !1,
tooltip: !1
},
fillType: {
get: function() {
return this._fillType;
},
set: function(t) {
if (t !== this._fillType) {
this._fillType = t;
this.setVertsDirty();
this._resetAssembler();
}
},
type: a,
tooltip: !1
},
fillCenter: {
get: function() {
return this._fillCenter;
},
set: function(t) {
this._fillCenter.x = t.x;
this._fillCenter.y = t.y;
this._type === s.FILLED && this.setVertsDirty();
},
tooltip: !1
},
fillStart: {
get: function() {
return this._fillStart;
},
set: function(t) {
this._fillStart = i.clampf(t, -1, 1);
this._type === s.FILLED && this.setVertsDirty();
},
tooltip: !1
},
fillRange: {
get: function() {
return this._fillRange;
},
set: function(t) {
this._fillRange = i.clampf(t, -1, 1);
this._type === s.FILLED && this.setVertsDirty();
},
tooltip: !1
},
trim: {
get: function() {
return this._isTrimmedMode;
},
set: function(t) {
if (this._isTrimmedMode !== t) {
this._isTrimmedMode = t;
this._type !== s.SIMPLE && this._type !== s.MESH || this.setVertsDirty();
}
},
animatable: !1,
tooltip: !1
},
sizeMode: {
get: function() {
return this._sizeMode;
},
set: function(t) {
this._sizeMode = t;
t !== o.CUSTOM && this._applySpriteSize();
},
animatable: !1,
type: o,
tooltip: !1
}
},
statics: {
FillType: a,
Type: s,
SizeMode: o,
State: c
},
setVisible: function(t) {
this.enabled = t;
},
setState: function() {},
getState: function() {},
__preload: function() {
this._super();
this._applySpriteFrame();
},
onEnable: function() {
this._super();
this._spriteFrame && this._spriteFrame.ensureLoadTexture();
this.node.on(cc.Node.EventType.SIZE_CHANGED, this.setVertsDirty, this);
this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this.setVertsDirty, this);
},
onDisable: function() {
this._super();
this.node.off(cc.Node.EventType.SIZE_CHANGED, this.setVertsDirty, this);
this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this.setVertsDirty, this);
},
_updateMaterial: function() {
var t = this._spriteFrame && this._spriteFrame.getTexture(), e = this.getMaterial(0);
if (e) {
void 0 !== e.getDefine("USE_TEXTURE") && e.define("USE_TEXTURE", !0);
e.setProperty("texture", t);
}
r.prototype._updateMaterial.call(this);
},
_applyAtlas: !1,
_validateRender: function() {
var t = this._spriteFrame;
this._materials[0] && t && t.textureLoaded() || this.disableRender();
},
_applySpriteSize: function() {
if (this._spriteFrame && this.isValid) {
if (o.RAW === this._sizeMode) {
var t = this._spriteFrame._originalSize;
this.node.setContentSize(t);
} else if (o.TRIMMED === this._sizeMode) {
var e = this._spriteFrame._rect;
this.node.setContentSize(e.width, e.height);
}
this.setVertsDirty();
}
},
_applySpriteFrame: function(t) {
var e = t && t.getTexture();
e && !e.loaded && t.off("load", this._applySpriteSize, this);
this._updateMaterial();
var i = this._spriteFrame;
if (i) {
var n = i.getTexture();
if (n && n.loaded) this._applySpriteSize(); else {
this.disableRender();
i.once("load", this._applySpriteSize, this);
}
} else this.disableRender();
}
});
cc.Sprite = e.exports = u;
}), {
"../CCNode": 25,
"../utils/blend-func": 191,
"../utils/misc": 196,
"./CCRenderComponent": 102
} ],
107: [ (function(t, e) {
"use strict";
var i = cc.Enum({
NONE: 0,
CHECKBOX: 1,
TEXT_ATLAS: 2,
SLIDER_BAR: 3,
LIST_VIEW: 4,
PAGE_VIEW: 5
}), n = cc.Enum({
VERTICAL: 0,
HORIZONTAL: 1
}), r = cc.Enum({
TOP: 0,
CENTER: 1,
BOTTOM: 2
}), s = cc.Enum({
LEFT: 0,
CENTER: 1,
RIGHT: 2
}), a = cc.Class({
name: "cc.StudioComponent",
extends: cc.Component,
editor: !1,
properties: !1,
statics: {
ComponentType: i,
ListDirection: n,
VerticalAlign: r,
HorizontalAlign: s
}
});
cc.StudioComponent = e.exports = a;
var o = cc.Class({
name: "cc.StudioWidget",
extends: cc.Widget,
editor: !1,
_validateTargetInDEV: function() {}
});
cc.StudioWidget = e.exports = o;
}), {} ],
108: [ (function(t, e) {
"use strict";
var i = cc.Class({
name: "cc.ViewGroup",
extends: t("./CCComponent")
});
cc.ViewGroup = e.exports = i;
}), {
"./CCComponent": 94
} ],
109: [ (function(t, e) {
"use strict";
var i = t("../base-ui/CCWidgetManager"), n = i.AlignMode, r = i._AlignFlags, s = r.TOP, a = r.MID, o = r.BOT, c = r.LEFT, u = r.CENTER, l = r.RIGHT, h = s | o, f = c | l, _ = cc.Class({
name: "cc.Widget",
extends: t("./CCComponent"),
editor: !1,
properties: {
target: {
get: function() {
return this._target;
},
set: function(t) {
this._target = t;
},
type: cc.Node,
tooltip: !1
},
isAlignTop: {
get: function() {
return (this._alignFlags & s) > 0;
},
set: function(t) {
this._setAlign(s, t);
},
animatable: !1,
tooltip: !1
},
isAlignVerticalCenter: {
get: function() {
return (this._alignFlags & a) > 0;
},
set: function(t) {
if (t) {
this.isAlignTop = !1;
this.isAlignBottom = !1;
this._alignFlags |= a;
} else this._alignFlags &= ~a;
},
animatable: !1,
tooltip: !1
},
isAlignBottom: {
get: function() {
return (this._alignFlags & o) > 0;
},
set: function(t) {
this._setAlign(o, t);
},
animatable: !1,
tooltip: !1
},
isAlignLeft: {
get: function() {
return (this._alignFlags & c) > 0;
},
set: function(t) {
this._setAlign(c, t);
},
animatable: !1,
tooltip: !1
},
isAlignHorizontalCenter: {
get: function() {
return (this._alignFlags & u) > 0;
},
set: function(t) {
if (t) {
this.isAlignLeft = !1;
this.isAlignRight = !1;
this._alignFlags |= u;
} else this._alignFlags &= ~u;
},
animatable: !1,
tooltip: !1
},
isAlignRight: {
get: function() {
return (this._alignFlags & l) > 0;
},
set: function(t) {
this._setAlign(l, t);
},
animatable: !1,
tooltip: !1
},
isStretchWidth: {
get: function() {
return (this._alignFlags & f) === f;
},
visible: !1
},
isStretchHeight: {
get: function() {
return (this._alignFlags & h) === h;
},
visible: !1
},
top: {
get: function() {
return this._top;
},
set: function(t) {
this._top = t;
},
tooltip: !1
},
bottom: {
get: function() {
return this._bottom;
},
set: function(t) {
this._bottom = t;
},
tooltip: !1
},
left: {
get: function() {
return this._left;
},
set: function(t) {
this._left = t;
},
tooltip: !1
},
right: {
get: function() {
return this._right;
},
set: function(t) {
this._right = t;
},
tooltip: !1
},
horizontalCenter: {
get: function() {
return this._horizontalCenter;
},
set: function(t) {
this._horizontalCenter = t;
},
tooltip: !1
},
verticalCenter: {
get: function() {
return this._verticalCenter;
},
set: function(t) {
this._verticalCenter = t;
},
tooltip: !1
},
isAbsoluteHorizontalCenter: {
get: function() {
return this._isAbsHorizontalCenter;
},
set: function(t) {
this._isAbsHorizontalCenter = t;
},
animatable: !1
},
isAbsoluteVerticalCenter: {
get: function() {
return this._isAbsVerticalCenter;
},
set: function(t) {
this._isAbsVerticalCenter = t;
},
animatable: !1
},
isAbsoluteTop: {
get: function() {
return this._isAbsTop;
},
set: function(t) {
this._isAbsTop = t;
},
animatable: !1
},
isAbsoluteBottom: {
get: function() {
return this._isAbsBottom;
},
set: function(t) {
this._isAbsBottom = t;
},
animatable: !1
},
isAbsoluteLeft: {
get: function() {
return this._isAbsLeft;
},
set: function(t) {
this._isAbsLeft = t;
},
animatable: !1
},
isAbsoluteRight: {
get: function() {
return this._isAbsRight;
},
set: function(t) {
this._isAbsRight = t;
},
animatable: !1
},
alignMode: {
default: n.ON_WINDOW_RESIZE,
type: n,
tooltip: !1
},
_wasAlignOnce: {
default: void 0,
formerlySerializedAs: "isAlignOnce"
},
_target: null,
_alignFlags: 0,
_left: 0,
_right: 0,
_top: 0,
_bottom: 0,
_verticalCenter: 0,
_horizontalCenter: 0,
_isAbsLeft: !0,
_isAbsRight: !0,
_isAbsTop: !0,
_isAbsBottom: !0,
_isAbsHorizontalCenter: !0,
_isAbsVerticalCenter: !0,
_originalWidth: 0,
_originalHeight: 0
},
statics: {
AlignMode: n
},
onLoad: function() {
if (void 0 !== this._wasAlignOnce) {
this.alignMode = this._wasAlignOnce ? n.ONCE : n.ALWAYS;
this._wasAlignOnce = void 0;
}
},
onEnable: function() {
i.add(this);
},
onDisable: function() {
i.remove(this);
},
_validateTargetInDEV: !1,
_setAlign: function(t, e) {
if (e !== (this._alignFlags & t) > 0) {
var i = (t & f) > 0;
if (e) {
this._alignFlags |= t;
if (i) {
this.isAlignHorizontalCenter = !1;
this.isStretchWidth && (this._originalWidth = this.node.width);
} else {
this.isAlignVerticalCenter = !1;
this.isStretchHeight && (this._originalHeight = this.node.height);
}
} else {
i ? this.isStretchWidth && (this.node.width = this._originalWidth) : this.isStretchHeight && (this.node.height = this._originalHeight);
this._alignFlags &= ~t;
}
}
},
updateAlignment: function() {
i.updateAlignment(this.node);
}
});
Object.defineProperty(_.prototype, "isAlignOnce", {
get: function() {
return this.alignMode === n.ONCE;
},
set: function(t) {
this.alignMode = t ? n.ONCE : n.ALWAYS;
}
});
cc.Widget = e.exports = _;
}), {
"../base-ui/CCWidgetManager": 85,
"./CCComponent": 94
} ],
110: [ (function(t, e) {
"use strict";
t("./CCComponent");
t("./CCComponentEventHandler");
t("./missing-script");
var i = t("./SubContextView");
if (!i) {
i = cc.Class({
name: "cc.SubContextView",
extends: cc.Component
});
cc.SubContextView = cc.WXSubContextView = cc.SwanSubContextView = i;
}
var n = [ t("./CCSprite"), t("./CCWidget"), t("./CCCanvas"), t("./CCAudioSource"), t("./CCAnimation"), t("./CCButton"), t("./CCLabel"), t("./CCProgressBar"), t("./CCMask"), t("./CCScrollBar"), t("./CCScrollView"), t("./CCPageViewIndicator"), t("./CCPageView"), t("./CCSlider"), t("./CCLayout"), t("./editbox/CCEditBox"), t("./CCLabelOutline"), t("./CCLabelShadow"), t("./CCRichText"), t("./CCToggleContainer"), t("./CCToggleGroup"), t("./CCToggle"), t("./CCBlockInputEvents"), t("./CCMotionStreak"), t("./CCSafeArea"), i ];
e.exports = n;
}), {
"./CCAnimation": 89,
"./CCAudioSource": 90,
"./CCBlockInputEvents": 91,
"./CCButton": 92,
"./CCCanvas": 93,
"./CCComponent": 94,
"./CCComponentEventHandler": 95,
"./CCLabel": 96,
"./CCLabelOutline": 97,
"./CCLabelShadow": 98,
"./CCLayout": 99,
"./CCMask": 100,
"./CCMotionStreak": void 0,
"./CCPageView": void 0,
"./CCPageViewIndicator": void 0,
"./CCProgressBar": 101,
"./CCRichText": void 0,
"./CCSafeArea": void 0,
"./CCScrollBar": 103,
"./CCScrollView": 104,
"./CCSlider": 105,
"./CCSprite": 106,
"./CCToggle": void 0,
"./CCToggleContainer": void 0,
"./CCToggleGroup": void 0,
"./CCWidget": 109,
"./SubContextView": void 0,
"./editbox/CCEditBox": void 0,
"./missing-script": 111
} ],
111: [ (function(t, e) {
"use strict";
var i = cc.js, n = cc.Class({
name: "cc.MissingScript",
extends: cc.Component,
editor: {
inspector: "packages://inspector/inspectors/comps/missing-script.js"
},
properties: {
compiled: {
default: !1,
serializable: !1
},
_$erialized: {
default: null,
visible: !1,
editorOnly: !0
}
},
ctor: !1,
statics: {
safeFindClass: function(t) {
var e = i._getClassById(t);
if (e) return e;
cc.deserialize.reportMissingClass(t);
return n;
}
},
onLoad: function() {
cc.warnID(4600, this.node.name);
}
});
cc._MissingScript = e.exports = n;
}), {} ],
112: [ (function(t, e) {
"use strict";
var i = cc.js;
t("../event/event");
var n = function(t, e) {
cc.Event.call(this, cc.Event.MOUSE, e);
this._eventType = t;
this._button = 0;
this._x = 0;
this._y = 0;
this._prevX = 0;
this._prevY = 0;
this._scrollX = 0;
this._scrollY = 0;
};
i.extend(n, cc.Event);
var r = n.prototype;
r.setScrollData = function(t, e) {
this._scrollX = t;
this._scrollY = e;
};
r.getScrollX = function() {
return this._scrollX;
};
r.getScrollY = function() {
return this._scrollY;
};
r.setLocation = function(t, e) {
this._x = t;
this._y = e;
};
r.getLocation = function() {
return cc.v2(this._x, this._y);
};
r.getLocationInView = function() {
return cc.v2(this._x, cc.view._designResolutionSize.height - this._y);
};
r._setPrevCursor = function(t, e) {
this._prevX = t;
this._prevY = e;
};
r.getPreviousLocation = function() {
return cc.v2(this._prevX, this._prevY);
};
r.getDelta = function() {
return cc.v2(this._x - this._prevX, this._y - this._prevY);
};
r.getDeltaX = function() {
return this._x - this._prevX;
};
r.getDeltaY = function() {
return this._y - this._prevY;
};
r.setButton = function(t) {
this._button = t;
};
r.getButton = function() {
return this._button;
};
r.getLocationX = function() {
return this._x;
};
r.getLocationY = function() {
return this._y;
};
n.NONE = 0;
n.DOWN = 1;
n.UP = 2;
n.MOVE = 3;
n.SCROLL = 4;
n.BUTTON_LEFT = 0;
n.BUTTON_RIGHT = 2;
n.BUTTON_MIDDLE = 1;
n.BUTTON_4 = 3;
n.BUTTON_5 = 4;
n.BUTTON_6 = 5;
n.BUTTON_7 = 6;
n.BUTTON_8 = 7;
var s = function(t, e) {
cc.Event.call(this, cc.Event.TOUCH, e);
this._eventCode = 0;
this._touches = t || [];
this.touch = null;
this.currentTouch = null;
};
i.extend(s, cc.Event);
(r = s.prototype).getEventCode = function() {
return this._eventCode;
};
r.getTouches = function() {
return this._touches;
};
r._setEventCode = function(t) {
this._eventCode = t;
};
r._setTouches = function(t) {
this._touches = t;
};
r.setLocation = function(t, e) {
this.touch && this.touch.setTouchInfo(this.touch.getID(), t, e);
};
r.getLocation = function() {
return this.touch ? this.touch.getLocation() : cc.v2();
};
r.getLocationInView = function() {
return this.touch ? this.touch.getLocationInView() : cc.v2();
};
r.getPreviousLocation = function() {
return this.touch ? this.touch.getPreviousLocation() : cc.v2();
};
r.getStartLocation = function() {
return this.touch ? this.touch.getStartLocation() : cc.v2();
};
r.getID = function() {
return this.touch ? this.touch.getID() : null;
};
r.getDelta = function() {
return this.touch ? this.touch.getDelta() : cc.v2();
};
r.getDeltaX = function() {
return this.touch ? this.touch.getDelta().x : 0;
};
r.getDeltaY = function() {
return this.touch ? this.touch.getDelta().y : 0;
};
r.getLocationX = function() {
return this.touch ? this.touch.getLocationX() : 0;
};
r.getLocationY = function() {
return this.touch ? this.touch.getLocationY() : 0;
};
s.MAX_TOUCHES = 5;
s.BEGAN = 0;
s.MOVED = 1;
s.ENDED = 2;
s.CANCELED = 3;
var a = function(t, e) {
cc.Event.call(this, cc.Event.ACCELERATION, e);
this.acc = t;
};
i.extend(a, cc.Event);
var o = function(t, e, i) {
cc.Event.call(this, cc.Event.KEYBOARD, i);
this.keyCode = t;
this.isPressed = e;
};
i.extend(o, cc.Event);
cc.Event.EventMouse = n;
cc.Event.EventTouch = s;
cc.Event.EventAcceleration = a;
cc.Event.EventKeyboard = o;
e.exports = cc.Event;
}), {
"../event/event": 119
} ],
113: [ (function(t, e) {
"use strict";
var i = t("../platform/js");
cc.EventListener = function(t, e, i) {
this._onEvent = i;
this._type = t || 0;
this._listenerID = e || "";
this._registered = !1;
this._fixedPriority = 0;
this._node = null;
this._target = null;
this._paused = !0;
this._isEnabled = !0;
};
cc.EventListener.prototype = {
constructor: cc.EventListener,
_setPaused: function(t) {
this._paused = t;
},
_isPaused: function() {
return this._paused;
},
_setRegistered: function(t) {
this._registered = t;
},
_isRegistered: function() {
return this._registered;
},
_getType: function() {
return this._type;
},
_getListenerID: function() {
return this._listenerID;
},
_setFixedPriority: function(t) {
this._fixedPriority = t;
},
_getFixedPriority: function() {
return this._fixedPriority;
},
_setSceneGraphPriority: function(t) {
this._target = t;
this._node = t;
},
_getSceneGraphPriority: function() {
return this._node;
},
checkAvailable: function() {
return null !== this._onEvent;
},
clone: function() {
return null;
},
setEnabled: function(t) {
this._isEnabled = t;
},
isEnabled: function() {
return this._isEnabled;
},
retain: function() {},
release: function() {}
};
cc.EventListener.UNKNOWN = 0;
cc.EventListener.TOUCH_ONE_BY_ONE = 1;
cc.EventListener.TOUCH_ALL_AT_ONCE = 2;
cc.EventListener.KEYBOARD = 3;
cc.EventListener.MOUSE = 4;
cc.EventListener.ACCELERATION = 6;
cc.EventListener.CUSTOM = 8;
var n = cc.EventListener.ListenerID = {
MOUSE: "__cc_mouse",
TOUCH_ONE_BY_ONE: "__cc_touch_one_by_one",
TOUCH_ALL_AT_ONCE: "__cc_touch_all_at_once",
KEYBOARD: "__cc_keyboard",
ACCELERATION: "__cc_acceleration"
}, r = function(t, e) {
this._onCustomEvent = e;
cc.EventListener.call(this, cc.EventListener.CUSTOM, t, this._callback);
};
i.extend(r, cc.EventListener);
i.mixin(r.prototype, {
_onCustomEvent: null,
_callback: function(t) {
null !== this._onCustomEvent && this._onCustomEvent(t);
},
checkAvailable: function() {
return cc.EventListener.prototype.checkAvailable.call(this) && null !== this._onCustomEvent;
},
clone: function() {
return new r(this._listenerID, this._onCustomEvent);
}
});
var s = function() {
cc.EventListener.call(this, cc.EventListener.MOUSE, n.MOUSE, this._callback);
};
i.extend(s, cc.EventListener);
i.mixin(s.prototype, {
onMouseDown: null,
onMouseUp: null,
onMouseMove: null,
onMouseScroll: null,
_callback: function(t) {
var e = cc.Event.EventMouse;
switch (t._eventType) {
case e.DOWN:
this.onMouseDown && this.onMouseDown(t);
break;

case e.UP:
this.onMouseUp && this.onMouseUp(t);
break;

case e.MOVE:
this.onMouseMove && this.onMouseMove(t);
break;

case e.SCROLL:
this.onMouseScroll && this.onMouseScroll(t);
}
},
clone: function() {
var t = new s();
t.onMouseDown = this.onMouseDown;
t.onMouseUp = this.onMouseUp;
t.onMouseMove = this.onMouseMove;
t.onMouseScroll = this.onMouseScroll;
return t;
},
checkAvailable: function() {
return !0;
}
});
var a = function() {
cc.EventListener.call(this, cc.EventListener.TOUCH_ONE_BY_ONE, n.TOUCH_ONE_BY_ONE, null);
this._claimedTouches = [];
};
i.extend(a, cc.EventListener);
i.mixin(a.prototype, {
constructor: a,
_claimedTouches: null,
swallowTouches: !1,
onTouchBegan: null,
onTouchMoved: null,
onTouchEnded: null,
onTouchCancelled: null,
setSwallowTouches: function(t) {
this.swallowTouches = t;
},
isSwallowTouches: function() {
return this.swallowTouches;
},
clone: function() {
var t = new a();
t.onTouchBegan = this.onTouchBegan;
t.onTouchMoved = this.onTouchMoved;
t.onTouchEnded = this.onTouchEnded;
t.onTouchCancelled = this.onTouchCancelled;
t.swallowTouches = this.swallowTouches;
return t;
},
checkAvailable: function() {
if (!this.onTouchBegan) {
cc.logID(1801);
return !1;
}
return !0;
}
});
var o = function() {
cc.EventListener.call(this, cc.EventListener.TOUCH_ALL_AT_ONCE, n.TOUCH_ALL_AT_ONCE, null);
};
i.extend(o, cc.EventListener);
i.mixin(o.prototype, {
constructor: o,
onTouchesBegan: null,
onTouchesMoved: null,
onTouchesEnded: null,
onTouchesCancelled: null,
clone: function() {
var t = new o();
t.onTouchesBegan = this.onTouchesBegan;
t.onTouchesMoved = this.onTouchesMoved;
t.onTouchesEnded = this.onTouchesEnded;
t.onTouchesCancelled = this.onTouchesCancelled;
return t;
},
checkAvailable: function() {
if (null === this.onTouchesBegan && null === this.onTouchesMoved && null === this.onTouchesEnded && null === this.onTouchesCancelled) {
cc.logID(1802);
return !1;
}
return !0;
}
});
var c = function(t) {
this._onAccelerationEvent = t;
cc.EventListener.call(this, cc.EventListener.ACCELERATION, n.ACCELERATION, this._callback);
};
i.extend(c, cc.EventListener);
i.mixin(c.prototype, {
constructor: c,
_onAccelerationEvent: null,
_callback: function(t) {
this._onAccelerationEvent(t.acc, t);
},
checkAvailable: function() {
cc.assertID(this._onAccelerationEvent, 1803);
return !0;
},
clone: function() {
return new c(this._onAccelerationEvent);
}
});
var u = function() {
cc.EventListener.call(this, cc.EventListener.KEYBOARD, n.KEYBOARD, this._callback);
};
i.extend(u, cc.EventListener);
i.mixin(u.prototype, {
constructor: u,
onKeyPressed: null,
onKeyReleased: null,
_callback: function(t) {
t.isPressed ? this.onKeyPressed && this.onKeyPressed(t.keyCode, t) : this.onKeyReleased && this.onKeyReleased(t.keyCode, t);
},
clone: function() {
var t = new u();
t.onKeyPressed = this.onKeyPressed;
t.onKeyReleased = this.onKeyReleased;
return t;
},
checkAvailable: function() {
if (null === this.onKeyPressed && null === this.onKeyReleased) {
cc.logID(1800);
return !1;
}
return !0;
}
});
cc.EventListener.create = function(t) {
cc.assertID(t && t.event, 1900);
var e = t.event;
delete t.event;
var i = null;
if (e === cc.EventListener.TOUCH_ONE_BY_ONE) i = new a(); else if (e === cc.EventListener.TOUCH_ALL_AT_ONCE) i = new o(); else if (e === cc.EventListener.MOUSE) i = new s(); else if (e === cc.EventListener.CUSTOM) {
i = new r(t.eventName, t.callback);
delete t.eventName;
delete t.callback;
} else if (e === cc.EventListener.KEYBOARD) i = new u(); else if (e === cc.EventListener.ACCELERATION) {
i = new c(t.callback);
delete t.callback;
}
for (var n in t) i[n] = t[n];
return i;
};
e.exports = cc.EventListener;
}), {
"../platform/js": 149
} ],
114: [ (function(t, e) {
"use strict";
var i = t("../platform/js");
t("./CCEventListener");
var n = cc.EventListener.ListenerID, r = function() {
this._fixedListeners = [];
this._sceneGraphListeners = [];
this.gt0Index = 0;
};
r.prototype = {
constructor: r,
size: function() {
return this._fixedListeners.length + this._sceneGraphListeners.length;
},
empty: function() {
return 0 === this._fixedListeners.length && 0 === this._sceneGraphListeners.length;
},
push: function(t) {
0 === t._getFixedPriority() ? this._sceneGraphListeners.push(t) : this._fixedListeners.push(t);
},
clearSceneGraphListeners: function() {
this._sceneGraphListeners.length = 0;
},
clearFixedListeners: function() {
this._fixedListeners.length = 0;
},
clear: function() {
this._sceneGraphListeners.length = 0;
this._fixedListeners.length = 0;
},
getFixedPriorityListeners: function() {
return this._fixedListeners;
},
getSceneGraphPriorityListeners: function() {
return this._sceneGraphListeners;
}
};
var s = function(t) {
var e = cc.Event, i = t.type;
if (i === e.ACCELERATION) return n.ACCELERATION;
if (i === e.KEYBOARD) return n.KEYBOARD;
if (i.startsWith(e.MOUSE)) return n.MOUSE;
i.startsWith(e.TOUCH) && cc.logID(2e3);
return "";
}, a = {
DIRTY_NONE: 0,
DIRTY_FIXED_PRIORITY: 1,
DIRTY_SCENE_GRAPH_PRIORITY: 2,
DIRTY_ALL: 3,
_listenersMap: {},
_priorityDirtyFlagMap: {},
_nodeListenersMap: {},
_toAddedListeners: [],
_toRemovedListeners: [],
_dirtyListeners: {},
_inDispatch: 0,
_isEnabled: !1,
_currentTouch: null,
_currentTouchListener: null,
_internalCustomListenerIDs: [],
_setDirtyForNode: function(t) {
var e = this._nodeListenersMap[t._id];
if (void 0 !== e) for (var i = 0, n = e.length; i < n; i++) {
var r = e[i]._getListenerID();
null == this._dirtyListeners[r] && (this._dirtyListeners[r] = !0);
}
if (t.childrenCount > 0) for (var s = t._children, a = 0, o = s.length; a < o; a++) this._setDirtyForNode(s[a]);
},
pauseTarget: function(t, e) {
if (t instanceof cc._BaseNode) {
var i, n, r = this._nodeListenersMap[t._id];
if (r) for (i = 0, n = r.length; i < n; i++) r[i]._setPaused(!0);
if (!0 === e) {
var s = t._children;
for (i = 0, n = s ? s.length : 0; i < n; i++) this.pauseTarget(s[i], !0);
}
} else cc.warnID(3506);
},
resumeTarget: function(t, e) {
if (t instanceof cc._BaseNode) {
var i, n, r = this._nodeListenersMap[t._id];
if (r) for (i = 0, n = r.length; i < n; i++) r[i]._setPaused(!1);
this._setDirtyForNode(t);
if (!0 === e) {
var s = t._children;
for (i = 0, n = s ? s.length : 0; i < n; i++) this.resumeTarget(s[i], !0);
}
} else cc.warnID(3506);
},
_addListener: function(t) {
0 === this._inDispatch ? this._forceAddEventListener(t) : this._toAddedListeners.push(t);
},
_forceAddEventListener: function(t) {
var e = t._getListenerID(), i = this._listenersMap[e];
if (!i) {
i = new r();
this._listenersMap[e] = i;
}
i.push(t);
if (0 === t._getFixedPriority()) {
this._setDirty(e, this.DIRTY_SCENE_GRAPH_PRIORITY);
var n = t._getSceneGraphPriority();
null === n && cc.logID(3507);
this._associateNodeAndEventListener(n, t);
n.activeInHierarchy && this.resumeTarget(n);
} else this._setDirty(e, this.DIRTY_FIXED_PRIORITY);
},
_getListeners: function(t) {
return this._listenersMap[t];
},
_updateDirtyFlagForSceneGraph: function() {
var t = this._dirtyListeners;
for (var e in t) this._setDirty(e, this.DIRTY_SCENE_GRAPH_PRIORITY);
this._dirtyListeners = {};
},
_removeAllListenersInVector: function(t) {
if (t) for (var e, i = t.length - 1; i >= 0; i--) {
(e = t[i])._setRegistered(!1);
if (null != e._getSceneGraphPriority()) {
this._dissociateNodeAndEventListener(e._getSceneGraphPriority(), e);
e._setSceneGraphPriority(null);
}
0 === this._inDispatch && cc.js.array.removeAt(t, i);
}
},
_removeListenersForListenerID: function(t) {
var e, i = this._listenersMap[t];
if (i) {
var n = i.getFixedPriorityListeners(), r = i.getSceneGraphPriorityListeners();
this._removeAllListenersInVector(r);
this._removeAllListenersInVector(n);
delete this._priorityDirtyFlagMap[t];
if (!this._inDispatch) {
i.clear();
delete this._listenersMap[t];
}
}
var s, a = this._toAddedListeners;
for (e = a.length - 1; e >= 0; e--) (s = a[e]) && s._getListenerID() === t && cc.js.array.removeAt(a, e);
},
_sortEventListeners: function(t) {
var e = this.DIRTY_NONE, i = this._priorityDirtyFlagMap;
i[t] && (e = i[t]);
if (e !== this.DIRTY_NONE) {
i[t] = this.DIRTY_NONE;
e & this.DIRTY_FIXED_PRIORITY && this._sortListenersOfFixedPriority(t);
e & this.DIRTY_SCENE_GRAPH_PRIORITY && cc.director.getScene() && this._sortListenersOfSceneGraphPriority(t);
}
},
_sortListenersOfSceneGraphPriority: function(t) {
var e = this._getListeners(t);
if (e) {
var i = e.getSceneGraphPriorityListeners();
i && 0 !== i.length && e.getSceneGraphPriorityListeners().sort(this._sortEventListenersOfSceneGraphPriorityDes);
}
},
_sortEventListenersOfSceneGraphPriorityDes: function(t, e) {
var i = t._getSceneGraphPriority(), n = e._getSceneGraphPriority();
if (!(e && n && n._activeInHierarchy && null !== n._parent)) return -1;
if (!t || !i || !i._activeInHierarchy || null === i._parent) return 1;
for (var r = i, s = n, a = !1; r._parent._id !== s._parent._id; ) {
r = null === r._parent._parent ? (a = !0) && n : r._parent;
s = null === s._parent._parent ? (a = !0) && i : s._parent;
}
if (r._id === s._id) {
if (r._id === n._id) return -1;
if (r._id === i._id) return 1;
}
return a ? r._localZOrder - s._localZOrder : s._localZOrder - r._localZOrder;
},
_sortListenersOfFixedPriority: function(t) {
var e = this._listenersMap[t];
if (e) {
var i = e.getFixedPriorityListeners();
if (i && 0 !== i.length) {
i.sort(this._sortListenersOfFixedPriorityAsc);
for (var n = 0, r = i.length; n < r && !(i[n]._getFixedPriority() >= 0); ) ++n;
e.gt0Index = n;
}
}
},
_sortListenersOfFixedPriorityAsc: function(t, e) {
return t._getFixedPriority() - e._getFixedPriority();
},
_onUpdateListeners: function(t) {
var e, i, n, r = t.getFixedPriorityListeners(), s = t.getSceneGraphPriorityListeners(), a = this._toRemovedListeners;
if (s) for (e = s.length - 1; e >= 0; e--) if (!(i = s[e])._isRegistered()) {
cc.js.array.removeAt(s, e);
-1 !== (n = a.indexOf(i)) && a.splice(n, 1);
}
if (r) for (e = r.length - 1; e >= 0; e--) if (!(i = r[e])._isRegistered()) {
cc.js.array.removeAt(r, e);
-1 !== (n = a.indexOf(i)) && a.splice(n, 1);
}
s && 0 === s.length && t.clearSceneGraphListeners();
r && 0 === r.length && t.clearFixedListeners();
},
frameUpdateListeners: function() {
var t = this._listenersMap, e = this._priorityDirtyFlagMap;
for (var i in t) if (t[i].empty()) {
delete e[i];
delete t[i];
}
var n = this._toAddedListeners;
if (0 !== n.length) {
for (var r = 0, s = n.length; r < s; r++) this._forceAddEventListener(n[r]);
n.length = 0;
}
0 !== this._toRemovedListeners.length && this._cleanToRemovedListeners();
},
_updateTouchListeners: function() {
var t = this._inDispatch;
cc.assertID(t > 0, 3508);
if (!(t > 1)) {
var e;
(e = this._listenersMap[n.TOUCH_ONE_BY_ONE]) && this._onUpdateListeners(e);
(e = this._listenersMap[n.TOUCH_ALL_AT_ONCE]) && this._onUpdateListeners(e);
cc.assertID(1 === t, 3509);
var i = this._toAddedListeners;
if (0 !== i.length) {
for (var r = 0, s = i.length; r < s; r++) this._forceAddEventListener(i[r]);
this._toAddedListeners.length = 0;
}
0 !== this._toRemovedListeners.length && this._cleanToRemovedListeners();
}
},
_cleanToRemovedListeners: function() {
for (var t = this._toRemovedListeners, e = 0; e < t.length; e++) {
var i = t[e], n = this._listenersMap[i._getListenerID()];
if (n) {
var r, s = n.getFixedPriorityListeners(), a = n.getSceneGraphPriorityListeners();
a && -1 !== (r = a.indexOf(i)) && a.splice(r, 1);
s && -1 !== (r = s.indexOf(i)) && s.splice(r, 1);
}
}
t.length = 0;
},
_onTouchEventCallback: function(t, e) {
if (!t._isRegistered()) return !1;
var i = e.event, n = i.currentTouch;
i.currentTarget = t._node;
var r, s = !1, o = i.getEventCode(), c = cc.Event.EventTouch;
if (o === c.BEGAN) {
if (!cc.macro.ENABLE_MULTI_TOUCH && a._currentTouch) {
var u = a._currentTouchListener._node;
if (u && u.activeInHierarchy) return !1;
}
if (t.onTouchBegan && (s = t.onTouchBegan(n, i)) && t._registered) {
t._claimedTouches.push(n);
a._currentTouchListener = t;
a._currentTouch = n;
}
} else if (t._claimedTouches.length > 0 && -1 !== (r = t._claimedTouches.indexOf(n))) {
s = !0;
if (!cc.macro.ENABLE_MULTI_TOUCH && a._currentTouch && a._currentTouch !== n) return !1;
if (o === c.MOVED && t.onTouchMoved) t.onTouchMoved(n, i); else if (o === c.ENDED) {
t.onTouchEnded && t.onTouchEnded(n, i);
t._registered && t._claimedTouches.splice(r, 1);
a._clearCurTouch();
} else if (o === c.CANCELED) {
t.onTouchCancelled && t.onTouchCancelled(n, i);
t._registered && t._claimedTouches.splice(r, 1);
a._clearCurTouch();
}
}
if (i.isStopped()) {
a._updateTouchListeners(i);
return !0;
}
if (s && t.swallowTouches) {
e.needsMutableSet && e.touches.splice(n, 1);
return !0;
}
return !1;
},
_dispatchTouchEvent: function(t) {
this._sortEventListeners(n.TOUCH_ONE_BY_ONE);
this._sortEventListeners(n.TOUCH_ALL_AT_ONCE);
var e = this._getListeners(n.TOUCH_ONE_BY_ONE), i = this._getListeners(n.TOUCH_ALL_AT_ONCE);
if (null !== e || null !== i) {
var r = t.getTouches(), s = cc.js.array.copy(r), a = {
event: t,
needsMutableSet: e && i,
touches: s,
selTouch: null
};
if (e) for (var o = 0; o < r.length; o++) {
t.currentTouch = r[o];
t._propagationStopped = t._propagationImmediateStopped = !1;
this._dispatchEventToListeners(e, this._onTouchEventCallback, a);
}
if (i && s.length > 0) {
this._dispatchEventToListeners(i, this._onTouchesEventCallback, {
event: t,
touches: s
});
if (t.isStopped()) return;
}
this._updateTouchListeners(t);
}
},
_onTouchesEventCallback: function(t, e) {
if (!t._registered) return !1;
var i = cc.Event.EventTouch, n = e.event, r = e.touches, s = n.getEventCode();
n.currentTarget = t._node;
s === i.BEGAN && t.onTouchesBegan ? t.onTouchesBegan(r, n) : s === i.MOVED && t.onTouchesMoved ? t.onTouchesMoved(r, n) : s === i.ENDED && t.onTouchesEnded ? t.onTouchesEnded(r, n) : s === i.CANCELED && t.onTouchesCancelled && t.onTouchesCancelled(r, n);
if (n.isStopped()) {
a._updateTouchListeners(n);
return !0;
}
return !1;
},
_associateNodeAndEventListener: function(t, e) {
var i = this._nodeListenersMap[t._id];
if (!i) {
i = [];
this._nodeListenersMap[t._id] = i;
}
i.push(e);
},
_dissociateNodeAndEventListener: function(t, e) {
var i = this._nodeListenersMap[t._id];
if (i) {
cc.js.array.remove(i, e);
0 === i.length && delete this._nodeListenersMap[t._id];
}
},
_dispatchEventToListeners: function(t, e, i) {
var n, r, s = !1, a = t.getFixedPriorityListeners(), o = t.getSceneGraphPriorityListeners(), c = 0;
if (a && 0 !== a.length) for (;c < t.gt0Index; ++c) if ((r = a[c]).isEnabled() && !r._isPaused() && r._isRegistered() && e(r, i)) {
s = !0;
break;
}
if (o && !s) for (n = 0; n < o.length; n++) if ((r = o[n]).isEnabled() && !r._isPaused() && r._isRegistered() && e(r, i)) {
s = !0;
break;
}
if (a && !s) for (;c < a.length; ++c) if ((r = a[c]).isEnabled() && !r._isPaused() && r._isRegistered() && e(r, i)) {
s = !0;
break;
}
},
_setDirty: function(t, e) {
var i = this._priorityDirtyFlagMap;
null == i[t] ? i[t] = e : i[t] = e | i[t];
},
_sortNumberAsc: function(t, e) {
return t - e;
},
hasEventListener: function(t) {
return !!this._getListeners(t);
},
addListener: function(t, e) {
cc.assertID(t && e, 3503);
if (cc.js.isNumber(e) || e instanceof cc._BaseNode) {
if (t instanceof cc.EventListener) {
if (t._isRegistered()) {
cc.logID(3505);
return;
}
} else {
cc.assertID(!cc.js.isNumber(e), 3504);
t = cc.EventListener.create(t);
}
if (t.checkAvailable()) {
if (cc.js.isNumber(e)) {
if (0 === e) {
cc.logID(3500);
return;
}
t._setSceneGraphPriority(null);
t._setFixedPriority(e);
t._setRegistered(!0);
t._setPaused(!1);
this._addListener(t);
} else {
t._setSceneGraphPriority(e);
t._setFixedPriority(0);
t._setRegistered(!0);
this._addListener(t);
}
return t;
}
} else cc.warnID(3506);
},
addCustomListener: function(t, e) {
var i = new cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: t,
callback: e
});
this.addListener(i, 1);
return i;
},
removeListener: function(t) {
if (null != t) {
var e, i = this._listenersMap;
for (var n in i) {
var r = i[n], s = r.getFixedPriorityListeners(), a = r.getSceneGraphPriorityListeners();
(e = this._removeListenerInVector(a, t)) ? this._setDirty(t._getListenerID(), this.DIRTY_SCENE_GRAPH_PRIORITY) : (e = this._removeListenerInVector(s, t)) && this._setDirty(t._getListenerID(), this.DIRTY_FIXED_PRIORITY);
if (r.empty()) {
delete this._priorityDirtyFlagMap[t._getListenerID()];
delete i[n];
}
if (e) break;
}
if (!e) for (var o = this._toAddedListeners, c = o.length - 1; c >= 0; c--) {
var u = o[c];
if (u === t) {
cc.js.array.removeAt(o, c);
u._setRegistered(!1);
break;
}
}
this._currentTouchListener === t && this._clearCurTouch();
}
},
_clearCurTouch: function() {
this._currentTouchListener = null;
this._currentTouch = null;
},
_removeListenerInCallback: function(t, e) {
if (null == t) return !1;
for (var i = t.length - 1; i >= 0; i--) {
var n = t[i];
if (n._onCustomEvent === e || n._onEvent === e) {
n._setRegistered(!1);
if (null != n._getSceneGraphPriority()) {
this._dissociateNodeAndEventListener(n._getSceneGraphPriority(), n);
n._setSceneGraphPriority(null);
}
0 === this._inDispatch ? cc.js.array.removeAt(t, i) : this._toRemovedListeners.push(n);
return !0;
}
}
return !1;
},
_removeListenerInVector: function(t, e) {
if (null == t) return !1;
for (var i = t.length - 1; i >= 0; i--) {
var n = t[i];
if (n === e) {
n._setRegistered(!1);
if (null != n._getSceneGraphPriority()) {
this._dissociateNodeAndEventListener(n._getSceneGraphPriority(), n);
n._setSceneGraphPriority(null);
}
0 === this._inDispatch ? cc.js.array.removeAt(t, i) : this._toRemovedListeners.push(n);
return !0;
}
}
return !1;
},
removeListeners: function(t, e) {
var i = this;
if (cc.js.isNumber(t) || t instanceof cc._BaseNode) if (void 0 !== t._id) {
var r, s = i._nodeListenersMap[t._id];
if (s) {
var a = cc.js.array.copy(s);
for (r = 0; r < a.length; r++) i.removeListener(a[r]);
delete i._nodeListenersMap[t._id];
}
var o = i._toAddedListeners;
for (r = 0; r < o.length; ) {
var c = o[r];
if (c._getSceneGraphPriority() === t) {
c._setSceneGraphPriority(null);
c._setRegistered(!1);
o.splice(r, 1);
} else ++r;
}
if (!0 === e) {
var u, l = t.children;
for (r = 0, u = l.length; r < u; r++) i.removeListeners(l[r], !0);
}
} else t === cc.EventListener.TOUCH_ONE_BY_ONE ? i._removeListenersForListenerID(n.TOUCH_ONE_BY_ONE) : t === cc.EventListener.TOUCH_ALL_AT_ONCE ? i._removeListenersForListenerID(n.TOUCH_ALL_AT_ONCE) : t === cc.EventListener.MOUSE ? i._removeListenersForListenerID(n.MOUSE) : t === cc.EventListener.ACCELERATION ? i._removeListenersForListenerID(n.ACCELERATION) : t === cc.EventListener.KEYBOARD ? i._removeListenersForListenerID(n.KEYBOARD) : cc.logID(3501); else cc.warnID(3506);
},
removeCustomListeners: function(t) {
this._removeListenersForListenerID(t);
},
removeAllListeners: function() {
var t = this._listenersMap, e = this._internalCustomListenerIDs;
for (var i in t) -1 === e.indexOf(i) && this._removeListenersForListenerID(i);
},
setPriority: function(t, e) {
if (null != t) {
var i = this._listenersMap;
for (var n in i) {
var r = i[n].getFixedPriorityListeners();
if (r && -1 !== r.indexOf(t)) {
null != t._getSceneGraphPriority() && cc.logID(3502);
if (t._getFixedPriority() !== e) {
t._setFixedPriority(e);
this._setDirty(t._getListenerID(), this.DIRTY_FIXED_PRIORITY);
}
return;
}
}
}
},
setEnabled: function(t) {
this._isEnabled = t;
},
isEnabled: function() {
return this._isEnabled;
},
dispatchEvent: function(t) {
if (this._isEnabled) {
this._updateDirtyFlagForSceneGraph();
this._inDispatch++;
if (t && t.getType) if (t.getType().startsWith(cc.Event.TOUCH)) {
this._dispatchTouchEvent(t);
this._inDispatch--;
} else {
var e = s(t);
this._sortEventListeners(e);
var i = this._listenersMap[e];
if (null != i) {
this._dispatchEventToListeners(i, this._onListenerCallback, t);
this._onUpdateListeners(i);
}
this._inDispatch--;
} else cc.errorID(3511);
}
},
_onListenerCallback: function(t, e) {
e.currentTarget = t._target;
t._onEvent(e);
return e.isStopped();
},
dispatchCustomEvent: function(t, e) {
var i = new cc.Event.EventCustom(t);
i.setUserData(e);
this.dispatchEvent(i);
}
};
i.get(cc, "eventManager", (function() {
cc.errorID(1405, "cc.eventManager", "cc.EventTarget or cc.systemEvent");
return a;
}));
e.exports = cc.internal.eventManager = a;
}), {
"../platform/js": 149,
"./CCEventListener": 113
} ],
115: [ (function() {
"use strict";
cc.Touch = function(t, e, i) {
this._lastModified = 0;
this.setTouchInfo(i, t, e);
};
cc.Touch.prototype = {
constructor: cc.Touch,
getLocation: function() {
return cc.v2(this._point.x, this._point.y);
},
getLocationX: function() {
return this._point.x;
},
getLocationY: function() {
return this._point.y;
},
getPreviousLocation: function() {
return cc.v2(this._prevPoint.x, this._prevPoint.y);
},
getStartLocation: function() {
return cc.v2(this._startPoint.x, this._startPoint.y);
},
getDelta: function() {
return this._point.sub(this._prevPoint);
},
getLocationInView: function() {
return cc.v2(this._point.x, cc.view._designResolutionSize.height - this._point.y);
},
getPreviousLocationInView: function() {
return cc.v2(this._prevPoint.x, cc.view._designResolutionSize.height - this._prevPoint.y);
},
getStartLocationInView: function() {
return cc.v2(this._startPoint.x, cc.view._designResolutionSize.height - this._startPoint.y);
},
getID: function() {
return this._id;
},
setTouchInfo: function(t, e, i) {
this._prevPoint = this._point;
this._point = cc.v2(e || 0, i || 0);
this._id = t;
if (!this._startPointCaptured) {
this._startPoint = cc.v2(this._point);
cc.view._convertPointWithScale(this._startPoint);
this._startPointCaptured = !0;
}
},
_setPoint: function(t, e) {
if (void 0 === e) {
this._point.x = t.x;
this._point.y = t.y;
} else {
this._point.x = t;
this._point.y = e;
}
},
_setPrevPoint: function(t, e) {
this._prevPoint = void 0 === e ? cc.v2(t.x, t.y) : cc.v2(t || 0, e || 0);
}
};
}), {} ],
116: [ (function(t, e) {
"use strict";
t("./CCEvent");
t("./CCTouch");
t("./CCEventListener");
var i = t("./CCEventManager");
e.exports = i;
}), {
"./CCEvent": 112,
"./CCEventListener": 113,
"./CCEventManager": 114,
"./CCTouch": 115
} ],
117: [ (function(t, e) {
"use strict";
var i = cc.js, n = t("../platform/callbacks-invoker");
function r() {
n.call(this);
}
i.extend(r, n);
r.prototype.emit = function(t, e) {
var i = t.type, n = this._callbackTable[i];
if (n) {
var r = !n.isInvoking;
n.isInvoking = !0;
for (var s = n.callbackInfos, a = 0, o = s.length; a < o; ++a) {
var c = s[a];
if (c && c.callback) {
c.callback.call(c.target, t, e);
if (t._propagationImmediateStopped) break;
}
}
if (r) {
n.isInvoking = !1;
n.containCanceled && n.purgeCanceled();
}
}
};
e.exports = r;
}), {
"../platform/callbacks-invoker": 141
} ],
118: [ (function(t, e) {
"use strict";
var i = t("../platform/js"), n = t("../platform/callbacks-invoker"), r = i.array.fastRemove;
function s() {
n.call(this);
}
i.extend(s, n);
var a = s.prototype;
a.__on = a.on;
a.on = function(t, e, i, n) {
if (e) {
if (!this.hasEventListener(t, e, i)) {
this.__on(t, e, i, n);
i && i.__eventTargets && i.__eventTargets.push(this);
}
return e;
}
cc.errorID(6800);
};
a.__off = a.off;
a.off = function(t, e, i) {
if (e) {
this.__off(t, e, i);
i && i.__eventTargets && r(i.__eventTargets, this);
} else {
var n = this._callbackTable[t];
if (!n) return;
for (var s = n.callbackInfos, a = 0; a < s.length; ++a) {
var o = s[a] && s[a].target;
o && o.__eventTargets && r(o.__eventTargets, this);
}
this.removeAll(t);
}
};
a.targetOff = function(t) {
this.removeAll(t);
t && t.__eventTargets && r(t.__eventTargets, this);
};
a.once = function(t, e, i) {
this.on(t, e, i, !0);
};
a.dispatchEvent = function(t) {
this.emit(t.type, t);
};
a.clear = function() {
for (var t in this._callbackTable) for (var e = this._callbackTable[t].callbackInfos, i = e.length - 1; i >= 0; i--) {
var n = e[i];
n && this.off(t, n.callback, n.target);
}
};
cc.EventTarget = e.exports = s;
}), {
"../platform/callbacks-invoker": 141,
"../platform/js": 149
} ],
119: [ (function(t, e) {
"use strict";
var i = t("../platform/js");
cc.Event = function(t, e) {
this.type = t;
this.bubbles = !!e;
this.target = null;
this.currentTarget = null;
this.eventPhase = 0;
this._propagationStopped = !1;
this._propagationImmediateStopped = !1;
};
cc.Event.prototype = {
constructor: cc.Event,
unuse: function() {
this.type = cc.Event.NO_TYPE;
this.target = null;
this.currentTarget = null;
this.eventPhase = cc.Event.NONE;
this._propagationStopped = !1;
this._propagationImmediateStopped = !1;
},
reuse: function(t, e) {
this.type = t;
this.bubbles = e || !1;
},
stopPropagation: function() {
this._propagationStopped = !0;
},
stopPropagationImmediate: function() {
this._propagationImmediateStopped = !0;
},
isStopped: function() {
return this._propagationStopped || this._propagationImmediateStopped;
},
getCurrentTarget: function() {
return this.currentTarget;
},
getType: function() {
return this.type;
}
};
cc.Event.NO_TYPE = "no_type";
cc.Event.TOUCH = "touch";
cc.Event.MOUSE = "mouse";
cc.Event.KEYBOARD = "keyboard";
cc.Event.ACCELERATION = "acceleration";
cc.Event.NONE = 0;
cc.Event.CAPTURING_PHASE = 1;
cc.Event.AT_TARGET = 2;
cc.Event.BUBBLING_PHASE = 3;
var n = function(t, e) {
cc.Event.call(this, t, e);
this.detail = null;
};
i.extend(n, cc.Event);
n.prototype.reset = n;
n.prototype.setUserData = function(t) {
this.detail = t;
};
n.prototype.getUserData = function() {
return this.detail;
};
n.prototype.getEventName = cc.Event.prototype.getType;
var r = new i.Pool(10);
n.put = function(t) {
r.put(t);
};
n.get = function(t, e) {
var i = r._get();
i ? i.reset(t, e) : i = new n(t, e);
return i;
};
cc.Event.EventCustom = n;
e.exports = cc.Event;
}), {
"../platform/js": 149
} ],
120: [ (function(t) {
"use strict";
t("./event");
t("./event-listeners");
t("./event-target");
t("./system-event");
}), {
"./event": 119,
"./event-listeners": 117,
"./event-target": 118,
"./system-event": 121
} ],
121: [ (function(t, e) {
"use strict";
var i = t("../event/event-target"), n = t("../event-manager"), r = t("../platform/CCInputManager"), s = cc.Enum({
KEY_DOWN: "keydown",
KEY_UP: "keyup",
DEVICEMOTION: "devicemotion"
}), a = null, o = null, c = cc.Class({
name: "SystemEvent",
extends: i,
statics: {
EventType: s
},
setAccelerometerEnabled: function(t) {
t && window.DeviceMotionEvent && "function" == typeof DeviceMotionEvent.requestPermission ? DeviceMotionEvent.requestPermission().then((function(t) {
console.log("Device Motion Event request permission: " + t);
r.setAccelerometerEnabled("granted" === t);
})) : r.setAccelerometerEnabled(t);
},
setAccelerometerInterval: function(t) {
r.setAccelerometerInterval(t);
},
on: function(t, e, i, r) {
this._super(t, e, i, r);
if (t === s.KEY_DOWN || t === s.KEY_UP) {
a || (a = cc.EventListener.create({
event: cc.EventListener.KEYBOARD,
onKeyPressed: function(t, e) {
e.type = s.KEY_DOWN;
cc.systemEvent.dispatchEvent(e);
},
onKeyReleased: function(t, e) {
e.type = s.KEY_UP;
cc.systemEvent.dispatchEvent(e);
}
}));
n.hasEventListener(cc.EventListener.ListenerID.KEYBOARD) || n.addListener(a, 1);
}
if (t === s.DEVICEMOTION) {
o || (o = cc.EventListener.create({
event: cc.EventListener.ACCELERATION,
callback: function(t, e) {
e.type = s.DEVICEMOTION;
cc.systemEvent.dispatchEvent(e);
}
}));
n.hasEventListener(cc.EventListener.ListenerID.ACCELERATION) || n.addListener(o, 1);
}
},
off: function(t, e, i) {
this._super(t, e, i);
if (a && (t === s.KEY_DOWN || t === s.KEY_UP)) {
var r = this.hasEventListener(s.KEY_DOWN), c = this.hasEventListener(s.KEY_UP);
r || c || n.removeListener(a);
}
o && t === s.DEVICEMOTION && n.removeListener(o);
}
});
cc.SystemEvent = e.exports = c;
cc.systemEvent = new cc.SystemEvent();
}), {
"../event-manager": 116,
"../event/event-target": 118,
"../platform/CCInputManager": 132
} ],
122: [ (function(t, e) {
"use strict";
var i = t("../components/CCRenderComponent"), n = t("../assets/material/CCMaterial"), r = t("./types"), s = r.LineCap, a = r.LineJoin, o = cc.Class({
name: "cc.Graphics",
extends: i,
editor: !1,
ctor: function() {
this._impl = new o._Impl(this);
},
properties: {
_lineWidth: 2,
_strokeColor: cc.Color.BLACK,
_lineJoin: a.MITER,
_lineCap: s.BUTT,
_fillColor: cc.Color.WHITE,
_miterLimit: 10,
lineWidth: {
get: function() {
return this._lineWidth;
},
set: function(t) {
this._lineWidth = t;
this._impl.lineWidth = t;
}
},
lineJoin: {
get: function() {
return this._lineJoin;
},
set: function(t) {
this._lineJoin = t;
this._impl.lineJoin = t;
},
type: a
},
lineCap: {
get: function() {
return this._lineCap;
},
set: function(t) {
this._lineCap = t;
this._impl.lineCap = t;
},
type: s
},
strokeColor: {
get: function() {
return this._strokeColor;
},
set: function(t) {
this._impl.strokeColor = this._strokeColor = cc.color(t);
}
},
fillColor: {
get: function() {
return this._fillColor;
},
set: function(t) {
this._impl.fillColor = this._fillColor = cc.color(t);
}
},
miterLimit: {
get: function() {
return this._miterLimit;
},
set: function(t) {
this._miterLimit = t;
this._impl.miterLimit = t;
}
}
},
statics: {
LineJoin: a,
LineCap: s
},
onRestore: function() {
this._impl || (this._impl = new o._Impl(this));
},
onDestroy: function() {
this.clear(!0);
this._super();
this._impl = null;
},
_getDefaultMaterial: function() {
return n.getBuiltinMaterial("2d-graphics");
},
_updateMaterial: function() {
var t = this._materials[0];
if (t) {
void 0 !== t.getDefine("CC_USE_MODEL") && t.define("CC_USE_MODEL", !0);
void 0 !== t.getDefine("CC_SUPPORT_standard_derivatives") && cc.sys.glExtension("OES_standard_derivatives") && t.define("CC_SUPPORT_standard_derivatives", !0);
}
},
moveTo: function(t, e) {
this._impl.moveTo(t, e);
},
lineTo: function(t, e) {
this._impl.lineTo(t, e);
},
bezierCurveTo: function(t, e, i, n, r, s) {
this._impl.bezierCurveTo(t, e, i, n, r, s);
},
quadraticCurveTo: function(t, e, i, n) {
this._impl.quadraticCurveTo(t, e, i, n);
},
arc: function(t, e, i, n, r, s) {
this._impl.arc(t, e, i, n, r, s);
},
ellipse: function(t, e, i, n) {
this._impl.ellipse(t, e, i, n);
},
circle: function(t, e, i) {
this._impl.circle(t, e, i);
},
rect: function(t, e, i, n) {
this._impl.rect(t, e, i, n);
},
roundRect: function(t, e, i, n, r) {
this._impl.roundRect(t, e, i, n, r);
},
fillRect: function(t, e, i, n) {
this.rect(t, e, i, n);
this.fill();
},
clear: function(t) {
this._impl.clear(t);
this._assembler && this._assembler.clear(t);
},
close: function() {
this._impl.close();
},
stroke: function() {
this._assembler || this._resetAssembler();
this._assembler.stroke(this);
},
fill: function() {
this._assembler || this._resetAssembler();
this._assembler.fill(this);
}
});
cc.Graphics = e.exports = o;
cc.Graphics.Types = r;
cc.Graphics.Helper = t("./helper");
}), {
"../assets/material/CCMaterial": 76,
"../components/CCRenderComponent": 102,
"./helper": 123,
"./types": 125
} ],
123: [ (function(t, e) {
"use strict";
var i = t("./types").PointFlags, n = Math.PI, r = Math.min, s = Math.max, a = Math.cos, o = Math.sin, c = Math.abs, u = Math.sign, l = .5522847493;
e.exports = {
arc: function(t, e, i, u, l, h, f) {
var _, d, p, v = 0, g = 0, m = 0, y = 0, E = 0, T = 0, C = 0, A = 0, S = 0, x = 0, b = 0, R = 0, w = 0;
g = h - l;
if (f = f || !1) if (c(g) >= 2 * n) g = 2 * n; else for (;g < 0; ) g += 2 * n; else if (c(g) >= 2 * n) g = 2 * -n; else for (;g > 0; ) g -= 2 * n;
p = 0 | s(1, r(c(g) / (.5 * n) + .5, 5));
m = c(4 / 3 * (1 - a(_ = g / p / 2)) / o(_));
f || (m = -m);
for (d = 0; d <= p; d++) {
T = e + (y = a(v = l + g * (d / p))) * u;
C = i + (E = o(v)) * u;
A = -E * u * m;
S = y * u * m;
0 === d ? t.moveTo(T, C) : t.bezierCurveTo(x + R, b + w, T - A, C - S, T, C);
x = T;
b = C;
R = A;
w = S;
}
},
ellipse: function(t, e, i, n, r) {
t.moveTo(e - n, i);
t.bezierCurveTo(e - n, i + r * l, e - n * l, i + r, e, i + r);
t.bezierCurveTo(e + n * l, i + r, e + n, i + r * l, e + n, i);
t.bezierCurveTo(e + n, i - r * l, e + n * l, i - r, e, i - r);
t.bezierCurveTo(e - n * l, i - r, e - n, i - r * l, e - n, i);
t.close();
},
roundRect: function(t, e, i, n, s, a) {
if (a < .1) t.rect(e, i, n, s); else {
var o = r(a, .5 * c(n)) * u(n), h = r(a, .5 * c(s)) * u(s);
t.moveTo(e, i + h);
t.lineTo(e, i + s - h);
t.bezierCurveTo(e, i + s - h * (1 - l), e + o * (1 - l), i + s, e + o, i + s);
t.lineTo(e + n - o, i + s);
t.bezierCurveTo(e + n - o * (1 - l), i + s, e + n, i + s - h * (1 - l), e + n, i + s - h);
t.lineTo(e + n, i + h);
t.bezierCurveTo(e + n, i + h * (1 - l), e + n - o * (1 - l), i, e + n - o, i);
t.lineTo(e + o, i);
t.bezierCurveTo(e + o * (1 - l), i, e, i + h * (1 - l), e, i + h);
t.close();
}
},
tesselateBezier: function t(e, n, r, s, a, o, u, l, h, f, _) {
var d, p, v, g, m, y, E, T, C, A, S, x, b, R, w, O;
if (!(f > 10)) {
m = .5 * (o + l);
y = .5 * (u + h);
E = .5 * ((d = .5 * (n + s)) + (v = .5 * (s + o)));
T = .5 * ((p = .5 * (r + a)) + (g = .5 * (a + u)));
if (((w = c((s - l) * (R = h - r) - (a - h) * (b = l - n))) + (O = c((o - l) * R - (u - h) * b))) * (w + O) < e._tessTol * (b * b + R * R)) e._addPoint(l, h, 0 === _ ? _ | i.PT_BEVEL : _); else {
t(e, n, r, d, p, E, T, S = .5 * (E + (C = .5 * (v + m))), x = .5 * (T + (A = .5 * (g + y))), f + 1, 0);
t(e, S, x, C, A, m, y, l, h, f + 1, _);
}
}
}
};
}), {
"./types": 125
} ],
124: [ (function(t) {
"use strict";
t("./graphics");
}), {
"./graphics": 122
} ],
125: [ (function(t, e) {
"use strict";
var i = cc.Enum({
BUTT: 0,
ROUND: 1,
SQUARE: 2
}), n = cc.Enum({
BEVEL: 0,
ROUND: 1,
MITER: 2
}), r = cc.Enum({
PT_CORNER: 1,
PT_LEFT: 2,
PT_BEVEL: 4,
PT_INNERBEVEL: 8
});
e.exports = {
LineCap: i,
LineJoin: n,
PointFlags: r
};
}), {} ],
126: [ (function(t) {
"use strict";
t("./platform");
t("./assets");
t("./CCNode");
t("./CCPrivateNode");
t("./CCScene");
t("./components");
t("./graphics");
t("./collider");
t("./collider/CCIntersection");
t("./physics");
t("./camera/CCCamera");
t("./geom-utils");
t("./mesh");
t("./3d");
t("./base-ui/CCWidgetManager");
}), {
"./3d": void 0,
"./CCNode": 25,
"./CCPrivateNode": 26,
"./CCScene": 27,
"./assets": 74,
"./base-ui/CCWidgetManager": 85,
"./camera/CCCamera": 86,
"./collider": void 0,
"./collider/CCIntersection": 87,
"./components": 110,
"./geom-utils": void 0,
"./graphics": 124,
"./mesh": void 0,
"./physics": void 0,
"./platform": 146
} ],
127: [ (function(t, e) {
"use strict";
var i = t("./component-scheduler"), n = t("./platform/CCObject").Flags, r = t("./platform/js"), s = n.IsPreloadStarted, a = n.IsOnLoadStarted, o = n.IsOnLoadCalled, c = n.Deactivating, u = cc.Class({
extends: i.LifeCycleInvoker,
add: function(t) {
this._zero.array.push(t);
},
remove: function(t) {
this._zero.fastRemove(t);
},
cancelInactive: function(t) {
i.LifeCycleInvoker.stableRemoveInactive(this._zero, t);
},
invoke: function() {
this._invoke(this._zero);
this._zero.array.length = 0;
}
}), l = i.createInvokeImpl("c.__preload();"), h = i.createInvokeImpl("c.onLoad();c._objFlags|=" + o, !1, o), f = new r.Pool(4);
f.get = function() {
var t = this._get() || {
preload: new u(l),
onLoad: new i.OneOffInvoker(h),
onEnable: new i.OneOffInvoker(i.invokeOnEnable)
};
t.preload._zero.i = -1;
var e = t.onLoad;
e._zero.i = -1;
e._neg.i = -1;
e._pos.i = -1;
(e = t.onEnable)._zero.i = -1;
e._neg.i = -1;
e._pos.i = -1;
return t;
};
function _(t, e, i) {
e ? t._removeComponent(e) : r.array.removeAt(t._components, i);
}
function d() {
this._activatingStack = [];
}
var p = cc.Class({
ctor: d,
reset: d,
_activateNodeRecursively: function(t, e, i, n) {
if (t._objFlags & c) cc.errorID(3816, t.name); else {
t._activeInHierarchy = !0;
for (var r = t._components.length, s = 0; s < r; ++s) {
var a = t._components[s];
if (a instanceof cc.Component) this.activateComp(a, e, i, n); else {
_(t, a, s);
--s;
--r;
}
}
t._childArrivalOrder = t._children.length;
for (var o = 0, u = t._children.length; o < u; ++o) {
var l = t._children[o];
l._localZOrder = 4294901760 & l._localZOrder | o + 1;
l._active && this._activateNodeRecursively(l, e, i, n);
}
t._onPostActivated(!0);
}
},
_deactivateNodeRecursively: function(t) {
t._objFlags |= c;
t._activeInHierarchy = !1;
for (var e = t._components.length, i = 0; i < e; ++i) {
var n = t._components[i];
if (n._enabled) {
cc.director._compScheduler.disableComp(n);
if (t._activeInHierarchy) {
t._objFlags &= ~c;
return;
}
}
}
for (var r = 0, s = t._children.length; r < s; ++r) {
var a = t._children[r];
if (a._activeInHierarchy) {
this._deactivateNodeRecursively(a);
if (t._activeInHierarchy) {
t._objFlags &= ~c;
return;
}
}
}
t._onPostActivated(!1);
t._objFlags &= ~c;
},
activateNode: function(t, e) {
if (e) {
var i = f.get();
this._activatingStack.push(i);
this._activateNodeRecursively(t, i.preload, i.onLoad, i.onEnable);
i.preload.invoke();
i.onLoad.invoke();
i.onEnable.invoke();
this._activatingStack.pop();
f.put(i);
} else {
this._deactivateNodeRecursively(t);
for (var n = this._activatingStack, r = 0; r < n.length; r++) {
var o = n[r];
o.preload.cancelInactive(s);
o.onLoad.cancelInactive(a);
o.onEnable.cancelInactive();
}
}
t.emit("active-in-hierarchy-changed", t);
},
activateComp: function(t, e, i, n) {
if (cc.isValid(t, !0)) {
if (!(t._objFlags & s)) {
t._objFlags |= s;
t.__preload && (e ? e.add(t) : t.__preload());
}
if (!(t._objFlags & a)) {
t._objFlags |= a;
if (t.onLoad) if (i) i.add(t); else {
t.onLoad();
t._objFlags |= o;
} else t._objFlags |= o;
}
if (t._enabled) {
if (!t.node._activeInHierarchy) return;
cc.director._compScheduler.enableComp(t, n);
}
}
},
destroyComp: function(t) {
cc.director._compScheduler.disableComp(t);
t.onDestroy && t._objFlags & o && t.onDestroy();
},
resetComp: !1
});
e.exports = p;
}), {
"./component-scheduler": 88,
"./platform/CCObject": 134,
"./platform/js": 149,
"./utils/misc": 196
} ],
128: [ (function(t, e) {
"use strict";
var i = t("./js"), n = t("./CCEnum"), r = t("./utils"), s = (r.isPlainEmptyObj_DEV, 
r.cloneable_DEV, t("./attribute")), a = s.DELIMETER, o = t("./preprocess-class");
t("./requiring-frame");
var c = [ "name", "extends", "mixins", "ctor", "__ctor__", "properties", "statics", "editor", "__ES6__" ];
function u(t, e) {
t.indexOf(e) < 0 && t.push(e);
}
var l = {
datas: null,
push: function(t) {
if (this.datas) this.datas.push(t); else {
this.datas = [ t ];
var e = this;
setTimeout((function() {
e.init();
}), 0);
}
},
init: function() {
var t = this.datas;
if (t) {
for (var e = 0; e < t.length; ++e) {
var n = t[e], r = n.cls, s = n.props;
"function" == typeof s && (s = s());
var a = i.getClassName(r);
s ? R(r, a, s, r.$super, n.mixins) : cc.errorID(3633, a);
}
this.datas = null;
}
}
};
function h(t, e) {
u(t.__props__, e);
}
function f(t, e, i, n) {
var r = n.default;
s.setClassAttr(t, i, "default", r);
h(t, i);
I(t, n, 0, i);
}
function _(t, e, n, r, a) {
var o = r.get, c = r.set, u = t.prototype, l = !Object.getOwnPropertyDescriptor(u, n);
if (o) {
I(t, r, 0, n);
s.setClassAttr(t, n, "serializable", !1);
a || i.get(u, n, o, l, l);
}
c && (a || i.set(u, n, c, l, l));
}
function d(t) {
return "function" == typeof t ? t() : t;
}
function p(t, e, n) {
for (var r in e) t.hasOwnProperty(r) || n && !n(r) || Object.defineProperty(t, r, i.getPropertyDescriptor(e, r));
}
function v(t, e, n, r) {
var a, o, c = r.__ctor__, u = r.ctor, l = r.__ES6__;
if (l) {
a = [ u ];
o = u;
} else {
a = c ? [ c ] : S(e, n, r);
o = A(a, e, t, r);
i.value(o, "extend", (function(t) {
t.extends = this;
return w(t);
}), !0);
}
i.value(o, "__ctors__", a.length > 0 ? a : null, !0);
var h = o.prototype;
if (e) {
if (!l) {
i.extend(o, e);
h = o.prototype;
}
o.$super = e;
}
if (n) {
for (var f = n.length - 1; f >= 0; f--) {
var _ = n[f];
p(h, _.prototype);
p(o, _, (function(t) {
return _.hasOwnProperty(t) && !0;
}));
w._isCCClass(_) && p(s.getClassAttrs(o), s.getClassAttrs(_));
}
h.constructor = o;
}
l || (h.__initProps__ = C);
i.setClassName(t, o);
return o;
}
function g(t, e, n, r) {
var s = cc.Component, a = cc._RF.peek();
if (a && i.isChildClassOf(e, s)) {
if (i.isChildClassOf(a.cls, s)) {
cc.errorID(3615);
return null;
}
t = t || a.script;
}
var o = v(t, e, n, r);
if (a) if (i.isChildClassOf(e, s)) {
var c = a.uuid;
c && i._setClassId(c, o);
a.cls = o;
} else i.isChildClassOf(a.cls, s) || (a.cls = o);
return o;
}
function m(t) {
for (var e = i.getClassName(t), n = t.constructor, r = "new " + e + "(", s = 0; s < n.__props__.length; s++) {
r += t[n.__props__[s]];
s < n.__props__.length - 1 && (r += ",");
}
return r + ")";
}
function y(t) {
return JSON.stringify(t).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
function E(t, e) {
for (var i = [], n = "", r = 0; r < e.length; r++) {
var s = e[r], o = s + a + "default";
if (o in t) {
var c, u;
c = T.test(s) ? "this." + s + "=" : "this[" + y(s) + "]=";
var l = t[o];
if ("object" == typeof l && l) u = l instanceof cc.ValueType ? m(l) : Array.isArray(l) ? "[]" : "{}"; else if ("function" == typeof l) {
var h = i.length;
i.push(l);
u = "F[" + h + "]()";
} else u = "string" == typeof l ? y(l) : l;
n += c = c + u + ";\n";
}
}
return 0 === i.length ? Function(n) : Function("F", "return (function(){\n" + n + "})")(i);
}
var T = /^[A-Za-z_$][0-9A-Za-z_$]*$/;
function C(t) {
var e = s.getClassAttrs(t), i = t.__props__;
if (null === i) {
l.init();
i = t.__props__;
}
var n = E(e, i);
t.prototype.__initProps__ = n;
n.call(this);
}
var A = function(t, e, i, n) {
var r = "return function CCClass(){\n";
e && b(e, n) && (r += "this._super=null;\n");
r += "this.__initProps__(CCClass);\n";
var s = t.length;
if (s > 0) {
var a = "].apply(this,arguments);\n";
if (1 === s) r += "CCClass.__ctors__[0" + a; else {
r += "var cs=CCClass.__ctors__;\n";
for (var o = 0; o < s; o++) r += "cs[" + o + a;
}
}
r += "}";
return Function(r)();
};
function S(t, e, i) {
for (var n, r = [], s = [ t ].concat(e), a = 0; a < s.length; a++) {
var o = s[a];
if (o) for (var c = (n = o, w._isCCClass(n) ? n.__ctors__ || [] : [ n ]), l = 0; l < c.length; l++) u(r, c[l]);
}
var h = i.ctor;
h && r.push(h);
return r;
}
var x = /xyz/.test((function() {
xyz;
})) ? /\b\._super\b/ : /.*/;
/xyz/.test((function() {
xyz;
}));
function b(t, e) {
var n = !1;
for (var r in e) if (!(c.indexOf(r) >= 0)) {
var s = e[r];
if ("function" == typeof s) {
var a = i.getPropertyDescriptor(t.prototype, r);
if (a) {
var o = a.value;
if ("function" == typeof o) {
if (x.test(s)) {
n = !0;
e[r] = (function(t, e) {
return function() {
var i = this._super;
this._super = t;
var n = e.apply(this, arguments);
this._super = i;
return n;
};
})(o, s);
}
continue;
}
}
}
}
return n;
}
function R(t, e, i, n, r, c) {
t.__props__ = [];
n && n.__props__ && (t.__props__ = n.__props__.slice());
if (r) for (var u = 0; u < r.length; ++u) {
var l = r[u];
l.__props__ && (t.__props__ = t.__props__.concat(l.__props__.filter((function(e) {
return t.__props__.indexOf(e) < 0;
}))));
}
if (i) {
o.preprocessAttrs(i, e, t, c);
for (var h in i) {
var d = i[h];
"default" in d ? f(t, 0, h, d) : _(t, 0, h, d, c);
}
}
var p = s.getClassAttrs(t);
t.__values__ = t.__props__.filter((function(t) {
return !1 !== p[t + a + "serializable"];
}));
}
function w(t) {
var e = (t = t || {}).name, n = t.extends, r = t.mixins, s = g(e, n, r, t);
e || (e = cc.js.getClassName(s));
s._sealed = !0;
n && (n._sealed = !1);
var a = t.properties;
if ("function" == typeof a || n && null === n.__props__ || r && r.some((function(t) {
return null === t.__props__;
}))) {
l.push({
cls: s,
props: a,
mixins: r
});
s.__props__ = s.__values__ = null;
} else R(s, e, a, n, t.mixins, t.__ES6__);
var u = t.statics;
if (u) {
var h;
for (h in u) s[h] = u[h];
}
for (var f in t) if (!(c.indexOf(f) >= 0)) {
var _ = t[f];
o.validateMethodWithProps(_, f, e, s, n) && i.value(s.prototype, f, _, !0, !0);
}
var d = t.editor;
d && i.isChildClassOf(n, cc.Component) && cc.Component._registerEditorProps(s, d);
return s;
}
w._isCCClass = function(t) {
return t && t.hasOwnProperty("__ctors__");
};
w._fastDefine = function(t, e, n) {
i.setClassName(t, e);
for (var r = e.__props__ = e.__values__ = Object.keys(n), o = s.getClassAttrs(e), c = 0; c < r.length; c++) {
var u = r[c];
o[u + a + "visible"] = !1;
o[u + a + "default"] = n[u];
}
};
w.Attr = s;
w.attr = s.attr;
w.getInheritanceChain = function(t) {
for (var e = []; t = i.getSuper(t); ) t !== Object && e.push(t);
return e;
};
var O = {
Integer: "Number",
Float: "Number",
Boolean: "Boolean",
String: "String"
};
function I(t, e, i, r) {
var o = null, c = "";
function u() {
c = r + a;
return o = s.getClassAttrs(t);
}
var l = e.type;
if (l) {
if (O[l]) (o || u())[c + "type"] = l; else if ("Object" === l) ; else if (l === s.ScriptUuid) {
(o || u())[c + "type"] = "Script";
o[c + "ctor"] = cc.ScriptAsset;
} else if ("object" == typeof l) {
if (n.isEnum(l)) {
(o || u())[c + "type"] = "Enum";
o[c + "enumList"] = n.getList(l);
}
} else if ("function" == typeof l) {
(o || u())[c + "type"] = "Object";
o[c + "ctor"] = l;
}
}
function h(t, i) {
if (t in e) {
var n = e[t];
typeof n === i && ((o || u())[c + t] = n);
}
}
e.editorOnly && ((o || u())[c + "editorOnly"] = !0);
!1 === e.serializable && ((o || u())[c + "serializable"] = !1);
h("formerlySerializedAs", "string");
var f = e.range;
if (f && Array.isArray(f) && f.length >= 2) {
(o || u())[c + "min"] = f[0];
o[c + "max"] = f[1];
f.length > 2 && (o[c + "step"] = f[2]);
}
h("min", "number");
h("max", "number");
h("step", "number");
}
cc.Class = w;
e.exports = {
isArray: function(t) {
t = d(t);
return Array.isArray(t);
},
fastDefine: w._fastDefine,
getNewValueTypeCode: m,
IDENTIFIER_RE: T,
escapeForJS: y,
getDefault: d
};
}), {
"./CCEnum": 130,
"./attribute": 140,
"./js": 149,
"./preprocess-class": 150,
"./requiring-frame": 151,
"./utils": 152
} ],
129: [ (function(t, e) {
"use strict";
t("./CCClass");
var i = t("./preprocess-class"), n = t("./js"), r = "__ccclassCache__";
function s(t) {
return t;
}
function a(t, e) {
return t[e] || (t[e] = {});
}
function o(t) {
return function(e) {
return "function" == typeof e ? t(e) : function(i) {
return t(i, e);
};
};
}
function c(t, e) {
return function(t) {
return function(i) {
return e(i, t);
};
};
}
var u = c.bind(null, !1);
function l() {
return c.bind(null, !1);
}
var h = l(), f = l();
function _(t) {
return a(t, r);
}
function d(t) {
var e;
try {
e = t();
} catch (e) {
return t;
}
return "object" != typeof e || null === e ? e : t;
}
function p(t) {
var e;
try {
e = new t();
} catch (t) {
return {};
}
return e;
}
function v(t, e, r, s, a, o) {
var c, u = a && (a.get || a.set);
s && (c = i.getFullFormOfProperty(s, u));
var l = e[r], h = n.mixin(l || {}, c || s || {});
if (u) {
a.get && (h.get = a.get);
a.set && (h.set = a.set);
} else {
var f = void 0;
if (a) a.initializer && (f = d(a.initializer)); else {
var _ = o.default || (o.default = p(t));
_.hasOwnProperty(r) && (f = _[r]);
}
h.default = f;
}
e[r] = h;
}
var g = o((function(t, e) {
var i = n.getSuper(t);
i === Object && (i = null);
var s = {
name: e,
extends: i,
ctor: t,
__ES6__: !0
}, a = t[r];
if (a) {
var o = a.proto;
o && n.mixin(s, o);
t[r] = void 0;
}
return cc.Class(s);
}));
function m(t, e, i) {
return t((function(t, n) {
var r = _(t);
if (r) {
var s = void 0 !== i ? i : n, o = a(r, "proto");
a(o, "editor")[e] = s;
}
}), e);
}
function y(t) {
return t(s);
}
var E = y(o), T = m(u, "requireComponent"), C = y(h), A = m(f, "executionOrder"), S = y(o), x = y(o), b = y(h), R = y(h), w = y(h);
cc._decorator = e.exports = {
ccclass: g,
property: function(t, e, i) {
var n = null;
function r(t, e, i) {
var r = _(t.constructor);
if (r) {
var s = a(r, "proto"), o = a(s, "properties");
v(t.constructor, o, e, n, i, r);
}
}
if ("undefined" == typeof e) {
n = t;
return r;
}
r(t, e, i);
},
executeInEditMode: E,
requireComponent: T,
menu: C,
executionOrder: A,
disallowMultiple: S,
playOnFocus: x,
inspector: b,
icon: R,
help: w,
mixins: function() {
for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
return function(e) {
var i = _(e);
i && (a(i, "proto").mixins = t);
};
}
};
}), {
"./CCClass": 128,
"./js": 149,
"./preprocess-class": 150,
"./utils": 152
} ],
130: [ (function(t, e) {
"use strict";
var i = t("./js");
function n(t) {
if ("__enums__" in t) return t;
i.value(t, "__enums__", null, !0);
for (var e = -1, n = Object.keys(t), r = 0; r < n.length; r++) {
var s = n[r], a = t[s];
if (-1 === a) {
a = ++e;
t[s] = a;
} else if ("number" == typeof a) e = a; else if ("string" == typeof a && Number.isInteger(parseFloat(s))) continue;
var o = "" + a;
s !== o && i.value(t, o, s);
}
return t;
}
n.isEnum = function(t) {
return t && t.hasOwnProperty("__enums__");
};
n.getList = function(t) {
if (t.__enums__) return t.__enums__;
var e = t.__enums__ = [];
for (var i in t) {
var n = t[i];
Number.isInteger(n) && e.push({
name: i,
value: n
});
}
e.sort((function(t, e) {
return t.value - e.value;
}));
return e;
};
e.exports = cc.Enum = n;
}), {
"./js": 149
} ],
131: [ (function(t) {
"use strict";
var e, i = t("../event-manager"), n = t("./CCInputManager");
cc.Acceleration = function(t, e, i, n) {
this.x = t || 0;
this.y = e || 0;
this.z = i || 0;
this.timestamp = n || 0;
};
n.setAccelerometerEnabled = function(t) {
var e = this;
if (e._accelEnabled !== t) {
e._accelEnabled = t;
var i = cc.director.getScheduler();
i.enableForTarget(e);
if (e._accelEnabled) {
e._registerAccelerometerEvent();
e._accelCurTime = 0;
i.scheduleUpdate(e);
} else {
e._unregisterAccelerometerEvent();
e._accelCurTime = 0;
i.unscheduleUpdate(e);
}
jsb.device.setMotionEnabled(t);
}
};
n.setAccelerometerInterval = function(t) {
if (this._accelInterval !== t) {
this._accelInterval = t;
jsb.device.setMotionInterval(t);
}
};
n._registerKeyboardEvent = function() {
cc.game.canvas.addEventListener("keydown", (function(t) {
i.dispatchEvent(new cc.Event.EventKeyboard(t.keyCode, !0));
t.stopPropagation();
t.preventDefault();
}), !1);
cc.game.canvas.addEventListener("keyup", (function(t) {
i.dispatchEvent(new cc.Event.EventKeyboard(t.keyCode, !1));
t.stopPropagation();
t.preventDefault();
}), !1);
};
n._registerAccelerometerEvent = function() {
var t = window, i = this;
i._acceleration = new cc.Acceleration();
i._accelDeviceEvent = t.DeviceMotionEvent || t.DeviceOrientationEvent;
cc.sys.browserType === cc.sys.BROWSER_TYPE_MOBILE_QQ && (i._accelDeviceEvent = window.DeviceOrientationEvent);
var n = i._accelDeviceEvent === t.DeviceMotionEvent ? "devicemotion" : "deviceorientation", r = navigator.userAgent;
(/Android/.test(r) || /Adr/.test(r) && cc.sys.browserType === cc.BROWSER_TYPE_UC) && (i._minus = -1);
e = i.didAccelerate.bind(i);
t.addEventListener(n, e, !1);
};
n._unregisterAccelerometerEvent = function() {
var t = window, i = this._accelDeviceEvent === t.DeviceMotionEvent ? "devicemotion" : "deviceorientation";
e && t.removeEventListener(i, e, !1);
};
n.didAccelerate = function(t) {
var e = this, i = window;
if (e._accelEnabled) {
var n, r, s, a = e._acceleration;
if (e._accelDeviceEvent === window.DeviceMotionEvent) {
var o = t.accelerationIncludingGravity;
n = e._accelMinus * o.x * .1;
r = e._accelMinus * o.y * .1;
s = .1 * o.z;
} else {
n = t.gamma / 90 * .981;
r = -t.beta / 90 * .981;
s = t.alpha / 90 * .981;
}
if (cc.view._isRotated) {
var c = n;
n = -r;
r = c;
}
a.x = n;
a.y = r;
a.z = s;
a.timestamp = t.timeStamp || Date.now();
var u = a.x;
if (90 === i.orientation) {
a.x = -a.y;
a.y = u;
} else if (-90 === i.orientation) {
a.x = a.y;
a.y = -u;
} else if (180 === i.orientation) {
a.x = -a.x;
a.y = -a.y;
}
if (cc.sys.os === cc.sys.OS_ANDROID && cc.sys.browserType !== cc.sys.BROWSER_TYPE_MOBILE_QQ) {
a.x = -a.x;
a.y = -a.y;
}
}
};
}), {
"../event-manager": 116,
"./CCInputManager": 132
} ],
132: [ (function(t, e) {
"use strict";
var i = t("./CCMacro"), n = t("./CCSys"), r = t("../event-manager"), s = i.TOUCH_TIMEOUT, a = cc.v2(), o = {
_mousePressed: !1,
_isRegisterEvent: !1,
_preTouchPoint: cc.v2(0, 0),
_prevMousePoint: cc.v2(0, 0),
_preTouchPool: [],
_preTouchPoolPointer: 0,
_touches: [],
_touchesIntegerDict: {},
_indexBitsUsed: 0,
_maxTouches: 8,
_accelEnabled: !1,
_accelInterval: .2,
_accelMinus: 1,
_accelCurTime: 0,
_acceleration: null,
_accelDeviceEvent: null,
_canvasBoundingRect: {
left: 0,
top: 0,
adjustedLeft: 0,
adjustedTop: 0,
width: 0,
height: 0
},
_getUnUsedIndex: function() {
for (var t = this._indexBitsUsed, e = cc.sys.now(), i = 0; i < this._maxTouches; i++) {
if (!(1 & t)) {
this._indexBitsUsed |= 1 << i;
return i;
}
var n = this._touches[i];
if (e - n._lastModified > s) {
this._removeUsedIndexBit(i);
delete this._touchesIntegerDict[n.getID()];
return i;
}
t >>= 1;
}
return -1;
},
_removeUsedIndexBit: function(t) {
if (!(t < 0 || t >= this._maxTouches)) {
var e = 1 << t;
e = ~e;
this._indexBitsUsed &= e;
}
},
_glView: null,
_updateCanvasBoundingRect: function() {
var t = cc.game.canvas, e = this._canvasBoundingRect, i = document.documentElement, n = window.pageXOffset - i.clientLeft, r = window.pageYOffset - i.clientTop;
if (t.getBoundingClientRect) {
var s = t.getBoundingClientRect();
e.left = s.left + n;
e.top = s.top + r;
e.width = s.width;
e.height = s.height;
} else if (t instanceof HTMLCanvasElement) {
e.left = n;
e.top = r;
e.width = t.width;
e.height = t.height;
} else {
e.left = n;
e.top = r;
e.width = parseInt(t.style.width);
e.height = parseInt(t.style.height);
}
},
handleTouchesBegin: function(t) {
for (var e, i, s, a = [], o = this._touchesIntegerDict, c = n.now(), u = 0, l = t.length; u < l; u++) if (null == o[s = (e = t[u]).getID()]) {
var h = this._getUnUsedIndex();
if (-1 === h) {
cc.logID(2300, h);
continue;
}
(i = this._touches[h] = new cc.Touch(e._point.x, e._point.y, e.getID()))._lastModified = c;
i._setPrevPoint(e._prevPoint);
o[s] = h;
a.push(i);
}
if (a.length > 0) {
this._glView._convertTouchesWithScale(a);
var f = new cc.Event.EventTouch(a);
f._eventCode = cc.Event.EventTouch.BEGAN;
r.dispatchEvent(f);
}
},
handleTouchesMove: function(t) {
for (var e, i, s, a = [], o = this._touches, c = n.now(), u = 0, l = t.length; u < l; u++) {
s = (e = t[u]).getID();
if (null != (i = this._touchesIntegerDict[s]) && o[i]) {
o[i]._setPoint(e._point);
o[i]._setPrevPoint(e._prevPoint);
o[i]._lastModified = c;
a.push(o[i]);
}
}
if (a.length > 0) {
this._glView._convertTouchesWithScale(a);
var h = new cc.Event.EventTouch(a);
h._eventCode = cc.Event.EventTouch.MOVED;
r.dispatchEvent(h);
}
},
handleTouchesEnd: function(t) {
var e = this.getSetOfTouchesEndOrCancel(t);
if (e.length > 0) {
this._glView._convertTouchesWithScale(e);
var i = new cc.Event.EventTouch(e);
i._eventCode = cc.Event.EventTouch.ENDED;
r.dispatchEvent(i);
}
this._preTouchPool.length = 0;
},
handleTouchesCancel: function(t) {
var e = this.getSetOfTouchesEndOrCancel(t);
if (e.length > 0) {
this._glView._convertTouchesWithScale(e);
var i = new cc.Event.EventTouch(e);
i._eventCode = cc.Event.EventTouch.CANCELED;
r.dispatchEvent(i);
}
this._preTouchPool.length = 0;
},
getSetOfTouchesEndOrCancel: function(t) {
for (var e, i, n, r = [], s = this._touches, a = this._touchesIntegerDict, o = 0, c = t.length; o < c; o++) if (null != (i = a[n = (e = t[o]).getID()]) && s[i]) {
s[i]._setPoint(e._point);
s[i]._setPrevPoint(e._prevPoint);
r.push(s[i]);
this._removeUsedIndexBit(i);
delete a[n];
}
return r;
},
getPreTouch: function(t) {
for (var e = null, i = this._preTouchPool, n = t.getID(), r = i.length - 1; r >= 0; r--) if (i[r].getID() === n) {
e = i[r];
break;
}
e || (e = t);
return e;
},
setPreTouch: function(t) {
for (var e = !1, i = this._preTouchPool, n = t.getID(), r = i.length - 1; r >= 0; r--) if (i[r].getID() === n) {
i[r] = t;
e = !0;
break;
}
if (!e) if (i.length <= 50) i.push(t); else {
i[this._preTouchPoolPointer] = t;
this._preTouchPoolPointer = (this._preTouchPoolPointer + 1) % 50;
}
},
getTouchByXY: function(t, e, i) {
var n = this._preTouchPoint, r = this._glView.convertToLocationInView(t, e, i), s = new cc.Touch(r.x, r.y, 0);
s._setPrevPoint(n.x, n.y);
n.x = r.x;
n.y = r.y;
return s;
},
getMouseEvent: function(t, e, i) {
var n = this._prevMousePoint, r = new cc.Event.EventMouse(i);
r._setPrevCursor(n.x, n.y);
n.x = t.x;
n.y = t.y;
this._glView._convertMouseToLocationInView(n, e);
r.setLocation(n.x, n.y);
return r;
},
getPointByEvent: function(t, e) {
cc.sys.browserType !== cc.sys.BROWSER_TYPE_QQ && cc.sys.browserType !== cc.sys.BROWSER_TYPE_UC && cc.sys.browserType !== cc.sys.BROWSER_TYPE_SAFARI || this._updateCanvasBoundingRect();
if (null != t.pageX) return {
x: t.pageX,
y: t.pageY
};
e.left -= document.body.scrollLeft;
e.top -= document.body.scrollTop;
return {
x: t.clientX,
y: t.clientY
};
},
getTouchesByEvent: function(t, e) {
for (var i, r, s, o = [], c = this._glView, u = this._preTouchPoint, l = t.changedTouches.length, h = 0; h < l; h++) if (i = t.changedTouches[h]) {
var f;
f = n.BROWSER_TYPE_FIREFOX === n.browserType ? c.convertToLocationInView(i.pageX, i.pageY, e, a) : c.convertToLocationInView(i.clientX, i.clientY, e, a);
if (null != i.identifier) {
r = new cc.Touch(f.x, f.y, i.identifier);
s = this.getPreTouch(r).getLocation();
r._setPrevPoint(s.x, s.y);
this.setPreTouch(r);
} else (r = new cc.Touch(f.x, f.y))._setPrevPoint(u.x, u.y);
u.x = f.x;
u.y = f.y;
o.push(r);
}
return o;
},
registerSystemEvent: function(t) {
if (!this._isRegisterEvent) {
this._glView = cc.view;
var e = this, i = this._canvasBoundingRect;
window.addEventListener("resize", this._updateCanvasBoundingRect.bind(this));
var s = n.isMobile, a = "mouse" in n.capabilities, o = "touches" in n.capabilities;
if (a) {
if (!s) {
window.addEventListener("mousedown", (function() {
e._mousePressed = !0;
}), !1);
window.addEventListener("mouseup", (function(t) {
if (e._mousePressed) {
e._mousePressed = !1;
var n = e.getPointByEvent(t, i);
if (!cc.rect(i.left, i.top, i.width, i.height).contains(n)) {
e.handleTouchesEnd([ e.getTouchByXY(n.x, n.y, i) ]);
var s = e.getMouseEvent(n, i, cc.Event.EventMouse.UP);
s.setButton(t.button);
r.dispatchEvent(s);
}
}
}), !1);
}
for (var c = cc.Event.EventMouse, u = [ !s && [ "mousedown", c.DOWN, function(i, n, r, s) {
e._mousePressed = !0;
e.handleTouchesBegin([ e.getTouchByXY(r.x, r.y, s) ]);
t.focus();
} ], !s && [ "mouseup", c.UP, function(t, i, n, r) {
e._mousePressed = !1;
e.handleTouchesEnd([ e.getTouchByXY(n.x, n.y, r) ]);
} ], !s && [ "mousemove", c.MOVE, function(t, i, n, r) {
e.handleTouchesMove([ e.getTouchByXY(n.x, n.y, r) ]);
e._mousePressed || i.setButton(null);
} ], [ "mousewheel", c.SCROLL, function(t, e) {
e.setScrollData(0, t.wheelDelta);
} ], [ "DOMMouseScroll", c.SCROLL, function(t, e) {
e.setScrollData(0, -120 * t.detail);
} ] ], l = 0; l < u.length; ++l) {
var h = u[l];
h && (function() {
var n = h[0], s = h[1], a = h[2];
t.addEventListener(n, (function(t) {
var n = e.getPointByEvent(t, i), o = e.getMouseEvent(n, i, s);
o.setButton(t.button);
a(t, o, n, i);
r.dispatchEvent(o);
t.stopPropagation();
t.preventDefault();
}), !1);
})();
}
}
if (window.navigator.msPointerEnabled) {
var f = {
MSPointerDown: e.handleTouchesBegin,
MSPointerMove: e.handleTouchesMove,
MSPointerUp: e.handleTouchesEnd,
MSPointerCancel: e.handleTouchesCancel
}, _ = function(n) {
var r = f[n];
t.addEventListener(n, (function(t) {
var n = document.documentElement;
i.adjustedLeft = i.left - n.scrollLeft;
i.adjustedTop = i.top - n.scrollTop;
r.call(e, [ e.getTouchByXY(t.clientX, t.clientY, i) ]);
t.stopPropagation();
}), !1);
};
for (var d in f) _(d);
}
if (o) {
var p = {
touchstart: function(i) {
e.handleTouchesBegin(i);
t.focus();
},
touchmove: function(t) {
e.handleTouchesMove(t);
},
touchend: function(t) {
e.handleTouchesEnd(t);
},
touchcancel: function(t) {
e.handleTouchesCancel(t);
}
}, v = function(n) {
var r = p[n];
t.addEventListener(n, (function(t) {
if (t.changedTouches) {
var n = document.body;
i.adjustedLeft = i.left - (n.scrollLeft || window.scrollX || 0);
i.adjustedTop = i.top - (n.scrollTop || window.scrollY || 0);
r(e.getTouchesByEvent(t, i));
t.stopPropagation();
t.preventDefault();
}
}), !1);
};
for (var g in p) v(g);
}
this._registerKeyboardEvent();
this._isRegisterEvent = !0;
}
},
_registerKeyboardEvent: function() {},
_registerAccelerometerEvent: function() {},
update: function(t) {
if (this._accelCurTime > this._accelInterval) {
this._accelCurTime -= this._accelInterval;
r.dispatchEvent(new cc.Event.EventAcceleration(this._acceleration));
}
this._accelCurTime += t;
}
};
e.exports = cc.internal.inputManager = o;
}), {
"../event-manager": 116,
"./CCMacro": 133,
"./CCSys": 137
} ],
133: [ (function(t, e) {
"use strict";
cc.macro = {
RAD: Math.PI / 180,
DEG: 180 / Math.PI,
REPEAT_FOREVER: Number.MAX_VALUE - 1,
FLT_EPSILON: 1.192092896e-7,
MIN_ZINDEX: -Math.pow(2, 15),
MAX_ZINDEX: Math.pow(2, 15) - 1,
ONE: 1,
ZERO: 0,
SRC_ALPHA: 770,
SRC_ALPHA_SATURATE: 776,
SRC_COLOR: 768,
DST_ALPHA: 772,
DST_COLOR: 774,
ONE_MINUS_SRC_ALPHA: 771,
ONE_MINUS_SRC_COLOR: 769,
ONE_MINUS_DST_ALPHA: 773,
ONE_MINUS_DST_COLOR: 775,
ONE_MINUS_CONSTANT_ALPHA: 32772,
ONE_MINUS_CONSTANT_COLOR: 32770,
ORIENTATION_PORTRAIT: 1,
ORIENTATION_LANDSCAPE: 2,
ORIENTATION_AUTO: 3,
DENSITYDPI_DEVICE: "device-dpi",
DENSITYDPI_HIGH: "high-dpi",
DENSITYDPI_MEDIUM: "medium-dpi",
DENSITYDPI_LOW: "low-dpi",
FIX_ARTIFACTS_BY_STRECHING_TEXEL_TMX: !0,
DIRECTOR_STATS_POSITION: cc.v2(0, 0),
ENABLE_STACKABLE_ACTIONS: !0,
TOUCH_TIMEOUT: 5e3,
BATCH_VERTEX_COUNT: 2e4,
ENABLE_TILEDMAP_CULLING: !0,
ENABLE_TRANSPARENT_CANVAS: !1,
ENABLE_WEBGL_ANTIALIAS: !1,
ENABLE_CULLING: !1,
CLEANUP_IMAGE_CACHE: !1,
SHOW_MESH_WIREFRAME: !1,
SHOW_MESH_NORMAL: !1,
ENABLE_MULTI_TOUCH: !0,
ALLOW_IMAGE_BITMAP: !cc.sys.isMobile,
ENABLE_NATIVE_TTF_RENDERER: !0
};
Object.defineProperty(cc.macro, "ROTATE_ACTION_CCW", {
set: function(t) {
cc.RotateTo && cc.RotateBy && (cc.RotateTo._reverse = cc.RotateBy._reverse = t);
}
});
cc.macro.SUPPORT_TEXTURE_FORMATS = [ ".pkm", ".pvr", ".webp", ".jpg", ".jpeg", ".bmp", ".png" ];
cc.macro.KEY = {
none: 0,
back: 6,
menu: 18,
backspace: 8,
tab: 9,
enter: 13,
shift: 16,
ctrl: 17,
alt: 18,
pause: 19,
capslock: 20,
escape: 27,
space: 32,
pageup: 33,
pagedown: 34,
end: 35,
home: 36,
left: 37,
up: 38,
right: 39,
down: 40,
select: 41,
insert: 45,
Delete: 46,
0: 48,
1: 49,
2: 50,
3: 51,
4: 52,
5: 53,
6: 54,
7: 55,
8: 56,
9: 57,
a: 65,
b: 66,
c: 67,
d: 68,
e: 69,
f: 70,
g: 71,
h: 72,
i: 73,
j: 74,
k: 75,
l: 76,
m: 77,
n: 78,
o: 79,
p: 80,
q: 81,
r: 82,
s: 83,
t: 84,
u: 85,
v: 86,
w: 87,
x: 88,
y: 89,
z: 90,
num0: 96,
num1: 97,
num2: 98,
num3: 99,
num4: 100,
num5: 101,
num6: 102,
num7: 103,
num8: 104,
num9: 105,
"*": 106,
"+": 107,
"-": 109,
numdel: 110,
"/": 111,
f1: 112,
f2: 113,
f3: 114,
f4: 115,
f5: 116,
f6: 117,
f7: 118,
f8: 119,
f9: 120,
f10: 121,
f11: 122,
f12: 123,
numlock: 144,
scrolllock: 145,
";": 186,
semicolon: 186,
equal: 187,
"=": 187,
",": 188,
comma: 188,
dash: 189,
".": 190,
period: 190,
forwardslash: 191,
grave: 192,
"[": 219,
openbracket: 219,
backslash: 220,
"]": 221,
closebracket: 221,
quote: 222,
dpadLeft: 1e3,
dpadRight: 1001,
dpadUp: 1003,
dpadDown: 1004,
dpadCenter: 1005
};
cc.macro.ImageFormat = cc.Enum({
JPG: 0,
PNG: 1,
TIFF: 2,
WEBP: 3,
PVR: 4,
ETC: 5,
S3TC: 6,
ATITC: 7,
TGA: 8,
RAWDATA: 9,
UNKNOWN: 10
});
cc.macro.BlendFactor = cc.Enum({
ONE: 1,
ZERO: 0,
SRC_ALPHA: 770,
SRC_COLOR: 768,
DST_ALPHA: 772,
DST_COLOR: 774,
ONE_MINUS_SRC_ALPHA: 771,
ONE_MINUS_SRC_COLOR: 769,
ONE_MINUS_DST_ALPHA: 773,
ONE_MINUS_DST_COLOR: 775
});
cc.macro.TextAlignment = cc.Enum({
LEFT: 0,
CENTER: 1,
RIGHT: 2
});
cc.macro.VerticalTextAlignment = cc.Enum({
TOP: 0,
CENTER: 1,
BOTTOM: 2
});
e.exports = cc.macro;
}), {} ],
134: [ (function(t, e) {
"use strict";
var i = t("./js"), n = t("./CCClass"), r = 1;
function s() {
this._name = "";
this._objFlags = 0;
}
n.fastDefine("cc.Object", s, {
_name: "",
_objFlags: 0
});
i.value(s, "Flags", {
Destroyed: r,
DontSave: 8,
EditorOnly: 16,
Dirty: 32,
DontDestroy: 64,
PersistentMask: -4192741,
Destroying: 128,
Deactivating: 256,
LockedInEditor: 512,
HideInHierarchy: 1024,
IsPreloadStarted: 8192,
IsOnLoadStarted: 32768,
IsOnLoadCalled: 16384,
IsOnEnableCalled: 2048,
IsStartCalled: 65536,
IsEditorOnEnableCalled: 4096,
IsPositionLocked: 1 << 21,
IsRotationLocked: 1 << 17,
IsScaleLocked: 1 << 18,
IsAnchorLocked: 1 << 19,
IsSizeLocked: 1 << 20
});
var a = [];
i.value(s, "_deferredDestroy", (function() {
for (var t = a.length, e = 0; e < t; ++e) {
var i = a[e];
i._objFlags & r || i._destroyImmediate();
}
t === a.length ? a.length = 0 : a.splice(0, t);
}));
var o = s.prototype;
i.getset(o, "name", (function() {
return this._name;
}), (function(t) {
this._name = t;
}), !0);
i.get(o, "isValid", (function() {
return !(this._objFlags & r);
}), !0);
o.destroy = function() {
if (this._objFlags & r) {
cc.warnID(5e3);
return !1;
}
if (4 & this._objFlags) return !1;
this._objFlags |= 4;
a.push(this);
return !0;
};
function c(t, e) {
var i, r = t instanceof cc._BaseNode || t instanceof cc.Component, s = r ? "_id" : null, a = {};
for (i in t) if (t.hasOwnProperty(i)) {
if (i === s) continue;
switch (typeof t[i]) {
case "string":
a[i] = "";
break;

case "object":
case "function":
a[i] = null;
}
}
if (cc.Class._isCCClass(e)) for (var o = cc.Class.Attr.getClassAttrs(e), c = e.__props__, u = 0; u < c.length; u++) {
var l = (i = c[u]) + cc.Class.Attr.DELIMETER + "default";
if (l in o) {
if (r && "_id" === i) continue;
switch (typeof o[l]) {
case "string":
a[i] = "";
break;

case "object":
case "function":
a[i] = null;
break;

case "undefined":
a[i] = void 0;
}
}
}
var h = "";
for (i in a) {
var f;
f = n.IDENTIFIER_RE.test(i) ? "o." + i + "=" : "o[" + n.escapeForJS(i) + "]=";
var _ = a[i];
"" === _ && (_ = '""');
h += f + _ + ";\n";
}
return Function("o", h);
}
o._destruct = function() {
var t = this.constructor, e = t.__destruct__;
if (!e) {
e = c(this, t);
i.value(t, "__destruct__", e, !0);
}
e(this);
};
o._onPreDestroy = null;
o._destroyImmediate = function() {
if (this._objFlags & r) cc.errorID(5e3); else {
this._onPreDestroy && this._onPreDestroy();
this._destruct();
this._objFlags |= r;
}
};
o._deserialize = null;
cc.isValid = function(t, e) {
return "object" == typeof t ? !(!t || t._objFlags & (e ? 4 | r : r)) : "undefined" != typeof t;
};
cc.Object = e.exports = s;
}), {
"./CCClass": 128,
"./js": 149
} ],
135: [ (function(t, e) {
"use strict";
var i = t("../platform/js");
cc.SAXParser = function() {
if (window.DOMParser) {
this._isSupportDOMParser = !0;
this._parser = new DOMParser();
} else {
this._isSupportDOMParser = !1;
this._parser = null;
}
};
cc.SAXParser.prototype = {
constructor: cc.SAXParser,
parse: function(t) {
return this._parseXML(t);
},
_parseXML: function(t) {
var e;
if (this._isSupportDOMParser) e = this._parser.parseFromString(t, "text/xml"); else {
(e = new ActiveXObject("Microsoft.XMLDOM")).async = "false";
e.loadXML(t);
}
return e;
}
};
cc.PlistParser = function() {
cc.SAXParser.call(this);
};
i.extend(cc.PlistParser, cc.SAXParser);
i.mixin(cc.PlistParser.prototype, {
parse: function(t) {
var e = this._parseXML(t), i = e.documentElement;
if ("plist" !== i.tagName) {
cc.warnID(5100);
return {};
}
for (var n = null, r = 0, s = i.childNodes.length; r < s && 1 !== (n = i.childNodes[r]).nodeType; r++) ;
e = null;
return this._parseNode(n);
},
_parseNode: function(t) {
var e = null, i = t.tagName;
if ("dict" === i) e = this._parseDict(t); else if ("array" === i) e = this._parseArray(t); else if ("string" === i) if (1 === t.childNodes.length) e = t.firstChild.nodeValue; else {
e = "";
for (var n = 0; n < t.childNodes.length; n++) e += t.childNodes[n].nodeValue;
} else "false" === i ? e = !1 : "true" === i ? e = !0 : "real" === i ? e = parseFloat(t.firstChild.nodeValue) : "integer" === i && (e = parseInt(t.firstChild.nodeValue, 10));
return e;
},
_parseArray: function(t) {
for (var e = [], i = 0, n = t.childNodes.length; i < n; i++) {
var r = t.childNodes[i];
1 === r.nodeType && e.push(this._parseNode(r));
}
return e;
},
_parseDict: function(t) {
for (var e = {}, i = null, n = 0, r = t.childNodes.length; n < r; n++) {
var s = t.childNodes[n];
1 === s.nodeType && ("key" === s.tagName ? i = s.firstChild.nodeValue : e[i] = this._parseNode(s));
}
return e;
}
});
cc.saxParser = new cc.SAXParser();
cc.plistParser = new cc.PlistParser();
e.exports = {
saxParser: cc.saxParser,
plistParser: cc.plistParser
};
}), {
"../platform/js": 149
} ],
136: [ (function() {
"use strict";
cc.screen = {
_supportsFullScreen: !1,
_onfullscreenchange: null,
_onfullscreenerror: null,
_preOnFullScreenChange: null,
_preOnFullScreenError: null,
_preOnTouch: null,
_touchEvent: "",
_fn: null,
_fnMap: [ [ "requestFullscreen", "exitFullscreen", "fullscreenchange", "fullscreenEnabled", "fullscreenElement", "fullscreenerror" ], [ "requestFullScreen", "exitFullScreen", "fullScreenchange", "fullScreenEnabled", "fullScreenElement", "fullscreenerror" ], [ "webkitRequestFullScreen", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitIsFullScreen", "webkitCurrentFullScreenElement", "webkitfullscreenerror" ], [ "mozRequestFullScreen", "mozCancelFullScreen", "mozfullscreenchange", "mozFullScreen", "mozFullScreenElement", "mozfullscreenerror" ], [ "msRequestFullscreen", "msExitFullscreen", "MSFullscreenChange", "msFullscreenEnabled", "msFullscreenElement", "msfullscreenerror" ] ],
init: function() {
this._fn = {};
var t, e, i, n, r = this._fnMap;
for (t = 0, e = r.length; t < e; t++) if ((i = r[t]) && "undefined" != typeof document[i[1]]) {
for (t = 0, n = i.length; t < n; t++) this._fn[r[0][t]] = i[t];
break;
}
this._supportsFullScreen = void 0 !== this._fn.requestFullscreen;
this._touchEvent = "ontouchend" in window ? "touchend" : "mousedown";
},
fullScreen: function() {
return !!this._supportsFullScreen && !!(document[this._fn.fullscreenElement] || document[this._fn.webkitFullscreenElement] || document[this._fn.mozFullScreenElement]);
},
requestFullScreen: function(t, e, i) {
if (t && "video" === t.tagName.toLowerCase()) {
if (cc.sys.os === cc.sys.OS_IOS && cc.sys.isBrowser && t.readyState > 0) {
t.webkitEnterFullscreen && t.webkitEnterFullscreen();
return;
}
t.setAttribute("x5-video-player-fullscreen", "true");
}
if (this._supportsFullScreen) {
t = t || document.documentElement;
if (e) {
var n = this._fn.fullscreenchange;
this._onfullscreenchange && document.removeEventListener(n, this._onfullscreenchange);
this._onfullscreenchange = e;
document.addEventListener(n, e, !1);
}
if (i) {
var r = this._fn.fullscreenerror;
this._onfullscreenerror && document.removeEventListener(r, this._onfullscreenerror);
this._onfullscreenerror = i;
document.addEventListener(r, i, {
once: !0
});
}
var s = t[this._fn.requestFullscreen]();
"undefined" == typeof document[this._fn.fullscreenerror] && window.Promise && s instanceof Promise && s.catch((function() {}));
}
},
exitFullScreen: function(t) {
if (t && "video" === t.tagName.toLowerCase()) {
if (cc.sys.os === cc.sys.OS_IOS && cc.sys.isBrowser) {
t.webkitExitFullscreen && t.webkitExitFullscreen();
return;
}
t.setAttribute("x5-video-player-fullscreen", "false");
}
return !this._supportsFullScreen || document[this._fn.exitFullscreen]();
},
autoFullScreen: function(t, e) {
t = t || document.body;
this._ensureFullScreen(t, e);
this.requestFullScreen(t, e);
},
disableAutoFullScreen: function(t) {
var e = cc.game.canvas || t, i = this._touchEvent;
if (this._preOnTouch) {
e.removeEventListener(i, this._preOnTouch);
this._preOnTouch = null;
}
},
_ensureFullScreen: function(t, e) {
var i = this, n = cc.game.canvas || t, r = this._fn.fullscreenerror, s = this._touchEvent;
function a() {
i._preOnFullScreenError = null;
i._preOnTouch && n.removeEventListener(s, i._preOnTouch);
i._preOnTouch = function() {
i._preOnTouch = null;
i.requestFullScreen(t, e);
};
n.addEventListener(s, i._preOnTouch, {
once: !0
});
}
this._preOnFullScreenError && t.removeEventListener(r, this._preOnFullScreenError);
this._preOnFullScreenError = a;
t.addEventListener(r, a, {
once: !0
});
}
};
cc.screen.init();
}), {} ],
137: [ (function(t, e) {
"use strict";
var i, n = "qgame" === (i = window._CCSettings ? _CCSettings.platform : void 0), r = "quickgame" === i, s = "huawei" === i, a = "jkw-game" === i, o = "qtt-game" === i, c = "link-sure" === i, u = "undefined" == typeof window ? global : window, l = cc && cc.sys ? cc.sys : (function() {
cc.sys = {};
var t = cc.sys;
t.LANGUAGE_ENGLISH = "en";
t.LANGUAGE_CHINESE = "zh";
t.LANGUAGE_FRENCH = "fr";
t.LANGUAGE_ITALIAN = "it";
t.LANGUAGE_GERMAN = "de";
t.LANGUAGE_SPANISH = "es";
t.LANGUAGE_DUTCH = "du";
t.LANGUAGE_RUSSIAN = "ru";
t.LANGUAGE_KOREAN = "ko";
t.LANGUAGE_JAPANESE = "ja";
t.LANGUAGE_HUNGARIAN = "hu";
t.LANGUAGE_PORTUGUESE = "pt";
t.LANGUAGE_ARABIC = "ar";
t.LANGUAGE_NORWEGIAN = "no";
t.LANGUAGE_POLISH = "pl";
t.LANGUAGE_TURKISH = "tr";
t.LANGUAGE_UKRAINIAN = "uk";
t.LANGUAGE_ROMANIAN = "ro";
t.LANGUAGE_BULGARIAN = "bg";
t.LANGUAGE_UNKNOWN = "unknown";
t.OS_IOS = "iOS";
t.OS_ANDROID = "Android";
t.OS_WINDOWS = "Windows";
t.OS_MARMALADE = "Marmalade";
t.OS_LINUX = "Linux";
t.OS_BADA = "Bada";
t.OS_BLACKBERRY = "Blackberry";
t.OS_OSX = "OS X";
t.OS_WP8 = "WP8";
t.OS_WINRT = "WINRT";
t.OS_UNKNOWN = "Unknown";
t.UNKNOWN = -1;
t.WIN32 = 0;
t.LINUX = 1;
t.MACOS = 2;
t.ANDROID = 3;
t.IPHONE = 4;
t.IPAD = 5;
t.BLACKBERRY = 6;
t.NACL = 7;
t.EMSCRIPTEN = 8;
t.TIZEN = 9;
t.WINRT = 10;
t.WP8 = 11;
t.MOBILE_BROWSER = 100;
t.DESKTOP_BROWSER = 101;
t.EDITOR_PAGE = 102;
t.EDITOR_CORE = 103;
t.WECHAT_GAME = 104;
t.QQ_PLAY = 105;
t.FB_PLAYABLE_ADS = 106;
t.BAIDU_GAME = 107;
t.VIVO_GAME = 108;
t.OPPO_GAME = 109;
t.HUAWEI_GAME = 110;
t.XIAOMI_GAME = 111;
t.JKW_GAME = 112;
t.ALIPAY_GAME = 113;
t.WECHAT_GAME_SUB = 114;
t.BAIDU_GAME_SUB = 115;
t.QTT_GAME = 116;
t.BYTEDANCE_GAME = 117;
t.BYTEDANCE_GAME_SUB = 118;
t.LINKSURE = 119;
t.BROWSER_TYPE_WECHAT = "wechat";
t.BROWSER_TYPE_ANDROID = "androidbrowser";
t.BROWSER_TYPE_IE = "ie";
t.BROWSER_TYPE_EDGE = "edge";
t.BROWSER_TYPE_QQ = "qqbrowser";
t.BROWSER_TYPE_MOBILE_QQ = "mqqbrowser";
t.BROWSER_TYPE_UC = "ucbrowser";
t.BROWSER_TYPE_UCBS = "ucbs";
t.BROWSER_TYPE_360 = "360browser";
t.BROWSER_TYPE_BAIDU_APP = "baiduboxapp";
t.BROWSER_TYPE_BAIDU = "baidubrowser";
t.BROWSER_TYPE_MAXTHON = "maxthon";
t.BROWSER_TYPE_OPERA = "opera";
t.BROWSER_TYPE_OUPENG = "oupeng";
t.BROWSER_TYPE_MIUI = "miuibrowser";
t.BROWSER_TYPE_FIREFOX = "firefox";
t.BROWSER_TYPE_SAFARI = "safari";
t.BROWSER_TYPE_CHROME = "chrome";
t.BROWSER_TYPE_LIEBAO = "liebao";
t.BROWSER_TYPE_QZONE = "qzone";
t.BROWSER_TYPE_SOUGOU = "sogou";
t.BROWSER_TYPE_HUAWEI = "huawei";
t.BROWSER_TYPE_UNKNOWN = "unknown";
t.isNative = !0;
t.isBrowser = "object" == typeof window && "object" == typeof document && !1;
t.glExtension = function(t) {
return !!cc.renderer.device.ext(t);
};
t.getMaxJointMatrixSize = function() {
if (!t._maxJointMatrixSize) {
var e = cc.game._renderContext, i = Math.floor(e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS) / 4) - 10;
t._maxJointMatrixSize = i < 50 ? 0 : 50;
}
return t._maxJointMatrixSize;
};
t.getSafeAreaRect = function() {
var t = cc.view.getVisibleSize();
return cc.rect(0, 0, t.width, t.height);
};
if (u.__globalAdapter && u.__globalAdapter.adaptSys) u.__globalAdapter.adaptSys(t); else {
var e, i;
e = n ? t.VIVO_GAME : r ? t.OPPO_GAME : s ? t.HUAWEI_GAME : a ? t.JKW_GAME : o ? t.QTT_GAME : c ? t.LINKSURE : __getPlatform();
t.platform = e;
t.isMobile = e === t.ANDROID || e === t.IPAD || e === t.IPHONE || e === t.WP8 || e === t.TIZEN || e === t.BLACKBERRY || e === t.XIAOMI_GAME || n || r || s || a || o;
t.os = __getOS();
t.language = __getCurrentLanguage();
i = __getCurrentLanguageCode();
t.languageCode = i ? i.toLowerCase() : void 0;
t.osVersion = __getOSVersion();
t.osMainVersion = parseInt(t.osVersion);
t.browserType = null;
t.browserVersion = null;
var l, h = window.innerWidth, f = window.innerHeight, _ = window.devicePixelRatio || 1;
t.windowPixelResolution = {
width: _ * h,
height: _ * f
};
t.localStorage = window.localStorage;
l = t.capabilities = {
canvas: !1,
opengl: !0,
webp: !0
};
if (t.isMobile) {
l.accelerometer = !0;
l.touches = !0;
} else {
l.keyboard = !0;
l.mouse = !0;
l.touches = !1;
}
l.imageBitmap = !1;
t.__audioSupport = {
ONLY_ONE: !1,
WEB_AUDIO: !1,
DELAY_CREATE_CTX: !1,
format: [ ".mp3" ]
};
}
t.NetworkType = {
NONE: 0,
LAN: 1,
WWAN: 2
};
t.getNetworkType = function() {
return t.NetworkType.LAN;
};
t.getBatteryLevel = function() {
return 1;
};
t.garbageCollect = function() {};
t.restartVM = function() {};
t.isObjectValid = function(t) {
return !!t;
};
t.dump = function() {
var t = "";
t += "isMobile : " + this.isMobile + "\r\n";
t += "language : " + this.language + "\r\n";
t += "browserType : " + this.browserType + "\r\n";
t += "browserVersion : " + this.browserVersion + "\r\n";
t += "capabilities : " + JSON.stringify(this.capabilities) + "\r\n";
t += "os : " + this.os + "\r\n";
t += "osVersion : " + this.osVersion + "\r\n";
t += "platform : " + this.platform + "\r\n";
t += "Using " + (cc.game.renderType === cc.game.RENDER_TYPE_WEBGL ? "WEBGL" : "CANVAS") + " renderer.\r\n";
cc.log(t);
};
t.openURL = function(t) {
jsb.openURL(t);
};
t.now = function() {
return Date.now ? Date.now() : +new Date();
};
return t;
})();
e.exports = l;
}), {} ],
138: [ (function(t, e) {
"use strict";
var i = t("../event/event-target"), n = t("../platform/js"), r = t("../renderer");
t("../platform/CCClass");
var s = {
init: function() {
this.html = document.getElementsByTagName("html")[0];
},
availWidth: function(t) {
return t && t !== this.html ? t.clientWidth : window.innerWidth;
},
availHeight: function(t) {
return t && t !== this.html ? t.clientHeight : window.innerHeight;
},
meta: {
width: "device-width"
},
adaptationType: cc.sys.browserType
};
cc.sys.os === cc.sys.OS_IOS && (s.adaptationType = cc.sys.BROWSER_TYPE_SAFARI);
switch (s.adaptationType) {
case cc.sys.BROWSER_TYPE_SAFARI:
case cc.sys.BROWSER_TYPE_SOUGOU:
case cc.sys.BROWSER_TYPE_UC:
s.meta["minimal-ui"] = "true";
s.availWidth = function(t) {
return t.clientWidth;
};
s.availHeight = function(t) {
return t.clientHeight;
};
}
var a = null, o = function() {
i.call(this);
var t = this, e = cc.ContainerStrategy, n = cc.ContentStrategy;
s.init(this);
t._frameSize = cc.size(0, 0);
t._designResolutionSize = cc.size(0, 0);
t._originalDesignResolutionSize = cc.size(0, 0);
t._scaleX = 1;
t._scaleY = 1;
t._viewportRect = cc.rect(0, 0, 0, 0);
t._visibleRect = cc.rect(0, 0, 0, 0);
t._autoFullScreen = !1;
t._devicePixelRatio = 1;
t._maxPixelRatio = 4;
t._retinaEnabled = !1;
t._resizeCallback = null;
t._resizing = !1;
t._resizeWithBrowserSize = !1;
t._orientationChanging = !0;
t._isRotated = !1;
t._orientation = cc.macro.ORIENTATION_AUTO;
t._isAdjustViewport = !0;
t._antiAliasEnabled = !1;
t._resolutionPolicy = null;
t._rpExactFit = new cc.ResolutionPolicy(e.EQUAL_TO_FRAME, n.EXACT_FIT);
t._rpShowAll = new cc.ResolutionPolicy(e.EQUAL_TO_FRAME, n.SHOW_ALL);
t._rpNoBorder = new cc.ResolutionPolicy(e.EQUAL_TO_FRAME, n.NO_BORDER);
t._rpFixedHeight = new cc.ResolutionPolicy(e.EQUAL_TO_FRAME, n.FIXED_HEIGHT);
t._rpFixedWidth = new cc.ResolutionPolicy(e.EQUAL_TO_FRAME, n.FIXED_WIDTH);
cc.game.once(cc.game.EVENT_ENGINE_INITED, this.init, this);
};
cc.js.extend(o, i);
cc.js.mixin(o.prototype, {
init: function() {
this._initFrameSize();
var t = cc.game.canvas.width, e = cc.game.canvas.height;
this._designResolutionSize.width = t;
this._designResolutionSize.height = e;
this._originalDesignResolutionSize.width = t;
this._originalDesignResolutionSize.height = e;
this._viewportRect.width = t;
this._viewportRect.height = e;
this._visibleRect.width = t;
this._visibleRect.height = e;
cc.winSize.width = this._visibleRect.width;
cc.winSize.height = this._visibleRect.height;
cc.visibleRect && cc.visibleRect.init(this._visibleRect);
},
_resizeEvent: function(t) {
var e;
e = this.setDesignResolutionSize ? this : cc.view;
var i = cc.sys;
if (i.browserType !== i.BROWSER_TYPE_UC || i.os !== i.OS_IOS) {
var n = e._frameSize.width, r = e._frameSize.height, s = e._isRotated;
if (cc.sys.isMobile) {
var a = cc.game.container.style, o = a.margin;
a.margin = "0";
a.display = "none";
e._initFrameSize();
a.margin = o;
a.display = "block";
} else e._initFrameSize();
if (!0 === t || e._isRotated !== s || e._frameSize.width !== n || e._frameSize.height !== r) {
var c = e._originalDesignResolutionSize.width, u = e._originalDesignResolutionSize.height;
e._resizing = !0;
c > 0 && e.setDesignResolutionSize(c, u, e._resolutionPolicy);
e._resizing = !1;
e.emit("canvas-resize");
e._resizeCallback && e._resizeCallback.call();
}
} else setTimeout((function() {
e._resizeEvent(t);
}), 0);
},
_orientationChange: function() {
cc.view._orientationChanging = !0;
cc.view._resizeEvent();
cc.sys.browserType === cc.sys.BROWSER_TYPE_SAFARI && cc.sys.isMobile && setTimeout((function() {
window.innerHeight > window.innerWidth && window.scrollTo(0, 1);
}), 500);
},
_resize: function() {
cc.view._resizeEvent(!0);
},
resizeWithBrowserSize: function(t) {
if (t) {
if (!this._resizeWithBrowserSize) {
this._resizeWithBrowserSize = !0;
window.addEventListener("resize", this._resize);
window.addEventListener("orientationchange", this._orientationChange);
}
} else if (this._resizeWithBrowserSize) {
this._resizeWithBrowserSize = !1;
window.removeEventListener("resize", this._resize);
window.removeEventListener("orientationchange", this._orientationChange);
}
},
setResizeCallback: function(t) {
"function" != typeof t && null != t || (this._resizeCallback = t);
},
setOrientation: function(t) {
if ((t &= cc.macro.ORIENTATION_AUTO) && this._orientation !== t) {
this._orientation = t;
var e = this._originalDesignResolutionSize.width, i = this._originalDesignResolutionSize.height;
this.setDesignResolutionSize(e, i, this._resolutionPolicy);
}
},
_initFrameSize: function() {
var t = this._frameSize, e = s.availWidth(cc.game.frame), i = s.availHeight(cc.game.frame), n = e >= i;
if (!cc.sys.isMobile || n && this._orientation & cc.macro.ORIENTATION_LANDSCAPE || !n && this._orientation & cc.macro.ORIENTATION_PORTRAIT) {
t.width = e;
t.height = i;
cc.game.container.style["-webkit-transform"] = "rotate(0deg)";
cc.game.container.style.transform = "rotate(0deg)";
this._isRotated = !1;
} else {
t.width = i;
t.height = e;
cc.game.container.style["-webkit-transform"] = "rotate(90deg)";
cc.game.container.style.transform = "rotate(90deg)";
cc.game.container.style["-webkit-transform-origin"] = "0px 0px 0px";
cc.game.container.style.transformOrigin = "0px 0px 0px";
this._isRotated = !0;
}
this._orientationChanging && setTimeout((function() {
cc.view._orientationChanging = !1;
}), 1e3);
},
_setViewportMeta: function(t, e) {
var i = document.getElementById("cocosMetaElement");
i && e && document.head.removeChild(i);
var n, r, s, a = document.getElementsByName("viewport"), o = a ? a[0] : null;
n = o ? o.content : "";
(i = i || document.createElement("meta")).id = "cocosMetaElement";
i.name = "viewport";
i.content = "";
for (r in t) if (-1 == n.indexOf(r)) n += "," + r + "=" + t[r]; else if (e) {
s = new RegExp(r + "s*=s*[^,]+");
n = n.replace(s, r + "=" + t[r]);
}
/^,/.test(n) && (n = n.substr(1));
i.content = n;
o && (o.content = n);
document.head.appendChild(i);
},
_adjustViewportMeta: function() {
this._isAdjustViewport;
},
adjustViewportMeta: function(t) {
this._isAdjustViewport = t;
},
enableRetina: function(t) {
this._retinaEnabled = !!t;
},
isRetinaEnabled: function() {
return this._retinaEnabled;
},
enableAntiAlias: function(t) {
cc.warnID(9200);
if (this._antiAliasEnabled !== t) {
this._antiAliasEnabled = t;
if (cc.game.renderType === cc.game.RENDER_TYPE_WEBGL) cc.assetManager.assets.forEach((function(e) {
if (e instanceof cc.Texture2D) {
var i = cc.Texture2D.Filter;
t ? e.setFilters(i.LINEAR, i.LINEAR) : e.setFilters(i.NEAREST, i.NEAREST);
}
})); else if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
var e = cc.game.canvas.getContext("2d");
e.imageSmoothingEnabled = t;
e.mozImageSmoothingEnabled = t;
}
}
},
isAntiAliasEnabled: function() {
return this._antiAliasEnabled;
},
enableAutoFullScreen: function(t) {
if (t && t !== this._autoFullScreen && cc.sys.isMobile) {
this._autoFullScreen = !0;
cc.screen.autoFullScreen(cc.game.frame);
} else {
this._autoFullScreen = !1;
cc.screen.disableAutoFullScreen(cc.game.frame);
}
},
isAutoFullScreenEnabled: function() {
return this._autoFullScreen;
},
setCanvasSize: function(t, e) {
var i = cc.game.canvas, n = cc.game.container;
i.width = t * this._devicePixelRatio;
i.height = e * this._devicePixelRatio;
i.style.width = t + "px";
i.style.height = e + "px";
n.style.width = t + "px";
n.style.height = e + "px";
this._resizeEvent();
},
getCanvasSize: function() {
return cc.size(cc.game.canvas.width, cc.game.canvas.height);
},
getFrameSize: function() {
return cc.size(this._frameSize.width, this._frameSize.height);
},
setFrameSize: function(t, e) {
this._frameSize.width = t;
this._frameSize.height = e;
cc.game.frame.style.width = t + "px";
cc.game.frame.style.height = e + "px";
this._resizeEvent(!0);
},
getVisibleSize: function() {
return cc.size(this._visibleRect.width, this._visibleRect.height);
},
getVisibleSizeInPixel: function() {
return cc.size(this._visibleRect.width * this._scaleX, this._visibleRect.height * this._scaleY);
},
getVisibleOrigin: function() {
return cc.v2(this._visibleRect.x, this._visibleRect.y);
},
getVisibleOriginInPixel: function() {
return cc.v2(this._visibleRect.x * this._scaleX, this._visibleRect.y * this._scaleY);
},
getResolutionPolicy: function() {
return this._resolutionPolicy;
},
setResolutionPolicy: function(t) {
var e = this;
if (t instanceof cc.ResolutionPolicy) e._resolutionPolicy = t; else {
var i = cc.ResolutionPolicy;
t === i.EXACT_FIT && (e._resolutionPolicy = e._rpExactFit);
t === i.SHOW_ALL && (e._resolutionPolicy = e._rpShowAll);
t === i.NO_BORDER && (e._resolutionPolicy = e._rpNoBorder);
t === i.FIXED_HEIGHT && (e._resolutionPolicy = e._rpFixedHeight);
t === i.FIXED_WIDTH && (e._resolutionPolicy = e._rpFixedWidth);
}
},
setDesignResolutionSize: function(t, e, i) {
if (t > 0 && e > 0) {
this.setResolutionPolicy(i);
var n = this._resolutionPolicy;
n && n.preApply(this);
cc.sys.isMobile && this._adjustViewportMeta();
this._orientationChanging = !0;
this._resizing || this._initFrameSize();
if (n) {
this._originalDesignResolutionSize.width = this._designResolutionSize.width = t;
this._originalDesignResolutionSize.height = this._designResolutionSize.height = e;
var s = n.apply(this, this._designResolutionSize);
if (s.scale && 2 === s.scale.length) {
this._scaleX = s.scale[0];
this._scaleY = s.scale[1];
}
if (s.viewport) {
var a = this._viewportRect, o = this._visibleRect, c = s.viewport;
a.x = c.x;
a.y = c.y;
a.width = c.width;
a.height = c.height;
o.x = 0;
o.y = 0;
o.width = c.width / this._scaleX;
o.height = c.height / this._scaleY;
}
n.postApply(this);
cc.winSize.width = this._visibleRect.width;
cc.winSize.height = this._visibleRect.height;
cc.visibleRect && cc.visibleRect.init(this._visibleRect);
r.updateCameraViewport();
cc.internal.inputManager._updateCanvasBoundingRect();
this.emit("design-resolution-changed");
} else cc.logID(2201);
} else cc.errorID(2200);
},
getDesignResolutionSize: function() {
return cc.size(this._designResolutionSize.width, this._designResolutionSize.height);
},
setRealPixelResolution: function(t, e, i) {
this.setDesignResolutionSize(t, e, i);
},
setViewportInPoints: function(t, e, i, n) {
var r = this._scaleX, s = this._scaleY;
cc.game._renderContext.viewport(t * r + this._viewportRect.x, e * s + this._viewportRect.y, i * r, n * s);
},
setScissorInPoints: function(t, e, i, n) {
var r = this._scaleX, s = this._scaleY, o = Math.ceil(t * r + this._viewportRect.x), c = Math.ceil(e * s + this._viewportRect.y), u = Math.ceil(i * r), l = Math.ceil(n * s), h = cc.game._renderContext;
if (!a) {
var f = h.getParameter(h.SCISSOR_BOX);
a = cc.rect(f[0], f[1], f[2], f[3]);
}
if (a.x !== o || a.y !== c || a.width !== u || a.height !== l) {
a.x = o;
a.y = c;
a.width = u;
a.height = l;
h.scissor(o, c, u, l);
}
},
isScissorEnabled: function() {
return cc.game._renderContext.isEnabled(gl.SCISSOR_TEST);
},
getScissorRect: function() {
if (!a) {
var t = gl.getParameter(gl.SCISSOR_BOX);
a = cc.rect(t[0], t[1], t[2], t[3]);
}
var e = 1 / this._scaleX, i = 1 / this._scaleY;
return cc.rect((a.x - this._viewportRect.x) * e, (a.y - this._viewportRect.y) * i, a.width * e, a.height * i);
},
getViewportRect: function() {
return this._viewportRect;
},
getScaleX: function() {
return this._scaleX;
},
getScaleY: function() {
return this._scaleY;
},
getDevicePixelRatio: function() {
return this._devicePixelRatio;
},
convertToLocationInView: function(t, e, i, n) {
var r = n || cc.v2(), s = i.adjustedLeft ? i.adjustedLeft : i.left, a = i.adjustedTop ? i.adjustedTop : i.top, o = this._devicePixelRatio * (t - s), c = this._devicePixelRatio * (a + i.height - e);
if (this._isRotated) {
r.x = cc.game.canvas.width - c;
r.y = o;
} else {
r.x = o;
r.y = c;
}
return r;
},
_convertMouseToLocationInView: function(t, e) {
var i = this._viewportRect;
t.x = (this._devicePixelRatio * (t.x - e.left) - i.x) / this._scaleX;
t.y = (this._devicePixelRatio * (e.top + e.height - t.y) - i.y) / this._scaleY;
},
_convertPointWithScale: function(t) {
var e = this._viewportRect;
t.x = (t.x - e.x) / this._scaleX;
t.y = (t.y - e.y) / this._scaleY;
},
_convertTouchesWithScale: function(t) {
for (var e, i, n, r = this._viewportRect, s = this._scaleX, a = this._scaleY, o = 0; o < t.length; o++) {
i = (e = t[o])._point;
n = e._prevPoint;
i.x = (i.x - r.x) / s;
i.y = (i.y - r.y) / a;
n.x = (n.x - r.x) / s;
n.y = (n.y - r.y) / a;
}
}
});
cc.ContainerStrategy = cc.Class({
name: "ContainerStrategy",
preApply: function() {},
apply: function() {},
postApply: function() {},
_setupContainer: function(t, e, i) {
var n = cc.game.canvas;
this._setupStyle(t, e, i);
var r = t._devicePixelRatio = 1;
r = t._devicePixelRatio = window.devicePixelRatio;
n.width = e * r;
n.height = i * r;
},
_setupStyle: function(t, e, i) {
var n = cc.game.canvas, r = cc.game.container;
if (cc.sys.os === cc.sys.OS_ANDROID) {
document.body.style.width = (t._isRotated ? i : e) + "px";
document.body.style.height = (t._isRotated ? e : i) + "px";
}
r.style.width = n.style.width = e + "px";
r.style.height = n.style.height = i + "px";
},
_fixContainer: function() {
document.body.insertBefore(cc.game.container, document.body.firstChild);
var t = document.body.style;
t.width = window.innerWidth + "px";
t.height = window.innerHeight + "px";
t.overflow = "hidden";
var e = cc.game.container.style;
e.position = "fixed";
e.left = e.top = "0px";
document.body.scrollTop = 0;
}
});
cc.ContentStrategy = cc.Class({
name: "ContentStrategy",
ctor: function() {
this._result = {
scale: [ 1, 1 ],
viewport: null
};
},
_buildResult: function(t, e, i, n, r, s) {
Math.abs(t - i) < 2 && (i = t);
Math.abs(e - n) < 2 && (n = e);
var a = cc.rect((t - i) / 2, (e - n) / 2, i, n);
cc.game.renderType, cc.game.RENDER_TYPE_CANVAS;
this._result.scale = [ r, s ];
this._result.viewport = a;
return this._result;
},
preApply: function() {},
apply: function() {
return {
scale: [ 1, 1 ]
};
},
postApply: function() {}
});
(function() {
var t = cc.Class({
name: "EqualToFrame",
extends: cc.ContainerStrategy,
apply: function(t) {
var e = t._frameSize.height, i = cc.game.container.style;
this._setupContainer(t, t._frameSize.width, t._frameSize.height);
t._isRotated ? i.margin = "0 0 0 " + e + "px" : i.margin = "0px";
i.padding = "0px";
}
}), e = cc.Class({
name: "ProportionalToFrame",
extends: cc.ContainerStrategy,
apply: function(t, e) {
var i, n, r = t._frameSize.width, s = t._frameSize.height, a = cc.game.container.style, o = e.width, c = e.height, u = r / o, l = s / c;
u < l ? (i = r, n = c * u) : (i = o * l, n = s);
var h = Math.round((r - i) / 2), f = Math.round((s - n) / 2);
i = r - 2 * h;
n = s - 2 * f;
this._setupContainer(t, i, n);
t._isRotated ? a.margin = "0 0 0 " + s + "px" : a.margin = "0px";
a.paddingLeft = h + "px";
a.paddingRight = h + "px";
a.paddingTop = f + "px";
a.paddingBottom = f + "px";
}
}), i = (cc.Class({
name: "EqualToWindow",
extends: t,
preApply: function(t) {
this._super(t);
cc.game.frame = document.documentElement;
},
apply: function(t) {
this._super(t);
this._fixContainer();
}
}), cc.Class({
name: "ProportionalToWindow",
extends: e,
preApply: function(t) {
this._super(t);
cc.game.frame = document.documentElement;
},
apply: function(t, e) {
this._super(t, e);
this._fixContainer();
}
}), cc.Class({
name: "OriginalContainer",
extends: cc.ContainerStrategy,
apply: function(t) {
this._setupContainer(t, cc.game.canvas.width, cc.game.canvas.height);
}
})), n = ("undefined" == typeof window ? global : window).__globalAdapter;
if (n) {
n.adaptContainerStrategy && n.adaptContainerStrategy(cc.ContainerStrategy.prototype);
n.adaptView && n.adaptView(o.prototype);
}
cc.ContainerStrategy.EQUAL_TO_FRAME = new t();
cc.ContainerStrategy.PROPORTION_TO_FRAME = new e();
cc.ContainerStrategy.ORIGINAL_CONTAINER = new i();
var r = cc.Class({
name: "ExactFit",
extends: cc.ContentStrategy,
apply: function(t, e) {
var i = cc.game.canvas.width, n = cc.game.canvas.height, r = i / e.width, s = n / e.height;
return this._buildResult(i, n, i, n, r, s);
}
}), s = cc.Class({
name: "ShowAll",
extends: cc.ContentStrategy,
apply: function(t, e) {
var i, n, r = cc.game.canvas.width, s = cc.game.canvas.height, a = e.width, o = e.height, c = r / a, u = s / o, l = 0;
c < u ? (i = r, n = o * (l = c)) : (i = a * (l = u), n = s);
return this._buildResult(r, s, i, n, l, l);
}
}), a = cc.Class({
name: "NoBorder",
extends: cc.ContentStrategy,
apply: function(t, e) {
var i, n, r, s = cc.game.canvas.width, a = cc.game.canvas.height, o = e.width, c = e.height, u = s / o, l = a / c;
u < l ? (n = o * (i = l), r = a) : (n = s, r = c * (i = u));
return this._buildResult(s, a, n, r, i, i);
}
}), c = cc.Class({
name: "FixedHeight",
extends: cc.ContentStrategy,
apply: function(t, e) {
var i = cc.game.canvas.width, n = cc.game.canvas.height, r = n / e.height, s = i, a = n;
return this._buildResult(i, n, s, a, r, r);
}
}), u = cc.Class({
name: "FixedWidth",
extends: cc.ContentStrategy,
apply: function(t, e) {
var i = cc.game.canvas.width, n = cc.game.canvas.height, r = i / e.width, s = i, a = n;
return this._buildResult(i, n, s, a, r, r);
}
});
cc.ContentStrategy.EXACT_FIT = new r();
cc.ContentStrategy.SHOW_ALL = new s();
cc.ContentStrategy.NO_BORDER = new a();
cc.ContentStrategy.FIXED_HEIGHT = new c();
cc.ContentStrategy.FIXED_WIDTH = new u();
})();
cc.ResolutionPolicy = cc.Class({
name: "cc.ResolutionPolicy",
ctor: function(t, e) {
this._containerStrategy = null;
this._contentStrategy = null;
this.setContainerStrategy(t);
this.setContentStrategy(e);
},
preApply: function(t) {
this._containerStrategy.preApply(t);
this._contentStrategy.preApply(t);
},
apply: function(t, e) {
this._containerStrategy.apply(t, e);
return this._contentStrategy.apply(t, e);
},
postApply: function(t) {
this._containerStrategy.postApply(t);
this._contentStrategy.postApply(t);
},
setContainerStrategy: function(t) {
t instanceof cc.ContainerStrategy && (this._containerStrategy = t);
},
setContentStrategy: function(t) {
t instanceof cc.ContentStrategy && (this._contentStrategy = t);
}
});
n.get(cc.ResolutionPolicy.prototype, "canvasSize", (function() {
return cc.v2(cc.game.canvas.width, cc.game.canvas.height);
}));
cc.ResolutionPolicy.EXACT_FIT = 0;
cc.ResolutionPolicy.NO_BORDER = 1;
cc.ResolutionPolicy.SHOW_ALL = 2;
cc.ResolutionPolicy.FIXED_HEIGHT = 3;
cc.ResolutionPolicy.FIXED_WIDTH = 4;
cc.ResolutionPolicy.UNKNOWN = 5;
cc.view = new o();
cc.winSize = cc.size();
e.exports = cc.view;
}), {
"../event/event-target": 118,
"../platform/CCClass": 128,
"../platform/js": 149,
"../renderer": 159
} ],
139: [ (function() {
"use strict";
cc.visibleRect = {
topLeft: cc.v2(0, 0),
topRight: cc.v2(0, 0),
top: cc.v2(0, 0),
bottomLeft: cc.v2(0, 0),
bottomRight: cc.v2(0, 0),
bottom: cc.v2(0, 0),
center: cc.v2(0, 0),
left: cc.v2(0, 0),
right: cc.v2(0, 0),
width: 0,
height: 0,
init: function(t) {
var e = this.width = t.width, i = this.height = t.height, n = t.x, r = t.y, s = r + i, a = n + e;
this.topLeft.x = n;
this.topLeft.y = s;
this.topRight.x = a;
this.topRight.y = s;
this.top.x = n + e / 2;
this.top.y = s;
this.bottomLeft.x = n;
this.bottomLeft.y = r;
this.bottomRight.x = a;
this.bottomRight.y = r;
this.bottom.x = n + e / 2;
this.bottom.y = r;
this.center.x = n + e / 2;
this.center.y = r + i / 2;
this.left.x = n;
this.left.y = r + i / 2;
this.right.x = a;
this.right.y = r + i / 2;
}
};
}), {} ],
140: [ (function(t, e) {
"use strict";
var i = t("./js"), n = (t("./utils").isPlainEmptyObj_DEV, "$_$");
function r(t, e) {
var n = e ? Object.create(e) : {};
i.value(t, "__attrs__", n);
return n;
}
function s(t) {
if ("function" != typeof t) return r(t, a(t.constructor));
for (var e, i = cc.Class.getInheritanceChain(t), n = i.length - 1; n >= 0; n--) {
var s = i[n];
s.hasOwnProperty("__attrs__") && s.__attrs__ || r(s, (e = i[n + 1]) && e.__attrs__);
}
r(t, (e = i[0]) && e.__attrs__);
return t.__attrs__;
}
function a(t) {
return t.hasOwnProperty("__attrs__") && t.__attrs__ || s(t);
}
function o(t, e) {
this.name = t;
this.default = e;
}
o.prototype.toString = function() {
return this.name;
};
cc.Integer = new o("Integer", 0);
cc.Float = new o("Float", 0);
cc.Boolean = new o("Boolean", !1);
cc.String = new o("String", "");
e.exports = {
PrimitiveType: o,
attr: function(t, e) {
var i = a(t), r = e + n, s = {};
for (var o in i) o.startsWith(r) && (s[o.slice(r.length)] = i[o]);
return s;
},
getClassAttrs: a,
setClassAttr: function(t, e, i, r) {
a(t)[e + n + i] = r;
},
DELIMETER: n,
getTypeChecker_ET: !1,
getObjTypeChecker_ET: !1,
ScriptUuid: {}
};
}), {
"./CCClass": 128,
"./js": 149,
"./utils": 152
} ],
141: [ (function(t, e) {
"use strict";
var i = t("./js"), n = i.array.fastRemoveAt;
function r() {}
function s() {
this.callback = r;
this.target = void 0;
this.once = !1;
}
s.prototype.set = function(t, e, i) {
this.callback = t;
this.target = e;
this.once = !!i;
};
var a = new i.Pool(function(t) {
t.callback = r;
t.target = void 0;
t.once = !1;
return !0;
}, 32);
a.get = function() {
return this._get() || new s();
};
function o() {
this.callbackInfos = [];
this.isInvoking = !1;
this.containCanceled = !1;
}
var c = o.prototype;
c.removeByCallback = function(t) {
for (var e = 0; e < this.callbackInfos.length; ++e) {
var i = this.callbackInfos[e];
if (i && i.callback === t) {
a.put(i);
n(this.callbackInfos, e);
--e;
}
}
};
c.removeByTarget = function(t) {
for (var e = 0; e < this.callbackInfos.length; ++e) {
var i = this.callbackInfos[e];
if (i && i.target === t) {
a.put(i);
n(this.callbackInfos, e);
--e;
}
}
};
c.cancel = function(t) {
var e = this.callbackInfos[t];
if (e) {
a.put(e);
this.callbackInfos[t] = null;
}
this.containCanceled = !0;
};
c.cancelAll = function() {
for (var t = 0; t < this.callbackInfos.length; t++) {
var e = this.callbackInfos[t];
if (e) {
a.put(e);
this.callbackInfos[t] = null;
}
}
this.containCanceled = !0;
};
c.purgeCanceled = function() {
for (var t = this.callbackInfos.length - 1; t >= 0; --t) this.callbackInfos[t] || n(this.callbackInfos, t);
this.containCanceled = !1;
};
c.clear = function() {
this.cancelAll();
this.callbackInfos.length = 0;
this.isInvoking = !1;
this.containCanceled = !1;
};
var u = new i.Pool(function(t) {
t.callbackInfos = [];
t.isInvoking = !1;
t.containCanceled = !1;
return !0;
}, 16);
u.get = function() {
return this._get() || new o();
};
function l() {
this._callbackTable = i.createMap(!0);
}
(c = l.prototype).on = function(t, e, i, n) {
var r = this._callbackTable[t];
r || (r = this._callbackTable[t] = u.get());
var s = a.get();
s.set(e, i, n);
r.callbackInfos.push(s);
};
c.hasEventListener = function(t, e, i) {
var n = this._callbackTable[t];
if (!n) return !1;
var r = n.callbackInfos;
if (!e) {
if (n.isInvoking) {
for (var s = 0; s < r.length; ++s) if (r[s]) return !0;
return !1;
}
return r.length > 0;
}
for (var a = 0; a < r.length; ++a) {
var o = r[a];
if (o && o.callback === e && o.target === i) return !0;
}
return !1;
};
c.removeAll = function(t) {
if ("string" == typeof t) {
var e = this._callbackTable[t];
if (e) if (e.isInvoking) e.cancelAll(); else {
e.clear();
u.put(e);
delete this._callbackTable[t];
}
} else if (t) for (var i in this._callbackTable) {
var n = this._callbackTable[i];
if (n.isInvoking) for (var r = n.callbackInfos, s = 0; s < r.length; ++s) {
var a = r[s];
a && a.target === t && n.cancel(s);
} else n.removeByTarget(t);
}
};
c.off = function(t, e, i) {
var r = this._callbackTable[t];
if (r) for (var s = r.callbackInfos, o = 0; o < s.length; ++o) {
var c = s[o];
if (c && c.callback === e && c.target === i) {
if (r.isInvoking) r.cancel(o); else {
n(s, o);
a.put(c);
}
break;
}
}
};
c.emit = function(t, e, i, n, r, s) {
var a = this._callbackTable[t];
if (a) {
var o = !a.isInvoking;
a.isInvoking = !0;
for (var c = a.callbackInfos, u = 0, l = c.length; u < l; ++u) {
var h = c[u];
if (h) {
var f = h.target, _ = h.callback;
h.once && this.off(t, _, f);
f ? _.call(f, e, i, n, r, s) : _(e, i, n, r, s);
}
}
if (o) {
a.isInvoking = !1;
a.containCanceled && a.purgeCanceled();
}
}
};
e.exports = l;
}), {
"./js": 149
} ],
142: [ (function(t, e) {
"use strict";
function i(t, e) {
for (var n = 0; n < e.length; n++) {
var r = e[n];
Array.isArray(r) ? i(t, r) : t.push(r);
}
}
e.exports = {
flattenCodeArray: function(t) {
var e = [];
i(e, t);
return e.join("");
}
};
}), {} ],
143: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = N;
i.unpackJSONs = function(t, e) {
if (t[0] < 1) throw new Error(cc.debug.getError(5304, t[0]));
D(t, !0, e);
M(t);
for (var i = new P(t[0]), n = t[1], r = t[2], s = t[3], a = t[4], o = t[m], c = 0; c < o.length; ++c) o[c].unshift(i, n, r, s, a);
return o;
};
i.packCustomObjData = function(t, e) {
return [ 1, _, _, [ t ], _, [ e ], [ 0 ], _, [], [], [] ];
};
i.hasNativeDep = function(t) {
var e = t[5], i = e[e.length - 1];
return "number" == typeof i && i < 0;
};
i.getDependUuidList = function(t) {
var e = t[1];
return t[10].map((function(t) {
return e[t];
}));
};
var n = f(t("./js")), r = f(t("../value-types/vec2")), s = f(t("../value-types/vec3")), a = f(t("../value-types/vec4")), o = f(t("../value-types/color")), c = f(t("../value-types/size")), u = f(t("../value-types/rect")), l = f(t("../value-types/quat")), h = f(t("../value-types/mat4"));
function f(t) {
return t && t.__esModule ? t : {
default: t
};
}
var _ = 0, d = [ r.default, s.default, a.default, l.default, o.default, c.default, u.default, h.default ];
function p(t, e) {
t.x = e[1];
t.y = e[2];
t.z = e[3];
t.w = e[4];
}
var v = [ function(t, e) {
t.x = e[1];
t.y = e[2];
}, function(t, e) {
t.x = e[1];
t.y = e[2];
t.z = e[3];
}, p, p, function(t, e) {
t._val = e[1];
}, function(t, e) {
t.width = e[1];
t.height = e[2];
}, function(t, e) {
t.x = e[1];
t.y = e[2];
t.width = e[3];
t.height = e[4];
}, function(t, e) {
h.default.fromArray(t, e, 1);
} ], g = 0, m = 5, y = (function() {
function t() {
this.uuidObjList = null;
this.uuidPropList = null;
this.uuidList = null;
}
var e = t.prototype;
e.init = function(t) {
this.uuidObjList = t[8];
this.uuidPropList = t[9];
this.uuidList = t[10];
};
e.reset = function() {
this.uuidList = null;
this.uuidObjList = null;
this.uuidPropList = null;
};
e.push = function(t, e, i) {
this.uuidObjList.push(t);
this.uuidPropList.push(e);
this.uuidList.push(i);
};
return t;
})();
y.pool = new n.default.Pool(function(t) {
t.reset();
}, 5);
y.pool.get = function() {
return this._get() || new y();
};
function E(t, e, i) {
for (var n = t.length - 1, r = 0, s = 3 * t[n]; r < s; r += 3) {
var a = t[r], o = e[t[r + 2]], c = t[r + 1];
c >= 0 ? a[i[c]] = o : a[~c] = o;
}
for (;r < n; r += 3) {
var u = e[t[r]], l = e[t[r + 2]], h = t[r + 1];
h >= 0 ? u[i[h]] = l : u[~h] = l;
}
}
function T(t, e) {
for (var i = t[4][e[0]], n = i[0], r = new (0, n[0])(), s = n[1], a = n[2], o = i[i.length - 1], c = 1; c < o; ++c) r[s[i[c]]] = e[c];
for (;c < e.length; ++c) {
var u = s[i[c]], l = n[i[c] + a];
(0, R[l])(t, r, u, e[c]);
}
return r;
}
function C(t, e, i) {
var r = new e();
r._deserialize ? r._deserialize(i, t[0]) : cc.errorID(5303, n.default.getClassName(e));
return r;
}
function A(t, e, i, n) {
n >= 0 ? e[i] = t[5][n] : t[7][3 * ~n] = e;
}
function S(t) {
return function(e, i, n, r) {
i[n] = r;
for (var s = 0; s < r.length; ++s) t(e, r, s, r[s]);
};
}
function x(t, e, i, n) {
e[i] = null;
t[8][n] = e;
}
function b(t, e, i, n) {
e[i] = T(t, n);
}
var R = new Array(13);
R[0] = function(t, e, i, n) {
e[i] = n;
};
R[1] = A;
R[2] = S(A);
R[3] = S(x);
R[4] = b;
R[5] = function(t, e, i, n) {
v[n[0]](e[i], n);
};
R[6] = x;
R[7] = function(t, e, i, n) {
e[i].set(n);
};
R[8] = function(t, e, i, n) {
var r = new d[n[0]]();
v[n[0]](r, n);
e[i] = r;
};
R[9] = S(b);
R[10] = function(t, e, i, n) {
var r = t[3][n[0]];
e[i] = C(t, r, n[1]);
};
R[11] = function(t, e, i, n) {
var r = n[0];
e[i] = r;
for (var s = 1; s < n.length; s += 3) {
var a = n[s], o = n[s + 1], c = n[s + 2];
(0, R[o])(t, r, a, c);
}
};
R[12] = function(t, e, i, n) {
var r = n[0];
e[i] = r;
for (var s = 0; s < r.length; ++s) {
var a = r[s], o = n[s + 1];
0 !== o && (0, R[o])(t, r, s, a);
}
};
function w(t) {
var e = t[5], i = t[6], n = 0 === i ? 0 : i.length, r = e[e.length - 1], s = e.length - n;
if ("number" != typeof r) r = 0; else {
r < 0 && (r = ~r);
--s;
}
for (var a = 0; a < s; ++a) e[a] = T(t, e[a]);
for (var o = t[3], c = 0; c < n; ++c, ++a) {
var u = i[c], l = e[a];
if (u >= 0) {
var h = o[u];
e[a] = C(t, h, l);
} else (0, R[u = ~u])(t, e, a, l);
}
return r;
}
function O(t, e) {
t || N.reportMissingClass(e);
return Object;
}
function I(t, e, i, n, r, s) {
var a = t(e);
if (!a) {
if (r) {
i[n] = (function(e, i, n) {
return function() {
var r = t(n) || O(s, n);
e[i] = r;
return new r();
};
})(i, n, e);
return;
}
a = O(s, e);
}
i[n] = a;
}
function D(t, e, i) {
for (var r = i || n.default._getClassById, s = t[3], a = 0; a < s.length; ++a) {
var o = s[a];
"string" != typeof o ? I(r, o[0], o, g, e, i) : I(r, o, s, a, e, i);
}
}
function M(t) {
var e = t[4];
if (e) for (var i = t[3], n = 0; n < e.length; ++n) {
var r = e[n];
r[0] = i[r[0]];
}
}
function L(t) {
for (var e = t[5], i = t[2], n = t[1], r = t[8], s = t[9], a = t[10], o = 0; o < r.length; ++o) {
var c = r[o];
"number" == typeof c && (r[o] = e[c]);
var u = s[o];
if ("number" == typeof u) {
u = u >= 0 ? i[u] : ~u;
s[o] = u;
}
var l = a[o];
"number" == typeof l && (a[o] = n[l]);
}
}
function N(t, e, i) {
"string" == typeof t && (t = JSON.parse(t));
var n = !e;
(e = e || y.pool.get()).init(t);
i = i || {};
var r = t[0], s = !1;
if ("object" == typeof r) {
s = r.preprocessed;
r = r.version;
}
if (r < 1) throw new Error(cc.debug.getError(5304, r));
i._version = r;
i.result = e;
t[0] = i;
if (!s) {
D(t, !1, i.classFinder);
M(t);
}
cc.game._isCloning = !0;
var a = t[5], o = w(t);
cc.game._isCloning = !1;
t[7] && E(t[7], a, t[2]);
L(t);
n && y.pool.put(e);
return a[o];
}
N.Details = y;
var P = function(t) {
this.preprocessed = !0;
this.version = t;
};
}), {
"../value-types/color": 210,
"../value-types/mat4": 213,
"../value-types/quat": 214,
"../value-types/rect": 215,
"../value-types/size": 216,
"../value-types/vec2": 220,
"../value-types/vec3": 221,
"../value-types/vec4": 222,
"./js": 149
} ],
144: [ (function(t) {
"use strict";
var e, i = (e = t("./deserialize-compiled")) && e.__esModule ? e : {
default: e
};
i.default.reportMissingClass = function(t) {
cc.warnID(5302, t);
};
cc.deserialize = i.default;
}), {
"./deserialize-compiled": 143,
"./deserialize-editor": void 0
} ],
145: [ (function(t, e) {
"use strict";
var i = ".";
function n(t) {
this.id = 0 | 998 * Math.random();
this.prefix = t ? t + i : "";
}
n.prototype.getNewId = function() {
return this.prefix + ++this.id;
};
n.global = new n("global");
e.exports = n;
}), {} ],
146: [ (function(t) {
"use strict";
t("./js");
t("./CCClass");
t("./CCClassDecorator");
t("./CCEnum");
t("./CCObject");
t("./callbacks-invoker");
t("./deserialize");
t("./instantiate");
t("./instantiate-jit");
t("./requiring-frame");
t("./CCSys");
t("./CCMacro");
t("./CCVisibleRect");
}), {
"./CCClass": 128,
"./CCClassDecorator": 129,
"./CCEnum": 130,
"./CCMacro": 133,
"./CCObject": 134,
"./CCSys": 137,
"./CCVisibleRect": 139,
"./callbacks-invoker": 141,
"./deserialize": 144,
"./instantiate": 148,
"./instantiate-jit": 147,
"./js": 149,
"./requiring-frame": 151
} ],
147: [ (function(t, e) {
"use strict";
var i = t("./CCObject"), n = i.Flags.Destroyed, r = i.Flags.PersistentMask, s = t("./attribute"), a = t("./js"), o = t("./CCClass"), c = t("./compiler"), u = s.DELIMETER + "default", l = o.IDENTIFIER_RE, h = o.escapeForJS, f = "var ", _ = "o", d = "t", p = {
"cc.Node": "cc.Node",
"cc.Sprite": "cc.Sprite",
"cc.Label": "cc.Label",
"cc.Button": "cc.Button",
"cc.Widget": "cc.Widget",
"cc.Animation": "cc.Animation",
"cc.ClickEvent": !1,
"cc.PrefabInfo": !1
};
try {
!Float32Array.name && (Float32Array.name = "Float32Array");
!Float64Array.name && (Float64Array.name = "Float64Array");
!Int8Array.name && (Int8Array.name = "Int8Array");
!Int16Array.name && (Int16Array.name = "Int16Array");
!Int32Array.name && (Int32Array.name = "Int32Array");
!Uint8Array.name && (Uint8Array.name = "Uint8Array");
!Uint16Array.name && (Uint16Array.name = "Uint16Array");
!Uint32Array.name && (Uint32Array.name = "Uint32Array");
!Uint8ClampedArray.name && (Uint8ClampedArray.name = "Uint8ClampedArray");
} catch (t) {}
function v(t) {
if (t === Float32Array) return "Float32Array";
if (t === Float64Array) return "Float64Array";
if (t === Int8Array) return "Int8Array";
if (t === Int16Array) return "Int16Array";
if (t === Int32Array) return "Int32Array";
if (t === Uint8Array) return "Uint8Array";
if (t === Uint16Array) return "Uint16Array";
if (t === Uint32Array) return "Uint32Array";
if (t === Uint8ClampedArray) return "Uint8ClampedArray";
throw new Error("Unknown TypedArray to instantiate: " + t);
}
function g(t, e) {
this.varName = t;
this.expression = e;
}
g.prototype.toString = function() {
return f + this.varName + "=" + this.expression + ";";
};
function m(t, e) {
return e instanceof g ? new g(e.varName, t + e.expression) : t + e;
}
function y(t, e, i) {
if (Array.isArray(i)) {
i[0] = m(e, i[0]);
t.push(i);
} else t.push(m(e, i) + ";");
}
function E(t) {
this._exps = [];
this._targetExp = t;
}
E.prototype.append = function(t, e) {
this._exps.push([ t, e ]);
};
E.prototype.writeCode = function(t) {
var e;
if (this._exps.length > 1) {
t.push(d + "=" + this._targetExp + ";");
e = d;
} else {
if (1 !== this._exps.length) return;
e = this._targetExp;
}
for (var i = 0; i < this._exps.length; i++) {
var n = this._exps[i];
y(t, e + C(n[0]) + "=", n[1]);
}
};
E.pool = new a.Pool(function(t) {
t._exps.length = 0;
t._targetExp = null;
}, 1);
E.pool.get = function(t) {
var e = this._get() || new E();
e._targetExp = t;
return e;
};
function T(t, e) {
if ("function" == typeof t) try {
t = t();
} catch (t) {
return !1;
}
if (t === e) return !0;
if (t && e && "object" == typeof t && "object" == typeof e && t.constructor === e.constructor) if (t instanceof cc.ValueType) {
if (t.equals(e)) return !0;
} else {
if (Array.isArray(t)) return 0 === t.length && 0 === e.length;
if (t.constructor === Object) return a.isEmptyObject(t) && a.isEmptyObject(e);
}
return !1;
}
function C(t) {
return l.test(t) ? "." + t : "[" + h(t) + "]";
}
function A(t, e) {
this.parent = e;
this.objsToClear_iN$t = [];
this.codeArray = [];
this.objs = [];
this.funcs = [];
this.funcModuleCache = a.createMap();
a.mixin(this.funcModuleCache, p);
this.globalVariables = [];
this.globalVariableId = 0;
this.localVariableId = 0;
this.codeArray.push(f + _ + "," + d + ";", "if(R){", _ + "=R;", "}else{", _ + "=R=new " + this.getFuncModule(t.constructor, !0) + "();", "}");
a.value(t, "_iN$t", {
globalVar: "R"
}, !0);
this.objsToClear_iN$t.push(t);
this.enumerateObject(this.codeArray, t);
var i;
this.globalVariables.length > 0 && (i = f + this.globalVariables.join(",") + ";");
var n = c.flattenCodeArray([ "return (function(R){", i || [], this.codeArray, "return o;", "})" ]);
this.result = Function("O", "F", n)(this.objs, this.funcs);
for (var r = 0, s = this.objsToClear_iN$t.length; r < s; ++r) this.objsToClear_iN$t[r]._iN$t = null;
this.objsToClear_iN$t.length = 0;
}
var S = A.prototype;
S.getFuncModule = function(t, e) {
var i = a.getClassName(t);
if (i) {
var n = this.funcModuleCache[i];
if (n) return n;
if (void 0 === n) {
var r = -1 !== i.indexOf(".");
if (r) try {
if (r = t === Function("return " + i)()) {
this.funcModuleCache[i] = i;
return i;
}
} catch (t) {}
}
}
var s = this.funcs.indexOf(t);
if (s < 0) {
s = this.funcs.length;
this.funcs.push(t);
}
var o = "F[" + s + "]";
e && (o = "(" + o + ")");
this.funcModuleCache[i] = o;
return o;
};
S.getObjRef = function(t) {
var e = this.objs.indexOf(t);
if (e < 0) {
e = this.objs.length;
this.objs.push(t);
}
return "O[" + e + "]";
};
S.setValueType = function(t, e, i, n) {
var r = E.pool.get(n), s = e.constructor.__props__;
s || (s = Object.keys(e));
for (var a = 0; a < s.length; a++) {
var o = s[a], c = i[o];
if (e[o] !== c) {
var u = this.enumerateField(i, o, c);
r.append(o, u);
}
}
r.writeCode(t);
E.pool.put(r);
};
S.enumerateCCClass = function(t, e, i) {
for (var n = i.__values__, r = s.getClassAttrs(i), a = 0; a < n.length; a++) {
var c = n[a], l = e[c], h = r[c + u];
if (!T(h, l)) if ("object" == typeof l && l instanceof cc.ValueType && (h = o.getDefault(h)) && h.constructor === l.constructor) {
var f = _ + C(c);
this.setValueType(t, h, l, f);
} else this.setObjProp(t, e, c, l);
}
};
S.instantiateArray = function(t) {
if (0 === t.length) return "[]";
var e = "a" + ++this.localVariableId, i = [ new g(e, "new Array(" + t.length + ")") ];
a.value(t, "_iN$t", {
globalVar: "",
source: i
}, !0);
this.objsToClear_iN$t.push(t);
for (var n = 0; n < t.length; ++n) y(i, e + "[" + n + "]=", this.enumerateField(t, n, t[n]));
return i;
};
S.instantiateTypedArray = function(t) {
var e = t.constructor.name || v(t.constructor);
if (0 === t.length) return "new " + e;
var i = "a" + ++this.localVariableId, n = [ new g(i, "new " + e + "(" + t.length + ")") ];
t._iN$t = {
globalVar: "",
source: n
};
this.objsToClear_iN$t.push(t);
for (var r = 0; r < t.length; ++r) 0 !== t[r] && y(n, i + "[" + r + "]=", t[r]);
return n;
};
S.enumerateField = function(t, e, n) {
if ("object" == typeof n && n) {
var s = n._iN$t;
if (s) {
var a = s.globalVar;
if (!a) {
a = s.globalVar = "v" + ++this.globalVariableId;
this.globalVariables.push(a);
var o = s.source[0];
s.source[0] = m(a + "=", o);
}
return a;
}
return ArrayBuffer.isView(n) ? this.instantiateTypedArray(n) : Array.isArray(n) ? this.instantiateArray(n) : this.instantiateObj(n);
}
if ("function" == typeof n) return this.getFuncModule(n);
if ("string" == typeof n) return h(n);
"_objFlags" === e && t instanceof i && (n &= r);
return n;
};
S.setObjProp = function(t, e, i, n) {
y(t, _ + C(i) + "=", this.enumerateField(e, i, n));
};
S.enumerateObject = function(t, e) {
var i = e.constructor;
if (cc.Class._isCCClass(i)) this.enumerateCCClass(t, e, i); else for (var n in e) if (e.hasOwnProperty(n) && (95 !== n.charCodeAt(0) || 95 !== n.charCodeAt(1) || "__type__" === n)) {
var r = e[n];
"object" == typeof r && r && r === e._iN$t || this.setObjProp(t, e, n, r);
}
};
S.instantiateObj = function(t) {
if (t instanceof cc.ValueType) return o.getNewValueTypeCode(t);
if (t instanceof cc.Asset) return this.getObjRef(t);
if (t._objFlags & n) return null;
var e, i = t.constructor;
if (cc.Class._isCCClass(i)) {
if (this.parent) if (this.parent instanceof cc.Component) {
if (t instanceof cc._BaseNode || t instanceof cc.Component) return this.getObjRef(t);
} else if (this.parent instanceof cc._BaseNode) if (t instanceof cc._BaseNode) {
if (!t.isChildOf(this.parent)) return this.getObjRef(t);
} else if (t instanceof cc.Component && !t.node.isChildOf(this.parent)) return this.getObjRef(t);
e = new g(_, "new " + this.getFuncModule(i, !0) + "()");
} else if (i === Object) e = new g(_, "{}"); else {
if (i) return this.getObjRef(t);
e = new g(_, "Object.create(null)");
}
var r = [ e ];
a.value(t, "_iN$t", {
globalVar: "",
source: r
}, !0);
this.objsToClear_iN$t.push(t);
this.enumerateObject(r, t);
return [ "(function(){", r, "return o;})();" ];
};
e.exports = {
compile: function(t) {
return new A(t, t instanceof cc._BaseNode && t).result;
},
equalsToDefault: T
};
}), {
"./CCClass": 128,
"./CCObject": 134,
"./attribute": 140,
"./compiler": 142,
"./js": 149
} ],
148: [ (function(t, e) {
"use strict";
var i = t("./CCObject"), n = t("../value-types/value-type"), r = i.Flags.Destroyed, s = i.Flags.PersistentMask, a = t("./utils").isDomNode, o = t("./js");
function c(t, e) {
if (!e) {
if ("object" != typeof t || Array.isArray(t)) return null;
if (!t) return null;
if (!cc.isValid(t)) return null;
}
var n;
if (t instanceof i) {
if (t._instantiate) {
cc.game._isCloning = !0;
n = t._instantiate(null, !0);
cc.game._isCloning = !1;
return n;
}
if (t instanceof cc.Asset) return null;
}
cc.game._isCloning = !0;
n = l(t);
cc.game._isCloning = !1;
return n;
}
var u = [];
function l(t, e) {
if (Array.isArray(t)) return null;
if (a && a(t)) return null;
var i;
f(t, i = t._iN$t ? t._iN$t : t.constructor ? new (0, t.constructor)() : Object.create(null), e);
for (var n = 0, r = u.length; n < r; ++n) u[n]._iN$t = null;
u.length = 0;
return i;
}
function h(t, e, i, r) {
for (var s = t.__values__, a = 0; a < s.length; a++) {
var o = s[a], c = e[o];
if ("object" == typeof c && c) {
var u = i[o];
u instanceof n && u.constructor === c.constructor ? u.set(c) : i[o] = c._iN$t || _(c, r);
} else i[o] = c;
}
}
function f(t, e, n) {
o.value(t, "_iN$t", e, !0);
u.push(t);
var r = t.constructor;
if (cc.Class._isCCClass(r)) h(r, t, e, n); else for (var a in t) if (t.hasOwnProperty(a) && (95 !== a.charCodeAt(0) || 95 !== a.charCodeAt(1) || "__type__" === a)) {
var c = t[a];
if ("object" == typeof c && c) {
if (c === e) continue;
e[a] = c._iN$t || _(c, n);
} else e[a] = c;
}
t instanceof i && (e._objFlags &= s);
}
function _(t, e) {
if (t instanceof n) return t.clone();
if (t instanceof cc.Asset) return t;
var i;
if (ArrayBuffer.isView(t)) {
var s = t.length;
i = new t.constructor(s);
t._iN$t = i;
u.push(t);
for (var a = 0; a < s; ++a) i[a] = t[a];
return i;
}
if (Array.isArray(t)) {
var c = t.length;
i = new Array(c);
o.value(t, "_iN$t", i, !0);
u.push(t);
for (var l = 0; l < c; ++l) {
var h = t[l];
i[l] = "object" == typeof h && h ? h._iN$t || _(h, e) : h;
}
return i;
}
if (t._objFlags & r) return null;
var d = t.constructor;
if (cc.Class._isCCClass(d)) {
if (e) if (e instanceof cc.Component) {
if (t instanceof cc._BaseNode || t instanceof cc.Component) return t;
} else if (e instanceof cc._BaseNode) if (t instanceof cc._BaseNode) {
if (!t.isChildOf(e)) return t;
} else if (t instanceof cc.Component && !t.node.isChildOf(e)) return t;
i = new d();
} else if (d === Object) i = {}; else {
if (d) return t;
i = Object.create(null);
}
f(t, i, e);
return i;
}
c._clone = l;
cc.instantiate = c;
e.exports = c;
}), {
"../value-types/value-type": 219,
"./CCObject": 134,
"./js": 149,
"./utils": 152
} ],
149: [ (function(t, e) {
"use strict";
var i = new (t("./id-generater"))("TmpCId.");
function n(t, e) {
for (;t; ) {
var i = Object.getOwnPropertyDescriptor(t, e);
if (i) return i;
t = Object.getPrototypeOf(t);
}
return null;
}
function r(t, e, i) {
var r = n(e, t);
Object.defineProperty(i, t, r);
}
var s = {
isNumber: function(t) {
return "number" == typeof t || t instanceof Number;
},
isString: function(t) {
return "string" == typeof t || t instanceof String;
},
addon: function(t) {
t = t || {};
for (var e = 1, i = arguments.length; e < i; e++) {
var n = arguments[e];
if (n) {
if ("object" != typeof n) {
cc.errorID(5402, n);
continue;
}
for (var s in n) s in t || r(s, n, t);
}
}
return t;
},
mixin: function(t) {
t = t || {};
for (var e = 1, i = arguments.length; e < i; e++) {
var n = arguments[e];
if (n) {
if ("object" != typeof n) {
cc.errorID(5403, n);
continue;
}
for (var s in n) r(s, n, t);
}
}
return t;
},
extend: function(t, e) {
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
t.prototype = Object.create(e.prototype, {
constructor: {
value: t,
writable: !0,
configurable: !0
}
});
return t;
},
getSuper: function(t) {
var e = t.prototype, i = e && Object.getPrototypeOf(e);
return i && i.constructor;
},
isChildClassOf: function(t, e) {
if (t && e) {
if ("function" != typeof t) return !1;
if ("function" != typeof e) return !1;
if (t === e) return !0;
for (;;) {
if (!(t = s.getSuper(t))) return !1;
if (t === e) return !0;
}
}
return !1;
},
clear: function(t) {
for (var e = Object.keys(t), i = 0; i < e.length; i++) delete t[e[i]];
},
isEmptyObject: function(t) {
for (var e in t) return !1;
return !0;
},
getPropertyDescriptor: n
}, a = {
value: void 0,
enumerable: !1,
writable: !1,
configurable: !0
};
s.value = function(t, e, i, n, r) {
a.value = i;
a.writable = n;
a.enumerable = r;
Object.defineProperty(t, e, a);
a.value = void 0;
};
var o = {
get: null,
set: null,
enumerable: !1
};
s.getset = function(t, e, i, n, r, s) {
if ("function" != typeof n) {
r = n;
n = void 0;
}
o.get = i;
o.set = n;
o.enumerable = r;
o.configurable = s;
Object.defineProperty(t, e, o);
o.get = null;
o.set = null;
};
var c = {
get: null,
enumerable: !1,
configurable: !1
};
s.get = function(t, e, i, n, r) {
c.get = i;
c.enumerable = n;
c.configurable = r;
Object.defineProperty(t, e, c);
c.get = null;
};
var u = {
set: null,
enumerable: !1,
configurable: !1
};
s.set = function(t, e, i, n, r) {
u.set = i;
u.enumerable = n;
u.configurable = r;
Object.defineProperty(t, e, u);
u.set = null;
};
s.getClassName = function(t) {
if ("function" == typeof t) {
var e = t.prototype;
if (e && e.hasOwnProperty("__classname__") && e.__classname__) return e.__classname__;
var i = "";
t.name && (i = t.name);
if (t.toString) {
var n, r = t.toString();
(n = "[" === r.charAt(0) ? r.match(/\[\w+\s*(\w+)\]/) : r.match(/function\s*(\w+)/)) && 2 === n.length && (i = n[1]);
}
return "Object" !== i ? i : "";
}
return t && t.constructor ? s.getClassName(t.constructor) : "";
};
(function() {
var t = {}, e = {};
function n(t, e, i) {
s.getset(s, e, (function() {
return Object.assign({}, i);
}), (function(t) {
s.clear(i);
Object.assign(i, t);
}));
return function(e, n) {
n.prototype.hasOwnProperty(t) && delete i[n.prototype[t]];
s.value(n.prototype, t, e);
if (e) {
var r = i[e];
if (r && r !== n) {
var a = "A Class already exists with the same " + t + ' : "' + e + '".';
cc.error(a);
} else i[e] = n;
}
};
}
s._setClassId = n("__cid__", "_registeredClassIds", t);
var r = n("__classname__", "_registeredClassNames", e);
s.setClassName = function(t, e) {
r(t, e);
if (!e.prototype.hasOwnProperty("__cid__")) {
var n = t || i.getNewId();
n && s._setClassId(n, e);
}
};
s.unregisterClass = function() {
for (var i = 0; i < arguments.length; i++) {
var n = arguments[i].prototype, r = n.__cid__;
r && delete t[r];
var s = n.__classname__;
s && delete e[s];
}
};
s._getClassById = function(e) {
return t[e];
};
s.getClassByName = function(t) {
return e[t];
};
s._getClassId = function(t, e) {
e = "undefined" == typeof e || e;
if ("function" == typeof t && t.prototype.hasOwnProperty("__cid__")) return t.prototype.__cid__;
if (t && t.constructor) {
var i = t.constructor.prototype;
if (i && i.hasOwnProperty("__cid__")) return t.__cid__;
}
return "";
};
})();
s.obsolete = function(t, e, i, n) {
var r = /([^.]+)$/, a = r.exec(e)[0], o = r.exec(i)[0];
function c() {
return this[o];
}
n ? s.getset(t, a, c, (function(t) {
this[o] = t;
})) : s.get(t, a, c);
};
s.obsoletes = function(t, e, i, n) {
for (var r in i) {
var a = i[r];
s.obsolete(t, e + "." + r, a, n);
}
};
var l = /(%d)|(%s)/, h = /%s/;
s.formatStr = function() {
var t = arguments.length;
if (0 === t) return "";
var e = arguments[0];
if (1 === t) return "" + e;
var i = "string" == typeof e && l.test(e);
if (i) for (var n = 1; n < t; ++n) {
var r = arguments[n], s = "number" == typeof r ? l : h;
if (s.test(e)) {
var a = "" + r;
e = e.replace(s, a);
} else e += " " + r;
} else for (var o = 1; o < t; ++o) e += " " + arguments[o];
return e;
};
s.shiftArguments = function() {
for (var t = arguments.length - 1, e = new Array(t), i = 0; i < t; ++i) e[i] = arguments[i + 1];
return e;
};
s.createMap = function(t) {
var e = Object.create(null);
if (t) {
e["."] = !0;
e["/"] = !0;
delete e["."];
delete e["/"];
}
return e;
};
function f(t, e) {
t.splice(e, 1);
}
function _(t, e) {
var i = t.indexOf(e);
if (i >= 0) {
f(t, i);
return !0;
}
return !1;
}
s.array = {
remove: _,
fastRemove: function(t, e) {
var i = t.indexOf(e);
if (i >= 0) {
t[i] = t[t.length - 1];
--t.length;
}
},
removeAt: f,
fastRemoveAt: function(t, e) {
var i = t.length;
if (!(e < 0 || e >= i)) {
t[e] = t[i - 1];
t.length = i - 1;
}
},
contains: function(t, e) {
return t.indexOf(e) >= 0;
},
verifyType: function(t, e) {
if (t && t.length > 0) for (var i = 0; i < t.length; i++) if (!(t[i] instanceof e)) {
cc.logID(1300);
return !1;
}
return !0;
},
removeArray: function(t, e) {
for (var i = 0, n = e.length; i < n; i++) _(t, e[i]);
},
appendObjectsAt: function(t, e, i) {
t.splice.apply(t, [ i, 0 ].concat(e));
return t;
},
copy: function(t) {
var e, i = t.length, n = new Array(i);
for (e = 0; e < i; e += 1) n[e] = t[e];
return n;
},
MutableForwardIterator: t("../utils/mutable-forward-iterator")
};
function d(t, e) {
if (void 0 === e) {
e = t;
t = null;
}
this.get = null;
this.count = 0;
this._pool = new Array(e);
this._cleanup = t;
}
d.prototype._get = function() {
if (this.count > 0) {
--this.count;
var t = this._pool[this.count];
this._pool[this.count] = null;
return t;
}
return null;
};
d.prototype.put = function(t) {
var e = this._pool;
if (this.count < e.length) {
if (this._cleanup && !1 === this._cleanup(t)) return;
e[this.count] = t;
++this.count;
}
};
d.prototype.resize = function(t) {
if (t >= 0) {
this._pool.length = t;
this.count > t && (this.count = t);
}
};
s.Pool = d;
cc.js = s;
e.exports = s;
}), {
"../utils/mutable-forward-iterator": 197,
"./id-generater": 145
} ],
150: [ (function(t, e, i) {
"use strict";
var n = t("./js"), r = t("./attribute"), s = {
default: {},
serializable: {},
editorOnly: {},
formerlySerializedAs: {}
};
function a(t, e, i, n) {
if (t.get || t.set) ; else if (t.hasOwnProperty("default")) {
var r = "_N$" + e;
t.get = function() {
return this[r];
};
t.set = function(t) {
var e = this[r];
this[r] = t;
i.call(this, e);
};
var a = {};
n[r] = a;
for (var o in s) {
var c = s[o];
if (t.hasOwnProperty(o)) {
a[o] = t[o];
c.canUsedInGet || delete t[o];
}
}
}
}
function o(t, e, i, n) {
if (Array.isArray(e)) {
if (!(e.length > 0)) return cc.errorID(5508, i, n);
t.type = e = e[0];
}
"function" == typeof e && (e === String ? t.type = cc.String : e === Boolean ? t.type = cc.Boolean : e === Number && (t.type = cc.Float));
}
function c(t, e, i) {
var n = t ? {
_short: !0
} : {
_short: !0,
default: e
};
i && (n.type = i);
return n;
}
i.getFullFormOfProperty = function(t, e) {
return t && t.constructor === Object ? null : Array.isArray(t) && t.length > 0 ? c(e, [], t) : "function" == typeof t ? c(e, n.isChildClassOf(t, cc.ValueType) ? new t() : null, t) : t instanceof r.PrimitiveType ? c(e, t.default) : c(e, t);
};
i.preprocessAttrs = function(t, e) {
for (var n in t) {
var r = t[n], s = i.getFullFormOfProperty(r, !1);
s && (r = t[n] = s);
if (r) {
var c = r.notify;
c && a(r, n, c, t);
"type" in r && o(r, r.type, e, n);
}
}
};
i.validateMethodWithProps = function(t) {
return "function" == typeof t || null === t;
};
}), {
"./CCClass": 128,
"./attribute": 140,
"./js": 149
} ],
151: [ (function() {
"use strict";
var t = [];
cc._RF = {
push: function(e, i, n) {
if (void 0 === n) {
n = i;
i = "";
}
t.push({
uuid: i,
script: n,
module: e,
exports: e.exports,
beh: null
});
},
pop: function() {
var e = t.pop(), i = e.module, n = i.exports;
if (n === e.exports) {
for (var r in n) return;
i.exports = n = e.cls;
}
},
peek: function() {
return t[t.length - 1];
}
};
}), {} ],
152: [ (function(t, e) {
"use strict";
t("./js");
e.exports = {
contains: function(t, e) {
if ("function" == typeof t.contains) return t.contains(e);
if ("function" == typeof t.compareDocumentPosition) return !!(16 & t.compareDocumentPosition(e));
var i = e.parentNode;
if (i) do {
if (i === t) return !0;
i = i.parentNode;
} while (null !== i);
return !1;
},
isDomNode: "object" == typeof window && ("function" == typeof Node ? function(t) {
return t instanceof Node;
} : function(t) {
return t && "object" == typeof t && "number" == typeof t.nodeType && "string" == typeof t.nodeName;
}),
callInNextTick: function(t, e, i) {
t && setTimeout((function() {
t(e, i);
}), 0);
}
};
}), {
"./js": 149
} ],
153: [ (function(t) {
"use strict";
t("./platform/js");
t("./value-types");
t("./utils");
t("./platform/CCInputManager");
t("./platform/CCInputExtension");
t("./event");
t("./platform/CCSys");
t("./platform/CCMacro");
t("./asset-manager");
t("./CCDirector");
t("./renderer");
t("./platform/CCView");
t("./platform/CCScreen");
t("./CCScheduler");
t("./event-manager");
}), {
"./CCDirector": 23,
"./CCScheduler": 28,
"./asset-manager": 46,
"./event": 120,
"./event-manager": 116,
"./platform/CCInputExtension": 131,
"./platform/CCInputManager": 132,
"./platform/CCMacro": 133,
"./platform/CCScreen": 136,
"./platform/CCSys": 137,
"./platform/CCView": 138,
"./platform/js": 149,
"./renderer": 159,
"./utils": 195,
"./value-types": 211
} ],
154: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = a(t("./assembler")), r = a(t("./utils/dynamic-atlas/manager")), s = a(t("./webgl/render-data"));
t("../value-types");
function a(t) {
return t && t.__esModule ? t : {
default: t
};
}
function o(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function c(t, e, i) {
e && o(t.prototype, e);
i && o(t, i);
return t;
}
function u(t) {
if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
return t;
}
function l(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var h = (function(t) {
l(e, t);
function e() {
var e;
(e = t.call(this) || this)._renderData = new s.default();
e._renderData.init(u(e));
e.initData();
e.initLocal();
return e;
}
var i = e.prototype;
i.initData = function() {
this._renderData.createQuadData(0, this.verticesFloats, this.indicesCount);
};
i.initLocal = function() {
this._local = [];
this._local.length = 4;
};
i.updateColor = function(t, e) {
var i = this._renderData.uintVDatas[0];
if (i) {
e = null != e ? e : t.node.color._val;
for (var n = this.floatsPerVert, r = this.colorOffset, s = i.length; r < s; r += n) i[r] = e;
}
};
i.getBuffer = function() {
return cc.renderer._handle._meshBuffer;
};
i.updateWorldVerts = function(t) {
var e = this._local, i = this._renderData.vDatas[0], n = t.node._worldMatrix.m, r = n[0], s = n[1], a = n[4], o = n[5], c = n[12], u = n[13], l = e[0], h = e[2], f = e[1], _ = e[3], d = this.floatsPerVert, p = 0;
if (1 === r && 0 === s && 0 === a && 1 === o) {
i[p] = l + c;
i[p + 1] = f + u;
i[p += d] = h + c;
i[p + 1] = f + u;
i[p += d] = l + c;
i[p + 1] = _ + u;
i[p += d] = h + c;
i[p + 1] = _ + u;
} else {
var v = r * l, g = r * h, m = s * l, y = s * h, E = a * f, T = a * _, C = o * f, A = o * _;
i[p] = v + E + c;
i[p + 1] = m + C + u;
i[p += d] = g + E + c;
i[p + 1] = y + C + u;
i[p += d] = v + T + c;
i[p + 1] = m + A + u;
i[p += d] = g + T + c;
i[p + 1] = y + A + u;
}
};
i.fillBuffers = function(t, e) {
e.worldMatDirty && this.updateWorldVerts(t);
var i = this._renderData, n = i.vDatas[0], r = i.iDatas[0], s = this.getBuffer(e), a = s.request(this.verticesCount, this.indicesCount), o = a.byteOffset >> 2, c = s._vData;
n.length + o > c.length ? c.set(n.subarray(0, c.length - o), o) : c.set(n, o);
for (var u = s._iData, l = a.indiceOffset, h = a.vertexOffset, f = 0, _ = r.length; f < _; f++) u[l++] = h + r[f];
};
i.packToDynamicAtlas = function(t, e) {
if (!e._original && r.default && e._texture.packable) {
var i = r.default.insertSpriteFrame(e);
i && e._setDynamicAtlasFrame(i);
}
var n = t._materials[0];
if (n && n.getProperty("texture") !== e._texture) {
t._vertsDirty = !0;
t._updateMaterial();
}
};
c(e, [ {
key: "verticesFloats",
get: function() {
return this.verticesCount * this.floatsPerVert;
}
} ]);
return e;
})(n.default);
i.default = h;
cc.js.addon(h.prototype, {
floatsPerVert: 5,
verticesCount: 4,
indicesCount: 6,
uvOffset: 2,
colorOffset: 4
});
cc.Assembler2D = h;
e.exports = i.default;
}), {
"../value-types": 211,
"./assembler": 156,
"./utils/dynamic-atlas/manager": void 0,
"./webgl/render-data": 185
} ],
155: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n, r = (n = t("../utils/pool")) && n.__esModule ? n : {
default: n
};
function s(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var a = 0;
function o(t) {
Object.getOwnPropertyDescriptor(t, "__assemblerId__") || (t.__assemblerId__ = ++a);
return t.__assemblerId__;
}
var c = new (function(t) {
s(e, t);
function e() {
for (var e, i = arguments.length, n = new Array(i), r = 0; r < i; r++) n[r] = arguments[r];
(e = t.call.apply(t, [ this ].concat(n)) || this)._pool = {};
return e;
}
var i = e.prototype;
i.put = function(t) {
if (t) if (this.enabled) {
var e = o(t.constructor), i = this._pool;
i[e] || (i[e] = []);
if (!(this.count > this.maxSize)) {
this._clean(t);
i[e].push(t);
this.count++;
}
} else t.destroy && t.destroy();
};
i.get = function(t) {
var e;
if (this.enabled) {
var i = this._pool, n = o(t);
e = i[n] && i[n].pop();
}
e ? this.count-- : e = new t();
return e;
};
i.clear = function() {
var t = this._pool;
for (var e in t) {
var i = t[e];
if (i) for (var n = 0; n < i.length; n++) i[n].destroy && i[n].destroy();
}
this._pool = {};
this.count = 0;
};
i._clean = function(t) {
t.reset();
t._renderComp = null;
};
return e;
}(r.default))();
r.default.register("assembler", c);
var u = c;
i.default = u;
e.exports = i.default;
}), {
"../utils/pool": 198
} ],
156: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n, r = t("./webgl/vertex-format"), s = (n = t("./assembler-pool")) && n.__esModule ? n : {
default: n
}, a = (function() {
function t() {
this._extendNative && this._extendNative();
}
var e = t.prototype;
e.init = function(t) {
this._renderComp = t;
};
e.updateRenderData = function() {};
e.fillBuffers = function() {};
e.getVfmt = function() {
return r.vfmtPosUvColor;
};
return t;
})();
i.default = a;
a.register = function(t, e) {
t.__assembler__ = e;
};
a.init = function(t) {
for (var e = t.constructor, i = e.__assembler__; !i; ) {
if (!(e = e.$super)) {
cc.warn("Can not find assembler for render component : [" + cc.js.getClassName(t) + "]");
return;
}
i = e.__assembler__;
}
i.getConstructor && (i = i.getConstructor(t));
if (!t._assembler || t._assembler.constructor !== i) {
var n = s.default.get(i);
n.init(t);
t._assembler = n;
}
};
cc.Assembler = a;
e.exports = i.default;
}), {
"./assembler-pool": 155,
"./webgl/vertex-format": 186
} ],
157: [ (function(t, e) {
"use strict";
var i = function(t) {
var e;
try {
e = t.getContext("2d");
} catch (t) {
console.error(t);
return;
}
this._canvas = t;
this._ctx = e;
this._caps = {};
this._stats = {
drawcalls: 0
};
this._vx = this._vy = this._vw = this._vh = 0;
this._sx = this._sy = this._sw = this._sh = 0;
};
i.prototype._restoreTexture = function() {};
i.prototype.setViewport = function(t, e, i, n) {
if (this._vx !== t || this._vy !== e || this._vw !== i || this._vh !== n) {
this._vx = t;
this._vy = e;
this._vw = i;
this._vh = n;
}
};
i.prototype.setScissor = function(t, e, i, n) {
if (this._sx !== t || this._sy !== e || this._sw !== i || this._sh !== n) {
this._sx = t;
this._sy = e;
this._sw = i;
this._sh = n;
}
};
i.prototype.clear = function(t) {
var e = this._ctx;
e.clearRect(this._vx, this._vy, this._vw, this._vh);
if (t && (0 !== t[0] || 0 !== t[1] || 0 !== t[2])) {
e.fillStyle = "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")";
e.globalAlpha = t[3];
e.fillRect(this._vx, this._vy, this._vw, this._vh);
}
};
i.prototype.resetDrawCalls = function() {
this._stats.drawcalls = 0;
};
i.prototype.getDrawCalls = function() {
return this._stats.drawcalls;
};
e.exports = i;
}), {} ],
158: [ (function(t, e) {
"use strict";
var i = function(t, e) {
this._device = t;
this._width = 4;
this._height = 4;
this._image = null;
if (e) {
void 0 !== e.width && (this._width = e.width);
void 0 !== e.height && (this._height = e.height);
this.updateImage(e);
}
};
i.prototype.update = function(t) {
this.updateImage(t);
};
i.prototype.updateImage = function(t) {
if (t.images && t.images[0]) {
var e = t.images[0];
e && e !== this._image && (this._image = e);
}
};
i.prototype.destroy = function() {
this._image = null;
};
e.exports = i;
}), {} ],
159: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = a(t("../../renderer/gfx")), r = a(t("../../renderer/core/input-assembler")), s = a(t("../../renderer/core/pass"));
function a(t) {
return t && t.__esModule ? t : {
default: t
};
}
var o = cc.renderer = {
Texture2D: null,
InputAssembler: r.default,
Pass: s.default,
renderEngine: null,
canvas: null,
device: null,
scene: null,
drawCalls: 0,
_handle: null,
_cameraNode: null,
_camera: null,
_forward: null,
_flow: null,
initWebGL: function(e) {
t("./webgl/assemblers");
t("./webgl/model-batcher");
this.Texture2D = n.default.Texture2D;
this.canvas = e;
this._flow = cc.RenderFlow;
this.device = n.default.Device.getInstance();
this.scene = new renderer.Scene();
var i, r = (i = this.device, {
defaultTexture: new n.default.Texture2D(i, {
images: [],
width: 128,
height: 128,
wrapS: n.default.WRAP_REPEAT,
wrapT: n.default.WRAP_REPEAT,
format: n.default.TEXTURE_FMT_RGB8,
genMipmaps: !1
}),
programTemplates: [],
programChunks: {}
});
this._forward = new renderer.ForwardRenderer(this.device, r);
var s = new renderer.RenderFlow(this.device, this.scene, this._forward);
this._flow.init(s);
},
initCanvas: function(e) {
var i = t("./canvas"), n = t("./canvas/Texture2D"), r = t("./canvas/Device");
this.Device = r;
this.Texture2D = n;
this.canvas = e;
this.device = new r(e);
this._camera = {
a: 1,
b: 0,
c: 0,
d: 1,
tx: 0,
ty: 0
};
this._handle = new i.RenderComponentHandle(this.device, this._camera);
this._forward = new i.ForwardRenderer();
this._flow = cc.RenderFlow;
this._flow.init(this._handle, this._forward);
},
updateCameraViewport: function() {
if (cc.director) {
var t = cc.director.getScene();
t && t.setScale(1, 1, 1);
}
if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
var e = cc.view.getViewportRect();
this.device.setViewport(e.x, e.y, e.width, e.height);
this._camera.a = cc.view.getScaleX();
this._camera.d = cc.view.getScaleY();
this._camera.tx = e.x;
this._camera.ty = e.y + e.height;
}
},
render: function(t, e) {
this.device.resetDrawCalls();
if (t) {
this._flow.render(t, e);
this.drawCalls = this.device.getDrawCalls();
}
},
clear: function() {
this._handle.reset();
this._forward.clear();
}
};
i.default = o;
e.exports = i.default;
}), {
"../../renderer/core/input-assembler": 227,
"../../renderer/core/pass": 228,
"../../renderer/gfx": 231,
"../../renderer/renderers/forward-renderer": void 0,
"../../renderer/scene/scene": void 0,
"./canvas": void 0,
"./canvas/Device": 157,
"./canvas/Texture2D": 158,
"./webgl/assemblers": 169,
"./webgl/model-batcher": void 0
} ],
160: [ (function(t, e) {
"use strict";
var i, n, r = 0, s = 1 << r++, a = 1 << r++, o = 1 << r++, c = 1 << r++, u = o | c, l = 1 << r++, h = 1 << r++, f = 1 << r++, _ = h | f, d = 1 << r++, p = 1 << r++, v = 1 << r++, g = 1 << r++, m = 0;
function y() {
this._func = x;
this._next = null;
}
var E = y.prototype;
E._doNothing = function() {};
E._localTransform = function(t) {
t._updateLocalMatrix();
t._renderFlag &= ~o;
this._next._func(t);
};
E._worldTransform = function(t) {
i.worldMatDirty++;
var e = t._matrix, n = t._trs, r = e.m;
r[12] = n[0];
r[13] = n[1];
r[14] = n[2];
t._mulMat(t._worldMatrix, t._parent._worldMatrix, e);
t._renderFlag &= ~c;
this._next._func(t);
i.worldMatDirty--;
};
E._opacity = function(t) {
i.parentOpacityDirty++;
this._next._func(t);
t._renderFlag &= ~h;
i.parentOpacityDirty--;
};
E._color = function(t) {
var e = t._renderComponent;
e && e._updateColor();
t._renderFlag &= ~f;
this._next._func(t);
};
E._updateRenderData = function(t) {
var e = t._renderComponent;
e._assembler.updateRenderData(e);
t._renderFlag &= ~l;
this._next._func(t);
};
E._render = function(t) {
var e = t._renderComponent;
e._checkBacth(i, t._cullingMask);
e._assembler.fillBuffers(e, i);
this._next._func(t);
};
E._children = function(t) {
for (var e = m, n = i, r = n.parentOpacity, s = n.parentOpacity *= t._opacity / 255, a = (n.worldMatDirty ? c : 0) | (n.parentOpacityDirty ? _ : 0), o = t._children, u = 0, l = o.length; u < l; u++) {
var h = o[u];
h._renderFlag |= a;
if (h._activeInHierarchy && 0 !== h._opacity) {
m = h._cullingMask = 0 === h.groupIndex ? e : 1 << h.groupIndex;
var f = h._color._val;
h._color._fastSetA(h._opacity * s);
C[h._renderFlag]._func(h);
h._color._val = f;
}
}
n.parentOpacity = r;
this._next._func(t);
};
E._postRender = function(t) {
var e = t._renderComponent;
e._checkBacth(i, t._cullingMask);
e._assembler.postFillBuffers(e, i);
this._next._func(t);
};
var T = new y();
T._func = T._doNothing;
T._next = T;
var C = {};
function A(t, e) {
var i = new y();
i._next = e || T;
switch (t) {
case s:
case a:
i._func = i._doNothing;
break;

case o:
i._func = i._localTransform;
break;

case c:
i._func = i._worldTransform;
break;

case h:
i._func = i._opacity;
break;

case f:
i._func = i._color;
break;

case l:
i._func = i._updateRenderData;
break;

case d:
i._func = i._render;
break;

case p:
i._func = i._children;
break;

case v:
i._func = i._postRender;
}
return i;
}
function S(t) {
for (var e = null, i = g; i > 0; ) {
i & t && (e = A(i, e));
i >>= 1;
}
return e;
}
function x(t) {
var e = t._renderFlag;
(C[e] = S(e))._func(t);
}
y.flows = C;
y.createFlow = A;
var b = [];
y.registerValidate = function(t) {
if (!t._inValidateList) {
b.push(t);
t._inValidateList = !0;
}
};
y.validateRenderers = function() {
for (var t = 0, e = b.length; t < e; t++) {
var i = b[t];
if (i.isValid) {
i.enabledInHierarchy ? i._validateRender() : i.disableRender();
i._inValidateList = !1;
}
}
b.length = 0;
};
y.visitRootNode = function(t) {
y.validateRenderers();
var e = m;
m = t._cullingMask;
if (t._renderFlag & c) {
i.worldMatDirty++;
t._calculWorldMatrix();
t._renderFlag &= ~c;
C[t._renderFlag]._func(t);
i.worldMatDirty--;
} else C[t._renderFlag]._func(t);
m = e;
};
y.render = function(t, e) {
i.reset();
i.walking = !0;
y.visitRootNode(t);
i.terminate();
i.walking = !1;
n.render(i._renderScene, e);
};
y.renderCamera = function(t, e) {
i.reset();
i.walking = !0;
y.visitRootNode(e);
i.terminate();
i.walking = !1;
n.renderCamera(t, i._renderScene);
};
y.init = function(t, e) {
i = t;
n = e;
C[0] = T;
for (var r = 1; r < g; r++) C[r] = new y();
};
y.getBachther = function() {
return i;
};
y.FLAG_DONOTHING = s;
y.FLAG_BREAK_FLOW = a;
y.FLAG_LOCAL_TRANSFORM = o;
y.FLAG_WORLD_TRANSFORM = c;
y.FLAG_TRANSFORM = u;
y.FLAG_OPACITY = h;
y.FLAG_COLOR = f;
y.FLAG_OPACITY_COLOR = _;
y.FLAG_UPDATE_RENDER_DATA = l;
y.FLAG_RENDER = d;
y.FLAG_CHILDREN = p;
y.FLAG_POST_RENDER = v;
y.FLAG_FINAL = g;
e.exports = cc.RenderFlow = y;
}), {} ],
161: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n, r = (n = t("../../assembler-2d")) && n.__esModule ? n : {
default: n
};
function s(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var a = t("../../../utils/text-utils"), o = t("../../../platform/CCMacro"), c = t("../../../components/CCLabel").Overflow, u = t("../utils").shareLabelInfo, l = function() {
this.char = "";
this.valid = !0;
this.x = 0;
this.y = 0;
this.line = 0;
this.hash = "";
}, h = cc.rect(), f = null, _ = [], d = [], p = [], v = [], g = null, m = 0, y = 0, E = 0, T = 0, C = 0, A = 1, S = null, x = cc.size(), b = "", R = 0, w = 0, O = 0, I = 0, D = 0, M = 0, L = 0, N = !1, P = 0, F = 0, B = 0, z = (function(t) {
s(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i.updateRenderData = function(t) {
if (t._vertsDirty && f !== t) {
f = t;
this._reserveQuads(t, t.string.toString().length);
this._updateFontFamily(t);
this._updateProperties(t);
this._updateLabelInfo(t);
this._updateContent();
this.updateWorldVerts(t);
f._actualFontSize = R;
f.node.setContentSize(x);
f._vertsDirty = !1;
f = null;
this._resetProperties();
}
};
i._updateFontScale = function() {
A = R / w;
};
i._updateFontFamily = function(t) {
var e = t.font;
S = e.spriteFrame;
g = e._fntConfig;
u.fontAtlas = e._fontDefDictionary;
this.packToDynamicAtlas(t, S);
};
i._updateLabelInfo = function() {
u.hash = "";
u.margin = 0;
};
i._updateProperties = function(t) {
b = t.string.toString();
R = t.fontSize;
w = g ? g.fontSize : t.fontSize;
O = t.horizontalAlign;
I = t.verticalAlign;
D = t.spacingX;
L = t.overflow;
M = t._lineHeight;
x.width = t.node.width;
x.height = t.node.height;
if (L === c.NONE) {
N = !1;
x.width += 2 * u.margin;
x.height += 2 * u.margin;
} else if (L === c.RESIZE_HEIGHT) {
N = !0;
x.height += 2 * u.margin;
} else N = t.enableWrapText;
u.lineHeight = M;
u.fontSize = R;
this._setupBMFontOverflowMetrics();
};
i._resetProperties = function() {
g = null;
S = null;
u.hash = "";
u.margin = 0;
};
i._updateContent = function() {
this._updateFontScale();
this._computeHorizontalKerningForText();
this._alignText();
};
i._computeHorizontalKerningForText = function() {
var t, e = b, i = e.length, n = _;
g && (t = g.kerningDict);
if (t && !cc.js.isEmptyObject(t)) for (var r = -1, s = 0; s < i; ++s) {
var a = e.charCodeAt(s), o = t[r << 16 | 65535 & a] || 0;
n[s] = s < i - 1 ? o : 0;
r = a;
} else n.length = 0;
};
i._multilineTextWrap = function(t) {
for (var e = b.length, i = 0, n = 0, r = 0, s = 0, o = 0, l = 0, h = 0, f = null, d = cc.v2(0, 0), v = 0; v < e; ) {
var E = b.charAt(v);
if ("\n" !== E) {
for (var S = t(b, v, e), R = l, w = h, O = o, I = n, z = !1, U = 0; U < S; ++U) {
var k = v + U;
if ("\r" !== (E = b.charAt(k))) if (f = u.fontAtlas.getLetterDefinitionForChar(E, u)) {
var V = I + f.offsetX * A - u.margin;
if (N && B > 0 && n > 0 && V + f.w * A > B && !a.isUnicodeSpace(E)) {
p.push(o);
o = 0;
i++;
n = 0;
r -= M * this._getFontScale() + 0;
z = !0;
break;
}
d.x = V;
d.y = r - f.offsetY * A + u.margin;
this._recordLetterInfo(d, E, k, i);
k + 1 < _.length && k < e - 1 && (I += _[k + 1]);
I += f.xAdvance * A + D - 2 * u.margin;
O = d.x + f.w * A - u.margin;
R < d.y && (R = d.y);
w > d.y - f.h * A && (w = d.y - f.h * A);
} else {
this._recordPlaceholderInfo(k, E);
var H = "";
g && (H = g.atlasName);
console.log("Can't find letter definition in texture atlas " + H + " for letter:" + E);
} else this._recordPlaceholderInfo(k, E);
}
if (!z) {
n = I;
l < R && (l = R);
h > w && (h = w);
s < (o = O) && (s = o);
v += S;
}
} else {
p.push(o);
o = 0;
i++;
n = 0;
r -= M * this._getFontScale() + 0;
this._recordPlaceholderInfo(v, E);
v++;
}
}
p.push(o);
y = (m = i + 1) * M * this._getFontScale();
m > 1 && (y += 0 * (m - 1));
x.width = P;
x.height = F;
P <= 0 && (x.width = parseFloat(s.toFixed(2)) + 2 * u.margin);
F <= 0 && (x.height = parseFloat(y.toFixed(2)) + 2 * u.margin);
T = x.height;
C = 0;
if (L !== c.CLAMP) {
l > 0 && (T = x.height + l);
h < -y && (C = y + h);
}
return !0;
};
i._getFirstCharLen = function() {
return 1;
};
i._getFontScale = function() {
return L === c.SHRINK ? A : 1;
};
i._getFirstWordLen = function(t, e, i) {
var n = t.charAt(e);
if (a.isUnicodeCJK(n) || "\n" === n || a.isUnicodeSpace(n)) return 1;
var r = 1, s = u.fontAtlas.getLetterDefinitionForChar(n, u);
if (!s) return r;
for (var o = s.xAdvance * A + D, c = e + 1; c < i; ++c) {
n = t.charAt(c);
if (!(s = u.fontAtlas.getLetterDefinitionForChar(n, u))) break;
if (o + s.offsetX * A + s.w * A > B && !a.isUnicodeSpace(n) && B > 0) return r;
o += s.xAdvance * A + D;
if ("\n" === n || a.isUnicodeSpace(n) || a.isUnicodeCJK(n)) break;
r++;
}
return r;
};
i._multilineTextWrapByWord = function() {
return this._multilineTextWrap(this._getFirstWordLen);
};
i._multilineTextWrapByChar = function() {
return this._multilineTextWrap(this._getFirstCharLen);
};
i._recordPlaceholderInfo = function(t, e) {
if (t >= d.length) {
var i = new l();
d.push(i);
}
d[t].char = e;
d[t].hash = e.charCodeAt(0) + u.hash;
d[t].valid = !1;
};
i._recordLetterInfo = function(t, e, i, n) {
if (i >= d.length) {
var r = new l();
d.push(r);
}
var s = e.charCodeAt(0) + u.hash;
d[i].line = n;
d[i].char = e;
d[i].hash = s;
d[i].valid = u.fontAtlas.getLetter(s).valid;
d[i].x = t.x;
d[i].y = t.y;
};
i._alignText = function() {
y = 0;
p.length = 0;
this._multilineTextWrapByWord();
this._computeAlignmentOffset();
L === c.SHRINK && R > 0 && this._isVerticalClamp() && this._shrinkLabelToContentSize(this._isVerticalClamp);
this._updateQuads() || L === c.SHRINK && this._shrinkLabelToContentSize(this._isHorizontalClamp);
};
i._scaleFontSizeDown = function(t) {
var e = !0;
if (!t) {
t = .1;
e = !1;
}
R = t;
e && this._updateContent();
};
i._shrinkLabelToContentSize = function(t) {
for (var e = 0, i = 0 | R, n = 0; e < i; ) {
var r = n = e + i + 1 >> 1;
if (r <= 0) break;
A = r / w;
this._multilineTextWrapByWord();
this._computeAlignmentOffset();
t() ? i = n - 1 : e = n;
}
var s = e;
s >= 0 && this._scaleFontSizeDown(s);
};
i._isVerticalClamp = function() {
return y > x.height;
};
i._isHorizontalClamp = function() {
for (var t = !1, e = 0, i = b.length; e < i; ++e) {
var n = d[e];
if (n.valid) {
var r = u.fontAtlas.getLetter(n.hash), s = n.x + r.w * A, a = n.line;
if (P > 0) if (N) {
if (p[a] > x.width && (s > x.width || s < 0)) {
t = !0;
break;
}
} else if (s > x.width) {
t = !0;
break;
}
}
}
return t;
};
i._isHorizontalClamped = function(t, e) {
var i = p[e], n = t > x.width || t < 0;
return N ? i > x.width && n : n;
};
i._updateQuads = function() {
var t = S ? S._texture : u.fontAtlas.getTexture(), e = f.node;
this.verticesCount = this.indicesCount = 0;
this._renderData && (this._renderData.dataLength = 0);
for (var i = x, n = e._anchorPoint.x * i.width, r = e._anchorPoint.y * i.height, s = !0, a = 0, o = b.length; a < o; ++a) {
var l = d[a];
if (l.valid) {
var _ = u.fontAtlas.getLetter(l.hash);
h.height = _.h;
h.width = _.w;
h.x = _.u;
h.y = _.v;
var p = l.y + E;
if (F > 0) {
if (p > T) {
var g = p - T;
h.y += g;
h.height -= g;
p -= g;
}
p - _.h * A < C && L === c.CLAMP && (h.height = p < C ? 0 : (p - C) / A);
}
var m = l.line, y = l.x + _.w / 2 * A + v[m];
if (P > 0 && this._isHorizontalClamped(y, m)) if (L === c.CLAMP) h.width = 0; else if (L === c.SHRINK) {
if (x.width > _.w) {
s = !1;
break;
}
h.width = 0;
}
if (h.height > 0 && h.width > 0) {
var R = this._determineRect(h), w = l.x + v[l.line];
this.appendQuad(f, t, h, R, w - n, p - r, A);
}
}
}
this._quadsUpdated(f);
return s;
};
i._determineRect = function(t) {
var e = S.isRotated(), i = S._originalSize, n = S._rect, r = S._offset, s = r.x + (i.width - n.width) / 2, a = r.y - (i.height - n.height) / 2;
if (e) {
var o = t.x;
t.x = n.x + n.height - t.y - t.height - a;
t.y = o + n.y - s;
t.y < 0 && (t.height = t.height + a);
} else {
t.x += n.x - s;
t.y += n.y + a;
}
return e;
};
i._computeAlignmentOffset = function() {
v.length = 0;
switch (O) {
case o.TextAlignment.LEFT:
for (var t = 0; t < m; ++t) v.push(0);
break;

case o.TextAlignment.CENTER:
for (var e = 0, i = p.length; e < i; e++) v.push((x.width - p[e]) / 2);
break;

case o.TextAlignment.RIGHT:
for (var n = 0, r = p.length; n < r; n++) v.push(x.width - p[n]);
}
E = x.height;
if (I !== o.VerticalTextAlignment.TOP) {
var s = x.height - y + M * this._getFontScale() - w * A;
I === o.VerticalTextAlignment.BOTTOM ? E -= s : E -= s / 2;
}
};
i._setupBMFontOverflowMetrics = function() {
var t = x.width, e = x.height;
L === c.RESIZE_HEIGHT && (e = 0);
if (L === c.NONE) {
t = 0;
e = 0;
}
P = t;
F = e;
B = t;
};
i.updateWorldVerts = function() {};
i.appendQuad = function() {};
i._quadsUpdated = function() {};
i._reserveQuads = function() {};
return e;
})(r.default);
i.default = z;
e.exports = i.default;
}), {
"../../../components/CCLabel": 96,
"../../../platform/CCMacro": 133,
"../../../utils/text-utils": 203,
"../../assembler-2d": 154,
"../utils": 165
} ],
162: [ (function(t, e) {
"use strict";
function i() {
this._rect = null;
this.uv = [];
this._texture = null;
this._original = null;
}
i.prototype = {
constructor: i,
getRect: function() {
return cc.rect(this._rect);
},
setRect: function(t) {
this._rect = t;
this._texture && this._calculateUV();
},
_setDynamicAtlasFrame: function(t) {
if (t) {
this._original = {
_texture: this._texture,
_x: this._rect.x,
_y: this._rect.y
};
this._texture = t.texture;
this._rect.x = t.x;
this._rect.y = t.y;
this._calculateUV();
}
},
_resetDynamicAtlasFrame: function() {
if (this._original) {
this._rect.x = this._original._x;
this._rect.y = this._original._y;
this._texture = this._original._texture;
this._original = null;
this._calculateUV();
}
},
_refreshTexture: function(t) {
this._texture = t;
this._rect = cc.rect(0, 0, t.width, t.height);
this._calculateUV();
},
_calculateUV: function() {
var t = this._rect, e = this._texture, i = this.uv, n = e.width, r = e.height, s = 0 === n ? 0 : t.x / n, a = 0 === n ? 0 : (t.x + t.width) / n, o = 0 === r ? 0 : (t.y + t.height) / r, c = 0 === r ? 0 : t.y / r;
i[0] = s;
i[1] = o;
i[2] = a;
i[3] = o;
i[4] = s;
i[5] = c;
i[6] = a;
i[7] = c;
}
};
e.exports = i;
}), {} ],
163: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n, r = (n = t("../../webgl/assemblers/label/2d/bmfont")) && n.__esModule ? n : {
default: n
};
function s(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var a = t("../../../components/CCLabel"), o = t("../../../components/CCLabelOutline"), c = t("../../../utils/text-utils"), u = t("../../../components/CCComponent"), l = t("../../../assets/CCRenderTexture"), h = cc.js.isChildClassOf(o, u), f = t("../utils").getFontFamily, _ = t("../utils").shareLabelInfo, d = cc.BitmapFont.FontLetterDefinition, p = cc.BitmapFont.FontAtlas, v = cc.Color.WHITE, g = 0, m = (1 / 255).toFixed(3);
function y(t, e) {
this._texture = null;
this._labelInfo = e;
this._char = t;
this._hash = null;
this._data = null;
this._canvas = null;
this._context = null;
this._width = 0;
this._height = 0;
this._offsetY = 0;
this._hash = t.charCodeAt(0) + e.hash;
}
y.prototype = {
constructor: y,
updateRenderData: function() {
this._updateProperties();
this._updateTexture();
},
_updateProperties: function() {
this._texture = new cc.Texture2D();
this._data = a._canvasPool.get();
this._canvas = this._data.canvas;
this._context = this._data.context;
this._context.font = this._labelInfo.fontDesc;
var t = c.safeMeasureText(this._context, this._char, this._labelInfo.fontDesc), e = 2 * this._labelInfo.margin + 2;
this._width = parseFloat(t.toFixed(2)) + e;
this._height = (1 + c.BASELINE_RATIO) * this._labelInfo.fontSize + e;
this._offsetY = -this._labelInfo.fontSize * c.BASELINE_RATIO / 2;
this._canvas.width !== this._width && (this._canvas.width = this._width);
this._canvas.height !== this._height && (this._canvas.height = this._height);
this._texture.initWithElement(this._canvas);
},
_updateTexture: function() {
var t = this._context, e = this._labelInfo, i = this._canvas.width, n = this._canvas.height, r = this._labelInfo.fontSize, s = i / 2, a = n / 2 + r * c.MIDDLE_RATIO + r * c.BASELINE_OFFSET, o = e.color;
t.lineJoin = "round";
t.textAlign = "center";
t.clearRect(0, 0, i, n);
t.fillStyle = "rgba(" + o.r + ", " + o.g + ", " + o.b + ", " + m + ")";
t.fillRect(0, 0, i, n);
t.font = e.fontDesc;
t.fillStyle = "rgba(" + o.r + ", " + o.g + ", " + o.b + ", 1)";
if (e.isOutlined && e.margin > 0) {
var u = e.out || v;
t.strokeStyle = "rgba(" + u.r + ", " + u.g + ", " + u.b + ", " + u.a / 255 + ")";
t.lineWidth = 2 * e.margin;
t.strokeText(this._char, s, a);
}
t.fillText(this._char, s, a);
this._texture.handleLoadedTexture();
},
destroy: function() {
this._texture.destroy();
this._texture = null;
a._canvasPool.put(this._data);
}
};
function E(t, e) {
var i = new l();
i.initWithSize(t, e);
i.update();
this._fontDefDictionary = new p(i);
this._x = g;
this._y = g;
this._nexty = g;
this._width = t;
this._height = e;
cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, this.beforeSceneLoad, this);
}
cc.js.mixin(E.prototype, {
insertLetterTexture: function(t) {
var e = t._texture, i = e.width, n = e.height;
if (this._x + i + g > this._width) {
this._x = g;
this._y = this._nexty;
}
this._y + n > this._nexty && (this._nexty = this._y + n + g);
if (this._nexty > this._height) return null;
this._fontDefDictionary._texture.drawTextureAt(e, this._x, this._y);
this._dirty = !0;
var r = new d();
r.u = this._x + 1;
r.v = this._y + 1;
r.texture = this._fontDefDictionary._texture;
r.valid = !0;
r.w = t._width - 2;
r.h = t._height - 2;
r.xAdvance = r.w;
r.offsetY = t._offsetY;
this._x += i + g;
this._fontDefDictionary.addLetterDefinitions(t._hash, r);
return r;
},
update: function() {
if (this._dirty) {
this._fontDefDictionary._texture.update();
this._dirty = !1;
}
},
reset: function() {
this._x = g;
this._y = g;
this._nexty = g;
for (var t = this._fontDefDictionary._letterDefinitions, e = 0, i = t.length; e < i; e++) {
var n = t[e];
n.isValid && n.destroy();
}
this._fontDefDictionary.clear();
},
destroy: function() {
this.reset();
this._fontDefDictionary._texture.destroy();
this._fontDefDictionary._texture = null;
},
beforeSceneLoad: function() {
this.clearAllCache();
},
clearAllCache: function() {
this.destroy();
var t = new l();
t.initWithSize(this._width, this._height);
t.update();
this._fontDefDictionary._texture = t;
},
getLetter: function(t) {
return this._fontDefDictionary._letterDefinitions[t];
},
getTexture: function() {
return this._fontDefDictionary.getTexture();
},
getLetterDefinitionForChar: function(t, e) {
var i = t.charCodeAt(0) + e.hash, n = this._fontDefDictionary._letterDefinitions[i];
if (!n) {
var r = new y(t, e);
r.updateRenderData();
n = this.insertLetterTexture(r);
r.destroy();
}
return n;
}
});
function T(t) {
var e = t.color.toHEX(), i = "";
t.isOutlined && t.margin > 0 && (i = i + t.margin + t.out.toHEX());
return "" + t.fontSize + t.fontFamily + e + i;
}
var C = null, A = (function(t) {
s(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i._getAssemblerData = function() {
if (!C) {
C = new E(2048, 2048);
cc.Label._shareAtlas = C;
}
return C.getTexture();
};
i._updateFontFamily = function(t) {
_.fontAtlas = C;
_.fontFamily = f(t);
var e = h && t.getComponent(o);
if (e && e.enabled) {
_.isOutlined = !0;
_.margin = e.width;
_.out = e.color.clone();
_.out.a = e.color.a * t.node.color.a / 255;
} else {
_.isOutlined = !1;
_.margin = 0;
}
};
i._updateLabelInfo = function(t) {
_.fontDesc = this._getFontDesc();
_.color = t.node.color;
_.hash = T(_);
};
i._getFontDesc = function() {
return _.fontSize.toString() + "px " + _.fontFamily;
};
i._computeHorizontalKerningForText = function() {};
i._determineRect = function() {
return !1;
};
return e;
})(r.default);
i.default = A;
e.exports = i.default;
}), {
"../../../assets/CCRenderTexture": 66,
"../../../components/CCComponent": 94,
"../../../components/CCLabel": 96,
"../../../components/CCLabelOutline": 97,
"../../../utils/text-utils": 203,
"../../webgl/assemblers/label/2d/bmfont": 170,
"../utils": 165
} ],
164: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n, r = (n = t("../../assembler-2d")) && n.__esModule ? n : {
default: n
};
function s(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var a, o = t("../../../utils/text-utils"), c = t("../../../platform/CCMacro"), u = t("../../../components/CCLabel"), l = t("../../../components/CCLabelOutline"), h = t("../../../components/CCLabelShadow"), f = u.Overflow, _ = t("../utils").deleteFromDynamicAtlas, d = t("../utils").getFontFamily, p = (1 / 255).toFixed(3), v = null, g = null, m = null, y = "", E = "", T = 0, C = 0, A = [], S = cc.Size.ZERO, x = 0, b = 0, R = 0, w = null, O = "", I = f.NONE, D = !1, M = !1, L = null, N = cc.Color.WHITE, P = null, F = cc.Color.BLACK, B = cc.rect(), z = cc.Size.ZERO, U = cc.Size.ZERO, k = !1, V = !1, H = !1, G = 0, W = cc.Vec2.ZERO, j = 0, Y = [ "left", "center", "right" ], X = (function(t) {
s(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i._getAssemblerData = function() {
(a = u._canvasPool.get()).canvas.width = a.canvas.height = 1;
return a;
};
i._resetAssemblerData = function(t) {
t && u._canvasPool.put(t);
};
i.updateRenderData = function(e) {
t.prototype.updateRenderData.call(this, e);
if (e._vertsDirty) {
this._updateProperties(e);
this._calculateLabelFont();
this._updateLabelDimensions();
this._updateTexture(e);
this._calDynamicAtlas(e);
e._actualFontSize = T;
e.node.setContentSize(U);
this.updateVerts(e);
e._vertsDirty = !1;
v = null;
g = null;
m = null;
}
};
i.updateVerts = function() {};
i._updatePaddingRect = function() {
var t = 0, e = 0, i = 0, n = 0, r = 0;
z.width = z.height = 0;
if (L) {
t = e = i = n = r = L.width;
z.width = z.height = 2 * r;
}
if (P) {
var s = P.blur + r;
i = Math.max(i, -P._offset.x + s);
n = Math.max(n, P._offset.x + s);
t = Math.max(t, P._offset.y + s);
e = Math.max(e, -P._offset.y + s);
}
if (V) {
var a = C * Math.tan(.20943951);
n += a;
z.width += a;
}
B.x = i;
B.y = t;
B.width = i + n;
B.height = t + e;
};
i._updateProperties = function(t) {
var e = t._assemblerData;
v = e.context;
g = e.canvas;
m = t._frame._original ? t._frame._original._texture : t._frame._texture;
E = t.string.toString();
T = t._fontSize;
C = T;
G = t.underlineHeight || C / 8;
I = t.overflow;
S.width = t.node.width;
S.height = t.node.height;
U = t.node.getContentSize();
x = t._lineHeight;
b = t.horizontalAlign;
R = t.verticalAlign;
w = t.node.color;
k = t.enableBold;
V = t.enableItalic;
H = t.enableUnderline;
O = d(t);
M = t.srcBlendFactor === cc.macro.BlendFactor.ONE;
v._setPremultiply(M);
D = I !== f.NONE && (I === f.RESIZE_HEIGHT || t.enableWrapText);
(L = (L = l && t.getComponent(l)) && L.enabled && L.width > 0 ? L : null) && N.set(L.color);
if (P = (P = h && t.getComponent(h)) && P.enabled ? P : null) {
F.set(P.color);
F.a = F.a * t.node.color.a / 255;
}
this._updatePaddingRect();
};
i._calculateFillTextStartPosition = function() {
var t = 0;
b === c.TextAlignment.RIGHT ? t = S.width - B.width : b === c.TextAlignment.CENTER && (t = (S.width - B.width) / 2);
var e = this._getLineHeight() * (A.length - 1), i = T * (1 - o.BASELINE_RATIO / 2);
if (R !== c.VerticalTextAlignment.TOP) {
var n = e + B.height + T - S.height;
R === c.VerticalTextAlignment.BOTTOM ? i -= n += o.BASELINE_RATIO / 2 * T : i -= n / 2;
}
i += o.BASELINE_OFFSET * T;
return cc.v2(t + B.x, i + B.y);
};
i._setupOutline = function() {
v.strokeStyle = "rgba(" + N.r + ", " + N.g + ", " + N.b + ", " + N.a / 255 + ")";
v.lineWidth = 2 * L.width;
};
i._setupShadow = function() {
v.shadowColor = "rgba(" + F.r + ", " + F.g + ", " + F.b + ", " + F.a / 255 + ")";
v.shadowBlur = P.blur;
v.shadowOffsetX = P.offset.x;
v.shadowOffsetY = -P.offset.y;
};
i._drawTextEffect = function(t, e) {
if (P || L || H) {
var i = A.length > 1 && P, n = this._measureText(v, y), r = 0, s = 0;
P && this._setupShadow();
L && this._setupOutline();
for (var a = 0; a < A.length; ++a) {
r = t.x;
s = t.y + a * e;
if (i) {
L && v.strokeText(A[a], r, s);
v.fillText(A[a], r, s);
}
if (H) {
j = n(A[a]);
b === c.TextAlignment.RIGHT ? W.x = t.x - j : b === c.TextAlignment.CENTER ? W.x = t.x - j / 2 : W.x = t.x;
W.y = s + C / 8;
v.fillRect(W.x, W.y, j, G);
}
}
i && (v.shadowColor = "transparent");
}
};
i._updateTexture = function() {
v.clearRect(0, 0, g.width, g.height);
v.lineJoin = "round";
if (M) v.fillStyle = "rgba(" + w.r + ", " + w.g + ", " + w.b + ", " + w.a / 255 + ")"; else {
var t = L ? N : w;
v.fillStyle = "rgba(" + t.r + ", " + t.g + ", " + t.b + ", " + p + ")";
v.fillRect(0, 0, g.width, g.height);
v.fillStyle = "rgba(" + w.r + ", " + w.g + ", " + w.b + ", 1)";
}
var e = this._calculateFillTextStartPosition(), i = this._getLineHeight(), n = e.x, r = 0;
this._drawTextEffect(e, i);
for (var s = 0; s < A.length; ++s) {
r = e.y + s * i;
L && v.strokeText(A[s], n, r);
v.fillText(A[s], n, r);
}
P && (v.shadowColor = "transparent");
m.handleLoadedTexture();
};
i._calDynamicAtlas = function(t) {
if (t.cacheMode === u.CacheMode.BITMAP) {
var e = t._frame;
_(t, e);
e._original || e.setRect(cc.rect(0, 0, g.width, g.height));
this.packToDynamicAtlas(t, e);
}
};
i._updateLabelDimensions = function() {
S.width = Math.min(S.width, 2048);
S.height = Math.min(S.height, 2048);
var t = !1;
if (g.width !== S.width) {
g.width = S.width;
t = !0;
}
if (g.height !== S.height) {
g.height = S.height;
t = !0;
}
t && (v.font = y);
v.textAlign = Y[b];
};
i._getFontDesc = function() {
var t = T.toString() + "px ";
t += O;
k && (t = "bold " + t);
V && (t = "italic " + t);
return t;
};
i._getLineHeight = function() {
return 0 | (0 === x ? T : x * T / C);
};
i._calculateParagraphLength = function(t, e) {
for (var i = [], n = 0; n < t.length; ++n) {
var r = o.safeMeasureText(e, t[n], y);
i.push(r);
}
return i;
};
i._measureText = function(t, e) {
return function(i) {
return o.safeMeasureText(t, i, e);
};
};
i._calculateShrinkFont = function(t) {
var e = this._calculateParagraphLength(t, v), i = 0, n = 0, r = 0;
if (D) {
var s = U.width, a = U.height;
if (s < 0 || a < 0) return;
n = a + 1;
for (var c = 0, u = 0 | T + 1, l = 0; c < u; ) {
if ((l = c + u + 1 >> 1) <= 0) {
cc.logID(4003);
break;
}
T = l;
y = this._getFontDesc();
v.font = y;
var h = this._getLineHeight();
n = 0;
for (i = 0; i < t.length; ++i) {
var f = o.safeMeasureText(v, t[i], y);
n += o.fragmentText(t[i], f, s, this._measureText(v, y)).length * h;
}
n > a ? u = l - 1 : c = l;
}
if (0 === c) cc.logID(4003); else {
T = c;
y = this._getFontDesc();
v.font = y;
}
} else {
n = t.length * this._getLineHeight();
for (i = 0; i < t.length; ++i) r < e[i] && (r = e[i]);
var _ = (S.width - B.width) / r, d = S.height / n;
T = C * Math.min(1, _, d) | 0;
y = this._getFontDesc();
v.font = y;
}
};
i._calculateWrapText = function(t) {
if (D) {
A = [];
for (var e = U.width, i = 0; i < t.length; ++i) {
var n = o.safeMeasureText(v, t[i], y), r = o.fragmentText(t[i], n, e, this._measureText(v, y));
A = A.concat(r);
}
}
};
i._calculateLabelFont = function() {
var t = E.split("\n");
A = t;
y = this._getFontDesc();
v.font = y;
switch (I) {
case f.NONE:
for (var e = 0, i = 0, n = 0; n < t.length; ++n) {
var r = o.safeMeasureText(v, t[n], y);
e = e > r ? e : r;
}
i = (A.length + o.BASELINE_RATIO) * this._getLineHeight();
var s = parseFloat(e.toFixed(2)), a = parseFloat(i.toFixed(2));
S.width = s + B.width;
S.height = a + B.height;
U.width = s + z.width;
U.height = a + z.height;
break;

case f.SHRINK:
this._calculateShrinkFont(t);
this._calculateWrapText(t);
break;

case f.CLAMP:
this._calculateWrapText(t);
break;

case f.RESIZE_HEIGHT:
this._calculateWrapText(t);
var c = (A.length + o.BASELINE_RATIO) * this._getLineHeight();
S.height = c + B.height;
U.height = c + z.height;
}
};
return e;
})(r.default);
i.default = X;
e.exports = i.default;
}), {
"../../../components/CCLabel": 96,
"../../../components/CCLabelOutline": 97,
"../../../components/CCLabelShadow": 98,
"../../../platform/CCMacro": 133,
"../../../utils/text-utils": 203,
"../../assembler-2d": 154,
"../utils": 165
} ],
165: [ (function(t, e) {
"use strict";
var i = t("./dynamic-atlas/manager"), n = cc.Color.WHITE, r = {
fontAtlas: null,
fontSize: 0,
lineHeight: 0,
hAlign: 0,
vAlign: 0,
hash: "",
fontFamily: "",
fontDesc: "Arial",
color: n,
isOutlined: !1,
out: n,
margin: 0
};
e.exports = {
deleteFromDynamicAtlas: function(t, e) {
if (e && e._original && i) {
i.deleteAtlasSpriteFrame(e);
e._resetDynamicAtlasFrame();
}
},
getFontFamily: function(t) {
if (t.useSystemFont) return t.fontFamily || "Arial";
if (t.font) {
if (t.font._nativeAsset) return t.font._nativeAsset;
cc.assetManager.postLoadNative(t.font, (function() {
t.setVertsDirty();
}));
return "Arial";
}
return "Arial";
},
shareLabelInfo: r
};
}), {
"./dynamic-atlas/manager": void 0
} ],
166: [ (function(t, e) {
"use strict";
cc.Graphics.earcut = e.exports = i;
function i(t, e, i) {
i = i || 2;
var r, a, o, c, u, h, f, _ = e && e.length, d = _ ? e[0] * i : t.length, p = n(t, 0, d, i, !0), v = [];
if (!p) return v;
_ && (p = l(t, e, p, i));
if (t.length > 80 * i) {
r = o = t[0];
a = c = t[1];
for (var g = i; g < d; g += i) {
(u = t[g]) < r && (r = u);
(h = t[g + 1]) < a && (a = h);
u > o && (o = u);
h > c && (c = h);
}
f = Math.max(o - r, c - a);
}
s(p, v, i, r, a, f);
return v;
}
function n(t, e, i, n, r) {
var s, a;
if (r === I(t, e, i, n) > 0) for (s = e; s < i; s += n) a = R(s, t[s], t[s + 1], a); else for (s = i - n; s >= e; s -= n) a = R(s, t[s], t[s + 1], a);
if (a && T(a, a.next)) {
w(a);
a = a.next;
}
return a;
}
function r(t, e) {
if (!t) return t;
e || (e = t);
var i, n = t;
do {
i = !1;
if (n.steiner || !T(n, n.next) && 0 !== E(n.prev, n, n.next)) n = n.next; else {
w(n);
if ((n = e = n.prev) === n.next) return null;
i = !0;
}
} while (i || n !== e);
return e;
}
function s(t, e, i, n, l, h, f) {
if (t) {
!f && h && d(t, n, l, h);
for (var _, p, v = t; t.prev !== t.next; ) {
_ = t.prev;
p = t.next;
if (h ? o(t, n, l, h) : a(t)) {
e.push(_.i / i);
e.push(t.i / i);
e.push(p.i / i);
w(t);
t = p.next;
v = p.next;
} else if ((t = p) === v) {
f ? 1 === f ? s(t = c(t, e, i), e, i, n, l, h, 2) : 2 === f && u(t, e, i, n, l, h) : s(r(t), e, i, n, l, h, 1);
break;
}
}
}
}
function a(t) {
var e = t.prev, i = t, n = t.next;
if (E(e, i, n) >= 0) return !1;
for (var r = t.next.next; r !== t.prev; ) {
if (m(e.x, e.y, i.x, i.y, n.x, n.y, r.x, r.y) && E(r.prev, r, r.next) >= 0) return !1;
r = r.next;
}
return !0;
}
function o(t, e, i, n) {
var r = t.prev, s = t, a = t.next;
if (E(r, s, a) >= 0) return !1;
for (var o = r.x < s.x ? r.x < a.x ? r.x : a.x : s.x < a.x ? s.x : a.x, c = r.y < s.y ? r.y < a.y ? r.y : a.y : s.y < a.y ? s.y : a.y, u = r.x > s.x ? r.x > a.x ? r.x : a.x : s.x > a.x ? s.x : a.x, l = r.y > s.y ? r.y > a.y ? r.y : a.y : s.y > a.y ? s.y : a.y, h = v(o, c, e, i, n), f = v(u, l, e, i, n), _ = t.nextZ; _ && _.z <= f; ) {
if (_ !== t.prev && _ !== t.next && m(r.x, r.y, s.x, s.y, a.x, a.y, _.x, _.y) && E(_.prev, _, _.next) >= 0) return !1;
_ = _.nextZ;
}
_ = t.prevZ;
for (;_ && _.z >= h; ) {
if (_ !== t.prev && _ !== t.next && m(r.x, r.y, s.x, s.y, a.x, a.y, _.x, _.y) && E(_.prev, _, _.next) >= 0) return !1;
_ = _.prevZ;
}
return !0;
}
function c(t, e, i) {
var n = t;
do {
var r = n.prev, s = n.next.next;
if (!T(r, s) && C(r, n, n.next, s) && S(r, s) && S(s, r)) {
e.push(r.i / i);
e.push(n.i / i);
e.push(s.i / i);
w(n);
w(n.next);
n = t = s;
}
n = n.next;
} while (n !== t);
return n;
}
function u(t, e, i, n, a, o) {
var c = t;
do {
for (var u = c.next.next; u !== c.prev; ) {
if (c.i !== u.i && y(c, u)) {
var l = b(c, u);
c = r(c, c.next);
l = r(l, l.next);
s(c, e, i, n, a, o);
s(l, e, i, n, a, o);
return;
}
u = u.next;
}
c = c.next;
} while (c !== t);
}
function l(t, e, i, s) {
var a, o, c, u = [];
for (a = 0, o = e.length; a < o; a++) {
(c = n(t, e[a] * s, a < o - 1 ? e[a + 1] * s : t.length, s, !1)) === c.next && (c.steiner = !0);
u.push(g(c));
}
u.sort(h);
for (a = 0; a < u.length; a++) {
f(u[a], i);
i = r(i, i.next);
}
return i;
}
function h(t, e) {
return t.x - e.x;
}
function f(t, e) {
if (e = _(t, e)) {
var i = b(e, t);
r(i, i.next);
}
}
function _(t, e) {
var i, n = e, r = t.x, s = t.y, a = -Infinity;
do {
if (s <= n.y && s >= n.next.y) {
var o = n.x + (s - n.y) * (n.next.x - n.x) / (n.next.y - n.y);
if (o <= r && o > a) {
a = o;
if (o === r) {
if (s === n.y) return n;
if (s === n.next.y) return n.next;
}
i = n.x < n.next.x ? n : n.next;
}
}
n = n.next;
} while (n !== e);
if (!i) return null;
if (r === a) return i.prev;
var c, u = i, l = i.x, h = i.y, f = Infinity;
n = i.next;
for (;n !== u; ) {
if (r >= n.x && n.x >= l && m(s < h ? r : a, s, l, h, s < h ? a : r, s, n.x, n.y) && ((c = Math.abs(s - n.y) / (r - n.x)) < f || c === f && n.x > i.x) && S(n, t)) {
i = n;
f = c;
}
n = n.next;
}
return i;
}
function d(t, e, i, n) {
var r = t;
do {
null === r.z && (r.z = v(r.x, r.y, e, i, n));
r.prevZ = r.prev;
r.nextZ = r.next;
r = r.next;
} while (r !== t);
r.prevZ.nextZ = null;
r.prevZ = null;
p(r);
}
function p(t) {
var e, i, n, r, s, a, o, c, u = 1;
do {
i = t;
t = null;
s = null;
a = 0;
for (;i; ) {
a++;
n = i;
o = 0;
for (e = 0; e < u; e++) {
o++;
if (!(n = n.nextZ)) break;
}
c = u;
for (;o > 0 || c > 0 && n; ) {
if (0 === o) {
r = n;
n = n.nextZ;
c--;
} else if (0 !== c && n) if (i.z <= n.z) {
r = i;
i = i.nextZ;
o--;
} else {
r = n;
n = n.nextZ;
c--;
} else {
r = i;
i = i.nextZ;
o--;
}
s ? s.nextZ = r : t = r;
r.prevZ = s;
s = r;
}
i = n;
}
s.nextZ = null;
u *= 2;
} while (a > 1);
return t;
}
function v(t, e, i, n, r) {
return (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = 32767 * (t - i) / r) | t << 8)) | t << 4)) | t << 2)) | t << 1)) | (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = 32767 * (e - n) / r) | e << 8)) | e << 4)) | e << 2)) | e << 1)) << 1;
}
function g(t) {
var e = t, i = t;
do {
e.x < i.x && (i = e);
e = e.next;
} while (e !== t);
return i;
}
function m(t, e, i, n, r, s, a, o) {
return (r - a) * (e - o) - (t - a) * (s - o) >= 0 && (t - a) * (n - o) - (i - a) * (e - o) >= 0 && (i - a) * (s - o) - (r - a) * (n - o) >= 0;
}
function y(t, e) {
return t.next.i !== e.i && t.prev.i !== e.i && !A(t, e) && S(t, e) && S(e, t) && x(t, e);
}
function E(t, e, i) {
return (e.y - t.y) * (i.x - e.x) - (e.x - t.x) * (i.y - e.y);
}
function T(t, e) {
return t.x === e.x && t.y === e.y;
}
function C(t, e, i, n) {
return !!(T(t, e) && T(i, n) || T(t, n) && T(i, e)) || E(t, e, i) > 0 != E(t, e, n) > 0 && E(i, n, t) > 0 != E(i, n, e) > 0;
}
function A(t, e) {
var i = t;
do {
if (i.i !== t.i && i.next.i !== t.i && i.i !== e.i && i.next.i !== e.i && C(i, i.next, t, e)) return !0;
i = i.next;
} while (i !== t);
return !1;
}
function S(t, e) {
return E(t.prev, t, t.next) < 0 ? E(t, e, t.next) >= 0 && E(t, t.prev, e) >= 0 : E(t, e, t.prev) < 0 || E(t, t.next, e) < 0;
}
function x(t, e) {
var i = t, n = !1, r = (t.x + e.x) / 2, s = (t.y + e.y) / 2;
do {
i.y > s != i.next.y > s && r < (i.next.x - i.x) * (s - i.y) / (i.next.y - i.y) + i.x && (n = !n);
i = i.next;
} while (i !== t);
return n;
}
function b(t, e) {
var i = new O(t.i, t.x, t.y), n = new O(e.i, e.x, e.y), r = t.next, s = e.prev;
t.next = e;
e.prev = t;
i.next = r;
r.prev = i;
n.next = i;
i.prev = n;
s.next = n;
n.prev = s;
return n;
}
function R(t, e, i, n) {
var r = new O(t, e, i);
if (n) {
r.next = n.next;
r.prev = n;
n.next.prev = r;
n.next = r;
} else {
r.prev = r;
r.next = r;
}
return r;
}
function w(t) {
t.next.prev = t.prev;
t.prev.next = t.next;
t.prevZ && (t.prevZ.nextZ = t.nextZ);
t.nextZ && (t.nextZ.prevZ = t.prevZ);
}
function O(t, e, i) {
this.i = t;
this.x = e;
this.y = i;
this.prev = null;
this.next = null;
this.z = null;
this.prevZ = null;
this.nextZ = null;
this.steiner = !1;
}
i.deviation = function(t, e, i, n) {
var r = e && e.length, s = r ? e[0] * i : t.length, a = Math.abs(I(t, 0, s, i));
if (r) for (var o = 0, c = e.length; o < c; o++) {
var u = e[o] * i, l = o < c - 1 ? e[o + 1] * i : t.length;
a -= Math.abs(I(t, u, l, i));
}
var h = 0;
for (o = 0; o < n.length; o += 3) {
var f = n[o] * i, _ = n[o + 1] * i, d = n[o + 2] * i;
h += Math.abs((t[f] - t[d]) * (t[_ + 1] - t[f + 1]) - (t[f] - t[_]) * (t[d + 1] - t[f + 1]));
}
return 0 === a && 0 === h ? 0 : Math.abs((h - a) / a);
};
function I(t, e, i, n) {
for (var r = 0, s = e, a = i - n; s < i; s += n) {
r += (t[a] - t[s]) * (t[s + 1] + t[a + 1]);
a = s;
}
return r;
}
i.flatten = function(t) {
for (var e = t[0][0].length, i = {
vertices: [],
holes: [],
dimensions: e
}, n = 0, r = 0; r < t.length; r++) {
for (var s = 0; s < t[r].length; s++) for (var a = 0; a < e; a++) i.vertices.push(t[r][s][a]);
if (r > 0) {
n += t[r - 1].length;
i.holes.push(n);
}
}
return i;
};
}), {} ],
167: [ (function(t, e) {
"use strict";
var i = t("../../../../graphics/helper"), n = t("../../../../graphics/types").PointFlags, r = cc.Graphics.Point = cc.Class({
name: "cc.GraphicsPoint",
extends: cc.Vec2,
ctor: function() {
this.reset();
},
reset: function() {
this.dx = 0;
this.dy = 0;
this.dmx = 0;
this.dmy = 0;
this.flags = 0;
this.len = 0;
}
});
function s() {
this.reset();
}
cc.js.mixin(s.prototype, {
reset: function() {
this.closed = !1;
this.nbevel = 0;
this.complex = !0;
this.points ? this.points.length = 0 : this.points = [];
}
});
function a() {
this._tessTol = .25;
this._distTol = .01;
this._updatePathOffset = !1;
this._paths = null;
this._pathLength = 0;
this._pathOffset = 0;
this._points = null;
this._pointsOffset = 0;
this._commandx = 0;
this._commandy = 0;
this._paths = [];
this._points = [];
}
cc.js.mixin(a.prototype, {
moveTo: function(t, e) {
if (this._updatePathOffset) {
this._pathOffset = this._pathLength;
this._updatePathOffset = !1;
}
this._addPath();
this._addPoint(t, e, n.PT_CORNER);
this._commandx = t;
this._commandy = e;
},
lineTo: function(t, e) {
this._addPoint(t, e, n.PT_CORNER);
this._commandx = t;
this._commandy = e;
},
bezierCurveTo: function(t, e, r, s, a, o) {
var c = this._curPath, u = c.points[c.points.length - 1];
if (u.x !== t || u.y !== e || r !== a || s !== o) {
i.tesselateBezier(this, u.x, u.y, t, e, r, s, a, o, 0, n.PT_CORNER);
this._commandx = a;
this._commandy = o;
} else this.lineTo(a, o);
},
quadraticCurveTo: function(t, e, i, n) {
var r = this._commandx, s = this._commandy;
this.bezierCurveTo(r + 2 / 3 * (t - r), s + 2 / 3 * (e - s), i + 2 / 3 * (t - i), n + 2 / 3 * (e - n), i, n);
},
arc: function(t, e, n, r, s, a) {
i.arc(this, t, e, n, r, s, a);
},
ellipse: function(t, e, n, r) {
i.ellipse(this, t, e, n, r);
this._curPath.complex = !1;
},
circle: function(t, e, n) {
i.ellipse(this, t, e, n, n);
this._curPath.complex = !1;
},
rect: function(t, e, i, n) {
this.moveTo(t, e);
this.lineTo(t, e + n);
this.lineTo(t + i, e + n);
this.lineTo(t + i, e);
this.close();
this._curPath.complex = !1;
},
roundRect: function(t, e, n, r, s) {
i.roundRect(this, t, e, n, r, s);
this._curPath.complex = !1;
},
clear: function(t) {
this._pathLength = 0;
this._pathOffset = 0;
this._pointsOffset = 0;
this._curPath = null;
if (t) {
this._paths.length = 0;
this._points.length = 0;
}
},
close: function() {
this._curPath.closed = !0;
},
_addPath: function() {
var t = this._pathLength, e = this._paths[t];
if (e) e.reset(); else {
e = new s();
this._paths.push(e);
}
this._pathLength++;
this._curPath = e;
return e;
},
_addPoint: function(t, e, i) {
var n = this._curPath;
if (n) {
var s, a = this._points, o = n.points;
if (s = a[this._pointsOffset++]) {
s.x = t;
s.y = e;
} else {
s = new r(t, e);
a.push(s);
}
s.flags = i;
o.push(s);
}
}
});
cc.Graphics._Impl = a;
e.exports = a;
}), {
"../../../../graphics/helper": 123,
"../../../../graphics/types": 125
} ],
168: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = s(t("../../../assembler")), r = s(t("../../../../../renderer/core/input-assembler"));
function s(t) {
return t && t.__esModule ? t : {
default: t
};
}
function a(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var o = t("../../mesh-buffer"), c = t("../../../index"), u = t("../../../../graphics/graphics"), l = t("../../../../graphics/types").PointFlags, h = u.LineJoin, f = u.LineCap, _ = t("./earcut");
t("./impl");
var d = Math.PI, p = Math.min, v = Math.max, g = Math.ceil, m = Math.acos, y = Math.cos, E = Math.sin, T = Math.atan2;
function C(t, e, i) {
return t < e ? e : t > i ? i : t;
}
var A = cc.gfx, S = new A.VertexFormat([ {
name: A.ATTR_POSITION,
type: A.ATTR_TYPE_FLOAT32,
num: 2
}, {
name: A.ATTR_COLOR,
type: A.ATTR_TYPE_UINT8,
num: 4,
normalize: !0
}, {
name: "a_dist",
type: A.ATTR_TYPE_FLOAT32,
num: 1
} ]);
S.name = "vfmtPosColorSdf";
var x = (function(t) {
a(e, t);
function e(e) {
var i;
(i = t.call(this, e) || this)._buffer = null;
i._buffers = [];
i._bufferOffset = 0;
return i;
}
var i = e.prototype;
i.getVfmt = function() {
return S;
};
i.getVfmtFloatCount = function() {
return 4;
};
i.requestBuffer = function() {
var t = {
indiceStart: 0,
vertexStart: 0
}, e = new o(c._handle, this.getVfmt());
t.meshbuffer = e;
var i = new r.default(e._vb, e._ib);
t.ia = i;
this._buffers.push(t);
return t;
};
i.getBuffers = function() {
0 === this._buffers.length && this.requestBuffer();
return this._buffers;
};
i.clear = function(t) {
this._bufferOffset = 0;
var e = this._buffers;
if (t) {
for (var i = 0, n = e.length; i < n; i++) {
var r = e[i];
r.meshbuffer.destroy();
r.meshbuffer = null;
}
e.length = 0;
} else for (var s = 0, a = e.length; s < a; s++) {
var o = e[s];
o.indiceStart = 0;
o.vertexStart = 0;
o.meshbuffer.reset();
}
};
i.fillBuffers = function(t, e) {
e._flush();
e.node = t.node;
e.material = t._materials[0];
for (var i = this.getBuffers(), n = 0, r = i.length; n < r; n++) {
var s = i[n], a = s.meshbuffer;
s.ia._count = s.indiceStart;
e._flushIA(s.ia);
a.uploadData();
}
};
i.genBuffer = function(t, e) {
var i = this.getBuffers(), n = i[this._bufferOffset], r = n.meshbuffer, s = n.vertexStart + e;
if (s > 65535 || 3 * s > 131070) {
++this._bufferOffset;
s = e;
if (this._bufferOffset < i.length) n = i[this._bufferOffset]; else {
n = this.requestBuffer(t);
i[this._bufferOffset] = n;
}
r = n.meshbuffer;
}
s > r.vertexOffset && r.requestStatic(e, 3 * e);
this._buffer = n;
return n;
};
i.stroke = function(t) {
this._curColor = t._strokeColor._val;
this._flattenPaths(t._impl);
this._expandStroke(t);
t._impl._updatePathOffset = !0;
};
i.fill = function(t) {
this._curColor = t._fillColor._val;
this._expandFill(t);
t._impl._updatePathOffset = !0;
};
i._expandStroke = function(t) {
var e, i, n, r, s = .5 * t.lineWidth, a = t.lineCap, o = t.lineJoin, c = t.miterLimit, u = t._impl, _ = (e = s, 
i = d, n = u._tessTol, r = 2 * m(e / (e + n)), v(2, g(i / r)));
this._calculateJoins(u, s, o, c);
for (var p = u._paths, y = 0, E = u._pathOffset, T = u._pathLength; E < T; E++) {
var C = p[E], A = C.points.length;
o === h.ROUND ? y += 2 * (A + C.nbevel * (_ + 2) + 1) : y += 2 * (A + 5 * C.nbevel + 1);
C.closed || (a === f.ROUND ? y += 2 * (2 * _ + 2) : y += 12);
}
for (var S = this.genBuffer(t, y), x = S.meshbuffer, b = x._vData, R = x._iData, w = u._pathOffset, O = u._pathLength; w < O; w++) {
var I, D = p[w], M = D.points, L = M.length, N = S.vertexStart, P = void 0, F = void 0, B = void 0, z = void 0;
if (I = D.closed) {
P = M[L - 1];
F = M[0];
B = 0;
z = L;
} else {
P = M[0];
F = M[1];
B = 1;
z = L - 1;
}
F = F || P;
if (!I) {
var U = F.sub(P);
U.normalizeSelf();
var k = U.x, V = U.y;
a === f.BUTT ? this._buttCapStart(P, k, V, s, 0) : a === f.SQUARE ? this._buttCapStart(P, k, V, s, s) : a === f.ROUND && this._roundCapStart(P, k, V, s, _);
}
for (var H = B; H < z; ++H) {
if (o === h.ROUND) this._roundJoin(P, F, s, s, _); else if (0 != (F.flags & (l.PT_BEVEL | l.PT_INNERBEVEL))) this._bevelJoin(P, F, s, s); else {
this._vset(F.x + F.dmx * s, F.y + F.dmy * s, 1);
this._vset(F.x - F.dmx * s, F.y - F.dmy * s, -1);
}
P = F;
F = M[H + 1];
}
if (I) {
var G = this.getVfmtFloatCount(), W = N * G;
this._vset(b[W], b[W + 1], 1);
this._vset(b[W + G], b[W + G + 1], -1);
} else {
var j = F.sub(P);
j.normalizeSelf();
var Y = j.x, X = j.y;
a === f.BUTT ? this._buttCapEnd(F, Y, X, s, 0) : a === f.SQUARE ? this._buttCapEnd(F, Y, X, s, s) : a === f.ROUND && this._roundCapEnd(F, Y, X, s, _);
}
for (var q = S.indiceStart, Z = N + 2, K = S.vertexStart; Z < K; Z++) {
R[q++] = Z - 2;
R[q++] = Z - 1;
R[q++] = Z;
}
S.indiceStart = q;
}
};
i._expandFill = function(t) {
for (var e = t._impl, i = e._paths, n = 0, r = e._pathOffset, s = e._pathLength; r < s; r++) n += i[r].points.length;
for (var a = this.genBuffer(t, n), o = a.meshbuffer, c = o._vData, u = o._iData, l = e._pathOffset, h = e._pathLength; l < h; l++) {
var f = i[l], d = f.points, p = d.length;
if (0 !== p) {
for (var v = a.vertexStart, g = 0; g < p; ++g) this._vset(d[g].x, d[g].y);
var m = a.indiceStart;
if (f.complex) {
for (var y = [], E = this.getVfmtFloatCount(), T = v, C = a.vertexStart; T < C; T++) {
var A = T * E;
y.push(c[A]);
y.push(c[A + 1]);
}
var S = _(y, null, 2);
if (!S || 0 === S.length) continue;
for (var x = 0, b = S.length; x < b; x++) u[m++] = S[x] + v;
} else for (var R = v, w = v + 2, O = a.vertexStart; w < O; w++) {
u[m++] = R;
u[m++] = w - 1;
u[m++] = w;
}
a.indiceStart = m;
}
}
};
i._calculateJoins = function(t, e, i, n) {
var r = 0;
e > 0 && (r = 1 / e);
for (var s = t._paths, a = t._pathOffset, o = t._pathLength; a < o; a++) {
var c = s[a], u = c.points, f = u.length, _ = u[f - 1], d = u[0];
c.nbevel = 0;
for (var g = 0; g < f; g++) {
var m, y, E = _.dy, T = -_.dx, C = d.dy, A = -d.dx;
d.dmx = .5 * (E + C);
d.dmy = .5 * (T + A);
if ((m = d.dmx * d.dmx + d.dmy * d.dmy) > 1e-6) {
var S = 1 / m;
S > 600 && (S = 600);
d.dmx *= S;
d.dmy *= S;
}
d.dx * _.dy - _.dx * d.dy > 0 && (d.flags |= l.PT_LEFT);
m * (y = v(11, p(_.len, d.len) * r)) * y < 1 && (d.flags |= l.PT_INNERBEVEL);
d.flags & l.PT_CORNER && (m * n * n < 1 || i === h.BEVEL || i === h.ROUND) && (d.flags |= l.PT_BEVEL);
0 != (d.flags & (l.PT_BEVEL | l.PT_INNERBEVEL)) && c.nbevel++;
_ = d;
d = u[g + 1];
}
}
};
i._flattenPaths = function(t) {
for (var e = t._paths, i = t._pathOffset, n = t._pathLength; i < n; i++) {
var r = e[i], s = r.points, a = s[s.length - 1], o = s[0];
if (s.length > 2 && a.equals(o)) {
r.closed = !0;
s.pop();
a = s[s.length - 1];
}
for (var c = 0, u = s.length; c < u; c++) {
var l = o.sub(a);
a.len = l.mag();
(l.x || l.y) && l.normalizeSelf();
a.dx = l.x;
a.dy = l.y;
a = o;
o = s[c + 1];
}
}
};
i._chooseBevel = function(t, e, i, n) {
var r, s, a, o, c = i.x, u = i.y;
if (0 !== t) {
r = c + e.dy * n;
s = u - e.dx * n;
a = c + i.dy * n;
o = u - i.dx * n;
} else {
r = a = c + i.dmx * n;
s = o = u + i.dmy * n;
}
return [ r, s, a, o ];
};
i._buttCapStart = function(t, e, i, n, r) {
var s = t.x - e * r, a = t.y - i * r, o = i, c = -e;
this._vset(s + o * n, a + c * n, 1);
this._vset(s - o * n, a - c * n, -1);
};
i._buttCapEnd = function(t, e, i, n, r) {
var s = t.x + e * r, a = t.y + i * r, o = i, c = -e;
this._vset(s + o * n, a + c * n, 1);
this._vset(s - o * n, a - c * n, -1);
};
i._roundCapStart = function(t, e, i, n, r) {
for (var s = t.x, a = t.y, o = i, c = -e, u = 0; u < r; u++) {
var l = u / (r - 1) * d, h = y(l) * n, f = E(l) * n;
this._vset(s - o * h - e * f, a - c * h - i * f, 1);
this._vset(s, a, 0);
}
this._vset(s + o * n, a + c * n, 1);
this._vset(s - o * n, a - c * n, -1);
};
i._roundCapEnd = function(t, e, i, n, r) {
var s = t.x, a = t.y, o = i, c = -e;
this._vset(s + o * n, a + c * n, 1);
this._vset(s - o * n, a - c * n, -1);
for (var u = 0; u < r; u++) {
var l = u / (r - 1) * d, h = y(l) * n, f = E(l) * n;
this._vset(s, a, 0);
this._vset(s - o * h + e * f, a - c * h + i * f, 1);
}
};
i._roundJoin = function(t, e, i, n, r) {
var s = t.dy, a = -t.dx, o = e.dy, c = -e.dx, u = e.x, h = e.y;
if (0 != (e.flags & l.PT_LEFT)) {
var f = this._chooseBevel(e.flags & l.PT_INNERBEVEL, t, e, i), _ = f[0], p = f[1], v = f[2], m = f[3], A = T(-a, -s), S = T(-c, -o);
S > A && (S -= 2 * d);
this._vset(_, p, 1);
this._vset(u - s * n, e.y - a * n, -1);
for (var x = C(g((A - S) / d) * r, 2, r), b = 0; b < x; b++) {
var R = A + b / (x - 1) * (S - A), w = u + y(R) * n, O = h + E(R) * n;
this._vset(u, h, 0);
this._vset(w, O, -1);
}
this._vset(v, m, 1);
this._vset(u - o * n, h - c * n, -1);
} else {
var I = this._chooseBevel(e.flags & l.PT_INNERBEVEL, t, e, -n), D = I[0], M = I[1], L = I[2], N = I[3], P = T(a, s), F = T(c, o);
F < P && (F += 2 * d);
this._vset(u + s * n, h + a * n, 1);
this._vset(D, M, -1);
for (var B = C(g((F - P) / d) * r, 2, r), z = 0; z < B; z++) {
var U = P + z / (B - 1) * (F - P), k = u + y(U) * i, V = h + E(U) * i;
this._vset(k, V, 1);
this._vset(u, h, 0);
}
this._vset(u + o * n, h + c * n, 1);
this._vset(L, N, -1);
}
};
i._bevelJoin = function(t, e, i, n) {
var r, s, a, o, c, u, h, f, _ = t.dy, d = -t.dx, p = e.dy, v = -e.dx;
if (e.flags & l.PT_LEFT) {
var g = this._chooseBevel(e.flags & l.PT_INNERBEVEL, t, e, i);
c = g[0];
u = g[1];
h = g[2];
f = g[3];
this._vset(c, u, 1);
this._vset(e.x - _ * n, e.y - d * n, -1);
this._vset(h, f, 1);
this._vset(e.x - p * n, e.y - v * n, -1);
} else {
var m = this._chooseBevel(e.flags & l.PT_INNERBEVEL, t, e, -n);
r = m[0];
s = m[1];
a = m[2];
o = m[3];
this._vset(e.x + _ * i, e.y + d * i, 1);
this._vset(r, s, -1);
this._vset(e.x + p * i, e.y + v * i, 1);
this._vset(a, o, -1);
}
};
i._vset = function(t, e, i) {
void 0 === i && (i = 0);
var n = this._buffer, r = n.meshbuffer, s = n.vertexStart * this.getVfmtFloatCount(), a = r._vData, o = r._uintVData;
a[s] = t;
a[s + 1] = e;
o[s + 2] = this._curColor;
a[s + 3] = i;
n.vertexStart++;
r._dirty = !0;
};
return e;
})(n.default);
i.default = x;
n.default.register(cc.Graphics, x);
e.exports = i.default;
}), {
"../../../../../renderer/core/input-assembler": 227,
"../../../../graphics/graphics": 122,
"../../../../graphics/types": 125,
"../../../assembler": 156,
"../../../index": 159,
"../../mesh-buffer": 184,
"./earcut": 166,
"./impl": 167
} ],
169: [ (function(t) {
"use strict";
cc.assemblers = {};
t("./sprite");
t("./mask-assembler");
t("./graphics");
t("./label");
t("./motion-streak");
}), {
"./graphics": 168,
"./label": 174,
"./mask-assembler": 175,
"./motion-streak": void 0,
"./sprite": 182
} ],
170: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n, r = (n = t("../../../../utils/label/bmfont")) && n.__esModule ? n : {
default: n
};
function s(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var a = 0, o = (function(t) {
s(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i.initData = function() {
this._renderData.createFlexData(0, 4, 6, this.getVfmt());
};
i._reserveQuads = function(t, e) {
var i = 4 * e, n = 6 * e, r = this._renderData._flexBuffer;
r.reserve(i, n);
r.used(i, n);
for (var s = this._renderData.iDatas[0], o = 0, c = 0, u = n; o < u; o += 6, c += 4) {
s[o] = c;
s[o + 1] = c + 1;
s[o + 2] = c + 2;
s[o + 3] = c + 1;
s[o + 4] = c + 3;
s[o + 5] = c + 2;
}
a = 0;
};
i._quadsUpdated = function() {
a = 0;
this._renderData._flexBuffer.used(this.verticesCount, this.indicesCount);
};
i._getColor = function(t) {
return t.node._color._val;
};
i.appendQuad = function(t, e, i, n, r, s, o) {
var c = this._renderData, u = c.vDatas[0], l = c.uintVDatas[0];
this.verticesCount += 4;
this.indicesCount = this.verticesCount / 2 * 3;
var h, f, _, d, p = e.width, v = e.height, g = i.width, m = i.height, y = this._getColor(t), E = this.floatsPerVert, T = a + this.uvOffset;
if (n) {
h = i.x / p;
_ = (i.x + m) / p;
f = (i.y + g) / v;
d = i.y / v;
u[T] = h;
u[T + 1] = d;
u[T += E] = h;
u[T + 1] = f;
u[T += E] = _;
u[T + 1] = d;
u[T += E] = _;
u[T + 1] = f;
} else {
h = i.x / p;
_ = (i.x + g) / p;
f = (i.y + m) / v;
d = i.y / v;
u[T] = h;
u[T + 1] = f;
u[T += E] = _;
u[T + 1] = f;
u[T += E] = h;
u[T + 1] = d;
u[T += E] = _;
u[T + 1] = d;
}
h = r;
_ = r + g * o;
f = s - m * o;
d = s;
this.appendVerts(t, a, h, _, f, d);
for (var C = a + this.colorOffset, A = 0; A < 4; A++) {
l[C] = y;
C += E;
}
a += 4 * this.floatsPerVert;
};
i.appendVerts = function(t, e, i, n, r, s) {
var a = this._local, o = this.floatsPerVert;
a[e] = i;
a[e + 1] = r;
a[e += o] = n;
a[e + 1] = r;
a[e += o] = i;
a[e + 1] = s;
a[e += o] = n;
a[e + 1] = s;
};
i.updateWorldVerts = function(t) {
for (var e = t.node._worldMatrix.m, i = e[0], n = e[1], r = e[4], s = e[5], a = e[12], o = e[13], c = this._local, u = this._renderData.vDatas[0], l = this.floatsPerVert, h = 0; h < c.length; h += l) {
var f = c[h], _ = c[h + 1];
u[h] = f * i + _ * r + a;
u[h + 1] = f * n + _ * s + o;
}
};
return e;
})(r.default);
i.default = o;
e.exports = i.default;
}), {
"../../../../utils/label/bmfont": 161
} ],
171: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
function n(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
t("../../../../../platform/js"), t("./bmfont");
var r = t("../../../../utils/label/letter-font"), s = cc.color(255, 255, 255, 255), a = (function(t) {
n(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i.createData = function(t) {
return t.requestRenderData();
};
i._getColor = function(t) {
s._fastSetA(t.node._color.a);
return s._val;
};
i.updateColor = function(e) {
var i = this._getColor(e);
t.prototype.updateColor.call(this, e, i);
};
return e;
})(r);
i.default = a;
e.exports = i.default;
}), {
"../../../../../platform/js": 149,
"../../../../utils/label/letter-font": 163,
"./bmfont": 170
} ],
172: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n, r = (n = t("../../../../../assets/material/material-variant")) && n.__esModule ? n : {
default: n
};
t("../../../../../components/CCLabel"), t("../../../../../components/CCLabelShadow"), 
t("../../../../../components/CCLabelOutline"), t("../../../../../assets/material/CCMaterial");
var s = (function() {
function t() {}
var e = t.prototype;
e.init = function(t) {
this.labelMaterial = null;
this._label = this._renderComp = t;
renderer.CustomAssembler.prototype.ctor.call(this);
t.node._proxy.setAssembler(this);
this._layout = new jsb.LabelRenderer();
this._layout.init();
this._cfg = new DataView(this._layout._cfg);
this._layoutInfo = new DataView(this._layout._layout);
this._cfgFields = jsb.LabelRenderer._cfgFields;
this._layoutFields = jsb.LabelRenderer._layoutFields;
this._layout.bindNodeProxy(t.node._proxy);
this._bindMaterial(t);
};
e._setBufferFlag = function(t, e, i, n, r) {
if ("int8" == n && 1 == i) {
var s = t.getInt8(e);
t.setInt8(e, r | s);
} else if ("int32" == n && 4 == i) {
var a = t.getInt32(e, jsb.__isLittleEndian__);
t.setInt32(e, r | a, jsb.__isLittleEndian__);
} else cc.warn("flag storage type should be int8/int32 only, type/size -> " + n + "/" + i + ".");
};
e._updateCfgFlag = function(t) {
var e = this._cfgFields.updateFlags;
this._setBufferFlag(this._cfg, e.offset, e.size, e.type, t);
};
e._setBufferValue = function(t, e, i, n, r) {
if ("float" == n && 4 == i) t.setFloat32(e, r, jsb.__isLittleEndian__); else if ("int32" == n && 4 == i) t.setInt32(e, r, jsb.__isLittleEndian__); else if ("bool" == n && 1 == i) t.setInt8(e, r ? 1 : 0, jsb.__isLittleEndian__); else if ("Color4B" == n && 4 == i) {
t.setUint8(e, r.r);
t.setUint8(e + 1, r.g);
t.setUint8(e + 2, r.b);
t.setUint8(e + 3, r.a);
} else "int8" == n && 1 == i ? t.setUint8(e, r) : cc.warn("dont know how to set value to buffer, type/size -> " + n + "/" + i + ".");
};
e._setFieldValue = function(t, e, i, n) {
var r = e[i];
this._setBufferValue(t, r.offset, r.size, r.type, n);
};
e._getBufferValue = function(t, e, i, n) {
if ("float" == n && 4 == i) return t.getFloat32(e, jsb.__isLittleEndian__);
if ("int32" == n && 4 == i) return t.getInt32(e, jsb.__isLittleEndian__);
if ("bool" == n && 1 == i) return 0 != t.getInt8(e, jsb.__isLittleEndian__);
if ("Color4B" == n && 4 == i) return {
r: t.getUint8(e),
g: t.getUint8(e + 1),
b: t.getUint8(e + 2),
a: t.getUint8(e + 3)
};
if ("int8" == n && 1 == i) return t.getUint8(e);
cc.warn("dont know how to get value from buffer, type/size -> " + n + "/" + i + ".");
};
e._getFieldValue = function(t, e, i) {
var n = e[i];
return this._getBufferValue(t, n.offset, n.size, n.type);
};
e._getLayoutValue = function(t) {
return this._getFieldValue(this._layoutInfo, this._layoutFields, t);
};
e._setLayoutValue = function(t, e) {
return this._setFieldValue(this._layoutInfo, this._layoutFields, t, e);
};
e._updateCfgFlag_Content = function() {
this._updateCfgFlag(1);
};
e._updateCfgFlag_Font = function() {
this._updateCfgFlag(2);
};
e._colorEqual = function(t, e) {
return t.r == e.r && t.g == e.g && t.b == e.b && t.a == e.a;
};
e._colorToObj = function(t, e, i, n) {
return {
r: t,
g: e,
b: i,
a: n
};
};
e.setString = function(t) {
if (t != this._layout.string) {
this._layout.string = t;
this._updateCfgFlag_Content();
}
};
e.setFontPath = function(t) {
if (t != this._layout.fontPath) {
this._layout.fontPath = t;
this._updateCfgFlag_Font();
}
};
e.setFontSize = function(t, e) {
if (this._getFieldValue(this._cfg, this._cfgFields, "fontSize") != t) {
this._setFieldValue(this._cfg, this._cfgFields, "fontSize", t);
this._setFieldValue(this._cfg, this._cfgFields, "fontSizeRetina", e);
this._updateCfgFlag_Font();
}
};
e.setOutline = function(t) {
var e = this._getLayoutValue("outlineSize");
e > 0 != t > 0 && this._updateCfgFlag_Font();
if (e != t) {
this._updateCfgFlag_Content();
this._setLayoutValue("outlineSize", t);
}
};
e.setOutlineColor = function(t) {
var e = this._getLayoutValue("outlineColor");
if (!this._colorEqual(e, t)) {
this._setLayoutValue("outlineColor", t);
this._updateCfgFlag_Content();
}
};
e.setLineHeight = function(t) {
if (this._getLayoutValue("lineHeight") != t) {
this._setLayoutValue("lineHeight", t);
this._updateCfgFlag_Content();
}
};
e.setOverFlow = function(t) {
if (this._getLayoutValue("overflow") != t) {
this._setLayoutValue("overflow", t);
this._updateCfgFlag_Content();
}
};
e.setEnableWrap = function(t) {
if (this._getLayoutValue("wrap") != t) {
this._setLayoutValue("wrap", t);
this._updateCfgFlag_Content();
}
};
e.setVerticalAlign = function(t) {
if (this._getLayoutValue("valign") != t) {
this._setLayoutValue("valign", t);
this._updateCfgFlag_Content();
}
};
e.setHorizontalAlign = function(t) {
if (this._getLayoutValue("halign") != t) {
this._setLayoutValue("halign", t);
this._updateCfgFlag_Content();
}
};
e.setContentSize = function(t, e) {
var i = this._getLayoutValue("width"), n = this._getLayoutValue("height");
if (i != t || n != e) {
this._setLayoutValue("height", e);
this._setLayoutValue("width", t);
this._updateCfgFlag_Content();
}
};
e.setAnchorPoint = function(t, e) {
var i = this._getLayoutValue("anchorX"), n = this._getLayoutValue("anchorY");
if (i != t || n != e) {
this._setLayoutValue("anchorX", t);
this._setLayoutValue("anchorY", e);
this._updateCfgFlag_Content();
}
};
e.setColor = function(t) {
var e = this._getLayoutValue("color");
if (!this._colorEqual(e, t)) {
this._setLayoutValue("color", t);
this._updateCfgFlag_Content();
}
};
e.setShadow = function(t, e, i) {
var n = this._getLayoutValue("shadowBlur"), r = this._getLayoutValue("shadowX"), s = this._getLayoutValue("shadowY");
n > 0 != i > 0 && this._updateCfgFlag_Font();
var a = !1;
if (n != i) {
this._setLayoutValue("shadowBlur", i);
a = !0;
}
if (r != t) {
this._setLayoutValue("shadowX", t);
a = !0;
}
if (s != e) {
this._setLayoutValue("shadowY", e);
a = !0;
}
a && this._updateCfgFlag_Content();
};
e.setShadowColor = function(t) {
var e = this._getLayoutValue("shadowColor");
if (!this._colorEqual(e, t)) {
this._setLayoutValue("shadowColor", t);
this._updateCfgFlag_Content();
}
};
e.setItalic = function(t) {
if (this._getLayoutValue("italic") != t) {
this._setLayoutValue("italic", t);
this._updateCfgFlag_Content();
}
};
e.setBold = function(t) {
if (this._getLayoutValue("bold") != t) {
this._setLayoutValue("bold", t);
this._updateCfgFlag_Content();
this._updateCfgFlag_Font();
}
};
e.setUnderline = function(t) {
if (this._getLayoutValue("underline") != t) {
this._setLayoutValue("underline", t);
this._updateCfgFlag_Content();
}
};
e.setSpacingX = function(t) {
if (this._getLayoutValue("spaceX") != t && "number" == typeof t && !isNaN(t)) {
this._setLayoutValue("spaceX", t);
this._updateCfgFlag_Content();
}
};
e.updateRenderData = function(t) {
if (t._vertsDirty) {
t.font && t.font.nativeUrl && this.setFontPath(cc.assetManager.cacheManager.getCache(t.font.nativeUrl) || t.font.nativeUrl);
var e = this._layout, i = t.node.color, n = t.node, r = t.fontSize;
this.setString(t.string);
this.setFontSize(t.fontSize, r / 72 * t.fontSize);
this.setLineHeight(t.lineHeight);
this.setEnableWrap(t.enableWrapText);
this.setItalic(t.enableItalic);
this.setUnderline(t.enableUnderline);
this.setBold(t.enableBold);
this.setOverFlow(t.overflow);
this.setVerticalAlign(t.verticalAlign);
this.setHorizontalAlign(t.horizontalAlign);
this.setSpacingX(t.spacingX);
this.setContentSize(n.getContentSize().width, n.getContentSize().height);
this.setAnchorPoint(n.anchorX, n.anchorY);
this.setColor(this._colorToObj(i.getR(), i.getG(), i.getB(), Math.ceil(i.getA() * n.opacity / 255)));
var s = n.getComponent(cc.LabelShadow);
if (s && s.enabled) {
var a = s.color;
this.setShadow(s.offset.x, s.offset.y, s.blur);
this.setShadowColor(this._colorToObj(a.getR(), a.getG(), a.getB(), Math.ceil(a.getA() * n.opacity / 255)));
} else this.setShadow(0, 0, -1);
this._updateTTFMaterial(t);
e.render();
}
};
e._bindMaterial = function(t) {
var e = this.labelMaterial;
if (!e) {
e = r.default.createWithBuiltin("2d-label", t);
this.labelMaterial = e;
}
return e;
};
e._updateTTFMaterial = function(t) {
var e = this._bindMaterial(t), i = this._label.node, n = this._layout, r = i.getComponent(cc.LabelOutline), s = 0;
if (r && r.enabled && r.width > 0) {
s = Math.max(Math.min(r.width / 10, .4), .1);
var a = r.color;
this.setOutlineColor(this._colorToObj(a.getR(), a.getG(), a.getB(), Math.ceil(a.getA() * i.opacity / 255)));
}
this.setOutline(s);
e.define("CC_USE_MODEL", !0);
e.define("USE_TEXTURE_ALPHAONLY", !0);
e.define("USE_SDF", s > 0 || t.enableBold);
e.define("USE_SDF_EXTEND", t.enableBold ? 1 : 0);
void 0 !== e.getDefine("CC_SUPPORT_standard_derivatives") && cc.sys.glExtension("OES_standard_derivatives") && e.define("CC_SUPPORT_standard_derivatives", !0);
n.setEffect(e.effect._nativeObj);
};
e.fillBuffers = function() {
this._layout.render();
};
e.getVfmt = function() {};
return t;
})();
i.default = s;
e.exports = i.default;
}), {
"../../../../../assets/material/CCMaterial": 76,
"../../../../../assets/material/material-variant": 83,
"../../../../../components/CCLabel": 96,
"../../../../../components/CCLabelOutline": 97,
"../../../../../components/CCLabelShadow": 98
} ],
173: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n, r = (n = t("../../../../utils/label/ttf")) && n.__esModule ? n : {
default: n
};
function s(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var a = t("../../../../../components/CCLabelShadow"), o = cc.color(255, 255, 255, 255), c = (function(t) {
s(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i.updateUVs = function(t) {
for (var e = this._renderData.vDatas[0], i = t._frame.uv, n = this.uvOffset, r = this.floatsPerVert, s = 0; s < 4; s++) {
var a = 2 * s, o = r * s + n;
e[o] = i[a];
e[o + 1] = i[a + 1];
}
};
i.updateColor = function(e) {
o._fastSetA(e.node._color.a);
var i = o._val;
t.prototype.updateColor.call(this, e, i);
};
i.updateVerts = function(t) {
var e = t.node, i = t._ttfTexture.width, n = t._ttfTexture.height, r = e.anchorX * e.width, s = e.anchorY * e.height, o = a && t.getComponent(a);
if (o && o._enabled) {
var c = (i - e.width) / 2, u = (n - e.height) / 2, l = o.offset;
-l.x > c ? r += i - e.width : c > l.x && (r += c - l.x);
-l.y > u ? s += n - e.height : u > l.y && (s += u - l.y);
}
var h = this._local;
h[0] = -r;
h[1] = -s;
h[2] = i - r;
h[3] = n - s;
this.updateUVs(t);
this.updateWorldVerts(t);
};
return e;
})(r.default);
i.default = c;
e.exports = i.default;
}), {
"../../../../../components/CCLabelShadow": 98,
"../../../../utils/label/ttf": 164
} ],
174: [ (function(t) {
"use strict";
var e = u(t("../../../assembler")), i = u(t("../../../../components/CCLabel")), n = u(t("./2d/ttf")), r = u(t("./2d/bmfont")), s = u(t("./2d/letter")), a = u(t("./3d/ttf")), o = u(t("./3d/bmfont")), c = u(t("./3d/letter"));
function u(t) {
return t && t.__esModule ? t : {
default: t
};
}
var l;
l = t("./2d/nativeTTF");
i.default._canvasPool = {
pool: [],
get: function() {
var t = this.pool.pop();
if (!t) {
var e = document.createElement("canvas"), i = e.getContext("2d");
t = {
canvas: e,
context: i
};
i.textBaseline = "alphabetic";
}
return t;
},
put: function(t) {
this.pool.length >= 32 || this.pool.push(t);
}
};
e.default.register(cc.Label, {
getConstructor: function(t) {
var e = t.node.is3DNode, u = e ? a.default : n.default;
t.font instanceof cc.BitmapFont ? u = e ? o.default : r.default : t.cacheMode === i.default.CacheMode.CHAR && (!e && jsb.LabelRenderer && t.font instanceof cc.TTFFont && t._useNativeTTF() ? u = l : cc.sys.platform === cc.sys.WECHAT_GAME_SUB ? cc.warn("sorry, subdomain does not support CHAR mode currently!") : u = e ? c.default : s.default);
return u;
},
TTF: n.default,
Bmfont: r.default,
Letter: s.default,
TTF3D: a.default,
Bmfont3D: o.default,
Letter3D: c.default,
NativeTTF: l
});
}), {
"../../../../components/CCLabel": 96,
"../../../assembler": 156,
"./2d/bmfont": 170,
"./2d/letter": 171,
"./2d/nativeTTF": 172,
"./2d/ttf": 173,
"./3d/bmfont": void 0,
"./3d/letter": void 0,
"./3d/ttf": void 0
} ],
175: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.MaskAssembler = void 0;
var n, r = (n = t("../../assembler")) && n.__esModule ? n : {
default: n
};
function s(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var a = t("../../../components/CCMask"), o = t("../../render-flow"), c = t("./sprite/2d/simple"), u = t("./graphics"), l = t("../../../../renderer/gfx"), h = t("../vertex-format").vfmtPos, f = 8, _ = [];
function d() {
return 1 << _.length - 1;
}
function p() {
for (var t = 0, e = 0; e < _.length; ++e) t += 1 << e;
return t;
}
function v(t, e, i, n, r, s) {
var a = t.effect, o = l.STENCIL_OP_KEEP, c = l.STENCIL_OP_KEEP;
a.setStencil(l.STENCIL_ENABLE, e, n, r, i, o, c, s);
}
function g(t) {
_.length + 1 > f && cc.errorID(9e3, f);
_.push(t);
}
function m(t, e) {
0 === _.length && cc.errorID(9001);
_.pop();
0 === _.length ? e._flushMaterial(t._exitMaterial) : T(e);
}
function y(t, e) {
var i = l.DS_FUNC_NEVER, n = d(), r = n, s = n, a = t.inverted ? l.STENCIL_OP_REPLACE : l.STENCIL_OP_ZERO;
v(t._clearMaterial, i, a, n, r, s);
var o = e.getBuffer("mesh", h), c = o.request(4, 6), u = c.indiceOffset, f = c.byteOffset >> 2, _ = c.vertexOffset, p = o._vData, g = o._iData;
p[f++] = -1;
p[f++] = -1;
p[f++] = -1;
p[f++] = 1;
p[f++] = 1;
p[f++] = 1;
p[f++] = 1;
p[f++] = -1;
g[u++] = _;
g[u++] = _ + 3;
g[u++] = _ + 1;
g[u++] = _ + 1;
g[u++] = _ + 3;
g[u++] = _ + 2;
e.node = e._dummyNode;
e.material = t._clearMaterial;
e._flush();
}
function E(t, e) {
var i = l.DS_FUNC_NEVER, n = d(), r = n, s = n, o = t.inverted ? l.STENCIL_OP_ZERO : l.STENCIL_OP_REPLACE;
v(t._materials[0], i, o, n, r, s);
e.material = t._materials[0];
if (t._type === a.Type.IMAGE_STENCIL) {
e.node = e._dummyNode;
c.prototype.fillBuffers.call(t._assembler, t, e);
e._flush();
} else {
e.node = t.node;
u.prototype.fillBuffers.call(t._graphics._assembler, t._graphics, e);
}
}
function T(t) {
var e = l.DS_FUNC_EQUAL, i = l.STENCIL_OP_KEEP, n = p(), r = n, s = d(), a = _[_.length - 1];
v(a._enableMaterial, e, i, n, r, s);
t._flushMaterial(a._enableMaterial);
}
var C = (function(t) {
s(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i.updateRenderData = function(t) {
if (t._type === a.Type.IMAGE_STENCIL) t.spriteFrame ? c.prototype.updateRenderData.call(this, t) : t.setMaterial(0, null); else {
t._graphics.setMaterial(0, t._materials[0]);
u.prototype.updateRenderData.call(t._graphics._assembler, t._graphics, t._graphics);
}
};
i.fillBuffers = function(t, e) {
if (t._type !== a.Type.IMAGE_STENCIL || t.spriteFrame) {
g(t);
y(t, e);
E(t, e);
T(e);
}
t.node._renderFlag |= o.FLAG_UPDATE_RENDER_DATA;
};
i.postFillBuffers = function(t, e) {
(t._type !== a.Type.IMAGE_STENCIL || t.spriteFrame) && m(t, e);
t.node._renderFlag |= o.FLAG_UPDATE_RENDER_DATA;
};
return e;
})(c);
i.MaskAssembler = C;
r.default.register(a, C);
}), {
"../../../../renderer/gfx": 231,
"../../../components/CCMask": 100,
"../../assembler": 156,
"../../render-flow": 160,
"../vertex-format": 186,
"./graphics": 168,
"./sprite/2d/simple": 179
} ],
176: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n, r = (n = t("../../../../assembler-2d")) && n.__esModule ? n : {
default: n
};
function s(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var a = t("../../../../../components/CCSprite").FillType, o = (function(t) {
s(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i.updateRenderData = function(t) {
var e = t._spriteFrame;
this.packToDynamicAtlas(t, e);
if (t._vertsDirty) {
var i = t._fillStart, n = t._fillRange;
if (n < 0) {
i += n;
n = -n;
}
n = (n = (n = i + n) > 1 ? 1 : n) < 0 ? 0 : n;
var r = (i = (i = i > 1 ? 1 : i) < 0 ? 0 : i) + (n = (n -= i) < 0 ? 0 : n);
r = r > 1 ? 1 : r;
this.updateUVs(t, i, r);
this.updateVerts(t, i, r);
t._vertsDirty = !1;
}
};
i.updateUVs = function(t, e, i) {
var n, r, s, o, c, u, l, h, f, _, d = t._spriteFrame, p = d._texture.width, v = d._texture.height, g = d._rect;
if (d._rotated) {
n = g.x / p;
r = (g.y + g.width) / v;
s = c = n;
l = f = (g.x + g.height) / p;
u = _ = r;
o = h = g.y / v;
} else {
n = g.x / p;
r = (g.y + g.height) / v;
s = l = n;
c = f = (g.x + g.width) / p;
o = u = r;
h = _ = g.y / v;
}
var m = this._renderData.vDatas[0], y = this.uvOffset, E = this.floatsPerVert;
switch (t._fillType) {
case a.HORIZONTAL:
m[y] = s + (c - s) * e;
m[y + 1] = o + (u - o) * e;
m[y + E] = s + (c - s) * i;
m[y + E + 1] = o + (u - o) * i;
m[y + 2 * E] = l + (f - l) * e;
m[y + 2 * E + 1] = h + (_ - h) * e;
m[y + 3 * E] = l + (f - l) * i;
m[y + 3 * E + 1] = h + (_ - h) * i;
break;

case a.VERTICAL:
m[y] = s + (l - s) * e;
m[y + 1] = o + (h - o) * e;
m[y + E] = c + (f - c) * e;
m[y + E + 1] = u + (_ - u) * e;
m[y + 2 * E] = s + (l - s) * i;
m[y + 2 * E + 1] = o + (h - o) * i;
m[y + 3 * E] = c + (f - c) * i;
m[y + 3 * E + 1] = u + (_ - u) * i;
break;

default:
cc.errorID(2626);
}
};
i.updateVerts = function(t, e, i) {
var n, r = t.node, s = r.width, o = r.height, c = r.anchorX * s, u = r.anchorY * o, l = -c, h = -u, f = s - c, _ = o - u;
switch (t._fillType) {
case a.HORIZONTAL:
n = l + (f - l) * i;
l += (f - l) * e;
f = n;
break;

case a.VERTICAL:
n = h + (_ - h) * i;
h += (_ - h) * e;
_ = n;
break;

default:
cc.errorID(2626);
}
var d = this._local;
d[0] = l;
d[1] = h;
d[2] = f;
d[3] = _;
this.updateWorldVerts(t);
};
return e;
})(r.default);
i.default = o;
e.exports = i.default;
}), {
"../../../../../components/CCSprite": 106,
"../../../../assembler-2d": 154
} ],
177: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n;
function r(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var s = (function(t) {
r(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i.initData = function() {
this._renderData.createFlexData(0, 4, 6, this.getVfmt());
};
i.updateRenderData = function(t) {
this.packToDynamicAtlas(t, t._spriteFrame);
var e = t.spriteFrame;
if (e) {
var i = e.vertices;
if (i) {
this.verticesCount = i.x.length;
this.indicesCount = i.triangles.length;
var n = this._renderData._flexBuffer;
if (n.reserve(this.verticesCount, this.indicesCount)) {
this.updateColor(t);
t._vertsDirty = !0;
}
n.used(this.verticesCount, this.indicesCount);
this.updateIndices(i.triangles);
if (t._vertsDirty) {
this.updateUVs(t);
this.updateVerts(t);
this.updateWorldVerts(t);
t._vertsDirty = !1;
}
}
}
};
i.updateIndices = function(t) {
this._renderData.iDatas[0].set(t);
};
i.updateUVs = function(t) {
for (var e = t.spriteFrame.vertices, i = e.nu, n = e.nv, r = this.uvOffset, s = this.floatsPerVert, a = this._renderData.vDatas[0], o = 0; o < i.length; o++) {
var c = s * o + r;
a[c] = i[o];
a[c + 1] = n[o];
}
};
i.updateVerts = function(t) {
var e = t.node, i = Math.abs(e.width), n = Math.abs(e.height), r = e.anchorX * i, s = e.anchorY * n, a = t.spriteFrame, o = a.vertices, c = o.x, u = o.y, l = a._originalSize.width, h = a._originalSize.height, f = a._rect.width, _ = a._rect.height, d = a._offset.x + (l - f) / 2, p = a._offset.y + (h - _) / 2, v = i / (t.trim ? f : l), g = n / (t.trim ? _ : h), m = this._local;
if (t.trim) for (var y = 0, E = c.length; y < E; y++) {
var T = 2 * y;
m[T] = (c[y] - d) * v - r;
m[T + 1] = (h - u[y] - p) * g - s;
} else for (var C = 0, A = c.length; C < A; C++) {
var S = 2 * C;
m[S] = c[C] * v - r;
m[S + 1] = (h - u[C]) * g - s;
}
};
i.updateWorldVerts = function(t) {
for (var e = t.node._worldMatrix.m, i = e[0], n = e[1], r = e[4], s = e[5], a = e[12], o = e[13], c = this._local, u = this._renderData.vDatas[0], l = this.floatsPerVert, h = 0, f = this.verticesCount; h < f; h++) {
var _ = c[2 * h], d = c[2 * h + 1];
u[l * h] = _ * i + d * r + a;
u[l * h + 1] = _ * n + d * s + o;
}
};
return e;
})(((n = t("../../../../assembler-2d")) && n.__esModule ? n : {
default: n
}).default);
i.default = s;
e.exports = i.default;
}), {
"../../../../assembler-2d": 154
} ],
178: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n, r = (n = t("../../../../assembler-2d")) && n.__esModule ? n : {
default: n
};
function s(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var a = 2 * Math.PI, o = [ cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0) ], c = [ 0, 0, 0, 0 ], u = [ 0, 0, 0, 0, 0, 0, 0, 0 ], l = [ cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0) ], h = [ cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0) ], f = cc.v2(0, 0), _ = [];
function d(t, e, i, n, r, s, a) {
var o, c, u = Math.sin(s), l = Math.cos(s);
if (0 !== Math.cos(s)) {
o = u / l;
if ((t - r.x) * l > 0) {
var h = r.y + o * (t - r.x);
a[0].x = t;
a[0].y = h;
}
if ((e - r.x) * l > 0) {
var f = r.y + o * (e - r.x);
a[2].x = e;
a[2].y = f;
}
}
if (0 !== Math.sin(s)) {
c = l / u;
if ((n - r.y) * u > 0) {
var _ = r.x + c * (n - r.y);
a[3].x = _;
a[3].y = n;
}
if ((i - r.y) * u > 0) {
var d = r.x + c * (i - r.y);
a[1].x = d;
a[1].y = i;
}
}
}
function p(t) {
var e = t.node, i = e.width, n = e.height, r = e.anchorX * i, s = e.anchorY * n, a = -r, u = -s, l = i - r, h = n - s, d = c;
d[0] = a;
d[1] = u;
d[2] = l;
d[3] = h;
var p = t._fillCenter, v = f.x = Math.min(Math.max(0, p.x), 1) * (l - a) + a, g = f.y = Math.min(Math.max(0, p.y), 1) * (h - u) + u;
o[0].x = o[3].x = a;
o[1].x = o[2].x = l;
o[0].y = o[1].y = u;
o[2].y = o[3].y = h;
_.length = 0;
v !== d[0] && (_[0] = [ 3, 0 ]);
v !== d[2] && (_[2] = [ 1, 2 ]);
g !== d[1] && (_[1] = [ 0, 1 ]);
g !== d[3] && (_[3] = [ 2, 3 ]);
}
function v(t) {
var e, i, n, r, s = t._texture.width, a = t._texture.height, o = t._rect, c = u;
if (t._rotated) {
e = o.x / s;
i = (o.x + o.height) / s;
n = o.y / a;
r = (o.y + o.width) / a;
c[0] = c[2] = e;
c[4] = c[6] = i;
c[3] = c[7] = r;
c[1] = c[5] = n;
} else {
e = o.x / s;
i = (o.x + o.width) / s;
n = o.y / a;
r = (o.y + o.height) / a;
c[0] = c[4] = e;
c[2] = c[6] = i;
c[1] = c[3] = r;
c[5] = c[7] = n;
}
}
function g(t, e) {
var i, n;
i = e.x - t.x;
n = e.y - t.y;
if (0 !== i || 0 !== n) {
if (0 === i) return n > 0 ? .5 * Math.PI : 1.5 * Math.PI;
var r = Math.atan(n / i);
i < 0 && (r += Math.PI);
return r;
}
}
var m = (function(t) {
s(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i.initData = function() {
this._renderData.createFlexData(0, 4, 6, this.getVfmt());
this.updateIndices();
};
i.updateRenderData = function(e) {
t.prototype.updateRenderData.call(this, e);
var i = e.spriteFrame;
this.packToDynamicAtlas(e, i);
if (e._vertsDirty) {
var n = e._fillStart, r = e._fillRange;
if (r < 0) {
n += r;
r = -r;
}
for (;n >= 1; ) n -= 1;
for (;n < 0; ) n += 1;
n *= a;
r *= a;
p(e);
v(i);
d(c[0], c[2], c[1], c[3], f, n, l);
d(c[0], c[2], c[1], c[3], f, n + r, h);
this.updateVerts(e, n, r);
e._vertsDirty = !1;
}
};
i.updateVerts = function(t, e, i) {
var n = e + i, r = this._local;
r.length = 0;
for (var s = 0, c = 3 * this.floatsPerVert, u = 0; u < 4; ++u) {
var d = _[u];
if (d) if (i >= a) {
r.length = s + c;
this._generateTriangle(r, s, f, o[d[0]], o[d[1]]);
s += c;
} else {
var p = g(f, o[d[0]]), v = g(f, o[d[1]]);
v < p && (v += a);
p -= a;
v -= a;
for (var m = 0; m < 3; ++m) {
if (p >= n) ; else if (p >= e) {
r.length = s + c;
v >= n ? this._generateTriangle(r, s, f, o[d[0]], h[u]) : this._generateTriangle(r, s, f, o[d[0]], o[d[1]]);
s += c;
} else if (v <= e) ; else if (v <= n) {
r.length = s + c;
this._generateTriangle(r, s, f, l[u], o[d[1]]);
s += c;
} else {
r.length = s + c;
this._generateTriangle(r, s, f, l[u], h[u]);
s += c;
}
p += a;
v += a;
}
}
}
this.allocWorldVerts(t);
this.updateWorldVerts(t);
};
i.allocWorldVerts = function(t) {
var e = t.node._color._val, i = this._renderData, n = this.floatsPerVert, r = this._local, s = r.length / n;
this.verticesCount = this.indicesCount = s;
var a = i._flexBuffer;
a.reserve(s, s) && this.updateIndices();
a.used(this.verticesCount, this.indicesCount);
for (var o = i.vDatas[0], c = i.uintVDatas[0], u = this.uvOffset, l = 0; l < r.length; l += n) {
var h = l + u;
o[h] = r[h];
o[h + 1] = r[h + 1];
c[h + 2] = e;
}
};
i.updateIndices = function() {
for (var t = this._renderData.iDatas[0], e = 0; e < t.length; e++) t[e] = e;
};
i.updateWorldVerts = function(t) {
for (var e = t.node._worldMatrix.m, i = e[0], n = e[1], r = e[4], s = e[5], a = e[12], o = e[13], c = this._local, u = this._renderData.vDatas[0], l = this.floatsPerVert, h = 0; h < c.length; h += l) {
var f = c[h], _ = c[h + 1];
u[h] = f * i + _ * r + a;
u[h + 1] = f * n + _ * s + o;
}
};
i._generateTriangle = function(t, e, i, n, r) {
var s = c, a = s[0], o = s[1], u = s[2], l = s[3], h = this.floatsPerVert;
t[e] = i.x;
t[e + 1] = i.y;
t[e + h] = n.x;
t[e + h + 1] = n.y;
t[e + 2 * h] = r.x;
t[e + 2 * h + 1] = r.y;
var f, _, d = this.uvOffset;
f = (i.x - a) / (u - a);
_ = (i.y - o) / (l - o);
this._generateUV(f, _, t, e + d);
f = (n.x - a) / (u - a);
_ = (n.y - o) / (l - o);
this._generateUV(f, _, t, e + h + d);
f = (r.x - a) / (u - a);
_ = (r.y - o) / (l - o);
this._generateUV(f, _, t, e + 2 * h + d);
};
i._generateUV = function(t, e, i, n) {
var r = u, s = r[0] + (r[2] - r[0]) * t, a = r[4] + (r[6] - r[4]) * t, o = r[1] + (r[3] - r[1]) * t, c = r[5] + (r[7] - r[5]) * t;
i[n] = s + (a - s) * e;
i[n + 1] = o + (c - o) * e;
};
return e;
})(r.default);
i.default = m;
e.exports = i.default;
}), {
"../../../../assembler-2d": 154
} ],
179: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n;
function r(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var s = (function(t) {
r(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i.updateRenderData = function(t) {
this.packToDynamicAtlas(t, t._spriteFrame);
if (t._vertsDirty) {
this.updateUVs(t);
this.updateVerts(t);
t._vertsDirty = !1;
}
};
i.updateUVs = function(t) {
for (var e = t._spriteFrame.uv, i = this.uvOffset, n = this.floatsPerVert, r = this._renderData.vDatas[0], s = 0; s < 4; s++) {
var a = 2 * s, o = n * s + i;
r[o] = e[a];
r[o + 1] = e[a + 1];
}
};
i.updateVerts = function(t) {
var e, i, n, r, s = t.node, a = s.width, o = s.height, c = s.anchorX * a, u = s.anchorY * o;
if (t.trim) {
e = -c;
i = -u;
n = a - c;
r = o - u;
} else {
var l = t.spriteFrame, h = l._originalSize.width, f = l._originalSize.height, _ = l._rect.width, d = l._rect.height, p = l._offset, v = a / h, g = o / f, m = p.x + (h - _) / 2, y = p.x - (h - _) / 2;
e = m * v - c;
i = (p.y + (f - d) / 2) * g - u;
n = a + y * v - c;
r = o + (p.y - (f - d) / 2) * g - u;
}
var E = this._local;
E[0] = e;
E[1] = i;
E[2] = n;
E[3] = r;
this.updateWorldVerts(t);
};
return e;
})(((n = t("../../../../assembler-2d")) && n.__esModule ? n : {
default: n
}).default);
i.default = s;
e.exports = i.default;
}), {
"../../../../assembler-2d": 154
} ],
180: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n;
function r(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var s = (function(t) {
r(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i.initData = function() {
if (!(this._renderData.meshCount > 0)) {
this._renderData.createData(0, this.verticesFloats, this.indicesCount);
for (var t = this._renderData.iDatas[0], e = 0, i = 0; i < 3; ++i) for (var n = 0; n < 3; ++n) {
var r = 4 * i + n;
t[e++] = r;
t[e++] = r + 1;
t[e++] = r + 4;
t[e++] = r + 1;
t[e++] = r + 5;
t[e++] = r + 4;
}
}
};
i.initLocal = function() {
this._local = [];
this._local.length = 8;
};
i.updateRenderData = function(t) {
var e = t._spriteFrame;
this.packToDynamicAtlas(t, e);
if (t._vertsDirty) {
this.updateUVs(t);
this.updateVerts(t);
t._vertsDirty = !1;
}
};
i.updateVerts = function(t) {
var e = t.node, i = e.width, n = e.height, r = e.anchorX * i, s = e.anchorY * n, a = t.spriteFrame, o = a.insetLeft, c = a.insetRight, u = a.insetTop, l = a.insetBottom, h = i - o - c, f = n - u - l, _ = i / (o + c), d = n / (u + l);
_ = isNaN(_) || _ > 1 ? 1 : _;
d = isNaN(d) || d > 1 ? 1 : d;
h = h < 0 ? 0 : h;
f = f < 0 ? 0 : f;
var p = this._local;
p[0] = -r;
p[1] = -s;
p[2] = o * _ - r;
p[3] = l * d - s;
p[4] = p[2] + h;
p[5] = p[3] + f;
p[6] = i - r;
p[7] = n - s;
this.updateWorldVerts(t);
};
i.updateUVs = function(t) {
for (var e = this._renderData.vDatas[0], i = t.spriteFrame.uvSliced, n = this.uvOffset, r = this.floatsPerVert, s = 0; s < 4; ++s) for (var a = 0; a < 4; ++a) {
var o = 4 * s + a, c = i[o], u = o * r;
e[u + n] = c.u;
e[u + n + 1] = c.v;
}
};
i.updateWorldVerts = function(t) {
for (var e = t.node._worldMatrix.m, i = e[0], n = e[1], r = e[4], s = e[5], a = e[12], o = e[13], c = this._local, u = this._renderData.vDatas[0], l = this.floatsPerVert, h = 0; h < 4; ++h) for (var f = c[2 * h + 1], _ = 0; _ < 4; ++_) {
var d = c[2 * _], p = (4 * h + _) * l;
u[p] = d * i + f * r + a;
u[p + 1] = d * n + f * s + o;
}
};
return e;
})(((n = t("../../../../assembler-2d")) && n.__esModule ? n : {
default: n
}).default);
i.default = s;
Object.assign(s.prototype, {
verticesCount: 16,
indicesCount: 54
});
e.exports = i.default;
}), {
"../../../../assembler-2d": 154
} ],
181: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n;
function r(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var s = (function(t) {
r(e, t);
function e() {
return t.apply(this, arguments) || this;
}
var i = e.prototype;
i.initData = function() {
this.verticesCount = 0;
this.contentWidth = 0;
this.contentHeight = 0;
this.rectWidth = 0;
this.rectHeight = 0;
this.hRepeat = 0;
this.vRepeat = 0;
this.row = 0;
this.col = 0;
this._renderData.createFlexData(0, 4, 6, this.getVfmt());
this._updateIndices();
};
i.initLocal = function() {
this._local = {
x: [],
y: []
};
};
i._updateIndices = function() {
for (var t = this._renderData.iDatas[0], e = 0, i = 0, n = t.length; e < n; e += 6, 
i += 4) {
t[e] = i;
t[e + 1] = i + 1;
t[e + 2] = i + 2;
t[e + 3] = i + 1;
t[e + 4] = i + 3;
t[e + 5] = i + 2;
}
};
i.updateRenderData = function(t) {
var e = t._spriteFrame;
this.packToDynamicAtlas(t, e);
var i = t.node, n = this.contentWidth = Math.abs(i.width), r = this.contentHeight = Math.abs(i.height), s = e._rect, a = e.insetLeft, o = e.insetRight, c = s.width - a - o, u = e.insetTop, l = e.insetBottom, h = s.height - u - l;
this.sizableWidth = n - a - o;
this.sizableHeight = r - u - l;
this.sizableWidth = this.sizableWidth > 0 ? this.sizableWidth : 0;
this.sizableHeight = this.sizableHeight > 0 ? this.sizableHeight : 0;
var f = this.hRepeat = 0 === c ? this.sizableWidth : this.sizableWidth / c, _ = this.vRepeat = 0 === h ? this.sizableHeight : this.sizableHeight / h, d = (this.row = Math.ceil(_ + 2)) * (this.col = Math.ceil(f + 2));
this.verticesCount = 4 * d;
this.indicesCount = 6 * d;
var p = this._renderData._flexBuffer;
if (p.reserve(this.verticesCount, this.indicesCount)) {
this._updateIndices();
this.updateColor(t);
}
p.used(this.verticesCount, this.indicesCount);
if (t._vertsDirty) {
this.updateUVs(t);
this.updateVerts(t);
t._vertsDirty = !1;
}
};
i.updateVerts = function(t) {
var e = t._spriteFrame, i = e._rect, n = t.node, r = n.anchorX * n.width, s = n.anchorY * n.height, a = this.row, o = this.col, c = this.contentWidth, u = this.contentHeight, l = this._local, h = l.x, f = l.y;
h.length = f.length = 0;
var _, d, p = e.insetLeft, v = e.insetRight, g = i.width - p - v, m = e.insetTop, y = e.insetBottom, E = i.height - m - y, T = n.width / (p + v) > 1 ? 1 : n.width / (p + v), C = n.height / (m + y) > 1 ? 1 : n.height / (m + y);
_ = g > 0 ? Math.floor(1e3 * this.sizableWidth) / 1e3 % g == 0 ? g : this.sizableWidth % g : this.sizableWidth;
d = E > 0 ? Math.floor(1e3 * this.sizableHeight) / 1e3 % E == 0 ? E : this.sizableHeight % E : this.sizableHeight;
for (var A = 0; A <= o; A++) 0 === A ? h[A] = -r : A > 0 && A < o ? h[A] = 1 === A ? p * T + Math.min(g, this.sizableWidth) - r : g > 0 ? A === o - 1 ? p + _ + g * (A - 2) - r : p + Math.min(g, this.sizableWidth) + g * (A - 2) - r : p + this.sizableWidth - r : A === o && (h[A] = Math.min(p + this.sizableWidth + v, c) - r);
for (var S = 0; S <= a; S++) 0 === S ? f[S] = -s : S > 0 && S < a ? f[S] = 1 === S ? y * C + Math.min(E, this.sizableHeight) - s : E > 0 ? S === a - 1 ? y + d + (S - 2) * E - s : y + Math.min(E, this.sizableHeight) + (S - 2) * E - s : y + this.sizableHeight - s : S === a && (f[S] = Math.min(y + this.sizableHeight + m, u) - s);
this.updateWorldVerts(t);
};
i.updateWorldVerts = function(t) {
for (var e, i, n, r, s = this._renderData, a = this._local, o = a.x, c = a.y, u = s.vDatas[0], l = this.row, h = this.col, f = t.node._worldMatrix.m, _ = f[0], d = f[1], p = f[4], v = f[5], g = f[12], m = f[13], y = this.floatsPerVert, E = 0, T = 0, C = l; T < C; ++T) {
n = c[T];
r = c[T + 1];
for (var A = 0, S = h; A < S; ++A) {
e = o[A];
i = o[A + 1];
u[E] = e * _ + n * p + g;
u[E + 1] = e * d + n * v + m;
u[E += y] = i * _ + n * p + g;
u[E + 1] = i * d + n * v + m;
u[E += y] = e * _ + r * p + g;
u[E + 1] = e * d + r * v + m;
u[E += y] = i * _ + r * p + g;
u[E + 1] = i * d + r * v + m;
E += y;
}
}
};
i.updateUVs = function(t) {
var e = this._renderData.vDatas[0];
if (e) for (var i = t._spriteFrame, n = i._rect, r = i.insetLeft, s = i.insetRight, a = n.width - r - s, o = i.insetTop, c = i.insetBottom, u = n.height - o - c, l = this.row, h = this.col, f = this.hRepeat, _ = this.vRepeat, d = 0, p = 0, v = t.spriteFrame.uv, g = t.spriteFrame.uvSliced, m = t.spriteFrame._rotated, y = this.floatsPerVert, E = this.uvOffset, T = 0, C = l; T < C; ++T) {
p = this.sizableHeight > u ? this.sizableHeight >= T * u ? 1 : _ % 1 : _;
for (var A = 0, S = h; A < S; ++A) {
d = this.sizableWidth > a ? this.sizableWidth >= A * a ? 1 : f % 1 : f;
if (m) {
e[E] = v[0];
e[E + 1] = v[1];
e[E += y] = v[0];
e[E + 1] = v[1] + (v[7] - v[1]) * d;
e[E += y] = v[0] + (v[6] - v[0]) * p;
e[E + 1] = v[1];
e[E += y] = e[E - y];
e[E + 1] = e[E + 1 - 2 * y];
E += y;
} else {
0 === A ? e[E] = v[0] : A > 0 && A < h - 1 ? e[E] = g[1].u : A === h - 1 && (e[E] = g[2].u);
0 === T ? e[E + 1] = g[0].v : T > 0 && T < l - 1 ? e[E + 1] = g[4].v : T === l - 1 && (e[E + 1] = g[8].v);
E += y;
0 === A ? e[E] = g[1].u + (g[2].u - g[1].u) * d : A > 0 && A < h - 1 ? e[E] = g[1].u + (g[2].u - g[1].u) * d : A === h - 1 && (e[E] = g[3].u);
0 === T ? e[E + 1] = g[0].v : T > 0 && T < l - 1 ? e[E + 1] = g[4].v : T === l - 1 && (e[E + 1] = g[8].v);
E += y;
0 === A ? e[E] = v[0] : A > 0 && A < h - 1 ? e[E] = g[1].u : A === h - 1 && (e[E] = g[2].u);
0 === T ? e[E + 1] = g[4].v + (g[8].v - g[4].v) * p : T > 0 && T < l - 1 ? e[E + 1] = g[4].v + (g[8].v - g[4].v) * p : T === l - 1 && (e[E + 1] = g[12].v);
e[E += y] = e[E - 2 * y];
e[E + 1] = e[E + 1 - y];
E += y;
}
}
}
};
return e;
})(((n = t("../../../../assembler-2d")) && n.__esModule ? n : {
default: n
}).default);
i.default = s;
e.exports = i.default;
}), {
"../../../../assembler-2d": 154
} ],
182: [ (function(t) {
"use strict";
var e = p(t("../../../assembler")), i = t("../../../../components/CCSprite"), n = p(t("./2d/simple")), r = p(t("./2d/sliced")), s = p(t("./2d/tiled")), a = p(t("./2d/radial-filled")), o = p(t("./2d/bar-filled")), c = p(t("./2d/mesh")), u = p(t("./3d/simple")), l = p(t("./3d/sliced")), h = p(t("./3d/tiled")), f = p(t("./3d/radial-filled")), _ = p(t("./3d/bar-filled")), d = p(t("./3d/mesh"));
function p(t) {
return t && t.__esModule ? t : {
default: t
};
}
var v = {
getConstructor: function(t) {
var e = t.node.is3DNode, p = e ? u.default : n.default;
switch (t.type) {
case i.Type.SLICED:
p = e ? l.default : r.default;
break;

case i.Type.TILED:
p = e ? h.default : s.default;
break;

case i.Type.FILLED:
p = t._fillType === i.FillType.RADIAL ? e ? f.default : a.default : e ? _.default : o.default;
break;

case i.Type.MESH:
p = e ? d.default : c.default;
}
return p;
},
Simple: n.default,
Sliced: r.default,
Tiled: s.default,
RadialFilled: a.default,
BarFilled: o.default,
Mesh: c.default,
Simple3D: u.default,
Sliced3D: l.default,
Tiled3D: h.default,
RadialFilled3D: f.default,
BarFilled3D: _.default,
Mesh3D: d.default
};
e.default.register(cc.Sprite, v);
}), {
"../../../../components/CCSprite": 106,
"../../../assembler": 156,
"./2d/bar-filled": 176,
"./2d/mesh": 177,
"./2d/radial-filled": 178,
"./2d/simple": 179,
"./2d/sliced": 180,
"./2d/tiled": 181,
"./3d/bar-filled": void 0,
"./3d/mesh": void 0,
"./3d/radial-filled": void 0,
"./3d/simple": void 0,
"./3d/sliced": void 0,
"./3d/tiled": void 0
} ],
183: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = (function() {
function t(t, e, i, n, r) {
this._handler = t;
this._index = e;
this._vfmt = r;
this._verticesBytes = r._bytes;
this._initVerticesCount = i;
this._initIndicesCount = n;
this.reset();
}
var e = t.prototype;
e._reallocVData = function(t, e) {
this.vData = new Float32Array(t);
this.uintVData = new Uint32Array(this.vData.buffer);
e && this.vData.set(e);
this._handler.updateMesh(this._index, this.vData, this.iData);
};
e._reallocIData = function(t, e) {
this.iData = new Uint16Array(t);
e && this.iData.set(e);
this._handler.updateMesh(this._index, this.vData, this.iData);
};
e.reserve = function(t, e) {
var i = t * this._verticesBytes >> 2, n = this.vData.length, r = !1;
if (i > n) {
for (;n < i; ) n *= 2;
this._reallocVData(n, this.vData);
r = !0;
}
var s = this.iData.length;
if (e > s) {
for (;s < e; ) s *= 2;
this._reallocIData(e, this.iData);
r = !0;
}
return r;
};
e.used = function(t, e) {
this.usedVertices = t;
this.usedIndices = e;
this.usedVerticesFloats = t * this._verticesBytes >> 2;
this._handler.updateMeshRange(t, e);
};
e.reset = function() {
var t = this._initVerticesCount * this._verticesBytes >> 2;
this._reallocVData(t);
this._reallocIData(this._initIndicesCount);
this.usedVertices = 0;
this.usedVerticesFloats = 0;
this.usedIndices = 0;
};
return t;
})();
i.default = n;
cc.FlexBuffer = n;
e.exports = i.default;
}), {} ],
184: [ (function(t, e) {
"use strict";
var i, n = (i = t("../../../renderer/gfx")) && i.__esModule ? i : {
default: i
}, r = cc.sys.os === cc.sys.OS_IOS && cc.sys.isBrowser && cc.sys.isMobile && /iPhone OS 14/.test(window.navigator.userAgent), s = cc.Class({
name: "cc.MeshBuffer",
ctor: function(t, e) {
this.init(t, e);
},
init: function(t, e) {
this.byteOffset = 0;
this.indiceOffset = 0;
this.vertexOffset = 0;
this.indiceStart = 0;
this._dirty = !1;
this._vertexFormat = e;
this._vertexBytes = this._vertexFormat._bytes;
this._arrOffset = 0;
this._vbArr = [];
this._vb = new n.default.VertexBuffer(t._device, e, n.default.USAGE_DYNAMIC, new ArrayBuffer(), 0);
this._vbArr[0] = this._vb;
this._ibArr = [];
this._ib = new n.default.IndexBuffer(t._device, n.default.INDEX_FMT_UINT16, n.default.USAGE_STATIC, new ArrayBuffer(), 0);
this._ibArr[0] = this._ib;
this._vData = null;
this._uintVData = null;
this._iData = null;
this._batcher = t;
this._initVDataCount = 256 * e._bytes;
this._initIDataCount = 1536;
this._offsetInfo = {
byteOffset: 0,
vertexOffset: 0,
indiceOffset: 0
};
this._reallocBuffer();
},
uploadData: function() {
if (0 !== this.byteOffset && this._dirty) {
var t = new Float32Array(this._vData.buffer, 0, this.byteOffset >> 2), e = new Uint16Array(this._iData.buffer, 0, this.indiceOffset);
this._vb.update(0, t);
this._ib.update(0, e);
this._dirty = !1;
}
},
switchBuffer: function() {
var t = ++this._arrOffset;
this.byteOffset = 0;
this.vertexOffset = 0;
this.indiceOffset = 0;
this.indiceStart = 0;
if (t < this._vbArr.length) {
this._vb = this._vbArr[t];
this._ib = this._ibArr[t];
} else {
this._vb = new n.default.VertexBuffer(this._batcher._device, this._vertexFormat, n.default.USAGE_DYNAMIC, new ArrayBuffer(), 0);
this._vbArr[t] = this._vb;
this._ib = new n.default.IndexBuffer(this._batcher._device, n.default.INDEX_FMT_UINT16, n.default.USAGE_STATIC, new ArrayBuffer(), 0);
this._ibArr[t] = this._ib;
}
},
checkAndSwitchBuffer: function(t) {
if (this.vertexOffset + t > 65535) {
this.uploadData();
this._batcher._flush();
this.switchBuffer();
}
},
requestStatic: function(t, e) {
this.checkAndSwitchBuffer(t);
var i = this.byteOffset + t * this._vertexBytes, n = this.indiceOffset + e, r = this._vData.byteLength, s = this._iData.length;
if (i > r || n > s) {
for (;r < i || s < n; ) {
this._initVDataCount *= 2;
this._initIDataCount *= 2;
r = 4 * this._initVDataCount;
s = this._initIDataCount;
}
this._reallocBuffer();
}
this._updateOffset(t, e, i);
},
_updateOffset: function(t, e, i) {
var n = this._offsetInfo;
n.vertexOffset = this.vertexOffset;
this.vertexOffset += t;
n.indiceOffset = this.indiceOffset;
this.indiceOffset += e;
n.byteOffset = this.byteOffset;
this.byteOffset = i;
this._dirty = !0;
},
request: function(t, e) {
if (this._batcher._buffer !== this) {
this._batcher._flush();
this._batcher._buffer = this;
}
this.requestStatic(t, e);
return this._offsetInfo;
},
_reallocBuffer: function() {
this._reallocVData(!0);
this._reallocIData(!0);
},
_reallocVData: function(t) {
var e;
this._vData && (e = new Uint8Array(this._vData.buffer));
this._vData = new Float32Array(this._initVDataCount);
this._uintVData = new Uint32Array(this._vData.buffer);
var i = new Uint8Array(this._uintVData.buffer);
if (e && t) for (var n = 0, r = e.length; n < r; n++) i[n] = e[n];
},
_reallocIData: function(t) {
var e = this._iData;
this._iData = new Uint16Array(this._initIDataCount);
if (e && t) for (var i = this._iData, n = 0, r = e.length; n < r; n++) i[n] = e[n];
},
reset: function() {
this._arrOffset = 0;
this._vb = this._vbArr[0];
this._ib = this._ibArr[0];
this.byteOffset = 0;
this.indiceOffset = 0;
this.vertexOffset = 0;
this.indiceStart = 0;
this._dirty = !1;
},
destroy: function() {
this.reset();
for (var t = 0; t < this._vbArr.length; t++) this._vbArr[t].destroy();
this._vbArr = null;
for (var e = 0; e < this._ibArr.length; e++) this._ibArr[e].destroy();
this._ibArr = null;
this._ib = null;
this._vb = null;
},
forwardIndiceStartToOffset: function() {
this.indiceStart = this.indiceOffset;
}
});
if (r) {
s.prototype.checkAndSwitchBuffer = function(t) {
if (this.vertexOffset + t > 65535) {
this.uploadData();
this._batcher._flush();
}
};
s.prototype.forwardIndiceStartToOffset = function() {
this.uploadData();
this.switchBuffer();
};
}
cc.MeshBuffer = e.exports = s;
}), {
"../../../renderer/gfx": 231
} ],
185: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = a;
var n, r = (n = t("./flex-buffer")) && n.__esModule ? n : {
default: n
}, s = t("./vertex-format");
function a() {
this.vDatas = [];
this.uintVDatas = [];
this.iDatas = [];
this.meshCount = 0;
this._infos = null;
this._flexBuffer = null;
}
cc.js.mixin(a.prototype, {
init: function() {},
clear: function() {
this.vDatas.length = 0;
this.iDatas.length = 0;
this.uintVDatas.length = 0;
this.meshCount = 0;
this._infos = null;
this._flexBuffer && this._flexBuffer.reset();
},
updateMesh: function(t, e, i) {
this.vDatas[t] = e;
this.uintVDatas[t] = new Uint32Array(e.buffer, 0, e.length);
this.iDatas[t] = i;
this.meshCount = this.vDatas.length;
},
updateMeshRange: function() {},
createData: function(t, e, i) {
var n = new Float32Array(e), r = new Uint16Array(i);
this.updateMesh(t, n, r);
},
createQuadData: function(t, e, i) {
this.createData(t, e, i);
this.initQuadIndices(this.iDatas[t]);
},
createFlexData: function(t, e, i, n) {
n = n || s.vfmtPosUvColor;
this._flexBuffer = new r.default(this, t, e, i, n);
},
initQuadIndices: function(t) {
for (var e = t.length / 6, i = 0, n = 0; i < e; i++) {
var r = 4 * i;
t[n++] = r;
t[n++] = r + 1;
t[n++] = r + 2;
t[n++] = r + 1;
t[n++] = r + 3;
t[n++] = r + 2;
}
}
});
cc.RenderData = a;
e.exports = i.default;
}), {
"./flex-buffer": 183,
"./vertex-format": 186
} ],
186: [ (function(t, e) {
"use strict";
var i, n = (i = t("../../../renderer/gfx")) && i.__esModule ? i : {
default: i
}, r = new n.default.VertexFormat([ {
name: n.default.ATTR_POSITION,
type: n.default.ATTR_TYPE_FLOAT32,
num: 3
}, {
name: n.default.ATTR_UV0,
type: n.default.ATTR_TYPE_FLOAT32,
num: 2
}, {
name: n.default.ATTR_COLOR,
type: n.default.ATTR_TYPE_UINT8,
num: 4,
normalize: !0
} ]);
r.name = "vfmt3D";
n.default.VertexFormat.XYZ_UV_Color = r;
var s = new n.default.VertexFormat([ {
name: n.default.ATTR_POSITION,
type: n.default.ATTR_TYPE_FLOAT32,
num: 2
}, {
name: n.default.ATTR_UV0,
type: n.default.ATTR_TYPE_FLOAT32,
num: 2
}, {
name: n.default.ATTR_COLOR,
type: n.default.ATTR_TYPE_UINT8,
num: 4,
normalize: !0
} ]);
s.name = "vfmtPosUvColor";
n.default.VertexFormat.XY_UV_Color = s;
var a = new n.default.VertexFormat([ {
name: n.default.ATTR_POSITION,
type: n.default.ATTR_TYPE_FLOAT32,
num: 2
}, {
name: n.default.ATTR_UV0,
type: n.default.ATTR_TYPE_FLOAT32,
num: 2
}, {
name: n.default.ATTR_COLOR,
type: n.default.ATTR_TYPE_UINT8,
num: 4,
normalize: !0
}, {
name: n.default.ATTR_COLOR0,
type: n.default.ATTR_TYPE_UINT8,
num: 4,
normalize: !0
} ]);
a.name = "vfmtPosUvTwoColor";
n.default.VertexFormat.XY_UV_Two_Color = a;
var o = new n.default.VertexFormat([ {
name: n.default.ATTR_POSITION,
type: n.default.ATTR_TYPE_FLOAT32,
num: 2
}, {
name: n.default.ATTR_UV0,
type: n.default.ATTR_TYPE_FLOAT32,
num: 2
} ]);
o.name = "vfmtPosUv";
n.default.VertexFormat.XY_UV = o;
var c = new n.default.VertexFormat([ {
name: n.default.ATTR_POSITION,
type: n.default.ATTR_TYPE_FLOAT32,
num: 2
}, {
name: n.default.ATTR_COLOR,
type: n.default.ATTR_TYPE_UINT8,
num: 4,
normalize: !0
} ]);
c.name = "vfmtPosColor";
n.default.VertexFormat.XY_Color = c;
var u = new n.default.VertexFormat([ {
name: n.default.ATTR_POSITION,
type: n.default.ATTR_TYPE_FLOAT32,
num: 2
} ]);
u.name = "vfmtPos";
n.default.VertexFormat.XY = u;
e.exports = {
vfmt3D: r,
vfmtPosUvColor: s,
vfmtPosUvTwoColor: a,
vfmtPosUv: o,
vfmtPosColor: c,
vfmtPos: u
};
}), {
"../../../renderer/gfx": 231
} ],
187: [ (function(t, e) {
"use strict";
t("../platform/CCSys");
var i = /(\.[^\.\/\?\\]*)(\?.*)?$/, n = /((.*)(\/|\\|\\\\))?(.*?\..*$)?/, r = /[^\.\/]+\/\.\.\//;
cc.path = {
join: function() {
for (var t = arguments.length, e = "", i = 0; i < t; i++) e = (e + ("" === e ? "" : "/") + arguments[i]).replace(/(\/|\\\\)$/, "");
return e;
},
extname: function(t) {
var e = i.exec(t);
return e ? e[1] : "";
},
mainFileName: function(t) {
if (t) {
var e = t.lastIndexOf(".");
if (-1 !== e) return t.substring(0, e);
}
return t;
},
basename: function(t, e) {
var i = t.indexOf("?");
i > 0 && (t = t.substring(0, i));
var n = /(\/|\\)([^\/\\]+)$/g.exec(t.replace(/(\/|\\)$/, ""));
if (!n) return t;
var r = n[2];
return e && t.substring(t.length - e.length).toLowerCase() === e.toLowerCase() ? r.substring(0, r.length - e.length) : r;
},
dirname: function(t) {
var e = n.exec(t);
return e ? e[2] : "";
},
changeExtname: function(t, e) {
e = e || "";
var i = t.indexOf("?"), n = "";
if (i > 0) {
n = t.substring(i);
t = t.substring(0, i);
}
return (i = t.lastIndexOf(".")) < 0 ? t + e + n : t.substring(0, i) + e + n;
},
changeBasename: function(t, e, i) {
if (0 === e.indexOf(".")) return this.changeExtname(t, e);
var n = t.indexOf("?"), r = "", s = i ? this.extname(t) : "";
if (n > 0) {
r = t.substring(n);
t = t.substring(0, n);
}
n = (n = t.lastIndexOf("/")) <= 0 ? 0 : n + 1;
return t.substring(0, n) + e + s + r;
},
_normalize: function(t) {
var e = t = String(t);
do {
e = t;
t = t.replace(r, "");
} while (e.length !== t.length);
return t;
},
sep: cc.sys.os === cc.sys.OS_WINDOWS ? "\\" : "/",
stripSep: function(t) {
return t.replace(/[\/\\]$/, "");
}
};
e.exports = cc.path;
}), {
"../platform/CCSys": 137
} ],
188: [ (function(t, e) {
"use strict";
var i = function(t, e, i, n, r, s) {
this.a = t;
this.b = e;
this.c = i;
this.d = n;
this.tx = r;
this.ty = s;
};
i.create = function(t, e, i, n, r, s) {
return {
a: t,
b: e,
c: i,
d: n,
tx: r,
ty: s
};
};
i.identity = function() {
return {
a: 1,
b: 0,
c: 0,
d: 1,
tx: 0,
ty: 0
};
};
i.clone = function(t) {
return {
a: t.a,
b: t.b,
c: t.c,
d: t.d,
tx: t.tx,
ty: t.ty
};
};
i.concat = function(t, e, i) {
var n = e.a, r = e.b, s = e.c, a = e.d, o = e.tx, c = e.ty;
t.a = n * i.a + r * i.c;
t.b = n * i.b + r * i.d;
t.c = s * i.a + a * i.c;
t.d = s * i.b + a * i.d;
t.tx = o * i.a + c * i.c + i.tx;
t.ty = o * i.b + c * i.d + i.ty;
return t;
};
i.invert = function(t, e) {
var i = e.a, n = e.b, r = e.c, s = e.d, a = 1 / (i * s - n * r), o = e.tx, c = e.ty;
t.a = a * s;
t.b = -a * n;
t.c = -a * r;
t.d = a * i;
t.tx = a * (r * c - s * o);
t.ty = a * (n * o - i * c);
return t;
};
i.fromMat4 = function(t, e) {
var i = e.m;
t.a = i[0];
t.b = i[1];
t.c = i[4];
t.d = i[5];
t.tx = i[12];
t.ty = i[13];
return t;
};
i.transformVec2 = function(t, e, i, n) {
var r, s;
if (void 0 === n) {
n = i;
r = e.x;
s = e.y;
} else {
r = e;
s = i;
}
t.x = n.a * r + n.c * s + n.tx;
t.y = n.b * r + n.d * s + n.ty;
return t;
};
i.transformSize = function(t, e, i) {
t.width = i.a * e.width + i.c * e.height;
t.height = i.b * e.width + i.d * e.height;
return t;
};
i.transformRect = function(t, e, i) {
var n = e.x, r = e.y, s = n + e.width, a = r + e.height, o = i.a * n + i.c * r + i.tx, c = i.b * n + i.d * r + i.ty, u = i.a * s + i.c * r + i.tx, l = i.b * s + i.d * r + i.ty, h = i.a * n + i.c * a + i.tx, f = i.b * n + i.d * a + i.ty, _ = i.a * s + i.c * a + i.tx, d = i.b * s + i.d * a + i.ty, p = Math.min(o, u, h, _), v = Math.max(o, u, h, _), g = Math.min(c, l, f, d), m = Math.max(c, l, f, d);
t.x = p;
t.y = g;
t.width = v - p;
t.height = m - g;
return t;
};
i.transformObb = function(t, e, i, n, r, s) {
var a = r.x, o = r.y, c = r.width, u = r.height, l = s.a * a + s.c * o + s.tx, h = s.b * a + s.d * o + s.ty, f = s.a * c, _ = s.b * c, d = s.c * u, p = s.d * u;
e.x = l;
e.y = h;
i.x = f + l;
i.y = _ + h;
t.x = d + l;
t.y = p + h;
n.x = f + d + l;
n.y = _ + p + h;
};
cc.AffineTransform = e.exports = i;
}), {} ],
189: [ (function(t, e) {
"use strict";
var i = t("../platform/CCObject").Flags, n = t("./misc"), r = t("../platform/js"), s = t("../platform/id-generater"), a = t("../event-manager"), o = t("../renderer/render-flow"), c = i.Destroying, u = i.DontDestroy, l = i.Deactivating, h = new s("Node");
function f(t) {
if (!t) {
cc.errorID(3804);
return null;
}
return "string" == typeof t ? r.getClassByName(t) : t;
}
function _(t, e) {
if (e._sealed) for (var i = 0; i < t._components.length; ++i) {
var n = t._components[i];
if (n.constructor === e) return n;
} else for (var r = 0; r < t._components.length; ++r) {
var s = t._components[r];
if (s instanceof e) return s;
}
return null;
}
function d(t, e, i) {
if (e._sealed) for (var n = 0; n < t._components.length; ++n) {
var r = t._components[n];
r.constructor === e && i.push(r);
} else for (var s = 0; s < t._components.length; ++s) {
var a = t._components[s];
a instanceof e && i.push(a);
}
}
function p(t, e) {
for (var i = 0; i < t.length; ++i) {
var n = t[i], r = _(n, e);
if (r) return r;
if (n._children.length > 0 && (r = p(n._children, e))) return r;
}
return null;
}
function v(t, e, i) {
for (var n = 0; n < t.length; ++n) {
var r = t[n];
d(r, e, i);
r._children.length > 0 && v(r._children, e, i);
}
}
var g = cc.Class({
name: "cc._BaseNode",
extends: cc.Object,
properties: {
_parent: null,
_children: [],
_active: !0,
_components: [],
_prefab: null,
_persistNode: {
get: function() {
return (this._objFlags & u) > 0;
},
set: function(t) {
t ? this._objFlags |= u : this._objFlags &= ~u;
}
},
name: {
get: function() {
return this._name;
},
set: function(t) {
this._name = t;
this._proxy.setName(this._name);
}
},
uuid: {
get: function() {
return this._id;
}
},
children: {
get: function() {
return this._children;
}
},
childrenCount: {
get: function() {
return this._children.length;
}
},
active: {
get: function() {
return this._active;
},
set: function(t) {
t = !!t;
if (this._active !== t) {
this._active = t;
var e = this._parent;
e && e._activeInHierarchy && cc.director._nodeActivator.activateNode(this, t);
}
}
},
activeInHierarchy: {
get: function() {
return this._activeInHierarchy;
}
}
},
ctor: function(t) {
this._name = void 0 !== t ? t : "New Node";
this._activeInHierarchy = !1;
this._id = h.getNewId();
cc.director._scheduler && cc.director._scheduler.enableForTarget(this);
this.__eventTargets = [];
},
getParent: function() {
return this._parent;
},
setParent: function(t) {
if (this._parent !== t) {
var e = this._parent;
this._parent = t || null;
this._onSetParent(t);
if (t) {
a._setDirtyForNode(this);
t._children.push(this);
t.emit && t.emit("child-added", this);
t._renderFlag |= o.FLAG_CHILDREN;
}
if (e) {
if (!(e._objFlags & c)) {
var i = e._children.indexOf(this);
e._children.splice(i, 1);
e.emit && e.emit("child-removed", this);
this._onHierarchyChanged(e);
0 === e._children.length && (e._renderFlag &= ~o.FLAG_CHILDREN);
}
} else t && this._onHierarchyChanged(null);
}
},
attr: function(t) {
r.mixin(this, t);
},
getChildByUuid: function(t) {
if (!t) {
cc.log("Invalid uuid");
return null;
}
for (var e = this._children, i = 0, n = e.length; i < n; i++) if (e[i]._id === t) return e[i];
return null;
},
getChildByName: function(t) {
if (!t) {
cc.log("Invalid name");
return null;
}
for (var e = this._children, i = 0, n = e.length; i < n; i++) if (e[i]._name === t) return e[i];
return null;
},
addChild: function(t) {
cc.assertID(t, 1606);
cc.assertID(null === t._parent, 1605);
t.setParent(this);
},
insertChild: function(t, e) {
t.parent = this;
t.setSiblingIndex(e);
},
getSiblingIndex: function() {
return this._parent ? this._parent._children.indexOf(this) : 0;
},
setSiblingIndex: function(t) {
if (this._parent) if (this._parent._objFlags & l) cc.errorID(3821); else {
var e = this._parent._children;
t = -1 !== t ? t : e.length - 1;
var i = e.indexOf(this);
if (t !== i) {
e.splice(i, 1);
t < e.length ? e.splice(t, 0, this) : e.push(this);
this._onSiblingIndexChanged && this._onSiblingIndexChanged(t);
}
}
},
walk: function(t, e) {
var i, n, r, s, a = cc._BaseNode, o = 1, c = a._stacks[a._stackId];
if (!c) {
c = [];
a._stacks.push(c);
}
a._stackId++;
c.length = 0;
c[0] = this;
var u = null;
s = !1;
for (;o; ) if (n = c[--o]) {
!s && t ? t(n) : s && e && e(n);
c[o] = null;
if (s) {
if (u === this._parent) break;
s = !1;
if (i) if (i[++r]) {
c[o] = i[r];
o++;
} else if (u) {
c[o] = u;
o++;
s = !0;
if (u._parent) {
r = (i = u._parent._children).indexOf(u);
u = u._parent;
} else {
u = null;
i = null;
}
if (r < 0) break;
}
} else if (n._children.length > 0) {
u = n;
i = n._children;
r = 0;
c[o] = i[r];
o++;
} else {
c[o] = n;
o++;
s = !0;
}
}
c.length = 0;
a._stackId--;
},
cleanup: function() {},
removeFromParent: function(t) {
if (this._parent) {
void 0 === t && (t = !0);
this._parent.removeChild(this, t);
}
},
removeChild: function(t, e) {
if (this._children.indexOf(t) > -1) {
(e || void 0 === e) && t.cleanup();
t.parent = null;
}
},
removeAllChildren: function(t) {
var e = this._children;
void 0 === t && (t = !0);
for (var i = e.length - 1; i >= 0; i--) {
var n = e[i];
if (n) {
t && n.cleanup();
n.parent = null;
}
}
this._children.length = 0;
},
isChildOf: function(t) {
var e = this;
do {
if (e === t) return !0;
e = e._parent;
} while (e);
return !1;
},
getComponent: function(t) {
var e = f(t);
return e ? _(this, e) : null;
},
getComponents: function(t) {
var e = f(t), i = [];
e && d(this, e, i);
return i;
},
getComponentInChildren: function(t) {
var e = f(t);
return e ? p(this._children, e) : null;
},
getComponentsInChildren: function(t) {
var e = f(t), i = [];
if (e) {
d(this, e, i);
v(this._children, e, i);
}
return i;
},
_checkMultipleComp: !1,
addComponent: function(t) {
var e;
if ("string" == typeof t) {
if (!(e = r.getClassByName(t))) {
cc.errorID(3807, t);
cc._RFpeek() && cc.errorID(3808, t);
return null;
}
} else {
if (!t) {
cc.errorID(3804);
return null;
}
e = t;
}
if ("function" != typeof e) {
cc.errorID(3809);
return null;
}
if (!r.isChildClassOf(e, cc.Component)) {
cc.errorID(3810);
return null;
}
var i = e._requireComponent;
if (i && !this.getComponent(i) && !this.addComponent(i)) return null;
var n = new e();
n.node = this;
this._components.push(n);
this._activeInHierarchy && cc.director._nodeActivator.activateComp(n);
return n;
},
_addComponentAt: !1,
removeComponent: function(t) {
if (t) {
t instanceof cc.Component || (t = this.getComponent(t));
t && t.destroy();
} else cc.errorID(3813);
},
_getDependComponent: !1,
_removeComponent: function(t) {
if (t) {
if (!(this._objFlags & c)) {
var e = this._components.indexOf(t);
-1 !== e ? this._components.splice(e, 1) : t.node !== this && cc.errorID(3815);
}
} else cc.errorID(3814);
},
destroy: function() {
cc.Object.prototype.destroy.call(this) && (this.active = !1);
},
destroyAllChildren: function() {
for (var t = this._children, e = 0; e < t.length; ++e) t[e].destroy();
},
_onSetParent: function() {},
_onPostActivated: function() {},
_onBatchCreated: function() {},
_onHierarchyChanged: function() {
var t = this._parent;
!this._persistNode || t instanceof cc.Scene || cc.game.removePersistRootNode(this);
var e = this._active && !(!t || !t._activeInHierarchy);
this._activeInHierarchy !== e && cc.director._nodeActivator.activateNode(this, e);
},
_instantiate: function(t, e) {
t || (t = cc.instantiate._clone(this, this));
t._prefab;
t._parent = null;
t._onBatchCreated(e);
return t;
},
_registerIfAttached: !1,
_onPreDestroy: function() {
var t, e;
this._objFlags |= c;
var i = this._parent, n = i && i._objFlags & c, r = this._children;
for (t = 0, e = r.length; t < e; ++t) r[t]._destroyImmediate();
for (t = 0, e = this._components.length; t < e; ++t) this._components[t]._destroyImmediate();
var s = this.__eventTargets;
for (t = 0, e = s.length; t < e; ++t) {
var a = s[t];
a && a.targetOff(this);
}
s.length = 0;
this._persistNode && cc.game.removePersistRootNode(this);
if (!n && i) {
var o = i._children.indexOf(this);
i._children.splice(o, 1);
i.emit && i.emit("child-removed", this);
}
return n;
},
onRestore: !1
});
g.idGenerater = h;
g._stacks = [ [] ];
g._stackId = 0;
g.prototype._onPreDestroyBase = g.prototype._onPreDestroy;
g.prototype._onHierarchyChangedBase = g.prototype._onHierarchyChanged;
n.propertyDefine(g, [ "parent", "name", "children", "childrenCount" ], {});
cc._BaseNode = e.exports = g;
}), {
"../event-manager": 116,
"../platform/CCObject": 134,
"../platform/id-generater": 145,
"../platform/js": 149,
"../renderer/render-flow": 160,
"./misc": 196
} ],
190: [ (function(t, e) {
"use strict";
e.exports = {
binarySearchEpsilon: function(t, e) {
for (var i = 0, n = t.length - 1, r = n >>> 1; i <= n; r = i + n >>> 1) {
var s = t[r];
if (s > e + 1e-6) n = r - 1; else {
if (!(s < e - 1e-6)) return r;
i = r + 1;
}
}
return ~i;
}
};
}), {} ],
191: [ (function(t, e) {
"use strict";
var i = t("../components/CCRenderComponent"), n = t("../platform/CCMacro").BlendFactor, r = t("../../renderer/gfx"), s = cc.Class({
properties: {
_srcBlendFactor: n.SRC_ALPHA,
_dstBlendFactor: n.ONE_MINUS_SRC_ALPHA,
srcBlendFactor: {
get: function() {
return this._srcBlendFactor;
},
set: function(t) {
if (this._srcBlendFactor !== t) {
this._srcBlendFactor = t;
this._updateBlendFunc(!0);
this._onBlendChanged && this._onBlendChanged();
}
},
animatable: !1,
type: n,
tooltip: !1,
visible: !0
},
dstBlendFactor: {
get: function() {
return this._dstBlendFactor;
},
set: function(t) {
if (this._dstBlendFactor !== t) {
this._dstBlendFactor = t;
this._updateBlendFunc(!0);
}
},
animatable: !1,
type: n,
tooltip: !1,
visible: !0
}
},
setMaterial: function(t, e) {
var r = i.prototype.setMaterial.call(this, t, e);
this._srcBlendFactor === n.SRC_ALPHA && this._dstBlendFactor === n.ONE_MINUS_SRC_ALPHA || this._updateMaterialBlendFunc(r);
return r;
},
_updateMaterial: function() {
this._updateBlendFunc();
},
_updateBlendFunc: function(t) {
if (t || this._srcBlendFactor !== n.SRC_ALPHA || this._dstBlendFactor !== n.ONE_MINUS_SRC_ALPHA) for (var e = this.getMaterials(), i = 0; i < e.length; i++) {
var r = e[i];
this._updateMaterialBlendFunc(r);
}
},
_updateMaterialBlendFunc: function(t) {
t.setBlend(!0, r.BLEND_FUNC_ADD, this._srcBlendFactor, this._dstBlendFactor, r.BLEND_FUNC_ADD, this._srcBlendFactor, this._dstBlendFactor);
}
});
e.exports = cc.BlendFunc = s;
}), {
"../../renderer/gfx": 231,
"../components/CCRenderComponent": 102,
"../platform/CCMacro": 133
} ],
192: [ (function(t, e) {
"use strict";
var i = t("./misc").BASE64_VALUES, n = "0123456789abcdef".split(""), r = [ "", "", "", "" ], s = r.concat(r, "-", r, "-", r, "-", r, "-", r, r, r), a = s.map((function(t, e) {
return "-" === t ? NaN : e;
})).filter(isFinite);
e.exports = function(t) {
if (22 !== t.length) return t;
s[0] = t[0];
s[1] = t[1];
for (var e = 2, r = 2; e < 22; e += 2) {
var o = i[t.charCodeAt(e)], c = i[t.charCodeAt(e + 1)];
s[a[r++]] = n[o >> 2];
s[a[r++]] = n[(3 & o) << 2 | c >> 4];
s[a[r++]] = n[15 & c];
}
return s.join("");
};
}), {
"./misc": 196
} ],
193: [ (function(t, e) {
"use strict";
cc.find = e.exports = function(t, e) {
if (null == t) {
cc.errorID(3814);
return null;
}
if (e) ; else {
var i = cc.director.getScene();
if (!i) return null;
e = i;
}
for (var n = e, r = "/" !== t[0] ? 0 : 1, s = t.split("/"), a = r; a < s.length; a++) {
var o = s[a], c = n._children;
n = null;
for (var u = 0, l = c.length; u < l; ++u) {
var h = c[u];
if (h.name === o) {
n = h;
break;
}
}
if (!n) return null;
}
return n;
};
}), {} ],
194: [ (function(t, e) {
"use strict";
var i, n = (i = t("../assets/material/material-variant")) && i.__esModule ? i : {
default: i
}, r = t("../assets/material/CCMaterial"), s = cc.Class({
properties: {
_normalMaterial: null,
normalMaterial: {
get: function() {
return this._normalMaterial;
},
set: function(t) {
this._normalMaterial = t;
this._updateDisabledState && this._updateDisabledState();
},
type: r,
tooltip: !1,
animatable: !1
},
_grayMaterial: null,
grayMaterial: {
get: function() {
return this._grayMaterial;
},
set: function(t) {
this._grayMaterial = t;
this._updateDisabledState && this._updateDisabledState();
},
type: r,
tooltip: !1,
animatable: !1
}
},
_switchGrayMaterial: function(t, e) {
var i;
if (t) {
(i = this._grayMaterial) || (i = r.getBuiltinMaterial("2d-gray-sprite"));
i = this._grayMaterial = n.default.create(i, e);
} else {
(i = this._normalMaterial) || (i = r.getBuiltinMaterial("2d-sprite", e));
i = this._normalMaterial = n.default.create(i, e);
}
e.setMaterial(0, i);
}
});
e.exports = s;
}), {
"../assets/material/CCMaterial": 76,
"../assets/material/material-variant": 83
} ],
195: [ (function(t) {
"use strict";
t("./CCPath");
t("./profiler/CCProfiler");
t("./find");
t("./mutable-forward-iterator");
}), {
"./CCPath": 187,
"./find": 193,
"./mutable-forward-iterator": 197,
"./profiler/CCProfiler": 200
} ],
196: [ (function(t, e) {
"use strict";
for (var i = t("../platform/js"), n = {
propertyDefine: function(t, e, n) {
function r(t, e, n, r) {
var s = Object.getOwnPropertyDescriptor(t, e);
if (s) {
s.get && (t[n] = s.get);
s.set && r && (t[r] = s.set);
} else {
var a = t[n];
i.getset(t, e, a, t[r]);
}
}
for (var s, a = t.prototype, o = 0; o < e.length; o++) {
var c = (s = e[o])[0].toUpperCase() + s.slice(1);
r(a, s, "get" + c, "set" + c);
}
for (s in n) {
var u = n[s];
r(a, s, u[0], u[1]);
}
},
NextPOT: function(t) {
t -= 1;
t |= t >> 1;
t |= t >> 2;
t |= t >> 4;
t |= t >> 8;
return 1 + (t |= t >> 16);
},
BUILTIN_CLASSID_RE: /^(?:cc|dragonBones|sp|ccsg)\..+/
}, r = new Array(123), s = 0; s < 123; ++s) r[s] = 64;
for (var a = 0; a < 64; ++a) r["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charCodeAt(a)] = a;
n.BASE64_VALUES = r;
n.pushToMap = function(t, e, i, n) {
var r = t[e];
if (r) if (Array.isArray(r)) if (n) {
r.push(r[0]);
r[0] = i;
} else r.push(i); else t[e] = n ? [ i, r ] : [ r, i ]; else t[e] = i;
};
n.clampf = function(t, e, i) {
if (e > i) {
var n = e;
e = i;
i = n;
}
return t < e ? e : t < i ? t : i;
};
n.clamp01 = function(t) {
return t < 0 ? 0 : t < 1 ? t : 1;
};
n.lerp = function(t, e, i) {
return t + (e - t) * i;
};
n.degreesToRadians = function(t) {
return t * cc.macro.RAD;
};
n.radiansToDegrees = function(t) {
return t * cc.macro.DEG;
};
cc.misc = e.exports = n;
}), {
"../platform/js": 149
} ],
197: [ (function(t, e) {
"use strict";
function i(t) {
this.i = 0;
this.array = t;
}
var n = i.prototype;
n.remove = function(t) {
var e = this.array.indexOf(t);
e >= 0 && this.removeAt(e);
};
n.removeAt = function(t) {
this.array.splice(t, 1);
t <= this.i && --this.i;
};
n.fastRemove = function(t) {
var e = this.array.indexOf(t);
e >= 0 && this.fastRemoveAt(e);
};
n.fastRemoveAt = function(t) {
var e = this.array;
e[t] = e[e.length - 1];
--e.length;
t <= this.i && --this.i;
};
n.push = function(t) {
this.array.push(t);
};
e.exports = i;
}), {} ],
198: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = (function() {
function t() {
this.enabled = !1;
this.count = 0;
this.maxSize = 1024;
}
var e = t.prototype;
e.get = function() {};
e.put = function() {};
e.clear = function() {};
return t;
})();
i.default = n;
cc.pool = {};
n.register = function(t, e) {
cc.pool[t] = e;
};
e.exports = i.default;
}), {} ],
199: [ (function(t, e) {
"use strict";
cc._PrefabInfo = cc.Class({
name: "cc.PrefabInfo",
properties: {
root: null,
asset: null,
fileId: "",
sync: !1
}
});
e.exports = {
syncWithPrefab: function(t) {
var e = t._prefab;
if (e.asset) {
var i = t._objFlags, n = t._parent, r = t._id, s = t._name, a = t._active, o = t._eulerAngles.x, c = t._eulerAngles.y, u = t._eulerAngles.z, l = t._localZOrder, h = t._trs, f = h[0], _ = h[1], d = h[2];
cc.game._isCloning = !0;
e.asset._doInstantiate(t);
cc.game._isCloning = !1;
t._objFlags = i;
t._parent = n;
t._id = r;
t._prefab = e;
t._name = s;
t._active = a;
t._localZOrder = l;
(h = t._trs)[0] = f;
h[1] = _;
h[2] = d;
t._eulerAngles.x = o;
t._eulerAngles.y = c;
t._eulerAngles.z = u;
} else {
cc.errorID(3701, t.name);
t._prefab = null;
}
}
};
}), {} ],
200: [ (function(t, e) {
"use strict";
var i = t("../../platform/CCMacro"), n = t("./perf-counter"), r = !1, s = 15, a = null, o = null, c = null;
function u() {
if (!a) {
a = {
frame: {
desc: "Frame time (ms)",
min: 0,
max: 50,
average: 500
},
fps: {
desc: "Framerate (FPS)",
below: 30,
average: 500
},
draws: {
desc: "Draw call"
},
logic: {
desc: "Game Logic (ms)",
min: 0,
max: 50,
average: 500,
color: "#080"
},
render: {
desc: "Renderer (ms)",
min: 0,
max: 50,
average: 500,
color: "#f90"
},
mode: {
desc: cc.game.renderType === cc.game.RENDER_TYPE_WEBGL ? "WebGL" : "Canvas",
min: 1
}
};
var t = performance.now();
for (var e in a) a[e]._counter = new n(e, a[e], t);
}
}
function l() {
if (!o || !o.isValid) {
(o = new cc.Node("PROFILER-NODE")).x = o.y = 10;
o.groupIndex = cc.Node.BuiltinGroupIndex.DEBUG;
cc.Camera._setupDebugCamera();
o.zIndex = i.MAX_ZINDEX;
cc.game.addPersistRootNode(o);
var t = new cc.Node("LEFT-PANEL");
t.anchorX = t.anchorY = 0;
var e = t.addComponent(cc.Label);
e.fontSize = s;
e.lineHeight = s;
t.parent = o;
var n = new cc.Node("RIGHT-PANEL");
n.anchorX = 1;
n.anchorY = 0;
n.x = 200;
var r = n.addComponent(cc.Label);
r.horizontalAlign = cc.Label.HorizontalAlign.RIGHT;
r.fontSize = s;
r.lineHeight = s;
n.parent = o;
if (cc.sys.platform !== cc.sys.BAIDU_GAME_SUB && cc.sys.platform !== cc.sys.WECHAT_GAME_SUB) {
e.cacheMode = cc.Label.CacheMode.CHAR;
r.cacheMode = cc.Label.CacheMode.CHAR;
}
c = {
left: e,
right: r
};
}
}
function h() {
l();
var t = cc.director._lastUpdate;
a.frame._counter.start(t);
a.logic._counter.start(t);
}
function f() {
var t = performance.now();
cc.director.isPaused() ? a.frame._counter.start(t) : a.logic._counter.end(t);
a.render._counter.start(t);
}
function _() {
var t = performance.now();
a.render._counter.end(t);
a.draws._counter.value = cc.renderer.drawCalls;
a.frame._counter.end(t);
a.fps._counter.frame(t);
var e = "", i = "";
for (var n in a) {
var r = a[n];
r._counter.sample(t);
e += r.desc + "\n";
i += r._counter.human() + "\n";
}
if (c) {
c.left.string = e;
c.right.string = i;
}
}
cc.profiler = e.exports = {
isShowingStats: function() {
return r;
},
hideStats: function() {
if (r) {
o && (o.active = !1);
cc.director.off(cc.Director.EVENT_BEFORE_UPDATE, h);
cc.director.off(cc.Director.EVENT_AFTER_UPDATE, f);
cc.director.off(cc.Director.EVENT_AFTER_DRAW, _);
r = !1;
}
},
showStats: function() {
if (!r) {
u();
o && (o.active = !0);
cc.director.on(cc.Director.EVENT_BEFORE_UPDATE, h);
cc.director.on(cc.Director.EVENT_AFTER_UPDATE, f);
cc.director.on(cc.Director.EVENT_AFTER_DRAW, _);
r = !0;
}
}
};
}), {
"../../platform/CCMacro": 133,
"./perf-counter": 202
} ],
201: [ (function(t, e) {
"use strict";
var i = cc.Class({
name: "cc.Counter",
ctor: function(t, e, i) {
this._id = t;
this._opts = e || {};
this._value = 0;
this._total = 0;
this._averageValue = 0;
this._accumValue = 0;
this._accumSamples = 0;
this._accumStart = i;
},
properties: {
value: {
get: function() {
return this._value;
},
set: function(t) {
this._value = t;
}
}
},
_average: function(t, e) {
if (this._opts.average) {
this._accumValue += t;
++this._accumSamples;
var i = e;
if (i - this._accumStart >= this._opts.average) {
this._averageValue = this._accumValue / this._accumSamples;
this._accumValue = 0;
this._accumStart = i;
this._accumSamples = 0;
}
}
},
sample: function(t) {
this._average(this._value, t);
},
human: function() {
var t = this._opts.average ? this._averageValue : this._value;
return Math.round(100 * t) / 100;
},
alarm: function() {
return this._opts.below && this._value < this._opts.below || this._opts.over && this._value > this._opts.over;
}
});
e.exports = i;
}), {} ],
202: [ (function(t, e) {
"use strict";
var i = t("./counter"), n = cc.Class({
name: "cc.PerfCounter",
extends: i,
ctor: function(t, e, i) {
this._time = i;
},
start: function(t) {
this._time = t;
},
end: function(t) {
this._value = t - this._time;
this._average(this._value);
},
tick: function() {
this.end();
this.start();
},
frame: function(t) {
var e = t, i = e - this._time;
this._total++;
if (i > (this._opts.average || 1e3)) {
this._value = 1e3 * this._total / i;
this._total = 0;
this._time = e;
this._average(this._value);
}
}
});
e.exports = n;
}), {
"./counter": 201
} ],
203: [ (function(t, e) {
"use strict";
var i, n = new (((i = t("../platform/js")) && i.__esModule ? i : {
default: i
}).default.Pool)(2);
n.get = function() {
return this._get() || {
key: null,
value: null,
prev: null,
next: null
};
};
function r(t) {
this.count = 0;
this.limit = t;
this.datas = {};
this.head = null;
this.tail = null;
}
r.prototype.moveToHead = function(t) {
t.next = this.head;
t.prev = null;
null !== this.head && (this.head.prev = t);
this.head = t;
null === this.tail && (this.tail = t);
this.count++;
this.datas[t.key] = t;
};
r.prototype.put = function(t, e) {
var i = n.get();
i.key = t;
i.value = e;
if (this.count >= this.limit) {
var r = this.tail;
delete this.datas[r.key];
this.count--;
this.tail = r.prev;
this.tail.next = null;
r.prev = null;
r.next = null;
n.put(r);
}
this.moveToHead(i);
};
r.prototype.remove = function(t) {
null !== t.prev ? t.prev.next = t.next : this.head = t.next;
null !== t.next ? t.next.prev = t.prev : this.tail = t.prev;
delete this.datas[t.key];
this.count--;
};
r.prototype.get = function(t) {
var e = this.datas[t];
if (e) {
this.remove(e);
this.moveToHead(e);
return e.value;
}
return null;
};
r.prototype.clear = function() {
this.count = 0;
this.datas = {};
this.head = null;
this.tail = null;
};
r.prototype.has = function(t) {
return !!this.datas[t];
};
r.prototype.delete = function(t) {
var e = this.datas[t];
this.remove(e);
};
var s = new r(100), a = {
BASELINE_RATIO: .26,
MIDDLE_RATIO: .37,
BASELINE_OFFSET: 0,
label_wordRex: /([a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûа-яА-ЯЁё]+|\S)/,
label_symbolRex: /^[!,.:;'}\]%\?>、‘“》？。，！]/,
label_lastWordRex: /([a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤżźśóńłęćąŻŹŚÓŃŁĘĆĄ-яА-ЯЁё]+|\S)$/,
label_lastEnglish: /[a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤżźśóńłęćąŻŹŚÓŃŁĘĆĄ-яА-ЯЁё]+$/,
label_firstEnglish: /^[a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤżźśóńłęćąŻŹŚÓŃŁĘĆĄ-яА-ЯЁё]/,
highSurrogateRex: /[\uD800-\uDBFF]/,
lowSurrogateRex: /[\uDC00-\uDFFF]/,
label_wrapinspection: !0,
__CHINESE_REG: /^[\u4E00-\u9FFF\u3400-\u4DFF]+$/,
__JAPANESE_REG: /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g,
__KOREAN_REG: /^[\u1100-\u11FF]|[\u3130-\u318F]|[\uA960-\uA97F]|[\uAC00-\uD7AF]|[\uD7B0-\uD7FF]+$/,
isUnicodeCJK: function(t) {
return this.__CHINESE_REG.test(t) || this.__JAPANESE_REG.test(t) || this.__KOREAN_REG.test(t);
},
isUnicodeSpace: function(t) {
return (t = t.charCodeAt(0)) >= 9 && t <= 13 || 32 === t || 133 === t || 160 === t || 5760 === t || t >= 8192 && t <= 8202 || 8232 === t || 8233 === t || 8239 === t || 8287 === t || 12288 === t;
},
safeMeasureText: function(t, e, i) {
var n = (i || t.font) + "🎮" + e, r = s.get(n);
if (null !== r) return r;
var a = t.measureText(e), o = a && a.width || 0;
s.put(n, o);
return o;
},
_safeSubstring: function(t, e, i) {
var n = e, r = i, s = t[e];
this.lowSurrogateRex.test(s) && n--;
if (void 0 !== i) if (i - 1 !== e) {
var a = t[i - 1];
this.highSurrogateRex.test(a) && r--;
} else this.highSurrogateRex.test(s) && r++;
return t.substring(n, r);
},
fragmentText: function(t, e, i, n) {
var r = [];
if (0 === t.length || i < 0) {
r.push("");
return r;
}
for (var s = t; e > i && s.length > 1; ) {
for (var a = s.length * (i / e) | 0, o = this._safeSubstring(s, a), c = e - n(o), u = o, l = 0, h = 0; c > i && h++ < 10; ) {
a *= i / c;
a |= 0;
c = e - n(o = this._safeSubstring(s, a));
}
h = 0;
for (;c <= i && h++ < 10; ) {
if (o) {
var f = this.label_wordRex.exec(o);
l = f ? f[0].length : 1;
u = o;
}
a += l;
c = e - n(o = this._safeSubstring(s, a));
}
if (0 == (a -= l)) {
a = 1;
u = this._safeSubstring(s, 1);
} else if (1 === a && this.highSurrogateRex.test(s[0])) {
a = 2;
u = this._safeSubstring(s, 2);
}
var _, d = this._safeSubstring(s, 0, a);
if (this.label_wrapinspection && this.label_symbolRex.test(u || o)) {
0 == (a -= (_ = this.label_lastWordRex.exec(d)) ? _[0].length : 0) && (a = 1);
u = this._safeSubstring(s, a);
d = this._safeSubstring(s, 0, a);
}
if (this.label_firstEnglish.test(u) && (_ = this.label_lastEnglish.exec(d)) && d !== _[0]) {
a -= _[0].length;
u = this._safeSubstring(s, a);
d = this._safeSubstring(s, 0, a);
}
0 === r.length ? r.push(d) : (d = d.trimLeft()).length > 0 && r.push(d);
e = n(s = u || o);
}
0 === r.length ? r.push(s) : (s = s.trimLeft()).length > 0 && r.push(s);
return r;
}
};
cc.textUtils = e.exports = a;
}), {
"../platform/js": 149
} ],
204: [ (function(t, e) {
"use strict";
var i = t("../assets/CCTexture2D"), n = {
loadImage: function(t, e, i) {
cc.assertID(t, 3103);
var n = cc.assetManager.assets.get(t);
if (n) {
if (n.loaded) {
e && e.call(i, null, n);
return n;
}
n.once("load", (function() {
e && e.call(i, null, n);
}), i);
return n;
}
cc.assetManager.loadRemote(t, (function(t, n) {
e && e.call(i, t, n);
}));
},
cacheImage: function(t, e) {
if (t && e) {
var n = new i();
n.initWithElement(e);
cc.assetManager.assets.add(t, n);
return n;
}
},
postLoadTexture: function(t, e) {
t.loaded ? e && e() : t.nativeUrl ? cc.assetManager.loadNativeFile(t, (function(i, n) {
i || (t._nativeAsset = n);
e && e(i);
})) : e && e();
}
};
e.exports = n;
}), {
"../assets/CCTexture2D": 73
} ],
205: [ (function(t, e) {
"use strict";
var i = t("./node-unit"), n = t("./node-mem-pool");
e.exports = {
NodeMemPool: new n(i)
};
}), {
"./node-mem-pool": 207,
"./node-unit": 208
} ],
206: [ (function(t, e) {
"use strict";
var i = function(t) {
this._unitClass = t;
this._pool = [];
this._findOrder = [];
this._initNative();
}, n = i.prototype;
n._initNative = function() {
this._nativeMemPool = new renderer.MemPool();
};
n._buildUnit = function(t) {
var e = new this._unitClass(t, this);
this._nativeMemPool.updateCommonData(t, e._data, e._signData);
return e;
};
n._destroyUnit = function(t) {
this._pool[t] = null;
for (var e = 0, i = this._findOrder.length; e < i; e++) {
var n = this._findOrder[e];
if (n && n.unitID == t) {
this._findOrder.splice(e, 1);
break;
}
}
this._nativeMemPool.removeCommonData(t);
};
n._findUnitID = function() {
for (var t = 0, e = this._pool; e[t]; ) t++;
return t;
};
n.pop = function() {
for (var t = null, e = 0, i = this._findOrder, n = this._pool, r = i.length; e < r; e++) {
var s = i[e];
if (s && s.hasSpace()) {
t = s;
break;
}
}
if (!t) {
var a = this._findUnitID();
t = this._buildUnit(a);
n[a] = t;
i.push(t);
e = i.length - 1;
}
var o = i[0];
if (o !== t) {
i[0] = t;
i[e] = o;
}
return t.pop();
};
n.push = function(t) {
var e = this._pool[t.unitID];
e.push(t.index);
this._findOrder.length > 1 && e.isAllFree() && this._destroyUnit(t.unitID);
return e;
};
e.exports = i;
}), {} ],
207: [ (function(t, e) {
"use strict";
var i = t("./mem-pool"), n = function(t) {
i.call(this, t);
};
(function() {
var t = function() {};
t.prototype = i.prototype;
n.prototype = new t();
})();
var r = n.prototype;
r._initNative = function() {
this._nativeMemPool = new renderer.NodeMemPool();
};
r._destroyUnit = function(t) {
i.prototype._destroyUnit.call(this, t);
this._nativeMemPool.removeNodeData(t);
};
e.exports = n;
}), {
"./mem-pool": 206
} ],
208: [ (function(t, e) {
"use strict";
var i = t("../../value-types/utils"), n = Uint32Array, r = 10 * i.FLOAT_BYTES, s = 16 * i.FLOAT_BYTES, a = 16 * i.FLOAT_BYTES, o = Uint32Array, c = Uint32Array, u = Int32Array, l = Uint8Array, h = Uint8Array, f = Uint32Array, _ = 2 * i.FLOAT_BYTES, d = t("./unit-base"), p = function(t, e) {
d.call(this, t, e);
var p = this._contentNum;
this.trsList = new i.FLOAT_ARRAY_TYPE(10 * p);
this.localMatList = new i.FLOAT_ARRAY_TYPE(16 * p);
this.worldMatList = new i.FLOAT_ARRAY_TYPE(16 * p);
this.dirtyList = new n(1 * p);
this.parentList = new o(2 * p);
this.zOrderList = new c(1 * p);
this.cullingMaskList = new u(1 * p);
this.opacityList = new l(1 * p);
this.is3DList = new h(1 * p);
this.nodeList = new f(2 * p);
this.skewList = new i.FLOAT_ARRAY_TYPE(2 * p);
this._memPool._nativeMemPool.updateNodeData(t, this.dirtyList, this.trsList, this.localMatList, this.worldMatList, this.parentList, this.zOrderList, this.cullingMaskList, this.opacityList, this.is3DList, this.nodeList, this.skewList);
for (var v = 0; v < p; v++) {
var g = this._spacesData[v];
g.trs = new i.FLOAT_ARRAY_TYPE(this.trsList.buffer, v * r, 10);
g.localMat = new i.FLOAT_ARRAY_TYPE(this.localMatList.buffer, v * s, 16);
g.worldMat = new i.FLOAT_ARRAY_TYPE(this.worldMatList.buffer, v * a, 16);
g.dirty = new n(this.dirtyList.buffer, 4 * v, 1);
g.parent = new o(this.parentList.buffer, 8 * v, 2);
g.zOrder = new c(this.zOrderList.buffer, 4 * v, 1);
g.cullingMask = new u(this.cullingMaskList.buffer, 4 * v, 1);
g.opacity = new l(this.opacityList.buffer, 1 * v, 1);
g.is3D = new h(this.is3DList.buffer, 1 * v, 1);
g.skew = new i.FLOAT_ARRAY_TYPE(this.skewList.buffer, v * _, 2);
}
};
(function() {
var t = function() {};
t.prototype = d.prototype;
p.prototype = new t();
})();
e.exports = p;
}), {
"../../value-types/utils": 218,
"./unit-base": 209
} ],
209: [ (function(t, e) {
"use strict";
var i = function(t, e, i) {
i = i || 128;
this.unitID = t;
this._memPool = e;
this._data = new Uint16Array(2);
this._data[0] = 0;
this._data[1] = 0;
this._contentNum = i;
this._signData = new Uint16Array(2 * this._contentNum);
this._spacesData = [];
for (var n = 0; n < i; n++) {
var r = 2 * n;
this._signData[r + 0] = n + 1;
this._signData[r + 1] = 0;
this._spacesData[n] = {
index: n,
unitID: t
};
}
this._signData[2 * (i - 1)] = 65535;
}, n = i.prototype;
n.hasSpace = function() {
return 65535 !== this._data[0];
};
n.isAllFree = function() {
return 0 == this._data[1];
};
n.pop = function() {
var t = this._data[0];
if (65535 === t) return null;
var e = t, i = 2 * e, n = this._spacesData[e];
this._signData[i + 1] = 1;
this._data[0] = this._signData[i + 0];
this._data[1]++;
return n;
};
n.push = function(t) {
var e = 2 * t;
this._signData[e + 1] = 0;
this._signData[e + 0] = this._data[0];
this._data[0] = t;
this._data[1]--;
};
n.dump = function() {
for (var t = 0, e = this._data[0], i = ""; 65535 != e; ) {
t++;
i += e + "->";
e = this._signData[2 * e + 0];
}
for (var n = 0, r = "", s = this._contentNum, a = 0; a < s; a++) if (1 == this._signData[2 * a + 1]) {
n++;
r += a + "->";
}
var o = t + n;
console.log("unitID:", this.unitID, "spaceNum:", t, "calc using num:", n, "store using num:", this._data[1], "calc total num:", o, "actually total num:", this._contentNum);
console.log("free info:", i);
console.log("using info:", r);
n != this._data[1] && cc.error("using num error", "calc using num:", n, "store using num:", this._data[1]);
t + n != this._contentNum && cc.error("total num error", "calc total num:", o, "actually total num:", this._contentNum);
};
e.exports = i;
}), {} ],
210: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = a(t("./value-type")), r = a(t("../platform/CCClass")), s = a(t("../utils/misc"));
function a(t) {
return t && t.__esModule ? t : {
default: t
};
}
function o(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function c(t, e, i) {
e && o(t.prototype, e);
i && o(t, i);
return t;
}
function u(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var l = (function(t) {
u(e, t);
e.copy = function(t, e) {
t.r = e.r;
t.g = e.g;
t.b = e.b;
t.a = e.a;
return t;
};
e.clone = function(t) {
return new e(t.r, t.g, t.b, t.a);
};
e.set = function(t, e, i, n, r) {
void 0 === e && (e = 255);
void 0 === i && (i = 255);
void 0 === n && (n = 255);
void 0 === r && (r = 255);
t.r = e;
t.g = i;
t.b = n;
t.a = r;
return t;
};
e.fromHex = function(t, e) {
var i = (e >> 24) / 255, n = (e >> 16 & 255) / 255, r = (e >> 8 & 255) / 255, s = (255 & e) / 255;
t.r = i;
t.g = n;
t.b = r;
t.a = s;
return t;
};
e.fromHEX = function(t, e) {
e = 0 === e.indexOf("#") ? e.substring(1) : e;
t.r = parseInt(e.substr(0, 2), 16) || 0;
t.g = parseInt(e.substr(2, 2), 16) || 0;
t.b = parseInt(e.substr(4, 2), 16) || 0;
t.a = parseInt(e.substr(6, 2), 16) || 255;
t._val = (t.a << 24 >>> 0) + (t.b << 16) + (t.g << 8) + t.r;
return t;
};
e.add = function(t, e, i) {
t.r = e.r + i.r;
t.g = e.g + i.g;
t.b = e.b + i.b;
t.a = e.a + i.a;
return t;
};
e.subtract = function(t, e, i) {
t.r = e.r - i.r;
t.g = e.g - i.g;
t.b = e.b - i.b;
t.a = e.a - i.a;
return t;
};
e.multiply = function(t, e, i) {
t.r = e.r * i.r;
t.g = e.g * i.g;
t.b = e.b * i.b;
t.a = e.a * i.a;
return t;
};
e.divide = function(t, e, i) {
t.r = e.r / i.r;
t.g = e.g / i.g;
t.b = e.b / i.b;
t.a = e.a / i.a;
return t;
};
e.scale = function(t, e, i) {
t.r = e.r * i;
t.g = e.g * i;
t.b = e.b * i;
t.a = e.a * i;
return t;
};
e.lerp = function(t, e, i, n) {
var r = e.r, s = e.g, a = e.b, o = e.a;
t.r = r + n * (i.r - r);
t.g = s + n * (i.g - s);
t.b = a + n * (i.b - a);
t.a = o + n * (i.a - o);
return t;
};
e.toArray = function(t, i, n) {
void 0 === n && (n = 0);
var r = i instanceof e || i.a > 1 ? 1 / 255 : 1;
t[n + 0] = i.r * r;
t[n + 1] = i.g * r;
t[n + 2] = i.b * r;
t[n + 3] = i.a * r;
return t;
};
e.fromArray = function(t, e, i) {
void 0 === i && (i = 0);
e.r = 255 * t[i + 0];
e.g = 255 * t[i + 1];
e.b = 255 * t[i + 2];
e.a = 255 * t[i + 3];
return e;
};
e.premultiplyAlpha = function(t, e) {
var i = e.a / 255;
t.r = e.r * i;
t.g = e.g * i;
t.b = e.b * i;
t._fastSetA(e.a);
return t;
};
c(e, null, [ {
key: "WHITE",
get: function() {
return new e(255, 255, 255, 255);
}
}, {
key: "BLACK",
get: function() {
return new e(0, 0, 0, 255);
}
}, {
key: "TRANSPARENT",
get: function() {
return new e(0, 0, 0, 0);
}
}, {
key: "GRAY",
get: function() {
return new e(127.5, 127.5, 127.5);
}
}, {
key: "RED",
get: function() {
return new e(255, 0, 0);
}
}, {
key: "GREEN",
get: function() {
return new e(0, 255, 0);
}
}, {
key: "BLUE",
get: function() {
return new e(0, 0, 255);
}
}, {
key: "YELLOW",
get: function() {
return new e(255, 235, 4);
}
}, {
key: "ORANGE",
get: function() {
return new e(255, 127, 0);
}
}, {
key: "CYAN",
get: function() {
return new e(0, 255, 255);
}
}, {
key: "MAGENTA",
get: function() {
return new e(255, 0, 255);
}
} ]);
function e(e, i, n, r) {
var s;
void 0 === e && (e = 0);
void 0 === i && (i = 0);
void 0 === n && (n = 0);
void 0 === r && (r = 255);
(s = t.call(this) || this)._val = 0;
if ("object" == typeof e) {
i = e.g;
n = e.b;
r = e.a;
e = e.r;
}
s._val = (r << 24 >>> 0) + (n << 16) + (i << 8) + (0 | e);
return s;
}
var i = e.prototype;
i.clone = function() {
var t = new e();
t._val = this._val;
return t;
};
i.equals = function(t) {
return t && this._val === t._val;
};
i.lerp = function(t, i, n) {
n = n || new e();
var r = this.r, s = this.g, a = this.b, o = this.a;
n.r = r + (t.r - r) * i;
n.g = s + (t.g - s) * i;
n.b = a + (t.b - a) * i;
n.a = o + (t.a - o) * i;
return n;
};
i.toString = function() {
return "rgba(" + this.r.toFixed() + ", " + this.g.toFixed() + ", " + this.b.toFixed() + ", " + this.a.toFixed() + ")";
};
i.getR = function() {
return 255 & this._val;
};
i.setR = function(t) {
t = ~~s.default.clampf(t, 0, 255);
this._val = (4294967040 & this._val | t) >>> 0;
return this;
};
i.getG = function() {
return (65280 & this._val) >> 8;
};
i.setG = function(t) {
t = ~~s.default.clampf(t, 0, 255);
this._val = (4294902015 & this._val | t << 8) >>> 0;
return this;
};
i.getB = function() {
return (16711680 & this._val) >> 16;
};
i.setB = function(t) {
t = ~~s.default.clampf(t, 0, 255);
this._val = (4278255615 & this._val | t << 16) >>> 0;
return this;
};
i.getA = function() {
return (4278190080 & this._val) >>> 24;
};
i.setA = function(t) {
t = ~~s.default.clampf(t, 0, 255);
this._val = (16777215 & this._val | t << 24) >>> 0;
return this;
};
i.toCSS = function(t) {
return t && "rgba" !== t ? "rgb" === t ? "rgb(" + this.r + "," + this.g + "," + this.b + ")" : "#" + this.toHEX(t) : "rgba(" + this.r + "," + this.g + "," + this.b + "," + (this.a / 255).toFixed(2) + ")";
};
i.fromHEX = function(t) {
t = 0 === t.indexOf("#") ? t.substring(1) : t;
var e = parseInt(t.substr(0, 2), 16) || 0, i = parseInt(t.substr(2, 2), 16) || 0, n = parseInt(t.substr(4, 2), 16) || 0, r = parseInt(t.substr(6, 2), 16) || 255;
this._val = (r << 24 >>> 0) + (n << 16) + (i << 8) + e;
return this;
};
i.toHEX = function(t) {
var e = [ (this.r < 16 ? "0" : "") + this.r.toString(16), (this.g < 16 ? "0" : "") + this.g.toString(16), (this.b < 16 ? "0" : "") + this.b.toString(16) ];
if ("#rgb" === t) {
e[0] = e[0][0];
e[1] = e[1][0];
e[2] = e[2][0];
} else "#rrggbbaa" === t && e.push((this.a < 16 ? "0" : "") + this.a.toString(16));
return e.join("");
};
i.toRGBValue = function() {
return 16777215 & this._val;
};
i.fromHSV = function(t, e, i) {
var n, r, s;
if (0 === e) n = r = s = i; else if (0 === i) n = r = s = 0; else {
1 === t && (t = 0);
t *= 6;
var a = Math.floor(t), o = t - a, c = i * (1 - e), u = i * (1 - e * o), l = i * (1 - e * (1 - o));
switch (a) {
case 0:
n = i;
r = l;
s = c;
break;

case 1:
n = u;
r = i;
s = c;
break;

case 2:
n = c;
r = i;
s = l;
break;

case 3:
n = c;
r = u;
s = i;
break;

case 4:
n = l;
r = c;
s = i;
break;

case 5:
n = i;
r = c;
s = u;
}
}
n *= 255;
r *= 255;
s *= 255;
this._val = (this.a << 24 >>> 0) + (s << 16) + (r << 8) + (0 | n);
return this;
};
i.toHSV = function() {
var t = this.r / 255, e = this.g / 255, i = this.b / 255, n = {
h: 0,
s: 0,
v: 0
}, r = Math.max(t, e, i), s = Math.min(t, e, i), a = 0;
n.v = r;
n.s = r ? (r - s) / r : 0;
if (n.s) {
a = r - s;
n.h = t === r ? (e - i) / a : e === r ? 2 + (i - t) / a : 4 + (t - e) / a;
n.h /= 6;
n.h < 0 && (n.h += 1);
} else n.h = 0;
return n;
};
i.set = function(t) {
if (t._val) this._val = t._val; else {
this.r = t.r;
this.g = t.g;
this.b = t.b;
this.a = t.a;
}
return this;
};
i._fastSetA = function(t) {
this._val = (16777215 & this._val | t << 24) >>> 0;
};
i.multiply = function(t) {
var e = (255 & this._val) * t.r >> 8, i = (65280 & this._val) * t.g >> 8, n = (16711680 & this._val) * t.b >> 8, r = ((4278190080 & this._val) >>> 8) * t.a;
this._val = 4278190080 & r | 16711680 & n | 65280 & i | 255 & e;
return this;
};
c(e, [ {
key: "r",
get: function() {
return this.getR();
},
set: function(t) {
this.setR(t);
}
}, {
key: "g",
get: function() {
return this.getG();
},
set: function(t) {
this.setG(t);
}
}, {
key: "b",
get: function() {
return this.getB();
},
set: function(t) {
this.setB(t);
}
}, {
key: "a",
get: function() {
return this.getA();
},
set: function(t) {
this.setA(t);
}
} ]);
return e;
})(n.default);
i.default = l;
l.div = l.divide;
l.sub = l.subtract;
l.mul = l.multiply;
l.WHITE_R = l.WHITE;
l.BLACK_R = l.BLACK;
l.TRANSPARENT_R = l.TRANSPARENT;
l.GRAY_R = l.GRAY;
l.RED_R = l.RED;
l.GREEN_R = l.GREEN;
l.BLUE_R = l.BLUE;
l.YELLOW_R = l.YELLOW;
l.ORANGE_R = l.ORANGE;
l.CYAN_R = l.CYAN;
l.MAGENTA_R = l.MAGENTA;
r.default.fastDefine("cc.Color", l, {
r: 0,
g: 0,
b: 0,
a: 255
});
cc.Color = l;
cc.color = function(t, e, i, n) {
return "string" == typeof t ? new l().fromHEX(t) : "object" == typeof t ? new l(t.r, t.g, t.b, t.a) : new l(t, e, i, n);
};
e.exports = i.default;
}), {
"../platform/CCClass": 128,
"../utils/misc": 196,
"./value-type": 219
} ],
211: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
var n = {
Vec2: !0,
Vec3: !0,
Vec4: !0,
Mat4: !0,
Mat3: !0,
Rect: !0,
Size: !0,
Color: !0,
Quat: !0,
Trs: !0
};
i.Trs = i.Quat = i.Color = i.Size = i.Rect = i.Mat3 = i.Mat4 = i.Vec4 = i.Vec3 = i.Vec2 = void 0;
var r = p(t("./vec2"));
i.Vec2 = r.default;
var s = p(t("./vec3"));
i.Vec3 = s.default;
var a = p(t("./vec4"));
i.Vec4 = a.default;
var o = p(t("./mat4"));
i.Mat4 = o.default;
var c = p(t("./mat3"));
i.Mat3 = c.default;
var u = p(t("./rect"));
i.Rect = u.default;
var l = p(t("./size"));
i.Size = l.default;
var h = p(t("./color"));
i.Color = h.default;
var f = p(t("./quat"));
i.Quat = f.default;
var _ = p(t("./trs"));
i.Trs = _.default;
var d = t("./utils");
Object.keys(d).forEach((function(t) {
"default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(n, t) || (i[t] = d[t]));
}));
function p(t) {
return t && t.__esModule ? t : {
default: t
};
}
cc.math = e.exports;
}), {
"./color": 210,
"./mat3": 212,
"./mat4": 213,
"./quat": 214,
"./rect": 215,
"./size": 216,
"./trs": 217,
"./utils": 218,
"./vec2": 220,
"./vec3": 221,
"./vec4": 222
} ],
212: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n, r = t("../value-types/utils"), s = (n = t("./vec3")) && n.__esModule ? n : {
default: n
}, a = (function() {
t.create = function(e, i, n, r, s, a, o, c, u) {
void 0 === e && (e = 1);
void 0 === i && (i = 0);
void 0 === n && (n = 0);
void 0 === r && (r = 0);
void 0 === s && (s = 1);
void 0 === a && (a = 0);
void 0 === o && (o = 0);
void 0 === c && (c = 0);
void 0 === u && (u = 1);
return new t(e, i, n, r, s, a, o, c, u);
};
t.clone = function(e) {
var i = e.m;
return new t(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8]);
};
t.copy = function(t, e) {
t.m.set(e.m);
return t;
};
t.set = function(t, e, i, n, r, s, a, o, c, u) {
var l = t.m;
l[0] = e;
l[1] = i;
l[2] = n;
l[3] = r;
l[4] = s;
l[5] = a;
l[6] = o;
l[7] = c;
l[8] = u;
return t;
};
t.identity = function(t) {
var e = t.m;
e[0] = 1;
e[1] = 0;
e[2] = 0;
e[3] = 0;
e[4] = 1;
e[5] = 0;
e[6] = 0;
e[7] = 0;
e[8] = 1;
return t;
};
t.transpose = function(t, e) {
var i = e.m, n = t.m;
if (t === e) {
var r = i[1], s = i[2], a = i[5];
n[1] = i[3];
n[2] = i[6];
n[3] = r;
n[5] = i[7];
n[6] = s;
n[7] = a;
} else {
n[0] = i[0];
n[1] = i[3];
n[2] = i[6];
n[3] = i[1];
n[4] = i[4];
n[5] = i[7];
n[6] = i[2];
n[7] = i[5];
n[8] = i[8];
}
return t;
};
t.invert = function(t, e) {
var i = e.m, n = t.m, r = i[0], s = i[1], a = i[2], o = i[3], c = i[4], u = i[5], l = i[6], h = i[7], f = i[8], _ = f * c - u * h, d = -f * o + u * l, p = h * o - c * l, v = r * _ + s * d + a * p;
if (!v) return t;
v = 1 / v;
n[0] = _ * v;
n[1] = (-f * s + a * h) * v;
n[2] = (u * s - a * c) * v;
n[3] = d * v;
n[4] = (f * r - a * l) * v;
n[5] = (-u * r + a * o) * v;
n[6] = p * v;
n[7] = (-h * r + s * l) * v;
n[8] = (c * r - s * o) * v;
return t;
};
t.adjoint = function(t, e) {
var i = e.m, n = t.m, r = i[0], s = i[1], a = i[2], o = i[3], c = i[4], u = i[5], l = i[6], h = i[7], f = i[8];
n[0] = c * f - u * h;
n[1] = a * h - s * f;
n[2] = s * u - a * c;
n[3] = u * l - o * f;
n[4] = r * f - a * l;
n[5] = a * o - r * u;
n[6] = o * h - c * l;
n[7] = s * l - r * h;
n[8] = r * c - s * o;
return t;
};
t.determinant = function(t) {
var e = t.m, i = e[0], n = e[1], r = e[2], s = e[3], a = e[4], o = e[5], c = e[6], u = e[7], l = e[8];
return i * (l * a - o * u) + n * (-l * s + o * c) + r * (u * s - a * c);
};
t.multiply = function(t, e, i) {
var n = e.m, r = i.m, s = t.m, a = n[0], o = n[1], c = n[2], u = n[3], l = n[4], h = n[5], f = n[6], _ = n[7], d = n[8], p = r[0], v = r[1], g = r[2], m = r[3], y = r[4], E = r[5], T = r[6], C = r[7], A = r[8];
s[0] = p * a + v * u + g * f;
s[1] = p * o + v * l + g * _;
s[2] = p * c + v * h + g * d;
s[3] = m * a + y * u + E * f;
s[4] = m * o + y * l + E * _;
s[5] = m * c + y * h + E * d;
s[6] = T * a + C * u + A * f;
s[7] = T * o + C * l + A * _;
s[8] = T * c + C * h + A * d;
return t;
};
t.multiplyMat4 = function(t, e, i) {
var n = e.m, r = i.m, s = t.m, a = n[0], o = n[1], c = n[2], u = n[3], l = n[4], h = n[5], f = n[6], _ = n[7], d = n[8], p = r[0], v = r[1], g = r[2], m = r[4], y = r[5], E = r[6], T = r[8], C = r[9], A = r[10];
s[0] = p * a + v * u + g * f;
s[1] = p * o + v * l + g * _;
s[2] = p * c + v * h + g * d;
s[3] = m * a + y * u + E * f;
s[4] = m * o + y * l + E * _;
s[5] = m * c + y * h + E * d;
s[6] = T * a + C * u + A * f;
s[7] = T * o + C * l + A * _;
s[8] = T * c + C * h + A * d;
return t;
};
t.translate = function(t, e, i) {
var n = e.m, r = t.m, s = n[0], a = n[1], o = n[2], c = n[3], u = n[4], l = n[5], h = n[6], f = n[7], _ = n[8], d = i.x, p = i.y;
r[0] = s;
r[1] = a;
r[2] = o;
r[3] = c;
r[4] = u;
r[5] = l;
r[6] = d * s + p * c + h;
r[7] = d * a + p * u + f;
r[8] = d * o + p * l + _;
return t;
};
t.rotate = function(t, e, i) {
var n = e.m, r = t.m, s = n[0], a = n[1], o = n[2], c = n[3], u = n[4], l = n[5], h = n[6], f = n[7], _ = n[8], d = Math.sin(i), p = Math.cos(i);
r[0] = p * s + d * c;
r[1] = p * a + d * u;
r[2] = p * o + d * l;
r[3] = p * c - d * s;
r[4] = p * u - d * a;
r[5] = p * l - d * o;
r[6] = h;
r[7] = f;
r[8] = _;
return t;
};
t.scale = function(t, e, i) {
var n = i.x, r = i.y, s = e.m, a = t.m;
a[0] = n * s[0];
a[1] = n * s[1];
a[2] = n * s[2];
a[3] = r * s[3];
a[4] = r * s[4];
a[5] = r * s[5];
a[6] = s[6];
a[7] = s[7];
a[8] = s[8];
return t;
};
t.fromMat4 = function(t, e) {
var i = e.m, n = t.m;
n[0] = i[0];
n[1] = i[1];
n[2] = i[2];
n[3] = i[4];
n[4] = i[5];
n[5] = i[6];
n[6] = i[8];
n[7] = i[9];
n[8] = i[10];
return t;
};
t.fromTranslation = function(t, e) {
var i = t.m;
i[0] = 1;
i[1] = 0;
i[2] = 0;
i[3] = 0;
i[4] = 1;
i[5] = 0;
i[6] = e.x;
i[7] = e.y;
i[8] = 1;
return t;
};
t.fromRotation = function(t, e) {
var i = Math.sin(e), n = Math.cos(e), r = t.m;
r[0] = n;
r[1] = i;
r[2] = 0;
r[3] = -i;
r[4] = n;
r[5] = 0;
r[6] = 0;
r[7] = 0;
r[8] = 1;
return t;
};
t.fromScaling = function(t, e) {
var i = t.m;
i[0] = e.x;
i[1] = 0;
i[2] = 0;
i[3] = 0;
i[4] = e.y;
i[5] = 0;
i[6] = 0;
i[7] = 0;
i[8] = 1;
return t;
};
t.fromQuat = function(t, e) {
var i = t.m, n = e.x, r = e.y, s = e.z, a = e.w, o = n + n, c = r + r, u = s + s, l = n * o, h = r * o, f = r * c, _ = s * o, d = s * c, p = s * u, v = a * o, g = a * c, m = a * u;
i[0] = 1 - f - p;
i[3] = h - m;
i[6] = _ + g;
i[1] = h + m;
i[4] = 1 - l - p;
i[7] = d - v;
i[2] = _ - g;
i[5] = d + v;
i[8] = 1 - l - f;
return t;
};
t.fromViewUp = function(e, i, n) {
var a, o, c;
return (a = new s.default(0, 1, 0), o = new s.default(), c = new s.default(), function(e, i, n) {
if (s.default.lengthSqr(i) < r.EPSILON * r.EPSILON) {
t.identity(e);
return e;
}
n = n || a;
s.default.normalize(o, s.default.cross(o, n, i));
if (s.default.lengthSqr(o) < r.EPSILON * r.EPSILON) {
t.identity(e);
return e;
}
s.default.cross(c, i, o);
t.set(e, o.x, o.y, o.z, c.x, c.y, c.z, i.x, i.y, i.z);
return e;
})(e, i, n);
};
t.normalFromMat4 = function(t, e) {
var i = e.m, n = t.m, r = i[0], s = i[1], a = i[2], o = i[3], c = i[4], u = i[5], l = i[6], h = i[7], f = i[8], _ = i[9], d = i[10], p = i[11], v = i[12], g = i[13], m = i[14], y = i[15], E = r * u - s * c, T = r * l - a * c, C = r * h - o * c, A = s * l - a * u, S = s * h - o * u, x = a * h - o * l, b = f * g - _ * v, R = f * m - d * v, w = f * y - p * v, O = _ * m - d * g, I = _ * y - p * g, D = d * y - p * m, M = E * D - T * I + C * O + A * w - S * R + x * b;
if (!M) return t;
M = 1 / M;
n[0] = (u * D - l * I + h * O) * M;
n[1] = (l * w - c * D - h * R) * M;
n[2] = (c * I - u * w + h * b) * M;
n[3] = (a * I - s * D - o * O) * M;
n[4] = (r * D - a * w + o * R) * M;
n[5] = (s * w - r * I - o * b) * M;
n[6] = (g * x - m * S + y * A) * M;
n[7] = (m * C - v * x - y * T) * M;
n[8] = (v * S - g * C + y * E) * M;
return t;
};
t.frob = function(t) {
var e = t.m;
return Math.sqrt(Math.pow(e[0], 2) + Math.pow(e[1], 2) + Math.pow(e[2], 2) + Math.pow(e[3], 2) + Math.pow(e[4], 2) + Math.pow(e[5], 2) + Math.pow(e[6], 2) + Math.pow(e[7], 2) + Math.pow(e[8], 2));
};
t.add = function(t, e, i) {
var n = e.m, r = i.m, s = t.m;
s[0] = n[0] + r[0];
s[1] = n[1] + r[1];
s[2] = n[2] + r[2];
s[3] = n[3] + r[3];
s[4] = n[4] + r[4];
s[5] = n[5] + r[5];
s[6] = n[6] + r[6];
s[7] = n[7] + r[7];
s[8] = n[8] + r[8];
return t;
};
t.subtract = function(t, e, i) {
var n = e.m, r = i.m, s = t.m;
s[0] = n[0] - r[0];
s[1] = n[1] - r[1];
s[2] = n[2] - r[2];
s[3] = n[3] - r[3];
s[4] = n[4] - r[4];
s[5] = n[5] - r[5];
s[6] = n[6] - r[6];
s[7] = n[7] - r[7];
s[8] = n[8] - r[8];
return t;
};
t.multiplyScalar = function(t, e, i) {
var n = e.m, r = t.m;
r[0] = n[0] * i;
r[1] = n[1] * i;
r[2] = n[2] * i;
r[3] = n[3] * i;
r[4] = n[4] * i;
r[5] = n[5] * i;
r[6] = n[6] * i;
r[7] = n[7] * i;
r[8] = n[8] * i;
return t;
};
t.multiplyScalarAndAdd = function(t, e, i, n) {
var r = e.m, s = i.m, a = t.m;
a[0] = r[0] + s[0] * n;
a[1] = r[1] + s[1] * n;
a[2] = r[2] + s[2] * n;
a[3] = r[3] + s[3] * n;
a[4] = r[4] + s[4] * n;
a[5] = r[5] + s[5] * n;
a[6] = r[6] + s[6] * n;
a[7] = r[7] + s[7] * n;
a[8] = r[8] + s[8] * n;
return t;
};
t.exactEquals = function(t, e) {
var i = t.m, n = e.m;
return i[0] === n[0] && i[1] === n[1] && i[2] === n[2] && i[3] === n[3] && i[4] === n[4] && i[5] === n[5] && i[6] === n[6] && i[7] === n[7] && i[8] === n[8];
};
t.equals = function(t, e) {
var i = t.m, n = e.m, s = i[0], a = i[1], o = i[2], c = i[3], u = i[4], l = i[5], h = i[6], f = i[7], _ = i[8], d = n[0], p = n[1], v = n[2], g = n[3], m = n[4], y = n[5], E = n[6], T = n[7], C = n[8];
return Math.abs(s - d) <= r.EPSILON * Math.max(1, Math.abs(s), Math.abs(d)) && Math.abs(a - p) <= r.EPSILON * Math.max(1, Math.abs(a), Math.abs(p)) && Math.abs(o - v) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(v)) && Math.abs(c - g) <= r.EPSILON * Math.max(1, Math.abs(c), Math.abs(g)) && Math.abs(u - m) <= r.EPSILON * Math.max(1, Math.abs(u), Math.abs(m)) && Math.abs(l - y) <= r.EPSILON * Math.max(1, Math.abs(l), Math.abs(y)) && Math.abs(h - E) <= r.EPSILON * Math.max(1, Math.abs(h), Math.abs(E)) && Math.abs(f - T) <= r.EPSILON * Math.max(1, Math.abs(f), Math.abs(T)) && Math.abs(_ - C) <= r.EPSILON * Math.max(1, Math.abs(_), Math.abs(C));
};
t.toArray = function(t, e, i) {
void 0 === i && (i = 0);
for (var n = e.m, r = 0; r < 9; r++) t[i + r] = n[r];
return t;
};
t.fromArray = function(t, e, i) {
void 0 === i && (i = 0);
for (var n = t.m, r = 0; r < 9; r++) n[r] = e[i + r];
return t;
};
function t(t, e, i, n, s, a, o, c, u) {
void 0 === t && (t = 1);
void 0 === e && (e = 0);
void 0 === i && (i = 0);
void 0 === n && (n = 0);
void 0 === s && (s = 1);
void 0 === a && (a = 0);
void 0 === o && (o = 0);
void 0 === c && (c = 0);
void 0 === u && (u = 1);
this.m = void 0;
if (t instanceof r.FLOAT_ARRAY_TYPE) this.m = t; else {
this.m = new r.FLOAT_ARRAY_TYPE(9);
var l = this.m;
l[0] = t;
l[1] = e;
l[2] = i;
l[3] = n;
l[4] = s;
l[5] = a;
l[6] = o;
l[7] = c;
l[8] = u;
}
}
t.prototype.toString = function() {
var t = this.m;
return "mat3(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ")";
};
return t;
})();
i.default = a;
a.sub = a.subtract;
a.mul = a.multiply;
a.IDENTITY = Object.freeze(new a());
cc.Mat3 = a;
e.exports = i.default;
}), {
"../value-types/utils": 218,
"./vec3": 221
} ],
213: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = u(t("./value-type")), r = u(t("../platform/CCClass")), s = u(t("./vec3")), a = u(t("./quat")), o = t("./utils"), c = u(t("./mat3"));
function u(t) {
return t && t.__esModule ? t : {
default: t
};
}
function l(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var h = 0, f = 0, _ = 0, d = 0, p = 0, v = 0, g = 0, m = 0, y = 0, E = 0, T = 0, C = 0, A = 0, S = 0, x = 0, b = 0, R = (function(t) {
l(i, t);
var e = i.prototype;
e.mul = function(t, e) {
return i.multiply(e || new i(), this, t);
};
e.mulScalar = function(t, e) {
i.multiplyScalar(e || new i(), this, t);
};
e.sub = function(t, e) {
i.subtract(e || new i(), this, t);
};
i.clone = function(t) {
var e = t.m;
return new i(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]);
};
i.copy = function(t, e) {
var i = t.m, n = e.m;
i[0] = n[0];
i[1] = n[1];
i[2] = n[2];
i[3] = n[3];
i[4] = n[4];
i[5] = n[5];
i[6] = n[6];
i[7] = n[7];
i[8] = n[8];
i[9] = n[9];
i[10] = n[10];
i[11] = n[11];
i[12] = n[12];
i[13] = n[13];
i[14] = n[14];
i[15] = n[15];
return t;
};
i.set = function(t, e, i, n, r, s, a, o, c, u, l, h, f, _, d, p, v) {
var g = t.m;
g[0] = e;
g[1] = i;
g[2] = n;
g[3] = r;
g[4] = s;
g[5] = a;
g[6] = o;
g[7] = c;
g[8] = u;
g[9] = l;
g[10] = h;
g[11] = f;
g[12] = _;
g[13] = d;
g[14] = p;
g[15] = v;
return t;
};
i.identity = function(t) {
var e = t.m;
e[0] = 1;
e[1] = 0;
e[2] = 0;
e[3] = 0;
e[4] = 0;
e[5] = 1;
e[6] = 0;
e[7] = 0;
e[8] = 0;
e[9] = 0;
e[10] = 1;
e[11] = 0;
e[12] = 0;
e[13] = 0;
e[14] = 0;
e[15] = 1;
return t;
};
i.transpose = function(t, e) {
var i = t.m, n = e.m;
if (t === e) {
var r = n[1], s = n[2], a = n[3], o = n[6], c = n[7], u = n[11];
i[1] = n[4];
i[2] = n[8];
i[3] = n[12];
i[4] = r;
i[6] = n[9];
i[7] = n[13];
i[8] = s;
i[9] = o;
i[11] = n[14];
i[12] = a;
i[13] = c;
i[14] = u;
} else {
i[0] = n[0];
i[1] = n[4];
i[2] = n[8];
i[3] = n[12];
i[4] = n[1];
i[5] = n[5];
i[6] = n[9];
i[7] = n[13];
i[8] = n[2];
i[9] = n[6];
i[10] = n[10];
i[11] = n[14];
i[12] = n[3];
i[13] = n[7];
i[14] = n[11];
i[15] = n[15];
}
return t;
};
i.invert = function(t, e) {
var i = e.m;
h = i[0];
f = i[1];
_ = i[2];
d = i[3];
p = i[4];
v = i[5];
g = i[6];
m = i[7];
y = i[8];
E = i[9];
T = i[10];
C = i[11];
A = i[12];
S = i[13];
x = i[14];
b = i[15];
var n = h * v - f * p, r = h * g - _ * p, s = h * m - d * p, a = f * g - _ * v, o = f * m - d * v, c = _ * m - d * g, u = y * S - E * A, l = y * x - T * A, R = y * b - C * A, w = E * x - T * S, O = E * b - C * S, I = T * b - C * x, D = n * I - r * O + s * w + a * R - o * l + c * u;
if (0 === D) return null;
D = 1 / D;
var M = t.m;
M[0] = (v * I - g * O + m * w) * D;
M[1] = (_ * O - f * I - d * w) * D;
M[2] = (S * c - x * o + b * a) * D;
M[3] = (T * o - E * c - C * a) * D;
M[4] = (g * R - p * I - m * l) * D;
M[5] = (h * I - _ * R + d * l) * D;
M[6] = (x * s - A * c - b * r) * D;
M[7] = (y * c - T * s + C * r) * D;
M[8] = (p * O - v * R + m * u) * D;
M[9] = (f * R - h * O - d * u) * D;
M[10] = (A * o - S * s + b * n) * D;
M[11] = (E * s - y * o - C * n) * D;
M[12] = (v * l - p * w - g * u) * D;
M[13] = (h * w - f * l + _ * u) * D;
M[14] = (S * r - A * a - x * n) * D;
M[15] = (y * a - E * r + T * n) * D;
return t;
};
i.determinant = function(t) {
var e = t.m;
h = e[0];
f = e[1];
_ = e[2];
d = e[3];
p = e[4];
v = e[5];
g = e[6];
m = e[7];
y = e[8];
E = e[9];
T = e[10];
C = e[11];
A = e[12];
S = e[13];
x = e[14];
b = e[15];
return (h * v - f * p) * (T * b - C * x) - (h * g - _ * p) * (E * b - C * S) + (h * m - d * p) * (E * x - T * S) + (f * g - _ * v) * (y * b - C * A) - (f * m - d * v) * (y * x - T * A) + (_ * m - d * g) * (y * S - E * A);
};
i.multiply = function(t, e, i) {
var n = t.m, r = e.m, s = i.m;
h = r[0];
f = r[1];
_ = r[2];
d = r[3];
p = r[4];
v = r[5];
g = r[6];
m = r[7];
y = r[8];
E = r[9];
T = r[10];
C = r[11];
A = r[12];
S = r[13];
x = r[14];
b = r[15];
var a = s[0], o = s[1], c = s[2], u = s[3];
n[0] = a * h + o * p + c * y + u * A;
n[1] = a * f + o * v + c * E + u * S;
n[2] = a * _ + o * g + c * T + u * x;
n[3] = a * d + o * m + c * C + u * b;
a = s[4];
o = s[5];
c = s[6];
u = s[7];
n[4] = a * h + o * p + c * y + u * A;
n[5] = a * f + o * v + c * E + u * S;
n[6] = a * _ + o * g + c * T + u * x;
n[7] = a * d + o * m + c * C + u * b;
a = s[8];
o = s[9];
c = s[10];
u = s[11];
n[8] = a * h + o * p + c * y + u * A;
n[9] = a * f + o * v + c * E + u * S;
n[10] = a * _ + o * g + c * T + u * x;
n[11] = a * d + o * m + c * C + u * b;
a = s[12];
o = s[13];
c = s[14];
u = s[15];
n[12] = a * h + o * p + c * y + u * A;
n[13] = a * f + o * v + c * E + u * S;
n[14] = a * _ + o * g + c * T + u * x;
n[15] = a * d + o * m + c * C + u * b;
return t;
};
i.transform = function(t, e, i) {
var n = i.x, r = i.y, s = i.z, a = t.m, o = e.m;
if (e === t) {
a[12] = o[0] * n + o[4] * r + o[8] * s + o[12];
a[13] = o[1] * n + o[5] * r + o[9] * s + o[13];
a[14] = o[2] * n + o[6] * r + o[10] * s + o[14];
a[15] = o[3] * n + o[7] * r + o[11] * s + o[15];
} else {
h = o[0];
f = o[1];
_ = o[2];
d = o[3];
p = o[4];
v = o[5];
g = o[6];
m = o[7];
y = o[8];
E = o[9];
T = o[10];
C = o[11];
A = o[12];
S = o[13];
x = o[14];
b = o[15];
a[0] = h;
a[1] = f;
a[2] = _;
a[3] = d;
a[4] = p;
a[5] = v;
a[6] = g;
a[7] = m;
a[8] = y;
a[9] = E;
a[10] = T;
a[11] = C;
a[12] = h * n + p * r + y * s + o[12];
a[13] = f * n + v * r + E * s + o[13];
a[14] = _ * n + g * r + T * s + o[14];
a[15] = d * n + m * r + C * s + o[15];
}
return t;
};
i.translate = function(t, e, i) {
var n = t.m, r = e.m;
if (e === t) {
n[12] += i.x;
n[13] += i.y;
n[14] += i.z;
} else {
n[0] = r[0];
n[1] = r[1];
n[2] = r[2];
n[3] = r[3];
n[4] = r[4];
n[5] = r[5];
n[6] = r[6];
n[7] = r[7];
n[8] = r[8];
n[9] = r[9];
n[10] = r[10];
n[11] = r[11];
n[12] += i.x;
n[13] += i.y;
n[14] += i.z;
n[15] = r[15];
}
return t;
};
i.scale = function(t, e, i) {
var n = i.x, r = i.y, s = i.z, a = t.m, o = e.m;
a[0] = o[0] * n;
a[1] = o[1] * n;
a[2] = o[2] * n;
a[3] = o[3] * n;
a[4] = o[4] * r;
a[5] = o[5] * r;
a[6] = o[6] * r;
a[7] = o[7] * r;
a[8] = o[8] * s;
a[9] = o[9] * s;
a[10] = o[10] * s;
a[11] = o[11] * s;
a[12] = o[12];
a[13] = o[13];
a[14] = o[14];
a[15] = o[15];
return t;
};
i.rotate = function(t, e, i, n) {
var r = n.x, s = n.y, a = n.z, c = Math.sqrt(r * r + s * s + a * a);
if (Math.abs(c) < o.EPSILON) return null;
r *= c = 1 / c;
s *= c;
a *= c;
var u = Math.sin(i), l = Math.cos(i), A = 1 - l, S = e.m;
h = S[0];
f = S[1];
_ = S[2];
d = S[3];
p = S[4];
v = S[5];
g = S[6];
m = S[7];
y = S[8];
E = S[9];
T = S[10];
C = S[11];
var x = r * r * A + l, b = s * r * A + a * u, R = a * r * A - s * u, w = r * s * A - a * u, O = s * s * A + l, I = a * s * A + r * u, D = r * a * A + s * u, M = s * a * A - r * u, L = a * a * A + l, N = t.m;
N[0] = h * x + p * b + y * R;
N[1] = f * x + v * b + E * R;
N[2] = _ * x + g * b + T * R;
N[3] = d * x + m * b + C * R;
N[4] = h * w + p * O + y * I;
N[5] = f * w + v * O + E * I;
N[6] = _ * w + g * O + T * I;
N[7] = d * w + m * O + C * I;
N[8] = h * D + p * M + y * L;
N[9] = f * D + v * M + E * L;
N[10] = _ * D + g * M + T * L;
N[11] = d * D + m * M + C * L;
if (e !== t) {
N[12] = S[12];
N[13] = S[13];
N[14] = S[14];
N[15] = S[15];
}
return t;
};
i.rotateX = function(t, e, i) {
var n = t.m, r = e.m, s = Math.sin(i), a = Math.cos(i), o = r[4], c = r[5], u = r[6], l = r[7], h = r[8], f = r[9], _ = r[10], d = r[11];
if (e !== t) {
n[0] = r[0];
n[1] = r[1];
n[2] = r[2];
n[3] = r[3];
n[12] = r[12];
n[13] = r[13];
n[14] = r[14];
n[15] = r[15];
}
n[4] = o * a + h * s;
n[5] = c * a + f * s;
n[6] = u * a + _ * s;
n[7] = l * a + d * s;
n[8] = h * a - o * s;
n[9] = f * a - c * s;
n[10] = _ * a - u * s;
n[11] = d * a - l * s;
return t;
};
i.rotateY = function(t, e, i) {
var n = t.m, r = e.m, s = Math.sin(i), a = Math.cos(i), o = r[0], c = r[1], u = r[2], l = r[3], h = r[8], f = r[9], _ = r[10], d = r[11];
if (e !== t) {
n[4] = r[4];
n[5] = r[5];
n[6] = r[6];
n[7] = r[7];
n[12] = r[12];
n[13] = r[13];
n[14] = r[14];
n[15] = r[15];
}
n[0] = o * a - h * s;
n[1] = c * a - f * s;
n[2] = u * a - _ * s;
n[3] = l * a - d * s;
n[8] = o * s + h * a;
n[9] = c * s + f * a;
n[10] = u * s + _ * a;
n[11] = l * s + d * a;
return t;
};
i.rotateZ = function(t, e, i) {
var n = e.m, r = t.m, s = Math.sin(i), a = Math.cos(i), o = e.m[0], c = e.m[1], u = e.m[2], l = e.m[3], h = e.m[4], f = e.m[5], _ = e.m[6], d = e.m[7];
if (e !== t) {
r[8] = n[8];
r[9] = n[9];
r[10] = n[10];
r[11] = n[11];
r[12] = n[12];
r[13] = n[13];
r[14] = n[14];
r[15] = n[15];
}
r[0] = o * a + h * s;
r[1] = c * a + f * s;
r[2] = u * a + _ * s;
r[3] = l * a + d * s;
r[4] = h * a - o * s;
r[5] = f * a - c * s;
r[6] = _ * a - u * s;
r[7] = d * a - l * s;
return t;
};
i.fromTranslation = function(t, e) {
var i = t.m;
i[0] = 1;
i[1] = 0;
i[2] = 0;
i[3] = 0;
i[4] = 0;
i[5] = 1;
i[6] = 0;
i[7] = 0;
i[8] = 0;
i[9] = 0;
i[10] = 1;
i[11] = 0;
i[12] = e.x;
i[13] = e.y;
i[14] = e.z;
i[15] = 1;
return t;
};
i.fromScaling = function(t, e) {
var i = t.m;
i[0] = e.x;
i[1] = 0;
i[2] = 0;
i[3] = 0;
i[4] = 0;
i[5] = e.y;
i[6] = 0;
i[7] = 0;
i[8] = 0;
i[9] = 0;
i[10] = e.z;
i[11] = 0;
i[12] = 0;
i[13] = 0;
i[14] = 0;
i[15] = 1;
return t;
};
i.fromRotation = function(t, e, i) {
var n = i.x, r = i.y, s = i.z, a = Math.sqrt(n * n + r * r + s * s);
if (Math.abs(a) < o.EPSILON) return null;
n *= a = 1 / a;
r *= a;
s *= a;
var c = Math.sin(e), u = Math.cos(e), l = 1 - u, h = t.m;
h[0] = n * n * l + u;
h[1] = r * n * l + s * c;
h[2] = s * n * l - r * c;
h[3] = 0;
h[4] = n * r * l - s * c;
h[5] = r * r * l + u;
h[6] = s * r * l + n * c;
h[7] = 0;
h[8] = n * s * l + r * c;
h[9] = r * s * l - n * c;
h[10] = s * s * l + u;
h[11] = 0;
h[12] = 0;
h[13] = 0;
h[14] = 0;
h[15] = 1;
return t;
};
i.fromXRotation = function(t, e) {
var i = Math.sin(e), n = Math.cos(e), r = t.m;
r[0] = 1;
r[1] = 0;
r[2] = 0;
r[3] = 0;
r[4] = 0;
r[5] = n;
r[6] = i;
r[7] = 0;
r[8] = 0;
r[9] = -i;
r[10] = n;
r[11] = 0;
r[12] = 0;
r[13] = 0;
r[14] = 0;
r[15] = 1;
return t;
};
i.fromYRotation = function(t, e) {
var i = Math.sin(e), n = Math.cos(e), r = t.m;
r[0] = n;
r[1] = 0;
r[2] = -i;
r[3] = 0;
r[4] = 0;
r[5] = 1;
r[6] = 0;
r[7] = 0;
r[8] = i;
r[9] = 0;
r[10] = n;
r[11] = 0;
r[12] = 0;
r[13] = 0;
r[14] = 0;
r[15] = 1;
return t;
};
i.fromZRotation = function(t, e) {
var i = Math.sin(e), n = Math.cos(e), r = t.m;
r[0] = n;
r[1] = i;
r[2] = 0;
r[3] = 0;
r[4] = -i;
r[5] = n;
r[6] = 0;
r[7] = 0;
r[8] = 0;
r[9] = 0;
r[10] = 1;
r[11] = 0;
r[12] = 0;
r[13] = 0;
r[14] = 0;
r[15] = 1;
return t;
};
i.fromRT = function(t, e, i) {
var n = e.x, r = e.y, s = e.z, a = e.w, o = n + n, c = r + r, u = s + s, l = n * o, h = n * c, f = n * u, _ = r * c, d = r * u, p = s * u, v = a * o, g = a * c, m = a * u, y = t.m;
y[0] = 1 - (_ + p);
y[1] = h + m;
y[2] = f - g;
y[3] = 0;
y[4] = h - m;
y[5] = 1 - (l + p);
y[6] = d + v;
y[7] = 0;
y[8] = f + g;
y[9] = d - v;
y[10] = 1 - (l + _);
y[11] = 0;
y[12] = i.x;
y[13] = i.y;
y[14] = i.z;
y[15] = 1;
return t;
};
i.getTranslation = function(t, e) {
var i = e.m;
t.x = i[12];
t.y = i[13];
t.z = i[14];
return t;
};
i.getScaling = function(t, e) {
var i = e.m, n = O.m, r = n[0] = i[0], s = n[1] = i[1], a = n[2] = i[2], o = n[3] = i[4], u = n[4] = i[5], l = n[5] = i[6], h = n[6] = i[8], f = n[7] = i[9], _ = n[8] = i[10];
t.x = Math.sqrt(r * r + s * s + a * a);
t.y = Math.sqrt(o * o + u * u + l * l);
t.z = Math.sqrt(h * h + f * f + _ * _);
c.default.determinant(O) < 0 && (t.x *= -1);
return t;
};
i.getRotation = function(t, e) {
var i = e.m, n = i[0] + i[5] + i[10], r = 0;
if (n > 0) {
r = 2 * Math.sqrt(n + 1);
t.w = .25 * r;
t.x = (i[6] - i[9]) / r;
t.y = (i[8] - i[2]) / r;
t.z = (i[1] - i[4]) / r;
} else if (i[0] > i[5] && i[0] > i[10]) {
r = 2 * Math.sqrt(1 + i[0] - i[5] - i[10]);
t.w = (i[6] - i[9]) / r;
t.x = .25 * r;
t.y = (i[1] + i[4]) / r;
t.z = (i[8] + i[2]) / r;
} else if (i[5] > i[10]) {
r = 2 * Math.sqrt(1 + i[5] - i[0] - i[10]);
t.w = (i[8] - i[2]) / r;
t.x = (i[1] + i[4]) / r;
t.y = .25 * r;
t.z = (i[6] + i[9]) / r;
} else {
r = 2 * Math.sqrt(1 + i[10] - i[0] - i[5]);
t.w = (i[1] - i[4]) / r;
t.x = (i[8] + i[2]) / r;
t.y = (i[6] + i[9]) / r;
t.z = .25 * r;
}
return t;
};
i.toRTS = function(t, e, i, n) {
var r = t.m, o = O.m;
n.x = s.default.set(w, r[0], r[1], r[2]).mag();
o[0] = r[0] / n.x;
o[1] = r[1] / n.x;
o[2] = r[2] / n.x;
n.y = s.default.set(w, r[4], r[5], r[6]).mag();
o[3] = r[4] / n.y;
o[4] = r[5] / n.y;
o[5] = r[6] / n.y;
n.z = s.default.set(w, r[8], r[9], r[10]).mag();
o[6] = r[8] / n.z;
o[7] = r[9] / n.z;
o[8] = r[10] / n.z;
if (c.default.determinant(O) < 0) {
n.x *= -1;
o[0] *= -1;
o[1] *= -1;
o[2] *= -1;
}
a.default.fromMat3(e, O);
s.default.set(i, r[12], r[13], r[14]);
};
i.fromRTS = function(t, e, i, n) {
var r = e.x, s = e.y, a = e.z, o = e.w, c = r + r, u = s + s, l = a + a, h = r * c, f = r * u, _ = r * l, d = s * u, p = s * l, v = a * l, g = o * c, m = o * u, y = o * l, E = n.x, T = n.y, C = n.z, A = t.m;
A[0] = (1 - (d + v)) * E;
A[1] = (f + y) * E;
A[2] = (_ - m) * E;
A[3] = 0;
A[4] = (f - y) * T;
A[5] = (1 - (h + v)) * T;
A[6] = (p + g) * T;
A[7] = 0;
A[8] = (_ + m) * C;
A[9] = (p - g) * C;
A[10] = (1 - (h + d)) * C;
A[11] = 0;
A[12] = i.x;
A[13] = i.y;
A[14] = i.z;
A[15] = 1;
return t;
};
i.fromRTSOrigin = function(t, e, i, n, r) {
var s = e.x, a = e.y, o = e.z, c = e.w, u = s + s, l = a + a, h = o + o, f = s * u, _ = s * l, d = s * h, p = a * l, v = a * h, g = o * h, m = c * u, y = c * l, E = c * h, T = n.x, C = n.y, A = n.z, S = r.x, x = r.y, b = r.z, R = t.m;
R[0] = (1 - (p + g)) * T;
R[1] = (_ + E) * T;
R[2] = (d - y) * T;
R[3] = 0;
R[4] = (_ - E) * C;
R[5] = (1 - (f + g)) * C;
R[6] = (v + m) * C;
R[7] = 0;
R[8] = (d + y) * A;
R[9] = (v - m) * A;
R[10] = (1 - (f + p)) * A;
R[11] = 0;
R[12] = i.x + S - (R[0] * S + R[4] * x + R[8] * b);
R[13] = i.y + x - (R[1] * S + R[5] * x + R[9] * b);
R[14] = i.z + b - (R[2] * S + R[6] * x + R[10] * b);
R[15] = 1;
return t;
};
i.fromQuat = function(t, e) {
var i = e.x, n = e.y, r = e.z, s = e.w, a = i + i, o = n + n, c = r + r, u = i * a, l = n * a, h = n * o, f = r * a, _ = r * o, d = r * c, p = s * a, v = s * o, g = s * c, m = t.m;
m[0] = 1 - h - d;
m[1] = l + g;
m[2] = f - v;
m[3] = 0;
m[4] = l - g;
m[5] = 1 - u - d;
m[6] = _ + p;
m[7] = 0;
m[8] = f + v;
m[9] = _ - p;
m[10] = 1 - u - h;
m[11] = 0;
m[12] = 0;
m[13] = 0;
m[14] = 0;
m[15] = 1;
return t;
};
i.frustum = function(t, e, i, n, r, s, a) {
var o = 1 / (i - e), c = 1 / (r - n), u = 1 / (s - a), l = t.m;
l[0] = 2 * s * o;
l[1] = 0;
l[2] = 0;
l[3] = 0;
l[4] = 0;
l[5] = 2 * s * c;
l[6] = 0;
l[7] = 0;
l[8] = (i + e) * o;
l[9] = (r + n) * c;
l[10] = (a + s) * u;
l[11] = -1;
l[12] = 0;
l[13] = 0;
l[14] = a * s * 2 * u;
l[15] = 0;
return t;
};
i.perspective = function(t, e, i, n, r) {
var s = 1 / Math.tan(e / 2), a = 1 / (n - r), o = t.m;
o[0] = s / i;
o[1] = 0;
o[2] = 0;
o[3] = 0;
o[4] = 0;
o[5] = s;
o[6] = 0;
o[7] = 0;
o[8] = 0;
o[9] = 0;
o[10] = (r + n) * a;
o[11] = -1;
o[12] = 0;
o[13] = 0;
o[14] = 2 * r * n * a;
o[15] = 0;
return t;
};
i.ortho = function(t, e, i, n, r, s, a) {
var o = 1 / (e - i), c = 1 / (n - r), u = 1 / (s - a), l = t.m;
l[0] = -2 * o;
l[1] = 0;
l[2] = 0;
l[3] = 0;
l[4] = 0;
l[5] = -2 * c;
l[6] = 0;
l[7] = 0;
l[8] = 0;
l[9] = 0;
l[10] = 2 * u;
l[11] = 0;
l[12] = (e + i) * o;
l[13] = (r + n) * c;
l[14] = (a + s) * u;
l[15] = 1;
return t;
};
i.lookAt = function(t, e, i, n) {
var r = e.x, s = e.y, a = e.z, o = n.x, c = n.y, u = n.z, l = r - i.x, h = s - i.y, f = a - i.z, _ = 1 / Math.sqrt(l * l + h * h + f * f), d = c * (f *= _) - u * (h *= _), p = u * (l *= _) - o * f, v = o * h - c * l, g = h * (v *= _ = 1 / Math.sqrt(d * d + p * p + v * v)) - f * (p *= _), m = f * (d *= _) - l * v, y = l * p - h * d, E = t.m;
E[0] = d;
E[1] = g;
E[2] = l;
E[3] = 0;
E[4] = p;
E[5] = m;
E[6] = h;
E[7] = 0;
E[8] = v;
E[9] = y;
E[10] = f;
E[11] = 0;
E[12] = -(d * r + p * s + v * a);
E[13] = -(g * r + m * s + y * a);
E[14] = -(l * r + h * s + f * a);
E[15] = 1;
return t;
};
i.inverseTranspose = function(t, e) {
var i = e.m;
h = i[0];
f = i[1];
_ = i[2];
d = i[3];
p = i[4];
v = i[5];
g = i[6];
m = i[7];
y = i[8];
E = i[9];
T = i[10];
C = i[11];
A = i[12];
S = i[13];
x = i[14];
b = i[15];
var n = h * v - f * p, r = h * g - _ * p, s = h * m - d * p, a = f * g - _ * v, o = f * m - d * v, c = _ * m - d * g, u = y * S - E * A, l = y * x - T * A, R = y * b - C * A, w = E * x - T * S, O = E * b - C * S, I = T * b - C * x, D = n * I - r * O + s * w + a * R - o * l + c * u;
if (!D) return null;
D = 1 / D;
(i = t.m)[0] = (v * I - g * O + m * w) * D;
i[1] = (g * R - p * I - m * l) * D;
i[2] = (p * O - v * R + m * u) * D;
i[3] = 0;
i[4] = (_ * O - f * I - d * w) * D;
i[5] = (h * I - _ * R + d * l) * D;
i[6] = (f * R - h * O - d * u) * D;
i[7] = 0;
i[8] = (S * c - x * o + b * a) * D;
i[9] = (x * s - A * c - b * r) * D;
i[10] = (A * o - S * s + b * n) * D;
i[11] = 0;
i[12] = 0;
i[13] = 0;
i[14] = 0;
i[15] = 1;
return t;
};
i.add = function(t, e, i) {
var n = t.m, r = e.m, s = i.m;
n[0] = r[0] + s[0];
n[1] = r[1] + s[1];
n[2] = r[2] + s[2];
n[3] = r[3] + s[3];
n[4] = r[4] + s[4];
n[5] = r[5] + s[5];
n[6] = r[6] + s[6];
n[7] = r[7] + s[7];
n[8] = r[8] + s[8];
n[9] = r[9] + s[9];
n[10] = r[10] + s[10];
n[11] = r[11] + s[11];
n[12] = r[12] + s[12];
n[13] = r[13] + s[13];
n[14] = r[14] + s[14];
n[15] = r[15] + s[15];
return t;
};
i.subtract = function(t, e, i) {
var n = t.m, r = e.m, s = i.m;
n[0] = r[0] - s[0];
n[1] = r[1] - s[1];
n[2] = r[2] - s[2];
n[3] = r[3] - s[3];
n[4] = r[4] - s[4];
n[5] = r[5] - s[5];
n[6] = r[6] - s[6];
n[7] = r[7] - s[7];
n[8] = r[8] - s[8];
n[9] = r[9] - s[9];
n[10] = r[10] - s[10];
n[11] = r[11] - s[11];
n[12] = r[12] - s[12];
n[13] = r[13] - s[13];
n[14] = r[14] - s[14];
n[15] = r[15] - s[15];
return t;
};
i.multiplyScalar = function(t, e, i) {
var n = t.m, r = e.m;
n[0] = r[0] * i;
n[1] = r[1] * i;
n[2] = r[2] * i;
n[3] = r[3] * i;
n[4] = r[4] * i;
n[5] = r[5] * i;
n[6] = r[6] * i;
n[7] = r[7] * i;
n[8] = r[8] * i;
n[9] = r[9] * i;
n[10] = r[10] * i;
n[11] = r[11] * i;
n[12] = r[12] * i;
n[13] = r[13] * i;
n[14] = r[14] * i;
n[15] = r[15] * i;
return t;
};
i.multiplyScalarAndAdd = function(t, e, i, n) {
var r = t.m, s = e.m, a = i.m;
r[0] = s[0] + a[0] * n;
r[1] = s[1] + a[1] * n;
r[2] = s[2] + a[2] * n;
r[3] = s[3] + a[3] * n;
r[4] = s[4] + a[4] * n;
r[5] = s[5] + a[5] * n;
r[6] = s[6] + a[6] * n;
r[7] = s[7] + a[7] * n;
r[8] = s[8] + a[8] * n;
r[9] = s[9] + a[9] * n;
r[10] = s[10] + a[10] * n;
r[11] = s[11] + a[11] * n;
r[12] = s[12] + a[12] * n;
r[13] = s[13] + a[13] * n;
r[14] = s[14] + a[14] * n;
r[15] = s[15] + a[15] * n;
return t;
};
i.strictEquals = function(t, e) {
var i = t.m, n = e.m;
return i[0] === n[0] && i[1] === n[1] && i[2] === n[2] && i[3] === n[3] && i[4] === n[4] && i[5] === n[5] && i[6] === n[6] && i[7] === n[7] && i[8] === n[8] && i[9] === n[9] && i[10] === n[10] && i[11] === n[11] && i[12] === n[12] && i[13] === n[13] && i[14] === n[14] && i[15] === n[15];
};
i.equals = function(t, e, i) {
void 0 === i && (i = o.EPSILON);
var n = t.m, r = e.m;
return Math.abs(n[0] - r[0]) <= i * Math.max(1, Math.abs(n[0]), Math.abs(r[0])) && Math.abs(n[1] - r[1]) <= i * Math.max(1, Math.abs(n[1]), Math.abs(r[1])) && Math.abs(n[2] - r[2]) <= i * Math.max(1, Math.abs(n[2]), Math.abs(r[2])) && Math.abs(n[3] - r[3]) <= i * Math.max(1, Math.abs(n[3]), Math.abs(r[3])) && Math.abs(n[4] - r[4]) <= i * Math.max(1, Math.abs(n[4]), Math.abs(r[4])) && Math.abs(n[5] - r[5]) <= i * Math.max(1, Math.abs(n[5]), Math.abs(r[5])) && Math.abs(n[6] - r[6]) <= i * Math.max(1, Math.abs(n[6]), Math.abs(r[6])) && Math.abs(n[7] - r[7]) <= i * Math.max(1, Math.abs(n[7]), Math.abs(r[7])) && Math.abs(n[8] - r[8]) <= i * Math.max(1, Math.abs(n[8]), Math.abs(r[8])) && Math.abs(n[9] - r[9]) <= i * Math.max(1, Math.abs(n[9]), Math.abs(r[9])) && Math.abs(n[10] - r[10]) <= i * Math.max(1, Math.abs(n[10]), Math.abs(r[10])) && Math.abs(n[11] - r[11]) <= i * Math.max(1, Math.abs(n[11]), Math.abs(r[11])) && Math.abs(n[12] - r[12]) <= i * Math.max(1, Math.abs(n[12]), Math.abs(r[12])) && Math.abs(n[13] - r[13]) <= i * Math.max(1, Math.abs(n[13]), Math.abs(r[13])) && Math.abs(n[14] - r[14]) <= i * Math.max(1, Math.abs(n[14]), Math.abs(r[14])) && Math.abs(n[15] - r[15]) <= i * Math.max(1, Math.abs(n[15]), Math.abs(r[15]));
};
i.adjoint = function(t, e) {
var i = e.m, n = t.m, r = i[0], s = i[1], a = i[2], o = i[3], c = i[4], u = i[5], l = i[6], h = i[7], f = i[8], _ = i[9], d = i[10], p = i[11], v = i[12], g = i[13], m = i[14], y = i[15];
n[0] = u * (d * y - p * m) - _ * (l * y - h * m) + g * (l * p - h * d);
n[1] = -(s * (d * y - p * m) - _ * (a * y - o * m) + g * (a * p - o * d));
n[2] = s * (l * y - h * m) - u * (a * y - o * m) + g * (a * h - o * l);
n[3] = -(s * (l * p - h * d) - u * (a * p - o * d) + _ * (a * h - o * l));
n[4] = -(c * (d * y - p * m) - f * (l * y - h * m) + v * (l * p - h * d));
n[5] = r * (d * y - p * m) - f * (a * y - o * m) + v * (a * p - o * d);
n[6] = -(r * (l * y - h * m) - c * (a * y - o * m) + v * (a * h - o * l));
n[7] = r * (l * p - h * d) - c * (a * p - o * d) + f * (a * h - o * l);
n[8] = c * (_ * y - p * g) - f * (u * y - h * g) + v * (u * p - h * _);
n[9] = -(r * (_ * y - p * g) - f * (s * y - o * g) + v * (s * p - o * _));
n[10] = r * (u * y - h * g) - c * (s * y - o * g) + v * (s * h - o * u);
n[11] = -(r * (u * p - h * _) - c * (s * p - o * _) + f * (s * h - o * u));
n[12] = -(c * (_ * m - d * g) - f * (u * m - l * g) + v * (u * d - l * _));
n[13] = r * (_ * m - d * g) - f * (s * m - a * g) + v * (s * d - a * _);
n[14] = -(r * (u * m - l * g) - c * (s * m - a * g) + v * (s * l - a * u));
n[15] = r * (u * d - l * _) - c * (s * d - a * _) + f * (s * l - a * u);
return t;
};
i.toArray = function(t, e, i) {
void 0 === i && (i = 0);
for (var n = e.m, r = 0; r < 16; r++) t[i + r] = n[r];
return t;
};
i.fromArray = function(t, e, i) {
void 0 === i && (i = 0);
for (var n = t.m, r = 0; r < 16; r++) n[r] = e[i + r];
return t;
};
function i(e, i, n, r, s, a, c, u, l, h, f, _, d, p, v, g) {
var m;
void 0 === e && (e = 1);
void 0 === i && (i = 0);
void 0 === n && (n = 0);
void 0 === r && (r = 0);
void 0 === s && (s = 0);
void 0 === a && (a = 1);
void 0 === c && (c = 0);
void 0 === u && (u = 0);
void 0 === l && (l = 0);
void 0 === h && (h = 0);
void 0 === f && (f = 1);
void 0 === _ && (_ = 0);
void 0 === d && (d = 0);
void 0 === p && (p = 0);
void 0 === v && (v = 0);
void 0 === g && (g = 1);
(m = t.call(this) || this).m = void 0;
if (e instanceof o.FLOAT_ARRAY_TYPE) m.m = e; else {
m.m = new o.FLOAT_ARRAY_TYPE(16);
var y = m.m;
y[0] = e;
y[1] = i;
y[2] = n;
y[3] = r;
y[4] = s;
y[5] = a;
y[6] = c;
y[7] = u;
y[8] = l;
y[9] = h;
y[10] = f;
y[11] = _;
y[12] = d;
y[13] = p;
y[14] = v;
y[15] = g;
}
return m;
}
e.clone = function() {
var t = this.m;
return new i(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]);
};
e.set = function(t) {
var e = this.m, i = t.m;
e[0] = i[0];
e[1] = i[1];
e[2] = i[2];
e[3] = i[3];
e[4] = i[4];
e[5] = i[5];
e[6] = i[6];
e[7] = i[7];
e[8] = i[8];
e[9] = i[9];
e[10] = i[10];
e[11] = i[11];
e[12] = i[12];
e[13] = i[13];
e[14] = i[14];
e[15] = i[15];
return this;
};
e.equals = function(t) {
return i.strictEquals(this, t);
};
e.fuzzyEquals = function(t) {
return i.equals(this, t);
};
e.toString = function() {
var t = this.m;
return t ? "[\n" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ",\n" + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ",\n" + t[8] + ", " + t[9] + ", " + t[10] + ", " + t[11] + ",\n" + t[12] + ", " + t[13] + ", " + t[14] + ", " + t[15] + "\n]" : "[\n1, 0, 0, 0\n0, 1, 0, 0\n0, 0, 1, 0\n0, 0, 0, 1\n]";
};
e.identity = function() {
return i.identity(this);
};
e.transpose = function(t) {
t = t || new i();
return i.transpose(t, this);
};
e.invert = function(t) {
t = t || new i();
return i.invert(t, this);
};
e.adjoint = function(t) {
t = t || new i();
return i.adjoint(t, this);
};
e.determinant = function() {
return i.determinant(this);
};
e.add = function(t, e) {
e = e || new i();
return i.add(e, this, t);
};
e.subtract = function(t) {
return i.subtract(this, this, t);
};
e.multiply = function(t) {
return i.multiply(this, this, t);
};
e.multiplyScalar = function(t) {
return i.multiplyScalar(this, this, t);
};
e.translate = function(t, e) {
e = e || new i();
return i.translate(e, this, t);
};
e.scale = function(t, e) {
e = e || new i();
return i.scale(e, this, t);
};
e.rotate = function(t, e, n) {
n = n || new i();
return i.rotate(n, this, t, e);
};
e.getTranslation = function(t) {
t = t || new s.default();
return i.getTranslation(t, this);
};
e.getScale = function(t) {
t = t || new s.default();
return i.getScaling(t, this);
};
e.getRotation = function(t) {
t = t || new a.default();
return i.getRotation(t, this);
};
e.fromRTS = function(t, e, n) {
return i.fromRTS(this, t, e, n);
};
e.fromQuat = function(t) {
return i.fromQuat(this, t);
};
return i;
})(n.default);
i.default = R;
R.mul = R.multiply;
R.sub = R.subtract;
R.IDENTITY = Object.freeze(new R());
var w = new s.default(), O = new c.default();
r.default.fastDefine("cc.Mat4", R, {
m00: 1,
m01: 0,
m02: 0,
m03: 0,
m04: 0,
m05: 1,
m06: 0,
m07: 0,
m08: 0,
m09: 0,
m10: 1,
m11: 0,
m12: 0,
m13: 0,
m14: 0,
m15: 1
});
for (var I = function(t) {
Object.defineProperty(R.prototype, "m" + t, {
get: function() {
return this.m[t];
},
set: function(e) {
this.m[t] = e;
}
});
}, D = 0; D < 16; D++) I(D);
cc.mat4 = function(t, e, i, n, r, s, a, o, c, u, l, h, f, _, d, p) {
var v = new R(t, e, i, n, r, s, a, o, c, u, l, h, f, _, d, p);
void 0 === t && R.identity(v);
return v;
};
cc.Mat4 = R;
e.exports = i.default;
}), {
"../platform/CCClass": 128,
"./mat3": 212,
"./quat": 214,
"./utils": 218,
"./value-type": 219,
"./vec3": 221
} ],
214: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = c(t("./value-type")), r = c(t("../platform/CCClass")), s = c(t("./vec3")), a = c(t("./mat3")), o = t("./utils");
function c(t) {
return t && t.__esModule ? t : {
default: t
};
}
function u(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var l = 0, h = 0, f = 0, _ = 0, d = (function(t) {
u(i, t);
var e = i.prototype;
e.mul = function(t, e) {
return i.multiply(e || new i(), this, t);
};
i.clone = function(t) {
return new i(t.x, t.y, t.z, t.w);
};
i.copy = function(t, e) {
t.x = e.x;
t.y = e.y;
t.z = e.z;
t.w = e.w;
return t;
};
i.set = function(t, e, i, n, r) {
t.x = e;
t.y = i;
t.z = n;
t.w = r;
return t;
};
i.identity = function(t) {
t.x = 0;
t.y = 0;
t.z = 0;
t.w = 1;
return t;
};
i.rotationTo = function(t, e, n) {
var r = s.default.dot(e, n);
if (r < -.999999) {
s.default.cross(g, s.default.RIGHT, e);
g.mag() < 1e-6 && s.default.cross(g, s.default.UP, e);
s.default.normalize(g, g);
i.fromAxisAngle(t, g, Math.PI);
return t;
}
if (r > .999999) {
t.x = 0;
t.y = 0;
t.z = 0;
t.w = 1;
return t;
}
s.default.cross(g, e, n);
t.x = g.x;
t.y = g.y;
t.z = g.z;
t.w = 1 + r;
return i.normalize(t, t);
};
i.getAxisAngle = function(t, e) {
var i = 2 * Math.acos(e.w), n = Math.sin(i / 2);
if (0 !== n) {
t.x = e.x / n;
t.y = e.y / n;
t.z = e.z / n;
} else {
t.x = 1;
t.y = 0;
t.z = 0;
}
return i;
};
i.multiply = function(t, e, i) {
l = e.x * i.w + e.w * i.x + e.y * i.z - e.z * i.y;
h = e.y * i.w + e.w * i.y + e.z * i.x - e.x * i.z;
f = e.z * i.w + e.w * i.z + e.x * i.y - e.y * i.x;
_ = e.w * i.w - e.x * i.x - e.y * i.y - e.z * i.z;
t.x = l;
t.y = h;
t.z = f;
t.w = _;
return t;
};
i.multiplyScalar = function(t, e, i) {
t.x = e.x * i;
t.y = e.y * i;
t.z = e.z * i;
t.w = e.w * i;
return t;
};
i.scaleAndAdd = function(t, e, i, n) {
t.x = e.x + i.x * n;
t.y = e.y + i.y * n;
t.z = e.z + i.z * n;
t.w = e.w + i.w * n;
return t;
};
i.rotateX = function(t, e, i) {
i *= .5;
var n = Math.sin(i), r = Math.cos(i);
l = e.x * r + e.w * n;
h = e.y * r + e.z * n;
f = e.z * r - e.y * n;
_ = e.w * r - e.x * n;
t.x = l;
t.y = h;
t.z = f;
t.w = _;
return t;
};
i.rotateY = function(t, e, i) {
i *= .5;
var n = Math.sin(i), r = Math.cos(i);
l = e.x * r - e.z * n;
h = e.y * r + e.w * n;
f = e.z * r + e.x * n;
_ = e.w * r - e.y * n;
t.x = l;
t.y = h;
t.z = f;
t.w = _;
return t;
};
i.rotateZ = function(t, e, i) {
i *= .5;
var n = Math.sin(i), r = Math.cos(i);
l = e.x * r + e.y * n;
h = e.y * r - e.x * n;
f = e.z * r + e.w * n;
_ = e.w * r - e.z * n;
t.x = l;
t.y = h;
t.z = f;
t.w = _;
return t;
};
i.rotateAround = function(t, e, n, r) {
i.invert(p, e);
s.default.transformQuat(g, n, p);
i.fromAxisAngle(p, g, r);
i.multiply(t, e, p);
return t;
};
i.rotateAroundLocal = function(t, e, n, r) {
i.fromAxisAngle(p, n, r);
i.multiply(t, e, p);
return t;
};
i.calculateW = function(t, e) {
t.x = e.x;
t.y = e.y;
t.z = e.z;
t.w = Math.sqrt(Math.abs(1 - e.x * e.x - e.y * e.y - e.z * e.z));
return t;
};
i.dot = function(t, e) {
return t.x * e.x + t.y * e.y + t.z * e.z + t.w * e.w;
};
i.lerp = function(t, e, i, n) {
t.x = e.x + n * (i.x - e.x);
t.y = e.y + n * (i.y - e.y);
t.z = e.z + n * (i.z - e.z);
t.w = e.w + n * (i.w - e.w);
return t;
};
i.slerp = function(t, e, i, n) {
var r = 0, s = 0, a = e.x * i.x + e.y * i.y + e.z * i.z + e.w * i.w;
if (a < 0) {
a = -a;
i.x = -i.x;
i.y = -i.y;
i.z = -i.z;
i.w = -i.w;
}
if (1 - a > 1e-6) {
var o = Math.acos(a), c = Math.sin(o);
r = Math.sin((1 - n) * o) / c;
s = Math.sin(n * o) / c;
} else {
r = 1 - n;
s = n;
}
t.x = r * e.x + s * i.x;
t.y = r * e.y + s * i.y;
t.z = r * e.z + s * i.z;
t.w = r * e.w + s * i.w;
return t;
};
i.sqlerp = function(t, e, n, r, s, a) {
i.slerp(p, e, s, a);
i.slerp(v, n, r, a);
i.slerp(t, p, v, 2 * a * (1 - a));
return t;
};
i.invert = function(t, e) {
var i = e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w, n = i ? 1 / i : 0;
t.x = -e.x * n;
t.y = -e.y * n;
t.z = -e.z * n;
t.w = e.w * n;
return t;
};
i.conjugate = function(t, e) {
t.x = -e.x;
t.y = -e.y;
t.z = -e.z;
t.w = e.w;
return t;
};
i.len = function(t) {
return Math.sqrt(t.x * t.x + t.y * t.y + t.z * t.z + t.w * t.w);
};
i.lengthSqr = function(t) {
return t.x * t.x + t.y * t.y + t.z * t.z + t.w * t.w;
};
i.normalize = function(t, e) {
var i = e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w;
if (i > 0) {
i = 1 / Math.sqrt(i);
t.x = e.x * i;
t.y = e.y * i;
t.z = e.z * i;
t.w = e.w * i;
}
return t;
};
i.fromAxes = function(t, e, n, r) {
a.default.set(m, e.x, e.y, e.z, n.x, n.y, n.z, r.x, r.y, r.z);
return i.normalize(t, i.fromMat3(t, m));
};
i.fromViewUp = function(t, e, n) {
a.default.fromViewUp(m, e, n);
return i.normalize(t, i.fromMat3(t, m));
};
i.fromAxisAngle = function(t, e, i) {
i *= .5;
var n = Math.sin(i);
t.x = n * e.x;
t.y = n * e.y;
t.z = n * e.z;
t.w = Math.cos(i);
return t;
};
i.fromAngleZ = function(t, e) {
e *= y;
t.x = t.y = 0;
t.z = Math.sin(e);
t.w = Math.cos(e);
return t;
};
i.fromMat3 = function(t, e) {
var i = e.m, n = i[0], r = i[1], s = i[2], a = i[3], o = i[4], c = i[5], u = i[6], l = i[7], h = i[8], f = n + o + h;
if (f > 0) {
var _ = .5 / Math.sqrt(f + 1);
t.w = .25 / _;
t.x = (c - l) * _;
t.y = (u - s) * _;
t.z = (r - a) * _;
} else if (n > o && n > h) {
var d = 2 * Math.sqrt(1 + n - o - h);
t.w = (c - l) / d;
t.x = .25 * d;
t.y = (a + r) / d;
t.z = (u + s) / d;
} else if (o > h) {
var p = 2 * Math.sqrt(1 + o - n - h);
t.w = (u - s) / p;
t.x = (a + r) / p;
t.y = .25 * p;
t.z = (l + c) / p;
} else {
var v = 2 * Math.sqrt(1 + h - n - o);
t.w = (r - a) / v;
t.x = (u + s) / v;
t.y = (l + c) / v;
t.z = .25 * v;
}
return t;
};
i.fromEuler = function(t, e, i, n) {
e *= y;
i *= y;
n *= y;
var r = Math.sin(e), s = Math.cos(e), a = Math.sin(i), o = Math.cos(i), c = Math.sin(n), u = Math.cos(n);
t.x = r * o * u + s * a * c;
t.y = s * a * u + r * o * c;
t.z = s * o * c - r * a * u;
t.w = s * o * u - r * a * c;
return t;
};
i.toAxisX = function(t, e) {
var i = 2 * e.y, n = 2 * e.z;
t.x = 1 - i * e.y - n * e.z;
t.y = i * e.x + n * e.w;
t.z = n * e.x + i * e.w;
return t;
};
i.toAxisY = function(t, e) {
var i = 2 * e.x, n = 2 * e.y, r = 2 * e.z;
t.x = n * e.x - r * e.w;
t.y = 1 - i * e.x - r * e.z;
t.z = r * e.y + i * e.w;
return t;
};
i.toAxisZ = function(t, e) {
var i = 2 * e.x, n = 2 * e.y, r = 2 * e.z;
t.x = r * e.x - n * e.w;
t.y = r * e.y - i * e.w;
t.z = 1 - i * e.x - n * e.y;
return t;
};
i.toEuler = function(t, e, i) {
var n = e.x, r = e.y, s = e.z, a = e.w, c = 0, u = 0, l = 0, h = n * r + s * a;
if (h > .499999) {
c = 0;
u = (0, o.toDegree)(2 * Math.atan2(n, a));
l = 90;
} else if (h < -.499999) {
c = 0;
u = -(0, o.toDegree)(2 * Math.atan2(n, a));
l = -90;
} else {
var f = n * n, _ = r * r, d = s * s;
c = (0, o.toDegree)(Math.atan2(2 * n * a - 2 * r * s, 1 - 2 * f - 2 * d));
u = (0, o.toDegree)(Math.atan2(2 * r * a - 2 * n * s, 1 - 2 * _ - 2 * d));
l = (0, o.toDegree)(Math.asin(2 * h));
if (i) {
c = -180 * Math.sign(c + 1e-6) + c;
u = -180 * Math.sign(u + 1e-6) + u;
l = 180 * Math.sign(l + 1e-6) - l;
}
}
t.x = c;
t.y = u;
t.z = l;
return t;
};
i.strictEquals = function(t, e) {
return t.x === e.x && t.y === e.y && t.z === e.z && t.w === e.w;
};
i.equals = function(t, e, i) {
void 0 === i && (i = o.EPSILON);
return Math.abs(t.x - e.x) <= i * Math.max(1, Math.abs(t.x), Math.abs(e.x)) && Math.abs(t.y - e.y) <= i * Math.max(1, Math.abs(t.y), Math.abs(e.y)) && Math.abs(t.z - e.z) <= i * Math.max(1, Math.abs(t.z), Math.abs(e.z)) && Math.abs(t.w - e.w) <= i * Math.max(1, Math.abs(t.w), Math.abs(e.w));
};
i.toArray = function(t, e, i) {
void 0 === i && (i = 0);
t[i + 0] = e.x;
t[i + 1] = e.y;
t[i + 2] = e.z;
t[i + 3] = e.w;
return t;
};
i.fromArray = function(t, e, i) {
void 0 === i && (i = 0);
t.x = e[i + 0];
t.y = e[i + 1];
t.z = e[i + 2];
t.w = e[i + 3];
return t;
};
function i(e, i, n, r) {
var s;
void 0 === e && (e = 0);
void 0 === i && (i = 0);
void 0 === n && (n = 0);
void 0 === r && (r = 1);
(s = t.call(this) || this).x = void 0;
s.y = void 0;
s.z = void 0;
s.w = void 0;
if (e && "object" == typeof e) {
s.x = e.x;
s.y = e.y;
s.z = e.z;
s.w = e.w;
} else {
s.x = e;
s.y = i;
s.z = n;
s.w = r;
}
return s;
}
e.clone = function() {
return new i(this.x, this.y, this.z, this.w);
};
e.set = function(t) {
this.x = t.x;
this.y = t.y;
this.z = t.z;
this.w = t.w;
return this;
};
e.equals = function(t) {
return t && this.x === t.x && this.y === t.y && this.z === t.z && this.w === t.w;
};
e.toEuler = function(t) {
return i.toEuler(t, this);
};
e.fromEuler = function(t) {
return i.fromEuler(this, t.x, t.y, t.z);
};
e.lerp = function(t, e, n) {
n = n || new i();
i.slerp(n, this, t, e);
return n;
};
e.multiply = function(t) {
return i.multiply(this, this, t);
};
e.rotateAround = function(t, e, n, r) {
r = r || new i();
return i.rotateAround(r, t, e, n);
};
return i;
})(n.default);
i.default = d;
d.mul = d.multiply;
d.scale = d.multiplyScalar;
d.mag = d.len;
d.IDENTITY = Object.freeze(new d());
var p = new d(), v = new d(), g = new s.default(), m = new a.default(), y = .5 * Math.PI / 180;
r.default.fastDefine("cc.Quat", d, {
x: 0,
y: 0,
z: 0,
w: 1
});
cc.quat = function(t, e, i, n) {
return new d(t, e, i, n);
};
cc.Quat = d;
e.exports = i.default;
}), {
"../platform/CCClass": 128,
"./mat3": 212,
"./utils": 218,
"./value-type": 219,
"./vec3": 221
} ],
215: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = o(t("./value-type")), r = o(t("../platform/CCClass")), s = o(t("./vec2")), a = o(t("./size"));
function o(t) {
return t && t.__esModule ? t : {
default: t
};
}
function c(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function u(t, e, i) {
e && c(t.prototype, e);
i && c(t, i);
return t;
}
function l(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var h = (function(t) {
l(e, t);
e.fromMinMax = function(t, i) {
var n = Math.min(t.x, i.x), r = Math.min(t.y, i.y);
return new e(n, r, Math.max(t.x, i.x) - n, Math.max(t.y, i.y) - r);
};
function e(e, i, n, r) {
var s;
void 0 === e && (e = 0);
void 0 === i && (i = 0);
void 0 === n && (n = 0);
void 0 === r && (r = 0);
(s = t.call(this) || this).x = void 0;
s.y = void 0;
s.width = void 0;
s.height = void 0;
if (e && "object" == typeof e) {
i = e.y;
n = e.width;
r = e.height;
e = e.x;
}
s.x = e || 0;
s.y = i || 0;
s.width = n || 0;
s.height = r || 0;
return s;
}
var i = e.prototype;
i.clone = function() {
return new e(this.x, this.y, this.width, this.height);
};
i.equals = function(t) {
return t && this.x === t.x && this.y === t.y && this.width === t.width && this.height === t.height;
};
i.lerp = function(t, i, n) {
n = n || new e();
var r = this.x, s = this.y, a = this.width, o = this.height;
n.x = r + (t.x - r) * i;
n.y = s + (t.y - s) * i;
n.width = a + (t.width - a) * i;
n.height = o + (t.height - o) * i;
return n;
};
i.set = function(t) {
this.x = t.x;
this.y = t.y;
this.width = t.width;
this.height = t.height;
return this;
};
i.intersects = function(t) {
var e = this.x + this.width, i = this.y + this.height, n = t.x + t.width, r = t.y + t.height;
return !(e < t.x || n < this.x || i < t.y || r < this.y);
};
i.intersection = function(t, e) {
var i = this.x, n = this.y, r = this.x + this.width, s = this.y + this.height, a = e.x, o = e.y, c = e.x + e.width, u = e.y + e.height;
t.x = Math.max(i, a);
t.y = Math.max(n, o);
t.width = Math.min(r, c) - t.x;
t.height = Math.min(s, u) - t.y;
return t;
};
i.contains = function(t) {
return this.x <= t.x && this.x + this.width >= t.x && this.y <= t.y && this.y + this.height >= t.y;
};
i.containsRect = function(t) {
return this.x <= t.x && this.x + this.width >= t.x + t.width && this.y <= t.y && this.y + this.height >= t.y + t.height;
};
i.union = function(t, e) {
var i = this.x, n = this.y, r = this.width, s = this.height, a = e.x, o = e.y, c = e.width, u = e.height;
t.x = Math.min(i, a);
t.y = Math.min(n, o);
t.width = Math.max(i + r, a + c) - t.x;
t.height = Math.max(n + s, o + u) - t.y;
return t;
};
i.transformMat4 = function(t, e) {
var i = this.x, n = this.y, r = i + this.width, s = n + this.height, a = e.m, o = a[0] * i + a[4] * n + a[12], c = a[1] * i + a[5] * n + a[13], u = a[0] * r + a[4] * n + a[12], l = a[1] * r + a[5] * n + a[13], h = a[0] * i + a[4] * s + a[12], f = a[1] * i + a[5] * s + a[13], _ = a[0] * r + a[4] * s + a[12], d = a[1] * r + a[5] * s + a[13], p = Math.min(o, u, h, _), v = Math.max(o, u, h, _), g = Math.min(c, l, f, d), m = Math.max(c, l, f, d);
t.x = p;
t.y = g;
t.width = v - p;
t.height = m - g;
return t;
};
i.toString = function() {
return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ", " + this.width.toFixed(2) + ", " + this.height.toFixed(2) + ")";
};
u(e, [ {
key: "xMin",
get: function() {
return this.x;
},
set: function(t) {
this.width += this.x - t;
this.x = t;
}
}, {
key: "yMin",
get: function() {
return this.y;
},
set: function(t) {
this.height += this.y - t;
this.y = t;
}
}, {
key: "xMax",
get: function() {
return this.x + this.width;
},
set: function(t) {
this.width = t - this.x;
}
}, {
key: "yMax",
get: function() {
return this.y + this.height;
},
set: function(t) {
this.height = t - this.y;
}
}, {
key: "center",
get: function() {
return new s.default(this.x + .5 * this.width, this.y + .5 * this.height);
},
set: function(t) {
this.x = t.x - .5 * this.width;
this.y = t.y - .5 * this.height;
}
}, {
key: "origin",
get: function() {
return new s.default(this.x, this.y);
},
set: function(t) {
this.x = t.x;
this.y = t.y;
}
}, {
key: "size",
get: function() {
return new a.default(this.width, this.height);
},
set: function(t) {
this.width = t.width;
this.height = t.height;
}
} ]);
return e;
})(n.default);
i.default = h;
r.default.fastDefine("cc.Rect", h, {
x: 0,
y: 0,
width: 0,
height: 0
});
cc.Rect = h;
cc.rect = function(t, e, i, n) {
return new h(t, e, i, n);
};
e.exports = i.default;
}), {
"../platform/CCClass": 128,
"./size": 216,
"./value-type": 219,
"./vec2": 220
} ],
216: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = s(t("./value-type")), r = s(t("../platform/CCClass"));
function s(t) {
return t && t.__esModule ? t : {
default: t
};
}
function a(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function o(t, e, i) {
e && a(t.prototype, e);
i && a(t, i);
return t;
}
function c(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var u = (function(t) {
c(e, t);
o(e, null, [ {
key: "ZERO",
get: function() {
return new e();
}
} ]);
function e(e, i) {
var n;
void 0 === e && (e = 0);
void 0 === i && (i = 0);
(n = t.call(this) || this).width = void 0;
n.height = void 0;
if (e && "object" == typeof e) {
n.width = e.width;
n.height = e.height;
} else {
n.width = e || 0;
n.height = i || 0;
}
return n;
}
var i = e.prototype;
i.clone = function() {
return new e(this.width, this.height);
};
i.equals = function(t) {
return t && this.width === t.width && this.height === t.height;
};
i.lerp = function(t, i, n) {
n = n || new e();
var r = this.width, s = this.height;
n.width = r + (t.width - r) * i;
n.height = s + (t.height - s) * i;
return n;
};
i.set = function(t) {
this.width = t.width;
this.height = t.height;
return this;
};
i.toString = function() {
return "(" + this.width.toFixed(2) + ", " + this.height.toFixed(2) + ")";
};
return e;
})(n.default);
i.default = u;
u.ZERO_R = u.ZERO;
r.default.fastDefine("cc.Size", u, {
width: 0,
height: 0
});
cc.size = function(t, e) {
return new u(t, e);
};
cc.Size = u;
e.exports = i.default;
}), {
"../platform/CCClass": 128,
"./value-type": 219
} ],
217: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n, r = (n = t("./quat")) && n.__esModule ? n : {
default: n
}, s = new r.default(), a = (function() {
function t() {}
t.toRotation = function(t, e) {
t.x = e[3];
t.y = e[4];
t.z = e[5];
t.w = e[6];
return t;
};
t.fromRotation = function(t, e) {
t[3] = e.x;
t[4] = e.y;
t[5] = e.z;
t[6] = e.w;
return t;
};
t.toEuler = function(e, i) {
t.toRotation(s, i);
r.default.toEuler(e, s);
return e;
};
t.fromEuler = function(e, i) {
r.default.fromEuler(s, i.x, i.y, i.z);
t.fromRotation(e, s);
return e;
};
t.fromEulerNumber = function(e, i, n, a) {
r.default.fromEuler(s, i, n, a);
t.fromRotation(e, s);
return e;
};
t.toScale = function(t, e) {
t.x = e[7];
t.y = e[8];
t.z = e[9];
return t;
};
t.fromScale = function(t, e) {
t[7] = e.x;
t[8] = e.y;
t[9] = e.z;
return t;
};
t.toPosition = function(t, e) {
t.x = e[0];
t.y = e[1];
t.z = e[2];
return t;
};
t.fromPosition = function(t, e) {
t[0] = e.x;
t[1] = e.y;
t[2] = e.z;
return t;
};
t.fromAngleZ = function(e, i) {
r.default.fromAngleZ(s, i);
t.fromRotation(e, s);
return e;
};
t.toMat4 = function(t, e) {
var i = e[3], n = e[4], r = e[5], s = e[6], a = i + i, o = n + n, c = r + r, u = i * a, l = i * o, h = i * c, f = n * o, _ = n * c, d = r * c, p = s * a, v = s * o, g = s * c, m = e[7], y = e[8], E = e[9], T = t.m;
T[0] = (1 - (f + d)) * m;
T[1] = (l + g) * m;
T[2] = (h - v) * m;
T[3] = 0;
T[4] = (l - g) * y;
T[5] = (1 - (u + d)) * y;
T[6] = (_ + p) * y;
T[7] = 0;
T[8] = (h + v) * E;
T[9] = (_ - p) * E;
T[10] = (1 - (u + f)) * E;
T[11] = 0;
T[12] = e[0];
T[13] = e[1];
T[14] = e[2];
T[15] = 1;
return t;
};
return t;
})();
i.default = a;
cc.Trs = a;
e.exports = i.default;
}), {
"./quat": 214
} ],
218: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.equals = function(t, e) {
return Math.abs(t - e) <= s * Math.max(1, Math.abs(t), Math.abs(e));
};
i.approx = function(t, e, i) {
i = i || s;
return Math.abs(t - e) <= i;
};
i.clamp = function(t, e, i) {
return t < e ? e : t > i ? i : t;
};
i.clamp01 = function(t) {
return t < 0 ? 0 : t > 1 ? 1 : t;
};
i.lerp = function(t, e, i) {
return t + (e - t) * i;
};
i.toRadian = function(t) {
return t * n;
};
i.toDegree = function(t) {
return t * r;
};
i.randomRange = c;
i.randomRangeInt = function(t, e) {
return Math.floor(c(t, e));
};
i.pseudoRandom = u;
i.pseudoRandomRange = l;
i.pseudoRandomRangeInt = function(t, e, i) {
return Math.floor(l(t, e, i));
};
i.nextPow2 = function(t) {
t = (t = (t = (t = (t = --t >> 1 | t) >> 2 | t) >> 4 | t) >> 8 | t) >> 16 | t;
return ++t;
};
i.repeat = h;
i.pingPong = function(t, e) {
t = h(t, 2 * e);
return e - Math.abs(t - e);
};
i.inverseLerp = function(t, e, i) {
return (i - t) / (e - t);
};
i.sign = function(t) {
return (t > 0) - (t < 0);
};
i.random = i.FLOAT_BYTES = i.FLOAT_ARRAY_TYPE = i.INT_MIN = i.INT_MAX = i.INT_BITS = i.EPSILON = void 0;
var n = Math.PI / 180, r = 180 / Math.PI, s = 1e-6;
i.EPSILON = s;
i.INT_BITS = 32;
i.INT_MAX = 2147483647;
i.INT_MIN = -1 << 31;
var a = Float32Array;
i.FLOAT_ARRAY_TYPE = a;
i.FLOAT_BYTES = 4;
var o = Math.random;
i.random = o;
function c(t, e) {
return Math.random() * (e - t) + t;
}
function u(t) {
return (t = (9301 * t + 49297) % 233280) / 233280;
}
function l(t, e, i) {
return u(t) * (i - e) + e;
}
function h(t, e) {
return t - Math.floor(t / e) * e;
}
}), {} ],
219: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n, r = (n = t("../platform/js")) && n.__esModule ? n : {
default: n
}, s = (function() {
function t() {}
var e = t.prototype;
e.clone = function() {
cc.errorID("0100", r.default.getClassName(this) + ".clone");
return null;
};
e.equals = function() {
cc.errorID("0100", r.default.getClassName(this) + ".equals");
return !1;
};
e.lerp = function() {
cc.errorID("0100", r.default.getClassName(this) + ".lerp");
return this.clone();
};
e.set = function() {
cc.errorID("0100", r.default.getClassName(this) + ".set");
};
e.toString = function() {
return "" + {};
};
return t;
})();
i.default = s;
r.default.setClassName("cc.ValueType", s);
cc.ValueType = s;
e.exports = i.default;
}), {
"../platform/js": 149
} ],
220: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = o(t("./value-type")), r = o(t("../platform/CCClass")), s = o(t("../utils/misc")), a = t("./utils");
function o(t) {
return t && t.__esModule ? t : {
default: t
};
}
function c(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function u(t, e, i) {
e && c(t.prototype, e);
i && c(t, i);
return t;
}
function l(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var h = 0, f = 0, _ = (function(t) {
l(i, t);
var e = i.prototype;
e.sub = function(t, e) {
return i.subtract(e || new i(), this, t);
};
e.mul = function(t, e) {
return i.multiplyScalar(e || new i(), this, t);
};
e.div = function(t, e) {
return i.multiplyScalar(e || new i(), this, 1 / t);
};
e.scale = function(t, e) {
return i.multiply(e || new i(), this, t);
};
e.neg = function(t) {
return i.negate(t || new i(), this);
};
i.clone = function(t) {
return new i(t.x, t.y);
};
i.copy = function(t, e) {
t.x = e.x;
t.y = e.y;
return t;
};
i.set = function(t, e, i) {
t.x = e;
t.y = i;
return t;
};
i.add = function(t, e, i) {
t.x = e.x + i.x;
t.y = e.y + i.y;
return t;
};
i.subtract = function(t, e, i) {
t.x = e.x - i.x;
t.y = e.y - i.y;
return t;
};
i.multiply = function(t, e, i) {
t.x = e.x * i.x;
t.y = e.y * i.y;
return t;
};
i.divide = function(t, e, i) {
t.x = e.x / i.x;
t.y = e.y / i.y;
return t;
};
i.ceil = function(t, e) {
t.x = Math.ceil(e.x);
t.y = Math.ceil(e.y);
return t;
};
i.floor = function(t, e) {
t.x = Math.floor(e.x);
t.y = Math.floor(e.y);
return t;
};
i.min = function(t, e, i) {
t.x = Math.min(e.x, i.x);
t.y = Math.min(e.y, i.y);
return t;
};
i.max = function(t, e, i) {
t.x = Math.max(e.x, i.x);
t.y = Math.max(e.y, i.y);
return t;
};
i.round = function(t, e) {
t.x = Math.round(e.x);
t.y = Math.round(e.y);
return t;
};
i.multiplyScalar = function(t, e, i) {
t.x = e.x * i;
t.y = e.y * i;
return t;
};
i.scaleAndAdd = function(t, e, i, n) {
t.x = e.x + i.x * n;
t.y = e.y + i.y * n;
return t;
};
i.distance = function(t, e) {
h = e.x - t.x;
f = e.y - t.y;
return Math.sqrt(h * h + f * f);
};
i.squaredDistance = function(t, e) {
h = e.x - t.x;
f = e.y - t.y;
return h * h + f * f;
};
i.len = function(t) {
h = t.x;
f = t.y;
return Math.sqrt(h * h + f * f);
};
i.lengthSqr = function(t) {
h = t.x;
f = t.y;
return h * h + f * f;
};
i.negate = function(t, e) {
t.x = -e.x;
t.y = -e.y;
return t;
};
i.inverse = function(t, e) {
t.x = 1 / e.x;
t.y = 1 / e.y;
return t;
};
i.inverseSafe = function(t, e) {
h = e.x;
f = e.y;
Math.abs(h) < a.EPSILON ? t.x = 0 : t.x = 1 / h;
Math.abs(f) < a.EPSILON ? t.y = 0 : t.y = 1 / f;
return t;
};
i.normalize = function(t, e) {
h = e.x;
f = e.y;
var i = h * h + f * f;
if (i > 0) {
i = 1 / Math.sqrt(i);
t.x = h * i;
t.y = f * i;
}
return t;
};
i.dot = function(t, e) {
return t.x * e.x + t.y * e.y;
};
i.cross = function(t, e, i) {
t.x = t.y = 0;
t.z = e.x * i.y - e.y * i.x;
return t;
};
i.lerp = function(t, e, i, n) {
h = e.x;
f = e.y;
t.x = h + n * (i.x - h);
t.y = f + n * (i.y - f);
return t;
};
i.random = function(t, e) {
e = e || 1;
var i = 2 * (0, a.random)() * Math.PI;
t.x = Math.cos(i) * e;
t.y = Math.sin(i) * e;
return t;
};
i.transformMat3 = function(t, e, i) {
h = e.x;
f = e.y;
var n = i.m;
t.x = n[0] * h + n[3] * f + n[6];
t.y = n[1] * h + n[4] * f + n[7];
return t;
};
i.transformMat4 = function(t, e, i) {
h = e.x;
f = e.y;
var n = i.m;
t.x = n[0] * h + n[4] * f + n[12];
t.y = n[1] * h + n[5] * f + n[13];
return t;
};
i.strictEquals = function(t, e) {
return t.x === e.x && t.y === e.y;
};
i.equals = function(t, e, i) {
void 0 === i && (i = a.EPSILON);
return Math.abs(t.x - e.x) <= i * Math.max(1, Math.abs(t.x), Math.abs(e.x)) && Math.abs(t.y - e.y) <= i * Math.max(1, Math.abs(t.y), Math.abs(e.y));
};
i.angle = function(t, e) {
i.normalize(d, t);
i.normalize(p, e);
var n = i.dot(d, p);
return n > 1 ? 0 : n < -1 ? Math.PI : Math.acos(n);
};
i.toArray = function(t, e, i) {
void 0 === i && (i = 0);
t[i + 0] = e.x;
t[i + 1] = e.y;
return t;
};
i.fromArray = function(t, e, i) {
void 0 === i && (i = 0);
t.x = e[i + 0];
t.y = e[i + 1];
return t;
};
u(i, null, [ {
key: "ONE",
get: function() {
return new i(1, 1);
}
}, {
key: "ZERO",
get: function() {
return new i(0, 0);
}
}, {
key: "UP",
get: function() {
return new i(0, 1);
}
}, {
key: "RIGHT",
get: function() {
return new i(1, 0);
}
} ]);
function i(e, n) {
var r;
void 0 === e && (e = 0);
void 0 === n && (n = 0);
(r = t.call(this) || this).mag = i.prototype.len;
r.magSqr = i.prototype.lengthSqr;
r.subSelf = i.prototype.subtract;
r.mulSelf = i.prototype.multiplyScalar;
r.divSelf = i.prototype.divide;
r.scaleSelf = i.prototype.multiply;
r.negSelf = i.prototype.negate;
r.x = void 0;
r.y = void 0;
r.z = 0;
if (e && "object" == typeof e) {
r.x = e.x || 0;
r.y = e.y || 0;
} else {
r.x = e || 0;
r.y = n || 0;
}
return r;
}
e.clone = function() {
return new i(this.x, this.y);
};
e.set = function(t) {
this.x = t.x;
this.y = t.y;
return this;
};
e.equals = function(t) {
return t && this.x === t.x && this.y === t.y;
};
e.fuzzyEquals = function(t, e) {
return this.x - e <= t.x && t.x <= this.x + e && this.y - e <= t.y && t.y <= this.y + e;
};
e.toString = function() {
return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ")";
};
e.lerp = function(t, e, n) {
n = n || new i();
var r = this.x, s = this.y;
n.x = r + (t.x - r) * e;
n.y = s + (t.y - s) * e;
return n;
};
e.clampf = function(t, e) {
this.x = s.default.clampf(this.x, t.x, e.x);
this.y = s.default.clampf(this.y, t.y, e.y);
return this;
};
e.add = function(t, e) {
(e = e || new i()).x = this.x + t.x;
e.y = this.y + t.y;
return e;
};
e.addSelf = function(t) {
this.x += t.x;
this.y += t.y;
return this;
};
e.subtract = function(t) {
this.x -= t.x;
this.y -= t.y;
return this;
};
e.multiplyScalar = function(t) {
this.x *= t;
this.y *= t;
return this;
};
e.multiply = function(t) {
this.x *= t.x;
this.y *= t.y;
return this;
};
e.divide = function(t) {
this.x /= t;
this.y /= t;
return this;
};
e.negate = function() {
this.x = -this.x;
this.y = -this.y;
return this;
};
e.dot = function(t) {
return this.x * t.x + this.y * t.y;
};
e.cross = function(t) {
return this.x * t.y - this.y * t.x;
};
e.len = function() {
return Math.sqrt(this.x * this.x + this.y * this.y);
};
e.lengthSqr = function() {
return this.x * this.x + this.y * this.y;
};
e.normalizeSelf = function() {
var t = this.x * this.x + this.y * this.y;
if (1 === t) return this;
if (0 === t) return this;
var e = 1 / Math.sqrt(t);
this.x *= e;
this.y *= e;
return this;
};
e.normalize = function(t) {
(t = t || new i()).x = this.x;
t.y = this.y;
t.normalizeSelf();
return t;
};
e.angle = function(t) {
var e = this.magSqr(), i = t.magSqr();
if (0 === e || 0 === i) {
console.warn("Can't get angle between zero vector");
return 0;
}
var n = this.dot(t) / Math.sqrt(e * i);
n = s.default.clampf(n, -1, 1);
return Math.acos(n);
};
e.signAngle = function(t) {
var e = this.angle(t);
return this.cross(t) < 0 ? -e : e;
};
e.rotate = function(t, e) {
(e = e || new i()).x = this.x;
e.y = this.y;
return e.rotateSelf(t);
};
e.rotateSelf = function(t) {
var e = Math.sin(t), i = Math.cos(t), n = this.x;
this.x = i * n - e * this.y;
this.y = e * n + i * this.y;
return this;
};
e.project = function(t) {
return t.multiplyScalar(this.dot(t) / t.dot(t));
};
e.transformMat4 = function(t, e) {
e = e || new i();
i.transformMat4(e, this, t);
return e;
};
e.maxAxis = function() {
return Math.max(this.x, this.y);
};
return i;
})(n.default);
i.default = _;
_.sub = _.subtract;
_.mul = _.multiply;
_.scale = _.multiplyScalar;
_.mag = _.len;
_.squaredMagnitude = _.lengthSqr;
_.div = _.divide;
_.ONE_R = _.ONE;
_.ZERO_R = _.ZERO;
_.UP_R = _.UP;
_.RIGHT_R = _.RIGHT;
var d = new _(), p = new _();
r.default.fastDefine("cc.Vec2", _, {
x: 0,
y: 0
});
cc.v2 = function(t, e) {
return new _(t, e);
};
cc.Vec2 = _;
e.exports = i.default;
}), {
"../platform/CCClass": 128,
"../utils/misc": 196,
"./utils": 218,
"./value-type": 219
} ],
221: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = c(t("./value-type")), r = c(t("../platform/CCClass")), s = c(t("../utils/misc")), a = c(t("./vec2")), o = t("./utils");
function c(t) {
return t && t.__esModule ? t : {
default: t
};
}
function u(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function l(t, e, i) {
e && u(t.prototype, e);
i && u(t, i);
return t;
}
function h(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var f = 0, _ = 0, d = 0, p = (function(t) {
h(i, t);
var e = i.prototype;
e.sub = function(t, e) {
return i.subtract(e || new i(), this, t);
};
e.mul = function(t, e) {
return i.multiplyScalar(e || new i(), this, t);
};
e.div = function(t, e) {
return i.multiplyScalar(e || new i(), this, 1 / t);
};
e.scale = function(t, e) {
return i.multiply(e || new i(), this, t);
};
e.neg = function(t) {
return i.negate(t || new i(), this);
};
i.zero = function(t) {
t.x = 0;
t.y = 0;
t.z = 0;
return t;
};
i.clone = function(t) {
return new i(t.x, t.y, t.z);
};
i.copy = function(t, e) {
t.x = e.x;
t.y = e.y;
t.z = e.z;
return t;
};
i.set = function(t, e, i, n) {
t.x = e;
t.y = i;
t.z = n;
return t;
};
i.add = function(t, e, i) {
t.x = e.x + i.x;
t.y = e.y + i.y;
t.z = e.z + i.z;
return t;
};
i.subtract = function(t, e, i) {
t.x = e.x - i.x;
t.y = e.y - i.y;
t.z = e.z - i.z;
return t;
};
i.multiply = function(t, e, i) {
t.x = e.x * i.x;
t.y = e.y * i.y;
t.z = e.z * i.z;
return t;
};
i.divide = function(t, e, i) {
t.x = e.x / i.x;
t.y = e.y / i.y;
t.z = e.z / i.z;
return t;
};
i.ceil = function(t, e) {
t.x = Math.ceil(e.x);
t.y = Math.ceil(e.y);
t.z = Math.ceil(e.z);
return t;
};
i.floor = function(t, e) {
t.x = Math.floor(e.x);
t.y = Math.floor(e.y);
t.z = Math.floor(e.z);
return t;
};
i.min = function(t, e, i) {
t.x = Math.min(e.x, i.x);
t.y = Math.min(e.y, i.y);
t.z = Math.min(e.z, i.z);
return t;
};
i.max = function(t, e, i) {
t.x = Math.max(e.x, i.x);
t.y = Math.max(e.y, i.y);
t.z = Math.max(e.z, i.z);
return t;
};
i.round = function(t, e) {
t.x = Math.round(e.x);
t.y = Math.round(e.y);
t.z = Math.round(e.z);
return t;
};
i.multiplyScalar = function(t, e, i) {
t.x = e.x * i;
t.y = e.y * i;
t.z = e.z * i;
return t;
};
i.scaleAndAdd = function(t, e, i, n) {
t.x = e.x + i.x * n;
t.y = e.y + i.y * n;
t.z = e.z + i.z * n;
return t;
};
i.distance = function(t, e) {
f = e.x - t.x;
_ = e.y - t.y;
d = e.z - t.z;
return Math.sqrt(f * f + _ * _ + d * d);
};
i.squaredDistance = function(t, e) {
f = e.x - t.x;
_ = e.y - t.y;
d = e.z - t.z;
return f * f + _ * _ + d * d;
};
i.len = function(t) {
f = t.x;
_ = t.y;
d = t.z;
return Math.sqrt(f * f + _ * _ + d * d);
};
i.lengthSqr = function(t) {
f = t.x;
_ = t.y;
d = t.z;
return f * f + _ * _ + d * d;
};
i.negate = function(t, e) {
t.x = -e.x;
t.y = -e.y;
t.z = -e.z;
return t;
};
i.inverse = function(t, e) {
t.x = 1 / e.x;
t.y = 1 / e.y;
t.z = 1 / e.z;
return t;
};
i.inverseSafe = function(t, e) {
f = e.x;
_ = e.y;
d = e.z;
Math.abs(f) < o.EPSILON ? t.x = 0 : t.x = 1 / f;
Math.abs(_) < o.EPSILON ? t.y = 0 : t.y = 1 / _;
Math.abs(d) < o.EPSILON ? t.z = 0 : t.z = 1 / d;
return t;
};
i.normalize = function(t, e) {
f = e.x;
_ = e.y;
d = e.z;
var i = f * f + _ * _ + d * d;
if (i > 0) {
i = 1 / Math.sqrt(i);
t.x = f * i;
t.y = _ * i;
t.z = d * i;
}
return t;
};
i.dot = function(t, e) {
return t.x * e.x + t.y * e.y + t.z * e.z;
};
i.cross = function(t, e, i) {
var n = e.x, r = e.y, s = e.z, a = i.x, o = i.y, c = i.z;
t.x = r * c - s * o;
t.y = s * a - n * c;
t.z = n * o - r * a;
return t;
};
i.lerp = function(t, e, i, n) {
t.x = e.x + n * (i.x - e.x);
t.y = e.y + n * (i.y - e.y);
t.z = e.z + n * (i.z - e.z);
return t;
};
i.random = function(t, e) {
e = e || 1;
var i = 2 * (0, o.random)() * Math.PI, n = 2 * (0, o.random)() - 1, r = Math.sqrt(1 - n * n);
t.x = r * Math.cos(i) * e;
t.y = r * Math.sin(i) * e;
t.z = n * e;
return t;
};
i.transformMat4 = function(t, e, i) {
f = e.x;
_ = e.y;
d = e.z;
var n = i.m, r = n[3] * f + n[7] * _ + n[11] * d + n[15];
r = r ? 1 / r : 1;
t.x = (n[0] * f + n[4] * _ + n[8] * d + n[12]) * r;
t.y = (n[1] * f + n[5] * _ + n[9] * d + n[13]) * r;
t.z = (n[2] * f + n[6] * _ + n[10] * d + n[14]) * r;
return t;
};
i.transformMat4Normal = function(t, e, i) {
f = e.x;
_ = e.y;
d = e.z;
var n = i.m, r = n[3] * f + n[7] * _ + n[11] * d;
r = r ? 1 / r : 1;
t.x = (n[0] * f + n[4] * _ + n[8] * d) * r;
t.y = (n[1] * f + n[5] * _ + n[9] * d) * r;
t.z = (n[2] * f + n[6] * _ + n[10] * d) * r;
return t;
};
i.transformMat3 = function(t, e, i) {
f = e.x;
_ = e.y;
d = e.z;
var n = i.m;
t.x = f * n[0] + _ * n[3] + d * n[6];
t.y = f * n[1] + _ * n[4] + d * n[7];
t.z = f * n[2] + _ * n[5] + d * n[8];
return t;
};
i.transformAffine = function(t, e, i) {
f = e.x;
_ = e.y;
d = e.z;
var n = i.m;
t.x = n[0] * f + n[1] * _ + n[2] * d + n[3];
t.y = n[4] * f + n[5] * _ + n[6] * d + n[7];
t.x = n[8] * f + n[9] * _ + n[10] * d + n[11];
return t;
};
i.transformQuat = function(t, e, i) {
var n = i.w * e.x + i.y * e.z - i.z * e.y, r = i.w * e.y + i.z * e.x - i.x * e.z, s = i.w * e.z + i.x * e.y - i.y * e.x, a = -i.x * e.x - i.y * e.y - i.z * e.z;
t.x = n * i.w + a * -i.x + r * -i.z - s * -i.y;
t.y = r * i.w + a * -i.y + s * -i.x - n * -i.z;
t.z = s * i.w + a * -i.z + n * -i.y - r * -i.x;
return t;
};
i.transformRTS = function(t, e, i, n, r) {
var s = e.x * r.x, a = e.y * r.y, o = e.z * r.z, c = i.w * s + i.y * o - i.z * a, u = i.w * a + i.z * s - i.x * o, l = i.w * o + i.x * a - i.y * s, h = -i.x * s - i.y * a - i.z * o;
t.x = c * i.w + h * -i.x + u * -i.z - l * -i.y + n.x;
t.y = u * i.w + h * -i.y + l * -i.x - c * -i.z + n.y;
t.z = l * i.w + h * -i.z + c * -i.y - u * -i.x + n.z;
return t;
};
i.transformInverseRTS = function(t, e, i, n, r) {
var s = e.x - n.x, a = e.y - n.y, o = e.z - n.z, c = i.w * s - i.y * o + i.z * a, u = i.w * a - i.z * s + i.x * o, l = i.w * o - i.x * a + i.y * s, h = i.x * s + i.y * a + i.z * o;
t.x = (c * i.w + h * i.x + u * i.z - l * i.y) / r.x;
t.y = (u * i.w + h * i.y + l * i.x - c * i.z) / r.y;
t.z = (l * i.w + h * i.z + c * i.y - u * i.x) / r.z;
return t;
};
i.rotateX = function(t, e, i, n) {
f = e.x - i.x;
_ = e.y - i.y;
d = e.z - i.z;
var r = Math.cos(n), s = Math.sin(n), a = f, o = _ * r - d * s, c = _ * s + d * r;
t.x = a + i.x;
t.y = o + i.y;
t.z = c + i.z;
return t;
};
i.rotateY = function(t, e, i, n) {
f = e.x - i.x;
_ = e.y - i.y;
d = e.z - i.z;
var r = Math.cos(n), s = Math.sin(n), a = d * s + f * r, o = _, c = d * r - f * s;
t.x = a + i.x;
t.y = o + i.y;
t.z = c + i.z;
return t;
};
i.rotateZ = function(t, e, i, n) {
f = e.x - i.x;
_ = e.y - i.y;
d = e.z - i.z;
var r = Math.cos(n), s = Math.sin(n), a = f * r - _ * s, o = f * s + _ * r, c = d;
t.x = a + i.x;
t.y = o + i.y;
t.z = c + i.z;
return t;
};
i.strictEquals = function(t, e) {
return t.x === e.x && t.y === e.y && t.z === e.z;
};
i.equals = function(t, e, i) {
void 0 === i && (i = o.EPSILON);
var n = t.x, r = t.y, s = t.z, a = e.x, c = e.y, u = e.z;
return Math.abs(n - a) <= i * Math.max(1, Math.abs(n), Math.abs(a)) && Math.abs(r - c) <= i * Math.max(1, Math.abs(r), Math.abs(c)) && Math.abs(s - u) <= i * Math.max(1, Math.abs(s), Math.abs(u));
};
i.angle = function(t, e) {
i.normalize(v, t);
i.normalize(g, e);
var n = i.dot(v, g);
return n > 1 ? 0 : n < -1 ? Math.PI : Math.acos(n);
};
i.projectOnPlane = function(t, e, n) {
return i.subtract(t, e, i.project(t, e, n));
};
i.project = function(t, e, n) {
var r = i.lengthSqr(n);
return r < 1e-6 ? i.set(t, 0, 0, 0) : i.multiplyScalar(t, n, i.dot(e, n) / r);
};
i.toArray = function(t, e, i) {
void 0 === i && (i = 0);
t[i + 0] = e.x;
t[i + 1] = e.y;
t[i + 2] = e.z;
return t;
};
i.fromArray = function(t, e, i) {
void 0 === i && (i = 0);
t.x = e[i + 0];
t.y = e[i + 1];
t.z = e[i + 2];
return t;
};
l(i, null, [ {
key: "ONE",
get: function() {
return new i(1, 1, 1);
}
}, {
key: "ZERO",
get: function() {
return new i();
}
}, {
key: "UP",
get: function() {
return new i(0, 1, 0);
}
}, {
key: "RIGHT",
get: function() {
return new i(1, 0, 0);
}
}, {
key: "FORWARD",
get: function() {
return new i(0, 0, 1);
}
} ]);
function i(e, n, r) {
var s;
void 0 === e && (e = 0);
void 0 === n && (n = 0);
void 0 === r && (r = 0);
(s = t.call(this) || this).mag = i.prototype.len;
s.magSqr = i.prototype.lengthSqr;
s.subSelf = i.prototype.subtract;
s.mulSelf = i.prototype.multiplyScalar;
s.divSelf = i.prototype.divide;
s.scaleSelf = i.prototype.multiply;
s.negSelf = i.prototype.negate;
s.x = void 0;
s.y = void 0;
s.z = void 0;
s.angle = a.default.prototype.angle;
s.project = a.default.prototype.project;
if (e && "object" == typeof e) {
s.x = e.x;
s.y = e.y;
s.z = e.z;
} else {
s.x = e;
s.y = n;
s.z = r;
}
return s;
}
e.clone = function() {
return new i(this.x, this.y, this.z);
};
e.set = function(t) {
this.x = t.x;
this.y = t.y;
this.z = t.z;
return this;
};
e.equals = function(t) {
return t && this.x === t.x && this.y === t.y && this.z === t.z;
};
e.fuzzyEquals = function(t, e) {
return this.x - e <= t.x && t.x <= this.x + e && this.y - e <= t.y && t.y <= this.y + e && this.z - e <= t.z && t.z <= this.z + e;
};
e.toString = function() {
return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ", " + this.z.toFixed(2) + ")";
};
e.lerp = function(t, e, n) {
n = n || new i();
i.lerp(n, this, t, e);
return n;
};
e.clampf = function(t, e) {
this.x = s.default.clampf(this.x, t.x, e.x);
this.y = s.default.clampf(this.y, t.y, e.y);
this.z = s.default.clampf(this.z, t.z, e.z);
return this;
};
e.addSelf = function(t) {
this.x += t.x;
this.y += t.y;
this.z += t.z;
return this;
};
e.add = function(t, e) {
(e = e || new i()).x = this.x + t.x;
e.y = this.y + t.y;
e.z = this.z + t.z;
return e;
};
e.subtract = function(t) {
this.x -= t.x;
this.y -= t.y;
this.z -= t.z;
return this;
};
e.multiplyScalar = function(t) {
this.x *= t;
this.y *= t;
this.z *= t;
return this;
};
e.multiply = function(t) {
this.x *= t.x;
this.y *= t.y;
this.z *= t.z;
return this;
};
e.divide = function(t) {
this.x /= t;
this.y /= t;
this.z /= t;
return this;
};
e.negate = function() {
this.x = -this.x;
this.y = -this.y;
this.z = -this.z;
return this;
};
e.dot = function(t) {
return this.x * t.x + this.y * t.y + this.z * t.z;
};
e.cross = function(t, e) {
e = e || new i();
i.cross(e, this, t);
return e;
};
e.len = function() {
return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};
e.lengthSqr = function() {
return this.x * this.x + this.y * this.y + this.z * this.z;
};
e.normalizeSelf = function() {
i.normalize(this, this);
return this;
};
e.normalize = function(t) {
t = t || new i();
i.normalize(t, this);
return t;
};
e.transformMat4 = function(t, e) {
e = e || new i();
i.transformMat4(e, this, t);
return e;
};
e.maxAxis = function() {
return Math.max(this.x, this.y, this.z);
};
e.signAngle = function(t) {
cc.warnID(1408, "vec3.signAngle", "v2.1", "cc.v2(selfVector).signAngle(vector)");
var e = new a.default(this.x, this.y), i = new a.default(t.x, t.y);
return e.signAngle(i);
};
e.rotate = function(t, e) {
cc.warnID(1408, "vec3.rotate", "v2.1", "cc.v2(selfVector).rotate(radians, out)");
return a.default.prototype.rotate.call(this, t, e);
};
e.rotateSelf = function(t) {
cc.warnID(1408, "vec3.rotateSelf", "v2.1", "cc.v2(selfVector).rotateSelf(radians)");
return a.default.prototype.rotateSelf.call(this, t);
};
return i;
})(n.default);
i.default = p;
p.sub = p.subtract;
p.mul = p.multiply;
p.scale = p.multiplyScalar;
p.mag = p.len;
p.squaredMagnitude = p.lengthSqr;
p.div = p.divide;
p.ONE_R = p.ONE;
p.ZERO_R = p.ZERO;
p.UP_R = p.UP;
p.RIGHT_R = p.RIGHT;
p.FRONT_R = p.FORWARD;
var v = new p(), g = new p();
r.default.fastDefine("cc.Vec3", p, {
x: 0,
y: 0,
z: 0
});
cc.v3 = function(t, e, i) {
return new p(t, e, i);
};
cc.Vec3 = p;
e.exports = i.default;
}), {
"../platform/CCClass": 128,
"../utils/misc": 196,
"./utils": 218,
"./value-type": 219,
"./vec2": 220
} ],
222: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.v4 = p;
i.default = void 0;
var n = a(t("../platform/CCClass")), r = a(t("./value-type")), s = t("./utils");
function a(t) {
return t && t.__esModule ? t : {
default: t
};
}
function o(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function c(t, e, i) {
e && o(t.prototype, e);
i && o(t, i);
return t;
}
function u(t, e) {
t.prototype = Object.create(e.prototype);
t.prototype.constructor = t;
t.__proto__ = e;
}
var l = 0, h = 0, f = 0, _ = 0, d = (function(t) {
u(i, t);
var e = i.prototype;
e.sub = function(t, e) {
return i.subtract(e || new i(), this, t);
};
e.mul = function(t, e) {
return i.multiplyScalar(e || new i(), this, t);
};
e.div = function(t, e) {
return i.multiplyScalar(e || new i(), this, 1 / t);
};
e.scale = function(t, e) {
return i.multiply(e || new i(), this, t);
};
e.neg = function(t) {
return i.negate(t || new i(), this);
};
i.clone = function(t) {
return new i(t.x, t.y, t.z, t.w);
};
i.copy = function(t, e) {
t.x = e.x;
t.y = e.y;
t.z = e.z;
t.w = e.w;
return t;
};
i.set = function(t, e, i, n, r) {
t.x = e;
t.y = i;
t.z = n;
t.w = r;
return t;
};
i.add = function(t, e, i) {
t.x = e.x + i.x;
t.y = e.y + i.y;
t.z = e.z + i.z;
t.w = e.w + i.w;
return t;
};
i.subtract = function(t, e, i) {
t.x = e.x - i.x;
t.y = e.y - i.y;
t.z = e.z - i.z;
t.w = e.w - i.w;
return t;
};
i.multiply = function(t, e, i) {
t.x = e.x * i.x;
t.y = e.y * i.y;
t.z = e.z * i.z;
t.w = e.w * i.w;
return t;
};
i.divide = function(t, e, i) {
t.x = e.x / i.x;
t.y = e.y / i.y;
t.z = e.z / i.z;
t.w = e.w / i.w;
return t;
};
i.ceil = function(t, e) {
t.x = Math.ceil(e.x);
t.y = Math.ceil(e.y);
t.z = Math.ceil(e.z);
t.w = Math.ceil(e.w);
return t;
};
i.floor = function(t, e) {
t.x = Math.floor(e.x);
t.y = Math.floor(e.y);
t.z = Math.floor(e.z);
t.w = Math.floor(e.w);
return t;
};
i.min = function(t, e, i) {
t.x = Math.min(e.x, i.x);
t.y = Math.min(e.y, i.y);
t.z = Math.min(e.z, i.z);
t.w = Math.min(e.w, i.w);
return t;
};
i.max = function(t, e, i) {
t.x = Math.max(e.x, i.x);
t.y = Math.max(e.y, i.y);
t.z = Math.max(e.z, i.z);
t.w = Math.max(e.w, i.w);
return t;
};
i.round = function(t, e) {
t.x = Math.round(e.x);
t.y = Math.round(e.y);
t.z = Math.round(e.z);
t.w = Math.round(e.w);
return t;
};
i.multiplyScalar = function(t, e, i) {
t.x = e.x * i;
t.y = e.y * i;
t.z = e.z * i;
t.w = e.w * i;
return t;
};
i.scaleAndAdd = function(t, e, i, n) {
t.x = e.x + i.x * n;
t.y = e.y + i.y * n;
t.z = e.z + i.z * n;
t.w = e.w + i.w * n;
return t;
};
i.distance = function(t, e) {
var i = e.x - t.x, n = e.y - t.y, r = e.z - t.z, s = e.w - t.w;
return Math.sqrt(i * i + n * n + r * r + s * s);
};
i.squaredDistance = function(t, e) {
var i = e.x - t.x, n = e.y - t.y, r = e.z - t.z, s = e.w - t.w;
return i * i + n * n + r * r + s * s;
};
i.len = function(t) {
l = t.x;
h = t.y;
f = t.z;
_ = t.w;
return Math.sqrt(l * l + h * h + f * f + _ * _);
};
i.lengthSqr = function(t) {
l = t.x;
h = t.y;
f = t.z;
_ = t.w;
return l * l + h * h + f * f + _ * _;
};
i.negate = function(t, e) {
t.x = -e.x;
t.y = -e.y;
t.z = -e.z;
t.w = -e.w;
return t;
};
i.inverse = function(t, e) {
t.x = 1 / e.x;
t.y = 1 / e.y;
t.z = 1 / e.z;
t.w = 1 / e.w;
return t;
};
i.inverseSafe = function(t, e) {
l = e.x;
h = e.y;
f = e.z;
_ = e.w;
Math.abs(l) < s.EPSILON ? t.x = 0 : t.x = 1 / l;
Math.abs(h) < s.EPSILON ? t.y = 0 : t.y = 1 / h;
Math.abs(f) < s.EPSILON ? t.z = 0 : t.z = 1 / f;
Math.abs(_) < s.EPSILON ? t.w = 0 : t.w = 1 / _;
return t;
};
i.normalize = function(t, e) {
l = e.x;
h = e.y;
f = e.z;
_ = e.w;
var i = l * l + h * h + f * f + _ * _;
if (i > 0) {
i = 1 / Math.sqrt(i);
t.x = l * i;
t.y = h * i;
t.z = f * i;
t.w = _ * i;
}
return t;
};
i.dot = function(t, e) {
return t.x * e.x + t.y * e.y + t.z * e.z + t.w * e.w;
};
i.lerp = function(t, e, i, n) {
t.x = e.x + n * (i.x - e.x);
t.y = e.y + n * (i.y - e.y);
t.z = e.z + n * (i.z - e.z);
t.w = e.w + n * (i.w - e.w);
return t;
};
i.random = function(t, e) {
e = e || 1;
var i = 2 * (0, s.random)() * Math.PI, n = 2 * (0, s.random)() - 1, r = Math.sqrt(1 - n * n);
t.x = r * Math.cos(i) * e;
t.y = r * Math.sin(i) * e;
t.z = n * e;
t.w = 0;
return t;
};
i.transformMat4 = function(t, e, i) {
l = e.x;
h = e.y;
f = e.z;
_ = e.w;
var n = i.m;
t.x = n[0] * l + n[4] * h + n[8] * f + n[12] * _;
t.y = n[1] * l + n[5] * h + n[9] * f + n[13] * _;
t.z = n[2] * l + n[6] * h + n[10] * f + n[14] * _;
t.w = n[3] * l + n[7] * h + n[11] * f + n[15] * _;
return t;
};
i.transformAffine = function(t, e, i) {
l = e.x;
h = e.y;
f = e.z;
_ = e.w;
var n = i.m;
t.x = n[0] * l + n[1] * h + n[2] * f + n[3] * _;
t.y = n[4] * l + n[5] * h + n[6] * f + n[7] * _;
t.x = n[8] * l + n[9] * h + n[10] * f + n[11] * _;
t.w = e.w;
return t;
};
i.transformQuat = function(t, e, i) {
var n = e.x, r = e.y, s = e.z;
l = i.x;
h = i.y;
f = i.z;
var a = (_ = i.w) * n + h * s - f * r, o = _ * r + f * n - l * s, c = _ * s + l * r - h * n, u = -l * n - h * r - f * s;
t.x = a * _ + u * -l + o * -f - c * -h;
t.y = o * _ + u * -h + c * -l - a * -f;
t.z = c * _ + u * -f + a * -h - o * -l;
t.w = e.w;
return t;
};
i.strictEquals = function(t, e) {
return t.x === e.x && t.y === e.y && t.z === e.z && t.w === e.w;
};
i.equals = function(t, e, i) {
void 0 === i && (i = s.EPSILON);
return Math.abs(t.x - e.x) <= i * Math.max(1, Math.abs(t.x), Math.abs(e.x)) && Math.abs(t.y - e.y) <= i * Math.max(1, Math.abs(t.y), Math.abs(e.y)) && Math.abs(t.z - e.z) <= i * Math.max(1, Math.abs(t.z), Math.abs(e.z)) && Math.abs(t.w - e.w) <= i * Math.max(1, Math.abs(t.w), Math.abs(e.w));
};
i.toArray = function(t, e, i) {
void 0 === i && (i = 0);
t[i + 0] = e.x;
t[i + 1] = e.y;
t[i + 2] = e.z;
t[i + 3] = e.w;
return t;
};
i.fromArray = function(t, e, i) {
void 0 === i && (i = 0);
t.x = e[i + 0];
t.y = e[i + 1];
t.z = e[i + 2];
t.w = e[i + 3];
return t;
};
c(i, null, [ {
key: "ZERO",
get: function() {
return new i(0, 0, 0, 0);
}
}, {
key: "ONE",
get: function() {
return new i(1, 1, 1, 1);
}
}, {
key: "NEG_ONE",
get: function() {
return new i(-1, -1, -1, -1);
}
} ]);
function i(e, n, r, s) {
var a;
void 0 === e && (e = 0);
void 0 === n && (n = 0);
void 0 === r && (r = 0);
void 0 === s && (s = 0);
(a = t.call(this) || this).mag = i.prototype.len;
a.magSqr = i.prototype.lengthSqr;
a.subSelf = i.prototype.subtract;
a.mulSelf = i.prototype.multiplyScalar;
a.divSelf = i.prototype.divide;
a.scaleSelf = i.prototype.multiply;
a.negSelf = i.prototype.negate;
a.x = void 0;
a.y = void 0;
a.z = void 0;
a.w = void 0;
if (e && "object" == typeof e) {
a.x = e.x;
a.y = e.y;
a.z = e.z;
a.w = e.w;
} else {
a.x = e;
a.y = n;
a.z = r;
a.w = s;
}
return a;
}
e.clone = function() {
return new i(this.x, this.y, this.z, this.w);
};
e.set = function(t, e, i, n) {
if (t && "object" == typeof t) {
this.x = t.x;
this.y = t.y;
this.z = t.z;
this.w = t.w;
} else {
this.x = t || 0;
this.y = e || 0;
this.z = i || 0;
this.w = n || 0;
}
return this;
};
e.equals = function(t, e) {
void 0 === e && (e = s.EPSILON);
return Math.abs(this.x - t.x) <= e * Math.max(1, Math.abs(this.x), Math.abs(t.x)) && Math.abs(this.y - t.y) <= e * Math.max(1, Math.abs(this.y), Math.abs(t.y)) && Math.abs(this.z - t.z) <= e * Math.max(1, Math.abs(this.z), Math.abs(t.z)) && Math.abs(this.w - t.w) <= e * Math.max(1, Math.abs(this.w), Math.abs(t.w));
};
e.equals4f = function(t, e, i, n, r) {
void 0 === r && (r = s.EPSILON);
return Math.abs(this.x - t) <= r * Math.max(1, Math.abs(this.x), Math.abs(t)) && Math.abs(this.y - e) <= r * Math.max(1, Math.abs(this.y), Math.abs(e)) && Math.abs(this.z - i) <= r * Math.max(1, Math.abs(this.z), Math.abs(i)) && Math.abs(this.w - n) <= r * Math.max(1, Math.abs(this.w), Math.abs(n));
};
e.strictEquals = function(t) {
return this.x === t.x && this.y === t.y && this.z === t.z && this.w === t.w;
};
e.strictEquals4f = function(t, e, i, n) {
return this.x === t && this.y === e && this.z === i && this.w === n;
};
e.lerp = function(t, e) {
l = this.x;
h = this.y;
f = this.z;
_ = this.w;
this.x = l + e * (t.x - l);
this.y = h + e * (t.y - h);
this.z = f + e * (t.z - f);
this.w = _ + e * (t.w - _);
return this;
};
e.toString = function() {
return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ", " + this.z.toFixed(2) + ", " + this.w.toFixed(2) + ")";
};
e.clampf = function(t, e) {
this.x = (0, s.clamp)(this.x, t.x, e.x);
this.y = (0, s.clamp)(this.y, t.y, e.y);
this.z = (0, s.clamp)(this.z, t.z, e.z);
this.w = (0, s.clamp)(this.w, t.w, e.w);
return this;
};
e.addSelf = function(t) {
this.x += t.x;
this.y += t.y;
this.z += t.z;
this.w += t.w;
return this;
};
e.add = function(t, e) {
(e = e || new i()).x = this.x + t.x;
e.y = this.y + t.y;
e.z = this.z + t.z;
e.w = this.w + t.w;
return e;
};
e.subtract = function(t, e) {
(e = e || new i()).x = this.x - t.x;
e.y = this.y - t.y;
e.z = this.z - t.z;
e.w = this.w - t.w;
return e;
};
e.multiplyScalar = function(t) {
this.x *= t;
this.y *= t;
this.z *= t;
this.w *= t;
return this;
};
e.multiply = function(t) {
this.x *= t.x;
this.y *= t.y;
this.z *= t.z;
this.w *= t.w;
return this;
};
e.divide = function(t) {
this.x /= t;
this.y /= t;
this.z /= t;
this.w /= t;
return this;
};
e.negate = function() {
this.x = -this.x;
this.y = -this.y;
this.z = -this.z;
this.w = -this.w;
return this;
};
e.dot = function(t) {
return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
};
e.cross = function(t, e) {
e = e || new i();
var n = this.x, r = this.y, s = this.z, a = t.x, o = t.y, c = t.z;
e.x = r * c - s * o;
e.y = s * a - n * c;
e.z = n * o - r * a;
return e;
};
e.len = function() {
var t = this.x, e = this.y, i = this.z, n = this.w;
return Math.sqrt(t * t + e * e + i * i + n * n);
};
e.lengthSqr = function() {
var t = this.x, e = this.y, i = this.z, n = this.w;
return t * t + e * e + i * i + n * n;
};
e.normalizeSelf = function() {
this.normalize(this);
return this;
};
e.normalize = function(t) {
t = t || new i();
l = this.x;
h = this.y;
f = this.z;
_ = this.w;
var e = l * l + h * h + f * f + _ * _;
if (e > 0) {
e = 1 / Math.sqrt(e);
t.x = l * e;
t.y = h * e;
t.z = f * e;
t.w = _ * e;
}
return t;
};
e.transformMat4 = function(t, e) {
e = e || new i();
l = this.x;
h = this.y;
f = this.z;
_ = this.w;
var n = t.m;
e.x = n[0] * l + n[4] * h + n[8] * f + n[12] * _;
e.y = n[1] * l + n[5] * h + n[9] * f + n[13] * _;
e.z = n[2] * l + n[6] * h + n[10] * f + n[14] * _;
e.w = n[3] * l + n[7] * h + n[11] * f + n[15] * _;
return e;
};
e.maxAxis = function() {
return Math.max(this.x, this.y, this.z, this.w);
};
return i;
})(r.default);
i.default = d;
d.sub = d.subtract;
d.mul = d.multiply;
d.div = d.divide;
d.scale = d.multiplyScalar;
d.mag = d.len;
d.squaredMagnitude = d.lengthSqr;
d.ZERO_R = d.ZERO;
d.ONE_R = d.ONE;
d.NEG_ONE_R = d.NEG_ONE;
n.default.fastDefine("cc.Vec4", d, {
x: 0,
y: 0,
z: 0,
w: 0
});
function p(t, e, i, n) {
return new d(t, e, i, n);
}
cc.v4 = p;
cc.Vec4 = d;
}), {
"../platform/CCClass": 128,
"./utils": 218,
"./value-type": 219
} ],
223: [ (function() {
"use strict";
cc.js;
}), {} ],
224: [ (function(t) {
"use strict";
t("./core/CCGame");
t("./actions");
}), {
"./actions": 7,
"./core/CCGame": 24
} ],
225: [ (function(t, e) {
"use strict";
var i = t("../core/assets/CCAsset"), n = t("../core/assets/CCSpriteFrame"), r = cc.Class({
name: "cc.ParticleAsset",
extends: i,
properties: {
spriteFrame: {
default: null,
type: n
}
}
});
cc.ParticleAsset = e.exports = r;
}), {
"../core/assets/CCAsset": 58,
"../core/assets/CCSpriteFrame": 70
} ],
226: [ (function(t, e) {
"use strict";
var i, n, r, s, a, o, c, u, l, h, f, _, d, p, v, g, m, y, E, T, C, A, S, x, b, R, w, O, I, D, M, L, N, P, F, B, z, U, k, V, H, G;
(function(t) {
t[t.COMPRESSED_RGB_S3TC_DXT1_EXT = 33776] = "COMPRESSED_RGB_S3TC_DXT1_EXT";
t[t.COMPRESSED_RGBA_S3TC_DXT1_EXT = 33777] = "COMPRESSED_RGBA_S3TC_DXT1_EXT";
t[t.COMPRESSED_RGBA_S3TC_DXT3_EXT = 33778] = "COMPRESSED_RGBA_S3TC_DXT3_EXT";
t[t.COMPRESSED_RGBA_S3TC_DXT5_EXT = 33779] = "COMPRESSED_RGBA_S3TC_DXT5_EXT";
t[t.COMPRESSED_SRGB_S3TC_DXT1_EXT = 35916] = "COMPRESSED_SRGB_S3TC_DXT1_EXT";
t[t.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT = 35917] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT";
t[t.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT = 35918] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT";
t[t.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT = 35919] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT";
t[t.COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 35840] = "COMPRESSED_RGB_PVRTC_4BPPV1_IMG";
t[t.COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 35841] = "COMPRESSED_RGB_PVRTC_2BPPV1_IMG";
t[t.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 35842] = "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG";
t[t.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 35843] = "COMPRESSED_RGBA_PVRTC_2BPPV1_IMG";
t[t.COMPRESSED_RGB_ETC1_WEBGL = 36196] = "COMPRESSED_RGB_ETC1_WEBGL";
})(i || (i = {}));
(function(t) {
t[t.UNKNOWN = 0] = "UNKNOWN";
t[t.BUFFER = 1] = "BUFFER";
t[t.TEXTURE = 2] = "TEXTURE";
t[t.TEXTURE_VIEW = 3] = "TEXTURE_VIEW";
t[t.RENDER_PASS = 4] = "RENDER_PASS";
t[t.FRAMEBUFFER = 5] = "FRAMEBUFFER";
t[t.SAMPLER = 6] = "SAMPLER";
t[t.SHADER = 7] = "SHADER";
t[t.PIPELINE_LAYOUT = 8] = "PIPELINE_LAYOUT";
t[t.PIPELINE_STATE = 9] = "PIPELINE_STATE";
t[t.BINDING_LAYOUT = 10] = "BINDING_LAYOUT";
t[t.INPUT_ASSEMBLER = 11] = "INPUT_ASSEMBLER";
t[t.COMMAND_ALLOCATOR = 12] = "COMMAND_ALLOCATOR";
t[t.COMMAND_BUFFER = 13] = "COMMAND_BUFFER";
t[t.QUEUE = 14] = "QUEUE";
t[t.WINDOW = 15] = "WINDOW";
})(n || (n = {}));
(function(t) {
t[t.UNREADY = 0] = "UNREADY";
t[t.FAILED = 1] = "FAILED";
t[t.SUCCESS = 2] = "SUCCESS";
})(r || (r = {}));
(function() {
function t(t) {
this._gfxType = n.UNKNOWN;
this._status = r.UNREADY;
this._gfxType = t;
}
Object.defineProperty(t.prototype, "gfxType", {
get: function() {
return this._gfxType;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "status", {
get: function() {
return this._status;
},
enumerable: !0,
configurable: !0
});
})();
(function(t) {
t.ATTR_POSITION = "a_position";
t.ATTR_NORMAL = "a_normal";
t.ATTR_TANGENT = "a_tangent";
t.ATTR_BITANGENT = "a_bitangent";
t.ATTR_WEIGHTS = "a_weights";
t.ATTR_JOINTS = "a_joints";
t.ATTR_COLOR = "a_color";
t.ATTR_COLOR1 = "a_color1";
t.ATTR_COLOR2 = "a_color2";
t.ATTR_TEX_COORD = "a_texCoord";
t.ATTR_TEX_COORD1 = "a_texCoord1";
t.ATTR_TEX_COORD2 = "a_texCoord2";
t.ATTR_TEX_COORD3 = "a_texCoord3";
t.ATTR_TEX_COORD4 = "a_texCoord4";
t.ATTR_TEX_COORD5 = "a_texCoord5";
t.ATTR_TEX_COORD6 = "a_texCoord6";
t.ATTR_TEX_COORD7 = "a_texCoord7";
t.ATTR_TEX_COORD8 = "a_texCoord8";
})(s || (s = {}));
(function(t) {
t[t.UNKNOWN = 0] = "UNKNOWN";
t[t.BOOL = 1] = "BOOL";
t[t.BOOL2 = 2] = "BOOL2";
t[t.BOOL3 = 3] = "BOOL3";
t[t.BOOL4 = 4] = "BOOL4";
t[t.INT = 5] = "INT";
t[t.INT2 = 6] = "INT2";
t[t.INT3 = 7] = "INT3";
t[t.INT4 = 8] = "INT4";
t[t.UINT = 9] = "UINT";
t[t.UINT2 = 10] = "UINT2";
t[t.UINT3 = 11] = "UINT3";
t[t.UINT4 = 12] = "UINT4";
t[t.FLOAT = 13] = "FLOAT";
t[t.FLOAT2 = 14] = "FLOAT2";
t[t.FLOAT3 = 15] = "FLOAT3";
t[t.FLOAT4 = 16] = "FLOAT4";
t[t.COLOR4 = 17] = "COLOR4";
t[t.MAT2 = 18] = "MAT2";
t[t.MAT2X3 = 19] = "MAT2X3";
t[t.MAT2X4 = 20] = "MAT2X4";
t[t.MAT3X2 = 21] = "MAT3X2";
t[t.MAT3 = 22] = "MAT3";
t[t.MAT3X4 = 23] = "MAT3X4";
t[t.MAT4X2 = 24] = "MAT4X2";
t[t.MAT4X3 = 25] = "MAT4X3";
t[t.MAT4 = 26] = "MAT4";
t[t.SAMPLER1D = 27] = "SAMPLER1D";
t[t.SAMPLER1D_ARRAY = 28] = "SAMPLER1D_ARRAY";
t[t.SAMPLER2D = 29] = "SAMPLER2D";
t[t.SAMPLER2D_ARRAY = 30] = "SAMPLER2D_ARRAY";
t[t.SAMPLER3D = 31] = "SAMPLER3D";
t[t.SAMPLER_CUBE = 32] = "SAMPLER_CUBE";
t[t.COUNT = 33] = "COUNT";
})(a || (a = {}));
(function(t) {
t[t.UNKNOWN = 0] = "UNKNOWN";
t[t.A8 = 1] = "A8";
t[t.L8 = 2] = "L8";
t[t.LA8 = 3] = "LA8";
t[t.R8 = 4] = "R8";
t[t.R8SN = 5] = "R8SN";
t[t.R8UI = 6] = "R8UI";
t[t.R8I = 7] = "R8I";
t[t.R16F = 8] = "R16F";
t[t.R16UI = 9] = "R16UI";
t[t.R16I = 10] = "R16I";
t[t.R32F = 11] = "R32F";
t[t.R32UI = 12] = "R32UI";
t[t.R32I = 13] = "R32I";
t[t.RG8 = 14] = "RG8";
t[t.RG8SN = 15] = "RG8SN";
t[t.RG8UI = 16] = "RG8UI";
t[t.RG8I = 17] = "RG8I";
t[t.RG16F = 18] = "RG16F";
t[t.RG16UI = 19] = "RG16UI";
t[t.RG16I = 20] = "RG16I";
t[t.RG32F = 21] = "RG32F";
t[t.RG32UI = 22] = "RG32UI";
t[t.RG32I = 23] = "RG32I";
t[t.RGB8 = 24] = "RGB8";
t[t.SRGB8 = 25] = "SRGB8";
t[t.RGB8SN = 26] = "RGB8SN";
t[t.RGB8UI = 27] = "RGB8UI";
t[t.RGB8I = 28] = "RGB8I";
t[t.RGB16F = 29] = "RGB16F";
t[t.RGB16UI = 30] = "RGB16UI";
t[t.RGB16I = 31] = "RGB16I";
t[t.RGB32F = 32] = "RGB32F";
t[t.RGB32UI = 33] = "RGB32UI";
t[t.RGB32I = 34] = "RGB32I";
t[t.RGBA8 = 35] = "RGBA8";
t[t.SRGB8_A8 = 36] = "SRGB8_A8";
t[t.RGBA8SN = 37] = "RGBA8SN";
t[t.RGBA8UI = 38] = "RGBA8UI";
t[t.RGBA8I = 39] = "RGBA8I";
t[t.RGBA16F = 40] = "RGBA16F";
t[t.RGBA16UI = 41] = "RGBA16UI";
t[t.RGBA16I = 42] = "RGBA16I";
t[t.RGBA32F = 43] = "RGBA32F";
t[t.RGBA32UI = 44] = "RGBA32UI";
t[t.RGBA32I = 45] = "RGBA32I";
t[t.R5G6B5 = 46] = "R5G6B5";
t[t.R11G11B10F = 47] = "R11G11B10F";
t[t.RGB5A1 = 48] = "RGB5A1";
t[t.RGBA4 = 49] = "RGBA4";
t[t.RGB10A2 = 50] = "RGB10A2";
t[t.RGB10A2UI = 51] = "RGB10A2UI";
t[t.RGB9E5 = 52] = "RGB9E5";
t[t.D16 = 53] = "D16";
t[t.D16S8 = 54] = "D16S8";
t[t.D24 = 55] = "D24";
t[t.D24S8 = 56] = "D24S8";
t[t.D32F = 57] = "D32F";
t[t.D32F_S8 = 58] = "D32F_S8";
t[t.BC1 = 59] = "BC1";
t[t.BC1_ALPHA = 60] = "BC1_ALPHA";
t[t.BC1_SRGB = 61] = "BC1_SRGB";
t[t.BC1_SRGB_ALPHA = 62] = "BC1_SRGB_ALPHA";
t[t.BC2 = 63] = "BC2";
t[t.BC2_SRGB = 64] = "BC2_SRGB";
t[t.BC3 = 65] = "BC3";
t[t.BC3_SRGB = 66] = "BC3_SRGB";
t[t.BC4 = 67] = "BC4";
t[t.BC4_SNORM = 68] = "BC4_SNORM";
t[t.BC5 = 69] = "BC5";
t[t.BC5_SNORM = 70] = "BC5_SNORM";
t[t.BC6H_UF16 = 71] = "BC6H_UF16";
t[t.BC6H_SF16 = 72] = "BC6H_SF16";
t[t.BC7 = 73] = "BC7";
t[t.BC7_SRGB = 74] = "BC7_SRGB";
t[t.ETC_RGB8 = 75] = "ETC_RGB8";
t[t.ETC2_RGB8 = 76] = "ETC2_RGB8";
t[t.ETC2_SRGB8 = 77] = "ETC2_SRGB8";
t[t.ETC2_RGB8_A1 = 78] = "ETC2_RGB8_A1";
t[t.ETC2_SRGB8_A1 = 79] = "ETC2_SRGB8_A1";
t[t.ETC2_RGBA8 = 80] = "ETC2_RGBA8";
t[t.ETC2_SRGB8_A8 = 81] = "ETC2_SRGB8_A8";
t[t.EAC_R11 = 82] = "EAC_R11";
t[t.EAC_R11SN = 83] = "EAC_R11SN";
t[t.EAC_RG11 = 84] = "EAC_RG11";
t[t.EAC_RG11SN = 85] = "EAC_RG11SN";
t[t.PVRTC_RGB2 = 86] = "PVRTC_RGB2";
t[t.PVRTC_RGBA2 = 87] = "PVRTC_RGBA2";
t[t.PVRTC_RGB4 = 88] = "PVRTC_RGB4";
t[t.PVRTC_RGBA4 = 89] = "PVRTC_RGBA4";
t[t.PVRTC2_2BPP = 90] = "PVRTC2_2BPP";
t[t.PVRTC2_4BPP = 91] = "PVRTC2_4BPP";
})(o || (o = {}));
(function(t) {
t[t.NONE = 0] = "NONE";
t[t.TRANSFER_SRC = 1] = "TRANSFER_SRC";
t[t.TRANSFER_DST = 2] = "TRANSFER_DST";
t[t.INDEX = 4] = "INDEX";
t[t.VERTEX = 8] = "VERTEX";
t[t.UNIFORM = 16] = "UNIFORM";
t[t.STORAGE = 32] = "STORAGE";
t[t.INDIRECT = 64] = "INDIRECT";
})(c || (c = {}));
(function(t) {
t[t.NONE = 0] = "NONE";
t[t.DEVICE = 1] = "DEVICE";
t[t.HOST = 2] = "HOST";
})(u || (u = {}));
(function(t) {
t[t.NONE = 0] = "NONE";
t[t.READ = 1] = "READ";
t[t.WRITE = 2] = "WRITE";
})(l || (l = {}));
(function(t) {
t[t.POINT_LIST = 0] = "POINT_LIST";
t[t.LINE_LIST = 1] = "LINE_LIST";
t[t.LINE_STRIP = 2] = "LINE_STRIP";
t[t.LINE_LOOP = 3] = "LINE_LOOP";
t[t.LINE_LIST_ADJACENCY = 4] = "LINE_LIST_ADJACENCY";
t[t.LINE_STRIP_ADJACENCY = 5] = "LINE_STRIP_ADJACENCY";
t[t.ISO_LINE_LIST = 6] = "ISO_LINE_LIST";
t[t.TRIANGLE_LIST = 7] = "TRIANGLE_LIST";
t[t.TRIANGLE_STRIP = 8] = "TRIANGLE_STRIP";
t[t.TRIANGLE_FAN = 9] = "TRIANGLE_FAN";
t[t.TRIANGLE_LIST_ADJACENCY = 10] = "TRIANGLE_LIST_ADJACENCY";
t[t.TRIANGLE_STRIP_ADJACENCY = 11] = "TRIANGLE_STRIP_ADJACENCY";
t[t.TRIANGLE_PATCH_ADJACENCY = 12] = "TRIANGLE_PATCH_ADJACENCY";
t[t.QUAD_PATCH_LIST = 13] = "QUAD_PATCH_LIST";
})(h || (h = {}));
(function(t) {
t[t.FILL = 0] = "FILL";
t[t.POINT = 1] = "POINT";
t[t.LINE = 2] = "LINE";
})(f || (f = {}));
(function(t) {
t[t.GOURAND = 0] = "GOURAND";
t[t.FLAT = 1] = "FLAT";
})(_ || (_ = {}));
(function(t) {
t[t.NONE = 0] = "NONE";
t[t.FRONT = 1] = "FRONT";
t[t.BACK = 2] = "BACK";
})(d || (d = {}));
(function(t) {
t[t.NEVER = 0] = "NEVER";
t[t.LESS = 1] = "LESS";
t[t.EQUAL = 2] = "EQUAL";
t[t.LESS_EQUAL = 3] = "LESS_EQUAL";
t[t.GREATER = 4] = "GREATER";
t[t.NOT_EQUAL = 5] = "NOT_EQUAL";
t[t.GREATER_EQUAL = 6] = "GREATER_EQUAL";
t[t.ALWAYS = 7] = "ALWAYS";
})(p || (p = {}));
(function(t) {
t[t.ZERO = 0] = "ZERO";
t[t.KEEP = 1] = "KEEP";
t[t.REPLACE = 2] = "REPLACE";
t[t.INCR = 3] = "INCR";
t[t.DECR = 4] = "DECR";
t[t.INVERT = 5] = "INVERT";
t[t.INCR_WRAP = 6] = "INCR_WRAP";
t[t.DECR_WRAP = 7] = "DECR_WRAP";
})(v || (v = {}));
(function(t) {
t[t.ADD = 0] = "ADD";
t[t.SUB = 1] = "SUB";
t[t.REV_SUB = 2] = "REV_SUB";
t[t.MIN = 3] = "MIN";
t[t.MAX = 4] = "MAX";
})(g || (g = {}));
(function(t) {
t[t.ZERO = 0] = "ZERO";
t[t.ONE = 1] = "ONE";
t[t.SRC_ALPHA = 2] = "SRC_ALPHA";
t[t.DST_ALPHA = 3] = "DST_ALPHA";
t[t.ONE_MINUS_SRC_ALPHA = 4] = "ONE_MINUS_SRC_ALPHA";
t[t.ONE_MINUS_DST_ALPHA = 5] = "ONE_MINUS_DST_ALPHA";
t[t.SRC_COLOR = 6] = "SRC_COLOR";
t[t.DST_COLOR = 7] = "DST_COLOR";
t[t.ONE_MINUS_SRC_COLOR = 8] = "ONE_MINUS_SRC_COLOR";
t[t.ONE_MINUS_DST_COLOR = 9] = "ONE_MINUS_DST_COLOR";
t[t.SRC_ALPHA_SATURATE = 10] = "SRC_ALPHA_SATURATE";
t[t.CONSTANT_COLOR = 11] = "CONSTANT_COLOR";
t[t.ONE_MINUS_CONSTANT_COLOR = 12] = "ONE_MINUS_CONSTANT_COLOR";
t[t.CONSTANT_ALPHA = 13] = "CONSTANT_ALPHA";
t[t.ONE_MINUS_CONSTANT_ALPHA = 14] = "ONE_MINUS_CONSTANT_ALPHA";
})(m || (m = {}));
(function(t) {
t[t.NONE = 0] = "NONE";
t[t.R = 1] = "R";
t[t.G = 2] = "G";
t[t.B = 4] = "B";
t[t.A = 8] = "A";
t[t.ALL = 15] = "ALL";
})(y || (y = {}));
(function(t) {
t[t.NONE = 0] = "NONE";
t[t.POINT = 1] = "POINT";
t[t.LINEAR = 2] = "LINEAR";
t[t.ANISOTROPIC = 3] = "ANISOTROPIC";
})(E || (E = {}));
(function(t) {
t[t.WRAP = 0] = "WRAP";
t[t.MIRROR = 1] = "MIRROR";
t[t.CLAMP = 2] = "CLAMP";
t[t.BORDER = 3] = "BORDER";
})(T || (T = {}));
(function(t) {
t[t.TEX1D = 0] = "TEX1D";
t[t.TEX2D = 1] = "TEX2D";
t[t.TEX3D = 2] = "TEX3D";
})(C || (C = {}));
(function(t) {
t[t.NONE = 0] = "NONE";
t[t.TRANSFER_SRC = 1] = "TRANSFER_SRC";
t[t.TRANSFER_DST = 2] = "TRANSFER_DST";
t[t.SAMPLED = 4] = "SAMPLED";
t[t.STORAGE = 8] = "STORAGE";
t[t.COLOR_ATTACHMENT = 16] = "COLOR_ATTACHMENT";
t[t.DEPTH_STENCIL_ATTACHMENT = 32] = "DEPTH_STENCIL_ATTACHMENT";
t[t.TRANSIENT_ATTACHMENT = 64] = "TRANSIENT_ATTACHMENT";
t[t.INPUT_ATTACHMENT = 128] = "INPUT_ATTACHMENT";
})(A || (A = {}));
(function(t) {
t[t.X1 = 0] = "X1";
t[t.X2 = 1] = "X2";
t[t.X4 = 2] = "X4";
t[t.X8 = 3] = "X8";
t[t.X16 = 4] = "X16";
t[t.X32 = 5] = "X32";
t[t.X64 = 6] = "X64";
})(S || (S = {}));
(function(t) {
t[t.NONE = 0] = "NONE";
t[t.GEN_MIPMAP = 1] = "GEN_MIPMAP";
t[t.CUBEMAP = 2] = "CUBEMAP";
t[t.BAKUP_BUFFER = 4] = "BAKUP_BUFFER";
})(x || (x = {}));
(function(t) {
t[t.TV1D = 0] = "TV1D";
t[t.TV2D = 1] = "TV2D";
t[t.TV3D = 2] = "TV3D";
t[t.CUBE = 3] = "CUBE";
t[t.TV1D_ARRAY = 4] = "TV1D_ARRAY";
t[t.TV2D_ARRAY = 5] = "TV2D_ARRAY";
})(b || (b = {}));
(function(t) {
t[t.VERTEX = 0] = "VERTEX";
t[t.HULL = 1] = "HULL";
t[t.DOMAIN = 2] = "DOMAIN";
t[t.GEOMETRY = 3] = "GEOMETRY";
t[t.FRAGMENT = 4] = "FRAGMENT";
t[t.COMPUTE = 5] = "COMPUTE";
t[t.COUNT = 6] = "COUNT";
})(R || (R = {}));
(function(t) {
t[t.UNKNOWN = 0] = "UNKNOWN";
t[t.UNIFORM_BUFFER = 1] = "UNIFORM_BUFFER";
t[t.SAMPLER = 2] = "SAMPLER";
t[t.STORAGE_BUFFER = 3] = "STORAGE_BUFFER";
})(w || (w = {}));
(function(t) {
t[t.PRIMARY = 0] = "PRIMARY";
t[t.SECONDARY = 1] = "SECONDARY";
})(O || (O = {}));
(function(t) {
t[t.LOAD = 0] = "LOAD";
t[t.CLEAR = 1] = "CLEAR";
t[t.DISCARD = 2] = "DISCARD";
})(I || (I = {}));
(function(t) {
t[t.STORE = 0] = "STORE";
t[t.DISCARD = 1] = "DISCARD";
})(D || (D = {}));
(function(t) {
t[t.UNDEFINED = 0] = "UNDEFINED";
t[t.GENERAL = 1] = "GENERAL";
t[t.COLOR_ATTACHMENT_OPTIMAL = 2] = "COLOR_ATTACHMENT_OPTIMAL";
t[t.DEPTH_STENCIL_ATTACHMENT_OPTIMAL = 3] = "DEPTH_STENCIL_ATTACHMENT_OPTIMAL";
t[t.DEPTH_STENCIL_READONLY_OPTIMAL = 4] = "DEPTH_STENCIL_READONLY_OPTIMAL";
t[t.SHADER_READONLY_OPTIMAL = 5] = "SHADER_READONLY_OPTIMAL";
t[t.TRANSFER_SRC_OPTIMAL = 6] = "TRANSFER_SRC_OPTIMAL";
t[t.TRANSFER_DST_OPTIMAL = 7] = "TRANSFER_DST_OPTIMAL";
t[t.PREINITIALIZED = 8] = "PREINITIALIZED";
t[t.PRESENT_SRC = 9] = "PRESENT_SRC";
})(M || (M = {}));
(function(t) {
t[t.GRAPHICS = 0] = "GRAPHICS";
t[t.COMPUTE = 1] = "COMPUTE";
t[t.RAY_TRACING = 2] = "RAY_TRACING";
})(L || (L = {}));
(function(t) {
t[t.VIEWPORT = 0] = "VIEWPORT";
t[t.SCISSOR = 1] = "SCISSOR";
t[t.LINE_WIDTH = 2] = "LINE_WIDTH";
t[t.DEPTH_BIAS = 3] = "DEPTH_BIAS";
t[t.BLEND_CONSTANTS = 4] = "BLEND_CONSTANTS";
t[t.DEPTH_BOUNDS = 5] = "DEPTH_BOUNDS";
t[t.STENCIL_WRITE_MASK = 6] = "STENCIL_WRITE_MASK";
t[t.STENCIL_COMPARE_MASK = 7] = "STENCIL_COMPARE_MASK";
})(N || (N = {}));
(function(t) {
t[t.FRONT = 0] = "FRONT";
t[t.BACK = 1] = "BACK";
t[t.ALL = 2] = "ALL";
})(P || (P = {}));
(function(t) {
t[t.GRAPHICS = 0] = "GRAPHICS";
t[t.COMPUTE = 1] = "COMPUTE";
t[t.TRANSFER = 2] = "TRANSFER";
})(F || (F = {}));
(function(t) {
t[t.NONE = 0] = "NONE";
t[t.COLOR = 1] = "COLOR";
t[t.DEPTH = 2] = "DEPTH";
t[t.STENCIL = 4] = "STENCIL";
t[t.DEPTH_STENCIL = 6] = "DEPTH_STENCIL";
t[t.ALL = 7] = "ALL";
})(B || (B = {}));
(function(t) {
t[t.DEFAULT = 100] = "DEFAULT";
})(z || (z = {}));
(function(t) {
t[t.MIN = 0] = "MIN";
t[t.MAX = 255] = "MAX";
t[t.DEFAULT = 128] = "DEFAULT";
})(U || (U = {}));
(function(t) {
t[t.UBO_GLOBAL = 23] = "UBO_GLOBAL";
t[t.UBO_SHADOW = 22] = "UBO_SHADOW";
t[t.UBO_LOCAL = 21] = "UBO_LOCAL";
t[t.UBO_FORWARD_LIGHTS = 20] = "UBO_FORWARD_LIGHTS";
t[t.UBO_SKINNING = 19] = "UBO_SKINNING";
t[t.UBO_SKINNING_TEXTURE = 18] = "UBO_SKINNING_TEXTURE";
t[t.UBO_UI = 17] = "UBO_UI";
t[t.SAMPLER_JOINTS = 25] = "SAMPLER_JOINTS";
t[t.SAMPLER_ENVIRONMENT = 26] = "SAMPLER_ENVIRONMENT";
t[t.CUSTUM_UBO_BINDING_END_POINT = 17] = "CUSTUM_UBO_BINDING_END_POINT";
t[t.CUSTOM_SAMPLER_BINDING_START_POINT = 30] = "CUSTOM_SAMPLER_BINDING_START_POINT";
})(k || (k = {}));
(function(t) {
t[t.minFilter = 0] = "minFilter";
t[t.magFilter = 1] = "magFilter";
t[t.mipFilter = 2] = "mipFilter";
t[t.addressU = 3] = "addressU";
t[t.addressV = 4] = "addressV";
t[t.addressW = 5] = "addressW";
t[t.maxAnisotropy = 6] = "maxAnisotropy";
t[t.cmpFunc = 7] = "cmpFunc";
t[t.minLOD = 8] = "minLOD";
t[t.maxLOD = 9] = "maxLOD";
t[t.mipLODBias = 10] = "mipLODBias";
t[t.borderColor = 11] = "borderColor";
t[t.total = 15] = "total";
})(G || (G = {}));
var W = {};
W[W.bool = a.BOOL] = "bool";
W[W.int = a.INT] = "int";
W[W.ivec2 = a.INT2] = "ivec2invTypeParams";
W[W.ivec3 = a.INT3] = "ivec3";
W[W.ivec4 = a.INT4] = "ivec4";
W[W.float = a.FLOAT] = "float";
W[W.vec2 = a.FLOAT2] = "vec2";
W[W.vec3 = a.FLOAT3] = "vec3";
W[W.vec4 = a.FLOAT4] = "vec4";
W[W.mat2 = a.MAT2] = "mat2";
W[W.mat3 = a.MAT3] = "mat3";
W[W.mat4 = a.MAT4] = "mat4";
W[W.sampler2D = a.SAMPLER2D] = "sampler2D";
W[W.samplerCube = a.SAMPLER_CUBE] = "samplerCube";
var j = ((V = {})[a.BOOL] = 4, V[a.INT] = 4, V[a.INT2] = 8, V[a.INT3] = 12, V[a.INT4] = 16, 
V[a.FLOAT] = 4, V[a.FLOAT2] = 8, V[a.FLOAT3] = 12, V[a.FLOAT4] = 16, V[a.MAT2] = 16, 
V[a.MAT3] = 36, V[a.MAT4] = 64, V[a.SAMPLER2D] = 4, V[a.SAMPLER_CUBE] = 4, V), Y = ((H = {})[a.BOOL] = o.R32I, 
H[a.INT] = o.R32I, H[a.INT2] = o.RG32I, H[a.INT3] = o.RGB32I, H[a.INT4] = o.RGBA32I, 
H[a.FLOAT] = o.R32F, H[a.FLOAT2] = o.RG32F, H[a.FLOAT3] = o.RGB32F, H[a.FLOAT4] = o.RGBA32F, 
H), X = {
BACK: 1029,
FRONT: 1028,
NONE: 0,
ADD: 32774,
SUB: 32778,
REV_SUB: 32779,
ZERO: 0,
ONE: 1,
SRC_COLOR: 768,
ONE_MINUS_SRC_COLOR: 769,
DST_COLOR: 774,
ONE_MINUS_DST_COLOR: 775,
SRC_ALPHA: 770,
ONE_MINUS_SRC_ALPHA: 771,
DST_ALPHA: 772,
ONE_MINUS_DST_ALPHA: 773,
CONSTANT_COLOR: 32769,
ONE_MINUS_CONSTANT_COLOR: 32770,
CONSTANT_ALPHA: 32771,
ONE_MINUS_CONSTANT_ALPHA: 32772,
SRC_ALPHA_SATURATE: 776,
NEVER: 512,
LESS: 513,
EQUAL: 514,
LEQUAL: 515,
GREATER: 516,
NOTEQUAL: 517,
GEQUAL: 518,
ALWAYS: 519,
KEEP: 7680,
REPLACE: 7681,
INCR: 7682,
INCR_WRAP: 34055,
DECR: 7683,
DECR_WRAP: 34056,
INVERT: 5386
};
Object.assign(X, z);
var q = {
murmurhash2_32_gc: function(t, e) {
for (var i, n = t.length, r = e ^ n, s = 0; n >= 4; ) {
i = 1540483477 * (65535 & (i = 255 & t.charCodeAt(s) | (255 & t.charCodeAt(++s)) << 8 | (255 & t.charCodeAt(++s)) << 16 | (255 & t.charCodeAt(++s)) << 24)) + ((1540483477 * (i >>> 16) & 65535) << 16);
r = 1540483477 * (65535 & r) + ((1540483477 * (r >>> 16) & 65535) << 16) ^ (i = 1540483477 * (65535 & (i ^= i >>> 24)) + ((1540483477 * (i >>> 16) & 65535) << 16));
n -= 4;
++s;
}
switch (n) {
case 3:
r ^= (255 & t.charCodeAt(s + 2)) << 16;

case 2:
r ^= (255 & t.charCodeAt(s + 1)) << 8;

case 1:
r = 1540483477 * (65535 & (r ^= 255 & t.charCodeAt(s))) + ((1540483477 * (r >>> 16) & 65535) << 16);
}
r = 1540483477 * (65535 & (r ^= r >>> 13)) + ((1540483477 * (r >>> 16) & 65535) << 16);
return (r ^= r >>> 15) >>> 0;
},
SamplerInfoIndex: G,
effectStructure: {
$techniques: [ {
$passes: [ {
depthStencilState: {},
rasterizerState: {},
blendState: {
targets: [ {} ]
},
properties: {
any: {
sampler: {},
inspector: {}
}
}
} ]
} ]
},
typeMap: W,
sizeMap: j,
formatMap: Y,
passParams: X,
RenderQueue: {
OPAQUE: 0,
TRANSPARENT: 1,
OVERLAY: 2
},
RenderPriority: U,
GFXGetTypeSize: function(t) {
switch (t) {
case a.BOOL:
case a.INT:
case a.UINT:
case a.FLOAT:
return 4;

case a.BOOL2:
case a.INT2:
case a.UINT2:
case a.FLOAT2:
return 8;

case a.BOOL3:
case a.INT3:
case a.UINT3:
case a.FLOAT3:
return 12;

case a.BOOL4:
case a.INT4:
case a.UINT4:
case a.FLOAT4:
case a.MAT2:
return 16;

case a.MAT2X3:
return 24;

case a.MAT2X4:
return 32;

case a.MAT3X2:
return 24;

case a.MAT3:
return 36;

case a.MAT3X4:
return 48;

case a.MAT4X2:
case a.MAT4X2:
return 32;

case a.MAT4:
return 64;

case a.SAMPLER1D:
case a.SAMPLER1D_ARRAY:
case a.SAMPLER2D:
case a.SAMPLER2D_ARRAY:
case a.SAMPLER3D:
case a.SAMPLER_CUBE:
return 4;

default:
return 0;
}
},
UniformBinding: k
};
e.exports = q;
}), {} ],
227: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n, r = (n = t("../gfx")) && n.__esModule ? n : {
default: n
};
function s(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function a(t, e, i) {
e && s(t.prototype, e);
i && s(t, i);
return t;
}
var o = (function() {
function t(t, e, i) {
void 0 === i && (i = r.default.PT_TRIANGLES);
this._vertexBuffer = t;
this._indexBuffer = e;
this._primitiveType = i;
this._start = 0;
this._count = -1;
}
a(t, [ {
key: "count",
get: function() {
return -1 !== this._count ? this._count : this._indexBuffer ? this._indexBuffer.count : this._vertexBuffer ? this._vertexBuffer.count : 0;
}
} ]);
return t;
})();
i.default = o;
e.exports = i.default;
}), {
"../gfx": 231
} ],
228: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = a(t("../gfx")), r = a(t("../enums")), s = a(t("../../core/value-types/value-type"));
function a(t) {
return t && t.__esModule ? t : {
default: t
};
}
var o = (function() {
function t(t, e, i, r, s, a) {
void 0 === s && (s = {});
void 0 === a && (a = {});
this._name = t;
this._detailName = e;
this._programName = i;
this._stage = r;
this._properties = s;
this._defines = a;
this._cullMode = n.default.CULL_BACK;
this._blend = !1;
this._blendEq = n.default.BLEND_FUNC_ADD;
this._blendAlphaEq = n.default.BLEND_FUNC_ADD;
this._blendSrc = n.default.BLEND_SRC_ALPHA;
this._blendDst = n.default.BLEND_ONE_MINUS_SRC_ALPHA;
this._blendSrcAlpha = n.default.BLEND_SRC_ALPHA;
this._blendDstAlpha = n.default.BLEND_ONE_MINUS_SRC_ALPHA;
this._blendColor = 4294967295;
this._depthTest = !1;
this._depthWrite = !1;
this._depthFunc = n.default.DS_FUNC_LESS, this._stencilTest = n.default.STENCIL_INHERIT;
this._stencilFuncFront = n.default.DS_FUNC_ALWAYS;
this._stencilRefFront = 0;
this._stencilMaskFront = 255;
this._stencilFailOpFront = n.default.STENCIL_OP_KEEP;
this._stencilZFailOpFront = n.default.STENCIL_OP_KEEP;
this._stencilZPassOpFront = n.default.STENCIL_OP_KEEP;
this._stencilWriteMaskFront = 255;
this._stencilFuncBack = n.default.DS_FUNC_ALWAYS;
this._stencilRefBack = 0;
this._stencilMaskBack = 255;
this._stencilFailOpBack = n.default.STENCIL_OP_KEEP;
this._stencilZFailOpBack = n.default.STENCIL_OP_KEEP;
this._stencilZPassOpBack = n.default.STENCIL_OP_KEEP;
this._stencilWriteMaskBack = 255;
}
var e = t.prototype;
e.setCullMode = function(t) {
void 0 === t && (t = n.default.CULL_BACK);
this._cullMode = t;
};
e.setBlend = function(t, e, i, r, s, a, o, c) {
void 0 === t && (t = !1);
void 0 === e && (e = n.default.BLEND_FUNC_ADD);
void 0 === i && (i = n.default.BLEND_SRC_ALPHA);
void 0 === r && (r = n.default.BLEND_ONE_MINUS_SRC_ALPHA);
void 0 === s && (s = n.default.BLEND_FUNC_ADD);
void 0 === a && (a = n.default.BLEND_SRC_ALPHA);
void 0 === o && (o = n.default.BLEND_ONE_MINUS_SRC_ALPHA);
void 0 === c && (c = 4294967295);
this._blend = t;
this._blendEq = e;
this._blendSrc = i;
this._blendDst = r;
this._blendAlphaEq = s;
this._blendSrcAlpha = a;
this._blendDstAlpha = o;
this._blendColor = c;
};
e.setDepth = function(t, e, i) {
void 0 === t && (t = !1);
void 0 === e && (e = !1);
void 0 === i && (i = n.default.DS_FUNC_LESS);
this._depthTest = t;
this._depthWrite = e;
this._depthFunc = i;
};
e.setStencilFront = function(t, e, i, r, s, a, o, c) {
void 0 === t && (t = n.default.STENCIL_INHERIT);
void 0 === e && (e = n.default.DS_FUNC_ALWAYS);
void 0 === i && (i = 0);
void 0 === r && (r = 255);
void 0 === s && (s = n.default.STENCIL_OP_KEEP);
void 0 === a && (a = n.default.STENCIL_OP_KEEP);
void 0 === o && (o = n.default.STENCIL_OP_KEEP);
void 0 === c && (c = 255);
this._stencilTest = t;
this._stencilFuncFront = e;
this._stencilRefFront = i;
this._stencilMaskFront = r;
this._stencilFailOpFront = s;
this._stencilZFailOpFront = a;
this._stencilZPassOpFront = o;
this._stencilWriteMaskFront = c;
};
e.setStencilEnabled = function(t) {
void 0 === t && (t = n.default.STENCIL_INHERIT);
this._stencilTest = t;
};
e.setStencilBack = function(t, e, i, r, s, a, o, c) {
void 0 === t && (t = n.default.STENCIL_INHERIT);
void 0 === e && (e = n.default.DS_FUNC_ALWAYS);
void 0 === i && (i = 0);
void 0 === r && (r = 255);
void 0 === s && (s = n.default.STENCIL_OP_KEEP);
void 0 === a && (a = n.default.STENCIL_OP_KEEP);
void 0 === o && (o = n.default.STENCIL_OP_KEEP);
void 0 === c && (c = 255);
this._stencilTest = t;
this._stencilFuncBack = e;
this._stencilRefBack = i;
this._stencilMaskBack = r;
this._stencilFailOpBack = s;
this._stencilZFailOpBack = a;
this._stencilZPassOpBack = o;
this._stencilWriteMaskBack = c;
};
e.setStage = function(t) {
this._stage = t;
};
e.setProperties = function(t) {
this._properties = t;
};
e.getProperty = function(t) {
if (this._properties[t]) return this._properties[t].value;
};
e.setProperty = function(t, e, i) {
var n = this._properties[t];
if (!n) return !1;
n.directly = i;
if (Array.isArray(e)) {
var a = n.value;
if (a.length !== e.length) {
cc.warnID(9105, this._name, t);
return;
}
for (var o = 0; o < e.length; o++) a[o] = e[o];
} else if (e && !ArrayBuffer.isView(e)) if (n.type === r.default.PARAM_TEXTURE_2D) n.value = e.getImpl(); else if (e instanceof s.default) e.constructor.toArray(n.value, e); else {
"object" == typeof e && cc.warnID(9106, this._name, t);
n.value = e;
} else n.value = e;
return !0;
};
e.getDefine = function(t) {
return this._defines[t];
};
e.define = function(t, e, i) {
if (!i && void 0 === this._defines[t]) return !1;
this._defines[t] = e;
return !0;
};
e.clone = function() {
var e = new t(this._programName);
Object.assign(e, this);
var i = {}, n = this._properties;
for (var r in n) {
var s = n[r], a = i[r] = {}, o = s.value;
Array.isArray(o) ? a.value = o.concat() : ArrayBuffer.isView(o) ? a.value = new o.__proto__.constructor(o) : a.value = o;
for (var c in s) "value" !== c && (a[c] = s[c]);
}
e._properties = i;
e._defines = Object.assign({}, this._defines);
return e;
};
return t;
})();
i.default = o;
e.exports = i.default;
}), {
"../../core/value-types/value-type": 219,
"../enums": 230,
"../gfx": 231
} ],
229: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
function n(t, e) {
for (var i = 0; i < e.length; i++) {
var n = e[i];
n.enumerable = n.enumerable || !1;
n.configurable = !0;
"value" in n && (n.writable = !0);
Object.defineProperty(t, n.key, n);
}
}
function r(t, e, i) {
e && n(t.prototype, e);
i && n(t, i);
return t;
}
var s = (function() {
function t(t, e) {
this._name = t;
this._passes = e;
}
t.prototype.clone = function() {
for (var e = [], i = 0; i < this._passes.length; i++) e.push(this._passes[i].clone());
return new t(this._name, e);
};
r(t, [ {
key: "name",
get: function() {
return this._name;
}
}, {
key: "passes",
get: function() {
return this._passes;
}
} ]);
return t;
})();
i.default = s;
e.exports = i.default;
}), {} ],
230: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
var n = t("./build/mappings"), r = {
PROJ_PERSPECTIVE: 0,
PROJ_ORTHO: 1,
LIGHT_DIRECTIONAL: 0,
LIGHT_POINT: 1,
LIGHT_SPOT: 2,
LIGHT_AMBIENT: 3,
SHADOW_NONE: 0,
SHADOW_HARD: 1,
SHADOW_SOFT: 2,
PARAM_INT: n.typeMap.int,
PARAM_INT2: n.typeMap.ivec2,
PARAM_INT3: n.typeMap.ivec3,
PARAM_INT4: n.typeMap.ivec4,
PARAM_FLOAT: n.typeMap.float,
PARAM_FLOAT2: n.typeMap.vec2,
PARAM_FLOAT3: n.typeMap.vec3,
PARAM_FLOAT4: n.typeMap.vec4,
PARAM_MAT2: n.typeMap.mat2,
PARAM_MAT3: n.typeMap.mat3,
PARAM_MAT4: n.typeMap.mat4,
PARAM_TEXTURE_2D: n.typeMap.sampler2D,
PARAM_TEXTURE_CUBE: n.typeMap.samplerCube,
CLEAR_COLOR: 1,
CLEAR_DEPTH: 2,
CLEAR_STENCIL: 4,
CLEAR_SKYBOX: 8,
BUFFER_VIEW_INT8: 0,
BUFFER_VIEW_UINT8: 1,
BUFFER_VIEW_INT16: 2,
BUFFER_VIEW_UINT16: 3,
BUFFER_VIEW_INT32: 4,
BUFFER_VIEW_UINT32: 5,
BUFFER_VIEW_FLOAT32: 6
};
i.default = r;
e.exports = i.default;
}), {
"./build/mappings": 226
} ],
231: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = void 0;
t("./enums");
var n, r = n = window.gfx;
i.default = r;
cc.gfx = n;
e.exports = i.default;
}), {
"./device": void 0,
"./enums": void 0,
"./frame-buffer": void 0,
"./index-buffer": void 0,
"./program": void 0,
"./render-buffer": void 0,
"./texture": void 0,
"./texture-2d": void 0,
"./texture-cube": void 0,
"./vertex-buffer": void 0,
"./vertex-format": void 0
} ],
232: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.default = function(t, e) {
for (var i, n = t.length, r = e ^ n, s = 0; n >= 4; ) {
i = 1540483477 * (65535 & (i = 255 & t.charCodeAt(s) | (255 & t.charCodeAt(++s)) << 8 | (255 & t.charCodeAt(++s)) << 16 | (255 & t.charCodeAt(++s)) << 24)) + ((1540483477 * (i >>> 16) & 65535) << 16);
r = 1540483477 * (65535 & r) + ((1540483477 * (r >>> 16) & 65535) << 16) ^ (i = 1540483477 * (65535 & (i ^= i >>> 24)) + ((1540483477 * (i >>> 16) & 65535) << 16));
n -= 4;
++s;
}
switch (n) {
case 3:
r ^= (255 & t.charCodeAt(s + 2)) << 16;

case 2:
r ^= (255 & t.charCodeAt(s + 1)) << 8;

case 1:
r = 1540483477 * (65535 & (r ^= 255 & t.charCodeAt(s))) + ((1540483477 * (r >>> 16) & 65535) << 16);
}
r = 1540483477 * (65535 & (r ^= r >>> 13)) + ((1540483477 * (r >>> 16) & 65535) << 16);
return (r ^= r >>> 15) >>> 0;
};
e.exports = i.default;
}), {} ],
233: [ (function(t, e, i) {
"use strict";
i.__esModule = !0;
i.getInspectorProps = function(t) {
var e = {
type: t.type
};
Object.assign(e, t.editor || t.inspector);
e.defines = t.defines;
e.value = m(e.type)(t.value);
t.range && (e.range = t.range);
var i = y(e.type);
e.typeName = E[i] || i;
e.valueCtor = d[e.type];
if ("cc.Texture2D" == e.typeName) {
e.typeName = "cc.Asset";
e.assetType = "cc.Texture2D";
}
return e;
};
i.getClassName = i.getInstanceCtor = i.getInstanceType = i.enums2default = i.ctor2enums = void 0;
var n, r, s, a, o = l(t("./enums")), c = t("../core/value-types"), u = l(t("../core/assets/CCTexture2D"));
function l(t) {
return t && t.__esModule ? t : {
default: t
};
}
var h;
h = gfx.Texture2D;
var f = cc.Object, _ = ((n = {})[Boolean] = function(t) {
return t || !1;
}, n[Number] = function(t) {
return t ? ArrayBuffer.isView(t) ? t[0] : t : 0;
}, n[c.Vec2] = function(t) {
return t ? cc.v2(t[0], t[1]) : cc.v2();
}, n[c.Vec3] = function(t) {
return t ? cc.v3(t[0], t[1], t[2]) : cc.v3();
}, n[c.Vec4] = function(t) {
return t ? cc.v4(t[0], t[1], t[2], t[3]) : cc.v4();
}, n[c.Color] = function(t) {
return t ? cc.color(255 * t[0], 255 * t[1], 255 * t[2], 255 * (t[3] || 1)) : cc.color();
}, n[c.Mat4] = function(t) {
return t ? cc.mat4(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]) : cc.mat4();
}, n[u.default] = function() {
return null;
}, n[f] = function() {
return null;
}, n), d = ((r = {})[o.default.PARAM_INT] = Number, r[o.default.PARAM_INT2] = c.Vec2, 
r[o.default.PARAM_INT3] = c.Vec3, r[o.default.PARAM_INT4] = c.Vec4, r[o.default.PARAM_FLOAT] = Number, 
r[o.default.PARAM_FLOAT2] = c.Vec2, r[o.default.PARAM_FLOAT3] = c.Vec3, r[o.default.PARAM_FLOAT4] = c.Vec4, 
r[o.default.PARAM_MAT4] = c.Mat4, r[o.default.PARAM_TEXTURE_2D] = u.default, r.color = c.Color, 
r.number = Number, r.boolean = Boolean, r.default = f, r), p = ((s = {})[Number] = o.default.PARAM_FLOAT, 
s[c.Vec2] = o.default.PARAM_FLOAT2, s[c.Vec3] = o.default.PARAM_FLOAT3, s[c.Vec4] = o.default.PARAM_FLOAT4, 
s[c.Color] = o.default.PARAM_COLOR3, s[c.Color] = o.default.PARAM_COLOR4, s[c.Mat4] = o.default.PARAM_MAT4, 
s[u.default] = o.default.PARAM_TEXTURE_2D, s[h] = o.default.PARAM_TEXTURE_2D, s);
i.ctor2enums = p;
var v = ((a = {})[o.default.PARAM_INT] = new Uint32Array([ 0 ]), a[o.default.PARAM_INT2] = new Uint32Array([ 0, 0 ]), 
a[o.default.PARAM_INT3] = new Uint32Array([ 0, 0, 0 ]), a[o.default.PARAM_INT4] = new Uint32Array([ 0, 0, 0, 0 ]), 
a[o.default.PARAM_FLOAT] = new Float32Array([ 0 ]), a[o.default.PARAM_FLOAT2] = new Float32Array([ 0, 0 ]), 
a[o.default.PARAM_FLOAT3] = new Float32Array([ 0, 0, 0 ]), a[o.default.PARAM_FLOAT4] = new Float32Array([ 0, 0, 0, 0 ]), 
a[o.default.PARAM_MAT4] = cc.mat4().m, a[o.default.PARAM_TEXTURE_2D] = null, a.number = 0, 
a.boolean = !1, a);
i.enums2default = v;
var g = function(t) {
return d[t] || d.default;
};
i.getInstanceType = g;
var m = function(t) {
return _[g(t)];
};
i.getInstanceCtor = m;
var y = function(t) {
return cc.js.getClassName(g(t));
};
i.getClassName = y;
var E = {
Number: "number",
Boolean: "boolean"
};
}), {
"../core/assets/CCTexture2D": 73,
"../core/value-types": 211,
"./enums": 230,
"./gfx/texture-2d": void 0
} ],
234: [ (function(t, e) {
"use strict";
var i = cc.Class({
name: "cc.TiledMapAsset",
extends: cc.Asset,
properties: {
tmxXmlStr: "",
textures: {
default: [],
type: [ cc.Texture2D ]
},
textureNames: [ cc.String ],
textureSizes: {
default: [],
type: [ cc.Size ]
},
imageLayerTextures: {
default: [],
type: [ cc.Texture2D ]
},
imageLayerTextureNames: [ cc.String ],
tsxFiles: [ cc.TextAsset ],
tsxFileNames: [ cc.String ]
},
statics: {
preventDeferredLoadDependents: !0
},
createNode: !1
});
cc.TiledMapAsset = i;
e.exports = i;
}), {} ],
235: [ (function(t, e) {
"use strict";
var i = t("./video-player-impl"), n = i.EventType, r = cc.Enum({
REMOTE: 0,
LOCAL: 1
}), s = cc.Class({
name: "cc.VideoPlayer",
extends: cc.Component,
editor: !1,
properties: {
_resourceType: r.REMOTE,
resourceType: {
tooltip: !1,
type: r,
set: function(t) {
this._resourceType = t;
this._updateVideoSource();
},
get: function() {
return this._resourceType;
}
},
_remoteURL: "",
remoteURL: {
tooltip: !1,
type: cc.String,
set: function(t) {
this._remoteURL = t;
this._updateVideoSource();
},
get: function() {
return this._remoteURL;
}
},
_clip: {
default: null,
type: cc.Asset
},
clip: {
tooltip: !1,
get: function() {
return this._clip;
},
set: function(t) {
this._clip = t;
this._updateVideoSource();
},
type: cc.Asset
},
currentTime: {
tooltip: !1,
type: cc.Float,
set: function(t) {
this._impl && this._impl.seekTo(t);
},
get: function() {
return this._impl ? this._currentStatus === n.NONE || this._currentStatus === n.STOPPED || this._currentStatus === n.META_LOADED || this._currentStatus === n.READY_TO_PLAY ? 0 : this._currentStatus === n.COMPLETED ? this._impl.duration() : this._impl.currentTime() : -1;
}
},
_volume: 1,
volume: {
get: function() {
return this._volume;
},
set: function(t) {
this._volume = t;
this.isPlaying() && !this._mute && this._syncVolume();
},
range: [ 0, 1 ],
type: cc.Float,
tooltip: !1
},
_mute: !1,
mute: {
get: function() {
return this._mute;
},
set: function(t) {
this._mute = t;
this._syncVolume();
},
tooltip: !1
},
keepAspectRatio: {
tooltip: !1,
default: !0,
type: cc.Boolean,
notify: function() {
this._impl && this._impl.setKeepAspectRatioEnabled(this.keepAspectRatio);
}
},
_isFullscreen: {
default: !1,
formerlySerializedAs: "_N$isFullscreen"
},
isFullscreen: {
get: function() {
this._isFullscreen = this._impl && this._impl.isFullScreenEnabled();
return this._isFullscreen;
},
set: function(t) {
this._isFullscreen = t;
this._impl && this._impl.setFullScreenEnabled(t);
},
animatable: !1,
tooltip: !1
},
_stayOnBottom: !1,
stayOnBottom: {
get: function() {
return this._stayOnBottom;
},
set: function(t) {
this._stayOnBottom = t;
this._impl && this._impl.setStayOnBottom(t);
},
animatable: !1,
tooltip: !1
},
videoPlayerEvent: {
default: [],
type: cc.Component.EventHandler
}
},
statics: {
EventType: n,
ResourceType: r,
Impl: i
},
ctor: function() {
this._impl = new i();
this._currentStatus = n.NONE;
},
_syncVolume: function() {
var t = this._impl;
if (t) {
var e = this._mute ? 0 : this._volume;
t.setVolume(e);
}
},
_updateVideoSource: function() {
var t = "";
this.resourceType === r.REMOTE ? t = this.remoteURL : this._clip && (t = this._clip.nativeUrl);
this._impl.setURL(t, this._mute || 0 === this._volume);
this._impl.setKeepAspectRatioEnabled(this.keepAspectRatio);
},
onLoad: function() {
var t = this._impl;
if (t) {
t.createDomElementIfNeeded(this._mute || 0 === this._volume);
t.setStayOnBottom(this._stayOnBottom);
this._updateVideoSource();
t.seekTo(this.currentTime);
t.setFullScreenEnabled(this._isFullscreen);
this.pause();
t.setEventListener(n.PLAYING, this.onPlaying.bind(this));
t.setEventListener(n.PAUSED, this.onPasued.bind(this));
t.setEventListener(n.STOPPED, this.onStopped.bind(this));
t.setEventListener(n.COMPLETED, this.onCompleted.bind(this));
t.setEventListener(n.META_LOADED, this.onMetaLoaded.bind(this));
t.setEventListener(n.CLICKED, this.onClicked.bind(this));
t.setEventListener(n.READY_TO_PLAY, this.onReadyToPlay.bind(this));
}
},
onRestore: function() {
this._impl || (this._impl = new i());
},
onEnable: function() {
this._impl && this._impl.enable();
},
onDisable: function() {
this._impl && this._impl.disable();
},
onDestroy: function() {
if (this._impl) {
this._impl.destroy();
this._impl = null;
}
},
update: function() {
this._impl && this._impl.updateMatrix(this.node);
},
onReadyToPlay: function() {
this._currentStatus = n.READY_TO_PLAY;
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, n.READY_TO_PLAY);
this.node.emit("ready-to-play", this);
},
onMetaLoaded: function() {
this._currentStatus = n.META_LOADED;
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, n.META_LOADED);
this.node.emit("meta-loaded", this);
},
onClicked: function() {
this._currentStatus = n.CLICKED;
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, n.CLICKED);
this.node.emit("clicked", this);
},
onPlaying: function() {
this._currentStatus = n.PLAYING;
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, n.PLAYING);
this.node.emit("playing", this);
},
onPasued: function() {
this._currentStatus = n.PAUSED;
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, n.PAUSED);
this.node.emit("paused", this);
},
onStopped: function() {
this._currentStatus = n.STOPPED;
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, n.STOPPED);
this.node.emit("stopped", this);
},
onCompleted: function() {
this._currentStatus = n.COMPLETED;
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, n.COMPLETED);
this.node.emit("completed", this);
},
play: function() {
if (this._impl) {
this._syncVolume();
this._impl.play();
}
},
resume: function() {
if (this._impl) {
this._syncVolume();
this._impl.resume();
}
},
pause: function() {
this._impl && this._impl.pause();
},
stop: function() {
this._impl && this._impl.stop();
},
getDuration: function() {
return this._impl ? this._impl.duration() : -1;
},
isPlaying: function() {
return !!this._impl && this._impl.isPlaying();
}
});
cc.VideoPlayer = e.exports = s;
}), {
"./video-player-impl": 236
} ],
236: [ (function(t, e) {
"use strict";
var i = t("../core/platform/utils"), n = t("../core/platform/CCSys"), r = t("../core/platform/CCMacro"), s = 1, a = 4, o = cc.mat4(), c = cc.Class({
name: "VideoPlayerImpl",
ctor: function() {
this._EventList = {};
this._video = null;
this._url = "";
this._waitingFullscreen = !1;
this._fullScreenEnabled = !1;
this._stayOnBottom = !1;
this._loadedmeta = !1;
this._loaded = !1;
this._visible = !1;
this._playing = !1;
this._ignorePause = !1;
this._forceUpdate = !1;
this._m00 = 0;
this._m01 = 0;
this._m04 = 0;
this._m05 = 0;
this._m12 = 0;
this._m13 = 0;
this._w = 0;
this._h = 0;
this.__eventListeners = {};
},
_bindEvent: function() {
var t = this._video, e = this, i = this.__eventListeners;
i.loadedmetadata = function() {
e._loadedmeta = !0;
e._forceUpdate = !0;
if (e._waitingFullscreen) {
e._waitingFullscreen = !1;
e._toggleFullscreen(!0);
}
e._dispatchEvent(c.EventType.META_LOADED);
};
i.ended = function() {
if (e._video === t) {
e._playing = !1;
e._dispatchEvent(c.EventType.COMPLETED);
}
};
i.play = function() {
if (e._video === t) {
e._playing = !0;
e._updateVisibility();
e._dispatchEvent(c.EventType.PLAYING);
}
};
i.pause = function() {
if (e._video === t) {
e._playing = !1;
e._ignorePause || e._dispatchEvent(c.EventType.PAUSED);
}
};
i.click = function() {
e._dispatchEvent(c.EventType.CLICKED);
};
t.addEventListener("loadedmetadata", i.loadedmetadata);
t.addEventListener("ended", i.ended);
t.addEventListener("play", i.play);
t.addEventListener("pause", i.pause);
t.addEventListener("click", i.click);
i.onCanPlay = function() {
if (!e._loaded && !e._playing) {
var t = e._video;
if (t.readyState === a || t.readyState === s) {
t.currentTime = 0;
e._loaded = !0;
e._forceUpdate = !0;
e._dispatchEvent(c.EventType.READY_TO_PLAY);
e._updateVisibility();
}
}
};
t.addEventListener("canplay", i.onCanPlay);
t.addEventListener("canplaythrough", i.onCanPlay);
t.addEventListener("suspend", i.onCanPlay);
},
_updateVisibility: function() {
var t = this._video;
if (t) if (this._visible) t.style.visibility = "visible"; else {
t.style.visibility = "hidden";
t.pause();
this._playing = !1;
}
},
_updateSize: function(t, e) {
var i = this._video;
if (i) {
i.style.width = t + "px";
i.style.height = e + "px";
}
},
_createDom: function(t) {
var e = document.createElement("video");
e.style.position = "absolute";
e.style.bottom = "0px";
e.style.left = "0px";
e.style["z-index"] = this._stayOnBottom ? r.MIN_ZINDEX : 0;
e.className = "cocosVideo";
e.setAttribute("preload", "auto");
e.setAttribute("webkit-playsinline", "");
e.setAttribute("x5-playsinline", "");
e.setAttribute("playsinline", "");
t && e.setAttribute("muted", "");
this._video = e;
cc.game.container.appendChild(e);
},
createDomElementIfNeeded: function(t) {
this._video || this._createDom(t);
},
removeDom: function() {
var t = this._video;
if (t) {
i.contains(cc.game.container, t) && cc.game.container.removeChild(t);
var e = this.__eventListeners;
t.removeEventListener("loadedmetadata", e.loadedmetadata);
t.removeEventListener("ended", e.ended);
t.removeEventListener("play", e.play);
t.removeEventListener("pause", e.pause);
t.removeEventListener("click", e.click);
t.removeEventListener("canplay", e.onCanPlay);
t.removeEventListener("canplaythrough", e.onCanPlay);
t.removeEventListener("suspend", e.onCanPlay);
e.loadedmetadata = null;
e.ended = null;
e.play = null;
e.pause = null;
e.click = null;
e.onCanPlay = null;
}
this._video = null;
this._url = "";
},
setURL: function(t, e) {
var i, n;
if (this._url !== t) {
this.removeDom();
this._url = t;
this.createDomElementIfNeeded(e);
this._bindEvent();
var r = this._video;
r.style.visibility = "hidden";
this._loaded = !1;
this._playing = !1;
this._loadedmeta = !1;
(i = document.createElement("source")).src = t;
r.appendChild(i);
n = cc.path.extname(t);
for (var s = c._polyfill, a = 0; a < s.canPlayType.length; a++) if (n !== s.canPlayType[a]) {
(i = document.createElement("source")).src = t.replace(n, s.canPlayType[a]);
r.appendChild(i);
}
}
},
getURL: function() {
return this._url;
},
play: function() {
var t = this._video;
t && this._visible && !this._playing && t.play();
},
pause: function() {
var t = this._video;
this._playing && t && t.pause();
},
resume: function() {
this.play();
},
stop: function() {
var t = this._video;
if (t && this._visible) {
this._ignorePause = !0;
t.currentTime = 0;
t.pause();
setTimeout(function() {
this._dispatchEvent(c.EventType.STOPPED);
this._ignorePause = !1;
}.bind(this), 0);
}
},
setVolume: function(t) {
var e = this._video;
e && (e.volume = t);
},
seekTo: function(t) {
var e = this._video;
e && (this._loaded ? e.currentTime = t : e.addEventListener(c._polyfill.event, (function i() {
e.currentTime = t;
e.removeEventListener(c._polyfill.event, i);
})));
},
isPlaying: function() {
return this._playing;
},
duration: function() {
var t = this._video, e = -1;
if (!t) return e;
(e = t.duration) <= 0 && cc.logID(7702);
return e;
},
currentTime: function() {
var t = this._video;
return t ? t.currentTime : -1;
},
setKeepAspectRatioEnabled: function() {
cc.logID(7700);
},
isKeepAspectRatioEnabled: function() {
return !0;
},
_toggleFullscreen: function(t) {
var e = this, i = this._video;
if (i) if (t) {
n.browserType === n.BROWSER_TYPE_IE && (i.style.transform = "");
cc.screen.requestFullScreen(i, (function() {
var t = n.browserType === n.BROWSER_TYPE_IE ? document.msFullscreenElement : document.fullscreenElement;
e._fullScreenEnabled = t === i;
}), (function() {
e._fullScreenEnabled = !1;
}));
} else cc.screen.fullScreen() && cc.screen.exitFullScreen(i);
},
setStayOnBottom: function(t) {
this._stayOnBottom = t;
this._video && (this._video.style["z-index"] = t ? r.MIN_ZINDEX : 0);
},
setFullScreenEnabled: function(t) {
!this._loadedmeta && t ? this._waitingFullscreen = !0 : this._toggleFullscreen(t);
},
isFullScreenEnabled: function() {
return this._fullScreenEnabled;
},
setEventListener: function(t, e) {
this._EventList[t] = e;
},
removeEventListener: function(t) {
this._EventList[t] = null;
},
_dispatchEvent: function(t) {
var e = this._EventList[t];
e && e.call(this, this, this._video.src);
},
onPlayEvent: function() {
this._EventList[c.EventType.PLAYING].call(this, this, this._video.src);
},
enable: function() {
var t = c.elements;
-1 === t.indexOf(this) && t.push(this);
this.setVisible(!0);
},
disable: function() {
var t = c.elements, e = t.indexOf(this);
-1 !== e && t.splice(e, 1);
this.setVisible(!1);
},
destroy: function() {
this.disable();
this.removeDom();
},
setVisible: function(t) {
if (this._visible !== t) {
this._visible = !!t;
this._updateVisibility();
}
},
updateMatrix: function(t) {
if (this._video && this._visible && !this._fullScreenEnabled) {
t.getWorldMatrix(o);
var e = cc.Camera._findRendererCamera(t);
e && e.worldMatrixToScreen(o, o, cc.game.canvas.width, cc.game.canvas.height);
var i = o.m;
if (this._forceUpdate || this._m00 !== i[0] || this._m01 !== i[1] || this._m04 !== i[4] || this._m05 !== i[5] || this._m12 !== i[12] || this._m13 !== i[13] || this._w !== t._contentSize.width || this._h !== t._contentSize.height) {
this._m00 = i[0];
this._m01 = i[1];
this._m04 = i[4];
this._m05 = i[5];
this._m12 = i[12];
this._m13 = i[13];
this._w = t._contentSize.width;
this._h = t._contentSize.height;
var r, s, a = cc.view._devicePixelRatio, u = 1 / a, l = 1 / a, h = cc.game.container, f = i[0] * u, _ = i[1], d = i[4], p = i[5] * l, v = h && h.style.paddingLeft ? parseInt(h.style.paddingLeft) : 0, g = h && h.style.paddingBottom ? parseInt(h.style.paddingBottom) : 0;
if (c._polyfill.zoomInvalid) {
this._updateSize(this._w * f, this._h * p);
f = 1;
p = 1;
r = this._w * u;
s = this._h * l;
} else {
r = this._w * u;
s = this._h * l;
this._updateSize(this._w, this._h);
}
var m = r * i[0] * t._anchorPoint.x, y = s * i[5] * t._anchorPoint.y, E = "matrix(" + f + "," + -_ + "," + -d + "," + p + "," + (i[12] * u - m + v) + "," + -(i[13] * l - y + g) + ")";
this._video.style.transform = E;
this._video.style["-webkit-transform"] = E;
this._video.style["transform-origin"] = "0px 100% 0px";
this._video.style["-webkit-transform-origin"] = "0px 100% 0px";
n.browserType !== n.BROWSER_TYPE_IE && (this._forceUpdate = !1);
}
}
}
});
c.EventType = {
NONE: -1,
PLAYING: 0,
PAUSED: 1,
STOPPED: 2,
COMPLETED: 3,
META_LOADED: 4,
CLICKED: 5,
READY_TO_PLAY: 6
};
c.elements = [];
c.pauseElements = [];
cc.game.on(cc.game.EVENT_HIDE, (function() {
for (var t, e = c.elements, i = 0; i < e.length; i++) if ((t = e[i]).isPlaying()) {
t.pause();
c.pauseElements.push(t);
}
}));
cc.game.on(cc.game.EVENT_SHOW, (function() {
for (var t = c.pauseElements, e = t.pop(); e; ) {
e.play();
e = t.pop();
}
}));
c._polyfill = {
devicePixelRatio: !1,
event: "canplay",
canPlayType: []
};
var u = document.createElement("video");
if (u.canPlayType) {
if (u.canPlayType("video/ogg")) {
c._polyfill.canPlayType.push(".ogg");
c._polyfill.canPlayType.push(".ogv");
}
u.canPlayType("video/mp4") && c._polyfill.canPlayType.push(".mp4");
u.canPlayType("video/webm") && c._polyfill.canPlayType.push(".webm");
}
n.OS_ANDROID !== n.os || n.browserType !== n.BROWSER_TYPE_SOUGOU && n.browserType !== n.BROWSER_TYPE_360 || (c._polyfill.zoomInvalid = !0);
var l = document.createElement("style");
l.innerHTML = ".cocosVideo:-moz-full-screen{transform:matrix(1,0,0,1,0,0) !important;}.cocosVideo:full-screen{transform:matrix(1,0,0,1,0,0) !important;}.cocosVideo:-webkit-full-screen{transform:matrix(1,0,0,1,0,0) !important;}";
document.head.appendChild(l);
e.exports = c;
}), {
"../core/platform/CCMacro": 133,
"../core/platform/CCSys": 137,
"../core/platform/utils": 152
} ],
237: [ (function(t, e) {
"use strict";
var i = t("./webview-impl"), n = i.EventType;
function r() {}
var s = cc.Class({
name: "cc.WebView",
extends: cc.Component,
editor: !1,
properties: {
_url: "",
url: {
type: cc.String,
tooltip: !1,
get: function() {
return this._url;
},
set: function(t) {
this._url = t;
var e = this._impl;
e && e.loadURL(t);
}
},
webviewEvents: {
default: [],
type: cc.Component.EventHandler
}
},
statics: {
EventType: n,
Impl: i
},
ctor: function() {
this._impl = new s.Impl();
},
onRestore: function() {
this._impl || (this._impl = new s.Impl());
},
onEnable: function() {
var t = this._impl;
t.createDomElementIfNeeded(this.node.width, this.node.height);
t.setEventListener(n.LOADED, this._onWebViewLoaded.bind(this));
t.setEventListener(n.LOADING, this._onWebViewLoading.bind(this));
t.setEventListener(n.ERROR, this._onWebViewLoadError.bind(this));
t.loadURL(this._url);
t.setVisible(!0);
},
onDisable: function() {
var t = this._impl;
t.setVisible(!1);
t.setEventListener(n.LOADED, r);
t.setEventListener(n.LOADING, r);
t.setEventListener(n.ERROR, r);
},
onDestroy: function() {
if (this._impl) {
this._impl.destroy();
this._impl = null;
}
},
update: function() {
this._impl && this._impl.updateMatrix(this.node);
},
_onWebViewLoaded: function() {
cc.Component.EventHandler.emitEvents(this.webviewEvents, this, n.LOADED);
this.node.emit("loaded", this);
},
_onWebViewLoading: function() {
cc.Component.EventHandler.emitEvents(this.webviewEvents, this, n.LOADING);
this.node.emit("loading", this);
return !0;
},
_onWebViewLoadError: function() {
cc.Component.EventHandler.emitEvents(this.webviewEvents, this, n.ERROR);
this.node.emit("error", this);
},
setJavascriptInterfaceScheme: function(t) {
this._impl && this._impl.setJavascriptInterfaceScheme(t);
},
setOnJSCallback: function(t) {
this._impl && this._impl.setOnJSCallback(t);
},
evaluateJS: function(t) {
this._impl && this._impl.evaluateJS(t);
}
});
cc.WebView = e.exports = s;
}), {
"./webview-impl": 238
} ],
238: [ (function(t, e) {
"use strict";
var i = t("../core/platform/utils"), n = t("../core/platform/CCSys"), r = cc.mat4(), s = cc.Class({
name: "WebViewImpl",
ctor: function() {
this._EventList = {};
this._visible = !1;
this._parent = null;
this._div = null;
this._iframe = null;
this._listener = null;
this._forceUpdate = !1;
this._m00 = 0;
this._m01 = 0;
this._m04 = 0;
this._m05 = 0;
this._m12 = 0;
this._m13 = 0;
this._w = 0;
this._h = 0;
this.__eventListeners = {};
},
_updateVisibility: function() {
if (this._div) {
var t = this._div;
this._visible ? t.style.visibility = "visible" : t.style.visibility = "hidden";
}
},
_updateSize: function(t, e) {
var i = this._div;
if (i) {
i.style.width = t + "px";
i.style.height = e + "px";
}
},
_initEvent: function() {
var t = this._iframe;
if (t) {
var e = this.__eventListeners, i = this;
e.load = function() {
i._forceUpdate = !0;
i._dispatchEvent(s.EventType.LOADED);
};
e.error = function() {
i._dispatchEvent(s.EventType.ERROR);
};
t.addEventListener("load", e.load);
t.addEventListener("error", e.error);
}
},
_initStyle: function() {
if (this._div) {
var t = this._div;
t.style.position = "absolute";
t.style.bottom = "0px";
t.style.left = "0px";
}
},
_setOpacity: function(t) {
var e = this._iframe;
e && e.style && (e.style.opacity = t / 255);
},
_createDom: function(t, e) {
if (s._polyfill.enableDiv) {
this._div = document.createElement("div");
this._div.style["-webkit-overflow"] = "auto";
this._div.style["-webkit-overflow-scrolling"] = "touch";
this._iframe = document.createElement("iframe");
this._div.appendChild(this._iframe);
this._iframe.style.width = "100%";
this._iframe.style.height = "100%";
} else this._div = this._iframe = document.createElement("iframe");
s._polyfill.enableBG && (this._div.style.background = "#FFF");
this._div.style.height = e + "px";
this._div.style.width = t + "px";
this._div.style.overflow = "scroll";
this._iframe.style.border = "none";
cc.game.container.appendChild(this._div);
this._updateVisibility();
},
_createNativeControl: function(t, e) {
this._createDom(t, e);
this._initStyle();
this._initEvent();
},
createDomElementIfNeeded: function(t, e) {
this._div ? this._updateSize(t, e) : this._createNativeControl(t, e);
},
removeDom: function() {
var t = this._div;
if (t) {
i.contains(cc.game.container, t) && cc.game.container.removeChild(t);
this._div = null;
}
var e = this._iframe;
if (e) {
var n = this.__eventListeners;
e.removeEventListener("load", n.load);
e.removeEventListener("error", n.error);
n.load = null;
n.error = null;
this._iframe = null;
}
},
setOnJSCallback: function() {},
setJavascriptInterfaceScheme: function() {},
loadData: function() {},
loadHTMLString: function() {},
loadURL: function(t) {
var e = this._iframe;
if (e) {
e.src = t;
var i = this;
e.addEventListener("load", (function t() {
i._loaded = !0;
i._updateVisibility();
e.removeEventListener("load", t);
}));
this._dispatchEvent(s.EventType.LOADING);
}
},
stopLoading: function() {
cc.logID(7800);
},
reload: function() {
var t = this._iframe;
if (t) {
var e = t.contentWindow;
e && e.location && e.location.reload();
}
},
canGoBack: function() {
cc.logID(7801);
return !0;
},
canGoForward: function() {
cc.logID(7802);
return !0;
},
goBack: function() {
try {
if (s._polyfill.closeHistory) return cc.logID(7803);
var t = this._iframe;
if (t) {
var e = t.contentWindow;
e && e.location && e.history.back.call(e);
}
} catch (t) {
cc.log(t);
}
},
goForward: function() {
try {
if (s._polyfill.closeHistory) return cc.logID(7804);
var t = this._iframe;
if (t) {
var e = t.contentWindow;
e && e.location && e.history.forward.call(e);
}
} catch (t) {
cc.log(t);
}
},
evaluateJS: function(t) {
var e = this._iframe;
if (e) {
var i = e.contentWindow;
try {
i.eval(t);
this._dispatchEvent(s.EventType.JS_EVALUATED);
} catch (t) {
console.error(t);
}
}
},
setScalesPageToFit: function() {
cc.logID(7805);
},
setEventListener: function(t, e) {
this._EventList[t] = e;
},
removeEventListener: function(t) {
this._EventList[t] = null;
},
_dispatchEvent: function(t) {
var e = this._EventList[t];
e && e.call(this, this, this._iframe.src);
},
_createRenderCmd: function() {
return new s.RenderCmd(this);
},
destroy: function() {
this.removeDom();
},
setVisible: function(t) {
if (this._visible !== t) {
this._visible = !!t;
this._updateVisibility();
}
},
updateMatrix: function(t) {
if (this._div && this._visible) {
t.getWorldMatrix(r);
var e = cc.Camera._findRendererCamera(t);
e && e.worldMatrixToScreen(r, r, cc.game.canvas.width, cc.game.canvas.height);
var i = r.m;
if (this._forceUpdate || this._m00 !== i[0] || this._m01 !== i[1] || this._m04 !== i[4] || this._m05 !== i[5] || this._m12 !== i[12] || this._m13 !== i[13] || this._w !== t._contentSize.width || this._h !== t._contentSize.height) {
this._m00 = i[0];
this._m01 = i[1];
this._m04 = i[4];
this._m05 = i[5];
this._m12 = i[12];
this._m13 = i[13];
this._w = t._contentSize.width;
this._h = t._contentSize.height;
var n = cc.view._devicePixelRatio, s = 1 / n, a = 1 / n, o = cc.game.container, c = i[0] * s, u = i[1], l = i[4], h = i[5] * a, f = o && o.style.paddingLeft ? parseInt(o.style.paddingLeft) : 0, _ = o && o.style.paddingBottom ? parseInt(o.style.paddingBottom) : 0;
this._updateSize(this._w, this._h);
var d = this._w * s, p = this._h * a, v = d * i[0] * t._anchorPoint.x, g = p * i[5] * t._anchorPoint.y, m = "matrix(" + c + "," + -u + "," + -l + "," + h + "," + (i[12] * s - v + f) + "," + -(i[13] * a - g + _) + ")";
this._div.style.transform = m;
this._div.style["-webkit-transform"] = m;
this._div.style["transform-origin"] = "0px 100% 0px";
this._div.style["-webkit-transform-origin"] = "0px 100% 0px";
this._setOpacity(t.opacity);
this._forceUpdate = !1;
}
}
}
});
s.EventType = {
LOADING: 0,
LOADED: 1,
ERROR: 2,
JS_EVALUATED: 3
};
var a = s._polyfill = {
devicePixelRatio: !1,
enableDiv: !1
};
n.os === n.OS_IOS && (a.enableDiv = !0);
n.isMobile ? n.browserType === n.BROWSER_TYPE_FIREFOX && (a.enableBG = !0) : n.browserType === n.BROWSER_TYPE_IE && (a.closeHistory = !0);
e.exports = s;
}), {
"../core/platform/CCSys": 137,
"../core/platform/utils": 152
} ],
239: [ (function(t) {
"use strict";
t("./cocos2d/core");
t("./cocos2d/animation");
t("./cocos2d/particle");
t("./cocos2d/tilemap");
t("./cocos2d/videoplayer/CCVideoPlayer");
t("./cocos2d/webview/CCWebView");
t("./cocos2d/core/components/CCStudioComponent");
t("./extensions/ccpool/CCNodePool");
t("./cocos2d/actions");
t("./extensions/spine");
t("./extensions/dragonbones");
t("./cocos2d/deprecated");
}), {
"./cocos2d/actions": 7,
"./cocos2d/animation": 16,
"./cocos2d/core": 126,
"./cocos2d/core/components/CCStudioComponent": 107,
"./cocos2d/deprecated": 223,
"./cocos2d/particle": void 0,
"./cocos2d/particle/CCParticleAsset": 225,
"./cocos2d/tilemap": void 0,
"./cocos2d/tilemap/CCTiledMapAsset": 234,
"./cocos2d/videoplayer/CCVideoPlayer": 235,
"./cocos2d/webview/CCWebView": 237,
"./extensions/ccpool/CCNodePool": void 0,
"./extensions/dragonbones": void 0,
"./extensions/spine": void 0
} ],
240: [ (function(t, e) {
"use strict";
var i = "undefined" == typeof window ? global : window;
i.cc = i.cc || {};
cc.internal = cc.internal || {};
t("./predefine");
t("./polyfill/string");
t("./polyfill/misc");
t("./polyfill/array");
t("./polyfill/object");
t("./polyfill/array-buffer");
t("./polyfill/number");
t("./polyfill/typescript");
t("./cocos2d/core/predefine");
t("./cocos2d");
t("./extends");
e.exports = i.cc;
}), {
"./cocos2d": 224,
"./cocos2d/core/predefine": 153,
"./extends": 239,
"./package": void 0,
"./polyfill/array": 242,
"./polyfill/array-buffer": 241,
"./polyfill/misc": 243,
"./polyfill/number": 244,
"./polyfill/object": 245,
"./polyfill/string": 246,
"./polyfill/typescript": 247,
"./predefine": 248
} ],
241: [ (function() {
"use strict";
if (!ArrayBuffer.isView) {
var t = Object.getPrototypeOf(Int8Array);
ArrayBuffer.isView = "function" == typeof t ? function(e) {
return e instanceof t;
} : function(t) {
if ("object" != typeof t) return !1;
var e = t.constructor;
return e === Float64Array || e === Float32Array || e === Uint8Array || e === Uint32Array || e === Int8Array;
};
}
}), {} ],
242: [ (function() {
"use strict";
Array.isArray || (Array.isArray = function(t) {
return "[object Array]" === Object.prototype.toString.call(t);
});
Array.prototype.find || (Array.prototype.find = function(t) {
for (var e = this.length, i = 0; i < e; i++) {
var n = this[i];
if (t.call(this, n, i, this)) return n;
}
});
Array.prototype.includes || (Array.prototype.includes = function(t) {
return -1 !== this.indexOf(t);
});
}), {} ],
243: [ (function() {
"use strict";
Math.sign || (Math.sign = function(t) {
return 0 == (t = +t) || isNaN(t) ? t : t > 0 ? 1 : -1;
});
Math.log2 || (Math.log2 = function(t) {
return Math.log(t) * Math.LOG2E;
});
Number.isInteger || (Number.isInteger = function(t) {
return "number" == typeof t && isFinite(t) && Math.floor(t) === t;
});
var t = window.performance || Date, e = Object.create(null);
console.time = function(i) {
e[i] = t.now();
};
console.timeEnd = function(i) {
var n = e[i], r = t.now() - n;
console.log(i + ": " + r + "ms");
};
}), {} ],
244: [ (function() {
"use strict";
Number.parseFloat = Number.parseFloat || parseFloat;
Number.parseInt = Number.parseInt || parseInt;
}), {} ],
245: [ (function() {
"use strict";
Object.assign || (Object.assign = function(t, e) {
return cc.js.mixin(t, e);
});
Object.getOwnPropertyDescriptors || (Object.getOwnPropertyDescriptors = function(t) {
var e = {}, i = Object.getOwnPropertyNames(t);
Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(t)));
for (var n = 0; n < i.length; ++n) {
var r = i[n];
e[r] = Object.getOwnPropertyDescriptor(t, r);
}
return e;
});
}), {} ],
246: [ (function() {
"use strict";
String.prototype.startsWith || (String.prototype.startsWith = function(t, e) {
e = e || 0;
return this.lastIndexOf(t, e) === e;
});
String.prototype.endsWith || (String.prototype.endsWith = function(t, e) {
("undefined" == typeof e || e > this.length) && (e = this.length);
e -= t.length;
var i = this.indexOf(t, e);
return -1 !== i && i === e;
});
String.prototype.trimLeft || (String.prototype.trimLeft = function() {
return this.replace(/^\s+/, "");
});
}), {} ],
247: [ (function() {
"use strict";
var t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
};
window.__extends = function(e, i) {
t(e, i);
function n() {
this.constructor = e;
}
e.prototype = null === i ? Object.create(i) : (n.prototype = i.prototype, new n());
};
window.__assign = Object.assign || function(t) {
for (var e, i = 1, n = arguments.length; i < n; i++) {
e = arguments[i];
for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
}
return t;
};
window.__rest = function(t, e) {
var i = {};
for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (i[n] = t[n]);
if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
var r = 0;
for (n = Object.getOwnPropertySymbols(t); r < n.length; r++) e.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[r]) && (i[n[r]] = t[n[r]]);
}
return i;
};
window.__decorate = function(t, e, i, n) {
var r, s = arguments.length, a = s < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, i) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, i, n); else for (var o = t.length - 1; o >= 0; o--) (r = t[o]) && (a = (s < 3 ? r(a) : s > 3 ? r(e, i, a) : r(e, i)) || a);
return s > 3 && a && Object.defineProperty(e, i, a), a;
};
window.__param = function(t, e) {
return function(i, n) {
e(i, n, t);
};
};
window.__metadata = function(t, e) {
if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(t, e);
};
window.__awaiter = function(t, e, i, n) {
return new (i || (i = Promise))(function(r, s) {
function a(t) {
try {
c(n.next(t));
} catch (t) {
s(t);
}
}
function o(t) {
try {
c(n.throw(t));
} catch (t) {
s(t);
}
}
function c(t) {
t.done ? r(t.value) : (e = t.value, e instanceof i ? e : new i(function(t) {
t(e);
})).then(a, o);
var e;
}
c((n = n.apply(t, e || [])).next());
});
};
window.__generator = function(t, e) {
var i, n, r, s, a = {
label: 0,
sent: function() {
if (1 & r[0]) throw r[1];
return r[1];
},
trys: [],
ops: []
};
return s = {
next: o(0),
throw: o(1),
return: o(2)
}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
return this;
}), s;
function o(t) {
return function(e) {
return c([ t, e ]);
};
}
function c(s) {
if (i) throw new TypeError("Generator is already executing.");
for (;a; ) try {
if (i = 1, n && (r = 2 & s[0] ? n.return : s[0] ? n.throw || ((r = n.return) && r.call(n), 
0) : n.next) && !(r = r.call(n, s[1])).done) return r;
(n = 0, r) && (s = [ 2 & s[0], r.value ]);
switch (s[0]) {
case 0:
case 1:
r = s;
break;

case 4:
a.label++;
return {
value: s[1],
done: !1
};

case 5:
a.label++;
n = s[1];
s = [ 0 ];
continue;

case 7:
s = a.ops.pop();
a.trys.pop();
continue;

default:
if (!(r = a.trys, r = r.length > 0 && r[r.length - 1]) && (6 === s[0] || 2 === s[0])) {
a = 0;
continue;
}
if (3 === s[0] && (!r || s[1] > r[0] && s[1] < r[3])) {
a.label = s[1];
break;
}
if (6 === s[0] && a.label < r[1]) {
a.label = r[1];
r = s;
break;
}
if (r && a.label < r[2]) {
a.label = r[2];
a.ops.push(s);
break;
}
r[2] && a.ops.pop();
a.trys.pop();
continue;
}
s = e.call(t, a);
} catch (t) {
s = [ 6, t ];
n = 0;
} finally {
i = r = 0;
}
if (5 & s[0]) throw s[1];
return {
value: s[0] ? s[1] : void 0,
done: !0
};
}
};
window.__exportStar = function(t, e) {
for (var i in t) "default" === i || e.hasOwnProperty(i) || __createBinding(e, t, i);
};
window.__createBinding = Object.create ? function(t, e, i, n) {
void 0 === n && (n = i);
Object.defineProperty(t, n, {
enumerable: !0,
get: function() {
return e[i];
}
});
} : function(t, e, i, n) {
void 0 === n && (n = i);
t[n] = e[i];
};
window.__values = function(t) {
var e = "function" == typeof Symbol && Symbol.iterator, i = e && t[e], n = 0;
if (i) return i.call(t);
if (t && "number" == typeof t.length) return {
next: function() {
t && n >= t.length && (t = void 0);
return {
value: t && t[n++],
done: !t
};
}
};
throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
window.__read = function(t, e) {
var i = "function" == typeof Symbol && t[Symbol.iterator];
if (!i) return t;
var n, r, s = i.call(t), a = [];
try {
for (;(void 0 === e || e-- > 0) && !(n = s.next()).done; ) a.push(n.value);
} catch (t) {
r = {
error: t
};
} finally {
try {
n && !n.done && (i = s.return) && i.call(s);
} finally {
if (r) throw r.error;
}
}
return a;
};
window.__spread = function() {
for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(__read(arguments[e]));
return t;
};
window.__spreadArrays = function() {
for (var t = 0, e = 0, i = arguments.length; e < i; e++) t += arguments[e].length;
var n = Array(t), r = 0;
for (e = 0; e < i; e++) for (var s = arguments[e], a = 0, o = s.length; a < o; a++, 
r++) n[r] = s[a];
return n;
};
window.__await = function(t) {
return this instanceof __await ? (this.v = t, this) : new __await(t);
};
window.__asyncGenerator = function(t, e, i) {
if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
var n, r = i.apply(t, e || []), s = [];
return n = {}, a("next"), a("throw"), a("return"), n[Symbol.asyncIterator] = function() {
return this;
}, n;
function a(t) {
r[t] && (n[t] = function(e) {
return new Promise(function(i, n) {
s.push([ t, e, i, n ]) > 1 || o(t, e);
});
});
}
function o(t, e) {
try {
(i = r[t](e)).value instanceof __await ? Promise.resolve(i.value.v).then(c, u) : l(s[0][2], i);
} catch (t) {
l(s[0][3], t);
}
var i;
}
function c(t) {
o("next", t);
}
function u(t) {
o("throw", t);
}
function l(t, e) {
(t(e), s.shift(), s.length) && o(s[0][0], s[0][1]);
}
};
window.__asyncDelegator = function(t) {
var e, i;
return e = {}, n("next"), n("throw", (function(t) {
throw t;
})), n("return"), e[Symbol.iterator] = function() {
return this;
}, e;
function n(n, r) {
e[n] = t[n] ? function(e) {
return (i = !i) ? {
value: __await(t[n](e)),
done: "return" === n
} : r ? r(e) : e;
} : r;
}
};
window.__asyncValues = function(t) {
if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
var e, i = t[Symbol.asyncIterator];
return i ? i.call(t) : (t = "function" == typeof __values ? __values(t) : t[Symbol.iterator](), 
e = {}, n("next"), n("throw"), n("return"), e[Symbol.asyncIterator] = function() {
return this;
}, e);
function n(i) {
e[i] = t[i] && function(e) {
return new Promise(function(n, s) {
r(n, s, (e = t[i](e)).done, e.value);
});
};
}
function r(t, e, i, n) {
Promise.resolve(n).then((function(e) {
t({
value: e,
done: i
});
}), e);
}
};
window.__makeTemplateObject = function(t, e) {
Object.defineProperty ? Object.defineProperty(t, "raw", {
value: e
}) : t.raw = e;
return t;
};
var e = Object.create ? function(t, e) {
Object.defineProperty(t, "default", {
enumerable: !0,
value: e
});
} : function(t, e) {
t.default = e;
};
window.__importStar = function(t) {
if (t && t.__esModule) return t;
var i = {};
if (null != t) for (var n in t) Object.hasOwnProperty.call(t, n) && __createBinding(i, t, n);
e(i, t);
return i;
};
window.__importDefault = function(t) {
return t && t.__esModule ? t : {
default: t
};
};
window.__classPrivateFieldGet = function(t, e) {
if (!e.has(t)) throw new TypeError("attempted to get private field on non-instance");
return e.get(t);
};
window.__classPrivateFieldSet = function(t, e, i) {
if (!e.has(t)) throw new TypeError("attempted to set private field on non-instance");
e.set(t, i);
return i;
};
}), {} ],
248: [ (function() {
"use strict";
var t = "undefined" == typeof window ? global : window;
function e(e, i) {
"undefined" == typeof t[e] && Object.defineProperty(t, e, {
get: function() {
var t;
"CC_WECHATGAMESUB" === e ? t = "cc.sys.platform === cc.sys.WECHAT_GAME_SUB" : "CC_WECHATGAME" === e ? t = "cc.sys.platform === cc.sys.WECHAT_GAME" : "CC_QQPLAY" === e && (t = "cc.sys.platform === cc.sys.QQ_PLAY");
cc.warnID(1400, e, t);
return i;
}
});
}
function i(e) {
return "object" == typeof t[e];
}
(function(e, i) {
"undefined" == typeof t[e] && (t[e] = i);
})("CC_BUILD", !1);
t.CC_BUILD = !0;
t.CC_DEV = !1;
t.CC_DEBUG = !1;
t.CC_JSB = !0;
t.CC_NATIVERENDERER = !0;
t.CC_SUPPORT_JIT = !0;
t.CC_PHYSICS_BUILTIN = !1;
t.CC_PHYSICS_CANNON = !1;
t.CC_EDITOR = !1;
t.CC_PREVIEW = !1;
t.CC_TEST = !1;
t.CC_RUNTIME = !1;
t.CC_JSB = !0;
var n = !(!i("wx") || !wx.getSharedCanvas), r = !(!i("wx") || !wx.getSystemInfoSync && !wx.getSharedCanvas), s = i("bk");
e("CC_WECHATGAMESUB", n);
e("CC_WECHATGAME", r);
e("CC_QQPLAY", s);
t.CocosEngine = cc.ENGINE_VERSION = "2.4.3";
}), {} ]
}, {}, [ 240 ]);