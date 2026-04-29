(function () { const e = document.createElement("link").relList; if (e && e.supports && e.supports("modulepreload")) return; for (const i of document.querySelectorAll('link[rel="modulepreload"]')) n(i); new MutationObserver(i => { for (const r of i) if (r.type === "childList") for (const a of r.addedNodes) a.tagName === "LINK" && a.rel === "modulepreload" && n(a) }).observe(document, { childList: !0, subtree: !0 }); function t(i) { const r = {}; return i.integrity && (r.integrity = i.integrity), i.referrerPolicy && (r.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? r.credentials = "include" : i.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin", r } function n(i) { if (i.ep) return; i.ep = !0; const r = t(i); fetch(i.href, r) } })();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const xo = "183", Eh = 0, el = 1, Th = 2, lr = 1, Ah = 2, ls = 3, Fn = 0, Bt = 1, Qt = 2, Nn = 0, Di = 1, tl = 2, nl = 3, il = 4, wh = 5, ci = 100, Rh = 101, Ch = 102, Ph = 103, Lh = 104, Ih = 200, Dh = 201, Nh = 202, Uh = 203, Ma = 204, Sa = 205, Fh = 206, Oh = 207, Bh = 208, zh = 209, kh = 210, Vh = 211, Hh = 212, Gh = 213, Wh = 214, ya = 0, ba = 1, Ea = 2, Oi = 3, Ta = 4, Aa = 5, wa = 6, Ra = 7, vo = 0, Xh = 1, Yh = 2, gn = 0, wc = 1, Rc = 2, Cc = 3, Pc = 4, Lc = 5, Ic = 6, Dc = 7, sl = "attached", qh = "detached", Nc = 300, di = 301, Bi = 302, Ir = 303, Dr = 304, yr = 306, Zn = 1e3, pn = 1001, gr = 1002, _t = 1003, Uc = 1004, cs = 1005, xt = 1006, cr = 1007, Ln = 1008, Ht = 1009, Fc = 1010, Oc = 1011, _s = 1012, Mo = 1013, vn = 1014, Xt = 1015, On = 1016, So = 1017, yo = 1018, xs = 1020, Bc = 35902, zc = 35899, kc = 1021, Vc = 1022, Yt = 1023, Bn = 1026, ui = 1027, bo = 1028, Eo = 1029, zi = 1030, To = 1031, Ao = 1033, hr = 33776, ur = 33777, dr = 33778, fr = 33779, Ca = 35840, Pa = 35841, La = 35842, Ia = 35843, Da = 36196, Na = 37492, Ua = 37496, Fa = 37488, Oa = 37489, Ba = 37490, za = 37491, ka = 37808, Va = 37809, Ha = 37810, Ga = 37811, Wa = 37812, Xa = 37813, Ya = 37814, qa = 37815, $a = 37816, Ka = 37817, ja = 37818, Za = 37819, Ja = 37820, Qa = 37821, eo = 36492, to = 36494, no = 36495, io = 36283, so = 36284, ro = 36285, ao = 36286, vs = 2300, Ms = 2301, Nr = 2302, rl = 2303, al = 2400, ol = 2401, ll = 2402, $h = 2500, Kh = 0, Hc = 1, oo = 2, jh = 3200, wo = 0, Zh = 1, Kn = "", wt = "srgb", Ot = "srgb-linear", _r = "linear", je = "srgb", gi = 7680, cl = 519, Jh = 512, Qh = 513, eu = 514, Ro = 515, tu = 516, nu = 517, Co = 518, iu = 519, lo = 35044, hl = "300 es", mn = 2e3, Ss = 2001; function su(s) { for (let e = s.length - 1; e >= 0; --e)if (s[e] >= 65535) return !0; return !1 } function ru(s) { return ArrayBuffer.isView(s) && !(s instanceof DataView) } function ys(s) { return document.createElementNS("http://www.w3.org/1999/xhtml", s) } function au() { const s = ys("canvas"); return s.style.display = "block", s } const ul = {}; function xr(...s) { const e = "THREE." + s.shift(); console.log(e, ...s) } function Gc(s) { const e = s[0]; if (typeof e == "string" && e.startsWith("TSL:")) { const t = s[1]; t && t.isStackTrace ? s[0] += " " + t.getLocation() : s[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.' } return s } function Ee(...s) { s = Gc(s); const e = "THREE." + s.shift(); { const t = s[0]; t && t.isStackTrace ? console.warn(t.getError(e)) : console.warn(e, ...s) } } function Ce(...s) { s = Gc(s); const e = "THREE." + s.shift(); { const t = s[0]; t && t.isStackTrace ? console.error(t.getError(e)) : console.error(e, ...s) } } function vr(...s) { const e = s.join(" "); e in ul || (ul[e] = !0, Ee(...s)) } function ou(s, e, t) { return new Promise(function (n, i) { function r() { switch (s.clientWaitSync(e, s.SYNC_FLUSH_COMMANDS_BIT, 0)) { case s.WAIT_FAILED: i(); break; case s.TIMEOUT_EXPIRED: setTimeout(r, t); break; default: n() } } setTimeout(r, t) }) } const lu = { [ya]: ba, [Ea]: wa, [Ta]: Ra, [Oi]: Aa, [ba]: ya, [wa]: Ea, [Ra]: Ta, [Aa]: Oi }; class Xi { addEventListener(e, t) { this._listeners === void 0 && (this._listeners = {}); const n = this._listeners; n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t) } hasEventListener(e, t) { const n = this._listeners; return n === void 0 ? !1 : n[e] !== void 0 && n[e].indexOf(t) !== -1 } removeEventListener(e, t) { const n = this._listeners; if (n === void 0) return; const i = n[e]; if (i !== void 0) { const r = i.indexOf(t); r !== -1 && i.splice(r, 1) } } dispatchEvent(e) { const t = this._listeners; if (t === void 0) return; const n = t[e.type]; if (n !== void 0) { e.target = this; const i = n.slice(0); for (let r = 0, a = i.length; r < a; r++)i[r].call(this, e); e.target = null } } } const Pt = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"]; let dl = 1234567; const ds = Math.PI / 180, ki = 180 / Math.PI; function sn() { const s = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0; return (Pt[s & 255] + Pt[s >> 8 & 255] + Pt[s >> 16 & 255] + Pt[s >> 24 & 255] + "-" + Pt[e & 255] + Pt[e >> 8 & 255] + "-" + Pt[e >> 16 & 15 | 64] + Pt[e >> 24 & 255] + "-" + Pt[t & 63 | 128] + Pt[t >> 8 & 255] + "-" + Pt[t >> 16 & 255] + Pt[t >> 24 & 255] + Pt[n & 255] + Pt[n >> 8 & 255] + Pt[n >> 16 & 255] + Pt[n >> 24 & 255]).toLowerCase() } function He(s, e, t) { return Math.max(e, Math.min(t, s)) } function Po(s, e) { return (s % e + e) % e } function cu(s, e, t, n, i) { return n + (s - e) * (i - n) / (t - e) } function hu(s, e, t) { return s !== e ? (t - s) / (e - s) : 0 } function fs(s, e, t) { return (1 - t) * s + t * e } function uu(s, e, t, n) { return fs(s, e, 1 - Math.exp(-t * n)) } function du(s, e = 1) { return e - Math.abs(Po(s, e * 2) - e) } function fu(s, e, t) { return s <= e ? 0 : s >= t ? 1 : (s = (s - e) / (t - e), s * s * (3 - 2 * s)) } function pu(s, e, t) { return s <= e ? 0 : s >= t ? 1 : (s = (s - e) / (t - e), s * s * s * (s * (s * 6 - 15) + 10)) } function mu(s, e) { return s + Math.floor(Math.random() * (e - s + 1)) } function gu(s, e) { return s + Math.random() * (e - s) } function _u(s) { return s * (.5 - Math.random()) } function xu(s) { s !== void 0 && (dl = s); let e = dl += 1831565813; return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296 } function vu(s) { return s * ds } function Mu(s) { return s * ki } function Su(s) { return (s & s - 1) === 0 && s !== 0 } function yu(s) { return Math.pow(2, Math.ceil(Math.log(s) / Math.LN2)) } function bu(s) { return Math.pow(2, Math.floor(Math.log(s) / Math.LN2)) } function Eu(s, e, t, n, i) { const r = Math.cos, a = Math.sin, o = r(t / 2), l = a(t / 2), c = r((e + n) / 2), h = a((e + n) / 2), d = r((e - n) / 2), u = a((e - n) / 2), f = r((n - e) / 2), g = a((n - e) / 2); switch (i) { case "XYX": s.set(o * h, l * d, l * u, o * c); break; case "YZY": s.set(l * u, o * h, l * d, o * c); break; case "ZXZ": s.set(l * d, l * u, o * h, o * c); break; case "XZX": s.set(o * h, l * g, l * f, o * c); break; case "YXY": s.set(l * f, o * h, l * g, o * c); break; case "ZYZ": s.set(l * g, l * f, o * h, o * c); break; default: Ee("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + i) } } function en(s, e) { switch (e.constructor) { case Float32Array: return s; case Uint32Array: return s / 4294967295; case Uint16Array: return s / 65535; case Uint8Array: return s / 255; case Int32Array: return Math.max(s / 2147483647, -1); case Int16Array: return Math.max(s / 32767, -1); case Int8Array: return Math.max(s / 127, -1); default: throw new Error("Invalid component type.") } } function Ze(s, e) { switch (e.constructor) { case Float32Array: return s; case Uint32Array: return Math.round(s * 4294967295); case Uint16Array: return Math.round(s * 65535); case Uint8Array: return Math.round(s * 255); case Int32Array: return Math.round(s * 2147483647); case Int16Array: return Math.round(s * 32767); case Int8Array: return Math.round(s * 127); default: throw new Error("Invalid component type.") } } const Ni = { DEG2RAD: ds, RAD2DEG: ki, generateUUID: sn, clamp: He, euclideanModulo: Po, mapLinear: cu, inverseLerp: hu, lerp: fs, damp: uu, pingpong: du, smoothstep: fu, smootherstep: pu, randInt: mu, randFloat: gu, randFloatSpread: _u, seededRandom: xu, degToRad: vu, radToDeg: Mu, isPowerOfTwo: Su, ceilPowerOfTwo: yu, floorPowerOfTwo: bu, setQuaternionFromProperEuler: Eu, normalize: Ze, denormalize: en }; class Ge { constructor(e = 0, t = 0) { Ge.prototype.isVector2 = !0, this.x = e, this.y = t } get width() { return this.x } set width(e) { this.x = e } get height() { return this.y } set height(e) { this.y = e } set(e, t) { return this.x = e, this.y = t, this } setScalar(e) { return this.x = e, this.y = e, this } setX(e) { return this.x = e, this } setY(e) { return this.y = e, this } setComponent(e, t) { switch (e) { case 0: this.x = t; break; case 1: this.y = t; break; default: throw new Error("index is out of range: " + e) }return this } getComponent(e) { switch (e) { case 0: return this.x; case 1: return this.y; default: throw new Error("index is out of range: " + e) } } clone() { return new this.constructor(this.x, this.y) } copy(e) { return this.x = e.x, this.y = e.y, this } add(e) { return this.x += e.x, this.y += e.y, this } addScalar(e) { return this.x += e, this.y += e, this } addVectors(e, t) { return this.x = e.x + t.x, this.y = e.y + t.y, this } addScaledVector(e, t) { return this.x += e.x * t, this.y += e.y * t, this } sub(e) { return this.x -= e.x, this.y -= e.y, this } subScalar(e) { return this.x -= e, this.y -= e, this } subVectors(e, t) { return this.x = e.x - t.x, this.y = e.y - t.y, this } multiply(e) { return this.x *= e.x, this.y *= e.y, this } multiplyScalar(e) { return this.x *= e, this.y *= e, this } divide(e) { return this.x /= e.x, this.y /= e.y, this } divideScalar(e) { return this.multiplyScalar(1 / e) } applyMatrix3(e) { const t = this.x, n = this.y, i = e.elements; return this.x = i[0] * t + i[3] * n + i[6], this.y = i[1] * t + i[4] * n + i[7], this } min(e) { return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this } max(e) { return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this } clamp(e, t) { return this.x = He(this.x, e.x, t.x), this.y = He(this.y, e.y, t.y), this } clampScalar(e, t) { return this.x = He(this.x, e, t), this.y = He(this.y, e, t), this } clampLength(e, t) { const n = this.length(); return this.divideScalar(n || 1).multiplyScalar(He(n, e, t)) } floor() { return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this } ceil() { return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this } round() { return this.x = Math.round(this.x), this.y = Math.round(this.y), this } roundToZero() { return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this } negate() { return this.x = -this.x, this.y = -this.y, this } dot(e) { return this.x * e.x + this.y * e.y } cross(e) { return this.x * e.y - this.y * e.x } lengthSq() { return this.x * this.x + this.y * this.y } length() { return Math.sqrt(this.x * this.x + this.y * this.y) } manhattanLength() { return Math.abs(this.x) + Math.abs(this.y) } normalize() { return this.divideScalar(this.length() || 1) } angle() { return Math.atan2(-this.y, -this.x) + Math.PI } angleTo(e) { const t = Math.sqrt(this.lengthSq() * e.lengthSq()); if (t === 0) return Math.PI / 2; const n = this.dot(e) / t; return Math.acos(He(n, -1, 1)) } distanceTo(e) { return Math.sqrt(this.distanceToSquared(e)) } distanceToSquared(e) { const t = this.x - e.x, n = this.y - e.y; return t * t + n * n } manhattanDistanceTo(e) { return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) } setLength(e) { return this.normalize().multiplyScalar(e) } lerp(e, t) { return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this } lerpVectors(e, t, n) { return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this } equals(e) { return e.x === this.x && e.y === this.y } fromArray(e, t = 0) { return this.x = e[t], this.y = e[t + 1], this } toArray(e = [], t = 0) { return e[t] = this.x, e[t + 1] = this.y, e } fromBufferAttribute(e, t) { return this.x = e.getX(t), this.y = e.getY(t), this } rotateAround(e, t) { const n = Math.cos(t), i = Math.sin(t), r = this.x - e.x, a = this.y - e.y; return this.x = r * n - a * i + e.x, this.y = r * i + a * n + e.y, this } random() { return this.x = Math.random(), this.y = Math.random(), this } *[Symbol.iterator]() { yield this.x, yield this.y } } class an { constructor(e = 0, t = 0, n = 0, i = 1) { this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = i } static slerpFlat(e, t, n, i, r, a, o) { let l = n[i + 0], c = n[i + 1], h = n[i + 2], d = n[i + 3], u = r[a + 0], f = r[a + 1], g = r[a + 2], v = r[a + 3]; if (d !== v || l !== u || c !== f || h !== g) { let m = l * u + c * f + h * g + d * v; m < 0 && (u = -u, f = -f, g = -g, v = -v, m = -m); let p = 1 - o; if (m < .9995) { const M = Math.acos(m), E = Math.sin(M); p = Math.sin(p * M) / E, o = Math.sin(o * M) / E, l = l * p + u * o, c = c * p + f * o, h = h * p + g * o, d = d * p + v * o } else { l = l * p + u * o, c = c * p + f * o, h = h * p + g * o, d = d * p + v * o; const M = 1 / Math.sqrt(l * l + c * c + h * h + d * d); l *= M, c *= M, h *= M, d *= M } } e[t] = l, e[t + 1] = c, e[t + 2] = h, e[t + 3] = d } static multiplyQuaternionsFlat(e, t, n, i, r, a) { const o = n[i], l = n[i + 1], c = n[i + 2], h = n[i + 3], d = r[a], u = r[a + 1], f = r[a + 2], g = r[a + 3]; return e[t] = o * g + h * d + l * f - c * u, e[t + 1] = l * g + h * u + c * d - o * f, e[t + 2] = c * g + h * f + o * u - l * d, e[t + 3] = h * g - o * d - l * u - c * f, e } get x() { return this._x } set x(e) { this._x = e, this._onChangeCallback() } get y() { return this._y } set y(e) { this._y = e, this._onChangeCallback() } get z() { return this._z } set z(e) { this._z = e, this._onChangeCallback() } get w() { return this._w } set w(e) { this._w = e, this._onChangeCallback() } set(e, t, n, i) { return this._x = e, this._y = t, this._z = n, this._w = i, this._onChangeCallback(), this } clone() { return new this.constructor(this._x, this._y, this._z, this._w) } copy(e) { return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this } setFromEuler(e, t = !0) { const n = e._x, i = e._y, r = e._z, a = e._order, o = Math.cos, l = Math.sin, c = o(n / 2), h = o(i / 2), d = o(r / 2), u = l(n / 2), f = l(i / 2), g = l(r / 2); switch (a) { case "XYZ": this._x = u * h * d + c * f * g, this._y = c * f * d - u * h * g, this._z = c * h * g + u * f * d, this._w = c * h * d - u * f * g; break; case "YXZ": this._x = u * h * d + c * f * g, this._y = c * f * d - u * h * g, this._z = c * h * g - u * f * d, this._w = c * h * d + u * f * g; break; case "ZXY": this._x = u * h * d - c * f * g, this._y = c * f * d + u * h * g, this._z = c * h * g + u * f * d, this._w = c * h * d - u * f * g; break; case "ZYX": this._x = u * h * d - c * f * g, this._y = c * f * d + u * h * g, this._z = c * h * g - u * f * d, this._w = c * h * d + u * f * g; break; case "YZX": this._x = u * h * d + c * f * g, this._y = c * f * d + u * h * g, this._z = c * h * g - u * f * d, this._w = c * h * d - u * f * g; break; case "XZY": this._x = u * h * d - c * f * g, this._y = c * f * d - u * h * g, this._z = c * h * g + u * f * d, this._w = c * h * d + u * f * g; break; default: Ee("Quaternion: .setFromEuler() encountered an unknown order: " + a) }return t === !0 && this._onChangeCallback(), this } setFromAxisAngle(e, t) { const n = t / 2, i = Math.sin(n); return this._x = e.x * i, this._y = e.y * i, this._z = e.z * i, this._w = Math.cos(n), this._onChangeCallback(), this } setFromRotationMatrix(e) { const t = e.elements, n = t[0], i = t[4], r = t[8], a = t[1], o = t[5], l = t[9], c = t[2], h = t[6], d = t[10], u = n + o + d; if (u > 0) { const f = .5 / Math.sqrt(u + 1); this._w = .25 / f, this._x = (h - l) * f, this._y = (r - c) * f, this._z = (a - i) * f } else if (n > o && n > d) { const f = 2 * Math.sqrt(1 + n - o - d); this._w = (h - l) / f, this._x = .25 * f, this._y = (i + a) / f, this._z = (r + c) / f } else if (o > d) { const f = 2 * Math.sqrt(1 + o - n - d); this._w = (r - c) / f, this._x = (i + a) / f, this._y = .25 * f, this._z = (l + h) / f } else { const f = 2 * Math.sqrt(1 + d - n - o); this._w = (a - i) / f, this._x = (r + c) / f, this._y = (l + h) / f, this._z = .25 * f } return this._onChangeCallback(), this } setFromUnitVectors(e, t) { let n = e.dot(t) + 1; return n < 1e-8 ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize() } angleTo(e) { return 2 * Math.acos(Math.abs(He(this.dot(e), -1, 1))) } rotateTowards(e, t) { const n = this.angleTo(e); if (n === 0) return this; const i = Math.min(1, t / n); return this.slerp(e, i), this } identity() { return this.set(0, 0, 0, 1) } invert() { return this.conjugate() } conjugate() { return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this } dot(e) { return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w } lengthSq() { return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w } length() { return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w) } normalize() { let e = this.length(); return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this } multiply(e) { return this.multiplyQuaternions(this, e) } premultiply(e) { return this.multiplyQuaternions(e, this) } multiplyQuaternions(e, t) { const n = e._x, i = e._y, r = e._z, a = e._w, o = t._x, l = t._y, c = t._z, h = t._w; return this._x = n * h + a * o + i * c - r * l, this._y = i * h + a * l + r * o - n * c, this._z = r * h + a * c + n * l - i * o, this._w = a * h - n * o - i * l - r * c, this._onChangeCallback(), this } slerp(e, t) { let n = e._x, i = e._y, r = e._z, a = e._w, o = this.dot(e); o < 0 && (n = -n, i = -i, r = -r, a = -a, o = -o); let l = 1 - t; if (o < .9995) { const c = Math.acos(o), h = Math.sin(c); l = Math.sin(l * c) / h, t = Math.sin(t * c) / h, this._x = this._x * l + n * t, this._y = this._y * l + i * t, this._z = this._z * l + r * t, this._w = this._w * l + a * t, this._onChangeCallback() } else this._x = this._x * l + n * t, this._y = this._y * l + i * t, this._z = this._z * l + r * t, this._w = this._w * l + a * t, this.normalize(); return this } slerpQuaternions(e, t, n) { return this.copy(e).slerp(t, n) } random() { const e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), i = Math.sqrt(1 - n), r = Math.sqrt(n); return this.set(i * Math.sin(e), i * Math.cos(e), r * Math.sin(t), r * Math.cos(t)) } equals(e) { return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w } fromArray(e, t = 0) { return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this } toArray(e = [], t = 0) { return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e } fromBufferAttribute(e, t) { return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this } toJSON() { return this.toArray() } _onChange(e) { return this._onChangeCallback = e, this } _onChangeCallback() { } *[Symbol.iterator]() { yield this._x, yield this._y, yield this._z, yield this._w } } class L { constructor(e = 0, t = 0, n = 0) { L.prototype.isVector3 = !0, this.x = e, this.y = t, this.z = n } set(e, t, n) { return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this } setScalar(e) { return this.x = e, this.y = e, this.z = e, this } setX(e) { return this.x = e, this } setY(e) { return this.y = e, this } setZ(e) { return this.z = e, this } setComponent(e, t) { switch (e) { case 0: this.x = t; break; case 1: this.y = t; break; case 2: this.z = t; break; default: throw new Error("index is out of range: " + e) }return this } getComponent(e) { switch (e) { case 0: return this.x; case 1: return this.y; case 2: return this.z; default: throw new Error("index is out of range: " + e) } } clone() { return new this.constructor(this.x, this.y, this.z) } copy(e) { return this.x = e.x, this.y = e.y, this.z = e.z, this } add(e) { return this.x += e.x, this.y += e.y, this.z += e.z, this } addScalar(e) { return this.x += e, this.y += e, this.z += e, this } addVectors(e, t) { return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this } addScaledVector(e, t) { return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this } sub(e) { return this.x -= e.x, this.y -= e.y, this.z -= e.z, this } subScalar(e) { return this.x -= e, this.y -= e, this.z -= e, this } subVectors(e, t) { return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this } multiply(e) { return this.x *= e.x, this.y *= e.y, this.z *= e.z, this } multiplyScalar(e) { return this.x *= e, this.y *= e, this.z *= e, this } multiplyVectors(e, t) { return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this } applyEuler(e) { return this.applyQuaternion(fl.setFromEuler(e)) } applyAxisAngle(e, t) { return this.applyQuaternion(fl.setFromAxisAngle(e, t)) } applyMatrix3(e) { const t = this.x, n = this.y, i = this.z, r = e.elements; return this.x = r[0] * t + r[3] * n + r[6] * i, this.y = r[1] * t + r[4] * n + r[7] * i, this.z = r[2] * t + r[5] * n + r[8] * i, this } applyNormalMatrix(e) { return this.applyMatrix3(e).normalize() } applyMatrix4(e) { const t = this.x, n = this.y, i = this.z, r = e.elements, a = 1 / (r[3] * t + r[7] * n + r[11] * i + r[15]); return this.x = (r[0] * t + r[4] * n + r[8] * i + r[12]) * a, this.y = (r[1] * t + r[5] * n + r[9] * i + r[13]) * a, this.z = (r[2] * t + r[6] * n + r[10] * i + r[14]) * a, this } applyQuaternion(e) { const t = this.x, n = this.y, i = this.z, r = e.x, a = e.y, o = e.z, l = e.w, c = 2 * (a * i - o * n), h = 2 * (o * t - r * i), d = 2 * (r * n - a * t); return this.x = t + l * c + a * d - o * h, this.y = n + l * h + o * c - r * d, this.z = i + l * d + r * h - a * c, this } project(e) { return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix) } unproject(e) { return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld) } transformDirection(e) { const t = this.x, n = this.y, i = this.z, r = e.elements; return this.x = r[0] * t + r[4] * n + r[8] * i, this.y = r[1] * t + r[5] * n + r[9] * i, this.z = r[2] * t + r[6] * n + r[10] * i, this.normalize() } divide(e) { return this.x /= e.x, this.y /= e.y, this.z /= e.z, this } divideScalar(e) { return this.multiplyScalar(1 / e) } min(e) { return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this } max(e) { return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this } clamp(e, t) { return this.x = He(this.x, e.x, t.x), this.y = He(this.y, e.y, t.y), this.z = He(this.z, e.z, t.z), this } clampScalar(e, t) { return this.x = He(this.x, e, t), this.y = He(this.y, e, t), this.z = He(this.z, e, t), this } clampLength(e, t) { const n = this.length(); return this.divideScalar(n || 1).multiplyScalar(He(n, e, t)) } floor() { return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this } ceil() { return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this } round() { return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this } roundToZero() { return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this } negate() { return this.x = -this.x, this.y = -this.y, this.z = -this.z, this } dot(e) { return this.x * e.x + this.y * e.y + this.z * e.z } lengthSq() { return this.x * this.x + this.y * this.y + this.z * this.z } length() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z) } manhattanLength() { return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) } normalize() { return this.divideScalar(this.length() || 1) } setLength(e) { return this.normalize().multiplyScalar(e) } lerp(e, t) { return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this } lerpVectors(e, t, n) { return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this } cross(e) { return this.crossVectors(this, e) } crossVectors(e, t) { const n = e.x, i = e.y, r = e.z, a = t.x, o = t.y, l = t.z; return this.x = i * l - r * o, this.y = r * a - n * l, this.z = n * o - i * a, this } projectOnVector(e) { const t = e.lengthSq(); if (t === 0) return this.set(0, 0, 0); const n = e.dot(this) / t; return this.copy(e).multiplyScalar(n) } projectOnPlane(e) { return Ur.copy(this).projectOnVector(e), this.sub(Ur) } reflect(e) { return this.sub(Ur.copy(e).multiplyScalar(2 * this.dot(e))) } angleTo(e) { const t = Math.sqrt(this.lengthSq() * e.lengthSq()); if (t === 0) return Math.PI / 2; const n = this.dot(e) / t; return Math.acos(He(n, -1, 1)) } distanceTo(e) { return Math.sqrt(this.distanceToSquared(e)) } distanceToSquared(e) { const t = this.x - e.x, n = this.y - e.y, i = this.z - e.z; return t * t + n * n + i * i } manhattanDistanceTo(e) { return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z) } setFromSpherical(e) { return this.setFromSphericalCoords(e.radius, e.phi, e.theta) } setFromSphericalCoords(e, t, n) { const i = Math.sin(t) * e; return this.x = i * Math.sin(n), this.y = Math.cos(t) * e, this.z = i * Math.cos(n), this } setFromCylindrical(e) { return this.setFromCylindricalCoords(e.radius, e.theta, e.y) } setFromCylindricalCoords(e, t, n) { return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this } setFromMatrixPosition(e) { const t = e.elements; return this.x = t[12], this.y = t[13], this.z = t[14], this } setFromMatrixScale(e) { const t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), i = this.setFromMatrixColumn(e, 2).length(); return this.x = t, this.y = n, this.z = i, this } setFromMatrixColumn(e, t) { return this.fromArray(e.elements, t * 4) } setFromMatrix3Column(e, t) { return this.fromArray(e.elements, t * 3) } setFromEuler(e) { return this.x = e._x, this.y = e._y, this.z = e._z, this } setFromColor(e) { return this.x = e.r, this.y = e.g, this.z = e.b, this } equals(e) { return e.x === this.x && e.y === this.y && e.z === this.z } fromArray(e, t = 0) { return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this } toArray(e = [], t = 0) { return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e } fromBufferAttribute(e, t) { return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this } random() { return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this } randomDirection() { const e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, n = Math.sqrt(1 - t * t); return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this } *[Symbol.iterator]() { yield this.x, yield this.y, yield this.z } } const Ur = new L, fl = new an; class De { constructor(e, t, n, i, r, a, o, l, c) { De.prototype.isMatrix3 = !0, this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], e !== void 0 && this.set(e, t, n, i, r, a, o, l, c) } set(e, t, n, i, r, a, o, l, c) { const h = this.elements; return h[0] = e, h[1] = i, h[2] = o, h[3] = t, h[4] = r, h[5] = l, h[6] = n, h[7] = a, h[8] = c, this } identity() { return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this } copy(e) { const t = this.elements, n = e.elements; return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this } extractBasis(e, t, n) { return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this } setFromMatrix4(e) { const t = e.elements; return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this } multiply(e) { return this.multiplyMatrices(this, e) } premultiply(e) { return this.multiplyMatrices(e, this) } multiplyMatrices(e, t) { const n = e.elements, i = t.elements, r = this.elements, a = n[0], o = n[3], l = n[6], c = n[1], h = n[4], d = n[7], u = n[2], f = n[5], g = n[8], v = i[0], m = i[3], p = i[6], M = i[1], E = i[4], y = i[7], w = i[2], A = i[5], C = i[8]; return r[0] = a * v + o * M + l * w, r[3] = a * m + o * E + l * A, r[6] = a * p + o * y + l * C, r[1] = c * v + h * M + d * w, r[4] = c * m + h * E + d * A, r[7] = c * p + h * y + d * C, r[2] = u * v + f * M + g * w, r[5] = u * m + f * E + g * A, r[8] = u * p + f * y + g * C, this } multiplyScalar(e) { const t = this.elements; return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this } determinant() { const e = this.elements, t = e[0], n = e[1], i = e[2], r = e[3], a = e[4], o = e[5], l = e[6], c = e[7], h = e[8]; return t * a * h - t * o * c - n * r * h + n * o * l + i * r * c - i * a * l } invert() { const e = this.elements, t = e[0], n = e[1], i = e[2], r = e[3], a = e[4], o = e[5], l = e[6], c = e[7], h = e[8], d = h * a - o * c, u = o * l - h * r, f = c * r - a * l, g = t * d + n * u + i * f; if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0); const v = 1 / g; return e[0] = d * v, e[1] = (i * c - h * n) * v, e[2] = (o * n - i * a) * v, e[3] = u * v, e[4] = (h * t - i * l) * v, e[5] = (i * r - o * t) * v, e[6] = f * v, e[7] = (n * l - c * t) * v, e[8] = (a * t - n * r) * v, this } transpose() { let e; const t = this.elements; return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this } getNormalMatrix(e) { return this.setFromMatrix4(e).invert().transpose() } transposeIntoArray(e) { const t = this.elements; return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this } setUvTransform(e, t, n, i, r, a, o) { const l = Math.cos(r), c = Math.sin(r); return this.set(n * l, n * c, -n * (l * a + c * o) + a + e, -i * c, i * l, -i * (-c * a + l * o) + o + t, 0, 0, 1), this } scale(e, t) { return this.premultiply(Fr.makeScale(e, t)), this } rotate(e) { return this.premultiply(Fr.makeRotation(-e)), this } translate(e, t) { return this.premultiply(Fr.makeTranslation(e, t)), this } makeTranslation(e, t) { return e.isVector2 ? this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1) : this.set(1, 0, e, 0, 1, t, 0, 0, 1), this } makeRotation(e) { const t = Math.cos(e), n = Math.sin(e); return this.set(t, -n, 0, n, t, 0, 0, 0, 1), this } makeScale(e, t) { return this.set(e, 0, 0, 0, t, 0, 0, 0, 1), this } equals(e) { const t = this.elements, n = e.elements; for (let i = 0; i < 9; i++)if (t[i] !== n[i]) return !1; return !0 } fromArray(e, t = 0) { for (let n = 0; n < 9; n++)this.elements[n] = e[n + t]; return this } toArray(e = [], t = 0) { const n = this.elements; return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e } clone() { return new this.constructor().fromArray(this.elements) } } const Fr = new De, pl = new De().set(.4123908, .3575843, .1804808, .212639, .7151687, .0721923, .0193308, .1191948, .9505322), ml = new De().set(3.2409699, -1.5373832, -.4986108, -.9692436, 1.8759675, .0415551, .0556301, -.203977, 1.0569715); function Tu() { const s = { enabled: !0, workingColorSpace: Ot, spaces: {}, convert: function (i, r, a) { return this.enabled === !1 || r === a || !r || !a || (this.spaces[r].transfer === je && (i.r = Un(i.r), i.g = Un(i.g), i.b = Un(i.b)), this.spaces[r].primaries !== this.spaces[a].primaries && (i.applyMatrix3(this.spaces[r].toXYZ), i.applyMatrix3(this.spaces[a].fromXYZ)), this.spaces[a].transfer === je && (i.r = Ui(i.r), i.g = Ui(i.g), i.b = Ui(i.b))), i }, workingToColorSpace: function (i, r) { return this.convert(i, this.workingColorSpace, r) }, colorSpaceToWorking: function (i, r) { return this.convert(i, r, this.workingColorSpace) }, getPrimaries: function (i) { return this.spaces[i].primaries }, getTransfer: function (i) { return i === Kn ? _r : this.spaces[i].transfer }, getToneMappingMode: function (i) { return this.spaces[i].outputColorSpaceConfig.toneMappingMode || "standard" }, getLuminanceCoefficients: function (i, r = this.workingColorSpace) { return i.fromArray(this.spaces[r].luminanceCoefficients) }, define: function (i) { Object.assign(this.spaces, i) }, _getMatrix: function (i, r, a) { return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ) }, _getDrawingBufferColorSpace: function (i) { return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace }, _getUnpackColorSpace: function (i = this.workingColorSpace) { return this.spaces[i].workingColorSpaceConfig.unpackColorSpace }, fromWorkingColorSpace: function (i, r) { return vr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), s.workingToColorSpace(i, r) }, toWorkingColorSpace: function (i, r) { return vr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), s.colorSpaceToWorking(i, r) } }, e = [.64, .33, .3, .6, .15, .06], t = [.2126, .7152, .0722], n = [.3127, .329]; return s.define({ [Ot]: { primaries: e, whitePoint: n, transfer: _r, toXYZ: pl, fromXYZ: ml, luminanceCoefficients: t, workingColorSpaceConfig: { unpackColorSpace: wt }, outputColorSpaceConfig: { drawingBufferColorSpace: wt } }, [wt]: { primaries: e, whitePoint: n, transfer: je, toXYZ: pl, fromXYZ: ml, luminanceCoefficients: t, outputColorSpaceConfig: { drawingBufferColorSpace: wt } } }), s } const We = Tu(); function Un(s) { return s < .04045 ? s * .0773993808 : Math.pow(s * .9478672986 + .0521327014, 2.4) } function Ui(s) { return s < .0031308 ? s * 12.92 : 1.055 * Math.pow(s, .41666) - .055 } let _i; class Au { static getDataURL(e, t = "image/png") { if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u") return e.src; let n; if (e instanceof HTMLCanvasElement) n = e; else { _i === void 0 && (_i = ys("canvas")), _i.width = e.width, _i.height = e.height; const i = _i.getContext("2d"); e instanceof ImageData ? i.putImageData(e, 0, 0) : i.drawImage(e, 0, 0, e.width, e.height), n = _i } return n.toDataURL(t) } static sRGBToLinear(e) { if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) { const t = ys("canvas"); t.width = e.width, t.height = e.height; const n = t.getContext("2d"); n.drawImage(e, 0, 0, e.width, e.height); const i = n.getImageData(0, 0, e.width, e.height), r = i.data; for (let a = 0; a < r.length; a++)r[a] = Un(r[a] / 255) * 255; return n.putImageData(i, 0, 0), t } else if (e.data) { const t = e.data.slice(0); for (let n = 0; n < t.length; n++)t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[n] = Math.floor(Un(t[n] / 255) * 255) : t[n] = Un(t[n]); return { data: t, width: e.width, height: e.height } } else return Ee("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e } } let wu = 0; class Lo { constructor(e = null) { this.isSource = !0, Object.defineProperty(this, "id", { value: wu++ }), this.uuid = sn(), this.data = e, this.dataReady = !0, this.version = 0 } getSize(e) { const t = this.data; return typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement ? e.set(t.videoWidth, t.videoHeight, 0) : typeof VideoFrame < "u" && t instanceof VideoFrame ? e.set(t.displayHeight, t.displayWidth, 0) : t !== null ? e.set(t.width, t.height, t.depth || 0) : e.set(0, 0, 0), e } set needsUpdate(e) { e === !0 && this.version++ } toJSON(e) { const t = e === void 0 || typeof e == "string"; if (!t && e.images[this.uuid] !== void 0) return e.images[this.uuid]; const n = { uuid: this.uuid, url: "" }, i = this.data; if (i !== null) { let r; if (Array.isArray(i)) { r = []; for (let a = 0, o = i.length; a < o; a++)i[a].isDataTexture ? r.push(Or(i[a].image)) : r.push(Or(i[a])) } else r = Or(i); n.url = r } return t || (e.images[this.uuid] = n), n } } function Or(s) { return typeof HTMLImageElement < "u" && s instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && s instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && s instanceof ImageBitmap ? Au.getDataURL(s) : s.data ? { data: Array.from(s.data), width: s.width, height: s.height, type: s.data.constructor.name } : (Ee("Texture: Unable to serialize Texture."), {}) } let Ru = 0; const Br = new L; class Et extends Xi { constructor(e = Et.DEFAULT_IMAGE, t = Et.DEFAULT_MAPPING, n = pn, i = pn, r = xt, a = Ln, o = Yt, l = Ht, c = Et.DEFAULT_ANISOTROPY, h = Kn) { super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Ru++ }), this.uuid = sn(), this.name = "", this.source = new Lo(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = n, this.wrapT = i, this.magFilter = r, this.minFilter = a, this.anisotropy = c, this.format = o, this.internalFormat = null, this.type = l, this.offset = new Ge(0, 0), this.repeat = new Ge(1, 1), this.center = new Ge(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new De, this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(e && e.depth && e.depth > 1), this.pmremVersion = 0 } get width() { return this.source.getSize(Br).x } get height() { return this.source.getSize(Br).y } get depth() { return this.source.getSize(Br).z } get image() { return this.source.data } set image(e = null) { this.source.data = e } updateMatrix() { this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y) } addUpdateRange(e, t) { this.updateRanges.push({ start: e, count: t }) } clearUpdateRanges() { this.updateRanges.length = 0 } clone() { return new this.constructor().copy(this) } copy(e) { return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.renderTarget = e.renderTarget, this.isRenderTargetTexture = e.isRenderTargetTexture, this.isArrayTexture = e.isArrayTexture, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this } setValues(e) { for (const t in e) { const n = e[t]; if (n === void 0) { Ee(`Texture.setValues(): parameter '${t}' has value of undefined.`); continue } const i = this[t]; if (i === void 0) { Ee(`Texture.setValues(): property '${t}' does not exist.`); continue } i && n && i.isVector2 && n.isVector2 || i && n && i.isVector3 && n.isVector3 || i && n && i.isMatrix3 && n.isMatrix3 ? i.copy(n) : this[t] = n } } toJSON(e) { const t = e === void 0 || typeof e == "string"; if (!t && e.textures[this.uuid] !== void 0) return e.textures[this.uuid]; const n = { metadata: { version: 4.7, type: "Texture", generator: "Texture.toJSON" }, uuid: this.uuid, name: this.name, image: this.source.toJSON(e).uuid, mapping: this.mapping, channel: this.channel, repeat: [this.repeat.x, this.repeat.y], offset: [this.offset.x, this.offset.y], center: [this.center.x, this.center.y], rotation: this.rotation, wrap: [this.wrapS, this.wrapT], format: this.format, internalFormat: this.internalFormat, type: this.type, colorSpace: this.colorSpace, minFilter: this.minFilter, magFilter: this.magFilter, anisotropy: this.anisotropy, flipY: this.flipY, generateMipmaps: this.generateMipmaps, premultiplyAlpha: this.premultiplyAlpha, unpackAlignment: this.unpackAlignment }; return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n } dispose() { this.dispatchEvent({ type: "dispose" }) } transformUv(e) { if (this.mapping !== Nc) return e; if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1) switch (this.wrapS) { case Zn: e.x = e.x - Math.floor(e.x); break; case pn: e.x = e.x < 0 ? 0 : 1; break; case gr: Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x); break }if (e.y < 0 || e.y > 1) switch (this.wrapT) { case Zn: e.y = e.y - Math.floor(e.y); break; case pn: e.y = e.y < 0 ? 0 : 1; break; case gr: Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y); break }return this.flipY && (e.y = 1 - e.y), e } set needsUpdate(e) { e === !0 && (this.version++, this.source.needsUpdate = !0) } set needsPMREMUpdate(e) { e === !0 && this.pmremVersion++ } } Et.DEFAULT_IMAGE = null; Et.DEFAULT_MAPPING = Nc; Et.DEFAULT_ANISOTROPY = 1; class ot { constructor(e = 0, t = 0, n = 0, i = 1) { ot.prototype.isVector4 = !0, this.x = e, this.y = t, this.z = n, this.w = i } get width() { return this.z } set width(e) { this.z = e } get height() { return this.w } set height(e) { this.w = e } set(e, t, n, i) { return this.x = e, this.y = t, this.z = n, this.w = i, this } setScalar(e) { return this.x = e, this.y = e, this.z = e, this.w = e, this } setX(e) { return this.x = e, this } setY(e) { return this.y = e, this } setZ(e) { return this.z = e, this } setW(e) { return this.w = e, this } setComponent(e, t) { switch (e) { case 0: this.x = t; break; case 1: this.y = t; break; case 2: this.z = t; break; case 3: this.w = t; break; default: throw new Error("index is out of range: " + e) }return this } getComponent(e) { switch (e) { case 0: return this.x; case 1: return this.y; case 2: return this.z; case 3: return this.w; default: throw new Error("index is out of range: " + e) } } clone() { return new this.constructor(this.x, this.y, this.z, this.w) } copy(e) { return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this } add(e) { return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this } addScalar(e) { return this.x += e, this.y += e, this.z += e, this.w += e, this } addVectors(e, t) { return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this } addScaledVector(e, t) { return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this } sub(e) { return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this } subScalar(e) { return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this } subVectors(e, t) { return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this } multiply(e) { return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this } multiplyScalar(e) { return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this } applyMatrix4(e) { const t = this.x, n = this.y, i = this.z, r = this.w, a = e.elements; return this.x = a[0] * t + a[4] * n + a[8] * i + a[12] * r, this.y = a[1] * t + a[5] * n + a[9] * i + a[13] * r, this.z = a[2] * t + a[6] * n + a[10] * i + a[14] * r, this.w = a[3] * t + a[7] * n + a[11] * i + a[15] * r, this } divide(e) { return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this } divideScalar(e) { return this.multiplyScalar(1 / e) } setAxisAngleFromQuaternion(e) { this.w = 2 * Math.acos(e.w); const t = Math.sqrt(1 - e.w * e.w); return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this } setAxisAngleFromRotationMatrix(e) { let t, n, i, r; const l = e.elements, c = l[0], h = l[4], d = l[8], u = l[1], f = l[5], g = l[9], v = l[2], m = l[6], p = l[10]; if (Math.abs(h - u) < .01 && Math.abs(d - v) < .01 && Math.abs(g - m) < .01) { if (Math.abs(h + u) < .1 && Math.abs(d + v) < .1 && Math.abs(g + m) < .1 && Math.abs(c + f + p - 3) < .1) return this.set(1, 0, 0, 0), this; t = Math.PI; const E = (c + 1) / 2, y = (f + 1) / 2, w = (p + 1) / 2, A = (h + u) / 4, C = (d + v) / 4, x = (g + m) / 4; return E > y && E > w ? E < .01 ? (n = 0, i = .707106781, r = .707106781) : (n = Math.sqrt(E), i = A / n, r = C / n) : y > w ? y < .01 ? (n = .707106781, i = 0, r = .707106781) : (i = Math.sqrt(y), n = A / i, r = x / i) : w < .01 ? (n = .707106781, i = .707106781, r = 0) : (r = Math.sqrt(w), n = C / r, i = x / r), this.set(n, i, r, t), this } let M = Math.sqrt((m - g) * (m - g) + (d - v) * (d - v) + (u - h) * (u - h)); return Math.abs(M) < .001 && (M = 1), this.x = (m - g) / M, this.y = (d - v) / M, this.z = (u - h) / M, this.w = Math.acos((c + f + p - 1) / 2), this } setFromMatrixPosition(e) { const t = e.elements; return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this } min(e) { return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this } max(e) { return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this } clamp(e, t) { return this.x = He(this.x, e.x, t.x), this.y = He(this.y, e.y, t.y), this.z = He(this.z, e.z, t.z), this.w = He(this.w, e.w, t.w), this } clampScalar(e, t) { return this.x = He(this.x, e, t), this.y = He(this.y, e, t), this.z = He(this.z, e, t), this.w = He(this.w, e, t), this } clampLength(e, t) { const n = this.length(); return this.divideScalar(n || 1).multiplyScalar(He(n, e, t)) } floor() { return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this } ceil() { return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this } round() { return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this } roundToZero() { return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this } negate() { return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this } dot(e) { return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w } lengthSq() { return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w } length() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w) } manhattanLength() { return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w) } normalize() { return this.divideScalar(this.length() || 1) } setLength(e) { return this.normalize().multiplyScalar(e) } lerp(e, t) { return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this } lerpVectors(e, t, n) { return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this } equals(e) { return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w } fromArray(e, t = 0) { return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this } toArray(e = [], t = 0) { return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e } fromBufferAttribute(e, t) { return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this } random() { return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this } *[Symbol.iterator]() { yield this.x, yield this.y, yield this.z, yield this.w } } class Cu extends Xi { constructor(e = 1, t = 1, n = {}) { super(), n = Object.assign({ generateMipmaps: !1, internalFormat: null, minFilter: xt, depthBuffer: !0, stencilBuffer: !1, resolveDepthBuffer: !0, resolveStencilBuffer: !0, depthTexture: null, samples: 0, count: 1, depth: 1, multiview: !1 }, n), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = n.depth, this.scissor = new ot(0, 0, e, t), this.scissorTest = !1, this.viewport = new ot(0, 0, e, t), this.textures = []; const i = { width: e, height: t, depth: n.depth }, r = new Et(i), a = n.count; for (let o = 0; o < a; o++)this.textures[o] = r.clone(), this.textures[o].isRenderTargetTexture = !0, this.textures[o].renderTarget = this; this._setTextureOptions(n), this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = n.depthTexture, this.samples = n.samples, this.multiview = n.multiview } _setTextureOptions(e = {}) { const t = { minFilter: xt, generateMipmaps: !1, flipY: !1, internalFormat: null }; e.mapping !== void 0 && (t.mapping = e.mapping), e.wrapS !== void 0 && (t.wrapS = e.wrapS), e.wrapT !== void 0 && (t.wrapT = e.wrapT), e.wrapR !== void 0 && (t.wrapR = e.wrapR), e.magFilter !== void 0 && (t.magFilter = e.magFilter), e.minFilter !== void 0 && (t.minFilter = e.minFilter), e.format !== void 0 && (t.format = e.format), e.type !== void 0 && (t.type = e.type), e.anisotropy !== void 0 && (t.anisotropy = e.anisotropy), e.colorSpace !== void 0 && (t.colorSpace = e.colorSpace), e.flipY !== void 0 && (t.flipY = e.flipY), e.generateMipmaps !== void 0 && (t.generateMipmaps = e.generateMipmaps), e.internalFormat !== void 0 && (t.internalFormat = e.internalFormat); for (let n = 0; n < this.textures.length; n++)this.textures[n].setValues(t) } get texture() { return this.textures[0] } set texture(e) { this.textures[0] = e } set depthTexture(e) { this._depthTexture !== null && (this._depthTexture.renderTarget = null), e !== null && (e.renderTarget = this), this._depthTexture = e } get depthTexture() { return this._depthTexture } setSize(e, t, n = 1) { if (this.width !== e || this.height !== t || this.depth !== n) { this.width = e, this.height = t, this.depth = n; for (let i = 0, r = this.textures.length; i < r; i++)this.textures[i].image.width = e, this.textures[i].image.height = t, this.textures[i].image.depth = n, this.textures[i].isData3DTexture !== !0 && (this.textures[i].isArrayTexture = this.textures[i].image.depth > 1); this.dispose() } this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t) } clone() { return new this.constructor().copy(this) } copy(e) { this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0; for (let t = 0, n = e.textures.length; t < n; t++) { this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this; const i = Object.assign({}, e.textures[t].image); this.textures[t].source = new Lo(i) } return this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this } dispose() { this.dispatchEvent({ type: "dispose" }) } } class _n extends Cu { constructor(e = 1, t = 1, n = {}) { super(e, t, n), this.isWebGLRenderTarget = !0 } } class Wc extends Et { constructor(e = null, t = 1, n = 1, i = 1) { super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: t, height: n, depth: i }, this.magFilter = _t, this.minFilter = _t, this.wrapR = pn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = new Set } addLayerUpdate(e) { this.layerUpdates.add(e) } clearLayerUpdates() { this.layerUpdates.clear() } } class Pu extends Et { constructor(e = null, t = 1, n = 1, i = 1) { super(null), this.isData3DTexture = !0, this.image = { data: e, width: t, height: n, depth: i }, this.magFilter = _t, this.minFilter = _t, this.wrapR = pn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1 } } class Ue { constructor(e, t, n, i, r, a, o, l, c, h, d, u, f, g, v, m) { Ue.prototype.isMatrix4 = !0, this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], e !== void 0 && this.set(e, t, n, i, r, a, o, l, c, h, d, u, f, g, v, m) } set(e, t, n, i, r, a, o, l, c, h, d, u, f, g, v, m) { const p = this.elements; return p[0] = e, p[4] = t, p[8] = n, p[12] = i, p[1] = r, p[5] = a, p[9] = o, p[13] = l, p[2] = c, p[6] = h, p[10] = d, p[14] = u, p[3] = f, p[7] = g, p[11] = v, p[15] = m, this } identity() { return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this } clone() { return new Ue().fromArray(this.elements) } copy(e) { const t = this.elements, n = e.elements; return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this } copyPosition(e) { const t = this.elements, n = e.elements; return t[12] = n[12], t[13] = n[13], t[14] = n[14], this } setFromMatrix3(e) { const t = e.elements; return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1), this } extractBasis(e, t, n) { return this.determinant() === 0 ? (e.set(1, 0, 0), t.set(0, 1, 0), n.set(0, 0, 1), this) : (e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this) } makeBasis(e, t, n) { return this.set(e.x, t.x, n.x, 0, e.y, t.y, n.y, 0, e.z, t.z, n.z, 0, 0, 0, 0, 1), this } extractRotation(e) { if (e.determinant() === 0) return this.identity(); const t = this.elements, n = e.elements, i = 1 / xi.setFromMatrixColumn(e, 0).length(), r = 1 / xi.setFromMatrixColumn(e, 1).length(), a = 1 / xi.setFromMatrixColumn(e, 2).length(); return t[0] = n[0] * i, t[1] = n[1] * i, t[2] = n[2] * i, t[3] = 0, t[4] = n[4] * r, t[5] = n[5] * r, t[6] = n[6] * r, t[7] = 0, t[8] = n[8] * a, t[9] = n[9] * a, t[10] = n[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this } makeRotationFromEuler(e) { const t = this.elements, n = e.x, i = e.y, r = e.z, a = Math.cos(n), o = Math.sin(n), l = Math.cos(i), c = Math.sin(i), h = Math.cos(r), d = Math.sin(r); if (e.order === "XYZ") { const u = a * h, f = a * d, g = o * h, v = o * d; t[0] = l * h, t[4] = -l * d, t[8] = c, t[1] = f + g * c, t[5] = u - v * c, t[9] = -o * l, t[2] = v - u * c, t[6] = g + f * c, t[10] = a * l } else if (e.order === "YXZ") { const u = l * h, f = l * d, g = c * h, v = c * d; t[0] = u + v * o, t[4] = g * o - f, t[8] = a * c, t[1] = a * d, t[5] = a * h, t[9] = -o, t[2] = f * o - g, t[6] = v + u * o, t[10] = a * l } else if (e.order === "ZXY") { const u = l * h, f = l * d, g = c * h, v = c * d; t[0] = u - v * o, t[4] = -a * d, t[8] = g + f * o, t[1] = f + g * o, t[5] = a * h, t[9] = v - u * o, t[2] = -a * c, t[6] = o, t[10] = a * l } else if (e.order === "ZYX") { const u = a * h, f = a * d, g = o * h, v = o * d; t[0] = l * h, t[4] = g * c - f, t[8] = u * c + v, t[1] = l * d, t[5] = v * c + u, t[9] = f * c - g, t[2] = -c, t[6] = o * l, t[10] = a * l } else if (e.order === "YZX") { const u = a * l, f = a * c, g = o * l, v = o * c; t[0] = l * h, t[4] = v - u * d, t[8] = g * d + f, t[1] = d, t[5] = a * h, t[9] = -o * h, t[2] = -c * h, t[6] = f * d + g, t[10] = u - v * d } else if (e.order === "XZY") { const u = a * l, f = a * c, g = o * l, v = o * c; t[0] = l * h, t[4] = -d, t[8] = c * h, t[1] = u * d + v, t[5] = a * h, t[9] = f * d - g, t[2] = g * d - f, t[6] = o * h, t[10] = v * d + u } return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this } makeRotationFromQuaternion(e) { return this.compose(Lu, e, Iu) } lookAt(e, t, n) { const i = this.elements; return kt.subVectors(e, t), kt.lengthSq() === 0 && (kt.z = 1), kt.normalize(), Hn.crossVectors(n, kt), Hn.lengthSq() === 0 && (Math.abs(n.z) === 1 ? kt.x += 1e-4 : kt.z += 1e-4, kt.normalize(), Hn.crossVectors(n, kt)), Hn.normalize(), Ds.crossVectors(kt, Hn), i[0] = Hn.x, i[4] = Ds.x, i[8] = kt.x, i[1] = Hn.y, i[5] = Ds.y, i[9] = kt.y, i[2] = Hn.z, i[6] = Ds.z, i[10] = kt.z, this } multiply(e) { return this.multiplyMatrices(this, e) } premultiply(e) { return this.multiplyMatrices(e, this) } multiplyMatrices(e, t) { const n = e.elements, i = t.elements, r = this.elements, a = n[0], o = n[4], l = n[8], c = n[12], h = n[1], d = n[5], u = n[9], f = n[13], g = n[2], v = n[6], m = n[10], p = n[14], M = n[3], E = n[7], y = n[11], w = n[15], A = i[0], C = i[4], x = i[8], b = i[12], W = i[1], R = i[5], U = i[9], O = i[13], G = i[2], z = i[6], V = i[10], F = i[14], Q = i[3], j = i[7], ce = i[11], pe = i[15]; return r[0] = a * A + o * W + l * G + c * Q, r[4] = a * C + o * R + l * z + c * j, r[8] = a * x + o * U + l * V + c * ce, r[12] = a * b + o * O + l * F + c * pe, r[1] = h * A + d * W + u * G + f * Q, r[5] = h * C + d * R + u * z + f * j, r[9] = h * x + d * U + u * V + f * ce, r[13] = h * b + d * O + u * F + f * pe, r[2] = g * A + v * W + m * G + p * Q, r[6] = g * C + v * R + m * z + p * j, r[10] = g * x + v * U + m * V + p * ce, r[14] = g * b + v * O + m * F + p * pe, r[3] = M * A + E * W + y * G + w * Q, r[7] = M * C + E * R + y * z + w * j, r[11] = M * x + E * U + y * V + w * ce, r[15] = M * b + E * O + y * F + w * pe, this } multiplyScalar(e) { const t = this.elements; return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this } determinant() { const e = this.elements, t = e[0], n = e[4], i = e[8], r = e[12], a = e[1], o = e[5], l = e[9], c = e[13], h = e[2], d = e[6], u = e[10], f = e[14], g = e[3], v = e[7], m = e[11], p = e[15], M = l * f - c * u, E = o * f - c * d, y = o * u - l * d, w = a * f - c * h, A = a * u - l * h, C = a * d - o * h; return t * (v * M - m * E + p * y) - n * (g * M - m * w + p * A) + i * (g * E - v * w + p * C) - r * (g * y - v * A + m * C) } transpose() { const e = this.elements; let t; return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this } setPosition(e, t, n) { const i = this.elements; return e.isVector3 ? (i[12] = e.x, i[13] = e.y, i[14] = e.z) : (i[12] = e, i[13] = t, i[14] = n), this } invert() { const e = this.elements, t = e[0], n = e[1], i = e[2], r = e[3], a = e[4], o = e[5], l = e[6], c = e[7], h = e[8], d = e[9], u = e[10], f = e[11], g = e[12], v = e[13], m = e[14], p = e[15], M = t * o - n * a, E = t * l - i * a, y = t * c - r * a, w = n * l - i * o, A = n * c - r * o, C = i * c - r * l, x = h * v - d * g, b = h * m - u * g, W = h * p - f * g, R = d * m - u * v, U = d * p - f * v, O = u * p - f * m, G = M * O - E * U + y * R + w * W - A * b + C * x; if (G === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0); const z = 1 / G; return e[0] = (o * O - l * U + c * R) * z, e[1] = (i * U - n * O - r * R) * z, e[2] = (v * C - m * A + p * w) * z, e[3] = (u * A - d * C - f * w) * z, e[4] = (l * W - a * O - c * b) * z, e[5] = (t * O - i * W + r * b) * z, e[6] = (m * y - g * C - p * E) * z, e[7] = (h * C - u * y + f * E) * z, e[8] = (a * U - o * W + c * x) * z, e[9] = (n * W - t * U - r * x) * z, e[10] = (g * A - v * y + p * M) * z, e[11] = (d * y - h * A - f * M) * z, e[12] = (o * b - a * R - l * x) * z, e[13] = (t * R - n * b + i * x) * z, e[14] = (v * E - g * w - m * M) * z, e[15] = (h * w - d * E + u * M) * z, this } scale(e) { const t = this.elements, n = e.x, i = e.y, r = e.z; return t[0] *= n, t[4] *= i, t[8] *= r, t[1] *= n, t[5] *= i, t[9] *= r, t[2] *= n, t[6] *= i, t[10] *= r, t[3] *= n, t[7] *= i, t[11] *= r, this } getMaxScaleOnAxis() { const e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], i = e[8] * e[8] + e[9] * e[9] + e[10] * e[10]; return Math.sqrt(Math.max(t, n, i)) } makeTranslation(e, t, n) { return e.isVector3 ? this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1) : this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, n, 0, 0, 0, 1), this } makeRotationX(e) { const t = Math.cos(e), n = Math.sin(e); return this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1), this } makeRotationY(e) { const t = Math.cos(e), n = Math.sin(e); return this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1), this } makeRotationZ(e) { const t = Math.cos(e), n = Math.sin(e); return this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this } makeRotationAxis(e, t) { const n = Math.cos(t), i = Math.sin(t), r = 1 - n, a = e.x, o = e.y, l = e.z, c = r * a, h = r * o; return this.set(c * a + n, c * o - i * l, c * l + i * o, 0, c * o + i * l, h * o + n, h * l - i * a, 0, c * l - i * o, h * l + i * a, r * l * l + n, 0, 0, 0, 0, 1), this } makeScale(e, t, n) { return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this } makeShear(e, t, n, i, r, a) { return this.set(1, n, r, 0, e, 1, a, 0, t, i, 1, 0, 0, 0, 0, 1), this } compose(e, t, n) { const i = this.elements, r = t._x, a = t._y, o = t._z, l = t._w, c = r + r, h = a + a, d = o + o, u = r * c, f = r * h, g = r * d, v = a * h, m = a * d, p = o * d, M = l * c, E = l * h, y = l * d, w = n.x, A = n.y, C = n.z; return i[0] = (1 - (v + p)) * w, i[1] = (f + y) * w, i[2] = (g - E) * w, i[3] = 0, i[4] = (f - y) * A, i[5] = (1 - (u + p)) * A, i[6] = (m + M) * A, i[7] = 0, i[8] = (g + E) * C, i[9] = (m - M) * C, i[10] = (1 - (u + v)) * C, i[11] = 0, i[12] = e.x, i[13] = e.y, i[14] = e.z, i[15] = 1, this } decompose(e, t, n) { const i = this.elements; e.x = i[12], e.y = i[13], e.z = i[14]; const r = this.determinant(); if (r === 0) return n.set(1, 1, 1), t.identity(), this; let a = xi.set(i[0], i[1], i[2]).length(); const o = xi.set(i[4], i[5], i[6]).length(), l = xi.set(i[8], i[9], i[10]).length(); r < 0 && (a = -a), jt.copy(this); const c = 1 / a, h = 1 / o, d = 1 / l; return jt.elements[0] *= c, jt.elements[1] *= c, jt.elements[2] *= c, jt.elements[4] *= h, jt.elements[5] *= h, jt.elements[6] *= h, jt.elements[8] *= d, jt.elements[9] *= d, jt.elements[10] *= d, t.setFromRotationMatrix(jt), n.x = a, n.y = o, n.z = l, this } makePerspective(e, t, n, i, r, a, o = mn, l = !1) { const c = this.elements, h = 2 * r / (t - e), d = 2 * r / (n - i), u = (t + e) / (t - e), f = (n + i) / (n - i); let g, v; if (l) g = r / (a - r), v = a * r / (a - r); else if (o === mn) g = -(a + r) / (a - r), v = -2 * a * r / (a - r); else if (o === Ss) g = -a / (a - r), v = -a * r / (a - r); else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o); return c[0] = h, c[4] = 0, c[8] = u, c[12] = 0, c[1] = 0, c[5] = d, c[9] = f, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = g, c[14] = v, c[3] = 0, c[7] = 0, c[11] = -1, c[15] = 0, this } makeOrthographic(e, t, n, i, r, a, o = mn, l = !1) { const c = this.elements, h = 2 / (t - e), d = 2 / (n - i), u = -(t + e) / (t - e), f = -(n + i) / (n - i); let g, v; if (l) g = 1 / (a - r), v = a / (a - r); else if (o === mn) g = -2 / (a - r), v = -(a + r) / (a - r); else if (o === Ss) g = -1 / (a - r), v = -r / (a - r); else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o); return c[0] = h, c[4] = 0, c[8] = 0, c[12] = u, c[1] = 0, c[5] = d, c[9] = 0, c[13] = f, c[2] = 0, c[6] = 0, c[10] = g, c[14] = v, c[3] = 0, c[7] = 0, c[11] = 0, c[15] = 1, this } equals(e) { const t = this.elements, n = e.elements; for (let i = 0; i < 16; i++)if (t[i] !== n[i]) return !1; return !0 } fromArray(e, t = 0) { for (let n = 0; n < 16; n++)this.elements[n] = e[n + t]; return this } toArray(e = [], t = 0) { const n = this.elements; return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e } } const xi = new L, jt = new Ue, Lu = new L(0, 0, 0), Iu = new L(1, 1, 1), Hn = new L, Ds = new L, kt = new L, gl = new Ue, _l = new an; class $t { constructor(e = 0, t = 0, n = 0, i = $t.DEFAULT_ORDER) { this.isEuler = !0, this._x = e, this._y = t, this._z = n, this._order = i } get x() { return this._x } set x(e) { this._x = e, this._onChangeCallback() } get y() { return this._y } set y(e) { this._y = e, this._onChangeCallback() } get z() { return this._z } set z(e) { this._z = e, this._onChangeCallback() } get order() { return this._order } set order(e) { this._order = e, this._onChangeCallback() } set(e, t, n, i = this._order) { return this._x = e, this._y = t, this._z = n, this._order = i, this._onChangeCallback(), this } clone() { return new this.constructor(this._x, this._y, this._z, this._order) } copy(e) { return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this } setFromRotationMatrix(e, t = this._order, n = !0) { const i = e.elements, r = i[0], a = i[4], o = i[8], l = i[1], c = i[5], h = i[9], d = i[2], u = i[6], f = i[10]; switch (t) { case "XYZ": this._y = Math.asin(He(o, -1, 1)), Math.abs(o) < .9999999 ? (this._x = Math.atan2(-h, f), this._z = Math.atan2(-a, r)) : (this._x = Math.atan2(u, c), this._z = 0); break; case "YXZ": this._x = Math.asin(-He(h, -1, 1)), Math.abs(h) < .9999999 ? (this._y = Math.atan2(o, f), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-d, r), this._z = 0); break; case "ZXY": this._x = Math.asin(He(u, -1, 1)), Math.abs(u) < .9999999 ? (this._y = Math.atan2(-d, f), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(l, r)); break; case "ZYX": this._y = Math.asin(-He(d, -1, 1)), Math.abs(d) < .9999999 ? (this._x = Math.atan2(u, f), this._z = Math.atan2(l, r)) : (this._x = 0, this._z = Math.atan2(-a, c)); break; case "YZX": this._z = Math.asin(He(l, -1, 1)), Math.abs(l) < .9999999 ? (this._x = Math.atan2(-h, c), this._y = Math.atan2(-d, r)) : (this._x = 0, this._y = Math.atan2(o, f)); break; case "XZY": this._z = Math.asin(-He(a, -1, 1)), Math.abs(a) < .9999999 ? (this._x = Math.atan2(u, c), this._y = Math.atan2(o, r)) : (this._x = Math.atan2(-h, f), this._y = 0); break; default: Ee("Euler: .setFromRotationMatrix() encountered an unknown order: " + t) }return this._order = t, n === !0 && this._onChangeCallback(), this } setFromQuaternion(e, t, n) { return gl.makeRotationFromQuaternion(e), this.setFromRotationMatrix(gl, t, n) } setFromVector3(e, t = this._order) { return this.set(e.x, e.y, e.z, t) } reorder(e) { return _l.setFromEuler(this), this.setFromQuaternion(_l, e) } equals(e) { return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order } fromArray(e) { return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this } toArray(e = [], t = 0) { return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e } _onChange(e) { return this._onChangeCallback = e, this } _onChangeCallback() { } *[Symbol.iterator]() { yield this._x, yield this._y, yield this._z, yield this._order } } $t.DEFAULT_ORDER = "XYZ"; class Xc { constructor() { this.mask = 1 } set(e) { this.mask = (1 << e | 0) >>> 0 } enable(e) { this.mask |= 1 << e | 0 } enableAll() { this.mask = -1 } toggle(e) { this.mask ^= 1 << e | 0 } disable(e) { this.mask &= ~(1 << e | 0) } disableAll() { this.mask = 0 } test(e) { return (this.mask & e.mask) !== 0 } isEnabled(e) { return (this.mask & (1 << e | 0)) !== 0 } } let Du = 0; const xl = new L, vi = new an, En = new Ue, Ns = new L, Zi = new L, Nu = new L, Uu = new an, vl = new L(1, 0, 0), Ml = new L(0, 1, 0), Sl = new L(0, 0, 1), yl = { type: "added" }, Fu = { type: "removed" }, Mi = { type: "childadded", child: null }, zr = { type: "childremoved", child: null }; class ct extends Xi { constructor() { super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Du++ }), this.uuid = sn(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = ct.DEFAULT_UP.clone(); const e = new L, t = new $t, n = new an, i = new L(1, 1, 1); function r() { n.setFromEuler(t, !1) } function a() { t.setFromQuaternion(n, void 0, !1) } t._onChange(r), n._onChange(a), Object.defineProperties(this, { position: { configurable: !0, enumerable: !0, value: e }, rotation: { configurable: !0, enumerable: !0, value: t }, quaternion: { configurable: !0, enumerable: !0, value: n }, scale: { configurable: !0, enumerable: !0, value: i }, modelViewMatrix: { value: new Ue }, normalMatrix: { value: new De } }), this.matrix = new Ue, this.matrixWorld = new Ue, this.matrixAutoUpdate = ct.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Xc, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null } onBeforeShadow() { } onAfterShadow() { } onBeforeRender() { } onAfterRender() { } applyMatrix4(e) { this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale) } applyQuaternion(e) { return this.quaternion.premultiply(e), this } setRotationFromAxisAngle(e, t) { this.quaternion.setFromAxisAngle(e, t) } setRotationFromEuler(e) { this.quaternion.setFromEuler(e, !0) } setRotationFromMatrix(e) { this.quaternion.setFromRotationMatrix(e) } setRotationFromQuaternion(e) { this.quaternion.copy(e) } rotateOnAxis(e, t) { return vi.setFromAxisAngle(e, t), this.quaternion.multiply(vi), this } rotateOnWorldAxis(e, t) { return vi.setFromAxisAngle(e, t), this.quaternion.premultiply(vi), this } rotateX(e) { return this.rotateOnAxis(vl, e) } rotateY(e) { return this.rotateOnAxis(Ml, e) } rotateZ(e) { return this.rotateOnAxis(Sl, e) } translateOnAxis(e, t) { return xl.copy(e).applyQuaternion(this.quaternion), this.position.add(xl.multiplyScalar(t)), this } translateX(e) { return this.translateOnAxis(vl, e) } translateY(e) { return this.translateOnAxis(Ml, e) } translateZ(e) { return this.translateOnAxis(Sl, e) } localToWorld(e) { return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld) } worldToLocal(e) { return this.updateWorldMatrix(!0, !1), e.applyMatrix4(En.copy(this.matrixWorld).invert()) } lookAt(e, t, n) { e.isVector3 ? Ns.copy(e) : Ns.set(e, t, n); const i = this.parent; this.updateWorldMatrix(!0, !1), Zi.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? En.lookAt(Zi, Ns, this.up) : En.lookAt(Ns, Zi, this.up), this.quaternion.setFromRotationMatrix(En), i && (En.extractRotation(i.matrixWorld), vi.setFromRotationMatrix(En), this.quaternion.premultiply(vi.invert())) } add(e) { if (arguments.length > 1) { for (let t = 0; t < arguments.length; t++)this.add(arguments[t]); return this } return e === this ? (Ce("Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(yl), Mi.child = e, this.dispatchEvent(Mi), Mi.child = null) : Ce("Object3D.add: object not an instance of THREE.Object3D.", e), this) } remove(e) { if (arguments.length > 1) { for (let n = 0; n < arguments.length; n++)this.remove(arguments[n]); return this } const t = this.children.indexOf(e); return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(Fu), zr.child = e, this.dispatchEvent(zr), zr.child = null), this } removeFromParent() { const e = this.parent; return e !== null && e.remove(this), this } clear() { return this.remove(...this.children) } attach(e) { return this.updateWorldMatrix(!0, !1), En.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), En.multiply(e.parent.matrixWorld)), e.applyMatrix4(En), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(yl), Mi.child = e, this.dispatchEvent(Mi), Mi.child = null, this } getObjectById(e) { return this.getObjectByProperty("id", e) } getObjectByName(e) { return this.getObjectByProperty("name", e) } getObjectByProperty(e, t) { if (this[e] === t) return this; for (let n = 0, i = this.children.length; n < i; n++) { const a = this.children[n].getObjectByProperty(e, t); if (a !== void 0) return a } } getObjectsByProperty(e, t, n = []) { this[e] === t && n.push(this); const i = this.children; for (let r = 0, a = i.length; r < a; r++)i[r].getObjectsByProperty(e, t, n); return n } getWorldPosition(e) { return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld) } getWorldQuaternion(e) { return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Zi, e, Nu), e } getWorldScale(e) { return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Zi, Uu, e), e } getWorldDirection(e) { this.updateWorldMatrix(!0, !1); const t = this.matrixWorld.elements; return e.set(t[8], t[9], t[10]).normalize() } raycast() { } traverse(e) { e(this); const t = this.children; for (let n = 0, i = t.length; n < i; n++)t[n].traverse(e) } traverseVisible(e) { if (this.visible === !1) return; e(this); const t = this.children; for (let n = 0, i = t.length; n < i; n++)t[n].traverseVisible(e) } traverseAncestors(e) { const t = this.parent; t !== null && (e(t), t.traverseAncestors(e)) } updateMatrix() { this.matrix.compose(this.position, this.quaternion, this.scale); const e = this.pivot; if (e !== null) { const t = e.x, n = e.y, i = e.z, r = this.matrix.elements; r[12] += t - r[0] * t - r[4] * n - r[8] * i, r[13] += n - r[1] * t - r[5] * n - r[9] * i, r[14] += i - r[2] * t - r[6] * n - r[10] * i } this.matrixWorldNeedsUpdate = !0 } updateMatrixWorld(e) { this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0); const t = this.children; for (let n = 0, i = t.length; n < i; n++)t[n].updateMatrixWorld(e) } updateWorldMatrix(e, t) { const n = this.parent; if (e === !0 && n !== null && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), t === !0) { const i = this.children; for (let r = 0, a = i.length; r < a; r++)i[r].updateWorldMatrix(!1, !0) } } toJSON(e) { const t = e === void 0 || typeof e == "string", n = {}; t && (e = { geometries: {}, materials: {}, textures: {}, images: {}, shapes: {}, skeletons: {}, animations: {}, nodes: {} }, n.metadata = { version: 4.7, type: "Object", generator: "Object3D.toJSON" }); const i = {}; i.uuid = this.uuid, i.type = this.type, this.name !== "" && (i.name = this.name), this.castShadow === !0 && (i.castShadow = !0), this.receiveShadow === !0 && (i.receiveShadow = !0), this.visible === !1 && (i.visible = !1), this.frustumCulled === !1 && (i.frustumCulled = !1), this.renderOrder !== 0 && (i.renderOrder = this.renderOrder), this.static !== !1 && (i.static = this.static), Object.keys(this.userData).length > 0 && (i.userData = this.userData), i.layers = this.layers.mask, i.matrix = this.matrix.toArray(), i.up = this.up.toArray(), this.pivot !== null && (i.pivot = this.pivot.toArray()), this.matrixAutoUpdate === !1 && (i.matrixAutoUpdate = !1), this.morphTargetDictionary !== void 0 && (i.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== void 0 && (i.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (i.type = "InstancedMesh", i.count = this.count, i.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (i.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (i.type = "BatchedMesh", i.perObjectFrustumCulled = this.perObjectFrustumCulled, i.sortObjects = this.sortObjects, i.drawRanges = this._drawRanges, i.reservedRanges = this._reservedRanges, i.geometryInfo = this._geometryInfo.map(o => ({ ...o, boundingBox: o.boundingBox ? o.boundingBox.toJSON() : void 0, boundingSphere: o.boundingSphere ? o.boundingSphere.toJSON() : void 0 })), i.instanceInfo = this._instanceInfo.map(o => ({ ...o })), i.availableInstanceIds = this._availableInstanceIds.slice(), i.availableGeometryIds = this._availableGeometryIds.slice(), i.nextIndexStart = this._nextIndexStart, i.nextVertexStart = this._nextVertexStart, i.geometryCount = this._geometryCount, i.maxInstanceCount = this._maxInstanceCount, i.maxVertexCount = this._maxVertexCount, i.maxIndexCount = this._maxIndexCount, i.geometryInitialized = this._geometryInitialized, i.matricesTexture = this._matricesTexture.toJSON(e), i.indirectTexture = this._indirectTexture.toJSON(e), this._colorsTexture !== null && (i.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (i.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (i.boundingBox = this.boundingBox.toJSON())); function r(o, l) { return o[l.uuid] === void 0 && (o[l.uuid] = l.toJSON(e)), l.uuid } if (this.isScene) this.background && (this.background.isColor ? i.background = this.background.toJSON() : this.background.isTexture && (i.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (i.environment = this.environment.toJSON(e).uuid); else if (this.isMesh || this.isLine || this.isPoints) { i.geometry = r(e.geometries, this.geometry); const o = this.geometry.parameters; if (o !== void 0 && o.shapes !== void 0) { const l = o.shapes; if (Array.isArray(l)) for (let c = 0, h = l.length; c < h; c++) { const d = l[c]; r(e.shapes, d) } else r(e.shapes, l) } } if (this.isSkinnedMesh && (i.bindMode = this.bindMode, i.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (r(e.skeletons, this.skeleton), i.skeleton = this.skeleton.uuid)), this.material !== void 0) if (Array.isArray(this.material)) { const o = []; for (let l = 0, c = this.material.length; l < c; l++)o.push(r(e.materials, this.material[l])); i.material = o } else i.material = r(e.materials, this.material); if (this.children.length > 0) { i.children = []; for (let o = 0; o < this.children.length; o++)i.children.push(this.children[o].toJSON(e).object) } if (this.animations.length > 0) { i.animations = []; for (let o = 0; o < this.animations.length; o++) { const l = this.animations[o]; i.animations.push(r(e.animations, l)) } } if (t) { const o = a(e.geometries), l = a(e.materials), c = a(e.textures), h = a(e.images), d = a(e.shapes), u = a(e.skeletons), f = a(e.animations), g = a(e.nodes); o.length > 0 && (n.geometries = o), l.length > 0 && (n.materials = l), c.length > 0 && (n.textures = c), h.length > 0 && (n.images = h), d.length > 0 && (n.shapes = d), u.length > 0 && (n.skeletons = u), f.length > 0 && (n.animations = f), g.length > 0 && (n.nodes = g) } return n.object = i, n; function a(o) { const l = []; for (const c in o) { const h = o[c]; delete h.metadata, l.push(h) } return l } } clone(e) { return new this.constructor().copy(this, e) } copy(e, t = !0) { if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), e.pivot !== null && (this.pivot = e.pivot.clone()), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.static = e.static, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0) for (let n = 0; n < e.children.length; n++) { const i = e.children[n]; this.add(i.clone()) } return this } } ct.DEFAULT_UP = new L(0, 1, 0); ct.DEFAULT_MATRIX_AUTO_UPDATE = !0; ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0; class qt extends ct { constructor() { super(), this.isGroup = !0, this.type = "Group" } } const Ou = { type: "move" }; class kr { constructor() { this._targetRay = null, this._grip = null, this._hand = null } getHandSpace() { return this._hand === null && (this._hand = new qt, this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand } getTargetRaySpace() { return this._targetRay === null && (this._targetRay = new qt, this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new L, this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new L), this._targetRay } getGripSpace() { return this._grip === null && (this._grip = new qt, this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new L, this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new L), this._grip } dispatchEvent(e) { return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this } connect(e) { if (e && e.hand) { const t = this._hand; if (t) for (const n of e.hand.values()) this._getHandJoint(t, n) } return this.dispatchEvent({ type: "connected", data: e }), this } disconnect(e) { return this.dispatchEvent({ type: "disconnected", data: e }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this } update(e, t, n) { let i = null, r = null, a = null; const o = this._targetRay, l = this._grip, c = this._hand; if (e && t.session.visibilityState !== "visible-blurred") { if (c && e.hand) { a = !0; for (const v of e.hand.values()) { const m = t.getJointPose(v, n), p = this._getHandJoint(c, v); m !== null && (p.matrix.fromArray(m.transform.matrix), p.matrix.decompose(p.position, p.rotation, p.scale), p.matrixWorldNeedsUpdate = !0, p.jointRadius = m.radius), p.visible = m !== null } const h = c.joints["index-finger-tip"], d = c.joints["thumb-tip"], u = h.position.distanceTo(d.position), f = .02, g = .005; c.inputState.pinching && u > f + g ? (c.inputState.pinching = !1, this.dispatchEvent({ type: "pinchend", handedness: e.handedness, target: this })) : !c.inputState.pinching && u <= f - g && (c.inputState.pinching = !0, this.dispatchEvent({ type: "pinchstart", handedness: e.handedness, target: this })) } else l !== null && e.gripSpace && (r = t.getPose(e.gripSpace, n), r !== null && (l.matrix.fromArray(r.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (l.hasLinearVelocity = !0, l.linearVelocity.copy(r.linearVelocity)) : l.hasLinearVelocity = !1, r.angularVelocity ? (l.hasAngularVelocity = !0, l.angularVelocity.copy(r.angularVelocity)) : l.hasAngularVelocity = !1)); o !== null && (i = t.getPose(e.targetRaySpace, n), i === null && r !== null && (i = r), i !== null && (o.matrix.fromArray(i.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, i.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(i.linearVelocity)) : o.hasLinearVelocity = !1, i.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(i.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(Ou))) } return o !== null && (o.visible = i !== null), l !== null && (l.visible = r !== null), c !== null && (c.visible = a !== null), this } _getHandJoint(e, t) { if (e.joints[t.jointName] === void 0) { const n = new qt; n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n) } return e.joints[t.jointName] } } const Yc = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 }, Gn = { h: 0, s: 0, l: 0 }, Us = { h: 0, s: 0, l: 0 }; function Vr(s, e, t) { return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? s + (e - s) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? s + (e - s) * 6 * (2 / 3 - t) : s } class Ae { constructor(e, t, n) { return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n) } set(e, t, n) { if (t === void 0 && n === void 0) { const i = e; i && i.isColor ? this.copy(i) : typeof i == "number" ? this.setHex(i) : typeof i == "string" && this.setStyle(i) } else this.setRGB(e, t, n); return this } setScalar(e) { return this.r = e, this.g = e, this.b = e, this } setHex(e, t = wt) { return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, We.colorSpaceToWorking(this, t), this } setRGB(e, t, n, i = We.workingColorSpace) { return this.r = e, this.g = t, this.b = n, We.colorSpaceToWorking(this, i), this } setHSL(e, t, n, i = We.workingColorSpace) { if (e = Po(e, 1), t = He(t, 0, 1), n = He(n, 0, 1), t === 0) this.r = this.g = this.b = n; else { const r = n <= .5 ? n * (1 + t) : n + t - n * t, a = 2 * n - r; this.r = Vr(a, r, e + 1 / 3), this.g = Vr(a, r, e), this.b = Vr(a, r, e - 1 / 3) } return We.colorSpaceToWorking(this, i), this } setStyle(e, t = wt) { function n(r) { r !== void 0 && parseFloat(r) < 1 && Ee("Color: Alpha component of " + e + " will be ignored.") } let i; if (i = /^(\w+)\(([^\)]*)\)/.exec(e)) { let r; const a = i[1], o = i[2]; switch (a) { case "rgb": case "rgba": if (r = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(r[4]), this.setRGB(Math.min(255, parseInt(r[1], 10)) / 255, Math.min(255, parseInt(r[2], 10)) / 255, Math.min(255, parseInt(r[3], 10)) / 255, t); if (r = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(r[4]), this.setRGB(Math.min(100, parseInt(r[1], 10)) / 100, Math.min(100, parseInt(r[2], 10)) / 100, Math.min(100, parseInt(r[3], 10)) / 100, t); break; case "hsl": case "hsla": if (r = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(r[4]), this.setHSL(parseFloat(r[1]) / 360, parseFloat(r[2]) / 100, parseFloat(r[3]) / 100, t); break; default: Ee("Color: Unknown color model " + e) } } else if (i = /^\#([A-Fa-f\d]+)$/.exec(e)) { const r = i[1], a = r.length; if (a === 3) return this.setRGB(parseInt(r.charAt(0), 16) / 15, parseInt(r.charAt(1), 16) / 15, parseInt(r.charAt(2), 16) / 15, t); if (a === 6) return this.setHex(parseInt(r, 16), t); Ee("Color: Invalid hex color " + e) } else if (e && e.length > 0) return this.setColorName(e, t); return this } setColorName(e, t = wt) { const n = Yc[e.toLowerCase()]; return n !== void 0 ? this.setHex(n, t) : Ee("Color: Unknown color " + e), this } clone() { return new this.constructor(this.r, this.g, this.b) } copy(e) { return this.r = e.r, this.g = e.g, this.b = e.b, this } copySRGBToLinear(e) { return this.r = Un(e.r), this.g = Un(e.g), this.b = Un(e.b), this } copyLinearToSRGB(e) { return this.r = Ui(e.r), this.g = Ui(e.g), this.b = Ui(e.b), this } convertSRGBToLinear() { return this.copySRGBToLinear(this), this } convertLinearToSRGB() { return this.copyLinearToSRGB(this), this } getHex(e = wt) { return We.workingToColorSpace(Lt.copy(this), e), Math.round(He(Lt.r * 255, 0, 255)) * 65536 + Math.round(He(Lt.g * 255, 0, 255)) * 256 + Math.round(He(Lt.b * 255, 0, 255)) } getHexString(e = wt) { return ("000000" + this.getHex(e).toString(16)).slice(-6) } getHSL(e, t = We.workingColorSpace) { We.workingToColorSpace(Lt.copy(this), t); const n = Lt.r, i = Lt.g, r = Lt.b, a = Math.max(n, i, r), o = Math.min(n, i, r); let l, c; const h = (o + a) / 2; if (o === a) l = 0, c = 0; else { const d = a - o; switch (c = h <= .5 ? d / (a + o) : d / (2 - a - o), a) { case n: l = (i - r) / d + (i < r ? 6 : 0); break; case i: l = (r - n) / d + 2; break; case r: l = (n - i) / d + 4; break }l /= 6 } return e.h = l, e.s = c, e.l = h, e } getRGB(e, t = We.workingColorSpace) { return We.workingToColorSpace(Lt.copy(this), t), e.r = Lt.r, e.g = Lt.g, e.b = Lt.b, e } getStyle(e = wt) { We.workingToColorSpace(Lt.copy(this), e); const t = Lt.r, n = Lt.g, i = Lt.b; return e !== wt ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(i * 255)})` } offsetHSL(e, t, n) { return this.getHSL(Gn), this.setHSL(Gn.h + e, Gn.s + t, Gn.l + n) } add(e) { return this.r += e.r, this.g += e.g, this.b += e.b, this } addColors(e, t) { return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this } addScalar(e) { return this.r += e, this.g += e, this.b += e, this } sub(e) { return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this } multiply(e) { return this.r *= e.r, this.g *= e.g, this.b *= e.b, this } multiplyScalar(e) { return this.r *= e, this.g *= e, this.b *= e, this } lerp(e, t) { return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this } lerpColors(e, t, n) { return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this } lerpHSL(e, t) { this.getHSL(Gn), e.getHSL(Us); const n = fs(Gn.h, Us.h, t), i = fs(Gn.s, Us.s, t), r = fs(Gn.l, Us.l, t); return this.setHSL(n, i, r), this } setFromVector3(e) { return this.r = e.x, this.g = e.y, this.b = e.z, this } applyMatrix3(e) { const t = this.r, n = this.g, i = this.b, r = e.elements; return this.r = r[0] * t + r[3] * n + r[6] * i, this.g = r[1] * t + r[4] * n + r[7] * i, this.b = r[2] * t + r[5] * n + r[8] * i, this } equals(e) { return e.r === this.r && e.g === this.g && e.b === this.b } fromArray(e, t = 0) { return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this } toArray(e = [], t = 0) { return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e } fromBufferAttribute(e, t) { return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this } toJSON() { return this.getHex() } *[Symbol.iterator]() { yield this.r, yield this.g, yield this.b } } const Lt = new Ae; Ae.NAMES = Yc; class Bu extends ct { constructor() { super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new $t, this.environmentIntensity = 1, this.environmentRotation = new $t, this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this })) } copy(e, t) { return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this } toJSON(e) { const t = super.toJSON(e); return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t } } const Zt = new L, Tn = new L, Hr = new L, An = new L, Si = new L, yi = new L, bl = new L, Gr = new L, Wr = new L, Xr = new L, Yr = new ot, qr = new ot, $r = new ot; class tn { constructor(e = new L, t = new L, n = new L) { this.a = e, this.b = t, this.c = n } static getNormal(e, t, n, i) { i.subVectors(n, t), Zt.subVectors(e, t), i.cross(Zt); const r = i.lengthSq(); return r > 0 ? i.multiplyScalar(1 / Math.sqrt(r)) : i.set(0, 0, 0) } static getBarycoord(e, t, n, i, r) { Zt.subVectors(i, t), Tn.subVectors(n, t), Hr.subVectors(e, t); const a = Zt.dot(Zt), o = Zt.dot(Tn), l = Zt.dot(Hr), c = Tn.dot(Tn), h = Tn.dot(Hr), d = a * c - o * o; if (d === 0) return r.set(0, 0, 0), null; const u = 1 / d, f = (c * l - o * h) * u, g = (a * h - o * l) * u; return r.set(1 - f - g, g, f) } static containsPoint(e, t, n, i) { return this.getBarycoord(e, t, n, i, An) === null ? !1 : An.x >= 0 && An.y >= 0 && An.x + An.y <= 1 } static getInterpolation(e, t, n, i, r, a, o, l) { return this.getBarycoord(e, t, n, i, An) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(r, An.x), l.addScaledVector(a, An.y), l.addScaledVector(o, An.z), l) } static getInterpolatedAttribute(e, t, n, i, r, a) { return Yr.setScalar(0), qr.setScalar(0), $r.setScalar(0), Yr.fromBufferAttribute(e, t), qr.fromBufferAttribute(e, n), $r.fromBufferAttribute(e, i), a.setScalar(0), a.addScaledVector(Yr, r.x), a.addScaledVector(qr, r.y), a.addScaledVector($r, r.z), a } static isFrontFacing(e, t, n, i) { return Zt.subVectors(n, t), Tn.subVectors(e, t), Zt.cross(Tn).dot(i) < 0 } set(e, t, n) { return this.a.copy(e), this.b.copy(t), this.c.copy(n), this } setFromPointsAndIndices(e, t, n, i) { return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[i]), this } setFromAttributeAndIndices(e, t, n, i) { return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, i), this } clone() { return new this.constructor().copy(this) } copy(e) { return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this } getArea() { return Zt.subVectors(this.c, this.b), Tn.subVectors(this.a, this.b), Zt.cross(Tn).length() * .5 } getMidpoint(e) { return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3) } getNormal(e) { return tn.getNormal(this.a, this.b, this.c, e) } getPlane(e) { return e.setFromCoplanarPoints(this.a, this.b, this.c) } getBarycoord(e, t) { return tn.getBarycoord(e, this.a, this.b, this.c, t) } getInterpolation(e, t, n, i, r) { return tn.getInterpolation(e, this.a, this.b, this.c, t, n, i, r) } containsPoint(e) { return tn.containsPoint(e, this.a, this.b, this.c) } isFrontFacing(e) { return tn.isFrontFacing(this.a, this.b, this.c, e) } intersectsBox(e) { return e.intersectsTriangle(this) } closestPointToPoint(e, t) { const n = this.a, i = this.b, r = this.c; let a, o; Si.subVectors(i, n), yi.subVectors(r, n), Gr.subVectors(e, n); const l = Si.dot(Gr), c = yi.dot(Gr); if (l <= 0 && c <= 0) return t.copy(n); Wr.subVectors(e, i); const h = Si.dot(Wr), d = yi.dot(Wr); if (h >= 0 && d <= h) return t.copy(i); const u = l * d - h * c; if (u <= 0 && l >= 0 && h <= 0) return a = l / (l - h), t.copy(n).addScaledVector(Si, a); Xr.subVectors(e, r); const f = Si.dot(Xr), g = yi.dot(Xr); if (g >= 0 && f <= g) return t.copy(r); const v = f * c - l * g; if (v <= 0 && c >= 0 && g <= 0) return o = c / (c - g), t.copy(n).addScaledVector(yi, o); const m = h * g - f * d; if (m <= 0 && d - h >= 0 && f - g >= 0) return bl.subVectors(r, i), o = (d - h) / (d - h + (f - g)), t.copy(i).addScaledVector(bl, o); const p = 1 / (m + v + u); return a = v * p, o = u * p, t.copy(n).addScaledVector(Si, a).addScaledVector(yi, o) } equals(e) { return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c) } } class zn { constructor(e = new L(1 / 0, 1 / 0, 1 / 0), t = new L(-1 / 0, -1 / 0, -1 / 0)) { this.isBox3 = !0, this.min = e, this.max = t } set(e, t) { return this.min.copy(e), this.max.copy(t), this } setFromArray(e) { this.makeEmpty(); for (let t = 0, n = e.length; t < n; t += 3)this.expandByPoint(Jt.fromArray(e, t)); return this } setFromBufferAttribute(e) { this.makeEmpty(); for (let t = 0, n = e.count; t < n; t++)this.expandByPoint(Jt.fromBufferAttribute(e, t)); return this } setFromPoints(e) { this.makeEmpty(); for (let t = 0, n = e.length; t < n; t++)this.expandByPoint(e[t]); return this } setFromCenterAndSize(e, t) { const n = Jt.copy(t).multiplyScalar(.5); return this.min.copy(e).sub(n), this.max.copy(e).add(n), this } setFromObject(e, t = !1) { return this.makeEmpty(), this.expandByObject(e, t) } clone() { return new this.constructor().copy(this) } copy(e) { return this.min.copy(e.min), this.max.copy(e.max), this } makeEmpty() { return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this } isEmpty() { return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z } getCenter(e) { return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5) } getSize(e) { return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min) } expandByPoint(e) { return this.min.min(e), this.max.max(e), this } expandByVector(e) { return this.min.sub(e), this.max.add(e), this } expandByScalar(e) { return this.min.addScalar(-e), this.max.addScalar(e), this } expandByObject(e, t = !1) { e.updateWorldMatrix(!1, !1); const n = e.geometry; if (n !== void 0) { const r = n.getAttribute("position"); if (t === !0 && r !== void 0 && e.isInstancedMesh !== !0) for (let a = 0, o = r.count; a < o; a++)e.isMesh === !0 ? e.getVertexPosition(a, Jt) : Jt.fromBufferAttribute(r, a), Jt.applyMatrix4(e.matrixWorld), this.expandByPoint(Jt); else e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), Fs.copy(e.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), Fs.copy(n.boundingBox)), Fs.applyMatrix4(e.matrixWorld), this.union(Fs) } const i = e.children; for (let r = 0, a = i.length; r < a; r++)this.expandByObject(i[r], t); return this } containsPoint(e) { return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z } containsBox(e) { return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z } getParameter(e, t) { return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z)) } intersectsBox(e) { return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z } intersectsSphere(e) { return this.clampPoint(e.center, Jt), Jt.distanceToSquared(e.center) <= e.radius * e.radius } intersectsPlane(e) { let t, n; return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant } intersectsTriangle(e) { if (this.isEmpty()) return !1; this.getCenter(Ji), Os.subVectors(this.max, Ji), bi.subVectors(e.a, Ji), Ei.subVectors(e.b, Ji), Ti.subVectors(e.c, Ji), Wn.subVectors(Ei, bi), Xn.subVectors(Ti, Ei), ei.subVectors(bi, Ti); let t = [0, -Wn.z, Wn.y, 0, -Xn.z, Xn.y, 0, -ei.z, ei.y, Wn.z, 0, -Wn.x, Xn.z, 0, -Xn.x, ei.z, 0, -ei.x, -Wn.y, Wn.x, 0, -Xn.y, Xn.x, 0, -ei.y, ei.x, 0]; return !Kr(t, bi, Ei, Ti, Os) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !Kr(t, bi, Ei, Ti, Os)) ? !1 : (Bs.crossVectors(Wn, Xn), t = [Bs.x, Bs.y, Bs.z], Kr(t, bi, Ei, Ti, Os)) } clampPoint(e, t) { return t.copy(e).clamp(this.min, this.max) } distanceToPoint(e) { return this.clampPoint(e, Jt).distanceTo(e) } getBoundingSphere(e) { return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(Jt).length() * .5), e } intersect(e) { return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this } union(e) { return this.min.min(e.min), this.max.max(e.max), this } applyMatrix4(e) { return this.isEmpty() ? this : (wn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), wn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), wn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), wn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), wn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), wn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), wn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), wn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(wn), this) } translate(e) { return this.min.add(e), this.max.add(e), this } equals(e) { return e.min.equals(this.min) && e.max.equals(this.max) } toJSON() { return { min: this.min.toArray(), max: this.max.toArray() } } fromJSON(e) { return this.min.fromArray(e.min), this.max.fromArray(e.max), this } } const wn = [new L, new L, new L, new L, new L, new L, new L, new L], Jt = new L, Fs = new zn, bi = new L, Ei = new L, Ti = new L, Wn = new L, Xn = new L, ei = new L, Ji = new L, Os = new L, Bs = new L, ti = new L; function Kr(s, e, t, n, i) { for (let r = 0, a = s.length - 3; r <= a; r += 3) { ti.fromArray(s, r); const o = i.x * Math.abs(ti.x) + i.y * Math.abs(ti.y) + i.z * Math.abs(ti.z), l = e.dot(ti), c = t.dot(ti), h = n.dot(ti); if (Math.max(-Math.max(l, c, h), Math.min(l, c, h)) > o) return !1 } return !0 } const gt = new L, zs = new Ge; let zu = 0; class Ft { constructor(e, t, n = !1) { if (Array.isArray(e)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array."); this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: zu++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = n, this.usage = lo, this.updateRanges = [], this.gpuType = Xt, this.version = 0 } onUploadCallback() { } set needsUpdate(e) { e === !0 && this.version++ } setUsage(e) { return this.usage = e, this } addUpdateRange(e, t) { this.updateRanges.push({ start: e, count: t }) } clearUpdateRanges() { this.updateRanges.length = 0 } copy(e) { return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this } copyAt(e, t, n) { e *= this.itemSize, n *= t.itemSize; for (let i = 0, r = this.itemSize; i < r; i++)this.array[e + i] = t.array[n + i]; return this } copyArray(e) { return this.array.set(e), this } applyMatrix3(e) { if (this.itemSize === 2) for (let t = 0, n = this.count; t < n; t++)zs.fromBufferAttribute(this, t), zs.applyMatrix3(e), this.setXY(t, zs.x, zs.y); else if (this.itemSize === 3) for (let t = 0, n = this.count; t < n; t++)gt.fromBufferAttribute(this, t), gt.applyMatrix3(e), this.setXYZ(t, gt.x, gt.y, gt.z); return this } applyMatrix4(e) { for (let t = 0, n = this.count; t < n; t++)gt.fromBufferAttribute(this, t), gt.applyMatrix4(e), this.setXYZ(t, gt.x, gt.y, gt.z); return this } applyNormalMatrix(e) { for (let t = 0, n = this.count; t < n; t++)gt.fromBufferAttribute(this, t), gt.applyNormalMatrix(e), this.setXYZ(t, gt.x, gt.y, gt.z); return this } transformDirection(e) { for (let t = 0, n = this.count; t < n; t++)gt.fromBufferAttribute(this, t), gt.transformDirection(e), this.setXYZ(t, gt.x, gt.y, gt.z); return this } set(e, t = 0) { return this.array.set(e, t), this } getComponent(e, t) { let n = this.array[e * this.itemSize + t]; return this.normalized && (n = en(n, this.array)), n } setComponent(e, t, n) { return this.normalized && (n = Ze(n, this.array)), this.array[e * this.itemSize + t] = n, this } getX(e) { let t = this.array[e * this.itemSize]; return this.normalized && (t = en(t, this.array)), t } setX(e, t) { return this.normalized && (t = Ze(t, this.array)), this.array[e * this.itemSize] = t, this } getY(e) { let t = this.array[e * this.itemSize + 1]; return this.normalized && (t = en(t, this.array)), t } setY(e, t) { return this.normalized && (t = Ze(t, this.array)), this.array[e * this.itemSize + 1] = t, this } getZ(e) { let t = this.array[e * this.itemSize + 2]; return this.normalized && (t = en(t, this.array)), t } setZ(e, t) { return this.normalized && (t = Ze(t, this.array)), this.array[e * this.itemSize + 2] = t, this } getW(e) { let t = this.array[e * this.itemSize + 3]; return this.normalized && (t = en(t, this.array)), t } setW(e, t) { return this.normalized && (t = Ze(t, this.array)), this.array[e * this.itemSize + 3] = t, this } setXY(e, t, n) { return e *= this.itemSize, this.normalized && (t = Ze(t, this.array), n = Ze(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this } setXYZ(e, t, n, i) { return e *= this.itemSize, this.normalized && (t = Ze(t, this.array), n = Ze(n, this.array), i = Ze(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = i, this } setXYZW(e, t, n, i, r) { return e *= this.itemSize, this.normalized && (t = Ze(t, this.array), n = Ze(n, this.array), i = Ze(i, this.array), r = Ze(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = i, this.array[e + 3] = r, this } onUpload(e) { return this.onUploadCallback = e, this } clone() { return new this.constructor(this.array, this.itemSize).copy(this) } toJSON() { const e = { itemSize: this.itemSize, type: this.array.constructor.name, array: Array.from(this.array), normalized: this.normalized }; return this.name !== "" && (e.name = this.name), this.usage !== lo && (e.usage = this.usage), e } } class qc extends Ft { constructor(e, t, n) { super(new Uint16Array(e), t, n) } } class $c extends Ft { constructor(e, t, n) { super(new Uint32Array(e), t, n) } } class ut extends Ft { constructor(e, t, n) { super(new Float32Array(e), t, n) } } const ku = new zn, Qi = new L, jr = new L; class on { constructor(e = new L, t = -1) { this.isSphere = !0, this.center = e, this.radius = t } set(e, t) { return this.center.copy(e), this.radius = t, this } setFromPoints(e, t) { const n = this.center; t !== void 0 ? n.copy(t) : ku.setFromPoints(e).getCenter(n); let i = 0; for (let r = 0, a = e.length; r < a; r++)i = Math.max(i, n.distanceToSquared(e[r])); return this.radius = Math.sqrt(i), this } copy(e) { return this.center.copy(e.center), this.radius = e.radius, this } isEmpty() { return this.radius < 0 } makeEmpty() { return this.center.set(0, 0, 0), this.radius = -1, this } containsPoint(e) { return e.distanceToSquared(this.center) <= this.radius * this.radius } distanceToPoint(e) { return e.distanceTo(this.center) - this.radius } intersectsSphere(e) { const t = this.radius + e.radius; return e.center.distanceToSquared(this.center) <= t * t } intersectsBox(e) { return e.intersectsSphere(this) } intersectsPlane(e) { return Math.abs(e.distanceToPoint(this.center)) <= this.radius } clampPoint(e, t) { const n = this.center.distanceToSquared(e); return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t } getBoundingBox(e) { return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e) } applyMatrix4(e) { return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this } translate(e) { return this.center.add(e), this } expandByPoint(e) { if (this.isEmpty()) return this.center.copy(e), this.radius = 0, this; Qi.subVectors(e, this.center); const t = Qi.lengthSq(); if (t > this.radius * this.radius) { const n = Math.sqrt(t), i = (n - this.radius) * .5; this.center.addScaledVector(Qi, i / n), this.radius += i } return this } union(e) { return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (jr.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(Qi.copy(e.center).add(jr)), this.expandByPoint(Qi.copy(e.center).sub(jr))), this) } equals(e) { return e.center.equals(this.center) && e.radius === this.radius } clone() { return new this.constructor().copy(this) } toJSON() { return { radius: this.radius, center: this.center.toArray() } } fromJSON(e) { return this.radius = e.radius, this.center.fromArray(e.center), this } } let Vu = 0; const Gt = new Ue, Zr = new ct, Ai = new L, Vt = new zn, es = new zn, bt = new L; class Rt extends Xi { constructor() { super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: Vu++ }), this.uuid = sn(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {} } getIndex() { return this.index } setIndex(e) { return Array.isArray(e) ? this.index = new (su(e) ? $c : qc)(e, 1) : this.index = e, this } setIndirect(e, t = 0) { return this.indirect = e, this.indirectOffset = t, this } getIndirect() { return this.indirect } getAttribute(e) { return this.attributes[e] } setAttribute(e, t) { return this.attributes[e] = t, this } deleteAttribute(e) { return delete this.attributes[e], this } hasAttribute(e) { return this.attributes[e] !== void 0 } addGroup(e, t, n = 0) { this.groups.push({ start: e, count: t, materialIndex: n }) } clearGroups() { this.groups = [] } setDrawRange(e, t) { this.drawRange.start = e, this.drawRange.count = t } applyMatrix4(e) { const t = this.attributes.position; t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0); const n = this.attributes.normal; if (n !== void 0) { const r = new De().getNormalMatrix(e); n.applyNormalMatrix(r), n.needsUpdate = !0 } const i = this.attributes.tangent; return i !== void 0 && (i.transformDirection(e), i.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this } applyQuaternion(e) { return Gt.makeRotationFromQuaternion(e), this.applyMatrix4(Gt), this } rotateX(e) { return Gt.makeRotationX(e), this.applyMatrix4(Gt), this } rotateY(e) { return Gt.makeRotationY(e), this.applyMatrix4(Gt), this } rotateZ(e) { return Gt.makeRotationZ(e), this.applyMatrix4(Gt), this } translate(e, t, n) { return Gt.makeTranslation(e, t, n), this.applyMatrix4(Gt), this } scale(e, t, n) { return Gt.makeScale(e, t, n), this.applyMatrix4(Gt), this } lookAt(e) { return Zr.lookAt(e), Zr.updateMatrix(), this.applyMatrix4(Zr.matrix), this } center() { return this.computeBoundingBox(), this.boundingBox.getCenter(Ai).negate(), this.translate(Ai.x, Ai.y, Ai.z), this } setFromPoints(e) { const t = this.getAttribute("position"); if (t === void 0) { const n = []; for (let i = 0, r = e.length; i < r; i++) { const a = e[i]; n.push(a.x, a.y, a.z || 0) } this.setAttribute("position", new ut(n, 3)) } else { const n = Math.min(e.length, t.count); for (let i = 0; i < n; i++) { const r = e[i]; t.setXYZ(i, r.x, r.y, r.z || 0) } e.length > t.count && Ee("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t.needsUpdate = !0 } return this } computeBoundingBox() { this.boundingBox === null && (this.boundingBox = new zn); const e = this.attributes.position, t = this.morphAttributes.position; if (e && e.isGLBufferAttribute) { Ce("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new L(-1 / 0, -1 / 0, -1 / 0), new L(1 / 0, 1 / 0, 1 / 0)); return } if (e !== void 0) { if (this.boundingBox.setFromBufferAttribute(e), t) for (let n = 0, i = t.length; n < i; n++) { const r = t[n]; Vt.setFromBufferAttribute(r), this.morphTargetsRelative ? (bt.addVectors(this.boundingBox.min, Vt.min), this.boundingBox.expandByPoint(bt), bt.addVectors(this.boundingBox.max, Vt.max), this.boundingBox.expandByPoint(bt)) : (this.boundingBox.expandByPoint(Vt.min), this.boundingBox.expandByPoint(Vt.max)) } } else this.boundingBox.makeEmpty(); (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && Ce('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this) } computeBoundingSphere() { this.boundingSphere === null && (this.boundingSphere = new on); const e = this.attributes.position, t = this.morphAttributes.position; if (e && e.isGLBufferAttribute) { Ce("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new L, 1 / 0); return } if (e) { const n = this.boundingSphere.center; if (Vt.setFromBufferAttribute(e), t) for (let r = 0, a = t.length; r < a; r++) { const o = t[r]; es.setFromBufferAttribute(o), this.morphTargetsRelative ? (bt.addVectors(Vt.min, es.min), Vt.expandByPoint(bt), bt.addVectors(Vt.max, es.max), Vt.expandByPoint(bt)) : (Vt.expandByPoint(es.min), Vt.expandByPoint(es.max)) } Vt.getCenter(n); let i = 0; for (let r = 0, a = e.count; r < a; r++)bt.fromBufferAttribute(e, r), i = Math.max(i, n.distanceToSquared(bt)); if (t) for (let r = 0, a = t.length; r < a; r++) { const o = t[r], l = this.morphTargetsRelative; for (let c = 0, h = o.count; c < h; c++)bt.fromBufferAttribute(o, c), l && (Ai.fromBufferAttribute(e, c), bt.add(Ai)), i = Math.max(i, n.distanceToSquared(bt)) } this.boundingSphere.radius = Math.sqrt(i), isNaN(this.boundingSphere.radius) && Ce('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this) } } computeTangents() { const e = this.index, t = this.attributes; if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) { Ce("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)"); return } const n = t.position, i = t.normal, r = t.uv; this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Ft(new Float32Array(4 * n.count), 4)); const a = this.getAttribute("tangent"), o = [], l = []; for (let x = 0; x < n.count; x++)o[x] = new L, l[x] = new L; const c = new L, h = new L, d = new L, u = new Ge, f = new Ge, g = new Ge, v = new L, m = new L; function p(x, b, W) { c.fromBufferAttribute(n, x), h.fromBufferAttribute(n, b), d.fromBufferAttribute(n, W), u.fromBufferAttribute(r, x), f.fromBufferAttribute(r, b), g.fromBufferAttribute(r, W), h.sub(c), d.sub(c), f.sub(u), g.sub(u); const R = 1 / (f.x * g.y - g.x * f.y); isFinite(R) && (v.copy(h).multiplyScalar(g.y).addScaledVector(d, -f.y).multiplyScalar(R), m.copy(d).multiplyScalar(f.x).addScaledVector(h, -g.x).multiplyScalar(R), o[x].add(v), o[b].add(v), o[W].add(v), l[x].add(m), l[b].add(m), l[W].add(m)) } let M = this.groups; M.length === 0 && (M = [{ start: 0, count: e.count }]); for (let x = 0, b = M.length; x < b; ++x) { const W = M[x], R = W.start, U = W.count; for (let O = R, G = R + U; O < G; O += 3)p(e.getX(O + 0), e.getX(O + 1), e.getX(O + 2)) } const E = new L, y = new L, w = new L, A = new L; function C(x) { w.fromBufferAttribute(i, x), A.copy(w); const b = o[x]; E.copy(b), E.sub(w.multiplyScalar(w.dot(b))).normalize(), y.crossVectors(A, b); const R = y.dot(l[x]) < 0 ? -1 : 1; a.setXYZW(x, E.x, E.y, E.z, R) } for (let x = 0, b = M.length; x < b; ++x) { const W = M[x], R = W.start, U = W.count; for (let O = R, G = R + U; O < G; O += 3)C(e.getX(O + 0)), C(e.getX(O + 1)), C(e.getX(O + 2)) } } computeVertexNormals() { const e = this.index, t = this.getAttribute("position"); if (t !== void 0) { let n = this.getAttribute("normal"); if (n === void 0) n = new Ft(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n); else for (let u = 0, f = n.count; u < f; u++)n.setXYZ(u, 0, 0, 0); const i = new L, r = new L, a = new L, o = new L, l = new L, c = new L, h = new L, d = new L; if (e) for (let u = 0, f = e.count; u < f; u += 3) { const g = e.getX(u + 0), v = e.getX(u + 1), m = e.getX(u + 2); i.fromBufferAttribute(t, g), r.fromBufferAttribute(t, v), a.fromBufferAttribute(t, m), h.subVectors(a, r), d.subVectors(i, r), h.cross(d), o.fromBufferAttribute(n, g), l.fromBufferAttribute(n, v), c.fromBufferAttribute(n, m), o.add(h), l.add(h), c.add(h), n.setXYZ(g, o.x, o.y, o.z), n.setXYZ(v, l.x, l.y, l.z), n.setXYZ(m, c.x, c.y, c.z) } else for (let u = 0, f = t.count; u < f; u += 3)i.fromBufferAttribute(t, u + 0), r.fromBufferAttribute(t, u + 1), a.fromBufferAttribute(t, u + 2), h.subVectors(a, r), d.subVectors(i, r), h.cross(d), n.setXYZ(u + 0, h.x, h.y, h.z), n.setXYZ(u + 1, h.x, h.y, h.z), n.setXYZ(u + 2, h.x, h.y, h.z); this.normalizeNormals(), n.needsUpdate = !0 } } normalizeNormals() { const e = this.attributes.normal; for (let t = 0, n = e.count; t < n; t++)bt.fromBufferAttribute(e, t), bt.normalize(), e.setXYZ(t, bt.x, bt.y, bt.z) } toNonIndexed() { function e(o, l) { const c = o.array, h = o.itemSize, d = o.normalized, u = new c.constructor(l.length * h); let f = 0, g = 0; for (let v = 0, m = l.length; v < m; v++) { o.isInterleavedBufferAttribute ? f = l[v] * o.data.stride + o.offset : f = l[v] * h; for (let p = 0; p < h; p++)u[g++] = c[f++] } return new Ft(u, h, d) } if (this.index === null) return Ee("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this; const t = new Rt, n = this.index.array, i = this.attributes; for (const o in i) { const l = i[o], c = e(l, n); t.setAttribute(o, c) } const r = this.morphAttributes; for (const o in r) { const l = [], c = r[o]; for (let h = 0, d = c.length; h < d; h++) { const u = c[h], f = e(u, n); l.push(f) } t.morphAttributes[o] = l } t.morphTargetsRelative = this.morphTargetsRelative; const a = this.groups; for (let o = 0, l = a.length; o < l; o++) { const c = a[o]; t.addGroup(c.start, c.count, c.materialIndex) } return t } toJSON() { const e = { metadata: { version: 4.7, type: "BufferGeometry", generator: "BufferGeometry.toJSON" } }; if (e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0) { const l = this.parameters; for (const c in l) l[c] !== void 0 && (e[c] = l[c]); return e } e.data = { attributes: {} }; const t = this.index; t !== null && (e.data.index = { type: t.array.constructor.name, array: Array.prototype.slice.call(t.array) }); const n = this.attributes; for (const l in n) { const c = n[l]; e.data.attributes[l] = c.toJSON(e.data) } const i = {}; let r = !1; for (const l in this.morphAttributes) { const c = this.morphAttributes[l], h = []; for (let d = 0, u = c.length; d < u; d++) { const f = c[d]; h.push(f.toJSON(e.data)) } h.length > 0 && (i[l] = h, r = !0) } r && (e.data.morphAttributes = i, e.data.morphTargetsRelative = this.morphTargetsRelative); const a = this.groups; a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a))); const o = this.boundingSphere; return o !== null && (e.data.boundingSphere = o.toJSON()), e } clone() { return new this.constructor().copy(this) } copy(e) { this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null; const t = {}; this.name = e.name; const n = e.index; n !== null && this.setIndex(n.clone()); const i = e.attributes; for (const c in i) { const h = i[c]; this.setAttribute(c, h.clone(t)) } const r = e.morphAttributes; for (const c in r) { const h = [], d = r[c]; for (let u = 0, f = d.length; u < f; u++)h.push(d[u].clone(t)); this.morphAttributes[c] = h } this.morphTargetsRelative = e.morphTargetsRelative; const a = e.groups; for (let c = 0, h = a.length; c < h; c++) { const d = a[c]; this.addGroup(d.start, d.count, d.materialIndex) } const o = e.boundingBox; o !== null && (this.boundingBox = o.clone()); const l = e.boundingSphere; return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this } dispose() { this.dispatchEvent({ type: "dispose" }) } } class Hu { constructor(e, t) { this.isInterleavedBuffer = !0, this.array = e, this.stride = t, this.count = e !== void 0 ? e.length / t : 0, this.usage = lo, this.updateRanges = [], this.version = 0, this.uuid = sn() } onUploadCallback() { } set needsUpdate(e) { e === !0 && this.version++ } setUsage(e) { return this.usage = e, this } addUpdateRange(e, t) { this.updateRanges.push({ start: e, count: t }) } clearUpdateRanges() { this.updateRanges.length = 0 } copy(e) { return this.array = new e.array.constructor(e.array), this.count = e.count, this.stride = e.stride, this.usage = e.usage, this } copyAt(e, t, n) { e *= this.stride, n *= t.stride; for (let i = 0, r = this.stride; i < r; i++)this.array[e + i] = t.array[n + i]; return this } set(e, t = 0) { return this.array.set(e, t), this } clone(e) { e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = sn()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer); const t = new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]), n = new this.constructor(t, this.stride); return n.setUsage(this.usage), n } onUpload(e) { return this.onUploadCallback = e, this } toJSON(e) { return e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = sn()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))), { uuid: this.uuid, buffer: this.array.buffer._uuid, type: this.array.constructor.name, stride: this.stride } } } const It = new L; class Io { constructor(e, t, n, i = !1) { this.isInterleavedBufferAttribute = !0, this.name = "", this.data = e, this.itemSize = t, this.offset = n, this.normalized = i } get count() { return this.data.count } get array() { return this.data.array } set needsUpdate(e) { this.data.needsUpdate = e } applyMatrix4(e) { for (let t = 0, n = this.data.count; t < n; t++)It.fromBufferAttribute(this, t), It.applyMatrix4(e), this.setXYZ(t, It.x, It.y, It.z); return this } applyNormalMatrix(e) { for (let t = 0, n = this.count; t < n; t++)It.fromBufferAttribute(this, t), It.applyNormalMatrix(e), this.setXYZ(t, It.x, It.y, It.z); return this } transformDirection(e) { for (let t = 0, n = this.count; t < n; t++)It.fromBufferAttribute(this, t), It.transformDirection(e), this.setXYZ(t, It.x, It.y, It.z); return this } getComponent(e, t) { let n = this.array[e * this.data.stride + this.offset + t]; return this.normalized && (n = en(n, this.array)), n } setComponent(e, t, n) { return this.normalized && (n = Ze(n, this.array)), this.data.array[e * this.data.stride + this.offset + t] = n, this } setX(e, t) { return this.normalized && (t = Ze(t, this.array)), this.data.array[e * this.data.stride + this.offset] = t, this } setY(e, t) { return this.normalized && (t = Ze(t, this.array)), this.data.array[e * this.data.stride + this.offset + 1] = t, this } setZ(e, t) { return this.normalized && (t = Ze(t, this.array)), this.data.array[e * this.data.stride + this.offset + 2] = t, this } setW(e, t) { return this.normalized && (t = Ze(t, this.array)), this.data.array[e * this.data.stride + this.offset + 3] = t, this } getX(e) { let t = this.data.array[e * this.data.stride + this.offset]; return this.normalized && (t = en(t, this.array)), t } getY(e) { let t = this.data.array[e * this.data.stride + this.offset + 1]; return this.normalized && (t = en(t, this.array)), t } getZ(e) { let t = this.data.array[e * this.data.stride + this.offset + 2]; return this.normalized && (t = en(t, this.array)), t } getW(e) { let t = this.data.array[e * this.data.stride + this.offset + 3]; return this.normalized && (t = en(t, this.array)), t } setXY(e, t, n) { return e = e * this.data.stride + this.offset, this.normalized && (t = Ze(t, this.array), n = Ze(n, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this } setXYZ(e, t, n, i) { return e = e * this.data.stride + this.offset, this.normalized && (t = Ze(t, this.array), n = Ze(n, this.array), i = Ze(i, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = i, this } setXYZW(e, t, n, i, r) { return e = e * this.data.stride + this.offset, this.normalized && (t = Ze(t, this.array), n = Ze(n, this.array), i = Ze(i, this.array), r = Ze(r, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = i, this.data.array[e + 3] = r, this } clone(e) { if (e === void 0) { xr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data."); const t = []; for (let n = 0; n < this.count; n++) { const i = n * this.data.stride + this.offset; for (let r = 0; r < this.itemSize; r++)t.push(this.data.array[i + r]) } return new Ft(new this.array.constructor(t), this.itemSize, this.normalized) } else return e.interleavedBuffers === void 0 && (e.interleavedBuffers = {}), e.interleavedBuffers[this.data.uuid] === void 0 && (e.interleavedBuffers[this.data.uuid] = this.data.clone(e)), new Io(e.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized) } toJSON(e) { if (e === void 0) { xr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data."); const t = []; for (let n = 0; n < this.count; n++) { const i = n * this.data.stride + this.offset; for (let r = 0; r < this.itemSize; r++)t.push(this.data.array[i + r]) } return { itemSize: this.itemSize, type: this.array.constructor.name, array: t, normalized: this.normalized } } else return e.interleavedBuffers === void 0 && (e.interleavedBuffers = {}), e.interleavedBuffers[this.data.uuid] === void 0 && (e.interleavedBuffers[this.data.uuid] = this.data.toJSON(e)), { isInterleavedBufferAttribute: !0, itemSize: this.itemSize, data: this.data.uuid, offset: this.offset, normalized: this.normalized } } } let Gu = 0; class rn extends Xi { constructor() { super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Gu++ }), this.uuid = sn(), this.name = "", this.type = "Material", this.blending = Di, this.side = Fn, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = Ma, this.blendDst = Sa, this.blendEquation = ci, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Ae(0, 0, 0), this.blendAlpha = 0, this.depthFunc = Oi, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = cl, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = gi, this.stencilZFail = gi, this.stencilZPass = gi, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0 } get alphaTest() { return this._alphaTest } set alphaTest(e) { this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e } onBeforeRender() { } onBeforeCompile() { } customProgramCacheKey() { return this.onBeforeCompile.toString() } setValues(e) { if (e !== void 0) for (const t in e) { const n = e[t]; if (n === void 0) { Ee(`Material: parameter '${t}' has value of undefined.`); continue } const i = this[t]; if (i === void 0) { Ee(`Material: '${t}' is not a property of THREE.${this.type}.`); continue } i && i.isColor ? i.set(n) : i && i.isVector3 && n && n.isVector3 ? i.copy(n) : this[t] = n } } toJSON(e) { const t = e === void 0 || typeof e == "string"; t && (e = { textures: {}, images: {} }); const n = { metadata: { version: 4.7, type: "Material", generator: "Material.toJSON" } }; n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (n.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== Di && (n.blending = this.blending), this.side !== Fn && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== Ma && (n.blendSrc = this.blendSrc), this.blendDst !== Sa && (n.blendDst = this.blendDst), this.blendEquation !== ci && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== Oi && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== cl && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== gi && (n.stencilFail = this.stencilFail), this.stencilZFail !== gi && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== gi && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.allowOverride === !1 && (n.allowOverride = !1), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData); function i(r) { const a = []; for (const o in r) { const l = r[o]; delete l.metadata, a.push(l) } return a } if (t) { const r = i(e.textures), a = i(e.images); r.length > 0 && (n.textures = r), a.length > 0 && (n.images = a) } return n } clone() { return new this.constructor().copy(this) } copy(e) { this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite; const t = e.clippingPlanes; let n = null; if (t !== null) { const i = t.length; n = new Array(i); for (let r = 0; r !== i; ++r)n[r] = t[r].clone() } return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.allowOverride = e.allowOverride, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this } dispose() { this.dispatchEvent({ type: "dispose" }) } set needsUpdate(e) { e === !0 && this.version++ } } const Rn = new L, Jr = new L, ks = new L, Yn = new L, Qr = new L, Vs = new L, ea = new L; class As { constructor(e = new L, t = new L(0, 0, -1)) { this.origin = e, this.direction = t } set(e, t) { return this.origin.copy(e), this.direction.copy(t), this } copy(e) { return this.origin.copy(e.origin), this.direction.copy(e.direction), this } at(e, t) { return t.copy(this.origin).addScaledVector(this.direction, e) } lookAt(e) { return this.direction.copy(e).sub(this.origin).normalize(), this } recast(e) { return this.origin.copy(this.at(e, Rn)), this } closestPointToPoint(e, t) { t.subVectors(e, this.origin); const n = t.dot(this.direction); return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n) } distanceToPoint(e) { return Math.sqrt(this.distanceSqToPoint(e)) } distanceSqToPoint(e) { const t = Rn.subVectors(e, this.origin).dot(this.direction); return t < 0 ? this.origin.distanceToSquared(e) : (Rn.copy(this.origin).addScaledVector(this.direction, t), Rn.distanceToSquared(e)) } distanceSqToSegment(e, t, n, i) { Jr.copy(e).add(t).multiplyScalar(.5), ks.copy(t).sub(e).normalize(), Yn.copy(this.origin).sub(Jr); const r = e.distanceTo(t) * .5, a = -this.direction.dot(ks), o = Yn.dot(this.direction), l = -Yn.dot(ks), c = Yn.lengthSq(), h = Math.abs(1 - a * a); let d, u, f, g; if (h > 0) if (d = a * l - o, u = a * o - l, g = r * h, d >= 0) if (u >= -g) if (u <= g) { const v = 1 / h; d *= v, u *= v, f = d * (d + a * u + 2 * o) + u * (a * d + u + 2 * l) + c } else u = r, d = Math.max(0, -(a * u + o)), f = -d * d + u * (u + 2 * l) + c; else u = -r, d = Math.max(0, -(a * u + o)), f = -d * d + u * (u + 2 * l) + c; else u <= -g ? (d = Math.max(0, -(-a * r + o)), u = d > 0 ? -r : Math.min(Math.max(-r, -l), r), f = -d * d + u * (u + 2 * l) + c) : u <= g ? (d = 0, u = Math.min(Math.max(-r, -l), r), f = u * (u + 2 * l) + c) : (d = Math.max(0, -(a * r + o)), u = d > 0 ? r : Math.min(Math.max(-r, -l), r), f = -d * d + u * (u + 2 * l) + c); else u = a > 0 ? -r : r, d = Math.max(0, -(a * u + o)), f = -d * d + u * (u + 2 * l) + c; return n && n.copy(this.origin).addScaledVector(this.direction, d), i && i.copy(Jr).addScaledVector(ks, u), f } intersectSphere(e, t) { Rn.subVectors(e.center, this.origin); const n = Rn.dot(this.direction), i = Rn.dot(Rn) - n * n, r = e.radius * e.radius; if (i > r) return null; const a = Math.sqrt(r - i), o = n - a, l = n + a; return l < 0 ? null : o < 0 ? this.at(l, t) : this.at(o, t) } intersectsSphere(e) { return e.radius < 0 ? !1 : this.distanceSqToPoint(e.center) <= e.radius * e.radius } distanceToPlane(e) { const t = e.normal.dot(this.direction); if (t === 0) return e.distanceToPoint(this.origin) === 0 ? 0 : null; const n = -(this.origin.dot(e.normal) + e.constant) / t; return n >= 0 ? n : null } intersectPlane(e, t) { const n = this.distanceToPlane(e); return n === null ? null : this.at(n, t) } intersectsPlane(e) { const t = e.distanceToPoint(this.origin); return t === 0 || e.normal.dot(this.direction) * t < 0 } intersectBox(e, t) { let n, i, r, a, o, l; const c = 1 / this.direction.x, h = 1 / this.direction.y, d = 1 / this.direction.z, u = this.origin; return c >= 0 ? (n = (e.min.x - u.x) * c, i = (e.max.x - u.x) * c) : (n = (e.max.x - u.x) * c, i = (e.min.x - u.x) * c), h >= 0 ? (r = (e.min.y - u.y) * h, a = (e.max.y - u.y) * h) : (r = (e.max.y - u.y) * h, a = (e.min.y - u.y) * h), n > a || r > i || ((r > n || isNaN(n)) && (n = r), (a < i || isNaN(i)) && (i = a), d >= 0 ? (o = (e.min.z - u.z) * d, l = (e.max.z - u.z) * d) : (o = (e.max.z - u.z) * d, l = (e.min.z - u.z) * d), n > l || o > i) || ((o > n || n !== n) && (n = o), (l < i || i !== i) && (i = l), i < 0) ? null : this.at(n >= 0 ? n : i, t) } intersectsBox(e) { return this.intersectBox(e, Rn) !== null } intersectTriangle(e, t, n, i, r) { Qr.subVectors(t, e), Vs.subVectors(n, e), ea.crossVectors(Qr, Vs); let a = this.direction.dot(ea), o; if (a > 0) { if (i) return null; o = 1 } else if (a < 0) o = -1, a = -a; else return null; Yn.subVectors(this.origin, e); const l = o * this.direction.dot(Vs.crossVectors(Yn, Vs)); if (l < 0) return null; const c = o * this.direction.dot(Qr.cross(Yn)); if (c < 0 || l + c > a) return null; const h = -o * Yn.dot(ea); return h < 0 ? null : this.at(h / a, r) } applyMatrix4(e) { return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this } equals(e) { return e.origin.equals(this.origin) && e.direction.equals(this.direction) } clone() { return new this.constructor().copy(this) } } class nn extends rn { constructor(e) { super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Ae(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new $t, this.combine = vo, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e) } copy(e) { return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this } } const El = new Ue, ni = new As, Hs = new on, Tl = new L, Gs = new L, Ws = new L, Xs = new L, ta = new L, Ys = new L, Al = new L, qs = new L; class Tt extends ct { constructor(e = new Rt, t = new nn) { super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets() } copy(e, t) { return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this } updateMorphTargets() { const t = this.geometry.morphAttributes, n = Object.keys(t); if (n.length > 0) { const i = t[n[0]]; if (i !== void 0) { this.morphTargetInfluences = [], this.morphTargetDictionary = {}; for (let r = 0, a = i.length; r < a; r++) { const o = i[r].name || String(r); this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = r } } } } getVertexPosition(e, t) { const n = this.geometry, i = n.attributes.position, r = n.morphAttributes.position, a = n.morphTargetsRelative; t.fromBufferAttribute(i, e); const o = this.morphTargetInfluences; if (r && o) { Ys.set(0, 0, 0); for (let l = 0, c = r.length; l < c; l++) { const h = o[l], d = r[l]; h !== 0 && (ta.fromBufferAttribute(d, e), a ? Ys.addScaledVector(ta, h) : Ys.addScaledVector(ta.sub(t), h)) } t.add(Ys) } return t } raycast(e, t) { const n = this.geometry, i = this.material, r = this.matrixWorld; i !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), Hs.copy(n.boundingSphere), Hs.applyMatrix4(r), ni.copy(e.ray).recast(e.near), !(Hs.containsPoint(ni.origin) === !1 && (ni.intersectSphere(Hs, Tl) === null || ni.origin.distanceToSquared(Tl) > (e.far - e.near) ** 2)) && (El.copy(r).invert(), ni.copy(e.ray).applyMatrix4(El), !(n.boundingBox !== null && ni.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, ni))) } _computeIntersections(e, t, n) { let i; const r = this.geometry, a = this.material, o = r.index, l = r.attributes.position, c = r.attributes.uv, h = r.attributes.uv1, d = r.attributes.normal, u = r.groups, f = r.drawRange; if (o !== null) if (Array.isArray(a)) for (let g = 0, v = u.length; g < v; g++) { const m = u[g], p = a[m.materialIndex], M = Math.max(m.start, f.start), E = Math.min(o.count, Math.min(m.start + m.count, f.start + f.count)); for (let y = M, w = E; y < w; y += 3) { const A = o.getX(y), C = o.getX(y + 1), x = o.getX(y + 2); i = $s(this, p, e, n, c, h, d, A, C, x), i && (i.faceIndex = Math.floor(y / 3), i.face.materialIndex = m.materialIndex, t.push(i)) } } else { const g = Math.max(0, f.start), v = Math.min(o.count, f.start + f.count); for (let m = g, p = v; m < p; m += 3) { const M = o.getX(m), E = o.getX(m + 1), y = o.getX(m + 2); i = $s(this, a, e, n, c, h, d, M, E, y), i && (i.faceIndex = Math.floor(m / 3), t.push(i)) } } else if (l !== void 0) if (Array.isArray(a)) for (let g = 0, v = u.length; g < v; g++) { const m = u[g], p = a[m.materialIndex], M = Math.max(m.start, f.start), E = Math.min(l.count, Math.min(m.start + m.count, f.start + f.count)); for (let y = M, w = E; y < w; y += 3) { const A = y, C = y + 1, x = y + 2; i = $s(this, p, e, n, c, h, d, A, C, x), i && (i.faceIndex = Math.floor(y / 3), i.face.materialIndex = m.materialIndex, t.push(i)) } } else { const g = Math.max(0, f.start), v = Math.min(l.count, f.start + f.count); for (let m = g, p = v; m < p; m += 3) { const M = m, E = m + 1, y = m + 2; i = $s(this, a, e, n, c, h, d, M, E, y), i && (i.faceIndex = Math.floor(m / 3), t.push(i)) } } } } function Wu(s, e, t, n, i, r, a, o) { let l; if (e.side === Bt ? l = n.intersectTriangle(a, r, i, !0, o) : l = n.intersectTriangle(i, r, a, e.side === Fn, o), l === null) return null; qs.copy(o), qs.applyMatrix4(s.matrixWorld); const c = t.ray.origin.distanceTo(qs); return c < t.near || c > t.far ? null : { distance: c, point: qs.clone(), object: s } } function $s(s, e, t, n, i, r, a, o, l, c) { s.getVertexPosition(o, Gs), s.getVertexPosition(l, Ws), s.getVertexPosition(c, Xs); const h = Wu(s, e, t, n, Gs, Ws, Xs, Al); if (h) { const d = new L; tn.getBarycoord(Al, Gs, Ws, Xs, d), i && (h.uv = tn.getInterpolatedAttribute(i, o, l, c, d, new Ge)), r && (h.uv1 = tn.getInterpolatedAttribute(r, o, l, c, d, new Ge)), a && (h.normal = tn.getInterpolatedAttribute(a, o, l, c, d, new L), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1)); const u = { a: o, b: l, c, normal: new L, materialIndex: 0 }; tn.getNormal(Gs, Ws, Xs, u.normal), h.face = u, h.barycoord = d } return h } const wl = new L, Rl = new ot, Cl = new ot, Xu = new L, Pl = new Ue, Ks = new L, na = new on, Ll = new Ue, ia = new As; class Yu extends Tt { constructor(e, t) { super(e, t), this.isSkinnedMesh = !0, this.type = "SkinnedMesh", this.bindMode = sl, this.bindMatrix = new Ue, this.bindMatrixInverse = new Ue, this.boundingBox = null, this.boundingSphere = null } computeBoundingBox() { const e = this.geometry; this.boundingBox === null && (this.boundingBox = new zn), this.boundingBox.makeEmpty(); const t = e.getAttribute("position"); for (let n = 0; n < t.count; n++)this.getVertexPosition(n, Ks), this.boundingBox.expandByPoint(Ks) } computeBoundingSphere() { const e = this.geometry; this.boundingSphere === null && (this.boundingSphere = new on), this.boundingSphere.makeEmpty(); const t = e.getAttribute("position"); for (let n = 0; n < t.count; n++)this.getVertexPosition(n, Ks), this.boundingSphere.expandByPoint(Ks) } copy(e, t) { return super.copy(e, t), this.bindMode = e.bindMode, this.bindMatrix.copy(e.bindMatrix), this.bindMatrixInverse.copy(e.bindMatrixInverse), this.skeleton = e.skeleton, e.boundingBox !== null && (this.boundingBox = e.boundingBox.clone()), e.boundingSphere !== null && (this.boundingSphere = e.boundingSphere.clone()), this } raycast(e, t) { const n = this.material, i = this.matrixWorld; n !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), na.copy(this.boundingSphere), na.applyMatrix4(i), e.ray.intersectsSphere(na) !== !1 && (Ll.copy(i).invert(), ia.copy(e.ray).applyMatrix4(Ll), !(this.boundingBox !== null && ia.intersectsBox(this.boundingBox) === !1) && this._computeIntersections(e, t, ia))) } getVertexPosition(e, t) { return super.getVertexPosition(e, t), this.applyBoneTransform(e, t), t } bind(e, t) { this.skeleton = e, t === void 0 && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), t = this.matrixWorld), this.bindMatrix.copy(t), this.bindMatrixInverse.copy(t).invert() } pose() { this.skeleton.pose() } normalizeSkinWeights() { const e = new ot, t = this.geometry.attributes.skinWeight; for (let n = 0, i = t.count; n < i; n++) { e.fromBufferAttribute(t, n); const r = 1 / e.manhattanLength(); r !== 1 / 0 ? e.multiplyScalar(r) : e.set(1, 0, 0, 0), t.setXYZW(n, e.x, e.y, e.z, e.w) } } updateMatrixWorld(e) { super.updateMatrixWorld(e), this.bindMode === sl ? this.bindMatrixInverse.copy(this.matrixWorld).invert() : this.bindMode === qh ? this.bindMatrixInverse.copy(this.bindMatrix).invert() : Ee("SkinnedMesh: Unrecognized bindMode: " + this.bindMode) } applyBoneTransform(e, t) { const n = this.skeleton, i = this.geometry; Rl.fromBufferAttribute(i.attributes.skinIndex, e), Cl.fromBufferAttribute(i.attributes.skinWeight, e), wl.copy(t).applyMatrix4(this.bindMatrix), t.set(0, 0, 0); for (let r = 0; r < 4; r++) { const a = Cl.getComponent(r); if (a !== 0) { const o = Rl.getComponent(r); Pl.multiplyMatrices(n.bones[o].matrixWorld, n.boneInverses[o]), t.addScaledVector(Xu.copy(wl).applyMatrix4(Pl), a) } } return t.applyMatrix4(this.bindMatrixInverse) } } class Kc extends ct { constructor() { super(), this.isBone = !0, this.type = "Bone" } } class Do extends Et { constructor(e = null, t = 1, n = 1, i, r, a, o, l, c = _t, h = _t, d, u) { super(null, a, o, l, c, h, i, r, d, u), this.isDataTexture = !0, this.image = { data: e, width: t, height: n }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1 } } const Il = new Ue, qu = new Ue; class No { constructor(e = [], t = []) { this.uuid = sn(), this.bones = e.slice(0), this.boneInverses = t, this.boneMatrices = null, this.previousBoneMatrices = null, this.boneTexture = null, this.init() } init() { const e = this.bones, t = this.boneInverses; if (this.boneMatrices = new Float32Array(e.length * 16), t.length === 0) this.calculateInverses(); else if (e.length !== t.length) { Ee("Skeleton: Number of inverse bone matrices does not match amount of bones."), this.boneInverses = []; for (let n = 0, i = this.bones.length; n < i; n++)this.boneInverses.push(new Ue) } } calculateInverses() { this.boneInverses.length = 0; for (let e = 0, t = this.bones.length; e < t; e++) { const n = new Ue; this.bones[e] && n.copy(this.bones[e].matrixWorld).invert(), this.boneInverses.push(n) } } pose() { for (let e = 0, t = this.bones.length; e < t; e++) { const n = this.bones[e]; n && n.matrixWorld.copy(this.boneInverses[e]).invert() } for (let e = 0, t = this.bones.length; e < t; e++) { const n = this.bones[e]; n && (n.parent && n.parent.isBone ? (n.matrix.copy(n.parent.matrixWorld).invert(), n.matrix.multiply(n.matrixWorld)) : n.matrix.copy(n.matrixWorld), n.matrix.decompose(n.position, n.quaternion, n.scale)) } } update() { const e = this.bones, t = this.boneInverses, n = this.boneMatrices, i = this.boneTexture; for (let r = 0, a = e.length; r < a; r++) { const o = e[r] ? e[r].matrixWorld : qu; Il.multiplyMatrices(o, t[r]), Il.toArray(n, r * 16) } i !== null && (i.needsUpdate = !0) } clone() { return new No(this.bones, this.boneInverses) } computeBoneTexture() { let e = Math.sqrt(this.bones.length * 4); e = Math.ceil(e / 4) * 4, e = Math.max(e, 4); const t = new Float32Array(e * e * 4); t.set(this.boneMatrices); const n = new Do(t, e, e, Yt, Xt); return n.needsUpdate = !0, this.boneMatrices = t, this.boneTexture = n, this } getBoneByName(e) { for (let t = 0, n = this.bones.length; t < n; t++) { const i = this.bones[t]; if (i.name === e) return i } } dispose() { this.boneTexture !== null && (this.boneTexture.dispose(), this.boneTexture = null) } fromJSON(e, t) { this.uuid = e.uuid; for (let n = 0, i = e.bones.length; n < i; n++) { const r = e.bones[n]; let a = t[r]; a === void 0 && (Ee("Skeleton: No bone found with UUID:", r), a = new Kc), this.bones.push(a), this.boneInverses.push(new Ue().fromArray(e.boneInverses[n])) } return this.init(), this } toJSON() { const e = { metadata: { version: 4.7, type: "Skeleton", generator: "Skeleton.toJSON" }, bones: [], boneInverses: [] }; e.uuid = this.uuid; const t = this.bones, n = this.boneInverses; for (let i = 0, r = t.length; i < r; i++) { const a = t[i]; e.bones.push(a.uuid); const o = n[i]; e.boneInverses.push(o.toArray()) } return e } } class co extends Ft { constructor(e, t, n, i = 1) { super(e, t, n), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = i } copy(e) { return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this } toJSON() { const e = super.toJSON(); return e.meshPerAttribute = this.meshPerAttribute, e.isInstancedBufferAttribute = !0, e } } const wi = new Ue, Dl = new Ue, js = [], Nl = new zn, $u = new Ue, ts = new Tt, ns = new on; class Ku extends Tt { constructor(e, t, n) { super(e, t), this.isInstancedMesh = !0, this.instanceMatrix = new co(new Float32Array(n * 16), 16), this.previousInstanceMatrix = null, this.instanceColor = null, this.morphTexture = null, this.count = n, this.boundingBox = null, this.boundingSphere = null; for (let i = 0; i < n; i++)this.setMatrixAt(i, $u) } computeBoundingBox() { const e = this.geometry, t = this.count; this.boundingBox === null && (this.boundingBox = new zn), e.boundingBox === null && e.computeBoundingBox(), this.boundingBox.makeEmpty(); for (let n = 0; n < t; n++)this.getMatrixAt(n, wi), Nl.copy(e.boundingBox).applyMatrix4(wi), this.boundingBox.union(Nl) } computeBoundingSphere() { const e = this.geometry, t = this.count; this.boundingSphere === null && (this.boundingSphere = new on), e.boundingSphere === null && e.computeBoundingSphere(), this.boundingSphere.makeEmpty(); for (let n = 0; n < t; n++)this.getMatrixAt(n, wi), ns.copy(e.boundingSphere).applyMatrix4(wi), this.boundingSphere.union(ns) } copy(e, t) { return super.copy(e, t), this.instanceMatrix.copy(e.instanceMatrix), e.previousInstanceMatrix !== null && (this.previousInstanceMatrix = e.previousInstanceMatrix.clone()), e.morphTexture !== null && (this.morphTexture = e.morphTexture.clone()), e.instanceColor !== null && (this.instanceColor = e.instanceColor.clone()), this.count = e.count, e.boundingBox !== null && (this.boundingBox = e.boundingBox.clone()), e.boundingSphere !== null && (this.boundingSphere = e.boundingSphere.clone()), this } getColorAt(e, t) { t.fromArray(this.instanceColor.array, e * 3) } getMatrixAt(e, t) { t.fromArray(this.instanceMatrix.array, e * 16) } getMorphAt(e, t) { const n = t.morphTargetInfluences, i = this.morphTexture.source.data.data, r = n.length + 1, a = e * r + 1; for (let o = 0; o < n.length; o++)n[o] = i[a + o] } raycast(e, t) { const n = this.matrixWorld, i = this.count; if (ts.geometry = this.geometry, ts.material = this.material, ts.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), ns.copy(this.boundingSphere), ns.applyMatrix4(n), e.ray.intersectsSphere(ns) !== !1)) for (let r = 0; r < i; r++) { this.getMatrixAt(r, wi), Dl.multiplyMatrices(n, wi), ts.matrixWorld = Dl, ts.raycast(e, js); for (let a = 0, o = js.length; a < o; a++) { const l = js[a]; l.instanceId = r, l.object = this, t.push(l) } js.length = 0 } } setColorAt(e, t) { this.instanceColor === null && (this.instanceColor = new co(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), t.toArray(this.instanceColor.array, e * 3) } setMatrixAt(e, t) { t.toArray(this.instanceMatrix.array, e * 16) } setMorphAt(e, t) { const n = t.morphTargetInfluences, i = n.length + 1; this.morphTexture === null && (this.morphTexture = new Do(new Float32Array(i * this.count), i, this.count, bo, Xt)); const r = this.morphTexture.source.data.data; let a = 0; for (let c = 0; c < n.length; c++)a += n[c]; const o = this.geometry.morphTargetsRelative ? 1 : 1 - a, l = i * e; r[l] = o, r.set(n, l + 1) } updateMorphTargets() { } dispose() { this.dispatchEvent({ type: "dispose" }), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null) } } const sa = new L, ju = new L, Zu = new De; class li { constructor(e = new L(1, 0, 0), t = 0) { this.isPlane = !0, this.normal = e, this.constant = t } set(e, t) { return this.normal.copy(e), this.constant = t, this } setComponents(e, t, n, i) { return this.normal.set(e, t, n), this.constant = i, this } setFromNormalAndCoplanarPoint(e, t) { return this.normal.copy(e), this.constant = -t.dot(this.normal), this } setFromCoplanarPoints(e, t, n) { const i = sa.subVectors(n, t).cross(ju.subVectors(e, t)).normalize(); return this.setFromNormalAndCoplanarPoint(i, e), this } copy(e) { return this.normal.copy(e.normal), this.constant = e.constant, this } normalize() { const e = 1 / this.normal.length(); return this.normal.multiplyScalar(e), this.constant *= e, this } negate() { return this.constant *= -1, this.normal.negate(), this } distanceToPoint(e) { return this.normal.dot(e) + this.constant } distanceToSphere(e) { return this.distanceToPoint(e.center) - e.radius } projectPoint(e, t) { return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e)) } intersectLine(e, t) { const n = e.delta(sa), i = this.normal.dot(n); if (i === 0) return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null; const r = -(e.start.dot(this.normal) + this.constant) / i; return r < 0 || r > 1 ? null : t.copy(e.start).addScaledVector(n, r) } intersectsLine(e) { const t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end); return t < 0 && n > 0 || n < 0 && t > 0 } intersectsBox(e) { return e.intersectsPlane(this) } intersectsSphere(e) { return e.intersectsPlane(this) } coplanarPoint(e) { return e.copy(this.normal).multiplyScalar(-this.constant) } applyMatrix4(e, t) { const n = t || Zu.getNormalMatrix(e), i = this.coplanarPoint(sa).applyMatrix4(e), r = this.normal.applyMatrix3(n).normalize(); return this.constant = -i.dot(r), this } translate(e) { return this.constant -= e.dot(this.normal), this } equals(e) { return e.normal.equals(this.normal) && e.constant === this.constant } clone() { return new this.constructor().copy(this) } } const ii = new on, Ju = new Ge(.5, .5), Zs = new L; class Uo { constructor(e = new li, t = new li, n = new li, i = new li, r = new li, a = new li) { this.planes = [e, t, n, i, r, a] } set(e, t, n, i, r, a) { const o = this.planes; return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(i), o[4].copy(r), o[5].copy(a), this } copy(e) { const t = this.planes; for (let n = 0; n < 6; n++)t[n].copy(e.planes[n]); return this } setFromProjectionMatrix(e, t = mn, n = !1) { const i = this.planes, r = e.elements, a = r[0], o = r[1], l = r[2], c = r[3], h = r[4], d = r[5], u = r[6], f = r[7], g = r[8], v = r[9], m = r[10], p = r[11], M = r[12], E = r[13], y = r[14], w = r[15]; if (i[0].setComponents(c - a, f - h, p - g, w - M).normalize(), i[1].setComponents(c + a, f + h, p + g, w + M).normalize(), i[2].setComponents(c + o, f + d, p + v, w + E).normalize(), i[3].setComponents(c - o, f - d, p - v, w - E).normalize(), n) i[4].setComponents(l, u, m, y).normalize(), i[5].setComponents(c - l, f - u, p - m, w - y).normalize(); else if (i[4].setComponents(c - l, f - u, p - m, w - y).normalize(), t === mn) i[5].setComponents(c + l, f + u, p + m, w + y).normalize(); else if (t === Ss) i[5].setComponents(l, u, m, y).normalize(); else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t); return this } intersectsObject(e) { if (e.boundingSphere !== void 0) e.boundingSphere === null && e.computeBoundingSphere(), ii.copy(e.boundingSphere).applyMatrix4(e.matrixWorld); else { const t = e.geometry; t.boundingSphere === null && t.computeBoundingSphere(), ii.copy(t.boundingSphere).applyMatrix4(e.matrixWorld) } return this.intersectsSphere(ii) } intersectsSprite(e) { ii.center.set(0, 0, 0); const t = Ju.distanceTo(e.center); return ii.radius = .7071067811865476 + t, ii.applyMatrix4(e.matrixWorld), this.intersectsSphere(ii) } intersectsSphere(e) { const t = this.planes, n = e.center, i = -e.radius; for (let r = 0; r < 6; r++)if (t[r].distanceToPoint(n) < i) return !1; return !0 } intersectsBox(e) { const t = this.planes; for (let n = 0; n < 6; n++) { const i = t[n]; if (Zs.x = i.normal.x > 0 ? e.max.x : e.min.x, Zs.y = i.normal.y > 0 ? e.max.y : e.min.y, Zs.z = i.normal.z > 0 ? e.max.z : e.min.z, i.distanceToPoint(Zs) < 0) return !1 } return !0 } containsPoint(e) { const t = this.planes; for (let n = 0; n < 6; n++)if (t[n].distanceToPoint(e) < 0) return !1; return !0 } clone() { return new this.constructor().copy(this) } } class br extends rn { constructor(e) { super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new Ae(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(e) } copy(e) { return super.copy(e), this.color.copy(e.color), this.map = e.map, this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this.fog = e.fog, this } } const Mr = new L, Sr = new L, Ul = new Ue, is = new As, Js = new on, ra = new L, Fl = new L; class ws extends ct { constructor(e = new Rt, t = new br) { super(), this.isLine = !0, this.type = "Line", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets() } copy(e, t) { return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this } computeLineDistances() { const e = this.geometry; if (e.index === null) { const t = e.attributes.position, n = [0]; for (let i = 1, r = t.count; i < r; i++)Mr.fromBufferAttribute(t, i - 1), Sr.fromBufferAttribute(t, i), n[i] = n[i - 1], n[i] += Mr.distanceTo(Sr); e.setAttribute("lineDistance", new ut(n, 1)) } else Ee("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry."); return this } raycast(e, t) { const n = this.geometry, i = this.matrixWorld, r = e.params.Line.threshold, a = n.drawRange; if (n.boundingSphere === null && n.computeBoundingSphere(), Js.copy(n.boundingSphere), Js.applyMatrix4(i), Js.radius += r, e.ray.intersectsSphere(Js) === !1) return; Ul.copy(i).invert(), is.copy(e.ray).applyMatrix4(Ul); const o = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), l = o * o, c = this.isLineSegments ? 2 : 1, h = n.index, u = n.attributes.position; if (h !== null) { const f = Math.max(0, a.start), g = Math.min(h.count, a.start + a.count); for (let v = f, m = g - 1; v < m; v += c) { const p = h.getX(v), M = h.getX(v + 1), E = Qs(this, e, is, l, p, M, v); E && t.push(E) } if (this.isLineLoop) { const v = h.getX(g - 1), m = h.getX(f), p = Qs(this, e, is, l, v, m, g - 1); p && t.push(p) } } else { const f = Math.max(0, a.start), g = Math.min(u.count, a.start + a.count); for (let v = f, m = g - 1; v < m; v += c) { const p = Qs(this, e, is, l, v, v + 1, v); p && t.push(p) } if (this.isLineLoop) { const v = Qs(this, e, is, l, g - 1, f, g - 1); v && t.push(v) } } } updateMorphTargets() { const t = this.geometry.morphAttributes, n = Object.keys(t); if (n.length > 0) { const i = t[n[0]]; if (i !== void 0) { this.morphTargetInfluences = [], this.morphTargetDictionary = {}; for (let r = 0, a = i.length; r < a; r++) { const o = i[r].name || String(r); this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = r } } } } } function Qs(s, e, t, n, i, r, a) { const o = s.geometry.attributes.position; if (Mr.fromBufferAttribute(o, i), Sr.fromBufferAttribute(o, r), t.distanceSqToSegment(Mr, Sr, ra, Fl) > n) return; ra.applyMatrix4(s.matrixWorld); const c = e.ray.origin.distanceTo(ra); if (!(c < e.near || c > e.far)) return { distance: c, point: Fl.clone().applyMatrix4(s.matrixWorld), index: a, face: null, faceIndex: null, barycoord: null, object: s } } const Ol = new L, Bl = new L; class Qu extends ws { constructor(e, t) { super(e, t), this.isLineSegments = !0, this.type = "LineSegments" } computeLineDistances() { const e = this.geometry; if (e.index === null) { const t = e.attributes.position, n = []; for (let i = 0, r = t.count; i < r; i += 2)Ol.fromBufferAttribute(t, i), Bl.fromBufferAttribute(t, i + 1), n[i] = i === 0 ? 0 : n[i - 1], n[i + 1] = n[i] + Ol.distanceTo(Bl); e.setAttribute("lineDistance", new ut(n, 1)) } else Ee("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry."); return this } } class ed extends ws { constructor(e, t) { super(e, t), this.isLineLoop = !0, this.type = "LineLoop" } } class jc extends rn { constructor(e) { super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new Ae(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(e) } copy(e) { return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.size = e.size, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this } } const zl = new Ue, ho = new As, er = new on, tr = new L; class td extends ct { constructor(e = new Rt, t = new jc) { super(), this.isPoints = !0, this.type = "Points", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets() } copy(e, t) { return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this } raycast(e, t) { const n = this.geometry, i = this.matrixWorld, r = e.params.Points.threshold, a = n.drawRange; if (n.boundingSphere === null && n.computeBoundingSphere(), er.copy(n.boundingSphere), er.applyMatrix4(i), er.radius += r, e.ray.intersectsSphere(er) === !1) return; zl.copy(i).invert(), ho.copy(e.ray).applyMatrix4(zl); const o = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), l = o * o, c = n.index, d = n.attributes.position; if (c !== null) { const u = Math.max(0, a.start), f = Math.min(c.count, a.start + a.count); for (let g = u, v = f; g < v; g++) { const m = c.getX(g); tr.fromBufferAttribute(d, m), kl(tr, m, l, i, e, t, this) } } else { const u = Math.max(0, a.start), f = Math.min(d.count, a.start + a.count); for (let g = u, v = f; g < v; g++)tr.fromBufferAttribute(d, g), kl(tr, g, l, i, e, t, this) } } updateMorphTargets() { const t = this.geometry.morphAttributes, n = Object.keys(t); if (n.length > 0) { const i = t[n[0]]; if (i !== void 0) { this.morphTargetInfluences = [], this.morphTargetDictionary = {}; for (let r = 0, a = i.length; r < a; r++) { const o = i[r].name || String(r); this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = r } } } } } function kl(s, e, t, n, i, r, a) { const o = ho.distanceSqToPoint(s); if (o < t) { const l = new L; ho.closestPointToPoint(s, l), l.applyMatrix4(n); const c = i.ray.origin.distanceTo(l); if (c < i.near || c > i.far) return; r.push({ distance: c, distanceToRay: Math.sqrt(o), point: l, index: e, face: null, faceIndex: null, barycoord: null, object: a }) } } class Zc extends Et { constructor(e = [], t = di, n, i, r, a, o, l, c, h) { super(e, t, n, i, r, a, o, l, c, h), this.isCubeTexture = !0, this.flipY = !1 } get images() { return this.image } set images(e) { this.image = e } } class bs extends Et { constructor(e, t, n = vn, i, r, a, o = _t, l = _t, c, h = Bn, d = 1) { if (h !== Bn && h !== ui) throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat"); const u = { width: e, height: t, depth: d }; super(u, i, r, a, o, l, h, n, c), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null } copy(e) { return super.copy(e), this.source = new Lo(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this } toJSON(e) { const t = super.toJSON(e); return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t } } class nd extends bs { constructor(e, t = vn, n = di, i, r, a = _t, o = _t, l, c = Bn) { const h = { width: e, height: e, depth: 1 }, d = [h, h, h, h, h, h]; super(e, e, t, n, i, r, a, o, l, c), this.image = d, this.isCubeDepthTexture = !0, this.isCubeTexture = !0 } get images() { return this.image } set images(e) { this.image = e } } class Jc extends Et { constructor(e = null) { super(), this.sourceTexture = e, this.isExternalTexture = !0 } copy(e) { return super.copy(e), this.sourceTexture = e.sourceTexture, this } } class Rs extends Rt { constructor(e = 1, t = 1, n = 1, i = 1, r = 1, a = 1) { super(), this.type = "BoxGeometry", this.parameters = { width: e, height: t, depth: n, widthSegments: i, heightSegments: r, depthSegments: a }; const o = this; i = Math.floor(i), r = Math.floor(r), a = Math.floor(a); const l = [], c = [], h = [], d = []; let u = 0, f = 0; g("z", "y", "x", -1, -1, n, t, e, a, r, 0), g("z", "y", "x", 1, -1, n, t, -e, a, r, 1), g("x", "z", "y", 1, 1, e, n, t, i, a, 2), g("x", "z", "y", 1, -1, e, n, -t, i, a, 3), g("x", "y", "z", 1, -1, e, t, n, i, r, 4), g("x", "y", "z", -1, -1, e, t, -n, i, r, 5), this.setIndex(l), this.setAttribute("position", new ut(c, 3)), this.setAttribute("normal", new ut(h, 3)), this.setAttribute("uv", new ut(d, 2)); function g(v, m, p, M, E, y, w, A, C, x, b) { const W = y / C, R = w / x, U = y / 2, O = w / 2, G = A / 2, z = C + 1, V = x + 1; let F = 0, Q = 0; const j = new L; for (let ce = 0; ce < V; ce++) { const pe = ce * R - O; for (let ue = 0; ue < z; ue++) { const Fe = ue * W - U; j[v] = Fe * M, j[m] = pe * E, j[p] = G, c.push(j.x, j.y, j.z), j[v] = 0, j[m] = 0, j[p] = A > 0 ? 1 : -1, h.push(j.x, j.y, j.z), d.push(ue / C), d.push(1 - ce / x), F += 1 } } for (let ce = 0; ce < x; ce++)for (let pe = 0; pe < C; pe++) { const ue = u + pe + z * ce, Fe = u + pe + z * (ce + 1), lt = u + (pe + 1) + z * (ce + 1), at = u + (pe + 1) + z * ce; l.push(ue, Fe, at), l.push(Fe, lt, at), Q += 6 } o.addGroup(f, Q, b), f += Q, u += F } } copy(e) { return super.copy(e), this.parameters = Object.assign({}, e.parameters), this } static fromJSON(e) { return new Rs(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments) } } class Fo extends Rt { constructor(e = 1, t = 1, n = 1, i = 32, r = 1, a = !1, o = 0, l = Math.PI * 2) { super(), this.type = "CylinderGeometry", this.parameters = { radiusTop: e, radiusBottom: t, height: n, radialSegments: i, heightSegments: r, openEnded: a, thetaStart: o, thetaLength: l }; const c = this; i = Math.floor(i), r = Math.floor(r); const h = [], d = [], u = [], f = []; let g = 0; const v = [], m = n / 2; let p = 0; M(), a === !1 && (e > 0 && E(!0), t > 0 && E(!1)), this.setIndex(h), this.setAttribute("position", new ut(d, 3)), this.setAttribute("normal", new ut(u, 3)), this.setAttribute("uv", new ut(f, 2)); function M() { const y = new L, w = new L; let A = 0; const C = (t - e) / n; for (let x = 0; x <= r; x++) { const b = [], W = x / r, R = W * (t - e) + e; for (let U = 0; U <= i; U++) { const O = U / i, G = O * l + o, z = Math.sin(G), V = Math.cos(G); w.x = R * z, w.y = -W * n + m, w.z = R * V, d.push(w.x, w.y, w.z), y.set(z, C, V).normalize(), u.push(y.x, y.y, y.z), f.push(O, 1 - W), b.push(g++) } v.push(b) } for (let x = 0; x < i; x++)for (let b = 0; b < r; b++) { const W = v[b][x], R = v[b + 1][x], U = v[b + 1][x + 1], O = v[b][x + 1]; (e > 0 || b !== 0) && (h.push(W, R, O), A += 3), (t > 0 || b !== r - 1) && (h.push(R, U, O), A += 3) } c.addGroup(p, A, 0), p += A } function E(y) { const w = g, A = new Ge, C = new L; let x = 0; const b = y === !0 ? e : t, W = y === !0 ? 1 : -1; for (let U = 1; U <= i; U++)d.push(0, m * W, 0), u.push(0, W, 0), f.push(.5, .5), g++; const R = g; for (let U = 0; U <= i; U++) { const G = U / i * l + o, z = Math.cos(G), V = Math.sin(G); C.x = b * V, C.y = m * W, C.z = b * z, d.push(C.x, C.y, C.z), u.push(0, W, 0), A.x = z * .5 + .5, A.y = V * .5 * W + .5, f.push(A.x, A.y), g++ } for (let U = 0; U < i; U++) { const O = w + U, G = R + U; y === !0 ? h.push(G, G + 1, O) : h.push(G + 1, G, O), x += 3 } c.addGroup(p, x, y === !0 ? 1 : 2), p += x } } copy(e) { return super.copy(e), this.parameters = Object.assign({}, e.parameters), this } static fromJSON(e) { return new Fo(e.radiusTop, e.radiusBottom, e.height, e.radialSegments, e.heightSegments, e.openEnded, e.thetaStart, e.thetaLength) } } class Oo extends Fo { constructor(e = 1, t = 1, n = 32, i = 1, r = !1, a = 0, o = Math.PI * 2) { super(0, e, t, n, i, r, a, o), this.type = "ConeGeometry", this.parameters = { radius: e, height: t, radialSegments: n, heightSegments: i, openEnded: r, thetaStart: a, thetaLength: o } } static fromJSON(e) { return new Oo(e.radius, e.height, e.radialSegments, e.heightSegments, e.openEnded, e.thetaStart, e.thetaLength) } } class Cs extends Rt { constructor(e = 1, t = 1, n = 1, i = 1) { super(), this.type = "PlaneGeometry", this.parameters = { width: e, height: t, widthSegments: n, heightSegments: i }; const r = e / 2, a = t / 2, o = Math.floor(n), l = Math.floor(i), c = o + 1, h = l + 1, d = e / o, u = t / l, f = [], g = [], v = [], m = []; for (let p = 0; p < h; p++) { const M = p * u - a; for (let E = 0; E < c; E++) { const y = E * d - r; g.push(y, -M, 0), v.push(0, 0, 1), m.push(E / o), m.push(1 - p / l) } } for (let p = 0; p < l; p++)for (let M = 0; M < o; M++) { const E = M + c * p, y = M + c * (p + 1), w = M + 1 + c * (p + 1), A = M + 1 + c * p; f.push(E, y, A), f.push(y, w, A) } this.setIndex(f), this.setAttribute("position", new ut(g, 3)), this.setAttribute("normal", new ut(v, 3)), this.setAttribute("uv", new ut(m, 2)) } copy(e) { return super.copy(e), this.parameters = Object.assign({}, e.parameters), this } static fromJSON(e) { return new Cs(e.width, e.height, e.widthSegments, e.heightSegments) } } class Er extends Rt { constructor(e = 1, t = 32, n = 16, i = 0, r = Math.PI * 2, a = 0, o = Math.PI) { super(), this.type = "SphereGeometry", this.parameters = { radius: e, widthSegments: t, heightSegments: n, phiStart: i, phiLength: r, thetaStart: a, thetaLength: o }, t = Math.max(3, Math.floor(t)), n = Math.max(2, Math.floor(n)); const l = Math.min(a + o, Math.PI); let c = 0; const h = [], d = new L, u = new L, f = [], g = [], v = [], m = []; for (let p = 0; p <= n; p++) { const M = [], E = p / n; let y = 0; p === 0 && a === 0 ? y = .5 / t : p === n && l === Math.PI && (y = -.5 / t); for (let w = 0; w <= t; w++) { const A = w / t; d.x = -e * Math.cos(i + A * r) * Math.sin(a + E * o), d.y = e * Math.cos(a + E * o), d.z = e * Math.sin(i + A * r) * Math.sin(a + E * o), g.push(d.x, d.y, d.z), u.copy(d).normalize(), v.push(u.x, u.y, u.z), m.push(A + y, 1 - E), M.push(c++) } h.push(M) } for (let p = 0; p < n; p++)for (let M = 0; M < t; M++) { const E = h[p][M + 1], y = h[p][M], w = h[p + 1][M], A = h[p + 1][M + 1]; (p !== 0 || a > 0) && f.push(E, y, A), (p !== n - 1 || l < Math.PI) && f.push(y, w, A) } this.setIndex(f), this.setAttribute("position", new ut(g, 3)), this.setAttribute("normal", new ut(v, 3)), this.setAttribute("uv", new ut(m, 2)) } copy(e) { return super.copy(e), this.parameters = Object.assign({}, e.parameters), this } static fromJSON(e) { return new Er(e.radius, e.widthSegments, e.heightSegments, e.phiStart, e.phiLength, e.thetaStart, e.thetaLength) } } class Bo extends Rt { constructor(e = 1, t = .4, n = 12, i = 48, r = Math.PI * 2, a = 0, o = Math.PI * 2) { super(), this.type = "TorusGeometry", this.parameters = { radius: e, tube: t, radialSegments: n, tubularSegments: i, arc: r, thetaStart: a, thetaLength: o }, n = Math.floor(n), i = Math.floor(i); const l = [], c = [], h = [], d = [], u = new L, f = new L, g = new L; for (let v = 0; v <= n; v++) { const m = a + v / n * o; for (let p = 0; p <= i; p++) { const M = p / i * r; f.x = (e + t * Math.cos(m)) * Math.cos(M), f.y = (e + t * Math.cos(m)) * Math.sin(M), f.z = t * Math.sin(m), c.push(f.x, f.y, f.z), u.x = e * Math.cos(M), u.y = e * Math.sin(M), g.subVectors(f, u).normalize(), h.push(g.x, g.y, g.z), d.push(p / i), d.push(v / n) } } for (let v = 1; v <= n; v++)for (let m = 1; m <= i; m++) { const p = (i + 1) * v + m - 1, M = (i + 1) * (v - 1) + m - 1, E = (i + 1) * (v - 1) + m, y = (i + 1) * v + m; l.push(p, M, y), l.push(M, E, y) } this.setIndex(l), this.setAttribute("position", new ut(c, 3)), this.setAttribute("normal", new ut(h, 3)), this.setAttribute("uv", new ut(d, 2)) } copy(e) { return super.copy(e), this.parameters = Object.assign({}, e.parameters), this } static fromJSON(e) { return new Bo(e.radius, e.tube, e.radialSegments, e.tubularSegments, e.arc) } } function Vi(s) { const e = {}; for (const t in s) { e[t] = {}; for (const n in s[t]) { const i = s[t][n]; i && (i.isColor || i.isMatrix3 || i.isMatrix4 || i.isVector2 || i.isVector3 || i.isVector4 || i.isTexture || i.isQuaternion) ? i.isRenderTargetTexture ? (Ee("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[t][n] = null) : e[t][n] = i.clone() : Array.isArray(i) ? e[t][n] = i.slice() : e[t][n] = i } } return e } function Nt(s) { const e = {}; for (let t = 0; t < s.length; t++) { const n = Vi(s[t]); for (const i in n) e[i] = n[i] } return e } function id(s) { const e = []; for (let t = 0; t < s.length; t++)e.push(s[t].clone()); return e } function Qc(s) { const e = s.getRenderTarget(); return e === null ? s.outputColorSpace : e.isXRRenderTarget === !0 ? e.texture.colorSpace : We.workingColorSpace } const sd = { clone: Vi, merge: Nt }; var rd = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, ad = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`; class Mn extends rn { constructor(e) { super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = rd, this.fragmentShader = ad, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = { clipCullDistance: !1, multiDraw: !1 }, this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv1: [0, 0] }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e) } copy(e) { return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = Vi(e.uniforms), this.uniformsGroups = id(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this } toJSON(e) { const t = super.toJSON(e); t.glslVersion = this.glslVersion, t.uniforms = {}; for (const i in this.uniforms) { const a = this.uniforms[i].value; a && a.isTexture ? t.uniforms[i] = { type: "t", value: a.toJSON(e).uuid } : a && a.isColor ? t.uniforms[i] = { type: "c", value: a.getHex() } : a && a.isVector2 ? t.uniforms[i] = { type: "v2", value: a.toArray() } : a && a.isVector3 ? t.uniforms[i] = { type: "v3", value: a.toArray() } : a && a.isVector4 ? t.uniforms[i] = { type: "v4", value: a.toArray() } : a && a.isMatrix3 ? t.uniforms[i] = { type: "m3", value: a.toArray() } : a && a.isMatrix4 ? t.uniforms[i] = { type: "m4", value: a.toArray() } : t.uniforms[i] = { value: a } } Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping; const n = {}; for (const i in this.extensions) this.extensions[i] === !0 && (n[i] = !0); return Object.keys(n).length > 0 && (t.extensions = n), t } } class od extends Mn { constructor(e) { super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial" } } class zo extends rn { constructor(e) { super(), this.isMeshStandardMaterial = !0, this.type = "MeshStandardMaterial", this.defines = { STANDARD: "" }, this.color = new Ae(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Ae(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = wo, this.normalScale = new Ge(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new $t, this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e) } copy(e) { return super.copy(e), this.defines = { STANDARD: "" }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this } } class Sn extends zo { constructor(e) { super(), this.isMeshPhysicalMaterial = !0, this.defines = { STANDARD: "", PHYSICAL: "" }, this.type = "MeshPhysicalMaterial", this.anisotropyRotation = 0, this.anisotropyMap = null, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new Ge(1, 1), this.clearcoatNormalMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", { get: function () { return He(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1) }, set: function (t) { this.ior = (1 + .4 * t) / (1 - .4 * t) } }), this.iridescenceMap = null, this.iridescenceIOR = 1.3, this.iridescenceThicknessRange = [100, 400], this.iridescenceThicknessMap = null, this.sheenColor = new Ae(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = 1 / 0, this.attenuationColor = new Ae(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new Ae(1, 1, 1), this.specularColorMap = null, this._anisotropy = 0, this._clearcoat = 0, this._dispersion = 0, this._iridescence = 0, this._sheen = 0, this._transmission = 0, this.setValues(e) } get anisotropy() { return this._anisotropy } set anisotropy(e) { this._anisotropy > 0 != e > 0 && this.version++, this._anisotropy = e } get clearcoat() { return this._clearcoat } set clearcoat(e) { this._clearcoat > 0 != e > 0 && this.version++, this._clearcoat = e } get iridescence() { return this._iridescence } set iridescence(e) { this._iridescence > 0 != e > 0 && this.version++, this._iridescence = e } get dispersion() { return this._dispersion } set dispersion(e) { this._dispersion > 0 != e > 0 && this.version++, this._dispersion = e } get sheen() { return this._sheen } set sheen(e) { this._sheen > 0 != e > 0 && this.version++, this._sheen = e } get transmission() { return this._transmission } set transmission(e) { this._transmission > 0 != e > 0 && this.version++, this._transmission = e } copy(e) { return super.copy(e), this.defines = { STANDARD: "", PHYSICAL: "" }, this.anisotropy = e.anisotropy, this.anisotropyRotation = e.anisotropyRotation, this.anisotropyMap = e.anisotropyMap, this.clearcoat = e.clearcoat, this.clearcoatMap = e.clearcoatMap, this.clearcoatRoughness = e.clearcoatRoughness, this.clearcoatRoughnessMap = e.clearcoatRoughnessMap, this.clearcoatNormalMap = e.clearcoatNormalMap, this.clearcoatNormalScale.copy(e.clearcoatNormalScale), this.dispersion = e.dispersion, this.ior = e.ior, this.iridescence = e.iridescence, this.iridescenceMap = e.iridescenceMap, this.iridescenceIOR = e.iridescenceIOR, this.iridescenceThicknessRange = [...e.iridescenceThicknessRange], this.iridescenceThicknessMap = e.iridescenceThicknessMap, this.sheen = e.sheen, this.sheenColor.copy(e.sheenColor), this.sheenColorMap = e.sheenColorMap, this.sheenRoughness = e.sheenRoughness, this.sheenRoughnessMap = e.sheenRoughnessMap, this.transmission = e.transmission, this.transmissionMap = e.transmissionMap, this.thickness = e.thickness, this.thicknessMap = e.thicknessMap, this.attenuationDistance = e.attenuationDistance, this.attenuationColor.copy(e.attenuationColor), this.specularIntensity = e.specularIntensity, this.specularIntensityMap = e.specularIntensityMap, this.specularColor.copy(e.specularColor), this.specularColorMap = e.specularColorMap, this } } class ld extends rn { constructor(e) { super(), this.isMeshPhongMaterial = !0, this.type = "MeshPhongMaterial", this.color = new Ae(16777215), this.specular = new Ae(1118481), this.shininess = 30, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Ae(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = wo, this.normalScale = new Ge(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new $t, this.combine = vo, this.reflectivity = 1, this.envMapIntensity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e) } copy(e) { return super.copy(e), this.color.copy(e.color), this.specular.copy(e.specular), this.shininess = e.shininess, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.envMapIntensity = e.envMapIntensity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this } } class cd extends rn { constructor(e) { super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = jh, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e) } copy(e) { return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this } } class hd extends rn { constructor(e) { super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e) } copy(e) { return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this } } function nr(s, e) { return !s || s.constructor === e ? s : typeof e.BYTES_PER_ELEMENT == "number" ? new e(s) : Array.prototype.slice.call(s) } function ud(s) { function e(i, r) { return s[i] - s[r] } const t = s.length, n = new Array(t); for (let i = 0; i !== t; ++i)n[i] = i; return n.sort(e), n } function Vl(s, e, t) { const n = s.length, i = new s.constructor(n); for (let r = 0, a = 0; a !== n; ++r) { const o = t[r] * e; for (let l = 0; l !== e; ++l)i[a++] = s[o + l] } return i } function eh(s, e, t, n) { let i = 1, r = s[0]; for (; r !== void 0 && r[n] === void 0;)r = s[i++]; if (r === void 0) return; let a = r[n]; if (a !== void 0) if (Array.isArray(a)) do a = r[n], a !== void 0 && (e.push(r.time), t.push(...a)), r = s[i++]; while (r !== void 0); else if (a.toArray !== void 0) do a = r[n], a !== void 0 && (e.push(r.time), a.toArray(t, t.length)), r = s[i++]; while (r !== void 0); else do a = r[n], a !== void 0 && (e.push(r.time), t.push(a)), r = s[i++]; while (r !== void 0) } class Yi { constructor(e, t, n, i) { this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = i !== void 0 ? i : new t.constructor(n), this.sampleValues = t, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {} } evaluate(e) { const t = this.parameterPositions; let n = this._cachedIndex, i = t[n], r = t[n - 1]; n: { e: { let a; t: { i: if (!(e < i)) { for (let o = n + 2; ;) { if (i === void 0) { if (e < r) break i; return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1) } if (n === o) break; if (r = i, i = t[++n], e < i) break e } a = t.length; break t } if (!(e >= r)) { const o = t[1]; e < o && (n = 2, r = o); for (let l = n - 2; ;) { if (r === void 0) return this._cachedIndex = 0, this.copySampleValue_(0); if (n === l) break; if (i = r, r = t[--n - 1], e >= r) break e } a = n, n = 0; break t } break n } for (; n < a;) { const o = n + a >>> 1; e < t[o] ? a = o : n = o + 1 } if (i = t[n], r = t[n - 1], r === void 0) return this._cachedIndex = 0, this.copySampleValue_(0); if (i === void 0) return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1) } this._cachedIndex = n, this.intervalChanged_(n, r, i) } return this.interpolate_(n, r, e, i) } getSettings_() { return this.settings || this.DefaultSettings_ } copySampleValue_(e) { const t = this.resultBuffer, n = this.sampleValues, i = this.valueSize, r = e * i; for (let a = 0; a !== i; ++a)t[a] = n[r + a]; return t } interpolate_() { throw new Error("call to abstract method") } intervalChanged_() { } } class dd extends Yi { constructor(e, t, n, i) { super(e, t, n, i), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = { endingStart: al, endingEnd: al } } intervalChanged_(e, t, n) { const i = this.parameterPositions; let r = e - 2, a = e + 1, o = i[r], l = i[a]; if (o === void 0) switch (this.getSettings_().endingStart) { case ol: r = e, o = 2 * t - n; break; case ll: r = i.length - 2, o = t + i[r] - i[r + 1]; break; default: r = e, o = n }if (l === void 0) switch (this.getSettings_().endingEnd) { case ol: a = e, l = 2 * n - t; break; case ll: a = 1, l = n + i[1] - i[0]; break; default: a = e - 1, l = t }const c = (n - t) * .5, h = this.valueSize; this._weightPrev = c / (t - o), this._weightNext = c / (l - n), this._offsetPrev = r * h, this._offsetNext = a * h } interpolate_(e, t, n, i) { const r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, l = e * o, c = l - o, h = this._offsetPrev, d = this._offsetNext, u = this._weightPrev, f = this._weightNext, g = (n - t) / (i - t), v = g * g, m = v * g, p = -u * m + 2 * u * v - u * g, M = (1 + u) * m + (-1.5 - 2 * u) * v + (-.5 + u) * g + 1, E = (-1 - f) * m + (1.5 + f) * v + .5 * g, y = f * m - f * v; for (let w = 0; w !== o; ++w)r[w] = p * a[h + w] + M * a[c + w] + E * a[l + w] + y * a[d + w]; return r } } class fd extends Yi { constructor(e, t, n, i) { super(e, t, n, i) } interpolate_(e, t, n, i) { const r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, l = e * o, c = l - o, h = (n - t) / (i - t), d = 1 - h; for (let u = 0; u !== o; ++u)r[u] = a[c + u] * d + a[l + u] * h; return r } } class pd extends Yi { constructor(e, t, n, i) { super(e, t, n, i) } interpolate_(e) { return this.copySampleValue_(e - 1) } } class md extends Yi { interpolate_(e, t, n, i) { const r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, l = e * o, c = l - o, h = this.settings || this.DefaultSettings_, d = h.inTangents, u = h.outTangents; if (!d || !u) { const v = (n - t) / (i - t), m = 1 - v; for (let p = 0; p !== o; ++p)r[p] = a[c + p] * m + a[l + p] * v; return r } const f = o * 2, g = e - 1; for (let v = 0; v !== o; ++v) { const m = a[c + v], p = a[l + v], M = g * f + v * 2, E = u[M], y = u[M + 1], w = e * f + v * 2, A = d[w], C = d[w + 1]; let x = (n - t) / (i - t), b, W, R, U, O; for (let G = 0; G < 8; G++) { b = x * x, W = b * x, R = 1 - x, U = R * R, O = U * R; const V = O * t + 3 * U * x * E + 3 * R * b * A + W * i - n; if (Math.abs(V) < 1e-10) break; const F = 3 * U * (E - t) + 6 * R * x * (A - E) + 3 * b * (i - A); if (Math.abs(F) < 1e-10) break; x = x - V / F, x = Math.max(0, Math.min(1, x)) } r[v] = O * m + 3 * U * x * y + 3 * R * b * C + W * p } return r } } class ln { constructor(e, t, n, i) { if (e === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined"); if (t === void 0 || t.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + e); this.name = e, this.times = nr(t, this.TimeBufferType), this.values = nr(n, this.ValueBufferType), this.setInterpolation(i || this.DefaultInterpolation) } static toJSON(e) { const t = e.constructor; let n; if (t.toJSON !== this.toJSON) n = t.toJSON(e); else { n = { name: e.name, times: nr(e.times, Array), values: nr(e.values, Array) }; const i = e.getInterpolation(); i !== e.DefaultInterpolation && (n.interpolation = i) } return n.type = e.ValueTypeName, n } InterpolantFactoryMethodDiscrete(e) { return new pd(this.times, this.values, this.getValueSize(), e) } InterpolantFactoryMethodLinear(e) { return new fd(this.times, this.values, this.getValueSize(), e) } InterpolantFactoryMethodSmooth(e) { return new dd(this.times, this.values, this.getValueSize(), e) } InterpolantFactoryMethodBezier(e) { const t = new md(this.times, this.values, this.getValueSize(), e); return this.settings && (t.settings = this.settings), t } setInterpolation(e) { let t; switch (e) { case vs: t = this.InterpolantFactoryMethodDiscrete; break; case Ms: t = this.InterpolantFactoryMethodLinear; break; case Nr: t = this.InterpolantFactoryMethodSmooth; break; case rl: t = this.InterpolantFactoryMethodBezier; break }if (t === void 0) { const n = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name; if (this.createInterpolant === void 0) if (e !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation); else throw new Error(n); return Ee("KeyframeTrack:", n), this } return this.createInterpolant = t, this } getInterpolation() { switch (this.createInterpolant) { case this.InterpolantFactoryMethodDiscrete: return vs; case this.InterpolantFactoryMethodLinear: return Ms; case this.InterpolantFactoryMethodSmooth: return Nr; case this.InterpolantFactoryMethodBezier: return rl } } getValueSize() { return this.values.length / this.times.length } shift(e) { if (e !== 0) { const t = this.times; for (let n = 0, i = t.length; n !== i; ++n)t[n] += e } return this } scale(e) { if (e !== 1) { const t = this.times; for (let n = 0, i = t.length; n !== i; ++n)t[n] *= e } return this } trim(e, t) { const n = this.times, i = n.length; let r = 0, a = i - 1; for (; r !== i && n[r] < e;)++r; for (; a !== -1 && n[a] > t;)--a; if (++a, r !== 0 || a !== i) { r >= a && (a = Math.max(a, 1), r = a - 1); const o = this.getValueSize(); this.times = n.slice(r, a), this.values = this.values.slice(r * o, a * o) } return this } validate() { let e = !0; const t = this.getValueSize(); t - Math.floor(t) !== 0 && (Ce("KeyframeTrack: Invalid value size in track.", this), e = !1); const n = this.times, i = this.values, r = n.length; r === 0 && (Ce("KeyframeTrack: Track is empty.", this), e = !1); let a = null; for (let o = 0; o !== r; o++) { const l = n[o]; if (typeof l == "number" && isNaN(l)) { Ce("KeyframeTrack: Time is not a valid number.", this, o, l), e = !1; break } if (a !== null && a > l) { Ce("KeyframeTrack: Out of order keys.", this, o, l, a), e = !1; break } a = l } if (i !== void 0 && ru(i)) for (let o = 0, l = i.length; o !== l; ++o) { const c = i[o]; if (isNaN(c)) { Ce("KeyframeTrack: Value is not a valid number.", this, o, c), e = !1; break } } return e } optimize() { const e = this.times.slice(), t = this.values.slice(), n = this.getValueSize(), i = this.getInterpolation() === Nr, r = e.length - 1; let a = 1; for (let o = 1; o < r; ++o) { let l = !1; const c = e[o], h = e[o + 1]; if (c !== h && (o !== 1 || c !== e[0])) if (i) l = !0; else { const d = o * n, u = d - n, f = d + n; for (let g = 0; g !== n; ++g) { const v = t[d + g]; if (v !== t[u + g] || v !== t[f + g]) { l = !0; break } } } if (l) { if (o !== a) { e[a] = e[o]; const d = o * n, u = a * n; for (let f = 0; f !== n; ++f)t[u + f] = t[d + f] } ++a } } if (r > 0) { e[a] = e[r]; for (let o = r * n, l = a * n, c = 0; c !== n; ++c)t[l + c] = t[o + c]; ++a } return a !== e.length ? (this.times = e.slice(0, a), this.values = t.slice(0, a * n)) : (this.times = e, this.values = t), this } clone() { const e = this.times.slice(), t = this.values.slice(), n = this.constructor, i = new n(this.name, e, t); return i.createInterpolant = this.createInterpolant, i } } ln.prototype.ValueTypeName = ""; ln.prototype.TimeBufferType = Float32Array; ln.prototype.ValueBufferType = Float32Array; ln.prototype.DefaultInterpolation = Ms; class qi extends ln { constructor(e, t, n) { super(e, t, n) } } qi.prototype.ValueTypeName = "bool"; qi.prototype.ValueBufferType = Array; qi.prototype.DefaultInterpolation = vs; qi.prototype.InterpolantFactoryMethodLinear = void 0; qi.prototype.InterpolantFactoryMethodSmooth = void 0; class th extends ln { constructor(e, t, n, i) { super(e, t, n, i) } } th.prototype.ValueTypeName = "color"; class Hi extends ln { constructor(e, t, n, i) { super(e, t, n, i) } } Hi.prototype.ValueTypeName = "number"; class gd extends Yi { constructor(e, t, n, i) { super(e, t, n, i) } interpolate_(e, t, n, i) { const r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, l = (n - t) / (i - t); let c = e * o; for (let h = c + o; c !== h; c += 4)an.slerpFlat(r, 0, a, c - o, a, c, l); return r } } class Gi extends ln { constructor(e, t, n, i) { super(e, t, n, i) } InterpolantFactoryMethodLinear(e) { return new gd(this.times, this.values, this.getValueSize(), e) } } Gi.prototype.ValueTypeName = "quaternion"; Gi.prototype.InterpolantFactoryMethodSmooth = void 0; class $i extends ln { constructor(e, t, n) { super(e, t, n) } } $i.prototype.ValueTypeName = "string"; $i.prototype.ValueBufferType = Array; $i.prototype.DefaultInterpolation = vs; $i.prototype.InterpolantFactoryMethodLinear = void 0; $i.prototype.InterpolantFactoryMethodSmooth = void 0; class Wi extends ln { constructor(e, t, n, i) { super(e, t, n, i) } } Wi.prototype.ValueTypeName = "vector"; class _d { constructor(e = "", t = -1, n = [], i = $h) { this.name = e, this.tracks = n, this.duration = t, this.blendMode = i, this.uuid = sn(), this.userData = {}, this.duration < 0 && this.resetDuration() } static parse(e) { const t = [], n = e.tracks, i = 1 / (e.fps || 1); for (let a = 0, o = n.length; a !== o; ++a)t.push(vd(n[a]).scale(i)); const r = new this(e.name, e.duration, t, e.blendMode); return r.uuid = e.uuid, r.userData = JSON.parse(e.userData || "{}"), r } static toJSON(e) { const t = [], n = e.tracks, i = { name: e.name, duration: e.duration, tracks: t, uuid: e.uuid, blendMode: e.blendMode, userData: JSON.stringify(e.userData) }; for (let r = 0, a = n.length; r !== a; ++r)t.push(ln.toJSON(n[r])); return i } static CreateFromMorphTargetSequence(e, t, n, i) { const r = t.length, a = []; for (let o = 0; o < r; o++) { let l = [], c = []; l.push((o + r - 1) % r, o, (o + 1) % r), c.push(0, 1, 0); const h = ud(l); l = Vl(l, 1, h), c = Vl(c, 1, h), !i && l[0] === 0 && (l.push(r), c.push(c[0])), a.push(new Hi(".morphTargetInfluences[" + t[o].name + "]", l, c).scale(1 / n)) } return new this(e, -1, a) } static findByName(e, t) { let n = e; if (!Array.isArray(e)) { const i = e; n = i.geometry && i.geometry.animations || i.animations } for (let i = 0; i < n.length; i++)if (n[i].name === t) return n[i]; return null } static CreateClipsFromMorphTargetSequences(e, t, n) { const i = {}, r = /^([\w-]*?)([\d]+)$/; for (let o = 0, l = e.length; o < l; o++) { const c = e[o], h = c.name.match(r); if (h && h.length > 1) { const d = h[1]; let u = i[d]; u || (i[d] = u = []), u.push(c) } } const a = []; for (const o in i) a.push(this.CreateFromMorphTargetSequence(o, i[o], t, n)); return a } static parseAnimation(e, t) { if (Ee("AnimationClip: parseAnimation() is deprecated and will be removed with r185"), !e) return Ce("AnimationClip: No animation in JSONLoader data."), null; const n = function (d, u, f, g, v) { if (f.length !== 0) { const m = [], p = []; eh(f, m, p, g), m.length !== 0 && v.push(new d(u, m, p)) } }, i = [], r = e.name || "default", a = e.fps || 30, o = e.blendMode; let l = e.length || -1; const c = e.hierarchy || []; for (let d = 0; d < c.length; d++) { const u = c[d].keys; if (!(!u || u.length === 0)) if (u[0].morphTargets) { const f = {}; let g; for (g = 0; g < u.length; g++)if (u[g].morphTargets) for (let v = 0; v < u[g].morphTargets.length; v++)f[u[g].morphTargets[v]] = -1; for (const v in f) { const m = [], p = []; for (let M = 0; M !== u[g].morphTargets.length; ++M) { const E = u[g]; m.push(E.time), p.push(E.morphTarget === v ? 1 : 0) } i.push(new Hi(".morphTargetInfluence[" + v + "]", m, p)) } l = f.length * a } else { const f = ".bones[" + t[d].name + "]"; n(Wi, f + ".position", u, "pos", i), n(Gi, f + ".quaternion", u, "rot", i), n(Wi, f + ".scale", u, "scl", i) } } return i.length === 0 ? null : new this(r, l, i, o) } resetDuration() { const e = this.tracks; let t = 0; for (let n = 0, i = e.length; n !== i; ++n) { const r = this.tracks[n]; t = Math.max(t, r.times[r.times.length - 1]) } return this.duration = t, this } trim() { for (let e = 0; e < this.tracks.length; e++)this.tracks[e].trim(0, this.duration); return this } validate() { let e = !0; for (let t = 0; t < this.tracks.length; t++)e = e && this.tracks[t].validate(); return e } optimize() { for (let e = 0; e < this.tracks.length; e++)this.tracks[e].optimize(); return this } clone() { const e = []; for (let n = 0; n < this.tracks.length; n++)e.push(this.tracks[n].clone()); const t = new this.constructor(this.name, this.duration, e, this.blendMode); return t.userData = JSON.parse(JSON.stringify(this.userData)), t } toJSON() { return this.constructor.toJSON(this) } } function xd(s) { switch (s.toLowerCase()) { case "scalar": case "double": case "float": case "number": case "integer": return Hi; case "vector": case "vector2": case "vector3": case "vector4": return Wi; case "color": return th; case "quaternion": return Gi; case "bool": case "boolean": return qi; case "string": return $i }throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + s) } function vd(s) { if (s.type === void 0) throw new Error("THREE.KeyframeTrack: track type undefined, can not parse"); const e = xd(s.type); if (s.times === void 0) { const t = [], n = []; eh(s.keys, t, n, "value"), s.times = t, s.values = n } return e.parse !== void 0 ? e.parse(s) : new e(s.name, s.times, s.values, s.interpolation) } const In = { enabled: !1, files: {}, add: function (s, e) { this.enabled !== !1 && (Hl(s) || (this.files[s] = e)) }, get: function (s) { if (this.enabled !== !1 && !Hl(s)) return this.files[s] }, remove: function (s) { delete this.files[s] }, clear: function () { this.files = {} } }; function Hl(s) { try { const e = s.slice(s.indexOf(":") + 1); return new URL(e).protocol === "blob:" } catch { return !1 } } class Md { constructor(e, t, n) { const i = this; let r = !1, a = 0, o = 0, l; const c = []; this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = n, this._abortController = null, this.itemStart = function (h) { o++, r === !1 && i.onStart !== void 0 && i.onStart(h, a, o), r = !0 }, this.itemEnd = function (h) { a++, i.onProgress !== void 0 && i.onProgress(h, a, o), a === o && (r = !1, i.onLoad !== void 0 && i.onLoad()) }, this.itemError = function (h) { i.onError !== void 0 && i.onError(h) }, this.resolveURL = function (h) { return l ? l(h) : h }, this.setURLModifier = function (h) { return l = h, this }, this.addHandler = function (h, d) { return c.push(h, d), this }, this.removeHandler = function (h) { const d = c.indexOf(h); return d !== -1 && c.splice(d, 2), this }, this.getHandler = function (h) { for (let d = 0, u = c.length; d < u; d += 2) { const f = c[d], g = c[d + 1]; if (f.global && (f.lastIndex = 0), f.test(h)) return g } return null }, this.abort = function () { return this.abortController.abort(), this._abortController = null, this } } get abortController() { return this._abortController || (this._abortController = new AbortController), this._abortController } } const Sd = new Md; class Ki { constructor(e) { this.manager = e !== void 0 ? e : Sd, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this })) } load() { } loadAsync(e, t) { const n = this; return new Promise(function (i, r) { n.load(e, i, t, r) }) } parse() { } setCrossOrigin(e) { return this.crossOrigin = e, this } setWithCredentials(e) { return this.withCredentials = e, this } setPath(e) { return this.path = e, this } setResourcePath(e) { return this.resourcePath = e, this } setRequestHeader(e) { return this.requestHeader = e, this } abort() { return this } } Ki.DEFAULT_MATERIAL_NAME = "__DEFAULT"; const Cn = {}; class yd extends Error { constructor(e, t) { super(e), this.response = t } } class nh extends Ki { constructor(e) { super(e), this.mimeType = "", this.responseType = "", this._abortController = new AbortController } load(e, t, n, i) { e === void 0 && (e = ""), this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e); const r = In.get(`file:${e}`); if (r !== void 0) return this.manager.itemStart(e), setTimeout(() => { t && t(r), this.manager.itemEnd(e) }, 0), r; if (Cn[e] !== void 0) { Cn[e].push({ onLoad: t, onProgress: n, onError: i }); return } Cn[e] = [], Cn[e].push({ onLoad: t, onProgress: n, onError: i }); const a = new Request(e, { headers: new Headers(this.requestHeader), credentials: this.withCredentials ? "include" : "same-origin", signal: typeof AbortSignal.any == "function" ? AbortSignal.any([this._abortController.signal, this.manager.abortController.signal]) : this._abortController.signal }), o = this.mimeType, l = this.responseType; fetch(a).then(c => { if (c.status === 200 || c.status === 0) { if (c.status === 0 && Ee("FileLoader: HTTP Status 0 received."), typeof ReadableStream > "u" || c.body === void 0 || c.body.getReader === void 0) return c; const h = Cn[e], d = c.body.getReader(), u = c.headers.get("X-File-Size") || c.headers.get("Content-Length"), f = u ? parseInt(u) : 0, g = f !== 0; let v = 0; const m = new ReadableStream({ start(p) { M(); function M() { d.read().then(({ done: E, value: y }) => { if (E) p.close(); else { v += y.byteLength; const w = new ProgressEvent("progress", { lengthComputable: g, loaded: v, total: f }); for (let A = 0, C = h.length; A < C; A++) { const x = h[A]; x.onProgress && x.onProgress(w) } p.enqueue(y), M() } }, E => { p.error(E) }) } } }); return new Response(m) } else throw new yd(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`, c) }).then(c => { switch (l) { case "arraybuffer": return c.arrayBuffer(); case "blob": return c.blob(); case "document": return c.text().then(h => new DOMParser().parseFromString(h, o)); case "json": return c.json(); default: if (o === "") return c.text(); { const d = /charset="?([^;"\s]*)"?/i.exec(o), u = d && d[1] ? d[1].toLowerCase() : void 0, f = new TextDecoder(u); return c.arrayBuffer().then(g => f.decode(g)) } } }).then(c => { In.add(`file:${e}`, c); const h = Cn[e]; delete Cn[e]; for (let d = 0, u = h.length; d < u; d++) { const f = h[d]; f.onLoad && f.onLoad(c) } }).catch(c => { const h = Cn[e]; if (h === void 0) throw this.manager.itemError(e), c; delete Cn[e]; for (let d = 0, u = h.length; d < u; d++) { const f = h[d]; f.onError && f.onError(c) } this.manager.itemError(e) }).finally(() => { this.manager.itemEnd(e) }), this.manager.itemStart(e) } setResponseType(e) { return this.responseType = e, this } setMimeType(e) { return this.mimeType = e, this } abort() { return this._abortController.abort(), this._abortController = new AbortController, this } } const Ri = new WeakMap; class bd extends Ki { constructor(e) { super(e) } load(e, t, n, i) { this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e); const r = this, a = In.get(`image:${e}`); if (a !== void 0) { if (a.complete === !0) r.manager.itemStart(e), setTimeout(function () { t && t(a), r.manager.itemEnd(e) }, 0); else { let d = Ri.get(a); d === void 0 && (d = [], Ri.set(a, d)), d.push({ onLoad: t, onError: i }) } return a } const o = ys("img"); function l() { h(), t && t(this); const d = Ri.get(this) || []; for (let u = 0; u < d.length; u++) { const f = d[u]; f.onLoad && f.onLoad(this) } Ri.delete(this), r.manager.itemEnd(e) } function c(d) { h(), i && i(d), In.remove(`image:${e}`); const u = Ri.get(this) || []; for (let f = 0; f < u.length; f++) { const g = u[f]; g.onError && g.onError(d) } Ri.delete(this), r.manager.itemError(e), r.manager.itemEnd(e) } function h() { o.removeEventListener("load", l, !1), o.removeEventListener("error", c, !1) } return o.addEventListener("load", l, !1), o.addEventListener("error", c, !1), e.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (o.crossOrigin = this.crossOrigin), In.add(`image:${e}`, o), r.manager.itemStart(e), o.src = e, o } } class ih extends Ki { constructor(e) { super(e) } load(e, t, n, i) { const r = new Et, a = new bd(this.manager); return a.setCrossOrigin(this.crossOrigin), a.setPath(this.path), a.load(e, function (o) { r.image = o, r.needsUpdate = !0, t !== void 0 && t(r) }, n, i), r } } class Tr extends ct { constructor(e, t = 1) { super(), this.isLight = !0, this.type = "Light", this.color = new Ae(e), this.intensity = t } dispose() { this.dispatchEvent({ type: "dispose" }) } copy(e, t) { return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this } toJSON(e) { const t = super.toJSON(e); return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, t } } const aa = new Ue, Gl = new L, Wl = new L; class ko { constructor(e) { this.camera = e, this.intensity = 1, this.bias = 0, this.biasNode = null, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new Ge(512, 512), this.mapType = Ht, this.map = null, this.mapPass = null, this.matrix = new Ue, this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Uo, this._frameExtents = new Ge(1, 1), this._viewportCount = 1, this._viewports = [new ot(0, 0, 1, 1)] } getViewportCount() { return this._viewportCount } getFrustum() { return this._frustum } updateMatrices(e) { const t = this.camera, n = this.matrix; Gl.setFromMatrixPosition(e.matrixWorld), t.position.copy(Gl), Wl.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(Wl), t.updateMatrixWorld(), aa.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix(aa, t.coordinateSystem, t.reversedDepth), t.coordinateSystem === Ss || t.reversedDepth ? n.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, 1, 0, 0, 0, 0, 1) : n.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), n.multiply(aa) } getViewport(e) { return this._viewports[e] } getFrameExtents() { return this._frameExtents } dispose() { this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose() } copy(e) { return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.autoUpdate = e.autoUpdate, this.needsUpdate = e.needsUpdate, this.normalBias = e.normalBias, this.blurSamples = e.blurSamples, this.mapSize.copy(e.mapSize), this.biasNode = e.biasNode, this } clone() { return new this.constructor().copy(this) } toJSON() { const e = {}; return this.intensity !== 1 && (e.intensity = this.intensity), this.bias !== 0 && (e.bias = this.bias), this.normalBias !== 0 && (e.normalBias = this.normalBias), this.radius !== 1 && (e.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e } } const ir = new L, sr = new an, hn = new L; class sh extends ct { constructor() { super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new Ue, this.projectionMatrix = new Ue, this.projectionMatrixInverse = new Ue, this.coordinateSystem = mn, this._reversedDepth = !1 } get reversedDepth() { return this._reversedDepth } copy(e, t) { return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this } getWorldDirection(e) { return super.getWorldDirection(e).negate() } updateMatrixWorld(e) { super.updateMatrixWorld(e), this.matrixWorld.decompose(ir, sr, hn), hn.x === 1 && hn.y === 1 && hn.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(ir, sr, hn.set(1, 1, 1)).invert() } updateWorldMatrix(e, t) { super.updateWorldMatrix(e, t), this.matrixWorld.decompose(ir, sr, hn), hn.x === 1 && hn.y === 1 && hn.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(ir, sr, hn.set(1, 1, 1)).invert() } clone() { return new this.constructor().copy(this) } } const qn = new L, Xl = new Ge, Yl = new Ge; class Ut extends sh { constructor(e = 50, t = 1, n = .1, i = 2e3) { super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = i, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix() } copy(e, t) { return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this } setFocalLength(e) { const t = .5 * this.getFilmHeight() / e; this.fov = ki * 2 * Math.atan(t), this.updateProjectionMatrix() } getFocalLength() { const e = Math.tan(ds * .5 * this.fov); return .5 * this.getFilmHeight() / e } getEffectiveFOV() { return ki * 2 * Math.atan(Math.tan(ds * .5 * this.fov) / this.zoom) } getFilmWidth() { return this.filmGauge * Math.min(this.aspect, 1) } getFilmHeight() { return this.filmGauge / Math.max(this.aspect, 1) } getViewBounds(e, t, n) { qn.set(-1, -1, .5).applyMatrix4(this.projectionMatrixInverse), t.set(qn.x, qn.y).multiplyScalar(-e / qn.z), qn.set(1, 1, .5).applyMatrix4(this.projectionMatrixInverse), n.set(qn.x, qn.y).multiplyScalar(-e / qn.z) } getViewSize(e, t) { return this.getViewBounds(e, Xl, Yl), t.subVectors(Yl, Xl) } setViewOffset(e, t, n, i, r, a) { this.aspect = e / t, this.view === null && (this.view = { enabled: !0, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = i, this.view.width = r, this.view.height = a, this.updateProjectionMatrix() } clearViewOffset() { this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix() } updateProjectionMatrix() { const e = this.near; let t = e * Math.tan(ds * .5 * this.fov) / this.zoom, n = 2 * t, i = this.aspect * n, r = -.5 * i; const a = this.view; if (this.view !== null && this.view.enabled) { const l = a.fullWidth, c = a.fullHeight; r += a.offsetX * i / l, t -= a.offsetY * n / c, i *= a.width / l, n *= a.height / c } const o = this.filmOffset; o !== 0 && (r += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + i, t, t - n, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert() } toJSON(e) { const t = super.toJSON(e); return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t } } class Ed extends ko { constructor() { super(new Ut(50, 1, .5, 500)), this.isSpotLightShadow = !0, this.focus = 1, this.aspect = 1 } updateMatrices(e) { const t = this.camera, n = ki * 2 * e.angle * this.focus, i = this.mapSize.width / this.mapSize.height * this.aspect, r = e.distance || t.far; (n !== t.fov || i !== t.aspect || r !== t.far) && (t.fov = n, t.aspect = i, t.far = r, t.updateProjectionMatrix()), super.updateMatrices(e) } copy(e) { return super.copy(e), this.focus = e.focus, this } } class Td extends Tr { constructor(e, t, n = 0, i = Math.PI / 3, r = 0, a = 2) { super(e, t), this.isSpotLight = !0, this.type = "SpotLight", this.position.copy(ct.DEFAULT_UP), this.updateMatrix(), this.target = new ct, this.distance = n, this.angle = i, this.penumbra = r, this.decay = a, this.map = null, this.shadow = new Ed } get power() { return this.intensity * Math.PI } set power(e) { this.intensity = e / Math.PI } dispose() { super.dispose(), this.shadow.dispose() } copy(e, t) { return super.copy(e, t), this.distance = e.distance, this.angle = e.angle, this.penumbra = e.penumbra, this.decay = e.decay, this.target = e.target.clone(), this.map = e.map, this.shadow = e.shadow.clone(), this } toJSON(e) { const t = super.toJSON(e); return t.object.distance = this.distance, t.object.angle = this.angle, t.object.decay = this.decay, t.object.penumbra = this.penumbra, t.object.target = this.target.uuid, this.map && this.map.isTexture && (t.object.map = this.map.toJSON(e).uuid), t.object.shadow = this.shadow.toJSON(), t } } class Ad extends ko { constructor() { super(new Ut(90, 1, .5, 500)), this.isPointLightShadow = !0 } } class wd extends Tr { constructor(e, t, n = 0, i = 2) { super(e, t), this.isPointLight = !0, this.type = "PointLight", this.distance = n, this.decay = i, this.shadow = new Ad } get power() { return this.intensity * 4 * Math.PI } set power(e) { this.intensity = e / (4 * Math.PI) } dispose() { super.dispose(), this.shadow.dispose() } copy(e, t) { return super.copy(e, t), this.distance = e.distance, this.decay = e.decay, this.shadow = e.shadow.clone(), this } toJSON(e) { const t = super.toJSON(e); return t.object.distance = this.distance, t.object.decay = this.decay, t.object.shadow = this.shadow.toJSON(), t } } class Ar extends sh { constructor(e = -1, t = 1, n = 1, i = -1, r = .1, a = 2e3) { super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = i, this.near = r, this.far = a, this.updateProjectionMatrix() } copy(e, t) { return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this } setViewOffset(e, t, n, i, r, a) { this.view === null && (this.view = { enabled: !0, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = i, this.view.width = r, this.view.height = a, this.updateProjectionMatrix() } clearViewOffset() { this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix() } updateProjectionMatrix() { const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, i = (this.top + this.bottom) / 2; let r = n - e, a = n + e, o = i + t, l = i - t; if (this.view !== null && this.view.enabled) { const c = (this.right - this.left) / this.view.fullWidth / this.zoom, h = (this.top - this.bottom) / this.view.fullHeight / this.zoom; r += c * this.view.offsetX, a = r + c * this.view.width, o -= h * this.view.offsetY, l = o - h * this.view.height } this.projectionMatrix.makeOrthographic(r, a, o, l, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert() } toJSON(e) { const t = super.toJSON(e); return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t } } class Rd extends ko { constructor() { super(new Ar(-5, 5, 5, -5, .5, 500)), this.isDirectionalLightShadow = !0 } } class pr extends Tr { constructor(e, t) { super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(ct.DEFAULT_UP), this.updateMatrix(), this.target = new ct, this.shadow = new Rd } dispose() { super.dispose(), this.shadow.dispose() } copy(e) { return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this } toJSON(e) { const t = super.toJSON(e); return t.object.shadow = this.shadow.toJSON(), t.object.target = this.target.uuid, t } } class Cd extends Tr { constructor(e, t) { super(e, t), this.isAmbientLight = !0, this.type = "AmbientLight" } } class ps { static extractUrlBase(e) { const t = e.lastIndexOf("/"); return t === -1 ? "./" : e.slice(0, t + 1) } static resolveURL(e, t) { return typeof e != "string" || e === "" ? "" : (/^https?:\/\//i.test(t) && /^\//.test(e) && (t = t.replace(/(^https?:\/\/[^\/]+).*/i, "$1")), /^(https?:)?\/\//i.test(e) || /^data:.*,.*$/i.test(e) || /^blob:.*$/i.test(e) ? e : t + e) } } const oa = new WeakMap; class Pd extends Ki { constructor(e) { super(e), this.isImageBitmapLoader = !0, typeof createImageBitmap > "u" && Ee("ImageBitmapLoader: createImageBitmap() not supported."), typeof fetch > "u" && Ee("ImageBitmapLoader: fetch() not supported."), this.options = { premultiplyAlpha: "none" }, this._abortController = new AbortController } setOptions(e) { return this.options = e, this } load(e, t, n, i) { e === void 0 && (e = ""), this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e); const r = this, a = In.get(`image-bitmap:${e}`); if (a !== void 0) { if (r.manager.itemStart(e), a.then) { a.then(c => { if (oa.has(a) === !0) i && i(oa.get(a)), r.manager.itemError(e), r.manager.itemEnd(e); else return t && t(c), r.manager.itemEnd(e), c }); return } return setTimeout(function () { t && t(a), r.manager.itemEnd(e) }, 0), a } const o = {}; o.credentials = this.crossOrigin === "anonymous" ? "same-origin" : "include", o.headers = this.requestHeader, o.signal = typeof AbortSignal.any == "function" ? AbortSignal.any([this._abortController.signal, this.manager.abortController.signal]) : this._abortController.signal; const l = fetch(e, o).then(function (c) { return c.blob() }).then(function (c) { return createImageBitmap(c, Object.assign(r.options, { colorSpaceConversion: "none" })) }).then(function (c) { return In.add(`image-bitmap:${e}`, c), t && t(c), r.manager.itemEnd(e), c }).catch(function (c) { i && i(c), oa.set(l, c), In.remove(`image-bitmap:${e}`), r.manager.itemError(e), r.manager.itemEnd(e) }); In.add(`image-bitmap:${e}`, l), r.manager.itemStart(e) } abort() { return this._abortController.abort(), this._abortController = new AbortController, this } } const Ci = -90, Pi = 1; class Ld extends ct { constructor(e, t, n) { super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0; const i = new Ut(Ci, Pi, e, t); i.layers = this.layers, this.add(i); const r = new Ut(Ci, Pi, e, t); r.layers = this.layers, this.add(r); const a = new Ut(Ci, Pi, e, t); a.layers = this.layers, this.add(a); const o = new Ut(Ci, Pi, e, t); o.layers = this.layers, this.add(o); const l = new Ut(Ci, Pi, e, t); l.layers = this.layers, this.add(l); const c = new Ut(Ci, Pi, e, t); c.layers = this.layers, this.add(c) } updateCoordinateSystem() { const e = this.coordinateSystem, t = this.children.concat(), [n, i, r, a, o, l] = t; for (const c of t) this.remove(c); if (e === mn) n.up.set(0, 1, 0), n.lookAt(1, 0, 0), i.up.set(0, 1, 0), i.lookAt(-1, 0, 0), r.up.set(0, 0, -1), r.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1); else if (e === Ss) n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), i.up.set(0, -1, 0), i.lookAt(1, 0, 0), r.up.set(0, 0, 1), r.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), l.up.set(0, -1, 0), l.lookAt(0, 0, -1); else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e); for (const c of t) this.add(c), c.updateMatrixWorld() } update(e, t) { this.parent === null && this.updateMatrixWorld(); const { renderTarget: n, activeMipmapLevel: i } = this; this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem()); const [r, a, o, l, c, h] = this.children, d = e.getRenderTarget(), u = e.getActiveCubeFace(), f = e.getActiveMipmapLevel(), g = e.xr.enabled; e.xr.enabled = !1; const v = n.texture.generateMipmaps; n.texture.generateMipmaps = !1; let m = !1; e.isWebGLRenderer === !0 ? m = e.state.buffers.depth.getReversed() : m = e.reversedDepthBuffer, e.setRenderTarget(n, 0, i), m && e.autoClear === !1 && e.clearDepth(), e.render(t, r), e.setRenderTarget(n, 1, i), m && e.autoClear === !1 && e.clearDepth(), e.render(t, a), e.setRenderTarget(n, 2, i), m && e.autoClear === !1 && e.clearDepth(), e.render(t, o), e.setRenderTarget(n, 3, i), m && e.autoClear === !1 && e.clearDepth(), e.render(t, l), e.setRenderTarget(n, 4, i), m && e.autoClear === !1 && e.clearDepth(), e.render(t, c), n.texture.generateMipmaps = v, e.setRenderTarget(n, 5, i), m && e.autoClear === !1 && e.clearDepth(), e.render(t, h), e.setRenderTarget(d, u, f), e.xr.enabled = g, n.texture.needsPMREMUpdate = !0 } } class Id extends Ut { constructor(e = []) { super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e } } const Vo = "\\[\\]\\.:\\/", Dd = new RegExp("[" + Vo + "]", "g"), Ho = "[^" + Vo + "]", Nd = "[^" + Vo.replace("\\.", "") + "]", Ud = /((?:WC+[\/:])*)/.source.replace("WC", Ho), Fd = /(WCOD+)?/.source.replace("WCOD", Nd), Od = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Ho), Bd = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Ho), zd = new RegExp("^" + Ud + Fd + Od + Bd + "$"), kd = ["material", "materials", "bones", "map"]; class Vd { constructor(e, t, n) { const i = n || Je.parseTrackName(t); this._targetGroup = e, this._bindings = e.subscribe_(t, i) } getValue(e, t) { this.bind(); const n = this._targetGroup.nCachedObjects_, i = this._bindings[n]; i !== void 0 && i.getValue(e, t) } setValue(e, t) { const n = this._bindings; for (let i = this._targetGroup.nCachedObjects_, r = n.length; i !== r; ++i)n[i].setValue(e, t) } bind() { const e = this._bindings; for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t)e[t].bind() } unbind() { const e = this._bindings; for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t)e[t].unbind() } } class Je { constructor(e, t, n) { this.path = t, this.parsedPath = n || Je.parseTrackName(t), this.node = Je.findNode(e, this.parsedPath.nodeName), this.rootNode = e, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound } static create(e, t, n) { return e && e.isAnimationObjectGroup ? new Je.Composite(e, t, n) : new Je(e, t, n) } static sanitizeNodeName(e) { return e.replace(/\s/g, "_").replace(Dd, "") } static parseTrackName(e) { const t = zd.exec(e); if (t === null) throw new Error("PropertyBinding: Cannot parse trackName: " + e); const n = { nodeName: t[2], objectName: t[3], objectIndex: t[4], propertyName: t[5], propertyIndex: t[6] }, i = n.nodeName && n.nodeName.lastIndexOf("."); if (i !== void 0 && i !== -1) { const r = n.nodeName.substring(i + 1); kd.indexOf(r) !== -1 && (n.nodeName = n.nodeName.substring(0, i), n.objectName = r) } if (n.propertyName === null || n.propertyName.length === 0) throw new Error("PropertyBinding: can not parse propertyName from trackName: " + e); return n } static findNode(e, t) { if (t === void 0 || t === "" || t === "." || t === -1 || t === e.name || t === e.uuid) return e; if (e.skeleton) { const n = e.skeleton.getBoneByName(t); if (n !== void 0) return n } if (e.children) { const n = function (r) { for (let a = 0; a < r.length; a++) { const o = r[a]; if (o.name === t || o.uuid === t) return o; const l = n(o.children); if (l) return l } return null }, i = n(e.children); if (i) return i } return null } _getValue_unavailable() { } _setValue_unavailable() { } _getValue_direct(e, t) { e[t] = this.targetObject[this.propertyName] } _getValue_array(e, t) { const n = this.resolvedProperty; for (let i = 0, r = n.length; i !== r; ++i)e[t++] = n[i] } _getValue_arrayElement(e, t) { e[t] = this.resolvedProperty[this.propertyIndex] } _getValue_toArray(e, t) { this.resolvedProperty.toArray(e, t) } _setValue_direct(e, t) { this.targetObject[this.propertyName] = e[t] } _setValue_direct_setNeedsUpdate(e, t) { this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = !0 } _setValue_direct_setMatrixWorldNeedsUpdate(e, t) { this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0 } _setValue_array(e, t) { const n = this.resolvedProperty; for (let i = 0, r = n.length; i !== r; ++i)n[i] = e[t++] } _setValue_array_setNeedsUpdate(e, t) { const n = this.resolvedProperty; for (let i = 0, r = n.length; i !== r; ++i)n[i] = e[t++]; this.targetObject.needsUpdate = !0 } _setValue_array_setMatrixWorldNeedsUpdate(e, t) { const n = this.resolvedProperty; for (let i = 0, r = n.length; i !== r; ++i)n[i] = e[t++]; this.targetObject.matrixWorldNeedsUpdate = !0 } _setValue_arrayElement(e, t) { this.resolvedProperty[this.propertyIndex] = e[t] } _setValue_arrayElement_setNeedsUpdate(e, t) { this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = !0 } _setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) { this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0 } _setValue_fromArray(e, t) { this.resolvedProperty.fromArray(e, t) } _setValue_fromArray_setNeedsUpdate(e, t) { this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = !0 } _setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) { this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = !0 } _getValue_unbound(e, t) { this.bind(), this.getValue(e, t) } _setValue_unbound(e, t) { this.bind(), this.setValue(e, t) } bind() { let e = this.node; const t = this.parsedPath, n = t.objectName, i = t.propertyName; let r = t.propertyIndex; if (e || (e = Je.findNode(this.rootNode, t.nodeName), this.node = e), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !e) { Ee("PropertyBinding: No target node found for track: " + this.path + "."); return } if (n) { let c = t.objectIndex; switch (n) { case "materials": if (!e.material) { Ce("PropertyBinding: Can not bind to material as node does not have a material.", this); return } if (!e.material.materials) { Ce("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this); return } e = e.material.materials; break; case "bones": if (!e.skeleton) { Ce("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this); return } e = e.skeleton.bones; for (let h = 0; h < e.length; h++)if (e[h].name === c) { c = h; break } break; case "map": if ("map" in e) { e = e.map; break } if (!e.material) { Ce("PropertyBinding: Can not bind to material as node does not have a material.", this); return } if (!e.material.map) { Ce("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this); return } e = e.material.map; break; default: if (e[n] === void 0) { Ce("PropertyBinding: Can not bind to objectName of node undefined.", this); return } e = e[n] }if (c !== void 0) { if (e[c] === void 0) { Ce("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, e); return } e = e[c] } } const a = e[i]; if (a === void 0) { const c = t.nodeName; Ce("PropertyBinding: Trying to update property for track: " + c + "." + i + " but it wasn't found.", e); return } let o = this.Versioning.None; this.targetObject = e, e.isMaterial === !0 ? o = this.Versioning.NeedsUpdate : e.isObject3D === !0 && (o = this.Versioning.MatrixWorldNeedsUpdate); let l = this.BindingType.Direct; if (r !== void 0) { if (i === "morphTargetInfluences") { if (!e.geometry) { Ce("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this); return } if (!e.geometry.morphAttributes) { Ce("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this); return } e.morphTargetDictionary[r] !== void 0 && (r = e.morphTargetDictionary[r]) } l = this.BindingType.ArrayElement, this.resolvedProperty = a, this.propertyIndex = r } else a.fromArray !== void 0 && a.toArray !== void 0 ? (l = this.BindingType.HasFromToArray, this.resolvedProperty = a) : Array.isArray(a) ? (l = this.BindingType.EntireArray, this.resolvedProperty = a) : this.propertyName = i; this.getValue = this.GetterByBindingType[l], this.setValue = this.SetterByBindingTypeAndVersioning[l][o] } unbind() { this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound } } Je.Composite = Vd; Je.prototype.BindingType = { Direct: 0, EntireArray: 1, ArrayElement: 2, HasFromToArray: 3 }; Je.prototype.Versioning = { None: 0, NeedsUpdate: 1, MatrixWorldNeedsUpdate: 2 }; Je.prototype.GetterByBindingType = [Je.prototype._getValue_direct, Je.prototype._getValue_array, Je.prototype._getValue_arrayElement, Je.prototype._getValue_toArray]; Je.prototype.SetterByBindingTypeAndVersioning = [[Je.prototype._setValue_direct, Je.prototype._setValue_direct_setNeedsUpdate, Je.prototype._setValue_direct_setMatrixWorldNeedsUpdate], [Je.prototype._setValue_array, Je.prototype._setValue_array_setNeedsUpdate, Je.prototype._setValue_array_setMatrixWorldNeedsUpdate], [Je.prototype._setValue_arrayElement, Je.prototype._setValue_arrayElement_setNeedsUpdate, Je.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate], [Je.prototype._setValue_fromArray, Je.prototype._setValue_fromArray_setNeedsUpdate, Je.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]]; const ql = new L; let rr, la; class Hd extends ct { constructor(e = new L(0, 0, 1), t = new L(0, 0, 0), n = 1, i = 16776960, r = n * .2, a = r * .2) { super(), this.type = "ArrowHelper", rr === void 0 && (rr = new Rt, rr.setAttribute("position", new ut([0, 0, 0, 0, 1, 0], 3)), la = new Oo(.5, 1, 5, 1), la.translate(0, -.5, 0)), this.position.copy(t), this.line = new ws(rr, new br({ color: i, toneMapped: !1 })), this.line.matrixAutoUpdate = !1, this.add(this.line), this.cone = new Tt(la, new nn({ color: i, toneMapped: !1 })), this.cone.matrixAutoUpdate = !1, this.add(this.cone), this.setDirection(e), this.setLength(n, r, a) } setDirection(e) { if (e.y > .99999) this.quaternion.set(0, 0, 0, 1); else if (e.y < -.99999) this.quaternion.set(1, 0, 0, 0); else { ql.set(e.z, 0, -e.x).normalize(); const t = Math.acos(e.y); this.quaternion.setFromAxisAngle(ql, t) } } setLength(e, t = e * .2, n = t * .2) { this.line.scale.set(1, Math.max(1e-4, e - t), 1), this.line.updateMatrix(), this.cone.scale.set(n, t, n), this.cone.position.y = e, this.cone.updateMatrix() } setColor(e) { this.line.material.color.set(e), this.cone.material.color.set(e) } copy(e) { return super.copy(e, !1), this.line.copy(e.line), this.cone.copy(e.cone), this } dispose() { this.line.geometry.dispose(), this.line.material.dispose(), this.cone.geometry.dispose(), this.cone.material.dispose() } } function $l(s, e, t, n) { const i = Gd(n); switch (t) { case kc: return s * e; case bo: return s * e / i.components * i.byteLength; case Eo: return s * e / i.components * i.byteLength; case zi: return s * e * 2 / i.components * i.byteLength; case To: return s * e * 2 / i.components * i.byteLength; case Vc: return s * e * 3 / i.components * i.byteLength; case Yt: return s * e * 4 / i.components * i.byteLength; case Ao: return s * e * 4 / i.components * i.byteLength; case hr: case ur: return Math.floor((s + 3) / 4) * Math.floor((e + 3) / 4) * 8; case dr: case fr: return Math.floor((s + 3) / 4) * Math.floor((e + 3) / 4) * 16; case Pa: case Ia: return Math.max(s, 16) * Math.max(e, 8) / 4; case Ca: case La: return Math.max(s, 8) * Math.max(e, 8) / 2; case Da: case Na: case Fa: case Oa: return Math.floor((s + 3) / 4) * Math.floor((e + 3) / 4) * 8; case Ua: case Ba: case za: return Math.floor((s + 3) / 4) * Math.floor((e + 3) / 4) * 16; case ka: return Math.floor((s + 3) / 4) * Math.floor((e + 3) / 4) * 16; case Va: return Math.floor((s + 4) / 5) * Math.floor((e + 3) / 4) * 16; case Ha: return Math.floor((s + 4) / 5) * Math.floor((e + 4) / 5) * 16; case Ga: return Math.floor((s + 5) / 6) * Math.floor((e + 4) / 5) * 16; case Wa: return Math.floor((s + 5) / 6) * Math.floor((e + 5) / 6) * 16; case Xa: return Math.floor((s + 7) / 8) * Math.floor((e + 4) / 5) * 16; case Ya: return Math.floor((s + 7) / 8) * Math.floor((e + 5) / 6) * 16; case qa: return Math.floor((s + 7) / 8) * Math.floor((e + 7) / 8) * 16; case $a: return Math.floor((s + 9) / 10) * Math.floor((e + 4) / 5) * 16; case Ka: return Math.floor((s + 9) / 10) * Math.floor((e + 5) / 6) * 16; case ja: return Math.floor((s + 9) / 10) * Math.floor((e + 7) / 8) * 16; case Za: return Math.floor((s + 9) / 10) * Math.floor((e + 9) / 10) * 16; case Ja: return Math.floor((s + 11) / 12) * Math.floor((e + 9) / 10) * 16; case Qa: return Math.floor((s + 11) / 12) * Math.floor((e + 11) / 12) * 16; case eo: case to: case no: return Math.ceil(s / 4) * Math.ceil(e / 4) * 16; case io: case so: return Math.ceil(s / 4) * Math.ceil(e / 4) * 8; case ro: case ao: return Math.ceil(s / 4) * Math.ceil(e / 4) * 16 }throw new Error(`Unable to determine texture byte length for ${t} format.`) } function Gd(s) { switch (s) { case Ht: case Fc: return { byteLength: 1, components: 1 }; case _s: case Oc: case On: return { byteLength: 2, components: 1 }; case So: case yo: return { byteLength: 2, components: 4 }; case vn: case Mo: case Xt: return { byteLength: 4, components: 1 }; case Bc: case zc: return { byteLength: 4, components: 3 } }throw new Error(`Unknown texture type ${s}.`) } typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: xo } })); typeof window < "u" && (window.__THREE__ ? Ee("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = xo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function rh() { let s = null, e = !1, t = null, n = null; function i(r, a) { t(r, a), n = s.requestAnimationFrame(i) } return { start: function () { e !== !0 && t !== null && (n = s.requestAnimationFrame(i), e = !0) }, stop: function () { s.cancelAnimationFrame(n), e = !1 }, setAnimationLoop: function (r) { t = r }, setContext: function (r) { s = r } } } function Wd(s) { const e = new WeakMap; function t(o, l) { const c = o.array, h = o.usage, d = c.byteLength, u = s.createBuffer(); s.bindBuffer(l, u), s.bufferData(l, c, h), o.onUploadCallback(); let f; if (c instanceof Float32Array) f = s.FLOAT; else if (typeof Float16Array < "u" && c instanceof Float16Array) f = s.HALF_FLOAT; else if (c instanceof Uint16Array) o.isFloat16BufferAttribute ? f = s.HALF_FLOAT : f = s.UNSIGNED_SHORT; else if (c instanceof Int16Array) f = s.SHORT; else if (c instanceof Uint32Array) f = s.UNSIGNED_INT; else if (c instanceof Int32Array) f = s.INT; else if (c instanceof Int8Array) f = s.BYTE; else if (c instanceof Uint8Array) f = s.UNSIGNED_BYTE; else if (c instanceof Uint8ClampedArray) f = s.UNSIGNED_BYTE; else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c); return { buffer: u, type: f, bytesPerElement: c.BYTES_PER_ELEMENT, version: o.version, size: d } } function n(o, l, c) { const h = l.array, d = l.updateRanges; if (s.bindBuffer(c, o), d.length === 0) s.bufferSubData(c, 0, h); else { d.sort((f, g) => f.start - g.start); let u = 0; for (let f = 1; f < d.length; f++) { const g = d[u], v = d[f]; v.start <= g.start + g.count + 1 ? g.count = Math.max(g.count, v.start + v.count - g.start) : (++u, d[u] = v) } d.length = u + 1; for (let f = 0, g = d.length; f < g; f++) { const v = d[f]; s.bufferSubData(c, v.start * h.BYTES_PER_ELEMENT, h, v.start, v.count) } l.clearUpdateRanges() } l.onUploadCallback() } function i(o) { return o.isInterleavedBufferAttribute && (o = o.data), e.get(o) } function r(o) { o.isInterleavedBufferAttribute && (o = o.data); const l = e.get(o); l && (s.deleteBuffer(l.buffer), e.delete(o)) } function a(o, l) { if (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute) { const h = e.get(o); (!h || h.version < o.version) && e.set(o, { buffer: o.buffer, type: o.type, bytesPerElement: o.elementSize, version: o.version }); return } const c = e.get(o); if (c === void 0) e.set(o, t(o, l)); else if (c.version < o.version) { if (c.size !== o.array.byteLength) throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported."); n(c.buffer, o, l), c.version = o.version } } return { get: i, remove: r, update: a } } var Xd = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, Yd = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, qd = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, $d = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Kd = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, jd = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, Zd = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, Jd = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, Qd = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`, ef = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, tf = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, nf = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, sf = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, rf = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, af = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, of = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, lf = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, cf = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, hf = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, uf = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`, df = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`, ff = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`, pf = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`, mf = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, gf = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, _f = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, xf = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, vf = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, Mf = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, Sf = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, yf = "gl_FragColor = linearToOutputTexel( gl_FragColor );", bf = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, Ef = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`, Tf = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`, Af = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, wf = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, Rf = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, Cf = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Pf = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, Lf = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, If = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, Df = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, Nf = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, Uf = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, Ff = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, Of = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`, Bf = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, zf = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, kf = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, Vf = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, Hf = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, Gf = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, Wf = `uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, Xf = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, Yf = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, qf = `#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, $f = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, Kf = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, jf = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Zf = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, Jf = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, Qf = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, ep = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, tp = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, np = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, ip = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, sp = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, rp = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, ap = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, op = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`, lp = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, cp = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, hp = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, up = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, dp = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, fp = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, pp = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, mp = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, gp = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, _p = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, xp = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, vp = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, Mp = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`, Sp = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, yp = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, bp = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, Ep = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, Tp = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, Ap = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, wp = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`, Rp = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, Cp = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, Pp = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, Lp = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, Ip = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, Dp = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, Np = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, Up = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, Fp = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, Op = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, Bp = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, zp = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, kp = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, Vp = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, Hp = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, Gp = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, Wp = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`; const Xp = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, Yp = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, qp = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, $p = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Kp = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, jp = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Zp = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, Jp = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, Qp = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, em = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`, tm = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, nm = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, im = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, sm = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, rm = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, am = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, om = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, lm = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, cm = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, hm = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, um = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, dm = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, fm = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, pm = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, mm = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, gm = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, _m = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, xm = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, vm = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, Mm = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Sm = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, ym = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, bm = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, Em = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Oe = { alphahash_fragment: Xd, alphahash_pars_fragment: Yd, alphamap_fragment: qd, alphamap_pars_fragment: $d, alphatest_fragment: Kd, alphatest_pars_fragment: jd, aomap_fragment: Zd, aomap_pars_fragment: Jd, batching_pars_vertex: Qd, batching_vertex: ef, begin_vertex: tf, beginnormal_vertex: nf, bsdfs: sf, iridescence_fragment: rf, bumpmap_pars_fragment: af, clipping_planes_fragment: of, clipping_planes_pars_fragment: lf, clipping_planes_pars_vertex: cf, clipping_planes_vertex: hf, color_fragment: uf, color_pars_fragment: df, color_pars_vertex: ff, color_vertex: pf, common: mf, cube_uv_reflection_fragment: gf, defaultnormal_vertex: _f, displacementmap_pars_vertex: xf, displacementmap_vertex: vf, emissivemap_fragment: Mf, emissivemap_pars_fragment: Sf, colorspace_fragment: yf, colorspace_pars_fragment: bf, envmap_fragment: Ef, envmap_common_pars_fragment: Tf, envmap_pars_fragment: Af, envmap_pars_vertex: wf, envmap_physical_pars_fragment: Bf, envmap_vertex: Rf, fog_vertex: Cf, fog_pars_vertex: Pf, fog_fragment: Lf, fog_pars_fragment: If, gradientmap_pars_fragment: Df, lightmap_pars_fragment: Nf, lights_lambert_fragment: Uf, lights_lambert_pars_fragment: Ff, lights_pars_begin: Of, lights_toon_fragment: zf, lights_toon_pars_fragment: kf, lights_phong_fragment: Vf, lights_phong_pars_fragment: Hf, lights_physical_fragment: Gf, lights_physical_pars_fragment: Wf, lights_fragment_begin: Xf, lights_fragment_maps: Yf, lights_fragment_end: qf, logdepthbuf_fragment: $f, logdepthbuf_pars_fragment: Kf, logdepthbuf_pars_vertex: jf, logdepthbuf_vertex: Zf, map_fragment: Jf, map_pars_fragment: Qf, map_particle_fragment: ep, map_particle_pars_fragment: tp, metalnessmap_fragment: np, metalnessmap_pars_fragment: ip, morphinstance_vertex: sp, morphcolor_vertex: rp, morphnormal_vertex: ap, morphtarget_pars_vertex: op, morphtarget_vertex: lp, normal_fragment_begin: cp, normal_fragment_maps: hp, normal_pars_fragment: up, normal_pars_vertex: dp, normal_vertex: fp, normalmap_pars_fragment: pp, clearcoat_normal_fragment_begin: mp, clearcoat_normal_fragment_maps: gp, clearcoat_pars_fragment: _p, iridescence_pars_fragment: xp, opaque_fragment: vp, packing: Mp, premultiplied_alpha_fragment: Sp, project_vertex: yp, dithering_fragment: bp, dithering_pars_fragment: Ep, roughnessmap_fragment: Tp, roughnessmap_pars_fragment: Ap, shadowmap_pars_fragment: wp, shadowmap_pars_vertex: Rp, shadowmap_vertex: Cp, shadowmask_pars_fragment: Pp, skinbase_vertex: Lp, skinning_pars_vertex: Ip, skinning_vertex: Dp, skinnormal_vertex: Np, specularmap_fragment: Up, specularmap_pars_fragment: Fp, tonemapping_fragment: Op, tonemapping_pars_fragment: Bp, transmission_fragment: zp, transmission_pars_fragment: kp, uv_pars_fragment: Vp, uv_pars_vertex: Hp, uv_vertex: Gp, worldpos_vertex: Wp, background_vert: Xp, background_frag: Yp, backgroundCube_vert: qp, backgroundCube_frag: $p, cube_vert: Kp, cube_frag: jp, depth_vert: Zp, depth_frag: Jp, distance_vert: Qp, distance_frag: em, equirect_vert: tm, equirect_frag: nm, linedashed_vert: im, linedashed_frag: sm, meshbasic_vert: rm, meshbasic_frag: am, meshlambert_vert: om, meshlambert_frag: lm, meshmatcap_vert: cm, meshmatcap_frag: hm, meshnormal_vert: um, meshnormal_frag: dm, meshphong_vert: fm, meshphong_frag: pm, meshphysical_vert: mm, meshphysical_frag: gm, meshtoon_vert: _m, meshtoon_frag: xm, points_vert: vm, points_frag: Mm, shadow_vert: Sm, shadow_frag: ym, sprite_vert: bm, sprite_frag: Em }, ae = { common: { diffuse: { value: new Ae(16777215) }, opacity: { value: 1 }, map: { value: null }, mapTransform: { value: new De }, alphaMap: { value: null }, alphaMapTransform: { value: new De }, alphaTest: { value: 0 } }, specularmap: { specularMap: { value: null }, specularMapTransform: { value: new De } }, envmap: { envMap: { value: null }, envMapRotation: { value: new De }, flipEnvMap: { value: -1 }, reflectivity: { value: 1 }, ior: { value: 1.5 }, refractionRatio: { value: .98 }, dfgLUT: { value: null } }, aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 }, aoMapTransform: { value: new De } }, lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 }, lightMapTransform: { value: new De } }, bumpmap: { bumpMap: { value: null }, bumpMapTransform: { value: new De }, bumpScale: { value: 1 } }, normalmap: { normalMap: { value: null }, normalMapTransform: { value: new De }, normalScale: { value: new Ge(1, 1) } }, displacementmap: { displacementMap: { value: null }, displacementMapTransform: { value: new De }, displacementScale: { value: 1 }, displacementBias: { value: 0 } }, emissivemap: { emissiveMap: { value: null }, emissiveMapTransform: { value: new De } }, metalnessmap: { metalnessMap: { value: null }, metalnessMapTransform: { value: new De } }, roughnessmap: { roughnessMap: { value: null }, roughnessMapTransform: { value: new De } }, gradientmap: { gradientMap: { value: null } }, fog: { fogDensity: { value: 25e-5 }, fogNear: { value: 1 }, fogFar: { value: 2e3 }, fogColor: { value: new Ae(16777215) } }, lights: { ambientLightColor: { value: [] }, lightProbe: { value: [] }, directionalLights: { value: [], properties: { direction: {}, color: {} } }, directionalLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, directionalShadowMatrix: { value: [] }, spotLights: { value: [], properties: { color: {}, position: {}, direction: {}, distance: {}, coneCos: {}, penumbraCos: {}, decay: {} } }, spotLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, spotLightMap: { value: [] }, spotLightMatrix: { value: [] }, pointLights: { value: [], properties: { color: {}, position: {}, decay: {}, distance: {} } }, pointLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {}, shadowCameraNear: {}, shadowCameraFar: {} } }, pointShadowMatrix: { value: [] }, hemisphereLights: { value: [], properties: { direction: {}, skyColor: {}, groundColor: {} } }, rectAreaLights: { value: [], properties: { color: {}, position: {}, width: {}, height: {} } }, ltc_1: { value: null }, ltc_2: { value: null } }, points: { diffuse: { value: new Ae(16777215) }, opacity: { value: 1 }, size: { value: 1 }, scale: { value: 1 }, map: { value: null }, alphaMap: { value: null }, alphaMapTransform: { value: new De }, alphaTest: { value: 0 }, uvTransform: { value: new De } }, sprite: { diffuse: { value: new Ae(16777215) }, opacity: { value: 1 }, center: { value: new Ge(.5, .5) }, rotation: { value: 0 }, map: { value: null }, mapTransform: { value: new De }, alphaMap: { value: null }, alphaMapTransform: { value: new De }, alphaTest: { value: 0 } } }, fn = { basic: { uniforms: Nt([ae.common, ae.specularmap, ae.envmap, ae.aomap, ae.lightmap, ae.fog]), vertexShader: Oe.meshbasic_vert, fragmentShader: Oe.meshbasic_frag }, lambert: { uniforms: Nt([ae.common, ae.specularmap, ae.envmap, ae.aomap, ae.lightmap, ae.emissivemap, ae.bumpmap, ae.normalmap, ae.displacementmap, ae.fog, ae.lights, { emissive: { value: new Ae(0) }, envMapIntensity: { value: 1 } }]), vertexShader: Oe.meshlambert_vert, fragmentShader: Oe.meshlambert_frag }, phong: { uniforms: Nt([ae.common, ae.specularmap, ae.envmap, ae.aomap, ae.lightmap, ae.emissivemap, ae.bumpmap, ae.normalmap, ae.displacementmap, ae.fog, ae.lights, { emissive: { value: new Ae(0) }, specular: { value: new Ae(1118481) }, shininess: { value: 30 }, envMapIntensity: { value: 1 } }]), vertexShader: Oe.meshphong_vert, fragmentShader: Oe.meshphong_frag }, standard: { uniforms: Nt([ae.common, ae.envmap, ae.aomap, ae.lightmap, ae.emissivemap, ae.bumpmap, ae.normalmap, ae.displacementmap, ae.roughnessmap, ae.metalnessmap, ae.fog, ae.lights, { emissive: { value: new Ae(0) }, roughness: { value: 1 }, metalness: { value: 0 }, envMapIntensity: { value: 1 } }]), vertexShader: Oe.meshphysical_vert, fragmentShader: Oe.meshphysical_frag }, toon: { uniforms: Nt([ae.common, ae.aomap, ae.lightmap, ae.emissivemap, ae.bumpmap, ae.normalmap, ae.displacementmap, ae.gradientmap, ae.fog, ae.lights, { emissive: { value: new Ae(0) } }]), vertexShader: Oe.meshtoon_vert, fragmentShader: Oe.meshtoon_frag }, matcap: { uniforms: Nt([ae.common, ae.bumpmap, ae.normalmap, ae.displacementmap, ae.fog, { matcap: { value: null } }]), vertexShader: Oe.meshmatcap_vert, fragmentShader: Oe.meshmatcap_frag }, points: { uniforms: Nt([ae.points, ae.fog]), vertexShader: Oe.points_vert, fragmentShader: Oe.points_frag }, dashed: { uniforms: Nt([ae.common, ae.fog, { scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } }]), vertexShader: Oe.linedashed_vert, fragmentShader: Oe.linedashed_frag }, depth: { uniforms: Nt([ae.common, ae.displacementmap]), vertexShader: Oe.depth_vert, fragmentShader: Oe.depth_frag }, normal: { uniforms: Nt([ae.common, ae.bumpmap, ae.normalmap, ae.displacementmap, { opacity: { value: 1 } }]), vertexShader: Oe.meshnormal_vert, fragmentShader: Oe.meshnormal_frag }, sprite: { uniforms: Nt([ae.sprite, ae.fog]), vertexShader: Oe.sprite_vert, fragmentShader: Oe.sprite_frag }, background: { uniforms: { uvTransform: { value: new De }, t2D: { value: null }, backgroundIntensity: { value: 1 } }, vertexShader: Oe.background_vert, fragmentShader: Oe.background_frag }, backgroundCube: { uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 }, backgroundBlurriness: { value: 0 }, backgroundIntensity: { value: 1 }, backgroundRotation: { value: new De } }, vertexShader: Oe.backgroundCube_vert, fragmentShader: Oe.backgroundCube_frag }, cube: { uniforms: { tCube: { value: null }, tFlip: { value: -1 }, opacity: { value: 1 } }, vertexShader: Oe.cube_vert, fragmentShader: Oe.cube_frag }, equirect: { uniforms: { tEquirect: { value: null } }, vertexShader: Oe.equirect_vert, fragmentShader: Oe.equirect_frag }, distance: { uniforms: Nt([ae.common, ae.displacementmap, { referencePosition: { value: new L }, nearDistance: { value: 1 }, farDistance: { value: 1e3 } }]), vertexShader: Oe.distance_vert, fragmentShader: Oe.distance_frag }, shadow: { uniforms: Nt([ae.lights, ae.fog, { color: { value: new Ae(0) }, opacity: { value: 1 } }]), vertexShader: Oe.shadow_vert, fragmentShader: Oe.shadow_frag } }; fn.physical = { uniforms: Nt([fn.standard.uniforms, { clearcoat: { value: 0 }, clearcoatMap: { value: null }, clearcoatMapTransform: { value: new De }, clearcoatNormalMap: { value: null }, clearcoatNormalMapTransform: { value: new De }, clearcoatNormalScale: { value: new Ge(1, 1) }, clearcoatRoughness: { value: 0 }, clearcoatRoughnessMap: { value: null }, clearcoatRoughnessMapTransform: { value: new De }, dispersion: { value: 0 }, iridescence: { value: 0 }, iridescenceMap: { value: null }, iridescenceMapTransform: { value: new De }, iridescenceIOR: { value: 1.3 }, iridescenceThicknessMinimum: { value: 100 }, iridescenceThicknessMaximum: { value: 400 }, iridescenceThicknessMap: { value: null }, iridescenceThicknessMapTransform: { value: new De }, sheen: { value: 0 }, sheenColor: { value: new Ae(0) }, sheenColorMap: { value: null }, sheenColorMapTransform: { value: new De }, sheenRoughness: { value: 1 }, sheenRoughnessMap: { value: null }, sheenRoughnessMapTransform: { value: new De }, transmission: { value: 0 }, transmissionMap: { value: null }, transmissionMapTransform: { value: new De }, transmissionSamplerSize: { value: new Ge }, transmissionSamplerMap: { value: null }, thickness: { value: 0 }, thicknessMap: { value: null }, thicknessMapTransform: { value: new De }, attenuationDistance: { value: 0 }, attenuationColor: { value: new Ae(0) }, specularColor: { value: new Ae(1, 1, 1) }, specularColorMap: { value: null }, specularColorMapTransform: { value: new De }, specularIntensity: { value: 1 }, specularIntensityMap: { value: null }, specularIntensityMapTransform: { value: new De }, anisotropyVector: { value: new Ge }, anisotropyMap: { value: null }, anisotropyMapTransform: { value: new De } }]), vertexShader: Oe.meshphysical_vert, fragmentShader: Oe.meshphysical_frag }; const ar = { r: 0, b: 0, g: 0 }, si = new $t, Tm = new Ue; function Am(s, e, t, n, i, r) { const a = new Ae(0); let o = i === !0 ? 0 : 1, l, c, h = null, d = 0, u = null; function f(M) { let E = M.isScene === !0 ? M.background : null; if (E && E.isTexture) { const y = M.backgroundBlurriness > 0; E = e.get(E, y) } return E } function g(M) { let E = !1; const y = f(M); y === null ? m(a, o) : y && y.isColor && (m(y, 1), E = !0); const w = s.xr.getEnvironmentBlendMode(); w === "additive" ? t.buffers.color.setClear(0, 0, 0, 1, r) : w === "alpha-blend" && t.buffers.color.setClear(0, 0, 0, 0, r), (s.autoClear || E) && (t.buffers.depth.setTest(!0), t.buffers.depth.setMask(!0), t.buffers.color.setMask(!0), s.clear(s.autoClearColor, s.autoClearDepth, s.autoClearStencil)) } function v(M, E) { const y = f(E); y && (y.isCubeTexture || y.mapping === yr) ? (c === void 0 && (c = new Tt(new Rs(1, 1, 1), new Mn({ name: "BackgroundCubeMaterial", uniforms: Vi(fn.backgroundCube.uniforms), vertexShader: fn.backgroundCube.vertexShader, fragmentShader: fn.backgroundCube.fragmentShader, side: Bt, depthTest: !1, depthWrite: !1, fog: !1, allowOverride: !1 })), c.geometry.deleteAttribute("normal"), c.geometry.deleteAttribute("uv"), c.onBeforeRender = function (w, A, C) { this.matrixWorld.copyPosition(C.matrixWorld) }, Object.defineProperty(c.material, "envMap", { get: function () { return this.uniforms.envMap.value } }), n.update(c)), si.copy(E.backgroundRotation), si.x *= -1, si.y *= -1, si.z *= -1, y.isCubeTexture && y.isRenderTargetTexture === !1 && (si.y *= -1, si.z *= -1), c.material.uniforms.envMap.value = y, c.material.uniforms.flipEnvMap.value = y.isCubeTexture && y.isRenderTargetTexture === !1 ? -1 : 1, c.material.uniforms.backgroundBlurriness.value = E.backgroundBlurriness, c.material.uniforms.backgroundIntensity.value = E.backgroundIntensity, c.material.uniforms.backgroundRotation.value.setFromMatrix4(Tm.makeRotationFromEuler(si)), c.material.toneMapped = We.getTransfer(y.colorSpace) !== je, (h !== y || d !== y.version || u !== s.toneMapping) && (c.material.needsUpdate = !0, h = y, d = y.version, u = s.toneMapping), c.layers.enableAll(), M.unshift(c, c.geometry, c.material, 0, 0, null)) : y && y.isTexture && (l === void 0 && (l = new Tt(new Cs(2, 2), new Mn({ name: "BackgroundMaterial", uniforms: Vi(fn.background.uniforms), vertexShader: fn.background.vertexShader, fragmentShader: fn.background.fragmentShader, side: Fn, depthTest: !1, depthWrite: !1, fog: !1, allowOverride: !1 })), l.geometry.deleteAttribute("normal"), Object.defineProperty(l.material, "map", { get: function () { return this.uniforms.t2D.value } }), n.update(l)), l.material.uniforms.t2D.value = y, l.material.uniforms.backgroundIntensity.value = E.backgroundIntensity, l.material.toneMapped = We.getTransfer(y.colorSpace) !== je, y.matrixAutoUpdate === !0 && y.updateMatrix(), l.material.uniforms.uvTransform.value.copy(y.matrix), (h !== y || d !== y.version || u !== s.toneMapping) && (l.material.needsUpdate = !0, h = y, d = y.version, u = s.toneMapping), l.layers.enableAll(), M.unshift(l, l.geometry, l.material, 0, 0, null)) } function m(M, E) { M.getRGB(ar, Qc(s)), t.buffers.color.setClear(ar.r, ar.g, ar.b, E, r) } function p() { c !== void 0 && (c.geometry.dispose(), c.material.dispose(), c = void 0), l !== void 0 && (l.geometry.dispose(), l.material.dispose(), l = void 0) } return { getClearColor: function () { return a }, setClearColor: function (M, E = 1) { a.set(M), o = E, m(a, o) }, getClearAlpha: function () { return o }, setClearAlpha: function (M) { o = M, m(a, o) }, render: g, addToRenderList: v, dispose: p } } function wm(s, e) { const t = s.getParameter(s.MAX_VERTEX_ATTRIBS), n = {}, i = u(null); let r = i, a = !1; function o(R, U, O, G, z) { let V = !1; const F = d(R, G, O, U); r !== F && (r = F, c(r.object)), V = f(R, G, O, z), V && g(R, G, O, z), z !== null && e.update(z, s.ELEMENT_ARRAY_BUFFER), (V || a) && (a = !1, y(R, U, O, G), z !== null && s.bindBuffer(s.ELEMENT_ARRAY_BUFFER, e.get(z).buffer)) } function l() { return s.createVertexArray() } function c(R) { return s.bindVertexArray(R) } function h(R) { return s.deleteVertexArray(R) } function d(R, U, O, G) { const z = G.wireframe === !0; let V = n[U.id]; V === void 0 && (V = {}, n[U.id] = V); const F = R.isInstancedMesh === !0 ? R.id : 0; let Q = V[F]; Q === void 0 && (Q = {}, V[F] = Q); let j = Q[O.id]; j === void 0 && (j = {}, Q[O.id] = j); let ce = j[z]; return ce === void 0 && (ce = u(l()), j[z] = ce), ce } function u(R) { const U = [], O = [], G = []; for (let z = 0; z < t; z++)U[z] = 0, O[z] = 0, G[z] = 0; return { geometry: null, program: null, wireframe: !1, newAttributes: U, enabledAttributes: O, attributeDivisors: G, object: R, attributes: {}, index: null } } function f(R, U, O, G) { const z = r.attributes, V = U.attributes; let F = 0; const Q = O.getAttributes(); for (const j in Q) if (Q[j].location >= 0) { const pe = z[j]; let ue = V[j]; if (ue === void 0 && (j === "instanceMatrix" && R.instanceMatrix && (ue = R.instanceMatrix), j === "instanceColor" && R.instanceColor && (ue = R.instanceColor)), pe === void 0 || pe.attribute !== ue || ue && pe.data !== ue.data) return !0; F++ } return r.attributesNum !== F || r.index !== G } function g(R, U, O, G) { const z = {}, V = U.attributes; let F = 0; const Q = O.getAttributes(); for (const j in Q) if (Q[j].location >= 0) { let pe = V[j]; pe === void 0 && (j === "instanceMatrix" && R.instanceMatrix && (pe = R.instanceMatrix), j === "instanceColor" && R.instanceColor && (pe = R.instanceColor)); const ue = {}; ue.attribute = pe, pe && pe.data && (ue.data = pe.data), z[j] = ue, F++ } r.attributes = z, r.attributesNum = F, r.index = G } function v() { const R = r.newAttributes; for (let U = 0, O = R.length; U < O; U++)R[U] = 0 } function m(R) { p(R, 0) } function p(R, U) { const O = r.newAttributes, G = r.enabledAttributes, z = r.attributeDivisors; O[R] = 1, G[R] === 0 && (s.enableVertexAttribArray(R), G[R] = 1), z[R] !== U && (s.vertexAttribDivisor(R, U), z[R] = U) } function M() { const R = r.newAttributes, U = r.enabledAttributes; for (let O = 0, G = U.length; O < G; O++)U[O] !== R[O] && (s.disableVertexAttribArray(O), U[O] = 0) } function E(R, U, O, G, z, V, F) { F === !0 ? s.vertexAttribIPointer(R, U, O, z, V) : s.vertexAttribPointer(R, U, O, G, z, V) } function y(R, U, O, G) { v(); const z = G.attributes, V = O.getAttributes(), F = U.defaultAttributeValues; for (const Q in V) { const j = V[Q]; if (j.location >= 0) { let ce = z[Q]; if (ce === void 0 && (Q === "instanceMatrix" && R.instanceMatrix && (ce = R.instanceMatrix), Q === "instanceColor" && R.instanceColor && (ce = R.instanceColor)), ce !== void 0) { const pe = ce.normalized, ue = ce.itemSize, Fe = e.get(ce); if (Fe === void 0) continue; const lt = Fe.buffer, at = Fe.type, $ = Fe.bytesPerElement, ne = at === s.INT || at === s.UNSIGNED_INT || ce.gpuType === Mo; if (ce.isInterleavedBufferAttribute) { const re = ce.data, Ne = re.stride, we = ce.offset; if (re.isInstancedInterleavedBuffer) { for (let Pe = 0; Pe < j.locationSize; Pe++)p(j.location + Pe, re.meshPerAttribute); R.isInstancedMesh !== !0 && G._maxInstanceCount === void 0 && (G._maxInstanceCount = re.meshPerAttribute * re.count) } else for (let Pe = 0; Pe < j.locationSize; Pe++)m(j.location + Pe); s.bindBuffer(s.ARRAY_BUFFER, lt); for (let Pe = 0; Pe < j.locationSize; Pe++)E(j.location + Pe, ue / j.locationSize, at, pe, Ne * $, (we + ue / j.locationSize * Pe) * $, ne) } else { if (ce.isInstancedBufferAttribute) { for (let re = 0; re < j.locationSize; re++)p(j.location + re, ce.meshPerAttribute); R.isInstancedMesh !== !0 && G._maxInstanceCount === void 0 && (G._maxInstanceCount = ce.meshPerAttribute * ce.count) } else for (let re = 0; re < j.locationSize; re++)m(j.location + re); s.bindBuffer(s.ARRAY_BUFFER, lt); for (let re = 0; re < j.locationSize; re++)E(j.location + re, ue / j.locationSize, at, pe, ue * $, ue / j.locationSize * re * $, ne) } } else if (F !== void 0) { const pe = F[Q]; if (pe !== void 0) switch (pe.length) { case 2: s.vertexAttrib2fv(j.location, pe); break; case 3: s.vertexAttrib3fv(j.location, pe); break; case 4: s.vertexAttrib4fv(j.location, pe); break; default: s.vertexAttrib1fv(j.location, pe) } } } } M() } function w() { b(); for (const R in n) { const U = n[R]; for (const O in U) { const G = U[O]; for (const z in G) { const V = G[z]; for (const F in V) h(V[F].object), delete V[F]; delete G[z] } } delete n[R] } } function A(R) { if (n[R.id] === void 0) return; const U = n[R.id]; for (const O in U) { const G = U[O]; for (const z in G) { const V = G[z]; for (const F in V) h(V[F].object), delete V[F]; delete G[z] } } delete n[R.id] } function C(R) { for (const U in n) { const O = n[U]; for (const G in O) { const z = O[G]; if (z[R.id] === void 0) continue; const V = z[R.id]; for (const F in V) h(V[F].object), delete V[F]; delete z[R.id] } } } function x(R) { for (const U in n) { const O = n[U], G = R.isInstancedMesh === !0 ? R.id : 0, z = O[G]; if (z !== void 0) { for (const V in z) { const F = z[V]; for (const Q in F) h(F[Q].object), delete F[Q]; delete z[V] } delete O[G], Object.keys(O).length === 0 && delete n[U] } } } function b() { W(), a = !0, r !== i && (r = i, c(r.object)) } function W() { i.geometry = null, i.program = null, i.wireframe = !1 } return { setup: o, reset: b, resetDefaultState: W, dispose: w, releaseStatesOfGeometry: A, releaseStatesOfObject: x, releaseStatesOfProgram: C, initAttributes: v, enableAttribute: m, disableUnusedAttributes: M } } function Rm(s, e, t) { let n; function i(c) { n = c } function r(c, h) { s.drawArrays(n, c, h), t.update(h, n, 1) } function a(c, h, d) { d !== 0 && (s.drawArraysInstanced(n, c, h, d), t.update(h, n, d)) } function o(c, h, d) { if (d === 0) return; e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, c, 0, h, 0, d); let f = 0; for (let g = 0; g < d; g++)f += h[g]; t.update(f, n, 1) } function l(c, h, d, u) { if (d === 0) return; const f = e.get("WEBGL_multi_draw"); if (f === null) for (let g = 0; g < c.length; g++)a(c[g], h[g], u[g]); else { f.multiDrawArraysInstancedWEBGL(n, c, 0, h, 0, u, 0, d); let g = 0; for (let v = 0; v < d; v++)g += h[v] * u[v]; t.update(g, n, 1) } } this.setMode = i, this.render = r, this.renderInstances = a, this.renderMultiDraw = o, this.renderMultiDrawInstances = l } function Cm(s, e, t, n) { let i; function r() { if (i !== void 0) return i; if (e.has("EXT_texture_filter_anisotropic") === !0) { const C = e.get("EXT_texture_filter_anisotropic"); i = s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT) } else i = 0; return i } function a(C) { return !(C !== Yt && n.convert(C) !== s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT)) } function o(C) { const x = C === On && (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float")); return !(C !== Ht && n.convert(C) !== s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE) && C !== Xt && !x) } function l(C) { if (C === "highp") { if (s.getShaderPrecisionFormat(s.VERTEX_SHADER, s.HIGH_FLOAT).precision > 0 && s.getShaderPrecisionFormat(s.FRAGMENT_SHADER, s.HIGH_FLOAT).precision > 0) return "highp"; C = "mediump" } return C === "mediump" && s.getShaderPrecisionFormat(s.VERTEX_SHADER, s.MEDIUM_FLOAT).precision > 0 && s.getShaderPrecisionFormat(s.FRAGMENT_SHADER, s.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp" } let c = t.precision !== void 0 ? t.precision : "highp"; const h = l(c); h !== c && (Ee("WebGLRenderer:", c, "not supported, using", h, "instead."), c = h); const d = t.logarithmicDepthBuffer === !0, u = t.reversedDepthBuffer === !0 && e.has("EXT_clip_control"), f = s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS), g = s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS), v = s.getParameter(s.MAX_TEXTURE_SIZE), m = s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE), p = s.getParameter(s.MAX_VERTEX_ATTRIBS), M = s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS), E = s.getParameter(s.MAX_VARYING_VECTORS), y = s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS), w = s.getParameter(s.MAX_SAMPLES), A = s.getParameter(s.SAMPLES); return { isWebGL2: !0, getMaxAnisotropy: r, getMaxPrecision: l, textureFormatReadable: a, textureTypeReadable: o, precision: c, logarithmicDepthBuffer: d, reversedDepthBuffer: u, maxTextures: f, maxVertexTextures: g, maxTextureSize: v, maxCubemapSize: m, maxAttributes: p, maxVertexUniforms: M, maxVaryings: E, maxFragmentUniforms: y, maxSamples: w, samples: A } } function Pm(s) { const e = this; let t = null, n = 0, i = !1, r = !1; const a = new li, o = new De, l = { value: null, needsUpdate: !1 }; this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function (d, u) { const f = d.length !== 0 || u || n !== 0 || i; return i = u, n = d.length, f }, this.beginShadows = function () { r = !0, h(null) }, this.endShadows = function () { r = !1 }, this.setGlobalState = function (d, u) { t = h(d, u, 0) }, this.setState = function (d, u, f) { const g = d.clippingPlanes, v = d.clipIntersection, m = d.clipShadows, p = s.get(d); if (!i || g === null || g.length === 0 || r && !m) r ? h(null) : c(); else { const M = r ? 0 : n, E = M * 4; let y = p.clippingState || null; l.value = y, y = h(g, u, E, f); for (let w = 0; w !== E; ++w)y[w] = t[w]; p.clippingState = y, this.numIntersection = v ? this.numPlanes : 0, this.numPlanes += M } }; function c() { l.value !== t && (l.value = t, l.needsUpdate = n > 0), e.numPlanes = n, e.numIntersection = 0 } function h(d, u, f, g) { const v = d !== null ? d.length : 0; let m = null; if (v !== 0) { if (m = l.value, g !== !0 || m === null) { const p = f + v * 4, M = u.matrixWorldInverse; o.getNormalMatrix(M), (m === null || m.length < p) && (m = new Float32Array(p)); for (let E = 0, y = f; E !== v; ++E, y += 4)a.copy(d[E]).applyMatrix4(M, o), a.normal.toArray(m, y), m[y + 3] = a.constant } l.value = m, l.needsUpdate = !0 } return e.numPlanes = v, e.numIntersection = 0, m } } const jn = 4, Kl = [.125, .215, .35, .446, .526, .582], hi = 20, Lm = 256, ss = new Ar, jl = new Ae; let ca = null, ha = 0, ua = 0, da = !1; const Im = new L; class Zl { constructor(e) { this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._sigmas = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null } fromScene(e, t = 0, n = .1, i = 100, r = {}) { const { size: a = 256, position: o = Im } = r; ca = this._renderer.getRenderTarget(), ha = this._renderer.getActiveCubeFace(), ua = this._renderer.getActiveMipmapLevel(), da = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(a); const l = this._allocateTargets(); return l.depthBuffer = !0, this._sceneToCubeUV(e, n, i, l, o), t > 0 && this._blur(l, 0, 0, t), this._applyPMREM(l), this._cleanup(l), l } fromEquirectangular(e, t = null) { return this._fromTexture(e, t) } fromCubemap(e, t = null) { return this._fromTexture(e, t) } compileCubemapShader() { this._cubemapMaterial === null && (this._cubemapMaterial = ec(), this._compileMaterial(this._cubemapMaterial)) } compileEquirectangularShader() { this._equirectMaterial === null && (this._equirectMaterial = Ql(), this._compileMaterial(this._equirectMaterial)) } dispose() { this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose(), this._backgroundBox !== null && (this._backgroundBox.geometry.dispose(), this._backgroundBox.material.dispose()) } _setSize(e) { this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax) } _dispose() { this._blurMaterial !== null && this._blurMaterial.dispose(), this._ggxMaterial !== null && this._ggxMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose(); for (let e = 0; e < this._lodMeshes.length; e++)this._lodMeshes[e].geometry.dispose() } _cleanup(e) { this._renderer.setRenderTarget(ca, ha, ua), this._renderer.xr.enabled = da, e.scissorTest = !1, Li(e, 0, 0, e.width, e.height) } _fromTexture(e, t) { e.mapping === di || e.mapping === Bi ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), ca = this._renderer.getRenderTarget(), ha = this._renderer.getActiveCubeFace(), ua = this._renderer.getActiveMipmapLevel(), da = this._renderer.xr.enabled, this._renderer.xr.enabled = !1; const n = t || this._allocateTargets(); return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n } _allocateTargets() { const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = { magFilter: xt, minFilter: xt, generateMipmaps: !1, type: On, format: Yt, colorSpace: Ot, depthBuffer: !1 }, i = Jl(e, t, n); if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) { this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Jl(e, t, n); const { _lodMax: r } = this; ({ lodMeshes: this._lodMeshes, sizeLods: this._sizeLods, sigmas: this._sigmas } = Dm(r)), this._blurMaterial = Um(r, e, t), this._ggxMaterial = Nm(r, e, t) } return i } _compileMaterial(e) { const t = new Tt(new Rt, e); this._renderer.compile(t, ss) } _sceneToCubeUV(e, t, n, i, r) { const l = new Ut(90, 1, t, n), c = [1, -1, 1, 1, 1, 1], h = [1, 1, 1, -1, -1, -1], d = this._renderer, u = d.autoClear, f = d.toneMapping; d.getClearColor(jl), d.toneMapping = gn, d.autoClear = !1, d.state.buffers.depth.getReversed() && (d.setRenderTarget(i), d.clearDepth(), d.setRenderTarget(null)), this._backgroundBox === null && (this._backgroundBox = new Tt(new Rs, new nn({ name: "PMREM.Background", side: Bt, depthWrite: !1, depthTest: !1 }))); const v = this._backgroundBox, m = v.material; let p = !1; const M = e.background; M ? M.isColor && (m.color.copy(M), e.background = null, p = !0) : (m.color.copy(jl), p = !0); for (let E = 0; E < 6; E++) { const y = E % 3; y === 0 ? (l.up.set(0, c[E], 0), l.position.set(r.x, r.y, r.z), l.lookAt(r.x + h[E], r.y, r.z)) : y === 1 ? (l.up.set(0, 0, c[E]), l.position.set(r.x, r.y, r.z), l.lookAt(r.x, r.y + h[E], r.z)) : (l.up.set(0, c[E], 0), l.position.set(r.x, r.y, r.z), l.lookAt(r.x, r.y, r.z + h[E])); const w = this._cubeSize; Li(i, y * w, E > 2 ? w : 0, w, w), d.setRenderTarget(i), p && d.render(v, l), d.render(e, l) } d.toneMapping = f, d.autoClear = u, e.background = M } _textureToCubeUV(e, t) { const n = this._renderer, i = e.mapping === di || e.mapping === Bi; i ? (this._cubemapMaterial === null && (this._cubemapMaterial = ec()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Ql()); const r = i ? this._cubemapMaterial : this._equirectMaterial, a = this._lodMeshes[0]; a.material = r; const o = r.uniforms; o.envMap.value = e; const l = this._cubeSize; Li(t, 0, 0, 3 * l, 2 * l), n.setRenderTarget(t), n.render(a, ss) } _applyPMREM(e) { const t = this._renderer, n = t.autoClear; t.autoClear = !1; const i = this._lodMeshes.length; for (let r = 1; r < i; r++)this._applyGGXFilter(e, r - 1, r); t.autoClear = n } _applyGGXFilter(e, t, n) { const i = this._renderer, r = this._pingPongRenderTarget, a = this._ggxMaterial, o = this._lodMeshes[n]; o.material = a; const l = a.uniforms, c = n / (this._lodMeshes.length - 1), h = t / (this._lodMeshes.length - 1), d = Math.sqrt(c * c - h * h), u = 0 + c * 1.25, f = d * u, { _lodMax: g } = this, v = this._sizeLods[n], m = 3 * v * (n > g - jn ? n - g + jn : 0), p = 4 * (this._cubeSize - v); l.envMap.value = e.texture, l.roughness.value = f, l.mipInt.value = g - t, Li(r, m, p, 3 * v, 2 * v), i.setRenderTarget(r), i.render(o, ss), l.envMap.value = r.texture, l.roughness.value = 0, l.mipInt.value = g - n, Li(e, m, p, 3 * v, 2 * v), i.setRenderTarget(e), i.render(o, ss) } _blur(e, t, n, i, r) { const a = this._pingPongRenderTarget; this._halfBlur(e, a, t, n, i, "latitudinal", r), this._halfBlur(a, e, n, n, i, "longitudinal", r) } _halfBlur(e, t, n, i, r, a, o) { const l = this._renderer, c = this._blurMaterial; a !== "latitudinal" && a !== "longitudinal" && Ce("blur direction must be either latitudinal or longitudinal!"); const h = 3, d = this._lodMeshes[i]; d.material = c; const u = c.uniforms, f = this._sizeLods[n] - 1, g = isFinite(r) ? Math.PI / (2 * f) : 2 * Math.PI / (2 * hi - 1), v = r / g, m = isFinite(r) ? 1 + Math.floor(h * v) : hi; m > hi && Ee(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${hi}`); const p = []; let M = 0; for (let C = 0; C < hi; ++C) { const x = C / v, b = Math.exp(-x * x / 2); p.push(b), C === 0 ? M += b : C < m && (M += 2 * b) } for (let C = 0; C < p.length; C++)p[C] = p[C] / M; u.envMap.value = e.texture, u.samples.value = m, u.weights.value = p, u.latitudinal.value = a === "latitudinal", o && (u.poleAxis.value = o); const { _lodMax: E } = this; u.dTheta.value = g, u.mipInt.value = E - n; const y = this._sizeLods[i], w = 3 * y * (i > E - jn ? i - E + jn : 0), A = 4 * (this._cubeSize - y); Li(t, w, A, 3 * y, 2 * y), l.setRenderTarget(t), l.render(d, ss) } } function Dm(s) { const e = [], t = [], n = []; let i = s; const r = s - jn + 1 + Kl.length; for (let a = 0; a < r; a++) { const o = Math.pow(2, i); e.push(o); let l = 1 / o; a > s - jn ? l = Kl[a - s + jn - 1] : a === 0 && (l = 0), t.push(l); const c = 1 / (o - 2), h = -c, d = 1 + c, u = [h, h, d, h, d, d, h, h, d, d, h, d], f = 6, g = 6, v = 3, m = 2, p = 1, M = new Float32Array(v * g * f), E = new Float32Array(m * g * f), y = new Float32Array(p * g * f); for (let A = 0; A < f; A++) { const C = A % 3 * 2 / 3 - 1, x = A > 2 ? 0 : -1, b = [C, x, 0, C + 2 / 3, x, 0, C + 2 / 3, x + 1, 0, C, x, 0, C + 2 / 3, x + 1, 0, C, x + 1, 0]; M.set(b, v * g * A), E.set(u, m * g * A); const W = [A, A, A, A, A, A]; y.set(W, p * g * A) } const w = new Rt; w.setAttribute("position", new Ft(M, v)), w.setAttribute("uv", new Ft(E, m)), w.setAttribute("faceIndex", new Ft(y, p)), n.push(new Tt(w, null)), i > jn && i-- } return { lodMeshes: n, sizeLods: e, sigmas: t } } function Jl(s, e, t) { const n = new _n(s, e, t); return n.texture.mapping = yr, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n } function Li(s, e, t, n, i) { s.viewport.set(e, t, n, i), s.scissor.set(e, t, n, i) } function Nm(s, e, t) {
	return new Mn({
		name: "PMREMGGXConvolution", defines: { GGX_SAMPLES: Lm, CUBEUV_TEXEL_WIDTH: 1 / e, CUBEUV_TEXEL_HEIGHT: 1 / t, CUBEUV_MAX_MIP: `${s}.0` }, uniforms: { envMap: { value: null }, roughness: { value: 0 }, mipInt: { value: 0 } }, vertexShader: wr(), fragmentShader: `

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`, blending: Nn, depthTest: !1, depthWrite: !1
	})
} function Um(s, e, t) {
	const n = new Float32Array(hi), i = new L(0, 1, 0); return new Mn({
		name: "SphericalGaussianBlur", defines: { n: hi, CUBEUV_TEXEL_WIDTH: 1 / e, CUBEUV_TEXEL_HEIGHT: 1 / t, CUBEUV_MAX_MIP: `${s}.0` }, uniforms: { envMap: { value: null }, samples: { value: 1 }, weights: { value: n }, latitudinal: { value: !1 }, dTheta: { value: 0 }, mipInt: { value: 0 }, poleAxis: { value: i } }, vertexShader: wr(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`, blending: Nn, depthTest: !1, depthWrite: !1
	})
} function Ql() {
	return new Mn({
		name: "EquirectangularToCubeUV", uniforms: { envMap: { value: null } }, vertexShader: wr(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`, blending: Nn, depthTest: !1, depthWrite: !1
	})
} function ec() {
	return new Mn({
		name: "CubemapToCubeUV", uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 } }, vertexShader: wr(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`, blending: Nn, depthTest: !1, depthWrite: !1
	})
} function wr() {
	return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`} class ah extends _n {
	constructor(e = 1, t = {}) { super(e, e, t), this.isWebGLCubeRenderTarget = !0; const n = { width: e, height: e, depth: 1 }, i = [n, n, n, n, n, n]; this.texture = new Zc(i), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0 } fromEquirectangularTexture(e, t) {
		this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter; const n = {
			uniforms: { tEquirect: { value: null } }, vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`, fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`}, i = new Rs(5, 5, 5), r = new Mn({ name: "CubemapFromEquirect", uniforms: Vi(n.uniforms), vertexShader: n.vertexShader, fragmentShader: n.fragmentShader, side: Bt, blending: Nn }); r.uniforms.tEquirect.value = t; const a = new Tt(i, r), o = t.minFilter; return t.minFilter === Ln && (t.minFilter = xt), new Ld(1, 10, this).update(e, a), t.minFilter = o, a.geometry.dispose(), a.material.dispose(), this
	} clear(e, t = !0, n = !0, i = !0) { const r = e.getRenderTarget(); for (let a = 0; a < 6; a++)e.setRenderTarget(this, a), e.clear(t, n, i); e.setRenderTarget(r) }
} function Fm(s) { let e = new WeakMap, t = new WeakMap, n = null; function i(u, f = !1) { return u == null ? null : f ? a(u) : r(u) } function r(u) { if (u && u.isTexture) { const f = u.mapping; if (f === Ir || f === Dr) if (e.has(u)) { const g = e.get(u).texture; return o(g, u.mapping) } else { const g = u.image; if (g && g.height > 0) { const v = new ah(g.height); return v.fromEquirectangularTexture(s, u), e.set(u, v), u.addEventListener("dispose", c), o(v.texture, u.mapping) } else return null } } return u } function a(u) { if (u && u.isTexture) { const f = u.mapping, g = f === Ir || f === Dr, v = f === di || f === Bi; if (g || v) { let m = t.get(u); const p = m !== void 0 ? m.texture.pmremVersion : 0; if (u.isRenderTargetTexture && u.pmremVersion !== p) return n === null && (n = new Zl(s)), m = g ? n.fromEquirectangular(u, m) : n.fromCubemap(u, m), m.texture.pmremVersion = u.pmremVersion, t.set(u, m), m.texture; if (m !== void 0) return m.texture; { const M = u.image; return g && M && M.height > 0 || v && M && l(M) ? (n === null && (n = new Zl(s)), m = g ? n.fromEquirectangular(u) : n.fromCubemap(u), m.texture.pmremVersion = u.pmremVersion, t.set(u, m), u.addEventListener("dispose", h), m.texture) : null } } } return u } function o(u, f) { return f === Ir ? u.mapping = di : f === Dr && (u.mapping = Bi), u } function l(u) { let f = 0; const g = 6; for (let v = 0; v < g; v++)u[v] !== void 0 && f++; return f === g } function c(u) { const f = u.target; f.removeEventListener("dispose", c); const g = e.get(f); g !== void 0 && (e.delete(f), g.dispose()) } function h(u) { const f = u.target; f.removeEventListener("dispose", h); const g = t.get(f); g !== void 0 && (t.delete(f), g.dispose()) } function d() { e = new WeakMap, t = new WeakMap, n !== null && (n.dispose(), n = null) } return { get: i, dispose: d } } function Om(s) { const e = {}; function t(n) { if (e[n] !== void 0) return e[n]; const i = s.getExtension(n); return e[n] = i, i } return { has: function (n) { return t(n) !== null }, init: function () { t("EXT_color_buffer_float"), t("WEBGL_clip_cull_distance"), t("OES_texture_float_linear"), t("EXT_color_buffer_half_float"), t("WEBGL_multisampled_render_to_texture"), t("WEBGL_render_shared_exponent") }, get: function (n) { const i = t(n); return i === null && vr("WebGLRenderer: " + n + " extension not supported."), i } } } function Bm(s, e, t, n) { const i = {}, r = new WeakMap; function a(d) { const u = d.target; u.index !== null && e.remove(u.index); for (const g in u.attributes) e.remove(u.attributes[g]); u.removeEventListener("dispose", a), delete i[u.id]; const f = r.get(u); f && (e.remove(f), r.delete(u)), n.releaseStatesOfGeometry(u), u.isInstancedBufferGeometry === !0 && delete u._maxInstanceCount, t.memory.geometries-- } function o(d, u) { return i[u.id] === !0 || (u.addEventListener("dispose", a), i[u.id] = !0, t.memory.geometries++), u } function l(d) { const u = d.attributes; for (const f in u) e.update(u[f], s.ARRAY_BUFFER) } function c(d) { const u = [], f = d.index, g = d.attributes.position; let v = 0; if (g === void 0) return; if (f !== null) { const M = f.array; v = f.version; for (let E = 0, y = M.length; E < y; E += 3) { const w = M[E + 0], A = M[E + 1], C = M[E + 2]; u.push(w, A, A, C, C, w) } } else { const M = g.array; v = g.version; for (let E = 0, y = M.length / 3 - 1; E < y; E += 3) { const w = E + 0, A = E + 1, C = E + 2; u.push(w, A, A, C, C, w) } } const m = new (g.count >= 65535 ? $c : qc)(u, 1); m.version = v; const p = r.get(d); p && e.remove(p), r.set(d, m) } function h(d) { const u = r.get(d); if (u) { const f = d.index; f !== null && u.version < f.version && c(d) } else c(d); return r.get(d) } return { get: o, update: l, getWireframeAttribute: h } } function zm(s, e, t) { let n; function i(u) { n = u } let r, a; function o(u) { r = u.type, a = u.bytesPerElement } function l(u, f) { s.drawElements(n, f, r, u * a), t.update(f, n, 1) } function c(u, f, g) { g !== 0 && (s.drawElementsInstanced(n, f, r, u * a, g), t.update(f, n, g)) } function h(u, f, g) { if (g === 0) return; e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, f, 0, r, u, 0, g); let m = 0; for (let p = 0; p < g; p++)m += f[p]; t.update(m, n, 1) } function d(u, f, g, v) { if (g === 0) return; const m = e.get("WEBGL_multi_draw"); if (m === null) for (let p = 0; p < u.length; p++)c(u[p] / a, f[p], v[p]); else { m.multiDrawElementsInstancedWEBGL(n, f, 0, r, u, 0, v, 0, g); let p = 0; for (let M = 0; M < g; M++)p += f[M] * v[M]; t.update(p, n, 1) } } this.setMode = i, this.setIndex = o, this.render = l, this.renderInstances = c, this.renderMultiDraw = h, this.renderMultiDrawInstances = d } function km(s) { const e = { geometries: 0, textures: 0 }, t = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 }; function n(r, a, o) { switch (t.calls++, a) { case s.TRIANGLES: t.triangles += o * (r / 3); break; case s.LINES: t.lines += o * (r / 2); break; case s.LINE_STRIP: t.lines += o * (r - 1); break; case s.LINE_LOOP: t.lines += o * r; break; case s.POINTS: t.points += o * r; break; default: Ce("WebGLInfo: Unknown draw mode:", a); break } } function i() { t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0 } return { memory: e, render: t, programs: null, autoReset: !0, reset: i, update: n } } function Vm(s, e, t) { const n = new WeakMap, i = new ot; function r(a, o, l) { const c = a.morphTargetInfluences, h = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, d = h !== void 0 ? h.length : 0; let u = n.get(o); if (u === void 0 || u.count !== d) { let W = function () { x.dispose(), n.delete(o), o.removeEventListener("dispose", W) }; var f = W; u !== void 0 && u.texture.dispose(); const g = o.morphAttributes.position !== void 0, v = o.morphAttributes.normal !== void 0, m = o.morphAttributes.color !== void 0, p = o.morphAttributes.position || [], M = o.morphAttributes.normal || [], E = o.morphAttributes.color || []; let y = 0; g === !0 && (y = 1), v === !0 && (y = 2), m === !0 && (y = 3); let w = o.attributes.position.count * y, A = 1; w > e.maxTextureSize && (A = Math.ceil(w / e.maxTextureSize), w = e.maxTextureSize); const C = new Float32Array(w * A * 4 * d), x = new Wc(C, w, A, d); x.type = Xt, x.needsUpdate = !0; const b = y * 4; for (let R = 0; R < d; R++) { const U = p[R], O = M[R], G = E[R], z = w * A * 4 * R; for (let V = 0; V < U.count; V++) { const F = V * b; g === !0 && (i.fromBufferAttribute(U, V), C[z + F + 0] = i.x, C[z + F + 1] = i.y, C[z + F + 2] = i.z, C[z + F + 3] = 0), v === !0 && (i.fromBufferAttribute(O, V), C[z + F + 4] = i.x, C[z + F + 5] = i.y, C[z + F + 6] = i.z, C[z + F + 7] = 0), m === !0 && (i.fromBufferAttribute(G, V), C[z + F + 8] = i.x, C[z + F + 9] = i.y, C[z + F + 10] = i.z, C[z + F + 11] = G.itemSize === 4 ? i.w : 1) } } u = { count: d, texture: x, size: new Ge(w, A) }, n.set(o, u), o.addEventListener("dispose", W) } if (a.isInstancedMesh === !0 && a.morphTexture !== null) l.getUniforms().setValue(s, "morphTexture", a.morphTexture, t); else { let g = 0; for (let m = 0; m < c.length; m++)g += c[m]; const v = o.morphTargetsRelative ? 1 : 1 - g; l.getUniforms().setValue(s, "morphTargetBaseInfluence", v), l.getUniforms().setValue(s, "morphTargetInfluences", c) } l.getUniforms().setValue(s, "morphTargetsTexture", u.texture, t), l.getUniforms().setValue(s, "morphTargetsTextureSize", u.size) } return { update: r } } function Hm(s, e, t, n, i) { let r = new WeakMap; function a(c) { const h = i.render.frame, d = c.geometry, u = e.get(c, d); if (r.get(u) !== h && (e.update(u), r.set(u, h)), c.isInstancedMesh && (c.hasEventListener("dispose", l) === !1 && c.addEventListener("dispose", l), r.get(c) !== h && (t.update(c.instanceMatrix, s.ARRAY_BUFFER), c.instanceColor !== null && t.update(c.instanceColor, s.ARRAY_BUFFER), r.set(c, h))), c.isSkinnedMesh) { const f = c.skeleton; r.get(f) !== h && (f.update(), r.set(f, h)) } return u } function o() { r = new WeakMap } function l(c) { const h = c.target; h.removeEventListener("dispose", l), n.releaseStatesOfObject(h), t.remove(h.instanceMatrix), h.instanceColor !== null && t.remove(h.instanceColor) } return { update: a, dispose: o } } const Gm = { [wc]: "LINEAR_TONE_MAPPING", [Rc]: "REINHARD_TONE_MAPPING", [Cc]: "CINEON_TONE_MAPPING", [Pc]: "ACES_FILMIC_TONE_MAPPING", [Ic]: "AGX_TONE_MAPPING", [Dc]: "NEUTRAL_TONE_MAPPING", [Lc]: "CUSTOM_TONE_MAPPING" }; function Wm(s, e, t, n, i) {
	const r = new _n(e, t, { type: s, depthBuffer: n, stencilBuffer: i }), a = new _n(e, t, { type: On, depthBuffer: !1, stencilBuffer: !1 }), o = new Rt; o.setAttribute("position", new ut([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), o.setAttribute("uv", new ut([0, 2, 0, 0, 2, 0], 2)); const l = new od({
		uniforms: { tDiffuse: { value: null } }, vertexShader: `
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`, fragmentShader: `
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`, depthTest: !1, depthWrite: !1
	}), c = new Tt(o, l), h = new Ar(-1, 1, 1, -1, 0, 1); let d = null, u = null, f = !1, g, v = null, m = [], p = !1; this.setSize = function (M, E) { r.setSize(M, E), a.setSize(M, E); for (let y = 0; y < m.length; y++) { const w = m[y]; w.setSize && w.setSize(M, E) } }, this.setEffects = function (M) { m = M, p = m.length > 0 && m[0].isRenderPass === !0; const E = r.width, y = r.height; for (let w = 0; w < m.length; w++) { const A = m[w]; A.setSize && A.setSize(E, y) } }, this.begin = function (M, E) { if (f || M.toneMapping === gn && m.length === 0) return !1; if (v = E, E !== null) { const y = E.width, w = E.height; (r.width !== y || r.height !== w) && this.setSize(y, w) } return p === !1 && M.setRenderTarget(r), g = M.toneMapping, M.toneMapping = gn, !0 }, this.hasRenderPass = function () { return p }, this.end = function (M, E) { M.toneMapping = g, f = !0; let y = r, w = a; for (let A = 0; A < m.length; A++) { const C = m[A]; if (C.enabled !== !1 && (C.render(M, w, y, E), C.needsSwap !== !1)) { const x = y; y = w, w = x } } if (d !== M.outputColorSpace || u !== M.toneMapping) { d = M.outputColorSpace, u = M.toneMapping, l.defines = {}, We.getTransfer(d) === je && (l.defines.SRGB_TRANSFER = ""); const A = Gm[u]; A && (l.defines[A] = ""), l.needsUpdate = !0 } l.uniforms.tDiffuse.value = y.texture, M.setRenderTarget(v), M.render(c, h), v = null, f = !1 }, this.isCompositing = function () { return f }, this.dispose = function () { r.dispose(), a.dispose(), o.dispose(), l.dispose() }
} const oh = new Et, uo = new bs(1, 1), lh = new Wc, ch = new Pu, hh = new Zc, tc = [], nc = [], ic = new Float32Array(16), sc = new Float32Array(9), rc = new Float32Array(4); function ji(s, e, t) { const n = s[0]; if (n <= 0 || n > 0) return s; const i = e * t; let r = tc[i]; if (r === void 0 && (r = new Float32Array(i), tc[i] = r), e !== 0) { n.toArray(r, 0); for (let a = 1, o = 0; a !== e; ++a)o += t, s[a].toArray(r, o) } return r } function vt(s, e) { if (s.length !== e.length) return !1; for (let t = 0, n = s.length; t < n; t++)if (s[t] !== e[t]) return !1; return !0 } function Mt(s, e) { for (let t = 0, n = e.length; t < n; t++)s[t] = e[t] } function Rr(s, e) { let t = nc[e]; t === void 0 && (t = new Int32Array(e), nc[e] = t); for (let n = 0; n !== e; ++n)t[n] = s.allocateTextureUnit(); return t } function Xm(s, e) { const t = this.cache; t[0] !== e && (s.uniform1f(this.addr, e), t[0] = e) } function Ym(s, e) { const t = this.cache; if (e.x !== void 0) (t[0] !== e.x || t[1] !== e.y) && (s.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y); else { if (vt(t, e)) return; s.uniform2fv(this.addr, e), Mt(t, e) } } function qm(s, e) { const t = this.cache; if (e.x !== void 0) (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (s.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z); else if (e.r !== void 0) (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (s.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b); else { if (vt(t, e)) return; s.uniform3fv(this.addr, e), Mt(t, e) } } function $m(s, e) { const t = this.cache; if (e.x !== void 0) (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (s.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w); else { if (vt(t, e)) return; s.uniform4fv(this.addr, e), Mt(t, e) } } function Km(s, e) { const t = this.cache, n = e.elements; if (n === void 0) { if (vt(t, e)) return; s.uniformMatrix2fv(this.addr, !1, e), Mt(t, e) } else { if (vt(t, n)) return; rc.set(n), s.uniformMatrix2fv(this.addr, !1, rc), Mt(t, n) } } function jm(s, e) { const t = this.cache, n = e.elements; if (n === void 0) { if (vt(t, e)) return; s.uniformMatrix3fv(this.addr, !1, e), Mt(t, e) } else { if (vt(t, n)) return; sc.set(n), s.uniformMatrix3fv(this.addr, !1, sc), Mt(t, n) } } function Zm(s, e) { const t = this.cache, n = e.elements; if (n === void 0) { if (vt(t, e)) return; s.uniformMatrix4fv(this.addr, !1, e), Mt(t, e) } else { if (vt(t, n)) return; ic.set(n), s.uniformMatrix4fv(this.addr, !1, ic), Mt(t, n) } } function Jm(s, e) { const t = this.cache; t[0] !== e && (s.uniform1i(this.addr, e), t[0] = e) } function Qm(s, e) { const t = this.cache; if (e.x !== void 0) (t[0] !== e.x || t[1] !== e.y) && (s.uniform2i(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y); else { if (vt(t, e)) return; s.uniform2iv(this.addr, e), Mt(t, e) } } function eg(s, e) { const t = this.cache; if (e.x !== void 0) (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (s.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z); else { if (vt(t, e)) return; s.uniform3iv(this.addr, e), Mt(t, e) } } function tg(s, e) { const t = this.cache; if (e.x !== void 0) (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (s.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w); else { if (vt(t, e)) return; s.uniform4iv(this.addr, e), Mt(t, e) } } function ng(s, e) { const t = this.cache; t[0] !== e && (s.uniform1ui(this.addr, e), t[0] = e) } function ig(s, e) { const t = this.cache; if (e.x !== void 0) (t[0] !== e.x || t[1] !== e.y) && (s.uniform2ui(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y); else { if (vt(t, e)) return; s.uniform2uiv(this.addr, e), Mt(t, e) } } function sg(s, e) { const t = this.cache; if (e.x !== void 0) (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (s.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z); else { if (vt(t, e)) return; s.uniform3uiv(this.addr, e), Mt(t, e) } } function rg(s, e) { const t = this.cache; if (e.x !== void 0) (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (s.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w); else { if (vt(t, e)) return; s.uniform4uiv(this.addr, e), Mt(t, e) } } function ag(s, e, t) { const n = this.cache, i = t.allocateTextureUnit(); n[0] !== i && (s.uniform1i(this.addr, i), n[0] = i); let r; this.type === s.SAMPLER_2D_SHADOW ? (uo.compareFunction = t.isReversedDepthBuffer() ? Co : Ro, r = uo) : r = oh, t.setTexture2D(e || r, i) } function og(s, e, t) { const n = this.cache, i = t.allocateTextureUnit(); n[0] !== i && (s.uniform1i(this.addr, i), n[0] = i), t.setTexture3D(e || ch, i) } function lg(s, e, t) { const n = this.cache, i = t.allocateTextureUnit(); n[0] !== i && (s.uniform1i(this.addr, i), n[0] = i), t.setTextureCube(e || hh, i) } function cg(s, e, t) { const n = this.cache, i = t.allocateTextureUnit(); n[0] !== i && (s.uniform1i(this.addr, i), n[0] = i), t.setTexture2DArray(e || lh, i) } function hg(s) { switch (s) { case 5126: return Xm; case 35664: return Ym; case 35665: return qm; case 35666: return $m; case 35674: return Km; case 35675: return jm; case 35676: return Zm; case 5124: case 35670: return Jm; case 35667: case 35671: return Qm; case 35668: case 35672: return eg; case 35669: case 35673: return tg; case 5125: return ng; case 36294: return ig; case 36295: return sg; case 36296: return rg; case 35678: case 36198: case 36298: case 36306: case 35682: return ag; case 35679: case 36299: case 36307: return og; case 35680: case 36300: case 36308: case 36293: return lg; case 36289: case 36303: case 36311: case 36292: return cg } } function ug(s, e) { s.uniform1fv(this.addr, e) } function dg(s, e) { const t = ji(e, this.size, 2); s.uniform2fv(this.addr, t) } function fg(s, e) { const t = ji(e, this.size, 3); s.uniform3fv(this.addr, t) } function pg(s, e) { const t = ji(e, this.size, 4); s.uniform4fv(this.addr, t) } function mg(s, e) { const t = ji(e, this.size, 4); s.uniformMatrix2fv(this.addr, !1, t) } function gg(s, e) { const t = ji(e, this.size, 9); s.uniformMatrix3fv(this.addr, !1, t) } function _g(s, e) { const t = ji(e, this.size, 16); s.uniformMatrix4fv(this.addr, !1, t) } function xg(s, e) { s.uniform1iv(this.addr, e) } function vg(s, e) { s.uniform2iv(this.addr, e) } function Mg(s, e) { s.uniform3iv(this.addr, e) } function Sg(s, e) { s.uniform4iv(this.addr, e) } function yg(s, e) { s.uniform1uiv(this.addr, e) } function bg(s, e) { s.uniform2uiv(this.addr, e) } function Eg(s, e) { s.uniform3uiv(this.addr, e) } function Tg(s, e) { s.uniform4uiv(this.addr, e) } function Ag(s, e, t) { const n = this.cache, i = e.length, r = Rr(t, i); vt(n, r) || (s.uniform1iv(this.addr, r), Mt(n, r)); let a; this.type === s.SAMPLER_2D_SHADOW ? a = uo : a = oh; for (let o = 0; o !== i; ++o)t.setTexture2D(e[o] || a, r[o]) } function wg(s, e, t) { const n = this.cache, i = e.length, r = Rr(t, i); vt(n, r) || (s.uniform1iv(this.addr, r), Mt(n, r)); for (let a = 0; a !== i; ++a)t.setTexture3D(e[a] || ch, r[a]) } function Rg(s, e, t) { const n = this.cache, i = e.length, r = Rr(t, i); vt(n, r) || (s.uniform1iv(this.addr, r), Mt(n, r)); for (let a = 0; a !== i; ++a)t.setTextureCube(e[a] || hh, r[a]) } function Cg(s, e, t) { const n = this.cache, i = e.length, r = Rr(t, i); vt(n, r) || (s.uniform1iv(this.addr, r), Mt(n, r)); for (let a = 0; a !== i; ++a)t.setTexture2DArray(e[a] || lh, r[a]) } function Pg(s) { switch (s) { case 5126: return ug; case 35664: return dg; case 35665: return fg; case 35666: return pg; case 35674: return mg; case 35675: return gg; case 35676: return _g; case 5124: case 35670: return xg; case 35667: case 35671: return vg; case 35668: case 35672: return Mg; case 35669: case 35673: return Sg; case 5125: return yg; case 36294: return bg; case 36295: return Eg; case 36296: return Tg; case 35678: case 36198: case 36298: case 36306: case 35682: return Ag; case 35679: case 36299: case 36307: return wg; case 35680: case 36300: case 36308: case 36293: return Rg; case 36289: case 36303: case 36311: case 36292: return Cg } } class Lg { constructor(e, t, n) { this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = hg(t.type) } } class Ig { constructor(e, t, n) { this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = Pg(t.type) } } class Dg { constructor(e) { this.id = e, this.seq = [], this.map = {} } setValue(e, t, n) { const i = this.seq; for (let r = 0, a = i.length; r !== a; ++r) { const o = i[r]; o.setValue(e, t[o.id], n) } } } const fa = /(\w+)(\])?(\[|\.)?/g; function ac(s, e) { s.seq.push(e), s.map[e.id] = e } function Ng(s, e, t) { const n = s.name, i = n.length; for (fa.lastIndex = 0; ;) { const r = fa.exec(n), a = fa.lastIndex; let o = r[1]; const l = r[2] === "]", c = r[3]; if (l && (o = o | 0), c === void 0 || c === "[" && a + 2 === i) { ac(t, c === void 0 ? new Lg(o, s, e) : new Ig(o, s, e)); break } else { let d = t.map[o]; d === void 0 && (d = new Dg(o), ac(t, d)), t = d } } } class mr { constructor(e, t) { this.seq = [], this.map = {}; const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS); for (let a = 0; a < n; ++a) { const o = e.getActiveUniform(t, a), l = e.getUniformLocation(t, o.name); Ng(o, l, this) } const i = [], r = []; for (const a of this.seq) a.type === e.SAMPLER_2D_SHADOW || a.type === e.SAMPLER_CUBE_SHADOW || a.type === e.SAMPLER_2D_ARRAY_SHADOW ? i.push(a) : r.push(a); i.length > 0 && (this.seq = i.concat(r)) } setValue(e, t, n, i) { const r = this.map[t]; r !== void 0 && r.setValue(e, n, i) } setOptional(e, t, n) { const i = t[n]; i !== void 0 && this.setValue(e, n, i) } static upload(e, t, n, i) { for (let r = 0, a = t.length; r !== a; ++r) { const o = t[r], l = n[o.id]; l.needsUpdate !== !1 && o.setValue(e, l.value, i) } } static seqWithValue(e, t) { const n = []; for (let i = 0, r = e.length; i !== r; ++i) { const a = e[i]; a.id in t && n.push(a) } return n } } function oc(s, e, t) { const n = s.createShader(e); return s.shaderSource(n, t), s.compileShader(n), n } const Ug = 37297; let Fg = 0; function Og(s, e) {
	const t = s.split(`
`), n = [], i = Math.max(e - 6, 0), r = Math.min(e + 6, t.length); for (let a = i; a < r; a++) { const o = a + 1; n.push(`${o === e ? ">" : " "} ${o}: ${t[a]}`) } return n.join(`
`)
} const lc = new De; function Bg(s) { We._getMatrix(lc, We.workingColorSpace, s); const e = `mat3( ${lc.elements.map(t => t.toFixed(4))} )`; switch (We.getTransfer(s)) { case _r: return [e, "LinearTransferOETF"]; case je: return [e, "sRGBTransferOETF"]; default: return Ee("WebGLProgram: Unsupported color space: ", s), [e, "LinearTransferOETF"] } } function cc(s, e, t) {
	const n = s.getShaderParameter(e, s.COMPILE_STATUS), r = (s.getShaderInfoLog(e) || "").trim(); if (n && r === "") return ""; const a = /ERROR: 0:(\d+)/.exec(r); if (a) {
		const o = parseInt(a[1]); return t.toUpperCase() + `

`+ r + `

`+ Og(s.getShaderSource(e), o)
	} else return r
} function zg(s, e) {
	const t = Bg(e); return [`vec4 ${s}( vec4 value ) {`, `	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`, "}"].join(`
`)
} const kg = { [wc]: "Linear", [Rc]: "Reinhard", [Cc]: "Cineon", [Pc]: "ACESFilmic", [Ic]: "AgX", [Dc]: "Neutral", [Lc]: "Custom" }; function Vg(s, e) { const t = kg[e]; return t === void 0 ? (Ee("WebGLProgram: Unsupported toneMapping:", e), "vec3 " + s + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + s + "( vec3 color ) { return " + t + "ToneMapping( color ); }" } const or = new L; function Hg() {
	We.getLuminanceCoefficients(or); const s = or.x.toFixed(4), e = or.y.toFixed(4), t = or.z.toFixed(4); return ["float luminance( const in vec3 rgb ) {", `	const vec3 weights = vec3( ${s}, ${e}, ${t} );`, "	return dot( weights, rgb );", "}"].join(`
`)
} function Gg(s) {
	return [s.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", s.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(hs).join(`
`)
} function Wg(s) {
	const e = []; for (const t in s) { const n = s[t]; n !== !1 && e.push("#define " + t + " " + n) } return e.join(`
`)
} function Xg(s, e) { const t = {}, n = s.getProgramParameter(e, s.ACTIVE_ATTRIBUTES); for (let i = 0; i < n; i++) { const r = s.getActiveAttrib(e, i), a = r.name; let o = 1; r.type === s.FLOAT_MAT2 && (o = 2), r.type === s.FLOAT_MAT3 && (o = 3), r.type === s.FLOAT_MAT4 && (o = 4), t[a] = { type: r.type, location: s.getAttribLocation(e, a), locationSize: o } } return t } function hs(s) { return s !== "" } function hc(s, e) { const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps; return s.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows) } function uc(s, e) { return s.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection) } const Yg = /^[ \t]*#include +<([\w\d./]+)>/gm; function fo(s) { return s.replace(Yg, $g) } const qg = new Map; function $g(s, e) { let t = Oe[e]; if (t === void 0) { const n = qg.get(e); if (n !== void 0) t = Oe[n], Ee('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, n); else throw new Error("Can not resolve #include <" + e + ">") } return fo(t) } const Kg = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g; function dc(s) { return s.replace(Kg, jg) } function jg(s, e, t, n) { let i = ""; for (let r = parseInt(e); r < parseInt(t); r++)i += n.replace(/\[\s*i\s*\]/g, "[ " + r + " ]").replace(/UNROLLED_LOOP_INDEX/g, r); return i } function fc(s) {
	let e = `precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`; return s.precision === "highp" ? e += `
#define HIGH_PRECISION`: s.precision === "mediump" ? e += `
#define MEDIUM_PRECISION`: s.precision === "lowp" && (e += `
#define LOW_PRECISION`), e
} const Zg = { [lr]: "SHADOWMAP_TYPE_PCF", [ls]: "SHADOWMAP_TYPE_VSM" }; function Jg(s) { return Zg[s.shadowMapType] || "SHADOWMAP_TYPE_BASIC" } const Qg = { [di]: "ENVMAP_TYPE_CUBE", [Bi]: "ENVMAP_TYPE_CUBE", [yr]: "ENVMAP_TYPE_CUBE_UV" }; function e_(s) { return s.envMap === !1 ? "ENVMAP_TYPE_CUBE" : Qg[s.envMapMode] || "ENVMAP_TYPE_CUBE" } const t_ = { [Bi]: "ENVMAP_MODE_REFRACTION" }; function n_(s) { return s.envMap === !1 ? "ENVMAP_MODE_REFLECTION" : t_[s.envMapMode] || "ENVMAP_MODE_REFLECTION" } const i_ = { [vo]: "ENVMAP_BLENDING_MULTIPLY", [Xh]: "ENVMAP_BLENDING_MIX", [Yh]: "ENVMAP_BLENDING_ADD" }; function s_(s) { return s.envMap === !1 ? "ENVMAP_BLENDING_NONE" : i_[s.combine] || "ENVMAP_BLENDING_NONE" } function r_(s) { const e = s.envMapCubeUVHeight; if (e === null) return null; const t = Math.log2(e) - 2, n = 1 / e; return { texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 112)), texelHeight: n, maxMip: t } } function a_(s, e, t, n) {
	const i = s.getContext(), r = t.defines; let a = t.vertexShader, o = t.fragmentShader; const l = Jg(t), c = e_(t), h = n_(t), d = s_(t), u = r_(t), f = Gg(t), g = Wg(r), v = i.createProgram(); let m, p, M = t.glslVersion ? "#version " + t.glslVersion + `
`: ""; t.isRawShaderMaterial ? (m = ["#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, g].filter(hs).join(`
`), m.length > 0 && (m += `
`), p = ["#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, g].filter(hs).join(`
`), p.length > 0 && (p += `
`)) : (m = [fc(t), "#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, g, t.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "", t.batching ? "#define USE_BATCHING" : "", t.batchingColor ? "#define USE_BATCHING_COLOR" : "", t.instancing ? "#define USE_INSTANCING" : "", t.instancingColor ? "#define USE_INSTANCING_COLOR" : "", t.instancingMorph ? "#define USE_INSTANCING_MORPH" : "", t.useFog && t.fog ? "#define USE_FOG" : "", t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "", t.map ? "#define USE_MAP" : "", t.envMap ? "#define USE_ENVMAP" : "", t.envMap ? "#define " + h : "", t.lightMap ? "#define USE_LIGHTMAP" : "", t.aoMap ? "#define USE_AOMAP" : "", t.bumpMap ? "#define USE_BUMPMAP" : "", t.normalMap ? "#define USE_NORMALMAP" : "", t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "", t.emissiveMap ? "#define USE_EMISSIVEMAP" : "", t.anisotropy ? "#define USE_ANISOTROPY" : "", t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", t.specularMap ? "#define USE_SPECULARMAP" : "", t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", t.metalnessMap ? "#define USE_METALNESSMAP" : "", t.alphaMap ? "#define USE_ALPHAMAP" : "", t.alphaHash ? "#define USE_ALPHAHASH" : "", t.transmission ? "#define USE_TRANSMISSION" : "", t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", t.thicknessMap ? "#define USE_THICKNESSMAP" : "", t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", t.mapUv ? "#define MAP_UV " + t.mapUv : "", t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "", t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "", t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "", t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "", t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "", t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "", t.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv : "", t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "", t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "", t.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv : "", t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "", t.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv : "", t.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv : "", t.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv : "", t.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv : "", t.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv : "", t.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv : "", t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "", t.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv : "", t.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv : "", t.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv : "", t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "", t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "", t.vertexColors ? "#define USE_COLOR" : "", t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", t.vertexUv1s ? "#define USE_UV1" : "", t.vertexUv2s ? "#define USE_UV2" : "", t.vertexUv3s ? "#define USE_UV3" : "", t.pointsUvs ? "#define USE_POINTS_UV" : "", t.flatShading ? "#define FLAT_SHADED" : "", t.skinning ? "#define USE_SKINNING" : "", t.morphTargets ? "#define USE_MORPHTARGETS" : "", t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "", t.morphColors ? "#define USE_MORPHCOLORS" : "", t.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "", t.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "", t.doubleSided ? "#define DOUBLE_SIDED" : "", t.flipSided ? "#define FLIP_SIDED" : "", t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", t.shadowMapEnabled ? "#define " + l : "", t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", t.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "", t.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "	attribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "	attribute vec3 instanceColor;", "#endif", "#ifdef USE_INSTANCING_MORPH", "	uniform sampler2D morphTexture;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_UV1", "	attribute vec2 uv1;", "#endif", "#ifdef USE_UV2", "	attribute vec2 uv2;", "#endif", "#ifdef USE_UV3", "	attribute vec2 uv3;", "#endif", "#ifdef USE_TANGENT", "	attribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "	attribute vec4 color;", "#elif defined( USE_COLOR )", "	attribute vec3 color;", "#endif", "#ifdef USE_SKINNING", "	attribute vec4 skinIndex;", "	attribute vec4 skinWeight;", "#endif", `
`].filter(hs).join(`
`), p = [fc(t), "#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, g, t.useFog && t.fog ? "#define USE_FOG" : "", t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "", t.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "", t.map ? "#define USE_MAP" : "", t.matcap ? "#define USE_MATCAP" : "", t.envMap ? "#define USE_ENVMAP" : "", t.envMap ? "#define " + c : "", t.envMap ? "#define " + h : "", t.envMap ? "#define " + d : "", u ? "#define CUBEUV_TEXEL_WIDTH " + u.texelWidth : "", u ? "#define CUBEUV_TEXEL_HEIGHT " + u.texelHeight : "", u ? "#define CUBEUV_MAX_MIP " + u.maxMip + ".0" : "", t.lightMap ? "#define USE_LIGHTMAP" : "", t.aoMap ? "#define USE_AOMAP" : "", t.bumpMap ? "#define USE_BUMPMAP" : "", t.normalMap ? "#define USE_NORMALMAP" : "", t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", t.emissiveMap ? "#define USE_EMISSIVEMAP" : "", t.anisotropy ? "#define USE_ANISOTROPY" : "", t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", t.clearcoat ? "#define USE_CLEARCOAT" : "", t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", t.dispersion ? "#define USE_DISPERSION" : "", t.iridescence ? "#define USE_IRIDESCENCE" : "", t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", t.specularMap ? "#define USE_SPECULARMAP" : "", t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", t.metalnessMap ? "#define USE_METALNESSMAP" : "", t.alphaMap ? "#define USE_ALPHAMAP" : "", t.alphaTest ? "#define USE_ALPHATEST" : "", t.alphaHash ? "#define USE_ALPHAHASH" : "", t.sheen ? "#define USE_SHEEN" : "", t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", t.transmission ? "#define USE_TRANSMISSION" : "", t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", t.thicknessMap ? "#define USE_THICKNESSMAP" : "", t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "", t.vertexColors || t.instancingColor ? "#define USE_COLOR" : "", t.vertexAlphas || t.batchingColor ? "#define USE_COLOR_ALPHA" : "", t.vertexUv1s ? "#define USE_UV1" : "", t.vertexUv2s ? "#define USE_UV2" : "", t.vertexUv3s ? "#define USE_UV3" : "", t.pointsUvs ? "#define USE_POINTS_UV" : "", t.gradientMap ? "#define USE_GRADIENTMAP" : "", t.flatShading ? "#define FLAT_SHADED" : "", t.doubleSided ? "#define DOUBLE_SIDED" : "", t.flipSided ? "#define FLIP_SIDED" : "", t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", t.shadowMapEnabled ? "#define " + l : "", t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "", t.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "", t.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "", t.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", t.toneMapping !== gn ? "#define TONE_MAPPING" : "", t.toneMapping !== gn ? Oe.tonemapping_pars_fragment : "", t.toneMapping !== gn ? Vg("toneMapping", t.toneMapping) : "", t.dithering ? "#define DITHERING" : "", t.opaque ? "#define OPAQUE" : "", Oe.colorspace_pars_fragment, zg("linearToOutputTexel", t.outputColorSpace), Hg(), t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "", `
`].filter(hs).join(`
`)), a = fo(a), a = hc(a, t), a = uc(a, t), o = fo(o), o = hc(o, t), o = uc(o, t), a = dc(a), o = dc(o), t.isRawShaderMaterial !== !0 && (M = `#version 300 es
`, m = [f, "#define attribute in", "#define varying out", "#define texture2D texture"].join(`
`) + `
`+ m, p = ["#define varying in", t.glslVersion === hl ? "" : "layout(location = 0) out highp vec4 pc_fragColor;", t.glslVersion === hl ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join(`
`) + `
`+ p); const E = M + m + a, y = M + p + o, w = oc(i, i.VERTEX_SHADER, E), A = oc(i, i.FRAGMENT_SHADER, y); i.attachShader(v, w), i.attachShader(v, A), t.index0AttributeName !== void 0 ? i.bindAttribLocation(v, 0, t.index0AttributeName) : t.morphTargets === !0 && i.bindAttribLocation(v, 0, "position"), i.linkProgram(v); function C(R) {
		if (s.debug.checkShaderErrors) {
			const U = i.getProgramInfoLog(v) || "", O = i.getShaderInfoLog(w) || "", G = i.getShaderInfoLog(A) || "", z = U.trim(), V = O.trim(), F = G.trim(); let Q = !0, j = !0; if (i.getProgramParameter(v, i.LINK_STATUS) === !1) if (Q = !1, typeof s.debug.onShaderError == "function") s.debug.onShaderError(i, v, w, A); else {
				const ce = cc(i, w, "vertex"), pe = cc(i, A, "fragment"); Ce("THREE.WebGLProgram: Shader Error " + i.getError() + " - VALIDATE_STATUS " + i.getProgramParameter(v, i.VALIDATE_STATUS) + `

Material Name: `+ R.name + `
Material Type: `+ R.type + `

Program Info Log: `+ z + `
`+ ce + `
`+ pe)
			} else z !== "" ? Ee("WebGLProgram: Program Info Log:", z) : (V === "" || F === "") && (j = !1); j && (R.diagnostics = { runnable: Q, programLog: z, vertexShader: { log: V, prefix: m }, fragmentShader: { log: F, prefix: p } })
		} i.deleteShader(w), i.deleteShader(A), x = new mr(i, v), b = Xg(i, v)
	} let x; this.getUniforms = function () { return x === void 0 && C(this), x }; let b; this.getAttributes = function () { return b === void 0 && C(this), b }; let W = t.rendererExtensionParallelShaderCompile === !1; return this.isReady = function () { return W === !1 && (W = i.getProgramParameter(v, Ug)), W }, this.destroy = function () { n.releaseStatesOfProgram(this), i.deleteProgram(v), this.program = void 0 }, this.type = t.shaderType, this.name = t.shaderName, this.id = Fg++, this.cacheKey = e, this.usedTimes = 1, this.program = v, this.vertexShader = w, this.fragmentShader = A, this
} let o_ = 0; class l_ { constructor() { this.shaderCache = new Map, this.materialCache = new Map } update(e) { const t = e.vertexShader, n = e.fragmentShader, i = this._getShaderStage(t), r = this._getShaderStage(n), a = this._getShaderCacheForMaterial(e); return a.has(i) === !1 && (a.add(i), i.usedTimes++), a.has(r) === !1 && (a.add(r), r.usedTimes++), this } remove(e) { const t = this.materialCache.get(e); for (const n of t) n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code); return this.materialCache.delete(e), this } getVertexShaderID(e) { return this._getShaderStage(e.vertexShader).id } getFragmentShaderID(e) { return this._getShaderStage(e.fragmentShader).id } dispose() { this.shaderCache.clear(), this.materialCache.clear() } _getShaderCacheForMaterial(e) { const t = this.materialCache; let n = t.get(e); return n === void 0 && (n = new Set, t.set(e, n)), n } _getShaderStage(e) { const t = this.shaderCache; let n = t.get(e); return n === void 0 && (n = new c_(e), t.set(e, n)), n } } class c_ { constructor(e) { this.id = o_++, this.code = e, this.usedTimes = 0 } } function h_(s, e, t, n, i, r) { const a = new Xc, o = new l_, l = new Set, c = [], h = new Map, d = n.logarithmicDepthBuffer; let u = n.precision; const f = { MeshDepthMaterial: "depth", MeshDistanceMaterial: "distance", MeshNormalMaterial: "normal", MeshBasicMaterial: "basic", MeshLambertMaterial: "lambert", MeshPhongMaterial: "phong", MeshToonMaterial: "toon", MeshStandardMaterial: "physical", MeshPhysicalMaterial: "physical", MeshMatcapMaterial: "matcap", LineBasicMaterial: "basic", LineDashedMaterial: "dashed", PointsMaterial: "points", ShadowMaterial: "shadow", SpriteMaterial: "sprite" }; function g(x) { return l.add(x), x === 0 ? "uv" : `uv${x}` } function v(x, b, W, R, U) { const O = R.fog, G = U.geometry, z = x.isMeshStandardMaterial || x.isMeshLambertMaterial || x.isMeshPhongMaterial ? R.environment : null, V = x.isMeshStandardMaterial || x.isMeshLambertMaterial && !x.envMap || x.isMeshPhongMaterial && !x.envMap, F = e.get(x.envMap || z, V), Q = F && F.mapping === yr ? F.image.height : null, j = f[x.type]; x.precision !== null && (u = n.getMaxPrecision(x.precision), u !== x.precision && Ee("WebGLProgram.getParameters:", x.precision, "not supported, using", u, "instead.")); const ce = G.morphAttributes.position || G.morphAttributes.normal || G.morphAttributes.color, pe = ce !== void 0 ? ce.length : 0; let ue = 0; G.morphAttributes.position !== void 0 && (ue = 1), G.morphAttributes.normal !== void 0 && (ue = 2), G.morphAttributes.color !== void 0 && (ue = 3); let Fe, lt, at, $; if (j) { const Ke = fn[j]; Fe = Ke.vertexShader, lt = Ke.fragmentShader } else Fe = x.vertexShader, lt = x.fragmentShader, o.update(x), at = o.getVertexShaderID(x), $ = o.getFragmentShaderID(x); const ne = s.getRenderTarget(), re = s.state.buffers.depth.getReversed(), Ne = U.isInstancedMesh === !0, we = U.isBatchedMesh === !0, Pe = !!x.map, St = !!x.matcap, Xe = !!F, $e = !!x.aoMap, tt = !!x.lightMap, Be = !!x.bumpMap, dt = !!x.normalMap, P = !!x.displacementMap, mt = !!x.emissiveMap, qe = !!x.metalnessMap, st = !!x.roughnessMap, Me = x.anisotropy > 0, T = x.clearcoat > 0, _ = x.dispersion > 0, D = x.iridescence > 0, q = x.sheen > 0, K = x.transmission > 0, Y = Me && !!x.anisotropyMap, me = T && !!x.clearcoatMap, ie = T && !!x.clearcoatNormalMap, Te = T && !!x.clearcoatRoughnessMap, Re = D && !!x.iridescenceMap, Z = D && !!x.iridescenceThicknessMap, ee = q && !!x.sheenColorMap, ge = q && !!x.sheenRoughnessMap, xe = !!x.specularMap, he = !!x.specularColorMap, ze = !!x.specularIntensityMap, I = K && !!x.transmissionMap, se = K && !!x.thicknessMap, te = !!x.gradientMap, fe = !!x.alphaMap, J = x.alphaTest > 0, X = !!x.alphaHash, _e = !!x.extensions; let Le = gn; x.toneMapped && (ne === null || ne.isXRRenderTarget === !0) && (Le = s.toneMapping); const rt = { shaderID: j, shaderType: x.type, shaderName: x.name, vertexShader: Fe, fragmentShader: lt, defines: x.defines, customVertexShaderID: at, customFragmentShaderID: $, isRawShaderMaterial: x.isRawShaderMaterial === !0, glslVersion: x.glslVersion, precision: u, batching: we, batchingColor: we && U._colorsTexture !== null, instancing: Ne, instancingColor: Ne && U.instanceColor !== null, instancingMorph: Ne && U.morphTexture !== null, outputColorSpace: ne === null ? s.outputColorSpace : ne.isXRRenderTarget === !0 ? ne.texture.colorSpace : Ot, alphaToCoverage: !!x.alphaToCoverage, map: Pe, matcap: St, envMap: Xe, envMapMode: Xe && F.mapping, envMapCubeUVHeight: Q, aoMap: $e, lightMap: tt, bumpMap: Be, normalMap: dt, displacementMap: P, emissiveMap: mt, normalMapObjectSpace: dt && x.normalMapType === Zh, normalMapTangentSpace: dt && x.normalMapType === wo, metalnessMap: qe, roughnessMap: st, anisotropy: Me, anisotropyMap: Y, clearcoat: T, clearcoatMap: me, clearcoatNormalMap: ie, clearcoatRoughnessMap: Te, dispersion: _, iridescence: D, iridescenceMap: Re, iridescenceThicknessMap: Z, sheen: q, sheenColorMap: ee, sheenRoughnessMap: ge, specularMap: xe, specularColorMap: he, specularIntensityMap: ze, transmission: K, transmissionMap: I, thicknessMap: se, gradientMap: te, opaque: x.transparent === !1 && x.blending === Di && x.alphaToCoverage === !1, alphaMap: fe, alphaTest: J, alphaHash: X, combine: x.combine, mapUv: Pe && g(x.map.channel), aoMapUv: $e && g(x.aoMap.channel), lightMapUv: tt && g(x.lightMap.channel), bumpMapUv: Be && g(x.bumpMap.channel), normalMapUv: dt && g(x.normalMap.channel), displacementMapUv: P && g(x.displacementMap.channel), emissiveMapUv: mt && g(x.emissiveMap.channel), metalnessMapUv: qe && g(x.metalnessMap.channel), roughnessMapUv: st && g(x.roughnessMap.channel), anisotropyMapUv: Y && g(x.anisotropyMap.channel), clearcoatMapUv: me && g(x.clearcoatMap.channel), clearcoatNormalMapUv: ie && g(x.clearcoatNormalMap.channel), clearcoatRoughnessMapUv: Te && g(x.clearcoatRoughnessMap.channel), iridescenceMapUv: Re && g(x.iridescenceMap.channel), iridescenceThicknessMapUv: Z && g(x.iridescenceThicknessMap.channel), sheenColorMapUv: ee && g(x.sheenColorMap.channel), sheenRoughnessMapUv: ge && g(x.sheenRoughnessMap.channel), specularMapUv: xe && g(x.specularMap.channel), specularColorMapUv: he && g(x.specularColorMap.channel), specularIntensityMapUv: ze && g(x.specularIntensityMap.channel), transmissionMapUv: I && g(x.transmissionMap.channel), thicknessMapUv: se && g(x.thicknessMap.channel), alphaMapUv: fe && g(x.alphaMap.channel), vertexTangents: !!G.attributes.tangent && (dt || Me), vertexColors: x.vertexColors, vertexAlphas: x.vertexColors === !0 && !!G.attributes.color && G.attributes.color.itemSize === 4, pointsUvs: U.isPoints === !0 && !!G.attributes.uv && (Pe || fe), fog: !!O, useFog: x.fog === !0, fogExp2: !!O && O.isFogExp2, flatShading: x.wireframe === !1 && (x.flatShading === !0 || G.attributes.normal === void 0 && dt === !1 && (x.isMeshLambertMaterial || x.isMeshPhongMaterial || x.isMeshStandardMaterial || x.isMeshPhysicalMaterial)), sizeAttenuation: x.sizeAttenuation === !0, logarithmicDepthBuffer: d, reversedDepthBuffer: re, skinning: U.isSkinnedMesh === !0, morphTargets: G.morphAttributes.position !== void 0, morphNormals: G.morphAttributes.normal !== void 0, morphColors: G.morphAttributes.color !== void 0, morphTargetsCount: pe, morphTextureStride: ue, numDirLights: b.directional.length, numPointLights: b.point.length, numSpotLights: b.spot.length, numSpotLightMaps: b.spotLightMap.length, numRectAreaLights: b.rectArea.length, numHemiLights: b.hemi.length, numDirLightShadows: b.directionalShadowMap.length, numPointLightShadows: b.pointShadowMap.length, numSpotLightShadows: b.spotShadowMap.length, numSpotLightShadowsWithMaps: b.numSpotLightShadowsWithMaps, numLightProbes: b.numLightProbes, numClippingPlanes: r.numPlanes, numClipIntersection: r.numIntersection, dithering: x.dithering, shadowMapEnabled: s.shadowMap.enabled && W.length > 0, shadowMapType: s.shadowMap.type, toneMapping: Le, decodeVideoTexture: Pe && x.map.isVideoTexture === !0 && We.getTransfer(x.map.colorSpace) === je, decodeVideoTextureEmissive: mt && x.emissiveMap.isVideoTexture === !0 && We.getTransfer(x.emissiveMap.colorSpace) === je, premultipliedAlpha: x.premultipliedAlpha, doubleSided: x.side === Qt, flipSided: x.side === Bt, useDepthPacking: x.depthPacking >= 0, depthPacking: x.depthPacking || 0, index0AttributeName: x.index0AttributeName, extensionClipCullDistance: _e && x.extensions.clipCullDistance === !0 && t.has("WEBGL_clip_cull_distance"), extensionMultiDraw: (_e && x.extensions.multiDraw === !0 || we) && t.has("WEBGL_multi_draw"), rendererExtensionParallelShaderCompile: t.has("KHR_parallel_shader_compile"), customProgramCacheKey: x.customProgramCacheKey() }; return rt.vertexUv1s = l.has(1), rt.vertexUv2s = l.has(2), rt.vertexUv3s = l.has(3), l.clear(), rt } function m(x) { const b = []; if (x.shaderID ? b.push(x.shaderID) : (b.push(x.customVertexShaderID), b.push(x.customFragmentShaderID)), x.defines !== void 0) for (const W in x.defines) b.push(W), b.push(x.defines[W]); return x.isRawShaderMaterial === !1 && (p(b, x), M(b, x), b.push(s.outputColorSpace)), b.push(x.customProgramCacheKey), b.join() } function p(x, b) { x.push(b.precision), x.push(b.outputColorSpace), x.push(b.envMapMode), x.push(b.envMapCubeUVHeight), x.push(b.mapUv), x.push(b.alphaMapUv), x.push(b.lightMapUv), x.push(b.aoMapUv), x.push(b.bumpMapUv), x.push(b.normalMapUv), x.push(b.displacementMapUv), x.push(b.emissiveMapUv), x.push(b.metalnessMapUv), x.push(b.roughnessMapUv), x.push(b.anisotropyMapUv), x.push(b.clearcoatMapUv), x.push(b.clearcoatNormalMapUv), x.push(b.clearcoatRoughnessMapUv), x.push(b.iridescenceMapUv), x.push(b.iridescenceThicknessMapUv), x.push(b.sheenColorMapUv), x.push(b.sheenRoughnessMapUv), x.push(b.specularMapUv), x.push(b.specularColorMapUv), x.push(b.specularIntensityMapUv), x.push(b.transmissionMapUv), x.push(b.thicknessMapUv), x.push(b.combine), x.push(b.fogExp2), x.push(b.sizeAttenuation), x.push(b.morphTargetsCount), x.push(b.morphAttributeCount), x.push(b.numDirLights), x.push(b.numPointLights), x.push(b.numSpotLights), x.push(b.numSpotLightMaps), x.push(b.numHemiLights), x.push(b.numRectAreaLights), x.push(b.numDirLightShadows), x.push(b.numPointLightShadows), x.push(b.numSpotLightShadows), x.push(b.numSpotLightShadowsWithMaps), x.push(b.numLightProbes), x.push(b.shadowMapType), x.push(b.toneMapping), x.push(b.numClippingPlanes), x.push(b.numClipIntersection), x.push(b.depthPacking) } function M(x, b) { a.disableAll(), b.instancing && a.enable(0), b.instancingColor && a.enable(1), b.instancingMorph && a.enable(2), b.matcap && a.enable(3), b.envMap && a.enable(4), b.normalMapObjectSpace && a.enable(5), b.normalMapTangentSpace && a.enable(6), b.clearcoat && a.enable(7), b.iridescence && a.enable(8), b.alphaTest && a.enable(9), b.vertexColors && a.enable(10), b.vertexAlphas && a.enable(11), b.vertexUv1s && a.enable(12), b.vertexUv2s && a.enable(13), b.vertexUv3s && a.enable(14), b.vertexTangents && a.enable(15), b.anisotropy && a.enable(16), b.alphaHash && a.enable(17), b.batching && a.enable(18), b.dispersion && a.enable(19), b.batchingColor && a.enable(20), b.gradientMap && a.enable(21), x.push(a.mask), a.disableAll(), b.fog && a.enable(0), b.useFog && a.enable(1), b.flatShading && a.enable(2), b.logarithmicDepthBuffer && a.enable(3), b.reversedDepthBuffer && a.enable(4), b.skinning && a.enable(5), b.morphTargets && a.enable(6), b.morphNormals && a.enable(7), b.morphColors && a.enable(8), b.premultipliedAlpha && a.enable(9), b.shadowMapEnabled && a.enable(10), b.doubleSided && a.enable(11), b.flipSided && a.enable(12), b.useDepthPacking && a.enable(13), b.dithering && a.enable(14), b.transmission && a.enable(15), b.sheen && a.enable(16), b.opaque && a.enable(17), b.pointsUvs && a.enable(18), b.decodeVideoTexture && a.enable(19), b.decodeVideoTextureEmissive && a.enable(20), b.alphaToCoverage && a.enable(21), x.push(a.mask) } function E(x) { const b = f[x.type]; let W; if (b) { const R = fn[b]; W = sd.clone(R.uniforms) } else W = x.uniforms; return W } function y(x, b) { let W = h.get(b); return W !== void 0 ? ++W.usedTimes : (W = new a_(s, b, x, i), c.push(W), h.set(b, W)), W } function w(x) { if (--x.usedTimes === 0) { const b = c.indexOf(x); c[b] = c[c.length - 1], c.pop(), h.delete(x.cacheKey), x.destroy() } } function A(x) { o.remove(x) } function C() { o.dispose() } return { getParameters: v, getProgramCacheKey: m, getUniforms: E, acquireProgram: y, releaseProgram: w, releaseShaderCache: A, programs: c, dispose: C } } function u_() { let s = new WeakMap; function e(a) { return s.has(a) } function t(a) { let o = s.get(a); return o === void 0 && (o = {}, s.set(a, o)), o } function n(a) { s.delete(a) } function i(a, o, l) { s.get(a)[o] = l } function r() { s = new WeakMap } return { has: e, get: t, remove: n, update: i, dispose: r } } function d_(s, e) { return s.groupOrder !== e.groupOrder ? s.groupOrder - e.groupOrder : s.renderOrder !== e.renderOrder ? s.renderOrder - e.renderOrder : s.material.id !== e.material.id ? s.material.id - e.material.id : s.materialVariant !== e.materialVariant ? s.materialVariant - e.materialVariant : s.z !== e.z ? s.z - e.z : s.id - e.id } function pc(s, e) { return s.groupOrder !== e.groupOrder ? s.groupOrder - e.groupOrder : s.renderOrder !== e.renderOrder ? s.renderOrder - e.renderOrder : s.z !== e.z ? e.z - s.z : s.id - e.id } function mc() { const s = []; let e = 0; const t = [], n = [], i = []; function r() { e = 0, t.length = 0, n.length = 0, i.length = 0 } function a(u) { let f = 0; return u.isInstancedMesh && (f += 2), u.isSkinnedMesh && (f += 1), f } function o(u, f, g, v, m, p) { let M = s[e]; return M === void 0 ? (M = { id: u.id, object: u, geometry: f, material: g, materialVariant: a(u), groupOrder: v, renderOrder: u.renderOrder, z: m, group: p }, s[e] = M) : (M.id = u.id, M.object = u, M.geometry = f, M.material = g, M.materialVariant = a(u), M.groupOrder = v, M.renderOrder = u.renderOrder, M.z = m, M.group = p), e++, M } function l(u, f, g, v, m, p) { const M = o(u, f, g, v, m, p); g.transmission > 0 ? n.push(M) : g.transparent === !0 ? i.push(M) : t.push(M) } function c(u, f, g, v, m, p) { const M = o(u, f, g, v, m, p); g.transmission > 0 ? n.unshift(M) : g.transparent === !0 ? i.unshift(M) : t.unshift(M) } function h(u, f) { t.length > 1 && t.sort(u || d_), n.length > 1 && n.sort(f || pc), i.length > 1 && i.sort(f || pc) } function d() { for (let u = e, f = s.length; u < f; u++) { const g = s[u]; if (g.id === null) break; g.id = null, g.object = null, g.geometry = null, g.material = null, g.group = null } } return { opaque: t, transmissive: n, transparent: i, init: r, push: l, unshift: c, finish: d, sort: h } } function f_() { let s = new WeakMap; function e(n, i) { const r = s.get(n); let a; return r === void 0 ? (a = new mc, s.set(n, [a])) : i >= r.length ? (a = new mc, r.push(a)) : a = r[i], a } function t() { s = new WeakMap } return { get: e, dispose: t } } function p_() { const s = {}; return { get: function (e) { if (s[e.id] !== void 0) return s[e.id]; let t; switch (e.type) { case "DirectionalLight": t = { direction: new L, color: new Ae }; break; case "SpotLight": t = { position: new L, direction: new L, color: new Ae, distance: 0, coneCos: 0, penumbraCos: 0, decay: 0 }; break; case "PointLight": t = { position: new L, color: new Ae, distance: 0, decay: 0 }; break; case "HemisphereLight": t = { direction: new L, skyColor: new Ae, groundColor: new Ae }; break; case "RectAreaLight": t = { color: new Ae, position: new L, halfWidth: new L, halfHeight: new L }; break }return s[e.id] = t, t } } } function m_() { const s = {}; return { get: function (e) { if (s[e.id] !== void 0) return s[e.id]; let t; switch (e.type) { case "DirectionalLight": t = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new Ge }; break; case "SpotLight": t = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new Ge }; break; case "PointLight": t = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new Ge, shadowCameraNear: 1, shadowCameraFar: 1e3 }; break }return s[e.id] = t, t } } } let g_ = 0; function __(s, e) { return (e.castShadow ? 2 : 0) - (s.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (s.map ? 1 : 0) } function x_(s) { const e = new p_, t = m_(), n = { version: 0, hash: { directionalLength: -1, pointLength: -1, spotLength: -1, rectAreaLength: -1, hemiLength: -1, numDirectionalShadows: -1, numPointShadows: -1, numSpotShadows: -1, numSpotMaps: -1, numLightProbes: -1 }, ambient: [0, 0, 0], probe: [], directional: [], directionalShadow: [], directionalShadowMap: [], directionalShadowMatrix: [], spot: [], spotLightMap: [], spotShadow: [], spotShadowMap: [], spotLightMatrix: [], rectArea: [], rectAreaLTC1: null, rectAreaLTC2: null, point: [], pointShadow: [], pointShadowMap: [], pointShadowMatrix: [], hemi: [], numSpotLightShadowsWithMaps: 0, numLightProbes: 0 }; for (let c = 0; c < 9; c++)n.probe.push(new L); const i = new L, r = new Ue, a = new Ue; function o(c) { let h = 0, d = 0, u = 0; for (let b = 0; b < 9; b++)n.probe[b].set(0, 0, 0); let f = 0, g = 0, v = 0, m = 0, p = 0, M = 0, E = 0, y = 0, w = 0, A = 0, C = 0; c.sort(__); for (let b = 0, W = c.length; b < W; b++) { const R = c[b], U = R.color, O = R.intensity, G = R.distance; let z = null; if (R.shadow && R.shadow.map && (R.shadow.map.texture.format === zi ? z = R.shadow.map.texture : z = R.shadow.map.depthTexture || R.shadow.map.texture), R.isAmbientLight) h += U.r * O, d += U.g * O, u += U.b * O; else if (R.isLightProbe) { for (let V = 0; V < 9; V++)n.probe[V].addScaledVector(R.sh.coefficients[V], O); C++ } else if (R.isDirectionalLight) { const V = e.get(R); if (V.color.copy(R.color).multiplyScalar(R.intensity), R.castShadow) { const F = R.shadow, Q = t.get(R); Q.shadowIntensity = F.intensity, Q.shadowBias = F.bias, Q.shadowNormalBias = F.normalBias, Q.shadowRadius = F.radius, Q.shadowMapSize = F.mapSize, n.directionalShadow[f] = Q, n.directionalShadowMap[f] = z, n.directionalShadowMatrix[f] = R.shadow.matrix, M++ } n.directional[f] = V, f++ } else if (R.isSpotLight) { const V = e.get(R); V.position.setFromMatrixPosition(R.matrixWorld), V.color.copy(U).multiplyScalar(O), V.distance = G, V.coneCos = Math.cos(R.angle), V.penumbraCos = Math.cos(R.angle * (1 - R.penumbra)), V.decay = R.decay, n.spot[v] = V; const F = R.shadow; if (R.map && (n.spotLightMap[w] = R.map, w++, F.updateMatrices(R), R.castShadow && A++), n.spotLightMatrix[v] = F.matrix, R.castShadow) { const Q = t.get(R); Q.shadowIntensity = F.intensity, Q.shadowBias = F.bias, Q.shadowNormalBias = F.normalBias, Q.shadowRadius = F.radius, Q.shadowMapSize = F.mapSize, n.spotShadow[v] = Q, n.spotShadowMap[v] = z, y++ } v++ } else if (R.isRectAreaLight) { const V = e.get(R); V.color.copy(U).multiplyScalar(O), V.halfWidth.set(R.width * .5, 0, 0), V.halfHeight.set(0, R.height * .5, 0), n.rectArea[m] = V, m++ } else if (R.isPointLight) { const V = e.get(R); if (V.color.copy(R.color).multiplyScalar(R.intensity), V.distance = R.distance, V.decay = R.decay, R.castShadow) { const F = R.shadow, Q = t.get(R); Q.shadowIntensity = F.intensity, Q.shadowBias = F.bias, Q.shadowNormalBias = F.normalBias, Q.shadowRadius = F.radius, Q.shadowMapSize = F.mapSize, Q.shadowCameraNear = F.camera.near, Q.shadowCameraFar = F.camera.far, n.pointShadow[g] = Q, n.pointShadowMap[g] = z, n.pointShadowMatrix[g] = R.shadow.matrix, E++ } n.point[g] = V, g++ } else if (R.isHemisphereLight) { const V = e.get(R); V.skyColor.copy(R.color).multiplyScalar(O), V.groundColor.copy(R.groundColor).multiplyScalar(O), n.hemi[p] = V, p++ } } m > 0 && (s.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = ae.LTC_FLOAT_1, n.rectAreaLTC2 = ae.LTC_FLOAT_2) : (n.rectAreaLTC1 = ae.LTC_HALF_1, n.rectAreaLTC2 = ae.LTC_HALF_2)), n.ambient[0] = h, n.ambient[1] = d, n.ambient[2] = u; const x = n.hash; (x.directionalLength !== f || x.pointLength !== g || x.spotLength !== v || x.rectAreaLength !== m || x.hemiLength !== p || x.numDirectionalShadows !== M || x.numPointShadows !== E || x.numSpotShadows !== y || x.numSpotMaps !== w || x.numLightProbes !== C) && (n.directional.length = f, n.spot.length = v, n.rectArea.length = m, n.point.length = g, n.hemi.length = p, n.directionalShadow.length = M, n.directionalShadowMap.length = M, n.pointShadow.length = E, n.pointShadowMap.length = E, n.spotShadow.length = y, n.spotShadowMap.length = y, n.directionalShadowMatrix.length = M, n.pointShadowMatrix.length = E, n.spotLightMatrix.length = y + w - A, n.spotLightMap.length = w, n.numSpotLightShadowsWithMaps = A, n.numLightProbes = C, x.directionalLength = f, x.pointLength = g, x.spotLength = v, x.rectAreaLength = m, x.hemiLength = p, x.numDirectionalShadows = M, x.numPointShadows = E, x.numSpotShadows = y, x.numSpotMaps = w, x.numLightProbes = C, n.version = g_++) } function l(c, h) { let d = 0, u = 0, f = 0, g = 0, v = 0; const m = h.matrixWorldInverse; for (let p = 0, M = c.length; p < M; p++) { const E = c[p]; if (E.isDirectionalLight) { const y = n.directional[d]; y.direction.setFromMatrixPosition(E.matrixWorld), i.setFromMatrixPosition(E.target.matrixWorld), y.direction.sub(i), y.direction.transformDirection(m), d++ } else if (E.isSpotLight) { const y = n.spot[f]; y.position.setFromMatrixPosition(E.matrixWorld), y.position.applyMatrix4(m), y.direction.setFromMatrixPosition(E.matrixWorld), i.setFromMatrixPosition(E.target.matrixWorld), y.direction.sub(i), y.direction.transformDirection(m), f++ } else if (E.isRectAreaLight) { const y = n.rectArea[g]; y.position.setFromMatrixPosition(E.matrixWorld), y.position.applyMatrix4(m), a.identity(), r.copy(E.matrixWorld), r.premultiply(m), a.extractRotation(r), y.halfWidth.set(E.width * .5, 0, 0), y.halfHeight.set(0, E.height * .5, 0), y.halfWidth.applyMatrix4(a), y.halfHeight.applyMatrix4(a), g++ } else if (E.isPointLight) { const y = n.point[u]; y.position.setFromMatrixPosition(E.matrixWorld), y.position.applyMatrix4(m), u++ } else if (E.isHemisphereLight) { const y = n.hemi[v]; y.direction.setFromMatrixPosition(E.matrixWorld), y.direction.transformDirection(m), v++ } } } return { setup: o, setupView: l, state: n } } function gc(s) { const e = new x_(s), t = [], n = []; function i(h) { c.camera = h, t.length = 0, n.length = 0 } function r(h) { t.push(h) } function a(h) { n.push(h) } function o() { e.setup(t) } function l(h) { e.setupView(t, h) } const c = { lightsArray: t, shadowsArray: n, camera: null, lights: e, transmissionRenderTarget: {} }; return { init: i, state: c, setupLights: o, setupLightsView: l, pushLight: r, pushShadow: a } } function v_(s) { let e = new WeakMap; function t(i, r = 0) { const a = e.get(i); let o; return a === void 0 ? (o = new gc(s), e.set(i, [o])) : r >= a.length ? (o = new gc(s), a.push(o)) : o = a[r], o } function n() { e = new WeakMap } return { get: t, dispose: n } } const M_ = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, S_ = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`, y_ = [new L(1, 0, 0), new L(-1, 0, 0), new L(0, 1, 0), new L(0, -1, 0), new L(0, 0, 1), new L(0, 0, -1)], b_ = [new L(0, -1, 0), new L(0, -1, 0), new L(0, 0, 1), new L(0, 0, -1), new L(0, -1, 0), new L(0, -1, 0)], _c = new Ue, rs = new L, pa = new L; function E_(s, e, t) { let n = new Uo; const i = new Ge, r = new Ge, a = new ot, o = new cd, l = new hd, c = {}, h = t.maxTextureSize, d = { [Fn]: Bt, [Bt]: Fn, [Qt]: Qt }, u = new Mn({ defines: { VSM_SAMPLES: 8 }, uniforms: { shadow_pass: { value: null }, resolution: { value: new Ge }, radius: { value: 4 } }, vertexShader: M_, fragmentShader: S_ }), f = u.clone(); f.defines.HORIZONTAL_PASS = 1; const g = new Rt; g.setAttribute("position", new Ft(new Float32Array([-1, -1, .5, 3, -1, .5, -1, 3, .5]), 3)); const v = new Tt(g, u), m = this; this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = lr; let p = this.type; this.render = function (A, C, x) { if (m.enabled === !1 || m.autoUpdate === !1 && m.needsUpdate === !1 || A.length === 0) return; this.type === Ah && (Ee("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."), this.type = lr); const b = s.getRenderTarget(), W = s.getActiveCubeFace(), R = s.getActiveMipmapLevel(), U = s.state; U.setBlending(Nn), U.buffers.depth.getReversed() === !0 ? U.buffers.color.setClear(0, 0, 0, 0) : U.buffers.color.setClear(1, 1, 1, 1), U.buffers.depth.setTest(!0), U.setScissorTest(!1); const O = p !== this.type; O && C.traverse(function (G) { G.material && (Array.isArray(G.material) ? G.material.forEach(z => z.needsUpdate = !0) : G.material.needsUpdate = !0) }); for (let G = 0, z = A.length; G < z; G++) { const V = A[G], F = V.shadow; if (F === void 0) { Ee("WebGLShadowMap:", V, "has no shadow."); continue } if (F.autoUpdate === !1 && F.needsUpdate === !1) continue; i.copy(F.mapSize); const Q = F.getFrameExtents(); i.multiply(Q), r.copy(F.mapSize), (i.x > h || i.y > h) && (i.x > h && (r.x = Math.floor(h / Q.x), i.x = r.x * Q.x, F.mapSize.x = r.x), i.y > h && (r.y = Math.floor(h / Q.y), i.y = r.y * Q.y, F.mapSize.y = r.y)); const j = s.state.buffers.depth.getReversed(); if (F.camera._reversedDepth = j, F.map === null || O === !0) { if (F.map !== null && (F.map.depthTexture !== null && (F.map.depthTexture.dispose(), F.map.depthTexture = null), F.map.dispose()), this.type === ls) { if (V.isPointLight) { Ee("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead."); continue } F.map = new _n(i.x, i.y, { format: zi, type: On, minFilter: xt, magFilter: xt, generateMipmaps: !1 }), F.map.texture.name = V.name + ".shadowMap", F.map.depthTexture = new bs(i.x, i.y, Xt), F.map.depthTexture.name = V.name + ".shadowMapDepth", F.map.depthTexture.format = Bn, F.map.depthTexture.compareFunction = null, F.map.depthTexture.minFilter = _t, F.map.depthTexture.magFilter = _t } else V.isPointLight ? (F.map = new ah(i.x), F.map.depthTexture = new nd(i.x, vn)) : (F.map = new _n(i.x, i.y), F.map.depthTexture = new bs(i.x, i.y, vn)), F.map.depthTexture.name = V.name + ".shadowMap", F.map.depthTexture.format = Bn, this.type === lr ? (F.map.depthTexture.compareFunction = j ? Co : Ro, F.map.depthTexture.minFilter = xt, F.map.depthTexture.magFilter = xt) : (F.map.depthTexture.compareFunction = null, F.map.depthTexture.minFilter = _t, F.map.depthTexture.magFilter = _t); F.camera.updateProjectionMatrix() } const ce = F.map.isWebGLCubeRenderTarget ? 6 : 1; for (let pe = 0; pe < ce; pe++) { if (F.map.isWebGLCubeRenderTarget) s.setRenderTarget(F.map, pe), s.clear(); else { pe === 0 && (s.setRenderTarget(F.map), s.clear()); const ue = F.getViewport(pe); a.set(r.x * ue.x, r.y * ue.y, r.x * ue.z, r.y * ue.w), U.viewport(a) } if (V.isPointLight) { const ue = F.camera, Fe = F.matrix, lt = V.distance || ue.far; lt !== ue.far && (ue.far = lt, ue.updateProjectionMatrix()), rs.setFromMatrixPosition(V.matrixWorld), ue.position.copy(rs), pa.copy(ue.position), pa.add(y_[pe]), ue.up.copy(b_[pe]), ue.lookAt(pa), ue.updateMatrixWorld(), Fe.makeTranslation(-rs.x, -rs.y, -rs.z), _c.multiplyMatrices(ue.projectionMatrix, ue.matrixWorldInverse), F._frustum.setFromProjectionMatrix(_c, ue.coordinateSystem, ue.reversedDepth) } else F.updateMatrices(V); n = F.getFrustum(), y(C, x, F.camera, V, this.type) } F.isPointLightShadow !== !0 && this.type === ls && M(F, x), F.needsUpdate = !1 } p = this.type, m.needsUpdate = !1, s.setRenderTarget(b, W, R) }; function M(A, C) { const x = e.update(v); u.defines.VSM_SAMPLES !== A.blurSamples && (u.defines.VSM_SAMPLES = A.blurSamples, f.defines.VSM_SAMPLES = A.blurSamples, u.needsUpdate = !0, f.needsUpdate = !0), A.mapPass === null && (A.mapPass = new _n(i.x, i.y, { format: zi, type: On })), u.uniforms.shadow_pass.value = A.map.depthTexture, u.uniforms.resolution.value = A.mapSize, u.uniforms.radius.value = A.radius, s.setRenderTarget(A.mapPass), s.clear(), s.renderBufferDirect(C, null, x, u, v, null), f.uniforms.shadow_pass.value = A.mapPass.texture, f.uniforms.resolution.value = A.mapSize, f.uniforms.radius.value = A.radius, s.setRenderTarget(A.map), s.clear(), s.renderBufferDirect(C, null, x, f, v, null) } function E(A, C, x, b) { let W = null; const R = x.isPointLight === !0 ? A.customDistanceMaterial : A.customDepthMaterial; if (R !== void 0) W = R; else if (W = x.isPointLight === !0 ? l : o, s.localClippingEnabled && C.clipShadows === !0 && Array.isArray(C.clippingPlanes) && C.clippingPlanes.length !== 0 || C.displacementMap && C.displacementScale !== 0 || C.alphaMap && C.alphaTest > 0 || C.map && C.alphaTest > 0 || C.alphaToCoverage === !0) { const U = W.uuid, O = C.uuid; let G = c[U]; G === void 0 && (G = {}, c[U] = G); let z = G[O]; z === void 0 && (z = W.clone(), G[O] = z, C.addEventListener("dispose", w)), W = z } if (W.visible = C.visible, W.wireframe = C.wireframe, b === ls ? W.side = C.shadowSide !== null ? C.shadowSide : C.side : W.side = C.shadowSide !== null ? C.shadowSide : d[C.side], W.alphaMap = C.alphaMap, W.alphaTest = C.alphaToCoverage === !0 ? .5 : C.alphaTest, W.map = C.map, W.clipShadows = C.clipShadows, W.clippingPlanes = C.clippingPlanes, W.clipIntersection = C.clipIntersection, W.displacementMap = C.displacementMap, W.displacementScale = C.displacementScale, W.displacementBias = C.displacementBias, W.wireframeLinewidth = C.wireframeLinewidth, W.linewidth = C.linewidth, x.isPointLight === !0 && W.isMeshDistanceMaterial === !0) { const U = s.properties.get(W); U.light = x } return W } function y(A, C, x, b, W) { if (A.visible === !1) return; if (A.layers.test(C.layers) && (A.isMesh || A.isLine || A.isPoints) && (A.castShadow || A.receiveShadow && W === ls) && (!A.frustumCulled || n.intersectsObject(A))) { A.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse, A.matrixWorld); const O = e.update(A), G = A.material; if (Array.isArray(G)) { const z = O.groups; for (let V = 0, F = z.length; V < F; V++) { const Q = z[V], j = G[Q.materialIndex]; if (j && j.visible) { const ce = E(A, j, b, W); A.onBeforeShadow(s, A, C, x, O, ce, Q), s.renderBufferDirect(x, null, O, ce, A, Q), A.onAfterShadow(s, A, C, x, O, ce, Q) } } } else if (G.visible) { const z = E(A, G, b, W); A.onBeforeShadow(s, A, C, x, O, z, null), s.renderBufferDirect(x, null, O, z, A, null), A.onAfterShadow(s, A, C, x, O, z, null) } } const U = A.children; for (let O = 0, G = U.length; O < G; O++)y(U[O], C, x, b, W) } function w(A) { A.target.removeEventListener("dispose", w); for (const x in c) { const b = c[x], W = A.target.uuid; W in b && (b[W].dispose(), delete b[W]) } } } function T_(s, e) { function t() { let I = !1; const se = new ot; let te = null; const fe = new ot(0, 0, 0, 0); return { setMask: function (J) { te !== J && !I && (s.colorMask(J, J, J, J), te = J) }, setLocked: function (J) { I = J }, setClear: function (J, X, _e, Le, rt) { rt === !0 && (J *= Le, X *= Le, _e *= Le), se.set(J, X, _e, Le), fe.equals(se) === !1 && (s.clearColor(J, X, _e, Le), fe.copy(se)) }, reset: function () { I = !1, te = null, fe.set(-1, 0, 0, 0) } } } function n() { let I = !1, se = !1, te = null, fe = null, J = null; return { setReversed: function (X) { if (se !== X) { const _e = e.get("EXT_clip_control"); X ? _e.clipControlEXT(_e.LOWER_LEFT_EXT, _e.ZERO_TO_ONE_EXT) : _e.clipControlEXT(_e.LOWER_LEFT_EXT, _e.NEGATIVE_ONE_TO_ONE_EXT), se = X; const Le = J; J = null, this.setClear(Le) } }, getReversed: function () { return se }, setTest: function (X) { X ? ne(s.DEPTH_TEST) : re(s.DEPTH_TEST) }, setMask: function (X) { te !== X && !I && (s.depthMask(X), te = X) }, setFunc: function (X) { if (se && (X = lu[X]), fe !== X) { switch (X) { case ya: s.depthFunc(s.NEVER); break; case ba: s.depthFunc(s.ALWAYS); break; case Ea: s.depthFunc(s.LESS); break; case Oi: s.depthFunc(s.LEQUAL); break; case Ta: s.depthFunc(s.EQUAL); break; case Aa: s.depthFunc(s.GEQUAL); break; case wa: s.depthFunc(s.GREATER); break; case Ra: s.depthFunc(s.NOTEQUAL); break; default: s.depthFunc(s.LEQUAL) }fe = X } }, setLocked: function (X) { I = X }, setClear: function (X) { J !== X && (J = X, se && (X = 1 - X), s.clearDepth(X)) }, reset: function () { I = !1, te = null, fe = null, J = null, se = !1 } } } function i() { let I = !1, se = null, te = null, fe = null, J = null, X = null, _e = null, Le = null, rt = null; return { setTest: function (Ke) { I || (Ke ? ne(s.STENCIL_TEST) : re(s.STENCIL_TEST)) }, setMask: function (Ke) { se !== Ke && !I && (s.stencilMask(Ke), se = Ke) }, setFunc: function (Ke, yn, bn) { (te !== Ke || fe !== yn || J !== bn) && (s.stencilFunc(Ke, yn, bn), te = Ke, fe = yn, J = bn) }, setOp: function (Ke, yn, bn) { (X !== Ke || _e !== yn || Le !== bn) && (s.stencilOp(Ke, yn, bn), X = Ke, _e = yn, Le = bn) }, setLocked: function (Ke) { I = Ke }, setClear: function (Ke) { rt !== Ke && (s.clearStencil(Ke), rt = Ke) }, reset: function () { I = !1, se = null, te = null, fe = null, J = null, X = null, _e = null, Le = null, rt = null } } } const r = new t, a = new n, o = new i, l = new WeakMap, c = new WeakMap; let h = {}, d = {}, u = new WeakMap, f = [], g = null, v = !1, m = null, p = null, M = null, E = null, y = null, w = null, A = null, C = new Ae(0, 0, 0), x = 0, b = !1, W = null, R = null, U = null, O = null, G = null; const z = s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS); let V = !1, F = 0; const Q = s.getParameter(s.VERSION); Q.indexOf("WebGL") !== -1 ? (F = parseFloat(/^WebGL (\d)/.exec(Q)[1]), V = F >= 1) : Q.indexOf("OpenGL ES") !== -1 && (F = parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]), V = F >= 2); let j = null, ce = {}; const pe = s.getParameter(s.SCISSOR_BOX), ue = s.getParameter(s.VIEWPORT), Fe = new ot().fromArray(pe), lt = new ot().fromArray(ue); function at(I, se, te, fe) { const J = new Uint8Array(4), X = s.createTexture(); s.bindTexture(I, X), s.texParameteri(I, s.TEXTURE_MIN_FILTER, s.NEAREST), s.texParameteri(I, s.TEXTURE_MAG_FILTER, s.NEAREST); for (let _e = 0; _e < te; _e++)I === s.TEXTURE_3D || I === s.TEXTURE_2D_ARRAY ? s.texImage3D(se, 0, s.RGBA, 1, 1, fe, 0, s.RGBA, s.UNSIGNED_BYTE, J) : s.texImage2D(se + _e, 0, s.RGBA, 1, 1, 0, s.RGBA, s.UNSIGNED_BYTE, J); return X } const $ = {}; $[s.TEXTURE_2D] = at(s.TEXTURE_2D, s.TEXTURE_2D, 1), $[s.TEXTURE_CUBE_MAP] = at(s.TEXTURE_CUBE_MAP, s.TEXTURE_CUBE_MAP_POSITIVE_X, 6), $[s.TEXTURE_2D_ARRAY] = at(s.TEXTURE_2D_ARRAY, s.TEXTURE_2D_ARRAY, 1, 1), $[s.TEXTURE_3D] = at(s.TEXTURE_3D, s.TEXTURE_3D, 1, 1), r.setClear(0, 0, 0, 1), a.setClear(1), o.setClear(0), ne(s.DEPTH_TEST), a.setFunc(Oi), Be(!1), dt(el), ne(s.CULL_FACE), $e(Nn); function ne(I) { h[I] !== !0 && (s.enable(I), h[I] = !0) } function re(I) { h[I] !== !1 && (s.disable(I), h[I] = !1) } function Ne(I, se) { return d[I] !== se ? (s.bindFramebuffer(I, se), d[I] = se, I === s.DRAW_FRAMEBUFFER && (d[s.FRAMEBUFFER] = se), I === s.FRAMEBUFFER && (d[s.DRAW_FRAMEBUFFER] = se), !0) : !1 } function we(I, se) { let te = f, fe = !1; if (I) { te = u.get(se), te === void 0 && (te = [], u.set(se, te)); const J = I.textures; if (te.length !== J.length || te[0] !== s.COLOR_ATTACHMENT0) { for (let X = 0, _e = J.length; X < _e; X++)te[X] = s.COLOR_ATTACHMENT0 + X; te.length = J.length, fe = !0 } } else te[0] !== s.BACK && (te[0] = s.BACK, fe = !0); fe && s.drawBuffers(te) } function Pe(I) { return g !== I ? (s.useProgram(I), g = I, !0) : !1 } const St = { [ci]: s.FUNC_ADD, [Rh]: s.FUNC_SUBTRACT, [Ch]: s.FUNC_REVERSE_SUBTRACT }; St[Ph] = s.MIN, St[Lh] = s.MAX; const Xe = { [Ih]: s.ZERO, [Dh]: s.ONE, [Nh]: s.SRC_COLOR, [Ma]: s.SRC_ALPHA, [kh]: s.SRC_ALPHA_SATURATE, [Bh]: s.DST_COLOR, [Fh]: s.DST_ALPHA, [Uh]: s.ONE_MINUS_SRC_COLOR, [Sa]: s.ONE_MINUS_SRC_ALPHA, [zh]: s.ONE_MINUS_DST_COLOR, [Oh]: s.ONE_MINUS_DST_ALPHA, [Vh]: s.CONSTANT_COLOR, [Hh]: s.ONE_MINUS_CONSTANT_COLOR, [Gh]: s.CONSTANT_ALPHA, [Wh]: s.ONE_MINUS_CONSTANT_ALPHA }; function $e(I, se, te, fe, J, X, _e, Le, rt, Ke) { if (I === Nn) { v === !0 && (re(s.BLEND), v = !1); return } if (v === !1 && (ne(s.BLEND), v = !0), I !== wh) { if (I !== m || Ke !== b) { if ((p !== ci || y !== ci) && (s.blendEquation(s.FUNC_ADD), p = ci, y = ci), Ke) switch (I) { case Di: s.blendFuncSeparate(s.ONE, s.ONE_MINUS_SRC_ALPHA, s.ONE, s.ONE_MINUS_SRC_ALPHA); break; case tl: s.blendFunc(s.ONE, s.ONE); break; case nl: s.blendFuncSeparate(s.ZERO, s.ONE_MINUS_SRC_COLOR, s.ZERO, s.ONE); break; case il: s.blendFuncSeparate(s.DST_COLOR, s.ONE_MINUS_SRC_ALPHA, s.ZERO, s.ONE); break; default: Ce("WebGLState: Invalid blending: ", I); break } else switch (I) { case Di: s.blendFuncSeparate(s.SRC_ALPHA, s.ONE_MINUS_SRC_ALPHA, s.ONE, s.ONE_MINUS_SRC_ALPHA); break; case tl: s.blendFuncSeparate(s.SRC_ALPHA, s.ONE, s.ONE, s.ONE); break; case nl: Ce("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true"); break; case il: Ce("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true"); break; default: Ce("WebGLState: Invalid blending: ", I); break }M = null, E = null, w = null, A = null, C.set(0, 0, 0), x = 0, m = I, b = Ke } return } J = J || se, X = X || te, _e = _e || fe, (se !== p || J !== y) && (s.blendEquationSeparate(St[se], St[J]), p = se, y = J), (te !== M || fe !== E || X !== w || _e !== A) && (s.blendFuncSeparate(Xe[te], Xe[fe], Xe[X], Xe[_e]), M = te, E = fe, w = X, A = _e), (Le.equals(C) === !1 || rt !== x) && (s.blendColor(Le.r, Le.g, Le.b, rt), C.copy(Le), x = rt), m = I, b = !1 } function tt(I, se) { I.side === Qt ? re(s.CULL_FACE) : ne(s.CULL_FACE); let te = I.side === Bt; se && (te = !te), Be(te), I.blending === Di && I.transparent === !1 ? $e(Nn) : $e(I.blending, I.blendEquation, I.blendSrc, I.blendDst, I.blendEquationAlpha, I.blendSrcAlpha, I.blendDstAlpha, I.blendColor, I.blendAlpha, I.premultipliedAlpha), a.setFunc(I.depthFunc), a.setTest(I.depthTest), a.setMask(I.depthWrite), r.setMask(I.colorWrite); const fe = I.stencilWrite; o.setTest(fe), fe && (o.setMask(I.stencilWriteMask), o.setFunc(I.stencilFunc, I.stencilRef, I.stencilFuncMask), o.setOp(I.stencilFail, I.stencilZFail, I.stencilZPass)), mt(I.polygonOffset, I.polygonOffsetFactor, I.polygonOffsetUnits), I.alphaToCoverage === !0 ? ne(s.SAMPLE_ALPHA_TO_COVERAGE) : re(s.SAMPLE_ALPHA_TO_COVERAGE) } function Be(I) { W !== I && (I ? s.frontFace(s.CW) : s.frontFace(s.CCW), W = I) } function dt(I) { I !== Eh ? (ne(s.CULL_FACE), I !== R && (I === el ? s.cullFace(s.BACK) : I === Th ? s.cullFace(s.FRONT) : s.cullFace(s.FRONT_AND_BACK))) : re(s.CULL_FACE), R = I } function P(I) { I !== U && (V && s.lineWidth(I), U = I) } function mt(I, se, te) { I ? (ne(s.POLYGON_OFFSET_FILL), (O !== se || G !== te) && (O = se, G = te, a.getReversed() && (se = -se), s.polygonOffset(se, te))) : re(s.POLYGON_OFFSET_FILL) } function qe(I) { I ? ne(s.SCISSOR_TEST) : re(s.SCISSOR_TEST) } function st(I) { I === void 0 && (I = s.TEXTURE0 + z - 1), j !== I && (s.activeTexture(I), j = I) } function Me(I, se, te) { te === void 0 && (j === null ? te = s.TEXTURE0 + z - 1 : te = j); let fe = ce[te]; fe === void 0 && (fe = { type: void 0, texture: void 0 }, ce[te] = fe), (fe.type !== I || fe.texture !== se) && (j !== te && (s.activeTexture(te), j = te), s.bindTexture(I, se || $[I]), fe.type = I, fe.texture = se) } function T() { const I = ce[j]; I !== void 0 && I.type !== void 0 && (s.bindTexture(I.type, null), I.type = void 0, I.texture = void 0) } function _() { try { s.compressedTexImage2D(...arguments) } catch (I) { Ce("WebGLState:", I) } } function D() { try { s.compressedTexImage3D(...arguments) } catch (I) { Ce("WebGLState:", I) } } function q() { try { s.texSubImage2D(...arguments) } catch (I) { Ce("WebGLState:", I) } } function K() { try { s.texSubImage3D(...arguments) } catch (I) { Ce("WebGLState:", I) } } function Y() { try { s.compressedTexSubImage2D(...arguments) } catch (I) { Ce("WebGLState:", I) } } function me() { try { s.compressedTexSubImage3D(...arguments) } catch (I) { Ce("WebGLState:", I) } } function ie() { try { s.texStorage2D(...arguments) } catch (I) { Ce("WebGLState:", I) } } function Te() { try { s.texStorage3D(...arguments) } catch (I) { Ce("WebGLState:", I) } } function Re() { try { s.texImage2D(...arguments) } catch (I) { Ce("WebGLState:", I) } } function Z() { try { s.texImage3D(...arguments) } catch (I) { Ce("WebGLState:", I) } } function ee(I) { Fe.equals(I) === !1 && (s.scissor(I.x, I.y, I.z, I.w), Fe.copy(I)) } function ge(I) { lt.equals(I) === !1 && (s.viewport(I.x, I.y, I.z, I.w), lt.copy(I)) } function xe(I, se) { let te = c.get(se); te === void 0 && (te = new WeakMap, c.set(se, te)); let fe = te.get(I); fe === void 0 && (fe = s.getUniformBlockIndex(se, I.name), te.set(I, fe)) } function he(I, se) { const fe = c.get(se).get(I); l.get(se) !== fe && (s.uniformBlockBinding(se, fe, I.__bindingPointIndex), l.set(se, fe)) } function ze() { s.disable(s.BLEND), s.disable(s.CULL_FACE), s.disable(s.DEPTH_TEST), s.disable(s.POLYGON_OFFSET_FILL), s.disable(s.SCISSOR_TEST), s.disable(s.STENCIL_TEST), s.disable(s.SAMPLE_ALPHA_TO_COVERAGE), s.blendEquation(s.FUNC_ADD), s.blendFunc(s.ONE, s.ZERO), s.blendFuncSeparate(s.ONE, s.ZERO, s.ONE, s.ZERO), s.blendColor(0, 0, 0, 0), s.colorMask(!0, !0, !0, !0), s.clearColor(0, 0, 0, 0), s.depthMask(!0), s.depthFunc(s.LESS), a.setReversed(!1), s.clearDepth(1), s.stencilMask(4294967295), s.stencilFunc(s.ALWAYS, 0, 4294967295), s.stencilOp(s.KEEP, s.KEEP, s.KEEP), s.clearStencil(0), s.cullFace(s.BACK), s.frontFace(s.CCW), s.polygonOffset(0, 0), s.activeTexture(s.TEXTURE0), s.bindFramebuffer(s.FRAMEBUFFER, null), s.bindFramebuffer(s.DRAW_FRAMEBUFFER, null), s.bindFramebuffer(s.READ_FRAMEBUFFER, null), s.useProgram(null), s.lineWidth(1), s.scissor(0, 0, s.canvas.width, s.canvas.height), s.viewport(0, 0, s.canvas.width, s.canvas.height), h = {}, j = null, ce = {}, d = {}, u = new WeakMap, f = [], g = null, v = !1, m = null, p = null, M = null, E = null, y = null, w = null, A = null, C = new Ae(0, 0, 0), x = 0, b = !1, W = null, R = null, U = null, O = null, G = null, Fe.set(0, 0, s.canvas.width, s.canvas.height), lt.set(0, 0, s.canvas.width, s.canvas.height), r.reset(), a.reset(), o.reset() } return { buffers: { color: r, depth: a, stencil: o }, enable: ne, disable: re, bindFramebuffer: Ne, drawBuffers: we, useProgram: Pe, setBlending: $e, setMaterial: tt, setFlipSided: Be, setCullFace: dt, setLineWidth: P, setPolygonOffset: mt, setScissorTest: qe, activeTexture: st, bindTexture: Me, unbindTexture: T, compressedTexImage2D: _, compressedTexImage3D: D, texImage2D: Re, texImage3D: Z, updateUBOMapping: xe, uniformBlockBinding: he, texStorage2D: ie, texStorage3D: Te, texSubImage2D: q, texSubImage3D: K, compressedTexSubImage2D: Y, compressedTexSubImage3D: me, scissor: ee, viewport: ge, reset: ze } } function A_(s, e, t, n, i, r, a) { const o = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), c = new Ge, h = new WeakMap; let d; const u = new WeakMap; let f = !1; try { f = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null } catch { } function g(T, _) { return f ? new OffscreenCanvas(T, _) : ys("canvas") } function v(T, _, D) { let q = 1; const K = Me(T); if ((K.width > D || K.height > D) && (q = D / Math.max(K.width, K.height)), q < 1) if (typeof HTMLImageElement < "u" && T instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && T instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && T instanceof ImageBitmap || typeof VideoFrame < "u" && T instanceof VideoFrame) { const Y = Math.floor(q * K.width), me = Math.floor(q * K.height); d === void 0 && (d = g(Y, me)); const ie = _ ? g(Y, me) : d; return ie.width = Y, ie.height = me, ie.getContext("2d").drawImage(T, 0, 0, Y, me), Ee("WebGLRenderer: Texture has been resized from (" + K.width + "x" + K.height + ") to (" + Y + "x" + me + ")."), ie } else return "data" in T && Ee("WebGLRenderer: Image in DataTexture is too big (" + K.width + "x" + K.height + ")."), T; return T } function m(T) { return T.generateMipmaps } function p(T) { s.generateMipmap(T) } function M(T) { return T.isWebGLCubeRenderTarget ? s.TEXTURE_CUBE_MAP : T.isWebGL3DRenderTarget ? s.TEXTURE_3D : T.isWebGLArrayRenderTarget || T.isCompressedArrayTexture ? s.TEXTURE_2D_ARRAY : s.TEXTURE_2D } function E(T, _, D, q, K = !1) { if (T !== null) { if (s[T] !== void 0) return s[T]; Ee("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + T + "'") } let Y = _; if (_ === s.RED && (D === s.FLOAT && (Y = s.R32F), D === s.HALF_FLOAT && (Y = s.R16F), D === s.UNSIGNED_BYTE && (Y = s.R8)), _ === s.RED_INTEGER && (D === s.UNSIGNED_BYTE && (Y = s.R8UI), D === s.UNSIGNED_SHORT && (Y = s.R16UI), D === s.UNSIGNED_INT && (Y = s.R32UI), D === s.BYTE && (Y = s.R8I), D === s.SHORT && (Y = s.R16I), D === s.INT && (Y = s.R32I)), _ === s.RG && (D === s.FLOAT && (Y = s.RG32F), D === s.HALF_FLOAT && (Y = s.RG16F), D === s.UNSIGNED_BYTE && (Y = s.RG8)), _ === s.RG_INTEGER && (D === s.UNSIGNED_BYTE && (Y = s.RG8UI), D === s.UNSIGNED_SHORT && (Y = s.RG16UI), D === s.UNSIGNED_INT && (Y = s.RG32UI), D === s.BYTE && (Y = s.RG8I), D === s.SHORT && (Y = s.RG16I), D === s.INT && (Y = s.RG32I)), _ === s.RGB_INTEGER && (D === s.UNSIGNED_BYTE && (Y = s.RGB8UI), D === s.UNSIGNED_SHORT && (Y = s.RGB16UI), D === s.UNSIGNED_INT && (Y = s.RGB32UI), D === s.BYTE && (Y = s.RGB8I), D === s.SHORT && (Y = s.RGB16I), D === s.INT && (Y = s.RGB32I)), _ === s.RGBA_INTEGER && (D === s.UNSIGNED_BYTE && (Y = s.RGBA8UI), D === s.UNSIGNED_SHORT && (Y = s.RGBA16UI), D === s.UNSIGNED_INT && (Y = s.RGBA32UI), D === s.BYTE && (Y = s.RGBA8I), D === s.SHORT && (Y = s.RGBA16I), D === s.INT && (Y = s.RGBA32I)), _ === s.RGB && (D === s.UNSIGNED_INT_5_9_9_9_REV && (Y = s.RGB9_E5), D === s.UNSIGNED_INT_10F_11F_11F_REV && (Y = s.R11F_G11F_B10F)), _ === s.RGBA) { const me = K ? _r : We.getTransfer(q); D === s.FLOAT && (Y = s.RGBA32F), D === s.HALF_FLOAT && (Y = s.RGBA16F), D === s.UNSIGNED_BYTE && (Y = me === je ? s.SRGB8_ALPHA8 : s.RGBA8), D === s.UNSIGNED_SHORT_4_4_4_4 && (Y = s.RGBA4), D === s.UNSIGNED_SHORT_5_5_5_1 && (Y = s.RGB5_A1) } return (Y === s.R16F || Y === s.R32F || Y === s.RG16F || Y === s.RG32F || Y === s.RGBA16F || Y === s.RGBA32F) && e.get("EXT_color_buffer_float"), Y } function y(T, _) { let D; return T ? _ === null || _ === vn || _ === xs ? D = s.DEPTH24_STENCIL8 : _ === Xt ? D = s.DEPTH32F_STENCIL8 : _ === _s && (D = s.DEPTH24_STENCIL8, Ee("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : _ === null || _ === vn || _ === xs ? D = s.DEPTH_COMPONENT24 : _ === Xt ? D = s.DEPTH_COMPONENT32F : _ === _s && (D = s.DEPTH_COMPONENT16), D } function w(T, _) { return m(T) === !0 || T.isFramebufferTexture && T.minFilter !== _t && T.minFilter !== xt ? Math.log2(Math.max(_.width, _.height)) + 1 : T.mipmaps !== void 0 && T.mipmaps.length > 0 ? T.mipmaps.length : T.isCompressedTexture && Array.isArray(T.image) ? _.mipmaps.length : 1 } function A(T) { const _ = T.target; _.removeEventListener("dispose", A), x(_), _.isVideoTexture && h.delete(_) } function C(T) { const _ = T.target; _.removeEventListener("dispose", C), W(_) } function x(T) { const _ = n.get(T); if (_.__webglInit === void 0) return; const D = T.source, q = u.get(D); if (q) { const K = q[_.__cacheKey]; K.usedTimes--, K.usedTimes === 0 && b(T), Object.keys(q).length === 0 && u.delete(D) } n.remove(T) } function b(T) { const _ = n.get(T); s.deleteTexture(_.__webglTexture); const D = T.source, q = u.get(D); delete q[_.__cacheKey], a.memory.textures-- } function W(T) { const _ = n.get(T); if (T.depthTexture && (T.depthTexture.dispose(), n.remove(T.depthTexture)), T.isWebGLCubeRenderTarget) for (let q = 0; q < 6; q++) { if (Array.isArray(_.__webglFramebuffer[q])) for (let K = 0; K < _.__webglFramebuffer[q].length; K++)s.deleteFramebuffer(_.__webglFramebuffer[q][K]); else s.deleteFramebuffer(_.__webglFramebuffer[q]); _.__webglDepthbuffer && s.deleteRenderbuffer(_.__webglDepthbuffer[q]) } else { if (Array.isArray(_.__webglFramebuffer)) for (let q = 0; q < _.__webglFramebuffer.length; q++)s.deleteFramebuffer(_.__webglFramebuffer[q]); else s.deleteFramebuffer(_.__webglFramebuffer); if (_.__webglDepthbuffer && s.deleteRenderbuffer(_.__webglDepthbuffer), _.__webglMultisampledFramebuffer && s.deleteFramebuffer(_.__webglMultisampledFramebuffer), _.__webglColorRenderbuffer) for (let q = 0; q < _.__webglColorRenderbuffer.length; q++)_.__webglColorRenderbuffer[q] && s.deleteRenderbuffer(_.__webglColorRenderbuffer[q]); _.__webglDepthRenderbuffer && s.deleteRenderbuffer(_.__webglDepthRenderbuffer) } const D = T.textures; for (let q = 0, K = D.length; q < K; q++) { const Y = n.get(D[q]); Y.__webglTexture && (s.deleteTexture(Y.__webglTexture), a.memory.textures--), n.remove(D[q]) } n.remove(T) } let R = 0; function U() { R = 0 } function O() { const T = R; return T >= i.maxTextures && Ee("WebGLTextures: Trying to use " + T + " texture units while this GPU supports only " + i.maxTextures), R += 1, T } function G(T) { const _ = []; return _.push(T.wrapS), _.push(T.wrapT), _.push(T.wrapR || 0), _.push(T.magFilter), _.push(T.minFilter), _.push(T.anisotropy), _.push(T.internalFormat), _.push(T.format), _.push(T.type), _.push(T.generateMipmaps), _.push(T.premultiplyAlpha), _.push(T.flipY), _.push(T.unpackAlignment), _.push(T.colorSpace), _.join() } function z(T, _) { const D = n.get(T); if (T.isVideoTexture && qe(T), T.isRenderTargetTexture === !1 && T.isExternalTexture !== !0 && T.version > 0 && D.__version !== T.version) { const q = T.image; if (q === null) Ee("WebGLRenderer: Texture marked for update but no image data found."); else if (q.complete === !1) Ee("WebGLRenderer: Texture marked for update but image is incomplete"); else { $(D, T, _); return } } else T.isExternalTexture && (D.__webglTexture = T.sourceTexture ? T.sourceTexture : null); t.bindTexture(s.TEXTURE_2D, D.__webglTexture, s.TEXTURE0 + _) } function V(T, _) { const D = n.get(T); if (T.isRenderTargetTexture === !1 && T.version > 0 && D.__version !== T.version) { $(D, T, _); return } else T.isExternalTexture && (D.__webglTexture = T.sourceTexture ? T.sourceTexture : null); t.bindTexture(s.TEXTURE_2D_ARRAY, D.__webglTexture, s.TEXTURE0 + _) } function F(T, _) { const D = n.get(T); if (T.isRenderTargetTexture === !1 && T.version > 0 && D.__version !== T.version) { $(D, T, _); return } t.bindTexture(s.TEXTURE_3D, D.__webglTexture, s.TEXTURE0 + _) } function Q(T, _) { const D = n.get(T); if (T.isCubeDepthTexture !== !0 && T.version > 0 && D.__version !== T.version) { ne(D, T, _); return } t.bindTexture(s.TEXTURE_CUBE_MAP, D.__webglTexture, s.TEXTURE0 + _) } const j = { [Zn]: s.REPEAT, [pn]: s.CLAMP_TO_EDGE, [gr]: s.MIRRORED_REPEAT }, ce = { [_t]: s.NEAREST, [Uc]: s.NEAREST_MIPMAP_NEAREST, [cs]: s.NEAREST_MIPMAP_LINEAR, [xt]: s.LINEAR, [cr]: s.LINEAR_MIPMAP_NEAREST, [Ln]: s.LINEAR_MIPMAP_LINEAR }, pe = { [Jh]: s.NEVER, [iu]: s.ALWAYS, [Qh]: s.LESS, [Ro]: s.LEQUAL, [eu]: s.EQUAL, [Co]: s.GEQUAL, [tu]: s.GREATER, [nu]: s.NOTEQUAL }; function ue(T, _) { if (_.type === Xt && e.has("OES_texture_float_linear") === !1 && (_.magFilter === xt || _.magFilter === cr || _.magFilter === cs || _.magFilter === Ln || _.minFilter === xt || _.minFilter === cr || _.minFilter === cs || _.minFilter === Ln) && Ee("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), s.texParameteri(T, s.TEXTURE_WRAP_S, j[_.wrapS]), s.texParameteri(T, s.TEXTURE_WRAP_T, j[_.wrapT]), (T === s.TEXTURE_3D || T === s.TEXTURE_2D_ARRAY) && s.texParameteri(T, s.TEXTURE_WRAP_R, j[_.wrapR]), s.texParameteri(T, s.TEXTURE_MAG_FILTER, ce[_.magFilter]), s.texParameteri(T, s.TEXTURE_MIN_FILTER, ce[_.minFilter]), _.compareFunction && (s.texParameteri(T, s.TEXTURE_COMPARE_MODE, s.COMPARE_REF_TO_TEXTURE), s.texParameteri(T, s.TEXTURE_COMPARE_FUNC, pe[_.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) { if (_.magFilter === _t || _.minFilter !== cs && _.minFilter !== Ln || _.type === Xt && e.has("OES_texture_float_linear") === !1) return; if (_.anisotropy > 1 || n.get(_).__currentAnisotropy) { const D = e.get("EXT_texture_filter_anisotropic"); s.texParameterf(T, D.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(_.anisotropy, i.getMaxAnisotropy())), n.get(_).__currentAnisotropy = _.anisotropy } } } function Fe(T, _) { let D = !1; T.__webglInit === void 0 && (T.__webglInit = !0, _.addEventListener("dispose", A)); const q = _.source; let K = u.get(q); K === void 0 && (K = {}, u.set(q, K)); const Y = G(_); if (Y !== T.__cacheKey) { K[Y] === void 0 && (K[Y] = { texture: s.createTexture(), usedTimes: 0 }, a.memory.textures++, D = !0), K[Y].usedTimes++; const me = K[T.__cacheKey]; me !== void 0 && (K[T.__cacheKey].usedTimes--, me.usedTimes === 0 && b(_)), T.__cacheKey = Y, T.__webglTexture = K[Y].texture } return D } function lt(T, _, D) { return Math.floor(Math.floor(T / D) / _) } function at(T, _, D, q) { const Y = T.updateRanges; if (Y.length === 0) t.texSubImage2D(s.TEXTURE_2D, 0, 0, 0, _.width, _.height, D, q, _.data); else { Y.sort((Z, ee) => Z.start - ee.start); let me = 0; for (let Z = 1; Z < Y.length; Z++) { const ee = Y[me], ge = Y[Z], xe = ee.start + ee.count, he = lt(ge.start, _.width, 4), ze = lt(ee.start, _.width, 4); ge.start <= xe + 1 && he === ze && lt(ge.start + ge.count - 1, _.width, 4) === he ? ee.count = Math.max(ee.count, ge.start + ge.count - ee.start) : (++me, Y[me] = ge) } Y.length = me + 1; const ie = s.getParameter(s.UNPACK_ROW_LENGTH), Te = s.getParameter(s.UNPACK_SKIP_PIXELS), Re = s.getParameter(s.UNPACK_SKIP_ROWS); s.pixelStorei(s.UNPACK_ROW_LENGTH, _.width); for (let Z = 0, ee = Y.length; Z < ee; Z++) { const ge = Y[Z], xe = Math.floor(ge.start / 4), he = Math.ceil(ge.count / 4), ze = xe % _.width, I = Math.floor(xe / _.width), se = he, te = 1; s.pixelStorei(s.UNPACK_SKIP_PIXELS, ze), s.pixelStorei(s.UNPACK_SKIP_ROWS, I), t.texSubImage2D(s.TEXTURE_2D, 0, ze, I, se, te, D, q, _.data) } T.clearUpdateRanges(), s.pixelStorei(s.UNPACK_ROW_LENGTH, ie), s.pixelStorei(s.UNPACK_SKIP_PIXELS, Te), s.pixelStorei(s.UNPACK_SKIP_ROWS, Re) } } function $(T, _, D) { let q = s.TEXTURE_2D; (_.isDataArrayTexture || _.isCompressedArrayTexture) && (q = s.TEXTURE_2D_ARRAY), _.isData3DTexture && (q = s.TEXTURE_3D); const K = Fe(T, _), Y = _.source; t.bindTexture(q, T.__webglTexture, s.TEXTURE0 + D); const me = n.get(Y); if (Y.version !== me.__version || K === !0) { t.activeTexture(s.TEXTURE0 + D); const ie = We.getPrimaries(We.workingColorSpace), Te = _.colorSpace === Kn ? null : We.getPrimaries(_.colorSpace), Re = _.colorSpace === Kn || ie === Te ? s.NONE : s.BROWSER_DEFAULT_WEBGL; s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL, _.flipY), s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha), s.pixelStorei(s.UNPACK_ALIGNMENT, _.unpackAlignment), s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL, Re); let Z = v(_.image, !1, i.maxTextureSize); Z = st(_, Z); const ee = r.convert(_.format, _.colorSpace), ge = r.convert(_.type); let xe = E(_.internalFormat, ee, ge, _.colorSpace, _.isVideoTexture); ue(q, _); let he; const ze = _.mipmaps, I = _.isVideoTexture !== !0, se = me.__version === void 0 || K === !0, te = Y.dataReady, fe = w(_, Z); if (_.isDepthTexture) xe = y(_.format === ui, _.type), se && (I ? t.texStorage2D(s.TEXTURE_2D, 1, xe, Z.width, Z.height) : t.texImage2D(s.TEXTURE_2D, 0, xe, Z.width, Z.height, 0, ee, ge, null)); else if (_.isDataTexture) if (ze.length > 0) { I && se && t.texStorage2D(s.TEXTURE_2D, fe, xe, ze[0].width, ze[0].height); for (let J = 0, X = ze.length; J < X; J++)he = ze[J], I ? te && t.texSubImage2D(s.TEXTURE_2D, J, 0, 0, he.width, he.height, ee, ge, he.data) : t.texImage2D(s.TEXTURE_2D, J, xe, he.width, he.height, 0, ee, ge, he.data); _.generateMipmaps = !1 } else I ? (se && t.texStorage2D(s.TEXTURE_2D, fe, xe, Z.width, Z.height), te && at(_, Z, ee, ge)) : t.texImage2D(s.TEXTURE_2D, 0, xe, Z.width, Z.height, 0, ee, ge, Z.data); else if (_.isCompressedTexture) if (_.isCompressedArrayTexture) { I && se && t.texStorage3D(s.TEXTURE_2D_ARRAY, fe, xe, ze[0].width, ze[0].height, Z.depth); for (let J = 0, X = ze.length; J < X; J++)if (he = ze[J], _.format !== Yt) if (ee !== null) if (I) { if (te) if (_.layerUpdates.size > 0) { const _e = $l(he.width, he.height, _.format, _.type); for (const Le of _.layerUpdates) { const rt = he.data.subarray(Le * _e / he.data.BYTES_PER_ELEMENT, (Le + 1) * _e / he.data.BYTES_PER_ELEMENT); t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY, J, 0, 0, Le, he.width, he.height, 1, ee, rt) } _.clearLayerUpdates() } else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY, J, 0, 0, 0, he.width, he.height, Z.depth, ee, he.data) } else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY, J, xe, he.width, he.height, Z.depth, 0, he.data, 0, 0); else Ee("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"); else I ? te && t.texSubImage3D(s.TEXTURE_2D_ARRAY, J, 0, 0, 0, he.width, he.height, Z.depth, ee, ge, he.data) : t.texImage3D(s.TEXTURE_2D_ARRAY, J, xe, he.width, he.height, Z.depth, 0, ee, ge, he.data) } else { I && se && t.texStorage2D(s.TEXTURE_2D, fe, xe, ze[0].width, ze[0].height); for (let J = 0, X = ze.length; J < X; J++)he = ze[J], _.format !== Yt ? ee !== null ? I ? te && t.compressedTexSubImage2D(s.TEXTURE_2D, J, 0, 0, he.width, he.height, ee, he.data) : t.compressedTexImage2D(s.TEXTURE_2D, J, xe, he.width, he.height, 0, he.data) : Ee("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : I ? te && t.texSubImage2D(s.TEXTURE_2D, J, 0, 0, he.width, he.height, ee, ge, he.data) : t.texImage2D(s.TEXTURE_2D, J, xe, he.width, he.height, 0, ee, ge, he.data) } else if (_.isDataArrayTexture) if (I) { if (se && t.texStorage3D(s.TEXTURE_2D_ARRAY, fe, xe, Z.width, Z.height, Z.depth), te) if (_.layerUpdates.size > 0) { const J = $l(Z.width, Z.height, _.format, _.type); for (const X of _.layerUpdates) { const _e = Z.data.subarray(X * J / Z.data.BYTES_PER_ELEMENT, (X + 1) * J / Z.data.BYTES_PER_ELEMENT); t.texSubImage3D(s.TEXTURE_2D_ARRAY, 0, 0, 0, X, Z.width, Z.height, 1, ee, ge, _e) } _.clearLayerUpdates() } else t.texSubImage3D(s.TEXTURE_2D_ARRAY, 0, 0, 0, 0, Z.width, Z.height, Z.depth, ee, ge, Z.data) } else t.texImage3D(s.TEXTURE_2D_ARRAY, 0, xe, Z.width, Z.height, Z.depth, 0, ee, ge, Z.data); else if (_.isData3DTexture) I ? (se && t.texStorage3D(s.TEXTURE_3D, fe, xe, Z.width, Z.height, Z.depth), te && t.texSubImage3D(s.TEXTURE_3D, 0, 0, 0, 0, Z.width, Z.height, Z.depth, ee, ge, Z.data)) : t.texImage3D(s.TEXTURE_3D, 0, xe, Z.width, Z.height, Z.depth, 0, ee, ge, Z.data); else if (_.isFramebufferTexture) { if (se) if (I) t.texStorage2D(s.TEXTURE_2D, fe, xe, Z.width, Z.height); else { let J = Z.width, X = Z.height; for (let _e = 0; _e < fe; _e++)t.texImage2D(s.TEXTURE_2D, _e, xe, J, X, 0, ee, ge, null), J >>= 1, X >>= 1 } } else if (ze.length > 0) { if (I && se) { const J = Me(ze[0]); t.texStorage2D(s.TEXTURE_2D, fe, xe, J.width, J.height) } for (let J = 0, X = ze.length; J < X; J++)he = ze[J], I ? te && t.texSubImage2D(s.TEXTURE_2D, J, 0, 0, ee, ge, he) : t.texImage2D(s.TEXTURE_2D, J, xe, ee, ge, he); _.generateMipmaps = !1 } else if (I) { if (se) { const J = Me(Z); t.texStorage2D(s.TEXTURE_2D, fe, xe, J.width, J.height) } te && t.texSubImage2D(s.TEXTURE_2D, 0, 0, 0, ee, ge, Z) } else t.texImage2D(s.TEXTURE_2D, 0, xe, ee, ge, Z); m(_) && p(q), me.__version = Y.version, _.onUpdate && _.onUpdate(_) } T.__version = _.version } function ne(T, _, D) { if (_.image.length !== 6) return; const q = Fe(T, _), K = _.source; t.bindTexture(s.TEXTURE_CUBE_MAP, T.__webglTexture, s.TEXTURE0 + D); const Y = n.get(K); if (K.version !== Y.__version || q === !0) { t.activeTexture(s.TEXTURE0 + D); const me = We.getPrimaries(We.workingColorSpace), ie = _.colorSpace === Kn ? null : We.getPrimaries(_.colorSpace), Te = _.colorSpace === Kn || me === ie ? s.NONE : s.BROWSER_DEFAULT_WEBGL; s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL, _.flipY), s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha), s.pixelStorei(s.UNPACK_ALIGNMENT, _.unpackAlignment), s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL, Te); const Re = _.isCompressedTexture || _.image[0].isCompressedTexture, Z = _.image[0] && _.image[0].isDataTexture, ee = []; for (let X = 0; X < 6; X++)!Re && !Z ? ee[X] = v(_.image[X], !0, i.maxCubemapSize) : ee[X] = Z ? _.image[X].image : _.image[X], ee[X] = st(_, ee[X]); const ge = ee[0], xe = r.convert(_.format, _.colorSpace), he = r.convert(_.type), ze = E(_.internalFormat, xe, he, _.colorSpace), I = _.isVideoTexture !== !0, se = Y.__version === void 0 || q === !0, te = K.dataReady; let fe = w(_, ge); ue(s.TEXTURE_CUBE_MAP, _); let J; if (Re) { I && se && t.texStorage2D(s.TEXTURE_CUBE_MAP, fe, ze, ge.width, ge.height); for (let X = 0; X < 6; X++) { J = ee[X].mipmaps; for (let _e = 0; _e < J.length; _e++) { const Le = J[_e]; _.format !== Yt ? xe !== null ? I ? te && t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + X, _e, 0, 0, Le.width, Le.height, xe, Le.data) : t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + X, _e, ze, Le.width, Le.height, 0, Le.data) : Ee("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : I ? te && t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + X, _e, 0, 0, Le.width, Le.height, xe, he, Le.data) : t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + X, _e, ze, Le.width, Le.height, 0, xe, he, Le.data) } } } else { if (J = _.mipmaps, I && se) { J.length > 0 && fe++; const X = Me(ee[0]); t.texStorage2D(s.TEXTURE_CUBE_MAP, fe, ze, X.width, X.height) } for (let X = 0; X < 6; X++)if (Z) { I ? te && t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + X, 0, 0, 0, ee[X].width, ee[X].height, xe, he, ee[X].data) : t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + X, 0, ze, ee[X].width, ee[X].height, 0, xe, he, ee[X].data); for (let _e = 0; _e < J.length; _e++) { const rt = J[_e].image[X].image; I ? te && t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + X, _e + 1, 0, 0, rt.width, rt.height, xe, he, rt.data) : t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + X, _e + 1, ze, rt.width, rt.height, 0, xe, he, rt.data) } } else { I ? te && t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + X, 0, 0, 0, xe, he, ee[X]) : t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + X, 0, ze, xe, he, ee[X]); for (let _e = 0; _e < J.length; _e++) { const Le = J[_e]; I ? te && t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + X, _e + 1, 0, 0, xe, he, Le.image[X]) : t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + X, _e + 1, ze, xe, he, Le.image[X]) } } } m(_) && p(s.TEXTURE_CUBE_MAP), Y.__version = K.version, _.onUpdate && _.onUpdate(_) } T.__version = _.version } function re(T, _, D, q, K, Y) { const me = r.convert(D.format, D.colorSpace), ie = r.convert(D.type), Te = E(D.internalFormat, me, ie, D.colorSpace), Re = n.get(_), Z = n.get(D); if (Z.__renderTarget = _, !Re.__hasExternalTextures) { const ee = Math.max(1, _.width >> Y), ge = Math.max(1, _.height >> Y); K === s.TEXTURE_3D || K === s.TEXTURE_2D_ARRAY ? t.texImage3D(K, Y, Te, ee, ge, _.depth, 0, me, ie, null) : t.texImage2D(K, Y, Te, ee, ge, 0, me, ie, null) } t.bindFramebuffer(s.FRAMEBUFFER, T), mt(_) ? o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER, q, K, Z.__webglTexture, 0, P(_)) : (K === s.TEXTURE_2D || K >= s.TEXTURE_CUBE_MAP_POSITIVE_X && K <= s.TEXTURE_CUBE_MAP_NEGATIVE_Z) && s.framebufferTexture2D(s.FRAMEBUFFER, q, K, Z.__webglTexture, Y), t.bindFramebuffer(s.FRAMEBUFFER, null) } function Ne(T, _, D) { if (s.bindRenderbuffer(s.RENDERBUFFER, T), _.depthBuffer) { const q = _.depthTexture, K = q && q.isDepthTexture ? q.type : null, Y = y(_.stencilBuffer, K), me = _.stencilBuffer ? s.DEPTH_STENCIL_ATTACHMENT : s.DEPTH_ATTACHMENT; mt(_) ? o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER, P(_), Y, _.width, _.height) : D ? s.renderbufferStorageMultisample(s.RENDERBUFFER, P(_), Y, _.width, _.height) : s.renderbufferStorage(s.RENDERBUFFER, Y, _.width, _.height), s.framebufferRenderbuffer(s.FRAMEBUFFER, me, s.RENDERBUFFER, T) } else { const q = _.textures; for (let K = 0; K < q.length; K++) { const Y = q[K], me = r.convert(Y.format, Y.colorSpace), ie = r.convert(Y.type), Te = E(Y.internalFormat, me, ie, Y.colorSpace); mt(_) ? o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER, P(_), Te, _.width, _.height) : D ? s.renderbufferStorageMultisample(s.RENDERBUFFER, P(_), Te, _.width, _.height) : s.renderbufferStorage(s.RENDERBUFFER, Te, _.width, _.height) } } s.bindRenderbuffer(s.RENDERBUFFER, null) } function we(T, _, D) { const q = _.isWebGLCubeRenderTarget === !0; if (t.bindFramebuffer(s.FRAMEBUFFER, T), !(_.depthTexture && _.depthTexture.isDepthTexture)) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture"); const K = n.get(_.depthTexture); if (K.__renderTarget = _, (!K.__webglTexture || _.depthTexture.image.width !== _.width || _.depthTexture.image.height !== _.height) && (_.depthTexture.image.width = _.width, _.depthTexture.image.height = _.height, _.depthTexture.needsUpdate = !0), q) { if (K.__webglInit === void 0 && (K.__webglInit = !0, _.depthTexture.addEventListener("dispose", A)), K.__webglTexture === void 0) { K.__webglTexture = s.createTexture(), t.bindTexture(s.TEXTURE_CUBE_MAP, K.__webglTexture), ue(s.TEXTURE_CUBE_MAP, _.depthTexture); const Re = r.convert(_.depthTexture.format), Z = r.convert(_.depthTexture.type); let ee; _.depthTexture.format === Bn ? ee = s.DEPTH_COMPONENT24 : _.depthTexture.format === ui && (ee = s.DEPTH24_STENCIL8); for (let ge = 0; ge < 6; ge++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X + ge, 0, ee, _.width, _.height, 0, Re, Z, null) } } else z(_.depthTexture, 0); const Y = K.__webglTexture, me = P(_), ie = q ? s.TEXTURE_CUBE_MAP_POSITIVE_X + D : s.TEXTURE_2D, Te = _.depthTexture.format === ui ? s.DEPTH_STENCIL_ATTACHMENT : s.DEPTH_ATTACHMENT; if (_.depthTexture.format === Bn) mt(_) ? o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER, Te, ie, Y, 0, me) : s.framebufferTexture2D(s.FRAMEBUFFER, Te, ie, Y, 0); else if (_.depthTexture.format === ui) mt(_) ? o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER, Te, ie, Y, 0, me) : s.framebufferTexture2D(s.FRAMEBUFFER, Te, ie, Y, 0); else throw new Error("Unknown depthTexture format") } function Pe(T) { const _ = n.get(T), D = T.isWebGLCubeRenderTarget === !0; if (_.__boundDepthTexture !== T.depthTexture) { const q = T.depthTexture; if (_.__depthDisposeCallback && _.__depthDisposeCallback(), q) { const K = () => { delete _.__boundDepthTexture, delete _.__depthDisposeCallback, q.removeEventListener("dispose", K) }; q.addEventListener("dispose", K), _.__depthDisposeCallback = K } _.__boundDepthTexture = q } if (T.depthTexture && !_.__autoAllocateDepthBuffer) if (D) for (let q = 0; q < 6; q++)we(_.__webglFramebuffer[q], T, q); else { const q = T.texture.mipmaps; q && q.length > 0 ? we(_.__webglFramebuffer[0], T, 0) : we(_.__webglFramebuffer, T, 0) } else if (D) { _.__webglDepthbuffer = []; for (let q = 0; q < 6; q++)if (t.bindFramebuffer(s.FRAMEBUFFER, _.__webglFramebuffer[q]), _.__webglDepthbuffer[q] === void 0) _.__webglDepthbuffer[q] = s.createRenderbuffer(), Ne(_.__webglDepthbuffer[q], T, !1); else { const K = T.stencilBuffer ? s.DEPTH_STENCIL_ATTACHMENT : s.DEPTH_ATTACHMENT, Y = _.__webglDepthbuffer[q]; s.bindRenderbuffer(s.RENDERBUFFER, Y), s.framebufferRenderbuffer(s.FRAMEBUFFER, K, s.RENDERBUFFER, Y) } } else { const q = T.texture.mipmaps; if (q && q.length > 0 ? t.bindFramebuffer(s.FRAMEBUFFER, _.__webglFramebuffer[0]) : t.bindFramebuffer(s.FRAMEBUFFER, _.__webglFramebuffer), _.__webglDepthbuffer === void 0) _.__webglDepthbuffer = s.createRenderbuffer(), Ne(_.__webglDepthbuffer, T, !1); else { const K = T.stencilBuffer ? s.DEPTH_STENCIL_ATTACHMENT : s.DEPTH_ATTACHMENT, Y = _.__webglDepthbuffer; s.bindRenderbuffer(s.RENDERBUFFER, Y), s.framebufferRenderbuffer(s.FRAMEBUFFER, K, s.RENDERBUFFER, Y) } } t.bindFramebuffer(s.FRAMEBUFFER, null) } function St(T, _, D) { const q = n.get(T); _ !== void 0 && re(q.__webglFramebuffer, T, T.texture, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, 0), D !== void 0 && Pe(T) } function Xe(T) { const _ = T.texture, D = n.get(T), q = n.get(_); T.addEventListener("dispose", C); const K = T.textures, Y = T.isWebGLCubeRenderTarget === !0, me = K.length > 1; if (me || (q.__webglTexture === void 0 && (q.__webglTexture = s.createTexture()), q.__version = _.version, a.memory.textures++), Y) { D.__webglFramebuffer = []; for (let ie = 0; ie < 6; ie++)if (_.mipmaps && _.mipmaps.length > 0) { D.__webglFramebuffer[ie] = []; for (let Te = 0; Te < _.mipmaps.length; Te++)D.__webglFramebuffer[ie][Te] = s.createFramebuffer() } else D.__webglFramebuffer[ie] = s.createFramebuffer() } else { if (_.mipmaps && _.mipmaps.length > 0) { D.__webglFramebuffer = []; for (let ie = 0; ie < _.mipmaps.length; ie++)D.__webglFramebuffer[ie] = s.createFramebuffer() } else D.__webglFramebuffer = s.createFramebuffer(); if (me) for (let ie = 0, Te = K.length; ie < Te; ie++) { const Re = n.get(K[ie]); Re.__webglTexture === void 0 && (Re.__webglTexture = s.createTexture(), a.memory.textures++) } if (T.samples > 0 && mt(T) === !1) { D.__webglMultisampledFramebuffer = s.createFramebuffer(), D.__webglColorRenderbuffer = [], t.bindFramebuffer(s.FRAMEBUFFER, D.__webglMultisampledFramebuffer); for (let ie = 0; ie < K.length; ie++) { const Te = K[ie]; D.__webglColorRenderbuffer[ie] = s.createRenderbuffer(), s.bindRenderbuffer(s.RENDERBUFFER, D.__webglColorRenderbuffer[ie]); const Re = r.convert(Te.format, Te.colorSpace), Z = r.convert(Te.type), ee = E(Te.internalFormat, Re, Z, Te.colorSpace, T.isXRRenderTarget === !0), ge = P(T); s.renderbufferStorageMultisample(s.RENDERBUFFER, ge, ee, T.width, T.height), s.framebufferRenderbuffer(s.FRAMEBUFFER, s.COLOR_ATTACHMENT0 + ie, s.RENDERBUFFER, D.__webglColorRenderbuffer[ie]) } s.bindRenderbuffer(s.RENDERBUFFER, null), T.depthBuffer && (D.__webglDepthRenderbuffer = s.createRenderbuffer(), Ne(D.__webglDepthRenderbuffer, T, !0)), t.bindFramebuffer(s.FRAMEBUFFER, null) } } if (Y) { t.bindTexture(s.TEXTURE_CUBE_MAP, q.__webglTexture), ue(s.TEXTURE_CUBE_MAP, _); for (let ie = 0; ie < 6; ie++)if (_.mipmaps && _.mipmaps.length > 0) for (let Te = 0; Te < _.mipmaps.length; Te++)re(D.__webglFramebuffer[ie][Te], T, _, s.COLOR_ATTACHMENT0, s.TEXTURE_CUBE_MAP_POSITIVE_X + ie, Te); else re(D.__webglFramebuffer[ie], T, _, s.COLOR_ATTACHMENT0, s.TEXTURE_CUBE_MAP_POSITIVE_X + ie, 0); m(_) && p(s.TEXTURE_CUBE_MAP), t.unbindTexture() } else if (me) { for (let ie = 0, Te = K.length; ie < Te; ie++) { const Re = K[ie], Z = n.get(Re); let ee = s.TEXTURE_2D; (T.isWebGL3DRenderTarget || T.isWebGLArrayRenderTarget) && (ee = T.isWebGL3DRenderTarget ? s.TEXTURE_3D : s.TEXTURE_2D_ARRAY), t.bindTexture(ee, Z.__webglTexture), ue(ee, Re), re(D.__webglFramebuffer, T, Re, s.COLOR_ATTACHMENT0 + ie, ee, 0), m(Re) && p(ee) } t.unbindTexture() } else { let ie = s.TEXTURE_2D; if ((T.isWebGL3DRenderTarget || T.isWebGLArrayRenderTarget) && (ie = T.isWebGL3DRenderTarget ? s.TEXTURE_3D : s.TEXTURE_2D_ARRAY), t.bindTexture(ie, q.__webglTexture), ue(ie, _), _.mipmaps && _.mipmaps.length > 0) for (let Te = 0; Te < _.mipmaps.length; Te++)re(D.__webglFramebuffer[Te], T, _, s.COLOR_ATTACHMENT0, ie, Te); else re(D.__webglFramebuffer, T, _, s.COLOR_ATTACHMENT0, ie, 0); m(_) && p(ie), t.unbindTexture() } T.depthBuffer && Pe(T) } function $e(T) { const _ = T.textures; for (let D = 0, q = _.length; D < q; D++) { const K = _[D]; if (m(K)) { const Y = M(T), me = n.get(K).__webglTexture; t.bindTexture(Y, me), p(Y), t.unbindTexture() } } } const tt = [], Be = []; function dt(T) { if (T.samples > 0) { if (mt(T) === !1) { const _ = T.textures, D = T.width, q = T.height; let K = s.COLOR_BUFFER_BIT; const Y = T.stencilBuffer ? s.DEPTH_STENCIL_ATTACHMENT : s.DEPTH_ATTACHMENT, me = n.get(T), ie = _.length > 1; if (ie) for (let Re = 0; Re < _.length; Re++)t.bindFramebuffer(s.FRAMEBUFFER, me.__webglMultisampledFramebuffer), s.framebufferRenderbuffer(s.FRAMEBUFFER, s.COLOR_ATTACHMENT0 + Re, s.RENDERBUFFER, null), t.bindFramebuffer(s.FRAMEBUFFER, me.__webglFramebuffer), s.framebufferTexture2D(s.DRAW_FRAMEBUFFER, s.COLOR_ATTACHMENT0 + Re, s.TEXTURE_2D, null, 0); t.bindFramebuffer(s.READ_FRAMEBUFFER, me.__webglMultisampledFramebuffer); const Te = T.texture.mipmaps; Te && Te.length > 0 ? t.bindFramebuffer(s.DRAW_FRAMEBUFFER, me.__webglFramebuffer[0]) : t.bindFramebuffer(s.DRAW_FRAMEBUFFER, me.__webglFramebuffer); for (let Re = 0; Re < _.length; Re++) { if (T.resolveDepthBuffer && (T.depthBuffer && (K |= s.DEPTH_BUFFER_BIT), T.stencilBuffer && T.resolveStencilBuffer && (K |= s.STENCIL_BUFFER_BIT)), ie) { s.framebufferRenderbuffer(s.READ_FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.RENDERBUFFER, me.__webglColorRenderbuffer[Re]); const Z = n.get(_[Re]).__webglTexture; s.framebufferTexture2D(s.DRAW_FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, Z, 0) } s.blitFramebuffer(0, 0, D, q, 0, 0, D, q, K, s.NEAREST), l === !0 && (tt.length = 0, Be.length = 0, tt.push(s.COLOR_ATTACHMENT0 + Re), T.depthBuffer && T.resolveDepthBuffer === !1 && (tt.push(Y), Be.push(Y), s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER, Be)), s.invalidateFramebuffer(s.READ_FRAMEBUFFER, tt)) } if (t.bindFramebuffer(s.READ_FRAMEBUFFER, null), t.bindFramebuffer(s.DRAW_FRAMEBUFFER, null), ie) for (let Re = 0; Re < _.length; Re++) { t.bindFramebuffer(s.FRAMEBUFFER, me.__webglMultisampledFramebuffer), s.framebufferRenderbuffer(s.FRAMEBUFFER, s.COLOR_ATTACHMENT0 + Re, s.RENDERBUFFER, me.__webglColorRenderbuffer[Re]); const Z = n.get(_[Re]).__webglTexture; t.bindFramebuffer(s.FRAMEBUFFER, me.__webglFramebuffer), s.framebufferTexture2D(s.DRAW_FRAMEBUFFER, s.COLOR_ATTACHMENT0 + Re, s.TEXTURE_2D, Z, 0) } t.bindFramebuffer(s.DRAW_FRAMEBUFFER, me.__webglMultisampledFramebuffer) } else if (T.depthBuffer && T.resolveDepthBuffer === !1 && l) { const _ = T.stencilBuffer ? s.DEPTH_STENCIL_ATTACHMENT : s.DEPTH_ATTACHMENT; s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER, [_]) } } } function P(T) { return Math.min(i.maxSamples, T.samples) } function mt(T) { const _ = n.get(T); return T.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && _.__useRenderToTexture !== !1 } function qe(T) { const _ = a.render.frame; h.get(T) !== _ && (h.set(T, _), T.update()) } function st(T, _) { const D = T.colorSpace, q = T.format, K = T.type; return T.isCompressedTexture === !0 || T.isVideoTexture === !0 || D !== Ot && D !== Kn && (We.getTransfer(D) === je ? (q !== Yt || K !== Ht) && Ee("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : Ce("WebGLTextures: Unsupported texture color space:", D)), _ } function Me(T) { return typeof HTMLImageElement < "u" && T instanceof HTMLImageElement ? (c.width = T.naturalWidth || T.width, c.height = T.naturalHeight || T.height) : typeof VideoFrame < "u" && T instanceof VideoFrame ? (c.width = T.displayWidth, c.height = T.displayHeight) : (c.width = T.width, c.height = T.height), c } this.allocateTextureUnit = O, this.resetTextureUnits = U, this.setTexture2D = z, this.setTexture2DArray = V, this.setTexture3D = F, this.setTextureCube = Q, this.rebindTextures = St, this.setupRenderTarget = Xe, this.updateRenderTargetMipmap = $e, this.updateMultisampleRenderTarget = dt, this.setupDepthRenderbuffer = Pe, this.setupFrameBufferTexture = re, this.useMultisampledRTT = mt, this.isReversedDepthBuffer = function () { return t.buffers.depth.getReversed() } } function w_(s, e) { function t(n, i = Kn) { let r; const a = We.getTransfer(i); if (n === Ht) return s.UNSIGNED_BYTE; if (n === So) return s.UNSIGNED_SHORT_4_4_4_4; if (n === yo) return s.UNSIGNED_SHORT_5_5_5_1; if (n === Bc) return s.UNSIGNED_INT_5_9_9_9_REV; if (n === zc) return s.UNSIGNED_INT_10F_11F_11F_REV; if (n === Fc) return s.BYTE; if (n === Oc) return s.SHORT; if (n === _s) return s.UNSIGNED_SHORT; if (n === Mo) return s.INT; if (n === vn) return s.UNSIGNED_INT; if (n === Xt) return s.FLOAT; if (n === On) return s.HALF_FLOAT; if (n === kc) return s.ALPHA; if (n === Vc) return s.RGB; if (n === Yt) return s.RGBA; if (n === Bn) return s.DEPTH_COMPONENT; if (n === ui) return s.DEPTH_STENCIL; if (n === bo) return s.RED; if (n === Eo) return s.RED_INTEGER; if (n === zi) return s.RG; if (n === To) return s.RG_INTEGER; if (n === Ao) return s.RGBA_INTEGER; if (n === hr || n === ur || n === dr || n === fr) if (a === je) if (r = e.get("WEBGL_compressed_texture_s3tc_srgb"), r !== null) { if (n === hr) return r.COMPRESSED_SRGB_S3TC_DXT1_EXT; if (n === ur) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT; if (n === dr) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT; if (n === fr) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT } else return null; else if (r = e.get("WEBGL_compressed_texture_s3tc"), r !== null) { if (n === hr) return r.COMPRESSED_RGB_S3TC_DXT1_EXT; if (n === ur) return r.COMPRESSED_RGBA_S3TC_DXT1_EXT; if (n === dr) return r.COMPRESSED_RGBA_S3TC_DXT3_EXT; if (n === fr) return r.COMPRESSED_RGBA_S3TC_DXT5_EXT } else return null; if (n === Ca || n === Pa || n === La || n === Ia) if (r = e.get("WEBGL_compressed_texture_pvrtc"), r !== null) { if (n === Ca) return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG; if (n === Pa) return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG; if (n === La) return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG; if (n === Ia) return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG } else return null; if (n === Da || n === Na || n === Ua || n === Fa || n === Oa || n === Ba || n === za) if (r = e.get("WEBGL_compressed_texture_etc"), r !== null) { if (n === Da || n === Na) return a === je ? r.COMPRESSED_SRGB8_ETC2 : r.COMPRESSED_RGB8_ETC2; if (n === Ua) return a === je ? r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : r.COMPRESSED_RGBA8_ETC2_EAC; if (n === Fa) return r.COMPRESSED_R11_EAC; if (n === Oa) return r.COMPRESSED_SIGNED_R11_EAC; if (n === Ba) return r.COMPRESSED_RG11_EAC; if (n === za) return r.COMPRESSED_SIGNED_RG11_EAC } else return null; if (n === ka || n === Va || n === Ha || n === Ga || n === Wa || n === Xa || n === Ya || n === qa || n === $a || n === Ka || n === ja || n === Za || n === Ja || n === Qa) if (r = e.get("WEBGL_compressed_texture_astc"), r !== null) { if (n === ka) return a === je ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : r.COMPRESSED_RGBA_ASTC_4x4_KHR; if (n === Va) return a === je ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : r.COMPRESSED_RGBA_ASTC_5x4_KHR; if (n === Ha) return a === je ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : r.COMPRESSED_RGBA_ASTC_5x5_KHR; if (n === Ga) return a === je ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : r.COMPRESSED_RGBA_ASTC_6x5_KHR; if (n === Wa) return a === je ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : r.COMPRESSED_RGBA_ASTC_6x6_KHR; if (n === Xa) return a === je ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : r.COMPRESSED_RGBA_ASTC_8x5_KHR; if (n === Ya) return a === je ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : r.COMPRESSED_RGBA_ASTC_8x6_KHR; if (n === qa) return a === je ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : r.COMPRESSED_RGBA_ASTC_8x8_KHR; if (n === $a) return a === je ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : r.COMPRESSED_RGBA_ASTC_10x5_KHR; if (n === Ka) return a === je ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : r.COMPRESSED_RGBA_ASTC_10x6_KHR; if (n === ja) return a === je ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : r.COMPRESSED_RGBA_ASTC_10x8_KHR; if (n === Za) return a === je ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : r.COMPRESSED_RGBA_ASTC_10x10_KHR; if (n === Ja) return a === je ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : r.COMPRESSED_RGBA_ASTC_12x10_KHR; if (n === Qa) return a === je ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : r.COMPRESSED_RGBA_ASTC_12x12_KHR } else return null; if (n === eo || n === to || n === no) if (r = e.get("EXT_texture_compression_bptc"), r !== null) { if (n === eo) return a === je ? r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : r.COMPRESSED_RGBA_BPTC_UNORM_EXT; if (n === to) return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT; if (n === no) return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT } else return null; if (n === io || n === so || n === ro || n === ao) if (r = e.get("EXT_texture_compression_rgtc"), r !== null) { if (n === io) return r.COMPRESSED_RED_RGTC1_EXT; if (n === so) return r.COMPRESSED_SIGNED_RED_RGTC1_EXT; if (n === ro) return r.COMPRESSED_RED_GREEN_RGTC2_EXT; if (n === ao) return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT } else return null; return n === xs ? s.UNSIGNED_INT_24_8 : s[n] !== void 0 ? s[n] : null } return { convert: t } } const R_ = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, C_ = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`; class P_ { constructor() { this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0 } init(e, t) { if (this.texture === null) { const n = new Jc(e.texture); (e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = n } } getMesh(e) { if (this.texture !== null && this.mesh === null) { const t = e.cameras[0].viewport, n = new Mn({ vertexShader: R_, fragmentShader: C_, uniforms: { depthColor: { value: this.texture }, depthWidth: { value: t.z }, depthHeight: { value: t.w } } }); this.mesh = new Tt(new Cs(20, 20), n) } return this.mesh } reset() { this.texture = null, this.mesh = null } getDepthTexture() { return this.texture } } class L_ extends Xi { constructor(e, t) { super(); const n = this; let i = null, r = 1, a = null, o = "local-floor", l = 1, c = null, h = null, d = null, u = null, f = null, g = null; const v = typeof XRWebGLBinding < "u", m = new P_, p = {}, M = t.getContextAttributes(); let E = null, y = null; const w = [], A = [], C = new Ge; let x = null; const b = new Ut; b.viewport = new ot; const W = new Ut; W.viewport = new ot; const R = [b, W], U = new Id; let O = null, G = null; this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function ($) { let ne = w[$]; return ne === void 0 && (ne = new kr, w[$] = ne), ne.getTargetRaySpace() }, this.getControllerGrip = function ($) { let ne = w[$]; return ne === void 0 && (ne = new kr, w[$] = ne), ne.getGripSpace() }, this.getHand = function ($) { let ne = w[$]; return ne === void 0 && (ne = new kr, w[$] = ne), ne.getHandSpace() }; function z($) { const ne = A.indexOf($.inputSource); if (ne === -1) return; const re = w[ne]; re !== void 0 && (re.update($.inputSource, $.frame, c || a), re.dispatchEvent({ type: $.type, data: $.inputSource })) } function V() { i.removeEventListener("select", z), i.removeEventListener("selectstart", z), i.removeEventListener("selectend", z), i.removeEventListener("squeeze", z), i.removeEventListener("squeezestart", z), i.removeEventListener("squeezeend", z), i.removeEventListener("end", V), i.removeEventListener("inputsourceschange", F); for (let $ = 0; $ < w.length; $++) { const ne = A[$]; ne !== null && (A[$] = null, w[$].disconnect(ne)) } O = null, G = null, m.reset(); for (const $ in p) delete p[$]; e.setRenderTarget(E), f = null, u = null, d = null, i = null, y = null, at.stop(), n.isPresenting = !1, e.setPixelRatio(x), e.setSize(C.width, C.height, !1), n.dispatchEvent({ type: "sessionend" }) } this.setFramebufferScaleFactor = function ($) { r = $, n.isPresenting === !0 && Ee("WebXRManager: Cannot change framebuffer scale while presenting.") }, this.setReferenceSpaceType = function ($) { o = $, n.isPresenting === !0 && Ee("WebXRManager: Cannot change reference space type while presenting.") }, this.getReferenceSpace = function () { return c || a }, this.setReferenceSpace = function ($) { c = $ }, this.getBaseLayer = function () { return u !== null ? u : f }, this.getBinding = function () { return d === null && v && (d = new XRWebGLBinding(i, t)), d }, this.getFrame = function () { return g }, this.getSession = function () { return i }, this.setSession = async function ($) { if (i = $, i !== null) { if (E = e.getRenderTarget(), i.addEventListener("select", z), i.addEventListener("selectstart", z), i.addEventListener("selectend", z), i.addEventListener("squeeze", z), i.addEventListener("squeezestart", z), i.addEventListener("squeezeend", z), i.addEventListener("end", V), i.addEventListener("inputsourceschange", F), M.xrCompatible !== !0 && await t.makeXRCompatible(), x = e.getPixelRatio(), e.getSize(C), v && "createProjectionLayer" in XRWebGLBinding.prototype) { let re = null, Ne = null, we = null; M.depth && (we = M.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, re = M.stencil ? ui : Bn, Ne = M.stencil ? xs : vn); const Pe = { colorFormat: t.RGBA8, depthFormat: we, scaleFactor: r }; d = this.getBinding(), u = d.createProjectionLayer(Pe), i.updateRenderState({ layers: [u] }), e.setPixelRatio(1), e.setSize(u.textureWidth, u.textureHeight, !1), y = new _n(u.textureWidth, u.textureHeight, { format: Yt, type: Ht, depthTexture: new bs(u.textureWidth, u.textureHeight, Ne, void 0, void 0, void 0, void 0, void 0, void 0, re), stencilBuffer: M.stencil, colorSpace: e.outputColorSpace, samples: M.antialias ? 4 : 0, resolveDepthBuffer: u.ignoreDepthValues === !1, resolveStencilBuffer: u.ignoreDepthValues === !1 }) } else { const re = { antialias: M.antialias, alpha: !0, depth: M.depth, stencil: M.stencil, framebufferScaleFactor: r }; f = new XRWebGLLayer(i, t, re), i.updateRenderState({ baseLayer: f }), e.setPixelRatio(1), e.setSize(f.framebufferWidth, f.framebufferHeight, !1), y = new _n(f.framebufferWidth, f.framebufferHeight, { format: Yt, type: Ht, colorSpace: e.outputColorSpace, stencilBuffer: M.stencil, resolveDepthBuffer: f.ignoreDepthValues === !1, resolveStencilBuffer: f.ignoreDepthValues === !1 }) } y.isXRRenderTarget = !0, this.setFoveation(l), c = null, a = await i.requestReferenceSpace(o), at.setContext(i), at.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" }) } }, this.getEnvironmentBlendMode = function () { if (i !== null) return i.environmentBlendMode }, this.getDepthTexture = function () { return m.getDepthTexture() }; function F($) { for (let ne = 0; ne < $.removed.length; ne++) { const re = $.removed[ne], Ne = A.indexOf(re); Ne >= 0 && (A[Ne] = null, w[Ne].disconnect(re)) } for (let ne = 0; ne < $.added.length; ne++) { const re = $.added[ne]; let Ne = A.indexOf(re); if (Ne === -1) { for (let Pe = 0; Pe < w.length; Pe++)if (Pe >= A.length) { A.push(re), Ne = Pe; break } else if (A[Pe] === null) { A[Pe] = re, Ne = Pe; break } if (Ne === -1) break } const we = w[Ne]; we && we.connect(re) } } const Q = new L, j = new L; function ce($, ne, re) { Q.setFromMatrixPosition(ne.matrixWorld), j.setFromMatrixPosition(re.matrixWorld); const Ne = Q.distanceTo(j), we = ne.projectionMatrix.elements, Pe = re.projectionMatrix.elements, St = we[14] / (we[10] - 1), Xe = we[14] / (we[10] + 1), $e = (we[9] + 1) / we[5], tt = (we[9] - 1) / we[5], Be = (we[8] - 1) / we[0], dt = (Pe[8] + 1) / Pe[0], P = St * Be, mt = St * dt, qe = Ne / (-Be + dt), st = qe * -Be; if (ne.matrixWorld.decompose($.position, $.quaternion, $.scale), $.translateX(st), $.translateZ(qe), $.matrixWorld.compose($.position, $.quaternion, $.scale), $.matrixWorldInverse.copy($.matrixWorld).invert(), we[10] === -1) $.projectionMatrix.copy(ne.projectionMatrix), $.projectionMatrixInverse.copy(ne.projectionMatrixInverse); else { const Me = St + qe, T = Xe + qe, _ = P - st, D = mt + (Ne - st), q = $e * Xe / T * Me, K = tt * Xe / T * Me; $.projectionMatrix.makePerspective(_, D, q, K, Me, T), $.projectionMatrixInverse.copy($.projectionMatrix).invert() } } function pe($, ne) { ne === null ? $.matrixWorld.copy($.matrix) : $.matrixWorld.multiplyMatrices(ne.matrixWorld, $.matrix), $.matrixWorldInverse.copy($.matrixWorld).invert() } this.updateCamera = function ($) { if (i === null) return; let ne = $.near, re = $.far; m.texture !== null && (m.depthNear > 0 && (ne = m.depthNear), m.depthFar > 0 && (re = m.depthFar)), U.near = W.near = b.near = ne, U.far = W.far = b.far = re, (O !== U.near || G !== U.far) && (i.updateRenderState({ depthNear: U.near, depthFar: U.far }), O = U.near, G = U.far), U.layers.mask = $.layers.mask | 6, b.layers.mask = U.layers.mask & -5, W.layers.mask = U.layers.mask & -3; const Ne = $.parent, we = U.cameras; pe(U, Ne); for (let Pe = 0; Pe < we.length; Pe++)pe(we[Pe], Ne); we.length === 2 ? ce(U, b, W) : U.projectionMatrix.copy(b.projectionMatrix), ue($, U, Ne) }; function ue($, ne, re) { re === null ? $.matrix.copy(ne.matrixWorld) : ($.matrix.copy(re.matrixWorld), $.matrix.invert(), $.matrix.multiply(ne.matrixWorld)), $.matrix.decompose($.position, $.quaternion, $.scale), $.updateMatrixWorld(!0), $.projectionMatrix.copy(ne.projectionMatrix), $.projectionMatrixInverse.copy(ne.projectionMatrixInverse), $.isPerspectiveCamera && ($.fov = ki * 2 * Math.atan(1 / $.projectionMatrix.elements[5]), $.zoom = 1) } this.getCamera = function () { return U }, this.getFoveation = function () { if (!(u === null && f === null)) return l }, this.setFoveation = function ($) { l = $, u !== null && (u.fixedFoveation = $), f !== null && f.fixedFoveation !== void 0 && (f.fixedFoveation = $) }, this.hasDepthSensing = function () { return m.texture !== null }, this.getDepthSensingMesh = function () { return m.getMesh(U) }, this.getCameraTexture = function ($) { return p[$] }; let Fe = null; function lt($, ne) { if (h = ne.getViewerPose(c || a), g = ne, h !== null) { const re = h.views; f !== null && (e.setRenderTargetFramebuffer(y, f.framebuffer), e.setRenderTarget(y)); let Ne = !1; re.length !== U.cameras.length && (U.cameras.length = 0, Ne = !0); for (let Xe = 0; Xe < re.length; Xe++) { const $e = re[Xe]; let tt = null; if (f !== null) tt = f.getViewport($e); else { const dt = d.getViewSubImage(u, $e); tt = dt.viewport, Xe === 0 && (e.setRenderTargetTextures(y, dt.colorTexture, dt.depthStencilTexture), e.setRenderTarget(y)) } let Be = R[Xe]; Be === void 0 && (Be = new Ut, Be.layers.enable(Xe), Be.viewport = new ot, R[Xe] = Be), Be.matrix.fromArray($e.transform.matrix), Be.matrix.decompose(Be.position, Be.quaternion, Be.scale), Be.projectionMatrix.fromArray($e.projectionMatrix), Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(), Be.viewport.set(tt.x, tt.y, tt.width, tt.height), Xe === 0 && (U.matrix.copy(Be.matrix), U.matrix.decompose(U.position, U.quaternion, U.scale)), Ne === !0 && U.cameras.push(Be) } const we = i.enabledFeatures; if (we && we.includes("depth-sensing") && i.depthUsage == "gpu-optimized" && v) { d = n.getBinding(); const Xe = d.getDepthInformation(re[0]); Xe && Xe.isValid && Xe.texture && m.init(Xe, i.renderState) } if (we && we.includes("camera-access") && v) { e.state.unbindTexture(), d = n.getBinding(); for (let Xe = 0; Xe < re.length; Xe++) { const $e = re[Xe].camera; if ($e) { let tt = p[$e]; tt || (tt = new Jc, p[$e] = tt); const Be = d.getCameraImage($e); tt.sourceTexture = Be } } } } for (let re = 0; re < w.length; re++) { const Ne = A[re], we = w[re]; Ne !== null && we !== void 0 && we.update(Ne, ne, c || a) } Fe && Fe($, ne), ne.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: ne }), g = null } const at = new rh; at.setAnimationLoop(lt), this.setAnimationLoop = function ($) { Fe = $ }, this.dispose = function () { } } } const ri = new $t, I_ = new Ue; function D_(s, e) { function t(m, p) { m.matrixAutoUpdate === !0 && m.updateMatrix(), p.value.copy(m.matrix) } function n(m, p) { p.color.getRGB(m.fogColor.value, Qc(s)), p.isFog ? (m.fogNear.value = p.near, m.fogFar.value = p.far) : p.isFogExp2 && (m.fogDensity.value = p.density) } function i(m, p, M, E, y) { p.isMeshBasicMaterial ? r(m, p) : p.isMeshLambertMaterial ? (r(m, p), p.envMap && (m.envMapIntensity.value = p.envMapIntensity)) : p.isMeshToonMaterial ? (r(m, p), d(m, p)) : p.isMeshPhongMaterial ? (r(m, p), h(m, p), p.envMap && (m.envMapIntensity.value = p.envMapIntensity)) : p.isMeshStandardMaterial ? (r(m, p), u(m, p), p.isMeshPhysicalMaterial && f(m, p, y)) : p.isMeshMatcapMaterial ? (r(m, p), g(m, p)) : p.isMeshDepthMaterial ? r(m, p) : p.isMeshDistanceMaterial ? (r(m, p), v(m, p)) : p.isMeshNormalMaterial ? r(m, p) : p.isLineBasicMaterial ? (a(m, p), p.isLineDashedMaterial && o(m, p)) : p.isPointsMaterial ? l(m, p, M, E) : p.isSpriteMaterial ? c(m, p) : p.isShadowMaterial ? (m.color.value.copy(p.color), m.opacity.value = p.opacity) : p.isShaderMaterial && (p.uniformsNeedUpdate = !1) } function r(m, p) { m.opacity.value = p.opacity, p.color && m.diffuse.value.copy(p.color), p.emissive && m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity), p.map && (m.map.value = p.map, t(p.map, m.mapTransform)), p.alphaMap && (m.alphaMap.value = p.alphaMap, t(p.alphaMap, m.alphaMapTransform)), p.bumpMap && (m.bumpMap.value = p.bumpMap, t(p.bumpMap, m.bumpMapTransform), m.bumpScale.value = p.bumpScale, p.side === Bt && (m.bumpScale.value *= -1)), p.normalMap && (m.normalMap.value = p.normalMap, t(p.normalMap, m.normalMapTransform), m.normalScale.value.copy(p.normalScale), p.side === Bt && m.normalScale.value.negate()), p.displacementMap && (m.displacementMap.value = p.displacementMap, t(p.displacementMap, m.displacementMapTransform), m.displacementScale.value = p.displacementScale, m.displacementBias.value = p.displacementBias), p.emissiveMap && (m.emissiveMap.value = p.emissiveMap, t(p.emissiveMap, m.emissiveMapTransform)), p.specularMap && (m.specularMap.value = p.specularMap, t(p.specularMap, m.specularMapTransform)), p.alphaTest > 0 && (m.alphaTest.value = p.alphaTest); const M = e.get(p), E = M.envMap, y = M.envMapRotation; E && (m.envMap.value = E, ri.copy(y), ri.x *= -1, ri.y *= -1, ri.z *= -1, E.isCubeTexture && E.isRenderTargetTexture === !1 && (ri.y *= -1, ri.z *= -1), m.envMapRotation.value.setFromMatrix4(I_.makeRotationFromEuler(ri)), m.flipEnvMap.value = E.isCubeTexture && E.isRenderTargetTexture === !1 ? -1 : 1, m.reflectivity.value = p.reflectivity, m.ior.value = p.ior, m.refractionRatio.value = p.refractionRatio), p.lightMap && (m.lightMap.value = p.lightMap, m.lightMapIntensity.value = p.lightMapIntensity, t(p.lightMap, m.lightMapTransform)), p.aoMap && (m.aoMap.value = p.aoMap, m.aoMapIntensity.value = p.aoMapIntensity, t(p.aoMap, m.aoMapTransform)) } function a(m, p) { m.diffuse.value.copy(p.color), m.opacity.value = p.opacity, p.map && (m.map.value = p.map, t(p.map, m.mapTransform)) } function o(m, p) { m.dashSize.value = p.dashSize, m.totalSize.value = p.dashSize + p.gapSize, m.scale.value = p.scale } function l(m, p, M, E) { m.diffuse.value.copy(p.color), m.opacity.value = p.opacity, m.size.value = p.size * M, m.scale.value = E * .5, p.map && (m.map.value = p.map, t(p.map, m.uvTransform)), p.alphaMap && (m.alphaMap.value = p.alphaMap, t(p.alphaMap, m.alphaMapTransform)), p.alphaTest > 0 && (m.alphaTest.value = p.alphaTest) } function c(m, p) { m.diffuse.value.copy(p.color), m.opacity.value = p.opacity, m.rotation.value = p.rotation, p.map && (m.map.value = p.map, t(p.map, m.mapTransform)), p.alphaMap && (m.alphaMap.value = p.alphaMap, t(p.alphaMap, m.alphaMapTransform)), p.alphaTest > 0 && (m.alphaTest.value = p.alphaTest) } function h(m, p) { m.specular.value.copy(p.specular), m.shininess.value = Math.max(p.shininess, 1e-4) } function d(m, p) { p.gradientMap && (m.gradientMap.value = p.gradientMap) } function u(m, p) { m.metalness.value = p.metalness, p.metalnessMap && (m.metalnessMap.value = p.metalnessMap, t(p.metalnessMap, m.metalnessMapTransform)), m.roughness.value = p.roughness, p.roughnessMap && (m.roughnessMap.value = p.roughnessMap, t(p.roughnessMap, m.roughnessMapTransform)), p.envMap && (m.envMapIntensity.value = p.envMapIntensity) } function f(m, p, M) { m.ior.value = p.ior, p.sheen > 0 && (m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen), m.sheenRoughness.value = p.sheenRoughness, p.sheenColorMap && (m.sheenColorMap.value = p.sheenColorMap, t(p.sheenColorMap, m.sheenColorMapTransform)), p.sheenRoughnessMap && (m.sheenRoughnessMap.value = p.sheenRoughnessMap, t(p.sheenRoughnessMap, m.sheenRoughnessMapTransform))), p.clearcoat > 0 && (m.clearcoat.value = p.clearcoat, m.clearcoatRoughness.value = p.clearcoatRoughness, p.clearcoatMap && (m.clearcoatMap.value = p.clearcoatMap, t(p.clearcoatMap, m.clearcoatMapTransform)), p.clearcoatRoughnessMap && (m.clearcoatRoughnessMap.value = p.clearcoatRoughnessMap, t(p.clearcoatRoughnessMap, m.clearcoatRoughnessMapTransform)), p.clearcoatNormalMap && (m.clearcoatNormalMap.value = p.clearcoatNormalMap, t(p.clearcoatNormalMap, m.clearcoatNormalMapTransform), m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale), p.side === Bt && m.clearcoatNormalScale.value.negate())), p.dispersion > 0 && (m.dispersion.value = p.dispersion), p.iridescence > 0 && (m.iridescence.value = p.iridescence, m.iridescenceIOR.value = p.iridescenceIOR, m.iridescenceThicknessMinimum.value = p.iridescenceThicknessRange[0], m.iridescenceThicknessMaximum.value = p.iridescenceThicknessRange[1], p.iridescenceMap && (m.iridescenceMap.value = p.iridescenceMap, t(p.iridescenceMap, m.iridescenceMapTransform)), p.iridescenceThicknessMap && (m.iridescenceThicknessMap.value = p.iridescenceThicknessMap, t(p.iridescenceThicknessMap, m.iridescenceThicknessMapTransform))), p.transmission > 0 && (m.transmission.value = p.transmission, m.transmissionSamplerMap.value = M.texture, m.transmissionSamplerSize.value.set(M.width, M.height), p.transmissionMap && (m.transmissionMap.value = p.transmissionMap, t(p.transmissionMap, m.transmissionMapTransform)), m.thickness.value = p.thickness, p.thicknessMap && (m.thicknessMap.value = p.thicknessMap, t(p.thicknessMap, m.thicknessMapTransform)), m.attenuationDistance.value = p.attenuationDistance, m.attenuationColor.value.copy(p.attenuationColor)), p.anisotropy > 0 && (m.anisotropyVector.value.set(p.anisotropy * Math.cos(p.anisotropyRotation), p.anisotropy * Math.sin(p.anisotropyRotation)), p.anisotropyMap && (m.anisotropyMap.value = p.anisotropyMap, t(p.anisotropyMap, m.anisotropyMapTransform))), m.specularIntensity.value = p.specularIntensity, m.specularColor.value.copy(p.specularColor), p.specularColorMap && (m.specularColorMap.value = p.specularColorMap, t(p.specularColorMap, m.specularColorMapTransform)), p.specularIntensityMap && (m.specularIntensityMap.value = p.specularIntensityMap, t(p.specularIntensityMap, m.specularIntensityMapTransform)) } function g(m, p) { p.matcap && (m.matcap.value = p.matcap) } function v(m, p) { const M = e.get(p).light; m.referencePosition.value.setFromMatrixPosition(M.matrixWorld), m.nearDistance.value = M.shadow.camera.near, m.farDistance.value = M.shadow.camera.far } return { refreshFogUniforms: n, refreshMaterialUniforms: i } } function N_(s, e, t, n) { let i = {}, r = {}, a = []; const o = s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS); function l(M, E) { const y = E.program; n.uniformBlockBinding(M, y) } function c(M, E) { let y = i[M.id]; y === void 0 && (g(M), y = h(M), i[M.id] = y, M.addEventListener("dispose", m)); const w = E.program; n.updateUBOMapping(M, w); const A = e.render.frame; r[M.id] !== A && (u(M), r[M.id] = A) } function h(M) { const E = d(); M.__bindingPointIndex = E; const y = s.createBuffer(), w = M.__size, A = M.usage; return s.bindBuffer(s.UNIFORM_BUFFER, y), s.bufferData(s.UNIFORM_BUFFER, w, A), s.bindBuffer(s.UNIFORM_BUFFER, null), s.bindBufferBase(s.UNIFORM_BUFFER, E, y), y } function d() { for (let M = 0; M < o; M++)if (a.indexOf(M) === -1) return a.push(M), M; return Ce("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0 } function u(M) { const E = i[M.id], y = M.uniforms, w = M.__cache; s.bindBuffer(s.UNIFORM_BUFFER, E); for (let A = 0, C = y.length; A < C; A++) { const x = Array.isArray(y[A]) ? y[A] : [y[A]]; for (let b = 0, W = x.length; b < W; b++) { const R = x[b]; if (f(R, A, b, w) === !0) { const U = R.__offset, O = Array.isArray(R.value) ? R.value : [R.value]; let G = 0; for (let z = 0; z < O.length; z++) { const V = O[z], F = v(V); typeof V == "number" || typeof V == "boolean" ? (R.__data[0] = V, s.bufferSubData(s.UNIFORM_BUFFER, U + G, R.__data)) : V.isMatrix3 ? (R.__data[0] = V.elements[0], R.__data[1] = V.elements[1], R.__data[2] = V.elements[2], R.__data[3] = 0, R.__data[4] = V.elements[3], R.__data[5] = V.elements[4], R.__data[6] = V.elements[5], R.__data[7] = 0, R.__data[8] = V.elements[6], R.__data[9] = V.elements[7], R.__data[10] = V.elements[8], R.__data[11] = 0) : (V.toArray(R.__data, G), G += F.storage / Float32Array.BYTES_PER_ELEMENT) } s.bufferSubData(s.UNIFORM_BUFFER, U, R.__data) } } } s.bindBuffer(s.UNIFORM_BUFFER, null) } function f(M, E, y, w) { const A = M.value, C = E + "_" + y; if (w[C] === void 0) return typeof A == "number" || typeof A == "boolean" ? w[C] = A : w[C] = A.clone(), !0; { const x = w[C]; if (typeof A == "number" || typeof A == "boolean") { if (x !== A) return w[C] = A, !0 } else if (x.equals(A) === !1) return x.copy(A), !0 } return !1 } function g(M) { const E = M.uniforms; let y = 0; const w = 16; for (let C = 0, x = E.length; C < x; C++) { const b = Array.isArray(E[C]) ? E[C] : [E[C]]; for (let W = 0, R = b.length; W < R; W++) { const U = b[W], O = Array.isArray(U.value) ? U.value : [U.value]; for (let G = 0, z = O.length; G < z; G++) { const V = O[G], F = v(V), Q = y % w, j = Q % F.boundary, ce = Q + j; y += j, ce !== 0 && w - ce < F.storage && (y += w - ce), U.__data = new Float32Array(F.storage / Float32Array.BYTES_PER_ELEMENT), U.__offset = y, y += F.storage } } } const A = y % w; return A > 0 && (y += w - A), M.__size = y, M.__cache = {}, this } function v(M) { const E = { boundary: 0, storage: 0 }; return typeof M == "number" || typeof M == "boolean" ? (E.boundary = 4, E.storage = 4) : M.isVector2 ? (E.boundary = 8, E.storage = 8) : M.isVector3 || M.isColor ? (E.boundary = 16, E.storage = 12) : M.isVector4 ? (E.boundary = 16, E.storage = 16) : M.isMatrix3 ? (E.boundary = 48, E.storage = 48) : M.isMatrix4 ? (E.boundary = 64, E.storage = 64) : M.isTexture ? Ee("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : Ee("WebGLRenderer: Unsupported uniform value type.", M), E } function m(M) { const E = M.target; E.removeEventListener("dispose", m); const y = a.indexOf(E.__bindingPointIndex); a.splice(y, 1), s.deleteBuffer(i[E.id]), delete i[E.id], delete r[E.id] } function p() { for (const M in i) s.deleteBuffer(i[M]); a = [], i = {}, r = {} } return { bind: l, update: c, dispose: p } } const U_ = new Uint16Array([12469, 15057, 12620, 14925, 13266, 14620, 13807, 14376, 14323, 13990, 14545, 13625, 14713, 13328, 14840, 12882, 14931, 12528, 14996, 12233, 15039, 11829, 15066, 11525, 15080, 11295, 15085, 10976, 15082, 10705, 15073, 10495, 13880, 14564, 13898, 14542, 13977, 14430, 14158, 14124, 14393, 13732, 14556, 13410, 14702, 12996, 14814, 12596, 14891, 12291, 14937, 11834, 14957, 11489, 14958, 11194, 14943, 10803, 14921, 10506, 14893, 10278, 14858, 9960, 14484, 14039, 14487, 14025, 14499, 13941, 14524, 13740, 14574, 13468, 14654, 13106, 14743, 12678, 14818, 12344, 14867, 11893, 14889, 11509, 14893, 11180, 14881, 10751, 14852, 10428, 14812, 10128, 14765, 9754, 14712, 9466, 14764, 13480, 14764, 13475, 14766, 13440, 14766, 13347, 14769, 13070, 14786, 12713, 14816, 12387, 14844, 11957, 14860, 11549, 14868, 11215, 14855, 10751, 14825, 10403, 14782, 10044, 14729, 9651, 14666, 9352, 14599, 9029, 14967, 12835, 14966, 12831, 14963, 12804, 14954, 12723, 14936, 12564, 14917, 12347, 14900, 11958, 14886, 11569, 14878, 11247, 14859, 10765, 14828, 10401, 14784, 10011, 14727, 9600, 14660, 9289, 14586, 8893, 14508, 8533, 15111, 12234, 15110, 12234, 15104, 12216, 15092, 12156, 15067, 12010, 15028, 11776, 14981, 11500, 14942, 11205, 14902, 10752, 14861, 10393, 14812, 9991, 14752, 9570, 14682, 9252, 14603, 8808, 14519, 8445, 14431, 8145, 15209, 11449, 15208, 11451, 15202, 11451, 15190, 11438, 15163, 11384, 15117, 11274, 15055, 10979, 14994, 10648, 14932, 10343, 14871, 9936, 14803, 9532, 14729, 9218, 14645, 8742, 14556, 8381, 14461, 8020, 14365, 7603, 15273, 10603, 15272, 10607, 15267, 10619, 15256, 10631, 15231, 10614, 15182, 10535, 15118, 10389, 15042, 10167, 14963, 9787, 14883, 9447, 14800, 9115, 14710, 8665, 14615, 8318, 14514, 7911, 14411, 7507, 14279, 7198, 15314, 9675, 15313, 9683, 15309, 9712, 15298, 9759, 15277, 9797, 15229, 9773, 15166, 9668, 15084, 9487, 14995, 9274, 14898, 8910, 14800, 8539, 14697, 8234, 14590, 7790, 14479, 7409, 14367, 7067, 14178, 6621, 15337, 8619, 15337, 8631, 15333, 8677, 15325, 8769, 15305, 8871, 15264, 8940, 15202, 8909, 15119, 8775, 15022, 8565, 14916, 8328, 14804, 8009, 14688, 7614, 14569, 7287, 14448, 6888, 14321, 6483, 14088, 6171, 15350, 7402, 15350, 7419, 15347, 7480, 15340, 7613, 15322, 7804, 15287, 7973, 15229, 8057, 15148, 8012, 15046, 7846, 14933, 7611, 14810, 7357, 14682, 7069, 14552, 6656, 14421, 6316, 14251, 5948, 14007, 5528, 15356, 5942, 15356, 5977, 15353, 6119, 15348, 6294, 15332, 6551, 15302, 6824, 15249, 7044, 15171, 7122, 15070, 7050, 14949, 6861, 14818, 6611, 14679, 6349, 14538, 6067, 14398, 5651, 14189, 5311, 13935, 4958, 15359, 4123, 15359, 4153, 15356, 4296, 15353, 4646, 15338, 5160, 15311, 5508, 15263, 5829, 15188, 6042, 15088, 6094, 14966, 6001, 14826, 5796, 14678, 5543, 14527, 5287, 14377, 4985, 14133, 4586, 13869, 4257, 15360, 1563, 15360, 1642, 15358, 2076, 15354, 2636, 15341, 3350, 15317, 4019, 15273, 4429, 15203, 4732, 15105, 4911, 14981, 4932, 14836, 4818, 14679, 4621, 14517, 4386, 14359, 4156, 14083, 3795, 13808, 3437, 15360, 122, 15360, 137, 15358, 285, 15355, 636, 15344, 1274, 15322, 2177, 15281, 2765, 15215, 3223, 15120, 3451, 14995, 3569, 14846, 3567, 14681, 3466, 14511, 3305, 14344, 3121, 14037, 2800, 13753, 2467, 15360, 0, 15360, 1, 15359, 21, 15355, 89, 15346, 253, 15325, 479, 15287, 796, 15225, 1148, 15133, 1492, 15008, 1749, 14856, 1882, 14685, 1886, 14506, 1783, 14324, 1608, 13996, 1398, 13702, 1183]); let un = null; function F_() { return un === null && (un = new Do(U_, 16, 16, zi, On), un.name = "DFG_LUT", un.minFilter = xt, un.magFilter = xt, un.wrapS = pn, un.wrapT = pn, un.generateMipmaps = !1, un.needsUpdate = !0), un } class O_ { constructor(e = {}) { const { canvas: t = au(), context: n = null, depth: i = !0, stencil: r = !1, alpha: a = !1, antialias: o = !1, premultipliedAlpha: l = !0, preserveDrawingBuffer: c = !1, powerPreference: h = "default", failIfMajorPerformanceCaveat: d = !1, reversedDepthBuffer: u = !1, outputBufferType: f = Ht } = e; this.isWebGLRenderer = !0; let g; if (n !== null) { if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext) throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163."); g = n.getContextAttributes().alpha } else g = a; const v = f, m = new Set([Ao, To, Eo]), p = new Set([Ht, vn, _s, xs, So, yo]), M = new Uint32Array(4), E = new Int32Array(4); let y = null, w = null; const A = [], C = []; let x = null; this.domElement = t, this.debug = { checkShaderErrors: !0, onShaderError: null }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = gn, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1; const b = this; let W = !1; this._outputColorSpace = wt; let R = 0, U = 0, O = null, G = -1, z = null; const V = new ot, F = new ot; let Q = null; const j = new Ae(0); let ce = 0, pe = t.width, ue = t.height, Fe = 1, lt = null, at = null; const $ = new ot(0, 0, pe, ue), ne = new ot(0, 0, pe, ue); let re = !1; const Ne = new Uo; let we = !1, Pe = !1; const St = new Ue, Xe = new L, $e = new ot, tt = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 }; let Be = !1; function dt() { return O === null ? Fe : 1 } let P = n; function mt(S, N) { return t.getContext(S, N) } try { const S = { alpha: !0, depth: i, stencil: r, antialias: o, premultipliedAlpha: l, preserveDrawingBuffer: c, powerPreference: h, failIfMajorPerformanceCaveat: d }; if ("setAttribute" in t && t.setAttribute("data-engine", `three.js r${xo}`), t.addEventListener("webglcontextlost", _e, !1), t.addEventListener("webglcontextrestored", Le, !1), t.addEventListener("webglcontextcreationerror", rt, !1), P === null) { const N = "webgl2"; if (P = mt(N, S), P === null) throw mt(N) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.") } } catch (S) { throw Ce("WebGLRenderer: " + S.message), S } let qe, st, Me, T, _, D, q, K, Y, me, ie, Te, Re, Z, ee, ge, xe, he, ze, I, se, te, fe; function J() { qe = new Om(P), qe.init(), se = new w_(P, qe), st = new Cm(P, qe, e, se), Me = new T_(P, qe), st.reversedDepthBuffer && u && Me.buffers.depth.setReversed(!0), T = new km(P), _ = new u_, D = new A_(P, qe, Me, _, st, se, T), q = new Fm(b), K = new Wd(P), te = new wm(P, K), Y = new Bm(P, K, T, te), me = new Hm(P, Y, K, te, T), he = new Vm(P, st, D), ee = new Pm(_), ie = new h_(b, q, qe, st, te, ee), Te = new D_(b, _), Re = new f_, Z = new v_(qe), xe = new Am(b, q, Me, me, g, l), ge = new E_(b, me, st), fe = new N_(P, T, st, Me), ze = new Rm(P, qe, T), I = new zm(P, qe, T), T.programs = ie.programs, b.capabilities = st, b.extensions = qe, b.properties = _, b.renderLists = Re, b.shadowMap = ge, b.state = Me, b.info = T } J(), v !== Ht && (x = new Wm(v, t.width, t.height, i, r)); const X = new L_(b, P); this.xr = X, this.getContext = function () { return P }, this.getContextAttributes = function () { return P.getContextAttributes() }, this.forceContextLoss = function () { const S = qe.get("WEBGL_lose_context"); S && S.loseContext() }, this.forceContextRestore = function () { const S = qe.get("WEBGL_lose_context"); S && S.restoreContext() }, this.getPixelRatio = function () { return Fe }, this.setPixelRatio = function (S) { S !== void 0 && (Fe = S, this.setSize(pe, ue, !1)) }, this.getSize = function (S) { return S.set(pe, ue) }, this.setSize = function (S, N, H = !0) { if (X.isPresenting) { Ee("WebGLRenderer: Can't change size while VR device is presenting."); return } pe = S, ue = N, t.width = Math.floor(S * Fe), t.height = Math.floor(N * Fe), H === !0 && (t.style.width = S + "px", t.style.height = N + "px"), x !== null && x.setSize(t.width, t.height), this.setViewport(0, 0, S, N) }, this.getDrawingBufferSize = function (S) { return S.set(pe * Fe, ue * Fe).floor() }, this.setDrawingBufferSize = function (S, N, H) { pe = S, ue = N, Fe = H, t.width = Math.floor(S * H), t.height = Math.floor(N * H), this.setViewport(0, 0, S, N) }, this.setEffects = function (S) { if (v === Ht) { console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType."); return } if (S) { for (let N = 0; N < S.length; N++)if (S[N].isOutputPass === !0) { console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically."); break } } x.setEffects(S || []) }, this.getCurrentViewport = function (S) { return S.copy(V) }, this.getViewport = function (S) { return S.copy($) }, this.setViewport = function (S, N, H, k) { S.isVector4 ? $.set(S.x, S.y, S.z, S.w) : $.set(S, N, H, k), Me.viewport(V.copy($).multiplyScalar(Fe).round()) }, this.getScissor = function (S) { return S.copy(ne) }, this.setScissor = function (S, N, H, k) { S.isVector4 ? ne.set(S.x, S.y, S.z, S.w) : ne.set(S, N, H, k), Me.scissor(F.copy(ne).multiplyScalar(Fe).round()) }, this.getScissorTest = function () { return re }, this.setScissorTest = function (S) { Me.setScissorTest(re = S) }, this.setOpaqueSort = function (S) { lt = S }, this.setTransparentSort = function (S) { at = S }, this.getClearColor = function (S) { return S.copy(xe.getClearColor()) }, this.setClearColor = function () { xe.setClearColor(...arguments) }, this.getClearAlpha = function () { return xe.getClearAlpha() }, this.setClearAlpha = function () { xe.setClearAlpha(...arguments) }, this.clear = function (S = !0, N = !0, H = !0) { let k = 0; if (S) { let B = !1; if (O !== null) { const oe = O.texture.format; B = m.has(oe) } if (B) { const oe = O.texture.type, de = p.has(oe), le = xe.getClearColor(), ve = xe.getClearAlpha(), ye = le.r, Ie = le.g, ke = le.b; de ? (M[0] = ye, M[1] = Ie, M[2] = ke, M[3] = ve, P.clearBufferuiv(P.COLOR, 0, M)) : (E[0] = ye, E[1] = Ie, E[2] = ke, E[3] = ve, P.clearBufferiv(P.COLOR, 0, E)) } else k |= P.COLOR_BUFFER_BIT } N && (k |= P.DEPTH_BUFFER_BIT), H && (k |= P.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), k !== 0 && P.clear(k) }, this.clearColor = function () { this.clear(!0, !1, !1) }, this.clearDepth = function () { this.clear(!1, !0, !1) }, this.clearStencil = function () { this.clear(!1, !1, !0) }, this.dispose = function () { t.removeEventListener("webglcontextlost", _e, !1), t.removeEventListener("webglcontextrestored", Le, !1), t.removeEventListener("webglcontextcreationerror", rt, !1), xe.dispose(), Re.dispose(), Z.dispose(), _.dispose(), q.dispose(), me.dispose(), te.dispose(), fe.dispose(), ie.dispose(), X.dispose(), X.removeEventListener("sessionstart", Yo), X.removeEventListener("sessionend", qo), Jn.stop() }; function _e(S) { S.preventDefault(), xr("WebGLRenderer: Context Lost."), W = !0 } function Le() { xr("WebGLRenderer: Context Restored."), W = !1; const S = T.autoReset, N = ge.enabled, H = ge.autoUpdate, k = ge.needsUpdate, B = ge.type; J(), T.autoReset = S, ge.enabled = N, ge.autoUpdate = H, ge.needsUpdate = k, ge.type = B } function rt(S) { Ce("WebGLRenderer: A WebGL context could not be created. Reason: ", S.statusMessage) } function Ke(S) { const N = S.target; N.removeEventListener("dispose", Ke), yn(N) } function yn(S) { bn(S), _.remove(S) } function bn(S) { const N = _.get(S).programs; N !== void 0 && (N.forEach(function (H) { ie.releaseProgram(H) }), S.isShaderMaterial && ie.releaseShaderCache(S)) } this.renderBufferDirect = function (S, N, H, k, B, oe) { N === null && (N = tt); const de = B.isMesh && B.matrixWorld.determinant() < 0, le = xh(S, N, H, k, B); Me.setMaterial(k, de); let ve = H.index, ye = 1; if (k.wireframe === !0) { if (ve = Y.getWireframeAttribute(H), ve === void 0) return; ye = 2 } const Ie = H.drawRange, ke = H.attributes.position; let be = Ie.start * ye, Qe = (Ie.start + Ie.count) * ye; oe !== null && (be = Math.max(be, oe.start * ye), Qe = Math.min(Qe, (oe.start + oe.count) * ye)), ve !== null ? (be = Math.max(be, 0), Qe = Math.min(Qe, ve.count)) : ke != null && (be = Math.max(be, 0), Qe = Math.min(Qe, ke.count)); const ft = Qe - be; if (ft < 0 || ft === 1 / 0) return; te.setup(B, k, le, H, ve); let ht, et = ze; if (ve !== null && (ht = K.get(ve), et = I, et.setIndex(ht)), B.isMesh) k.wireframe === !0 ? (Me.setLineWidth(k.wireframeLinewidth * dt()), et.setMode(P.LINES)) : et.setMode(P.TRIANGLES); else if (B.isLine) { let Ct = k.linewidth; Ct === void 0 && (Ct = 1), Me.setLineWidth(Ct * dt()), B.isLineSegments ? et.setMode(P.LINES) : B.isLineLoop ? et.setMode(P.LINE_LOOP) : et.setMode(P.LINE_STRIP) } else B.isPoints ? et.setMode(P.POINTS) : B.isSprite && et.setMode(P.TRIANGLES); if (B.isBatchedMesh) if (B._multiDrawInstances !== null) vr("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."), et.renderMultiDrawInstances(B._multiDrawStarts, B._multiDrawCounts, B._multiDrawCount, B._multiDrawInstances); else if (qe.get("WEBGL_multi_draw")) et.renderMultiDraw(B._multiDrawStarts, B._multiDrawCounts, B._multiDrawCount); else { const Ct = B._multiDrawStarts, Se = B._multiDrawCounts, zt = B._multiDrawCount, Ye = ve ? K.get(ve).bytesPerElement : 1, Kt = _.get(k).currentProgram.getUniforms(); for (let cn = 0; cn < zt; cn++)Kt.setValue(P, "_gl_DrawID", cn), et.render(Ct[cn] / Ye, Se[cn]) } else if (B.isInstancedMesh) et.renderInstances(be, ft, B.count); else if (H.isInstancedBufferGeometry) { const Ct = H._maxInstanceCount !== void 0 ? H._maxInstanceCount : 1 / 0, Se = Math.min(H.instanceCount, Ct); et.renderInstances(be, ft, Se) } else et.render(be, ft) }; function Xo(S, N, H) { S.transparent === !0 && S.side === Qt && S.forceSinglePass === !1 ? (S.side = Bt, S.needsUpdate = !0, Is(S, N, H), S.side = Fn, S.needsUpdate = !0, Is(S, N, H), S.side = Qt) : Is(S, N, H) } this.compile = function (S, N, H = null) { H === null && (H = S), w = Z.get(H), w.init(N), C.push(w), H.traverseVisible(function (B) { B.isLight && B.layers.test(N.layers) && (w.pushLight(B), B.castShadow && w.pushShadow(B)) }), S !== H && S.traverseVisible(function (B) { B.isLight && B.layers.test(N.layers) && (w.pushLight(B), B.castShadow && w.pushShadow(B)) }), w.setupLights(); const k = new Set; return S.traverse(function (B) { if (!(B.isMesh || B.isPoints || B.isLine || B.isSprite)) return; const oe = B.material; if (oe) if (Array.isArray(oe)) for (let de = 0; de < oe.length; de++) { const le = oe[de]; Xo(le, H, B), k.add(le) } else Xo(oe, H, B), k.add(oe) }), w = C.pop(), k }, this.compileAsync = function (S, N, H = null) { const k = this.compile(S, N, H); return new Promise(B => { function oe() { if (k.forEach(function (de) { _.get(de).currentProgram.isReady() && k.delete(de) }), k.size === 0) { B(S); return } setTimeout(oe, 10) } qe.get("KHR_parallel_shader_compile") !== null ? oe() : setTimeout(oe, 10) }) }; let Pr = null; function _h(S) { Pr && Pr(S) } function Yo() { Jn.stop() } function qo() { Jn.start() } const Jn = new rh; Jn.setAnimationLoop(_h), typeof self < "u" && Jn.setContext(self), this.setAnimationLoop = function (S) { Pr = S, X.setAnimationLoop(S), S === null ? Jn.stop() : Jn.start() }, X.addEventListener("sessionstart", Yo), X.addEventListener("sessionend", qo), this.render = function (S, N) { if (N !== void 0 && N.isCamera !== !0) { Ce("WebGLRenderer.render: camera is not an instance of THREE.Camera."); return } if (W === !0) return; const H = X.enabled === !0 && X.isPresenting === !0, k = x !== null && (O === null || H) && x.begin(b, O); if (S.matrixWorldAutoUpdate === !0 && S.updateMatrixWorld(), N.parent === null && N.matrixWorldAutoUpdate === !0 && N.updateMatrixWorld(), X.enabled === !0 && X.isPresenting === !0 && (x === null || x.isCompositing() === !1) && (X.cameraAutoUpdate === !0 && X.updateCamera(N), N = X.getCamera()), S.isScene === !0 && S.onBeforeRender(b, S, N, O), w = Z.get(S, C.length), w.init(N), C.push(w), St.multiplyMatrices(N.projectionMatrix, N.matrixWorldInverse), Ne.setFromProjectionMatrix(St, mn, N.reversedDepth), Pe = this.localClippingEnabled, we = ee.init(this.clippingPlanes, Pe), y = Re.get(S, A.length), y.init(), A.push(y), X.enabled === !0 && X.isPresenting === !0) { const de = b.xr.getDepthSensingMesh(); de !== null && Lr(de, N, -1 / 0, b.sortObjects) } Lr(S, N, 0, b.sortObjects), y.finish(), b.sortObjects === !0 && y.sort(lt, at), Be = X.enabled === !1 || X.isPresenting === !1 || X.hasDepthSensing() === !1, Be && xe.addToRenderList(y, S), this.info.render.frame++, we === !0 && ee.beginShadows(); const B = w.state.shadowsArray; if (ge.render(B, S, N), we === !0 && ee.endShadows(), this.info.autoReset === !0 && this.info.reset(), (k && x.hasRenderPass()) === !1) { const de = y.opaque, le = y.transmissive; if (w.setupLights(), N.isArrayCamera) { const ve = N.cameras; if (le.length > 0) for (let ye = 0, Ie = ve.length; ye < Ie; ye++) { const ke = ve[ye]; Ko(de, le, S, ke) } Be && xe.render(S); for (let ye = 0, Ie = ve.length; ye < Ie; ye++) { const ke = ve[ye]; $o(y, S, ke, ke.viewport) } } else le.length > 0 && Ko(de, le, S, N), Be && xe.render(S), $o(y, S, N) } O !== null && U === 0 && (D.updateMultisampleRenderTarget(O), D.updateRenderTargetMipmap(O)), k && x.end(b), S.isScene === !0 && S.onAfterRender(b, S, N), te.resetDefaultState(), G = -1, z = null, C.pop(), C.length > 0 ? (w = C[C.length - 1], we === !0 && ee.setGlobalState(b.clippingPlanes, w.state.camera)) : w = null, A.pop(), A.length > 0 ? y = A[A.length - 1] : y = null }; function Lr(S, N, H, k) { if (S.visible === !1) return; if (S.layers.test(N.layers)) { if (S.isGroup) H = S.renderOrder; else if (S.isLOD) S.autoUpdate === !0 && S.update(N); else if (S.isLight) w.pushLight(S), S.castShadow && w.pushShadow(S); else if (S.isSprite) { if (!S.frustumCulled || Ne.intersectsSprite(S)) { k && $e.setFromMatrixPosition(S.matrixWorld).applyMatrix4(St); const de = me.update(S), le = S.material; le.visible && y.push(S, de, le, H, $e.z, null) } } else if ((S.isMesh || S.isLine || S.isPoints) && (!S.frustumCulled || Ne.intersectsObject(S))) { const de = me.update(S), le = S.material; if (k && (S.boundingSphere !== void 0 ? (S.boundingSphere === null && S.computeBoundingSphere(), $e.copy(S.boundingSphere.center)) : (de.boundingSphere === null && de.computeBoundingSphere(), $e.copy(de.boundingSphere.center)), $e.applyMatrix4(S.matrixWorld).applyMatrix4(St)), Array.isArray(le)) { const ve = de.groups; for (let ye = 0, Ie = ve.length; ye < Ie; ye++) { const ke = ve[ye], be = le[ke.materialIndex]; be && be.visible && y.push(S, de, be, H, $e.z, ke) } } else le.visible && y.push(S, de, le, H, $e.z, null) } } const oe = S.children; for (let de = 0, le = oe.length; de < le; de++)Lr(oe[de], N, H, k) } function $o(S, N, H, k) { const { opaque: B, transmissive: oe, transparent: de } = S; w.setupLightsView(H), we === !0 && ee.setGlobalState(b.clippingPlanes, H), k && Me.viewport(V.copy(k)), B.length > 0 && Ls(B, N, H), oe.length > 0 && Ls(oe, N, H), de.length > 0 && Ls(de, N, H), Me.buffers.depth.setTest(!0), Me.buffers.depth.setMask(!0), Me.buffers.color.setMask(!0), Me.setPolygonOffset(!1) } function Ko(S, N, H, k) { if ((H.isScene === !0 ? H.overrideMaterial : null) !== null) return; if (w.state.transmissionRenderTarget[k.id] === void 0) { const be = qe.has("EXT_color_buffer_half_float") || qe.has("EXT_color_buffer_float"); w.state.transmissionRenderTarget[k.id] = new _n(1, 1, { generateMipmaps: !0, type: be ? On : Ht, minFilter: Ln, samples: Math.max(4, st.samples), stencilBuffer: r, resolveDepthBuffer: !1, resolveStencilBuffer: !1, colorSpace: We.workingColorSpace }) } const oe = w.state.transmissionRenderTarget[k.id], de = k.viewport || V; oe.setSize(de.z * b.transmissionResolutionScale, de.w * b.transmissionResolutionScale); const le = b.getRenderTarget(), ve = b.getActiveCubeFace(), ye = b.getActiveMipmapLevel(); b.setRenderTarget(oe), b.getClearColor(j), ce = b.getClearAlpha(), ce < 1 && b.setClearColor(16777215, .5), b.clear(), Be && xe.render(H); const Ie = b.toneMapping; b.toneMapping = gn; const ke = k.viewport; if (k.viewport !== void 0 && (k.viewport = void 0), w.setupLightsView(k), we === !0 && ee.setGlobalState(b.clippingPlanes, k), Ls(S, H, k), D.updateMultisampleRenderTarget(oe), D.updateRenderTargetMipmap(oe), qe.has("WEBGL_multisampled_render_to_texture") === !1) { let be = !1; for (let Qe = 0, ft = N.length; Qe < ft; Qe++) { const ht = N[Qe], { object: et, geometry: Ct, material: Se, group: zt } = ht; if (Se.side === Qt && et.layers.test(k.layers)) { const Ye = Se.side; Se.side = Bt, Se.needsUpdate = !0, jo(et, H, k, Ct, Se, zt), Se.side = Ye, Se.needsUpdate = !0, be = !0 } } be === !0 && (D.updateMultisampleRenderTarget(oe), D.updateRenderTargetMipmap(oe)) } b.setRenderTarget(le, ve, ye), b.setClearColor(j, ce), ke !== void 0 && (k.viewport = ke), b.toneMapping = Ie } function Ls(S, N, H) { const k = N.isScene === !0 ? N.overrideMaterial : null; for (let B = 0, oe = S.length; B < oe; B++) { const de = S[B], { object: le, geometry: ve, group: ye } = de; let Ie = de.material; Ie.allowOverride === !0 && k !== null && (Ie = k), le.layers.test(H.layers) && jo(le, N, H, ve, Ie, ye) } } function jo(S, N, H, k, B, oe) { S.onBeforeRender(b, N, H, k, B, oe), S.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse, S.matrixWorld), S.normalMatrix.getNormalMatrix(S.modelViewMatrix), B.onBeforeRender(b, N, H, k, S, oe), B.transparent === !0 && B.side === Qt && B.forceSinglePass === !1 ? (B.side = Bt, B.needsUpdate = !0, b.renderBufferDirect(H, N, k, B, S, oe), B.side = Fn, B.needsUpdate = !0, b.renderBufferDirect(H, N, k, B, S, oe), B.side = Qt) : b.renderBufferDirect(H, N, k, B, S, oe), S.onAfterRender(b, N, H, k, B, oe) } function Is(S, N, H) { N.isScene !== !0 && (N = tt); const k = _.get(S), B = w.state.lights, oe = w.state.shadowsArray, de = B.state.version, le = ie.getParameters(S, B.state, oe, N, H), ve = ie.getProgramCacheKey(le); let ye = k.programs; k.environment = S.isMeshStandardMaterial || S.isMeshLambertMaterial || S.isMeshPhongMaterial ? N.environment : null, k.fog = N.fog; const Ie = S.isMeshStandardMaterial || S.isMeshLambertMaterial && !S.envMap || S.isMeshPhongMaterial && !S.envMap; k.envMap = q.get(S.envMap || k.environment, Ie), k.envMapRotation = k.environment !== null && S.envMap === null ? N.environmentRotation : S.envMapRotation, ye === void 0 && (S.addEventListener("dispose", Ke), ye = new Map, k.programs = ye); let ke = ye.get(ve); if (ke !== void 0) { if (k.currentProgram === ke && k.lightsStateVersion === de) return Jo(S, le), ke } else le.uniforms = ie.getUniforms(S), S.onBeforeCompile(le, b), ke = ie.acquireProgram(le, ve), ye.set(ve, ke), k.uniforms = le.uniforms; const be = k.uniforms; return (!S.isShaderMaterial && !S.isRawShaderMaterial || S.clipping === !0) && (be.clippingPlanes = ee.uniform), Jo(S, le), k.needsLights = Mh(S), k.lightsStateVersion = de, k.needsLights && (be.ambientLightColor.value = B.state.ambient, be.lightProbe.value = B.state.probe, be.directionalLights.value = B.state.directional, be.directionalLightShadows.value = B.state.directionalShadow, be.spotLights.value = B.state.spot, be.spotLightShadows.value = B.state.spotShadow, be.rectAreaLights.value = B.state.rectArea, be.ltc_1.value = B.state.rectAreaLTC1, be.ltc_2.value = B.state.rectAreaLTC2, be.pointLights.value = B.state.point, be.pointLightShadows.value = B.state.pointShadow, be.hemisphereLights.value = B.state.hemi, be.directionalShadowMatrix.value = B.state.directionalShadowMatrix, be.spotLightMatrix.value = B.state.spotLightMatrix, be.spotLightMap.value = B.state.spotLightMap, be.pointShadowMatrix.value = B.state.pointShadowMatrix), k.currentProgram = ke, k.uniformsList = null, ke } function Zo(S) { if (S.uniformsList === null) { const N = S.currentProgram.getUniforms(); S.uniformsList = mr.seqWithValue(N.seq, S.uniforms) } return S.uniformsList } function Jo(S, N) { const H = _.get(S); H.outputColorSpace = N.outputColorSpace, H.batching = N.batching, H.batchingColor = N.batchingColor, H.instancing = N.instancing, H.instancingColor = N.instancingColor, H.instancingMorph = N.instancingMorph, H.skinning = N.skinning, H.morphTargets = N.morphTargets, H.morphNormals = N.morphNormals, H.morphColors = N.morphColors, H.morphTargetsCount = N.morphTargetsCount, H.numClippingPlanes = N.numClippingPlanes, H.numIntersection = N.numClipIntersection, H.vertexAlphas = N.vertexAlphas, H.vertexTangents = N.vertexTangents, H.toneMapping = N.toneMapping } function xh(S, N, H, k, B) { N.isScene !== !0 && (N = tt), D.resetTextureUnits(); const oe = N.fog, de = k.isMeshStandardMaterial || k.isMeshLambertMaterial || k.isMeshPhongMaterial ? N.environment : null, le = O === null ? b.outputColorSpace : O.isXRRenderTarget === !0 ? O.texture.colorSpace : Ot, ve = k.isMeshStandardMaterial || k.isMeshLambertMaterial && !k.envMap || k.isMeshPhongMaterial && !k.envMap, ye = q.get(k.envMap || de, ve), Ie = k.vertexColors === !0 && !!H.attributes.color && H.attributes.color.itemSize === 4, ke = !!H.attributes.tangent && (!!k.normalMap || k.anisotropy > 0), be = !!H.morphAttributes.position, Qe = !!H.morphAttributes.normal, ft = !!H.morphAttributes.color; let ht = gn; k.toneMapped && (O === null || O.isXRRenderTarget === !0) && (ht = b.toneMapping); const et = H.morphAttributes.position || H.morphAttributes.normal || H.morphAttributes.color, Ct = et !== void 0 ? et.length : 0, Se = _.get(k), zt = w.state.lights; if (we === !0 && (Pe === !0 || S !== z)) { const yt = S === z && k.id === G; ee.setState(k, S, yt) } let Ye = !1; k.version === Se.__version ? (Se.needsLights && Se.lightsStateVersion !== zt.state.version || Se.outputColorSpace !== le || B.isBatchedMesh && Se.batching === !1 || !B.isBatchedMesh && Se.batching === !0 || B.isBatchedMesh && Se.batchingColor === !0 && B.colorTexture === null || B.isBatchedMesh && Se.batchingColor === !1 && B.colorTexture !== null || B.isInstancedMesh && Se.instancing === !1 || !B.isInstancedMesh && Se.instancing === !0 || B.isSkinnedMesh && Se.skinning === !1 || !B.isSkinnedMesh && Se.skinning === !0 || B.isInstancedMesh && Se.instancingColor === !0 && B.instanceColor === null || B.isInstancedMesh && Se.instancingColor === !1 && B.instanceColor !== null || B.isInstancedMesh && Se.instancingMorph === !0 && B.morphTexture === null || B.isInstancedMesh && Se.instancingMorph === !1 && B.morphTexture !== null || Se.envMap !== ye || k.fog === !0 && Se.fog !== oe || Se.numClippingPlanes !== void 0 && (Se.numClippingPlanes !== ee.numPlanes || Se.numIntersection !== ee.numIntersection) || Se.vertexAlphas !== Ie || Se.vertexTangents !== ke || Se.morphTargets !== be || Se.morphNormals !== Qe || Se.morphColors !== ft || Se.toneMapping !== ht || Se.morphTargetsCount !== Ct) && (Ye = !0) : (Ye = !0, Se.__version = k.version); let Kt = Se.currentProgram; Ye === !0 && (Kt = Is(k, N, B)); let cn = !1, Qn = !1, pi = !1; const nt = Kt.getUniforms(), At = Se.uniforms; if (Me.useProgram(Kt.program) && (cn = !0, Qn = !0, pi = !0), k.id !== G && (G = k.id, Qn = !0), cn || z !== S) { Me.buffers.depth.getReversed() && S.reversedDepth !== !0 && (S._reversedDepth = !0, S.updateProjectionMatrix()), nt.setValue(P, "projectionMatrix", S.projectionMatrix), nt.setValue(P, "viewMatrix", S.matrixWorldInverse); const Vn = nt.map.cameraPosition; Vn !== void 0 && Vn.setValue(P, Xe.setFromMatrixPosition(S.matrixWorld)), st.logarithmicDepthBuffer && nt.setValue(P, "logDepthBufFC", 2 / (Math.log(S.far + 1) / Math.LN2)), (k.isMeshPhongMaterial || k.isMeshToonMaterial || k.isMeshLambertMaterial || k.isMeshBasicMaterial || k.isMeshStandardMaterial || k.isShaderMaterial) && nt.setValue(P, "isOrthographic", S.isOrthographicCamera === !0), z !== S && (z = S, Qn = !0, pi = !0) } if (Se.needsLights && (zt.state.directionalShadowMap.length > 0 && nt.setValue(P, "directionalShadowMap", zt.state.directionalShadowMap, D), zt.state.spotShadowMap.length > 0 && nt.setValue(P, "spotShadowMap", zt.state.spotShadowMap, D), zt.state.pointShadowMap.length > 0 && nt.setValue(P, "pointShadowMap", zt.state.pointShadowMap, D)), B.isSkinnedMesh) { nt.setOptional(P, B, "bindMatrix"), nt.setOptional(P, B, "bindMatrixInverse"); const yt = B.skeleton; yt && (yt.boneTexture === null && yt.computeBoneTexture(), nt.setValue(P, "boneTexture", yt.boneTexture, D)) } B.isBatchedMesh && (nt.setOptional(P, B, "batchingTexture"), nt.setValue(P, "batchingTexture", B._matricesTexture, D), nt.setOptional(P, B, "batchingIdTexture"), nt.setValue(P, "batchingIdTexture", B._indirectTexture, D), nt.setOptional(P, B, "batchingColorTexture"), B._colorsTexture !== null && nt.setValue(P, "batchingColorTexture", B._colorsTexture, D)); const kn = H.morphAttributes; if ((kn.position !== void 0 || kn.normal !== void 0 || kn.color !== void 0) && he.update(B, H, Kt), (Qn || Se.receiveShadow !== B.receiveShadow) && (Se.receiveShadow = B.receiveShadow, nt.setValue(P, "receiveShadow", B.receiveShadow)), (k.isMeshStandardMaterial || k.isMeshLambertMaterial || k.isMeshPhongMaterial) && k.envMap === null && N.environment !== null && (At.envMapIntensity.value = N.environmentIntensity), At.dfgLUT !== void 0 && (At.dfgLUT.value = F_()), Qn && (nt.setValue(P, "toneMappingExposure", b.toneMappingExposure), Se.needsLights && vh(At, pi), oe && k.fog === !0 && Te.refreshFogUniforms(At, oe), Te.refreshMaterialUniforms(At, k, Fe, ue, w.state.transmissionRenderTarget[S.id]), mr.upload(P, Zo(Se), At, D)), k.isShaderMaterial && k.uniformsNeedUpdate === !0 && (mr.upload(P, Zo(Se), At, D), k.uniformsNeedUpdate = !1), k.isSpriteMaterial && nt.setValue(P, "center", B.center), nt.setValue(P, "modelViewMatrix", B.modelViewMatrix), nt.setValue(P, "normalMatrix", B.normalMatrix), nt.setValue(P, "modelMatrix", B.matrixWorld), k.isShaderMaterial || k.isRawShaderMaterial) { const yt = k.uniformsGroups; for (let Vn = 0, mi = yt.length; Vn < mi; Vn++) { const Qo = yt[Vn]; fe.update(Qo, Kt), fe.bind(Qo, Kt) } } return Kt } function vh(S, N) { S.ambientLightColor.needsUpdate = N, S.lightProbe.needsUpdate = N, S.directionalLights.needsUpdate = N, S.directionalLightShadows.needsUpdate = N, S.pointLights.needsUpdate = N, S.pointLightShadows.needsUpdate = N, S.spotLights.needsUpdate = N, S.spotLightShadows.needsUpdate = N, S.rectAreaLights.needsUpdate = N, S.hemisphereLights.needsUpdate = N } function Mh(S) { return S.isMeshLambertMaterial || S.isMeshToonMaterial || S.isMeshPhongMaterial || S.isMeshStandardMaterial || S.isShadowMaterial || S.isShaderMaterial && S.lights === !0 } this.getActiveCubeFace = function () { return R }, this.getActiveMipmapLevel = function () { return U }, this.getRenderTarget = function () { return O }, this.setRenderTargetTextures = function (S, N, H) { const k = _.get(S); k.__autoAllocateDepthBuffer = S.resolveDepthBuffer === !1, k.__autoAllocateDepthBuffer === !1 && (k.__useRenderToTexture = !1), _.get(S.texture).__webglTexture = N, _.get(S.depthTexture).__webglTexture = k.__autoAllocateDepthBuffer ? void 0 : H, k.__hasExternalTextures = !0 }, this.setRenderTargetFramebuffer = function (S, N) { const H = _.get(S); H.__webglFramebuffer = N, H.__useDefaultFramebuffer = N === void 0 }; const Sh = P.createFramebuffer(); this.setRenderTarget = function (S, N = 0, H = 0) { O = S, R = N, U = H; let k = null, B = !1, oe = !1; if (S) { const le = _.get(S); if (le.__useDefaultFramebuffer !== void 0) { Me.bindFramebuffer(P.FRAMEBUFFER, le.__webglFramebuffer), V.copy(S.viewport), F.copy(S.scissor), Q = S.scissorTest, Me.viewport(V), Me.scissor(F), Me.setScissorTest(Q), G = -1; return } else if (le.__webglFramebuffer === void 0) D.setupRenderTarget(S); else if (le.__hasExternalTextures) D.rebindTextures(S, _.get(S.texture).__webglTexture, _.get(S.depthTexture).__webglTexture); else if (S.depthBuffer) { const Ie = S.depthTexture; if (le.__boundDepthTexture !== Ie) { if (Ie !== null && _.has(Ie) && (S.width !== Ie.image.width || S.height !== Ie.image.height)) throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size."); D.setupDepthRenderbuffer(S) } } const ve = S.texture; (ve.isData3DTexture || ve.isDataArrayTexture || ve.isCompressedArrayTexture) && (oe = !0); const ye = _.get(S).__webglFramebuffer; S.isWebGLCubeRenderTarget ? (Array.isArray(ye[N]) ? k = ye[N][H] : k = ye[N], B = !0) : S.samples > 0 && D.useMultisampledRTT(S) === !1 ? k = _.get(S).__webglMultisampledFramebuffer : Array.isArray(ye) ? k = ye[H] : k = ye, V.copy(S.viewport), F.copy(S.scissor), Q = S.scissorTest } else V.copy($).multiplyScalar(Fe).floor(), F.copy(ne).multiplyScalar(Fe).floor(), Q = re; if (H !== 0 && (k = Sh), Me.bindFramebuffer(P.FRAMEBUFFER, k) && Me.drawBuffers(S, k), Me.viewport(V), Me.scissor(F), Me.setScissorTest(Q), B) { const le = _.get(S.texture); P.framebufferTexture2D(P.FRAMEBUFFER, P.COLOR_ATTACHMENT0, P.TEXTURE_CUBE_MAP_POSITIVE_X + N, le.__webglTexture, H) } else if (oe) { const le = N; for (let ve = 0; ve < S.textures.length; ve++) { const ye = _.get(S.textures[ve]); P.framebufferTextureLayer(P.FRAMEBUFFER, P.COLOR_ATTACHMENT0 + ve, ye.__webglTexture, H, le) } } else if (S !== null && H !== 0) { const le = _.get(S.texture); P.framebufferTexture2D(P.FRAMEBUFFER, P.COLOR_ATTACHMENT0, P.TEXTURE_2D, le.__webglTexture, H) } G = -1 }, this.readRenderTargetPixels = function (S, N, H, k, B, oe, de, le = 0) { if (!(S && S.isWebGLRenderTarget)) { Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget."); return } let ve = _.get(S).__webglFramebuffer; if (S.isWebGLCubeRenderTarget && de !== void 0 && (ve = ve[de]), ve) { Me.bindFramebuffer(P.FRAMEBUFFER, ve); try { const ye = S.textures[le], Ie = ye.format, ke = ye.type; if (S.textures.length > 1 && P.readBuffer(P.COLOR_ATTACHMENT0 + le), !st.textureFormatReadable(Ie)) { Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format."); return } if (!st.textureTypeReadable(ke)) { Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type."); return } N >= 0 && N <= S.width - k && H >= 0 && H <= S.height - B && P.readPixels(N, H, k, B, se.convert(Ie), se.convert(ke), oe) } finally { const ye = O !== null ? _.get(O).__webglFramebuffer : null; Me.bindFramebuffer(P.FRAMEBUFFER, ye) } } }, this.readRenderTargetPixelsAsync = async function (S, N, H, k, B, oe, de, le = 0) { if (!(S && S.isWebGLRenderTarget)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget."); let ve = _.get(S).__webglFramebuffer; if (S.isWebGLCubeRenderTarget && de !== void 0 && (ve = ve[de]), ve) if (N >= 0 && N <= S.width - k && H >= 0 && H <= S.height - B) { Me.bindFramebuffer(P.FRAMEBUFFER, ve); const ye = S.textures[le], Ie = ye.format, ke = ye.type; if (S.textures.length > 1 && P.readBuffer(P.COLOR_ATTACHMENT0 + le), !st.textureFormatReadable(Ie)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format."); if (!st.textureTypeReadable(ke)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type."); const be = P.createBuffer(); P.bindBuffer(P.PIXEL_PACK_BUFFER, be), P.bufferData(P.PIXEL_PACK_BUFFER, oe.byteLength, P.STREAM_READ), P.readPixels(N, H, k, B, se.convert(Ie), se.convert(ke), 0); const Qe = O !== null ? _.get(O).__webglFramebuffer : null; Me.bindFramebuffer(P.FRAMEBUFFER, Qe); const ft = P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE, 0); return P.flush(), await ou(P, ft, 4), P.bindBuffer(P.PIXEL_PACK_BUFFER, be), P.getBufferSubData(P.PIXEL_PACK_BUFFER, 0, oe), P.deleteBuffer(be), P.deleteSync(ft), oe } else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.") }, this.copyFramebufferToTexture = function (S, N = null, H = 0) { const k = Math.pow(2, -H), B = Math.floor(S.image.width * k), oe = Math.floor(S.image.height * k), de = N !== null ? N.x : 0, le = N !== null ? N.y : 0; D.setTexture2D(S, 0), P.copyTexSubImage2D(P.TEXTURE_2D, H, 0, 0, de, le, B, oe), Me.unbindTexture() }; const yh = P.createFramebuffer(), bh = P.createFramebuffer(); this.copyTextureToTexture = function (S, N, H = null, k = null, B = 0, oe = 0) { let de, le, ve, ye, Ie, ke, be, Qe, ft; const ht = S.isCompressedTexture ? S.mipmaps[oe] : S.image; if (H !== null) de = H.max.x - H.min.x, le = H.max.y - H.min.y, ve = H.isBox3 ? H.max.z - H.min.z : 1, ye = H.min.x, Ie = H.min.y, ke = H.isBox3 ? H.min.z : 0; else { const At = Math.pow(2, -B); de = Math.floor(ht.width * At), le = Math.floor(ht.height * At), S.isDataArrayTexture ? ve = ht.depth : S.isData3DTexture ? ve = Math.floor(ht.depth * At) : ve = 1, ye = 0, Ie = 0, ke = 0 } k !== null ? (be = k.x, Qe = k.y, ft = k.z) : (be = 0, Qe = 0, ft = 0); const et = se.convert(N.format), Ct = se.convert(N.type); let Se; N.isData3DTexture ? (D.setTexture3D(N, 0), Se = P.TEXTURE_3D) : N.isDataArrayTexture || N.isCompressedArrayTexture ? (D.setTexture2DArray(N, 0), Se = P.TEXTURE_2D_ARRAY) : (D.setTexture2D(N, 0), Se = P.TEXTURE_2D), P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL, N.flipY), P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL, N.premultiplyAlpha), P.pixelStorei(P.UNPACK_ALIGNMENT, N.unpackAlignment); const zt = P.getParameter(P.UNPACK_ROW_LENGTH), Ye = P.getParameter(P.UNPACK_IMAGE_HEIGHT), Kt = P.getParameter(P.UNPACK_SKIP_PIXELS), cn = P.getParameter(P.UNPACK_SKIP_ROWS), Qn = P.getParameter(P.UNPACK_SKIP_IMAGES); P.pixelStorei(P.UNPACK_ROW_LENGTH, ht.width), P.pixelStorei(P.UNPACK_IMAGE_HEIGHT, ht.height), P.pixelStorei(P.UNPACK_SKIP_PIXELS, ye), P.pixelStorei(P.UNPACK_SKIP_ROWS, Ie), P.pixelStorei(P.UNPACK_SKIP_IMAGES, ke); const pi = S.isDataArrayTexture || S.isData3DTexture, nt = N.isDataArrayTexture || N.isData3DTexture; if (S.isDepthTexture) { const At = _.get(S), kn = _.get(N), yt = _.get(At.__renderTarget), Vn = _.get(kn.__renderTarget); Me.bindFramebuffer(P.READ_FRAMEBUFFER, yt.__webglFramebuffer), Me.bindFramebuffer(P.DRAW_FRAMEBUFFER, Vn.__webglFramebuffer); for (let mi = 0; mi < ve; mi++)pi && (P.framebufferTextureLayer(P.READ_FRAMEBUFFER, P.COLOR_ATTACHMENT0, _.get(S).__webglTexture, B, ke + mi), P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER, P.COLOR_ATTACHMENT0, _.get(N).__webglTexture, oe, ft + mi)), P.blitFramebuffer(ye, Ie, de, le, be, Qe, de, le, P.DEPTH_BUFFER_BIT, P.NEAREST); Me.bindFramebuffer(P.READ_FRAMEBUFFER, null), Me.bindFramebuffer(P.DRAW_FRAMEBUFFER, null) } else if (B !== 0 || S.isRenderTargetTexture || _.has(S)) { const At = _.get(S), kn = _.get(N); Me.bindFramebuffer(P.READ_FRAMEBUFFER, yh), Me.bindFramebuffer(P.DRAW_FRAMEBUFFER, bh); for (let yt = 0; yt < ve; yt++)pi ? P.framebufferTextureLayer(P.READ_FRAMEBUFFER, P.COLOR_ATTACHMENT0, At.__webglTexture, B, ke + yt) : P.framebufferTexture2D(P.READ_FRAMEBUFFER, P.COLOR_ATTACHMENT0, P.TEXTURE_2D, At.__webglTexture, B), nt ? P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER, P.COLOR_ATTACHMENT0, kn.__webglTexture, oe, ft + yt) : P.framebufferTexture2D(P.DRAW_FRAMEBUFFER, P.COLOR_ATTACHMENT0, P.TEXTURE_2D, kn.__webglTexture, oe), B !== 0 ? P.blitFramebuffer(ye, Ie, de, le, be, Qe, de, le, P.COLOR_BUFFER_BIT, P.NEAREST) : nt ? P.copyTexSubImage3D(Se, oe, be, Qe, ft + yt, ye, Ie, de, le) : P.copyTexSubImage2D(Se, oe, be, Qe, ye, Ie, de, le); Me.bindFramebuffer(P.READ_FRAMEBUFFER, null), Me.bindFramebuffer(P.DRAW_FRAMEBUFFER, null) } else nt ? S.isDataTexture || S.isData3DTexture ? P.texSubImage3D(Se, oe, be, Qe, ft, de, le, ve, et, Ct, ht.data) : N.isCompressedArrayTexture ? P.compressedTexSubImage3D(Se, oe, be, Qe, ft, de, le, ve, et, ht.data) : P.texSubImage3D(Se, oe, be, Qe, ft, de, le, ve, et, Ct, ht) : S.isDataTexture ? P.texSubImage2D(P.TEXTURE_2D, oe, be, Qe, de, le, et, Ct, ht.data) : S.isCompressedTexture ? P.compressedTexSubImage2D(P.TEXTURE_2D, oe, be, Qe, ht.width, ht.height, et, ht.data) : P.texSubImage2D(P.TEXTURE_2D, oe, be, Qe, de, le, et, Ct, ht); P.pixelStorei(P.UNPACK_ROW_LENGTH, zt), P.pixelStorei(P.UNPACK_IMAGE_HEIGHT, Ye), P.pixelStorei(P.UNPACK_SKIP_PIXELS, Kt), P.pixelStorei(P.UNPACK_SKIP_ROWS, cn), P.pixelStorei(P.UNPACK_SKIP_IMAGES, Qn), oe === 0 && N.generateMipmaps && P.generateMipmap(Se), Me.unbindTexture() }, this.initRenderTarget = function (S) { _.get(S).__webglFramebuffer === void 0 && D.setupRenderTarget(S) }, this.initTexture = function (S) { S.isCubeTexture ? D.setTextureCube(S, 0) : S.isData3DTexture ? D.setTexture3D(S, 0) : S.isDataArrayTexture || S.isCompressedArrayTexture ? D.setTexture2DArray(S, 0) : D.setTexture2D(S, 0), Me.unbindTexture() }, this.resetState = function () { R = 0, U = 0, O = null, Me.reset(), te.reset() }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this })) } get coordinateSystem() { return mn } get outputColorSpace() { return this._outputColorSpace } set outputColorSpace(e) { this._outputColorSpace = e; const t = this.getContext(); t.drawingBufferColorSpace = We._getDrawingBufferColorSpace(e), t.unpackColorSpace = We._getUnpackColorSpace() } } var ms = function () { var s = 0, e = document.createElement("div"); e.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000", e.addEventListener("click", function (h) { h.preventDefault(), n(++s % e.children.length) }, !1); function t(h) { return e.appendChild(h.dom), h } function n(h) { for (var d = 0; d < e.children.length; d++)e.children[d].style.display = d === h ? "block" : "none"; s = h } var i = (performance || Date).now(), r = i, a = 0, o = t(new ms.Panel("FPS", "#0ff", "#002")), l = t(new ms.Panel("MS", "#0f0", "#020")); if (self.performance && self.performance.memory) var c = t(new ms.Panel("MB", "#f08", "#201")); return n(0), { REVISION: 16, dom: e, addPanel: t, showPanel: n, begin: function () { i = (performance || Date).now() }, end: function () { a++; var h = (performance || Date).now(); if (l.update(h - i, 200), h >= r + 1e3 && (o.update(a * 1e3 / (h - r), 100), r = h, a = 0, c)) { var d = performance.memory; c.update(d.usedJSHeapSize / 1048576, d.jsHeapSizeLimit / 1048576) } return h }, update: function () { i = this.end() }, domElement: e, setMode: n } }; ms.Panel = function (s, e, t) { var n = 1 / 0, i = 0, r = Math.round, a = r(window.devicePixelRatio || 1), o = 80 * a, l = 48 * a, c = 3 * a, h = 2 * a, d = 3 * a, u = 15 * a, f = 74 * a, g = 30 * a, v = document.createElement("canvas"); v.width = o, v.height = l, v.style.cssText = "width:80px;height:48px"; var m = v.getContext("2d"); return m.font = "bold " + 9 * a + "px Helvetica,Arial,sans-serif", m.textBaseline = "top", m.fillStyle = t, m.fillRect(0, 0, o, l), m.fillStyle = e, m.fillText(s, c, h), m.fillRect(d, u, f, g), m.fillStyle = t, m.globalAlpha = .9, m.fillRect(d, u, f, g), { dom: v, update: function (p, M) { n = Math.min(n, p), i = Math.max(i, p), m.fillStyle = t, m.globalAlpha = 1, m.fillRect(0, 0, o, u), m.fillStyle = e, m.fillText(r(p) + " " + s + " (" + r(n) + "-" + r(i) + ")", c, h), m.drawImage(v, d + a, u, f - a, g, d, u, f - a, g), m.fillRect(d + f - a, u, a, g), m.fillStyle = t, m.globalAlpha = .9, m.fillRect(d + f - a, u, a, r((1 - p / M) * g)) } } }; const it = { car: { body: "fennec", rotationSpeed: { x: 21, y: 21, z: 34 }, airDragCoefficient: { x: .975, y: .975, z: .962 }, maxRotationSpeed: { x: 5.55, y: 5.55, z: 5.55 }, torusBaseScale: 1 }, camera: { fov: 90, distance: 3.8, height: 2 }, ball: { hitWindowDuration: 1, chaseTimeout: 2, scale: 1, timeout: !1, randomizerPreset: "default" }, world: { gameSpeed: 1 } }; function xc(s, e) { if (e === Kh) return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), s; if (e === oo || e === Hc) { let t = s.getIndex(); if (t === null) { const a = [], o = s.getAttribute("position"); if (o !== void 0) { for (let l = 0; l < o.count; l++)a.push(l); s.setIndex(a), t = s.getIndex() } else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), s } const n = t.count - 2, i = []; if (e === oo) for (let a = 1; a <= n; a++)i.push(t.getX(0)), i.push(t.getX(a)), i.push(t.getX(a + 1)); else for (let a = 0; a < n; a++)a % 2 === 0 ? (i.push(t.getX(a)), i.push(t.getX(a + 1)), i.push(t.getX(a + 2))) : (i.push(t.getX(a + 2)), i.push(t.getX(a + 1)), i.push(t.getX(a))); i.length / 3 !== n && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."); const r = s.clone(); return r.setIndex(i), r.clearGroups(), r } else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", e), s } function B_(s) { const e = new Map, t = new Map, n = s.clone(); return uh(s, n, function (i, r) { e.set(r, i), t.set(i, r) }), n.traverse(function (i) { if (!i.isSkinnedMesh) return; const r = i, a = e.get(i), o = a.skeleton.bones; r.skeleton = a.skeleton.clone(), r.bindMatrix.copy(a.bindMatrix), r.skeleton.bones = o.map(function (l) { return t.get(l) }), r.bind(r.skeleton, r.bindMatrix) }), n } function uh(s, e, t) { t(s, e); for (let n = 0; n < s.children.length; n++)uh(s.children[n], e.children[n], t) } class dh extends Ki { constructor(e) { super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function (t) { return new G_(t) }), this.register(function (t) { return new W_(t) }), this.register(function (t) { return new Q_(t) }), this.register(function (t) { return new e0(t) }), this.register(function (t) { return new t0(t) }), this.register(function (t) { return new Y_(t) }), this.register(function (t) { return new q_(t) }), this.register(function (t) { return new $_(t) }), this.register(function (t) { return new K_(t) }), this.register(function (t) { return new H_(t) }), this.register(function (t) { return new j_(t) }), this.register(function (t) { return new X_(t) }), this.register(function (t) { return new J_(t) }), this.register(function (t) { return new Z_(t) }), this.register(function (t) { return new k_(t) }), this.register(function (t) { return new vc(t, Ve.EXT_MESHOPT_COMPRESSION) }), this.register(function (t) { return new vc(t, Ve.KHR_MESHOPT_COMPRESSION) }), this.register(function (t) { return new n0(t) }) } load(e, t, n, i) { const r = this; let a; if (this.resourcePath !== "") a = this.resourcePath; else if (this.path !== "") { const c = ps.extractUrlBase(e); a = ps.resolveURL(c, this.path) } else a = ps.extractUrlBase(e); this.manager.itemStart(e); const o = function (c) { i ? i(c) : console.error(c), r.manager.itemError(e), r.manager.itemEnd(e) }, l = new nh(this.manager); l.setPath(this.path), l.setResponseType("arraybuffer"), l.setRequestHeader(this.requestHeader), l.setWithCredentials(this.withCredentials), l.load(e, function (c) { try { r.parse(c, a, function (h) { t(h), r.manager.itemEnd(e) }, o) } catch (h) { o(h) } }, n, o) } setDRACOLoader(e) { return this.dracoLoader = e, this } setKTX2Loader(e) { return this.ktx2Loader = e, this } setMeshoptDecoder(e) { return this.meshoptDecoder = e, this } register(e) { return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this } unregister(e) { return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this } parse(e, t, n, i) { let r; const a = {}, o = {}, l = new TextDecoder; if (typeof e == "string") r = JSON.parse(e); else if (e instanceof ArrayBuffer) if (l.decode(new Uint8Array(e, 0, 4)) === fh) { try { a[Ve.KHR_BINARY_GLTF] = new i0(e) } catch (d) { i && i(d); return } r = JSON.parse(a[Ve.KHR_BINARY_GLTF].content) } else r = JSON.parse(l.decode(e)); else r = e; if (r.asset === void 0 || r.asset.version[0] < 2) { i && i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.")); return } const c = new g0(r, { path: t || this.resourcePath || "", crossOrigin: this.crossOrigin, requestHeader: this.requestHeader, manager: this.manager, ktx2Loader: this.ktx2Loader, meshoptDecoder: this.meshoptDecoder }); c.fileLoader.setRequestHeader(this.requestHeader); for (let h = 0; h < this.pluginCallbacks.length; h++) { const d = this.pluginCallbacks[h](c); d.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), o[d.name] = d, a[d.name] = !0 } if (r.extensionsUsed) for (let h = 0; h < r.extensionsUsed.length; ++h) { const d = r.extensionsUsed[h], u = r.extensionsRequired || []; switch (d) { case Ve.KHR_MATERIALS_UNLIT: a[d] = new V_; break; case Ve.KHR_DRACO_MESH_COMPRESSION: a[d] = new s0(r, this.dracoLoader); break; case Ve.KHR_TEXTURE_TRANSFORM: a[d] = new r0; break; case Ve.KHR_MESH_QUANTIZATION: a[d] = new a0; break; default: u.indexOf(d) >= 0 && o[d] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + d + '".') } } c.setExtensions(a), c.setPlugins(o), c.parse(n, i) } parseAsync(e, t) { const n = this; return new Promise(function (i, r) { n.parse(e, t, i, r) }) } } function z_() { let s = {}; return { get: function (e) { return s[e] }, add: function (e, t) { s[e] = t }, remove: function (e) { delete s[e] }, removeAll: function () { s = {} } } } function pt(s, e, t) { const n = s.json.materials[e]; return n.extensions && n.extensions[t] ? n.extensions[t] : null } const Ve = { KHR_BINARY_GLTF: "KHR_binary_glTF", KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression", KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual", KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat", KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion", KHR_MATERIALS_IOR: "KHR_materials_ior", KHR_MATERIALS_SHEEN: "KHR_materials_sheen", KHR_MATERIALS_SPECULAR: "KHR_materials_specular", KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission", KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence", KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy", KHR_MATERIALS_UNLIT: "KHR_materials_unlit", KHR_MATERIALS_VOLUME: "KHR_materials_volume", KHR_TEXTURE_BASISU: "KHR_texture_basisu", KHR_TEXTURE_TRANSFORM: "KHR_texture_transform", KHR_MESH_QUANTIZATION: "KHR_mesh_quantization", KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength", EXT_MATERIALS_BUMP: "EXT_materials_bump", EXT_TEXTURE_WEBP: "EXT_texture_webp", EXT_TEXTURE_AVIF: "EXT_texture_avif", EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression", KHR_MESHOPT_COMPRESSION: "KHR_meshopt_compression", EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing" }; class k_ { constructor(e) { this.parser = e, this.name = Ve.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} } } _markDefs() { const e = this.parser, t = this.parser.json.nodes || []; for (let n = 0, i = t.length; n < i; n++) { const r = t[n]; r.extensions && r.extensions[this.name] && r.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, r.extensions[this.name].light) } } _loadLight(e) { const t = this.parser, n = "light:" + e; let i = t.cache.get(n); if (i) return i; const r = t.json, l = ((r.extensions && r.extensions[this.name] || {}).lights || [])[e]; let c; const h = new Ae(16777215); l.color !== void 0 && h.setRGB(l.color[0], l.color[1], l.color[2], Ot); const d = l.range !== void 0 ? l.range : 0; switch (l.type) { case "directional": c = new pr(h), c.target.position.set(0, 0, -1), c.add(c.target); break; case "point": c = new wd(h), c.distance = d; break; case "spot": c = new Td(h), c.distance = d, l.spot = l.spot || {}, l.spot.innerConeAngle = l.spot.innerConeAngle !== void 0 ? l.spot.innerConeAngle : 0, l.spot.outerConeAngle = l.spot.outerConeAngle !== void 0 ? l.spot.outerConeAngle : Math.PI / 4, c.angle = l.spot.outerConeAngle, c.penumbra = 1 - l.spot.innerConeAngle / l.spot.outerConeAngle, c.target.position.set(0, 0, -1), c.add(c.target); break; default: throw new Error("THREE.GLTFLoader: Unexpected light type: " + l.type) }return c.position.set(0, 0, 0), dn(c, l), l.intensity !== void 0 && (c.intensity = l.intensity), c.name = t.createUniqueName(l.name || "light_" + e), i = Promise.resolve(c), t.cache.add(n, i), i } getDependency(e, t) { if (e === "light") return this._loadLight(t) } createNodeAttachment(e) { const t = this, n = this.parser, r = n.json.nodes[e], o = (r.extensions && r.extensions[this.name] || {}).light; return o === void 0 ? null : this._loadLight(o).then(function (l) { return n._getNodeRef(t.cache, o, l) }) } } class V_ { constructor() { this.name = Ve.KHR_MATERIALS_UNLIT } getMaterialType() { return nn } extendParams(e, t, n) { const i = []; e.color = new Ae(1, 1, 1), e.opacity = 1; const r = t.pbrMetallicRoughness; if (r) { if (Array.isArray(r.baseColorFactor)) { const a = r.baseColorFactor; e.color.setRGB(a[0], a[1], a[2], Ot), e.opacity = a[3] } r.baseColorTexture !== void 0 && i.push(n.assignTexture(e, "map", r.baseColorTexture, wt)) } return Promise.all(i) } } class H_ { constructor(e) { this.parser = e, this.name = Ve.KHR_MATERIALS_EMISSIVE_STRENGTH } extendMaterialParams(e, t) { const n = pt(this.parser, e, this.name); return n === null || n.emissiveStrength !== void 0 && (t.emissiveIntensity = n.emissiveStrength), Promise.resolve() } } class G_ { constructor(e) { this.parser = e, this.name = Ve.KHR_MATERIALS_CLEARCOAT } getMaterialType(e) { return pt(this.parser, e, this.name) !== null ? Sn : null } extendMaterialParams(e, t) { const n = pt(this.parser, e, this.name); if (n === null) return Promise.resolve(); const i = []; if (n.clearcoatFactor !== void 0 && (t.clearcoat = n.clearcoatFactor), n.clearcoatTexture !== void 0 && i.push(this.parser.assignTexture(t, "clearcoatMap", n.clearcoatTexture)), n.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = n.clearcoatRoughnessFactor), n.clearcoatRoughnessTexture !== void 0 && i.push(this.parser.assignTexture(t, "clearcoatRoughnessMap", n.clearcoatRoughnessTexture)), n.clearcoatNormalTexture !== void 0 && (i.push(this.parser.assignTexture(t, "clearcoatNormalMap", n.clearcoatNormalTexture)), n.clearcoatNormalTexture.scale !== void 0)) { const r = n.clearcoatNormalTexture.scale; t.clearcoatNormalScale = new Ge(r, r) } return Promise.all(i) } } class W_ { constructor(e) { this.parser = e, this.name = Ve.KHR_MATERIALS_DISPERSION } getMaterialType(e) { return pt(this.parser, e, this.name) !== null ? Sn : null } extendMaterialParams(e, t) { const n = pt(this.parser, e, this.name); return n === null || (t.dispersion = n.dispersion !== void 0 ? n.dispersion : 0), Promise.resolve() } } class X_ { constructor(e) { this.parser = e, this.name = Ve.KHR_MATERIALS_IRIDESCENCE } getMaterialType(e) { return pt(this.parser, e, this.name) !== null ? Sn : null } extendMaterialParams(e, t) { const n = pt(this.parser, e, this.name); if (n === null) return Promise.resolve(); const i = []; return n.iridescenceFactor !== void 0 && (t.iridescence = n.iridescenceFactor), n.iridescenceTexture !== void 0 && i.push(this.parser.assignTexture(t, "iridescenceMap", n.iridescenceTexture)), n.iridescenceIor !== void 0 && (t.iridescenceIOR = n.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), n.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = n.iridescenceThicknessMinimum), n.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = n.iridescenceThicknessMaximum), n.iridescenceThicknessTexture !== void 0 && i.push(this.parser.assignTexture(t, "iridescenceThicknessMap", n.iridescenceThicknessTexture)), Promise.all(i) } } class Y_ { constructor(e) { this.parser = e, this.name = Ve.KHR_MATERIALS_SHEEN } getMaterialType(e) { return pt(this.parser, e, this.name) !== null ? Sn : null } extendMaterialParams(e, t) { const n = pt(this.parser, e, this.name); if (n === null) return Promise.resolve(); const i = []; if (t.sheenColor = new Ae(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1, n.sheenColorFactor !== void 0) { const r = n.sheenColorFactor; t.sheenColor.setRGB(r[0], r[1], r[2], Ot) } return n.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = n.sheenRoughnessFactor), n.sheenColorTexture !== void 0 && i.push(this.parser.assignTexture(t, "sheenColorMap", n.sheenColorTexture, wt)), n.sheenRoughnessTexture !== void 0 && i.push(this.parser.assignTexture(t, "sheenRoughnessMap", n.sheenRoughnessTexture)), Promise.all(i) } } class q_ { constructor(e) { this.parser = e, this.name = Ve.KHR_MATERIALS_TRANSMISSION } getMaterialType(e) { return pt(this.parser, e, this.name) !== null ? Sn : null } extendMaterialParams(e, t) { const n = pt(this.parser, e, this.name); if (n === null) return Promise.resolve(); const i = []; return n.transmissionFactor !== void 0 && (t.transmission = n.transmissionFactor), n.transmissionTexture !== void 0 && i.push(this.parser.assignTexture(t, "transmissionMap", n.transmissionTexture)), Promise.all(i) } } class $_ { constructor(e) { this.parser = e, this.name = Ve.KHR_MATERIALS_VOLUME } getMaterialType(e) { return pt(this.parser, e, this.name) !== null ? Sn : null } extendMaterialParams(e, t) { const n = pt(this.parser, e, this.name); if (n === null) return Promise.resolve(); const i = []; t.thickness = n.thicknessFactor !== void 0 ? n.thicknessFactor : 0, n.thicknessTexture !== void 0 && i.push(this.parser.assignTexture(t, "thicknessMap", n.thicknessTexture)), t.attenuationDistance = n.attenuationDistance || 1 / 0; const r = n.attenuationColor || [1, 1, 1]; return t.attenuationColor = new Ae().setRGB(r[0], r[1], r[2], Ot), Promise.all(i) } } class K_ { constructor(e) { this.parser = e, this.name = Ve.KHR_MATERIALS_IOR } getMaterialType(e) { return pt(this.parser, e, this.name) !== null ? Sn : null } extendMaterialParams(e, t) { const n = pt(this.parser, e, this.name); return n === null || (t.ior = n.ior !== void 0 ? n.ior : 1.5), Promise.resolve() } } class j_ { constructor(e) { this.parser = e, this.name = Ve.KHR_MATERIALS_SPECULAR } getMaterialType(e) { return pt(this.parser, e, this.name) !== null ? Sn : null } extendMaterialParams(e, t) { const n = pt(this.parser, e, this.name); if (n === null) return Promise.resolve(); const i = []; t.specularIntensity = n.specularFactor !== void 0 ? n.specularFactor : 1, n.specularTexture !== void 0 && i.push(this.parser.assignTexture(t, "specularIntensityMap", n.specularTexture)); const r = n.specularColorFactor || [1, 1, 1]; return t.specularColor = new Ae().setRGB(r[0], r[1], r[2], Ot), n.specularColorTexture !== void 0 && i.push(this.parser.assignTexture(t, "specularColorMap", n.specularColorTexture, wt)), Promise.all(i) } } class Z_ { constructor(e) { this.parser = e, this.name = Ve.EXT_MATERIALS_BUMP } getMaterialType(e) { return pt(this.parser, e, this.name) !== null ? Sn : null } extendMaterialParams(e, t) { const n = pt(this.parser, e, this.name); if (n === null) return Promise.resolve(); const i = []; return t.bumpScale = n.bumpFactor !== void 0 ? n.bumpFactor : 1, n.bumpTexture !== void 0 && i.push(this.parser.assignTexture(t, "bumpMap", n.bumpTexture)), Promise.all(i) } } class J_ { constructor(e) { this.parser = e, this.name = Ve.KHR_MATERIALS_ANISOTROPY } getMaterialType(e) { return pt(this.parser, e, this.name) !== null ? Sn : null } extendMaterialParams(e, t) { const n = pt(this.parser, e, this.name); if (n === null) return Promise.resolve(); const i = []; return n.anisotropyStrength !== void 0 && (t.anisotropy = n.anisotropyStrength), n.anisotropyRotation !== void 0 && (t.anisotropyRotation = n.anisotropyRotation), n.anisotropyTexture !== void 0 && i.push(this.parser.assignTexture(t, "anisotropyMap", n.anisotropyTexture)), Promise.all(i) } } class Q_ { constructor(e) { this.parser = e, this.name = Ve.KHR_TEXTURE_BASISU } loadTexture(e) { const t = this.parser, n = t.json, i = n.textures[e]; if (!i.extensions || !i.extensions[this.name]) return null; const r = i.extensions[this.name], a = t.options.ktx2Loader; if (!a) { if (n.extensionsRequired && n.extensionsRequired.indexOf(this.name) >= 0) throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures"); return null } return t.loadTextureImage(e, r.source, a) } } class e0 { constructor(e) { this.parser = e, this.name = Ve.EXT_TEXTURE_WEBP } loadTexture(e) { const t = this.name, n = this.parser, i = n.json, r = i.textures[e]; if (!r.extensions || !r.extensions[t]) return null; const a = r.extensions[t], o = i.images[a.source]; let l = n.textureLoader; if (o.uri) { const c = n.options.manager.getHandler(o.uri); c !== null && (l = c) } return n.loadTextureImage(e, a.source, l) } } class t0 { constructor(e) { this.parser = e, this.name = Ve.EXT_TEXTURE_AVIF } loadTexture(e) { const t = this.name, n = this.parser, i = n.json, r = i.textures[e]; if (!r.extensions || !r.extensions[t]) return null; const a = r.extensions[t], o = i.images[a.source]; let l = n.textureLoader; if (o.uri) { const c = n.options.manager.getHandler(o.uri); c !== null && (l = c) } return n.loadTextureImage(e, a.source, l) } } class vc { constructor(e, t) { this.name = t, this.parser = e } loadBufferView(e) { const t = this.parser.json, n = t.bufferViews[e]; if (n.extensions && n.extensions[this.name]) { const i = n.extensions[this.name], r = this.parser.getDependency("buffer", i.buffer), a = this.parser.options.meshoptDecoder; if (!a || !a.supported) { if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0) throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files"); return null } return r.then(function (o) { const l = i.byteOffset || 0, c = i.byteLength || 0, h = i.count, d = i.byteStride, u = new Uint8Array(o, l, c); return a.decodeGltfBufferAsync ? a.decodeGltfBufferAsync(h, d, u, i.mode, i.filter).then(function (f) { return f.buffer }) : a.ready.then(function () { const f = new ArrayBuffer(h * d); return a.decodeGltfBuffer(new Uint8Array(f), h, d, u, i.mode, i.filter), f }) }) } else return null } } class n0 { constructor(e) { this.name = Ve.EXT_MESH_GPU_INSTANCING, this.parser = e } createNodeMesh(e) { const t = this.parser.json, n = t.nodes[e]; if (!n.extensions || !n.extensions[this.name] || n.mesh === void 0) return null; const i = t.meshes[n.mesh]; for (const c of i.primitives) if (c.mode !== Wt.TRIANGLES && c.mode !== Wt.TRIANGLE_STRIP && c.mode !== Wt.TRIANGLE_FAN && c.mode !== void 0) return null; const a = n.extensions[this.name].attributes, o = [], l = {}; for (const c in a) o.push(this.parser.getDependency("accessor", a[c]).then(h => (l[c] = h, l[c]))); return o.length < 1 ? null : (o.push(this.parser.createNodeMesh(e)), Promise.all(o).then(c => { const h = c.pop(), d = h.isGroup ? h.children : [h], u = c[0].count, f = []; for (const g of d) { const v = new Ue, m = new L, p = new an, M = new L(1, 1, 1), E = new Ku(g.geometry, g.material, u); for (let y = 0; y < u; y++)l.TRANSLATION && m.fromBufferAttribute(l.TRANSLATION, y), l.ROTATION && p.fromBufferAttribute(l.ROTATION, y), l.SCALE && M.fromBufferAttribute(l.SCALE, y), E.setMatrixAt(y, v.compose(m, p, M)); for (const y in l) if (y === "_COLOR_0") { const w = l[y]; E.instanceColor = new co(w.array, w.itemSize, w.normalized) } else y !== "TRANSLATION" && y !== "ROTATION" && y !== "SCALE" && g.geometry.setAttribute(y, l[y]); ct.prototype.copy.call(E, g), this.parser.assignFinalMaterial(E), f.push(E) } return h.isGroup ? (h.clear(), h.add(...f), h) : f[0] })) } } const fh = "glTF", as = 12, Mc = { JSON: 1313821514, BIN: 5130562 }; class i0 { constructor(e) { this.name = Ve.KHR_BINARY_GLTF, this.content = null, this.body = null; const t = new DataView(e, 0, as), n = new TextDecoder; if (this.header = { magic: n.decode(new Uint8Array(e.slice(0, 4))), version: t.getUint32(4, !0), length: t.getUint32(8, !0) }, this.header.magic !== fh) throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header."); if (this.header.version < 2) throw new Error("THREE.GLTFLoader: Legacy binary file detected."); const i = this.header.length - as, r = new DataView(e, as); let a = 0; for (; a < i;) { const o = r.getUint32(a, !0); a += 4; const l = r.getUint32(a, !0); if (a += 4, l === Mc.JSON) { const c = new Uint8Array(e, as + a, o); this.content = n.decode(c) } else if (l === Mc.BIN) { const c = as + a; this.body = e.slice(c, c + o) } a += o } if (this.content === null) throw new Error("THREE.GLTFLoader: JSON content not found.") } } class s0 { constructor(e, t) { if (!t) throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided."); this.name = Ve.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload() } decodePrimitive(e, t) { const n = this.json, i = this.dracoLoader, r = e.extensions[this.name].bufferView, a = e.extensions[this.name].attributes, o = {}, l = {}, c = {}; for (const h in a) { const d = po[h] || h.toLowerCase(); o[d] = a[h] } for (const h in e.attributes) { const d = po[h] || h.toLowerCase(); if (a[h] !== void 0) { const u = n.accessors[e.attributes[h]], f = Fi[u.componentType]; c[d] = f.name, l[d] = u.normalized === !0 } } return t.getDependency("bufferView", r).then(function (h) { return new Promise(function (d, u) { i.decodeDracoFile(h, function (f) { for (const g in f.attributes) { const v = f.attributes[g], m = l[g]; m !== void 0 && (v.normalized = m) } d(f) }, o, c, Ot, u) }) }) } } class r0 { constructor() { this.name = Ve.KHR_TEXTURE_TRANSFORM } extendTexture(e, t) { return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e } } class a0 { constructor() { this.name = Ve.KHR_MESH_QUANTIZATION } } class ph extends Yi { constructor(e, t, n, i) { super(e, t, n, i) } copySampleValue_(e) { const t = this.resultBuffer, n = this.sampleValues, i = this.valueSize, r = e * i * 3 + i; for (let a = 0; a !== i; a++)t[a] = n[r + a]; return t } interpolate_(e, t, n, i) { const r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, l = o * 2, c = o * 3, h = i - t, d = (n - t) / h, u = d * d, f = u * d, g = e * c, v = g - c, m = -2 * f + 3 * u, p = f - u, M = 1 - m, E = p - u + d; for (let y = 0; y !== o; y++) { const w = a[v + y + o], A = a[v + y + l] * h, C = a[g + y + o], x = a[g + y] * h; r[y] = M * w + E * A + m * C + p * x } return r } } const o0 = new an; class l0 extends ph { interpolate_(e, t, n, i) { const r = super.interpolate_(e, t, n, i); return o0.fromArray(r).normalize().toArray(r), r } } const Wt = { POINTS: 0, LINES: 1, LINE_LOOP: 2, LINE_STRIP: 3, TRIANGLES: 4, TRIANGLE_STRIP: 5, TRIANGLE_FAN: 6 }, Fi = { 5120: Int8Array, 5121: Uint8Array, 5122: Int16Array, 5123: Uint16Array, 5125: Uint32Array, 5126: Float32Array }, Sc = { 9728: _t, 9729: xt, 9984: Uc, 9985: cr, 9986: cs, 9987: Ln }, yc = { 33071: pn, 33648: gr, 10497: Zn }, ma = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT2: 4, MAT3: 9, MAT4: 16 }, po = { POSITION: "position", NORMAL: "normal", TANGENT: "tangent", TEXCOORD_0: "uv", TEXCOORD_1: "uv1", TEXCOORD_2: "uv2", TEXCOORD_3: "uv3", COLOR_0: "color", WEIGHTS_0: "skinWeight", JOINTS_0: "skinIndex" }, $n = { scale: "scale", translation: "position", rotation: "quaternion", weights: "morphTargetInfluences" }, c0 = { CUBICSPLINE: void 0, LINEAR: Ms, STEP: vs }, ga = { OPAQUE: "OPAQUE", MASK: "MASK", BLEND: "BLEND" }; function h0(s) { return s.DefaultMaterial === void 0 && (s.DefaultMaterial = new zo({ color: 16777215, emissive: 0, metalness: 1, roughness: 1, transparent: !1, depthTest: !0, side: Fn })), s.DefaultMaterial } function ai(s, e, t) { for (const n in t.extensions) s[n] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[n] = t.extensions[n]) } function dn(s, e) { e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(s.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras)) } function u0(s, e, t) { let n = !1, i = !1, r = !1; for (let c = 0, h = e.length; c < h; c++) { const d = e[c]; if (d.POSITION !== void 0 && (n = !0), d.NORMAL !== void 0 && (i = !0), d.COLOR_0 !== void 0 && (r = !0), n && i && r) break } if (!n && !i && !r) return Promise.resolve(s); const a = [], o = [], l = []; for (let c = 0, h = e.length; c < h; c++) { const d = e[c]; if (n) { const u = d.POSITION !== void 0 ? t.getDependency("accessor", d.POSITION) : s.attributes.position; a.push(u) } if (i) { const u = d.NORMAL !== void 0 ? t.getDependency("accessor", d.NORMAL) : s.attributes.normal; o.push(u) } if (r) { const u = d.COLOR_0 !== void 0 ? t.getDependency("accessor", d.COLOR_0) : s.attributes.color; l.push(u) } } return Promise.all([Promise.all(a), Promise.all(o), Promise.all(l)]).then(function (c) { const h = c[0], d = c[1], u = c[2]; return n && (s.morphAttributes.position = h), i && (s.morphAttributes.normal = d), r && (s.morphAttributes.color = u), s.morphTargetsRelative = !0, s }) } function d0(s, e) { if (s.updateMorphTargets(), e.weights !== void 0) for (let t = 0, n = e.weights.length; t < n; t++)s.morphTargetInfluences[t] = e.weights[t]; if (e.extras && Array.isArray(e.extras.targetNames)) { const t = e.extras.targetNames; if (s.morphTargetInfluences.length === t.length) { s.morphTargetDictionary = {}; for (let n = 0, i = t.length; n < i; n++)s.morphTargetDictionary[t[n]] = n } else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.") } } function f0(s) { let e; const t = s.extensions && s.extensions[Ve.KHR_DRACO_MESH_COMPRESSION]; if (t ? e = "draco:" + t.bufferView + ":" + t.indices + ":" + _a(t.attributes) : e = s.indices + ":" + _a(s.attributes) + ":" + s.mode, s.targets !== void 0) for (let n = 0, i = s.targets.length; n < i; n++)e += ":" + _a(s.targets[n]); return e } function _a(s) { let e = ""; const t = Object.keys(s).sort(); for (let n = 0, i = t.length; n < i; n++)e += t[n] + ":" + s[t[n]] + ";"; return e } function mo(s) { switch (s) { case Int8Array: return 1 / 127; case Uint8Array: return 1 / 255; case Int16Array: return 1 / 32767; case Uint16Array: return 1 / 65535; default: throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.") } } function p0(s) { return s.search(/\.jpe?g($|\?)/i) > 0 || s.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : s.search(/\.webp($|\?)/i) > 0 || s.search(/^data\:image\/webp/) === 0 ? "image/webp" : s.search(/\.ktx2($|\?)/i) > 0 || s.search(/^data\:image\/ktx2/) === 0 ? "image/ktx2" : "image/png" } const m0 = new Ue; class g0 { constructor(e = {}, t = {}) { this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new z_, this.associations = new Map, this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {}; let n = !1, i = -1, r = !1, a = -1; if (typeof navigator < "u" && typeof navigator.userAgent < "u") { const o = navigator.userAgent; n = /^((?!chrome|android).)*safari/i.test(o) === !0; const l = o.match(/Version\/(\d+)/); i = n && l ? parseInt(l[1], 10) : -1, r = o.indexOf("Firefox") > -1, a = r ? o.match(/Firefox\/([0-9]+)\./)[1] : -1 } typeof createImageBitmap > "u" || n && i < 17 || r && a < 98 ? this.textureLoader = new ih(this.options.manager) : this.textureLoader = new Pd(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new nh(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0) } setExtensions(e) { this.extensions = e } setPlugins(e) { this.plugins = e } parse(e, t) { const n = this, i = this.json, r = this.extensions; this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function (a) { return a._markDefs && a._markDefs() }), Promise.all(this._invokeAll(function (a) { return a.beforeRoot && a.beforeRoot() })).then(function () { return Promise.all([n.getDependencies("scene"), n.getDependencies("animation"), n.getDependencies("camera")]) }).then(function (a) { const o = { scene: a[0][i.scene || 0], scenes: a[0], animations: a[1], cameras: a[2], asset: i.asset, parser: n, userData: {} }; return ai(r, o, i), dn(o, i), Promise.all(n._invokeAll(function (l) { return l.afterRoot && l.afterRoot(o) })).then(function () { for (const l of o.scenes) l.updateMatrixWorld(); e(o) }) }).catch(t) } _markDefs() { const e = this.json.nodes || [], t = this.json.skins || [], n = this.json.meshes || []; for (let i = 0, r = t.length; i < r; i++) { const a = t[i].joints; for (let o = 0, l = a.length; o < l; o++)e[a[o]].isBone = !0 } for (let i = 0, r = e.length; i < r; i++) { const a = e[i]; a.mesh !== void 0 && (this._addNodeRef(this.meshCache, a.mesh), a.skin !== void 0 && (n[a.mesh].isSkinnedMesh = !0)), a.camera !== void 0 && this._addNodeRef(this.cameraCache, a.camera) } } _addNodeRef(e, t) { t !== void 0 && (e.refs[t] === void 0 && (e.refs[t] = e.uses[t] = 0), e.refs[t]++) } _getNodeRef(e, t, n) { if (e.refs[t] <= 1) return n; const i = n.clone(), r = (a, o) => { const l = this.associations.get(a); l != null && this.associations.set(o, l); for (const [c, h] of a.children.entries()) r(h, o.children[c]) }; return r(n, i), i.name += "_instance_" + e.uses[t]++, i } _invokeOne(e) { const t = Object.values(this.plugins); t.push(this); for (let n = 0; n < t.length; n++) { const i = e(t[n]); if (i) return i } return null } _invokeAll(e) { const t = Object.values(this.plugins); t.unshift(this); const n = []; for (let i = 0; i < t.length; i++) { const r = e(t[i]); r && n.push(r) } return n } getDependency(e, t) { const n = e + ":" + t; let i = this.cache.get(n); if (!i) { switch (e) { case "scene": i = this.loadScene(t); break; case "node": i = this._invokeOne(function (r) { return r.loadNode && r.loadNode(t) }); break; case "mesh": i = this._invokeOne(function (r) { return r.loadMesh && r.loadMesh(t) }); break; case "accessor": i = this.loadAccessor(t); break; case "bufferView": i = this._invokeOne(function (r) { return r.loadBufferView && r.loadBufferView(t) }); break; case "buffer": i = this.loadBuffer(t); break; case "material": i = this._invokeOne(function (r) { return r.loadMaterial && r.loadMaterial(t) }); break; case "texture": i = this._invokeOne(function (r) { return r.loadTexture && r.loadTexture(t) }); break; case "skin": i = this.loadSkin(t); break; case "animation": i = this._invokeOne(function (r) { return r.loadAnimation && r.loadAnimation(t) }); break; case "camera": i = this.loadCamera(t); break; default: if (i = this._invokeOne(function (r) { return r != this && r.getDependency && r.getDependency(e, t) }), !i) throw new Error("Unknown type: " + e); break }this.cache.add(n, i) } return i } getDependencies(e) { let t = this.cache.get(e); if (!t) { const n = this, i = this.json[e + (e === "mesh" ? "es" : "s")] || []; t = Promise.all(i.map(function (r, a) { return n.getDependency(e, a) })), this.cache.add(e, t) } return t } loadBuffer(e) { const t = this.json.buffers[e], n = this.fileLoader; if (t.type && t.type !== "arraybuffer") throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported."); if (t.uri === void 0 && e === 0) return Promise.resolve(this.extensions[Ve.KHR_BINARY_GLTF].body); const i = this.options; return new Promise(function (r, a) { n.load(ps.resolveURL(t.uri, i.path), r, void 0, function () { a(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".')) }) }) } loadBufferView(e) { const t = this.json.bufferViews[e]; return this.getDependency("buffer", t.buffer).then(function (n) { const i = t.byteLength || 0, r = t.byteOffset || 0; return n.slice(r, r + i) }) } loadAccessor(e) { const t = this, n = this.json, i = this.json.accessors[e]; if (i.bufferView === void 0 && i.sparse === void 0) { const a = ma[i.type], o = Fi[i.componentType], l = i.normalized === !0, c = new o(i.count * a); return Promise.resolve(new Ft(c, a, l)) } const r = []; return i.bufferView !== void 0 ? r.push(this.getDependency("bufferView", i.bufferView)) : r.push(null), i.sparse !== void 0 && (r.push(this.getDependency("bufferView", i.sparse.indices.bufferView)), r.push(this.getDependency("bufferView", i.sparse.values.bufferView))), Promise.all(r).then(function (a) { const o = a[0], l = ma[i.type], c = Fi[i.componentType], h = c.BYTES_PER_ELEMENT, d = h * l, u = i.byteOffset || 0, f = i.bufferView !== void 0 ? n.bufferViews[i.bufferView].byteStride : void 0, g = i.normalized === !0; let v, m; if (f && f !== d) { const p = Math.floor(u / f), M = "InterleavedBuffer:" + i.bufferView + ":" + i.componentType + ":" + p + ":" + i.count; let E = t.cache.get(M); E || (v = new c(o, p * f, i.count * f / h), E = new Hu(v, f / h), t.cache.add(M, E)), m = new Io(E, l, u % f / h, g) } else o === null ? v = new c(i.count * l) : v = new c(o, u, i.count * l), m = new Ft(v, l, g); if (i.sparse !== void 0) { const p = ma.SCALAR, M = Fi[i.sparse.indices.componentType], E = i.sparse.indices.byteOffset || 0, y = i.sparse.values.byteOffset || 0, w = new M(a[1], E, i.sparse.count * p), A = new c(a[2], y, i.sparse.count * l); o !== null && (m = new Ft(m.array.slice(), m.itemSize, m.normalized)), m.normalized = !1; for (let C = 0, x = w.length; C < x; C++) { const b = w[C]; if (m.setX(b, A[C * l]), l >= 2 && m.setY(b, A[C * l + 1]), l >= 3 && m.setZ(b, A[C * l + 2]), l >= 4 && m.setW(b, A[C * l + 3]), l >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.") } m.normalized = g } return m }) } loadTexture(e) { const t = this.json, n = this.options, r = t.textures[e].source, a = t.images[r]; let o = this.textureLoader; if (a.uri) { const l = n.manager.getHandler(a.uri); l !== null && (o = l) } return this.loadTextureImage(e, r, o) } loadTextureImage(e, t, n) { const i = this, r = this.json, a = r.textures[e], o = r.images[t], l = (o.uri || o.bufferView) + ":" + a.sampler; if (this.textureCache[l]) return this.textureCache[l]; const c = this.loadImageSource(t, n).then(function (h) { h.flipY = !1, h.name = a.name || o.name || "", h.name === "" && typeof o.uri == "string" && o.uri.startsWith("data:image/") === !1 && (h.name = o.uri); const u = (r.samplers || {})[a.sampler] || {}; return h.magFilter = Sc[u.magFilter] || xt, h.minFilter = Sc[u.minFilter] || Ln, h.wrapS = yc[u.wrapS] || Zn, h.wrapT = yc[u.wrapT] || Zn, h.generateMipmaps = !h.isCompressedTexture && h.minFilter !== _t && h.minFilter !== xt, i.associations.set(h, { textures: e }), h }).catch(function () { return null }); return this.textureCache[l] = c, c } loadImageSource(e, t) { const n = this, i = this.json, r = this.options; if (this.sourceCache[e] !== void 0) return this.sourceCache[e].then(d => d.clone()); const a = i.images[e], o = self.URL || self.webkitURL; let l = a.uri || "", c = !1; if (a.bufferView !== void 0) l = n.getDependency("bufferView", a.bufferView).then(function (d) { c = !0; const u = new Blob([d], { type: a.mimeType }); return l = o.createObjectURL(u), l }); else if (a.uri === void 0) throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView"); const h = Promise.resolve(l).then(function (d) { return new Promise(function (u, f) { let g = u; t.isImageBitmapLoader === !0 && (g = function (v) { const m = new Et(v); m.needsUpdate = !0, u(m) }), t.load(ps.resolveURL(d, r.path), g, void 0, f) }) }).then(function (d) { return c === !0 && o.revokeObjectURL(l), dn(d, a), d.userData.mimeType = a.mimeType || p0(a.uri), d }).catch(function (d) { throw console.error("THREE.GLTFLoader: Couldn't load texture", l), d }); return this.sourceCache[e] = h, h } assignTexture(e, t, n, i) { const r = this; return this.getDependency("texture", n.index).then(function (a) { if (!a) return null; if (n.texCoord !== void 0 && n.texCoord > 0 && (a = a.clone(), a.channel = n.texCoord), r.extensions[Ve.KHR_TEXTURE_TRANSFORM]) { const o = n.extensions !== void 0 ? n.extensions[Ve.KHR_TEXTURE_TRANSFORM] : void 0; if (o) { const l = r.associations.get(a); a = r.extensions[Ve.KHR_TEXTURE_TRANSFORM].extendTexture(a, o), r.associations.set(a, l) } } return i !== void 0 && (a.colorSpace = i), e[t] = a, a }) } assignFinalMaterial(e) { const t = e.geometry; let n = e.material; const i = t.attributes.tangent === void 0, r = t.attributes.color !== void 0, a = t.attributes.normal === void 0; if (e.isPoints) { const o = "PointsMaterial:" + n.uuid; let l = this.cache.get(o); l || (l = new jc, rn.prototype.copy.call(l, n), l.color.copy(n.color), l.map = n.map, l.sizeAttenuation = !1, this.cache.add(o, l)), n = l } else if (e.isLine) { const o = "LineBasicMaterial:" + n.uuid; let l = this.cache.get(o); l || (l = new br, rn.prototype.copy.call(l, n), l.color.copy(n.color), l.map = n.map, this.cache.add(o, l)), n = l } if (i || r || a) { let o = "ClonedMaterial:" + n.uuid + ":"; i && (o += "derivative-tangents:"), r && (o += "vertex-colors:"), a && (o += "flat-shading:"); let l = this.cache.get(o); l || (l = n.clone(), r && (l.vertexColors = !0), a && (l.flatShading = !0), i && (l.normalScale && (l.normalScale.y *= -1), l.clearcoatNormalScale && (l.clearcoatNormalScale.y *= -1)), this.cache.add(o, l), this.associations.set(l, this.associations.get(n))), n = l } e.material = n } getMaterialType() { return zo } loadMaterial(e) { const t = this, n = this.json, i = this.extensions, r = n.materials[e]; let a; const o = {}, l = r.extensions || {}, c = []; if (l[Ve.KHR_MATERIALS_UNLIT]) { const d = i[Ve.KHR_MATERIALS_UNLIT]; a = d.getMaterialType(), c.push(d.extendParams(o, r, t)) } else { const d = r.pbrMetallicRoughness || {}; if (o.color = new Ae(1, 1, 1), o.opacity = 1, Array.isArray(d.baseColorFactor)) { const u = d.baseColorFactor; o.color.setRGB(u[0], u[1], u[2], Ot), o.opacity = u[3] } d.baseColorTexture !== void 0 && c.push(t.assignTexture(o, "map", d.baseColorTexture, wt)), o.metalness = d.metallicFactor !== void 0 ? d.metallicFactor : 1, o.roughness = d.roughnessFactor !== void 0 ? d.roughnessFactor : 1, d.metallicRoughnessTexture !== void 0 && (c.push(t.assignTexture(o, "metalnessMap", d.metallicRoughnessTexture)), c.push(t.assignTexture(o, "roughnessMap", d.metallicRoughnessTexture))), a = this._invokeOne(function (u) { return u.getMaterialType && u.getMaterialType(e) }), c.push(Promise.all(this._invokeAll(function (u) { return u.extendMaterialParams && u.extendMaterialParams(e, o) }))) } r.doubleSided === !0 && (o.side = Qt); const h = r.alphaMode || ga.OPAQUE; if (h === ga.BLEND ? (o.transparent = !0, o.depthWrite = !1) : (o.transparent = !1, h === ga.MASK && (o.alphaTest = r.alphaCutoff !== void 0 ? r.alphaCutoff : .5)), r.normalTexture !== void 0 && a !== nn && (c.push(t.assignTexture(o, "normalMap", r.normalTexture)), o.normalScale = new Ge(1, 1), r.normalTexture.scale !== void 0)) { const d = r.normalTexture.scale; o.normalScale.set(d, d) } if (r.occlusionTexture !== void 0 && a !== nn && (c.push(t.assignTexture(o, "aoMap", r.occlusionTexture)), r.occlusionTexture.strength !== void 0 && (o.aoMapIntensity = r.occlusionTexture.strength)), r.emissiveFactor !== void 0 && a !== nn) { const d = r.emissiveFactor; o.emissive = new Ae().setRGB(d[0], d[1], d[2], Ot) } return r.emissiveTexture !== void 0 && a !== nn && c.push(t.assignTexture(o, "emissiveMap", r.emissiveTexture, wt)), Promise.all(c).then(function () { const d = new a(o); return r.name && (d.name = r.name), dn(d, r), t.associations.set(d, { materials: e }), r.extensions && ai(i, d, r), d }) } createUniqueName(e) { const t = Je.sanitizeNodeName(e || ""); return t in this.nodeNamesUsed ? t + "_" + ++this.nodeNamesUsed[t] : (this.nodeNamesUsed[t] = 0, t) } loadGeometries(e) { const t = this, n = this.extensions, i = this.primitiveCache; function r(o) { return n[Ve.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o, t).then(function (l) { return bc(l, o, t) }) } const a = []; for (let o = 0, l = e.length; o < l; o++) { const c = e[o], h = f0(c), d = i[h]; if (d) a.push(d.promise); else { let u; c.extensions && c.extensions[Ve.KHR_DRACO_MESH_COMPRESSION] ? u = r(c) : u = bc(new Rt, c, t), i[h] = { primitive: c, promise: u }, a.push(u) } } return Promise.all(a) } loadMesh(e) { const t = this, n = this.json, i = this.extensions, r = n.meshes[e], a = r.primitives, o = []; for (let l = 0, c = a.length; l < c; l++) { const h = a[l].material === void 0 ? h0(this.cache) : this.getDependency("material", a[l].material); o.push(h) } return o.push(t.loadGeometries(a)), Promise.all(o).then(function (l) { const c = l.slice(0, l.length - 1), h = l[l.length - 1], d = []; for (let f = 0, g = h.length; f < g; f++) { const v = h[f], m = a[f]; let p; const M = c[f]; if (m.mode === Wt.TRIANGLES || m.mode === Wt.TRIANGLE_STRIP || m.mode === Wt.TRIANGLE_FAN || m.mode === void 0) p = r.isSkinnedMesh === !0 ? new Yu(v, M) : new Tt(v, M), p.isSkinnedMesh === !0 && p.normalizeSkinWeights(), m.mode === Wt.TRIANGLE_STRIP ? p.geometry = xc(p.geometry, Hc) : m.mode === Wt.TRIANGLE_FAN && (p.geometry = xc(p.geometry, oo)); else if (m.mode === Wt.LINES) p = new Qu(v, M); else if (m.mode === Wt.LINE_STRIP) p = new ws(v, M); else if (m.mode === Wt.LINE_LOOP) p = new ed(v, M); else if (m.mode === Wt.POINTS) p = new td(v, M); else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + m.mode); Object.keys(p.geometry.morphAttributes).length > 0 && d0(p, r), p.name = t.createUniqueName(r.name || "mesh_" + e), dn(p, r), m.extensions && ai(i, p, m), t.assignFinalMaterial(p), d.push(p) } for (let f = 0, g = d.length; f < g; f++)t.associations.set(d[f], { meshes: e, primitives: f }); if (d.length === 1) return r.extensions && ai(i, d[0], r), d[0]; const u = new qt; r.extensions && ai(i, u, r), t.associations.set(u, { meshes: e }); for (let f = 0, g = d.length; f < g; f++)u.add(d[f]); return u }) } loadCamera(e) { let t; const n = this.json.cameras[e], i = n[n.type]; if (!i) { console.warn("THREE.GLTFLoader: Missing camera parameters."); return } return n.type === "perspective" ? t = new Ut(Ni.radToDeg(i.yfov), i.aspectRatio || 1, i.znear || 1, i.zfar || 2e6) : n.type === "orthographic" && (t = new Ar(-i.xmag, i.xmag, i.ymag, -i.ymag, i.znear, i.zfar)), n.name && (t.name = this.createUniqueName(n.name)), dn(t, n), Promise.resolve(t) } loadSkin(e) { const t = this.json.skins[e], n = []; for (let i = 0, r = t.joints.length; i < r; i++)n.push(this._loadNodeShallow(t.joints[i])); return t.inverseBindMatrices !== void 0 ? n.push(this.getDependency("accessor", t.inverseBindMatrices)) : n.push(null), Promise.all(n).then(function (i) { const r = i.pop(), a = i, o = [], l = []; for (let c = 0, h = a.length; c < h; c++) { const d = a[c]; if (d) { o.push(d); const u = new Ue; r !== null && u.fromArray(r.array, c * 16), l.push(u) } else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[c]) } return new No(o, l) }) } loadAnimation(e) { const t = this.json, n = this, i = t.animations[e], r = i.name ? i.name : "animation_" + e, a = [], o = [], l = [], c = [], h = []; for (let d = 0, u = i.channels.length; d < u; d++) { const f = i.channels[d], g = i.samplers[f.sampler], v = f.target, m = v.node, p = i.parameters !== void 0 ? i.parameters[g.input] : g.input, M = i.parameters !== void 0 ? i.parameters[g.output] : g.output; v.node !== void 0 && (a.push(this.getDependency("node", m)), o.push(this.getDependency("accessor", p)), l.push(this.getDependency("accessor", M)), c.push(g), h.push(v)) } return Promise.all([Promise.all(a), Promise.all(o), Promise.all(l), Promise.all(c), Promise.all(h)]).then(function (d) { const u = d[0], f = d[1], g = d[2], v = d[3], m = d[4], p = []; for (let E = 0, y = u.length; E < y; E++) { const w = u[E], A = f[E], C = g[E], x = v[E], b = m[E]; if (w === void 0) continue; w.updateMatrix && w.updateMatrix(); const W = n._createAnimationTracks(w, A, C, x, b); if (W) for (let R = 0; R < W.length; R++)p.push(W[R]) } const M = new _d(r, void 0, p); return dn(M, i), M }) } createNodeMesh(e) { const t = this.json, n = this, i = t.nodes[e]; return i.mesh === void 0 ? null : n.getDependency("mesh", i.mesh).then(function (r) { const a = n._getNodeRef(n.meshCache, i.mesh, r); return i.weights !== void 0 && a.traverse(function (o) { if (o.isMesh) for (let l = 0, c = i.weights.length; l < c; l++)o.morphTargetInfluences[l] = i.weights[l] }), a }) } loadNode(e) { const t = this.json, n = this, i = t.nodes[e], r = n._loadNodeShallow(e), a = [], o = i.children || []; for (let c = 0, h = o.length; c < h; c++)a.push(n.getDependency("node", o[c])); const l = i.skin === void 0 ? Promise.resolve(null) : n.getDependency("skin", i.skin); return Promise.all([r, Promise.all(a), l]).then(function (c) { const h = c[0], d = c[1], u = c[2]; u !== null && h.traverse(function (f) { f.isSkinnedMesh && f.bind(u, m0) }); for (let f = 0, g = d.length; f < g; f++)h.add(d[f]); if (h.userData.pivot !== void 0 && d.length > 0) { const f = h.userData.pivot, g = d[0]; h.pivot = new L().fromArray(f), h.position.x -= f[0], h.position.y -= f[1], h.position.z -= f[2], g.position.set(0, 0, 0), delete h.userData.pivot } return h }) } _loadNodeShallow(e) { const t = this.json, n = this.extensions, i = this; if (this.nodeCache[e] !== void 0) return this.nodeCache[e]; const r = t.nodes[e], a = r.name ? i.createUniqueName(r.name) : "", o = [], l = i._invokeOne(function (c) { return c.createNodeMesh && c.createNodeMesh(e) }); return l && o.push(l), r.camera !== void 0 && o.push(i.getDependency("camera", r.camera).then(function (c) { return i._getNodeRef(i.cameraCache, r.camera, c) })), i._invokeAll(function (c) { return c.createNodeAttachment && c.createNodeAttachment(e) }).forEach(function (c) { o.push(c) }), this.nodeCache[e] = Promise.all(o).then(function (c) { let h; if (r.isBone === !0 ? h = new Kc : c.length > 1 ? h = new qt : c.length === 1 ? h = c[0] : h = new ct, h !== c[0]) for (let d = 0, u = c.length; d < u; d++)h.add(c[d]); if (r.name && (h.userData.name = r.name, h.name = a), dn(h, r), r.extensions && ai(n, h, r), r.matrix !== void 0) { const d = new Ue; d.fromArray(r.matrix), h.applyMatrix4(d) } else r.translation !== void 0 && h.position.fromArray(r.translation), r.rotation !== void 0 && h.quaternion.fromArray(r.rotation), r.scale !== void 0 && h.scale.fromArray(r.scale); if (!i.associations.has(h)) i.associations.set(h, {}); else if (r.mesh !== void 0 && i.meshCache.refs[r.mesh] > 1) { const d = i.associations.get(h); i.associations.set(h, { ...d }) } return i.associations.get(h).nodes = e, h }), this.nodeCache[e] } loadScene(e) { const t = this.extensions, n = this.json.scenes[e], i = this, r = new qt; n.name && (r.name = i.createUniqueName(n.name)), dn(r, n), n.extensions && ai(t, r, n); const a = n.nodes || [], o = []; for (let l = 0, c = a.length; l < c; l++)o.push(i.getDependency("node", a[l])); return Promise.all(o).then(function (l) { for (let h = 0, d = l.length; h < d; h++) { const u = l[h]; u.parent !== null ? r.add(B_(u)) : r.add(u) } const c = h => { const d = new Map; for (const [u, f] of i.associations) (u instanceof rn || u instanceof Et) && d.set(u, f); return h.traverse(u => { const f = i.associations.get(u); f != null && d.set(u, f) }), d }; return i.associations = c(r), r }) } _createAnimationTracks(e, t, n, i, r) { const a = [], o = e.name ? e.name : e.uuid, l = []; $n[r.path] === $n.weights ? e.traverse(function (u) { u.morphTargetInfluences && l.push(u.name ? u.name : u.uuid) }) : l.push(o); let c; switch ($n[r.path]) { case $n.weights: c = Hi; break; case $n.rotation: c = Gi; break; case $n.translation: case $n.scale: c = Wi; break; default: switch (n.itemSize) { case 1: c = Hi; break; case 2: case 3: default: c = Wi; break }break }const h = i.interpolation !== void 0 ? c0[i.interpolation] : Ms, d = this._getArrayFromAccessor(n); for (let u = 0, f = l.length; u < f; u++) { const g = new c(l[u] + "." + $n[r.path], t.array, d, h); i.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(g), a.push(g) } return a } _getArrayFromAccessor(e) { let t = e.array; if (e.normalized) { const n = mo(t.constructor), i = new Float32Array(t.length); for (let r = 0, a = t.length; r < a; r++)i[r] = t[r] * n; t = i } return t } _createCubicSplineTrackInterpolant(e) { e.createInterpolant = function (n) { const i = this instanceof Gi ? l0 : ph; return new i(this.times, this.values, this.getValueSize() / 3, n) }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0 } } function _0(s, e, t) { const n = e.attributes, i = new zn; if (n.POSITION !== void 0) { const o = t.json.accessors[n.POSITION], l = o.min, c = o.max; if (l !== void 0 && c !== void 0) { if (i.set(new L(l[0], l[1], l[2]), new L(c[0], c[1], c[2])), o.normalized) { const h = mo(Fi[o.componentType]); i.min.multiplyScalar(h), i.max.multiplyScalar(h) } } else { console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION."); return } } else return; const r = e.targets; if (r !== void 0) { const o = new L, l = new L; for (let c = 0, h = r.length; c < h; c++) { const d = r[c]; if (d.POSITION !== void 0) { const u = t.json.accessors[d.POSITION], f = u.min, g = u.max; if (f !== void 0 && g !== void 0) { if (l.setX(Math.max(Math.abs(f[0]), Math.abs(g[0]))), l.setY(Math.max(Math.abs(f[1]), Math.abs(g[1]))), l.setZ(Math.max(Math.abs(f[2]), Math.abs(g[2]))), u.normalized) { const v = mo(Fi[u.componentType]); l.multiplyScalar(v) } o.max(l) } else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.") } } i.expandByVector(o) } s.boundingBox = i; const a = new on; i.getCenter(a.center), a.radius = i.min.distanceTo(i.max) / 2, s.boundingSphere = a } function bc(s, e, t) { const n = e.attributes, i = []; function r(a, o) { return t.getDependency("accessor", a).then(function (l) { s.setAttribute(o, l) }) } for (const a in n) { const o = po[a] || a.toLowerCase(); o in s.attributes || i.push(r(n[a], o)) } if (e.indices !== void 0 && !s.index) { const a = t.getDependency("accessor", e.indices).then(function (o) { s.setIndex(o) }); i.push(a) } return We.workingColorSpace !== Ot && "COLOR_0" in n && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${We.workingColorSpace}" not supported.`), dn(s, e), _0(s, e, t), Promise.all(i).then(function () { return e.targets !== void 0 ? u0(s, e.targets, t) : s }) } class x0 extends qt { flowySpeed = 2.5; _bezierT = 0; _bezierDuration = 2; _bezierPoints = null; _randomPointInBounds() { const e = { x: 10, y: .5, z: 10 }; return new L((Math.random() - .5) * 2 * e.x, e.y + Math.random() * 7.5, (Math.random() - .5) * 2 * e.z) } _startNewBezier() { const e = this.position.clone(), t = this._randomPointInBounds(), n = new L((Math.random() - .5) * 8, (Math.random() - .5) * 8, (Math.random() - .5) * 8), i = new L((Math.random() - .5) * 8, (Math.random() - .5) * 8, (Math.random() - .5) * 8), r = e.clone().add(n), a = t.clone().add(i); this._bezierPoints = [e, r, a, t]; const o = e.distanceTo(t); this._bezierDuration = o / this.flowySpeed, this._bezierT = 0 } green = new Ae(5635925); black = new Ae(0); red = new Ae(16733525); constructor(e = new L(0, 3, -3), t = .9125) { super(), this.modelUrl = "/rl-dart/models/ball/scene.gltf", this.radius = t, this.intersecting = !1, this.targetTimer = 0, this.chaseTimer = 0, this.hits = 0; const n = new Er(t + .1, 32, 32), i = new nn({ color: 16733525, transparent: !0, opacity: .2 }); this.sphere = new Tt(n, i), this.add(this.sphere), this.loader = new dh, this.loader.load(this.modelUrl, r => { this.ball = r.scene, this.ball.scale.set(1, 1, 1), this.ball.position.set(0, 0, 0), this.add(this.ball) }), this.add(this.sphere), this.position.copy(e), this.boundingSphere = new on(this.position.clone(), this.radius), this._randomVelocity = new L((Math.random() - .5) * 10, (Math.random() - .5) * 10, (Math.random() - .5) * 10), this._randomMoveEnabled = !1 } updateBallPos(e) { this.position.copy(e), this.boundingSphere.center.copy(e) } processHit() { this.chaseTimer = 0, this.targetTimer = 0, console.log(++this.hits) } staticScenarioDefault() { this.processHit(), this.updateBallPos(new L(Math.round(Math.random() * 10 - 5), Math.round(Math.random() * 10 - 5), Math.round(Math.random() * 10 - 5))) } staticScenarioHigh() { this.processHit(), this.updateBallPos(new L(Math.random() * 2 - 1, 3, Math.random() * 2 - 1)) } updateBallScale(e) { this.ball && (this.ball.scale.set(e, e, e), this.boundingSphere.radius = e, this.sphere.scale.set(e + .05, e + .05, e + .05)) } intersectsLine(e, t) { if (this.chaseTimer += t, it.ball.timeout && this.chaseTimer > it.ball.chaseTimeout && (this.staticScenarioHigh(), this.chaseTimer = 0), e.intersectsSphere(this.boundingSphere)) if (this.intersecting = !0, this.targetTimer += t, this._randomMoveEnabled) { const n = new Ae, i = performance.now() * .1 % 360 / 360; n.setHSL(i, 1, .5), this.sphere.material.color.set(n) } else { const n = new Ae; if (n.lerpColors(this.red, this.green, this.targetTimer / it.ball.hitWindowDuration), this.sphere.material.color.set(n), this.targetTimer > it.ball.hitWindowDuration) switch (it.ball.randomizerPreset) { case "default": this.staticScenarioDefault(); break; case "vertical": this.staticScenarioHigh(); break; default: this.staticScenarioDefault(); break }return !0 } else return this.intersecting = !1, this.sphere.material.color.set(this.red), this.targetTimer = 0, !1 } updateRandomMovement(e = .016) { if (!this._randomMoveEnabled) return; if (this._bezierPoints || this._startNewBezier(), this._bezierT += e / this._bezierDuration, this._bezierT > 1) { this._startNewBezier(this._bezierPoints[3]); return } const [t, n, i, r] = this._bezierPoints, a = this._bezierT, o = t.clone().lerp(n, a), l = n.clone().lerp(i, a), c = i.clone().lerp(r, a), h = o.lerp(l, a), d = l.lerp(c, a), u = h.lerp(d, a); this.updateBallPos(u) } update(e) { this.updateRandomMovement(e) } } const v0 = new ih, us = v0.load("https://threejs.org/manual/examples/resources/images/checker.png"), M0 = new ld({ map: us, side: Qt }); let S0 = class extends qt { constructor(e = 80) { super(), this.planeSize = e } gen() { us.wrapS = Zn, us.wrapT = Zn, us.magFilter = _t; const e = this.planeSize / 2; us.repeat.set(e, e); const t = new Cs(this.planeSize, this.planeSize), n = new Tt(t, M0); n.rotation.x = Math.PI * -.5, this.add(n) } }; class y0 extends qt { constructor(e, t) { super(), this.scene = e, this.modelUrl = t.modelUrl, this.model = null, this.loader = new dh, this.loader.load(this.modelUrl, n => { this.model = n.scene, this.model.scale.set(t.scale, t.scale, t.scale), this.model.position.set(t.position.x, t.position.y, t.position.z), this.model.rotation.set(t.rotation.x, t.rotation.y, t.rotation.z), this.add(this.model) }) } setVisible(e) { this.model && (this.model.visible = e) } } const go = { octane: { name: "octane", modelUrl: "/rl-dart/models/octane/scene.gltf", scale: .012, position: { x: 0, y: -.2, z: 0 }, rotation: { x: 0, y: Math.PI / 2, z: 0 } }, fennec: { name: "fennec", modelUrl: "/rl-dart/models/fennec/scene.gltf", scale: .012, position: { x: 0, y: -.2, z: 0 }, rotation: { x: 0, y: Math.PI / 2, z: 0 } }, dominus: { name: "dominus", modelUrl: "/rl-dart/models/dominus/scene.gltf", scale: .012, position: { x: 0, y: -.2, z: 0 }, rotation: { x: 0, y: Math.PI / 2, z: 0 } }, lambo: { name: "lambo", modelUrl: "/rl-dart/models/lambo/scene.gltf", scale: .15, position: { x: .28, y: .03, z: 0 }, rotation: { x: 0, y: 0, z: 0 } } }, b0 = Math.PI / 180; function E0(s) { return s * b0 } const Ii = (s, e = .1) => Math.abs(s) < e ? 0 : s, T0 = (s, e, t = .1) => Math.hypot(s, e) < t ? { x: 0, y: 0 } : { x: s, y: e }; function A0(s, e) { if (s === 0 && e === 0) return { x: 0, y: 0 }; const t = Math.hypot(s, e), n = s / t, i = e / t, r = Math.max(Math.abs(n), Math.abs(i)), a = r === 0 ? 0 : t / r; return { x: n * a, y: i * a } } function w0(s, e, t, n) { const i = 1 - Math.exp(-t.x * n), r = 1 - Math.exp(-t.y * n), a = 1 - Math.exp(-t.z * n); s.x = Ni.lerp(s.x, e.x, i), s.y = Ni.lerp(s.y, e.y, r), s.z = Ni.lerp(s.z, e.z, a) } class R0 extends qt { _mouseDown = !1; _initParticles() { this.particleGroup = new qt, this.scene.add(this.particleGroup), this._particles = [] } emitParticles(e) { this._emitAccumulator || (this._emitAccumulator = 0); const t = 120; this._emitAccumulator += e * t; const n = Math.floor(this._emitAccumulator); if (n <= 0) return; this._emitAccumulator -= n; const i = new L(0, .1, .6); i.applyQuaternion(this.quaternion); const r = this.position.clone().add(i); for (let a = 0; a < n; a++) { const o = [new L(-.15, 0, 0), new L(.15, 0, 0)]; for (const l of o) { const c = .04 + Math.random() * .01, h = .12 + Math.random() * .1, d = new Tt(new Er(c, 12, 12), new nn({ color: this.boostColour, transparent: !0, opacity: h, depthWrite: !1 })), u = l.clone().applyQuaternion(this.quaternion); d.position.copy(r).add(u), d.userData.velocity = new L((Math.random() - .5) * .13, (Math.random() - .5) * .13, 1.5 + Math.random() * .13).applyQuaternion(this.quaternion), d.userData.life = 1 + Math.random() * .4, this.particleGroup.add(d), this._particles.push(d) } } } updateParticles(e) { if (this._particles) for (let t = this._particles.length - 1; t >= 0; t--) { const n = this._particles[t]; n.position.addScaledVector(n.userData.velocity, e * 2), n.userData.life -= e; const i = n.userData.totalLife || (n.userData.totalLife = n.userData.life + e), r = Math.min(1, (i - n.userData.life) / .22), a = Math.min(1, n.userData.life / .25), o = Math.max(0, Math.min(1, n.userData.life * .4)); n.material.opacity = o * r * a, n.material.transparent = !0; const h = Math.min(3, 1.2 / Math.max(n.userData.life, .05)); n.scale.setScalar(h), n.userData.life <= 0 && (this.particleGroup.remove(n), this._particles.splice(t, 1)) } } constructor(e) { super(), this.scene = e, this._initParticles(), this._mouseDown = !1, this.carModels = new Map, this.currentModel = null, this.loadCarModel(go[it.car.body]), this.ballCam = !0, this.Up = new L(0, 1, 0), this.forward = new L(0, 0, -1), this.rotation.x = Math.PI / 2, this._lastInertia = { x: "-", y: "-", z: "-" }, this.showLine = !1, this.showAxisOfRotationLine = !0, this.showTorus = !0, this.boostColour = 15592941, this.rotationVelocity = new L, this.rotationSpeed = it.car.rotationSpeed, this.maxRotationSpeed = it.car.maxRotationSpeed, this.airDragCoefficient = it.car.airDragCoefficient, this.airRollLeft = !0; const t = new Ut(it.camera.fov, window.innerWidth / window.innerHeight); this.LookAt = new L(0, 0, 0), t.position.set(0, 3, 7), t.lookAt(this.LookAt), this.camera = t, this.forwardArrow = new Hd(new L(0, 0, -1), new L(0, 0, 0), 2, "red", .1, .1), this.add(this.forwardArrow), this.forwardArrow.visible = this.showLine; const n = new Rt; n.setAttribute("position", new ut(new Float32Array(6), 3)), this._rotationLine = new ws(n, new br({ color: "blue" })), this._rotationLine.visible = !1, this.add(this._rotationLine), this._torusGeometry = new Bo(.6, .02, 32, 32), this._torusMaterial = new nn({ color: "magenta" }), this.torus = new Tt(this._torusGeometry, this._torusMaterial), this.torus.visible = !1, this.torus.rotation.x = E0(90), this.torusDrawOnTop = !1, this.add(this.torus), this.inertiaTimerX = 0, this.inertiaTimerY = 0, this.inertiaTimerZ = 0, this.lastInertiaX = 0, this.lastInertiaY = 0, this.lastInertiaZ = 0, this.input = { yawLeft: 0, yawRight: 0, pitchUp: 0, pitchDown: 0, rollLeft: 0, rollRight: 0, shiftHeld: !1 }, this.controllerDeadzone = .15, this.controllerDeadzoneType = "cross", this.controllerSensitivity = 1, this.gamepadIndex = null, window.addEventListener("gamepadconnected", i => this.gamepadIndex = i.gamepad.index), window.addEventListener("gamepaddisconnected", i => { this.gamepadIndex === i.gamepad.index && (this.gamepadIndex = null) }), this.airRollLeftButton = 2, this.airRollRightButton = 3, this.airRollFreeButton = 0, this.boostButton = 4, document.addEventListener("keydown", i => this.handleKey(i.code, !0)), document.addEventListener("keyup", i => this.handleKey(i.code, !1)), window.addEventListener("mousedown", i => { i.button === 0 && (this._mouseDown = !0) }), window.addEventListener("mouseup", i => { i.button === 0 && (this._mouseDown = !1) }) } setTorusDrawOnTop(e) { if (!this.torus) return; this._torusDrawOnTop = !!e, this.torus.renderOrder = this._torusDrawOnTop ? 1e3 : 0; const t = this.torus.material; t && (t.depthTest = !this._torusDrawOnTop, t.depthWrite = !this._torusDrawOnTop, t.needsUpdate = !0) } handleKey(e, t) { if (e === "ShiftLeft" || e === "ShiftRight") { this.input.shiftHeld = t, t ? (this.input.yawRight && (this.input.yawRight = 0, this.input.aHeld && (this.input.rollLeft = 1)), this.input.yawLeft && (this.input.yawLeft = 0, this.input.dHeld && (this.input.rollRight = 1))) : (this.input.rollLeft && (this.input.rollLeft = 0, this.input.aHeld && (this.input.yawRight = 1)), this.input.rollRight && (this.input.rollRight = 0, this.input.dHeld && (this.input.yawLeft = 1))); return } switch (e) { case "KeyA": this.input.aHeld = t, this.input.shiftHeld ? (this.input.rollLeft = t ? 1 : 0, t && (this.input.yawRight = 0)) : this.input.yawRight = t ? 1 : 0; break; case "KeyD": this.input.dHeld = t, this.input.shiftHeld ? (this.input.rollRight = t ? 1 : 0, t && (this.input.yawLeft = 0)) : this.input.yawLeft = t ? 1 : 0; break; case "KeyW": this.input.pitchDown = t ? 1 : 0; break; case "KeyS": this.input.pitchUp = t ? 1 : 0; break; case "ArrowUp": this.input.pitchDown = t ? 1 : 0; break; case "ArrowDown": this.input.pitchUp = t ? 1 : 0; break; case "KeyQ": this.input.rollLeft = t ? 1 : 0; break; case "KeyE": this.input.rollRight = t ? 1 : 0; break; case "ArrowLeft": this.input.rollLeft = t ? 1 : 0; break; case "ArrowRight": this.input.rollRight = t ? 1 : 0; break; case "Space": t && (this.ballCam = !this.ballCam); break } } handleController() { let e = 0, t = 0, n = 0, i = !1; if (this.gamepadIndex !== null) { const r = navigator.getGamepads()[this.gamepadIndex]; if (r && r.connected) { let a = r.axes[0], o = r.axes[1]; switch (this.controllerDeadzoneType) { case "circle": { ({ x: a, y: o } = T0(a, o, this.controllerDeadzone)), a *= this.controllerSensitivity, o *= this.controllerSensitivity; const d = Math.hypot(a, o); d > 1 && (a /= d, o /= d); break } case "cross": { a = Ii(a, this.controllerDeadzone), o = Ii(o, this.controllerDeadzone), a *= this.controllerSensitivity, o *= this.controllerSensitivity; const d = Math.hypot(a, o); d > 1 && (a /= d, o /= d); break } case "square": { a = Ii(r.axes[0], this.controllerDeadzone), o = Ii(r.axes[1], this.controllerDeadzone); const d = A0(a * this.controllerSensitivity, o * this.controllerSensitivity); a = d.x, o = d.y; break } default: { a = Ii(a, this.controllerDeadzone), o = Ii(o, this.controllerDeadzone); break } }e = Ni.clamp(o, -1, 1), t = -Ni.clamp(a, -1, 1); const l = r.buttons[this.airRollLeftButton]?.pressed, c = r.buttons[this.airRollRightButton]?.pressed, h = r.buttons[this.airRollFreeButton]?.pressed; i = r.buttons[this.boostButton]?.pressed, h ? (n = -t, t = 0) : l ? n = -1 : c && (n = 1) } } return { controller_pitch: this.input.pitchUp - this.input.pitchDown || e, controller_yaw: this.input.yawRight - this.input.yawLeft || t, controller_roll: this.input.rollRight - this.input.rollLeft || n, boostPressed: i } } applyInputs(e) { let { controller_yaw: t, controller_pitch: n, controller_roll: i, boostPressed: r } = this.handleController(); const a = new L; if (a.x = n, a.y = t, a.z = i, a.lengthSq() > 1 && a.normalize(), this.rotationVelocity.x += a.x * this.rotationSpeed.x * e, this.rotationVelocity.y += a.y * this.rotationSpeed.y * e, this.rotationVelocity.z += a.z * this.rotationSpeed.z * e, (this._mouseDown || r) && this.emitParticles(e), this.updateParticles(e), Math.abs(this.rotationVelocity.x) > .001 && n === 0 ? this.inertiaTimerX += e : this.inertiaTimerX > 0 && (this.lastInertiaX = this.inertiaTimerX, this.inertiaTimerX = 0), Math.abs(this.rotationVelocity.y) > .001 && t === 0 ? this.inertiaTimerY += e : this.inertiaTimerY > 0 && (this.lastInertiaY = this.inertiaTimerY, this.inertiaTimerY = 0), Math.abs(this.rotationVelocity.z) > .001 && i === 0 ? this.inertiaTimerZ += e : this.inertiaTimerZ > 0 && (this.lastInertiaZ = this.inertiaTimerZ, this.inertiaTimerZ = 0), typeof window < "u") { const d = document.getElementById("hud"); if (d) { const u = d.getContext("2d"); u.save(), u.clearRect(0, 0, 120, 200), u.font = "11px monospace", u.fillStyle = "black", u.textAlign = "left", u.textBaseline = "top"; const f = Math.abs(this.rotationVelocity.x) > 1e-6 ? 2 * Math.PI / Math.abs(this.rotationVelocity.x) : 1 / 0, g = Math.abs(this.rotationVelocity.y) > 1e-6 ? 2 * Math.PI / Math.abs(this.rotationVelocity.y) : 1 / 0, v = Math.abs(this.rotationVelocity.z) > 1e-6 ? 2 * Math.PI / Math.abs(this.rotationVelocity.z) : 1 / 0; u.fillText("Full rot (s):", 4, 4), u.fillText(`X: ${f === 1 / 0 ? "-" : f.toFixed(2)}`, 4, 16), u.fillText(`Y: ${g === 1 / 0 ? "-" : g.toFixed(2)}`, 4, 27), u.fillText(`Z: ${v === 1 / 0 ? "-" : v.toFixed(2)}`, 4, 38), u.fillText("Inertia (s):", 4, 50), u.fillText(`X: ${(this.inertiaTimerX > 0 ? this.inertiaTimerX : this.lastInertiaX) > 0 ? (this.inertiaTimerX > 0 ? this.inertiaTimerX : this.lastInertiaX).toFixed(2) : "-"}`, 4, 61), u.fillText(`Y: ${(this.inertiaTimerY > 0 ? this.inertiaTimerY : this.lastInertiaY) > 0 ? (this.inertiaTimerY > 0 ? this.inertiaTimerY : this.lastInertiaY).toFixed(2) : "-"}`, 4, 72), u.fillText(`Z: ${(this.inertiaTimerZ > 0 ? this.inertiaTimerZ : this.lastInertiaZ) > 0 ? (this.inertiaTimerZ > 0 ? this.inertiaTimerZ : this.lastInertiaZ).toFixed(2) : "-"}`, 4, 83), u.restore() } } const o = new L(this.airDragCoefficient.x, this.airDragCoefficient.y, this.airDragCoefficient.z); this.rotationVelocity.multiply(o), this.rotationVelocity.lengthSq() < .001 && this.rotationVelocity.set(0, 0, 0); const l = new Ue, c = new an().setFromEuler(new $t(this.rotationVelocity.x * e, this.rotationVelocity.y * e, -this.rotationVelocity.z * e)); l.makeRotationFromQuaternion(c), this.matrix.multiply(l), this.matrix.decompose(this.position, this.quaternion, this.scale), this.scale.set(1, 1, 1); const h = this.findAxisOfRotation(l); this.showAxisOfRotation(h) } findAxisOfRotation(e) { const t = new L, n = new De().setFromMatrix4(e), i = n.elements[0] + n.elements[4] + n.elements[8]; return Math.acos(Math.min(Math.max((i - 1) / 2, -1), 1)) > 1e-6 ? (t.set(n.elements[7] - n.elements[5], n.elements[2] - n.elements[6], n.elements[3] - n.elements[1]), t.normalize(), t.z > 0 && t.negate()) : t.set(0, 0, 1), t } showAxisOfRotation(e) { if (this._rotationLine) { const t = this._rotationLine.geometry.attributes.position.array; t[0] = 0, t[1] = 0, t[2] = 0; const n = e.multiplyScalar(2); if (t[3] = n.x, t[4] = n.y, t[5] = n.z, this._rotationLine.geometry.attributes.position.needsUpdate = !0, this._rotationLine.visible = this.showAxisOfRotationLine, this.showTorus) { const i = e.normalize(), r = Math.abs(this.forward.dot(i)), a = Math.sqrt(1 - r * r); this.createHelperTorus(i, a * 1.5 * it.car.torusBaseScale) } else this.torus.visible = !1, this.torus.scale.setScalar(0) } !this.showAxisOfRotationLine && this._rotationLine && (this._rotationLine.visible = !1) } createHelperTorus(e, t) { if (!this.torus) return; const n = e.clone().normalize(), i = n.clone().multiplyScalar(.9 - t * .2), r = new L(0, 0, 1), a = new an; r.dot(n) > .9999 ? a.identity() : r.dot(n) < -.9999 ? a.setFromAxisAngle(new L(1, 0, 0), Math.PI) : a.setFromUnitVectors(r, n), this.torus.position.copy(i), this.torus.quaternion.copy(a), typeof t == "number" && isFinite(t) && this.torus.scale.setScalar(Math.max(.01, t)), this.torus.visible = this.showTorus } updateVisibility() { this.forwardArrow.visible = this.showLine } getForwardLine() { const e = new L; this.getWorldPosition(e); const t = new L(0, 0, -1); return t.applyQuaternion(this.quaternion), new As(e, t.normalize()) } updateFov() { this.camera.fov = it.camera.fov, this.camera.updateProjectionMatrix() } updateCamera(e, t) { let n = new L, i = new L, r = new L(.15, .35, .15); const a = .008; this.ballCam ? (n.subVectors(e, this.position), n.normalize(), i = e.clone()) : (n.copy(this.forward), n.applyQuaternion(this.quaternion), n.normalize(), i = this.position.clone().add(this.Up.clone().multiplyScalar(it.camera.height))); let o = this.position.clone().sub(n.multiplyScalar(it.camera.distance)).add(this.Up.clone().multiplyScalar(it.camera.height)); this.ballCam ? this.camera.position.lerp(o, a) : w0(this.camera.position, o, r, a); const l = new L().lerpVectors(this.LookAt, i, a); this.camera.lookAt(l) } loadCarModel(e) { if (console.log("Loading car model:", e.name), !this.carModels.has(e.name)) { const t = new y0(this.scene, e); if (this.carModels.set(e.name, t), this.add(t), !this.currentModel) return this.currentModel = e.name, !0 } return !1 } switchCarModel(e) { if (this.currentModel === e) return !0; if (!this.carModels.has(e)) { console.warn(`Car model ${e} not loaded. Loading it now...`); const t = Object.values(go).find(n => n.name === e); if (!t) return console.error(`Car model ${e} not found in CAR_MODELS`), !1; this.loadCarModel(t) } return this.currentModel && (this.carModels.get(this.currentModel).visible = !1), this.carModels.get(e).visible = !0, this.currentModel = e, !0 } }/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.17.0
 * @author George Michael Brower
 * @license MIT
 */class xn { constructor(e, t, n, i, r = "div") { this.parent = e, this.object = t, this.property = n, this._disabled = !1, this._hidden = !1, this.initialValue = this.getValue(), this.domElement = document.createElement("div"), this.domElement.classList.add("controller"), this.domElement.classList.add(i), this.$name = document.createElement("div"), this.$name.classList.add("name"), xn.nextNameID = xn.nextNameID || 0, this.$name.id = "lil-gui-name-" + ++xn.nextNameID, this.$widget = document.createElement(r), this.$widget.classList.add("widget"), this.$disable = this.$widget, this.domElement.appendChild(this.$name), this.domElement.appendChild(this.$widget), this.parent.children.push(this), this.parent.controllers.push(this), this.parent.$children.appendChild(this.domElement), this._listenCallback = this._listenCallback.bind(this), this.name(n) } name(e) { return this._name = e, this.$name.innerHTML = e, this } onChange(e) { return this._onChange = e, this } _callOnChange() { this.parent._callOnChange(this), this._onChange !== void 0 && this._onChange.call(this, this.getValue()), this._changed = !0 } onFinishChange(e) { return this._onFinishChange = e, this } _callOnFinishChange() { this._changed && (this.parent._callOnFinishChange(this), this._onFinishChange !== void 0 && this._onFinishChange.call(this, this.getValue())), this._changed = !1 } reset() { return this.setValue(this.initialValue), this._callOnFinishChange(), this } enable(e = !0) { return this.disable(!e) } disable(e = !0) { return e === this._disabled || (this._disabled = e, this.domElement.classList.toggle("disabled", e), this.$disable.toggleAttribute("disabled", e)), this } show(e = !0) { return this._hidden = !e, this.domElement.style.display = this._hidden ? "none" : "", this } hide() { return this.show(!1) } options(e) { const t = this.parent.add(this.object, this.property, e); return t.name(this._name), this.destroy(), t } min(e) { return this } max(e) { return this } step(e) { return this } decimals(e) { return this } listen(e = !0) { return this._listening = e, this._listenCallbackID !== void 0 && (cancelAnimationFrame(this._listenCallbackID), this._listenCallbackID = void 0), this._listening && this._listenCallback(), this } _listenCallback() { this._listenCallbackID = requestAnimationFrame(this._listenCallback); const e = this.save(); e !== this._listenPrevValue && this.updateDisplay(), this._listenPrevValue = e } getValue() { return this.object[this.property] } setValue(e) { return this.object[this.property] = e, this._callOnChange(), this.updateDisplay(), this } updateDisplay() { return this } load(e) { return this.setValue(e), this._callOnFinishChange(), this } save() { return this.getValue() } destroy() { this.listen(!1), this.parent.children.splice(this.parent.children.indexOf(this), 1), this.parent.controllers.splice(this.parent.controllers.indexOf(this), 1), this.parent.$children.removeChild(this.domElement) } } class C0 extends xn { constructor(e, t, n) { super(e, t, n, "boolean", "label"), this.$input = document.createElement("input"), this.$input.setAttribute("type", "checkbox"), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$widget.appendChild(this.$input), this.$input.addEventListener("change", () => { this.setValue(this.$input.checked), this._callOnFinishChange() }), this.$disable = this.$input, this.updateDisplay() } updateDisplay() { return this.$input.checked = this.getValue(), this } } function _o(s) { let e, t; return (e = s.match(/(#|0x)?([a-f0-9]{6})/i)) ? t = e[2] : (e = s.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/)) ? t = parseInt(e[1]).toString(16).padStart(2, 0) + parseInt(e[2]).toString(16).padStart(2, 0) + parseInt(e[3]).toString(16).padStart(2, 0) : (e = s.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i)) && (t = e[1] + e[1] + e[2] + e[2] + e[3] + e[3]), !!t && "#" + t } const P0 = { isPrimitive: !0, match: s => typeof s == "string", fromHexString: _o, toHexString: _o }, Es = { isPrimitive: !0, match: s => typeof s == "number", fromHexString: s => parseInt(s.substring(1), 16), toHexString: s => "#" + s.toString(16).padStart(6, 0) }, L0 = { isPrimitive: !1, match: Array.isArray, fromHexString(s, e, t = 1) { const n = Es.fromHexString(s); e[0] = (n >> 16 & 255) / 255 * t, e[1] = (n >> 8 & 255) / 255 * t, e[2] = (255 & n) / 255 * t }, toHexString: ([s, e, t], n = 1) => Es.toHexString(s * (n = 255 / n) << 16 ^ e * n << 8 ^ t * n << 0) }, I0 = { isPrimitive: !1, match: s => Object(s) === s, fromHexString(s, e, t = 1) { const n = Es.fromHexString(s); e.r = (n >> 16 & 255) / 255 * t, e.g = (n >> 8 & 255) / 255 * t, e.b = (255 & n) / 255 * t }, toHexString: ({ r: s, g: e, b: t }, n = 1) => Es.toHexString(s * (n = 255 / n) << 16 ^ e * n << 8 ^ t * n << 0) }, D0 = [P0, Es, L0, I0]; class N0 extends xn { constructor(e, t, n, i) { var r; super(e, t, n, "color"), this.$input = document.createElement("input"), this.$input.setAttribute("type", "color"), this.$input.setAttribute("tabindex", -1), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$text = document.createElement("input"), this.$text.setAttribute("type", "text"), this.$text.setAttribute("spellcheck", "false"), this.$text.setAttribute("aria-labelledby", this.$name.id), this.$display = document.createElement("div"), this.$display.classList.add("display"), this.$display.appendChild(this.$input), this.$widget.appendChild(this.$display), this.$widget.appendChild(this.$text), this._format = (r = this.initialValue, D0.find(a => a.match(r))), this._rgbScale = i, this._initialValueHexString = this.save(), this._textFocused = !1, this.$input.addEventListener("input", () => { this._setValueFromHexString(this.$input.value) }), this.$input.addEventListener("blur", () => { this._callOnFinishChange() }), this.$text.addEventListener("input", () => { const a = _o(this.$text.value); a && this._setValueFromHexString(a) }), this.$text.addEventListener("focus", () => { this._textFocused = !0, this.$text.select() }), this.$text.addEventListener("blur", () => { this._textFocused = !1, this.updateDisplay(), this._callOnFinishChange() }), this.$disable = this.$text, this.updateDisplay() } reset() { return this._setValueFromHexString(this._initialValueHexString), this } _setValueFromHexString(e) { if (this._format.isPrimitive) { const t = this._format.fromHexString(e); this.setValue(t) } else this._format.fromHexString(e, this.getValue(), this._rgbScale), this._callOnChange(), this.updateDisplay() } save() { return this._format.toHexString(this.getValue(), this._rgbScale) } load(e) { return this._setValueFromHexString(e), this._callOnFinishChange(), this } updateDisplay() { return this.$input.value = this._format.toHexString(this.getValue(), this._rgbScale), this._textFocused || (this.$text.value = this.$input.value.substring(1)), this.$display.style.backgroundColor = this.$input.value, this } } class xa extends xn { constructor(e, t, n) { super(e, t, n, "function"), this.$button = document.createElement("button"), this.$button.appendChild(this.$name), this.$widget.appendChild(this.$button), this.$button.addEventListener("click", i => { i.preventDefault(), this.getValue().call(this.object) }), this.$button.addEventListener("touchstart", () => { }, { passive: !0 }), this.$disable = this.$button } } class U0 extends xn { constructor(e, t, n, i, r, a) { super(e, t, n, "number"), this._initInput(), this.min(i), this.max(r); const o = a !== void 0; this.step(o ? a : this._getImplicitStep(), o), this.updateDisplay() } decimals(e) { return this._decimals = e, this.updateDisplay(), this } min(e) { return this._min = e, this._onUpdateMinMax(), this } max(e) { return this._max = e, this._onUpdateMinMax(), this } step(e, t = !0) { return this._step = e, this._stepExplicit = t, this } updateDisplay() { const e = this.getValue(); if (this._hasSlider) { let t = (e - this._min) / (this._max - this._min); t = Math.max(0, Math.min(t, 1)), this.$fill.style.width = 100 * t + "%" } return this._inputFocused || (this.$input.value = this._decimals === void 0 ? e : e.toFixed(this._decimals)), this } _initInput() { this.$input = document.createElement("input"), this.$input.setAttribute("type", "number"), this.$input.setAttribute("step", "any"), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$widget.appendChild(this.$input), this.$disable = this.$input; const e = h => { const d = parseFloat(this.$input.value); isNaN(d) || (this._snapClampSetValue(d + h), this.$input.value = this.getValue()) }; let t, n, i, r, a, o = !1; const l = h => { if (o) { const d = h.clientX - t, u = h.clientY - n; Math.abs(u) > 5 ? (h.preventDefault(), this.$input.blur(), o = !1, this._setDraggingStyle(!0, "vertical")) : Math.abs(d) > 5 && c() } if (!o) { const d = h.clientY - i; a -= d * this._step * this._arrowKeyMultiplier(h), r + a > this._max ? a = this._max - r : r + a < this._min && (a = this._min - r), this._snapClampSetValue(r + a) } i = h.clientY }, c = () => { this._setDraggingStyle(!1, "vertical"), this._callOnFinishChange(), window.removeEventListener("mousemove", l), window.removeEventListener("mouseup", c) }; this.$input.addEventListener("input", () => { let h = parseFloat(this.$input.value); isNaN(h) || (this._stepExplicit && (h = this._snap(h)), this.setValue(this._clamp(h))) }), this.$input.addEventListener("keydown", h => { h.code === "Enter" && this.$input.blur(), h.code === "ArrowUp" && (h.preventDefault(), e(this._step * this._arrowKeyMultiplier(h))), h.code === "ArrowDown" && (h.preventDefault(), e(this._step * this._arrowKeyMultiplier(h) * -1)) }), this.$input.addEventListener("wheel", h => { this._inputFocused && (h.preventDefault(), e(this._step * this._normalizeMouseWheel(h))) }, { passive: !1 }), this.$input.addEventListener("mousedown", h => { t = h.clientX, n = i = h.clientY, o = !0, r = this.getValue(), a = 0, window.addEventListener("mousemove", l), window.addEventListener("mouseup", c) }), this.$input.addEventListener("focus", () => { this._inputFocused = !0 }), this.$input.addEventListener("blur", () => { this._inputFocused = !1, this.updateDisplay(), this._callOnFinishChange() }) } _initSlider() { this._hasSlider = !0, this.$slider = document.createElement("div"), this.$slider.classList.add("slider"), this.$fill = document.createElement("div"), this.$fill.classList.add("fill"), this.$slider.appendChild(this.$fill), this.$widget.insertBefore(this.$slider, this.$input), this.domElement.classList.add("hasSlider"); const e = u => { const f = this.$slider.getBoundingClientRect(); let g = (v = u, m = f.left, p = f.right, M = this._min, E = this._max, (v - m) / (p - m) * (E - M) + M); var v, m, p, M, E; this._snapClampSetValue(g) }, t = u => { e(u.clientX) }, n = () => { this._callOnFinishChange(), this._setDraggingStyle(!1), window.removeEventListener("mousemove", t), window.removeEventListener("mouseup", n) }; let i, r, a = !1; const o = u => { u.preventDefault(), this._setDraggingStyle(!0), e(u.touches[0].clientX), a = !1 }, l = u => { if (a) { const f = u.touches[0].clientX - i, g = u.touches[0].clientY - r; Math.abs(f) > Math.abs(g) ? o(u) : (window.removeEventListener("touchmove", l), window.removeEventListener("touchend", c)) } else u.preventDefault(), e(u.touches[0].clientX) }, c = () => { this._callOnFinishChange(), this._setDraggingStyle(!1), window.removeEventListener("touchmove", l), window.removeEventListener("touchend", c) }, h = this._callOnFinishChange.bind(this); let d; this.$slider.addEventListener("mousedown", u => { this._setDraggingStyle(!0), e(u.clientX), window.addEventListener("mousemove", t), window.addEventListener("mouseup", n) }), this.$slider.addEventListener("touchstart", u => { u.touches.length > 1 || (this._hasScrollBar ? (i = u.touches[0].clientX, r = u.touches[0].clientY, a = !0) : o(u), window.addEventListener("touchmove", l, { passive: !1 }), window.addEventListener("touchend", c)) }, { passive: !1 }), this.$slider.addEventListener("wheel", u => { if (Math.abs(u.deltaX) < Math.abs(u.deltaY) && this._hasScrollBar) return; u.preventDefault(); const f = this._normalizeMouseWheel(u) * this._step; this._snapClampSetValue(this.getValue() + f), this.$input.value = this.getValue(), clearTimeout(d), d = setTimeout(h, 400) }, { passive: !1 }) } _setDraggingStyle(e, t = "horizontal") { this.$slider && this.$slider.classList.toggle("active", e), document.body.classList.toggle("lil-gui-dragging", e), document.body.classList.toggle("lil-gui-" + t, e) } _getImplicitStep() { return this._hasMin && this._hasMax ? (this._max - this._min) / 1e3 : .1 } _onUpdateMinMax() { !this._hasSlider && this._hasMin && this._hasMax && (this._stepExplicit || this.step(this._getImplicitStep(), !1), this._initSlider(), this.updateDisplay()) } _normalizeMouseWheel(e) { let { deltaX: t, deltaY: n } = e; return Math.floor(e.deltaY) !== e.deltaY && e.wheelDelta && (t = 0, n = -e.wheelDelta / 120, n *= this._stepExplicit ? 1 : 10), t + -n } _arrowKeyMultiplier(e) { let t = this._stepExplicit ? 1 : 10; return e.shiftKey ? t *= 10 : e.altKey && (t /= 10), t } _snap(e) { const t = Math.round(e / this._step) * this._step; return parseFloat(t.toPrecision(15)) } _clamp(e) { return e < this._min && (e = this._min), e > this._max && (e = this._max), e } _snapClampSetValue(e) { this.setValue(this._clamp(this._snap(e))) } get _hasScrollBar() { const e = this.parent.root.$children; return e.scrollHeight > e.clientHeight } get _hasMin() { return this._min !== void 0 } get _hasMax() { return this._max !== void 0 } } class F0 extends xn { constructor(e, t, n, i) { super(e, t, n, "option"), this.$select = document.createElement("select"), this.$select.setAttribute("aria-labelledby", this.$name.id), this.$display = document.createElement("div"), this.$display.classList.add("display"), this._values = Array.isArray(i) ? i : Object.values(i), this._names = Array.isArray(i) ? i : Object.keys(i), this._names.forEach(r => { const a = document.createElement("option"); a.innerHTML = r, this.$select.appendChild(a) }), this.$select.addEventListener("change", () => { this.setValue(this._values[this.$select.selectedIndex]), this._callOnFinishChange() }), this.$select.addEventListener("focus", () => { this.$display.classList.add("focus") }), this.$select.addEventListener("blur", () => { this.$display.classList.remove("focus") }), this.$widget.appendChild(this.$select), this.$widget.appendChild(this.$display), this.$disable = this.$select, this.updateDisplay() } updateDisplay() { const e = this.getValue(), t = this._values.indexOf(e); return this.$select.selectedIndex = t, this.$display.innerHTML = t === -1 ? e : this._names[t], this } } class O0 extends xn { constructor(e, t, n) { super(e, t, n, "string"), this.$input = document.createElement("input"), this.$input.setAttribute("type", "text"), this.$input.setAttribute("aria-labelledby", this.$name.id), this.$input.addEventListener("input", () => { this.setValue(this.$input.value) }), this.$input.addEventListener("keydown", i => { i.code === "Enter" && this.$input.blur() }), this.$input.addEventListener("blur", () => { this._callOnFinishChange() }), this.$widget.appendChild(this.$input), this.$disable = this.$input, this.updateDisplay() } updateDisplay() { return this.$input.value = this.getValue(), this } } let Ec = !1; class Go {
	constructor({ parent: e, autoPlace: t = e === void 0, container: n, width: i, title: r = "Controls", injectStyles: a = !0, touchStyles: o = !0 } = {}) { if (this.parent = e, this.root = e ? e.root : this, this.children = [], this.controllers = [], this.folders = [], this._closed = !1, this._hidden = !1, this.domElement = document.createElement("div"), this.domElement.classList.add("lil-gui"), this.$title = document.createElement("div"), this.$title.classList.add("title"), this.$title.setAttribute("role", "button"), this.$title.setAttribute("aria-expanded", !0), this.$title.setAttribute("tabindex", 0), this.$title.addEventListener("click", () => this.openAnimated(this._closed)), this.$title.addEventListener("keydown", l => { l.code !== "Enter" && l.code !== "Space" || (l.preventDefault(), this.$title.click()) }), this.$title.addEventListener("touchstart", () => { }, { passive: !0 }), this.$children = document.createElement("div"), this.$children.classList.add("children"), this.domElement.appendChild(this.$title), this.domElement.appendChild(this.$children), this.title(r), o && this.domElement.classList.add("allow-touch-styles"), this.parent) return this.parent.children.push(this), this.parent.folders.push(this), void this.parent.$children.appendChild(this.domElement); this.domElement.classList.add("root"), !Ec && a && ((function (l) { const c = document.createElement("style"); c.innerHTML = l; const h = document.querySelector("head link[rel=stylesheet], head style"); h ? document.head.insertBefore(c, h) : document.head.appendChild(c) })('.lil-gui{--background-color:#1f1f1f;--text-color:#ebebeb;--title-background-color:#111;--title-text-color:#ebebeb;--widget-color:#424242;--hover-color:#4f4f4f;--focus-color:#595959;--number-color:#2cc9ff;--string-color:#a2db3c;--font-size:11px;--input-font-size:11px;--font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;--font-family-mono:Menlo,Monaco,Consolas,"Droid Sans Mono",monospace;--padding:4px;--spacing:4px;--widget-height:20px;--name-width:45%;--slider-knob-width:2px;--slider-input-width:27%;--color-input-width:27%;--slider-input-min-width:45px;--color-input-min-width:45px;--folder-indent:7px;--widget-padding:0 0 0 3px;--widget-border-radius:2px;--checkbox-size:calc(var(--widget-height)*0.75);--scrollbar-width:5px;background-color:var(--background-color);color:var(--text-color);font-family:var(--font-family);font-size:var(--font-size);font-style:normal;font-weight:400;line-height:1;text-align:left;touch-action:manipulation;user-select:none;-webkit-user-select:none}.lil-gui,.lil-gui *{box-sizing:border-box;margin:0;padding:0}.lil-gui.root{display:flex;flex-direction:column;width:var(--width,245px)}.lil-gui.root>.title{background:var(--title-background-color);color:var(--title-text-color)}.lil-gui.root>.children{overflow-x:hidden;overflow-y:auto}.lil-gui.root>.children::-webkit-scrollbar{background:var(--background-color);height:var(--scrollbar-width);width:var(--scrollbar-width)}.lil-gui.root>.children::-webkit-scrollbar-thumb{background:var(--focus-color);border-radius:var(--scrollbar-width)}.lil-gui.force-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}.lil-gui.autoPlace{max-height:100%;position:fixed;right:15px;top:0;z-index:1001}.lil-gui .controller{align-items:center;display:flex;margin:var(--spacing) 0;padding:0 var(--padding)}.lil-gui .controller.disabled{opacity:.5}.lil-gui .controller.disabled,.lil-gui .controller.disabled *{pointer-events:none!important}.lil-gui .controller>.name{flex-shrink:0;line-height:var(--widget-height);min-width:var(--name-width);padding-right:var(--spacing);white-space:pre}.lil-gui .controller .widget{align-items:center;display:flex;min-height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.string input{color:var(--string-color)}.lil-gui .controller.boolean .widget{cursor:pointer}.lil-gui .controller.color .display{border-radius:var(--widget-border-radius);height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.color input[type=color]{cursor:pointer;height:100%;opacity:0;width:100%}.lil-gui .controller.color input[type=text]{flex-shrink:0;font-family:var(--font-family-mono);margin-left:var(--spacing);min-width:var(--color-input-min-width);width:var(--color-input-width)}.lil-gui .controller.option select{max-width:100%;opacity:0;position:absolute;width:100%}.lil-gui .controller.option .display{background:var(--widget-color);border-radius:var(--widget-border-radius);height:var(--widget-height);line-height:var(--widget-height);max-width:100%;overflow:hidden;padding-left:.55em;padding-right:1.75em;pointer-events:none;position:relative;word-break:break-all}.lil-gui .controller.option .display.active{background:var(--focus-color)}.lil-gui .controller.option .display:after{bottom:0;content:"↕";font-family:lil-gui;padding-right:.375em;position:absolute;right:0;top:0}.lil-gui .controller.option .widget,.lil-gui .controller.option select{cursor:pointer}.lil-gui .controller.number input{color:var(--number-color)}.lil-gui .controller.number.hasSlider input{flex-shrink:0;margin-left:var(--spacing);min-width:var(--slider-input-min-width);width:var(--slider-input-width)}.lil-gui .controller.number .slider{background-color:var(--widget-color);border-radius:var(--widget-border-radius);cursor:ew-resize;height:var(--widget-height);overflow:hidden;padding-right:var(--slider-knob-width);touch-action:pan-y;width:100%}.lil-gui .controller.number .slider.active{background-color:var(--focus-color)}.lil-gui .controller.number .slider.active .fill{opacity:.95}.lil-gui .controller.number .fill{border-right:var(--slider-knob-width) solid var(--number-color);box-sizing:content-box;height:100%}.lil-gui-dragging .lil-gui{--hover-color:var(--widget-color)}.lil-gui-dragging *{cursor:ew-resize!important}.lil-gui-dragging.lil-gui-vertical *{cursor:ns-resize!important}.lil-gui .title{--title-height:calc(var(--widget-height) + var(--spacing)*1.25);-webkit-tap-highlight-color:transparent;text-decoration-skip:objects;cursor:pointer;font-weight:600;height:var(--title-height);line-height:calc(var(--title-height) - 4px);outline:none;padding:0 var(--padding)}.lil-gui .title:before{content:"▾";display:inline-block;font-family:lil-gui;padding-right:2px}.lil-gui .title:active{background:var(--title-background-color);opacity:.75}.lil-gui.root>.title:focus{text-decoration:none!important}.lil-gui.closed>.title:before{content:"▸"}.lil-gui.closed>.children{opacity:0;transform:translateY(-7px)}.lil-gui.closed:not(.transition)>.children{display:none}.lil-gui.transition>.children{overflow:hidden;pointer-events:none;transition-duration:.3s;transition-property:height,opacity,transform;transition-timing-function:cubic-bezier(.2,.6,.35,1)}.lil-gui .children:empty:before{content:"Empty";display:block;font-style:italic;height:var(--widget-height);line-height:var(--widget-height);margin:var(--spacing) 0;opacity:.5;padding:0 var(--padding)}.lil-gui.root>.children>.lil-gui>.title{border-width:0;border-bottom:1px solid var(--widget-color);border-left:0 solid var(--widget-color);border-right:0 solid var(--widget-color);border-top:1px solid var(--widget-color);transition:border-color .3s}.lil-gui.root>.children>.lil-gui.closed>.title{border-bottom-color:transparent}.lil-gui+.controller{border-top:1px solid var(--widget-color);margin-top:0;padding-top:var(--spacing)}.lil-gui .lil-gui .lil-gui>.title{border:none}.lil-gui .lil-gui .lil-gui>.children{border:none;border-left:2px solid var(--widget-color);margin-left:var(--folder-indent)}.lil-gui .lil-gui .controller{border:none}.lil-gui input{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:0;border-radius:var(--widget-border-radius);color:var(--text-color);font-family:var(--font-family);font-size:var(--input-font-size);height:var(--widget-height);outline:none;width:100%}.lil-gui input:disabled{opacity:1}.lil-gui input[type=number],.lil-gui input[type=text]{padding:var(--widget-padding)}.lil-gui input[type=number]:focus,.lil-gui input[type=text]:focus{background:var(--focus-color)}.lil-gui input::-webkit-inner-spin-button,.lil-gui input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.lil-gui input[type=number]{-moz-appearance:textfield}.lil-gui input[type=checkbox]{appearance:none;-webkit-appearance:none;border-radius:var(--widget-border-radius);cursor:pointer;height:var(--checkbox-size);text-align:center;width:var(--checkbox-size)}.lil-gui input[type=checkbox]:checked:before{content:"✓";font-family:lil-gui;font-size:var(--checkbox-size);line-height:var(--checkbox-size)}.lil-gui button{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:1px solid var(--widget-color);border-radius:var(--widget-border-radius);color:var(--text-color);cursor:pointer;font-family:var(--font-family);font-size:var(--font-size);height:var(--widget-height);line-height:calc(var(--widget-height) - 4px);outline:none;text-align:center;text-transform:none;width:100%}.lil-gui button:active{background:var(--focus-color)}@font-face{font-family:lil-gui;src:url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff")}@media (pointer:coarse){.lil-gui.allow-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}}@media (hover:hover){.lil-gui .controller.color .display:hover:before{border:1px solid #fff9;border-radius:var(--widget-border-radius);bottom:0;content:" ";display:block;left:0;position:absolute;right:0;top:0}.lil-gui .controller.option .display.focus{background:var(--focus-color)}.lil-gui .controller.option .widget:hover .display{background:var(--hover-color)}.lil-gui .controller.number .slider:hover{background-color:var(--hover-color)}body:not(.lil-gui-dragging) .lil-gui .title:hover{background:var(--title-background-color);opacity:.85}.lil-gui .title:focus{text-decoration:underline var(--focus-color)}.lil-gui input:hover{background:var(--hover-color)}.lil-gui input:active{background:var(--focus-color)}.lil-gui input[type=checkbox]:focus{box-shadow:inset 0 0 0 1px var(--focus-color)}.lil-gui button:hover{background:var(--hover-color);border-color:var(--hover-color)}.lil-gui button:focus{border-color:var(--focus-color)}}'), Ec = !0), n ? n.appendChild(this.domElement) : t && (this.domElement.classList.add("autoPlace"), document.body.appendChild(this.domElement)), i && this.domElement.style.setProperty("--width", i + "px"), this.domElement.addEventListener("keydown", l => l.stopPropagation()), this.domElement.addEventListener("keyup", l => l.stopPropagation()) } add(e, t, n, i, r) {
		if (Object(n) === n) return new F0(this, e, t, n); const a = e[t]; switch (typeof a) { case "number": return new U0(this, e, t, n, i, r); case "boolean": return new C0(this, e, t); case "string": return new O0(this, e, t); case "function": return new xa(this, e, t) }console.error(`gui.add failed
	property:`, t, `
	object:`, e, `
	value:`, a)
	} addColor(e, t, n = 1) { return new N0(this, e, t, n) } addFolder(e) { return new Go({ parent: this, title: e }) } load(e, t = !0) { return e.controllers && this.controllers.forEach(n => { n instanceof xa || n._name in e.controllers && n.load(e.controllers[n._name]) }), t && e.folders && this.folders.forEach(n => { n._title in e.folders && n.load(e.folders[n._title]) }), this } save(e = !0) { const t = { controllers: {}, folders: {} }; return this.controllers.forEach(n => { if (!(n instanceof xa)) { if (n._name in t.controllers) throw new Error(`Cannot save GUI with duplicate property "${n._name}"`); t.controllers[n._name] = n.save() } }), e && this.folders.forEach(n => { if (n._title in t.folders) throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`); t.folders[n._title] = n.save() }), t } open(e = !0) { return this._closed = !e, this.$title.setAttribute("aria-expanded", !this._closed), this.domElement.classList.toggle("closed", this._closed), this } close() { return this.open(!1) } show(e = !0) { return this._hidden = !e, this.domElement.style.display = this._hidden ? "none" : "", this } hide() { return this.show(!1) } openAnimated(e = !0) { return this._closed = !e, this.$title.setAttribute("aria-expanded", !this._closed), requestAnimationFrame(() => { const t = this.$children.clientHeight; this.$children.style.height = t + "px", this.domElement.classList.add("transition"); const n = r => { r.target === this.$children && (this.$children.style.height = "", this.domElement.classList.remove("transition"), this.$children.removeEventListener("transitionend", n)) }; this.$children.addEventListener("transitionend", n); const i = e ? this.$children.scrollHeight : 0; this.domElement.classList.toggle("closed", !e), requestAnimationFrame(() => { this.$children.style.height = i + "px" }) }), this } title(e) { return this._title = e, this.$title.innerHTML = e, this } reset(e = !0) { return (e ? this.controllersRecursive() : this.controllers).forEach(t => t.reset()), this } onChange(e) { return this._onChange = e, this } _callOnChange(e) { this.parent && this.parent._callOnChange(e), this._onChange !== void 0 && this._onChange.call(this, { object: e.object, property: e.property, value: e.getValue(), controller: e }) } onFinishChange(e) { return this._onFinishChange = e, this } _callOnFinishChange(e) { this.parent && this.parent._callOnFinishChange(e), this._onFinishChange !== void 0 && this._onFinishChange.call(this, { object: e.object, property: e.property, value: e.getValue(), controller: e }) } destroy() { this.parent && (this.parent.children.splice(this.parent.children.indexOf(this), 1), this.parent.folders.splice(this.parent.folders.indexOf(this), 1)), this.domElement.parentElement && this.domElement.parentElement.removeChild(this.domElement), Array.from(this.children).forEach(e => e.destroy()) } controllersRecursive() { let e = Array.from(this.controllers); return this.folders.forEach(t => { e = e.concat(t.controllersRecursive()) }), e } foldersRecursive() { let e = Array.from(this.folders); return this.folders.forEach(t => { e = e.concat(t.foldersRecursive()) }), e }
} function B0(s) { const e = localStorage.getItem("gui-preset"); if (e) { const t = JSON.parse(e); s.load(t) } console.log("Preset loaded from localStorage") } function z0(s, e, t) { s ? (t.setClearColor(65280), e.visible = !1) : (t.setClearColor("darkgrey"), e.visible = !0) } function k0(s, e, t, n) { const i = new Go, r = i.addFolder("World"); r.add(it.world, "gameSpeed", 0, 1).name("Game Speed"), r.add({ youtuberMode: !1 }, "youtuberMode").name("Youtuber Mode").onChange(x => { z0(x, t, n) }); const a = i.addFolder("Controller"); a.add(s, "airRollLeftButton", { A: 0, B: 1, X: 2, Y: 3, LB: 4, RB: 5, LT: 6, RT: 7, Back: 8, Start: 9, LStick: 10, RStick: 11, DPadUp: 12, DPadDown: 13, DPadLeft: 14, DPadRight: 15 }).name("Air Roll Left Button"), a.add(s, "airRollRightButton", { A: 0, B: 1, X: 2, Y: 3, LB: 4, RB: 5, LT: 6, RT: 7, Back: 8, Start: 9, LStick: 10, RStick: 11, DPadUp: 12, DPadDown: 13, DPadLeft: 14, DPadRight: 15 }).name("Air Roll Right Button"), a.add(s, "airRollFreeButton", { A: 0, B: 1, X: 2, Y: 3, LB: 4, RB: 5, LT: 6, RT: 7, Back: 8, Start: 9, LStick: 10, RStick: 11, DPadUp: 12, DPadDown: 13, DPadLeft: 14, DPadRight: 15 }).name("Free Air Roll Button"), a.add(s, "boostButton", { LB: 4, RB: 5, A: 0, B: 1, X: 2, Y: 3, LT: 6, RT: 7, Back: 8, Start: 9, LStick: 10, RStick: 11, DPadUp: 12, DPadDown: 13, DPadLeft: 14, DPadRight: 15 }).name("Boost Button"); const o = document.getElementById("deadzone"); o.style.display = "none"; const l = { showDeadzone: !1 }; a.add(l, "showDeadzone").name("Show Deadzone").onChange(x => { o.style.display = x ? "block" : "none" }), a.add(s, "controllerDeadzone", 0, 1).name("Deadzone Size"), a.add(s, "controllerDeadzoneType", ["cross", "square", "circle"]).name("Deadzone Type"), a.add(s, "controllerSensitivity", .1, 5).name("Sensitivity"); const c = i.addFolder("Car"); c.add(it.car, "body", Object.keys(go)).name("Car Body").onChange(x => console.log(s.switchCarModel(x))); const h = c.addFolder("Visuals"); h.add(s, "showLine").name("Show Forward Axis").onChange(() => s.updateVisibility()), h.add(s, "showAxisOfRotationLine").name("Show Axis of Rotation"); const d = h.addFolder("Helper Donut"); d.add(s, "showTorus").name("Show Helper Donut"), d.add(s, "torusDrawOnTop").name("Always On Top").onChange(x => s.setTorusDrawOnTop(x)), d.add(it.car, "torusBaseScale", 0, 2).name("Donut Scale"); const u = { color: "#ff00ff" }; d.addColor(u, "color").name("Donut Color").onChange(x => { s._torusMaterial && s._torusMaterial.color.set(x) }); const f = { color: "#ededed" }; c.addColor(f, "color").name("Boost Color").onChange(x => { typeof x == "string" ? s.boostColour = parseInt(x.replace("#", "0x"), 16) : s.boostColour = x }); const g = c.addFolder("Physics"), v = g.addFolder("Pitch"); v.add(s.rotationSpeed, "x", 0, 100).name("Pitch Rotation Speed"), v.add(s.airDragCoefficient, "x", .95, 1).name("Pitch Drag"), v.add(s.maxRotationSpeed, "x", 0, 100).name("Pitch Max Speed"); const m = g.addFolder("Yaw"); m.add(s.rotationSpeed, "y", 0, 100).name("Yaw Rotation Speed"), m.add(s.airDragCoefficient, "y", .95, 1).name("Yaw Drag"), m.add(s.maxRotationSpeed, "y", 0, 100).name("Yaw Max Speed"); const p = g.addFolder("Roll"); p.add(s.rotationSpeed, "z", 0, 100).name("Roll Rotation Speed"), p.add(s.airDragCoefficient, "z", .95, 1).name("Roll Drag"), p.add(s.maxRotationSpeed, "z", 0, 100).name("Roll Max Speed"), g.close(); const M = i.addFolder("Ball"), E = { visible: !0 }; M.add(E, "visible").name("Show Ball").onChange(x => { e.visible = x }), M.add(it.ball, "randomizerPreset", ["default", "vertical"]).name("Randomizer Preset"), M.add(it.ball, "scale", 0, 5).name("Ball Scale").onChange(x => e.updateBallScale(x)), M.add(it.ball, "hitWindowDuration", .01, 5).name("Hit Window Duration (s)"); const y = M.addFolder("Movement"); y.add(e, "_randomMoveEnabled").name("Random Ball Movement"), y.add(e, "flowySpeed", .1, 10).name("Flowy Speed"); const w = M.addFolder("Timeout"); w.add(it.ball, "timeout").name("Timeout"), w.add(it.ball, "chaseTimeout", .1, 5).name("Chase Timeout (s)"); const A = i.addFolder("Camera"); A.add(s, "ballCam").name("Ball Camera"), A.add(it.camera, "fov", 0, 180).name("Field of View").onChange(() => s.updateFov()), A.add(it.camera, "distance", 0, 10).name("Distance"), A.add(it.camera, "height", 0, 10).name("Height"), A.close(); const C = { savePreset: () => { const x = i.save(); localStorage.setItem("gui-preset", JSON.stringify(x)), console.log("Preset saved to localStorage") }, resetPreset: () => { i.reset(), localStorage.removeItem("gui-preset") } }; i.add(C, "savePreset").name("Save Parameters"), i.add(C, "resetPreset").name("Reset Parameters"), window.onload = B0(i) } const mh = document.getElementById("three-container"), Ps = new ms; mh.append(Ps.dom); Ps.dom.style.position = "absolute"; Ps.dom.style.top = "8px"; Ps.dom.style.left = "8px"; const fi = new O_({ antialias: !0 }); fi.setPixelRatio(window.devicePixelRatio); fi.setSize(window.innerWidth, window.innerHeight); fi.setClearColor("darkgrey"); mh.appendChild(fi.domElement); const Dn = new Bu; function V0() { const s = new pr; s.position.set(1, 1, 1), Dn.add(s); const e = new pr; e.position.set(-1, 1, -.5), Dn.add(e); const t = new Cd("white", 2); Dn.add(t); const n = new pr; n.position.set(0, -1, 0), n.target.position.set(0, 0, 0), Dn.add(n) } const gs = new x0; Dn.add(gs); const Cr = new S0; Cr.gen(); Cr.position.y = -15; Dn.add(Cr); const Pn = new R0(Dn); Dn.add(Pn); let Tc = performance.now(); const os = 1 / 136; let va = 0; const Wo = document.getElementById("hud"); Wo.getContext("2d"); Wo.width / 2; Wo.height / 2; const Ts = document.getElementById("deadzone"), Dt = Ts.getContext("2d"), Ac = 250, H0 = Ts.width / 2, G0 = Ts.height / 2, oi = []; function W0(s, e) { let t = 0; if (oi.length > 0) { const a = oi[oi.length - 1], o = s - a.yaw, l = e - a.pitch; t = Math.sqrt(o * o + l * l) } oi.push({ yaw: s, pitch: e, time: performance.now() }); const n = 25, i = 75; let r = Math.round(i - Math.min(t, .2) / .2 * (i - n)); oi.length > r && oi.shift(), Dt.clearRect(0, 0, Ts.width, Ts.height), Dt.save(), Dt.font = "9px monospace", Dt.fillStyle = "white", Dt.textAlign = "left", Dt.textBaseline = "top", Dt.fillText(`(${(-s).toFixed(4)}, ${e.toFixed(4)})`, 10, 10), Dt.restore(), oi.forEach((a, o) => { const l = H0 + -a.yaw * Ac, c = G0 + -a.pitch * Ac; Dt.save(), Dt.globalAlpha = 1, Dt.fillStyle = "#ffffffff", Dt.beginPath(), Dt.arc(l, c, 1, 0, Math.PI * 2), Dt.fill(), Dt.restore() }) } window.addEventListener("gamepadconnected", s => { const e = navigator.getGamepads()[s.gamepad.index]; console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", e.index, e.id, e.buttons.length, e.axes.length) }); function gh() { requestAnimationFrame(gh); const s = performance.now(); let e = (s - Tc) / 1e3 * it.world.gameSpeed; for (Tc = s, va += e; va >= os;) { gs.intersectsLine(Pn.getForwardLine(), os), gs.updateRandomMovement(os), Pn.applyInputs(os), va -= os; const { controller_pitch: n, controller_yaw: i } = Pn.handleController(); W0(i, -n) } const t = e; Pn.updateCamera(gs.position, t), fi.render(Dn, Pn.camera), Ps.update() } window.addEventListener("resize", () => { Pn.camera.aspect = window.innerWidth / window.innerHeight, Pn.camera.updateProjectionMatrix(), fi.setSize(window.innerWidth, window.innerHeight) }); V0(); k0(Pn, gs, Cr, fi); gh();
