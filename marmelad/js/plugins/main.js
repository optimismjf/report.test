! function(t, e, i, s) {
	function n(e, i) {
			this.settings = null, this.options = t.extend({}, n.Defaults, i), this.$element = t(e), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
					time: null,
					target: null,
					pointer: null,
					stage: {
							start: null,
							current: null
					},
					direction: null
			}, this._states = {
					current: {},
					tags: {
							initializing: ["busy"],
							animating: ["busy"],
							dragging: ["interacting"]
					}
			}, t.each(["onResize", "onThrottledResize"], t.proxy(function(e, i) {
					this._handlers[i] = t.proxy(this[i], this)
			}, this)), t.each(n.Plugins, t.proxy(function(t, e) {
					this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this)
			}, this)), t.each(n.Workers, t.proxy(function(e, i) {
					this._pipe.push({
							filter: i.filter,
							run: t.proxy(i.run, this)
					})
			}, this)), this.setup(), this.initialize()
	}
	n.Defaults = {
			items: 3,
			loop: !1,
			center: !1,
			rewind: !1,
			mouseDrag: !0,
			touchDrag: !0,
			pullDrag: !0,
			freeDrag: !1,
			margin: 0,
			stagePadding: 0,
			merge: !1,
			mergeFit: !0,
			autoWidth: !1,
			startPosition: 0,
			rtl: !1,
			smartSpeed: 250,
			fluidSpeed: !1,
			dragEndSpeed: !1,
			responsive: {},
			responsiveRefreshRate: 200,
			responsiveBaseElement: e,
			fallbackEasing: "swing",
			info: !1,
			nestedItemSelector: !1,
			itemElement: "div",
			stageElement: "div",
			refreshClass: "owl-refresh",
			loadedClass: "owl-loaded",
			loadingClass: "owl-loading",
			rtlClass: "owl-rtl",
			responsiveClass: "owl-responsive",
			dragClass: "owl-drag",
			itemClass: "owl-item",
			stageClass: "owl-stage",
			stageOuterClass: "owl-stage-outer",
			grabClass: "owl-grab"
	}, n.Width = {
			Default: "default",
			Inner: "inner",
			Outer: "outer"
	}, n.Type = {
			Event: "event",
			State: "state"
	}, n.Plugins = {}, n.Workers = [{
			filter: ["width", "settings"],
			run: function() {
					this._width = this.$element.width()
			}
	}, {
			filter: ["width", "items", "settings"],
			run: function(t) {
					t.current = this._items && this._items[this.relative(this._current)]
			}
	}, {
			filter: ["items", "settings"],
			run: function() {
					this.$stage.children(".cloned").remove()
			}
	}, {
			filter: ["width", "items", "settings"],
			run: function(t) {
					var e = this.settings.margin || "",
							i = !this.settings.autoWidth,
							s = this.settings.rtl,
							n = {
									width: "auto",
									"margin-left": s ? e : "",
									"margin-right": s ? "" : e
							};
					!i && this.$stage.children().css(n), t.css = n
			}
	}, {
			filter: ["width", "items", "settings"],
			run: function(t) {
					var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
							i = null,
							s = this._items.length,
							n = !this.settings.autoWidth,
							o = [];
					for (t.items = {
									merge: !1,
									width: e
							}; s--;) i = this._mergers[s], i = this.settings.mergeFit && Math.min(i, this.settings.items) || i, t.items.merge = i > 1 || t.items.merge, o[s] = n ? e * i : this._items[s].width();
					this._widths = o
			}
	}, {
			filter: ["items", "settings"],
			run: function() {
					var e = [],
							i = this._items,
							s = this.settings,
							n = Math.max(2 * s.items, 4),
							o = 2 * Math.ceil(i.length / 2),
							r = s.loop && i.length ? s.rewind ? n : Math.max(n, o) : 0,
							a = "",
							l = "";
					for (r /= 2; r--;) e.push(this.normalize(e.length / 2, !0)), a += i[e[e.length - 1]][0].outerHTML, e.push(this.normalize(i.length - 1 - (e.length - 1) / 2, !0)), l = i[e[e.length - 1]][0].outerHTML + l;
					this._clones = e, t(a).addClass("cloned").appendTo(this.$stage), t(l).addClass("cloned").prependTo(this.$stage)
			}
	}, {
			filter: ["width", "items", "settings"],
			run: function() {
					for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, i = -1, s = 0, n = 0, o = []; ++i < e;) s = o[i - 1] || 0, n = this._widths[this.relative(i)] + this.settings.margin, o.push(s + n * t);
					this._coordinates = o
			}
	}, {
			filter: ["width", "items", "settings"],
			run: function() {
					var t = this.settings.stagePadding,
							e = this._coordinates,
							i = {
									width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
									"padding-left": t || "",
									"padding-right": t || ""
							};
					this.$stage.css(i)
			}
	}, {
			filter: ["width", "items", "settings"],
			run: function(t) {
					var e = this._coordinates.length,
							i = !this.settings.autoWidth,
							s = this.$stage.children();
					if (i && t.items.merge)
							for (; e--;) t.css.width = this._widths[this.relative(e)], s.eq(e).css(t.css);
					else i && (t.css.width = t.items.width, s.css(t.css))
			}
	}, {
			filter: ["items"],
			run: function() {
					this._coordinates.length < 1 && this.$stage.removeAttr("style")
			}
	}, {
			filter: ["width", "items", "settings"],
			run: function(t) {
					t.current = t.current ? this.$stage.children().index(t.current) : 0, t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current)), this.reset(t.current)
			}
	}, {
			filter: ["position"],
			run: function() {
					this.animate(this.coordinates(this._current))
			}
	}, {
			filter: ["width", "position", "items", "settings"],
			run: function() {
					var t, e, i, s, n = this.settings.rtl ? 1 : -1,
							o = 2 * this.settings.stagePadding,
							r = this.coordinates(this.current()) + o,
							a = r + this.width() * n,
							l = [];
					for (i = 0, s = this._coordinates.length; i < s; i++) t = this._coordinates[i - 1] || 0, e = Math.abs(this._coordinates[i]) + o * n, (this.op(t, "<=", r) && this.op(t, ">", a) || this.op(e, "<", r) && this.op(e, ">", a)) && l.push(i);
					this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
			}
	}], n.prototype.initialize = function() {
			if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
					var e, i, n;
					e = this.$element.find("img"), i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : s, n = this.$element.children(i).width(), e.length && n <= 0 && this.preloadAutoWidthImages(e)
			}
			this.$element.addClass(this.options.loadingClass), this.$stage = t("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
	}, n.prototype.setup = function() {
			var e = this.viewport(),
					i = this.options.responsive,
					s = -1,
					n = null;
			i ? (t.each(i, function(t) {
					t <= e && t > s && (s = Number(t))
			}), "function" == typeof(n = t.extend({}, this.options, i[s])).stagePadding && (n.stagePadding = n.stagePadding()), delete n.responsive, n.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + s))) : n = t.extend({}, this.options), this.trigger("change", {
					property: {
							name: "settings",
							value: n
					}
			}), this._breakpoint = s, this.settings = n, this.invalidate("settings"), this.trigger("changed", {
					property: {
							name: "settings",
							value: this.settings
					}
			})
	}, n.prototype.optionsLogic = function() {
			this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
	}, n.prototype.prepare = function(e) {
			var i = this.trigger("prepare", {
					content: e
			});
			return i.data || (i.data = t("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(e)), this.trigger("prepared", {
					content: i.data
			}), i.data
	}, n.prototype.update = function() {
			for (var e = 0, i = this._pipe.length, s = t.proxy(function(t) {
							return this[t]
					}, this._invalidated), n = {}; e < i;)(this._invalidated.all || t.grep(this._pipe[e].filter, s).length > 0) && this._pipe[e].run(n), e++;
			this._invalidated = {}, !this.is("valid") && this.enter("valid")
	}, n.prototype.width = function(t) {
			switch (t = t || n.Width.Default) {
					case n.Width.Inner:
					case n.Width.Outer:
							return this._width;
					default:
							return this._width - 2 * this.settings.stagePadding + this.settings.margin
			}
	}, n.prototype.refresh = function() {
			this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
	}, n.prototype.onThrottledResize = function() {
			e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
	}, n.prototype.onResize = function() {
			return !!this._items.length && this._width !== this.$element.width() && !!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))
	}, n.prototype.registerEventHandlers = function() {
			t.support.transition && this.$stage.on(t.support.transition.end + ".owl.core", t.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(e, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
					return !1
			})), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", t.proxy(this.onDragEnd, this)))
	}, n.prototype.onDragStart = function(e) {
			var s = null;
			3 !== e.which && (t.support.transform ? (s = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), s = {
					x: s[16 === s.length ? 12 : 4],
					y: s[16 === s.length ? 13 : 5]
			}) : (s = this.$stage.position(), s = {
					x: this.settings.rtl ? s.left + this.$stage.width() - this.width() + this.settings.margin : s.left,
					y: s.top
			}), this.is("animating") && (t.support.transform ? this.animate(s.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === e.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = t(e.target), this._drag.stage.start = s, this._drag.stage.current = s, this._drag.pointer = this.pointer(e), t(i).on("mouseup.owl.core touchend.owl.core", t.proxy(this.onDragEnd, this)), t(i).one("mousemove.owl.core touchmove.owl.core", t.proxy(function(e) {
					var s = this.difference(this._drag.pointer, this.pointer(e));
					t(i).on("mousemove.owl.core touchmove.owl.core", t.proxy(this.onDragMove, this)), Math.abs(s.x) < Math.abs(s.y) && this.is("valid") || (e.preventDefault(), this.enter("dragging"), this.trigger("drag"))
			}, this)))
	}, n.prototype.onDragMove = function(t) {
			var e = null,
					i = null,
					s = null,
					n = this.difference(this._drag.pointer, this.pointer(t)),
					o = this.difference(this._drag.stage.start, n);
			this.is("dragging") && (t.preventDefault(), this.settings.loop ? (e = this.coordinates(this.minimum()), i = this.coordinates(this.maximum() + 1) - e, o.x = ((o.x - e) % i + i) % i + e) : (e = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), i = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), s = this.settings.pullDrag ? -1 * n.x / 5 : 0, o.x = Math.max(Math.min(o.x, e + s), i + s)), this._drag.stage.current = o, this.animate(o.x))
	}, n.prototype.onDragEnd = function(e) {
			var s = this.difference(this._drag.pointer, this.pointer(e)),
					n = this._drag.stage.current,
					o = s.x > 0 ^ this.settings.rtl ? "left" : "right";
			t(i).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== s.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(n.x, 0 !== s.x ? o : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = o, (Math.abs(s.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
					return !1
			})), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
	}, n.prototype.closest = function(e, i) {
			var s = -1,
					n = this.width(),
					o = this.coordinates();
			return this.settings.freeDrag || t.each(o, t.proxy(function(t, r) {
					return "left" === i && e > r - 30 && e < r + 30 ? s = t : "right" === i && e > r - n - 30 && e < r - n + 30 ? s = t + 1 : this.op(e, "<", r) && this.op(e, ">", o[t + 1] || r - n) && (s = "left" === i ? t + 1 : t), -1 === s
			}, this)), this.settings.loop || (this.op(e, ">", o[this.minimum()]) ? s = e = this.minimum() : this.op(e, "<", o[this.maximum()]) && (s = e = this.maximum())), s
	}, n.prototype.animate = function(e) {
			var i = this.speed() > 0;
			this.is("animating") && this.onTransitionEnd(), i && (this.enter("animating"), this.trigger("translate")), t.support.transform3d && t.support.transition ? this.$stage.css({
					transform: "translate3d(" + e + "px,0px,0px)",
					transition: this.speed() / 1e3 + "s"
			}) : i ? this.$stage.animate({
					left: e + "px"
			}, this.speed(), this.settings.fallbackEasing, t.proxy(this.onTransitionEnd, this)) : this.$stage.css({
					left: e + "px"
			})
	}, n.prototype.is = function(t) {
			return this._states.current[t] && this._states.current[t] > 0
	}, n.prototype.current = function(t) {
			if (t === s) return this._current;
			if (0 === this._items.length) return s;
			if (t = this.normalize(t), this._current !== t) {
					var e = this.trigger("change", {
							property: {
									name: "position",
									value: t
							}
					});
					e.data !== s && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
							property: {
									name: "position",
									value: this._current
							}
					})
			}
			return this._current
	}, n.prototype.invalidate = function(e) {
			return "string" === t.type(e) && (this._invalidated[e] = !0, this.is("valid") && this.leave("valid")), t.map(this._invalidated, function(t, e) {
					return e
			})
	}, n.prototype.reset = function(t) {
			(t = this.normalize(t)) !== s && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
	}, n.prototype.normalize = function(t, e) {
			var i = this._items.length,
					n = e ? 0 : this._clones.length;
			return !this.isNumeric(t) || i < 1 ? t = s : (t < 0 || t >= i + n) && (t = ((t - n / 2) % i + i) % i + n / 2), t
	}, n.prototype.relative = function(t) {
			return t -= this._clones.length / 2, this.normalize(t, !0)
	}, n.prototype.maximum = function(t) {
			var e, i, s, n = this.settings,
					o = this._coordinates.length;
			if (n.loop) o = this._clones.length / 2 + this._items.length - 1;
			else if (n.autoWidth || n.merge) {
					for (e = this._items.length, i = this._items[--e].width(), s = this.$element.width(); e-- && !((i += this._items[e].width() + this.settings.margin) > s););
					o = e + 1
			} else o = n.center ? this._items.length - 1 : this._items.length - n.items;
			return t && (o -= this._clones.length / 2), Math.max(o, 0)
	}, n.prototype.minimum = function(t) {
			return t ? 0 : this._clones.length / 2
	}, n.prototype.items = function(t) {
			return t === s ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
	}, n.prototype.mergers = function(t) {
			return t === s ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
	}, n.prototype.clones = function(e) {
			var i = this._clones.length / 2,
					n = i + this._items.length,
					o = function(t) {
							return t % 2 == 0 ? n + t / 2 : i - (t + 1) / 2
					};
			return e === s ? t.map(this._clones, function(t, e) {
					return o(e)
			}) : t.map(this._clones, function(t, i) {
					return t === e ? o(i) : null
			})
	}, n.prototype.speed = function(t) {
			return t !== s && (this._speed = t), this._speed
	}, n.prototype.coordinates = function(e) {
			var i, n = 1,
					o = e - 1;
			return e === s ? t.map(this._coordinates, t.proxy(function(t, e) {
					return this.coordinates(e)
			}, this)) : (this.settings.center ? (this.settings.rtl && (n = -1, o = e + 1), i = this._coordinates[e], i += (this.width() - i + (this._coordinates[o] || 0)) / 2 * n) : i = this._coordinates[o] || 0, i = Math.ceil(i))
	}, n.prototype.duration = function(t, e, i) {
			return 0 === i ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
	}, n.prototype.to = function(t, e) {
			var i = this.current(),
					s = null,
					n = t - this.relative(i),
					o = (n > 0) - (n < 0),
					r = this._items.length,
					a = this.minimum(),
					l = this.maximum();
			this.settings.loop ? (!this.settings.rewind && Math.abs(n) > r / 2 && (n += -1 * o * r), t = i + n, (s = ((t - a) % r + r) % r + a) !== t && s - n <= l && s - n > 0 && (i = s - n, t = s, this.reset(i))) : this.settings.rewind ? (l += 1, t = (t % l + l) % l) : t = Math.max(a, Math.min(l, t)), this.speed(this.duration(i, t, e)), this.current(t), this.$element.is(":visible") && this.update()
	}, n.prototype.next = function(t) {
			t = t || !1, this.to(this.relative(this.current()) + 1, t)
	}, n.prototype.prev = function(t) {
			t = t || !1, this.to(this.relative(this.current()) - 1, t)
	}, n.prototype.onTransitionEnd = function(t) {
			if (t !== s && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))) return !1;
			this.leave("animating"), this.trigger("translated")
	}, n.prototype.viewport = function() {
			var s;
			return this.options.responsiveBaseElement !== e ? s = t(this.options.responsiveBaseElement).width() : e.innerWidth ? s = e.innerWidth : i.documentElement && i.documentElement.clientWidth ? s = i.documentElement.clientWidth : console.warn("Can not detect viewport width."), s
	}, n.prototype.replace = function(e) {
			this.$stage.empty(), this._items = [], e && (e = e instanceof jQuery ? e : t(e)), this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), e.filter(function() {
					return 1 === this.nodeType
			}).each(t.proxy(function(t, e) {
					e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
			}, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
	}, n.prototype.add = function(e, i) {
			var n = this.relative(this._current);
			i = i === s ? this._items.length : this.normalize(i, !0), e = e instanceof jQuery ? e : t(e), this.trigger("add", {
					content: e,
					position: i
			}), e = this.prepare(e), 0 === this._items.length || i === this._items.length ? (0 === this._items.length && this.$stage.append(e), 0 !== this._items.length && this._items[i - 1].after(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[i].before(e), this._items.splice(i, 0, e), this._mergers.splice(i, 0, 1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[n] && this.reset(this._items[n].index()), this.invalidate("items"), this.trigger("added", {
					content: e,
					position: i
			})
	}, n.prototype.remove = function(t) {
			(t = this.normalize(t, !0)) !== s && (this.trigger("remove", {
					content: this._items[t],
					position: t
			}), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
					content: null,
					position: t
			}))
	}, n.prototype.preloadAutoWidthImages = function(e) {
			e.each(t.proxy(function(e, i) {
					this.enter("pre-loading"), i = t(i), t(new Image).one("load", t.proxy(function(t) {
							i.attr("src", t.target.src), i.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
					}, this)).attr("src", i.attr("src") || i.attr("data-src") || i.attr("data-src-retina"))
			}, this))
	}, n.prototype.destroy = function() {
			this.$element.off(".owl.core"), this.$stage.off(".owl.core"), t(i).off(".owl.core"), !1 !== this.settings.responsive && (e.clearTimeout(this.resizeTimer), this.off(e, "resize", this._handlers.onThrottledResize));
			for (var s in this._plugins) this._plugins[s].destroy();
			this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
	}, n.prototype.op = function(t, e, i) {
			var s = this.settings.rtl;
			switch (e) {
					case "<":
							return s ? t > i : t < i;
					case ">":
							return s ? t < i : t > i;
					case ">=":
							return s ? t <= i : t >= i;
					case "<=":
							return s ? t >= i : t <= i
			}
	}, n.prototype.on = function(t, e, i, s) {
			t.addEventListener ? t.addEventListener(e, i, s) : t.attachEvent && t.attachEvent("on" + e, i)
	}, n.prototype.off = function(t, e, i, s) {
			t.removeEventListener ? t.removeEventListener(e, i, s) : t.detachEvent && t.detachEvent("on" + e, i)
	}, n.prototype.trigger = function(e, i, s, o, r) {
			var a = {
							item: {
									count: this._items.length,
									index: this.current()
							}
					},
					l = t.camelCase(t.grep(["on", e, s], function(t) {
							return t
					}).join("-").toLowerCase()),
					h = t.Event([e, "owl", s || "carousel"].join(".").toLowerCase(), t.extend({
							relatedTarget: this
					}, a, i));
			return this._supress[e] || (t.each(this._plugins, function(t, e) {
					e.onTrigger && e.onTrigger(h)
			}), this.register({
					type: n.Type.Event,
					name: e
			}), this.$element.trigger(h), this.settings && "function" == typeof this.settings[l] && this.settings[l].call(this, h)), h
	}, n.prototype.enter = function(e) {
			t.each([e].concat(this._states.tags[e] || []), t.proxy(function(t, e) {
					this._states.current[e] === s && (this._states.current[e] = 0), this._states.current[e]++
			}, this))
	}, n.prototype.leave = function(e) {
			t.each([e].concat(this._states.tags[e] || []), t.proxy(function(t, e) {
					this._states.current[e]--
			}, this))
	}, n.prototype.register = function(e) {
			if (e.type === n.Type.Event) {
					if (t.event.special[e.name] || (t.event.special[e.name] = {}), !t.event.special[e.name].owl) {
							var i = t.event.special[e.name]._default;
							t.event.special[e.name]._default = function(t) {
									return !i || !i.apply || t.namespace && -1 !== t.namespace.indexOf("owl") ? t.namespace && t.namespace.indexOf("owl") > -1 : i.apply(this, arguments)
							}, t.event.special[e.name].owl = !0
					}
			} else e.type === n.Type.State && (this._states.tags[e.name] ? this._states.tags[e.name] = this._states.tags[e.name].concat(e.tags) : this._states.tags[e.name] = e.tags, this._states.tags[e.name] = t.grep(this._states.tags[e.name], t.proxy(function(i, s) {
					return t.inArray(i, this._states.tags[e.name]) === s
			}, this)))
	}, n.prototype.suppress = function(e) {
			t.each(e, t.proxy(function(t, e) {
					this._supress[e] = !0
			}, this))
	}, n.prototype.release = function(e) {
			t.each(e, t.proxy(function(t, e) {
					delete this._supress[e]
			}, this))
	}, n.prototype.pointer = function(t) {
			var i = {
					x: null,
					y: null
			};
			return t = t.originalEvent || t || e.event, t = t.touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t, t.pageX ? (i.x = t.pageX, i.y = t.pageY) : (i.x = t.clientX, i.y = t.clientY), i
	}, n.prototype.isNumeric = function(t) {
			return !isNaN(parseFloat(t))
	}, n.prototype.difference = function(t, e) {
			return {
					x: t.x - e.x,
					y: t.y - e.y
			}
	}, t.fn.owlCarousel = function(e) {
			var i = Array.prototype.slice.call(arguments, 1);
			return this.each(function() {
					var s = t(this),
							o = s.data("owl.carousel");
					o || (o = new n(this, "object" == typeof e && e), s.data("owl.carousel", o), t.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(e, i) {
							o.register({
									type: n.Type.Event,
									name: i
							}), o.$element.on(i + ".owl.carousel.core", t.proxy(function(t) {
									t.namespace && t.relatedTarget !== this && (this.suppress([i]), o[i].apply(this, [].slice.call(arguments, 1)), this.release([i]))
							}, o))
					})), "string" == typeof e && "_" !== e.charAt(0) && o[e].apply(o, i)
			})
	}, t.fn.owlCarousel.Constructor = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
	var n = function(e) {
			this._core = e, this._interval = null, this._visible = null, this._handlers = {
					"initialized.owl.carousel": t.proxy(function(t) {
							t.namespace && this._core.settings.autoRefresh && this.watch()
					}, this)
			}, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers)
	};
	n.Defaults = {
			autoRefresh: !0,
			autoRefreshInterval: 500
	}, n.prototype.watch = function() {
			this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = e.setInterval(t.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
	}, n.prototype.refresh = function() {
			this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
	}, n.prototype.destroy = function() {
			var t, i;
			e.clearInterval(this._interval);
			for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
			for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
	}, t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
	var n = function(e) {
			this._core = e, this._loaded = [], this._handlers = {
					"initialized.owl.carousel change.owl.carousel resized.owl.carousel": t.proxy(function(e) {
							if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type))
									for (var i = this._core.settings, s = i.center && Math.ceil(i.items / 2) || i.items, n = i.center && -1 * s || 0, o = (e.property && void 0 !== e.property.value ? e.property.value : this._core.current()) + n, r = this._core.clones().length, a = t.proxy(function(t, e) {
													this.load(e)
											}, this); n++ < s;) this.load(r / 2 + this._core.relative(o)), r && t.each(this._core.clones(this._core.relative(o)), a), o++
					}, this)
			}, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers)
	};
	n.Defaults = {
			lazyLoad: !1
	}, n.prototype.load = function(i) {
			var s = this._core.$stage.children().eq(i),
					n = s && s.find(".owl-lazy");
			!n || t.inArray(s.get(0), this._loaded) > -1 || (n.each(t.proxy(function(i, s) {
					var n, o = t(s),
							r = e.devicePixelRatio > 1 && o.attr("data-src-retina") || o.attr("data-src");
					this._core.trigger("load", {
							element: o,
							url: r
					}, "lazy"), o.is("img") ? o.one("load.owl.lazy", t.proxy(function() {
							o.css("opacity", 1), this._core.trigger("loaded", {
									element: o,
									url: r
							}, "lazy")
					}, this)).attr("src", r) : (n = new Image, n.onload = t.proxy(function() {
							o.css({
									"background-image": 'url("' + r + '")',
									opacity: "1"
							}), this._core.trigger("loaded", {
									element: o,
									url: r
							}, "lazy")
					}, this), n.src = r)
			}, this)), this._loaded.push(s.get(0)))
	}, n.prototype.destroy = function() {
			var t, e;
			for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
			for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, t.fn.owlCarousel.Constructor.Plugins.Lazy = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
	var n = function(e) {
			this._core = e, this._handlers = {
					"initialized.owl.carousel refreshed.owl.carousel": t.proxy(function(t) {
							t.namespace && this._core.settings.autoHeight && this.update()
					}, this),
					"changed.owl.carousel": t.proxy(function(t) {
							t.namespace && this._core.settings.autoHeight && "position" == t.property.name && this.update()
					}, this),
					"loaded.owl.lazy": t.proxy(function(t) {
							t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
					}, this)
			}, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers)
	};
	n.Defaults = {
			autoHeight: !1,
			autoHeightClass: "owl-height"
	}, n.prototype.update = function() {
			var e = this._core._current,
					i = e + this._core.settings.items,
					s = this._core.$stage.children().toArray().slice(e, i),
					n = [],
					o = 0;
			t.each(s, function(e, i) {
					n.push(t(i).height())
			}), o = Math.max.apply(null, n), this._core.$stage.parent().height(o).addClass(this._core.settings.autoHeightClass)
	}, n.prototype.destroy = function() {
			var t, e;
			for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
			for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, t.fn.owlCarousel.Constructor.Plugins.AutoHeight = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
	var n = function(e) {
			this._core = e, this._videos = {}, this._playing = null, this._handlers = {
					"initialized.owl.carousel": t.proxy(function(t) {
							t.namespace && this._core.register({
									type: "state",
									name: "playing",
									tags: ["interacting"]
							})
					}, this),
					"resize.owl.carousel": t.proxy(function(t) {
							t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault()
					}, this),
					"refreshed.owl.carousel": t.proxy(function(t) {
							t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
					}, this),
					"changed.owl.carousel": t.proxy(function(t) {
							t.namespace && "position" === t.property.name && this._playing && this.stop()
					}, this),
					"prepared.owl.carousel": t.proxy(function(e) {
							if (e.namespace) {
									var i = t(e.content).find(".owl-video");
									i.length && (i.css("display", "none"), this.fetch(i, t(e.content)))
							}
					}, this)
			}, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function(t) {
					this.play(t)
			}, this))
	};
	n.Defaults = {
			video: !1,
			videoHeight: !1,
			videoWidth: !1
	}, n.prototype.fetch = function(t, e) {
			var i = t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube",
					s = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
					n = t.attr("data-width") || this._core.settings.videoWidth,
					o = t.attr("data-height") || this._core.settings.videoHeight,
					r = t.attr("href");
			if (!r) throw new Error("Missing video URL.");
			if ((s = r.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu") > -1) i = "youtube";
			else if (s[3].indexOf("vimeo") > -1) i = "vimeo";
			else {
					if (!(s[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
					i = "vzaar"
			}
			s = s[6], this._videos[r] = {
					type: i,
					id: s,
					width: n,
					height: o
			}, e.attr("data-video", r), this.thumbnail(t, this._videos[r])
	}, n.prototype.thumbnail = function(e, i) {
			var s, n, o, r = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "",
					a = e.find("img"),
					l = "src",
					h = "",
					c = this._core.settings,
					p = function(t) {
							n = '<div class="owl-video-play-icon"></div>', s = c.lazyLoad ? '<div class="owl-video-tn ' + h + '" ' + l + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>', e.after(s), e.after(n)
					};
			if (e.wrap('<div class="owl-video-wrapper"' + r + "></div>"), this._core.settings.lazyLoad && (l = "data-src", h = "owl-lazy"), a.length) return p(a.attr(l)), a.remove(), !1;
			"youtube" === i.type ? (o = "//img.youtube.com/vi/" + i.id + "/hqdefault.jpg", p(o)) : "vimeo" === i.type ? t.ajax({
					type: "GET",
					url: "//vimeo.com/api/v2/video/" + i.id + ".json",
					jsonp: "callback",
					dataType: "jsonp",
					success: function(t) {
							o = t[0].thumbnail_large, p(o)
					}
			}) : "vzaar" === i.type && t.ajax({
					type: "GET",
					url: "//vzaar.com/api/videos/" + i.id + ".json",
					jsonp: "callback",
					dataType: "jsonp",
					success: function(t) {
							o = t.framegrab_url, p(o)
					}
			})
	}, n.prototype.stop = function() {
			this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
	}, n.prototype.play = function(e) {
			var i, s = t(e.target).closest("." + this._core.settings.itemClass),
					n = this._videos[s.attr("data-video")],
					o = n.width || "100%",
					r = n.height || this._core.$stage.height();
			this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), s = this._core.items(this._core.relative(s.index())), this._core.reset(s.index()), "youtube" === n.type ? i = '<iframe width="' + o + '" height="' + r + '" src="//www.youtube.com/embed/' + n.id + "?autoplay=1&rel=0&v=" + n.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === n.type ? i = '<iframe src="//player.vimeo.com/video/' + n.id + '?autoplay=1" width="' + o + '" height="' + r + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === n.type && (i = '<iframe frameborder="0"height="' + r + '"width="' + o + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + n.id + '/player?autoplay=true"></iframe>'), t('<div class="owl-video-frame">' + i + "</div>").insertAfter(s.find(".owl-video")), this._playing = s.addClass("owl-video-playing"))
	}, n.prototype.isInFullScreen = function() {
			var e = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
			return e && t(e).parent().hasClass("owl-video-frame")
	}, n.prototype.destroy = function() {
			var t, e;
			this._core.$element.off("click.owl.video");
			for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
			for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, t.fn.owlCarousel.Constructor.Plugins.Video = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
	var n = function(e) {
			this.core = e, this.core.options = t.extend({}, n.Defaults, this.core.options), this.swapping = !0, this.previous = s, this.next = s, this.handlers = {
					"change.owl.carousel": t.proxy(function(t) {
							t.namespace && "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
					}, this),
					"drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function(t) {
							t.namespace && (this.swapping = "translated" == t.type)
					}, this),
					"translate.owl.carousel": t.proxy(function(t) {
							t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
					}, this)
			}, this.core.$element.on(this.handlers)
	};
	n.Defaults = {
			animateOut: !1,
			animateIn: !1
	}, n.prototype.swap = function() {
			if (1 === this.core.settings.items && t.support.animation && t.support.transition) {
					this.core.speed(0);
					var e, i = t.proxy(this.clear, this),
							s = this.core.$stage.children().eq(this.previous),
							n = this.core.$stage.children().eq(this.next),
							o = this.core.settings.animateIn,
							r = this.core.settings.animateOut;
					this.core.current() !== this.previous && (r && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), s.one(t.support.animation.end, i).css({
							left: e + "px"
					}).addClass("animated owl-animated-out").addClass(r)), o && n.one(t.support.animation.end, i).addClass("animated owl-animated-in").addClass(o))
			}
	}, n.prototype.clear = function(e) {
			t(e.target).css({
					left: ""
			}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
	}, n.prototype.destroy = function() {
			var t, e;
			for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
			for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, t.fn.owlCarousel.Constructor.Plugins.Animate = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
	var n = function(e) {
			this._core = e, this._timeout = null, this._paused = !1, this._handlers = {
					"changed.owl.carousel": t.proxy(function(t) {
							t.namespace && "settings" === t.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : t.namespace && "position" === t.property.name && this._core.settings.autoplay && this._setAutoPlayInterval()
					}, this),
					"initialized.owl.carousel": t.proxy(function(t) {
							t.namespace && this._core.settings.autoplay && this.play()
					}, this),
					"play.owl.autoplay": t.proxy(function(t, e, i) {
							t.namespace && this.play(e, i)
					}, this),
					"stop.owl.autoplay": t.proxy(function(t) {
							t.namespace && this.stop()
					}, this),
					"mouseover.owl.autoplay": t.proxy(function() {
							this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
					}, this),
					"mouseleave.owl.autoplay": t.proxy(function() {
							this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
					}, this),
					"touchstart.owl.core": t.proxy(function() {
							this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
					}, this),
					"touchend.owl.core": t.proxy(function() {
							this._core.settings.autoplayHoverPause && this.play()
					}, this)
			}, this._core.$element.on(this._handlers), this._core.options = t.extend({}, n.Defaults, this._core.options)
	};
	n.Defaults = {
			autoplay: !1,
			autoplayTimeout: 5e3,
			autoplayHoverPause: !1,
			autoplaySpeed: !1
	}, n.prototype.play = function(t, e) {
			this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval())
	}, n.prototype._getNextTimeout = function(s, n) {
			return this._timeout && e.clearTimeout(this._timeout), e.setTimeout(t.proxy(function() {
					this._paused || this._core.is("busy") || this._core.is("interacting") || i.hidden || this._core.next(n || this._core.settings.autoplaySpeed)
			}, this), s || this._core.settings.autoplayTimeout)
	}, n.prototype._setAutoPlayInterval = function() {
			this._timeout = this._getNextTimeout()
	}, n.prototype.stop = function() {
			this._core.is("rotating") && (e.clearTimeout(this._timeout), this._core.leave("rotating"))
	}, n.prototype.pause = function() {
			this._core.is("rotating") && (this._paused = !0)
	}, n.prototype.destroy = function() {
			var t, e;
			this.stop();
			for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
			for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, t.fn.owlCarousel.Constructor.Plugins.autoplay = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
	"use strict";
	var n = function(e) {
			this._core = e, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
					next: this._core.next,
					prev: this._core.prev,
					to: this._core.to
			}, this._handlers = {
					"prepared.owl.carousel": t.proxy(function(e) {
							e.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + t(e.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
					}, this),
					"added.owl.carousel": t.proxy(function(t) {
							t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop())
					}, this),
					"remove.owl.carousel": t.proxy(function(t) {
							t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1)
					}, this),
					"changed.owl.carousel": t.proxy(function(t) {
							t.namespace && "position" == t.property.name && this.draw()
					}, this),
					"initialized.owl.carousel": t.proxy(function(t) {
							t.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
					}, this),
					"refreshed.owl.carousel": t.proxy(function(t) {
							t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
					}, this)
			}, this._core.options = t.extend({}, n.Defaults, this._core.options), this.$element.on(this._handlers)
	};
	n.Defaults = {
			nav: !1,
			navText: ["prev", "next"],
			navSpeed: !1,
			navElement: "div",
			navContainer: !1,
			navContainerClass: "owl-nav",
			navClass: ["owl-prev", "owl-next"],
			slideBy: 1,
			dotClass: "owl-dot",
			dotsClass: "owl-dots",
			dots: !0,
			dotsEach: !1,
			dotsData: !1,
			dotsSpeed: !1,
			dotsContainer: !1
	}, n.prototype.initialize = function() {
			var e, i = this._core.settings;
			this._controls.$relative = (i.navContainer ? t(i.navContainer) : t("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = t("<" + i.navElement + ">").addClass(i.navClass[0]).html(i.navText[0]).prependTo(this._controls.$relative).on("click", t.proxy(function(t) {
					this.prev(i.navSpeed)
			}, this)), this._controls.$next = t("<" + i.navElement + ">").addClass(i.navClass[1]).html(i.navText[1]).appendTo(this._controls.$relative).on("click", t.proxy(function(t) {
					this.next(i.navSpeed)
			}, this)), i.dotsData || (this._templates = [t("<div>").addClass(i.dotClass).append(t("<span>")).prop("outerHTML")]), this._controls.$absolute = (i.dotsContainer ? t(i.dotsContainer) : t("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", t.proxy(function(e) {
					var s = t(e.target).parent().is(this._controls.$absolute) ? t(e.target).index() : t(e.target).parent().index();
					e.preventDefault(), this.to(s, i.dotsSpeed)
			}, this));
			for (e in this._overrides) this._core[e] = t.proxy(this[e], this)
	}, n.prototype.destroy = function() {
			var t, e, i, s;
			for (t in this._handlers) this.$element.off(t, this._handlers[t]);
			for (e in this._controls) this._controls[e].remove();
			for (s in this.overides) this._core[s] = this._overrides[s];
			for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
	}, n.prototype.update = function() {
			var t, e, i, s = this._core.clones().length / 2,
					n = s + this._core.items().length,
					o = this._core.maximum(!0),
					r = this._core.settings,
					a = r.center || r.autoWidth || r.dotsData ? 1 : r.dotsEach || r.items;
			if ("page" !== r.slideBy && (r.slideBy = Math.min(r.slideBy, r.items)), r.dots || "page" == r.slideBy)
					for (this._pages = [], t = s, e = 0, i = 0; t < n; t++) {
							if (e >= a || 0 === e) {
									if (this._pages.push({
													start: Math.min(o, t - s),
													end: t - s + a - 1
											}), Math.min(o, t - s) === o) break;
									e = 0, ++i
							}
							e += this._core.mergers(this._core.relative(t))
					}
	}, n.prototype.draw = function() {
			var e, i = this._core.settings,
					s = this._core.items().length <= i.items,
					n = this._core.relative(this._core.current()),
					o = i.loop || i.rewind;
			this._controls.$relative.toggleClass("disabled", !i.nav || s), i.nav && (this._controls.$previous.toggleClass("disabled", !o && n <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !o && n >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !i.dots || s), i.dots && (e = this._pages.length - this._controls.$absolute.children().length, i.dotsData && 0 !== e ? this._controls.$absolute.html(this._templates.join("")) : e > 0 ? this._controls.$absolute.append(new Array(e + 1).join(this._templates[0])) : e < 0 && this._controls.$absolute.children().slice(e).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(t.inArray(this.current(), this._pages)).addClass("active"))
	}, n.prototype.onTrigger = function(e) {
			var i = this._core.settings;
			e.page = {
					index: t.inArray(this.current(), this._pages),
					count: this._pages.length,
					size: i && (i.center || i.autoWidth || i.dotsData ? 1 : i.dotsEach || i.items)
			}
	}, n.prototype.current = function() {
			var e = this._core.relative(this._core.current());
			return t.grep(this._pages, t.proxy(function(t, i) {
					return t.start <= e && t.end >= e
			}, this)).pop()
	}, n.prototype.getPosition = function(e) {
			var i, s, n = this._core.settings;
			return "page" == n.slideBy ? (i = t.inArray(this.current(), this._pages), s = this._pages.length, e ? ++i : --i, i = this._pages[(i % s + s) % s].start) : (i = this._core.relative(this._core.current()), s = this._core.items().length, e ? i += n.slideBy : i -= n.slideBy), i
	}, n.prototype.next = function(e) {
			t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
	}, n.prototype.prev = function(e) {
			t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
	}, n.prototype.to = function(e, i, s) {
			var n;
			!s && this._pages.length ? (n = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % n + n) % n].start, i)) : t.proxy(this._overrides.to, this._core)(e, i)
	}, t.fn.owlCarousel.Constructor.Plugins.Navigation = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
	"use strict";
	var n = function(i) {
			this._core = i, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
					"initialized.owl.carousel": t.proxy(function(i) {
							i.namespace && "URLHash" === this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation")
					}, this),
					"prepared.owl.carousel": t.proxy(function(e) {
							if (e.namespace) {
									var i = t(e.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
									if (!i) return;
									this._hashes[i] = e.content
							}
					}, this),
					"changed.owl.carousel": t.proxy(function(i) {
							if (i.namespace && "position" === i.property.name) {
									var s = this._core.items(this._core.relative(this._core.current())),
											n = t.map(this._hashes, function(t, e) {
													return t === s ? e : null
											}).join();
									if (!n || e.location.hash.slice(1) === n) return;
									e.location.hash = n
							}
					}, this)
			}, this._core.options = t.extend({}, n.Defaults, this._core.options), this.$element.on(this._handlers), t(e).on("hashchange.owl.navigation", t.proxy(function(t) {
					var i = e.location.hash.substring(1),
							s = this._core.$stage.children(),
							n = this._hashes[i] && s.index(this._hashes[i]);
					void 0 !== n && n !== this._core.current() && this._core.to(this._core.relative(n), !1, !0)
			}, this))
	};
	n.Defaults = {
			URLhashListener: !1
	}, n.prototype.destroy = function() {
			var i, s;
			t(e).off("hashchange.owl.navigation");
			for (i in this._handlers) this._core.$element.off(i, this._handlers[i]);
			for (s in Object.getOwnPropertyNames(this)) "function" != typeof this[s] && (this[s] = null)
	}, t.fn.owlCarousel.Constructor.Plugins.Hash = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
	function n(e, i) {
			var n = !1,
					o = e.charAt(0).toUpperCase() + e.slice(1);
			return t.each((e + " " + a.join(o + " ") + o).split(" "), function(t, e) {
					if (r[e] !== s) return n = !i || e, !1
			}), n
	}

	function o(t) {
			return n(t, !0)
	}
	var r = t("<support>").get(0).style,
			a = "Webkit Moz O ms".split(" "),
			l = {
					transition: {
							end: {
									WebkitTransition: "webkitTransitionEnd",
									MozTransition: "transitionend",
									OTransition: "oTransitionEnd",
									transition: "transitionend"
							}
					},
					animation: {
							end: {
									WebkitAnimation: "webkitAnimationEnd",
									MozAnimation: "animationend",
									OAnimation: "oAnimationEnd",
									animation: "animationend"
							}
					}
			},
			h = {
					csstransforms: function() {
							return !!n("transform")
					},
					csstransforms3d: function() {
							return !!n("perspective")
					},
					csstransitions: function() {
							return !!n("transition")
					},
					cssanimations: function() {
							return !!n("animation")
					}
			};
	h.csstransitions() && (t.support.transition = new String(o("transition")), t.support.transition.end = l.transition.end[t.support.transition]), h.cssanimations() && (t.support.animation = new String(o("animation")), t.support.animation.end = l.animation.end[t.support.animation]), h.csstransforms() && (t.support.transform = new String(o("transform")), t.support.transform3d = h.csstransforms3d())
}(window.Zepto || window.jQuery, window, document),
function(t) {
	"function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(t) {
	var e, i, s, n, o, r, a = "Close",
			l = "BeforeClose",
			h = "MarkupParse",
			c = "Open",
			p = "Change",
			d = "mfp",
			u = "." + d,
			m = "mfp-ready",
			g = "mfp-removing",
			f = "mfp-prevent-close",
			v = function() {},
			y = !!window.jQuery,
			_ = t(window),
			w = function(t, i) {
					e.ev.on(d + t + u, i)
			},
			C = function(e, i, s, n) {
					var o = document.createElement("div");
					return o.className = "mfp-" + e, s && (o.innerHTML = s), n ? i && i.appendChild(o) : (o = t(o), i && o.appendTo(i)), o
			},
			x = function(i, s) {
					e.ev.triggerHandler(d + i, s), e.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), e.st.callbacks[i] && e.st.callbacks[i].apply(e, t.isArray(s) ? s : [s]))
			},
			b = function(i) {
					return i === r && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose)), r = i), e.currTemplate.closeBtn
			},
			z = function() {
					t.magnificPopup.instance || ((e = new v).init(), t.magnificPopup.instance = e)
			},
			T = function() {
					var t = document.createElement("p").style,
							e = ["ms", "O", "Moz", "Webkit"];
					if (void 0 !== t.transition) return !0;
					for (; e.length;)
							if (e.pop() + "Transition" in t) return !0;
					return !1
			};
	v.prototype = {
			constructor: v,
			init: function() {
					var i = navigator.appVersion;
					e.isLowIE = e.isIE8 = document.all && !document.addEventListener, e.isAndroid = /android/gi.test(i), e.isIOS = /iphone|ipad|ipod/gi.test(i), e.supportsTransition = T(), e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), s = t(document), e.popupsCache = {}
			},
			open: function(i) {
					var n;
					if (!1 === i.isObj) {
							e.items = i.items.toArray(), e.index = 0;
							var r, a = i.items;
							for (n = 0; n < a.length; n++)
									if ((r = a[n]).parsed && (r = r.el[0]), r === i.el[0]) {
											e.index = n;
											break
									}
					} else e.items = t.isArray(i.items) ? i.items : [i.items], e.index = i.index || 0; {
							if (!e.isOpen) {
									e.types = [], o = "", i.mainEl && i.mainEl.length ? e.ev = i.mainEl.eq(0) : e.ev = s, i.key ? (e.popupsCache[i.key] || (e.popupsCache[i.key] = {}), e.currTemplate = e.popupsCache[i.key]) : e.currTemplate = {}, e.st = t.extend(!0, {}, t.magnificPopup.defaults, i), e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos, e.st.modal && (e.st.closeOnContentClick = !1, e.st.closeOnBgClick = !1, e.st.showCloseBtn = !1, e.st.enableEscapeKey = !1), e.bgOverlay || (e.bgOverlay = C("bg").on("click" + u, function() {
											e.close()
									}), e.wrap = C("wrap").attr("tabindex", -1).on("click" + u, function(t) {
											e._checkIfClose(t.target) && e.close()
									}), e.container = C("container", e.wrap)), e.contentContainer = C("content"), e.st.preloader && (e.preloader = C("preloader", e.container, e.st.tLoading));
									var l = t.magnificPopup.modules;
									for (n = 0; n < l.length; n++) {
											var p = l[n];
											p = p.charAt(0).toUpperCase() + p.slice(1), e["init" + p].call(e)
									}
									x("BeforeOpen"), e.st.showCloseBtn && (e.st.closeBtnInside ? (w(h, function(t, e, i, s) {
											i.close_replaceWith = b(s.type)
									}), o += " mfp-close-btn-in") : e.wrap.append(b())), e.st.alignTop && (o += " mfp-align-top"), e.fixedContentPos ? e.wrap.css({
											overflow: e.st.overflowY,
											overflowX: "hidden",
											overflowY: e.st.overflowY
									}) : e.wrap.css({
											top: _.scrollTop(),
											position: "absolute"
									}), (!1 === e.st.fixedBgPos || "auto" === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
											height: s.height(),
											position: "absolute"
									}), e.st.enableEscapeKey && s.on("keyup" + u, function(t) {
											27 === t.keyCode && e.close()
									}), _.on("resize" + u, function() {
											e.updateSize()
									}), e.st.closeOnContentClick || (o += " mfp-auto-cursor"), o && e.wrap.addClass(o);
									var d = e.wH = _.height(),
											g = {};
									if (e.fixedContentPos && e._hasScrollBar(d)) {
											var f = e._getScrollbarSize();
											f && (g.marginRight = f)
									}
									e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : g.overflow = "hidden");
									var v = e.st.mainClass;
									return e.isIE7 && (v += " mfp-ie7"), v && e._addClassToMFP(v), e.updateItemHTML(), x("BuildControls"), t("html").css(g), e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)), e._lastFocusedEl = document.activeElement, setTimeout(function() {
											e.content ? (e._addClassToMFP(m), e._setFocus()) : e.bgOverlay.addClass(m), s.on("focusin" + u, e._onFocusIn)
									}, 16), e.isOpen = !0, e.updateSize(d), x(c), i
							}
							e.updateItemHTML()
					}
			},
			close: function() {
					e.isOpen && (x(l), e.isOpen = !1, e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP(g), setTimeout(function() {
							e._close()
					}, e.st.removalDelay)) : e._close())
			},
			_close: function() {
					x(a);
					var i = g + " " + m + " ";
					if (e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (i += e.st.mainClass + " "), e._removeClassFromMFP(i), e.fixedContentPos) {
							var n = {
									marginRight: ""
							};
							e.isIE7 ? t("body, html").css("overflow", "") : n.overflow = "", t("html").css(n)
					}
					s.off("keyup.mfp focusin" + u), e.ev.off(u), e.wrap.attr("class", "mfp-wrap").removeAttr("style"), e.bgOverlay.attr("class", "mfp-bg"), e.container.attr("class", "mfp-container"), !e.st.showCloseBtn || e.st.closeBtnInside && !0 !== e.currTemplate[e.currItem.type] || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(), e.st.autoFocusLast && e._lastFocusedEl && t(e._lastFocusedEl).focus(), e.currItem = null, e.content = null, e.currTemplate = null, e.prevHeight = 0, x("AfterClose")
			},
			updateSize: function(t) {
					if (e.isIOS) {
							var i = document.documentElement.clientWidth / window.innerWidth,
									s = window.innerHeight * i;
							e.wrap.css("height", s), e.wH = s
					} else e.wH = t || _.height();
					e.fixedContentPos || e.wrap.css("height", e.wH), x("Resize")
			},
			updateItemHTML: function() {
					var i = e.items[e.index];
					e.contentContainer.detach(), e.content && e.content.detach(), i.parsed || (i = e.parseEl(e.index));
					var s = i.type;
					if (x("BeforeChange", [e.currItem ? e.currItem.type : "", s]), e.currItem = i, !e.currTemplate[s]) {
							var o = !!e.st[s] && e.st[s].markup;
							x("FirstMarkupParse", o), e.currTemplate[s] = !o || t(o)
					}
					n && n !== i.type && e.container.removeClass("mfp-" + n + "-holder");
					var r = e["get" + s.charAt(0).toUpperCase() + s.slice(1)](i, e.currTemplate[s]);
					e.appendContent(r, s), i.preloaded = !0, x(p, i), n = i.type, e.container.prepend(e.contentContainer), x("AfterChange")
			},
			appendContent: function(t, i) {
					e.content = t, t ? e.st.showCloseBtn && e.st.closeBtnInside && !0 === e.currTemplate[i] ? e.content.find(".mfp-close").length || e.content.append(b()) : e.content = t : e.content = "", x("BeforeAppend"), e.container.addClass("mfp-" + i + "-holder"), e.contentContainer.append(e.content)
			},
			parseEl: function(i) {
					var s, n = e.items[i];
					if (n.tagName ? n = {
									el: t(n)
							} : (s = n.type, n = {
									data: n,
									src: n.src
							}), n.el) {
							for (var o = e.types, r = 0; r < o.length; r++)
									if (n.el.hasClass("mfp-" + o[r])) {
											s = o[r];
											break
									}
							n.src = n.el.attr("data-mfp-src"), n.src || (n.src = n.el.attr("href"))
					}
					return n.type = s || e.st.type || "inline", n.index = i, n.parsed = !0, e.items[i] = n, x("ElementParse", n), e.items[i]
			},
			addGroup: function(t, i) {
					var s = function(s) {
							s.mfpEl = this, e._openClick(s, t, i)
					};
					i || (i = {});
					var n = "click.magnificPopup";
					i.mainEl = t, i.items ? (i.isObj = !0, t.off(n).on(n, s)) : (i.isObj = !1, i.delegate ? t.off(n).on(n, i.delegate, s) : (i.items = t, t.off(n).on(n, s)))
			},
			_openClick: function(i, s, n) {
					if ((void 0 !== n.midClick ? n.midClick : t.magnificPopup.defaults.midClick) || !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)) {
							var o = void 0 !== n.disableOn ? n.disableOn : t.magnificPopup.defaults.disableOn;
							if (o)
									if (t.isFunction(o)) {
											if (!o.call(e)) return !0
									} else if (_.width() < o) return !0;
							i.type && (i.preventDefault(), e.isOpen && i.stopPropagation()), n.el = t(i.mfpEl), n.delegate && (n.items = s.find(n.delegate)), e.open(n)
					}
			},
			updateStatus: function(t, s) {
					if (e.preloader) {
							i !== t && e.container.removeClass("mfp-s-" + i), s || "loading" !== t || (s = e.st.tLoading);
							var n = {
									status: t,
									text: s
							};
							x("UpdateStatus", n), t = n.status, s = n.text, e.preloader.html(s), e.preloader.find("a").on("click", function(t) {
									t.stopImmediatePropagation()
							}), e.container.addClass("mfp-s-" + t), i = t
					}
			},
			_checkIfClose: function(i) {
					if (!t(i).hasClass(f)) {
							var s = e.st.closeOnContentClick,
									n = e.st.closeOnBgClick;
							if (s && n) return !0;
							if (!e.content || t(i).hasClass("mfp-close") || e.preloader && i === e.preloader[0]) return !0;
							if (i === e.content[0] || t.contains(e.content[0], i)) {
									if (s) return !0
							} else if (n && t.contains(document, i)) return !0;
							return !1
					}
			},
			_addClassToMFP: function(t) {
					e.bgOverlay.addClass(t), e.wrap.addClass(t)
			},
			_removeClassFromMFP: function(t) {
					this.bgOverlay.removeClass(t), e.wrap.removeClass(t)
			},
			_hasScrollBar: function(t) {
					return (e.isIE7 ? s.height() : document.body.scrollHeight) > (t || _.height())
			},
			_setFocus: function() {
					(e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus()
			},
			_onFocusIn: function(i) {
					return i.target === e.wrap[0] || t.contains(e.wrap[0], i.target) ? void 0 : (e._setFocus(), !1)
			},
			_parseMarkup: function(e, i, s) {
					var n;
					s.data && (i = t.extend(s.data, i)), x(h, [e, i, s]), t.each(i, function(i, s) {
							if (void 0 === s || !1 === s) return !0;
							if ((n = i.split("_")).length > 1) {
									var o = e.find(u + "-" + n[0]);
									if (o.length > 0) {
											var r = n[1];
											"replaceWith" === r ? o[0] !== s[0] && o.replaceWith(s) : "img" === r ? o.is("img") ? o.attr("src", s) : o.replaceWith(t("<img>").attr("src", s).attr("class", o.attr("class"))) : o.attr(n[1], s)
									}
							} else e.find(u + "-" + i).html(s)
					})
			},
			_getScrollbarSize: function() {
					if (void 0 === e.scrollbarSize) {
							var t = document.createElement("div");
							t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), e.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t)
					}
					return e.scrollbarSize
			}
	}, t.magnificPopup = {
			instance: null,
			proto: v.prototype,
			modules: [],
			open: function(e, i) {
					return z(), e = e ? t.extend(!0, {}, e) : {}, e.isObj = !0, e.index = i || 0, this.instance.open(e)
			},
			close: function() {
					return t.magnificPopup.instance && t.magnificPopup.instance.close()
			},
			registerModule: function(e, i) {
					i.options && (t.magnificPopup.defaults[e] = i.options), t.extend(this.proto, i.proto), this.modules.push(e)
			},
			defaults: {
					disableOn: 0,
					key: null,
					midClick: !1,
					mainClass: "",
					preloader: !0,
					focus: "",
					closeOnContentClick: !1,
					closeOnBgClick: !0,
					closeBtnInside: !0,
					showCloseBtn: !0,
					enableEscapeKey: !0,
					modal: !1,
					alignTop: !1,
					removalDelay: 0,
					prependTo: null,
					fixedContentPos: "auto",
					fixedBgPos: "auto",
					overflowY: "auto",
					closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
					tClose: "Close (Esc)",
					tLoading: "Loading...",
					autoFocusLast: !0
			}
	}, t.fn.magnificPopup = function(i) {
			z();
			var s = t(this);
			if ("string" == typeof i)
					if ("open" === i) {
							var n, o = y ? s.data("magnificPopup") : s[0].magnificPopup,
									r = parseInt(arguments[1], 10) || 0;
							o.items ? n = o.items[r] : (n = s, o.delegate && (n = n.find(o.delegate)), n = n.eq(r)), e._openClick({
									mfpEl: n
							}, s, o)
					} else e.isOpen && e[i].apply(e, Array.prototype.slice.call(arguments, 1));
			else i = t.extend(!0, {}, i), y ? s.data("magnificPopup", i) : s[0].magnificPopup = i, e.addGroup(s, i);
			return s
	};
	var $, I, E, P = "inline",
			k = function() {
					E && (I.after(E.addClass($)).detach(), E = null)
			};
	t.magnificPopup.registerModule(P, {
			options: {
					hiddenClass: "hide",
					markup: "",
					tNotFound: "Content not found"
			},
			proto: {
					initInline: function() {
							e.types.push(P), w(a + "." + P, function() {
									k()
							})
					},
					getInline: function(i, s) {
							if (k(), i.src) {
									var n = e.st.inline,
											o = t(i.src);
									if (o.length) {
											var r = o[0].parentNode;
											r && r.tagName && (I || ($ = n.hiddenClass, I = C($), $ = "mfp-" + $), E = o.after(I).detach().removeClass($)), e.updateStatus("ready")
									} else e.updateStatus("error", n.tNotFound), o = t("<div>");
									return i.inlineElement = o, o
							}
							return e.updateStatus("ready"), e._parseMarkup(s, {}, i), s
					}
			}
	});
	var S, O = "ajax",
			M = function() {
					S && t(document.body).removeClass(S)
			},
			j = function() {
					M(), e.req && e.req.abort()
			};
	t.magnificPopup.registerModule(O, {
			options: {
					settings: null,
					cursor: "mfp-ajax-cur",
					tError: '<a href="%url%">The content</a> could not be loaded.'
			},
			proto: {
					initAjax: function() {
							e.types.push(O), S = e.st.ajax.cursor, w(a + "." + O, j), w("BeforeChange." + O, j)
					},
					getAjax: function(i) {
							S && t(document.body).addClass(S), e.updateStatus("loading");
							var s = t.extend({
									url: i.src,
									success: function(s, n, o) {
											var r = {
													data: s,
													xhr: o
											};
											x("ParseAjax", r), e.appendContent(t(r.data), O), i.finished = !0, M(), e._setFocus(), setTimeout(function() {
													e.wrap.addClass(m)
											}, 16), e.updateStatus("ready"), x("AjaxContentAdded")
									},
									error: function() {
											M(), i.finished = i.loadError = !0, e.updateStatus("error", e.st.ajax.tError.replace("%url%", i.src))
									}
							}, e.st.ajax.settings);
							return e.req = t.ajax(s), ""
					}
			}
	});
	var D, A = function(i) {
			if (i.data && void 0 !== i.data.title) return i.data.title;
			var s = e.st.image.titleSrc;
			if (s) {
					if (t.isFunction(s)) return s.call(e, i);
					if (i.el) return i.el.attr(s) || ""
			}
			return ""
	};
	t.magnificPopup.registerModule("image", {
			options: {
					markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
					cursor: "mfp-zoom-out-cur",
					titleSrc: "title",
					verticalFit: !0,
					tError: '<a href="%url%">The image</a> could not be loaded.'
			},
			proto: {
					initImage: function() {
							var i = e.st.image,
									s = ".image";
							e.types.push("image"), w(c + s, function() {
									"image" === e.currItem.type && i.cursor && t(document.body).addClass(i.cursor)
							}), w(a + s, function() {
									i.cursor && t(document.body).removeClass(i.cursor), _.off("resize" + u)
							}), w("Resize" + s, e.resizeImage), e.isLowIE && w("AfterChange", e.resizeImage)
					},
					resizeImage: function() {
							var t = e.currItem;
							if (t && t.img && e.st.image.verticalFit) {
									var i = 0;
									e.isLowIE && (i = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", e.wH - i)
							}
					},
					_onImageHasSize: function(t) {
							t.img && (t.hasSize = !0, D && clearInterval(D), t.isCheckingImgSize = !1, x("ImageHasSize", t), t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), t.imgHidden = !1))
					},
					findImageSize: function(t) {
							var i = 0,
									s = t.img[0],
									n = function(o) {
											D && clearInterval(D), D = setInterval(function() {
													return s.naturalWidth > 0 ? void e._onImageHasSize(t) : (i > 200 && clearInterval(D), i++, void(3 === i ? n(10) : 40 === i ? n(50) : 100 === i && n(500)))
											}, o)
									};
							n(1)
					},
					getImage: function(i, s) {
							var n = 0,
									o = function() {
											i && (i.img[0].complete ? (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("ready")), i.hasSize = !0, i.loaded = !0, x("ImageLoadComplete")) : (n++, 200 > n ? setTimeout(o, 100) : r()))
									},
									r = function() {
											i && (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("error", a.tError.replace("%url%", i.src))), i.hasSize = !0, i.loaded = !0, i.loadError = !0)
									},
									a = e.st.image,
									l = s.find(".mfp-img");
							if (l.length) {
									var h = document.createElement("img");
									h.className = "mfp-img", i.el && i.el.find("img").length && (h.alt = i.el.find("img").attr("alt")), i.img = t(h).on("load.mfploader", o).on("error.mfploader", r), h.src = i.src, l.is("img") && (i.img = i.img.clone()), (h = i.img[0]).naturalWidth > 0 ? i.hasSize = !0 : h.width || (i.hasSize = !1)
							}
							return e._parseMarkup(s, {
									title: A(i),
									img_replaceWith: i.img
							}, i), e.resizeImage(), i.hasSize ? (D && clearInterval(D), i.loadError ? (s.addClass("mfp-loading"), e.updateStatus("error", a.tError.replace("%url%", i.src))) : (s.removeClass("mfp-loading"), e.updateStatus("ready")), s) : (e.updateStatus("loading"), i.loading = !0, i.hasSize || (i.imgHidden = !0, s.addClass("mfp-loading"), e.findImageSize(i)), s)
					}
			}
	});
	var B, H = function() {
			return void 0 === B && (B = void 0 !== document.createElement("p").style.MozTransform), B
	};
	t.magnificPopup.registerModule("zoom", {
			options: {
					enabled: !1,
					easing: "ease-in-out",
					duration: 300,
					opener: function(t) {
							return t.is("img") ? t : t.find("img")
					}
			},
			proto: {
					initZoom: function() {
							var t, i = e.st.zoom,
									s = ".zoom";
							if (i.enabled && e.supportsTransition) {
									var n, o, r = i.duration,
											h = function(t) {
													var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
															s = "all " + i.duration / 1e3 + "s " + i.easing,
															n = {
																	position: "fixed",
																	zIndex: 9999,
																	left: 0,
																	top: 0,
																	"-webkit-backface-visibility": "hidden"
															},
															o = "transition";
													return n["-webkit-" + o] = n["-moz-" + o] = n["-o-" + o] = n[o] = s, e.css(n), e
											},
											c = function() {
													e.content.css("visibility", "visible")
											};
									w("BuildControls" + s, function() {
											if (e._allowZoom()) {
													if (clearTimeout(n), e.content.css("visibility", "hidden"), !(t = e._getItemToZoom())) return void c();
													(o = h(t)).css(e._getOffset()), e.wrap.append(o), n = setTimeout(function() {
															o.css(e._getOffset(!0)), n = setTimeout(function() {
																	c(), setTimeout(function() {
																			o.remove(), t = o = null, x("ZoomAnimationEnded")
																	}, 16)
															}, r)
													}, 16)
											}
									}), w(l + s, function() {
											if (e._allowZoom()) {
													if (clearTimeout(n), e.st.removalDelay = r, !t) {
															if (!(t = e._getItemToZoom())) return;
															o = h(t)
													}
													o.css(e._getOffset(!0)), e.wrap.append(o), e.content.css("visibility", "hidden"), setTimeout(function() {
															o.css(e._getOffset())
													}, 16)
											}
									}), w(a + s, function() {
											e._allowZoom() && (c(), o && o.remove(), t = null)
									})
							}
					},
					_allowZoom: function() {
							return "image" === e.currItem.type
					},
					_getItemToZoom: function() {
							return !!e.currItem.hasSize && e.currItem.img
					},
					_getOffset: function(i) {
							var s, n = (s = i ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem)).offset(),
									o = parseInt(s.css("padding-top"), 10),
									r = parseInt(s.css("padding-bottom"), 10);
							n.top -= t(window).scrollTop() - o;
							var a = {
									width: s.width(),
									height: (y ? s.innerHeight() : s[0].offsetHeight) - r - o
							};
							return H() ? a["-moz-transform"] = a.transform = "translate(" + n.left + "px," + n.top + "px)" : (a.left = n.left, a.top = n.top), a
					}
			}
	});
	var L = "iframe",
			W = function(t) {
					if (e.currTemplate[L]) {
							var i = e.currTemplate[L].find("iframe");
							i.length && (t || (i[0].src = "//about:blank"), e.isIE8 && i.css("display", t ? "block" : "none"))
					}
			};
	t.magnificPopup.registerModule(L, {
			options: {
					markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
					srcAction: "iframe_src",
					patterns: {
							youtube: {
									index: "youtube.com",
									id: "v=",
									src: "//www.youtube.com/embed/%id%?autoplay=1"
							},
							vimeo: {
									index: "vimeo.com/",
									id: "/",
									src: "//player.vimeo.com/video/%id%?autoplay=1"
							},
							gmaps: {
									index: "//maps.google.",
									src: "%id%&output=embed"
							}
					}
			},
			proto: {
					initIframe: function() {
							e.types.push(L), w("BeforeChange", function(t, e, i) {
									e !== i && (e === L ? W() : i === L && W(!0))
							}), w(a + "." + L, function() {
									W()
							})
					},
					getIframe: function(i, s) {
							var n = i.src,
									o = e.st.iframe;
							t.each(o.patterns, function() {
									return n.indexOf(this.index) > -1 ? (this.id && (n = "string" == typeof this.id ? n.substr(n.lastIndexOf(this.id) + this.id.length, n.length) : this.id.call(this, n)), n = this.src.replace("%id%", n), !1) : void 0
							});
							var r = {};
							return o.srcAction && (r[o.srcAction] = n), e._parseMarkup(s, r, i), e.updateStatus("ready"), s
					}
			}
	});
	var F = function(t) {
					var i = e.items.length;
					return t > i - 1 ? t - i : 0 > t ? i + t : t
			},
			R = function(t, e, i) {
					return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i)
			};
	t.magnificPopup.registerModule("gallery", {
			options: {
					enabled: !1,
					arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
					preload: [0, 2],
					navigateByImgClick: !0,
					arrows: !0,
					tPrev: "Previous (Left arrow key)",
					tNext: "Next (Right arrow key)",
					tCounter: "%curr% of %total%"
			},
			proto: {
					initGallery: function() {
							var i = e.st.gallery,
									n = ".mfp-gallery";
							return e.direction = !0, !(!i || !i.enabled) && (o += " mfp-gallery", w(c + n, function() {
									i.navigateByImgClick && e.wrap.on("click" + n, ".mfp-img", function() {
											return e.items.length > 1 ? (e.next(), !1) : void 0
									}), s.on("keydown" + n, function(t) {
											37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next()
									})
							}), w("UpdateStatus" + n, function(t, i) {
									i.text && (i.text = R(i.text, e.currItem.index, e.currItem.index.items.length))
							}), w(h + n, function(t, s, n, o) {
									var r = e.items.length;
									n.counter = r > 1 ? R(i.tCounter, o.index, r) : ""
							}), w("BuildControls" + n, function() {
									if (e.items.length > 1 && i.arrows && !e.arrowLeft) {
											var s = i.arrowMarkup,
													n = e.arrowLeft = t(s.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(f),
													o = e.arrowRight = t(s.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(f);
											n.click(function() {
													e.prev()
											}), o.click(function() {
													e.next()
											}), e.container.append(n.add(o))
									}
							}), w(p + n, function() {
									e._preloadTimeout && clearTimeout(e._preloadTimeout), e._preloadTimeout = setTimeout(function() {
											e.preloadNearbyImages(), e._preloadTimeout = null
									}, 16)
							}), void w(a + n, function() {
									s.off(n), e.wrap.off("click" + n), e.arrowRight = e.arrowLeft = null
							}))
					},
					next: function() {
							e.direction = !0, e.index = F(e.index + 1), e.updateItemHTML()
					},
					prev: function() {
							e.direction = !1, e.index = F(e.index - 1), e.updateItemHTML()
					},
					goTo: function(t) {
							e.direction = t >= e.index, e.index = t, e.updateItemHTML()
					},
					preloadNearbyImages: function() {
							var t, i = e.st.gallery.preload,
									s = Math.min(i[0], e.items.length),
									n = Math.min(i[1], e.items.length);
							for (t = 1; t <= (e.direction ? n : s); t++) e._preloadItem(e.index + t);
							for (t = 1; t <= (e.direction ? s : n); t++) e._preloadItem(e.index - t)
					},
					_preloadItem: function(i) {
							if (i = F(i), !e.items[i].preloaded) {
									var s = e.items[i];
									s.parsed || (s = e.parseEl(i)), x("LazyLoad", s), "image" === s.type && (s.img = t('<img class="mfp-img" />').on("load.mfploader", function() {
											s.hasSize = !0
									}).on("error.mfploader", function() {
											s.hasSize = !0, s.loadError = !0, x("LazyLoadError", s)
									}).attr("src", s.src)), s.preloaded = !0
							}
					}
			}
	});
	var N = "retina";
	t.magnificPopup.registerModule(N, {
			options: {
					replaceSrc: function(t) {
							return t.src.replace(/\.\w+$/, function(t) {
									return "@2x" + t
							})
					},
					ratio: 1
			},
			proto: {
					initRetina: function() {
							if (window.devicePixelRatio > 1) {
									var t = e.st.retina,
											i = t.ratio;
									(i = isNaN(i) ? i() : i) > 1 && (w("ImageHasSize." + N, function(t, e) {
											e.img.css({
													"max-width": e.img[0].naturalWidth / i,
													width: "100%"
											})
									}), w("ElementParse." + N, function(e, s) {
											s.src = t.replaceSrc(s, i)
									}))
							}
					}
			}
	}), z()
}),
function(t) {
	t(function() {
			function e() {
					t(window).width() <= 1e3 ? (t("#slider-article").addClass("owl-carousel"), t("#slider-article").owlCarousel({
							loop: !0,
							margin: 0,
							nav: !1,
							items: 1,
							dots: !0,
							autoplay: !0,
							autoplayTimeout: 7e3,
							autoplayHoverPause: !0
					})) : t("#slider-article").removeClass("owl-carousel").trigger("destroy.owl.carousel")
			}

			function i() {
					t(window).width() <= 767 ? (t("#slider-list").addClass("owl-carousel"), t("#slider-list").owlCarousel({
							loop: !0,
							margin: 0,
							nav: !1,
							items: 1,
							dots: !0,
							autoplay: !0,
							autoplayTimeout: 7e3,
							autoplayHoverPause: !0
					})) : t("#slider-list").removeClass("owl-carousel").trigger("destroy.owl.carousel")
			}
			t(".hamburger-nav, .b-top-wrapper__item .hamburger").click(function(ev) {
				ev.preventDefault();
				ev.stopPropagation();
				var $body = t('body');
					t(this).toggleClass("is-active");
					if (t(this).hasClass("is-active")) {
						var oldWidth = $body.width();
            t('body').addClass('is-hidden menu-is-open');
            $body.css('margin-right', Math.abs(oldWidth - $body.width()));
					} else {
            t('body').removeClass('is-hidden menu-is-open');
            $body.css('margin-right', '');
					}

					t("#navigation").slideToggle("blind");
			}), t(".b-user__name-ico, .b-user__name-wrapper").click(function(ev) {
				if ($(window).width() > 1024) {
					return void 0;
				}
        ev.stopPropagation();
        t(this).toggleClass("is-active");
        t('body').toggleClass('is-hidden');
				t('#navigation-profile').toggle();
			}), t("#open__fm").click(function() {
					t(this).toggleClass("is-active"), t("#open__fm").hasClass("is-active"), t(".footer__menu").slideToggle("blind")
			}), t("#reviews").owlCarousel({
					loop: !0,
					margin: 62,
					nav: !1,
					items: 2,
					dots: !0,
					autoplay: !0,
					autoplayTimeout: 7e3,
					autoplayHoverPause: !0,
					responsive: {
							0: {
									items: 1,
									margin: 0
							},
							1e3: {
									items: 2
							}
					}
			}), t(document).ready(e), t(window).on("resize", e), t(document).ready(i), t(window).on("resize", i), t(".gallery").magnificPopup({
					delegate: "a",
					type: "image",
					tLoading: "Загрузка...",
					mainClass: "mfp-img-mobile",
					gallery: {
							enabled: !0,
							navigateByImgClick: !0,
							preload: [0, 1]
					},
					image: {
							tError: '<a href="%url%">Изображение #%curr%</a> в данный момент недоступно.',
							titleSrc: function(t) {
									return t.el.attr("title")
							}
					}
			}), t(".js-popup").magnificPopup({
					type: "inline",
					preloader: !1,
					focus: ".email"
			})
	})
}(jQuery);