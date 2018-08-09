jQuery(function(b) {
    function l(e) {
        "resize" === e.type && (b(h.BODY).removeClass(g.DROPDOWN_OPEN), b(h.BASE).removeClass(g.OPENED).find(h.TOGGLER).each(function() {
            b(b(this).attr("data-target")).removeClass(g.IN).add(this).attr("aria-expanded", "false")
        }));
        var a = b(this).scrollTop();
        b(h.BASE).each(function() {
            b(this).is(h.FIXED_TOP) && (b(this).is(h.TRANSPARENT) && !b(this).hasClass(g.OPENED) && (0 < a ? b(this).removeClass(g.BG_COLOR) : b(this).addClass(g.BG_COLOR)), 0 < a ? b(this).addClass(g.SHORT) : b(this).removeClass(g.SHORT))
        })
    }
    var f, g = {
            IN: "in",
            OPENED: "opened",
            BG_COLOR: "bg-color",
            DROPDOWN_OPEN: "navbar-dropdown-open",
            SHORT: "navbar-short"
        },
        h = {
            BODY: "body",
            BASE: ".navbar-dropdown",
            TOGGLER: '.navbar-toggler[aria-expanded="true"]',
            TRANSPARENT: ".transparent",
            FIXED_TOP: ".navbar-fixed-top"
        };
    b(window).on("scroll.bs.navbar-dropdown.data-api resize.bs.navbar-dropdown.data-api", function(b) {
        clearTimeout(f);
        f = setTimeout(function() {
            l(b)
        }, 10)
    }).trigger("scroll.bs.navbar-dropdown.data-api");
    b(document).on("show.bs.collapse hide.bs.collapse",
        function(e) {
            b(e.target).closest(h.BASE).each(function() {
                "show" == e.type ? (b(h.BODY).addClass(g.DROPDOWN_OPEN), b(this).addClass(g.OPENED).removeClass(g.SHORT).removeClass(g.BG_COLOR)) : (b(h.BODY).removeClass(g.DROPDOWN_OPEN), b(this).addClass(g.BG_COLOR).removeClass(g.OPENED), b(window).trigger("scroll.bs.navbar-dropdown.data-api"))
            })
        }).on("collapse.bs.nav-dropdown", function(e) {
        b(e.relatedTarget).closest(h.BASE).find(h.TOGGLER).trigger("click")
    })
});
(function(b) {
    var l = b.fn.navDropdown,
        f = {
            ESC: 27,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        },
        g = {
            XS: 544,
            SM: 801,
            MD: 992,
            LG: 1200,
            XL: 1 / 0
        },
        h = function() {
            function a(a, d) {
                "length" in a || (a = [a]);
                this.props = {};
                this.length = a.length;
                d && (this.prevItem = d, b.extend(this.props, d.props));
                for (var k = 0; k < a.length; k++) this[k] = a[k]
            }
            return a.prototype.eq = function(b) {
                    return new a(this[b] ? this[b] : [], this)
                }, a.prototype.parent = function() {
                    return new a(b(this).map(function() {
                        var c = new a(this);
                        return c.is(":upper") ? null : b(c.is(":toggle") ? this.parentNode.parentNode :
                            this).closest(".dropdown").find('>[data-toggle="dropdown-submenu"]')[0]
                    }), this)
                }, a.prototype.parents = function(c) {
                    var d = b(this).map(function() {
                        return (new a(this)).is(":toggle") ? this.parentNode : this
                    }).parentsUntil(".nav-dropdown", ".dropdown");
                    return ":upper" === c && (d = d.last()), d = d.find('>[data-toggle="dropdown-submenu"]'), new a(d, this)
                }, a.prototype.children = function(c) {
                    var d = [];
                    return b(this).each(function() {
                        var k, e = new a(this);
                        if (e.is(":root")) k = b(this);
                        else {
                            if (!e.is(":toggle")) return;
                            k = b(this).parent().find(">.dropdown-menu")
                        }(c ?
                            k.find("a") : e.is(":root") ? k.find(">li>a") : k.find(">a, >.dropdown>a")).each(function() {
                            c && !this.offsetWidth && !this.offsetHeight || this.disabled || b(this).is("[data-button]") || b(this).hasClass("disabled") || ~b.inArray(this, d) || d.push(this)
                        })
                    }), new a(d, this)
                }, a.prototype.root = function() {
                    return new a(b(this).closest(".nav-dropdown"), this)
                }, a.prototype.jump = function(c) {
                    if (c = c || "next", !this.length) return new a([], this);
                    var d;
                    d = this.eq(0);
                    d = this.is(":flat") || d.is(":upper") ? d.root().children(this.is(":flat")) :
                        d.parent().children();
                    var e = b.inArray(this[0], d);
                    if (!d.length || !~e) return new a([], this);
                    if ("next" == c) {
                        if (e += 1, e < d.length) return new a(d[e], this);
                        c = "first"
                    } else if ("prev" == c) {
                        if (--e, 0 <= e) return new a(d[e], this);
                        c = "last"
                    }
                    return "first" == c ? new a(d[0], this) : "last" == c ? new a(d[d.length - 1], this) : new a([], this)
                }, a.prototype.next = function() {
                    return this.jump("next")
                }, a.prototype.prev = function() {
                    return this.jump("prev")
                }, a.prototype.first = function() {
                    return this.jump("first")
                }, a.prototype.last = function() {
                    return this.jump("last")
                },
                a.prototype.prop = function(a, d) {
                    return arguments.length ? 1 < arguments.length ? (this.props[a] = d, this) : "object" == typeof arguments[0] ? (b.extend(this.props, arguments[0]), this) : a in this.props ? this.props[a] : null : b.extend({}, this.props)
                }, a.prototype.removeProp = function(a) {
                    return delete this.props[a], this
                }, a.prototype.is = function(a) {
                    for (var d = b(this), e = (a || "").split(/(?=[*#.\[:\s])/); a = e.pop();) switch (a) {
                        case ":root":
                            if (!d.is(".nav-dropdown")) return !1;
                            break;
                        case ":upper":
                            if (!d.parent().parent().is(".nav-dropdown")) return !1;
                            break;
                        case ":opened":
                        case ":closed":
                            if (":opened" == a != d.parent().hasClass("open")) return !1;
                        case ":toggle":
                            if (!d.is('[data-toggle="dropdown-submenu"]')) return !1;
                            break;
                        default:
                            if (!this.props[a]) return !1
                    }
                    return !0
                }, a.prototype.open = function() {
                    return this.is(":closed") && this.click(), this
                }, a.prototype.close = function() {
                    return this.is(":opened") && this.click(), this
                }, a.prototype.focus = function() {
                    return this.length && this[0].focus(), this
                }, a.prototype.click = function() {
                    return this.length && b(this[0]).trigger("click"),
                        this
                },
                function(b) {
                    return new a(b)
                }
        }(),
        e = function(a) {
            this._element = a;
            b(this._element).on("click.bs.nav-dropdown", this.toggle)
        };
    e.prototype.toggle = function(a) {
        if (this.disabled || b(this).hasClass("disabled")) return !1;
        a = b(this.parentNode);
        var c = a.hasClass("open"),
            d = e._isCollapsed(b(this).closest(".nav-dropdown"));
        if (e._clearMenus(b.Event("click", {
                target: this,
                toggles: d ? [this] : null
            })), c) return !1;
        "ontouchstart" in document.documentElement && !a.closest(".dropdown.open").length && (c = document.createElement("div"),
            c.className = "dropdown-backdrop", c.style.background = "transparent", b(c).insertBefore(b(this).closest(".nav-dropdown")), b(c).on("click", e._clearMenus));
        c = {
            relatedTarget: this
        };
        d = b.Event("show.bs.nav-dropdown", c);
        return a.trigger(d), d.isDefaultPrevented() ? !1 : (this.focus(), this.setAttribute("aria-expanded", "true"), a.toggleClass("open"), a.trigger(b.Event("shown.bs.nav-dropdown", c)), !1)
    };
    e.prototype.dispose = function() {
        b.removeData(this._element, "bs.nav-dropdown");
        b(this._element).off(".bs.nav-dropdown");
        this._element = null
    };
    e._clearMenus = function(a) {
        if (a = a || {}, 3 !== a.which) {
            var c;
            if (this === document) {
                var d = b(a.target).closest(".nav-dropdown");
                if (d[0] || !b(a.target).is(".navbar") && !b(a.target).parent().is(".navbar") || (d = b(a.target).find(".nav-dropdown")), b(a.target).is('a:not([disabled], .disabled, [data-toggle="dropdown-submenu"])')) c = a.target;
                else if (e._isCollapsed(d)) return void b(document).trigger(b.Event("collapse.bs.nav-dropdown", {
                    relatedTarget: d[0]
                }))
            } else a.target && b(a.target).hasClass("dropdown-backdrop") &&
                (d = b(a.target).next(), d.is(".nav-dropdown") && e._isCollapsed(d) && (c = d[0]));
            d = function() {
                return !1
            };
            if (a.target && b(a.target).is('[data-toggle="dropdown-submenu"]')) d = b(a.target.parentNode).parents(".dropdown").find('>[data-toggle="dropdown-submenu"]');
            else {
                var f = b(".dropdown-backdrop")[0];
                f && f.parentNode.removeChild(f)
            }
            d = a.toggles || b.makeArray(b('[data-toggle="dropdown-submenu"]').not(d));
            for (f = 0; f < d.length; f++) {
                var g = d[f].parentNode,
                    h = {
                        relatedTarget: d[f]
                    };
                if (b(g).hasClass("open") && ("click" !== a.type ||
                        !/input|textarea/i.test(a.target.tagName) || !b.contains(g, a.target))) {
                    var l = b.Event("hide.bs.nav-dropdown", h);
                    b(g).trigger(l);
                    l.isDefaultPrevented() || (d[f].setAttribute("aria-expanded", "false"), b(g).removeClass("open").trigger(b.Event("hidden.bs.nav-dropdown", h)))
                }
            }
            c && b(document).trigger(b.Event("collapse.bs.nav-dropdown", {
                relatedTarget: c
            }))
        }
    };
    e._dataApiKeydownHandler = function(a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            var c, d;
            for (d in f)
                if (c = f[d] === a.which) break;
            if (c) {
                if (a.preventDefault(),
                    a.stopPropagation(), a.which == f.ESC) {
                    if (e._isCollapsed(this)) return;
                    a = b(a.target).parents(".dropdown.open").last().find('>[data-toggle="dropdown-submenu"]');
                    return e._clearMenus(), void a.trigger("focus")
                }
                "A" == a.target.tagName && (c = h(a.target), (c.prop(":flat", e._isCollapsed(c.root())), c.is(":flat")) ? a.which === f.DOWN || a.which === f.UP ? c[a.which === f.UP ? "prev" : "next"]().focus() : a.which === f.LEFT ? c.is(":opened") ? c.close() : c.parent().close().focus() : a.which === f.RIGHT && c.is(":toggle") && c.open() : c.is(":upper") ?
                    a.which === f.LEFT || a.which === f.RIGHT ? (c[a.which === f.LEFT ? "prev" : "next"]().focus().open(), c.is(":toggle") && c.close()) : a.which !== f.DOWN && a.which !== f.UP || !c.is(":toggle") || c.children()[a.which === f.DOWN ? "first" : "last"]().focus() : a.which === f.LEFT ? (a = c.parent(), a.is(":upper") ? a.close().prev().focus().open() : a.focus().close()) : a.which === f.RIGHT ? (a = c.children(), a.length ? (c.open(), a.first().focus()) : c.parents(":upper").close().next().focus().open()) : a.which !== f.DOWN && a.which !== f.UP || c[a.which === f.UP ? "prev" :
                        "next"]().focus())
            }
        }
    };
    e._isCollapsed = function(a) {
        var b;
        return a.length && (a = a[0]), a && (b = /navbar-toggleable-(xs|sm|md|lg|xl)/.exec(a.className)) && window.innerWidth < g[b[1].toUpperCase()]
    };
    e._dataApiResizeHandler = function() {
        b(".nav-dropdown").each(function() {
            var a = e._isCollapsed(this);
            b(this).find(".dropdown").removeClass("open");
            b(this).find('[aria-expanded="true"]').attr("aria-expanded", "false");
            var c = b(".dropdown-backdrop")[0];
            c && c.parentNode.removeChild(c);
            a != b(this).hasClass("nav-dropdown-sm") &&
                (a ? b(this).addClass("nav-dropdown-sm") : b(this).removeClass("nav-dropdown-sm"))
        })
    };
    b.fn.navDropdown = function(a) {
        return this.each(function() {
            var c = b(this).data("bs.nav-dropdown");
            if (c || b(this).data("bs.nav-dropdown", c = new e(this)), "string" == typeof a) {
                if (void 0 === c[a]) throw Error('No method named "' + a + '"');
                c[a].call(this)
            }
        })
    };
    b.fn.navDropdown.noConflict = function() {
        return b.fn.navDropdown = l, this
    };
    b.fn.navDropdown.Constructor = e;
    b.fn.navDropdown.$$ = h;
    b(window).on("resize.bs.nav-dropdown.data-api load.bs.nav-dropdown.data-api",
        e._dataApiResizeHandler);
    b(document).on("keydown.bs.nav-dropdown.data-api", ".nav-dropdown", e._dataApiKeydownHandler).on("click.bs.nav-dropdown.data-api", e._clearMenus).on("click.bs.nav-dropdown.data-api", '[data-toggle="dropdown-submenu"]', e.prototype.toggle).on("click.bs.nav-dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    });
    b(window).trigger("ready.bs.nav-dropdown")


    $('.nav-service').mouseenter(function(){
      $('.dropdown-service-menu').show();
    });

    $('.nav-service').mouseleave(function(){
      $('.dropdown-service-menu').hide();
    });

    $(window).scroll(function() {
      var ST = $(document).scrollTop();
      if(ST == 0){
        $('.enlarge-logo').addClass('animate-logo');
        $('.navbar-scroll').addClass('navbar-transparent');
      }else {
        $('.enlarge-logo').removeClass('animate-logo');
        $('.navbar-scroll').removeClass('navbar-transparent');
      }
    })
})(jQuery);
