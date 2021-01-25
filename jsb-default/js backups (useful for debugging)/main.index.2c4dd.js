window.__require = function e(t, r, i) {
function n(o, s) {
if (!r[o]) {
if (!t[o]) {
var f = o.split("/");
f = f[f.length - 1];
if (!t[f]) {
var c = "function" == typeof __require && __require;
if (!s && c) return c(f, !0);
if (a) return a(f, !0);
throw new Error("Cannot find module '" + o + "'");
}
o = f;
}
var u = r[o] = {
exports: {}
};
t[o][0].call(u.exports, function(e) {
return n(t[o][1][e] || e);
}, u, u.exports, e, t, r, i);
}
return r[o].exports;
}
for (var a = "function" == typeof __require && __require, o = 0; o < i.length; o++) n(i[o]);
return n;
}({
1: [ function(e, t, r) {
var i = r;
i.bignum = e("bn.js");
i.define = e("./asn1/api").define;
i.base = e("./asn1/base");
i.constants = e("./asn1/constants");
i.decoders = e("./asn1/decoders");
i.encoders = e("./asn1/encoders");
}, {
"./asn1/api": 2,
"./asn1/base": 4,
"./asn1/constants": 8,
"./asn1/decoders": 10,
"./asn1/encoders": 13,
"bn.js": 15
} ],
2: [ function(e, t, r) {
var i = e("../asn1"), n = e("inherits");
r.define = function(e, t) {
return new a(e, t);
};
function a(e, t) {
this.name = e;
this.body = t;
this.decoders = {};
this.encoders = {};
}
a.prototype._createNamed = function(t) {
var r;
try {
r = e("vm").runInThisContext("(function " + this.name + "(entity) {\n  this._initNamed(entity);\n})");
} catch (e) {
r = function(e) {
this._initNamed(e);
};
}
n(r, t);
r.prototype._initNamed = function(e) {
t.call(this, e);
};
return new r(this);
};
a.prototype._getDecoder = function(e) {
e = e || "der";
this.decoders.hasOwnProperty(e) || (this.decoders[e] = this._createNamed(i.decoders[e]));
return this.decoders[e];
};
a.prototype.decode = function(e, t, r) {
return this._getDecoder(t).decode(e, r);
};
a.prototype._getEncoder = function(e) {
e = e || "der";
this.encoders.hasOwnProperty(e) || (this.encoders[e] = this._createNamed(i.encoders[e]));
return this.encoders[e];
};
a.prototype.encode = function(e, t, r) {
return this._getEncoder(t).encode(e, r);
};
}, {
"../asn1": 1,
inherits: 140,
vm: 197
} ],
3: [ function(e, t, r) {
var i = e("inherits"), n = e("../base").Reporter, a = e("buffer").Buffer;
function o(e, t) {
n.call(this, t);
if (a.isBuffer(e)) {
this.base = e;
this.offset = 0;
this.length = e.length;
} else this.error("Input not Buffer");
}
i(o, n);
r.DecoderBuffer = o;
o.prototype.save = function() {
return {
offset: this.offset,
reporter: n.prototype.save.call(this)
};
};
o.prototype.restore = function(e) {
var t = new o(this.base);
t.offset = e.offset;
t.length = this.offset;
this.offset = e.offset;
n.prototype.restore.call(this, e.reporter);
return t;
};
o.prototype.isEmpty = function() {
return this.offset === this.length;
};
o.prototype.readUInt8 = function(e) {
return this.offset + 1 <= this.length ? this.base.readUInt8(this.offset++, !0) : this.error(e || "DecoderBuffer overrun");
};
o.prototype.skip = function(e, t) {
if (!(this.offset + e <= this.length)) return this.error(t || "DecoderBuffer overrun");
var r = new o(this.base);
r._reporterState = this._reporterState;
r.offset = this.offset;
r.length = this.offset + e;
this.offset += e;
return r;
};
o.prototype.raw = function(e) {
return this.base.slice(e ? e.offset : this.offset, this.length);
};
function s(e, t) {
if (Array.isArray(e)) {
this.length = 0;
this.value = e.map(function(e) {
e instanceof s || (e = new s(e, t));
this.length += e.length;
return e;
}, this);
} else if ("number" == typeof e) {
if (!(0 <= e && e <= 255)) return t.error("non-byte EncoderBuffer value");
this.value = e;
this.length = 1;
} else if ("string" == typeof e) {
this.value = e;
this.length = a.byteLength(e);
} else {
if (!a.isBuffer(e)) return t.error("Unsupported type: " + typeof e);
this.value = e;
this.length = e.length;
}
}
r.EncoderBuffer = s;
s.prototype.join = function(e, t) {
e || (e = new a(this.length));
t || (t = 0);
if (0 === this.length) return e;
if (Array.isArray(this.value)) this.value.forEach(function(r) {
r.join(e, t);
t += r.length;
}); else {
"number" == typeof this.value ? e[t] = this.value : "string" == typeof this.value ? e.write(this.value, t) : a.isBuffer(this.value) && this.value.copy(e, t);
t += this.length;
}
return e;
};
}, {
"../base": 4,
buffer: 66,
inherits: 140
} ],
4: [ function(e, t, r) {
var i = r;
i.Reporter = e("./reporter").Reporter;
i.DecoderBuffer = e("./buffer").DecoderBuffer;
i.EncoderBuffer = e("./buffer").EncoderBuffer;
i.Node = e("./node");
}, {
"./buffer": 3,
"./node": 5,
"./reporter": 6
} ],
5: [ function(e, t) {
var r = e("../base").Reporter, i = e("../base").EncoderBuffer, n = e("../base").DecoderBuffer, a = e("minimalistic-assert"), o = [ "seq", "seqof", "set", "setof", "objid", "bool", "gentime", "utctime", "null_", "enum", "int", "objDesc", "bitstr", "bmpstr", "charstr", "genstr", "graphstr", "ia5str", "iso646str", "numstr", "octstr", "printstr", "t61str", "unistr", "utf8str", "videostr" ], s = [ "key", "obj", "use", "optional", "explicit", "implicit", "def", "choice", "any", "contains" ].concat(o);
function f(e, t) {
var r = {};
this._baseState = r;
r.enc = e;
r.parent = t || null;
r.children = null;
r.tag = null;
r.args = null;
r.reverseArgs = null;
r.choice = null;
r.optional = !1;
r.any = !1;
r.obj = !1;
r.use = null;
r.useDecoder = null;
r.key = null;
r.default = null;
r.explicit = null;
r.implicit = null;
r.contains = null;
if (!r.parent) {
r.children = [];
this._wrap();
}
}
t.exports = f;
var c = [ "enc", "parent", "children", "tag", "args", "reverseArgs", "choice", "optional", "any", "obj", "use", "alteredUse", "key", "default", "explicit", "implicit", "contains" ];
f.prototype.clone = function() {
var e = this._baseState, t = {};
c.forEach(function(r) {
t[r] = e[r];
});
var r = new this.constructor(t.parent);
r._baseState = t;
return r;
};
f.prototype._wrap = function() {
var e = this._baseState;
s.forEach(function(t) {
this[t] = function() {
var r = new this.constructor(this);
e.children.push(r);
return r[t].apply(r, arguments);
};
}, this);
};
f.prototype._init = function(e) {
var t = this._baseState;
a(null === t.parent);
e.call(this);
t.children = t.children.filter(function(e) {
return e._baseState.parent === this;
}, this);
a.equal(t.children.length, 1, "Root node can have only one child");
};
f.prototype._useArgs = function(e) {
var t = this._baseState, r = e.filter(function(e) {
return e instanceof this.constructor;
}, this);
e = e.filter(function(e) {
return !(e instanceof this.constructor);
}, this);
if (0 !== r.length) {
a(null === t.children);
t.children = r;
r.forEach(function(e) {
e._baseState.parent = this;
}, this);
}
if (0 !== e.length) {
a(null === t.args);
t.args = e;
t.reverseArgs = e.map(function(e) {
if ("object" != typeof e || e.constructor !== Object) return e;
var t = {};
Object.keys(e).forEach(function(r) {
r == (0 | r) && (r |= 0);
var i = e[r];
t[i] = r;
});
return t;
});
}
};
[ "_peekTag", "_decodeTag", "_use", "_decodeStr", "_decodeObjid", "_decodeTime", "_decodeNull", "_decodeInt", "_decodeBool", "_decodeList", "_encodeComposite", "_encodeStr", "_encodeObjid", "_encodeTime", "_encodeNull", "_encodeInt", "_encodeBool" ].forEach(function(e) {
f.prototype[e] = function() {
var t = this._baseState;
throw new Error(e + " not implemented for encoding: " + t.enc);
};
});
o.forEach(function(e) {
f.prototype[e] = function() {
var t = this._baseState, r = Array.prototype.slice.call(arguments);
a(null === t.tag);
t.tag = e;
this._useArgs(r);
return this;
};
});
f.prototype.use = function(e) {
a(e);
var t = this._baseState;
a(null === t.use);
t.use = e;
return this;
};
f.prototype.optional = function() {
this._baseState.optional = !0;
return this;
};
f.prototype.def = function(e) {
var t = this._baseState;
a(null === t.default);
t.default = e;
t.optional = !0;
return this;
};
f.prototype.explicit = function(e) {
var t = this._baseState;
a(null === t.explicit && null === t.implicit);
t.explicit = e;
return this;
};
f.prototype.implicit = function(e) {
var t = this._baseState;
a(null === t.explicit && null === t.implicit);
t.implicit = e;
return this;
};
f.prototype.obj = function() {
var e = this._baseState, t = Array.prototype.slice.call(arguments);
e.obj = !0;
0 !== t.length && this._useArgs(t);
return this;
};
f.prototype.key = function(e) {
var t = this._baseState;
a(null === t.key);
t.key = e;
return this;
};
f.prototype.any = function() {
this._baseState.any = !0;
return this;
};
f.prototype.choice = function(e) {
var t = this._baseState;
a(null === t.choice);
t.choice = e;
this._useArgs(Object.keys(e).map(function(t) {
return e[t];
}));
return this;
};
f.prototype.contains = function(e) {
var t = this._baseState;
a(null === t.use);
t.contains = e;
return this;
};
f.prototype._decode = function(e, t) {
var r = this._baseState;
if (null === r.parent) return e.wrapResult(r.children[0]._decode(e, t));
var i, a = r.default, o = !0, s = null;
null !== r.key && (s = e.enterKey(r.key));
if (r.optional) {
var f = null;
null !== r.explicit ? f = r.explicit : null !== r.implicit ? f = r.implicit : null !== r.tag && (f = r.tag);
if (null !== f || r.any) {
o = this._peekTag(e, f, r.any);
if (e.isError(o)) return o;
} else {
var c = e.save();
try {
null === r.choice ? this._decodeGeneric(r.tag, e, t) : this._decodeChoice(e, t);
o = !0;
} catch (e) {
o = !1;
}
e.restore(c);
}
}
r.obj && o && (i = e.enterObject());
if (o) {
if (null !== r.explicit) {
var u = this._decodeTag(e, r.explicit);
if (e.isError(u)) return u;
e = u;
}
var h = e.offset;
if (null === r.use && null === r.choice) {
r.any && (c = e.save());
var d = this._decodeTag(e, null !== r.implicit ? r.implicit : r.tag, r.any);
if (e.isError(d)) return d;
r.any ? a = e.raw(c) : e = d;
}
t && t.track && null !== r.tag && t.track(e.path(), h, e.length, "tagged");
t && t.track && null !== r.tag && t.track(e.path(), e.offset, e.length, "content");
a = r.any ? a : null === r.choice ? this._decodeGeneric(r.tag, e, t) : this._decodeChoice(e, t);
if (e.isError(a)) return a;
r.any || null !== r.choice || null === r.children || r.children.forEach(function(r) {
r._decode(e, t);
});
if (r.contains && ("octstr" === r.tag || "bitstr" === r.tag)) {
var l = new n(a);
a = this._getUse(r.contains, e._reporterState.obj)._decode(l, t);
}
}
r.obj && o && (a = e.leaveObject(i));
null === r.key || null === a && !0 !== o ? null !== s && e.exitKey(s) : e.leaveKey(s, r.key, a);
return a;
};
f.prototype._decodeGeneric = function(e, t, r) {
var i = this._baseState;
return "seq" === e || "set" === e ? null : "seqof" === e || "setof" === e ? this._decodeList(t, e, i.args[0], r) : /str$/.test(e) ? this._decodeStr(t, e, r) : "objid" === e && i.args ? this._decodeObjid(t, i.args[0], i.args[1], r) : "objid" === e ? this._decodeObjid(t, null, null, r) : "gentime" === e || "utctime" === e ? this._decodeTime(t, e, r) : "null_" === e ? this._decodeNull(t, r) : "bool" === e ? this._decodeBool(t, r) : "objDesc" === e ? this._decodeStr(t, e, r) : "int" === e || "enum" === e ? this._decodeInt(t, i.args && i.args[0], r) : null !== i.use ? this._getUse(i.use, t._reporterState.obj)._decode(t, r) : t.error("unknown tag: " + e);
};
f.prototype._getUse = function(e, t) {
var r = this._baseState;
r.useDecoder = this._use(e, t);
a(null === r.useDecoder._baseState.parent);
r.useDecoder = r.useDecoder._baseState.children[0];
if (r.implicit !== r.useDecoder._baseState.implicit) {
r.useDecoder = r.useDecoder.clone();
r.useDecoder._baseState.implicit = r.implicit;
}
return r.useDecoder;
};
f.prototype._decodeChoice = function(e, t) {
var r = this._baseState, i = null, n = !1;
Object.keys(r.choice).some(function(a) {
var o = e.save(), s = r.choice[a];
try {
var f = s._decode(e, t);
if (e.isError(f)) return !1;
i = {
type: a,
value: f
};
n = !0;
} catch (t) {
e.restore(o);
return !1;
}
return !0;
}, this);
return n ? i : e.error("Choice not matched");
};
f.prototype._createEncoderBuffer = function(e) {
return new i(e, this.reporter);
};
f.prototype._encode = function(e, t, r) {
var i = this._baseState;
if (null === i.default || i.default !== e) {
var n = this._encodeValue(e, t, r);
if (void 0 !== n && !this._skipDefault(n, t, r)) return n;
}
};
f.prototype._encodeValue = function(e, t, i) {
var n = this._baseState;
if (null === n.parent) return n.children[0]._encode(e, t || new r());
var a = null;
this.reporter = t;
if (n.optional && void 0 === e) {
if (null === n.default) return;
e = n.default;
}
var o = null, s = !1;
if (n.any) a = this._createEncoderBuffer(e); else if (n.choice) a = this._encodeChoice(e, t); else if (n.contains) {
o = this._getUse(n.contains, i)._encode(e, t);
s = !0;
} else if (n.children) {
o = n.children.map(function(r) {
if ("null_" === r._baseState.tag) return r._encode(null, t, e);
if (null === r._baseState.key) return t.error("Child should have a key");
var i = t.enterKey(r._baseState.key);
if ("object" != typeof e) return t.error("Child expected, but input is not object");
var n = r._encode(e[r._baseState.key], t, e);
t.leaveKey(i);
return n;
}, this).filter(function(e) {
return e;
});
o = this._createEncoderBuffer(o);
} else if ("seqof" === n.tag || "setof" === n.tag) {
if (!n.args || 1 !== n.args.length) return t.error("Too many args for : " + n.tag);
if (!Array.isArray(e)) return t.error("seqof/setof, but data is not Array");
var f = this.clone();
f._baseState.implicit = null;
o = this._createEncoderBuffer(e.map(function(r) {
var i = this._baseState;
return this._getUse(i.args[0], e)._encode(r, t);
}, f));
} else if (null !== n.use) a = this._getUse(n.use, i)._encode(e, t); else {
o = this._encodePrimitive(n.tag, e);
s = !0;
}
if (!n.any && null === n.choice) {
var c = null !== n.implicit ? n.implicit : n.tag, u = null === n.implicit ? "universal" : "context";
null === c ? null === n.use && t.error("Tag could be omitted only for .use()") : null === n.use && (a = this._encodeComposite(c, s, u, o));
}
null !== n.explicit && (a = this._encodeComposite(n.explicit, !1, "context", a));
return a;
};
f.prototype._encodeChoice = function(e, t) {
var r = this._baseState, i = r.choice[e.type];
i || a(!1, e.type + " not found in " + JSON.stringify(Object.keys(r.choice)));
return i._encode(e.value, t);
};
f.prototype._encodePrimitive = function(e, t) {
var r = this._baseState;
if (/str$/.test(e)) return this._encodeStr(t, e);
if ("objid" === e && r.args) return this._encodeObjid(t, r.reverseArgs[0], r.args[1]);
if ("objid" === e) return this._encodeObjid(t, null, null);
if ("gentime" === e || "utctime" === e) return this._encodeTime(t, e);
if ("null_" === e) return this._encodeNull();
if ("int" === e || "enum" === e) return this._encodeInt(t, r.args && r.reverseArgs[0]);
if ("bool" === e) return this._encodeBool(t);
if ("objDesc" === e) return this._encodeStr(t, e);
throw new Error("Unsupported tag: " + e);
};
f.prototype._isNumstr = function(e) {
return /^[0-9 ]*$/.test(e);
};
f.prototype._isPrintstr = function(e) {
return /^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test(e);
};
}, {
"../base": 4,
"minimalistic-assert": 145
} ],
6: [ function(e, t, r) {
var i = e("inherits");
function n(e) {
this._reporterState = {
obj: null,
path: [],
options: e || {},
errors: []
};
}
r.Reporter = n;
n.prototype.isError = function(e) {
return e instanceof a;
};
n.prototype.save = function() {
var e = this._reporterState;
return {
obj: e.obj,
pathLen: e.path.length
};
};
n.prototype.restore = function(e) {
var t = this._reporterState;
t.obj = e.obj;
t.path = t.path.slice(0, e.pathLen);
};
n.prototype.enterKey = function(e) {
return this._reporterState.path.push(e);
};
n.prototype.exitKey = function(e) {
var t = this._reporterState;
t.path = t.path.slice(0, e - 1);
};
n.prototype.leaveKey = function(e, t, r) {
var i = this._reporterState;
this.exitKey(e);
null !== i.obj && (i.obj[t] = r);
};
n.prototype.path = function() {
return this._reporterState.path.join("/");
};
n.prototype.enterObject = function() {
var e = this._reporterState, t = e.obj;
e.obj = {};
return t;
};
n.prototype.leaveObject = function(e) {
var t = this._reporterState, r = t.obj;
t.obj = e;
return r;
};
n.prototype.error = function(e) {
var t, r = this._reporterState, i = e instanceof a;
t = i ? e : new a(r.path.map(function(e) {
return "[" + JSON.stringify(e) + "]";
}).join(""), e.message || e, e.stack);
if (!r.options.partial) throw t;
i || r.errors.push(t);
return t;
};
n.prototype.wrapResult = function(e) {
var t = this._reporterState;
return t.options.partial ? {
result: this.isError(e) ? null : e,
errors: t.errors
} : e;
};
function a(e, t) {
this.path = e;
this.rethrow(t);
}
i(a, Error);
a.prototype.rethrow = function(e) {
this.message = e + " at: " + (this.path || "(shallow)");
Error.captureStackTrace && Error.captureStackTrace(this, a);
if (!this.stack) try {
throw new Error(this.message);
} catch (e) {
this.stack = e.stack;
}
return this;
};
}, {
inherits: 140
} ],
7: [ function(e, t, r) {
var i = e("../constants");
r.tagClass = {
0: "universal",
1: "application",
2: "context",
3: "private"
};
r.tagClassByName = i._reverse(r.tagClass);
r.tag = {
0: "end",
1: "bool",
2: "int",
3: "bitstr",
4: "octstr",
5: "null_",
6: "objid",
7: "objDesc",
8: "external",
9: "real",
10: "enum",
11: "embed",
12: "utf8str",
13: "relativeOid",
16: "seq",
17: "set",
18: "numstr",
19: "printstr",
20: "t61str",
21: "videostr",
22: "ia5str",
23: "utctime",
24: "gentime",
25: "graphstr",
26: "iso646str",
27: "genstr",
28: "unistr",
29: "charstr",
30: "bmpstr"
};
r.tagByName = i._reverse(r.tag);
}, {
"../constants": 8
} ],
8: [ function(e, t, r) {
var i = r;
i._reverse = function(e) {
var t = {};
Object.keys(e).forEach(function(r) {
(0 | r) == r && (r |= 0);
var i = e[r];
t[i] = r;
});
return t;
};
i.der = e("./der");
}, {
"./der": 7
} ],
9: [ function(e, t) {
var r = e("inherits"), i = e("../../asn1"), n = i.base, a = i.bignum, o = i.constants.der;
function s(e) {
this.enc = "der";
this.name = e.name;
this.entity = e;
this.tree = new f();
this.tree._init(e.body);
}
t.exports = s;
s.prototype.decode = function(e, t) {
e instanceof n.DecoderBuffer || (e = new n.DecoderBuffer(e, t));
return this.tree._decode(e, t);
};
function f(e) {
n.Node.call(this, "der", e);
}
r(f, n.Node);
f.prototype._peekTag = function(e, t, r) {
if (e.isEmpty()) return !1;
var i = e.save(), n = c(e, 'Failed to peek tag: "' + t + '"');
if (e.isError(n)) return n;
e.restore(i);
return n.tag === t || n.tagStr === t || n.tagStr + "of" === t || r;
};
f.prototype._decodeTag = function(e, t, r) {
var i = c(e, 'Failed to decode tag of "' + t + '"');
if (e.isError(i)) return i;
var n = u(e, i.primitive, 'Failed to get length of "' + t + '"');
if (e.isError(n)) return n;
if (!r && i.tag !== t && i.tagStr !== t && i.tagStr + "of" !== t) return e.error('Failed to match tag: "' + t + '"');
if (i.primitive || null !== n) return e.skip(n, 'Failed to match body of: "' + t + '"');
var a = e.save(), o = this._skipUntilEnd(e, 'Failed to skip indefinite length body: "' + this.tag + '"');
if (e.isError(o)) return o;
n = e.offset - a.offset;
e.restore(a);
return e.skip(n, 'Failed to match body of: "' + t + '"');
};
f.prototype._skipUntilEnd = function(e, t) {
for (;;) {
var r = c(e, t);
if (e.isError(r)) return r;
var i, n = u(e, r.primitive, t);
if (e.isError(n)) return n;
i = r.primitive || null !== n ? e.skip(n) : this._skipUntilEnd(e, t);
if (e.isError(i)) return i;
if ("end" === r.tagStr) break;
}
};
f.prototype._decodeList = function(e, t, r, i) {
for (var n = []; !e.isEmpty(); ) {
var a = this._peekTag(e, "end");
if (e.isError(a)) return a;
var o = r.decode(e, "der", i);
if (e.isError(o) && a) break;
n.push(o);
}
return n;
};
f.prototype._decodeStr = function(e, t) {
if ("bitstr" === t) {
var r = e.readUInt8();
return e.isError(r) ? r : {
unused: r,
data: e.raw()
};
}
if ("bmpstr" === t) {
var i = e.raw();
if (i.length % 2 == 1) return e.error("Decoding of string type: bmpstr length mismatch");
for (var n = "", a = 0; a < i.length / 2; a++) n += String.fromCharCode(i.readUInt16BE(2 * a));
return n;
}
if ("numstr" === t) {
var o = e.raw().toString("ascii");
return this._isNumstr(o) ? o : e.error("Decoding of string type: numstr unsupported characters");
}
if ("octstr" === t) return e.raw();
if ("objDesc" === t) return e.raw();
if ("printstr" === t) {
var s = e.raw().toString("ascii");
return this._isPrintstr(s) ? s : e.error("Decoding of string type: printstr unsupported characters");
}
return /str$/.test(t) ? e.raw().toString() : e.error("Decoding of string type: " + t + " unsupported");
};
f.prototype._decodeObjid = function(e, t, r) {
for (var i, n = [], a = 0; !e.isEmpty(); ) {
var o = e.readUInt8();
a <<= 7;
a |= 127 & o;
if (0 == (128 & o)) {
n.push(a);
a = 0;
}
}
128 & o && n.push(a);
var s = n[0] / 40 | 0, f = n[0] % 40;
i = r ? n : [ s, f ].concat(n.slice(1));
if (t) {
var c = t[i.join(" ")];
void 0 === c && (c = t[i.join(".")]);
void 0 !== c && (i = c);
}
return i;
};
f.prototype._decodeTime = function(e, t) {
var r = e.raw().toString();
if ("gentime" === t) var i = 0 | r.slice(0, 4), n = 0 | r.slice(4, 6), a = 0 | r.slice(6, 8), o = 0 | r.slice(8, 10), s = 0 | r.slice(10, 12), f = 0 | r.slice(12, 14); else {
if ("utctime" !== t) return e.error("Decoding " + t + " time is not supported yet");
i = 0 | r.slice(0, 2), n = 0 | r.slice(2, 4), a = 0 | r.slice(4, 6), o = 0 | r.slice(6, 8), 
s = 0 | r.slice(8, 10), f = 0 | r.slice(10, 12);
i = i < 70 ? 2e3 + i : 1900 + i;
}
return Date.UTC(i, n - 1, a, o, s, f, 0);
};
f.prototype._decodeNull = function() {
return null;
};
f.prototype._decodeBool = function(e) {
var t = e.readUInt8();
return e.isError(t) ? t : 0 !== t;
};
f.prototype._decodeInt = function(e, t) {
var r = e.raw(), i = new a(r);
t && (i = t[i.toString(10)] || i);
return i;
};
f.prototype._use = function(e, t) {
"function" == typeof e && (e = e(t));
return e._getDecoder("der").tree;
};
function c(e, t) {
var r = e.readUInt8(t);
if (e.isError(r)) return r;
var i = o.tagClass[r >> 6], n = 0 == (32 & r);
if (31 == (31 & r)) {
var a = r;
r = 0;
for (;128 == (128 & a); ) {
a = e.readUInt8(t);
if (e.isError(a)) return a;
r <<= 7;
r |= 127 & a;
}
} else r &= 31;
return {
cls: i,
primitive: n,
tag: r,
tagStr: o.tag[r]
};
}
function u(e, t, r) {
var i = e.readUInt8(r);
if (e.isError(i)) return i;
if (!t && 128 === i) return null;
if (0 == (128 & i)) return i;
var n = 127 & i;
if (n > 4) return e.error("length octect is too long");
i = 0;
for (var a = 0; a < n; a++) {
i <<= 8;
var o = e.readUInt8(r);
if (e.isError(o)) return o;
i |= o;
}
return i;
}
}, {
"../../asn1": 1,
inherits: 140
} ],
10: [ function(e, t, r) {
var i = r;
i.der = e("./der");
i.pem = e("./pem");
}, {
"./der": 9,
"./pem": 11
} ],
11: [ function(e, t) {
var r = e("inherits"), i = e("buffer").Buffer, n = e("./der");
function a(e) {
n.call(this, e);
this.enc = "pem";
}
r(a, n);
t.exports = a;
a.prototype.decode = function(e, t) {
for (var r = e.toString().split(/[\r\n]+/g), a = t.label.toUpperCase(), o = /^-----(BEGIN|END) ([^-]+)-----$/, s = -1, f = -1, c = 0; c < r.length; c++) {
var u = r[c].match(o);
if (null !== u && u[2] === a) {
if (-1 !== s) {
if ("END" !== u[1]) break;
f = c;
break;
}
if ("BEGIN" !== u[1]) break;
s = c;
}
}
if (-1 === s || -1 === f) throw new Error("PEM section not found for: " + a);
var h = r.slice(s + 1, f).join("");
h.replace(/[^a-z0-9\+\/=]+/gi, "");
var d = new i(h, "base64");
return n.prototype.decode.call(this, d, t);
};
}, {
"./der": 9,
buffer: 66,
inherits: 140
} ],
12: [ function(e, t) {
var r = e("inherits"), i = e("buffer").Buffer, n = e("../../asn1"), a = n.base, o = n.constants.der;
function s(e) {
this.enc = "der";
this.name = e.name;
this.entity = e;
this.tree = new f();
this.tree._init(e.body);
}
t.exports = s;
s.prototype.encode = function(e, t) {
return this.tree._encode(e, t).join();
};
function f(e) {
a.Node.call(this, "der", e);
}
r(f, a.Node);
f.prototype._encodeComposite = function(e, t, r, n) {
var a = u(e, t, r, this.reporter);
if (n.length < 128) {
var o;
(o = new i(2))[0] = a;
o[1] = n.length;
return this._createEncoderBuffer([ o, n ]);
}
for (var s = 1, f = n.length; f >= 256; f >>= 8) s++;
(o = new i(2 + s))[0] = a;
o[1] = 128 | s;
f = 1 + s;
for (var c = n.length; c > 0; f--, c >>= 8) o[f] = 255 & c;
return this._createEncoderBuffer([ o, n ]);
};
f.prototype._encodeStr = function(e, t) {
if ("bitstr" === t) return this._createEncoderBuffer([ 0 | e.unused, e.data ]);
if ("bmpstr" === t) {
for (var r = new i(2 * e.length), n = 0; n < e.length; n++) r.writeUInt16BE(e.charCodeAt(n), 2 * n);
return this._createEncoderBuffer(r);
}
return "numstr" === t ? this._isNumstr(e) ? this._createEncoderBuffer(e) : this.reporter.error("Encoding of string type: numstr supports only digits and space") : "printstr" === t ? this._isPrintstr(e) ? this._createEncoderBuffer(e) : this.reporter.error("Encoding of string type: printstr supports only latin upper and lower case letters, digits, space, apostrophe, left and rigth parenthesis, plus sign, comma, hyphen, dot, slash, colon, equal sign, question mark") : /str$/.test(t) ? this._createEncoderBuffer(e) : "objDesc" === t ? this._createEncoderBuffer(e) : this.reporter.error("Encoding of string type: " + t + " unsupported");
};
f.prototype._encodeObjid = function(e, t, r) {
if ("string" == typeof e) {
if (!t) return this.reporter.error("string objid given, but no values map found");
if (!t.hasOwnProperty(e)) return this.reporter.error("objid not found in values map");
e = t[e].split(/[\s\.]+/g);
for (var n = 0; n < e.length; n++) e[n] |= 0;
} else if (Array.isArray(e)) {
e = e.slice();
for (n = 0; n < e.length; n++) e[n] |= 0;
}
if (!Array.isArray(e)) return this.reporter.error("objid() should be either array or string, got: " + JSON.stringify(e));
if (!r) {
if (e[1] >= 40) return this.reporter.error("Second objid identifier OOB");
e.splice(0, 2, 40 * e[0] + e[1]);
}
var a = 0;
for (n = 0; n < e.length; n++) {
var o = e[n];
for (a++; o >= 128; o >>= 7) a++;
}
var s = new i(a), f = s.length - 1;
for (n = e.length - 1; n >= 0; n--) {
o = e[n];
s[f--] = 127 & o;
for (;(o >>= 7) > 0; ) s[f--] = 128 | 127 & o;
}
return this._createEncoderBuffer(s);
};
function c(e) {
return e < 10 ? "0" + e : e;
}
f.prototype._encodeTime = function(e, t) {
var r, i = new Date(e);
"gentime" === t ? r = [ c(i.getFullYear()), c(i.getUTCMonth() + 1), c(i.getUTCDate()), c(i.getUTCHours()), c(i.getUTCMinutes()), c(i.getUTCSeconds()), "Z" ].join("") : "utctime" === t ? r = [ c(i.getFullYear() % 100), c(i.getUTCMonth() + 1), c(i.getUTCDate()), c(i.getUTCHours()), c(i.getUTCMinutes()), c(i.getUTCSeconds()), "Z" ].join("") : this.reporter.error("Encoding " + t + " time is not supported yet");
return this._encodeStr(r, "octstr");
};
f.prototype._encodeNull = function() {
return this._createEncoderBuffer("");
};
f.prototype._encodeInt = function(e, t) {
if ("string" == typeof e) {
if (!t) return this.reporter.error("String int or enum given, but no values map");
if (!t.hasOwnProperty(e)) return this.reporter.error("Values map doesn't contain: " + JSON.stringify(e));
e = t[e];
}
if ("number" != typeof e && !i.isBuffer(e)) {
var r = e.toArray();
!e.sign && 128 & r[0] && r.unshift(0);
e = new i(r);
}
if (i.isBuffer(e)) {
var n = e.length;
0 === e.length && n++;
var a = new i(n);
e.copy(a);
0 === e.length && (a[0] = 0);
return this._createEncoderBuffer(a);
}
if (e < 128) return this._createEncoderBuffer(e);
if (e < 256) return this._createEncoderBuffer([ 0, e ]);
n = 1;
for (var o = e; o >= 256; o >>= 8) n++;
for (o = (a = new Array(n)).length - 1; o >= 0; o--) {
a[o] = 255 & e;
e >>= 8;
}
128 & a[0] && a.unshift(0);
return this._createEncoderBuffer(new i(a));
};
f.prototype._encodeBool = function(e) {
return this._createEncoderBuffer(e ? 255 : 0);
};
f.prototype._use = function(e, t) {
"function" == typeof e && (e = e(t));
return e._getEncoder("der").tree;
};
f.prototype._skipDefault = function(e, t, r) {
var i, n = this._baseState;
if (null === n.default) return !1;
var a = e.join();
void 0 === n.defaultBuffer && (n.defaultBuffer = this._encodeValue(n.default, t, r).join());
if (a.length !== n.defaultBuffer.length) return !1;
for (i = 0; i < a.length; i++) if (a[i] !== n.defaultBuffer[i]) return !1;
return !0;
};
function u(e, t, r, i) {
var n;
"seqof" === e ? e = "seq" : "setof" === e && (e = "set");
if (o.tagByName.hasOwnProperty(e)) n = o.tagByName[e]; else {
if ("number" != typeof e || (0 | e) !== e) return i.error("Unknown tag: " + e);
n = e;
}
if (n >= 31) return i.error("Multi-octet tag encoding unsupported");
t || (n |= 32);
return n | o.tagClassByName[r || "universal"] << 6;
}
}, {
"../../asn1": 1,
buffer: 66,
inherits: 140
} ],
13: [ function(e, t, r) {
var i = r;
i.der = e("./der");
i.pem = e("./pem");
}, {
"./der": 12,
"./pem": 14
} ],
14: [ function(e, t) {
var r = e("inherits"), i = e("./der");
function n(e) {
i.call(this, e);
this.enc = "pem";
}
r(n, i);
t.exports = n;
n.prototype.encode = function(e, t) {
for (var r = i.prototype.encode.call(this, e).toString("base64"), n = [ "-----BEGIN " + t.label + "-----" ], a = 0; a < r.length; a += 64) n.push(r.slice(a, a + 64));
n.push("-----END " + t.label + "-----");
return n.join("\n");
};
}, {
"./der": 12,
inherits: 140
} ],
15: [ function(e, t) {
(function(t, r) {
"use strict";
function i(e, t) {
if (!e) throw new Error(t || "Assertion failed");
}
function n(e, t) {
e.super_ = t;
var r = function() {};
r.prototype = t.prototype;
e.prototype = new r();
e.prototype.constructor = e;
}
function a(e, t, r) {
if (a.isBN(e)) return e;
this.negative = 0;
this.words = null;
this.length = 0;
this.red = null;
if (null !== e) {
if ("le" === t || "be" === t) {
r = t;
t = 10;
}
this._init(e || 0, t || 10, r || "be");
}
}
"object" == typeof t ? t.exports = a : r.BN = a;
a.BN = a;
a.wordSize = 26;
var o;
try {
o = e("buffer").Buffer;
} catch (e) {}
a.isBN = function(e) {
return e instanceof a || null !== e && "object" == typeof e && e.constructor.wordSize === a.wordSize && Array.isArray(e.words);
};
a.max = function(e, t) {
return e.cmp(t) > 0 ? e : t;
};
a.min = function(e, t) {
return e.cmp(t) < 0 ? e : t;
};
a.prototype._init = function(e, t, r) {
if ("number" == typeof e) return this._initNumber(e, t, r);
if ("object" == typeof e) return this._initArray(e, t, r);
"hex" === t && (t = 16);
i(t === (0 | t) && t >= 2 && t <= 36);
var n = 0;
"-" === (e = e.toString().replace(/\s+/g, ""))[0] && n++;
16 === t ? this._parseHex(e, n) : this._parseBase(e, t, n);
"-" === e[0] && (this.negative = 1);
this.strip();
"le" === r && this._initArray(this.toArray(), t, r);
};
a.prototype._initNumber = function(e, t, r) {
if (e < 0) {
this.negative = 1;
e = -e;
}
if (e < 67108864) {
this.words = [ 67108863 & e ];
this.length = 1;
} else if (e < 4503599627370496) {
this.words = [ 67108863 & e, e / 67108864 & 67108863 ];
this.length = 2;
} else {
i(e < 9007199254740992);
this.words = [ 67108863 & e, e / 67108864 & 67108863, 1 ];
this.length = 3;
}
"le" === r && this._initArray(this.toArray(), t, r);
};
a.prototype._initArray = function(e, t, r) {
i("number" == typeof e.length);
if (e.length <= 0) {
this.words = [ 0 ];
this.length = 1;
return this;
}
this.length = Math.ceil(e.length / 3);
this.words = new Array(this.length);
for (var n = 0; n < this.length; n++) this.words[n] = 0;
var a, o, s = 0;
if ("be" === r) for (n = e.length - 1, a = 0; n >= 0; n -= 3) {
o = e[n] | e[n - 1] << 8 | e[n - 2] << 16;
this.words[a] |= o << s & 67108863;
this.words[a + 1] = o >>> 26 - s & 67108863;
if ((s += 24) >= 26) {
s -= 26;
a++;
}
} else if ("le" === r) for (n = 0, a = 0; n < e.length; n += 3) {
o = e[n] | e[n + 1] << 8 | e[n + 2] << 16;
this.words[a] |= o << s & 67108863;
this.words[a + 1] = o >>> 26 - s & 67108863;
if ((s += 24) >= 26) {
s -= 26;
a++;
}
}
return this.strip();
};
function s(e, t, r) {
for (var i = 0, n = Math.min(e.length, r), a = t; a < n; a++) {
var o = e.charCodeAt(a) - 48;
i <<= 4;
i |= o >= 49 && o <= 54 ? o - 49 + 10 : o >= 17 && o <= 22 ? o - 17 + 10 : 15 & o;
}
return i;
}
a.prototype._parseHex = function(e, t) {
this.length = Math.ceil((e.length - t) / 6);
this.words = new Array(this.length);
for (var r = 0; r < this.length; r++) this.words[r] = 0;
var i, n, a = 0;
for (r = e.length - 6, i = 0; r >= t; r -= 6) {
n = s(e, r, r + 6);
this.words[i] |= n << a & 67108863;
this.words[i + 1] |= n >>> 26 - a & 4194303;
if ((a += 24) >= 26) {
a -= 26;
i++;
}
}
if (r + 6 !== t) {
n = s(e, t, r + 6);
this.words[i] |= n << a & 67108863;
this.words[i + 1] |= n >>> 26 - a & 4194303;
}
this.strip();
};
function f(e, t, r, i) {
for (var n = 0, a = Math.min(e.length, r), o = t; o < a; o++) {
var s = e.charCodeAt(o) - 48;
n *= i;
n += s >= 49 ? s - 49 + 10 : s >= 17 ? s - 17 + 10 : s;
}
return n;
}
a.prototype._parseBase = function(e, t, r) {
this.words = [ 0 ];
this.length = 1;
for (var i = 0, n = 1; n <= 67108863; n *= t) i++;
i--;
n = n / t | 0;
for (var a = e.length - r, o = a % i, s = Math.min(a, a - o) + r, c = 0, u = r; u < s; u += i) {
c = f(e, u, u + i, t);
this.imuln(n);
this.words[0] + c < 67108864 ? this.words[0] += c : this._iaddn(c);
}
if (0 !== o) {
var h = 1;
c = f(e, u, e.length, t);
for (u = 0; u < o; u++) h *= t;
this.imuln(h);
this.words[0] + c < 67108864 ? this.words[0] += c : this._iaddn(c);
}
};
a.prototype.copy = function(e) {
e.words = new Array(this.length);
for (var t = 0; t < this.length; t++) e.words[t] = this.words[t];
e.length = this.length;
e.negative = this.negative;
e.red = this.red;
};
a.prototype.clone = function() {
var e = new a(null);
this.copy(e);
return e;
};
a.prototype._expand = function(e) {
for (;this.length < e; ) this.words[this.length++] = 0;
return this;
};
a.prototype.strip = function() {
for (;this.length > 1 && 0 === this.words[this.length - 1]; ) this.length--;
return this._normSign();
};
a.prototype._normSign = function() {
1 === this.length && 0 === this.words[0] && (this.negative = 0);
return this;
};
a.prototype.inspect = function() {
return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
};
var c = [ "", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000" ], u = [ 0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ], h = [ 0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176 ];
a.prototype.toString = function(e, t) {
t = 0 | t || 1;
var r;
if (16 === (e = e || 10) || "hex" === e) {
r = "";
for (var n = 0, a = 0, o = 0; o < this.length; o++) {
var s = this.words[o], f = (16777215 & (s << n | a)).toString(16);
r = 0 != (a = s >>> 24 - n & 16777215) || o !== this.length - 1 ? c[6 - f.length] + f + r : f + r;
if ((n += 2) >= 26) {
n -= 26;
o--;
}
}
0 !== a && (r = a.toString(16) + r);
for (;r.length % t != 0; ) r = "0" + r;
0 !== this.negative && (r = "-" + r);
return r;
}
if (e === (0 | e) && e >= 2 && e <= 36) {
var d = u[e], l = h[e];
r = "";
var p = this.clone();
p.negative = 0;
for (;!p.isZero(); ) {
var b = p.modn(l).toString(e);
r = (p = p.idivn(l)).isZero() ? b + r : c[d - b.length] + b + r;
}
this.isZero() && (r = "0" + r);
for (;r.length % t != 0; ) r = "0" + r;
0 !== this.negative && (r = "-" + r);
return r;
}
i(!1, "Base should be between 2 and 36");
};
a.prototype.toNumber = function() {
var e = this.words[0];
2 === this.length ? e += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? e += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && i(!1, "Number can only safely store up to 53 bits");
return 0 !== this.negative ? -e : e;
};
a.prototype.toJSON = function() {
return this.toString(16);
};
a.prototype.toBuffer = function(e, t) {
i("undefined" != typeof o);
return this.toArrayLike(o, e, t);
};
a.prototype.toArray = function(e, t) {
return this.toArrayLike(Array, e, t);
};
a.prototype.toArrayLike = function(e, t, r) {
var n = this.byteLength(), a = r || Math.max(1, n);
i(n <= a, "byte array longer than desired length");
i(a > 0, "Requested array length <= 0");
this.strip();
var o, s, f = "le" === t, c = new e(a), u = this.clone();
if (f) {
for (s = 0; !u.isZero(); s++) {
o = u.andln(255);
u.iushrn(8);
c[s] = o;
}
for (;s < a; s++) c[s] = 0;
} else {
for (s = 0; s < a - n; s++) c[s] = 0;
for (s = 0; !u.isZero(); s++) {
o = u.andln(255);
u.iushrn(8);
c[a - s - 1] = o;
}
}
return c;
};
Math.clz32 ? a.prototype._countBits = function(e) {
return 32 - Math.clz32(e);
} : a.prototype._countBits = function(e) {
var t = e, r = 0;
if (t >= 4096) {
r += 13;
t >>>= 13;
}
if (t >= 64) {
r += 7;
t >>>= 7;
}
if (t >= 8) {
r += 4;
t >>>= 4;
}
if (t >= 2) {
r += 2;
t >>>= 2;
}
return r + t;
};
a.prototype._zeroBits = function(e) {
if (0 === e) return 26;
var t = e, r = 0;
if (0 == (8191 & t)) {
r += 13;
t >>>= 13;
}
if (0 == (127 & t)) {
r += 7;
t >>>= 7;
}
if (0 == (15 & t)) {
r += 4;
t >>>= 4;
}
if (0 == (3 & t)) {
r += 2;
t >>>= 2;
}
0 == (1 & t) && r++;
return r;
};
a.prototype.bitLength = function() {
var e = this.words[this.length - 1], t = this._countBits(e);
return 26 * (this.length - 1) + t;
};
function d(e) {
for (var t = new Array(e.bitLength()), r = 0; r < t.length; r++) {
var i = r / 26 | 0, n = r % 26;
t[r] = (e.words[i] & 1 << n) >>> n;
}
return t;
}
a.prototype.zeroBits = function() {
if (this.isZero()) return 0;
for (var e = 0, t = 0; t < this.length; t++) {
var r = this._zeroBits(this.words[t]);
e += r;
if (26 !== r) break;
}
return e;
};
a.prototype.byteLength = function() {
return Math.ceil(this.bitLength() / 8);
};
a.prototype.toTwos = function(e) {
return 0 !== this.negative ? this.abs().inotn(e).iaddn(1) : this.clone();
};
a.prototype.fromTwos = function(e) {
return this.testn(e - 1) ? this.notn(e).iaddn(1).ineg() : this.clone();
};
a.prototype.isNeg = function() {
return 0 !== this.negative;
};
a.prototype.neg = function() {
return this.clone().ineg();
};
a.prototype.ineg = function() {
this.isZero() || (this.negative ^= 1);
return this;
};
a.prototype.iuor = function(e) {
for (;this.length < e.length; ) this.words[this.length++] = 0;
for (var t = 0; t < e.length; t++) this.words[t] = this.words[t] | e.words[t];
return this.strip();
};
a.prototype.ior = function(e) {
i(0 == (this.negative | e.negative));
return this.iuor(e);
};
a.prototype.or = function(e) {
return this.length > e.length ? this.clone().ior(e) : e.clone().ior(this);
};
a.prototype.uor = function(e) {
return this.length > e.length ? this.clone().iuor(e) : e.clone().iuor(this);
};
a.prototype.iuand = function(e) {
var t;
t = this.length > e.length ? e : this;
for (var r = 0; r < t.length; r++) this.words[r] = this.words[r] & e.words[r];
this.length = t.length;
return this.strip();
};
a.prototype.iand = function(e) {
i(0 == (this.negative | e.negative));
return this.iuand(e);
};
a.prototype.and = function(e) {
return this.length > e.length ? this.clone().iand(e) : e.clone().iand(this);
};
a.prototype.uand = function(e) {
return this.length > e.length ? this.clone().iuand(e) : e.clone().iuand(this);
};
a.prototype.iuxor = function(e) {
var t, r;
if (this.length > e.length) {
t = this;
r = e;
} else {
t = e;
r = this;
}
for (var i = 0; i < r.length; i++) this.words[i] = t.words[i] ^ r.words[i];
if (this !== t) for (;i < t.length; i++) this.words[i] = t.words[i];
this.length = t.length;
return this.strip();
};
a.prototype.ixor = function(e) {
i(0 == (this.negative | e.negative));
return this.iuxor(e);
};
a.prototype.xor = function(e) {
return this.length > e.length ? this.clone().ixor(e) : e.clone().ixor(this);
};
a.prototype.uxor = function(e) {
return this.length > e.length ? this.clone().iuxor(e) : e.clone().iuxor(this);
};
a.prototype.inotn = function(e) {
i("number" == typeof e && e >= 0);
var t = 0 | Math.ceil(e / 26), r = e % 26;
this._expand(t);
r > 0 && t--;
for (var n = 0; n < t; n++) this.words[n] = 67108863 & ~this.words[n];
r > 0 && (this.words[n] = ~this.words[n] & 67108863 >> 26 - r);
return this.strip();
};
a.prototype.notn = function(e) {
return this.clone().inotn(e);
};
a.prototype.setn = function(e, t) {
i("number" == typeof e && e >= 0);
var r = e / 26 | 0, n = e % 26;
this._expand(r + 1);
this.words[r] = t ? this.words[r] | 1 << n : this.words[r] & ~(1 << n);
return this.strip();
};
a.prototype.iadd = function(e) {
var t, r, i;
if (0 !== this.negative && 0 === e.negative) {
this.negative = 0;
t = this.isub(e);
this.negative ^= 1;
return this._normSign();
}
if (0 === this.negative && 0 !== e.negative) {
e.negative = 0;
t = this.isub(e);
e.negative = 1;
return t._normSign();
}
if (this.length > e.length) {
r = this;
i = e;
} else {
r = e;
i = this;
}
for (var n = 0, a = 0; a < i.length; a++) {
t = (0 | r.words[a]) + (0 | i.words[a]) + n;
this.words[a] = 67108863 & t;
n = t >>> 26;
}
for (;0 !== n && a < r.length; a++) {
t = (0 | r.words[a]) + n;
this.words[a] = 67108863 & t;
n = t >>> 26;
}
this.length = r.length;
if (0 !== n) {
this.words[this.length] = n;
this.length++;
} else if (r !== this) for (;a < r.length; a++) this.words[a] = r.words[a];
return this;
};
a.prototype.add = function(e) {
var t;
if (0 !== e.negative && 0 === this.negative) {
e.negative = 0;
t = this.sub(e);
e.negative ^= 1;
return t;
}
if (0 === e.negative && 0 !== this.negative) {
this.negative = 0;
t = e.sub(this);
this.negative = 1;
return t;
}
return this.length > e.length ? this.clone().iadd(e) : e.clone().iadd(this);
};
a.prototype.isub = function(e) {
if (0 !== e.negative) {
e.negative = 0;
var t = this.iadd(e);
e.negative = 1;
return t._normSign();
}
if (0 !== this.negative) {
this.negative = 0;
this.iadd(e);
this.negative = 1;
return this._normSign();
}
var r, i, n = this.cmp(e);
if (0 === n) {
this.negative = 0;
this.length = 1;
this.words[0] = 0;
return this;
}
if (n > 0) {
r = this;
i = e;
} else {
r = e;
i = this;
}
for (var a = 0, o = 0; o < i.length; o++) {
a = (t = (0 | r.words[o]) - (0 | i.words[o]) + a) >> 26;
this.words[o] = 67108863 & t;
}
for (;0 !== a && o < r.length; o++) {
a = (t = (0 | r.words[o]) + a) >> 26;
this.words[o] = 67108863 & t;
}
if (0 === a && o < r.length && r !== this) for (;o < r.length; o++) this.words[o] = r.words[o];
this.length = Math.max(this.length, o);
r !== this && (this.negative = 1);
return this.strip();
};
a.prototype.sub = function(e) {
return this.clone().isub(e);
};
function l(e, t, r) {
r.negative = t.negative ^ e.negative;
var i = e.length + t.length | 0;
r.length = i;
i = i - 1 | 0;
var n = 0 | e.words[0], a = 0 | t.words[0], o = n * a, s = 67108863 & o, f = o / 67108864 | 0;
r.words[0] = s;
for (var c = 1; c < i; c++) {
for (var u = f >>> 26, h = 67108863 & f, d = Math.min(c, t.length - 1), l = Math.max(0, c - e.length + 1); l <= d; l++) {
var p = c - l | 0;
u += (o = (n = 0 | e.words[p]) * (a = 0 | t.words[l]) + h) / 67108864 | 0;
h = 67108863 & o;
}
r.words[c] = 0 | h;
f = 0 | u;
}
0 !== f ? r.words[c] = 0 | f : r.length--;
return r.strip();
}
var p = function(e, t, r) {
var i, n, a, o = e.words, s = t.words, f = r.words, c = 0, u = 0 | o[0], h = 8191 & u, d = u >>> 13, l = 0 | o[1], p = 8191 & l, b = l >>> 13, m = 0 | o[2], g = 8191 & m, y = m >>> 13, v = 0 | o[3], _ = 8191 & v, w = v >>> 13, M = 0 | o[4], S = 8191 & M, E = M >>> 13, k = 0 | o[5], A = 8191 & k, x = k >>> 13, R = 0 | o[6], T = 8191 & R, B = R >>> 13, j = 0 | o[7], I = 8191 & j, P = j >>> 13, C = 0 | o[8], O = 8191 & C, L = C >>> 13, N = 0 | o[9], D = 8191 & N, U = N >>> 13, q = 0 | s[0], z = 8191 & q, F = q >>> 13, K = 0 | s[1], H = 8191 & K, W = K >>> 13, V = 0 | s[2], Y = 8191 & V, J = V >>> 13, G = 0 | s[3], X = 8191 & G, Z = G >>> 13, $ = 0 | s[4], Q = 8191 & $, ee = $ >>> 13, te = 0 | s[5], re = 8191 & te, ie = te >>> 13, ne = 0 | s[6], ae = 8191 & ne, oe = ne >>> 13, se = 0 | s[7], fe = 8191 & se, ce = se >>> 13, ue = 0 | s[8], he = 8191 & ue, de = ue >>> 13, le = 0 | s[9], pe = 8191 & le, be = le >>> 13;
r.negative = e.negative ^ t.negative;
r.length = 19;
var me = (c + (i = Math.imul(h, z)) | 0) + ((8191 & (n = (n = Math.imul(h, F)) + Math.imul(d, z) | 0)) << 13) | 0;
c = ((a = Math.imul(d, F)) + (n >>> 13) | 0) + (me >>> 26) | 0;
me &= 67108863;
i = Math.imul(p, z);
n = (n = Math.imul(p, F)) + Math.imul(b, z) | 0;
a = Math.imul(b, F);
var ge = (c + (i = i + Math.imul(h, H) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, W) | 0) + Math.imul(d, H) | 0)) << 13) | 0;
c = ((a = a + Math.imul(d, W) | 0) + (n >>> 13) | 0) + (ge >>> 26) | 0;
ge &= 67108863;
i = Math.imul(g, z);
n = (n = Math.imul(g, F)) + Math.imul(y, z) | 0;
a = Math.imul(y, F);
i = i + Math.imul(p, H) | 0;
n = (n = n + Math.imul(p, W) | 0) + Math.imul(b, H) | 0;
a = a + Math.imul(b, W) | 0;
var ye = (c + (i = i + Math.imul(h, Y) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, J) | 0) + Math.imul(d, Y) | 0)) << 13) | 0;
c = ((a = a + Math.imul(d, J) | 0) + (n >>> 13) | 0) + (ye >>> 26) | 0;
ye &= 67108863;
i = Math.imul(_, z);
n = (n = Math.imul(_, F)) + Math.imul(w, z) | 0;
a = Math.imul(w, F);
i = i + Math.imul(g, H) | 0;
n = (n = n + Math.imul(g, W) | 0) + Math.imul(y, H) | 0;
a = a + Math.imul(y, W) | 0;
i = i + Math.imul(p, Y) | 0;
n = (n = n + Math.imul(p, J) | 0) + Math.imul(b, Y) | 0;
a = a + Math.imul(b, J) | 0;
var ve = (c + (i = i + Math.imul(h, X) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, Z) | 0) + Math.imul(d, X) | 0)) << 13) | 0;
c = ((a = a + Math.imul(d, Z) | 0) + (n >>> 13) | 0) + (ve >>> 26) | 0;
ve &= 67108863;
i = Math.imul(S, z);
n = (n = Math.imul(S, F)) + Math.imul(E, z) | 0;
a = Math.imul(E, F);
i = i + Math.imul(_, H) | 0;
n = (n = n + Math.imul(_, W) | 0) + Math.imul(w, H) | 0;
a = a + Math.imul(w, W) | 0;
i = i + Math.imul(g, Y) | 0;
n = (n = n + Math.imul(g, J) | 0) + Math.imul(y, Y) | 0;
a = a + Math.imul(y, J) | 0;
i = i + Math.imul(p, X) | 0;
n = (n = n + Math.imul(p, Z) | 0) + Math.imul(b, X) | 0;
a = a + Math.imul(b, Z) | 0;
var _e = (c + (i = i + Math.imul(h, Q) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, ee) | 0) + Math.imul(d, Q) | 0)) << 13) | 0;
c = ((a = a + Math.imul(d, ee) | 0) + (n >>> 13) | 0) + (_e >>> 26) | 0;
_e &= 67108863;
i = Math.imul(A, z);
n = (n = Math.imul(A, F)) + Math.imul(x, z) | 0;
a = Math.imul(x, F);
i = i + Math.imul(S, H) | 0;
n = (n = n + Math.imul(S, W) | 0) + Math.imul(E, H) | 0;
a = a + Math.imul(E, W) | 0;
i = i + Math.imul(_, Y) | 0;
n = (n = n + Math.imul(_, J) | 0) + Math.imul(w, Y) | 0;
a = a + Math.imul(w, J) | 0;
i = i + Math.imul(g, X) | 0;
n = (n = n + Math.imul(g, Z) | 0) + Math.imul(y, X) | 0;
a = a + Math.imul(y, Z) | 0;
i = i + Math.imul(p, Q) | 0;
n = (n = n + Math.imul(p, ee) | 0) + Math.imul(b, Q) | 0;
a = a + Math.imul(b, ee) | 0;
var we = (c + (i = i + Math.imul(h, re) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, ie) | 0) + Math.imul(d, re) | 0)) << 13) | 0;
c = ((a = a + Math.imul(d, ie) | 0) + (n >>> 13) | 0) + (we >>> 26) | 0;
we &= 67108863;
i = Math.imul(T, z);
n = (n = Math.imul(T, F)) + Math.imul(B, z) | 0;
a = Math.imul(B, F);
i = i + Math.imul(A, H) | 0;
n = (n = n + Math.imul(A, W) | 0) + Math.imul(x, H) | 0;
a = a + Math.imul(x, W) | 0;
i = i + Math.imul(S, Y) | 0;
n = (n = n + Math.imul(S, J) | 0) + Math.imul(E, Y) | 0;
a = a + Math.imul(E, J) | 0;
i = i + Math.imul(_, X) | 0;
n = (n = n + Math.imul(_, Z) | 0) + Math.imul(w, X) | 0;
a = a + Math.imul(w, Z) | 0;
i = i + Math.imul(g, Q) | 0;
n = (n = n + Math.imul(g, ee) | 0) + Math.imul(y, Q) | 0;
a = a + Math.imul(y, ee) | 0;
i = i + Math.imul(p, re) | 0;
n = (n = n + Math.imul(p, ie) | 0) + Math.imul(b, re) | 0;
a = a + Math.imul(b, ie) | 0;
var Me = (c + (i = i + Math.imul(h, ae) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, oe) | 0) + Math.imul(d, ae) | 0)) << 13) | 0;
c = ((a = a + Math.imul(d, oe) | 0) + (n >>> 13) | 0) + (Me >>> 26) | 0;
Me &= 67108863;
i = Math.imul(I, z);
n = (n = Math.imul(I, F)) + Math.imul(P, z) | 0;
a = Math.imul(P, F);
i = i + Math.imul(T, H) | 0;
n = (n = n + Math.imul(T, W) | 0) + Math.imul(B, H) | 0;
a = a + Math.imul(B, W) | 0;
i = i + Math.imul(A, Y) | 0;
n = (n = n + Math.imul(A, J) | 0) + Math.imul(x, Y) | 0;
a = a + Math.imul(x, J) | 0;
i = i + Math.imul(S, X) | 0;
n = (n = n + Math.imul(S, Z) | 0) + Math.imul(E, X) | 0;
a = a + Math.imul(E, Z) | 0;
i = i + Math.imul(_, Q) | 0;
n = (n = n + Math.imul(_, ee) | 0) + Math.imul(w, Q) | 0;
a = a + Math.imul(w, ee) | 0;
i = i + Math.imul(g, re) | 0;
n = (n = n + Math.imul(g, ie) | 0) + Math.imul(y, re) | 0;
a = a + Math.imul(y, ie) | 0;
i = i + Math.imul(p, ae) | 0;
n = (n = n + Math.imul(p, oe) | 0) + Math.imul(b, ae) | 0;
a = a + Math.imul(b, oe) | 0;
var Se = (c + (i = i + Math.imul(h, fe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, ce) | 0) + Math.imul(d, fe) | 0)) << 13) | 0;
c = ((a = a + Math.imul(d, ce) | 0) + (n >>> 13) | 0) + (Se >>> 26) | 0;
Se &= 67108863;
i = Math.imul(O, z);
n = (n = Math.imul(O, F)) + Math.imul(L, z) | 0;
a = Math.imul(L, F);
i = i + Math.imul(I, H) | 0;
n = (n = n + Math.imul(I, W) | 0) + Math.imul(P, H) | 0;
a = a + Math.imul(P, W) | 0;
i = i + Math.imul(T, Y) | 0;
n = (n = n + Math.imul(T, J) | 0) + Math.imul(B, Y) | 0;
a = a + Math.imul(B, J) | 0;
i = i + Math.imul(A, X) | 0;
n = (n = n + Math.imul(A, Z) | 0) + Math.imul(x, X) | 0;
a = a + Math.imul(x, Z) | 0;
i = i + Math.imul(S, Q) | 0;
n = (n = n + Math.imul(S, ee) | 0) + Math.imul(E, Q) | 0;
a = a + Math.imul(E, ee) | 0;
i = i + Math.imul(_, re) | 0;
n = (n = n + Math.imul(_, ie) | 0) + Math.imul(w, re) | 0;
a = a + Math.imul(w, ie) | 0;
i = i + Math.imul(g, ae) | 0;
n = (n = n + Math.imul(g, oe) | 0) + Math.imul(y, ae) | 0;
a = a + Math.imul(y, oe) | 0;
i = i + Math.imul(p, fe) | 0;
n = (n = n + Math.imul(p, ce) | 0) + Math.imul(b, fe) | 0;
a = a + Math.imul(b, ce) | 0;
var Ee = (c + (i = i + Math.imul(h, he) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, de) | 0) + Math.imul(d, he) | 0)) << 13) | 0;
c = ((a = a + Math.imul(d, de) | 0) + (n >>> 13) | 0) + (Ee >>> 26) | 0;
Ee &= 67108863;
i = Math.imul(D, z);
n = (n = Math.imul(D, F)) + Math.imul(U, z) | 0;
a = Math.imul(U, F);
i = i + Math.imul(O, H) | 0;
n = (n = n + Math.imul(O, W) | 0) + Math.imul(L, H) | 0;
a = a + Math.imul(L, W) | 0;
i = i + Math.imul(I, Y) | 0;
n = (n = n + Math.imul(I, J) | 0) + Math.imul(P, Y) | 0;
a = a + Math.imul(P, J) | 0;
i = i + Math.imul(T, X) | 0;
n = (n = n + Math.imul(T, Z) | 0) + Math.imul(B, X) | 0;
a = a + Math.imul(B, Z) | 0;
i = i + Math.imul(A, Q) | 0;
n = (n = n + Math.imul(A, ee) | 0) + Math.imul(x, Q) | 0;
a = a + Math.imul(x, ee) | 0;
i = i + Math.imul(S, re) | 0;
n = (n = n + Math.imul(S, ie) | 0) + Math.imul(E, re) | 0;
a = a + Math.imul(E, ie) | 0;
i = i + Math.imul(_, ae) | 0;
n = (n = n + Math.imul(_, oe) | 0) + Math.imul(w, ae) | 0;
a = a + Math.imul(w, oe) | 0;
i = i + Math.imul(g, fe) | 0;
n = (n = n + Math.imul(g, ce) | 0) + Math.imul(y, fe) | 0;
a = a + Math.imul(y, ce) | 0;
i = i + Math.imul(p, he) | 0;
n = (n = n + Math.imul(p, de) | 0) + Math.imul(b, he) | 0;
a = a + Math.imul(b, de) | 0;
var ke = (c + (i = i + Math.imul(h, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, be) | 0) + Math.imul(d, pe) | 0)) << 13) | 0;
c = ((a = a + Math.imul(d, be) | 0) + (n >>> 13) | 0) + (ke >>> 26) | 0;
ke &= 67108863;
i = Math.imul(D, H);
n = (n = Math.imul(D, W)) + Math.imul(U, H) | 0;
a = Math.imul(U, W);
i = i + Math.imul(O, Y) | 0;
n = (n = n + Math.imul(O, J) | 0) + Math.imul(L, Y) | 0;
a = a + Math.imul(L, J) | 0;
i = i + Math.imul(I, X) | 0;
n = (n = n + Math.imul(I, Z) | 0) + Math.imul(P, X) | 0;
a = a + Math.imul(P, Z) | 0;
i = i + Math.imul(T, Q) | 0;
n = (n = n + Math.imul(T, ee) | 0) + Math.imul(B, Q) | 0;
a = a + Math.imul(B, ee) | 0;
i = i + Math.imul(A, re) | 0;
n = (n = n + Math.imul(A, ie) | 0) + Math.imul(x, re) | 0;
a = a + Math.imul(x, ie) | 0;
i = i + Math.imul(S, ae) | 0;
n = (n = n + Math.imul(S, oe) | 0) + Math.imul(E, ae) | 0;
a = a + Math.imul(E, oe) | 0;
i = i + Math.imul(_, fe) | 0;
n = (n = n + Math.imul(_, ce) | 0) + Math.imul(w, fe) | 0;
a = a + Math.imul(w, ce) | 0;
i = i + Math.imul(g, he) | 0;
n = (n = n + Math.imul(g, de) | 0) + Math.imul(y, he) | 0;
a = a + Math.imul(y, de) | 0;
var Ae = (c + (i = i + Math.imul(p, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(p, be) | 0) + Math.imul(b, pe) | 0)) << 13) | 0;
c = ((a = a + Math.imul(b, be) | 0) + (n >>> 13) | 0) + (Ae >>> 26) | 0;
Ae &= 67108863;
i = Math.imul(D, Y);
n = (n = Math.imul(D, J)) + Math.imul(U, Y) | 0;
a = Math.imul(U, J);
i = i + Math.imul(O, X) | 0;
n = (n = n + Math.imul(O, Z) | 0) + Math.imul(L, X) | 0;
a = a + Math.imul(L, Z) | 0;
i = i + Math.imul(I, Q) | 0;
n = (n = n + Math.imul(I, ee) | 0) + Math.imul(P, Q) | 0;
a = a + Math.imul(P, ee) | 0;
i = i + Math.imul(T, re) | 0;
n = (n = n + Math.imul(T, ie) | 0) + Math.imul(B, re) | 0;
a = a + Math.imul(B, ie) | 0;
i = i + Math.imul(A, ae) | 0;
n = (n = n + Math.imul(A, oe) | 0) + Math.imul(x, ae) | 0;
a = a + Math.imul(x, oe) | 0;
i = i + Math.imul(S, fe) | 0;
n = (n = n + Math.imul(S, ce) | 0) + Math.imul(E, fe) | 0;
a = a + Math.imul(E, ce) | 0;
i = i + Math.imul(_, he) | 0;
n = (n = n + Math.imul(_, de) | 0) + Math.imul(w, he) | 0;
a = a + Math.imul(w, de) | 0;
var xe = (c + (i = i + Math.imul(g, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(g, be) | 0) + Math.imul(y, pe) | 0)) << 13) | 0;
c = ((a = a + Math.imul(y, be) | 0) + (n >>> 13) | 0) + (xe >>> 26) | 0;
xe &= 67108863;
i = Math.imul(D, X);
n = (n = Math.imul(D, Z)) + Math.imul(U, X) | 0;
a = Math.imul(U, Z);
i = i + Math.imul(O, Q) | 0;
n = (n = n + Math.imul(O, ee) | 0) + Math.imul(L, Q) | 0;
a = a + Math.imul(L, ee) | 0;
i = i + Math.imul(I, re) | 0;
n = (n = n + Math.imul(I, ie) | 0) + Math.imul(P, re) | 0;
a = a + Math.imul(P, ie) | 0;
i = i + Math.imul(T, ae) | 0;
n = (n = n + Math.imul(T, oe) | 0) + Math.imul(B, ae) | 0;
a = a + Math.imul(B, oe) | 0;
i = i + Math.imul(A, fe) | 0;
n = (n = n + Math.imul(A, ce) | 0) + Math.imul(x, fe) | 0;
a = a + Math.imul(x, ce) | 0;
i = i + Math.imul(S, he) | 0;
n = (n = n + Math.imul(S, de) | 0) + Math.imul(E, he) | 0;
a = a + Math.imul(E, de) | 0;
var Re = (c + (i = i + Math.imul(_, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(_, be) | 0) + Math.imul(w, pe) | 0)) << 13) | 0;
c = ((a = a + Math.imul(w, be) | 0) + (n >>> 13) | 0) + (Re >>> 26) | 0;
Re &= 67108863;
i = Math.imul(D, Q);
n = (n = Math.imul(D, ee)) + Math.imul(U, Q) | 0;
a = Math.imul(U, ee);
i = i + Math.imul(O, re) | 0;
n = (n = n + Math.imul(O, ie) | 0) + Math.imul(L, re) | 0;
a = a + Math.imul(L, ie) | 0;
i = i + Math.imul(I, ae) | 0;
n = (n = n + Math.imul(I, oe) | 0) + Math.imul(P, ae) | 0;
a = a + Math.imul(P, oe) | 0;
i = i + Math.imul(T, fe) | 0;
n = (n = n + Math.imul(T, ce) | 0) + Math.imul(B, fe) | 0;
a = a + Math.imul(B, ce) | 0;
i = i + Math.imul(A, he) | 0;
n = (n = n + Math.imul(A, de) | 0) + Math.imul(x, he) | 0;
a = a + Math.imul(x, de) | 0;
var Te = (c + (i = i + Math.imul(S, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(S, be) | 0) + Math.imul(E, pe) | 0)) << 13) | 0;
c = ((a = a + Math.imul(E, be) | 0) + (n >>> 13) | 0) + (Te >>> 26) | 0;
Te &= 67108863;
i = Math.imul(D, re);
n = (n = Math.imul(D, ie)) + Math.imul(U, re) | 0;
a = Math.imul(U, ie);
i = i + Math.imul(O, ae) | 0;
n = (n = n + Math.imul(O, oe) | 0) + Math.imul(L, ae) | 0;
a = a + Math.imul(L, oe) | 0;
i = i + Math.imul(I, fe) | 0;
n = (n = n + Math.imul(I, ce) | 0) + Math.imul(P, fe) | 0;
a = a + Math.imul(P, ce) | 0;
i = i + Math.imul(T, he) | 0;
n = (n = n + Math.imul(T, de) | 0) + Math.imul(B, he) | 0;
a = a + Math.imul(B, de) | 0;
var Be = (c + (i = i + Math.imul(A, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(A, be) | 0) + Math.imul(x, pe) | 0)) << 13) | 0;
c = ((a = a + Math.imul(x, be) | 0) + (n >>> 13) | 0) + (Be >>> 26) | 0;
Be &= 67108863;
i = Math.imul(D, ae);
n = (n = Math.imul(D, oe)) + Math.imul(U, ae) | 0;
a = Math.imul(U, oe);
i = i + Math.imul(O, fe) | 0;
n = (n = n + Math.imul(O, ce) | 0) + Math.imul(L, fe) | 0;
a = a + Math.imul(L, ce) | 0;
i = i + Math.imul(I, he) | 0;
n = (n = n + Math.imul(I, de) | 0) + Math.imul(P, he) | 0;
a = a + Math.imul(P, de) | 0;
var je = (c + (i = i + Math.imul(T, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(T, be) | 0) + Math.imul(B, pe) | 0)) << 13) | 0;
c = ((a = a + Math.imul(B, be) | 0) + (n >>> 13) | 0) + (je >>> 26) | 0;
je &= 67108863;
i = Math.imul(D, fe);
n = (n = Math.imul(D, ce)) + Math.imul(U, fe) | 0;
a = Math.imul(U, ce);
i = i + Math.imul(O, he) | 0;
n = (n = n + Math.imul(O, de) | 0) + Math.imul(L, he) | 0;
a = a + Math.imul(L, de) | 0;
var Ie = (c + (i = i + Math.imul(I, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(I, be) | 0) + Math.imul(P, pe) | 0)) << 13) | 0;
c = ((a = a + Math.imul(P, be) | 0) + (n >>> 13) | 0) + (Ie >>> 26) | 0;
Ie &= 67108863;
i = Math.imul(D, he);
n = (n = Math.imul(D, de)) + Math.imul(U, he) | 0;
a = Math.imul(U, de);
var Pe = (c + (i = i + Math.imul(O, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(O, be) | 0) + Math.imul(L, pe) | 0)) << 13) | 0;
c = ((a = a + Math.imul(L, be) | 0) + (n >>> 13) | 0) + (Pe >>> 26) | 0;
Pe &= 67108863;
var Ce = (c + (i = Math.imul(D, pe)) | 0) + ((8191 & (n = (n = Math.imul(D, be)) + Math.imul(U, pe) | 0)) << 13) | 0;
c = ((a = Math.imul(U, be)) + (n >>> 13) | 0) + (Ce >>> 26) | 0;
Ce &= 67108863;
f[0] = me;
f[1] = ge;
f[2] = ye;
f[3] = ve;
f[4] = _e;
f[5] = we;
f[6] = Me;
f[7] = Se;
f[8] = Ee;
f[9] = ke;
f[10] = Ae;
f[11] = xe;
f[12] = Re;
f[13] = Te;
f[14] = Be;
f[15] = je;
f[16] = Ie;
f[17] = Pe;
f[18] = Ce;
if (0 !== c) {
f[19] = c;
r.length++;
}
return r;
};
Math.imul || (p = l);
function b(e, t, r) {
r.negative = t.negative ^ e.negative;
r.length = e.length + t.length;
for (var i = 0, n = 0, a = 0; a < r.length - 1; a++) {
var o = n;
n = 0;
for (var s = 67108863 & i, f = Math.min(a, t.length - 1), c = Math.max(0, a - e.length + 1); c <= f; c++) {
var u = a - c, h = (0 | e.words[u]) * (0 | t.words[c]), d = 67108863 & h;
s = 67108863 & (d = d + s | 0);
n += (o = (o = o + (h / 67108864 | 0) | 0) + (d >>> 26) | 0) >>> 26;
o &= 67108863;
}
r.words[a] = s;
i = o;
o = n;
}
0 !== i ? r.words[a] = i : r.length--;
return r.strip();
}
function m(e, t, r) {
return new g().mulp(e, t, r);
}
a.prototype.mulTo = function(e, t) {
var r = this.length + e.length;
return 10 === this.length && 10 === e.length ? p(this, e, t) : r < 63 ? l(this, e, t) : r < 1024 ? b(this, e, t) : m(this, e, t);
};
function g(e, t) {
this.x = e;
this.y = t;
}
g.prototype.makeRBT = function(e) {
for (var t = new Array(e), r = a.prototype._countBits(e) - 1, i = 0; i < e; i++) t[i] = this.revBin(i, r, e);
return t;
};
g.prototype.revBin = function(e, t, r) {
if (0 === e || e === r - 1) return e;
for (var i = 0, n = 0; n < t; n++) {
i |= (1 & e) << t - n - 1;
e >>= 1;
}
return i;
};
g.prototype.permute = function(e, t, r, i, n, a) {
for (var o = 0; o < a; o++) {
i[o] = t[e[o]];
n[o] = r[e[o]];
}
};
g.prototype.transform = function(e, t, r, i, n, a) {
this.permute(a, e, t, r, i, n);
for (var o = 1; o < n; o <<= 1) for (var s = o << 1, f = Math.cos(2 * Math.PI / s), c = Math.sin(2 * Math.PI / s), u = 0; u < n; u += s) for (var h = f, d = c, l = 0; l < o; l++) {
var p = r[u + l], b = i[u + l], m = r[u + l + o], g = i[u + l + o], y = h * m - d * g;
g = h * g + d * m;
m = y;
r[u + l] = p + m;
i[u + l] = b + g;
r[u + l + o] = p - m;
i[u + l + o] = b - g;
if (l !== s) {
y = f * h - c * d;
d = f * d + c * h;
h = y;
}
}
};
g.prototype.guessLen13b = function(e, t) {
var r = 1 | Math.max(t, e), i = 1 & r, n = 0;
for (r = r / 2 | 0; r; r >>>= 1) n++;
return 1 << n + 1 + i;
};
g.prototype.conjugate = function(e, t, r) {
if (!(r <= 1)) for (var i = 0; i < r / 2; i++) {
var n = e[i];
e[i] = e[r - i - 1];
e[r - i - 1] = n;
n = t[i];
t[i] = -t[r - i - 1];
t[r - i - 1] = -n;
}
};
g.prototype.normalize13b = function(e, t) {
for (var r = 0, i = 0; i < t / 2; i++) {
var n = 8192 * Math.round(e[2 * i + 1] / t) + Math.round(e[2 * i] / t) + r;
e[i] = 67108863 & n;
r = n < 67108864 ? 0 : n / 67108864 | 0;
}
return e;
};
g.prototype.convert13b = function(e, t, r, n) {
for (var a = 0, o = 0; o < t; o++) {
a += 0 | e[o];
r[2 * o] = 8191 & a;
a >>>= 13;
r[2 * o + 1] = 8191 & a;
a >>>= 13;
}
for (o = 2 * t; o < n; ++o) r[o] = 0;
i(0 === a);
i(0 == (-8192 & a));
};
g.prototype.stub = function(e) {
for (var t = new Array(e), r = 0; r < e; r++) t[r] = 0;
return t;
};
g.prototype.mulp = function(e, t, r) {
var i = 2 * this.guessLen13b(e.length, t.length), n = this.makeRBT(i), a = this.stub(i), o = new Array(i), s = new Array(i), f = new Array(i), c = new Array(i), u = new Array(i), h = new Array(i), d = r.words;
d.length = i;
this.convert13b(e.words, e.length, o, i);
this.convert13b(t.words, t.length, c, i);
this.transform(o, a, s, f, i, n);
this.transform(c, a, u, h, i, n);
for (var l = 0; l < i; l++) {
var p = s[l] * u[l] - f[l] * h[l];
f[l] = s[l] * h[l] + f[l] * u[l];
s[l] = p;
}
this.conjugate(s, f, i);
this.transform(s, f, d, a, i, n);
this.conjugate(d, a, i);
this.normalize13b(d, i);
r.negative = e.negative ^ t.negative;
r.length = e.length + t.length;
return r.strip();
};
a.prototype.mul = function(e) {
var t = new a(null);
t.words = new Array(this.length + e.length);
return this.mulTo(e, t);
};
a.prototype.mulf = function(e) {
var t = new a(null);
t.words = new Array(this.length + e.length);
return m(this, e, t);
};
a.prototype.imul = function(e) {
return this.clone().mulTo(e, this);
};
a.prototype.imuln = function(e) {
i("number" == typeof e);
i(e < 67108864);
for (var t = 0, r = 0; r < this.length; r++) {
var n = (0 | this.words[r]) * e, a = (67108863 & n) + (67108863 & t);
t >>= 26;
t += n / 67108864 | 0;
t += a >>> 26;
this.words[r] = 67108863 & a;
}
if (0 !== t) {
this.words[r] = t;
this.length++;
}
return this;
};
a.prototype.muln = function(e) {
return this.clone().imuln(e);
};
a.prototype.sqr = function() {
return this.mul(this);
};
a.prototype.isqr = function() {
return this.imul(this.clone());
};
a.prototype.pow = function(e) {
var t = d(e);
if (0 === t.length) return new a(1);
for (var r = this, i = 0; i < t.length && 0 === t[i]; i++, r = r.sqr()) ;
if (++i < t.length) for (var n = r.sqr(); i < t.length; i++, n = n.sqr()) 0 !== t[i] && (r = r.mul(n));
return r;
};
a.prototype.iushln = function(e) {
i("number" == typeof e && e >= 0);
var t, r = e % 26, n = (e - r) / 26, a = 67108863 >>> 26 - r << 26 - r;
if (0 !== r) {
var o = 0;
for (t = 0; t < this.length; t++) {
var s = this.words[t] & a, f = (0 | this.words[t]) - s << r;
this.words[t] = f | o;
o = s >>> 26 - r;
}
if (o) {
this.words[t] = o;
this.length++;
}
}
if (0 !== n) {
for (t = this.length - 1; t >= 0; t--) this.words[t + n] = this.words[t];
for (t = 0; t < n; t++) this.words[t] = 0;
this.length += n;
}
return this.strip();
};
a.prototype.ishln = function(e) {
i(0 === this.negative);
return this.iushln(e);
};
a.prototype.iushrn = function(e, t, r) {
i("number" == typeof e && e >= 0);
var n;
n = t ? (t - t % 26) / 26 : 0;
var a = e % 26, o = Math.min((e - a) / 26, this.length), s = 67108863 ^ 67108863 >>> a << a, f = r;
n -= o;
n = Math.max(0, n);
if (f) {
for (var c = 0; c < o; c++) f.words[c] = this.words[c];
f.length = o;
}
if (0 === o) ; else if (this.length > o) {
this.length -= o;
for (c = 0; c < this.length; c++) this.words[c] = this.words[c + o];
} else {
this.words[0] = 0;
this.length = 1;
}
var u = 0;
for (c = this.length - 1; c >= 0 && (0 !== u || c >= n); c--) {
var h = 0 | this.words[c];
this.words[c] = u << 26 - a | h >>> a;
u = h & s;
}
f && 0 !== u && (f.words[f.length++] = u);
if (0 === this.length) {
this.words[0] = 0;
this.length = 1;
}
return this.strip();
};
a.prototype.ishrn = function(e, t, r) {
i(0 === this.negative);
return this.iushrn(e, t, r);
};
a.prototype.shln = function(e) {
return this.clone().ishln(e);
};
a.prototype.ushln = function(e) {
return this.clone().iushln(e);
};
a.prototype.shrn = function(e) {
return this.clone().ishrn(e);
};
a.prototype.ushrn = function(e) {
return this.clone().iushrn(e);
};
a.prototype.testn = function(e) {
i("number" == typeof e && e >= 0);
var t = e % 26, r = (e - t) / 26, n = 1 << t;
return !(this.length <= r || !(this.words[r] & n));
};
a.prototype.imaskn = function(e) {
i("number" == typeof e && e >= 0);
var t = e % 26, r = (e - t) / 26;
i(0 === this.negative, "imaskn works only with positive numbers");
if (this.length <= r) return this;
0 !== t && r++;
this.length = Math.min(r, this.length);
if (0 !== t) {
var n = 67108863 ^ 67108863 >>> t << t;
this.words[this.length - 1] &= n;
}
return this.strip();
};
a.prototype.maskn = function(e) {
return this.clone().imaskn(e);
};
a.prototype.iaddn = function(e) {
i("number" == typeof e);
i(e < 67108864);
if (e < 0) return this.isubn(-e);
if (0 !== this.negative) {
if (1 === this.length && (0 | this.words[0]) < e) {
this.words[0] = e - (0 | this.words[0]);
this.negative = 0;
return this;
}
this.negative = 0;
this.isubn(e);
this.negative = 1;
return this;
}
return this._iaddn(e);
};
a.prototype._iaddn = function(e) {
this.words[0] += e;
for (var t = 0; t < this.length && this.words[t] >= 67108864; t++) {
this.words[t] -= 67108864;
t === this.length - 1 ? this.words[t + 1] = 1 : this.words[t + 1]++;
}
this.length = Math.max(this.length, t + 1);
return this;
};
a.prototype.isubn = function(e) {
i("number" == typeof e);
i(e < 67108864);
if (e < 0) return this.iaddn(-e);
if (0 !== this.negative) {
this.negative = 0;
this.iaddn(e);
this.negative = 1;
return this;
}
this.words[0] -= e;
if (1 === this.length && this.words[0] < 0) {
this.words[0] = -this.words[0];
this.negative = 1;
} else for (var t = 0; t < this.length && this.words[t] < 0; t++) {
this.words[t] += 67108864;
this.words[t + 1] -= 1;
}
return this.strip();
};
a.prototype.addn = function(e) {
return this.clone().iaddn(e);
};
a.prototype.subn = function(e) {
return this.clone().isubn(e);
};
a.prototype.iabs = function() {
this.negative = 0;
return this;
};
a.prototype.abs = function() {
return this.clone().iabs();
};
a.prototype._ishlnsubmul = function(e, t, r) {
var n, a, o = e.length + r;
this._expand(o);
var s = 0;
for (n = 0; n < e.length; n++) {
a = (0 | this.words[n + r]) + s;
var f = (0 | e.words[n]) * t;
s = ((a -= 67108863 & f) >> 26) - (f / 67108864 | 0);
this.words[n + r] = 67108863 & a;
}
for (;n < this.length - r; n++) {
s = (a = (0 | this.words[n + r]) + s) >> 26;
this.words[n + r] = 67108863 & a;
}
if (0 === s) return this.strip();
i(-1 === s);
s = 0;
for (n = 0; n < this.length; n++) {
s = (a = -(0 | this.words[n]) + s) >> 26;
this.words[n] = 67108863 & a;
}
this.negative = 1;
return this.strip();
};
a.prototype._wordDiv = function(e, t) {
var r = (this.length, e.length), i = this.clone(), n = e, o = 0 | n.words[n.length - 1];
if (0 != (r = 26 - this._countBits(o))) {
n = n.ushln(r);
i.iushln(r);
o = 0 | n.words[n.length - 1];
}
var s, f = i.length - n.length;
if ("mod" !== t) {
(s = new a(null)).length = f + 1;
s.words = new Array(s.length);
for (var c = 0; c < s.length; c++) s.words[c] = 0;
}
var u = i.clone()._ishlnsubmul(n, 1, f);
if (0 === u.negative) {
i = u;
s && (s.words[f] = 1);
}
for (var h = f - 1; h >= 0; h--) {
var d = 67108864 * (0 | i.words[n.length + h]) + (0 | i.words[n.length + h - 1]);
d = Math.min(d / o | 0, 67108863);
i._ishlnsubmul(n, d, h);
for (;0 !== i.negative; ) {
d--;
i.negative = 0;
i._ishlnsubmul(n, 1, h);
i.isZero() || (i.negative ^= 1);
}
s && (s.words[h] = d);
}
s && s.strip();
i.strip();
"div" !== t && 0 !== r && i.iushrn(r);
return {
div: s || null,
mod: i
};
};
a.prototype.divmod = function(e, t, r) {
i(!e.isZero());
if (this.isZero()) return {
div: new a(0),
mod: new a(0)
};
var n, o, s;
if (0 !== this.negative && 0 === e.negative) {
s = this.neg().divmod(e, t);
"mod" !== t && (n = s.div.neg());
if ("div" !== t) {
o = s.mod.neg();
r && 0 !== o.negative && o.iadd(e);
}
return {
div: n,
mod: o
};
}
if (0 === this.negative && 0 !== e.negative) {
s = this.divmod(e.neg(), t);
"mod" !== t && (n = s.div.neg());
return {
div: n,
mod: s.mod
};
}
if (0 != (this.negative & e.negative)) {
s = this.neg().divmod(e.neg(), t);
if ("div" !== t) {
o = s.mod.neg();
r && 0 !== o.negative && o.isub(e);
}
return {
div: s.div,
mod: o
};
}
return e.length > this.length || this.cmp(e) < 0 ? {
div: new a(0),
mod: this
} : 1 === e.length ? "div" === t ? {
div: this.divn(e.words[0]),
mod: null
} : "mod" === t ? {
div: null,
mod: new a(this.modn(e.words[0]))
} : {
div: this.divn(e.words[0]),
mod: new a(this.modn(e.words[0]))
} : this._wordDiv(e, t);
};
a.prototype.div = function(e) {
return this.divmod(e, "div", !1).div;
};
a.prototype.mod = function(e) {
return this.divmod(e, "mod", !1).mod;
};
a.prototype.umod = function(e) {
return this.divmod(e, "mod", !0).mod;
};
a.prototype.divRound = function(e) {
var t = this.divmod(e);
if (t.mod.isZero()) return t.div;
var r = 0 !== t.div.negative ? t.mod.isub(e) : t.mod, i = e.ushrn(1), n = e.andln(1), a = r.cmp(i);
return a < 0 || 1 === n && 0 === a ? t.div : 0 !== t.div.negative ? t.div.isubn(1) : t.div.iaddn(1);
};
a.prototype.modn = function(e) {
i(e <= 67108863);
for (var t = (1 << 26) % e, r = 0, n = this.length - 1; n >= 0; n--) r = (t * r + (0 | this.words[n])) % e;
return r;
};
a.prototype.idivn = function(e) {
i(e <= 67108863);
for (var t = 0, r = this.length - 1; r >= 0; r--) {
var n = (0 | this.words[r]) + 67108864 * t;
this.words[r] = n / e | 0;
t = n % e;
}
return this.strip();
};
a.prototype.divn = function(e) {
return this.clone().idivn(e);
};
a.prototype.egcd = function(e) {
i(0 === e.negative);
i(!e.isZero());
var t = this, r = e.clone();
t = 0 !== t.negative ? t.umod(e) : t.clone();
for (var n = new a(1), o = new a(0), s = new a(0), f = new a(1), c = 0; t.isEven() && r.isEven(); ) {
t.iushrn(1);
r.iushrn(1);
++c;
}
for (var u = r.clone(), h = t.clone(); !t.isZero(); ) {
for (var d = 0, l = 1; 0 == (t.words[0] & l) && d < 26; ++d, l <<= 1) ;
if (d > 0) {
t.iushrn(d);
for (;d-- > 0; ) {
if (n.isOdd() || o.isOdd()) {
n.iadd(u);
o.isub(h);
}
n.iushrn(1);
o.iushrn(1);
}
}
for (var p = 0, b = 1; 0 == (r.words[0] & b) && p < 26; ++p, b <<= 1) ;
if (p > 0) {
r.iushrn(p);
for (;p-- > 0; ) {
if (s.isOdd() || f.isOdd()) {
s.iadd(u);
f.isub(h);
}
s.iushrn(1);
f.iushrn(1);
}
}
if (t.cmp(r) >= 0) {
t.isub(r);
n.isub(s);
o.isub(f);
} else {
r.isub(t);
s.isub(n);
f.isub(o);
}
}
return {
a: s,
b: f,
gcd: r.iushln(c)
};
};
a.prototype._invmp = function(e) {
i(0 === e.negative);
i(!e.isZero());
var t = this, r = e.clone();
t = 0 !== t.negative ? t.umod(e) : t.clone();
for (var n, o = new a(1), s = new a(0), f = r.clone(); t.cmpn(1) > 0 && r.cmpn(1) > 0; ) {
for (var c = 0, u = 1; 0 == (t.words[0] & u) && c < 26; ++c, u <<= 1) ;
if (c > 0) {
t.iushrn(c);
for (;c-- > 0; ) {
o.isOdd() && o.iadd(f);
o.iushrn(1);
}
}
for (var h = 0, d = 1; 0 == (r.words[0] & d) && h < 26; ++h, d <<= 1) ;
if (h > 0) {
r.iushrn(h);
for (;h-- > 0; ) {
s.isOdd() && s.iadd(f);
s.iushrn(1);
}
}
if (t.cmp(r) >= 0) {
t.isub(r);
o.isub(s);
} else {
r.isub(t);
s.isub(o);
}
}
(n = 0 === t.cmpn(1) ? o : s).cmpn(0) < 0 && n.iadd(e);
return n;
};
a.prototype.gcd = function(e) {
if (this.isZero()) return e.abs();
if (e.isZero()) return this.abs();
var t = this.clone(), r = e.clone();
t.negative = 0;
r.negative = 0;
for (var i = 0; t.isEven() && r.isEven(); i++) {
t.iushrn(1);
r.iushrn(1);
}
for (;;) {
for (;t.isEven(); ) t.iushrn(1);
for (;r.isEven(); ) r.iushrn(1);
var n = t.cmp(r);
if (n < 0) {
var a = t;
t = r;
r = a;
} else if (0 === n || 0 === r.cmpn(1)) break;
t.isub(r);
}
return r.iushln(i);
};
a.prototype.invm = function(e) {
return this.egcd(e).a.umod(e);
};
a.prototype.isEven = function() {
return 0 == (1 & this.words[0]);
};
a.prototype.isOdd = function() {
return 1 == (1 & this.words[0]);
};
a.prototype.andln = function(e) {
return this.words[0] & e;
};
a.prototype.bincn = function(e) {
i("number" == typeof e);
var t = e % 26, r = (e - t) / 26, n = 1 << t;
if (this.length <= r) {
this._expand(r + 1);
this.words[r] |= n;
return this;
}
for (var a = n, o = r; 0 !== a && o < this.length; o++) {
var s = 0 | this.words[o];
a = (s += a) >>> 26;
s &= 67108863;
this.words[o] = s;
}
if (0 !== a) {
this.words[o] = a;
this.length++;
}
return this;
};
a.prototype.isZero = function() {
return 1 === this.length && 0 === this.words[0];
};
a.prototype.cmpn = function(e) {
var t, r = e < 0;
if (0 !== this.negative && !r) return -1;
if (0 === this.negative && r) return 1;
this.strip();
if (this.length > 1) t = 1; else {
r && (e = -e);
i(e <= 67108863, "Number is too big");
var n = 0 | this.words[0];
t = n === e ? 0 : n < e ? -1 : 1;
}
return 0 !== this.negative ? 0 | -t : t;
};
a.prototype.cmp = function(e) {
if (0 !== this.negative && 0 === e.negative) return -1;
if (0 === this.negative && 0 !== e.negative) return 1;
var t = this.ucmp(e);
return 0 !== this.negative ? 0 | -t : t;
};
a.prototype.ucmp = function(e) {
if (this.length > e.length) return 1;
if (this.length < e.length) return -1;
for (var t = 0, r = this.length - 1; r >= 0; r--) {
var i = 0 | this.words[r], n = 0 | e.words[r];
if (i !== n) {
i < n ? t = -1 : i > n && (t = 1);
break;
}
}
return t;
};
a.prototype.gtn = function(e) {
return 1 === this.cmpn(e);
};
a.prototype.gt = function(e) {
return 1 === this.cmp(e);
};
a.prototype.gten = function(e) {
return this.cmpn(e) >= 0;
};
a.prototype.gte = function(e) {
return this.cmp(e) >= 0;
};
a.prototype.ltn = function(e) {
return -1 === this.cmpn(e);
};
a.prototype.lt = function(e) {
return -1 === this.cmp(e);
};
a.prototype.lten = function(e) {
return this.cmpn(e) <= 0;
};
a.prototype.lte = function(e) {
return this.cmp(e) <= 0;
};
a.prototype.eqn = function(e) {
return 0 === this.cmpn(e);
};
a.prototype.eq = function(e) {
return 0 === this.cmp(e);
};
a.red = function(e) {
return new E(e);
};
a.prototype.toRed = function(e) {
i(!this.red, "Already a number in reduction context");
i(0 === this.negative, "red works only with positives");
return e.convertTo(this)._forceRed(e);
};
a.prototype.fromRed = function() {
i(this.red, "fromRed works only with numbers in reduction context");
return this.red.convertFrom(this);
};
a.prototype._forceRed = function(e) {
this.red = e;
return this;
};
a.prototype.forceRed = function(e) {
i(!this.red, "Already a number in reduction context");
return this._forceRed(e);
};
a.prototype.redAdd = function(e) {
i(this.red, "redAdd works only with red numbers");
return this.red.add(this, e);
};
a.prototype.redIAdd = function(e) {
i(this.red, "redIAdd works only with red numbers");
return this.red.iadd(this, e);
};
a.prototype.redSub = function(e) {
i(this.red, "redSub works only with red numbers");
return this.red.sub(this, e);
};
a.prototype.redISub = function(e) {
i(this.red, "redISub works only with red numbers");
return this.red.isub(this, e);
};
a.prototype.redShl = function(e) {
i(this.red, "redShl works only with red numbers");
return this.red.shl(this, e);
};
a.prototype.redMul = function(e) {
i(this.red, "redMul works only with red numbers");
this.red._verify2(this, e);
return this.red.mul(this, e);
};
a.prototype.redIMul = function(e) {
i(this.red, "redMul works only with red numbers");
this.red._verify2(this, e);
return this.red.imul(this, e);
};
a.prototype.redSqr = function() {
i(this.red, "redSqr works only with red numbers");
this.red._verify1(this);
return this.red.sqr(this);
};
a.prototype.redISqr = function() {
i(this.red, "redISqr works only with red numbers");
this.red._verify1(this);
return this.red.isqr(this);
};
a.prototype.redSqrt = function() {
i(this.red, "redSqrt works only with red numbers");
this.red._verify1(this);
return this.red.sqrt(this);
};
a.prototype.redInvm = function() {
i(this.red, "redInvm works only with red numbers");
this.red._verify1(this);
return this.red.invm(this);
};
a.prototype.redNeg = function() {
i(this.red, "redNeg works only with red numbers");
this.red._verify1(this);
return this.red.neg(this);
};
a.prototype.redPow = function(e) {
i(this.red && !e.red, "redPow(normalNum)");
this.red._verify1(this);
return this.red.pow(this, e);
};
var y = {
k256: null,
p224: null,
p192: null,
p25519: null
};
function v(e, t) {
this.name = e;
this.p = new a(t, 16);
this.n = this.p.bitLength();
this.k = new a(1).iushln(this.n).isub(this.p);
this.tmp = this._tmp();
}
v.prototype._tmp = function() {
var e = new a(null);
e.words = new Array(Math.ceil(this.n / 13));
return e;
};
v.prototype.ireduce = function(e) {
var t, r = e;
do {
this.split(r, this.tmp);
t = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength();
} while (t > this.n);
var i = t < this.n ? -1 : r.ucmp(this.p);
if (0 === i) {
r.words[0] = 0;
r.length = 1;
} else i > 0 ? r.isub(this.p) : void 0 !== r.strip ? r.strip() : r._strip();
return r;
};
v.prototype.split = function(e, t) {
e.iushrn(this.n, 0, t);
};
v.prototype.imulK = function(e) {
return e.imul(this.k);
};
function _() {
v.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
}
n(_, v);
_.prototype.split = function(e, t) {
for (var r = Math.min(e.length, 9), i = 0; i < r; i++) t.words[i] = e.words[i];
t.length = r;
if (e.length <= 9) {
e.words[0] = 0;
e.length = 1;
} else {
var n = e.words[9];
t.words[t.length++] = 4194303 & n;
for (i = 10; i < e.length; i++) {
var a = 0 | e.words[i];
e.words[i - 10] = (4194303 & a) << 4 | n >>> 22;
n = a;
}
n >>>= 22;
e.words[i - 10] = n;
0 === n && e.length > 10 ? e.length -= 10 : e.length -= 9;
}
};
_.prototype.imulK = function(e) {
e.words[e.length] = 0;
e.words[e.length + 1] = 0;
e.length += 2;
for (var t = 0, r = 0; r < e.length; r++) {
var i = 0 | e.words[r];
t += 977 * i;
e.words[r] = 67108863 & t;
t = 64 * i + (t / 67108864 | 0);
}
if (0 === e.words[e.length - 1]) {
e.length--;
0 === e.words[e.length - 1] && e.length--;
}
return e;
};
function w() {
v.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
}
n(w, v);
function M() {
v.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
}
n(M, v);
function S() {
v.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
}
n(S, v);
S.prototype.imulK = function(e) {
for (var t = 0, r = 0; r < e.length; r++) {
var i = 19 * (0 | e.words[r]) + t, n = 67108863 & i;
i >>>= 26;
e.words[r] = n;
t = i;
}
0 !== t && (e.words[e.length++] = t);
return e;
};
a._prime = function(e) {
if (y[e]) return y[e];
var t;
if ("k256" === e) t = new _(); else if ("p224" === e) t = new w(); else if ("p192" === e) t = new M(); else {
if ("p25519" !== e) throw new Error("Unknown prime " + e);
t = new S();
}
y[e] = t;
return t;
};
function E(e) {
if ("string" == typeof e) {
var t = a._prime(e);
this.m = t.p;
this.prime = t;
} else {
i(e.gtn(1), "modulus must be greater than 1");
this.m = e;
this.prime = null;
}
}
E.prototype._verify1 = function(e) {
i(0 === e.negative, "red works only with positives");
i(e.red, "red works only with red numbers");
};
E.prototype._verify2 = function(e, t) {
i(0 == (e.negative | t.negative), "red works only with positives");
i(e.red && e.red === t.red, "red works only with red numbers");
};
E.prototype.imod = function(e) {
return this.prime ? this.prime.ireduce(e)._forceRed(this) : e.umod(this.m)._forceRed(this);
};
E.prototype.neg = function(e) {
return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this);
};
E.prototype.add = function(e, t) {
this._verify2(e, t);
var r = e.add(t);
r.cmp(this.m) >= 0 && r.isub(this.m);
return r._forceRed(this);
};
E.prototype.iadd = function(e, t) {
this._verify2(e, t);
var r = e.iadd(t);
r.cmp(this.m) >= 0 && r.isub(this.m);
return r;
};
E.prototype.sub = function(e, t) {
this._verify2(e, t);
var r = e.sub(t);
r.cmpn(0) < 0 && r.iadd(this.m);
return r._forceRed(this);
};
E.prototype.isub = function(e, t) {
this._verify2(e, t);
var r = e.isub(t);
r.cmpn(0) < 0 && r.iadd(this.m);
return r;
};
E.prototype.shl = function(e, t) {
this._verify1(e);
return this.imod(e.ushln(t));
};
E.prototype.imul = function(e, t) {
this._verify2(e, t);
return this.imod(e.imul(t));
};
E.prototype.mul = function(e, t) {
this._verify2(e, t);
return this.imod(e.mul(t));
};
E.prototype.isqr = function(e) {
return this.imul(e, e.clone());
};
E.prototype.sqr = function(e) {
return this.mul(e, e);
};
E.prototype.sqrt = function(e) {
if (e.isZero()) return e.clone();
var t = this.m.andln(3);
i(t % 2 == 1);
if (3 === t) {
var r = this.m.add(new a(1)).iushrn(2);
return this.pow(e, r);
}
for (var n = this.m.subn(1), o = 0; !n.isZero() && 0 === n.andln(1); ) {
o++;
n.iushrn(1);
}
i(!n.isZero());
var s = new a(1).toRed(this), f = s.redNeg(), c = this.m.subn(1).iushrn(1), u = this.m.bitLength();
u = new a(2 * u * u).toRed(this);
for (;0 !== this.pow(u, c).cmp(f); ) u.redIAdd(f);
for (var h = this.pow(u, n), d = this.pow(e, n.addn(1).iushrn(1)), l = this.pow(e, n), p = o; 0 !== l.cmp(s); ) {
for (var b = l, m = 0; 0 !== b.cmp(s); m++) b = b.redSqr();
i(m < p);
var g = this.pow(h, new a(1).iushln(p - m - 1));
d = d.redMul(g);
h = g.redSqr();
l = l.redMul(h);
p = m;
}
return d;
};
E.prototype.invm = function(e) {
var t = e._invmp(this.m);
if (0 !== t.negative) {
t.negative = 0;
return this.imod(t).redNeg();
}
return this.imod(t);
};
E.prototype.pow = function(e, t) {
if (t.isZero()) return new a(1).toRed(this);
if (0 === t.cmpn(1)) return e.clone();
var r = new Array(16);
r[0] = new a(1).toRed(this);
r[1] = e;
for (var i = 2; i < r.length; i++) r[i] = this.mul(r[i - 1], e);
var n = r[0], o = 0, s = 0, f = t.bitLength() % 26;
0 === f && (f = 26);
for (i = t.length - 1; i >= 0; i--) {
for (var c = t.words[i], u = f - 1; u >= 0; u--) {
var h = c >> u & 1;
n !== r[0] && (n = this.sqr(n));
if (0 !== h || 0 !== o) {
o <<= 1;
o |= h;
if (4 == ++s || 0 === i && 0 === u) {
n = this.mul(n, r[o]);
s = 0;
o = 0;
}
} else s = 0;
}
f = 26;
}
return n;
};
E.prototype.convertTo = function(e) {
var t = e.umod(this.m);
return t === e ? t.clone() : t;
};
E.prototype.convertFrom = function(e) {
var t = e.clone();
t.red = null;
return t;
};
a.mont = function(e) {
return new k(e);
};
function k(e) {
E.call(this, e);
this.shift = this.m.bitLength();
this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26);
this.r = new a(1).iushln(this.shift);
this.r2 = this.imod(this.r.sqr());
this.rinv = this.r._invmp(this.m);
this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
this.minv = this.minv.umod(this.r);
this.minv = this.r.sub(this.minv);
}
n(k, E);
k.prototype.convertTo = function(e) {
return this.imod(e.ushln(this.shift));
};
k.prototype.convertFrom = function(e) {
var t = this.imod(e.mul(this.rinv));
t.red = null;
return t;
};
k.prototype.imul = function(e, t) {
if (e.isZero() || t.isZero()) {
e.words[0] = 0;
e.length = 1;
return e;
}
var r = e.imul(t), i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), n = r.isub(i).iushrn(this.shift), a = n;
n.cmp(this.m) >= 0 ? a = n.isub(this.m) : n.cmpn(0) < 0 && (a = n.iadd(this.m));
return a._forceRed(this);
};
k.prototype.mul = function(e, t) {
if (e.isZero() || t.isZero()) return new a(0)._forceRed(this);
var r = e.mul(t), i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), n = r.isub(i).iushrn(this.shift), o = n;
n.cmp(this.m) >= 0 ? o = n.isub(this.m) : n.cmpn(0) < 0 && (o = n.iadd(this.m));
return o._forceRed(this);
};
k.prototype.invm = function(e) {
return this.imod(e._invmp(this.m).mul(this.r2))._forceRed(this);
};
})("undefined" == typeof t || t, this);
}, {
buffer: 19
} ],
16: [ function(e, t, r) {
"use strict";
r.byteLength = function(e) {
var t = c(e), r = t[0], i = t[1];
return 3 * (r + i) / 4 - i;
};
r.toByteArray = function(e) {
var t, r, i = c(e), o = i[0], s = i[1], f = new a(u(0, o, s)), h = 0, d = s > 0 ? o - 4 : o;
for (r = 0; r < d; r += 4) {
t = n[e.charCodeAt(r)] << 18 | n[e.charCodeAt(r + 1)] << 12 | n[e.charCodeAt(r + 2)] << 6 | n[e.charCodeAt(r + 3)];
f[h++] = t >> 16 & 255;
f[h++] = t >> 8 & 255;
f[h++] = 255 & t;
}
if (2 === s) {
t = n[e.charCodeAt(r)] << 2 | n[e.charCodeAt(r + 1)] >> 4;
f[h++] = 255 & t;
}
if (1 === s) {
t = n[e.charCodeAt(r)] << 10 | n[e.charCodeAt(r + 1)] << 4 | n[e.charCodeAt(r + 2)] >> 2;
f[h++] = t >> 8 & 255;
f[h++] = 255 & t;
}
return f;
};
r.fromByteArray = function(e) {
for (var t, r = e.length, n = r % 3, a = [], o = 0, s = r - n; o < s; o += 16383) a.push(h(e, o, o + 16383 > s ? s : o + 16383));
if (1 === n) {
t = e[r - 1];
a.push(i[t >> 2] + i[t << 4 & 63] + "==");
} else if (2 === n) {
t = (e[r - 2] << 8) + e[r - 1];
a.push(i[t >> 10] + i[t >> 4 & 63] + i[t << 2 & 63] + "=");
}
return a.join("");
};
for (var i = [], n = [], a = "undefined" != typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, f = o.length; s < f; ++s) {
i[s] = o[s];
n[o.charCodeAt(s)] = s;
}
n["-".charCodeAt(0)] = 62;
n["_".charCodeAt(0)] = 63;
function c(e) {
var t = e.length;
if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
var r = e.indexOf("=");
-1 === r && (r = t);
return [ r, r === t ? 0 : 4 - r % 4 ];
}
function u(e, t, r) {
return 3 * (t + r) / 4 - r;
}
function h(e, t, r) {
for (var n, a, o = [], s = t; s < r; s += 3) {
n = (e[s] << 16 & 16711680) + (e[s + 1] << 8 & 65280) + (255 & e[s + 2]);
o.push(i[(a = n) >> 18 & 63] + i[a >> 12 & 63] + i[a >> 6 & 63] + i[63 & a]);
}
return o.join("");
}
}, {} ],
17: [ function(e, t) {
(function(t, r) {
"use strict";
function i(e, t) {
if (!e) throw new Error(t || "Assertion failed");
}
function n(e, t) {
e.super_ = t;
var r = function() {};
r.prototype = t.prototype;
e.prototype = new r();
e.prototype.constructor = e;
}
function a(e, t, r) {
if (a.isBN(e)) return e;
this.negative = 0;
this.words = null;
this.length = 0;
this.red = null;
if (null !== e) {
if ("le" === t || "be" === t) {
r = t;
t = 10;
}
this._init(e || 0, t || 10, r || "be");
}
}
"object" == typeof t ? t.exports = a : r.BN = a;
a.BN = a;
a.wordSize = 26;
var o;
try {
o = e("buffer").Buffer;
} catch (e) {}
a.isBN = function(e) {
return e instanceof a || null !== e && "object" == typeof e && e.constructor.wordSize === a.wordSize && Array.isArray(e.words);
};
a.max = function(e, t) {
return e.cmp(t) > 0 ? e : t;
};
a.min = function(e, t) {
return e.cmp(t) < 0 ? e : t;
};
a.prototype._init = function(e, t, r) {
if ("number" == typeof e) return this._initNumber(e, t, r);
if ("object" == typeof e) return this._initArray(e, t, r);
"hex" === t && (t = 16);
i(t === (0 | t) && t >= 2 && t <= 36);
var n = 0;
"-" === (e = e.toString().replace(/\s+/g, ""))[0] && n++;
16 === t ? this._parseHex(e, n) : this._parseBase(e, t, n);
"-" === e[0] && (this.negative = 1);
this._strip();
"le" === r && this._initArray(this.toArray(), t, r);
};
a.prototype._initNumber = function(e, t, r) {
if (e < 0) {
this.negative = 1;
e = -e;
}
if (e < 67108864) {
this.words = [ 67108863 & e ];
this.length = 1;
} else if (e < 4503599627370496) {
this.words = [ 67108863 & e, e / 67108864 & 67108863 ];
this.length = 2;
} else {
i(e < 9007199254740992);
this.words = [ 67108863 & e, e / 67108864 & 67108863, 1 ];
this.length = 3;
}
"le" === r && this._initArray(this.toArray(), t, r);
};
a.prototype._initArray = function(e, t, r) {
i("number" == typeof e.length);
if (e.length <= 0) {
this.words = [ 0 ];
this.length = 1;
return this;
}
this.length = Math.ceil(e.length / 3);
this.words = new Array(this.length);
for (var n = 0; n < this.length; n++) this.words[n] = 0;
var a, o, s = 0;
if ("be" === r) for (n = e.length - 1, a = 0; n >= 0; n -= 3) {
o = e[n] | e[n - 1] << 8 | e[n - 2] << 16;
this.words[a] |= o << s & 67108863;
this.words[a + 1] = o >>> 26 - s & 67108863;
if ((s += 24) >= 26) {
s -= 26;
a++;
}
} else if ("le" === r) for (n = 0, a = 0; n < e.length; n += 3) {
o = e[n] | e[n + 1] << 8 | e[n + 2] << 16;
this.words[a] |= o << s & 67108863;
this.words[a + 1] = o >>> 26 - s & 67108863;
if ((s += 24) >= 26) {
s -= 26;
a++;
}
}
return this._strip();
};
function s(e, t, r) {
for (var n = 0, a = Math.min(e.length, r), o = 0, s = t; s < a; s++) {
var f, c = e.charCodeAt(s) - 48;
n <<= 4;
n |= f = c >= 49 && c <= 54 ? c - 49 + 10 : c >= 17 && c <= 22 ? c - 17 + 10 : c;
o |= f;
}
i(!(240 & o), "Invalid character in " + e);
return n;
}
a.prototype._parseHex = function(e, t) {
this.length = Math.ceil((e.length - t) / 6);
this.words = new Array(this.length);
for (var r = 0; r < this.length; r++) this.words[r] = 0;
var i, n, a = 0;
for (r = e.length - 6, i = 0; r >= t; r -= 6) {
n = s(e, r, r + 6);
this.words[i] |= n << a & 67108863;
this.words[i + 1] |= n >>> 26 - a & 4194303;
if ((a += 24) >= 26) {
a -= 26;
i++;
}
}
if (r + 6 !== t) {
n = s(e, t, r + 6);
this.words[i] |= n << a & 67108863;
this.words[i + 1] |= n >>> 26 - a & 4194303;
}
this._strip();
};
function f(e, t, r, n) {
for (var a = 0, o = 0, s = Math.min(e.length, r), f = t; f < s; f++) {
var c = e.charCodeAt(f) - 48;
a *= n;
o = c >= 49 ? c - 49 + 10 : c >= 17 ? c - 17 + 10 : c;
i(c >= 0 && o < n, "Invalid character");
a += o;
}
return a;
}
a.prototype._parseBase = function(e, t, r) {
this.words = [ 0 ];
this.length = 1;
for (var i = 0, n = 1; n <= 67108863; n *= t) i++;
i--;
n = n / t | 0;
for (var a = e.length - r, o = a % i, s = Math.min(a, a - o) + r, c = 0, u = r; u < s; u += i) {
c = f(e, u, u + i, t);
this.imuln(n);
this.words[0] + c < 67108864 ? this.words[0] += c : this._iaddn(c);
}
if (0 !== o) {
var h = 1;
c = f(e, u, e.length, t);
for (u = 0; u < o; u++) h *= t;
this.imuln(h);
this.words[0] + c < 67108864 ? this.words[0] += c : this._iaddn(c);
}
};
a.prototype.copy = function(e) {
e.words = new Array(this.length);
for (var t = 0; t < this.length; t++) e.words[t] = this.words[t];
e.length = this.length;
e.negative = this.negative;
e.red = this.red;
};
function c(e, t) {
e.words = t.words;
e.length = t.length;
e.negative = t.negative;
e.red = t.red;
}
a.prototype._move = function(e) {
c(e, this);
};
a.prototype.clone = function() {
var e = new a(null);
this.copy(e);
return e;
};
a.prototype._expand = function(e) {
for (;this.length < e; ) this.words[this.length++] = 0;
return this;
};
a.prototype._strip = function() {
for (;this.length > 1 && 0 === this.words[this.length - 1]; ) this.length--;
return this._normSign();
};
a.prototype._normSign = function() {
1 === this.length && 0 === this.words[0] && (this.negative = 0);
return this;
};
"undefined" != typeof Symbol && "function" == typeof Symbol.for ? a.prototype[Symbol.for("nodejs.util.inspect.custom")] = u : a.prototype.inspect = u;
function u() {
return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
}
var h = [ "", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000" ], d = [ 0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ], l = [ 0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176 ];
a.prototype.toString = function(e, t) {
t = 0 | t || 1;
var r;
if (16 === (e = e || 10) || "hex" === e) {
r = "";
for (var n = 0, a = 0, o = 0; o < this.length; o++) {
var s = this.words[o], f = (16777215 & (s << n | a)).toString(16);
r = 0 != (a = s >>> 24 - n & 16777215) || o !== this.length - 1 ? h[6 - f.length] + f + r : f + r;
if ((n += 2) >= 26) {
n -= 26;
o--;
}
}
0 !== a && (r = a.toString(16) + r);
for (;r.length % t != 0; ) r = "0" + r;
0 !== this.negative && (r = "-" + r);
return r;
}
if (e === (0 | e) && e >= 2 && e <= 36) {
var c = d[e], u = l[e];
r = "";
var p = this.clone();
p.negative = 0;
for (;!p.isZero(); ) {
var b = p.modrn(u).toString(e);
r = (p = p.idivn(u)).isZero() ? b + r : h[c - b.length] + b + r;
}
this.isZero() && (r = "0" + r);
for (;r.length % t != 0; ) r = "0" + r;
0 !== this.negative && (r = "-" + r);
return r;
}
i(!1, "Base should be between 2 and 36");
};
a.prototype.toNumber = function() {
var e = this.words[0];
2 === this.length ? e += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? e += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && i(!1, "Number can only safely store up to 53 bits");
return 0 !== this.negative ? -e : e;
};
a.prototype.toJSON = function() {
return this.toString(16, 2);
};
o && (a.prototype.toBuffer = function(e, t) {
return this.toArrayLike(o, e, t);
});
a.prototype.toArray = function(e, t) {
return this.toArrayLike(Array, e, t);
};
var p = function(e, t) {
return e.allocUnsafe ? e.allocUnsafe(t) : new e(t);
};
a.prototype.toArrayLike = function(e, t, r) {
this._strip();
var n = this.byteLength(), a = r || Math.max(1, n);
i(n <= a, "byte array longer than desired length");
i(a > 0, "Requested array length <= 0");
var o = p(e, a);
this["_toArrayLike" + ("le" === t ? "LE" : "BE")](o, n);
return o;
};
a.prototype._toArrayLikeLE = function(e) {
for (var t = 0, r = 0, i = 0, n = 0; i < this.length; i++) {
var a = this.words[i] << n | r;
e[t++] = 255 & a;
t < e.length && (e[t++] = a >> 8 & 255);
t < e.length && (e[t++] = a >> 16 & 255);
if (6 === n) {
t < e.length && (e[t++] = a >> 24 & 255);
r = 0;
n = 0;
} else {
r = a >>> 24;
n += 2;
}
}
if (t < e.length) {
e[t++] = r;
for (;t < e.length; ) e[t++] = 0;
}
};
a.prototype._toArrayLikeBE = function(e) {
for (var t = e.length - 1, r = 0, i = 0, n = 0; i < this.length; i++) {
var a = this.words[i] << n | r;
e[t--] = 255 & a;
t >= 0 && (e[t--] = a >> 8 & 255);
t >= 0 && (e[t--] = a >> 16 & 255);
if (6 === n) {
t >= 0 && (e[t--] = a >> 24 & 255);
r = 0;
n = 0;
} else {
r = a >>> 24;
n += 2;
}
}
if (t >= 0) {
e[t--] = r;
for (;t >= 0; ) e[t--] = 0;
}
};
Math.clz32 ? a.prototype._countBits = function(e) {
return 32 - Math.clz32(e);
} : a.prototype._countBits = function(e) {
var t = e, r = 0;
if (t >= 4096) {
r += 13;
t >>>= 13;
}
if (t >= 64) {
r += 7;
t >>>= 7;
}
if (t >= 8) {
r += 4;
t >>>= 4;
}
if (t >= 2) {
r += 2;
t >>>= 2;
}
return r + t;
};
a.prototype._zeroBits = function(e) {
if (0 === e) return 26;
var t = e, r = 0;
if (0 == (8191 & t)) {
r += 13;
t >>>= 13;
}
if (0 == (127 & t)) {
r += 7;
t >>>= 7;
}
if (0 == (15 & t)) {
r += 4;
t >>>= 4;
}
if (0 == (3 & t)) {
r += 2;
t >>>= 2;
}
0 == (1 & t) && r++;
return r;
};
a.prototype.bitLength = function() {
var e = this.words[this.length - 1], t = this._countBits(e);
return 26 * (this.length - 1) + t;
};
function b(e) {
for (var t = new Array(e.bitLength()), r = 0; r < t.length; r++) {
var i = r / 26 | 0, n = r % 26;
t[r] = e.words[i] >>> n & 1;
}
return t;
}
a.prototype.zeroBits = function() {
if (this.isZero()) return 0;
for (var e = 0, t = 0; t < this.length; t++) {
var r = this._zeroBits(this.words[t]);
e += r;
if (26 !== r) break;
}
return e;
};
a.prototype.byteLength = function() {
return Math.ceil(this.bitLength() / 8);
};
a.prototype.toTwos = function(e) {
return 0 !== this.negative ? this.abs().inotn(e).iaddn(1) : this.clone();
};
a.prototype.fromTwos = function(e) {
return this.testn(e - 1) ? this.notn(e).iaddn(1).ineg() : this.clone();
};
a.prototype.isNeg = function() {
return 0 !== this.negative;
};
a.prototype.neg = function() {
return this.clone().ineg();
};
a.prototype.ineg = function() {
this.isZero() || (this.negative ^= 1);
return this;
};
a.prototype.iuor = function(e) {
for (;this.length < e.length; ) this.words[this.length++] = 0;
for (var t = 0; t < e.length; t++) this.words[t] = this.words[t] | e.words[t];
return this._strip();
};
a.prototype.ior = function(e) {
i(0 == (this.negative | e.negative));
return this.iuor(e);
};
a.prototype.or = function(e) {
return this.length > e.length ? this.clone().ior(e) : e.clone().ior(this);
};
a.prototype.uor = function(e) {
return this.length > e.length ? this.clone().iuor(e) : e.clone().iuor(this);
};
a.prototype.iuand = function(e) {
var t;
t = this.length > e.length ? e : this;
for (var r = 0; r < t.length; r++) this.words[r] = this.words[r] & e.words[r];
this.length = t.length;
return this._strip();
};
a.prototype.iand = function(e) {
i(0 == (this.negative | e.negative));
return this.iuand(e);
};
a.prototype.and = function(e) {
return this.length > e.length ? this.clone().iand(e) : e.clone().iand(this);
};
a.prototype.uand = function(e) {
return this.length > e.length ? this.clone().iuand(e) : e.clone().iuand(this);
};
a.prototype.iuxor = function(e) {
var t, r;
if (this.length > e.length) {
t = this;
r = e;
} else {
t = e;
r = this;
}
for (var i = 0; i < r.length; i++) this.words[i] = t.words[i] ^ r.words[i];
if (this !== t) for (;i < t.length; i++) this.words[i] = t.words[i];
this.length = t.length;
return this._strip();
};
a.prototype.ixor = function(e) {
i(0 == (this.negative | e.negative));
return this.iuxor(e);
};
a.prototype.xor = function(e) {
return this.length > e.length ? this.clone().ixor(e) : e.clone().ixor(this);
};
a.prototype.uxor = function(e) {
return this.length > e.length ? this.clone().iuxor(e) : e.clone().iuxor(this);
};
a.prototype.inotn = function(e) {
i("number" == typeof e && e >= 0);
var t = 0 | Math.ceil(e / 26), r = e % 26;
this._expand(t);
r > 0 && t--;
for (var n = 0; n < t; n++) this.words[n] = 67108863 & ~this.words[n];
r > 0 && (this.words[n] = ~this.words[n] & 67108863 >> 26 - r);
return this._strip();
};
a.prototype.notn = function(e) {
return this.clone().inotn(e);
};
a.prototype.setn = function(e, t) {
i("number" == typeof e && e >= 0);
var r = e / 26 | 0, n = e % 26;
this._expand(r + 1);
this.words[r] = t ? this.words[r] | 1 << n : this.words[r] & ~(1 << n);
return this._strip();
};
a.prototype.iadd = function(e) {
var t, r, i;
if (0 !== this.negative && 0 === e.negative) {
this.negative = 0;
t = this.isub(e);
this.negative ^= 1;
return this._normSign();
}
if (0 === this.negative && 0 !== e.negative) {
e.negative = 0;
t = this.isub(e);
e.negative = 1;
return t._normSign();
}
if (this.length > e.length) {
r = this;
i = e;
} else {
r = e;
i = this;
}
for (var n = 0, a = 0; a < i.length; a++) {
t = (0 | r.words[a]) + (0 | i.words[a]) + n;
this.words[a] = 67108863 & t;
n = t >>> 26;
}
for (;0 !== n && a < r.length; a++) {
t = (0 | r.words[a]) + n;
this.words[a] = 67108863 & t;
n = t >>> 26;
}
this.length = r.length;
if (0 !== n) {
this.words[this.length] = n;
this.length++;
} else if (r !== this) for (;a < r.length; a++) this.words[a] = r.words[a];
return this;
};
a.prototype.add = function(e) {
var t;
if (0 !== e.negative && 0 === this.negative) {
e.negative = 0;
t = this.sub(e);
e.negative ^= 1;
return t;
}
if (0 === e.negative && 0 !== this.negative) {
this.negative = 0;
t = e.sub(this);
this.negative = 1;
return t;
}
return this.length > e.length ? this.clone().iadd(e) : e.clone().iadd(this);
};
a.prototype.isub = function(e) {
if (0 !== e.negative) {
e.negative = 0;
var t = this.iadd(e);
e.negative = 1;
return t._normSign();
}
if (0 !== this.negative) {
this.negative = 0;
this.iadd(e);
this.negative = 1;
return this._normSign();
}
var r, i, n = this.cmp(e);
if (0 === n) {
this.negative = 0;
this.length = 1;
this.words[0] = 0;
return this;
}
if (n > 0) {
r = this;
i = e;
} else {
r = e;
i = this;
}
for (var a = 0, o = 0; o < i.length; o++) {
a = (t = (0 | r.words[o]) - (0 | i.words[o]) + a) >> 26;
this.words[o] = 67108863 & t;
}
for (;0 !== a && o < r.length; o++) {
a = (t = (0 | r.words[o]) + a) >> 26;
this.words[o] = 67108863 & t;
}
if (0 === a && o < r.length && r !== this) for (;o < r.length; o++) this.words[o] = r.words[o];
this.length = Math.max(this.length, o);
r !== this && (this.negative = 1);
return this._strip();
};
a.prototype.sub = function(e) {
return this.clone().isub(e);
};
function m(e, t, r) {
r.negative = t.negative ^ e.negative;
var i = e.length + t.length | 0;
r.length = i;
i = i - 1 | 0;
var n = 0 | e.words[0], a = 0 | t.words[0], o = n * a, s = 67108863 & o, f = o / 67108864 | 0;
r.words[0] = s;
for (var c = 1; c < i; c++) {
for (var u = f >>> 26, h = 67108863 & f, d = Math.min(c, t.length - 1), l = Math.max(0, c - e.length + 1); l <= d; l++) {
var p = c - l | 0;
u += (o = (n = 0 | e.words[p]) * (a = 0 | t.words[l]) + h) / 67108864 | 0;
h = 67108863 & o;
}
r.words[c] = 0 | h;
f = 0 | u;
}
0 !== f ? r.words[c] = 0 | f : r.length--;
return r._strip();
}
var g = function(e, t, r) {
var i, n, a, o = e.words, s = t.words, f = r.words, c = 0, u = 0 | o[0], h = 8191 & u, d = u >>> 13, l = 0 | o[1], p = 8191 & l, b = l >>> 13, m = 0 | o[2], g = 8191 & m, y = m >>> 13, v = 0 | o[3], _ = 8191 & v, w = v >>> 13, M = 0 | o[4], S = 8191 & M, E = M >>> 13, k = 0 | o[5], A = 8191 & k, x = k >>> 13, R = 0 | o[6], T = 8191 & R, B = R >>> 13, j = 0 | o[7], I = 8191 & j, P = j >>> 13, C = 0 | o[8], O = 8191 & C, L = C >>> 13, N = 0 | o[9], D = 8191 & N, U = N >>> 13, q = 0 | s[0], z = 8191 & q, F = q >>> 13, K = 0 | s[1], H = 8191 & K, W = K >>> 13, V = 0 | s[2], Y = 8191 & V, J = V >>> 13, G = 0 | s[3], X = 8191 & G, Z = G >>> 13, $ = 0 | s[4], Q = 8191 & $, ee = $ >>> 13, te = 0 | s[5], re = 8191 & te, ie = te >>> 13, ne = 0 | s[6], ae = 8191 & ne, oe = ne >>> 13, se = 0 | s[7], fe = 8191 & se, ce = se >>> 13, ue = 0 | s[8], he = 8191 & ue, de = ue >>> 13, le = 0 | s[9], pe = 8191 & le, be = le >>> 13;
r.negative = e.negative ^ t.negative;
r.length = 19;
var me = (c + (i = Math.imul(h, z)) | 0) + ((8191 & (n = (n = Math.imul(h, F)) + Math.imul(d, z) | 0)) << 13) | 0;
c = ((a = Math.imul(d, F)) + (n >>> 13) | 0) + (me >>> 26) | 0;
me &= 67108863;
i = Math.imul(p, z);
n = (n = Math.imul(p, F)) + Math.imul(b, z) | 0;
a = Math.imul(b, F);
var ge = (c + (i = i + Math.imul(h, H) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, W) | 0) + Math.imul(d, H) | 0)) << 13) | 0;
c = ((a = a + Math.imul(d, W) | 0) + (n >>> 13) | 0) + (ge >>> 26) | 0;
ge &= 67108863;
i = Math.imul(g, z);
n = (n = Math.imul(g, F)) + Math.imul(y, z) | 0;
a = Math.imul(y, F);
i = i + Math.imul(p, H) | 0;
n = (n = n + Math.imul(p, W) | 0) + Math.imul(b, H) | 0;
a = a + Math.imul(b, W) | 0;
var ye = (c + (i = i + Math.imul(h, Y) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, J) | 0) + Math.imul(d, Y) | 0)) << 13) | 0;
c = ((a = a + Math.imul(d, J) | 0) + (n >>> 13) | 0) + (ye >>> 26) | 0;
ye &= 67108863;
i = Math.imul(_, z);
n = (n = Math.imul(_, F)) + Math.imul(w, z) | 0;
a = Math.imul(w, F);
i = i + Math.imul(g, H) | 0;
n = (n = n + Math.imul(g, W) | 0) + Math.imul(y, H) | 0;
a = a + Math.imul(y, W) | 0;
i = i + Math.imul(p, Y) | 0;
n = (n = n + Math.imul(p, J) | 0) + Math.imul(b, Y) | 0;
a = a + Math.imul(b, J) | 0;
var ve = (c + (i = i + Math.imul(h, X) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, Z) | 0) + Math.imul(d, X) | 0)) << 13) | 0;
c = ((a = a + Math.imul(d, Z) | 0) + (n >>> 13) | 0) + (ve >>> 26) | 0;
ve &= 67108863;
i = Math.imul(S, z);
n = (n = Math.imul(S, F)) + Math.imul(E, z) | 0;
a = Math.imul(E, F);
i = i + Math.imul(_, H) | 0;
n = (n = n + Math.imul(_, W) | 0) + Math.imul(w, H) | 0;
a = a + Math.imul(w, W) | 0;
i = i + Math.imul(g, Y) | 0;
n = (n = n + Math.imul(g, J) | 0) + Math.imul(y, Y) | 0;
a = a + Math.imul(y, J) | 0;
i = i + Math.imul(p, X) | 0;
n = (n = n + Math.imul(p, Z) | 0) + Math.imul(b, X) | 0;
a = a + Math.imul(b, Z) | 0;
var _e = (c + (i = i + Math.imul(h, Q) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, ee) | 0) + Math.imul(d, Q) | 0)) << 13) | 0;
c = ((a = a + Math.imul(d, ee) | 0) + (n >>> 13) | 0) + (_e >>> 26) | 0;
_e &= 67108863;
i = Math.imul(A, z);
n = (n = Math.imul(A, F)) + Math.imul(x, z) | 0;
a = Math.imul(x, F);
i = i + Math.imul(S, H) | 0;
n = (n = n + Math.imul(S, W) | 0) + Math.imul(E, H) | 0;
a = a + Math.imul(E, W) | 0;
i = i + Math.imul(_, Y) | 0;
n = (n = n + Math.imul(_, J) | 0) + Math.imul(w, Y) | 0;
a = a + Math.imul(w, J) | 0;
i = i + Math.imul(g, X) | 0;
n = (n = n + Math.imul(g, Z) | 0) + Math.imul(y, X) | 0;
a = a + Math.imul(y, Z) | 0;
i = i + Math.imul(p, Q) | 0;
n = (n = n + Math.imul(p, ee) | 0) + Math.imul(b, Q) | 0;
a = a + Math.imul(b, ee) | 0;
var we = (c + (i = i + Math.imul(h, re) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, ie) | 0) + Math.imul(d, re) | 0)) << 13) | 0;
c = ((a = a + Math.imul(d, ie) | 0) + (n >>> 13) | 0) + (we >>> 26) | 0;
we &= 67108863;
i = Math.imul(T, z);
n = (n = Math.imul(T, F)) + Math.imul(B, z) | 0;
a = Math.imul(B, F);
i = i + Math.imul(A, H) | 0;
n = (n = n + Math.imul(A, W) | 0) + Math.imul(x, H) | 0;
a = a + Math.imul(x, W) | 0;
i = i + Math.imul(S, Y) | 0;
n = (n = n + Math.imul(S, J) | 0) + Math.imul(E, Y) | 0;
a = a + Math.imul(E, J) | 0;
i = i + Math.imul(_, X) | 0;
n = (n = n + Math.imul(_, Z) | 0) + Math.imul(w, X) | 0;
a = a + Math.imul(w, Z) | 0;
i = i + Math.imul(g, Q) | 0;
n = (n = n + Math.imul(g, ee) | 0) + Math.imul(y, Q) | 0;
a = a + Math.imul(y, ee) | 0;
i = i + Math.imul(p, re) | 0;
n = (n = n + Math.imul(p, ie) | 0) + Math.imul(b, re) | 0;
a = a + Math.imul(b, ie) | 0;
var Me = (c + (i = i + Math.imul(h, ae) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, oe) | 0) + Math.imul(d, ae) | 0)) << 13) | 0;
c = ((a = a + Math.imul(d, oe) | 0) + (n >>> 13) | 0) + (Me >>> 26) | 0;
Me &= 67108863;
i = Math.imul(I, z);
n = (n = Math.imul(I, F)) + Math.imul(P, z) | 0;
a = Math.imul(P, F);
i = i + Math.imul(T, H) | 0;
n = (n = n + Math.imul(T, W) | 0) + Math.imul(B, H) | 0;
a = a + Math.imul(B, W) | 0;
i = i + Math.imul(A, Y) | 0;
n = (n = n + Math.imul(A, J) | 0) + Math.imul(x, Y) | 0;
a = a + Math.imul(x, J) | 0;
i = i + Math.imul(S, X) | 0;
n = (n = n + Math.imul(S, Z) | 0) + Math.imul(E, X) | 0;
a = a + Math.imul(E, Z) | 0;
i = i + Math.imul(_, Q) | 0;
n = (n = n + Math.imul(_, ee) | 0) + Math.imul(w, Q) | 0;
a = a + Math.imul(w, ee) | 0;
i = i + Math.imul(g, re) | 0;
n = (n = n + Math.imul(g, ie) | 0) + Math.imul(y, re) | 0;
a = a + Math.imul(y, ie) | 0;
i = i + Math.imul(p, ae) | 0;
n = (n = n + Math.imul(p, oe) | 0) + Math.imul(b, ae) | 0;
a = a + Math.imul(b, oe) | 0;
var Se = (c + (i = i + Math.imul(h, fe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, ce) | 0) + Math.imul(d, fe) | 0)) << 13) | 0;
c = ((a = a + Math.imul(d, ce) | 0) + (n >>> 13) | 0) + (Se >>> 26) | 0;
Se &= 67108863;
i = Math.imul(O, z);
n = (n = Math.imul(O, F)) + Math.imul(L, z) | 0;
a = Math.imul(L, F);
i = i + Math.imul(I, H) | 0;
n = (n = n + Math.imul(I, W) | 0) + Math.imul(P, H) | 0;
a = a + Math.imul(P, W) | 0;
i = i + Math.imul(T, Y) | 0;
n = (n = n + Math.imul(T, J) | 0) + Math.imul(B, Y) | 0;
a = a + Math.imul(B, J) | 0;
i = i + Math.imul(A, X) | 0;
n = (n = n + Math.imul(A, Z) | 0) + Math.imul(x, X) | 0;
a = a + Math.imul(x, Z) | 0;
i = i + Math.imul(S, Q) | 0;
n = (n = n + Math.imul(S, ee) | 0) + Math.imul(E, Q) | 0;
a = a + Math.imul(E, ee) | 0;
i = i + Math.imul(_, re) | 0;
n = (n = n + Math.imul(_, ie) | 0) + Math.imul(w, re) | 0;
a = a + Math.imul(w, ie) | 0;
i = i + Math.imul(g, ae) | 0;
n = (n = n + Math.imul(g, oe) | 0) + Math.imul(y, ae) | 0;
a = a + Math.imul(y, oe) | 0;
i = i + Math.imul(p, fe) | 0;
n = (n = n + Math.imul(p, ce) | 0) + Math.imul(b, fe) | 0;
a = a + Math.imul(b, ce) | 0;
var Ee = (c + (i = i + Math.imul(h, he) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, de) | 0) + Math.imul(d, he) | 0)) << 13) | 0;
c = ((a = a + Math.imul(d, de) | 0) + (n >>> 13) | 0) + (Ee >>> 26) | 0;
Ee &= 67108863;
i = Math.imul(D, z);
n = (n = Math.imul(D, F)) + Math.imul(U, z) | 0;
a = Math.imul(U, F);
i = i + Math.imul(O, H) | 0;
n = (n = n + Math.imul(O, W) | 0) + Math.imul(L, H) | 0;
a = a + Math.imul(L, W) | 0;
i = i + Math.imul(I, Y) | 0;
n = (n = n + Math.imul(I, J) | 0) + Math.imul(P, Y) | 0;
a = a + Math.imul(P, J) | 0;
i = i + Math.imul(T, X) | 0;
n = (n = n + Math.imul(T, Z) | 0) + Math.imul(B, X) | 0;
a = a + Math.imul(B, Z) | 0;
i = i + Math.imul(A, Q) | 0;
n = (n = n + Math.imul(A, ee) | 0) + Math.imul(x, Q) | 0;
a = a + Math.imul(x, ee) | 0;
i = i + Math.imul(S, re) | 0;
n = (n = n + Math.imul(S, ie) | 0) + Math.imul(E, re) | 0;
a = a + Math.imul(E, ie) | 0;
i = i + Math.imul(_, ae) | 0;
n = (n = n + Math.imul(_, oe) | 0) + Math.imul(w, ae) | 0;
a = a + Math.imul(w, oe) | 0;
i = i + Math.imul(g, fe) | 0;
n = (n = n + Math.imul(g, ce) | 0) + Math.imul(y, fe) | 0;
a = a + Math.imul(y, ce) | 0;
i = i + Math.imul(p, he) | 0;
n = (n = n + Math.imul(p, de) | 0) + Math.imul(b, he) | 0;
a = a + Math.imul(b, de) | 0;
var ke = (c + (i = i + Math.imul(h, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, be) | 0) + Math.imul(d, pe) | 0)) << 13) | 0;
c = ((a = a + Math.imul(d, be) | 0) + (n >>> 13) | 0) + (ke >>> 26) | 0;
ke &= 67108863;
i = Math.imul(D, H);
n = (n = Math.imul(D, W)) + Math.imul(U, H) | 0;
a = Math.imul(U, W);
i = i + Math.imul(O, Y) | 0;
n = (n = n + Math.imul(O, J) | 0) + Math.imul(L, Y) | 0;
a = a + Math.imul(L, J) | 0;
i = i + Math.imul(I, X) | 0;
n = (n = n + Math.imul(I, Z) | 0) + Math.imul(P, X) | 0;
a = a + Math.imul(P, Z) | 0;
i = i + Math.imul(T, Q) | 0;
n = (n = n + Math.imul(T, ee) | 0) + Math.imul(B, Q) | 0;
a = a + Math.imul(B, ee) | 0;
i = i + Math.imul(A, re) | 0;
n = (n = n + Math.imul(A, ie) | 0) + Math.imul(x, re) | 0;
a = a + Math.imul(x, ie) | 0;
i = i + Math.imul(S, ae) | 0;
n = (n = n + Math.imul(S, oe) | 0) + Math.imul(E, ae) | 0;
a = a + Math.imul(E, oe) | 0;
i = i + Math.imul(_, fe) | 0;
n = (n = n + Math.imul(_, ce) | 0) + Math.imul(w, fe) | 0;
a = a + Math.imul(w, ce) | 0;
i = i + Math.imul(g, he) | 0;
n = (n = n + Math.imul(g, de) | 0) + Math.imul(y, he) | 0;
a = a + Math.imul(y, de) | 0;
var Ae = (c + (i = i + Math.imul(p, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(p, be) | 0) + Math.imul(b, pe) | 0)) << 13) | 0;
c = ((a = a + Math.imul(b, be) | 0) + (n >>> 13) | 0) + (Ae >>> 26) | 0;
Ae &= 67108863;
i = Math.imul(D, Y);
n = (n = Math.imul(D, J)) + Math.imul(U, Y) | 0;
a = Math.imul(U, J);
i = i + Math.imul(O, X) | 0;
n = (n = n + Math.imul(O, Z) | 0) + Math.imul(L, X) | 0;
a = a + Math.imul(L, Z) | 0;
i = i + Math.imul(I, Q) | 0;
n = (n = n + Math.imul(I, ee) | 0) + Math.imul(P, Q) | 0;
a = a + Math.imul(P, ee) | 0;
i = i + Math.imul(T, re) | 0;
n = (n = n + Math.imul(T, ie) | 0) + Math.imul(B, re) | 0;
a = a + Math.imul(B, ie) | 0;
i = i + Math.imul(A, ae) | 0;
n = (n = n + Math.imul(A, oe) | 0) + Math.imul(x, ae) | 0;
a = a + Math.imul(x, oe) | 0;
i = i + Math.imul(S, fe) | 0;
n = (n = n + Math.imul(S, ce) | 0) + Math.imul(E, fe) | 0;
a = a + Math.imul(E, ce) | 0;
i = i + Math.imul(_, he) | 0;
n = (n = n + Math.imul(_, de) | 0) + Math.imul(w, he) | 0;
a = a + Math.imul(w, de) | 0;
var xe = (c + (i = i + Math.imul(g, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(g, be) | 0) + Math.imul(y, pe) | 0)) << 13) | 0;
c = ((a = a + Math.imul(y, be) | 0) + (n >>> 13) | 0) + (xe >>> 26) | 0;
xe &= 67108863;
i = Math.imul(D, X);
n = (n = Math.imul(D, Z)) + Math.imul(U, X) | 0;
a = Math.imul(U, Z);
i = i + Math.imul(O, Q) | 0;
n = (n = n + Math.imul(O, ee) | 0) + Math.imul(L, Q) | 0;
a = a + Math.imul(L, ee) | 0;
i = i + Math.imul(I, re) | 0;
n = (n = n + Math.imul(I, ie) | 0) + Math.imul(P, re) | 0;
a = a + Math.imul(P, ie) | 0;
i = i + Math.imul(T, ae) | 0;
n = (n = n + Math.imul(T, oe) | 0) + Math.imul(B, ae) | 0;
a = a + Math.imul(B, oe) | 0;
i = i + Math.imul(A, fe) | 0;
n = (n = n + Math.imul(A, ce) | 0) + Math.imul(x, fe) | 0;
a = a + Math.imul(x, ce) | 0;
i = i + Math.imul(S, he) | 0;
n = (n = n + Math.imul(S, de) | 0) + Math.imul(E, he) | 0;
a = a + Math.imul(E, de) | 0;
var Re = (c + (i = i + Math.imul(_, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(_, be) | 0) + Math.imul(w, pe) | 0)) << 13) | 0;
c = ((a = a + Math.imul(w, be) | 0) + (n >>> 13) | 0) + (Re >>> 26) | 0;
Re &= 67108863;
i = Math.imul(D, Q);
n = (n = Math.imul(D, ee)) + Math.imul(U, Q) | 0;
a = Math.imul(U, ee);
i = i + Math.imul(O, re) | 0;
n = (n = n + Math.imul(O, ie) | 0) + Math.imul(L, re) | 0;
a = a + Math.imul(L, ie) | 0;
i = i + Math.imul(I, ae) | 0;
n = (n = n + Math.imul(I, oe) | 0) + Math.imul(P, ae) | 0;
a = a + Math.imul(P, oe) | 0;
i = i + Math.imul(T, fe) | 0;
n = (n = n + Math.imul(T, ce) | 0) + Math.imul(B, fe) | 0;
a = a + Math.imul(B, ce) | 0;
i = i + Math.imul(A, he) | 0;
n = (n = n + Math.imul(A, de) | 0) + Math.imul(x, he) | 0;
a = a + Math.imul(x, de) | 0;
var Te = (c + (i = i + Math.imul(S, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(S, be) | 0) + Math.imul(E, pe) | 0)) << 13) | 0;
c = ((a = a + Math.imul(E, be) | 0) + (n >>> 13) | 0) + (Te >>> 26) | 0;
Te &= 67108863;
i = Math.imul(D, re);
n = (n = Math.imul(D, ie)) + Math.imul(U, re) | 0;
a = Math.imul(U, ie);
i = i + Math.imul(O, ae) | 0;
n = (n = n + Math.imul(O, oe) | 0) + Math.imul(L, ae) | 0;
a = a + Math.imul(L, oe) | 0;
i = i + Math.imul(I, fe) | 0;
n = (n = n + Math.imul(I, ce) | 0) + Math.imul(P, fe) | 0;
a = a + Math.imul(P, ce) | 0;
i = i + Math.imul(T, he) | 0;
n = (n = n + Math.imul(T, de) | 0) + Math.imul(B, he) | 0;
a = a + Math.imul(B, de) | 0;
var Be = (c + (i = i + Math.imul(A, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(A, be) | 0) + Math.imul(x, pe) | 0)) << 13) | 0;
c = ((a = a + Math.imul(x, be) | 0) + (n >>> 13) | 0) + (Be >>> 26) | 0;
Be &= 67108863;
i = Math.imul(D, ae);
n = (n = Math.imul(D, oe)) + Math.imul(U, ae) | 0;
a = Math.imul(U, oe);
i = i + Math.imul(O, fe) | 0;
n = (n = n + Math.imul(O, ce) | 0) + Math.imul(L, fe) | 0;
a = a + Math.imul(L, ce) | 0;
i = i + Math.imul(I, he) | 0;
n = (n = n + Math.imul(I, de) | 0) + Math.imul(P, he) | 0;
a = a + Math.imul(P, de) | 0;
var je = (c + (i = i + Math.imul(T, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(T, be) | 0) + Math.imul(B, pe) | 0)) << 13) | 0;
c = ((a = a + Math.imul(B, be) | 0) + (n >>> 13) | 0) + (je >>> 26) | 0;
je &= 67108863;
i = Math.imul(D, fe);
n = (n = Math.imul(D, ce)) + Math.imul(U, fe) | 0;
a = Math.imul(U, ce);
i = i + Math.imul(O, he) | 0;
n = (n = n + Math.imul(O, de) | 0) + Math.imul(L, he) | 0;
a = a + Math.imul(L, de) | 0;
var Ie = (c + (i = i + Math.imul(I, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(I, be) | 0) + Math.imul(P, pe) | 0)) << 13) | 0;
c = ((a = a + Math.imul(P, be) | 0) + (n >>> 13) | 0) + (Ie >>> 26) | 0;
Ie &= 67108863;
i = Math.imul(D, he);
n = (n = Math.imul(D, de)) + Math.imul(U, he) | 0;
a = Math.imul(U, de);
var Pe = (c + (i = i + Math.imul(O, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(O, be) | 0) + Math.imul(L, pe) | 0)) << 13) | 0;
c = ((a = a + Math.imul(L, be) | 0) + (n >>> 13) | 0) + (Pe >>> 26) | 0;
Pe &= 67108863;
var Ce = (c + (i = Math.imul(D, pe)) | 0) + ((8191 & (n = (n = Math.imul(D, be)) + Math.imul(U, pe) | 0)) << 13) | 0;
c = ((a = Math.imul(U, be)) + (n >>> 13) | 0) + (Ce >>> 26) | 0;
Ce &= 67108863;
f[0] = me;
f[1] = ge;
f[2] = ye;
f[3] = ve;
f[4] = _e;
f[5] = we;
f[6] = Me;
f[7] = Se;
f[8] = Ee;
f[9] = ke;
f[10] = Ae;
f[11] = xe;
f[12] = Re;
f[13] = Te;
f[14] = Be;
f[15] = je;
f[16] = Ie;
f[17] = Pe;
f[18] = Ce;
if (0 !== c) {
f[19] = c;
r.length++;
}
return r;
};
Math.imul || (g = m);
function y(e, t, r) {
r.negative = t.negative ^ e.negative;
r.length = e.length + t.length;
for (var i = 0, n = 0, a = 0; a < r.length - 1; a++) {
var o = n;
n = 0;
for (var s = 67108863 & i, f = Math.min(a, t.length - 1), c = Math.max(0, a - e.length + 1); c <= f; c++) {
var u = a - c, h = (0 | e.words[u]) * (0 | t.words[c]), d = 67108863 & h;
s = 67108863 & (d = d + s | 0);
n += (o = (o = o + (h / 67108864 | 0) | 0) + (d >>> 26) | 0) >>> 26;
o &= 67108863;
}
r.words[a] = s;
i = o;
o = n;
}
0 !== i ? r.words[a] = i : r.length--;
return r._strip();
}
function v(e, t, r) {
return y(e, t, r);
}
a.prototype.mulTo = function(e, t) {
var r = this.length + e.length;
return 10 === this.length && 10 === e.length ? g(this, e, t) : r < 63 ? m(this, e, t) : r < 1024 ? y(this, e, t) : v(this, e, t);
};
function _(e, t) {
this.x = e;
this.y = t;
}
_.prototype.makeRBT = function(e) {
for (var t = new Array(e), r = a.prototype._countBits(e) - 1, i = 0; i < e; i++) t[i] = this.revBin(i, r, e);
return t;
};
_.prototype.revBin = function(e, t, r) {
if (0 === e || e === r - 1) return e;
for (var i = 0, n = 0; n < t; n++) {
i |= (1 & e) << t - n - 1;
e >>= 1;
}
return i;
};
_.prototype.permute = function(e, t, r, i, n, a) {
for (var o = 0; o < a; o++) {
i[o] = t[e[o]];
n[o] = r[e[o]];
}
};
_.prototype.transform = function(e, t, r, i, n, a) {
this.permute(a, e, t, r, i, n);
for (var o = 1; o < n; o <<= 1) for (var s = o << 1, f = Math.cos(2 * Math.PI / s), c = Math.sin(2 * Math.PI / s), u = 0; u < n; u += s) for (var h = f, d = c, l = 0; l < o; l++) {
var p = r[u + l], b = i[u + l], m = r[u + l + o], g = i[u + l + o], y = h * m - d * g;
g = h * g + d * m;
m = y;
r[u + l] = p + m;
i[u + l] = b + g;
r[u + l + o] = p - m;
i[u + l + o] = b - g;
if (l !== s) {
y = f * h - c * d;
d = f * d + c * h;
h = y;
}
}
};
_.prototype.guessLen13b = function(e, t) {
var r = 1 | Math.max(t, e), i = 1 & r, n = 0;
for (r = r / 2 | 0; r; r >>>= 1) n++;
return 1 << n + 1 + i;
};
_.prototype.conjugate = function(e, t, r) {
if (!(r <= 1)) for (var i = 0; i < r / 2; i++) {
var n = e[i];
e[i] = e[r - i - 1];
e[r - i - 1] = n;
n = t[i];
t[i] = -t[r - i - 1];
t[r - i - 1] = -n;
}
};
_.prototype.normalize13b = function(e, t) {
for (var r = 0, i = 0; i < t / 2; i++) {
var n = 8192 * Math.round(e[2 * i + 1] / t) + Math.round(e[2 * i] / t) + r;
e[i] = 67108863 & n;
r = n < 67108864 ? 0 : n / 67108864 | 0;
}
return e;
};
_.prototype.convert13b = function(e, t, r, n) {
for (var a = 0, o = 0; o < t; o++) {
a += 0 | e[o];
r[2 * o] = 8191 & a;
a >>>= 13;
r[2 * o + 1] = 8191 & a;
a >>>= 13;
}
for (o = 2 * t; o < n; ++o) r[o] = 0;
i(0 === a);
i(0 == (-8192 & a));
};
_.prototype.stub = function(e) {
for (var t = new Array(e), r = 0; r < e; r++) t[r] = 0;
return t;
};
_.prototype.mulp = function(e, t, r) {
var i = 2 * this.guessLen13b(e.length, t.length), n = this.makeRBT(i), a = this.stub(i), o = new Array(i), s = new Array(i), f = new Array(i), c = new Array(i), u = new Array(i), h = new Array(i), d = r.words;
d.length = i;
this.convert13b(e.words, e.length, o, i);
this.convert13b(t.words, t.length, c, i);
this.transform(o, a, s, f, i, n);
this.transform(c, a, u, h, i, n);
for (var l = 0; l < i; l++) {
var p = s[l] * u[l] - f[l] * h[l];
f[l] = s[l] * h[l] + f[l] * u[l];
s[l] = p;
}
this.conjugate(s, f, i);
this.transform(s, f, d, a, i, n);
this.conjugate(d, a, i);
this.normalize13b(d, i);
r.negative = e.negative ^ t.negative;
r.length = e.length + t.length;
return r._strip();
};
a.prototype.mul = function(e) {
var t = new a(null);
t.words = new Array(this.length + e.length);
return this.mulTo(e, t);
};
a.prototype.mulf = function(e) {
var t = new a(null);
t.words = new Array(this.length + e.length);
return v(this, e, t);
};
a.prototype.imul = function(e) {
return this.clone().mulTo(e, this);
};
a.prototype.imuln = function(e) {
var t = e < 0;
t && (e = -e);
i("number" == typeof e);
i(e < 67108864);
for (var r = 0, n = 0; n < this.length; n++) {
var a = (0 | this.words[n]) * e, o = (67108863 & a) + (67108863 & r);
r >>= 26;
r += a / 67108864 | 0;
r += o >>> 26;
this.words[n] = 67108863 & o;
}
if (0 !== r) {
this.words[n] = r;
this.length++;
}
return t ? this.ineg() : this;
};
a.prototype.muln = function(e) {
return this.clone().imuln(e);
};
a.prototype.sqr = function() {
return this.mul(this);
};
a.prototype.isqr = function() {
return this.imul(this.clone());
};
a.prototype.pow = function(e) {
var t = b(e);
if (0 === t.length) return new a(1);
for (var r = this, i = 0; i < t.length && 0 === t[i]; i++, r = r.sqr()) ;
if (++i < t.length) for (var n = r.sqr(); i < t.length; i++, n = n.sqr()) 0 !== t[i] && (r = r.mul(n));
return r;
};
a.prototype.iushln = function(e) {
i("number" == typeof e && e >= 0);
var t, r = e % 26, n = (e - r) / 26, a = 67108863 >>> 26 - r << 26 - r;
if (0 !== r) {
var o = 0;
for (t = 0; t < this.length; t++) {
var s = this.words[t] & a, f = (0 | this.words[t]) - s << r;
this.words[t] = f | o;
o = s >>> 26 - r;
}
if (o) {
this.words[t] = o;
this.length++;
}
}
if (0 !== n) {
for (t = this.length - 1; t >= 0; t--) this.words[t + n] = this.words[t];
for (t = 0; t < n; t++) this.words[t] = 0;
this.length += n;
}
return this._strip();
};
a.prototype.ishln = function(e) {
i(0 === this.negative);
return this.iushln(e);
};
a.prototype.iushrn = function(e, t, r) {
i("number" == typeof e && e >= 0);
var n;
n = t ? (t - t % 26) / 26 : 0;
var a = e % 26, o = Math.min((e - a) / 26, this.length), s = 67108863 ^ 67108863 >>> a << a, f = r;
n -= o;
n = Math.max(0, n);
if (f) {
for (var c = 0; c < o; c++) f.words[c] = this.words[c];
f.length = o;
}
if (0 === o) ; else if (this.length > o) {
this.length -= o;
for (c = 0; c < this.length; c++) this.words[c] = this.words[c + o];
} else {
this.words[0] = 0;
this.length = 1;
}
var u = 0;
for (c = this.length - 1; c >= 0 && (0 !== u || c >= n); c--) {
var h = 0 | this.words[c];
this.words[c] = u << 26 - a | h >>> a;
u = h & s;
}
f && 0 !== u && (f.words[f.length++] = u);
if (0 === this.length) {
this.words[0] = 0;
this.length = 1;
}
return this._strip();
};
a.prototype.ishrn = function(e, t, r) {
i(0 === this.negative);
return this.iushrn(e, t, r);
};
a.prototype.shln = function(e) {
return this.clone().ishln(e);
};
a.prototype.ushln = function(e) {
return this.clone().iushln(e);
};
a.prototype.shrn = function(e) {
return this.clone().ishrn(e);
};
a.prototype.ushrn = function(e) {
return this.clone().iushrn(e);
};
a.prototype.testn = function(e) {
i("number" == typeof e && e >= 0);
var t = e % 26, r = (e - t) / 26, n = 1 << t;
return !(this.length <= r || !(this.words[r] & n));
};
a.prototype.imaskn = function(e) {
i("number" == typeof e && e >= 0);
var t = e % 26, r = (e - t) / 26;
i(0 === this.negative, "imaskn works only with positive numbers");
if (this.length <= r) return this;
0 !== t && r++;
this.length = Math.min(r, this.length);
if (0 !== t) {
var n = 67108863 ^ 67108863 >>> t << t;
this.words[this.length - 1] &= n;
}
return this._strip();
};
a.prototype.maskn = function(e) {
return this.clone().imaskn(e);
};
a.prototype.iaddn = function(e) {
i("number" == typeof e);
i(e < 67108864);
if (e < 0) return this.isubn(-e);
if (0 !== this.negative) {
if (1 === this.length && (0 | this.words[0]) <= e) {
this.words[0] = e - (0 | this.words[0]);
this.negative = 0;
return this;
}
this.negative = 0;
this.isubn(e);
this.negative = 1;
return this;
}
return this._iaddn(e);
};
a.prototype._iaddn = function(e) {
this.words[0] += e;
for (var t = 0; t < this.length && this.words[t] >= 67108864; t++) {
this.words[t] -= 67108864;
t === this.length - 1 ? this.words[t + 1] = 1 : this.words[t + 1]++;
}
this.length = Math.max(this.length, t + 1);
return this;
};
a.prototype.isubn = function(e) {
i("number" == typeof e);
i(e < 67108864);
if (e < 0) return this.iaddn(-e);
if (0 !== this.negative) {
this.negative = 0;
this.iaddn(e);
this.negative = 1;
return this;
}
this.words[0] -= e;
if (1 === this.length && this.words[0] < 0) {
this.words[0] = -this.words[0];
this.negative = 1;
} else for (var t = 0; t < this.length && this.words[t] < 0; t++) {
this.words[t] += 67108864;
this.words[t + 1] -= 1;
}
return this._strip();
};
a.prototype.addn = function(e) {
return this.clone().iaddn(e);
};
a.prototype.subn = function(e) {
return this.clone().isubn(e);
};
a.prototype.iabs = function() {
this.negative = 0;
return this;
};
a.prototype.abs = function() {
return this.clone().iabs();
};
a.prototype._ishlnsubmul = function(e, t, r) {
var n, a, o = e.length + r;
this._expand(o);
var s = 0;
for (n = 0; n < e.length; n++) {
a = (0 | this.words[n + r]) + s;
var f = (0 | e.words[n]) * t;
s = ((a -= 67108863 & f) >> 26) - (f / 67108864 | 0);
this.words[n + r] = 67108863 & a;
}
for (;n < this.length - r; n++) {
s = (a = (0 | this.words[n + r]) + s) >> 26;
this.words[n + r] = 67108863 & a;
}
if (0 === s) return this._strip();
i(-1 === s);
s = 0;
for (n = 0; n < this.length; n++) {
s = (a = -(0 | this.words[n]) + s) >> 26;
this.words[n] = 67108863 & a;
}
this.negative = 1;
return this._strip();
};
a.prototype._wordDiv = function(e, t) {
var r = (this.length, e.length), i = this.clone(), n = e, o = 0 | n.words[n.length - 1];
if (0 != (r = 26 - this._countBits(o))) {
n = n.ushln(r);
i.iushln(r);
o = 0 | n.words[n.length - 1];
}
var s, f = i.length - n.length;
if ("mod" !== t) {
(s = new a(null)).length = f + 1;
s.words = new Array(s.length);
for (var c = 0; c < s.length; c++) s.words[c] = 0;
}
var u = i.clone()._ishlnsubmul(n, 1, f);
if (0 === u.negative) {
i = u;
s && (s.words[f] = 1);
}
for (var h = f - 1; h >= 0; h--) {
var d = 67108864 * (0 | i.words[n.length + h]) + (0 | i.words[n.length + h - 1]);
d = Math.min(d / o | 0, 67108863);
i._ishlnsubmul(n, d, h);
for (;0 !== i.negative; ) {
d--;
i.negative = 0;
i._ishlnsubmul(n, 1, h);
i.isZero() || (i.negative ^= 1);
}
s && (s.words[h] = d);
}
s && s._strip();
i._strip();
"div" !== t && 0 !== r && i.iushrn(r);
return {
div: s || null,
mod: i
};
};
a.prototype.divmod = function(e, t, r) {
i(!e.isZero());
if (this.isZero()) return {
div: new a(0),
mod: new a(0)
};
var n, o, s;
if (0 !== this.negative && 0 === e.negative) {
s = this.neg().divmod(e, t);
"mod" !== t && (n = s.div.neg());
if ("div" !== t) {
o = s.mod.neg();
r && 0 !== o.negative && o.iadd(e);
}
return {
div: n,
mod: o
};
}
if (0 === this.negative && 0 !== e.negative) {
s = this.divmod(e.neg(), t);
"mod" !== t && (n = s.div.neg());
return {
div: n,
mod: s.mod
};
}
if (0 != (this.negative & e.negative)) {
s = this.neg().divmod(e.neg(), t);
if ("div" !== t) {
o = s.mod.neg();
r && 0 !== o.negative && o.isub(e);
}
return {
div: s.div,
mod: o
};
}
return e.length > this.length || this.cmp(e) < 0 ? {
div: new a(0),
mod: this
} : 1 === e.length ? "div" === t ? {
div: this.divn(e.words[0]),
mod: null
} : "mod" === t ? {
div: null,
mod: new a(this.modrn(e.words[0]))
} : {
div: this.divn(e.words[0]),
mod: new a(this.modrn(e.words[0]))
} : this._wordDiv(e, t);
};
a.prototype.div = function(e) {
return this.divmod(e, "div", !1).div;
};
a.prototype.mod = function(e) {
return this.divmod(e, "mod", !1).mod;
};
a.prototype.umod = function(e) {
return this.divmod(e, "mod", !0).mod;
};
a.prototype.divRound = function(e) {
var t = this.divmod(e);
if (t.mod.isZero()) return t.div;
var r = 0 !== t.div.negative ? t.mod.isub(e) : t.mod, i = e.ushrn(1), n = e.andln(1), a = r.cmp(i);
return a < 0 || 1 === n && 0 === a ? t.div : 0 !== t.div.negative ? t.div.isubn(1) : t.div.iaddn(1);
};
a.prototype.modrn = function(e) {
var t = e < 0;
t && (e = -e);
i(e <= 67108863);
for (var r = (1 << 26) % e, n = 0, a = this.length - 1; a >= 0; a--) n = (r * n + (0 | this.words[a])) % e;
return t ? -n : n;
};
a.prototype.modn = function(e) {
return this.modrn(e);
};
a.prototype.idivn = function(e) {
var t = e < 0;
t && (e = -e);
i(e <= 67108863);
for (var r = 0, n = this.length - 1; n >= 0; n--) {
var a = (0 | this.words[n]) + 67108864 * r;
this.words[n] = a / e | 0;
r = a % e;
}
this._strip();
return t ? this.ineg() : this;
};
a.prototype.divn = function(e) {
return this.clone().idivn(e);
};
a.prototype.egcd = function(e) {
i(0 === e.negative);
i(!e.isZero());
var t = this, r = e.clone();
t = 0 !== t.negative ? t.umod(e) : t.clone();
for (var n = new a(1), o = new a(0), s = new a(0), f = new a(1), c = 0; t.isEven() && r.isEven(); ) {
t.iushrn(1);
r.iushrn(1);
++c;
}
for (var u = r.clone(), h = t.clone(); !t.isZero(); ) {
for (var d = 0, l = 1; 0 == (t.words[0] & l) && d < 26; ++d, l <<= 1) ;
if (d > 0) {
t.iushrn(d);
for (;d-- > 0; ) {
if (n.isOdd() || o.isOdd()) {
n.iadd(u);
o.isub(h);
}
n.iushrn(1);
o.iushrn(1);
}
}
for (var p = 0, b = 1; 0 == (r.words[0] & b) && p < 26; ++p, b <<= 1) ;
if (p > 0) {
r.iushrn(p);
for (;p-- > 0; ) {
if (s.isOdd() || f.isOdd()) {
s.iadd(u);
f.isub(h);
}
s.iushrn(1);
f.iushrn(1);
}
}
if (t.cmp(r) >= 0) {
t.isub(r);
n.isub(s);
o.isub(f);
} else {
r.isub(t);
s.isub(n);
f.isub(o);
}
}
return {
a: s,
b: f,
gcd: r.iushln(c)
};
};
a.prototype._invmp = function(e) {
i(0 === e.negative);
i(!e.isZero());
var t = this, r = e.clone();
t = 0 !== t.negative ? t.umod(e) : t.clone();
for (var n, o = new a(1), s = new a(0), f = r.clone(); t.cmpn(1) > 0 && r.cmpn(1) > 0; ) {
for (var c = 0, u = 1; 0 == (t.words[0] & u) && c < 26; ++c, u <<= 1) ;
if (c > 0) {
t.iushrn(c);
for (;c-- > 0; ) {
o.isOdd() && o.iadd(f);
o.iushrn(1);
}
}
for (var h = 0, d = 1; 0 == (r.words[0] & d) && h < 26; ++h, d <<= 1) ;
if (h > 0) {
r.iushrn(h);
for (;h-- > 0; ) {
s.isOdd() && s.iadd(f);
s.iushrn(1);
}
}
if (t.cmp(r) >= 0) {
t.isub(r);
o.isub(s);
} else {
r.isub(t);
s.isub(o);
}
}
(n = 0 === t.cmpn(1) ? o : s).cmpn(0) < 0 && n.iadd(e);
return n;
};
a.prototype.gcd = function(e) {
if (this.isZero()) return e.abs();
if (e.isZero()) return this.abs();
var t = this.clone(), r = e.clone();
t.negative = 0;
r.negative = 0;
for (var i = 0; t.isEven() && r.isEven(); i++) {
t.iushrn(1);
r.iushrn(1);
}
for (;;) {
for (;t.isEven(); ) t.iushrn(1);
for (;r.isEven(); ) r.iushrn(1);
var n = t.cmp(r);
if (n < 0) {
var a = t;
t = r;
r = a;
} else if (0 === n || 0 === r.cmpn(1)) break;
t.isub(r);
}
return r.iushln(i);
};
a.prototype.invm = function(e) {
return this.egcd(e).a.umod(e);
};
a.prototype.isEven = function() {
return 0 == (1 & this.words[0]);
};
a.prototype.isOdd = function() {
return 1 == (1 & this.words[0]);
};
a.prototype.andln = function(e) {
return this.words[0] & e;
};
a.prototype.bincn = function(e) {
i("number" == typeof e);
var t = e % 26, r = (e - t) / 26, n = 1 << t;
if (this.length <= r) {
this._expand(r + 1);
this.words[r] |= n;
return this;
}
for (var a = n, o = r; 0 !== a && o < this.length; o++) {
var s = 0 | this.words[o];
a = (s += a) >>> 26;
s &= 67108863;
this.words[o] = s;
}
if (0 !== a) {
this.words[o] = a;
this.length++;
}
return this;
};
a.prototype.isZero = function() {
return 1 === this.length && 0 === this.words[0];
};
a.prototype.cmpn = function(e) {
var t, r = e < 0;
if (0 !== this.negative && !r) return -1;
if (0 === this.negative && r) return 1;
this._strip();
if (this.length > 1) t = 1; else {
r && (e = -e);
i(e <= 67108863, "Number is too big");
var n = 0 | this.words[0];
t = n === e ? 0 : n < e ? -1 : 1;
}
return 0 !== this.negative ? 0 | -t : t;
};
a.prototype.cmp = function(e) {
if (0 !== this.negative && 0 === e.negative) return -1;
if (0 === this.negative && 0 !== e.negative) return 1;
var t = this.ucmp(e);
return 0 !== this.negative ? 0 | -t : t;
};
a.prototype.ucmp = function(e) {
if (this.length > e.length) return 1;
if (this.length < e.length) return -1;
for (var t = 0, r = this.length - 1; r >= 0; r--) {
var i = 0 | this.words[r], n = 0 | e.words[r];
if (i !== n) {
i < n ? t = -1 : i > n && (t = 1);
break;
}
}
return t;
};
a.prototype.gtn = function(e) {
return 1 === this.cmpn(e);
};
a.prototype.gt = function(e) {
return 1 === this.cmp(e);
};
a.prototype.gten = function(e) {
return this.cmpn(e) >= 0;
};
a.prototype.gte = function(e) {
return this.cmp(e) >= 0;
};
a.prototype.ltn = function(e) {
return -1 === this.cmpn(e);
};
a.prototype.lt = function(e) {
return -1 === this.cmp(e);
};
a.prototype.lten = function(e) {
return this.cmpn(e) <= 0;
};
a.prototype.lte = function(e) {
return this.cmp(e) <= 0;
};
a.prototype.eqn = function(e) {
return 0 === this.cmpn(e);
};
a.prototype.eq = function(e) {
return 0 === this.cmp(e);
};
a.red = function(e) {
return new x(e);
};
a.prototype.toRed = function(e) {
i(!this.red, "Already a number in reduction context");
i(0 === this.negative, "red works only with positives");
return e.convertTo(this)._forceRed(e);
};
a.prototype.fromRed = function() {
i(this.red, "fromRed works only with numbers in reduction context");
return this.red.convertFrom(this);
};
a.prototype._forceRed = function(e) {
this.red = e;
return this;
};
a.prototype.forceRed = function(e) {
i(!this.red, "Already a number in reduction context");
return this._forceRed(e);
};
a.prototype.redAdd = function(e) {
i(this.red, "redAdd works only with red numbers");
return this.red.add(this, e);
};
a.prototype.redIAdd = function(e) {
i(this.red, "redIAdd works only with red numbers");
return this.red.iadd(this, e);
};
a.prototype.redSub = function(e) {
i(this.red, "redSub works only with red numbers");
return this.red.sub(this, e);
};
a.prototype.redISub = function(e) {
i(this.red, "redISub works only with red numbers");
return this.red.isub(this, e);
};
a.prototype.redShl = function(e) {
i(this.red, "redShl works only with red numbers");
return this.red.shl(this, e);
};
a.prototype.redMul = function(e) {
i(this.red, "redMul works only with red numbers");
this.red._verify2(this, e);
return this.red.mul(this, e);
};
a.prototype.redIMul = function(e) {
i(this.red, "redMul works only with red numbers");
this.red._verify2(this, e);
return this.red.imul(this, e);
};
a.prototype.redSqr = function() {
i(this.red, "redSqr works only with red numbers");
this.red._verify1(this);
return this.red.sqr(this);
};
a.prototype.redISqr = function() {
i(this.red, "redISqr works only with red numbers");
this.red._verify1(this);
return this.red.isqr(this);
};
a.prototype.redSqrt = function() {
i(this.red, "redSqrt works only with red numbers");
this.red._verify1(this);
return this.red.sqrt(this);
};
a.prototype.redInvm = function() {
i(this.red, "redInvm works only with red numbers");
this.red._verify1(this);
return this.red.invm(this);
};
a.prototype.redNeg = function() {
i(this.red, "redNeg works only with red numbers");
this.red._verify1(this);
return this.red.neg(this);
};
a.prototype.redPow = function(e) {
i(this.red && !e.red, "redPow(normalNum)");
this.red._verify1(this);
return this.red.pow(this, e);
};
var w = {
k256: null,
p224: null,
p192: null,
p25519: null
};
function M(e, t) {
this.name = e;
this.p = new a(t, 16);
this.n = this.p.bitLength();
this.k = new a(1).iushln(this.n).isub(this.p);
this.tmp = this._tmp();
}
M.prototype._tmp = function() {
var e = new a(null);
e.words = new Array(Math.ceil(this.n / 13));
return e;
};
M.prototype.ireduce = function(e) {
var t, r = e;
do {
this.split(r, this.tmp);
t = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength();
} while (t > this.n);
var i = t < this.n ? -1 : r.ucmp(this.p);
if (0 === i) {
r.words[0] = 0;
r.length = 1;
} else i > 0 ? r.isub(this.p) : void 0 !== r.strip ? r.strip() : r._strip();
return r;
};
M.prototype.split = function(e, t) {
e.iushrn(this.n, 0, t);
};
M.prototype.imulK = function(e) {
return e.imul(this.k);
};
function S() {
M.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
}
n(S, M);
S.prototype.split = function(e, t) {
for (var r = Math.min(e.length, 9), i = 0; i < r; i++) t.words[i] = e.words[i];
t.length = r;
if (e.length <= 9) {
e.words[0] = 0;
e.length = 1;
} else {
var n = e.words[9];
t.words[t.length++] = 4194303 & n;
for (i = 10; i < e.length; i++) {
var a = 0 | e.words[i];
e.words[i - 10] = (4194303 & a) << 4 | n >>> 22;
n = a;
}
n >>>= 22;
e.words[i - 10] = n;
0 === n && e.length > 10 ? e.length -= 10 : e.length -= 9;
}
};
S.prototype.imulK = function(e) {
e.words[e.length] = 0;
e.words[e.length + 1] = 0;
e.length += 2;
for (var t = 0, r = 0; r < e.length; r++) {
var i = 0 | e.words[r];
t += 977 * i;
e.words[r] = 67108863 & t;
t = 64 * i + (t / 67108864 | 0);
}
if (0 === e.words[e.length - 1]) {
e.length--;
0 === e.words[e.length - 1] && e.length--;
}
return e;
};
function E() {
M.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
}
n(E, M);
function k() {
M.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
}
n(k, M);
function A() {
M.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
}
n(A, M);
A.prototype.imulK = function(e) {
for (var t = 0, r = 0; r < e.length; r++) {
var i = 19 * (0 | e.words[r]) + t, n = 67108863 & i;
i >>>= 26;
e.words[r] = n;
t = i;
}
0 !== t && (e.words[e.length++] = t);
return e;
};
a._prime = function(e) {
if (w[e]) return w[e];
var t;
if ("k256" === e) t = new S(); else if ("p224" === e) t = new E(); else if ("p192" === e) t = new k(); else {
if ("p25519" !== e) throw new Error("Unknown prime " + e);
t = new A();
}
w[e] = t;
return t;
};
function x(e) {
if ("string" == typeof e) {
var t = a._prime(e);
this.m = t.p;
this.prime = t;
} else {
i(e.gtn(1), "modulus must be greater than 1");
this.m = e;
this.prime = null;
}
}
x.prototype._verify1 = function(e) {
i(0 === e.negative, "red works only with positives");
i(e.red, "red works only with red numbers");
};
x.prototype._verify2 = function(e, t) {
i(0 == (e.negative | t.negative), "red works only with positives");
i(e.red && e.red === t.red, "red works only with red numbers");
};
x.prototype.imod = function(e) {
if (this.prime) return this.prime.ireduce(e)._forceRed(this);
c(e, e.umod(this.m)._forceRed(this));
return e;
};
x.prototype.neg = function(e) {
return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this);
};
x.prototype.add = function(e, t) {
this._verify2(e, t);
var r = e.add(t);
r.cmp(this.m) >= 0 && r.isub(this.m);
return r._forceRed(this);
};
x.prototype.iadd = function(e, t) {
this._verify2(e, t);
var r = e.iadd(t);
r.cmp(this.m) >= 0 && r.isub(this.m);
return r;
};
x.prototype.sub = function(e, t) {
this._verify2(e, t);
var r = e.sub(t);
r.cmpn(0) < 0 && r.iadd(this.m);
return r._forceRed(this);
};
x.prototype.isub = function(e, t) {
this._verify2(e, t);
var r = e.isub(t);
r.cmpn(0) < 0 && r.iadd(this.m);
return r;
};
x.prototype.shl = function(e, t) {
this._verify1(e);
return this.imod(e.ushln(t));
};
x.prototype.imul = function(e, t) {
this._verify2(e, t);
return this.imod(e.imul(t));
};
x.prototype.mul = function(e, t) {
this._verify2(e, t);
return this.imod(e.mul(t));
};
x.prototype.isqr = function(e) {
return this.imul(e, e.clone());
};
x.prototype.sqr = function(e) {
return this.mul(e, e);
};
x.prototype.sqrt = function(e) {
if (e.isZero()) return e.clone();
var t = this.m.andln(3);
i(t % 2 == 1);
if (3 === t) {
var r = this.m.add(new a(1)).iushrn(2);
return this.pow(e, r);
}
for (var n = this.m.subn(1), o = 0; !n.isZero() && 0 === n.andln(1); ) {
o++;
n.iushrn(1);
}
i(!n.isZero());
var s = new a(1).toRed(this), f = s.redNeg(), c = this.m.subn(1).iushrn(1), u = this.m.bitLength();
u = new a(2 * u * u).toRed(this);
for (;0 !== this.pow(u, c).cmp(f); ) u.redIAdd(f);
for (var h = this.pow(u, n), d = this.pow(e, n.addn(1).iushrn(1)), l = this.pow(e, n), p = o; 0 !== l.cmp(s); ) {
for (var b = l, m = 0; 0 !== b.cmp(s); m++) b = b.redSqr();
i(m < p);
var g = this.pow(h, new a(1).iushln(p - m - 1));
d = d.redMul(g);
h = g.redSqr();
l = l.redMul(h);
p = m;
}
return d;
};
x.prototype.invm = function(e) {
var t = e._invmp(this.m);
if (0 !== t.negative) {
t.negative = 0;
return this.imod(t).redNeg();
}
return this.imod(t);
};
x.prototype.pow = function(e, t) {
if (t.isZero()) return new a(1).toRed(this);
if (0 === t.cmpn(1)) return e.clone();
var r = new Array(16);
r[0] = new a(1).toRed(this);
r[1] = e;
for (var i = 2; i < r.length; i++) r[i] = this.mul(r[i - 1], e);
var n = r[0], o = 0, s = 0, f = t.bitLength() % 26;
0 === f && (f = 26);
for (i = t.length - 1; i >= 0; i--) {
for (var c = t.words[i], u = f - 1; u >= 0; u--) {
var h = c >> u & 1;
n !== r[0] && (n = this.sqr(n));
if (0 !== h || 0 !== o) {
o <<= 1;
o |= h;
if (4 == ++s || 0 === i && 0 === u) {
n = this.mul(n, r[o]);
s = 0;
o = 0;
}
} else s = 0;
}
f = 26;
}
return n;
};
x.prototype.convertTo = function(e) {
var t = e.umod(this.m);
return t === e ? t.clone() : t;
};
x.prototype.convertFrom = function(e) {
var t = e.clone();
t.red = null;
return t;
};
a.mont = function(e) {
return new R(e);
};
function R(e) {
x.call(this, e);
this.shift = this.m.bitLength();
this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26);
this.r = new a(1).iushln(this.shift);
this.r2 = this.imod(this.r.sqr());
this.rinv = this.r._invmp(this.m);
this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
this.minv = this.minv.umod(this.r);
this.minv = this.r.sub(this.minv);
}
n(R, x);
R.prototype.convertTo = function(e) {
return this.imod(e.ushln(this.shift));
};
R.prototype.convertFrom = function(e) {
var t = this.imod(e.mul(this.rinv));
t.red = null;
return t;
};
R.prototype.imul = function(e, t) {
if (e.isZero() || t.isZero()) {
e.words[0] = 0;
e.length = 1;
return e;
}
var r = e.imul(t), i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), n = r.isub(i).iushrn(this.shift), a = n;
n.cmp(this.m) >= 0 ? a = n.isub(this.m) : n.cmpn(0) < 0 && (a = n.iadd(this.m));
return a._forceRed(this);
};
R.prototype.mul = function(e, t) {
if (e.isZero() || t.isZero()) return new a(0)._forceRed(this);
var r = e.mul(t), i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), n = r.isub(i).iushrn(this.shift), o = n;
n.cmp(this.m) >= 0 ? o = n.isub(this.m) : n.cmpn(0) < 0 && (o = n.iadd(this.m));
return o._forceRed(this);
};
R.prototype.invm = function(e) {
return this.imod(e._invmp(this.m).mul(this.r2))._forceRed(this);
};
})("undefined" == typeof t || t, this);
}, {
buffer: 19
} ],
18: [ function(e, t) {
var r;
t.exports = function(e) {
r || (r = new i(null));
return r.generate(e);
};
function i(e) {
this.rand = e;
}
t.exports.Rand = i;
i.prototype.generate = function(e) {
return this._rand(e);
};
i.prototype._rand = function(e) {
if (this.rand.getBytes) return this.rand.getBytes(e);
for (var t = new Uint8Array(e), r = 0; r < t.length; r++) t[r] = this.rand.getByte();
return t;
};
if ("object" == typeof self) self.crypto && self.crypto.getRandomValues ? i.prototype._rand = function(e) {
var t = new Uint8Array(e);
self.crypto.getRandomValues(t);
return t;
} : self.msCrypto && self.msCrypto.getRandomValues ? i.prototype._rand = function(e) {
var t = new Uint8Array(e);
self.msCrypto.getRandomValues(t);
return t;
} : "object" == typeof window && (i.prototype._rand = function() {
throw new Error("Not implemented yet");
}); else try {
var n = e("crypto");
if ("function" != typeof n.randomBytes) throw new Error("Not supported");
i.prototype._rand = function(e) {
return n.randomBytes(e);
};
} catch (e) {}
}, {
crypto: 19
} ],
19: [ function() {}, {} ],
20: [ function(e, t) {
var r = e("safe-buffer").Buffer;
function i(e) {
r.isBuffer(e) || (e = r.from(e));
for (var t = e.length / 4 | 0, i = new Array(t), n = 0; n < t; n++) i[n] = e.readUInt32BE(4 * n);
return i;
}
function n(e) {
for (;0 < e.length; e++) e[0] = 0;
}
function a(e, t, r, i, n) {
for (var a, o, s, f, c = r[0], u = r[1], h = r[2], d = r[3], l = e[0] ^ t[0], p = e[1] ^ t[1], b = e[2] ^ t[2], m = e[3] ^ t[3], g = 4, y = 1; y < n; y++) {
a = c[l >>> 24] ^ u[p >>> 16 & 255] ^ h[b >>> 8 & 255] ^ d[255 & m] ^ t[g++];
o = c[p >>> 24] ^ u[b >>> 16 & 255] ^ h[m >>> 8 & 255] ^ d[255 & l] ^ t[g++];
s = c[b >>> 24] ^ u[m >>> 16 & 255] ^ h[l >>> 8 & 255] ^ d[255 & p] ^ t[g++];
f = c[m >>> 24] ^ u[l >>> 16 & 255] ^ h[p >>> 8 & 255] ^ d[255 & b] ^ t[g++];
l = a;
p = o;
b = s;
m = f;
}
a = (i[l >>> 24] << 24 | i[p >>> 16 & 255] << 16 | i[b >>> 8 & 255] << 8 | i[255 & m]) ^ t[g++];
o = (i[p >>> 24] << 24 | i[b >>> 16 & 255] << 16 | i[m >>> 8 & 255] << 8 | i[255 & l]) ^ t[g++];
s = (i[b >>> 24] << 24 | i[m >>> 16 & 255] << 16 | i[l >>> 8 & 255] << 8 | i[255 & p]) ^ t[g++];
f = (i[m >>> 24] << 24 | i[l >>> 16 & 255] << 16 | i[p >>> 8 & 255] << 8 | i[255 & b]) ^ t[g++];
return [ a >>>= 0, o >>>= 0, s >>>= 0, f >>>= 0 ];
}
var o = [ 0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54 ], s = function() {
for (var e = new Array(256), t = 0; t < 256; t++) e[t] = t < 128 ? t << 1 : t << 1 ^ 283;
for (var r = [], i = [], n = [ [], [], [], [] ], a = [ [], [], [], [] ], o = 0, s = 0, f = 0; f < 256; ++f) {
var c = s ^ s << 1 ^ s << 2 ^ s << 3 ^ s << 4;
c = c >>> 8 ^ 255 & c ^ 99;
r[o] = c;
i[c] = o;
var u = e[o], h = e[u], d = e[h], l = 257 * e[c] ^ 16843008 * c;
n[0][o] = l << 24 | l >>> 8;
n[1][o] = l << 16 | l >>> 16;
n[2][o] = l << 8 | l >>> 24;
n[3][o] = l;
l = 16843009 * d ^ 65537 * h ^ 257 * u ^ 16843008 * o;
a[0][c] = l << 24 | l >>> 8;
a[1][c] = l << 16 | l >>> 16;
a[2][c] = l << 8 | l >>> 24;
a[3][c] = l;
if (0 === o) o = s = 1; else {
o = u ^ e[e[e[d ^ u]]];
s ^= e[e[s]];
}
}
return {
SBOX: r,
INV_SBOX: i,
SUB_MIX: n,
INV_SUB_MIX: a
};
}();
function f(e) {
this._key = i(e);
this._reset();
}
f.blockSize = 16;
f.keySize = 32;
f.prototype.blockSize = f.blockSize;
f.prototype.keySize = f.keySize;
f.prototype._reset = function() {
for (var e = this._key, t = e.length, r = t + 6, i = 4 * (r + 1), n = [], a = 0; a < t; a++) n[a] = e[a];
for (a = t; a < i; a++) {
var f = n[a - 1];
if (a % t == 0) {
f = f << 8 | f >>> 24;
f = s.SBOX[f >>> 24] << 24 | s.SBOX[f >>> 16 & 255] << 16 | s.SBOX[f >>> 8 & 255] << 8 | s.SBOX[255 & f];
f ^= o[a / t | 0] << 24;
} else t > 6 && a % t == 4 && (f = s.SBOX[f >>> 24] << 24 | s.SBOX[f >>> 16 & 255] << 16 | s.SBOX[f >>> 8 & 255] << 8 | s.SBOX[255 & f]);
n[a] = n[a - t] ^ f;
}
for (var c = [], u = 0; u < i; u++) {
var h = i - u, d = n[h - (u % 4 ? 0 : 4)];
c[u] = u < 4 || h <= 4 ? d : s.INV_SUB_MIX[0][s.SBOX[d >>> 24]] ^ s.INV_SUB_MIX[1][s.SBOX[d >>> 16 & 255]] ^ s.INV_SUB_MIX[2][s.SBOX[d >>> 8 & 255]] ^ s.INV_SUB_MIX[3][s.SBOX[255 & d]];
}
this._nRounds = r;
this._keySchedule = n;
this._invKeySchedule = c;
};
f.prototype.encryptBlockRaw = function(e) {
return a(e = i(e), this._keySchedule, s.SUB_MIX, s.SBOX, this._nRounds);
};
f.prototype.encryptBlock = function(e) {
var t = this.encryptBlockRaw(e), i = r.allocUnsafe(16);
i.writeUInt32BE(t[0], 0);
i.writeUInt32BE(t[1], 4);
i.writeUInt32BE(t[2], 8);
i.writeUInt32BE(t[3], 12);
return i;
};
f.prototype.decryptBlock = function(e) {
var t = (e = i(e))[1];
e[1] = e[3];
e[3] = t;
var n = a(e, this._invKeySchedule, s.INV_SUB_MIX, s.INV_SBOX, this._nRounds), o = r.allocUnsafe(16);
o.writeUInt32BE(n[0], 0);
o.writeUInt32BE(n[3], 4);
o.writeUInt32BE(n[2], 8);
o.writeUInt32BE(n[1], 12);
return o;
};
f.prototype.scrub = function() {
n(this._keySchedule);
n(this._invKeySchedule);
n(this._key);
};
t.exports.AES = f;
}, {
"safe-buffer": 185
} ],
21: [ function(e, t) {
var r = e("./aes"), i = e("safe-buffer").Buffer, n = e("cipher-base"), a = e("inherits"), o = e("./ghash"), s = e("buffer-xor"), f = e("./incr32");
function c(e, t) {
var r = 0;
e.length !== t.length && r++;
for (var i = Math.min(e.length, t.length), n = 0; n < i; ++n) r += e[n] ^ t[n];
return r;
}
function u(e, t, r) {
if (12 === t.length) {
e._finID = i.concat([ t, i.from([ 0, 0, 0, 1 ]) ]);
return i.concat([ t, i.from([ 0, 0, 0, 2 ]) ]);
}
var n = new o(r), a = t.length, s = a % 16;
n.update(t);
if (s) {
s = 16 - s;
n.update(i.alloc(s, 0));
}
n.update(i.alloc(8, 0));
var c = 8 * a, u = i.alloc(8);
u.writeUIntBE(c, 0, 8);
n.update(u);
e._finID = n.state;
var h = i.from(e._finID);
f(h);
return h;
}
function h(e, t, a, s) {
n.call(this);
var f = i.alloc(4, 0);
this._cipher = new r.AES(t);
var c = this._cipher.encryptBlock(f);
this._ghash = new o(c);
a = u(this, a, c);
this._prev = i.from(a);
this._cache = i.allocUnsafe(0);
this._secCache = i.allocUnsafe(0);
this._decrypt = s;
this._alen = 0;
this._len = 0;
this._mode = e;
this._authTag = null;
this._called = !1;
}
a(h, n);
h.prototype._update = function(e) {
if (!this._called && this._alen) {
var t = 16 - this._alen % 16;
if (t < 16) {
t = i.alloc(t, 0);
this._ghash.update(t);
}
}
this._called = !0;
var r = this._mode.encrypt(this, e);
this._decrypt ? this._ghash.update(e) : this._ghash.update(r);
this._len += e.length;
return r;
};
h.prototype._final = function() {
if (this._decrypt && !this._authTag) throw new Error("Unsupported state or unable to authenticate data");
var e = s(this._ghash.final(8 * this._alen, 8 * this._len), this._cipher.encryptBlock(this._finID));
if (this._decrypt && c(e, this._authTag)) throw new Error("Unsupported state or unable to authenticate data");
this._authTag = e;
this._cipher.scrub();
};
h.prototype.getAuthTag = function() {
if (this._decrypt || !i.isBuffer(this._authTag)) throw new Error("Attempting to get auth tag in unsupported state");
return this._authTag;
};
h.prototype.setAuthTag = function(e) {
if (!this._decrypt) throw new Error("Attempting to set auth tag in unsupported state");
this._authTag = e;
};
h.prototype.setAAD = function(e) {
if (this._called) throw new Error("Attempting to set AAD in unsupported state");
this._ghash.update(e);
this._alen += e.length;
};
t.exports = h;
}, {
"./aes": 20,
"./ghash": 25,
"./incr32": 26,
"buffer-xor": 65,
"cipher-base": 68,
inherits: 140,
"safe-buffer": 185
} ],
22: [ function(e, t, r) {
var i = e("./encrypter"), n = e("./decrypter"), a = e("./modes/list.json");
r.createCipher = r.Cipher = i.createCipher;
r.createCipheriv = r.Cipheriv = i.createCipheriv;
r.createDecipher = r.Decipher = n.createDecipher;
r.createDecipheriv = r.Decipheriv = n.createDecipheriv;
r.listCiphers = r.getCiphers = function() {
return Object.keys(a);
};
}, {
"./decrypter": 23,
"./encrypter": 24,
"./modes/list.json": 34
} ],
23: [ function(e, t, r) {
var i = e("./authCipher"), n = e("safe-buffer").Buffer, a = e("./modes"), o = e("./streamCipher"), s = e("cipher-base"), f = e("./aes"), c = e("evp_bytestokey");
function u(e, t, r) {
s.call(this);
this._cache = new h();
this._last = void 0;
this._cipher = new f.AES(t);
this._prev = n.from(r);
this._mode = e;
this._autopadding = !0;
}
e("inherits")(u, s);
u.prototype._update = function(e) {
this._cache.add(e);
for (var t, r, i = []; t = this._cache.get(this._autopadding); ) {
r = this._mode.decrypt(this, t);
i.push(r);
}
return n.concat(i);
};
u.prototype._final = function() {
var e = this._cache.flush();
if (this._autopadding) return d(this._mode.decrypt(this, e));
if (e) throw new Error("data not multiple of block length");
};
u.prototype.setAutoPadding = function(e) {
this._autopadding = !!e;
return this;
};
function h() {
this.cache = n.allocUnsafe(0);
}
h.prototype.add = function(e) {
this.cache = n.concat([ this.cache, e ]);
};
h.prototype.get = function(e) {
var t;
if (e) {
if (this.cache.length > 16) {
t = this.cache.slice(0, 16);
this.cache = this.cache.slice(16);
return t;
}
} else if (this.cache.length >= 16) {
t = this.cache.slice(0, 16);
this.cache = this.cache.slice(16);
return t;
}
return null;
};
h.prototype.flush = function() {
if (this.cache.length) return this.cache;
};
function d(e) {
var t = e[15];
if (t < 1 || t > 16) throw new Error("unable to decrypt data");
for (var r = -1; ++r < t; ) if (e[r + (16 - t)] !== t) throw new Error("unable to decrypt data");
if (16 !== t) return e.slice(0, 16 - t);
}
function l(e, t, r) {
var s = a[e.toLowerCase()];
if (!s) throw new TypeError("invalid suite type");
"string" == typeof r && (r = n.from(r));
if ("GCM" !== s.mode && r.length !== s.iv) throw new TypeError("invalid iv length " + r.length);
"string" == typeof t && (t = n.from(t));
if (t.length !== s.key / 8) throw new TypeError("invalid key length " + t.length);
return "stream" === s.type ? new o(s.module, t, r, !0) : "auth" === s.type ? new i(s.module, t, r, !0) : new u(s.module, t, r);
}
r.createDecipher = function(e, t) {
var r = a[e.toLowerCase()];
if (!r) throw new TypeError("invalid suite type");
var i = c(t, !1, r.key, r.iv);
return l(e, i.key, i.iv);
};
r.createDecipheriv = l;
}, {
"./aes": 20,
"./authCipher": 21,
"./modes": 33,
"./streamCipher": 36,
"cipher-base": 68,
evp_bytestokey: 106,
inherits: 140,
"safe-buffer": 185
} ],
24: [ function(e, t, r) {
var i = e("./modes"), n = e("./authCipher"), a = e("safe-buffer").Buffer, o = e("./streamCipher"), s = e("cipher-base"), f = e("./aes"), c = e("evp_bytestokey");
function u(e, t, r) {
s.call(this);
this._cache = new d();
this._cipher = new f.AES(t);
this._prev = a.from(r);
this._mode = e;
this._autopadding = !0;
}
e("inherits")(u, s);
u.prototype._update = function(e) {
this._cache.add(e);
for (var t, r, i = []; t = this._cache.get(); ) {
r = this._mode.encrypt(this, t);
i.push(r);
}
return a.concat(i);
};
var h = a.alloc(16, 16);
u.prototype._final = function() {
var e = this._cache.flush();
if (this._autopadding) {
e = this._mode.encrypt(this, e);
this._cipher.scrub();
return e;
}
if (!e.equals(h)) {
this._cipher.scrub();
throw new Error("data not multiple of block length");
}
};
u.prototype.setAutoPadding = function(e) {
this._autopadding = !!e;
return this;
};
function d() {
this.cache = a.allocUnsafe(0);
}
d.prototype.add = function(e) {
this.cache = a.concat([ this.cache, e ]);
};
d.prototype.get = function() {
if (this.cache.length > 15) {
var e = this.cache.slice(0, 16);
this.cache = this.cache.slice(16);
return e;
}
return null;
};
d.prototype.flush = function() {
for (var e = 16 - this.cache.length, t = a.allocUnsafe(e), r = -1; ++r < e; ) t.writeUInt8(e, r);
return a.concat([ this.cache, t ]);
};
function l(e, t, r) {
var s = i[e.toLowerCase()];
if (!s) throw new TypeError("invalid suite type");
"string" == typeof t && (t = a.from(t));
if (t.length !== s.key / 8) throw new TypeError("invalid key length " + t.length);
"string" == typeof r && (r = a.from(r));
if ("GCM" !== s.mode && r.length !== s.iv) throw new TypeError("invalid iv length " + r.length);
return "stream" === s.type ? new o(s.module, t, r) : "auth" === s.type ? new n(s.module, t, r) : new u(s.module, t, r);
}
r.createCipheriv = l;
r.createCipher = function(e, t) {
var r = i[e.toLowerCase()];
if (!r) throw new TypeError("invalid suite type");
var n = c(t, !1, r.key, r.iv);
return l(e, n.key, n.iv);
};
}, {
"./aes": 20,
"./authCipher": 21,
"./modes": 33,
"./streamCipher": 36,
"cipher-base": 68,
evp_bytestokey: 106,
inherits: 140,
"safe-buffer": 185
} ],
25: [ function(e, t) {
var r = e("safe-buffer").Buffer, i = r.alloc(16, 0);
function n(e) {
var t = r.allocUnsafe(16);
t.writeUInt32BE(e[0] >>> 0, 0);
t.writeUInt32BE(e[1] >>> 0, 4);
t.writeUInt32BE(e[2] >>> 0, 8);
t.writeUInt32BE(e[3] >>> 0, 12);
return t;
}
function a(e) {
this.h = e;
this.state = r.alloc(16, 0);
this.cache = r.allocUnsafe(0);
}
a.prototype.ghash = function(e) {
for (var t = -1; ++t < e.length; ) this.state[t] ^= e[t];
this._multiply();
};
a.prototype._multiply = function() {
for (var e, t, r, i = [ (e = this.h).readUInt32BE(0), e.readUInt32BE(4), e.readUInt32BE(8), e.readUInt32BE(12) ], a = [ 0, 0, 0, 0 ], o = -1; ++o < 128; ) {
if (0 != (this.state[~~(o / 8)] & 1 << 7 - o % 8)) {
a[0] ^= i[0];
a[1] ^= i[1];
a[2] ^= i[2];
a[3] ^= i[3];
}
r = 0 != (1 & i[3]);
for (t = 3; t > 0; t--) i[t] = i[t] >>> 1 | (1 & i[t - 1]) << 31;
i[0] = i[0] >>> 1;
r && (i[0] = i[0] ^ 225 << 24);
}
this.state = n(a);
};
a.prototype.update = function(e) {
this.cache = r.concat([ this.cache, e ]);
for (var t; this.cache.length >= 16; ) {
t = this.cache.slice(0, 16);
this.cache = this.cache.slice(16);
this.ghash(t);
}
};
a.prototype.final = function(e, t) {
this.cache.length && this.ghash(r.concat([ this.cache, i ], 16));
this.ghash(n([ 0, e, 0, t ]));
return this.state;
};
t.exports = a;
}, {
"safe-buffer": 185
} ],
26: [ function(e, t) {
t.exports = function(e) {
for (var t, r = e.length; r--; ) {
if (255 !== (t = e.readUInt8(r))) {
t++;
e.writeUInt8(t, r);
break;
}
e.writeUInt8(0, r);
}
};
}, {} ],
27: [ function(e, t, r) {
var i = e("buffer-xor");
r.encrypt = function(e, t) {
var r = i(t, e._prev);
e._prev = e._cipher.encryptBlock(r);
return e._prev;
};
r.decrypt = function(e, t) {
var r = e._prev;
e._prev = t;
var n = e._cipher.decryptBlock(t);
return i(n, r);
};
}, {
"buffer-xor": 65
} ],
28: [ function(e, t, r) {
var i = e("safe-buffer").Buffer, n = e("buffer-xor");
function a(e, t, r) {
var a = t.length, o = n(t, e._cache);
e._cache = e._cache.slice(a);
e._prev = i.concat([ e._prev, r ? t : o ]);
return o;
}
r.encrypt = function(e, t, r) {
for (var n, o = i.allocUnsafe(0); t.length; ) {
if (0 === e._cache.length) {
e._cache = e._cipher.encryptBlock(e._prev);
e._prev = i.allocUnsafe(0);
}
if (!(e._cache.length <= t.length)) {
o = i.concat([ o, a(e, t, r) ]);
break;
}
n = e._cache.length;
o = i.concat([ o, a(e, t.slice(0, n), r) ]);
t = t.slice(n);
}
return o;
};
}, {
"buffer-xor": 65,
"safe-buffer": 185
} ],
29: [ function(e, t, r) {
var i = e("safe-buffer").Buffer;
function n(e, t, r) {
for (var i, n, o = -1, s = 0; ++o < 8; ) {
i = t & 1 << 7 - o ? 128 : 0;
s += (128 & (n = e._cipher.encryptBlock(e._prev)[0] ^ i)) >> o % 8;
e._prev = a(e._prev, r ? i : n);
}
return s;
}
function a(e, t) {
var r = e.length, n = -1, a = i.allocUnsafe(e.length);
e = i.concat([ e, i.from([ t ]) ]);
for (;++n < r; ) a[n] = e[n] << 1 | e[n + 1] >> 7;
return a;
}
r.encrypt = function(e, t, r) {
for (var a = t.length, o = i.allocUnsafe(a), s = -1; ++s < a; ) o[s] = n(e, t[s], r);
return o;
};
}, {
"safe-buffer": 185
} ],
30: [ function(e, t, r) {
var i = e("safe-buffer").Buffer;
function n(e, t, r) {
var n = e._cipher.encryptBlock(e._prev)[0] ^ t;
e._prev = i.concat([ e._prev.slice(1), i.from([ r ? t : n ]) ]);
return n;
}
r.encrypt = function(e, t, r) {
for (var a = t.length, o = i.allocUnsafe(a), s = -1; ++s < a; ) o[s] = n(e, t[s], r);
return o;
};
}, {
"safe-buffer": 185
} ],
31: [ function(e, t, r) {
var i = e("buffer-xor"), n = e("safe-buffer").Buffer, a = e("../incr32");
function o(e) {
var t = e._cipher.encryptBlockRaw(e._prev);
a(e._prev);
return t;
}
r.encrypt = function(e, t) {
var r = Math.ceil(t.length / 16), a = e._cache.length;
e._cache = n.concat([ e._cache, n.allocUnsafe(16 * r) ]);
for (var s = 0; s < r; s++) {
var f = o(e), c = a + 16 * s;
e._cache.writeUInt32BE(f[0], c + 0);
e._cache.writeUInt32BE(f[1], c + 4);
e._cache.writeUInt32BE(f[2], c + 8);
e._cache.writeUInt32BE(f[3], c + 12);
}
var u = e._cache.slice(0, t.length);
e._cache = e._cache.slice(t.length);
return i(t, u);
};
}, {
"../incr32": 26,
"buffer-xor": 65,
"safe-buffer": 185
} ],
32: [ function(e, t, r) {
r.encrypt = function(e, t) {
return e._cipher.encryptBlock(t);
};
r.decrypt = function(e, t) {
return e._cipher.decryptBlock(t);
};
}, {} ],
33: [ function(e, t) {
var r = {
ECB: e("./ecb"),
CBC: e("./cbc"),
CFB: e("./cfb"),
CFB8: e("./cfb8"),
CFB1: e("./cfb1"),
OFB: e("./ofb"),
CTR: e("./ctr"),
GCM: e("./ctr")
}, i = e("./list.json");
for (var n in i) i[n].module = r[i[n].mode];
t.exports = i;
}, {
"./cbc": 27,
"./cfb": 28,
"./cfb1": 29,
"./cfb8": 30,
"./ctr": 31,
"./ecb": 32,
"./list.json": 34,
"./ofb": 35
} ],
34: [ function(e, t) {
t.exports = {
"aes-128-ecb": {
cipher: "AES",
key: 128,
iv: 0,
mode: "ECB",
type: "block"
},
"aes-192-ecb": {
cipher: "AES",
key: 192,
iv: 0,
mode: "ECB",
type: "block"
},
"aes-256-ecb": {
cipher: "AES",
key: 256,
iv: 0,
mode: "ECB",
type: "block"
},
"aes-128-cbc": {
cipher: "AES",
key: 128,
iv: 16,
mode: "CBC",
type: "block"
},
"aes-192-cbc": {
cipher: "AES",
key: 192,
iv: 16,
mode: "CBC",
type: "block"
},
"aes-256-cbc": {
cipher: "AES",
key: 256,
iv: 16,
mode: "CBC",
type: "block"
},
aes128: {
cipher: "AES",
key: 128,
iv: 16,
mode: "CBC",
type: "block"
},
aes192: {
cipher: "AES",
key: 192,
iv: 16,
mode: "CBC",
type: "block"
},
aes256: {
cipher: "AES",
key: 256,
iv: 16,
mode: "CBC",
type: "block"
},
"aes-128-cfb": {
cipher: "AES",
key: 128,
iv: 16,
mode: "CFB",
type: "stream"
},
"aes-192-cfb": {
cipher: "AES",
key: 192,
iv: 16,
mode: "CFB",
type: "stream"
},
"aes-256-cfb": {
cipher: "AES",
key: 256,
iv: 16,
mode: "CFB",
type: "stream"
},
"aes-128-cfb8": {
cipher: "AES",
key: 128,
iv: 16,
mode: "CFB8",
type: "stream"
},
"aes-192-cfb8": {
cipher: "AES",
key: 192,
iv: 16,
mode: "CFB8",
type: "stream"
},
"aes-256-cfb8": {
cipher: "AES",
key: 256,
iv: 16,
mode: "CFB8",
type: "stream"
},
"aes-128-cfb1": {
cipher: "AES",
key: 128,
iv: 16,
mode: "CFB1",
type: "stream"
},
"aes-192-cfb1": {
cipher: "AES",
key: 192,
iv: 16,
mode: "CFB1",
type: "stream"
},
"aes-256-cfb1": {
cipher: "AES",
key: 256,
iv: 16,
mode: "CFB1",
type: "stream"
},
"aes-128-ofb": {
cipher: "AES",
key: 128,
iv: 16,
mode: "OFB",
type: "stream"
},
"aes-192-ofb": {
cipher: "AES",
key: 192,
iv: 16,
mode: "OFB",
type: "stream"
},
"aes-256-ofb": {
cipher: "AES",
key: 256,
iv: 16,
mode: "OFB",
type: "stream"
},
"aes-128-ctr": {
cipher: "AES",
key: 128,
iv: 16,
mode: "CTR",
type: "stream"
},
"aes-192-ctr": {
cipher: "AES",
key: 192,
iv: 16,
mode: "CTR",
type: "stream"
},
"aes-256-ctr": {
cipher: "AES",
key: 256,
iv: 16,
mode: "CTR",
type: "stream"
},
"aes-128-gcm": {
cipher: "AES",
key: 128,
iv: 12,
mode: "GCM",
type: "auth"
},
"aes-192-gcm": {
cipher: "AES",
key: 192,
iv: 12,
mode: "GCM",
type: "auth"
},
"aes-256-gcm": {
cipher: "AES",
key: 256,
iv: 12,
mode: "GCM",
type: "auth"
}
};
}, {} ],
35: [ function(e, t, r) {
(function(t) {
var i = e("buffer-xor");
function n(e) {
e._prev = e._cipher.encryptBlock(e._prev);
return e._prev;
}
r.encrypt = function(e, r) {
for (;e._cache.length < r.length; ) e._cache = t.concat([ e._cache, n(e) ]);
var a = e._cache.slice(0, r.length);
e._cache = e._cache.slice(r.length);
return i(r, a);
};
}).call(this, e("buffer").Buffer);
}, {
buffer: 66,
"buffer-xor": 65
} ],
36: [ function(e, t) {
var r = e("./aes"), i = e("safe-buffer").Buffer, n = e("cipher-base");
function a(e, t, a, o) {
n.call(this);
this._cipher = new r.AES(t);
this._prev = i.from(a);
this._cache = i.allocUnsafe(0);
this._secCache = i.allocUnsafe(0);
this._decrypt = o;
this._mode = e;
}
e("inherits")(a, n);
a.prototype._update = function(e) {
return this._mode.encrypt(this, e, this._decrypt);
};
a.prototype._final = function() {
this._cipher.scrub();
};
t.exports = a;
}, {
"./aes": 20,
"cipher-base": 68,
inherits: 140,
"safe-buffer": 185
} ],
37: [ function(e, t, r) {
var i = e("browserify-des"), n = e("browserify-aes/browser"), a = e("browserify-aes/modes"), o = e("browserify-des/modes"), s = e("evp_bytestokey");
function f(e, t, r) {
e = e.toLowerCase();
if (a[e]) return n.createCipheriv(e, t, r);
if (o[e]) return new i({
key: t,
iv: r,
mode: e
});
throw new TypeError("invalid suite type");
}
function c(e, t, r) {
e = e.toLowerCase();
if (a[e]) return n.createDecipheriv(e, t, r);
if (o[e]) return new i({
key: t,
iv: r,
mode: e,
decrypt: !0
});
throw new TypeError("invalid suite type");
}
r.createCipher = r.Cipher = function(e, t) {
e = e.toLowerCase();
var r, i;
if (a[e]) {
r = a[e].key;
i = a[e].iv;
} else {
if (!o[e]) throw new TypeError("invalid suite type");
r = 8 * o[e].key;
i = o[e].iv;
}
var n = s(t, !1, r, i);
return f(e, n.key, n.iv);
};
r.createCipheriv = r.Cipheriv = f;
r.createDecipher = r.Decipher = function(e, t) {
e = e.toLowerCase();
var r, i;
if (a[e]) {
r = a[e].key;
i = a[e].iv;
} else {
if (!o[e]) throw new TypeError("invalid suite type");
r = 8 * o[e].key;
i = o[e].iv;
}
var n = s(t, !1, r, i);
return c(e, n.key, n.iv);
};
r.createDecipheriv = r.Decipheriv = c;
r.listCiphers = r.getCiphers = function() {
return Object.keys(o).concat(n.getCiphers());
};
}, {
"browserify-aes/browser": 22,
"browserify-aes/modes": 33,
"browserify-des": 38,
"browserify-des/modes": 39,
evp_bytestokey: 106
} ],
38: [ function(e, t) {
var r = e("cipher-base"), i = e("des.js"), n = e("inherits"), a = e("safe-buffer").Buffer, o = {
"des-ede3-cbc": i.CBC.instantiate(i.EDE),
"des-ede3": i.EDE,
"des-ede-cbc": i.CBC.instantiate(i.EDE),
"des-ede": i.EDE,
"des-cbc": i.CBC.instantiate(i.DES),
"des-ecb": i.DES
};
o.des = o["des-cbc"];
o.des3 = o["des-ede3-cbc"];
t.exports = s;
n(s, r);
function s(e) {
r.call(this);
var t, i = e.mode.toLowerCase(), n = o[i];
t = e.decrypt ? "decrypt" : "encrypt";
var s = e.key;
a.isBuffer(s) || (s = a.from(s));
"des-ede" !== i && "des-ede-cbc" !== i || (s = a.concat([ s, s.slice(0, 8) ]));
var f = e.iv;
a.isBuffer(f) || (f = a.from(f));
this._des = n.create({
key: s,
iv: f,
type: t
});
}
s.prototype._update = function(e) {
return a.from(this._des.update(e));
};
s.prototype._final = function() {
return a.from(this._des.final());
};
}, {
"cipher-base": 68,
"des.js": 77,
inherits: 140,
"safe-buffer": 185
} ],
39: [ function(e, t, r) {
r["des-ecb"] = {
key: 8,
iv: 0
};
r["des-cbc"] = r.des = {
key: 8,
iv: 8
};
r["des-ede3-cbc"] = r.des3 = {
key: 24,
iv: 8
};
r["des-ede3"] = {
key: 24,
iv: 0
};
r["des-ede-cbc"] = {
key: 16,
iv: 8
};
r["des-ede"] = {
key: 16,
iv: 0
};
}, {} ],
40: [ function(e, t) {
(function(r) {
var i = e("bn.js"), n = e("randombytes");
t.exports = o;
function a(e) {
var t = s(e);
return {
blinder: t.toRed(i.mont(e.modulus)).redPow(new i(e.publicExponent)).fromRed(),
unblinder: t.invm(e.modulus)
};
}
function o(e, t) {
var n = a(t), o = t.modulus.byteLength(), s = (i.mont(t.modulus), new i(e).mul(n.blinder).umod(t.modulus)), f = s.toRed(i.mont(t.prime1)), c = s.toRed(i.mont(t.prime2)), u = t.coefficient, h = t.prime1, d = t.prime2, l = f.redPow(t.exponent1), p = c.redPow(t.exponent2);
l = l.fromRed();
p = p.fromRed();
var b = l.isub(p).imul(u).umod(h);
b.imul(d);
p.iadd(b);
return new r(p.imul(n.unblinder).umod(t.modulus).toArray(!1, o));
}
o.getr = s;
function s(e) {
for (var t = e.modulus.byteLength(), r = new i(n(t)); r.cmp(e.modulus) >= 0 || !r.umod(e.prime1) || !r.umod(e.prime2); ) r = new i(n(t));
return r;
}
}).call(this, e("buffer").Buffer);
}, {
"bn.js": 41,
buffer: 66,
randombytes: 167
} ],
41: [ function(e, t, r) {
arguments[4][15][0].apply(r, arguments);
}, {
buffer: 19,
dup: 15
} ],
42: [ function(e, t) {
t.exports = e("./browser/algorithms.json");
}, {
"./browser/algorithms.json": 43
} ],
43: [ function(e, t) {
t.exports = {
sha224WithRSAEncryption: {
sign: "rsa",
hash: "sha224",
id: "302d300d06096086480165030402040500041c"
},
"RSA-SHA224": {
sign: "ecdsa/rsa",
hash: "sha224",
id: "302d300d06096086480165030402040500041c"
},
sha256WithRSAEncryption: {
sign: "rsa",
hash: "sha256",
id: "3031300d060960864801650304020105000420"
},
"RSA-SHA256": {
sign: "ecdsa/rsa",
hash: "sha256",
id: "3031300d060960864801650304020105000420"
},
sha384WithRSAEncryption: {
sign: "rsa",
hash: "sha384",
id: "3041300d060960864801650304020205000430"
},
"RSA-SHA384": {
sign: "ecdsa/rsa",
hash: "sha384",
id: "3041300d060960864801650304020205000430"
},
sha512WithRSAEncryption: {
sign: "rsa",
hash: "sha512",
id: "3051300d060960864801650304020305000440"
},
"RSA-SHA512": {
sign: "ecdsa/rsa",
hash: "sha512",
id: "3051300d060960864801650304020305000440"
},
"RSA-SHA1": {
sign: "rsa",
hash: "sha1",
id: "3021300906052b0e03021a05000414"
},
"ecdsa-with-SHA1": {
sign: "ecdsa",
hash: "sha1",
id: ""
},
sha256: {
sign: "ecdsa",
hash: "sha256",
id: ""
},
sha224: {
sign: "ecdsa",
hash: "sha224",
id: ""
},
sha384: {
sign: "ecdsa",
hash: "sha384",
id: ""
},
sha512: {
sign: "ecdsa",
hash: "sha512",
id: ""
},
"DSA-SHA": {
sign: "dsa",
hash: "sha1",
id: ""
},
"DSA-SHA1": {
sign: "dsa",
hash: "sha1",
id: ""
},
DSA: {
sign: "dsa",
hash: "sha1",
id: ""
},
"DSA-WITH-SHA224": {
sign: "dsa",
hash: "sha224",
id: ""
},
"DSA-SHA224": {
sign: "dsa",
hash: "sha224",
id: ""
},
"DSA-WITH-SHA256": {
sign: "dsa",
hash: "sha256",
id: ""
},
"DSA-SHA256": {
sign: "dsa",
hash: "sha256",
id: ""
},
"DSA-WITH-SHA384": {
sign: "dsa",
hash: "sha384",
id: ""
},
"DSA-SHA384": {
sign: "dsa",
hash: "sha384",
id: ""
},
"DSA-WITH-SHA512": {
sign: "dsa",
hash: "sha512",
id: ""
},
"DSA-SHA512": {
sign: "dsa",
hash: "sha512",
id: ""
},
"DSA-RIPEMD160": {
sign: "dsa",
hash: "rmd160",
id: ""
},
ripemd160WithRSA: {
sign: "rsa",
hash: "rmd160",
id: "3021300906052b2403020105000414"
},
"RSA-RIPEMD160": {
sign: "rsa",
hash: "rmd160",
id: "3021300906052b2403020105000414"
},
md5WithRSAEncryption: {
sign: "rsa",
hash: "md5",
id: "3020300c06082a864886f70d020505000410"
},
"RSA-MD5": {
sign: "rsa",
hash: "md5",
id: "3020300c06082a864886f70d020505000410"
}
};
}, {} ],
44: [ function(e, t) {
t.exports = {
"1.3.132.0.10": "secp256k1",
"1.3.132.0.33": "p224",
"1.2.840.10045.3.1.1": "p192",
"1.2.840.10045.3.1.7": "p256",
"1.3.132.0.34": "p384",
"1.3.132.0.35": "p521"
};
}, {} ],
45: [ function(e, t) {
var r = e("safe-buffer").Buffer, i = e("create-hash"), n = e("readable-stream"), a = e("inherits"), o = e("./sign"), s = e("./verify"), f = e("./algorithms.json");
Object.keys(f).forEach(function(e) {
f[e].id = r.from(f[e].id, "hex");
f[e.toLowerCase()] = f[e];
});
function c(e) {
n.Writable.call(this);
var t = f[e];
if (!t) throw new Error("Unknown message digest");
this._hashType = t.hash;
this._hash = i(t.hash);
this._tag = t.id;
this._signType = t.sign;
}
a(c, n.Writable);
c.prototype._write = function(e, t, r) {
this._hash.update(e);
r();
};
c.prototype.update = function(e, t) {
"string" == typeof e && (e = r.from(e, t));
this._hash.update(e);
return this;
};
c.prototype.sign = function(e, t) {
this.end();
var r = this._hash.digest(), i = o(r, e, this._hashType, this._signType, this._tag);
return t ? i.toString(t) : i;
};
function u(e) {
n.Writable.call(this);
var t = f[e];
if (!t) throw new Error("Unknown message digest");
this._hash = i(t.hash);
this._tag = t.id;
this._signType = t.sign;
}
a(u, n.Writable);
u.prototype._write = function(e, t, r) {
this._hash.update(e);
r();
};
u.prototype.update = function(e, t) {
"string" == typeof e && (e = r.from(e, t));
this._hash.update(e);
return this;
};
u.prototype.verify = function(e, t, i) {
"string" == typeof t && (t = r.from(t, i));
this.end();
var n = this._hash.digest();
return s(t, n, e, this._signType, this._tag);
};
function h(e) {
return new c(e);
}
function d(e) {
return new u(e);
}
t.exports = {
Sign: h,
Verify: d,
createSign: h,
createVerify: d
};
}, {
"./algorithms.json": 43,
"./sign": 46,
"./verify": 47,
"create-hash": 72,
inherits: 140,
"readable-stream": 62,
"safe-buffer": 63
} ],
46: [ function(e, t) {
var r = e("safe-buffer").Buffer, i = e("create-hmac"), n = e("browserify-rsa"), a = e("elliptic").ec, o = e("bn.js"), s = e("parse-asn1"), f = e("./curves.json");
function c(e, t) {
var i = f[t.curve.join(".")];
if (!i) throw new Error("unknown curve " + t.curve.join("."));
var n = new a(i).keyFromPrivate(t.privateKey).sign(e);
return r.from(n.toDER());
}
function u(e, t, r) {
for (var i, n = t.params.priv_key, a = t.params.p, s = t.params.q, f = t.params.g, c = new o(0), u = l(e, s).mod(s), p = !1, g = d(n, s, e, r); !1 === p; ) {
c = m(f, i = b(s, g, r), a, s);
if (0 === (p = i.invm(s).imul(u.add(n.mul(c))).mod(s)).cmpn(0)) {
p = !1;
c = new o(0);
}
}
return h(c, p);
}
function h(e, t) {
e = e.toArray();
t = t.toArray();
128 & e[0] && (e = [ 0 ].concat(e));
128 & t[0] && (t = [ 0 ].concat(t));
var i = [ 48, e.length + t.length + 4, 2, e.length ];
i = i.concat(e, [ 2, t.length ], t);
return r.from(i);
}
function d(e, t, n, a) {
if ((e = r.from(e.toArray())).length < t.byteLength()) {
var o = r.alloc(t.byteLength() - e.length);
e = r.concat([ o, e ]);
}
var s = n.length, f = p(n, t), c = r.alloc(s);
c.fill(1);
var u = r.alloc(s);
u = i(a, u).update(c).update(r.from([ 0 ])).update(e).update(f).digest();
c = i(a, u).update(c).digest();
return {
k: u = i(a, u).update(c).update(r.from([ 1 ])).update(e).update(f).digest(),
v: c = i(a, u).update(c).digest()
};
}
function l(e, t) {
var r = new o(e), i = (e.length << 3) - t.bitLength();
i > 0 && r.ishrn(i);
return r;
}
function p(e, t) {
e = (e = l(e, t)).mod(t);
var i = r.from(e.toArray());
if (i.length < t.byteLength()) {
var n = r.alloc(t.byteLength() - i.length);
i = r.concat([ n, i ]);
}
return i;
}
function b(e, t, n) {
var a, o;
do {
a = r.alloc(0);
for (;8 * a.length < e.bitLength(); ) {
t.v = i(n, t.k).update(t.v).digest();
a = r.concat([ a, t.v ]);
}
o = l(a, e);
t.k = i(n, t.k).update(t.v).update(r.from([ 0 ])).digest();
t.v = i(n, t.k).update(t.v).digest();
} while (-1 !== o.cmp(e));
return o;
}
function m(e, t, r, i) {
return e.toRed(o.mont(r)).redPow(t).fromRed().mod(i);
}
t.exports = function(e, t, i, a, o) {
var f = s(t);
if (f.curve) {
if ("ecdsa" !== a && "ecdsa/rsa" !== a) throw new Error("wrong private key type");
return c(e, f);
}
if ("dsa" === f.type) {
if ("dsa" !== a) throw new Error("wrong private key type");
return u(e, f, i);
}
if ("rsa" !== a && "ecdsa/rsa" !== a) throw new Error("wrong private key type");
e = r.concat([ o, e ]);
for (var h = f.modulus.byteLength(), d = [ 0, 1 ]; e.length + d.length + 1 < h; ) d.push(255);
d.push(0);
for (var l = -1; ++l < e.length; ) d.push(e[l]);
return n(d, f);
};
t.exports.getKey = d;
t.exports.makeKey = b;
}, {
"./curves.json": 44,
"bn.js": 17,
"browserify-rsa": 40,
"create-hmac": 74,
elliptic: 88,
"parse-asn1": 151,
"safe-buffer": 63
} ],
47: [ function(e, t) {
var r = e("safe-buffer").Buffer, i = e("bn.js"), n = e("elliptic").ec, a = e("parse-asn1"), o = e("./curves.json");
function s(e, t, r) {
var i = o[r.data.algorithm.curve.join(".")];
if (!i) throw new Error("unknown curve " + r.data.algorithm.curve.join("."));
var a = new n(i), s = r.data.subjectPrivateKey.data;
return a.verify(t, e, s);
}
function f(e, t, r) {
var n = r.data.p, o = r.data.q, s = r.data.g, f = r.data.pub_key, u = a.signature.decode(e, "der"), h = u.s, d = u.r;
c(h, o);
c(d, o);
var l = i.mont(n), p = h.invm(o);
return 0 === s.toRed(l).redPow(new i(t).mul(p).mod(o)).fromRed().mul(f.toRed(l).redPow(d.mul(p).mod(o)).fromRed()).mod(n).mod(o).cmp(d);
}
function c(e, t) {
if (e.cmpn(0) <= 0) throw new Error("invalid sig");
if (e.cmp(t) >= t) throw new Error("invalid sig");
}
t.exports = function(e, t, n, o, c) {
var u = a(n);
if ("ec" === u.type) {
if ("ecdsa" !== o && "ecdsa/rsa" !== o) throw new Error("wrong public key type");
return s(e, t, u);
}
if ("dsa" === u.type) {
if ("dsa" !== o) throw new Error("wrong public key type");
return f(e, t, u);
}
if ("rsa" !== o && "ecdsa/rsa" !== o) throw new Error("wrong public key type");
t = r.concat([ c, t ]);
for (var h = u.modulus.byteLength(), d = [ 1 ], l = 0; t.length + d.length + 2 < h; ) {
d.push(255);
l++;
}
d.push(0);
for (var p = -1; ++p < t.length; ) d.push(t[p]);
d = r.from(d);
var b = i.mont(u.modulus);
e = (e = new i(e).toRed(b)).redPow(new i(u.publicExponent));
e = r.from(e.fromRed().toArray());
var m = l < 8 ? 1 : 0;
h = Math.min(e.length, d.length);
e.length !== d.length && (m = 1);
p = -1;
for (;++p < h; ) m |= e[p] ^ d[p];
return 0 === m;
};
}, {
"./curves.json": 44,
"bn.js": 17,
elliptic: 88,
"parse-asn1": 151,
"safe-buffer": 63
} ],
48: [ function(e, t) {
"use strict";
function r(e, t) {
e.prototype = Object.create(t.prototype);
e.prototype.constructor = e;
e.__proto__ = t;
}
var i = {};
function n(e, t, n) {
n || (n = Error);
function a(e, r, i) {
return "string" == typeof t ? t : t(e, r, i);
}
var o = function(e) {
r(t, e);
function t(t, r, i) {
return e.call(this, a(t, r, i)) || this;
}
return t;
}(n);
o.prototype.name = n.name;
o.prototype.code = e;
i[e] = o;
}
function a(e, t) {
if (Array.isArray(e)) {
var r = e.length;
e = e.map(function(e) {
return String(e);
});
return r > 2 ? "one of ".concat(t, " ").concat(e.slice(0, r - 1).join(", "), ", or ") + e[r - 1] : 2 === r ? "one of ".concat(t, " ").concat(e[0], " or ").concat(e[1]) : "of ".concat(t, " ").concat(e[0]);
}
return "of ".concat(t, " ").concat(String(e));
}
function o(e, t, r) {
(void 0 === r || r > e.length) && (r = e.length);
return e.substring(r - t.length, r) === t;
}
function s(e, t, r) {
"number" != typeof r && (r = 0);
return !(r + t.length > e.length) && -1 !== e.indexOf(t, r);
}
n("ERR_INVALID_OPT_VALUE", function(e, t) {
return 'The value "' + t + '" is invalid for option "' + e + '"';
}, TypeError);
n("ERR_INVALID_ARG_TYPE", function(e, t, r) {
var i, n;
if ("string" == typeof t && ("not ", "not " === t.substr(0, "not ".length))) {
i = "must not be";
t = t.replace(/^not /, "");
} else i = "must be";
if (o(e, " argument")) n = "The ".concat(e, " ").concat(i, " ").concat(a(t, "type")); else {
var f = s(e, ".") ? "property" : "argument";
n = 'The "'.concat(e, '" ').concat(f, " ").concat(i, " ").concat(a(t, "type"));
}
return n + ". Received type ".concat(typeof r);
}, TypeError);
n("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
n("ERR_METHOD_NOT_IMPLEMENTED", function(e) {
return "The " + e + " method is not implemented";
});
n("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
n("ERR_STREAM_DESTROYED", function(e) {
return "Cannot call " + e + " after a stream was destroyed";
});
n("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
n("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
n("ERR_STREAM_WRITE_AFTER_END", "write after end");
n("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
n("ERR_UNKNOWN_ENCODING", function(e) {
return "Unknown encoding: " + e;
}, TypeError);
n("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
t.exports.codes = i;
}, {} ],
49: [ function(e, t) {
(function(r) {
"use strict";
var i = Object.keys || function(e) {
var t = [];
for (var r in e) t.push(r);
return t;
};
t.exports = c;
var n = e("./_stream_readable"), a = e("./_stream_writable");
e("inherits")(c, n);
for (var o = i(a.prototype), s = 0; s < o.length; s++) {
var f = o[s];
c.prototype[f] || (c.prototype[f] = a.prototype[f]);
}
function c(e) {
if (!(this instanceof c)) return new c(e);
n.call(this, e);
a.call(this, e);
this.allowHalfOpen = !0;
if (e) {
!1 === e.readable && (this.readable = !1);
!1 === e.writable && (this.writable = !1);
if (!1 === e.allowHalfOpen) {
this.allowHalfOpen = !1;
this.once("end", u);
}
}
}
Object.defineProperty(c.prototype, "writableHighWaterMark", {
enumerable: !1,
get: function() {
return this._writableState.highWaterMark;
}
});
Object.defineProperty(c.prototype, "writableBuffer", {
enumerable: !1,
get: function() {
return this._writableState && this._writableState.getBuffer();
}
});
Object.defineProperty(c.prototype, "writableLength", {
enumerable: !1,
get: function() {
return this._writableState.length;
}
});
function u() {
this._writableState.ended || r.nextTick(h, this);
}
function h(e) {
e.end();
}
Object.defineProperty(c.prototype, "destroyed", {
enumerable: !1,
get: function() {
return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed;
},
set: function(e) {
if (void 0 !== this._readableState && void 0 !== this._writableState) {
this._readableState.destroyed = e;
this._writableState.destroyed = e;
}
}
});
}).call(this, e("_process"));
}, {
"./_stream_readable": 51,
"./_stream_writable": 53,
_process: 159,
inherits: 140
} ],
50: [ function(e, t) {
"use strict";
t.exports = i;
var r = e("./_stream_transform");
e("inherits")(i, r);
function i(e) {
if (!(this instanceof i)) return new i(e);
r.call(this, e);
}
i.prototype._transform = function(e, t, r) {
r(null, e);
};
}, {
"./_stream_transform": 52,
inherits: 140
} ],
51: [ function(e, t) {
(function(r, i) {
"use strict";
t.exports = x;
var n;
x.ReadableState = A;
e("events").EventEmitter;
var a = function(e, t) {
return e.listeners(t).length;
}, o = e("./internal/streams/stream"), s = e("buffer").Buffer, f = i.Uint8Array || function() {};
function c(e) {
return s.from(e);
}
var u, h = e("util");
u = h && h.debuglog ? h.debuglog("stream") : function() {};
var d, l, p, b = e("./internal/streams/buffer_list"), m = e("./internal/streams/destroy"), g = e("./internal/streams/state").getHighWaterMark, y = e("../errors").codes, v = y.ERR_INVALID_ARG_TYPE, _ = y.ERR_STREAM_PUSH_AFTER_EOF, w = y.ERR_METHOD_NOT_IMPLEMENTED, M = y.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
e("inherits")(x, o);
var S = m.errorOrDestroy, E = [ "error", "close", "destroy", "pause", "resume" ];
function k(e, t, r) {
if ("function" == typeof e.prependListener) return e.prependListener(t, r);
e._events && e._events[t] ? Array.isArray(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [ r, e._events[t] ] : e.on(t, r);
}
function A(t, r, i) {
n = n || e("./_stream_duplex");
t = t || {};
"boolean" != typeof i && (i = r instanceof n);
this.objectMode = !!t.objectMode;
i && (this.objectMode = this.objectMode || !!t.readableObjectMode);
this.highWaterMark = g(this, t, "readableHighWaterMark", i);
this.buffer = new b();
this.length = 0;
this.pipes = null;
this.pipesCount = 0;
this.flowing = null;
this.ended = !1;
this.endEmitted = !1;
this.reading = !1;
this.sync = !0;
this.needReadable = !1;
this.emittedReadable = !1;
this.readableListening = !1;
this.resumeScheduled = !1;
this.paused = !0;
this.emitClose = !1 !== t.emitClose;
this.autoDestroy = !!t.autoDestroy;
this.destroyed = !1;
this.defaultEncoding = t.defaultEncoding || "utf8";
this.awaitDrain = 0;
this.readingMore = !1;
this.decoder = null;
this.encoding = null;
if (t.encoding) {
d || (d = e("string_decoder/").StringDecoder);
this.decoder = new d(t.encoding);
this.encoding = t.encoding;
}
}
function x(t) {
n = n || e("./_stream_duplex");
if (!(this instanceof x)) return new x(t);
var r = this instanceof n;
this._readableState = new A(t, this, r);
this.readable = !0;
if (t) {
"function" == typeof t.read && (this._read = t.read);
"function" == typeof t.destroy && (this._destroy = t.destroy);
}
o.call(this);
}
Object.defineProperty(x.prototype, "destroyed", {
enumerable: !1,
get: function() {
return void 0 !== this._readableState && this._readableState.destroyed;
},
set: function(e) {
this._readableState && (this._readableState.destroyed = e);
}
});
x.prototype.destroy = m.destroy;
x.prototype._undestroy = m.undestroy;
x.prototype._destroy = function(e, t) {
t(e);
};
x.prototype.push = function(e, t) {
var r, i = this._readableState;
if (i.objectMode) r = !0; else if ("string" == typeof e) {
if ((t = t || i.defaultEncoding) !== i.encoding) {
e = s.from(e, t);
t = "";
}
r = !0;
}
return R(this, e, t, !1, r);
};
x.prototype.unshift = function(e) {
return R(this, e, null, !0, !1);
};
function R(e, t, r, i, n) {
u("readableAddChunk", t);
var a = e._readableState;
if (null === t) {
a.reading = !1;
C(e, a);
} else {
var o;
n || (o = B(a, t));
if (o) S(e, o); else if (a.objectMode || t && t.length > 0) {
"string" == typeof t || a.objectMode || Object.getPrototypeOf(t) === s.prototype || (t = c(t));
if (i) a.endEmitted ? S(e, new M()) : T(e, a, t, !0); else if (a.ended) S(e, new _()); else {
if (a.destroyed) return !1;
a.reading = !1;
if (a.decoder && !r) {
t = a.decoder.write(t);
a.objectMode || 0 !== t.length ? T(e, a, t, !1) : N(e, a);
} else T(e, a, t, !1);
}
} else if (!i) {
a.reading = !1;
N(e, a);
}
}
return !a.ended && (a.length < a.highWaterMark || 0 === a.length);
}
function T(e, t, r, i) {
if (t.flowing && 0 === t.length && !t.sync) {
t.awaitDrain = 0;
e.emit("data", r);
} else {
t.length += t.objectMode ? 1 : r.length;
i ? t.buffer.unshift(r) : t.buffer.push(r);
t.needReadable && O(e);
}
N(e, t);
}
function B(e, t) {
var r, i;
(i = t, s.isBuffer(i) || i instanceof f) || "string" == typeof t || void 0 === t || e.objectMode || (r = new v("chunk", [ "string", "Buffer", "Uint8Array" ], t));
return r;
}
x.prototype.isPaused = function() {
return !1 === this._readableState.flowing;
};
x.prototype.setEncoding = function(t) {
d || (d = e("string_decoder/").StringDecoder);
var r = new d(t);
this._readableState.decoder = r;
this._readableState.encoding = this._readableState.decoder.encoding;
for (var i = this._readableState.buffer.head, n = ""; null !== i; ) {
n += r.write(i.data);
i = i.next;
}
this._readableState.buffer.clear();
"" !== n && this._readableState.buffer.push(n);
this._readableState.length = n.length;
return this;
};
var j = 1073741824;
function I(e) {
if (e >= j) e = j; else {
e--;
e |= e >>> 1;
e |= e >>> 2;
e |= e >>> 4;
e |= e >>> 8;
e |= e >>> 16;
e++;
}
return e;
}
function P(e, t) {
if (e <= 0 || 0 === t.length && t.ended) return 0;
if (t.objectMode) return 1;
if (e != e) return t.flowing && t.length ? t.buffer.head.data.length : t.length;
e > t.highWaterMark && (t.highWaterMark = I(e));
if (e <= t.length) return e;
if (!t.ended) {
t.needReadable = !0;
return 0;
}
return t.length;
}
x.prototype.read = function(e) {
u("read", e);
e = parseInt(e, 10);
var t = this._readableState, r = e;
0 !== e && (t.emittedReadable = !1);
if (0 === e && t.needReadable && ((0 !== t.highWaterMark ? t.length >= t.highWaterMark : t.length > 0) || t.ended)) {
u("read: emitReadable", t.length, t.ended);
0 === t.length && t.ended ? V(this) : O(this);
return null;
}
if (0 === (e = P(e, t)) && t.ended) {
0 === t.length && V(this);
return null;
}
var i, n = t.needReadable;
u("need readable", n);
(0 === t.length || t.length - e < t.highWaterMark) && u("length less than watermark", n = !0);
if (t.ended || t.reading) u("reading or ended", n = !1); else if (n) {
u("do read");
t.reading = !0;
t.sync = !0;
0 === t.length && (t.needReadable = !0);
this._read(t.highWaterMark);
t.sync = !1;
t.reading || (e = P(r, t));
}
if (null === (i = e > 0 ? W(e, t) : null)) {
t.needReadable = t.length <= t.highWaterMark;
e = 0;
} else {
t.length -= e;
t.awaitDrain = 0;
}
if (0 === t.length) {
t.ended || (t.needReadable = !0);
r !== e && t.ended && V(this);
}
null !== i && this.emit("data", i);
return i;
};
function C(e, t) {
u("onEofChunk");
if (!t.ended) {
if (t.decoder) {
var r = t.decoder.end();
if (r && r.length) {
t.buffer.push(r);
t.length += t.objectMode ? 1 : r.length;
}
}
t.ended = !0;
if (t.sync) O(e); else {
t.needReadable = !1;
if (!t.emittedReadable) {
t.emittedReadable = !0;
L(e);
}
}
}
}
function O(e) {
var t = e._readableState;
u("emitReadable", t.needReadable, t.emittedReadable);
t.needReadable = !1;
if (!t.emittedReadable) {
u("emitReadable", t.flowing);
t.emittedReadable = !0;
r.nextTick(L, e);
}
}
function L(e) {
var t = e._readableState;
u("emitReadable_", t.destroyed, t.length, t.ended);
if (!t.destroyed && (t.length || t.ended)) {
e.emit("readable");
t.emittedReadable = !1;
}
t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark;
H(e);
}
function N(e, t) {
if (!t.readingMore) {
t.readingMore = !0;
r.nextTick(D, e, t);
}
}
function D(e, t) {
for (;!t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && 0 === t.length); ) {
var r = t.length;
u("maybeReadMore read 0");
e.read(0);
if (r === t.length) break;
}
t.readingMore = !1;
}
x.prototype._read = function() {
S(this, new w("_read()"));
};
x.prototype.pipe = function(e, t) {
var i = this, n = this._readableState;
switch (n.pipesCount) {
case 0:
n.pipes = e;
break;

case 1:
n.pipes = [ n.pipes, e ];
break;

default:
n.pipes.push(e);
}
n.pipesCount += 1;
u("pipe count=%d opts=%j", n.pipesCount, t);
var o = t && !1 === t.end || e === r.stdout || e === r.stderr ? g : f;
n.endEmitted ? r.nextTick(o) : i.once("end", o);
e.on("unpipe", s);
function s(e, t) {
u("onunpipe");
if (e === i && t && !1 === t.hasUnpiped) {
t.hasUnpiped = !0;
d();
}
}
function f() {
u("onend");
e.end();
}
var c = U(i);
e.on("drain", c);
var h = !1;
function d() {
u("cleanup");
e.removeListener("close", b);
e.removeListener("finish", m);
e.removeListener("drain", c);
e.removeListener("error", p);
e.removeListener("unpipe", s);
i.removeListener("end", f);
i.removeListener("end", g);
i.removeListener("data", l);
h = !0;
!n.awaitDrain || e._writableState && !e._writableState.needDrain || c();
}
i.on("data", l);
function l(t) {
u("ondata");
var r = e.write(t);
u("dest.write", r);
if (!1 === r) {
if ((1 === n.pipesCount && n.pipes === e || n.pipesCount > 1 && -1 !== J(n.pipes, e)) && !h) {
u("false write response, pause", n.awaitDrain);
n.awaitDrain++;
}
i.pause();
}
}
function p(t) {
u("onerror", t);
g();
e.removeListener("error", p);
0 === a(e, "error") && S(e, t);
}
k(e, "error", p);
function b() {
e.removeListener("finish", m);
g();
}
e.once("close", b);
function m() {
u("onfinish");
e.removeListener("close", b);
g();
}
e.once("finish", m);
function g() {
u("unpipe");
i.unpipe(e);
}
e.emit("pipe", i);
if (!n.flowing) {
u("pipe resume");
i.resume();
}
return e;
};
function U(e) {
return function() {
var t = e._readableState;
u("pipeOnDrain", t.awaitDrain);
t.awaitDrain && t.awaitDrain--;
if (0 === t.awaitDrain && a(e, "data")) {
t.flowing = !0;
H(e);
}
};
}
x.prototype.unpipe = function(e) {
var t = this._readableState, r = {
hasUnpiped: !1
};
if (0 === t.pipesCount) return this;
if (1 === t.pipesCount) {
if (e && e !== t.pipes) return this;
e || (e = t.pipes);
t.pipes = null;
t.pipesCount = 0;
t.flowing = !1;
e && e.emit("unpipe", this, r);
return this;
}
if (!e) {
var i = t.pipes, n = t.pipesCount;
t.pipes = null;
t.pipesCount = 0;
t.flowing = !1;
for (var a = 0; a < n; a++) i[a].emit("unpipe", this, {
hasUnpiped: !1
});
return this;
}
var o = J(t.pipes, e);
if (-1 === o) return this;
t.pipes.splice(o, 1);
t.pipesCount -= 1;
1 === t.pipesCount && (t.pipes = t.pipes[0]);
e.emit("unpipe", this, r);
return this;
};
x.prototype.on = function(e, t) {
var i = o.prototype.on.call(this, e, t), n = this._readableState;
if ("data" === e) {
n.readableListening = this.listenerCount("readable") > 0;
!1 !== n.flowing && this.resume();
} else if ("readable" === e && !n.endEmitted && !n.readableListening) {
n.readableListening = n.needReadable = !0;
n.flowing = !1;
n.emittedReadable = !1;
u("on readable", n.length, n.reading);
n.length ? O(this) : n.reading || r.nextTick(z, this);
}
return i;
};
x.prototype.addListener = x.prototype.on;
x.prototype.removeListener = function(e, t) {
var i = o.prototype.removeListener.call(this, e, t);
"readable" === e && r.nextTick(q, this);
return i;
};
x.prototype.removeAllListeners = function(e) {
var t = o.prototype.removeAllListeners.apply(this, arguments);
"readable" !== e && void 0 !== e || r.nextTick(q, this);
return t;
};
function q(e) {
var t = e._readableState;
t.readableListening = e.listenerCount("readable") > 0;
t.resumeScheduled && !t.paused ? t.flowing = !0 : e.listenerCount("data") > 0 && e.resume();
}
function z(e) {
u("readable nexttick read 0");
e.read(0);
}
x.prototype.resume = function() {
var e = this._readableState;
if (!e.flowing) {
u("resume");
e.flowing = !e.readableListening;
F(this, e);
}
e.paused = !1;
return this;
};
function F(e, t) {
if (!t.resumeScheduled) {
t.resumeScheduled = !0;
r.nextTick(K, e, t);
}
}
function K(e, t) {
u("resume", t.reading);
t.reading || e.read(0);
t.resumeScheduled = !1;
e.emit("resume");
H(e);
t.flowing && !t.reading && e.read(0);
}
x.prototype.pause = function() {
u("call pause flowing=%j", this._readableState.flowing);
if (!1 !== this._readableState.flowing) {
u("pause");
this._readableState.flowing = !1;
this.emit("pause");
}
this._readableState.paused = !0;
return this;
};
function H(e) {
var t = e._readableState;
u("flow", t.flowing);
for (;t.flowing && null !== e.read(); ) ;
}
x.prototype.wrap = function(e) {
var t = this, r = this._readableState, i = !1;
e.on("end", function() {
u("wrapped end");
if (r.decoder && !r.ended) {
var e = r.decoder.end();
e && e.length && t.push(e);
}
t.push(null);
});
e.on("data", function(n) {
u("wrapped data");
r.decoder && (n = r.decoder.write(n));
if ((!r.objectMode || null != n) && (r.objectMode || n && n.length) && !t.push(n)) {
i = !0;
e.pause();
}
});
for (var n in e) void 0 === this[n] && "function" == typeof e[n] && (this[n] = function(t) {
return function() {
return e[t].apply(e, arguments);
};
}(n));
for (var a = 0; a < E.length; a++) e.on(E[a], this.emit.bind(this, E[a]));
this._read = function(t) {
u("wrapped _read", t);
if (i) {
i = !1;
e.resume();
}
};
return this;
};
"function" == typeof Symbol && (x.prototype[Symbol.asyncIterator] = function() {
void 0 === l && (l = e("./internal/streams/async_iterator"));
return l(this);
});
Object.defineProperty(x.prototype, "readableHighWaterMark", {
enumerable: !1,
get: function() {
return this._readableState.highWaterMark;
}
});
Object.defineProperty(x.prototype, "readableBuffer", {
enumerable: !1,
get: function() {
return this._readableState && this._readableState.buffer;
}
});
Object.defineProperty(x.prototype, "readableFlowing", {
enumerable: !1,
get: function() {
return this._readableState.flowing;
},
set: function(e) {
this._readableState && (this._readableState.flowing = e);
}
});
x._fromList = W;
Object.defineProperty(x.prototype, "readableLength", {
enumerable: !1,
get: function() {
return this._readableState.length;
}
});
function W(e, t) {
if (0 === t.length) return null;
var r;
if (t.objectMode) r = t.buffer.shift(); else if (!e || e >= t.length) {
r = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.first() : t.buffer.concat(t.length);
t.buffer.clear();
} else r = t.buffer.consume(e, t.decoder);
return r;
}
function V(e) {
var t = e._readableState;
u("endReadable", t.endEmitted);
if (!t.endEmitted) {
t.ended = !0;
r.nextTick(Y, t, e);
}
}
function Y(e, t) {
u("endReadableNT", e.endEmitted, e.length);
if (!e.endEmitted && 0 === e.length) {
e.endEmitted = !0;
t.readable = !1;
t.emit("end");
if (e.autoDestroy) {
var r = t._writableState;
(!r || r.autoDestroy && r.finished) && t.destroy();
}
}
}
"function" == typeof Symbol && (x.from = function(t, r) {
void 0 === p && (p = e("./internal/streams/from"));
return p(x, t, r);
});
function J(e, t) {
for (var r = 0, i = e.length; r < i; r++) if (e[r] === t) return r;
return -1;
}
}).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"../errors": 48,
"./_stream_duplex": 49,
"./internal/streams/async_iterator": 54,
"./internal/streams/buffer_list": 55,
"./internal/streams/destroy": 56,
"./internal/streams/from": 58,
"./internal/streams/state": 60,
"./internal/streams/stream": 61,
_process: 159,
buffer: 66,
events: 105,
inherits: 140,
"string_decoder/": 64,
util: 19
} ],
52: [ function(e, t) {
"use strict";
t.exports = c;
var r = e("../errors").codes, i = r.ERR_METHOD_NOT_IMPLEMENTED, n = r.ERR_MULTIPLE_CALLBACK, a = r.ERR_TRANSFORM_ALREADY_TRANSFORMING, o = r.ERR_TRANSFORM_WITH_LENGTH_0, s = e("./_stream_duplex");
e("inherits")(c, s);
function f(e, t) {
var r = this._transformState;
r.transforming = !1;
var i = r.writecb;
if (null === i) return this.emit("error", new n());
r.writechunk = null;
r.writecb = null;
null != t && this.push(t);
i(e);
var a = this._readableState;
a.reading = !1;
(a.needReadable || a.length < a.highWaterMark) && this._read(a.highWaterMark);
}
function c(e) {
if (!(this instanceof c)) return new c(e);
s.call(this, e);
this._transformState = {
afterTransform: f.bind(this),
needTransform: !1,
transforming: !1,
writecb: null,
writechunk: null,
writeencoding: null
};
this._readableState.needReadable = !0;
this._readableState.sync = !1;
if (e) {
"function" == typeof e.transform && (this._transform = e.transform);
"function" == typeof e.flush && (this._flush = e.flush);
}
this.on("prefinish", u);
}
function u() {
var e = this;
"function" != typeof this._flush || this._readableState.destroyed ? h(this, null, null) : this._flush(function(t, r) {
h(e, t, r);
});
}
c.prototype.push = function(e, t) {
this._transformState.needTransform = !1;
return s.prototype.push.call(this, e, t);
};
c.prototype._transform = function(e, t, r) {
r(new i("_transform()"));
};
c.prototype._write = function(e, t, r) {
var i = this._transformState;
i.writecb = r;
i.writechunk = e;
i.writeencoding = t;
if (!i.transforming) {
var n = this._readableState;
(i.needTransform || n.needReadable || n.length < n.highWaterMark) && this._read(n.highWaterMark);
}
};
c.prototype._read = function() {
var e = this._transformState;
if (null === e.writechunk || e.transforming) e.needTransform = !0; else {
e.transforming = !0;
this._transform(e.writechunk, e.writeencoding, e.afterTransform);
}
};
c.prototype._destroy = function(e, t) {
s.prototype._destroy.call(this, e, function(e) {
t(e);
});
};
function h(e, t, r) {
if (t) return e.emit("error", t);
null != r && e.push(r);
if (e._writableState.length) throw new o();
if (e._transformState.transforming) throw new a();
return e.push(null);
}
}, {
"../errors": 48,
"./_stream_duplex": 49,
inherits: 140
} ],
53: [ function(e, t) {
(function(r, i) {
"use strict";
t.exports = A;
function n(e) {
var t = this;
this.next = null;
this.entry = null;
this.finish = function() {
K(t, e);
};
}
var a;
A.WritableState = k;
var o = {
deprecate: e("util-deprecate")
}, s = e("./internal/streams/stream"), f = e("buffer").Buffer, c = i.Uint8Array || function() {};
function u(e) {
return f.from(e);
}
var h, d = e("./internal/streams/destroy"), l = e("./internal/streams/state").getHighWaterMark, p = e("../errors").codes, b = p.ERR_INVALID_ARG_TYPE, m = p.ERR_METHOD_NOT_IMPLEMENTED, g = p.ERR_MULTIPLE_CALLBACK, y = p.ERR_STREAM_CANNOT_PIPE, v = p.ERR_STREAM_DESTROYED, _ = p.ERR_STREAM_NULL_VALUES, w = p.ERR_STREAM_WRITE_AFTER_END, M = p.ERR_UNKNOWN_ENCODING, S = d.errorOrDestroy;
e("inherits")(A, s);
function E() {}
function k(t, r, i) {
a = a || e("./_stream_duplex");
t = t || {};
"boolean" != typeof i && (i = r instanceof a);
this.objectMode = !!t.objectMode;
i && (this.objectMode = this.objectMode || !!t.writableObjectMode);
this.highWaterMark = l(this, t, "writableHighWaterMark", i);
this.finalCalled = !1;
this.needDrain = !1;
this.ending = !1;
this.ended = !1;
this.finished = !1;
this.destroyed = !1;
var o = !1 === t.decodeStrings;
this.decodeStrings = !o;
this.defaultEncoding = t.defaultEncoding || "utf8";
this.length = 0;
this.writing = !1;
this.corked = 0;
this.sync = !0;
this.bufferProcessing = !1;
this.onwrite = function(e) {
C(r, e);
};
this.writecb = null;
this.writelen = 0;
this.bufferedRequest = null;
this.lastBufferedRequest = null;
this.pendingcb = 0;
this.prefinished = !1;
this.errorEmitted = !1;
this.emitClose = !1 !== t.emitClose;
this.autoDestroy = !!t.autoDestroy;
this.bufferedRequestCount = 0;
this.corkedRequestsFree = new n(this);
}
k.prototype.getBuffer = function() {
for (var e = this.bufferedRequest, t = []; e; ) {
t.push(e);
e = e.next;
}
return t;
};
(function() {
try {
Object.defineProperty(k.prototype, "buffer", {
get: o.deprecate(function() {
return this.getBuffer();
}, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
});
} catch (e) {}
})();
if ("function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance]) {
h = Function.prototype[Symbol.hasInstance];
Object.defineProperty(A, Symbol.hasInstance, {
value: function(e) {
return !!h.call(this, e) || this === A && e && e._writableState instanceof k;
}
});
} else h = function(e) {
return e instanceof this;
};
function A(t) {
var r = this instanceof (a = a || e("./_stream_duplex"));
if (!r && !h.call(A, this)) return new A(t);
this._writableState = new k(t, this, r);
this.writable = !0;
if (t) {
"function" == typeof t.write && (this._write = t.write);
"function" == typeof t.writev && (this._writev = t.writev);
"function" == typeof t.destroy && (this._destroy = t.destroy);
"function" == typeof t.final && (this._final = t.final);
}
s.call(this);
}
A.prototype.pipe = function() {
S(this, new y());
};
function x(e, t) {
var i = new w();
S(e, i);
r.nextTick(t, i);
}
function R(e, t, i, n) {
var a;
null === i ? a = new _() : "string" == typeof i || t.objectMode || (a = new b("chunk", [ "string", "Buffer" ], i));
if (a) {
S(e, a);
r.nextTick(n, a);
return !1;
}
return !0;
}
A.prototype.write = function(e, t, r) {
var i, n = this._writableState, a = !1, o = !n.objectMode && (i = e, f.isBuffer(i) || i instanceof c);
o && !f.isBuffer(e) && (e = u(e));
if ("function" == typeof t) {
r = t;
t = null;
}
o ? t = "buffer" : t || (t = n.defaultEncoding);
"function" != typeof r && (r = E);
if (n.ending) x(this, r); else if (o || R(this, n, e, r)) {
n.pendingcb++;
a = B(this, n, o, e, t, r);
}
return a;
};
A.prototype.cork = function() {
this._writableState.corked++;
};
A.prototype.uncork = function() {
var e = this._writableState;
if (e.corked) {
e.corked--;
e.writing || e.corked || e.bufferProcessing || !e.bufferedRequest || N(this, e);
}
};
A.prototype.setDefaultEncoding = function(e) {
"string" == typeof e && (e = e.toLowerCase());
if (!([ "hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw" ].indexOf((e + "").toLowerCase()) > -1)) throw new M(e);
this._writableState.defaultEncoding = e;
return this;
};
Object.defineProperty(A.prototype, "writableBuffer", {
enumerable: !1,
get: function() {
return this._writableState && this._writableState.getBuffer();
}
});
function T(e, t, r) {
e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = f.from(t, r));
return t;
}
Object.defineProperty(A.prototype, "writableHighWaterMark", {
enumerable: !1,
get: function() {
return this._writableState.highWaterMark;
}
});
function B(e, t, r, i, n, a) {
if (!r) {
var o = T(t, i, n);
if (i !== o) {
r = !0;
n = "buffer";
i = o;
}
}
var s = t.objectMode ? 1 : i.length;
t.length += s;
var f = t.length < t.highWaterMark;
f || (t.needDrain = !0);
if (t.writing || t.corked) {
var c = t.lastBufferedRequest;
t.lastBufferedRequest = {
chunk: i,
encoding: n,
isBuf: r,
callback: a,
next: null
};
c ? c.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest;
t.bufferedRequestCount += 1;
} else j(e, t, !1, s, i, n, a);
return f;
}
function j(e, t, r, i, n, a, o) {
t.writelen = i;
t.writecb = o;
t.writing = !0;
t.sync = !0;
t.destroyed ? t.onwrite(new v("write")) : r ? e._writev(n, t.onwrite) : e._write(n, a, t.onwrite);
t.sync = !1;
}
function I(e, t, i, n, a) {
--t.pendingcb;
if (i) {
r.nextTick(a, n);
r.nextTick(z, e, t);
e._writableState.errorEmitted = !0;
S(e, n);
} else {
a(n);
e._writableState.errorEmitted = !0;
S(e, n);
z(e, t);
}
}
function P(e) {
e.writing = !1;
e.writecb = null;
e.length -= e.writelen;
e.writelen = 0;
}
function C(e, t) {
var i = e._writableState, n = i.sync, a = i.writecb;
if ("function" != typeof a) throw new g();
P(i);
if (t) I(e, i, n, t, a); else {
var o = D(i) || e.destroyed;
o || i.corked || i.bufferProcessing || !i.bufferedRequest || N(e, i);
n ? r.nextTick(O, e, i, o, a) : O(e, i, o, a);
}
}
function O(e, t, r, i) {
r || L(e, t);
t.pendingcb--;
i();
z(e, t);
}
function L(e, t) {
if (0 === t.length && t.needDrain) {
t.needDrain = !1;
e.emit("drain");
}
}
function N(e, t) {
t.bufferProcessing = !0;
var r = t.bufferedRequest;
if (e._writev && r && r.next) {
var i = t.bufferedRequestCount, a = new Array(i), o = t.corkedRequestsFree;
o.entry = r;
for (var s = 0, f = !0; r; ) {
a[s] = r;
r.isBuf || (f = !1);
r = r.next;
s += 1;
}
a.allBuffers = f;
j(e, t, !0, t.length, a, "", o.finish);
t.pendingcb++;
t.lastBufferedRequest = null;
if (o.next) {
t.corkedRequestsFree = o.next;
o.next = null;
} else t.corkedRequestsFree = new n(t);
t.bufferedRequestCount = 0;
} else {
for (;r; ) {
var c = r.chunk, u = r.encoding, h = r.callback;
j(e, t, !1, t.objectMode ? 1 : c.length, c, u, h);
r = r.next;
t.bufferedRequestCount--;
if (t.writing) break;
}
null === r && (t.lastBufferedRequest = null);
}
t.bufferedRequest = r;
t.bufferProcessing = !1;
}
A.prototype._write = function(e, t, r) {
r(new m("_write()"));
};
A.prototype._writev = null;
A.prototype.end = function(e, t, r) {
var i = this._writableState;
if ("function" == typeof e) {
r = e;
e = null;
t = null;
} else if ("function" == typeof t) {
r = t;
t = null;
}
null != e && this.write(e, t);
if (i.corked) {
i.corked = 1;
this.uncork();
}
i.ending || F(this, i, r);
return this;
};
Object.defineProperty(A.prototype, "writableLength", {
enumerable: !1,
get: function() {
return this._writableState.length;
}
});
function D(e) {
return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing;
}
function U(e, t) {
e._final(function(r) {
t.pendingcb--;
r && S(e, r);
t.prefinished = !0;
e.emit("prefinish");
z(e, t);
});
}
function q(e, t) {
if (!t.prefinished && !t.finalCalled) if ("function" != typeof e._final || t.destroyed) {
t.prefinished = !0;
e.emit("prefinish");
} else {
t.pendingcb++;
t.finalCalled = !0;
r.nextTick(U, e, t);
}
}
function z(e, t) {
var r = D(t);
if (r) {
q(e, t);
if (0 === t.pendingcb) {
t.finished = !0;
e.emit("finish");
if (t.autoDestroy) {
var i = e._readableState;
(!i || i.autoDestroy && i.endEmitted) && e.destroy();
}
}
}
return r;
}
function F(e, t, i) {
t.ending = !0;
z(e, t);
i && (t.finished ? r.nextTick(i) : e.once("finish", i));
t.ended = !0;
e.writable = !1;
}
function K(e, t, r) {
var i = e.entry;
e.entry = null;
for (;i; ) {
var n = i.callback;
t.pendingcb--;
n(r);
i = i.next;
}
t.corkedRequestsFree.next = e;
}
Object.defineProperty(A.prototype, "destroyed", {
enumerable: !1,
get: function() {
return void 0 !== this._writableState && this._writableState.destroyed;
},
set: function(e) {
this._writableState && (this._writableState.destroyed = e);
}
});
A.prototype.destroy = d.destroy;
A.prototype._undestroy = d.undestroy;
A.prototype._destroy = function(e, t) {
t(e);
};
}).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"../errors": 48,
"./_stream_duplex": 49,
"./internal/streams/destroy": 56,
"./internal/streams/state": 60,
"./internal/streams/stream": 61,
_process: 159,
buffer: 66,
inherits: 140,
"util-deprecate": 196
} ],
54: [ function(e, t) {
(function(r) {
"use strict";
var i;
function n(e, t, r) {
t in e ? Object.defineProperty(e, t, {
value: r,
enumerable: !0,
configurable: !0,
writable: !0
}) : e[t] = r;
return e;
}
var a = e("./end-of-stream"), o = Symbol("lastResolve"), s = Symbol("lastReject"), f = Symbol("error"), c = Symbol("ended"), u = Symbol("lastPromise"), h = Symbol("handlePromise"), d = Symbol("stream");
function l(e, t) {
return {
value: e,
done: t
};
}
function p(e) {
var t = e[o];
if (null !== t) {
var r = e[d].read();
if (null !== r) {
e[u] = null;
e[o] = null;
e[s] = null;
t(l(r, !1));
}
}
}
function b(e) {
r.nextTick(p, e);
}
function m(e, t) {
return function(r, i) {
e.then(function() {
t[c] ? r(l(void 0, !0)) : t[h](r, i);
}, i);
};
}
var g = Object.getPrototypeOf(function() {}), y = Object.setPrototypeOf((n(i = {
get stream() {
return this[d];
},
next: function() {
var e = this, t = this[f];
if (null !== t) return Promise.reject(t);
if (this[c]) return Promise.resolve(l(void 0, !0));
if (this[d].destroyed) return new Promise(function(t, i) {
r.nextTick(function() {
e[f] ? i(e[f]) : t(l(void 0, !0));
});
});
var i, n = this[u];
if (n) i = new Promise(m(n, this)); else {
var a = this[d].read();
if (null !== a) return Promise.resolve(l(a, !1));
i = new Promise(this[h]);
}
this[u] = i;
return i;
}
}, Symbol.asyncIterator, function() {
return this;
}), n(i, "return", function() {
var e = this;
return new Promise(function(t, r) {
e[d].destroy(null, function(e) {
e ? r(e) : t(l(void 0, !0));
});
});
}), i), g);
t.exports = function(e) {
var t, r = Object.create(y, (n(t = {}, d, {
value: e,
writable: !0
}), n(t, o, {
value: null,
writable: !0
}), n(t, s, {
value: null,
writable: !0
}), n(t, f, {
value: null,
writable: !0
}), n(t, c, {
value: e._readableState.endEmitted,
writable: !0
}), n(t, h, {
value: function(e, t) {
var i = r[d].read();
if (i) {
r[u] = null;
r[o] = null;
r[s] = null;
e(l(i, !1));
} else {
r[o] = e;
r[s] = t;
}
},
writable: !0
}), t));
r[u] = null;
a(e, function(e) {
if (e && "ERR_STREAM_PREMATURE_CLOSE" !== e.code) {
var t = r[s];
if (null !== t) {
r[u] = null;
r[o] = null;
r[s] = null;
t(e);
}
r[f] = e;
} else {
var i = r[o];
if (null !== i) {
r[u] = null;
r[o] = null;
r[s] = null;
i(l(void 0, !0));
}
r[c] = !0;
}
});
e.on("readable", b.bind(null, r));
return r;
};
}).call(this, e("_process"));
}, {
"./end-of-stream": 57,
_process: 159
} ],
55: [ function(e, t) {
"use strict";
function r(e, t) {
var r = Object.keys(e);
if (Object.getOwnPropertySymbols) {
var i = Object.getOwnPropertySymbols(e);
t && (i = i.filter(function(t) {
return Object.getOwnPropertyDescriptor(e, t).enumerable;
}));
r.push.apply(r, i);
}
return r;
}
function i(e) {
for (var t = 1; t < arguments.length; t++) {
var i = null != arguments[t] ? arguments[t] : {};
t % 2 ? r(Object(i), !0).forEach(function(t) {
n(e, t, i[t]);
}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : r(Object(i)).forEach(function(t) {
Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
});
}
return e;
}
function n(e, t, r) {
t in e ? Object.defineProperty(e, t, {
value: r,
enumerable: !0,
configurable: !0,
writable: !0
}) : e[t] = r;
return e;
}
function a(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function o(e, t) {
for (var r = 0; r < t.length; r++) {
var i = t[r];
i.enumerable = i.enumerable || !1;
i.configurable = !0;
"value" in i && (i.writable = !0);
Object.defineProperty(e, i.key, i);
}
}
function s(e, t, r) {
t && o(e.prototype, t);
r && o(e, r);
return e;
}
var f = e("buffer").Buffer, c = e("util").inspect, u = c && c.custom || "inspect";
t.exports = function() {
function e() {
a(this, e);
this.head = null;
this.tail = null;
this.length = 0;
}
s(e, [ {
key: "push",
value: function(e) {
var t = {
data: e,
next: null
};
this.length > 0 ? this.tail.next = t : this.head = t;
this.tail = t;
++this.length;
}
}, {
key: "unshift",
value: function(e) {
var t = {
data: e,
next: this.head
};
0 === this.length && (this.tail = t);
this.head = t;
++this.length;
}
}, {
key: "shift",
value: function() {
if (0 !== this.length) {
var e = this.head.data;
1 === this.length ? this.head = this.tail = null : this.head = this.head.next;
--this.length;
return e;
}
}
}, {
key: "clear",
value: function() {
this.head = this.tail = null;
this.length = 0;
}
}, {
key: "join",
value: function(e) {
if (0 === this.length) return "";
for (var t = this.head, r = "" + t.data; t = t.next; ) r += e + t.data;
return r;
}
}, {
key: "concat",
value: function(e) {
if (0 === this.length) return f.alloc(0);
for (var t, r, i, n = f.allocUnsafe(e >>> 0), a = this.head, o = 0; a; ) {
t = a.data, r = n, i = o, f.prototype.copy.call(t, r, i);
o += a.data.length;
a = a.next;
}
return n;
}
}, {
key: "consume",
value: function(e, t) {
var r;
if (e < this.head.data.length) {
r = this.head.data.slice(0, e);
this.head.data = this.head.data.slice(e);
} else r = e === this.head.data.length ? this.shift() : t ? this._getString(e) : this._getBuffer(e);
return r;
}
}, {
key: "first",
value: function() {
return this.head.data;
}
}, {
key: "_getString",
value: function(e) {
var t = this.head, r = 1, i = t.data;
e -= i.length;
for (;t = t.next; ) {
var n = t.data, a = e > n.length ? n.length : e;
a === n.length ? i += n : i += n.slice(0, e);
if (0 == (e -= a)) {
if (a === n.length) {
++r;
t.next ? this.head = t.next : this.head = this.tail = null;
} else {
this.head = t;
t.data = n.slice(a);
}
break;
}
++r;
}
this.length -= r;
return i;
}
}, {
key: "_getBuffer",
value: function(e) {
var t = f.allocUnsafe(e), r = this.head, i = 1;
r.data.copy(t);
e -= r.data.length;
for (;r = r.next; ) {
var n = r.data, a = e > n.length ? n.length : e;
n.copy(t, t.length - e, 0, a);
if (0 == (e -= a)) {
if (a === n.length) {
++i;
r.next ? this.head = r.next : this.head = this.tail = null;
} else {
this.head = r;
r.data = n.slice(a);
}
break;
}
++i;
}
this.length -= i;
return t;
}
}, {
key: u,
value: function(e, t) {
return c(this, i({}, t, {
depth: 0,
customInspect: !1
}));
}
} ]);
return e;
}();
}, {
buffer: 66,
util: 19
} ],
56: [ function(e, t) {
(function(e) {
"use strict";
function r(e, t) {
n(e, t);
i(e);
}
function i(e) {
e._writableState && !e._writableState.emitClose || e._readableState && !e._readableState.emitClose || e.emit("close");
}
function n(e, t) {
e.emit("error", t);
}
t.exports = {
destroy: function(t, a) {
var o = this, s = this._readableState && this._readableState.destroyed, f = this._writableState && this._writableState.destroyed;
if (s || f) {
if (a) a(t); else if (t) if (this._writableState) {
if (!this._writableState.errorEmitted) {
this._writableState.errorEmitted = !0;
e.nextTick(n, this, t);
}
} else e.nextTick(n, this, t);
return this;
}
this._readableState && (this._readableState.destroyed = !0);
this._writableState && (this._writableState.destroyed = !0);
this._destroy(t || null, function(t) {
if (!a && t) if (o._writableState) if (o._writableState.errorEmitted) e.nextTick(i, o); else {
o._writableState.errorEmitted = !0;
e.nextTick(r, o, t);
} else e.nextTick(r, o, t); else if (a) {
e.nextTick(i, o);
a(t);
} else e.nextTick(i, o);
});
return this;
},
undestroy: function() {
if (this._readableState) {
this._readableState.destroyed = !1;
this._readableState.reading = !1;
this._readableState.ended = !1;
this._readableState.endEmitted = !1;
}
if (this._writableState) {
this._writableState.destroyed = !1;
this._writableState.ended = !1;
this._writableState.ending = !1;
this._writableState.finalCalled = !1;
this._writableState.prefinished = !1;
this._writableState.finished = !1;
this._writableState.errorEmitted = !1;
}
},
errorOrDestroy: function(e, t) {
var r = e._readableState, i = e._writableState;
r && r.autoDestroy || i && i.autoDestroy ? e.destroy(t) : e.emit("error", t);
}
};
}).call(this, e("_process"));
}, {
_process: 159
} ],
57: [ function(e, t) {
"use strict";
var r = e("../../../errors").codes.ERR_STREAM_PREMATURE_CLOSE;
function i(e) {
var t = !1;
return function() {
if (!t) {
t = !0;
for (var r = arguments.length, i = new Array(r), n = 0; n < r; n++) i[n] = arguments[n];
e.apply(this, i);
}
};
}
function n() {}
function a(e) {
return e.setHeader && "function" == typeof e.abort;
}
t.exports = function e(t, o, s) {
if ("function" == typeof o) return e(t, null, o);
o || (o = {});
s = i(s || n);
var f = o.readable || !1 !== o.readable && t.readable, c = o.writable || !1 !== o.writable && t.writable, u = function() {
t.writable || d();
}, h = t._writableState && t._writableState.finished, d = function() {
c = !1;
h = !0;
f || s.call(t);
}, l = t._readableState && t._readableState.endEmitted, p = function() {
f = !1;
l = !0;
c || s.call(t);
}, b = function(e) {
s.call(t, e);
}, m = function() {
var e;
if (f && !l) {
t._readableState && t._readableState.ended || (e = new r());
return s.call(t, e);
}
if (c && !h) {
t._writableState && t._writableState.ended || (e = new r());
return s.call(t, e);
}
}, g = function() {
t.req.on("finish", d);
};
if (a(t)) {
t.on("complete", d);
t.on("abort", m);
t.req ? g() : t.on("request", g);
} else if (c && !t._writableState) {
t.on("end", u);
t.on("close", u);
}
t.on("end", p);
t.on("finish", d);
!1 !== o.error && t.on("error", b);
t.on("close", m);
return function() {
t.removeListener("complete", d);
t.removeListener("abort", m);
t.removeListener("request", g);
t.req && t.req.removeListener("finish", d);
t.removeListener("end", u);
t.removeListener("close", u);
t.removeListener("finish", d);
t.removeListener("end", p);
t.removeListener("error", b);
t.removeListener("close", m);
};
};
}, {
"../../../errors": 48
} ],
58: [ function(e, t) {
t.exports = function() {
throw new Error("Readable.from is not available in the browser");
};
}, {} ],
59: [ function(e, t) {
"use strict";
var r;
function i(e) {
var t = !1;
return function() {
if (!t) {
t = !0;
e.apply(void 0, arguments);
}
};
}
var n = e("../../../errors").codes, a = n.ERR_MISSING_ARGS, o = n.ERR_STREAM_DESTROYED;
function s(e) {
if (e) throw e;
}
function f(e) {
return e.setHeader && "function" == typeof e.abort;
}
function c(t, n, a, s) {
s = i(s);
var c = !1;
t.on("close", function() {
c = !0;
});
void 0 === r && (r = e("./end-of-stream"));
r(t, {
readable: n,
writable: a
}, function(e) {
if (e) return s(e);
c = !0;
s();
});
var u = !1;
return function(e) {
if (!c && !u) {
u = !0;
if (f(t)) return t.abort();
if ("function" == typeof t.destroy) return t.destroy();
s(e || new o("pipe"));
}
};
}
function u(e) {
e();
}
function h(e, t) {
return e.pipe(t);
}
function d(e) {
return e.length ? "function" != typeof e[e.length - 1] ? s : e.pop() : s;
}
t.exports = function() {
for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
var i, n = d(t);
Array.isArray(t[0]) && (t = t[0]);
if (t.length < 2) throw new a("streams");
var o = t.map(function(e, r) {
var a = r < t.length - 1;
return c(e, a, r > 0, function(e) {
i || (i = e);
e && o.forEach(u);
if (!a) {
o.forEach(u);
n(i);
}
});
});
return t.reduce(h);
};
}, {
"../../../errors": 48,
"./end-of-stream": 57
} ],
60: [ function(e, t) {
"use strict";
var r = e("../../../errors").codes.ERR_INVALID_OPT_VALUE;
function i(e, t, r) {
return null != e.highWaterMark ? e.highWaterMark : t ? e[r] : null;
}
t.exports = {
getHighWaterMark: function(e, t, n, a) {
var o = i(t, a, n);
if (null != o) {
if (!isFinite(o) || Math.floor(o) !== o || o < 0) throw new r(a ? n : "highWaterMark", o);
return Math.floor(o);
}
return e.objectMode ? 16 : 16384;
}
};
}, {
"../../../errors": 48
} ],
61: [ function(e, t) {
t.exports = e("events").EventEmitter;
}, {
events: 105
} ],
62: [ function(e, t, r) {
(r = t.exports = e("./lib/_stream_readable.js")).Stream = r;
r.Readable = r;
r.Writable = e("./lib/_stream_writable.js");
r.Duplex = e("./lib/_stream_duplex.js");
r.Transform = e("./lib/_stream_transform.js");
r.PassThrough = e("./lib/_stream_passthrough.js");
r.finished = e("./lib/internal/streams/end-of-stream.js");
r.pipeline = e("./lib/internal/streams/pipeline.js");
}, {
"./lib/_stream_duplex.js": 49,
"./lib/_stream_passthrough.js": 50,
"./lib/_stream_readable.js": 51,
"./lib/_stream_transform.js": 52,
"./lib/_stream_writable.js": 53,
"./lib/internal/streams/end-of-stream.js": 57,
"./lib/internal/streams/pipeline.js": 59
} ],
63: [ function(e, t, r) {
var i = e("buffer"), n = i.Buffer;
function a(e, t) {
for (var r in e) t[r] = e[r];
}
if (n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow) t.exports = i; else {
a(i, r);
r.Buffer = o;
}
function o(e, t, r) {
return n(e, t, r);
}
o.prototype = Object.create(n.prototype);
a(n, o);
o.from = function(e, t, r) {
if ("number" == typeof e) throw new TypeError("Argument must not be a number");
return n(e, t, r);
};
o.alloc = function(e, t, r) {
if ("number" != typeof e) throw new TypeError("Argument must be a number");
var i = n(e);
void 0 !== t ? "string" == typeof r ? i.fill(t, r) : i.fill(t) : i.fill(0);
return i;
};
o.allocUnsafe = function(e) {
if ("number" != typeof e) throw new TypeError("Argument must be a number");
return n(e);
};
o.allocUnsafeSlow = function(e) {
if ("number" != typeof e) throw new TypeError("Argument must be a number");
return i.SlowBuffer(e);
};
}, {
buffer: 66
} ],
64: [ function(e, t, r) {
"use strict";
var i = e("safe-buffer").Buffer, n = i.isEncoding || function(e) {
switch ((e = "" + e) && e.toLowerCase()) {
case "hex":
case "utf8":
case "utf-8":
case "ascii":
case "binary":
case "base64":
case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
case "raw":
return !0;

default:
return !1;
}
};
function a(e) {
if (!e) return "utf8";
for (var t; ;) switch (e) {
case "utf8":
case "utf-8":
return "utf8";

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return "utf16le";

case "latin1":
case "binary":
return "latin1";

case "base64":
case "ascii":
case "hex":
return e;

default:
if (t) return;
e = ("" + e).toLowerCase();
t = !0;
}
}
function o(e) {
var t = a(e);
if ("string" != typeof t && (i.isEncoding === n || !n(e))) throw new Error("Unknown encoding: " + e);
return t || e;
}
r.StringDecoder = s;
function s(e) {
this.encoding = o(e);
var t;
switch (this.encoding) {
case "utf16le":
this.text = d;
this.end = l;
t = 4;
break;

case "utf8":
this.fillLast = h;
t = 4;
break;

case "base64":
this.text = p;
this.end = b;
t = 3;
break;

default:
this.write = m;
this.end = g;
return;
}
this.lastNeed = 0;
this.lastTotal = 0;
this.lastChar = i.allocUnsafe(t);
}
s.prototype.write = function(e) {
if (0 === e.length) return "";
var t, r;
if (this.lastNeed) {
if (void 0 === (t = this.fillLast(e))) return "";
r = this.lastNeed;
this.lastNeed = 0;
} else r = 0;
return r < e.length ? t ? t + this.text(e, r) : this.text(e, r) : t || "";
};
s.prototype.end = function(e) {
var t = e && e.length ? this.write(e) : "";
return this.lastNeed ? t + "�" : t;
};
s.prototype.text = function(e, t) {
var r = c(this, e, t);
if (!this.lastNeed) return e.toString("utf8", t);
this.lastTotal = r;
var i = e.length - (r - this.lastNeed);
e.copy(this.lastChar, 0, i);
return e.toString("utf8", t, i);
};
s.prototype.fillLast = function(e) {
if (this.lastNeed <= e.length) {
e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
return this.lastChar.toString(this.encoding, 0, this.lastTotal);
}
e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length);
this.lastNeed -= e.length;
};
function f(e) {
return e <= 127 ? 0 : e >> 5 == 6 ? 2 : e >> 4 == 14 ? 3 : e >> 3 == 30 ? 4 : e >> 6 == 2 ? -1 : -2;
}
function c(e, t, r) {
var i = t.length - 1;
if (i < r) return 0;
var n = f(t[i]);
if (n >= 0) {
n > 0 && (e.lastNeed = n - 1);
return n;
}
if (--i < r || -2 === n) return 0;
if ((n = f(t[i])) >= 0) {
n > 0 && (e.lastNeed = n - 2);
return n;
}
if (--i < r || -2 === n) return 0;
if ((n = f(t[i])) >= 0) {
n > 0 && (2 === n ? n = 0 : e.lastNeed = n - 3);
return n;
}
return 0;
}
function u(e, t) {
if (128 != (192 & t[0])) {
e.lastNeed = 0;
return "�";
}
if (e.lastNeed > 1 && t.length > 1) {
if (128 != (192 & t[1])) {
e.lastNeed = 1;
return "�";
}
if (e.lastNeed > 2 && t.length > 2 && 128 != (192 & t[2])) {
e.lastNeed = 2;
return "�";
}
}
}
function h(e) {
var t = this.lastTotal - this.lastNeed, r = u(this, e);
if (void 0 !== r) return r;
if (this.lastNeed <= e.length) {
e.copy(this.lastChar, t, 0, this.lastNeed);
return this.lastChar.toString(this.encoding, 0, this.lastTotal);
}
e.copy(this.lastChar, t, 0, e.length);
this.lastNeed -= e.length;
}
function d(e, t) {
if ((e.length - t) % 2 == 0) {
var r = e.toString("utf16le", t);
if (r) {
var i = r.charCodeAt(r.length - 1);
if (i >= 55296 && i <= 56319) {
this.lastNeed = 2;
this.lastTotal = 4;
this.lastChar[0] = e[e.length - 2];
this.lastChar[1] = e[e.length - 1];
return r.slice(0, -1);
}
}
return r;
}
this.lastNeed = 1;
this.lastTotal = 2;
this.lastChar[0] = e[e.length - 1];
return e.toString("utf16le", t, e.length - 1);
}
function l(e) {
var t = e && e.length ? this.write(e) : "";
if (this.lastNeed) {
var r = this.lastTotal - this.lastNeed;
return t + this.lastChar.toString("utf16le", 0, r);
}
return t;
}
function p(e, t) {
var r = (e.length - t) % 3;
if (0 === r) return e.toString("base64", t);
this.lastNeed = 3 - r;
this.lastTotal = 3;
if (1 === r) this.lastChar[0] = e[e.length - 1]; else {
this.lastChar[0] = e[e.length - 2];
this.lastChar[1] = e[e.length - 1];
}
return e.toString("base64", t, e.length - r);
}
function b(e) {
var t = e && e.length ? this.write(e) : "";
return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t;
}
function m(e) {
return e.toString(this.encoding);
}
function g(e) {
return e && e.length ? this.write(e) : "";
}
}, {
"safe-buffer": 63
} ],
65: [ function(e, t) {
(function(e) {
t.exports = function(t, r) {
for (var i = Math.min(t.length, r.length), n = new e(i), a = 0; a < i; ++a) n[a] = t[a] ^ r[a];
return n;
};
}).call(this, e("buffer").Buffer);
}, {
buffer: 66
} ],
66: [ function(e, t, r) {
(function(t) {
"use strict";
var i = e("base64-js"), n = e("ieee754"), a = e("isarray");
r.Buffer = f;
r.SlowBuffer = function(e) {
+e != e && (e = 0);
return f.alloc(+e);
};
r.INSPECT_MAX_BYTES = 50;
f.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
try {
var e = new Uint8Array(1);
e.__proto__ = {
__proto__: Uint8Array.prototype,
foo: function() {
return 42;
}
};
return 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength;
} catch (e) {
return !1;
}
}();
r.kMaxLength = o();
function o() {
return f.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function s(e, t) {
if (o() < t) throw new RangeError("Invalid typed array length");
if (f.TYPED_ARRAY_SUPPORT) (e = new Uint8Array(t)).__proto__ = f.prototype; else {
null === e && (e = new f(t));
e.length = t;
}
return e;
}
function f(e, t, r) {
if (!(f.TYPED_ARRAY_SUPPORT || this instanceof f)) return new f(e, t, r);
if ("number" == typeof e) {
if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
return d(this, e);
}
return c(this, e, t, r);
}
f.poolSize = 8192;
f._augment = function(e) {
e.__proto__ = f.prototype;
return e;
};
function c(e, t, r, i) {
if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? b(e, t, r, i) : "string" == typeof t ? l(e, t, r) : m(e, t);
}
f.from = function(e, t, r) {
return c(null, e, t, r);
};
if (f.TYPED_ARRAY_SUPPORT) {
f.prototype.__proto__ = Uint8Array.prototype;
f.__proto__ = Uint8Array;
"undefined" != typeof Symbol && Symbol.species && f[Symbol.species] === f && Object.defineProperty(f, Symbol.species, {
value: null,
configurable: !0
});
}
function u(e) {
if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
if (e < 0) throw new RangeError('"size" argument must not be negative');
}
function h(e, t, r, i) {
u(t);
return t <= 0 ? s(e, t) : void 0 !== r ? "string" == typeof i ? s(e, t).fill(r, i) : s(e, t).fill(r) : s(e, t);
}
f.alloc = function(e, t, r) {
return h(null, e, t, r);
};
function d(e, t) {
u(t);
e = s(e, t < 0 ? 0 : 0 | g(t));
if (!f.TYPED_ARRAY_SUPPORT) for (var r = 0; r < t; ++r) e[r] = 0;
return e;
}
f.allocUnsafe = function(e) {
return d(null, e);
};
f.allocUnsafeSlow = function(e) {
return d(null, e);
};
function l(e, t, r) {
"string" == typeof r && "" !== r || (r = "utf8");
if (!f.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');
var i = 0 | y(t, r), n = (e = s(e, i)).write(t, r);
n !== i && (e = e.slice(0, n));
return e;
}
function p(e, t) {
var r = t.length < 0 ? 0 : 0 | g(t.length);
e = s(e, r);
for (var i = 0; i < r; i += 1) e[i] = 255 & t[i];
return e;
}
function b(e, t, r, i) {
t.byteLength;
if (r < 0 || t.byteLength < r) throw new RangeError("'offset' is out of bounds");
if (t.byteLength < r + (i || 0)) throw new RangeError("'length' is out of bounds");
t = void 0 === r && void 0 === i ? new Uint8Array(t) : void 0 === i ? new Uint8Array(t, r) : new Uint8Array(t, r, i);
f.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = f.prototype : e = p(e, t);
return e;
}
function m(e, t) {
if (f.isBuffer(t)) {
var r = 0 | g(t.length);
if (0 === (e = s(e, r)).length) return e;
t.copy(e, 0, 0, r);
return e;
}
if (t) {
if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || (i = t.length) != i ? s(e, 0) : p(e, t);
if ("Buffer" === t.type && a(t.data)) return p(e, t.data);
}
var i;
throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
}
function g(e) {
if (e >= o()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o().toString(16) + " bytes");
return 0 | e;
}
f.isBuffer = function(e) {
return !(null == e || !e._isBuffer);
};
f.compare = function(e, t) {
if (!f.isBuffer(e) || !f.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
if (e === t) return 0;
for (var r = e.length, i = t.length, n = 0, a = Math.min(r, i); n < a; ++n) if (e[n] !== t[n]) {
r = e[n];
i = t[n];
break;
}
return r < i ? -1 : i < r ? 1 : 0;
};
f.isEncoding = function(e) {
switch (String(e).toLowerCase()) {
case "hex":
case "utf8":
case "utf-8":
case "ascii":
case "latin1":
case "binary":
case "base64":
case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return !0;

default:
return !1;
}
};
f.concat = function(e, t) {
if (!a(e)) throw new TypeError('"list" argument must be an Array of Buffers');
if (0 === e.length) return f.alloc(0);
var r;
if (void 0 === t) {
t = 0;
for (r = 0; r < e.length; ++r) t += e[r].length;
}
var i = f.allocUnsafe(t), n = 0;
for (r = 0; r < e.length; ++r) {
var o = e[r];
if (!f.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
o.copy(i, n);
n += o.length;
}
return i;
};
function y(e, t) {
if (f.isBuffer(e)) return e.length;
if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
"string" != typeof e && (e = "" + e);
var r = e.length;
if (0 === r) return 0;
for (var i = !1; ;) switch (t) {
case "ascii":
case "latin1":
case "binary":
return r;

case "utf8":
case "utf-8":
case void 0:
return Y(e).length;

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return 2 * r;

case "hex":
return r >>> 1;

case "base64":
return X(e).length;

default:
if (i) return Y(e).length;
t = ("" + t).toLowerCase();
i = !0;
}
}
f.byteLength = y;
function v(e, t, r) {
var i = !1;
(void 0 === t || t < 0) && (t = 0);
if (t > this.length) return "";
(void 0 === r || r > this.length) && (r = this.length);
if (r <= 0) return "";
if ((r >>>= 0) <= (t >>>= 0)) return "";
e || (e = "utf8");
for (;;) switch (e) {
case "hex":
return O(this, t, r);

case "utf8":
case "utf-8":
return B(this, t, r);

case "ascii":
return P(this, t, r);

case "latin1":
case "binary":
return C(this, t, r);

case "base64":
return T(this, t, r);

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return L(this, t, r);

default:
if (i) throw new TypeError("Unknown encoding: " + e);
e = (e + "").toLowerCase();
i = !0;
}
}
f.prototype._isBuffer = !0;
function _(e, t, r) {
var i = e[t];
e[t] = e[r];
e[r] = i;
}
f.prototype.swap16 = function() {
var e = this.length;
if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
for (var t = 0; t < e; t += 2) _(this, t, t + 1);
return this;
};
f.prototype.swap32 = function() {
var e = this.length;
if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
for (var t = 0; t < e; t += 4) {
_(this, t, t + 3);
_(this, t + 1, t + 2);
}
return this;
};
f.prototype.swap64 = function() {
var e = this.length;
if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
for (var t = 0; t < e; t += 8) {
_(this, t, t + 7);
_(this, t + 1, t + 6);
_(this, t + 2, t + 5);
_(this, t + 3, t + 4);
}
return this;
};
f.prototype.toString = function() {
var e = 0 | this.length;
return 0 === e ? "" : 0 === arguments.length ? B(this, 0, e) : v.apply(this, arguments);
};
f.prototype.equals = function(e) {
if (!f.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
return this === e || 0 === f.compare(this, e);
};
f.prototype.inspect = function() {
var e = "", t = r.INSPECT_MAX_BYTES;
if (this.length > 0) {
e = this.toString("hex", 0, t).match(/.{2}/g).join(" ");
this.length > t && (e += " ... ");
}
return "<Buffer " + e + ">";
};
f.prototype.compare = function(e, t, r, i, n) {
if (!f.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
void 0 === t && (t = 0);
void 0 === r && (r = e ? e.length : 0);
void 0 === i && (i = 0);
void 0 === n && (n = this.length);
if (t < 0 || r > e.length || i < 0 || n > this.length) throw new RangeError("out of range index");
if (i >= n && t >= r) return 0;
if (i >= n) return -1;
if (t >= r) return 1;
if (this === e) return 0;
for (var a = (n >>>= 0) - (i >>>= 0), o = (r >>>= 0) - (t >>>= 0), s = Math.min(a, o), c = this.slice(i, n), u = e.slice(t, r), h = 0; h < s; ++h) if (c[h] !== u[h]) {
a = c[h];
o = u[h];
break;
}
return a < o ? -1 : o < a ? 1 : 0;
};
function w(e, t, r, i, n) {
if (0 === e.length) return -1;
if ("string" == typeof r) {
i = r;
r = 0;
} else r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648);
r = +r;
isNaN(r) && (r = n ? 0 : e.length - 1);
r < 0 && (r = e.length + r);
if (r >= e.length) {
if (n) return -1;
r = e.length - 1;
} else if (r < 0) {
if (!n) return -1;
r = 0;
}
"string" == typeof t && (t = f.from(t, i));
if (f.isBuffer(t)) return 0 === t.length ? -1 : M(e, t, r, i, n);
if ("number" == typeof t) {
t &= 255;
return f.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? n ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : M(e, [ t ], r, i, n);
}
throw new TypeError("val must be string, number or Buffer");
}
function M(e, t, r, i, n) {
var a, o = 1, s = e.length, f = t.length;
if (void 0 !== i && ("ucs2" === (i = String(i).toLowerCase()) || "ucs-2" === i || "utf16le" === i || "utf-16le" === i)) {
if (e.length < 2 || t.length < 2) return -1;
o = 2;
s /= 2;
f /= 2;
r /= 2;
}
function c(e, t) {
return 1 === o ? e[t] : e.readUInt16BE(t * o);
}
if (n) {
var u = -1;
for (a = r; a < s; a++) if (c(e, a) === c(t, -1 === u ? 0 : a - u)) {
-1 === u && (u = a);
if (a - u + 1 === f) return u * o;
} else {
-1 !== u && (a -= a - u);
u = -1;
}
} else {
r + f > s && (r = s - f);
for (a = r; a >= 0; a--) {
for (var h = !0, d = 0; d < f; d++) if (c(e, a + d) !== c(t, d)) {
h = !1;
break;
}
if (h) return a;
}
}
return -1;
}
f.prototype.includes = function(e, t, r) {
return -1 !== this.indexOf(e, t, r);
};
f.prototype.indexOf = function(e, t, r) {
return w(this, e, t, r, !0);
};
f.prototype.lastIndexOf = function(e, t, r) {
return w(this, e, t, r, !1);
};
function S(e, t, r, i) {
r = Number(r) || 0;
var n = e.length - r;
i ? (i = Number(i)) > n && (i = n) : i = n;
var a = t.length;
if (a % 2 != 0) throw new TypeError("Invalid hex string");
i > a / 2 && (i = a / 2);
for (var o = 0; o < i; ++o) {
var s = parseInt(t.substr(2 * o, 2), 16);
if (isNaN(s)) return o;
e[r + o] = s;
}
return o;
}
function E(e, t, r, i) {
return Z(Y(t, e.length - r), e, r, i);
}
function k(e, t, r, i) {
return Z(J(t), e, r, i);
}
function A(e, t, r, i) {
return k(e, t, r, i);
}
function x(e, t, r, i) {
return Z(X(t), e, r, i);
}
function R(e, t, r, i) {
return Z(G(t, e.length - r), e, r, i);
}
f.prototype.write = function(e, t, r, i) {
if (void 0 === t) {
i = "utf8";
r = this.length;
t = 0;
} else if (void 0 === r && "string" == typeof t) {
i = t;
r = this.length;
t = 0;
} else {
if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
t |= 0;
if (isFinite(r)) {
r |= 0;
void 0 === i && (i = "utf8");
} else {
i = r;
r = void 0;
}
}
var n = this.length - t;
(void 0 === r || r > n) && (r = n);
if (e.length > 0 && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
i || (i = "utf8");
for (var a = !1; ;) switch (i) {
case "hex":
return S(this, e, t, r);

case "utf8":
case "utf-8":
return E(this, e, t, r);

case "ascii":
return k(this, e, t, r);

case "latin1":
case "binary":
return A(this, e, t, r);

case "base64":
return x(this, e, t, r);

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return R(this, e, t, r);

default:
if (a) throw new TypeError("Unknown encoding: " + i);
i = ("" + i).toLowerCase();
a = !0;
}
};
f.prototype.toJSON = function() {
return {
type: "Buffer",
data: Array.prototype.slice.call(this._arr || this, 0)
};
};
function T(e, t, r) {
return 0 === t && r === e.length ? i.fromByteArray(e) : i.fromByteArray(e.slice(t, r));
}
function B(e, t, r) {
r = Math.min(e.length, r);
for (var i = [], n = t; n < r; ) {
var a = e[n], o = null, s = a > 239 ? 4 : a > 223 ? 3 : a > 191 ? 2 : 1;
if (n + s <= r) {
var f, c, u, h;
switch (s) {
case 1:
a < 128 && (o = a);
break;

case 2:
128 == (192 & (f = e[n + 1])) && (h = (31 & a) << 6 | 63 & f) > 127 && (o = h);
break;

case 3:
f = e[n + 1];
c = e[n + 2];
128 == (192 & f) && 128 == (192 & c) && (h = (15 & a) << 12 | (63 & f) << 6 | 63 & c) > 2047 && (h < 55296 || h > 57343) && (o = h);
break;

case 4:
f = e[n + 1];
c = e[n + 2];
u = e[n + 3];
128 == (192 & f) && 128 == (192 & c) && 128 == (192 & u) && (h = (15 & a) << 18 | (63 & f) << 12 | (63 & c) << 6 | 63 & u) > 65535 && h < 1114112 && (o = h);
}
}
if (null === o) {
o = 65533;
s = 1;
} else if (o > 65535) {
o -= 65536;
i.push(o >>> 10 & 1023 | 55296);
o = 56320 | 1023 & o;
}
i.push(o);
n += s;
}
return I(i);
}
var j = 4096;
function I(e) {
var t = e.length;
if (t <= j) return String.fromCharCode.apply(String, e);
for (var r = "", i = 0; i < t; ) r += String.fromCharCode.apply(String, e.slice(i, i += j));
return r;
}
function P(e, t, r) {
var i = "";
r = Math.min(e.length, r);
for (var n = t; n < r; ++n) i += String.fromCharCode(127 & e[n]);
return i;
}
function C(e, t, r) {
var i = "";
r = Math.min(e.length, r);
for (var n = t; n < r; ++n) i += String.fromCharCode(e[n]);
return i;
}
function O(e, t, r) {
var i, n = e.length;
(!t || t < 0) && (t = 0);
(!r || r < 0 || r > n) && (r = n);
for (var a = "", o = t; o < r; ++o) a += (i = e[o]) < 16 ? "0" + i.toString(16) : i.toString(16);
return a;
}
function L(e, t, r) {
for (var i = e.slice(t, r), n = "", a = 0; a < i.length; a += 2) n += String.fromCharCode(i[a] + 256 * i[a + 1]);
return n;
}
f.prototype.slice = function(e, t) {
var r, i = this.length;
(e = ~~e) < 0 ? (e += i) < 0 && (e = 0) : e > i && (e = i);
(t = void 0 === t ? i : ~~t) < 0 ? (t += i) < 0 && (t = 0) : t > i && (t = i);
t < e && (t = e);
if (f.TYPED_ARRAY_SUPPORT) (r = this.subarray(e, t)).__proto__ = f.prototype; else {
var n = t - e;
r = new f(n, void 0);
for (var a = 0; a < n; ++a) r[a] = this[a + e];
}
return r;
};
function N(e, t, r) {
if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
if (e + t > r) throw new RangeError("Trying to access beyond buffer length");
}
f.prototype.readUIntLE = function(e, t, r) {
e |= 0;
t |= 0;
r || N(e, t, this.length);
for (var i = this[e], n = 1, a = 0; ++a < t && (n *= 256); ) i += this[e + a] * n;
return i;
};
f.prototype.readUIntBE = function(e, t, r) {
e |= 0;
t |= 0;
r || N(e, t, this.length);
for (var i = this[e + --t], n = 1; t > 0 && (n *= 256); ) i += this[e + --t] * n;
return i;
};
f.prototype.readUInt8 = function(e, t) {
t || N(e, 1, this.length);
return this[e];
};
f.prototype.readUInt16LE = function(e, t) {
t || N(e, 2, this.length);
return this[e] | this[e + 1] << 8;
};
f.prototype.readUInt16BE = function(e, t) {
t || N(e, 2, this.length);
return this[e] << 8 | this[e + 1];
};
f.prototype.readUInt32LE = function(e, t) {
t || N(e, 4, this.length);
return (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];
};
f.prototype.readUInt32BE = function(e, t) {
t || N(e, 4, this.length);
return 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
};
f.prototype.readIntLE = function(e, t, r) {
e |= 0;
t |= 0;
r || N(e, t, this.length);
for (var i = this[e], n = 1, a = 0; ++a < t && (n *= 256); ) i += this[e + a] * n;
i >= (n *= 128) && (i -= Math.pow(2, 8 * t));
return i;
};
f.prototype.readIntBE = function(e, t, r) {
e |= 0;
t |= 0;
r || N(e, t, this.length);
for (var i = t, n = 1, a = this[e + --i]; i > 0 && (n *= 256); ) a += this[e + --i] * n;
a >= (n *= 128) && (a -= Math.pow(2, 8 * t));
return a;
};
f.prototype.readInt8 = function(e, t) {
t || N(e, 1, this.length);
return 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
};
f.prototype.readInt16LE = function(e, t) {
t || N(e, 2, this.length);
var r = this[e] | this[e + 1] << 8;
return 32768 & r ? 4294901760 | r : r;
};
f.prototype.readInt16BE = function(e, t) {
t || N(e, 2, this.length);
var r = this[e + 1] | this[e] << 8;
return 32768 & r ? 4294901760 | r : r;
};
f.prototype.readInt32LE = function(e, t) {
t || N(e, 4, this.length);
return this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
};
f.prototype.readInt32BE = function(e, t) {
t || N(e, 4, this.length);
return this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
};
f.prototype.readFloatLE = function(e, t) {
t || N(e, 4, this.length);
return n.read(this, e, !0, 23, 4);
};
f.prototype.readFloatBE = function(e, t) {
t || N(e, 4, this.length);
return n.read(this, e, !1, 23, 4);
};
f.prototype.readDoubleLE = function(e, t) {
t || N(e, 8, this.length);
return n.read(this, e, !0, 52, 8);
};
f.prototype.readDoubleBE = function(e, t) {
t || N(e, 8, this.length);
return n.read(this, e, !1, 52, 8);
};
function D(e, t, r, i, n, a) {
if (!f.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
if (t > n || t < a) throw new RangeError('"value" argument is out of bounds');
if (r + i > e.length) throw new RangeError("Index out of range");
}
f.prototype.writeUIntLE = function(e, t, r, i) {
e = +e;
t |= 0;
r |= 0;
i || D(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
var n = 1, a = 0;
this[t] = 255 & e;
for (;++a < r && (n *= 256); ) this[t + a] = e / n & 255;
return t + r;
};
f.prototype.writeUIntBE = function(e, t, r, i) {
e = +e;
t |= 0;
r |= 0;
i || D(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
var n = r - 1, a = 1;
this[t + n] = 255 & e;
for (;--n >= 0 && (a *= 256); ) this[t + n] = e / a & 255;
return t + r;
};
f.prototype.writeUInt8 = function(e, t, r) {
e = +e;
t |= 0;
r || D(this, e, t, 1, 255, 0);
f.TYPED_ARRAY_SUPPORT || (e = Math.floor(e));
this[t] = 255 & e;
return t + 1;
};
function U(e, t, r, i) {
t < 0 && (t = 65535 + t + 1);
for (var n = 0, a = Math.min(e.length - r, 2); n < a; ++n) e[r + n] = (t & 255 << 8 * (i ? n : 1 - n)) >>> 8 * (i ? n : 1 - n);
}
f.prototype.writeUInt16LE = function(e, t, r) {
e = +e;
t |= 0;
r || D(this, e, t, 2, 65535, 0);
if (f.TYPED_ARRAY_SUPPORT) {
this[t] = 255 & e;
this[t + 1] = e >>> 8;
} else U(this, e, t, !0);
return t + 2;
};
f.prototype.writeUInt16BE = function(e, t, r) {
e = +e;
t |= 0;
r || D(this, e, t, 2, 65535, 0);
if (f.TYPED_ARRAY_SUPPORT) {
this[t] = e >>> 8;
this[t + 1] = 255 & e;
} else U(this, e, t, !1);
return t + 2;
};
function q(e, t, r, i) {
t < 0 && (t = 4294967295 + t + 1);
for (var n = 0, a = Math.min(e.length - r, 4); n < a; ++n) e[r + n] = t >>> 8 * (i ? n : 3 - n) & 255;
}
f.prototype.writeUInt32LE = function(e, t, r) {
e = +e;
t |= 0;
r || D(this, e, t, 4, 4294967295, 0);
if (f.TYPED_ARRAY_SUPPORT) {
this[t + 3] = e >>> 24;
this[t + 2] = e >>> 16;
this[t + 1] = e >>> 8;
this[t] = 255 & e;
} else q(this, e, t, !0);
return t + 4;
};
f.prototype.writeUInt32BE = function(e, t, r) {
e = +e;
t |= 0;
r || D(this, e, t, 4, 4294967295, 0);
if (f.TYPED_ARRAY_SUPPORT) {
this[t] = e >>> 24;
this[t + 1] = e >>> 16;
this[t + 2] = e >>> 8;
this[t + 3] = 255 & e;
} else q(this, e, t, !1);
return t + 4;
};
f.prototype.writeIntLE = function(e, t, r, i) {
e = +e;
t |= 0;
if (!i) {
var n = Math.pow(2, 8 * r - 1);
D(this, e, t, r, n - 1, -n);
}
var a = 0, o = 1, s = 0;
this[t] = 255 & e;
for (;++a < r && (o *= 256); ) {
e < 0 && 0 === s && 0 !== this[t + a - 1] && (s = 1);
this[t + a] = (e / o >> 0) - s & 255;
}
return t + r;
};
f.prototype.writeIntBE = function(e, t, r, i) {
e = +e;
t |= 0;
if (!i) {
var n = Math.pow(2, 8 * r - 1);
D(this, e, t, r, n - 1, -n);
}
var a = r - 1, o = 1, s = 0;
this[t + a] = 255 & e;
for (;--a >= 0 && (o *= 256); ) {
e < 0 && 0 === s && 0 !== this[t + a + 1] && (s = 1);
this[t + a] = (e / o >> 0) - s & 255;
}
return t + r;
};
f.prototype.writeInt8 = function(e, t, r) {
e = +e;
t |= 0;
r || D(this, e, t, 1, 127, -128);
f.TYPED_ARRAY_SUPPORT || (e = Math.floor(e));
e < 0 && (e = 255 + e + 1);
this[t] = 255 & e;
return t + 1;
};
f.prototype.writeInt16LE = function(e, t, r) {
e = +e;
t |= 0;
r || D(this, e, t, 2, 32767, -32768);
if (f.TYPED_ARRAY_SUPPORT) {
this[t] = 255 & e;
this[t + 1] = e >>> 8;
} else U(this, e, t, !0);
return t + 2;
};
f.prototype.writeInt16BE = function(e, t, r) {
e = +e;
t |= 0;
r || D(this, e, t, 2, 32767, -32768);
if (f.TYPED_ARRAY_SUPPORT) {
this[t] = e >>> 8;
this[t + 1] = 255 & e;
} else U(this, e, t, !1);
return t + 2;
};
f.prototype.writeInt32LE = function(e, t, r) {
e = +e;
t |= 0;
r || D(this, e, t, 4, 2147483647, -2147483648);
if (f.TYPED_ARRAY_SUPPORT) {
this[t] = 255 & e;
this[t + 1] = e >>> 8;
this[t + 2] = e >>> 16;
this[t + 3] = e >>> 24;
} else q(this, e, t, !0);
return t + 4;
};
f.prototype.writeInt32BE = function(e, t, r) {
e = +e;
t |= 0;
r || D(this, e, t, 4, 2147483647, -2147483648);
e < 0 && (e = 4294967295 + e + 1);
if (f.TYPED_ARRAY_SUPPORT) {
this[t] = e >>> 24;
this[t + 1] = e >>> 16;
this[t + 2] = e >>> 8;
this[t + 3] = 255 & e;
} else q(this, e, t, !1);
return t + 4;
};
function z(e, t, r, i) {
if (r + i > e.length) throw new RangeError("Index out of range");
if (r < 0) throw new RangeError("Index out of range");
}
function F(e, t, r, i, a) {
a || z(e, 0, r, 4);
n.write(e, t, r, i, 23, 4);
return r + 4;
}
f.prototype.writeFloatLE = function(e, t, r) {
return F(this, e, t, !0, r);
};
f.prototype.writeFloatBE = function(e, t, r) {
return F(this, e, t, !1, r);
};
function K(e, t, r, i, a) {
a || z(e, 0, r, 8);
n.write(e, t, r, i, 52, 8);
return r + 8;
}
f.prototype.writeDoubleLE = function(e, t, r) {
return K(this, e, t, !0, r);
};
f.prototype.writeDoubleBE = function(e, t, r) {
return K(this, e, t, !1, r);
};
f.prototype.copy = function(e, t, r, i) {
r || (r = 0);
i || 0 === i || (i = this.length);
t >= e.length && (t = e.length);
t || (t = 0);
i > 0 && i < r && (i = r);
if (i === r) return 0;
if (0 === e.length || 0 === this.length) return 0;
if (t < 0) throw new RangeError("targetStart out of bounds");
if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
if (i < 0) throw new RangeError("sourceEnd out of bounds");
i > this.length && (i = this.length);
e.length - t < i - r && (i = e.length - t + r);
var n, a = i - r;
if (this === e && r < t && t < i) for (n = a - 1; n >= 0; --n) e[n + t] = this[n + r]; else if (a < 1e3 || !f.TYPED_ARRAY_SUPPORT) for (n = 0; n < a; ++n) e[n + t] = this[n + r]; else Uint8Array.prototype.set.call(e, this.subarray(r, r + a), t);
return a;
};
f.prototype.fill = function(e, t, r, i) {
if ("string" == typeof e) {
if ("string" == typeof t) {
i = t;
t = 0;
r = this.length;
} else if ("string" == typeof r) {
i = r;
r = this.length;
}
if (1 === e.length) {
var n = e.charCodeAt(0);
n < 256 && (e = n);
}
if (void 0 !== i && "string" != typeof i) throw new TypeError("encoding must be a string");
if ("string" == typeof i && !f.isEncoding(i)) throw new TypeError("Unknown encoding: " + i);
} else "number" == typeof e && (e &= 255);
if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
if (r <= t) return this;
t >>>= 0;
r = void 0 === r ? this.length : r >>> 0;
e || (e = 0);
var a;
if ("number" == typeof e) for (a = t; a < r; ++a) this[a] = e; else {
var o = f.isBuffer(e) ? e : Y(new f(e, i).toString()), s = o.length;
for (a = 0; a < r - t; ++a) this[a + t] = o[a % s];
}
return this;
};
var H = /[^+\/0-9A-Za-z-_]/g;
function W(e) {
if ((e = V(e).replace(H, "")).length < 2) return "";
for (;e.length % 4 != 0; ) e += "=";
return e;
}
function V(e) {
return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
}
function Y(e, t) {
t = t || Infinity;
for (var r, i = e.length, n = null, a = [], o = 0; o < i; ++o) {
if ((r = e.charCodeAt(o)) > 55295 && r < 57344) {
if (!n) {
if (r > 56319) {
(t -= 3) > -1 && a.push(239, 191, 189);
continue;
}
if (o + 1 === i) {
(t -= 3) > -1 && a.push(239, 191, 189);
continue;
}
n = r;
continue;
}
if (r < 56320) {
(t -= 3) > -1 && a.push(239, 191, 189);
n = r;
continue;
}
r = 65536 + (n - 55296 << 10 | r - 56320);
} else n && (t -= 3) > -1 && a.push(239, 191, 189);
n = null;
if (r < 128) {
if ((t -= 1) < 0) break;
a.push(r);
} else if (r < 2048) {
if ((t -= 2) < 0) break;
a.push(r >> 6 | 192, 63 & r | 128);
} else if (r < 65536) {
if ((t -= 3) < 0) break;
a.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128);
} else {
if (!(r < 1114112)) throw new Error("Invalid code point");
if ((t -= 4) < 0) break;
a.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128);
}
}
return a;
}
function J(e) {
for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
return t;
}
function G(e, t) {
for (var r, i, n, a = [], o = 0; o < e.length && !((t -= 2) < 0); ++o) {
i = (r = e.charCodeAt(o)) >> 8;
n = r % 256;
a.push(n);
a.push(i);
}
return a;
}
function X(e) {
return i.toByteArray(W(e));
}
function Z(e, t, r, i) {
for (var n = 0; n < i && !(n + r >= t.length || n >= e.length); ++n) t[n + r] = e[n];
return n;
}
}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"base64-js": 16,
ieee754: 138,
isarray: 67
} ],
67: [ function(e, t) {
var r = {}.toString;
t.exports = Array.isArray || function(e) {
return "[object Array]" == r.call(e);
};
}, {} ],
68: [ function(e, t) {
var r = e("safe-buffer").Buffer, i = e("stream").Transform, n = e("string_decoder").StringDecoder;
function a(e) {
i.call(this);
this.hashMode = "string" == typeof e;
this.hashMode ? this[e] = this._finalOrDigest : this.final = this._finalOrDigest;
if (this._final) {
this.__final = this._final;
this._final = null;
}
this._decoder = null;
this._encoding = null;
}
e("inherits")(a, i);
a.prototype.update = function(e, t, i) {
"string" == typeof e && (e = r.from(e, t));
var n = this._update(e);
if (this.hashMode) return this;
i && (n = this._toString(n, i));
return n;
};
a.prototype.setAutoPadding = function() {};
a.prototype.getAuthTag = function() {
throw new Error("trying to get auth tag in unsupported state");
};
a.prototype.setAuthTag = function() {
throw new Error("trying to set auth tag in unsupported state");
};
a.prototype.setAAD = function() {
throw new Error("trying to set aad in unsupported state");
};
a.prototype._transform = function(e, t, r) {
var i;
try {
this.hashMode ? this._update(e) : this.push(this._update(e));
} catch (e) {
i = e;
} finally {
r(i);
}
};
a.prototype._flush = function(e) {
var t;
try {
this.push(this.__final());
} catch (e) {
t = e;
}
e(t);
};
a.prototype._finalOrDigest = function(e) {
var t = this.__final() || r.alloc(0);
e && (t = this._toString(t, e, !0));
return t;
};
a.prototype._toString = function(e, t, r) {
if (!this._decoder) {
this._decoder = new n(t);
this._encoding = t;
}
if (this._encoding !== t) throw new Error("can't switch encodings");
var i = this._decoder.write(e);
r && (i += this._decoder.end());
return i;
};
t.exports = a;
}, {
inherits: 140,
"safe-buffer": 185,
stream: 194,
string_decoder: 195
} ],
69: [ function(e, t, r) {
(function(e) {
r.isArray = function(e) {
return Array.isArray ? Array.isArray(e) : "[object Array]" === t(e);
};
r.isBoolean = function(e) {
return "boolean" == typeof e;
};
r.isNull = function(e) {
return null === e;
};
r.isNullOrUndefined = function(e) {
return null == e;
};
r.isNumber = function(e) {
return "number" == typeof e;
};
r.isString = function(e) {
return "string" == typeof e;
};
r.isSymbol = function(e) {
return "symbol" == typeof e;
};
r.isUndefined = function(e) {
return void 0 === e;
};
r.isRegExp = function(e) {
return "[object RegExp]" === t(e);
};
r.isObject = function(e) {
return "object" == typeof e && null !== e;
};
r.isDate = function(e) {
return "[object Date]" === t(e);
};
r.isError = function(e) {
return "[object Error]" === t(e) || e instanceof Error;
};
r.isFunction = function(e) {
return "function" == typeof e;
};
r.isPrimitive = function(e) {
return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || "undefined" == typeof e;
};
r.isBuffer = e.isBuffer;
function t(e) {
return Object.prototype.toString.call(e);
}
}).call(this, {
isBuffer: e("../../is-buffer/index.js")
});
}, {
"../../is-buffer/index.js": 141
} ],
70: [ function(e, t) {
(function(r) {
var i = e("elliptic"), n = e("bn.js");
t.exports = function(e) {
return new o(e);
};
var a = {
secp256k1: {
name: "secp256k1",
byteLength: 32
},
secp224r1: {
name: "p224",
byteLength: 28
},
prime256v1: {
name: "p256",
byteLength: 32
},
prime192v1: {
name: "p192",
byteLength: 24
},
ed25519: {
name: "ed25519",
byteLength: 32
},
secp384r1: {
name: "p384",
byteLength: 48
},
secp521r1: {
name: "p521",
byteLength: 66
}
};
a.p224 = a.secp224r1;
a.p256 = a.secp256r1 = a.prime256v1;
a.p192 = a.secp192r1 = a.prime192v1;
a.p384 = a.secp384r1;
a.p521 = a.secp521r1;
function o(e) {
this.curveType = a[e];
this.curveType || (this.curveType = {
name: e
});
this.curve = new i.ec(this.curveType.name);
this.keys = void 0;
}
o.prototype.generateKeys = function(e, t) {
this.keys = this.curve.genKeyPair();
return this.getPublicKey(e, t);
};
o.prototype.computeSecret = function(e, t, i) {
t = t || "utf8";
r.isBuffer(e) || (e = new r(e, t));
return s(this.curve.keyFromPublic(e).getPublic().mul(this.keys.getPrivate()).getX(), i, this.curveType.byteLength);
};
o.prototype.getPublicKey = function(e, t) {
var r = this.keys.getPublic("compressed" === t, !0);
"hybrid" === t && (r[r.length - 1] % 2 ? r[0] = 7 : r[0] = 6);
return s(r, e);
};
o.prototype.getPrivateKey = function(e) {
return s(this.keys.getPrivate(), e);
};
o.prototype.setPublicKey = function(e, t) {
t = t || "utf8";
r.isBuffer(e) || (e = new r(e, t));
this.keys._importPublic(e);
return this;
};
o.prototype.setPrivateKey = function(e, t) {
t = t || "utf8";
r.isBuffer(e) || (e = new r(e, t));
var i = new n(e);
i = i.toString(16);
this.keys = this.curve.genKeyPair();
this.keys._importPrivate(i);
return this;
};
function s(e, t, i) {
Array.isArray(e) || (e = e.toArray());
var n = new r(e);
if (i && n.length < i) {
var a = new r(i - n.length);
a.fill(0);
n = r.concat([ a, n ]);
}
return t ? n.toString(t) : n;
}
}).call(this, e("buffer").Buffer);
}, {
"bn.js": 71,
buffer: 66,
elliptic: 88
} ],
71: [ function(e, t, r) {
arguments[4][15][0].apply(r, arguments);
}, {
buffer: 19,
dup: 15
} ],
72: [ function(e, t) {
"use strict";
var r = e("inherits"), i = e("md5.js"), n = e("ripemd160"), a = e("sha.js"), o = e("cipher-base");
function s(e) {
o.call(this, "digest");
this._hash = e;
}
r(s, o);
s.prototype._update = function(e) {
this._hash.update(e);
};
s.prototype._final = function() {
return this._hash.digest();
};
t.exports = function(e) {
return "md5" === (e = e.toLowerCase()) ? new i() : "rmd160" === e || "ripemd160" === e ? new n() : new s(a(e));
};
}, {
"cipher-base": 68,
inherits: 140,
"md5.js": 142,
ripemd160: 184,
"sha.js": 187
} ],
73: [ function(e, t) {
var r = e("md5.js");
t.exports = function(e) {
return new r().update(e).digest();
};
}, {
"md5.js": 142
} ],
74: [ function(e, t) {
"use strict";
var r = e("inherits"), i = e("./legacy"), n = e("cipher-base"), a = e("safe-buffer").Buffer, o = e("create-hash/md5"), s = e("ripemd160"), f = e("sha.js"), c = a.alloc(128);
function u(e, t) {
n.call(this, "digest");
"string" == typeof t && (t = a.from(t));
var r = "sha512" === e || "sha384" === e ? 128 : 64;
this._alg = e;
this._key = t;
t.length > r ? t = ("rmd160" === e ? new s() : f(e)).update(t).digest() : t.length < r && (t = a.concat([ t, c ], r));
for (var i = this._ipad = a.allocUnsafe(r), o = this._opad = a.allocUnsafe(r), u = 0; u < r; u++) {
i[u] = 54 ^ t[u];
o[u] = 92 ^ t[u];
}
this._hash = "rmd160" === e ? new s() : f(e);
this._hash.update(i);
}
r(u, n);
u.prototype._update = function(e) {
this._hash.update(e);
};
u.prototype._final = function() {
var e = this._hash.digest();
return ("rmd160" === this._alg ? new s() : f(this._alg)).update(this._opad).update(e).digest();
};
t.exports = function(e, t) {
return "rmd160" === (e = e.toLowerCase()) || "ripemd160" === e ? new u("rmd160", t) : "md5" === e ? new i(o, t) : new u(e, t);
};
}, {
"./legacy": 75,
"cipher-base": 68,
"create-hash/md5": 73,
inherits: 140,
ripemd160: 184,
"safe-buffer": 185,
"sha.js": 187
} ],
75: [ function(e, t) {
"use strict";
var r = e("inherits"), i = e("safe-buffer").Buffer, n = e("cipher-base"), a = i.alloc(128), o = 64;
function s(e, t) {
n.call(this, "digest");
"string" == typeof t && (t = i.from(t));
this._alg = e;
this._key = t;
t.length > o ? t = e(t) : t.length < o && (t = i.concat([ t, a ], o));
for (var r = this._ipad = i.allocUnsafe(o), s = this._opad = i.allocUnsafe(o), f = 0; f < o; f++) {
r[f] = 54 ^ t[f];
s[f] = 92 ^ t[f];
}
this._hash = [ r ];
}
r(s, n);
s.prototype._update = function(e) {
this._hash.push(e);
};
s.prototype._final = function() {
var e = this._alg(i.concat(this._hash));
return this._alg(i.concat([ this._opad, e ]));
};
t.exports = s;
}, {
"cipher-base": 68,
inherits: 140,
"safe-buffer": 185
} ],
76: [ function(e, t, r) {
"use strict";
r.randomBytes = r.rng = r.pseudoRandomBytes = r.prng = e("randombytes");
r.createHash = r.Hash = e("create-hash");
r.createHmac = r.Hmac = e("create-hmac");
var i = e("browserify-sign/algos"), n = Object.keys(i), a = [ "sha1", "sha224", "sha256", "sha384", "sha512", "md5", "rmd160" ].concat(n);
r.getHashes = function() {
return a;
};
var o = e("pbkdf2");
r.pbkdf2 = o.pbkdf2;
r.pbkdf2Sync = o.pbkdf2Sync;
var s = e("browserify-cipher");
r.Cipher = s.Cipher;
r.createCipher = s.createCipher;
r.Cipheriv = s.Cipheriv;
r.createCipheriv = s.createCipheriv;
r.Decipher = s.Decipher;
r.createDecipher = s.createDecipher;
r.Decipheriv = s.Decipheriv;
r.createDecipheriv = s.createDecipheriv;
r.getCiphers = s.getCiphers;
r.listCiphers = s.listCiphers;
var f = e("diffie-hellman");
r.DiffieHellmanGroup = f.DiffieHellmanGroup;
r.createDiffieHellmanGroup = f.createDiffieHellmanGroup;
r.getDiffieHellman = f.getDiffieHellman;
r.createDiffieHellman = f.createDiffieHellman;
r.DiffieHellman = f.DiffieHellman;
var c = e("browserify-sign");
r.createSign = c.createSign;
r.Sign = c.Sign;
r.createVerify = c.createVerify;
r.Verify = c.Verify;
r.createECDH = e("create-ecdh");
var u = e("public-encrypt");
r.publicEncrypt = u.publicEncrypt;
r.privateEncrypt = u.privateEncrypt;
r.publicDecrypt = u.publicDecrypt;
r.privateDecrypt = u.privateDecrypt;
var h = e("randomfill");
r.randomFill = h.randomFill;
r.randomFillSync = h.randomFillSync;
r.createCredentials = function() {
throw new Error([ "sorry, createCredentials is not implemented yet", "we accept pull requests", "https://github.com/crypto-browserify/crypto-browserify" ].join("\n"));
};
r.constants = {
DH_CHECK_P_NOT_SAFE_PRIME: 2,
DH_CHECK_P_NOT_PRIME: 1,
DH_UNABLE_TO_CHECK_GENERATOR: 4,
DH_NOT_SUITABLE_GENERATOR: 8,
NPN_ENABLED: 1,
ALPN_ENABLED: 1,
RSA_PKCS1_PADDING: 1,
RSA_SSLV23_PADDING: 2,
RSA_NO_PADDING: 3,
RSA_PKCS1_OAEP_PADDING: 4,
RSA_X931_PADDING: 5,
RSA_PKCS1_PSS_PADDING: 6,
POINT_CONVERSION_COMPRESSED: 2,
POINT_CONVERSION_UNCOMPRESSED: 4,
POINT_CONVERSION_HYBRID: 6
};
}, {
"browserify-cipher": 37,
"browserify-sign": 45,
"browserify-sign/algos": 42,
"create-ecdh": 70,
"create-hash": 72,
"create-hmac": 74,
"diffie-hellman": 83,
pbkdf2: 152,
"public-encrypt": 160,
randombytes: 167,
randomfill: 168
} ],
77: [ function(e, t, r) {
"use strict";
r.utils = e("./des/utils");
r.Cipher = e("./des/cipher");
r.DES = e("./des/des");
r.CBC = e("./des/cbc");
r.EDE = e("./des/ede");
}, {
"./des/cbc": 78,
"./des/cipher": 79,
"./des/des": 80,
"./des/ede": 81,
"./des/utils": 82
} ],
78: [ function(e, t, r) {
"use strict";
var i = e("minimalistic-assert"), n = e("inherits"), a = {};
function o(e) {
i.equal(e.length, 8, "Invalid IV length");
this.iv = new Array(8);
for (var t = 0; t < this.iv.length; t++) this.iv[t] = e[t];
}
r.instantiate = function(e) {
function t(t) {
e.call(this, t);
this._cbcInit();
}
n(t, e);
for (var r = Object.keys(a), i = 0; i < r.length; i++) {
var o = r[i];
t.prototype[o] = a[o];
}
t.create = function(e) {
return new t(e);
};
return t;
};
a._cbcInit = function() {
var e = new o(this.options.iv);
this._cbcState = e;
};
a._update = function(e, t, r, i) {
var n = this._cbcState, a = this.constructor.super_.prototype, o = n.iv;
if ("encrypt" === this.type) {
for (var s = 0; s < this.blockSize; s++) o[s] ^= e[t + s];
a._update.call(this, o, 0, r, i);
for (s = 0; s < this.blockSize; s++) o[s] = r[i + s];
} else {
a._update.call(this, e, t, r, i);
for (s = 0; s < this.blockSize; s++) r[i + s] ^= o[s];
for (s = 0; s < this.blockSize; s++) o[s] = e[t + s];
}
};
}, {
inherits: 140,
"minimalistic-assert": 145
} ],
79: [ function(e, t) {
"use strict";
var r = e("minimalistic-assert");
function i(e) {
this.options = e;
this.type = this.options.type;
this.blockSize = 8;
this._init();
this.buffer = new Array(this.blockSize);
this.bufferOff = 0;
}
t.exports = i;
i.prototype._init = function() {};
i.prototype.update = function(e) {
return 0 === e.length ? [] : "decrypt" === this.type ? this._updateDecrypt(e) : this._updateEncrypt(e);
};
i.prototype._buffer = function(e, t) {
for (var r = Math.min(this.buffer.length - this.bufferOff, e.length - t), i = 0; i < r; i++) this.buffer[this.bufferOff + i] = e[t + i];
this.bufferOff += r;
return r;
};
i.prototype._flushBuffer = function(e, t) {
this._update(this.buffer, 0, e, t);
this.bufferOff = 0;
return this.blockSize;
};
i.prototype._updateEncrypt = function(e) {
var t = 0, r = 0, i = (this.bufferOff + e.length) / this.blockSize | 0, n = new Array(i * this.blockSize);
if (0 !== this.bufferOff) {
t += this._buffer(e, t);
this.bufferOff === this.buffer.length && (r += this._flushBuffer(n, r));
}
for (var a = e.length - (e.length - t) % this.blockSize; t < a; t += this.blockSize) {
this._update(e, t, n, r);
r += this.blockSize;
}
for (;t < e.length; t++, this.bufferOff++) this.buffer[this.bufferOff] = e[t];
return n;
};
i.prototype._updateDecrypt = function(e) {
for (var t = 0, r = 0, i = Math.ceil((this.bufferOff + e.length) / this.blockSize) - 1, n = new Array(i * this.blockSize); i > 0; i--) {
t += this._buffer(e, t);
r += this._flushBuffer(n, r);
}
t += this._buffer(e, t);
return n;
};
i.prototype.final = function(e) {
var t, r;
e && (t = this.update(e));
r = "encrypt" === this.type ? this._finalEncrypt() : this._finalDecrypt();
return t ? t.concat(r) : r;
};
i.prototype._pad = function(e, t) {
if (0 === t) return !1;
for (;t < e.length; ) e[t++] = 0;
return !0;
};
i.prototype._finalEncrypt = function() {
if (!this._pad(this.buffer, this.bufferOff)) return [];
var e = new Array(this.blockSize);
this._update(this.buffer, 0, e, 0);
return e;
};
i.prototype._unpad = function(e) {
return e;
};
i.prototype._finalDecrypt = function() {
r.equal(this.bufferOff, this.blockSize, "Not enough data to decrypt");
var e = new Array(this.blockSize);
this._flushBuffer(e, 0);
return this._unpad(e);
};
}, {
"minimalistic-assert": 145
} ],
80: [ function(e, t) {
"use strict";
var r = e("minimalistic-assert"), i = e("inherits"), n = e("./utils"), a = e("./cipher");
function o() {
this.tmp = new Array(2);
this.keys = null;
}
function s(e) {
a.call(this, e);
var t = new o();
this._desState = t;
this.deriveKeys(t, e.key);
}
i(s, a);
t.exports = s;
s.create = function(e) {
return new s(e);
};
var f = [ 1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1 ];
s.prototype.deriveKeys = function(e, t) {
e.keys = new Array(32);
r.equal(t.length, this.blockSize, "Invalid key length");
var i = n.readUInt32BE(t, 0), a = n.readUInt32BE(t, 4);
n.pc1(i, a, e.tmp, 0);
i = e.tmp[0];
a = e.tmp[1];
for (var o = 0; o < e.keys.length; o += 2) {
var s = f[o >>> 1];
i = n.r28shl(i, s);
a = n.r28shl(a, s);
n.pc2(i, a, e.keys, o);
}
};
s.prototype._update = function(e, t, r, i) {
var a = this._desState, o = n.readUInt32BE(e, t), s = n.readUInt32BE(e, t + 4);
n.ip(o, s, a.tmp, 0);
o = a.tmp[0];
s = a.tmp[1];
"encrypt" === this.type ? this._encrypt(a, o, s, a.tmp, 0) : this._decrypt(a, o, s, a.tmp, 0);
o = a.tmp[0];
s = a.tmp[1];
n.writeUInt32BE(r, o, i);
n.writeUInt32BE(r, s, i + 4);
};
s.prototype._pad = function(e, t) {
for (var r = e.length - t, i = t; i < e.length; i++) e[i] = r;
return !0;
};
s.prototype._unpad = function(e) {
for (var t = e[e.length - 1], i = e.length - t; i < e.length; i++) r.equal(e[i], t);
return e.slice(0, e.length - t);
};
s.prototype._encrypt = function(e, t, r, i, a) {
for (var o = t, s = r, f = 0; f < e.keys.length; f += 2) {
var c = e.keys[f], u = e.keys[f + 1];
n.expand(s, e.tmp, 0);
c ^= e.tmp[0];
u ^= e.tmp[1];
var h = n.substitute(c, u), d = s;
s = (o ^ n.permute(h)) >>> 0;
o = d;
}
n.rip(s, o, i, a);
};
s.prototype._decrypt = function(e, t, r, i, a) {
for (var o = r, s = t, f = e.keys.length - 2; f >= 0; f -= 2) {
var c = e.keys[f], u = e.keys[f + 1];
n.expand(o, e.tmp, 0);
c ^= e.tmp[0];
u ^= e.tmp[1];
var h = n.substitute(c, u), d = o;
o = (s ^ n.permute(h)) >>> 0;
s = d;
}
n.rip(o, s, i, a);
};
}, {
"./cipher": 79,
"./utils": 82,
inherits: 140,
"minimalistic-assert": 145
} ],
81: [ function(e, t) {
"use strict";
var r = e("minimalistic-assert"), i = e("inherits"), n = e("./cipher"), a = e("./des");
function o(e, t) {
r.equal(t.length, 24, "Invalid key length");
var i = t.slice(0, 8), n = t.slice(8, 16), o = t.slice(16, 24);
this.ciphers = "encrypt" === e ? [ a.create({
type: "encrypt",
key: i
}), a.create({
type: "decrypt",
key: n
}), a.create({
type: "encrypt",
key: o
}) ] : [ a.create({
type: "decrypt",
key: o
}), a.create({
type: "encrypt",
key: n
}), a.create({
type: "decrypt",
key: i
}) ];
}
function s(e) {
n.call(this, e);
var t = new o(this.type, this.options.key);
this._edeState = t;
}
i(s, n);
t.exports = s;
s.create = function(e) {
return new s(e);
};
s.prototype._update = function(e, t, r, i) {
var n = this._edeState;
n.ciphers[0]._update(e, t, r, i);
n.ciphers[1]._update(r, i, r, i);
n.ciphers[2]._update(r, i, r, i);
};
s.prototype._pad = a.prototype._pad;
s.prototype._unpad = a.prototype._unpad;
}, {
"./cipher": 79,
"./des": 80,
inherits: 140,
"minimalistic-assert": 145
} ],
82: [ function(e, t, r) {
"use strict";
r.readUInt32BE = function(e, t) {
return (e[0 + t] << 24 | e[1 + t] << 16 | e[2 + t] << 8 | e[3 + t]) >>> 0;
};
r.writeUInt32BE = function(e, t, r) {
e[0 + r] = t >>> 24;
e[1 + r] = t >>> 16 & 255;
e[2 + r] = t >>> 8 & 255;
e[3 + r] = 255 & t;
};
r.ip = function(e, t, r, i) {
for (var n = 0, a = 0, o = 6; o >= 0; o -= 2) {
for (var s = 0; s <= 24; s += 8) {
n <<= 1;
n |= t >>> s + o & 1;
}
for (s = 0; s <= 24; s += 8) {
n <<= 1;
n |= e >>> s + o & 1;
}
}
for (o = 6; o >= 0; o -= 2) {
for (s = 1; s <= 25; s += 8) {
a <<= 1;
a |= t >>> s + o & 1;
}
for (s = 1; s <= 25; s += 8) {
a <<= 1;
a |= e >>> s + o & 1;
}
}
r[i + 0] = n >>> 0;
r[i + 1] = a >>> 0;
};
r.rip = function(e, t, r, i) {
for (var n = 0, a = 0, o = 0; o < 4; o++) for (var s = 24; s >= 0; s -= 8) {
n <<= 1;
n |= t >>> s + o & 1;
n <<= 1;
n |= e >>> s + o & 1;
}
for (o = 4; o < 8; o++) for (s = 24; s >= 0; s -= 8) {
a <<= 1;
a |= t >>> s + o & 1;
a <<= 1;
a |= e >>> s + o & 1;
}
r[i + 0] = n >>> 0;
r[i + 1] = a >>> 0;
};
r.pc1 = function(e, t, r, i) {
for (var n = 0, a = 0, o = 7; o >= 5; o--) {
for (var s = 0; s <= 24; s += 8) {
n <<= 1;
n |= t >> s + o & 1;
}
for (s = 0; s <= 24; s += 8) {
n <<= 1;
n |= e >> s + o & 1;
}
}
for (s = 0; s <= 24; s += 8) {
n <<= 1;
n |= t >> s + o & 1;
}
for (o = 1; o <= 3; o++) {
for (s = 0; s <= 24; s += 8) {
a <<= 1;
a |= t >> s + o & 1;
}
for (s = 0; s <= 24; s += 8) {
a <<= 1;
a |= e >> s + o & 1;
}
}
for (s = 0; s <= 24; s += 8) {
a <<= 1;
a |= e >> s + o & 1;
}
r[i + 0] = n >>> 0;
r[i + 1] = a >>> 0;
};
r.r28shl = function(e, t) {
return e << t & 268435455 | e >>> 28 - t;
};
var i = [ 14, 11, 17, 4, 27, 23, 25, 0, 13, 22, 7, 18, 5, 9, 16, 24, 2, 20, 12, 21, 1, 8, 15, 26, 15, 4, 25, 19, 9, 1, 26, 16, 5, 11, 23, 8, 12, 7, 17, 0, 22, 3, 10, 14, 6, 20, 27, 24 ];
r.pc2 = function(e, t, r, n) {
for (var a = 0, o = 0, s = i.length >>> 1, f = 0; f < s; f++) {
a <<= 1;
a |= e >>> i[f] & 1;
}
for (f = s; f < i.length; f++) {
o <<= 1;
o |= t >>> i[f] & 1;
}
r[n + 0] = a >>> 0;
r[n + 1] = o >>> 0;
};
r.expand = function(e, t, r) {
var i = 0, n = 0;
i = (1 & e) << 5 | e >>> 27;
for (var a = 23; a >= 15; a -= 4) {
i <<= 6;
i |= e >>> a & 63;
}
for (a = 11; a >= 3; a -= 4) {
n |= e >>> a & 63;
n <<= 6;
}
n |= (31 & e) << 1 | e >>> 31;
t[r + 0] = i >>> 0;
t[r + 1] = n >>> 0;
};
var n = [ 14, 0, 4, 15, 13, 7, 1, 4, 2, 14, 15, 2, 11, 13, 8, 1, 3, 10, 10, 6, 6, 12, 12, 11, 5, 9, 9, 5, 0, 3, 7, 8, 4, 15, 1, 12, 14, 8, 8, 2, 13, 4, 6, 9, 2, 1, 11, 7, 15, 5, 12, 11, 9, 3, 7, 14, 3, 10, 10, 0, 5, 6, 0, 13, 15, 3, 1, 13, 8, 4, 14, 7, 6, 15, 11, 2, 3, 8, 4, 14, 9, 12, 7, 0, 2, 1, 13, 10, 12, 6, 0, 9, 5, 11, 10, 5, 0, 13, 14, 8, 7, 10, 11, 1, 10, 3, 4, 15, 13, 4, 1, 2, 5, 11, 8, 6, 12, 7, 6, 12, 9, 0, 3, 5, 2, 14, 15, 9, 10, 13, 0, 7, 9, 0, 14, 9, 6, 3, 3, 4, 15, 6, 5, 10, 1, 2, 13, 8, 12, 5, 7, 14, 11, 12, 4, 11, 2, 15, 8, 1, 13, 1, 6, 10, 4, 13, 9, 0, 8, 6, 15, 9, 3, 8, 0, 7, 11, 4, 1, 15, 2, 14, 12, 3, 5, 11, 10, 5, 14, 2, 7, 12, 7, 13, 13, 8, 14, 11, 3, 5, 0, 6, 6, 15, 9, 0, 10, 3, 1, 4, 2, 7, 8, 2, 5, 12, 11, 1, 12, 10, 4, 14, 15, 9, 10, 3, 6, 15, 9, 0, 0, 6, 12, 10, 11, 1, 7, 13, 13, 8, 15, 9, 1, 4, 3, 5, 14, 11, 5, 12, 2, 7, 8, 2, 4, 14, 2, 14, 12, 11, 4, 2, 1, 12, 7, 4, 10, 7, 11, 13, 6, 1, 8, 5, 5, 0, 3, 15, 15, 10, 13, 3, 0, 9, 14, 8, 9, 6, 4, 11, 2, 8, 1, 12, 11, 7, 10, 1, 13, 14, 7, 2, 8, 13, 15, 6, 9, 15, 12, 0, 5, 9, 6, 10, 3, 4, 0, 5, 14, 3, 12, 10, 1, 15, 10, 4, 15, 2, 9, 7, 2, 12, 6, 9, 8, 5, 0, 6, 13, 1, 3, 13, 4, 14, 14, 0, 7, 11, 5, 3, 11, 8, 9, 4, 14, 3, 15, 2, 5, 12, 2, 9, 8, 5, 12, 15, 3, 10, 7, 11, 0, 14, 4, 1, 10, 7, 1, 6, 13, 0, 11, 8, 6, 13, 4, 13, 11, 0, 2, 11, 14, 7, 15, 4, 0, 9, 8, 1, 13, 10, 3, 14, 12, 3, 9, 5, 7, 12, 5, 2, 10, 15, 6, 8, 1, 6, 1, 6, 4, 11, 11, 13, 13, 8, 12, 1, 3, 4, 7, 10, 14, 7, 10, 9, 15, 5, 6, 0, 8, 15, 0, 14, 5, 2, 9, 3, 2, 12, 13, 1, 2, 15, 8, 13, 4, 8, 6, 10, 15, 3, 11, 7, 1, 4, 10, 12, 9, 5, 3, 6, 14, 11, 5, 0, 0, 14, 12, 9, 7, 2, 7, 2, 11, 1, 4, 14, 1, 7, 9, 4, 12, 10, 14, 8, 2, 13, 0, 15, 6, 12, 10, 9, 13, 0, 15, 3, 3, 5, 5, 6, 8, 11 ];
r.substitute = function(e, t) {
for (var r = 0, i = 0; i < 4; i++) {
r <<= 4;
r |= n[64 * i + (e >>> 18 - 6 * i & 63)];
}
for (i = 0; i < 4; i++) {
r <<= 4;
r |= n[256 + 64 * i + (t >>> 18 - 6 * i & 63)];
}
return r >>> 0;
};
var a = [ 16, 25, 12, 11, 3, 20, 4, 15, 31, 17, 9, 6, 27, 14, 1, 22, 30, 24, 8, 18, 0, 5, 29, 23, 13, 19, 2, 26, 10, 21, 28, 7 ];
r.permute = function(e) {
for (var t = 0, r = 0; r < a.length; r++) {
t <<= 1;
t |= e >>> a[r] & 1;
}
return t >>> 0;
};
r.padSplit = function(e, t, r) {
for (var i = e.toString(2); i.length < t; ) i = "0" + i;
for (var n = [], a = 0; a < t; a += r) n.push(i.slice(a, a + r));
return n.join(" ");
};
}, {} ],
83: [ function(e, t, r) {
(function(t) {
var i = e("./lib/generatePrime"), n = e("./lib/primes.json"), a = e("./lib/dh"), o = {
binary: !0,
hex: !0,
base64: !0
};
r.DiffieHellmanGroup = r.createDiffieHellmanGroup = r.getDiffieHellman = function(e) {
var r = new t(n[e].prime, "hex"), i = new t(n[e].gen, "hex");
return new a(r, i);
};
r.createDiffieHellman = r.DiffieHellman = function e(r, n, s, f) {
if (t.isBuffer(n) || void 0 === o[n]) return e(r, "binary", n, s);
n = n || "binary";
f = f || "binary";
s = s || new t([ 2 ]);
t.isBuffer(s) || (s = new t(s, f));
if ("number" == typeof r) return new a(i(r, s), s, !0);
t.isBuffer(r) || (r = new t(r, n));
return new a(r, s, !0);
};
}).call(this, e("buffer").Buffer);
}, {
"./lib/dh": 84,
"./lib/generatePrime": 85,
"./lib/primes.json": 86,
buffer: 66
} ],
84: [ function(e, t) {
(function(r) {
var i = e("bn.js"), n = new (e("miller-rabin"))(), a = new i(24), o = new i(11), s = new i(10), f = new i(3), c = new i(7), u = e("./generatePrime"), h = e("randombytes");
t.exports = m;
function d(e, t) {
t = t || "utf8";
r.isBuffer(e) || (e = new r(e, t));
this._pub = new i(e);
return this;
}
function l(e, t) {
t = t || "utf8";
r.isBuffer(e) || (e = new r(e, t));
this._priv = new i(e);
return this;
}
var p = {};
function b(e, t) {
var r = t.toString("hex"), i = [ r, e.toString(16) ].join("_");
if (i in p) return p[i];
var h, d = 0;
if (e.isEven() || !u.simpleSieve || !u.fermatTest(e) || !n.test(e)) {
d += 1;
d += "02" === r || "05" === r ? 8 : 4;
p[i] = d;
return d;
}
n.test(e.shrn(1)) || (d += 2);
switch (r) {
case "02":
e.mod(a).cmp(o) && (d += 8);
break;

case "05":
(h = e.mod(s)).cmp(f) && h.cmp(c) && (d += 8);
break;

default:
d += 4;
}
p[i] = d;
return d;
}
function m(e, t, r) {
this.setGenerator(t);
this.__prime = new i(e);
this._prime = i.mont(this.__prime);
this._primeLen = e.length;
this._pub = void 0;
this._priv = void 0;
this._primeCode = void 0;
if (r) {
this.setPublicKey = d;
this.setPrivateKey = l;
} else this._primeCode = 8;
}
Object.defineProperty(m.prototype, "verifyError", {
enumerable: !0,
get: function() {
"number" != typeof this._primeCode && (this._primeCode = b(this.__prime, this.__gen));
return this._primeCode;
}
});
m.prototype.generateKeys = function() {
this._priv || (this._priv = new i(h(this._primeLen)));
this._pub = this._gen.toRed(this._prime).redPow(this._priv).fromRed();
return this.getPublicKey();
};
m.prototype.computeSecret = function(e) {
var t = (e = (e = new i(e)).toRed(this._prime)).redPow(this._priv).fromRed(), n = new r(t.toArray()), a = this.getPrime();
if (n.length < a.length) {
var o = new r(a.length - n.length);
o.fill(0);
n = r.concat([ o, n ]);
}
return n;
};
m.prototype.getPublicKey = function(e) {
return g(this._pub, e);
};
m.prototype.getPrivateKey = function(e) {
return g(this._priv, e);
};
m.prototype.getPrime = function(e) {
return g(this.__prime, e);
};
m.prototype.getGenerator = function(e) {
return g(this._gen, e);
};
m.prototype.setGenerator = function(e, t) {
t = t || "utf8";
r.isBuffer(e) || (e = new r(e, t));
this.__gen = e;
this._gen = new i(e);
return this;
};
function g(e, t) {
var i = new r(e.toArray());
return t ? i.toString(t) : i;
}
}).call(this, e("buffer").Buffer);
}, {
"./generatePrime": 85,
"bn.js": 87,
buffer: 66,
"miller-rabin": 143,
randombytes: 167
} ],
85: [ function(e, t) {
var r = e("randombytes");
t.exports = g;
g.simpleSieve = b;
g.fermatTest = m;
var i = e("bn.js"), n = new i(24), a = new (e("miller-rabin"))(), o = new i(1), s = new i(2), f = new i(5), c = (new i(16), 
new i(8), new i(10)), u = new i(3), h = (new i(7), new i(11)), d = new i(4), l = (new i(12), 
null);
function p() {
if (null !== l) return l;
var e = [];
e[0] = 2;
for (var t = 1, r = 3; r < 1048576; r += 2) {
for (var i = Math.ceil(Math.sqrt(r)), n = 0; n < t && e[n] <= i && r % e[n] != 0; n++) ;
t !== n && e[n] <= i || (e[t++] = r);
}
l = e;
return e;
}
function b(e) {
for (var t = p(), r = 0; r < t.length; r++) if (0 === e.modn(t[r])) return 0 === e.cmpn(t[r]);
return !0;
}
function m(e) {
var t = i.mont(e);
return 0 === s.toRed(t).redPow(e.subn(1)).fromRed().cmpn(1);
}
function g(e, t) {
if (e < 16) return new i(2 === t || 5 === t ? [ 140, 123 ] : [ 140, 39 ]);
t = new i(t);
for (var l, p; ;) {
l = new i(r(Math.ceil(e / 8)));
for (;l.bitLength() > e; ) l.ishrn(1);
l.isEven() && l.iadd(o);
l.testn(1) || l.iadd(s);
if (t.cmp(s)) {
if (!t.cmp(f)) for (;l.mod(c).cmp(u); ) l.iadd(d);
} else for (;l.mod(n).cmp(h); ) l.iadd(d);
if (b(p = l.shrn(1)) && b(l) && m(p) && m(l) && a.test(p) && a.test(l)) return l;
}
}
}, {
"bn.js": 87,
"miller-rabin": 143,
randombytes: 167
} ],
86: [ function(e, t) {
t.exports = {
modp1: {
gen: "02",
prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"
},
modp2: {
gen: "02",
prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"
},
modp5: {
gen: "02",
prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"
},
modp14: {
gen: "02",
prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"
},
modp15: {
gen: "02",
prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"
},
modp16: {
gen: "02",
prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"
},
modp17: {
gen: "02",
prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"
},
modp18: {
gen: "02",
prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"
}
};
}, {} ],
87: [ function(e, t, r) {
arguments[4][15][0].apply(r, arguments);
}, {
buffer: 19,
dup: 15
} ],
88: [ function(e, t, r) {
"use strict";
var i = r;
i.version = e("../package.json").version;
i.utils = e("./elliptic/utils");
i.rand = e("brorand");
i.curve = e("./elliptic/curve");
i.curves = e("./elliptic/curves");
i.ec = e("./elliptic/ec");
i.eddsa = e("./elliptic/eddsa");
}, {
"../package.json": 104,
"./elliptic/curve": 91,
"./elliptic/curves": 94,
"./elliptic/ec": 95,
"./elliptic/eddsa": 98,
"./elliptic/utils": 102,
brorand: 18
} ],
89: [ function(e, t) {
"use strict";
var r = e("bn.js"), i = e("../utils"), n = i.getNAF, a = i.getJSF, o = i.assert;
function s(e, t) {
this.type = e;
this.p = new r(t.p, 16);
this.red = t.prime ? r.red(t.prime) : r.mont(this.p);
this.zero = new r(0).toRed(this.red);
this.one = new r(1).toRed(this.red);
this.two = new r(2).toRed(this.red);
this.n = t.n && new r(t.n, 16);
this.g = t.g && this.pointFromJSON(t.g, t.gRed);
this._wnafT1 = new Array(4);
this._wnafT2 = new Array(4);
this._wnafT3 = new Array(4);
this._wnafT4 = new Array(4);
this._bitLength = this.n ? this.n.bitLength() : 0;
var i = this.n && this.p.div(this.n);
if (!i || i.cmpn(100) > 0) this.redN = null; else {
this._maxwellTrick = !0;
this.redN = this.n.toRed(this.red);
}
}
t.exports = s;
s.prototype.point = function() {
throw new Error("Not implemented");
};
s.prototype.validate = function() {
throw new Error("Not implemented");
};
s.prototype._fixedNafMul = function(e, t) {
o(e.precomputed);
var r = e._getDoubles(), i = n(t, 1, this._bitLength), a = (1 << r.step + 1) - (r.step % 2 == 0 ? 2 : 1);
a /= 3;
for (var s = [], f = 0; f < i.length; f += r.step) {
var c = 0;
for (t = f + r.step - 1; t >= f; t--) c = (c << 1) + i[t];
s.push(c);
}
for (var u = this.jpoint(null, null, null), h = this.jpoint(null, null, null), d = a; d > 0; d--) {
for (f = 0; f < s.length; f++) (c = s[f]) === d ? h = h.mixedAdd(r.points[f]) : c === -d && (h = h.mixedAdd(r.points[f].neg()));
u = u.add(h);
}
return u.toP();
};
s.prototype._wnafMul = function(e, t) {
var r = 4, i = e._getNAFPoints(r);
r = i.wnd;
for (var a = i.points, s = n(t, r, this._bitLength), f = this.jpoint(null, null, null), c = s.length - 1; c >= 0; c--) {
for (t = 0; c >= 0 && 0 === s[c]; c--) t++;
c >= 0 && t++;
f = f.dblp(t);
if (c < 0) break;
var u = s[c];
o(0 !== u);
f = "affine" === e.type ? u > 0 ? f.mixedAdd(a[u - 1 >> 1]) : f.mixedAdd(a[-u - 1 >> 1].neg()) : u > 0 ? f.add(a[u - 1 >> 1]) : f.add(a[-u - 1 >> 1].neg());
}
return "affine" === e.type ? f.toP() : f;
};
s.prototype._wnafMulAdd = function(e, t, r, i, o) {
for (var s = this._wnafT1, f = this._wnafT2, c = this._wnafT3, u = 0, h = 0; h < i; h++) {
var d = (k = t[h])._getNAFPoints(e);
s[h] = d.wnd;
f[h] = d.points;
}
for (h = i - 1; h >= 1; h -= 2) {
var l = h - 1, p = h;
if (1 === s[l] && 1 === s[p]) {
var b = [ t[l], null, null, t[p] ];
if (0 === t[l].y.cmp(t[p].y)) {
b[1] = t[l].add(t[p]);
b[2] = t[l].toJ().mixedAdd(t[p].neg());
} else if (0 === t[l].y.cmp(t[p].y.redNeg())) {
b[1] = t[l].toJ().mixedAdd(t[p]);
b[2] = t[l].add(t[p].neg());
} else {
b[1] = t[l].toJ().mixedAdd(t[p]);
b[2] = t[l].toJ().mixedAdd(t[p].neg());
}
var m = [ -3, -1, -5, -7, 0, 7, 5, 1, 3 ], g = a(r[l], r[p]);
u = Math.max(g[0].length, u);
c[l] = new Array(u);
c[p] = new Array(u);
for (var y = 0; y < u; y++) {
var v = 0 | g[0][y], _ = 0 | g[1][y];
c[l][y] = m[3 * (v + 1) + (_ + 1)];
c[p][y] = 0;
f[l] = b;
}
} else {
c[l] = n(r[l], s[l], this._bitLength);
c[p] = n(r[p], s[p], this._bitLength);
u = Math.max(c[l].length, u);
u = Math.max(c[p].length, u);
}
}
var w = this.jpoint(null, null, null), M = this._wnafT4;
for (h = u; h >= 0; h--) {
for (var S = 0; h >= 0; ) {
var E = !0;
for (y = 0; y < i; y++) {
M[y] = 0 | c[y][h];
0 !== M[y] && (E = !1);
}
if (!E) break;
S++;
h--;
}
h >= 0 && S++;
w = w.dblp(S);
if (h < 0) break;
for (y = 0; y < i; y++) {
var k, A = M[y];
if (0 !== A) {
A > 0 ? k = f[y][A - 1 >> 1] : A < 0 && (k = f[y][-A - 1 >> 1].neg());
w = "affine" === k.type ? w.mixedAdd(k) : w.add(k);
}
}
}
for (h = 0; h < i; h++) f[h] = null;
return o ? w : w.toP();
};
function f(e, t) {
this.curve = e;
this.type = t;
this.precomputed = null;
}
s.BasePoint = f;
f.prototype.eq = function() {
throw new Error("Not implemented");
};
f.prototype.validate = function() {
return this.curve.validate(this);
};
s.prototype.decodePoint = function(e, t) {
e = i.toArray(e, t);
var r = this.p.byteLength();
if ((4 === e[0] || 6 === e[0] || 7 === e[0]) && e.length - 1 == 2 * r) {
6 === e[0] ? o(e[e.length - 1] % 2 == 0) : 7 === e[0] && o(e[e.length - 1] % 2 == 1);
return this.point(e.slice(1, 1 + r), e.slice(1 + r, 1 + 2 * r));
}
if ((2 === e[0] || 3 === e[0]) && e.length - 1 === r) return this.pointFromX(e.slice(1, 1 + r), 3 === e[0]);
throw new Error("Unknown point format");
};
f.prototype.encodeCompressed = function(e) {
return this.encode(e, !0);
};
f.prototype._encode = function(e) {
var t = this.curve.p.byteLength(), r = this.getX().toArray("be", t);
return e ? [ this.getY().isEven() ? 2 : 3 ].concat(r) : [ 4 ].concat(r, this.getY().toArray("be", t));
};
f.prototype.encode = function(e, t) {
return i.encode(this._encode(t), e);
};
f.prototype.precompute = function(e) {
if (this.precomputed) return this;
var t = {
doubles: null,
naf: null,
beta: null
};
t.naf = this._getNAFPoints(8);
t.doubles = this._getDoubles(4, e);
t.beta = this._getBeta();
this.precomputed = t;
return this;
};
f.prototype._hasDoubles = function(e) {
if (!this.precomputed) return !1;
var t = this.precomputed.doubles;
return !!t && t.points.length >= Math.ceil((e.bitLength() + 1) / t.step);
};
f.prototype._getDoubles = function(e, t) {
if (this.precomputed && this.precomputed.doubles) return this.precomputed.doubles;
for (var r = [ this ], i = this, n = 0; n < t; n += e) {
for (var a = 0; a < e; a++) i = i.dbl();
r.push(i);
}
return {
step: e,
points: r
};
};
f.prototype._getNAFPoints = function(e) {
if (this.precomputed && this.precomputed.naf) return this.precomputed.naf;
for (var t = [ this ], r = (1 << e) - 1, i = 1 === r ? null : this.dbl(), n = 1; n < r; n++) t[n] = t[n - 1].add(i);
return {
wnd: e,
points: t
};
};
f.prototype._getBeta = function() {
return null;
};
f.prototype.dblp = function(e) {
for (var t = this, r = 0; r < e; r++) t = t.dbl();
return t;
};
}, {
"../utils": 102,
"bn.js": 103
} ],
90: [ function(e, t) {
"use strict";
var r = e("../utils"), i = e("bn.js"), n = e("inherits"), a = e("./base"), o = r.assert;
function s(e) {
this.twisted = 1 != (0 | e.a);
this.mOneA = this.twisted && -1 == (0 | e.a);
this.extended = this.mOneA;
a.call(this, "edwards", e);
this.a = new i(e.a, 16).umod(this.red.m);
this.a = this.a.toRed(this.red);
this.c = new i(e.c, 16).toRed(this.red);
this.c2 = this.c.redSqr();
this.d = new i(e.d, 16).toRed(this.red);
this.dd = this.d.redAdd(this.d);
o(!this.twisted || 0 === this.c.fromRed().cmpn(1));
this.oneC = 1 == (0 | e.c);
}
n(s, a);
t.exports = s;
s.prototype._mulA = function(e) {
return this.mOneA ? e.redNeg() : this.a.redMul(e);
};
s.prototype._mulC = function(e) {
return this.oneC ? e : this.c.redMul(e);
};
s.prototype.jpoint = function(e, t, r, i) {
return this.point(e, t, r, i);
};
s.prototype.pointFromX = function(e, t) {
(e = new i(e, 16)).red || (e = e.toRed(this.red));
var r = e.redSqr(), n = this.c2.redSub(this.a.redMul(r)), a = this.one.redSub(this.c2.redMul(this.d).redMul(r)), o = n.redMul(a.redInvm()), s = o.redSqrt();
if (0 !== s.redSqr().redSub(o).cmp(this.zero)) throw new Error("invalid point");
var f = s.fromRed().isOdd();
(t && !f || !t && f) && (s = s.redNeg());
return this.point(e, s);
};
s.prototype.pointFromY = function(e, t) {
(e = new i(e, 16)).red || (e = e.toRed(this.red));
var r = e.redSqr(), n = r.redSub(this.c2), a = r.redMul(this.d).redMul(this.c2).redSub(this.a), o = n.redMul(a.redInvm());
if (0 === o.cmp(this.zero)) {
if (t) throw new Error("invalid point");
return this.point(this.zero, e);
}
var s = o.redSqrt();
if (0 !== s.redSqr().redSub(o).cmp(this.zero)) throw new Error("invalid point");
s.fromRed().isOdd() !== t && (s = s.redNeg());
return this.point(s, e);
};
s.prototype.validate = function(e) {
if (e.isInfinity()) return !0;
e.normalize();
var t = e.x.redSqr(), r = e.y.redSqr(), i = t.redMul(this.a).redAdd(r), n = this.c2.redMul(this.one.redAdd(this.d.redMul(t).redMul(r)));
return 0 === i.cmp(n);
};
function f(e, t, r, n, o) {
a.BasePoint.call(this, e, "projective");
if (null === t && null === r && null === n) {
this.x = this.curve.zero;
this.y = this.curve.one;
this.z = this.curve.one;
this.t = this.curve.zero;
this.zOne = !0;
} else {
this.x = new i(t, 16);
this.y = new i(r, 16);
this.z = n ? new i(n, 16) : this.curve.one;
this.t = o && new i(o, 16);
this.x.red || (this.x = this.x.toRed(this.curve.red));
this.y.red || (this.y = this.y.toRed(this.curve.red));
this.z.red || (this.z = this.z.toRed(this.curve.red));
this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red));
this.zOne = this.z === this.curve.one;
if (this.curve.extended && !this.t) {
this.t = this.x.redMul(this.y);
this.zOne || (this.t = this.t.redMul(this.z.redInvm()));
}
}
}
n(f, a.BasePoint);
s.prototype.pointFromJSON = function(e) {
return f.fromJSON(this, e);
};
s.prototype.point = function(e, t, r, i) {
return new f(this, e, t, r, i);
};
f.fromJSON = function(e, t) {
return new f(e, t[0], t[1], t[2]);
};
f.prototype.inspect = function() {
return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
};
f.prototype.isInfinity = function() {
return 0 === this.x.cmpn(0) && (0 === this.y.cmp(this.z) || this.zOne && 0 === this.y.cmp(this.curve.c));
};
f.prototype._extDbl = function() {
var e = this.x.redSqr(), t = this.y.redSqr(), r = this.z.redSqr();
r = r.redIAdd(r);
var i = this.curve._mulA(e), n = this.x.redAdd(this.y).redSqr().redISub(e).redISub(t), a = i.redAdd(t), o = a.redSub(r), s = i.redSub(t), f = n.redMul(o), c = a.redMul(s), u = n.redMul(s), h = o.redMul(a);
return this.curve.point(f, c, h, u);
};
f.prototype._projDbl = function() {
var e, t, r, i = this.x.redAdd(this.y).redSqr(), n = this.x.redSqr(), a = this.y.redSqr();
if (this.curve.twisted) {
var o = (c = this.curve._mulA(n)).redAdd(a);
if (this.zOne) {
e = i.redSub(n).redSub(a).redMul(o.redSub(this.curve.two));
t = o.redMul(c.redSub(a));
r = o.redSqr().redSub(o).redSub(o);
} else {
var s = this.z.redSqr(), f = o.redSub(s).redISub(s);
e = i.redSub(n).redISub(a).redMul(f);
t = o.redMul(c.redSub(a));
r = o.redMul(f);
}
} else {
var c = n.redAdd(a);
s = this.curve._mulC(this.z).redSqr(), f = c.redSub(s).redSub(s);
e = this.curve._mulC(i.redISub(c)).redMul(f);
t = this.curve._mulC(c).redMul(n.redISub(a));
r = c.redMul(f);
}
return this.curve.point(e, t, r);
};
f.prototype.dbl = function() {
return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl();
};
f.prototype._extAdd = function(e) {
var t = this.y.redSub(this.x).redMul(e.y.redSub(e.x)), r = this.y.redAdd(this.x).redMul(e.y.redAdd(e.x)), i = this.t.redMul(this.curve.dd).redMul(e.t), n = this.z.redMul(e.z.redAdd(e.z)), a = r.redSub(t), o = n.redSub(i), s = n.redAdd(i), f = r.redAdd(t), c = a.redMul(o), u = s.redMul(f), h = a.redMul(f), d = o.redMul(s);
return this.curve.point(c, u, d, h);
};
f.prototype._projAdd = function(e) {
var t, r, i = this.z.redMul(e.z), n = i.redSqr(), a = this.x.redMul(e.x), o = this.y.redMul(e.y), s = this.curve.d.redMul(a).redMul(o), f = n.redSub(s), c = n.redAdd(s), u = this.x.redAdd(this.y).redMul(e.x.redAdd(e.y)).redISub(a).redISub(o), h = i.redMul(f).redMul(u);
if (this.curve.twisted) {
t = i.redMul(c).redMul(o.redSub(this.curve._mulA(a)));
r = f.redMul(c);
} else {
t = i.redMul(c).redMul(o.redSub(a));
r = this.curve._mulC(f).redMul(c);
}
return this.curve.point(h, t, r);
};
f.prototype.add = function(e) {
return this.isInfinity() ? e : e.isInfinity() ? this : this.curve.extended ? this._extAdd(e) : this._projAdd(e);
};
f.prototype.mul = function(e) {
return this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve._wnafMul(this, e);
};
f.prototype.mulAdd = function(e, t, r) {
return this.curve._wnafMulAdd(1, [ this, t ], [ e, r ], 2, !1);
};
f.prototype.jmulAdd = function(e, t, r) {
return this.curve._wnafMulAdd(1, [ this, t ], [ e, r ], 2, !0);
};
f.prototype.normalize = function() {
if (this.zOne) return this;
var e = this.z.redInvm();
this.x = this.x.redMul(e);
this.y = this.y.redMul(e);
this.t && (this.t = this.t.redMul(e));
this.z = this.curve.one;
this.zOne = !0;
return this;
};
f.prototype.neg = function() {
return this.curve.point(this.x.redNeg(), this.y, this.z, this.t && this.t.redNeg());
};
f.prototype.getX = function() {
this.normalize();
return this.x.fromRed();
};
f.prototype.getY = function() {
this.normalize();
return this.y.fromRed();
};
f.prototype.eq = function(e) {
return this === e || 0 === this.getX().cmp(e.getX()) && 0 === this.getY().cmp(e.getY());
};
f.prototype.eqXToP = function(e) {
var t = e.toRed(this.curve.red).redMul(this.z);
if (0 === this.x.cmp(t)) return !0;
for (var r = e.clone(), i = this.curve.redN.redMul(this.z); ;) {
r.iadd(this.curve.n);
if (r.cmp(this.curve.p) >= 0) return !1;
t.redIAdd(i);
if (0 === this.x.cmp(t)) return !0;
}
};
f.prototype.toP = f.prototype.normalize;
f.prototype.mixedAdd = f.prototype.add;
}, {
"../utils": 102,
"./base": 89,
"bn.js": 103,
inherits: 140
} ],
91: [ function(e, t, r) {
"use strict";
var i = r;
i.base = e("./base");
i.short = e("./short");
i.mont = e("./mont");
i.edwards = e("./edwards");
}, {
"./base": 89,
"./edwards": 90,
"./mont": 92,
"./short": 93
} ],
92: [ function(e, t) {
"use strict";
var r = e("bn.js"), i = e("inherits"), n = e("./base"), a = e("../utils");
function o(e) {
n.call(this, "mont", e);
this.a = new r(e.a, 16).toRed(this.red);
this.b = new r(e.b, 16).toRed(this.red);
this.i4 = new r(4).toRed(this.red).redInvm();
this.two = new r(2).toRed(this.red);
this.a24 = this.i4.redMul(this.a.redAdd(this.two));
}
i(o, n);
t.exports = o;
o.prototype.validate = function(e) {
var t = e.normalize().x, r = t.redSqr(), i = r.redMul(t).redAdd(r.redMul(this.a)).redAdd(t);
return 0 === i.redSqrt().redSqr().cmp(i);
};
function s(e, t, i) {
n.BasePoint.call(this, e, "projective");
if (null === t && null === i) {
this.x = this.curve.one;
this.z = this.curve.zero;
} else {
this.x = new r(t, 16);
this.z = new r(i, 16);
this.x.red || (this.x = this.x.toRed(this.curve.red));
this.z.red || (this.z = this.z.toRed(this.curve.red));
}
}
i(s, n.BasePoint);
o.prototype.decodePoint = function(e, t) {
return this.point(a.toArray(e, t), 1);
};
o.prototype.point = function(e, t) {
return new s(this, e, t);
};
o.prototype.pointFromJSON = function(e) {
return s.fromJSON(this, e);
};
s.prototype.precompute = function() {};
s.prototype._encode = function() {
return this.getX().toArray("be", this.curve.p.byteLength());
};
s.fromJSON = function(e, t) {
return new s(e, t[0], t[1] || e.one);
};
s.prototype.inspect = function() {
return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
};
s.prototype.isInfinity = function() {
return 0 === this.z.cmpn(0);
};
s.prototype.dbl = function() {
var e = this.x.redAdd(this.z).redSqr(), t = this.x.redSub(this.z).redSqr(), r = e.redSub(t), i = e.redMul(t), n = r.redMul(t.redAdd(this.curve.a24.redMul(r)));
return this.curve.point(i, n);
};
s.prototype.add = function() {
throw new Error("Not supported on Montgomery curve");
};
s.prototype.diffAdd = function(e, t) {
var r = this.x.redAdd(this.z), i = this.x.redSub(this.z), n = e.x.redAdd(e.z), a = e.x.redSub(e.z).redMul(r), o = n.redMul(i), s = t.z.redMul(a.redAdd(o).redSqr()), f = t.x.redMul(a.redISub(o).redSqr());
return this.curve.point(s, f);
};
s.prototype.mul = function(e) {
for (var t = e.clone(), r = this, i = this.curve.point(null, null), n = []; 0 !== t.cmpn(0); t.iushrn(1)) n.push(t.andln(1));
for (var a = n.length - 1; a >= 0; a--) if (0 === n[a]) {
r = r.diffAdd(i, this);
i = i.dbl();
} else {
i = r.diffAdd(i, this);
r = r.dbl();
}
return i;
};
s.prototype.mulAdd = function() {
throw new Error("Not supported on Montgomery curve");
};
s.prototype.jumlAdd = function() {
throw new Error("Not supported on Montgomery curve");
};
s.prototype.eq = function(e) {
return 0 === this.getX().cmp(e.getX());
};
s.prototype.normalize = function() {
this.x = this.x.redMul(this.z.redInvm());
this.z = this.curve.one;
return this;
};
s.prototype.getX = function() {
this.normalize();
return this.x.fromRed();
};
}, {
"../utils": 102,
"./base": 89,
"bn.js": 103,
inherits: 140
} ],
93: [ function(e, t) {
"use strict";
var r = e("../utils"), i = e("bn.js"), n = e("inherits"), a = e("./base"), o = r.assert;
function s(e) {
a.call(this, "short", e);
this.a = new i(e.a, 16).toRed(this.red);
this.b = new i(e.b, 16).toRed(this.red);
this.tinv = this.two.redInvm();
this.zeroA = 0 === this.a.fromRed().cmpn(0);
this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3);
this.endo = this._getEndomorphism(e);
this._endoWnafT1 = new Array(4);
this._endoWnafT2 = new Array(4);
}
n(s, a);
t.exports = s;
s.prototype._getEndomorphism = function(e) {
if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
var t, r;
if (e.beta) t = new i(e.beta, 16).toRed(this.red); else {
var n = this._getEndoRoots(this.p);
t = (t = n[0].cmp(n[1]) < 0 ? n[0] : n[1]).toRed(this.red);
}
if (e.lambda) r = new i(e.lambda, 16); else {
var a = this._getEndoRoots(this.n);
if (0 === this.g.mul(a[0]).x.cmp(this.g.x.redMul(t))) r = a[0]; else {
r = a[1];
o(0 === this.g.mul(r).x.cmp(this.g.x.redMul(t)));
}
}
return {
beta: t,
lambda: r,
basis: e.basis ? e.basis.map(function(e) {
return {
a: new i(e.a, 16),
b: new i(e.b, 16)
};
}) : this._getEndoBasis(r)
};
}
};
s.prototype._getEndoRoots = function(e) {
var t = e === this.p ? this.red : i.mont(e), r = new i(2).toRed(t).redInvm(), n = r.redNeg(), a = new i(3).toRed(t).redNeg().redSqrt().redMul(r);
return [ n.redAdd(a).fromRed(), n.redSub(a).fromRed() ];
};
s.prototype._getEndoBasis = function(e) {
for (var t, r, n, a, o, s, f, c, u, h = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), d = e, l = this.n.clone(), p = new i(1), b = new i(0), m = new i(0), g = new i(1), y = 0; 0 !== d.cmpn(0); ) {
var v = l.div(d);
c = l.sub(v.mul(d));
u = m.sub(v.mul(p));
var _ = g.sub(v.mul(b));
if (!n && c.cmp(h) < 0) {
t = f.neg();
r = p;
n = c.neg();
a = u;
} else if (n && 2 == ++y) break;
f = c;
l = d;
d = c;
m = p;
p = u;
g = b;
b = _;
}
o = c.neg();
s = u;
var w = n.sqr().add(a.sqr());
if (o.sqr().add(s.sqr()).cmp(w) >= 0) {
o = t;
s = r;
}
if (n.negative) {
n = n.neg();
a = a.neg();
}
if (o.negative) {
o = o.neg();
s = s.neg();
}
return [ {
a: n,
b: a
}, {
a: o,
b: s
} ];
};
s.prototype._endoSplit = function(e) {
var t = this.endo.basis, r = t[0], i = t[1], n = i.b.mul(e).divRound(this.n), a = r.b.neg().mul(e).divRound(this.n), o = n.mul(r.a), s = a.mul(i.a), f = n.mul(r.b), c = a.mul(i.b);
return {
k1: e.sub(o).sub(s),
k2: f.add(c).neg()
};
};
s.prototype.pointFromX = function(e, t) {
(e = new i(e, 16)).red || (e = e.toRed(this.red));
var r = e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b), n = r.redSqrt();
if (0 !== n.redSqr().redSub(r).cmp(this.zero)) throw new Error("invalid point");
var a = n.fromRed().isOdd();
(t && !a || !t && a) && (n = n.redNeg());
return this.point(e, n);
};
s.prototype.validate = function(e) {
if (e.inf) return !0;
var t = e.x, r = e.y, i = this.a.redMul(t), n = t.redSqr().redMul(t).redIAdd(i).redIAdd(this.b);
return 0 === r.redSqr().redISub(n).cmpn(0);
};
s.prototype._endoWnafMulAdd = function(e, t, r) {
for (var i = this._endoWnafT1, n = this._endoWnafT2, a = 0; a < e.length; a++) {
var o = this._endoSplit(t[a]), s = e[a], f = s._getBeta();
if (o.k1.negative) {
o.k1.ineg();
s = s.neg(!0);
}
if (o.k2.negative) {
o.k2.ineg();
f = f.neg(!0);
}
i[2 * a] = s;
i[2 * a + 1] = f;
n[2 * a] = o.k1;
n[2 * a + 1] = o.k2;
}
for (var c = this._wnafMulAdd(1, i, n, 2 * a, r), u = 0; u < 2 * a; u++) {
i[u] = null;
n[u] = null;
}
return c;
};
function f(e, t, r, n) {
a.BasePoint.call(this, e, "affine");
if (null === t && null === r) {
this.x = null;
this.y = null;
this.inf = !0;
} else {
this.x = new i(t, 16);
this.y = new i(r, 16);
if (n) {
this.x.forceRed(this.curve.red);
this.y.forceRed(this.curve.red);
}
this.x.red || (this.x = this.x.toRed(this.curve.red));
this.y.red || (this.y = this.y.toRed(this.curve.red));
this.inf = !1;
}
}
n(f, a.BasePoint);
s.prototype.point = function(e, t, r) {
return new f(this, e, t, r);
};
s.prototype.pointFromJSON = function(e, t) {
return f.fromJSON(this, e, t);
};
f.prototype._getBeta = function() {
if (this.curve.endo) {
var e = this.precomputed;
if (e && e.beta) return e.beta;
var t = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
if (e) {
var r = this.curve, i = function(e) {
return r.point(e.x.redMul(r.endo.beta), e.y);
};
e.beta = t;
t.precomputed = {
beta: null,
naf: e.naf && {
wnd: e.naf.wnd,
points: e.naf.points.map(i)
},
doubles: e.doubles && {
step: e.doubles.step,
points: e.doubles.points.map(i)
}
};
}
return t;
}
};
f.prototype.toJSON = function() {
return this.precomputed ? [ this.x, this.y, this.precomputed && {
doubles: this.precomputed.doubles && {
step: this.precomputed.doubles.step,
points: this.precomputed.doubles.points.slice(1)
},
naf: this.precomputed.naf && {
wnd: this.precomputed.naf.wnd,
points: this.precomputed.naf.points.slice(1)
}
} ] : [ this.x, this.y ];
};
f.fromJSON = function(e, t, r) {
"string" == typeof t && (t = JSON.parse(t));
var i = e.point(t[0], t[1], r);
if (!t[2]) return i;
function n(t) {
return e.point(t[0], t[1], r);
}
var a = t[2];
i.precomputed = {
beta: null,
doubles: a.doubles && {
step: a.doubles.step,
points: [ i ].concat(a.doubles.points.map(n))
},
naf: a.naf && {
wnd: a.naf.wnd,
points: [ i ].concat(a.naf.points.map(n))
}
};
return i;
};
f.prototype.inspect = function() {
return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
};
f.prototype.isInfinity = function() {
return this.inf;
};
f.prototype.add = function(e) {
if (this.inf) return e;
if (e.inf) return this;
if (this.eq(e)) return this.dbl();
if (this.neg().eq(e)) return this.curve.point(null, null);
if (0 === this.x.cmp(e.x)) return this.curve.point(null, null);
var t = this.y.redSub(e.y);
0 !== t.cmpn(0) && (t = t.redMul(this.x.redSub(e.x).redInvm()));
var r = t.redSqr().redISub(this.x).redISub(e.x), i = t.redMul(this.x.redSub(r)).redISub(this.y);
return this.curve.point(r, i);
};
f.prototype.dbl = function() {
if (this.inf) return this;
var e = this.y.redAdd(this.y);
if (0 === e.cmpn(0)) return this.curve.point(null, null);
var t = this.curve.a, r = this.x.redSqr(), i = e.redInvm(), n = r.redAdd(r).redIAdd(r).redIAdd(t).redMul(i), a = n.redSqr().redISub(this.x.redAdd(this.x)), o = n.redMul(this.x.redSub(a)).redISub(this.y);
return this.curve.point(a, o);
};
f.prototype.getX = function() {
return this.x.fromRed();
};
f.prototype.getY = function() {
return this.y.fromRed();
};
f.prototype.mul = function(e) {
e = new i(e, 16);
return this.isInfinity() ? this : this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve.endo ? this.curve._endoWnafMulAdd([ this ], [ e ]) : this.curve._wnafMul(this, e);
};
f.prototype.mulAdd = function(e, t, r) {
var i = [ this, t ], n = [ e, r ];
return this.curve.endo ? this.curve._endoWnafMulAdd(i, n) : this.curve._wnafMulAdd(1, i, n, 2);
};
f.prototype.jmulAdd = function(e, t, r) {
var i = [ this, t ], n = [ e, r ];
return this.curve.endo ? this.curve._endoWnafMulAdd(i, n, !0) : this.curve._wnafMulAdd(1, i, n, 2, !0);
};
f.prototype.eq = function(e) {
return this === e || this.inf === e.inf && (this.inf || 0 === this.x.cmp(e.x) && 0 === this.y.cmp(e.y));
};
f.prototype.neg = function(e) {
if (this.inf) return this;
var t = this.curve.point(this.x, this.y.redNeg());
if (e && this.precomputed) {
var r = this.precomputed, i = function(e) {
return e.neg();
};
t.precomputed = {
naf: r.naf && {
wnd: r.naf.wnd,
points: r.naf.points.map(i)
},
doubles: r.doubles && {
step: r.doubles.step,
points: r.doubles.points.map(i)
}
};
}
return t;
};
f.prototype.toJ = function() {
return this.inf ? this.curve.jpoint(null, null, null) : this.curve.jpoint(this.x, this.y, this.curve.one);
};
function c(e, t, r, n) {
a.BasePoint.call(this, e, "jacobian");
if (null === t && null === r && null === n) {
this.x = this.curve.one;
this.y = this.curve.one;
this.z = new i(0);
} else {
this.x = new i(t, 16);
this.y = new i(r, 16);
this.z = new i(n, 16);
}
this.x.red || (this.x = this.x.toRed(this.curve.red));
this.y.red || (this.y = this.y.toRed(this.curve.red));
this.z.red || (this.z = this.z.toRed(this.curve.red));
this.zOne = this.z === this.curve.one;
}
n(c, a.BasePoint);
s.prototype.jpoint = function(e, t, r) {
return new c(this, e, t, r);
};
c.prototype.toP = function() {
if (this.isInfinity()) return this.curve.point(null, null);
var e = this.z.redInvm(), t = e.redSqr(), r = this.x.redMul(t), i = this.y.redMul(t).redMul(e);
return this.curve.point(r, i);
};
c.prototype.neg = function() {
return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
};
c.prototype.add = function(e) {
if (this.isInfinity()) return e;
if (e.isInfinity()) return this;
var t = e.z.redSqr(), r = this.z.redSqr(), i = this.x.redMul(t), n = e.x.redMul(r), a = this.y.redMul(t.redMul(e.z)), o = e.y.redMul(r.redMul(this.z)), s = i.redSub(n), f = a.redSub(o);
if (0 === s.cmpn(0)) return 0 !== f.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
var c = s.redSqr(), u = c.redMul(s), h = i.redMul(c), d = f.redSqr().redIAdd(u).redISub(h).redISub(h), l = f.redMul(h.redISub(d)).redISub(a.redMul(u)), p = this.z.redMul(e.z).redMul(s);
return this.curve.jpoint(d, l, p);
};
c.prototype.mixedAdd = function(e) {
if (this.isInfinity()) return e.toJ();
if (e.isInfinity()) return this;
var t = this.z.redSqr(), r = this.x, i = e.x.redMul(t), n = this.y, a = e.y.redMul(t).redMul(this.z), o = r.redSub(i), s = n.redSub(a);
if (0 === o.cmpn(0)) return 0 !== s.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
var f = o.redSqr(), c = f.redMul(o), u = r.redMul(f), h = s.redSqr().redIAdd(c).redISub(u).redISub(u), d = s.redMul(u.redISub(h)).redISub(n.redMul(c)), l = this.z.redMul(o);
return this.curve.jpoint(h, d, l);
};
c.prototype.dblp = function(e) {
if (0 === e) return this;
if (this.isInfinity()) return this;
if (!e) return this.dbl();
if (this.curve.zeroA || this.curve.threeA) {
for (var t = this, r = 0; r < e; r++) t = t.dbl();
return t;
}
var i = this.curve.a, n = this.curve.tinv, a = this.x, o = this.y, s = this.z, f = s.redSqr().redSqr(), c = o.redAdd(o);
for (r = 0; r < e; r++) {
var u = a.redSqr(), h = c.redSqr(), d = h.redSqr(), l = u.redAdd(u).redIAdd(u).redIAdd(i.redMul(f)), p = a.redMul(h), b = l.redSqr().redISub(p.redAdd(p)), m = p.redISub(b), g = l.redMul(m);
g = g.redIAdd(g).redISub(d);
var y = c.redMul(s);
r + 1 < e && (f = f.redMul(d));
a = b;
s = y;
c = g;
}
return this.curve.jpoint(a, c.redMul(n), s);
};
c.prototype.dbl = function() {
return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl();
};
c.prototype._zeroDbl = function() {
var e, t, r;
if (this.zOne) {
var i = this.x.redSqr(), n = this.y.redSqr(), a = n.redSqr(), o = this.x.redAdd(n).redSqr().redISub(i).redISub(a);
o = o.redIAdd(o);
var s = i.redAdd(i).redIAdd(i), f = s.redSqr().redISub(o).redISub(o), c = a.redIAdd(a);
c = (c = c.redIAdd(c)).redIAdd(c);
e = f;
t = s.redMul(o.redISub(f)).redISub(c);
r = this.y.redAdd(this.y);
} else {
var u = this.x.redSqr(), h = this.y.redSqr(), d = h.redSqr(), l = this.x.redAdd(h).redSqr().redISub(u).redISub(d);
l = l.redIAdd(l);
var p = u.redAdd(u).redIAdd(u), b = p.redSqr(), m = d.redIAdd(d);
m = (m = m.redIAdd(m)).redIAdd(m);
e = b.redISub(l).redISub(l);
t = p.redMul(l.redISub(e)).redISub(m);
r = (r = this.y.redMul(this.z)).redIAdd(r);
}
return this.curve.jpoint(e, t, r);
};
c.prototype._threeDbl = function() {
var e, t, r;
if (this.zOne) {
var i = this.x.redSqr(), n = this.y.redSqr(), a = n.redSqr(), o = this.x.redAdd(n).redSqr().redISub(i).redISub(a);
o = o.redIAdd(o);
var s = i.redAdd(i).redIAdd(i).redIAdd(this.curve.a), f = s.redSqr().redISub(o).redISub(o);
e = f;
var c = a.redIAdd(a);
c = (c = c.redIAdd(c)).redIAdd(c);
t = s.redMul(o.redISub(f)).redISub(c);
r = this.y.redAdd(this.y);
} else {
var u = this.z.redSqr(), h = this.y.redSqr(), d = this.x.redMul(h), l = this.x.redSub(u).redMul(this.x.redAdd(u));
l = l.redAdd(l).redIAdd(l);
var p = d.redIAdd(d), b = (p = p.redIAdd(p)).redAdd(p);
e = l.redSqr().redISub(b);
r = this.y.redAdd(this.z).redSqr().redISub(h).redISub(u);
var m = h.redSqr();
m = (m = (m = m.redIAdd(m)).redIAdd(m)).redIAdd(m);
t = l.redMul(p.redISub(e)).redISub(m);
}
return this.curve.jpoint(e, t, r);
};
c.prototype._dbl = function() {
var e = this.curve.a, t = this.x, r = this.y, i = this.z, n = i.redSqr().redSqr(), a = t.redSqr(), o = r.redSqr(), s = a.redAdd(a).redIAdd(a).redIAdd(e.redMul(n)), f = t.redAdd(t), c = (f = f.redIAdd(f)).redMul(o), u = s.redSqr().redISub(c.redAdd(c)), h = c.redISub(u), d = o.redSqr();
d = (d = (d = d.redIAdd(d)).redIAdd(d)).redIAdd(d);
var l = s.redMul(h).redISub(d), p = r.redAdd(r).redMul(i);
return this.curve.jpoint(u, l, p);
};
c.prototype.trpl = function() {
if (!this.curve.zeroA) return this.dbl().add(this);
var e = this.x.redSqr(), t = this.y.redSqr(), r = this.z.redSqr(), i = t.redSqr(), n = e.redAdd(e).redIAdd(e), a = n.redSqr(), o = this.x.redAdd(t).redSqr().redISub(e).redISub(i), s = (o = (o = (o = o.redIAdd(o)).redAdd(o).redIAdd(o)).redISub(a)).redSqr(), f = i.redIAdd(i);
f = (f = (f = f.redIAdd(f)).redIAdd(f)).redIAdd(f);
var c = n.redIAdd(o).redSqr().redISub(a).redISub(s).redISub(f), u = t.redMul(c);
u = (u = u.redIAdd(u)).redIAdd(u);
var h = this.x.redMul(s).redISub(u);
h = (h = h.redIAdd(h)).redIAdd(h);
var d = this.y.redMul(c.redMul(f.redISub(c)).redISub(o.redMul(s)));
d = (d = (d = d.redIAdd(d)).redIAdd(d)).redIAdd(d);
var l = this.z.redAdd(o).redSqr().redISub(r).redISub(s);
return this.curve.jpoint(h, d, l);
};
c.prototype.mul = function(e, t) {
e = new i(e, t);
return this.curve._wnafMul(this, e);
};
c.prototype.eq = function(e) {
if ("affine" === e.type) return this.eq(e.toJ());
if (this === e) return !0;
var t = this.z.redSqr(), r = e.z.redSqr();
if (0 !== this.x.redMul(r).redISub(e.x.redMul(t)).cmpn(0)) return !1;
var i = t.redMul(this.z), n = r.redMul(e.z);
return 0 === this.y.redMul(n).redISub(e.y.redMul(i)).cmpn(0);
};
c.prototype.eqXToP = function(e) {
var t = this.z.redSqr(), r = e.toRed(this.curve.red).redMul(t);
if (0 === this.x.cmp(r)) return !0;
for (var i = e.clone(), n = this.curve.redN.redMul(t); ;) {
i.iadd(this.curve.n);
if (i.cmp(this.curve.p) >= 0) return !1;
r.redIAdd(n);
if (0 === this.x.cmp(r)) return !0;
}
};
c.prototype.inspect = function() {
return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
};
c.prototype.isInfinity = function() {
return 0 === this.z.cmpn(0);
};
}, {
"../utils": 102,
"./base": 89,
"bn.js": 103,
inherits: 140
} ],
94: [ function(e, t, r) {
"use strict";
var i, n = r, a = e("hash.js"), o = e("./curve"), s = e("./utils").assert;
function f(e) {
"short" === e.type ? this.curve = new o.short(e) : "edwards" === e.type ? this.curve = new o.edwards(e) : this.curve = new o.mont(e);
this.g = this.curve.g;
this.n = this.curve.n;
this.hash = e.hash;
s(this.g.validate(), "Invalid curve");
s(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
}
n.PresetCurve = f;
function c(e, t) {
Object.defineProperty(n, e, {
configurable: !0,
enumerable: !0,
get: function() {
var r = new f(t);
Object.defineProperty(n, e, {
configurable: !0,
enumerable: !0,
value: r
});
return r;
}
});
}
c("p192", {
type: "short",
prime: "p192",
p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
hash: a.sha256,
gRed: !1,
g: [ "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811" ]
});
c("p224", {
type: "short",
prime: "p224",
p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
hash: a.sha256,
gRed: !1,
g: [ "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34" ]
});
c("p256", {
type: "short",
prime: null,
p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
hash: a.sha256,
gRed: !1,
g: [ "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5" ]
});
c("p384", {
type: "short",
prime: null,
p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
hash: a.sha384,
gRed: !1,
g: [ "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f" ]
});
c("p521", {
type: "short",
prime: null,
p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
hash: a.sha512,
gRed: !1,
g: [ "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650" ]
});
c("curve25519", {
type: "mont",
prime: "p25519",
p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
a: "76d06",
b: "1",
n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
hash: a.sha256,
gRed: !1,
g: [ "9" ]
});
c("ed25519", {
type: "edwards",
prime: "p25519",
p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
a: "-1",
c: "1",
d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
hash: a.sha256,
gRed: !1,
g: [ "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a", "6666666666666666666666666666666666666666666666666666666666666658" ]
});
try {
i = e("./precomputed/secp256k1");
} catch (e) {
i = void 0;
}
c("secp256k1", {
type: "short",
prime: "k256",
p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
a: "0",
b: "7",
n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
h: "1",
hash: a.sha256,
beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
basis: [ {
a: "3086d221a7d46bcde86c90e49284eb15",
b: "-e4437ed6010e88286f547fa90abfe4c3"
}, {
a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
b: "3086d221a7d46bcde86c90e49284eb15"
} ],
gRed: !1,
g: [ "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", i ]
});
}, {
"./curve": 91,
"./precomputed/secp256k1": 101,
"./utils": 102,
"hash.js": 125
} ],
95: [ function(e, t) {
"use strict";
var r = e("bn.js"), i = e("hmac-drbg"), n = e("../utils"), a = e("../curves"), o = e("brorand"), s = n.assert, f = e("./key"), c = e("./signature");
function u(e) {
if (!(this instanceof u)) return new u(e);
if ("string" == typeof e) {
s(a.hasOwnProperty(e), "Unknown curve " + e);
e = a[e];
}
e instanceof a.PresetCurve && (e = {
curve: e
});
this.curve = e.curve.curve;
this.n = this.curve.n;
this.nh = this.n.ushrn(1);
this.g = this.curve.g;
this.g = e.curve.g;
this.g.precompute(e.curve.n.bitLength() + 1);
this.hash = e.hash || e.curve.hash;
}
t.exports = u;
u.prototype.keyPair = function(e) {
return new f(this, e);
};
u.prototype.keyFromPrivate = function(e, t) {
return f.fromPrivate(this, e, t);
};
u.prototype.keyFromPublic = function(e, t) {
return f.fromPublic(this, e, t);
};
u.prototype.genKeyPair = function(e) {
e || (e = {});
for (var t = new i({
hash: this.hash,
pers: e.pers,
persEnc: e.persEnc || "utf8",
entropy: e.entropy || o(this.hash.hmacStrength),
entropyEnc: e.entropy && e.entropyEnc || "utf8",
nonce: this.n.toArray()
}), n = this.n.byteLength(), a = this.n.sub(new r(2)); ;) {
var s = new r(t.generate(n));
if (!(s.cmp(a) > 0)) {
s.iaddn(1);
return this.keyFromPrivate(s);
}
}
};
u.prototype._truncateToN = function(e, t) {
var r = 8 * e.byteLength() - this.n.bitLength();
r > 0 && (e = e.ushrn(r));
return !t && e.cmp(this.n) >= 0 ? e.sub(this.n) : e;
};
u.prototype.sign = function(e, t, n, a) {
if ("object" == typeof n) {
a = n;
n = null;
}
a || (a = {});
t = this.keyFromPrivate(t, n);
e = this._truncateToN(new r(e, 16));
for (var o = this.n.byteLength(), s = t.getPrivate().toArray("be", o), f = e.toArray("be", o), u = new i({
hash: this.hash,
entropy: s,
nonce: f,
pers: a.pers,
persEnc: a.persEnc || "utf8"
}), h = this.n.sub(new r(1)), d = 0; ;d++) {
var l = a.k ? a.k(d) : new r(u.generate(this.n.byteLength()));
if (!((l = this._truncateToN(l, !0)).cmpn(1) <= 0 || l.cmp(h) >= 0)) {
var p = this.g.mul(l);
if (!p.isInfinity()) {
var b = p.getX(), m = b.umod(this.n);
if (0 !== m.cmpn(0)) {
var g = l.invm(this.n).mul(m.mul(t.getPrivate()).iadd(e));
if (0 !== (g = g.umod(this.n)).cmpn(0)) {
var y = (p.getY().isOdd() ? 1 : 0) | (0 !== b.cmp(m) ? 2 : 0);
if (a.canonical && g.cmp(this.nh) > 0) {
g = this.n.sub(g);
y ^= 1;
}
return new c({
r: m,
s: g,
recoveryParam: y
});
}
}
}
}
}
};
u.prototype.verify = function(e, t, i, n) {
e = this._truncateToN(new r(e, 16));
i = this.keyFromPublic(i, n);
var a = (t = new c(t, "hex")).r, o = t.s;
if (a.cmpn(1) < 0 || a.cmp(this.n) >= 0) return !1;
if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0) return !1;
var s = o.invm(this.n), f = s.mul(e).umod(this.n), u = s.mul(a).umod(this.n);
if (!this.curve._maxwellTrick) {
var h;
return !(h = this.g.mulAdd(f, i.getPublic(), u)).isInfinity() && 0 === h.getX().umod(this.n).cmp(a);
}
return !(h = this.g.jmulAdd(f, i.getPublic(), u)).isInfinity() && h.eqXToP(a);
};
u.prototype.recoverPubKey = function(e, t, i, n) {
s((3 & i) === i, "The recovery param is more than two bits");
t = new c(t, n);
var a = this.n, o = new r(e), f = t.r, u = t.s, h = 1 & i, d = i >> 1;
if (f.cmp(this.curve.p.umod(this.curve.n)) >= 0 && d) throw new Error("Unable to find sencond key candinate");
f = d ? this.curve.pointFromX(f.add(this.curve.n), h) : this.curve.pointFromX(f, h);
var l = t.r.invm(a), p = a.sub(o).mul(l).umod(a), b = u.mul(l).umod(a);
return this.g.mulAdd(p, f, b);
};
u.prototype.getKeyRecoveryParam = function(e, t, r, i) {
if (null !== (t = new c(t, i)).recoveryParam) return t.recoveryParam;
for (var n = 0; n < 4; n++) {
var a;
try {
a = this.recoverPubKey(e, t, n);
} catch (e) {
continue;
}
if (a.eq(r)) return n;
}
throw new Error("Unable to find valid recovery factor");
};
}, {
"../curves": 94,
"../utils": 102,
"./key": 96,
"./signature": 97,
"bn.js": 103,
brorand: 18,
"hmac-drbg": 137
} ],
96: [ function(e, t) {
"use strict";
var r = e("bn.js"), i = e("../utils").assert;
function n(e, t) {
this.ec = e;
this.priv = null;
this.pub = null;
t.priv && this._importPrivate(t.priv, t.privEnc);
t.pub && this._importPublic(t.pub, t.pubEnc);
}
t.exports = n;
n.fromPublic = function(e, t, r) {
return t instanceof n ? t : new n(e, {
pub: t,
pubEnc: r
});
};
n.fromPrivate = function(e, t, r) {
return t instanceof n ? t : new n(e, {
priv: t,
privEnc: r
});
};
n.prototype.validate = function() {
var e = this.getPublic();
return e.isInfinity() ? {
result: !1,
reason: "Invalid public key"
} : e.validate() ? e.mul(this.ec.curve.n).isInfinity() ? {
result: !0,
reason: null
} : {
result: !1,
reason: "Public key * N != O"
} : {
result: !1,
reason: "Public key is not a point"
};
};
n.prototype.getPublic = function(e, t) {
if ("string" == typeof e) {
t = e;
e = null;
}
this.pub || (this.pub = this.ec.g.mul(this.priv));
return t ? this.pub.encode(t, e) : this.pub;
};
n.prototype.getPrivate = function(e) {
return "hex" === e ? this.priv.toString(16, 2) : this.priv;
};
n.prototype._importPrivate = function(e, t) {
this.priv = new r(e, t || 16);
this.priv = this.priv.umod(this.ec.curve.n);
};
n.prototype._importPublic = function(e, t) {
if (e.x || e.y) {
"mont" === this.ec.curve.type ? i(e.x, "Need x coordinate") : "short" !== this.ec.curve.type && "edwards" !== this.ec.curve.type || i(e.x && e.y, "Need both x and y coordinate");
this.pub = this.ec.curve.point(e.x, e.y);
} else this.pub = this.ec.curve.decodePoint(e, t);
};
n.prototype.derive = function(e) {
return e.mul(this.priv).getX();
};
n.prototype.sign = function(e, t, r) {
return this.ec.sign(e, this, t, r);
};
n.prototype.verify = function(e, t) {
return this.ec.verify(e, t, this);
};
n.prototype.inspect = function() {
return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
};
}, {
"../utils": 102,
"bn.js": 103
} ],
97: [ function(e, t) {
"use strict";
var r = e("bn.js"), i = e("../utils"), n = i.assert;
function a(e, t) {
if (e instanceof a) return e;
if (!this._importDER(e, t)) {
n(e.r && e.s, "Signature without r or s");
this.r = new r(e.r, 16);
this.s = new r(e.s, 16);
void 0 === e.recoveryParam ? this.recoveryParam = null : this.recoveryParam = e.recoveryParam;
}
}
t.exports = a;
function o() {
this.place = 0;
}
function s(e, t) {
var r = e[t.place++];
if (!(128 & r)) return r;
var i = 15 & r;
if (0 === i || i > 4) return !1;
for (var n = 0, a = 0, o = t.place; a < i; a++, o++) {
n <<= 8;
n |= e[o];
n >>>= 0;
}
if (n <= 127) return !1;
t.place = o;
return n;
}
function f(e) {
for (var t = 0, r = e.length - 1; !e[t] && !(128 & e[t + 1]) && t < r; ) t++;
return 0 === t ? e : e.slice(t);
}
a.prototype._importDER = function(e, t) {
e = i.toArray(e, t);
var n = new o();
if (48 !== e[n.place++]) return !1;
var a = s(e, n);
if (!1 === a) return !1;
if (a + n.place !== e.length) return !1;
if (2 !== e[n.place++]) return !1;
var f = s(e, n);
if (!1 === f) return !1;
var c = e.slice(n.place, f + n.place);
n.place += f;
if (2 !== e[n.place++]) return !1;
var u = s(e, n);
if (!1 === u) return !1;
if (e.length !== u + n.place) return !1;
var h = e.slice(n.place, u + n.place);
if (0 === c[0]) {
if (!(128 & c[1])) return !1;
c = c.slice(1);
}
if (0 === h[0]) {
if (!(128 & h[1])) return !1;
h = h.slice(1);
}
this.r = new r(c);
this.s = new r(h);
this.recoveryParam = null;
return !0;
};
function c(e, t) {
if (t < 128) e.push(t); else {
var r = 1 + (Math.log(t) / Math.LN2 >>> 3);
e.push(128 | r);
for (;--r; ) e.push(t >>> (r << 3) & 255);
e.push(t);
}
}
a.prototype.toDER = function(e) {
var t = this.r.toArray(), r = this.s.toArray();
128 & t[0] && (t = [ 0 ].concat(t));
128 & r[0] && (r = [ 0 ].concat(r));
t = f(t);
r = f(r);
for (;!(r[0] || 128 & r[1]); ) r = r.slice(1);
var n = [ 2 ];
c(n, t.length);
(n = n.concat(t)).push(2);
c(n, r.length);
var a = n.concat(r), o = [ 48 ];
c(o, a.length);
o = o.concat(a);
return i.encode(o, e);
};
}, {
"../utils": 102,
"bn.js": 103
} ],
98: [ function(e, t) {
"use strict";
var r = e("hash.js"), i = e("../curves"), n = e("../utils"), a = n.assert, o = n.parseBytes, s = e("./key"), f = e("./signature");
function c(e) {
a("ed25519" === e, "only tested with ed25519 so far");
if (!(this instanceof c)) return new c(e);
e = i[e].curve;
this.curve = e;
this.g = e.g;
this.g.precompute(e.n.bitLength() + 1);
this.pointClass = e.point().constructor;
this.encodingLength = Math.ceil(e.n.bitLength() / 8);
this.hash = r.sha512;
}
t.exports = c;
c.prototype.sign = function(e, t) {
e = o(e);
var r = this.keyFromSecret(t), i = this.hashInt(r.messagePrefix(), e), n = this.g.mul(i), a = this.encodePoint(n), s = this.hashInt(a, r.pubBytes(), e).mul(r.priv()), f = i.add(s).umod(this.curve.n);
return this.makeSignature({
R: n,
S: f,
Rencoded: a
});
};
c.prototype.verify = function(e, t, r) {
e = o(e);
t = this.makeSignature(t);
var i = this.keyFromPublic(r), n = this.hashInt(t.Rencoded(), i.pubBytes(), e), a = this.g.mul(t.S());
return t.R().add(i.pub().mul(n)).eq(a);
};
c.prototype.hashInt = function() {
for (var e = this.hash(), t = 0; t < arguments.length; t++) e.update(arguments[t]);
return n.intFromLE(e.digest()).umod(this.curve.n);
};
c.prototype.keyFromPublic = function(e) {
return s.fromPublic(this, e);
};
c.prototype.keyFromSecret = function(e) {
return s.fromSecret(this, e);
};
c.prototype.makeSignature = function(e) {
return e instanceof f ? e : new f(this, e);
};
c.prototype.encodePoint = function(e) {
var t = e.getY().toArray("le", this.encodingLength);
t[this.encodingLength - 1] |= e.getX().isOdd() ? 128 : 0;
return t;
};
c.prototype.decodePoint = function(e) {
var t = (e = n.parseBytes(e)).length - 1, r = e.slice(0, t).concat(-129 & e[t]), i = 0 != (128 & e[t]), a = n.intFromLE(r);
return this.curve.pointFromY(a, i);
};
c.prototype.encodeInt = function(e) {
return e.toArray("le", this.encodingLength);
};
c.prototype.decodeInt = function(e) {
return n.intFromLE(e);
};
c.prototype.isPoint = function(e) {
return e instanceof this.pointClass;
};
}, {
"../curves": 94,
"../utils": 102,
"./key": 99,
"./signature": 100,
"hash.js": 125
} ],
99: [ function(e, t) {
"use strict";
var r = e("../utils"), i = r.assert, n = r.parseBytes, a = r.cachedProperty;
function o(e, t) {
this.eddsa = e;
this._secret = n(t.secret);
e.isPoint(t.pub) ? this._pub = t.pub : this._pubBytes = n(t.pub);
}
o.fromPublic = function(e, t) {
return t instanceof o ? t : new o(e, {
pub: t
});
};
o.fromSecret = function(e, t) {
return t instanceof o ? t : new o(e, {
secret: t
});
};
o.prototype.secret = function() {
return this._secret;
};
a(o, "pubBytes", function() {
return this.eddsa.encodePoint(this.pub());
});
a(o, "pub", function() {
return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv());
});
a(o, "privBytes", function() {
var e = this.eddsa, t = this.hash(), r = e.encodingLength - 1, i = t.slice(0, e.encodingLength);
i[0] &= 248;
i[r] &= 127;
i[r] |= 64;
return i;
});
a(o, "priv", function() {
return this.eddsa.decodeInt(this.privBytes());
});
a(o, "hash", function() {
return this.eddsa.hash().update(this.secret()).digest();
});
a(o, "messagePrefix", function() {
return this.hash().slice(this.eddsa.encodingLength);
});
o.prototype.sign = function(e) {
i(this._secret, "KeyPair can only verify");
return this.eddsa.sign(e, this);
};
o.prototype.verify = function(e, t) {
return this.eddsa.verify(e, t, this);
};
o.prototype.getSecret = function(e) {
i(this._secret, "KeyPair is public only");
return r.encode(this.secret(), e);
};
o.prototype.getPublic = function(e) {
return r.encode(this.pubBytes(), e);
};
t.exports = o;
}, {
"../utils": 102
} ],
100: [ function(e, t) {
"use strict";
var r = e("bn.js"), i = e("../utils"), n = i.assert, a = i.cachedProperty, o = i.parseBytes;
function s(e, t) {
this.eddsa = e;
"object" != typeof t && (t = o(t));
Array.isArray(t) && (t = {
R: t.slice(0, e.encodingLength),
S: t.slice(e.encodingLength)
});
n(t.R && t.S, "Signature without R or S");
e.isPoint(t.R) && (this._R = t.R);
t.S instanceof r && (this._S = t.S);
this._Rencoded = Array.isArray(t.R) ? t.R : t.Rencoded;
this._Sencoded = Array.isArray(t.S) ? t.S : t.Sencoded;
}
a(s, "S", function() {
return this.eddsa.decodeInt(this.Sencoded());
});
a(s, "R", function() {
return this.eddsa.decodePoint(this.Rencoded());
});
a(s, "Rencoded", function() {
return this.eddsa.encodePoint(this.R());
});
a(s, "Sencoded", function() {
return this.eddsa.encodeInt(this.S());
});
s.prototype.toBytes = function() {
return this.Rencoded().concat(this.Sencoded());
};
s.prototype.toHex = function() {
return i.encode(this.toBytes(), "hex").toUpperCase();
};
t.exports = s;
}, {
"../utils": 102,
"bn.js": 103
} ],
101: [ function(e, t) {
t.exports = {
doubles: {
step: 4,
points: [ [ "e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a", "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821" ], [ "8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508", "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf" ], [ "175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739", "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695" ], [ "363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640", "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9" ], [ "8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c", "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36" ], [ "723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda", "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f" ], [ "eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa", "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999" ], [ "100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0", "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09" ], [ "e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d", "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d" ], [ "feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d", "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088" ], [ "da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1", "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d" ], [ "53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0", "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8" ], [ "8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047", "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a" ], [ "385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862", "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453" ], [ "6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7", "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160" ], [ "3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd", "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0" ], [ "85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83", "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6" ], [ "948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a", "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589" ], [ "6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8", "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17" ], [ "e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d", "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda" ], [ "e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725", "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd" ], [ "213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754", "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2" ], [ "4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c", "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6" ], [ "fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6", "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f" ], [ "76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39", "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01" ], [ "c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891", "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3" ], [ "d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b", "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f" ], [ "b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03", "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7" ], [ "e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d", "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78" ], [ "a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070", "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1" ], [ "90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4", "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150" ], [ "8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da", "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82" ], [ "e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11", "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc" ], [ "8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e", "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b" ], [ "e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41", "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51" ], [ "b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef", "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45" ], [ "d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8", "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120" ], [ "324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d", "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84" ], [ "4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96", "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d" ], [ "9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd", "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d" ], [ "6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5", "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8" ], [ "a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266", "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8" ], [ "7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71", "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac" ], [ "928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac", "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f" ], [ "85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751", "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962" ], [ "ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e", "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907" ], [ "827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241", "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec" ], [ "eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3", "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d" ], [ "e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f", "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414" ], [ "1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19", "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd" ], [ "146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be", "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0" ], [ "fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9", "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811" ], [ "da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2", "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1" ], [ "a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13", "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c" ], [ "174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c", "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73" ], [ "959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba", "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd" ], [ "d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151", "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405" ], [ "64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073", "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589" ], [ "8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458", "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e" ], [ "13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b", "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27" ], [ "bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366", "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1" ], [ "8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa", "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482" ], [ "8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0", "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945" ], [ "dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787", "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573" ], [ "f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e", "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82" ] ]
},
naf: {
wnd: 7,
points: [ [ "f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9", "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672" ], [ "2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4", "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6" ], [ "5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc", "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da" ], [ "acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe", "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37" ], [ "774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb", "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b" ], [ "f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8", "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81" ], [ "d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e", "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58" ], [ "defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34", "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77" ], [ "2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c", "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a" ], [ "352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5", "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c" ], [ "2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f", "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67" ], [ "9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714", "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402" ], [ "daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729", "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55" ], [ "c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db", "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482" ], [ "6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4", "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82" ], [ "1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5", "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396" ], [ "605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479", "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49" ], [ "62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d", "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf" ], [ "80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f", "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a" ], [ "7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb", "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7" ], [ "d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9", "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933" ], [ "49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963", "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a" ], [ "77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74", "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6" ], [ "f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530", "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37" ], [ "463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b", "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e" ], [ "f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247", "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6" ], [ "caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1", "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476" ], [ "2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120", "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40" ], [ "7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435", "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61" ], [ "754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18", "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683" ], [ "e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8", "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5" ], [ "186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb", "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b" ], [ "df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f", "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417" ], [ "5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143", "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868" ], [ "290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba", "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a" ], [ "af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45", "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6" ], [ "766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a", "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996" ], [ "59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e", "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e" ], [ "f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8", "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d" ], [ "7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c", "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2" ], [ "948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519", "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e" ], [ "7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab", "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437" ], [ "3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca", "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311" ], [ "d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf", "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4" ], [ "1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610", "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575" ], [ "733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4", "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d" ], [ "15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c", "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d" ], [ "a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940", "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629" ], [ "e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980", "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06" ], [ "311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3", "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374" ], [ "34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf", "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee" ], [ "f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63", "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1" ], [ "d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448", "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b" ], [ "32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf", "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661" ], [ "7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5", "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6" ], [ "ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6", "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e" ], [ "16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5", "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d" ], [ "eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99", "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc" ], [ "78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51", "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4" ], [ "494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5", "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c" ], [ "a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5", "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b" ], [ "c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997", "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913" ], [ "841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881", "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154" ], [ "5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5", "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865" ], [ "36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66", "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc" ], [ "336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726", "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224" ], [ "8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede", "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e" ], [ "1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94", "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6" ], [ "85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31", "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511" ], [ "29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51", "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b" ], [ "a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252", "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2" ], [ "4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5", "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c" ], [ "d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b", "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3" ], [ "ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4", "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d" ], [ "af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f", "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700" ], [ "e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889", "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4" ], [ "591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246", "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196" ], [ "11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984", "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4" ], [ "3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a", "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257" ], [ "cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030", "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13" ], [ "c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197", "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096" ], [ "c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593", "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38" ], [ "a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef", "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f" ], [ "347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38", "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448" ], [ "da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a", "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a" ], [ "c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111", "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4" ], [ "4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502", "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437" ], [ "3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea", "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7" ], [ "cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26", "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d" ], [ "b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986", "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a" ], [ "d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e", "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54" ], [ "48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4", "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77" ], [ "dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda", "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517" ], [ "6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859", "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10" ], [ "e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f", "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125" ], [ "eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c", "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e" ], [ "13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942", "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1" ], [ "ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a", "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2" ], [ "b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80", "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423" ], [ "ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d", "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8" ], [ "8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1", "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758" ], [ "52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63", "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375" ], [ "e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352", "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d" ], [ "7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193", "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec" ], [ "5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00", "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0" ], [ "32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58", "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c" ], [ "e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7", "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4" ], [ "8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8", "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f" ], [ "4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e", "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649" ], [ "3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d", "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826" ], [ "674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b", "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5" ], [ "d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f", "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87" ], [ "30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6", "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b" ], [ "be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297", "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc" ], [ "93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a", "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c" ], [ "b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c", "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f" ], [ "d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52", "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a" ], [ "d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb", "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46" ], [ "463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065", "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f" ], [ "7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917", "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03" ], [ "74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9", "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08" ], [ "30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3", "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8" ], [ "9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57", "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373" ], [ "176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66", "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3" ], [ "75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8", "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8" ], [ "809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721", "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1" ], [ "1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180", "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9" ] ]
}
};
}, {} ],
102: [ function(e, t, r) {
"use strict";
var i = r, n = e("bn.js"), a = e("minimalistic-assert"), o = e("minimalistic-crypto-utils");
i.assert = a;
i.toArray = o.toArray;
i.zero2 = o.zero2;
i.toHex = o.toHex;
i.encode = o.encode;
i.getNAF = function(e, t, r) {
var i = new Array(Math.max(e.bitLength(), r) + 1);
i.fill(0);
for (var n = 1 << t + 1, a = e.clone(), o = 0; o < i.length; o++) {
var s, f = a.andln(n - 1);
if (a.isOdd()) {
s = f > (n >> 1) - 1 ? (n >> 1) - f : f;
a.isubn(s);
} else s = 0;
i[o] = s;
a.iushrn(1);
}
return i;
};
i.getJSF = function(e, t) {
var r = [ [], [] ];
e = e.clone();
t = t.clone();
for (var i = 0, n = 0; e.cmpn(-i) > 0 || t.cmpn(-n) > 0; ) {
var a, o, s = e.andln(3) + i & 3, f = t.andln(3) + n & 3;
3 === s && (s = -1);
3 === f && (f = -1);
a = 0 == (1 & s) ? 0 : 3 != (c = e.andln(7) + i & 7) && 5 !== c || 2 !== f ? s : -s;
r[0].push(a);
if (0 == (1 & f)) o = 0; else {
var c;
o = 3 != (c = t.andln(7) + n & 7) && 5 !== c || 2 !== s ? f : -f;
}
r[1].push(o);
2 * i === a + 1 && (i = 1 - i);
2 * n === o + 1 && (n = 1 - n);
e.iushrn(1);
t.iushrn(1);
}
return r;
};
i.cachedProperty = function(e, t, r) {
var i = "_" + t;
e.prototype[t] = function() {
return void 0 !== this[i] ? this[i] : this[i] = r.call(this);
};
};
i.parseBytes = function(e) {
return "string" == typeof e ? i.toArray(e, "hex") : e;
};
i.intFromLE = function(e) {
return new n(e, "hex", "le");
};
}, {
"bn.js": 103,
"minimalistic-assert": 145,
"minimalistic-crypto-utils": 146
} ],
103: [ function(e, t, r) {
arguments[4][15][0].apply(r, arguments);
}, {
buffer: 19,
dup: 15
} ],
104: [ function(e, t) {
t.exports = {
_from: "elliptic@^6.5.2",
_id: "elliptic@6.5.3",
_inBundle: !1,
_integrity: "sha1-y1nrLv2vc6C9eMzXAVpirW4Pk9Y=",
_location: "/elliptic",
_phantomChildren: {},
_requested: {
type: "range",
registry: !0,
raw: "elliptic@^6.5.2",
name: "elliptic",
escapedName: "elliptic",
rawSpec: "^6.5.2",
saveSpec: null,
fetchSpec: "^6.5.2"
},
_requiredBy: [ "/browserify-sign", "/create-ecdh" ],
_resolved: "https://registry.npm.taobao.org/elliptic/download/elliptic-6.5.3.tgz?cache=0&sync_timestamp=1592492754083&other_urls=https%3A%2F%2Fregistry.npm.taobao.org%2Felliptic%2Fdownload%2Felliptic-6.5.3.tgz",
_shasum: "cb59eb2efdaf73a0bd78ccd7015a62ad6e0f93d6",
_spec: "elliptic@^6.5.2",
_where: "/Users/nantas/jenkins/workspace/Creator_2D/fireball/mac/fireball/dist/CocosCreator.app/Contents/Resources/app/node_modules/browserify-sign",
author: {
name: "Fedor Indutny",
email: "fedor@indutny.com"
},
bugs: {
url: "https://github.com/indutny/elliptic/issues"
},
bundleDependencies: !1,
dependencies: {
"bn.js": "^4.4.0",
brorand: "^1.0.1",
"hash.js": "^1.0.0",
"hmac-drbg": "^1.0.0",
inherits: "^2.0.1",
"minimalistic-assert": "^1.0.0",
"minimalistic-crypto-utils": "^1.0.0"
},
deprecated: !1,
description: "EC cryptography",
devDependencies: {
brfs: "^1.4.3",
coveralls: "^3.0.8",
grunt: "^1.0.4",
"grunt-browserify": "^5.0.0",
"grunt-cli": "^1.2.0",
"grunt-contrib-connect": "^1.0.0",
"grunt-contrib-copy": "^1.0.0",
"grunt-contrib-uglify": "^1.0.1",
"grunt-mocha-istanbul": "^3.0.1",
"grunt-saucelabs": "^9.0.1",
istanbul: "^0.4.2",
jscs: "^3.0.7",
jshint: "^2.10.3",
mocha: "^6.2.2"
},
files: [ "lib" ],
homepage: "https://github.com/indutny/elliptic",
keywords: [ "EC", "Elliptic", "curve", "Cryptography" ],
license: "MIT",
main: "lib/elliptic.js",
name: "elliptic",
repository: {
type: "git",
url: "git+ssh://git@github.com/indutny/elliptic.git"
},
scripts: {
jscs: "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
jshint: "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
lint: "npm run jscs && npm run jshint",
test: "npm run lint && npm run unit",
unit: "istanbul test _mocha --reporter=spec test/index.js",
version: "grunt dist && git add dist/"
},
version: "6.5.3"
};
}, {} ],
105: [ function(e, t) {
function r() {
this._events = this._events || {};
this._maxListeners = this._maxListeners || void 0;
}
t.exports = r;
r.EventEmitter = r;
r.prototype._events = void 0;
r.prototype._maxListeners = void 0;
r.defaultMaxListeners = 10;
r.prototype.setMaxListeners = function(e) {
if (!(t = e, "number" == typeof t) || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
var t;
this._maxListeners = e;
return this;
};
r.prototype.emit = function(e) {
var t, r, o, s, f, c;
this._events || (this._events = {});
if ("error" === e && (!this._events.error || n(this._events.error) && !this._events.error.length)) {
if ((t = arguments[1]) instanceof Error) throw t;
var u = new Error('Uncaught, unspecified "error" event. (' + t + ")");
u.context = t;
throw u;
}
if (a(r = this._events[e])) return !1;
if (i(r)) switch (arguments.length) {
case 1:
r.call(this);
break;

case 2:
r.call(this, arguments[1]);
break;

case 3:
r.call(this, arguments[1], arguments[2]);
break;

default:
s = Array.prototype.slice.call(arguments, 1);
r.apply(this, s);
} else if (n(r)) {
s = Array.prototype.slice.call(arguments, 1);
o = (c = r.slice()).length;
for (f = 0; f < o; f++) c[f].apply(this, s);
}
return !0;
};
r.prototype.addListener = function(e, t) {
var o;
if (!i(t)) throw TypeError("listener must be a function");
this._events || (this._events = {});
this._events.newListener && this.emit("newListener", e, i(t.listener) ? t.listener : t);
this._events[e] ? n(this._events[e]) ? this._events[e].push(t) : this._events[e] = [ this._events[e], t ] : this._events[e] = t;
if (n(this._events[e]) && !this._events[e].warned && (o = a(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners) && o > 0 && this._events[e].length > o) {
this._events[e].warned = !0;
console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length);
"function" == typeof console.trace && console.trace();
}
return this;
};
r.prototype.on = r.prototype.addListener;
r.prototype.once = function(e, t) {
if (!i(t)) throw TypeError("listener must be a function");
var r = !1;
function n() {
this.removeListener(e, n);
if (!r) {
r = !0;
t.apply(this, arguments);
}
}
n.listener = t;
this.on(e, n);
return this;
};
r.prototype.removeListener = function(e, t) {
var r, a, o, s;
if (!i(t)) throw TypeError("listener must be a function");
if (!this._events || !this._events[e]) return this;
o = (r = this._events[e]).length;
a = -1;
if (r === t || i(r.listener) && r.listener === t) {
delete this._events[e];
this._events.removeListener && this.emit("removeListener", e, t);
} else if (n(r)) {
for (s = o; s-- > 0; ) if (r[s] === t || r[s].listener && r[s].listener === t) {
a = s;
break;
}
if (a < 0) return this;
if (1 === r.length) {
r.length = 0;
delete this._events[e];
} else r.splice(a, 1);
this._events.removeListener && this.emit("removeListener", e, t);
}
return this;
};
r.prototype.removeAllListeners = function(e) {
var t, r;
if (!this._events) return this;
if (!this._events.removeListener) {
0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e];
return this;
}
if (0 === arguments.length) {
for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
this.removeAllListeners("removeListener");
this._events = {};
return this;
}
if (i(r = this._events[e])) this.removeListener(e, r); else if (r) for (;r.length; ) this.removeListener(e, r[r.length - 1]);
delete this._events[e];
return this;
};
r.prototype.listeners = function(e) {
return this._events && this._events[e] ? i(this._events[e]) ? [ this._events[e] ] : this._events[e].slice() : [];
};
r.prototype.listenerCount = function(e) {
if (this._events) {
var t = this._events[e];
if (i(t)) return 1;
if (t) return t.length;
}
return 0;
};
r.listenerCount = function(e, t) {
return e.listenerCount(t);
};
function i(e) {
return "function" == typeof e;
}
function n(e) {
return "object" == typeof e && null !== e;
}
function a(e) {
return void 0 === e;
}
}, {} ],
106: [ function(e, t) {
var r = e("safe-buffer").Buffer, i = e("md5.js");
t.exports = function(e, t, n, a) {
r.isBuffer(e) || (e = r.from(e, "binary"));
if (t) {
r.isBuffer(t) || (t = r.from(t, "binary"));
if (8 !== t.length) throw new RangeError("salt should be Buffer with 8 byte length");
}
for (var o = n / 8, s = r.alloc(o), f = r.alloc(a || 0), c = r.alloc(0); o > 0 || a > 0; ) {
var u = new i();
u.update(c);
u.update(e);
t && u.update(t);
c = u.digest();
var h = 0;
if (o > 0) {
var d = s.length - o;
h = Math.min(o, c.length);
c.copy(s, d, 0, h);
o -= h;
}
if (h < c.length && a > 0) {
var l = f.length - a, p = Math.min(a, c.length - h);
c.copy(f, l, h, h + p);
a -= p;
}
}
c.fill(0);
return {
key: s,
iv: f
};
};
}, {
"md5.js": 142,
"safe-buffer": 185
} ],
107: [ function(e, t) {
"use strict";
var r = e("safe-buffer").Buffer, i = e("readable-stream").Transform;
function n(e, t) {
if (!r.isBuffer(e) && "string" != typeof e) throw new TypeError(t + " must be a string or a buffer");
}
function a(e) {
i.call(this);
this._block = r.allocUnsafe(e);
this._blockSize = e;
this._blockOffset = 0;
this._length = [ 0, 0, 0, 0 ];
this._finalized = !1;
}
e("inherits")(a, i);
a.prototype._transform = function(e, t, r) {
var i = null;
try {
this.update(e, t);
} catch (e) {
i = e;
}
r(i);
};
a.prototype._flush = function(e) {
var t = null;
try {
this.push(this.digest());
} catch (e) {
t = e;
}
e(t);
};
a.prototype.update = function(e, t) {
n(e, "Data");
if (this._finalized) throw new Error("Digest already called");
r.isBuffer(e) || (e = r.from(e, t));
for (var i = this._block, a = 0; this._blockOffset + e.length - a >= this._blockSize; ) {
for (var o = this._blockOffset; o < this._blockSize; ) i[o++] = e[a++];
this._update();
this._blockOffset = 0;
}
for (;a < e.length; ) i[this._blockOffset++] = e[a++];
for (var s = 0, f = 8 * e.length; f > 0; ++s) {
this._length[s] += f;
(f = this._length[s] / 4294967296 | 0) > 0 && (this._length[s] -= 4294967296 * f);
}
return this;
};
a.prototype._update = function() {
throw new Error("_update is not implemented");
};
a.prototype.digest = function(e) {
if (this._finalized) throw new Error("Digest already called");
this._finalized = !0;
var t = this._digest();
void 0 !== e && (t = t.toString(e));
this._block.fill(0);
this._blockOffset = 0;
for (var r = 0; r < 4; ++r) this._length[r] = 0;
return t;
};
a.prototype._digest = function() {
throw new Error("_digest is not implemented");
};
t.exports = a;
}, {
inherits: 140,
"readable-stream": 122,
"safe-buffer": 123
} ],
108: [ function(e, t, r) {
arguments[4][48][0].apply(r, arguments);
}, {
dup: 48
} ],
109: [ function(e, t, r) {
arguments[4][49][0].apply(r, arguments);
}, {
"./_stream_readable": 111,
"./_stream_writable": 113,
_process: 159,
dup: 49,
inherits: 140
} ],
110: [ function(e, t, r) {
arguments[4][50][0].apply(r, arguments);
}, {
"./_stream_transform": 112,
dup: 50,
inherits: 140
} ],
111: [ function(e, t, r) {
arguments[4][51][0].apply(r, arguments);
}, {
"../errors": 108,
"./_stream_duplex": 109,
"./internal/streams/async_iterator": 114,
"./internal/streams/buffer_list": 115,
"./internal/streams/destroy": 116,
"./internal/streams/from": 118,
"./internal/streams/state": 120,
"./internal/streams/stream": 121,
_process: 159,
buffer: 66,
dup: 51,
events: 105,
inherits: 140,
"string_decoder/": 124,
util: 19
} ],
112: [ function(e, t, r) {
arguments[4][52][0].apply(r, arguments);
}, {
"../errors": 108,
"./_stream_duplex": 109,
dup: 52,
inherits: 140
} ],
113: [ function(e, t, r) {
arguments[4][53][0].apply(r, arguments);
}, {
"../errors": 108,
"./_stream_duplex": 109,
"./internal/streams/destroy": 116,
"./internal/streams/state": 120,
"./internal/streams/stream": 121,
_process: 159,
buffer: 66,
dup: 53,
inherits: 140,
"util-deprecate": 196
} ],
114: [ function(e, t, r) {
arguments[4][54][0].apply(r, arguments);
}, {
"./end-of-stream": 117,
_process: 159,
dup: 54
} ],
115: [ function(e, t, r) {
arguments[4][55][0].apply(r, arguments);
}, {
buffer: 66,
dup: 55,
util: 19
} ],
116: [ function(e, t, r) {
arguments[4][56][0].apply(r, arguments);
}, {
_process: 159,
dup: 56
} ],
117: [ function(e, t, r) {
arguments[4][57][0].apply(r, arguments);
}, {
"../../../errors": 108,
dup: 57
} ],
118: [ function(e, t, r) {
arguments[4][58][0].apply(r, arguments);
}, {
dup: 58
} ],
119: [ function(e, t, r) {
arguments[4][59][0].apply(r, arguments);
}, {
"../../../errors": 108,
"./end-of-stream": 117,
dup: 59
} ],
120: [ function(e, t, r) {
arguments[4][60][0].apply(r, arguments);
}, {
"../../../errors": 108,
dup: 60
} ],
121: [ function(e, t, r) {
arguments[4][61][0].apply(r, arguments);
}, {
dup: 61,
events: 105
} ],
122: [ function(e, t, r) {
arguments[4][62][0].apply(r, arguments);
}, {
"./lib/_stream_duplex.js": 109,
"./lib/_stream_passthrough.js": 110,
"./lib/_stream_readable.js": 111,
"./lib/_stream_transform.js": 112,
"./lib/_stream_writable.js": 113,
"./lib/internal/streams/end-of-stream.js": 117,
"./lib/internal/streams/pipeline.js": 119,
dup: 62
} ],
123: [ function(e, t, r) {
arguments[4][63][0].apply(r, arguments);
}, {
buffer: 66,
dup: 63
} ],
124: [ function(e, t, r) {
arguments[4][64][0].apply(r, arguments);
}, {
dup: 64,
"safe-buffer": 123
} ],
125: [ function(e, t, r) {
var i = r;
i.utils = e("./hash/utils");
i.common = e("./hash/common");
i.sha = e("./hash/sha");
i.ripemd = e("./hash/ripemd");
i.hmac = e("./hash/hmac");
i.sha1 = i.sha.sha1;
i.sha256 = i.sha.sha256;
i.sha224 = i.sha.sha224;
i.sha384 = i.sha.sha384;
i.sha512 = i.sha.sha512;
i.ripemd160 = i.ripemd.ripemd160;
}, {
"./hash/common": 126,
"./hash/hmac": 127,
"./hash/ripemd": 128,
"./hash/sha": 129,
"./hash/utils": 136
} ],
126: [ function(e, t, r) {
"use strict";
var i = e("./utils"), n = e("minimalistic-assert");
function a() {
this.pending = null;
this.pendingTotal = 0;
this.blockSize = this.constructor.blockSize;
this.outSize = this.constructor.outSize;
this.hmacStrength = this.constructor.hmacStrength;
this.padLength = this.constructor.padLength / 8;
this.endian = "big";
this._delta8 = this.blockSize / 8;
this._delta32 = this.blockSize / 32;
}
r.BlockHash = a;
a.prototype.update = function(e, t) {
e = i.toArray(e, t);
this.pending ? this.pending = this.pending.concat(e) : this.pending = e;
this.pendingTotal += e.length;
if (this.pending.length >= this._delta8) {
var r = (e = this.pending).length % this._delta8;
this.pending = e.slice(e.length - r, e.length);
0 === this.pending.length && (this.pending = null);
e = i.join32(e, 0, e.length - r, this.endian);
for (var n = 0; n < e.length; n += this._delta32) this._update(e, n, n + this._delta32);
}
return this;
};
a.prototype.digest = function(e) {
this.update(this._pad());
n(null === this.pending);
return this._digest(e);
};
a.prototype._pad = function() {
var e = this.pendingTotal, t = this._delta8, r = t - (e + this.padLength) % t, i = new Array(r + this.padLength);
i[0] = 128;
for (var n = 1; n < r; n++) i[n] = 0;
e <<= 3;
if ("big" === this.endian) {
for (var a = 8; a < this.padLength; a++) i[n++] = 0;
i[n++] = 0;
i[n++] = 0;
i[n++] = 0;
i[n++] = 0;
i[n++] = e >>> 24 & 255;
i[n++] = e >>> 16 & 255;
i[n++] = e >>> 8 & 255;
i[n++] = 255 & e;
} else {
i[n++] = 255 & e;
i[n++] = e >>> 8 & 255;
i[n++] = e >>> 16 & 255;
i[n++] = e >>> 24 & 255;
i[n++] = 0;
i[n++] = 0;
i[n++] = 0;
i[n++] = 0;
for (a = 8; a < this.padLength; a++) i[n++] = 0;
}
return i;
};
}, {
"./utils": 136,
"minimalistic-assert": 145
} ],
127: [ function(e, t) {
"use strict";
var r = e("./utils"), i = e("minimalistic-assert");
function n(e, t, i) {
if (!(this instanceof n)) return new n(e, t, i);
this.Hash = e;
this.blockSize = e.blockSize / 8;
this.outSize = e.outSize / 8;
this.inner = null;
this.outer = null;
this._init(r.toArray(t, i));
}
t.exports = n;
n.prototype._init = function(e) {
e.length > this.blockSize && (e = new this.Hash().update(e).digest());
i(e.length <= this.blockSize);
for (var t = e.length; t < this.blockSize; t++) e.push(0);
for (t = 0; t < e.length; t++) e[t] ^= 54;
this.inner = new this.Hash().update(e);
for (t = 0; t < e.length; t++) e[t] ^= 106;
this.outer = new this.Hash().update(e);
};
n.prototype.update = function(e, t) {
this.inner.update(e, t);
return this;
};
n.prototype.digest = function(e) {
this.outer.update(this.inner.digest());
return this.outer.digest(e);
};
}, {
"./utils": 136,
"minimalistic-assert": 145
} ],
128: [ function(e, t, r) {
"use strict";
var i = e("./utils"), n = e("./common"), a = i.rotl32, o = i.sum32, s = i.sum32_3, f = i.sum32_4, c = n.BlockHash;
function u() {
if (!(this instanceof u)) return new u();
c.call(this);
this.h = [ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ];
this.endian = "little";
}
i.inherits(u, c);
r.ripemd160 = u;
u.blockSize = 512;
u.outSize = 160;
u.hmacStrength = 192;
u.padLength = 64;
u.prototype._update = function(e, t) {
for (var r = this.h[0], i = this.h[1], n = this.h[2], c = this.h[3], u = this.h[4], y = r, v = i, _ = n, w = c, M = u, S = 0; S < 80; S++) {
var E = o(a(f(r, h(S, i, n, c), e[p[S] + t], d(S)), m[S]), u);
r = u;
u = c;
c = a(n, 10);
n = i;
i = E;
E = o(a(f(y, h(79 - S, v, _, w), e[b[S] + t], l(S)), g[S]), M);
y = M;
M = w;
w = a(_, 10);
_ = v;
v = E;
}
E = s(this.h[1], n, w);
this.h[1] = s(this.h[2], c, M);
this.h[2] = s(this.h[3], u, y);
this.h[3] = s(this.h[4], r, v);
this.h[4] = s(this.h[0], i, _);
this.h[0] = E;
};
u.prototype._digest = function(e) {
return "hex" === e ? i.toHex32(this.h, "little") : i.split32(this.h, "little");
};
function h(e, t, r, i) {
return e <= 15 ? t ^ r ^ i : e <= 31 ? t & r | ~t & i : e <= 47 ? (t | ~r) ^ i : e <= 63 ? t & i | r & ~i : t ^ (r | ~i);
}
function d(e) {
return e <= 15 ? 0 : e <= 31 ? 1518500249 : e <= 47 ? 1859775393 : e <= 63 ? 2400959708 : 2840853838;
}
function l(e) {
return e <= 15 ? 1352829926 : e <= 31 ? 1548603684 : e <= 47 ? 1836072691 : e <= 63 ? 2053994217 : 0;
}
var p = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13 ], b = [ 5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11 ], m = [ 11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6 ], g = [ 8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11 ];
}, {
"./common": 126,
"./utils": 136
} ],
129: [ function(e, t, r) {
"use strict";
r.sha1 = e("./sha/1");
r.sha224 = e("./sha/224");
r.sha256 = e("./sha/256");
r.sha384 = e("./sha/384");
r.sha512 = e("./sha/512");
}, {
"./sha/1": 130,
"./sha/224": 131,
"./sha/256": 132,
"./sha/384": 133,
"./sha/512": 134
} ],
130: [ function(e, t) {
"use strict";
var r = e("../utils"), i = e("../common"), n = e("./common"), a = r.rotl32, o = r.sum32, s = r.sum32_5, f = n.ft_1, c = i.BlockHash, u = [ 1518500249, 1859775393, 2400959708, 3395469782 ];
function h() {
if (!(this instanceof h)) return new h();
c.call(this);
this.h = [ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ];
this.W = new Array(80);
}
r.inherits(h, c);
t.exports = h;
h.blockSize = 512;
h.outSize = 160;
h.hmacStrength = 80;
h.padLength = 64;
h.prototype._update = function(e, t) {
for (var r = this.W, i = 0; i < 16; i++) r[i] = e[t + i];
for (;i < r.length; i++) r[i] = a(r[i - 3] ^ r[i - 8] ^ r[i - 14] ^ r[i - 16], 1);
var n = this.h[0], c = this.h[1], h = this.h[2], d = this.h[3], l = this.h[4];
for (i = 0; i < r.length; i++) {
var p = ~~(i / 20), b = s(a(n, 5), f(p, c, h, d), l, r[i], u[p]);
l = d;
d = h;
h = a(c, 30);
c = n;
n = b;
}
this.h[0] = o(this.h[0], n);
this.h[1] = o(this.h[1], c);
this.h[2] = o(this.h[2], h);
this.h[3] = o(this.h[3], d);
this.h[4] = o(this.h[4], l);
};
h.prototype._digest = function(e) {
return "hex" === e ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
};
}, {
"../common": 126,
"../utils": 136,
"./common": 135
} ],
131: [ function(e, t) {
"use strict";
var r = e("../utils"), i = e("./256");
function n() {
if (!(this instanceof n)) return new n();
i.call(this);
this.h = [ 3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428 ];
}
r.inherits(n, i);
t.exports = n;
n.blockSize = 512;
n.outSize = 224;
n.hmacStrength = 192;
n.padLength = 64;
n.prototype._digest = function(e) {
return "hex" === e ? r.toHex32(this.h.slice(0, 7), "big") : r.split32(this.h.slice(0, 7), "big");
};
}, {
"../utils": 136,
"./256": 132
} ],
132: [ function(e, t) {
"use strict";
var r = e("../utils"), i = e("../common"), n = e("./common"), a = e("minimalistic-assert"), o = r.sum32, s = r.sum32_4, f = r.sum32_5, c = n.ch32, u = n.maj32, h = n.s0_256, d = n.s1_256, l = n.g0_256, p = n.g1_256, b = i.BlockHash, m = [ 1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298 ];
function g() {
if (!(this instanceof g)) return new g();
b.call(this);
this.h = [ 1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225 ];
this.k = m;
this.W = new Array(64);
}
r.inherits(g, b);
t.exports = g;
g.blockSize = 512;
g.outSize = 256;
g.hmacStrength = 192;
g.padLength = 64;
g.prototype._update = function(e, t) {
for (var r = this.W, i = 0; i < 16; i++) r[i] = e[t + i];
for (;i < r.length; i++) r[i] = s(p(r[i - 2]), r[i - 7], l(r[i - 15]), r[i - 16]);
var n = this.h[0], b = this.h[1], m = this.h[2], g = this.h[3], y = this.h[4], v = this.h[5], _ = this.h[6], w = this.h[7];
a(this.k.length === r.length);
for (i = 0; i < r.length; i++) {
var M = f(w, d(y), c(y, v, _), this.k[i], r[i]), S = o(h(n), u(n, b, m));
w = _;
_ = v;
v = y;
y = o(g, M);
g = m;
m = b;
b = n;
n = o(M, S);
}
this.h[0] = o(this.h[0], n);
this.h[1] = o(this.h[1], b);
this.h[2] = o(this.h[2], m);
this.h[3] = o(this.h[3], g);
this.h[4] = o(this.h[4], y);
this.h[5] = o(this.h[5], v);
this.h[6] = o(this.h[6], _);
this.h[7] = o(this.h[7], w);
};
g.prototype._digest = function(e) {
return "hex" === e ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
};
}, {
"../common": 126,
"../utils": 136,
"./common": 135,
"minimalistic-assert": 145
} ],
133: [ function(e, t) {
"use strict";
var r = e("../utils"), i = e("./512");
function n() {
if (!(this instanceof n)) return new n();
i.call(this);
this.h = [ 3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428 ];
}
r.inherits(n, i);
t.exports = n;
n.blockSize = 1024;
n.outSize = 384;
n.hmacStrength = 192;
n.padLength = 128;
n.prototype._digest = function(e) {
return "hex" === e ? r.toHex32(this.h.slice(0, 12), "big") : r.split32(this.h.slice(0, 12), "big");
};
}, {
"../utils": 136,
"./512": 134
} ],
134: [ function(e, t) {
"use strict";
var r = e("../utils"), i = e("../common"), n = e("minimalistic-assert"), a = r.rotr64_hi, o = r.rotr64_lo, s = r.shr64_hi, f = r.shr64_lo, c = r.sum64, u = r.sum64_hi, h = r.sum64_lo, d = r.sum64_4_hi, l = r.sum64_4_lo, p = r.sum64_5_hi, b = r.sum64_5_lo, m = i.BlockHash, g = [ 1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591 ];
function y() {
if (!(this instanceof y)) return new y();
m.call(this);
this.h = [ 1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209 ];
this.k = g;
this.W = new Array(160);
}
r.inherits(y, m);
t.exports = y;
y.blockSize = 1024;
y.outSize = 512;
y.hmacStrength = 192;
y.padLength = 128;
y.prototype._prepareBlock = function(e, t) {
for (var r = this.W, i = 0; i < 32; i++) r[i] = e[t + i];
for (;i < r.length; i += 2) {
var n = T(r[i - 4], r[i - 3]), a = B(r[i - 4], r[i - 3]), o = r[i - 14], s = r[i - 13], f = x(r[i - 30], r[i - 29]), c = R(r[i - 30], r[i - 29]), u = r[i - 32], h = r[i - 31];
r[i] = d(n, a, o, s, f, c, u, h);
r[i + 1] = l(n, a, o, s, f, c, u, h);
}
};
y.prototype._update = function(e, t) {
this._prepareBlock(e, t);
var r = this.W, i = this.h[0], a = this.h[1], o = this.h[2], s = this.h[3], f = this.h[4], d = this.h[5], l = this.h[6], m = this.h[7], g = this.h[8], y = this.h[9], x = this.h[10], R = this.h[11], T = this.h[12], B = this.h[13], j = this.h[14], I = this.h[15];
n(this.k.length === r.length);
for (var P = 0; P < r.length; P += 2) {
var C = j, O = I, L = k(g, y), N = A(g, y), D = v(g, 0, x, 0, T), U = _(0, y, 0, R, 0, B), q = this.k[P], z = this.k[P + 1], F = r[P], K = r[P + 1], H = p(C, O, L, N, D, U, q, z, F, K), W = b(C, O, L, N, D, U, q, z, F, K);
C = S(i, a);
O = E(i, a);
L = w(i, 0, o, 0, f);
N = M(0, a, 0, s, 0, d);
var V = u(C, O, L, N), Y = h(C, O, L, N);
j = T;
I = B;
T = x;
B = R;
x = g;
R = y;
g = u(l, m, H, W);
y = h(m, m, H, W);
l = f;
m = d;
f = o;
d = s;
o = i;
s = a;
i = u(H, W, V, Y);
a = h(H, W, V, Y);
}
c(this.h, 0, i, a);
c(this.h, 2, o, s);
c(this.h, 4, f, d);
c(this.h, 6, l, m);
c(this.h, 8, g, y);
c(this.h, 10, x, R);
c(this.h, 12, T, B);
c(this.h, 14, j, I);
};
y.prototype._digest = function(e) {
return "hex" === e ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
};
function v(e, t, r, i, n) {
var a = e & r ^ ~e & n;
a < 0 && (a += 4294967296);
return a;
}
function _(e, t, r, i, n, a) {
var o = t & i ^ ~t & a;
o < 0 && (o += 4294967296);
return o;
}
function w(e, t, r, i, n) {
var a = e & r ^ e & n ^ r & n;
a < 0 && (a += 4294967296);
return a;
}
function M(e, t, r, i, n, a) {
var o = t & i ^ t & a ^ i & a;
o < 0 && (o += 4294967296);
return o;
}
function S(e, t) {
var r = a(e, t, 28) ^ a(t, e, 2) ^ a(t, e, 7);
r < 0 && (r += 4294967296);
return r;
}
function E(e, t) {
var r = o(e, t, 28) ^ o(t, e, 2) ^ o(t, e, 7);
r < 0 && (r += 4294967296);
return r;
}
function k(e, t) {
var r = a(e, t, 14) ^ a(e, t, 18) ^ a(t, e, 9);
r < 0 && (r += 4294967296);
return r;
}
function A(e, t) {
var r = o(e, t, 14) ^ o(e, t, 18) ^ o(t, e, 9);
r < 0 && (r += 4294967296);
return r;
}
function x(e, t) {
var r = a(e, t, 1) ^ a(e, t, 8) ^ s(e, t, 7);
r < 0 && (r += 4294967296);
return r;
}
function R(e, t) {
var r = o(e, t, 1) ^ o(e, t, 8) ^ f(e, t, 7);
r < 0 && (r += 4294967296);
return r;
}
function T(e, t) {
var r = a(e, t, 19) ^ a(t, e, 29) ^ s(e, t, 6);
r < 0 && (r += 4294967296);
return r;
}
function B(e, t) {
var r = o(e, t, 19) ^ o(t, e, 29) ^ f(e, t, 6);
r < 0 && (r += 4294967296);
return r;
}
}, {
"../common": 126,
"../utils": 136,
"minimalistic-assert": 145
} ],
135: [ function(e, t, r) {
"use strict";
var i = e("../utils").rotr32;
r.ft_1 = function(e, t, r, i) {
return 0 === e ? n(t, r, i) : 1 === e || 3 === e ? o(t, r, i) : 2 === e ? a(t, r, i) : void 0;
};
function n(e, t, r) {
return e & t ^ ~e & r;
}
r.ch32 = n;
function a(e, t, r) {
return e & t ^ e & r ^ t & r;
}
r.maj32 = a;
function o(e, t, r) {
return e ^ t ^ r;
}
r.p32 = o;
r.s0_256 = function(e) {
return i(e, 2) ^ i(e, 13) ^ i(e, 22);
};
r.s1_256 = function(e) {
return i(e, 6) ^ i(e, 11) ^ i(e, 25);
};
r.g0_256 = function(e) {
return i(e, 7) ^ i(e, 18) ^ e >>> 3;
};
r.g1_256 = function(e) {
return i(e, 17) ^ i(e, 19) ^ e >>> 10;
};
}, {
"../utils": 136
} ],
136: [ function(e, t, r) {
"use strict";
var i = e("minimalistic-assert"), n = e("inherits");
r.inherits = n;
function a(e, t) {
return 55296 == (64512 & e.charCodeAt(t)) && !(t < 0 || t + 1 >= e.length) && 56320 == (64512 & e.charCodeAt(t + 1));
}
r.toArray = function(e, t) {
if (Array.isArray(e)) return e.slice();
if (!e) return [];
var r = [];
if ("string" == typeof e) if (t) {
if ("hex" === t) {
(e = e.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (e = "0" + e);
for (n = 0; n < e.length; n += 2) r.push(parseInt(e[n] + e[n + 1], 16));
}
} else for (var i = 0, n = 0; n < e.length; n++) {
var o = e.charCodeAt(n);
if (o < 128) r[i++] = o; else if (o < 2048) {
r[i++] = o >> 6 | 192;
r[i++] = 63 & o | 128;
} else if (a(e, n)) {
o = 65536 + ((1023 & o) << 10) + (1023 & e.charCodeAt(++n));
r[i++] = o >> 18 | 240;
r[i++] = o >> 12 & 63 | 128;
r[i++] = o >> 6 & 63 | 128;
r[i++] = 63 & o | 128;
} else {
r[i++] = o >> 12 | 224;
r[i++] = o >> 6 & 63 | 128;
r[i++] = 63 & o | 128;
}
} else for (n = 0; n < e.length; n++) r[n] = 0 | e[n];
return r;
};
r.toHex = function(e) {
for (var t = "", r = 0; r < e.length; r++) t += s(e[r].toString(16));
return t;
};
function o(e) {
return (e >>> 24 | e >>> 8 & 65280 | e << 8 & 16711680 | (255 & e) << 24) >>> 0;
}
r.htonl = o;
r.toHex32 = function(e, t) {
for (var r = "", i = 0; i < e.length; i++) {
var n = e[i];
"little" === t && (n = o(n));
r += f(n.toString(16));
}
return r;
};
function s(e) {
return 1 === e.length ? "0" + e : e;
}
r.zero2 = s;
function f(e) {
return 7 === e.length ? "0" + e : 6 === e.length ? "00" + e : 5 === e.length ? "000" + e : 4 === e.length ? "0000" + e : 3 === e.length ? "00000" + e : 2 === e.length ? "000000" + e : 1 === e.length ? "0000000" + e : e;
}
r.zero8 = f;
r.join32 = function(e, t, r, n) {
var a = r - t;
i(a % 4 == 0);
for (var o = new Array(a / 4), s = 0, f = t; s < o.length; s++, f += 4) {
var c;
c = "big" === n ? e[f] << 24 | e[f + 1] << 16 | e[f + 2] << 8 | e[f + 3] : e[f + 3] << 24 | e[f + 2] << 16 | e[f + 1] << 8 | e[f];
o[s] = c >>> 0;
}
return o;
};
r.split32 = function(e, t) {
for (var r = new Array(4 * e.length), i = 0, n = 0; i < e.length; i++, n += 4) {
var a = e[i];
if ("big" === t) {
r[n] = a >>> 24;
r[n + 1] = a >>> 16 & 255;
r[n + 2] = a >>> 8 & 255;
r[n + 3] = 255 & a;
} else {
r[n + 3] = a >>> 24;
r[n + 2] = a >>> 16 & 255;
r[n + 1] = a >>> 8 & 255;
r[n] = 255 & a;
}
}
return r;
};
r.rotr32 = function(e, t) {
return e >>> t | e << 32 - t;
};
r.rotl32 = function(e, t) {
return e << t | e >>> 32 - t;
};
r.sum32 = function(e, t) {
return e + t >>> 0;
};
r.sum32_3 = function(e, t, r) {
return e + t + r >>> 0;
};
r.sum32_4 = function(e, t, r, i) {
return e + t + r + i >>> 0;
};
r.sum32_5 = function(e, t, r, i, n) {
return e + t + r + i + n >>> 0;
};
r.sum64 = function(e, t, r, i) {
var n = e[t], a = i + e[t + 1] >>> 0, o = (a < i ? 1 : 0) + r + n;
e[t] = o >>> 0;
e[t + 1] = a;
};
r.sum64_hi = function(e, t, r, i) {
return (t + i >>> 0 < t ? 1 : 0) + e + r >>> 0;
};
r.sum64_lo = function(e, t, r, i) {
return t + i >>> 0;
};
r.sum64_4_hi = function(e, t, r, i, n, a, o, s) {
var f = 0, c = t;
f += (c = c + i >>> 0) < t ? 1 : 0;
f += (c = c + a >>> 0) < a ? 1 : 0;
return e + r + n + o + (f += (c = c + s >>> 0) < s ? 1 : 0) >>> 0;
};
r.sum64_4_lo = function(e, t, r, i, n, a, o, s) {
return t + i + a + s >>> 0;
};
r.sum64_5_hi = function(e, t, r, i, n, a, o, s, f, c) {
var u = 0, h = t;
u += (h = h + i >>> 0) < t ? 1 : 0;
u += (h = h + a >>> 0) < a ? 1 : 0;
u += (h = h + s >>> 0) < s ? 1 : 0;
return e + r + n + o + f + (u += (h = h + c >>> 0) < c ? 1 : 0) >>> 0;
};
r.sum64_5_lo = function(e, t, r, i, n, a, o, s, f, c) {
return t + i + a + s + c >>> 0;
};
r.rotr64_hi = function(e, t, r) {
return (t << 32 - r | e >>> r) >>> 0;
};
r.rotr64_lo = function(e, t, r) {
return (e << 32 - r | t >>> r) >>> 0;
};
r.shr64_hi = function(e, t, r) {
return e >>> r;
};
r.shr64_lo = function(e, t, r) {
return (e << 32 - r | t >>> r) >>> 0;
};
}, {
inherits: 140,
"minimalistic-assert": 145
} ],
137: [ function(e, t) {
"use strict";
var r = e("hash.js"), i = e("minimalistic-crypto-utils"), n = e("minimalistic-assert");
function a(e) {
if (!(this instanceof a)) return new a(e);
this.hash = e.hash;
this.predResist = !!e.predResist;
this.outLen = this.hash.outSize;
this.minEntropy = e.minEntropy || this.hash.hmacStrength;
this._reseed = null;
this.reseedInterval = null;
this.K = null;
this.V = null;
var t = i.toArray(e.entropy, e.entropyEnc || "hex"), r = i.toArray(e.nonce, e.nonceEnc || "hex"), o = i.toArray(e.pers, e.persEnc || "hex");
n(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits");
this._init(t, r, o);
}
t.exports = a;
a.prototype._init = function(e, t, r) {
var i = e.concat(t).concat(r);
this.K = new Array(this.outLen / 8);
this.V = new Array(this.outLen / 8);
for (var n = 0; n < this.V.length; n++) {
this.K[n] = 0;
this.V[n] = 1;
}
this._update(i);
this._reseed = 1;
this.reseedInterval = 281474976710656;
};
a.prototype._hmac = function() {
return new r.hmac(this.hash, this.K);
};
a.prototype._update = function(e) {
var t = this._hmac().update(this.V).update([ 0 ]);
e && (t = t.update(e));
this.K = t.digest();
this.V = this._hmac().update(this.V).digest();
if (e) {
this.K = this._hmac().update(this.V).update([ 1 ]).update(e).digest();
this.V = this._hmac().update(this.V).digest();
}
};
a.prototype.reseed = function(e, t, r, a) {
if ("string" != typeof t) {
a = r;
r = t;
t = null;
}
e = i.toArray(e, t);
r = i.toArray(r, a);
n(e.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits");
this._update(e.concat(r || []));
this._reseed = 1;
};
a.prototype.generate = function(e, t, r, n) {
if (this._reseed > this.reseedInterval) throw new Error("Reseed is required");
if ("string" != typeof t) {
n = r;
r = t;
t = null;
}
if (r) {
r = i.toArray(r, n || "hex");
this._update(r);
}
for (var a = []; a.length < e; ) {
this.V = this._hmac().update(this.V).digest();
a = a.concat(this.V);
}
var o = a.slice(0, e);
this._update(r);
this._reseed++;
return i.encode(o, t);
};
}, {
"hash.js": 125,
"minimalistic-assert": 145,
"minimalistic-crypto-utils": 146
} ],
138: [ function(e, t, r) {
r.read = function(e, t, r, i, n) {
var a, o, s = 8 * n - i - 1, f = (1 << s) - 1, c = f >> 1, u = -7, h = r ? n - 1 : 0, d = r ? -1 : 1, l = e[t + h];
h += d;
a = l & (1 << -u) - 1;
l >>= -u;
u += s;
for (;u > 0; a = 256 * a + e[t + h], h += d, u -= 8) ;
o = a & (1 << -u) - 1;
a >>= -u;
u += i;
for (;u > 0; o = 256 * o + e[t + h], h += d, u -= 8) ;
if (0 === a) a = 1 - c; else {
if (a === f) return o ? NaN : Infinity * (l ? -1 : 1);
o += Math.pow(2, i);
a -= c;
}
return (l ? -1 : 1) * o * Math.pow(2, a - i);
};
r.write = function(e, t, r, i, n, a) {
var o, s, f, c = 8 * a - n - 1, u = (1 << c) - 1, h = u >> 1, d = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0, l = i ? 0 : a - 1, p = i ? 1 : -1, b = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
t = Math.abs(t);
if (isNaN(t) || Infinity === t) {
s = isNaN(t) ? 1 : 0;
o = u;
} else {
o = Math.floor(Math.log(t) / Math.LN2);
if (t * (f = Math.pow(2, -o)) < 1) {
o--;
f *= 2;
}
if ((t += o + h >= 1 ? d / f : d * Math.pow(2, 1 - h)) * f >= 2) {
o++;
f /= 2;
}
if (o + h >= u) {
s = 0;
o = u;
} else if (o + h >= 1) {
s = (t * f - 1) * Math.pow(2, n);
o += h;
} else {
s = t * Math.pow(2, h - 1) * Math.pow(2, n);
o = 0;
}
}
for (;n >= 8; e[r + l] = 255 & s, l += p, s /= 256, n -= 8) ;
o = o << n | s;
c += n;
for (;c > 0; e[r + l] = 255 & o, l += p, o /= 256, c -= 8) ;
e[r + l - p] |= 128 * b;
};
}, {} ],
139: [ function(e, t) {
var r = [].indexOf;
t.exports = function(e, t) {
if (r) return e.indexOf(t);
for (var i = 0; i < e.length; ++i) if (e[i] === t) return i;
return -1;
};
}, {} ],
140: [ function(e, t) {
"function" == typeof Object.create ? t.exports = function(e, t) {
if (t) {
e.super_ = t;
e.prototype = Object.create(t.prototype, {
constructor: {
value: e,
enumerable: !1,
writable: !0,
configurable: !0
}
});
}
} : t.exports = function(e, t) {
if (t) {
e.super_ = t;
var r = function() {};
r.prototype = t.prototype;
e.prototype = new r();
e.prototype.constructor = e;
}
};
}, {} ],
141: [ function(e, t) {
t.exports = function(e) {
return null != e && (r(e) || i(e) || !!e._isBuffer);
};
function r(e) {
return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);
}
function i(e) {
return "function" == typeof e.readFloatLE && "function" == typeof e.slice && r(e.slice(0, 0));
}
}, {} ],
142: [ function(e, t) {
"use strict";
var r = e("inherits"), i = e("hash-base"), n = e("safe-buffer").Buffer, a = new Array(16);
function o() {
i.call(this, 64);
this._a = 1732584193;
this._b = 4023233417;
this._c = 2562383102;
this._d = 271733878;
}
r(o, i);
o.prototype._update = function() {
for (var e = a, t = 0; t < 16; ++t) e[t] = this._block.readInt32LE(4 * t);
var r = this._a, i = this._b, n = this._c, o = this._d;
r = f(r, i, n, o, e[0], 3614090360, 7);
o = f(o, r, i, n, e[1], 3905402710, 12);
n = f(n, o, r, i, e[2], 606105819, 17);
i = f(i, n, o, r, e[3], 3250441966, 22);
r = f(r, i, n, o, e[4], 4118548399, 7);
o = f(o, r, i, n, e[5], 1200080426, 12);
n = f(n, o, r, i, e[6], 2821735955, 17);
i = f(i, n, o, r, e[7], 4249261313, 22);
r = f(r, i, n, o, e[8], 1770035416, 7);
o = f(o, r, i, n, e[9], 2336552879, 12);
n = f(n, o, r, i, e[10], 4294925233, 17);
i = f(i, n, o, r, e[11], 2304563134, 22);
r = f(r, i, n, o, e[12], 1804603682, 7);
o = f(o, r, i, n, e[13], 4254626195, 12);
n = f(n, o, r, i, e[14], 2792965006, 17);
r = c(r, i = f(i, n, o, r, e[15], 1236535329, 22), n, o, e[1], 4129170786, 5);
o = c(o, r, i, n, e[6], 3225465664, 9);
n = c(n, o, r, i, e[11], 643717713, 14);
i = c(i, n, o, r, e[0], 3921069994, 20);
r = c(r, i, n, o, e[5], 3593408605, 5);
o = c(o, r, i, n, e[10], 38016083, 9);
n = c(n, o, r, i, e[15], 3634488961, 14);
i = c(i, n, o, r, e[4], 3889429448, 20);
r = c(r, i, n, o, e[9], 568446438, 5);
o = c(o, r, i, n, e[14], 3275163606, 9);
n = c(n, o, r, i, e[3], 4107603335, 14);
i = c(i, n, o, r, e[8], 1163531501, 20);
r = c(r, i, n, o, e[13], 2850285829, 5);
o = c(o, r, i, n, e[2], 4243563512, 9);
n = c(n, o, r, i, e[7], 1735328473, 14);
r = u(r, i = c(i, n, o, r, e[12], 2368359562, 20), n, o, e[5], 4294588738, 4);
o = u(o, r, i, n, e[8], 2272392833, 11);
n = u(n, o, r, i, e[11], 1839030562, 16);
i = u(i, n, o, r, e[14], 4259657740, 23);
r = u(r, i, n, o, e[1], 2763975236, 4);
o = u(o, r, i, n, e[4], 1272893353, 11);
n = u(n, o, r, i, e[7], 4139469664, 16);
i = u(i, n, o, r, e[10], 3200236656, 23);
r = u(r, i, n, o, e[13], 681279174, 4);
o = u(o, r, i, n, e[0], 3936430074, 11);
n = u(n, o, r, i, e[3], 3572445317, 16);
i = u(i, n, o, r, e[6], 76029189, 23);
r = u(r, i, n, o, e[9], 3654602809, 4);
o = u(o, r, i, n, e[12], 3873151461, 11);
n = u(n, o, r, i, e[15], 530742520, 16);
r = h(r, i = u(i, n, o, r, e[2], 3299628645, 23), n, o, e[0], 4096336452, 6);
o = h(o, r, i, n, e[7], 1126891415, 10);
n = h(n, o, r, i, e[14], 2878612391, 15);
i = h(i, n, o, r, e[5], 4237533241, 21);
r = h(r, i, n, o, e[12], 1700485571, 6);
o = h(o, r, i, n, e[3], 2399980690, 10);
n = h(n, o, r, i, e[10], 4293915773, 15);
i = h(i, n, o, r, e[1], 2240044497, 21);
r = h(r, i, n, o, e[8], 1873313359, 6);
o = h(o, r, i, n, e[15], 4264355552, 10);
n = h(n, o, r, i, e[6], 2734768916, 15);
i = h(i, n, o, r, e[13], 1309151649, 21);
r = h(r, i, n, o, e[4], 4149444226, 6);
o = h(o, r, i, n, e[11], 3174756917, 10);
n = h(n, o, r, i, e[2], 718787259, 15);
i = h(i, n, o, r, e[9], 3951481745, 21);
this._a = this._a + r | 0;
this._b = this._b + i | 0;
this._c = this._c + n | 0;
this._d = this._d + o | 0;
};
o.prototype._digest = function() {
this._block[this._blockOffset++] = 128;
if (this._blockOffset > 56) {
this._block.fill(0, this._blockOffset, 64);
this._update();
this._blockOffset = 0;
}
this._block.fill(0, this._blockOffset, 56);
this._block.writeUInt32LE(this._length[0], 56);
this._block.writeUInt32LE(this._length[1], 60);
this._update();
var e = n.allocUnsafe(16);
e.writeInt32LE(this._a, 0);
e.writeInt32LE(this._b, 4);
e.writeInt32LE(this._c, 8);
e.writeInt32LE(this._d, 12);
return e;
};
function s(e, t) {
return e << t | e >>> 32 - t;
}
function f(e, t, r, i, n, a, o) {
return s(e + (t & r | ~t & i) + n + a | 0, o) + t | 0;
}
function c(e, t, r, i, n, a, o) {
return s(e + (t & i | r & ~i) + n + a | 0, o) + t | 0;
}
function u(e, t, r, i, n, a, o) {
return s(e + (t ^ r ^ i) + n + a | 0, o) + t | 0;
}
function h(e, t, r, i, n, a, o) {
return s(e + (r ^ (t | ~i)) + n + a | 0, o) + t | 0;
}
t.exports = o;
}, {
"hash-base": 107,
inherits: 140,
"safe-buffer": 185
} ],
143: [ function(e, t) {
var r = e("bn.js"), i = e("brorand");
function n(e) {
this.rand = e || new i.Rand();
}
t.exports = n;
n.create = function(e) {
return new n(e);
};
n.prototype._randbelow = function(e) {
var t = e.bitLength(), i = Math.ceil(t / 8);
do {
var n = new r(this.rand.generate(i));
} while (n.cmp(e) >= 0);
return n;
};
n.prototype._randrange = function(e, t) {
var r = t.sub(e);
return e.add(this._randbelow(r));
};
n.prototype.test = function(e, t, i) {
var n = e.bitLength(), a = r.mont(e), o = new r(1).toRed(a);
t || (t = Math.max(1, n / 48 | 0));
for (var s = e.subn(1), f = 0; !s.testn(f); f++) ;
for (var c = e.shrn(f), u = s.toRed(a); t > 0; t--) {
var h = this._randrange(new r(2), s);
i && i(h);
var d = h.toRed(a).redPow(c);
if (0 !== d.cmp(o) && 0 !== d.cmp(u)) {
for (var l = 1; l < f; l++) {
if (0 === (d = d.redSqr()).cmp(o)) return !1;
if (0 === d.cmp(u)) break;
}
if (l === f) return !1;
}
}
return !0;
};
n.prototype.getDivisor = function(e, t) {
var i = e.bitLength(), n = r.mont(e), a = new r(1).toRed(n);
t || (t = Math.max(1, i / 48 | 0));
for (var o = e.subn(1), s = 0; !o.testn(s); s++) ;
for (var f = e.shrn(s), c = o.toRed(n); t > 0; t--) {
var u = this._randrange(new r(2), o), h = e.gcd(u);
if (0 !== h.cmpn(1)) return h;
var d = u.toRed(n).redPow(f);
if (0 !== d.cmp(a) && 0 !== d.cmp(c)) {
for (var l = 1; l < s; l++) {
if (0 === (d = d.redSqr()).cmp(a)) return d.fromRed().subn(1).gcd(e);
if (0 === d.cmp(c)) break;
}
if (l === s) return (d = d.redSqr()).fromRed().subn(1).gcd(e);
}
}
return !1;
};
}, {
"bn.js": 144,
brorand: 18
} ],
144: [ function(e, t, r) {
arguments[4][15][0].apply(r, arguments);
}, {
buffer: 19,
dup: 15
} ],
145: [ function(e, t) {
t.exports = r;
function r(e, t) {
if (!e) throw new Error(t || "Assertion failed");
}
r.equal = function(e, t, r) {
if (e != t) throw new Error(r || "Assertion failed: " + e + " != " + t);
};
}, {} ],
146: [ function(e, t, r) {
"use strict";
var i = r;
i.toArray = function(e, t) {
if (Array.isArray(e)) return e.slice();
if (!e) return [];
var r = [];
if ("string" != typeof e) {
for (var i = 0; i < e.length; i++) r[i] = 0 | e[i];
return r;
}
if ("hex" === t) {
(e = e.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (e = "0" + e);
for (i = 0; i < e.length; i += 2) r.push(parseInt(e[i] + e[i + 1], 16));
} else for (i = 0; i < e.length; i++) {
var n = e.charCodeAt(i), a = n >> 8, o = 255 & n;
a ? r.push(a, o) : r.push(o);
}
return r;
};
function n(e) {
return 1 === e.length ? "0" + e : e;
}
i.zero2 = n;
function a(e) {
for (var t = "", r = 0; r < e.length; r++) t += n(e[r].toString(16));
return t;
}
i.toHex = a;
i.encode = function(e, t) {
return "hex" === t ? a(e) : e;
};
}, {} ],
147: [ function(e, t) {
t.exports = {
"2.16.840.1.101.3.4.1.1": "aes-128-ecb",
"2.16.840.1.101.3.4.1.2": "aes-128-cbc",
"2.16.840.1.101.3.4.1.3": "aes-128-ofb",
"2.16.840.1.101.3.4.1.4": "aes-128-cfb",
"2.16.840.1.101.3.4.1.21": "aes-192-ecb",
"2.16.840.1.101.3.4.1.22": "aes-192-cbc",
"2.16.840.1.101.3.4.1.23": "aes-192-ofb",
"2.16.840.1.101.3.4.1.24": "aes-192-cfb",
"2.16.840.1.101.3.4.1.41": "aes-256-ecb",
"2.16.840.1.101.3.4.1.42": "aes-256-cbc",
"2.16.840.1.101.3.4.1.43": "aes-256-ofb",
"2.16.840.1.101.3.4.1.44": "aes-256-cfb"
};
}, {} ],
148: [ function(e, t, r) {
"use strict";
var i = e("asn1.js");
r.certificate = e("./certificate");
var n = i.define("RSAPrivateKey", function() {
this.seq().obj(this.key("version").int(), this.key("modulus").int(), this.key("publicExponent").int(), this.key("privateExponent").int(), this.key("prime1").int(), this.key("prime2").int(), this.key("exponent1").int(), this.key("exponent2").int(), this.key("coefficient").int());
});
r.RSAPrivateKey = n;
var a = i.define("RSAPublicKey", function() {
this.seq().obj(this.key("modulus").int(), this.key("publicExponent").int());
});
r.RSAPublicKey = a;
var o = i.define("SubjectPublicKeyInfo", function() {
this.seq().obj(this.key("algorithm").use(s), this.key("subjectPublicKey").bitstr());
});
r.PublicKey = o;
var s = i.define("AlgorithmIdentifier", function() {
this.seq().obj(this.key("algorithm").objid(), this.key("none").null_().optional(), this.key("curve").objid().optional(), this.key("params").seq().obj(this.key("p").int(), this.key("q").int(), this.key("g").int()).optional());
}), f = i.define("PrivateKeyInfo", function() {
this.seq().obj(this.key("version").int(), this.key("algorithm").use(s), this.key("subjectPrivateKey").octstr());
});
r.PrivateKey = f;
var c = i.define("EncryptedPrivateKeyInfo", function() {
this.seq().obj(this.key("algorithm").seq().obj(this.key("id").objid(), this.key("decrypt").seq().obj(this.key("kde").seq().obj(this.key("id").objid(), this.key("kdeparams").seq().obj(this.key("salt").octstr(), this.key("iters").int())), this.key("cipher").seq().obj(this.key("algo").objid(), this.key("iv").octstr()))), this.key("subjectPrivateKey").octstr());
});
r.EncryptedPrivateKey = c;
var u = i.define("DSAPrivateKey", function() {
this.seq().obj(this.key("version").int(), this.key("p").int(), this.key("q").int(), this.key("g").int(), this.key("pub_key").int(), this.key("priv_key").int());
});
r.DSAPrivateKey = u;
r.DSAparam = i.define("DSAparam", function() {
this.int();
});
var h = i.define("ECPrivateKey", function() {
this.seq().obj(this.key("version").int(), this.key("privateKey").octstr(), this.key("parameters").optional().explicit(0).use(d), this.key("publicKey").optional().explicit(1).bitstr());
});
r.ECPrivateKey = h;
var d = i.define("ECParameters", function() {
this.choice({
namedCurve: this.objid()
});
});
r.signature = i.define("signature", function() {
this.seq().obj(this.key("r").int(), this.key("s").int());
});
}, {
"./certificate": 149,
"asn1.js": 1
} ],
149: [ function(e, t) {
"use strict";
var r = e("asn1.js"), i = r.define("Time", function() {
this.choice({
utcTime: this.utctime(),
generalTime: this.gentime()
});
}), n = r.define("AttributeTypeValue", function() {
this.seq().obj(this.key("type").objid(), this.key("value").any());
}), a = r.define("AlgorithmIdentifier", function() {
this.seq().obj(this.key("algorithm").objid(), this.key("parameters").optional(), this.key("curve").objid().optional());
}), o = r.define("SubjectPublicKeyInfo", function() {
this.seq().obj(this.key("algorithm").use(a), this.key("subjectPublicKey").bitstr());
}), s = r.define("RelativeDistinguishedName", function() {
this.setof(n);
}), f = r.define("RDNSequence", function() {
this.seqof(s);
}), c = r.define("Name", function() {
this.choice({
rdnSequence: this.use(f)
});
}), u = r.define("Validity", function() {
this.seq().obj(this.key("notBefore").use(i), this.key("notAfter").use(i));
}), h = r.define("Extension", function() {
this.seq().obj(this.key("extnID").objid(), this.key("critical").bool().def(!1), this.key("extnValue").octstr());
}), d = r.define("TBSCertificate", function() {
this.seq().obj(this.key("version").explicit(0).int().optional(), this.key("serialNumber").int(), this.key("signature").use(a), this.key("issuer").use(c), this.key("validity").use(u), this.key("subject").use(c), this.key("subjectPublicKeyInfo").use(o), this.key("issuerUniqueID").implicit(1).bitstr().optional(), this.key("subjectUniqueID").implicit(2).bitstr().optional(), this.key("extensions").explicit(3).seqof(h).optional());
}), l = r.define("X509Certificate", function() {
this.seq().obj(this.key("tbsCertificate").use(d), this.key("signatureAlgorithm").use(a), this.key("signatureValue").bitstr());
});
t.exports = l;
}, {
"asn1.js": 1
} ],
150: [ function(e, t) {
var r = /Proc-Type: 4,ENCRYPTED[\n\r]+DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)[\n\r]+([0-9A-z\n\r\+\/\=]+)[\n\r]+/m, i = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----/m, n = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----([0-9A-z\n\r\+\/\=]+)-----END \1-----$/m, a = e("evp_bytestokey"), o = e("browserify-aes"), s = e("safe-buffer").Buffer;
t.exports = function(e, t) {
var f, c = e.toString(), u = c.match(r);
if (u) {
var h = "aes" + u[1], d = s.from(u[2], "hex"), l = s.from(u[3].replace(/[\r\n]/g, ""), "base64"), p = a(t, d.slice(0, 8), parseInt(u[1], 10)).key, b = [], m = o.createDecipheriv(h, p, d);
b.push(m.update(l));
b.push(m.final());
f = s.concat(b);
} else {
var g = c.match(n);
f = new s(g[2].replace(/[\r\n]/g, ""), "base64");
}
return {
tag: c.match(i)[1],
data: f
};
};
}, {
"browserify-aes": 22,
evp_bytestokey: 106,
"safe-buffer": 185
} ],
151: [ function(e, t) {
var r = e("./asn1"), i = e("./aesid.json"), n = e("./fixProc"), a = e("browserify-aes"), o = e("pbkdf2"), s = e("safe-buffer").Buffer;
t.exports = f;
function f(e) {
var t;
if ("object" == typeof e && !s.isBuffer(e)) {
t = e.passphrase;
e = e.key;
}
"string" == typeof e && (e = s.from(e));
var i, a, o = n(e, t), f = o.tag, u = o.data;
switch (f) {
case "CERTIFICATE":
a = r.certificate.decode(u, "der").tbsCertificate.subjectPublicKeyInfo;

case "PUBLIC KEY":
a || (a = r.PublicKey.decode(u, "der"));
switch (i = a.algorithm.algorithm.join(".")) {
case "1.2.840.113549.1.1.1":
return r.RSAPublicKey.decode(a.subjectPublicKey.data, "der");

case "1.2.840.10045.2.1":
a.subjectPrivateKey = a.subjectPublicKey;
return {
type: "ec",
data: a
};

case "1.2.840.10040.4.1":
a.algorithm.params.pub_key = r.DSAparam.decode(a.subjectPublicKey.data, "der");
return {
type: "dsa",
data: a.algorithm.params
};

default:
throw new Error("unknown key id " + i);
}
throw new Error("unknown key type " + f);

case "ENCRYPTED PRIVATE KEY":
u = c(u = r.EncryptedPrivateKey.decode(u, "der"), t);

case "PRIVATE KEY":
switch (i = (a = r.PrivateKey.decode(u, "der")).algorithm.algorithm.join(".")) {
case "1.2.840.113549.1.1.1":
return r.RSAPrivateKey.decode(a.subjectPrivateKey, "der");

case "1.2.840.10045.2.1":
return {
curve: a.algorithm.curve,
privateKey: r.ECPrivateKey.decode(a.subjectPrivateKey, "der").privateKey
};

case "1.2.840.10040.4.1":
a.algorithm.params.priv_key = r.DSAparam.decode(a.subjectPrivateKey, "der");
return {
type: "dsa",
params: a.algorithm.params
};

default:
throw new Error("unknown key id " + i);
}
throw new Error("unknown key type " + f);

case "RSA PUBLIC KEY":
return r.RSAPublicKey.decode(u, "der");

case "RSA PRIVATE KEY":
return r.RSAPrivateKey.decode(u, "der");

case "DSA PRIVATE KEY":
return {
type: "dsa",
params: r.DSAPrivateKey.decode(u, "der")
};

case "EC PRIVATE KEY":
return {
curve: (u = r.ECPrivateKey.decode(u, "der")).parameters.value,
privateKey: u.privateKey
};

default:
throw new Error("unknown key type " + f);
}
}
f.signature = r.signature;
function c(e, t) {
var r = e.algorithm.decrypt.kde.kdeparams.salt, n = parseInt(e.algorithm.decrypt.kde.kdeparams.iters.toString(), 10), f = i[e.algorithm.decrypt.cipher.algo.join(".")], c = e.algorithm.decrypt.cipher.iv, u = e.subjectPrivateKey, h = parseInt(f.split("-")[1], 10) / 8, d = o.pbkdf2Sync(t, r, n, h, "sha1"), l = a.createDecipheriv(f, d, c), p = [];
p.push(l.update(u));
p.push(l.final());
return s.concat(p);
}
}, {
"./aesid.json": 147,
"./asn1": 148,
"./fixProc": 150,
"browserify-aes": 22,
pbkdf2: 152,
"safe-buffer": 185
} ],
152: [ function(e, t, r) {
r.pbkdf2 = e("./lib/async");
r.pbkdf2Sync = e("./lib/sync");
}, {
"./lib/async": 153,
"./lib/sync": 156
} ],
153: [ function(e, t) {
(function(r, i) {
var n, a = e("safe-buffer").Buffer, o = e("./precondition"), s = e("./default-encoding"), f = e("./sync"), c = e("./to-buffer"), u = i.crypto && i.crypto.subtle, h = {
sha: "SHA-1",
"sha-1": "SHA-1",
sha1: "SHA-1",
sha256: "SHA-256",
"sha-256": "SHA-256",
sha384: "SHA-384",
"sha-384": "SHA-384",
"sha-512": "SHA-512",
sha512: "SHA-512"
}, d = [];
function l(e) {
if (i.process && !i.process.browser) return Promise.resolve(!1);
if (!u || !u.importKey || !u.deriveBits) return Promise.resolve(!1);
if (void 0 !== d[e]) return d[e];
var t = p(n = n || a.alloc(8), n, 10, 128, e).then(function() {
return !0;
}).catch(function() {
return !1;
});
d[e] = t;
return t;
}
function p(e, t, r, i, n) {
return u.importKey("raw", e, {
name: "PBKDF2"
}, !1, [ "deriveBits" ]).then(function(e) {
return u.deriveBits({
name: "PBKDF2",
salt: t,
iterations: r,
hash: {
name: n
}
}, e, i << 3);
}).then(function(e) {
return a.from(e);
});
}
function b(e, t) {
e.then(function(e) {
r.nextTick(function() {
t(null, e);
});
}, function(e) {
r.nextTick(function() {
t(e);
});
});
}
t.exports = function(e, t, n, a, u, d) {
if ("function" == typeof u) {
d = u;
u = void 0;
}
var m = h[(u = u || "sha1").toLowerCase()];
if (!m || "function" != typeof i.Promise) return r.nextTick(function() {
var r;
try {
r = f(e, t, n, a, u);
} catch (e) {
return d(e);
}
d(null, r);
});
o(n, a);
e = c(e, s, "Password");
t = c(t, s, "Salt");
if ("function" != typeof d) throw new Error("No callback provided to pbkdf2");
b(l(m).then(function(r) {
return r ? p(e, t, n, a, m) : f(e, t, n, a, u);
}), d);
};
}).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"./default-encoding": 154,
"./precondition": 155,
"./sync": 156,
"./to-buffer": 157,
_process: 159,
"safe-buffer": 185
} ],
154: [ function(e, t) {
(function(e) {
var r;
r = e.browser ? "utf-8" : e.version ? parseInt(e.version.split(".")[0].slice(1), 10) >= 6 ? "utf-8" : "binary" : "utf-8";
t.exports = r;
}).call(this, e("_process"));
}, {
_process: 159
} ],
155: [ function(e, t) {
var r = Math.pow(2, 30) - 1;
t.exports = function(e, t) {
if ("number" != typeof e) throw new TypeError("Iterations not a number");
if (e < 0) throw new TypeError("Bad iterations");
if ("number" != typeof t) throw new TypeError("Key length not a number");
if (t < 0 || t > r || t != t) throw new TypeError("Bad key length");
};
}, {} ],
156: [ function(e, t) {
var r = e("create-hash/md5"), i = e("ripemd160"), n = e("sha.js"), a = e("safe-buffer").Buffer, o = e("./precondition"), s = e("./default-encoding"), f = e("./to-buffer"), c = a.alloc(128), u = {
md5: 16,
sha1: 20,
sha224: 28,
sha256: 32,
sha384: 48,
sha512: 64,
rmd160: 20,
ripemd160: 20
};
function h(e, t, r) {
var i = d(e), n = "sha512" === e || "sha384" === e ? 128 : 64;
t.length > n ? t = i(t) : t.length < n && (t = a.concat([ t, c ], n));
for (var o = a.allocUnsafe(n + u[e]), s = a.allocUnsafe(n + u[e]), f = 0; f < n; f++) {
o[f] = 54 ^ t[f];
s[f] = 92 ^ t[f];
}
var h = a.allocUnsafe(n + r + 4);
o.copy(h, 0, 0, n);
this.ipad1 = h;
this.ipad2 = o;
this.opad = s;
this.alg = e;
this.blocksize = n;
this.hash = i;
this.size = u[e];
}
h.prototype.run = function(e, t) {
e.copy(t, this.blocksize);
this.hash(t).copy(this.opad, this.blocksize);
return this.hash(this.opad);
};
function d(e) {
return "rmd160" === e || "ripemd160" === e ? function(e) {
return new i().update(e).digest();
} : "md5" === e ? r : function(t) {
return n(e).update(t).digest();
};
}
t.exports = function(e, t, r, i, n) {
o(r, i);
var c = new h(n = n || "sha1", e = f(e, s, "Password"), (t = f(t, s, "Salt")).length), d = a.allocUnsafe(i), l = a.allocUnsafe(t.length + 4);
t.copy(l, 0, 0, t.length);
for (var p = 0, b = u[n], m = Math.ceil(i / b), g = 1; g <= m; g++) {
l.writeUInt32BE(g, t.length);
for (var y = c.run(l, c.ipad1), v = y, _ = 1; _ < r; _++) {
v = c.run(v, c.ipad2);
for (var w = 0; w < b; w++) y[w] ^= v[w];
}
y.copy(d, p);
p += b;
}
return d;
};
}, {
"./default-encoding": 154,
"./precondition": 155,
"./to-buffer": 157,
"create-hash/md5": 73,
ripemd160: 184,
"safe-buffer": 185,
"sha.js": 187
} ],
157: [ function(e, t) {
var r = e("safe-buffer").Buffer;
t.exports = function(e, t, i) {
if (r.isBuffer(e)) return e;
if ("string" == typeof e) return r.from(e, t);
if (ArrayBuffer.isView(e)) return r.from(e.buffer);
throw new TypeError(i + " must be a string, a Buffer, a typed array or a DataView");
};
}, {
"safe-buffer": 185
} ],
158: [ function(e, t) {
(function(e) {
"use strict";
"undefined" == typeof e || !e.version || 0 === e.version.indexOf("v0.") || 0 === e.version.indexOf("v1.") && 0 !== e.version.indexOf("v1.8.") ? t.exports = {
nextTick: function(t, r, i, n) {
if ("function" != typeof t) throw new TypeError('"callback" argument must be a function');
var a, o, s = arguments.length;
switch (s) {
case 0:
case 1:
return e.nextTick(t);

case 2:
return e.nextTick(function() {
t.call(null, r);
});

case 3:
return e.nextTick(function() {
t.call(null, r, i);
});

case 4:
return e.nextTick(function() {
t.call(null, r, i, n);
});

default:
a = new Array(s - 1);
o = 0;
for (;o < a.length; ) a[o++] = arguments[o];
return e.nextTick(function() {
t.apply(null, a);
});
}
}
} : t.exports = e;
}).call(this, e("_process"));
}, {
_process: 159
} ],
159: [ function(e, t) {
var r, i, n = t.exports = {};
function a() {
throw new Error("setTimeout has not been defined");
}
function o() {
throw new Error("clearTimeout has not been defined");
}
(function() {
try {
r = "function" == typeof setTimeout ? setTimeout : a;
} catch (e) {
r = a;
}
try {
i = "function" == typeof clearTimeout ? clearTimeout : o;
} catch (e) {
i = o;
}
})();
function s(e) {
if (r === setTimeout) return setTimeout(e, 0);
if ((r === a || !r) && setTimeout) {
r = setTimeout;
return setTimeout(e, 0);
}
try {
return r(e, 0);
} catch (t) {
try {
return r.call(null, e, 0);
} catch (t) {
return r.call(this, e, 0);
}
}
}
function f(e) {
if (i === clearTimeout) return clearTimeout(e);
if ((i === o || !i) && clearTimeout) {
i = clearTimeout;
return clearTimeout(e);
}
try {
return i(e);
} catch (t) {
try {
return i.call(null, e);
} catch (t) {
return i.call(this, e);
}
}
}
var c, u = [], h = !1, d = -1;
function l() {
if (h && c) {
h = !1;
c.length ? u = c.concat(u) : d = -1;
u.length && p();
}
}
function p() {
if (!h) {
var e = s(l);
h = !0;
for (var t = u.length; t; ) {
c = u;
u = [];
for (;++d < t; ) c && c[d].run();
d = -1;
t = u.length;
}
c = null;
h = !1;
f(e);
}
}
n.nextTick = function(e) {
var t = new Array(arguments.length - 1);
if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
u.push(new b(e, t));
1 !== u.length || h || s(p);
};
function b(e, t) {
this.fun = e;
this.array = t;
}
b.prototype.run = function() {
this.fun.apply(null, this.array);
};
n.title = "browser";
n.browser = !0;
n.env = {};
n.argv = [];
n.version = "";
n.versions = {};
function m() {}
n.on = m;
n.addListener = m;
n.once = m;
n.off = m;
n.removeListener = m;
n.removeAllListeners = m;
n.emit = m;
n.prependListener = m;
n.prependOnceListener = m;
n.listeners = function() {
return [];
};
n.binding = function() {
throw new Error("process.binding is not supported");
};
n.cwd = function() {
return "/";
};
n.chdir = function() {
throw new Error("process.chdir is not supported");
};
n.umask = function() {
return 0;
};
}, {} ],
160: [ function(e, t, r) {
r.publicEncrypt = e("./publicEncrypt");
r.privateDecrypt = e("./privateDecrypt");
r.privateEncrypt = function(e, t) {
return r.publicEncrypt(e, t, !0);
};
r.publicDecrypt = function(e, t) {
return r.privateDecrypt(e, t, !0);
};
}, {
"./privateDecrypt": 163,
"./publicEncrypt": 164
} ],
161: [ function(e, t) {
var r = e("create-hash"), i = e("safe-buffer").Buffer;
t.exports = function(e, t) {
for (var a, o = i.alloc(0), s = 0; o.length < t; ) {
a = n(s++);
o = i.concat([ o, r("sha1").update(e).update(a).digest() ]);
}
return o.slice(0, t);
};
function n(e) {
var t = i.allocUnsafe(4);
t.writeUInt32BE(e, 0);
return t;
}
}, {
"create-hash": 72,
"safe-buffer": 185
} ],
162: [ function(e, t, r) {
arguments[4][15][0].apply(r, arguments);
}, {
buffer: 19,
dup: 15
} ],
163: [ function(e, t) {
var r = e("parse-asn1"), i = e("./mgf"), n = e("./xor"), a = e("bn.js"), o = e("browserify-rsa"), s = e("create-hash"), f = e("./withPublic"), c = e("safe-buffer").Buffer;
t.exports = function(e, t, i) {
var n;
n = e.padding ? e.padding : i ? 1 : 4;
var s, d = r(e), l = d.modulus.byteLength();
if (t.length > l || new a(t).cmp(d.modulus) >= 0) throw new Error("decryption error");
s = i ? f(new a(t), d) : o(t, d);
var p = c.alloc(l - s.length);
s = c.concat([ p, s ], l);
if (4 === n) return u(d, s);
if (1 === n) return h(0, s, i);
if (3 === n) return s;
throw new Error("unknown padding");
};
function u(e, t) {
var r = e.modulus.byteLength(), a = s("sha1").update(c.alloc(0)).digest(), o = a.length;
if (0 !== t[0]) throw new Error("decryption error");
var f = t.slice(1, o + 1), u = t.slice(o + 1), h = n(f, i(u, o)), l = n(u, i(h, r - o - 1));
if (d(a, l.slice(0, o))) throw new Error("decryption error");
for (var p = o; 0 === l[p]; ) p++;
if (1 !== l[p++]) throw new Error("decryption error");
return l.slice(p);
}
function h(e, t, r) {
for (var i = t.slice(0, 2), n = 2, a = 0; 0 !== t[n++]; ) if (n >= t.length) {
a++;
break;
}
var o = t.slice(2, n - 1);
("0002" !== i.toString("hex") && !r || "0001" !== i.toString("hex") && r) && a++;
o.length < 8 && a++;
if (a) throw new Error("decryption error");
return t.slice(n);
}
function d(e, t) {
e = c.from(e);
t = c.from(t);
var r = 0, i = e.length;
if (e.length !== t.length) {
r++;
i = Math.min(e.length, t.length);
}
for (var n = -1; ++n < i; ) r += e[n] ^ t[n];
return r;
}
}, {
"./mgf": 161,
"./withPublic": 165,
"./xor": 166,
"bn.js": 162,
"browserify-rsa": 40,
"create-hash": 72,
"parse-asn1": 151,
"safe-buffer": 185
} ],
164: [ function(e, t) {
var r = e("parse-asn1"), i = e("randombytes"), n = e("create-hash"), a = e("./mgf"), o = e("./xor"), s = e("bn.js"), f = e("./withPublic"), c = e("browserify-rsa"), u = e("safe-buffer").Buffer;
t.exports = function(e, t, i) {
var n;
n = e.padding ? e.padding : i ? 1 : 4;
var a, o = r(e);
if (4 === n) a = h(o, t); else if (1 === n) a = d(o, t, i); else {
if (3 !== n) throw new Error("unknown padding");
if ((a = new s(t)).cmp(o.modulus) >= 0) throw new Error("data too long for modulus");
}
return i ? c(a, o) : f(a, o);
};
function h(e, t) {
var r = e.modulus.byteLength(), f = t.length, c = n("sha1").update(u.alloc(0)).digest(), h = c.length, d = 2 * h;
if (f > r - d - 2) throw new Error("message too long");
var l = u.alloc(r - f - d - 2), p = r - h - 1, b = i(h), m = o(u.concat([ c, l, u.alloc(1, 1), t ], p), a(b, p)), g = o(b, a(m, h));
return new s(u.concat([ u.alloc(1), g, m ], r));
}
function d(e, t, r) {
var i, n = t.length, a = e.modulus.byteLength();
if (n > a - 11) throw new Error("message too long");
i = r ? u.alloc(a - n - 3, 255) : l(a - n - 3);
return new s(u.concat([ u.from([ 0, r ? 1 : 2 ]), i, u.alloc(1), t ], a));
}
function l(e) {
for (var t, r = u.allocUnsafe(e), n = 0, a = i(2 * e), o = 0; n < e; ) {
if (o === a.length) {
a = i(2 * e);
o = 0;
}
(t = a[o++]) && (r[n++] = t);
}
return r;
}
}, {
"./mgf": 161,
"./withPublic": 165,
"./xor": 166,
"bn.js": 162,
"browserify-rsa": 40,
"create-hash": 72,
"parse-asn1": 151,
randombytes: 167,
"safe-buffer": 185
} ],
165: [ function(e, t) {
var r = e("bn.js"), i = e("safe-buffer").Buffer;
t.exports = function(e, t) {
return i.from(e.toRed(r.mont(t.modulus)).redPow(new r(t.publicExponent)).fromRed().toArray());
};
}, {
"bn.js": 162,
"safe-buffer": 185
} ],
166: [ function(e, t) {
t.exports = function(e, t) {
for (var r = e.length, i = -1; ++i < r; ) e[i] ^= t[i];
return e;
};
}, {} ],
167: [ function(e, t) {
(function(r, i) {
"use strict";
var n = e("safe-buffer").Buffer, a = i.crypto || i.msCrypto;
a && a.getRandomValues ? t.exports = function(e, t) {
if (e > 4294967295) throw new RangeError("requested too many random bytes");
var i = n.allocUnsafe(e);
if (e > 0) if (e > 65536) for (var o = 0; o < e; o += 65536) a.getRandomValues(i.slice(o, o + 65536)); else a.getRandomValues(i);
return "function" == typeof t ? r.nextTick(function() {
t(null, i);
}) : i;
} : t.exports = function() {
throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11");
};
}).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
_process: 159,
"safe-buffer": 185
} ],
168: [ function(e, t, r) {
(function(t, i) {
"use strict";
function n() {
throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11");
}
var a = e("safe-buffer"), o = e("randombytes"), s = a.Buffer, f = a.kMaxLength, c = i.crypto || i.msCrypto, u = Math.pow(2, 32) - 1;
function h(e, t) {
if ("number" != typeof e || e != e) throw new TypeError("offset must be a number");
if (e > u || e < 0) throw new TypeError("offset must be a uint32");
if (e > f || e > t) throw new RangeError("offset out of range");
}
function d(e, t, r) {
if ("number" != typeof e || e != e) throw new TypeError("size must be a number");
if (e > u || e < 0) throw new TypeError("size must be a uint32");
if (e + t > r || e > f) throw new RangeError("buffer too small");
}
if (c && c.getRandomValues || !t.browser) {
r.randomFill = function(e, t, r, n) {
if (!(s.isBuffer(e) || e instanceof i.Uint8Array)) throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
if ("function" == typeof t) {
n = t;
t = 0;
r = e.length;
} else if ("function" == typeof r) {
n = r;
r = e.length - t;
} else if ("function" != typeof n) throw new TypeError('"cb" argument must be a function');
h(t, e.length);
d(r, t, e.length);
return l(e, t, r, n);
};
r.randomFillSync = function(e, t, r) {
"undefined" == typeof t && (t = 0);
if (!(s.isBuffer(e) || e instanceof i.Uint8Array)) throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
h(t, e.length);
void 0 === r && (r = e.length - t);
d(r, t, e.length);
return l(e, t, r);
};
} else {
r.randomFill = n;
r.randomFillSync = n;
}
function l(e, r, i, n) {
if (t.browser) {
var a = e.buffer, s = new Uint8Array(a, r, i);
c.getRandomValues(s);
if (n) {
t.nextTick(function() {
n(null, e);
});
return;
}
return e;
}
if (!n) {
o(i).copy(e, r);
return e;
}
o(i, function(t, i) {
if (t) return n(t);
i.copy(e, r);
n(null, e);
});
}
}).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
_process: 159,
randombytes: 167,
"safe-buffer": 185
} ],
169: [ function(e, t) {
t.exports = e("./lib/_stream_duplex.js");
}, {
"./lib/_stream_duplex.js": 170
} ],
170: [ function(e, t) {
"use strict";
var r = e("process-nextick-args"), i = Object.keys || function(e) {
var t = [];
for (var r in e) t.push(r);
return t;
};
t.exports = u;
var n = Object.create(e("core-util-is"));
n.inherits = e("inherits");
var a = e("./_stream_readable"), o = e("./_stream_writable");
n.inherits(u, a);
for (var s = i(o.prototype), f = 0; f < s.length; f++) {
var c = s[f];
u.prototype[c] || (u.prototype[c] = o.prototype[c]);
}
function u(e) {
if (!(this instanceof u)) return new u(e);
a.call(this, e);
o.call(this, e);
e && !1 === e.readable && (this.readable = !1);
e && !1 === e.writable && (this.writable = !1);
this.allowHalfOpen = !0;
e && !1 === e.allowHalfOpen && (this.allowHalfOpen = !1);
this.once("end", h);
}
Object.defineProperty(u.prototype, "writableHighWaterMark", {
enumerable: !1,
get: function() {
return this._writableState.highWaterMark;
}
});
function h() {
this.allowHalfOpen || this._writableState.ended || r.nextTick(d, this);
}
function d(e) {
e.end();
}
Object.defineProperty(u.prototype, "destroyed", {
get: function() {
return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed;
},
set: function(e) {
if (void 0 !== this._readableState && void 0 !== this._writableState) {
this._readableState.destroyed = e;
this._writableState.destroyed = e;
}
}
});
u.prototype._destroy = function(e, t) {
this.push(null);
this.end();
r.nextTick(t, e);
};
}, {
"./_stream_readable": 172,
"./_stream_writable": 174,
"core-util-is": 69,
inherits: 140,
"process-nextick-args": 158
} ],
171: [ function(e, t) {
"use strict";
t.exports = n;
var r = e("./_stream_transform"), i = Object.create(e("core-util-is"));
i.inherits = e("inherits");
i.inherits(n, r);
function n(e) {
if (!(this instanceof n)) return new n(e);
r.call(this, e);
}
n.prototype._transform = function(e, t, r) {
r(null, e);
};
}, {
"./_stream_transform": 173,
"core-util-is": 69,
inherits: 140
} ],
172: [ function(e, t) {
(function(r, i) {
"use strict";
var n = e("process-nextick-args");
t.exports = w;
var a, o = e("isarray");
w.ReadableState = _;
e("events").EventEmitter;
var s = function(e, t) {
return e.listeners(t).length;
}, f = e("./internal/streams/stream"), c = e("safe-buffer").Buffer, u = i.Uint8Array || function() {};
function h(e) {
return c.from(e);
}
var d = Object.create(e("core-util-is"));
d.inherits = e("inherits");
var l = e("util"), p = void 0;
p = l && l.debuglog ? l.debuglog("stream") : function() {};
var b, m = e("./internal/streams/BufferList"), g = e("./internal/streams/destroy");
d.inherits(w, f);
var y = [ "error", "close", "destroy", "pause", "resume" ];
function v(e, t, r) {
if ("function" == typeof e.prependListener) return e.prependListener(t, r);
e._events && e._events[t] ? o(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [ r, e._events[t] ] : e.on(t, r);
}
function _(t, r) {
t = t || {};
var i = r instanceof (a = a || e("./_stream_duplex"));
this.objectMode = !!t.objectMode;
i && (this.objectMode = this.objectMode || !!t.readableObjectMode);
var n = t.highWaterMark, o = t.readableHighWaterMark, s = this.objectMode ? 16 : 16384;
this.highWaterMark = n || 0 === n ? n : i && (o || 0 === o) ? o : s;
this.highWaterMark = Math.floor(this.highWaterMark);
this.buffer = new m();
this.length = 0;
this.pipes = null;
this.pipesCount = 0;
this.flowing = null;
this.ended = !1;
this.endEmitted = !1;
this.reading = !1;
this.sync = !0;
this.needReadable = !1;
this.emittedReadable = !1;
this.readableListening = !1;
this.resumeScheduled = !1;
this.destroyed = !1;
this.defaultEncoding = t.defaultEncoding || "utf8";
this.awaitDrain = 0;
this.readingMore = !1;
this.decoder = null;
this.encoding = null;
if (t.encoding) {
b || (b = e("string_decoder/").StringDecoder);
this.decoder = new b(t.encoding);
this.encoding = t.encoding;
}
}
function w(t) {
a = a || e("./_stream_duplex");
if (!(this instanceof w)) return new w(t);
this._readableState = new _(t, this);
this.readable = !0;
if (t) {
"function" == typeof t.read && (this._read = t.read);
"function" == typeof t.destroy && (this._destroy = t.destroy);
}
f.call(this);
}
Object.defineProperty(w.prototype, "destroyed", {
get: function() {
return void 0 !== this._readableState && this._readableState.destroyed;
},
set: function(e) {
this._readableState && (this._readableState.destroyed = e);
}
});
w.prototype.destroy = g.destroy;
w.prototype._undestroy = g.undestroy;
w.prototype._destroy = function(e, t) {
this.push(null);
t(e);
};
w.prototype.push = function(e, t) {
var r, i = this._readableState;
if (i.objectMode) r = !0; else if ("string" == typeof e) {
if ((t = t || i.defaultEncoding) !== i.encoding) {
e = c.from(e, t);
t = "";
}
r = !0;
}
return M(this, e, t, !1, r);
};
w.prototype.unshift = function(e) {
return M(this, e, null, !0, !1);
};
function M(e, t, r, i, n) {
var a = e._readableState;
if (null === t) {
a.reading = !1;
T(e, a);
} else {
var o;
n || (o = E(a, t));
if (o) e.emit("error", o); else if (a.objectMode || t && t.length > 0) {
"string" == typeof t || a.objectMode || Object.getPrototypeOf(t) === c.prototype || (t = h(t));
if (i) a.endEmitted ? e.emit("error", new Error("stream.unshift() after end event")) : S(e, a, t, !0); else if (a.ended) e.emit("error", new Error("stream.push() after EOF")); else {
a.reading = !1;
if (a.decoder && !r) {
t = a.decoder.write(t);
a.objectMode || 0 !== t.length ? S(e, a, t, !1) : I(e, a);
} else S(e, a, t, !1);
}
} else i || (a.reading = !1);
}
return k(a);
}
function S(e, t, r, i) {
if (t.flowing && 0 === t.length && !t.sync) {
e.emit("data", r);
e.read(0);
} else {
t.length += t.objectMode ? 1 : r.length;
i ? t.buffer.unshift(r) : t.buffer.push(r);
t.needReadable && B(e);
}
I(e, t);
}
function E(e, t) {
var r, i;
(i = t, c.isBuffer(i) || i instanceof u) || "string" == typeof t || void 0 === t || e.objectMode || (r = new TypeError("Invalid non-string/buffer chunk"));
return r;
}
function k(e) {
return !e.ended && (e.needReadable || e.length < e.highWaterMark || 0 === e.length);
}
w.prototype.isPaused = function() {
return !1 === this._readableState.flowing;
};
w.prototype.setEncoding = function(t) {
b || (b = e("string_decoder/").StringDecoder);
this._readableState.decoder = new b(t);
this._readableState.encoding = t;
return this;
};
var A = 8388608;
function x(e) {
if (e >= A) e = A; else {
e--;
e |= e >>> 1;
e |= e >>> 2;
e |= e >>> 4;
e |= e >>> 8;
e |= e >>> 16;
e++;
}
return e;
}
function R(e, t) {
if (e <= 0 || 0 === t.length && t.ended) return 0;
if (t.objectMode) return 1;
if (e != e) return t.flowing && t.length ? t.buffer.head.data.length : t.length;
e > t.highWaterMark && (t.highWaterMark = x(e));
if (e <= t.length) return e;
if (!t.ended) {
t.needReadable = !0;
return 0;
}
return t.length;
}
w.prototype.read = function(e) {
p("read", e);
e = parseInt(e, 10);
var t = this._readableState, r = e;
0 !== e && (t.emittedReadable = !1);
if (0 === e && t.needReadable && (t.length >= t.highWaterMark || t.ended)) {
p("read: emitReadable", t.length, t.ended);
0 === t.length && t.ended ? K(this) : B(this);
return null;
}
if (0 === (e = R(e, t)) && t.ended) {
0 === t.length && K(this);
return null;
}
var i, n = t.needReadable;
p("need readable", n);
(0 === t.length || t.length - e < t.highWaterMark) && p("length less than watermark", n = !0);
if (t.ended || t.reading) p("reading or ended", n = !1); else if (n) {
p("do read");
t.reading = !0;
t.sync = !0;
0 === t.length && (t.needReadable = !0);
this._read(t.highWaterMark);
t.sync = !1;
t.reading || (e = R(r, t));
}
if (null === (i = e > 0 ? U(e, t) : null)) {
t.needReadable = !0;
e = 0;
} else t.length -= e;
if (0 === t.length) {
t.ended || (t.needReadable = !0);
r !== e && t.ended && K(this);
}
null !== i && this.emit("data", i);
return i;
};
function T(e, t) {
if (!t.ended) {
if (t.decoder) {
var r = t.decoder.end();
if (r && r.length) {
t.buffer.push(r);
t.length += t.objectMode ? 1 : r.length;
}
}
t.ended = !0;
B(e);
}
}
function B(e) {
var t = e._readableState;
t.needReadable = !1;
if (!t.emittedReadable) {
p("emitReadable", t.flowing);
t.emittedReadable = !0;
t.sync ? n.nextTick(j, e) : j(e);
}
}
function j(e) {
p("emit readable");
e.emit("readable");
D(e);
}
function I(e, t) {
if (!t.readingMore) {
t.readingMore = !0;
n.nextTick(P, e, t);
}
}
function P(e, t) {
for (var r = t.length; !t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark; ) {
p("maybeReadMore read 0");
e.read(0);
if (r === t.length) break;
r = t.length;
}
t.readingMore = !1;
}
w.prototype._read = function() {
this.emit("error", new Error("_read() is not implemented"));
};
w.prototype.pipe = function(e, t) {
var i = this, a = this._readableState;
switch (a.pipesCount) {
case 0:
a.pipes = e;
break;

case 1:
a.pipes = [ a.pipes, e ];
break;

default:
a.pipes.push(e);
}
a.pipesCount += 1;
p("pipe count=%d opts=%j", a.pipesCount, t);
var o = t && !1 === t.end || e === r.stdout || e === r.stderr ? _ : c;
a.endEmitted ? n.nextTick(o) : i.once("end", o);
e.on("unpipe", f);
function f(e, t) {
p("onunpipe");
if (e === i && t && !1 === t.hasUnpiped) {
t.hasUnpiped = !0;
d();
}
}
function c() {
p("onend");
e.end();
}
var u = C(i);
e.on("drain", u);
var h = !1;
function d() {
p("cleanup");
e.removeListener("close", g);
e.removeListener("finish", y);
e.removeListener("drain", u);
e.removeListener("error", m);
e.removeListener("unpipe", f);
i.removeListener("end", c);
i.removeListener("end", _);
i.removeListener("data", b);
h = !0;
!a.awaitDrain || e._writableState && !e._writableState.needDrain || u();
}
var l = !1;
i.on("data", b);
function b(t) {
p("ondata");
l = !1;
if (!1 === e.write(t) && !l) {
if ((1 === a.pipesCount && a.pipes === e || a.pipesCount > 1 && -1 !== W(a.pipes, e)) && !h) {
p("false write response, pause", i._readableState.awaitDrain);
i._readableState.awaitDrain++;
l = !0;
}
i.pause();
}
}
function m(t) {
p("onerror", t);
_();
e.removeListener("error", m);
0 === s(e, "error") && e.emit("error", t);
}
v(e, "error", m);
function g() {
e.removeListener("finish", y);
_();
}
e.once("close", g);
function y() {
p("onfinish");
e.removeListener("close", g);
_();
}
e.once("finish", y);
function _() {
p("unpipe");
i.unpipe(e);
}
e.emit("pipe", i);
if (!a.flowing) {
p("pipe resume");
i.resume();
}
return e;
};
function C(e) {
return function() {
var t = e._readableState;
p("pipeOnDrain", t.awaitDrain);
t.awaitDrain && t.awaitDrain--;
if (0 === t.awaitDrain && s(e, "data")) {
t.flowing = !0;
D(e);
}
};
}
w.prototype.unpipe = function(e) {
var t = this._readableState, r = {
hasUnpiped: !1
};
if (0 === t.pipesCount) return this;
if (1 === t.pipesCount) {
if (e && e !== t.pipes) return this;
e || (e = t.pipes);
t.pipes = null;
t.pipesCount = 0;
t.flowing = !1;
e && e.emit("unpipe", this, r);
return this;
}
if (!e) {
var i = t.pipes, n = t.pipesCount;
t.pipes = null;
t.pipesCount = 0;
t.flowing = !1;
for (var a = 0; a < n; a++) i[a].emit("unpipe", this, r);
return this;
}
var o = W(t.pipes, e);
if (-1 === o) return this;
t.pipes.splice(o, 1);
t.pipesCount -= 1;
1 === t.pipesCount && (t.pipes = t.pipes[0]);
e.emit("unpipe", this, r);
return this;
};
w.prototype.on = function(e, t) {
var r = f.prototype.on.call(this, e, t);
if ("data" === e) !1 !== this._readableState.flowing && this.resume(); else if ("readable" === e) {
var i = this._readableState;
if (!i.endEmitted && !i.readableListening) {
i.readableListening = i.needReadable = !0;
i.emittedReadable = !1;
i.reading ? i.length && B(this) : n.nextTick(O, this);
}
}
return r;
};
w.prototype.addListener = w.prototype.on;
function O(e) {
p("readable nexttick read 0");
e.read(0);
}
w.prototype.resume = function() {
var e = this._readableState;
if (!e.flowing) {
p("resume");
e.flowing = !0;
L(this, e);
}
return this;
};
function L(e, t) {
if (!t.resumeScheduled) {
t.resumeScheduled = !0;
n.nextTick(N, e, t);
}
}
function N(e, t) {
if (!t.reading) {
p("resume read 0");
e.read(0);
}
t.resumeScheduled = !1;
t.awaitDrain = 0;
e.emit("resume");
D(e);
t.flowing && !t.reading && e.read(0);
}
w.prototype.pause = function() {
p("call pause flowing=%j", this._readableState.flowing);
if (!1 !== this._readableState.flowing) {
p("pause");
this._readableState.flowing = !1;
this.emit("pause");
}
return this;
};
function D(e) {
var t = e._readableState;
p("flow", t.flowing);
for (;t.flowing && null !== e.read(); ) ;
}
w.prototype.wrap = function(e) {
var t = this, r = this._readableState, i = !1;
e.on("end", function() {
p("wrapped end");
if (r.decoder && !r.ended) {
var e = r.decoder.end();
e && e.length && t.push(e);
}
t.push(null);
});
e.on("data", function(n) {
p("wrapped data");
r.decoder && (n = r.decoder.write(n));
if ((!r.objectMode || null != n) && (r.objectMode || n && n.length) && !t.push(n)) {
i = !0;
e.pause();
}
});
for (var n in e) void 0 === this[n] && "function" == typeof e[n] && (this[n] = function(t) {
return function() {
return e[t].apply(e, arguments);
};
}(n));
for (var a = 0; a < y.length; a++) e.on(y[a], this.emit.bind(this, y[a]));
this._read = function(t) {
p("wrapped _read", t);
if (i) {
i = !1;
e.resume();
}
};
return this;
};
Object.defineProperty(w.prototype, "readableHighWaterMark", {
enumerable: !1,
get: function() {
return this._readableState.highWaterMark;
}
});
w._fromList = U;
function U(e, t) {
if (0 === t.length) return null;
var r;
if (t.objectMode) r = t.buffer.shift(); else if (!e || e >= t.length) {
r = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.head.data : t.buffer.concat(t.length);
t.buffer.clear();
} else r = q(e, t.buffer, t.decoder);
return r;
}
function q(e, t, r) {
var i;
if (e < t.head.data.length) {
i = t.head.data.slice(0, e);
t.head.data = t.head.data.slice(e);
} else i = e === t.head.data.length ? t.shift() : r ? z(e, t) : F(e, t);
return i;
}
function z(e, t) {
var r = t.head, i = 1, n = r.data;
e -= n.length;
for (;r = r.next; ) {
var a = r.data, o = e > a.length ? a.length : e;
o === a.length ? n += a : n += a.slice(0, e);
if (0 == (e -= o)) {
if (o === a.length) {
++i;
r.next ? t.head = r.next : t.head = t.tail = null;
} else {
t.head = r;
r.data = a.slice(o);
}
break;
}
++i;
}
t.length -= i;
return n;
}
function F(e, t) {
var r = c.allocUnsafe(e), i = t.head, n = 1;
i.data.copy(r);
e -= i.data.length;
for (;i = i.next; ) {
var a = i.data, o = e > a.length ? a.length : e;
a.copy(r, r.length - e, 0, o);
if (0 == (e -= o)) {
if (o === a.length) {
++n;
i.next ? t.head = i.next : t.head = t.tail = null;
} else {
t.head = i;
i.data = a.slice(o);
}
break;
}
++n;
}
t.length -= n;
return r;
}
function K(e) {
var t = e._readableState;
if (t.length > 0) throw new Error('"endReadable()" called on non-empty stream');
if (!t.endEmitted) {
t.ended = !0;
n.nextTick(H, t, e);
}
}
function H(e, t) {
if (!e.endEmitted && 0 === e.length) {
e.endEmitted = !0;
t.readable = !1;
t.emit("end");
}
}
function W(e, t) {
for (var r = 0, i = e.length; r < i; r++) if (e[r] === t) return r;
return -1;
}
}).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"./_stream_duplex": 170,
"./internal/streams/BufferList": 175,
"./internal/streams/destroy": 176,
"./internal/streams/stream": 177,
_process: 159,
"core-util-is": 69,
events: 105,
inherits: 140,
isarray: 178,
"process-nextick-args": 158,
"safe-buffer": 185,
"string_decoder/": 179,
util: 19
} ],
173: [ function(e, t) {
"use strict";
t.exports = a;
var r = e("./_stream_duplex"), i = Object.create(e("core-util-is"));
i.inherits = e("inherits");
i.inherits(a, r);
function n(e, t) {
var r = this._transformState;
r.transforming = !1;
var i = r.writecb;
if (!i) return this.emit("error", new Error("write callback called multiple times"));
r.writechunk = null;
r.writecb = null;
null != t && this.push(t);
i(e);
var n = this._readableState;
n.reading = !1;
(n.needReadable || n.length < n.highWaterMark) && this._read(n.highWaterMark);
}
function a(e) {
if (!(this instanceof a)) return new a(e);
r.call(this, e);
this._transformState = {
afterTransform: n.bind(this),
needTransform: !1,
transforming: !1,
writecb: null,
writechunk: null,
writeencoding: null
};
this._readableState.needReadable = !0;
this._readableState.sync = !1;
if (e) {
"function" == typeof e.transform && (this._transform = e.transform);
"function" == typeof e.flush && (this._flush = e.flush);
}
this.on("prefinish", o);
}
function o() {
var e = this;
"function" == typeof this._flush ? this._flush(function(t, r) {
s(e, t, r);
}) : s(this, null, null);
}
a.prototype.push = function(e, t) {
this._transformState.needTransform = !1;
return r.prototype.push.call(this, e, t);
};
a.prototype._transform = function() {
throw new Error("_transform() is not implemented");
};
a.prototype._write = function(e, t, r) {
var i = this._transformState;
i.writecb = r;
i.writechunk = e;
i.writeencoding = t;
if (!i.transforming) {
var n = this._readableState;
(i.needTransform || n.needReadable || n.length < n.highWaterMark) && this._read(n.highWaterMark);
}
};
a.prototype._read = function() {
var e = this._transformState;
if (null !== e.writechunk && e.writecb && !e.transforming) {
e.transforming = !0;
this._transform(e.writechunk, e.writeencoding, e.afterTransform);
} else e.needTransform = !0;
};
a.prototype._destroy = function(e, t) {
var i = this;
r.prototype._destroy.call(this, e, function(e) {
t(e);
i.emit("close");
});
};
function s(e, t, r) {
if (t) return e.emit("error", t);
null != r && e.push(r);
if (e._writableState.length) throw new Error("Calling transform done when ws.length != 0");
if (e._transformState.transforming) throw new Error("Calling transform done when still transforming");
return e.push(null);
}
}, {
"./_stream_duplex": 170,
"core-util-is": 69,
inherits: 140
} ],
174: [ function(e, t) {
(function(r, i) {
"use strict";
var n = e("process-nextick-args");
t.exports = y;
function a(e) {
var t = this;
this.next = null;
this.entry = null;
this.finish = function() {
O(t, e);
};
}
var o, s = !r.browser && [ "v0.10", "v0.9." ].indexOf(r.version.slice(0, 5)) > -1 ? setImmediate : n.nextTick;
y.WritableState = g;
var f = Object.create(e("core-util-is"));
f.inherits = e("inherits");
var c = {
deprecate: e("util-deprecate")
}, u = e("./internal/streams/stream"), h = e("safe-buffer").Buffer, d = i.Uint8Array || function() {};
function l(e) {
return h.from(e);
}
var p, b = e("./internal/streams/destroy");
f.inherits(y, u);
function m() {}
function g(t, r) {
o = o || e("./_stream_duplex");
t = t || {};
var i = r instanceof o;
this.objectMode = !!t.objectMode;
i && (this.objectMode = this.objectMode || !!t.writableObjectMode);
var n = t.highWaterMark, s = t.writableHighWaterMark, f = this.objectMode ? 16 : 16384;
this.highWaterMark = n || 0 === n ? n : i && (s || 0 === s) ? s : f;
this.highWaterMark = Math.floor(this.highWaterMark);
this.finalCalled = !1;
this.needDrain = !1;
this.ending = !1;
this.ended = !1;
this.finished = !1;
this.destroyed = !1;
var c = !1 === t.decodeStrings;
this.decodeStrings = !c;
this.defaultEncoding = t.defaultEncoding || "utf8";
this.length = 0;
this.writing = !1;
this.corked = 0;
this.sync = !0;
this.bufferProcessing = !1;
this.onwrite = function(e) {
A(r, e);
};
this.writecb = null;
this.writelen = 0;
this.bufferedRequest = null;
this.lastBufferedRequest = null;
this.pendingcb = 0;
this.prefinished = !1;
this.errorEmitted = !1;
this.bufferedRequestCount = 0;
this.corkedRequestsFree = new a(this);
}
g.prototype.getBuffer = function() {
for (var e = this.bufferedRequest, t = []; e; ) {
t.push(e);
e = e.next;
}
return t;
};
(function() {
try {
Object.defineProperty(g.prototype, "buffer", {
get: c.deprecate(function() {
return this.getBuffer();
}, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
});
} catch (e) {}
})();
if ("function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance]) {
p = Function.prototype[Symbol.hasInstance];
Object.defineProperty(y, Symbol.hasInstance, {
value: function(e) {
return !!p.call(this, e) || this === y && e && e._writableState instanceof g;
}
});
} else p = function(e) {
return e instanceof this;
};
function y(t) {
o = o || e("./_stream_duplex");
if (!(p.call(y, this) || this instanceof o)) return new y(t);
this._writableState = new g(t, this);
this.writable = !0;
if (t) {
"function" == typeof t.write && (this._write = t.write);
"function" == typeof t.writev && (this._writev = t.writev);
"function" == typeof t.destroy && (this._destroy = t.destroy);
"function" == typeof t.final && (this._final = t.final);
}
u.call(this);
}
y.prototype.pipe = function() {
this.emit("error", new Error("Cannot pipe, not readable"));
};
function v(e, t) {
var r = new Error("write after end");
e.emit("error", r);
n.nextTick(t, r);
}
function _(e, t, r, i) {
var a = !0, o = !1;
null === r ? o = new TypeError("May not write null values to stream") : "string" == typeof r || void 0 === r || t.objectMode || (o = new TypeError("Invalid non-string/buffer chunk"));
if (o) {
e.emit("error", o);
n.nextTick(i, o);
a = !1;
}
return a;
}
y.prototype.write = function(e, t, r) {
var i, n = this._writableState, a = !1, o = !n.objectMode && (i = e, h.isBuffer(i) || i instanceof d);
o && !h.isBuffer(e) && (e = l(e));
if ("function" == typeof t) {
r = t;
t = null;
}
o ? t = "buffer" : t || (t = n.defaultEncoding);
"function" != typeof r && (r = m);
if (n.ended) v(this, r); else if (o || _(this, n, e, r)) {
n.pendingcb++;
a = M(this, n, o, e, t, r);
}
return a;
};
y.prototype.cork = function() {
this._writableState.corked++;
};
y.prototype.uncork = function() {
var e = this._writableState;
if (e.corked) {
e.corked--;
e.writing || e.corked || e.finished || e.bufferProcessing || !e.bufferedRequest || T(this, e);
}
};
y.prototype.setDefaultEncoding = function(e) {
"string" == typeof e && (e = e.toLowerCase());
if (!([ "hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw" ].indexOf((e + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + e);
this._writableState.defaultEncoding = e;
return this;
};
function w(e, t, r) {
e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = h.from(t, r));
return t;
}
Object.defineProperty(y.prototype, "writableHighWaterMark", {
enumerable: !1,
get: function() {
return this._writableState.highWaterMark;
}
});
function M(e, t, r, i, n, a) {
if (!r) {
var o = w(t, i, n);
if (i !== o) {
r = !0;
n = "buffer";
i = o;
}
}
var s = t.objectMode ? 1 : i.length;
t.length += s;
var f = t.length < t.highWaterMark;
f || (t.needDrain = !0);
if (t.writing || t.corked) {
var c = t.lastBufferedRequest;
t.lastBufferedRequest = {
chunk: i,
encoding: n,
isBuf: r,
callback: a,
next: null
};
c ? c.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest;
t.bufferedRequestCount += 1;
} else S(e, t, !1, s, i, n, a);
return f;
}
function S(e, t, r, i, n, a, o) {
t.writelen = i;
t.writecb = o;
t.writing = !0;
t.sync = !0;
r ? e._writev(n, t.onwrite) : e._write(n, a, t.onwrite);
t.sync = !1;
}
function E(e, t, r, i, a) {
--t.pendingcb;
if (r) {
n.nextTick(a, i);
n.nextTick(P, e, t);
e._writableState.errorEmitted = !0;
e.emit("error", i);
} else {
a(i);
e._writableState.errorEmitted = !0;
e.emit("error", i);
P(e, t);
}
}
function k(e) {
e.writing = !1;
e.writecb = null;
e.length -= e.writelen;
e.writelen = 0;
}
function A(e, t) {
var r = e._writableState, i = r.sync, n = r.writecb;
k(r);
if (t) E(e, r, i, t, n); else {
var a = B(r);
a || r.corked || r.bufferProcessing || !r.bufferedRequest || T(e, r);
i ? s(x, e, r, a, n) : x(e, r, a, n);
}
}
function x(e, t, r, i) {
r || R(e, t);
t.pendingcb--;
i();
P(e, t);
}
function R(e, t) {
if (0 === t.length && t.needDrain) {
t.needDrain = !1;
e.emit("drain");
}
}
function T(e, t) {
t.bufferProcessing = !0;
var r = t.bufferedRequest;
if (e._writev && r && r.next) {
var i = t.bufferedRequestCount, n = new Array(i), o = t.corkedRequestsFree;
o.entry = r;
for (var s = 0, f = !0; r; ) {
n[s] = r;
r.isBuf || (f = !1);
r = r.next;
s += 1;
}
n.allBuffers = f;
S(e, t, !0, t.length, n, "", o.finish);
t.pendingcb++;
t.lastBufferedRequest = null;
if (o.next) {
t.corkedRequestsFree = o.next;
o.next = null;
} else t.corkedRequestsFree = new a(t);
t.bufferedRequestCount = 0;
} else {
for (;r; ) {
var c = r.chunk, u = r.encoding, h = r.callback;
S(e, t, !1, t.objectMode ? 1 : c.length, c, u, h);
r = r.next;
t.bufferedRequestCount--;
if (t.writing) break;
}
null === r && (t.lastBufferedRequest = null);
}
t.bufferedRequest = r;
t.bufferProcessing = !1;
}
y.prototype._write = function(e, t, r) {
r(new Error("_write() is not implemented"));
};
y.prototype._writev = null;
y.prototype.end = function(e, t, r) {
var i = this._writableState;
if ("function" == typeof e) {
r = e;
e = null;
t = null;
} else if ("function" == typeof t) {
r = t;
t = null;
}
null != e && this.write(e, t);
if (i.corked) {
i.corked = 1;
this.uncork();
}
i.ending || i.finished || C(this, i, r);
};
function B(e) {
return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing;
}
function j(e, t) {
e._final(function(r) {
t.pendingcb--;
r && e.emit("error", r);
t.prefinished = !0;
e.emit("prefinish");
P(e, t);
});
}
function I(e, t) {
if (!t.prefinished && !t.finalCalled) if ("function" == typeof e._final) {
t.pendingcb++;
t.finalCalled = !0;
n.nextTick(j, e, t);
} else {
t.prefinished = !0;
e.emit("prefinish");
}
}
function P(e, t) {
var r = B(t);
if (r) {
I(e, t);
if (0 === t.pendingcb) {
t.finished = !0;
e.emit("finish");
}
}
return r;
}
function C(e, t, r) {
t.ending = !0;
P(e, t);
r && (t.finished ? n.nextTick(r) : e.once("finish", r));
t.ended = !0;
e.writable = !1;
}
function O(e, t, r) {
var i = e.entry;
e.entry = null;
for (;i; ) {
var n = i.callback;
t.pendingcb--;
n(r);
i = i.next;
}
t.corkedRequestsFree ? t.corkedRequestsFree.next = e : t.corkedRequestsFree = e;
}
Object.defineProperty(y.prototype, "destroyed", {
get: function() {
return void 0 !== this._writableState && this._writableState.destroyed;
},
set: function(e) {
this._writableState && (this._writableState.destroyed = e);
}
});
y.prototype.destroy = b.destroy;
y.prototype._undestroy = b.undestroy;
y.prototype._destroy = function(e, t) {
this.end();
t(e);
};
}).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"./_stream_duplex": 170,
"./internal/streams/destroy": 176,
"./internal/streams/stream": 177,
_process: 159,
"core-util-is": 69,
inherits: 140,
"process-nextick-args": 158,
"safe-buffer": 185,
"util-deprecate": 196
} ],
175: [ function(e, t) {
"use strict";
function r(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
var i = e("safe-buffer").Buffer, n = e("util");
t.exports = function() {
function e() {
r(this, e);
this.head = null;
this.tail = null;
this.length = 0;
}
e.prototype.push = function(e) {
var t = {
data: e,
next: null
};
this.length > 0 ? this.tail.next = t : this.head = t;
this.tail = t;
++this.length;
};
e.prototype.unshift = function(e) {
var t = {
data: e,
next: this.head
};
0 === this.length && (this.tail = t);
this.head = t;
++this.length;
};
e.prototype.shift = function() {
if (0 !== this.length) {
var e = this.head.data;
1 === this.length ? this.head = this.tail = null : this.head = this.head.next;
--this.length;
return e;
}
};
e.prototype.clear = function() {
this.head = this.tail = null;
this.length = 0;
};
e.prototype.join = function(e) {
if (0 === this.length) return "";
for (var t = this.head, r = "" + t.data; t = t.next; ) r += e + t.data;
return r;
};
e.prototype.concat = function(e) {
if (0 === this.length) return i.alloc(0);
if (1 === this.length) return this.head.data;
for (var t, r, n = i.allocUnsafe(e >>> 0), a = this.head, o = 0; a; ) {
t = n, r = o, a.data.copy(t, r);
o += a.data.length;
a = a.next;
}
return n;
};
return e;
}();
n && n.inspect && n.inspect.custom && (t.exports.prototype[n.inspect.custom] = function() {
var e = n.inspect({
length: this.length
});
return this.constructor.name + " " + e;
});
}, {
"safe-buffer": 185,
util: 19
} ],
176: [ function(e, t) {
"use strict";
var r = e("process-nextick-args");
function i(e, t) {
e.emit("error", t);
}
t.exports = {
destroy: function(e, t) {
var n = this, a = this._readableState && this._readableState.destroyed, o = this._writableState && this._writableState.destroyed;
if (a || o) {
t ? t(e) : !e || this._writableState && this._writableState.errorEmitted || r.nextTick(i, this, e);
return this;
}
this._readableState && (this._readableState.destroyed = !0);
this._writableState && (this._writableState.destroyed = !0);
this._destroy(e || null, function(e) {
if (!t && e) {
r.nextTick(i, n, e);
n._writableState && (n._writableState.errorEmitted = !0);
} else t && t(e);
});
return this;
},
undestroy: function() {
if (this._readableState) {
this._readableState.destroyed = !1;
this._readableState.reading = !1;
this._readableState.ended = !1;
this._readableState.endEmitted = !1;
}
if (this._writableState) {
this._writableState.destroyed = !1;
this._writableState.ended = !1;
this._writableState.ending = !1;
this._writableState.finished = !1;
this._writableState.errorEmitted = !1;
}
}
};
}, {
"process-nextick-args": 158
} ],
177: [ function(e, t, r) {
arguments[4][61][0].apply(r, arguments);
}, {
dup: 61,
events: 105
} ],
178: [ function(e, t, r) {
arguments[4][67][0].apply(r, arguments);
}, {
dup: 67
} ],
179: [ function(e, t, r) {
arguments[4][64][0].apply(r, arguments);
}, {
dup: 64,
"safe-buffer": 185
} ],
180: [ function(e, t) {
t.exports = e("./readable").PassThrough;
}, {
"./readable": 181
} ],
181: [ function(e, t, r) {
(r = t.exports = e("./lib/_stream_readable.js")).Stream = r;
r.Readable = r;
r.Writable = e("./lib/_stream_writable.js");
r.Duplex = e("./lib/_stream_duplex.js");
r.Transform = e("./lib/_stream_transform.js");
r.PassThrough = e("./lib/_stream_passthrough.js");
}, {
"./lib/_stream_duplex.js": 170,
"./lib/_stream_passthrough.js": 171,
"./lib/_stream_readable.js": 172,
"./lib/_stream_transform.js": 173,
"./lib/_stream_writable.js": 174
} ],
182: [ function(e, t) {
t.exports = e("./readable").Transform;
}, {
"./readable": 181
} ],
183: [ function(e, t) {
t.exports = e("./lib/_stream_writable.js");
}, {
"./lib/_stream_writable.js": 174
} ],
184: [ function(e, t) {
"use strict";
var r = e("buffer").Buffer, i = e("inherits"), n = e("hash-base"), a = new Array(16), o = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13 ], s = [ 5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11 ], f = [ 11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6 ], c = [ 8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11 ], u = [ 0, 1518500249, 1859775393, 2400959708, 2840853838 ], h = [ 1352829926, 1548603684, 1836072691, 2053994217, 0 ];
function d() {
n.call(this, 64);
this._a = 1732584193;
this._b = 4023233417;
this._c = 2562383102;
this._d = 271733878;
this._e = 3285377520;
}
i(d, n);
d.prototype._update = function() {
for (var e = a, t = 0; t < 16; ++t) e[t] = this._block.readInt32LE(4 * t);
for (var r = 0 | this._a, i = 0 | this._b, n = 0 | this._c, d = 0 | this._d, v = 0 | this._e, _ = 0 | this._a, w = 0 | this._b, M = 0 | this._c, S = 0 | this._d, E = 0 | this._e, k = 0; k < 80; k += 1) {
var A, x;
if (k < 16) {
A = p(r, i, n, d, v, e[o[k]], u[0], f[k]);
x = y(_, w, M, S, E, e[s[k]], h[0], c[k]);
} else if (k < 32) {
A = b(r, i, n, d, v, e[o[k]], u[1], f[k]);
x = g(_, w, M, S, E, e[s[k]], h[1], c[k]);
} else if (k < 48) {
A = m(r, i, n, d, v, e[o[k]], u[2], f[k]);
x = m(_, w, M, S, E, e[s[k]], h[2], c[k]);
} else if (k < 64) {
A = g(r, i, n, d, v, e[o[k]], u[3], f[k]);
x = b(_, w, M, S, E, e[s[k]], h[3], c[k]);
} else {
A = y(r, i, n, d, v, e[o[k]], u[4], f[k]);
x = p(_, w, M, S, E, e[s[k]], h[4], c[k]);
}
r = v;
v = d;
d = l(n, 10);
n = i;
i = A;
_ = E;
E = S;
S = l(M, 10);
M = w;
w = x;
}
var R = this._b + n + S | 0;
this._b = this._c + d + E | 0;
this._c = this._d + v + _ | 0;
this._d = this._e + r + w | 0;
this._e = this._a + i + M | 0;
this._a = R;
};
d.prototype._digest = function() {
this._block[this._blockOffset++] = 128;
if (this._blockOffset > 56) {
this._block.fill(0, this._blockOffset, 64);
this._update();
this._blockOffset = 0;
}
this._block.fill(0, this._blockOffset, 56);
this._block.writeUInt32LE(this._length[0], 56);
this._block.writeUInt32LE(this._length[1], 60);
this._update();
var e = r.alloc ? r.alloc(20) : new r(20);
e.writeInt32LE(this._a, 0);
e.writeInt32LE(this._b, 4);
e.writeInt32LE(this._c, 8);
e.writeInt32LE(this._d, 12);
e.writeInt32LE(this._e, 16);
return e;
};
function l(e, t) {
return e << t | e >>> 32 - t;
}
function p(e, t, r, i, n, a, o, s) {
return l(e + (t ^ r ^ i) + a + o | 0, s) + n | 0;
}
function b(e, t, r, i, n, a, o, s) {
return l(e + (t & r | ~t & i) + a + o | 0, s) + n | 0;
}
function m(e, t, r, i, n, a, o, s) {
return l(e + ((t | ~r) ^ i) + a + o | 0, s) + n | 0;
}
function g(e, t, r, i, n, a, o, s) {
return l(e + (t & i | r & ~i) + a + o | 0, s) + n | 0;
}
function y(e, t, r, i, n, a, o, s) {
return l(e + (t ^ (r | ~i)) + a + o | 0, s) + n | 0;
}
t.exports = d;
}, {
buffer: 66,
"hash-base": 107,
inherits: 140
} ],
185: [ function(e, t, r) {
var i = e("buffer"), n = i.Buffer;
function a(e, t) {
for (var r in e) t[r] = e[r];
}
if (n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow) t.exports = i; else {
a(i, r);
r.Buffer = o;
}
function o(e, t, r) {
return n(e, t, r);
}
a(n, o);
o.from = function(e, t, r) {
if ("number" == typeof e) throw new TypeError("Argument must not be a number");
return n(e, t, r);
};
o.alloc = function(e, t, r) {
if ("number" != typeof e) throw new TypeError("Argument must be a number");
var i = n(e);
void 0 !== t ? "string" == typeof r ? i.fill(t, r) : i.fill(t) : i.fill(0);
return i;
};
o.allocUnsafe = function(e) {
if ("number" != typeof e) throw new TypeError("Argument must be a number");
return n(e);
};
o.allocUnsafeSlow = function(e) {
if ("number" != typeof e) throw new TypeError("Argument must be a number");
return i.SlowBuffer(e);
};
}, {
buffer: 66
} ],
186: [ function(e, t) {
var r = e("safe-buffer").Buffer;
function i(e, t) {
this._block = r.alloc(e);
this._finalSize = t;
this._blockSize = e;
this._len = 0;
}
i.prototype.update = function(e, t) {
if ("string" == typeof e) {
t = t || "utf8";
e = r.from(e, t);
}
for (var i = this._block, n = this._blockSize, a = e.length, o = this._len, s = 0; s < a; ) {
for (var f = o % n, c = Math.min(a - s, n - f), u = 0; u < c; u++) i[f + u] = e[s + u];
s += c;
(o += c) % n == 0 && this._update(i);
}
this._len += a;
return this;
};
i.prototype.digest = function(e) {
var t = this._len % this._blockSize;
this._block[t] = 128;
this._block.fill(0, t + 1);
if (t >= this._finalSize) {
this._update(this._block);
this._block.fill(0);
}
var r = 8 * this._len;
if (r <= 4294967295) this._block.writeUInt32BE(r, this._blockSize - 4); else {
var i = (4294967295 & r) >>> 0, n = (r - i) / 4294967296;
this._block.writeUInt32BE(n, this._blockSize - 8);
this._block.writeUInt32BE(i, this._blockSize - 4);
}
this._update(this._block);
var a = this._hash();
return e ? a.toString(e) : a;
};
i.prototype._update = function() {
throw new Error("_update must be implemented by subclass");
};
t.exports = i;
}, {
"safe-buffer": 185
} ],
187: [ function(e, t, r) {
(r = t.exports = function(e) {
e = e.toLowerCase();
var t = r[e];
if (!t) throw new Error(e + " is not supported (we accept pull requests)");
return new t();
}).sha = e("./sha");
r.sha1 = e("./sha1");
r.sha224 = e("./sha224");
r.sha256 = e("./sha256");
r.sha384 = e("./sha384");
r.sha512 = e("./sha512");
}, {
"./sha": 188,
"./sha1": 189,
"./sha224": 190,
"./sha256": 191,
"./sha384": 192,
"./sha512": 193
} ],
188: [ function(e, t) {
var r = e("inherits"), i = e("./hash"), n = e("safe-buffer").Buffer, a = [ 1518500249, 1859775393, -1894007588, -899497514 ], o = new Array(80);
function s() {
this.init();
this._w = o;
i.call(this, 64, 56);
}
r(s, i);
s.prototype.init = function() {
this._a = 1732584193;
this._b = 4023233417;
this._c = 2562383102;
this._d = 271733878;
this._e = 3285377520;
return this;
};
function f(e) {
return e << 30 | e >>> 2;
}
function c(e, t, r, i) {
return 0 === e ? t & r | ~t & i : 2 === e ? t & r | t & i | r & i : t ^ r ^ i;
}
s.prototype._update = function(e) {
for (var t, r = this._w, i = 0 | this._a, n = 0 | this._b, o = 0 | this._c, s = 0 | this._d, u = 0 | this._e, h = 0; h < 16; ++h) r[h] = e.readInt32BE(4 * h);
for (;h < 80; ++h) r[h] = r[h - 3] ^ r[h - 8] ^ r[h - 14] ^ r[h - 16];
for (var d = 0; d < 80; ++d) {
var l = ~~(d / 20), p = ((t = i) << 5 | t >>> 27) + c(l, n, o, s) + u + r[d] + a[l] | 0;
u = s;
s = o;
o = f(n);
n = i;
i = p;
}
this._a = i + this._a | 0;
this._b = n + this._b | 0;
this._c = o + this._c | 0;
this._d = s + this._d | 0;
this._e = u + this._e | 0;
};
s.prototype._hash = function() {
var e = n.allocUnsafe(20);
e.writeInt32BE(0 | this._a, 0);
e.writeInt32BE(0 | this._b, 4);
e.writeInt32BE(0 | this._c, 8);
e.writeInt32BE(0 | this._d, 12);
e.writeInt32BE(0 | this._e, 16);
return e;
};
t.exports = s;
}, {
"./hash": 186,
inherits: 140,
"safe-buffer": 185
} ],
189: [ function(e, t) {
var r = e("inherits"), i = e("./hash"), n = e("safe-buffer").Buffer, a = [ 1518500249, 1859775393, -1894007588, -899497514 ], o = new Array(80);
function s() {
this.init();
this._w = o;
i.call(this, 64, 56);
}
r(s, i);
s.prototype.init = function() {
this._a = 1732584193;
this._b = 4023233417;
this._c = 2562383102;
this._d = 271733878;
this._e = 3285377520;
return this;
};
function f(e) {
return e << 5 | e >>> 27;
}
function c(e) {
return e << 30 | e >>> 2;
}
function u(e, t, r, i) {
return 0 === e ? t & r | ~t & i : 2 === e ? t & r | t & i | r & i : t ^ r ^ i;
}
s.prototype._update = function(e) {
for (var t, r = this._w, i = 0 | this._a, n = 0 | this._b, o = 0 | this._c, s = 0 | this._d, h = 0 | this._e, d = 0; d < 16; ++d) r[d] = e.readInt32BE(4 * d);
for (;d < 80; ++d) r[d] = (t = r[d - 3] ^ r[d - 8] ^ r[d - 14] ^ r[d - 16]) << 1 | t >>> 31;
for (var l = 0; l < 80; ++l) {
var p = ~~(l / 20), b = f(i) + u(p, n, o, s) + h + r[l] + a[p] | 0;
h = s;
s = o;
o = c(n);
n = i;
i = b;
}
this._a = i + this._a | 0;
this._b = n + this._b | 0;
this._c = o + this._c | 0;
this._d = s + this._d | 0;
this._e = h + this._e | 0;
};
s.prototype._hash = function() {
var e = n.allocUnsafe(20);
e.writeInt32BE(0 | this._a, 0);
e.writeInt32BE(0 | this._b, 4);
e.writeInt32BE(0 | this._c, 8);
e.writeInt32BE(0 | this._d, 12);
e.writeInt32BE(0 | this._e, 16);
return e;
};
t.exports = s;
}, {
"./hash": 186,
inherits: 140,
"safe-buffer": 185
} ],
190: [ function(e, t) {
var r = e("inherits"), i = e("./sha256"), n = e("./hash"), a = e("safe-buffer").Buffer, o = new Array(64);
function s() {
this.init();
this._w = o;
n.call(this, 64, 56);
}
r(s, i);
s.prototype.init = function() {
this._a = 3238371032;
this._b = 914150663;
this._c = 812702999;
this._d = 4144912697;
this._e = 4290775857;
this._f = 1750603025;
this._g = 1694076839;
this._h = 3204075428;
return this;
};
s.prototype._hash = function() {
var e = a.allocUnsafe(28);
e.writeInt32BE(this._a, 0);
e.writeInt32BE(this._b, 4);
e.writeInt32BE(this._c, 8);
e.writeInt32BE(this._d, 12);
e.writeInt32BE(this._e, 16);
e.writeInt32BE(this._f, 20);
e.writeInt32BE(this._g, 24);
return e;
};
t.exports = s;
}, {
"./hash": 186,
"./sha256": 191,
inherits: 140,
"safe-buffer": 185
} ],
191: [ function(e, t) {
var r = e("inherits"), i = e("./hash"), n = e("safe-buffer").Buffer, a = [ 1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298 ], o = new Array(64);
function s() {
this.init();
this._w = o;
i.call(this, 64, 56);
}
r(s, i);
s.prototype.init = function() {
this._a = 1779033703;
this._b = 3144134277;
this._c = 1013904242;
this._d = 2773480762;
this._e = 1359893119;
this._f = 2600822924;
this._g = 528734635;
this._h = 1541459225;
return this;
};
function f(e, t, r) {
return r ^ e & (t ^ r);
}
function c(e, t, r) {
return e & t | r & (e | t);
}
function u(e) {
return (e >>> 2 | e << 30) ^ (e >>> 13 | e << 19) ^ (e >>> 22 | e << 10);
}
function h(e) {
return (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
}
function d(e) {
return (e >>> 7 | e << 25) ^ (e >>> 18 | e << 14) ^ e >>> 3;
}
s.prototype._update = function(e) {
for (var t, r = this._w, i = 0 | this._a, n = 0 | this._b, o = 0 | this._c, s = 0 | this._d, l = 0 | this._e, p = 0 | this._f, b = 0 | this._g, m = 0 | this._h, g = 0; g < 16; ++g) r[g] = e.readInt32BE(4 * g);
for (;g < 64; ++g) r[g] = (((t = r[g - 2]) >>> 17 | t << 15) ^ (t >>> 19 | t << 13) ^ t >>> 10) + r[g - 7] + d(r[g - 15]) + r[g - 16] | 0;
for (var y = 0; y < 64; ++y) {
var v = m + h(l) + f(l, p, b) + a[y] + r[y] | 0, _ = u(i) + c(i, n, o) | 0;
m = b;
b = p;
p = l;
l = s + v | 0;
s = o;
o = n;
n = i;
i = v + _ | 0;
}
this._a = i + this._a | 0;
this._b = n + this._b | 0;
this._c = o + this._c | 0;
this._d = s + this._d | 0;
this._e = l + this._e | 0;
this._f = p + this._f | 0;
this._g = b + this._g | 0;
this._h = m + this._h | 0;
};
s.prototype._hash = function() {
var e = n.allocUnsafe(32);
e.writeInt32BE(this._a, 0);
e.writeInt32BE(this._b, 4);
e.writeInt32BE(this._c, 8);
e.writeInt32BE(this._d, 12);
e.writeInt32BE(this._e, 16);
e.writeInt32BE(this._f, 20);
e.writeInt32BE(this._g, 24);
e.writeInt32BE(this._h, 28);
return e;
};
t.exports = s;
}, {
"./hash": 186,
inherits: 140,
"safe-buffer": 185
} ],
192: [ function(e, t) {
var r = e("inherits"), i = e("./sha512"), n = e("./hash"), a = e("safe-buffer").Buffer, o = new Array(160);
function s() {
this.init();
this._w = o;
n.call(this, 128, 112);
}
r(s, i);
s.prototype.init = function() {
this._ah = 3418070365;
this._bh = 1654270250;
this._ch = 2438529370;
this._dh = 355462360;
this._eh = 1731405415;
this._fh = 2394180231;
this._gh = 3675008525;
this._hh = 1203062813;
this._al = 3238371032;
this._bl = 914150663;
this._cl = 812702999;
this._dl = 4144912697;
this._el = 4290775857;
this._fl = 1750603025;
this._gl = 1694076839;
this._hl = 3204075428;
return this;
};
s.prototype._hash = function() {
var e = a.allocUnsafe(48);
function t(t, r, i) {
e.writeInt32BE(t, i);
e.writeInt32BE(r, i + 4);
}
t(this._ah, this._al, 0);
t(this._bh, this._bl, 8);
t(this._ch, this._cl, 16);
t(this._dh, this._dl, 24);
t(this._eh, this._el, 32);
t(this._fh, this._fl, 40);
return e;
};
t.exports = s;
}, {
"./hash": 186,
"./sha512": 193,
inherits: 140,
"safe-buffer": 185
} ],
193: [ function(e, t) {
var r = e("inherits"), i = e("./hash"), n = e("safe-buffer").Buffer, a = [ 1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591 ], o = new Array(160);
function s() {
this.init();
this._w = o;
i.call(this, 128, 112);
}
r(s, i);
s.prototype.init = function() {
this._ah = 1779033703;
this._bh = 3144134277;
this._ch = 1013904242;
this._dh = 2773480762;
this._eh = 1359893119;
this._fh = 2600822924;
this._gh = 528734635;
this._hh = 1541459225;
this._al = 4089235720;
this._bl = 2227873595;
this._cl = 4271175723;
this._dl = 1595750129;
this._el = 2917565137;
this._fl = 725511199;
this._gl = 4215389547;
this._hl = 327033209;
return this;
};
function f(e, t, r) {
return r ^ e & (t ^ r);
}
function c(e, t, r) {
return e & t | r & (e | t);
}
function u(e, t) {
return (e >>> 28 | t << 4) ^ (t >>> 2 | e << 30) ^ (t >>> 7 | e << 25);
}
function h(e, t) {
return (e >>> 14 | t << 18) ^ (e >>> 18 | t << 14) ^ (t >>> 9 | e << 23);
}
function d(e, t) {
return (e >>> 1 | t << 31) ^ (e >>> 8 | t << 24) ^ e >>> 7;
}
function l(e, t) {
return (e >>> 1 | t << 31) ^ (e >>> 8 | t << 24) ^ (e >>> 7 | t << 25);
}
function p(e, t) {
return (e >>> 19 | t << 13) ^ (t >>> 29 | e << 3) ^ e >>> 6;
}
function b(e, t) {
return (e >>> 19 | t << 13) ^ (t >>> 29 | e << 3) ^ (e >>> 6 | t << 26);
}
function m(e, t) {
return e >>> 0 < t >>> 0 ? 1 : 0;
}
s.prototype._update = function(e) {
for (var t = this._w, r = 0 | this._ah, i = 0 | this._bh, n = 0 | this._ch, o = 0 | this._dh, s = 0 | this._eh, g = 0 | this._fh, y = 0 | this._gh, v = 0 | this._hh, _ = 0 | this._al, w = 0 | this._bl, M = 0 | this._cl, S = 0 | this._dl, E = 0 | this._el, k = 0 | this._fl, A = 0 | this._gl, x = 0 | this._hl, R = 0; R < 32; R += 2) {
t[R] = e.readInt32BE(4 * R);
t[R + 1] = e.readInt32BE(4 * R + 4);
}
for (;R < 160; R += 2) {
var T = t[R - 30], B = t[R - 30 + 1], j = d(T, B), I = l(B, T), P = p(T = t[R - 4], B = t[R - 4 + 1]), C = b(B, T), O = t[R - 14], L = t[R - 14 + 1], N = t[R - 32], D = t[R - 32 + 1], U = I + L | 0, q = j + O + m(U, I) | 0;
q = (q = q + P + m(U = U + C | 0, C) | 0) + N + m(U = U + D | 0, D) | 0;
t[R] = q;
t[R + 1] = U;
}
for (var z = 0; z < 160; z += 2) {
q = t[z];
U = t[z + 1];
var F = c(r, i, n), K = c(_, w, M), H = u(r, _), W = u(_, r), V = h(s, E), Y = h(E, s), J = a[z], G = a[z + 1], X = f(s, g, y), Z = f(E, k, A), $ = x + Y | 0, Q = v + V + m($, x) | 0;
Q = (Q = (Q = Q + X + m($ = $ + Z | 0, Z) | 0) + J + m($ = $ + G | 0, G) | 0) + q + m($ = $ + U | 0, U) | 0;
var ee = W + K | 0, te = H + F + m(ee, W) | 0;
v = y;
x = A;
y = g;
A = k;
g = s;
k = E;
s = o + Q + m(E = S + $ | 0, S) | 0;
o = n;
S = M;
n = i;
M = w;
i = r;
w = _;
r = Q + te + m(_ = $ + ee | 0, $) | 0;
}
this._al = this._al + _ | 0;
this._bl = this._bl + w | 0;
this._cl = this._cl + M | 0;
this._dl = this._dl + S | 0;
this._el = this._el + E | 0;
this._fl = this._fl + k | 0;
this._gl = this._gl + A | 0;
this._hl = this._hl + x | 0;
this._ah = this._ah + r + m(this._al, _) | 0;
this._bh = this._bh + i + m(this._bl, w) | 0;
this._ch = this._ch + n + m(this._cl, M) | 0;
this._dh = this._dh + o + m(this._dl, S) | 0;
this._eh = this._eh + s + m(this._el, E) | 0;
this._fh = this._fh + g + m(this._fl, k) | 0;
this._gh = this._gh + y + m(this._gl, A) | 0;
this._hh = this._hh + v + m(this._hl, x) | 0;
};
s.prototype._hash = function() {
var e = n.allocUnsafe(64);
function t(t, r, i) {
e.writeInt32BE(t, i);
e.writeInt32BE(r, i + 4);
}
t(this._ah, this._al, 0);
t(this._bh, this._bl, 8);
t(this._ch, this._cl, 16);
t(this._dh, this._dl, 24);
t(this._eh, this._el, 32);
t(this._fh, this._fl, 40);
t(this._gh, this._gl, 48);
t(this._hh, this._hl, 56);
return e;
};
t.exports = s;
}, {
"./hash": 186,
inherits: 140,
"safe-buffer": 185
} ],
194: [ function(e, t) {
t.exports = i;
var r = e("events").EventEmitter;
e("inherits")(i, r);
i.Readable = e("readable-stream/readable.js");
i.Writable = e("readable-stream/writable.js");
i.Duplex = e("readable-stream/duplex.js");
i.Transform = e("readable-stream/transform.js");
i.PassThrough = e("readable-stream/passthrough.js");
i.Stream = i;
function i() {
r.call(this);
}
i.prototype.pipe = function(e, t) {
var i = this;
function n(t) {
e.writable && !1 === e.write(t) && i.pause && i.pause();
}
i.on("data", n);
function a() {
i.readable && i.resume && i.resume();
}
e.on("drain", a);
if (!(e._isStdio || t && !1 === t.end)) {
i.on("end", s);
i.on("close", f);
}
var o = !1;
function s() {
if (!o) {
o = !0;
e.end();
}
}
function f() {
if (!o) {
o = !0;
"function" == typeof e.destroy && e.destroy();
}
}
function c(e) {
u();
if (0 === r.listenerCount(this, "error")) throw e;
}
i.on("error", c);
e.on("error", c);
function u() {
i.removeListener("data", n);
e.removeListener("drain", a);
i.removeListener("end", s);
i.removeListener("close", f);
i.removeListener("error", c);
e.removeListener("error", c);
i.removeListener("end", u);
i.removeListener("close", u);
e.removeListener("close", u);
}
i.on("end", u);
i.on("close", u);
e.on("close", u);
e.emit("pipe", i);
return e;
};
}, {
events: 105,
inherits: 140,
"readable-stream/duplex.js": 169,
"readable-stream/passthrough.js": 180,
"readable-stream/readable.js": 181,
"readable-stream/transform.js": 182,
"readable-stream/writable.js": 183
} ],
195: [ function(e, t, r) {
var i = e("buffer").Buffer, n = i.isEncoding || function(e) {
switch (e && e.toLowerCase()) {
case "hex":
case "utf8":
case "utf-8":
case "ascii":
case "binary":
case "base64":
case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
case "raw":
return !0;

default:
return !1;
}
};
function a(e) {
if (e && !n(e)) throw new Error("Unknown encoding: " + e);
}
var o = r.StringDecoder = function(e) {
this.encoding = (e || "utf8").toLowerCase().replace(/[-_]/, "");
a(e);
switch (this.encoding) {
case "utf8":
this.surrogateSize = 3;
break;

case "ucs2":
case "utf16le":
this.surrogateSize = 2;
this.detectIncompleteChar = f;
break;

case "base64":
this.surrogateSize = 3;
this.detectIncompleteChar = c;
break;

default:
this.write = s;
return;
}
this.charBuffer = new i(6);
this.charReceived = 0;
this.charLength = 0;
};
o.prototype.write = function(e) {
for (var t = ""; this.charLength; ) {
var r = e.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : e.length;
e.copy(this.charBuffer, this.charReceived, 0, r);
this.charReceived += r;
if (this.charReceived < this.charLength) return "";
e = e.slice(r, e.length);
if (!((i = (t = this.charBuffer.slice(0, this.charLength).toString(this.encoding)).charCodeAt(t.length - 1)) >= 55296 && i <= 56319)) {
this.charReceived = this.charLength = 0;
if (0 === e.length) return t;
break;
}
this.charLength += this.surrogateSize;
t = "";
}
this.detectIncompleteChar(e);
var i, n = e.length;
if (this.charLength) {
e.copy(this.charBuffer, 0, e.length - this.charReceived, n);
n -= this.charReceived;
}
n = (t += e.toString(this.encoding, 0, n)).length - 1;
if ((i = t.charCodeAt(n)) >= 55296 && i <= 56319) {
var a = this.surrogateSize;
this.charLength += a;
this.charReceived += a;
this.charBuffer.copy(this.charBuffer, a, 0, a);
e.copy(this.charBuffer, 0, 0, a);
return t.substring(0, n);
}
return t;
};
o.prototype.detectIncompleteChar = function(e) {
for (var t = e.length >= 3 ? 3 : e.length; t > 0; t--) {
var r = e[e.length - t];
if (1 == t && r >> 5 == 6) {
this.charLength = 2;
break;
}
if (t <= 2 && r >> 4 == 14) {
this.charLength = 3;
break;
}
if (t <= 3 && r >> 3 == 30) {
this.charLength = 4;
break;
}
}
this.charReceived = t;
};
o.prototype.end = function(e) {
var t = "";
e && e.length && (t = this.write(e));
if (this.charReceived) {
var r = this.charReceived, i = this.charBuffer, n = this.encoding;
t += i.slice(0, r).toString(n);
}
return t;
};
function s(e) {
return e.toString(this.encoding);
}
function f(e) {
this.charReceived = e.length % 2;
this.charLength = this.charReceived ? 2 : 0;
}
function c(e) {
this.charReceived = e.length % 3;
this.charLength = this.charReceived ? 3 : 0;
}
}, {
buffer: 66
} ],
196: [ function(e, t) {
(function(e) {
t.exports = function(e, t) {
if (r("noDeprecation")) return e;
var i = !1;
return function() {
if (!i) {
if (r("throwDeprecation")) throw new Error(t);
r("traceDeprecation") ? console.trace(t) : console.warn(t);
i = !0;
}
return e.apply(this, arguments);
};
};
function r(t) {
try {
if (!e.localStorage) return !1;
} catch (e) {
return !1;
}
var r = e.localStorage[t];
return null != r && "true" === String(r).toLowerCase();
}
}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {} ],
197: [ function(require, module, exports) {
var indexOf = require("indexof"), Object_keys = function(e) {
if (Object.keys) return Object.keys(e);
var t = [];
for (var r in e) t.push(r);
return t;
}, forEach = function(e, t) {
if (e.forEach) return e.forEach(t);
for (var r = 0; r < e.length; r++) t(e[r], r, e);
}, defineProp = function() {
try {
Object.defineProperty({}, "_", {});
return function(e, t, r) {
Object.defineProperty(e, t, {
writable: !0,
enumerable: !1,
configurable: !0,
value: r
});
};
} catch (e) {
return function(e, t, r) {
e[t] = r;
};
}
}(), globals = [ "Array", "Boolean", "Date", "Error", "EvalError", "Function", "Infinity", "JSON", "Math", "NaN", "Number", "Object", "RangeError", "ReferenceError", "RegExp", "String", "SyntaxError", "TypeError", "URIError", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "undefined", "unescape" ];
function Context() {}
Context.prototype = {};
var Script = exports.Script = function(e) {
if (!(this instanceof Script)) return new Script(e);
this.code = e;
};
Script.prototype.runInContext = function(e) {
if (!(e instanceof Context)) throw new TypeError("needs a 'context' argument.");
var t = document.createElement("iframe");
t.style || (t.style = {});
t.style.display = "none";
document.body.appendChild(t);
var r = t.contentWindow, i = r.eval, n = r.execScript;
if (!i && n) {
n.call(r, "null");
i = r.eval;
}
forEach(Object_keys(e), function(t) {
r[t] = e[t];
});
forEach(globals, function(t) {
e[t] && (r[t] = e[t]);
});
var a = Object_keys(r), o = i.call(r, this.code);
forEach(Object_keys(r), function(t) {
(t in e || -1 === indexOf(a, t)) && (e[t] = r[t]);
});
forEach(globals, function(t) {
t in e || defineProp(e, t, r[t]);
});
document.body.removeChild(t);
return o;
};
Script.prototype.runInThisContext = function() {
return eval(this.code);
};
Script.prototype.runInNewContext = function(e) {
var t = Script.createContext(e), r = this.runInContext(t);
forEach(Object_keys(t), function(r) {
e[r] = t[r];
});
return r;
};
forEach(Object_keys(Script.prototype), function(e) {
exports[e] = Script[e] = function(t) {
var r = Script(t);
return r[e].apply(r, [].slice.call(arguments, 1));
};
});
exports.createScript = function(e) {
return exports.Script(e);
};
exports.createContext = Script.createContext = function(e) {
var t = new Context();
"object" == typeof e && forEach(Object_keys(e), function(r) {
t[r] = e[r];
});
return t;
};
}, {
indexof: 139
} ],
Loading: [ function(e, t, r) {
"use strict";
cc._RF.push(t, "b3cbccZ+JhNsYIH/D2RGMRL", "Loading");
var i, n = this && this.__extends || (i = function(e, t) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
})(e, t);
}, function(e, t) {
i(e, t);
function r() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r());
}), a = this && this.__decorate || function(e, t, r, i) {
var n, a = arguments.length, o = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, r, i); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (o = (a < 3 ? n(o) : a > 3 ? n(t, r, o) : n(t, r)) || o);
return a > 3 && o && Object.defineProperty(t, r, o), o;
};
Object.defineProperty(r, "__esModule", {
value: !0
});
var o = e("../music/musicControl"), s = e("../userStore/userStore"), f = e("../ways/canvasSize"), c = e("../ways/eventPost"), u = e("../ways/load_Json_Pic"), h = cc._decorator, d = h.ccclass, l = (h.property, 
function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.isbagok = !1;
t.loadsce1 = !1;
t.loadsce2 = !1;
return t;
}
t.prototype.onLoad = function() {
f.default.canvasSize();
this.isbagok = !1;
this.loadsce1 = !1;
this.loadsce2 = !1;
this.progressBar = this.node.getChildByName("progressBar").getComponent(cc.ProgressBar);
};
t.prototype.start = function() {
var e = this;
s.default.handleInitUserDatalocal().then(function(t) {
t && e.loadchapterthings();
});
};
t.prototype.loadchapterthings = function() {
var e = this;
switch (s.default.localdate.chapter) {
case 0:
this.loadpublic(0);
cc.assetManager.loadBundle("n_chapter_0", function(t, r) {
if (r) {
s.default.n_chapter_0 = r;
e.pacetoJson();
}
});
break;

case 1:
this.loadpublic(1);
cc.assetManager.loadBundle("n_chapter_1", function(t, r) {
if (r) {
s.default.n_chapter_1 = r;
e.pacetoJson();
}
});
break;

case 2:
this.loadpublic(2);
cc.assetManager.loadBundle("n_chapter_2", function(t, r) {
if (r) {
s.default.n_chapter_2 = r;
e.pacetoJson();
}
});
break;

case 3:
this.loadpublic(3);
cc.assetManager.loadBundle("n_chapter_3", function(t, r) {
if (r) {
s.default.n_chapter_3 = r;
e.pacetoJson();
}
});
break;

case 4:
this.loadpublic(4);
cc.assetManager.loadBundle("n_chapter_3", function(e, t) {
t && (s.default.n_chapter_3 = t);
});
cc.assetManager.loadBundle("n_chapter_4", function(t, r) {
if (r) {
s.default.n_chapter_4 = r;
e.pacetoJson();
}
});
break;

case 5:
this.loadpublic(5);
cc.assetManager.loadBundle("n_chapter_3", function(e, t) {
t && (s.default.n_chapter_3 = t);
});
cc.assetManager.loadBundle("n_chapter_4", function(e, t) {
t && (s.default.n_chapter_4 = t);
});
cc.assetManager.loadBundle("n_chapter_5", function(t, r) {
if (r) {
s.default.n_chapter_5 = r;
e.pacetoJson();
}
});
break;

case 6:
this.loadpublic(6);
cc.assetManager.loadBundle("n_chapter_3", function(e, t) {
t && (s.default.n_chapter_3 = t);
});
cc.assetManager.loadBundle("n_chapter_4", function(e, t) {
t && (s.default.n_chapter_4 = t);
});
cc.assetManager.loadBundle("n_chapter_5", function(e, t) {
t && (s.default.n_chapter_5 = t);
});
cc.assetManager.loadBundle("n_chapter_6", function(t, r) {
if (r) {
s.default.n_chapter_6 = r;
e.pacetoJson();
}
});
}
};
t.prototype.loadpublic = function(e) {
var t = this;
cc.assetManager.loadBundle("n_chapter_public", function(r, i) {
if (i) {
s.default.n_chapter_public = i;
cc.resources.load("clert/recodeTable", function(r, i) {
if (i) {
s.default.recode_allpowers = i.json[e].allpowers;
s.default.timepower(s.default.offlineTime);
s.default.recode_startchapter = i.json[e].startchapter;
c.default.Env_apkevent_param("event_miss", "加载开始");
s.default.localdate.chapter == s.default.recode_startchapter && c.default.Env_apkevent_param("event_newmiss", "加载开始/章节开始");
c.default.Env_apkevent_param("event_clert", "第" + s.default.localdate.chapter + "章/章节开始");
t.loadsce1 = !0;
t.pacetoSce();
}
});
}
});
};
t.prototype.pacetoJson = function() {
var e = this;
u.default.loadJsonAll().then(function(t) {
if (t) {
o.default.playEffect("music_000");
e.loadsce2 = !0;
e.pacetoSce();
}
});
};
t.prototype.pacetoSce = function() {
var e = this;
console.log("laod", this.loadsce2, this.loadsce1);
if (this.loadsce1 && this.loadsce2) {
this.isbagok = !0;
cc.assetManager.loadBundle("textures_home", function(t, r) {
r.loadScene("scene/Home", function(t, r) {
e.progressBar.progress = t / r;
}, function(t, i) {
if (t) {
console.log("err", t);
r.loadScene("scene/Home", function(e, t) {
e || cc.director.runScene(t);
});
} else {
e.Mainscene = i;
e.node.getChildByName("progressBar").active = !1;
e.node.getChildByName("start").active = !0;
e.onTouch();
}
});
});
}
};
t.prototype.onTouch = function() {
this.node.on(cc.Node.EventType.TOUCH_START, this.on_touch_start, this);
this.node.on(cc.Node.EventType.TOUCH_END, this.on_touch_end, this);
};
t.prototype.offTouch = function() {
this.node.off(cc.Node.EventType.TOUCH_START, this.on_touch_start, this);
this.node.off(cc.Node.EventType.TOUCH_END, this.on_touch_end, this);
};
t.prototype.on_touch_start = function() {};
t.prototype.on_touch_end = function() {
this.offTouch();
o.default.stopEffect("music_000");
cc.director.runScene(this.Mainscene);
};
t.prototype.update = function(e) {
this.isbagok || (this.progressBar.progress += e / 10);
};
return a([ d ], t);
}(cc.Component));
r.default = l;
cc._RF.pop();
}, {
"../music/musicControl": "musicControl",
"../userStore/userStore": "userStore",
"../ways/canvasSize": "canvasSize",
"../ways/eventPost": "eventPost",
"../ways/load_Json_Pic": "load_Json_Pic"
} ],
Utils: [ function(e, t, r) {
"use strict";
cc._RF.push(t, "cbc45154e5Al6JLE/+LVf8K", "Utils");
Object.defineProperty(r, "__esModule", {
value: !0
});
var i = e("uuidv1"), n = e("aes-js"), a = e("crypto"), o = a.pbkdf2Sync("Moonumoon1890", "tsukigakirei", 1, 32, "sha512"), s = function() {
function e() {}
e.encrypt = function(e) {
var t = n.utils.utf8.toBytes(e), r = new n.ModeOfOperation.ctr(o, new n.Counter(5)).encrypt(t);
return n.utils.hex.fromBytes(r);
};
e.decrypt = function(e) {
var t = {};
try {
var r = n.utils.hex.toBytes(e), i = new n.ModeOfOperation.ctr(o, new n.Counter(5)).decrypt(r);
t.decryptedtext = n.utils.utf8.fromBytes(i);
} catch (e) {
cc.log(e);
t.error = e;
}
return t;
};
e.prototype.generateUUID = function() {
var e = {
node: [ 1, 35, 69, 103, 137, 171 ],
clockseq: 4660,
msecs: new Date().getTime(),
nsecs: 5678
};
return i(e);
};
e.prototype.md5 = function(e) {
return a.createHash("md5").update(e || "", "utf8").digest("hex");
};
e.prototype.rnd = function(e, t) {
return Math.floor(Math.random() * (t - e + 1) + e);
};
return e;
}();
r.default = s;
cc._RF.pop();
}, {
"aes-js": "aes-js",
crypto: 76,
uuidv1: "uuidv1"
} ],
addPower: [ function(e, t, r) {
"use strict";
cc._RF.push(t, "07ef2mFH8NA2osH5EzrRTkk", "addPower");
Object.defineProperty(r, "__esModule", {
value: !0
});
r.downpoweranim = r.addpower = void 0;
var i = e("../userStore/userStore"), n = e("./eventPost");
function a(e) {
e || (e = 0);
i.default.localdate.power += e;
if (i.default.localdate.power >= 0) {
n.default.Env("initpower");
n.default.Env("timepower");
} else n.default.Env("up_watch_video_get_power");
}
r.addpower = a;
function o(e, t, r) {
var i = cc.instantiate(e);
i.zIndex = 1e3;
r.addChild(i);
i.setPosition(t);
}
r.downpoweranim = o;
r.default = {
addpower: a,
downpoweranim: o
};
cc._RF.pop();
}, {
"../userStore/userStore": "userStore",
"./eventPost": "eventPost"
} ],
"aes-js": [ function(e, t, r) {
"use strict";
cc._RF.push(t, "b2b20X278RCdLbOO0vZ0Li4", "aes-js");
(function() {
function e(e) {
return parseInt(e) === e;
}
function i(t) {
if (!e(t.length)) return !1;
for (var r = 0; r < t.length; r++) if (!e(t[r]) || t[r] < 0 || t[r] > 255) return !1;
return !0;
}
function n(t, r) {
if (t.buffer && ArrayBuffer.isView(t) && "Uint8Array" === t.name) {
r && (t = t.slice ? t.slice() : Array.prototype.slice.call(t));
return t;
}
if (Array.isArray(t)) {
if (!i(t)) throw new Error("Array contains invalid value: " + t);
return new Uint8Array(t);
}
if (e(t.length) && i(t)) return new Uint8Array(t);
throw new Error("unsupported array-like object");
}
function a(e) {
return new Uint8Array(e);
}
function o(e, t, r, i, n) {
null == i && null == n || (e = e.slice ? e.slice(i, n) : Array.prototype.slice.call(e, i, n));
t.set(e, r);
}
var s, f = {
toBytes: function(e) {
var t = [], r = 0;
e = encodeURI(e);
for (;r < e.length; ) {
var i = e.charCodeAt(r++);
if (37 === i) {
t.push(parseInt(e.substr(r, 2), 16));
r += 2;
} else t.push(i);
}
return n(t);
},
fromBytes: function(e) {
for (var t = [], r = 0; r < e.length; ) {
var i = e[r];
if (i < 128) {
t.push(String.fromCharCode(i));
r++;
} else if (i > 191 && i < 224) {
t.push(String.fromCharCode((31 & i) << 6 | 63 & e[r + 1]));
r += 2;
} else {
t.push(String.fromCharCode((15 & i) << 12 | (63 & e[r + 1]) << 6 | 63 & e[r + 2]));
r += 3;
}
}
return t.join("");
}
}, c = (s = "0123456789abcdef", {
toBytes: function(e) {
for (var t = [], r = 0; r < e.length; r += 2) t.push(parseInt(e.substr(r, 2), 16));
return t;
},
fromBytes: function(e) {
for (var t = [], r = 0; r < e.length; r++) {
var i = e[r];
t.push(s[(240 & i) >> 4] + s[15 & i]);
}
return t.join("");
}
}), u = {
16: 10,
24: 12,
32: 14
}, h = [ 1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145 ], d = [ 99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22 ], l = [ 82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75, 198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125 ], p = [ 3328402341, 4168907908, 4000806809, 4135287693, 4294111757, 3597364157, 3731845041, 2445657428, 1613770832, 33620227, 3462883241, 1445669757, 3892248089, 3050821474, 1303096294, 3967186586, 2412431941, 528646813, 2311702848, 4202528135, 4026202645, 2992200171, 2387036105, 4226871307, 1101901292, 3017069671, 1604494077, 1169141738, 597466303, 1403299063, 3832705686, 2613100635, 1974974402, 3791519004, 1033081774, 1277568618, 1815492186, 2118074177, 4126668546, 2211236943, 1748251740, 1369810420, 3521504564, 4193382664, 3799085459, 2883115123, 1647391059, 706024767, 134480908, 2512897874, 1176707941, 2646852446, 806885416, 932615841, 168101135, 798661301, 235341577, 605164086, 461406363, 3756188221, 3454790438, 1311188841, 2142417613, 3933566367, 302582043, 495158174, 1479289972, 874125870, 907746093, 3698224818, 3025820398, 1537253627, 2756858614, 1983593293, 3084310113, 2108928974, 1378429307, 3722699582, 1580150641, 327451799, 2790478837, 3117535592, 0, 3253595436, 1075847264, 3825007647, 2041688520, 3059440621, 3563743934, 2378943302, 1740553945, 1916352843, 2487896798, 2555137236, 2958579944, 2244988746, 3151024235, 3320835882, 1336584933, 3992714006, 2252555205, 2588757463, 1714631509, 293963156, 2319795663, 3925473552, 67240454, 4269768577, 2689618160, 2017213508, 631218106, 1269344483, 2723238387, 1571005438, 2151694528, 93294474, 1066570413, 563977660, 1882732616, 4059428100, 1673313503, 2008463041, 2950355573, 1109467491, 537923632, 3858759450, 4260623118, 3218264685, 2177748300, 403442708, 638784309, 3287084079, 3193921505, 899127202, 2286175436, 773265209, 2479146071, 1437050866, 4236148354, 2050833735, 3362022572, 3126681063, 840505643, 3866325909, 3227541664, 427917720, 2655997905, 2749160575, 1143087718, 1412049534, 999329963, 193497219, 2353415882, 3354324521, 1807268051, 672404540, 2816401017, 3160301282, 369822493, 2916866934, 3688947771, 1681011286, 1949973070, 336202270, 2454276571, 201721354, 1210328172, 3093060836, 2680341085, 3184776046, 1135389935, 3294782118, 965841320, 831886756, 3554993207, 4068047243, 3588745010, 2345191491, 1849112409, 3664604599, 26054028, 2983581028, 2622377682, 1235855840, 3630984372, 2891339514, 4092916743, 3488279077, 3395642799, 4101667470, 1202630377, 268961816, 1874508501, 4034427016, 1243948399, 1546530418, 941366308, 1470539505, 1941222599, 2546386513, 3421038627, 2715671932, 3899946140, 1042226977, 2521517021, 1639824860, 227249030, 260737669, 3765465232, 2084453954, 1907733956, 3429263018, 2420656344, 100860677, 4160157185, 470683154, 3261161891, 1781871967, 2924959737, 1773779408, 394692241, 2579611992, 974986535, 664706745, 3655459128, 3958962195, 731420851, 571543859, 3530123707, 2849626480, 126783113, 865375399, 765172662, 1008606754, 361203602, 3387549984, 2278477385, 2857719295, 1344809080, 2782912378, 59542671, 1503764984, 160008576, 437062935, 1707065306, 3622233649, 2218934982, 3496503480, 2185314755, 697932208, 1512910199, 504303377, 2075177163, 2824099068, 1841019862, 739644986 ], b = [ 2781242211, 2230877308, 2582542199, 2381740923, 234877682, 3184946027, 2984144751, 1418839493, 1348481072, 50462977, 2848876391, 2102799147, 434634494, 1656084439, 3863849899, 2599188086, 1167051466, 2636087938, 1082771913, 2281340285, 368048890, 3954334041, 3381544775, 201060592, 3963727277, 1739838676, 4250903202, 3930435503, 3206782108, 4149453988, 2531553906, 1536934080, 3262494647, 484572669, 2923271059, 1783375398, 1517041206, 1098792767, 49674231, 1334037708, 1550332980, 4098991525, 886171109, 150598129, 2481090929, 1940642008, 1398944049, 1059722517, 201851908, 1385547719, 1699095331, 1587397571, 674240536, 2704774806, 252314885, 3039795866, 151914247, 908333586, 2602270848, 1038082786, 651029483, 1766729511, 3447698098, 2682942837, 454166793, 2652734339, 1951935532, 775166490, 758520603, 3000790638, 4004797018, 4217086112, 4137964114, 1299594043, 1639438038, 3464344499, 2068982057, 1054729187, 1901997871, 2534638724, 4121318227, 1757008337, 0, 750906861, 1614815264, 535035132, 3363418545, 3988151131, 3201591914, 1183697867, 3647454910, 1265776953, 3734260298, 3566750796, 3903871064, 1250283471, 1807470800, 717615087, 3847203498, 384695291, 3313910595, 3617213773, 1432761139, 2484176261, 3481945413, 283769337, 100925954, 2180939647, 4037038160, 1148730428, 3123027871, 3813386408, 4087501137, 4267549603, 3229630528, 2315620239, 2906624658, 3156319645, 1215313976, 82966005, 3747855548, 3245848246, 1974459098, 1665278241, 807407632, 451280895, 251524083, 1841287890, 1283575245, 337120268, 891687699, 801369324, 3787349855, 2721421207, 3431482436, 959321879, 1469301956, 4065699751, 2197585534, 1199193405, 2898814052, 3887750493, 724703513, 2514908019, 2696962144, 2551808385, 3516813135, 2141445340, 1715741218, 2119445034, 2872807568, 2198571144, 3398190662, 700968686, 3547052216, 1009259540, 2041044702, 3803995742, 487983883, 1991105499, 1004265696, 1449407026, 1316239930, 504629770, 3683797321, 168560134, 1816667172, 3837287516, 1570751170, 1857934291, 4014189740, 2797888098, 2822345105, 2754712981, 936633572, 2347923833, 852879335, 1133234376, 1500395319, 3084545389, 2348912013, 1689376213, 3533459022, 3762923945, 3034082412, 4205598294, 133428468, 634383082, 2949277029, 2398386810, 3913789102, 403703816, 3580869306, 2297460856, 1867130149, 1918643758, 607656988, 4049053350, 3346248884, 1368901318, 600565992, 2090982877, 2632479860, 557719327, 3717614411, 3697393085, 2249034635, 2232388234, 2430627952, 1115438654, 3295786421, 2865522278, 3633334344, 84280067, 33027830, 303828494, 2747425121, 1600795957, 4188952407, 3496589753, 2434238086, 1486471617, 658119965, 3106381470, 953803233, 334231800, 3005978776, 857870609, 3151128937, 1890179545, 2298973838, 2805175444, 3056442267, 574365214, 2450884487, 550103529, 1233637070, 4289353045, 2018519080, 2057691103, 2399374476, 4166623649, 2148108681, 387583245, 3664101311, 836232934, 3330556482, 3100665960, 3280093505, 2955516313, 2002398509, 287182607, 3413881008, 4238890068, 3597515707, 975967766 ], m = [ 1671808611, 2089089148, 2006576759, 2072901243, 4061003762, 1807603307, 1873927791, 3310653893, 810573872, 16974337, 1739181671, 729634347, 4263110654, 3613570519, 2883997099, 1989864566, 3393556426, 2191335298, 3376449993, 2106063485, 4195741690, 1508618841, 1204391495, 4027317232, 2917941677, 3563566036, 2734514082, 2951366063, 2629772188, 2767672228, 1922491506, 3227229120, 3082974647, 4246528509, 2477669779, 644500518, 911895606, 1061256767, 4144166391, 3427763148, 878471220, 2784252325, 3845444069, 4043897329, 1905517169, 3631459288, 827548209, 356461077, 67897348, 3344078279, 593839651, 3277757891, 405286936, 2527147926, 84871685, 2595565466, 118033927, 305538066, 2157648768, 3795705826, 3945188843, 661212711, 2999812018, 1973414517, 152769033, 2208177539, 745822252, 439235610, 455947803, 1857215598, 1525593178, 2700827552, 1391895634, 994932283, 3596728278, 3016654259, 695947817, 3812548067, 795958831, 2224493444, 1408607827, 3513301457, 0, 3979133421, 543178784, 4229948412, 2982705585, 1542305371, 1790891114, 3410398667, 3201918910, 961245753, 1256100938, 1289001036, 1491644504, 3477767631, 3496721360, 4012557807, 2867154858, 4212583931, 1137018435, 1305975373, 861234739, 2241073541, 1171229253, 4178635257, 33948674, 2139225727, 1357946960, 1011120188, 2679776671, 2833468328, 1374921297, 2751356323, 1086357568, 2408187279, 2460827538, 2646352285, 944271416, 4110742005, 3168756668, 3066132406, 3665145818, 560153121, 271589392, 4279952895, 4077846003, 3530407890, 3444343245, 202643468, 322250259, 3962553324, 1608629855, 2543990167, 1154254916, 389623319, 3294073796, 2817676711, 2122513534, 1028094525, 1689045092, 1575467613, 422261273, 1939203699, 1621147744, 2174228865, 1339137615, 3699352540, 577127458, 712922154, 2427141008, 2290289544, 1187679302, 3995715566, 3100863416, 339486740, 3732514782, 1591917662, 186455563, 3681988059, 3762019296, 844522546, 978220090, 169743370, 1239126601, 101321734, 611076132, 1558493276, 3260915650, 3547250131, 2901361580, 1655096418, 2443721105, 2510565781, 3828863972, 2039214713, 3878868455, 3359869896, 928607799, 1840765549, 2374762893, 3580146133, 1322425422, 2850048425, 1823791212, 1459268694, 4094161908, 3928346602, 1706019429, 2056189050, 2934523822, 135794696, 3134549946, 2022240376, 628050469, 779246638, 472135708, 2800834470, 3032970164, 3327236038, 3894660072, 3715932637, 1956440180, 522272287, 1272813131, 3185336765, 2340818315, 2323976074, 1888542832, 1044544574, 3049550261, 1722469478, 1222152264, 50660867, 4127324150, 236067854, 1638122081, 895445557, 1475980887, 3117443513, 2257655686, 3243809217, 489110045, 2662934430, 3778599393, 4162055160, 2561878936, 288563729, 1773916777, 3648039385, 2391345038, 2493985684, 2612407707, 505560094, 2274497927, 3911240169, 3460925390, 1442818645, 678973480, 3749357023, 2358182796, 2717407649, 2306869641, 219617805, 3218761151, 3862026214, 1120306242, 1756942440, 1103331905, 2578459033, 762796589, 252780047, 2966125488, 1425844308, 3151392187, 372911126 ], g = [ 1667474886, 2088535288, 2004326894, 2071694838, 4075949567, 1802223062, 1869591006, 3318043793, 808472672, 16843522, 1734846926, 724270422, 4278065639, 3621216949, 2880169549, 1987484396, 3402253711, 2189597983, 3385409673, 2105378810, 4210693615, 1499065266, 1195886990, 4042263547, 2913856577, 3570689971, 2728590687, 2947541573, 2627518243, 2762274643, 1920112356, 3233831835, 3082273397, 4261223649, 2475929149, 640051788, 909531756, 1061110142, 4160160501, 3435941763, 875846760, 2779116625, 3857003729, 4059105529, 1903268834, 3638064043, 825316194, 353713962, 67374088, 3351728789, 589522246, 3284360861, 404236336, 2526454071, 84217610, 2593830191, 117901582, 303183396, 2155911963, 3806477791, 3958056653, 656894286, 2998062463, 1970642922, 151591698, 2206440989, 741110872, 437923380, 454765878, 1852748508, 1515908788, 2694904667, 1381168804, 993742198, 3604373943, 3014905469, 690584402, 3823320797, 791638366, 2223281939, 1398011302, 3520161977, 0, 3991743681, 538992704, 4244381667, 2981218425, 1532751286, 1785380564, 3419096717, 3200178535, 960056178, 1246420628, 1280103576, 1482221744, 3486468741, 3503319995, 4025428677, 2863326543, 4227536621, 1128514950, 1296947098, 859002214, 2240123921, 1162203018, 4193849577, 33687044, 2139062782, 1347481760, 1010582648, 2678045221, 2829640523, 1364325282, 2745433693, 1077985408, 2408548869, 2459086143, 2644360225, 943212656, 4126475505, 3166494563, 3065430391, 3671750063, 555836226, 269496352, 4294908645, 4092792573, 3537006015, 3452783745, 202118168, 320025894, 3974901699, 1600119230, 2543297077, 1145359496, 387397934, 3301201811, 2812801621, 2122220284, 1027426170, 1684319432, 1566435258, 421079858, 1936954854, 1616945344, 2172753945, 1330631070, 3705438115, 572679748, 707427924, 2425400123, 2290647819, 1179044492, 4008585671, 3099120491, 336870440, 3739122087, 1583276732, 185277718, 3688593069, 3772791771, 842159716, 976899700, 168435220, 1229577106, 101059084, 606366792, 1549591736, 3267517855, 3553849021, 2897014595, 1650632388, 2442242105, 2509612081, 3840161747, 2038008818, 3890688725, 3368567691, 926374254, 1835907034, 2374863873, 3587531953, 1313788572, 2846482505, 1819063512, 1448540844, 4109633523, 3941213647, 1701162954, 2054852340, 2930698567, 134748176, 3132806511, 2021165296, 623210314, 774795868, 471606328, 2795958615, 3031746419, 3334885783, 3907527627, 3722280097, 1953799400, 522133822, 1263263126, 3183336545, 2341176845, 2324333839, 1886425312, 1044267644, 3048588401, 1718004428, 1212733584, 50529542, 4143317495, 235803164, 1633788866, 892690282, 1465383342, 3115962473, 2256965911, 3250673817, 488449850, 2661202215, 3789633753, 4177007595, 2560144171, 286339874, 1768537042, 3654906025, 2391705863, 2492770099, 2610673197, 505291324, 2273808917, 3924369609, 3469625735, 1431699370, 673740880, 3755965093, 2358021891, 2711746649, 2307489801, 218961690, 3217021541, 3873845719, 1111672452, 1751693520, 1094828930, 2576986153, 757954394, 252645662, 2964376443, 1414855848, 3149649517, 370555436 ], y = [ 1374988112, 2118214995, 437757123, 975658646, 1001089995, 530400753, 2902087851, 1273168787, 540080725, 2910219766, 2295101073, 4110568485, 1340463100, 3307916247, 641025152, 3043140495, 3736164937, 632953703, 1172967064, 1576976609, 3274667266, 2169303058, 2370213795, 1809054150, 59727847, 361929877, 3211623147, 2505202138, 3569255213, 1484005843, 1239443753, 2395588676, 1975683434, 4102977912, 2572697195, 666464733, 3202437046, 4035489047, 3374361702, 2110667444, 1675577880, 3843699074, 2538681184, 1649639237, 2976151520, 3144396420, 4269907996, 4178062228, 1883793496, 2403728665, 2497604743, 1383856311, 2876494627, 1917518562, 3810496343, 1716890410, 3001755655, 800440835, 2261089178, 3543599269, 807962610, 599762354, 33778362, 3977675356, 2328828971, 2809771154, 4077384432, 1315562145, 1708848333, 101039829, 3509871135, 3299278474, 875451293, 2733856160, 92987698, 2767645557, 193195065, 1080094634, 1584504582, 3178106961, 1042385657, 2531067453, 3711829422, 1306967366, 2438237621, 1908694277, 67556463, 1615861247, 429456164, 3602770327, 2302690252, 1742315127, 2968011453, 126454664, 3877198648, 2043211483, 2709260871, 2084704233, 4169408201, 0, 159417987, 841739592, 504459436, 1817866830, 4245618683, 260388950, 1034867998, 908933415, 168810852, 1750902305, 2606453969, 607530554, 202008497, 2472011535, 3035535058, 463180190, 2160117071, 1641816226, 1517767529, 470948374, 3801332234, 3231722213, 1008918595, 303765277, 235474187, 4069246893, 766945465, 337553864, 1475418501, 2943682380, 4003061179, 2743034109, 4144047775, 1551037884, 1147550661, 1543208500, 2336434550, 3408119516, 3069049960, 3102011747, 3610369226, 1113818384, 328671808, 2227573024, 2236228733, 3535486456, 2935566865, 3341394285, 496906059, 3702665459, 226906860, 2009195472, 733156972, 2842737049, 294930682, 1206477858, 2835123396, 2700099354, 1451044056, 573804783, 2269728455, 3644379585, 2362090238, 2564033334, 2801107407, 2776292904, 3669462566, 1068351396, 742039012, 1350078989, 1784663195, 1417561698, 4136440770, 2430122216, 775550814, 2193862645, 2673705150, 1775276924, 1876241833, 3475313331, 3366754619, 270040487, 3902563182, 3678124923, 3441850377, 1851332852, 3969562369, 2203032232, 3868552805, 2868897406, 566021896, 4011190502, 3135740889, 1248802510, 3936291284, 699432150, 832877231, 708780849, 3332740144, 899835584, 1951317047, 4236429990, 3767586992, 866637845, 4043610186, 1106041591, 2144161806, 395441711, 1984812685, 1139781709, 3433712980, 3835036895, 2664543715, 1282050075, 3240894392, 1181045119, 2640243204, 25965917, 4203181171, 4211818798, 3009879386, 2463879762, 3910161971, 1842759443, 2597806476, 933301370, 1509430414, 3943906441, 3467192302, 3076639029, 3776767469, 2051518780, 2631065433, 1441952575, 404016761, 1942435775, 1408749034, 1610459739, 3745345300, 2017778566, 3400528769, 3110650942, 941896748, 3265478751, 371049330, 3168937228, 675039627, 4279080257, 967311729, 135050206, 3635733660, 1683407248, 2076935265, 3576870512, 1215061108, 3501741890 ], v = [ 1347548327, 1400783205, 3273267108, 2520393566, 3409685355, 4045380933, 2880240216, 2471224067, 1428173050, 4138563181, 2441661558, 636813900, 4233094615, 3620022987, 2149987652, 2411029155, 1239331162, 1730525723, 2554718734, 3781033664, 46346101, 310463728, 2743944855, 3328955385, 3875770207, 2501218972, 3955191162, 3667219033, 768917123, 3545789473, 692707433, 1150208456, 1786102409, 2029293177, 1805211710, 3710368113, 3065962831, 401639597, 1724457132, 3028143674, 409198410, 2196052529, 1620529459, 1164071807, 3769721975, 2226875310, 486441376, 2499348523, 1483753576, 428819965, 2274680428, 3075636216, 598438867, 3799141122, 1474502543, 711349675, 129166120, 53458370, 2592523643, 2782082824, 4063242375, 2988687269, 3120694122, 1559041666, 730517276, 2460449204, 4042459122, 2706270690, 3446004468, 3573941694, 533804130, 2328143614, 2637442643, 2695033685, 839224033, 1973745387, 957055980, 2856345839, 106852767, 1371368976, 4181598602, 1033297158, 2933734917, 1179510461, 3046200461, 91341917, 1862534868, 4284502037, 605657339, 2547432937, 3431546947, 2003294622, 3182487618, 2282195339, 954669403, 3682191598, 1201765386, 3917234703, 3388507166, 0, 2198438022, 1211247597, 2887651696, 1315723890, 4227665663, 1443857720, 507358933, 657861945, 1678381017, 560487590, 3516619604, 975451694, 2970356327, 261314535, 3535072918, 2652609425, 1333838021, 2724322336, 1767536459, 370938394, 182621114, 3854606378, 1128014560, 487725847, 185469197, 2918353863, 3106780840, 3356761769, 2237133081, 1286567175, 3152976349, 4255350624, 2683765030, 3160175349, 3309594171, 878443390, 1988838185, 3704300486, 1756818940, 1673061617, 3403100636, 272786309, 1075025698, 545572369, 2105887268, 4174560061, 296679730, 1841768865, 1260232239, 4091327024, 3960309330, 3497509347, 1814803222, 2578018489, 4195456072, 575138148, 3299409036, 446754879, 3629546796, 4011996048, 3347532110, 3252238545, 4270639778, 915985419, 3483825537, 681933534, 651868046, 2755636671, 3828103837, 223377554, 2607439820, 1649704518, 3270937875, 3901806776, 1580087799, 4118987695, 3198115200, 2087309459, 2842678573, 3016697106, 1003007129, 2802849917, 1860738147, 2077965243, 164439672, 4100872472, 32283319, 2827177882, 1709610350, 2125135846, 136428751, 3874428392, 3652904859, 3460984630, 3572145929, 3593056380, 2939266226, 824852259, 818324884, 3224740454, 930369212, 2801566410, 2967507152, 355706840, 1257309336, 4148292826, 243256656, 790073846, 2373340630, 1296297904, 1422699085, 3756299780, 3818836405, 457992840, 3099667487, 2135319889, 77422314, 1560382517, 1945798516, 788204353, 1521706781, 1385356242, 870912086, 325965383, 2358957921, 2050466060, 2388260884, 2313884476, 4006521127, 901210569, 3990953189, 1014646705, 1503449823, 1062597235, 2031621326, 3212035895, 3931371469, 1533017514, 350174575, 2256028891, 2177544179, 1052338372, 741876788, 1606591296, 1914052035, 213705253, 2334669897, 1107234197, 1899603969, 3725069491, 2631447780, 2422494913, 1635502980, 1893020342, 1950903388, 1120974935 ], _ = [ 2807058932, 1699970625, 2764249623, 1586903591, 1808481195, 1173430173, 1487645946, 59984867, 4199882800, 1844882806, 1989249228, 1277555970, 3623636965, 3419915562, 1149249077, 2744104290, 1514790577, 459744698, 244860394, 3235995134, 1963115311, 4027744588, 2544078150, 4190530515, 1608975247, 2627016082, 2062270317, 1507497298, 2200818878, 567498868, 1764313568, 3359936201, 2305455554, 2037970062, 1047239e3, 1910319033, 1337376481, 2904027272, 2892417312, 984907214, 1243112415, 830661914, 861968209, 2135253587, 2011214180, 2927934315, 2686254721, 731183368, 1750626376, 4246310725, 1820824798, 4172763771, 3542330227, 48394827, 2404901663, 2871682645, 671593195, 3254988725, 2073724613, 145085239, 2280796200, 2779915199, 1790575107, 2187128086, 472615631, 3029510009, 4075877127, 3802222185, 4107101658, 3201631749, 1646252340, 4270507174, 1402811438, 1436590835, 3778151818, 3950355702, 3963161475, 4020912224, 2667994737, 273792366, 2331590177, 104699613, 95345982, 3175501286, 2377486676, 1560637892, 3564045318, 369057872, 4213447064, 3919042237, 1137477952, 2658625497, 1119727848, 2340947849, 1530455833, 4007360968, 172466556, 266959938, 516552836, 0, 2256734592, 3980931627, 1890328081, 1917742170, 4294704398, 945164165, 3575528878, 958871085, 3647212047, 2787207260, 1423022939, 775562294, 1739656202, 3876557655, 2530391278, 2443058075, 3310321856, 547512796, 1265195639, 437656594, 3121275539, 719700128, 3762502690, 387781147, 218828297, 3350065803, 2830708150, 2848461854, 428169201, 122466165, 3720081049, 1627235199, 648017665, 4122762354, 1002783846, 2117360635, 695634755, 3336358691, 4234721005, 4049844452, 3704280881, 2232435299, 574624663, 287343814, 612205898, 1039717051, 840019705, 2708326185, 793451934, 821288114, 1391201670, 3822090177, 376187827, 3113855344, 1224348052, 1679968233, 2361698556, 1058709744, 752375421, 2431590963, 1321699145, 3519142200, 2734591178, 188127444, 2177869557, 3727205754, 2384911031, 3215212461, 2648976442, 2450346104, 3432737375, 1180849278, 331544205, 3102249176, 4150144569, 2952102595, 2159976285, 2474404304, 766078933, 313773861, 2570832044, 2108100632, 1668212892, 3145456443, 2013908262, 418672217, 3070356634, 2594734927, 1852171925, 3867060991, 3473416636, 3907448597, 2614737639, 919489135, 164948639, 2094410160, 2997825956, 590424639, 2486224549, 1723872674, 3157750862, 3399941250, 3501252752, 3625268135, 2555048196, 3673637356, 1343127501, 4130281361, 3599595085, 2957853679, 1297403050, 81781910, 3051593425, 2283490410, 532201772, 1367295589, 3926170974, 895287692, 1953757831, 1093597963, 492483431, 3528626907, 1446242576, 1192455638, 1636604631, 209336225, 344873464, 1015671571, 669961897, 3375740769, 3857572124, 2973530695, 3747192018, 1933530610, 3464042516, 935293895, 3454686199, 2858115069, 1863638845, 3683022916, 4085369519, 3292445032, 875313188, 1080017571, 3279033885, 621591778, 1233856572, 2504130317, 24197544, 3017672716, 3835484340, 3247465558, 2220981195, 3060847922, 1551124588, 1463996600 ], w = [ 4104605777, 1097159550, 396673818, 660510266, 2875968315, 2638606623, 4200115116, 3808662347, 821712160, 1986918061, 3430322568, 38544885, 3856137295, 718002117, 893681702, 1654886325, 2975484382, 3122358053, 3926825029, 4274053469, 796197571, 1290801793, 1184342925, 3556361835, 2405426947, 2459735317, 1836772287, 1381620373, 3196267988, 1948373848, 3764988233, 3385345166, 3263785589, 2390325492, 1480485785, 3111247143, 3780097726, 2293045232, 548169417, 3459953789, 3746175075, 439452389, 1362321559, 1400849762, 1685577905, 1806599355, 2174754046, 137073913, 1214797936, 1174215055, 3731654548, 2079897426, 1943217067, 1258480242, 529487843, 1437280870, 3945269170, 3049390895, 3313212038, 923313619, 679998e3, 3215307299, 57326082, 377642221, 3474729866, 2041877159, 133361907, 1776460110, 3673476453, 96392454, 878845905, 2801699524, 777231668, 4082475170, 2330014213, 4142626212, 2213296395, 1626319424, 1906247262, 1846563261, 562755902, 3708173718, 1040559837, 3871163981, 1418573201, 3294430577, 114585348, 1343618912, 2566595609, 3186202582, 1078185097, 3651041127, 3896688048, 2307622919, 425408743, 3371096953, 2081048481, 1108339068, 2216610296, 0, 2156299017, 736970802, 292596766, 1517440620, 251657213, 2235061775, 2933202493, 758720310, 265905162, 1554391400, 1532285339, 908999204, 174567692, 1474760595, 4002861748, 2610011675, 3234156416, 3693126241, 2001430874, 303699484, 2478443234, 2687165888, 585122620, 454499602, 151849742, 2345119218, 3064510765, 514443284, 4044981591, 1963412655, 2581445614, 2137062819, 19308535, 1928707164, 1715193156, 4219352155, 1126790795, 600235211, 3992742070, 3841024952, 836553431, 1669664834, 2535604243, 3323011204, 1243905413, 3141400786, 4180808110, 698445255, 2653899549, 2989552604, 2253581325, 3252932727, 3004591147, 1891211689, 2487810577, 3915653703, 4237083816, 4030667424, 2100090966, 865136418, 1229899655, 953270745, 3399679628, 3557504664, 4118925222, 2061379749, 3079546586, 2915017791, 983426092, 2022837584, 1607244650, 2118541908, 2366882550, 3635996816, 972512814, 3283088770, 1568718495, 3499326569, 3576539503, 621982671, 2895723464, 410887952, 2623762152, 1002142683, 645401037, 1494807662, 2595684844, 1335535747, 2507040230, 4293295786, 3167684641, 367585007, 3885750714, 1865862730, 2668221674, 2960971305, 2763173681, 1059270954, 2777952454, 2724642869, 1320957812, 2194319100, 2429595872, 2815956275, 77089521, 3973773121, 3444575871, 2448830231, 1305906550, 4021308739, 2857194700, 2516901860, 3518358430, 1787304780, 740276417, 1699839814, 1592394909, 2352307457, 2272556026, 188821243, 1729977011, 3687994002, 274084841, 3594982253, 3613494426, 2701949495, 4162096729, 322734571, 2837966542, 1640576439, 484830689, 1202797690, 3537852828, 4067639125, 349075736, 3342319475, 4157467219, 4255800159, 1030690015, 1155237496, 2951971274, 1757691577, 607398968, 2738905026, 499347990, 3794078908, 1011452712, 227885567, 2818666809, 213114376, 3034881240, 1455525988, 3414450555, 850817237, 1817998408, 3092726480 ], M = [ 0, 235474187, 470948374, 303765277, 941896748, 908933415, 607530554, 708780849, 1883793496, 2118214995, 1817866830, 1649639237, 1215061108, 1181045119, 1417561698, 1517767529, 3767586992, 4003061179, 4236429990, 4069246893, 3635733660, 3602770327, 3299278474, 3400528769, 2430122216, 2664543715, 2362090238, 2193862645, 2835123396, 2801107407, 3035535058, 3135740889, 3678124923, 3576870512, 3341394285, 3374361702, 3810496343, 3977675356, 4279080257, 4043610186, 2876494627, 2776292904, 3076639029, 3110650942, 2472011535, 2640243204, 2403728665, 2169303058, 1001089995, 899835584, 666464733, 699432150, 59727847, 226906860, 530400753, 294930682, 1273168787, 1172967064, 1475418501, 1509430414, 1942435775, 2110667444, 1876241833, 1641816226, 2910219766, 2743034109, 2976151520, 3211623147, 2505202138, 2606453969, 2302690252, 2269728455, 3711829422, 3543599269, 3240894392, 3475313331, 3843699074, 3943906441, 4178062228, 4144047775, 1306967366, 1139781709, 1374988112, 1610459739, 1975683434, 2076935265, 1775276924, 1742315127, 1034867998, 866637845, 566021896, 800440835, 92987698, 193195065, 429456164, 395441711, 1984812685, 2017778566, 1784663195, 1683407248, 1315562145, 1080094634, 1383856311, 1551037884, 101039829, 135050206, 437757123, 337553864, 1042385657, 807962610, 573804783, 742039012, 2531067453, 2564033334, 2328828971, 2227573024, 2935566865, 2700099354, 3001755655, 3168937228, 3868552805, 3902563182, 4203181171, 4102977912, 3736164937, 3501741890, 3265478751, 3433712980, 1106041591, 1340463100, 1576976609, 1408749034, 2043211483, 2009195472, 1708848333, 1809054150, 832877231, 1068351396, 766945465, 599762354, 159417987, 126454664, 361929877, 463180190, 2709260871, 2943682380, 3178106961, 3009879386, 2572697195, 2538681184, 2236228733, 2336434550, 3509871135, 3745345300, 3441850377, 3274667266, 3910161971, 3877198648, 4110568485, 4211818798, 2597806476, 2497604743, 2261089178, 2295101073, 2733856160, 2902087851, 3202437046, 2968011453, 3936291284, 3835036895, 4136440770, 4169408201, 3535486456, 3702665459, 3467192302, 3231722213, 2051518780, 1951317047, 1716890410, 1750902305, 1113818384, 1282050075, 1584504582, 1350078989, 168810852, 67556463, 371049330, 404016761, 841739592, 1008918595, 775550814, 540080725, 3969562369, 3801332234, 4035489047, 4269907996, 3569255213, 3669462566, 3366754619, 3332740144, 2631065433, 2463879762, 2160117071, 2395588676, 2767645557, 2868897406, 3102011747, 3069049960, 202008497, 33778362, 270040487, 504459436, 875451293, 975658646, 675039627, 641025152, 2084704233, 1917518562, 1615861247, 1851332852, 1147550661, 1248802510, 1484005843, 1451044056, 933301370, 967311729, 733156972, 632953703, 260388950, 25965917, 328671808, 496906059, 1206477858, 1239443753, 1543208500, 1441952575, 2144161806, 1908694277, 1675577880, 1842759443, 3610369226, 3644379585, 3408119516, 3307916247, 4011190502, 3776767469, 4077384432, 4245618683, 2809771154, 2842737049, 3144396420, 3043140495, 2673705150, 2438237621, 2203032232, 2370213795 ], S = [ 0, 185469197, 370938394, 487725847, 741876788, 657861945, 975451694, 824852259, 1483753576, 1400783205, 1315723890, 1164071807, 1950903388, 2135319889, 1649704518, 1767536459, 2967507152, 3152976349, 2801566410, 2918353863, 2631447780, 2547432937, 2328143614, 2177544179, 3901806776, 3818836405, 4270639778, 4118987695, 3299409036, 3483825537, 3535072918, 3652904859, 2077965243, 1893020342, 1841768865, 1724457132, 1474502543, 1559041666, 1107234197, 1257309336, 598438867, 681933534, 901210569, 1052338372, 261314535, 77422314, 428819965, 310463728, 3409685355, 3224740454, 3710368113, 3593056380, 3875770207, 3960309330, 4045380933, 4195456072, 2471224067, 2554718734, 2237133081, 2388260884, 3212035895, 3028143674, 2842678573, 2724322336, 4138563181, 4255350624, 3769721975, 3955191162, 3667219033, 3516619604, 3431546947, 3347532110, 2933734917, 2782082824, 3099667487, 3016697106, 2196052529, 2313884476, 2499348523, 2683765030, 1179510461, 1296297904, 1347548327, 1533017514, 1786102409, 1635502980, 2087309459, 2003294622, 507358933, 355706840, 136428751, 53458370, 839224033, 957055980, 605657339, 790073846, 2373340630, 2256028891, 2607439820, 2422494913, 2706270690, 2856345839, 3075636216, 3160175349, 3573941694, 3725069491, 3273267108, 3356761769, 4181598602, 4063242375, 4011996048, 3828103837, 1033297158, 915985419, 730517276, 545572369, 296679730, 446754879, 129166120, 213705253, 1709610350, 1860738147, 1945798516, 2029293177, 1239331162, 1120974935, 1606591296, 1422699085, 4148292826, 4233094615, 3781033664, 3931371469, 3682191598, 3497509347, 3446004468, 3328955385, 2939266226, 2755636671, 3106780840, 2988687269, 2198438022, 2282195339, 2501218972, 2652609425, 1201765386, 1286567175, 1371368976, 1521706781, 1805211710, 1620529459, 2105887268, 1988838185, 533804130, 350174575, 164439672, 46346101, 870912086, 954669403, 636813900, 788204353, 2358957921, 2274680428, 2592523643, 2441661558, 2695033685, 2880240216, 3065962831, 3182487618, 3572145929, 3756299780, 3270937875, 3388507166, 4174560061, 4091327024, 4006521127, 3854606378, 1014646705, 930369212, 711349675, 560487590, 272786309, 457992840, 106852767, 223377554, 1678381017, 1862534868, 1914052035, 2031621326, 1211247597, 1128014560, 1580087799, 1428173050, 32283319, 182621114, 401639597, 486441376, 768917123, 651868046, 1003007129, 818324884, 1503449823, 1385356242, 1333838021, 1150208456, 1973745387, 2125135846, 1673061617, 1756818940, 2970356327, 3120694122, 2802849917, 2887651696, 2637442643, 2520393566, 2334669897, 2149987652, 3917234703, 3799141122, 4284502037, 4100872472, 3309594171, 3460984630, 3545789473, 3629546796, 2050466060, 1899603969, 1814803222, 1730525723, 1443857720, 1560382517, 1075025698, 1260232239, 575138148, 692707433, 878443390, 1062597235, 243256656, 91341917, 409198410, 325965383, 3403100636, 3252238545, 3704300486, 3620022987, 3874428392, 3990953189, 4042459122, 4227665663, 2460449204, 2578018489, 2226875310, 2411029155, 3198115200, 3046200461, 2827177882, 2743944855 ], E = [ 0, 218828297, 437656594, 387781147, 875313188, 958871085, 775562294, 590424639, 1750626376, 1699970625, 1917742170, 2135253587, 1551124588, 1367295589, 1180849278, 1265195639, 3501252752, 3720081049, 3399941250, 3350065803, 3835484340, 3919042237, 4270507174, 4085369519, 3102249176, 3051593425, 2734591178, 2952102595, 2361698556, 2177869557, 2530391278, 2614737639, 3145456443, 3060847922, 2708326185, 2892417312, 2404901663, 2187128086, 2504130317, 2555048196, 3542330227, 3727205754, 3375740769, 3292445032, 3876557655, 3926170974, 4246310725, 4027744588, 1808481195, 1723872674, 1910319033, 2094410160, 1608975247, 1391201670, 1173430173, 1224348052, 59984867, 244860394, 428169201, 344873464, 935293895, 984907214, 766078933, 547512796, 1844882806, 1627235199, 2011214180, 2062270317, 1507497298, 1423022939, 1137477952, 1321699145, 95345982, 145085239, 532201772, 313773861, 830661914, 1015671571, 731183368, 648017665, 3175501286, 2957853679, 2807058932, 2858115069, 2305455554, 2220981195, 2474404304, 2658625497, 3575528878, 3625268135, 3473416636, 3254988725, 3778151818, 3963161475, 4213447064, 4130281361, 3599595085, 3683022916, 3432737375, 3247465558, 3802222185, 4020912224, 4172763771, 4122762354, 3201631749, 3017672716, 2764249623, 2848461854, 2331590177, 2280796200, 2431590963, 2648976442, 104699613, 188127444, 472615631, 287343814, 840019705, 1058709744, 671593195, 621591778, 1852171925, 1668212892, 1953757831, 2037970062, 1514790577, 1463996600, 1080017571, 1297403050, 3673637356, 3623636965, 3235995134, 3454686199, 4007360968, 3822090177, 4107101658, 4190530515, 2997825956, 3215212461, 2830708150, 2779915199, 2256734592, 2340947849, 2627016082, 2443058075, 172466556, 122466165, 273792366, 492483431, 1047239e3, 861968209, 612205898, 695634755, 1646252340, 1863638845, 2013908262, 1963115311, 1446242576, 1530455833, 1277555970, 1093597963, 1636604631, 1820824798, 2073724613, 1989249228, 1436590835, 1487645946, 1337376481, 1119727848, 164948639, 81781910, 331544205, 516552836, 1039717051, 821288114, 669961897, 719700128, 2973530695, 3157750862, 2871682645, 2787207260, 2232435299, 2283490410, 2667994737, 2450346104, 3647212047, 3564045318, 3279033885, 3464042516, 3980931627, 3762502690, 4150144569, 4199882800, 3070356634, 3121275539, 2904027272, 2686254721, 2200818878, 2384911031, 2570832044, 2486224549, 3747192018, 3528626907, 3310321856, 3359936201, 3950355702, 3867060991, 4049844452, 4234721005, 1739656202, 1790575107, 2108100632, 1890328081, 1402811438, 1586903591, 1233856572, 1149249077, 266959938, 48394827, 369057872, 418672217, 1002783846, 919489135, 567498868, 752375421, 209336225, 24197544, 376187827, 459744698, 945164165, 895287692, 574624663, 793451934, 1679968233, 1764313568, 2117360635, 1933530610, 1343127501, 1560637892, 1243112415, 1192455638, 3704280881, 3519142200, 3336358691, 3419915562, 3907448597, 3857572124, 4075877127, 4294704398, 3029510009, 3113855344, 2927934315, 2744104290, 2159976285, 2377486676, 2594734927, 2544078150 ], k = [ 0, 151849742, 303699484, 454499602, 607398968, 758720310, 908999204, 1059270954, 1214797936, 1097159550, 1517440620, 1400849762, 1817998408, 1699839814, 2118541908, 2001430874, 2429595872, 2581445614, 2194319100, 2345119218, 3034881240, 3186202582, 2801699524, 2951971274, 3635996816, 3518358430, 3399679628, 3283088770, 4237083816, 4118925222, 4002861748, 3885750714, 1002142683, 850817237, 698445255, 548169417, 529487843, 377642221, 227885567, 77089521, 1943217067, 2061379749, 1640576439, 1757691577, 1474760595, 1592394909, 1174215055, 1290801793, 2875968315, 2724642869, 3111247143, 2960971305, 2405426947, 2253581325, 2638606623, 2487810577, 3808662347, 3926825029, 4044981591, 4162096729, 3342319475, 3459953789, 3576539503, 3693126241, 1986918061, 2137062819, 1685577905, 1836772287, 1381620373, 1532285339, 1078185097, 1229899655, 1040559837, 923313619, 740276417, 621982671, 439452389, 322734571, 137073913, 19308535, 3871163981, 4021308739, 4104605777, 4255800159, 3263785589, 3414450555, 3499326569, 3651041127, 2933202493, 2815956275, 3167684641, 3049390895, 2330014213, 2213296395, 2566595609, 2448830231, 1305906550, 1155237496, 1607244650, 1455525988, 1776460110, 1626319424, 2079897426, 1928707164, 96392454, 213114376, 396673818, 514443284, 562755902, 679998e3, 865136418, 983426092, 3708173718, 3557504664, 3474729866, 3323011204, 4180808110, 4030667424, 3945269170, 3794078908, 2507040230, 2623762152, 2272556026, 2390325492, 2975484382, 3092726480, 2738905026, 2857194700, 3973773121, 3856137295, 4274053469, 4157467219, 3371096953, 3252932727, 3673476453, 3556361835, 2763173681, 2915017791, 3064510765, 3215307299, 2156299017, 2307622919, 2459735317, 2610011675, 2081048481, 1963412655, 1846563261, 1729977011, 1480485785, 1362321559, 1243905413, 1126790795, 878845905, 1030690015, 645401037, 796197571, 274084841, 425408743, 38544885, 188821243, 3613494426, 3731654548, 3313212038, 3430322568, 4082475170, 4200115116, 3780097726, 3896688048, 2668221674, 2516901860, 2366882550, 2216610296, 3141400786, 2989552604, 2837966542, 2687165888, 1202797690, 1320957812, 1437280870, 1554391400, 1669664834, 1787304780, 1906247262, 2022837584, 265905162, 114585348, 499347990, 349075736, 736970802, 585122620, 972512814, 821712160, 2595684844, 2478443234, 2293045232, 2174754046, 3196267988, 3079546586, 2895723464, 2777952454, 3537852828, 3687994002, 3234156416, 3385345166, 4142626212, 4293295786, 3841024952, 3992742070, 174567692, 57326082, 410887952, 292596766, 777231668, 660510266, 1011452712, 893681702, 1108339068, 1258480242, 1343618912, 1494807662, 1715193156, 1865862730, 1948373848, 2100090966, 2701949495, 2818666809, 3004591147, 3122358053, 2235061775, 2352307457, 2535604243, 2653899549, 3915653703, 3764988233, 4219352155, 4067639125, 3444575871, 3294430577, 3746175075, 3594982253, 836553431, 953270745, 600235211, 718002117, 367585007, 484830689, 133361907, 251657213, 2041877159, 1891211689, 1806599355, 1654886325, 1568718495, 1418573201, 1335535747, 1184342925 ];
function A(e) {
for (var t = [], r = 0; r < e.length; r += 4) t.push(e[r] << 24 | e[r + 1] << 16 | e[r + 2] << 8 | e[r + 3]);
return t;
}
var x = function e(t) {
if (!(this instanceof e)) throw Error("AES must be instanitated with `new`");
Object.defineProperty(this, "key", {
value: n(t, !0)
});
this._prepare();
};
x.prototype._prepare = function() {
var e = u[this.key.length];
if (null == e) throw new Error("invalid key size (must be 16, 24 or 32 bytes)");
this._Ke = [];
this._Kd = [];
for (var t = 0; t <= e; t++) {
this._Ke.push([ 0, 0, 0, 0 ]);
this._Kd.push([ 0, 0, 0, 0 ]);
}
var r, i = 4 * (e + 1), n = this.key.length / 4, a = A(this.key);
for (t = 0; t < n; t++) {
r = t >> 2;
this._Ke[r][t % 4] = a[t];
this._Kd[e - r][t % 4] = a[t];
}
for (var o, s = 0, f = n; f < i; ) {
o = a[n - 1];
a[0] ^= d[o >> 16 & 255] << 24 ^ d[o >> 8 & 255] << 16 ^ d[255 & o] << 8 ^ d[o >> 24 & 255] ^ h[s] << 24;
s += 1;
if (8 != n) for (t = 1; t < n; t++) a[t] ^= a[t - 1]; else {
for (t = 1; t < n / 2; t++) a[t] ^= a[t - 1];
o = a[n / 2 - 1];
a[n / 2] ^= d[255 & o] ^ d[o >> 8 & 255] << 8 ^ d[o >> 16 & 255] << 16 ^ d[o >> 24 & 255] << 24;
for (t = n / 2 + 1; t < n; t++) a[t] ^= a[t - 1];
}
for (t = 0; t < n && f < i; ) {
c = f >> 2;
l = f % 4;
this._Ke[c][l] = a[t];
this._Kd[e - c][l] = a[t++];
f++;
}
}
for (var c = 1; c < e; c++) for (var l = 0; l < 4; l++) {
o = this._Kd[c][l];
this._Kd[c][l] = M[o >> 24 & 255] ^ S[o >> 16 & 255] ^ E[o >> 8 & 255] ^ k[255 & o];
}
};
x.prototype.encrypt = function(e) {
if (16 != e.length) throw new Error("invalid plaintext size (must be 16 bytes)");
for (var t = this._Ke.length - 1, r = [ 0, 0, 0, 0 ], i = A(e), n = 0; n < 4; n++) i[n] ^= this._Ke[0][n];
for (var o = 1; o < t; o++) {
for (n = 0; n < 4; n++) r[n] = p[i[n] >> 24 & 255] ^ b[i[(n + 1) % 4] >> 16 & 255] ^ m[i[(n + 2) % 4] >> 8 & 255] ^ g[255 & i[(n + 3) % 4]] ^ this._Ke[o][n];
i = r.slice();
}
var s, f = a(16);
for (n = 0; n < 4; n++) {
s = this._Ke[t][n];
f[4 * n] = 255 & (d[i[n] >> 24 & 255] ^ s >> 24);
f[4 * n + 1] = 255 & (d[i[(n + 1) % 4] >> 16 & 255] ^ s >> 16);
f[4 * n + 2] = 255 & (d[i[(n + 2) % 4] >> 8 & 255] ^ s >> 8);
f[4 * n + 3] = 255 & (d[255 & i[(n + 3) % 4]] ^ s);
}
return f;
};
x.prototype.decrypt = function(e) {
if (16 != e.length) throw new Error("invalid ciphertext size (must be 16 bytes)");
for (var t = this._Kd.length - 1, r = [ 0, 0, 0, 0 ], i = A(e), n = 0; n < 4; n++) i[n] ^= this._Kd[0][n];
for (var o = 1; o < t; o++) {
for (n = 0; n < 4; n++) r[n] = y[i[n] >> 24 & 255] ^ v[i[(n + 3) % 4] >> 16 & 255] ^ _[i[(n + 2) % 4] >> 8 & 255] ^ w[255 & i[(n + 1) % 4]] ^ this._Kd[o][n];
i = r.slice();
}
var s, f = a(16);
for (n = 0; n < 4; n++) {
s = this._Kd[t][n];
f[4 * n] = 255 & (l[i[n] >> 24 & 255] ^ s >> 24);
f[4 * n + 1] = 255 & (l[i[(n + 3) % 4] >> 16 & 255] ^ s >> 16);
f[4 * n + 2] = 255 & (l[i[(n + 2) % 4] >> 8 & 255] ^ s >> 8);
f[4 * n + 3] = 255 & (l[255 & i[(n + 1) % 4]] ^ s);
}
return f;
};
var R = function e(t) {
if (!(this instanceof e)) throw Error("AES must be instanitated with `new`");
this.description = "Electronic Code Block";
this.name = "ecb";
this._aes = new x(t);
};
R.prototype.encrypt = function(e) {
if ((e = n(e)).length % 16 != 0) throw new Error("invalid plaintext size (must be multiple of 16 bytes)");
for (var t = a(e.length), r = a(16), i = 0; i < e.length; i += 16) {
o(e, r, 0, i, i + 16);
o(r = this._aes.encrypt(r), t, i);
}
return t;
};
R.prototype.decrypt = function(e) {
if ((e = n(e)).length % 16 != 0) throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");
for (var t = a(e.length), r = a(16), i = 0; i < e.length; i += 16) {
o(e, r, 0, i, i + 16);
o(r = this._aes.decrypt(r), t, i);
}
return t;
};
var T = function e(t, r) {
if (!(this instanceof e)) throw Error("AES must be instanitated with `new`");
this.description = "Cipher Block Chaining";
this.name = "cbc";
if (r) {
if (16 != r.length) throw new Error("invalid initialation vector size (must be 16 bytes)");
} else r = a(16);
this._lastCipherblock = n(r, !0);
this._aes = new x(t);
};
T.prototype.encrypt = function(e) {
if ((e = n(e)).length % 16 != 0) throw new Error("invalid plaintext size (must be multiple of 16 bytes)");
for (var t = a(e.length), r = a(16), i = 0; i < e.length; i += 16) {
o(e, r, 0, i, i + 16);
for (var s = 0; s < 16; s++) r[s] ^= this._lastCipherblock[s];
this._lastCipherblock = this._aes.encrypt(r);
o(this._lastCipherblock, t, i);
}
return t;
};
T.prototype.decrypt = function(e) {
if ((e = n(e)).length % 16 != 0) throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");
for (var t = a(e.length), r = a(16), i = 0; i < e.length; i += 16) {
o(e, r, 0, i, i + 16);
r = this._aes.decrypt(r);
for (var s = 0; s < 16; s++) t[i + s] = r[s] ^ this._lastCipherblock[s];
o(e, this._lastCipherblock, 0, i, i + 16);
}
return t;
};
var B = function e(t, r, i) {
if (!(this instanceof e)) throw Error("AES must be instanitated with `new`");
this.description = "Cipher Feedback";
this.name = "cfb";
if (r) {
if (16 != r.length) throw new Error("invalid initialation vector size (must be 16 size)");
} else r = a(16);
i || (i = 1);
this.segmentSize = i;
this._shiftRegister = n(r, !0);
this._aes = new x(t);
};
B.prototype.encrypt = function(e) {
if (e.length % this.segmentSize != 0) throw new Error("invalid plaintext size (must be segmentSize bytes)");
for (var t, r = n(e, !0), i = 0; i < r.length; i += this.segmentSize) {
t = this._aes.encrypt(this._shiftRegister);
for (var a = 0; a < this.segmentSize; a++) r[i + a] ^= t[a];
o(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
o(r, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
}
return r;
};
B.prototype.decrypt = function(e) {
if (e.length % this.segmentSize != 0) throw new Error("invalid ciphertext size (must be segmentSize bytes)");
for (var t, r = n(e, !0), i = 0; i < r.length; i += this.segmentSize) {
t = this._aes.encrypt(this._shiftRegister);
for (var a = 0; a < this.segmentSize; a++) r[i + a] ^= t[a];
o(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
o(e, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
}
return r;
};
var j = function e(t, r) {
if (!(this instanceof e)) throw Error("AES must be instanitated with `new`");
this.description = "Output Feedback";
this.name = "ofb";
if (r) {
if (16 != r.length) throw new Error("invalid initialation vector size (must be 16 bytes)");
} else r = a(16);
this._lastPrecipher = n(r, !0);
this._lastPrecipherIndex = 16;
this._aes = new x(t);
};
j.prototype.encrypt = function(e) {
for (var t = n(e, !0), r = 0; r < t.length; r++) {
if (16 === this._lastPrecipherIndex) {
this._lastPrecipher = this._aes.encrypt(this._lastPrecipher);
this._lastPrecipherIndex = 0;
}
t[r] ^= this._lastPrecipher[this._lastPrecipherIndex++];
}
return t;
};
j.prototype.decrypt = j.prototype.encrypt;
var I = function e(t) {
if (!(this instanceof e)) throw Error("Counter must be instanitated with `new`");
0 === t || t || (t = 1);
if ("number" == typeof t) {
this._counter = a(16);
this.setValue(t);
} else this.setBytes(t);
};
I.prototype.setValue = function(e) {
if ("number" != typeof e || parseInt(e) != e) throw new Error("invalid counter value (must be an integer)");
if (e > Number.MAX_SAFE_INTEGER) throw new Error("integer value out of safe range");
for (var t = 15; t >= 0; --t) {
this._counter[t] = e % 256;
e = parseInt(e / 256);
}
};
I.prototype.setBytes = function(e) {
if (16 != (e = n(e, !0)).length) throw new Error("invalid counter bytes size (must be 16 bytes)");
this._counter = e;
};
I.prototype.increment = function() {
for (var e = 15; e >= 0; e--) {
if (255 !== this._counter[e]) {
this._counter[e]++;
break;
}
this._counter[e] = 0;
}
};
var P = function e(t, r) {
if (!(this instanceof e)) throw Error("AES must be instanitated with `new`");
this.description = "Counter";
this.name = "ctr";
r instanceof I || (r = new I(r));
this._counter = r;
this._remainingCounter = null;
this._remainingCounterIndex = 16;
this._aes = new x(t);
};
P.prototype.encrypt = function(e) {
for (var t = n(e, !0), r = 0; r < t.length; r++) {
if (16 === this._remainingCounterIndex) {
this._remainingCounter = this._aes.encrypt(this._counter._counter);
this._remainingCounterIndex = 0;
this._counter.increment();
}
t[r] ^= this._remainingCounter[this._remainingCounterIndex++];
}
return t;
};
P.prototype.decrypt = P.prototype.encrypt;
var C = {
AES: x,
Counter: I,
ModeOfOperation: {
ecb: R,
cbc: T,
cfb: B,
ofb: j,
ctr: P
},
utils: {
hex: c,
utf8: f
},
padding: {
pkcs7: {
pad: function(e) {
var t = 16 - (e = n(e, !0)).length % 16, r = a(e.length + t);
o(e, r);
for (var i = e.length; i < r.length; i++) r[i] = t;
return r;
},
strip: function(e) {
if ((e = n(e, !0)).length < 16) throw new Error("PKCS#7 invalid length");
var t = e[e.length - 1];
if (t > 16) throw new Error("PKCS#7 padding byte out of range");
for (var r = e.length - t, i = 0; i < t; i++) if (e[r + i] !== t) throw new Error("PKCS#7 invalid padding byte");
var s = a(r);
o(e, s, 0, 0, r);
return s;
}
}
},
_arrayTest: {
coerceArray: n,
createArray: a,
copyArray: o
}
};
if ("undefined" != typeof r) t.exports = C; else if ("function" == typeof define && define.amd) define(C); else {
(void 0).aesjs && (C._aesjs = (void 0).aesjs);
(void 0).aesjs = C;
}
})();
cc._RF.pop();
}, {} ],
base64: [ function(e, t, r) {
(function(i) {
"use strict";
cc._RF.push(t, "a7969BTKNRNGLnVxz9SlDgT", "base64");
(function(e, i) {
"object" == typeof r && "undefined" != typeof t ? t.exports = i(e) : "function" == typeof define && define.amd ? define(i) : i(e);
})("undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof i ? i : void 0, function(r) {
var i, n = r.Base64;
if ("undefined" != typeof t && t.exports) try {
i = e("buffer").Buffer;
} catch (e) {}
var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = function(e) {
for (var t = {}, r = 0, i = e.length; r < i; r++) t[e.charAt(r)] = r;
return t;
}(a), s = String.fromCharCode, f = function(e) {
if (e.length < 2) return (t = e.charCodeAt(0)) < 128 ? e : t < 2048 ? s(192 | t >>> 6) + s(128 | 63 & t) : s(224 | t >>> 12 & 15) + s(128 | t >>> 6 & 63) + s(128 | 63 & t);
var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
return s(240 | t >>> 18 & 7) + s(128 | t >>> 12 & 63) + s(128 | t >>> 6 & 63) + s(128 | 63 & t);
}, c = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, u = function(e) {
return e.replace(c, f);
}, h = function(e) {
var t = [ 0, 2, 1 ][e.length % 3], r = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0);
return [ a.charAt(r >>> 18), a.charAt(r >>> 12 & 63), t >= 2 ? "=" : a.charAt(r >>> 6 & 63), t >= 1 ? "=" : a.charAt(63 & r) ].join("");
}, d = r.btoa ? function(e) {
return r.btoa(e);
} : function(e) {
return e.replace(/[\s\S]{1,3}/g, h);
}, l = i ? i.from && Uint8Array && i.from !== Uint8Array.from ? function(e) {
return (e.constructor === i.constructor ? e : i.from(e)).toString("base64");
} : function(e) {
return (e.constructor === i.constructor ? e : new i(e)).toString("base64");
} : function(e) {
return d(u(e));
}, p = function(e, t) {
return t ? l(String(e)).replace(/[+\/]/g, function(e) {
return "+" == e ? "-" : "_";
}).replace(/=/g, "") : l(String(e));
}, b = new RegExp([ "[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}" ].join("|"), "g"), m = function(e) {
switch (e.length) {
case 4:
var t = ((7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3)) - 65536;
return s(55296 + (t >>> 10)) + s(56320 + (1023 & t));

case 3:
return s((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));

default:
return s((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1));
}
}, g = function(e) {
return e.replace(b, m);
}, y = function(e) {
var t = e.length, r = t % 4, i = (t > 0 ? o[e.charAt(0)] << 18 : 0) | (t > 1 ? o[e.charAt(1)] << 12 : 0) | (t > 2 ? o[e.charAt(2)] << 6 : 0) | (t > 3 ? o[e.charAt(3)] : 0), n = [ s(i >>> 16), s(i >>> 8 & 255), s(255 & i) ];
n.length -= [ 0, 0, 2, 1 ][r];
return n.join("");
}, v = r.atob ? function(e) {
return r.atob(e);
} : function(e) {
return e.replace(/[\s\S]{1,4}/g, y);
}, _ = i ? i.from && Uint8Array && i.from !== Uint8Array.from ? function(e) {
return (e.constructor === i.constructor ? e : i.from(e, "base64")).toString();
} : function(e) {
return (e.constructor === i.constructor ? e : new i(e, "base64")).toString();
} : function(e) {
return g(v(e));
}, w = function(e) {
return _(String(e).replace(/[-_]/g, function(e) {
return "-" == e ? "+" : "/";
}).replace(/[^A-Za-z0-9\+\/]/g, ""));
};
r.Base64 = {
VERSION: "2.4.6",
atob: v,
btoa: d,
fromBase64: w,
toBase64: p,
utob: u,
encode: p,
encodeURI: function(e) {
return p(e, !0);
},
btou: g,
decode: w,
noConflict: function() {
var e = r.Base64;
r.Base64 = n;
return e;
}
};
if ("function" == typeof Object.defineProperty) {
var M = function(e) {
return {
value: e,
enumerable: !1,
writable: !0,
configurable: !0
};
};
r.Base64.extendString = function() {
Object.defineProperty(String.prototype, "fromBase64", M(function() {
return w(this);
}));
Object.defineProperty(String.prototype, "toBase64", M(function(e) {
return p(this, e);
}));
Object.defineProperty(String.prototype, "toBase64URI", M(function() {
return p(this, !0);
}));
};
}
r.Meteor && (Base64 = r.Base64);
"undefined" != typeof t && t.exports ? t.exports.Base64 = r.Base64 : "function" == typeof define && define.amd && define([], function() {
return r.Base64;
});
return {
Base64: r.Base64
};
});
cc._RF.pop();
}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
buffer: 66
} ],
bignumber: [ function(e, t) {
"use strict";
cc._RF.push(t, "7f0523F5spBnpevOfNw6mDh", "bignumber");
(function(e) {
var r, i = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, n = Math.ceil, a = Math.floor, o = "[BigNumber Error] ", s = o + "Number primitive has more than 15 significant digits: ", f = 1e14, c = 14, u = 9007199254740991, h = [ 1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13 ], d = 1e7;
function l(e) {
var t = 0 | e;
return e > 0 || e === t ? t : t - 1;
}
function p(e) {
for (var t, r, i = 1, n = e.length, a = e[0] + ""; i < n; ) {
t = e[i++] + "";
r = c - t.length;
for (;r--; t = "0" + t) ;
a += t;
}
for (n = a.length; 48 === a.charCodeAt(--n); ) ;
return a.slice(0, n + 1 || 1);
}
function b(e, t) {
var r, i, n = e.c, a = t.c, o = e.s, s = t.s, f = e.e, c = t.e;
if (!o || !s) return null;
r = n && !n[0];
i = a && !a[0];
if (r || i) return r ? i ? 0 : -s : o;
if (o != s) return o;
r = o < 0;
i = f == c;
if (!n || !a) return i ? 0 : !n ^ r ? 1 : -1;
if (!i) return f > c ^ r ? 1 : -1;
s = (f = n.length) < (c = a.length) ? f : c;
for (o = 0; o < s; o++) if (n[o] != a[o]) return n[o] > a[o] ^ r ? 1 : -1;
return f == c ? 0 : f > c ^ r ? 1 : -1;
}
function m(e, t, r, i) {
if (e < t || e > r || e !== (e < 0 ? n(e) : a(e))) throw Error(o + (i || "Argument") + ("number" == typeof e ? e < t || e > r ? " out of range: " : " not an integer: " : " not a primitive number: ") + e);
}
function g(e) {
return "[object Array]" == Object.prototype.toString.call(e);
}
function y(e) {
var t = e.c.length - 1;
return l(e.e / c) == t && e.c[t] % 2 != 0;
}
function v(e, t) {
return (e.length > 1 ? e.charAt(0) + "." + e.slice(1) : e) + (t < 0 ? "e" : "e+") + t;
}
function _(e, t, r) {
var i, n;
if (t < 0) {
for (n = r + "."; ++t; n += r) ;
e = n + e;
} else if (++t > (i = e.length)) {
for (n = r, t -= i; --t; n += r) ;
e += n;
} else t < i && (e = e.slice(0, t) + "." + e.slice(t));
return e;
}
(r = function e(t) {
var r, w, M, S, E, k, A, x, R, T = F.prototype = {
constructor: F,
toString: null,
valueOf: null
}, B = new F(1), j = 20, I = 4, P = -7, C = 21, O = -1e7, L = 1e7, N = !1, D = 1, U = 0, q = {
decimalSeparator: ".",
groupSeparator: ",",
groupSize: 3,
secondaryGroupSize: 0,
fractionGroupSeparator: " ",
fractionGroupSize: 0
}, z = "0123456789abcdefghijklmnopqrstuvwxyz";
function F(e, t) {
var r, n, o, f, h, d, l, p = this;
if (!(p instanceof F)) return new F(e, t);
if (null == t) {
if (e instanceof F) {
p.s = e.s;
p.e = e.e;
p.c = (e = e.c) ? e.slice() : e;
return;
}
if ((h = "number" == typeof e) && 0 * e == 0) {
p.s = 1 / e < 0 ? (e = -e, -1) : 1;
if (e === ~~e) {
for (o = 0, f = e; f >= 10; f /= 10, o++) ;
p.e = o;
p.c = [ e ];
return;
}
l = e + "";
} else {
if (!i.test(l = e + "")) return M(p, l, h);
p.s = 45 == l.charCodeAt(0) ? (l = l.slice(1), -1) : 1;
}
} else {
m(t, 2, z.length, "Base");
l = e + "";
if (10 == t) return V(p = new F(e instanceof F ? e : l), j + p.e + 1, I);
if (h = "number" == typeof e) {
if (0 * e != 0) return M(p, l, h, t);
p.s = 1 / e < 0 ? (l = l.slice(1), -1) : 1;
if (F.DEBUG && l.replace(/^0\.0*|\./, "").length > 15) throw Error(s + e);
h = !1;
} else {
p.s = 45 === l.charCodeAt(0) ? (l = l.slice(1), -1) : 1;
t > 10 && t < 37 && (l = l.toLowerCase());
}
r = z.slice(0, t);
o = f = 0;
for (d = l.length; f < d; f++) if (r.indexOf(n = l.charAt(f)) < 0) {
if ("." == n && f > o) {
o = d;
continue;
}
return M(p, e + "", h, t);
}
l = w(l, t, 10, p.s);
}
(o = l.indexOf(".")) > -1 && (l = l.replace(".", ""));
if ((f = l.search(/e/i)) > 0) {
o < 0 && (o = f);
o += +l.slice(f + 1);
l = l.substring(0, f);
} else o < 0 && (o = l.length);
for (f = 0; 48 === l.charCodeAt(f); f++) ;
for (d = l.length; 48 === l.charCodeAt(--d); ) ;
if (l = l.slice(f, ++d)) {
d -= f;
if (h && F.DEBUG && d > 15 && (e > u || e !== a(e))) throw Error(s + p.s * e);
if ((o = o - f - 1) > L) p.c = p.e = null; else if (o < O) p.c = [ p.e = 0 ]; else {
p.e = o;
p.c = [];
f = (o + 1) % c;
o < 0 && (f += c);
if (f < d) {
f && p.c.push(+l.slice(0, f));
for (d -= c; f < d; ) p.c.push(+l.slice(f, f += c));
l = l.slice(f);
f = c - l.length;
} else f -= d;
for (;f--; l += "0") ;
p.c.push(+l);
}
} else p.c = [ p.e = 0 ];
}
F.clone = e;
F.ROUND_UP = 0;
F.ROUND_DOWN = 1;
F.ROUND_CEIL = 2;
F.ROUND_FLOOR = 3;
F.ROUND_HALF_UP = 4;
F.ROUND_HALF_DOWN = 5;
F.ROUND_HALF_EVEN = 6;
F.ROUND_HALF_CEIL = 7;
F.ROUND_HALF_FLOOR = 8;
F.EUCLID = 9;
F.config = F.set = function(e) {
var t, r;
if (null != e) {
if ("object" != typeof e) throw Error(o + "Object expected: " + e);
if (e.hasOwnProperty(t = "DECIMAL_PLACES")) {
m(r = e[t], 0, 1e9, t);
j = r;
}
if (e.hasOwnProperty(t = "ROUNDING_MODE")) {
m(r = e[t], 0, 8, t);
I = r;
}
if (e.hasOwnProperty(t = "EXPONENTIAL_AT")) if (g(r = e[t])) {
m(r[0], -1e9, 0, t);
m(r[1], 0, 1e9, t);
P = r[0];
C = r[1];
} else {
m(r, -1e9, 1e9, t);
P = -(C = r < 0 ? -r : r);
}
if (e.hasOwnProperty(t = "RANGE")) if (g(r = e[t])) {
m(r[0], -1e9, -1, t);
m(r[1], 1, 1e9, t);
O = r[0];
L = r[1];
} else {
m(r, -1e9, 1e9, t);
if (!r) throw Error(o + t + " cannot be zero: " + r);
O = -(L = r < 0 ? -r : r);
}
if (e.hasOwnProperty(t = "CRYPTO")) {
if ((r = e[t]) !== !!r) throw Error(o + t + " not true or false: " + r);
if (r) {
if ("undefined" == typeof crypto || !crypto || !crypto.getRandomValues && !crypto.randomBytes) {
N = !r;
throw Error(o + "crypto unavailable");
}
N = r;
} else N = r;
}
if (e.hasOwnProperty(t = "MODULO_MODE")) {
m(r = e[t], 0, 9, t);
D = r;
}
if (e.hasOwnProperty(t = "POW_PRECISION")) {
m(r = e[t], 0, 1e9, t);
U = r;
}
if (e.hasOwnProperty(t = "FORMAT")) {
if ("object" != typeof (r = e[t])) throw Error(o + t + " not an object: " + r);
q = r;
}
if (e.hasOwnProperty(t = "ALPHABET")) {
if ("string" != typeof (r = e[t]) || /^.$|\.|(.).*\1/.test(r)) throw Error(o + t + " invalid: " + r);
z = r;
}
}
return {
DECIMAL_PLACES: j,
ROUNDING_MODE: I,
EXPONENTIAL_AT: [ P, C ],
RANGE: [ O, L ],
CRYPTO: N,
MODULO_MODE: D,
POW_PRECISION: U,
FORMAT: q,
ALPHABET: z
};
};
F.isBigNumber = function(e) {
return e instanceof F || e && !0 === e._isBigNumber || !1;
};
F.maximum = F.max = function() {
return H(arguments, T.lt);
};
F.minimum = F.min = function() {
return H(arguments, T.gt);
};
F.random = (S = 9007199254740992 * Math.random() & 2097151 ? function() {
return a(9007199254740992 * Math.random());
} : function() {
return 8388608 * (1073741824 * Math.random() | 0) + (8388608 * Math.random() | 0);
}, function(e) {
var t, r, i, s, f, u = 0, d = [], l = new F(B);
null == e ? e = j : m(e, 0, 1e9);
s = n(e / c);
if (N) if (crypto.getRandomValues) {
t = crypto.getRandomValues(new Uint32Array(s *= 2));
for (;u < s; ) if ((f = 131072 * t[u] + (t[u + 1] >>> 11)) >= 9e15) {
r = crypto.getRandomValues(new Uint32Array(2));
t[u] = r[0];
t[u + 1] = r[1];
} else {
d.push(f % 1e14);
u += 2;
}
u = s / 2;
} else {
if (!crypto.randomBytes) {
N = !1;
throw Error(o + "crypto unavailable");
}
t = crypto.randomBytes(s *= 7);
for (;u < s; ) if ((f = 281474976710656 * (31 & t[u]) + 1099511627776 * t[u + 1] + 4294967296 * t[u + 2] + 16777216 * t[u + 3] + (t[u + 4] << 16) + (t[u + 5] << 8) + t[u + 6]) >= 9e15) crypto.randomBytes(7).copy(t, u); else {
d.push(f % 1e14);
u += 7;
}
u = s / 7;
}
if (!N) for (;u < s; ) (f = S()) < 9e15 && (d[u++] = f % 1e14);
s = d[--u];
e %= c;
if (s && e) {
f = h[c - e];
d[u] = a(s / f) * f;
}
for (;0 === d[u]; d.pop(), u--) ;
if (u < 0) d = [ i = 0 ]; else {
for (i = -1; 0 === d[0]; d.splice(0, 1), i -= c) ;
for (u = 1, f = d[0]; f >= 10; f /= 10, u++) ;
u < c && (i -= c - u);
}
l.e = i;
l.c = d;
return l;
});
w = function() {
function e(e, t, r, i) {
for (var n, a, o = [ 0 ], s = 0, f = e.length; s < f; ) {
for (a = o.length; a--; o[a] *= t) ;
o[0] += i.indexOf(e.charAt(s++));
for (n = 0; n < o.length; n++) if (o[n] > r - 1) {
null == o[n + 1] && (o[n + 1] = 0);
o[n + 1] += o[n] / r | 0;
o[n] %= r;
}
}
return o.reverse();
}
return function(t, i, n, a, o) {
var s, f, c, u, h, d, l, b, m = t.indexOf("."), g = j, y = I;
if (m >= 0) {
u = U;
U = 0;
t = t.replace(".", "");
d = (b = new F(i)).pow(t.length - m);
U = u;
b.c = e(_(p(d.c), d.e, "0"), 10, n, "0123456789");
b.e = b.c.length;
}
c = u = (l = e(t, i, n, o ? (s = z, "0123456789") : (s = "0123456789", z))).length;
for (;0 == l[--u]; l.pop()) ;
if (!l[0]) return s.charAt(0);
if (m < 0) --c; else {
d.c = l;
d.e = c;
d.s = a;
l = (d = r(d, b, g, y, n)).c;
h = d.r;
c = d.e;
}
m = l[f = c + g + 1];
u = n / 2;
h = h || f < 0 || null != l[f + 1];
h = y < 4 ? (null != m || h) && (0 == y || y == (d.s < 0 ? 3 : 2)) : m > u || m == u && (4 == y || h || 6 == y && 1 & l[f - 1] || y == (d.s < 0 ? 8 : 7));
if (f < 1 || !l[0]) t = h ? _(s.charAt(1), -g, s.charAt(0)) : s.charAt(0); else {
l.length = f;
if (h) for (--n; ++l[--f] > n; ) {
l[f] = 0;
if (!f) {
++c;
l = [ 1 ].concat(l);
}
}
for (u = l.length; !l[--u]; ) ;
for (m = 0, t = ""; m <= u; t += s.charAt(l[m++])) ;
t = _(t, c, s.charAt(0));
}
return t;
};
}();
r = function() {
function e(e, t, r) {
var i, n, a, o, s = 0, f = e.length, c = t % d, u = t / d | 0;
for (e = e.slice(); f--; ) {
s = ((n = c * (a = e[f] % d) + (i = u * a + (o = e[f] / d | 0) * c) % d * d + s) / r | 0) + (i / d | 0) + u * o;
e[f] = n % r;
}
s && (e = [ s ].concat(e));
return e;
}
function t(e, t, r, i) {
var n, a;
if (r != i) a = r > i ? 1 : -1; else for (n = a = 0; n < r; n++) if (e[n] != t[n]) {
a = e[n] > t[n] ? 1 : -1;
break;
}
return a;
}
function r(e, t, r, i) {
for (var n = 0; r--; ) {
e[r] -= n;
n = e[r] < t[r] ? 1 : 0;
e[r] = n * i + e[r] - t[r];
}
for (;!e[0] && e.length > 1; e.splice(0, 1)) ;
}
return function(i, n, o, s, u) {
var h, d, p, b, m, g, y, v, _, w, M, S, E, k, A, x, R, T = i.s == n.s ? 1 : -1, B = i.c, j = n.c;
if (!(B && B[0] && j && j[0])) return new F(i.s && n.s && (B ? !j || B[0] != j[0] : j) ? B && 0 == B[0] || !j ? 0 * T : T / 0 : NaN);
_ = (v = new F(T)).c = [];
T = o + (d = i.e - n.e) + 1;
if (!u) {
u = f;
d = l(i.e / c) - l(n.e / c);
T = T / c | 0;
}
for (p = 0; j[p] == (B[p] || 0); p++) ;
j[p] > (B[p] || 0) && d--;
if (T < 0) {
_.push(1);
b = !0;
} else {
k = B.length;
x = j.length;
p = 0;
T += 2;
if ((m = a(u / (j[0] + 1))) > 1) {
j = e(j, m, u);
B = e(B, m, u);
x = j.length;
k = B.length;
}
E = x;
M = (w = B.slice(0, x)).length;
for (;M < x; w[M++] = 0) ;
R = j.slice();
R = [ 0 ].concat(R);
A = j[0];
j[1] >= u / 2 && A++;
do {
m = 0;
if ((h = t(j, w, x, M)) < 0) {
S = w[0];
x != M && (S = S * u + (w[1] || 0));
if ((m = a(S / A)) > 1) {
m >= u && (m = u - 1);
y = (g = e(j, m, u)).length;
M = w.length;
for (;1 == t(g, w, y, M); ) {
m--;
r(g, x < y ? R : j, y, u);
y = g.length;
h = 1;
}
} else {
0 == m && (h = m = 1);
y = (g = j.slice()).length;
}
y < M && (g = [ 0 ].concat(g));
r(w, g, M, u);
M = w.length;
if (-1 == h) for (;t(j, w, x, M) < 1; ) {
m++;
r(w, x < M ? R : j, M, u);
M = w.length;
}
} else if (0 === h) {
m++;
w = [ 0 ];
}
_[p++] = m;
if (w[0]) w[M++] = B[E] || 0; else {
w = [ B[E] ];
M = 1;
}
} while ((E++ < k || null != w[0]) && T--);
b = null != w[0];
_[0] || _.splice(0, 1);
}
if (u == f) {
for (p = 1, T = _[0]; T >= 10; T /= 10, p++) ;
V(v, o + (v.e = p + d * c - 1) + 1, s, b);
} else {
v.e = d;
v.r = +b;
}
return v;
};
}();
function K(e, t, r, i) {
var n, a, o, s, f;
null == r ? r = I : m(r, 0, 8);
if (!e.c) return e.toString();
n = e.c[0];
o = e.e;
if (null == t) {
f = p(e.c);
f = 1 == i || 2 == i && o <= P ? v(f, o) : _(f, o, "0");
} else {
a = (e = V(new F(e), t, r)).e;
s = (f = p(e.c)).length;
if (1 == i || 2 == i && (t <= a || a <= P)) {
for (;s < t; f += "0", s++) ;
f = v(f, a);
} else {
t -= o;
f = _(f, a, "0");
if (a + 1 > s) {
if (--t > 0) for (f += "."; t--; f += "0") ;
} else if ((t += a - s) > 0) {
a + 1 == s && (f += ".");
for (;t--; f += "0") ;
}
}
}
return e.s < 0 && n ? "-" + f : f;
}
function H(e, t) {
var r, i, n = 0;
g(e[0]) && (e = e[0]);
r = new F(e[0]);
for (;++n < e.length; ) {
if (!(i = new F(e[n])).s) {
r = i;
break;
}
t.call(r, i) && (r = i);
}
return r;
}
function W(e, t, r) {
for (var i = 1, n = t.length; !t[--n]; t.pop()) ;
for (n = t[0]; n >= 10; n /= 10, i++) ;
if ((r = i + r * c - 1) > L) e.c = e.e = null; else if (r < O) e.c = [ e.e = 0 ]; else {
e.e = r;
e.c = t;
}
return e;
}
M = (E = /^(-?)0([xbo])(?=\w[\w.]*$)/i, k = /^([^.]+)\.$/, A = /^\.([^.]+)$/, x = /^-?(Infinity|NaN)$/, 
R = /^\s*\+(?=[\w.])|^\s+|\s+$/g, function(e, t, r, i) {
var n, a = r ? t : t.replace(R, "");
if (x.test(a)) {
e.s = isNaN(a) ? null : a < 0 ? -1 : 1;
e.c = e.e = null;
} else {
if (!r) {
a = a.replace(E, function(e, t, r) {
n = "x" == (r = r.toLowerCase()) ? 16 : "b" == r ? 2 : 8;
return i && i != n ? e : t;
});
if (i) {
n = i;
a = a.replace(k, "$1").replace(A, "0.$1");
}
if (t != a) return new F(a, n);
}
if (F.DEBUG) throw Error(o + "Not a" + (i ? " base " + i : "") + " number: " + t);
e.c = e.e = e.s = null;
}
});
function V(e, t, r, i) {
var o, s, u, d, l, p, b, m = e.c, g = h;
if (m) {
e: {
for (o = 1, d = m[0]; d >= 10; d /= 10, o++) ;
if ((s = t - o) < 0) {
s += c;
u = t;
b = (l = m[p = 0]) / g[o - u - 1] % 10 | 0;
} else if ((p = n((s + 1) / c)) >= m.length) {
if (!i) break e;
for (;m.length <= p; m.push(0)) ;
l = b = 0;
o = 1;
u = (s %= c) - c + 1;
} else {
l = d = m[p];
for (o = 1; d >= 10; d /= 10, o++) ;
b = (u = (s %= c) - c + o) < 0 ? 0 : l / g[o - u - 1] % 10 | 0;
}
i = i || t < 0 || null != m[p + 1] || (u < 0 ? l : l % g[o - u - 1]);
i = r < 4 ? (b || i) && (0 == r || r == (e.s < 0 ? 3 : 2)) : b > 5 || 5 == b && (4 == r || i || 6 == r && (s > 0 ? u > 0 ? l / g[o - u] : 0 : m[p - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7));
if (t < 1 || !m[0]) {
m.length = 0;
if (i) {
t -= e.e + 1;
m[0] = g[(c - t % c) % c];
e.e = -t || 0;
} else m[0] = e.e = 0;
return e;
}
if (0 == s) {
m.length = p;
d = 1;
p--;
} else {
m.length = p + 1;
d = g[c - s];
m[p] = u > 0 ? a(l / g[o - u] % g[u]) * d : 0;
}
if (i) for (;;) {
if (0 == p) {
for (s = 1, u = m[0]; u >= 10; u /= 10, s++) ;
u = m[0] += d;
for (d = 1; u >= 10; u /= 10, d++) ;
if (s != d) {
e.e++;
m[0] == f && (m[0] = 1);
}
break;
}
m[p] += d;
if (m[p] != f) break;
m[p--] = 0;
d = 1;
}
for (s = m.length; 0 === m[--s]; m.pop()) ;
}
e.e > L ? e.c = e.e = null : e.e < O && (e.c = [ e.e = 0 ]);
}
return e;
}
T.absoluteValue = T.abs = function() {
var e = new F(this);
e.s < 0 && (e.s = 1);
return e;
};
T.comparedTo = function(e, t) {
return b(this, new F(e, t));
};
T.decimalPlaces = T.dp = function(e, t) {
var r, i, n, a = this;
if (null != e) {
m(e, 0, 1e9);
null == t ? t = I : m(t, 0, 8);
return V(new F(a), e + a.e + 1, t);
}
if (!(r = a.c)) return null;
i = ((n = r.length - 1) - l(this.e / c)) * c;
if (n = r[n]) for (;n % 10 == 0; n /= 10, i--) ;
i < 0 && (i = 0);
return i;
};
T.dividedBy = T.div = function(e, t) {
return r(this, new F(e, t), j, I);
};
T.dividedToIntegerBy = T.idiv = function(e, t) {
return r(this, new F(e, t), 0, 1);
};
T.exponentiatedBy = T.pow = function(e, t) {
var r, i, s, f, u, h, d, l = this;
if ((e = new F(e)).c && !e.isInteger()) throw Error(o + "Exponent not an integer: " + e);
null != t && (t = new F(t));
f = e.e > 14;
if (!l.c || !l.c[0] || 1 == l.c[0] && !l.e && 1 == l.c.length || !e.c || !e.c[0]) {
d = new F(Math.pow(+l.valueOf(), f ? 2 - y(e) : +e));
return t ? d.mod(t) : d;
}
u = e.s < 0;
if (t) {
if (t.c ? !t.c[0] : !t.s) return new F(NaN);
(i = !u && l.isInteger() && t.isInteger()) && (l = l.mod(t));
} else {
if (e.e > 9 && (l.e > 0 || l.e < -1 || (0 == l.e ? l.c[0] > 1 || f && l.c[1] >= 24e7 : l.c[0] < 8e13 || f && l.c[0] <= 9999975e7))) {
s = l.s < 0 && y(e) ? -0 : 0;
l.e > -1 && (s = 1 / s);
return new F(u ? 1 / s : s);
}
U && (s = n(U / c + 2));
}
if (f) {
r = new F(.5);
h = y(e);
} else h = e % 2;
u && (e.s = 1);
d = new F(B);
for (;;) {
if (h) {
if (!(d = d.times(l)).c) break;
s ? d.c.length > s && (d.c.length = s) : i && (d = d.mod(t));
}
if (f) {
V(e = e.times(r), e.e + 1, 1);
if (!e.c[0]) break;
f = e.e > 14;
h = y(e);
} else {
if (!(e = a(e / 2))) break;
h = e % 2;
}
l = l.times(l);
s ? l.c && l.c.length > s && (l.c.length = s) : i && (l = l.mod(t));
}
if (i) return d;
u && (d = B.div(d));
return t ? d.mod(t) : s ? V(d, U, I, void 0) : d;
};
T.integerValue = function(e) {
var t = new F(this);
null == e ? e = I : m(e, 0, 8);
return V(t, t.e + 1, e);
};
T.isEqualTo = T.eq = function(e, t) {
return 0 === b(this, new F(e, t));
};
T.isFinite = function() {
return !!this.c;
};
T.isGreaterThan = T.gt = function(e, t) {
return b(this, new F(e, t)) > 0;
};
T.isGreaterThanOrEqualTo = T.gte = function(e, t) {
return 1 === (t = b(this, new F(e, t))) || 0 === t;
};
T.isInteger = function() {
return !!this.c && l(this.e / c) > this.c.length - 2;
};
T.isLessThan = T.lt = function(e, t) {
return b(this, new F(e, t)) < 0;
};
T.isLessThanOrEqualTo = T.lte = function(e, t) {
return -1 === (t = b(this, new F(e, t))) || 0 === t;
};
T.isNaN = function() {
return !this.s;
};
T.isNegative = function() {
return this.s < 0;
};
T.isPositive = function() {
return this.s > 0;
};
T.isZero = function() {
return !!this.c && 0 == this.c[0];
};
T.minus = function(e, t) {
var r, i, n, a, o = this, s = o.s;
t = (e = new F(e, t)).s;
if (!s || !t) return new F(NaN);
if (s != t) {
e.s = -t;
return o.plus(e);
}
var u = o.e / c, h = e.e / c, d = o.c, p = e.c;
if (!u || !h) {
if (!d || !p) return d ? (e.s = -t, e) : new F(p ? o : NaN);
if (!d[0] || !p[0]) return p[0] ? (e.s = -t, e) : new F(d[0] ? o : 3 == I ? -0 : 0);
}
u = l(u);
h = l(h);
d = d.slice();
if (s = u - h) {
if (a = s < 0) {
s = -s;
n = d;
} else {
h = u;
n = p;
}
n.reverse();
for (t = s; t--; n.push(0)) ;
n.reverse();
} else {
i = (a = (s = d.length) < (t = p.length)) ? s : t;
for (s = t = 0; t < i; t++) if (d[t] != p[t]) {
a = d[t] < p[t];
break;
}
}
a && (n = d, d = p, p = n, e.s = -e.s);
if ((t = (i = p.length) - (r = d.length)) > 0) for (;t--; d[r++] = 0) ;
t = f - 1;
for (;i > s; ) {
if (d[--i] < p[i]) {
for (r = i; r && !d[--r]; d[r] = t) ;
--d[r];
d[i] += f;
}
d[i] -= p[i];
}
for (;0 == d[0]; d.splice(0, 1), --h) ;
if (!d[0]) {
e.s = 3 == I ? -1 : 1;
e.c = [ e.e = 0 ];
return e;
}
return W(e, d, h);
};
T.modulo = T.mod = function(e, t) {
var i, n, a = this;
e = new F(e, t);
if (!a.c || !e.s || e.c && !e.c[0]) return new F(NaN);
if (!e.c || a.c && !a.c[0]) return new F(a);
if (9 == D) {
n = e.s;
e.s = 1;
i = r(a, e, 0, 3);
e.s = n;
i.s *= n;
} else i = r(a, e, 0, D);
(e = a.minus(i.times(e))).c[0] || 1 != D || (e.s = a.s);
return e;
};
T.multipliedBy = T.times = function(e, t) {
var r, i, n, a, o, s, u, h, p, b, m, g, y, v, _, w = this, M = w.c, S = (e = new F(e, t)).c;
if (!(M && S && M[0] && S[0])) {
if (!w.s || !e.s || M && !M[0] && !S || S && !S[0] && !M) e.c = e.e = e.s = null; else {
e.s *= w.s;
if (M && S) {
e.c = [ 0 ];
e.e = 0;
} else e.c = e.e = null;
}
return e;
}
i = l(w.e / c) + l(e.e / c);
e.s *= w.s;
(u = M.length) < (b = S.length) && (y = M, M = S, S = y, n = u, u = b, b = n);
for (n = u + b, y = []; n--; y.push(0)) ;
v = f;
_ = d;
for (n = b; --n >= 0; ) {
r = 0;
m = S[n] % _;
g = S[n] / _ | 0;
for (a = n + (o = u); a > n; ) {
r = ((h = m * (h = M[--o] % _) + (s = g * h + (p = M[o] / _ | 0) * m) % _ * _ + y[a] + r) / v | 0) + (s / _ | 0) + g * p;
y[a--] = h % v;
}
y[a] = r;
}
r ? ++i : y.splice(0, 1);
return W(e, y, i);
};
T.negated = function() {
var e = new F(this);
e.s = -e.s || null;
return e;
};
T.plus = function(e, t) {
var r, i = this, n = i.s;
t = (e = new F(e, t)).s;
if (!n || !t) return new F(NaN);
if (n != t) {
e.s = -t;
return i.minus(e);
}
var a = i.e / c, o = e.e / c, s = i.c, u = e.c;
if (!a || !o) {
if (!s || !u) return new F(n / 0);
if (!s[0] || !u[0]) return u[0] ? e : new F(s[0] ? i : 0 * n);
}
a = l(a);
o = l(o);
s = s.slice();
if (n = a - o) {
if (n > 0) {
o = a;
r = u;
} else {
n = -n;
r = s;
}
r.reverse();
for (;n--; r.push(0)) ;
r.reverse();
}
(n = s.length) - (t = u.length) < 0 && (r = u, u = s, s = r, t = n);
for (n = 0; t; ) {
n = (s[--t] = s[t] + u[t] + n) / f | 0;
s[t] = f === s[t] ? 0 : s[t] % f;
}
if (n) {
s = [ n ].concat(s);
++o;
}
return W(e, s, o);
};
T.precision = T.sd = function(e, t) {
var r, i, n, a = this;
if (null != e && e !== !!e) {
m(e, 1, 1e9);
null == t ? t = I : m(t, 0, 8);
return V(new F(a), e, t);
}
if (!(r = a.c)) return null;
i = (n = r.length - 1) * c + 1;
if (n = r[n]) {
for (;n % 10 == 0; n /= 10, i--) ;
for (n = r[0]; n >= 10; n /= 10, i++) ;
}
e && a.e + 1 > i && (i = a.e + 1);
return i;
};
T.shiftedBy = function(e) {
m(e, -u, u);
return this.times("1e" + e);
};
T.squareRoot = T.sqrt = function() {
var e, t, i, n, a, o = this, s = o.c, f = o.s, c = o.e, u = j + 4, h = new F("0.5");
if (1 !== f || !s || !s[0]) return new F(!f || f < 0 && (!s || s[0]) ? NaN : s ? o : 1 / 0);
if (0 == (f = Math.sqrt(+o)) || f == 1 / 0) {
((t = p(s)).length + c) % 2 == 0 && (t += "0");
f = Math.sqrt(t);
c = l((c + 1) / 2) - (c < 0 || c % 2);
i = new F(t = f == 1 / 0 ? "1e" + c : (t = f.toExponential()).slice(0, t.indexOf("e") + 1) + c);
} else i = new F(f + "");
if (i.c[0]) {
(f = (c = i.e) + u) < 3 && (f = 0);
for (;;) {
a = i;
i = h.times(a.plus(r(o, a, u, 1)));
if (p(a.c).slice(0, f) === (t = p(i.c)).slice(0, f)) {
i.e < c && --f;
if ("9999" != (t = t.slice(f - 3, f + 1)) && (n || "4999" != t)) {
if (!+t || !+t.slice(1) && "5" == t.charAt(0)) {
V(i, i.e + j + 2, 1);
e = !i.times(i).eq(o);
}
break;
}
if (!n) {
V(a, a.e + j + 2, 0);
if (a.times(a).eq(o)) {
i = a;
break;
}
}
u += 4;
f += 4;
n = 1;
}
}
}
return V(i, i.e + j + 1, I, e);
};
T.toExponential = function(e, t) {
if (null != e) {
m(e, 0, 1e9);
e++;
}
return K(this, e, t, 1);
};
T.toFixed = function(e, t) {
if (null != e) {
m(e, 0, 1e9);
e = e + this.e + 1;
}
return K(this, e, t);
};
T.toFormat = function(e, t) {
var r = this.toFixed(e, t);
if (this.c) {
var i, n = r.split("."), a = +q.groupSize, o = +q.secondaryGroupSize, s = q.groupSeparator, f = n[0], c = n[1], u = this.s < 0, h = u ? f.slice(1) : f, d = h.length;
o && (i = a, a = o, o = i, d -= i);
if (a > 0 && d > 0) {
i = d % a || a;
f = h.substr(0, i);
for (;i < d; i += a) f += s + h.substr(i, a);
o > 0 && (f += s + h.slice(i));
u && (f = "-" + f);
}
r = c ? f + q.decimalSeparator + ((o = +q.fractionGroupSize) ? c.replace(new RegExp("\\d{" + o + "}\\B", "g"), "$&" + q.fractionGroupSeparator) : c) : f;
}
return r;
};
T.toFraction = function(e) {
var t, i, n, a, s, f, u, d, l, b, m, g, y = this, v = y.c;
if (null != e && (!(d = new F(e)).isInteger() && (d.c || 1 !== d.s) || d.lt(B))) throw Error(o + "Argument " + (d.isInteger() ? "out of range: " : "not an integer: ") + e);
if (!v) return y.toString();
i = new F(B);
b = n = new F(B);
a = l = new F(B);
g = p(v);
f = i.e = g.length - y.e - 1;
i.c[0] = h[(u = f % c) < 0 ? c + u : u];
e = !e || d.comparedTo(i) > 0 ? f > 0 ? i : b : d;
u = L;
L = 1 / 0;
d = new F(g);
l.c[0] = 0;
for (;;) {
m = r(d, i, 0, 1);
if (1 == (s = n.plus(m.times(a))).comparedTo(e)) break;
n = a;
a = s;
b = l.plus(m.times(s = b));
l = s;
i = d.minus(m.times(s = i));
d = s;
}
s = r(e.minus(n), a, 0, 1);
l = l.plus(s.times(b));
n = n.plus(s.times(a));
l.s = b.s = y.s;
t = r(b, a, f *= 2, I).minus(y).abs().comparedTo(r(l, n, f, I).minus(y).abs()) < 1 ? [ b.toString(), a.toString() ] : [ l.toString(), n.toString() ];
L = u;
return t;
};
T.toNumber = function() {
return +this;
};
T.toPrecision = function(e, t) {
null != e && m(e, 1, 1e9);
return K(this, e, t, 2);
};
T.toString = function(e) {
var t, r = this, i = r.s, n = r.e;
if (null === n) if (i) {
t = "Infinity";
i < 0 && (t = "-" + t);
} else t = "NaN"; else {
t = p(r.c);
if (null == e) t = n <= P || n >= C ? v(t, n) : _(t, n, "0"); else {
m(e, 2, z.length, "Base");
t = w(_(t, n, "0"), 10, e, i, !0);
}
i < 0 && r.c[0] && (t = "-" + t);
}
return t;
};
T.valueOf = T.toJSON = function() {
var e, t = this, r = t.e;
if (null === r) return t.toString();
e = p(t.c);
e = r <= P || r >= C ? v(e, r) : _(e, r, "0");
return t.s < 0 ? "-" + e : e;
};
T._isBigNumber = !0;
null != t && F.set(t);
return F;
}()).default = r.BigNumber = r;
if ("function" == typeof define && define.amd) define(function() {
return r;
}); else if ("undefined" != typeof t && t.exports) t.exports = r; else {
e || (e = "undefined" != typeof self && self ? self : window);
e.BigNumber = r;
}
})(void 0);
cc._RF.pop();
}, {} ],
blink: [ function(e, t, r) {
"use strict";
cc._RF.push(t, "1a38bsBuM1Nv56d326WeWhT", "blink");
var i, n = this && this.__extends || (i = function(e, t) {
return (i = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
})(e, t);
}, function(e, t) {
i(e, t);
function r() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r());
}), a = this && this.__decorate || function(e, t, r, i) {
var n, a = arguments.length, o = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, r, i); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (o = (a < 3 ? n(o) : a > 3 ? n(t, r, o) : n(t, r)) || o);
return a > 3 && o && Object.defineProperty(t, r, o), o;
};
Object.defineProperty(r, "__esModule", {
value: !0
});
var o = cc._decorator, s = o.ccclass, f = (o.property, function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {};
t.prototype.start = function() {
this.node.runAction(cc.repeatForever(cc.sequence(cc.fadeTo(.5, 100), cc.fadeTo(.5, 255))));
};
return a([ s ], t);
}(cc.Component));
r.default = f;
cc._RF.pop();
}, {} ],
bytesToUuid: [ function(e, t) {
"use strict";
cc._RF.push(t, "e30534WKX1LfYysT06ErImV", "bytesToUuid");
for (var r = [], i = 0; i < 256; ++i) r[i] = (i + 256).toString(16).substr(1);
t.exports = function(e, t) {
var i = t || 0, n = r;
return n[e[i++]] + n[e[i++]] + n[e[i++]] + n[e[i++]] + "-" + n[e[i++]] + n[e[i++]] + "-" + n[e[i++]] + n[e[i++]] + "-" + n[e[i++]] + n[e[i++]] + "-" + n[e[i++]] + n[e[i++]] + n[e[i++]] + n[e[i++]] + n[e[i++]] + n[e[i++]];
};
cc._RF.pop();
}, {} ],
canvasSize: [ function(e, t, r) {
"use strict";
cc._RF.push(t, "53b171sKJtGxJsEKO+4neuR", "canvasSize");
Object.defineProperty(r, "__esModule", {
value: !0
});
r.canvasSize = void 0;
function i() {
var e = cc.view.getDesignResolutionSize(), t = cc.view.getFrameSize();
console.log("硬件比", t.width / t.height);
t.width / t.height >= .6 ? cc.view.setDesignResolutionSize(e.width, e.height, cc.ResolutionPolicy.FIXED_HEIGHT) : cc.view.setDesignResolutionSize(e.width, e.height, cc.ResolutionPolicy.FIXED_WIDTH);
}
r.canvasSize = i;
r.default = {
canvasSize: i
};
cc._RF.pop();
}, {} ],
eventPost: [ function(e, t, r) {
"use strict";
cc._RF.push(t, "8ccafk9wKRIErSm2EBG5ATd", "eventPost");
Object.defineProperty(r, "__esModule", {
value: !0
});
r.Env_apkevent = r.Env_apkevent_param = r.Env = r.Env_data = void 0;
function i(e, t) {
var r = new cc.Event.EventCustom(e, !0);
r.setUserData(t);
cc.systemEvent.dispatchEvent(r);
}
r.Env_data = i;
function n(e) {
var t = new cc.Event.EventCustom(e, !0);
cc.systemEvent.dispatchEvent(t);
}
r.Env = n;
r.default = {
Env_data: i,
Env: n,
Env_apkevent_param: a
};
function a() {}
r.Env_apkevent_param = a;
r.Env_apkevent = function() {};
cc._RF.pop();
}, {} ],
load_Json_Pic: [ function(e, t, r) {
"use strict";
cc._RF.push(t, "aec9eumlohJSYQkTm271yim", "load_Json_Pic");
Object.defineProperty(r, "__esModule", {
value: !0
});
r.loadJsonAll = r.loadPic = r.loadJson = void 0;
var i = e("../userStore/userStore");
function n(e) {
return new Promise(function(t) {
null !== e && e && t(e);
});
}
r.loadJson = n;
function a(e) {
var t = e;
return new Promise(function(e) {
var r = t.split("/");
if ("public" == r[0].split("_")[0]) switch (r[0]) {
case "public_first":
case "public_second":
i.default.n_chapter_public.load(t, cc.SpriteFrame, function(t, r) {
r && e(r);
});
} else switch (r[0].split("_")[1] - 1) {
case 0:
i.default.n_chapter_0.load(t, cc.SpriteFrame, function(t, r) {
r && e(r);
});
break;

case 1:
i.default.n_chapter_1.load(t, cc.SpriteFrame, function(t, r) {
r && e(r);
});
break;

case 2:
i.default.n_chapter_2.load(t, cc.SpriteFrame, function(t, r) {
r && e(r);
});
break;

case 3:
i.default.n_chapter_3.load(t, cc.SpriteFrame, function(t, r) {
r && e(r);
});
break;

case 4:
i.default.n_chapter_4.load(t, cc.SpriteFrame, function(t, r) {
r && e(r);
});
break;

case 5:
i.default.n_chapter_5.load(t, cc.SpriteFrame, function(t, r) {
r && e(r);
});
break;

case 6:
i.default.n_chapter_6.load(t, cc.SpriteFrame, function(t, r) {
r && e(r);
});
}
});
}
r.loadPic = a;
var o = 0;
function s() {
return new Promise(function(e) {
console.log("1111111", "jsons/", i.default.localdate.chapter);
switch (i.default.localdate.chapter) {
case 0:
f("jsons/").then(function(t) {
t && e(!0);
});
break;

case 1:
c("jsons/").then(function(t) {
t && e(!0);
});
break;

case 2:
u("jsons/").then(function(t) {
t && e(!0);
});
break;

case 3:
h("jsons/").then(function(t) {
t && e(!0);
});
break;

case 4:
d("jsons/").then(function(t) {
t && e(!0);
});
break;

case 5:
l("jsons/").then(function(t) {
t && e(!0);
});
break;

case 6:
p("jsons/").then(function(t) {
t && e(!0);
});
}
});
}
r.loadJsonAll = s;
function f(e) {
return new Promise(function(t) {
if (i.default.localdate.guideisok) console.log("老用户不加新手引导"); else {
console.log("新用户加载新手引导");
cc.resources.load("clert/clert_1/guidenewTable", function(e, r) {
if (r) {
i.default.guidenewTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
}
cc.resources.load("clert/recodeTable", function(e, r) {
if (r) {
i.default.recodeTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
cc.resources.load("clert/musicTable", function(e, r) {
if (r) {
i.default.musicTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_0.load(e + "guessTable", function(e, r) {
if (r) {
i.default.guessTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_0.load(e + "peopleTable", function(e, r) {
if (r) {
i.default.peopleTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_0.load(e + "picTable", function(e, r) {
if (r) {
i.default.picTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_0.load(e + "propTable", function(e, r) {
if (r) {
i.default.propTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_0.load(e + "sceneTable", function(e, r) {
if (r) {
i.default.sceneTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_0.load(e + "talkTable", function(e, r) {
if (r) {
i.default.talkTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_0.load(e + "touchTable", function(e, r) {
if (r) {
i.default.touchTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
});
}
function c(e) {
return new Promise(function(t) {
cc.resources.load("clert/recodeTable", function(e, r) {
if (r) {
i.default.recodeTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
cc.resources.load("clert/musicTable", function(e, r) {
if (r) {
i.default.musicTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_1.load(e + "guessTable", function(e, r) {
if (r) {
i.default.guessTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_1.load(e + "peopleTable", function(e, r) {
if (r) {
i.default.peopleTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_1.load(e + "picTable", function(e, r) {
if (r) {
i.default.picTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_1.load(e + "propTable", function(e, r) {
if (r) {
i.default.propTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_1.load(e + "sceneTable", function(e, r) {
if (r) {
i.default.sceneTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_1.load(e + "talkTable", function(e, r) {
if (r) {
i.default.talkTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_1.load(e + "touchTable", function(e, r) {
if (r) {
i.default.touchTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
});
}
function u(e) {
return new Promise(function(t) {
cc.resources.load("clert/recodeTable", function(e, r) {
if (r) {
i.default.recodeTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
cc.resources.load("clert/musicTable", function(e, r) {
if (r) {
i.default.musicTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_2.load(e + "guessTable", function(e, r) {
if (r) {
i.default.guessTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_2.load(e + "peopleTable", function(e, r) {
if (r) {
i.default.peopleTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_2.load(e + "picTable", function(e, r) {
if (r) {
i.default.picTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_2.load(e + "propTable", function(e, r) {
if (r) {
i.default.propTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_2.load(e + "sceneTable", function(e, r) {
if (r) {
i.default.sceneTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_2.load(e + "talkTable", function(e, r) {
if (r) {
i.default.talkTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_2.load(e + "touchTable", function(e, r) {
if (r) {
i.default.touchTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
});
}
function h(e) {
return new Promise(function(t) {
if (i.default.localdate.guideisok) console.log("老用户不加新手引导"); else {
console.log("新用户加载新手引导");
cc.resources.load("clert/clert_2/guidenewTable", function(e, r) {
if (r) {
i.default.guidenewTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
}
cc.resources.load("clert/recodeTable", function(e, r) {
if (r) {
i.default.recodeTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
cc.resources.load("clert/musicTable", function(e, r) {
if (r) {
i.default.musicTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_3.load(e + "guessTable", function(e, r) {
if (r) {
i.default.guessTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_3.load(e + "peopleTable", function(e, r) {
if (r) {
i.default.peopleTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_3.load(e + "picTable", function(e, r) {
if (r) {
i.default.picTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_3.load(e + "propTable", function(e, r) {
if (r) {
i.default.propTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_3.load(e + "sceneTable", function(e, r) {
if (r) {
i.default.sceneTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_3.load(e + "talkTable", function(e, r) {
if (r) {
i.default.talkTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_3.load(e + "touchTable", function(e, r) {
if (r) {
i.default.touchTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
});
}
function d(e) {
return new Promise(function(t) {
cc.resources.load("clert/recodeTable", function(e, r) {
if (r) {
i.default.recodeTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
cc.resources.load("clert/musicTable", function(e, r) {
if (r) {
i.default.musicTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_4.load(e + "guessTable", function(e, r) {
if (r) {
i.default.guessTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_4.load(e + "peopleTable", function(e, r) {
if (r) {
i.default.peopleTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_4.load(e + "picTable", function(e, r) {
if (r) {
i.default.picTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_4.load(e + "propTable", function(e, r) {
if (r) {
i.default.propTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_4.load(e + "sceneTable", function(e, r) {
if (r) {
i.default.sceneTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_4.load(e + "talkTable", function(e, r) {
if (r) {
i.default.talkTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_4.load(e + "touchTable", function(e, r) {
if (r) {
i.default.touchTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
});
}
function l(e) {
return new Promise(function(t) {
cc.resources.load("clert/recodeTable", function(e, r) {
if (r) {
i.default.recodeTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
cc.resources.load("clert/musicTable", function(e, r) {
if (r) {
i.default.musicTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_5.load(e + "guessTable", function(e, r) {
if (r) {
i.default.guessTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_5.load(e + "peopleTable", function(e, r) {
if (r) {
i.default.peopleTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_5.load(e + "picTable", function(e, r) {
if (r) {
i.default.picTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_5.load(e + "propTable", function(e, r) {
if (r) {
i.default.propTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_5.load(e + "sceneTable", function(e, r) {
if (r) {
i.default.sceneTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_5.load(e + "talkTable", function(e, r) {
if (r) {
i.default.talkTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_5.load(e + "touchTable", function(e, r) {
if (r) {
i.default.touchTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
});
}
function p(e) {
return new Promise(function(t) {
cc.resources.load("clert/recodeTable", function(e, r) {
if (r) {
i.default.recodeTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
cc.resources.load("clert/musicTable", function(e, r) {
if (r) {
i.default.musicTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_6.load(e + "guessTable", function(e, r) {
if (r) {
i.default.guessTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_6.load(e + "peopleTable", function(e, r) {
if (r) {
i.default.peopleTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_6.load(e + "picTable", function(e, r) {
if (r) {
i.default.picTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_6.load(e + "propTable", function(e, r) {
if (r) {
i.default.propTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_6.load(e + "sceneTable", function(e, r) {
if (r) {
i.default.sceneTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_6.load(e + "talkTable", function(e, r) {
if (r) {
i.default.talkTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
i.default.n_chapter_6.load(e + "touchTable", function(e, r) {
if (r) {
i.default.touchTable = r.json;
b(1).then(function(e) {
e && t(!0);
});
}
});
});
}
function b(e) {
return new Promise(function(t) {
o += e;
console.log("numAll =", o);
if (i.default.localdate.guideisok) {
console.log("json_9");
if (9 == o) {
o = 0;
t(!0);
}
} else {
console.log("json_10");
if (10 == o) {
o = 0;
t(!0);
}
}
});
}
r.default = {
loadJsonAll: s,
loadJson: n,
loadPic: a
};
cc._RF.pop();
}, {
"../userStore/userStore": "userStore"
} ],
musicControl: [ function(e, t, r) {
"use strict";
cc._RF.push(t, "d5662A8SRVLVKcfmqErJznO", "musicControl");
Object.defineProperty(r, "__esModule", {
value: !0
});
var i = e("../userStore/userStore"), n = e("../ways/load_Json_Pic"), a = e("../ways/resourceRoad"), o = function() {
function e() {}
e.playBgm = function(e, t, r) {
var o = this;
null == t && (t = !0);
null == r && (r = i.default.localdate.musicgouVoice);
if (i.default.isBgmEnabled) {
this.stopBgm();
n.default.loadJson(i.default.musicTable).then(function(i) {
if (i) for (var n = 0, s = i.length; n < s; n++) if (i[n].musicId == e) {
var f = i[n].musicPath, c = a.default.pathMusic + f;
c && cc.resources.load(c, cc.AudioClip, function(e, i) {
e ? console.log(e) : o.playMusic(i, t, r);
});
}
});
}
};
e.stopBgm = function() {
cc.audioEngine.stopMusic();
i.default.playbgmusicing = !1;
};
e.playMusic = function(e, t, r) {
console.log("playMusic", i.default.isBgmEnabled, r);
if (i.default.isBgmEnabled) {
var n = cc.audioEngine.playMusic(e, t);
i.default.audioId = n;
this.BgmVoice(n, r);
i.default.playbgmusicing = !0;
}
};
e.BgmVoice = function(e, t) {
cc.audioEngine.setVolume(e, t);
};
e.playEffect = function(e, t, r) {
var o = this;
console.log("effect", e);
null == t && (t = !1);
null == r && (r = i.default.localdate.effectgouVoice);
this.stopEffect(e);
i.default.isEffEnabled && n.default.loadJson(i.default.musicTable).then(function(i) {
if (i) for (var n = 0; n < i.length; n++) if (i[n].musicId == e) {
var s = i[n].musicPath, f = a.default.pathEffect + s;
f && cc.resources.load(f, cc.AudioClip, function(i, n) {
i ? console.log(i) : o.clips[e] = o.playeEffect(n, t, r);
});
}
});
};
e.stopEffect = function(e) {
var t = this.clips[e];
null != t && cc.audioEngine.stopEffect(t);
};
e.playeEffect = function(e, t, r) {
console.log("playEffect", i.default.isEffEnabled, r);
if (i.default.isEffEnabled) {
var n = cc.audioEngine.playEffect(e, t);
this.EffVoice(n, r);
return n;
}
return n;
};
e.EffVoice = function(e, t) {
cc.audioEngine.setVolume(e, t);
};
e.playTalk = function(e, t, r) {
var n = this;
console.log("playTalk", e);
null == t && (t = !1);
null == r && (r = i.default.localdate.talkgouVoice);
this.stopTalk(e);
if (i.default.isTalkEnabled) {
var o = a.default.pathTalk + e;
o && cc.resources.load(o, cc.AudioClip, function(i, a) {
i ? console.log("talk", i) : n.clipstalk[e] = n.playeTalk(a, t, r);
});
}
};
e.stopTalk = function(e) {
var t = this.clipstalk[e];
null != t && cc.audioEngine.stopEffect(t);
};
e.playeTalk = function(e, t, r) {
console.log("playTalk", i.default.isTalkEnabled, r);
if (i.default.isTalkEnabled) {
var n = cc.audioEngine.playEffect(e, t);
i.default.TalkaudioId = n;
this.TalkVoice(n, r);
return n;
}
return n;
};
e.TalkVoice = function(e, t) {
cc.audioEngine.setVolume(e, t);
};
e.clips = {};
e.clipstalk = {};
return e;
}();
r.default = o;
cc._RF.pop();
}, {
"../userStore/userStore": "userStore",
"../ways/load_Json_Pic": "load_Json_Pic",
"../ways/resourceRoad": "resourceRoad"
} ],
resourceRoad: [ function(e, t, r) {
"use strict";
cc._RF.push(t, "276b7GUAjRHJonBXMRM9bdR", "resourceRoad");
Object.defineProperty(r, "__esModule", {
value: !0
});
var i = e("../userStore/userStore");
r.default = {
pathPic: "respic/",
pathJson: "clert/clert_" + (i.default.localdate.chapter + 1) + "/",
pathMusic: "music/",
pathEffect: "music/",
pathTalk: "music/talk/"
};
cc._RF.pop();
}, {
"../userStore/userStore": "userStore"
} ],
rng: [ function(e, t) {
"use strict";
cc._RF.push(t, "c134cE7umNP4a7AxKhcmfwg", "rng");
var r = e("crypto");
t.exports = function() {
return r.randomBytes(16);
};
cc._RF.pop();
}, {
crypto: 76
} ],
signals: [ function(e, t) {
"use strict";
cc._RF.push(t, "f39e4NPDC1P2pF9xTJyoGzX", "signals");
(function() {
function e(e, t, r, i, n) {
this._listener = t;
this._isOnce = r;
this.context = i;
this._signal = e;
this._priority = n || 0;
}
e.prototype = {
active: !0,
params: null,
execute: function(e) {
var t, r;
if (this.active && this._listener) {
r = this.params ? this.params.concat(e) : e;
t = this._listener.apply(this.context, r);
this._isOnce && this.detach();
}
return t;
},
detach: function() {
return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
},
isBound: function() {
return !!this._signal && !!this._listener;
},
isOnce: function() {
return this._isOnce;
},
getListener: function() {
return this._listener;
},
getSignal: function() {
return this._signal;
},
_destroy: function() {
delete this._signal;
delete this._listener;
delete this.context;
},
toString: function() {
return "[SignalBinding isOnce:" + this._isOnce + ", isBound:" + this.isBound() + ", active:" + this.active + "]";
}
};
function r(e, t) {
if ("function" != typeof e) throw new Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}", t));
}
function i() {
this._bindings = [];
this._prevParams = null;
var e = this;
this.dispatch = function() {
i.prototype.dispatch.apply(e, arguments);
};
}
i.prototype = {
VERSION: "1.0.0",
memorize: !1,
_shouldPropagate: !0,
active: !0,
_registerListener: function(t, r, i, n) {
var a, o = this._indexOfListener(t, i);
if (-1 !== o) {
if ((a = this._bindings[o]).isOnce() !== r) throw new Error("You cannot add" + (r ? "" : "Once") + "() then add" + (r ? "Once" : "") + "() the same listener without removing the relationship first.");
} else {
a = new e(this, t, r, i, n);
this._addBinding(a);
}
this.memorize && this._prevParams && a.execute(this._prevParams);
return a;
},
_addBinding: function(e) {
var t = this._bindings.length;
do {
--t;
} while (this._bindings[t] && e._priority <= this._bindings[t]._priority);
this._bindings.splice(t + 1, 0, e);
},
_indexOfListener: function(e, t) {
for (var r, i = this._bindings.length; i--; ) if ((r = this._bindings[i])._listener === e && r.context === t) return i;
return -1;
},
has: function(e, t) {
return -1 !== this._indexOfListener(e, t);
},
add: function(e, t, i) {
r(e, "add");
return this._registerListener(e, !1, t, i);
},
addOnce: function(e, t, i) {
r(e, "addOnce");
return this._registerListener(e, !0, t, i);
},
remove: function(e, t) {
r(e, "remove");
var i = this._indexOfListener(e, t);
if (-1 !== i) {
this._bindings[i]._destroy();
this._bindings.splice(i, 1);
}
return e;
},
removeAll: function() {
for (var e = this._bindings.length; e--; ) this._bindings[e]._destroy();
this._bindings.length = 0;
},
getNumListeners: function() {
return this._bindings.length;
},
halt: function() {
this._shouldPropagate = !1;
},
dispatch: function(e) {
if (this.active) {
var t, r = Array.prototype.slice.call(arguments), i = this._bindings.length;
this.memorize && (this._prevParams = r);
if (i) {
t = this._bindings.slice();
this._shouldPropagate = !0;
do {
i--;
} while (t[i] && this._shouldPropagate && !1 !== t[i].execute(r));
}
}
},
forget: function() {
this._prevParams = null;
},
dispose: function() {
this.removeAll();
delete this._bindings;
delete this._prevParams;
},
toString: function() {
return "[Signal active:" + this.active + " numListeners:" + this.getNumListeners() + "]";
}
};
var n = i;
n.Signal = i;
"function" == typeof define && define.amd ? define(function() {
return n;
}) : "undefined" != typeof t && t.exports ? t.exports = n : (void 0).signals = n;
})();
cc._RF.pop();
}, {} ],
"string-format": [ function(e, t) {
"use strict";
cc._RF.push(t, "473b3qyWwxHV4A7CrWqsNyx", "string-format");
(function(e) {
function r(e) {
var t = new Error(e);
t.name = "ValueError";
return t;
}
function i(e) {
return function(t) {
var i = Array.prototype.slice.call(arguments, 1), n = 0, a = "UNDEFINED";
return t.replace(/([{}])\1|[{](.*?)(?:!(.+?))?[}]/g, function(t, o, s, f) {
if (null != o) return o;
var c = s;
if (c.length > 0) {
if ("IMPLICIT" === a) throw r("cannot switch from implicit to explicit numbering");
a = "EXPLICIT";
} else {
if ("EXPLICIT" === a) throw r("cannot switch from explicit to implicit numbering");
a = "IMPLICIT";
c = String(n);
n += 1;
}
var u = c.split("."), h = (/^\d+$/.test(u[0]) ? u : [ "0" ].concat(u)).reduce(function(e, t) {
return e.reduce(function(e, r) {
return null != r && t in Object(r) ? [ "function" == typeof r[t] ? r[t]() : r[t] ] : [];
}, []);
}, [ i ]).reduce(function(e, t) {
return t;
}, "");
if (null == f) return h;
if (Object.prototype.hasOwnProperty.call(e, f)) return e[f](h);
throw r('no transformer named "' + f + '"');
});
};
}
var n = i({});
n.create = i;
n.extend = function(t, r) {
var n = i(r);
t.format = function() {
var t = Array.prototype.slice.call(arguments);
t.unshift(this);
return n.apply(e, t);
};
};
"undefined" != typeof t ? t.exports = n : "function" == typeof define && define.amd ? define(function() {
return n;
}) : e.format = n;
}).call(void 0, void 0);
cc._RF.pop();
}, {} ],
use_reversed_rotateBy: [ function(e, t) {
"use strict";
cc._RF.push(t, "16d3bP+1RJAgoWlIQKLymyF", "use_reversed_rotateBy");
cc.RotateBy._reverse = !0;
cc._RF.pop();
}, {} ],
userStore: [ function(e, t, r) {
"use strict";
cc._RF.push(t, "7b433byG7ZKzKCij/Cm7bkR", "userStore");
Object.defineProperty(r, "__esModule", {
value: !0
});
var i = e("../ways/addPower"), n = e("./Utils"), a = function() {
function e() {}
e.getProfile = function(e) {
var t = {}, r = {}, i = cc.sys.localStorage.getItem(e);
"" !== i && null !== i && (r = n.default.decrypt(i));
var a = r.error, o = r.decryptedtext;
a && cc.log("error:", a);
if (o) try {
t = JSON.parse(o);
} catch (e) {
cc.log("loadData:", e);
}
return t;
};
e.handleInitUserDatalocal = function(t) {
var r = this;
return new Promise(function(i) {
var n, a, o;
n = (n = e.getProfile("data_local")) && "" != n && n;
console.log("data_local", n);
if (n && "{}" !== JSON.stringify(n)) {
console.log("localdate有本地数据");
for (var s in n) n.hasOwnProperty(s) && (e.localdate[s] = n[s]);
i(!0);
} else if ("{}" == JSON.stringify(n) || !n || null == n || null == n) {
console.log("localdate没本地数据 走服务器数据");
if (window.wx) r.handleInitUserDatainit(t).then(function(e) {
e && i(!0);
}); else {
e.is_new = !0;
for (var s in e.localdate) e.localdate.hasOwnProperty(s) && (e.localdate[s] = e.localdate[s]);
i(!0);
}
}
a = (a = cc.sys.localStorage.getItem("data_local_offlineTime")) && "" != a ? JSON.parse(a) : 0;
console.log("offline", a);
e.offlineTime = null != a ? a : e.offlineTime;
o = (o = cc.sys.localStorage.getItem("data_local_chapterData")) && "" != o ? JSON.parse(o) : [];
console.log("章节数据", o);
e.chapterData.push(JSON.stringify(o));
console.log("保存章节数据", e.chapterData);
r.upday();
});
};
e.handleInitUserDatainit = function(t) {
var r = this;
return new Promise(function(i) {
if (t) {
var n = JSON.parse(t.data), a = n.localdate, o = n.offlineTime, s = n.chapterData;
if (a && "{}" !== JSON.stringify(a)) {
console.log("获取wx最新信息-数据", a);
for (var f in a) a.hasOwnProperty(f) && (e.localdate[f] = a[f]);
i(!0);
}
t.is_new ? e.is_new = t.is_new : e.is_new = !1;
if (o) {
console.log("获取wx最新信息-离线时间", o);
e.offlineTime = o;
}
if (s) {
console.log("获取wx最新信息-章节数据", s);
e.chapterData = s;
}
r.upday();
} else if ("{}" == JSON.stringify(t) || !t || null == t || null == t) {
console.log("没有服务器数据  新手化");
for (var f in e.localdate) e.localdate.hasOwnProperty(f) && (e.localdate[f] = e.localdate[f]);
e.is_new = !0;
e.offlineTime = e.offlineTime;
e.chapterData = e.chapterData;
r.upday();
i(!0);
}
});
};
e.timepower = function(t) {
console.log("初始化体力", e.offlineTime, e.recode_allpowers);
var r = new Date().getTime();
new Date().getDate();
console.log("nowtime =", r);
console.log("offlineTime", t);
var n = Math.ceil((r - t) / 1e3);
console.log("时间差", n);
if (n >= 300 * (e.recode_allpowers ? e.recode_allpowers : 200)) {
e.localdate.power = e.recode_allpowers ? e.recode_allpowers : 200;
e.localdate.scheduleNumtimepower = !1;
} else {
console.log("11111", e.localdate.power, e.recode_allpowers ? e.recode_allpowers : 200);
var a = e.recode_allpowers ? e.recode_allpowers : 200;
if (e.localdate.power < a) {
var o = Math.floor(n / 60 / 5);
console.log("加的体力数", o);
e.localdate.isspeed ? i.default.addpower(2 * o) : i.default.addpower(o);
console.log("记录的体力倒计时", e.localdate.timepower);
if (e.localdate.isspeed) {
n % 300 * 2 >= 300 && i.default.addpower(Math.floor(n % 300 * 2 / 300));
e.localdate.timepower -= n % 300 * 2 % 300;
if (e.localdate.timepower <= 0) {
e.localdate.timepower = 300 + e.localdate.timepower;
i.default.addpower(1);
}
} else {
e.localdate.timepower -= n % 300;
if (e.localdate.timepower <= 0) {
e.localdate.timepower = 300 + e.localdate.timepower;
i.default.addpower(1);
}
}
e.localdate.scheduleNumtimepower = !0;
if (e.localdate.power >= (e.recode_allpowers ? e.recode_allpowers : 200)) {
e.localdate.power = e.recode_allpowers ? e.recode_allpowers : 200;
e.localdate.scheduleNumtimepower = !1;
}
} else {
e.localdate.power = e.recode_allpowers ? e.recode_allpowers : 200;
e.localdate.scheduleNumtimepower = !1;
}
}
if (n >= 43200) {
e.localdate.timepowerspeed = 43200;
e.localdate.isspeed = !1;
e.localdate.scheduleNumtimepowerspeed = !1;
} else if (e.localdate.isspeed) {
e.localdate.isspeed = !0;
e.localdate.scheduleNumtimepowerspeed = !0;
e.localdate.timepowerspeed -= n;
console.log("加速剩余时间", e.localdate.timepowerspeed);
}
if (e.offlineTime > 0 && null !== e.offlineTime && void 0 !== e.offlineTime && NaN !== e.offlineTime) {
e.localdate.timelab1 > 0 && null !== e.localdate.timelab1 && void 0 !== e.localdate.timelab1 && NaN !== e.localdate.timelab1 && (e.localdate.timelab1 - n <= 0 ? e.localdate.timelab1 = 0 : e.localdate.timelab1 -= n);
e.localdate.timelab2 > 0 && null !== e.localdate.timelab2 && void 0 !== e.localdate.timelab2 && NaN !== e.localdate.timelab2 && (e.localdate.timelab2 - n <= 0 ? e.localdate.timelab2 = 0 : e.localdate.timelab2 -= n);
e.localdate.timelab3 > 0 && null !== e.localdate.timelab3 && void 0 !== e.localdate.timelab3 && NaN !== e.localdate.timelab3 && (e.localdate.timelab3 - n <= 0 ? e.localdate.timelab3 = 0 : e.localdate.timelab3 -= n);
}
};
e.chapter_cleanData = function() {
return new Promise(function(t) {
var r = {
prop: [],
people: [],
peoplenew: [],
guess: [],
guessnew: [],
door: [],
guess_tl: [],
proptip: [],
proptipnumtime: 1,
sceneId: null,
allSceneOpen: [],
close_case_done: !1,
scheduleList: [ "timecode1", "timecode2", "timecode3" ],
scheduleNumtime1: !1,
timelab1: 0,
timelab1_nodename1: "",
scheduleNumtime2: !1,
timelab2: 0,
timelab1_nodename2: "",
scheduleNumtime3: !1,
timelab3: 0,
timelab1_nodename3: "",
timepower: 300,
scheduleNumtimepower: !1,
codeisok: !1,
watch_share_time: 0
}, i = {
power: e.recode_allpowers ? e.recode_allpowers : 200,
prop: [],
people: [],
peoplenew: [],
guess: [],
guessnew: [],
door: [],
guess_tl: [],
proptip: [],
proptipnumtime: 1,
chapter: 0,
sceneId: null,
allSceneOpen: [],
close_case_done: !1,
scheduleList: [ "timecode1", "timecode2", "timecode3" ],
scheduleNumtime1: !1,
timelab1: 0,
timelab1_nodename1: "",
scheduleNumtime2: !1,
timelab2: 0,
timelab1_nodename2: "",
scheduleNumtime3: !1,
timelab3: 0,
timelab1_nodename3: "",
timepower: 300,
scheduleNumtimepower: !1,
timepowerspeed: 43200,
scheduleNumtimepowerspeed: !1,
isspeed: !1,
codeisok: !1,
guideisok: !1,
guideObj: null,
isgo_my_room: !1,
watch_share_time: 0,
blotter_sce_999: null,
musicgoutime: 0,
musicgouVoice: .2,
effectgoutime: 0,
effectgouVoice: .3,
talkgoutime: 0,
talkgouVoice: .7
};
for (var n in e.localdate) e.localdate.hasOwnProperty(n) && (i[n] = e.localdate[n]);
for (var n in r) r.hasOwnProperty(n) && (i[n] = r[n]);
for (var n in i) i.hasOwnProperty(n) && (e.localdate[n] = i[n]);
t(!0);
});
};
e.cleanData = function() {
var t = {
power: e.recode_allpowers ? e.recode_allpowers : 200,
prop: [],
people: [],
peoplenew: [],
guess: [],
guessnew: [],
door: [],
guess_tl: [],
proptip: [],
proptipnumtime: 1,
chapter: 0,
sceneId: null,
musicId: null,
allSceneOpen: [],
close_case_done: !1,
scheduleList: [ "timecode1", "timecode2", "timecode3" ],
scheduleNumtime1: !1,
timelab1: 0,
timelab1_nodename1: "",
scheduleNumtime2: !1,
timelab2: 0,
timelab1_nodename2: "",
scheduleNumtime3: !1,
timelab3: 0,
timelab1_nodename3: "",
timepower: 300,
scheduleNumtimepower: !1,
timepowerspeed: 43200,
scheduleNumtimepowerspeed: !1,
isspeed: !1,
codeisok: !1,
guideisok: !1,
guideObj: null,
isgo_my_room: !1,
watch_share_time: 0,
blotter_sce_999: null,
musicgoutime: 0,
musicgouVoice: .2,
effectgoutime: 0,
effectgouVoice: .3,
talkgoutime: 0,
talkgouVoice: .7
};
for (var r in e.localdate) e.localdate.hasOwnProperty(r) && (e.localdate[r] = t[r]);
return e.localdate;
};
e.upday = function() {};
e.init_offline = function() {};
e.token = null;
e.openid = null;
e.is_new = !1;
e.n_chapter_0 = null;
e.n_chapter_1 = null;
e.n_chapter_2 = null;
e.n_chapter_3 = null;
e.n_chapter_4 = null;
e.n_chapter_5 = null;
e.n_chapter_6 = null;
e.n_chapter_public = null;
e.deblock = [];
e.talkClert = [];
e.talkClert_prop = null;
e.temptalkSce = null;
e.clickguessId = null;
e.guess_choose_data = null;
e.is_close_case = null;
e.close_case_answer_data = null;
e.close_case_answer_false = null;
e.choose_case_true_false = null;
e.last_click_prop = null;
e.now_click_prop = null;
e.talk_return_isupordown = !1;
e.poweranimnum = 0;
e.checkguess = !1;
e.ispropstrike1 = !1;
e.isclosecasestate = !1;
e.istalkstate = !1;
e.tiptime5s = !0;
e.stongturnSceontalk = !1;
e.mapSces = null;
e.ismomery = !1;
e.startnewplayerguide = !1;
e.isnowatmenu = !1;
e.endnewguide = !1;
e.oldprop_strikeguess = !1;
e.bannerishide = !1;
e.timevideonum = 0;
e.watch_video = !1;
e.watch_video_data = null;
e.recodeTable = null;
e.guessTable = null;
e.peopleTable = null;
e.picTable = null;
e.propTable = null;
e.sceneTable = null;
e.talkTable = null;
e.touchTable = null;
e.musicTable = null;
e.guidenewTable = null;
e.recode_ask = null;
e.recode_guess = null;
e.recode_startscene = null;
e.recode_closeclert = null;
e.recode_addpower = null;
e.recode_asy_atonce = null;
e.recode_memory = null;
e.recode_allpowers = null;
e.recode_click_power = null;
e.recode_guessAllNum = null;
e.recode_startchapter = null;
e.isEffEnabled = !0;
e.isBgmEnabled = !0;
e.isTalkEnabled = !0;
e.istalkMusic = !1;
e.talknomus = 0;
e.musicId = null;
e.audioId = null;
e.TalkId = null;
e.TalkaudioId = null;
e.playbgmusicing = !1;
e.sch1 = 0;
e.sch2 = 0;
e.sch3 = 0;
e.numall1 = 0;
e.numall2 = 0;
e.numall3 = 0;
e.offlineTime = 0;
e.chapterData = [];
e.localdate = {
power: 200,
prop: [],
people: [],
peoplenew: [],
guess: [],
guessnew: [],
door: [],
guess_tl: [],
proptip: [],
proptipnumtime: 1,
chapter: 3,
sceneId: null,
allSceneOpen: [],
close_case_done: !1,
scheduleList: [ "timecode1", "timecode2", "timecode3" ],
scheduleNumtime1: !1,
timelab1: 0,
timelab1_nodename1: "",
scheduleNumtime2: !1,
timelab2: 0,
timelab1_nodename2: "",
scheduleNumtime3: !1,
timelab3: 0,
timelab1_nodename3: "",
timepower: 300,
scheduleNumtimepower: !1,
timepowerspeed: 43200,
scheduleNumtimepowerspeed: !1,
isspeed: !1,
codeisok: !1,
guideisok: !1,
guideObj: null,
isgo_my_room: !1,
watch_share_time: 0,
blotter_sce_999: null,
musicgoutime: 0,
musicgouVoice: .2,
effectgoutime: 0,
effectgouVoice: .3,
talkgoutime: 0,
talkgouVoice: .7
};
return e;
}();
r.default = a;
cc._RF.pop();
}, {
"../ways/addPower": "addPower",
"./Utils": "Utils"
} ],
uuidv1: [ function(e, t) {
"use strict";
cc._RF.push(t, "57e1fOexC1N9ZFp15InTjAs", "uuidv1");
var r, i, n = e("rng"), a = e("bytesToUuid"), o = 0, s = 0;
t.exports = function(e, t, f) {
var c = t && f || 0, u = t || [], h = (e = e || {}).node || r, d = void 0 !== e.clockseq ? e.clockseq : i;
if (null == h || null == d) {
var l = n();
null == h && (h = r = [ 1 | l[0], l[1], l[2], l[3], l[4], l[5] ]);
null == d && (d = i = 16383 & (l[6] << 8 | l[7]));
}
var p = void 0 !== e.msecs ? e.msecs : new Date().getTime(), b = void 0 !== e.nsecs ? e.nsecs : s + 1, m = p - o + (b - s) / 1e4;
m < 0 && void 0 === e.clockseq && (d = d + 1 & 16383);
(m < 0 || p > o) && void 0 === e.nsecs && (b = 0);
if (b >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
o = p;
s = b;
i = d;
var g = (1e4 * (268435455 & (p += 122192928e5)) + b) % 4294967296;
u[c++] = g >>> 24 & 255;
u[c++] = g >>> 16 & 255;
u[c++] = g >>> 8 & 255;
u[c++] = 255 & g;
var y = p / 4294967296 * 1e4 & 268435455;
u[c++] = y >>> 8 & 255;
u[c++] = 255 & y;
u[c++] = y >>> 24 & 15 | 16;
u[c++] = y >>> 16 & 255;
u[c++] = d >>> 8 | 128;
u[c++] = 255 & d;
for (var v = 0; v < 6; ++v) u[c + v] = h[v];
return t || a(u);
};
cc._RF.pop();
}, {
bytesToUuid: "bytesToUuid",
rng: "rng"
} ]
}, {}, [ "use_reversed_rotateBy", "Loading", "aes-js", "base64", "bignumber", "bytesToUuid", "rng", "signals", "string-format", "uuidv1", "musicControl", "Utils", "userStore", "addPower", "blink", "canvasSize", "eventPost", "load_Json_Pic", "resourceRoad" ]);