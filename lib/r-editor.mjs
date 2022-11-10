import { ref as J, openBlock as N, createElementBlock as D, Fragment as H, createTextVNode as he, toDisplayString as F, unref as I, withDirectives as ie, createElementVNode as U, normalizeStyle as W, vModelText as xe, renderList as X, vModelSelect as Se, normalizeClass as ce, renderSlot as de, createCommentVNode as ne, vShow as Me, reactive as Ne, onMounted as we, onBeforeUnmount as ke, withModifiers as ve, withKeys as De, createVNode as ge, withCtx as Be, createBlock as Oe, resolveDynamicComponent as Le, nextTick as Q } from "vue";
var le = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ee = { exports: {} };
(function(s, o) {
  (function(r, c) {
    s.exports = c();
  })(le, function() {
    function r(n) {
      return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? r = function(l) {
        return typeof l;
      } : r = function(l) {
        return l && typeof Symbol == "function" && l.constructor === Symbol && l !== Symbol.prototype ? "symbol" : typeof l;
      }, r(n);
    }
    function c(n, l) {
      if (!(n instanceof l))
        throw new TypeError("Cannot call a class as a function");
    }
    function _(n, l) {
      for (var e = 0; e < l.length; e++) {
        var t = l[e];
        t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(n, t.key, t);
      }
    }
    function f(n, l, e) {
      return l && _(n.prototype, l), e && _(n, e), n;
    }
    function h(n) {
      return v(n) || y(n) || E(n) || C();
    }
    function v(n) {
      if (Array.isArray(n))
        return x(n);
    }
    function y(n) {
      if (typeof Symbol < "u" && Symbol.iterator in Object(n))
        return Array.from(n);
    }
    function E(n, l) {
      if (!!n) {
        if (typeof n == "string")
          return x(n, l);
        var e = Object.prototype.toString.call(n).slice(8, -1);
        if (e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set")
          return Array.from(n);
        if (e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))
          return x(n, l);
      }
    }
    function x(n, l) {
      (l == null || l > n.length) && (l = n.length);
      for (var e = 0, t = new Array(l); e < l; e++)
        t[e] = n[e];
      return t;
    }
    function C() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var g = /* @__PURE__ */ function() {
      function n(l) {
        c(this, n), this.sourceStr = l, this.subCombos = n.parseComboStr(l), this.keyNames = this.subCombos.reduce(function(e, t) {
          return e.concat(t);
        }, []);
      }
      return f(n, [{
        key: "check",
        value: function(e) {
          for (var t = 0, i = 0; i < this.subCombos.length; i += 1)
            if (t = this._checkSubCombo(this.subCombos[i], t, e), t === -1)
              return !1;
          return !0;
        }
      }, {
        key: "isEqual",
        value: function(e) {
          if (!e || typeof e != "string" && r(e) !== "object" || (typeof e == "string" && (e = new n(e)), this.subCombos.length !== e.subCombos.length))
            return !1;
          for (var t = 0; t < this.subCombos.length; t += 1)
            if (this.subCombos[t].length !== e.subCombos[t].length)
              return !1;
          for (var i = 0; i < this.subCombos.length; i += 1) {
            for (var a = this.subCombos[i], u = e.subCombos[i].slice(0), d = 0; d < a.length; d += 1) {
              var b = a[d], p = u.indexOf(b);
              p > -1 && u.splice(p, 1);
            }
            if (u.length !== 0)
              return !1;
          }
          return !0;
        }
      }, {
        key: "_checkSubCombo",
        value: function(e, t, i) {
          e = e.slice(0), i = i.slice(t);
          for (var a = t, u = 0; u < e.length; u += 1) {
            var d = e[u];
            if (d[0] === "\\") {
              var b = d.slice(1);
              (b === n.comboDeliminator || b === n.keyDeliminator) && (d = b);
            }
            var p = i.indexOf(d);
            if (p > -1 && (e.splice(u, 1), u -= 1, p > a && (a = p), e.length === 0))
              return a;
          }
          return -1;
        }
      }]), n;
    }();
    g.comboDeliminator = ">", g.keyDeliminator = "+", g.parseComboStr = function(n) {
      for (var l = g._splitStr(n, g.comboDeliminator), e = [], t = 0; t < l.length; t += 1)
        e.push(g._splitStr(l[t], g.keyDeliminator));
      return e;
    }, g._splitStr = function(n, l) {
      for (var e = n, t = l, i = "", a = [], u = 0; u < e.length; u += 1)
        u > 0 && e[u] === t && e[u - 1] !== "\\" && (a.push(i.trim()), i = "", u += 1), i += e[u];
      return i && a.push(i.trim()), a;
    };
    var S = /* @__PURE__ */ function() {
      function n(l) {
        c(this, n), this.localeName = l, this.activeTargetKeys = [], this.pressedKeys = [], this._appliedMacros = [], this._keyMap = {}, this._killKeyCodes = [], this._macros = [];
      }
      return f(n, [{
        key: "bindKeyCode",
        value: function(e, t) {
          typeof t == "string" && (t = [t]), this._keyMap[e] = t;
        }
      }, {
        key: "bindMacro",
        value: function(e, t) {
          typeof t == "string" && (t = [t]);
          var i = null;
          typeof t == "function" && (i = t, t = null);
          var a = {
            keyCombo: new g(e),
            keyNames: t,
            handler: i
          };
          this._macros.push(a);
        }
      }, {
        key: "getKeyCodes",
        value: function(e) {
          var t = [];
          for (var i in this._keyMap) {
            var a = this._keyMap[i].indexOf(e);
            a > -1 && t.push(i | 0);
          }
          return t;
        }
      }, {
        key: "getKeyNames",
        value: function(e) {
          return this._keyMap[e] || [];
        }
      }, {
        key: "setKillKey",
        value: function(e) {
          if (typeof e == "string") {
            for (var t = this.getKeyCodes(e), i = 0; i < t.length; i += 1)
              this.setKillKey(t[i]);
            return;
          }
          this._killKeyCodes.push(e);
        }
      }, {
        key: "pressKey",
        value: function(e) {
          if (typeof e == "string") {
            for (var t = this.getKeyCodes(e), i = 0; i < t.length; i += 1)
              this.pressKey(t[i]);
            return;
          }
          this.activeTargetKeys.length = 0;
          for (var a = this.getKeyNames(e), u = 0; u < a.length; u += 1)
            this.activeTargetKeys.push(a[u]), this.pressedKeys.indexOf(a[u]) === -1 && this.pressedKeys.push(a[u]);
          this._applyMacros();
        }
      }, {
        key: "releaseKey",
        value: function(e) {
          if (typeof e == "string")
            for (var t = this.getKeyCodes(e), i = 0; i < t.length; i += 1)
              this.releaseKey(t[i]);
          else {
            var a = this.getKeyNames(e), u = this._killKeyCodes.indexOf(e);
            if (u !== -1)
              this.pressedKeys.length = 0;
            else
              for (var d = 0; d < a.length; d += 1) {
                var b = this.pressedKeys.indexOf(a[d]);
                b > -1 && this.pressedKeys.splice(b, 1);
              }
            this.activeTargetKeys.length = 0, this._clearMacros();
          }
        }
      }, {
        key: "_applyMacros",
        value: function() {
          for (var e = this._macros.slice(0), t = 0; t < e.length; t += 1) {
            var i = e[t];
            if (i.keyCombo.check(this.pressedKeys)) {
              i.handler && (i.keyNames = i.handler(this.pressedKeys));
              for (var a = 0; a < i.keyNames.length; a += 1)
                this.pressedKeys.indexOf(i.keyNames[a]) === -1 && this.pressedKeys.push(i.keyNames[a]);
              this._appliedMacros.push(i);
            }
          }
        }
      }, {
        key: "_clearMacros",
        value: function() {
          for (var e = 0; e < this._appliedMacros.length; e += 1) {
            var t = this._appliedMacros[e];
            if (!t.keyCombo.check(this.pressedKeys)) {
              for (var i = 0; i < t.keyNames.length; i += 1) {
                var a = this.pressedKeys.indexOf(t.keyNames[i]);
                a > -1 && this.pressedKeys.splice(a, 1);
              }
              t.handler && (t.keyNames = null), this._appliedMacros.splice(e, 1), e -= 1;
            }
          }
        }
      }]), n;
    }(), A = /* @__PURE__ */ function() {
      function n(l, e, t, i) {
        c(this, n), this._locale = null, this._currentContext = "", this._contexts = {}, this._listeners = [], this._appliedListeners = [], this._locales = {}, this._targetElement = null, this._targetWindow = null, this._targetPlatform = "", this._targetUserAgent = "", this._isModernBrowser = !1, this._targetKeyDownBinding = null, this._targetKeyUpBinding = null, this._targetResetBinding = null, this._paused = !1, this._contexts.global = {
          listeners: this._listeners,
          targetWindow: l,
          targetElement: e,
          targetPlatform: t,
          targetUserAgent: i
        }, this.setContext("global");
      }
      return f(n, [{
        key: "setLocale",
        value: function(e, t) {
          var i = null;
          return typeof e == "string" ? t ? (i = new S(e), t(i, this._targetPlatform, this._targetUserAgent)) : i = this._locales[e] || null : (i = e, e = i._localeName), this._locale = i, this._locales[e] = i, i && (this._locale.pressedKeys = i.pressedKeys), this;
        }
      }, {
        key: "getLocale",
        value: function(e) {
          return e || (e = this._locale.localeName), this._locales[e] || null;
        }
      }, {
        key: "bind",
        value: function(e, t, i, a) {
          if ((e === null || typeof e == "function") && (a = i, i = t, t = e, e = null), e && r(e) === "object" && typeof e.length == "number") {
            for (var u = 0; u < e.length; u += 1)
              this.bind(e[u], t, i);
            return this;
          }
          return this._listeners.push({
            keyCombo: e ? new g(e) : null,
            pressHandler: t || null,
            releaseHandler: i || null,
            preventRepeat: !1,
            preventRepeatByDefault: a || !1,
            executingHandler: !1
          }), this;
        }
      }, {
        key: "addListener",
        value: function(e, t, i, a) {
          return this.bind(e, t, i, a);
        }
      }, {
        key: "on",
        value: function(e, t, i, a) {
          return this.bind(e, t, i, a);
        }
      }, {
        key: "bindPress",
        value: function(e, t, i) {
          return this.bind(e, t, null, i);
        }
      }, {
        key: "bindRelease",
        value: function(e, t) {
          return this.bind(e, null, t, preventRepeatByDefault);
        }
      }, {
        key: "unbind",
        value: function(e, t, i) {
          if ((e === null || typeof e == "function") && (i = t, t = e, e = null), e && r(e) === "object" && typeof e.length == "number") {
            for (var a = 0; a < e.length; a += 1)
              this.unbind(e[a], t, i);
            return this;
          }
          for (var u = 0; u < this._listeners.length; u += 1) {
            var d = this._listeners[u], b = !e && !d.keyCombo || d.keyCombo && d.keyCombo.isEqual(e), p = !t && !i || !t && !d.pressHandler || t === d.pressHandler, K = !t && !i || !i && !d.releaseHandler || i === d.releaseHandler;
            b && p && K && (this._listeners.splice(u, 1), u -= 1);
          }
          return this;
        }
      }, {
        key: "removeListener",
        value: function(e, t, i) {
          return this.unbind(e, t, i);
        }
      }, {
        key: "off",
        value: function(e, t, i) {
          return this.unbind(e, t, i);
        }
      }, {
        key: "setContext",
        value: function(e) {
          if (this._locale && this.releaseAllKeys(), !this._contexts[e]) {
            var t = this._contexts.global;
            this._contexts[e] = {
              listeners: [],
              targetWindow: t.targetWindow,
              targetElement: t.targetElement,
              targetPlatform: t.targetPlatform,
              targetUserAgent: t.targetUserAgent
            };
          }
          var i = this._contexts[e];
          return this._currentContext = e, this._listeners = i.listeners, this.stop(), this.watch(i.targetWindow, i.targetElement, i.targetPlatform, i.targetUserAgent), this;
        }
      }, {
        key: "getContext",
        value: function() {
          return this._currentContext;
        }
      }, {
        key: "withContext",
        value: function(e, t) {
          var i = this.getContext();
          return this.setContext(e), t(), this.setContext(i), this;
        }
      }, {
        key: "watch",
        value: function(e, t, i, a) {
          var u = this;
          this.stop();
          var d = typeof globalThis < "u" ? globalThis : typeof le < "u" ? le : typeof window < "u" ? window : {};
          if (!e) {
            if (!d.addEventListener && !d.attachEvent) {
              if (this._currentContext === "global")
                return;
              throw new Error("Cannot find window functions addEventListener or attachEvent.");
            }
            e = d;
          }
          if (typeof e.nodeType == "number" && (a = i, i = t, t = e, e = d), !e.addEventListener && !e.attachEvent)
            throw new Error("Cannot find addEventListener or attachEvent methods on targetWindow.");
          this._isModernBrowser = !!e.addEventListener;
          var b = e.navigator && e.navigator.userAgent || "", p = e.navigator && e.navigator.platform || "";
          t && t !== null || (t = e.document), i && i !== null || (i = p), a && a !== null || (a = b), this._targetKeyDownBinding = function(m) {
            u.pressKey(m.keyCode, m), u._handleCommandBug(m, p);
          }, this._targetKeyUpBinding = function(m) {
            u.releaseKey(m.keyCode, m);
          }, this._targetResetBinding = function(m) {
            u.releaseAllKeys(m);
          }, this._bindEvent(t, "keydown", this._targetKeyDownBinding), this._bindEvent(t, "keyup", this._targetKeyUpBinding), this._bindEvent(e, "focus", this._targetResetBinding), this._bindEvent(e, "blur", this._targetResetBinding), this._targetElement = t, this._targetWindow = e, this._targetPlatform = i, this._targetUserAgent = a;
          var K = this._contexts[this._currentContext];
          return K.targetWindow = this._targetWindow, K.targetElement = this._targetElement, K.targetPlatform = this._targetPlatform, K.targetUserAgent = this._targetUserAgent, this;
        }
      }, {
        key: "stop",
        value: function() {
          if (!(!this._targetElement || !this._targetWindow))
            return this._unbindEvent(this._targetElement, "keydown", this._targetKeyDownBinding), this._unbindEvent(this._targetElement, "keyup", this._targetKeyUpBinding), this._unbindEvent(this._targetWindow, "focus", this._targetResetBinding), this._unbindEvent(this._targetWindow, "blur", this._targetResetBinding), this._targetWindow = null, this._targetElement = null, this;
        }
      }, {
        key: "pressKey",
        value: function(e, t) {
          if (this._paused)
            return this;
          if (!this._locale)
            throw new Error("Locale not set");
          return this._locale.pressKey(e), this._applyBindings(t), this;
        }
      }, {
        key: "releaseKey",
        value: function(e, t) {
          if (this._paused)
            return this;
          if (!this._locale)
            throw new Error("Locale not set");
          return this._locale.releaseKey(e), this._clearBindings(t), this;
        }
      }, {
        key: "releaseAllKeys",
        value: function(e) {
          if (this._paused)
            return this;
          if (!this._locale)
            throw new Error("Locale not set");
          return this._locale.pressedKeys.length = 0, this._clearBindings(e), this;
        }
      }, {
        key: "pause",
        value: function() {
          return this._paused ? this : (this._locale && this.releaseAllKeys(), this._paused = !0, this);
        }
      }, {
        key: "resume",
        value: function() {
          return this._paused = !1, this;
        }
      }, {
        key: "reset",
        value: function() {
          return this.releaseAllKeys(), this._listeners.length = 0, this;
        }
      }, {
        key: "_bindEvent",
        value: function(e, t, i) {
          return this._isModernBrowser ? e.addEventListener(t, i, !1) : e.attachEvent("on" + t, i);
        }
      }, {
        key: "_unbindEvent",
        value: function(e, t, i) {
          return this._isModernBrowser ? e.removeEventListener(t, i, !1) : e.detachEvent("on" + t, i);
        }
      }, {
        key: "_getGroupedListeners",
        value: function() {
          var e = [], t = [], i = this._listeners;
          return this._currentContext !== "global" && (i = [].concat(h(i), h(this._contexts.global.listeners))), i.sort(function(a, u) {
            return (u.keyCombo ? u.keyCombo.keyNames.length : 0) - (a.keyCombo ? a.keyCombo.keyNames.length : 0);
          }).forEach(function(a) {
            for (var u = -1, d = 0; d < t.length; d += 1)
              (t[d] === null && a.keyCombo === null || t[d] !== null && t[d].isEqual(a.keyCombo)) && (u = d);
            u === -1 && (u = t.length, t.push(a.keyCombo)), e[u] || (e[u] = []), e[u].push(a);
          }), e;
        }
      }, {
        key: "_applyBindings",
        value: function(e) {
          var t = this, i = !1;
          e || (e = {}), e.preventRepeat = function() {
            i = !0;
          }, e.pressedKeys = this._locale.pressedKeys.slice(0);
          for (var a = this._locale.activeTargetKeys, u = this._locale.pressedKeys.slice(0), d = this._getGroupedListeners(), b = function(m) {
            var w = d[m], M = w[0].keyCombo;
            if (M === null || M.check(u) && a.some(function(j) {
              return M.keyNames.includes(j);
            })) {
              for (var V = 0; V < w.length; V += 1) {
                var B = w[V];
                !B.executingHandler && B.pressHandler && !B.preventRepeat && (B.executingHandler = !0, B.pressHandler.call(t, e), B.executingHandler = !1, (i || B.preventRepeatByDefault) && (B.preventRepeat = !0, i = !1)), t._appliedListeners.indexOf(B) === -1 && t._appliedListeners.push(B);
              }
              if (M)
                for (var O = 0; O < M.keyNames.length; O += 1) {
                  var P = u.indexOf(M.keyNames[O]);
                  P !== -1 && (u.splice(P, 1), O -= 1);
                }
            }
          }, p = 0; p < d.length; p += 1)
            b(p);
        }
      }, {
        key: "_clearBindings",
        value: function(e) {
          e || (e = {}), e.pressedKeys = this._locale.pressedKeys.slice(0);
          for (var t = 0; t < this._appliedListeners.length; t += 1) {
            var i = this._appliedListeners[t], a = i.keyCombo;
            (a === null || !a.check(this._locale.pressedKeys)) && (i.preventRepeat = !1, (a !== null || e.pressedKeys.length === 0) && (this._appliedListeners.splice(t, 1), t -= 1), !i.executingHandler && i.releaseHandler && (i.executingHandler = !0, i.releaseHandler.call(this, e), i.executingHandler = !1));
          }
        }
      }, {
        key: "_handleCommandBug",
        value: function(e, t) {
          var i = ["shift", "ctrl", "alt", "capslock", "tab", "command"];
          t.match("Mac") && this._locale.pressedKeys.includes("command") && !i.includes(this._locale.getKeyNames(e.keyCode)[0]) && this._targetKeyUpBinding(e);
        }
      }]), n;
    }();
    function R(n, l, e) {
      n.bindKeyCode(3, ["cancel"]), n.bindKeyCode(8, ["backspace"]), n.bindKeyCode(9, ["tab"]), n.bindKeyCode(12, ["clear"]), n.bindKeyCode(13, ["enter"]), n.bindKeyCode(16, ["shift"]), n.bindKeyCode(17, ["ctrl"]), n.bindKeyCode(18, ["alt", "menu"]), n.bindKeyCode(19, ["pause", "break"]), n.bindKeyCode(20, ["capslock"]), n.bindKeyCode(27, ["escape", "esc"]), n.bindKeyCode(32, ["space", "spacebar"]), n.bindKeyCode(33, ["pageup"]), n.bindKeyCode(34, ["pagedown"]), n.bindKeyCode(35, ["end"]), n.bindKeyCode(36, ["home"]), n.bindKeyCode(37, ["left"]), n.bindKeyCode(38, ["up"]), n.bindKeyCode(39, ["right"]), n.bindKeyCode(40, ["down"]), n.bindKeyCode(41, ["select"]), n.bindKeyCode(42, ["printscreen"]), n.bindKeyCode(43, ["execute"]), n.bindKeyCode(44, ["snapshot"]), n.bindKeyCode(45, ["insert", "ins"]), n.bindKeyCode(46, ["delete", "del"]), n.bindKeyCode(47, ["help"]), n.bindKeyCode(145, ["scrolllock", "scroll"]), n.bindKeyCode(188, ["comma", ","]), n.bindKeyCode(190, ["period", "."]), n.bindKeyCode(191, ["slash", "forwardslash", "/"]), n.bindKeyCode(192, ["graveaccent", "`"]), n.bindKeyCode(219, ["openbracket", "["]), n.bindKeyCode(220, ["backslash", "\\"]), n.bindKeyCode(221, ["closebracket", "]"]), n.bindKeyCode(222, ["apostrophe", "'"]), n.bindKeyCode(48, ["zero", "0"]), n.bindKeyCode(49, ["one", "1"]), n.bindKeyCode(50, ["two", "2"]), n.bindKeyCode(51, ["three", "3"]), n.bindKeyCode(52, ["four", "4"]), n.bindKeyCode(53, ["five", "5"]), n.bindKeyCode(54, ["six", "6"]), n.bindKeyCode(55, ["seven", "7"]), n.bindKeyCode(56, ["eight", "8"]), n.bindKeyCode(57, ["nine", "9"]), n.bindKeyCode(96, ["numzero", "num0"]), n.bindKeyCode(97, ["numone", "num1"]), n.bindKeyCode(98, ["numtwo", "num2"]), n.bindKeyCode(99, ["numthree", "num3"]), n.bindKeyCode(100, ["numfour", "num4"]), n.bindKeyCode(101, ["numfive", "num5"]), n.bindKeyCode(102, ["numsix", "num6"]), n.bindKeyCode(103, ["numseven", "num7"]), n.bindKeyCode(104, ["numeight", "num8"]), n.bindKeyCode(105, ["numnine", "num9"]), n.bindKeyCode(106, ["nummultiply", "num*"]), n.bindKeyCode(107, ["numadd", "num+"]), n.bindKeyCode(108, ["numenter"]), n.bindKeyCode(109, ["numsubtract", "num-"]), n.bindKeyCode(110, ["numdecimal", "num."]), n.bindKeyCode(111, ["numdivide", "num/"]), n.bindKeyCode(144, ["numlock", "num"]), n.bindKeyCode(112, ["f1"]), n.bindKeyCode(113, ["f2"]), n.bindKeyCode(114, ["f3"]), n.bindKeyCode(115, ["f4"]), n.bindKeyCode(116, ["f5"]), n.bindKeyCode(117, ["f6"]), n.bindKeyCode(118, ["f7"]), n.bindKeyCode(119, ["f8"]), n.bindKeyCode(120, ["f9"]), n.bindKeyCode(121, ["f10"]), n.bindKeyCode(122, ["f11"]), n.bindKeyCode(123, ["f12"]), n.bindKeyCode(124, ["f13"]), n.bindKeyCode(125, ["f14"]), n.bindKeyCode(126, ["f15"]), n.bindKeyCode(127, ["f16"]), n.bindKeyCode(128, ["f17"]), n.bindKeyCode(129, ["f18"]), n.bindKeyCode(130, ["f19"]), n.bindKeyCode(131, ["f20"]), n.bindKeyCode(132, ["f21"]), n.bindKeyCode(133, ["f22"]), n.bindKeyCode(134, ["f23"]), n.bindKeyCode(135, ["f24"]), n.bindMacro("shift + `", ["tilde", "~"]), n.bindMacro("shift + 1", ["exclamation", "exclamationpoint", "!"]), n.bindMacro("shift + 2", ["at", "@"]), n.bindMacro("shift + 3", ["number", "#"]), n.bindMacro("shift + 4", ["dollar", "dollars", "dollarsign", "$"]), n.bindMacro("shift + 5", ["percent", "%"]), n.bindMacro("shift + 6", ["caret", "^"]), n.bindMacro("shift + 7", ["ampersand", "and", "&"]), n.bindMacro("shift + 8", ["asterisk", "*"]), n.bindMacro("shift + 9", ["openparen", "("]), n.bindMacro("shift + 0", ["closeparen", ")"]), n.bindMacro("shift + -", ["underscore", "_"]), n.bindMacro("shift + =", ["plus", "+"]), n.bindMacro("shift + [", ["opencurlybrace", "opencurlybracket", "{"]), n.bindMacro("shift + ]", ["closecurlybrace", "closecurlybracket", "}"]), n.bindMacro("shift + \\", ["verticalbar", "|"]), n.bindMacro("shift + ;", ["colon", ":"]), n.bindMacro("shift + '", ["quotationmark", "'"]), n.bindMacro("shift + !,", ["openanglebracket", "<"]), n.bindMacro("shift + .", ["closeanglebracket", ">"]), n.bindMacro("shift + /", ["questionmark", "?"]), l.match("Mac") ? n.bindMacro("command", ["mod", "modifier"]) : n.bindMacro("ctrl", ["mod", "modifier"]);
      for (var t = 65; t <= 90; t += 1) {
        var i = String.fromCharCode(t + 32), a = String.fromCharCode(t);
        n.bindKeyCode(t, i), n.bindMacro("shift + " + i, a), n.bindMacro("capslock + " + i, a);
      }
      var u = e.match("Firefox") ? 59 : 186, d = e.match("Firefox") ? 173 : 189, b = e.match("Firefox") ? 61 : 187, p, K;
      l.match("Mac") && (e.match("Safari") || e.match("Chrome")) ? (p = 91, K = 93) : l.match("Mac") && e.match("Opera") ? (p = 17, K = 17) : l.match("Mac") && e.match("Firefox") && (p = 224, K = 224), n.bindKeyCode(u, ["semicolon", ";"]), n.bindKeyCode(d, ["dash", "-"]), n.bindKeyCode(b, ["equal", "equalsign", "="]), n.bindKeyCode(p, ["command", "windows", "win", "super", "leftcommand", "leftwindows", "leftwin", "leftsuper"]), n.bindKeyCode(K, ["command", "windows", "win", "super", "rightcommand", "rightwindows", "rightwin", "rightsuper"]), n.setKillKey("command");
    }
    var L = new A();
    return L.setLocale("us", R), L.Keyboard = A, L.Locale = S, L.KeyCombo = g, L;
  });
})(Ee);
const ee = Ee.exports;
function $(s, o) {
  return Object.prototype.toString.call(s) === `[object ${o}]`;
}
function q(s) {
  function o(r, c = /* @__PURE__ */ new WeakMap()) {
    if (r == null)
      return r;
    if ($(r, "Date"))
      return new Date(r);
    if ($(r, "RegExp"))
      return new RegExp(r);
    if (!$(r, "Object") && !Array.isArray(r))
      return r;
    if (c.get(r))
      return c.get(r);
    let _ = new r.constructor();
    c.set(r, _);
    for (let f in r)
      Object.hasOwnProperty.call(r, f) && (_[f] = q(r[f]));
    return _;
  }
  return o(s);
}
function se(s) {
  const o = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", r = o.length;
  let c = "";
  for (; s; )
    c += o[Math.floor(Math.random() * r)], s--;
  return c;
}
function Z(s) {
  return s && $(s, "Object") && Object.keys(s).length ? Object.keys(s).map((o) => `${o}:${s[o]}`).join(";") : "";
}
function be(s, o) {
  let r = null;
  return function() {
    r !== null && (clearTimeout(r), r = null);
    const c = [...arguments];
    r = setTimeout(() => {
      s.apply(this, c);
    }, o);
  };
}
const Ie = ["data-value", "data-placeholder", "data-style", "data-other-data"], Ae = ["placeholder"], Re = {
  __name: "EditorInput",
  props: {
    openEdit: {
      type: Boolean,
      default: !0,
      required: !0,
      validator: (s) => $(s, "Boolean")
    },
    data: {
      type: Object,
      required: !0,
      validator: (s) => $(s, "Object")
    }
  },
  setup(s) {
    const o = s, r = J(o.data.value), c = o.data.placeholder || "", _ = Z(o.data.style);
    return (f, h) => s.openEdit ? (N(), D("span", {
      key: 1,
      "data-type": "editor-input",
      contenteditable: "true",
      "data-value": r.value,
      "data-placeholder": I(c),
      "data-style": JSON.stringify(o.data.style),
      "data-other-data": JSON.stringify(o.data.otherData)
    }, [
      ie(U("input", {
        class: "editor-input",
        type: "text",
        placeholder: I(c),
        "onUpdate:modelValue": h[0] || (h[0] = (v) => r.value = v),
        style: W(I(_))
      }, null, 12, Ae), [
        [xe, r.value]
      ])
    ], 8, Ie)) : (N(), D(H, { key: 0 }, [
      he(F(r.value), 1)
    ], 64));
  }
}, qe = {
  __name: "EditorText",
  props: {
    openEdit: {
      type: Boolean,
      default: !0,
      required: !0,
      validator: (s) => $(s, "Boolean")
    },
    data: {
      type: Object,
      required: !0,
      validator: (s) => $(s, "Object")
    }
  },
  setup(s) {
    const o = s, r = o.data.value || "", c = Z(o.data.style);
    return (_, f) => I(c) ? (N(), D("span", {
      key: 0,
      "data-type": "editor-text",
      style: W(I(c))
    }, F(I(r)), 5)) : (N(), D(H, { key: 1 }, [
      he(F(I(r)), 1)
    ], 64));
  }
};
const $e = ["data-value", "data-placeholder", "data-style", "data-other-data"], Ve = {
  disabled: "",
  value: ""
}, Ue = ["value"], He = {
  __name: "EditorSelect",
  props: {
    openEdit: {
      type: Boolean,
      default: !0,
      required: !0,
      validator: (s) => $(s, "Boolean")
    },
    data: {
      type: Object,
      required: !0,
      validator: (s) => $(s, "Object")
    }
  },
  setup(s) {
    const o = s, r = J(o.data.value), c = o.data.placeholder || "";
    Z(o.data.style);
    const _ = o.data.otherData && o.data.otherData.selectOptions ? o.data.otherData.selectOptions : [];
    return (f, h) => s.openEdit ? (N(), D("span", {
      key: 1,
      "data-type": "editor-select",
      contenteditable: "true",
      "data-value": r.value,
      "data-placeholder": I(c),
      "data-style": JSON.stringify(o.data.style),
      "data-other-data": JSON.stringify(o.data.otherData)
    }, [
      ie(U("select", {
        class: "editor-select",
        "onUpdate:modelValue": h[0] || (h[0] = (v) => r.value = v)
      }, [
        U("option", Ve, F(I(c) || "\u8BF7\u9009\u62E9"), 1),
        (N(!0), D(H, null, X(I(_), (v) => (N(), D("option", {
          value: v.key
        }, F(v.value), 9, Ue))), 256))
      ], 512), [
        [Se, r.value]
      ])
    ], 8, $e)) : (N(), D(H, { key: 0 }, [
      he(F(r.value), 1)
    ], 64));
  }
}, te = {
  LineBreak: ["\r", `
`, `\r
`],
  DefaultHistoryStackLength: 20,
  DefaultInputRecordInterval: 300,
  DefaultComponents: [
    {
      type: "editor-input",
      key: "name",
      name: "\u8F93\u5165\u6846",
      component: Re,
      otherData: {
        placeholder: "\u8BF7\u8F93\u5165"
      }
    },
    {
      type: "editor-text",
      key: "",
      name: "\u6587\u672C\u6846",
      component: qe,
      isNotMenuItem: !0
    },
    {
      type: "editor-select",
      key: "gender",
      name: "\u9009\u62E9\u6846",
      component: He,
      otherData: {
        selectOptions: [
          {
            key: "a",
            value: "AAAAA"
          },
          {
            key: "b",
            value: "BBBBB"
          },
          {
            key: "c",
            value: "CCCCC"
          }
        ]
      }
    }
  ]
};
function Ce(s, o) {
  if (typeof s == "object") {
    if (s.getRangeAt) {
      if (s.rangeCount == 0)
        return;
      s = s.getRangeAt(0);
    }
    if (s.cloneRange) {
      let c = s.cloneRange();
      c.collapse(!0), s = c.startContainer, s.nodeType == 1 && (s = s.childNodes[c.startOffset]);
    }
    if (!!s) {
      for (var r = s; r && r.nodeType != 1; )
        r = r.previousSibling;
      s = r || s.parentNode, s && Pe(s, o);
    }
  }
}
function Pe(s, o) {
  if (s.scrollIntoViewIfNeeded)
    s.scrollIntoViewIfNeeded(!1);
  else {
    o = o || s.parentElement;
    const r = s.offsetTop - o.scrollTop;
    (r < 0 || r > o.offsetHeight - s.offsetHeight) && (o.scrollTop = s.offsetTop);
  }
}
function G(s) {
  const o = window.getSelection();
  o && (o.removeAllRanges(), o.addRange(s));
}
function fe() {
  const s = window.getSelection();
  if (s && s.rangeCount > 0)
    return s.getRangeAt(0);
}
function ue(s, o) {
  return o.map((r) => ({ at: r, index: s.lastIndexOf(r) })).reduce((r, c) => r.index > c.index ? r : c);
}
function ze(s, o) {
  o = o || window;
  for (var r = { top: s.offsetTop, left: s.offsetLeft }, c = s.offsetParent; c != null && c != o; )
    r.left += c.offsetLeft, r.top += c.offsetTop, c = c.offsetParent;
  return r;
}
function Je(s, o) {
  do
    if (o(s))
      return s;
  while (s = s && s.parentNode);
}
function _e() {
  const s = fe();
  if (s) {
    const o = s.cloneRange();
    return o.collapse(!0), o.setStart(o.endContainer, 0), o;
  }
}
const Fe = { class: "atwho-inner" }, Ge = { class: "atwho-view" }, Xe = { class: "atwho-ul" }, We = ["data-index"], Ye = ["textContent"], Qe = { ref: "embeddedItem" };
function Ze(s, o, r, c, _, f) {
  return N(), D("div", {
    class: "atwho-wrap",
    ref: "wrap",
    onCompositionstart: o[2] || (o[2] = (...h) => f.handleCompositionStart && f.handleCompositionStart(...h)),
    onCompositionend: o[3] || (o[3] = (...h) => f.handleCompositionEnd && f.handleCompositionEnd(...h)),
    onInput: o[4] || (o[4] = (h) => f.handleInput()),
    onKeydownCapture: o[5] || (o[5] = (...h) => f.handleKeyDown && f.handleKeyDown(...h))
  }, [
    _.atwho ? (N(), D("div", {
      key: 0,
      class: "atwho-panel",
      style: W(f.style)
    }, [
      U("div", Fe, [
        U("div", Ge, [
          U("ul", Xe, [
            (N(!0), D(H, null, X(_.atwho.list, (h, v) => (N(), D("li", {
              class: ce(["atwho-li", f.isCur(v) && "atwho-cur"]),
              key: v,
              ref_for: !0,
              ref: f.isCur(v) && "cur",
              "data-index": v,
              onMouseenter: o[0] || (o[0] = (...y) => f.handleItemHover && f.handleItemHover(...y)),
              onClick: o[1] || (o[1] = (...y) => f.handleItemClick && f.handleItemClick(...y))
            }, [
              de(s.$slots, "item", { item: h }, () => [
                U("span", {
                  textContent: F(f.itemName(h))
                }, null, 8, Ye)
              ])
            ], 42, We))), 128))
          ])
        ])
      ])
    ], 4)) : ne("", !0),
    ie(U("span", Qe, [
      de(s.$slots, "embeddedItem", { current: f.currentItem })
    ], 512), [
      [Me, !1]
    ]),
    de(s.$slots, "default")
  ], 544);
}
const Te = (s, o) => {
  const r = s.__vccOpts || s;
  for (const [c, _] of o)
    r[c] = _;
  return r;
}, je = {
  name: "KeySign",
  props: {
    value: {
      type: String,
      default: null
    },
    at: {
      type: String,
      default: "@"
    },
    ats: {
      type: Array,
      default: () => ["@"]
    },
    suffix: {
      type: String,
      default: " "
    },
    loop: {
      type: Boolean,
      default: !0
    },
    allowSpaces: {
      type: Boolean,
      default: !0
    },
    tabSelect: {
      type: Boolean,
      default: !1
    },
    avoidEmail: {
      type: Boolean,
      default: !0
    },
    showUnique: {
      type: Boolean,
      default: !0
    },
    hoverSelect: {
      type: Boolean,
      default: !0
    },
    filterMatch: {
      type: Function,
      default: (s, o, r) => s.toLowerCase().indexOf(o.toLowerCase()) > -1
    },
    deleteMatch: {
      type: Function,
      default: (s, o, r) => o === s + r
    },
    scrollRef: {
      type: String,
      default: ""
    },
    members: {
      type: Array,
      default: [
        {
          id: "1",
          name: "\u8F93\u5165\u6846",
          message: "\u5DF4\u62C9\u5DF4\u62C9"
        },
        {
          id: "2",
          name: "\u9009\u62E9\u6846",
          message: "\u5DF4\u62C9\u5DF4\u62C9"
        },
        {
          id: "3",
          name: "\u8868\u683C\uFF08table\uFF09",
          message: "\u5DF4\u62C9\u5DF4\u62C9"
        },
        {
          id: "4",
          name: "\u65E5\u671F\u9009\u62E9\u6846",
          message: "\u5DF4\u62C9\u5DF4\u62C9"
        },
        {
          id: "5",
          name: "\u65E5\u671F\u65F6\u95F4\u9009\u62E9\u6846",
          message: "\u5DF4\u62C9\u5DF4\u62C9"
        },
        {
          id: "6",
          name: "\u65F6\u95F4\u9009\u62E9\u6846",
          message: "\u5DF4\u62C9\u5DF4\u62C9"
        }
      ]
    },
    nameKey: {
      type: String,
      default: "name"
    }
  },
  data() {
    return {
      bindsValue: this.value != null,
      customsEmbedded: !1,
      hasComposition: !1,
      atwho: null
    };
  },
  computed: {
    atItems() {
      return this.at ? [this.at] : this.ats;
    },
    dataList() {
      return this.members;
    },
    currentItem() {
      return this.atwho ? this.atwho.list[this.atwho.cur] : "";
    },
    style() {
      if (this.atwho) {
        const { list: s, cur: o, x: r, y: c } = this.atwho, { wrap: _ } = this.$refs;
        if (_) {
          const f = ze(_), h = this.scrollRef ? document.querySelector(this.scrollRef).scrollLeft : 0, v = this.scrollRef ? document.querySelector(this.scrollRef).scrollTop : 0, y = r + h + window.pageXOffset - f.left + "px", E = c + v + window.pageYOffset - f.top + 186 + "px";
          return { left: y, top: E };
        }
      }
      return null;
    }
  },
  watch: {
    "atwho.cur"(s) {
      s != null && this.$nextTick(() => {
        this.scrollToCur();
      });
    },
    members() {
      this.handleInput(!0);
    },
    value(s, o) {
      this.bindsValue && this.handleValueUpdate(s);
    }
  },
  mounted() {
    this.$slots.embeddedItem && (this.customsEmbedded = !0), this.bindsValue && this.handleValueUpdate(this.value);
  },
  methods: {
    itemName(s) {
      const { nameKey: o } = this;
      return o ? s[o] : s;
    },
    isCur(s) {
      return s === this.atwho.cur;
    },
    handleValueUpdate(s) {
      const o = this.$el.querySelector("[contenteditable]");
      s !== o.innerHTML && (o.innerHTML = s, this.dispatchInput());
    },
    dispatchInput() {
      let s = this.$el.querySelector("[contenteditable]"), o = new Event("input", { bubbles: !0 });
      s.dispatchEvent(o);
    },
    handleItemHover(s) {
      this.hoverSelect && this.selectByMouse(s);
    },
    handleItemClick(s) {
      this.selectByMouse(s), this.insertItem();
    },
    handleDelete(s) {
      const o = _e();
      if (o) {
        if (this.customsEmbedded && o.endOffset >= 1) {
          let x = o.endContainer.childNodes[o.endOffset] || o.endContainer.childNodes[o.endOffset - 1];
          if (!x || x.nodeType === Node.TEXT_NODE && !/^\s?$/.test(x.data))
            return;
          x.nodeType === Node.TEXT_NODE ? x.previousSibling && (x = x.previousSibling) : x.previousElementSibling && (x = x.previousElementSibling);
          let C = [].slice.call(x.childNodes);
          C = [].reverse.call(C), C.unshift(x);
          let g;
          if ([].some.call(C, (S) => {
            if (S.getAttribute && S.getAttribute("data-at-embedded") != null)
              return g = S, !0;
          }), g) {
            s.preventDefault(), s.stopPropagation();
            const S = fe();
            S && (S.setStartBefore(g), S.deleteContents(), G(S), this.handleInput());
          }
          return;
        }
        const { atItems: r, suffix: c, deleteMatch: _, itemName: f } = this, h = this.dataList, v = o.toString(), { at: y, index: E } = ue(v, r);
        if (E > -1) {
          const x = v.slice(E + y.length);
          if (h.some((g) => {
            const S = f(g);
            return _(S, x, c);
          })) {
            s.preventDefault(), s.stopPropagation();
            const g = fe();
            g && (g.setStart(g.endContainer, E), g.deleteContents(), G(g), this.handleInput());
          }
        }
      }
    },
    handleKeyDown(s) {
      const { atwho: o } = this;
      if (o) {
        if (s.keyCode === 38 || s.keyCode === 40) {
          s.metaKey || s.ctrlKey || (s.preventDefault(), s.stopPropagation(), this.selectByKeyboard(s));
          return;
        }
        if (s.keyCode === 13 || this.tabSelect && s.keyCode === 9) {
          this.insertItem(), s.preventDefault(), s.stopPropagation();
          return;
        }
        if (s.keyCode === 27) {
          this.closePanel();
          return;
        }
      }
      s.keyCode === 8 && this.handleDelete(s);
    },
    handleCompositionStart() {
      this.hasComposition = !0;
    },
    handleCompositionEnd() {
      this.hasComposition = !1, this.handleInput();
    },
    handleInput(s) {
      if (this.hasComposition)
        return;
      this.$el.querySelector("[contenteditable]");
      const o = _e();
      if (o) {
        const { atItems: r, avoidEmail: c, allowSpaces: _, showUnique: f } = this;
        let h = !0;
        const v = o.toString(), { at: y, index: E } = ue(v, r);
        E < 0 && (h = !1);
        const x = v[E - 1], C = v.slice(E + y.length, v.length);
        if (c && /^[a-z0-9]$/i.test(x) && (h = !1), !_ && /\s/.test(C) && (h = !1), /^\s/.test(C) && (h = !1), !h)
          this.closePanel();
        else {
          const { filterMatch: g, itemName: S } = this, A = this.dataList;
          !s && C && this.$emit("at", C);
          const R = A.filter((L) => {
            const n = S(L);
            return g(n, C, y);
          });
          if (h = !1, R.length && (h = !0, !f)) {
            let L = R[0];
            C === S(L) && (h = !1);
          }
          h ? this.openPanel(R, o, E, y) : this.closePanel();
        }
      }
    },
    closePanel() {
      this.atwho && (this.atwho = null);
    },
    openPanel(s, o, r, c) {
      (() => {
        const f = o.cloneRange();
        f.setStart(f.endContainer, r + c.length);
        const h = f.getClientRects()[0];
        this.atwho = {
          range: o,
          offset: r,
          list: s,
          x: h.left,
          y: h.top - 4,
          cur: 0
        };
      })();
    },
    scrollToCur() {
      const s = this.$refs.cur[0], o = s.parentElement.parentElement;
      Ce(s, o);
    },
    selectByMouse(s) {
      const r = +Je(s.target, (c) => c.getAttribute("data-index")).getAttribute("data-index");
      this.atwho = {
        ...this.atwho,
        cur: r
      };
    },
    selectByKeyboard(s) {
      const o = s.keyCode === 38 ? -1 : 1, { cur: r, list: c } = this.atwho, _ = this.loop ? (r + o + c.length) % c.length : Math.max(0, Math.min(r + o, c.length - 1));
      this.atwho = {
        ...this.atwho,
        cur: _
      };
    },
    insertText(s, o, r) {
      o.deleteContents();
      const c = o.endContainer, _ = se(32);
      if (c.nodeType === Node.TEXT_NODE) {
        const f = o.endOffset;
        this.dataList[this.atwho.cur];
        const h = document.createElement("span");
        h.textContent = `#${s}`, h.classList.add("editor-component"), h.dataset.type = r.type, h.dataset.otherData = JSON.stringify(
          r.otherData || {}
        ), r.otherData && r.otherData.placeholder && (h.dataset.placeholder = r.otherData.placeholder), h.dataset.markId = _, h.contentEditable = !1;
        let v = null, y = null;
        if (c.parentNode.nodeType === 1 && c.parentNode.dataset.type === "editor-text") {
          const E = [...c.parentNode.style].map((x) => ({
            key: x,
            value: c.parentNode.style[x]
          }));
          v = document.createElement("span"), v.textContent = c.data.slice(0, f - 1), v.dataset.type = "editor-text", E.forEach((x) => {
            v.style[x.key] = x.value;
          }), y = document.createElement("span"), y.textContent = c.data.slice(f), y.dataset.type = "editor-text", E.forEach((x) => {
            y.style[x.key] = x.value;
          }), c.parentNode.replaceWith(v, h, y);
        } else
          v = document.createTextNode(
            c.data.slice(0, f - 1)
          ), y = document.createTextNode(c.data.slice(f)), o.commonAncestorContainer.data = "", o.insertNode(y), o.insertNode(h), o.insertNode(v);
      } else {
        const f = document.createTextNode(s);
        o.insertNode(f), o.setEndAfter(f);
      }
      o.collapse(!1), G(o), this.dispatchInput(), setTimeout(() => {
        this.$emit("setBack", _);
      });
    },
    insertHtml(s, o) {
      o.deleteContents();
      const r = o.endContainer;
      var c = document.createElement("span");
      if (c.appendChild(document.createTextNode(" ")), c.appendChild(this.htmlToElement(s)), c.appendChild(document.createTextNode(" ")), c.setAttribute("data-at-embedded", ""), c.setAttribute("contenteditable", !1), r.nodeType === Node.TEXT_NODE) {
        const f = o.endOffset;
        var _ = r.splitText(f);
        r.parentNode.insertBefore(c, _), o.setEndBefore(_);
      } else {
        const f = document.createTextNode(this.suffix);
        o.insertNode(c), o.setEndAfter(c), o.insertNode(f), o.setEndAfter(f);
      }
      o.collapse(!1), G(o);
    },
    insertItem() {
      const { range: s, offset: o, list: r, cur: c } = this.atwho, { suffix: _, atItems: f, itemName: h, customsEmbedded: v } = this, y = s.cloneRange(), E = s.toString(), { at: x, index: C } = ue(E, f), g = v ? C : C + x.length;
      y.setStart(y.endContainer, g), G(y), G(y);
      const S = r[c];
      if (v) {
        const A = this.$refs.embeddedItem.firstChild.innerHTML;
        this.insertHtml(A, y);
      } else {
        const A = h(S) + _;
        this.insertText(A, y, S);
      }
      this.$emit("insert", S), this.handleInput(), Ce(y);
    },
    htmlToElement(s) {
      var o = document.createElement("template");
      return s = s.trim(), o.innerHTML = s, o.content.firstChild;
    }
  }
}, et = /* @__PURE__ */ Te(je, [["render", Ze]]);
const tt = ["onClick"], nt = {
  key: 1,
  class: "menu-item x2"
}, st = ["onKeydown"], it = {
  __name: "SelectMenu",
  props: {
    openEdit: {
      type: Boolean,
      default: !0,
      required: !0,
      validator: (s) => $(s, "Boolean")
    }
  },
  emits: ["setBack"],
  setup(s, { emit: o }) {
    const r = s, c = J([
      {
        title: "\u52A0\u7C97",
        class: "icon-strong",
        type: "button",
        styles: [
          {
            key: "font-weight",
            value: 700
          }
        ]
      },
      {
        title: "\u659C\u4F53",
        class: "icon-italics",
        type: "button",
        styles: [
          {
            key: "font-style",
            value: "italic"
          }
        ]
      },
      {
        title: "\u5DE6\u5BF9\u9F50",
        class: "icon-left",
        type: "button",
        styles: [
          {
            key: "text-align",
            value: "left"
          }
        ]
      },
      {
        title: "\u5C45\u4E2D",
        class: "icon-center",
        type: "button",
        styles: [
          {
            key: "text-align",
            value: "center"
          }
        ]
      },
      {
        title: "\u53F3\u5BF9\u9F50",
        class: "icon-right",
        type: "button",
        styles: [
          {
            key: "text-align",
            value: "right"
          }
        ]
      },
      {
        title: "\u5B57\u4F53\u5927\u5C0F",
        class: "icon-fontsize x2",
        type: "input"
      }
    ]), _ = J(16), f = J(!1), h = J(!1), v = Ne({
      x: 0,
      y: 0
    });
    let y = null;
    const E = (e = !0) => {
      const t = document.querySelector(".r-editor"), i = function(d) {
        !r.openEdit || (f.value = !0);
      }, a = function(d) {
        var K;
        if (!r.openEdit)
          return;
        f.value = !1;
        const b = window.getSelection();
        let p = [...((K = b.baseNode) == null ? void 0 : K.classList) || []];
        p.includes("menu-item") || p.includes("r-select-menu") || p.includes("r-menu-input") || (b.isCollapsed ? (h.value = !1, v.x = 0, v.y = 0) : (h.value = !0, y = b.getRangeAt(0)));
      }, u = function(d) {
        !r.openEdit || f.value && !window.getSelection().isCollapsed && (h.value = !0, v.x = d.layerX, v.y = d.layerY + 24);
      };
      e ? (t.addEventListener("mousedown", i), t.addEventListener("mouseup", a), t.addEventListener("mousemove", u)) : (t.removeEventListener("mousedown", i), t.removeEventListener("mouseup", a), t.removeEventListener("mousemove", u));
    }, x = (e) => {
      if (e.keyCode === 13) {
        const t = {
          styles: [
            {
              key: "font-size",
              value: `${_.value}px`
            }
          ]
        };
        g(t), h.value = !1;
      }
    }, C = (e) => {
      h.value = !1;
      const t = q(e);
      g(t);
    }, g = (e) => {
      if (!y)
        return;
      const t = y.startContainer, i = y.endContainer;
      if (t === i) {
        n(e);
        return;
      }
      S(e);
    }, S = (e) => {
      const t = y.startContainer.parentNode.dataset.type === "editor-text" ? y.startContainer.parentNode : y.startContainer, i = y.endContainer.parentNode.dataset.type === "editor-text" ? y.endContainer.parentNode : y.endContainer, a = y.commonAncestorContainer, u = y.startOffset, d = y.endOffset, b = [...a.childNodes].filter((m) => m.textContent || m.nodeType === 1 && m.dataset.type).entries(), p = [];
      let K = !1;
      for (; ; ) {
        const m = b.next();
        if (m.done) {
          A(p, a);
          return;
        }
        m.value[0];
        const w = m.value[1];
        if (w.nodeType === 1 && w.dataset.type !== "editor-text") {
          p.push(w);
          continue;
        }
        let M = 0, V = w.textContent.length;
        if (w === t && (M = u, V = w.textContent.length, K = !0), w === i) {
          M = 0, V = d, K = !1;
          const B = L(e, w, M, V);
          p.push(...B);
        }
        if (K) {
          const B = L(e, w, M, V);
          p.push(...B);
        } else
          w !== i && w.textContent && p.push(w);
      }
    }, A = (e, t) => {
      if (e = e.filter(
        (a) => a.textContent || a.nodeType === 1 && a.dataset.type
      ), !e || !e.length)
        return;
      const i = [];
      e.forEach((a) => {
        const u = i.pop();
        if (!u) {
          i.push(a);
          return;
        }
        if (a.nodeType === 1 && a.dataset.type !== "editor-text") {
          i.push(u, a);
          return;
        }
        if (u.nodeType === 3) {
          if (a.nodeType === 3) {
            u.textContent += a.textContent, i.push(u);
            return;
          }
          i.push(u, a);
          return;
        }
        if (a.nodeType === 3) {
          i.push(u, a);
          return;
        }
        const d = [...u.style], b = [...a.style];
        if (d.length === b.length && !d.some((p) => u.style[p] !== a.style[p])) {
          u.textContent += a.textContent, i.push(u);
          return;
        }
        i.push(u, a);
      }), i.length && t.replaceChildren(...i), R();
    }, R = () => {
      const e = se(32);
      o("setBack", e);
    }, L = (e, t, i, a) => {
      let u = null, d = null, b = null;
      t.textContent.length;
      const p = q(e);
      let K = [];
      return t.nodeType === 1 && (K = [...t.style].map((m) => ({
        key: m,
        value: t.style[m]
      })).filter((m) => m.value !== "")), K.forEach((m) => {
        p.styles.some((w) => w.key === m.key) || p.styles.push({
          ...m
        });
      }), d = l(p, t.textContent.slice(i, a)), t.nodeType === 3 ? (u = document.createTextNode(t.textContent.slice(0, i)), b = document.createTextNode(t.textContent.slice(a)), [u, d, b]) : t.nodeType === 1 ? (u = l(
        { styles: K },
        t.textContent.slice(0, i)
      ), b = l(
        { styles: K },
        t.textContent.slice(a)
      ), [u, d, b]) : (console.error("\u7C7B\u578B\u9519\u8BEF", t, t.nodeType), []);
    }, n = (e) => {
      const t = y.commonAncestorContainer, i = y.endContainer, a = y.startOffset, u = y.endOffset;
      if (t.nodeType === 3 && t.parentNode.dataset.type === "editor-text") {
        const m = L(
          e,
          t.parentNode,
          a,
          u
        );
        t.parentNode.replaceWith(...m), R();
        return;
      }
      const d = document.createTextNode(i.data.slice(0, a)), b = document.createTextNode(i.data.slice(u)), p = i.data.slice(a, u), K = l(e, p);
      y.commonAncestorContainer.data = "", y.insertNode(b), y.insertNode(K), y.insertNode(d), y = null, R();
    }, l = (e, t) => {
      if (!t)
        return document.createTextNode("");
      const i = document.createElement("span");
      return i.textContent = `${t}`, i.dataset.type = "editor-text", e.styles.forEach((a) => {
        i.style[a.key] = a.value;
      }), i;
    };
    return we(() => {
      E();
    }), ke(() => {
      E(!1);
    }), (e, t) => h.value ? (N(), D("div", {
      key: 0,
      class: "r-select-menu",
      style: W(`left:${v.x}px;top:${v.y}px`)
    }, [
      (N(!0), D(H, null, X(c.value, (i) => (N(), D(H, null, [
        i.type === "button" ? (N(), D("div", {
          key: 0,
          class: "menu-item",
          onClick: ve((a) => C(i), ["prevent", "stop"])
        }, [
          U("span", {
            class: ce(["r-icon", i.class])
          }, null, 2)
        ], 8, tt)) : ne("", !0),
        i.type === "input" ? (N(), D("div", nt, [
          U("span", {
            class: ce(["r-icon", i.class])
          }, ":", 2),
          ie(U("input", {
            class: "r-menu-input",
            type: "text",
            "onUpdate:modelValue": t[0] || (t[0] = (a) => _.value = a),
            maxlength: "2",
            onKeydown: De(ve(x, ["stop", "prevent"]), ["enter"])
          }, null, 40, st), [
            [xe, _.value]
          ])
        ])) : ne("", !0)
      ], 64))), 256))
    ], 4)) : ne("", !0);
  }
}, ot = /* @__PURE__ */ Te(it, [["__scopeId", "data-v-2c7d4078"]]);
const rt = {
  class: "r-editor",
  id: "rhapsody-editor"
}, at = ["contenteditable", "data-type"], dt = ["data-type", "contenteditable"], lt = {
  name: "REditor"
}, Ke = /* @__PURE__ */ Object.assign(lt, {
  props: {
    openEdit: {
      type: Boolean,
      default: !0,
      required: !0,
      validator: (s) => $(s, "Boolean")
    },
    configs: {
      type: Object,
      required: !0,
      validator: (s) => $(s, "Object")
    }
  },
  setup(s, { expose: o }) {
    const r = s, c = te.LineBreak;
    let _ = te.DefaultComponents;
    const f = J(null);
    let h = !1;
    const v = r.configs.historyStackLength || te.DefaultHistoryStackLength, y = r.configs.inputRecordInterval || te.DefaultInputRecordInterval;
    let E = J(q(r.configs.data)), x = J([]);
    r.configs.components && r.configs.components.length ? (x.value = r.configs.components.filter((d) => !d.isNotMenuItem).map((d) => ({
      type: d.type,
      key: d.key,
      name: d.name,
      otherData: d.otherData
    })), _ = [...r.configs.components]) : x.value = _.filter((d) => !d.isNotMenuItem).map((d) => ({
      type: d.type,
      key: d.key,
      name: d.name,
      otherData: d.otherData
    }));
    const C = [];
    C.push(q(r.configs.data));
    let g = C.length;
    const S = (d) => {
      if (!d)
        return d;
      const b = _.find((p) => p.type === d);
      return b ? b.component : d;
    }, A = (d) => {
      console.log("\u89E6\u53D1setBack-markId", d), R(d, !0);
    }, R = async (d, b = !1) => {
      const p = document.querySelectorAll(".r-item");
      if (!p || !p.length) {
        E.value = [];
        return;
      }
      const K = [], m = {
        index1: null,
        index2: null,
        index3: null
      };
      if (p.forEach((w, M) => {
        const V = {};
        [...w.style].forEach((k) => {
          V[k] = w.style[k];
        });
        const B = {
          type: w.dataset.type || "",
          name: w.dataset.name || "",
          style: V,
          childs: []
        };
        K.push(B);
        let O = {
          type: "row",
          key: "",
          class: "",
          childs: []
        }, P = w.childNodes;
        if (P = [...P].filter((k) => k.nodeType !== 8).filter((k) => k.nodeType !== 3 || k.data), !P || !P.length) {
          B.childs.push(O), m.index1 = M, m.index2 = 0, m.index3 = 0;
          return;
        }
        const j = P.filter(
          (k) => !(c.includes(k.data) || c.includes(k.innerHTML))
        ).findIndex(
          (k) => k.dataset && k.dataset.markId === d
        );
        j >= 0 && (m.index1 = M, m.index2 = j), P.forEach((k, oe) => {
          if (k.nodeType === 3)
            oe > 0 && (c.includes(k.data) || c.includes(k.innerHTML)) ? (O.childs.length === 0 && O.childs.push({
              type: "editor-text",
              value: "  "
            }), B.childs.push(O), O = {
              type: "row",
              key: "",
              childs: []
            }) : O.childs.push({
              type: "editor-text",
              value: k.innerHTML || k.data
            });
          else if (k.nodeType === 1) {
            if (k.dataset.type === "row") {
              const Y = {};
              [...k.style].forEach((T) => {
                Y[T] = k.style[T];
              }), O = {
                type: "row",
                key: "",
                style: Y,
                childs: []
              }, B.childs.push(O), [...k.childNodes].filter((T) => T.nodeType !== 8).filter((T) => T.nodeType !== 3 || T.data).forEach((T, pe) => {
                if (T.dataset && T.dataset.markId === d && (m.index1 = M, m.index2 = oe, m.index3 = pe), T.nodeType === 3)
                  O.childs.push({
                    type: "editor-text",
                    value: T.innerHTML || T.data
                  });
                else if (T.nodeType === 1)
                  if (T.tagName === "BR")
                    O.childs.push({
                      type: "editor-text",
                      value: "  "
                    });
                  else {
                    let ye = T.dataset.value, ae = T.dataset.style ? JSON.parse(T.dataset.style) : {};
                    T.dataset.type === "editor-text" && (ye = T.textContent, ae = {}, [...T.style].forEach((me) => {
                      ae[me] = T.style[me];
                    })), O.childs.push({
                      type: T.dataset.type,
                      value: ye,
                      style: ae,
                      placeholder: T.dataset.placeholder || "",
                      otherData: T.dataset.otherData ? JSON.parse(T.dataset.otherData) : {}
                    });
                    const z = T.querySelector(".editor-component");
                    if (!z || z.dataset.markId !== d)
                      return;
                    m.index1 = M, m.index2 = oe, m.index3 = pe + 1, O.childs.push({
                      type: z.dataset.type,
                      value: z.dataset.value,
                      style: z.dataset.style ? JSON.parse(z.dataset.style) : {},
                      placeholder: z.dataset.placeholder || "",
                      otherData: z.dataset.otherData ? JSON.parse(
                        z.dataset.otherData
                      ) : {}
                    });
                  }
              });
            } else if (k.dataset.type) {
              const Y = {};
              [...k.style].forEach((T) => {
                Y[T] = k.style[T];
              });
              let re = k.dataset.value;
              k.dataset.type === "editor-text" && (re = k.textContent), O.childs.push({
                type: k.dataset.type,
                style: Y,
                value: re,
                placeholder: k.dataset.placeholder || "",
                otherData: k.dataset.otherData ? JSON.parse(k.dataset.otherData) : {}
              });
            }
          }
        }), O.type && O !== B.childs[B.childs.length - 1] && B.childs.push(O);
      }), b)
        C.splice(g, C.length - g - 1), C.push(q(K)), C.length > v && C.splice(0, C.length - v), g = C.length - 1;
      else
        return;
      E.value = [], await Q(), E.value = q(K), m.index1 !== null && m.index2 !== null && m.index3 !== null && (await Q(), setTimeout(() => {
        let w = document.querySelectorAll(".r-item")[m.index1];
        !w || (w = w.querySelectorAll('[data-type="row"]')[m.index2], w && (w = w.childNodes[m.index3 + 4], w && (h = !0, L(w, 0))));
      }));
    }, L = (d, b = 0) => {
      const p = document.createRange();
      p.selectNodeContents(d), p.collapse(!1), p.setStart(d, b), p.setEnd(d, b);
      const K = window.getSelection();
      K.removeAllRanges(), K.addRange(p);
    };
    let n = !1;
    const l = (d = !0) => {
      const b = (M) => {
        f.value.atwho || t();
      }, p = (M) => {
        f.value.atwho || i();
      }, K = (M) => {
        f.value.atwho || (console.log("compositionstart", M), n = !0);
      }, m = () => be((M) => {
        f.value.atwho || (console.log(
          "input isInput isAddComponent",
          M,
          n,
          h
        ), !n && !h && e(), h && (h = !1));
      }, y), w = () => be((M) => {
        f.value.atwho || (console.log("compositionend", M), n = !1, e());
      }, y);
      d ? (ee.bind(["command + z", "ctrl + z"], b), ee.bind(["ctrl + y", "command + shift > z"], p), document.querySelector("#rhapsody-editor").addEventListener("compositionstart", K), document.querySelector("#rhapsody-editor").addEventListener("input", m()), document.querySelector("#rhapsody-editor").addEventListener("compositionend", w)) : (ee.unbind(["command + z", "ctrl + z"], b), ee.unbind(
        ["ctrl + y", "command + shift > z"],
        p
      ), document.querySelector("#rhapsody-editor").removeEventListener("compositionstart", K), document.querySelector("#rhapsody-editor").removeEventListener("input", m()), document.querySelector("#rhapsody-editor").removeEventListener("compositionend", w));
    }, e = async () => {
      await R(se(32)), C.splice(g + 1), C.push(q(E.value)), C.length > v && C.splice(0, C.length - v), g = C.length;
    }, t = async () => {
      C.length <= g && (g = C.length - 1), C[g - 1] && (E.value = [], g -= 1, await Q(), E.value = q(C[g]));
    }, i = async () => {
      !C[g + 1] || (E.value = [], g += 1, await Q(), E.value = q(C[g]));
    };
    return o({ revokeData: t, recoveryData: i, importData: async (d = []) => {
      E.value = [], C.length = 0, C.push(q(d)), g = C.length, await Q(), E.value = q(d);
    }, exportData: async (d) => {
      await R(se(32));
      const b = q(E.value);
      d && d(b);
    } }), we(() => {
      l();
    }), ke(() => {
      l(!1);
    }), (d, b) => (N(), D("div", rt, [
      ge(et, {
        at: "#",
        members: I(x),
        onSetBack: A,
        ref_key: "keyMarkRef",
        ref: f
      }, {
        default: Be(() => [
          (N(!0), D(H, null, X(I(E), (p) => (N(), D("div", {
            class: "r-item",
            contenteditable: r.openEdit,
            "data-type": p.type,
            style: W(I(Z)(p.style))
          }, [
            (N(!0), D(H, null, X(p.childs, (K) => (N(), D("div", {
              class: "r-line",
              "data-type": K.type,
              contenteditable: r.openEdit,
              style: W(I(Z)(K.style))
            }, [
              (N(!0), D(H, null, X(K.childs, (m) => (N(), Oe(Le(S(m.type)), {
                contenteditable: s.openEdit,
                openEdit: r.openEdit,
                data: m
              }, null, 8, ["contenteditable", "openEdit", "data"]))), 256))
            ], 12, dt))), 256))
          ], 12, at))), 256))
        ]),
        _: 1
      }, 8, ["members"]),
      ge(ot, {
        onSetBack: A,
        openEdit: r.openEdit
      }, null, 8, ["openEdit"])
    ]));
  }
});
const ct = {
  install(s) {
    s.component(Ke.name, Ke);
  }
};
export {
  Ke as REditor,
  ct as default
};
