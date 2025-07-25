import { ref as D, computed as I, nextTick as Ae, createElementBlock as x, openBlock as b, createElementVNode as p, renderSlot as ne, inject as $e, isRef as Tp, defineComponent as H, createVNode as ue, withCtx as Y, createTextVNode as _r, toDisplayString as ve, unref as _, createCommentVNode as Q, getCurrentScope as Lp, onScopeDispose as Op, readonly as Rp, createBlock as X, withModifiers as Ke, onMounted as Be, onUnmounted as Pp, normalizeStyle as qe, withDirectives as Ye, withKeys as at, vModelText as Bp, Fragment as Pe, renderList as Je, onBeforeUnmount as Nt, getCurrentInstance as ot, watch as ae, warn as Rv, shallowRef as _n, onBeforeMount as Pv, provide as kt, mergeProps as je, toRef as Rt, useAttrs as lo, useSlots as zp, normalizeClass as j, resolveDynamicComponent as lt, vShow as Jt, Transition as nr, reactive as qn, onUpdated as Bv, cloneVNode as zv, Text as Dp, Comment as Dv, Teleport as Nv, onDeactivated as qv, watchEffect as Jc, toRaw as Zo, toRefs as as, triggerRef as Pr, resolveComponent as In, resolveDirective as Qc, createSlots as Xr, h as Lt, normalizeProps as Yr, createStaticVNode as Fn, useCssModule as cs, pushScopeId as Fv, popScopeId as jv, guardReactiveProps as Np, mergeDefaults as qp, createApp as Hv } from "vue";
/*! Package version @n8n/chat@0.47.0 */
const Br = {
  webhookUrl: "http://n8n.hostfabtech.xyz:83/webhook/e3fd5f31-20dc-46cf-84e8-fd042f17f672/chat",
  webhookConfig: {
    method: "POST",
    headers: {}
  },
  target: "#n8n-chat",
  mode: "window",
  loadPreviousSession: !0,
  chatInputKey: "chatInput",
  chatSessionKey: "sessionId",
  defaultLanguage: "en",
  showWelcomeScreen: !1,
  initialMessages: ["Hi there! 👋", "My name is Nathan. How can I assist you today?"],
  i18n: {
    en: {
      title: "Hi there! 👋",
      subtitle: "Start a chat. We're here to help you 24/7.",
      footer: "",
      getStarted: "New Conversation",
      inputPlaceholder: "Type your question..",
      closeButtonTooltip: "Close chat"
    }
  },
  theme: {}
}, Vv = "#n8n-chat", Uv = "n8n-chat", ou = `${Uv}/sessionId`, Fp = "Chat", jp = "ChatOptions";
var nt = [];
for (var zs = 0; zs < 256; ++zs)
  nt.push((zs + 256).toString(16).slice(1));
function Zv(e, t = 0) {
  return (nt[e[t + 0]] + nt[e[t + 1]] + nt[e[t + 2]] + nt[e[t + 3]] + "-" + nt[e[t + 4]] + nt[e[t + 5]] + "-" + nt[e[t + 6]] + nt[e[t + 7]] + "-" + nt[e[t + 8]] + nt[e[t + 9]] + "-" + nt[e[t + 10]] + nt[e[t + 11]] + nt[e[t + 12]] + nt[e[t + 13]] + nt[e[t + 14]] + nt[e[t + 15]]).toLowerCase();
}
var wo, Wv = new Uint8Array(16);
function Gv() {
  if (!wo && (wo = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !wo))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return wo(Wv);
}
var Kv = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const su = {
  randomUUID: Kv
};
function zr(e, t, n) {
  if (su.randomUUID && !e)
    return su.randomUUID();
  e = e || {};
  var r = e.random || (e.rng || Gv)();
  return r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, Zv(r);
}
async function Xv() {
  return "";
}
async function el(...e) {
  var o, i;
  const t = await Xv(), n = (o = e[1]) == null ? void 0 : o.body, r = {
    ...t ? { authorization: `Bearer ${t}` } : {},
    ...(i = e[1]) == null ? void 0 : i.headers
  };
  return n instanceof FormData ? delete r["Content-Type"] : r["Content-Type"] = "application/json", await (await fetch(e[0], {
    ...e[1],
    mode: "cors",
    cache: "no-cache",
    headers: r
  })).json();
}
async function Hp(e, t = {}, n = {}) {
  let r = e;
  return Object.keys(t).length > 0 && (r = `${r}?${new URLSearchParams(
    t
  ).toString()}`), await el(r, { ...n, method: "GET" });
}
async function Vp(e, t = {}, n = {}) {
  return await el(e, {
    ...n,
    method: "POST",
    body: JSON.stringify(t)
  });
}
async function Yv(e, t = {}, n = [], r = {}) {
  const s = new FormData();
  for (const o in t)
    s.append(o, t[o]);
  for (const o of n)
    s.append("files", o);
  return await el(e, {
    ...r,
    method: "POST",
    body: s
  });
}
async function Jv(e, t) {
  var r, s;
  return await (((r = t.webhookConfig) == null ? void 0 : r.method) === "POST" ? Vp : Hp)(
    `${t.webhookUrl}`,
    {
      action: "loadPreviousSession",
      [t.chatSessionKey]: e,
      ...t.metadata ? { metadata: t.metadata } : {}
    },
    {
      headers: (s = t.webhookConfig) == null ? void 0 : s.headers
    }
  );
}
async function Qv(e, t, n, r) {
  var o, i, a;
  return t.length > 0 ? await Yv(
    `${r.webhookUrl}`,
    {
      action: "sendMessage",
      [r.chatSessionKey]: n,
      [r.chatInputKey]: e,
      ...r.metadata ? { metadata: r.metadata } : {}
    },
    t,
    {
      headers: (o = r.webhookConfig) == null ? void 0 : o.headers
    }
  ) : await (((i = r.webhookConfig) == null ? void 0 : i.method) === "POST" ? Vp : Hp)(
    `${r.webhookUrl}`,
    {
      action: "sendMessage",
      [r.chatSessionKey]: n,
      [r.chatInputKey]: e,
      ...r.metadata ? { metadata: r.metadata } : {}
    },
    {
      headers: (a = r.webhookConfig) == null ? void 0 : a.headers
    }
  );
}
function e_() {
  const e = /* @__PURE__ */ new Map();
  function t(s, o) {
    const i = e.get(s);
    i && i.splice(i.indexOf(o) >>> 0, 1);
  }
  function n(s, o) {
    let i = e.get(s);
    return i ? i.push(o) : i = [o], e.set(s, i), () => t(s, o);
  }
  function r(s, o) {
    const i = e.get(s);
    i && i.slice().forEach(async (a) => {
      await a(o);
    });
  }
  return {
    on: n,
    off: t,
    emit: r
  };
}
function t_(e) {
  if (!document.querySelector(e)) {
    const n = document.createElement("div");
    e.startsWith("#") && (n.id = e.replace("#", "")), e.startsWith(".") && n.classList.add(e.replace(".", "")), document.body.appendChild(n);
  }
}
const vt = e_(), n_ = {
  install(e, t) {
    e.provide(jp, t);
    const n = D([]), r = D(null), s = D(!1), o = I(
      () => (t.initialMessages ?? []).map((d) => ({
        id: zr(),
        text: d,
        sender: "bot"
      }))
    );
    async function i(d, l = []) {
      const m = {
        id: zr(),
        text: d,
        sender: "user",
        files: l
      };
      n.value.push(m), s.value = !0, Ae(() => {
        vt.emit("scrollToBottom");
      });
      const f = await Qv(
        d,
        l,
        r.value,
        t
      );
      let v = f.output ?? f.text ?? "";
      if (v === "" && Object.keys(f).length > 0)
        try {
          v = JSON.stringify(f, null, 2);
        } catch {
        }
      const g = {
        id: zr(),
        text: v,
        sender: "bot"
      };
      n.value.push(g), s.value = !1, Ae(() => {
        vt.emit("scrollToBottom");
      });
    }
    async function a() {
      if (!t.loadPreviousSession)
        return;
      const d = localStorage.getItem(ou) ?? zr(), l = await Jv(d, t);
      return n.value = ((l == null ? void 0 : l.data) || []).map((m, f) => ({
        id: `${f}`,
        text: m.kwargs.content,
        sender: m.id.includes("HumanMessage") ? "user" : "bot"
      })), n.value.length && (r.value = d), d;
    }
    async function c() {
      r.value = zr(), localStorage.setItem(ou, r.value);
    }
    const u = {
      initialMessages: o,
      messages: n,
      currentSessionId: r,
      waitingForResponse: s,
      loadPreviousSession: a,
      startNewSession: c,
      sendMessage: i
    };
    e.provide(Fp, u), e.config.globalProperties.$chat = u;
  }
};
var ko = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ar(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function r_(e) {
  if (Object.prototype.hasOwnProperty.call(e, "__esModule")) return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(r) {
    var s = Object.getOwnPropertyDescriptor(e, r);
    Object.defineProperty(n, r, s.get ? s : {
      enumerable: !0,
      get: function() {
        return e[r];
      }
    });
  }), n;
}
var Ds, iu;
function o_() {
  if (iu) return Ds;
  iu = 1;
  function e(S) {
    return S instanceof Map ? S.clear = S.delete = S.set = function() {
      throw new Error("map is read-only");
    } : S instanceof Set && (S.add = S.clear = S.delete = function() {
      throw new Error("set is read-only");
    }), Object.freeze(S), Object.getOwnPropertyNames(S).forEach((T) => {
      const q = S[T], se = typeof q;
      (se === "object" || se === "function") && !Object.isFrozen(q) && e(q);
    }), S;
  }
  class t {
    /**
     * @param {CompiledMode} mode
     */
    constructor(T) {
      T.data === void 0 && (T.data = {}), this.data = T.data, this.isMatchIgnored = !1;
    }
    ignoreMatch() {
      this.isMatchIgnored = !0;
    }
  }
  function n(S) {
    return S.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
  }
  function r(S, ...T) {
    const q = /* @__PURE__ */ Object.create(null);
    for (const se in S)
      q[se] = S[se];
    return T.forEach(function(se) {
      for (const be in se)
        q[be] = se[be];
    }), /** @type {T} */
    q;
  }
  const s = "</span>", o = (S) => !!S.scope, i = (S, { prefix: T }) => {
    if (S.startsWith("language:"))
      return S.replace("language:", "language-");
    if (S.includes(".")) {
      const q = S.split(".");
      return [
        `${T}${q.shift()}`,
        ...q.map((se, be) => `${se}${"_".repeat(be + 1)}`)
      ].join(" ");
    }
    return `${T}${S}`;
  };
  class a {
    /**
     * Creates a new HTMLRenderer
     *
     * @param {Tree} parseTree - the parse tree (must support `walk` API)
     * @param {{classPrefix: string}} options
     */
    constructor(T, q) {
      this.buffer = "", this.classPrefix = q.classPrefix, T.walk(this);
    }
    /**
     * Adds texts to the output stream
     *
     * @param {string} text */
    addText(T) {
      this.buffer += n(T);
    }
    /**
     * Adds a node open to the output stream (if needed)
     *
     * @param {Node} node */
    openNode(T) {
      if (!o(T)) return;
      const q = i(
        T.scope,
        { prefix: this.classPrefix }
      );
      this.span(q);
    }
    /**
     * Adds a node close to the output stream (if needed)
     *
     * @param {Node} node */
    closeNode(T) {
      o(T) && (this.buffer += s);
    }
    /**
     * returns the accumulated buffer
    */
    value() {
      return this.buffer;
    }
    // helpers
    /**
     * Builds a span element
     *
     * @param {string} className */
    span(T) {
      this.buffer += `<span class="${T}">`;
    }
  }
  const c = (S = {}) => {
    const T = { children: [] };
    return Object.assign(T, S), T;
  };
  class u {
    constructor() {
      this.rootNode = c(), this.stack = [this.rootNode];
    }
    get top() {
      return this.stack[this.stack.length - 1];
    }
    get root() {
      return this.rootNode;
    }
    /** @param {Node} node */
    add(T) {
      this.top.children.push(T);
    }
    /** @param {string} scope */
    openNode(T) {
      const q = c({ scope: T });
      this.add(q), this.stack.push(q);
    }
    closeNode() {
      if (this.stack.length > 1)
        return this.stack.pop();
    }
    closeAllNodes() {
      for (; this.closeNode(); ) ;
    }
    toJSON() {
      return JSON.stringify(this.rootNode, null, 4);
    }
    /**
     * @typedef { import("./html_renderer").Renderer } Renderer
     * @param {Renderer} builder
     */
    walk(T) {
      return this.constructor._walk(T, this.rootNode);
    }
    /**
     * @param {Renderer} builder
     * @param {Node} node
     */
    static _walk(T, q) {
      return typeof q == "string" ? T.addText(q) : q.children && (T.openNode(q), q.children.forEach((se) => this._walk(T, se)), T.closeNode(q)), T;
    }
    /**
     * @param {Node} node
     */
    static _collapse(T) {
      typeof T != "string" && T.children && (T.children.every((q) => typeof q == "string") ? T.children = [T.children.join("")] : T.children.forEach((q) => {
        u._collapse(q);
      }));
    }
  }
  class d extends u {
    /**
     * @param {*} options
     */
    constructor(T) {
      super(), this.options = T;
    }
    /**
     * @param {string} text
     */
    addText(T) {
      T !== "" && this.add(T);
    }
    /** @param {string} scope */
    startScope(T) {
      this.openNode(T);
    }
    endScope() {
      this.closeNode();
    }
    /**
     * @param {Emitter & {root: DataNode}} emitter
     * @param {string} name
     */
    __addSublanguage(T, q) {
      const se = T.root;
      q && (se.scope = `language:${q}`), this.add(se);
    }
    toHTML() {
      return new a(this, this.options).value();
    }
    finalize() {
      return this.closeAllNodes(), !0;
    }
  }
  function l(S) {
    return S ? typeof S == "string" ? S : S.source : null;
  }
  function m(S) {
    return g("(?=", S, ")");
  }
  function f(S) {
    return g("(?:", S, ")*");
  }
  function v(S) {
    return g("(?:", S, ")?");
  }
  function g(...S) {
    return S.map((q) => l(q)).join("");
  }
  function y(S) {
    const T = S[S.length - 1];
    return typeof T == "object" && T.constructor === Object ? (S.splice(S.length - 1, 1), T) : {};
  }
  function h(...S) {
    return "(" + (y(S).capture ? "" : "?:") + S.map((se) => l(se)).join("|") + ")";
  }
  function w(S) {
    return new RegExp(S.toString() + "|").exec("").length - 1;
  }
  function k(S, T) {
    const q = S && S.exec(T);
    return q && q.index === 0;
  }
  const C = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
  function A(S, { joinWith: T }) {
    let q = 0;
    return S.map((se) => {
      q += 1;
      const be = q;
      let ke = l(se), te = "";
      for (; ke.length > 0; ) {
        const J = C.exec(ke);
        if (!J) {
          te += ke;
          break;
        }
        te += ke.substring(0, J.index), ke = ke.substring(J.index + J[0].length), J[0][0] === "\\" && J[1] ? te += "\\" + String(Number(J[1]) + be) : (te += J[0], J[0] === "(" && q++);
      }
      return te;
    }).map((se) => `(${se})`).join(T);
  }
  const E = /\b\B/, $ = "[a-zA-Z]\\w*", M = "[a-zA-Z_]\\w*", O = "\\b\\d+(\\.\\d+)?", R = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", B = "\\b(0b[01]+)", V = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", re = (S = {}) => {
    const T = /^#![ ]*\//;
    return S.binary && (S.begin = g(
      T,
      /.*\b/,
      S.binary,
      /\b.*/
    )), r({
      scope: "meta",
      begin: T,
      end: /$/,
      relevance: 0,
      /** @type {ModeCallback} */
      "on:begin": (q, se) => {
        q.index !== 0 && se.ignoreMatch();
      }
    }, S);
  }, P = {
    begin: "\\\\[\\s\\S]",
    relevance: 0
  }, U = {
    scope: "string",
    begin: "'",
    end: "'",
    illegal: "\\n",
    contains: [P]
  }, z = {
    scope: "string",
    begin: '"',
    end: '"',
    illegal: "\\n",
    contains: [P]
  }, N = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  }, F = function(S, T, q = {}) {
    const se = r(
      {
        scope: "comment",
        begin: S,
        end: T,
        contains: []
      },
      q
    );
    se.contains.push({
      scope: "doctag",
      // hack to avoid the space from being included. the space is necessary to
      // match here to prevent the plain text rule below from gobbling up doctags
      begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
      end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
      excludeBegin: !0,
      relevance: 0
    });
    const be = h(
      // list of common 1 and 2 letter words in English
      "I",
      "a",
      "is",
      "so",
      "us",
      "to",
      "at",
      "if",
      "in",
      "it",
      "on",
      // note: this is not an exhaustive list of contractions, just popular ones
      /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
      // contractions - can't we'd they're let's, etc
      /[A-Za-z]+[-][a-z]+/,
      // `no-way`, etc.
      /[A-Za-z][a-z]{2,}/
      // allow capitalized words at beginning of sentences
    );
    return se.contains.push(
      {
        // TODO: how to include ", (, ) without breaking grammars that use these for
        // comment delimiters?
        // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
        // ---
        // this tries to find sequences of 3 english words in a row (without any
        // "programming" type syntax) this gives us a strong signal that we've
        // TRULY found a comment - vs perhaps scanning with the wrong language.
        // It's possible to find something that LOOKS like the start of the
        // comment - but then if there is no readable text - good chance it is a
        // false match and not a comment.
        //
        // for a visual example please see:
        // https://github.com/highlightjs/highlight.js/issues/2827
        begin: g(
          /[ ]+/,
          // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
          "(",
          be,
          /[.]?[:]?([.][ ]|[ ])/,
          "){3}"
        )
        // look for 3 words in a row
      }
    ), se;
  }, Z = F("//", "$"), W = F("/\\*", "\\*/"), pe = F("#", "$"), le = {
    scope: "number",
    begin: O,
    relevance: 0
  }, Ee = {
    scope: "number",
    begin: R,
    relevance: 0
  }, Oe = {
    scope: "number",
    begin: B,
    relevance: 0
  }, ze = {
    scope: "regexp",
    begin: /\/(?=[^/\n]*\/)/,
    end: /\/[gimuy]*/,
    contains: [
      P,
      {
        begin: /\[/,
        end: /\]/,
        relevance: 0,
        contains: [P]
      }
    ]
  }, Qe = {
    scope: "title",
    begin: $,
    relevance: 0
  }, ft = {
    scope: "title",
    begin: M,
    relevance: 0
  }, Ve = {
    // excludes method names from keyword processing
    begin: "\\.\\s*" + M,
    relevance: 0
  };
  var oe = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    APOS_STRING_MODE: U,
    BACKSLASH_ESCAPE: P,
    BINARY_NUMBER_MODE: Oe,
    BINARY_NUMBER_RE: B,
    COMMENT: F,
    C_BLOCK_COMMENT_MODE: W,
    C_LINE_COMMENT_MODE: Z,
    C_NUMBER_MODE: Ee,
    C_NUMBER_RE: R,
    END_SAME_AS_BEGIN: function(S) {
      return Object.assign(
        S,
        {
          /** @type {ModeCallback} */
          "on:begin": (T, q) => {
            q.data._beginMatch = T[1];
          },
          /** @type {ModeCallback} */
          "on:end": (T, q) => {
            q.data._beginMatch !== T[1] && q.ignoreMatch();
          }
        }
      );
    },
    HASH_COMMENT_MODE: pe,
    IDENT_RE: $,
    MATCH_NOTHING_RE: E,
    METHOD_GUARD: Ve,
    NUMBER_MODE: le,
    NUMBER_RE: O,
    PHRASAL_WORDS_MODE: N,
    QUOTE_STRING_MODE: z,
    REGEXP_MODE: ze,
    RE_STARTERS_RE: V,
    SHEBANG: re,
    TITLE_MODE: Qe,
    UNDERSCORE_IDENT_RE: M,
    UNDERSCORE_TITLE_MODE: ft
  });
  function _e(S, T) {
    S.input[S.index - 1] === "." && T.ignoreMatch();
  }
  function He(S, T) {
    S.className !== void 0 && (S.scope = S.className, delete S.className);
  }
  function et(S, T) {
    T && S.beginKeywords && (S.begin = "\\b(" + S.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", S.__beforeBegin = _e, S.keywords = S.keywords || S.beginKeywords, delete S.beginKeywords, S.relevance === void 0 && (S.relevance = 0));
  }
  function gt(S, T) {
    Array.isArray(S.illegal) && (S.illegal = h(...S.illegal));
  }
  function jt(S, T) {
    if (S.match) {
      if (S.begin || S.end) throw new Error("begin & end are not supported with match");
      S.begin = S.match, delete S.match;
    }
  }
  function Ct(S, T) {
    S.relevance === void 0 && (S.relevance = 1);
  }
  const rn = (S, T) => {
    if (!S.beforeMatch) return;
    if (S.starts) throw new Error("beforeMatch cannot be used with starts");
    const q = Object.assign({}, S);
    Object.keys(S).forEach((se) => {
      delete S[se];
    }), S.keywords = q.keywords, S.begin = g(q.beforeMatch, m(q.begin)), S.starts = {
      relevance: 0,
      contains: [
        Object.assign(q, { endsParent: !0 })
      ]
    }, S.relevance = 0, delete q.beforeMatch;
  }, xt = [
    "of",
    "and",
    "for",
    "in",
    "not",
    "or",
    "if",
    "then",
    "parent",
    // common variable name
    "list",
    // common variable name
    "value"
    // common variable name
  ], Ht = "keyword";
  function st(S, T, q = Ht) {
    const se = /* @__PURE__ */ Object.create(null);
    return typeof S == "string" ? be(q, S.split(" ")) : Array.isArray(S) ? be(q, S) : Object.keys(S).forEach(function(ke) {
      Object.assign(
        se,
        st(S[ke], T, ke)
      );
    }), se;
    function be(ke, te) {
      T && (te = te.map((J) => J.toLowerCase())), te.forEach(function(J) {
        const fe = J.split("|");
        se[fe[0]] = [ke, Tt(fe[0], fe[1])];
      });
    }
  }
  function Tt(S, T) {
    return T ? Number(T) : St(S) ? 0 : 1;
  }
  function St(S) {
    return xt.includes(S.toLowerCase());
  }
  const Vt = {}, Xe = (S) => {
    console.error(S);
  }, G = (S, ...T) => {
    console.log(`WARN: ${S}`, ...T);
  }, de = (S, T) => {
    Vt[`${S}/${T}`] || (console.log(`Deprecated as of ${S}. ${T}`), Vt[`${S}/${T}`] = !0);
  }, Te = new Error();
  function Ue(S, T, { key: q }) {
    let se = 0;
    const be = S[q], ke = {}, te = {};
    for (let J = 1; J <= T.length; J++)
      te[J + se] = be[J], ke[J + se] = !0, se += w(T[J - 1]);
    S[q] = te, S[q]._emit = ke, S[q]._multi = !0;
  }
  function Ut(S) {
    if (Array.isArray(S.begin)) {
      if (S.skip || S.excludeBegin || S.returnBegin)
        throw Xe("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), Te;
      if (typeof S.beginScope != "object" || S.beginScope === null)
        throw Xe("beginScope must be object"), Te;
      Ue(S, S.begin, { key: "beginScope" }), S.begin = A(S.begin, { joinWith: "" });
    }
  }
  function Hn(S) {
    if (Array.isArray(S.end)) {
      if (S.skip || S.excludeEnd || S.returnEnd)
        throw Xe("skip, excludeEnd, returnEnd not compatible with endScope: {}"), Te;
      if (typeof S.endScope != "object" || S.endScope === null)
        throw Xe("endScope must be object"), Te;
      Ue(S, S.end, { key: "endScope" }), S.end = A(S.end, { joinWith: "" });
    }
  }
  function Vn(S) {
    S.scope && typeof S.scope == "object" && S.scope !== null && (S.beginScope = S.scope, delete S.scope);
  }
  function ir(S) {
    Vn(S), typeof S.beginScope == "string" && (S.beginScope = { _wrap: S.beginScope }), typeof S.endScope == "string" && (S.endScope = { _wrap: S.endScope }), Ut(S), Hn(S);
  }
  function Lr(S) {
    function T(te, J) {
      return new RegExp(
        l(te),
        "m" + (S.case_insensitive ? "i" : "") + (S.unicodeRegex ? "u" : "") + (J ? "g" : "")
      );
    }
    class q {
      constructor() {
        this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
      }
      // @ts-ignore
      addRule(J, fe) {
        fe.position = this.position++, this.matchIndexes[this.matchAt] = fe, this.regexes.push([fe, J]), this.matchAt += w(J) + 1;
      }
      compile() {
        this.regexes.length === 0 && (this.exec = () => null);
        const J = this.regexes.map((fe) => fe[1]);
        this.matcherRe = T(A(J, { joinWith: "|" }), !0), this.lastIndex = 0;
      }
      /** @param {string} s */
      exec(J) {
        this.matcherRe.lastIndex = this.lastIndex;
        const fe = this.matcherRe.exec(J);
        if (!fe)
          return null;
        const We = fe.findIndex((Et, Ts) => Ts > 0 && Et !== void 0), Ce = this.matchIndexes[We];
        return fe.splice(0, We), Object.assign(fe, Ce);
      }
    }
    class se {
      constructor() {
        this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
      }
      // @ts-ignore
      getMatcher(J) {
        if (this.multiRegexes[J]) return this.multiRegexes[J];
        const fe = new q();
        return this.rules.slice(J).forEach(([We, Ce]) => fe.addRule(We, Ce)), fe.compile(), this.multiRegexes[J] = fe, fe;
      }
      resumingScanAtSamePosition() {
        return this.regexIndex !== 0;
      }
      considerAll() {
        this.regexIndex = 0;
      }
      // @ts-ignore
      addRule(J, fe) {
        this.rules.push([J, fe]), fe.type === "begin" && this.count++;
      }
      /** @param {string} s */
      exec(J) {
        const fe = this.getMatcher(this.regexIndex);
        fe.lastIndex = this.lastIndex;
        let We = fe.exec(J);
        if (this.resumingScanAtSamePosition() && !(We && We.index === this.lastIndex)) {
          const Ce = this.getMatcher(0);
          Ce.lastIndex = this.lastIndex + 1, We = Ce.exec(J);
        }
        return We && (this.regexIndex += We.position + 1, this.regexIndex === this.count && this.considerAll()), We;
      }
    }
    function be(te) {
      const J = new se();
      return te.contains.forEach((fe) => J.addRule(fe.begin, { rule: fe, type: "begin" })), te.terminatorEnd && J.addRule(te.terminatorEnd, { type: "end" }), te.illegal && J.addRule(te.illegal, { type: "illegal" }), J;
    }
    function ke(te, J) {
      const fe = (
        /** @type CompiledMode */
        te
      );
      if (te.isCompiled) return fe;
      [
        He,
        // do this early so compiler extensions generally don't have to worry about
        // the distinction between match/begin
        jt,
        ir,
        rn
      ].forEach((Ce) => Ce(te, J)), S.compilerExtensions.forEach((Ce) => Ce(te, J)), te.__beforeBegin = null, [
        et,
        // do this later so compiler extensions that come earlier have access to the
        // raw array if they wanted to perhaps manipulate it, etc.
        gt,
        // default to 1 relevance if not specified
        Ct
      ].forEach((Ce) => Ce(te, J)), te.isCompiled = !0;
      let We = null;
      return typeof te.keywords == "object" && te.keywords.$pattern && (te.keywords = Object.assign({}, te.keywords), We = te.keywords.$pattern, delete te.keywords.$pattern), We = We || /\w+/, te.keywords && (te.keywords = st(te.keywords, S.case_insensitive)), fe.keywordPatternRe = T(We, !0), J && (te.begin || (te.begin = /\B|\b/), fe.beginRe = T(fe.begin), !te.end && !te.endsWithParent && (te.end = /\B|\b/), te.end && (fe.endRe = T(fe.end)), fe.terminatorEnd = l(fe.end) || "", te.endsWithParent && J.terminatorEnd && (fe.terminatorEnd += (te.end ? "|" : "") + J.terminatorEnd)), te.illegal && (fe.illegalRe = T(
        /** @type {RegExp | string} */
        te.illegal
      )), te.contains || (te.contains = []), te.contains = [].concat(...te.contains.map(function(Ce) {
        return ar(Ce === "self" ? te : Ce);
      })), te.contains.forEach(function(Ce) {
        ke(
          /** @type Mode */
          Ce,
          fe
        );
      }), te.starts && ke(te.starts, J), fe.matcher = be(fe), fe;
    }
    if (S.compilerExtensions || (S.compilerExtensions = []), S.contains && S.contains.includes("self"))
      throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
    return S.classNameAliases = r(S.classNameAliases || {}), ke(
      /** @type Mode */
      S
    );
  }
  function pn(S) {
    return S ? S.endsWithParent || pn(S.starts) : !1;
  }
  function ar(S) {
    return S.variants && !S.cachedVariants && (S.cachedVariants = S.variants.map(function(T) {
      return r(S, { variants: null }, T);
    })), S.cachedVariants ? S.cachedVariants : pn(S) ? r(S, { starts: S.starts ? r(S.starts) : null }) : Object.isFrozen(S) ? r(S) : S;
  }
  var Or = "11.9.0";
  class Un extends Error {
    constructor(T, q) {
      super(T), this.name = "HTMLInjectionError", this.html = q;
    }
  }
  const An = n, cr = r, Zn = Symbol("nomatch"), Rr = 7, lr = function(S) {
    const T = /* @__PURE__ */ Object.create(null), q = /* @__PURE__ */ Object.create(null), se = [];
    let be = !0;
    const ke = "Could not find the language '{}', did you forget to load/include a language module?", te = { disableAutodetect: !0, name: "Plain text", contains: [] };
    let J = {
      ignoreUnescapedHTML: !1,
      throwUnescapedHTML: !1,
      noHighlightRe: /^(no-?highlight)$/i,
      languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
      classPrefix: "hljs-",
      cssSelector: "pre code",
      languages: null,
      // beta configuration options, subject to change, welcome to discuss
      // https://github.com/highlightjs/highlight.js/issues/1086
      __emitter: d
    };
    function fe(K) {
      return J.noHighlightRe.test(K);
    }
    function We(K) {
      let ce = K.className + " ";
      ce += K.parentNode ? K.parentNode.className : "";
      const we = J.languageDetectRe.exec(ce);
      if (we) {
        const Re = $n(we[1]);
        return Re || (G(ke.replace("{}", we[1])), G("Falling back to no-highlight mode for this block.", K)), Re ? we[1] : "no-highlight";
      }
      return ce.split(/\s+/).find((Re) => fe(Re) || $n(Re));
    }
    function Ce(K, ce, we) {
      let Re = "", Ge = "";
      typeof ce == "object" ? (Re = K, we = ce.ignoreIllegals, Ge = ce.language) : (de("10.7.0", "highlight(lang, code, ...args) has been deprecated."), de("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), Ge = K, Re = ce), we === void 0 && (we = !0);
      const Zt = {
        code: Re,
        language: Ge
      };
      vo("before:highlight", Zt);
      const Mn = Zt.result ? Zt.result : Et(Zt.language, Zt.code, we);
      return Mn.code = Zt.code, vo("after:highlight", Mn), Mn;
    }
    function Et(K, ce, we, Re) {
      const Ge = /* @__PURE__ */ Object.create(null);
      function Zt(ee, ie) {
        return ee.keywords[ie];
      }
      function Mn() {
        if (!he.keywords) {
          tt.addText(De);
          return;
        }
        let ee = 0;
        he.keywordPatternRe.lastIndex = 0;
        let ie = he.keywordPatternRe.exec(De), me = "";
        for (; ie; ) {
          me += De.substring(ee, ie.index);
          const Le = sn.case_insensitive ? ie[0].toLowerCase() : ie[0], it = Zt(he, Le);
          if (it) {
            const [hn, Lv] = it;
            if (tt.addText(me), me = "", Ge[Le] = (Ge[Le] || 0) + 1, Ge[Le] <= Rr && (yo += Lv), hn.startsWith("_"))
              me += ie[0];
            else {
              const Ov = sn.classNameAliases[hn] || hn;
              on(ie[0], Ov);
            }
          } else
            me += ie[0];
          ee = he.keywordPatternRe.lastIndex, ie = he.keywordPatternRe.exec(De);
        }
        me += De.substring(ee), tt.addText(me);
      }
      function _o() {
        if (De === "") return;
        let ee = null;
        if (typeof he.subLanguage == "string") {
          if (!T[he.subLanguage]) {
            tt.addText(De);
            return;
          }
          ee = Et(he.subLanguage, De, !0, ru[he.subLanguage]), ru[he.subLanguage] = /** @type {CompiledMode} */
          ee._top;
        } else
          ee = Ls(De, he.subLanguage.length ? he.subLanguage : null);
        he.relevance > 0 && (yo += ee.relevance), tt.__addSublanguage(ee._emitter, ee.language);
      }
      function At() {
        he.subLanguage != null ? _o() : Mn(), De = "";
      }
      function on(ee, ie) {
        ee !== "" && (tt.startScope(ie), tt.addText(ee), tt.endScope());
      }
      function Ql(ee, ie) {
        let me = 1;
        const Le = ie.length - 1;
        for (; me <= Le; ) {
          if (!ee._emit[me]) {
            me++;
            continue;
          }
          const it = sn.classNameAliases[ee[me]] || ee[me], hn = ie[me];
          it ? on(hn, it) : (De = hn, Mn(), De = ""), me++;
        }
      }
      function eu(ee, ie) {
        return ee.scope && typeof ee.scope == "string" && tt.openNode(sn.classNameAliases[ee.scope] || ee.scope), ee.beginScope && (ee.beginScope._wrap ? (on(De, sn.classNameAliases[ee.beginScope._wrap] || ee.beginScope._wrap), De = "") : ee.beginScope._multi && (Ql(ee.beginScope, ie), De = "")), he = Object.create(ee, { parent: { value: he } }), he;
      }
      function tu(ee, ie, me) {
        let Le = k(ee.endRe, me);
        if (Le) {
          if (ee["on:end"]) {
            const it = new t(ee);
            ee["on:end"](ie, it), it.isMatchIgnored && (Le = !1);
          }
          if (Le) {
            for (; ee.endsParent && ee.parent; )
              ee = ee.parent;
            return ee;
          }
        }
        if (ee.endsWithParent)
          return tu(ee.parent, ie, me);
      }
      function Av(ee) {
        return he.matcher.regexIndex === 0 ? (De += ee[0], 1) : (Bs = !0, 0);
      }
      function $v(ee) {
        const ie = ee[0], me = ee.rule, Le = new t(me), it = [me.__beforeBegin, me["on:begin"]];
        for (const hn of it)
          if (hn && (hn(ee, Le), Le.isMatchIgnored))
            return Av(ie);
        return me.skip ? De += ie : (me.excludeBegin && (De += ie), At(), !me.returnBegin && !me.excludeBegin && (De = ie)), eu(me, ee), me.returnBegin ? 0 : ie.length;
      }
      function Mv(ee) {
        const ie = ee[0], me = ce.substring(ee.index), Le = tu(he, ee, me);
        if (!Le)
          return Zn;
        const it = he;
        he.endScope && he.endScope._wrap ? (At(), on(ie, he.endScope._wrap)) : he.endScope && he.endScope._multi ? (At(), Ql(he.endScope, ee)) : it.skip ? De += ie : (it.returnEnd || it.excludeEnd || (De += ie), At(), it.excludeEnd && (De = ie));
        do
          he.scope && tt.closeNode(), !he.skip && !he.subLanguage && (yo += he.relevance), he = he.parent;
        while (he !== Le.parent);
        return Le.starts && eu(Le.starts, ee), it.returnEnd ? 0 : ie.length;
      }
      function Iv() {
        const ee = [];
        for (let ie = he; ie !== sn; ie = ie.parent)
          ie.scope && ee.unshift(ie.scope);
        ee.forEach((ie) => tt.openNode(ie));
      }
      let bo = {};
      function nu(ee, ie) {
        const me = ie && ie[0];
        if (De += ee, me == null)
          return At(), 0;
        if (bo.type === "begin" && ie.type === "end" && bo.index === ie.index && me === "") {
          if (De += ce.slice(ie.index, ie.index + 1), !be) {
            const Le = new Error(`0 width match regex (${K})`);
            throw Le.languageName = K, Le.badRule = bo.rule, Le;
          }
          return 1;
        }
        if (bo = ie, ie.type === "begin")
          return $v(ie);
        if (ie.type === "illegal" && !we) {
          const Le = new Error('Illegal lexeme "' + me + '" for mode "' + (he.scope || "<unnamed>") + '"');
          throw Le.mode = he, Le;
        } else if (ie.type === "end") {
          const Le = Mv(ie);
          if (Le !== Zn)
            return Le;
        }
        if (ie.type === "illegal" && me === "")
          return 1;
        if (Ps > 1e5 && Ps > ie.index * 3)
          throw new Error("potential infinite loop, way more iterations than matches");
        return De += me, me.length;
      }
      const sn = $n(K);
      if (!sn)
        throw Xe(ke.replace("{}", K)), new Error('Unknown language: "' + K + '"');
      const Tv = Lr(sn);
      let Rs = "", he = Re || Tv;
      const ru = {}, tt = new J.__emitter(J);
      Iv();
      let De = "", yo = 0, Wn = 0, Ps = 0, Bs = !1;
      try {
        if (sn.__emitTokens)
          sn.__emitTokens(ce, tt);
        else {
          for (he.matcher.considerAll(); ; ) {
            Ps++, Bs ? Bs = !1 : he.matcher.considerAll(), he.matcher.lastIndex = Wn;
            const ee = he.matcher.exec(ce);
            if (!ee) break;
            const ie = ce.substring(Wn, ee.index), me = nu(ie, ee);
            Wn = ee.index + me;
          }
          nu(ce.substring(Wn));
        }
        return tt.finalize(), Rs = tt.toHTML(), {
          language: K,
          value: Rs,
          relevance: yo,
          illegal: !1,
          _emitter: tt,
          _top: he
        };
      } catch (ee) {
        if (ee.message && ee.message.includes("Illegal"))
          return {
            language: K,
            value: An(ce),
            illegal: !0,
            relevance: 0,
            _illegalBy: {
              message: ee.message,
              index: Wn,
              context: ce.slice(Wn - 100, Wn + 100),
              mode: ee.mode,
              resultSoFar: Rs
            },
            _emitter: tt
          };
        if (be)
          return {
            language: K,
            value: An(ce),
            illegal: !1,
            relevance: 0,
            errorRaised: ee,
            _emitter: tt,
            _top: he
          };
        throw ee;
      }
    }
    function Ts(K) {
      const ce = {
        value: An(K),
        illegal: !1,
        relevance: 0,
        _top: te,
        _emitter: new J.__emitter(J)
      };
      return ce._emitter.addText(K), ce;
    }
    function Ls(K, ce) {
      ce = ce || J.languages || Object.keys(T);
      const we = Ts(K), Re = ce.filter($n).filter(Jl).map(
        (At) => Et(At, K, !1)
      );
      Re.unshift(we);
      const Ge = Re.sort((At, on) => {
        if (At.relevance !== on.relevance) return on.relevance - At.relevance;
        if (At.language && on.language) {
          if ($n(At.language).supersetOf === on.language)
            return 1;
          if ($n(on.language).supersetOf === At.language)
            return -1;
        }
        return 0;
      }), [Zt, Mn] = Ge, _o = Zt;
      return _o.secondBest = Mn, _o;
    }
    function gv(K, ce, we) {
      const Re = ce && q[ce] || we;
      K.classList.add("hljs"), K.classList.add(`language-${Re}`);
    }
    function Os(K) {
      let ce = null;
      const we = We(K);
      if (fe(we)) return;
      if (vo(
        "before:highlightElement",
        { el: K, language: we }
      ), K.dataset.highlighted) {
        console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", K);
        return;
      }
      if (K.children.length > 0 && (J.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(K)), J.throwUnescapedHTML))
        throw new Un(
          "One of your code blocks includes unescaped HTML.",
          K.innerHTML
        );
      ce = K;
      const Re = ce.textContent, Ge = we ? Ce(Re, { language: we, ignoreIllegals: !0 }) : Ls(Re);
      K.innerHTML = Ge.value, K.dataset.highlighted = "yes", gv(K, we, Ge.language), K.result = {
        language: Ge.language,
        // TODO: remove with version 11.0
        re: Ge.relevance,
        relevance: Ge.relevance
      }, Ge.secondBest && (K.secondBest = {
        language: Ge.secondBest.language,
        relevance: Ge.secondBest.relevance
      }), vo("after:highlightElement", { el: K, result: Ge, text: Re });
    }
    function mv(K) {
      J = cr(J, K);
    }
    const vv = () => {
      mo(), de("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
    };
    function _v() {
      mo(), de("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
    }
    let Xl = !1;
    function mo() {
      if (document.readyState === "loading") {
        Xl = !0;
        return;
      }
      document.querySelectorAll(J.cssSelector).forEach(Os);
    }
    function bv() {
      Xl && mo();
    }
    typeof window < "u" && window.addEventListener && window.addEventListener("DOMContentLoaded", bv, !1);
    function yv(K, ce) {
      let we = null;
      try {
        we = ce(S);
      } catch (Re) {
        if (Xe("Language definition for '{}' could not be registered.".replace("{}", K)), be)
          Xe(Re);
        else
          throw Re;
        we = te;
      }
      we.name || (we.name = K), T[K] = we, we.rawDefinition = ce.bind(null, S), we.aliases && Yl(we.aliases, { languageName: K });
    }
    function wv(K) {
      delete T[K];
      for (const ce of Object.keys(q))
        q[ce] === K && delete q[ce];
    }
    function kv() {
      return Object.keys(T);
    }
    function $n(K) {
      return K = (K || "").toLowerCase(), T[K] || T[q[K]];
    }
    function Yl(K, { languageName: ce }) {
      typeof K == "string" && (K = [K]), K.forEach((we) => {
        q[we.toLowerCase()] = ce;
      });
    }
    function Jl(K) {
      const ce = $n(K);
      return ce && !ce.disableAutodetect;
    }
    function Cv(K) {
      K["before:highlightBlock"] && !K["before:highlightElement"] && (K["before:highlightElement"] = (ce) => {
        K["before:highlightBlock"](
          Object.assign({ block: ce.el }, ce)
        );
      }), K["after:highlightBlock"] && !K["after:highlightElement"] && (K["after:highlightElement"] = (ce) => {
        K["after:highlightBlock"](
          Object.assign({ block: ce.el }, ce)
        );
      });
    }
    function xv(K) {
      Cv(K), se.push(K);
    }
    function Sv(K) {
      const ce = se.indexOf(K);
      ce !== -1 && se.splice(ce, 1);
    }
    function vo(K, ce) {
      const we = K;
      se.forEach(function(Re) {
        Re[we] && Re[we](ce);
      });
    }
    function Ev(K) {
      return de("10.7.0", "highlightBlock will be removed entirely in v12.0"), de("10.7.0", "Please use highlightElement now."), Os(K);
    }
    Object.assign(S, {
      highlight: Ce,
      highlightAuto: Ls,
      highlightAll: mo,
      highlightElement: Os,
      // TODO: Remove with v12 API
      highlightBlock: Ev,
      configure: mv,
      initHighlighting: vv,
      initHighlightingOnLoad: _v,
      registerLanguage: yv,
      unregisterLanguage: wv,
      listLanguages: kv,
      getLanguage: $n,
      registerAliases: Yl,
      autoDetection: Jl,
      inherit: cr,
      addPlugin: xv,
      removePlugin: Sv
    }), S.debugMode = function() {
      be = !1;
    }, S.safeMode = function() {
      be = !0;
    }, S.versionString = Or, S.regex = {
      concat: g,
      lookahead: m,
      either: h,
      optional: v,
      anyNumberOfTimes: f
    };
    for (const K in oe)
      typeof oe[K] == "object" && e(oe[K]);
    return Object.assign(S, oe), S;
  }, L = lr({});
  return L.newInstance = () => lr({}), Ds = L, L.HighlightJS = L, L.default = L, Ds;
}
var s_ = /* @__PURE__ */ o_();
const mn = /* @__PURE__ */ Ar(s_), au = "[A-Za-z$_][0-9A-Za-z$_]*", i_ = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends"
], a_ = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], Up = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
], Zp = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], Wp = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
], c_ = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
], l_ = [].concat(
  Wp,
  Up,
  Zp
);
function Gp(e) {
  const t = e.regex, n = (F, { after: Z }) => {
    const W = "</" + F[0].slice(1);
    return F.input.indexOf(W, Z) !== -1;
  }, r = au, s = {
    begin: "<>",
    end: "</>"
  }, o = /<[A-Za-z0-9\\._:-]+\s*\/>/, i = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (F, Z) => {
      const W = F[0].length + F.index, pe = F.input[W];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        pe === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        pe === ","
      ) {
        Z.ignoreMatch();
        return;
      }
      pe === ">" && (n(F, { after: W }) || Z.ignoreMatch());
      let le;
      const Ee = F.input.substring(W);
      if (le = Ee.match(/^\s*=/)) {
        Z.ignoreMatch();
        return;
      }
      if ((le = Ee.match(/^\s+extends\s+/)) && le.index === 0) {
        Z.ignoreMatch();
        return;
      }
    }
  }, a = {
    $pattern: au,
    keyword: i_,
    literal: a_,
    built_in: l_,
    "variable.language": c_
  }, c = "[0-9](_?[0-9])*", u = `\\.(${c})`, d = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", l = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${d})((${u})|\\.)?|(${u}))[eE][+-]?(${c})\\b` },
      { begin: `\\b(${d})\\b((${u})\\b|\\.)?|(${u})\\b` },
      // DecimalBigIntegerLiteral
      { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  }, m = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: a,
    contains: []
    // defined later
  }, f = {
    begin: "html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        m
      ],
      subLanguage: "xml"
    }
  }, v = {
    begin: "css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        m
      ],
      subLanguage: "css"
    }
  }, g = {
    begin: "gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        m
      ],
      subLanguage: "graphql"
    }
  }, y = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      e.BACKSLASH_ESCAPE,
      m
    ]
  }, w = {
    className: "comment",
    variants: [
      e.COMMENT(
        /\/\*\*(?!\/)/,
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              begin: "(?=@[A-Za-z]+)",
              relevance: 0,
              contains: [
                {
                  className: "doctag",
                  begin: "@[A-Za-z]+"
                },
                {
                  className: "type",
                  begin: "\\{",
                  end: "\\}",
                  excludeEnd: !0,
                  excludeBegin: !0,
                  relevance: 0
                },
                {
                  className: "variable",
                  begin: r + "(?=\\s*(-)|$)",
                  endsParent: !0,
                  relevance: 0
                },
                // eat spaces (not newlines) so we can find
                // types or variables
                {
                  begin: /(?=[^\n])\s/,
                  relevance: 0
                }
              ]
            }
          ]
        }
      ),
      e.C_BLOCK_COMMENT_MODE,
      e.C_LINE_COMMENT_MODE
    ]
  }, k = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE,
    f,
    v,
    g,
    y,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    l
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  m.contains = k.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: a,
    contains: [
      "self"
    ].concat(k)
  });
  const C = [].concat(w, m.contains), A = C.concat([
    // eat recursive parens in sub expressions
    {
      begin: /\(/,
      end: /\)/,
      keywords: a,
      contains: ["self"].concat(C)
    }
  ]), E = {
    className: "params",
    begin: /\(/,
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: a,
    contains: A
  }, $ = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          r,
          /\s+/,
          /extends/,
          /\s+/,
          t.concat(r, "(", t.concat(/\./, r), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          r
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  }, M = {
    relevance: 0,
    match: t.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...Up,
        ...Zp
      ]
    }
  }, O = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, R = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          r,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [E],
    illegal: /%/
  }, B = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function V(F) {
    return t.concat("(?!", F.join("|"), ")");
  }
  const re = {
    match: t.concat(
      /\b/,
      V([
        ...Wp,
        "super",
        "import"
      ]),
      r,
      t.lookahead(/\(/)
    ),
    className: "title.function",
    relevance: 0
  }, P = {
    begin: t.concat(/\./, t.lookahead(
      t.concat(r, /(?![0-9A-Za-z$_(])/)
    )),
    end: r,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, U = {
    match: [
      /get|set/,
      /\s+/,
      r,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      E
    ]
  }, z = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", N = {
    match: [
      /const|var|let/,
      /\s+/,
      r,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      t.lookahead(z)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      E
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: a,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: A, CLASS_REFERENCE: M },
    illegal: /#(?![$_A-z])/,
    contains: [
      e.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      O,
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE,
      f,
      v,
      g,
      y,
      w,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      l,
      M,
      {
        className: "attr",
        begin: r + t.lookahead(":"),
        relevance: 0
      },
      N,
      {
        // "value" container
        begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          w,
          e.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: z,
            returnBegin: !0,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: e.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: !0
                  },
                  {
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: a,
                    contains: A
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: s.begin, end: s.end },
              { match: o },
              {
                begin: i.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": i.isTrulyOpeningTag,
                end: i.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: i.begin,
                end: i.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      R,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: !0,
        label: "func.def",
        contains: [
          E,
          e.inherit(e.TITLE_MODE, { begin: r, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      P,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + r,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [E]
      },
      re,
      B,
      $,
      U,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function Kp(e) {
  const t = e.regex, n = t.concat(/[\p{L}_]/u, t.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u), r = /[\p{L}0-9._:-]+/u, s = {
    className: "symbol",
    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
  }, o = {
    begin: /\s/,
    contains: [
      {
        className: "keyword",
        begin: /#?[a-z_][a-z1-9_-]+/,
        illegal: /\n/
      }
    ]
  }, i = e.inherit(o, {
    begin: /\(/,
    end: /\)/
  }), a = e.inherit(e.APOS_STRING_MODE, { className: "string" }), c = e.inherit(e.QUOTE_STRING_MODE, { className: "string" }), u = {
    endsWithParent: !0,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        className: "attr",
        begin: r,
        relevance: 0
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            className: "string",
            endsParent: !0,
            variants: [
              {
                begin: /"/,
                end: /"/,
                contains: [s]
              },
              {
                begin: /'/,
                end: /'/,
                contains: [s]
              },
              { begin: /[^\s"'=<>`]+/ }
            ]
          }
        ]
      }
    ]
  };
  return {
    name: "HTML, XML",
    aliases: [
      "html",
      "xhtml",
      "rss",
      "atom",
      "xjb",
      "xsd",
      "xsl",
      "plist",
      "wsf",
      "svg"
    ],
    case_insensitive: !0,
    unicodeRegex: !0,
    contains: [
      {
        className: "meta",
        begin: /<![a-z]/,
        end: />/,
        relevance: 10,
        contains: [
          o,
          c,
          a,
          i,
          {
            begin: /\[/,
            end: /\]/,
            contains: [
              {
                className: "meta",
                begin: /<![a-z]/,
                end: />/,
                contains: [
                  o,
                  i,
                  c,
                  a
                ]
              }
            ]
          }
        ]
      },
      e.COMMENT(
        /<!--/,
        /-->/,
        { relevance: 10 }
      ),
      {
        begin: /<!\[CDATA\[/,
        end: /\]\]>/,
        relevance: 10
      },
      s,
      // xml processing instructions
      {
        className: "meta",
        end: /\?>/,
        variants: [
          {
            begin: /<\?xml/,
            relevance: 10,
            contains: [
              c
            ]
          },
          {
            begin: /<\?[a-z][a-z0-9]+/
          }
        ]
      },
      {
        className: "tag",
        /*
        The lookahead pattern (?=...) ensures that 'begin' only matches
        '<style' as a single word, followed by a whitespace or an
        ending bracket.
        */
        begin: /<style(?=\s|>)/,
        end: />/,
        keywords: { name: "style" },
        contains: [u],
        starts: {
          end: /<\/style>/,
          returnEnd: !0,
          subLanguage: [
            "css",
            "xml"
          ]
        }
      },
      {
        className: "tag",
        // See the comment in the <style tag about the lookahead pattern
        begin: /<script(?=\s|>)/,
        end: />/,
        keywords: { name: "script" },
        contains: [u],
        starts: {
          end: /<\/script>/,
          returnEnd: !0,
          subLanguage: [
            "javascript",
            "handlebars",
            "xml"
          ]
        }
      },
      // we need this for now for jSX
      {
        className: "tag",
        begin: /<>|<\/>/
      },
      // open tag
      {
        className: "tag",
        begin: t.concat(
          /</,
          t.lookahead(t.concat(
            n,
            // <tag/>
            // <tag>
            // <tag ...
            t.either(/\/>/, />/, /\s/)
          ))
        ),
        end: /\/?>/,
        contains: [
          {
            className: "name",
            begin: n,
            relevance: 0,
            starts: u
          }
        ]
      },
      // close tag
      {
        className: "tag",
        begin: t.concat(
          /<\//,
          t.lookahead(t.concat(
            n,
            />/
          ))
        ),
        contains: [
          {
            className: "name",
            begin: n,
            relevance: 0
          },
          {
            begin: />/,
            relevance: 0,
            endsParent: !0
          }
        ]
      }
    ]
  };
}
const u_ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function d_(e, t) {
  return b(), x("svg", u_, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
    }, null, -1)
  ]));
}
const f_ = { name: "mdi-close", render: d_ }, qt = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, s] of t)
    n[r] = s;
  return n;
}, p_ = {}, h_ = { class: "chat-button" };
function g_(e, t) {
  return b(), x("button", h_, [
    ne(e.$slots, "default")
  ]);
}
const m_ = /* @__PURE__ */ qt(p_, [["render", g_]]);
function tl() {
  return $e(Fp);
}
function uo() {
  return {
    options: $e(jp)
  };
}
function ls() {
  const { options: e } = uo(), t = (e == null ? void 0 : e.defaultLanguage) ?? "en";
  function n(s) {
    var i, a;
    const o = (a = (i = e == null ? void 0 : e.i18n) == null ? void 0 : i[t]) == null ? void 0 : a[s];
    return Tp(o) ? o.value : o ?? s;
  }
  function r(s) {
    var o, i;
    return !!((i = (o = e == null ? void 0 : e.i18n) == null ? void 0 : o[t]) != null && i[s]);
  }
  return { t: n, te: r };
}
const v_ = { class: "chat-get-started" }, __ = /* @__PURE__ */ H({
  __name: "GetStarted",
  setup(e) {
    const { t } = ls();
    return (n, r) => (b(), x("div", v_, [
      ue(m_, {
        onClick: r[0] || (r[0] = (s) => n.$emit("click:button"))
      }, {
        default: Y(() => [
          _r(ve(_(t)("getStarted")), 1)
        ]),
        _: 1
      })
    ]));
  }
}), b_ = {}, y_ = { class: "chat-powered-by" };
function w_(e, t) {
  return b(), x("div", y_, t[0] || (t[0] = [
    _r(" Powered by "),
    p("a", { href: "https://n8n.io?utm_source=n8n-external&utm_medium=widget-powered-by" }, "n8n", -1)
  ]));
}
const k_ = /* @__PURE__ */ qt(b_, [["render", w_]]), C_ = { class: "chat-get-started-footer" }, x_ = { key: 0 }, S_ = /* @__PURE__ */ H({
  __name: "GetStartedFooter",
  setup(e) {
    const { t, te: n } = ls();
    return (r, s) => (b(), x("div", C_, [
      _(n)("footer") ? (b(), x("div", x_, ve(_(t)("footer")), 1)) : Q("", !0),
      ue(k_)
    ]));
  }
});
function E_(e) {
  return Lp() ? (Op(e), !0) : !1;
}
function A_() {
  const e = /* @__PURE__ */ new Set(), t = (s) => {
    e.delete(s);
  };
  return {
    on: (s) => {
      e.add(s);
      const o = () => t(s);
      return E_(o), {
        off: o
      };
    },
    off: t,
    trigger: (...s) => Promise.all(Array.from(e).map((o) => o(...s)))
  };
}
const $_ = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const M_ = (e, t) => Object.prototype.hasOwnProperty.call(e, t), I_ = $_ ? window.document : void 0, T_ = {
  multiple: !0,
  accept: "*",
  reset: !1,
  directory: !1
};
function L_(e = {}) {
  const {
    document: t = I_
  } = e, n = D(null), { on: r, trigger: s } = A_();
  let o;
  t && (o = t.createElement("input"), o.type = "file", o.onchange = (c) => {
    const u = c.target;
    n.value = u.files, s(n.value);
  });
  const i = () => {
    n.value = null, o && o.value && (o.value = "", s(null));
  }, a = (c) => {
    if (!o)
      return;
    const u = {
      ...T_,
      ...e,
      ...c
    };
    o.multiple = u.multiple, o.accept = u.accept, o.webkitdirectory = u.directory, M_(u, "capture") && (o.capture = u.capture), u.reset && i(), o.click();
  };
  return {
    files: Rp(n),
    open: a,
    reset: i,
    onChange: r
  };
}
const O_ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function R_(e, t) {
  return b(), x("svg", O_, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "M16.5 6v11.5a4 4 0 0 1-4 4a4 4 0 0 1-4-4V5A2.5 2.5 0 0 1 11 2.5A2.5 2.5 0 0 1 13.5 5v10.5a1 1 0 0 1-1 1a1 1 0 0 1-1-1V6H10v9.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5V5a4 4 0 0 0-4-4a4 4 0 0 0-4 4v12.5a5.5 5.5 0 0 0 5.5 5.5a5.5 5.5 0 0 0 5.5-5.5V6z"
    }, null, -1)
  ]));
}
const P_ = { name: "mdi-paperclip", render: R_ }, B_ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function z_(e, t) {
  return b(), x("svg", B_, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "m2 21l21-9L2 3v7l15 2l-15 2z"
    }, null, -1)
  ]));
}
const D_ = { name: "mdi-send", render: z_ }, N_ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function q_(e, t) {
  return b(), x("svg", N_, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12z"
    }, null, -1)
  ]));
}
const F_ = { name: "mdi-closeThick", render: q_ }, j_ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function H_(e, t) {
  return b(), x("svg", j_, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m0 18h12v-8l-4 4l-2-2zM8 9a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"
    }, null, -1)
  ]));
}
const V_ = { name: "mdi-fileImage", render: H_ }, U_ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function Z_(e, t) {
  return b(), x("svg", U_, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm-1 11h-2v5a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2c.4 0 .7.1 1 .3V11h3zm0-4V3.5L18.5 9z"
    }, null, -1)
  ]));
}
const W_ = { name: "mdi-fileMusic", render: Z_ }, G_ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function K_(e, t) {
  return b(), x("svg", G_, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m9 16v-2H6v2zm3-4v-2H6v2z"
    }, null, -1)
  ]));
}
const cu = { name: "mdi-fileText", render: K_ }, X_ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function Y_(e, t) {
  return b(), x("svg", X_, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m11 17v-6l-3 2.2V13H7v6h7v-2.2z"
    }, null, -1)
  ]));
}
const J_ = { name: "mdi-fileVideo", render: Y_ }, Q_ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function eb(e, t) {
  return b(), x("svg", Q_, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "M14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2z"
    }, null, -1)
  ]));
}
const tb = { name: "mdi-openInNew", render: eb }, nb = { class: "chat-file-name" }, rb = /* @__PURE__ */ H({
  __name: "ChatFile",
  props: {
    file: {},
    isRemovable: { type: Boolean },
    isPreviewable: { type: Boolean }
  },
  emits: ["remove"],
  setup(e, { emit: t }) {
    const n = e, r = t, s = {
      document: cu,
      audio: W_,
      image: V_,
      video: J_
    }, o = I(() => {
      var u;
      const c = (u = n.file) == null ? void 0 : u.type.split("/")[0];
      return s[c] || cu;
    });
    function i() {
      n.isPreviewable && window.open(URL.createObjectURL(n.file));
    }
    function a() {
      r("remove", n.file);
    }
    return (c, u) => (b(), x("div", {
      class: "chat-file",
      onClick: i
    }, [
      ue(_(o)),
      p("p", nb, ve(c.file.name), 1),
      c.isRemovable ? (b(), x("span", {
        key: 0,
        class: "chat-file-delete",
        onClick: Ke(a, ["stop"])
      }, [
        ue(_(F_))
      ])) : c.isPreviewable ? (b(), X(_(tb), {
        key: 1,
        class: "chat-file-preview"
      })) : Q("", !0)
    ]));
  }
}), Xp = /* @__PURE__ */ qt(rb, [["__scopeId", "data-v-e0d57af7"]]), ob = { class: "chat-inputs" }, sb = {
  key: 0,
  class: "chat-input-left-panel"
}, ib = ["disabled", "placeholder"], ab = { class: "chat-inputs-controls" }, cb = ["disabled"], lb = ["disabled"], ub = {
  key: 0,
  class: "chat-files"
}, db = /* @__PURE__ */ H({
  __name: "Input",
  props: {
    placeholder: { default: "inputPlaceholder" }
  },
  emits: ["arrowKeyDown"],
  setup(e, { emit: t }) {
    const n = e, { t: r } = ls(), s = t, { options: o } = uo(), i = tl(), { waitingForResponse: a } = i, c = D(null), u = D(null), d = D(""), l = D(!1), m = D(null), f = I(() => {
      var U;
      return d.value === "" || _(a) || ((U = o.disabled) == null ? void 0 : U.value) === !0;
    }), v = I(() => {
      var U;
      return ((U = o.disabled) == null ? void 0 : U.value) === !0;
    }), g = I(
      () => {
        var U;
        return y.value && _(a) && !((U = o.disabled) != null && U.value);
      }
    ), y = I(() => _(o.allowFileUploads) === !0), h = I(() => _(o.allowedFilesMimeTypes)), w = I(() => ({
      "--controls-count": y.value ? 2 : 1
    })), {
      open: k,
      reset: C,
      onChange: A
    } = L_({
      multiple: !0,
      reset: !1
    });
    A((U) => {
      if (!U) return;
      const z = new DataTransfer();
      if (c.value)
        for (let N = 0; N < c.value.length; N++)
          z.items.add(c.value[N]);
      for (let N = 0; N < U.length; N++)
        z.items.add(U[N]);
      c.value = z.files;
    }), Be(() => {
      vt.on("focusInput", $), vt.on("blurInput", E), vt.on("setInputValue", M), u.value && (m.value = new ResizeObserver((U) => {
        for (const z of U)
          z.target === u.value && P();
      }), m.value.observe(u.value));
    }), Pp(() => {
      vt.off("focusInput", $), vt.off("blurInput", E), vt.off("setInputValue", M), m.value && (m.value.disconnect(), m.value = null);
    });
    function E() {
      u.value && u.value.blur();
    }
    function $() {
      u.value && u.value.focus();
    }
    function M(U) {
      d.value = U, $();
    }
    async function O(U) {
      if (U.preventDefault(), f.value)
        return;
      const z = d.value;
      d.value = "", l.value = !0, await i.sendMessage(z, Array.from(c.value ?? [])), l.value = !1, C(), c.value = null;
    }
    async function R(U) {
      U.shiftKey || (await O(U), P());
    }
    function B(U) {
      if (!c.value) return;
      const z = new DataTransfer();
      for (let N = 0; N < c.value.length; N++) {
        const F = c.value[N];
        U.name !== F.name && z.items.add(F);
      }
      C(), c.value = z.files;
    }
    function V(U) {
      (U.key === "ArrowUp" || U.key === "ArrowDown") && (U.preventDefault(), s("arrowKeyDown", {
        key: U.key,
        currentInputValue: d.value
      }));
    }
    function re() {
      g.value || k({ accept: _(h) });
    }
    function P() {
      const U = u.value;
      if (!U) return;
      U.style.height = "var(--chat--textarea--height)";
      const z = Math.min(U.scrollHeight, 480);
      U.style.height = `${z}px`;
    }
    return (U, z) => {
      var N;
      return b(), x("div", {
        class: "chat-input",
        style: qe(w.value),
        onKeydown: Ke(V, ["stop"])
      }, [
        p("div", ob, [
          U.$slots.leftPanel ? (b(), x("div", sb, [
            ne(U.$slots, "leftPanel", {}, void 0, !0)
          ])) : Q("", !0),
          Ye(p("textarea", {
            ref_key: "chatTextArea",
            ref: u,
            "onUpdate:modelValue": z[0] || (z[0] = (F) => d.value = F),
            "data-test-id": "chat-input",
            disabled: v.value,
            placeholder: _(r)(n.placeholder),
            onKeydown: at(R, ["enter"]),
            onInput: P,
            onMousedown: P,
            onFocus: P
          }, null, 40, ib), [
            [Bp, d.value]
          ]),
          p("div", ab, [
            y.value ? (b(), x("button", {
              key: 0,
              disabled: g.value,
              class: "chat-input-file-button",
              "data-test-id": "chat-attach-file-button",
              onClick: re
            }, [
              ue(_(P_), {
                height: "24",
                width: "24"
              })
            ], 8, cb)) : Q("", !0),
            p("button", {
              disabled: f.value,
              class: "chat-input-send-button",
              onClick: O
            }, [
              ue(_(D_), {
                height: "24",
                width: "24"
              })
            ], 8, lb)
          ])
        ]),
        (N = c.value) != null && N.length && !l.value ? (b(), x("div", ub, [
          (b(!0), x(Pe, null, Je(c.value, (F) => (b(), X(Xp, {
            key: F.name,
            file: F,
            "is-removable": !0,
            "is-previewable": !0,
            onRemove: B
          }, null, 8, ["file"]))), 128))
        ])) : Q("", !0)
      ], 36);
    };
  }
}), fb = /* @__PURE__ */ qt(db, [["__scopeId", "data-v-31e29ba2"]]), pb = { class: "chat-layout" }, hb = {
  key: 0,
  class: "chat-header"
}, gb = {
  key: 2,
  class: "chat-footer"
}, mb = /* @__PURE__ */ H({
  __name: "Layout",
  setup(e) {
    const t = D(null);
    function n() {
      const r = t.value;
      r && (r.scrollTop = r.scrollHeight);
    }
    return Be(() => {
      vt.on("scrollToBottom", n), window.addEventListener("resize", n);
    }), Nt(() => {
      vt.off("scrollToBottom", n), window.removeEventListener("resize", n);
    }), (r, s) => (b(), x("main", pb, [
      r.$slots.header ? (b(), x("div", hb, [
        ne(r.$slots, "header")
      ])) : Q("", !0),
      r.$slots.default ? (b(), x("div", {
        key: 1,
        ref_key: "chatBodyRef",
        ref: t,
        class: "chat-body"
      }, [
        ne(r.$slots, "default")
      ], 512)) : Q("", !0),
      r.$slots.footer ? (b(), x("div", gb, [
        ne(r.$slots, "footer")
      ])) : Q("", !0)
    ]));
  }
}), vb = /(%|)\{([0-9a-zA-Z_]+)\}/g;
function _b() {
  const e = (n, r) => r in n;
  function t(n, ...r) {
    if (typeof n == "function")
      return n(r);
    const s = n;
    let o = r;
    return r.length === 1 && typeof r[0] == "object" && (o = r[0]), o != null && o.hasOwnProperty || (o = {}), s.replace(vb, (i, a, c, u) => {
      let d;
      return s[u - 1] === "{" && s[u + i.length] === "}" ? `${c}` : (d = e(o, c) ? `${o[c]}` : null, d ?? "");
    });
  }
  return t;
}
const bb = {
  "generic.retry": "Retry",
  "nds.auth.roles.owner": "Owner",
  "nds.userInfo.you": "(you)",
  "nds.userSelect.selectUser": "Select User",
  "nds.userSelect.noMatchingUsers": "No matching users",
  "notice.showMore": "Show more",
  "notice.showLess": "Show less",
  "formInput.validator.fieldRequired": "This field is required",
  "formInput.validator.minCharactersRequired": "Must be at least {minimum} characters",
  "formInput.validator.maxCharactersRequired": "Must be at most {maximum} characters",
  "formInput.validator.oneNumbersRequired": (e) => `Must have at least ${e.minimum} number${e.minimum > 1 ? "s" : ""}`,
  "formInput.validator.validEmailRequired": "Must be a valid email",
  "formInput.validator.uppercaseCharsRequired": (e) => `Must have at least ${e.minimum} uppercase character${e.minimum > 1 ? "s" : ""}`,
  "formInput.validator.defaultPasswordRequirements": "8+ characters, at least 1 number and 1 capital letter",
  "sticky.markdownHint": 'You can style with <a href="https://docs.n8n.io/workflows/sticky-notes/" target="_blank">Markdown</a>',
  "tags.showMore": (e) => `+${e} more`,
  "datatable.pageSize": "Page size",
  "codeDiff.couldNotReplace": "Could not replace code",
  "codeDiff.codeReplaced": "Code replaced",
  "codeDiff.replaceMyCode": "Replace my code",
  "codeDiff.replacing": "Replacing...",
  "codeDiff.undo": "Undo",
  "betaTag.beta": "beta",
  "askAssistantButton.askAssistant": "Ask Assistant",
  "assistantChat.builder.name": "AI Builder",
  "assistantChat.builder.generatingFinalWorkflow": "Generating final workflow...",
  "assistantChat.builder.configuredNodes": "Configured nodes",
  "assistantChat.builder.thumbsUp": "Helpful",
  "assistantChat.builder.thumbsDown": "Not helpful",
  "assistantChat.builder.feedbackPlaceholder": "Tell us about your experience",
  "assistantChat.builder.success": "Thank you for your feedback!",
  "assistantChat.builder.submit": "Submit feedback",
  "assistantChat.builder.workflowGenerated1": "Your workflow was created successfully!",
  "assistantChat.builder.workflowGenerated2": "Fix any missing credentials before testing it.",
  "assistantChat.builder.configuringNodes": "Configuring nodes...",
  "assistantChat.builder.selectedNodes": "Selected workflow nodes",
  "assistantChat.builder.selectingNodes": "Selecting nodes...",
  "assistantChat.builder.generatedNodes": "Generated workflow nodes",
  "assistantChat.errorParsingMarkdown": "Error parsing markdown content",
  "assistantChat.aiAssistantLabel": "AI Assistant",
  "assistantChat.aiAssistantName": "Assistant",
  "assistantChat.sessionEndMessage.1": "This Assistant session has ended. To start a new session with the Assistant, click an",
  "assistantChat.sessionEndMessage.2": "button in n8n",
  "assistantChat.you": "You",
  "assistantChat.quickRepliesTitle": "Quick reply 👇",
  "assistantChat.placeholder.1": () => "I can answer most questions about building workflows in n8n.",
  "assistantChat.placeholder.2": "For specific tasks, you’ll see the",
  "assistantChat.placeholder.3": "button in the UI.",
  "assistantChat.placeholder.4": "How can I help?",
  "assistantChat.inputPlaceholder": "Enter your response...",
  "assistantChat.copy": "Copy",
  "assistantChat.copied": "Copied",
  "inlineAskAssistantButton.asked": "Asked",
  "iconPicker.button.defaultToolTip": "Choose icon",
  "iconPicker.tabs.icons": "Icons",
  "iconPicker.tabs.emojis": "Emojis",
  "selectableList.addDefault": "+ Add a",
  "auth.changePassword.passwordsMustMatchError": "Passwords must match"
}, yb = _b();
let lu = bb;
const wb = function(e, t) {
  return lu[e] !== void 0 ? yb(lu[e], ...t ? [t] : []) : "";
}, vn = (e, t, { checkForDefaultPrevented: n = !0 } = {}) => (s) => {
  const o = e == null ? void 0 : e(s);
  if (n === !1 || !o)
    return t == null ? void 0 : t(s);
};
var uu;
const ut = typeof window < "u", kb = (e) => typeof e == "string", Yp = () => {
}, Jp = ut && ((uu = window == null ? void 0 : window.navigator) == null ? void 0 : uu.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function Qp(e) {
  return typeof e == "function" ? e() : _(e);
}
function Cb(e) {
  return e;
}
function nl(e) {
  return Lp() ? (Op(e), !0) : !1;
}
function xb(e, t = !0) {
  ot() ? Be(e) : t ? e() : Ae(e);
}
function Bn(e) {
  var t;
  const n = Qp(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const rl = ut ? window : void 0;
function Qn(...e) {
  let t, n, r, s;
  if (kb(e[0]) || Array.isArray(e[0]) ? ([n, r, s] = e, t = rl) : [t, n, r, s] = e, !t)
    return Yp;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const o = [], i = () => {
    o.forEach((d) => d()), o.length = 0;
  }, a = (d, l, m, f) => (d.addEventListener(l, m, f), () => d.removeEventListener(l, m, f)), c = ae(() => [Bn(t), Qp(s)], ([d, l]) => {
    i(), d && o.push(...n.flatMap((m) => r.map((f) => a(d, m, f, l))));
  }, { immediate: !0, flush: "post" }), u = () => {
    c(), i();
  };
  return nl(u), u;
}
let du = !1;
function Sb(e, t, n = {}) {
  const { window: r = rl, ignore: s = [], capture: o = !0, detectIframe: i = !1 } = n;
  if (!r)
    return;
  Jp && !du && (du = !0, Array.from(r.document.body.children).forEach((m) => m.addEventListener("click", Yp)));
  let a = !0;
  const c = (m) => s.some((f) => {
    if (typeof f == "string")
      return Array.from(r.document.querySelectorAll(f)).some((v) => v === m.target || m.composedPath().includes(v));
    {
      const v = Bn(f);
      return v && (m.target === v || m.composedPath().includes(v));
    }
  }), d = [
    Qn(r, "click", (m) => {
      const f = Bn(e);
      if (!(!f || f === m.target || m.composedPath().includes(f))) {
        if (m.detail === 0 && (a = !c(m)), !a) {
          a = !0;
          return;
        }
        t(m);
      }
    }, { passive: !0, capture: o }),
    Qn(r, "pointerdown", (m) => {
      const f = Bn(e);
      f && (a = !m.composedPath().includes(f) && !c(m));
    }, { passive: !0 }),
    i && Qn(r, "blur", (m) => {
      var f;
      const v = Bn(e);
      ((f = r.document.activeElement) == null ? void 0 : f.tagName) === "IFRAME" && !(v != null && v.contains(r.document.activeElement)) && t(m);
    })
  ].filter(Boolean);
  return () => d.forEach((m) => m());
}
function Eb(e, t = !1) {
  const n = D(), r = () => n.value = !!e();
  return r(), xb(r, t), n;
}
const fu = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, pu = "__vueuse_ssr_handlers__";
fu[pu] = fu[pu] || {};
var hu = Object.getOwnPropertySymbols, Ab = Object.prototype.hasOwnProperty, $b = Object.prototype.propertyIsEnumerable, Mb = (e, t) => {
  var n = {};
  for (var r in e)
    Ab.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && hu)
    for (var r of hu(e))
      t.indexOf(r) < 0 && $b.call(e, r) && (n[r] = e[r]);
  return n;
};
function us(e, t, n = {}) {
  const r = n, { window: s = rl } = r, o = Mb(r, ["window"]);
  let i;
  const a = Eb(() => s && "ResizeObserver" in s), c = () => {
    i && (i.disconnect(), i = void 0);
  }, u = ae(() => Bn(e), (l) => {
    c(), a.value && s && l && (i = new ResizeObserver(t), i.observe(l, o));
  }, { immediate: !0, flush: "post" }), d = () => {
    c(), u();
  };
  return nl(d), {
    isSupported: a,
    stop: d
  };
}
var gu;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(gu || (gu = {}));
var Ib = Object.defineProperty, mu = Object.getOwnPropertySymbols, Tb = Object.prototype.hasOwnProperty, Lb = Object.prototype.propertyIsEnumerable, vu = (e, t, n) => t in e ? Ib(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Ob = (e, t) => {
  for (var n in t || (t = {}))
    Tb.call(t, n) && vu(e, n, t[n]);
  if (mu)
    for (var n of mu(t))
      Lb.call(t, n) && vu(e, n, t[n]);
  return e;
};
const Rb = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
Ob({
  linear: Cb
}, Rb);
const Pb = () => ut && /firefox/i.test(window.navigator.userAgent), ol = (e) => {
  let t, n;
  return e.type === "touchend" ? (n = e.changedTouches[0].clientY, t = e.changedTouches[0].clientX) : e.type.startsWith("touch") ? (n = e.touches[0].clientY, t = e.touches[0].clientX) : (n = e.clientY, t = e.clientX), {
    clientX: t,
    clientY: n
  };
};
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const Jr = () => {
}, Bb = Object.prototype.hasOwnProperty, Wo = (e, t) => Bb.call(e, t), zb = Array.isArray, Ot = (e) => typeof e == "function", Xt = (e) => typeof e == "string", Yt = (e) => e !== null && typeof e == "object", Db = Object.prototype.toString, Nb = (e) => Db.call(e), Ns = (e) => Nb(e).slice(8, -1);
var eh = typeof global == "object" && global && global.Object === Object && global, qb = typeof self == "object" && self && self.Object === Object && self, fn = eh || qb || Function("return this")(), Nn = fn.Symbol, th = Object.prototype, Fb = th.hasOwnProperty, jb = th.toString, Dr = Nn ? Nn.toStringTag : void 0;
function Hb(e) {
  var t = Fb.call(e, Dr), n = e[Dr];
  try {
    e[Dr] = void 0;
    var r = !0;
  } catch {
  }
  var s = jb.call(e);
  return r && (t ? e[Dr] = n : delete e[Dr]), s;
}
var Vb = Object.prototype, Ub = Vb.toString;
function Zb(e) {
  return Ub.call(e);
}
var Wb = "[object Null]", Gb = "[object Undefined]", _u = Nn ? Nn.toStringTag : void 0;
function $r(e) {
  return e == null ? e === void 0 ? Gb : Wb : _u && _u in Object(e) ? Hb(e) : Zb(e);
}
function br(e) {
  return e != null && typeof e == "object";
}
var Kb = "[object Symbol]";
function ds(e) {
  return typeof e == "symbol" || br(e) && $r(e) == Kb;
}
function Xb(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, s = Array(r); ++n < r; )
    s[n] = t(e[n], n, e);
  return s;
}
var wn = Array.isArray, bu = Nn ? Nn.prototype : void 0, yu = bu ? bu.toString : void 0;
function nh(e) {
  if (typeof e == "string")
    return e;
  if (wn(e))
    return Xb(e, nh) + "";
  if (ds(e))
    return yu ? yu.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
var Yb = /\s/;
function Jb(e) {
  for (var t = e.length; t-- && Yb.test(e.charAt(t)); )
    ;
  return t;
}
var Qb = /^\s+/;
function ey(e) {
  return e && e.slice(0, Jb(e) + 1).replace(Qb, "");
}
function yr(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var wu = NaN, ty = /^[-+]0x[0-9a-f]+$/i, ny = /^0b[01]+$/i, ry = /^0o[0-7]+$/i, oy = parseInt;
function ku(e) {
  if (typeof e == "number")
    return e;
  if (ds(e))
    return wu;
  if (yr(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = yr(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = ey(e);
  var n = ny.test(e);
  return n || ry.test(e) ? oy(e.slice(2), n ? 2 : 8) : ty.test(e) ? wu : +e;
}
function sy(e) {
  return e;
}
var iy = "[object AsyncFunction]", ay = "[object Function]", cy = "[object GeneratorFunction]", ly = "[object Proxy]";
function rh(e) {
  if (!yr(e))
    return !1;
  var t = $r(e);
  return t == ay || t == cy || t == iy || t == ly;
}
var qs = fn["__core-js_shared__"], Cu = function() {
  var e = /[^.]+$/.exec(qs && qs.keys && qs.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function uy(e) {
  return !!Cu && Cu in e;
}
var dy = Function.prototype, fy = dy.toString;
function sr(e) {
  if (e != null) {
    try {
      return fy.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var py = /[\\^$.*+?()[\]{}|]/g, hy = /^\[object .+?Constructor\]$/, gy = Function.prototype, my = Object.prototype, vy = gy.toString, _y = my.hasOwnProperty, by = RegExp(
  "^" + vy.call(_y).replace(py, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function yy(e) {
  if (!yr(e) || uy(e))
    return !1;
  var t = rh(e) ? by : hy;
  return t.test(sr(e));
}
function wy(e, t) {
  return e == null ? void 0 : e[t];
}
function Mr(e, t) {
  var n = wy(e, t);
  return yy(n) ? n : void 0;
}
var kc = Mr(fn, "WeakMap");
function ky(e, t, n, r) {
  e.length;
  for (var s = n + 1; s--; )
    if (t(e[s], s, e))
      return s;
  return -1;
}
var Cy = 9007199254740991, xy = /^(?:0|[1-9]\d*)$/;
function oh(e, t) {
  var n = typeof e;
  return t = t ?? Cy, !!t && (n == "number" || n != "symbol" && xy.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function sh(e, t) {
  return e === t || e !== e && t !== t;
}
var Sy = 9007199254740991;
function sl(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Sy;
}
function Ey(e) {
  return e != null && sl(e.length) && !rh(e);
}
var Ay = Object.prototype;
function $y(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || Ay;
  return e === n;
}
function My(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var Iy = "[object Arguments]";
function xu(e) {
  return br(e) && $r(e) == Iy;
}
var ih = Object.prototype, Ty = ih.hasOwnProperty, Ly = ih.propertyIsEnumerable, ah = xu(/* @__PURE__ */ function() {
  return arguments;
}()) ? xu : function(e) {
  return br(e) && Ty.call(e, "callee") && !Ly.call(e, "callee");
};
function Oy() {
  return !1;
}
var ch = typeof exports == "object" && exports && !exports.nodeType && exports, Su = ch && typeof module == "object" && module && !module.nodeType && module, Ry = Su && Su.exports === ch, Eu = Ry ? fn.Buffer : void 0, Py = Eu ? Eu.isBuffer : void 0, Cc = Py || Oy, By = "[object Arguments]", zy = "[object Array]", Dy = "[object Boolean]", Ny = "[object Date]", qy = "[object Error]", Fy = "[object Function]", jy = "[object Map]", Hy = "[object Number]", Vy = "[object Object]", Uy = "[object RegExp]", Zy = "[object Set]", Wy = "[object String]", Gy = "[object WeakMap]", Ky = "[object ArrayBuffer]", Xy = "[object DataView]", Yy = "[object Float32Array]", Jy = "[object Float64Array]", Qy = "[object Int8Array]", ew = "[object Int16Array]", tw = "[object Int32Array]", nw = "[object Uint8Array]", rw = "[object Uint8ClampedArray]", ow = "[object Uint16Array]", sw = "[object Uint32Array]", Ne = {};
Ne[Yy] = Ne[Jy] = Ne[Qy] = Ne[ew] = Ne[tw] = Ne[nw] = Ne[rw] = Ne[ow] = Ne[sw] = !0;
Ne[By] = Ne[zy] = Ne[Ky] = Ne[Dy] = Ne[Xy] = Ne[Ny] = Ne[qy] = Ne[Fy] = Ne[jy] = Ne[Hy] = Ne[Vy] = Ne[Uy] = Ne[Zy] = Ne[Wy] = Ne[Gy] = !1;
function iw(e) {
  return br(e) && sl(e.length) && !!Ne[$r(e)];
}
function aw(e) {
  return function(t) {
    return e(t);
  };
}
var lh = typeof exports == "object" && exports && !exports.nodeType && exports, Vr = lh && typeof module == "object" && module && !module.nodeType && module, cw = Vr && Vr.exports === lh, Fs = cw && eh.process, Au = function() {
  try {
    var e = Vr && Vr.require && Vr.require("util").types;
    return e || Fs && Fs.binding && Fs.binding("util");
  } catch {
  }
}(), $u = Au && Au.isTypedArray, uh = $u ? aw($u) : iw, lw = Object.prototype, uw = lw.hasOwnProperty;
function dw(e, t) {
  var n = wn(e), r = !n && ah(e), s = !n && !r && Cc(e), o = !n && !r && !s && uh(e), i = n || r || s || o, a = i ? My(e.length, String) : [], c = a.length;
  for (var u in e)
    uw.call(e, u) && !(i && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    oh(u, c))) && a.push(u);
  return a;
}
function fw(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var pw = fw(Object.keys, Object), hw = Object.prototype, gw = hw.hasOwnProperty;
function mw(e) {
  if (!$y(e))
    return pw(e);
  var t = [];
  for (var n in Object(e))
    gw.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function dh(e) {
  return Ey(e) ? dw(e) : mw(e);
}
var vw = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, _w = /^\w*$/;
function il(e, t) {
  if (wn(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || ds(e) ? !0 : _w.test(e) || !vw.test(e) || t != null && e in Object(t);
}
var Qr = Mr(Object, "create");
function bw() {
  this.__data__ = Qr ? Qr(null) : {}, this.size = 0;
}
function yw(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var ww = "__lodash_hash_undefined__", kw = Object.prototype, Cw = kw.hasOwnProperty;
function xw(e) {
  var t = this.__data__;
  if (Qr) {
    var n = t[e];
    return n === ww ? void 0 : n;
  }
  return Cw.call(t, e) ? t[e] : void 0;
}
var Sw = Object.prototype, Ew = Sw.hasOwnProperty;
function Aw(e) {
  var t = this.__data__;
  return Qr ? t[e] !== void 0 : Ew.call(t, e);
}
var $w = "__lodash_hash_undefined__";
function Mw(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = Qr && t === void 0 ? $w : t, this;
}
function rr(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
rr.prototype.clear = bw;
rr.prototype.delete = yw;
rr.prototype.get = xw;
rr.prototype.has = Aw;
rr.prototype.set = Mw;
function Iw() {
  this.__data__ = [], this.size = 0;
}
function fs(e, t) {
  for (var n = e.length; n--; )
    if (sh(e[n][0], t))
      return n;
  return -1;
}
var Tw = Array.prototype, Lw = Tw.splice;
function Ow(e) {
  var t = this.__data__, n = fs(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : Lw.call(t, n, 1), --this.size, !0;
}
function Rw(e) {
  var t = this.__data__, n = fs(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function Pw(e) {
  return fs(this.__data__, e) > -1;
}
function Bw(e, t) {
  var n = this.__data__, r = fs(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
function Sn(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Sn.prototype.clear = Iw;
Sn.prototype.delete = Ow;
Sn.prototype.get = Rw;
Sn.prototype.has = Pw;
Sn.prototype.set = Bw;
var eo = Mr(fn, "Map");
function zw() {
  this.size = 0, this.__data__ = {
    hash: new rr(),
    map: new (eo || Sn)(),
    string: new rr()
  };
}
function Dw(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function ps(e, t) {
  var n = e.__data__;
  return Dw(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function Nw(e) {
  var t = ps(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function qw(e) {
  return ps(this, e).get(e);
}
function Fw(e) {
  return ps(this, e).has(e);
}
function jw(e, t) {
  var n = ps(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
function En(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
En.prototype.clear = zw;
En.prototype.delete = Nw;
En.prototype.get = qw;
En.prototype.has = Fw;
En.prototype.set = jw;
var Hw = "Expected a function";
function al(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Hw);
  var n = function() {
    var r = arguments, s = t ? t.apply(this, r) : r[0], o = n.cache;
    if (o.has(s))
      return o.get(s);
    var i = e.apply(this, r);
    return n.cache = o.set(s, i) || o, i;
  };
  return n.cache = new (al.Cache || En)(), n;
}
al.Cache = En;
var Vw = 500;
function Uw(e) {
  var t = al(e, function(r) {
    return n.size === Vw && n.clear(), r;
  }), n = t.cache;
  return t;
}
var Zw = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ww = /\\(\\)?/g, Gw = Uw(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Zw, function(n, r, s, o) {
    t.push(s ? o.replace(Ww, "$1") : r || n);
  }), t;
});
function Kw(e) {
  return e == null ? "" : nh(e);
}
function fh(e, t) {
  return wn(e) ? e : il(e, t) ? [e] : Gw(Kw(e));
}
function hs(e) {
  if (typeof e == "string" || ds(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function ph(e, t) {
  t = fh(t, e);
  for (var n = 0, r = t.length; e != null && n < r; )
    e = e[hs(t[n++])];
  return n && n == r ? e : void 0;
}
function It(e, t, n) {
  var r = e == null ? void 0 : ph(e, t);
  return r === void 0 ? n : r;
}
function Xw(e, t) {
  for (var n = -1, r = t.length, s = e.length; ++n < r; )
    e[s + n] = t[n];
  return e;
}
function Yw() {
  this.__data__ = new Sn(), this.size = 0;
}
function Jw(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
function Qw(e) {
  return this.__data__.get(e);
}
function ek(e) {
  return this.__data__.has(e);
}
var tk = 200;
function nk(e, t) {
  var n = this.__data__;
  if (n instanceof Sn) {
    var r = n.__data__;
    if (!eo || r.length < tk - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new En(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
function bn(e) {
  var t = this.__data__ = new Sn(e);
  this.size = t.size;
}
bn.prototype.clear = Yw;
bn.prototype.delete = Jw;
bn.prototype.get = Qw;
bn.prototype.has = ek;
bn.prototype.set = nk;
function rk(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, s = 0, o = []; ++n < r; ) {
    var i = e[n];
    t(i, n, e) && (o[s++] = i);
  }
  return o;
}
function ok() {
  return [];
}
var sk = Object.prototype, ik = sk.propertyIsEnumerable, Mu = Object.getOwnPropertySymbols, ak = Mu ? function(e) {
  return e == null ? [] : (e = Object(e), rk(Mu(e), function(t) {
    return ik.call(e, t);
  }));
} : ok;
function ck(e, t, n) {
  var r = t(e);
  return wn(e) ? r : Xw(r, n(e));
}
function Iu(e) {
  return ck(e, dh, ak);
}
var xc = Mr(fn, "DataView"), Sc = Mr(fn, "Promise"), Ec = Mr(fn, "Set"), Tu = "[object Map]", lk = "[object Object]", Lu = "[object Promise]", Ou = "[object Set]", Ru = "[object WeakMap]", Pu = "[object DataView]", uk = sr(xc), dk = sr(eo), fk = sr(Sc), pk = sr(Ec), hk = sr(kc), Rn = $r;
(xc && Rn(new xc(new ArrayBuffer(1))) != Pu || eo && Rn(new eo()) != Tu || Sc && Rn(Sc.resolve()) != Lu || Ec && Rn(new Ec()) != Ou || kc && Rn(new kc()) != Ru) && (Rn = function(e) {
  var t = $r(e), n = t == lk ? e.constructor : void 0, r = n ? sr(n) : "";
  if (r)
    switch (r) {
      case uk:
        return Pu;
      case dk:
        return Tu;
      case fk:
        return Lu;
      case pk:
        return Ou;
      case hk:
        return Ru;
    }
  return t;
});
var Bu = fn.Uint8Array, gk = "__lodash_hash_undefined__";
function mk(e) {
  return this.__data__.set(e, gk), this;
}
function vk(e) {
  return this.__data__.has(e);
}
function Go(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new En(); ++t < n; )
    this.add(e[t]);
}
Go.prototype.add = Go.prototype.push = mk;
Go.prototype.has = vk;
function _k(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
function bk(e, t) {
  return e.has(t);
}
var yk = 1, wk = 2;
function hh(e, t, n, r, s, o) {
  var i = n & yk, a = e.length, c = t.length;
  if (a != c && !(i && c > a))
    return !1;
  var u = o.get(e), d = o.get(t);
  if (u && d)
    return u == t && d == e;
  var l = -1, m = !0, f = n & wk ? new Go() : void 0;
  for (o.set(e, t), o.set(t, e); ++l < a; ) {
    var v = e[l], g = t[l];
    if (r)
      var y = i ? r(g, v, l, t, e, o) : r(v, g, l, e, t, o);
    if (y !== void 0) {
      if (y)
        continue;
      m = !1;
      break;
    }
    if (f) {
      if (!_k(t, function(h, w) {
        if (!bk(f, w) && (v === h || s(v, h, n, r, o)))
          return f.push(w);
      })) {
        m = !1;
        break;
      }
    } else if (!(v === g || s(v, g, n, r, o))) {
      m = !1;
      break;
    }
  }
  return o.delete(e), o.delete(t), m;
}
function kk(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r, s) {
    n[++t] = [s, r];
  }), n;
}
function Ck(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r) {
    n[++t] = r;
  }), n;
}
var xk = 1, Sk = 2, Ek = "[object Boolean]", Ak = "[object Date]", $k = "[object Error]", Mk = "[object Map]", Ik = "[object Number]", Tk = "[object RegExp]", Lk = "[object Set]", Ok = "[object String]", Rk = "[object Symbol]", Pk = "[object ArrayBuffer]", Bk = "[object DataView]", zu = Nn ? Nn.prototype : void 0, js = zu ? zu.valueOf : void 0;
function zk(e, t, n, r, s, o, i) {
  switch (n) {
    case Bk:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case Pk:
      return !(e.byteLength != t.byteLength || !o(new Bu(e), new Bu(t)));
    case Ek:
    case Ak:
    case Ik:
      return sh(+e, +t);
    case $k:
      return e.name == t.name && e.message == t.message;
    case Tk:
    case Ok:
      return e == t + "";
    case Mk:
      var a = kk;
    case Lk:
      var c = r & xk;
      if (a || (a = Ck), e.size != t.size && !c)
        return !1;
      var u = i.get(e);
      if (u)
        return u == t;
      r |= Sk, i.set(e, t);
      var d = hh(a(e), a(t), r, s, o, i);
      return i.delete(e), d;
    case Rk:
      if (js)
        return js.call(e) == js.call(t);
  }
  return !1;
}
var Dk = 1, Nk = Object.prototype, qk = Nk.hasOwnProperty;
function Fk(e, t, n, r, s, o) {
  var i = n & Dk, a = Iu(e), c = a.length, u = Iu(t), d = u.length;
  if (c != d && !i)
    return !1;
  for (var l = c; l--; ) {
    var m = a[l];
    if (!(i ? m in t : qk.call(t, m)))
      return !1;
  }
  var f = o.get(e), v = o.get(t);
  if (f && v)
    return f == t && v == e;
  var g = !0;
  o.set(e, t), o.set(t, e);
  for (var y = i; ++l < c; ) {
    m = a[l];
    var h = e[m], w = t[m];
    if (r)
      var k = i ? r(w, h, m, t, e, o) : r(h, w, m, e, t, o);
    if (!(k === void 0 ? h === w || s(h, w, n, r, o) : k)) {
      g = !1;
      break;
    }
    y || (y = m == "constructor");
  }
  if (g && !y) {
    var C = e.constructor, A = t.constructor;
    C != A && "constructor" in e && "constructor" in t && !(typeof C == "function" && C instanceof C && typeof A == "function" && A instanceof A) && (g = !1);
  }
  return o.delete(e), o.delete(t), g;
}
var jk = 1, Du = "[object Arguments]", Nu = "[object Array]", Co = "[object Object]", Hk = Object.prototype, qu = Hk.hasOwnProperty;
function Vk(e, t, n, r, s, o) {
  var i = wn(e), a = wn(t), c = i ? Nu : Rn(e), u = a ? Nu : Rn(t);
  c = c == Du ? Co : c, u = u == Du ? Co : u;
  var d = c == Co, l = u == Co, m = c == u;
  if (m && Cc(e)) {
    if (!Cc(t))
      return !1;
    i = !0, d = !1;
  }
  if (m && !d)
    return o || (o = new bn()), i || uh(e) ? hh(e, t, n, r, s, o) : zk(e, t, c, n, r, s, o);
  if (!(n & jk)) {
    var f = d && qu.call(e, "__wrapped__"), v = l && qu.call(t, "__wrapped__");
    if (f || v) {
      var g = f ? e.value() : e, y = v ? t.value() : t;
      return o || (o = new bn()), s(g, y, n, r, o);
    }
  }
  return m ? (o || (o = new bn()), Fk(e, t, n, r, s, o)) : !1;
}
function gs(e, t, n, r, s) {
  return e === t ? !0 : e == null || t == null || !br(e) && !br(t) ? e !== e && t !== t : Vk(e, t, n, r, gs, s);
}
var Uk = 1, Zk = 2;
function Wk(e, t, n, r) {
  var s = n.length, o = s;
  if (e == null)
    return !o;
  for (e = Object(e); s--; ) {
    var i = n[s];
    if (i[2] ? i[1] !== e[i[0]] : !(i[0] in e))
      return !1;
  }
  for (; ++s < o; ) {
    i = n[s];
    var a = i[0], c = e[a], u = i[1];
    if (i[2]) {
      if (c === void 0 && !(a in e))
        return !1;
    } else {
      var d = new bn(), l;
      if (!(l === void 0 ? gs(u, c, Uk | Zk, r, d) : l))
        return !1;
    }
  }
  return !0;
}
function gh(e) {
  return e === e && !yr(e);
}
function Gk(e) {
  for (var t = dh(e), n = t.length; n--; ) {
    var r = t[n], s = e[r];
    t[n] = [r, s, gh(s)];
  }
  return t;
}
function mh(e, t) {
  return function(n) {
    return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
  };
}
function Kk(e) {
  var t = Gk(e);
  return t.length == 1 && t[0][2] ? mh(t[0][0], t[0][1]) : function(n) {
    return n === e || Wk(n, e, t);
  };
}
function Xk(e, t) {
  return e != null && t in Object(e);
}
function Yk(e, t, n) {
  t = fh(t, e);
  for (var r = -1, s = t.length, o = !1; ++r < s; ) {
    var i = hs(t[r]);
    if (!(o = e != null && n(e, i)))
      break;
    e = e[i];
  }
  return o || ++r != s ? o : (s = e == null ? 0 : e.length, !!s && sl(s) && oh(i, s) && (wn(e) || ah(e)));
}
function Jk(e, t) {
  return e != null && Yk(e, t, Xk);
}
var Qk = 1, e4 = 2;
function t4(e, t) {
  return il(e) && gh(t) ? mh(hs(e), t) : function(n) {
    var r = It(n, e);
    return r === void 0 && r === t ? Jk(n, e) : gs(t, r, Qk | e4);
  };
}
function n4(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function r4(e) {
  return function(t) {
    return ph(t, e);
  };
}
function o4(e) {
  return il(e) ? n4(hs(e)) : r4(e);
}
function s4(e) {
  return typeof e == "function" ? e : e == null ? sy : typeof e == "object" ? wn(e) ? t4(e[0], e[1]) : Kk(e) : o4(e);
}
var Hs = function() {
  return fn.Date.now();
}, i4 = "Expected a function", a4 = Math.max, c4 = Math.min;
function Ac(e, t, n) {
  var r, s, o, i, a, c, u = 0, d = !1, l = !1, m = !0;
  if (typeof e != "function")
    throw new TypeError(i4);
  t = ku(t) || 0, yr(n) && (d = !!n.leading, l = "maxWait" in n, o = l ? a4(ku(n.maxWait) || 0, t) : o, m = "trailing" in n ? !!n.trailing : m);
  function f(E) {
    var $ = r, M = s;
    return r = s = void 0, u = E, i = e.apply(M, $), i;
  }
  function v(E) {
    return u = E, a = setTimeout(h, t), d ? f(E) : i;
  }
  function g(E) {
    var $ = E - c, M = E - u, O = t - $;
    return l ? c4(O, o - M) : O;
  }
  function y(E) {
    var $ = E - c, M = E - u;
    return c === void 0 || $ >= t || $ < 0 || l && M >= o;
  }
  function h() {
    var E = Hs();
    if (y(E))
      return w(E);
    a = setTimeout(h, g(E));
  }
  function w(E) {
    return a = void 0, m && r ? f(E) : (r = s = void 0, i);
  }
  function k() {
    a !== void 0 && clearTimeout(a), u = 0, r = c = s = a = void 0;
  }
  function C() {
    return a === void 0 ? i : w(Hs());
  }
  function A() {
    var E = Hs(), $ = y(E);
    if (r = arguments, s = this, c = E, $) {
      if (a === void 0)
        return v(c);
      if (l)
        return clearTimeout(a), a = setTimeout(h, t), f(c);
    }
    return a === void 0 && (a = setTimeout(h, t)), i;
  }
  return A.cancel = k, A.flush = C, A;
}
function l4(e, t, n) {
  var r = e == null ? 0 : e.length;
  if (!r)
    return -1;
  var s = r - 1;
  return ky(e, s4(t), s);
}
function Ko(e) {
  for (var t = -1, n = e == null ? 0 : e.length, r = {}; ++t < n; ) {
    var s = e[t];
    r[s[0]] = s[1];
  }
  return r;
}
function $c(e, t) {
  return gs(e, t);
}
function er(e) {
  return e == null;
}
function u4(e) {
  return e === void 0;
}
const vh = (e) => e === void 0, cl = (e) => typeof e == "boolean", Ze = (e) => typeof e == "number", to = (e) => typeof Element > "u" ? !1 : e instanceof Element, d4 = (e) => Xt(e) ? !Number.isNaN(Number(e)) : !1, f4 = (e = "") => e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
class p4 extends Error {
  constructor(t) {
    super(t), this.name = "ElementPlusError";
  }
}
function h4(e, t) {
  throw new p4(`[${e}] ${t}`);
}
function wr(e, t = "px") {
  if (!e)
    return "";
  if (Ze(e) || d4(e))
    return `${e}${t}`;
  if (Xt(e))
    return e;
}
function g4(e, t) {
  if (!ut)
    return;
  if (!t) {
    e.scrollTop = 0;
    return;
  }
  const n = [];
  let r = t.offsetParent;
  for (; r !== null && e !== r && e.contains(r); )
    n.push(r), r = r.offsetParent;
  const s = t.offsetTop + n.reduce((c, u) => c + u.offsetTop, 0), o = s + t.offsetHeight, i = e.scrollTop, a = i + e.clientHeight;
  s < i ? e.scrollTop = s : o > a && (e.scrollTop = o - e.clientHeight);
}
/*! Element Plus Icons Vue v2.3.1 */
var m4 = /* @__PURE__ */ H({
  name: "ArrowDown",
  __name: "arrow-down",
  setup(e) {
    return (t, n) => (b(), x("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
      })
    ]));
  }
}), _h = m4, v4 = /* @__PURE__ */ H({
  name: "ArrowLeft",
  __name: "arrow-left",
  setup(e) {
    return (t, n) => (b(), x("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
      })
    ]));
  }
}), _4 = v4, b4 = /* @__PURE__ */ H({
  name: "ArrowRight",
  __name: "arrow-right",
  setup(e) {
    return (t, n) => (b(), x("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
      })
    ]));
  }
}), y4 = b4, w4 = /* @__PURE__ */ H({
  name: "CircleCheck",
  __name: "circle-check",
  setup(e) {
    return (t, n) => (b(), x("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
      }),
      p("path", {
        fill: "currentColor",
        d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z"
      })
    ]));
  }
}), k4 = w4, C4 = /* @__PURE__ */ H({
  name: "CircleClose",
  __name: "circle-close",
  setup(e) {
    return (t, n) => (b(), x("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248z"
      }),
      p("path", {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
      })
    ]));
  }
}), ll = C4, x4 = /* @__PURE__ */ H({
  name: "Close",
  __name: "close",
  setup(e) {
    return (t, n) => (b(), x("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
      })
    ]));
  }
}), Mc = x4, S4 = /* @__PURE__ */ H({
  name: "DArrowLeft",
  __name: "d-arrow-left",
  setup(e) {
    return (t, n) => (b(), x("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M529.408 149.376a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224zm256 0a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224z"
      })
    ]));
  }
}), E4 = S4, A4 = /* @__PURE__ */ H({
  name: "DArrowRight",
  __name: "d-arrow-right",
  setup(e) {
    return (t, n) => (b(), x("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M452.864 149.312a29.12 29.12 0 0 1 41.728.064L826.24 489.664a32 32 0 0 1 0 44.672L494.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L764.736 512 452.864 192a30.592 30.592 0 0 1 0-42.688m-256 0a29.12 29.12 0 0 1 41.728.064L570.24 489.664a32 32 0 0 1 0 44.672L238.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L508.736 512 196.864 192a30.592 30.592 0 0 1 0-42.688z"
      })
    ]));
  }
}), $4 = A4, M4 = /* @__PURE__ */ H({
  name: "Hide",
  __name: "hide",
  setup(e) {
    return (t, n) => (b(), x("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2zM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z"
      }),
      p("path", {
        fill: "currentColor",
        d: "M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z"
      })
    ]));
  }
}), I4 = M4, T4 = /* @__PURE__ */ H({
  name: "Loading",
  __name: "loading",
  setup(e) {
    return (t, n) => (b(), x("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
      })
    ]));
  }
}), bh = T4, L4 = /* @__PURE__ */ H({
  name: "MoreFilled",
  __name: "more-filled",
  setup(e) {
    return (t, n) => (b(), x("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224"
      })
    ]));
  }
}), Fu = L4, O4 = /* @__PURE__ */ H({
  name: "PictureFilled",
  __name: "picture-filled",
  setup(e) {
    return (t, n) => (b(), x("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M96 896a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h832a32 32 0 0 1 32 32v704a32 32 0 0 1-32 32zm315.52-228.48-68.928-68.928a32 32 0 0 0-45.248 0L128 768.064h778.688l-242.112-290.56a32 32 0 0 0-49.216 0L458.752 665.408a32 32 0 0 1-47.232 2.112M256 384a96 96 0 1 0 192.064-.064A96 96 0 0 0 256 384"
      })
    ]));
  }
}), R4 = O4, P4 = /* @__PURE__ */ H({
  name: "View",
  __name: "view",
  setup(e) {
    return (t, n) => (b(), x("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448m0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160"
      })
    ]));
  }
}), B4 = P4;
const yh = "__epPropKey", ge = (e) => e, z4 = (e) => Yt(e) && !!e[yh], ms = (e, t) => {
  if (!Yt(e) || z4(e))
    return e;
  const { values: n, required: r, default: s, type: o, validator: i } = e, c = {
    type: o,
    required: !!r,
    validator: n || i ? (u) => {
      let d = !1, l = [];
      if (n && (l = Array.from(n), Wo(e, "default") && l.push(s), d || (d = l.includes(u))), i && (d || (d = i(u))), !d && l.length > 0) {
        const m = [...new Set(l)].map((f) => JSON.stringify(f)).join(", ");
        Rv(`Invalid prop: validation failed${t ? ` for prop "${t}"` : ""}. Expected one of [${m}], got value ${JSON.stringify(u)}.`);
      }
      return d;
    } : void 0,
    [yh]: !0
  };
  return Wo(e, "default") && (c.default = s), c;
}, Me = (e) => Ko(Object.entries(e).map(([t, n]) => [
  t,
  ms(n, t)
])), Qt = ge([
  String,
  Object,
  Function
]), wh = {
  validating: bh,
  success: k4,
  error: ll
}, Ft = (e, t) => {
  if (e.install = (n) => {
    for (const r of [e, ...Object.values(t ?? {})])
      n.component(r.name, r);
  }, t)
    for (const [n, r] of Object.entries(t))
      e[n] = r;
  return e;
}, D4 = (e, t) => (e.install = (n) => {
  n.directive(t, e);
}, e), vs = (e) => (e.install = Jr, e), yn = {
  tab: "Tab",
  enter: "Enter",
  space: "Space",
  esc: "Escape",
  delete: "Delete",
  backspace: "Backspace"
}, _t = "update:modelValue", ul = "change", fo = ["", "default", "small", "large"], N4 = {
  large: 40,
  default: 32,
  small: 24
}, q4 = (e) => N4[e || "default"], F4 = (e) => ["", ...fo].includes(e), kh = (e) => /([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(e), dl = (e) => e, j4 = ["class", "style"], H4 = /^on[A-Z]/, V4 = (e = {}) => {
  const { excludeListeners: t = !1, excludeKeys: n } = e, r = I(() => ((n == null ? void 0 : n.value) || []).concat(j4)), s = ot();
  return s ? I(() => {
    var o;
    return Ko(Object.entries((o = s.proxy) == null ? void 0 : o.$attrs).filter(([i]) => !r.value.includes(i) && !(t && H4.test(i))));
  }) : I(() => ({}));
}, Ch = ({ from: e, replacement: t, scope: n, version: r, ref: s, type: o = "API" }, i) => {
  ae(() => _(i), (a) => {
  }, {
    immediate: !0
  });
};
var U4 = {
  name: "en",
  el: {
    colorpicker: {
      confirm: "OK",
      clear: "Clear",
      defaultLabel: "color picker",
      description: "current color is {color}. press enter to select a new color."
    },
    datepicker: {
      now: "Now",
      today: "Today",
      cancel: "Cancel",
      clear: "Clear",
      confirm: "OK",
      dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      selectedDate: "Selected date",
      selectDate: "Select date",
      selectTime: "Select time",
      startDate: "Start Date",
      startTime: "Start Time",
      endDate: "End Date",
      endTime: "End Time",
      prevYear: "Previous Year",
      nextYear: "Next Year",
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      year: "",
      month1: "January",
      month2: "February",
      month3: "March",
      month4: "April",
      month5: "May",
      month6: "June",
      month7: "July",
      month8: "August",
      month9: "September",
      month10: "October",
      month11: "November",
      month12: "December",
      week: "week",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat"
      },
      weeksFull: {
        sun: "Sunday",
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday"
      },
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec"
      }
    },
    inputNumber: {
      decrease: "decrease number",
      increase: "increase number"
    },
    select: {
      loading: "Loading",
      noMatch: "No matching data",
      noData: "No data",
      placeholder: "Select"
    },
    dropdown: {
      toggleDropdown: "Toggle Dropdown"
    },
    cascader: {
      noMatch: "No matching data",
      loading: "Loading",
      placeholder: "Select",
      noData: "No data"
    },
    pagination: {
      goto: "Go to",
      pagesize: "/page",
      total: "Total {total}",
      pageClassifier: "",
      page: "Page",
      prev: "Go to previous page",
      next: "Go to next page",
      currentPage: "page {pager}",
      prevPages: "Previous {pager} pages",
      nextPages: "Next {pager} pages",
      deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
    },
    dialog: {
      close: "Close this dialog"
    },
    drawer: {
      close: "Close this dialog"
    },
    messagebox: {
      title: "Message",
      confirm: "OK",
      cancel: "Cancel",
      error: "Illegal input",
      close: "Close this dialog"
    },
    upload: {
      deleteTip: "press delete to remove",
      delete: "Delete",
      preview: "Preview",
      continue: "Continue"
    },
    slider: {
      defaultLabel: "slider between {min} and {max}",
      defaultRangeStartLabel: "pick start value",
      defaultRangeEndLabel: "pick end value"
    },
    table: {
      emptyText: "No Data",
      confirmFilter: "Confirm",
      resetFilter: "Reset",
      clearFilter: "All",
      sumText: "Sum"
    },
    tree: {
      emptyText: "No Data"
    },
    transfer: {
      noMatch: "No matching data",
      noData: "No data",
      titles: ["List 1", "List 2"],
      filterPlaceholder: "Enter keyword",
      noCheckedFormat: "{total} items",
      hasCheckedFormat: "{checked}/{total} checked"
    },
    image: {
      error: "FAILED"
    },
    pageHeader: {
      title: "Back"
    },
    popconfirm: {
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }
  }
};
const Z4 = (e) => (t, n) => W4(t, n, _(e)), W4 = (e, t, n) => It(n, e, e).replace(/\{(\w+)\}/g, (r, s) => {
  var o;
  return `${(o = t == null ? void 0 : t[s]) != null ? o : `{${s}}`}`;
}), G4 = (e) => {
  const t = I(() => _(e).name), n = Tp(e) ? e : D(e);
  return {
    lang: t,
    locale: n,
    t: Z4(e)
  };
}, K4 = Symbol("localeContextKey"), en = (e) => {
  const t = $e(K4, D());
  return G4(I(() => t.value || U4));
}, Vs = "el", X4 = "is-", Gn = (e, t, n, r, s) => {
  let o = `${e}-${t}`;
  return n && (o += `-${n}`), r && (o += `__${r}`), s && (o += `--${s}`), o;
}, Y4 = Symbol("namespaceContextKey"), fl = (e) => {
  const t = ot() ? $e(Y4, D(Vs)) : D(Vs);
  return I(() => _(t) || Vs);
}, Se = (e, t) => {
  const n = fl();
  return {
    namespace: n,
    b: (g = "") => Gn(n.value, e, g, "", ""),
    e: (g) => g ? Gn(n.value, e, "", g, "") : "",
    m: (g) => g ? Gn(n.value, e, "", "", g) : "",
    be: (g, y) => g && y ? Gn(n.value, e, g, y, "") : "",
    em: (g, y) => g && y ? Gn(n.value, e, "", g, y) : "",
    bm: (g, y) => g && y ? Gn(n.value, e, g, "", y) : "",
    bem: (g, y, h) => g && y && h ? Gn(n.value, e, g, y, h) : "",
    is: (g, ...y) => {
      const h = y.length >= 1 ? y[0] : !0;
      return g && h ? `${X4}${g}` : "";
    },
    cssVar: (g) => {
      const y = {};
      for (const h in g)
        g[h] && (y[`--${n.value}-${h}`] = g[h]);
      return y;
    },
    cssVarName: (g) => `--${n.value}-${g}`,
    cssVarBlock: (g) => {
      const y = {};
      for (const h in g)
        g[h] && (y[`--${n.value}-${e}-${h}`] = g[h]);
      return y;
    },
    cssVarBlockName: (g) => `--${n.value}-${e}-${g}`
  };
}, J4 = ms({
  type: ge(Boolean),
  default: null
}), Q4 = ms({
  type: ge(Function)
}), e3 = (e) => {
  const t = `update:${e}`, n = `onUpdate:${e}`, r = [t], s = {
    [e]: J4,
    [n]: Q4
  };
  return {
    useModelToggle: ({
      indicator: i,
      toggleReason: a,
      shouldHideWhenRouteChanges: c,
      shouldProceed: u,
      onShow: d,
      onHide: l
    }) => {
      const m = ot(), { emit: f } = m, v = m.props, g = I(() => Ot(v[n])), y = I(() => v[e] === null), h = ($) => {
        i.value !== !0 && (i.value = !0, a && (a.value = $), Ot(d) && d($));
      }, w = ($) => {
        i.value !== !1 && (i.value = !1, a && (a.value = $), Ot(l) && l($));
      }, k = ($) => {
        if (v.disabled === !0 || Ot(u) && !u())
          return;
        const M = g.value && ut;
        M && f(t, !0), (y.value || !M) && h($);
      }, C = ($) => {
        if (v.disabled === !0 || !ut)
          return;
        const M = g.value && ut;
        M && f(t, !1), (y.value || !M) && w($);
      }, A = ($) => {
        cl($) && (v.disabled && $ ? g.value && f(t, !1) : i.value !== $ && ($ ? h() : w()));
      }, E = () => {
        i.value ? C() : k();
      };
      return ae(() => v[e], A), c && m.appContext.config.globalProperties.$route !== void 0 && ae(() => ({
        ...m.proxy.$route
      }), () => {
        c.value && i.value && C();
      }), Be(() => {
        A(v[e]);
      }), {
        hide: C,
        show: k,
        toggle: E,
        hasUpdateHandler: g
      };
    },
    useModelToggleProps: s,
    useModelToggleEmits: r
  };
}, xh = (e) => {
  const t = ot();
  return I(() => {
    var n, r;
    return (r = (n = t == null ? void 0 : t.proxy) == null ? void 0 : n.$props) == null ? void 0 : r[e];
  });
};
var yt = "top", zt = "bottom", Dt = "right", wt = "left", pl = "auto", po = [yt, zt, Dt, wt], kr = "start", no = "end", t3 = "clippingParents", Sh = "viewport", Nr = "popper", n3 = "reference", ju = po.reduce(function(e, t) {
  return e.concat([t + "-" + kr, t + "-" + no]);
}, []), _s = [].concat(po, [pl]).reduce(function(e, t) {
  return e.concat([t, t + "-" + kr, t + "-" + no]);
}, []), r3 = "beforeRead", o3 = "read", s3 = "afterRead", i3 = "beforeMain", a3 = "main", c3 = "afterMain", l3 = "beforeWrite", u3 = "write", d3 = "afterWrite", f3 = [r3, o3, s3, i3, a3, c3, l3, u3, d3];
function dn(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function tn(e) {
  if (e == null) return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Cr(e) {
  var t = tn(e).Element;
  return e instanceof t || e instanceof Element;
}
function Pt(e) {
  var t = tn(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function hl(e) {
  if (typeof ShadowRoot > "u") return !1;
  var t = tn(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function p3(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, s = t.attributes[n] || {}, o = t.elements[n];
    !Pt(o) || !dn(o) || (Object.assign(o.style, r), Object.keys(s).forEach(function(i) {
      var a = s[i];
      a === !1 ? o.removeAttribute(i) : o.setAttribute(i, a === !0 ? "" : a);
    }));
  });
}
function h3(e) {
  var t = e.state, n = { popper: { position: t.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
  return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function() {
    Object.keys(t.elements).forEach(function(r) {
      var s = t.elements[r], o = t.attributes[r] || {}, i = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), a = i.reduce(function(c, u) {
        return c[u] = "", c;
      }, {});
      !Pt(s) || !dn(s) || (Object.assign(s.style, a), Object.keys(o).forEach(function(c) {
        s.removeAttribute(c);
      }));
    });
  };
}
var Eh = { name: "applyStyles", enabled: !0, phase: "write", fn: p3, effect: h3, requires: ["computeStyles"] };
function un(e) {
  return e.split("-")[0];
}
var tr = Math.max, Xo = Math.min, xr = Math.round;
function Sr(e, t) {
  t === void 0 && (t = !1);
  var n = e.getBoundingClientRect(), r = 1, s = 1;
  if (Pt(e) && t) {
    var o = e.offsetHeight, i = e.offsetWidth;
    i > 0 && (r = xr(n.width) / i || 1), o > 0 && (s = xr(n.height) / o || 1);
  }
  return { width: n.width / r, height: n.height / s, top: n.top / s, right: n.right / r, bottom: n.bottom / s, left: n.left / r, x: n.left / r, y: n.top / s };
}
function gl(e) {
  var t = Sr(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), { x: e.offsetLeft, y: e.offsetTop, width: n, height: r };
}
function Ah(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (n && hl(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r)) return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function kn(e) {
  return tn(e).getComputedStyle(e);
}
function g3(e) {
  return ["table", "td", "th"].indexOf(dn(e)) >= 0;
}
function jn(e) {
  return ((Cr(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function bs(e) {
  return dn(e) === "html" ? e : e.assignedSlot || e.parentNode || (hl(e) ? e.host : null) || jn(e);
}
function Hu(e) {
  return !Pt(e) || kn(e).position === "fixed" ? null : e.offsetParent;
}
function m3(e) {
  var t = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1, n = navigator.userAgent.indexOf("Trident") !== -1;
  if (n && Pt(e)) {
    var r = kn(e);
    if (r.position === "fixed") return null;
  }
  var s = bs(e);
  for (hl(s) && (s = s.host); Pt(s) && ["html", "body"].indexOf(dn(s)) < 0; ) {
    var o = kn(s);
    if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || t && o.willChange === "filter" || t && o.filter && o.filter !== "none") return s;
    s = s.parentNode;
  }
  return null;
}
function ho(e) {
  for (var t = tn(e), n = Hu(e); n && g3(n) && kn(n).position === "static"; ) n = Hu(n);
  return n && (dn(n) === "html" || dn(n) === "body" && kn(n).position === "static") ? t : n || m3(e) || t;
}
function ml(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Ur(e, t, n) {
  return tr(e, Xo(t, n));
}
function v3(e, t, n) {
  var r = Ur(e, t, n);
  return r > n ? n : r;
}
function $h() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function Mh(e) {
  return Object.assign({}, $h(), e);
}
function Ih(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var _3 = function(e, t) {
  return e = typeof e == "function" ? e(Object.assign({}, t.rects, { placement: t.placement })) : e, Mh(typeof e != "number" ? e : Ih(e, po));
};
function b3(e) {
  var t, n = e.state, r = e.name, s = e.options, o = n.elements.arrow, i = n.modifiersData.popperOffsets, a = un(n.placement), c = ml(a), u = [wt, Dt].indexOf(a) >= 0, d = u ? "height" : "width";
  if (!(!o || !i)) {
    var l = _3(s.padding, n), m = gl(o), f = c === "y" ? yt : wt, v = c === "y" ? zt : Dt, g = n.rects.reference[d] + n.rects.reference[c] - i[c] - n.rects.popper[d], y = i[c] - n.rects.reference[c], h = ho(o), w = h ? c === "y" ? h.clientHeight || 0 : h.clientWidth || 0 : 0, k = g / 2 - y / 2, C = l[f], A = w - m[d] - l[v], E = w / 2 - m[d] / 2 + k, $ = Ur(C, E, A), M = c;
    n.modifiersData[r] = (t = {}, t[M] = $, t.centerOffset = $ - E, t);
  }
}
function y3(e) {
  var t = e.state, n = e.options, r = n.element, s = r === void 0 ? "[data-popper-arrow]" : r;
  s != null && (typeof s == "string" && (s = t.elements.popper.querySelector(s), !s) || !Ah(t.elements.popper, s) || (t.elements.arrow = s));
}
var w3 = { name: "arrow", enabled: !0, phase: "main", fn: b3, effect: y3, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] };
function Er(e) {
  return e.split("-")[1];
}
var k3 = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function C3(e) {
  var t = e.x, n = e.y, r = window, s = r.devicePixelRatio || 1;
  return { x: xr(t * s) / s || 0, y: xr(n * s) / s || 0 };
}
function Vu(e) {
  var t, n = e.popper, r = e.popperRect, s = e.placement, o = e.variation, i = e.offsets, a = e.position, c = e.gpuAcceleration, u = e.adaptive, d = e.roundOffsets, l = e.isFixed, m = i.x, f = m === void 0 ? 0 : m, v = i.y, g = v === void 0 ? 0 : v, y = typeof d == "function" ? d({ x: f, y: g }) : { x: f, y: g };
  f = y.x, g = y.y;
  var h = i.hasOwnProperty("x"), w = i.hasOwnProperty("y"), k = wt, C = yt, A = window;
  if (u) {
    var E = ho(n), $ = "clientHeight", M = "clientWidth";
    if (E === tn(n) && (E = jn(n), kn(E).position !== "static" && a === "absolute" && ($ = "scrollHeight", M = "scrollWidth")), E = E, s === yt || (s === wt || s === Dt) && o === no) {
      C = zt;
      var O = l && E === A && A.visualViewport ? A.visualViewport.height : E[$];
      g -= O - r.height, g *= c ? 1 : -1;
    }
    if (s === wt || (s === yt || s === zt) && o === no) {
      k = Dt;
      var R = l && E === A && A.visualViewport ? A.visualViewport.width : E[M];
      f -= R - r.width, f *= c ? 1 : -1;
    }
  }
  var B = Object.assign({ position: a }, u && k3), V = d === !0 ? C3({ x: f, y: g }) : { x: f, y: g };
  if (f = V.x, g = V.y, c) {
    var re;
    return Object.assign({}, B, (re = {}, re[C] = w ? "0" : "", re[k] = h ? "0" : "", re.transform = (A.devicePixelRatio || 1) <= 1 ? "translate(" + f + "px, " + g + "px)" : "translate3d(" + f + "px, " + g + "px, 0)", re));
  }
  return Object.assign({}, B, (t = {}, t[C] = w ? g + "px" : "", t[k] = h ? f + "px" : "", t.transform = "", t));
}
function x3(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, s = r === void 0 ? !0 : r, o = n.adaptive, i = o === void 0 ? !0 : o, a = n.roundOffsets, c = a === void 0 ? !0 : a, u = { placement: un(t.placement), variation: Er(t.placement), popper: t.elements.popper, popperRect: t.rects.popper, gpuAcceleration: s, isFixed: t.options.strategy === "fixed" };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Vu(Object.assign({}, u, { offsets: t.modifiersData.popperOffsets, position: t.options.strategy, adaptive: i, roundOffsets: c })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Vu(Object.assign({}, u, { offsets: t.modifiersData.arrow, position: "absolute", adaptive: !1, roundOffsets: c })))), t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-placement": t.placement });
}
var Th = { name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: x3, data: {} }, xo = { passive: !0 };
function S3(e) {
  var t = e.state, n = e.instance, r = e.options, s = r.scroll, o = s === void 0 ? !0 : s, i = r.resize, a = i === void 0 ? !0 : i, c = tn(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return o && u.forEach(function(d) {
    d.addEventListener("scroll", n.update, xo);
  }), a && c.addEventListener("resize", n.update, xo), function() {
    o && u.forEach(function(d) {
      d.removeEventListener("scroll", n.update, xo);
    }), a && c.removeEventListener("resize", n.update, xo);
  };
}
var Lh = { name: "eventListeners", enabled: !0, phase: "write", fn: function() {
}, effect: S3, data: {} }, E3 = { left: "right", right: "left", bottom: "top", top: "bottom" };
function zo(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return E3[t];
  });
}
var A3 = { start: "end", end: "start" };
function Uu(e) {
  return e.replace(/start|end/g, function(t) {
    return A3[t];
  });
}
function vl(e) {
  var t = tn(e), n = t.pageXOffset, r = t.pageYOffset;
  return { scrollLeft: n, scrollTop: r };
}
function _l(e) {
  return Sr(jn(e)).left + vl(e).scrollLeft;
}
function $3(e) {
  var t = tn(e), n = jn(e), r = t.visualViewport, s = n.clientWidth, o = n.clientHeight, i = 0, a = 0;
  return r && (s = r.width, o = r.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (i = r.offsetLeft, a = r.offsetTop)), { width: s, height: o, x: i + _l(e), y: a };
}
function M3(e) {
  var t, n = jn(e), r = vl(e), s = (t = e.ownerDocument) == null ? void 0 : t.body, o = tr(n.scrollWidth, n.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0), i = tr(n.scrollHeight, n.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0), a = -r.scrollLeft + _l(e), c = -r.scrollTop;
  return kn(s || n).direction === "rtl" && (a += tr(n.clientWidth, s ? s.clientWidth : 0) - o), { width: o, height: i, x: a, y: c };
}
function bl(e) {
  var t = kn(e), n = t.overflow, r = t.overflowX, s = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + s + r);
}
function Oh(e) {
  return ["html", "body", "#document"].indexOf(dn(e)) >= 0 ? e.ownerDocument.body : Pt(e) && bl(e) ? e : Oh(bs(e));
}
function Zr(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = Oh(e), s = r === ((n = e.ownerDocument) == null ? void 0 : n.body), o = tn(r), i = s ? [o].concat(o.visualViewport || [], bl(r) ? r : []) : r, a = t.concat(i);
  return s ? a : a.concat(Zr(bs(i)));
}
function Ic(e) {
  return Object.assign({}, e, { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height });
}
function I3(e) {
  var t = Sr(e);
  return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, t.x = t.left, t.y = t.top, t;
}
function Zu(e, t) {
  return t === Sh ? Ic($3(e)) : Cr(t) ? I3(t) : Ic(M3(jn(e)));
}
function T3(e) {
  var t = Zr(bs(e)), n = ["absolute", "fixed"].indexOf(kn(e).position) >= 0, r = n && Pt(e) ? ho(e) : e;
  return Cr(r) ? t.filter(function(s) {
    return Cr(s) && Ah(s, r) && dn(s) !== "body";
  }) : [];
}
function L3(e, t, n) {
  var r = t === "clippingParents" ? T3(e) : [].concat(t), s = [].concat(r, [n]), o = s[0], i = s.reduce(function(a, c) {
    var u = Zu(e, c);
    return a.top = tr(u.top, a.top), a.right = Xo(u.right, a.right), a.bottom = Xo(u.bottom, a.bottom), a.left = tr(u.left, a.left), a;
  }, Zu(e, o));
  return i.width = i.right - i.left, i.height = i.bottom - i.top, i.x = i.left, i.y = i.top, i;
}
function Rh(e) {
  var t = e.reference, n = e.element, r = e.placement, s = r ? un(r) : null, o = r ? Er(r) : null, i = t.x + t.width / 2 - n.width / 2, a = t.y + t.height / 2 - n.height / 2, c;
  switch (s) {
    case yt:
      c = { x: i, y: t.y - n.height };
      break;
    case zt:
      c = { x: i, y: t.y + t.height };
      break;
    case Dt:
      c = { x: t.x + t.width, y: a };
      break;
    case wt:
      c = { x: t.x - n.width, y: a };
      break;
    default:
      c = { x: t.x, y: t.y };
  }
  var u = s ? ml(s) : null;
  if (u != null) {
    var d = u === "y" ? "height" : "width";
    switch (o) {
      case kr:
        c[u] = c[u] - (t[d] / 2 - n[d] / 2);
        break;
      case no:
        c[u] = c[u] + (t[d] / 2 - n[d] / 2);
        break;
    }
  }
  return c;
}
function ro(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, s = r === void 0 ? e.placement : r, o = n.boundary, i = o === void 0 ? t3 : o, a = n.rootBoundary, c = a === void 0 ? Sh : a, u = n.elementContext, d = u === void 0 ? Nr : u, l = n.altBoundary, m = l === void 0 ? !1 : l, f = n.padding, v = f === void 0 ? 0 : f, g = Mh(typeof v != "number" ? v : Ih(v, po)), y = d === Nr ? n3 : Nr, h = e.rects.popper, w = e.elements[m ? y : d], k = L3(Cr(w) ? w : w.contextElement || jn(e.elements.popper), i, c), C = Sr(e.elements.reference), A = Rh({ reference: C, element: h, placement: s }), E = Ic(Object.assign({}, h, A)), $ = d === Nr ? E : C, M = { top: k.top - $.top + g.top, bottom: $.bottom - k.bottom + g.bottom, left: k.left - $.left + g.left, right: $.right - k.right + g.right }, O = e.modifiersData.offset;
  if (d === Nr && O) {
    var R = O[s];
    Object.keys(M).forEach(function(B) {
      var V = [Dt, zt].indexOf(B) >= 0 ? 1 : -1, re = [yt, zt].indexOf(B) >= 0 ? "y" : "x";
      M[B] += R[re] * V;
    });
  }
  return M;
}
function O3(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, s = n.boundary, o = n.rootBoundary, i = n.padding, a = n.flipVariations, c = n.allowedAutoPlacements, u = c === void 0 ? _s : c, d = Er(r), l = d ? a ? ju : ju.filter(function(v) {
    return Er(v) === d;
  }) : po, m = l.filter(function(v) {
    return u.indexOf(v) >= 0;
  });
  m.length === 0 && (m = l);
  var f = m.reduce(function(v, g) {
    return v[g] = ro(e, { placement: g, boundary: s, rootBoundary: o, padding: i })[un(g)], v;
  }, {});
  return Object.keys(f).sort(function(v, g) {
    return f[v] - f[g];
  });
}
function R3(e) {
  if (un(e) === pl) return [];
  var t = zo(e);
  return [Uu(e), t, Uu(t)];
}
function P3(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var s = n.mainAxis, o = s === void 0 ? !0 : s, i = n.altAxis, a = i === void 0 ? !0 : i, c = n.fallbackPlacements, u = n.padding, d = n.boundary, l = n.rootBoundary, m = n.altBoundary, f = n.flipVariations, v = f === void 0 ? !0 : f, g = n.allowedAutoPlacements, y = t.options.placement, h = un(y), w = h === y, k = c || (w || !v ? [zo(y)] : R3(y)), C = [y].concat(k).reduce(function(Oe, ze) {
      return Oe.concat(un(ze) === pl ? O3(t, { placement: ze, boundary: d, rootBoundary: l, padding: u, flipVariations: v, allowedAutoPlacements: g }) : ze);
    }, []), A = t.rects.reference, E = t.rects.popper, $ = /* @__PURE__ */ new Map(), M = !0, O = C[0], R = 0; R < C.length; R++) {
      var B = C[R], V = un(B), re = Er(B) === kr, P = [yt, zt].indexOf(V) >= 0, U = P ? "width" : "height", z = ro(t, { placement: B, boundary: d, rootBoundary: l, altBoundary: m, padding: u }), N = P ? re ? Dt : wt : re ? zt : yt;
      A[U] > E[U] && (N = zo(N));
      var F = zo(N), Z = [];
      if (o && Z.push(z[V] <= 0), a && Z.push(z[N] <= 0, z[F] <= 0), Z.every(function(Oe) {
        return Oe;
      })) {
        O = B, M = !1;
        break;
      }
      $.set(B, Z);
    }
    if (M) for (var W = v ? 3 : 1, pe = function(Oe) {
      var ze = C.find(function(Qe) {
        var ft = $.get(Qe);
        if (ft) return ft.slice(0, Oe).every(function(Ve) {
          return Ve;
        });
      });
      if (ze) return O = ze, "break";
    }, le = W; le > 0; le--) {
      var Ee = pe(le);
      if (Ee === "break") break;
    }
    t.placement !== O && (t.modifiersData[r]._skip = !0, t.placement = O, t.reset = !0);
  }
}
var B3 = { name: "flip", enabled: !0, phase: "main", fn: P3, requiresIfExists: ["offset"], data: { _skip: !1 } };
function Wu(e, t, n) {
  return n === void 0 && (n = { x: 0, y: 0 }), { top: e.top - t.height - n.y, right: e.right - t.width + n.x, bottom: e.bottom - t.height + n.y, left: e.left - t.width - n.x };
}
function Gu(e) {
  return [yt, Dt, zt, wt].some(function(t) {
    return e[t] >= 0;
  });
}
function z3(e) {
  var t = e.state, n = e.name, r = t.rects.reference, s = t.rects.popper, o = t.modifiersData.preventOverflow, i = ro(t, { elementContext: "reference" }), a = ro(t, { altBoundary: !0 }), c = Wu(i, r), u = Wu(a, s, o), d = Gu(c), l = Gu(u);
  t.modifiersData[n] = { referenceClippingOffsets: c, popperEscapeOffsets: u, isReferenceHidden: d, hasPopperEscaped: l }, t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-reference-hidden": d, "data-popper-escaped": l });
}
var D3 = { name: "hide", enabled: !0, phase: "main", requiresIfExists: ["preventOverflow"], fn: z3 };
function N3(e, t, n) {
  var r = un(e), s = [wt, yt].indexOf(r) >= 0 ? -1 : 1, o = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n, i = o[0], a = o[1];
  return i = i || 0, a = (a || 0) * s, [wt, Dt].indexOf(r) >= 0 ? { x: a, y: i } : { x: i, y: a };
}
function q3(e) {
  var t = e.state, n = e.options, r = e.name, s = n.offset, o = s === void 0 ? [0, 0] : s, i = _s.reduce(function(d, l) {
    return d[l] = N3(l, t.rects, o), d;
  }, {}), a = i[t.placement], c = a.x, u = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = i;
}
var F3 = { name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: q3 };
function j3(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = Rh({ reference: t.rects.reference, element: t.rects.popper, placement: t.placement });
}
var Ph = { name: "popperOffsets", enabled: !0, phase: "read", fn: j3, data: {} };
function H3(e) {
  return e === "x" ? "y" : "x";
}
function V3(e) {
  var t = e.state, n = e.options, r = e.name, s = n.mainAxis, o = s === void 0 ? !0 : s, i = n.altAxis, a = i === void 0 ? !1 : i, c = n.boundary, u = n.rootBoundary, d = n.altBoundary, l = n.padding, m = n.tether, f = m === void 0 ? !0 : m, v = n.tetherOffset, g = v === void 0 ? 0 : v, y = ro(t, { boundary: c, rootBoundary: u, padding: l, altBoundary: d }), h = un(t.placement), w = Er(t.placement), k = !w, C = ml(h), A = H3(C), E = t.modifiersData.popperOffsets, $ = t.rects.reference, M = t.rects.popper, O = typeof g == "function" ? g(Object.assign({}, t.rects, { placement: t.placement })) : g, R = typeof O == "number" ? { mainAxis: O, altAxis: O } : Object.assign({ mainAxis: 0, altAxis: 0 }, O), B = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, V = { x: 0, y: 0 };
  if (E) {
    if (o) {
      var re, P = C === "y" ? yt : wt, U = C === "y" ? zt : Dt, z = C === "y" ? "height" : "width", N = E[C], F = N + y[P], Z = N - y[U], W = f ? -M[z] / 2 : 0, pe = w === kr ? $[z] : M[z], le = w === kr ? -M[z] : -$[z], Ee = t.elements.arrow, Oe = f && Ee ? gl(Ee) : { width: 0, height: 0 }, ze = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : $h(), Qe = ze[P], ft = ze[U], Ve = Ur(0, $[z], Oe[z]), nn = k ? $[z] / 2 - W - Ve - Qe - R.mainAxis : pe - Ve - Qe - R.mainAxis, oe = k ? -$[z] / 2 + W + Ve + ft + R.mainAxis : le + Ve + ft + R.mainAxis, _e = t.elements.arrow && ho(t.elements.arrow), He = _e ? C === "y" ? _e.clientTop || 0 : _e.clientLeft || 0 : 0, et = (re = B == null ? void 0 : B[C]) != null ? re : 0, gt = N + nn - et - He, jt = N + oe - et, Ct = Ur(f ? Xo(F, gt) : F, N, f ? tr(Z, jt) : Z);
      E[C] = Ct, V[C] = Ct - N;
    }
    if (a) {
      var rn, xt = C === "x" ? yt : wt, Ht = C === "x" ? zt : Dt, st = E[A], Tt = A === "y" ? "height" : "width", St = st + y[xt], Vt = st - y[Ht], Xe = [yt, wt].indexOf(h) !== -1, G = (rn = B == null ? void 0 : B[A]) != null ? rn : 0, de = Xe ? St : st - $[Tt] - M[Tt] - G + R.altAxis, Te = Xe ? st + $[Tt] + M[Tt] - G - R.altAxis : Vt, Ue = f && Xe ? v3(de, st, Te) : Ur(f ? de : St, st, f ? Te : Vt);
      E[A] = Ue, V[A] = Ue - st;
    }
    t.modifiersData[r] = V;
  }
}
var U3 = { name: "preventOverflow", enabled: !0, phase: "main", fn: V3, requiresIfExists: ["offset"] };
function Z3(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function W3(e) {
  return e === tn(e) || !Pt(e) ? vl(e) : Z3(e);
}
function G3(e) {
  var t = e.getBoundingClientRect(), n = xr(t.width) / e.offsetWidth || 1, r = xr(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function K3(e, t, n) {
  n === void 0 && (n = !1);
  var r = Pt(t), s = Pt(t) && G3(t), o = jn(t), i = Sr(e, s), a = { scrollLeft: 0, scrollTop: 0 }, c = { x: 0, y: 0 };
  return (r || !r && !n) && ((dn(t) !== "body" || bl(o)) && (a = W3(t)), Pt(t) ? (c = Sr(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : o && (c.x = _l(o))), { x: i.left + a.scrollLeft - c.x, y: i.top + a.scrollTop - c.y, width: i.width, height: i.height };
}
function X3(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(o) {
    t.set(o.name, o);
  });
  function s(o) {
    n.add(o.name);
    var i = [].concat(o.requires || [], o.requiresIfExists || []);
    i.forEach(function(a) {
      if (!n.has(a)) {
        var c = t.get(a);
        c && s(c);
      }
    }), r.push(o);
  }
  return e.forEach(function(o) {
    n.has(o.name) || s(o);
  }), r;
}
function Y3(e) {
  var t = X3(e);
  return f3.reduce(function(n, r) {
    return n.concat(t.filter(function(s) {
      return s.phase === r;
    }));
  }, []);
}
function J3(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function Q3(e) {
  var t = e.reduce(function(n, r) {
    var s = n[r.name];
    return n[r.name] = s ? Object.assign({}, s, r, { options: Object.assign({}, s.options, r.options), data: Object.assign({}, s.data, r.data) }) : r, n;
  }, {});
  return Object.keys(t).map(function(n) {
    return t[n];
  });
}
var Ku = { placement: "bottom", modifiers: [], strategy: "absolute" };
function Xu() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function yl(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, s = t.defaultOptions, o = s === void 0 ? Ku : s;
  return function(i, a, c) {
    c === void 0 && (c = o);
    var u = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, Ku, o), modifiersData: {}, elements: { reference: i, popper: a }, attributes: {}, styles: {} }, d = [], l = !1, m = { state: u, setOptions: function(g) {
      var y = typeof g == "function" ? g(u.options) : g;
      v(), u.options = Object.assign({}, o, u.options, y), u.scrollParents = { reference: Cr(i) ? Zr(i) : i.contextElement ? Zr(i.contextElement) : [], popper: Zr(a) };
      var h = Y3(Q3([].concat(r, u.options.modifiers)));
      return u.orderedModifiers = h.filter(function(w) {
        return w.enabled;
      }), f(), m.update();
    }, forceUpdate: function() {
      if (!l) {
        var g = u.elements, y = g.reference, h = g.popper;
        if (Xu(y, h)) {
          u.rects = { reference: K3(y, ho(h), u.options.strategy === "fixed"), popper: gl(h) }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(M) {
            return u.modifiersData[M.name] = Object.assign({}, M.data);
          });
          for (var w = 0; w < u.orderedModifiers.length; w++) {
            if (u.reset === !0) {
              u.reset = !1, w = -1;
              continue;
            }
            var k = u.orderedModifiers[w], C = k.fn, A = k.options, E = A === void 0 ? {} : A, $ = k.name;
            typeof C == "function" && (u = C({ state: u, options: E, name: $, instance: m }) || u);
          }
        }
      }
    }, update: J3(function() {
      return new Promise(function(g) {
        m.forceUpdate(), g(u);
      });
    }), destroy: function() {
      v(), l = !0;
    } };
    if (!Xu(i, a)) return m;
    m.setOptions(c).then(function(g) {
      !l && c.onFirstUpdate && c.onFirstUpdate(g);
    });
    function f() {
      u.orderedModifiers.forEach(function(g) {
        var y = g.name, h = g.options, w = h === void 0 ? {} : h, k = g.effect;
        if (typeof k == "function") {
          var C = k({ state: u, name: y, instance: m, options: w }), A = function() {
          };
          d.push(C || A);
        }
      });
    }
    function v() {
      d.forEach(function(g) {
        return g();
      }), d = [];
    }
    return m;
  };
}
yl();
var e5 = [Lh, Ph, Th, Eh];
yl({ defaultModifiers: e5 });
var t5 = [Lh, Ph, Th, Eh, F3, B3, U3, w3, D3], n5 = yl({ defaultModifiers: t5 });
const r5 = (e, t, n = {}) => {
  const r = {
    name: "updateState",
    enabled: !0,
    phase: "write",
    fn: ({ state: c }) => {
      const u = o5(c);
      Object.assign(i.value, u);
    },
    requires: ["computeStyles"]
  }, s = I(() => {
    const { onFirstUpdate: c, placement: u, strategy: d, modifiers: l } = _(n);
    return {
      onFirstUpdate: c,
      placement: u || "bottom",
      strategy: d || "absolute",
      modifiers: [
        ...l || [],
        r,
        { name: "applyStyles", enabled: !1 }
      ]
    };
  }), o = _n(), i = D({
    styles: {
      popper: {
        position: _(s).strategy,
        left: "0",
        top: "0"
      },
      arrow: {
        position: "absolute"
      }
    },
    attributes: {}
  }), a = () => {
    o.value && (o.value.destroy(), o.value = void 0);
  };
  return ae(s, (c) => {
    const u = _(o);
    u && u.setOptions(c);
  }, {
    deep: !0
  }), ae([e, t], ([c, u]) => {
    a(), !(!c || !u) && (o.value = n5(c, u, _(s)));
  }), Nt(() => {
    a();
  }), {
    state: I(() => {
      var c;
      return { ...((c = _(o)) == null ? void 0 : c.state) || {} };
    }),
    styles: I(() => _(i).styles),
    attributes: I(() => _(i).attributes),
    update: () => {
      var c;
      return (c = _(o)) == null ? void 0 : c.update();
    },
    forceUpdate: () => {
      var c;
      return (c = _(o)) == null ? void 0 : c.forceUpdate();
    },
    instanceRef: I(() => _(o))
  };
};
function o5(e) {
  const t = Object.keys(e.elements), n = Ko(t.map((s) => [s, e.styles[s] || {}])), r = Ko(t.map((s) => [s, e.attributes[s]]));
  return {
    styles: n,
    attributes: r
  };
}
const s5 = (e, t = 0) => {
  if (t === 0)
    return e;
  const n = D(!1);
  let r = 0;
  const s = () => {
    r && clearTimeout(r), r = window.setTimeout(() => {
      n.value = e.value;
    }, t);
  };
  return Be(s), ae(() => e.value, (o) => {
    o ? s() : n.value = o;
  }), n;
};
function Yu() {
  let e;
  const t = (r, s) => {
    n(), e = window.setTimeout(r, s);
  }, n = () => window.clearTimeout(e);
  return nl(() => n()), {
    registerTimeout: t,
    cancelTimeout: n
  };
}
const Ju = {
  prefix: Math.floor(Math.random() * 1e4),
  current: 0
}, i5 = Symbol("elIdInjection"), Bh = () => ot() ? $e(i5, Ju) : Ju, ys = (e) => {
  const t = Bh(), n = fl();
  return I(() => _(e) || `${n.value}-id-${t.prefix}-${t.current++}`);
};
let pr = [];
const Qu = (e) => {
  const t = e;
  t.key === yn.esc && pr.forEach((n) => n(t));
}, a5 = (e) => {
  Be(() => {
    pr.length === 0 && document.addEventListener("keydown", Qu), ut && pr.push(e);
  }), Nt(() => {
    pr = pr.filter((t) => t !== e), pr.length === 0 && ut && document.removeEventListener("keydown", Qu);
  });
};
let ed;
const zh = () => {
  const e = fl(), t = Bh(), n = I(() => `${e.value}-popper-container-${t.prefix}`), r = I(() => `#${n.value}`);
  return {
    id: n,
    selector: r
  };
}, c5 = (e) => {
  const t = document.createElement("div");
  return t.id = e, document.body.appendChild(t), t;
}, l5 = () => {
  const { id: e, selector: t } = zh();
  return Pv(() => {
    ut && !ed && !document.body.querySelector(t.value) && (ed = c5(e.value));
  }), {
    id: e,
    selector: t
  };
}, u5 = Me({
  showAfter: {
    type: Number,
    default: 0
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  autoClose: {
    type: Number,
    default: 0
  }
}), d5 = ({
  showAfter: e,
  hideAfter: t,
  autoClose: n,
  open: r,
  close: s
}) => {
  const { registerTimeout: o } = Yu(), {
    registerTimeout: i,
    cancelTimeout: a
  } = Yu();
  return {
    onOpen: (d) => {
      o(() => {
        r(d);
        const l = _(n);
        Ze(l) && l > 0 && i(() => {
          s(d);
        }, l);
      }, _(e));
    },
    onClose: (d) => {
      a(), o(() => {
        s(d);
      }, _(t));
    }
  };
}, Dh = Symbol("elForwardRef"), f5 = (e) => {
  kt(Dh, {
    setForwardRef: (n) => {
      e.value = n;
    }
  });
}, p5 = (e) => ({
  mounted(t) {
    e(t);
  },
  updated(t) {
    e(t);
  },
  unmounted() {
    e(null);
  }
}), td = D(0), h5 = 2e3, g5 = Symbol("zIndexContextKey"), m5 = (e) => {
  const t = ot() ? $e(g5, void 0) : void 0, n = I(() => {
    const o = _(t);
    return Ze(o) ? o : h5;
  }), r = I(() => n.value + td.value);
  return {
    initialZIndex: n,
    currentZIndex: r,
    nextZIndex: () => (td.value++, r.value)
  };
};
function v5(e) {
  const t = D();
  function n() {
    if (e.value == null)
      return;
    const { selectionStart: s, selectionEnd: o, value: i } = e.value;
    if (s == null || o == null)
      return;
    const a = i.slice(0, Math.max(0, s)), c = i.slice(Math.max(0, o));
    t.value = {
      selectionStart: s,
      selectionEnd: o,
      value: i,
      beforeTxt: a,
      afterTxt: c
    };
  }
  function r() {
    if (e.value == null || t.value == null)
      return;
    const { value: s } = e.value, { beforeTxt: o, afterTxt: i, selectionStart: a } = t.value;
    if (o == null || i == null || a == null)
      return;
    let c = s.length;
    if (s.endsWith(i))
      c = s.length - i.length;
    else if (s.startsWith(o))
      c = o.length;
    else {
      const u = o[a - 1], d = s.indexOf(u, a - 1);
      d !== -1 && (c = d + 1);
    }
    e.value.setSelectionRange(c, c);
  }
  return [n, r];
}
const wl = ms({
  type: String,
  values: fo,
  required: !1
}), _5 = Symbol("size"), b5 = () => {
  const e = $e(_5, {});
  return I(() => _(e.size) || "");
};
function Nh(e, { afterFocus: t, beforeBlur: n, afterBlur: r } = {}) {
  const s = ot(), { emit: o } = s, i = _n(), a = D(!1), c = (l) => {
    a.value || (a.value = !0, o("focus", l), t == null || t());
  }, u = (l) => {
    var m;
    Ot(n) && n(l) || l.relatedTarget && ((m = i.value) != null && m.contains(l.relatedTarget)) || (a.value = !1, o("blur", l), r == null || r());
  }, d = () => {
    var l;
    (l = e.value) == null || l.focus();
  };
  return ae(i, (l) => {
    l && l.setAttribute("tabindex", "-1");
  }), Qn(i, "click", d), {
    wrapperRef: i,
    isFocused: a,
    handleFocus: c,
    handleBlur: u
  };
}
const y5 = Symbol(), nd = D();
function w5(e, t = void 0) {
  const n = ot() ? $e(y5, nd) : nd;
  return I(() => {
    var r, s;
    return (s = (r = n.value) == null ? void 0 : r[e]) != null ? s : t;
  });
}
var ye = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, s] of t)
    n[r] = s;
  return n;
};
const k5 = Me({
  size: {
    type: ge([Number, String])
  },
  color: {
    type: String
  }
}), C5 = H({
  name: "ElIcon",
  inheritAttrs: !1
}), x5 = /* @__PURE__ */ H({
  ...C5,
  props: k5,
  setup(e) {
    const t = e, n = Se("icon"), r = I(() => {
      const { size: s, color: o } = t;
      return !s && !o ? {} : {
        fontSize: vh(s) ? void 0 : wr(s),
        "--color": o
      };
    });
    return (s, o) => (b(), x("i", je({
      class: _(n).b(),
      style: _(r)
    }, s.$attrs), [
      ne(s.$slots, "default")
    ], 16));
  }
});
var S5 = /* @__PURE__ */ ye(x5, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/icon/src/icon.vue"]]);
const bt = Ft(S5), kl = Symbol("formContextKey"), Yo = Symbol("formItemContextKey"), go = (e, t = {}) => {
  const n = D(void 0), r = t.prop ? n : xh("size"), s = t.global ? n : b5(), o = t.form ? { size: void 0 } : $e(kl, void 0), i = t.formItem ? { size: void 0 } : $e(Yo, void 0);
  return I(() => r.value || _(e) || (i == null ? void 0 : i.size) || (o == null ? void 0 : o.size) || s.value || "");
}, ws = (e) => {
  const t = xh("disabled"), n = $e(kl, void 0);
  return I(() => t.value || _(e) || (n == null ? void 0 : n.disabled) || !1);
}, ks = () => {
  const e = $e(kl, void 0), t = $e(Yo, void 0);
  return {
    form: e,
    formItem: t
  };
}, qh = (e, {
  formItemContext: t,
  disableIdGeneration: n,
  disableIdManagement: r
}) => {
  n || (n = D(!1)), r || (r = D(!1));
  const s = D();
  let o;
  const i = I(() => {
    var a;
    return !!(!e.label && t && t.inputIds && ((a = t.inputIds) == null ? void 0 : a.length) <= 1);
  });
  return Be(() => {
    o = ae([Rt(e, "id"), n], ([a, c]) => {
      const u = a ?? (c ? void 0 : ys().value);
      u !== s.value && (t != null && t.removeInputId && (s.value && t.removeInputId(s.value), !(r != null && r.value) && !c && u && t.addInputId(u)), s.value = u);
    }, { immediate: !0 });
  }), Pp(() => {
    o && o(), t != null && t.removeInputId && s.value && t.removeInputId(s.value);
  }), {
    isLabeledByFormItem: i,
    inputId: s
  };
};
let Wt;
const E5 = `
  height:0 !important;
  visibility:hidden !important;
  ${Pb() ? "" : "overflow:hidden !important;"}
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`, A5 = [
  "letter-spacing",
  "line-height",
  "padding-top",
  "padding-bottom",
  "font-family",
  "font-weight",
  "font-size",
  "text-rendering",
  "text-transform",
  "width",
  "text-indent",
  "padding-left",
  "padding-right",
  "border-width",
  "box-sizing"
];
function $5(e) {
  const t = window.getComputedStyle(e), n = t.getPropertyValue("box-sizing"), r = Number.parseFloat(t.getPropertyValue("padding-bottom")) + Number.parseFloat(t.getPropertyValue("padding-top")), s = Number.parseFloat(t.getPropertyValue("border-bottom-width")) + Number.parseFloat(t.getPropertyValue("border-top-width"));
  return { contextStyle: A5.map((i) => `${i}:${t.getPropertyValue(i)}`).join(";"), paddingSize: r, borderSize: s, boxSizing: n };
}
function rd(e, t = 1, n) {
  var r;
  Wt || (Wt = document.createElement("textarea"), document.body.appendChild(Wt));
  const { paddingSize: s, borderSize: o, boxSizing: i, contextStyle: a } = $5(e);
  Wt.setAttribute("style", `${a};${E5}`), Wt.value = e.value || e.placeholder || "";
  let c = Wt.scrollHeight;
  const u = {};
  i === "border-box" ? c = c + o : i === "content-box" && (c = c - s), Wt.value = "";
  const d = Wt.scrollHeight - s;
  if (Ze(t)) {
    let l = d * t;
    i === "border-box" && (l = l + s + o), c = Math.max(l, c), u.minHeight = `${l}px`;
  }
  if (Ze(n)) {
    let l = d * n;
    i === "border-box" && (l = l + s + o), c = Math.min(l, c);
  }
  return u.height = `${c}px`, (r = Wt.parentNode) == null || r.removeChild(Wt), Wt = void 0, u;
}
const M5 = Me({
  id: {
    type: String,
    default: void 0
  },
  size: wl,
  disabled: Boolean,
  modelValue: {
    type: ge([
      String,
      Number,
      Object
    ]),
    default: ""
  },
  type: {
    type: String,
    default: "text"
  },
  resize: {
    type: String,
    values: ["none", "both", "horizontal", "vertical"]
  },
  autosize: {
    type: ge([Boolean, Object]),
    default: !1
  },
  autocomplete: {
    type: String,
    default: "off"
  },
  formatter: {
    type: Function
  },
  parser: {
    type: Function
  },
  placeholder: {
    type: String
  },
  form: {
    type: String
  },
  readonly: {
    type: Boolean,
    default: !1
  },
  clearable: {
    type: Boolean,
    default: !1
  },
  showPassword: {
    type: Boolean,
    default: !1
  },
  showWordLimit: {
    type: Boolean,
    default: !1
  },
  suffixIcon: {
    type: Qt
  },
  prefixIcon: {
    type: Qt
  },
  containerRole: {
    type: String,
    default: void 0
  },
  label: {
    type: String,
    default: void 0
  },
  tabindex: {
    type: [String, Number],
    default: 0
  },
  validateEvent: {
    type: Boolean,
    default: !0
  },
  inputStyle: {
    type: ge([Object, Array, String]),
    default: () => dl({})
  },
  autofocus: {
    type: Boolean,
    default: !1
  }
}), I5 = {
  [_t]: (e) => Xt(e),
  input: (e) => Xt(e),
  change: (e) => Xt(e),
  focus: (e) => e instanceof FocusEvent,
  blur: (e) => e instanceof FocusEvent,
  clear: () => !0,
  mouseleave: (e) => e instanceof MouseEvent,
  mouseenter: (e) => e instanceof MouseEvent,
  keydown: (e) => e instanceof Event,
  compositionstart: (e) => e instanceof CompositionEvent,
  compositionupdate: (e) => e instanceof CompositionEvent,
  compositionend: (e) => e instanceof CompositionEvent
}, T5 = ["role"], L5 = ["id", "type", "disabled", "formatter", "parser", "readonly", "autocomplete", "tabindex", "aria-label", "placeholder", "form", "autofocus"], O5 = ["id", "tabindex", "disabled", "readonly", "autocomplete", "aria-label", "placeholder", "form", "autofocus"], R5 = H({
  name: "ElInput",
  inheritAttrs: !1
}), P5 = /* @__PURE__ */ H({
  ...R5,
  props: M5,
  emits: I5,
  setup(e, { expose: t, emit: n }) {
    const r = e, s = lo(), o = zp(), i = I(() => {
      const G = {};
      return r.containerRole === "combobox" && (G["aria-haspopup"] = s["aria-haspopup"], G["aria-owns"] = s["aria-owns"], G["aria-expanded"] = s["aria-expanded"]), G;
    }), a = I(() => [
      r.type === "textarea" ? y.b() : g.b(),
      g.m(f.value),
      g.is("disabled", v.value),
      g.is("exceed", Oe.value),
      {
        [g.b("group")]: o.prepend || o.append,
        [g.bm("group", "append")]: o.append,
        [g.bm("group", "prepend")]: o.prepend,
        [g.m("prefix")]: o.prefix || r.prefixIcon,
        [g.m("suffix")]: o.suffix || r.suffixIcon || r.clearable || r.showPassword,
        [g.bm("suffix", "password-clear")]: W.value && pe.value
      },
      s.class
    ]), c = I(() => [
      g.e("wrapper"),
      g.is("focus", R.value)
    ]), u = V4({
      excludeKeys: I(() => Object.keys(i.value))
    }), { form: d, formItem: l } = ks(), { inputId: m } = qh(r, {
      formItemContext: l
    }), f = go(), v = ws(), g = Se("input"), y = Se("textarea"), h = _n(), w = _n(), k = D(!1), C = D(!1), A = D(!1), E = D(), $ = _n(r.inputStyle), M = I(() => h.value || w.value), { wrapperRef: O, isFocused: R, handleFocus: B, handleBlur: V } = Nh(M, {
      afterBlur() {
        var G;
        r.validateEvent && ((G = l == null ? void 0 : l.validate) == null || G.call(l, "blur").catch((de) => void 0));
      }
    }), re = I(() => {
      var G;
      return (G = d == null ? void 0 : d.statusIcon) != null ? G : !1;
    }), P = I(() => (l == null ? void 0 : l.validateState) || ""), U = I(() => P.value && wh[P.value]), z = I(() => A.value ? B4 : I4), N = I(() => [
      s.style,
      r.inputStyle
    ]), F = I(() => [
      r.inputStyle,
      $.value,
      { resize: r.resize }
    ]), Z = I(() => er(r.modelValue) ? "" : String(r.modelValue)), W = I(() => r.clearable && !v.value && !r.readonly && !!Z.value && (R.value || k.value)), pe = I(() => r.showPassword && !v.value && !r.readonly && !!Z.value && (!!Z.value || R.value)), le = I(() => r.showWordLimit && !!u.value.maxlength && (r.type === "text" || r.type === "textarea") && !v.value && !r.readonly && !r.showPassword), Ee = I(() => Z.value.length), Oe = I(() => !!le.value && Ee.value > Number(u.value.maxlength)), ze = I(() => !!o.suffix || !!r.suffixIcon || W.value || r.showPassword || le.value || !!P.value && re.value), [Qe, ft] = v5(h);
    us(w, (G) => {
      if (oe(), !le.value || r.resize !== "both")
        return;
      const de = G[0], { width: Te } = de.contentRect;
      E.value = {
        right: `calc(100% - ${Te + 15 + 6}px)`
      };
    });
    const Ve = () => {
      const { type: G, autosize: de } = r;
      if (!(!ut || G !== "textarea" || !w.value))
        if (de) {
          const Te = Yt(de) ? de.minRows : void 0, Ue = Yt(de) ? de.maxRows : void 0, Ut = rd(w.value, Te, Ue);
          $.value = {
            overflowY: "hidden",
            ...Ut
          }, Ae(() => {
            w.value.offsetHeight, $.value = Ut;
          });
        } else
          $.value = {
            minHeight: rd(w.value).minHeight
          };
    }, oe = ((G) => {
      let de = !1;
      return () => {
        var Te;
        if (de || !r.autosize)
          return;
        ((Te = w.value) == null ? void 0 : Te.offsetParent) === null || (G(), de = !0);
      };
    })(Ve), _e = () => {
      const G = M.value, de = r.formatter ? r.formatter(Z.value) : Z.value;
      !G || G.value === de || (G.value = de);
    }, He = async (G) => {
      Qe();
      let { value: de } = G.target;
      if (r.formatter && (de = r.parser ? r.parser(de) : de), !C.value) {
        if (de === Z.value) {
          _e();
          return;
        }
        n(_t, de), n("input", de), await Ae(), _e(), ft();
      }
    }, et = (G) => {
      n("change", G.target.value);
    }, gt = (G) => {
      n("compositionstart", G), C.value = !0;
    }, jt = (G) => {
      var de;
      n("compositionupdate", G);
      const Te = (de = G.target) == null ? void 0 : de.value, Ue = Te[Te.length - 1] || "";
      C.value = !kh(Ue);
    }, Ct = (G) => {
      n("compositionend", G), C.value && (C.value = !1, He(G));
    }, rn = () => {
      A.value = !A.value, xt();
    }, xt = async () => {
      var G;
      await Ae(), (G = M.value) == null || G.focus();
    }, Ht = () => {
      var G;
      return (G = M.value) == null ? void 0 : G.blur();
    }, st = (G) => {
      k.value = !1, n("mouseleave", G);
    }, Tt = (G) => {
      k.value = !0, n("mouseenter", G);
    }, St = (G) => {
      n("keydown", G);
    }, Vt = () => {
      var G;
      (G = M.value) == null || G.select();
    }, Xe = () => {
      n(_t, ""), n("change", ""), n("clear"), n("input", "");
    };
    return ae(() => r.modelValue, () => {
      var G;
      Ae(() => Ve()), r.validateEvent && ((G = l == null ? void 0 : l.validate) == null || G.call(l, "change").catch((de) => void 0));
    }), ae(Z, () => _e()), ae(() => r.type, async () => {
      await Ae(), _e(), Ve();
    }), Be(() => {
      !r.formatter && r.parser, _e(), Ae(Ve);
    }), t({
      input: h,
      textarea: w,
      ref: M,
      textareaStyle: F,
      autosize: Rt(r, "autosize"),
      focus: xt,
      blur: Ht,
      select: Vt,
      clear: Xe,
      resizeTextarea: Ve
    }), (G, de) => Ye((b(), x("div", je(_(i), {
      class: _(a),
      style: _(N),
      role: G.containerRole,
      onMouseenter: Tt,
      onMouseleave: st
    }), [
      Q(" input "),
      G.type !== "textarea" ? (b(), x(Pe, { key: 0 }, [
        Q(" prepend slot "),
        G.$slots.prepend ? (b(), x("div", {
          key: 0,
          class: j(_(g).be("group", "prepend"))
        }, [
          ne(G.$slots, "prepend")
        ], 2)) : Q("v-if", !0),
        p("div", {
          ref_key: "wrapperRef",
          ref: O,
          class: j(_(c))
        }, [
          Q(" prefix slot "),
          G.$slots.prefix || G.prefixIcon ? (b(), x("span", {
            key: 0,
            class: j(_(g).e("prefix"))
          }, [
            p("span", {
              class: j(_(g).e("prefix-inner"))
            }, [
              ne(G.$slots, "prefix"),
              G.prefixIcon ? (b(), X(_(bt), {
                key: 0,
                class: j(_(g).e("icon"))
              }, {
                default: Y(() => [
                  (b(), X(lt(G.prefixIcon)))
                ]),
                _: 1
              }, 8, ["class"])) : Q("v-if", !0)
            ], 2)
          ], 2)) : Q("v-if", !0),
          p("input", je({
            id: _(m),
            ref_key: "input",
            ref: h,
            class: _(g).e("inner")
          }, _(u), {
            type: G.showPassword ? A.value ? "text" : "password" : G.type,
            disabled: _(v),
            formatter: G.formatter,
            parser: G.parser,
            readonly: G.readonly,
            autocomplete: G.autocomplete,
            tabindex: G.tabindex,
            "aria-label": G.label,
            placeholder: G.placeholder,
            style: G.inputStyle,
            form: r.form,
            autofocus: r.autofocus,
            onCompositionstart: gt,
            onCompositionupdate: jt,
            onCompositionend: Ct,
            onInput: He,
            onFocus: de[0] || (de[0] = (...Te) => _(B) && _(B)(...Te)),
            onBlur: de[1] || (de[1] = (...Te) => _(V) && _(V)(...Te)),
            onChange: et,
            onKeydown: St
          }), null, 16, L5),
          Q(" suffix slot "),
          _(ze) ? (b(), x("span", {
            key: 1,
            class: j(_(g).e("suffix"))
          }, [
            p("span", {
              class: j(_(g).e("suffix-inner"))
            }, [
              !_(W) || !_(pe) || !_(le) ? (b(), x(Pe, { key: 0 }, [
                ne(G.$slots, "suffix"),
                G.suffixIcon ? (b(), X(_(bt), {
                  key: 0,
                  class: j(_(g).e("icon"))
                }, {
                  default: Y(() => [
                    (b(), X(lt(G.suffixIcon)))
                  ]),
                  _: 1
                }, 8, ["class"])) : Q("v-if", !0)
              ], 64)) : Q("v-if", !0),
              _(W) ? (b(), X(_(bt), {
                key: 1,
                class: j([_(g).e("icon"), _(g).e("clear")]),
                onMousedown: Ke(_(Jr), ["prevent"]),
                onClick: Xe
              }, {
                default: Y(() => [
                  ue(_(ll))
                ]),
                _: 1
              }, 8, ["class", "onMousedown"])) : Q("v-if", !0),
              _(pe) ? (b(), X(_(bt), {
                key: 2,
                class: j([_(g).e("icon"), _(g).e("password")]),
                onClick: rn
              }, {
                default: Y(() => [
                  (b(), X(lt(_(z))))
                ]),
                _: 1
              }, 8, ["class"])) : Q("v-if", !0),
              _(le) ? (b(), x("span", {
                key: 3,
                class: j(_(g).e("count"))
              }, [
                p("span", {
                  class: j(_(g).e("count-inner"))
                }, ve(_(Ee)) + " / " + ve(_(u).maxlength), 3)
              ], 2)) : Q("v-if", !0),
              _(P) && _(U) && _(re) ? (b(), X(_(bt), {
                key: 4,
                class: j([
                  _(g).e("icon"),
                  _(g).e("validateIcon"),
                  _(g).is("loading", _(P) === "validating")
                ])
              }, {
                default: Y(() => [
                  (b(), X(lt(_(U))))
                ]),
                _: 1
              }, 8, ["class"])) : Q("v-if", !0)
            ], 2)
          ], 2)) : Q("v-if", !0)
        ], 2),
        Q(" append slot "),
        G.$slots.append ? (b(), x("div", {
          key: 1,
          class: j(_(g).be("group", "append"))
        }, [
          ne(G.$slots, "append")
        ], 2)) : Q("v-if", !0)
      ], 64)) : (b(), x(Pe, { key: 1 }, [
        Q(" textarea "),
        p("textarea", je({
          id: _(m),
          ref_key: "textarea",
          ref: w,
          class: _(y).e("inner")
        }, _(u), {
          tabindex: G.tabindex,
          disabled: _(v),
          readonly: G.readonly,
          autocomplete: G.autocomplete,
          style: _(F),
          "aria-label": G.label,
          placeholder: G.placeholder,
          form: r.form,
          autofocus: r.autofocus,
          onCompositionstart: gt,
          onCompositionupdate: jt,
          onCompositionend: Ct,
          onInput: He,
          onFocus: de[2] || (de[2] = (...Te) => _(B) && _(B)(...Te)),
          onBlur: de[3] || (de[3] = (...Te) => _(V) && _(V)(...Te)),
          onChange: et,
          onKeydown: St
        }), null, 16, O5),
        _(le) ? (b(), x("span", {
          key: 0,
          style: qe(E.value),
          class: j(_(g).e("count"))
        }, ve(_(Ee)) + " / " + ve(_(u).maxlength), 7)) : Q("v-if", !0)
      ], 64))
    ], 16, T5)), [
      [Jt, G.type !== "hidden"]
    ]);
  }
});
var B5 = /* @__PURE__ */ ye(P5, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/input/src/input.vue"]]);
const Cs = Ft(B5), gr = 4, z5 = {
  vertical: {
    offset: "offsetHeight",
    scroll: "scrollTop",
    scrollSize: "scrollHeight",
    size: "height",
    key: "vertical",
    axis: "Y",
    client: "clientY",
    direction: "top"
  },
  horizontal: {
    offset: "offsetWidth",
    scroll: "scrollLeft",
    scrollSize: "scrollWidth",
    size: "width",
    key: "horizontal",
    axis: "X",
    client: "clientX",
    direction: "left"
  }
}, D5 = ({
  move: e,
  size: t,
  bar: n
}) => ({
  [n.size]: t,
  transform: `translate${n.axis}(${e}%)`
}), Fh = Symbol("scrollbarContextKey"), N5 = Me({
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: !0
  },
  always: Boolean
}), q5 = "Thumb", F5 = /* @__PURE__ */ H({
  __name: "thumb",
  props: N5,
  setup(e) {
    const t = e, n = $e(Fh), r = Se("scrollbar");
    n || h4(q5, "can not inject scrollbar context");
    const s = D(), o = D(), i = D({}), a = D(!1);
    let c = !1, u = !1, d = ut ? document.onselectstart : null;
    const l = I(() => z5[t.vertical ? "vertical" : "horizontal"]), m = I(() => D5({
      size: t.size,
      move: t.move,
      bar: l.value
    })), f = I(() => s.value[l.value.offset] ** 2 / n.wrapElement[l.value.scrollSize] / t.ratio / o.value[l.value.offset]), v = (E) => {
      var $;
      if (E.stopPropagation(), E.ctrlKey || [1, 2].includes(E.button))
        return;
      ($ = window.getSelection()) == null || $.removeAllRanges(), y(E);
      const M = E.currentTarget;
      M && (i.value[l.value.axis] = M[l.value.offset] - (E[l.value.client] - M.getBoundingClientRect()[l.value.direction]));
    }, g = (E) => {
      if (!o.value || !s.value || !n.wrapElement)
        return;
      const $ = Math.abs(E.target.getBoundingClientRect()[l.value.direction] - E[l.value.client]), M = o.value[l.value.offset] / 2, O = ($ - M) * 100 * f.value / s.value[l.value.offset];
      n.wrapElement[l.value.scroll] = O * n.wrapElement[l.value.scrollSize] / 100;
    }, y = (E) => {
      E.stopImmediatePropagation(), c = !0, document.addEventListener("mousemove", h), document.addEventListener("mouseup", w), d = document.onselectstart, document.onselectstart = () => !1;
    }, h = (E) => {
      if (!s.value || !o.value || c === !1)
        return;
      const $ = i.value[l.value.axis];
      if (!$)
        return;
      const M = (s.value.getBoundingClientRect()[l.value.direction] - E[l.value.client]) * -1, O = o.value[l.value.offset] - $, R = (M - O) * 100 * f.value / s.value[l.value.offset];
      n.wrapElement[l.value.scroll] = R * n.wrapElement[l.value.scrollSize] / 100;
    }, w = () => {
      c = !1, i.value[l.value.axis] = 0, document.removeEventListener("mousemove", h), document.removeEventListener("mouseup", w), A(), u && (a.value = !1);
    }, k = () => {
      u = !1, a.value = !!t.size;
    }, C = () => {
      u = !0, a.value = c;
    };
    Nt(() => {
      A(), document.removeEventListener("mouseup", w);
    });
    const A = () => {
      document.onselectstart !== d && (document.onselectstart = d);
    };
    return Qn(Rt(n, "scrollbarElement"), "mousemove", k), Qn(Rt(n, "scrollbarElement"), "mouseleave", C), (E, $) => (b(), X(nr, {
      name: _(r).b("fade"),
      persisted: ""
    }, {
      default: Y(() => [
        Ye(p("div", {
          ref_key: "instance",
          ref: s,
          class: j([_(r).e("bar"), _(r).is(_(l).key)]),
          onMousedown: g
        }, [
          p("div", {
            ref_key: "thumb",
            ref: o,
            class: j(_(r).e("thumb")),
            style: qe(_(m)),
            onMousedown: v
          }, null, 38)
        ], 34), [
          [Jt, E.always || a.value]
        ])
      ]),
      _: 1
    }, 8, ["name"]));
  }
});
var od = /* @__PURE__ */ ye(F5, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/thumb.vue"]]);
const j5 = Me({
  always: {
    type: Boolean,
    default: !0
  },
  width: String,
  height: String,
  ratioX: {
    type: Number,
    default: 1
  },
  ratioY: {
    type: Number,
    default: 1
  }
}), H5 = /* @__PURE__ */ H({
  __name: "bar",
  props: j5,
  setup(e, { expose: t }) {
    const n = e, r = D(0), s = D(0);
    return t({
      handleScroll: (i) => {
        if (i) {
          const a = i.offsetHeight - gr, c = i.offsetWidth - gr;
          s.value = i.scrollTop * 100 / a * n.ratioY, r.value = i.scrollLeft * 100 / c * n.ratioX;
        }
      }
    }), (i, a) => (b(), x(Pe, null, [
      ue(od, {
        move: r.value,
        ratio: i.ratioX,
        size: i.width,
        always: i.always
      }, null, 8, ["move", "ratio", "size", "always"]),
      ue(od, {
        move: s.value,
        ratio: i.ratioY,
        size: i.height,
        vertical: "",
        always: i.always
      }, null, 8, ["move", "ratio", "size", "always"])
    ], 64));
  }
});
var V5 = /* @__PURE__ */ ye(H5, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/bar.vue"]]);
const U5 = Me({
  height: {
    type: [String, Number],
    default: ""
  },
  maxHeight: {
    type: [String, Number],
    default: ""
  },
  native: {
    type: Boolean,
    default: !1
  },
  wrapStyle: {
    type: ge([String, Object, Array]),
    default: ""
  },
  wrapClass: {
    type: [String, Array],
    default: ""
  },
  viewClass: {
    type: [String, Array],
    default: ""
  },
  viewStyle: {
    type: [String, Array, Object],
    default: ""
  },
  noresize: Boolean,
  tag: {
    type: String,
    default: "div"
  },
  always: Boolean,
  minSize: {
    type: Number,
    default: 20
  },
  id: String,
  role: String,
  ariaLabel: String,
  ariaOrientation: {
    type: String,
    values: ["horizontal", "vertical"]
  }
}), Z5 = {
  scroll: ({
    scrollTop: e,
    scrollLeft: t
  }) => [e, t].every(Ze)
}, W5 = "ElScrollbar", G5 = H({
  name: W5
}), K5 = /* @__PURE__ */ H({
  ...G5,
  props: U5,
  emits: Z5,
  setup(e, { expose: t, emit: n }) {
    const r = e, s = Se("scrollbar");
    let o, i;
    const a = D(), c = D(), u = D(), d = D("0"), l = D("0"), m = D(), f = D(1), v = D(1), g = I(() => {
      const $ = {};
      return r.height && ($.height = wr(r.height)), r.maxHeight && ($.maxHeight = wr(r.maxHeight)), [r.wrapStyle, $];
    }), y = I(() => [
      r.wrapClass,
      s.e("wrap"),
      { [s.em("wrap", "hidden-default")]: !r.native }
    ]), h = I(() => [s.e("view"), r.viewClass]), w = () => {
      var $;
      c.value && (($ = m.value) == null || $.handleScroll(c.value), n("scroll", {
        scrollTop: c.value.scrollTop,
        scrollLeft: c.value.scrollLeft
      }));
    };
    function k($, M) {
      Yt($) ? c.value.scrollTo($) : Ze($) && Ze(M) && c.value.scrollTo($, M);
    }
    const C = ($) => {
      Ze($) && (c.value.scrollTop = $);
    }, A = ($) => {
      Ze($) && (c.value.scrollLeft = $);
    }, E = () => {
      if (!c.value)
        return;
      const $ = c.value.offsetHeight - gr, M = c.value.offsetWidth - gr, O = $ ** 2 / c.value.scrollHeight, R = M ** 2 / c.value.scrollWidth, B = Math.max(O, r.minSize), V = Math.max(R, r.minSize);
      f.value = O / ($ - O) / (B / ($ - B)), v.value = R / (M - R) / (V / (M - V)), l.value = B + gr < $ ? `${B}px` : "", d.value = V + gr < M ? `${V}px` : "";
    };
    return ae(() => r.noresize, ($) => {
      $ ? (o == null || o(), i == null || i()) : ({ stop: o } = us(u, E), i = Qn("resize", E));
    }, { immediate: !0 }), ae(() => [r.maxHeight, r.height], () => {
      r.native || Ae(() => {
        var $;
        E(), c.value && (($ = m.value) == null || $.handleScroll(c.value));
      });
    }), kt(Fh, qn({
      scrollbarElement: a,
      wrapElement: c
    })), Be(() => {
      r.native || Ae(() => {
        E();
      });
    }), Bv(() => E()), t({
      wrapRef: c,
      update: E,
      scrollTo: k,
      setScrollTop: C,
      setScrollLeft: A,
      handleScroll: w
    }), ($, M) => (b(), x("div", {
      ref_key: "scrollbarRef",
      ref: a,
      class: j(_(s).b())
    }, [
      p("div", {
        ref_key: "wrapRef",
        ref: c,
        class: j(_(y)),
        style: qe(_(g)),
        onScroll: w
      }, [
        (b(), X(lt($.tag), {
          id: $.id,
          ref_key: "resizeRef",
          ref: u,
          class: j(_(h)),
          style: qe($.viewStyle),
          role: $.role,
          "aria-label": $.ariaLabel,
          "aria-orientation": $.ariaOrientation
        }, {
          default: Y(() => [
            ne($.$slots, "default")
          ]),
          _: 3
        }, 8, ["id", "class", "style", "role", "aria-label", "aria-orientation"]))
      ], 38),
      $.native ? Q("v-if", !0) : (b(), X(V5, {
        key: 0,
        ref_key: "barRef",
        ref: m,
        height: l.value,
        width: d.value,
        always: $.always,
        "ratio-x": v.value,
        "ratio-y": f.value
      }, null, 8, ["height", "width", "always", "ratio-x", "ratio-y"]))
    ], 2));
  }
});
var X5 = /* @__PURE__ */ ye(K5, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/scrollbar.vue"]]);
const Y5 = Ft(X5), Cl = Symbol("popper"), jh = Symbol("popperContent"), J5 = [
  "dialog",
  "grid",
  "group",
  "listbox",
  "menu",
  "navigation",
  "tooltip",
  "tree"
], Hh = Me({
  role: {
    type: String,
    values: J5,
    default: "tooltip"
  }
}), Q5 = H({
  name: "ElPopper",
  inheritAttrs: !1
}), e6 = /* @__PURE__ */ H({
  ...Q5,
  props: Hh,
  setup(e, { expose: t }) {
    const n = e, r = D(), s = D(), o = D(), i = D(), a = I(() => n.role), c = {
      triggerRef: r,
      popperInstanceRef: s,
      contentRef: o,
      referenceRef: i,
      role: a
    };
    return t(c), kt(Cl, c), (u, d) => ne(u.$slots, "default");
  }
});
var t6 = /* @__PURE__ */ ye(e6, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/popper.vue"]]);
const Vh = Me({
  arrowOffset: {
    type: Number,
    default: 5
  }
}), n6 = H({
  name: "ElPopperArrow",
  inheritAttrs: !1
}), r6 = /* @__PURE__ */ H({
  ...n6,
  props: Vh,
  setup(e, { expose: t }) {
    const n = e, r = Se("popper"), { arrowOffset: s, arrowRef: o, arrowStyle: i } = $e(jh, void 0);
    return ae(() => n.arrowOffset, (a) => {
      s.value = a;
    }), Nt(() => {
      o.value = void 0;
    }), t({
      arrowRef: o
    }), (a, c) => (b(), x("span", {
      ref_key: "arrowRef",
      ref: o,
      class: j(_(r).e("arrow")),
      style: qe(_(i)),
      "data-popper-arrow": ""
    }, null, 6));
  }
});
var o6 = /* @__PURE__ */ ye(r6, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/arrow.vue"]]);
const s6 = "ElOnlyChild", i6 = H({
  name: s6,
  setup(e, {
    slots: t,
    attrs: n
  }) {
    var r;
    const s = $e(Dh), o = p5((r = s == null ? void 0 : s.setForwardRef) != null ? r : Jr);
    return () => {
      var i;
      const a = (i = t.default) == null ? void 0 : i.call(t, n);
      if (!a || a.length > 1)
        return null;
      const c = Uh(a);
      return c ? Ye(zv(c, n), [[o]]) : null;
    };
  }
});
function Uh(e) {
  if (!e)
    return null;
  const t = e;
  for (const n of t) {
    if (Yt(n))
      switch (n.type) {
        case Dv:
          continue;
        case Dp:
        case "svg":
          return sd(n);
        case Pe:
          return Uh(n.children);
        default:
          return n;
      }
    return sd(n);
  }
  return null;
}
function sd(e) {
  const t = Se("only-child");
  return ue("span", {
    class: t.e("content")
  }, [e]);
}
const Zh = Me({
  virtualRef: {
    type: ge(Object)
  },
  virtualTriggering: Boolean,
  onMouseenter: {
    type: ge(Function)
  },
  onMouseleave: {
    type: ge(Function)
  },
  onClick: {
    type: ge(Function)
  },
  onKeydown: {
    type: ge(Function)
  },
  onFocus: {
    type: ge(Function)
  },
  onBlur: {
    type: ge(Function)
  },
  onContextmenu: {
    type: ge(Function)
  },
  id: String,
  open: Boolean
}), a6 = H({
  name: "ElPopperTrigger",
  inheritAttrs: !1
}), c6 = /* @__PURE__ */ H({
  ...a6,
  props: Zh,
  setup(e, { expose: t }) {
    const n = e, { role: r, triggerRef: s } = $e(Cl, void 0);
    f5(s);
    const o = I(() => a.value ? n.id : void 0), i = I(() => {
      if (r && r.value === "tooltip")
        return n.open && n.id ? n.id : void 0;
    }), a = I(() => {
      if (r && r.value !== "tooltip")
        return r.value;
    }), c = I(() => a.value ? `${n.open}` : void 0);
    let u;
    return Be(() => {
      ae(() => n.virtualRef, (d) => {
        d && (s.value = Bn(d));
      }, {
        immediate: !0
      }), ae(s, (d, l) => {
        u == null || u(), u = void 0, to(d) && ([
          "onMouseenter",
          "onMouseleave",
          "onClick",
          "onKeydown",
          "onFocus",
          "onBlur",
          "onContextmenu"
        ].forEach((m) => {
          var f;
          const v = n[m];
          v && (d.addEventListener(m.slice(2).toLowerCase(), v), (f = l == null ? void 0 : l.removeEventListener) == null || f.call(l, m.slice(2).toLowerCase(), v));
        }), u = ae([o, i, a, c], (m) => {
          [
            "aria-controls",
            "aria-describedby",
            "aria-haspopup",
            "aria-expanded"
          ].forEach((f, v) => {
            er(m[v]) ? d.removeAttribute(f) : d.setAttribute(f, m[v]);
          });
        }, { immediate: !0 })), to(l) && [
          "aria-controls",
          "aria-describedby",
          "aria-haspopup",
          "aria-expanded"
        ].forEach((m) => l.removeAttribute(m));
      }, {
        immediate: !0
      });
    }), Nt(() => {
      u == null || u(), u = void 0;
    }), t({
      triggerRef: s
    }), (d, l) => d.virtualTriggering ? Q("v-if", !0) : (b(), X(_(i6), je({ key: 0 }, d.$attrs, {
      "aria-controls": _(o),
      "aria-describedby": _(i),
      "aria-expanded": _(c),
      "aria-haspopup": _(a)
    }), {
      default: Y(() => [
        ne(d.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-controls", "aria-describedby", "aria-expanded", "aria-haspopup"]));
  }
});
var l6 = /* @__PURE__ */ ye(c6, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/trigger.vue"]]);
const Us = "focus-trap.focus-after-trapped", Zs = "focus-trap.focus-after-released", u6 = "focus-trap.focusout-prevented", id = {
  cancelable: !0,
  bubbles: !1
}, d6 = {
  cancelable: !0,
  bubbles: !1
}, ad = "focusAfterTrapped", cd = "focusAfterReleased", f6 = Symbol("elFocusTrap"), xl = D(), xs = D(0), Sl = D(0);
let So = 0;
const Wh = (e) => {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const s = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || s ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 || r === document.activeElement ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); )
    t.push(n.currentNode);
  return t;
}, ld = (e, t) => {
  for (const n of e)
    if (!p6(n, t))
      return n;
}, p6 = (e, t) => {
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  for (; e; ) {
    if (t && e === t)
      return !1;
    if (getComputedStyle(e).display === "none")
      return !0;
    e = e.parentElement;
  }
  return !1;
}, h6 = (e) => {
  const t = Wh(e), n = ld(t, e), r = ld(t.reverse(), e);
  return [n, r];
}, g6 = (e) => e instanceof HTMLInputElement && "select" in e, Ln = (e, t) => {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), Sl.value = window.performance.now(), e !== n && g6(e) && t && e.select();
  }
};
function ud(e, t) {
  const n = [...e], r = e.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
const m6 = () => {
  let e = [];
  return {
    push: (r) => {
      const s = e[0];
      s && r !== s && s.pause(), e = ud(e, r), e.unshift(r);
    },
    remove: (r) => {
      var s, o;
      e = ud(e, r), (o = (s = e[0]) == null ? void 0 : s.resume) == null || o.call(s);
    }
  };
}, v6 = (e, t = !1) => {
  const n = document.activeElement;
  for (const r of e)
    if (Ln(r, t), document.activeElement !== n)
      return;
}, dd = m6(), _6 = () => xs.value > Sl.value, Eo = () => {
  xl.value = "pointer", xs.value = window.performance.now();
}, fd = () => {
  xl.value = "keyboard", xs.value = window.performance.now();
}, b6 = () => (Be(() => {
  So === 0 && (document.addEventListener("mousedown", Eo), document.addEventListener("touchstart", Eo), document.addEventListener("keydown", fd)), So++;
}), Nt(() => {
  So--, So <= 0 && (document.removeEventListener("mousedown", Eo), document.removeEventListener("touchstart", Eo), document.removeEventListener("keydown", fd));
}), {
  focusReason: xl,
  lastUserFocusTimestamp: xs,
  lastAutomatedFocusTimestamp: Sl
}), Ao = (e) => new CustomEvent(u6, {
  ...d6,
  detail: e
}), y6 = H({
  name: "ElFocusTrap",
  inheritAttrs: !1,
  props: {
    loop: Boolean,
    trapped: Boolean,
    focusTrapEl: Object,
    focusStartEl: {
      type: [Object, String],
      default: "first"
    }
  },
  emits: [
    ad,
    cd,
    "focusin",
    "focusout",
    "focusout-prevented",
    "release-requested"
  ],
  setup(e, { emit: t }) {
    const n = D();
    let r, s;
    const { focusReason: o } = b6();
    a5((v) => {
      e.trapped && !i.paused && t("release-requested", v);
    });
    const i = {
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    }, a = (v) => {
      if (!e.loop && !e.trapped || i.paused)
        return;
      const { key: g, altKey: y, ctrlKey: h, metaKey: w, currentTarget: k, shiftKey: C } = v, { loop: A } = e, E = g === yn.tab && !y && !h && !w, $ = document.activeElement;
      if (E && $) {
        const M = k, [O, R] = h6(M);
        if (O && R) {
          if (!C && $ === R) {
            const V = Ao({
              focusReason: o.value
            });
            t("focusout-prevented", V), V.defaultPrevented || (v.preventDefault(), A && Ln(O, !0));
          } else if (C && [O, M].includes($)) {
            const V = Ao({
              focusReason: o.value
            });
            t("focusout-prevented", V), V.defaultPrevented || (v.preventDefault(), A && Ln(R, !0));
          }
        } else if ($ === M) {
          const V = Ao({
            focusReason: o.value
          });
          t("focusout-prevented", V), V.defaultPrevented || v.preventDefault();
        }
      }
    };
    kt(f6, {
      focusTrapRef: n,
      onKeydown: a
    }), ae(() => e.focusTrapEl, (v) => {
      v && (n.value = v);
    }, { immediate: !0 }), ae([n], ([v], [g]) => {
      v && (v.addEventListener("keydown", a), v.addEventListener("focusin", d), v.addEventListener("focusout", l)), g && (g.removeEventListener("keydown", a), g.removeEventListener("focusin", d), g.removeEventListener("focusout", l));
    });
    const c = (v) => {
      t(ad, v);
    }, u = (v) => t(cd, v), d = (v) => {
      const g = _(n);
      if (!g)
        return;
      const y = v.target, h = v.relatedTarget, w = y && g.contains(y);
      e.trapped || h && g.contains(h) || (r = h), w && t("focusin", v), !i.paused && e.trapped && (w ? s = y : Ln(s, !0));
    }, l = (v) => {
      const g = _(n);
      if (!(i.paused || !g))
        if (e.trapped) {
          const y = v.relatedTarget;
          !er(y) && !g.contains(y) && setTimeout(() => {
            if (!i.paused && e.trapped) {
              const h = Ao({
                focusReason: o.value
              });
              t("focusout-prevented", h), h.defaultPrevented || Ln(s, !0);
            }
          }, 0);
        } else {
          const y = v.target;
          y && g.contains(y) || t("focusout", v);
        }
    };
    async function m() {
      await Ae();
      const v = _(n);
      if (v) {
        dd.push(i);
        const g = v.contains(document.activeElement) ? r : document.activeElement;
        if (r = g, !v.contains(g)) {
          const h = new Event(Us, id);
          v.addEventListener(Us, c), v.dispatchEvent(h), h.defaultPrevented || Ae(() => {
            let w = e.focusStartEl;
            Xt(w) || (Ln(w), document.activeElement !== w && (w = "first")), w === "first" && v6(Wh(v), !0), (document.activeElement === g || w === "container") && Ln(v);
          });
        }
      }
    }
    function f() {
      const v = _(n);
      if (v) {
        v.removeEventListener(Us, c);
        const g = new CustomEvent(Zs, {
          ...id,
          detail: {
            focusReason: o.value
          }
        });
        v.addEventListener(Zs, u), v.dispatchEvent(g), !g.defaultPrevented && (o.value == "keyboard" || !_6() || v.contains(document.activeElement)) && Ln(r ?? document.body), v.removeEventListener(Zs, u), dd.remove(i);
      }
    }
    return Be(() => {
      e.trapped && m(), ae(() => e.trapped, (v) => {
        v ? m() : f();
      });
    }), Nt(() => {
      e.trapped && f();
    }), {
      onKeydown: a
    };
  }
});
function w6(e, t, n, r, s, o) {
  return ne(e.$slots, "default", { handleKeydown: e.onKeydown });
}
var k6 = /* @__PURE__ */ ye(y6, [["render", w6], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue"]]);
const C6 = ["fixed", "absolute"], x6 = Me({
  boundariesPadding: {
    type: Number,
    default: 0
  },
  fallbackPlacements: {
    type: ge(Array),
    default: void 0
  },
  gpuAcceleration: {
    type: Boolean,
    default: !0
  },
  offset: {
    type: Number,
    default: 12
  },
  placement: {
    type: String,
    values: _s,
    default: "bottom"
  },
  popperOptions: {
    type: ge(Object),
    default: () => ({})
  },
  strategy: {
    type: String,
    values: C6,
    default: "absolute"
  }
}), Gh = Me({
  ...x6,
  id: String,
  style: {
    type: ge([String, Array, Object])
  },
  className: {
    type: ge([String, Array, Object])
  },
  effect: {
    type: String,
    default: "dark"
  },
  visible: Boolean,
  enterable: {
    type: Boolean,
    default: !0
  },
  pure: Boolean,
  focusOnShow: {
    type: Boolean,
    default: !1
  },
  trapping: {
    type: Boolean,
    default: !1
  },
  popperClass: {
    type: ge([String, Array, Object])
  },
  popperStyle: {
    type: ge([String, Array, Object])
  },
  referenceEl: {
    type: ge(Object)
  },
  triggerTargetEl: {
    type: ge(Object)
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: !0
  },
  ariaLabel: {
    type: String,
    default: void 0
  },
  virtualTriggering: Boolean,
  zIndex: Number
}), S6 = {
  mouseenter: (e) => e instanceof MouseEvent,
  mouseleave: (e) => e instanceof MouseEvent,
  focus: () => !0,
  blur: () => !0,
  close: () => !0
}, E6 = (e, t = []) => {
  const { placement: n, strategy: r, popperOptions: s } = e, o = {
    placement: n,
    strategy: r,
    ...s,
    modifiers: [...$6(e), ...t]
  };
  return M6(o, s == null ? void 0 : s.modifiers), o;
}, A6 = (e) => {
  if (ut)
    return Bn(e);
};
function $6(e) {
  const { offset: t, gpuAcceleration: n, fallbackPlacements: r } = e;
  return [
    {
      name: "offset",
      options: {
        offset: [0, t ?? 12]
      }
    },
    {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    },
    {
      name: "flip",
      options: {
        padding: 5,
        fallbackPlacements: r
      }
    },
    {
      name: "computeStyles",
      options: {
        gpuAcceleration: n
      }
    }
  ];
}
function M6(e, t) {
  t && (e.modifiers = [...e.modifiers, ...t ?? []]);
}
const I6 = 0, T6 = (e) => {
  const { popperInstanceRef: t, contentRef: n, triggerRef: r, role: s } = $e(Cl, void 0), o = D(), i = D(), a = I(() => ({
    name: "eventListeners",
    enabled: !!e.visible
  })), c = I(() => {
    var h;
    const w = _(o), k = (h = _(i)) != null ? h : I6;
    return {
      name: "arrow",
      enabled: !u4(w),
      options: {
        element: w,
        padding: k
      }
    };
  }), u = I(() => ({
    onFirstUpdate: () => {
      v();
    },
    ...E6(e, [
      _(c),
      _(a)
    ])
  })), d = I(() => A6(e.referenceEl) || _(r)), { attributes: l, state: m, styles: f, update: v, forceUpdate: g, instanceRef: y } = r5(d, n, u);
  return ae(y, (h) => t.value = h), Be(() => {
    ae(() => {
      var h;
      return (h = _(d)) == null ? void 0 : h.getBoundingClientRect();
    }, () => {
      v();
    });
  }), {
    attributes: l,
    arrowRef: o,
    contentRef: n,
    instanceRef: y,
    state: m,
    styles: f,
    role: s,
    forceUpdate: g,
    update: v
  };
}, L6 = (e, {
  attributes: t,
  styles: n,
  role: r
}) => {
  const { nextZIndex: s } = m5(), o = Se("popper"), i = I(() => _(t).popper), a = D(Ze(e.zIndex) ? e.zIndex : s()), c = I(() => [
    o.b(),
    o.is("pure", e.pure),
    o.is(e.effect),
    e.popperClass
  ]), u = I(() => [
    { zIndex: _(a) },
    _(n).popper,
    e.popperStyle || {}
  ]), d = I(() => r.value === "dialog" ? "false" : void 0), l = I(() => _(n).arrow || {});
  return {
    ariaModal: d,
    arrowStyle: l,
    contentAttrs: i,
    contentClass: c,
    contentStyle: u,
    contentZIndex: a,
    updateZIndex: () => {
      a.value = Ze(e.zIndex) ? e.zIndex : s();
    }
  };
}, O6 = (e, t) => {
  const n = D(!1), r = D();
  return {
    focusStartRef: r,
    trapped: n,
    onFocusAfterReleased: (u) => {
      var d;
      ((d = u.detail) == null ? void 0 : d.focusReason) !== "pointer" && (r.value = "first", t("blur"));
    },
    onFocusAfterTrapped: () => {
      t("focus");
    },
    onFocusInTrap: (u) => {
      e.visible && !n.value && (u.target && (r.value = u.target), n.value = !0);
    },
    onFocusoutPrevented: (u) => {
      e.trapping || (u.detail.focusReason === "pointer" && u.preventDefault(), n.value = !1);
    },
    onReleaseRequested: () => {
      n.value = !1, t("close");
    }
  };
}, R6 = H({
  name: "ElPopperContent"
}), P6 = /* @__PURE__ */ H({
  ...R6,
  props: Gh,
  emits: S6,
  setup(e, { expose: t, emit: n }) {
    const r = e, {
      focusStartRef: s,
      trapped: o,
      onFocusAfterReleased: i,
      onFocusAfterTrapped: a,
      onFocusInTrap: c,
      onFocusoutPrevented: u,
      onReleaseRequested: d
    } = O6(r, n), { attributes: l, arrowRef: m, contentRef: f, styles: v, instanceRef: g, role: y, update: h } = T6(r), {
      ariaModal: w,
      arrowStyle: k,
      contentAttrs: C,
      contentClass: A,
      contentStyle: E,
      updateZIndex: $
    } = L6(r, {
      styles: v,
      attributes: l,
      role: y
    }), M = $e(Yo, void 0), O = D();
    kt(jh, {
      arrowStyle: k,
      arrowRef: m,
      arrowOffset: O
    }), M && (M.addInputId || M.removeInputId) && kt(Yo, {
      ...M,
      addInputId: Jr,
      removeInputId: Jr
    });
    let R;
    const B = (re = !0) => {
      h(), re && $();
    }, V = () => {
      B(!1), r.visible && r.focusOnShow ? o.value = !0 : r.visible === !1 && (o.value = !1);
    };
    return Be(() => {
      ae(() => r.triggerTargetEl, (re, P) => {
        R == null || R(), R = void 0;
        const U = _(re || f.value), z = _(P || f.value);
        to(U) && (R = ae([y, () => r.ariaLabel, w, () => r.id], (N) => {
          ["role", "aria-label", "aria-modal", "id"].forEach((F, Z) => {
            er(N[Z]) ? U.removeAttribute(F) : U.setAttribute(F, N[Z]);
          });
        }, { immediate: !0 })), z !== U && to(z) && ["role", "aria-label", "aria-modal", "id"].forEach((N) => {
          z.removeAttribute(N);
        });
      }, { immediate: !0 }), ae(() => r.visible, V, { immediate: !0 });
    }), Nt(() => {
      R == null || R(), R = void 0;
    }), t({
      popperContentRef: f,
      popperInstanceRef: g,
      updatePopper: B,
      contentStyle: E
    }), (re, P) => (b(), x("div", je({
      ref_key: "contentRef",
      ref: f
    }, _(C), {
      style: _(E),
      class: _(A),
      tabindex: "-1",
      onMouseenter: P[0] || (P[0] = (U) => re.$emit("mouseenter", U)),
      onMouseleave: P[1] || (P[1] = (U) => re.$emit("mouseleave", U))
    }), [
      ue(_(k6), {
        trapped: _(o),
        "trap-on-focus-in": !0,
        "focus-trap-el": _(f),
        "focus-start-el": _(s),
        onFocusAfterTrapped: _(a),
        onFocusAfterReleased: _(i),
        onFocusin: _(c),
        onFocusoutPrevented: _(u),
        onReleaseRequested: _(d)
      }, {
        default: Y(() => [
          ne(re.$slots, "default")
        ]),
        _: 3
      }, 8, ["trapped", "focus-trap-el", "focus-start-el", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusin", "onFocusoutPrevented", "onReleaseRequested"])
    ], 16));
  }
});
var B6 = /* @__PURE__ */ ye(P6, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/content.vue"]]);
const z6 = Ft(t6), El = Symbol("elTooltip"), Mt = Me({
  ...u5,
  ...Gh,
  appendTo: {
    type: ge([String, Object])
  },
  content: {
    type: String,
    default: ""
  },
  rawContent: {
    type: Boolean,
    default: !1
  },
  persistent: Boolean,
  ariaLabel: String,
  visible: {
    type: ge(Boolean),
    default: null
  },
  transition: String,
  teleported: {
    type: Boolean,
    default: !0
  },
  disabled: Boolean
}), oo = Me({
  ...Zh,
  disabled: Boolean,
  trigger: {
    type: ge([String, Array]),
    default: "hover"
  },
  triggerKeys: {
    type: ge(Array),
    default: () => [yn.enter, yn.space]
  }
}), {
  useModelToggleProps: D6,
  useModelToggleEmits: N6,
  useModelToggle: q6
} = e3("visible"), F6 = Me({
  ...Hh,
  ...D6,
  ...Mt,
  ...oo,
  ...Vh,
  showArrow: {
    type: Boolean,
    default: !0
  }
}), j6 = [
  ...N6,
  "before-show",
  "before-hide",
  "show",
  "hide",
  "open",
  "close"
], H6 = (e, t) => zb(e) ? e.includes(t) : e === t, ur = (e, t, n) => (r) => {
  H6(_(e), t) && n(r);
}, V6 = H({
  name: "ElTooltipTrigger"
}), U6 = /* @__PURE__ */ H({
  ...V6,
  props: oo,
  setup(e, { expose: t }) {
    const n = e, r = Se("tooltip"), { controlled: s, id: o, open: i, onOpen: a, onClose: c, onToggle: u } = $e(El, void 0), d = D(null), l = () => {
      if (_(s) || n.disabled)
        return !0;
    }, m = Rt(n, "trigger"), f = vn(l, ur(m, "hover", a)), v = vn(l, ur(m, "hover", c)), g = vn(l, ur(m, "click", (C) => {
      C.button === 0 && u(C);
    })), y = vn(l, ur(m, "focus", a)), h = vn(l, ur(m, "focus", c)), w = vn(l, ur(m, "contextmenu", (C) => {
      C.preventDefault(), u(C);
    })), k = vn(l, (C) => {
      const { code: A } = C;
      n.triggerKeys.includes(A) && (C.preventDefault(), u(C));
    });
    return t({
      triggerRef: d
    }), (C, A) => (b(), X(_(l6), {
      id: _(o),
      "virtual-ref": C.virtualRef,
      open: _(i),
      "virtual-triggering": C.virtualTriggering,
      class: j(_(r).e("trigger")),
      onBlur: _(h),
      onClick: _(g),
      onContextmenu: _(w),
      onFocus: _(y),
      onMouseenter: _(f),
      onMouseleave: _(v),
      onKeydown: _(k)
    }, {
      default: Y(() => [
        ne(C.$slots, "default")
      ]),
      _: 3
    }, 8, ["id", "virtual-ref", "open", "virtual-triggering", "class", "onBlur", "onClick", "onContextmenu", "onFocus", "onMouseenter", "onMouseleave", "onKeydown"]));
  }
});
var Z6 = /* @__PURE__ */ ye(U6, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/trigger.vue"]]);
const W6 = H({
  name: "ElTooltipContent",
  inheritAttrs: !1
}), G6 = /* @__PURE__ */ H({
  ...W6,
  props: Mt,
  setup(e, { expose: t }) {
    const n = e, { selector: r } = zh(), s = Se("tooltip"), o = D(null), i = D(!1), {
      controlled: a,
      id: c,
      open: u,
      trigger: d,
      onClose: l,
      onOpen: m,
      onShow: f,
      onHide: v,
      onBeforeShow: g,
      onBeforeHide: y
    } = $e(El, void 0), h = I(() => n.transition || `${s.namespace.value}-fade-in-linear`), w = I(() => n.persistent);
    Nt(() => {
      i.value = !0;
    });
    const k = I(() => _(w) ? !0 : _(u)), C = I(() => n.disabled ? !1 : _(u)), A = I(() => n.appendTo || r.value), E = I(() => {
      var N;
      return (N = n.style) != null ? N : {};
    }), $ = I(() => !_(u)), M = () => {
      v();
    }, O = () => {
      if (_(a))
        return !0;
    }, R = vn(O, () => {
      n.enterable && _(d) === "hover" && m();
    }), B = vn(O, () => {
      _(d) === "hover" && l();
    }), V = () => {
      var N, F;
      (F = (N = o.value) == null ? void 0 : N.updatePopper) == null || F.call(N), g == null || g();
    }, re = () => {
      y == null || y();
    }, P = () => {
      f(), z = Sb(I(() => {
        var N;
        return (N = o.value) == null ? void 0 : N.popperContentRef;
      }), () => {
        if (_(a))
          return;
        _(d) !== "hover" && l();
      });
    }, U = () => {
      n.virtualTriggering || l();
    };
    let z;
    return ae(() => _(u), (N) => {
      N || z == null || z();
    }, {
      flush: "post"
    }), ae(() => n.content, () => {
      var N, F;
      (F = (N = o.value) == null ? void 0 : N.updatePopper) == null || F.call(N);
    }), t({
      contentRef: o
    }), (N, F) => (b(), X(Nv, {
      disabled: !N.teleported,
      to: _(A)
    }, [
      ue(nr, {
        name: _(h),
        onAfterLeave: M,
        onBeforeEnter: V,
        onAfterEnter: P,
        onBeforeLeave: re
      }, {
        default: Y(() => [
          _(k) ? Ye((b(), X(_(B6), je({
            key: 0,
            id: _(c),
            ref_key: "contentRef",
            ref: o
          }, N.$attrs, {
            "aria-label": N.ariaLabel,
            "aria-hidden": _($),
            "boundaries-padding": N.boundariesPadding,
            "fallback-placements": N.fallbackPlacements,
            "gpu-acceleration": N.gpuAcceleration,
            offset: N.offset,
            placement: N.placement,
            "popper-options": N.popperOptions,
            strategy: N.strategy,
            effect: N.effect,
            enterable: N.enterable,
            pure: N.pure,
            "popper-class": N.popperClass,
            "popper-style": [N.popperStyle, _(E)],
            "reference-el": N.referenceEl,
            "trigger-target-el": N.triggerTargetEl,
            visible: _(C),
            "z-index": N.zIndex,
            onMouseenter: _(R),
            onMouseleave: _(B),
            onBlur: U,
            onClose: _(l)
          }), {
            default: Y(() => [
              i.value ? Q("v-if", !0) : ne(N.$slots, "default", { key: 0 })
            ]),
            _: 3
          }, 16, ["id", "aria-label", "aria-hidden", "boundaries-padding", "fallback-placements", "gpu-acceleration", "offset", "placement", "popper-options", "strategy", "effect", "enterable", "pure", "popper-class", "popper-style", "reference-el", "trigger-target-el", "visible", "z-index", "onMouseenter", "onMouseleave", "onClose"])), [
            [Jt, _(C)]
          ]) : Q("v-if", !0)
        ]),
        _: 3
      }, 8, ["name"])
    ], 8, ["disabled", "to"]));
  }
});
var K6 = /* @__PURE__ */ ye(G6, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/content.vue"]]);
const X6 = ["innerHTML"], Y6 = { key: 1 }, J6 = H({
  name: "ElTooltip"
}), Q6 = /* @__PURE__ */ H({
  ...J6,
  props: F6,
  emits: j6,
  setup(e, { expose: t, emit: n }) {
    const r = e;
    l5();
    const s = ys(), o = D(), i = D(), a = () => {
      var h;
      const w = _(o);
      w && ((h = w.popperInstanceRef) == null || h.update());
    }, c = D(!1), u = D(), { show: d, hide: l, hasUpdateHandler: m } = q6({
      indicator: c,
      toggleReason: u
    }), { onOpen: f, onClose: v } = d5({
      showAfter: Rt(r, "showAfter"),
      hideAfter: Rt(r, "hideAfter"),
      autoClose: Rt(r, "autoClose"),
      open: d,
      close: l
    }), g = I(() => cl(r.visible) && !m.value);
    kt(El, {
      controlled: g,
      id: s,
      open: Rp(c),
      trigger: Rt(r, "trigger"),
      onOpen: (h) => {
        f(h);
      },
      onClose: (h) => {
        v(h);
      },
      onToggle: (h) => {
        _(c) ? v(h) : f(h);
      },
      onShow: () => {
        n("show", u.value);
      },
      onHide: () => {
        n("hide", u.value);
      },
      onBeforeShow: () => {
        n("before-show", u.value);
      },
      onBeforeHide: () => {
        n("before-hide", u.value);
      },
      updatePopper: a
    }), ae(() => r.disabled, (h) => {
      h && c.value && (c.value = !1);
    });
    const y = (h) => {
      var w, k;
      const C = (k = (w = i.value) == null ? void 0 : w.contentRef) == null ? void 0 : k.popperContentRef, A = (h == null ? void 0 : h.relatedTarget) || document.activeElement;
      return C && C.contains(A);
    };
    return qv(() => c.value && l()), t({
      popperRef: o,
      contentRef: i,
      isFocusInsideContent: y,
      updatePopper: a,
      onOpen: f,
      onClose: v,
      hide: l
    }), (h, w) => (b(), X(_(z6), {
      ref_key: "popperRef",
      ref: o,
      role: h.role
    }, {
      default: Y(() => [
        ue(Z6, {
          disabled: h.disabled,
          trigger: h.trigger,
          "trigger-keys": h.triggerKeys,
          "virtual-ref": h.virtualRef,
          "virtual-triggering": h.virtualTriggering
        }, {
          default: Y(() => [
            h.$slots.default ? ne(h.$slots, "default", { key: 0 }) : Q("v-if", !0)
          ]),
          _: 3
        }, 8, ["disabled", "trigger", "trigger-keys", "virtual-ref", "virtual-triggering"]),
        ue(K6, {
          ref_key: "contentRef",
          ref: i,
          "aria-label": h.ariaLabel,
          "boundaries-padding": h.boundariesPadding,
          content: h.content,
          disabled: h.disabled,
          effect: h.effect,
          enterable: h.enterable,
          "fallback-placements": h.fallbackPlacements,
          "hide-after": h.hideAfter,
          "gpu-acceleration": h.gpuAcceleration,
          offset: h.offset,
          persistent: h.persistent,
          "popper-class": h.popperClass,
          "popper-style": h.popperStyle,
          placement: h.placement,
          "popper-options": h.popperOptions,
          pure: h.pure,
          "raw-content": h.rawContent,
          "reference-el": h.referenceEl,
          "trigger-target-el": h.triggerTargetEl,
          "show-after": h.showAfter,
          strategy: h.strategy,
          teleported: h.teleported,
          transition: h.transition,
          "virtual-triggering": h.virtualTriggering,
          "z-index": h.zIndex,
          "append-to": h.appendTo
        }, {
          default: Y(() => [
            ne(h.$slots, "content", {}, () => [
              h.rawContent ? (b(), x("span", {
                key: 0,
                innerHTML: h.content
              }, null, 8, X6)) : (b(), x("span", Y6, ve(h.content), 1))
            ]),
            h.showArrow ? (b(), X(_(o6), {
              key: 0,
              "arrow-offset": h.arrowOffset
            }, null, 8, ["arrow-offset"])) : Q("v-if", !0)
          ]),
          _: 3
        }, 8, ["aria-label", "boundaries-padding", "content", "disabled", "effect", "enterable", "fallback-placements", "hide-after", "gpu-acceleration", "offset", "persistent", "popper-class", "popper-style", "placement", "popper-options", "pure", "raw-content", "reference-el", "trigger-target-el", "show-after", "strategy", "teleported", "transition", "virtual-triggering", "z-index", "append-to"])
      ]),
      _: 3
    }, 8, ["role"]));
  }
});
var e8 = /* @__PURE__ */ ye(Q6, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/tooltip.vue"]]);
const so = Ft(e8), Kh = Symbol("buttonGroupContextKey"), t8 = (e, t) => {
  Ch({
    from: "type.text",
    replacement: "link",
    version: "3.0.0",
    scope: "props",
    ref: "https://element-plus.org/en-US/component/button.html#button-attributes"
  }, I(() => e.type === "text"));
  const n = $e(Kh, void 0), r = w5("button"), { form: s } = ks(), o = go(I(() => n == null ? void 0 : n.size)), i = ws(), a = D(), c = zp(), u = I(() => e.type || (n == null ? void 0 : n.type) || ""), d = I(() => {
    var v, g, y;
    return (y = (g = e.autoInsertSpace) != null ? g : (v = r.value) == null ? void 0 : v.autoInsertSpace) != null ? y : !1;
  }), l = I(() => e.tag === "button" ? {
    ariaDisabled: i.value || e.loading,
    disabled: i.value || e.loading,
    autofocus: e.autofocus,
    type: e.nativeType
  } : {}), m = I(() => {
    var v;
    const g = (v = c.default) == null ? void 0 : v.call(c);
    if (d.value && (g == null ? void 0 : g.length) === 1) {
      const y = g[0];
      if ((y == null ? void 0 : y.type) === Dp) {
        const h = y.children;
        return new RegExp("^\\p{Unified_Ideograph}{2}$", "u").test(h.trim());
      }
    }
    return !1;
  });
  return {
    _disabled: i,
    _size: o,
    _type: u,
    _ref: a,
    _props: l,
    shouldAddSpace: m,
    handleClick: (v) => {
      e.nativeType === "reset" && (s == null || s.resetFields()), t("click", v);
    }
  };
}, n8 = [
  "default",
  "primary",
  "success",
  "warning",
  "info",
  "danger",
  "text",
  ""
], r8 = ["button", "submit", "reset"], Tc = Me({
  size: wl,
  disabled: Boolean,
  type: {
    type: String,
    values: n8,
    default: ""
  },
  icon: {
    type: Qt
  },
  nativeType: {
    type: String,
    values: r8,
    default: "button"
  },
  loading: Boolean,
  loadingIcon: {
    type: Qt,
    default: () => bh
  },
  plain: Boolean,
  text: Boolean,
  link: Boolean,
  bg: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean,
  color: String,
  dark: Boolean,
  autoInsertSpace: {
    type: Boolean,
    default: void 0
  },
  tag: {
    type: ge([String, Object]),
    default: "button"
  }
}), o8 = {
  click: (e) => e instanceof MouseEvent
};
function rt(e, t) {
  s8(e) && (e = "100%");
  var n = i8(e);
  return e = t === 360 ? e : Math.min(t, Math.max(0, parseFloat(e))), n && (e = parseInt(String(e * t), 10) / 100), Math.abs(e - t) < 1e-6 ? 1 : (t === 360 ? e = (e < 0 ? e % t + t : e % t) / parseFloat(String(t)) : e = e % t / parseFloat(String(t)), e);
}
function $o(e) {
  return Math.min(1, Math.max(0, e));
}
function s8(e) {
  return typeof e == "string" && e.indexOf(".") !== -1 && parseFloat(e) === 1;
}
function i8(e) {
  return typeof e == "string" && e.indexOf("%") !== -1;
}
function Xh(e) {
  return e = parseFloat(e), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function Mo(e) {
  return e <= 1 ? "".concat(Number(e) * 100, "%") : e;
}
function Jn(e) {
  return e.length === 1 ? "0" + e : String(e);
}
function a8(e, t, n) {
  return {
    r: rt(e, 255) * 255,
    g: rt(t, 255) * 255,
    b: rt(n, 255) * 255
  };
}
function pd(e, t, n) {
  e = rt(e, 255), t = rt(t, 255), n = rt(n, 255);
  var r = Math.max(e, t, n), s = Math.min(e, t, n), o = 0, i = 0, a = (r + s) / 2;
  if (r === s)
    i = 0, o = 0;
  else {
    var c = r - s;
    switch (i = a > 0.5 ? c / (2 - r - s) : c / (r + s), r) {
      case e:
        o = (t - n) / c + (t < n ? 6 : 0);
        break;
      case t:
        o = (n - e) / c + 2;
        break;
      case n:
        o = (e - t) / c + 4;
        break;
    }
    o /= 6;
  }
  return { h: o, s: i, l: a };
}
function Ws(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * (6 * n) : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function c8(e, t, n) {
  var r, s, o;
  if (e = rt(e, 360), t = rt(t, 100), n = rt(n, 100), t === 0)
    s = n, o = n, r = n;
  else {
    var i = n < 0.5 ? n * (1 + t) : n + t - n * t, a = 2 * n - i;
    r = Ws(a, i, e + 1 / 3), s = Ws(a, i, e), o = Ws(a, i, e - 1 / 3);
  }
  return { r: r * 255, g: s * 255, b: o * 255 };
}
function hd(e, t, n) {
  e = rt(e, 255), t = rt(t, 255), n = rt(n, 255);
  var r = Math.max(e, t, n), s = Math.min(e, t, n), o = 0, i = r, a = r - s, c = r === 0 ? 0 : a / r;
  if (r === s)
    o = 0;
  else {
    switch (r) {
      case e:
        o = (t - n) / a + (t < n ? 6 : 0);
        break;
      case t:
        o = (n - e) / a + 2;
        break;
      case n:
        o = (e - t) / a + 4;
        break;
    }
    o /= 6;
  }
  return { h: o, s: c, v: i };
}
function l8(e, t, n) {
  e = rt(e, 360) * 6, t = rt(t, 100), n = rt(n, 100);
  var r = Math.floor(e), s = e - r, o = n * (1 - t), i = n * (1 - s * t), a = n * (1 - (1 - s) * t), c = r % 6, u = [n, i, o, o, a, n][c], d = [a, n, n, i, o, o][c], l = [o, o, a, n, n, i][c];
  return { r: u * 255, g: d * 255, b: l * 255 };
}
function gd(e, t, n, r) {
  var s = [
    Jn(Math.round(e).toString(16)),
    Jn(Math.round(t).toString(16)),
    Jn(Math.round(n).toString(16))
  ];
  return r && s[0].startsWith(s[0].charAt(1)) && s[1].startsWith(s[1].charAt(1)) && s[2].startsWith(s[2].charAt(1)) ? s[0].charAt(0) + s[1].charAt(0) + s[2].charAt(0) : s.join("");
}
function u8(e, t, n, r, s) {
  var o = [
    Jn(Math.round(e).toString(16)),
    Jn(Math.round(t).toString(16)),
    Jn(Math.round(n).toString(16)),
    Jn(d8(r))
  ];
  return s && o[0].startsWith(o[0].charAt(1)) && o[1].startsWith(o[1].charAt(1)) && o[2].startsWith(o[2].charAt(1)) && o[3].startsWith(o[3].charAt(1)) ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0) + o[3].charAt(0) : o.join("");
}
function d8(e) {
  return Math.round(parseFloat(e) * 255).toString(16);
}
function md(e) {
  return $t(e) / 255;
}
function $t(e) {
  return parseInt(e, 16);
}
function f8(e) {
  return {
    r: e >> 16,
    g: (e & 65280) >> 8,
    b: e & 255
  };
}
var Lc = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function p8(e) {
  var t = { r: 0, g: 0, b: 0 }, n = 1, r = null, s = null, o = null, i = !1, a = !1;
  return typeof e == "string" && (e = m8(e)), typeof e == "object" && (gn(e.r) && gn(e.g) && gn(e.b) ? (t = a8(e.r, e.g, e.b), i = !0, a = String(e.r).substr(-1) === "%" ? "prgb" : "rgb") : gn(e.h) && gn(e.s) && gn(e.v) ? (r = Mo(e.s), s = Mo(e.v), t = l8(e.h, r, s), i = !0, a = "hsv") : gn(e.h) && gn(e.s) && gn(e.l) && (r = Mo(e.s), o = Mo(e.l), t = c8(e.h, r, o), i = !0, a = "hsl"), Object.prototype.hasOwnProperty.call(e, "a") && (n = e.a)), n = Xh(n), {
    ok: i,
    format: e.format || a,
    r: Math.min(255, Math.max(t.r, 0)),
    g: Math.min(255, Math.max(t.g, 0)),
    b: Math.min(255, Math.max(t.b, 0)),
    a: n
  };
}
var h8 = "[-\\+]?\\d+%?", g8 = "[-\\+]?\\d*\\.\\d+%?", zn = "(?:".concat(g8, ")|(?:").concat(h8, ")"), Gs = "[\\s|\\(]+(".concat(zn, ")[,|\\s]+(").concat(zn, ")[,|\\s]+(").concat(zn, ")\\s*\\)?"), Ks = "[\\s|\\(]+(".concat(zn, ")[,|\\s]+(").concat(zn, ")[,|\\s]+(").concat(zn, ")[,|\\s]+(").concat(zn, ")\\s*\\)?"), Gt = {
  CSS_UNIT: new RegExp(zn),
  rgb: new RegExp("rgb" + Gs),
  rgba: new RegExp("rgba" + Ks),
  hsl: new RegExp("hsl" + Gs),
  hsla: new RegExp("hsla" + Ks),
  hsv: new RegExp("hsv" + Gs),
  hsva: new RegExp("hsva" + Ks),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function m8(e) {
  if (e = e.trim().toLowerCase(), e.length === 0)
    return !1;
  var t = !1;
  if (Lc[e])
    e = Lc[e], t = !0;
  else if (e === "transparent")
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  var n = Gt.rgb.exec(e);
  return n ? { r: n[1], g: n[2], b: n[3] } : (n = Gt.rgba.exec(e), n ? { r: n[1], g: n[2], b: n[3], a: n[4] } : (n = Gt.hsl.exec(e), n ? { h: n[1], s: n[2], l: n[3] } : (n = Gt.hsla.exec(e), n ? { h: n[1], s: n[2], l: n[3], a: n[4] } : (n = Gt.hsv.exec(e), n ? { h: n[1], s: n[2], v: n[3] } : (n = Gt.hsva.exec(e), n ? { h: n[1], s: n[2], v: n[3], a: n[4] } : (n = Gt.hex8.exec(e), n ? {
    r: $t(n[1]),
    g: $t(n[2]),
    b: $t(n[3]),
    a: md(n[4]),
    format: t ? "name" : "hex8"
  } : (n = Gt.hex6.exec(e), n ? {
    r: $t(n[1]),
    g: $t(n[2]),
    b: $t(n[3]),
    format: t ? "name" : "hex"
  } : (n = Gt.hex4.exec(e), n ? {
    r: $t(n[1] + n[1]),
    g: $t(n[2] + n[2]),
    b: $t(n[3] + n[3]),
    a: md(n[4] + n[4]),
    format: t ? "name" : "hex8"
  } : (n = Gt.hex3.exec(e), n ? {
    r: $t(n[1] + n[1]),
    g: $t(n[2] + n[2]),
    b: $t(n[3] + n[3]),
    format: t ? "name" : "hex"
  } : !1)))))))));
}
function gn(e) {
  return !!Gt.CSS_UNIT.exec(String(e));
}
var v8 = (
  /** @class */
  function() {
    function e(t, n) {
      t === void 0 && (t = ""), n === void 0 && (n = {});
      var r;
      if (t instanceof e)
        return t;
      typeof t == "number" && (t = f8(t)), this.originalInput = t;
      var s = p8(t);
      this.originalInput = t, this.r = s.r, this.g = s.g, this.b = s.b, this.a = s.a, this.roundA = Math.round(100 * this.a) / 100, this.format = (r = n.format) !== null && r !== void 0 ? r : s.format, this.gradientType = n.gradientType, this.r < 1 && (this.r = Math.round(this.r)), this.g < 1 && (this.g = Math.round(this.g)), this.b < 1 && (this.b = Math.round(this.b)), this.isValid = s.ok;
    }
    return e.prototype.isDark = function() {
      return this.getBrightness() < 128;
    }, e.prototype.isLight = function() {
      return !this.isDark();
    }, e.prototype.getBrightness = function() {
      var t = this.toRgb();
      return (t.r * 299 + t.g * 587 + t.b * 114) / 1e3;
    }, e.prototype.getLuminance = function() {
      var t = this.toRgb(), n, r, s, o = t.r / 255, i = t.g / 255, a = t.b / 255;
      return o <= 0.03928 ? n = o / 12.92 : n = Math.pow((o + 0.055) / 1.055, 2.4), i <= 0.03928 ? r = i / 12.92 : r = Math.pow((i + 0.055) / 1.055, 2.4), a <= 0.03928 ? s = a / 12.92 : s = Math.pow((a + 0.055) / 1.055, 2.4), 0.2126 * n + 0.7152 * r + 0.0722 * s;
    }, e.prototype.getAlpha = function() {
      return this.a;
    }, e.prototype.setAlpha = function(t) {
      return this.a = Xh(t), this.roundA = Math.round(100 * this.a) / 100, this;
    }, e.prototype.isMonochrome = function() {
      var t = this.toHsl().s;
      return t === 0;
    }, e.prototype.toHsv = function() {
      var t = hd(this.r, this.g, this.b);
      return { h: t.h * 360, s: t.s, v: t.v, a: this.a };
    }, e.prototype.toHsvString = function() {
      var t = hd(this.r, this.g, this.b), n = Math.round(t.h * 360), r = Math.round(t.s * 100), s = Math.round(t.v * 100);
      return this.a === 1 ? "hsv(".concat(n, ", ").concat(r, "%, ").concat(s, "%)") : "hsva(".concat(n, ", ").concat(r, "%, ").concat(s, "%, ").concat(this.roundA, ")");
    }, e.prototype.toHsl = function() {
      var t = pd(this.r, this.g, this.b);
      return { h: t.h * 360, s: t.s, l: t.l, a: this.a };
    }, e.prototype.toHslString = function() {
      var t = pd(this.r, this.g, this.b), n = Math.round(t.h * 360), r = Math.round(t.s * 100), s = Math.round(t.l * 100);
      return this.a === 1 ? "hsl(".concat(n, ", ").concat(r, "%, ").concat(s, "%)") : "hsla(".concat(n, ", ").concat(r, "%, ").concat(s, "%, ").concat(this.roundA, ")");
    }, e.prototype.toHex = function(t) {
      return t === void 0 && (t = !1), gd(this.r, this.g, this.b, t);
    }, e.prototype.toHexString = function(t) {
      return t === void 0 && (t = !1), "#" + this.toHex(t);
    }, e.prototype.toHex8 = function(t) {
      return t === void 0 && (t = !1), u8(this.r, this.g, this.b, this.a, t);
    }, e.prototype.toHex8String = function(t) {
      return t === void 0 && (t = !1), "#" + this.toHex8(t);
    }, e.prototype.toHexShortString = function(t) {
      return t === void 0 && (t = !1), this.a === 1 ? this.toHexString(t) : this.toHex8String(t);
    }, e.prototype.toRgb = function() {
      return {
        r: Math.round(this.r),
        g: Math.round(this.g),
        b: Math.round(this.b),
        a: this.a
      };
    }, e.prototype.toRgbString = function() {
      var t = Math.round(this.r), n = Math.round(this.g), r = Math.round(this.b);
      return this.a === 1 ? "rgb(".concat(t, ", ").concat(n, ", ").concat(r, ")") : "rgba(".concat(t, ", ").concat(n, ", ").concat(r, ", ").concat(this.roundA, ")");
    }, e.prototype.toPercentageRgb = function() {
      var t = function(n) {
        return "".concat(Math.round(rt(n, 255) * 100), "%");
      };
      return {
        r: t(this.r),
        g: t(this.g),
        b: t(this.b),
        a: this.a
      };
    }, e.prototype.toPercentageRgbString = function() {
      var t = function(n) {
        return Math.round(rt(n, 255) * 100);
      };
      return this.a === 1 ? "rgb(".concat(t(this.r), "%, ").concat(t(this.g), "%, ").concat(t(this.b), "%)") : "rgba(".concat(t(this.r), "%, ").concat(t(this.g), "%, ").concat(t(this.b), "%, ").concat(this.roundA, ")");
    }, e.prototype.toName = function() {
      if (this.a === 0)
        return "transparent";
      if (this.a < 1)
        return !1;
      for (var t = "#" + gd(this.r, this.g, this.b, !1), n = 0, r = Object.entries(Lc); n < r.length; n++) {
        var s = r[n], o = s[0], i = s[1];
        if (t === i)
          return o;
      }
      return !1;
    }, e.prototype.toString = function(t) {
      var n = !!t;
      t = t ?? this.format;
      var r = !1, s = this.a < 1 && this.a >= 0, o = !n && s && (t.startsWith("hex") || t === "name");
      return o ? t === "name" && this.a === 0 ? this.toName() : this.toRgbString() : (t === "rgb" && (r = this.toRgbString()), t === "prgb" && (r = this.toPercentageRgbString()), (t === "hex" || t === "hex6") && (r = this.toHexString()), t === "hex3" && (r = this.toHexString(!0)), t === "hex4" && (r = this.toHex8String(!0)), t === "hex8" && (r = this.toHex8String()), t === "name" && (r = this.toName()), t === "hsl" && (r = this.toHslString()), t === "hsv" && (r = this.toHsvString()), r || this.toHexString());
    }, e.prototype.toNumber = function() {
      return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    }, e.prototype.clone = function() {
      return new e(this.toString());
    }, e.prototype.lighten = function(t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return n.l += t / 100, n.l = $o(n.l), new e(n);
    }, e.prototype.brighten = function(t) {
      t === void 0 && (t = 10);
      var n = this.toRgb();
      return n.r = Math.max(0, Math.min(255, n.r - Math.round(255 * -(t / 100)))), n.g = Math.max(0, Math.min(255, n.g - Math.round(255 * -(t / 100)))), n.b = Math.max(0, Math.min(255, n.b - Math.round(255 * -(t / 100)))), new e(n);
    }, e.prototype.darken = function(t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return n.l -= t / 100, n.l = $o(n.l), new e(n);
    }, e.prototype.tint = function(t) {
      return t === void 0 && (t = 10), this.mix("white", t);
    }, e.prototype.shade = function(t) {
      return t === void 0 && (t = 10), this.mix("black", t);
    }, e.prototype.desaturate = function(t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return n.s -= t / 100, n.s = $o(n.s), new e(n);
    }, e.prototype.saturate = function(t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return n.s += t / 100, n.s = $o(n.s), new e(n);
    }, e.prototype.greyscale = function() {
      return this.desaturate(100);
    }, e.prototype.spin = function(t) {
      var n = this.toHsl(), r = (n.h + t) % 360;
      return n.h = r < 0 ? 360 + r : r, new e(n);
    }, e.prototype.mix = function(t, n) {
      n === void 0 && (n = 50);
      var r = this.toRgb(), s = new e(t).toRgb(), o = n / 100, i = {
        r: (s.r - r.r) * o + r.r,
        g: (s.g - r.g) * o + r.g,
        b: (s.b - r.b) * o + r.b,
        a: (s.a - r.a) * o + r.a
      };
      return new e(i);
    }, e.prototype.analogous = function(t, n) {
      t === void 0 && (t = 6), n === void 0 && (n = 30);
      var r = this.toHsl(), s = 360 / n, o = [this];
      for (r.h = (r.h - (s * t >> 1) + 720) % 360; --t; )
        r.h = (r.h + s) % 360, o.push(new e(r));
      return o;
    }, e.prototype.complement = function() {
      var t = this.toHsl();
      return t.h = (t.h + 180) % 360, new e(t);
    }, e.prototype.monochromatic = function(t) {
      t === void 0 && (t = 6);
      for (var n = this.toHsv(), r = n.h, s = n.s, o = n.v, i = [], a = 1 / t; t--; )
        i.push(new e({ h: r, s, v: o })), o = (o + a) % 1;
      return i;
    }, e.prototype.splitcomplement = function() {
      var t = this.toHsl(), n = t.h;
      return [
        this,
        new e({ h: (n + 72) % 360, s: t.s, l: t.l }),
        new e({ h: (n + 216) % 360, s: t.s, l: t.l })
      ];
    }, e.prototype.onBackground = function(t) {
      var n = this.toRgb(), r = new e(t).toRgb(), s = n.a + r.a * (1 - n.a);
      return new e({
        r: (n.r * n.a + r.r * r.a * (1 - n.a)) / s,
        g: (n.g * n.a + r.g * r.a * (1 - n.a)) / s,
        b: (n.b * n.a + r.b * r.a * (1 - n.a)) / s,
        a: s
      });
    }, e.prototype.triad = function() {
      return this.polyad(3);
    }, e.prototype.tetrad = function() {
      return this.polyad(4);
    }, e.prototype.polyad = function(t) {
      for (var n = this.toHsl(), r = n.h, s = [this], o = 360 / t, i = 1; i < t; i++)
        s.push(new e({ h: (r + i * o) % 360, s: n.s, l: n.l }));
      return s;
    }, e.prototype.equals = function(t) {
      return this.toRgbString() === new e(t).toRgbString();
    }, e;
  }()
);
function Tn(e, t = 20) {
  return e.mix("#141414", t).toString();
}
function _8(e) {
  const t = ws(), n = Se("button");
  return I(() => {
    let r = {};
    const s = e.color;
    if (s) {
      const o = new v8(s), i = e.dark ? o.tint(20).toString() : Tn(o, 20);
      if (e.plain)
        r = n.cssVarBlock({
          "bg-color": e.dark ? Tn(o, 90) : o.tint(90).toString(),
          "text-color": s,
          "border-color": e.dark ? Tn(o, 50) : o.tint(50).toString(),
          "hover-text-color": `var(${n.cssVarName("color-white")})`,
          "hover-bg-color": s,
          "hover-border-color": s,
          "active-bg-color": i,
          "active-text-color": `var(${n.cssVarName("color-white")})`,
          "active-border-color": i
        }), t.value && (r[n.cssVarBlockName("disabled-bg-color")] = e.dark ? Tn(o, 90) : o.tint(90).toString(), r[n.cssVarBlockName("disabled-text-color")] = e.dark ? Tn(o, 50) : o.tint(50).toString(), r[n.cssVarBlockName("disabled-border-color")] = e.dark ? Tn(o, 80) : o.tint(80).toString());
      else {
        const a = e.dark ? Tn(o, 30) : o.tint(30).toString(), c = o.isDark() ? `var(${n.cssVarName("color-white")})` : `var(${n.cssVarName("color-black")})`;
        if (r = n.cssVarBlock({
          "bg-color": s,
          "text-color": c,
          "border-color": s,
          "hover-bg-color": a,
          "hover-text-color": c,
          "hover-border-color": a,
          "active-bg-color": i,
          "active-border-color": i
        }), t.value) {
          const u = e.dark ? Tn(o, 50) : o.tint(50).toString();
          r[n.cssVarBlockName("disabled-bg-color")] = u, r[n.cssVarBlockName("disabled-text-color")] = e.dark ? "rgba(255, 255, 255, 0.5)" : `var(${n.cssVarName("color-white")})`, r[n.cssVarBlockName("disabled-border-color")] = u;
        }
      }
    }
    return r;
  });
}
const b8 = H({
  name: "ElButton"
}), y8 = /* @__PURE__ */ H({
  ...b8,
  props: Tc,
  emits: o8,
  setup(e, { expose: t, emit: n }) {
    const r = e, s = _8(r), o = Se("button"), { _ref: i, _size: a, _type: c, _disabled: u, _props: d, shouldAddSpace: l, handleClick: m } = t8(r, n);
    return t({
      ref: i,
      size: a,
      type: c,
      disabled: u,
      shouldAddSpace: l
    }), (f, v) => (b(), X(lt(f.tag), je({
      ref_key: "_ref",
      ref: i
    }, _(d), {
      class: [
        _(o).b(),
        _(o).m(_(c)),
        _(o).m(_(a)),
        _(o).is("disabled", _(u)),
        _(o).is("loading", f.loading),
        _(o).is("plain", f.plain),
        _(o).is("round", f.round),
        _(o).is("circle", f.circle),
        _(o).is("text", f.text),
        _(o).is("link", f.link),
        _(o).is("has-bg", f.bg)
      ],
      style: _(s),
      onClick: _(m)
    }), {
      default: Y(() => [
        f.loading ? (b(), x(Pe, { key: 0 }, [
          f.$slots.loading ? ne(f.$slots, "loading", { key: 0 }) : (b(), X(_(bt), {
            key: 1,
            class: j(_(o).is("loading"))
          }, {
            default: Y(() => [
              (b(), X(lt(f.loadingIcon)))
            ]),
            _: 1
          }, 8, ["class"]))
        ], 64)) : f.icon || f.$slots.icon ? (b(), X(_(bt), { key: 1 }, {
          default: Y(() => [
            f.icon ? (b(), X(lt(f.icon), { key: 0 })) : ne(f.$slots, "icon", { key: 1 })
          ]),
          _: 3
        })) : Q("v-if", !0),
        f.$slots.default ? (b(), x("span", {
          key: 2,
          class: j({ [_(o).em("text", "expand")]: _(l) })
        }, [
          ne(f.$slots, "default")
        ], 2)) : Q("v-if", !0)
      ]),
      _: 3
    }, 16, ["class", "style", "onClick"]));
  }
});
var w8 = /* @__PURE__ */ ye(y8, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button.vue"]]);
const k8 = {
  size: Tc.size,
  type: Tc.type
}, C8 = H({
  name: "ElButtonGroup"
}), x8 = /* @__PURE__ */ H({
  ...C8,
  props: k8,
  setup(e) {
    const t = e;
    kt(Kh, qn({
      size: Rt(t, "size"),
      type: Rt(t, "type")
    }));
    const n = Se("button");
    return (r, s) => (b(), x("div", {
      class: j(`${_(n).b("group")}`)
    }, [
      ne(r.$slots, "default")
    ], 2));
  }
});
var Yh = /* @__PURE__ */ ye(x8, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button-group.vue"]]);
const vd = Ft(w8, {
  ButtonGroup: Yh
});
vs(Yh);
const On = /* @__PURE__ */ new Map();
let _d;
ut && (document.addEventListener("mousedown", (e) => _d = e), document.addEventListener("mouseup", (e) => {
  for (const t of On.values())
    for (const { documentHandler: n } of t)
      n(e, _d);
}));
function bd(e, t) {
  let n = [];
  return Array.isArray(t.arg) ? n = t.arg : to(t.arg) && n.push(t.arg), function(r, s) {
    const o = t.instance.popperRef, i = r.target, a = s == null ? void 0 : s.target, c = !t || !t.instance, u = !i || !a, d = e.contains(i) || e.contains(a), l = e === i, m = n.length && n.some((v) => v == null ? void 0 : v.contains(i)) || n.length && n.includes(a), f = o && (o.contains(i) || o.contains(a));
    c || u || d || l || m || f || t.value(r, s);
  };
}
const Jh = {
  beforeMount(e, t) {
    On.has(e) || On.set(e, []), On.get(e).push({
      documentHandler: bd(e, t),
      bindingFn: t.value
    });
  },
  updated(e, t) {
    On.has(e) || On.set(e, []);
    const n = On.get(e), r = n.findIndex((o) => o.bindingFn === t.oldValue), s = {
      documentHandler: bd(e, t),
      bindingFn: t.value
    };
    r >= 0 ? n.splice(r, 1, s) : n.push(s);
  },
  unmounted(e) {
    On.delete(e);
  }
}, Qh = Me({
  type: {
    type: String,
    values: ["success", "info", "warning", "danger", ""],
    default: ""
  },
  closable: Boolean,
  disableTransitions: Boolean,
  hit: Boolean,
  color: {
    type: String,
    default: ""
  },
  size: {
    type: String,
    values: fo,
    default: ""
  },
  effect: {
    type: String,
    values: ["dark", "light", "plain"],
    default: "light"
  },
  round: Boolean
}), S8 = {
  close: (e) => e instanceof MouseEvent,
  click: (e) => e instanceof MouseEvent
}, E8 = H({
  name: "ElTag"
}), A8 = /* @__PURE__ */ H({
  ...E8,
  props: Qh,
  emits: S8,
  setup(e, { emit: t }) {
    const n = e, r = go(), s = Se("tag"), o = I(() => {
      const { type: c, hit: u, effect: d, closable: l, round: m } = n;
      return [
        s.b(),
        s.is("closable", l),
        s.m(c),
        s.m(r.value),
        s.m(d),
        s.is("hit", u),
        s.is("round", m)
      ];
    }), i = (c) => {
      t("close", c);
    }, a = (c) => {
      t("click", c);
    };
    return (c, u) => c.disableTransitions ? (b(), x("span", {
      key: 0,
      class: j(_(o)),
      style: qe({ backgroundColor: c.color }),
      onClick: a
    }, [
      p("span", {
        class: j(_(s).e("content"))
      }, [
        ne(c.$slots, "default")
      ], 2),
      c.closable ? (b(), X(_(bt), {
        key: 0,
        class: j(_(s).e("close")),
        onClick: Ke(i, ["stop"])
      }, {
        default: Y(() => [
          ue(_(Mc))
        ]),
        _: 1
      }, 8, ["class", "onClick"])) : Q("v-if", !0)
    ], 6)) : (b(), X(nr, {
      key: 1,
      name: `${_(s).namespace.value}-zoom-in-center`,
      appear: ""
    }, {
      default: Y(() => [
        p("span", {
          class: j(_(o)),
          style: qe({ backgroundColor: c.color }),
          onClick: a
        }, [
          p("span", {
            class: j(_(s).e("content"))
          }, [
            ne(c.$slots, "default")
          ], 2),
          c.closable ? (b(), X(_(bt), {
            key: 0,
            class: j(_(s).e("close")),
            onClick: Ke(i, ["stop"])
          }, {
            default: Y(() => [
              ue(_(Mc))
            ]),
            _: 1
          }, 8, ["class", "onClick"])) : Q("v-if", !0)
        ], 6)
      ]),
      _: 3
    }, 8, ["name"]));
  }
});
var $8 = /* @__PURE__ */ ye(A8, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tag/src/tag.vue"]]);
const M8 = Ft($8), I8 = Me({
  color: {
    type: ge(Object),
    required: !0
  },
  vertical: {
    type: Boolean,
    default: !1
  }
});
let Xs = !1;
function io(e, t) {
  if (!ut)
    return;
  const n = function(o) {
    var i;
    (i = t.drag) == null || i.call(t, o);
  }, r = function(o) {
    var i;
    document.removeEventListener("mousemove", n), document.removeEventListener("mouseup", r), document.removeEventListener("touchmove", n), document.removeEventListener("touchend", r), document.onselectstart = null, document.ondragstart = null, Xs = !1, (i = t.end) == null || i.call(t, o);
  }, s = function(o) {
    var i;
    Xs || (o.preventDefault(), document.onselectstart = () => !1, document.ondragstart = () => !1, document.addEventListener("mousemove", n), document.addEventListener("mouseup", r), document.addEventListener("touchmove", n), document.addEventListener("touchend", r), Xs = !0, (i = t.start) == null || i.call(t, o));
  };
  e.addEventListener("mousedown", s), e.addEventListener("touchstart", s);
}
const T8 = (e) => {
  const t = ot(), n = _n(), r = _n();
  function s(i) {
    i.target !== n.value && o(i);
  }
  function o(i) {
    if (!r.value || !n.value)
      return;
    const c = t.vnode.el.getBoundingClientRect(), { clientX: u, clientY: d } = ol(i);
    if (e.vertical) {
      let l = d - c.top;
      l = Math.max(n.value.offsetHeight / 2, l), l = Math.min(l, c.height - n.value.offsetHeight / 2), e.color.set("alpha", Math.round((l - n.value.offsetHeight / 2) / (c.height - n.value.offsetHeight) * 100));
    } else {
      let l = u - c.left;
      l = Math.max(n.value.offsetWidth / 2, l), l = Math.min(l, c.width - n.value.offsetWidth / 2), e.color.set("alpha", Math.round((l - n.value.offsetWidth / 2) / (c.width - n.value.offsetWidth) * 100));
    }
  }
  return {
    thumb: n,
    bar: r,
    handleDrag: o,
    handleClick: s
  };
}, L8 = (e, {
  bar: t,
  thumb: n,
  handleDrag: r
}) => {
  const s = ot(), o = Se("color-alpha-slider"), i = D(0), a = D(0), c = D();
  function u() {
    if (!n.value || e.vertical)
      return 0;
    const w = s.vnode.el, k = e.color.get("alpha");
    return w ? Math.round(k * (w.offsetWidth - n.value.offsetWidth / 2) / 100) : 0;
  }
  function d() {
    if (!n.value)
      return 0;
    const w = s.vnode.el;
    if (!e.vertical)
      return 0;
    const k = e.color.get("alpha");
    return w ? Math.round(k * (w.offsetHeight - n.value.offsetHeight / 2) / 100) : 0;
  }
  function l() {
    if (e.color && e.color.value) {
      const { r: w, g: k, b: C } = e.color.toRgb();
      return `linear-gradient(to right, rgba(${w}, ${k}, ${C}, 0) 0%, rgba(${w}, ${k}, ${C}, 1) 100%)`;
    }
    return "";
  }
  function m() {
    i.value = u(), a.value = d(), c.value = l();
  }
  Be(() => {
    if (!t.value || !n.value)
      return;
    const w = {
      drag: (k) => {
        r(k);
      },
      end: (k) => {
        r(k);
      }
    };
    io(t.value, w), io(n.value, w), m();
  }), ae(() => e.color.get("alpha"), () => m()), ae(() => e.color.value, () => m());
  const f = I(() => [o.b(), o.is("vertical", e.vertical)]), v = I(() => o.e("bar")), g = I(() => o.e("thumb")), y = I(() => ({ background: c.value })), h = I(() => ({
    left: wr(i.value),
    top: wr(a.value)
  }));
  return { rootKls: f, barKls: v, barStyle: y, thumbKls: g, thumbStyle: h, update: m };
}, O8 = "ElColorAlphaSlider", R8 = H({
  name: O8
}), P8 = /* @__PURE__ */ H({
  ...R8,
  props: I8,
  setup(e, { expose: t }) {
    const n = e, { bar: r, thumb: s, handleDrag: o, handleClick: i } = T8(n), { rootKls: a, barKls: c, barStyle: u, thumbKls: d, thumbStyle: l, update: m } = L8(n, {
      bar: r,
      thumb: s,
      handleDrag: o
    });
    return t({
      update: m,
      bar: r,
      thumb: s
    }), (f, v) => (b(), x("div", {
      class: j(_(a))
    }, [
      p("div", {
        ref_key: "bar",
        ref: r,
        class: j(_(c)),
        style: qe(_(u)),
        onClick: v[0] || (v[0] = (...g) => _(i) && _(i)(...g))
      }, null, 6),
      p("div", {
        ref_key: "thumb",
        ref: s,
        class: j(_(d)),
        style: qe(_(l))
      }, null, 6)
    ], 2));
  }
});
var B8 = /* @__PURE__ */ ye(P8, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/color-picker/src/components/alpha-slider.vue"]]);
const z8 = H({
  name: "ElColorHueSlider",
  props: {
    color: {
      type: Object,
      required: !0
    },
    vertical: Boolean
  },
  setup(e) {
    const t = Se("color-hue-slider"), n = ot(), r = D(), s = D(), o = D(0), i = D(0), a = I(() => e.color.get("hue"));
    ae(() => a.value, () => {
      m();
    });
    function c(f) {
      f.target !== r.value && u(f);
    }
    function u(f) {
      if (!s.value || !r.value)
        return;
      const g = n.vnode.el.getBoundingClientRect(), { clientX: y, clientY: h } = ol(f);
      let w;
      if (e.vertical) {
        let k = h - g.top;
        k = Math.min(k, g.height - r.value.offsetHeight / 2), k = Math.max(r.value.offsetHeight / 2, k), w = Math.round((k - r.value.offsetHeight / 2) / (g.height - r.value.offsetHeight) * 360);
      } else {
        let k = y - g.left;
        k = Math.min(k, g.width - r.value.offsetWidth / 2), k = Math.max(r.value.offsetWidth / 2, k), w = Math.round((k - r.value.offsetWidth / 2) / (g.width - r.value.offsetWidth) * 360);
      }
      e.color.set("hue", w);
    }
    function d() {
      if (!r.value)
        return 0;
      const f = n.vnode.el;
      if (e.vertical)
        return 0;
      const v = e.color.get("hue");
      return f ? Math.round(v * (f.offsetWidth - r.value.offsetWidth / 2) / 360) : 0;
    }
    function l() {
      if (!r.value)
        return 0;
      const f = n.vnode.el;
      if (!e.vertical)
        return 0;
      const v = e.color.get("hue");
      return f ? Math.round(v * (f.offsetHeight - r.value.offsetHeight / 2) / 360) : 0;
    }
    function m() {
      o.value = d(), i.value = l();
    }
    return Be(() => {
      if (!s.value || !r.value)
        return;
      const f = {
        drag: (v) => {
          u(v);
        },
        end: (v) => {
          u(v);
        }
      };
      io(s.value, f), io(r.value, f), m();
    }), {
      bar: s,
      thumb: r,
      thumbLeft: o,
      thumbTop: i,
      hueValue: a,
      handleClick: c,
      update: m,
      ns: t
    };
  }
});
function D8(e, t, n, r, s, o) {
  return b(), x("div", {
    class: j([e.ns.b(), e.ns.is("vertical", e.vertical)])
  }, [
    p("div", {
      ref: "bar",
      class: j(e.ns.e("bar")),
      onClick: t[0] || (t[0] = (...i) => e.handleClick && e.handleClick(...i))
    }, null, 2),
    p("div", {
      ref: "thumb",
      class: j(e.ns.e("thumb")),
      style: qe({
        left: e.thumbLeft + "px",
        top: e.thumbTop + "px"
      })
    }, null, 6)
  ], 2);
}
var N8 = /* @__PURE__ */ ye(z8, [["render", D8], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/color-picker/src/components/hue-slider.vue"]]);
const q8 = Me({
  modelValue: String,
  id: String,
  showAlpha: Boolean,
  colorFormat: String,
  disabled: Boolean,
  size: wl,
  popperClass: {
    type: String,
    default: ""
  },
  label: {
    type: String,
    default: void 0
  },
  tabindex: {
    type: [String, Number],
    default: 0
  },
  predefine: {
    type: ge(Array)
  },
  validateEvent: {
    type: Boolean,
    default: !0
  }
}), F8 = {
  [_t]: (e) => Xt(e) || er(e),
  [ul]: (e) => Xt(e) || er(e),
  activeChange: (e) => Xt(e) || er(e),
  focus: (e) => e instanceof FocusEvent,
  blur: (e) => e instanceof FocusEvent
}, e2 = Symbol("colorPickerContextKey"), yd = function(e, t, n) {
  return [
    e,
    t * n / ((e = (2 - t) * n) < 1 ? e : 2 - e) || 0,
    e / 2
  ];
}, j8 = function(e) {
  return typeof e == "string" && e.includes(".") && Number.parseFloat(e) === 1;
}, H8 = function(e) {
  return typeof e == "string" && e.includes("%");
}, mr = function(e, t) {
  j8(e) && (e = "100%");
  const n = H8(e);
  return e = Math.min(t, Math.max(0, Number.parseFloat(`${e}`))), n && (e = Number.parseInt(`${e * t}`, 10) / 100), Math.abs(e - t) < 1e-6 ? 1 : e % t / Number.parseFloat(t);
}, wd = {
  10: "A",
  11: "B",
  12: "C",
  13: "D",
  14: "E",
  15: "F"
}, Do = (e) => {
  e = Math.min(Math.round(e), 255);
  const t = Math.floor(e / 16), n = e % 16;
  return `${wd[t] || t}${wd[n] || n}`;
}, kd = function({ r: e, g: t, b: n }) {
  return Number.isNaN(+e) || Number.isNaN(+t) || Number.isNaN(+n) ? "" : `#${Do(e)}${Do(t)}${Do(n)}`;
}, Ys = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15
}, Kn = function(e) {
  return e.length === 2 ? (Ys[e[0].toUpperCase()] || +e[0]) * 16 + (Ys[e[1].toUpperCase()] || +e[1]) : Ys[e[1].toUpperCase()] || +e[1];
}, V8 = function(e, t, n) {
  t = t / 100, n = n / 100;
  let r = t;
  const s = Math.max(n, 0.01);
  n *= 2, t *= n <= 1 ? n : 2 - n, r *= s <= 1 ? s : 2 - s;
  const o = (n + t) / 2, i = n === 0 ? 2 * r / (s + r) : 2 * t / (n + t);
  return {
    h: e,
    s: i * 100,
    v: o * 100
  };
}, Cd = (e, t, n) => {
  e = mr(e, 255), t = mr(t, 255), n = mr(n, 255);
  const r = Math.max(e, t, n), s = Math.min(e, t, n);
  let o;
  const i = r, a = r - s, c = r === 0 ? 0 : a / r;
  if (r === s)
    o = 0;
  else {
    switch (r) {
      case e: {
        o = (t - n) / a + (t < n ? 6 : 0);
        break;
      }
      case t: {
        o = (n - e) / a + 2;
        break;
      }
      case n: {
        o = (e - t) / a + 4;
        break;
      }
    }
    o /= 6;
  }
  return { h: o * 360, s: c * 100, v: i * 100 };
}, qr = function(e, t, n) {
  e = mr(e, 360) * 6, t = mr(t, 100), n = mr(n, 100);
  const r = Math.floor(e), s = e - r, o = n * (1 - t), i = n * (1 - s * t), a = n * (1 - (1 - s) * t), c = r % 6, u = [n, i, o, o, a, n][c], d = [a, n, n, i, o, o][c], l = [o, o, a, n, n, i][c];
  return {
    r: Math.round(u * 255),
    g: Math.round(d * 255),
    b: Math.round(l * 255)
  };
};
class Wr {
  constructor(t = {}) {
    this._hue = 0, this._saturation = 100, this._value = 100, this._alpha = 100, this.enableAlpha = !1, this.format = "hex", this.value = "";
    for (const n in t)
      Wo(t, n) && (this[n] = t[n]);
    t.value ? this.fromString(t.value) : this.doOnChange();
  }
  set(t, n) {
    if (arguments.length === 1 && typeof t == "object") {
      for (const r in t)
        Wo(t, r) && this.set(r, t[r]);
      return;
    }
    this[`_${t}`] = n, this.doOnChange();
  }
  get(t) {
    return t === "alpha" ? Math.floor(this[`_${t}`]) : this[`_${t}`];
  }
  toRgb() {
    return qr(this._hue, this._saturation, this._value);
  }
  fromString(t) {
    if (!t) {
      this._hue = 0, this._saturation = 100, this._value = 100, this.doOnChange();
      return;
    }
    const n = (r, s, o) => {
      this._hue = Math.max(0, Math.min(360, r)), this._saturation = Math.max(0, Math.min(100, s)), this._value = Math.max(0, Math.min(100, o)), this.doOnChange();
    };
    if (t.includes("hsl")) {
      const r = t.replace(/hsla|hsl|\(|\)/gm, "").split(/\s|,/g).filter((s) => s !== "").map((s, o) => o > 2 ? Number.parseFloat(s) : Number.parseInt(s, 10));
      if (r.length === 4 ? this._alpha = Number.parseFloat(r[3]) * 100 : r.length === 3 && (this._alpha = 100), r.length >= 3) {
        const { h: s, s: o, v: i } = V8(r[0], r[1], r[2]);
        n(s, o, i);
      }
    } else if (t.includes("hsv")) {
      const r = t.replace(/hsva|hsv|\(|\)/gm, "").split(/\s|,/g).filter((s) => s !== "").map((s, o) => o > 2 ? Number.parseFloat(s) : Number.parseInt(s, 10));
      r.length === 4 ? this._alpha = Number.parseFloat(r[3]) * 100 : r.length === 3 && (this._alpha = 100), r.length >= 3 && n(r[0], r[1], r[2]);
    } else if (t.includes("rgb")) {
      const r = t.replace(/rgba|rgb|\(|\)/gm, "").split(/\s|,/g).filter((s) => s !== "").map((s, o) => o > 2 ? Number.parseFloat(s) : Number.parseInt(s, 10));
      if (r.length === 4 ? this._alpha = Number.parseFloat(r[3]) * 100 : r.length === 3 && (this._alpha = 100), r.length >= 3) {
        const { h: s, s: o, v: i } = Cd(r[0], r[1], r[2]);
        n(s, o, i);
      }
    } else if (t.includes("#")) {
      const r = t.replace("#", "").trim();
      if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$|^[0-9a-fA-F]{8}$/.test(r))
        return;
      let s, o, i;
      r.length === 3 ? (s = Kn(r[0] + r[0]), o = Kn(r[1] + r[1]), i = Kn(r[2] + r[2])) : (r.length === 6 || r.length === 8) && (s = Kn(r.slice(0, 2)), o = Kn(r.slice(2, 4)), i = Kn(r.slice(4, 6))), r.length === 8 ? this._alpha = Kn(r.slice(6)) / 255 * 100 : (r.length === 3 || r.length === 6) && (this._alpha = 100);
      const { h: a, s: c, v: u } = Cd(s, o, i);
      n(a, c, u);
    }
  }
  compare(t) {
    return Math.abs(t._hue - this._hue) < 2 && Math.abs(t._saturation - this._saturation) < 1 && Math.abs(t._value - this._value) < 1 && Math.abs(t._alpha - this._alpha) < 1;
  }
  doOnChange() {
    const { _hue: t, _saturation: n, _value: r, _alpha: s, format: o } = this;
    if (this.enableAlpha)
      switch (o) {
        case "hsl": {
          const i = yd(t, n / 100, r / 100);
          this.value = `hsla(${t}, ${Math.round(i[1] * 100)}%, ${Math.round(i[2] * 100)}%, ${this.get("alpha") / 100})`;
          break;
        }
        case "hsv": {
          this.value = `hsva(${t}, ${Math.round(n)}%, ${Math.round(r)}%, ${this.get("alpha") / 100})`;
          break;
        }
        case "hex": {
          this.value = `${kd(qr(t, n, r))}${Do(s * 255 / 100)}`;
          break;
        }
        default: {
          const { r: i, g: a, b: c } = qr(t, n, r);
          this.value = `rgba(${i}, ${a}, ${c}, ${this.get("alpha") / 100})`;
        }
      }
    else
      switch (o) {
        case "hsl": {
          const i = yd(t, n / 100, r / 100);
          this.value = `hsl(${t}, ${Math.round(i[1] * 100)}%, ${Math.round(i[2] * 100)}%)`;
          break;
        }
        case "hsv": {
          this.value = `hsv(${t}, ${Math.round(n)}%, ${Math.round(r)}%)`;
          break;
        }
        case "rgb": {
          const { r: i, g: a, b: c } = qr(t, n, r);
          this.value = `rgb(${i}, ${a}, ${c})`;
          break;
        }
        default:
          this.value = kd(qr(t, n, r));
      }
  }
}
const U8 = H({
  props: {
    colors: {
      type: Array,
      required: !0
    },
    color: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const t = Se("color-predefine"), { currentColor: n } = $e(e2), r = D(o(e.colors, e.color));
    ae(() => n.value, (i) => {
      const a = new Wr();
      a.fromString(i), r.value.forEach((c) => {
        c.selected = a.compare(c);
      });
    }), Jc(() => {
      r.value = o(e.colors, e.color);
    });
    function s(i) {
      e.color.fromString(e.colors[i]);
    }
    function o(i, a) {
      return i.map((c) => {
        const u = new Wr();
        return u.enableAlpha = !0, u.format = "rgba", u.fromString(c), u.selected = u.value === a.value, u;
      });
    }
    return {
      rgbaColors: r,
      handleSelect: s,
      ns: t
    };
  }
}), Z8 = ["onClick"];
function W8(e, t, n, r, s, o) {
  return b(), x("div", {
    class: j(e.ns.b())
  }, [
    p("div", {
      class: j(e.ns.e("colors"))
    }, [
      (b(!0), x(Pe, null, Je(e.rgbaColors, (i, a) => (b(), x("div", {
        key: e.colors[a],
        class: j([
          e.ns.e("color-selector"),
          e.ns.is("alpha", i._alpha < 100),
          { selected: i.selected }
        ]),
        onClick: (c) => e.handleSelect(a)
      }, [
        p("div", {
          style: qe({ backgroundColor: i.value })
        }, null, 4)
      ], 10, Z8))), 128))
    ], 2)
  ], 2);
}
var G8 = /* @__PURE__ */ ye(U8, [["render", W8], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/color-picker/src/components/predefine.vue"]]);
const K8 = H({
  name: "ElSlPanel",
  props: {
    color: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const t = Se("color-svpanel"), n = ot(), r = D(0), s = D(0), o = D("hsl(0, 100%, 50%)"), i = I(() => {
      const u = e.color.get("hue"), d = e.color.get("value");
      return { hue: u, value: d };
    });
    function a() {
      const u = e.color.get("saturation"), d = e.color.get("value"), l = n.vnode.el, { clientWidth: m, clientHeight: f } = l;
      s.value = u * m / 100, r.value = (100 - d) * f / 100, o.value = `hsl(${e.color.get("hue")}, 100%, 50%)`;
    }
    function c(u) {
      const l = n.vnode.el.getBoundingClientRect(), { clientX: m, clientY: f } = ol(u);
      let v = m - l.left, g = f - l.top;
      v = Math.max(0, v), v = Math.min(v, l.width), g = Math.max(0, g), g = Math.min(g, l.height), s.value = v, r.value = g, e.color.set({
        saturation: v / l.width * 100,
        value: 100 - g / l.height * 100
      });
    }
    return ae(() => i.value, () => {
      a();
    }), Be(() => {
      io(n.vnode.el, {
        drag: (u) => {
          c(u);
        },
        end: (u) => {
          c(u);
        }
      }), a();
    }), {
      cursorTop: r,
      cursorLeft: s,
      background: o,
      colorValue: i,
      handleDrag: c,
      update: a,
      ns: t
    };
  }
}), X8 = /* @__PURE__ */ p("div", null, null, -1), Y8 = [
  X8
];
function J8(e, t, n, r, s, o) {
  return b(), x("div", {
    class: j(e.ns.b()),
    style: qe({
      backgroundColor: e.background
    })
  }, [
    p("div", {
      class: j(e.ns.e("white"))
    }, null, 2),
    p("div", {
      class: j(e.ns.e("black"))
    }, null, 2),
    p("div", {
      class: j(e.ns.e("cursor")),
      style: qe({
        top: e.cursorTop + "px",
        left: e.cursorLeft + "px"
      })
    }, Y8, 6)
  ], 6);
}
var Q8 = /* @__PURE__ */ ye(K8, [["render", J8], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/color-picker/src/components/sv-panel.vue"]]);
const eC = ["onKeydown"], tC = ["id", "aria-label", "aria-labelledby", "aria-description", "aria-disabled", "tabindex"], nC = H({
  name: "ElColorPicker"
}), rC = /* @__PURE__ */ H({
  ...nC,
  props: q8,
  emits: F8,
  setup(e, { expose: t, emit: n }) {
    const r = e, { t: s } = en(), o = Se("color"), { formItem: i } = ks(), a = go(), c = ws(), { inputId: u, isLabeledByFormItem: d } = qh(r, {
      formItemContext: i
    }), l = D(), m = D(), f = D(), v = D(), g = D(), y = D(), {
      isFocused: h,
      handleFocus: w,
      handleBlur: k
    } = Nh(g, {
      beforeBlur(oe) {
        var _e;
        return (_e = v.value) == null ? void 0 : _e.isFocusInsideContent(oe);
      },
      afterBlur() {
        z(!1), W();
      }
    }), C = (oe) => {
      if (c.value)
        return nn();
      w(oe);
    };
    let A = !0;
    const E = qn(new Wr({
      enableAlpha: r.showAlpha,
      format: r.colorFormat || "",
      value: r.modelValue
    })), $ = D(!1), M = D(!1), O = D(""), R = I(() => !r.modelValue && !M.value ? "transparent" : U(E, r.showAlpha)), B = I(() => !r.modelValue && !M.value ? "" : E.value), V = I(() => d.value ? void 0 : r.label || s("el.colorpicker.defaultLabel")), re = I(() => d.value ? i == null ? void 0 : i.labelId : void 0), P = I(() => [
      o.b("picker"),
      o.is("disabled", c.value),
      o.bm("picker", a.value),
      o.is("focused", h.value)
    ]);
    function U(oe, _e) {
      if (!(oe instanceof Wr))
        throw new TypeError("color should be instance of _color Class");
      const { r: He, g: et, b: gt } = oe.toRgb();
      return _e ? `rgba(${He}, ${et}, ${gt}, ${oe.get("alpha") / 100})` : `rgb(${He}, ${et}, ${gt})`;
    }
    function z(oe) {
      $.value = oe;
    }
    const N = Ac(z, 100, { leading: !0 });
    function F() {
      c.value || z(!0);
    }
    function Z() {
      N(!1), W();
    }
    function W() {
      Ae(() => {
        r.modelValue ? E.fromString(r.modelValue) : (E.value = "", Ae(() => {
          M.value = !1;
        }));
      });
    }
    function pe() {
      c.value || N(!$.value);
    }
    function le() {
      E.fromString(O.value);
    }
    function Ee() {
      const oe = E.value;
      n(_t, oe), n("change", oe), r.validateEvent && (i == null || i.validate("change").catch((_e) => void 0)), N(!1), Ae(() => {
        const _e = new Wr({
          enableAlpha: r.showAlpha,
          format: r.colorFormat || "",
          value: r.modelValue
        });
        E.compare(_e) || W();
      });
    }
    function Oe() {
      N(!1), n(_t, null), n("change", null), r.modelValue !== null && r.validateEvent && (i == null || i.validate("change").catch((oe) => void 0)), W();
    }
    function ze(oe) {
      if ($.value && (Z(), h.value)) {
        const _e = new FocusEvent("focus", oe);
        k(_e);
      }
    }
    function Qe(oe) {
      oe.preventDefault(), oe.stopPropagation(), z(!1), W();
    }
    function ft(oe) {
      switch (oe.code) {
        case yn.enter:
        case yn.space:
          oe.preventDefault(), oe.stopPropagation(), F(), y.value.focus();
          break;
        case yn.esc:
          Qe(oe);
          break;
      }
    }
    function Ve() {
      g.value.focus();
    }
    function nn() {
      g.value.blur();
    }
    return Be(() => {
      r.modelValue && (O.value = B.value);
    }), ae(() => r.modelValue, (oe) => {
      oe ? oe && oe !== E.value && (A = !1, E.fromString(oe)) : M.value = !1;
    }), ae(() => B.value, (oe) => {
      O.value = oe, A && n("activeChange", oe), A = !0;
    }), ae(() => E.value, () => {
      !r.modelValue && !M.value && (M.value = !0);
    }), ae(() => $.value, () => {
      Ae(() => {
        var oe, _e, He;
        (oe = l.value) == null || oe.update(), (_e = m.value) == null || _e.update(), (He = f.value) == null || He.update();
      });
    }), kt(e2, {
      currentColor: B
    }), t({
      color: E,
      show: F,
      hide: Z,
      focus: Ve,
      blur: nn
    }), (oe, _e) => (b(), X(_(so), {
      ref_key: "popper",
      ref: v,
      visible: $.value,
      "show-arrow": !1,
      "fallback-placements": ["bottom", "top", "right", "left"],
      offset: 0,
      "gpu-acceleration": !1,
      "popper-class": [_(o).be("picker", "panel"), _(o).b("dropdown"), oe.popperClass],
      "stop-popper-mouse-event": !1,
      effect: "light",
      trigger: "click",
      transition: `${_(o).namespace.value}-zoom-in-top`,
      persistent: "",
      onHide: _e[2] || (_e[2] = (He) => z(!1))
    }, {
      content: Y(() => [
        Ye((b(), x("div", {
          onKeydown: at(Qe, ["esc"])
        }, [
          p("div", {
            class: j(_(o).be("dropdown", "main-wrapper"))
          }, [
            ue(N8, {
              ref_key: "hue",
              ref: l,
              class: "hue-slider",
              color: _(E),
              vertical: ""
            }, null, 8, ["color"]),
            ue(Q8, {
              ref_key: "sv",
              ref: m,
              color: _(E)
            }, null, 8, ["color"])
          ], 2),
          oe.showAlpha ? (b(), X(B8, {
            key: 0,
            ref_key: "alpha",
            ref: f,
            color: _(E)
          }, null, 8, ["color"])) : Q("v-if", !0),
          oe.predefine ? (b(), X(G8, {
            key: 1,
            ref: "predefine",
            color: _(E),
            colors: oe.predefine
          }, null, 8, ["color", "colors"])) : Q("v-if", !0),
          p("div", {
            class: j(_(o).be("dropdown", "btns"))
          }, [
            p("span", {
              class: j(_(o).be("dropdown", "value"))
            }, [
              ue(_(Cs), {
                ref_key: "inputRef",
                ref: y,
                modelValue: O.value,
                "onUpdate:modelValue": _e[0] || (_e[0] = (He) => O.value = He),
                "validate-event": !1,
                size: "small",
                onKeyup: at(le, ["enter"]),
                onBlur: le
              }, null, 8, ["modelValue", "onKeyup"])
            ], 2),
            ue(_(vd), {
              class: j(_(o).be("dropdown", "link-btn")),
              text: "",
              size: "small",
              onClick: Oe
            }, {
              default: Y(() => [
                _r(ve(_(s)("el.colorpicker.clear")), 1)
              ]),
              _: 1
            }, 8, ["class"]),
            ue(_(vd), {
              plain: "",
              size: "small",
              class: j(_(o).be("dropdown", "btn")),
              onClick: Ee
            }, {
              default: Y(() => [
                _r(ve(_(s)("el.colorpicker.confirm")), 1)
              ]),
              _: 1
            }, 8, ["class"])
          ], 2)
        ], 40, eC)), [
          [_(Jh), ze]
        ])
      ]),
      default: Y(() => [
        p("div", {
          id: _(u),
          ref_key: "triggerRef",
          ref: g,
          class: j(_(P)),
          role: "button",
          "aria-label": _(V),
          "aria-labelledby": _(re),
          "aria-description": _(s)("el.colorpicker.description", { color: oe.modelValue || "" }),
          "aria-disabled": _(c),
          tabindex: _(c) ? -1 : oe.tabindex,
          onKeydown: ft,
          onFocus: C,
          onBlur: _e[1] || (_e[1] = (...He) => _(k) && _(k)(...He))
        }, [
          _(c) ? (b(), x("div", {
            key: 0,
            class: j(_(o).be("picker", "mask"))
          }, null, 2)) : Q("v-if", !0),
          p("div", {
            class: j(_(o).be("picker", "trigger")),
            onClick: pe
          }, [
            p("span", {
              class: j([_(o).be("picker", "color"), _(o).is("alpha", oe.showAlpha)])
            }, [
              p("span", {
                class: j(_(o).be("picker", "color-inner")),
                style: qe({
                  backgroundColor: _(R)
                })
              }, [
                Ye(ue(_(bt), {
                  class: j([_(o).be("picker", "icon"), _(o).is("icon-arrow-down")])
                }, {
                  default: Y(() => [
                    ue(_(_h))
                  ]),
                  _: 1
                }, 8, ["class"]), [
                  [Jt, oe.modelValue || M.value]
                ]),
                Ye(ue(_(bt), {
                  class: j([_(o).be("picker", "empty"), _(o).is("icon-close")])
                }, {
                  default: Y(() => [
                    ue(_(Mc))
                  ]),
                  _: 1
                }, 8, ["class"]), [
                  [Jt, !oe.modelValue && !M.value]
                ])
              ], 6)
            ], 2)
          ], 2)
        ], 42, tC)
      ]),
      _: 1
    }, 8, ["visible", "popper-class", "transition"]));
  }
});
var oC = /* @__PURE__ */ ye(rC, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/color-picker/src/color-picker.vue"]]);
const sC = Ft(oC), iC = /* @__PURE__ */ H({
  inheritAttrs: !1
});
function aC(e, t, n, r, s, o) {
  return ne(e.$slots, "default");
}
var cC = /* @__PURE__ */ ye(iC, [["render", aC], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/collection/src/collection.vue"]]);
const lC = /* @__PURE__ */ H({
  name: "ElCollectionItem",
  inheritAttrs: !1
});
function uC(e, t, n, r, s, o) {
  return ne(e.$slots, "default");
}
var dC = /* @__PURE__ */ ye(lC, [["render", uC], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/collection/src/collection-item.vue"]]);
const fC = "data-el-collection-item", pC = (e) => {
  const t = `El${e}Collection`, n = `${t}Item`, r = Symbol(t), s = Symbol(n), o = {
    ...cC,
    name: t,
    setup() {
      const a = D(null), c = /* @__PURE__ */ new Map();
      kt(r, {
        itemMap: c,
        getItems: () => {
          const d = _(a);
          if (!d)
            return [];
          const l = Array.from(d.querySelectorAll(`[${fC}]`));
          return [...c.values()].sort((f, v) => l.indexOf(f.ref) - l.indexOf(v.ref));
        },
        collectionRef: a
      });
    }
  }, i = {
    ...dC,
    name: n,
    setup(a, { attrs: c }) {
      const u = D(null), d = $e(r, void 0);
      kt(s, {
        collectionItemRef: u
      }), Be(() => {
        const l = _(u);
        l && d.itemMap.set(l, {
          ref: l,
          ...c
        });
      }), Nt(() => {
        const l = _(u);
        d.itemMap.delete(l);
      });
    }
  };
  return {
    COLLECTION_INJECTION_KEY: r,
    COLLECTION_ITEM_INJECTION_KEY: s,
    ElCollection: o,
    ElCollectionItem: i
  };
}, Js = Me({
  trigger: oo.trigger,
  effect: {
    ...Mt.effect,
    default: "light"
  },
  type: {
    type: ge(String)
  },
  placement: {
    type: ge(String),
    default: "bottom"
  },
  popperOptions: {
    type: ge(Object),
    default: () => ({})
  },
  id: String,
  size: {
    type: String,
    default: ""
  },
  splitButton: Boolean,
  hideOnClick: {
    type: Boolean,
    default: !0
  },
  loop: {
    type: Boolean,
    default: !0
  },
  showTimeout: {
    type: Number,
    default: 150
  },
  hideTimeout: {
    type: Number,
    default: 150
  },
  tabindex: {
    type: ge([Number, String]),
    default: 0
  },
  maxHeight: {
    type: ge([Number, String]),
    default: ""
  },
  popperClass: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: !1
  },
  role: {
    type: String,
    default: "menu"
  },
  buttonProps: {
    type: ge(Object)
  },
  teleported: Mt.teleported
});
Me({
  command: {
    type: [Object, String, Number],
    default: () => ({})
  },
  disabled: Boolean,
  divided: Boolean,
  textValue: String,
  icon: {
    type: Qt
  }
});
Me({
  onKeydown: { type: ge(Function) }
});
pC("Dropdown");
const t2 = Symbol("elPaginationKey"), hC = Me({
  disabled: Boolean,
  currentPage: {
    type: Number,
    default: 1
  },
  prevText: {
    type: String
  },
  prevIcon: {
    type: Qt
  }
}), gC = {
  click: (e) => e instanceof MouseEvent
}, mC = ["disabled", "aria-label", "aria-disabled"], vC = { key: 0 }, _C = H({
  name: "ElPaginationPrev"
}), bC = /* @__PURE__ */ H({
  ..._C,
  props: hC,
  emits: gC,
  setup(e) {
    const t = e, { t: n } = en(), r = I(() => t.disabled || t.currentPage <= 1);
    return (s, o) => (b(), x("button", {
      type: "button",
      class: "btn-prev",
      disabled: _(r),
      "aria-label": s.prevText || _(n)("el.pagination.prev"),
      "aria-disabled": _(r),
      onClick: o[0] || (o[0] = (i) => s.$emit("click", i))
    }, [
      s.prevText ? (b(), x("span", vC, ve(s.prevText), 1)) : (b(), X(_(bt), { key: 1 }, {
        default: Y(() => [
          (b(), X(lt(s.prevIcon)))
        ]),
        _: 1
      }))
    ], 8, mC));
  }
});
var yC = /* @__PURE__ */ ye(bC, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/pagination/src/components/prev.vue"]]);
const wC = Me({
  disabled: Boolean,
  currentPage: {
    type: Number,
    default: 1
  },
  pageCount: {
    type: Number,
    default: 50
  },
  nextText: {
    type: String
  },
  nextIcon: {
    type: Qt
  }
}), kC = ["disabled", "aria-label", "aria-disabled"], CC = { key: 0 }, xC = H({
  name: "ElPaginationNext"
}), SC = /* @__PURE__ */ H({
  ...xC,
  props: wC,
  emits: ["click"],
  setup(e) {
    const t = e, { t: n } = en(), r = I(() => t.disabled || t.currentPage === t.pageCount || t.pageCount === 0);
    return (s, o) => (b(), x("button", {
      type: "button",
      class: "btn-next",
      disabled: _(r),
      "aria-label": s.nextText || _(n)("el.pagination.next"),
      "aria-disabled": _(r),
      onClick: o[0] || (o[0] = (i) => s.$emit("click", i))
    }, [
      s.nextText ? (b(), x("span", CC, ve(s.nextText), 1)) : (b(), X(_(bt), { key: 1 }, {
        default: Y(() => [
          (b(), X(lt(s.nextIcon)))
        ]),
        _: 1
      }))
    ], 8, kC));
  }
});
var EC = /* @__PURE__ */ ye(SC, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/pagination/src/components/next.vue"]]);
const n2 = Symbol("ElSelectGroup"), Ss = Symbol("ElSelect");
function AC(e, t) {
  const n = $e(Ss), r = $e(n2, { disabled: !1 }), s = I(() => Yt(e.value)), o = I(() => n.props.multiple ? l(n.props.modelValue, e.value) : m(e.value, n.props.modelValue)), i = I(() => {
    if (n.props.multiple) {
      const g = n.props.modelValue || [];
      return !o.value && g.length >= n.props.multipleLimit && n.props.multipleLimit > 0;
    } else
      return !1;
  }), a = I(() => e.label || (s.value ? "" : e.value)), c = I(() => e.value || e.label || ""), u = I(() => e.disabled || t.groupDisabled || i.value), d = ot(), l = (g = [], y) => {
    if (s.value) {
      const h = n.props.valueKey;
      return g && g.some((w) => Zo(It(w, h)) === It(y, h));
    } else
      return g && g.includes(y);
  }, m = (g, y) => {
    if (s.value) {
      const { valueKey: h } = n.props;
      return It(g, h) === It(y, h);
    } else
      return g === y;
  }, f = () => {
    !e.disabled && !r.disabled && (n.hoverIndex = n.optionsArray.indexOf(d.proxy));
  };
  ae(() => a.value, () => {
    !e.created && !n.props.remote && n.setSelected();
  }), ae(() => e.value, (g, y) => {
    const { remote: h, valueKey: w } = n.props;
    if (Object.is(g, y) || (n.onOptionDestroy(y, d.proxy), n.onOptionCreate(d.proxy)), !e.created && !h) {
      if (w && Yt(g) && Yt(y) && g[w] === y[w])
        return;
      n.setSelected();
    }
  }), ae(() => r.disabled, () => {
    t.groupDisabled = r.disabled;
  }, { immediate: !0 });
  const { queryChange: v } = Zo(n);
  return ae(v, (g) => {
    const { query: y } = _(g), h = new RegExp(f4(y), "i");
    t.visible = h.test(a.value) || e.created, t.visible || n.filteredOptionsCount--;
  }, { immediate: !0 }), {
    select: n,
    currentLabel: a,
    currentValue: c,
    itemSelected: o,
    isDisabled: u,
    hoverItem: f
  };
}
const $C = H({
  name: "ElOption",
  componentName: "ElOption",
  props: {
    value: {
      required: !0,
      type: [String, Number, Boolean, Object]
    },
    label: [String, Number],
    created: Boolean,
    disabled: Boolean
  },
  setup(e) {
    const t = Se("select"), n = ys(), r = I(() => [
      t.be("dropdown", "item"),
      t.is("disabled", _(a)),
      {
        selected: _(i),
        hover: _(l)
      }
    ]), s = qn({
      index: -1,
      groupDisabled: !1,
      visible: !0,
      hitState: !1,
      hover: !1
    }), { currentLabel: o, itemSelected: i, isDisabled: a, select: c, hoverItem: u } = AC(e, s), { visible: d, hover: l } = as(s), m = ot().proxy;
    c.onOptionCreate(m), Nt(() => {
      const v = m.value, { selected: g } = c, h = (c.props.multiple ? g : [g]).some((w) => w.value === m.value);
      Ae(() => {
        c.cachedOptions.get(v) === m && !h && c.cachedOptions.delete(v);
      }), c.onOptionDestroy(v, m);
    });
    function f() {
      e.disabled !== !0 && s.groupDisabled !== !0 && c.handleOptionSelect(m);
    }
    return {
      ns: t,
      id: n,
      containerKls: r,
      currentLabel: o,
      itemSelected: i,
      isDisabled: a,
      select: c,
      hoverItem: u,
      visible: d,
      hover: l,
      selectOptionClick: f,
      states: s
    };
  }
}), MC = ["id", "aria-disabled", "aria-selected"];
function IC(e, t, n, r, s, o) {
  return Ye((b(), x("li", {
    id: e.id,
    class: j(e.containerKls),
    role: "option",
    "aria-disabled": e.isDisabled || void 0,
    "aria-selected": e.itemSelected,
    onMouseenter: t[0] || (t[0] = (...i) => e.hoverItem && e.hoverItem(...i)),
    onClick: t[1] || (t[1] = Ke((...i) => e.selectOptionClick && e.selectOptionClick(...i), ["stop"]))
  }, [
    ne(e.$slots, "default", {}, () => [
      p("span", null, ve(e.currentLabel), 1)
    ])
  ], 42, MC)), [
    [Jt, e.visible]
  ]);
}
var Al = /* @__PURE__ */ ye($C, [["render", IC], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/select/src/option.vue"]]);
const TC = H({
  name: "ElSelectDropdown",
  componentName: "ElSelectDropdown",
  setup() {
    const e = $e(Ss), t = Se("select"), n = I(() => e.props.popperClass), r = I(() => e.props.multiple), s = I(() => e.props.fitInputWidth), o = D("");
    function i() {
      var a;
      o.value = `${(a = e.selectWrapper) == null ? void 0 : a.offsetWidth}px`;
    }
    return Be(() => {
      i(), us(e.selectWrapper, i);
    }), {
      ns: t,
      minWidth: o,
      popperClass: n,
      isMultiple: r,
      isFitInputWidth: s
    };
  }
});
function LC(e, t, n, r, s, o) {
  return b(), x("div", {
    class: j([e.ns.b("dropdown"), e.ns.is("multiple", e.isMultiple), e.popperClass]),
    style: qe({ [e.isFitInputWidth ? "width" : "minWidth"]: e.minWidth })
  }, [
    e.$slots.header ? (b(), x("div", {
      key: 0,
      class: j(e.ns.be("dropdown", "header"))
    }, [
      ne(e.$slots, "header")
    ], 2)) : Q("v-if", !0),
    ne(e.$slots, "default"),
    e.$slots.footer ? (b(), x("div", {
      key: 1,
      class: j(e.ns.be("dropdown", "footer"))
    }, [
      ne(e.$slots, "footer")
    ], 2)) : Q("v-if", !0)
  ], 6);
}
var OC = /* @__PURE__ */ ye(TC, [["render", LC], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/select/src/select-dropdown.vue"]]);
function RC(e) {
  const { t } = en();
  return qn({
    options: /* @__PURE__ */ new Map(),
    cachedOptions: /* @__PURE__ */ new Map(),
    disabledOptions: /* @__PURE__ */ new Map(),
    createdLabel: null,
    createdSelected: !1,
    selected: e.multiple ? [] : {},
    inputLength: 20,
    inputWidth: 0,
    optionsCount: 0,
    filteredOptionsCount: 0,
    visible: !1,
    selectedLabel: "",
    hoverIndex: -1,
    query: "",
    previousQuery: null,
    inputHovering: !1,
    cachedPlaceHolder: "",
    currentPlaceholder: t("el.select.placeholder"),
    menuVisibleOnFocus: !1,
    isOnComposition: !1,
    prefixWidth: 11,
    mouseEnter: !1,
    focused: !1
  });
}
const PC = (e, t, n) => {
  const { t: r } = en(), s = Se("select");
  Ch({
    from: "suffixTransition",
    replacement: "override style scheme",
    version: "2.3.0",
    scope: "props",
    ref: "https://element-plus.org/en-US/component/select.html#select-attributes"
  }, I(() => e.suffixTransition === !1));
  const o = D(null), i = D(null), a = D(null), c = D(null), u = D(null), d = D(null), l = D(null), m = D(null), f = D(), v = _n({ query: "" }), g = _n(""), y = D([]);
  let h = 0;
  const { form: w, formItem: k } = ks(), C = I(() => !e.filterable || e.multiple || !t.visible), A = I(() => e.disabled || (w == null ? void 0 : w.disabled)), E = I(() => {
    const L = e.multiple ? Array.isArray(e.modelValue) && e.modelValue.length > 0 : e.modelValue !== void 0 && e.modelValue !== null && e.modelValue !== "";
    return e.clearable && !A.value && t.inputHovering && L;
  }), $ = I(() => e.remote && e.filterable && !e.remoteShowSuffix ? "" : e.suffixIcon), M = I(() => s.is("reverse", $.value && t.visible && e.suffixTransition)), O = I(() => (w == null ? void 0 : w.statusIcon) && (k == null ? void 0 : k.validateState) && wh[k == null ? void 0 : k.validateState]), R = I(() => e.remote ? 300 : 0), B = I(() => e.loading ? e.loadingText || r("el.select.loading") : e.remote && t.query === "" && t.options.size === 0 ? !1 : e.filterable && t.query && t.options.size > 0 && t.filteredOptionsCount === 0 ? e.noMatchText || r("el.select.noMatch") : t.options.size === 0 ? e.noDataText || r("el.select.noData") : null), V = I(() => {
    const L = Array.from(t.options.values()), S = [];
    return y.value.forEach((T) => {
      const q = L.findIndex((se) => se.currentLabel === T);
      q > -1 && S.push(L[q]);
    }), S.length >= L.length ? S : L;
  }), re = I(() => Array.from(t.cachedOptions.values())), P = I(() => {
    const L = V.value.filter((S) => !S.created).some((S) => S.currentLabel === t.query);
    return e.filterable && e.allowCreate && t.query !== "" && !L;
  }), U = go(), z = I(() => ["small"].includes(U.value) ? "small" : "default"), N = I({
    get() {
      return t.visible && B.value !== !1;
    },
    set(L) {
      t.visible = L;
    }
  });
  ae([() => A.value, () => U.value, () => w == null ? void 0 : w.size], () => {
    Ae(() => {
      F();
    });
  }), ae(() => e.placeholder, (L) => {
    t.cachedPlaceHolder = t.currentPlaceholder = L, e.multiple && Array.isArray(e.modelValue) && e.modelValue.length > 0 && (t.currentPlaceholder = "");
  }), ae(() => e.modelValue, (L, S) => {
    e.multiple && (F(), L && L.length > 0 || i.value && t.query !== "" ? t.currentPlaceholder = "" : t.currentPlaceholder = t.cachedPlaceHolder, e.filterable && !e.reserveKeyword && (t.query = "", Z(t.query))), le(), e.filterable && !e.multiple && (t.inputLength = 20), !$c(L, S) && e.validateEvent && (k == null || k.validate("change").catch((T) => void 0));
  }, {
    flush: "post",
    deep: !0
  }), ae(() => t.visible, (L) => {
    var S, T, q, se, be;
    L ? ((T = (S = c.value) == null ? void 0 : S.updatePopper) == null || T.call(S), e.filterable && (t.filteredOptionsCount = t.optionsCount, t.query = e.remote ? "" : t.selectedLabel, (se = (q = a.value) == null ? void 0 : q.focus) == null || se.call(q), e.multiple ? (be = i.value) == null || be.focus() : t.selectedLabel && (t.currentPlaceholder = `${t.selectedLabel}`, t.selectedLabel = ""), Z(t.query), !e.multiple && !e.remote && (v.value.query = "", Pr(v), Pr(g)))) : (e.filterable && (Ot(e.filterMethod) && e.filterMethod(""), Ot(e.remoteMethod) && e.remoteMethod("")), t.query = "", t.previousQuery = null, t.selectedLabel = "", t.inputLength = 20, t.menuVisibleOnFocus = !1, Oe(), Ae(() => {
      i.value && i.value.value === "" && t.selected.length === 0 && (t.currentPlaceholder = t.cachedPlaceHolder);
    }), e.multiple || (t.selected && (e.filterable && e.allowCreate && t.createdSelected && t.createdLabel ? t.selectedLabel = t.createdLabel : t.selectedLabel = t.selected.currentLabel, e.filterable && (t.query = t.selectedLabel)), e.filterable && (t.currentPlaceholder = t.cachedPlaceHolder))), n.emit("visible-change", L);
  }), ae(() => t.options.entries(), () => {
    var L, S, T;
    if (!ut)
      return;
    (S = (L = c.value) == null ? void 0 : L.updatePopper) == null || S.call(L), e.multiple && F();
    const q = ((T = l.value) == null ? void 0 : T.querySelectorAll("input")) || [];
    (!e.filterable && !e.defaultFirstOption && !vh(e.modelValue) || !Array.from(q).includes(document.activeElement)) && le(), e.defaultFirstOption && (e.filterable || e.remote) && t.filteredOptionsCount && pe();
  }, {
    flush: "post"
  }), ae(() => t.hoverIndex, (L) => {
    Ze(L) && L > -1 ? f.value = V.value[L] || {} : f.value = {}, V.value.forEach((S) => {
      S.hover = f.value === S;
    });
  });
  const F = () => {
    Ae(() => {
      var L, S;
      if (!o.value)
        return;
      const T = o.value.$el.querySelector("input");
      h = h || (T.clientHeight > 0 ? T.clientHeight + 2 : 0);
      const q = d.value, se = getComputedStyle(T).getPropertyValue(s.cssVarName("input-height")), be = Number.parseFloat(se) || q4(U.value || (w == null ? void 0 : w.size)), ke = U.value || be === h || h <= 0 ? be : h;
      !(T.offsetParent === null) && (T.style.height = `${(t.selected.length === 0 ? ke : Math.max(q ? q.clientHeight + (q.clientHeight > ke ? 6 : 0) : 0, ke)) - 2}px`), t.visible && B.value !== !1 && ((S = (L = c.value) == null ? void 0 : L.updatePopper) == null || S.call(L));
    });
  }, Z = async (L) => {
    if (!(t.previousQuery === L || t.isOnComposition)) {
      if (t.previousQuery === null && (Ot(e.filterMethod) || Ot(e.remoteMethod))) {
        t.previousQuery = L;
        return;
      }
      t.previousQuery = L, Ae(() => {
        var S, T;
        t.visible && ((T = (S = c.value) == null ? void 0 : S.updatePopper) == null || T.call(S));
      }), t.hoverIndex = -1, e.multiple && e.filterable && Ae(() => {
        if (!A.value) {
          const S = i.value.value.length * 15 + 20;
          t.inputLength = e.collapseTags ? Math.min(50, S) : S, W();
        }
        F();
      }), e.remote && Ot(e.remoteMethod) ? (t.hoverIndex = -1, e.remoteMethod(L)) : Ot(e.filterMethod) ? (e.filterMethod(L), Pr(g)) : (t.filteredOptionsCount = t.optionsCount, v.value.query = L, Pr(v), Pr(g)), e.defaultFirstOption && (e.filterable || e.remote) && t.filteredOptionsCount && (await Ae(), pe());
    }
  }, W = () => {
    t.currentPlaceholder !== "" && (t.currentPlaceholder = i.value.value ? "" : t.cachedPlaceHolder);
  }, pe = () => {
    const L = V.value.filter((q) => q.visible && !q.disabled && !q.states.groupDisabled), S = L.find((q) => q.created), T = L[0];
    t.hoverIndex = Ct(V.value, S || T);
  }, le = () => {
    var L;
    if (e.multiple)
      t.selectedLabel = "";
    else {
      const T = Ee(e.modelValue);
      (L = T.props) != null && L.created ? (t.createdLabel = T.props.value, t.createdSelected = !0) : t.createdSelected = !1, t.selectedLabel = T.currentLabel, t.selected = T, e.filterable && (t.query = t.selectedLabel);
      return;
    }
    const S = [];
    Array.isArray(e.modelValue) && e.modelValue.forEach((T) => {
      S.push(Ee(T));
    }), t.selected = S, Ae(() => {
      F();
    });
  }, Ee = (L) => {
    let S;
    const T = Ns(L).toLowerCase() === "object", q = Ns(L).toLowerCase() === "null", se = Ns(L).toLowerCase() === "undefined";
    for (let te = t.cachedOptions.size - 1; te >= 0; te--) {
      const J = re.value[te];
      if (T ? It(J.value, e.valueKey) === It(L, e.valueKey) : J.value === L) {
        S = {
          value: L,
          currentLabel: J.currentLabel,
          isDisabled: J.isDisabled
        };
        break;
      }
    }
    if (S)
      return S;
    const be = T ? L.label : !q && !se ? L : "", ke = {
      value: L,
      currentLabel: be
    };
    return e.multiple && (ke.hitState = !1), ke;
  }, Oe = () => {
    setTimeout(() => {
      const L = e.valueKey;
      e.multiple ? t.selected.length > 0 ? t.hoverIndex = Math.min.apply(null, t.selected.map((S) => V.value.findIndex((T) => It(T, L) === It(S, L)))) : t.hoverIndex = -1 : t.hoverIndex = V.value.findIndex((S) => pn(S) === pn(t.selected));
    }, 300);
  }, ze = () => {
    var L, S;
    Qe(), (S = (L = c.value) == null ? void 0 : L.updatePopper) == null || S.call(L), e.multiple && F();
  }, Qe = () => {
    var L;
    t.inputWidth = (L = o.value) == null ? void 0 : L.$el.offsetWidth;
  }, ft = () => {
    e.filterable && t.query !== t.selectedLabel && (t.query = t.selectedLabel, Z(t.query));
  }, Ve = Ac(() => {
    ft();
  }, R.value), nn = Ac((L) => {
    Z(L.target.value);
  }, R.value), oe = (L) => {
    $c(e.modelValue, L) || n.emit(ul, L);
  }, _e = (L) => l4(L, (S) => !t.disabledOptions.has(S)), He = (L) => {
    if (L.code !== yn.delete) {
      if (L.target.value.length <= 0 && !St()) {
        const S = e.modelValue.slice(), T = _e(S);
        if (T < 0)
          return;
        S.splice(T, 1), n.emit(_t, S), oe(S);
      }
      L.target.value.length === 1 && e.modelValue.length === 0 && (t.currentPlaceholder = t.cachedPlaceHolder);
    }
  }, et = (L, S) => {
    const T = t.selected.indexOf(S);
    if (T > -1 && !A.value) {
      const q = e.modelValue.slice();
      q.splice(T, 1), n.emit(_t, q), oe(q), n.emit("remove-tag", S.value);
    }
    L.stopPropagation(), de();
  }, gt = (L) => {
    L.stopPropagation();
    const S = e.multiple ? [] : "";
    if (!Xt(S))
      for (const T of t.selected)
        T.isDisabled && S.push(T.value);
    n.emit(_t, S), oe(S), t.hoverIndex = -1, t.visible = !1, n.emit("clear"), de();
  }, jt = (L) => {
    var S;
    if (e.multiple) {
      const T = (e.modelValue || []).slice(), q = Ct(T, L.value);
      q > -1 ? T.splice(q, 1) : (e.multipleLimit <= 0 || T.length < e.multipleLimit) && T.push(L.value), n.emit(_t, T), oe(T), L.created && (t.query = "", Z(""), t.inputLength = 20), e.filterable && ((S = i.value) == null || S.focus());
    } else
      n.emit(_t, L.value), oe(L.value), t.visible = !1;
    rn(), !t.visible && Ae(() => {
      xt(L);
    });
  }, Ct = (L = [], S) => {
    if (!Yt(S))
      return L.indexOf(S);
    const T = e.valueKey;
    let q = -1;
    return L.some((se, be) => Zo(It(se, T)) === It(S, T) ? (q = be, !0) : !1), q;
  }, rn = () => {
    const L = i.value || o.value;
    L && (L == null || L.focus());
  }, xt = (L) => {
    var S, T, q, se, be;
    const ke = Array.isArray(L) ? L[0] : L;
    let te = null;
    if (ke != null && ke.value) {
      const J = V.value.filter((fe) => fe.value === ke.value);
      J.length > 0 && (te = J[0].$el);
    }
    if (c.value && te) {
      const J = (se = (q = (T = (S = c.value) == null ? void 0 : S.popperRef) == null ? void 0 : T.contentRef) == null ? void 0 : q.querySelector) == null ? void 0 : se.call(q, `.${s.be("dropdown", "wrap")}`);
      J && g4(J, te);
    }
    (be = m.value) == null || be.handleScroll();
  }, Ht = (L) => {
    t.optionsCount++, t.filteredOptionsCount++, t.options.set(L.value, L), t.cachedOptions.set(L.value, L), L.disabled && t.disabledOptions.set(L.value, L);
  }, st = (L, S) => {
    t.options.get(L) === S && (t.optionsCount--, t.filteredOptionsCount--, t.options.delete(L));
  }, Tt = (L) => {
    L.code !== yn.backspace && St(!1), t.inputLength = i.value.value.length * 15 + 20, F();
  }, St = (L) => {
    if (!Array.isArray(t.selected))
      return;
    const S = _e(t.selected.map((q) => q.value)), T = t.selected[S];
    if (T)
      return L === !0 || L === !1 ? (T.hitState = L, L) : (T.hitState = !T.hitState, T.hitState);
  }, Vt = (L) => {
    const S = L.target.value;
    if (L.type === "compositionend")
      t.isOnComposition = !1, Ae(() => Z(S));
    else {
      const T = S[S.length - 1] || "";
      t.isOnComposition = !kh(T);
    }
  }, Xe = () => {
    Ae(() => xt(t.selected));
  }, G = (L) => {
    t.focused || ((e.automaticDropdown || e.filterable) && (e.filterable && !t.visible && (t.menuVisibleOnFocus = !0), t.visible = !0), t.focused = !0, n.emit("focus", L));
  }, de = () => {
    var L, S;
    t.visible ? (L = i.value || o.value) == null || L.focus() : (S = o.value) == null || S.focus();
  }, Te = () => {
    var L, S, T;
    t.visible = !1, (L = o.value) == null || L.blur(), (T = (S = a.value) == null ? void 0 : S.blur) == null || T.call(S);
  }, Ue = (L) => {
    var S, T, q;
    (S = c.value) != null && S.isFocusInsideContent(L) || (T = u.value) != null && T.isFocusInsideContent(L) || (q = l.value) != null && q.contains(L.relatedTarget) || (t.visible && Hn(), t.focused = !1, n.emit("blur", L));
  }, Ut = (L) => {
    gt(L);
  }, Hn = () => {
    t.visible = !1;
  }, Vn = (L) => {
    t.visible && (L.preventDefault(), L.stopPropagation(), t.visible = !1);
  }, ir = (L) => {
    L && !t.mouseEnter || A.value || (t.menuVisibleOnFocus ? t.menuVisibleOnFocus = !1 : (!c.value || !c.value.isFocusInsideContent()) && (t.visible = !t.visible), de());
  }, Lr = () => {
    t.visible ? V.value[t.hoverIndex] && jt(V.value[t.hoverIndex]) : ir();
  }, pn = (L) => Yt(L.value) ? It(L.value, e.valueKey) : L.value, ar = I(() => V.value.filter((L) => L.visible).every((L) => L.disabled)), Or = I(() => e.multiple ? t.selected.slice(0, e.maxCollapseTags) : []), Un = I(() => e.multiple ? t.selected.slice(e.maxCollapseTags) : []), An = (L) => {
    if (!t.visible) {
      t.visible = !0;
      return;
    }
    if (!(t.options.size === 0 || t.filteredOptionsCount === 0) && !t.isOnComposition && !ar.value) {
      L === "next" ? (t.hoverIndex++, t.hoverIndex === t.options.size && (t.hoverIndex = 0)) : L === "prev" && (t.hoverIndex--, t.hoverIndex < 0 && (t.hoverIndex = t.options.size - 1));
      const S = V.value[t.hoverIndex];
      (S.disabled === !0 || S.states.groupDisabled === !0 || !S.visible) && An(L), Ae(() => xt(f.value));
    }
  }, cr = () => {
    t.mouseEnter = !0;
  }, Zn = () => {
    t.mouseEnter = !1;
  }, Rr = (L, S) => {
    var T, q;
    et(L, S), (q = (T = u.value) == null ? void 0 : T.updatePopper) == null || q.call(T);
  }, lr = I(() => ({
    maxWidth: `${_(t.inputWidth) - 32 - (O.value ? 22 : 0)}px`,
    width: "100%"
  }));
  return {
    optionList: y,
    optionsArray: V,
    hoverOption: f,
    selectSize: U,
    handleResize: ze,
    debouncedOnInputChange: Ve,
    debouncedQueryChange: nn,
    deletePrevTag: He,
    deleteTag: et,
    deleteSelected: gt,
    handleOptionSelect: jt,
    scrollToOption: xt,
    readonly: C,
    resetInputHeight: F,
    showClose: E,
    iconComponent: $,
    iconReverse: M,
    showNewOption: P,
    collapseTagSize: z,
    setSelected: le,
    managePlaceholder: W,
    selectDisabled: A,
    emptyText: B,
    toggleLastOptionHitState: St,
    resetInputState: Tt,
    handleComposition: Vt,
    onOptionCreate: Ht,
    onOptionDestroy: st,
    handleMenuEnter: Xe,
    handleFocus: G,
    focus: de,
    blur: Te,
    handleBlur: Ue,
    handleClearClick: Ut,
    handleClose: Hn,
    handleKeydownEscape: Vn,
    toggleMenu: ir,
    selectOption: Lr,
    getValueKey: pn,
    navigateOptions: An,
    handleDeleteTooltipTag: Rr,
    dropMenuVisible: N,
    queryChange: v,
    groupQueryChange: g,
    showTagList: Or,
    collapseTagList: Un,
    selectTagsStyle: lr,
    reference: o,
    input: i,
    iOSInput: a,
    tooltipRef: c,
    tagTooltipRef: u,
    tags: d,
    selectWrapper: l,
    scrollbar: m,
    handleMouseEnter: cr,
    handleMouseLeave: Zn
  };
};
var BC = H({
  name: "ElOptions",
  emits: ["update-options"],
  setup(e, { slots: t, emit: n }) {
    let r = [];
    function s(o, i) {
      if (o.length !== i.length)
        return !1;
      for (const [a] of o.entries())
        if (o[a] != i[a])
          return !1;
      return !0;
    }
    return () => {
      var o, i;
      const a = (o = t.default) == null ? void 0 : o.call(t), c = [];
      function u(d) {
        Array.isArray(d) && d.forEach((l) => {
          var m, f, v, g;
          const y = (m = (l == null ? void 0 : l.type) || {}) == null ? void 0 : m.name;
          y === "ElOptionGroup" ? u(!Xt(l.children) && !Array.isArray(l.children) && Ot((f = l.children) == null ? void 0 : f.default) ? (v = l.children) == null ? void 0 : v.default() : l.children) : y === "ElOption" ? c.push((g = l.props) == null ? void 0 : g.label) : Array.isArray(l.children) && u(l.children);
        });
      }
      return a.length && u((i = a[0]) == null ? void 0 : i.children), s(c, r) || (r = c, n("update-options", c)), a;
    };
  }
});
const xd = "ElSelect", zC = H({
  name: xd,
  componentName: xd,
  components: {
    ElInput: Cs,
    ElSelectMenu: OC,
    ElOption: Al,
    ElOptions: BC,
    ElTag: M8,
    ElScrollbar: Y5,
    ElTooltip: so,
    ElIcon: bt
  },
  directives: { ClickOutside: Jh },
  props: {
    name: String,
    id: String,
    modelValue: {
      type: [Array, String, Number, Boolean, Object],
      default: void 0
    },
    autocomplete: {
      type: String,
      default: "off"
    },
    automaticDropdown: Boolean,
    size: {
      type: String,
      validator: F4
    },
    effect: {
      type: String,
      default: "light"
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: {
      type: String,
      default: ""
    },
    popperOptions: {
      type: Object,
      default: () => ({})
    },
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String
    },
    defaultFirstOption: Boolean,
    reserveKeyword: {
      type: Boolean,
      default: !0
    },
    valueKey: {
      type: String,
      default: "value"
    },
    collapseTags: Boolean,
    collapseTagsTooltip: Boolean,
    maxCollapseTags: {
      type: Number,
      default: 1
    },
    teleported: Mt.teleported,
    persistent: {
      type: Boolean,
      default: !0
    },
    clearIcon: {
      type: Qt,
      default: ll
    },
    fitInputWidth: Boolean,
    suffixIcon: {
      type: Qt,
      default: _h
    },
    tagType: { ...Qh.type, default: "info" },
    validateEvent: {
      type: Boolean,
      default: !0
    },
    remoteShowSuffix: Boolean,
    suffixTransition: {
      type: Boolean,
      default: !0
    },
    placement: {
      type: String,
      values: _s,
      default: "bottom-start"
    },
    ariaLabel: {
      type: String,
      default: void 0
    }
  },
  emits: [
    _t,
    ul,
    "remove-tag",
    "clear",
    "visible-change",
    "focus",
    "blur"
  ],
  setup(e, t) {
    const n = Se("select"), r = Se("input"), { t: s } = en(), o = ys(), i = RC(e), {
      optionList: a,
      optionsArray: c,
      hoverOption: u,
      selectSize: d,
      readonly: l,
      handleResize: m,
      collapseTagSize: f,
      debouncedOnInputChange: v,
      debouncedQueryChange: g,
      deletePrevTag: y,
      deleteTag: h,
      deleteSelected: w,
      handleOptionSelect: k,
      scrollToOption: C,
      setSelected: A,
      resetInputHeight: E,
      managePlaceholder: $,
      showClose: M,
      selectDisabled: O,
      iconComponent: R,
      iconReverse: B,
      showNewOption: V,
      emptyText: re,
      toggleLastOptionHitState: P,
      resetInputState: U,
      handleComposition: z,
      onOptionCreate: N,
      onOptionDestroy: F,
      handleMenuEnter: Z,
      handleFocus: W,
      focus: pe,
      blur: le,
      handleBlur: Ee,
      handleClearClick: Oe,
      handleClose: ze,
      handleKeydownEscape: Qe,
      toggleMenu: ft,
      selectOption: Ve,
      getValueKey: nn,
      navigateOptions: oe,
      handleDeleteTooltipTag: _e,
      dropMenuVisible: He,
      reference: et,
      input: gt,
      iOSInput: jt,
      tooltipRef: Ct,
      tagTooltipRef: rn,
      tags: xt,
      selectWrapper: Ht,
      scrollbar: st,
      queryChange: Tt,
      groupQueryChange: St,
      handleMouseEnter: Vt,
      handleMouseLeave: Xe,
      showTagList: G,
      collapseTagList: de,
      selectTagsStyle: Te
    } = PC(e, i, t), {
      inputWidth: Ue,
      selected: Ut,
      inputLength: Hn,
      filteredOptionsCount: Vn,
      visible: ir,
      selectedLabel: Lr,
      hoverIndex: pn,
      query: ar,
      inputHovering: Or,
      currentPlaceholder: Un,
      menuVisibleOnFocus: An,
      isOnComposition: cr,
      options: Zn,
      cachedOptions: Rr,
      optionsCount: lr,
      prefixWidth: L
    } = as(i), S = I(() => {
      const Ce = [n.b()], Et = _(d);
      return Et && Ce.push(n.m(Et)), e.disabled && Ce.push(n.m("disabled")), Ce;
    }), T = I(() => [
      n.e("tags"),
      n.is("disabled", _(O))
    ]), q = I(() => [
      n.b("tags-wrapper"),
      { "has-prefix": _(L) && _(Ut).length }
    ]), se = I(() => [
      n.e("input"),
      n.is(_(d)),
      n.is("disabled", _(O))
    ]), be = I(() => [
      n.e("input"),
      n.is(_(d)),
      n.em("input", "iOS")
    ]), ke = I(() => [
      n.is("empty", !e.allowCreate && !!_(ar) && _(Vn) === 0)
    ]), te = I(() => ({ maxWidth: `${_(Ue) > 123 && _(Ut).length > e.maxCollapseTags ? _(Ue) - 123 : _(Ue) - 75}px` })), J = I(() => ({
      marginLeft: `${_(L)}px`,
      flexGrow: 1,
      width: `${_(Hn) / (_(Ue) - 32)}%`,
      maxWidth: `${_(Ue) - 42}px`
    }));
    kt(Ss, qn({
      props: e,
      options: Zn,
      optionsArray: c,
      cachedOptions: Rr,
      optionsCount: lr,
      filteredOptionsCount: Vn,
      hoverIndex: pn,
      handleOptionSelect: k,
      onOptionCreate: N,
      onOptionDestroy: F,
      selectWrapper: Ht,
      selected: Ut,
      setSelected: A,
      queryChange: Tt,
      groupQueryChange: St
    })), Be(() => {
      i.cachedPlaceHolder = Un.value = e.placeholder || (() => s("el.select.placeholder")), e.multiple && Array.isArray(e.modelValue) && e.modelValue.length > 0 && (Un.value = ""), us(Ht, m), e.remote && e.multiple && E(), Ae(() => {
        const Ce = et.value && et.value.$el;
        if (Ce && (Ue.value = Ce.getBoundingClientRect().width, t.slots.prefix)) {
          const Et = Ce.querySelector(`.${r.e("prefix")}`);
          L.value = Math.max(Et.getBoundingClientRect().width + 11, 30);
        }
      }), A();
    }), e.multiple && !Array.isArray(e.modelValue) && t.emit(_t, []), !e.multiple && Array.isArray(e.modelValue) && t.emit(_t, "");
    const fe = I(() => {
      var Ce, Et;
      return (Et = (Ce = Ct.value) == null ? void 0 : Ce.popperRef) == null ? void 0 : Et.contentRef;
    });
    return {
      isIOS: Jp,
      onOptionsRendered: (Ce) => {
        a.value = Ce;
      },
      prefixWidth: L,
      selectSize: d,
      readonly: l,
      handleResize: m,
      collapseTagSize: f,
      debouncedOnInputChange: v,
      debouncedQueryChange: g,
      deletePrevTag: y,
      deleteTag: h,
      handleDeleteTooltipTag: _e,
      deleteSelected: w,
      handleOptionSelect: k,
      scrollToOption: C,
      inputWidth: Ue,
      selected: Ut,
      inputLength: Hn,
      filteredOptionsCount: Vn,
      visible: ir,
      selectedLabel: Lr,
      hoverIndex: pn,
      query: ar,
      inputHovering: Or,
      currentPlaceholder: Un,
      menuVisibleOnFocus: An,
      isOnComposition: cr,
      options: Zn,
      resetInputHeight: E,
      managePlaceholder: $,
      showClose: M,
      selectDisabled: O,
      iconComponent: R,
      iconReverse: B,
      showNewOption: V,
      emptyText: re,
      toggleLastOptionHitState: P,
      resetInputState: U,
      handleComposition: z,
      handleMenuEnter: Z,
      handleFocus: W,
      focus: pe,
      blur: le,
      handleBlur: Ee,
      handleClearClick: Oe,
      handleClose: ze,
      handleKeydownEscape: Qe,
      toggleMenu: ft,
      selectOption: Ve,
      getValueKey: nn,
      navigateOptions: oe,
      dropMenuVisible: He,
      reference: et,
      input: gt,
      iOSInput: jt,
      tooltipRef: Ct,
      popperPaneRef: fe,
      tags: xt,
      selectWrapper: Ht,
      scrollbar: st,
      wrapperKls: S,
      tagsKls: T,
      tagWrapperKls: q,
      inputKls: se,
      iOSInputKls: be,
      scrollbarKls: ke,
      selectTagsStyle: Te,
      nsSelect: n,
      tagTextStyle: te,
      inputStyle: J,
      handleMouseEnter: Vt,
      handleMouseLeave: Xe,
      showTagList: G,
      collapseTagList: de,
      tagTooltipRef: rn,
      contentId: o,
      hoverOption: u
    };
  }
}), DC = ["disabled", "autocomplete", "aria-activedescendant", "aria-controls", "aria-expanded", "aria-label"], NC = ["disabled"], qC = { style: { height: "100%", display: "flex", "justify-content": "center", "align-items": "center" } };
function FC(e, t, n, r, s, o) {
  const i = In("el-tag"), a = In("el-tooltip"), c = In("el-icon"), u = In("el-input"), d = In("el-option"), l = In("el-options"), m = In("el-scrollbar"), f = In("el-select-menu"), v = Qc("click-outside");
  return Ye((b(), x("div", {
    ref: "selectWrapper",
    class: j(e.wrapperKls),
    onMouseenter: t[22] || (t[22] = (...g) => e.handleMouseEnter && e.handleMouseEnter(...g)),
    onMouseleave: t[23] || (t[23] = (...g) => e.handleMouseLeave && e.handleMouseLeave(...g)),
    onClick: t[24] || (t[24] = Ke((...g) => e.toggleMenu && e.toggleMenu(...g), ["stop"]))
  }, [
    ue(a, {
      ref: "tooltipRef",
      visible: e.dropMenuVisible,
      placement: e.placement,
      teleported: e.teleported,
      "popper-class": [e.nsSelect.e("popper"), e.popperClass],
      "popper-options": e.popperOptions,
      "fallback-placements": ["bottom-start", "top-start", "right", "left"],
      effect: e.effect,
      pure: "",
      trigger: "click",
      transition: `${e.nsSelect.namespace.value}-zoom-in-top`,
      "stop-popper-mouse-event": !1,
      "gpu-acceleration": !1,
      persistent: e.persistent,
      onShow: e.handleMenuEnter
    }, {
      default: Y(() => {
        var g, y;
        return [
          p("div", {
            class: "select-trigger",
            onMouseenter: t[20] || (t[20] = (h) => e.inputHovering = !0),
            onMouseleave: t[21] || (t[21] = (h) => e.inputHovering = !1)
          }, [
            e.multiple ? (b(), x("div", {
              key: 0,
              ref: "tags",
              tabindex: "-1",
              class: j(e.tagsKls),
              style: qe(e.selectTagsStyle),
              onClick: t[15] || (t[15] = (...h) => e.focus && e.focus(...h))
            }, [
              e.collapseTags && e.selected.length ? (b(), X(nr, {
                key: 0,
                onAfterLeave: e.resetInputHeight
              }, {
                default: Y(() => [
                  p("span", {
                    class: j(e.tagWrapperKls)
                  }, [
                    (b(!0), x(Pe, null, Je(e.showTagList, (h) => (b(), X(i, {
                      key: e.getValueKey(h),
                      closable: !e.selectDisabled && !h.isDisabled,
                      size: e.collapseTagSize,
                      hit: h.hitState,
                      type: e.tagType,
                      "disable-transitions": "",
                      onClose: (w) => e.deleteTag(w, h)
                    }, {
                      default: Y(() => [
                        p("span", {
                          class: j(e.nsSelect.e("tags-text")),
                          style: qe(e.tagTextStyle)
                        }, ve(h.currentLabel), 7)
                      ]),
                      _: 2
                    }, 1032, ["closable", "size", "hit", "type", "onClose"]))), 128)),
                    e.selected.length > e.maxCollapseTags ? (b(), X(i, {
                      key: 0,
                      closable: !1,
                      size: e.collapseTagSize,
                      type: e.tagType,
                      "disable-transitions": ""
                    }, {
                      default: Y(() => [
                        e.collapseTagsTooltip ? (b(), X(a, {
                          key: 0,
                          ref: "tagTooltipRef",
                          disabled: e.dropMenuVisible,
                          "fallback-placements": ["bottom", "top", "right", "left"],
                          effect: e.effect,
                          placement: "bottom",
                          teleported: e.teleported
                        }, {
                          default: Y(() => [
                            p("span", {
                              class: j(e.nsSelect.e("tags-text"))
                            }, "+ " + ve(e.selected.length - e.maxCollapseTags), 3)
                          ]),
                          content: Y(() => [
                            p("div", {
                              class: j(e.nsSelect.e("collapse-tags"))
                            }, [
                              (b(!0), x(Pe, null, Je(e.collapseTagList, (h) => (b(), x("div", {
                                key: e.getValueKey(h),
                                class: j(e.nsSelect.e("collapse-tag"))
                              }, [
                                ue(i, {
                                  class: "in-tooltip",
                                  closable: !e.selectDisabled && !h.isDisabled,
                                  size: e.collapseTagSize,
                                  hit: h.hitState,
                                  type: e.tagType,
                                  "disable-transitions": "",
                                  style: { margin: "2px" },
                                  onClose: (w) => e.handleDeleteTooltipTag(w, h)
                                }, {
                                  default: Y(() => [
                                    p("span", {
                                      class: j(e.nsSelect.e("tags-text")),
                                      style: qe({
                                        maxWidth: e.inputWidth - 75 + "px"
                                      })
                                    }, ve(h.currentLabel), 7)
                                  ]),
                                  _: 2
                                }, 1032, ["closable", "size", "hit", "type", "onClose"])
                              ], 2))), 128))
                            ], 2)
                          ]),
                          _: 1
                        }, 8, ["disabled", "effect", "teleported"])) : (b(), x("span", {
                          key: 1,
                          class: j(e.nsSelect.e("tags-text"))
                        }, "+ " + ve(e.selected.length - e.maxCollapseTags), 3))
                      ]),
                      _: 1
                    }, 8, ["size", "type"])) : Q("v-if", !0)
                  ], 2)
                ]),
                _: 1
              }, 8, ["onAfterLeave"])) : Q("v-if", !0),
              e.collapseTags ? Q("v-if", !0) : (b(), X(nr, {
                key: 1,
                onAfterLeave: e.resetInputHeight
              }, {
                default: Y(() => [
                  p("span", {
                    class: j(e.tagWrapperKls),
                    style: qe(e.prefixWidth && e.selected.length ? { marginLeft: `${e.prefixWidth}px` } : "")
                  }, [
                    (b(!0), x(Pe, null, Je(e.selected, (h) => (b(), X(i, {
                      key: e.getValueKey(h),
                      closable: !e.selectDisabled && !h.isDisabled,
                      size: e.collapseTagSize,
                      hit: h.hitState,
                      type: e.tagType,
                      "disable-transitions": "",
                      onClose: (w) => e.deleteTag(w, h)
                    }, {
                      default: Y(() => [
                        p("span", {
                          class: j(e.nsSelect.e("tags-text")),
                          style: qe({ maxWidth: e.inputWidth - 75 + "px" })
                        }, ve(h.currentLabel), 7)
                      ]),
                      _: 2
                    }, 1032, ["closable", "size", "hit", "type", "onClose"]))), 128))
                  ], 6)
                ]),
                _: 1
              }, 8, ["onAfterLeave"])),
              e.filterable && !e.selectDisabled ? Ye((b(), x("input", {
                key: 2,
                ref: "input",
                "onUpdate:modelValue": t[0] || (t[0] = (h) => e.query = h),
                type: "text",
                class: j(e.inputKls),
                disabled: e.selectDisabled,
                autocomplete: e.autocomplete,
                style: qe(e.inputStyle),
                role: "combobox",
                "aria-activedescendant": ((g = e.hoverOption) == null ? void 0 : g.id) || "",
                "aria-controls": e.contentId,
                "aria-expanded": e.dropMenuVisible,
                "aria-label": e.ariaLabel,
                "aria-autocomplete": "none",
                "aria-haspopup": "listbox",
                onFocus: t[1] || (t[1] = (...h) => e.handleFocus && e.handleFocus(...h)),
                onBlur: t[2] || (t[2] = (...h) => e.handleBlur && e.handleBlur(...h)),
                onKeyup: t[3] || (t[3] = (...h) => e.managePlaceholder && e.managePlaceholder(...h)),
                onKeydown: [
                  t[4] || (t[4] = (...h) => e.resetInputState && e.resetInputState(...h)),
                  t[5] || (t[5] = at(Ke((h) => e.navigateOptions("next"), ["prevent"]), ["down"])),
                  t[6] || (t[6] = at(Ke((h) => e.navigateOptions("prev"), ["prevent"]), ["up"])),
                  t[7] || (t[7] = at((...h) => e.handleKeydownEscape && e.handleKeydownEscape(...h), ["esc"])),
                  t[8] || (t[8] = at(Ke((...h) => e.selectOption && e.selectOption(...h), ["stop", "prevent"]), ["enter"])),
                  t[9] || (t[9] = at((...h) => e.deletePrevTag && e.deletePrevTag(...h), ["delete"])),
                  t[10] || (t[10] = at((h) => e.visible = !1, ["tab"]))
                ],
                onCompositionstart: t[11] || (t[11] = (...h) => e.handleComposition && e.handleComposition(...h)),
                onCompositionupdate: t[12] || (t[12] = (...h) => e.handleComposition && e.handleComposition(...h)),
                onCompositionend: t[13] || (t[13] = (...h) => e.handleComposition && e.handleComposition(...h)),
                onInput: t[14] || (t[14] = (...h) => e.debouncedQueryChange && e.debouncedQueryChange(...h))
              }, null, 46, DC)), [
                [Bp, e.query]
              ]) : Q("v-if", !0)
            ], 6)) : Q("v-if", !0),
            e.isIOS && !e.multiple && e.filterable && e.readonly ? (b(), x("input", {
              key: 1,
              ref: "iOSInput",
              class: j(e.iOSInputKls),
              disabled: e.selectDisabled,
              type: "text"
            }, null, 10, NC)) : Q("v-if", !0),
            ue(u, {
              id: e.id,
              ref: "reference",
              modelValue: e.selectedLabel,
              "onUpdate:modelValue": t[16] || (t[16] = (h) => e.selectedLabel = h),
              type: "text",
              placeholder: typeof e.currentPlaceholder == "function" ? e.currentPlaceholder() : e.currentPlaceholder,
              name: e.name,
              autocomplete: e.autocomplete,
              size: e.selectSize,
              disabled: e.selectDisabled,
              readonly: e.readonly,
              "validate-event": !1,
              class: j([e.nsSelect.is("focus", e.visible)]),
              tabindex: e.multiple && e.filterable ? -1 : void 0,
              role: "combobox",
              "aria-activedescendant": ((y = e.hoverOption) == null ? void 0 : y.id) || "",
              "aria-controls": e.contentId,
              "aria-expanded": e.dropMenuVisible,
              label: e.ariaLabel,
              "aria-autocomplete": "none",
              "aria-haspopup": "listbox",
              onFocus: e.handleFocus,
              onBlur: e.handleBlur,
              onInput: e.debouncedOnInputChange,
              onPaste: e.debouncedOnInputChange,
              onCompositionstart: e.handleComposition,
              onCompositionupdate: e.handleComposition,
              onCompositionend: e.handleComposition,
              onKeydown: [
                t[17] || (t[17] = at(Ke((h) => e.navigateOptions("next"), ["stop", "prevent"]), ["down"])),
                t[18] || (t[18] = at(Ke((h) => e.navigateOptions("prev"), ["stop", "prevent"]), ["up"])),
                at(Ke(e.selectOption, ["stop", "prevent"]), ["enter"]),
                at(e.handleKeydownEscape, ["esc"]),
                t[19] || (t[19] = at((h) => e.visible = !1, ["tab"]))
              ]
            }, Xr({
              suffix: Y(() => [
                e.iconComponent && !e.showClose ? (b(), X(c, {
                  key: 0,
                  class: j([e.nsSelect.e("caret"), e.nsSelect.e("icon"), e.iconReverse])
                }, {
                  default: Y(() => [
                    (b(), X(lt(e.iconComponent)))
                  ]),
                  _: 1
                }, 8, ["class"])) : Q("v-if", !0),
                e.showClose && e.clearIcon ? (b(), X(c, {
                  key: 1,
                  class: j([e.nsSelect.e("caret"), e.nsSelect.e("icon")]),
                  onClick: e.handleClearClick
                }, {
                  default: Y(() => [
                    (b(), X(lt(e.clearIcon)))
                  ]),
                  _: 1
                }, 8, ["class", "onClick"])) : Q("v-if", !0)
              ]),
              _: 2
            }, [
              e.$slots.prefix ? {
                name: "prefix",
                fn: Y(() => [
                  p("div", qC, [
                    ne(e.$slots, "prefix")
                  ])
                ])
              } : void 0
            ]), 1032, ["id", "modelValue", "placeholder", "name", "autocomplete", "size", "disabled", "readonly", "class", "tabindex", "aria-activedescendant", "aria-controls", "aria-expanded", "label", "onFocus", "onBlur", "onInput", "onPaste", "onCompositionstart", "onCompositionupdate", "onCompositionend", "onKeydown"])
          ], 32)
        ];
      }),
      content: Y(() => [
        ue(f, null, Xr({
          default: Y(() => [
            Ye(ue(m, {
              id: e.contentId,
              ref: "scrollbar",
              tag: "ul",
              "wrap-class": e.nsSelect.be("dropdown", "wrap"),
              "view-class": e.nsSelect.be("dropdown", "list"),
              class: j(e.scrollbarKls),
              role: "listbox",
              "aria-label": e.ariaLabel,
              "aria-orientation": "vertical"
            }, {
              default: Y(() => [
                e.showNewOption ? (b(), X(d, {
                  key: 0,
                  value: e.query,
                  created: !0
                }, null, 8, ["value"])) : Q("v-if", !0),
                ue(l, { onUpdateOptions: e.onOptionsRendered }, {
                  default: Y(() => [
                    ne(e.$slots, "default")
                  ]),
                  _: 3
                }, 8, ["onUpdateOptions"])
              ]),
              _: 3
            }, 8, ["id", "wrap-class", "view-class", "class", "aria-label"]), [
              [Jt, e.options.size > 0 && !e.loading]
            ]),
            e.emptyText && (!e.allowCreate || e.loading || e.allowCreate && e.options.size === 0) ? (b(), x(Pe, { key: 0 }, [
              e.$slots.empty ? ne(e.$slots, "empty", { key: 0 }) : (b(), x("p", {
                key: 1,
                class: j(e.nsSelect.be("dropdown", "empty"))
              }, ve(e.emptyText), 3))
            ], 64)) : Q("v-if", !0)
          ]),
          _: 2
        }, [
          e.$slots.header ? {
            name: "header",
            fn: Y(() => [
              ne(e.$slots, "header")
            ])
          } : void 0,
          e.$slots.footer ? {
            name: "footer",
            fn: Y(() => [
              ne(e.$slots, "footer")
            ])
          } : void 0
        ]), 1024)
      ]),
      _: 3
    }, 8, ["visible", "placement", "teleported", "popper-class", "popper-options", "effect", "transition", "persistent", "onShow"])
  ], 34)), [
    [v, e.handleClose, e.popperPaneRef]
  ]);
}
var jC = /* @__PURE__ */ ye(zC, [["render", FC], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/select/src/select.vue"]]);
const HC = H({
  name: "ElOptionGroup",
  componentName: "ElOptionGroup",
  props: {
    label: String,
    disabled: Boolean
  },
  setup(e) {
    const t = Se("select"), n = D(!0), r = ot(), s = D([]);
    kt(n2, qn({
      ...as(e)
    }));
    const o = $e(Ss);
    Be(() => {
      s.value = i(r.subTree);
    });
    const i = (c) => {
      const u = [];
      return Array.isArray(c.children) && c.children.forEach((d) => {
        var l;
        d.type && d.type.name === "ElOption" && d.component && d.component.proxy ? u.push(d.component.proxy) : (l = d.children) != null && l.length && u.push(...i(d));
      }), u;
    }, { groupQueryChange: a } = Zo(o);
    return ae(a, () => {
      n.value = s.value.some((c) => c.visible === !0);
    }, { flush: "post" }), {
      visible: n,
      ns: t
    };
  }
});
function VC(e, t, n, r, s, o) {
  return Ye((b(), x("ul", {
    class: j(e.ns.be("group", "wrap"))
  }, [
    p("li", {
      class: j(e.ns.be("group", "title"))
    }, ve(e.label), 3),
    p("li", null, [
      p("ul", {
        class: j(e.ns.b("group"))
      }, [
        ne(e.$slots, "default")
      ], 2)
    ])
  ], 2)), [
    [Jt, e.visible]
  ]);
}
var r2 = /* @__PURE__ */ ye(HC, [["render", VC], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/select/src/option-group.vue"]]);
const Oc = Ft(jC, {
  Option: Al,
  OptionGroup: r2
}), UC = vs(Al);
vs(r2);
const $l = () => $e(t2, {}), ZC = Me({
  pageSize: {
    type: Number,
    required: !0
  },
  pageSizes: {
    type: ge(Array),
    default: () => dl([10, 20, 30, 40, 50, 100])
  },
  popperClass: {
    type: String
  },
  disabled: Boolean,
  teleported: Boolean,
  size: {
    type: String,
    values: fo
  }
}), WC = H({
  name: "ElPaginationSizes"
}), GC = /* @__PURE__ */ H({
  ...WC,
  props: ZC,
  emits: ["page-size-change"],
  setup(e, { emit: t }) {
    const n = e, { t: r } = en(), s = Se("pagination"), o = $l(), i = D(n.pageSize);
    ae(() => n.pageSizes, (u, d) => {
      if (!$c(u, d) && Array.isArray(u)) {
        const l = u.includes(n.pageSize) ? n.pageSize : n.pageSizes[0];
        t("page-size-change", l);
      }
    }), ae(() => n.pageSize, (u) => {
      i.value = u;
    });
    const a = I(() => n.pageSizes);
    function c(u) {
      var d;
      u !== i.value && (i.value = u, (d = o.handleSizeChange) == null || d.call(o, Number(u)));
    }
    return (u, d) => (b(), x("span", {
      class: j(_(s).e("sizes"))
    }, [
      ue(_(Oc), {
        "model-value": i.value,
        disabled: u.disabled,
        "popper-class": u.popperClass,
        size: u.size,
        teleported: u.teleported,
        "validate-event": !1,
        onChange: c
      }, {
        default: Y(() => [
          (b(!0), x(Pe, null, Je(_(a), (l) => (b(), X(_(UC), {
            key: l,
            value: l,
            label: l + _(r)("el.pagination.pagesize")
          }, null, 8, ["value", "label"]))), 128))
        ]),
        _: 1
      }, 8, ["model-value", "disabled", "popper-class", "size", "teleported"])
    ], 2));
  }
});
var KC = /* @__PURE__ */ ye(GC, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/pagination/src/components/sizes.vue"]]);
const XC = Me({
  size: {
    type: String,
    values: fo
  }
}), YC = ["disabled"], JC = H({
  name: "ElPaginationJumper"
}), QC = /* @__PURE__ */ H({
  ...JC,
  props: XC,
  setup(e) {
    const { t } = en(), n = Se("pagination"), { pageCount: r, disabled: s, currentPage: o, changeEvent: i } = $l(), a = D(), c = I(() => {
      var l;
      return (l = a.value) != null ? l : o == null ? void 0 : o.value;
    });
    function u(l) {
      a.value = l ? +l : "";
    }
    function d(l) {
      l = Math.trunc(+l), i == null || i(l), a.value = void 0;
    }
    return (l, m) => (b(), x("span", {
      class: j(_(n).e("jump")),
      disabled: _(s)
    }, [
      p("span", {
        class: j([_(n).e("goto")])
      }, ve(_(t)("el.pagination.goto")), 3),
      ue(_(Cs), {
        size: l.size,
        class: j([_(n).e("editor"), _(n).is("in-pagination")]),
        min: 1,
        max: _(r),
        disabled: _(s),
        "model-value": _(c),
        "validate-event": !1,
        label: _(t)("el.pagination.page"),
        type: "number",
        "onUpdate:modelValue": u,
        onChange: d
      }, null, 8, ["size", "class", "max", "disabled", "model-value", "label"]),
      p("span", {
        class: j([_(n).e("classifier")])
      }, ve(_(t)("el.pagination.pageClassifier")), 3)
    ], 10, YC));
  }
});
var ex = /* @__PURE__ */ ye(QC, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/pagination/src/components/jumper.vue"]]);
const tx = Me({
  total: {
    type: Number,
    default: 1e3
  }
}), nx = ["disabled"], rx = H({
  name: "ElPaginationTotal"
}), ox = /* @__PURE__ */ H({
  ...rx,
  props: tx,
  setup(e) {
    const { t } = en(), n = Se("pagination"), { disabled: r } = $l();
    return (s, o) => (b(), x("span", {
      class: j(_(n).e("total")),
      disabled: _(r)
    }, ve(_(t)("el.pagination.total", {
      total: s.total
    })), 11, nx));
  }
});
var sx = /* @__PURE__ */ ye(ox, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/pagination/src/components/total.vue"]]);
const ix = Me({
  currentPage: {
    type: Number,
    default: 1
  },
  pageCount: {
    type: Number,
    required: !0
  },
  pagerCount: {
    type: Number,
    default: 7
  },
  disabled: Boolean
}), ax = ["onKeyup"], cx = ["aria-current", "aria-label", "tabindex"], lx = ["tabindex", "aria-label"], ux = ["aria-current", "aria-label", "tabindex"], dx = ["tabindex", "aria-label"], fx = ["aria-current", "aria-label", "tabindex"], px = H({
  name: "ElPaginationPager"
}), hx = /* @__PURE__ */ H({
  ...px,
  props: ix,
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = e, r = Se("pager"), s = Se("icon"), { t: o } = en(), i = D(!1), a = D(!1), c = D(!1), u = D(!1), d = D(!1), l = D(!1), m = I(() => {
      const C = n.pagerCount, A = (C - 1) / 2, E = Number(n.currentPage), $ = Number(n.pageCount);
      let M = !1, O = !1;
      $ > C && (E > C - A && (M = !0), E < $ - A && (O = !0));
      const R = [];
      if (M && !O) {
        const B = $ - (C - 2);
        for (let V = B; V < $; V++)
          R.push(V);
      } else if (!M && O)
        for (let B = 2; B < C; B++)
          R.push(B);
      else if (M && O) {
        const B = Math.floor(C / 2) - 1;
        for (let V = E - B; V <= E + B; V++)
          R.push(V);
      } else
        for (let B = 2; B < $; B++)
          R.push(B);
      return R;
    }), f = I(() => [
      "more",
      "btn-quickprev",
      s.b(),
      r.is("disabled", n.disabled)
    ]), v = I(() => [
      "more",
      "btn-quicknext",
      s.b(),
      r.is("disabled", n.disabled)
    ]), g = I(() => n.disabled ? -1 : 0);
    Jc(() => {
      const C = (n.pagerCount - 1) / 2;
      i.value = !1, a.value = !1, n.pageCount > n.pagerCount && (n.currentPage > n.pagerCount - C && (i.value = !0), n.currentPage < n.pageCount - C && (a.value = !0));
    });
    function y(C = !1) {
      n.disabled || (C ? c.value = !0 : u.value = !0);
    }
    function h(C = !1) {
      C ? d.value = !0 : l.value = !0;
    }
    function w(C) {
      const A = C.target;
      if (A.tagName.toLowerCase() === "li" && Array.from(A.classList).includes("number")) {
        const E = Number(A.textContent);
        E !== n.currentPage && t("change", E);
      } else A.tagName.toLowerCase() === "li" && Array.from(A.classList).includes("more") && k(C);
    }
    function k(C) {
      const A = C.target;
      if (A.tagName.toLowerCase() === "ul" || n.disabled)
        return;
      let E = Number(A.textContent);
      const $ = n.pageCount, M = n.currentPage, O = n.pagerCount - 2;
      A.className.includes("more") && (A.className.includes("quickprev") ? E = M - O : A.className.includes("quicknext") && (E = M + O)), Number.isNaN(+E) || (E < 1 && (E = 1), E > $ && (E = $)), E !== M && t("change", E);
    }
    return (C, A) => (b(), x("ul", {
      class: j(_(r).b()),
      onClick: k,
      onKeyup: at(w, ["enter"])
    }, [
      C.pageCount > 0 ? (b(), x("li", {
        key: 0,
        class: j([[
          _(r).is("active", C.currentPage === 1),
          _(r).is("disabled", C.disabled)
        ], "number"]),
        "aria-current": C.currentPage === 1,
        "aria-label": _(o)("el.pagination.currentPage", { pager: 1 }),
        tabindex: _(g)
      }, " 1 ", 10, cx)) : Q("v-if", !0),
      i.value ? (b(), x("li", {
        key: 1,
        class: j(_(f)),
        tabindex: _(g),
        "aria-label": _(o)("el.pagination.prevPages", { pager: C.pagerCount - 2 }),
        onMouseenter: A[0] || (A[0] = (E) => y(!0)),
        onMouseleave: A[1] || (A[1] = (E) => c.value = !1),
        onFocus: A[2] || (A[2] = (E) => h(!0)),
        onBlur: A[3] || (A[3] = (E) => d.value = !1)
      }, [
        (c.value || d.value) && !C.disabled ? (b(), X(_(E4), { key: 0 })) : (b(), X(_(Fu), { key: 1 }))
      ], 42, lx)) : Q("v-if", !0),
      (b(!0), x(Pe, null, Je(_(m), (E) => (b(), x("li", {
        key: E,
        class: j([[
          _(r).is("active", C.currentPage === E),
          _(r).is("disabled", C.disabled)
        ], "number"]),
        "aria-current": C.currentPage === E,
        "aria-label": _(o)("el.pagination.currentPage", { pager: E }),
        tabindex: _(g)
      }, ve(E), 11, ux))), 128)),
      a.value ? (b(), x("li", {
        key: 2,
        class: j(_(v)),
        tabindex: _(g),
        "aria-label": _(o)("el.pagination.nextPages", { pager: C.pagerCount - 2 }),
        onMouseenter: A[4] || (A[4] = (E) => y()),
        onMouseleave: A[5] || (A[5] = (E) => u.value = !1),
        onFocus: A[6] || (A[6] = (E) => h()),
        onBlur: A[7] || (A[7] = (E) => l.value = !1)
      }, [
        (u.value || l.value) && !C.disabled ? (b(), X(_($4), { key: 0 })) : (b(), X(_(Fu), { key: 1 }))
      ], 42, dx)) : Q("v-if", !0),
      C.pageCount > 1 ? (b(), x("li", {
        key: 3,
        class: j([[
          _(r).is("active", C.currentPage === C.pageCount),
          _(r).is("disabled", C.disabled)
        ], "number"]),
        "aria-current": C.currentPage === C.pageCount,
        "aria-label": _(o)("el.pagination.currentPage", { pager: C.pageCount }),
        tabindex: _(g)
      }, ve(C.pageCount), 11, fx)) : Q("v-if", !0)
    ], 42, ax));
  }
});
var gx = /* @__PURE__ */ ye(hx, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/pagination/src/components/pager.vue"]]);
const pt = (e) => typeof e != "number", o2 = Me({
  pageSize: Number,
  defaultPageSize: Number,
  total: Number,
  pageCount: Number,
  pagerCount: {
    type: Number,
    validator: (e) => Ze(e) && Math.trunc(e) === e && e > 4 && e < 22 && e % 2 === 1,
    default: 7
  },
  currentPage: Number,
  defaultCurrentPage: Number,
  layout: {
    type: String,
    default: ["prev", "pager", "next", "jumper", "->", "total"].join(", ")
  },
  pageSizes: {
    type: ge(Array),
    default: () => dl([10, 20, 30, 40, 50, 100])
  },
  popperClass: {
    type: String,
    default: ""
  },
  prevText: {
    type: String,
    default: ""
  },
  prevIcon: {
    type: Qt,
    default: () => _4
  },
  nextText: {
    type: String,
    default: ""
  },
  nextIcon: {
    type: Qt,
    default: () => y4
  },
  teleported: {
    type: Boolean,
    default: !0
  },
  small: Boolean,
  background: Boolean,
  disabled: Boolean,
  hideOnSinglePage: Boolean
}), mx = {
  "update:current-page": (e) => Ze(e),
  "update:page-size": (e) => Ze(e),
  "size-change": (e) => Ze(e),
  "current-change": (e) => Ze(e),
  "prev-click": (e) => Ze(e),
  "next-click": (e) => Ze(e)
}, Sd = "ElPagination";
var vx = H({
  name: Sd,
  props: o2,
  emits: mx,
  setup(e, { emit: t, slots: n }) {
    const { t: r } = en(), s = Se("pagination"), o = ot().vnode.props || {}, i = "onUpdate:currentPage" in o || "onUpdate:current-page" in o || "onCurrentChange" in o, a = "onUpdate:pageSize" in o || "onUpdate:page-size" in o || "onSizeChange" in o, c = I(() => {
      if (pt(e.total) && pt(e.pageCount) || !pt(e.currentPage) && !i)
        return !1;
      if (e.layout.includes("sizes")) {
        if (pt(e.pageCount)) {
          if (!pt(e.total) && !pt(e.pageSize) && !a)
            return !1;
        } else if (!a)
          return !1;
      }
      return !0;
    }), u = D(pt(e.defaultPageSize) ? 10 : e.defaultPageSize), d = D(pt(e.defaultCurrentPage) ? 1 : e.defaultCurrentPage), l = I({
      get() {
        return pt(e.pageSize) ? u.value : e.pageSize;
      },
      set(k) {
        pt(e.pageSize) && (u.value = k), a && (t("update:page-size", k), t("size-change", k));
      }
    }), m = I(() => {
      let k = 0;
      return pt(e.pageCount) ? pt(e.total) || (k = Math.max(1, Math.ceil(e.total / l.value))) : k = e.pageCount, k;
    }), f = I({
      get() {
        return pt(e.currentPage) ? d.value : e.currentPage;
      },
      set(k) {
        let C = k;
        k < 1 ? C = 1 : k > m.value && (C = m.value), pt(e.currentPage) && (d.value = C), i && (t("update:current-page", C), t("current-change", C));
      }
    });
    ae(m, (k) => {
      f.value > k && (f.value = k);
    });
    function v(k) {
      f.value = k;
    }
    function g(k) {
      l.value = k;
      const C = m.value;
      f.value > C && (f.value = C);
    }
    function y() {
      e.disabled || (f.value -= 1, t("prev-click", f.value));
    }
    function h() {
      e.disabled || (f.value += 1, t("next-click", f.value));
    }
    function w(k, C) {
      k && (k.props || (k.props = {}), k.props.class = [k.props.class, C].join(" "));
    }
    return kt(t2, {
      pageCount: m,
      disabled: I(() => e.disabled),
      currentPage: f,
      changeEvent: v,
      handleSizeChange: g
    }), () => {
      var k, C;
      if (!c.value)
        return r("el.pagination.deprecationWarning"), null;
      if (!e.layout || e.hideOnSinglePage && m.value <= 1)
        return null;
      const A = [], E = [], $ = Lt("div", { class: s.e("rightwrapper") }, E), M = {
        prev: Lt(yC, {
          disabled: e.disabled,
          currentPage: f.value,
          prevText: e.prevText,
          prevIcon: e.prevIcon,
          onClick: y
        }),
        jumper: Lt(ex, {
          size: e.small ? "small" : "default"
        }),
        pager: Lt(gx, {
          currentPage: f.value,
          pageCount: m.value,
          pagerCount: e.pagerCount,
          onChange: v,
          disabled: e.disabled
        }),
        next: Lt(EC, {
          disabled: e.disabled,
          currentPage: f.value,
          pageCount: m.value,
          nextText: e.nextText,
          nextIcon: e.nextIcon,
          onClick: h
        }),
        sizes: Lt(KC, {
          pageSize: l.value,
          pageSizes: e.pageSizes,
          popperClass: e.popperClass,
          disabled: e.disabled,
          teleported: e.teleported,
          size: e.small ? "small" : "default"
        }),
        slot: (C = (k = n == null ? void 0 : n.default) == null ? void 0 : k.call(n)) != null ? C : null,
        total: Lt(sx, { total: pt(e.total) ? 0 : e.total })
      }, O = e.layout.split(",").map((B) => B.trim());
      let R = !1;
      return O.forEach((B) => {
        if (B === "->") {
          R = !0;
          return;
        }
        R ? E.push(M[B]) : A.push(M[B]);
      }), w(A[0], s.is("first")), w(A[A.length - 1], s.is("last")), R && E.length > 0 && (w(E[0], s.is("first")), w(E[E.length - 1], s.is("last")), A.push($)), Lt("div", {
        class: [
          s.b(),
          s.is("background", e.background),
          {
            [s.m("small")]: e.small
          }
        ]
      }, A);
    };
  }
});
const _x = Ft(vx), s2 = Me({
  trigger: oo.trigger,
  placement: Js.placement,
  disabled: oo.disabled,
  visible: Mt.visible,
  transition: Mt.transition,
  popperOptions: Js.popperOptions,
  tabindex: Js.tabindex,
  content: Mt.content,
  popperStyle: Mt.popperStyle,
  popperClass: Mt.popperClass,
  enterable: {
    ...Mt.enterable,
    default: !0
  },
  effect: {
    ...Mt.effect,
    default: "light"
  },
  teleported: Mt.teleported,
  title: String,
  width: {
    type: [String, Number],
    default: 150
  },
  offset: {
    type: Number,
    default: void 0
  },
  showAfter: {
    type: Number,
    default: 0
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  autoClose: {
    type: Number,
    default: 0
  },
  showArrow: {
    type: Boolean,
    default: !0
  },
  persistent: {
    type: Boolean,
    default: !0
  },
  "onUpdate:visible": {
    type: Function
  }
}), bx = {
  "update:visible": (e) => cl(e),
  "before-enter": () => !0,
  "before-leave": () => !0,
  "after-enter": () => !0,
  "after-leave": () => !0
}, yx = "onUpdate:visible", wx = H({
  name: "ElPopover"
}), kx = /* @__PURE__ */ H({
  ...wx,
  props: s2,
  emits: bx,
  setup(e, { expose: t, emit: n }) {
    const r = e, s = I(() => r[yx]), o = Se("popover"), i = D(), a = I(() => {
      var y;
      return (y = _(i)) == null ? void 0 : y.popperRef;
    }), c = I(() => [
      {
        width: wr(r.width)
      },
      r.popperStyle
    ]), u = I(() => [o.b(), r.popperClass, { [o.m("plain")]: !!r.content }]), d = I(() => r.transition === `${o.namespace.value}-fade-in-linear`), l = () => {
      var y;
      (y = i.value) == null || y.hide();
    }, m = () => {
      n("before-enter");
    }, f = () => {
      n("before-leave");
    }, v = () => {
      n("after-enter");
    }, g = () => {
      n("update:visible", !1), n("after-leave");
    };
    return t({
      popperRef: a,
      hide: l
    }), (y, h) => (b(), X(_(so), je({
      ref_key: "tooltipRef",
      ref: i
    }, y.$attrs, {
      trigger: y.trigger,
      placement: y.placement,
      disabled: y.disabled,
      visible: y.visible,
      transition: y.transition,
      "popper-options": y.popperOptions,
      tabindex: y.tabindex,
      content: y.content,
      offset: y.offset,
      "show-after": y.showAfter,
      "hide-after": y.hideAfter,
      "auto-close": y.autoClose,
      "show-arrow": y.showArrow,
      "aria-label": y.title,
      effect: y.effect,
      enterable: y.enterable,
      "popper-class": _(u),
      "popper-style": _(c),
      teleported: y.teleported,
      persistent: y.persistent,
      "gpu-acceleration": _(d),
      "onUpdate:visible": _(s),
      onBeforeShow: m,
      onBeforeHide: f,
      onShow: v,
      onHide: g
    }), {
      content: Y(() => [
        y.title ? (b(), x("div", {
          key: 0,
          class: j(_(o).e("title")),
          role: "title"
        }, ve(y.title), 3)) : Q("v-if", !0),
        ne(y.$slots, "default", {}, () => [
          _r(ve(y.content), 1)
        ])
      ]),
      default: Y(() => [
        y.$slots.reference ? ne(y.$slots, "reference", { key: 0 }) : Q("v-if", !0)
      ]),
      _: 3
    }, 16, ["trigger", "placement", "disabled", "visible", "transition", "popper-options", "tabindex", "content", "offset", "show-after", "hide-after", "auto-close", "show-arrow", "aria-label", "effect", "enterable", "popper-class", "popper-style", "teleported", "persistent", "gpu-acceleration", "onUpdate:visible"]));
  }
});
var Cx = /* @__PURE__ */ ye(kx, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popover/src/popover.vue"]]);
const Ed = (e, t) => {
  const n = t.arg || t.value, r = n == null ? void 0 : n.popperRef;
  r && (r.triggerRef = e);
};
var xx = {
  mounted(e, t) {
    Ed(e, t);
  },
  updated(e, t) {
    Ed(e, t);
  }
};
const Sx = "popover", Ex = D4(xx, Sx), Ax = Ft(Cx, {
  directive: Ex
}), $x = Me({
  animated: {
    type: Boolean,
    default: !1
  },
  count: {
    type: Number,
    default: 1
  },
  rows: {
    type: Number,
    default: 3
  },
  loading: {
    type: Boolean,
    default: !0
  },
  throttle: {
    type: Number
  }
}), Mx = Me({
  variant: {
    type: String,
    values: [
      "circle",
      "rect",
      "h1",
      "h3",
      "text",
      "caption",
      "p",
      "image",
      "button"
    ],
    default: "text"
  }
}), Ix = H({
  name: "ElSkeletonItem"
}), Tx = /* @__PURE__ */ H({
  ...Ix,
  props: Mx,
  setup(e) {
    const t = Se("skeleton");
    return (n, r) => (b(), x("div", {
      class: j([_(t).e("item"), _(t).e(n.variant)])
    }, [
      n.variant === "image" ? (b(), X(_(R4), { key: 0 })) : Q("v-if", !0)
    ], 2));
  }
});
var Jo = /* @__PURE__ */ ye(Tx, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/skeleton/src/skeleton-item.vue"]]);
const Lx = H({
  name: "ElSkeleton"
}), Ox = /* @__PURE__ */ H({
  ...Lx,
  props: $x,
  setup(e, { expose: t }) {
    const n = e, r = Se("skeleton"), s = s5(Rt(n, "loading"), n.throttle);
    return t({
      uiLoading: s
    }), (o, i) => _(s) ? (b(), x("div", je({
      key: 0,
      class: [_(r).b(), _(r).is("animated", o.animated)]
    }, o.$attrs), [
      (b(!0), x(Pe, null, Je(o.count, (a) => (b(), x(Pe, { key: a }, [
        o.loading ? ne(o.$slots, "template", { key: a }, () => [
          ue(Jo, {
            class: j(_(r).is("first")),
            variant: "p"
          }, null, 8, ["class"]),
          (b(!0), x(Pe, null, Je(o.rows, (c) => (b(), X(Jo, {
            key: c,
            class: j([
              _(r).e("paragraph"),
              _(r).is("last", c === o.rows && o.rows > 1)
            ]),
            variant: "p"
          }, null, 8, ["class"]))), 128))
        ]) : Q("v-if", !0)
      ], 64))), 128))
    ], 16)) : ne(o.$slots, "default", Yr(je({ key: 1 }, o.$attrs)));
  }
});
var Rx = /* @__PURE__ */ ye(Ox, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/skeleton/src/skeleton.vue"]]);
const Px = Ft(Rx, {
  SkeletonItem: Jo
}), Fr = vs(Jo), Bx = "TOOLTIP_APPEND_TO";
function zx() {
  return $e(
    Bx,
    I(() => {
    })
  );
}
const i2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2012%2012'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M1%200.642857C1%200.287817%201.27473%200%201.61364%200H4.06818C4.40708%200%204.68182%200.287817%204.68182%200.642857V4.5C4.68182%204.85504%204.40708%205.14286%204.06818%205.14286H1.61364C1.27473%205.14286%201%204.85504%201%204.5V0.642857ZM2.22727%201.28571V3.85714H3.45455V1.28571H2.22727ZM6.31818%200.642857C6.31818%200.287817%206.59292%200%206.93182%200H8.15909C8.49799%200%208.77273%200.287817%208.77273%200.642857V3.85714H9.38636C9.72527%203.85714%2010%204.14496%2010%204.5C10%204.85504%209.72527%205.14286%209.38636%205.14286H6.93182C6.59292%205.14286%206.31818%204.85504%206.31818%204.5C6.31818%204.14496%206.59292%203.85714%206.93182%203.85714H7.54545V1.28571H6.93182C6.59292%201.28571%206.31818%200.997897%206.31818%200.642857ZM1%207.5C1%207.14496%201.27473%206.85714%201.61364%206.85714H2.84091C3.17981%206.85714%203.45455%207.14496%203.45455%207.5V10.7143H4.06818C4.40708%2010.7143%204.68182%2011.0021%204.68182%2011.3571C4.68182%2011.7122%204.40708%2012%204.06818%2012H1.61364C1.27473%2012%201%2011.7122%201%2011.3571C1%2011.0021%201.27473%2010.7143%201.61364%2010.7143H2.22727V8.14286H1.61364C1.27473%208.14286%201%207.85504%201%207.5ZM6.31818%207.5C6.31818%207.14496%206.59292%206.85714%206.93182%206.85714H9.38636C9.72527%206.85714%2010%207.14496%2010%207.5V11.3571C10%2011.7122%209.72527%2012%209.38636%2012H6.93182C6.59292%2012%206.31818%2011.7122%206.31818%2011.3571V7.5ZM7.54545%208.14286V10.7143H8.77273V8.14286H7.54545Z'%20/%3e%3c/svg%3e", Dx = "data:image/svg+xml,%3csvg%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M13.2251%201.02271C13.5179%200.968554%2013.8195%201.00233%2014.0913%201.11939L14.2055%201.17506L14.3149%201.23951C14.5275%201.37763%2014.7014%201.56758%2014.8208%201.79127L14.8764%201.90553L14.9214%202.02467C15.0145%202.30522%2015.0227%202.60793%2014.9438%202.89478C14.9403%202.90772%2014.9372%202.92106%2014.9331%202.93385L13.0132%208.95338L12.9965%209.00025H19.9995C20.3769%208.99952%2020.7471%209.10523%2021.0669%209.30592C21.3874%209.50712%2021.6437%209.79562%2021.8071%2010.137C21.9704%2010.4783%2022.0341%2010.8588%2021.9897%2011.2346C21.9453%2011.6105%2021.7946%2011.9661%2021.5561%2012.26C21.5375%2012.2829%2021.5181%2012.3052%2021.4975%2012.3264L11.5971%2022.5266L11.5962%2022.5256C11.3774%2022.7595%2011.0907%2022.9194%2010.7749%2022.9778C10.4403%2023.0397%2010.0944%2022.9859%209.7944%2022.8254C9.4944%2022.665%209.25775%2022.4066%209.1235%2022.094C8.98941%2021.7815%208.96593%2021.4327%209.05612%2021.1047L9.06686%2021.0657L10.9868%2015.0462L11.0034%2015.0003H3.99948C3.62236%2015.0008%203.25253%2014.8941%202.93307%2014.6936C2.61276%2014.4925%202.35617%2014.2047%202.19284%2013.8635C2.02947%2013.5221%201.96581%2013.1408%202.01022%2012.7649C2.05468%2012.3892%202.20544%2012.0333%202.44382%2011.7395C2.46238%2011.7167%202.4819%2011.6942%202.50241%2011.6731L12.4028%201.47389C12.6215%201.23984%2012.9091%201.08117%2013.2251%201.02271Z'%20fill='currentColor'%20fill-opacity='0.9'%20style='fill:currentColor;fill-opacity:0.9;'/%3e%3c/svg%3e", a2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9%203L9%2021'%20stroke='currentColor'%20style='stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M15%203L15%2021'%20stroke='currentColor'%20style='stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e", c2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2012%2012'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M10.3019%200C10.542%200%2010.7678%200.0476193%2010.9791%200.142858C11.1905%200.238096%2011.373%200.371429%2011.5267%200.542858C11.6805%200.714286%2011.8005%200.92381%2011.887%201.17143C11.9735%201.40952%2012.0167%201.67619%2012.0167%201.97143L12.0023%203.38571C12.0023%203.50952%2012.0023%203.61429%2012.0023%203.7C12.0119%203.78571%2012.0263%203.87143%2012.0455%203.95714C12.0647%204.04286%2012.0936%204.13333%2012.132%204.22857C12.18%204.31429%2012.2425%204.42857%2012.3193%204.57143L12.8237%205.24286C12.9198%205.4619%2012.9774%205.66667%2012.9966%205.85714C13.0158%206.0381%2012.9534%206.25238%2012.8093%206.5L12.3337%207.11429C12.2569%207.26667%2012.1944%207.39524%2012.1464%207.5C12.108%207.60476%2012.0791%207.70476%2012.0599%207.8C12.0407%207.89524%2012.0263%207.99524%2012.0167%208.1C12.0167%208.20476%2012.0167%208.33333%2012.0167%208.48571V9.7C12.0167%2010.0048%2011.9783%2010.2952%2011.9014%2010.5714C11.8342%2010.8381%2011.7333%2011.0714%2011.5988%2011.2714C11.4739%2011.4714%2011.3154%2011.6286%2011.1233%2011.7429C10.9311%2011.8571%2010.7198%2011.9143%2010.4892%2011.9143L9.49487%2012C9.48526%2012%209.42282%2012%209.30753%2012C9.19225%2012%209.05775%2011.9905%208.90404%2011.9714C8.75993%2011.9619%208.61103%2011.9381%208.45731%2011.9C8.31321%2011.8714%208.20273%2011.819%208.12587%2011.7429C8.06823%2011.6952%208.0202%2011.619%207.98177%2011.5143C7.95295%2011.4095%207.93854%2011.3095%207.93854%2011.2143C7.93854%2011.0238%208.00579%2010.8762%208.14028%2010.7714C8.27478%2010.6667%208.42369%2010.6%208.58701%2010.5714C8.75993%2010.5333%208.92806%2010.5143%209.09137%2010.5143H9.71102C10.0953%2010.5143%2010.2826%2010.1857%2010.273%209.52857L10.2586%208.22857C10.2586%207.94286%2010.2682%207.72381%2010.2874%207.57143C10.3163%207.40952%2010.3595%207.27619%2010.4171%207.17143C10.4844%207.06667%2010.566%206.9619%2010.6621%206.85714C10.7582%206.75238%2010.8735%206.60476%2011.008%206.41429C11.0944%206.29048%2011.1665%206.19048%2011.2241%206.11429C11.2818%206.02857%2011.3154%205.94762%2011.325%205.87143C11.3346%205.79524%2011.3154%205.70952%2011.2674%205.61429C11.2289%205.51905%2011.1569%205.39048%2011.0512%205.22857C10.8975%205%2010.7678%204.81905%2010.6621%204.68571C10.566%204.55238%2010.4844%204.42857%2010.4171%204.31429C10.3595%204.2%2010.3163%204.08095%2010.2874%203.95714C10.2682%203.83333%2010.2586%203.66191%2010.2586%203.44286V2.41429C10.2586%202.29048%2010.2538%202.17143%2010.2442%202.05714C10.2442%201.94286%2010.225%201.84286%2010.1866%201.75714C10.1481%201.67143%2010.0857%201.60476%209.99923%201.55714C9.92238%201.50952%209.8119%201.48571%209.66779%201.48571H9.01932C9.00972%201.48571%208.97129%201.48571%208.90404%201.48571C8.83679%201.48571%208.75513%201.48095%208.65906%201.47143C8.56299%201.45238%208.46212%201.42857%208.35644%201.4C8.25076%201.36191%208.1595%201.30476%208.08264%201.22857C8.025%201.18095%207.97697%201.10476%207.93854%201C7.90972%200.895238%207.89531%200.795238%207.89531%200.7C7.89531%200.509524%207.96256%200.361905%208.09705%200.257143C8.23155%200.152381%208.38526%200.0857146%208.55819%200.057143C8.73111%200.0190477%208.89924%200%209.06255%200H10.3019Z%20M3.93745%200C4.10077%200%204.26889%200.0190477%204.44181%200.057143C4.61474%200.0857146%204.76845%200.152381%204.90295%200.257143C5.03745%200.361905%205.10469%200.509524%205.10469%200.7C5.10469%200.795238%205.08548%200.895238%205.04705%201C5.01823%201.10476%204.975%201.18095%204.91736%201.22857C4.8405%201.30476%204.74924%201.36191%204.64356%201.4C4.53788%201.42857%204.43701%201.45238%204.34094%201.47143C4.24487%201.48095%204.16321%201.48571%204.09596%201.48571C4.02871%201.48571%203.99029%201.48571%203.98068%201.48571H3.33221C3.1881%201.48571%203.07282%201.50952%202.98636%201.55714C2.9095%201.60476%202.85186%201.67143%202.81343%201.75714C2.775%201.84286%202.75099%201.94286%202.74138%202.05714C2.74138%202.17143%202.74138%202.29048%202.74138%202.41429V3.44286C2.74138%203.66191%202.72697%203.83333%202.69815%203.95714C2.67893%204.08095%202.6357%204.2%202.56845%204.31429C2.51081%204.42857%202.42915%204.55238%202.32348%204.68571C2.22741%204.81905%202.10251%205%201.9488%205.22857C1.84313%205.39048%201.76627%205.51905%201.71824%205.61429C1.67981%205.70952%201.6654%205.79524%201.675%205.87143C1.68461%205.94762%201.71824%206.02857%201.77588%206.11429C1.83352%206.19048%201.90557%206.29048%201.99203%206.41429C2.12653%206.60476%202.24182%206.75238%202.33789%206.85714C2.43396%206.9619%202.51081%207.06667%202.56845%207.17143C2.6357%207.27619%202.67893%207.40952%202.69815%207.57143C2.72697%207.72381%202.74138%207.94286%202.74138%208.22857L2.72697%209.52857C2.71736%2010.1857%202.9047%2010.5143%203.28898%2010.5143H3.90863C4.07194%2010.5143%204.23526%2010.5333%204.39858%2010.5714C4.57151%2010.6%204.72522%2010.6667%204.85972%2010.7714C4.99421%2010.8762%205.06146%2011.0238%205.06146%2011.2143C5.06146%2011.3095%205.04225%2011.4095%205.00382%2011.5143C4.975%2011.619%204.93177%2011.6952%204.87413%2011.7429C4.79727%2011.819%204.68199%2011.8714%204.52828%2011.9C4.38417%2011.9381%204.23526%2011.9619%204.08155%2011.9714C3.93745%2011.9905%203.80775%2012%203.69247%2012C3.57719%2012%203.51474%2012%203.50513%2012L2.51081%2011.9143C2.28024%2011.9143%202.06889%2011.8571%201.87675%2011.7429C1.68461%2011.6286%201.52129%2011.4714%201.3868%2011.2714C1.2619%2011.0714%201.16103%2010.8381%201.08418%2010.5714C1.01693%2010.2952%200.983302%2010.0048%200.983302%209.7V8.48571C0.983302%208.33333%200.978499%208.20476%200.968892%208.1C0.968892%207.99524%200.959285%207.89524%200.940071%207.8C0.920857%207.70476%200.887232%207.60476%200.839198%207.5C0.80077%207.39524%200.743128%207.26667%200.666272%207.11429L0.190727%206.5C0.0466221%206.25238%20-0.0158233%206.0381%200.00339071%205.85714C0.0226046%205.66667%200.0802464%205.4619%200.176316%205.24286L0.680682%204.57143C0.757538%204.42857%200.81518%204.31429%200.853608%204.22857C0.901643%204.13333%200.935267%204.04286%200.954481%203.95714C0.973695%203.87143%200.983302%203.78571%200.983302%203.7C0.992909%203.61429%200.997712%203.50952%200.997712%203.38571L0.983302%201.97143C0.983302%201.67619%201.02653%201.40952%201.113%201.17143C1.19946%200.92381%201.31955%200.714286%201.47326%200.542858C1.62697%200.371429%201.8095%200.238096%202.02086%200.142858C2.23221%200.0476193%202.45797%200%202.69815%200H3.93745Z'%20/%3e%3c/svg%3e", l2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M13.3333%2012.5525V12.4489C14.2278%2012.0756%2014.8571%2011.1925%2014.8571%2010.1632V3.61924C14.8571%202.96252%2014.5962%202.3327%2014.1318%201.86832C13.6675%201.40395%2013.0376%201.14307%2012.3809%201.14307H5.90473C5.38113%201.14296%204.87098%201.30883%204.44756%201.61684C4.02414%201.92485%203.70926%202.35915%203.54816%202.85734H3.39501C2.70016%202.85734%202.10892%203.10191%201.70206%203.5842C1.30739%204.05124%201.14282%204.67372%201.14282%205.33352V12.0002C1.14282%2012.8078%201.43463%2013.5346%201.98854%2014.0573C2.54168%2014.5777%203.30892%2014.8535%204.19044%2014.8535H7.17711L10.2826%2014.8573H10.2842C11.0278%2014.8611%2011.7645%2014.7049%2012.336%2014.3392C12.9303%2013.9582%2013.3333%2013.3525%2013.3333%2012.5525ZM3.39501%204.0002H3.42854V10.1625C3.42854%2010.8192%203.68942%2011.449%204.1538%2011.9134C4.61817%2012.3777%205.248%2012.6386%205.90473%2012.6386H12.1874C12.163%2012.9571%2012.003%2013.1948%2011.7196%2013.3761C11.3897%2013.588%2010.8891%2013.7175%2010.2887%2013.7144H10.2857L7.17558%2013.7106H4.19044C3.54816%2013.7106%203.07806%2013.5125%202.7733%2013.2253C2.47006%2012.9403%202.28568%2012.5259%202.28568%2012.0002V5.33352C2.28568%204.84971%202.40758%204.52057%202.5752%204.32096C2.73139%204.13658%202.98054%204.0002%203.39501%204.0002ZM8.01673%203.80972H11.619C11.7706%203.80972%2011.9159%203.86992%2012.0231%203.97709C12.1302%204.08425%2012.1904%204.22959%2012.1904%204.38115V7.98418C12.1904%208.13573%2012.1302%208.28107%2012.0231%208.38823C11.9159%208.4954%2011.7706%208.5556%2011.619%208.5556C11.4675%208.5556%2011.3221%208.4954%2011.215%208.38823C11.1078%208.28107%2011.0476%208.13573%2011.0476%207.98418V5.76019L7.07044%209.73731C7.0177%209.79186%206.95463%209.83536%206.8849%209.86528C6.81517%209.89519%206.74018%209.91092%206.6643%209.91154C6.58843%209.91217%206.51319%209.89767%206.44298%209.86891C6.37277%209.84014%206.30899%209.79768%206.25536%209.74401C6.20173%209.69033%206.15933%209.62651%206.13063%209.55627C6.10193%209.48603%206.08751%209.41078%206.0882%209.3349C6.0889%209.25903%206.1047%209.18406%206.13468%209.11435C6.16466%209.04465%206.20822%208.98162%206.26282%208.92893L10.24%204.95257H8.01673C7.86517%204.95257%207.71983%204.89237%207.61267%204.7852C7.5055%204.67804%207.4453%204.5327%207.4453%204.38115C7.4453%204.22959%207.5055%204.08425%207.61267%203.97709C7.71983%203.86992%207.86517%203.80972%208.01673%203.80972Z'%20/%3e%3c/svg%3e", u2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2012%2012'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M1.63636%200H8.18182C9.08556%200%209.81818%200.732625%209.81818%201.63636C9.81818%202.5401%209.08556%203.27273%208.18182%203.27273H1.63636C0.732626%203.27273%200%202.5401%200%201.63636C0%200.732625%200.732625%200%201.63636%200ZM1.63636%201.09091C1.33512%201.09091%201.09091%201.33512%201.09091%201.63636C1.09091%201.93761%201.33512%202.18182%201.63636%202.18182H8.18182C8.48306%202.18182%208.72727%201.93761%208.72727%201.63636C8.72727%201.33512%208.48306%201.09091%208.18182%201.09091H1.63636Z%20M7.09091%204.36353H11.4545C12.3583%204.36353%2013.0909%205.09615%2013.0909%205.99989C13.0909%206.90363%2012.3583%207.63625%2011.4545%207.63625H7.09091C6.18717%207.63625%205.45454%206.90363%205.45454%205.99989C5.45454%205.09615%206.18717%204.36353%207.09091%204.36353ZM7.09091%205.45443C6.78966%205.45443%206.54545%205.69864%206.54545%205.99989C6.54545%206.30114%206.78966%206.54534%207.09091%206.54534H11.4545C11.7558%206.54534%2012%206.30114%2012%205.99989C12%205.69864%2011.7558%205.45443%2011.4545%205.45443H7.09091Z%20M7.09091%208.72729H11.4545C12.3583%208.72729%2013.0909%209.45992%2013.0909%2010.3637C13.0909%2011.2674%2012.3583%2012%2011.4545%2012H7.09091C6.18717%2012%205.45454%2011.2674%205.45454%2010.3637C5.45454%209.45992%206.18717%208.72729%207.09091%208.72729ZM7.09091%209.8182C6.78966%209.8182%206.54545%2010.0624%206.54545%2010.3637C6.54545%2010.6649%206.78966%2010.9091%207.09091%2010.9091H11.4545C11.7558%2010.9091%2012%2010.6649%2012%2010.3637C12%2010.0624%2011.7558%209.8182%2011.4545%209.8182H7.09091Z'%20/%3e%3c/svg%3e", d2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%202V5'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M12%2019V22'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M12%202V5'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M12%2019V22'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M22.005%2011.9951L19.005%2011.9951'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M5.005%2011.9951L2.005%2011.9951'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M19.0796%2019.0676L16.9583%2016.9463'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M7.05884%207.04688L4.93752%204.92555'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M4.9375%2019.0676L7.05882%2016.9463'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M16.9583%207.04688L19.0796%204.92556'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'/%3e%3c/svg%3e", f2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2014%2014'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M%2014%207%20C%2014%2010.866%2010.866%2014%207%2014%20C%203.134%2014%200%2010.866%200%207%20C%200%203.134%203.134%200%207%200%20C%2010.866%200%2014%203.134%2014%207%20Z%20M%2011.243%206%20L%202.758%206%20L%202.758%208%20L%2011.243%208%20L%2011.243%206%20Z'%20/%3e%3c/svg%3e", p2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2014%2014'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M%2014%207%20C%2014%2010.866%2010.866%2014%207%2014%20C%203.134%2014%200%2010.866%200%207%20C%200%203.134%203.134%200%207%200%20C%2010.866%200%2014%203.134%2014%207%20Z%20M%202.575%207.728%20L%205.782%2010.935%20L%2011.489%205.228%20L%2010.075%203.814%20L%205.782%208.107%20L%203.989%206.314%20L%202.575%207.728%20Z'%20/%3e%3c/svg%3e", h2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2014%2014'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M%204.207%202.793%20L%207%205.586%20L%209.793%202.793%20L%2011.207%204.207%20L%208.414%207%20L%2011.207%209.793%20L%209.793%2011.207%20L%207%208.414%20L%204.207%2011.207%20L%202.793%209.793%20L%205.586%207%20L%202.793%204.207%20L%204.207%202.793%20Z%20M%207%200%20C%203.134%200%200%203.134%200%207%20C%200%2010.866%203.134%2014%207%2014%20C%2010.866%2014%2014%2010.866%2014%207%20C%2014%203.134%2010.866%200%207%200%20Z'%20/%3e%3c/svg%3e", g2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2014%2014'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M%2014%207.006%20C%2014%208.867%2013.162%2010.744%2011.95%2011.956%20C%2010.738%2013.168%208.861%2014.006%207%2014.006%20C%205.139%2014.006%203.262%2013.168%202.05%2011.956%20C%200.838%2010.744%200%208.867%200%207.006%20C%200%205.145%200.838%203.268%202.05%202.056%20C%203.262%200.844%205.139%200.006%207%200.006%20C%208.861%200.006%2010.738%200.844%2011.95%202.056%20C%2013.162%203.268%2014%205.145%2014%207.006%20Z%20M%2010.536%203.47%20C%209.576%202.511%208.453%202.006%207%202.006%20C%205.547%202.006%204.424%202.511%203.464%203.47%20C%202.505%204.43%202%205.553%202%207.006%20C%202%208.459%202.505%209.582%203.464%2010.542%20C%204.424%2011.501%205.547%2012.006%207%2012.006%20C%208.453%2012.006%209.576%2011.501%2010.536%2010.542%20C%2011.495%209.582%2012%208.459%2012%207.006%20C%2012%205.553%2011.495%204.43%2010.536%203.47%20Z'%20/%3e%3c/svg%3e", m2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2014%2014'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M13.8668%208.36613L11.9048%207.978C11.967%207.66329%2012%207.33649%2012%207C12%206.66351%2011.967%206.3367%2011.9048%206.022L13.8668%205.63387C13.9542%206.07571%2014%206.5325%2014%207C14%207.4675%2013.9542%207.92429%2013.8668%208.36613ZM12.821%203.11069L11.159%204.22333C10.7934%203.67721%2010.3228%203.2066%209.77667%202.84098L10.8893%201.17904C11.6527%201.6901%2012.3099%202.34733%2012.821%203.11069ZM8.36613%200.133238L7.978%202.09521C7.66329%202.03296%207.33649%202%207%202C6.66351%202%206.3367%202.03296%206.022%202.09521L5.63387%200.133238C6.07571%200.0458286%206.5325%200%207%200C7.4675%200%207.92429%200.0458285%208.36613%200.133238ZM3.11069%201.17904L4.22333%202.84098C3.67721%203.2066%203.2066%203.67721%202.84098%204.22333L1.17904%203.11069C1.6901%202.34733%202.34733%201.6901%203.11069%201.17904ZM0.133238%205.63387C0.0458285%206.07571%200%206.5325%200%207C0%207.4675%200.0458286%207.92429%200.133238%208.36613L2.09521%207.978C2.03296%207.6633%202%207.33649%202%207C2%206.66351%202.03296%206.33671%202.09521%206.022L0.133238%205.63387ZM1.17904%2010.8893L2.84098%209.77667C3.2066%2010.3228%203.67721%2010.7934%204.22333%2011.159L3.11069%2012.821C2.34733%2012.3099%201.6901%2011.6527%201.17904%2010.8893ZM5.63387%2013.8668L6.022%2011.9048C6.33671%2011.967%206.66351%2012%207%2012C7.33649%2012%207.6633%2011.967%207.978%2011.9048L8.36613%2013.8668C7.92429%2013.9542%207.4675%2014%207%2014C6.5325%2014%206.07571%2013.9542%205.63387%2013.8668ZM10.8893%2012.821L9.77667%2011.159C10.3228%2010.7934%2010.7934%2010.3228%2011.159%209.77667L12.821%2010.8893C12.3099%2011.6527%2011.6527%2012.3099%2010.8893%2012.821Z'%20/%3e%3c/svg%3e", v2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2014%2014'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M7%2014C10.866%2014%2014%2010.866%2014%207C14%203.13401%2010.866%200%207%200C3.13401%200%200%203.13401%200%207C0%2010.866%203.13401%2014%207%2014ZM7%2012C4.23858%2012%202%209.76142%202%207C2%204.23858%204.23858%202%207%202C9.76142%202%2012%204.23858%2012%207C12%209.76142%209.76142%2012%207%2012ZM6%203V8H11C11%205.23858%208.76142%203%206%203Z'%20/%3e%3c/svg%3e", _2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2014%2014'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M%2014%207%20C%2014%2010.866%2010.866%2014%207%2014%20C%203.134%2014%200%2010.866%200%207%20C%200%203.134%203.134%200%207%200%20C%2010.866%200%2014%203.134%2014%207%20Z%20M%206.5%209%20C%206.224%209%206%209.224%206%209.5%20L%206%2010.5%20C%206%2010.776%206.224%2011%206.5%2011%20L%207.5%2011%20C%207.776%2011%208%2010.776%208%2010.5%20L%208%209.5%20C%208%209.224%207.776%209%207.5%209%20L%206.5%209%20Z%20M%206.5%203%20C%206.224%203%206%203.224%206%203.5%20L%206%207.5%20C%206%207.776%206.224%208%206.5%208%20L%207.5%208%20C%207.776%208%208%207.776%208%207.5%20L%208%203.5%20C%208%203.224%207.776%203%207.5%203%20L%206.5%203%20Z'%20/%3e%3c/svg%3e", b2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2012%2012'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M1.78814e-07%200.666667C1.78814e-07%200.298477%200.298477%200%200.666667%200H11.3333C11.7015%200%2012%200.298477%2012%200.666667C12%201.03486%2011.7015%201.33333%2011.3333%201.33333H0.666667C0.298477%201.33333%201.78814e-07%201.03486%201.78814e-07%200.666667ZM1.78814e-07%203.62963C1.78814e-07%203.26144%200.298477%202.96296%200.666667%202.96296H11.3333C11.7015%202.96296%2012%203.26144%2012%203.62963C12%203.99782%2011.7015%204.2963%2011.3333%204.2963H0.666667C0.298477%204.2963%201.78814e-07%203.99782%201.78814e-07%203.62963ZM0%206.59259C0%206.2244%200.298477%205.92593%200.666667%205.92593H11.3333C11.7015%205.92593%2012%206.2244%2012%206.59259C12%206.96078%2011.7015%207.25926%2011.3333%207.25926H0.666667C0.298477%207.25926%200%206.96078%200%206.59259ZM0%209.55556C0%209.18737%200.298477%208.88889%200.666667%208.88889H8.66667C9.03486%208.88889%209.33333%209.18737%209.33333%209.55556C9.33333%209.92375%209.03486%2010.2222%208.66667%2010.2222H0.666667C0.298477%2010.2222%200%209.92375%200%209.55556Z'%20/%3e%3c/svg%3e", y2 = "data:image/svg+xml,%3csvg%20aria-hidden='true'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20style='stroke:currentColor;stroke-opacity:%201;'%20d='M8%208V4a2%202%200%200%201%202-2h4a2%202%200%200%201%202%202v4m6%2012V10a2%202%200%200%200-2-2H4a2%202%200%200%200-2%202v10a2%202%200%200%200%202%202h16a2%202%200%200%200%202-2ZM8%2013v4m8-4v4M2%2015h20'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'/%3e%3c/svg%3e", w2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%20512%20512'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M214.433%2056C232.908%2023.9999%20279.096%2024.0001%20297.571%2056L477.704%20368C496.18%20400%20473.085%20440%20436.135%20440H75.8685C38.918%20440%2015.8241%20400%2034.2993%20368L214.433%2056ZM256.002%20144L131.294%20360H380.709L256.002%20144Z'%20/%3e%3c/svg%3e", k2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='2'%20y='2'%20width='5'%20height='5'%20rx='1'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'/%3e%3crect%20x='17'%20y='2'%20width='5'%20height='5'%20rx='1'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'/%3e%3crect%20x='17'%20y='17'%20width='5'%20height='5'%20rx='1'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'/%3e%3crect%20x='2'%20y='17'%20width='5'%20height='5'%20rx='1'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'/%3e%3crect%20x='7'%20y='3'%20width='10'%20height='2'%20fill='currentColor'%20style='fill:currentColor;fill-opacity:1;'/%3e%3crect%20x='7'%20y='19'%20width='10'%20height='2'%20fill='currentColor'%20style='fill:currentColor;fill-opacity:1;'/%3e%3crect%20x='3'%20y='7'%20width='2'%20height='10'%20fill='currentColor'%20style='fill:currentColor;fill-opacity:1;'/%3e%3crect%20x='19'%20y='7'%20width='2'%20height='10'%20fill='currentColor'%20style='fill:currentColor;fill-opacity:1;'/%3e%3c/svg%3e", Nx = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function qx(e, t) {
  return b(), x("svg", Nx, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M21 12H9m12 6H7M21 6H3"
    }, null, -1)
  ]));
}
const C2 = { name: "lucide-align-right", render: qx }, Fx = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function jx(e, t) {
  return b(), x("svg", Fx, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "20",
        height: "5",
        x: "2",
        y: "3",
        rx: "1"
      }),
      p("path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8m-10 4h4" })
    ], -1)
  ]));
}
const x2 = { name: "lucide-archive", render: jx }, Hx = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function Vx(e, t) {
  return b(), x("svg", Hx, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 5v14m7-7l-7 7l-7-7"
    }, null, -1)
  ]));
}
const S2 = { name: "lucide-arrow-down", render: Vx }, Ux = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function Zx(e, t) {
  return b(), x("svg", Ux, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m12 19l-7-7l7-7m7 7H5"
    }, null, -1)
  ]));
}
const Rc = { name: "lucide-arrow-left", render: Zx }, Wx = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function Gx(e, t) {
  return b(), x("svg", Wx, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 3L4 7l4 4M4 7h16m-4 14l4-4l-4-4m4 4H4"
    }, null, -1)
  ]));
}
const E2 = { name: "lucide-arrow-left-right", render: Gx }, Kx = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function Xx(e, t) {
  return b(), x("svg", Kx, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 12h14m-7-7l7 7l-7 7"
    }, null, -1)
  ]));
}
const A2 = { name: "lucide-arrow-right", render: Xx }, Yx = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function Jx(e, t) {
  return b(), x("svg", Yx, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M3 5v14m18-7H7m8 6l6-6l-6-6"
    }, null, -1)
  ]));
}
const Qx = { name: "lucide-arrow-right-from-line", render: Jx }, e7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function t7(e, t) {
  return b(), x("svg", e7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M17 12H3m8 6l6-6l-6-6m10-1v14"
    }, null, -1)
  ]));
}
const n7 = { name: "lucide-arrow-right-to-line", render: t7 }, r7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function o7(e, t) {
  return b(), x("svg", r7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m5 12l7-7l7 7m-7 7V5"
    }, null, -1)
  ]));
}
const $2 = { name: "lucide-arrow-up", render: o7 }, s7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function i7(e, t) {
  return b(), x("svg", s7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "4"
      }),
      p("path", { d: "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" })
    ], -1)
  ]));
}
const M2 = { name: "lucide-at-sign", render: i7 }, a7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function c7(e, t) {
  return b(), x("svg", a7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "m4.9 4.9l14.2 14.2" })
    ], -1)
  ]));
}
const I2 = { name: "lucide-ban", render: c7 }, l7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function u7(e, t) {
  return b(), x("svg", l7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M10.268 21a2 2 0 0 0 3.464 0m-10.47-5.674A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
    }, null, -1)
  ]));
}
const T2 = { name: "lucide-bell", render: u7 }, d7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function f7(e, t) {
  return b(), x("svg", d7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
    }, null, -1)
  ]));
}
const L2 = { name: "lucide-book", render: f7 }, p7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function h7(e, t) {
  return b(), x("svg", p7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 8V4H8" }),
      p("rect", {
        width: "16",
        height: "12",
        x: "4",
        y: "8",
        rx: "2"
      }),
      p("path", { d: "M2 14h2m16 0h2m-7-1v2m-6-2v2" })
    ], -1)
  ]));
}
const O2 = { name: "lucide-bot", render: h7 }, g7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function m7(e, t) {
  return b(), x("svg", g7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" }),
      p("path", { d: "m3.3 7l8.7 5l8.7-5M12 22V12" })
    ], -1)
  ]));
}
const R2 = { name: "lucide-box", render: m7 }, v7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function _7(e, t) {
  return b(), x("svg", v7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 5a3 3 0 1 0-5.997.125a4 4 0 0 0-2.526 5.77a4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" }),
      p("path", { d: "M12 5a3 3 0 1 1 5.997.125a4 4 0 0 1 2.526 5.77a4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" }),
      p("path", { d: "M15 13a4.5 4.5 0 0 1-3-4a4.5 4.5 0 0 1-3 4m8.599-6.5a3 3 0 0 0 .399-1.375m-11.995 0A3 3 0 0 0 6.401 6.5m-2.924 4.396a4 4 0 0 1 .585-.396m15.876 0a4 4 0 0 1 .585.396M6 18a4 4 0 0 1-1.967-.516m15.934 0A4 4 0 0 1 18 18" })
    ], -1)
  ]));
}
const P2 = { name: "lucide-brain", render: _7 }, b7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function y7(e, t) {
  return b(), x("svg", b7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "m8 2l1.88 1.88m4.24 0L16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" }),
      p("path", { d: "M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6m0 0v-9" }),
      p("path", { d: "M6.53 9C4.6 8.8 3 7.1 3 5m3 8H2m1 8c0-2.1 1.7-3.9 3.8-4M20.97 5c0 2.1-1.6 3.8-3.5 4M22 13h-4m-.8 4c2.1.1 3.8 1.9 3.8 4" })
    ], -1)
  ]));
}
const B2 = { name: "lucide-bug", render: y7 }, w7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function k7(e, t) {
  return b(), x("svg", w7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "16",
        height: "20",
        x: "4",
        y: "2",
        rx: "2"
      }),
      p("path", { d: "M8 6h8m0 8v4m0-8h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" })
    ], -1)
  ]));
}
const z2 = { name: "lucide-calculator", render: k7 }, C7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function x7(e, t) {
  return b(), x("svg", C7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M8 2v4m8-4v4" }),
      p("rect", {
        width: "18",
        height: "18",
        x: "3",
        y: "4",
        rx: "2"
      }),
      p("path", { d: "M3 10h18" })
    ], -1)
  ]));
}
const D2 = { name: "lucide-calendar", render: x7 }, S7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function E7(e, t) {
  return b(), x("svg", S7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m3 15l4-8l4 8m-7-2h6m5-2h4.5a2 2 0 0 1 0 4H15V7h4a2 2 0 0 1 0 4"
    }, null, -1)
  ]));
}
const N2 = { name: "lucide-case-upper", render: E7 }, A7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function $7(e, t) {
  return b(), x("svg", A7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M13 17V9m5 8v-3M3 3v16a2 2 0 0 0 2 2h16M8 17V5"
    }, null, -1)
  ]));
}
const q2 = { name: "lucide-chart-column-decreasing", render: $7 }, M7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function I7(e, t) {
  return b(), x("svg", M7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M20 6L9 17l-5-5"
    }, null, -1)
  ]));
}
const F2 = { name: "lucide-check", render: I7 }, T7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function L7(e, t) {
  return b(), x("svg", T7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M18 6L7 17l-5-5m20-2l-7.5 7.5L13 16"
    }, null, -1)
  ]));
}
const j2 = { name: "lucide-check-check", render: L7 }, O7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function R7(e, t) {
  return b(), x("svg", O7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m6 9l6 6l6-6"
    }, null, -1)
  ]));
}
const No = { name: "lucide-chevron-down", render: R7 }, P7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function B7(e, t) {
  return b(), x("svg", P7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m15 18l-6-6l6-6"
    }, null, -1)
  ]));
}
const qo = { name: "lucide-chevron-left", render: B7 }, z7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function D7(e, t) {
  return b(), x("svg", z7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m9 18l6-6l-6-6"
    }, null, -1)
  ]));
}
const Fo = { name: "lucide-chevron-right", render: D7 }, N7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function q7(e, t) {
  return b(), x("svg", N7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m18 15l-6-6l-6 6"
    }, null, -1)
  ]));
}
const jo = { name: "lucide-chevron-up", render: q7 }, F7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function j7(e, t) {
  return b(), x("svg", F7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m7 20l5-5l5 5M7 4l5 5l5-5"
    }, null, -1)
  ]));
}
const H7 = { name: "lucide-chevrons-down-up", render: j7 }, V7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function U7(e, t) {
  return b(), x("svg", V7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m11 17l-5-5l5-5m7 10l-5-5l5-5"
    }, null, -1)
  ]));
}
const H2 = { name: "lucide-chevrons-left", render: U7 }, Z7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function W7(e, t) {
  return b(), x("svg", Z7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m7 15l5 5l5-5M7 9l5-5l5 5"
    }, null, -1)
  ]));
}
const V2 = { name: "lucide-chevrons-up-down", render: W7 }, G7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function K7(e, t) {
  return b(), x("svg", G7, t[0] || (t[0] = [
    p("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, null, -1)
  ]));
}
const U2 = { name: "lucide-circle", render: K7 }, X7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function Y7(e, t) {
  return b(), x("svg", X7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "M12 8v4m0 4h.01" })
    ], -1)
  ]));
}
const Z2 = { name: "lucide-circle-alert", render: Y7 }, J7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function Q7(e, t) {
  return b(), x("svg", J7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "m9 12l2 2l4-4" })
    ], -1)
  ]));
}
const W2 = { name: "lucide-circle-check", render: Q7 }, e9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function t9(e, t) {
  return b(), x("svg", e9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("circle", {
        cx: "12",
        cy: "12",
        r: "1"
      })
    ], -1)
  ]));
}
const G2 = { name: "lucide-circle-dot", render: t9 }, n9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function r9(e, t) {
  return b(), x("svg", n9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01" })
    ], -1)
  ]));
}
const Pc = { name: "lucide-circle-help", render: r9 }, o9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function s9(e, t) {
  return b(), x("svg", o9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "M8 12h8" })
    ], -1)
  ]));
}
const K2 = { name: "lucide-circle-minus", render: s9 }, i9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function a9(e, t) {
  return b(), x("svg", i9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "M10 15V9m4 6V9" })
    ], -1)
  ]));
}
const X2 = { name: "lucide-circle-pause", render: a9 }, c9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function l9(e, t) {
  return b(), x("svg", c9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "m10 8l6 4l-6 4z" })
    ], -1)
  ]));
}
const Y2 = { name: "lucide-circle-play", render: l9 }, u9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function d9(e, t) {
  return b(), x("svg", u9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "M8 12h8m-4-4v8" })
    ], -1)
  ]));
}
const J2 = { name: "lucide-circle-plus", render: d9 }, f9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function p9(e, t) {
  return b(), x("svg", f9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M18 20a6 6 0 0 0-12 0" }),
      p("circle", {
        cx: "12",
        cy: "10",
        r: "4"
      }),
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      })
    ], -1)
  ]));
}
const Q2 = { name: "lucide-circle-user-round", render: p9 }, h9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function g9(e, t) {
  return b(), x("svg", h9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "m15 9l-6 6m0-6l6 6" })
    ], -1)
  ]));
}
const e1 = { name: "lucide-circle-x", render: g9 }, m9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function v9(e, t) {
  return b(), x("svg", m9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "8",
        height: "4",
        x: "8",
        y: "2",
        rx: "1",
        ry: "1"
      }),
      p("path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m4 7h4m-4 5h4m-8-5h.01M8 16h.01" })
    ], -1)
  ]));
}
const t1 = { name: "lucide-clipboard-list", render: v9 }, _9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function b9(e, t) {
  return b(), x("svg", _9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 6v6l4 2" }),
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      })
    ], -1)
  ]));
}
const n1 = { name: "lucide-clock", render: b9 }, y9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function w9(e, t) {
  return b(), x("svg", y9, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9"
    }, null, -1)
  ]));
}
const r1 = { name: "lucide-cloud", render: w9 }, k9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function C9(e, t) {
  return b(), x("svg", k9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 13v8l-4-4m4 4l4-4" }),
      p("path", { d: "M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284" })
    ], -1)
  ]));
}
const o1 = { name: "lucide-cloud-download", render: C9 }, x9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function S9(e, t) {
  return b(), x("svg", x9, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m16 18l6-6l-6-6M8 6l-6 6l6 6"
    }, null, -1)
  ]));
}
const s1 = { name: "lucide-code", render: S9 }, E9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function A9(e, t) {
  return b(), x("svg", E9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16" }),
      p("path", { d: "M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4m0-12v2m0 18v-2m5 .66l-1-1.73m-5-8.66L7 3.34M20.66 17l-1.73-1M3.34 7l1.73 1M14 12h8M2 12h2m16.66-5l-1.73 1M3.34 17l1.73-1M17 3.34l-1 1.73m-5 8.66l-4 6.93" })
    ], -1)
  ]));
}
const Bc = { name: "lucide-cog", render: A9 }, $9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function M9(e, t) {
  return b(), x("svg", $9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "M12 18a6 6 0 0 0 0-12z" })
    ], -1)
  ]));
}
const i1 = { name: "lucide-contrast", render: M9 }, I9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function T9(e, t) {
  return b(), x("svg", I9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "14",
        height: "14",
        x: "8",
        y: "8",
        rx: "2",
        ry: "2"
      }),
      p("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
    ], -1)
  ]));
}
const a1 = { name: "lucide-copy", render: T9 }, L9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function O9(e, t) {
  return b(), x("svg", L9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("ellipse", {
        cx: "12",
        cy: "5",
        rx: "9",
        ry: "3"
      }),
      p("path", { d: "M3 5v14a9 3 0 0 0 18 0V5" }),
      p("path", { d: "M3 12a9 3 0 0 0 18 0" })
    ], -1)
  ]));
}
const c1 = { name: "lucide-database", render: O9 }, R9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function P9(e, t) {
  return b(), x("svg", R9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M21.54 15H17a2 2 0 0 0-2 2v4.54M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" }),
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      })
    ], -1)
  ]));
}
const l1 = { name: "lucide-earth", render: P9 }, B9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function z9(e, t) {
  return b(), x("svg", B9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "1"
      }),
      p("circle", {
        cx: "19",
        cy: "12",
        r: "1"
      }),
      p("circle", {
        cx: "5",
        cy: "12",
        r: "1"
      })
    ], -1)
  ]));
}
const u1 = { name: "lucide-ellipsis", render: z9 }, D9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function N9(e, t) {
  return b(), x("svg", D9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "1"
      }),
      p("circle", {
        cx: "12",
        cy: "5",
        r: "1"
      }),
      p("circle", {
        cx: "12",
        cy: "19",
        r: "1"
      })
    ], -1)
  ]));
}
const d1 = { name: "lucide-ellipsis-vertical", render: N9 }, q9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function F9(e, t) {
  return b(), x("svg", q9, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 9h14M5 15h14"
    }, null, -1)
  ]));
}
const f1 = { name: "lucide-equal", render: F9 }, j9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function H9(e, t) {
  return b(), x("svg", j9, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 3h6v6m-11 5L21 3m-3 10v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
    }, null, -1)
  ]));
}
const p1 = { name: "lucide-external-link", render: H9 }, V9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function U9(e, t) {
  return b(), x("svg", V9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0" }),
      p("circle", {
        cx: "12",
        cy: "12",
        r: "3"
      })
    ], -1)
  ]));
}
const h1 = { name: "lucide-eye", render: U9 }, Z9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function W9(e, t) {
  return b(), x("svg", Z9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }),
      p("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })
    ], -1)
  ]));
}
const g1 = { name: "lucide-eye-off", render: W9 }, G9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function K9(e, t) {
  return b(), x("svg", G9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }),
      p("path", { d: "M14 2v4a2 2 0 0 0 2 2h4" })
    ], -1)
  ]));
}
const m1 = { name: "lucide-file", render: K9 }, X9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function Y9(e, t) {
  return b(), x("svg", X9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M10 12v-1m0 7v-2m0-9V6m4-4v4a2 2 0 0 0 2 2h4" }),
      p("path", { d: "M15.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 .274 1.01" }),
      p("circle", {
        cx: "10",
        cy: "20",
        r: "2"
      })
    ], -1)
  ]));
}
const v1 = { name: "lucide-file-archive", render: Y9 }, J9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function Q9(e, t) {
  return b(), x("svg", J9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M10 12.5L8 15l2 2.5m4-5l2 2.5l-2 2.5M14 2v4a2 2 0 0 0 2 2h4" }),
      p("path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" })
    ], -1)
  ]));
}
const _1 = { name: "lucide-file-code", render: Q9 }, eS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function tS(e, t) {
  return b(), x("svg", eS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }),
      p("path", { d: "M14 2v4a2 2 0 0 0 2 2h4m-8 10v-6m-3 3l3 3l3-3" })
    ], -1)
  ]));
}
const b1 = { name: "lucide-file-down", render: tS }, nS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function rS(e, t) {
  return b(), x("svg", nS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" }),
      p("path", { d: "M14 2v4a2 2 0 0 0 2 2h4M2 15h10m-3 3l3-3l-3-3" })
    ], -1)
  ]));
}
const y1 = { name: "lucide-file-input", render: rS }, oS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function sS(e, t) {
  return b(), x("svg", oS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M14 2v4a2 2 0 0 0 2 2h4M4 7V4a2 2 0 0 1 2-2a2 2 0 0 0-2 2" }),
      p("path", { d: "M4.063 20.999a2 2 0 0 0 2 1L18 22a2 2 0 0 0 2-2V7l-5-5H6m-1 9l-3 3" }),
      p("path", { d: "m5 17l-3-3h10" })
    ], -1)
  ]));
}
const w1 = { name: "lucide-file-output", render: sS }, iS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function aS(e, t) {
  return b(), x("svg", iS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }),
      p("path", { d: "M14 2v4a2 2 0 0 0 2 2h4M10 9H8m8 4H8m8 4H8" })
    ], -1)
  ]));
}
const zc = { name: "lucide-file-text", render: aS }, cS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function lS(e, t) {
  return b(), x("svg", cS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M20 7h-3a2 2 0 0 1-2-2V2" }),
      p("path", { d: "M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z" }),
      p("path", { d: "M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8" })
    ], -1)
  ]));
}
const k1 = { name: "lucide-files", render: lS }, uS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function dS(e, t) {
  return b(), x("svg", uS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4M14 13.12c0 2.38 0 6.38-1 8.88m4.29-.98c.12-.6.43-2.3.5-3.02M2 12a10 10 0 0 1 18-6M2 16h.01m19.79 0c.2-2 .131-5.354 0-6" }),
      p("path", { d: "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2m2.31 12c.21-.66.45-1.32.57-2M9 6.8a6 6 0 0 1 9 5.2v2" })
    ], -1)
  ]));
}
const C1 = { name: "lucide-fingerprint", render: dS }, fS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function pS(e, t) {
  return b(), x("svg", fS, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2M6.453 15h11.094M8.5 2h7"
    }, null, -1)
  ]));
}
const x1 = { name: "lucide-flask-conical", render: pS }, hS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function gS(e, t) {
  return b(), x("svg", hS, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
    }, null, -1)
  ]));
}
const S1 = { name: "lucide-folder", render: gS }, mS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function vS(e, t) {
  return b(), x("svg", mS, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m6 14l1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
    }, null, -1)
  ]));
}
const E1 = { name: "lucide-folder-open", render: vS }, _S = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function bS(e, t) {
  return b(), x("svg", _S, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 10v6m-3-3h6m5 7a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
    }, null, -1)
  ]));
}
const A1 = { name: "lucide-folder-plus", render: bS }, yS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function wS(e, t) {
  return b(), x("svg", yS, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"
    }, null, -1)
  ]));
}
const $1 = { name: "lucide-funnel", render: wS }, kS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function CS(e, t) {
  return b(), x("svg", kS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M6 3h12l4 6l-10 13L2 9Z" }),
      p("path", { d: "M11 3L8 9l4 13l4-13l-3-6M2 9h20" })
    ], -1)
  ]));
}
const M1 = { name: "lucide-gem", render: CS }, xS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function SS(e, t) {
  return b(), x("svg", xS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "18",
        height: "4",
        x: "3",
        y: "8",
        rx: "1"
      }),
      p("path", { d: "M12 8v13m7-9v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7m2.5-4a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5a2.5 2.5 0 0 1 0 5" })
    ], -1)
  ]));
}
const I1 = { name: "lucide-gift", render: SS }, ES = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function AS(e, t) {
  return b(), x("svg", ES, t[0] || (t[0] = [
    Fn('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M6 3v12"></path><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></g>', 1)
  ]));
}
const T1 = { name: "lucide-git-branch", render: AS }, $S = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function MS(e, t) {
  return b(), x("svg", $S, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20M2 12h20" })
    ], -1)
  ]));
}
const L1 = { name: "lucide-globe", render: MS }, IS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function TS(e, t) {
  return b(), x("svg", IS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0zM22 10v6" }),
      p("path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5" })
    ], -1)
  ]));
}
const O1 = { name: "lucide-graduation-cap", render: TS }, LS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function OS(e, t) {
  return b(), x("svg", LS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 3v18m-9-9h18" }),
      p("rect", {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2"
      })
    ], -1)
  ]));
}
const R1 = { name: "lucide-grid-2x2", render: OS }, RS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function PS(e, t) {
  return b(), x("svg", RS, t[0] || (t[0] = [
    Fn('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="19" r="1"></circle></g>', 1)
  ]));
}
const P1 = { name: "lucide-grip-vertical", render: PS }, BS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function zS(e, t) {
  return b(), x("svg", BS, t[0] || (t[0] = [
    Fn('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"></path><path d="m7 21l1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9M2 16l6 6"></path><circle cx="16" cy="9" r="2.9"></circle><circle cx="6" cy="5" r="3"></circle></g>', 1)
  ]));
}
const B1 = { name: "lucide-hand-coins", render: zS }, DS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function NS(e, t) {
  return b(), x("svg", DS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "m11 17l2 2a1 1 0 1 0 3-3" }),
      p("path", { d: "m14 14l2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" }),
      p("path", { d: "m21 3l1 11h-2M3 3L2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8" })
    ], -1)
  ]));
}
const z1 = { name: "lucide-handshake", render: NS }, qS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function FS(e, t) {
  return b(), x("svg", qS, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M22 12H2m3.45-6.89L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11M6 16h.01M10 16h.01"
    }, null, -1)
  ]));
}
const D1 = { name: "lucide-hard-drive", render: FS }, jS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function HS(e, t) {
  return b(), x("svg", jS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 2v8m4-4l-4 4l-4-4" }),
      p("rect", {
        width: "20",
        height: "8",
        x: "2",
        y: "14",
        rx: "2"
      }),
      p("path", { d: "M6 18h.01M10 18h.01" })
    ], -1)
  ]));
}
const N1 = { name: "lucide-hard-drive-download", render: HS }, VS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function US(e, t) {
  return b(), x("svg", VS, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M4 9h16M4 15h16M10 3L8 21m8-18l-2 18"
    }, null, -1)
  ]));
}
const q1 = { name: "lucide-hash", render: US }, ZS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function WS(e, t) {
  return b(), x("svg", ZS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }),
      p("path", { d: "M3 3v5h5m4-1v5l4 2" })
    ], -1)
  ]));
}
const F1 = { name: "lucide-history", render: WS }, GS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function KS(e, t) {
  return b(), x("svg", GS, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 22h14M5 2h14m-2 20v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"
    }, null, -1)
  ]));
}
const j1 = { name: "lucide-hourglass", render: KS }, XS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function YS(e, t) {
  return b(), x("svg", XS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }),
      p("path", { d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" })
    ], -1)
  ]));
}
const H1 = { name: "lucide-house", render: YS }, JS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function QS(e, t) {
  return b(), x("svg", JS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2",
        ry: "2"
      }),
      p("circle", {
        cx: "9",
        cy: "9",
        r: "2"
      }),
      p("path", { d: "m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" })
    ], -1)
  ]));
}
const V1 = { name: "lucide-image", render: QS }, eE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function tE(e, t) {
  return b(), x("svg", eE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M22 12h-6l-2 3h-4l-2-3H2" }),
      p("path", { d: "M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11" })
    ], -1)
  ]));
}
const U1 = { name: "lucide-inbox", render: tE }, nE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function rE(e, t) {
  return b(), x("svg", nE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "M12 16v-4m0-4h.01" })
    ], -1)
  ]));
}
const Dc = { name: "lucide-info", render: rE }, oE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function sE(e, t) {
  return b(), x("svg", oE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" }),
      p("circle", {
        cx: "16.5",
        cy: "7.5",
        r: ".5",
        fill: "currentColor"
      })
    ], -1)
  ]));
}
const Z1 = { name: "lucide-key-round", render: sE }, iE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function aE(e, t) {
  return b(), x("svg", iE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m5 8l6 6m-7 0l6-6l2-3M2 5h12M7 2h1m14 20l-5-10l-5 10m2-4h6"
    }, null, -1)
  ]));
}
const W1 = { name: "lucide-languages", render: aE }, cE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function lE(e, t) {
  return b(), x("svg", cE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" }),
      p("path", { d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" }),
      p("path", { d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" })
    ], -1)
  ]));
}
const G1 = { name: "lucide-layers", render: lE }, uE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function dE(e, t) {
  return b(), x("svg", uE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 14c.2-1 .7-1.7 1.5-2.5c1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5c.7.7 1.3 1.5 1.5 2.5m0 4h6m-5 4h4"
    }, null, -1)
  ]));
}
const K1 = { name: "lucide-lightbulb", render: dE }, fE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function pE(e, t) {
  return b(), x("svg", fE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
      p("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
    ], -1)
  ]));
}
const X1 = { name: "lucide-link", render: pE }, hE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function gE(e, t) {
  return b(), x("svg", hE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M3 12h.01M3 18h.01M3 6h.01M8 12h13M8 18h13M8 6h13"
    }, null, -1)
  ]));
}
const Y1 = { name: "lucide-list", render: gE }, mE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function vE(e, t) {
  return b(), x("svg", mE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m3 17l2 2l4-4M3 7l2 2l4-4m4 1h8m-8 6h8m-8 6h8"
    }, null, -1)
  ]));
}
const J1 = { name: "lucide-list-checks", render: vE }, _E = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function bE(e, t) {
  return b(), x("svg", _E, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "18",
        height: "11",
        x: "3",
        y: "11",
        rx: "2",
        ry: "2"
      }),
      p("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
    ], -1)
  ]));
}
const Q1 = { name: "lucide-lock", render: bE }, yE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function wE(e, t) {
  return b(), x("svg", yE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m10 17l5-5l-5-5m5 5H3m12-9h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
    }, null, -1)
  ]));
}
const eg = { name: "lucide-log-in", render: wE }, kE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function CE(e, t) {
  return b(), x("svg", kE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
    }, null, -1)
  ]));
}
const tg = { name: "lucide-log-out", render: CE }, xE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function SE(e, t) {
  return b(), x("svg", xE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7" }),
      p("rect", {
        width: "20",
        height: "16",
        x: "2",
        y: "4",
        rx: "2"
      })
    ], -1)
  ]));
}
const ng = { name: "lucide-mail", render: SE }, EE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function AE(e, t) {
  return b(), x("svg", EE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
    }, null, -1)
  ]));
}
const rg = { name: "lucide-maximize", render: AE }, $E = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function ME(e, t) {
  return b(), x("svg", $E, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
    }, null, -1)
  ]));
}
const og = { name: "lucide-maximize-2", render: ME }, IE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function TE(e, t) {
  return b(), x("svg", IE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M4 12h16M4 18h16M4 6h16"
    }, null, -1)
  ]));
}
const sg = { name: "lucide-menu", render: TE }, LE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function OE(e, t) {
  return b(), x("svg", LE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z"
    }, null, -1)
  ]));
}
const ig = { name: "lucide-message-circle", render: OE }, RE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function PE(e, t) {
  return b(), x("svg", RE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2zm4 0h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"
    }, null, -1)
  ]));
}
const ag = { name: "lucide-messages-square", render: PE }, BE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function zE(e, t) {
  return b(), x("svg", BE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 13v8m0-18v3M4 6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h13a2 2 0 0 0 1.152-.365l3.424-2.317a1 1 0 0 0 0-1.635l-3.424-2.318A2 2 0 0 0 17 6z"
    }, null, -1)
  ]));
}
const cg = { name: "lucide-milestone", render: zE }, DE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function NE(e, t) {
  return b(), x("svg", DE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m14 10l7-7m-1 7h-6V4M3 21l7-7m-6 0h6v6"
    }, null, -1)
  ]));
}
const qE = { name: "lucide-minimize-2", render: NE }, FE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function jE(e, t) {
  return b(), x("svg", FE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12.586 12.586L19 19M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z"
    }, null, -1)
  ]));
}
const lg = { name: "lucide-mouse-pointer", render: jE }, HE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function VE(e, t) {
  return b(), x("svg", HE, t[0] || (t[0] = [
    Fn('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="6" height="6" x="16" y="16" rx="1"></rect><rect width="6" height="6" x="2" y="16" rx="1"></rect><rect width="6" height="6" x="9" y="2" rx="1"></rect><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3m-7-4V8"></path></g>', 1)
  ]));
}
const ug = { name: "lucide-network", render: VE }, UE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function ZE(e, t) {
  return b(), x("svg", UE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 22v-9m3.17-10.79a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.66 1.66 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z" }),
      p("path", { d: "M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13" }),
      p("path", { d: "M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.64 1.64 0 0 0 1.63 0z" })
    ], -1)
  ]));
}
const dg = { name: "lucide-package-open", render: ZE }, WE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function GE(e, t) {
  return b(), x("svg", WE, t[0] || (t[0] = [
    Fn('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 22a1 1 0 0 1 0-20a10 9 0 0 1 10 9a5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"></path><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle></g>', 1)
  ]));
}
const fg = { name: "lucide-palette", render: GE }, KE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function XE(e, t) {
  return b(), x("svg", KE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "4",
        height: "16",
        x: "14",
        y: "4",
        rx: "1"
      }),
      p("rect", {
        width: "4",
        height: "16",
        x: "6",
        y: "4",
        rx: "1"
      })
    ], -1)
  ]));
}
const pg = { name: "lucide-pause", render: XE }, YE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function JE(e, t) {
  return b(), x("svg", YE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
    }, null, -1)
  ]));
}
const hg = { name: "lucide-pen", render: JE }, QE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function eA(e, t) {
  return b(), x("svg", QE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4"
    }, null, -1)
  ]));
}
const gg = { name: "lucide-pencil", render: eA }, tA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function nA(e, t) {
  return b(), x("svg", tA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 17v5M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4a1 1 0 0 1 1 1z"
    }, null, -1)
  ]));
}
const mg = { name: "lucide-pin", render: nA }, rA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function oA(e, t) {
  return b(), x("svg", rA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m6 3l14 9l-14 9z"
    }, null, -1)
  ]));
}
const vg = { name: "lucide-play", render: oA }, sA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function iA(e, t) {
  return b(), x("svg", sA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 22v-5M9 8V2m6 6V2m3 6v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"
    }, null, -1)
  ]));
}
const _g = { name: "lucide-plug", render: iA }, aA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function cA(e, t) {
  return b(), x("svg", aA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 12h14m-7-7v14"
    }, null, -1)
  ]));
}
const bg = { name: "lucide-plus", render: cA }, lA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function uA(e, t) {
  return b(), x("svg", lA, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2s-2 1-2 2s2 1 2 2m13-7h.01M6 18h.01m14.82-9.17a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z" }),
      p("path", { d: "M18 11.66V22a4 4 0 0 0 4-4V6" })
    ], -1)
  ]));
}
const yg = { name: "lucide-pocket-knife", render: uA }, dA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function fA(e, t) {
  return b(), x("svg", dA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 2v10m6.4-5.4a9 9 0 1 1-12.77.04"
    }, null, -1)
  ]));
}
const wg = { name: "lucide-power", render: fA }, pA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function hA(e, t) {
  return b(), x("svg", pA, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "m15 14l5-5l-5-5" }),
      p("path", { d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13" })
    ], -1)
  ]));
}
const kg = { name: "lucide-redo-2", render: hA }, gA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function mA(e, t) {
  return b(), x("svg", gA, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M3 12a9 9 0 0 1 9-9a9.75 9.75 0 0 1 6.74 2.74L21 8" }),
      p("path", { d: "M21 3v5h-5m5 4a9 9 0 0 1-9 9a9.75 9.75 0 0 1-6.74-2.74L3 16" }),
      p("path", { d: "M8 16H3v5" })
    ], -1)
  ]));
}
const Ho = { name: "lucide-refresh-cw", render: mA }, vA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function _A(e, t) {
  return b(), x("svg", vA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M4 7V4h16v3M5 20h6m2-16L8 20m7-5l5 5m0-5l-5 5"
    }, null, -1)
  ]));
}
const Cg = { name: "lucide-remove-formatting", render: _A }, bA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function yA(e, t) {
  return b(), x("svg", bA, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" }),
      p("circle", {
        cx: "5",
        cy: "19",
        r: "1"
      })
    ], -1)
  ]));
}
const xg = { name: "lucide-rss", render: yA }, wA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function kA(e, t) {
  return b(), x("svg", wA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M4 10a7.31 7.31 0 0 0 10 10Zm5 5l3-3m5 1a6 6 0 0 0-6-6m10 6A10 10 0 0 0 11 3"
    }, null, -1)
  ]));
}
const Sg = { name: "lucide-satellite-dish", render: kA }, CA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function xA(e, t) {
  return b(), x("svg", CA, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" }),
      p("path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7M7 3v4a1 1 0 0 0 1 1h7" })
    ], -1)
  ]));
}
const Eg = { name: "lucide-save", render: xA }, SA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function EA(e, t) {
  return b(), x("svg", SA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m16 16l3-8l3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1M2 16l3-8l3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1m5 5h10M12 3v18M3 7h2c2 0 5-1 7-2c2 1 5 2 7 2h2"
    }, null, -1)
  ]));
}
const Ag = { name: "lucide-scale", render: EA }, AA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function $A(e, t) {
  return b(), x("svg", AA, t[0] || (t[0] = [
    Fn('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="6" cy="6" r="3"></circle><path d="M8.12 8.12L12 12m8-8L8.12 15.88"></path><circle cx="6" cy="18" r="3"></circle><path d="M14.8 14.8L20 20"></path></g>', 1)
  ]));
}
const Nc = { name: "lucide-scissors", render: $A }, MA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function IA(e, t) {
  return b(), x("svg", MA, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "m21 21l-4.34-4.34" }),
      p("circle", {
        cx: "11",
        cy: "11",
        r: "8"
      })
    ], -1)
  ]));
}
const $g = { name: "lucide-search", render: IA }, TA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function LA(e, t) {
  return b(), x("svg", TA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11zm7.318-19.539l-10.94 10.939"
    }, null, -1)
  ]));
}
const Mg = { name: "lucide-send", render: LA }, OA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function RA(e, t) {
  return b(), x("svg", OA, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "20",
        height: "8",
        x: "2",
        y: "2",
        rx: "2",
        ry: "2"
      }),
      p("rect", {
        width: "20",
        height: "8",
        x: "2",
        y: "14",
        rx: "2",
        ry: "2"
      }),
      p("path", { d: "M6 6h.01M6 18h.01" })
    ], -1)
  ]));
}
const Ig = { name: "lucide-server", render: RA }, PA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function BA(e, t) {
  return b(), x("svg", PA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 2v13m4-9l-4-4l-4 4m-4 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"
    }, null, -1)
  ]));
}
const Tg = { name: "lucide-share", render: BA }, zA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function DA(e, t) {
  return b(), x("svg", zA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M21 4h-7m-4 0H3m18 8h-9m-4 0H3m18 8h-5m-4 0H3M14 2v4m-6 4v4m8 4v4"
    }, null, -1)
  ]));
}
const Lg = { name: "lucide-sliders-horizontal", render: DA }, NA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function qA(e, t) {
  return b(), x("svg", NA, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "M8 14s1.5 2 4 2s4-2 4-2M9 9h.01M15 9h.01" })
    ], -1)
  ]));
}
const Og = { name: "lucide-smile", render: qA }, FA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function jA(e, t) {
  return b(), x("svg", FA, t[0] || (t[0] = [
    p("rect", {
      width: "18",
      height: "18",
      x: "3",
      y: "3",
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      rx: "2"
    }, null, -1)
  ]));
}
const Rg = { name: "lucide-square", render: jA }, HA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function VA(e, t) {
  return b(), x("svg", HA, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2"
      }),
      p("path", { d: "m9 12l2 2l4-4" })
    ], -1)
  ]));
}
const Pg = { name: "lucide-square-check", render: VA }, UA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function ZA(e, t) {
  return b(), x("svg", UA, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
      p("path", { d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" })
    ], -1)
  ]));
}
const Bg = { name: "lucide-square-pen", render: ZA }, WA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function GA(e, t) {
  return b(), x("svg", WA, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2"
      }),
      p("path", { d: "M8 12h8m-4-4v8" })
    ], -1)
  ]));
}
const zg = { name: "lucide-square-plus", render: GA }, KA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function XA(e, t) {
  return b(), x("svg", KA, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" }),
      p("path", { d: "M15 3v4a2 2 0 0 0 2 2h4" })
    ], -1)
  ]));
}
const Dg = { name: "lucide-sticky-note", render: XA }, YA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function JA(e, t) {
  return b(), x("svg", YA, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "4"
      }),
      p("path", { d: "M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" })
    ], -1)
  ]));
}
const Ng = { name: "lucide-sun", render: JA }, QA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function e$(e, t) {
  return b(), x("svg", QA, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 3v18" }),
      p("rect", {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2"
      }),
      p("path", { d: "M3 9h18M3 15h18" })
    ], -1)
  ]));
}
const qg = { name: "lucide-table", render: e$ }, t$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function n$(e, t) {
  return b(), x("svg", t$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "m15 5l6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19" }),
      p("path", { d: "M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z" }),
      p("circle", {
        cx: "6.5",
        cy: "9.5",
        r: ".5",
        fill: "currentColor"
      })
    ], -1)
  ]));
}
const Fg = { name: "lucide-tags", render: n$ }, r$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function o$(e, t) {
  return b(), x("svg", r$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 19h8M4 17l6-6l-6-6"
    }, null, -1)
  ]));
}
const jg = { name: "lucide-terminal", render: o$ }, s$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function i$(e, t) {
  return b(), x("svg", s$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M17 14V2M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88"
    }, null, -1)
  ]));
}
const Hg = { name: "lucide-thumbs-down", render: i$ }, a$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function c$(e, t) {
  return b(), x("svg", a$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M7 10v12m8-16.12L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88"
    }, null, -1)
  ]));
}
const Vg = { name: "lucide-thumbs-up", render: c$ }, l$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function u$(e, t) {
  return b(), x("svg", l$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 5v6m4-6v6"
    }, null, -1)
  ]));
}
const Ug = { name: "lucide-trash-2", render: u$ }, d$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function f$(e, t) {
  return b(), x("svg", d$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m17 14l3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7zm-5 8v-3"
    }, null, -1)
  ]));
}
const Zg = { name: "lucide-tree-pine", render: f$ }, p$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function h$(e, t) {
  return b(), x("svg", p$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4m0 4h.01"
    }, null, -1)
  ]));
}
const Wg = { name: "lucide-triangle-alert", render: h$ }, g$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function m$(e, t) {
  return b(), x("svg", g$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M9 14L4 9l5-5" }),
      p("path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" })
    ], -1)
  ]));
}
const Gg = { name: "lucide-undo-2", render: m$ }, v$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function _$(e, t) {
  return b(), x("svg", v$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m18.84 12.25l1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07a5.006 5.006 0 0 0-6.95 0l-1.72 1.71m-6.58 6.57l-1.71 1.71a5.004 5.004 0 0 0 .12 7.07a5.006 5.006 0 0 0 6.95 0l1.71-1.71M8 2v3M2 8h3m11 11v3m3-6h3"
    }, null, -1)
  ]));
}
const Kg = { name: "lucide-unlink", render: _$ }, b$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function y$(e, t) {
  return b(), x("svg", b$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }),
      p("circle", {
        cx: "12",
        cy: "7",
        r: "4"
      })
    ], -1)
  ]));
}
const Xg = { name: "lucide-user", render: y$ }, w$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function k$(e, t) {
  return b(), x("svg", w$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "m16 11l2 2l4-4m-6 12v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
      p("circle", {
        cx: "9",
        cy: "7",
        r: "4"
      })
    ], -1)
  ]));
}
const Yg = { name: "lucide-user-check", render: k$ }, C$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function x$(e, t) {
  return b(), x("svg", C$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "10",
        cy: "7",
        r: "4"
      }),
      p("path", { d: "M10.3 15H7a4 4 0 0 0-4 4v2m12-5.5V14a2 2 0 0 1 4 0v1.5" }),
      p("rect", {
        width: "8",
        height: "5",
        x: "13",
        y: "16",
        rx: ".899"
      })
    ], -1)
  ]));
}
const Jg = { name: "lucide-user-lock", render: x$ }, S$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function E$(e, t) {
  return b(), x("svg", S$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "8",
        r: "5"
      }),
      p("path", { d: "M20 21a8 8 0 0 0-16 0" })
    ], -1)
  ]));
}
const Qg = { name: "lucide-user-round", render: E$ }, A$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function $$(e, t) {
  return b(), x("svg", A$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87" }),
      p("circle", {
        cx: "9",
        cy: "7",
        r: "4"
      })
    ], -1)
  ]));
}
const em = { name: "lucide-users", render: $$ }, M$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function I$(e, t) {
  return b(), x("svg", M$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 21s-4-3-4-9s4-9 4-9m8 0s4 3 4 9s-4 9-4 9M15 9l-6 6m0-6l6 6"
    }, null, -1)
  ]));
}
const tm = { name: "lucide-variable", render: I$ }, T$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function L$(e, t) {
  return b(), x("svg", T$, t[0] || (t[0] = [
    Fn('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"></rect><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle><path d="m7.9 7.9l2.7 2.7"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle><path d="m13.4 10.6l2.7-2.7"></path><circle cx="7.5" cy="16.5" r=".5" fill="currentColor"></circle><path d="m7.9 16.1l2.7-2.7"></path><circle cx="16.5" cy="16.5" r=".5" fill="currentColor"></circle><path d="m13.4 13.4l2.7 2.7"></path><circle cx="12" cy="12" r="2"></circle></g>', 1)
  ]));
}
const nm = { name: "lucide-vault", render: L$ }, O$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function R$(e, t) {
  return b(), x("svg", O$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "m16 13l5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" }),
      p("rect", {
        width: "14",
        height: "12",
        x: "2",
        y: "6",
        rx: "2"
      })
    ], -1)
  ]));
}
const rm = { name: "lucide-video", render: R$ }, P$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function B$(e, t) {
  return b(), x("svg", P$, t[0] || (t[0] = [
    Fn('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="4.5" r="2.5"></circle><path d="m10.2 6.3l-3.9 3.9"></path><circle cx="4.5" cy="12" r="2.5"></circle><path d="M7 12h10"></path><circle cx="19.5" cy="12" r="2.5"></circle><path d="m13.8 17.7l3.9-3.9"></path><circle cx="12" cy="19.5" r="2.5"></circle></g>', 1)
  ]));
}
const om = { name: "lucide-waypoints", render: B$ }, z$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function D$(e, t) {
  return b(), x("svg", z$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
    }, null, -1)
  ]));
}
const sm = { name: "lucide-wrench", render: D$ }, N$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function q$(e, t) {
  return b(), x("svg", N$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M18 6L6 18M6 6l12 12"
    }, null, -1)
  ]));
}
const qc = { name: "lucide-x", render: q$ }, F$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function j$(e, t) {
  return b(), x("svg", F$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
    }, null, -1)
  ]));
}
const im = { name: "lucide-zap", render: j$ }, H$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function V$(e, t) {
  return b(), x("svg", H$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "11",
        cy: "11",
        r: "8"
      }),
      p("path", { d: "m21 21l-4.35-4.35M11 8v6m-3-3h6" })
    ], -1)
  ]));
}
const am = { name: "lucide-zoom-in", render: V$ }, U$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function Z$(e, t) {
  return b(), x("svg", U$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "11",
        cy: "11",
        r: "8"
      }),
      p("path", { d: "m21 21l-4.35-4.35M8 11h6" })
    ], -1)
  ]));
}
const cm = { name: "lucide-zoom-out", render: Z$ }, Ad = {
  // customIcons
  variable: tm,
  "pop-out": l2,
  triangle: w2,
  "status-completed": p2,
  "status-waiting": v2,
  "status-error": h2,
  "status-canceled": f2,
  "status-new": g2,
  "status-unknown": m2,
  "status-warning": _2,
  "vector-square": k2,
  schema: u2,
  json: c2,
  binary: i2,
  text: b2,
  toolbox: y2,
  spinner: d2,
  xmark: qc,
  // fontAwesomeIcons
  "caret-up": jo,
  "caret-down": No,
  "caret-right": Fo,
  "caret-left": qo,
  "folder-plus": A1,
  share: Tg,
  "user-check": Yg,
  "check-double": j2,
  "exclamation-circle": Z2,
  circle: U2,
  "eye-slash": g1,
  folder: S1,
  "minus-circle": K2,
  adjust: i1,
  refresh: Ho,
  vault: nm,
  "angle-double-left": H2,
  "angle-down": No,
  "angle-left": qo,
  "angle-right": Fo,
  "angle-up": jo,
  archive: x2,
  "arrow-left": Rc,
  "arrow-right": A2,
  "arrow-up": $2,
  "arrow-down": S2,
  at: M2,
  ban: I2,
  "balance-scale-left": Ag,
  bars: sg,
  bolt: im,
  book: L2,
  "box-open": dg,
  bug: B2,
  brain: P2,
  calculator: z2,
  calendar: D2,
  "chart-bar": q2,
  check: F2,
  "check-circle": W2,
  "check-square": Pg,
  "chevron-left": qo,
  "chevron-right": Fo,
  "chevron-down": No,
  "chevron-up": jo,
  code: s1,
  "code-branch": T1,
  cog: Bc,
  cogs: Bc,
  comment: ig,
  comments: ag,
  "clipboard-list": t1,
  clock: n1,
  clone: a1,
  cloud: r1,
  "cloud-download-alt": o1,
  compress: V2,
  copy: k1,
  cube: R2,
  cut: Nc,
  database: c1,
  "dot-circle": G2,
  "grip-lines-vertical": a2,
  "grip-vertical": P1,
  edit: Bg,
  "ellipsis-h": u1,
  "ellipsis-v": d1,
  envelope: ng,
  equals: f1,
  eye: h1,
  "exclamation-triangle": Wg,
  expand: rg,
  "expand-alt": og,
  "external-link-alt": p1,
  "exchange-alt": E2,
  file: m1,
  "file-alt": zc,
  "file-archive": v1,
  "file-code": _1,
  "file-download": b1,
  "file-export": w1,
  "file-import": y1,
  "file-pdf": zc,
  filter: $1,
  fingerprint: C1,
  flask: x1,
  "folder-open": E1,
  font: N2,
  gift: I1,
  globe: L1,
  "globe-americas": l1,
  "graduation-cap": O1,
  "hand-holding-usd": B1,
  "hand-scissors": Nc,
  handshake: z1,
  "hand-point-left": Rc,
  hashtag: q1,
  hdd: D1,
  history: F1,
  home: H1,
  hourglass: j1,
  image: V1,
  inbox: U1,
  info: Dc,
  "info-circle": Dc,
  key: Z1,
  language: W1,
  "layer-group": G1,
  link: X1,
  list: Y1,
  lightbulb: K1,
  lock: Q1,
  "map-signs": cg,
  "mouse-pointer": lg,
  "network-wired": ug,
  palette: fg,
  pause: pg,
  "pause-circle": X2,
  pen: hg,
  "pencil-alt": gg,
  play: vg,
  "play-circle": Y2,
  plug: _g,
  plus: bg,
  "plus-circle": J2,
  "plus-square": zg,
  "project-diagram": om,
  question: Pc,
  "question-circle": Pc,
  redo: kg,
  "remove-format": Cg,
  robot: O2,
  rss: xg,
  save: Eg,
  "satellite-dish": Sg,
  search: $g,
  "search-minus": cm,
  "search-plus": am,
  server: Ig,
  screwdriver: yg,
  smile: Og,
  "sign-in-alt": eg,
  "sign-out-alt": tg,
  "sliders-h": Lg,
  "sticky-note": Dg,
  stop: Rg,
  stream: C2,
  sun: Ng,
  sync: Ho,
  "sync-alt": Ho,
  table: qg,
  tags: Fg,
  tasks: J1,
  terminal: jg,
  "th-large": R1,
  thumbtack: mg,
  "thumbs-down": Hg,
  "thumbs-up": Vg,
  times: qc,
  "times-circle": e1,
  tools: sm,
  trash: Ug,
  undo: Gg,
  unlink: Kg,
  user: Xg,
  "user-circle": Q2,
  "user-friends": Qg,
  users: em,
  video: rm,
  tree: Zg,
  "user-lock": Jg,
  gem: M1,
  download: N1,
  "power-off": wg,
  "paper-plane": Mg,
  bell: T2
}, $d = {
  // custom icons
  // NOTE: ensure to replace any colors with "currentColor" in SVG
  "bolt-filled": Dx,
  "grip-lines-vertical": a2,
  variable: tm,
  "pop-out": l2,
  triangle: w2,
  "status-completed": p2,
  "status-waiting": v2,
  "status-error": h2,
  "status-canceled": f2,
  "status-new": g2,
  "status-unknown": m2,
  "status-warning": _2,
  "vector-square": k2,
  schema: u2,
  json: c2,
  binary: i2,
  text: b2,
  toolbox: y2,
  spinner: d2,
  // lucide
  "align-right": C2,
  archive: x2,
  "arrow-down": S2,
  "arrow-left": Rc,
  "arrow-left-right": E2,
  "arrow-right": A2,
  "arrow-right-from-line": Qx,
  "arrow-right-to-line": n7,
  "arrow-up": $2,
  "at-sign": M2,
  ban: I2,
  bell: T2,
  book: L2,
  bot: O2,
  box: R2,
  brain: P2,
  bug: B2,
  calculator: z2,
  calendar: D2,
  "case-upper": N2,
  "chart-column-decreasing": q2,
  check: F2,
  "check-check": j2,
  "chevron-down": No,
  "chevron-left": qo,
  "chevron-right": Fo,
  "chevron-up": jo,
  "chevrons-left": H2,
  "chevrons-down-up": H7,
  "chevrons-up-down": V2,
  circle: U2,
  "circle-alert": Z2,
  "circle-check": W2,
  "circle-dot": G2,
  "circle-help": Pc,
  "circle-minus": K2,
  "circle-pause": X2,
  "circle-play": Y2,
  "circle-plus": J2,
  "circle-user-round": Q2,
  "circle-x": e1,
  "clipboard-list": t1,
  clock: n1,
  cloud: r1,
  "cloud-download": o1,
  code: s1,
  cog: Bc,
  contrast: i1,
  copy: a1,
  database: c1,
  earth: l1,
  ellipsis: u1,
  "ellipsis-vertical": d1,
  equal: f1,
  "external-link": p1,
  eye: h1,
  "eye-off": g1,
  file: m1,
  "file-archive": v1,
  "file-code": _1,
  "file-down": b1,
  "file-input": y1,
  "file-output": w1,
  "file-text": zc,
  files: k1,
  fingerprint: C1,
  "flask-conical": x1,
  folder: S1,
  "folder-open": E1,
  "folder-plus": A1,
  funnel: $1,
  gem: M1,
  gift: I1,
  "git-branch": T1,
  globe: L1,
  "graduation-cap": O1,
  "grid-2x2": R1,
  "grip-vertical": P1,
  "hand-coins": B1,
  handshake: z1,
  "hard-drive": D1,
  "hard-drive-download": N1,
  hash: q1,
  history: F1,
  hourglass: j1,
  house: H1,
  image: V1,
  inbox: U1,
  info: Dc,
  "key-round": Z1,
  languages: W1,
  layers: G1,
  lightbulb: K1,
  link: X1,
  list: Y1,
  "list-checks": J1,
  lock: Q1,
  "log-in": eg,
  "log-out": tg,
  mail: ng,
  "minimize-2": qE,
  maximize: rg,
  "maximize-2": og,
  menu: sg,
  "message-circle": ig,
  "messages-square": ag,
  milestone: cg,
  "mouse-pointer": lg,
  network: ug,
  "package-open": dg,
  palette: fg,
  pause: pg,
  pen: hg,
  pencil: gg,
  pin: mg,
  play: vg,
  plug: _g,
  plus: bg,
  "pocket-knife": yg,
  power: wg,
  "redo-2": kg,
  "refresh-cw": Ho,
  "remove-formatting": Cg,
  rss: xg,
  "satellite-dish": Sg,
  save: Eg,
  scale: Ag,
  scissors: Nc,
  search: $g,
  send: Mg,
  server: Ig,
  share: Tg,
  "sliders-horizontal": Lg,
  smile: Og,
  square: Rg,
  "square-check": Pg,
  "square-pen": Bg,
  "square-plus": zg,
  "sticky-note": Dg,
  sun: Ng,
  table: qg,
  tags: Fg,
  terminal: jg,
  "thumbs-down": Hg,
  "thumbs-up": Vg,
  "trash-2": Ug,
  "tree-pine": Zg,
  "triangle-alert": Wg,
  "undo-2": Gg,
  unlink: Kg,
  user: Xg,
  "user-check": Yg,
  "user-lock": Jg,
  "user-round": Qg,
  users: em,
  vault: nm,
  video: rm,
  waypoints: om,
  wrench: sm,
  x: qc,
  zap: im,
  "zoom-in": am,
  "zoom-out": cm
}, W$ = /* @__PURE__ */ H({
  name: "N8nIcon",
  __name: "Icon",
  props: {
    icon: {},
    size: { default: void 0 },
    spin: { type: Boolean, default: !1 },
    color: { default: void 0 },
    strokeWidth: {}
  },
  setup(e) {
    const t = e, n = cs(), r = I(() => {
      const a = [];
      return t.spin && a.push("spin"), t.strokeWidth && a.push("strokeWidth"), ["n8n-icon", ...a.map((c) => n[c])];
    }), s = {
      xsmall: 10,
      small: 12,
      medium: 14,
      large: 16,
      xlarge: 20
    }, o = I(() => {
      let a = "1em";
      return t.size && (a = `${typeof t.size == "number" ? t.size : s[t.size]}px`), {
        height: a,
        width: a
      };
    }), i = I(() => {
      const a = {};
      return t.color && (a.color = `var(--color-${t.color})`), t.strokeWidth && (a["--n8n-icon-stroke-width"] = `${t.strokeWidth}px`), a;
    });
    return (a, c) => _($d)[a.icon] ?? _(Ad)[a.icon] ? (b(), X(lt(
      _($d)[a.icon] ?? _(Ad)[a.icon]
    ), {
      key: 0,
      class: j(r.value),
      "aria-hidden": "true",
      focusable: "false",
      role: "img",
      height: o.value.height,
      width: o.value.width,
      "data-icon": t.icon,
      style: qe(i.value)
    }, null, 8, ["class", "height", "width", "data-icon", "style"])) : Q("", !0);
  }
}), G$ = "_strokeWidth_fqxq5_1", K$ = "_spin_fqxq5_6", X$ = {
  strokeWidth: G$,
  spin: K$
}, Y$ = {
  $style: X$
}, Ml = /* @__PURE__ */ qt(W$, [["__cssModules", Y$]]), J$ = { class: "n8n-spinner" }, Q$ = {
  key: 0,
  class: "lds-ring"
}, eM = /* @__PURE__ */ H({
  name: "N8nSpinner",
  __name: "Spinner",
  props: {
    size: { default: "medium" },
    type: { default: "dots" }
  },
  setup(e) {
    return (t, n) => (b(), x("span", J$, [
      t.type === "ring" ? (b(), x("div", Q$, n[0] || (n[0] = [
        p("div", null, null, -1),
        p("div", null, null, -1),
        p("div", null, null, -1),
        p("div", null, null, -1)
      ]))) : (b(), X(_(Ml), {
        key: 1,
        icon: "spinner",
        size: t.size,
        spin: ""
      }, null, 8, ["size"]))
    ]));
  }
}), tM = { key: 1 }, nM = /* @__PURE__ */ H({
  name: "N8nButton",
  __name: "Button",
  props: {
    block: { type: Boolean, default: !1 },
    element: { default: "button" },
    href: {},
    label: { default: "" },
    square: { type: Boolean, default: !1 },
    active: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    float: {},
    icon: {},
    loading: { type: Boolean, default: !1 },
    outline: { type: Boolean, default: !1 },
    size: { default: "medium" },
    iconSize: {},
    text: { type: Boolean, default: !1 },
    type: { default: "primary" },
    nativeType: {}
  },
  setup(e) {
    const t = cs(), n = lo(), r = e;
    Jc(() => {
      r.element === "a" && !r.href && console.error("n8n-button:href is required for link buttons");
    });
    const s = I(() => r.loading ? "true" : void 0), o = I(() => r.disabled ? "true" : void 0), i = I(() => r.disabled || r.loading), a = I(
      () => r.iconSize ?? (r.size === "xmini" || r.size === "mini" ? "xsmall" : r.size)
    ), c = I(() => `button ${t.button} ${t[r.type]}${r.size ? ` ${t[r.size]}` : ""}${r.outline ? ` ${t.outline}` : ""}${r.loading ? ` ${t.loading}` : ""}${r.float ? ` ${t[`float-${r.float}`]}` : ""}${r.text ? ` ${t.text}` : ""}${r.disabled ? ` ${t.disabled}` : ""}${r.block ? ` ${t.block}` : ""}${r.active ? ` ${t.active}` : ""}${r.icon || r.loading ? ` ${t.withIcon}` : ""}${r.square ? ` ${t.square}` : ""}`);
    return (u, d) => (b(), X(lt(u.element), je({
      class: c.value,
      disabled: i.value,
      "aria-disabled": o.value,
      "aria-busy": s.value,
      href: u.href,
      "aria-live": "polite"
    }, {
      ..._(n),
      ...r.nativeType ? { type: r.nativeType } : {}
    }), {
      default: Y(() => [
        u.loading || u.icon ? (b(), x("span", {
          key: 0,
          class: j(_(t).icon)
        }, [
          u.loading ? (b(), X(_(eM), {
            key: 0,
            size: a.value
          }, null, 8, ["size"])) : u.icon ? (b(), X(_(Ml), {
            key: 1,
            icon: u.icon,
            size: a.value
          }, null, 8, ["icon", "size"])) : Q("", !0)
        ], 2)) : Q("", !0),
        u.label ? (b(), x("span", tM, ve(u.label), 1)) : u.$slots.default ? ne(u.$slots, "default", { key: 2 }) : Q("", !0)
      ]),
      _: 3
    }, 16, ["class", "disabled", "aria-disabled", "aria-busy", "href"]));
  }
}), rM = "_button_mdqve_229", oM = "_active_mdqve_263", sM = "_disabled_mdqve_281", iM = "_loading_mdqve_289", aM = "_secondary_mdqve_312", cM = "_tertiary_mdqve_334", lM = "_success_mdqve_356", uM = "_warning_mdqve_378", dM = "_danger_mdqve_400", fM = "_xmini_mdqve_425", pM = "_square_mdqve_430", hM = "_mini_mdqve_435", gM = "_small_mdqve_445", mM = "_medium_mdqve_455", vM = "_large_mdqve_465", _M = "_xlarge_mdqve_470", bM = "_outline_mdqve_483", yM = "_primary_mdqve_487", wM = "_text_mdqve_524", kM = "_transparent_mdqve_592", CM = "_withIcon_mdqve_597", xM = "_icon_mdqve_603", SM = "_block_mdqve_612", EM = {
  button: rM,
  active: oM,
  disabled: sM,
  loading: iM,
  secondary: aM,
  tertiary: cM,
  success: lM,
  warning: uM,
  danger: dM,
  xmini: fM,
  square: pM,
  mini: hM,
  small: gM,
  medium: mM,
  large: vM,
  xlarge: _M,
  outline: bM,
  primary: yM,
  text: wM,
  transparent: kM,
  withIcon: CM,
  icon: xM,
  block: SM,
  "float-left": "_float-left_mdqve_616",
  "float-right": "_float-right_mdqve_620"
}, AM = {
  $style: EM
}, $M = /* @__PURE__ */ qt(nM, [["__cssModules", AM]]);
({
  ...so.props
});
const MM = /* @__PURE__ */ H({
  name: "N8nText",
  __name: "Text",
  props: {
    bold: { type: Boolean, default: !1 },
    size: { default: "medium" },
    color: {},
    align: {},
    compact: { type: Boolean, default: !1 },
    tag: { default: "span" }
  },
  setup(e) {
    const t = e, n = cs(), r = I(() => {
      const s = [];
      return t.align && s.push(`align-${t.align}`), t.color && s.push(t.color), t.compact && s.push("compact"), s.push(`size-${t.size}`), s.push(t.bold ? "bold" : "regular"), s.map((o) => n[o]);
    });
    return (s, o) => (b(), X(lt(s.tag), je({
      class: ["n8n-text", ...r.value]
    }, s.$attrs), {
      default: Y(() => [
        ne(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), IM = "_bold_ushv1_1", TM = "_regular_ushv1_5", LM = "_compact_ushv1_34", OM = "_primary_ushv1_38", RM = "_secondary_ushv1_42", PM = "_danger_ushv1_62", BM = "_success_ushv1_66", zM = "_warning_ushv1_70", DM = {
  bold: IM,
  regular: TM,
  "size-xlarge": "_size-xlarge_ushv1_9",
  "size-large": "_size-large_ushv1_14",
  "size-medium": "_size-medium_ushv1_19",
  "size-small": "_size-small_ushv1_24",
  "size-xsmall": "_size-xsmall_ushv1_29",
  compact: LM,
  primary: OM,
  secondary: RM,
  "text-dark": "_text-dark_ushv1_46",
  "text-base": "_text-base_ushv1_50",
  "text-light": "_text-light_ushv1_54",
  "text-xlight": "_text-xlight_ushv1_58",
  danger: PM,
  success: BM,
  warning: zM,
  "foreground-dark": "_foreground-dark_ushv1_74",
  "foreground-xdark": "_foreground-xdark_ushv1_78",
  "align-left": "_align-left_ushv1_82",
  "align-right": "_align-right_ushv1_86",
  "align-center": "_align-center_ushv1_90"
}, NM = {
  $style: DM
}, lm = /* @__PURE__ */ qt(MM, [["__cssModules", NM]]), qM = { key: 0 }, FM = { key: 1 }, jM = /* @__PURE__ */ H({
  __name: "Loading",
  props: {
    animated: { type: Boolean, default: !0 },
    loading: { type: Boolean, default: !0 },
    rows: { default: 1 },
    cols: { default: 0 },
    shrinkLast: { type: Boolean, default: !0 },
    variant: { default: "p" }
  },
  setup(e) {
    return (t, n) => (b(), X(_(Px), {
      loading: t.loading,
      animated: t.animated,
      class: j(["n8n-loading", `n8n-loading-${t.variant}`])
    }, Xr({ _: 2 }, [
      t.cols ? {
        name: "template",
        fn: Y(() => [
          (b(!0), x(Pe, null, Je(t.cols, (r) => (b(), X(_(Fr), { key: r }))), 128))
        ]),
        key: "0"
      } : {
        name: "template",
        fn: Y(() => [
          t.variant === "h1" ? (b(), x("div", qM, [
            (b(!0), x(Pe, null, Je(t.rows, (r, s) => (b(), x("div", {
              key: s,
              class: j({
                [t.$style.h1Last]: r === t.rows && t.rows > 1 && t.shrinkLast
              })
            }, [
              ue(_(Fr), { variant: t.variant }, null, 8, ["variant"])
            ], 2))), 128))
          ])) : t.variant === "p" ? (b(), x("div", FM, [
            (b(!0), x(Pe, null, Je(t.rows, (r, s) => (b(), x("div", {
              key: s,
              class: j({
                [t.$style.pLast]: r === t.rows && t.rows > 1 && t.shrinkLast
              })
            }, [
              ue(_(Fr), { variant: t.variant }, null, 8, ["variant"])
            ], 2))), 128))
          ])) : t.variant === "custom" ? (b(), x("div", {
            key: 2,
            class: j(t.$style.custom)
          }, [
            ue(_(Fr))
          ], 2)) : (b(), X(_(Fr), {
            key: 3,
            variant: t.variant
          }, null, 8, ["variant"]))
        ]),
        key: "1"
      }
    ]), 1032, ["loading", "animated", "class"]));
  }
}), HM = "_h1Last_1sdbr_1", VM = "_pLast_1sdbr_5", UM = "_custom_1sdbr_9", ZM = {
  h1Last: HM,
  pLast: VM,
  custom: UM
}, WM = {
  $style: ZM
}, GM = /* @__PURE__ */ qt(jM, [["__cssModules", WM]]), Ir = (e) => {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    t = (t << 5) - t + r, t = t & t;
  }
  return Math.abs(t);
}, um = (e, t) => Math.floor(e / Math.pow(10, t) % 10), Fc = (e, t) => !(um(e, t) % 2), ct = (e, t, n) => {
  const r = e % t;
  return n && um(e, n) % 2 === 0 ? -r : r;
}, or = (e, t, n) => t[e % n], KM = (e) => {
  e.slice(0, 1) === "#" && (e = e.slice(1));
  const t = parseInt(e.substring(0, 2), 16), n = parseInt(e.substring(2, 4), 16), r = parseInt(e.substring(4, 6), 16);
  return (t * 299 + n * 587 + r * 114) / 1e3 >= 128 ? "#000000" : "#FFFFFF";
}, XM = 4, jc = 80;
function YM(e, t) {
  const n = Ir(e), r = t && t.length;
  return Array.from({ length: XM }, (s, o) => ({
    color: or(n + o, t, r),
    translateX: ct(n * (o + 1), jc / 2 - (o + 17), 1),
    translateY: ct(n * (o + 1), jc / 2 - (o + 17), 2),
    rotate: ct(n * (o + 1), 360),
    isSquare: Fc(n, 2)
  }));
}
const JM = H({
  props: {
    colors: {
      type: Array,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    square: {
      type: Boolean,
      required: !1,
      default: !1
    },
    size: {
      type: Number,
      required: !0
    },
    title: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  setup(e) {
    return { properties: I(() => YM(e.name, e.colors)), SIZE: jc };
  }
}), Tr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, s] of t)
    n[r] = s;
  return n;
}, QM = ["viewBox", "width", "height"], eI = { key: 0 }, tI = ["width", "height"], nI = ["width", "height", "rx"], rI = { mask: "url(#mask__bauhaus)" }, oI = ["width", "height", "fill"], sI = ["x", "y", "width", "height", "fill", "transform"], iI = ["cx", "cy", "fill", "r", "transform"], aI = ["y1", "x2", "y2", "stroke", "transform"];
function cI(e, t, n, r, s, o) {
  return b(), x("svg", {
    viewBox: `0 0 ${e.SIZE} ${e.SIZE}`,
    fill: "none",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    width: e.size,
    height: e.size
  }, [
    e.title ? (b(), x("title", eI, ve(e.name), 1)) : Q("", !0),
    p("mask", {
      id: "mask__bauhaus",
      maskUnits: "userSpaceOnUse",
      x: 0,
      y: 0,
      width: e.SIZE,
      height: e.SIZE
    }, [
      p("rect", {
        width: e.SIZE,
        height: e.SIZE,
        rx: e.square ? void 0 : e.SIZE * 2,
        fill: "#FFFFFF"
      }, null, 8, nI)
    ], 8, tI),
    p("g", rI, [
      p("rect", {
        width: e.SIZE,
        height: e.SIZE,
        fill: e.properties[0].color
      }, null, 8, oI),
      p("rect", {
        x: (e.SIZE - 60) / 2,
        y: (e.SIZE - 20) / 2,
        width: e.SIZE,
        height: e.properties[1].isSquare ? e.SIZE : e.SIZE / 8,
        fill: e.properties[1].color,
        transform: `translate(${e.properties[1].translateX} ${e.properties[1].translateY}) rotate(${e.properties[1].rotate} ${e.SIZE / 2} ${e.SIZE / 2})`
      }, null, 8, sI),
      p("circle", {
        cx: e.SIZE / 2,
        cy: e.SIZE / 2,
        fill: e.properties[2].color,
        r: e.SIZE / 5,
        transform: `translate(${e.properties[2].translateX} ${e.properties[2].translateY})`
      }, null, 8, iI),
      p("line", {
        x1: 0,
        y1: e.SIZE / 2,
        x2: e.SIZE,
        y2: e.SIZE / 2,
        "stroke-width": 2,
        stroke: e.properties[3].color,
        transform: `translate(${e.properties[3].translateX} ${e.properties[3].translateY}) rotate(${e.properties[3].rotate} ${e.SIZE / 2} ${e.SIZE / 2})`
      }, null, 8, aI)
    ])
  ], 8, QM);
}
const lI = /* @__PURE__ */ Tr(JM, [["render", cI]]), hr = 36;
function uI(e, t) {
  const n = Ir(e), r = t && t.length, s = or(n, t, r), o = ct(n, 10, 1), i = o < 5 ? o + hr / 9 : o, a = ct(n, 10, 2), c = a < 5 ? a + hr / 9 : a;
  return {
    wrapperColor: s,
    faceColor: KM(s),
    backgroundColor: or(n + 13, t, r),
    wrapperTranslateX: i,
    wrapperTranslateY: c,
    wrapperRotate: ct(n, 360),
    wrapperScale: 1 + ct(n, hr / 12) / 10,
    isMouthOpen: Fc(n, 2),
    isCircle: Fc(n, 1),
    eyeSpread: ct(n, 5),
    mouthSpread: ct(n, 3),
    faceRotate: ct(n, 10, 3),
    faceTranslateX: i > hr / 6 ? i / 2 : ct(n, 8, 1),
    faceTranslateY: c > hr / 6 ? c / 2 : ct(n, 7, 2)
  };
}
const dI = H({
  props: {
    colors: {
      type: Array,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    square: {
      type: Boolean,
      required: !1,
      default: !1
    },
    size: {
      type: Number,
      required: !0
    },
    title: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  setup(e) {
    return { data: I(() => uI(e.name, e.colors)), SIZE: hr };
  }
}), fI = ["viewBox", "width", "height"], pI = { key: 0 }, hI = ["width", "height"], gI = ["width", "height", "rx"], mI = { mask: "url(#mask__beam)" }, vI = ["width", "height", "fill"], _I = ["width", "height", "transform", "fill", "rx"], bI = ["transform"], yI = ["d", "stroke"], wI = ["d", "fill"], kI = ["x", "width", "fill"], CI = ["x", "width", "fill"];
function xI(e, t, n, r, s, o) {
  return b(), x("svg", {
    viewBox: `0 0 ${e.SIZE} ${e.SIZE}`,
    fill: "none",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    width: e.size,
    height: e.size
  }, [
    e.title ? (b(), x("title", pI, ve(e.name), 1)) : Q("", !0),
    p("mask", {
      id: "mask__beam",
      maskUnits: "userSpaceOnUse",
      x: 0,
      y: 0,
      width: e.SIZE,
      height: e.SIZE
    }, [
      p("rect", {
        width: e.SIZE,
        height: e.SIZE,
        rx: e.square ? void 0 : e.SIZE * 2,
        fill: "#FFFFFF"
      }, null, 8, gI)
    ], 8, hI),
    p("g", mI, [
      p("rect", {
        width: e.SIZE,
        height: e.SIZE,
        fill: e.data.backgroundColor
      }, null, 8, vI),
      p("rect", {
        x: 0,
        y: 0,
        width: e.SIZE,
        height: e.SIZE,
        transform: `translate(${e.data.wrapperTranslateX} ${e.data.wrapperTranslateY}) rotate(${e.data.wrapperRotate} ${e.SIZE / 2} ${e.SIZE / 2}) scale(${e.data.wrapperScale})`,
        fill: e.data.wrapperColor,
        rx: e.data.isCircle ? e.SIZE : e.SIZE / 6
      }, null, 8, _I),
      p("g", {
        transform: `translate(${e.data.faceTranslateX} ${e.data.faceTranslateY}) rotate(${e.data.faceRotate} ${e.SIZE / 2} ${e.SIZE / 2})`
      }, [
        e.data.isMouthOpen ? (b(), x("path", {
          key: 0,
          d: `M15 ${19 + e.data.mouthSpread}c2 1
        4 1 6 0`,
          stroke: e.data.faceColor,
          fill: "none",
          "stroke-linecap": "round"
        }, null, 8, yI)) : (b(), x("path", {
          key: 1,
          d: `M13,${19 + e.data.mouthSpread} a1,0.75 0 0,0 10,0`,
          fill: e.data.faceColor
        }, null, 8, wI)),
        p("rect", {
          x: 14 - e.data.eyeSpread,
          y: 14,
          width: 1.5,
          height: 2,
          rx: 1,
          stroke: "none",
          fill: e.data.faceColor
        }, null, 8, kI),
        p("rect", {
          x: 20 + e.data.eyeSpread,
          y: 14,
          width: 1.5,
          height: 2,
          rx: 1,
          stroke: "none",
          fill: e.data.faceColor
        }, null, 8, CI)
      ], 8, bI)
    ])
  ], 8, fI);
}
const SI = /* @__PURE__ */ Tr(dI, [["render", xI]]), EI = 3, Vo = 80;
function AI(e, t) {
  const n = Ir(e), r = t && t.length;
  return Array.from({ length: EI }, (s, o) => ({
    color: or(n + o, t, r),
    translateX: ct(n * (o + 1), Vo / 10, 1),
    translateY: ct(n * (o + 1), Vo / 10, 2),
    scale: 1.2 + ct(n * (o + 1), Vo / 20) / 10,
    rotate: ct(n * (o + 1), 360, 1)
  }));
}
const $I = H({
  props: {
    colors: {
      type: Array,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    square: {
      type: Boolean,
      required: !1,
      default: !1
    },
    size: {
      type: Number,
      required: !0
    },
    title: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  setup(e) {
    return { properties: I(() => AI(e.name, e.colors)), SIZE: Vo };
  }
}), MI = (e) => (Fv("data-v-3c8b58b0"), e = e(), jv(), e), II = ["viewBox", "width", "height"], TI = { key: 0 }, LI = ["width", "height"], OI = ["width", "height", "rx"], RI = { mask: "url(#mask__marble)" }, PI = ["width", "height", "fill"], BI = ["fill", "transform"], zI = ["fill", "transform"], DI = /* @__PURE__ */ MI(() => /* @__PURE__ */ p("defs", null, [
  /* @__PURE__ */ p("filter", {
    id: "prefix__filter0_f",
    filterUnits: "userSpaceOnUse",
    "color-interpolation-filters": "sRGB"
  }, [
    /* @__PURE__ */ p("feFlood", {
      "flood-opacity": 0,
      result: "BackgroundImageFix"
    }),
    /* @__PURE__ */ p("feBlend", {
      in: "SourceGraphic",
      in2: "BackgroundImageFix",
      result: "shape"
    }),
    /* @__PURE__ */ p("feGaussianBlur", {
      stdDeviation: 7,
      result: "effect1_foregroundBlur"
    })
  ])
], -1));
function NI(e, t, n, r, s, o) {
  return b(), x("svg", {
    viewBox: `0 0 ${e.SIZE} ${e.SIZE}`,
    fill: "none",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    width: e.size,
    height: e.size
  }, [
    e.title ? (b(), x("title", TI, ve(e.name), 1)) : Q("", !0),
    p("mask", {
      id: "mask__marble",
      maskUnits: "userSpaceOnUse",
      x: 0,
      y: 0,
      width: e.SIZE,
      height: e.SIZE
    }, [
      p("rect", {
        width: e.SIZE,
        height: e.SIZE,
        rx: e.square ? void 0 : e.SIZE * 2,
        fill: "#FFFFFF"
      }, null, 8, OI)
    ], 8, LI),
    p("g", RI, [
      p("rect", {
        width: e.SIZE,
        height: e.SIZE,
        fill: e.properties[0].color
      }, null, 8, PI),
      p("path", {
        filter: "url(#prefix__filter0_f)",
        d: "M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z",
        fill: e.properties[1].color,
        transform: `translate(${e.properties[1].translateX} ${e.properties[1].translateY}) rotate(${e.properties[1].rotate} ${e.SIZE / 2} ${e.SIZE / 2}) scale(${e.properties[2].scale})`
      }, null, 8, BI),
      p("path", {
        filter: "url(#prefix__filter0_f)",
        class: "mix-blend-overlay",
        d: "M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z",
        fill: e.properties[2].color,
        transform: `translate(${e.properties[2].translateX} ${e.properties[2].translateY}) rotate(${e.properties[2].rotate} ${e.SIZE / 2} ${e.SIZE / 2}) scale(${e.properties[2].scale})`
      }, null, 8, zI)
    ]),
    DI
  ], 8, II);
}
const qI = /* @__PURE__ */ Tr($I, [["render", NI], ["__scopeId", "data-v-3c8b58b0"]]), FI = 64, jI = 80;
function HI(e, t) {
  const n = Ir(e), r = t && t.length;
  return Array.from(
    { length: FI },
    (s, o) => or(n % o, t, r)
  );
}
const VI = H({
  props: {
    colors: {
      type: Array,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    square: {
      type: Boolean,
      required: !1,
      default: !1
    },
    size: {
      type: Number,
      required: !0
    },
    title: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  setup(e) {
    return { pixelColors: I(
      () => HI(e.name, e.colors)
    ), SIZE: jI };
  }
}), UI = ["viewBox", "width", "height"], ZI = { key: 0 }, WI = ["width", "height"], GI = ["width", "height", "rx"], KI = { mask: "url(#mask__pixel)" }, XI = ["fill"], YI = ["fill"], JI = ["fill"], QI = ["fill"], eT = ["fill"], tT = ["fill"], nT = ["fill"], rT = ["fill"], oT = ["fill"], sT = ["fill"], iT = ["fill"], aT = ["fill"], cT = ["fill"], lT = ["fill"], uT = ["fill"], dT = ["fill"], fT = ["fill"], pT = ["fill"], hT = ["fill"], gT = ["fill"], mT = ["fill"], vT = ["fill"], _T = ["fill"], bT = ["fill"], yT = ["fill"], wT = ["fill"], kT = ["fill"], CT = ["fill"], xT = ["fill"], ST = ["fill"], ET = ["fill"], AT = ["fill"], $T = ["fill"], MT = ["fill"], IT = ["fill"], TT = ["fill"], LT = ["fill"], OT = ["fill"], RT = ["fill"], PT = ["fill"], BT = ["fill"], zT = ["fill"], DT = ["fill"], NT = ["fill"], qT = ["fill"], FT = ["fill"], jT = ["fill"], HT = ["fill"], VT = ["fill"], UT = ["fill"], ZT = ["fill"], WT = ["fill"], GT = ["fill"], KT = ["fill"], XT = ["fill"], YT = ["fill"], JT = ["fill"], QT = ["fill"], eL = ["fill"], tL = ["fill"], nL = ["fill"], rL = ["fill"], oL = ["fill"], sL = ["fill"];
function iL(e, t, n, r, s, o) {
  return b(), x("svg", {
    viewBox: `0 0 ${e.SIZE} ${e.SIZE}`,
    fill: "none",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    width: e.size,
    height: e.size
  }, [
    e.title ? (b(), x("title", ZI, ve(e.name), 1)) : Q("", !0),
    p("mask", {
      id: "mask__pixel",
      "mask-type": "alpha",
      maskUnits: "userSpaceOnUse",
      x: 0,
      y: 0,
      width: e.SIZE,
      height: e.SIZE
    }, [
      p("rect", {
        width: e.SIZE,
        height: e.SIZE,
        rx: e.square ? void 0 : e.SIZE * 2,
        fill: "#FFFFFF"
      }, null, 8, GI)
    ], 8, WI),
    p("g", KI, [
      p("rect", {
        width: 10,
        height: 10,
        fill: e.pixelColors[0]
      }, null, 8, XI),
      p("rect", {
        x: 20,
        width: 10,
        height: 10,
        fill: e.pixelColors[1]
      }, null, 8, YI),
      p("rect", {
        x: 40,
        width: 10,
        height: 10,
        fill: e.pixelColors[2]
      }, null, 8, JI),
      p("rect", {
        x: 60,
        width: 10,
        height: 10,
        fill: e.pixelColors[3]
      }, null, 8, QI),
      p("rect", {
        x: 10,
        width: 10,
        height: 10,
        fill: e.pixelColors[4]
      }, null, 8, eT),
      p("rect", {
        x: 30,
        width: 10,
        height: 10,
        fill: e.pixelColors[5]
      }, null, 8, tT),
      p("rect", {
        x: 50,
        width: 10,
        height: 10,
        fill: e.pixelColors[6]
      }, null, 8, nT),
      p("rect", {
        x: 70,
        width: 10,
        height: 10,
        fill: e.pixelColors[7]
      }, null, 8, rT),
      p("rect", {
        y: 10,
        width: 10,
        height: 10,
        fill: e.pixelColors[8]
      }, null, 8, oT),
      p("rect", {
        y: 20,
        width: 10,
        height: 10,
        fill: e.pixelColors[9]
      }, null, 8, sT),
      p("rect", {
        y: 30,
        width: 10,
        height: 10,
        fill: e.pixelColors[10]
      }, null, 8, iT),
      p("rect", {
        y: 40,
        width: 10,
        height: 10,
        fill: e.pixelColors[11]
      }, null, 8, aT),
      p("rect", {
        y: 50,
        width: 10,
        height: 10,
        fill: e.pixelColors[12]
      }, null, 8, cT),
      p("rect", {
        y: 60,
        width: 10,
        height: 10,
        fill: e.pixelColors[13]
      }, null, 8, lT),
      p("rect", {
        y: 70,
        width: 10,
        height: 10,
        fill: e.pixelColors[14]
      }, null, 8, uT),
      p("rect", {
        x: 20,
        y: 10,
        width: 10,
        height: 10,
        fill: e.pixelColors[15]
      }, null, 8, dT),
      p("rect", {
        x: 20,
        y: 20,
        width: 10,
        height: 10,
        fill: e.pixelColors[16]
      }, null, 8, fT),
      p("rect", {
        x: 20,
        y: 30,
        width: 10,
        height: 10,
        fill: e.pixelColors[17]
      }, null, 8, pT),
      p("rect", {
        x: 20,
        y: 40,
        width: 10,
        height: 10,
        fill: e.pixelColors[18]
      }, null, 8, hT),
      p("rect", {
        x: 20,
        y: 50,
        width: 10,
        height: 10,
        fill: e.pixelColors[19]
      }, null, 8, gT),
      p("rect", {
        x: 20,
        y: 60,
        width: 10,
        height: 10,
        fill: e.pixelColors[20]
      }, null, 8, mT),
      p("rect", {
        x: 20,
        y: 70,
        width: 10,
        height: 10,
        fill: e.pixelColors[21]
      }, null, 8, vT),
      p("rect", {
        x: 40,
        y: 10,
        width: 10,
        height: 10,
        fill: e.pixelColors[22]
      }, null, 8, _T),
      p("rect", {
        x: 40,
        y: 20,
        width: 10,
        height: 10,
        fill: e.pixelColors[23]
      }, null, 8, bT),
      p("rect", {
        x: 40,
        y: 30,
        width: 10,
        height: 10,
        fill: e.pixelColors[24]
      }, null, 8, yT),
      p("rect", {
        x: 40,
        y: 40,
        width: 10,
        height: 10,
        fill: e.pixelColors[25]
      }, null, 8, wT),
      p("rect", {
        x: 40,
        y: 50,
        width: 10,
        height: 10,
        fill: e.pixelColors[26]
      }, null, 8, kT),
      p("rect", {
        x: 40,
        y: 60,
        width: 10,
        height: 10,
        fill: e.pixelColors[27]
      }, null, 8, CT),
      p("rect", {
        x: 40,
        y: 70,
        width: 10,
        height: 10,
        fill: e.pixelColors[28]
      }, null, 8, xT),
      p("rect", {
        x: 60,
        y: 10,
        width: 10,
        height: 10,
        fill: e.pixelColors[29]
      }, null, 8, ST),
      p("rect", {
        x: 60,
        y: 20,
        width: 10,
        height: 10,
        fill: e.pixelColors[30]
      }, null, 8, ET),
      p("rect", {
        x: 60,
        y: 30,
        width: 10,
        height: 10,
        fill: e.pixelColors[31]
      }, null, 8, AT),
      p("rect", {
        x: 60,
        y: 40,
        width: 10,
        height: 10,
        fill: e.pixelColors[32]
      }, null, 8, $T),
      p("rect", {
        x: 60,
        y: 50,
        width: 10,
        height: 10,
        fill: e.pixelColors[33]
      }, null, 8, MT),
      p("rect", {
        x: 60,
        y: 60,
        width: 10,
        height: 10,
        fill: e.pixelColors[34]
      }, null, 8, IT),
      p("rect", {
        x: 60,
        y: 70,
        width: 10,
        height: 10,
        fill: e.pixelColors[35]
      }, null, 8, TT),
      p("rect", {
        x: 10,
        y: 10,
        width: 10,
        height: 10,
        fill: e.pixelColors[36]
      }, null, 8, LT),
      p("rect", {
        x: 10,
        y: 20,
        width: 10,
        height: 10,
        fill: e.pixelColors[37]
      }, null, 8, OT),
      p("rect", {
        x: 10,
        y: 30,
        width: 10,
        height: 10,
        fill: e.pixelColors[38]
      }, null, 8, RT),
      p("rect", {
        x: 10,
        y: 40,
        width: 10,
        height: 10,
        fill: e.pixelColors[39]
      }, null, 8, PT),
      p("rect", {
        x: 10,
        y: 50,
        width: 10,
        height: 10,
        fill: e.pixelColors[40]
      }, null, 8, BT),
      p("rect", {
        x: 10,
        y: 60,
        width: 10,
        height: 10,
        fill: e.pixelColors[41]
      }, null, 8, zT),
      p("rect", {
        x: 10,
        y: 70,
        width: 10,
        height: 10,
        fill: e.pixelColors[42]
      }, null, 8, DT),
      p("rect", {
        x: 30,
        y: 10,
        width: 10,
        height: 10,
        fill: e.pixelColors[43]
      }, null, 8, NT),
      p("rect", {
        x: 30,
        y: 20,
        width: 10,
        height: 10,
        fill: e.pixelColors[44]
      }, null, 8, qT),
      p("rect", {
        x: 30,
        y: 30,
        width: 10,
        height: 10,
        fill: e.pixelColors[45]
      }, null, 8, FT),
      p("rect", {
        x: 30,
        y: 40,
        width: 10,
        height: 10,
        fill: e.pixelColors[46]
      }, null, 8, jT),
      p("rect", {
        x: 30,
        y: 50,
        width: 10,
        height: 10,
        fill: e.pixelColors[47]
      }, null, 8, HT),
      p("rect", {
        x: 30,
        y: 60,
        width: 10,
        height: 10,
        fill: e.pixelColors[48]
      }, null, 8, VT),
      p("rect", {
        x: 30,
        y: 70,
        width: 10,
        height: 10,
        fill: e.pixelColors[49]
      }, null, 8, UT),
      p("rect", {
        x: 50,
        y: 10,
        width: 10,
        height: 10,
        fill: e.pixelColors[50]
      }, null, 8, ZT),
      p("rect", {
        x: 50,
        y: 20,
        width: 10,
        height: 10,
        fill: e.pixelColors[51]
      }, null, 8, WT),
      p("rect", {
        x: 50,
        y: 30,
        width: 10,
        height: 10,
        fill: e.pixelColors[52]
      }, null, 8, GT),
      p("rect", {
        x: 50,
        y: 40,
        width: 10,
        height: 10,
        fill: e.pixelColors[53]
      }, null, 8, KT),
      p("rect", {
        x: 50,
        y: 50,
        width: 10,
        height: 10,
        fill: e.pixelColors[54]
      }, null, 8, XT),
      p("rect", {
        x: 50,
        y: 60,
        width: 10,
        height: 10,
        fill: e.pixelColors[55]
      }, null, 8, YT),
      p("rect", {
        x: 50,
        y: 70,
        width: 10,
        height: 10,
        fill: e.pixelColors[56]
      }, null, 8, JT),
      p("rect", {
        x: 70,
        y: 10,
        width: 10,
        height: 10,
        fill: e.pixelColors[57]
      }, null, 8, QT),
      p("rect", {
        x: 70,
        y: 20,
        width: 10,
        height: 10,
        fill: e.pixelColors[58]
      }, null, 8, eL),
      p("rect", {
        x: 70,
        y: 30,
        width: 10,
        height: 10,
        fill: e.pixelColors[59]
      }, null, 8, tL),
      p("rect", {
        x: 70,
        y: 40,
        width: 10,
        height: 10,
        fill: e.pixelColors[60]
      }, null, 8, nL),
      p("rect", {
        x: 70,
        y: 50,
        width: 10,
        height: 10,
        fill: e.pixelColors[61]
      }, null, 8, rL),
      p("rect", {
        x: 70,
        y: 60,
        width: 10,
        height: 10,
        fill: e.pixelColors[62]
      }, null, 8, oL),
      p("rect", {
        x: 70,
        y: 70,
        width: 10,
        height: 10,
        fill: e.pixelColors[63]
      }, null, 8, sL)
    ])
  ], 8, UI);
}
const aL = /* @__PURE__ */ Tr(VI, [["render", iL]]), cL = 90, lL = 5;
function uL(e, t) {
  const n = Ir(e), r = t && t.length, s = Array.from(
    { length: lL },
    (i, a) => or(n + a, t, r)
  ), o = [];
  return o[0] = s[0], o[1] = s[1], o[2] = s[1], o[3] = s[2], o[4] = s[2], o[5] = s[3], o[6] = s[3], o[7] = s[0], o[8] = s[4], o;
}
const dL = H({
  props: {
    colors: {
      type: Array,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    square: {
      type: Boolean,
      required: !1,
      default: !1
    },
    size: {
      type: Number,
      required: !0
    },
    title: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  setup(e) {
    return { ringColors: I(() => uL(e.name, e.colors)), SIZE: cL };
  }
}), fL = ["viewBox", "width", "height"], pL = { key: 0 }, hL = ["width", "height"], gL = ["width", "height", "rx"], mL = { mask: "url(#mask__ring)" }, vL = ["fill"], _L = ["fill"], bL = ["fill"], yL = ["fill"], wL = ["fill"], kL = ["fill"], CL = ["fill"], xL = ["fill"], SL = ["fill"];
function EL(e, t, n, r, s, o) {
  return b(), x("svg", {
    viewBox: `0 0 ${e.SIZE} ${e.SIZE}`,
    fill: "none",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    width: e.size,
    height: e.size
  }, [
    e.title ? (b(), x("title", pL, ve(e.name), 1)) : Q("", !0),
    p("mask", {
      id: "mask__ring",
      maskUnits: "userSpaceOnUse",
      x: 0,
      y: 0,
      width: e.SIZE,
      height: e.SIZE
    }, [
      p("rect", {
        width: e.SIZE,
        height: e.SIZE,
        rx: e.square ? void 0 : e.SIZE * 2,
        fill: "#FFFFFF"
      }, null, 8, gL)
    ], 8, hL),
    p("g", mL, [
      p("path", {
        d: "M0 0h90v45H0z",
        fill: e.ringColors[0]
      }, null, 8, vL),
      p("path", {
        d: "M0 45h90v45H0z",
        fill: e.ringColors[1]
      }, null, 8, _L),
      p("path", {
        d: "M83 45a38 38 0 00-76 0h76z",
        fill: e.ringColors[2]
      }, null, 8, bL),
      p("path", {
        d: "M83 45a38 38 0 01-76 0h76z",
        fill: e.ringColors[3]
      }, null, 8, yL),
      p("path", {
        d: "M77 45a32 32 0 10-64 0h64z",
        fill: e.ringColors[4]
      }, null, 8, wL),
      p("path", {
        d: "M77 45a32 32 0 11-64 0h64z",
        fill: e.ringColors[5]
      }, null, 8, kL),
      p("path", {
        d: "M71 45a26 26 0 00-52 0h52z",
        fill: e.ringColors[6]
      }, null, 8, CL),
      p("path", {
        d: "M71 45a26 26 0 01-52 0h52z",
        fill: e.ringColors[7]
      }, null, 8, xL),
      p("circle", {
        cx: 45,
        cy: 45,
        r: 23,
        fill: e.ringColors[8]
      }, null, 8, SL)
    ])
  ], 8, fL);
}
const AL = /* @__PURE__ */ Tr(dL, [["render", EL]]), $L = 4, ML = 80;
function IL(e, t) {
  const n = Ir(e), r = t && t.length;
  return Array.from(
    { length: $L },
    (s, o) => or(n + o, t, r)
  );
}
const TL = H({
  props: {
    colors: {
      type: Array,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    square: {
      type: Boolean,
      required: !1,
      default: !1
    },
    size: {
      type: Number,
      required: !0
    },
    title: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  setup(e) {
    const t = I(
      () => IL(e.name, e.colors)
    ), n = I(() => e.name.replace(/\s/g, ""));
    return { sunsetColors: t, formattedName: n, SIZE: ML };
  }
}), LL = ["viewBox", "width", "height"], OL = { key: 0 }, RL = ["width", "height"], PL = ["width", "height", "rx"], BL = { mask: "url(#mask__sunset)" }, zL = ["fill"], DL = ["fill"], NL = ["id", "x1", "x2", "y2"], qL = ["stop-color"], FL = ["stop-color"], jL = ["id", "x1", "y1", "x2", "y2"], HL = ["stop-color"], VL = ["stop-color"];
function UL(e, t, n, r, s, o) {
  return b(), x("svg", {
    viewBox: `0 0 ${e.SIZE} ${e.SIZE}`,
    fill: "none",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    width: e.size,
    height: e.size
  }, [
    e.title ? (b(), x("title", OL, ve(e.name), 1)) : Q("", !0),
    p("mask", {
      id: "mask__sunset",
      maskUnits: "userSpaceOnUse",
      x: 0,
      y: 0,
      width: e.SIZE,
      height: e.SIZE
    }, [
      p("rect", {
        width: e.SIZE,
        height: e.SIZE,
        rx: e.square ? void 0 : e.SIZE * 2,
        fill: "#FFFFFF"
      }, null, 8, PL)
    ], 8, RL),
    p("g", BL, [
      p("path", {
        fill: `url(#gradient_paint0_linear_${e.formattedName})`,
        d: "M0 0h80v40H0z"
      }, null, 8, zL),
      p("path", {
        fill: `url(#gradient_paint1_linear_${e.formattedName})`,
        d: "M0 40h80v40H0z"
      }, null, 8, DL)
    ]),
    p("defs", null, [
      p("linearGradient", {
        id: `gradient_paint0_linear_${e.formattedName}`,
        x1: e.SIZE / 2,
        y1: 0,
        x2: e.SIZE / 2,
        y2: e.SIZE / 2,
        gradientUnits: "userSpaceOnUse"
      }, [
        p("stop", {
          "stop-color": e.sunsetColors[0]
        }, null, 8, qL),
        p("stop", {
          offset: 1,
          "stop-color": e.sunsetColors[1]
        }, null, 8, FL)
      ], 8, NL),
      p("linearGradient", {
        id: `gradient_paint1_linear_${e.formattedName}`,
        x1: e.SIZE / 2,
        y1: e.SIZE / 2,
        x2: e.SIZE / 2,
        y2: e.SIZE,
        gradientUnits: "userSpaceOnUse"
      }, [
        p("stop", {
          "stop-color": e.sunsetColors[2]
        }, null, 8, HL),
        p("stop", {
          offset: 1,
          "stop-color": e.sunsetColors[3]
        }, null, 8, VL)
      ], 8, jL)
    ])
  ], 8, LL);
}
const ZL = /* @__PURE__ */ Tr(TL, [["render", UL]]);
H({
  name: "Avatar",
  props: {
    variant: {
      type: String,
      required: !1,
      default: "marble",
      validator(e) {
        return [
          "bauhaus",
          "beam",
          "marble",
          "pixel",
          "ring",
          "sunset"
        ].includes(e);
      }
    },
    colors: {
      type: Array,
      required: !1,
      default: () => ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]
    },
    name: {
      type: String,
      required: !1,
      default: "Clara Barton"
    },
    square: {
      type: Boolean,
      required: !1,
      default: !1
    },
    size: {
      type: Number,
      required: !1,
      default: 40
    },
    title: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  setup() {
    return {};
  },
  components: {
    AvatarBauhaus: lI,
    AvatarBeam: SI,
    AvatarMarble: qI,
    AvatarPixel: aL,
    AvatarRing: AL,
    AvatarSunset: ZL
  }
});
const Md = /(\*|-) \[x\]/, Id = /(\*|-) \[\s\]/, WL = (e, t) => {
  let n = 0;
  const r = e.split(`
`);
  for (let s = 0; s < r.length; s++) {
    const o = r[s], i = Md.test(o), a = Id.test(o);
    if (i || a) {
      if (n === t) {
        const c = i ? Md : Id, u = i ? "[ ]" : "[x]";
        r[s] = o.replace(c, `$1 ${u}`);
        break;
      }
      n++;
    }
  }
  return r.join(`
`);
};
function GL(e, t) {
  return /^on[A-Z]/.test(t);
}
function dm(e) {
  return `${e ? `${e}-` : ""}${Math.random().toString(36).substring(2, 11)}`;
}
const KL = /* @__PURE__ */ H({
  name: "N8nInput",
  __name: "Input",
  props: {
    modelValue: { default: "" },
    type: { default: "text" },
    size: { default: "large" },
    placeholder: { default: "" },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    clearable: { type: Boolean, default: !1 },
    rows: { default: 2 },
    maxlength: { default: void 0 },
    title: { default: "" },
    name: { default: () => dm("input") },
    autocomplete: { default: "off" }
  },
  setup(e, { expose: t }) {
    const n = e, r = I(
      () => n.size === "medium" ? "default" : n.size
    ), s = I(() => {
      const d = [];
      return n.size === "xlarge" && d.push("xlarge"), n.type === "password" && d.push("ph-no-capture"), d;
    }), o = D(), i = I(() => {
      if (!(o != null && o.value)) return;
      const d = n.type === "textarea" ? "textarea" : "input";
      return o.value.$el.querySelector(d);
    });
    return t({ focus: () => {
      var d;
      return (d = i.value) == null ? void 0 : d.focus();
    }, blur: () => {
      var d;
      return (d = i.value) == null ? void 0 : d.blur();
    }, select: () => {
      var d;
      return (d = i.value) == null ? void 0 : d.select();
    } }), (d, l) => (b(), X(_(Cs), je({
      ref_key: "innerInput",
      ref: o,
      "model-value": d.modelValue,
      type: d.type,
      size: r.value,
      class: ["n8n-input", ...s.value],
      autocomplete: d.autocomplete,
      name: d.name,
      placeholder: d.placeholder,
      disabled: d.disabled,
      readonly: d.readonly,
      clearable: d.clearable,
      rows: d.rows,
      title: d.title,
      maxlength: d.maxlength
    }, d.$attrs), Xr({ _: 2 }, [
      d.$slots.prepend ? {
        name: "prepend",
        fn: Y(() => [
          ne(d.$slots, "prepend")
        ]),
        key: "0"
      } : void 0,
      d.$slots.append ? {
        name: "append",
        fn: Y(() => [
          ne(d.$slots, "append")
        ]),
        key: "1"
      } : void 0,
      d.$slots.prefix ? {
        name: "prefix",
        fn: Y(() => [
          ne(d.$slots, "prefix")
        ]),
        key: "2"
      } : void 0,
      d.$slots.suffix ? {
        name: "suffix",
        fn: Y(() => [
          ne(d.$slots, "suffix")
        ]),
        key: "3"
      } : void 0
    ]), 1040, ["model-value", "type", "size", "class", "autocomplete", "name", "placeholder", "disabled", "readonly", "clearable", "rows", "title", "maxlength"]));
  }
}), XL = "_xlarge_ddtui_1", YL = {
  xlarge: XL
}, JL = {
  $style: YL
}, fm = /* @__PURE__ */ qt(KL, [["__cssModules", JL]]);
dm("color-picker");
function QL() {
  return {
    t: (e, t = []) => wb(e, t)
  };
}
({
  ...o2
});
({
  ...Oc.props
});
/*!
  * vue-router v4.5.0
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
const eO = () => {
}, Qo = Array.isArray;
function Td(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function tO(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!nO(e[n], t[n]))
      return !1;
  return !0;
}
function nO(e, t) {
  return Qo(e) ? Ld(e, t) : Qo(t) ? Ld(t, e) : e === t;
}
function Ld(e, t) {
  return Qo(t) ? e.length === t.length && e.every((n, r) => n === t[r]) : e.length === 1 && e[0] === t;
}
var Od;
(function(e) {
  e.pop = "pop", e.push = "push";
})(Od || (Od = {}));
var Rd;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(Rd || (Rd = {}));
var Pd;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(Pd || (Pd = {}));
const pm = Symbol(""), rO = Symbol("");
function Bd(e) {
  const t = $e(pm), n = $e(rO), r = I(() => {
    const c = _(e.to);
    return t.resolve(c);
  }), s = I(() => {
    const { matched: c } = r.value, { length: u } = c, d = c[u - 1], l = n.matched;
    if (!d || !l.length)
      return -1;
    const m = l.findIndex(Td.bind(null, d));
    if (m > -1)
      return m;
    const f = Dd(c[u - 2]);
    return (
      // we are dealing with nested routes
      u > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      Dd(d) === f && // avoid comparing the child with its parent
      l[l.length - 1].path !== f ? l.findIndex(Td.bind(null, c[u - 2])) : m
    );
  }), o = I(() => s.value > -1 && aO(n.params, r.value.params)), i = I(() => s.value > -1 && s.value === n.matched.length - 1 && tO(n.params, r.value.params));
  function a(c = {}) {
    if (iO(c)) {
      const u = t[_(e.replace) ? "replace" : "push"](
        _(e.to)
        // avoid uncaught errors are they are logged anyway
      ).catch(eO);
      return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => u), u;
    }
    return Promise.resolve();
  }
  return {
    route: r,
    href: I(() => r.value.href),
    isActive: o,
    isExactActive: i,
    navigate: a
  };
}
function oO(e) {
  return e.length === 1 ? e[0] : e;
}
const sO = /* @__PURE__ */ H({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink: Bd,
  setup(e, { slots: t }) {
    const n = qn(Bd(e)), { options: r } = $e(pm), s = I(() => ({
      [Nd(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [Nd(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const o = t.default && oO(t.default(n));
      return e.custom ? o : Lt("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: s.value
      }, o);
    };
  }
}), zd = sO;
function iO(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function aO(e, t) {
  for (const n in t) {
    const r = t[n], s = e[n];
    if (typeof r == "string") {
      if (r !== s)
        return !1;
    } else if (!Qo(s) || s.length !== r.length || r.some((o, i) => o !== s[i]))
      return !1;
  }
  return !0;
}
function Dd(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const Nd = (e, t, n) => e ?? t ?? n;
var Qs = {};
const cO = "Á", lO = "á", uO = "Ă", dO = "ă", fO = "∾", pO = "∿", hO = "∾̳", gO = "Â", mO = "â", vO = "´", _O = "А", bO = "а", yO = "Æ", wO = "æ", kO = "⁡", CO = "𝔄", xO = "𝔞", SO = "À", EO = "à", AO = "ℵ", $O = "ℵ", MO = "Α", IO = "α", TO = "Ā", LO = "ā", OO = "⨿", RO = "&", PO = "&", BO = "⩕", zO = "⩓", DO = "∧", NO = "⩜", qO = "⩘", FO = "⩚", jO = "∠", HO = "⦤", VO = "∠", UO = "⦨", ZO = "⦩", WO = "⦪", GO = "⦫", KO = "⦬", XO = "⦭", YO = "⦮", JO = "⦯", QO = "∡", eR = "∟", tR = "⊾", nR = "⦝", rR = "∢", oR = "Å", sR = "⍼", iR = "Ą", aR = "ą", cR = "𝔸", lR = "𝕒", uR = "⩯", dR = "≈", fR = "⩰", pR = "≊", hR = "≋", gR = "'", mR = "⁡", vR = "≈", _R = "≊", bR = "Å", yR = "å", wR = "𝒜", kR = "𝒶", CR = "≔", xR = "*", SR = "≈", ER = "≍", AR = "Ã", $R = "ã", MR = "Ä", IR = "ä", TR = "∳", LR = "⨑", OR = "≌", RR = "϶", PR = "‵", BR = "∽", zR = "⋍", DR = "∖", NR = "⫧", qR = "⊽", FR = "⌅", jR = "⌆", HR = "⌅", VR = "⎵", UR = "⎶", ZR = "≌", WR = "Б", GR = "б", KR = "„", XR = "∵", YR = "∵", JR = "∵", QR = "⦰", eP = "϶", tP = "ℬ", nP = "ℬ", rP = "Β", oP = "β", sP = "ℶ", iP = "≬", aP = "𝔅", cP = "𝔟", lP = "⋂", uP = "◯", dP = "⋃", fP = "⨀", pP = "⨁", hP = "⨂", gP = "⨆", mP = "★", vP = "▽", _P = "△", bP = "⨄", yP = "⋁", wP = "⋀", kP = "⤍", CP = "⧫", xP = "▪", SP = "▴", EP = "▾", AP = "◂", $P = "▸", MP = "␣", IP = "▒", TP = "░", LP = "▓", OP = "█", RP = "=⃥", PP = "≡⃥", BP = "⫭", zP = "⌐", DP = "𝔹", NP = "𝕓", qP = "⊥", FP = "⊥", jP = "⋈", HP = "⧉", VP = "┐", UP = "╕", ZP = "╖", WP = "╗", GP = "┌", KP = "╒", XP = "╓", YP = "╔", JP = "─", QP = "═", eB = "┬", tB = "╤", nB = "╥", rB = "╦", oB = "┴", sB = "╧", iB = "╨", aB = "╩", cB = "⊟", lB = "⊞", uB = "⊠", dB = "┘", fB = "╛", pB = "╜", hB = "╝", gB = "└", mB = "╘", vB = "╙", _B = "╚", bB = "│", yB = "║", wB = "┼", kB = "╪", CB = "╫", xB = "╬", SB = "┤", EB = "╡", AB = "╢", $B = "╣", MB = "├", IB = "╞", TB = "╟", LB = "╠", OB = "‵", RB = "˘", PB = "˘", BB = "¦", zB = "𝒷", DB = "ℬ", NB = "⁏", qB = "∽", FB = "⋍", jB = "⧅", HB = "\\", VB = "⟈", UB = "•", ZB = "•", WB = "≎", GB = "⪮", KB = "≏", XB = "≎", YB = "≏", JB = "Ć", QB = "ć", ez = "⩄", tz = "⩉", nz = "⩋", rz = "∩", oz = "⋒", sz = "⩇", iz = "⩀", az = "ⅅ", cz = "∩︀", lz = "⁁", uz = "ˇ", dz = "ℭ", fz = "⩍", pz = "Č", hz = "č", gz = "Ç", mz = "ç", vz = "Ĉ", _z = "ĉ", bz = "∰", yz = "⩌", wz = "⩐", kz = "Ċ", Cz = "ċ", xz = "¸", Sz = "¸", Ez = "⦲", Az = "¢", $z = "·", Mz = "·", Iz = "𝔠", Tz = "ℭ", Lz = "Ч", Oz = "ч", Rz = "✓", Pz = "✓", Bz = "Χ", zz = "χ", Dz = "ˆ", Nz = "≗", qz = "↺", Fz = "↻", jz = "⊛", Hz = "⊚", Vz = "⊝", Uz = "⊙", Zz = "®", Wz = "Ⓢ", Gz = "⊖", Kz = "⊕", Xz = "⊗", Yz = "○", Jz = "⧃", Qz = "≗", eD = "⨐", tD = "⫯", nD = "⧂", rD = "∲", oD = "”", sD = "’", iD = "♣", aD = "♣", cD = ":", lD = "∷", uD = "⩴", dD = "≔", fD = "≔", pD = ",", hD = "@", gD = "∁", mD = "∘", vD = "∁", _D = "ℂ", bD = "≅", yD = "⩭", wD = "≡", kD = "∮", CD = "∯", xD = "∮", SD = "𝕔", ED = "ℂ", AD = "∐", $D = "∐", MD = "©", ID = "©", TD = "℗", LD = "∳", OD = "↵", RD = "✗", PD = "⨯", BD = "𝒞", zD = "𝒸", DD = "⫏", ND = "⫑", qD = "⫐", FD = "⫒", jD = "⋯", HD = "⤸", VD = "⤵", UD = "⋞", ZD = "⋟", WD = "↶", GD = "⤽", KD = "⩈", XD = "⩆", YD = "≍", JD = "∪", QD = "⋓", eN = "⩊", tN = "⊍", nN = "⩅", rN = "∪︀", oN = "↷", sN = "⤼", iN = "⋞", aN = "⋟", cN = "⋎", lN = "⋏", uN = "¤", dN = "↶", fN = "↷", pN = "⋎", hN = "⋏", gN = "∲", mN = "∱", vN = "⌭", _N = "†", bN = "‡", yN = "ℸ", wN = "↓", kN = "↡", CN = "⇓", xN = "‐", SN = "⫤", EN = "⊣", AN = "⤏", $N = "˝", MN = "Ď", IN = "ď", TN = "Д", LN = "д", ON = "‡", RN = "⇊", PN = "ⅅ", BN = "ⅆ", zN = "⤑", DN = "⩷", NN = "°", qN = "∇", FN = "Δ", jN = "δ", HN = "⦱", VN = "⥿", UN = "𝔇", ZN = "𝔡", WN = "⥥", GN = "⇃", KN = "⇂", XN = "´", YN = "˙", JN = "˝", QN = "`", eq = "˜", tq = "⋄", nq = "⋄", rq = "⋄", oq = "♦", sq = "♦", iq = "¨", aq = "ⅆ", cq = "ϝ", lq = "⋲", uq = "÷", dq = "÷", fq = "⋇", pq = "⋇", hq = "Ђ", gq = "ђ", mq = "⌞", vq = "⌍", _q = "$", bq = "𝔻", yq = "𝕕", wq = "¨", kq = "˙", Cq = "⃜", xq = "≐", Sq = "≑", Eq = "≐", Aq = "∸", $q = "∔", Mq = "⊡", Iq = "⌆", Tq = "∯", Lq = "¨", Oq = "⇓", Rq = "⇐", Pq = "⇔", Bq = "⫤", zq = "⟸", Dq = "⟺", Nq = "⟹", qq = "⇒", Fq = "⊨", jq = "⇑", Hq = "⇕", Vq = "∥", Uq = "⤓", Zq = "↓", Wq = "↓", Gq = "⇓", Kq = "⇵", Xq = "̑", Yq = "⇊", Jq = "⇃", Qq = "⇂", eF = "⥐", tF = "⥞", nF = "⥖", rF = "↽", oF = "⥟", sF = "⥗", iF = "⇁", aF = "↧", cF = "⊤", lF = "⤐", uF = "⌟", dF = "⌌", fF = "𝒟", pF = "𝒹", hF = "Ѕ", gF = "ѕ", mF = "⧶", vF = "Đ", _F = "đ", bF = "⋱", yF = "▿", wF = "▾", kF = "⇵", CF = "⥯", xF = "⦦", SF = "Џ", EF = "џ", AF = "⟿", $F = "É", MF = "é", IF = "⩮", TF = "Ě", LF = "ě", OF = "Ê", RF = "ê", PF = "≖", BF = "≕", zF = "Э", DF = "э", NF = "⩷", qF = "Ė", FF = "ė", jF = "≑", HF = "ⅇ", VF = "≒", UF = "𝔈", ZF = "𝔢", WF = "⪚", GF = "È", KF = "è", XF = "⪖", YF = "⪘", JF = "⪙", QF = "∈", ej = "⏧", tj = "ℓ", nj = "⪕", rj = "⪗", oj = "Ē", sj = "ē", ij = "∅", aj = "∅", cj = "◻", lj = "∅", uj = "▫", dj = " ", fj = " ", pj = " ", hj = "Ŋ", gj = "ŋ", mj = " ", vj = "Ę", _j = "ę", bj = "𝔼", yj = "𝕖", wj = "⋕", kj = "⧣", Cj = "⩱", xj = "ε", Sj = "Ε", Ej = "ε", Aj = "ϵ", $j = "≖", Mj = "≕", Ij = "≂", Tj = "⪖", Lj = "⪕", Oj = "⩵", Rj = "=", Pj = "≂", Bj = "≟", zj = "⇌", Dj = "≡", Nj = "⩸", qj = "⧥", Fj = "⥱", jj = "≓", Hj = "ℯ", Vj = "ℰ", Uj = "≐", Zj = "⩳", Wj = "≂", Gj = "Η", Kj = "η", Xj = "Ð", Yj = "ð", Jj = "Ë", Qj = "ë", eH = "€", tH = "!", nH = "∃", rH = "∃", oH = "ℰ", sH = "ⅇ", iH = "ⅇ", aH = "≒", cH = "Ф", lH = "ф", uH = "♀", dH = "ﬃ", fH = "ﬀ", pH = "ﬄ", hH = "𝔉", gH = "𝔣", mH = "ﬁ", vH = "◼", _H = "▪", bH = "fj", yH = "♭", wH = "ﬂ", kH = "▱", CH = "ƒ", xH = "𝔽", SH = "𝕗", EH = "∀", AH = "∀", $H = "⋔", MH = "⫙", IH = "ℱ", TH = "⨍", LH = "½", OH = "⅓", RH = "¼", PH = "⅕", BH = "⅙", zH = "⅛", DH = "⅔", NH = "⅖", qH = "¾", FH = "⅗", jH = "⅜", HH = "⅘", VH = "⅚", UH = "⅝", ZH = "⅞", WH = "⁄", GH = "⌢", KH = "𝒻", XH = "ℱ", YH = "ǵ", JH = "Γ", QH = "γ", eV = "Ϝ", tV = "ϝ", nV = "⪆", rV = "Ğ", oV = "ğ", sV = "Ģ", iV = "Ĝ", aV = "ĝ", cV = "Г", lV = "г", uV = "Ġ", dV = "ġ", fV = "≥", pV = "≧", hV = "⪌", gV = "⋛", mV = "≥", vV = "≧", _V = "⩾", bV = "⪩", yV = "⩾", wV = "⪀", kV = "⪂", CV = "⪄", xV = "⋛︀", SV = "⪔", EV = "𝔊", AV = "𝔤", $V = "≫", MV = "⋙", IV = "⋙", TV = "ℷ", LV = "Ѓ", OV = "ѓ", RV = "⪥", PV = "≷", BV = "⪒", zV = "⪤", DV = "⪊", NV = "⪊", qV = "⪈", FV = "≩", jV = "⪈", HV = "≩", VV = "⋧", UV = "𝔾", ZV = "𝕘", WV = "`", GV = "≥", KV = "⋛", XV = "≧", YV = "⪢", JV = "≷", QV = "⩾", eU = "≳", tU = "𝒢", nU = "ℊ", rU = "≳", oU = "⪎", sU = "⪐", iU = "⪧", aU = "⩺", cU = ">", lU = ">", uU = "≫", dU = "⋗", fU = "⦕", pU = "⩼", hU = "⪆", gU = "⥸", mU = "⋗", vU = "⋛", _U = "⪌", bU = "≷", yU = "≳", wU = "≩︀", kU = "≩︀", CU = "ˇ", xU = " ", SU = "½", EU = "ℋ", AU = "Ъ", $U = "ъ", MU = "⥈", IU = "↔", TU = "⇔", LU = "↭", OU = "^", RU = "ℏ", PU = "Ĥ", BU = "ĥ", zU = "♥", DU = "♥", NU = "…", qU = "⊹", FU = "𝔥", jU = "ℌ", HU = "ℋ", VU = "⤥", UU = "⤦", ZU = "⇿", WU = "∻", GU = "↩", KU = "↪", XU = "𝕙", YU = "ℍ", JU = "―", QU = "─", eZ = "𝒽", tZ = "ℋ", nZ = "ℏ", rZ = "Ħ", oZ = "ħ", sZ = "≎", iZ = "≏", aZ = "⁃", cZ = "‐", lZ = "Í", uZ = "í", dZ = "⁣", fZ = "Î", pZ = "î", hZ = "И", gZ = "и", mZ = "İ", vZ = "Е", _Z = "е", bZ = "¡", yZ = "⇔", wZ = "𝔦", kZ = "ℑ", CZ = "Ì", xZ = "ì", SZ = "ⅈ", EZ = "⨌", AZ = "∭", $Z = "⧜", MZ = "℩", IZ = "Ĳ", TZ = "ĳ", LZ = "Ī", OZ = "ī", RZ = "ℑ", PZ = "ⅈ", BZ = "ℐ", zZ = "ℑ", DZ = "ı", NZ = "ℑ", qZ = "⊷", FZ = "Ƶ", jZ = "⇒", HZ = "℅", VZ = "∞", UZ = "⧝", ZZ = "ı", WZ = "⊺", GZ = "∫", KZ = "∬", XZ = "ℤ", YZ = "∫", JZ = "⊺", QZ = "⋂", eW = "⨗", tW = "⨼", nW = "⁣", rW = "⁢", oW = "Ё", sW = "ё", iW = "Į", aW = "į", cW = "𝕀", lW = "𝕚", uW = "Ι", dW = "ι", fW = "⨼", pW = "¿", hW = "𝒾", gW = "ℐ", mW = "∈", vW = "⋵", _W = "⋹", bW = "⋴", yW = "⋳", wW = "∈", kW = "⁢", CW = "Ĩ", xW = "ĩ", SW = "І", EW = "і", AW = "Ï", $W = "ï", MW = "Ĵ", IW = "ĵ", TW = "Й", LW = "й", OW = "𝔍", RW = "𝔧", PW = "ȷ", BW = "𝕁", zW = "𝕛", DW = "𝒥", NW = "𝒿", qW = "Ј", FW = "ј", jW = "Є", HW = "є", VW = "Κ", UW = "κ", ZW = "ϰ", WW = "Ķ", GW = "ķ", KW = "К", XW = "к", YW = "𝔎", JW = "𝔨", QW = "ĸ", eG = "Х", tG = "х", nG = "Ќ", rG = "ќ", oG = "𝕂", sG = "𝕜", iG = "𝒦", aG = "𝓀", cG = "⇚", lG = "Ĺ", uG = "ĺ", dG = "⦴", fG = "ℒ", pG = "Λ", hG = "λ", gG = "⟨", mG = "⟪", vG = "⦑", _G = "⟨", bG = "⪅", yG = "ℒ", wG = "«", kG = "⇤", CG = "⤟", xG = "←", SG = "↞", EG = "⇐", AG = "⤝", $G = "↩", MG = "↫", IG = "⤹", TG = "⥳", LG = "↢", OG = "⤙", RG = "⤛", PG = "⪫", BG = "⪭", zG = "⪭︀", DG = "⤌", NG = "⤎", qG = "❲", FG = "{", jG = "[", HG = "⦋", VG = "⦏", UG = "⦍", ZG = "Ľ", WG = "ľ", GG = "Ļ", KG = "ļ", XG = "⌈", YG = "{", JG = "Л", QG = "л", eK = "⤶", tK = "“", nK = "„", rK = "⥧", oK = "⥋", sK = "↲", iK = "≤", aK = "≦", cK = "⟨", lK = "⇤", uK = "←", dK = "←", fK = "⇐", pK = "⇆", hK = "↢", gK = "⌈", mK = "⟦", vK = "⥡", _K = "⥙", bK = "⇃", yK = "⌊", wK = "↽", kK = "↼", CK = "⇇", xK = "↔", SK = "↔", EK = "⇔", AK = "⇆", $K = "⇋", MK = "↭", IK = "⥎", TK = "↤", LK = "⊣", OK = "⥚", RK = "⋋", PK = "⧏", BK = "⊲", zK = "⊴", DK = "⥑", NK = "⥠", qK = "⥘", FK = "↿", jK = "⥒", HK = "↼", VK = "⪋", UK = "⋚", ZK = "≤", WK = "≦", GK = "⩽", KK = "⪨", XK = "⩽", YK = "⩿", JK = "⪁", QK = "⪃", eX = "⋚︀", tX = "⪓", nX = "⪅", rX = "⋖", oX = "⋚", sX = "⪋", iX = "⋚", aX = "≦", cX = "≶", lX = "≶", uX = "⪡", dX = "≲", fX = "⩽", pX = "≲", hX = "⥼", gX = "⌊", mX = "𝔏", vX = "𝔩", _X = "≶", bX = "⪑", yX = "⥢", wX = "↽", kX = "↼", CX = "⥪", xX = "▄", SX = "Љ", EX = "љ", AX = "⇇", $X = "≪", MX = "⋘", IX = "⌞", TX = "⇚", LX = "⥫", OX = "◺", RX = "Ŀ", PX = "ŀ", BX = "⎰", zX = "⎰", DX = "⪉", NX = "⪉", qX = "⪇", FX = "≨", jX = "⪇", HX = "≨", VX = "⋦", UX = "⟬", ZX = "⇽", WX = "⟦", GX = "⟵", KX = "⟵", XX = "⟸", YX = "⟷", JX = "⟷", QX = "⟺", eY = "⟼", tY = "⟶", nY = "⟶", rY = "⟹", oY = "↫", sY = "↬", iY = "⦅", aY = "𝕃", cY = "𝕝", lY = "⨭", uY = "⨴", dY = "∗", fY = "_", pY = "↙", hY = "↘", gY = "◊", mY = "◊", vY = "⧫", _Y = "(", bY = "⦓", yY = "⇆", wY = "⌟", kY = "⇋", CY = "⥭", xY = "‎", SY = "⊿", EY = "‹", AY = "𝓁", $Y = "ℒ", MY = "↰", IY = "↰", TY = "≲", LY = "⪍", OY = "⪏", RY = "[", PY = "‘", BY = "‚", zY = "Ł", DY = "ł", NY = "⪦", qY = "⩹", FY = "<", jY = "<", HY = "≪", VY = "⋖", UY = "⋋", ZY = "⋉", WY = "⥶", GY = "⩻", KY = "◃", XY = "⊴", YY = "◂", JY = "⦖", QY = "⥊", eJ = "⥦", tJ = "≨︀", nJ = "≨︀", rJ = "¯", oJ = "♂", sJ = "✠", iJ = "✠", aJ = "↦", cJ = "↦", lJ = "↧", uJ = "↤", dJ = "↥", fJ = "▮", pJ = "⨩", hJ = "М", gJ = "м", mJ = "—", vJ = "∺", _J = "∡", bJ = " ", yJ = "ℳ", wJ = "𝔐", kJ = "𝔪", CJ = "℧", xJ = "µ", SJ = "*", EJ = "⫰", AJ = "∣", $J = "·", MJ = "⊟", IJ = "−", TJ = "∸", LJ = "⨪", OJ = "∓", RJ = "⫛", PJ = "…", BJ = "∓", zJ = "⊧", DJ = "𝕄", NJ = "𝕞", qJ = "∓", FJ = "𝓂", jJ = "ℳ", HJ = "∾", VJ = "Μ", UJ = "μ", ZJ = "⊸", WJ = "⊸", GJ = "∇", KJ = "Ń", XJ = "ń", YJ = "∠⃒", JJ = "≉", QJ = "⩰̸", eQ = "≋̸", tQ = "ŉ", nQ = "≉", rQ = "♮", oQ = "ℕ", sQ = "♮", iQ = " ", aQ = "≎̸", cQ = "≏̸", lQ = "⩃", uQ = "Ň", dQ = "ň", fQ = "Ņ", pQ = "ņ", hQ = "≇", gQ = "⩭̸", mQ = "⩂", vQ = "Н", _Q = "н", bQ = "–", yQ = "⤤", wQ = "↗", kQ = "⇗", CQ = "↗", xQ = "≠", SQ = "≐̸", EQ = "​", AQ = "​", $Q = "​", MQ = "​", IQ = "≢", TQ = "⤨", LQ = "≂̸", OQ = "≫", RQ = "≪", PQ = `
`, BQ = "∄", zQ = "∄", DQ = "𝔑", NQ = "𝔫", qQ = "≧̸", FQ = "≱", jQ = "≱", HQ = "≧̸", VQ = "⩾̸", UQ = "⩾̸", ZQ = "⋙̸", WQ = "≵", GQ = "≫⃒", KQ = "≯", XQ = "≯", YQ = "≫̸", JQ = "↮", QQ = "⇎", eee = "⫲", tee = "∋", nee = "⋼", ree = "⋺", oee = "∋", see = "Њ", iee = "њ", aee = "↚", cee = "⇍", lee = "‥", uee = "≦̸", dee = "≰", fee = "↚", pee = "⇍", hee = "↮", gee = "⇎", mee = "≰", vee = "≦̸", _ee = "⩽̸", bee = "⩽̸", yee = "≮", wee = "⋘̸", kee = "≴", Cee = "≪⃒", xee = "≮", See = "⋪", Eee = "⋬", Aee = "≪̸", $ee = "∤", Mee = "⁠", Iee = " ", Tee = "𝕟", Lee = "ℕ", Oee = "⫬", Ree = "¬", Pee = "≢", Bee = "≭", zee = "∦", Dee = "∉", Nee = "≠", qee = "≂̸", Fee = "∄", jee = "≯", Hee = "≱", Vee = "≧̸", Uee = "≫̸", Zee = "≹", Wee = "⩾̸", Gee = "≵", Kee = "≎̸", Xee = "≏̸", Yee = "∉", Jee = "⋵̸", Qee = "⋹̸", ete = "∉", tte = "⋷", nte = "⋶", rte = "⧏̸", ote = "⋪", ste = "⋬", ite = "≮", ate = "≰", cte = "≸", lte = "≪̸", ute = "⩽̸", dte = "≴", fte = "⪢̸", pte = "⪡̸", hte = "∌", gte = "∌", mte = "⋾", vte = "⋽", _te = "⊀", bte = "⪯̸", yte = "⋠", wte = "∌", kte = "⧐̸", Cte = "⋫", xte = "⋭", Ste = "⊏̸", Ete = "⋢", Ate = "⊐̸", $te = "⋣", Mte = "⊂⃒", Ite = "⊈", Tte = "⊁", Lte = "⪰̸", Ote = "⋡", Rte = "≿̸", Pte = "⊃⃒", Bte = "⊉", zte = "≁", Dte = "≄", Nte = "≇", qte = "≉", Fte = "∤", jte = "∦", Hte = "∦", Vte = "⫽⃥", Ute = "∂̸", Zte = "⨔", Wte = "⊀", Gte = "⋠", Kte = "⊀", Xte = "⪯̸", Yte = "⪯̸", Jte = "⤳̸", Qte = "↛", ene = "⇏", tne = "↝̸", nne = "↛", rne = "⇏", one = "⋫", sne = "⋭", ine = "⊁", ane = "⋡", cne = "⪰̸", lne = "𝒩", une = "𝓃", dne = "∤", fne = "∦", pne = "≁", hne = "≄", gne = "≄", mne = "∤", vne = "∦", _ne = "⋢", bne = "⋣", yne = "⊄", wne = "⫅̸", kne = "⊈", Cne = "⊂⃒", xne = "⊈", Sne = "⫅̸", Ene = "⊁", Ane = "⪰̸", $ne = "⊅", Mne = "⫆̸", Ine = "⊉", Tne = "⊃⃒", Lne = "⊉", One = "⫆̸", Rne = "≹", Pne = "Ñ", Bne = "ñ", zne = "≸", Dne = "⋪", Nne = "⋬", qne = "⋫", Fne = "⋭", jne = "Ν", Hne = "ν", Vne = "#", Une = "№", Zne = " ", Wne = "≍⃒", Gne = "⊬", Kne = "⊭", Xne = "⊮", Yne = "⊯", Jne = "≥⃒", Qne = ">⃒", ere = "⤄", tre = "⧞", nre = "⤂", rre = "≤⃒", ore = "<⃒", sre = "⊴⃒", ire = "⤃", are = "⊵⃒", cre = "∼⃒", lre = "⤣", ure = "↖", dre = "⇖", fre = "↖", pre = "⤧", hre = "Ó", gre = "ó", mre = "⊛", vre = "Ô", _re = "ô", bre = "⊚", yre = "О", wre = "о", kre = "⊝", Cre = "Ő", xre = "ő", Sre = "⨸", Ere = "⊙", Are = "⦼", $re = "Œ", Mre = "œ", Ire = "⦿", Tre = "𝔒", Lre = "𝔬", Ore = "˛", Rre = "Ò", Pre = "ò", Bre = "⧁", zre = "⦵", Dre = "Ω", Nre = "∮", qre = "↺", Fre = "⦾", jre = "⦻", Hre = "‾", Vre = "⧀", Ure = "Ō", Zre = "ō", Wre = "Ω", Gre = "ω", Kre = "Ο", Xre = "ο", Yre = "⦶", Jre = "⊖", Qre = "𝕆", eoe = "𝕠", toe = "⦷", noe = "“", roe = "‘", ooe = "⦹", soe = "⊕", ioe = "↻", aoe = "⩔", coe = "∨", loe = "⩝", uoe = "ℴ", doe = "ℴ", foe = "ª", poe = "º", hoe = "⊶", goe = "⩖", moe = "⩗", voe = "⩛", _oe = "Ⓢ", boe = "𝒪", yoe = "ℴ", woe = "Ø", koe = "ø", Coe = "⊘", xoe = "Õ", Soe = "õ", Eoe = "⨶", Aoe = "⨷", $oe = "⊗", Moe = "Ö", Ioe = "ö", Toe = "⌽", Loe = "‾", Ooe = "⏞", Roe = "⎴", Poe = "⏜", Boe = "¶", zoe = "∥", Doe = "∥", Noe = "⫳", qoe = "⫽", Foe = "∂", joe = "∂", Hoe = "П", Voe = "п", Uoe = "%", Zoe = ".", Woe = "‰", Goe = "⊥", Koe = "‱", Xoe = "𝔓", Yoe = "𝔭", Joe = "Φ", Qoe = "φ", ese = "ϕ", tse = "ℳ", nse = "☎", rse = "Π", ose = "π", sse = "⋔", ise = "ϖ", ase = "ℏ", cse = "ℎ", lse = "ℏ", use = "⨣", dse = "⊞", fse = "⨢", pse = "+", hse = "∔", gse = "⨥", mse = "⩲", vse = "±", _se = "±", bse = "⨦", yse = "⨧", wse = "±", kse = "ℌ", Cse = "⨕", xse = "𝕡", Sse = "ℙ", Ese = "£", Ase = "⪷", $se = "⪻", Mse = "≺", Ise = "≼", Tse = "⪷", Lse = "≺", Ose = "≼", Rse = "≺", Pse = "⪯", Bse = "≼", zse = "≾", Dse = "⪯", Nse = "⪹", qse = "⪵", Fse = "⋨", jse = "⪯", Hse = "⪳", Vse = "≾", Use = "′", Zse = "″", Wse = "ℙ", Gse = "⪹", Kse = "⪵", Xse = "⋨", Yse = "∏", Jse = "∏", Qse = "⌮", eie = "⌒", tie = "⌓", nie = "∝", rie = "∝", oie = "∷", sie = "∝", iie = "≾", aie = "⊰", cie = "𝒫", lie = "𝓅", uie = "Ψ", die = "ψ", fie = " ", pie = "𝔔", hie = "𝔮", gie = "⨌", mie = "𝕢", vie = "ℚ", _ie = "⁗", bie = "𝒬", yie = "𝓆", wie = "ℍ", kie = "⨖", Cie = "?", xie = "≟", Sie = '"', Eie = '"', Aie = "⇛", $ie = "∽̱", Mie = "Ŕ", Iie = "ŕ", Tie = "√", Lie = "⦳", Oie = "⟩", Rie = "⟫", Pie = "⦒", Bie = "⦥", zie = "⟩", Die = "»", Nie = "⥵", qie = "⇥", Fie = "⤠", jie = "⤳", Hie = "→", Vie = "↠", Uie = "⇒", Zie = "⤞", Wie = "↪", Gie = "↬", Kie = "⥅", Xie = "⥴", Yie = "⤖", Jie = "↣", Qie = "↝", eae = "⤚", tae = "⤜", nae = "∶", rae = "ℚ", oae = "⤍", sae = "⤏", iae = "⤐", aae = "❳", cae = "}", lae = "]", uae = "⦌", dae = "⦎", fae = "⦐", pae = "Ř", hae = "ř", gae = "Ŗ", mae = "ŗ", vae = "⌉", _ae = "}", bae = "Р", yae = "р", wae = "⤷", kae = "⥩", Cae = "”", xae = "”", Sae = "↳", Eae = "ℜ", Aae = "ℛ", $ae = "ℜ", Mae = "ℝ", Iae = "ℜ", Tae = "▭", Lae = "®", Oae = "®", Rae = "∋", Pae = "⇋", Bae = "⥯", zae = "⥽", Dae = "⌋", Nae = "𝔯", qae = "ℜ", Fae = "⥤", jae = "⇁", Hae = "⇀", Vae = "⥬", Uae = "Ρ", Zae = "ρ", Wae = "ϱ", Gae = "⟩", Kae = "⇥", Xae = "→", Yae = "→", Jae = "⇒", Qae = "⇄", ece = "↣", tce = "⌉", nce = "⟧", rce = "⥝", oce = "⥕", sce = "⇂", ice = "⌋", ace = "⇁", cce = "⇀", lce = "⇄", uce = "⇌", dce = "⇉", fce = "↝", pce = "↦", hce = "⊢", gce = "⥛", mce = "⋌", vce = "⧐", _ce = "⊳", bce = "⊵", yce = "⥏", wce = "⥜", kce = "⥔", Cce = "↾", xce = "⥓", Sce = "⇀", Ece = "˚", Ace = "≓", $ce = "⇄", Mce = "⇌", Ice = "‏", Tce = "⎱", Lce = "⎱", Oce = "⫮", Rce = "⟭", Pce = "⇾", Bce = "⟧", zce = "⦆", Dce = "𝕣", Nce = "ℝ", qce = "⨮", Fce = "⨵", jce = "⥰", Hce = ")", Vce = "⦔", Uce = "⨒", Zce = "⇉", Wce = "⇛", Gce = "›", Kce = "𝓇", Xce = "ℛ", Yce = "↱", Jce = "↱", Qce = "]", ele = "’", tle = "’", nle = "⋌", rle = "⋊", ole = "▹", sle = "⊵", ile = "▸", ale = "⧎", cle = "⧴", lle = "⥨", ule = "℞", dle = "Ś", fle = "ś", ple = "‚", hle = "⪸", gle = "Š", mle = "š", vle = "⪼", _le = "≻", ble = "≽", yle = "⪰", wle = "⪴", kle = "Ş", Cle = "ş", xle = "Ŝ", Sle = "ŝ", Ele = "⪺", Ale = "⪶", $le = "⋩", Mle = "⨓", Ile = "≿", Tle = "С", Lle = "с", Ole = "⊡", Rle = "⋅", Ple = "⩦", Ble = "⤥", zle = "↘", Dle = "⇘", Nle = "↘", qle = "§", Fle = ";", jle = "⤩", Hle = "∖", Vle = "∖", Ule = "✶", Zle = "𝔖", Wle = "𝔰", Gle = "⌢", Kle = "♯", Xle = "Щ", Yle = "щ", Jle = "Ш", Qle = "ш", eue = "↓", tue = "←", nue = "∣", rue = "∥", oue = "→", sue = "↑", iue = "­", aue = "Σ", cue = "σ", lue = "ς", uue = "ς", due = "∼", fue = "⩪", pue = "≃", hue = "≃", gue = "⪞", mue = "⪠", vue = "⪝", _ue = "⪟", bue = "≆", yue = "⨤", wue = "⥲", kue = "←", Cue = "∘", xue = "∖", Sue = "⨳", Eue = "⧤", Aue = "∣", $ue = "⌣", Mue = "⪪", Iue = "⪬", Tue = "⪬︀", Lue = "Ь", Oue = "ь", Rue = "⌿", Pue = "⧄", Bue = "/", zue = "𝕊", Due = "𝕤", Nue = "♠", que = "♠", Fue = "∥", jue = "⊓", Hue = "⊓︀", Vue = "⊔", Uue = "⊔︀", Zue = "√", Wue = "⊏", Gue = "⊑", Kue = "⊏", Xue = "⊑", Yue = "⊐", Jue = "⊒", Que = "⊐", ede = "⊒", tde = "□", nde = "□", rde = "⊓", ode = "⊏", sde = "⊑", ide = "⊐", ade = "⊒", cde = "⊔", lde = "▪", ude = "□", dde = "▪", fde = "→", pde = "𝒮", hde = "𝓈", gde = "∖", mde = "⌣", vde = "⋆", _de = "⋆", bde = "☆", yde = "★", wde = "ϵ", kde = "ϕ", Cde = "¯", xde = "⊂", Sde = "⋐", Ede = "⪽", Ade = "⫅", $de = "⊆", Mde = "⫃", Ide = "⫁", Tde = "⫋", Lde = "⊊", Ode = "⪿", Rde = "⥹", Pde = "⊂", Bde = "⋐", zde = "⊆", Dde = "⫅", Nde = "⊆", qde = "⊊", Fde = "⫋", jde = "⫇", Hde = "⫕", Vde = "⫓", Ude = "⪸", Zde = "≻", Wde = "≽", Gde = "≻", Kde = "⪰", Xde = "≽", Yde = "≿", Jde = "⪰", Qde = "⪺", efe = "⪶", tfe = "⋩", nfe = "≿", rfe = "∋", ofe = "∑", sfe = "∑", ife = "♪", afe = "¹", cfe = "²", lfe = "³", ufe = "⊃", dfe = "⋑", ffe = "⪾", pfe = "⫘", hfe = "⫆", gfe = "⊇", mfe = "⫄", vfe = "⊃", _fe = "⊇", bfe = "⟉", yfe = "⫗", wfe = "⥻", kfe = "⫂", Cfe = "⫌", xfe = "⊋", Sfe = "⫀", Efe = "⊃", Afe = "⋑", $fe = "⊇", Mfe = "⫆", Ife = "⊋", Tfe = "⫌", Lfe = "⫈", Ofe = "⫔", Rfe = "⫖", Pfe = "⤦", Bfe = "↙", zfe = "⇙", Dfe = "↙", Nfe = "⤪", qfe = "ß", Ffe = "	", jfe = "⌖", Hfe = "Τ", Vfe = "τ", Ufe = "⎴", Zfe = "Ť", Wfe = "ť", Gfe = "Ţ", Kfe = "ţ", Xfe = "Т", Yfe = "т", Jfe = "⃛", Qfe = "⌕", e0e = "𝔗", t0e = "𝔱", n0e = "∴", r0e = "∴", o0e = "∴", s0e = "Θ", i0e = "θ", a0e = "ϑ", c0e = "ϑ", l0e = "≈", u0e = "∼", d0e = "  ", f0e = " ", p0e = " ", h0e = "≈", g0e = "∼", m0e = "Þ", v0e = "þ", _0e = "˜", b0e = "∼", y0e = "≃", w0e = "≅", k0e = "≈", C0e = "⨱", x0e = "⊠", S0e = "×", E0e = "⨰", A0e = "∭", $0e = "⤨", M0e = "⌶", I0e = "⫱", T0e = "⊤", L0e = "𝕋", O0e = "𝕥", R0e = "⫚", P0e = "⤩", B0e = "‴", z0e = "™", D0e = "™", N0e = "▵", q0e = "▿", F0e = "◃", j0e = "⊴", H0e = "≜", V0e = "▹", U0e = "⊵", Z0e = "◬", W0e = "≜", G0e = "⨺", K0e = "⃛", X0e = "⨹", Y0e = "⧍", J0e = "⨻", Q0e = "⏢", epe = "𝒯", tpe = "𝓉", npe = "Ц", rpe = "ц", ope = "Ћ", spe = "ћ", ipe = "Ŧ", ape = "ŧ", cpe = "≬", lpe = "↞", upe = "↠", dpe = "Ú", fpe = "ú", ppe = "↑", hpe = "↟", gpe = "⇑", mpe = "⥉", vpe = "Ў", _pe = "ў", bpe = "Ŭ", ype = "ŭ", wpe = "Û", kpe = "û", Cpe = "У", xpe = "у", Spe = "⇅", Epe = "Ű", Ape = "ű", $pe = "⥮", Mpe = "⥾", Ipe = "𝔘", Tpe = "𝔲", Lpe = "Ù", Ope = "ù", Rpe = "⥣", Ppe = "↿", Bpe = "↾", zpe = "▀", Dpe = "⌜", Npe = "⌜", qpe = "⌏", Fpe = "◸", jpe = "Ū", Hpe = "ū", Vpe = "¨", Upe = "_", Zpe = "⏟", Wpe = "⎵", Gpe = "⏝", Kpe = "⋃", Xpe = "⊎", Ype = "Ų", Jpe = "ų", Qpe = "𝕌", ehe = "𝕦", the = "⤒", nhe = "↑", rhe = "↑", ohe = "⇑", she = "⇅", ihe = "↕", ahe = "↕", che = "⇕", lhe = "⥮", uhe = "↿", dhe = "↾", fhe = "⊎", phe = "↖", hhe = "↗", ghe = "υ", mhe = "ϒ", vhe = "ϒ", _he = "Υ", bhe = "υ", yhe = "↥", whe = "⊥", khe = "⇈", Che = "⌝", xhe = "⌝", She = "⌎", Ehe = "Ů", Ahe = "ů", $he = "◹", Mhe = "𝒰", Ihe = "𝓊", The = "⋰", Lhe = "Ũ", Ohe = "ũ", Rhe = "▵", Phe = "▴", Bhe = "⇈", zhe = "Ü", Dhe = "ü", Nhe = "⦧", qhe = "⦜", Fhe = "ϵ", jhe = "ϰ", Hhe = "∅", Vhe = "ϕ", Uhe = "ϖ", Zhe = "∝", Whe = "↕", Ghe = "⇕", Khe = "ϱ", Xhe = "ς", Yhe = "⊊︀", Jhe = "⫋︀", Qhe = "⊋︀", e2e = "⫌︀", t2e = "ϑ", n2e = "⊲", r2e = "⊳", o2e = "⫨", s2e = "⫫", i2e = "⫩", a2e = "В", c2e = "в", l2e = "⊢", u2e = "⊨", d2e = "⊩", f2e = "⊫", p2e = "⫦", h2e = "⊻", g2e = "∨", m2e = "⋁", v2e = "≚", _2e = "⋮", b2e = "|", y2e = "‖", w2e = "|", k2e = "‖", C2e = "∣", x2e = "|", S2e = "❘", E2e = "≀", A2e = " ", $2e = "𝔙", M2e = "𝔳", I2e = "⊲", T2e = "⊂⃒", L2e = "⊃⃒", O2e = "𝕍", R2e = "𝕧", P2e = "∝", B2e = "⊳", z2e = "𝒱", D2e = "𝓋", N2e = "⫋︀", q2e = "⊊︀", F2e = "⫌︀", j2e = "⊋︀", H2e = "⊪", V2e = "⦚", U2e = "Ŵ", Z2e = "ŵ", W2e = "⩟", G2e = "∧", K2e = "⋀", X2e = "≙", Y2e = "℘", J2e = "𝔚", Q2e = "𝔴", e1e = "𝕎", t1e = "𝕨", n1e = "℘", r1e = "≀", o1e = "≀", s1e = "𝒲", i1e = "𝓌", a1e = "⋂", c1e = "◯", l1e = "⋃", u1e = "▽", d1e = "𝔛", f1e = "𝔵", p1e = "⟷", h1e = "⟺", g1e = "Ξ", m1e = "ξ", v1e = "⟵", _1e = "⟸", b1e = "⟼", y1e = "⋻", w1e = "⨀", k1e = "𝕏", C1e = "𝕩", x1e = "⨁", S1e = "⨂", E1e = "⟶", A1e = "⟹", $1e = "𝒳", M1e = "𝓍", I1e = "⨆", T1e = "⨄", L1e = "△", O1e = "⋁", R1e = "⋀", P1e = "Ý", B1e = "ý", z1e = "Я", D1e = "я", N1e = "Ŷ", q1e = "ŷ", F1e = "Ы", j1e = "ы", H1e = "¥", V1e = "𝔜", U1e = "𝔶", Z1e = "Ї", W1e = "ї", G1e = "𝕐", K1e = "𝕪", X1e = "𝒴", Y1e = "𝓎", J1e = "Ю", Q1e = "ю", ege = "ÿ", tge = "Ÿ", nge = "Ź", rge = "ź", oge = "Ž", sge = "ž", ige = "З", age = "з", cge = "Ż", lge = "ż", uge = "ℨ", dge = "​", fge = "Ζ", pge = "ζ", hge = "𝔷", gge = "ℨ", mge = "Ж", vge = "ж", _ge = "⇝", bge = "𝕫", yge = "ℤ", wge = "𝒵", kge = "𝓏", Cge = "‍", xge = "‌", Sge = {
  Aacute: cO,
  aacute: lO,
  Abreve: uO,
  abreve: dO,
  ac: fO,
  acd: pO,
  acE: hO,
  Acirc: gO,
  acirc: mO,
  acute: vO,
  Acy: _O,
  acy: bO,
  AElig: yO,
  aelig: wO,
  af: kO,
  Afr: CO,
  afr: xO,
  Agrave: SO,
  agrave: EO,
  alefsym: AO,
  aleph: $O,
  Alpha: MO,
  alpha: IO,
  Amacr: TO,
  amacr: LO,
  amalg: OO,
  amp: RO,
  AMP: PO,
  andand: BO,
  And: zO,
  and: DO,
  andd: NO,
  andslope: qO,
  andv: FO,
  ang: jO,
  ange: HO,
  angle: VO,
  angmsdaa: UO,
  angmsdab: ZO,
  angmsdac: WO,
  angmsdad: GO,
  angmsdae: KO,
  angmsdaf: XO,
  angmsdag: YO,
  angmsdah: JO,
  angmsd: QO,
  angrt: eR,
  angrtvb: tR,
  angrtvbd: nR,
  angsph: rR,
  angst: oR,
  angzarr: sR,
  Aogon: iR,
  aogon: aR,
  Aopf: cR,
  aopf: lR,
  apacir: uR,
  ap: dR,
  apE: fR,
  ape: pR,
  apid: hR,
  apos: gR,
  ApplyFunction: mR,
  approx: vR,
  approxeq: _R,
  Aring: bR,
  aring: yR,
  Ascr: wR,
  ascr: kR,
  Assign: CR,
  ast: xR,
  asymp: SR,
  asympeq: ER,
  Atilde: AR,
  atilde: $R,
  Auml: MR,
  auml: IR,
  awconint: TR,
  awint: LR,
  backcong: OR,
  backepsilon: RR,
  backprime: PR,
  backsim: BR,
  backsimeq: zR,
  Backslash: DR,
  Barv: NR,
  barvee: qR,
  barwed: FR,
  Barwed: jR,
  barwedge: HR,
  bbrk: VR,
  bbrktbrk: UR,
  bcong: ZR,
  Bcy: WR,
  bcy: GR,
  bdquo: KR,
  becaus: XR,
  because: YR,
  Because: JR,
  bemptyv: QR,
  bepsi: eP,
  bernou: tP,
  Bernoullis: nP,
  Beta: rP,
  beta: oP,
  beth: sP,
  between: iP,
  Bfr: aP,
  bfr: cP,
  bigcap: lP,
  bigcirc: uP,
  bigcup: dP,
  bigodot: fP,
  bigoplus: pP,
  bigotimes: hP,
  bigsqcup: gP,
  bigstar: mP,
  bigtriangledown: vP,
  bigtriangleup: _P,
  biguplus: bP,
  bigvee: yP,
  bigwedge: wP,
  bkarow: kP,
  blacklozenge: CP,
  blacksquare: xP,
  blacktriangle: SP,
  blacktriangledown: EP,
  blacktriangleleft: AP,
  blacktriangleright: $P,
  blank: MP,
  blk12: IP,
  blk14: TP,
  blk34: LP,
  block: OP,
  bne: RP,
  bnequiv: PP,
  bNot: BP,
  bnot: zP,
  Bopf: DP,
  bopf: NP,
  bot: qP,
  bottom: FP,
  bowtie: jP,
  boxbox: HP,
  boxdl: VP,
  boxdL: UP,
  boxDl: ZP,
  boxDL: WP,
  boxdr: GP,
  boxdR: KP,
  boxDr: XP,
  boxDR: YP,
  boxh: JP,
  boxH: QP,
  boxhd: eB,
  boxHd: tB,
  boxhD: nB,
  boxHD: rB,
  boxhu: oB,
  boxHu: sB,
  boxhU: iB,
  boxHU: aB,
  boxminus: cB,
  boxplus: lB,
  boxtimes: uB,
  boxul: dB,
  boxuL: fB,
  boxUl: pB,
  boxUL: hB,
  boxur: gB,
  boxuR: mB,
  boxUr: vB,
  boxUR: _B,
  boxv: bB,
  boxV: yB,
  boxvh: wB,
  boxvH: kB,
  boxVh: CB,
  boxVH: xB,
  boxvl: SB,
  boxvL: EB,
  boxVl: AB,
  boxVL: $B,
  boxvr: MB,
  boxvR: IB,
  boxVr: TB,
  boxVR: LB,
  bprime: OB,
  breve: RB,
  Breve: PB,
  brvbar: BB,
  bscr: zB,
  Bscr: DB,
  bsemi: NB,
  bsim: qB,
  bsime: FB,
  bsolb: jB,
  bsol: HB,
  bsolhsub: VB,
  bull: UB,
  bullet: ZB,
  bump: WB,
  bumpE: GB,
  bumpe: KB,
  Bumpeq: XB,
  bumpeq: YB,
  Cacute: JB,
  cacute: QB,
  capand: ez,
  capbrcup: tz,
  capcap: nz,
  cap: rz,
  Cap: oz,
  capcup: sz,
  capdot: iz,
  CapitalDifferentialD: az,
  caps: cz,
  caret: lz,
  caron: uz,
  Cayleys: dz,
  ccaps: fz,
  Ccaron: pz,
  ccaron: hz,
  Ccedil: gz,
  ccedil: mz,
  Ccirc: vz,
  ccirc: _z,
  Cconint: bz,
  ccups: yz,
  ccupssm: wz,
  Cdot: kz,
  cdot: Cz,
  cedil: xz,
  Cedilla: Sz,
  cemptyv: Ez,
  cent: Az,
  centerdot: $z,
  CenterDot: Mz,
  cfr: Iz,
  Cfr: Tz,
  CHcy: Lz,
  chcy: Oz,
  check: Rz,
  checkmark: Pz,
  Chi: Bz,
  chi: zz,
  circ: Dz,
  circeq: Nz,
  circlearrowleft: qz,
  circlearrowright: Fz,
  circledast: jz,
  circledcirc: Hz,
  circleddash: Vz,
  CircleDot: Uz,
  circledR: Zz,
  circledS: Wz,
  CircleMinus: Gz,
  CirclePlus: Kz,
  CircleTimes: Xz,
  cir: Yz,
  cirE: Jz,
  cire: Qz,
  cirfnint: eD,
  cirmid: tD,
  cirscir: nD,
  ClockwiseContourIntegral: rD,
  CloseCurlyDoubleQuote: oD,
  CloseCurlyQuote: sD,
  clubs: iD,
  clubsuit: aD,
  colon: cD,
  Colon: lD,
  Colone: uD,
  colone: dD,
  coloneq: fD,
  comma: pD,
  commat: hD,
  comp: gD,
  compfn: mD,
  complement: vD,
  complexes: _D,
  cong: bD,
  congdot: yD,
  Congruent: wD,
  conint: kD,
  Conint: CD,
  ContourIntegral: xD,
  copf: SD,
  Copf: ED,
  coprod: AD,
  Coproduct: $D,
  copy: MD,
  COPY: ID,
  copysr: TD,
  CounterClockwiseContourIntegral: LD,
  crarr: OD,
  cross: RD,
  Cross: PD,
  Cscr: BD,
  cscr: zD,
  csub: DD,
  csube: ND,
  csup: qD,
  csupe: FD,
  ctdot: jD,
  cudarrl: HD,
  cudarrr: VD,
  cuepr: UD,
  cuesc: ZD,
  cularr: WD,
  cularrp: GD,
  cupbrcap: KD,
  cupcap: XD,
  CupCap: YD,
  cup: JD,
  Cup: QD,
  cupcup: eN,
  cupdot: tN,
  cupor: nN,
  cups: rN,
  curarr: oN,
  curarrm: sN,
  curlyeqprec: iN,
  curlyeqsucc: aN,
  curlyvee: cN,
  curlywedge: lN,
  curren: uN,
  curvearrowleft: dN,
  curvearrowright: fN,
  cuvee: pN,
  cuwed: hN,
  cwconint: gN,
  cwint: mN,
  cylcty: vN,
  dagger: _N,
  Dagger: bN,
  daleth: yN,
  darr: wN,
  Darr: kN,
  dArr: CN,
  dash: xN,
  Dashv: SN,
  dashv: EN,
  dbkarow: AN,
  dblac: $N,
  Dcaron: MN,
  dcaron: IN,
  Dcy: TN,
  dcy: LN,
  ddagger: ON,
  ddarr: RN,
  DD: PN,
  dd: BN,
  DDotrahd: zN,
  ddotseq: DN,
  deg: NN,
  Del: qN,
  Delta: FN,
  delta: jN,
  demptyv: HN,
  dfisht: VN,
  Dfr: UN,
  dfr: ZN,
  dHar: WN,
  dharl: GN,
  dharr: KN,
  DiacriticalAcute: XN,
  DiacriticalDot: YN,
  DiacriticalDoubleAcute: JN,
  DiacriticalGrave: QN,
  DiacriticalTilde: eq,
  diam: tq,
  diamond: nq,
  Diamond: rq,
  diamondsuit: oq,
  diams: sq,
  die: iq,
  DifferentialD: aq,
  digamma: cq,
  disin: lq,
  div: uq,
  divide: dq,
  divideontimes: fq,
  divonx: pq,
  DJcy: hq,
  djcy: gq,
  dlcorn: mq,
  dlcrop: vq,
  dollar: _q,
  Dopf: bq,
  dopf: yq,
  Dot: wq,
  dot: kq,
  DotDot: Cq,
  doteq: xq,
  doteqdot: Sq,
  DotEqual: Eq,
  dotminus: Aq,
  dotplus: $q,
  dotsquare: Mq,
  doublebarwedge: Iq,
  DoubleContourIntegral: Tq,
  DoubleDot: Lq,
  DoubleDownArrow: Oq,
  DoubleLeftArrow: Rq,
  DoubleLeftRightArrow: Pq,
  DoubleLeftTee: Bq,
  DoubleLongLeftArrow: zq,
  DoubleLongLeftRightArrow: Dq,
  DoubleLongRightArrow: Nq,
  DoubleRightArrow: qq,
  DoubleRightTee: Fq,
  DoubleUpArrow: jq,
  DoubleUpDownArrow: Hq,
  DoubleVerticalBar: Vq,
  DownArrowBar: Uq,
  downarrow: Zq,
  DownArrow: Wq,
  Downarrow: Gq,
  DownArrowUpArrow: Kq,
  DownBreve: Xq,
  downdownarrows: Yq,
  downharpoonleft: Jq,
  downharpoonright: Qq,
  DownLeftRightVector: eF,
  DownLeftTeeVector: tF,
  DownLeftVectorBar: nF,
  DownLeftVector: rF,
  DownRightTeeVector: oF,
  DownRightVectorBar: sF,
  DownRightVector: iF,
  DownTeeArrow: aF,
  DownTee: cF,
  drbkarow: lF,
  drcorn: uF,
  drcrop: dF,
  Dscr: fF,
  dscr: pF,
  DScy: hF,
  dscy: gF,
  dsol: mF,
  Dstrok: vF,
  dstrok: _F,
  dtdot: bF,
  dtri: yF,
  dtrif: wF,
  duarr: kF,
  duhar: CF,
  dwangle: xF,
  DZcy: SF,
  dzcy: EF,
  dzigrarr: AF,
  Eacute: $F,
  eacute: MF,
  easter: IF,
  Ecaron: TF,
  ecaron: LF,
  Ecirc: OF,
  ecirc: RF,
  ecir: PF,
  ecolon: BF,
  Ecy: zF,
  ecy: DF,
  eDDot: NF,
  Edot: qF,
  edot: FF,
  eDot: jF,
  ee: HF,
  efDot: VF,
  Efr: UF,
  efr: ZF,
  eg: WF,
  Egrave: GF,
  egrave: KF,
  egs: XF,
  egsdot: YF,
  el: JF,
  Element: QF,
  elinters: ej,
  ell: tj,
  els: nj,
  elsdot: rj,
  Emacr: oj,
  emacr: sj,
  empty: ij,
  emptyset: aj,
  EmptySmallSquare: cj,
  emptyv: lj,
  EmptyVerySmallSquare: uj,
  emsp13: dj,
  emsp14: fj,
  emsp: pj,
  ENG: hj,
  eng: gj,
  ensp: mj,
  Eogon: vj,
  eogon: _j,
  Eopf: bj,
  eopf: yj,
  epar: wj,
  eparsl: kj,
  eplus: Cj,
  epsi: xj,
  Epsilon: Sj,
  epsilon: Ej,
  epsiv: Aj,
  eqcirc: $j,
  eqcolon: Mj,
  eqsim: Ij,
  eqslantgtr: Tj,
  eqslantless: Lj,
  Equal: Oj,
  equals: Rj,
  EqualTilde: Pj,
  equest: Bj,
  Equilibrium: zj,
  equiv: Dj,
  equivDD: Nj,
  eqvparsl: qj,
  erarr: Fj,
  erDot: jj,
  escr: Hj,
  Escr: Vj,
  esdot: Uj,
  Esim: Zj,
  esim: Wj,
  Eta: Gj,
  eta: Kj,
  ETH: Xj,
  eth: Yj,
  Euml: Jj,
  euml: Qj,
  euro: eH,
  excl: tH,
  exist: nH,
  Exists: rH,
  expectation: oH,
  exponentiale: sH,
  ExponentialE: iH,
  fallingdotseq: aH,
  Fcy: cH,
  fcy: lH,
  female: uH,
  ffilig: dH,
  fflig: fH,
  ffllig: pH,
  Ffr: hH,
  ffr: gH,
  filig: mH,
  FilledSmallSquare: vH,
  FilledVerySmallSquare: _H,
  fjlig: bH,
  flat: yH,
  fllig: wH,
  fltns: kH,
  fnof: CH,
  Fopf: xH,
  fopf: SH,
  forall: EH,
  ForAll: AH,
  fork: $H,
  forkv: MH,
  Fouriertrf: IH,
  fpartint: TH,
  frac12: LH,
  frac13: OH,
  frac14: RH,
  frac15: PH,
  frac16: BH,
  frac18: zH,
  frac23: DH,
  frac25: NH,
  frac34: qH,
  frac35: FH,
  frac38: jH,
  frac45: HH,
  frac56: VH,
  frac58: UH,
  frac78: ZH,
  frasl: WH,
  frown: GH,
  fscr: KH,
  Fscr: XH,
  gacute: YH,
  Gamma: JH,
  gamma: QH,
  Gammad: eV,
  gammad: tV,
  gap: nV,
  Gbreve: rV,
  gbreve: oV,
  Gcedil: sV,
  Gcirc: iV,
  gcirc: aV,
  Gcy: cV,
  gcy: lV,
  Gdot: uV,
  gdot: dV,
  ge: fV,
  gE: pV,
  gEl: hV,
  gel: gV,
  geq: mV,
  geqq: vV,
  geqslant: _V,
  gescc: bV,
  ges: yV,
  gesdot: wV,
  gesdoto: kV,
  gesdotol: CV,
  gesl: xV,
  gesles: SV,
  Gfr: EV,
  gfr: AV,
  gg: $V,
  Gg: MV,
  ggg: IV,
  gimel: TV,
  GJcy: LV,
  gjcy: OV,
  gla: RV,
  gl: PV,
  glE: BV,
  glj: zV,
  gnap: DV,
  gnapprox: NV,
  gne: qV,
  gnE: FV,
  gneq: jV,
  gneqq: HV,
  gnsim: VV,
  Gopf: UV,
  gopf: ZV,
  grave: WV,
  GreaterEqual: GV,
  GreaterEqualLess: KV,
  GreaterFullEqual: XV,
  GreaterGreater: YV,
  GreaterLess: JV,
  GreaterSlantEqual: QV,
  GreaterTilde: eU,
  Gscr: tU,
  gscr: nU,
  gsim: rU,
  gsime: oU,
  gsiml: sU,
  gtcc: iU,
  gtcir: aU,
  gt: cU,
  GT: lU,
  Gt: uU,
  gtdot: dU,
  gtlPar: fU,
  gtquest: pU,
  gtrapprox: hU,
  gtrarr: gU,
  gtrdot: mU,
  gtreqless: vU,
  gtreqqless: _U,
  gtrless: bU,
  gtrsim: yU,
  gvertneqq: wU,
  gvnE: kU,
  Hacek: CU,
  hairsp: xU,
  half: SU,
  hamilt: EU,
  HARDcy: AU,
  hardcy: $U,
  harrcir: MU,
  harr: IU,
  hArr: TU,
  harrw: LU,
  Hat: OU,
  hbar: RU,
  Hcirc: PU,
  hcirc: BU,
  hearts: zU,
  heartsuit: DU,
  hellip: NU,
  hercon: qU,
  hfr: FU,
  Hfr: jU,
  HilbertSpace: HU,
  hksearow: VU,
  hkswarow: UU,
  hoarr: ZU,
  homtht: WU,
  hookleftarrow: GU,
  hookrightarrow: KU,
  hopf: XU,
  Hopf: YU,
  horbar: JU,
  HorizontalLine: QU,
  hscr: eZ,
  Hscr: tZ,
  hslash: nZ,
  Hstrok: rZ,
  hstrok: oZ,
  HumpDownHump: sZ,
  HumpEqual: iZ,
  hybull: aZ,
  hyphen: cZ,
  Iacute: lZ,
  iacute: uZ,
  ic: dZ,
  Icirc: fZ,
  icirc: pZ,
  Icy: hZ,
  icy: gZ,
  Idot: mZ,
  IEcy: vZ,
  iecy: _Z,
  iexcl: bZ,
  iff: yZ,
  ifr: wZ,
  Ifr: kZ,
  Igrave: CZ,
  igrave: xZ,
  ii: SZ,
  iiiint: EZ,
  iiint: AZ,
  iinfin: $Z,
  iiota: MZ,
  IJlig: IZ,
  ijlig: TZ,
  Imacr: LZ,
  imacr: OZ,
  image: RZ,
  ImaginaryI: PZ,
  imagline: BZ,
  imagpart: zZ,
  imath: DZ,
  Im: NZ,
  imof: qZ,
  imped: FZ,
  Implies: jZ,
  incare: HZ,
  in: "∈",
  infin: VZ,
  infintie: UZ,
  inodot: ZZ,
  intcal: WZ,
  int: GZ,
  Int: KZ,
  integers: XZ,
  Integral: YZ,
  intercal: JZ,
  Intersection: QZ,
  intlarhk: eW,
  intprod: tW,
  InvisibleComma: nW,
  InvisibleTimes: rW,
  IOcy: oW,
  iocy: sW,
  Iogon: iW,
  iogon: aW,
  Iopf: cW,
  iopf: lW,
  Iota: uW,
  iota: dW,
  iprod: fW,
  iquest: pW,
  iscr: hW,
  Iscr: gW,
  isin: mW,
  isindot: vW,
  isinE: _W,
  isins: bW,
  isinsv: yW,
  isinv: wW,
  it: kW,
  Itilde: CW,
  itilde: xW,
  Iukcy: SW,
  iukcy: EW,
  Iuml: AW,
  iuml: $W,
  Jcirc: MW,
  jcirc: IW,
  Jcy: TW,
  jcy: LW,
  Jfr: OW,
  jfr: RW,
  jmath: PW,
  Jopf: BW,
  jopf: zW,
  Jscr: DW,
  jscr: NW,
  Jsercy: qW,
  jsercy: FW,
  Jukcy: jW,
  jukcy: HW,
  Kappa: VW,
  kappa: UW,
  kappav: ZW,
  Kcedil: WW,
  kcedil: GW,
  Kcy: KW,
  kcy: XW,
  Kfr: YW,
  kfr: JW,
  kgreen: QW,
  KHcy: eG,
  khcy: tG,
  KJcy: nG,
  kjcy: rG,
  Kopf: oG,
  kopf: sG,
  Kscr: iG,
  kscr: aG,
  lAarr: cG,
  Lacute: lG,
  lacute: uG,
  laemptyv: dG,
  lagran: fG,
  Lambda: pG,
  lambda: hG,
  lang: gG,
  Lang: mG,
  langd: vG,
  langle: _G,
  lap: bG,
  Laplacetrf: yG,
  laquo: wG,
  larrb: kG,
  larrbfs: CG,
  larr: xG,
  Larr: SG,
  lArr: EG,
  larrfs: AG,
  larrhk: $G,
  larrlp: MG,
  larrpl: IG,
  larrsim: TG,
  larrtl: LG,
  latail: OG,
  lAtail: RG,
  lat: PG,
  late: BG,
  lates: zG,
  lbarr: DG,
  lBarr: NG,
  lbbrk: qG,
  lbrace: FG,
  lbrack: jG,
  lbrke: HG,
  lbrksld: VG,
  lbrkslu: UG,
  Lcaron: ZG,
  lcaron: WG,
  Lcedil: GG,
  lcedil: KG,
  lceil: XG,
  lcub: YG,
  Lcy: JG,
  lcy: QG,
  ldca: eK,
  ldquo: tK,
  ldquor: nK,
  ldrdhar: rK,
  ldrushar: oK,
  ldsh: sK,
  le: iK,
  lE: aK,
  LeftAngleBracket: cK,
  LeftArrowBar: lK,
  leftarrow: uK,
  LeftArrow: dK,
  Leftarrow: fK,
  LeftArrowRightArrow: pK,
  leftarrowtail: hK,
  LeftCeiling: gK,
  LeftDoubleBracket: mK,
  LeftDownTeeVector: vK,
  LeftDownVectorBar: _K,
  LeftDownVector: bK,
  LeftFloor: yK,
  leftharpoondown: wK,
  leftharpoonup: kK,
  leftleftarrows: CK,
  leftrightarrow: xK,
  LeftRightArrow: SK,
  Leftrightarrow: EK,
  leftrightarrows: AK,
  leftrightharpoons: $K,
  leftrightsquigarrow: MK,
  LeftRightVector: IK,
  LeftTeeArrow: TK,
  LeftTee: LK,
  LeftTeeVector: OK,
  leftthreetimes: RK,
  LeftTriangleBar: PK,
  LeftTriangle: BK,
  LeftTriangleEqual: zK,
  LeftUpDownVector: DK,
  LeftUpTeeVector: NK,
  LeftUpVectorBar: qK,
  LeftUpVector: FK,
  LeftVectorBar: jK,
  LeftVector: HK,
  lEg: VK,
  leg: UK,
  leq: ZK,
  leqq: WK,
  leqslant: GK,
  lescc: KK,
  les: XK,
  lesdot: YK,
  lesdoto: JK,
  lesdotor: QK,
  lesg: eX,
  lesges: tX,
  lessapprox: nX,
  lessdot: rX,
  lesseqgtr: oX,
  lesseqqgtr: sX,
  LessEqualGreater: iX,
  LessFullEqual: aX,
  LessGreater: cX,
  lessgtr: lX,
  LessLess: uX,
  lesssim: dX,
  LessSlantEqual: fX,
  LessTilde: pX,
  lfisht: hX,
  lfloor: gX,
  Lfr: mX,
  lfr: vX,
  lg: _X,
  lgE: bX,
  lHar: yX,
  lhard: wX,
  lharu: kX,
  lharul: CX,
  lhblk: xX,
  LJcy: SX,
  ljcy: EX,
  llarr: AX,
  ll: $X,
  Ll: MX,
  llcorner: IX,
  Lleftarrow: TX,
  llhard: LX,
  lltri: OX,
  Lmidot: RX,
  lmidot: PX,
  lmoustache: BX,
  lmoust: zX,
  lnap: DX,
  lnapprox: NX,
  lne: qX,
  lnE: FX,
  lneq: jX,
  lneqq: HX,
  lnsim: VX,
  loang: UX,
  loarr: ZX,
  lobrk: WX,
  longleftarrow: GX,
  LongLeftArrow: KX,
  Longleftarrow: XX,
  longleftrightarrow: YX,
  LongLeftRightArrow: JX,
  Longleftrightarrow: QX,
  longmapsto: eY,
  longrightarrow: tY,
  LongRightArrow: nY,
  Longrightarrow: rY,
  looparrowleft: oY,
  looparrowright: sY,
  lopar: iY,
  Lopf: aY,
  lopf: cY,
  loplus: lY,
  lotimes: uY,
  lowast: dY,
  lowbar: fY,
  LowerLeftArrow: pY,
  LowerRightArrow: hY,
  loz: gY,
  lozenge: mY,
  lozf: vY,
  lpar: _Y,
  lparlt: bY,
  lrarr: yY,
  lrcorner: wY,
  lrhar: kY,
  lrhard: CY,
  lrm: xY,
  lrtri: SY,
  lsaquo: EY,
  lscr: AY,
  Lscr: $Y,
  lsh: MY,
  Lsh: IY,
  lsim: TY,
  lsime: LY,
  lsimg: OY,
  lsqb: RY,
  lsquo: PY,
  lsquor: BY,
  Lstrok: zY,
  lstrok: DY,
  ltcc: NY,
  ltcir: qY,
  lt: FY,
  LT: jY,
  Lt: HY,
  ltdot: VY,
  lthree: UY,
  ltimes: ZY,
  ltlarr: WY,
  ltquest: GY,
  ltri: KY,
  ltrie: XY,
  ltrif: YY,
  ltrPar: JY,
  lurdshar: QY,
  luruhar: eJ,
  lvertneqq: tJ,
  lvnE: nJ,
  macr: rJ,
  male: oJ,
  malt: sJ,
  maltese: iJ,
  Map: "⤅",
  map: aJ,
  mapsto: cJ,
  mapstodown: lJ,
  mapstoleft: uJ,
  mapstoup: dJ,
  marker: fJ,
  mcomma: pJ,
  Mcy: hJ,
  mcy: gJ,
  mdash: mJ,
  mDDot: vJ,
  measuredangle: _J,
  MediumSpace: bJ,
  Mellintrf: yJ,
  Mfr: wJ,
  mfr: kJ,
  mho: CJ,
  micro: xJ,
  midast: SJ,
  midcir: EJ,
  mid: AJ,
  middot: $J,
  minusb: MJ,
  minus: IJ,
  minusd: TJ,
  minusdu: LJ,
  MinusPlus: OJ,
  mlcp: RJ,
  mldr: PJ,
  mnplus: BJ,
  models: zJ,
  Mopf: DJ,
  mopf: NJ,
  mp: qJ,
  mscr: FJ,
  Mscr: jJ,
  mstpos: HJ,
  Mu: VJ,
  mu: UJ,
  multimap: ZJ,
  mumap: WJ,
  nabla: GJ,
  Nacute: KJ,
  nacute: XJ,
  nang: YJ,
  nap: JJ,
  napE: QJ,
  napid: eQ,
  napos: tQ,
  napprox: nQ,
  natural: rQ,
  naturals: oQ,
  natur: sQ,
  nbsp: iQ,
  nbump: aQ,
  nbumpe: cQ,
  ncap: lQ,
  Ncaron: uQ,
  ncaron: dQ,
  Ncedil: fQ,
  ncedil: pQ,
  ncong: hQ,
  ncongdot: gQ,
  ncup: mQ,
  Ncy: vQ,
  ncy: _Q,
  ndash: bQ,
  nearhk: yQ,
  nearr: wQ,
  neArr: kQ,
  nearrow: CQ,
  ne: xQ,
  nedot: SQ,
  NegativeMediumSpace: EQ,
  NegativeThickSpace: AQ,
  NegativeThinSpace: $Q,
  NegativeVeryThinSpace: MQ,
  nequiv: IQ,
  nesear: TQ,
  nesim: LQ,
  NestedGreaterGreater: OQ,
  NestedLessLess: RQ,
  NewLine: PQ,
  nexist: BQ,
  nexists: zQ,
  Nfr: DQ,
  nfr: NQ,
  ngE: qQ,
  nge: FQ,
  ngeq: jQ,
  ngeqq: HQ,
  ngeqslant: VQ,
  nges: UQ,
  nGg: ZQ,
  ngsim: WQ,
  nGt: GQ,
  ngt: KQ,
  ngtr: XQ,
  nGtv: YQ,
  nharr: JQ,
  nhArr: QQ,
  nhpar: eee,
  ni: tee,
  nis: nee,
  nisd: ree,
  niv: oee,
  NJcy: see,
  njcy: iee,
  nlarr: aee,
  nlArr: cee,
  nldr: lee,
  nlE: uee,
  nle: dee,
  nleftarrow: fee,
  nLeftarrow: pee,
  nleftrightarrow: hee,
  nLeftrightarrow: gee,
  nleq: mee,
  nleqq: vee,
  nleqslant: _ee,
  nles: bee,
  nless: yee,
  nLl: wee,
  nlsim: kee,
  nLt: Cee,
  nlt: xee,
  nltri: See,
  nltrie: Eee,
  nLtv: Aee,
  nmid: $ee,
  NoBreak: Mee,
  NonBreakingSpace: Iee,
  nopf: Tee,
  Nopf: Lee,
  Not: Oee,
  not: Ree,
  NotCongruent: Pee,
  NotCupCap: Bee,
  NotDoubleVerticalBar: zee,
  NotElement: Dee,
  NotEqual: Nee,
  NotEqualTilde: qee,
  NotExists: Fee,
  NotGreater: jee,
  NotGreaterEqual: Hee,
  NotGreaterFullEqual: Vee,
  NotGreaterGreater: Uee,
  NotGreaterLess: Zee,
  NotGreaterSlantEqual: Wee,
  NotGreaterTilde: Gee,
  NotHumpDownHump: Kee,
  NotHumpEqual: Xee,
  notin: Yee,
  notindot: Jee,
  notinE: Qee,
  notinva: ete,
  notinvb: tte,
  notinvc: nte,
  NotLeftTriangleBar: rte,
  NotLeftTriangle: ote,
  NotLeftTriangleEqual: ste,
  NotLess: ite,
  NotLessEqual: ate,
  NotLessGreater: cte,
  NotLessLess: lte,
  NotLessSlantEqual: ute,
  NotLessTilde: dte,
  NotNestedGreaterGreater: fte,
  NotNestedLessLess: pte,
  notni: hte,
  notniva: gte,
  notnivb: mte,
  notnivc: vte,
  NotPrecedes: _te,
  NotPrecedesEqual: bte,
  NotPrecedesSlantEqual: yte,
  NotReverseElement: wte,
  NotRightTriangleBar: kte,
  NotRightTriangle: Cte,
  NotRightTriangleEqual: xte,
  NotSquareSubset: Ste,
  NotSquareSubsetEqual: Ete,
  NotSquareSuperset: Ate,
  NotSquareSupersetEqual: $te,
  NotSubset: Mte,
  NotSubsetEqual: Ite,
  NotSucceeds: Tte,
  NotSucceedsEqual: Lte,
  NotSucceedsSlantEqual: Ote,
  NotSucceedsTilde: Rte,
  NotSuperset: Pte,
  NotSupersetEqual: Bte,
  NotTilde: zte,
  NotTildeEqual: Dte,
  NotTildeFullEqual: Nte,
  NotTildeTilde: qte,
  NotVerticalBar: Fte,
  nparallel: jte,
  npar: Hte,
  nparsl: Vte,
  npart: Ute,
  npolint: Zte,
  npr: Wte,
  nprcue: Gte,
  nprec: Kte,
  npreceq: Xte,
  npre: Yte,
  nrarrc: Jte,
  nrarr: Qte,
  nrArr: ene,
  nrarrw: tne,
  nrightarrow: nne,
  nRightarrow: rne,
  nrtri: one,
  nrtrie: sne,
  nsc: ine,
  nsccue: ane,
  nsce: cne,
  Nscr: lne,
  nscr: une,
  nshortmid: dne,
  nshortparallel: fne,
  nsim: pne,
  nsime: hne,
  nsimeq: gne,
  nsmid: mne,
  nspar: vne,
  nsqsube: _ne,
  nsqsupe: bne,
  nsub: yne,
  nsubE: wne,
  nsube: kne,
  nsubset: Cne,
  nsubseteq: xne,
  nsubseteqq: Sne,
  nsucc: Ene,
  nsucceq: Ane,
  nsup: $ne,
  nsupE: Mne,
  nsupe: Ine,
  nsupset: Tne,
  nsupseteq: Lne,
  nsupseteqq: One,
  ntgl: Rne,
  Ntilde: Pne,
  ntilde: Bne,
  ntlg: zne,
  ntriangleleft: Dne,
  ntrianglelefteq: Nne,
  ntriangleright: qne,
  ntrianglerighteq: Fne,
  Nu: jne,
  nu: Hne,
  num: Vne,
  numero: Une,
  numsp: Zne,
  nvap: Wne,
  nvdash: Gne,
  nvDash: Kne,
  nVdash: Xne,
  nVDash: Yne,
  nvge: Jne,
  nvgt: Qne,
  nvHarr: ere,
  nvinfin: tre,
  nvlArr: nre,
  nvle: rre,
  nvlt: ore,
  nvltrie: sre,
  nvrArr: ire,
  nvrtrie: are,
  nvsim: cre,
  nwarhk: lre,
  nwarr: ure,
  nwArr: dre,
  nwarrow: fre,
  nwnear: pre,
  Oacute: hre,
  oacute: gre,
  oast: mre,
  Ocirc: vre,
  ocirc: _re,
  ocir: bre,
  Ocy: yre,
  ocy: wre,
  odash: kre,
  Odblac: Cre,
  odblac: xre,
  odiv: Sre,
  odot: Ere,
  odsold: Are,
  OElig: $re,
  oelig: Mre,
  ofcir: Ire,
  Ofr: Tre,
  ofr: Lre,
  ogon: Ore,
  Ograve: Rre,
  ograve: Pre,
  ogt: Bre,
  ohbar: zre,
  ohm: Dre,
  oint: Nre,
  olarr: qre,
  olcir: Fre,
  olcross: jre,
  oline: Hre,
  olt: Vre,
  Omacr: Ure,
  omacr: Zre,
  Omega: Wre,
  omega: Gre,
  Omicron: Kre,
  omicron: Xre,
  omid: Yre,
  ominus: Jre,
  Oopf: Qre,
  oopf: eoe,
  opar: toe,
  OpenCurlyDoubleQuote: noe,
  OpenCurlyQuote: roe,
  operp: ooe,
  oplus: soe,
  orarr: ioe,
  Or: aoe,
  or: coe,
  ord: loe,
  order: uoe,
  orderof: doe,
  ordf: foe,
  ordm: poe,
  origof: hoe,
  oror: goe,
  orslope: moe,
  orv: voe,
  oS: _oe,
  Oscr: boe,
  oscr: yoe,
  Oslash: woe,
  oslash: koe,
  osol: Coe,
  Otilde: xoe,
  otilde: Soe,
  otimesas: Eoe,
  Otimes: Aoe,
  otimes: $oe,
  Ouml: Moe,
  ouml: Ioe,
  ovbar: Toe,
  OverBar: Loe,
  OverBrace: Ooe,
  OverBracket: Roe,
  OverParenthesis: Poe,
  para: Boe,
  parallel: zoe,
  par: Doe,
  parsim: Noe,
  parsl: qoe,
  part: Foe,
  PartialD: joe,
  Pcy: Hoe,
  pcy: Voe,
  percnt: Uoe,
  period: Zoe,
  permil: Woe,
  perp: Goe,
  pertenk: Koe,
  Pfr: Xoe,
  pfr: Yoe,
  Phi: Joe,
  phi: Qoe,
  phiv: ese,
  phmmat: tse,
  phone: nse,
  Pi: rse,
  pi: ose,
  pitchfork: sse,
  piv: ise,
  planck: ase,
  planckh: cse,
  plankv: lse,
  plusacir: use,
  plusb: dse,
  pluscir: fse,
  plus: pse,
  plusdo: hse,
  plusdu: gse,
  pluse: mse,
  PlusMinus: vse,
  plusmn: _se,
  plussim: bse,
  plustwo: yse,
  pm: wse,
  Poincareplane: kse,
  pointint: Cse,
  popf: xse,
  Popf: Sse,
  pound: Ese,
  prap: Ase,
  Pr: $se,
  pr: Mse,
  prcue: Ise,
  precapprox: Tse,
  prec: Lse,
  preccurlyeq: Ose,
  Precedes: Rse,
  PrecedesEqual: Pse,
  PrecedesSlantEqual: Bse,
  PrecedesTilde: zse,
  preceq: Dse,
  precnapprox: Nse,
  precneqq: qse,
  precnsim: Fse,
  pre: jse,
  prE: Hse,
  precsim: Vse,
  prime: Use,
  Prime: Zse,
  primes: Wse,
  prnap: Gse,
  prnE: Kse,
  prnsim: Xse,
  prod: Yse,
  Product: Jse,
  profalar: Qse,
  profline: eie,
  profsurf: tie,
  prop: nie,
  Proportional: rie,
  Proportion: oie,
  propto: sie,
  prsim: iie,
  prurel: aie,
  Pscr: cie,
  pscr: lie,
  Psi: uie,
  psi: die,
  puncsp: fie,
  Qfr: pie,
  qfr: hie,
  qint: gie,
  qopf: mie,
  Qopf: vie,
  qprime: _ie,
  Qscr: bie,
  qscr: yie,
  quaternions: wie,
  quatint: kie,
  quest: Cie,
  questeq: xie,
  quot: Sie,
  QUOT: Eie,
  rAarr: Aie,
  race: $ie,
  Racute: Mie,
  racute: Iie,
  radic: Tie,
  raemptyv: Lie,
  rang: Oie,
  Rang: Rie,
  rangd: Pie,
  range: Bie,
  rangle: zie,
  raquo: Die,
  rarrap: Nie,
  rarrb: qie,
  rarrbfs: Fie,
  rarrc: jie,
  rarr: Hie,
  Rarr: Vie,
  rArr: Uie,
  rarrfs: Zie,
  rarrhk: Wie,
  rarrlp: Gie,
  rarrpl: Kie,
  rarrsim: Xie,
  Rarrtl: Yie,
  rarrtl: Jie,
  rarrw: Qie,
  ratail: eae,
  rAtail: tae,
  ratio: nae,
  rationals: rae,
  rbarr: oae,
  rBarr: sae,
  RBarr: iae,
  rbbrk: aae,
  rbrace: cae,
  rbrack: lae,
  rbrke: uae,
  rbrksld: dae,
  rbrkslu: fae,
  Rcaron: pae,
  rcaron: hae,
  Rcedil: gae,
  rcedil: mae,
  rceil: vae,
  rcub: _ae,
  Rcy: bae,
  rcy: yae,
  rdca: wae,
  rdldhar: kae,
  rdquo: Cae,
  rdquor: xae,
  rdsh: Sae,
  real: Eae,
  realine: Aae,
  realpart: $ae,
  reals: Mae,
  Re: Iae,
  rect: Tae,
  reg: Lae,
  REG: Oae,
  ReverseElement: Rae,
  ReverseEquilibrium: Pae,
  ReverseUpEquilibrium: Bae,
  rfisht: zae,
  rfloor: Dae,
  rfr: Nae,
  Rfr: qae,
  rHar: Fae,
  rhard: jae,
  rharu: Hae,
  rharul: Vae,
  Rho: Uae,
  rho: Zae,
  rhov: Wae,
  RightAngleBracket: Gae,
  RightArrowBar: Kae,
  rightarrow: Xae,
  RightArrow: Yae,
  Rightarrow: Jae,
  RightArrowLeftArrow: Qae,
  rightarrowtail: ece,
  RightCeiling: tce,
  RightDoubleBracket: nce,
  RightDownTeeVector: rce,
  RightDownVectorBar: oce,
  RightDownVector: sce,
  RightFloor: ice,
  rightharpoondown: ace,
  rightharpoonup: cce,
  rightleftarrows: lce,
  rightleftharpoons: uce,
  rightrightarrows: dce,
  rightsquigarrow: fce,
  RightTeeArrow: pce,
  RightTee: hce,
  RightTeeVector: gce,
  rightthreetimes: mce,
  RightTriangleBar: vce,
  RightTriangle: _ce,
  RightTriangleEqual: bce,
  RightUpDownVector: yce,
  RightUpTeeVector: wce,
  RightUpVectorBar: kce,
  RightUpVector: Cce,
  RightVectorBar: xce,
  RightVector: Sce,
  ring: Ece,
  risingdotseq: Ace,
  rlarr: $ce,
  rlhar: Mce,
  rlm: Ice,
  rmoustache: Tce,
  rmoust: Lce,
  rnmid: Oce,
  roang: Rce,
  roarr: Pce,
  robrk: Bce,
  ropar: zce,
  ropf: Dce,
  Ropf: Nce,
  roplus: qce,
  rotimes: Fce,
  RoundImplies: jce,
  rpar: Hce,
  rpargt: Vce,
  rppolint: Uce,
  rrarr: Zce,
  Rrightarrow: Wce,
  rsaquo: Gce,
  rscr: Kce,
  Rscr: Xce,
  rsh: Yce,
  Rsh: Jce,
  rsqb: Qce,
  rsquo: ele,
  rsquor: tle,
  rthree: nle,
  rtimes: rle,
  rtri: ole,
  rtrie: sle,
  rtrif: ile,
  rtriltri: ale,
  RuleDelayed: cle,
  ruluhar: lle,
  rx: ule,
  Sacute: dle,
  sacute: fle,
  sbquo: ple,
  scap: hle,
  Scaron: gle,
  scaron: mle,
  Sc: vle,
  sc: _le,
  sccue: ble,
  sce: yle,
  scE: wle,
  Scedil: kle,
  scedil: Cle,
  Scirc: xle,
  scirc: Sle,
  scnap: Ele,
  scnE: Ale,
  scnsim: $le,
  scpolint: Mle,
  scsim: Ile,
  Scy: Tle,
  scy: Lle,
  sdotb: Ole,
  sdot: Rle,
  sdote: Ple,
  searhk: Ble,
  searr: zle,
  seArr: Dle,
  searrow: Nle,
  sect: qle,
  semi: Fle,
  seswar: jle,
  setminus: Hle,
  setmn: Vle,
  sext: Ule,
  Sfr: Zle,
  sfr: Wle,
  sfrown: Gle,
  sharp: Kle,
  SHCHcy: Xle,
  shchcy: Yle,
  SHcy: Jle,
  shcy: Qle,
  ShortDownArrow: eue,
  ShortLeftArrow: tue,
  shortmid: nue,
  shortparallel: rue,
  ShortRightArrow: oue,
  ShortUpArrow: sue,
  shy: iue,
  Sigma: aue,
  sigma: cue,
  sigmaf: lue,
  sigmav: uue,
  sim: due,
  simdot: fue,
  sime: pue,
  simeq: hue,
  simg: gue,
  simgE: mue,
  siml: vue,
  simlE: _ue,
  simne: bue,
  simplus: yue,
  simrarr: wue,
  slarr: kue,
  SmallCircle: Cue,
  smallsetminus: xue,
  smashp: Sue,
  smeparsl: Eue,
  smid: Aue,
  smile: $ue,
  smt: Mue,
  smte: Iue,
  smtes: Tue,
  SOFTcy: Lue,
  softcy: Oue,
  solbar: Rue,
  solb: Pue,
  sol: Bue,
  Sopf: zue,
  sopf: Due,
  spades: Nue,
  spadesuit: que,
  spar: Fue,
  sqcap: jue,
  sqcaps: Hue,
  sqcup: Vue,
  sqcups: Uue,
  Sqrt: Zue,
  sqsub: Wue,
  sqsube: Gue,
  sqsubset: Kue,
  sqsubseteq: Xue,
  sqsup: Yue,
  sqsupe: Jue,
  sqsupset: Que,
  sqsupseteq: ede,
  square: tde,
  Square: nde,
  SquareIntersection: rde,
  SquareSubset: ode,
  SquareSubsetEqual: sde,
  SquareSuperset: ide,
  SquareSupersetEqual: ade,
  SquareUnion: cde,
  squarf: lde,
  squ: ude,
  squf: dde,
  srarr: fde,
  Sscr: pde,
  sscr: hde,
  ssetmn: gde,
  ssmile: mde,
  sstarf: vde,
  Star: _de,
  star: bde,
  starf: yde,
  straightepsilon: wde,
  straightphi: kde,
  strns: Cde,
  sub: xde,
  Sub: Sde,
  subdot: Ede,
  subE: Ade,
  sube: $de,
  subedot: Mde,
  submult: Ide,
  subnE: Tde,
  subne: Lde,
  subplus: Ode,
  subrarr: Rde,
  subset: Pde,
  Subset: Bde,
  subseteq: zde,
  subseteqq: Dde,
  SubsetEqual: Nde,
  subsetneq: qde,
  subsetneqq: Fde,
  subsim: jde,
  subsub: Hde,
  subsup: Vde,
  succapprox: Ude,
  succ: Zde,
  succcurlyeq: Wde,
  Succeeds: Gde,
  SucceedsEqual: Kde,
  SucceedsSlantEqual: Xde,
  SucceedsTilde: Yde,
  succeq: Jde,
  succnapprox: Qde,
  succneqq: efe,
  succnsim: tfe,
  succsim: nfe,
  SuchThat: rfe,
  sum: ofe,
  Sum: sfe,
  sung: ife,
  sup1: afe,
  sup2: cfe,
  sup3: lfe,
  sup: ufe,
  Sup: dfe,
  supdot: ffe,
  supdsub: pfe,
  supE: hfe,
  supe: gfe,
  supedot: mfe,
  Superset: vfe,
  SupersetEqual: _fe,
  suphsol: bfe,
  suphsub: yfe,
  suplarr: wfe,
  supmult: kfe,
  supnE: Cfe,
  supne: xfe,
  supplus: Sfe,
  supset: Efe,
  Supset: Afe,
  supseteq: $fe,
  supseteqq: Mfe,
  supsetneq: Ife,
  supsetneqq: Tfe,
  supsim: Lfe,
  supsub: Ofe,
  supsup: Rfe,
  swarhk: Pfe,
  swarr: Bfe,
  swArr: zfe,
  swarrow: Dfe,
  swnwar: Nfe,
  szlig: qfe,
  Tab: Ffe,
  target: jfe,
  Tau: Hfe,
  tau: Vfe,
  tbrk: Ufe,
  Tcaron: Zfe,
  tcaron: Wfe,
  Tcedil: Gfe,
  tcedil: Kfe,
  Tcy: Xfe,
  tcy: Yfe,
  tdot: Jfe,
  telrec: Qfe,
  Tfr: e0e,
  tfr: t0e,
  there4: n0e,
  therefore: r0e,
  Therefore: o0e,
  Theta: s0e,
  theta: i0e,
  thetasym: a0e,
  thetav: c0e,
  thickapprox: l0e,
  thicksim: u0e,
  ThickSpace: d0e,
  ThinSpace: f0e,
  thinsp: p0e,
  thkap: h0e,
  thksim: g0e,
  THORN: m0e,
  thorn: v0e,
  tilde: _0e,
  Tilde: b0e,
  TildeEqual: y0e,
  TildeFullEqual: w0e,
  TildeTilde: k0e,
  timesbar: C0e,
  timesb: x0e,
  times: S0e,
  timesd: E0e,
  tint: A0e,
  toea: $0e,
  topbot: M0e,
  topcir: I0e,
  top: T0e,
  Topf: L0e,
  topf: O0e,
  topfork: R0e,
  tosa: P0e,
  tprime: B0e,
  trade: z0e,
  TRADE: D0e,
  triangle: N0e,
  triangledown: q0e,
  triangleleft: F0e,
  trianglelefteq: j0e,
  triangleq: H0e,
  triangleright: V0e,
  trianglerighteq: U0e,
  tridot: Z0e,
  trie: W0e,
  triminus: G0e,
  TripleDot: K0e,
  triplus: X0e,
  trisb: Y0e,
  tritime: J0e,
  trpezium: Q0e,
  Tscr: epe,
  tscr: tpe,
  TScy: npe,
  tscy: rpe,
  TSHcy: ope,
  tshcy: spe,
  Tstrok: ipe,
  tstrok: ape,
  twixt: cpe,
  twoheadleftarrow: lpe,
  twoheadrightarrow: upe,
  Uacute: dpe,
  uacute: fpe,
  uarr: ppe,
  Uarr: hpe,
  uArr: gpe,
  Uarrocir: mpe,
  Ubrcy: vpe,
  ubrcy: _pe,
  Ubreve: bpe,
  ubreve: ype,
  Ucirc: wpe,
  ucirc: kpe,
  Ucy: Cpe,
  ucy: xpe,
  udarr: Spe,
  Udblac: Epe,
  udblac: Ape,
  udhar: $pe,
  ufisht: Mpe,
  Ufr: Ipe,
  ufr: Tpe,
  Ugrave: Lpe,
  ugrave: Ope,
  uHar: Rpe,
  uharl: Ppe,
  uharr: Bpe,
  uhblk: zpe,
  ulcorn: Dpe,
  ulcorner: Npe,
  ulcrop: qpe,
  ultri: Fpe,
  Umacr: jpe,
  umacr: Hpe,
  uml: Vpe,
  UnderBar: Upe,
  UnderBrace: Zpe,
  UnderBracket: Wpe,
  UnderParenthesis: Gpe,
  Union: Kpe,
  UnionPlus: Xpe,
  Uogon: Ype,
  uogon: Jpe,
  Uopf: Qpe,
  uopf: ehe,
  UpArrowBar: the,
  uparrow: nhe,
  UpArrow: rhe,
  Uparrow: ohe,
  UpArrowDownArrow: she,
  updownarrow: ihe,
  UpDownArrow: ahe,
  Updownarrow: che,
  UpEquilibrium: lhe,
  upharpoonleft: uhe,
  upharpoonright: dhe,
  uplus: fhe,
  UpperLeftArrow: phe,
  UpperRightArrow: hhe,
  upsi: ghe,
  Upsi: mhe,
  upsih: vhe,
  Upsilon: _he,
  upsilon: bhe,
  UpTeeArrow: yhe,
  UpTee: whe,
  upuparrows: khe,
  urcorn: Che,
  urcorner: xhe,
  urcrop: She,
  Uring: Ehe,
  uring: Ahe,
  urtri: $he,
  Uscr: Mhe,
  uscr: Ihe,
  utdot: The,
  Utilde: Lhe,
  utilde: Ohe,
  utri: Rhe,
  utrif: Phe,
  uuarr: Bhe,
  Uuml: zhe,
  uuml: Dhe,
  uwangle: Nhe,
  vangrt: qhe,
  varepsilon: Fhe,
  varkappa: jhe,
  varnothing: Hhe,
  varphi: Vhe,
  varpi: Uhe,
  varpropto: Zhe,
  varr: Whe,
  vArr: Ghe,
  varrho: Khe,
  varsigma: Xhe,
  varsubsetneq: Yhe,
  varsubsetneqq: Jhe,
  varsupsetneq: Qhe,
  varsupsetneqq: e2e,
  vartheta: t2e,
  vartriangleleft: n2e,
  vartriangleright: r2e,
  vBar: o2e,
  Vbar: s2e,
  vBarv: i2e,
  Vcy: a2e,
  vcy: c2e,
  vdash: l2e,
  vDash: u2e,
  Vdash: d2e,
  VDash: f2e,
  Vdashl: p2e,
  veebar: h2e,
  vee: g2e,
  Vee: m2e,
  veeeq: v2e,
  vellip: _2e,
  verbar: b2e,
  Verbar: y2e,
  vert: w2e,
  Vert: k2e,
  VerticalBar: C2e,
  VerticalLine: x2e,
  VerticalSeparator: S2e,
  VerticalTilde: E2e,
  VeryThinSpace: A2e,
  Vfr: $2e,
  vfr: M2e,
  vltri: I2e,
  vnsub: T2e,
  vnsup: L2e,
  Vopf: O2e,
  vopf: R2e,
  vprop: P2e,
  vrtri: B2e,
  Vscr: z2e,
  vscr: D2e,
  vsubnE: N2e,
  vsubne: q2e,
  vsupnE: F2e,
  vsupne: j2e,
  Vvdash: H2e,
  vzigzag: V2e,
  Wcirc: U2e,
  wcirc: Z2e,
  wedbar: W2e,
  wedge: G2e,
  Wedge: K2e,
  wedgeq: X2e,
  weierp: Y2e,
  Wfr: J2e,
  wfr: Q2e,
  Wopf: e1e,
  wopf: t1e,
  wp: n1e,
  wr: r1e,
  wreath: o1e,
  Wscr: s1e,
  wscr: i1e,
  xcap: a1e,
  xcirc: c1e,
  xcup: l1e,
  xdtri: u1e,
  Xfr: d1e,
  xfr: f1e,
  xharr: p1e,
  xhArr: h1e,
  Xi: g1e,
  xi: m1e,
  xlarr: v1e,
  xlArr: _1e,
  xmap: b1e,
  xnis: y1e,
  xodot: w1e,
  Xopf: k1e,
  xopf: C1e,
  xoplus: x1e,
  xotime: S1e,
  xrarr: E1e,
  xrArr: A1e,
  Xscr: $1e,
  xscr: M1e,
  xsqcup: I1e,
  xuplus: T1e,
  xutri: L1e,
  xvee: O1e,
  xwedge: R1e,
  Yacute: P1e,
  yacute: B1e,
  YAcy: z1e,
  yacy: D1e,
  Ycirc: N1e,
  ycirc: q1e,
  Ycy: F1e,
  ycy: j1e,
  yen: H1e,
  Yfr: V1e,
  yfr: U1e,
  YIcy: Z1e,
  yicy: W1e,
  Yopf: G1e,
  yopf: K1e,
  Yscr: X1e,
  yscr: Y1e,
  YUcy: J1e,
  yucy: Q1e,
  yuml: ege,
  Yuml: tge,
  Zacute: nge,
  zacute: rge,
  Zcaron: oge,
  zcaron: sge,
  Zcy: ige,
  zcy: age,
  Zdot: cge,
  zdot: lge,
  zeetrf: uge,
  ZeroWidthSpace: dge,
  Zeta: fge,
  zeta: pge,
  zfr: hge,
  Zfr: gge,
  ZHcy: mge,
  zhcy: vge,
  zigrarr: _ge,
  zopf: bge,
  Zopf: yge,
  Zscr: wge,
  zscr: kge,
  zwj: Cge,
  zwnj: xge
};
var ei, qd;
function hm() {
  return qd || (qd = 1, ei = Sge), ei;
}
var ti, Fd;
function Il() {
  return Fd || (Fd = 1, ti = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/), ti;
}
var dr = {}, ni, jd;
function Ege() {
  if (jd) return ni;
  jd = 1;
  var e = {};
  function t(r) {
    var s, o, i = e[r];
    if (i)
      return i;
    for (i = e[r] = [], s = 0; s < 128; s++)
      o = String.fromCharCode(s), /^[0-9a-z]$/i.test(o) ? i.push(o) : i.push("%" + ("0" + s.toString(16).toUpperCase()).slice(-2));
    for (s = 0; s < r.length; s++)
      i[r.charCodeAt(s)] = r[s];
    return i;
  }
  function n(r, s, o) {
    var i, a, c, u, d, l = "";
    for (typeof s != "string" && (o = s, s = n.defaultChars), typeof o > "u" && (o = !0), d = t(s), i = 0, a = r.length; i < a; i++) {
      if (c = r.charCodeAt(i), o && c === 37 && i + 2 < a && /^[0-9a-f]{2}$/i.test(r.slice(i + 1, i + 3))) {
        l += r.slice(i, i + 3), i += 2;
        continue;
      }
      if (c < 128) {
        l += d[c];
        continue;
      }
      if (c >= 55296 && c <= 57343) {
        if (c >= 55296 && c <= 56319 && i + 1 < a && (u = r.charCodeAt(i + 1), u >= 56320 && u <= 57343)) {
          l += encodeURIComponent(r[i] + r[i + 1]), i++;
          continue;
        }
        l += "%EF%BF%BD";
        continue;
      }
      l += encodeURIComponent(r[i]);
    }
    return l;
  }
  return n.defaultChars = ";/?:@&=+$,-_.!~*'()#", n.componentChars = "-_.!~*'()", ni = n, ni;
}
var ri, Hd;
function Age() {
  if (Hd) return ri;
  Hd = 1;
  var e = {};
  function t(r) {
    var s, o, i = e[r];
    if (i)
      return i;
    for (i = e[r] = [], s = 0; s < 128; s++)
      o = String.fromCharCode(s), i.push(o);
    for (s = 0; s < r.length; s++)
      o = r.charCodeAt(s), i[o] = "%" + ("0" + o.toString(16).toUpperCase()).slice(-2);
    return i;
  }
  function n(r, s) {
    var o;
    return typeof s != "string" && (s = n.defaultChars), o = t(s), r.replace(/(%[a-f0-9]{2})+/gi, function(i) {
      var a, c, u, d, l, m, f, v = "";
      for (a = 0, c = i.length; a < c; a += 3) {
        if (u = parseInt(i.slice(a + 1, a + 3), 16), u < 128) {
          v += o[u];
          continue;
        }
        if ((u & 224) === 192 && a + 3 < c && (d = parseInt(i.slice(a + 4, a + 6), 16), (d & 192) === 128)) {
          f = u << 6 & 1984 | d & 63, f < 128 ? v += "��" : v += String.fromCharCode(f), a += 3;
          continue;
        }
        if ((u & 240) === 224 && a + 6 < c && (d = parseInt(i.slice(a + 4, a + 6), 16), l = parseInt(i.slice(a + 7, a + 9), 16), (d & 192) === 128 && (l & 192) === 128)) {
          f = u << 12 & 61440 | d << 6 & 4032 | l & 63, f < 2048 || f >= 55296 && f <= 57343 ? v += "���" : v += String.fromCharCode(f), a += 6;
          continue;
        }
        if ((u & 248) === 240 && a + 9 < c && (d = parseInt(i.slice(a + 4, a + 6), 16), l = parseInt(i.slice(a + 7, a + 9), 16), m = parseInt(i.slice(a + 10, a + 12), 16), (d & 192) === 128 && (l & 192) === 128 && (m & 192) === 128)) {
          f = u << 18 & 1835008 | d << 12 & 258048 | l << 6 & 4032 | m & 63, f < 65536 || f > 1114111 ? v += "����" : (f -= 65536, v += String.fromCharCode(55296 + (f >> 10), 56320 + (f & 1023))), a += 9;
          continue;
        }
        v += "�";
      }
      return v;
    });
  }
  return n.defaultChars = ";/?:@&=+$,#", n.componentChars = "", ri = n, ri;
}
var oi, Vd;
function $ge() {
  return Vd || (Vd = 1, oi = function(t) {
    var n = "";
    return n += t.protocol || "", n += t.slashes ? "//" : "", n += t.auth ? t.auth + "@" : "", t.hostname && t.hostname.indexOf(":") !== -1 ? n += "[" + t.hostname + "]" : n += t.hostname || "", n += t.port ? ":" + t.port : "", n += t.pathname || "", n += t.search || "", n += t.hash || "", n;
  }), oi;
}
var si, Ud;
function Mge() {
  if (Ud) return si;
  Ud = 1;
  function e() {
    this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
  }
  var t = /^([a-z0-9.+-]+:)/i, n = /:[0-9]*$/, r = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, s = ["<", ">", '"', "`", " ", "\r", `
`, "	"], o = ["{", "}", "|", "\\", "^", "`"].concat(s), i = ["'"].concat(o), a = ["%", "/", "?", ";", "#"].concat(i), c = ["/", "?", "#"], u = 255, d = /^[+a-z0-9A-Z_-]{0,63}$/, l = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, m = {
    javascript: !0,
    "javascript:": !0
  }, f = {
    http: !0,
    https: !0,
    ftp: !0,
    gopher: !0,
    file: !0,
    "http:": !0,
    "https:": !0,
    "ftp:": !0,
    "gopher:": !0,
    "file:": !0
  };
  function v(g, y) {
    if (g && g instanceof e)
      return g;
    var h = new e();
    return h.parse(g, y), h;
  }
  return e.prototype.parse = function(g, y) {
    var h, w, k, C, A, E = g;
    if (E = E.trim(), !y && g.split("#").length === 1) {
      var $ = r.exec(E);
      if ($)
        return this.pathname = $[1], $[2] && (this.search = $[2]), this;
    }
    var M = t.exec(E);
    if (M && (M = M[0], k = M.toLowerCase(), this.protocol = M, E = E.substr(M.length)), (y || M || E.match(/^\/\/[^@\/]+@[^@\/]+/)) && (A = E.substr(0, 2) === "//", A && !(M && m[M]) && (E = E.substr(2), this.slashes = !0)), !m[M] && (A || M && !f[M])) {
      var O = -1;
      for (h = 0; h < c.length; h++)
        C = E.indexOf(c[h]), C !== -1 && (O === -1 || C < O) && (O = C);
      var R, B;
      for (O === -1 ? B = E.lastIndexOf("@") : B = E.lastIndexOf("@", O), B !== -1 && (R = E.slice(0, B), E = E.slice(B + 1), this.auth = R), O = -1, h = 0; h < a.length; h++)
        C = E.indexOf(a[h]), C !== -1 && (O === -1 || C < O) && (O = C);
      O === -1 && (O = E.length), E[O - 1] === ":" && O--;
      var V = E.slice(0, O);
      E = E.slice(O), this.parseHost(V), this.hostname = this.hostname || "";
      var re = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
      if (!re) {
        var P = this.hostname.split(/\./);
        for (h = 0, w = P.length; h < w; h++) {
          var U = P[h];
          if (U && !U.match(d)) {
            for (var z = "", N = 0, F = U.length; N < F; N++)
              U.charCodeAt(N) > 127 ? z += "x" : z += U[N];
            if (!z.match(d)) {
              var Z = P.slice(0, h), W = P.slice(h + 1), pe = U.match(l);
              pe && (Z.push(pe[1]), W.unshift(pe[2])), W.length && (E = W.join(".") + E), this.hostname = Z.join(".");
              break;
            }
          }
        }
      }
      this.hostname.length > u && (this.hostname = ""), re && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
    }
    var le = E.indexOf("#");
    le !== -1 && (this.hash = E.substr(le), E = E.slice(0, le));
    var Ee = E.indexOf("?");
    return Ee !== -1 && (this.search = E.substr(Ee), E = E.slice(0, Ee)), E && (this.pathname = E), f[k] && this.hostname && !this.pathname && (this.pathname = ""), this;
  }, e.prototype.parseHost = function(g) {
    var y = n.exec(g);
    y && (y = y[0], y !== ":" && (this.port = y.substr(1)), g = g.substr(0, g.length - y.length)), g && (this.hostname = g);
  }, si = v, si;
}
var Zd;
function gm() {
  return Zd || (Zd = 1, dr.encode = Ege(), dr.decode = Age(), dr.format = $ge(), dr.parse = Mge()), dr;
}
var Xn = {}, ii, Wd;
function mm() {
  return Wd || (Wd = 1, ii = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/), ii;
}
var ai, Gd;
function vm() {
  return Gd || (Gd = 1, ai = /[\0-\x1F\x7F-\x9F]/), ai;
}
var ci, Kd;
function Ige() {
  return Kd || (Kd = 1, ci = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/), ci;
}
var li, Xd;
function _m() {
  return Xd || (Xd = 1, li = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/), li;
}
var Yd;
function Tge() {
  return Yd || (Yd = 1, Xn.Any = mm(), Xn.Cc = vm(), Xn.Cf = Ige(), Xn.P = Il(), Xn.Z = _m()), Xn;
}
var Jd;
function Ie() {
  return Jd || (Jd = 1, function(e) {
    function t(P) {
      return Object.prototype.toString.call(P);
    }
    function n(P) {
      return t(P) === "[object String]";
    }
    var r = Object.prototype.hasOwnProperty;
    function s(P, U) {
      return r.call(P, U);
    }
    function o(P) {
      var U = Array.prototype.slice.call(arguments, 1);
      return U.forEach(function(z) {
        if (z) {
          if (typeof z != "object")
            throw new TypeError(z + "must be object");
          Object.keys(z).forEach(function(N) {
            P[N] = z[N];
          });
        }
      }), P;
    }
    function i(P, U, z) {
      return [].concat(P.slice(0, U), z, P.slice(U + 1));
    }
    function a(P) {
      return !(P >= 55296 && P <= 57343 || P >= 64976 && P <= 65007 || (P & 65535) === 65535 || (P & 65535) === 65534 || P >= 0 && P <= 8 || P === 11 || P >= 14 && P <= 31 || P >= 127 && P <= 159 || P > 1114111);
    }
    function c(P) {
      if (P > 65535) {
        P -= 65536;
        var U = 55296 + (P >> 10), z = 56320 + (P & 1023);
        return String.fromCharCode(U, z);
      }
      return String.fromCharCode(P);
    }
    var u = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g, d = /&([a-z#][a-z0-9]{1,31});/gi, l = new RegExp(u.source + "|" + d.source, "gi"), m = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i, f = hm();
    function v(P, U) {
      var z;
      return s(f, U) ? f[U] : U.charCodeAt(0) === 35 && m.test(U) && (z = U[1].toLowerCase() === "x" ? parseInt(U.slice(2), 16) : parseInt(U.slice(1), 10), a(z)) ? c(z) : P;
    }
    function g(P) {
      return P.indexOf("\\") < 0 ? P : P.replace(u, "$1");
    }
    function y(P) {
      return P.indexOf("\\") < 0 && P.indexOf("&") < 0 ? P : P.replace(l, function(U, z, N) {
        return z || v(U, N);
      });
    }
    var h = /[&<>"]/, w = /[&<>"]/g, k = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;"
    };
    function C(P) {
      return k[P];
    }
    function A(P) {
      return h.test(P) ? P.replace(w, C) : P;
    }
    var E = /[.?*+^$[\]\\(){}|-]/g;
    function $(P) {
      return P.replace(E, "\\$&");
    }
    function M(P) {
      switch (P) {
        case 9:
        case 32:
          return !0;
      }
      return !1;
    }
    function O(P) {
      if (P >= 8192 && P <= 8202)
        return !0;
      switch (P) {
        case 9:
        // \t
        case 10:
        // \n
        case 11:
        // \v
        case 12:
        // \f
        case 13:
        // \r
        case 32:
        case 160:
        case 5760:
        case 8239:
        case 8287:
        case 12288:
          return !0;
      }
      return !1;
    }
    var R = Il();
    function B(P) {
      return R.test(P);
    }
    function V(P) {
      switch (P) {
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
        case 58:
        case 59:
        case 60:
        case 61:
        case 62:
        case 63:
        case 64:
        case 91:
        case 92:
        case 93:
        case 94:
        case 95:
        case 96:
        case 123:
        case 124:
        case 125:
        case 126:
          return !0;
        default:
          return !1;
      }
    }
    function re(P) {
      return P = P.trim().replace(/\s+/g, " "), "ẞ".toLowerCase() === "Ṿ" && (P = P.replace(/ẞ/g, "ß")), P.toLowerCase().toUpperCase();
    }
    e.lib = {}, e.lib.mdurl = gm(), e.lib.ucmicro = Tge(), e.assign = o, e.isString = n, e.has = s, e.unescapeMd = g, e.unescapeAll = y, e.isValidEntityCode = a, e.fromCodePoint = c, e.escapeHtml = A, e.arrayReplaceAt = i, e.isSpace = M, e.isWhiteSpace = O, e.isMdAsciiPunct = V, e.isPunctChar = B, e.escapeRE = $, e.normalizeReference = re;
  }(Qs)), Qs;
}
var jr = {}, ui, Qd;
function Lge() {
  return Qd || (Qd = 1, ui = function(t, n, r) {
    var s, o, i, a, c = -1, u = t.posMax, d = t.pos;
    for (t.pos = n + 1, s = 1; t.pos < u; ) {
      if (i = t.src.charCodeAt(t.pos), i === 93 && (s--, s === 0)) {
        o = !0;
        break;
      }
      if (a = t.pos, t.md.inline.skipToken(t), i === 91) {
        if (a === t.pos - 1)
          s++;
        else if (r)
          return t.pos = d, -1;
      }
    }
    return o && (c = t.pos), t.pos = d, c;
  }), ui;
}
var di, ef;
function Oge() {
  if (ef) return di;
  ef = 1;
  var e = Ie().unescapeAll;
  return di = function(n, r, s) {
    var o, i, a = r, c = {
      ok: !1,
      pos: 0,
      lines: 0,
      str: ""
    };
    if (n.charCodeAt(a) === 60) {
      for (a++; a < s; ) {
        if (o = n.charCodeAt(a), o === 10 || o === 60)
          return c;
        if (o === 62)
          return c.pos = a + 1, c.str = e(n.slice(r + 1, a)), c.ok = !0, c;
        if (o === 92 && a + 1 < s) {
          a += 2;
          continue;
        }
        a++;
      }
      return c;
    }
    for (i = 0; a < s && (o = n.charCodeAt(a), !(o === 32 || o < 32 || o === 127)); ) {
      if (o === 92 && a + 1 < s) {
        if (n.charCodeAt(a + 1) === 32)
          break;
        a += 2;
        continue;
      }
      if (o === 40 && (i++, i > 32))
        return c;
      if (o === 41) {
        if (i === 0)
          break;
        i--;
      }
      a++;
    }
    return r === a || i !== 0 || (c.str = e(n.slice(r, a)), c.pos = a, c.ok = !0), c;
  }, di;
}
var fi, tf;
function Rge() {
  if (tf) return fi;
  tf = 1;
  var e = Ie().unescapeAll;
  return fi = function(n, r, s) {
    var o, i, a = 0, c = r, u = {
      ok: !1,
      pos: 0,
      lines: 0,
      str: ""
    };
    if (c >= s || (i = n.charCodeAt(c), i !== 34 && i !== 39 && i !== 40))
      return u;
    for (c++, i === 40 && (i = 41); c < s; ) {
      if (o = n.charCodeAt(c), o === i)
        return u.pos = c + 1, u.lines = a, u.str = e(n.slice(r + 1, c)), u.ok = !0, u;
      if (o === 40 && i === 41)
        return u;
      o === 10 ? a++ : o === 92 && c + 1 < s && (c++, n.charCodeAt(c) === 10 && a++), c++;
    }
    return u;
  }, fi;
}
var nf;
function Pge() {
  return nf || (nf = 1, jr.parseLinkLabel = Lge(), jr.parseLinkDestination = Oge(), jr.parseLinkTitle = Rge()), jr;
}
var pi, rf;
function Bge() {
  if (rf) return pi;
  rf = 1;
  var e = Ie().assign, t = Ie().unescapeAll, n = Ie().escapeHtml, r = {};
  r.code_inline = function(o, i, a, c, u) {
    var d = o[i];
    return "<code" + u.renderAttrs(d) + ">" + n(d.content) + "</code>";
  }, r.code_block = function(o, i, a, c, u) {
    var d = o[i];
    return "<pre" + u.renderAttrs(d) + "><code>" + n(o[i].content) + `</code></pre>
`;
  }, r.fence = function(o, i, a, c, u) {
    var d = o[i], l = d.info ? t(d.info).trim() : "", m = "", f = "", v, g, y, h, w;
    return l && (y = l.split(/(\s+)/g), m = y[0], f = y.slice(2).join("")), a.highlight ? v = a.highlight(d.content, m, f) || n(d.content) : v = n(d.content), v.indexOf("<pre") === 0 ? v + `
` : l ? (g = d.attrIndex("class"), h = d.attrs ? d.attrs.slice() : [], g < 0 ? h.push(["class", a.langPrefix + m]) : (h[g] = h[g].slice(), h[g][1] += " " + a.langPrefix + m), w = {
      attrs: h
    }, "<pre><code" + u.renderAttrs(w) + ">" + v + `</code></pre>
`) : "<pre><code" + u.renderAttrs(d) + ">" + v + `</code></pre>
`;
  }, r.image = function(o, i, a, c, u) {
    var d = o[i];
    return d.attrs[d.attrIndex("alt")][1] = u.renderInlineAsText(d.children, a, c), u.renderToken(o, i, a);
  }, r.hardbreak = function(o, i, a) {
    return a.xhtmlOut ? `<br />
` : `<br>
`;
  }, r.softbreak = function(o, i, a) {
    return a.breaks ? a.xhtmlOut ? `<br />
` : `<br>
` : `
`;
  }, r.text = function(o, i) {
    return n(o[i].content);
  }, r.html_block = function(o, i) {
    return o[i].content;
  }, r.html_inline = function(o, i) {
    return o[i].content;
  };
  function s() {
    this.rules = e({}, r);
  }
  return s.prototype.renderAttrs = function(i) {
    var a, c, u;
    if (!i.attrs)
      return "";
    for (u = "", a = 0, c = i.attrs.length; a < c; a++)
      u += " " + n(i.attrs[a][0]) + '="' + n(i.attrs[a][1]) + '"';
    return u;
  }, s.prototype.renderToken = function(i, a, c) {
    var u, d = "", l = !1, m = i[a];
    return m.hidden ? "" : (m.block && m.nesting !== -1 && a && i[a - 1].hidden && (d += `
`), d += (m.nesting === -1 ? "</" : "<") + m.tag, d += this.renderAttrs(m), m.nesting === 0 && c.xhtmlOut && (d += " /"), m.block && (l = !0, m.nesting === 1 && a + 1 < i.length && (u = i[a + 1], (u.type === "inline" || u.hidden || u.nesting === -1 && u.tag === m.tag) && (l = !1))), d += l ? `>
` : ">", d);
  }, s.prototype.renderInline = function(o, i, a) {
    for (var c, u = "", d = this.rules, l = 0, m = o.length; l < m; l++)
      c = o[l].type, typeof d[c] < "u" ? u += d[c](o, l, i, a, this) : u += this.renderToken(o, l, i);
    return u;
  }, s.prototype.renderInlineAsText = function(o, i, a) {
    for (var c = "", u = 0, d = o.length; u < d; u++)
      o[u].type === "text" ? c += o[u].content : o[u].type === "image" ? c += this.renderInlineAsText(o[u].children, i, a) : o[u].type === "softbreak" && (c += `
`);
    return c;
  }, s.prototype.render = function(o, i, a) {
    var c, u, d, l = "", m = this.rules;
    for (c = 0, u = o.length; c < u; c++)
      d = o[c].type, d === "inline" ? l += this.renderInline(o[c].children, i, a) : typeof m[d] < "u" ? l += m[d](o, c, i, a, this) : l += this.renderToken(o, c, i, a);
    return l;
  }, pi = s, pi;
}
var hi, of;
function Tl() {
  if (of) return hi;
  of = 1;
  function e() {
    this.__rules__ = [], this.__cache__ = null;
  }
  return e.prototype.__find__ = function(t) {
    for (var n = 0; n < this.__rules__.length; n++)
      if (this.__rules__[n].name === t)
        return n;
    return -1;
  }, e.prototype.__compile__ = function() {
    var t = this, n = [""];
    t.__rules__.forEach(function(r) {
      r.enabled && r.alt.forEach(function(s) {
        n.indexOf(s) < 0 && n.push(s);
      });
    }), t.__cache__ = {}, n.forEach(function(r) {
      t.__cache__[r] = [], t.__rules__.forEach(function(s) {
        s.enabled && (r && s.alt.indexOf(r) < 0 || t.__cache__[r].push(s.fn));
      });
    });
  }, e.prototype.at = function(t, n, r) {
    var s = this.__find__(t), o = r || {};
    if (s === -1)
      throw new Error("Parser rule not found: " + t);
    this.__rules__[s].fn = n, this.__rules__[s].alt = o.alt || [], this.__cache__ = null;
  }, e.prototype.before = function(t, n, r, s) {
    var o = this.__find__(t), i = s || {};
    if (o === -1)
      throw new Error("Parser rule not found: " + t);
    this.__rules__.splice(o, 0, {
      name: n,
      enabled: !0,
      fn: r,
      alt: i.alt || []
    }), this.__cache__ = null;
  }, e.prototype.after = function(t, n, r, s) {
    var o = this.__find__(t), i = s || {};
    if (o === -1)
      throw new Error("Parser rule not found: " + t);
    this.__rules__.splice(o + 1, 0, {
      name: n,
      enabled: !0,
      fn: r,
      alt: i.alt || []
    }), this.__cache__ = null;
  }, e.prototype.push = function(t, n, r) {
    var s = r || {};
    this.__rules__.push({
      name: t,
      enabled: !0,
      fn: n,
      alt: s.alt || []
    }), this.__cache__ = null;
  }, e.prototype.enable = function(t, n) {
    Array.isArray(t) || (t = [t]);
    var r = [];
    return t.forEach(function(s) {
      var o = this.__find__(s);
      if (o < 0) {
        if (n)
          return;
        throw new Error("Rules manager: invalid rule name " + s);
      }
      this.__rules__[o].enabled = !0, r.push(s);
    }, this), this.__cache__ = null, r;
  }, e.prototype.enableOnly = function(t, n) {
    Array.isArray(t) || (t = [t]), this.__rules__.forEach(function(r) {
      r.enabled = !1;
    }), this.enable(t, n);
  }, e.prototype.disable = function(t, n) {
    Array.isArray(t) || (t = [t]);
    var r = [];
    return t.forEach(function(s) {
      var o = this.__find__(s);
      if (o < 0) {
        if (n)
          return;
        throw new Error("Rules manager: invalid rule name " + s);
      }
      this.__rules__[o].enabled = !1, r.push(s);
    }, this), this.__cache__ = null, r;
  }, e.prototype.getRules = function(t) {
    return this.__cache__ === null && this.__compile__(), this.__cache__[t] || [];
  }, hi = e, hi;
}
var gi, sf;
function zge() {
  if (sf) return gi;
  sf = 1;
  var e = /\r\n?|\n/g, t = /\0/g;
  return gi = function(r) {
    var s;
    s = r.src.replace(e, `
`), s = s.replace(t, "�"), r.src = s;
  }, gi;
}
var mi, af;
function Dge() {
  return af || (af = 1, mi = function(t) {
    var n;
    t.inlineMode ? (n = new t.Token("inline", "", 0), n.content = t.src, n.map = [0, 1], n.children = [], t.tokens.push(n)) : t.md.block.parse(t.src, t.md, t.env, t.tokens);
  }), mi;
}
var vi, cf;
function Nge() {
  return cf || (cf = 1, vi = function(t) {
    var n = t.tokens, r, s, o;
    for (s = 0, o = n.length; s < o; s++)
      r = n[s], r.type === "inline" && t.md.inline.parse(r.content, t.md, t.env, r.children);
  }), vi;
}
var _i, lf;
function qge() {
  if (lf) return _i;
  lf = 1;
  var e = Ie().arrayReplaceAt;
  function t(r) {
    return /^<a[>\s]/i.test(r);
  }
  function n(r) {
    return /^<\/a\s*>/i.test(r);
  }
  return _i = function(s) {
    var o, i, a, c, u, d, l, m, f, v, g, y, h, w, k, C, A = s.tokens, E;
    if (s.md.options.linkify) {
      for (i = 0, a = A.length; i < a; i++)
        if (!(A[i].type !== "inline" || !s.md.linkify.pretest(A[i].content)))
          for (c = A[i].children, h = 0, o = c.length - 1; o >= 0; o--) {
            if (d = c[o], d.type === "link_close") {
              for (o--; c[o].level !== d.level && c[o].type !== "link_open"; )
                o--;
              continue;
            }
            if (d.type === "html_inline" && (t(d.content) && h > 0 && h--, n(d.content) && h++), !(h > 0) && d.type === "text" && s.md.linkify.test(d.content)) {
              for (f = d.content, E = s.md.linkify.match(f), l = [], y = d.level, g = 0, E.length > 0 && E[0].index === 0 && o > 0 && c[o - 1].type === "text_special" && (E = E.slice(1)), m = 0; m < E.length; m++)
                w = E[m].url, k = s.md.normalizeLink(w), s.md.validateLink(k) && (C = E[m].text, E[m].schema ? E[m].schema === "mailto:" && !/^mailto:/i.test(C) ? C = s.md.normalizeLinkText("mailto:" + C).replace(/^mailto:/, "") : C = s.md.normalizeLinkText(C) : C = s.md.normalizeLinkText("http://" + C).replace(/^http:\/\//, ""), v = E[m].index, v > g && (u = new s.Token("text", "", 0), u.content = f.slice(g, v), u.level = y, l.push(u)), u = new s.Token("link_open", "a", 1), u.attrs = [["href", k]], u.level = y++, u.markup = "linkify", u.info = "auto", l.push(u), u = new s.Token("text", "", 0), u.content = C, u.level = y, l.push(u), u = new s.Token("link_close", "a", -1), u.level = --y, u.markup = "linkify", u.info = "auto", l.push(u), g = E[m].lastIndex);
              g < f.length && (u = new s.Token("text", "", 0), u.content = f.slice(g), u.level = y, l.push(u)), A[i].children = c = e(c, o, l);
            }
          }
    }
  }, _i;
}
var bi, uf;
function Fge() {
  if (uf) return bi;
  uf = 1;
  var e = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, t = /\((c|tm|r)\)/i, n = /\((c|tm|r)\)/ig, r = {
    c: "©",
    r: "®",
    tm: "™"
  };
  function s(a, c) {
    return r[c.toLowerCase()];
  }
  function o(a) {
    var c, u, d = 0;
    for (c = a.length - 1; c >= 0; c--)
      u = a[c], u.type === "text" && !d && (u.content = u.content.replace(n, s)), u.type === "link_open" && u.info === "auto" && d--, u.type === "link_close" && u.info === "auto" && d++;
  }
  function i(a) {
    var c, u, d = 0;
    for (c = a.length - 1; c >= 0; c--)
      u = a[c], u.type === "text" && !d && e.test(u.content) && (u.content = u.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1—").replace(/(^|\s)--(?=\s|$)/mg, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1–")), u.type === "link_open" && u.info === "auto" && d--, u.type === "link_close" && u.info === "auto" && d++;
  }
  return bi = function(c) {
    var u;
    if (c.md.options.typographer)
      for (u = c.tokens.length - 1; u >= 0; u--)
        c.tokens[u].type === "inline" && (t.test(c.tokens[u].content) && o(c.tokens[u].children), e.test(c.tokens[u].content) && i(c.tokens[u].children));
  }, bi;
}
var yi, df;
function jge() {
  if (df) return yi;
  df = 1;
  var e = Ie().isWhiteSpace, t = Ie().isPunctChar, n = Ie().isMdAsciiPunct, r = /['"]/, s = /['"]/g, o = "’";
  function i(c, u, d) {
    return c.slice(0, u) + d + c.slice(u + 1);
  }
  function a(c, u) {
    var d, l, m, f, v, g, y, h, w, k, C, A, E, $, M, O, R, B, V, re, P;
    for (V = [], d = 0; d < c.length; d++) {
      for (l = c[d], y = c[d].level, R = V.length - 1; R >= 0 && !(V[R].level <= y); R--)
        ;
      if (V.length = R + 1, l.type === "text") {
        m = l.content, v = 0, g = m.length;
        e:
          for (; v < g && (s.lastIndex = v, f = s.exec(m), !!f); ) {
            if (M = O = !0, v = f.index + 1, B = f[0] === "'", w = 32, f.index - 1 >= 0)
              w = m.charCodeAt(f.index - 1);
            else
              for (R = d - 1; R >= 0 && !(c[R].type === "softbreak" || c[R].type === "hardbreak"); R--)
                if (c[R].content) {
                  w = c[R].content.charCodeAt(c[R].content.length - 1);
                  break;
                }
            if (k = 32, v < g)
              k = m.charCodeAt(v);
            else
              for (R = d + 1; R < c.length && !(c[R].type === "softbreak" || c[R].type === "hardbreak"); R++)
                if (c[R].content) {
                  k = c[R].content.charCodeAt(0);
                  break;
                }
            if (C = n(w) || t(String.fromCharCode(w)), A = n(k) || t(String.fromCharCode(k)), E = e(w), $ = e(k), $ ? M = !1 : A && (E || C || (M = !1)), E ? O = !1 : C && ($ || A || (O = !1)), k === 34 && f[0] === '"' && w >= 48 && w <= 57 && (O = M = !1), M && O && (M = C, O = A), !M && !O) {
              B && (l.content = i(l.content, f.index, o));
              continue;
            }
            if (O) {
              for (R = V.length - 1; R >= 0 && (h = V[R], !(V[R].level < y)); R--)
                if (h.single === B && V[R].level === y) {
                  h = V[R], B ? (re = u.md.options.quotes[2], P = u.md.options.quotes[3]) : (re = u.md.options.quotes[0], P = u.md.options.quotes[1]), l.content = i(l.content, f.index, P), c[h.token].content = i(
                    c[h.token].content,
                    h.pos,
                    re
                  ), v += P.length - 1, h.token === d && (v += re.length - 1), m = l.content, g = m.length, V.length = R;
                  continue e;
                }
            }
            M ? V.push({
              token: d,
              pos: f.index,
              single: B,
              level: y
            }) : O && B && (l.content = i(l.content, f.index, o));
          }
      }
    }
  }
  return yi = function(u) {
    var d;
    if (u.md.options.typographer)
      for (d = u.tokens.length - 1; d >= 0; d--)
        u.tokens[d].type !== "inline" || !r.test(u.tokens[d].content) || a(u.tokens[d].children, u);
  }, yi;
}
var wi, ff;
function Hge() {
  return ff || (ff = 1, wi = function(t) {
    var n, r, s, o, i, a, c = t.tokens;
    for (n = 0, r = c.length; n < r; n++)
      if (c[n].type === "inline") {
        for (s = c[n].children, i = s.length, o = 0; o < i; o++)
          s[o].type === "text_special" && (s[o].type = "text");
        for (o = a = 0; o < i; o++)
          s[o].type === "text" && o + 1 < i && s[o + 1].type === "text" ? s[o + 1].content = s[o].content + s[o + 1].content : (o !== a && (s[a] = s[o]), a++);
        o !== a && (s.length = a);
      }
  }), wi;
}
var ki, pf;
function Ll() {
  if (pf) return ki;
  pf = 1;
  function e(t, n, r) {
    this.type = t, this.tag = n, this.attrs = null, this.map = null, this.nesting = r, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = !1, this.hidden = !1;
  }
  return e.prototype.attrIndex = function(n) {
    var r, s, o;
    if (!this.attrs)
      return -1;
    for (r = this.attrs, s = 0, o = r.length; s < o; s++)
      if (r[s][0] === n)
        return s;
    return -1;
  }, e.prototype.attrPush = function(n) {
    this.attrs ? this.attrs.push(n) : this.attrs = [n];
  }, e.prototype.attrSet = function(n, r) {
    var s = this.attrIndex(n), o = [n, r];
    s < 0 ? this.attrPush(o) : this.attrs[s] = o;
  }, e.prototype.attrGet = function(n) {
    var r = this.attrIndex(n), s = null;
    return r >= 0 && (s = this.attrs[r][1]), s;
  }, e.prototype.attrJoin = function(n, r) {
    var s = this.attrIndex(n);
    s < 0 ? this.attrPush([n, r]) : this.attrs[s][1] = this.attrs[s][1] + " " + r;
  }, ki = e, ki;
}
var Ci, hf;
function Vge() {
  if (hf) return Ci;
  hf = 1;
  var e = Ll();
  function t(n, r, s) {
    this.src = n, this.env = s, this.tokens = [], this.inlineMode = !1, this.md = r;
  }
  return t.prototype.Token = e, Ci = t, Ci;
}
var xi, gf;
function Uge() {
  if (gf) return xi;
  gf = 1;
  var e = Tl(), t = [
    ["normalize", zge()],
    ["block", Dge()],
    ["inline", Nge()],
    ["linkify", qge()],
    ["replacements", Fge()],
    ["smartquotes", jge()],
    // `text_join` finds `text_special` tokens (for escape sequences)
    // and joins them with the rest of the text
    ["text_join", Hge()]
  ];
  function n() {
    this.ruler = new e();
    for (var r = 0; r < t.length; r++)
      this.ruler.push(t[r][0], t[r][1]);
  }
  return n.prototype.process = function(r) {
    var s, o, i;
    for (i = this.ruler.getRules(""), s = 0, o = i.length; s < o; s++)
      i[s](r);
  }, n.prototype.State = Vge(), xi = n, xi;
}
var Si, mf;
function Zge() {
  if (mf) return Si;
  mf = 1;
  var e = Ie().isSpace;
  function t(r, s) {
    var o = r.bMarks[s] + r.tShift[s], i = r.eMarks[s];
    return r.src.slice(o, i);
  }
  function n(r) {
    var s = [], o = 0, i = r.length, a, c = !1, u = 0, d = "";
    for (a = r.charCodeAt(o); o < i; )
      a === 124 && (c ? (d += r.substring(u, o - 1), u = o) : (s.push(d + r.substring(u, o)), d = "", u = o + 1)), c = a === 92, o++, a = r.charCodeAt(o);
    return s.push(d + r.substring(u)), s;
  }
  return Si = function(s, o, i, a) {
    var c, u, d, l, m, f, v, g, y, h, w, k, C, A, E, $, M, O;
    if (o + 2 > i || (f = o + 1, s.sCount[f] < s.blkIndent) || s.sCount[f] - s.blkIndent >= 4 || (d = s.bMarks[f] + s.tShift[f], d >= s.eMarks[f]) || (M = s.src.charCodeAt(d++), M !== 124 && M !== 45 && M !== 58) || d >= s.eMarks[f] || (O = s.src.charCodeAt(d++), O !== 124 && O !== 45 && O !== 58 && !e(O)) || M === 45 && e(O))
      return !1;
    for (; d < s.eMarks[f]; ) {
      if (c = s.src.charCodeAt(d), c !== 124 && c !== 45 && c !== 58 && !e(c))
        return !1;
      d++;
    }
    for (u = t(s, o + 1), v = u.split("|"), h = [], l = 0; l < v.length; l++) {
      if (w = v[l].trim(), !w) {
        if (l === 0 || l === v.length - 1)
          continue;
        return !1;
      }
      if (!/^:?-+:?$/.test(w))
        return !1;
      w.charCodeAt(w.length - 1) === 58 ? h.push(w.charCodeAt(0) === 58 ? "center" : "right") : w.charCodeAt(0) === 58 ? h.push("left") : h.push("");
    }
    if (u = t(s, o).trim(), u.indexOf("|") === -1 || s.sCount[o] - s.blkIndent >= 4 || (v = n(u), v.length && v[0] === "" && v.shift(), v.length && v[v.length - 1] === "" && v.pop(), g = v.length, g === 0 || g !== h.length))
      return !1;
    if (a)
      return !0;
    for (A = s.parentType, s.parentType = "table", $ = s.md.block.ruler.getRules("blockquote"), y = s.push("table_open", "table", 1), y.map = k = [o, 0], y = s.push("thead_open", "thead", 1), y.map = [o, o + 1], y = s.push("tr_open", "tr", 1), y.map = [o, o + 1], l = 0; l < v.length; l++)
      y = s.push("th_open", "th", 1), h[l] && (y.attrs = [["style", "text-align:" + h[l]]]), y = s.push("inline", "", 0), y.content = v[l].trim(), y.children = [], y = s.push("th_close", "th", -1);
    for (y = s.push("tr_close", "tr", -1), y = s.push("thead_close", "thead", -1), f = o + 2; f < i && !(s.sCount[f] < s.blkIndent); f++) {
      for (E = !1, l = 0, m = $.length; l < m; l++)
        if ($[l](s, f, i, !0)) {
          E = !0;
          break;
        }
      if (E || (u = t(s, f).trim(), !u) || s.sCount[f] - s.blkIndent >= 4)
        break;
      for (v = n(u), v.length && v[0] === "" && v.shift(), v.length && v[v.length - 1] === "" && v.pop(), f === o + 2 && (y = s.push("tbody_open", "tbody", 1), y.map = C = [o + 2, 0]), y = s.push("tr_open", "tr", 1), y.map = [f, f + 1], l = 0; l < g; l++)
        y = s.push("td_open", "td", 1), h[l] && (y.attrs = [["style", "text-align:" + h[l]]]), y = s.push("inline", "", 0), y.content = v[l] ? v[l].trim() : "", y.children = [], y = s.push("td_close", "td", -1);
      y = s.push("tr_close", "tr", -1);
    }
    return C && (y = s.push("tbody_close", "tbody", -1), C[1] = f), y = s.push("table_close", "table", -1), k[1] = f, s.parentType = A, s.line = f, !0;
  }, Si;
}
var Ei, vf;
function Wge() {
  return vf || (vf = 1, Ei = function(t, n, r) {
    var s, o, i;
    if (t.sCount[n] - t.blkIndent < 4)
      return !1;
    for (o = s = n + 1; s < r; ) {
      if (t.isEmpty(s)) {
        s++;
        continue;
      }
      if (t.sCount[s] - t.blkIndent >= 4) {
        s++, o = s;
        continue;
      }
      break;
    }
    return t.line = o, i = t.push("code_block", "code", 0), i.content = t.getLines(n, o, 4 + t.blkIndent, !1) + `
`, i.map = [n, t.line], !0;
  }), Ei;
}
var Ai, _f;
function Gge() {
  return _f || (_f = 1, Ai = function(t, n, r, s) {
    var o, i, a, c, u, d, l, m = !1, f = t.bMarks[n] + t.tShift[n], v = t.eMarks[n];
    if (t.sCount[n] - t.blkIndent >= 4 || f + 3 > v || (o = t.src.charCodeAt(f), o !== 126 && o !== 96) || (u = f, f = t.skipChars(f, o), i = f - u, i < 3) || (l = t.src.slice(u, f), a = t.src.slice(f, v), o === 96 && a.indexOf(String.fromCharCode(o)) >= 0))
      return !1;
    if (s)
      return !0;
    for (c = n; c++, !(c >= r || (f = u = t.bMarks[c] + t.tShift[c], v = t.eMarks[c], f < v && t.sCount[c] < t.blkIndent)); )
      if (t.src.charCodeAt(f) === o && !(t.sCount[c] - t.blkIndent >= 4) && (f = t.skipChars(f, o), !(f - u < i) && (f = t.skipSpaces(f), !(f < v)))) {
        m = !0;
        break;
      }
    return i = t.sCount[n], t.line = c + (m ? 1 : 0), d = t.push("fence", "code", 0), d.info = a, d.content = t.getLines(n + 1, c, i, !0), d.markup = l, d.map = [n, t.line], !0;
  }), Ai;
}
var $i, bf;
function Kge() {
  if (bf) return $i;
  bf = 1;
  var e = Ie().isSpace;
  return $i = function(n, r, s, o) {
    var i, a, c, u, d, l, m, f, v, g, y, h, w, k, C, A, E, $, M, O, R = n.lineMax, B = n.bMarks[r] + n.tShift[r], V = n.eMarks[r];
    if (n.sCount[r] - n.blkIndent >= 4 || n.src.charCodeAt(B) !== 62)
      return !1;
    if (o)
      return !0;
    for (g = [], y = [], k = [], C = [], $ = n.md.block.ruler.getRules("blockquote"), w = n.parentType, n.parentType = "blockquote", f = r; f < s && (O = n.sCount[f] < n.blkIndent, B = n.bMarks[f] + n.tShift[f], V = n.eMarks[f], !(B >= V)); f++) {
      if (n.src.charCodeAt(B++) === 62 && !O) {
        for (u = n.sCount[f] + 1, n.src.charCodeAt(B) === 32 ? (B++, u++, i = !1, A = !0) : n.src.charCodeAt(B) === 9 ? (A = !0, (n.bsCount[f] + u) % 4 === 3 ? (B++, u++, i = !1) : i = !0) : A = !1, v = u, g.push(n.bMarks[f]), n.bMarks[f] = B; B < V && (a = n.src.charCodeAt(B), e(a)); ) {
          a === 9 ? v += 4 - (v + n.bsCount[f] + (i ? 1 : 0)) % 4 : v++;
          B++;
        }
        l = B >= V, y.push(n.bsCount[f]), n.bsCount[f] = n.sCount[f] + 1 + (A ? 1 : 0), k.push(n.sCount[f]), n.sCount[f] = v - u, C.push(n.tShift[f]), n.tShift[f] = B - n.bMarks[f];
        continue;
      }
      if (l)
        break;
      for (E = !1, c = 0, d = $.length; c < d; c++)
        if ($[c](n, f, s, !0)) {
          E = !0;
          break;
        }
      if (E) {
        n.lineMax = f, n.blkIndent !== 0 && (g.push(n.bMarks[f]), y.push(n.bsCount[f]), C.push(n.tShift[f]), k.push(n.sCount[f]), n.sCount[f] -= n.blkIndent);
        break;
      }
      g.push(n.bMarks[f]), y.push(n.bsCount[f]), C.push(n.tShift[f]), k.push(n.sCount[f]), n.sCount[f] = -1;
    }
    for (h = n.blkIndent, n.blkIndent = 0, M = n.push("blockquote_open", "blockquote", 1), M.markup = ">", M.map = m = [r, 0], n.md.block.tokenize(n, r, f), M = n.push("blockquote_close", "blockquote", -1), M.markup = ">", n.lineMax = R, n.parentType = w, m[1] = n.line, c = 0; c < C.length; c++)
      n.bMarks[c + r] = g[c], n.tShift[c + r] = C[c], n.sCount[c + r] = k[c], n.bsCount[c + r] = y[c];
    return n.blkIndent = h, !0;
  }, $i;
}
var Mi, yf;
function Xge() {
  if (yf) return Mi;
  yf = 1;
  var e = Ie().isSpace;
  return Mi = function(n, r, s, o) {
    var i, a, c, u, d = n.bMarks[r] + n.tShift[r], l = n.eMarks[r];
    if (n.sCount[r] - n.blkIndent >= 4 || (i = n.src.charCodeAt(d++), i !== 42 && i !== 45 && i !== 95))
      return !1;
    for (a = 1; d < l; ) {
      if (c = n.src.charCodeAt(d++), c !== i && !e(c))
        return !1;
      c === i && a++;
    }
    return a < 3 ? !1 : (o || (n.line = r + 1, u = n.push("hr", "hr", 0), u.map = [r, n.line], u.markup = Array(a + 1).join(String.fromCharCode(i))), !0);
  }, Mi;
}
var Ii, wf;
function Yge() {
  if (wf) return Ii;
  wf = 1;
  var e = Ie().isSpace;
  function t(s, o) {
    var i, a, c, u;
    return a = s.bMarks[o] + s.tShift[o], c = s.eMarks[o], i = s.src.charCodeAt(a++), i !== 42 && i !== 45 && i !== 43 || a < c && (u = s.src.charCodeAt(a), !e(u)) ? -1 : a;
  }
  function n(s, o) {
    var i, a = s.bMarks[o] + s.tShift[o], c = a, u = s.eMarks[o];
    if (c + 1 >= u || (i = s.src.charCodeAt(c++), i < 48 || i > 57))
      return -1;
    for (; ; ) {
      if (c >= u)
        return -1;
      if (i = s.src.charCodeAt(c++), i >= 48 && i <= 57) {
        if (c - a >= 10)
          return -1;
        continue;
      }
      if (i === 41 || i === 46)
        break;
      return -1;
    }
    return c < u && (i = s.src.charCodeAt(c), !e(i)) ? -1 : c;
  }
  function r(s, o) {
    var i, a, c = s.level + 2;
    for (i = o + 2, a = s.tokens.length - 2; i < a; i++)
      s.tokens[i].level === c && s.tokens[i].type === "paragraph_open" && (s.tokens[i + 2].hidden = !0, s.tokens[i].hidden = !0, i += 2);
  }
  return Ii = function(o, i, a, c) {
    var u, d, l, m, f, v, g, y, h, w, k, C, A, E, $, M, O, R, B, V, re, P, U, z, N, F, Z, W = i, pe = !1, le = !0;
    if (o.sCount[W] - o.blkIndent >= 4 || o.listIndent >= 0 && o.sCount[W] - o.listIndent >= 4 && o.sCount[W] < o.blkIndent)
      return !1;
    if (c && o.parentType === "paragraph" && o.sCount[W] >= o.blkIndent && (pe = !0), (P = n(o, W)) >= 0) {
      if (g = !0, z = o.bMarks[W] + o.tShift[W], A = Number(o.src.slice(z, P - 1)), pe && A !== 1) return !1;
    } else if ((P = t(o, W)) >= 0)
      g = !1;
    else
      return !1;
    if (pe && o.skipSpaces(P) >= o.eMarks[W])
      return !1;
    if (c)
      return !0;
    for (C = o.src.charCodeAt(P - 1), k = o.tokens.length, g ? (Z = o.push("ordered_list_open", "ol", 1), A !== 1 && (Z.attrs = [["start", A]])) : Z = o.push("bullet_list_open", "ul", 1), Z.map = w = [W, 0], Z.markup = String.fromCharCode(C), U = !1, F = o.md.block.ruler.getRules("list"), O = o.parentType, o.parentType = "list"; W < a; ) {
      for (re = P, E = o.eMarks[W], v = $ = o.sCount[W] + P - (o.bMarks[W] + o.tShift[W]); re < E; ) {
        if (u = o.src.charCodeAt(re), u === 9)
          $ += 4 - ($ + o.bsCount[W]) % 4;
        else if (u === 32)
          $++;
        else
          break;
        re++;
      }
      if (d = re, d >= E ? f = 1 : f = $ - v, f > 4 && (f = 1), m = v + f, Z = o.push("list_item_open", "li", 1), Z.markup = String.fromCharCode(C), Z.map = y = [W, 0], g && (Z.info = o.src.slice(z, P - 1)), V = o.tight, B = o.tShift[W], R = o.sCount[W], M = o.listIndent, o.listIndent = o.blkIndent, o.blkIndent = m, o.tight = !0, o.tShift[W] = d - o.bMarks[W], o.sCount[W] = $, d >= E && o.isEmpty(W + 1) ? o.line = Math.min(o.line + 2, a) : o.md.block.tokenize(o, W, a, !0), (!o.tight || U) && (le = !1), U = o.line - W > 1 && o.isEmpty(o.line - 1), o.blkIndent = o.listIndent, o.listIndent = M, o.tShift[W] = B, o.sCount[W] = R, o.tight = V, Z = o.push("list_item_close", "li", -1), Z.markup = String.fromCharCode(C), W = o.line, y[1] = W, W >= a || o.sCount[W] < o.blkIndent || o.sCount[W] - o.blkIndent >= 4)
        break;
      for (N = !1, l = 0, h = F.length; l < h; l++)
        if (F[l](o, W, a, !0)) {
          N = !0;
          break;
        }
      if (N)
        break;
      if (g) {
        if (P = n(o, W), P < 0)
          break;
        z = o.bMarks[W] + o.tShift[W];
      } else if (P = t(o, W), P < 0)
        break;
      if (C !== o.src.charCodeAt(P - 1))
        break;
    }
    return g ? Z = o.push("ordered_list_close", "ol", -1) : Z = o.push("bullet_list_close", "ul", -1), Z.markup = String.fromCharCode(C), w[1] = W, o.line = W, o.parentType = O, le && r(o, k), !0;
  }, Ii;
}
var Ti, kf;
function Jge() {
  if (kf) return Ti;
  kf = 1;
  var e = Ie().normalizeReference, t = Ie().isSpace;
  return Ti = function(r, s, o, i) {
    var a, c, u, d, l, m, f, v, g, y, h, w, k, C, A, E, $ = 0, M = r.bMarks[s] + r.tShift[s], O = r.eMarks[s], R = s + 1;
    if (r.sCount[s] - r.blkIndent >= 4 || r.src.charCodeAt(M) !== 91)
      return !1;
    for (; ++M < O; )
      if (r.src.charCodeAt(M) === 93 && r.src.charCodeAt(M - 1) !== 92) {
        if (M + 1 === O || r.src.charCodeAt(M + 1) !== 58)
          return !1;
        break;
      }
    for (d = r.lineMax, A = r.md.block.ruler.getRules("reference"), y = r.parentType, r.parentType = "reference"; R < d && !r.isEmpty(R); R++)
      if (!(r.sCount[R] - r.blkIndent > 3) && !(r.sCount[R] < 0)) {
        for (C = !1, m = 0, f = A.length; m < f; m++)
          if (A[m](r, R, d, !0)) {
            C = !0;
            break;
          }
        if (C)
          break;
      }
    for (k = r.getLines(s, R, r.blkIndent, !1).trim(), O = k.length, M = 1; M < O; M++) {
      if (a = k.charCodeAt(M), a === 91)
        return !1;
      if (a === 93) {
        g = M;
        break;
      } else a === 10 ? $++ : a === 92 && (M++, M < O && k.charCodeAt(M) === 10 && $++);
    }
    if (g < 0 || k.charCodeAt(g + 1) !== 58)
      return !1;
    for (M = g + 2; M < O; M++)
      if (a = k.charCodeAt(M), a === 10)
        $++;
      else if (!t(a)) break;
    if (h = r.md.helpers.parseLinkDestination(k, M, O), !h.ok || (l = r.md.normalizeLink(h.str), !r.md.validateLink(l)))
      return !1;
    for (M = h.pos, $ += h.lines, c = M, u = $, w = M; M < O; M++)
      if (a = k.charCodeAt(M), a === 10)
        $++;
      else if (!t(a)) break;
    for (h = r.md.helpers.parseLinkTitle(k, M, O), M < O && w !== M && h.ok ? (E = h.str, M = h.pos, $ += h.lines) : (E = "", M = c, $ = u); M < O && (a = k.charCodeAt(M), !!t(a)); )
      M++;
    if (M < O && k.charCodeAt(M) !== 10 && E)
      for (E = "", M = c, $ = u; M < O && (a = k.charCodeAt(M), !!t(a)); )
        M++;
    return M < O && k.charCodeAt(M) !== 10 || (v = e(k.slice(1, g)), !v) ? !1 : (i || (typeof r.env.references > "u" && (r.env.references = {}), typeof r.env.references[v] > "u" && (r.env.references[v] = { title: E, href: l }), r.parentType = y, r.line = s + $ + 1), !0);
  }, Ti;
}
var Li, Cf;
function Qge() {
  return Cf || (Cf = 1, Li = [
    "address",
    "article",
    "aside",
    "base",
    "basefont",
    "blockquote",
    "body",
    "caption",
    "center",
    "col",
    "colgroup",
    "dd",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "iframe",
    "legend",
    "li",
    "link",
    "main",
    "menu",
    "menuitem",
    "nav",
    "noframes",
    "ol",
    "optgroup",
    "option",
    "p",
    "param",
    "section",
    "source",
    "summary",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "title",
    "tr",
    "track",
    "ul"
  ]), Li;
}
var Io = {}, xf;
function bm() {
  if (xf) return Io;
  xf = 1;
  var e = "[a-zA-Z_:][a-zA-Z0-9:._-]*", t = "[^\"'=<>`\\x00-\\x20]+", n = "'[^']*'", r = '"[^"]*"', s = "(?:" + t + "|" + n + "|" + r + ")", o = "(?:\\s+" + e + "(?:\\s*=\\s*" + s + ")?)", i = "<[A-Za-z][A-Za-z0-9\\-]*" + o + "*\\s*\\/?>", a = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", c = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->", u = "<[?][\\s\\S]*?[?]>", d = "<![A-Z]+\\s+[^>]*>", l = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>", m = new RegExp("^(?:" + i + "|" + a + "|" + c + "|" + u + "|" + d + "|" + l + ")"), f = new RegExp("^(?:" + i + "|" + a + ")");
  return Io.HTML_TAG_RE = m, Io.HTML_OPEN_CLOSE_TAG_RE = f, Io;
}
var Oi, Sf;
function eme() {
  if (Sf) return Oi;
  Sf = 1;
  var e = Qge(), t = bm().HTML_OPEN_CLOSE_TAG_RE, n = [
    [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, !0],
    [/^<!--/, /-->/, !0],
    [/^<\?/, /\?>/, !0],
    [/^<![A-Z]/, />/, !0],
    [/^<!\[CDATA\[/, /\]\]>/, !0],
    [new RegExp("^</?(" + e.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0],
    [new RegExp(t.source + "\\s*$"), /^$/, !1]
  ];
  return Oi = function(s, o, i, a) {
    var c, u, d, l, m = s.bMarks[o] + s.tShift[o], f = s.eMarks[o];
    if (s.sCount[o] - s.blkIndent >= 4 || !s.md.options.html || s.src.charCodeAt(m) !== 60)
      return !1;
    for (l = s.src.slice(m, f), c = 0; c < n.length && !n[c][0].test(l); c++)
      ;
    if (c === n.length)
      return !1;
    if (a)
      return n[c][2];
    if (u = o + 1, !n[c][1].test(l)) {
      for (; u < i && !(s.sCount[u] < s.blkIndent); u++)
        if (m = s.bMarks[u] + s.tShift[u], f = s.eMarks[u], l = s.src.slice(m, f), n[c][1].test(l)) {
          l.length !== 0 && u++;
          break;
        }
    }
    return s.line = u, d = s.push("html_block", "", 0), d.map = [o, u], d.content = s.getLines(o, u, s.blkIndent, !0), !0;
  }, Oi;
}
var Ri, Ef;
function tme() {
  if (Ef) return Ri;
  Ef = 1;
  var e = Ie().isSpace;
  return Ri = function(n, r, s, o) {
    var i, a, c, u, d = n.bMarks[r] + n.tShift[r], l = n.eMarks[r];
    if (n.sCount[r] - n.blkIndent >= 4 || (i = n.src.charCodeAt(d), i !== 35 || d >= l))
      return !1;
    for (a = 1, i = n.src.charCodeAt(++d); i === 35 && d < l && a <= 6; )
      a++, i = n.src.charCodeAt(++d);
    return a > 6 || d < l && !e(i) ? !1 : (o || (l = n.skipSpacesBack(l, d), c = n.skipCharsBack(l, 35, d), c > d && e(n.src.charCodeAt(c - 1)) && (l = c), n.line = r + 1, u = n.push("heading_open", "h" + String(a), 1), u.markup = "########".slice(0, a), u.map = [r, n.line], u = n.push("inline", "", 0), u.content = n.src.slice(d, l).trim(), u.map = [r, n.line], u.children = [], u = n.push("heading_close", "h" + String(a), -1), u.markup = "########".slice(0, a)), !0);
  }, Ri;
}
var Pi, Af;
function nme() {
  return Af || (Af = 1, Pi = function(t, n, r) {
    var s, o, i, a, c, u, d, l, m, f = n + 1, v, g = t.md.block.ruler.getRules("paragraph");
    if (t.sCount[n] - t.blkIndent >= 4)
      return !1;
    for (v = t.parentType, t.parentType = "paragraph"; f < r && !t.isEmpty(f); f++)
      if (!(t.sCount[f] - t.blkIndent > 3)) {
        if (t.sCount[f] >= t.blkIndent && (u = t.bMarks[f] + t.tShift[f], d = t.eMarks[f], u < d && (m = t.src.charCodeAt(u), (m === 45 || m === 61) && (u = t.skipChars(u, m), u = t.skipSpaces(u), u >= d)))) {
          l = m === 61 ? 1 : 2;
          break;
        }
        if (!(t.sCount[f] < 0)) {
          for (o = !1, i = 0, a = g.length; i < a; i++)
            if (g[i](t, f, r, !0)) {
              o = !0;
              break;
            }
          if (o)
            break;
        }
      }
    return l ? (s = t.getLines(n, f, t.blkIndent, !1).trim(), t.line = f + 1, c = t.push("heading_open", "h" + String(l), 1), c.markup = String.fromCharCode(m), c.map = [n, t.line], c = t.push("inline", "", 0), c.content = s, c.map = [n, t.line - 1], c.children = [], c = t.push("heading_close", "h" + String(l), -1), c.markup = String.fromCharCode(m), t.parentType = v, !0) : !1;
  }), Pi;
}
var Bi, $f;
function rme() {
  return $f || ($f = 1, Bi = function(t, n, r) {
    var s, o, i, a, c, u, d = n + 1, l = t.md.block.ruler.getRules("paragraph");
    for (u = t.parentType, t.parentType = "paragraph"; d < r && !t.isEmpty(d); d++)
      if (!(t.sCount[d] - t.blkIndent > 3) && !(t.sCount[d] < 0)) {
        for (o = !1, i = 0, a = l.length; i < a; i++)
          if (l[i](t, d, r, !0)) {
            o = !0;
            break;
          }
        if (o)
          break;
      }
    return s = t.getLines(n, d, t.blkIndent, !1).trim(), t.line = d, c = t.push("paragraph_open", "p", 1), c.map = [n, t.line], c = t.push("inline", "", 0), c.content = s, c.map = [n, t.line], c.children = [], c = t.push("paragraph_close", "p", -1), t.parentType = u, !0;
  }), Bi;
}
var zi, Mf;
function ome() {
  if (Mf) return zi;
  Mf = 1;
  var e = Ll(), t = Ie().isSpace;
  function n(r, s, o, i) {
    var a, c, u, d, l, m, f, v;
    for (this.src = r, this.md = s, this.env = o, this.tokens = i, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.ddIndent = -1, this.listIndent = -1, this.parentType = "root", this.level = 0, this.result = "", c = this.src, v = !1, u = d = m = f = 0, l = c.length; d < l; d++) {
      if (a = c.charCodeAt(d), !v)
        if (t(a)) {
          m++, a === 9 ? f += 4 - f % 4 : f++;
          continue;
        } else
          v = !0;
      (a === 10 || d === l - 1) && (a !== 10 && d++, this.bMarks.push(u), this.eMarks.push(d), this.tShift.push(m), this.sCount.push(f), this.bsCount.push(0), v = !1, m = 0, f = 0, u = d + 1);
    }
    this.bMarks.push(c.length), this.eMarks.push(c.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
  }
  return n.prototype.push = function(r, s, o) {
    var i = new e(r, s, o);
    return i.block = !0, o < 0 && this.level--, i.level = this.level, o > 0 && this.level++, this.tokens.push(i), i;
  }, n.prototype.isEmpty = function(s) {
    return this.bMarks[s] + this.tShift[s] >= this.eMarks[s];
  }, n.prototype.skipEmptyLines = function(s) {
    for (var o = this.lineMax; s < o && !(this.bMarks[s] + this.tShift[s] < this.eMarks[s]); s++)
      ;
    return s;
  }, n.prototype.skipSpaces = function(s) {
    for (var o, i = this.src.length; s < i && (o = this.src.charCodeAt(s), !!t(o)); s++)
      ;
    return s;
  }, n.prototype.skipSpacesBack = function(s, o) {
    if (s <= o)
      return s;
    for (; s > o; )
      if (!t(this.src.charCodeAt(--s)))
        return s + 1;
    return s;
  }, n.prototype.skipChars = function(s, o) {
    for (var i = this.src.length; s < i && this.src.charCodeAt(s) === o; s++)
      ;
    return s;
  }, n.prototype.skipCharsBack = function(s, o, i) {
    if (s <= i)
      return s;
    for (; s > i; )
      if (o !== this.src.charCodeAt(--s))
        return s + 1;
    return s;
  }, n.prototype.getLines = function(s, o, i, a) {
    var c, u, d, l, m, f, v, g = s;
    if (s >= o)
      return "";
    for (f = new Array(o - s), c = 0; g < o; g++, c++) {
      for (u = 0, v = l = this.bMarks[g], g + 1 < o || a ? m = this.eMarks[g] + 1 : m = this.eMarks[g]; l < m && u < i; ) {
        if (d = this.src.charCodeAt(l), t(d))
          d === 9 ? u += 4 - (u + this.bsCount[g]) % 4 : u++;
        else if (l - v < this.tShift[g])
          u++;
        else
          break;
        l++;
      }
      u > i ? f[c] = new Array(u - i + 1).join(" ") + this.src.slice(l, m) : f[c] = this.src.slice(l, m);
    }
    return f.join("");
  }, n.prototype.Token = e, zi = n, zi;
}
var Di, If;
function sme() {
  if (If) return Di;
  If = 1;
  var e = Tl(), t = [
    // First 2 params - rule name & source. Secondary array - list of rules,
    // which can be terminated by this one.
    ["table", Zge(), ["paragraph", "reference"]],
    ["code", Wge()],
    ["fence", Gge(), ["paragraph", "reference", "blockquote", "list"]],
    ["blockquote", Kge(), ["paragraph", "reference", "blockquote", "list"]],
    ["hr", Xge(), ["paragraph", "reference", "blockquote", "list"]],
    ["list", Yge(), ["paragraph", "reference", "blockquote"]],
    ["reference", Jge()],
    ["html_block", eme(), ["paragraph", "reference", "blockquote"]],
    ["heading", tme(), ["paragraph", "reference", "blockquote"]],
    ["lheading", nme()],
    ["paragraph", rme()]
  ];
  function n() {
    this.ruler = new e();
    for (var r = 0; r < t.length; r++)
      this.ruler.push(t[r][0], t[r][1], { alt: (t[r][2] || []).slice() });
  }
  return n.prototype.tokenize = function(r, s, o) {
    for (var i, a, c, u = this.ruler.getRules(""), d = u.length, l = s, m = !1, f = r.md.options.maxNesting; l < o && (r.line = l = r.skipEmptyLines(l), !(l >= o || r.sCount[l] < r.blkIndent)); ) {
      if (r.level >= f) {
        r.line = o;
        break;
      }
      for (c = r.line, a = 0; a < d; a++)
        if (i = u[a](r, l, o, !1), i) {
          if (c >= r.line)
            throw new Error("block rule didn't increment state.line");
          break;
        }
      if (!i) throw new Error("none of the block rules matched");
      r.tight = !m, r.isEmpty(r.line - 1) && (m = !0), l = r.line, l < o && r.isEmpty(l) && (m = !0, l++, r.line = l);
    }
  }, n.prototype.parse = function(r, s, o, i) {
    var a;
    r && (a = new this.State(r, s, o, i), this.tokenize(a, a.line, a.lineMax));
  }, n.prototype.State = ome(), Di = n, Di;
}
var Ni, Tf;
function ime() {
  if (Tf) return Ni;
  Tf = 1;
  function e(t) {
    switch (t) {
      case 10:
      case 33:
      case 35:
      case 36:
      case 37:
      case 38:
      case 42:
      case 43:
      case 45:
      case 58:
      case 60:
      case 61:
      case 62:
      case 64:
      case 91:
      case 92:
      case 93:
      case 94:
      case 95:
      case 96:
      case 123:
      case 125:
      case 126:
        return !0;
      default:
        return !1;
    }
  }
  return Ni = function(n, r) {
    for (var s = n.pos; s < n.posMax && !e(n.src.charCodeAt(s)); )
      s++;
    return s === n.pos ? !1 : (r || (n.pending += n.src.slice(n.pos, s)), n.pos = s, !0);
  }, Ni;
}
var qi, Lf;
function ame() {
  if (Lf) return qi;
  Lf = 1;
  var e = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
  return qi = function(n, r) {
    var s, o, i, a, c, u, d, l;
    return !n.md.options.linkify || n.linkLevel > 0 || (s = n.pos, o = n.posMax, s + 3 > o) || n.src.charCodeAt(s) !== 58 || n.src.charCodeAt(s + 1) !== 47 || n.src.charCodeAt(s + 2) !== 47 || (i = n.pending.match(e), !i) || (a = i[1], c = n.md.linkify.matchAtStart(n.src.slice(s - a.length)), !c) || (u = c.url, u.length <= a.length) || (u = u.replace(/\*+$/, ""), d = n.md.normalizeLink(u), !n.md.validateLink(d)) ? !1 : (r || (n.pending = n.pending.slice(0, -a.length), l = n.push("link_open", "a", 1), l.attrs = [["href", d]], l.markup = "linkify", l.info = "auto", l = n.push("text", "", 0), l.content = n.md.normalizeLinkText(u), l = n.push("link_close", "a", -1), l.markup = "linkify", l.info = "auto"), n.pos += u.length - a.length, !0);
  }, qi;
}
var Fi, Of;
function cme() {
  if (Of) return Fi;
  Of = 1;
  var e = Ie().isSpace;
  return Fi = function(n, r) {
    var s, o, i, a = n.pos;
    if (n.src.charCodeAt(a) !== 10)
      return !1;
    if (s = n.pending.length - 1, o = n.posMax, !r)
      if (s >= 0 && n.pending.charCodeAt(s) === 32)
        if (s >= 1 && n.pending.charCodeAt(s - 1) === 32) {
          for (i = s - 1; i >= 1 && n.pending.charCodeAt(i - 1) === 32; ) i--;
          n.pending = n.pending.slice(0, i), n.push("hardbreak", "br", 0);
        } else
          n.pending = n.pending.slice(0, -1), n.push("softbreak", "br", 0);
      else
        n.push("softbreak", "br", 0);
    for (a++; a < o && e(n.src.charCodeAt(a)); )
      a++;
    return n.pos = a, !0;
  }, Fi;
}
var ji, Rf;
function lme() {
  if (Rf) return ji;
  Rf = 1;
  for (var e = Ie().isSpace, t = [], n = 0; n < 256; n++)
    t.push(0);
  return "\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(r) {
    t[r.charCodeAt(0)] = 1;
  }), ji = function(s, o) {
    var i, a, c, u, d, l = s.pos, m = s.posMax;
    if (s.src.charCodeAt(l) !== 92 || (l++, l >= m)) return !1;
    if (i = s.src.charCodeAt(l), i === 10) {
      for (o || s.push("hardbreak", "br", 0), l++; l < m && (i = s.src.charCodeAt(l), !!e(i)); )
        l++;
      return s.pos = l, !0;
    }
    return u = s.src[l], i >= 55296 && i <= 56319 && l + 1 < m && (a = s.src.charCodeAt(l + 1), a >= 56320 && a <= 57343 && (u += s.src[l + 1], l++)), c = "\\" + u, o || (d = s.push("text_special", "", 0), i < 256 && t[i] !== 0 ? d.content = u : d.content = c, d.markup = c, d.info = "escape"), s.pos = l + 1, !0;
  }, ji;
}
var Hi, Pf;
function ume() {
  return Pf || (Pf = 1, Hi = function(t, n) {
    var r, s, o, i, a, c, u, d, l = t.pos, m = t.src.charCodeAt(l);
    if (m !== 96)
      return !1;
    for (r = l, l++, s = t.posMax; l < s && t.src.charCodeAt(l) === 96; )
      l++;
    if (o = t.src.slice(r, l), u = o.length, t.backticksScanned && (t.backticks[u] || 0) <= r)
      return n || (t.pending += o), t.pos += u, !0;
    for (c = l; (a = t.src.indexOf("`", c)) !== -1; ) {
      for (c = a + 1; c < s && t.src.charCodeAt(c) === 96; )
        c++;
      if (d = c - a, d === u)
        return n || (i = t.push("code_inline", "code", 0), i.markup = o, i.content = t.src.slice(l, a).replace(/\n/g, " ").replace(/^ (.+) $/, "$1")), t.pos = c, !0;
      t.backticks[d] = a;
    }
    return t.backticksScanned = !0, n || (t.pending += o), t.pos += u, !0;
  }), Hi;
}
var To = {}, Bf;
function zf() {
  if (Bf) return To;
  Bf = 1, To.tokenize = function(n, r) {
    var s, o, i, a, c, u = n.pos, d = n.src.charCodeAt(u);
    if (r || d !== 126 || (o = n.scanDelims(n.pos, !0), a = o.length, c = String.fromCharCode(d), a < 2))
      return !1;
    for (a % 2 && (i = n.push("text", "", 0), i.content = c, a--), s = 0; s < a; s += 2)
      i = n.push("text", "", 0), i.content = c + c, n.delimiters.push({
        marker: d,
        length: 0,
        // disable "rule of 3" length checks meant for emphasis
        token: n.tokens.length - 1,
        end: -1,
        open: o.can_open,
        close: o.can_close
      });
    return n.pos += o.length, !0;
  };
  function e(t, n) {
    var r, s, o, i, a, c = [], u = n.length;
    for (r = 0; r < u; r++)
      o = n[r], o.marker === 126 && o.end !== -1 && (i = n[o.end], a = t.tokens[o.token], a.type = "s_open", a.tag = "s", a.nesting = 1, a.markup = "~~", a.content = "", a = t.tokens[i.token], a.type = "s_close", a.tag = "s", a.nesting = -1, a.markup = "~~", a.content = "", t.tokens[i.token - 1].type === "text" && t.tokens[i.token - 1].content === "~" && c.push(i.token - 1));
    for (; c.length; ) {
      for (r = c.pop(), s = r + 1; s < t.tokens.length && t.tokens[s].type === "s_close"; )
        s++;
      s--, r !== s && (a = t.tokens[s], t.tokens[s] = t.tokens[r], t.tokens[r] = a);
    }
  }
  return To.postProcess = function(n) {
    var r, s = n.tokens_meta, o = n.tokens_meta.length;
    for (e(n, n.delimiters), r = 0; r < o; r++)
      s[r] && s[r].delimiters && e(n, s[r].delimiters);
  }, To;
}
var Lo = {}, Df;
function Nf() {
  if (Df) return Lo;
  Df = 1, Lo.tokenize = function(n, r) {
    var s, o, i, a = n.pos, c = n.src.charCodeAt(a);
    if (r || c !== 95 && c !== 42)
      return !1;
    for (o = n.scanDelims(n.pos, c === 42), s = 0; s < o.length; s++)
      i = n.push("text", "", 0), i.content = String.fromCharCode(c), n.delimiters.push({
        // Char code of the starting marker (number).
        //
        marker: c,
        // Total length of these series of delimiters.
        //
        length: o.length,
        // A position of the token this delimiter corresponds to.
        //
        token: n.tokens.length - 1,
        // If this delimiter is matched as a valid opener, `end` will be
        // equal to its position, otherwise it's `-1`.
        //
        end: -1,
        // Boolean flags that determine if this delimiter could open or close
        // an emphasis.
        //
        open: o.can_open,
        close: o.can_close
      });
    return n.pos += o.length, !0;
  };
  function e(t, n) {
    var r, s, o, i, a, c, u = n.length;
    for (r = u - 1; r >= 0; r--)
      s = n[r], !(s.marker !== 95 && s.marker !== 42) && s.end !== -1 && (o = n[s.end], c = r > 0 && n[r - 1].end === s.end + 1 && // check that first two markers match and adjacent
      n[r - 1].marker === s.marker && n[r - 1].token === s.token - 1 && // check that last two markers are adjacent (we can safely assume they match)
      n[s.end + 1].token === o.token + 1, a = String.fromCharCode(s.marker), i = t.tokens[s.token], i.type = c ? "strong_open" : "em_open", i.tag = c ? "strong" : "em", i.nesting = 1, i.markup = c ? a + a : a, i.content = "", i = t.tokens[o.token], i.type = c ? "strong_close" : "em_close", i.tag = c ? "strong" : "em", i.nesting = -1, i.markup = c ? a + a : a, i.content = "", c && (t.tokens[n[r - 1].token].content = "", t.tokens[n[s.end + 1].token].content = "", r--));
  }
  return Lo.postProcess = function(n) {
    var r, s = n.tokens_meta, o = n.tokens_meta.length;
    for (e(n, n.delimiters), r = 0; r < o; r++)
      s[r] && s[r].delimiters && e(n, s[r].delimiters);
  }, Lo;
}
var Vi, qf;
function dme() {
  if (qf) return Vi;
  qf = 1;
  var e = Ie().normalizeReference, t = Ie().isSpace;
  return Vi = function(r, s) {
    var o, i, a, c, u, d, l, m, f, v = "", g = "", y = r.pos, h = r.posMax, w = r.pos, k = !0;
    if (r.src.charCodeAt(r.pos) !== 91 || (u = r.pos + 1, c = r.md.helpers.parseLinkLabel(r, r.pos, !0), c < 0))
      return !1;
    if (d = c + 1, d < h && r.src.charCodeAt(d) === 40) {
      for (k = !1, d++; d < h && (i = r.src.charCodeAt(d), !(!t(i) && i !== 10)); d++)
        ;
      if (d >= h)
        return !1;
      if (w = d, l = r.md.helpers.parseLinkDestination(r.src, d, r.posMax), l.ok) {
        for (v = r.md.normalizeLink(l.str), r.md.validateLink(v) ? d = l.pos : v = "", w = d; d < h && (i = r.src.charCodeAt(d), !(!t(i) && i !== 10)); d++)
          ;
        if (l = r.md.helpers.parseLinkTitle(r.src, d, r.posMax), d < h && w !== d && l.ok)
          for (g = l.str, d = l.pos; d < h && (i = r.src.charCodeAt(d), !(!t(i) && i !== 10)); d++)
            ;
      }
      (d >= h || r.src.charCodeAt(d) !== 41) && (k = !0), d++;
    }
    if (k) {
      if (typeof r.env.references > "u")
        return !1;
      if (d < h && r.src.charCodeAt(d) === 91 ? (w = d + 1, d = r.md.helpers.parseLinkLabel(r, d), d >= 0 ? a = r.src.slice(w, d++) : d = c + 1) : d = c + 1, a || (a = r.src.slice(u, c)), m = r.env.references[e(a)], !m)
        return r.pos = y, !1;
      v = m.href, g = m.title;
    }
    return s || (r.pos = u, r.posMax = c, f = r.push("link_open", "a", 1), f.attrs = o = [["href", v]], g && o.push(["title", g]), r.linkLevel++, r.md.inline.tokenize(r), r.linkLevel--, f = r.push("link_close", "a", -1)), r.pos = d, r.posMax = h, !0;
  }, Vi;
}
var Ui, Ff;
function fme() {
  if (Ff) return Ui;
  Ff = 1;
  var e = Ie().normalizeReference, t = Ie().isSpace;
  return Ui = function(r, s) {
    var o, i, a, c, u, d, l, m, f, v, g, y, h, w = "", k = r.pos, C = r.posMax;
    if (r.src.charCodeAt(r.pos) !== 33 || r.src.charCodeAt(r.pos + 1) !== 91 || (d = r.pos + 2, u = r.md.helpers.parseLinkLabel(r, r.pos + 1, !1), u < 0))
      return !1;
    if (l = u + 1, l < C && r.src.charCodeAt(l) === 40) {
      for (l++; l < C && (i = r.src.charCodeAt(l), !(!t(i) && i !== 10)); l++)
        ;
      if (l >= C)
        return !1;
      for (h = l, f = r.md.helpers.parseLinkDestination(r.src, l, r.posMax), f.ok && (w = r.md.normalizeLink(f.str), r.md.validateLink(w) ? l = f.pos : w = ""), h = l; l < C && (i = r.src.charCodeAt(l), !(!t(i) && i !== 10)); l++)
        ;
      if (f = r.md.helpers.parseLinkTitle(r.src, l, r.posMax), l < C && h !== l && f.ok)
        for (v = f.str, l = f.pos; l < C && (i = r.src.charCodeAt(l), !(!t(i) && i !== 10)); l++)
          ;
      else
        v = "";
      if (l >= C || r.src.charCodeAt(l) !== 41)
        return r.pos = k, !1;
      l++;
    } else {
      if (typeof r.env.references > "u")
        return !1;
      if (l < C && r.src.charCodeAt(l) === 91 ? (h = l + 1, l = r.md.helpers.parseLinkLabel(r, l), l >= 0 ? c = r.src.slice(h, l++) : l = u + 1) : l = u + 1, c || (c = r.src.slice(d, u)), m = r.env.references[e(c)], !m)
        return r.pos = k, !1;
      w = m.href, v = m.title;
    }
    return s || (a = r.src.slice(d, u), r.md.inline.parse(
      a,
      r.md,
      r.env,
      y = []
    ), g = r.push("image", "img", 0), g.attrs = o = [["src", w], ["alt", ""]], g.children = y, g.content = a, v && o.push(["title", v])), r.pos = l, r.posMax = C, !0;
  }, Ui;
}
var Zi, jf;
function pme() {
  if (jf) return Zi;
  jf = 1;
  var e = /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/, t = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/;
  return Zi = function(r, s) {
    var o, i, a, c, u, d, l = r.pos;
    if (r.src.charCodeAt(l) !== 60)
      return !1;
    for (u = r.pos, d = r.posMax; ; ) {
      if (++l >= d || (c = r.src.charCodeAt(l), c === 60)) return !1;
      if (c === 62) break;
    }
    return o = r.src.slice(u + 1, l), t.test(o) ? (i = r.md.normalizeLink(o), r.md.validateLink(i) ? (s || (a = r.push("link_open", "a", 1), a.attrs = [["href", i]], a.markup = "autolink", a.info = "auto", a = r.push("text", "", 0), a.content = r.md.normalizeLinkText(o), a = r.push("link_close", "a", -1), a.markup = "autolink", a.info = "auto"), r.pos += o.length + 2, !0) : !1) : e.test(o) ? (i = r.md.normalizeLink("mailto:" + o), r.md.validateLink(i) ? (s || (a = r.push("link_open", "a", 1), a.attrs = [["href", i]], a.markup = "autolink", a.info = "auto", a = r.push("text", "", 0), a.content = r.md.normalizeLinkText(o), a = r.push("link_close", "a", -1), a.markup = "autolink", a.info = "auto"), r.pos += o.length + 2, !0) : !1) : !1;
  }, Zi;
}
var Wi, Hf;
function hme() {
  if (Hf) return Wi;
  Hf = 1;
  var e = bm().HTML_TAG_RE;
  function t(s) {
    return /^<a[>\s]/i.test(s);
  }
  function n(s) {
    return /^<\/a\s*>/i.test(s);
  }
  function r(s) {
    var o = s | 32;
    return o >= 97 && o <= 122;
  }
  return Wi = function(o, i) {
    var a, c, u, d, l = o.pos;
    return !o.md.options.html || (u = o.posMax, o.src.charCodeAt(l) !== 60 || l + 2 >= u) || (a = o.src.charCodeAt(l + 1), a !== 33 && a !== 63 && a !== 47 && !r(a)) || (c = o.src.slice(l).match(e), !c) ? !1 : (i || (d = o.push("html_inline", "", 0), d.content = c[0], t(d.content) && o.linkLevel++, n(d.content) && o.linkLevel--), o.pos += c[0].length, !0);
  }, Wi;
}
var Gi, Vf;
function gme() {
  if (Vf) return Gi;
  Vf = 1;
  var e = hm(), t = Ie().has, n = Ie().isValidEntityCode, r = Ie().fromCodePoint, s = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i, o = /^&([a-z][a-z0-9]{1,31});/i;
  return Gi = function(a, c) {
    var u, d, l, m, f = a.pos, v = a.posMax;
    if (a.src.charCodeAt(f) !== 38 || f + 1 >= v) return !1;
    if (u = a.src.charCodeAt(f + 1), u === 35) {
      if (l = a.src.slice(f).match(s), l)
        return c || (d = l[1][0].toLowerCase() === "x" ? parseInt(l[1].slice(1), 16) : parseInt(l[1], 10), m = a.push("text_special", "", 0), m.content = n(d) ? r(d) : r(65533), m.markup = l[0], m.info = "entity"), a.pos += l[0].length, !0;
    } else if (l = a.src.slice(f).match(o), l && t(e, l[1]))
      return c || (m = a.push("text_special", "", 0), m.content = e[l[1]], m.markup = l[0], m.info = "entity"), a.pos += l[0].length, !0;
    return !1;
  }, Gi;
}
var Ki, Uf;
function mme() {
  if (Uf) return Ki;
  Uf = 1;
  function e(t) {
    var n, r, s, o, i, a, c, u, d = {}, l = t.length;
    if (l) {
      var m = 0, f = -2, v = [];
      for (n = 0; n < l; n++)
        if (s = t[n], v.push(0), (t[m].marker !== s.marker || f !== s.token - 1) && (m = n), f = s.token, s.length = s.length || 0, !!s.close) {
          for (d.hasOwnProperty(s.marker) || (d[s.marker] = [-1, -1, -1, -1, -1, -1]), i = d[s.marker][(s.open ? 3 : 0) + s.length % 3], r = m - v[m] - 1, a = r; r > i; r -= v[r] + 1)
            if (o = t[r], o.marker === s.marker && o.open && o.end < 0 && (c = !1, (o.close || s.open) && (o.length + s.length) % 3 === 0 && (o.length % 3 !== 0 || s.length % 3 !== 0) && (c = !0), !c)) {
              u = r > 0 && !t[r - 1].open ? v[r - 1] + 1 : 0, v[n] = n - r + u, v[r] = u, s.open = !1, o.end = n, o.close = !1, a = -1, f = -2;
              break;
            }
          a !== -1 && (d[s.marker][(s.open ? 3 : 0) + (s.length || 0) % 3] = a);
        }
    }
  }
  return Ki = function(n) {
    var r, s = n.tokens_meta, o = n.tokens_meta.length;
    for (e(n.delimiters), r = 0; r < o; r++)
      s[r] && s[r].delimiters && e(s[r].delimiters);
  }, Ki;
}
var Xi, Zf;
function vme() {
  return Zf || (Zf = 1, Xi = function(t) {
    var n, r, s = 0, o = t.tokens, i = t.tokens.length;
    for (n = r = 0; n < i; n++)
      o[n].nesting < 0 && s--, o[n].level = s, o[n].nesting > 0 && s++, o[n].type === "text" && n + 1 < i && o[n + 1].type === "text" ? o[n + 1].content = o[n].content + o[n + 1].content : (n !== r && (o[r] = o[n]), r++);
    n !== r && (o.length = r);
  }), Xi;
}
var Yi, Wf;
function _me() {
  if (Wf) return Yi;
  Wf = 1;
  var e = Ll(), t = Ie().isWhiteSpace, n = Ie().isPunctChar, r = Ie().isMdAsciiPunct;
  function s(o, i, a, c) {
    this.src = o, this.env = a, this.md = i, this.tokens = c, this.tokens_meta = Array(c.length), this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [], this._prev_delimiters = [], this.backticks = {}, this.backticksScanned = !1, this.linkLevel = 0;
  }
  return s.prototype.pushPending = function() {
    var o = new e("text", "", 0);
    return o.content = this.pending, o.level = this.pendingLevel, this.tokens.push(o), this.pending = "", o;
  }, s.prototype.push = function(o, i, a) {
    this.pending && this.pushPending();
    var c = new e(o, i, a), u = null;
    return a < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), c.level = this.level, a > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], u = { delimiters: this.delimiters }), this.pendingLevel = this.level, this.tokens.push(c), this.tokens_meta.push(u), c;
  }, s.prototype.scanDelims = function(o, i) {
    var a = o, c, u, d, l, m, f, v, g, y, h = !0, w = !0, k = this.posMax, C = this.src.charCodeAt(o);
    for (c = o > 0 ? this.src.charCodeAt(o - 1) : 32; a < k && this.src.charCodeAt(a) === C; )
      a++;
    return d = a - o, u = a < k ? this.src.charCodeAt(a) : 32, v = r(c) || n(String.fromCharCode(c)), y = r(u) || n(String.fromCharCode(u)), f = t(c), g = t(u), g ? h = !1 : y && (f || v || (h = !1)), f ? w = !1 : v && (g || y || (w = !1)), i ? (l = h, m = w) : (l = h && (!w || v), m = w && (!h || y)), {
      can_open: l,
      can_close: m,
      length: d
    };
  }, s.prototype.Token = e, Yi = s, Yi;
}
var Ji, Gf;
function bme() {
  if (Gf) return Ji;
  Gf = 1;
  var e = Tl(), t = [
    ["text", ime()],
    ["linkify", ame()],
    ["newline", cme()],
    ["escape", lme()],
    ["backticks", ume()],
    ["strikethrough", zf().tokenize],
    ["emphasis", Nf().tokenize],
    ["link", dme()],
    ["image", fme()],
    ["autolink", pme()],
    ["html_inline", hme()],
    ["entity", gme()]
  ], n = [
    ["balance_pairs", mme()],
    ["strikethrough", zf().postProcess],
    ["emphasis", Nf().postProcess],
    // rules for pairs separate '**' into its own text tokens, which may be left unused,
    // rule below merges unused segments back with the rest of the text
    ["fragments_join", vme()]
  ];
  function r() {
    var s;
    for (this.ruler = new e(), s = 0; s < t.length; s++)
      this.ruler.push(t[s][0], t[s][1]);
    for (this.ruler2 = new e(), s = 0; s < n.length; s++)
      this.ruler2.push(n[s][0], n[s][1]);
  }
  return r.prototype.skipToken = function(s) {
    var o, i, a = s.pos, c = this.ruler.getRules(""), u = c.length, d = s.md.options.maxNesting, l = s.cache;
    if (typeof l[a] < "u") {
      s.pos = l[a];
      return;
    }
    if (s.level < d) {
      for (i = 0; i < u; i++)
        if (s.level++, o = c[i](s, !0), s.level--, o) {
          if (a >= s.pos)
            throw new Error("inline rule didn't increment state.pos");
          break;
        }
    } else
      s.pos = s.posMax;
    o || s.pos++, l[a] = s.pos;
  }, r.prototype.tokenize = function(s) {
    for (var o, i, a, c = this.ruler.getRules(""), u = c.length, d = s.posMax, l = s.md.options.maxNesting; s.pos < d; ) {
      if (a = s.pos, s.level < l) {
        for (i = 0; i < u; i++)
          if (o = c[i](s, !1), o) {
            if (a >= s.pos)
              throw new Error("inline rule didn't increment state.pos");
            break;
          }
      }
      if (o) {
        if (s.pos >= d)
          break;
        continue;
      }
      s.pending += s.src[s.pos++];
    }
    s.pending && s.pushPending();
  }, r.prototype.parse = function(s, o, i, a) {
    var c, u, d, l = new this.State(s, o, i, a);
    for (this.tokenize(l), u = this.ruler2.getRules(""), d = u.length, c = 0; c < d; c++)
      u[c](l);
  }, r.prototype.State = _me(), Ji = r, Ji;
}
var Qi, Kf;
function yme() {
  return Kf || (Kf = 1, Qi = function(e) {
    var t = {};
    e = e || {}, t.src_Any = mm().source, t.src_Cc = vm().source, t.src_Z = _m().source, t.src_P = Il().source, t.src_ZPCc = [t.src_Z, t.src_P, t.src_Cc].join("|"), t.src_ZCc = [t.src_Z, t.src_Cc].join("|");
    var n = "[><｜]";
    return t.src_pseudo_letter = "(?:(?!" + n + "|" + t.src_ZPCc + ")" + t.src_Any + ")", t.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", t.src_auth = "(?:(?:(?!" + t.src_ZCc + "|[@/\\[\\]()]).)+@)?", t.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", t.src_host_terminator = "(?=$|" + n + "|" + t.src_ZPCc + ")(?!" + (e["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + t.src_ZPCc + "))", t.src_path = "(?:[/?#](?:(?!" + t.src_ZCc + "|" + n + `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + t.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + t.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + t.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + t.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + t.src_ZCc + "|[']).)+\\'|\\'(?=" + t.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + t.src_ZCc + "|[.]|$)|" + (e["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + ",(?!" + t.src_ZCc + "|$)|;(?!" + t.src_ZCc + "|$)|\\!+(?!" + t.src_ZCc + "|[!]|$)|\\?(?!" + t.src_ZCc + "|[?]|$))+|\\/)?", t.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*', t.src_xn = "xn--[a-z0-9\\-]{1,59}", t.src_domain_root = // Allow letters & digits (http://test1)
    "(?:" + t.src_xn + "|" + t.src_pseudo_letter + "{1,63})", t.src_domain = "(?:" + t.src_xn + "|(?:" + t.src_pseudo_letter + ")|(?:" + t.src_pseudo_letter + "(?:-|" + t.src_pseudo_letter + "){0,61}" + t.src_pseudo_letter + "))", t.src_host = "(?:(?:(?:(?:" + t.src_domain + ")\\.)*" + t.src_domain + "))", t.tpl_host_fuzzy = "(?:" + t.src_ip4 + "|(?:(?:(?:" + t.src_domain + ")\\.)+(?:%TLDS%)))", t.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + t.src_domain + ")\\.)+(?:%TLDS%))", t.src_host_strict = t.src_host + t.src_host_terminator, t.tpl_host_fuzzy_strict = t.tpl_host_fuzzy + t.src_host_terminator, t.src_host_port_strict = t.src_host + t.src_port + t.src_host_terminator, t.tpl_host_port_fuzzy_strict = t.tpl_host_fuzzy + t.src_port + t.src_host_terminator, t.tpl_host_port_no_ip_fuzzy_strict = t.tpl_host_no_ip_fuzzy + t.src_port + t.src_host_terminator, t.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + t.src_ZPCc + "|>|$))", t.tpl_email_fuzzy = "(^|" + n + '|"|\\(|' + t.src_ZCc + ")(" + t.src_email_name + "@" + t.tpl_host_fuzzy_strict + ")", t.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + t.src_ZPCc + "))((?![$+<=>^`|｜])" + t.tpl_host_port_fuzzy_strict + t.src_path + ")", t.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + t.src_ZPCc + "))((?![$+<=>^`|｜])" + t.tpl_host_port_no_ip_fuzzy_strict + t.src_path + ")", t;
  }), Qi;
}
var ea, Xf;
function wme() {
  if (Xf) return ea;
  Xf = 1;
  function e(k) {
    var C = Array.prototype.slice.call(arguments, 1);
    return C.forEach(function(A) {
      A && Object.keys(A).forEach(function(E) {
        k[E] = A[E];
      });
    }), k;
  }
  function t(k) {
    return Object.prototype.toString.call(k);
  }
  function n(k) {
    return t(k) === "[object String]";
  }
  function r(k) {
    return t(k) === "[object Object]";
  }
  function s(k) {
    return t(k) === "[object RegExp]";
  }
  function o(k) {
    return t(k) === "[object Function]";
  }
  function i(k) {
    return k.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
  }
  var a = {
    fuzzyLink: !0,
    fuzzyEmail: !0,
    fuzzyIP: !1
  };
  function c(k) {
    return Object.keys(k || {}).reduce(function(C, A) {
      return C || a.hasOwnProperty(A);
    }, !1);
  }
  var u = {
    "http:": {
      validate: function(k, C, A) {
        var E = k.slice(C);
        return A.re.http || (A.re.http = new RegExp(
          "^\\/\\/" + A.re.src_auth + A.re.src_host_port_strict + A.re.src_path,
          "i"
        )), A.re.http.test(E) ? E.match(A.re.http)[0].length : 0;
      }
    },
    "https:": "http:",
    "ftp:": "http:",
    "//": {
      validate: function(k, C, A) {
        var E = k.slice(C);
        return A.re.no_http || (A.re.no_http = new RegExp(
          "^" + A.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
          // with code comments
          "(?:localhost|(?:(?:" + A.re.src_domain + ")\\.)+" + A.re.src_domain_root + ")" + A.re.src_port + A.re.src_host_terminator + A.re.src_path,
          "i"
        )), A.re.no_http.test(E) ? C >= 3 && k[C - 3] === ":" || C >= 3 && k[C - 3] === "/" ? 0 : E.match(A.re.no_http)[0].length : 0;
      }
    },
    "mailto:": {
      validate: function(k, C, A) {
        var E = k.slice(C);
        return A.re.mailto || (A.re.mailto = new RegExp(
          "^" + A.re.src_email_name + "@" + A.re.src_host_strict,
          "i"
        )), A.re.mailto.test(E) ? E.match(A.re.mailto)[0].length : 0;
      }
    }
  }, d = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]", l = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
  function m(k) {
    k.__index__ = -1, k.__text_cache__ = "";
  }
  function f(k) {
    return function(C, A) {
      var E = C.slice(A);
      return k.test(E) ? E.match(k)[0].length : 0;
    };
  }
  function v() {
    return function(k, C) {
      C.normalize(k);
    };
  }
  function g(k) {
    var C = k.re = yme()(k.__opts__), A = k.__tlds__.slice();
    k.onCompile(), k.__tlds_replaced__ || A.push(d), A.push(C.src_xn), C.src_tlds = A.join("|");
    function E(R) {
      return R.replace("%TLDS%", C.src_tlds);
    }
    C.email_fuzzy = RegExp(E(C.tpl_email_fuzzy), "i"), C.link_fuzzy = RegExp(E(C.tpl_link_fuzzy), "i"), C.link_no_ip_fuzzy = RegExp(E(C.tpl_link_no_ip_fuzzy), "i"), C.host_fuzzy_test = RegExp(E(C.tpl_host_fuzzy_test), "i");
    var $ = [];
    k.__compiled__ = {};
    function M(R, B) {
      throw new Error('(LinkifyIt) Invalid schema "' + R + '": ' + B);
    }
    Object.keys(k.__schemas__).forEach(function(R) {
      var B = k.__schemas__[R];
      if (B !== null) {
        var V = { validate: null, link: null };
        if (k.__compiled__[R] = V, r(B)) {
          s(B.validate) ? V.validate = f(B.validate) : o(B.validate) ? V.validate = B.validate : M(R, B), o(B.normalize) ? V.normalize = B.normalize : B.normalize ? M(R, B) : V.normalize = v();
          return;
        }
        if (n(B)) {
          $.push(R);
          return;
        }
        M(R, B);
      }
    }), $.forEach(function(R) {
      k.__compiled__[k.__schemas__[R]] && (k.__compiled__[R].validate = k.__compiled__[k.__schemas__[R]].validate, k.__compiled__[R].normalize = k.__compiled__[k.__schemas__[R]].normalize);
    }), k.__compiled__[""] = { validate: null, normalize: v() };
    var O = Object.keys(k.__compiled__).filter(function(R) {
      return R.length > 0 && k.__compiled__[R];
    }).map(i).join("|");
    k.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + C.src_ZPCc + "))(" + O + ")", "i"), k.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + C.src_ZPCc + "))(" + O + ")", "ig"), k.re.schema_at_start = RegExp("^" + k.re.schema_search.source, "i"), k.re.pretest = RegExp(
      "(" + k.re.schema_test.source + ")|(" + k.re.host_fuzzy_test.source + ")|@",
      "i"
    ), m(k);
  }
  function y(k, C) {
    var A = k.__index__, E = k.__last_index__, $ = k.__text_cache__.slice(A, E);
    this.schema = k.__schema__.toLowerCase(), this.index = A + C, this.lastIndex = E + C, this.raw = $, this.text = $, this.url = $;
  }
  function h(k, C) {
    var A = new y(k, C);
    return k.__compiled__[A.schema].normalize(A, k), A;
  }
  function w(k, C) {
    if (!(this instanceof w))
      return new w(k, C);
    C || c(k) && (C = k, k = {}), this.__opts__ = e({}, a, C), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = e({}, u, k), this.__compiled__ = {}, this.__tlds__ = l, this.__tlds_replaced__ = !1, this.re = {}, g(this);
  }
  return w.prototype.add = function(C, A) {
    return this.__schemas__[C] = A, g(this), this;
  }, w.prototype.set = function(C) {
    return this.__opts__ = e(this.__opts__, C), this;
  }, w.prototype.test = function(C) {
    if (this.__text_cache__ = C, this.__index__ = -1, !C.length)
      return !1;
    var A, E, $, M, O, R, B, V, re;
    if (this.re.schema_test.test(C)) {
      for (B = this.re.schema_search, B.lastIndex = 0; (A = B.exec(C)) !== null; )
        if (M = this.testSchemaAt(C, A[2], B.lastIndex), M) {
          this.__schema__ = A[2], this.__index__ = A.index + A[1].length, this.__last_index__ = A.index + A[0].length + M;
          break;
        }
    }
    return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (V = C.search(this.re.host_fuzzy_test), V >= 0 && (this.__index__ < 0 || V < this.__index__) && (E = C.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null && (O = E.index + E[1].length, (this.__index__ < 0 || O < this.__index__) && (this.__schema__ = "", this.__index__ = O, this.__last_index__ = E.index + E[0].length))), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && (re = C.indexOf("@"), re >= 0 && ($ = C.match(this.re.email_fuzzy)) !== null && (O = $.index + $[1].length, R = $.index + $[0].length, (this.__index__ < 0 || O < this.__index__ || O === this.__index__ && R > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = O, this.__last_index__ = R))), this.__index__ >= 0;
  }, w.prototype.pretest = function(C) {
    return this.re.pretest.test(C);
  }, w.prototype.testSchemaAt = function(C, A, E) {
    return this.__compiled__[A.toLowerCase()] ? this.__compiled__[A.toLowerCase()].validate(C, E, this) : 0;
  }, w.prototype.match = function(C) {
    var A = 0, E = [];
    this.__index__ >= 0 && this.__text_cache__ === C && (E.push(h(this, A)), A = this.__last_index__);
    for (var $ = A ? C.slice(A) : C; this.test($); )
      E.push(h(this, A)), $ = $.slice(this.__last_index__), A += this.__last_index__;
    return E.length ? E : null;
  }, w.prototype.matchAtStart = function(C) {
    if (this.__text_cache__ = C, this.__index__ = -1, !C.length) return null;
    var A = this.re.schema_at_start.exec(C);
    if (!A) return null;
    var E = this.testSchemaAt(C, A[2], A[0].length);
    return E ? (this.__schema__ = A[2], this.__index__ = A.index + A[1].length, this.__last_index__ = A.index + A[0].length + E, h(this, 0)) : null;
  }, w.prototype.tlds = function(C, A) {
    return C = Array.isArray(C) ? C : [C], A ? (this.__tlds__ = this.__tlds__.concat(C).sort().filter(function(E, $, M) {
      return E !== M[$ - 1];
    }).reverse(), g(this), this) : (this.__tlds__ = C.slice(), this.__tlds_replaced__ = !0, g(this), this);
  }, w.prototype.normalize = function(C) {
    C.schema || (C.url = "http://" + C.url), C.schema === "mailto:" && !/^mailto:/i.test(C.url) && (C.url = "mailto:" + C.url);
  }, w.prototype.onCompile = function() {
  }, ea = w, ea;
}
const vr = 2147483647, an = 36, Ol = 1, ao = 26, kme = 38, Cme = 700, ym = 72, wm = 128, km = "-", xme = /^xn--/, Sme = /[^\0-\x7F]/, Eme = /[\x2E\u3002\uFF0E\uFF61]/g, Ame = {
  overflow: "Overflow: input needs wider integers to process",
  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
  "invalid-input": "Invalid input"
}, ta = an - Ol, cn = Math.floor, na = String.fromCharCode;
function Pn(e) {
  throw new RangeError(Ame[e]);
}
function $me(e, t) {
  const n = [];
  let r = e.length;
  for (; r--; )
    n[r] = t(e[r]);
  return n;
}
function Cm(e, t) {
  const n = e.split("@");
  let r = "";
  n.length > 1 && (r = n[0] + "@", e = n[1]), e = e.replace(Eme, ".");
  const s = e.split("."), o = $me(s, t).join(".");
  return r + o;
}
function Rl(e) {
  const t = [];
  let n = 0;
  const r = e.length;
  for (; n < r; ) {
    const s = e.charCodeAt(n++);
    if (s >= 55296 && s <= 56319 && n < r) {
      const o = e.charCodeAt(n++);
      (o & 64512) == 56320 ? t.push(((s & 1023) << 10) + (o & 1023) + 65536) : (t.push(s), n--);
    } else
      t.push(s);
  }
  return t;
}
const xm = (e) => String.fromCodePoint(...e), Mme = function(e) {
  return e >= 48 && e < 58 ? 26 + (e - 48) : e >= 65 && e < 91 ? e - 65 : e >= 97 && e < 123 ? e - 97 : an;
}, Yf = function(e, t) {
  return e + 22 + 75 * (e < 26) - ((t != 0) << 5);
}, Sm = function(e, t, n) {
  let r = 0;
  for (e = n ? cn(e / Cme) : e >> 1, e += cn(e / t); e > ta * ao >> 1; r += an)
    e = cn(e / ta);
  return cn(r + (ta + 1) * e / (e + kme));
}, Pl = function(e) {
  const t = [], n = e.length;
  let r = 0, s = wm, o = ym, i = e.lastIndexOf(km);
  i < 0 && (i = 0);
  for (let a = 0; a < i; ++a)
    e.charCodeAt(a) >= 128 && Pn("not-basic"), t.push(e.charCodeAt(a));
  for (let a = i > 0 ? i + 1 : 0; a < n; ) {
    const c = r;
    for (let d = 1, l = an; ; l += an) {
      a >= n && Pn("invalid-input");
      const m = Mme(e.charCodeAt(a++));
      m >= an && Pn("invalid-input"), m > cn((vr - r) / d) && Pn("overflow"), r += m * d;
      const f = l <= o ? Ol : l >= o + ao ? ao : l - o;
      if (m < f)
        break;
      const v = an - f;
      d > cn(vr / v) && Pn("overflow"), d *= v;
    }
    const u = t.length + 1;
    o = Sm(r - c, u, c == 0), cn(r / u) > vr - s && Pn("overflow"), s += cn(r / u), r %= u, t.splice(r++, 0, s);
  }
  return String.fromCodePoint(...t);
}, Bl = function(e) {
  const t = [];
  e = Rl(e);
  const n = e.length;
  let r = wm, s = 0, o = ym;
  for (const c of e)
    c < 128 && t.push(na(c));
  const i = t.length;
  let a = i;
  for (i && t.push(km); a < n; ) {
    let c = vr;
    for (const d of e)
      d >= r && d < c && (c = d);
    const u = a + 1;
    c - r > cn((vr - s) / u) && Pn("overflow"), s += (c - r) * u, r = c;
    for (const d of e)
      if (d < r && ++s > vr && Pn("overflow"), d === r) {
        let l = s;
        for (let m = an; ; m += an) {
          const f = m <= o ? Ol : m >= o + ao ? ao : m - o;
          if (l < f)
            break;
          const v = l - f, g = an - f;
          t.push(
            na(Yf(f + v % g, 0))
          ), l = cn(v / g);
        }
        t.push(na(Yf(l, 0))), o = Sm(s, u, a === i), s = 0, ++a;
      }
    ++s, ++r;
  }
  return t.join("");
}, Em = function(e) {
  return Cm(e, function(t) {
    return xme.test(t) ? Pl(t.slice(4).toLowerCase()) : t;
  });
}, Am = function(e) {
  return Cm(e, function(t) {
    return Sme.test(t) ? "xn--" + Bl(t) : t;
  });
}, Ime = {
  /**
   * A string representing the current Punycode.js version number.
   * @memberOf punycode
   * @type String
   */
  version: "2.3.1",
  /**
   * An object of methods to convert from JavaScript's internal character
   * representation (UCS-2) to Unicode code points, and back.
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode
   * @type Object
   */
  ucs2: {
    decode: Rl,
    encode: xm
  },
  decode: Pl,
  encode: Bl,
  toASCII: Am,
  toUnicode: Em
}, Tme = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: Pl,
  default: Ime,
  encode: Bl,
  toASCII: Am,
  toUnicode: Em,
  ucs2decode: Rl,
  ucs2encode: xm
}, Symbol.toStringTag, { value: "Module" })), Lme = /* @__PURE__ */ r_(Tme);
var ra, Jf;
function Ome() {
  return Jf || (Jf = 1, ra = {
    options: {
      html: !1,
      // Enable HTML tags in source
      xhtmlOut: !1,
      // Use '/' to close single tags (<br />)
      breaks: !1,
      // Convert '\n' in paragraphs into <br>
      langPrefix: "language-",
      // CSS language prefix for fenced blocks
      linkify: !1,
      // autoconvert URL-like texts to links
      // Enable some language-neutral replacements + quotes beautification
      typographer: !1,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: "“”‘’",
      /* “”‘’ */
      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed and should be escaped externaly.
      // If result starts with <pre... internal wrapper is skipped.
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      maxNesting: 100
      // Internal protection, recursion limit
    },
    components: {
      core: {},
      block: {},
      inline: {}
    }
  }), ra;
}
var oa, Qf;
function Rme() {
  return Qf || (Qf = 1, oa = {
    options: {
      html: !1,
      // Enable HTML tags in source
      xhtmlOut: !1,
      // Use '/' to close single tags (<br />)
      breaks: !1,
      // Convert '\n' in paragraphs into <br>
      langPrefix: "language-",
      // CSS language prefix for fenced blocks
      linkify: !1,
      // autoconvert URL-like texts to links
      // Enable some language-neutral replacements + quotes beautification
      typographer: !1,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: "“”‘’",
      /* “”‘’ */
      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed and should be escaped externaly.
      // If result starts with <pre... internal wrapper is skipped.
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      maxNesting: 20
      // Internal protection, recursion limit
    },
    components: {
      core: {
        rules: [
          "normalize",
          "block",
          "inline",
          "text_join"
        ]
      },
      block: {
        rules: [
          "paragraph"
        ]
      },
      inline: {
        rules: [
          "text"
        ],
        rules2: [
          "balance_pairs",
          "fragments_join"
        ]
      }
    }
  }), oa;
}
var sa, e0;
function Pme() {
  return e0 || (e0 = 1, sa = {
    options: {
      html: !0,
      // Enable HTML tags in source
      xhtmlOut: !0,
      // Use '/' to close single tags (<br />)
      breaks: !1,
      // Convert '\n' in paragraphs into <br>
      langPrefix: "language-",
      // CSS language prefix for fenced blocks
      linkify: !1,
      // autoconvert URL-like texts to links
      // Enable some language-neutral replacements + quotes beautification
      typographer: !1,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: "“”‘’",
      /* “”‘’ */
      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed and should be escaped externaly.
      // If result starts with <pre... internal wrapper is skipped.
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      maxNesting: 20
      // Internal protection, recursion limit
    },
    components: {
      core: {
        rules: [
          "normalize",
          "block",
          "inline",
          "text_join"
        ]
      },
      block: {
        rules: [
          "blockquote",
          "code",
          "fence",
          "heading",
          "hr",
          "html_block",
          "lheading",
          "list",
          "reference",
          "paragraph"
        ]
      },
      inline: {
        rules: [
          "autolink",
          "backticks",
          "emphasis",
          "entity",
          "escape",
          "html_inline",
          "image",
          "link",
          "newline",
          "text"
        ],
        rules2: [
          "balance_pairs",
          "emphasis",
          "fragments_join"
        ]
      }
    }
  }), sa;
}
var ia, t0;
function Bme() {
  if (t0) return ia;
  t0 = 1;
  var e = Ie(), t = Pge(), n = Bge(), r = Uge(), s = sme(), o = bme(), i = wme(), a = gm(), c = Lme, u = {
    default: Ome(),
    zero: Rme(),
    commonmark: Pme()
  }, d = /^(vbscript|javascript|file|data):/, l = /^data:image\/(gif|png|jpeg|webp);/;
  function m(h) {
    var w = h.trim().toLowerCase();
    return d.test(w) ? !!l.test(w) : !0;
  }
  var f = ["http:", "https:", "mailto:"];
  function v(h) {
    var w = a.parse(h, !0);
    if (w.hostname && (!w.protocol || f.indexOf(w.protocol) >= 0))
      try {
        w.hostname = c.toASCII(w.hostname);
      } catch {
      }
    return a.encode(a.format(w));
  }
  function g(h) {
    var w = a.parse(h, !0);
    if (w.hostname && (!w.protocol || f.indexOf(w.protocol) >= 0))
      try {
        w.hostname = c.toUnicode(w.hostname);
      } catch {
      }
    return a.decode(a.format(w), a.decode.defaultChars + "%");
  }
  function y(h, w) {
    if (!(this instanceof y))
      return new y(h, w);
    w || e.isString(h) || (w = h || {}, h = "default"), this.inline = new o(), this.block = new s(), this.core = new r(), this.renderer = new n(), this.linkify = new i(), this.validateLink = m, this.normalizeLink = v, this.normalizeLinkText = g, this.utils = e, this.helpers = e.assign({}, t), this.options = {}, this.configure(h), w && this.set(w);
  }
  return y.prototype.set = function(h) {
    return e.assign(this.options, h), this;
  }, y.prototype.configure = function(h) {
    var w = this, k;
    if (e.isString(h) && (k = h, h = u[k], !h))
      throw new Error('Wrong `markdown-it` preset "' + k + '", check name');
    if (!h)
      throw new Error("Wrong `markdown-it` preset, can't be empty");
    return h.options && w.set(h.options), h.components && Object.keys(h.components).forEach(function(C) {
      h.components[C].rules && w[C].ruler.enableOnly(h.components[C].rules), h.components[C].rules2 && w[C].ruler2.enableOnly(h.components[C].rules2);
    }), this;
  }, y.prototype.enable = function(h, w) {
    var k = [];
    Array.isArray(h) || (h = [h]), ["core", "block", "inline"].forEach(function(A) {
      k = k.concat(this[A].ruler.enable(h, !0));
    }, this), k = k.concat(this.inline.ruler2.enable(h, !0));
    var C = h.filter(function(A) {
      return k.indexOf(A) < 0;
    });
    if (C.length && !w)
      throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + C);
    return this;
  }, y.prototype.disable = function(h, w) {
    var k = [];
    Array.isArray(h) || (h = [h]), ["core", "block", "inline"].forEach(function(A) {
      k = k.concat(this[A].ruler.disable(h, !0));
    }, this), k = k.concat(this.inline.ruler2.disable(h, !0));
    var C = h.filter(function(A) {
      return k.indexOf(A) < 0;
    });
    if (C.length && !w)
      throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + C);
    return this;
  }, y.prototype.use = function(h) {
    var w = [this].concat(Array.prototype.slice.call(arguments, 1));
    return h.apply(h, w), this;
  }, y.prototype.parse = function(h, w) {
    if (typeof h != "string")
      throw new Error("Input data should be a String");
    var k = new this.core.State(h, this, w);
    return this.core.process(k), k.tokens;
  }, y.prototype.render = function(h, w) {
    return w = w || {}, this.renderer.render(this.parse(h, w), this.options, w);
  }, y.prototype.parseInline = function(h, w) {
    var k = new this.core.State(h, this, w);
    return k.inlineMode = !0, this.core.process(k), k.tokens;
  }, y.prototype.renderInline = function(h, w) {
    return w = w || {}, this.renderer.render(this.parseInline(h, w), this.options, w);
  }, ia = y, ia;
}
var aa, n0;
function zme() {
  return n0 || (n0 = 1, aa = Bme()), aa;
}
var Dme = zme();
const $m = /* @__PURE__ */ Ar(Dme), Nme = "😀", qme = "😃", Fme = "😄", jme = "😁", Hme = "😆", Vme = "😆", Ume = "😅", Zme = "🤣", Wme = "😂", Gme = "🙂", Kme = "🙃", Xme = "😉", Yme = "😊", Jme = "😇", Qme = "🥰", eve = "😍", tve = "🤩", nve = "😘", rve = "😗", ove = "☺️", sve = "😚", ive = "😙", ave = "🥲", cve = "😋", lve = "😛", uve = "😜", dve = "🤪", fve = "😝", pve = "🤑", hve = "🤗", gve = "🤭", mve = "🤫", vve = "🤔", _ve = "🤐", bve = "🤨", yve = "😐", wve = "😑", kve = "😶", Cve = "😏", xve = "😒", Sve = "🙄", Eve = "😬", Ave = "🤥", $ve = "😌", Mve = "😔", Ive = "😪", Tve = "🤤", Lve = "😴", Ove = "😷", Rve = "🤒", Pve = "🤕", Bve = "🤢", zve = "🤮", Dve = "🤧", Nve = "🥵", qve = "🥶", Fve = "🥴", jve = "😵", Hve = "🤯", Vve = "🤠", Uve = "🥳", Zve = "🥸", Wve = "😎", Gve = "🤓", Kve = "🧐", Xve = "😕", Yve = "😟", Jve = "🙁", Qve = "☹️", e_e = "😮", t_e = "😯", n_e = "😲", r_e = "😳", o_e = "🥺", s_e = "😦", i_e = "😧", a_e = "😨", c_e = "😰", l_e = "😥", u_e = "😢", d_e = "😭", f_e = "😱", p_e = "😖", h_e = "😣", g_e = "😞", m_e = "😓", v_e = "😩", __e = "😫", b_e = "🥱", y_e = "😤", w_e = "😡", k_e = "😡", C_e = "😠", x_e = "🤬", S_e = "😈", E_e = "👿", A_e = "💀", $_e = "☠️", M_e = "💩", I_e = "💩", T_e = "💩", L_e = "🤡", O_e = "👹", R_e = "👺", P_e = "👻", B_e = "👽", z_e = "👾", D_e = "🤖", N_e = "😺", q_e = "😸", F_e = "😹", j_e = "😻", H_e = "😼", V_e = "😽", U_e = "🙀", Z_e = "😿", W_e = "😾", G_e = "🙈", K_e = "🙉", X_e = "🙊", Y_e = "💋", J_e = "💌", Q_e = "💘", ebe = "💝", tbe = "💖", nbe = "💗", rbe = "💓", obe = "💞", sbe = "💕", ibe = "💟", abe = "❣️", cbe = "💔", lbe = "❤️", ube = "🧡", dbe = "💛", fbe = "💚", pbe = "💙", hbe = "💜", gbe = "🤎", mbe = "🖤", vbe = "🤍", _be = "💢", bbe = "💥", ybe = "💥", wbe = "💫", kbe = "💦", Cbe = "💨", xbe = "🕳️", Sbe = "💣", Ebe = "💬", Abe = "👁️‍🗨️", $be = "🗨️", Mbe = "🗯️", Ibe = "💭", Tbe = "💤", Lbe = "👋", Obe = "🤚", Rbe = "🖐️", Pbe = "✋", Bbe = "✋", zbe = "🖖", Dbe = "👌", Nbe = "🤌", qbe = "🤏", Fbe = "✌️", jbe = "🤞", Hbe = "🤟", Vbe = "🤘", Ube = "🤙", Zbe = "👈", Wbe = "👉", Gbe = "👆", Kbe = "🖕", Xbe = "🖕", Ybe = "👇", Jbe = "☝️", Qbe = "👍", eye = "👎", tye = "✊", nye = "✊", rye = "👊", oye = "👊", sye = "👊", iye = "🤛", aye = "🤜", cye = "👏", lye = "🙌", uye = "👐", dye = "🤲", fye = "🤝", pye = "🙏", hye = "✍️", gye = "💅", mye = "🤳", vye = "💪", _ye = "🦾", bye = "🦿", yye = "🦵", wye = "🦶", kye = "👂", Cye = "🦻", xye = "👃", Sye = "🧠", Eye = "🫀", Aye = "🫁", $ye = "🦷", Mye = "🦴", Iye = "👀", Tye = "👁️", Lye = "👅", Oye = "👄", Rye = "👶", Pye = "🧒", Bye = "👦", zye = "👧", Dye = "🧑", Nye = "👱", qye = "👨", Fye = "🧔", jye = "👨‍🦰", Hye = "👨‍🦱", Vye = "👨‍🦳", Uye = "👨‍🦲", Zye = "👩", Wye = "👩‍🦰", Gye = "🧑‍🦰", Kye = "👩‍🦱", Xye = "🧑‍🦱", Yye = "👩‍🦳", Jye = "🧑‍🦳", Qye = "👩‍🦲", ewe = "🧑‍🦲", twe = "👱‍♀️", nwe = "👱‍♀️", rwe = "👱‍♂️", owe = "🧓", swe = "👴", iwe = "👵", awe = "🙍", cwe = "🙍‍♂️", lwe = "🙍‍♀️", uwe = "🙎", dwe = "🙎‍♂️", fwe = "🙎‍♀️", pwe = "🙅", hwe = "🙅‍♂️", gwe = "🙅‍♂️", mwe = "🙅‍♀️", vwe = "🙅‍♀️", _we = "🙆", bwe = "🙆‍♂️", ywe = "🙆‍♀️", wwe = "💁", kwe = "💁", Cwe = "💁‍♂️", xwe = "💁‍♂️", Swe = "💁‍♀️", Ewe = "💁‍♀️", Awe = "🙋", $we = "🙋‍♂️", Mwe = "🙋‍♀️", Iwe = "🧏", Twe = "🧏‍♂️", Lwe = "🧏‍♀️", Owe = "🙇", Rwe = "🙇‍♂️", Pwe = "🙇‍♀️", Bwe = "🤦", zwe = "🤦‍♂️", Dwe = "🤦‍♀️", Nwe = "🤷", qwe = "🤷‍♂️", Fwe = "🤷‍♀️", jwe = "🧑‍⚕️", Hwe = "👨‍⚕️", Vwe = "👩‍⚕️", Uwe = "🧑‍🎓", Zwe = "👨‍🎓", Wwe = "👩‍🎓", Gwe = "🧑‍🏫", Kwe = "👨‍🏫", Xwe = "👩‍🏫", Ywe = "🧑‍⚖️", Jwe = "👨‍⚖️", Qwe = "👩‍⚖️", eke = "🧑‍🌾", tke = "👨‍🌾", nke = "👩‍🌾", rke = "🧑‍🍳", oke = "👨‍🍳", ske = "👩‍🍳", ike = "🧑‍🔧", ake = "👨‍🔧", cke = "👩‍🔧", lke = "🧑‍🏭", uke = "👨‍🏭", dke = "👩‍🏭", fke = "🧑‍💼", pke = "👨‍💼", hke = "👩‍💼", gke = "🧑‍🔬", mke = "👨‍🔬", vke = "👩‍🔬", _ke = "🧑‍💻", bke = "👨‍💻", yke = "👩‍💻", wke = "🧑‍🎤", kke = "👨‍🎤", Cke = "👩‍🎤", xke = "🧑‍🎨", Ske = "👨‍🎨", Eke = "👩‍🎨", Ake = "🧑‍✈️", $ke = "👨‍✈️", Mke = "👩‍✈️", Ike = "🧑‍🚀", Tke = "👨‍🚀", Lke = "👩‍🚀", Oke = "🧑‍🚒", Rke = "👨‍🚒", Pke = "👩‍🚒", Bke = "👮", zke = "👮", Dke = "👮‍♂️", Nke = "👮‍♀️", qke = "🕵️", Fke = "🕵️‍♂️", jke = "🕵️‍♀️", Hke = "💂", Vke = "💂‍♂️", Uke = "💂‍♀️", Zke = "🥷", Wke = "👷", Gke = "👷‍♂️", Kke = "👷‍♀️", Xke = "🤴", Yke = "👸", Jke = "👳", Qke = "👳‍♂️", e4e = "👳‍♀️", t4e = "👲", n4e = "🧕", r4e = "🤵", o4e = "🤵‍♂️", s4e = "🤵‍♀️", i4e = "👰", a4e = "👰‍♂️", c4e = "👰‍♀️", l4e = "👰‍♀️", u4e = "🤰", d4e = "🤱", f4e = "👩‍🍼", p4e = "👨‍🍼", h4e = "🧑‍🍼", g4e = "👼", m4e = "🎅", v4e = "🤶", _4e = "🧑‍🎄", b4e = "🦸", y4e = "🦸‍♂️", w4e = "🦸‍♀️", k4e = "🦹", C4e = "🦹‍♂️", x4e = "🦹‍♀️", S4e = "🧙", E4e = "🧙‍♂️", A4e = "🧙‍♀️", $4e = "🧚", M4e = "🧚‍♂️", I4e = "🧚‍♀️", T4e = "🧛", L4e = "🧛‍♂️", O4e = "🧛‍♀️", R4e = "🧜", P4e = "🧜‍♂️", B4e = "🧜‍♀️", z4e = "🧝", D4e = "🧝‍♂️", N4e = "🧝‍♀️", q4e = "🧞", F4e = "🧞‍♂️", j4e = "🧞‍♀️", H4e = "🧟", V4e = "🧟‍♂️", U4e = "🧟‍♀️", Z4e = "💆", W4e = "💆‍♂️", G4e = "💆‍♀️", K4e = "💇", X4e = "💇‍♂️", Y4e = "💇‍♀️", J4e = "🚶", Q4e = "🚶‍♂️", e3e = "🚶‍♀️", t3e = "🧍", n3e = "🧍‍♂️", r3e = "🧍‍♀️", o3e = "🧎", s3e = "🧎‍♂️", i3e = "🧎‍♀️", a3e = "🧑‍🦯", c3e = "👨‍🦯", l3e = "👩‍🦯", u3e = "🧑‍🦼", d3e = "👨‍🦼", f3e = "👩‍🦼", p3e = "🧑‍🦽", h3e = "👨‍🦽", g3e = "👩‍🦽", m3e = "🏃", v3e = "🏃", _3e = "🏃‍♂️", b3e = "🏃‍♀️", y3e = "💃", w3e = "💃", k3e = "🕺", C3e = "🕴️", x3e = "👯", S3e = "👯‍♂️", E3e = "👯‍♀️", A3e = "🧖", $3e = "🧖‍♂️", M3e = "🧖‍♀️", I3e = "🧗", T3e = "🧗‍♂️", L3e = "🧗‍♀️", O3e = "🤺", R3e = "🏇", P3e = "⛷️", B3e = "🏂", z3e = "🏌️", D3e = "🏌️‍♂️", N3e = "🏌️‍♀️", q3e = "🏄", F3e = "🏄‍♂️", j3e = "🏄‍♀️", H3e = "🚣", V3e = "🚣‍♂️", U3e = "🚣‍♀️", Z3e = "🏊", W3e = "🏊‍♂️", G3e = "🏊‍♀️", K3e = "⛹️", X3e = "⛹️‍♂️", Y3e = "⛹️‍♂️", J3e = "⛹️‍♀️", Q3e = "⛹️‍♀️", e5e = "🏋️", t5e = "🏋️‍♂️", n5e = "🏋️‍♀️", r5e = "🚴", o5e = "🚴‍♂️", s5e = "🚴‍♀️", i5e = "🚵", a5e = "🚵‍♂️", c5e = "🚵‍♀️", l5e = "🤸", u5e = "🤸‍♂️", d5e = "🤸‍♀️", f5e = "🤼", p5e = "🤼‍♂️", h5e = "🤼‍♀️", g5e = "🤽", m5e = "🤽‍♂️", v5e = "🤽‍♀️", _5e = "🤾", b5e = "🤾‍♂️", y5e = "🤾‍♀️", w5e = "🤹", k5e = "🤹‍♂️", C5e = "🤹‍♀️", x5e = "🧘", S5e = "🧘‍♂️", E5e = "🧘‍♀️", A5e = "🛀", $5e = "🛌", M5e = "🧑‍🤝‍🧑", I5e = "👭", T5e = "👫", L5e = "👬", O5e = "💏", R5e = "👩‍❤️‍💋‍👨", P5e = "👨‍❤️‍💋‍👨", B5e = "👩‍❤️‍💋‍👩", z5e = "💑", D5e = "👩‍❤️‍👨", N5e = "👨‍❤️‍👨", q5e = "👩‍❤️‍👩", F5e = "👪", j5e = "👨‍👩‍👦", H5e = "👨‍👩‍👧", V5e = "👨‍👩‍👧‍👦", U5e = "👨‍👩‍👦‍👦", Z5e = "👨‍👩‍👧‍👧", W5e = "👨‍👨‍👦", G5e = "👨‍👨‍👧", K5e = "👨‍👨‍👧‍👦", X5e = "👨‍👨‍👦‍👦", Y5e = "👨‍👨‍👧‍👧", J5e = "👩‍👩‍👦", Q5e = "👩‍👩‍👧", e6e = "👩‍👩‍👧‍👦", t6e = "👩‍👩‍👦‍👦", n6e = "👩‍👩‍👧‍👧", r6e = "👨‍👦", o6e = "👨‍👦‍👦", s6e = "👨‍👧", i6e = "👨‍👧‍👦", a6e = "👨‍👧‍👧", c6e = "👩‍👦", l6e = "👩‍👦‍👦", u6e = "👩‍👧", d6e = "👩‍👧‍👦", f6e = "👩‍👧‍👧", p6e = "🗣️", h6e = "👤", g6e = "👥", m6e = "🫂", v6e = "👣", _6e = "🐵", b6e = "🐒", y6e = "🦍", w6e = "🦧", k6e = "🐶", C6e = "🐕", x6e = "🦮", S6e = "🐕‍🦺", E6e = "🐩", A6e = "🐺", $6e = "🦊", M6e = "🦝", I6e = "🐱", T6e = "🐈", L6e = "🐈‍⬛", O6e = "🦁", R6e = "🐯", P6e = "🐅", B6e = "🐆", z6e = "🐴", D6e = "🐎", N6e = "🦄", q6e = "🦓", F6e = "🦌", j6e = "🦬", H6e = "🐮", V6e = "🐂", U6e = "🐃", Z6e = "🐄", W6e = "🐷", G6e = "🐖", K6e = "🐗", X6e = "🐽", Y6e = "🐏", J6e = "🐑", Q6e = "🐐", e8e = "🐪", t8e = "🐫", n8e = "🦙", r8e = "🦒", o8e = "🐘", s8e = "🦣", i8e = "🦏", a8e = "🦛", c8e = "🐭", l8e = "🐁", u8e = "🐀", d8e = "🐹", f8e = "🐰", p8e = "🐇", h8e = "🐿️", g8e = "🦫", m8e = "🦔", v8e = "🦇", _8e = "🐻", b8e = "🐻‍❄️", y8e = "🐨", w8e = "🐼", k8e = "🦥", C8e = "🦦", x8e = "🦨", S8e = "🦘", E8e = "🦡", A8e = "🐾", $8e = "🐾", M8e = "🦃", I8e = "🐔", T8e = "🐓", L8e = "🐣", O8e = "🐤", R8e = "🐥", P8e = "🐦", B8e = "🐧", z8e = "🕊️", D8e = "🦅", N8e = "🦆", q8e = "🦢", F8e = "🦉", j8e = "🦤", H8e = "🪶", V8e = "🦩", U8e = "🦚", Z8e = "🦜", W8e = "🐸", G8e = "🐊", K8e = "🐢", X8e = "🦎", Y8e = "🐍", J8e = "🐲", Q8e = "🐉", eCe = "🦕", tCe = "🐳", nCe = "🐋", rCe = "🐬", oCe = "🐬", sCe = "🦭", iCe = "🐟", aCe = "🐠", cCe = "🐡", lCe = "🦈", uCe = "🐙", dCe = "🐚", fCe = "🐌", pCe = "🦋", hCe = "🐛", gCe = "🐜", mCe = "🐝", vCe = "🐝", _Ce = "🪲", bCe = "🐞", yCe = "🦗", wCe = "🪳", kCe = "🕷️", CCe = "🕸️", xCe = "🦂", SCe = "🦟", ECe = "🪰", ACe = "🪱", $Ce = "🦠", MCe = "💐", ICe = "🌸", TCe = "💮", LCe = "🏵️", OCe = "🌹", RCe = "🥀", PCe = "🌺", BCe = "🌻", zCe = "🌼", DCe = "🌷", NCe = "🌱", qCe = "🪴", FCe = "🌲", jCe = "🌳", HCe = "🌴", VCe = "🌵", UCe = "🌾", ZCe = "🌿", WCe = "☘️", GCe = "🍀", KCe = "🍁", XCe = "🍂", YCe = "🍃", JCe = "🍇", QCe = "🍈", exe = "🍉", txe = "🍊", nxe = "🍊", rxe = "🍊", oxe = "🍋", sxe = "🍌", ixe = "🍍", axe = "🥭", cxe = "🍎", lxe = "🍏", uxe = "🍐", dxe = "🍑", fxe = "🍒", pxe = "🍓", hxe = "🫐", gxe = "🥝", mxe = "🍅", vxe = "🫒", _xe = "🥥", bxe = "🥑", yxe = "🍆", wxe = "🥔", kxe = "🥕", Cxe = "🌽", xxe = "🌶️", Sxe = "🫑", Exe = "🥒", Axe = "🥬", $xe = "🥦", Mxe = "🧄", Ixe = "🧅", Txe = "🍄", Lxe = "🥜", Oxe = "🌰", Rxe = "🍞", Pxe = "🥐", Bxe = "🥖", zxe = "🫓", Dxe = "🥨", Nxe = "🥯", qxe = "🥞", Fxe = "🧇", jxe = "🧀", Hxe = "🍖", Vxe = "🍗", Uxe = "🥩", Zxe = "🥓", Wxe = "🍔", Gxe = "🍟", Kxe = "🍕", Xxe = "🌭", Yxe = "🥪", Jxe = "🌮", Qxe = "🌯", e7e = "🫔", t7e = "🥙", n7e = "🧆", r7e = "🥚", o7e = "🍳", s7e = "🥘", i7e = "🍲", a7e = "🫕", c7e = "🥣", l7e = "🥗", u7e = "🍿", d7e = "🧈", f7e = "🧂", p7e = "🥫", h7e = "🍱", g7e = "🍘", m7e = "🍙", v7e = "🍚", _7e = "🍛", b7e = "🍜", y7e = "🍝", w7e = "🍠", k7e = "🍢", C7e = "🍣", x7e = "🍤", S7e = "🍥", E7e = "🥮", A7e = "🍡", $7e = "🥟", M7e = "🥠", I7e = "🥡", T7e = "🦀", L7e = "🦞", O7e = "🦐", R7e = "🦑", P7e = "🦪", B7e = "🍦", z7e = "🍧", D7e = "🍨", N7e = "🍩", q7e = "🍪", F7e = "🎂", j7e = "🍰", H7e = "🧁", V7e = "🥧", U7e = "🍫", Z7e = "🍬", W7e = "🍭", G7e = "🍮", K7e = "🍯", X7e = "🍼", Y7e = "🥛", J7e = "☕", Q7e = "🫖", e9e = "🍵", t9e = "🍶", n9e = "🍾", r9e = "🍷", o9e = "🍸", s9e = "🍹", i9e = "🍺", a9e = "🍻", c9e = "🥂", l9e = "🥃", u9e = "🥤", d9e = "🧋", f9e = "🧃", p9e = "🧉", h9e = "🧊", g9e = "🥢", m9e = "🍽️", v9e = "🍴", _9e = "🥄", b9e = "🔪", y9e = "🔪", w9e = "🏺", k9e = "🌍", C9e = "🌎", x9e = "🌏", S9e = "🌐", E9e = "🗺️", A9e = "🗾", $9e = "🧭", M9e = "🏔️", I9e = "⛰️", T9e = "🌋", L9e = "🗻", O9e = "🏕️", R9e = "🏖️", P9e = "🏜️", B9e = "🏝️", z9e = "🏞️", D9e = "🏟️", N9e = "🏛️", q9e = "🏗️", F9e = "🧱", j9e = "🪨", H9e = "🪵", V9e = "🛖", U9e = "🏘️", Z9e = "🏚️", W9e = "🏠", G9e = "🏡", K9e = "🏢", X9e = "🏣", Y9e = "🏤", J9e = "🏥", Q9e = "🏦", eSe = "🏨", tSe = "🏩", nSe = "🏪", rSe = "🏫", oSe = "🏬", sSe = "🏭", iSe = "🏯", aSe = "🏰", cSe = "💒", lSe = "🗼", uSe = "🗽", dSe = "⛪", fSe = "🕌", pSe = "🛕", hSe = "🕍", gSe = "⛩️", mSe = "🕋", vSe = "⛲", _Se = "⛺", bSe = "🌁", ySe = "🌃", wSe = "🏙️", kSe = "🌄", CSe = "🌅", xSe = "🌆", SSe = "🌇", ESe = "🌉", ASe = "♨️", $Se = "🎠", MSe = "🎡", ISe = "🎢", TSe = "💈", LSe = "🎪", OSe = "🚂", RSe = "🚃", PSe = "🚄", BSe = "🚅", zSe = "🚆", DSe = "🚇", NSe = "🚈", qSe = "🚉", FSe = "🚊", jSe = "🚝", HSe = "🚞", VSe = "🚋", USe = "🚌", ZSe = "🚍", WSe = "🚎", GSe = "🚐", KSe = "🚑", XSe = "🚒", YSe = "🚓", JSe = "🚔", QSe = "🚕", eEe = "🚖", tEe = "🚗", nEe = "🚗", rEe = "🚘", oEe = "🚙", sEe = "🛻", iEe = "🚚", aEe = "🚛", cEe = "🚜", lEe = "🏎️", uEe = "🏍️", dEe = "🛵", fEe = "🦽", pEe = "🦼", hEe = "🛺", gEe = "🚲", mEe = "🛴", vEe = "🛹", _Ee = "🛼", bEe = "🚏", yEe = "🛣️", wEe = "🛤️", kEe = "🛢️", CEe = "⛽", xEe = "🚨", SEe = "🚥", EEe = "🚦", AEe = "🛑", $Ee = "🚧", MEe = "⚓", IEe = "⛵", TEe = "⛵", LEe = "🛶", OEe = "🚤", REe = "🛳️", PEe = "⛴️", BEe = "🛥️", zEe = "🚢", DEe = "✈️", NEe = "🛩️", qEe = "🛫", FEe = "🛬", jEe = "🪂", HEe = "💺", VEe = "🚁", UEe = "🚟", ZEe = "🚠", WEe = "🚡", GEe = "🛰️", KEe = "🚀", XEe = "🛸", YEe = "🛎️", JEe = "🧳", QEe = "⌛", eAe = "⏳", tAe = "⌚", nAe = "⏰", rAe = "⏱️", oAe = "⏲️", sAe = "🕰️", iAe = "🕛", aAe = "🕧", cAe = "🕐", lAe = "🕜", uAe = "🕑", dAe = "🕝", fAe = "🕒", pAe = "🕞", hAe = "🕓", gAe = "🕟", mAe = "🕔", vAe = "🕠", _Ae = "🕕", bAe = "🕡", yAe = "🕖", wAe = "🕢", kAe = "🕗", CAe = "🕣", xAe = "🕘", SAe = "🕤", EAe = "🕙", AAe = "🕥", $Ae = "🕚", MAe = "🕦", IAe = "🌑", TAe = "🌒", LAe = "🌓", OAe = "🌔", RAe = "🌔", PAe = "🌕", BAe = "🌖", zAe = "🌗", DAe = "🌘", NAe = "🌙", qAe = "🌚", FAe = "🌛", jAe = "🌜", HAe = "🌡️", VAe = "☀️", UAe = "🌝", ZAe = "🌞", WAe = "🪐", GAe = "⭐", KAe = "🌟", XAe = "🌠", YAe = "🌌", JAe = "☁️", QAe = "⛅", e$e = "⛈️", t$e = "🌤️", n$e = "🌥️", r$e = "🌦️", o$e = "🌧️", s$e = "🌨️", i$e = "🌩️", a$e = "🌪️", c$e = "🌫️", l$e = "🌬️", u$e = "🌀", d$e = "🌈", f$e = "🌂", p$e = "☂️", h$e = "☔", g$e = "⛱️", m$e = "⚡", v$e = "❄️", _$e = "☃️", b$e = "⛄", y$e = "☄️", w$e = "🔥", k$e = "💧", C$e = "🌊", x$e = "🎃", S$e = "🎄", E$e = "🎆", A$e = "🎇", $$e = "🧨", M$e = "✨", I$e = "🎈", T$e = "🎉", L$e = "🎊", O$e = "🎋", R$e = "🎍", P$e = "🎎", B$e = "🎏", z$e = "🎐", D$e = "🎑", N$e = "🧧", q$e = "🎀", F$e = "🎁", j$e = "🎗️", H$e = "🎟️", V$e = "🎫", U$e = "🎖️", Z$e = "🏆", W$e = "🏅", G$e = "⚽", K$e = "⚾", X$e = "🥎", Y$e = "🏀", J$e = "🏐", Q$e = "🏈", eMe = "🏉", tMe = "🎾", nMe = "🥏", rMe = "🎳", oMe = "🏏", sMe = "🏑", iMe = "🏒", aMe = "🥍", cMe = "🏓", lMe = "🏸", uMe = "🥊", dMe = "🥋", fMe = "🥅", pMe = "⛳", hMe = "⛸️", gMe = "🎣", mMe = "🤿", vMe = "🎽", _Me = "🎿", bMe = "🛷", yMe = "🥌", wMe = "🎯", kMe = "🪀", CMe = "🪁", xMe = "🔮", SMe = "🪄", EMe = "🧿", AMe = "🎮", $Me = "🕹️", MMe = "🎰", IMe = "🎲", TMe = "🧩", LMe = "🧸", OMe = "🪅", RMe = "🪆", PMe = "♠️", BMe = "♥️", zMe = "♦️", DMe = "♣️", NMe = "♟️", qMe = "🃏", FMe = "🀄", jMe = "🎴", HMe = "🎭", VMe = "🖼️", UMe = "🎨", ZMe = "🧵", WMe = "🪡", GMe = "🧶", KMe = "🪢", XMe = "👓", YMe = "🕶️", JMe = "🥽", QMe = "🥼", eIe = "🦺", tIe = "👔", nIe = "👕", rIe = "👕", oIe = "👖", sIe = "🧣", iIe = "🧤", aIe = "🧥", cIe = "🧦", lIe = "👗", uIe = "👘", dIe = "🥻", fIe = "🩱", pIe = "🩲", hIe = "🩳", gIe = "👙", mIe = "👚", vIe = "👛", _Ie = "👜", bIe = "👝", yIe = "🛍️", wIe = "🎒", kIe = "🩴", CIe = "👞", xIe = "👞", SIe = "👟", EIe = "🥾", AIe = "🥿", $Ie = "👠", MIe = "👡", IIe = "🩰", TIe = "👢", LIe = "👑", OIe = "👒", RIe = "🎩", PIe = "🎓", BIe = "🧢", zIe = "🪖", DIe = "⛑️", NIe = "📿", qIe = "💄", FIe = "💍", jIe = "💎", HIe = "🔇", VIe = "🔈", UIe = "🔉", ZIe = "🔊", WIe = "📢", GIe = "📣", KIe = "📯", XIe = "🔔", YIe = "🔕", JIe = "🎼", QIe = "🎵", eTe = "🎶", tTe = "🎙️", nTe = "🎚️", rTe = "🎛️", oTe = "🎤", sTe = "🎧", iTe = "📻", aTe = "🎷", cTe = "🪗", lTe = "🎸", uTe = "🎹", dTe = "🎺", fTe = "🎻", pTe = "🪕", hTe = "🥁", gTe = "🪘", mTe = "📱", vTe = "📲", _Te = "☎️", bTe = "☎️", yTe = "📞", wTe = "📟", kTe = "📠", CTe = "🔋", xTe = "🔌", STe = "💻", ETe = "🖥️", ATe = "🖨️", $Te = "⌨️", MTe = "🖱️", ITe = "🖲️", TTe = "💽", LTe = "💾", OTe = "💿", RTe = "📀", PTe = "🧮", BTe = "🎥", zTe = "🎞️", DTe = "📽️", NTe = "🎬", qTe = "📺", FTe = "📷", jTe = "📸", HTe = "📹", VTe = "📼", UTe = "🔍", ZTe = "🔎", WTe = "🕯️", GTe = "💡", KTe = "🔦", XTe = "🏮", YTe = "🏮", JTe = "🪔", QTe = "📔", eLe = "📕", tLe = "📖", nLe = "📖", rLe = "📗", oLe = "📘", sLe = "📙", iLe = "📚", aLe = "📓", cLe = "📒", lLe = "📃", uLe = "📜", dLe = "📄", fLe = "📰", pLe = "🗞️", hLe = "📑", gLe = "🔖", mLe = "🏷️", vLe = "💰", _Le = "🪙", bLe = "💴", yLe = "💵", wLe = "💶", kLe = "💷", CLe = "💸", xLe = "💳", SLe = "🧾", ELe = "💹", ALe = "✉️", $Le = "📧", MLe = "📨", ILe = "📩", TLe = "📤", LLe = "📥", OLe = "📫", RLe = "📪", PLe = "📬", BLe = "📭", zLe = "📮", DLe = "🗳️", NLe = "✏️", qLe = "✒️", FLe = "🖋️", jLe = "🖊️", HLe = "🖌️", VLe = "🖍️", ULe = "📝", ZLe = "📝", WLe = "💼", GLe = "📁", KLe = "📂", XLe = "🗂️", YLe = "📅", JLe = "📆", QLe = "🗒️", eOe = "🗓️", tOe = "📇", nOe = "📈", rOe = "📉", oOe = "📊", sOe = "📋", iOe = "📌", aOe = "📍", cOe = "📎", lOe = "🖇️", uOe = "📏", dOe = "📐", fOe = "✂️", pOe = "🗃️", hOe = "🗄️", gOe = "🗑️", mOe = "🔒", vOe = "🔓", _Oe = "🔏", bOe = "🔐", yOe = "🔑", wOe = "🗝️", kOe = "🔨", COe = "🪓", xOe = "⛏️", SOe = "⚒️", EOe = "🛠️", AOe = "🗡️", $Oe = "⚔️", MOe = "🔫", IOe = "🪃", TOe = "🏹", LOe = "🛡️", OOe = "🪚", ROe = "🔧", POe = "🪛", BOe = "🔩", zOe = "⚙️", DOe = "🗜️", NOe = "⚖️", qOe = "🦯", FOe = "🔗", jOe = "⛓️", HOe = "🪝", VOe = "🧰", UOe = "🧲", ZOe = "🪜", WOe = "⚗️", GOe = "🧪", KOe = "🧫", XOe = "🧬", YOe = "🔬", JOe = "🔭", QOe = "📡", eRe = "💉", tRe = "🩸", nRe = "💊", rRe = "🩹", oRe = "🩺", sRe = "🚪", iRe = "🛗", aRe = "🪞", cRe = "🪟", lRe = "🛏️", uRe = "🛋️", dRe = "🪑", fRe = "🚽", pRe = "🪠", hRe = "🚿", gRe = "🛁", mRe = "🪤", vRe = "🪒", _Re = "🧴", bRe = "🧷", yRe = "🧹", wRe = "🧺", kRe = "🧻", CRe = "🪣", xRe = "🧼", SRe = "🪥", ERe = "🧽", ARe = "🧯", $Re = "🛒", MRe = "🚬", IRe = "⚰️", TRe = "🪦", LRe = "⚱️", ORe = "🗿", RRe = "🪧", PRe = "🏧", BRe = "🚮", zRe = "🚰", DRe = "♿", NRe = "🚹", qRe = "🚺", FRe = "🚻", jRe = "🚼", HRe = "🚾", VRe = "🛂", URe = "🛃", ZRe = "🛄", WRe = "🛅", GRe = "⚠️", KRe = "🚸", XRe = "⛔", YRe = "🚫", JRe = "🚳", QRe = "🚭", ePe = "🚯", tPe = "🚷", nPe = "📵", rPe = "🔞", oPe = "☢️", sPe = "☣️", iPe = "⬆️", aPe = "↗️", cPe = "➡️", lPe = "↘️", uPe = "⬇️", dPe = "↙️", fPe = "⬅️", pPe = "↖️", hPe = "↕️", gPe = "↔️", mPe = "↩️", vPe = "↪️", _Pe = "⤴️", bPe = "⤵️", yPe = "🔃", wPe = "🔄", kPe = "🔙", CPe = "🔚", xPe = "🔛", SPe = "🔜", EPe = "🔝", APe = "🛐", $Pe = "⚛️", MPe = "🕉️", IPe = "✡️", TPe = "☸️", LPe = "☯️", OPe = "✝️", RPe = "☦️", PPe = "☪️", BPe = "☮️", zPe = "🕎", DPe = "🔯", NPe = "♈", qPe = "♉", FPe = "♊", jPe = "♋", HPe = "♌", VPe = "♍", UPe = "♎", ZPe = "♏", WPe = "♐", GPe = "♑", KPe = "♒", XPe = "♓", YPe = "⛎", JPe = "🔀", QPe = "🔁", eBe = "🔂", tBe = "▶️", nBe = "⏩", rBe = "⏭️", oBe = "⏯️", sBe = "◀️", iBe = "⏪", aBe = "⏮️", cBe = "🔼", lBe = "⏫", uBe = "🔽", dBe = "⏬", fBe = "⏸️", pBe = "⏹️", hBe = "⏺️", gBe = "⏏️", mBe = "🎦", vBe = "🔅", _Be = "🔆", bBe = "📶", yBe = "📳", wBe = "📴", kBe = "♀️", CBe = "♂️", xBe = "⚧️", SBe = "✖️", EBe = "➕", ABe = "➖", $Be = "➗", MBe = "♾️", IBe = "‼️", TBe = "⁉️", LBe = "❓", OBe = "❔", RBe = "❕", PBe = "❗", BBe = "❗", zBe = "〰️", DBe = "💱", NBe = "💲", qBe = "⚕️", FBe = "♻️", jBe = "⚜️", HBe = "🔱", VBe = "📛", UBe = "🔰", ZBe = "⭕", WBe = "✅", GBe = "☑️", KBe = "✔️", XBe = "❌", YBe = "❎", JBe = "➰", QBe = "➿", eze = "〽️", tze = "✳️", nze = "✴️", rze = "❇️", oze = "©️", sze = "®️", ize = "™️", aze = "#️⃣", cze = "*️⃣", lze = "0️⃣", uze = "1️⃣", dze = "2️⃣", fze = "3️⃣", pze = "4️⃣", hze = "5️⃣", gze = "6️⃣", mze = "7️⃣", vze = "8️⃣", _ze = "9️⃣", bze = "🔟", yze = "🔠", wze = "🔡", kze = "🔣", Cze = "🔤", xze = "🅰️", Sze = "🆎", Eze = "🅱️", Aze = "🆑", $ze = "🆒", Mze = "🆓", Ize = "ℹ️", Tze = "🆔", Lze = "Ⓜ️", Oze = "🆖", Rze = "🅾️", Pze = "🆗", Bze = "🅿️", zze = "🆘", Dze = "🆙", Nze = "🆚", qze = "🈁", Fze = "🈂️", jze = "🉐", Hze = "🉑", Vze = "㊗️", Uze = "㊙️", Zze = "🈵", Wze = "🔴", Gze = "🟠", Kze = "🟡", Xze = "🟢", Yze = "🔵", Jze = "🟣", Qze = "🟤", eDe = "⚫", tDe = "⚪", nDe = "🟥", rDe = "🟧", oDe = "🟨", sDe = "🟩", iDe = "🟦", aDe = "🟪", cDe = "🟫", lDe = "⬛", uDe = "⬜", dDe = "◼️", fDe = "◻️", pDe = "◾", hDe = "◽", gDe = "▪️", mDe = "▫️", vDe = "🔶", _De = "🔷", bDe = "🔸", yDe = "🔹", wDe = "🔺", kDe = "🔻", CDe = "💠", xDe = "🔘", SDe = "🔳", EDe = "🔲", ADe = "🏁", $De = "🚩", MDe = "🎌", IDe = "🏴", TDe = "🏳️", LDe = "🏳️‍🌈", ODe = "🏳️‍⚧️", RDe = "🏴‍☠️", PDe = "🇦🇨", BDe = "🇦🇩", zDe = "🇦🇪", DDe = "🇦🇫", NDe = "🇦🇬", qDe = "🇦🇮", FDe = "🇦🇱", jDe = "🇦🇲", HDe = "🇦🇴", VDe = "🇦🇶", UDe = "🇦🇷", ZDe = "🇦🇸", WDe = "🇦🇹", GDe = "🇦🇺", KDe = "🇦🇼", XDe = "🇦🇽", YDe = "🇦🇿", JDe = "🇧🇦", QDe = "🇧🇧", eNe = "🇧🇩", tNe = "🇧🇪", nNe = "🇧🇫", rNe = "🇧🇬", oNe = "🇧🇭", sNe = "🇧🇮", iNe = "🇧🇯", aNe = "🇧🇱", cNe = "🇧🇲", lNe = "🇧🇳", uNe = "🇧🇴", dNe = "🇧🇶", fNe = "🇧🇷", pNe = "🇧🇸", hNe = "🇧🇹", gNe = "🇧🇻", mNe = "🇧🇼", vNe = "🇧🇾", _Ne = "🇧🇿", bNe = "🇨🇦", yNe = "🇨🇨", wNe = "🇨🇩", kNe = "🇨🇫", CNe = "🇨🇬", xNe = "🇨🇭", SNe = "🇨🇮", ENe = "🇨🇰", ANe = "🇨🇱", $Ne = "🇨🇲", MNe = "🇨🇳", INe = "🇨🇴", TNe = "🇨🇵", LNe = "🇨🇷", ONe = "🇨🇺", RNe = "🇨🇻", PNe = "🇨🇼", BNe = "🇨🇽", zNe = "🇨🇾", DNe = "🇨🇿", NNe = "🇩🇪", qNe = "🇩🇬", FNe = "🇩🇯", jNe = "🇩🇰", HNe = "🇩🇲", VNe = "🇩🇴", UNe = "🇩🇿", ZNe = "🇪🇦", WNe = "🇪🇨", GNe = "🇪🇪", KNe = "🇪🇬", XNe = "🇪🇭", YNe = "🇪🇷", JNe = "🇪🇸", QNe = "🇪🇹", eqe = "🇪🇺", tqe = "🇪🇺", nqe = "🇫🇮", rqe = "🇫🇯", oqe = "🇫🇰", sqe = "🇫🇲", iqe = "🇫🇴", aqe = "🇫🇷", cqe = "🇬🇦", lqe = "🇬🇧", uqe = "🇬🇧", dqe = "🇬🇩", fqe = "🇬🇪", pqe = "🇬🇫", hqe = "🇬🇬", gqe = "🇬🇭", mqe = "🇬🇮", vqe = "🇬🇱", _qe = "🇬🇲", bqe = "🇬🇳", yqe = "🇬🇵", wqe = "🇬🇶", kqe = "🇬🇷", Cqe = "🇬🇸", xqe = "🇬🇹", Sqe = "🇬🇺", Eqe = "🇬🇼", Aqe = "🇬🇾", $qe = "🇭🇰", Mqe = "🇭🇲", Iqe = "🇭🇳", Tqe = "🇭🇷", Lqe = "🇭🇹", Oqe = "🇭🇺", Rqe = "🇮🇨", Pqe = "🇮🇩", Bqe = "🇮🇪", zqe = "🇮🇱", Dqe = "🇮🇲", Nqe = "🇮🇳", qqe = "🇮🇴", Fqe = "🇮🇶", jqe = "🇮🇷", Hqe = "🇮🇸", Vqe = "🇮🇹", Uqe = "🇯🇪", Zqe = "🇯🇲", Wqe = "🇯🇴", Gqe = "🇯🇵", Kqe = "🇰🇪", Xqe = "🇰🇬", Yqe = "🇰🇭", Jqe = "🇰🇮", Qqe = "🇰🇲", eFe = "🇰🇳", tFe = "🇰🇵", nFe = "🇰🇷", rFe = "🇰🇼", oFe = "🇰🇾", sFe = "🇰🇿", iFe = "🇱🇦", aFe = "🇱🇧", cFe = "🇱🇨", lFe = "🇱🇮", uFe = "🇱🇰", dFe = "🇱🇷", fFe = "🇱🇸", pFe = "🇱🇹", hFe = "🇱🇺", gFe = "🇱🇻", mFe = "🇱🇾", vFe = "🇲🇦", _Fe = "🇲🇨", bFe = "🇲🇩", yFe = "🇲🇪", wFe = "🇲🇫", kFe = "🇲🇬", CFe = "🇲🇭", xFe = "🇲🇰", SFe = "🇲🇱", EFe = "🇲🇲", AFe = "🇲🇳", $Fe = "🇲🇴", MFe = "🇲🇵", IFe = "🇲🇶", TFe = "🇲🇷", LFe = "🇲🇸", OFe = "🇲🇹", RFe = "🇲🇺", PFe = "🇲🇻", BFe = "🇲🇼", zFe = "🇲🇽", DFe = "🇲🇾", NFe = "🇲🇿", qFe = "🇳🇦", FFe = "🇳🇨", jFe = "🇳🇪", HFe = "🇳🇫", VFe = "🇳🇬", UFe = "🇳🇮", ZFe = "🇳🇱", WFe = "🇳🇴", GFe = "🇳🇵", KFe = "🇳🇷", XFe = "🇳🇺", YFe = "🇳🇿", JFe = "🇴🇲", QFe = "🇵🇦", eje = "🇵🇪", tje = "🇵🇫", nje = "🇵🇬", rje = "🇵🇭", oje = "🇵🇰", sje = "🇵🇱", ije = "🇵🇲", aje = "🇵🇳", cje = "🇵🇷", lje = "🇵🇸", uje = "🇵🇹", dje = "🇵🇼", fje = "🇵🇾", pje = "🇶🇦", hje = "🇷🇪", gje = "🇷🇴", mje = "🇷🇸", vje = "🇷🇺", _je = "🇷🇼", bje = "🇸🇦", yje = "🇸🇧", wje = "🇸🇨", kje = "🇸🇩", Cje = "🇸🇪", xje = "🇸🇬", Sje = "🇸🇭", Eje = "🇸🇮", Aje = "🇸🇯", $je = "🇸🇰", Mje = "🇸🇱", Ije = "🇸🇲", Tje = "🇸🇳", Lje = "🇸🇴", Oje = "🇸🇷", Rje = "🇸🇸", Pje = "🇸🇹", Bje = "🇸🇻", zje = "🇸🇽", Dje = "🇸🇾", Nje = "🇸🇿", qje = "🇹🇦", Fje = "🇹🇨", jje = "🇹🇩", Hje = "🇹🇫", Vje = "🇹🇬", Uje = "🇹🇭", Zje = "🇹🇯", Wje = "🇹🇰", Gje = "🇹🇱", Kje = "🇹🇲", Xje = "🇹🇳", Yje = "🇹🇴", Jje = "🇹🇷", Qje = "🇹🇹", eHe = "🇹🇻", tHe = "🇹🇼", nHe = "🇹🇿", rHe = "🇺🇦", oHe = "🇺🇬", sHe = "🇺🇲", iHe = "🇺🇳", aHe = "🇺🇸", cHe = "🇺🇾", lHe = "🇺🇿", uHe = "🇻🇦", dHe = "🇻🇨", fHe = "🇻🇪", pHe = "🇻🇬", hHe = "🇻🇮", gHe = "🇻🇳", mHe = "🇻🇺", vHe = "🇼🇫", _He = "🇼🇸", bHe = "🇽🇰", yHe = "🇾🇪", wHe = "🇾🇹", kHe = "🇿🇦", CHe = "🇿🇲", xHe = "🇿🇼", SHe = "🏴󠁧󠁢󠁥󠁮󠁧󠁿", EHe = "🏴󠁧󠁢󠁳󠁣󠁴󠁿", AHe = "🏴󠁧󠁢󠁷󠁬󠁳󠁿", $He = {
  100: "💯",
  1234: "🔢",
  grinning: Nme,
  smiley: qme,
  smile: Fme,
  grin: jme,
  laughing: Hme,
  satisfied: Vme,
  sweat_smile: Ume,
  rofl: Zme,
  joy: Wme,
  slightly_smiling_face: Gme,
  upside_down_face: Kme,
  wink: Xme,
  blush: Yme,
  innocent: Jme,
  smiling_face_with_three_hearts: Qme,
  heart_eyes: eve,
  star_struck: tve,
  kissing_heart: nve,
  kissing: rve,
  relaxed: ove,
  kissing_closed_eyes: sve,
  kissing_smiling_eyes: ive,
  smiling_face_with_tear: ave,
  yum: cve,
  stuck_out_tongue: lve,
  stuck_out_tongue_winking_eye: uve,
  zany_face: dve,
  stuck_out_tongue_closed_eyes: fve,
  money_mouth_face: pve,
  hugs: hve,
  hand_over_mouth: gve,
  shushing_face: mve,
  thinking: vve,
  zipper_mouth_face: _ve,
  raised_eyebrow: bve,
  neutral_face: yve,
  expressionless: wve,
  no_mouth: kve,
  smirk: Cve,
  unamused: xve,
  roll_eyes: Sve,
  grimacing: Eve,
  lying_face: Ave,
  relieved: $ve,
  pensive: Mve,
  sleepy: Ive,
  drooling_face: Tve,
  sleeping: Lve,
  mask: Ove,
  face_with_thermometer: Rve,
  face_with_head_bandage: Pve,
  nauseated_face: Bve,
  vomiting_face: zve,
  sneezing_face: Dve,
  hot_face: Nve,
  cold_face: qve,
  woozy_face: Fve,
  dizzy_face: jve,
  exploding_head: Hve,
  cowboy_hat_face: Vve,
  partying_face: Uve,
  disguised_face: Zve,
  sunglasses: Wve,
  nerd_face: Gve,
  monocle_face: Kve,
  confused: Xve,
  worried: Yve,
  slightly_frowning_face: Jve,
  frowning_face: Qve,
  open_mouth: e_e,
  hushed: t_e,
  astonished: n_e,
  flushed: r_e,
  pleading_face: o_e,
  frowning: s_e,
  anguished: i_e,
  fearful: a_e,
  cold_sweat: c_e,
  disappointed_relieved: l_e,
  cry: u_e,
  sob: d_e,
  scream: f_e,
  confounded: p_e,
  persevere: h_e,
  disappointed: g_e,
  sweat: m_e,
  weary: v_e,
  tired_face: __e,
  yawning_face: b_e,
  triumph: y_e,
  rage: w_e,
  pout: k_e,
  angry: C_e,
  cursing_face: x_e,
  smiling_imp: S_e,
  imp: E_e,
  skull: A_e,
  skull_and_crossbones: $_e,
  hankey: M_e,
  poop: I_e,
  shit: T_e,
  clown_face: L_e,
  japanese_ogre: O_e,
  japanese_goblin: R_e,
  ghost: P_e,
  alien: B_e,
  space_invader: z_e,
  robot: D_e,
  smiley_cat: N_e,
  smile_cat: q_e,
  joy_cat: F_e,
  heart_eyes_cat: j_e,
  smirk_cat: H_e,
  kissing_cat: V_e,
  scream_cat: U_e,
  crying_cat_face: Z_e,
  pouting_cat: W_e,
  see_no_evil: G_e,
  hear_no_evil: K_e,
  speak_no_evil: X_e,
  kiss: Y_e,
  love_letter: J_e,
  cupid: Q_e,
  gift_heart: ebe,
  sparkling_heart: tbe,
  heartpulse: nbe,
  heartbeat: rbe,
  revolving_hearts: obe,
  two_hearts: sbe,
  heart_decoration: ibe,
  heavy_heart_exclamation: abe,
  broken_heart: cbe,
  heart: lbe,
  orange_heart: ube,
  yellow_heart: dbe,
  green_heart: fbe,
  blue_heart: pbe,
  purple_heart: hbe,
  brown_heart: gbe,
  black_heart: mbe,
  white_heart: vbe,
  anger: _be,
  boom: bbe,
  collision: ybe,
  dizzy: wbe,
  sweat_drops: kbe,
  dash: Cbe,
  hole: xbe,
  bomb: Sbe,
  speech_balloon: Ebe,
  eye_speech_bubble: Abe,
  left_speech_bubble: $be,
  right_anger_bubble: Mbe,
  thought_balloon: Ibe,
  zzz: Tbe,
  wave: Lbe,
  raised_back_of_hand: Obe,
  raised_hand_with_fingers_splayed: Rbe,
  hand: Pbe,
  raised_hand: Bbe,
  vulcan_salute: zbe,
  ok_hand: Dbe,
  pinched_fingers: Nbe,
  pinching_hand: qbe,
  v: Fbe,
  crossed_fingers: jbe,
  love_you_gesture: Hbe,
  metal: Vbe,
  call_me_hand: Ube,
  point_left: Zbe,
  point_right: Wbe,
  point_up_2: Gbe,
  middle_finger: Kbe,
  fu: Xbe,
  point_down: Ybe,
  point_up: Jbe,
  "+1": "👍",
  thumbsup: Qbe,
  "-1": "👎",
  thumbsdown: eye,
  fist_raised: tye,
  fist: nye,
  fist_oncoming: rye,
  facepunch: oye,
  punch: sye,
  fist_left: iye,
  fist_right: aye,
  clap: cye,
  raised_hands: lye,
  open_hands: uye,
  palms_up_together: dye,
  handshake: fye,
  pray: pye,
  writing_hand: hye,
  nail_care: gye,
  selfie: mye,
  muscle: vye,
  mechanical_arm: _ye,
  mechanical_leg: bye,
  leg: yye,
  foot: wye,
  ear: kye,
  ear_with_hearing_aid: Cye,
  nose: xye,
  brain: Sye,
  anatomical_heart: Eye,
  lungs: Aye,
  tooth: $ye,
  bone: Mye,
  eyes: Iye,
  eye: Tye,
  tongue: Lye,
  lips: Oye,
  baby: Rye,
  child: Pye,
  boy: Bye,
  girl: zye,
  adult: Dye,
  blond_haired_person: Nye,
  man: qye,
  bearded_person: Fye,
  red_haired_man: jye,
  curly_haired_man: Hye,
  white_haired_man: Vye,
  bald_man: Uye,
  woman: Zye,
  red_haired_woman: Wye,
  person_red_hair: Gye,
  curly_haired_woman: Kye,
  person_curly_hair: Xye,
  white_haired_woman: Yye,
  person_white_hair: Jye,
  bald_woman: Qye,
  person_bald: ewe,
  blond_haired_woman: twe,
  blonde_woman: nwe,
  blond_haired_man: rwe,
  older_adult: owe,
  older_man: swe,
  older_woman: iwe,
  frowning_person: awe,
  frowning_man: cwe,
  frowning_woman: lwe,
  pouting_face: uwe,
  pouting_man: dwe,
  pouting_woman: fwe,
  no_good: pwe,
  no_good_man: hwe,
  ng_man: gwe,
  no_good_woman: mwe,
  ng_woman: vwe,
  ok_person: _we,
  ok_man: bwe,
  ok_woman: ywe,
  tipping_hand_person: wwe,
  information_desk_person: kwe,
  tipping_hand_man: Cwe,
  sassy_man: xwe,
  tipping_hand_woman: Swe,
  sassy_woman: Ewe,
  raising_hand: Awe,
  raising_hand_man: $we,
  raising_hand_woman: Mwe,
  deaf_person: Iwe,
  deaf_man: Twe,
  deaf_woman: Lwe,
  bow: Owe,
  bowing_man: Rwe,
  bowing_woman: Pwe,
  facepalm: Bwe,
  man_facepalming: zwe,
  woman_facepalming: Dwe,
  shrug: Nwe,
  man_shrugging: qwe,
  woman_shrugging: Fwe,
  health_worker: jwe,
  man_health_worker: Hwe,
  woman_health_worker: Vwe,
  student: Uwe,
  man_student: Zwe,
  woman_student: Wwe,
  teacher: Gwe,
  man_teacher: Kwe,
  woman_teacher: Xwe,
  judge: Ywe,
  man_judge: Jwe,
  woman_judge: Qwe,
  farmer: eke,
  man_farmer: tke,
  woman_farmer: nke,
  cook: rke,
  man_cook: oke,
  woman_cook: ske,
  mechanic: ike,
  man_mechanic: ake,
  woman_mechanic: cke,
  factory_worker: lke,
  man_factory_worker: uke,
  woman_factory_worker: dke,
  office_worker: fke,
  man_office_worker: pke,
  woman_office_worker: hke,
  scientist: gke,
  man_scientist: mke,
  woman_scientist: vke,
  technologist: _ke,
  man_technologist: bke,
  woman_technologist: yke,
  singer: wke,
  man_singer: kke,
  woman_singer: Cke,
  artist: xke,
  man_artist: Ske,
  woman_artist: Eke,
  pilot: Ake,
  man_pilot: $ke,
  woman_pilot: Mke,
  astronaut: Ike,
  man_astronaut: Tke,
  woman_astronaut: Lke,
  firefighter: Oke,
  man_firefighter: Rke,
  woman_firefighter: Pke,
  police_officer: Bke,
  cop: zke,
  policeman: Dke,
  policewoman: Nke,
  detective: qke,
  male_detective: Fke,
  female_detective: jke,
  guard: Hke,
  guardsman: Vke,
  guardswoman: Uke,
  ninja: Zke,
  construction_worker: Wke,
  construction_worker_man: Gke,
  construction_worker_woman: Kke,
  prince: Xke,
  princess: Yke,
  person_with_turban: Jke,
  man_with_turban: Qke,
  woman_with_turban: e4e,
  man_with_gua_pi_mao: t4e,
  woman_with_headscarf: n4e,
  person_in_tuxedo: r4e,
  man_in_tuxedo: o4e,
  woman_in_tuxedo: s4e,
  person_with_veil: i4e,
  man_with_veil: a4e,
  woman_with_veil: c4e,
  bride_with_veil: l4e,
  pregnant_woman: u4e,
  breast_feeding: d4e,
  woman_feeding_baby: f4e,
  man_feeding_baby: p4e,
  person_feeding_baby: h4e,
  angel: g4e,
  santa: m4e,
  mrs_claus: v4e,
  mx_claus: _4e,
  superhero: b4e,
  superhero_man: y4e,
  superhero_woman: w4e,
  supervillain: k4e,
  supervillain_man: C4e,
  supervillain_woman: x4e,
  mage: S4e,
  mage_man: E4e,
  mage_woman: A4e,
  fairy: $4e,
  fairy_man: M4e,
  fairy_woman: I4e,
  vampire: T4e,
  vampire_man: L4e,
  vampire_woman: O4e,
  merperson: R4e,
  merman: P4e,
  mermaid: B4e,
  elf: z4e,
  elf_man: D4e,
  elf_woman: N4e,
  genie: q4e,
  genie_man: F4e,
  genie_woman: j4e,
  zombie: H4e,
  zombie_man: V4e,
  zombie_woman: U4e,
  massage: Z4e,
  massage_man: W4e,
  massage_woman: G4e,
  haircut: K4e,
  haircut_man: X4e,
  haircut_woman: Y4e,
  walking: J4e,
  walking_man: Q4e,
  walking_woman: e3e,
  standing_person: t3e,
  standing_man: n3e,
  standing_woman: r3e,
  kneeling_person: o3e,
  kneeling_man: s3e,
  kneeling_woman: i3e,
  person_with_probing_cane: a3e,
  man_with_probing_cane: c3e,
  woman_with_probing_cane: l3e,
  person_in_motorized_wheelchair: u3e,
  man_in_motorized_wheelchair: d3e,
  woman_in_motorized_wheelchair: f3e,
  person_in_manual_wheelchair: p3e,
  man_in_manual_wheelchair: h3e,
  woman_in_manual_wheelchair: g3e,
  runner: m3e,
  running: v3e,
  running_man: _3e,
  running_woman: b3e,
  woman_dancing: y3e,
  dancer: w3e,
  man_dancing: k3e,
  business_suit_levitating: C3e,
  dancers: x3e,
  dancing_men: S3e,
  dancing_women: E3e,
  sauna_person: A3e,
  sauna_man: $3e,
  sauna_woman: M3e,
  climbing: I3e,
  climbing_man: T3e,
  climbing_woman: L3e,
  person_fencing: O3e,
  horse_racing: R3e,
  skier: P3e,
  snowboarder: B3e,
  golfing: z3e,
  golfing_man: D3e,
  golfing_woman: N3e,
  surfer: q3e,
  surfing_man: F3e,
  surfing_woman: j3e,
  rowboat: H3e,
  rowing_man: V3e,
  rowing_woman: U3e,
  swimmer: Z3e,
  swimming_man: W3e,
  swimming_woman: G3e,
  bouncing_ball_person: K3e,
  bouncing_ball_man: X3e,
  basketball_man: Y3e,
  bouncing_ball_woman: J3e,
  basketball_woman: Q3e,
  weight_lifting: e5e,
  weight_lifting_man: t5e,
  weight_lifting_woman: n5e,
  bicyclist: r5e,
  biking_man: o5e,
  biking_woman: s5e,
  mountain_bicyclist: i5e,
  mountain_biking_man: a5e,
  mountain_biking_woman: c5e,
  cartwheeling: l5e,
  man_cartwheeling: u5e,
  woman_cartwheeling: d5e,
  wrestling: f5e,
  men_wrestling: p5e,
  women_wrestling: h5e,
  water_polo: g5e,
  man_playing_water_polo: m5e,
  woman_playing_water_polo: v5e,
  handball_person: _5e,
  man_playing_handball: b5e,
  woman_playing_handball: y5e,
  juggling_person: w5e,
  man_juggling: k5e,
  woman_juggling: C5e,
  lotus_position: x5e,
  lotus_position_man: S5e,
  lotus_position_woman: E5e,
  bath: A5e,
  sleeping_bed: $5e,
  people_holding_hands: M5e,
  two_women_holding_hands: I5e,
  couple: T5e,
  two_men_holding_hands: L5e,
  couplekiss: O5e,
  couplekiss_man_woman: R5e,
  couplekiss_man_man: P5e,
  couplekiss_woman_woman: B5e,
  couple_with_heart: z5e,
  couple_with_heart_woman_man: D5e,
  couple_with_heart_man_man: N5e,
  couple_with_heart_woman_woman: q5e,
  family: F5e,
  family_man_woman_boy: j5e,
  family_man_woman_girl: H5e,
  family_man_woman_girl_boy: V5e,
  family_man_woman_boy_boy: U5e,
  family_man_woman_girl_girl: Z5e,
  family_man_man_boy: W5e,
  family_man_man_girl: G5e,
  family_man_man_girl_boy: K5e,
  family_man_man_boy_boy: X5e,
  family_man_man_girl_girl: Y5e,
  family_woman_woman_boy: J5e,
  family_woman_woman_girl: Q5e,
  family_woman_woman_girl_boy: e6e,
  family_woman_woman_boy_boy: t6e,
  family_woman_woman_girl_girl: n6e,
  family_man_boy: r6e,
  family_man_boy_boy: o6e,
  family_man_girl: s6e,
  family_man_girl_boy: i6e,
  family_man_girl_girl: a6e,
  family_woman_boy: c6e,
  family_woman_boy_boy: l6e,
  family_woman_girl: u6e,
  family_woman_girl_boy: d6e,
  family_woman_girl_girl: f6e,
  speaking_head: p6e,
  bust_in_silhouette: h6e,
  busts_in_silhouette: g6e,
  people_hugging: m6e,
  footprints: v6e,
  monkey_face: _6e,
  monkey: b6e,
  gorilla: y6e,
  orangutan: w6e,
  dog: k6e,
  dog2: C6e,
  guide_dog: x6e,
  service_dog: S6e,
  poodle: E6e,
  wolf: A6e,
  fox_face: $6e,
  raccoon: M6e,
  cat: I6e,
  cat2: T6e,
  black_cat: L6e,
  lion: O6e,
  tiger: R6e,
  tiger2: P6e,
  leopard: B6e,
  horse: z6e,
  racehorse: D6e,
  unicorn: N6e,
  zebra: q6e,
  deer: F6e,
  bison: j6e,
  cow: H6e,
  ox: V6e,
  water_buffalo: U6e,
  cow2: Z6e,
  pig: W6e,
  pig2: G6e,
  boar: K6e,
  pig_nose: X6e,
  ram: Y6e,
  sheep: J6e,
  goat: Q6e,
  dromedary_camel: e8e,
  camel: t8e,
  llama: n8e,
  giraffe: r8e,
  elephant: o8e,
  mammoth: s8e,
  rhinoceros: i8e,
  hippopotamus: a8e,
  mouse: c8e,
  mouse2: l8e,
  rat: u8e,
  hamster: d8e,
  rabbit: f8e,
  rabbit2: p8e,
  chipmunk: h8e,
  beaver: g8e,
  hedgehog: m8e,
  bat: v8e,
  bear: _8e,
  polar_bear: b8e,
  koala: y8e,
  panda_face: w8e,
  sloth: k8e,
  otter: C8e,
  skunk: x8e,
  kangaroo: S8e,
  badger: E8e,
  feet: A8e,
  paw_prints: $8e,
  turkey: M8e,
  chicken: I8e,
  rooster: T8e,
  hatching_chick: L8e,
  baby_chick: O8e,
  hatched_chick: R8e,
  bird: P8e,
  penguin: B8e,
  dove: z8e,
  eagle: D8e,
  duck: N8e,
  swan: q8e,
  owl: F8e,
  dodo: j8e,
  feather: H8e,
  flamingo: V8e,
  peacock: U8e,
  parrot: Z8e,
  frog: W8e,
  crocodile: G8e,
  turtle: K8e,
  lizard: X8e,
  snake: Y8e,
  dragon_face: J8e,
  dragon: Q8e,
  sauropod: eCe,
  "t-rex": "🦖",
  whale: tCe,
  whale2: nCe,
  dolphin: rCe,
  flipper: oCe,
  seal: sCe,
  fish: iCe,
  tropical_fish: aCe,
  blowfish: cCe,
  shark: lCe,
  octopus: uCe,
  shell: dCe,
  snail: fCe,
  butterfly: pCe,
  bug: hCe,
  ant: gCe,
  bee: mCe,
  honeybee: vCe,
  beetle: _Ce,
  lady_beetle: bCe,
  cricket: yCe,
  cockroach: wCe,
  spider: kCe,
  spider_web: CCe,
  scorpion: xCe,
  mosquito: SCe,
  fly: ECe,
  worm: ACe,
  microbe: $Ce,
  bouquet: MCe,
  cherry_blossom: ICe,
  white_flower: TCe,
  rosette: LCe,
  rose: OCe,
  wilted_flower: RCe,
  hibiscus: PCe,
  sunflower: BCe,
  blossom: zCe,
  tulip: DCe,
  seedling: NCe,
  potted_plant: qCe,
  evergreen_tree: FCe,
  deciduous_tree: jCe,
  palm_tree: HCe,
  cactus: VCe,
  ear_of_rice: UCe,
  herb: ZCe,
  shamrock: WCe,
  four_leaf_clover: GCe,
  maple_leaf: KCe,
  fallen_leaf: XCe,
  leaves: YCe,
  grapes: JCe,
  melon: QCe,
  watermelon: exe,
  tangerine: txe,
  orange: nxe,
  mandarin: rxe,
  lemon: oxe,
  banana: sxe,
  pineapple: ixe,
  mango: axe,
  apple: cxe,
  green_apple: lxe,
  pear: uxe,
  peach: dxe,
  cherries: fxe,
  strawberry: pxe,
  blueberries: hxe,
  kiwi_fruit: gxe,
  tomato: mxe,
  olive: vxe,
  coconut: _xe,
  avocado: bxe,
  eggplant: yxe,
  potato: wxe,
  carrot: kxe,
  corn: Cxe,
  hot_pepper: xxe,
  bell_pepper: Sxe,
  cucumber: Exe,
  leafy_green: Axe,
  broccoli: $xe,
  garlic: Mxe,
  onion: Ixe,
  mushroom: Txe,
  peanuts: Lxe,
  chestnut: Oxe,
  bread: Rxe,
  croissant: Pxe,
  baguette_bread: Bxe,
  flatbread: zxe,
  pretzel: Dxe,
  bagel: Nxe,
  pancakes: qxe,
  waffle: Fxe,
  cheese: jxe,
  meat_on_bone: Hxe,
  poultry_leg: Vxe,
  cut_of_meat: Uxe,
  bacon: Zxe,
  hamburger: Wxe,
  fries: Gxe,
  pizza: Kxe,
  hotdog: Xxe,
  sandwich: Yxe,
  taco: Jxe,
  burrito: Qxe,
  tamale: e7e,
  stuffed_flatbread: t7e,
  falafel: n7e,
  egg: r7e,
  fried_egg: o7e,
  shallow_pan_of_food: s7e,
  stew: i7e,
  fondue: a7e,
  bowl_with_spoon: c7e,
  green_salad: l7e,
  popcorn: u7e,
  butter: d7e,
  salt: f7e,
  canned_food: p7e,
  bento: h7e,
  rice_cracker: g7e,
  rice_ball: m7e,
  rice: v7e,
  curry: _7e,
  ramen: b7e,
  spaghetti: y7e,
  sweet_potato: w7e,
  oden: k7e,
  sushi: C7e,
  fried_shrimp: x7e,
  fish_cake: S7e,
  moon_cake: E7e,
  dango: A7e,
  dumpling: $7e,
  fortune_cookie: M7e,
  takeout_box: I7e,
  crab: T7e,
  lobster: L7e,
  shrimp: O7e,
  squid: R7e,
  oyster: P7e,
  icecream: B7e,
  shaved_ice: z7e,
  ice_cream: D7e,
  doughnut: N7e,
  cookie: q7e,
  birthday: F7e,
  cake: j7e,
  cupcake: H7e,
  pie: V7e,
  chocolate_bar: U7e,
  candy: Z7e,
  lollipop: W7e,
  custard: G7e,
  honey_pot: K7e,
  baby_bottle: X7e,
  milk_glass: Y7e,
  coffee: J7e,
  teapot: Q7e,
  tea: e9e,
  sake: t9e,
  champagne: n9e,
  wine_glass: r9e,
  cocktail: o9e,
  tropical_drink: s9e,
  beer: i9e,
  beers: a9e,
  clinking_glasses: c9e,
  tumbler_glass: l9e,
  cup_with_straw: u9e,
  bubble_tea: d9e,
  beverage_box: f9e,
  mate: p9e,
  ice_cube: h9e,
  chopsticks: g9e,
  plate_with_cutlery: m9e,
  fork_and_knife: v9e,
  spoon: _9e,
  hocho: b9e,
  knife: y9e,
  amphora: w9e,
  earth_africa: k9e,
  earth_americas: C9e,
  earth_asia: x9e,
  globe_with_meridians: S9e,
  world_map: E9e,
  japan: A9e,
  compass: $9e,
  mountain_snow: M9e,
  mountain: I9e,
  volcano: T9e,
  mount_fuji: L9e,
  camping: O9e,
  beach_umbrella: R9e,
  desert: P9e,
  desert_island: B9e,
  national_park: z9e,
  stadium: D9e,
  classical_building: N9e,
  building_construction: q9e,
  bricks: F9e,
  rock: j9e,
  wood: H9e,
  hut: V9e,
  houses: U9e,
  derelict_house: Z9e,
  house: W9e,
  house_with_garden: G9e,
  office: K9e,
  post_office: X9e,
  european_post_office: Y9e,
  hospital: J9e,
  bank: Q9e,
  hotel: eSe,
  love_hotel: tSe,
  convenience_store: nSe,
  school: rSe,
  department_store: oSe,
  factory: sSe,
  japanese_castle: iSe,
  european_castle: aSe,
  wedding: cSe,
  tokyo_tower: lSe,
  statue_of_liberty: uSe,
  church: dSe,
  mosque: fSe,
  hindu_temple: pSe,
  synagogue: hSe,
  shinto_shrine: gSe,
  kaaba: mSe,
  fountain: vSe,
  tent: _Se,
  foggy: bSe,
  night_with_stars: ySe,
  cityscape: wSe,
  sunrise_over_mountains: kSe,
  sunrise: CSe,
  city_sunset: xSe,
  city_sunrise: SSe,
  bridge_at_night: ESe,
  hotsprings: ASe,
  carousel_horse: $Se,
  ferris_wheel: MSe,
  roller_coaster: ISe,
  barber: TSe,
  circus_tent: LSe,
  steam_locomotive: OSe,
  railway_car: RSe,
  bullettrain_side: PSe,
  bullettrain_front: BSe,
  train2: zSe,
  metro: DSe,
  light_rail: NSe,
  station: qSe,
  tram: FSe,
  monorail: jSe,
  mountain_railway: HSe,
  train: VSe,
  bus: USe,
  oncoming_bus: ZSe,
  trolleybus: WSe,
  minibus: GSe,
  ambulance: KSe,
  fire_engine: XSe,
  police_car: YSe,
  oncoming_police_car: JSe,
  taxi: QSe,
  oncoming_taxi: eEe,
  car: tEe,
  red_car: nEe,
  oncoming_automobile: rEe,
  blue_car: oEe,
  pickup_truck: sEe,
  truck: iEe,
  articulated_lorry: aEe,
  tractor: cEe,
  racing_car: lEe,
  motorcycle: uEe,
  motor_scooter: dEe,
  manual_wheelchair: fEe,
  motorized_wheelchair: pEe,
  auto_rickshaw: hEe,
  bike: gEe,
  kick_scooter: mEe,
  skateboard: vEe,
  roller_skate: _Ee,
  busstop: bEe,
  motorway: yEe,
  railway_track: wEe,
  oil_drum: kEe,
  fuelpump: CEe,
  rotating_light: xEe,
  traffic_light: SEe,
  vertical_traffic_light: EEe,
  stop_sign: AEe,
  construction: $Ee,
  anchor: MEe,
  boat: IEe,
  sailboat: TEe,
  canoe: LEe,
  speedboat: OEe,
  passenger_ship: REe,
  ferry: PEe,
  motor_boat: BEe,
  ship: zEe,
  airplane: DEe,
  small_airplane: NEe,
  flight_departure: qEe,
  flight_arrival: FEe,
  parachute: jEe,
  seat: HEe,
  helicopter: VEe,
  suspension_railway: UEe,
  mountain_cableway: ZEe,
  aerial_tramway: WEe,
  artificial_satellite: GEe,
  rocket: KEe,
  flying_saucer: XEe,
  bellhop_bell: YEe,
  luggage: JEe,
  hourglass: QEe,
  hourglass_flowing_sand: eAe,
  watch: tAe,
  alarm_clock: nAe,
  stopwatch: rAe,
  timer_clock: oAe,
  mantelpiece_clock: sAe,
  clock12: iAe,
  clock1230: aAe,
  clock1: cAe,
  clock130: lAe,
  clock2: uAe,
  clock230: dAe,
  clock3: fAe,
  clock330: pAe,
  clock4: hAe,
  clock430: gAe,
  clock5: mAe,
  clock530: vAe,
  clock6: _Ae,
  clock630: bAe,
  clock7: yAe,
  clock730: wAe,
  clock8: kAe,
  clock830: CAe,
  clock9: xAe,
  clock930: SAe,
  clock10: EAe,
  clock1030: AAe,
  clock11: $Ae,
  clock1130: MAe,
  new_moon: IAe,
  waxing_crescent_moon: TAe,
  first_quarter_moon: LAe,
  moon: OAe,
  waxing_gibbous_moon: RAe,
  full_moon: PAe,
  waning_gibbous_moon: BAe,
  last_quarter_moon: zAe,
  waning_crescent_moon: DAe,
  crescent_moon: NAe,
  new_moon_with_face: qAe,
  first_quarter_moon_with_face: FAe,
  last_quarter_moon_with_face: jAe,
  thermometer: HAe,
  sunny: VAe,
  full_moon_with_face: UAe,
  sun_with_face: ZAe,
  ringed_planet: WAe,
  star: GAe,
  star2: KAe,
  stars: XAe,
  milky_way: YAe,
  cloud: JAe,
  partly_sunny: QAe,
  cloud_with_lightning_and_rain: e$e,
  sun_behind_small_cloud: t$e,
  sun_behind_large_cloud: n$e,
  sun_behind_rain_cloud: r$e,
  cloud_with_rain: o$e,
  cloud_with_snow: s$e,
  cloud_with_lightning: i$e,
  tornado: a$e,
  fog: c$e,
  wind_face: l$e,
  cyclone: u$e,
  rainbow: d$e,
  closed_umbrella: f$e,
  open_umbrella: p$e,
  umbrella: h$e,
  parasol_on_ground: g$e,
  zap: m$e,
  snowflake: v$e,
  snowman_with_snow: _$e,
  snowman: b$e,
  comet: y$e,
  fire: w$e,
  droplet: k$e,
  ocean: C$e,
  jack_o_lantern: x$e,
  christmas_tree: S$e,
  fireworks: E$e,
  sparkler: A$e,
  firecracker: $$e,
  sparkles: M$e,
  balloon: I$e,
  tada: T$e,
  confetti_ball: L$e,
  tanabata_tree: O$e,
  bamboo: R$e,
  dolls: P$e,
  flags: B$e,
  wind_chime: z$e,
  rice_scene: D$e,
  red_envelope: N$e,
  ribbon: q$e,
  gift: F$e,
  reminder_ribbon: j$e,
  tickets: H$e,
  ticket: V$e,
  medal_military: U$e,
  trophy: Z$e,
  medal_sports: W$e,
  "1st_place_medal": "🥇",
  "2nd_place_medal": "🥈",
  "3rd_place_medal": "🥉",
  soccer: G$e,
  baseball: K$e,
  softball: X$e,
  basketball: Y$e,
  volleyball: J$e,
  football: Q$e,
  rugby_football: eMe,
  tennis: tMe,
  flying_disc: nMe,
  bowling: rMe,
  cricket_game: oMe,
  field_hockey: sMe,
  ice_hockey: iMe,
  lacrosse: aMe,
  ping_pong: cMe,
  badminton: lMe,
  boxing_glove: uMe,
  martial_arts_uniform: dMe,
  goal_net: fMe,
  golf: pMe,
  ice_skate: hMe,
  fishing_pole_and_fish: gMe,
  diving_mask: mMe,
  running_shirt_with_sash: vMe,
  ski: _Me,
  sled: bMe,
  curling_stone: yMe,
  dart: wMe,
  yo_yo: kMe,
  kite: CMe,
  "8ball": "🎱",
  crystal_ball: xMe,
  magic_wand: SMe,
  nazar_amulet: EMe,
  video_game: AMe,
  joystick: $Me,
  slot_machine: MMe,
  game_die: IMe,
  jigsaw: TMe,
  teddy_bear: LMe,
  pinata: OMe,
  nesting_dolls: RMe,
  spades: PMe,
  hearts: BMe,
  diamonds: zMe,
  clubs: DMe,
  chess_pawn: NMe,
  black_joker: qMe,
  mahjong: FMe,
  flower_playing_cards: jMe,
  performing_arts: HMe,
  framed_picture: VMe,
  art: UMe,
  thread: ZMe,
  sewing_needle: WMe,
  yarn: GMe,
  knot: KMe,
  eyeglasses: XMe,
  dark_sunglasses: YMe,
  goggles: JMe,
  lab_coat: QMe,
  safety_vest: eIe,
  necktie: tIe,
  shirt: nIe,
  tshirt: rIe,
  jeans: oIe,
  scarf: sIe,
  gloves: iIe,
  coat: aIe,
  socks: cIe,
  dress: lIe,
  kimono: uIe,
  sari: dIe,
  one_piece_swimsuit: fIe,
  swim_brief: pIe,
  shorts: hIe,
  bikini: gIe,
  womans_clothes: mIe,
  purse: vIe,
  handbag: _Ie,
  pouch: bIe,
  shopping: yIe,
  school_satchel: wIe,
  thong_sandal: kIe,
  mans_shoe: CIe,
  shoe: xIe,
  athletic_shoe: SIe,
  hiking_boot: EIe,
  flat_shoe: AIe,
  high_heel: $Ie,
  sandal: MIe,
  ballet_shoes: IIe,
  boot: TIe,
  crown: LIe,
  womans_hat: OIe,
  tophat: RIe,
  mortar_board: PIe,
  billed_cap: BIe,
  military_helmet: zIe,
  rescue_worker_helmet: DIe,
  prayer_beads: NIe,
  lipstick: qIe,
  ring: FIe,
  gem: jIe,
  mute: HIe,
  speaker: VIe,
  sound: UIe,
  loud_sound: ZIe,
  loudspeaker: WIe,
  mega: GIe,
  postal_horn: KIe,
  bell: XIe,
  no_bell: YIe,
  musical_score: JIe,
  musical_note: QIe,
  notes: eTe,
  studio_microphone: tTe,
  level_slider: nTe,
  control_knobs: rTe,
  microphone: oTe,
  headphones: sTe,
  radio: iTe,
  saxophone: aTe,
  accordion: cTe,
  guitar: lTe,
  musical_keyboard: uTe,
  trumpet: dTe,
  violin: fTe,
  banjo: pTe,
  drum: hTe,
  long_drum: gTe,
  iphone: mTe,
  calling: vTe,
  phone: _Te,
  telephone: bTe,
  telephone_receiver: yTe,
  pager: wTe,
  fax: kTe,
  battery: CTe,
  electric_plug: xTe,
  computer: STe,
  desktop_computer: ETe,
  printer: ATe,
  keyboard: $Te,
  computer_mouse: MTe,
  trackball: ITe,
  minidisc: TTe,
  floppy_disk: LTe,
  cd: OTe,
  dvd: RTe,
  abacus: PTe,
  movie_camera: BTe,
  film_strip: zTe,
  film_projector: DTe,
  clapper: NTe,
  tv: qTe,
  camera: FTe,
  camera_flash: jTe,
  video_camera: HTe,
  vhs: VTe,
  mag: UTe,
  mag_right: ZTe,
  candle: WTe,
  bulb: GTe,
  flashlight: KTe,
  izakaya_lantern: XTe,
  lantern: YTe,
  diya_lamp: JTe,
  notebook_with_decorative_cover: QTe,
  closed_book: eLe,
  book: tLe,
  open_book: nLe,
  green_book: rLe,
  blue_book: oLe,
  orange_book: sLe,
  books: iLe,
  notebook: aLe,
  ledger: cLe,
  page_with_curl: lLe,
  scroll: uLe,
  page_facing_up: dLe,
  newspaper: fLe,
  newspaper_roll: pLe,
  bookmark_tabs: hLe,
  bookmark: gLe,
  label: mLe,
  moneybag: vLe,
  coin: _Le,
  yen: bLe,
  dollar: yLe,
  euro: wLe,
  pound: kLe,
  money_with_wings: CLe,
  credit_card: xLe,
  receipt: SLe,
  chart: ELe,
  envelope: ALe,
  email: $Le,
  "e-mail": "📧",
  incoming_envelope: MLe,
  envelope_with_arrow: ILe,
  outbox_tray: TLe,
  inbox_tray: LLe,
  package: "📦",
  mailbox: OLe,
  mailbox_closed: RLe,
  mailbox_with_mail: PLe,
  mailbox_with_no_mail: BLe,
  postbox: zLe,
  ballot_box: DLe,
  pencil2: NLe,
  black_nib: qLe,
  fountain_pen: FLe,
  pen: jLe,
  paintbrush: HLe,
  crayon: VLe,
  memo: ULe,
  pencil: ZLe,
  briefcase: WLe,
  file_folder: GLe,
  open_file_folder: KLe,
  card_index_dividers: XLe,
  date: YLe,
  calendar: JLe,
  spiral_notepad: QLe,
  spiral_calendar: eOe,
  card_index: tOe,
  chart_with_upwards_trend: nOe,
  chart_with_downwards_trend: rOe,
  bar_chart: oOe,
  clipboard: sOe,
  pushpin: iOe,
  round_pushpin: aOe,
  paperclip: cOe,
  paperclips: lOe,
  straight_ruler: uOe,
  triangular_ruler: dOe,
  scissors: fOe,
  card_file_box: pOe,
  file_cabinet: hOe,
  wastebasket: gOe,
  lock: mOe,
  unlock: vOe,
  lock_with_ink_pen: _Oe,
  closed_lock_with_key: bOe,
  key: yOe,
  old_key: wOe,
  hammer: kOe,
  axe: COe,
  pick: xOe,
  hammer_and_pick: SOe,
  hammer_and_wrench: EOe,
  dagger: AOe,
  crossed_swords: $Oe,
  gun: MOe,
  boomerang: IOe,
  bow_and_arrow: TOe,
  shield: LOe,
  carpentry_saw: OOe,
  wrench: ROe,
  screwdriver: POe,
  nut_and_bolt: BOe,
  gear: zOe,
  clamp: DOe,
  balance_scale: NOe,
  probing_cane: qOe,
  link: FOe,
  chains: jOe,
  hook: HOe,
  toolbox: VOe,
  magnet: UOe,
  ladder: ZOe,
  alembic: WOe,
  test_tube: GOe,
  petri_dish: KOe,
  dna: XOe,
  microscope: YOe,
  telescope: JOe,
  satellite: QOe,
  syringe: eRe,
  drop_of_blood: tRe,
  pill: nRe,
  adhesive_bandage: rRe,
  stethoscope: oRe,
  door: sRe,
  elevator: iRe,
  mirror: aRe,
  window: cRe,
  bed: lRe,
  couch_and_lamp: uRe,
  chair: dRe,
  toilet: fRe,
  plunger: pRe,
  shower: hRe,
  bathtub: gRe,
  mouse_trap: mRe,
  razor: vRe,
  lotion_bottle: _Re,
  safety_pin: bRe,
  broom: yRe,
  basket: wRe,
  roll_of_paper: kRe,
  bucket: CRe,
  soap: xRe,
  toothbrush: SRe,
  sponge: ERe,
  fire_extinguisher: ARe,
  shopping_cart: $Re,
  smoking: MRe,
  coffin: IRe,
  headstone: TRe,
  funeral_urn: LRe,
  moyai: ORe,
  placard: RRe,
  atm: PRe,
  put_litter_in_its_place: BRe,
  potable_water: zRe,
  wheelchair: DRe,
  mens: NRe,
  womens: qRe,
  restroom: FRe,
  baby_symbol: jRe,
  wc: HRe,
  passport_control: VRe,
  customs: URe,
  baggage_claim: ZRe,
  left_luggage: WRe,
  warning: GRe,
  children_crossing: KRe,
  no_entry: XRe,
  no_entry_sign: YRe,
  no_bicycles: JRe,
  no_smoking: QRe,
  do_not_litter: ePe,
  "non-potable_water": "🚱",
  no_pedestrians: tPe,
  no_mobile_phones: nPe,
  underage: rPe,
  radioactive: oPe,
  biohazard: sPe,
  arrow_up: iPe,
  arrow_upper_right: aPe,
  arrow_right: cPe,
  arrow_lower_right: lPe,
  arrow_down: uPe,
  arrow_lower_left: dPe,
  arrow_left: fPe,
  arrow_upper_left: pPe,
  arrow_up_down: hPe,
  left_right_arrow: gPe,
  leftwards_arrow_with_hook: mPe,
  arrow_right_hook: vPe,
  arrow_heading_up: _Pe,
  arrow_heading_down: bPe,
  arrows_clockwise: yPe,
  arrows_counterclockwise: wPe,
  back: kPe,
  end: CPe,
  on: xPe,
  soon: SPe,
  top: EPe,
  place_of_worship: APe,
  atom_symbol: $Pe,
  om: MPe,
  star_of_david: IPe,
  wheel_of_dharma: TPe,
  yin_yang: LPe,
  latin_cross: OPe,
  orthodox_cross: RPe,
  star_and_crescent: PPe,
  peace_symbol: BPe,
  menorah: zPe,
  six_pointed_star: DPe,
  aries: NPe,
  taurus: qPe,
  gemini: FPe,
  cancer: jPe,
  leo: HPe,
  virgo: VPe,
  libra: UPe,
  scorpius: ZPe,
  sagittarius: WPe,
  capricorn: GPe,
  aquarius: KPe,
  pisces: XPe,
  ophiuchus: YPe,
  twisted_rightwards_arrows: JPe,
  repeat: QPe,
  repeat_one: eBe,
  arrow_forward: tBe,
  fast_forward: nBe,
  next_track_button: rBe,
  play_or_pause_button: oBe,
  arrow_backward: sBe,
  rewind: iBe,
  previous_track_button: aBe,
  arrow_up_small: cBe,
  arrow_double_up: lBe,
  arrow_down_small: uBe,
  arrow_double_down: dBe,
  pause_button: fBe,
  stop_button: pBe,
  record_button: hBe,
  eject_button: gBe,
  cinema: mBe,
  low_brightness: vBe,
  high_brightness: _Be,
  signal_strength: bBe,
  vibration_mode: yBe,
  mobile_phone_off: wBe,
  female_sign: kBe,
  male_sign: CBe,
  transgender_symbol: xBe,
  heavy_multiplication_x: SBe,
  heavy_plus_sign: EBe,
  heavy_minus_sign: ABe,
  heavy_division_sign: $Be,
  infinity: MBe,
  bangbang: IBe,
  interrobang: TBe,
  question: LBe,
  grey_question: OBe,
  grey_exclamation: RBe,
  exclamation: PBe,
  heavy_exclamation_mark: BBe,
  wavy_dash: zBe,
  currency_exchange: DBe,
  heavy_dollar_sign: NBe,
  medical_symbol: qBe,
  recycle: FBe,
  fleur_de_lis: jBe,
  trident: HBe,
  name_badge: VBe,
  beginner: UBe,
  o: ZBe,
  white_check_mark: WBe,
  ballot_box_with_check: GBe,
  heavy_check_mark: KBe,
  x: XBe,
  negative_squared_cross_mark: YBe,
  curly_loop: JBe,
  loop: QBe,
  part_alternation_mark: eze,
  eight_spoked_asterisk: tze,
  eight_pointed_black_star: nze,
  sparkle: rze,
  copyright: oze,
  registered: sze,
  tm: ize,
  hash: aze,
  asterisk: cze,
  zero: lze,
  one: uze,
  two: dze,
  three: fze,
  four: pze,
  five: hze,
  six: gze,
  seven: mze,
  eight: vze,
  nine: _ze,
  keycap_ten: bze,
  capital_abcd: yze,
  abcd: wze,
  symbols: kze,
  abc: Cze,
  a: xze,
  ab: Sze,
  b: Eze,
  cl: Aze,
  cool: $ze,
  free: Mze,
  information_source: Ize,
  id: Tze,
  m: Lze,
  new: "🆕",
  ng: Oze,
  o2: Rze,
  ok: Pze,
  parking: Bze,
  sos: zze,
  up: Dze,
  vs: Nze,
  koko: qze,
  sa: Fze,
  ideograph_advantage: jze,
  accept: Hze,
  congratulations: Vze,
  secret: Uze,
  u6e80: Zze,
  red_circle: Wze,
  orange_circle: Gze,
  yellow_circle: Kze,
  green_circle: Xze,
  large_blue_circle: Yze,
  purple_circle: Jze,
  brown_circle: Qze,
  black_circle: eDe,
  white_circle: tDe,
  red_square: nDe,
  orange_square: rDe,
  yellow_square: oDe,
  green_square: sDe,
  blue_square: iDe,
  purple_square: aDe,
  brown_square: cDe,
  black_large_square: lDe,
  white_large_square: uDe,
  black_medium_square: dDe,
  white_medium_square: fDe,
  black_medium_small_square: pDe,
  white_medium_small_square: hDe,
  black_small_square: gDe,
  white_small_square: mDe,
  large_orange_diamond: vDe,
  large_blue_diamond: _De,
  small_orange_diamond: bDe,
  small_blue_diamond: yDe,
  small_red_triangle: wDe,
  small_red_triangle_down: kDe,
  diamond_shape_with_a_dot_inside: CDe,
  radio_button: xDe,
  white_square_button: SDe,
  black_square_button: EDe,
  checkered_flag: ADe,
  triangular_flag_on_post: $De,
  crossed_flags: MDe,
  black_flag: IDe,
  white_flag: TDe,
  rainbow_flag: LDe,
  transgender_flag: ODe,
  pirate_flag: RDe,
  ascension_island: PDe,
  andorra: BDe,
  united_arab_emirates: zDe,
  afghanistan: DDe,
  antigua_barbuda: NDe,
  anguilla: qDe,
  albania: FDe,
  armenia: jDe,
  angola: HDe,
  antarctica: VDe,
  argentina: UDe,
  american_samoa: ZDe,
  austria: WDe,
  australia: GDe,
  aruba: KDe,
  aland_islands: XDe,
  azerbaijan: YDe,
  bosnia_herzegovina: JDe,
  barbados: QDe,
  bangladesh: eNe,
  belgium: tNe,
  burkina_faso: nNe,
  bulgaria: rNe,
  bahrain: oNe,
  burundi: sNe,
  benin: iNe,
  st_barthelemy: aNe,
  bermuda: cNe,
  brunei: lNe,
  bolivia: uNe,
  caribbean_netherlands: dNe,
  brazil: fNe,
  bahamas: pNe,
  bhutan: hNe,
  bouvet_island: gNe,
  botswana: mNe,
  belarus: vNe,
  belize: _Ne,
  canada: bNe,
  cocos_islands: yNe,
  congo_kinshasa: wNe,
  central_african_republic: kNe,
  congo_brazzaville: CNe,
  switzerland: xNe,
  cote_divoire: SNe,
  cook_islands: ENe,
  chile: ANe,
  cameroon: $Ne,
  cn: MNe,
  colombia: INe,
  clipperton_island: TNe,
  costa_rica: LNe,
  cuba: ONe,
  cape_verde: RNe,
  curacao: PNe,
  christmas_island: BNe,
  cyprus: zNe,
  czech_republic: DNe,
  de: NNe,
  diego_garcia: qNe,
  djibouti: FNe,
  denmark: jNe,
  dominica: HNe,
  dominican_republic: VNe,
  algeria: UNe,
  ceuta_melilla: ZNe,
  ecuador: WNe,
  estonia: GNe,
  egypt: KNe,
  western_sahara: XNe,
  eritrea: YNe,
  es: JNe,
  ethiopia: QNe,
  eu: eqe,
  european_union: tqe,
  finland: nqe,
  fiji: rqe,
  falkland_islands: oqe,
  micronesia: sqe,
  faroe_islands: iqe,
  fr: aqe,
  gabon: cqe,
  gb: lqe,
  uk: uqe,
  grenada: dqe,
  georgia: fqe,
  french_guiana: pqe,
  guernsey: hqe,
  ghana: gqe,
  gibraltar: mqe,
  greenland: vqe,
  gambia: _qe,
  guinea: bqe,
  guadeloupe: yqe,
  equatorial_guinea: wqe,
  greece: kqe,
  south_georgia_south_sandwich_islands: Cqe,
  guatemala: xqe,
  guam: Sqe,
  guinea_bissau: Eqe,
  guyana: Aqe,
  hong_kong: $qe,
  heard_mcdonald_islands: Mqe,
  honduras: Iqe,
  croatia: Tqe,
  haiti: Lqe,
  hungary: Oqe,
  canary_islands: Rqe,
  indonesia: Pqe,
  ireland: Bqe,
  israel: zqe,
  isle_of_man: Dqe,
  india: Nqe,
  british_indian_ocean_territory: qqe,
  iraq: Fqe,
  iran: jqe,
  iceland: Hqe,
  it: Vqe,
  jersey: Uqe,
  jamaica: Zqe,
  jordan: Wqe,
  jp: Gqe,
  kenya: Kqe,
  kyrgyzstan: Xqe,
  cambodia: Yqe,
  kiribati: Jqe,
  comoros: Qqe,
  st_kitts_nevis: eFe,
  north_korea: tFe,
  kr: nFe,
  kuwait: rFe,
  cayman_islands: oFe,
  kazakhstan: sFe,
  laos: iFe,
  lebanon: aFe,
  st_lucia: cFe,
  liechtenstein: lFe,
  sri_lanka: uFe,
  liberia: dFe,
  lesotho: fFe,
  lithuania: pFe,
  luxembourg: hFe,
  latvia: gFe,
  libya: mFe,
  morocco: vFe,
  monaco: _Fe,
  moldova: bFe,
  montenegro: yFe,
  st_martin: wFe,
  madagascar: kFe,
  marshall_islands: CFe,
  macedonia: xFe,
  mali: SFe,
  myanmar: EFe,
  mongolia: AFe,
  macau: $Fe,
  northern_mariana_islands: MFe,
  martinique: IFe,
  mauritania: TFe,
  montserrat: LFe,
  malta: OFe,
  mauritius: RFe,
  maldives: PFe,
  malawi: BFe,
  mexico: zFe,
  malaysia: DFe,
  mozambique: NFe,
  namibia: qFe,
  new_caledonia: FFe,
  niger: jFe,
  norfolk_island: HFe,
  nigeria: VFe,
  nicaragua: UFe,
  netherlands: ZFe,
  norway: WFe,
  nepal: GFe,
  nauru: KFe,
  niue: XFe,
  new_zealand: YFe,
  oman: JFe,
  panama: QFe,
  peru: eje,
  french_polynesia: tje,
  papua_new_guinea: nje,
  philippines: rje,
  pakistan: oje,
  poland: sje,
  st_pierre_miquelon: ije,
  pitcairn_islands: aje,
  puerto_rico: cje,
  palestinian_territories: lje,
  portugal: uje,
  palau: dje,
  paraguay: fje,
  qatar: pje,
  reunion: hje,
  romania: gje,
  serbia: mje,
  ru: vje,
  rwanda: _je,
  saudi_arabia: bje,
  solomon_islands: yje,
  seychelles: wje,
  sudan: kje,
  sweden: Cje,
  singapore: xje,
  st_helena: Sje,
  slovenia: Eje,
  svalbard_jan_mayen: Aje,
  slovakia: $je,
  sierra_leone: Mje,
  san_marino: Ije,
  senegal: Tje,
  somalia: Lje,
  suriname: Oje,
  south_sudan: Rje,
  sao_tome_principe: Pje,
  el_salvador: Bje,
  sint_maarten: zje,
  syria: Dje,
  swaziland: Nje,
  tristan_da_cunha: qje,
  turks_caicos_islands: Fje,
  chad: jje,
  french_southern_territories: Hje,
  togo: Vje,
  thailand: Uje,
  tajikistan: Zje,
  tokelau: Wje,
  timor_leste: Gje,
  turkmenistan: Kje,
  tunisia: Xje,
  tonga: Yje,
  tr: Jje,
  trinidad_tobago: Qje,
  tuvalu: eHe,
  taiwan: tHe,
  tanzania: nHe,
  ukraine: rHe,
  uganda: oHe,
  us_outlying_islands: sHe,
  united_nations: iHe,
  us: aHe,
  uruguay: cHe,
  uzbekistan: lHe,
  vatican_city: uHe,
  st_vincent_grenadines: dHe,
  venezuela: fHe,
  british_virgin_islands: pHe,
  us_virgin_islands: hHe,
  vietnam: gHe,
  vanuatu: mHe,
  wallis_futuna: vHe,
  samoa: _He,
  kosovo: bHe,
  yemen: yHe,
  mayotte: wHe,
  south_africa: kHe,
  zambia: CHe,
  zimbabwe: xHe,
  england: SHe,
  scotland: EHe,
  wales: AHe
};
var ca, r0;
function MHe() {
  return r0 || (r0 = 1, ca = {
    angry: [">:(", ">:-("],
    blush: [':")', ':-")'],
    broken_heart: ["</3", "<\\3"],
    // :\ and :-\ not used because of conflict with markdown escaping
    confused: [":/", ":-/"],
    // twemoji shows question
    cry: [":'(", ":'-(", ":,(", ":,-("],
    frowning: [":(", ":-("],
    heart: ["<3"],
    imp: ["]:(", "]:-("],
    innocent: ["o:)", "O:)", "o:-)", "O:-)", "0:)", "0:-)"],
    joy: [":')", ":'-)", ":,)", ":,-)", ":'D", ":'-D", ":,D", ":,-D"],
    kissing: [":*", ":-*"],
    laughing: ["x-)", "X-)"],
    neutral_face: [":|", ":-|"],
    open_mouth: [":o", ":-o", ":O", ":-O"],
    rage: [":@", ":-@"],
    smile: [":D", ":-D"],
    smiley: [":)", ":-)"],
    smiling_imp: ["]:)", "]:-)"],
    sob: [":,'(", ":,'-(", ";(", ";-("],
    stuck_out_tongue: [":P", ":-P"],
    sunglasses: ["8-)", "B-)"],
    sweat: [",:(", ",:-("],
    sweat_smile: [",:)", ",:-)"],
    unamused: [":s", ":-S", ":z", ":-Z", ":$", ":-$"],
    wink: [";)", ";-)"]
  }), ca;
}
var la, o0;
function IHe() {
  return o0 || (o0 = 1, la = function(t, n) {
    return t[n].content;
  }), la;
}
var ua, s0;
function THe() {
  return s0 || (s0 = 1, ua = function(t, n, r, s, o) {
    var i = t.utils.arrayReplaceAt, a = t.utils.lib.ucmicro, c = new RegExp([a.Z.source, a.P.source, a.Cc.source].join("|"));
    function u(d, l, m) {
      var f, v = 0, g = [];
      return d.replace(o, function(y, h, w) {
        var k;
        if (r.hasOwnProperty(y)) {
          if (k = r[y], h > 0 && !c.test(w[h - 1]) || h + y.length < w.length && !c.test(w[h + y.length]))
            return;
        } else
          k = y.slice(1, -1);
        h > v && (f = new m("text", "", 0), f.content = d.slice(v, h), g.push(f)), f = new m("emoji", "", 0), f.markup = k, f.content = n[k], g.push(f), v = h + y.length;
      }), v < d.length && (f = new m("text", "", 0), f.content = d.slice(v), g.push(f)), g;
    }
    return function(l) {
      var m, f, v, g, y, h = l.tokens, w = 0;
      for (f = 0, v = h.length; f < v; f++)
        if (h[f].type === "inline")
          for (g = h[f].children, m = g.length - 1; m >= 0; m--)
            y = g[m], (y.type === "link_open" || y.type === "link_close") && y.info === "auto" && (w -= y.nesting), y.type === "text" && w === 0 && s.test(y.content) && (h[f].children = g = i(
              g,
              m,
              u(y.content, y.level, l.Token)
            ));
    };
  }), ua;
}
var da, i0;
function LHe() {
  if (i0) return da;
  i0 = 1;
  function e(t) {
    return t.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
  }
  return da = function(n) {
    var r = n.defs, s;
    n.enabled.length && (r = Object.keys(r).reduce(function(u, d) {
      return n.enabled.indexOf(d) >= 0 && (u[d] = r[d]), u;
    }, {})), s = Object.keys(n.shortcuts).reduce(function(u, d) {
      return r[d] ? Array.isArray(n.shortcuts[d]) ? (n.shortcuts[d].forEach(function(l) {
        u[l] = d;
      }), u) : (u[n.shortcuts[d]] = d, u) : u;
    }, {});
    var o = Object.keys(r), i;
    o.length === 0 ? i = "^$" : i = o.map(function(u) {
      return ":" + u + ":";
    }).concat(Object.keys(s)).sort().reverse().map(function(u) {
      return e(u);
    }).join("|");
    var a = RegExp(i), c = RegExp(i, "g");
    return {
      defs: r,
      shortcuts: s,
      scanRE: a,
      replaceRE: c
    };
  }, da;
}
var fa, a0;
function OHe() {
  if (a0) return fa;
  a0 = 1;
  var e = IHe(), t = THe(), n = LHe();
  return fa = function(s, o) {
    var i = {
      defs: {},
      shortcuts: {},
      enabled: []
    }, a = n(s.utils.assign({}, i, o || {}));
    s.renderer.rules.emoji = e, s.core.ruler.after(
      "linkify",
      "emoji",
      t(s, a.defs, a.shortcuts, a.scanRE, a.replaceRE)
    );
  }, fa;
}
var pa, c0;
function RHe() {
  if (c0) return pa;
  c0 = 1;
  var e = $He, t = MHe(), n = OHe();
  return pa = function(s, o) {
    var i = {
      defs: e,
      shortcuts: t,
      enabled: []
    }, a = s.utils.assign({}, i, o || {});
    n(s, a);
  }, pa;
}
var PHe = RHe();
const BHe = /* @__PURE__ */ Ar(PHe);
var ha, l0;
function zHe() {
  if (l0) return ha;
  l0 = 1;
  function e(r, s) {
    var o, i, a = r.attrs[r.attrIndex("href")][1];
    for (o = 0; o < s.length; ++o) {
      if (i = s[o], typeof i.matcher == "function") {
        if (i.matcher(a, i))
          return i;
        continue;
      }
      return i;
    }
  }
  function t(r, s, o) {
    Object.keys(o).forEach(function(i) {
      var a, c = o[i];
      i === "className" && (i = "class"), a = s[r].attrIndex(i), a < 0 ? s[r].attrPush([i, c]) : s[r].attrs[a][1] = c;
    });
  }
  function n(r, s) {
    s ? s = Array.isArray(s) ? s : [s] : s = [], Object.freeze(s);
    var o = r.renderer.rules.link_open || this.defaultRender;
    r.renderer.rules.link_open = function(i, a, c, u, d) {
      var l = e(i[a], s), m = l && l.attrs;
      return m && t(a, i, m), o(i, a, c, u, d);
    };
  }
  return n.defaultRender = function(r, s, o, i, a) {
    return a.renderToken(r, s, o);
  }, ha = n, ha;
}
var DHe = zHe();
const Mm = /* @__PURE__ */ Ar(DHe);
var ga, u0;
function NHe() {
  if (u0) return ga;
  u0 = 1;
  var e = !0, t = !1, n = !1;
  ga = function(g, y) {
    y && (e = !y.enabled, t = !!y.label, n = !!y.labelAfter), g.core.ruler.after("inline", "github-task-lists", function(h) {
      for (var w = h.tokens, k = 2; k < w.length; k++)
        o(w, k) && (i(w[k], h.Token), r(w[k - 2], "class", "task-list-item" + (e ? "" : " enabled")), r(w[s(w, k - 2)], "class", "contains-task-list"));
    });
  };
  function r(g, y, h) {
    var w = g.attrIndex(y), k = [y, h];
    w < 0 ? g.attrPush(k) : g.attrs[w] = k;
  }
  function s(g, y) {
    for (var h = g[y].level - 1, w = y - 1; w >= 0; w--)
      if (g[w].level === h)
        return w;
    return -1;
  }
  function o(g, y) {
    return l(g[y]) && m(g[y - 1]) && f(g[y - 2]) && v(g[y]);
  }
  function i(g, y) {
    if (g.children.unshift(a(g, y)), g.children[1].content = g.children[1].content.slice(3), g.content = g.content.slice(3), t)
      if (n) {
        g.children.pop();
        var h = "task-item-" + Math.ceil(Math.random() * (1e4 * 1e3) - 1e3);
        g.children[0].content = g.children[0].content.slice(0, -1) + ' id="' + h + '">', g.children.push(d(g.content, h, y));
      } else
        g.children.unshift(c(y)), g.children.push(u(y));
  }
  function a(g, y) {
    var h = new y("html_inline", "", 0), w = e ? ' disabled="" ' : "";
    return g.content.indexOf("[ ] ") === 0 ? h.content = '<input class="task-list-item-checkbox"' + w + 'type="checkbox">' : (g.content.indexOf("[x] ") === 0 || g.content.indexOf("[X] ") === 0) && (h.content = '<input class="task-list-item-checkbox" checked=""' + w + 'type="checkbox">'), h;
  }
  function c(g) {
    var y = new g("html_inline", "", 0);
    return y.content = "<label>", y;
  }
  function u(g) {
    var y = new g("html_inline", "", 0);
    return y.content = "</label>", y;
  }
  function d(g, y, h) {
    var w = new h("html_inline", "", 0);
    return w.content = '<label class="task-list-item-label" for="' + y + '">' + g + "</label>", w.attrs = [{ for: y }], w;
  }
  function l(g) {
    return g.type === "inline";
  }
  function m(g) {
    return g.type === "paragraph_open";
  }
  function f(g) {
    return g.type === "list_item_open";
  }
  function v(g) {
    return g.content.indexOf("[ ] ") === 0 || g.content.indexOf("[x] ") === 0 || g.content.indexOf("[X] ") === 0;
  }
  return ga;
}
var qHe = NHe();
const FHe = /* @__PURE__ */ Ar(qHe);
var Oo = { exports: {} }, Fe = {}, Ro = { exports: {} }, Yn = {}, d0;
function Im() {
  if (d0) return Yn;
  d0 = 1;
  function e() {
    var o = {};
    return o["align-content"] = !1, o["align-items"] = !1, o["align-self"] = !1, o["alignment-adjust"] = !1, o["alignment-baseline"] = !1, o.all = !1, o["anchor-point"] = !1, o.animation = !1, o["animation-delay"] = !1, o["animation-direction"] = !1, o["animation-duration"] = !1, o["animation-fill-mode"] = !1, o["animation-iteration-count"] = !1, o["animation-name"] = !1, o["animation-play-state"] = !1, o["animation-timing-function"] = !1, o.azimuth = !1, o["backface-visibility"] = !1, o.background = !0, o["background-attachment"] = !0, o["background-clip"] = !0, o["background-color"] = !0, o["background-image"] = !0, o["background-origin"] = !0, o["background-position"] = !0, o["background-repeat"] = !0, o["background-size"] = !0, o["baseline-shift"] = !1, o.binding = !1, o.bleed = !1, o["bookmark-label"] = !1, o["bookmark-level"] = !1, o["bookmark-state"] = !1, o.border = !0, o["border-bottom"] = !0, o["border-bottom-color"] = !0, o["border-bottom-left-radius"] = !0, o["border-bottom-right-radius"] = !0, o["border-bottom-style"] = !0, o["border-bottom-width"] = !0, o["border-collapse"] = !0, o["border-color"] = !0, o["border-image"] = !0, o["border-image-outset"] = !0, o["border-image-repeat"] = !0, o["border-image-slice"] = !0, o["border-image-source"] = !0, o["border-image-width"] = !0, o["border-left"] = !0, o["border-left-color"] = !0, o["border-left-style"] = !0, o["border-left-width"] = !0, o["border-radius"] = !0, o["border-right"] = !0, o["border-right-color"] = !0, o["border-right-style"] = !0, o["border-right-width"] = !0, o["border-spacing"] = !0, o["border-style"] = !0, o["border-top"] = !0, o["border-top-color"] = !0, o["border-top-left-radius"] = !0, o["border-top-right-radius"] = !0, o["border-top-style"] = !0, o["border-top-width"] = !0, o["border-width"] = !0, o.bottom = !1, o["box-decoration-break"] = !0, o["box-shadow"] = !0, o["box-sizing"] = !0, o["box-snap"] = !0, o["box-suppress"] = !0, o["break-after"] = !0, o["break-before"] = !0, o["break-inside"] = !0, o["caption-side"] = !1, o.chains = !1, o.clear = !0, o.clip = !1, o["clip-path"] = !1, o["clip-rule"] = !1, o.color = !0, o["color-interpolation-filters"] = !0, o["column-count"] = !1, o["column-fill"] = !1, o["column-gap"] = !1, o["column-rule"] = !1, o["column-rule-color"] = !1, o["column-rule-style"] = !1, o["column-rule-width"] = !1, o["column-span"] = !1, o["column-width"] = !1, o.columns = !1, o.contain = !1, o.content = !1, o["counter-increment"] = !1, o["counter-reset"] = !1, o["counter-set"] = !1, o.crop = !1, o.cue = !1, o["cue-after"] = !1, o["cue-before"] = !1, o.cursor = !1, o.direction = !1, o.display = !0, o["display-inside"] = !0, o["display-list"] = !0, o["display-outside"] = !0, o["dominant-baseline"] = !1, o.elevation = !1, o["empty-cells"] = !1, o.filter = !1, o.flex = !1, o["flex-basis"] = !1, o["flex-direction"] = !1, o["flex-flow"] = !1, o["flex-grow"] = !1, o["flex-shrink"] = !1, o["flex-wrap"] = !1, o.float = !1, o["float-offset"] = !1, o["flood-color"] = !1, o["flood-opacity"] = !1, o["flow-from"] = !1, o["flow-into"] = !1, o.font = !0, o["font-family"] = !0, o["font-feature-settings"] = !0, o["font-kerning"] = !0, o["font-language-override"] = !0, o["font-size"] = !0, o["font-size-adjust"] = !0, o["font-stretch"] = !0, o["font-style"] = !0, o["font-synthesis"] = !0, o["font-variant"] = !0, o["font-variant-alternates"] = !0, o["font-variant-caps"] = !0, o["font-variant-east-asian"] = !0, o["font-variant-ligatures"] = !0, o["font-variant-numeric"] = !0, o["font-variant-position"] = !0, o["font-weight"] = !0, o.grid = !1, o["grid-area"] = !1, o["grid-auto-columns"] = !1, o["grid-auto-flow"] = !1, o["grid-auto-rows"] = !1, o["grid-column"] = !1, o["grid-column-end"] = !1, o["grid-column-start"] = !1, o["grid-row"] = !1, o["grid-row-end"] = !1, o["grid-row-start"] = !1, o["grid-template"] = !1, o["grid-template-areas"] = !1, o["grid-template-columns"] = !1, o["grid-template-rows"] = !1, o["hanging-punctuation"] = !1, o.height = !0, o.hyphens = !1, o.icon = !1, o["image-orientation"] = !1, o["image-resolution"] = !1, o["ime-mode"] = !1, o["initial-letters"] = !1, o["inline-box-align"] = !1, o["justify-content"] = !1, o["justify-items"] = !1, o["justify-self"] = !1, o.left = !1, o["letter-spacing"] = !0, o["lighting-color"] = !0, o["line-box-contain"] = !1, o["line-break"] = !1, o["line-grid"] = !1, o["line-height"] = !1, o["line-snap"] = !1, o["line-stacking"] = !1, o["line-stacking-ruby"] = !1, o["line-stacking-shift"] = !1, o["line-stacking-strategy"] = !1, o["list-style"] = !0, o["list-style-image"] = !0, o["list-style-position"] = !0, o["list-style-type"] = !0, o.margin = !0, o["margin-bottom"] = !0, o["margin-left"] = !0, o["margin-right"] = !0, o["margin-top"] = !0, o["marker-offset"] = !1, o["marker-side"] = !1, o.marks = !1, o.mask = !1, o["mask-box"] = !1, o["mask-box-outset"] = !1, o["mask-box-repeat"] = !1, o["mask-box-slice"] = !1, o["mask-box-source"] = !1, o["mask-box-width"] = !1, o["mask-clip"] = !1, o["mask-image"] = !1, o["mask-origin"] = !1, o["mask-position"] = !1, o["mask-repeat"] = !1, o["mask-size"] = !1, o["mask-source-type"] = !1, o["mask-type"] = !1, o["max-height"] = !0, o["max-lines"] = !1, o["max-width"] = !0, o["min-height"] = !0, o["min-width"] = !0, o["move-to"] = !1, o["nav-down"] = !1, o["nav-index"] = !1, o["nav-left"] = !1, o["nav-right"] = !1, o["nav-up"] = !1, o["object-fit"] = !1, o["object-position"] = !1, o.opacity = !1, o.order = !1, o.orphans = !1, o.outline = !1, o["outline-color"] = !1, o["outline-offset"] = !1, o["outline-style"] = !1, o["outline-width"] = !1, o.overflow = !1, o["overflow-wrap"] = !1, o["overflow-x"] = !1, o["overflow-y"] = !1, o.padding = !0, o["padding-bottom"] = !0, o["padding-left"] = !0, o["padding-right"] = !0, o["padding-top"] = !0, o.page = !1, o["page-break-after"] = !1, o["page-break-before"] = !1, o["page-break-inside"] = !1, o["page-policy"] = !1, o.pause = !1, o["pause-after"] = !1, o["pause-before"] = !1, o.perspective = !1, o["perspective-origin"] = !1, o.pitch = !1, o["pitch-range"] = !1, o["play-during"] = !1, o.position = !1, o["presentation-level"] = !1, o.quotes = !1, o["region-fragment"] = !1, o.resize = !1, o.rest = !1, o["rest-after"] = !1, o["rest-before"] = !1, o.richness = !1, o.right = !1, o.rotation = !1, o["rotation-point"] = !1, o["ruby-align"] = !1, o["ruby-merge"] = !1, o["ruby-position"] = !1, o["shape-image-threshold"] = !1, o["shape-outside"] = !1, o["shape-margin"] = !1, o.size = !1, o.speak = !1, o["speak-as"] = !1, o["speak-header"] = !1, o["speak-numeral"] = !1, o["speak-punctuation"] = !1, o["speech-rate"] = !1, o.stress = !1, o["string-set"] = !1, o["tab-size"] = !1, o["table-layout"] = !1, o["text-align"] = !0, o["text-align-last"] = !0, o["text-combine-upright"] = !0, o["text-decoration"] = !0, o["text-decoration-color"] = !0, o["text-decoration-line"] = !0, o["text-decoration-skip"] = !0, o["text-decoration-style"] = !0, o["text-emphasis"] = !0, o["text-emphasis-color"] = !0, o["text-emphasis-position"] = !0, o["text-emphasis-style"] = !0, o["text-height"] = !0, o["text-indent"] = !0, o["text-justify"] = !0, o["text-orientation"] = !0, o["text-overflow"] = !0, o["text-shadow"] = !0, o["text-space-collapse"] = !0, o["text-transform"] = !0, o["text-underline-position"] = !0, o["text-wrap"] = !0, o.top = !1, o.transform = !1, o["transform-origin"] = !1, o["transform-style"] = !1, o.transition = !1, o["transition-delay"] = !1, o["transition-duration"] = !1, o["transition-property"] = !1, o["transition-timing-function"] = !1, o["unicode-bidi"] = !1, o["vertical-align"] = !1, o.visibility = !1, o["voice-balance"] = !1, o["voice-duration"] = !1, o["voice-family"] = !1, o["voice-pitch"] = !1, o["voice-range"] = !1, o["voice-rate"] = !1, o["voice-stress"] = !1, o["voice-volume"] = !1, o.volume = !1, o["white-space"] = !1, o.widows = !1, o.width = !0, o["will-change"] = !1, o["word-break"] = !0, o["word-spacing"] = !0, o["word-wrap"] = !0, o["wrap-flow"] = !1, o["wrap-through"] = !1, o["writing-mode"] = !1, o["z-index"] = !1, o;
  }
  function t(o, i, a) {
  }
  function n(o, i, a) {
  }
  var r = /javascript\s*\:/img;
  function s(o, i) {
    return r.test(i) ? "" : i;
  }
  return Yn.whiteList = e(), Yn.getDefaultWhiteList = e, Yn.onAttr = t, Yn.onIgnoreAttr = n, Yn.safeAttrValue = s, Yn;
}
var ma, f0;
function Tm() {
  return f0 || (f0 = 1, ma = {
    indexOf: function(e, t) {
      var n, r;
      if (Array.prototype.indexOf)
        return e.indexOf(t);
      for (n = 0, r = e.length; n < r; n++)
        if (e[n] === t)
          return n;
      return -1;
    },
    forEach: function(e, t, n) {
      var r, s;
      if (Array.prototype.forEach)
        return e.forEach(t, n);
      for (r = 0, s = e.length; r < s; r++)
        t.call(n, e[r], r, e);
    },
    trim: function(e) {
      return String.prototype.trim ? e.trim() : e.replace(/(^\s*)|(\s*$)/g, "");
    },
    trimRight: function(e) {
      return String.prototype.trimRight ? e.trimRight() : e.replace(/(\s*$)/g, "");
    }
  }), ma;
}
var va, p0;
function jHe() {
  if (p0) return va;
  p0 = 1;
  var e = Tm();
  function t(n, r) {
    n = e.trimRight(n), n[n.length - 1] !== ";" && (n += ";");
    var s = n.length, o = !1, i = 0, a = 0, c = "";
    function u() {
      if (!o) {
        var m = e.trim(n.slice(i, a)), f = m.indexOf(":");
        if (f !== -1) {
          var v = e.trim(m.slice(0, f)), g = e.trim(m.slice(f + 1));
          if (v) {
            var y = r(i, c.length, v, g, m);
            y && (c += y + "; ");
          }
        }
      }
      i = a + 1;
    }
    for (; a < s; a++) {
      var d = n[a];
      if (d === "/" && n[a + 1] === "*") {
        var l = n.indexOf("*/", a + 2);
        if (l === -1) break;
        a = l + 1, i = a + 1, o = !1;
      } else d === "(" ? o = !0 : d === ")" ? o = !1 : d === ";" ? o || u() : d === `
` && u();
    }
    return e.trim(c);
  }
  return va = t, va;
}
var _a, h0;
function HHe() {
  if (h0) return _a;
  h0 = 1;
  var e = Im(), t = jHe();
  Tm();
  function n(o) {
    return o == null;
  }
  function r(o) {
    var i = {};
    for (var a in o)
      i[a] = o[a];
    return i;
  }
  function s(o) {
    o = r(o || {}), o.whiteList = o.whiteList || e.whiteList, o.onAttr = o.onAttr || e.onAttr, o.onIgnoreAttr = o.onIgnoreAttr || e.onIgnoreAttr, o.safeAttrValue = o.safeAttrValue || e.safeAttrValue, this.options = o;
  }
  return s.prototype.process = function(o) {
    if (o = o || "", o = o.toString(), !o) return "";
    var i = this, a = i.options, c = a.whiteList, u = a.onAttr, d = a.onIgnoreAttr, l = a.safeAttrValue, m = t(o, function(f, v, g, y, h) {
      var w = c[g], k = !1;
      if (w === !0 ? k = w : typeof w == "function" ? k = w(y) : w instanceof RegExp && (k = w.test(y)), k !== !0 && (k = !1), y = l(g, y), !!y) {
        var C = {
          position: v,
          sourcePosition: f,
          source: h,
          isWhite: k
        };
        if (k) {
          var A = u(g, y, C);
          return n(A) ? g + ":" + y : A;
        } else {
          var A = d(g, y, C);
          if (!n(A))
            return A;
        }
      }
    });
    return m;
  }, _a = s, _a;
}
var g0;
function Hc() {
  return g0 || (g0 = 1, function(e, t) {
    var n = Im(), r = HHe();
    function s(i, a) {
      var c = new r(a);
      return c.process(i);
    }
    t = e.exports = s, t.FilterCSS = r;
    for (var o in n) t[o] = n[o];
    typeof window < "u" && (window.filterCSS = e.exports);
  }(Ro, Ro.exports)), Ro.exports;
}
var ba, m0;
function zl() {
  return m0 || (m0 = 1, ba = {
    indexOf: function(e, t) {
      var n, r;
      if (Array.prototype.indexOf)
        return e.indexOf(t);
      for (n = 0, r = e.length; n < r; n++)
        if (e[n] === t)
          return n;
      return -1;
    },
    forEach: function(e, t, n) {
      var r, s;
      if (Array.prototype.forEach)
        return e.forEach(t, n);
      for (r = 0, s = e.length; r < s; r++)
        t.call(n, e[r], r, e);
    },
    trim: function(e) {
      return String.prototype.trim ? e.trim() : e.replace(/(^\s*)|(\s*$)/g, "");
    },
    spaceIndex: function(e) {
      var t = /\s|\n|\t/, n = t.exec(e);
      return n ? n.index : -1;
    }
  }), ba;
}
var v0;
function Lm() {
  if (v0) return Fe;
  v0 = 1;
  var e = Hc().FilterCSS, t = Hc().getDefaultWhiteList, n = zl();
  function r() {
    return {
      a: ["target", "href", "title"],
      abbr: ["title"],
      address: [],
      area: ["shape", "coords", "href", "alt"],
      article: [],
      aside: [],
      audio: [
        "autoplay",
        "controls",
        "crossorigin",
        "loop",
        "muted",
        "preload",
        "src"
      ],
      b: [],
      bdi: ["dir"],
      bdo: ["dir"],
      big: [],
      blockquote: ["cite"],
      br: [],
      caption: [],
      center: [],
      cite: [],
      code: [],
      col: ["align", "valign", "span", "width"],
      colgroup: ["align", "valign", "span", "width"],
      dd: [],
      del: ["datetime"],
      details: ["open"],
      div: [],
      dl: [],
      dt: [],
      em: [],
      figcaption: [],
      figure: [],
      font: ["color", "size", "face"],
      footer: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      header: [],
      hr: [],
      i: [],
      img: ["src", "alt", "title", "width", "height", "loading"],
      ins: ["datetime"],
      kbd: [],
      li: [],
      mark: [],
      nav: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      section: [],
      small: [],
      span: [],
      sub: [],
      summary: [],
      sup: [],
      strong: [],
      strike: [],
      table: ["width", "border", "align", "valign"],
      tbody: ["align", "valign"],
      td: ["width", "rowspan", "colspan", "align", "valign"],
      tfoot: ["align", "valign"],
      th: ["width", "rowspan", "colspan", "align", "valign"],
      thead: ["align", "valign"],
      tr: ["rowspan", "align", "valign"],
      tt: [],
      u: [],
      ul: [],
      video: [
        "autoplay",
        "controls",
        "crossorigin",
        "loop",
        "muted",
        "playsinline",
        "poster",
        "preload",
        "src",
        "height",
        "width"
      ]
    };
  }
  var s = new e();
  function o(z, N, F) {
  }
  function i(z, N, F) {
  }
  function a(z, N, F) {
  }
  function c(z, N, F) {
  }
  function u(z) {
    return z.replace(l, "&lt;").replace(m, "&gt;");
  }
  function d(z, N, F, Z) {
    if (F = R(F), N === "href" || N === "src") {
      if (F = n.trim(F), F === "#") return "#";
      if (!(F.substr(0, 7) === "http://" || F.substr(0, 8) === "https://" || F.substr(0, 7) === "mailto:" || F.substr(0, 4) === "tel:" || F.substr(0, 11) === "data:image/" || F.substr(0, 6) === "ftp://" || F.substr(0, 2) === "./" || F.substr(0, 3) === "../" || F[0] === "#" || F[0] === "/"))
        return "";
    } else if (N === "background") {
      if (w.lastIndex = 0, w.test(F))
        return "";
    } else if (N === "style") {
      if (k.lastIndex = 0, k.test(F) || (C.lastIndex = 0, C.test(F) && (w.lastIndex = 0, w.test(F))))
        return "";
      Z !== !1 && (Z = Z || s, F = Z.process(F));
    }
    return F = B(F), F;
  }
  var l = /</g, m = />/g, f = /"/g, v = /&quot;/g, g = /&#([a-zA-Z0-9]*);?/gim, y = /&colon;?/gim, h = /&newline;?/gim, w = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a):/gi, k = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi, C = /u\s*r\s*l\s*\(.*/gi;
  function A(z) {
    return z.replace(f, "&quot;");
  }
  function E(z) {
    return z.replace(v, '"');
  }
  function $(z) {
    return z.replace(g, function(F, Z) {
      return Z[0] === "x" || Z[0] === "X" ? String.fromCharCode(parseInt(Z.substr(1), 16)) : String.fromCharCode(parseInt(Z, 10));
    });
  }
  function M(z) {
    return z.replace(y, ":").replace(h, " ");
  }
  function O(z) {
    for (var N = "", F = 0, Z = z.length; F < Z; F++)
      N += z.charCodeAt(F) < 32 ? " " : z.charAt(F);
    return n.trim(N);
  }
  function R(z) {
    return z = E(z), z = $(z), z = M(z), z = O(z), z;
  }
  function B(z) {
    return z = A(z), z = u(z), z;
  }
  function V() {
    return "";
  }
  function re(z, N) {
    typeof N != "function" && (N = function() {
    });
    var F = !Array.isArray(z);
    function Z(le) {
      return F ? !0 : n.indexOf(z, le) !== -1;
    }
    var W = [], pe = !1;
    return {
      onIgnoreTag: function(le, Ee, Oe) {
        if (Z(le))
          if (Oe.isClosing) {
            var ze = "[/removed]", Qe = Oe.position + ze.length;
            return W.push([
              pe !== !1 ? pe : Oe.position,
              Qe
            ]), pe = !1, ze;
          } else
            return pe || (pe = Oe.position), "[removed]";
        else
          return N(le, Ee, Oe);
      },
      remove: function(le) {
        var Ee = "", Oe = 0;
        return n.forEach(W, function(ze) {
          Ee += le.slice(Oe, ze[0]), Oe = ze[1];
        }), Ee += le.slice(Oe), Ee;
      }
    };
  }
  function P(z) {
    for (var N = "", F = 0; F < z.length; ) {
      var Z = z.indexOf("<!--", F);
      if (Z === -1) {
        N += z.slice(F);
        break;
      }
      N += z.slice(F, Z);
      var W = z.indexOf("-->", Z);
      if (W === -1)
        break;
      F = W + 3;
    }
    return N;
  }
  function U(z) {
    var N = z.split("");
    return N = N.filter(function(F) {
      var Z = F.charCodeAt(0);
      return Z === 127 ? !1 : Z <= 31 ? Z === 10 || Z === 13 : !0;
    }), N.join("");
  }
  return Fe.whiteList = r(), Fe.getDefaultWhiteList = r, Fe.onTag = o, Fe.onIgnoreTag = i, Fe.onTagAttr = a, Fe.onIgnoreTagAttr = c, Fe.safeAttrValue = d, Fe.escapeHtml = u, Fe.escapeQuote = A, Fe.unescapeQuote = E, Fe.escapeHtmlEntities = $, Fe.escapeDangerHtml5Entities = M, Fe.clearNonPrintableCharacter = O, Fe.friendlyAttrValue = R, Fe.escapeAttrValue = B, Fe.onIgnoreTagStripAll = V, Fe.StripTagBody = re, Fe.stripCommentTag = P, Fe.stripBlankChar = U, Fe.attributeWrapSign = '"', Fe.cssFilter = s, Fe.getDefaultCSSWhiteList = t, Fe;
}
var Po = {}, _0;
function Om() {
  if (_0) return Po;
  _0 = 1;
  var e = zl();
  function t(l) {
    var m = e.spaceIndex(l), f;
    return m === -1 ? f = l.slice(1, -1) : f = l.slice(1, m + 1), f = e.trim(f).toLowerCase(), f.slice(0, 1) === "/" && (f = f.slice(1)), f.slice(-1) === "/" && (f = f.slice(0, -1)), f;
  }
  function n(l) {
    return l.slice(0, 2) === "</";
  }
  function r(l, m, f) {
    var v = "", g = 0, y = !1, h = !1, w = 0, k = l.length, C = "", A = "";
    e: for (w = 0; w < k; w++) {
      var E = l.charAt(w);
      if (y === !1) {
        if (E === "<") {
          y = w;
          continue;
        }
      } else if (h === !1) {
        if (E === "<") {
          v += f(l.slice(g, w)), y = w, g = w;
          continue;
        }
        if (E === ">" || w === k - 1) {
          v += f(l.slice(g, y)), A = l.slice(y, w + 1), C = t(A), v += m(
            y,
            v.length,
            C,
            A,
            n(A)
          ), g = w + 1, y = !1;
          continue;
        }
        if (E === '"' || E === "'")
          for (var $ = 1, M = l.charAt(w - $); M.trim() === "" || M === "="; ) {
            if (M === "=") {
              h = E;
              continue e;
            }
            M = l.charAt(w - ++$);
          }
      } else if (E === h) {
        h = !1;
        continue;
      }
    }
    return g < k && (v += f(l.substr(g))), v;
  }
  var s = /[^a-zA-Z0-9\\_:.-]/gim;
  function o(l, m) {
    var f = 0, v = 0, g = [], y = !1, h = l.length;
    function w($, M) {
      if ($ = e.trim($), $ = $.replace(s, "").toLowerCase(), !($.length < 1)) {
        var O = m($, M || "");
        O && g.push(O);
      }
    }
    for (var k = 0; k < h; k++) {
      var C = l.charAt(k), A, E;
      if (y === !1 && C === "=") {
        y = l.slice(f, k), f = k + 1, v = l.charAt(f) === '"' || l.charAt(f) === "'" ? f : a(l, k + 1);
        continue;
      }
      if (y !== !1 && k === v) {
        if (E = l.indexOf(C, k + 1), E === -1)
          break;
        A = e.trim(l.slice(v + 1, E)), w(y, A), y = !1, k = E, f = k + 1;
        continue;
      }
      if (/\s|\n|\t/.test(C))
        if (l = l.replace(/\s|\n|\t/g, " "), y === !1)
          if (E = i(l, k), E === -1) {
            A = e.trim(l.slice(f, k)), w(A), y = !1, f = k + 1;
            continue;
          } else {
            k = E - 1;
            continue;
          }
        else if (E = c(l, k - 1), E === -1) {
          A = e.trim(l.slice(f, k)), A = d(A), w(y, A), y = !1, f = k + 1;
          continue;
        } else
          continue;
    }
    return f < l.length && (y === !1 ? w(l.slice(f)) : w(y, d(e.trim(l.slice(f))))), e.trim(g.join(" "));
  }
  function i(l, m) {
    for (; m < l.length; m++) {
      var f = l[m];
      if (f !== " ")
        return f === "=" ? m : -1;
    }
  }
  function a(l, m) {
    for (; m < l.length; m++) {
      var f = l[m];
      if (f !== " ")
        return f === "'" || f === '"' ? m : -1;
    }
  }
  function c(l, m) {
    for (; m > 0; m--) {
      var f = l[m];
      if (f !== " ")
        return f === "=" ? m : -1;
    }
  }
  function u(l) {
    return l[0] === '"' && l[l.length - 1] === '"' || l[0] === "'" && l[l.length - 1] === "'";
  }
  function d(l) {
    return u(l) ? l.substr(1, l.length - 2) : l;
  }
  return Po.parseTag = r, Po.parseAttr = o, Po;
}
var ya, b0;
function VHe() {
  if (b0) return ya;
  b0 = 1;
  var e = Hc().FilterCSS, t = Lm(), n = Om(), r = n.parseTag, s = n.parseAttr, o = zl();
  function i(l) {
    return l == null;
  }
  function a(l) {
    var m = o.spaceIndex(l);
    if (m === -1)
      return {
        html: "",
        closing: l[l.length - 2] === "/"
      };
    l = o.trim(l.slice(m + 1, -1));
    var f = l[l.length - 1] === "/";
    return f && (l = o.trim(l.slice(0, -1))), {
      html: l,
      closing: f
    };
  }
  function c(l) {
    var m = {};
    for (var f in l)
      m[f] = l[f];
    return m;
  }
  function u(l) {
    var m = {};
    for (var f in l)
      Array.isArray(l[f]) ? m[f.toLowerCase()] = l[f].map(function(v) {
        return v.toLowerCase();
      }) : m[f.toLowerCase()] = l[f];
    return m;
  }
  function d(l) {
    l = c(l || {}), l.stripIgnoreTag && (l.onIgnoreTag && console.error(
      'Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'
    ), l.onIgnoreTag = t.onIgnoreTagStripAll), l.whiteList || l.allowList ? l.whiteList = u(l.whiteList || l.allowList) : l.whiteList = t.whiteList, this.attributeWrapSign = l.singleQuotedAttributeValue === !0 ? "'" : t.attributeWrapSign, l.onTag = l.onTag || t.onTag, l.onTagAttr = l.onTagAttr || t.onTagAttr, l.onIgnoreTag = l.onIgnoreTag || t.onIgnoreTag, l.onIgnoreTagAttr = l.onIgnoreTagAttr || t.onIgnoreTagAttr, l.safeAttrValue = l.safeAttrValue || t.safeAttrValue, l.escapeHtml = l.escapeHtml || t.escapeHtml, this.options = l, l.css === !1 ? this.cssFilter = !1 : (l.css = l.css || {}, this.cssFilter = new e(l.css));
  }
  return d.prototype.process = function(l) {
    if (l = l || "", l = l.toString(), !l) return "";
    var m = this, f = m.options, v = f.whiteList, g = f.onTag, y = f.onIgnoreTag, h = f.onTagAttr, w = f.onIgnoreTagAttr, k = f.safeAttrValue, C = f.escapeHtml, A = m.attributeWrapSign, E = m.cssFilter;
    f.stripBlankChar && (l = t.stripBlankChar(l)), f.allowCommentTag || (l = t.stripCommentTag(l));
    var $ = !1;
    f.stripIgnoreTagBody && ($ = t.StripTagBody(
      f.stripIgnoreTagBody,
      y
    ), y = $.onIgnoreTag);
    var M = r(
      l,
      function(O, R, B, V, re) {
        var P = {
          sourcePosition: O,
          position: R,
          isClosing: re,
          isWhite: Object.prototype.hasOwnProperty.call(v, B)
        }, U = g(B, V, P);
        if (!i(U)) return U;
        if (P.isWhite) {
          if (P.isClosing)
            return "</" + B + ">";
          var z = a(V), N = v[B], F = s(z.html, function(Z, W) {
            var pe = o.indexOf(N, Z) !== -1, le = h(B, Z, W, pe);
            return i(le) ? pe ? (W = k(B, Z, W, E), W ? Z + "=" + A + W + A : Z) : (le = w(B, Z, W, pe), i(le) ? void 0 : le) : le;
          });
          return V = "<" + B, F && (V += " " + F), z.closing && (V += " /"), V += ">", V;
        } else
          return U = y(B, V, P), i(U) ? C(V) : U;
      },
      C
    );
    return $ && (M = $.remove(M)), M;
  }, ya = d, ya;
}
var y0;
function UHe() {
  return y0 || (y0 = 1, function(e, t) {
    var n = Lm(), r = Om(), s = VHe();
    function o(a, c) {
      var u = new s(c);
      return u.process(a);
    }
    t = e.exports = o, t.filterXSS = o, t.FilterXSS = s, function() {
      for (var a in n)
        t[a] = n[a];
      for (var c in r)
        t[c] = r[c];
    }(), typeof window < "u" && (window.filterXSS = e.exports);
    function i() {
      return typeof self < "u" && typeof DedicatedWorkerGlobalScope < "u" && self instanceof DedicatedWorkerGlobalScope;
    }
    i() && (self.filterXSS = e.exports);
  }(Oo, Oo.exports)), Oo.exports;
}
var Uo = UHe();
const ZHe = /* @__PURE__ */ Ar(Uo), WHe = /@\[youtube]\(([\w-]{11}(?:\?.*)?)\)/im, GHe = /^https:\/\/(?:www\.)?(youtube\.com|youtube-nocookie\.com)\/embed\/[\w-]{11}(?:\?.*)?$/i, KHe = (e, t) => {
  const n = {
    width: "100%",
    title: "YouTube video player",
    nocookie: !0,
    ...t
  }, r = (o, i) => {
    const { pos: a, src: c } = o;
    if (c.charCodeAt(a) !== 64) return !1;
    const u = WHe.exec(c.slice(a));
    if (!u) return !1;
    if (!i) {
      const d = o.push("youtube_embed", "", 0);
      d.meta = { videoId: u[1] };
    }
    return o.pos += u[0].length, !0;
  }, s = n.nocookie ? "https://www.youtube-nocookie.com/embed/" : "https://www.youtube.com/embed/";
  e.inline.ruler.before("link", "youtube_embed", r), e.renderer.rules.youtube_embed = (o, i) => {
    const { videoId: a } = o[i].meta;
    return `<iframe ${[
      `width="${n.width}"`,
      ...n.height ? [`height="${n.height}"`] : [],
      `src="${s}${a}"`,
      `title="${e.utils.escapeHtml(n.title)}"`,
      'frameborder="0"',
      'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"',
      'referrerpolicy="strict-origin-when-cross-origin"',
      "allowfullscreen"
    ].join(" ")}></iframe>`;
  };
}, XHe = { class: "n8n-markdown" }, YHe = ["innerHTML"], JHe = /* @__PURE__ */ H({
  __name: "Markdown",
  props: {
    content: { default: "" },
    withMultiBreaks: { type: Boolean, default: !1 },
    images: { default: () => [] },
    loading: { type: Boolean, default: !1 },
    loadingBlocks: { default: 2 },
    loadingRows: { default: 3 },
    theme: { default: "markdown" },
    options: { default: () => ({
      markdown: {
        html: !1,
        linkify: !0,
        typographer: !0,
        breaks: !0
      },
      linkAttributes: {
        attrs: {
          target: "_blank",
          rel: "noopener"
        }
      },
      tasklists: {
        enabled: !0,
        label: !0,
        labelAfter: !0
      },
      youtube: {}
    }) }
  },
  emits: ["markdown-click", "update-content"],
  setup(e, { emit: t }) {
    const n = e, r = D(void 0), { options: s } = n, o = new $m(s.markdown).use(Mm, s.linkAttributes).use(BHe).use(FHe, s.tasklists).use(KHe, s.youtube), i = {
      ...Uo.whiteList,
      label: ["class", "for"],
      iframe: [
        "width",
        "height",
        "src",
        "title",
        "frameborder",
        "allow",
        "referrerpolicy",
        "allowfullscreen"
      ]
    }, a = I(() => {
      if (!n.content)
        return "";
      const f = {};
      n.images && n.images.forEach((w) => {
        w && (f[w.id] = w.url);
      });
      const v = new RegExp("fileId:([0-9]+)");
      let g = n.content;
      n.withMultiBreaks && (g = g.replaceAll(`

`, `
&nbsp;
`));
      const y = o.render(g);
      return ZHe(y, {
        onTagAttr(w, k, C) {
          if (w === "img" && k === "src") {
            if (C.match(v)) {
              const $ = C.split("fileId:")[1], M = Uo.friendlyAttrValue(f[$]);
              return M ? `src=${M}` : "";
            }
            const E = C.split("#")[0].match(/\.(jpeg|jpg|gif|png|webp)$/) !== null && C.startsWith("/static/");
            if (!C.startsWith("https://") && !E)
              return "";
          }
          if (w === "iframe")
            return k === "src" ? GHe.test(C) ? `src=${Uo.friendlyAttrValue(C)}` : "" : void 0;
        },
        onTag(w, k) {
          if (w === "img" && k.includes('alt="workflow-screenshot"'))
            return "";
        },
        onIgnoreTag(w, k) {
          if (w === "input" && k.includes('type="checkbox"'))
            return k;
        },
        whiteList: i
      });
    }), c = t, u = (f) => {
      let v = null;
      if (f.target instanceof HTMLAnchorElement && (v = f.target), f.target instanceof HTMLElement && f.target.matches("a *")) {
        const g = f.target.closest("a");
        g && (v = g);
      }
      v && c("markdown-click", v, f);
    }, d = async (f) => {
      var v;
      if (f.target instanceof HTMLInputElement && f.target.type === "checkbox") {
        const g = (v = r.value) == null ? void 0 : v.querySelectorAll('input[type="checkbox"]');
        if (g) {
          const y = Array.from(g).indexOf(f.target);
          y !== -1 && m(y);
        }
      }
    }, l = (f) => {
      f.target instanceof HTMLInputElement && f.stopPropagation();
    }, m = (f) => {
      const v = n.content;
      if (!v)
        return;
      const g = WL(v, f);
      c("update-content", g);
    };
    return (f, v) => (b(), x("div", XHe, [
      f.loading ? (b(), x("div", {
        key: 1,
        class: j(f.$style.markdown)
      }, [
        (b(!0), x(Pe, null, Je(f.loadingBlocks, (g, y) => (b(), x("div", { key: y }, [
          ue(_(GM), {
            loading: f.loading,
            rows: f.loadingRows,
            animated: "",
            variant: "p"
          }, null, 8, ["loading", "rows"]),
          p("div", {
            class: j(f.$style.spacer)
          }, null, 2)
        ]))), 128))
      ], 2)) : (b(), x("div", {
        key: 0,
        ref_key: "editor",
        ref: r,
        class: j(f.$style[f.theme]),
        onClick: u,
        onMousedown: l,
        onChange: d,
        innerHTML: a.value
      }, null, 42, YHe))
    ]));
  }
}), QHe = "_markdown_17ukb_1", eVe = "_label_17ukb_43", tVe = "_sticky_17ukb_64", nVe = "_spacer_17ukb_160", rVe = {
  markdown: QHe,
  label: eVe,
  sticky: tVe,
  spacer: nVe
}, oVe = {
  $style: rVe
}, sVe = /* @__PURE__ */ qt(JHe, [["__cssModules", oVe]]), w0 = {
  right: "ew-resize",
  top: "ns-resize",
  bottom: "ns-resize",
  left: "ew-resize",
  topLeft: "nw-resize",
  topRight: "ne-resize",
  bottomLeft: "sw-resize",
  bottomRight: "se-resize"
};
({
  // @ts-expect-error TS doesn't understand this but it works
  ...zd.props
  // <a> element "props" are passed as attributes
});
/*!
 * Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */
function Gr(e) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Gr = function(t) {
    return typeof t;
  } : Gr = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Gr(e);
}
function iVe(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function aVe(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function cVe(e, t, n) {
  return t && aVe(e.prototype, t), e;
}
function lVe(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function xe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(s) {
      return Object.getOwnPropertyDescriptor(n, s).enumerable;
    }))), r.forEach(function(s) {
      lVe(e, s, n[s]);
    });
  }
  return e;
}
function Rm(e, t) {
  return fVe(e) || hVe(e, t) || mVe();
}
function uVe(e) {
  return dVe(e) || pVe(e) || gVe();
}
function dVe(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
    return n;
  }
}
function fVe(e) {
  if (Array.isArray(e)) return e;
}
function pVe(e) {
  if (Symbol.iterator in Object(e) || Object.prototype.toString.call(e) === "[object Arguments]") return Array.from(e);
}
function hVe(e, t) {
  var n = [], r = !0, s = !1, o = void 0;
  try {
    for (var i = e[Symbol.iterator](), a; !(r = (a = i.next()).done) && (n.push(a.value), !(t && n.length === t)); r = !0)
      ;
  } catch (c) {
    s = !0, o = c;
  } finally {
    try {
      !r && i.return != null && i.return();
    } finally {
      if (s) throw o;
    }
  }
  return n;
}
function gVe() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function mVe() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
var k0 = function() {
}, Dl = {}, Pm = {}, vVe = null, Bm = {
  mark: k0,
  measure: k0
};
try {
  typeof window < "u" && (Dl = window), typeof document < "u" && (Pm = document), typeof MutationObserver < "u" && (vVe = MutationObserver), typeof performance < "u" && (Bm = performance);
} catch {
}
var _Ve = Dl.navigator || {}, C0 = _Ve.userAgent, x0 = C0 === void 0 ? "" : C0, Es = Dl, ht = Pm, Bo = Bm;
Es.document;
var Nl = !!ht.documentElement && !!ht.head && typeof ht.addEventListener == "function" && typeof ht.createElement == "function", bVe = ~x0.indexOf("MSIE") || ~x0.indexOf("Trident/"), Cn = "___FONT_AWESOME___", Vc = 16, zm = "fa", Dm = "svg-inline--fa", Nm = "data-fa-i2svg";
(function() {
  try {
    return !0;
  } catch {
    return !1;
  }
})();
var wa = {
  GROUP: "group",
  PRIMARY: "primary",
  SECONDARY: "secondary"
}, qm = Es.FontAwesomeConfig || {};
function yVe(e) {
  var t = ht.querySelector("script[" + e + "]");
  if (t)
    return t.getAttribute(e);
}
function wVe(e) {
  return e === "" ? !0 : e === "false" ? !1 : e === "true" ? !0 : e;
}
if (ht && typeof ht.querySelector == "function") {
  var kVe = [["data-family-prefix", "familyPrefix"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-auto-a11y", "autoA11y"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-observe-mutations", "observeMutations"], ["data-mutate-approach", "mutateApproach"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]];
  kVe.forEach(function(e) {
    var t = Rm(e, 2), n = t[0], r = t[1], s = wVe(yVe(n));
    s != null && (qm[r] = s);
  });
}
var CVe = {
  familyPrefix: zm,
  replacementClass: Dm,
  autoReplaceSvg: !0,
  autoAddCss: !0,
  autoA11y: !0,
  searchPseudoElements: !1,
  observeMutations: !0,
  mutateApproach: "async",
  keepOriginalSource: !0,
  measurePerformance: !1,
  showMissingIcons: !0
}, Uc = xe({}, CVe, qm);
Uc.autoReplaceSvg || (Uc.observeMutations = !1);
var dt = xe({}, Uc);
Es.FontAwesomeConfig = dt;
var xn = Es || {};
xn[Cn] || (xn[Cn] = {});
xn[Cn].styles || (xn[Cn].styles = {});
xn[Cn].hooks || (xn[Cn].hooks = {});
xn[Cn].shims || (xn[Cn].shims = []);
var ln = xn[Cn], xVe = [], SVe = function e() {
  ht.removeEventListener("DOMContentLoaded", e), Zc = 1, xVe.map(function(t) {
    return t();
  });
}, Zc = !1;
Nl && (Zc = (ht.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(ht.readyState), Zc || ht.addEventListener("DOMContentLoaded", SVe));
var ql = "pending", Fm = "settled", es = "fulfilled", ts = "rejected", EVe = function() {
}, jm = typeof global < "u" && typeof global.process < "u" && typeof global.process.emit == "function", AVe = typeof setImmediate > "u" ? setTimeout : setImmediate, Hr = [], Wc;
function $Ve() {
  for (var e = 0; e < Hr.length; e++)
    Hr[e][0](Hr[e][1]);
  Hr = [], Wc = !1;
}
function ns(e, t) {
  Hr.push([e, t]), Wc || (Wc = !0, AVe($Ve, 0));
}
function MVe(e, t) {
  function n(s) {
    Fl(t, s);
  }
  function r(s) {
    co(t, s);
  }
  try {
    e(n, r);
  } catch (s) {
    r(s);
  }
}
function Hm(e) {
  var t = e.owner, n = t._state, r = t._data, s = e[n], o = e.then;
  if (typeof s == "function") {
    n = es;
    try {
      r = s(r);
    } catch (i) {
      co(o, i);
    }
  }
  Vm(o, r) || (n === es && Fl(o, r), n === ts && co(o, r));
}
function Vm(e, t) {
  var n;
  try {
    if (e === t)
      throw new TypeError("A promises callback cannot return that same promise.");
    if (t && (typeof t == "function" || Gr(t) === "object")) {
      var r = t.then;
      if (typeof r == "function")
        return r.call(t, function(s) {
          n || (n = !0, t === s ? Um(e, s) : Fl(e, s));
        }, function(s) {
          n || (n = !0, co(e, s));
        }), !0;
    }
  } catch (s) {
    return n || co(e, s), !0;
  }
  return !1;
}
function Fl(e, t) {
  (e === t || !Vm(e, t)) && Um(e, t);
}
function Um(e, t) {
  e._state === ql && (e._state = Fm, e._data = t, ns(IVe, e));
}
function co(e, t) {
  e._state === ql && (e._state = Fm, e._data = t, ns(TVe, e));
}
function Zm(e) {
  e._then = e._then.forEach(Hm);
}
function IVe(e) {
  e._state = es, Zm(e);
}
function TVe(e) {
  e._state = ts, Zm(e), !e._handled && jm && global.process.emit("unhandledRejection", e._data, e);
}
function LVe(e) {
  global.process.emit("rejectionHandled", e);
}
function Bt(e) {
  if (typeof e != "function")
    throw new TypeError("Promise resolver " + e + " is not a function");
  if (!(this instanceof Bt))
    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
  this._then = [], MVe(e, this);
}
Bt.prototype = {
  constructor: Bt,
  _state: ql,
  _then: null,
  _data: void 0,
  _handled: !1,
  then: function(t, n) {
    var r = {
      owner: this,
      then: new this.constructor(EVe),
      fulfilled: t,
      rejected: n
    };
    return (n || t) && !this._handled && (this._handled = !0, this._state === ts && jm && ns(LVe, this)), this._state === es || this._state === ts ? ns(Hm, r) : this._then.push(r), r.then;
  },
  catch: function(t) {
    return this.then(null, t);
  }
};
Bt.all = function(e) {
  if (!Array.isArray(e))
    throw new TypeError("You must pass an array to Promise.all().");
  return new Bt(function(t, n) {
    var r = [], s = 0;
    function o(c) {
      return s++, function(u) {
        r[c] = u, --s || t(r);
      };
    }
    for (var i = 0, a; i < e.length; i++)
      a = e[i], a && typeof a.then == "function" ? a.then(o(i), n) : r[i] = a;
    s || t(r);
  });
};
Bt.race = function(e) {
  if (!Array.isArray(e))
    throw new TypeError("You must pass an array to Promise.race().");
  return new Bt(function(t, n) {
    for (var r = 0, s; r < e.length; r++)
      s = e[r], s && typeof s.then == "function" ? s.then(t, n) : t(s);
  });
};
Bt.resolve = function(e) {
  return e && Gr(e) === "object" && e.constructor === Bt ? e : new Bt(function(t) {
    t(e);
  });
};
Bt.reject = function(e) {
  return new Bt(function(t, n) {
    n(e);
  });
};
var fr = Vc, Dn = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: !1,
  flipY: !1
};
function OVe(e) {
  if (!(!e || !Nl)) {
    var t = ht.createElement("style");
    t.setAttribute("type", "text/css"), t.innerHTML = e;
    for (var n = ht.head.childNodes, r = null, s = n.length - 1; s > -1; s--) {
      var o = n[s], i = (o.tagName || "").toUpperCase();
      ["STYLE", "LINK"].indexOf(i) > -1 && (r = o);
    }
    return ht.head.insertBefore(t, r), e;
  }
}
var RVe = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function rs() {
  for (var e = 12, t = ""; e-- > 0; )
    t += RVe[Math.random() * 62 | 0];
  return t;
}
function Wm(e) {
  return "".concat(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function PVe(e) {
  return Object.keys(e || {}).reduce(function(t, n) {
    return t + "".concat(n, '="').concat(Wm(e[n]), '" ');
  }, "").trim();
}
function jl(e) {
  return Object.keys(e || {}).reduce(function(t, n) {
    return t + "".concat(n, ": ").concat(e[n], ";");
  }, "");
}
function Hl(e) {
  return e.size !== Dn.size || e.x !== Dn.x || e.y !== Dn.y || e.rotate !== Dn.rotate || e.flipX || e.flipY;
}
function Gm(e) {
  var t = e.transform, n = e.containerWidth, r = e.iconWidth, s = {
    transform: "translate(".concat(n / 2, " 256)")
  }, o = "translate(".concat(t.x * 32, ", ").concat(t.y * 32, ") "), i = "scale(".concat(t.size / 16 * (t.flipX ? -1 : 1), ", ").concat(t.size / 16 * (t.flipY ? -1 : 1), ") "), a = "rotate(".concat(t.rotate, " 0 0)"), c = {
    transform: "".concat(o, " ").concat(i, " ").concat(a)
  }, u = {
    transform: "translate(".concat(r / 2 * -1, " -256)")
  };
  return {
    outer: s,
    inner: c,
    path: u
  };
}
function BVe(e) {
  var t = e.transform, n = e.width, r = n === void 0 ? Vc : n, s = e.height, o = s === void 0 ? Vc : s, i = "";
  return bVe ? i += "translate(".concat(t.x / fr - r / 2, "em, ").concat(t.y / fr - o / 2, "em) ") : i += "translate(calc(-50% + ".concat(t.x / fr, "em), calc(-50% + ").concat(t.y / fr, "em)) "), i += "scale(".concat(t.size / fr * (t.flipX ? -1 : 1), ", ").concat(t.size / fr * (t.flipY ? -1 : 1), ") "), i += "rotate(".concat(t.rotate, "deg) "), i;
}
var ka = {
  x: 0,
  y: 0,
  width: "100%",
  height: "100%"
};
function S0(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return e.attributes && (e.attributes.fill || t) && (e.attributes.fill = "black"), e;
}
function zVe(e) {
  return e.tag === "g" ? e.children : [e];
}
function DVe(e) {
  var t = e.children, n = e.attributes, r = e.main, s = e.mask, o = e.maskId, i = e.transform, a = r.width, c = r.icon, u = s.width, d = s.icon, l = Gm({
    transform: i,
    containerWidth: u,
    iconWidth: a
  }), m = {
    tag: "rect",
    attributes: xe({}, ka, {
      fill: "white"
    })
  }, f = c.children ? {
    children: c.children.map(S0)
  } : {}, v = {
    tag: "g",
    attributes: xe({}, l.inner),
    children: [S0(xe({
      tag: c.tag,
      attributes: xe({}, c.attributes, l.path)
    }, f))]
  }, g = {
    tag: "g",
    attributes: xe({}, l.outer),
    children: [v]
  }, y = "mask-".concat(o || rs()), h = "clip-".concat(o || rs()), w = {
    tag: "mask",
    attributes: xe({}, ka, {
      id: y,
      maskUnits: "userSpaceOnUse",
      maskContentUnits: "userSpaceOnUse"
    }),
    children: [m, g]
  }, k = {
    tag: "defs",
    children: [{
      tag: "clipPath",
      attributes: {
        id: h
      },
      children: zVe(d)
    }, w]
  };
  return t.push(k, {
    tag: "rect",
    attributes: xe({
      fill: "currentColor",
      "clip-path": "url(#".concat(h, ")"),
      mask: "url(#".concat(y, ")")
    }, ka)
  }), {
    children: t,
    attributes: n
  };
}
function NVe(e) {
  var t = e.children, n = e.attributes, r = e.main, s = e.transform, o = e.styles, i = jl(o);
  if (i.length > 0 && (n.style = i), Hl(s)) {
    var a = Gm({
      transform: s,
      containerWidth: r.width,
      iconWidth: r.width
    });
    t.push({
      tag: "g",
      attributes: xe({}, a.outer),
      children: [{
        tag: "g",
        attributes: xe({}, a.inner),
        children: [{
          tag: r.icon.tag,
          children: r.icon.children,
          attributes: xe({}, r.icon.attributes, a.path)
        }]
      }]
    });
  } else
    t.push(r.icon);
  return {
    children: t,
    attributes: n
  };
}
function qVe(e) {
  var t = e.children, n = e.main, r = e.mask, s = e.attributes, o = e.styles, i = e.transform;
  if (Hl(i) && n.found && !r.found) {
    var a = n.width, c = n.height, u = {
      x: a / c / 2,
      y: 0.5
    };
    s.style = jl(xe({}, o, {
      "transform-origin": "".concat(u.x + i.x / 16, "em ").concat(u.y + i.y / 16, "em")
    }));
  }
  return [{
    tag: "svg",
    attributes: s,
    children: t
  }];
}
function FVe(e) {
  var t = e.prefix, n = e.iconName, r = e.children, s = e.attributes, o = e.symbol, i = o === !0 ? "".concat(t, "-").concat(dt.familyPrefix, "-").concat(n) : o;
  return [{
    tag: "svg",
    attributes: {
      style: "display: none;"
    },
    children: [{
      tag: "symbol",
      attributes: xe({}, s, {
        id: i
      }),
      children: r
    }]
  }];
}
function jVe(e) {
  var t = e.icons, n = t.main, r = t.mask, s = e.prefix, o = e.iconName, i = e.transform, a = e.symbol, c = e.title, u = e.maskId, d = e.titleId, l = e.extra, m = e.watchable, f = m === void 0 ? !1 : m, v = r.found ? r : n, g = v.width, y = v.height, h = s === "fak", w = h ? "" : "fa-w-".concat(Math.ceil(g / y * 16)), k = [dt.replacementClass, o ? "".concat(dt.familyPrefix, "-").concat(o) : "", w].filter(function(R) {
    return l.classes.indexOf(R) === -1;
  }).filter(function(R) {
    return R !== "" || !!R;
  }).concat(l.classes).join(" "), C = {
    children: [],
    attributes: xe({}, l.attributes, {
      "data-prefix": s,
      "data-icon": o,
      class: k,
      role: l.attributes.role || "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 ".concat(g, " ").concat(y)
    })
  }, A = h && !~l.classes.indexOf("fa-fw") ? {
    width: "".concat(g / y * 16 * 0.0625, "em")
  } : {};
  f && (C.attributes[Nm] = ""), c && C.children.push({
    tag: "title",
    attributes: {
      id: C.attributes["aria-labelledby"] || "title-".concat(d || rs())
    },
    children: [c]
  });
  var E = xe({}, C, {
    prefix: s,
    iconName: o,
    main: n,
    mask: r,
    maskId: u,
    transform: i,
    symbol: a,
    styles: xe({}, A, l.styles)
  }), $ = r.found && n.found ? DVe(E) : NVe(E), M = $.children, O = $.attributes;
  return E.children = M, E.attributes = O, a ? FVe(E) : qVe(E);
}
function HVe(e) {
  var t = e.content, n = e.width, r = e.height, s = e.transform, o = e.title, i = e.extra, a = e.watchable, c = a === void 0 ? !1 : a, u = xe({}, i.attributes, o ? {
    title: o
  } : {}, {
    class: i.classes.join(" ")
  });
  c && (u[Nm] = "");
  var d = xe({}, i.styles);
  Hl(s) && (d.transform = BVe({
    transform: s,
    width: n,
    height: r
  }), d["-webkit-transform"] = d.transform);
  var l = jl(d);
  l.length > 0 && (u.style = l);
  var m = [];
  return m.push({
    tag: "span",
    attributes: u,
    children: [t]
  }), o && m.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [o]
  }), m;
}
dt.measurePerformance && Bo && Bo.mark && Bo.measure;
var Ca = function(t, n, r, s) {
  var o = Object.keys(t), i = o.length, a = n, c, u, d;
  for (r === void 0 ? (c = 1, d = t[o[0]]) : (c = 0, d = r); c < i; c++)
    u = o[c], d = a(d, t[u], u, t);
  return d;
};
function Km(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = n.skipHooks, s = r === void 0 ? !1 : r, o = Object.keys(t).reduce(function(i, a) {
    var c = t[a], u = !!c.icon;
    return u ? i[c.iconName] = c.icon : i[a] = c, i;
  }, {});
  typeof ln.hooks.addPack == "function" && !s ? ln.hooks.addPack(e, o) : ln.styles[e] = xe({}, ln.styles[e] || {}, o), e === "fas" && Km("fa", t);
}
var E0 = ln.styles, VVe = ln.shims, Xm = function() {
  var t = function(s) {
    return Ca(E0, function(o, i, a) {
      return o[a] = Ca(i, s, {}), o;
    }, {});
  };
  t(function(r, s, o) {
    return s[3] && (r[s[3]] = o), r;
  }), t(function(r, s, o) {
    var i = s[2];
    return r[o] = o, i.forEach(function(a) {
      r[a] = o;
    }), r;
  });
  var n = "far" in E0;
  Ca(VVe, function(r, s) {
    var o = s[0], i = s[1], a = s[2];
    return i === "far" && !n && (i = "fas"), r[o] = {
      prefix: i,
      iconName: a
    }, r;
  }, {});
};
Xm();
ln.styles;
function A0(e, t, n) {
  if (e && e[t] && e[t][n])
    return {
      prefix: t,
      iconName: n,
      icon: e[t][n]
    };
}
function Ym(e) {
  var t = e.tag, n = e.attributes, r = n === void 0 ? {} : n, s = e.children, o = s === void 0 ? [] : s;
  return typeof e == "string" ? Wm(e) : "<".concat(t, " ").concat(PVe(r), ">").concat(o.map(Ym).join(""), "</").concat(t, ">");
}
var UVe = function(t) {
  var n = {
    size: 16,
    x: 0,
    y: 0,
    flipX: !1,
    flipY: !1,
    rotate: 0
  };
  return t ? t.toLowerCase().split(" ").reduce(function(r, s) {
    var o = s.toLowerCase().split("-"), i = o[0], a = o.slice(1).join("-");
    if (i && a === "h")
      return r.flipX = !0, r;
    if (i && a === "v")
      return r.flipY = !0, r;
    if (a = parseFloat(a), isNaN(a))
      return r;
    switch (i) {
      case "grow":
        r.size = r.size + a;
        break;
      case "shrink":
        r.size = r.size - a;
        break;
      case "left":
        r.x = r.x - a;
        break;
      case "right":
        r.x = r.x + a;
        break;
      case "up":
        r.y = r.y - a;
        break;
      case "down":
        r.y = r.y + a;
        break;
      case "rotate":
        r.rotate = r.rotate + a;
        break;
    }
    return r;
  }, n) : n;
};
function Gc(e) {
  this.name = "MissingIcon", this.message = e || "Icon unavailable", this.stack = new Error().stack;
}
Gc.prototype = Object.create(Error.prototype);
Gc.prototype.constructor = Gc;
var As = {
  fill: "currentColor"
}, Jm = {
  attributeType: "XML",
  repeatCount: "indefinite",
  dur: "2s"
};
xe({}, As, {
  d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
});
var Vl = xe({}, Jm, {
  attributeName: "opacity"
});
xe({}, As, {
  cx: "256",
  cy: "364",
  r: "28"
}), xe({}, Jm, {
  attributeName: "r",
  values: "28;14;28;28;14;28;"
}), xe({}, Vl, {
  values: "1;0;1;1;0;1;"
});
xe({}, As, {
  opacity: "1",
  d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
}), xe({}, Vl, {
  values: "1;0;0;0;0;1;"
});
xe({}, As, {
  opacity: "0",
  d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
}), xe({}, Vl, {
  values: "0;0;1;1;0;0;"
});
ln.styles;
function $0(e) {
  var t = e[0], n = e[1], r = e.slice(4), s = Rm(r, 1), o = s[0], i = null;
  return Array.isArray(o) ? i = {
    tag: "g",
    attributes: {
      class: "".concat(dt.familyPrefix, "-").concat(wa.GROUP)
    },
    children: [{
      tag: "path",
      attributes: {
        class: "".concat(dt.familyPrefix, "-").concat(wa.SECONDARY),
        fill: "currentColor",
        d: o[0]
      }
    }, {
      tag: "path",
      attributes: {
        class: "".concat(dt.familyPrefix, "-").concat(wa.PRIMARY),
        fill: "currentColor",
        d: o[1]
      }
    }]
  } : i = {
    tag: "path",
    attributes: {
      fill: "currentColor",
      d: o
    }
  }, {
    found: !0,
    width: t,
    height: n,
    icon: i
  };
}
ln.styles;
var ZVe = `svg:not(:root).svg-inline--fa {
  overflow: visible;
}

.svg-inline--fa {
  display: inline-block;
  font-size: inherit;
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.225em;
}
.svg-inline--fa.fa-w-1 {
  width: 0.0625em;
}
.svg-inline--fa.fa-w-2 {
  width: 0.125em;
}
.svg-inline--fa.fa-w-3 {
  width: 0.1875em;
}
.svg-inline--fa.fa-w-4 {
  width: 0.25em;
}
.svg-inline--fa.fa-w-5 {
  width: 0.3125em;
}
.svg-inline--fa.fa-w-6 {
  width: 0.375em;
}
.svg-inline--fa.fa-w-7 {
  width: 0.4375em;
}
.svg-inline--fa.fa-w-8 {
  width: 0.5em;
}
.svg-inline--fa.fa-w-9 {
  width: 0.5625em;
}
.svg-inline--fa.fa-w-10 {
  width: 0.625em;
}
.svg-inline--fa.fa-w-11 {
  width: 0.6875em;
}
.svg-inline--fa.fa-w-12 {
  width: 0.75em;
}
.svg-inline--fa.fa-w-13 {
  width: 0.8125em;
}
.svg-inline--fa.fa-w-14 {
  width: 0.875em;
}
.svg-inline--fa.fa-w-15 {
  width: 0.9375em;
}
.svg-inline--fa.fa-w-16 {
  width: 1em;
}
.svg-inline--fa.fa-w-17 {
  width: 1.0625em;
}
.svg-inline--fa.fa-w-18 {
  width: 1.125em;
}
.svg-inline--fa.fa-w-19 {
  width: 1.1875em;
}
.svg-inline--fa.fa-w-20 {
  width: 1.25em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: 0.3em;
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: 0.3em;
  width: auto;
}
.svg-inline--fa.fa-border {
  height: 1.5em;
}
.svg-inline--fa.fa-li {
  width: 2em;
}
.svg-inline--fa.fa-fw {
  width: 1.25em;
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: #ff253a;
  border-radius: 1em;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  color: #fff;
  height: 1.5em;
  line-height: 1;
  max-width: 5em;
  min-width: 1.5em;
  overflow: hidden;
  padding: 0.25em;
  right: 0;
  text-overflow: ellipsis;
  top: 0;
  -webkit-transform: scale(0.25);
          transform: scale(0.25);
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: 0;
  right: 0;
  top: auto;
  -webkit-transform: scale(0.25);
          transform: scale(0.25);
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: 0;
  left: 0;
  right: auto;
  top: auto;
  -webkit-transform: scale(0.25);
          transform: scale(0.25);
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  right: 0;
  top: 0;
  -webkit-transform: scale(0.25);
          transform: scale(0.25);
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: 0;
  right: auto;
  top: 0;
  -webkit-transform: scale(0.25);
          transform: scale(0.25);
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-lg {
  font-size: 1.3333333333em;
  line-height: 0.75em;
  vertical-align: -0.0667em;
}

.fa-xs {
  font-size: 0.75em;
}

.fa-sm {
  font-size: 0.875em;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: 2.5em;
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: -2em;
  position: absolute;
  text-align: center;
  width: 2em;
  line-height: inherit;
}

.fa-border {
  border: solid 0.08em #eee;
  border-radius: 0.1em;
  padding: 0.2em 0.25em 0.15em;
}

.fa-pull-left {
  float: left;
}

.fa-pull-right {
  float: right;
}

.fa.fa-pull-left,
.fas.fa-pull-left,
.far.fa-pull-left,
.fal.fa-pull-left,
.fab.fa-pull-left {
  margin-right: 0.3em;
}
.fa.fa-pull-right,
.fas.fa-pull-right,
.far.fa-pull-right,
.fal.fa-pull-right,
.fab.fa-pull-right {
  margin-left: 0.3em;
}

.fa-spin {
  -webkit-animation: fa-spin 2s infinite linear;
          animation: fa-spin 2s infinite linear;
}

.fa-pulse {
  -webkit-animation: fa-spin 1s infinite steps(8);
          animation: fa-spin 1s infinite steps(8);
}

@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}

@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both, .fa-flip-horizontal.fa-flip-vertical {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

:root .fa-rotate-90,
:root .fa-rotate-180,
:root .fa-rotate-270,
:root .fa-flip-horizontal,
:root .fa-flip-vertical,
:root .fa-flip-both {
  -webkit-filter: none;
          filter: none;
}

.fa-stack {
  display: inline-block;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: #fff;
}

.sr-only {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.sr-only-focusable:active, .sr-only-focusable:focus {
  clip: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  position: static;
  width: auto;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: 1;
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: 0.4;
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: 0.4;
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: 1;
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse {
  color: #fff;
}`;
function WVe() {
  var e = zm, t = Dm, n = dt.familyPrefix, r = dt.replacementClass, s = ZVe;
  if (n !== e || r !== t) {
    var o = new RegExp("\\.".concat(e, "\\-"), "g"), i = new RegExp("\\--".concat(e, "\\-"), "g"), a = new RegExp("\\.".concat(t), "g");
    s = s.replace(o, ".".concat(n, "-")).replace(i, "--".concat(n, "-")).replace(a, ".".concat(r));
  }
  return s;
}
var GVe = /* @__PURE__ */ function() {
  function e() {
    iVe(this, e), this.definitions = {};
  }
  return cVe(e, [{
    key: "add",
    value: function() {
      for (var n = this, r = arguments.length, s = new Array(r), o = 0; o < r; o++)
        s[o] = arguments[o];
      var i = s.reduce(this._pullDefinitions, {});
      Object.keys(i).forEach(function(a) {
        n.definitions[a] = xe({}, n.definitions[a] || {}, i[a]), Km(a, i[a]), Xm();
      });
    }
  }, {
    key: "reset",
    value: function() {
      this.definitions = {};
    }
  }, {
    key: "_pullDefinitions",
    value: function(n, r) {
      var s = r.prefix && r.iconName && r.icon ? {
        0: r
      } : r;
      return Object.keys(s).map(function(o) {
        var i = s[o], a = i.prefix, c = i.iconName, u = i.icon;
        n[a] || (n[a] = {}), n[a][c] = u;
      }), n;
    }
  }]), e;
}();
function Qm() {
  dt.autoAddCss && !I0 && (OVe(WVe()), I0 = !0);
}
function ev(e, t) {
  return Object.defineProperty(e, "abstract", {
    get: t
  }), Object.defineProperty(e, "html", {
    get: function() {
      return e.abstract.map(function(r) {
        return Ym(r);
      });
    }
  }), Object.defineProperty(e, "node", {
    get: function() {
      if (Nl) {
        var r = ht.createElement("div");
        return r.innerHTML = e.html, r.children;
      }
    }
  }), e;
}
function M0(e) {
  var t = e.prefix, n = t === void 0 ? "fa" : t, r = e.iconName;
  if (r)
    return A0(XVe.definitions, n, r) || A0(ln.styles, n, r);
}
function KVe(e) {
  return function(t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = (t || {}).icon ? t : M0(t || {}), s = n.mask;
    return s && (s = (s || {}).icon ? s : M0(s || {})), e(r, xe({}, n, {
      mask: s
    }));
  };
}
var XVe = new GVe(), I0 = !1, os = {
  transform: function(t) {
    return UVe(t);
  }
}, YVe = KVe(function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.transform, r = n === void 0 ? Dn : n, s = t.symbol, o = s === void 0 ? !1 : s, i = t.mask, a = i === void 0 ? null : i, c = t.maskId, u = c === void 0 ? null : c, d = t.title, l = d === void 0 ? null : d, m = t.titleId, f = m === void 0 ? null : m, v = t.classes, g = v === void 0 ? [] : v, y = t.attributes, h = y === void 0 ? {} : y, w = t.styles, k = w === void 0 ? {} : w;
  if (e) {
    var C = e.prefix, A = e.iconName, E = e.icon;
    return ev(xe({
      type: "icon"
    }, e), function() {
      return Qm(), dt.autoA11y && (l ? h["aria-labelledby"] = "".concat(dt.replacementClass, "-title-").concat(f || rs()) : (h["aria-hidden"] = "true", h.focusable = "false")), jVe({
        icons: {
          main: $0(E),
          mask: a ? $0(a.icon) : {
            found: !1,
            width: null,
            height: null,
            icon: {}
          }
        },
        prefix: C,
        iconName: A,
        transform: xe({}, Dn, r),
        symbol: o,
        title: l,
        maskId: u,
        titleId: f,
        extra: {
          attributes: h,
          styles: k,
          classes: g
        }
      });
    });
  }
}), JVe = function(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = n.transform, s = r === void 0 ? Dn : r, o = n.title, i = o === void 0 ? null : o, a = n.classes, c = a === void 0 ? [] : a, u = n.attributes, d = u === void 0 ? {} : u, l = n.styles, m = l === void 0 ? {} : l;
  return ev({
    type: "text",
    content: t
  }, function() {
    return Qm(), HVe({
      content: t,
      transform: xe({}, Dn, s),
      title: i,
      extra: {
        attributes: d,
        styles: m,
        classes: ["".concat(dt.familyPrefix, "-layers-text")].concat(uVe(c))
      }
    });
  });
};
function T0(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Kt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? T0(Object(n), !0).forEach(function(r) {
      mt(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : T0(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function ss(e) {
  "@babel/helpers - typeof";
  return ss = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ss(e);
}
function mt(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function QVe(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), s, o;
  for (o = 0; o < r.length; o++)
    s = r[o], !(t.indexOf(s) >= 0) && (n[s] = e[s]);
  return n;
}
function eUe(e, t) {
  if (e == null) return {};
  var n = QVe(e, t), r, s;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (s = 0; s < o.length; s++)
      r = o[s], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Kc(e) {
  return tUe(e) || nUe(e) || rUe(e) || oUe();
}
function tUe(e) {
  if (Array.isArray(e)) return Xc(e);
}
function nUe(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function rUe(e, t) {
  if (e) {
    if (typeof e == "string") return Xc(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Xc(e, t);
  }
}
function Xc(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function oUe() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var sUe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, tv = { exports: {} };
(function(e) {
  (function(t) {
    var n = function(h, w, k) {
      if (!u(w) || l(w) || m(w) || f(w) || c(w))
        return w;
      var C, A = 0, E = 0;
      if (d(w))
        for (C = [], E = w.length; A < E; A++)
          C.push(n(h, w[A], k));
      else {
        C = {};
        for (var $ in w)
          Object.prototype.hasOwnProperty.call(w, $) && (C[h($, k)] = n(h, w[$], k));
      }
      return C;
    }, r = function(h, w) {
      w = w || {};
      var k = w.separator || "_", C = w.split || /(?=[A-Z])/;
      return h.split(C).join(k);
    }, s = function(h) {
      return v(h) ? h : (h = h.replace(/[\-_\s]+(.)?/g, function(w, k) {
        return k ? k.toUpperCase() : "";
      }), h.substr(0, 1).toLowerCase() + h.substr(1));
    }, o = function(h) {
      var w = s(h);
      return w.substr(0, 1).toUpperCase() + w.substr(1);
    }, i = function(h, w) {
      return r(h, w).toLowerCase();
    }, a = Object.prototype.toString, c = function(h) {
      return typeof h == "function";
    }, u = function(h) {
      return h === Object(h);
    }, d = function(h) {
      return a.call(h) == "[object Array]";
    }, l = function(h) {
      return a.call(h) == "[object Date]";
    }, m = function(h) {
      return a.call(h) == "[object RegExp]";
    }, f = function(h) {
      return a.call(h) == "[object Boolean]";
    }, v = function(h) {
      return h = h - 0, h === h;
    }, g = function(h, w) {
      var k = w && "process" in w ? w.process : w;
      return typeof k != "function" ? h : function(C, A) {
        return k(C, h, A);
      };
    }, y = {
      camelize: s,
      decamelize: i,
      pascalize: o,
      depascalize: i,
      camelizeKeys: function(h, w) {
        return n(g(s, w), h);
      },
      decamelizeKeys: function(h, w) {
        return n(g(i, w), h, w);
      },
      pascalizeKeys: function(h, w) {
        return n(g(o, w), h);
      },
      depascalizeKeys: function() {
        return this.decamelizeKeys.apply(this, arguments);
      }
    };
    e.exports ? e.exports = y : t.humps = y;
  })(sUe);
})(tv);
var iUe = tv.exports, aUe = ["class", "style"];
function cUe(e) {
  return e.split(";").map(function(t) {
    return t.trim();
  }).filter(function(t) {
    return t;
  }).reduce(function(t, n) {
    var r = n.indexOf(":"), s = iUe.camelize(n.slice(0, r)), o = n.slice(r + 1).trim();
    return t[s] = o, t;
  }, {});
}
function lUe(e) {
  return e.split(/\s+/).reduce(function(t, n) {
    return t[n] = !0, t;
  }, {});
}
function Ul(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (typeof e == "string")
    return e;
  var r = (e.children || []).map(function(c) {
    return Ul(c);
  }), s = Object.keys(e.attributes || {}).reduce(function(c, u) {
    var d = e.attributes[u];
    switch (u) {
      case "class":
        c.class = lUe(d);
        break;
      case "style":
        c.style = cUe(d);
        break;
      default:
        c.attrs[u] = d;
    }
    return c;
  }, {
    attrs: {},
    class: {},
    style: {}
  });
  n.class;
  var o = n.style, i = o === void 0 ? {} : o, a = eUe(n, aUe);
  return Lt(e.tag, Kt(Kt(Kt({}, t), {}, {
    class: s.class,
    style: Kt(Kt({}, s.style), i)
  }, s.attrs), a), r);
}
var nv = !1;
try {
  nv = !0;
} catch {
}
function uUe() {
  if (!nv && console && typeof console.error == "function") {
    var e;
    (e = console).error.apply(e, arguments);
  }
}
function Kr(e, t) {
  return Array.isArray(t) && t.length > 0 || !Array.isArray(t) && t ? mt({}, e, t) : {};
}
function dUe(e) {
  var t, n = (t = {
    "fa-spin": e.spin,
    "fa-pulse": e.pulse,
    "fa-fw": e.fixedWidth,
    "fa-border": e.border,
    "fa-li": e.listItem,
    "fa-inverse": e.inverse,
    "fa-flip": e.flip === !0,
    "fa-flip-horizontal": e.flip === "horizontal" || e.flip === "both",
    "fa-flip-vertical": e.flip === "vertical" || e.flip === "both"
  }, mt(t, "fa-".concat(e.size), e.size !== null), mt(t, "fa-rotate-".concat(e.rotation), e.rotation !== null), mt(t, "fa-pull-".concat(e.pull), e.pull !== null), mt(t, "fa-swap-opacity", e.swapOpacity), mt(t, "fa-bounce", e.bounce), mt(t, "fa-shake", e.shake), mt(t, "fa-beat", e.beat), mt(t, "fa-fade", e.fade), mt(t, "fa-beat-fade", e.beatFade), mt(t, "fa-flash", e.flash), mt(t, "fa-spin-pulse", e.spinPulse), mt(t, "fa-spin-reverse", e.spinReverse), t);
  return Object.keys(n).map(function(r) {
    return n[r] ? r : null;
  }).filter(function(r) {
    return r;
  });
}
function L0(e) {
  if (e && ss(e) === "object" && e.prefix && e.iconName && e.icon)
    return e;
  if (os.icon)
    return os.icon(e);
  if (e === null)
    return null;
  if (ss(e) === "object" && e.prefix && e.iconName)
    return e;
  if (Array.isArray(e) && e.length === 2)
    return {
      prefix: e[0],
      iconName: e[1]
    };
  if (typeof e == "string")
    return {
      prefix: "fas",
      iconName: e
    };
}
H({
  name: "FontAwesomeIcon",
  props: {
    border: {
      type: Boolean,
      default: !1
    },
    fixedWidth: {
      type: Boolean,
      default: !1
    },
    flip: {
      type: [Boolean, String],
      default: !1,
      validator: function(t) {
        return [!0, !1, "horizontal", "vertical", "both"].indexOf(t) > -1;
      }
    },
    icon: {
      type: [Object, Array, String],
      required: !0
    },
    mask: {
      type: [Object, Array, String],
      default: null
    },
    listItem: {
      type: Boolean,
      default: !1
    },
    pull: {
      type: String,
      default: null,
      validator: function(t) {
        return ["right", "left"].indexOf(t) > -1;
      }
    },
    pulse: {
      type: Boolean,
      default: !1
    },
    rotation: {
      type: [String, Number],
      default: null,
      validator: function(t) {
        return [90, 180, 270].indexOf(Number.parseInt(t, 10)) > -1;
      }
    },
    swapOpacity: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: null,
      validator: function(t) {
        return ["2xs", "xs", "sm", "lg", "xl", "2xl", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x"].indexOf(t) > -1;
      }
    },
    spin: {
      type: Boolean,
      default: !1
    },
    transform: {
      type: [String, Object],
      default: null
    },
    symbol: {
      type: [Boolean, String],
      default: !1
    },
    title: {
      type: String,
      default: null
    },
    inverse: {
      type: Boolean,
      default: !1
    },
    bounce: {
      type: Boolean,
      default: !1
    },
    shake: {
      type: Boolean,
      default: !1
    },
    beat: {
      type: Boolean,
      default: !1
    },
    fade: {
      type: Boolean,
      default: !1
    },
    beatFade: {
      type: Boolean,
      default: !1
    },
    flash: {
      type: Boolean,
      default: !1
    },
    spinPulse: {
      type: Boolean,
      default: !1
    },
    spinReverse: {
      type: Boolean,
      default: !1
    }
  },
  setup: function(t, n) {
    var r = n.attrs, s = I(function() {
      return L0(t.icon);
    }), o = I(function() {
      return Kr("classes", dUe(t));
    }), i = I(function() {
      return Kr("transform", typeof t.transform == "string" ? os.transform(t.transform) : t.transform);
    }), a = I(function() {
      return Kr("mask", L0(t.mask));
    }), c = I(function() {
      return YVe(s.value, Kt(Kt(Kt(Kt({}, o.value), i.value), a.value), {}, {
        symbol: t.symbol,
        title: t.title
      }));
    });
    ae(c, function(d) {
      if (!d)
        return uUe("Could not find one or more icon(s)", s.value, a.value);
    }, {
      immediate: !0
    });
    var u = I(function() {
      return c.value ? Ul(c.value.abstract[0], {}, r) : null;
    });
    return function() {
      return u.value;
    };
  }
});
H({
  name: "FontAwesomeLayers",
  props: {
    fixedWidth: {
      type: Boolean,
      default: !1
    }
  },
  setup: function(t, n) {
    var r = n.slots, s = dt.familyPrefix, o = I(function() {
      return ["".concat(s, "-layers")].concat(Kc(t.fixedWidth ? ["".concat(s, "-fw")] : []));
    });
    return function() {
      return Lt("div", {
        class: o.value
      }, r.default ? r.default() : []);
    };
  }
});
H({
  name: "FontAwesomeLayersText",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    transform: {
      type: [String, Object],
      default: null
    },
    counter: {
      type: Boolean,
      default: !1
    },
    position: {
      type: String,
      default: null,
      validator: function(t) {
        return ["bottom-left", "bottom-right", "top-left", "top-right"].indexOf(t) > -1;
      }
    }
  },
  setup: function(t, n) {
    var r = n.attrs, s = dt.familyPrefix, o = I(function() {
      return Kr("classes", [].concat(Kc(t.counter ? ["".concat(s, "-layers-counter")] : []), Kc(t.position ? ["".concat(s, "-layers-").concat(t.position)] : [])));
    }), i = I(function() {
      return Kr("transform", typeof t.transform == "string" ? os.transform(t.transform) : t.transform);
    }), a = I(function() {
      var u = JVe(t.value.toString(), Kt(Kt({}, i.value), o.value)), d = u.abstract;
      return t.counter && (d[0].attributes.class = d[0].attributes.class.replace("fa-layers-text", "")), d[0];
    }), c = I(function() {
      return Ul(a.value, {}, r);
    });
    return function() {
      return c.value;
    };
  }
});
({
  ...s2
});
const fUe = ["data-dir"], pUe = /* @__PURE__ */ H({
  __name: "ResizeWrapper",
  props: {
    isResizingEnabled: { type: Boolean, default: !0 },
    height: { default: 0 },
    width: { default: 0 },
    minHeight: { default: 0 },
    minWidth: { default: 0 },
    scale: { default: 1 },
    gridSize: { default: 20 },
    supportedDirections: { default: () => [] },
    outset: { type: Boolean, default: !1 },
    window: { default: void 0 }
  },
  emits: ["resizestart", "resize", "resizeend"],
  setup(e, { emit: t }) {
    function n(f, v) {
      const g = f / v, y = v * g, h = f * v > 0 ? v * (g + 1) : v * (g - 1);
      return Math.abs(f - y) < Math.abs(f - h) ? y : h;
    }
    function r(f, v, g) {
      const y = n(v, g);
      return y >= f && v > 0 ? y : f;
    }
    const s = e, o = cs(), i = t, a = I(() => {
      const f = Object.keys(w0);
      return s.isResizingEnabled ? s.supportedDirections.length === 0 ? f : s.supportedDirections : [];
    }), c = {
      dir: D(""),
      dHeight: D(0),
      dWidth: D(0),
      vHeight: D(0),
      vWidth: D(0),
      x: D(0),
      y: D(0)
    }, u = I(() => ({
      [o.resize]: !0,
      [o.outset]: s.outset
    })), d = (f) => {
      f.preventDefault(), f.stopPropagation();
      let v = 0, g = 0, y = !1, h = !1;
      c.dir.value.includes("right") && (v = f.pageX - c.x.value), c.dir.value.includes("left") && (v = c.x.value - f.pageX, h = !0), c.dir.value.includes("top") && (g = c.y.value - f.pageY, y = !0), c.dir.value.includes("bottom") && (g = f.pageY - c.y.value);
      const w = (v - c.dWidth.value) / s.scale, k = (g - c.dHeight.value) / s.scale;
      c.vHeight.value = c.vHeight.value + k, c.vWidth.value = c.vWidth.value + w;
      const C = r(s.minHeight, c.vHeight.value, s.gridSize), A = r(s.minWidth, c.vWidth.value, s.gridSize), E = h && A !== s.width ? -1 * (A - s.width) : 0, $ = y && C !== s.height ? -1 * (C - s.height) : 0, M = f.x, O = f.y, R = c.dir.value;
      i("resize", { height: C, width: A, dX: E, dY: $, x: M, y: O, direction: R }), c.dHeight.value = g, c.dWidth.value = v;
    }, l = (f) => {
      f.preventDefault(), f.stopPropagation(), i("resizeend"), (s.window ?? window).removeEventListener("mousemove", d), (s.window ?? window).removeEventListener("mouseup", l), document.body.style.cursor = "unset", c.dir.value = "";
    }, m = (f) => {
      f.preventDefault(), f.stopPropagation();
      const v = f.target;
      v && (c.dir.value = v.dataset.dir.toLocaleLowerCase()), document.body.style.cursor = w0[c.dir.value], c.x.value = f.pageX, c.y.value = f.pageY, c.dWidth.value = 0, c.dHeight.value = 0, c.vHeight.value = s.height, c.vWidth.value = s.width, (s.window ?? window).addEventListener("mousemove", d), (s.window ?? window).addEventListener("mouseup", l), i("resizestart");
    };
    return (f, v) => (b(), x("div", {
      class: j(u.value)
    }, [
      (b(!0), x(Pe, null, Je(a.value, (g) => (b(), x("div", {
        key: g,
        "data-dir": g,
        class: j({ [_(o).resizer]: !0, [_(o)[g]]: !0 }),
        "data-test-id": "resize-handle",
        onMousedown: m
      }, null, 42, fUe))), 128)),
      ne(f.$slots, "default")
    ], 2));
  }
}), hUe = "_resize_r3sn9_1", gUe = "_resizer_r3sn9_11", mUe = "_right_r3sn9_16", vUe = "_top_r3sn9_24", _Ue = "_bottom_r3sn9_32", bUe = "_left_r3sn9_40", yUe = "_topLeft_r3sn9_48", wUe = "_topRight_r3sn9_56", kUe = "_bottomLeft_r3sn9_64", CUe = "_bottomRight_r3sn9_72", xUe = "_outset_r3sn9_80", SUe = {
  resize: hUe,
  resizer: gUe,
  right: mUe,
  top: vUe,
  bottom: _Ue,
  left: bUe,
  topLeft: yUe,
  topRight: wUe,
  bottomLeft: kUe,
  bottomRight: CUe,
  outset: xUe
}, EUe = {
  $style: SUe
}, AUe = /* @__PURE__ */ qt(pUe, [["__cssModules", EUe]]), rv = {
  height: 180,
  width: 240,
  minHeight: 80,
  minWidth: 150,
  id: "0",
  editMode: !1,
  readOnly: !1,
  backgroundColor: 1
}, $Ue = /* @__PURE__ */ H({
  __name: "Sticky",
  props: /* @__PURE__ */ qp({
    modelValue: {},
    height: {},
    width: {},
    minHeight: {},
    minWidth: {},
    id: {},
    defaultText: {},
    editMode: { type: Boolean },
    readOnly: { type: Boolean },
    backgroundColor: {}
  }, rv),
  emits: ["edit", "update:modelValue", "markdown-click"],
  setup(e, { emit: t }) {
    const n = e, r = t, { t: s } = QL(), o = D(!1), i = D(void 0), a = I(() => n.height < n.minHeight ? n.minHeight : n.height), c = I(() => n.width < n.minWidth ? n.minWidth : n.width), u = I(() => n.id ? `${n.id}-input` : void 0), d = I(() => ({
      height: `${a.value}px`,
      width: `${c.value}px`
    })), l = I(() => a.value > 100 && c.value > 155);
    ae(
      () => n.editMode,
      (h, w) => {
        setTimeout(() => {
          h && !w && i.value && (n.defaultText === n.modelValue && i.value.select(), i.value.focus());
        }, 100);
      }
    );
    const m = () => {
      n.readOnly || r("edit", !0);
    }, f = () => {
      o.value || r("edit", !1);
    }, v = (h) => {
      r("update:modelValue", h);
    }, g = (h, w) => {
      r("markdown-click", h, w);
    }, y = (h) => {
      !h.ctrlKey && !h.metaKey && h.stopPropagation();
    };
    return (h, w) => {
      const k = Qc("n8n-html");
      return b(), x("div", {
        class: j({
          "n8n-sticky": !0,
          [h.$style.sticky]: !0,
          [h.$style.clickable]: !o.value,
          [h.$style[`color-${h.backgroundColor}`]]: !0
        }),
        style: qe(d.value),
        onKeydown: w[4] || (w[4] = Ke(() => {
        }, ["prevent"]))
      }, [
        Ye(p("div", {
          class: j(h.$style.wrapper),
          onDblclick: Ke(m, ["stop"])
        }, [
          ue(_(sVe), {
            theme: "sticky",
            content: h.modelValue,
            "with-multi-breaks": !0,
            onMarkdownClick: g,
            onUpdateContent: v
          }, null, 8, ["content"])
        ], 34), [
          [Jt, !h.editMode]
        ]),
        Ye(p("div", {
          class: j({ "full-height": !l.value, "sticky-textarea": !0 }),
          onClick: w[0] || (w[0] = Ke(() => {
          }, ["stop"])),
          onMousedown: w[1] || (w[1] = Ke(() => {
          }, ["stop"])),
          onMouseup: w[2] || (w[2] = Ke(() => {
          }, ["stop"])),
          onKeydown: [
            at(f, ["esc"]),
            w[3] || (w[3] = Ke(() => {
            }, ["stop"]))
          ]
        }, [
          ue(_(fm), {
            ref_key: "input",
            ref: i,
            "model-value": h.modelValue,
            name: u.value,
            type: "textarea",
            rows: 5,
            onBlur: f,
            "onUpdate:modelValue": v,
            onWheel: y
          }, null, 8, ["model-value", "name"])
        ], 34), [
          [Jt, h.editMode]
        ]),
        h.editMode && l.value ? (b(), x("div", {
          key: 0,
          class: j(h.$style.footer)
        }, [
          ue(_(lm), {
            size: "xsmall",
            align: "right"
          }, {
            default: Y(() => [
              Ye(p("span", null, null, 512), [
                [k, _(s)("sticky.markdownHint")]
              ])
            ]),
            _: 1
          })
        ], 2)) : Q("", !0)
      ], 38);
    };
  }
}), MUe = "_sticky_1iqd8_1", IUe = "_wrapper_1iqd8_7", TUe = "_clickable_1iqd8_12", LUe = "_footer_1iqd8_33", OUe = {
  sticky: MUe,
  wrapper: IUe,
  clickable: TUe,
  footer: LUe,
  "color-2": "_color-2_1iqd8_39",
  "color-3": "_color-3_1iqd8_44",
  "color-4": "_color-4_1iqd8_49",
  "color-5": "_color-5_1iqd8_54",
  "color-6": "_color-6_1iqd8_59",
  "color-7": "_color-7_1iqd8_64"
}, RUe = {
  $style: OUe
}, PUe = /* @__PURE__ */ qt($Ue, [["__cssModules", RUe]]);
({
  ...rv
});
var xa, O0;
function Zl() {
  if (O0) return xa;
  O0 = 1;
  var e = Array.isArray;
  return xa = e, xa;
}
var Sa, R0;
function BUe() {
  if (R0) return Sa;
  R0 = 1;
  var e = typeof ko == "object" && ko && ko.Object === Object && ko;
  return Sa = e, Sa;
}
var Ea, P0;
function Wl() {
  if (P0) return Ea;
  P0 = 1;
  var e = BUe(), t = typeof self == "object" && self && self.Object === Object && self, n = e || t || Function("return this")();
  return Ea = n, Ea;
}
var Aa, B0;
function Gl() {
  if (B0) return Aa;
  B0 = 1;
  var e = Wl(), t = e.Symbol;
  return Aa = t, Aa;
}
var $a, z0;
function zUe() {
  if (z0) return $a;
  z0 = 1;
  var e = Gl(), t = Object.prototype, n = t.hasOwnProperty, r = t.toString, s = e ? e.toStringTag : void 0;
  function o(i) {
    var a = n.call(i, s), c = i[s];
    try {
      i[s] = void 0;
      var u = !0;
    } catch {
    }
    var d = r.call(i);
    return u && (a ? i[s] = c : delete i[s]), d;
  }
  return $a = o, $a;
}
var Ma, D0;
function DUe() {
  if (D0) return Ma;
  D0 = 1;
  var e = Object.prototype, t = e.toString;
  function n(r) {
    return t.call(r);
  }
  return Ma = n, Ma;
}
var Ia, N0;
function ov() {
  if (N0) return Ia;
  N0 = 1;
  var e = Gl(), t = zUe(), n = DUe(), r = "[object Null]", s = "[object Undefined]", o = e ? e.toStringTag : void 0;
  function i(a) {
    return a == null ? a === void 0 ? s : r : o && o in Object(a) ? t(a) : n(a);
  }
  return Ia = i, Ia;
}
var Ta, q0;
function NUe() {
  if (q0) return Ta;
  q0 = 1;
  function e(t) {
    return t != null && typeof t == "object";
  }
  return Ta = e, Ta;
}
var La, F0;
function Kl() {
  if (F0) return La;
  F0 = 1;
  var e = ov(), t = NUe(), n = "[object Symbol]";
  function r(s) {
    return typeof s == "symbol" || t(s) && e(s) == n;
  }
  return La = r, La;
}
var Oa, j0;
function qUe() {
  if (j0) return Oa;
  j0 = 1;
  var e = Zl(), t = Kl(), n = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, r = /^\w*$/;
  function s(o, i) {
    if (e(o))
      return !1;
    var a = typeof o;
    return a == "number" || a == "symbol" || a == "boolean" || o == null || t(o) ? !0 : r.test(o) || !n.test(o) || i != null && o in Object(i);
  }
  return Oa = s, Oa;
}
var Ra, H0;
function sv() {
  if (H0) return Ra;
  H0 = 1;
  function e(t) {
    var n = typeof t;
    return t != null && (n == "object" || n == "function");
  }
  return Ra = e, Ra;
}
var Pa, V0;
function FUe() {
  if (V0) return Pa;
  V0 = 1;
  var e = ov(), t = sv(), n = "[object AsyncFunction]", r = "[object Function]", s = "[object GeneratorFunction]", o = "[object Proxy]";
  function i(a) {
    if (!t(a))
      return !1;
    var c = e(a);
    return c == r || c == s || c == n || c == o;
  }
  return Pa = i, Pa;
}
var Ba, U0;
function jUe() {
  if (U0) return Ba;
  U0 = 1;
  var e = Wl(), t = e["__core-js_shared__"];
  return Ba = t, Ba;
}
var za, Z0;
function HUe() {
  if (Z0) return za;
  Z0 = 1;
  var e = jUe(), t = function() {
    var r = /[^.]+$/.exec(e && e.keys && e.keys.IE_PROTO || "");
    return r ? "Symbol(src)_1." + r : "";
  }();
  function n(r) {
    return !!t && t in r;
  }
  return za = n, za;
}
var Da, W0;
function VUe() {
  if (W0) return Da;
  W0 = 1;
  var e = Function.prototype, t = e.toString;
  function n(r) {
    if (r != null) {
      try {
        return t.call(r);
      } catch {
      }
      try {
        return r + "";
      } catch {
      }
    }
    return "";
  }
  return Da = n, Da;
}
var Na, G0;
function UUe() {
  if (G0) return Na;
  G0 = 1;
  var e = FUe(), t = HUe(), n = sv(), r = VUe(), s = /[\\^$.*+?()[\]{}|]/g, o = /^\[object .+?Constructor\]$/, i = Function.prototype, a = Object.prototype, c = i.toString, u = a.hasOwnProperty, d = RegExp(
    "^" + c.call(u).replace(s, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function l(m) {
    if (!n(m) || t(m))
      return !1;
    var f = e(m) ? d : o;
    return f.test(r(m));
  }
  return Na = l, Na;
}
var qa, K0;
function ZUe() {
  if (K0) return qa;
  K0 = 1;
  function e(t, n) {
    return t == null ? void 0 : t[n];
  }
  return qa = e, qa;
}
var Fa, X0;
function iv() {
  if (X0) return Fa;
  X0 = 1;
  var e = UUe(), t = ZUe();
  function n(r, s) {
    var o = t(r, s);
    return e(o) ? o : void 0;
  }
  return Fa = n, Fa;
}
var ja, Y0;
function $s() {
  if (Y0) return ja;
  Y0 = 1;
  var e = iv(), t = e(Object, "create");
  return ja = t, ja;
}
var Ha, J0;
function WUe() {
  if (J0) return Ha;
  J0 = 1;
  var e = $s();
  function t() {
    this.__data__ = e ? e(null) : {}, this.size = 0;
  }
  return Ha = t, Ha;
}
var Va, Q0;
function GUe() {
  if (Q0) return Va;
  Q0 = 1;
  function e(t) {
    var n = this.has(t) && delete this.__data__[t];
    return this.size -= n ? 1 : 0, n;
  }
  return Va = e, Va;
}
var Ua, ep;
function KUe() {
  if (ep) return Ua;
  ep = 1;
  var e = $s(), t = "__lodash_hash_undefined__", n = Object.prototype, r = n.hasOwnProperty;
  function s(o) {
    var i = this.__data__;
    if (e) {
      var a = i[o];
      return a === t ? void 0 : a;
    }
    return r.call(i, o) ? i[o] : void 0;
  }
  return Ua = s, Ua;
}
var Za, tp;
function XUe() {
  if (tp) return Za;
  tp = 1;
  var e = $s(), t = Object.prototype, n = t.hasOwnProperty;
  function r(s) {
    var o = this.__data__;
    return e ? o[s] !== void 0 : n.call(o, s);
  }
  return Za = r, Za;
}
var Wa, np;
function YUe() {
  if (np) return Wa;
  np = 1;
  var e = $s(), t = "__lodash_hash_undefined__";
  function n(r, s) {
    var o = this.__data__;
    return this.size += this.has(r) ? 0 : 1, o[r] = e && s === void 0 ? t : s, this;
  }
  return Wa = n, Wa;
}
var Ga, rp;
function JUe() {
  if (rp) return Ga;
  rp = 1;
  var e = WUe(), t = GUe(), n = KUe(), r = XUe(), s = YUe();
  function o(i) {
    var a = -1, c = i == null ? 0 : i.length;
    for (this.clear(); ++a < c; ) {
      var u = i[a];
      this.set(u[0], u[1]);
    }
  }
  return o.prototype.clear = e, o.prototype.delete = t, o.prototype.get = n, o.prototype.has = r, o.prototype.set = s, Ga = o, Ga;
}
var Ka, op;
function QUe() {
  if (op) return Ka;
  op = 1;
  function e() {
    this.__data__ = [], this.size = 0;
  }
  return Ka = e, Ka;
}
var Xa, sp;
function eZe() {
  if (sp) return Xa;
  sp = 1;
  function e(t, n) {
    return t === n || t !== t && n !== n;
  }
  return Xa = e, Xa;
}
var Ya, ip;
function Ms() {
  if (ip) return Ya;
  ip = 1;
  var e = eZe();
  function t(n, r) {
    for (var s = n.length; s--; )
      if (e(n[s][0], r))
        return s;
    return -1;
  }
  return Ya = t, Ya;
}
var Ja, ap;
function tZe() {
  if (ap) return Ja;
  ap = 1;
  var e = Ms(), t = Array.prototype, n = t.splice;
  function r(s) {
    var o = this.__data__, i = e(o, s);
    if (i < 0)
      return !1;
    var a = o.length - 1;
    return i == a ? o.pop() : n.call(o, i, 1), --this.size, !0;
  }
  return Ja = r, Ja;
}
var Qa, cp;
function nZe() {
  if (cp) return Qa;
  cp = 1;
  var e = Ms();
  function t(n) {
    var r = this.__data__, s = e(r, n);
    return s < 0 ? void 0 : r[s][1];
  }
  return Qa = t, Qa;
}
var ec, lp;
function rZe() {
  if (lp) return ec;
  lp = 1;
  var e = Ms();
  function t(n) {
    return e(this.__data__, n) > -1;
  }
  return ec = t, ec;
}
var tc, up;
function oZe() {
  if (up) return tc;
  up = 1;
  var e = Ms();
  function t(n, r) {
    var s = this.__data__, o = e(s, n);
    return o < 0 ? (++this.size, s.push([n, r])) : s[o][1] = r, this;
  }
  return tc = t, tc;
}
var nc, dp;
function sZe() {
  if (dp) return nc;
  dp = 1;
  var e = QUe(), t = tZe(), n = nZe(), r = rZe(), s = oZe();
  function o(i) {
    var a = -1, c = i == null ? 0 : i.length;
    for (this.clear(); ++a < c; ) {
      var u = i[a];
      this.set(u[0], u[1]);
    }
  }
  return o.prototype.clear = e, o.prototype.delete = t, o.prototype.get = n, o.prototype.has = r, o.prototype.set = s, nc = o, nc;
}
var rc, fp;
function iZe() {
  if (fp) return rc;
  fp = 1;
  var e = iv(), t = Wl(), n = e(t, "Map");
  return rc = n, rc;
}
var oc, pp;
function aZe() {
  if (pp) return oc;
  pp = 1;
  var e = JUe(), t = sZe(), n = iZe();
  function r() {
    this.size = 0, this.__data__ = {
      hash: new e(),
      map: new (n || t)(),
      string: new e()
    };
  }
  return oc = r, oc;
}
var sc, hp;
function cZe() {
  if (hp) return sc;
  hp = 1;
  function e(t) {
    var n = typeof t;
    return n == "string" || n == "number" || n == "symbol" || n == "boolean" ? t !== "__proto__" : t === null;
  }
  return sc = e, sc;
}
var ic, gp;
function Is() {
  if (gp) return ic;
  gp = 1;
  var e = cZe();
  function t(n, r) {
    var s = n.__data__;
    return e(r) ? s[typeof r == "string" ? "string" : "hash"] : s.map;
  }
  return ic = t, ic;
}
var ac, mp;
function lZe() {
  if (mp) return ac;
  mp = 1;
  var e = Is();
  function t(n) {
    var r = e(this, n).delete(n);
    return this.size -= r ? 1 : 0, r;
  }
  return ac = t, ac;
}
var cc, vp;
function uZe() {
  if (vp) return cc;
  vp = 1;
  var e = Is();
  function t(n) {
    return e(this, n).get(n);
  }
  return cc = t, cc;
}
var lc, _p;
function dZe() {
  if (_p) return lc;
  _p = 1;
  var e = Is();
  function t(n) {
    return e(this, n).has(n);
  }
  return lc = t, lc;
}
var uc, bp;
function fZe() {
  if (bp) return uc;
  bp = 1;
  var e = Is();
  function t(n, r) {
    var s = e(this, n), o = s.size;
    return s.set(n, r), this.size += s.size == o ? 0 : 1, this;
  }
  return uc = t, uc;
}
var dc, yp;
function pZe() {
  if (yp) return dc;
  yp = 1;
  var e = aZe(), t = lZe(), n = uZe(), r = dZe(), s = fZe();
  function o(i) {
    var a = -1, c = i == null ? 0 : i.length;
    for (this.clear(); ++a < c; ) {
      var u = i[a];
      this.set(u[0], u[1]);
    }
  }
  return o.prototype.clear = e, o.prototype.delete = t, o.prototype.get = n, o.prototype.has = r, o.prototype.set = s, dc = o, dc;
}
var fc, wp;
function hZe() {
  if (wp) return fc;
  wp = 1;
  var e = pZe(), t = "Expected a function";
  function n(r, s) {
    if (typeof r != "function" || s != null && typeof s != "function")
      throw new TypeError(t);
    var o = function() {
      var i = arguments, a = s ? s.apply(this, i) : i[0], c = o.cache;
      if (c.has(a))
        return c.get(a);
      var u = r.apply(this, i);
      return o.cache = c.set(a, u) || c, u;
    };
    return o.cache = new (n.Cache || e)(), o;
  }
  return n.Cache = e, fc = n, fc;
}
var pc, kp;
function gZe() {
  if (kp) return pc;
  kp = 1;
  var e = hZe(), t = 500;
  function n(r) {
    var s = e(r, function(i) {
      return o.size === t && o.clear(), i;
    }), o = s.cache;
    return s;
  }
  return pc = n, pc;
}
var hc, Cp;
function mZe() {
  if (Cp) return hc;
  Cp = 1;
  var e = gZe(), t = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, n = /\\(\\)?/g, r = e(function(s) {
    var o = [];
    return s.charCodeAt(0) === 46 && o.push(""), s.replace(t, function(i, a, c, u) {
      o.push(c ? u.replace(n, "$1") : a || i);
    }), o;
  });
  return hc = r, hc;
}
var gc, xp;
function vZe() {
  if (xp) return gc;
  xp = 1;
  function e(t, n) {
    for (var r = -1, s = t == null ? 0 : t.length, o = Array(s); ++r < s; )
      o[r] = n(t[r], r, t);
    return o;
  }
  return gc = e, gc;
}
var mc, Sp;
function _Ze() {
  if (Sp) return mc;
  Sp = 1;
  var e = Gl(), t = vZe(), n = Zl(), r = Kl(), s = e ? e.prototype : void 0, o = s ? s.toString : void 0;
  function i(a) {
    if (typeof a == "string")
      return a;
    if (n(a))
      return t(a, i) + "";
    if (r(a))
      return o ? o.call(a) : "";
    var c = a + "";
    return c == "0" && 1 / a == -1 / 0 ? "-0" : c;
  }
  return mc = i, mc;
}
var vc, Ep;
function bZe() {
  if (Ep) return vc;
  Ep = 1;
  var e = _Ze();
  function t(n) {
    return n == null ? "" : e(n);
  }
  return vc = t, vc;
}
var _c, Ap;
function yZe() {
  if (Ap) return _c;
  Ap = 1;
  var e = Zl(), t = qUe(), n = mZe(), r = bZe();
  function s(o, i) {
    return e(o) ? o : t(o, i) ? [o] : n(r(o));
  }
  return _c = s, _c;
}
var bc, $p;
function wZe() {
  if ($p) return bc;
  $p = 1;
  var e = Kl();
  function t(n) {
    if (typeof n == "string" || e(n))
      return n;
    var r = n + "";
    return r == "0" && 1 / n == -1 / 0 ? "-0" : r;
  }
  return bc = t, bc;
}
var yc, Mp;
function kZe() {
  if (Mp) return yc;
  Mp = 1;
  var e = yZe(), t = wZe();
  function n(r, s) {
    s = e(s, r);
    for (var o = 0, i = s.length; r != null && o < i; )
      r = r[t(s[o++])];
    return o && o == i ? r : void 0;
  }
  return yc = n, yc;
}
var wc, Ip;
function CZe() {
  if (Ip) return wc;
  Ip = 1;
  var e = kZe();
  function t(n, r, s) {
    var o = n == null ? void 0 : e(n, r);
    return o === void 0 ? s : o;
  }
  return wc = t, wc;
}
CZe();
function xZe(e) {
  const t = e.regex, n = {}, r = {
    begin: /\$\{/,
    end: /\}/,
    contains: [
      "self",
      {
        begin: /:-/,
        contains: [n]
      }
      // default values
    ]
  };
  Object.assign(n, {
    className: "variable",
    variants: [
      { begin: t.concat(
        /\$[\w\d#@][\w\d_]*/,
        // negative look-ahead tries to avoid matching patterns that are not
        // Perl at all like $ident$, @ident@, etc.
        "(?![\\w\\d])(?![$])"
      ) },
      r
    ]
  });
  const s = {
    className: "subst",
    begin: /\$\(/,
    end: /\)/,
    contains: [e.BACKSLASH_ESCAPE]
  }, o = {
    begin: /<<-?\s*(?=\w+)/,
    starts: { contains: [
      e.END_SAME_AS_BEGIN({
        begin: /(\w+)/,
        end: /(\w+)/,
        className: "string"
      })
    ] }
  }, i = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [
      e.BACKSLASH_ESCAPE,
      n,
      s
    ]
  };
  s.contains.push(i);
  const a = {
    match: /\\"/
  }, c = {
    className: "string",
    begin: /'/,
    end: /'/
  }, u = {
    match: /\\'/
  }, d = {
    begin: /\$?\(\(/,
    end: /\)\)/,
    contains: [
      {
        begin: /\d+#[0-9a-f]+/,
        className: "number"
      },
      e.NUMBER_MODE,
      n
    ]
  }, l = [
    "fish",
    "bash",
    "zsh",
    "sh",
    "csh",
    "ksh",
    "tcsh",
    "dash",
    "scsh"
  ], m = e.SHEBANG({
    binary: `(${l.join("|")})`,
    relevance: 10
  }), f = {
    className: "function",
    begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
    returnBegin: !0,
    contains: [e.inherit(e.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
    relevance: 0
  }, v = [
    "if",
    "then",
    "else",
    "elif",
    "fi",
    "for",
    "while",
    "until",
    "in",
    "do",
    "done",
    "case",
    "esac",
    "function",
    "select"
  ], g = [
    "true",
    "false"
  ], y = { match: /(\/[a-z._-]+)+/ }, h = [
    "break",
    "cd",
    "continue",
    "eval",
    "exec",
    "exit",
    "export",
    "getopts",
    "hash",
    "pwd",
    "readonly",
    "return",
    "shift",
    "test",
    "times",
    "trap",
    "umask",
    "unset"
  ], w = [
    "alias",
    "bind",
    "builtin",
    "caller",
    "command",
    "declare",
    "echo",
    "enable",
    "help",
    "let",
    "local",
    "logout",
    "mapfile",
    "printf",
    "read",
    "readarray",
    "source",
    "type",
    "typeset",
    "ulimit",
    "unalias"
  ], k = [
    "autoload",
    "bg",
    "bindkey",
    "bye",
    "cap",
    "chdir",
    "clone",
    "comparguments",
    "compcall",
    "compctl",
    "compdescribe",
    "compfiles",
    "compgroups",
    "compquote",
    "comptags",
    "comptry",
    "compvalues",
    "dirs",
    "disable",
    "disown",
    "echotc",
    "echoti",
    "emulate",
    "fc",
    "fg",
    "float",
    "functions",
    "getcap",
    "getln",
    "history",
    "integer",
    "jobs",
    "kill",
    "limit",
    "log",
    "noglob",
    "popd",
    "print",
    "pushd",
    "pushln",
    "rehash",
    "sched",
    "setcap",
    "setopt",
    "stat",
    "suspend",
    "ttyctl",
    "unfunction",
    "unhash",
    "unlimit",
    "unsetopt",
    "vared",
    "wait",
    "whence",
    "where",
    "which",
    "zcompile",
    "zformat",
    "zftp",
    "zle",
    "zmodload",
    "zparseopts",
    "zprof",
    "zpty",
    "zregexparse",
    "zsocket",
    "zstyle",
    "ztcp"
  ], C = [
    "chcon",
    "chgrp",
    "chown",
    "chmod",
    "cp",
    "dd",
    "df",
    "dir",
    "dircolors",
    "ln",
    "ls",
    "mkdir",
    "mkfifo",
    "mknod",
    "mktemp",
    "mv",
    "realpath",
    "rm",
    "rmdir",
    "shred",
    "sync",
    "touch",
    "truncate",
    "vdir",
    "b2sum",
    "base32",
    "base64",
    "cat",
    "cksum",
    "comm",
    "csplit",
    "cut",
    "expand",
    "fmt",
    "fold",
    "head",
    "join",
    "md5sum",
    "nl",
    "numfmt",
    "od",
    "paste",
    "ptx",
    "pr",
    "sha1sum",
    "sha224sum",
    "sha256sum",
    "sha384sum",
    "sha512sum",
    "shuf",
    "sort",
    "split",
    "sum",
    "tac",
    "tail",
    "tr",
    "tsort",
    "unexpand",
    "uniq",
    "wc",
    "arch",
    "basename",
    "chroot",
    "date",
    "dirname",
    "du",
    "echo",
    "env",
    "expr",
    "factor",
    // "false", // keyword literal already
    "groups",
    "hostid",
    "id",
    "link",
    "logname",
    "nice",
    "nohup",
    "nproc",
    "pathchk",
    "pinky",
    "printenv",
    "printf",
    "pwd",
    "readlink",
    "runcon",
    "seq",
    "sleep",
    "stat",
    "stdbuf",
    "stty",
    "tee",
    "test",
    "timeout",
    // "true", // keyword literal already
    "tty",
    "uname",
    "unlink",
    "uptime",
    "users",
    "who",
    "whoami",
    "yes"
  ];
  return {
    name: "Bash",
    aliases: ["sh"],
    keywords: {
      $pattern: /\b[a-z][a-z0-9._-]+\b/,
      keyword: v,
      literal: g,
      built_in: [
        ...h,
        ...w,
        // Shell modifiers
        "set",
        "shopt",
        ...k,
        ...C
      ]
    },
    contains: [
      m,
      // to catch known shells and boost relevancy
      e.SHEBANG(),
      // to catch unknown shells but still highlight the shebang
      f,
      d,
      e.HASH_COMMENT_MODE,
      o,
      y,
      i,
      a,
      c,
      u,
      n
    ]
  };
}
function SZe(e) {
  const t = e.regex, n = new RegExp("[\\p{XID_Start}_]\\p{XID_Continue}*", "u"), r = [
    "and",
    "as",
    "assert",
    "async",
    "await",
    "break",
    "case",
    "class",
    "continue",
    "def",
    "del",
    "elif",
    "else",
    "except",
    "finally",
    "for",
    "from",
    "global",
    "if",
    "import",
    "in",
    "is",
    "lambda",
    "match",
    "nonlocal|10",
    "not",
    "or",
    "pass",
    "raise",
    "return",
    "try",
    "while",
    "with",
    "yield"
  ], a = {
    $pattern: /[A-Za-z]\w+|__\w+__/,
    keyword: r,
    built_in: [
      "__import__",
      "abs",
      "all",
      "any",
      "ascii",
      "bin",
      "bool",
      "breakpoint",
      "bytearray",
      "bytes",
      "callable",
      "chr",
      "classmethod",
      "compile",
      "complex",
      "delattr",
      "dict",
      "dir",
      "divmod",
      "enumerate",
      "eval",
      "exec",
      "filter",
      "float",
      "format",
      "frozenset",
      "getattr",
      "globals",
      "hasattr",
      "hash",
      "help",
      "hex",
      "id",
      "input",
      "int",
      "isinstance",
      "issubclass",
      "iter",
      "len",
      "list",
      "locals",
      "map",
      "max",
      "memoryview",
      "min",
      "next",
      "object",
      "oct",
      "open",
      "ord",
      "pow",
      "print",
      "property",
      "range",
      "repr",
      "reversed",
      "round",
      "set",
      "setattr",
      "slice",
      "sorted",
      "staticmethod",
      "str",
      "sum",
      "super",
      "tuple",
      "type",
      "vars",
      "zip"
    ],
    literal: [
      "__debug__",
      "Ellipsis",
      "False",
      "None",
      "NotImplemented",
      "True"
    ],
    type: [
      "Any",
      "Callable",
      "Coroutine",
      "Dict",
      "List",
      "Literal",
      "Generic",
      "Optional",
      "Sequence",
      "Set",
      "Tuple",
      "Type",
      "Union"
    ]
  }, c = {
    className: "meta",
    begin: /^(>>>|\.\.\.) /
  }, u = {
    className: "subst",
    begin: /\{/,
    end: /\}/,
    keywords: a,
    illegal: /#/
  }, d = {
    begin: /\{\{/,
    relevance: 0
  }, l = {
    className: "string",
    contains: [e.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
        end: /'''/,
        contains: [
          e.BACKSLASH_ESCAPE,
          c
        ],
        relevance: 10
      },
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
        end: /"""/,
        contains: [
          e.BACKSLASH_ESCAPE,
          c
        ],
        relevance: 10
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'''/,
        end: /'''/,
        contains: [
          e.BACKSLASH_ESCAPE,
          c,
          d,
          u
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"""/,
        end: /"""/,
        contains: [
          e.BACKSLASH_ESCAPE,
          c,
          d,
          u
        ]
      },
      {
        begin: /([uU]|[rR])'/,
        end: /'/,
        relevance: 10
      },
      {
        begin: /([uU]|[rR])"/,
        end: /"/,
        relevance: 10
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])'/,
        end: /'/
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])"/,
        end: /"/
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'/,
        end: /'/,
        contains: [
          e.BACKSLASH_ESCAPE,
          d,
          u
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"/,
        end: /"/,
        contains: [
          e.BACKSLASH_ESCAPE,
          d,
          u
        ]
      },
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE
    ]
  }, m = "[0-9](_?[0-9])*", f = `(\\b(${m}))?\\.(${m})|\\b(${m})\\.`, v = `\\b|${r.join("|")}`, g = {
    className: "number",
    relevance: 0,
    variants: [
      // exponentfloat, pointfloat
      // https://docs.python.org/3.9/reference/lexical_analysis.html#floating-point-literals
      // optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      // Note: no leading \b because floats can start with a decimal point
      // and we don't want to mishandle e.g. `fn(.5)`,
      // no trailing \b for pointfloat because it can end with a decimal point
      // and we don't want to mishandle e.g. `0..hex()`; this should be safe
      // because both MUST contain a decimal point and so cannot be confused with
      // the interior part of an identifier
      {
        begin: `(\\b(${m})|(${f}))[eE][+-]?(${m})[jJ]?(?=${v})`
      },
      {
        begin: `(${f})[jJ]?`
      },
      // decinteger, bininteger, octinteger, hexinteger
      // https://docs.python.org/3.9/reference/lexical_analysis.html#integer-literals
      // optionally "long" in Python 2
      // https://docs.python.org/2.7/reference/lexical_analysis.html#integer-and-long-integer-literals
      // decinteger is optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${v})`
      },
      {
        begin: `\\b0[bB](_?[01])+[lL]?(?=${v})`
      },
      {
        begin: `\\b0[oO](_?[0-7])+[lL]?(?=${v})`
      },
      {
        begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${v})`
      },
      // imagnumber (digitpart-based)
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b(${m})[jJ](?=${v})`
      }
    ]
  }, y = {
    className: "comment",
    begin: t.lookahead(/# type:/),
    end: /$/,
    keywords: a,
    contains: [
      {
        // prevent keywords from coloring `type`
        begin: /# type:/
      },
      // comment within a datatype comment includes no keywords
      {
        begin: /#/,
        end: /\b\B/,
        endsWithParent: !0
      }
    ]
  }, h = {
    className: "params",
    variants: [
      // Exclude params in functions without params
      {
        className: "",
        begin: /\(\s*\)/,
        skip: !0
      },
      {
        begin: /\(/,
        end: /\)/,
        excludeBegin: !0,
        excludeEnd: !0,
        keywords: a,
        contains: [
          "self",
          c,
          g,
          l,
          e.HASH_COMMENT_MODE
        ]
      }
    ]
  };
  return u.contains = [
    l,
    g,
    c
  ], {
    name: "Python",
    aliases: [
      "py",
      "gyp",
      "ipython"
    ],
    unicodeRegex: !0,
    keywords: a,
    illegal: /(<\/|\?)|=>/,
    contains: [
      c,
      g,
      {
        // very common convention
        begin: /\bself\b/
      },
      {
        // eat "if" prior to string so that it won't accidentally be
        // labeled as an f-string
        beginKeywords: "if",
        relevance: 0
      },
      l,
      y,
      e.HASH_COMMENT_MODE,
      {
        match: [
          /\bdef/,
          /\s+/,
          n
        ],
        scope: {
          1: "keyword",
          3: "title.function"
        },
        contains: [h]
      },
      {
        variants: [
          {
            match: [
              /\bclass/,
              /\s+/,
              n,
              /\s*/,
              /\(\s*/,
              n,
              /\s*\)/
            ]
          },
          {
            match: [
              /\bclass/,
              /\s+/,
              n
            ]
          }
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          6: "title.class.inherited"
        }
      },
      {
        className: "meta",
        begin: /^[\t ]*@/,
        end: /(?=#)|$/,
        contains: [
          g,
          h,
          l
        ]
      }
    ]
  };
}
const is = "[A-Za-z$_][0-9A-Za-z$_]*", av = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends"
], cv = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], lv = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
], uv = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], dv = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
], fv = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
], pv = [].concat(
  dv,
  lv,
  uv
);
function EZe(e) {
  const t = e.regex, n = (F, { after: Z }) => {
    const W = "</" + F[0].slice(1);
    return F.input.indexOf(W, Z) !== -1;
  }, r = is, s = {
    begin: "<>",
    end: "</>"
  }, o = /<[A-Za-z0-9\\._:-]+\s*\/>/, i = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (F, Z) => {
      const W = F[0].length + F.index, pe = F.input[W];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        pe === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        pe === ","
      ) {
        Z.ignoreMatch();
        return;
      }
      pe === ">" && (n(F, { after: W }) || Z.ignoreMatch());
      let le;
      const Ee = F.input.substring(W);
      if (le = Ee.match(/^\s*=/)) {
        Z.ignoreMatch();
        return;
      }
      if ((le = Ee.match(/^\s+extends\s+/)) && le.index === 0) {
        Z.ignoreMatch();
        return;
      }
    }
  }, a = {
    $pattern: is,
    keyword: av,
    literal: cv,
    built_in: pv,
    "variable.language": fv
  }, c = "[0-9](_?[0-9])*", u = `\\.(${c})`, d = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", l = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${d})((${u})|\\.)?|(${u}))[eE][+-]?(${c})\\b` },
      { begin: `\\b(${d})\\b((${u})\\b|\\.)?|(${u})\\b` },
      // DecimalBigIntegerLiteral
      { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  }, m = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: a,
    contains: []
    // defined later
  }, f = {
    begin: "html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        m
      ],
      subLanguage: "xml"
    }
  }, v = {
    begin: "css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        m
      ],
      subLanguage: "css"
    }
  }, g = {
    begin: "gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        m
      ],
      subLanguage: "graphql"
    }
  }, y = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      e.BACKSLASH_ESCAPE,
      m
    ]
  }, w = {
    className: "comment",
    variants: [
      e.COMMENT(
        /\/\*\*(?!\/)/,
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              begin: "(?=@[A-Za-z]+)",
              relevance: 0,
              contains: [
                {
                  className: "doctag",
                  begin: "@[A-Za-z]+"
                },
                {
                  className: "type",
                  begin: "\\{",
                  end: "\\}",
                  excludeEnd: !0,
                  excludeBegin: !0,
                  relevance: 0
                },
                {
                  className: "variable",
                  begin: r + "(?=\\s*(-)|$)",
                  endsParent: !0,
                  relevance: 0
                },
                // eat spaces (not newlines) so we can find
                // types or variables
                {
                  begin: /(?=[^\n])\s/,
                  relevance: 0
                }
              ]
            }
          ]
        }
      ),
      e.C_BLOCK_COMMENT_MODE,
      e.C_LINE_COMMENT_MODE
    ]
  }, k = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE,
    f,
    v,
    g,
    y,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    l
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  m.contains = k.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: a,
    contains: [
      "self"
    ].concat(k)
  });
  const C = [].concat(w, m.contains), A = C.concat([
    // eat recursive parens in sub expressions
    {
      begin: /\(/,
      end: /\)/,
      keywords: a,
      contains: ["self"].concat(C)
    }
  ]), E = {
    className: "params",
    begin: /\(/,
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: a,
    contains: A
  }, $ = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          r,
          /\s+/,
          /extends/,
          /\s+/,
          t.concat(r, "(", t.concat(/\./, r), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          r
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  }, M = {
    relevance: 0,
    match: t.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...lv,
        ...uv
      ]
    }
  }, O = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, R = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          r,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [E],
    illegal: /%/
  }, B = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function V(F) {
    return t.concat("(?!", F.join("|"), ")");
  }
  const re = {
    match: t.concat(
      /\b/,
      V([
        ...dv,
        "super",
        "import"
      ]),
      r,
      t.lookahead(/\(/)
    ),
    className: "title.function",
    relevance: 0
  }, P = {
    begin: t.concat(/\./, t.lookahead(
      t.concat(r, /(?![0-9A-Za-z$_(])/)
    )),
    end: r,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, U = {
    match: [
      /get|set/,
      /\s+/,
      r,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      E
    ]
  }, z = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", N = {
    match: [
      /const|var|let/,
      /\s+/,
      r,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      t.lookahead(z)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      E
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: a,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: A, CLASS_REFERENCE: M },
    illegal: /#(?![$_A-z])/,
    contains: [
      e.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      O,
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE,
      f,
      v,
      g,
      y,
      w,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      l,
      M,
      {
        className: "attr",
        begin: r + t.lookahead(":"),
        relevance: 0
      },
      N,
      {
        // "value" container
        begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          w,
          e.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: z,
            returnBegin: !0,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: e.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: !0
                  },
                  {
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: a,
                    contains: A
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: s.begin, end: s.end },
              { match: o },
              {
                begin: i.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": i.isTrulyOpeningTag,
                end: i.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: i.begin,
                end: i.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      R,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: !0,
        label: "func.def",
        contains: [
          E,
          e.inherit(e.TITLE_MODE, { begin: r, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      P,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + r,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [E]
      },
      re,
      B,
      $,
      U,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function AZe(e) {
  const t = EZe(e), n = is, r = [
    "any",
    "void",
    "number",
    "boolean",
    "string",
    "object",
    "never",
    "symbol",
    "bigint",
    "unknown"
  ], s = {
    beginKeywords: "namespace",
    end: /\{/,
    excludeEnd: !0,
    contains: [t.exports.CLASS_REFERENCE]
  }, o = {
    beginKeywords: "interface",
    end: /\{/,
    excludeEnd: !0,
    keywords: {
      keyword: "interface extends",
      built_in: r
    },
    contains: [t.exports.CLASS_REFERENCE]
  }, i = {
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use strict['"]/
  }, a = [
    "type",
    "namespace",
    "interface",
    "public",
    "private",
    "protected",
    "implements",
    "declare",
    "abstract",
    "readonly",
    "enum",
    "override"
  ], c = {
    $pattern: is,
    keyword: av.concat(a),
    literal: cv,
    built_in: pv.concat(r),
    "variable.language": fv
  }, u = {
    className: "meta",
    begin: "@" + n
  }, d = (m, f, v) => {
    const g = m.contains.findIndex((y) => y.label === f);
    if (g === -1)
      throw new Error("can not find mode to replace");
    m.contains.splice(g, 1, v);
  };
  Object.assign(t.keywords, c), t.exports.PARAMS_CONTAINS.push(u), t.contains = t.contains.concat([
    u,
    s,
    o
  ]), d(t, "shebang", e.SHEBANG()), d(t, "use_strict", i);
  const l = t.contains.find((m) => m.label === "func.def");
  return l.relevance = 0, Object.assign(t, {
    name: "TypeScript",
    aliases: [
      "ts",
      "tsx",
      "mts",
      "cts"
    ]
  }), t;
}
const $Ze = H({
  name: "VueMarkdown",
  props: {
    source: {
      type: String,
      required: !0
    },
    options: {
      type: Object,
      required: !1
    },
    plugins: {
      type: Array,
      required: !1
    }
  },
  setup(e) {
    const t = D(new $m(e.options ?? {}));
    for (const r of e.plugins ?? [])
      t.value.use(r);
    const n = I(() => t.value.render(e.source));
    return () => Lt("div", { innerHTML: n.value });
  }
}), MZe = {
  key: 0,
  class: "chat-message-actions"
}, IZe = {
  key: 2,
  class: "chat-message-files"
}, Yc = /* @__PURE__ */ H({
  __name: "Message",
  props: {
    message: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    mn.registerLanguage("javascript", Gp), mn.registerLanguage("typescript", AZe), mn.registerLanguage("python", SZe), mn.registerLanguage("xml", Kp), mn.registerLanguage("bash", xZe);
    const { message: r } = as(n), { options: s } = uo(), o = D(null), i = D({}), a = I(() => r.value.text || "&lt;Empty response&gt;"), c = I(() => ({
      "chat-message-from-user": r.value.sender === "user",
      "chat-message-from-bot": r.value.sender === "bot",
      "chat-message-transparent": r.value.transparent === !0
    })), u = (v) => {
      v.use(Mm, {
        attrs: {
          target: "_blank",
          rel: "noopener"
        }
      });
    }, d = () => {
      var v;
      (v = o.value) != null && v.scrollIntoView && o.value.scrollIntoView({
        block: "start"
      });
    }, l = {
      highlight(v, g) {
        if (g && mn.getLanguage(g))
          try {
            return mn.highlight(v, { language: g }).value;
          } catch {
          }
        return "";
      }
    }, m = { ...(s == null ? void 0 : s.messageComponents) ?? {} };
    t({ scrollToView: d });
    const f = async (v) => await new Promise((g, y) => {
      const h = new FileReader();
      h.onload = () => g(h.result), h.onerror = y, h.readAsDataURL(v);
    });
    return Be(async () => {
      if (r.value.files)
        for (const v of r.value.files)
          try {
            const g = await f(v);
            i.value[v.name] = g;
          } catch (g) {
            console.error("Error reading file:", g);
          }
    }), (v, g) => (b(), x("div", {
      ref_key: "messageContainer",
      ref: o,
      class: j(["chat-message", c.value])
    }, [
      v.$slots.beforeMessage ? (b(), x("div", MZe, [
        ne(v.$slots, "beforeMessage", Yr(Np({ message: _(r) })))
      ])) : Q("", !0),
      ne(v.$slots, "default", {}, () => [
        _(r).type === "component" && m[_(r).key] ? (b(), X(lt(m[_(r).key]), Yr(je({ key: 0 }, _(r).arguments)), null, 16)) : (b(), X(_($Ze), {
          key: 1,
          class: "chat-message-markdown",
          source: a.value,
          options: l,
          plugins: [u]
        }, null, 8, ["source", "plugins"])),
        (_(r).files ?? []).length > 0 ? (b(), x("div", IZe, [
          (b(!0), x(Pe, null, Je(_(r).files ?? [], (y) => (b(), x("div", {
            key: y.name,
            class: "chat-message-file"
          }, [
            ue(Xp, {
              file: y,
              "is-removable": !1,
              "is-previewable": !0
            }, null, 8, ["file"])
          ]))), 128))
        ])) : Q("", !0)
      ])
    ], 2));
  }
}), TZe = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function LZe(e, t) {
  return b(), x("svg", TZe, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "M12 3c5.5 0 10 3.58 10 8s-4.5 8-10 8c-1.24 0-2.43-.18-3.53-.5C5.55 21 2 21 2 21c2.33-2.33 2.7-3.9 2.75-4.5C3.05 15.07 2 13.13 2 11c0-4.42 4.5-8 10-8"
    }, null, -1)
  ]));
}
const OZe = { name: "mdi-chat", render: LZe }, RZe = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function PZe(e, t) {
  return b(), x("svg", RZe, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z"
    }, null, -1)
  ]));
}
const BZe = { name: "mdi-chevron-down", render: PZe }, zZe = { class: "chat-window-wrapper" }, DZe = { class: "chat-window" }, NZe = /* @__PURE__ */ H({
  __name: "ChatWindow",
  setup(e) {
    const t = D(!1);
    function n() {
      t.value = !t.value, t.value && Ae(() => {
        vt.emit("scrollToBottom");
      });
    }
    return (r, s) => (b(), x("div", zZe, [
      ue(nr, { name: "chat-window-transition" }, {
        default: Y(() => [
          Ye(p("div", DZe, [
            ue(hv)
          ], 512), [
            [Jt, t.value]
          ])
        ]),
        _: 1
      }),
      p("div", {
        class: "chat-window-toggle",
        onClick: n
      }, [
        ue(nr, {
          name: "chat-window-toggle-transition",
          mode: "out-in"
        }, {
          default: Y(() => [
            t.value ? (b(), X(_(BZe), {
              key: 1,
              height: "32",
              width: "32"
            })) : (b(), X(_(OZe), {
              key: 0,
              height: "32",
              width: "32"
            }))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), qZe = /* @__PURE__ */ H({
  __name: "MessageTyping",
  props: {
    animation: { default: "bouncing" }
  },
  setup(e) {
    const t = e, n = {
      id: "typing",
      text: "",
      sender: "bot"
    }, r = D(), s = I(() => ({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "chat-message-typing": !0,
      [`chat-message-typing-animation-${t.animation}`]: !0
    }));
    return Be(() => {
      var o;
      (o = r.value) == null || o.scrollToView();
    }), (o, i) => (b(), X(_(Yc), {
      ref_key: "messageContainer",
      ref: r,
      class: j(s.value),
      message: n,
      "data-test-id": "chat-message-typing"
    }, {
      default: Y(() => i[0] || (i[0] = [
        p("div", { class: "chat-message-typing-body" }, [
          p("span", { class: "chat-message-typing-circle" }),
          p("span", { class: "chat-message-typing-circle" }),
          p("span", { class: "chat-message-typing-circle" })
        ], -1)
      ])),
      _: 1
    }, 8, ["class"]));
  }
}), FZe = {
  key: 0,
  class: "empty-container"
}, jZe = {
  class: "empty",
  "data-test-id": "chat-messages-empty"
}, HZe = {
  key: 1,
  class: "chat-messages-list"
}, VZe = /* @__PURE__ */ H({
  __name: "MessagesList",
  props: {
    messages: {},
    emptyText: {}
  },
  setup(e) {
    const t = tl(), n = D([]), { initialMessages: r, waitingForResponse: s } = t;
    return ae(
      () => n.value.length,
      () => {
        const o = n.value[n.value.length - 1];
        o && o.scrollToView();
      }
    ), (o, i) => o.emptyText && _(r).length === 0 && o.messages.length === 0 ? (b(), x("div", FZe, [
      p("div", jZe, [
        ue(_(Ml), {
          icon: "message-circle",
          size: "large",
          class: "emptyIcon"
        }),
        ue(_(lm), {
          tag: "p",
          size: "medium",
          color: "text-base"
        }, {
          default: Y(() => [
            _r(ve(o.emptyText), 1)
          ]),
          _: 1
        })
      ])
    ])) : (b(), x("div", HZe, [
      (b(!0), x(Pe, null, Je(_(r), (a) => (b(), X(Yc, {
        key: a.id,
        message: a
      }, null, 8, ["message"]))), 128)),
      (b(!0), x(Pe, null, Je(o.messages, (a) => (b(), X(Yc, {
        key: a.id,
        ref_for: !0,
        ref_key: "messageComponents",
        ref: n,
        message: a
      }, {
        beforeMessage: Y(({ message: c }) => [
          ne(o.$slots, "beforeMessage", je({ ref_for: !0 }, { message: c }))
        ]),
        _: 2
      }, 1032, ["message"]))), 128)),
      _(s) ? (b(), X(qZe, { key: 0 })) : Q("", !0)
    ]));
  }
}), UZe = { class: "chat-heading" }, ZZe = ["title"], WZe = { key: 0 }, hv = /* @__PURE__ */ H({
  __name: "Chat",
  setup(e) {
    const { t } = ls(), n = tl(), { messages: r, currentSessionId: s } = n, { options: o } = uo(), i = I(() => o.mode === "window" && o.showWindowCloseButton);
    async function a() {
      n.startNewSession && (n.startNewSession(), Ae(() => {
        vt.emit("scrollToBottom");
      }));
    }
    async function c() {
      n.loadPreviousSession && (await n.loadPreviousSession(), Ae(() => {
        vt.emit("scrollToBottom");
      }));
    }
    function u() {
      vt.emit("close");
    }
    return Be(async () => {
      await c(), !o.showWelcomeScreen && !s.value && await a();
    }), (d, l) => (b(), X(mb, { class: "chat-wrapper" }, {
      header: Y(() => [
        p("div", UZe, [
          p("h1", null, ve(_(t)("title")), 1),
          i.value ? (b(), x("button", {
            key: 0,
            class: "chat-close-button",
            title: _(t)("closeButtonTooltip"),
            onClick: u
          }, [
            ue(_(f_), {
              height: "18",
              width: "18"
            })
          ], 8, ZZe)) : Q("", !0)
        ]),
        _(t)("subtitle") ? (b(), x("p", WZe, ve(_(t)("subtitle")), 1)) : Q("", !0)
      ]),
      footer: Y(() => [
        _(s) ? (b(), X(fb, { key: 0 })) : (b(), X(S_, { key: 1 }))
      ]),
      default: Y(() => [
        !_(s) && _(o).showWelcomeScreen ? (b(), X(__, {
          key: 0,
          "onClick:button": a
        })) : (b(), X(VZe, {
          key: 1,
          messages: _(r)
        }, null, 8, ["messages"]))
      ]),
      _: 1
    }));
  }
}), GZe = /* @__PURE__ */ H({
  __name: "App",
  props: {},
  setup(e) {
    const { options: t } = uo(), n = I(() => t.mode === "fullscreen");
    return Be(() => {
      mn.registerLanguage("xml", Kp), mn.registerLanguage("javascript", Gp);
    }), (r, s) => n.value ? (b(), X(hv, {
      key: 0,
      class: "n8n-chat"
    })) : (b(), X(NZe, {
      key: 1,
      class: "n8n-chat"
    }));
  }
});
function XZe(e) {
  var s, o;
  const t = {
    ...Br,
    ...e,
    webhookConfig: {
      ...Br.webhookConfig,
      ...e == null ? void 0 : e.webhookConfig
    },
    i18n: {
      ...Br.i18n,
      ...e == null ? void 0 : e.i18n,
      en: {
        ...(s = Br.i18n) == null ? void 0 : s.en,
        ...(o = e == null ? void 0 : e.i18n) == null ? void 0 : o.en
      }
    },
    theme: {
      ...Br.theme,
      ...e == null ? void 0 : e.theme
    }
  }, n = t.target ?? Vv;
  typeof n == "string" && t_(n);
  const r = Hv(GZe);
  return r.use(n_, t), r.mount(n), r;
}
export {
  XZe as createChat
};