
var Chess = function(h) {
  function f(a) {
    "undefined" === typeof a && (a = !1);
    k = Array(128);
    D = {w:-1, b:-1};
    x = "w";
    v = {w:0, b:0};
    N = -1;
    M = 0;
    Q = 1;
    O = [];
    a || (H = {});
    B = {};
    P(C());
  }
  function q() {
    for (var a = [], b = {}; 0 < O.length;) {
      a.push(R());
    }
    var c = C();
    c in B && (b[c] = B[c]);
    for (; 0 < a.length;) {
      K(a.pop()), c = C(), c in B && (b[c] = B[c]);
    }
    B = b;
  }
  function z(a, b) {
    "undefined" === typeof b && (b = !1);
    var c = a.split(/\s+/), d = c[0], e = 0;
    if (!y(a).valid) {
      return !1;
    }
    f(b);
    for (var l = 0; l < d.length; l++) {
      var g = d.charAt(l);
      if ("/" === g) {
        e += 8;
      } else if (-1 !== "0123456789".indexOf(g)) {
        e += parseInt(g, 10);
      } else {
        var r = "a" > g ? "w" : "b";
        Z({type:g.toLowerCase(), color:r}, I(e));
        e++;
      }
    }
    x = c[1];
    -1 < c[2].indexOf("K") && (v.w |= m.KSIDE_CASTLE);
    -1 < c[2].indexOf("Q") && (v.w |= m.QSIDE_CASTLE);
    -1 < c[2].indexOf("k") && (v.b |= m.KSIDE_CASTLE);
    -1 < c[2].indexOf("q") && (v.b |= m.QSIDE_CASTLE);
    N = "-" === c[3] ? -1 : u[c[3]];
    M = parseInt(c[4], 10);
    Q = parseInt(c[5], 10);
    P(C());
    return !0;
  }
  function y(a) {
    var b = {0:"No errors.", 1:"FEN string must contain six space-delimited fields.", 2:"6th field (move number) must be a positive integer.", 3:"5th field (half move counter) must be a non-negative integer.", 4:"4th field (en-passant square) is invalid.", 5:"3rd field (castling availability) is invalid.", 6:"2nd field (side to move) is invalid.", 7:"1st field (piece positions) does not contain 8 '/'-delimited rows.", 8:"1st field (piece positions) is invalid [consecutive numbers].", 9:"1st field (piece positions) is invalid [invalid piece].", 
    10:"1st field (piece positions) is invalid [row too large].", 11:"Illegal en-passant square"};
    a = a.split(/\s+/);
    if (6 !== a.length) {
      return {valid:!1, error_number:1, error:b[1]};
    }
    if (isNaN(a[5]) || 0 >= parseInt(a[5], 10)) {
      return {valid:!1, error_number:2, error:b[2]};
    }
    if (isNaN(a[4]) || 0 > parseInt(a[4], 10)) {
      return {valid:!1, error_number:3, error:b[3]};
    }
    if (!/^(-|[abcdefgh][36])$/.test(a[3])) {
      return {valid:!1, error_number:4, error:b[4]};
    }
    if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(a[2])) {
      return {valid:!1, error_number:5, error:b[5]};
    }
    if (!/^(w|b)$/.test(a[1])) {
      return {valid:!1, error_number:6, error:b[6]};
    }
    var c = a[0].split("/");
    if (8 !== c.length) {
      return {valid:!1, error_number:7, error:b[7]};
    }
    for (var d = 0; d < c.length; d++) {
      for (var e = 0, l = !1, g = 0; g < c[d].length; g++) {
        if (isNaN(c[d][g])) {
          if (!/^[prnbqkPRNBQK]$/.test(c[d][g])) {
            return {valid:!1, error_number:9, error:b[9]};
          }
          e += 1;
          l = !1;
        } else {
          if (l) {
            return {valid:!1, error_number:8, error:b[8]};
          }
          e += parseInt(c[d][g], 10);
          l = !0;
        }
      }
      if (8 !== e) {
        return {valid:!1, error_number:10, error:b[10]};
      }
    }
    return "3" == a[3][1] && "w" == a[1] || "6" == a[3][1] && "b" == a[1] ? {valid:!1, error_number:11, error:b[11]} : {valid:!0, error_number:0, error:b[0]};
  }
  function C() {
    for (var a = 0, b = "", c = u.a8; c <= u.h1; c++) {
      if (null == k[c]) {
        a++;
      } else {
        0 < a && (b += a, a = 0);
        var d = k[c].type;
        b += "w" === k[c].color ? d.toUpperCase() : d.toLowerCase();
      }
      c + 1 & 136 && (0 < a && (b += a), c !== u.h1 && (b += "/"), a = 0, c += 8);
    }
    a = "";
    v.w & m.KSIDE_CASTLE && (a += "K");
    v.w & m.QSIDE_CASTLE && (a += "Q");
    v.b & m.KSIDE_CASTLE && (a += "k");
    v.b & m.QSIDE_CASTLE && (a += "q");
    a = a || "-";
    c = -1 === N ? "-" : I(N);
    return [b, x, a, c, M, Q].join(" ");
  }
  function aa(a) {
    for (var b = 0; b < a.length; b += 2) {
      "string" === typeof a[b] && "string" === typeof a[b + 1] && (H[a[b]] = a[b + 1]);
    }
    return H;
  }
  function P(a) {
    0 < O.length || ("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" !== a ? (H.SetUp = "1", H.FEN = a) : (delete H.SetUp, delete H.FEN));
  }
  function ba(a) {
    return (a = k[u[a]]) ? {type:a.type, color:a.color} : null;
  }
  function Z(a, b) {
    if (!("type" in a && "color" in a && -1 !== "pnbrqkPNBRQK".indexOf(a.type.toLowerCase()) && b in u)) {
      return !1;
    }
    var c = u[b];
    if ("k" == a.type && -1 != D[a.color] && D[a.color] != c) {
      return !1;
    }
    k[c] = {type:a.type, color:a.color};
    "k" === a.type && (D[a.color] = c);
    P(C());
    return !0;
  }
  function V(a, b, c, d, e) {
    b = {color:x, from:b, to:c, flags:d, piece:a[b].type};
    e && (b.flags |= m.PROMOTION, b.promotion = e);
    a[c] ? b.captured = a[c].type : d & m.EP_CAPTURE && (b.captured = "p");
    return b;
  }
  function F(a) {
    function b(S, ca, W, X, Y) {
      if ("p" !== S[W].type || 0 !== X >> 4 && 7 !== X >> 4) {
        ca.push(V(S, W, X, Y));
      } else {
        for (var ka = ["q", "r", "b", "n"], ea = 0, pa = ka.length; ea < pa; ea++) {
          ca.push(V(S, W, X, Y, ka[ea]));
        }
      }
    }
    var c = [], d = x, e = "w" === d ? "b" : "w", l = {b:1, w:6}, g = u.a8, r = u.h1, A = !1, t = "undefined" !== typeof a && "legal" in a ? a.legal : !0;
    if ("undefined" !== typeof a && "square" in a) {
      if (a.square in u) {
        g = r = u[a.square], A = !0;
      } else {
        return [];
      }
    }
    for (a = g; a <= r; a++) {
      if (a & 136) {
        a += 7;
      } else {
        var w = k[a];
        if (null != w && w.color === d) {
          if ("p" === w.type) {
            var p = a + fa[d][0];
            null == k[p] && (b(k, c, a, p, m.NORMAL), p = a + fa[d][1], l[d] === a >> 4 && null == k[p] && b(k, c, a, p, m.BIG_PAWN));
            for (n = 2; 4 > n; n++) {
              p = a + fa[d][n], p & 136 || (null != k[p] && k[p].color === e ? b(k, c, a, p, m.CAPTURE) : p === N && b(k, c, a, N, m.EP_CAPTURE));
            }
          } else {
            var n = 0;
            for (g = la[w.type].length; n < g; n++) {
              var G = la[w.type][n];
              for (p = a;;) {
                p += G;
                if (p & 136) {
                  break;
                }
                if (null == k[p]) {
                  b(k, c, a, p, m.NORMAL);
                } else {
                  if (k[p].color === d) {
                    break;
                  }
                  b(k, c, a, p, m.CAPTURE);
                  break;
                }
                if ("n" === w.type || "k" === w.type) {
                  break;
                }
              }
            }
          }
        }
      }
    }
    A && r !== D[d] || (v[d] & m.KSIDE_CASTLE && (l = D[d], r = l + 2, null != k[l + 1] || null != k[r] || T(e, D[d]) || T(e, l + 1) || T(e, r) || b(k, c, D[d], r, m.KSIDE_CASTLE)), v[d] & m.QSIDE_CASTLE && (l = D[d], r = l - 2, null != k[l - 1] || null != k[l - 2] || null != k[l - 3] || T(e, D[d]) || T(e, l - 1) || T(e, r) || b(k, c, D[d], r, m.QSIDE_CASTLE)));
    if (!t) {
      return c;
    }
    e = [];
    a = 0;
    for (g = c.length; a < g; a++) {
      K(c[a]), L(d) || e.push(c[a]), R();
    }
    return e;
  }
  function J(a, b) {
    var c = "";
    if (a.flags & m.KSIDE_CASTLE) {
      c = "O-O";
    } else if (a.flags & m.QSIDE_CASTLE) {
      c = "O-O-O";
    } else {
      for (var d = F({legal:!b}), e = a.from, l = a.to, g = a.piece, r = 0, A = 0, t = 0, w = 0, p = d.length; w < p; w++) {
        var n = d[w].from, G = d[w].to;
        g === d[w].piece && e !== n && l === G && (r++, e >> 4 === n >> 4 && A++, (e & 15) === (n & 15) && t++);
      }
      d = 0 < r ? 0 < A && 0 < t ? I(e) : 0 < t ? I(e).charAt(1) : I(e).charAt(0) : "";
      "p" !== a.piece && (c += a.piece.toUpperCase() + d);
      a.flags & (m.CAPTURE | m.EP_CAPTURE) && ("p" === a.piece && (c += I(a.from)[0]), c += "x");
      c += I(a.to);
      a.flags & m.PROMOTION && (c += "=" + a.promotion.toUpperCase());
    }
    K(a);
    L(x) && (c = L(x) && 0 === F().length ? c + "#" : c + "+");
    R();
    return c;
  }
  function E(a) {
    return a.replace(/=/, "").replace(/[+#]?[?!]*$/, "");
  }
  function T(a, b) {
    for (var c = u.a8; c <= u.h1; c++) {
      if (c & 136) {
        c += 7;
      } else if (null != k[c] && k[c].color === a) {
        var d = k[c], e = c - b, l = e + 119;
        if (qa[l] & 1 << ra[d.type]) {
          if ("p" === d.type) {
            if (0 < e) {
              if ("w" === d.color) {
                return !0;
              }
            } else {
              if ("b" === d.color) {
                return !0;
              }
            }
          } else {
            if ("n" === d.type || "k" === d.type) {
              return !0;
            }
            d = sa[l];
            e = c + d;
            for (l = !1; e !== b;) {
              if (null != k[e]) {
                l = !0;
                break;
              }
              e += d;
            }
            if (!l) {
              return !0;
            }
          }
        }
      }
    }
    return !1;
  }
  function L(a) {
    return T("w" === a ? "b" : "w", D[a]);
  }
  function ha() {
    for (var a = {}, b = [], c = 0, d = 0, e = u.a8; e <= u.h1; e++) {
      if (d = (d + 1) % 2, e & 136) {
        e += 7;
      } else {
        var l = k[e];
        l && (a[l.type] = l.type in a ? a[l.type] + 1 : 1, "b" === l.type && b.push(d), c++);
      }
    }
    if (2 === c || 3 === c && (1 === a.b || 1 === a.n)) {
      return !0;
    }
    if (c === a.b + 2) {
      a = 0;
      c = b.length;
      for (e = 0; e < c; e++) {
        a += b[e];
      }
      if (0 === a || a === c) {
        return !0;
      }
    }
    return !1;
  }
  function ia() {
    for (var a = [], b = {}, c = !1;;) {
      var d = R();
      if (!d) {
        break;
      }
      a.push(d);
    }
    for (;;) {
      d = C().split(" ").slice(0, 4).join(" ");
      b[d] = d in b ? b[d] + 1 : 1;
      3 <= b[d] && (c = !0);
      if (!a.length) {
        break;
      }
      K(a.pop());
    }
    return c;
  }
  function K(a) {
    var b = x, c = "w" === b ? "b" : "w";
    O.push({move:a, kings:{b:D.b, w:D.w}, turn:x, castling:{b:v.b, w:v.w}, ep_square:N, half_moves:M, move_number:Q});
    k[a.to] = k[a.from];
    k[a.from] = null;
    a.flags & m.EP_CAPTURE && ("b" === x ? k[a.to - 16] = null : k[a.to + 16] = null);
    a.flags & m.PROMOTION && (k[a.to] = {type:a.promotion, color:b});
    if ("k" === k[a.to].type) {
      D[k[a.to].color] = a.to;
      if (a.flags & m.KSIDE_CASTLE) {
        var d = a.to - 1, e = a.to + 1;
        k[d] = k[e];
        k[e] = null;
      } else {
        a.flags & m.QSIDE_CASTLE && (d = a.to + 1, e = a.to - 2, k[d] = k[e], k[e] = null);
      }
      v[b] = "";
    }
    if (v[b]) {
      for (d = 0, e = U[b].length; d < e; d++) {
        if (a.from === U[b][d].square && v[b] & U[b][d].flag) {
          v[b] ^= U[b][d].flag;
          break;
        }
      }
    }
    if (v[c]) {
      for (d = 0, e = U[c].length; d < e; d++) {
        if (a.to === U[c][d].square && v[c] & U[c][d].flag) {
          v[c] ^= U[c][d].flag;
          break;
        }
      }
    }
    N = a.flags & m.BIG_PAWN ? "b" === x ? a.to - 16 : a.to + 16 : -1;
    "p" === a.piece ? M = 0 : a.flags & (m.CAPTURE | m.EP_CAPTURE) ? M = 0 : M++;
    "b" === x && Q++;
    x = "w" === x ? "b" : "w";
  }
  function R() {
    var a = O.pop();
    if (null == a) {
      return null;
    }
    var b = a.move;
    D = a.kings;
    x = a.turn;
    v = a.castling;
    N = a.ep_square;
    M = a.half_moves;
    Q = a.move_number;
    a = x;
    var c = "w" === x ? "b" : "w";
    k[b.from] = k[b.to];
    k[b.from].type = b.piece;
    k[b.to] = null;
    b.flags & m.CAPTURE ? k[b.to] = {type:b.captured, color:c} : b.flags & m.EP_CAPTURE && (k["b" === a ? b.to - 16 : b.to + 16] = {type:"p", color:c});
    if (b.flags & (m.KSIDE_CASTLE | m.QSIDE_CASTLE)) {
      if (b.flags & m.KSIDE_CASTLE) {
        var d = b.to + 1, e = b.to - 1;
      } else {
        b.flags & m.QSIDE_CASTLE && (d = b.to - 2, e = b.to + 1);
      }
      k[d] = k[e];
      k[e] = null;
    }
    return b;
  }
  function ja(a, b) {
    var c = E(a);
    if (b) {
      var d = c.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/);
      if (d) {
        var e = d[1], l = d[2], g = d[3], r = d[4];
      }
    }
    for (var A = F(), t = 0, w = A.length; t < w; t++) {
      if (c === E(J(A[t])) || b && c === E(J(A[t], !0)) || !(!d || e && e.toLowerCase() != A[t].piece || u[l] != A[t].from || u[g] != A[t].to || r && r.toLowerCase() != A[t].promotion)) {
        return A[t];
      }
    }
    return null;
  }
  function I(a) {
    var b = a & 15;
    a >>= 4;
    return "abcdefgh".substring(b, b + 1) + "87654321".substring(a, a + 1);
  }
  function da(a) {
    a = ma(a);
    a.san = J(a, !1);
    a.to = I(a.to);
    a.from = I(a.from);
    var b = "", c;
    for (c in m) {
      m[c] & a.flags && (b += na[c]);
    }
    a.flags = b;
    return a;
  }
  function ma(a) {
    var b = a instanceof Array ? [] : {}, c;
    for (c in a) {
      b[c] = "object" === typeof c ? ma(a[c]) : a[c];
    }
    return b;
  }
  function oa(a) {
    for (var b = F({legal:!1}), c = 0, d = x, e = 0, l = b.length; e < l; e++) {
      K(b[e]);
      if (!L(d)) {
        if (0 < a - 1) {
          var g = oa(a - 1);
          c += g;
        } else {
          c++;
        }
      }
      R();
    }
    return c;
  }
  var ta = ["1-0", "0-1", "1/2-1/2", "*"], fa = {b:[16, 32, 17, 15], w:[-16, -32, -17, -15]}, la = {n:[-18, -33, -31, -14, 18, 33, 31, 14], b:[-17, -15, 17, 15], r:[-16, 1, 16, -1], q:[-17, -16, -15, 1, 17, 16, 15, -1], k:[-17, -16, -15, 1, 17, 16, 15, -1]}, qa = [20, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 20, 0, 0, 20, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 20, 0, 0, 0, 0, 24, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 24, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 24, 0, 0, 
  20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 2, 24, 2, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 53, 56, 53, 2, 0, 0, 0, 0, 0, 0, 24, 24, 24, 24, 24, 24, 56, 0, 56, 24, 24, 24, 24, 24, 24, 0, 0, 0, 0, 0, 0, 2, 53, 56, 53, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 2, 24, 2, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 24, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 24, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 24, 0, 0, 0, 0, 20, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 20, 0, 0, 20, 0, 0, 
  0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 20], sa = [17, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 15, 0, 0, 17, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 17, 0, 0, 0, 0, 16, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 17, 0, 0, 0, 16, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 0, 16, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 16, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 16, 15, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, -15, -16, -17, 0, 0, 0, 
  0, 0, 0, 0, 0, 0, 0, 0, 0, -15, 0, -16, 0, -17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -15, 0, 0, -16, 0, 0, -17, 0, 0, 0, 0, 0, 0, 0, 0, -15, 0, 0, 0, -16, 0, 0, 0, -17, 0, 0, 0, 0, 0, 0, -15, 0, 0, 0, 0, -16, 0, 0, 0, 0, -17, 0, 0, 0, 0, -15, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, -17, 0, 0, -15, 0, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, 0, -17], ra = {p:0, n:1, b:2, r:3, q:4, k:5}, na = {NORMAL:"n", CAPTURE:"c", BIG_PAWN:"b", EP_CAPTURE:"e", PROMOTION:"p", KSIDE_CASTLE:"k", QSIDE_CASTLE:"q"}, m = {NORMAL:1, 
  CAPTURE:2, BIG_PAWN:4, EP_CAPTURE:8, PROMOTION:16, KSIDE_CASTLE:32, QSIDE_CASTLE:64}, u = {a8:0, b8:1, c8:2, d8:3, e8:4, f8:5, g8:6, h8:7, a7:16, b7:17, c7:18, d7:19, e7:20, f7:21, g7:22, h7:23, a6:32, b6:33, c6:34, d6:35, e6:36, f6:37, g6:38, h6:39, a5:48, b5:49, c5:50, d5:51, e5:52, f5:53, g5:54, h5:55, a4:64, b4:65, c4:66, d4:67, e4:68, f4:69, g4:70, h4:71, a3:80, b3:81, c3:82, d3:83, e3:84, f3:85, g3:86, h3:87, a2:96, b2:97, c2:98, d2:99, e2:100, f2:101, g2:102, h2:103, a1:112, b1:113, c1:114, 
  d1:115, e1:116, f1:117, g1:118, h1:119}, U = {w:[{square:u.a1, flag:m.QSIDE_CASTLE}, {square:u.h1, flag:m.KSIDE_CASTLE}], b:[{square:u.a8, flag:m.QSIDE_CASTLE}, {square:u.h8, flag:m.KSIDE_CASTLE}]}, k = Array(128), D = {w:-1, b:-1}, x = "w", v = {w:0, b:0}, N = -1, M = 0, Q = 1, O = [], H = {}, B = {};
  "undefined" === typeof h ? z("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1") : z(h);
  return {WHITE:"w", BLACK:"b", PAWN:"p", KNIGHT:"n", BISHOP:"b", ROOK:"r", QUEEN:"q", KING:"k", SQUARES:function() {
    for (var a = [], b = u.a8; b <= u.h1; b++) {
      b & 136 ? b += 7 : a.push(I(b));
    }
    return a;
  }(), FLAGS:na, load:function(a) {
    return z(a);
  }, reset:function() {
    z("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  }, moves:function(a) {
    for (var b = F(a), c = [], d = 0, e = b.length; d < e; d++) {
      "undefined" !== typeof a && "verbose" in a && a.verbose ? c.push(da(b[d])) : c.push(J(b[d], !1));
    }
    return c;
  }, ugly_moves:function(a) {
    return F(a);
  }, in_check:function() {
    return L(x);
  }, in_checkmate:function() {
    return L(x) && 0 === F().length;
  }, in_stalemate:function() {
    return !L(x) && 0 === F().length;
  }, in_draw:function() {
    return 100 <= M || !L(x) && 0 === F().length || ha() || ia();
  }, insufficient_material:function() {
    return ha();
  }, in_threefold_repetition:function() {
    return ia();
  }, game_over:function() {
    return 100 <= M || L(x) && 0 === F().length || !L(x) && 0 === F().length || ha() || ia();
  }, validate_fen:function(a) {
    return y(a);
  }, fen:function() {
    return C();
  }, board:function() {
    for (var a = [], b = [], c = u.a8; c <= u.h1; c++) {
      null == k[c] ? b.push(null) : b.push({type:k[c].type, color:k[c].color}), c + 1 & 136 && (a.push(b), b = [], c += 8);
    }
    return a;
  }, pgn:function(a) {
    var b = "object" === typeof a && "string" === typeof a.newline_char ? a.newline_char : "\n", c = "object" === typeof a && "number" === typeof a.max_width ? a.max_width : 0, d = [];
    a = !1;
    for (var e in H) {
      d.push("[" + e + ' "' + H[e] + '"]' + b), a = !0;
    }
    a && O.length && d.push(b);
    e = function(t) {
      var w = B[C()];
      "undefined" !== typeof w && (t = "" + t + (0 < t.length ? " " : "") + "{" + w + "}");
      return t;
    };
    for (var l = []; 0 < O.length;) {
      l.push(R());
    }
    a = [];
    var g = "";
    for (0 === l.length && a.push(e("")); 0 < l.length;) {
      g = e(g);
      var r = l.pop();
      O.length || "b" !== r.color ? "w" === r.color && (g.length && a.push(g), g = Q + ".") : g = Q + ". ...";
      g = g + " " + J(r, !1);
      K(r);
    }
    g.length && a.push(e(g));
    "undefined" !== typeof H.Result && a.push(H.Result);
    if (0 === c) {
      return d.join("") + a.join(" ");
    }
    var A = function() {
      return 0 < d.length && " " === d[d.length - 1] ? (d.pop(), !0) : !1;
    };
    l = function(t, w) {
      for (var p = $jscomp.makeIterator(w.split(" ")), n = p.next(); !n.done; n = p.next()) {
        if (n = n.value) {
          if (t + n.length > c) {
            for (; A();) {
              t--;
            }
            d.push(b);
            t = 0;
          }
          d.push(n);
          t += n.length;
          d.push(" ");
          t++;
        }
      }
      A() && t--;
      return t;
    };
    for (e = g = 0; e < a.length; e++) {
      g + a[e].length > c && a[e].includes("{") ? g = l(g, a[e]) : (g + a[e].length > c && 0 !== e ? (" " === d[d.length - 1] && d.pop(), d.push(b), g = 0) : 0 !== e && (d.push(" "), g++), d.push(a[e]), g += a[e].length);
    }
    return d.join("");
  }, load_pgn:function(a, b) {
    function c(n) {
      return n.replace(/\\/g, "\\");
    }
    function d(n) {
      for (var G in n) {
        return !0;
      }
      return !1;
    }
    var e = "undefined" !== typeof b && "sloppy" in b ? b.sloppy : !1, l = "object" === typeof b && "string" === typeof b.newline_char ? b.newline_char : "\r?\n", g = new RegExp("^(\\[((?:" + c(l) + ")|.)*\\])(?:" + c(l) + "){2}");
    g = g.test(a) ? g.exec(a)[1] : "";
    z("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    var r = function(n, G) {
      for (var S = {}, ca = n.split(new RegExp(c("object" === typeof G && "string" === typeof G.newline_char ? G.newline_char : "\r?\n"))), W, X, Y = 0; Y < ca.length; Y++) {
        W = ca[Y].replace(/^\[([A-Z][A-Za-z]*)\s.*\]$/, "$1"), X = ca[Y].replace(/^\[[A-Za-z]+\s"(.*)" *\]$/, "$1"), 0 < W.replace(/^\s+|\s+$/g, "").length && (S[W] = X);
      }
      return S;
    }(g, b);
    for (w in r) {
      aa([w, r[w]]);
    }
    if ("1" === r.SetUp && !("FEN" in r && z(r.FEN, !0))) {
      return !1;
    }
    var A = function(n) {
      return Array.from(n).map(function(G) {
        return 128 > G.charCodeAt(0) ? G.charCodeAt(0).toString(16) : encodeURIComponent(G).replace(/%/g, "").toLowerCase();
      }).join("");
    }, t = function(n) {
      n = n.replace(new RegExp(c(l), "g"), " ");
      return "{" + A(n.slice(1, n.length - 1)) + "}";
    }, w = function(n) {
      if (n.startsWith("{") && n.endsWith("}")) {
        return n = n.slice(1, n.length - 1), 0 == n.length ? "" : decodeURIComponent("%" + n.match(/.{1,2}/g).join("%"));
      }
    };
    g = a.replace(g, "").replace(new RegExp("({[^}]*})+?|;([^" + c(l) + "]*)", "g"), function(n, G, S) {
      return void 0 !== G ? t(G) : " " + t("{" + S.slice(1) + "}");
    }).replace(new RegExp(c(l), "g"), " ");
    for (r = /(\([^\(\)]+\))+?/g; r.test(g);) {
      g = g.replace(r, "");
    }
    g = g.replace(/\d+\.(\.\.)?/g, "");
    g = g.replace(/\.\.\./g, "");
    g = g.replace(/\$\d+/g, "");
    g = g.replace(/^\s+|\s+$/g, "").split(new RegExp(/\s+/));
    g = g.join(",").replace(/,,+/g, ",").split(",");
    var p = "";
    for (r = 0; r < g.length - 1; r++) {
      if (p = w(g[r]), void 0 !== p) {
        B[C()] = p;
      } else {
        p = ja(g[r], e);
        if (null == p) {
          return !1;
        }
        K(p);
      }
    }
    p = w(g[g.length - 1]);
    void 0 !== p && (B[C()] = p, g.pop());
    p = g[g.length - 1];
    if (-1 < ta.indexOf(p)) {
      d(H) && "undefined" === typeof H.Result && aa(["Result", p]);
    } else {
      p = ja(p, e);
      if (null == p) {
        return !1;
      }
      K(p);
    }
    return !0;
  }, header:function() {
    return aa(arguments);
  }, ascii:function() {
    for (var a = "   +------------------------+\n", b = u.a8; b <= u.h1; b++) {
      0 === (b & 15) && (a += " " + "87654321"[b >> 4] + " |");
      if (null == k[b]) {
        a += " . ";
      } else {
        var c = k[b].type;
        c = "w" === k[b].color ? c.toUpperCase() : c.toLowerCase();
        a += " " + c + " ";
      }
      b + 1 & 136 && (a += "|\n", b += 8);
    }
    return a + "   +------------------------+\n     a  b  c  d  e  f  g  h\n";
  }, turn:function() {
    return x;
  }, move:function(a, b) {
    var c = "undefined" !== typeof b && "sloppy" in b ? b.sloppy : !1, d = null;
    if ("string" === typeof a) {
      d = ja(a, c);
    } else if ("object" === typeof a) {
      c = F();
      for (var e = 0, l = c.length; e < l; e++) {
        if (!(a.from !== I(c[e].from) || a.to !== I(c[e].to) || "promotion" in c[e] && a.promotion !== c[e].promotion)) {
          d = c[e];
          break;
        }
      }
    }
    if (!d) {
      return null;
    }
    c = da(d);
    K(d);
    return c;
  }, ugly_move:function(a, b) {
    var c = da(a);
    K(a);
    return c;
  }, undo:function() {
    var a = R();
    return a ? da(a) : null;
  }, clear:function() {
    return f();
  }, put:function(a, b) {
    return Z(a, b);
  }, get:function(a) {
    return ba(a);
  }, remove:function(a) {
    var b = ba(a);
    k[u[a]] = null;
    b && "k" === b.type && (D[b.color] = -1);
    P(C());
    return b;
  }, perft:function(a) {
    return oa(a);
  }, square_color:function(a) {
    return a in u ? (a = u[a], 0 === ((a >> 4) + (a & 15)) % 2 ? "light" : "dark") : null;
  }, history:function(a) {
    var b = [], c = [];
    a = "undefined" !== typeof a && "verbose" in a && a.verbose;
    for (; 0 < O.length;) {
      b.push(R());
    }
    for (; 0 < b.length;) {
      var d = b.pop();
      a ? c.push(da(d)) : c.push(J(d));
      K(d);
    }
    return c;
  }, get_comment:function() {
    return B[C()];
  }, set_comment:function(a) {
    B[C()] = a.replace("{", "[").replace("}", "]");
  }, delete_comment:function() {
    var a = B[C()];
    delete B[C()];
    return a;
  }, get_comments:function() {
    q();
    return Object.keys(B).map(function(a) {
      return {fen:a, comment:B[a]};
    });
  }, delete_comments:function() {
    q();
    return Object.keys(B).map(function(a) {
      var b = B[a];
      delete B[a];
      return {fen:a, comment:b};
    });
  }};
};
"undefined" !== typeof exports && (exports.Chess = Chess);
"undefined" !== typeof define && define(function() {
  return Chess;
});
$jscomp.arrayIterator = function(h) {
  return {next:$jscomp.arrayIteratorImpl(h)};
};
$jscomp.makeIterator = function(h) {
  var f = "undefined" != typeof Symbol && Symbol.iterator && h[Symbol.iterator];
  return f ? f.call(h) : $jscomp.arrayIterator(h);
};
var STACK_SIZE = 100, board = null, $board = $("#myBoard"), game = new Chess(), globalSum = 0, whiteSquareGrey = "#a9a9a9", blackSquareGrey = "#696969", squareClass = "square-55d63", squareToHighlight = null, colorToHighlight = null, positionCount, config = {draggable:!0, position:"start", onDragStart:onDragStart, onDrop:onDrop, onMouseoutSquare:onMouseoutSquare, onMouseoverSquare:onMouseoverSquare, onSnapEnd:onSnapEnd};
board = Chessboard("myBoard", config);
timer = null;
var weights = {p:100, n:280, b:320, r:479, q:929, k:6E4, k_e:6E4}, pst_w = {p:[[100, 100, 100, 100, 105, 100, 100, 100], [78, 83, 86, 73, 102, 82, 85, 90], [7, 29, 21, 44, 40, 31, 44, 7], [-17, 16, -2, 15, 14, 0, 15, -13], [-26, 3, 10, 9, 6, 1, 0, -23], [-22, 9, 5, -11, -10, -2, 3, -19], [-31, 8, -7, -37, -36, -14, 3, -31], [0, 0, 0, 0, 0, 0, 0, 0]], n:[[-66, -53, -75, -75, -10, -55, -58, -70], [-3, -6, 100, -36, 4, 62, -4, -14], [10, 67, 1, 74, 73, 27, 62, -2], [24, 24, 45, 37, 33, 41, 25, 17], 
[-1, 5, 31, 21, 22, 35, 2, 0], [-18, 10, 13, 22, 18, 15, 11, -14], [-23, -15, 2, 0, 2, 0, -23, -20], [-74, -23, -26, -24, -19, -35, -22, -69]], b:[[-59, -78, -82, -76, -23, -107, -37, -50], [-11, 20, 35, -42, -39, 31, 2, -22], [-9, 39, -32, 41, 52, -10, 28, -14], [25, 17, 20, 34, 26, 25, 15, 10], [13, 10, 17, 23, 17, 16, 0, 7], [14, 25, 24, 15, 8, 25, 20, 15], [19, 20, 11, 6, 7, 6, 20, 16], [-7, 2, -15, -12, -14, -15, -10, -10]], r:[[35, 29, 33, 4, 37, 33, 56, 50], [55, 29, 56, 67, 55, 62, 34, 60], 
[19, 35, 28, 33, 45, 27, 25, 15], [0, 5, 16, 13, 18, -4, -9, -6], [-28, -35, -16, -21, -13, -29, -46, -30], [-42, -28, -42, -25, -25, -35, -26, -46], [-53, -38, -31, -26, -29, -43, -44, -53], [-30, -24, -18, 5, -2, -18, -31, -32]], q:[[6, 1, -8, -104, 69, 24, 88, 26], [14, 32, 60, -10, 20, 76, 57, 24], [-2, 43, 32, 60, 72, 63, 43, 2], [1, -16, 22, 17, 25, 20, -13, -6], [-14, -15, -2, -5, -1, -10, -20, -22], [-30, -6, -13, -11, -16, -11, -16, -27], [-36, -18, 0, -19, -15, -15, -21, -38], [-39, -30, 
-31, -13, -31, -36, -34, -42]], k:[[4, 54, 47, -99, -99, 60, 83, -62], [-32, 10, 55, 56, 56, 55, 10, 3], [-62, 12, -57, 44, -67, 28, 37, -31], [-55, 50, 11, -4, -19, 13, 0, -49], [-55, -43, -52, -28, -51, -47, -8, -50], [-47, -42, -43, -79, -64, -32, -29, -32], [-4, 3, -14, -50, -57, -18, 13, 4], [17, 30, -3, -14, 6, -1, 40, 18]], k_e:[[-50, -40, -30, -20, -20, -30, -40, -50], [-30, -20, -10, 0, 0, -10, -20, -30], [-30, -10, 20, 30, 30, 20, -10, -30], [-30, -10, 30, 40, 40, 30, -10, -30], [-30, -10, 
30, 40, 40, 30, -10, -30], [-30, -10, 20, 30, 30, 20, -10, -30], [-30, -30, 0, 0, 0, 0, -30, -30], [-50, -30, -30, -30, -30, -30, -30, -50]]}, pst_b = {p:pst_w.p.slice().reverse(), n:pst_w.n.slice().reverse(), b:pst_w.b.slice().reverse(), r:pst_w.r.slice().reverse(), q:pst_w.q.slice().reverse(), k:pst_w.k.slice().reverse(), k_e:pst_w.k_e.slice().reverse()}, pstOpponent = {w:pst_b, b:pst_w}, pstSelf = {w:pst_w, b:pst_b};
function evaluateBoard(h, f, q, z) {
  if (h.in_checkmate()) {
    return f.color === z ? Math.pow(10, 10) : -Math.pow(10, 10);
  }
  if (h.in_draw() || h.in_threefold_repetition() || h.in_stalemate()) {
    return 0;
  }
  h.in_check() && (q = f.color === z ? q + 50 : q - 50);
  h = [8 - parseInt(f.from[1]), f.from.charCodeAt(0) - 97];
  var y = [8 - parseInt(f.to[1]), f.to.charCodeAt(0) - 97];
  -1500 > q && "k" === f.piece && (f.piece = "k_e");
  "captured" in f && (q = f.color === z ? q + (weights[f.captured] + pstOpponent[f.color][f.captured][y[0]][y[1]]) : q - (weights[f.captured] + pstSelf[f.color][f.captured][y[0]][y[1]]));
  f.flags.includes("p") ? (f.promotion = "q", f.color === z ? (q -= weights[f.piece] + pstSelf[f.color][f.piece][h[0]][h[1]], q += weights[f.promotion] + pstSelf[f.color][f.promotion][y[0]][y[1]]) : (q += weights[f.piece] + pstSelf[f.color][f.piece][h[0]][h[1]], q -= weights[f.promotion] + pstSelf[f.color][f.promotion][y[0]][y[1]])) : f.color !== z ? (q += pstSelf[f.color][f.piece][h[0]][h[1]], q -= pstSelf[f.color][f.piece][y[0]][y[1]]) : (q -= pstSelf[f.color][f.piece][h[0]][h[1]], q += pstSelf[f.color][f.piece][y[0]][y[1]]);
  return q;
}
function minimax(h, f, q, z, y, C, aa) {
  positionCount++;
  var P = h.ugly_moves({verbose:!0});
  P.sort(function(T, L) {
    return .5 - Math.random();
  });
  if (0 === f || 0 === P.length) {
    return [null, C];
  }
  for (var ba = Number.NEGATIVE_INFINITY, Z = Number.POSITIVE_INFINITY, V, F = 0; F < P.length; F++) {
    var J = P[F];
    J = h.ugly_move(J);
    var E = evaluateBoard(h, J, C, aa);
    E = $jscomp.makeIterator(minimax(h, f - 1, q, z, !y, E, aa));
    E.next();
    E = E.next().value;
    h.undo();
    y ? (E > ba && (ba = E, V = J), E > q && (q = E)) : (E < Z && (Z = E, V = J), E < z && (z = E));
    if (q >= z) {
      break;
    }
  }
  return y ? [V, ba] : [V, Z];
}
function checkStatus(h) {
  if (game.in_checkmate()) {
    $("#status").html("<b>Checkmate!</b> Oops, <b>" + h + "</b> lost.");
  } else if (game.insufficient_material()) {
    $("#status").html("It's a <b>draw!</b> (Insufficient Material)");
  } else if (game.in_threefold_repetition()) {
    $("#status").html("It's a <b>draw!</b> (Threefold Repetition)");
  } else if (game.in_stalemate()) {
    $("#status").html("It's a <b>draw!</b> (Stalemate)");
  } else if (game.in_draw()) {
    $("#status").html("It's a <b>draw!</b> (50-move Rule)");
  } else {
    return game.in_check() ? $("#status").html("Oops, <b>" + h + "</b> is in <b>check!</b>") : $("#status").html("No check, checkmate, or draw."), !1;
  }
  return !0;
}
function updateAdvantage() {
  0 < globalSum ? ($("#advantageColor").text("Black"), $("#advantageNumber").text(globalSum)) : 0 > globalSum ? ($("#advantageColor").text("White"), $("#advantageNumber").text(-globalSum)) : ($("#advantageColor").text("Neither side"), $("#advantageNumber").text(globalSum));
  $("#advantageBar").attr({"aria-valuenow":"" + -globalSum, style:"width: " + (-globalSum + 2E3) / 4E3 * 100 + "%"});
}
function getBestMove(h, f, q) {
  positionCount = 0;
  var z = "b" === f ? parseInt($("#search-depth").find(":selected").text()) : parseInt($("#search-depth-white").find(":selected").text()), y = (new Date()).getTime();
  f = $jscomp.makeIterator(minimax(h, z, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, !0, q, f));
  h = f.next().value;
  f = f.next().value;
  y = (new Date()).getTime() - y;
  q = 1E3 * positionCount / y;
  $("#position-count").text(positionCount);
  $("#time").text(y / 1E3);
  $("#positions-per-s").text(Math.round(q));
  return [h, f];
}
function makeBestMove(h) {
  var f = "b" === h ? getBestMove(game, h, globalSum)[0] : getBestMove(game, h, -globalSum)[0];
  globalSum = evaluateBoard(game, f, globalSum, "b");
  updateAdvantage();
  game.move(f);
  board.position(game.fen());
  "b" === h ? (checkStatus("black"), $board.find("." + squareClass).removeClass("highlight-black"), $board.find(".square-" + f.from).addClass("highlight-black"), squareToHighlight = f.to, colorToHighlight = "black") : (checkStatus("white"), $board.find("." + squareClass).removeClass("highlight-white"), $board.find(".square-" + f.from).addClass("highlight-white"), squareToHighlight = f.to, colorToHighlight = "white");
  $board.find(".square-" + squareToHighlight).addClass("highlight-" + colorToHighlight);
}
function compVsComp(h) {
  checkStatus({w:"white", b:"black"}[h]) || (timer = window.setTimeout(function() {
    makeBestMove(h);
    h = "w" === h ? "b" : "w";
    compVsComp(h);
  }, 250));
}
function reset() {
  game.reset();
  globalSum = 0;
  $board.find("." + squareClass).removeClass("highlight-white");
  $board.find("." + squareClass).removeClass("highlight-black");
  $board.find("." + squareClass).removeClass("highlight-hint");
  board.position(game.fen());
  $("#advantageColor").text("Neither side");
  $("#advantageNumber").text(globalSum);
  timer && (clearTimeout(timer), timer = null);
}
$("#ruyLopezBtn").on("click", function() {
  reset();
  game.load("r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1");
  board.position(game.fen());
  window.setTimeout(function() {
    makeBestMove("b");
  }, 250);
});
$("#italianGameBtn").on("click", function() {
  reset();
  game.load("r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1");
  board.position(game.fen());
  window.setTimeout(function() {
    makeBestMove("b");
  }, 250);
});
$("#sicilianDefenseBtn").on("click", function() {
  reset();
  game.load("rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1");
  board.position(game.fen());
});
$("#startBtn").on("click", function() {
  reset();
});
$("#compVsCompBtn").on("click", function() {
  reset();
  compVsComp("w");
});
$("#resetBtn").on("click", function() {
  reset();
});
var undo_stack = [];
function undo() {
  var h = game.undo();
  undo_stack.push(h);
  undo_stack.length > STACK_SIZE && undo_stack.shift();
  board.position(game.fen());
}
$("#undoBtn").on("click", function() {
  2 <= game.history().length ? ($board.find("." + squareClass).removeClass("highlight-white"), $board.find("." + squareClass).removeClass("highlight-black"), $board.find("." + squareClass).removeClass("highlight-hint"), undo(), window.setTimeout(function() {
    undo();
    window.setTimeout(function() {
      showHint();
    }, 250);
  }, 250)) : alert("Nothing to undo.");
});
function redo() {
  game.move(undo_stack.pop());
  board.position(game.fen());
}
$("#redoBtn").on("click", function() {
  2 <= undo_stack.length ? (redo(), window.setTimeout(function() {
    redo();
    window.setTimeout(function() {
      showHint();
    }, 250);
  }, 250)) : alert("Nothing to redo.");
});
$("#showHint").change(function() {
  window.setTimeout(showHint, 250);
});
function showHint() {
  var h = document.getElementById("showHint");
  $board.find("." + squareClass).removeClass("highlight-hint");
  h.checked && (h = getBestMove(game, "w", -globalSum)[0], $board.find(".square-" + h.from).addClass("highlight-hint"), $board.find(".square-" + h.to).addClass("highlight-hint"));
}
function removeGreySquares() {
  $("#myBoard .square-55d63").css("background", "");
}
function greySquare(h) {
  h = $("#myBoard .square-" + h);
  var f = whiteSquareGrey;
  h.hasClass("black-3c85d") && (f = blackSquareGrey);
  h.css("background", f);
}
function onDragStart(h, f) {
  if (game.game_over() || "w" === game.turn() && -1 !== f.search(/^b/) || "b" === game.turn() && -1 !== f.search(/^w/)) {
    return !1;
  }
}
function onDrop(h, f) {
  undo_stack = [];
  removeGreySquares();
  var q = game.move({from:h, to:f, promotion:"q"});
  if (null === q) {
    return "snapback";
  }
  globalSum = evaluateBoard(game, q, globalSum, "b");
  updateAdvantage();
  $board.find("." + squareClass).removeClass("highlight-white");
  $board.find(".square-" + q.from).addClass("highlight-white");
  squareToHighlight = q.to;
  colorToHighlight = "white";
  $board.find(".square-" + squareToHighlight).addClass("highlight-" + colorToHighlight);
  checkStatus("black");
  window.setTimeout(function() {
    makeBestMove("b");
    window.setTimeout(function() {
      showHint();
    }, 250);
  }, 250);
}
function onMouseoverSquare(h, f) {
  var q = game.moves({square:h, verbose:!0});
  if (0 !== q.length) {
    greySquare(h);
    for (var z = 0; z < q.length; z++) {
      greySquare(q[z].to);
    }
  }
}
function onMouseoutSquare(h, f) {
  removeGreySquares();
}
function onSnapEnd() {
  board.position(game.fen());
}
;