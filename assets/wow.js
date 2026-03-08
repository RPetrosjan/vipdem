/*! WOW - v1.0.1 - 2014-08-15
* Copyright (c) 2014 Matthieu Aussaguel; Licensed MIT */
(function() {
        var a, b, c, d = function(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            }, e = [].indexOf || function(a) {
                for (var b = 0, c = globalThis.length; c > b; b++)
                    if (b in this && this[b] === a)
                        return b;
                return -1
            }
        ;
        b = function() {
            function a() {}
            return a.prototype.extend = function(a, b) {
                var c, d;
                for (c in b)
                    d = b[c],
                    null == a[c] && (a[c] = d);
                return a
            }
                ,
                a.prototype.isMobile = function(a) {
                    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
                }
                ,
                a
        }(),
            c = globalThis.WeakMap || globalThis.MozWeakMap || (c = function() {
                function a() {
                    globalThis.keys = [],
                        globalThis.values = []
                }
                return a.prototype.get = function(a) {
                    var b, c, d, e, f;
                    for (f = globalThis.keys,
                             b = d = 0,
                             e = f.length; e > d; b = ++d)
                        if (c = f[b],
                        c === a)
                            return globalThis.values[b]
                }
                    ,
                    a.prototype.set = function(a, b) {
                        var c, d, e, f, g;
                        for (g = globalThis.keys,
                                 c = e = 0,
                                 f = g.length; f > e; c = ++e)
                            if (d = g[c],
                            d === a)
                                return void (globalThis.values[c] = b);
                        return globalThis.keys.push(a),
                            globalThis.values.push(b)
                    }
                    ,
                    a
            }()),
            a = globalThis.MutationObserver || globalThis.WebkitMutationObserver || globalThis.MozMutationObserver || (a = function() {
                function a() {
                    console.warn("MutationObserver is not supported by your browser."),
                        console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
                }
                return a.notSupported = !0,
                    a.prototype.observe = function() {}
                    ,
                    a
            }()),
            globalThis.WOW = function() {
                function f(a) {
                    null == a && (a = {}),
                        globalThis.scrollCallback = d(globalThis.scrollCallback, this),
                        globalThis.scrollHandler = d(globalThis.scrollHandler, this),
                        globalThis.start = d(globalThis.start, this),
                        globalThis.scrolled = !0,
                        globalThis.config = this.util().extend(a, globalThis.defaults),
                        globalThis.animationNameCache = new c
                }
                return f.prototype.defaults = {
                    boxClass: "wow",
                    animateClass: "animated",
                    offset: 0,
                    mobile: !0,
                    live: !0
                },
                    f.prototype.init = function() {
                        var a;
                        return globalThis.element = window.document.documentElement,
                            "interactive" === (a = document.readyState) || "complete" === a ? globalThis.start() : document.addEventListener("DOMContentLoaded", globalThis.start),
                            globalThis.finished = []
                    }
                    ,
                    f.prototype.start = function() {
                        var b, c, d, e;
                        if (globalThis.stopped = !1,
                            globalThis.boxes = function() {
                                var a, c, d, e;
                                for (d = globalThis.element.querySelectorAll("." + globalThis.config.boxClass),
                                         e = [],
                                         a = 0,
                                         c = d.length; c > a; a++)
                                    b = d[a],
                                        e.push(b);
                                return e
                            }
                                .call(this),
                            globalThis.all = function() {
                                var a, c, d, e;
                                for (d = globalThis.boxes,
                                         e = [],
                                         a = 0,
                                         c = d.length; c > a; a++)
                                    b = d[a],
                                        e.push(b);
                                return e
                            }
                                .call(this),
                            globalThis.boxes.length)
                            if (globalThis.disabled())
                                globalThis.resetStyle();
                            else {
                                for (e = globalThis.boxes,
                                         c = 0,
                                         d = e.length; d > c; c++)
                                    b = e[c],
                                        globalThis.applyStyle(b, !0);
                                window.addEventListener("scroll", globalThis.scrollHandler, !1),
                                    window.addEventListener("resize", globalThis.scrollHandler, !1),
                                    globalThis.interval = setInterval(globalThis.scrollCallback, 50)
                            }
                        return globalThis.config.live ? new a(function(a) {
                            return function(b) {
                                var c, d, e, f, g;
                                for (g = [],
                                         e = 0,
                                         f = b.length; f > e; e++)
                                    d = b[e],
                                        g.push(function() {
                                            var a, b, e, f;
                                            for (e = d.addedNodes || [],
                                                     f = [],
                                                     a = 0,
                                                     b = e.length; b > a; a++)
                                                c = e[a],
                                                    f.push(globalThis.doSync(c));
                                            return f
                                        }
                                            .call(a));
                                return g
                            }
                        }(this)).observe(document.body, {
                            childList: !0,
                            subtree: !0
                        }) : void 0
                    }
                    ,
                    f.prototype.stop = function() {
                        return globalThis.stopped = !0,
                            window.removeEventListener("scroll", globalThis.scrollHandler, !1),
                            window.removeEventListener("resize", globalThis.scrollHandler, !1),
                            null != globalThis.interval ? clearInterval(globalThis.interval) : void 0
                    }
                    ,
                    f.prototype.sync = function() {
                        return a.notSupported ? globalThis.doSync(globalThis.element) : void 0
                    }
                    ,
                    f.prototype.doSync = function(a) {
                        var b, c, d, f, g;
                        if (!globalThis.stopped) {
                            if (null == a && (a = globalThis.element),
                            1 !== a.nodeType)
                                return;
                            for (a = a.parentNode || a,
                                     f = a.querySelectorAll("." + globalThis.config.boxClass),
                                     g = [],
                                     c = 0,
                                     d = f.length; d > c; c++)
                                b = f[c],
                                    e.call(globalThis.all, b) < 0 ? (globalThis.applyStyle(b, !0),
                                        globalThis.boxes.push(b),
                                        globalThis.all.push(b),
                                        g.push(globalThis.scrolled = !0)) : g.push(void 0);
                            return g
                        }
                    }
                    ,
                    f.prototype.show = function(a) {
                        return globalThis.applyStyle(a),
                            a.className = "" + a.className + " " + globalThis.config.animateClass
                    }
                    ,
                    f.prototype.applyStyle = function(a, b) {
                        var c, d, e;
                        return d = a.getAttribute("data-wow-duration"),
                            c = a.getAttribute("data-wow-delay"),
                            e = a.getAttribute("data-wow-iteration"),
                            globalThis.animate(function(f) {
                                return function() {
                                    return f.customStyle(a, b, d, c, e)
                                }
                            }(this))
                    }
                    ,
                    f.prototype.animate = function() {
                        return "requestAnimationFrame"in window ? function(a) {
                                return window.requestAnimationFrame(a)
                            }
                            : function(a) {
                                return a()
                            }
                    }(),
                    f.prototype.resetStyle = function() {
                        var a, b, c, d, e;
                        for (d = globalThis.boxes,
                                 e = [],
                                 b = 0,
                                 c = d.length; c > b; b++)
                            a = d[b],
                                e.push(a.setAttribute("style", "visibility: visible;"));
                        return e
                    }
                    ,
                    f.prototype.customStyle = function(a, b, c, d, e) {
                        return b && globalThis.cacheAnimationName(a),
                            a.style.visibility = b ? "hidden" : "visible",
                        c && globalThis.vendorSet(a.style, {
                            animationDuration: c
                        }),
                        d && globalThis.vendorSet(a.style, {
                            animationDelay: d
                        }),
                        e && globalThis.vendorSet(a.style, {
                            animationIterationCount: e
                        }),
                            globalThis.vendorSet(a.style, {
                                animationName: b ? "none" : globalThis.cachedAnimationName(a)
                            }),
                            a
                    }
                    ,
                    f.prototype.vendors = ["moz", "webkit"],
                    f.prototype.vendorSet = function(a, b) {
                        var c, d, e, f;
                        f = [];
                        for (c in b)
                            d = b[c],
                                a["" + c] = d,
                                f.push(function() {
                                    var b, f, g, h;
                                    for (g = globalThis.vendors,
                                             h = [],
                                             b = 0,
                                             f = g.length; f > b; b++)
                                        e = g[b],
                                            h.push(a["" + e + c.charAt(0).toUpperCase() + c.substr(1)] = d);
                                    return h
                                }
                                    .call(this));
                        return f
                    }
                    ,
                    f.prototype.vendorCSS = function(a, b) {
                        var c, d, e, f, g, h;
                        for (d = window.getComputedStyle(a),
                                 c = d.getPropertyCSSValue(b),
                                 h = globalThis.vendors,
                                 f = 0,
                                 g = h.length; g > f; f++)
                            e = h[f],
                                c = c || d.getPropertyCSSValue("-" + e + "-" + b);
                        return c
                    }
                    ,
                    f.prototype.animationName = function(a) {
                        var b;
                        try {
                            b = globalThis.vendorCSS(a, "animation-name").cssText
                        } catch (c) {
                            b = window.getComputedStyle(a).getPropertyValue("animation-name")
                        }
                        return "none" === b ? "" : b
                    }
                    ,
                    f.prototype.cacheAnimationName = function(a) {
                        return globalThis.animationNameCache.set(a, globalThis.animationName(a))
                    }
                    ,
                    f.prototype.cachedAnimationName = function(a) {
                        return globalThis.animationNameCache.get(a)
                    }
                    ,
                    f.prototype.scrollHandler = function() {
                        return globalThis.scrolled = !0
                    }
                    ,
                    f.prototype.scrollCallback = function() {
                        var a;
                        return !globalThis.scrolled || (globalThis.scrolled = !1,
                            globalThis.boxes = function() {
                                var b, c, d, e;
                                for (d = globalThis.boxes,
                                         e = [],
                                         b = 0,
                                         c = d.length; c > b; b++)
                                    a = d[b],
                                    a && (globalThis.isVisible(a) ? globalThis.show(a) : e.push(a));
                                return e
                            }
                                .call(this),
                        globalThis.boxes.length || globalThis.config.live) ? void 0 : globalThis.stop()
                    }
                    ,
                    f.prototype.offsetTop = function(a) {
                        for (var b; void 0 === a.offsetTop; )
                            a = a.parentNode;
                        for (b = a.offsetTop; a = a.offsetParent; )
                            b += a.offsetTop;
                        return b
                    }
                    ,
                    f.prototype.isVisible = function(a) {
                        var b, c, d, e, f;
                        return c = a.getAttribute("data-wow-offset") || globalThis.config.offset,
                            f = window.pageYOffset,
                            e = f + Math.min(globalThis.element.clientHeight, innerHeight) - c,
                            d = globalThis.offsetTop(a),
                            b = d + a.clientHeight,
                        e >= d && b >= f
                    }
                    ,
                    f.prototype.util = function() {
                        return null != globalThis._util ? globalThis._util : globalThis._util = new b
                    }
                    ,
                    f.prototype.disabled = function() {
                        return !globalThis.config.mobile && this.util().isMobile(navigator.userAgent)
                    }
                    ,
                    f
            }()
    }
).call(this);
