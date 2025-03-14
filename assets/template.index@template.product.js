(window.shopifySlateJsonp = window.shopifySlateJsonp || []).push([
	[1], {
		14: function(t, e, n) {
			"use strict";

			function r() {
				this.entries = []
			}

			function o(t) {
				if ("object" != typeof t) throw new TypeError(t + " is not an object.");
				if (0 === Object.keys(t).length && t.constructor === Object) throw new Error(t + " is empty.")
			}
			r.prototype.add = function(t, e, n) {
				this.entries.push({
					element: t,
					event: e,
					fn: n
				}), t.addEventListener(e, n)
			}, r.prototype.removeAll = function() {
				this.entries = this.entries.filter(function(t) {
					return t.element.removeEventListener(t.event, t.fn), !1
				})
			};
			var i = {
				idInput: '[name="id"]',
				optionInput: '[name^="options"]',
				quantityInput: '[name="quantity"]',
				propertyInput: '[name^="properties"]'
			};

			function a(t, e, n) {
				this.element = t, this.product = function(t) {
					if ("object" != typeof t) throw new TypeError(t + " is not an object.");
					if (void 0 === t.variants[0].options) throw new TypeError("Product object is invalid. Make sure you use the product object that is output from {{ product | json }} or from the http://[your-product-url].js route");
					return t
				}(e), n = n || {}, this._listeners = new r, this._listeners.add(this.element, "submit", this._onSubmit.bind(this, n)), this.optionInputs = this._initInputs(i.optionInput, n.onOptionChange), this.quantityInputs = this._initInputs(i.quantityInput, n.onQuantityChange), this.propertyInputs = this._initInputs(i.propertyInput, n.onPropertyChange)
			}

			function s(t, e) {
				return t.reduce(function(t, n) {
					return (n.checked || "radio" !== n.type && "checkbox" !== n.type) && t.push(e({
						name: n.name,
						value: n.value
					})), t
				}, [])
			}
			a.prototype.destroy = function() {
				this._listeners.removeAll()
			}, a.prototype.options = function() {
				return s(this.optionInputs, function(t) {
					return t.name = /(?:^(options\[))(.*?)(?:\])/.exec(t.name)[2], t
				})
			}, a.prototype.variant = function() {
				return function(t, e) {
					return o(t),
						function(t, e) {
							return o(t),
								function(t) {
									if (Array.isArray(t) && "object" == typeof t[0]) throw new Error(t + "is not a valid array of options.")
								}(e), t.variants.filter(function(t) {
									return e.every(function(e, n) {
										return t.options[n] === e
									})
								})[0] || null
						}(t, function(t, e) {
							o(t),
								function(t) {
									if (!Array.isArray(t)) throw new TypeError(t + " is not an array.");
									if (0 === t.length) throw new Error(t + " is empty.");
									if (!t[0].hasOwnProperty("name")) throw new Error(t[0] + "does not contain name key.");
									if ("string" != typeof t[0].name) throw new TypeError("Invalid value type passed for name of option " + t[0].name + ". Value should be string.")
								}(e);
							var n = [];
							return e.forEach(function(e) {
								for (var r = 0; r < t.options.length; r++)
									if (t.options[r].name.toLowerCase() === e.name.toLowerCase()) {
										n[r] = e.value;
										break
									}
							}), n
						}(t, e))
				}(this.product, this.options())
			}, a.prototype.properties = function() {
				return s(this.propertyInputs, function(t) {
					return t.name = /(?:^(properties\[))(.*?)(?:\])/.exec(t.name)[2], t
				})
			}, a.prototype.quantity = function() {
				return this.quantityInputs[0] ? Number.parseInt(this.quantityInputs[0].value, 10) : 1
			}, a.prototype._setIdInputValue = function(t) {
				var e = this.element.querySelector(i.idInput);
				e || ((e = document.createElement("input")).type = "hidden", e.name = "id", this.element.appendChild(e)), e.value = t.toString()
			}, a.prototype._onSubmit = function(t, e) {
				e.dataset = this._getProductFormEventData(), this._setIdInputValue(e.dataset.variant.id), t.onFormSubmit && t.onFormSubmit(e)
			}, a.prototype._onFormEvent = function(t) {
				return void 0 === t ? Function.prototype : function(e) {
					e.dataset = this._getProductFormEventData(), t(e)
				}.bind(this)
			}, a.prototype._initInputs = function(t, e) {
				return Array.prototype.slice.call(this.element.querySelectorAll(t)).map(function(t) {
					return this._listeners.add(t, "change", this._onFormEvent(e)), t
				}.bind(this))
			}, a.prototype._getProductFormEventData = function() {
				return {
					options: this.options(),
					variant: this.variant(),
					properties: this.properties(),
					quantity: this.quantity()
				}
			};
			var c = n(9),
				u = n(4),
				p = n(5);
			const d = "hide",
				h = {
					submitButton: "[data-submit-button]",
					submitButtonText: "[data-submit-button-text]",
					comparePrice: "[data-compare-price]",
					comparePriceText: "[data-compare-text]",
					priceWrapper: "[data-price-wrapper]",
					imageWrapper: "[data-product-image-wrapper]",
					visibleImageWrapper: "[data-product-image-wrapper]:not(.hide)",
					imageWrapperById: t => `${h.imageWrapper}[data-image-id='${t}']`,
					productForm: "[data-product-form]",
					productPrice: "[data-product-price]",
					thumbnail: "[data-product-single-thumbnail]",
					thumbnailById: t => `[data-thumbnail-id='${t}']`,
					thumbnailActive: "[data-product-single-thumbnail][aria-current]"
				};
			Object(u.b)("product", {
				async onLoad() {
					const t = document.querySelector(h.productForm);
					this.product = await this.getProductJson(t.dataset.productHandle), this.productForm = new a(t, this.product, {
						onOptionChange: this.onFormOptionChange.bind(this)
					}), this.onThumbnailClick = this.onThumbnailClick.bind(this), this.onThumbnailKeyup = this.onThumbnailKeyup.bind(this), this.container.addEventListener("click", this.onThumbnailClick), this.container.addEventListener("keyup", this.onThumbnailKeyup)
				},
				onUnload() {
					this.productForm.destroy(), this.removeEventListener("click", this.onThumbnailClick), this.removeEventListener("keyup", this.onThumbnailKeyup)
				},
				getProductJson: t => fetch(`/products/${t}.js`).then(t => t.json()),
				onFormOptionChange(t) {
					const e = t.dataset.variant;
         //alert(e.title.split(" / ")[0]);
					this.renderSwatches(e), this.renderSelectedColor(e), this.renderImages(e), this.renderScrollToImages(e), this.renderFancybox(e), this.renderPrice(e), this.renderComparePrice(e), this.renderSubmitButton(e), this.updateBrowserHistory(e)
				},
				onThumbnailClick(t) {
					const e = t.target.closest(h.thumbnail);
					e && (t.preventDefault(), this.renderFeaturedImage(e.dataset.thumbnailId), this.renderActiveThumbnail(e.dataset.thumbnailId))
				},
				onThumbnailKeyup(t) {
					if (13 !== t.keyCode || !t.target.closest(h.thumbnail)) return;
					const e = this.container.querySelector(h.visibleImageWrapper);
					Object(p.c)(e)
				},
				renderSubmitButton(t) {
					const e = this.container.querySelector(h.submitButton),
						n = this.container.querySelector(h.submitButtonText);
					t ? t.available ? (e.disabled = !1, n.innerText = theme.strings.addToCart) : (e.disabled = !0, n.innerText = theme.strings.soldOut) : (e.disabled = !0, n.innerText = theme.strings.unavailable)
				},
				renderSwatches(t) {
					var e = this.originalSelectorId;
					if (t)
						for (var n = $(e).closest("form"), r = 0, o = t.options.length; r < o; r++) {
							var i = n.find('.swatch[data-option-index="' + r + '"] :radio[value="' + t.options[r] + '"]');
							i.length && (i.get(0).checked = !0)
						}
				},
				renderSelectedColor(t) {
					$(".selected_color span").html(t.title)
				},
				renderImages(t) {
					$(".product-image .responsive-image__wrapper a").each(function() {
						//if($(this).attr("data-variant").split(" - ")[1] == t.title) {
						if ($(this).attr("data-variant").split(" - ")[1] == t.title.split(" / ")[0]) {
							$(this).parent().addClass("slide-visible")
							$(this).parent().removeClass("hide")
						} else {
							$(this).parent().removeClass("slide-visible")
							if (!$(this).parent().hasClass("hide")) {
								$(this).parent().addClass("hide")
							}
						}
						mySlider.reloadSlider();
					})
					// t && null !== t.featured_image && (this.renderFeaturedImage(t.featured_image.id), this.renderActiveThumbnail(t.featured_image.id))
				},
				renderScrollToImages(t) {
					$("html, body").animate({
						scrollTop: $(".bx-wrapper").offset().top
					}, 500)
				},
				renderFancybox(t) {
					$(".product-image .responsive-image__wrapper a").each(function() {
						$(this).attr("data-variant").split(" - ")[1] == t.title ? $(this).attr("data-fancybox", "gallery") : $(this).removeAttr("data-fancybox")
					})
				},
				renderThumbnails(t) {
					t && null !== t.featured_image && (console.log(JSON.stringify(t)), console.log(t.featured_image.id), $(".prodcut_gallery ul li img").each(function() {
						for (var e = $(this); 1 === e.parent().children().length;) e = e.parent();
						jQuery(this).attr("alt") === t.title || jQuery(this).attr("data-featured-image-id") == t.featured_image.id ? e.show() : e.hide()
					}))
				},
				renderPrice(t) {
					const e = this.container.querySelector(h.productPrice);
					this.container.querySelector(h.priceWrapper).classList.toggle(d, !t), t && (e.innerText = Object(c.formatMoney)(t.price * 1.25, theme.moneyFormat))
				},
				renderComparePrice(t) {
					if (!t) return;
					const e = this.container.querySelector(h.comparePrice),
						n = this.container.querySelector(h.comparePriceText);
					e && n && (t.compare_at_price > t.price ? (e.innerText = Object(c.formatMoney)(t.compare_at_price, theme.moneyFormat), n.classList.remove(d), e.classList.remove(d)) : (e.innerText = "", n.classList.add(d), e.classList.add(d)))
				},
				renderActiveThumbnail(t) {
					const e = this.container.querySelector(h.thumbnailById(t)),
						n = this.container.querySelector(h.thumbnailActive);
					e !== n && (n.removeAttribute("aria-current"), e.setAttribute("aria-current", !0))
				},
				renderFeaturedImage(t) {
					const e = this.container.querySelector(h.visibleImageWrapper),
						n = this.container.querySelector(h.imageWrapperById(t));
					e.classList.add(d), n.classList.remove(d)
				},
				updateBrowserHistory(t) {
					const e = this.productForm.element.dataset.enableHistoryState;
					if (!t || "true" !== e) return;
					const n = function(t, e) {
						return /variant=/.test(t) ? t.replace(/(variant=)[^&]+/, "$1" + e) : /\?/.test(t) ? t.concat("&variant=").concat(e) : t.concat("?variant=").concat(e)
					}(window.location.href, t.id);
					window.history.replaceState({
						path: n
					}, "", n)
				}
			})
		},
		4: function(t, e, n) {
			"use strict";
			var r = "data-section-id";

			function o(t, e) {
				this.container = function(t) {
					if (!(t instanceof Element)) throw new TypeError("Theme Sections: Attempted to load section. The section container provided is not a DOM element.");
					if (null === t.getAttribute(r)) throw new Error("Theme Sections: The section container provided does not have an id assigned to the " + r + " attribute.");
					return t
				}(t), this.id = t.getAttribute(r), this.extensions = [], Object.assign(this, function(t) {
					if (void 0 !== t && "object" != typeof t || null === t) throw new TypeError("Theme Sections: The properties object provided is not a valid");
					return t
				}(e)), this.onLoad()
			}
			o.prototype = {
				onLoad: Function.prototype,
				onUnload: Function.prototype,
				onSelect: Function.prototype,
				onDeselect: Function.prototype,
				onBlockSelect: Function.prototype,
				onBlockDeselect: Function.prototype,
				extend: function(t) {
					this.extensions.push(t);
					var e = Object.assign({}, t);
					delete e.init, Object.assign(this, e), "function" == typeof t.init && t.init.apply(this)
				}
			}, "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
				value: function(t) {
					if (null == t) throw new TypeError("Cannot convert undefined or null to object");
					for (var e = Object(t), n = 1; n < arguments.length; n++) {
						var r = arguments[n];(window.shopifySlateJsonp=window.shopifySlateJsonp||[]).push([[1],{14:function(t,e,n){"use strict";function r(){this.entries=[]}function o(t){if("object"!=typeof t)throw new TypeError(t+" is not an object.");if(0===Object.keys(t).length&&t.constructor===Object)throw new Error(t+" is empty.")}r.prototype.add=function(t,e,n){this.entries.push({element:t,event:e,fn:n}),t.addEventListener(e,n)},r.prototype.removeAll=function(){this.entries=this.entries.filter(function(t){return t.element.removeEventListener(t.event,t.fn),!1})};var i={idInput:'[name="id"]',optionInput:'[name^="options"]',quantityInput:'[name="quantity"]',propertyInput:'[name^="properties"]'};function a(t,e,n){this.element=t,this.product=function(t){if("object"!=typeof t)throw new TypeError(t+" is not an object.");if(void 0===t.variants[0].options)throw new TypeError("Product object is invalid. Make sure you use the product object that is output from {{ product | json }} or from the http://[your-product-url].js route");return t}(e),n=n||{},this._listeners=new r,this._listeners.add(this.element,"submit",this._onSubmit.bind(this,n)),this.optionInputs=this._initInputs(i.optionInput,n.onOptionChange),this.quantityInputs=this._initInputs(i.quantityInput,n.onQuantityChange),this.propertyInputs=this._initInputs(i.propertyInput,n.onPropertyChange)}function s(t,e){return t.reduce(function(t,n){return(n.checked||"radio"!==n.type&&"checkbox"!==n.type)&&t.push(e({name:n.name,value:n.value})),t},[])}a.prototype.destroy=function(){this._listeners.removeAll()},a.prototype.options=function(){return s(this.optionInputs,function(t){return t.name=/(?:^(options\[))(.*?)(?:\])/.exec(t.name)[2],t})},a.prototype.variant=function(){return function(t,e){return o(t),function(t,e){return o(t),function(t){if(Array.isArray(t)&&"object"==typeof t[0])throw new Error(t+"is not a valid array of options.")}(e),t.variants.filter(function(t){return e.every(function(e,n){return t.options[n]===e})})[0]||null}(t,function(t,e){o(t),function(t){if(!Array.isArray(t))throw new TypeError(t+" is not an array.");if(0===t.length)throw new Error(t+" is empty.");if(!t[0].hasOwnProperty("name"))throw new Error(t[0]+"does not contain name key.");if("string"!=typeof t[0].name)throw new TypeError("Invalid value type passed for name of option "+t[0].name+". Value should be string.")}(e);var n=[];return e.forEach(function(e){for(var r=0;r<t.options.length;r++)if(t.options[r].name.toLowerCase()===e.name.toLowerCase()){n[r]=e.value;break}}),n}(t,e))}(this.product,this.options())},a.prototype.properties=function(){return s(this.propertyInputs,function(t){return t.name=/(?:^(properties\[))(.*?)(?:\])/.exec(t.name)[2],t})},a.prototype.quantity=function(){return this.quantityInputs[0]?Number.parseInt(this.quantityInputs[0].value,10):1},a.prototype._setIdInputValue=function(t){var e=this.element.querySelector(i.idInput);e||((e=document.createElement("input")).type="hidden",e.name="id",this.element.appendChild(e)),e.value=t.toString()},a.prototype._onSubmit=function(t,e){e.dataset=this._getProductFormEventData(),this._setIdInputValue(e.dataset.variant.id),t.onFormSubmit&&t.onFormSubmit(e)},a.prototype._onFormEvent=function(t){return void 0===t?Function.prototype:function(e){e.dataset=this._getProductFormEventData(),t(e)}.bind(this)},a.prototype._initInputs=function(t,e){return Array.prototype.slice.call(this.element.querySelectorAll(t)).map(function(t){return this._listeners.add(t,"change",this._onFormEvent(e)),t}.bind(this))},a.prototype._getProductFormEventData=function(){return{options:this.options(),variant:this.variant(),properties:this.properties(),quantity:this.quantity()}};var c=n(9),u=n(4),p=n(5);const d="hide",h={submitButton:"[data-submit-button]",submitButtonText:"[data-submit-button-text]",comparePrice:"[data-compare-price]",comparePriceText:"[data-compare-text]",priceWrapper:"[data-price-wrapper]",imageWrapper:"[data-product-image-wrapper]",visibleImageWrapper:"[data-product-image-wrapper]:not(.hide)",imageWrapperById:t=>`${h.imageWrapper}[data-image-id='${t}']`,productForm:"[data-product-form]",productPrice:"[data-product-price]",thumbnail:"[data-product-single-thumbnail]",thumbnailById:t=>`[data-thumbnail-id='${t}']`,thumbnailActive:"[data-product-single-thumbnail][aria-current]"};Object(u.b)("product",{async onLoad(){const t=document.querySelector(h.productForm);this.product=await this.getProductJson(t.dataset.productHandle),this.productForm=new a(t,this.product,{onOptionChange:this.onFormOptionChange.bind(this)}),this.onThumbnailClick=this.onThumbnailClick.bind(this),this.onThumbnailKeyup=this.onThumbnailKeyup.bind(this),this.container.addEventListener("click",this.onThumbnailClick),this.container.addEventListener("keyup",this.onThumbnailKeyup)},onUnload(){this.productForm.destroy(),this.removeEventListener("click",this.onThumbnailClick),this.removeEventListener("keyup",this.onThumbnailKeyup)},getProductJson:t=>fetch(`/products/${t}.js`).then(t=>t.json()),onFormOptionChange(t){const e=t.dataset.variant;this.renderSwatches(e),this.renderSelectedColor(e),this.renderImages(e),this.renderFancybox(e),this.renderPrice(e),this.renderComparePrice(e),this.renderSubmitButton(e),this.updateBrowserHistory(e)},onThumbnailClick(t){const e=t.target.closest(h.thumbnail);e&&(t.preventDefault(),this.renderFeaturedImage(e.dataset.thumbnailId),this.renderActiveThumbnail(e.dataset.thumbnailId))},onThumbnailKeyup(t){if(13!==t.keyCode||!t.target.closest(h.thumbnail))return;const e=this.container.querySelector(h.visibleImageWrapper);Object(p.c)(e)},renderSubmitButton(t){const e=this.container.querySelector(h.submitButton),n=this.container.querySelector(h.submitButtonText);t?t.available?(e.disabled=!1,n.innerText=theme.strings.addToCart):(e.disabled=!0,n.innerText=theme.strings.soldOut):(e.disabled=!0,n.innerText=theme.strings.unavailable)},renderSwatches(t){var e=this.originalSelectorId;if(t)for(var n=$(e).closest("form"),r=0,o=t.options.length;r<o;r++){var i=n.find('.swatch[data-option-index="'+r+'"] :radio[value="'+t.options[r]+'"]');i.length&&(i.get(0).checked=!0)}},renderSelectedColor(t){$(".selected_color span").html(t.title)},renderImages(t) {
                  $(".product-image .responsive-image__wrapper a").each(function() {
                    //if($(this).attr("data-variant").split(" - ")[1] == t.title) {
                    if($(this).attr("data-variant").split(" - ")[1] == t.title.split(" / ")[0]) {
                      $(this).parent().addClass("slide-visible")
                      $(this).parent().removeClass("hide")
                    } else {
                      $(this).parent().removeClass("slide-visible")
                      if(!$(this).parent().hasClass("hide")) {
                        $(this).parent().addClass("hide")
                      }
                    }
                    mySlider.reloadSlider();
                  })
                  // t && null !== t.featured_image && (this.renderFeaturedImage(t.featured_image.id), this.renderActiveThumbnail(t.featured_image.id))
              },renderFancybox(t){$(".product-image .responsive-image__wrapper a").each(function(){$(this).attr("data-variant").split(" - ")[1]==t.title?$(this).attr("data-fancybox","gallery"):$(this).removeAttr("data-fancybox")})},renderThumbnails(t){t&&null!==t.featured_image&&(console.log(JSON.stringify(t)),console.log(t.featured_image.id),$(".prodcut_gallery ul li img").each(function(){for(var e=$(this);1===e.parent().children().length;)e=e.parent();jQuery(this).attr("alt")===t.title||jQuery(this).attr("data-featured-image-id")==t.featured_image.id?e.show():e.hide()}))},renderPrice(t){const e=this.container.querySelector(h.productPrice);this.container.querySelector(h.priceWrapper).classList.toggle(d,!t),t&&(e.innerText=Object(c.formatMoney)(t.price,theme.moneyFormat))},renderComparePrice(t){if(!t)return;const e=this.container.querySelector(h.comparePrice),n=this.container.querySelector(h.comparePriceText);e&&n&&(t.compare_at_price>t.price?(e.innerText=Object(c.formatMoney)(t.compare_at_price,theme.moneyFormat),n.classList.remove(d),e.classList.remove(d)):(e.innerText="",n.classList.add(d),e.classList.add(d)))},renderActiveThumbnail(t){const e=this.container.querySelector(h.thumbnailById(t)),n=this.container.querySelector(h.thumbnailActive);e!==n&&(n.removeAttribute("aria-current"),e.setAttribute("aria-current",!0))},renderFeaturedImage(t){const e=this.container.querySelector(h.visibleImageWrapper),n=this.container.querySelector(h.imageWrapperById(t));e.classList.add(d),n.classList.remove(d)},updateBrowserHistory(t){const e=this.productForm.element.dataset.enableHistoryState;if(!t||"true"!==e)return;const n=function(t,e){return/variant=/.test(t)?t.replace(/(variant=)[^&]+/,"$1"+e):/\?/.test(t)?t.concat("&variant=").concat(e):t.concat("?variant=").concat(e)}(window.location.href,t.id);window.history.replaceState({path:n},"",n)}})},4:function(t,e,n){"use strict";var r="data-section-id";function o(t,e){this.container=function(t){if(!(t instanceof Element))throw new TypeError("Theme Sections: Attempted to load section. The section container provided is not a DOM element.");if(null===t.getAttribute(r))throw new Error("Theme Sections: The section container provided does not have an id assigned to the "+r+" attribute.");return t}(t),this.id=t.getAttribute(r),this.extensions=[],Object.assign(this,function(t){if(void 0!==t&&"object"!=typeof t||null===t)throw new TypeError("Theme Sections: The properties object provided is not a valid");return t}(e)),this.onLoad()}o.prototype={onLoad:Function.prototype,onUnload:Function.prototype,onSelect:Function.prototype,onDeselect:Function.prototype,onBlockSelect:Function.prototype,onBlockDeselect:Function.prototype,extend:function(t){this.extensions.push(t);var e=Object.assign({},t);delete e.init,Object.assign(this,e),"function"==typeof t.init&&t.init.apply(this)}},"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(t){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var r=arguments[n];if(null!=r)for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},writable:!0,configurable:!0}),n.d(e,"b",function(){return c}),n.d(e,"a",function(){return u});var i="data-section-type";window.Shopify=window.Shopify||{},window.Shopify.theme=window.Shopify.theme||{},window.Shopify.theme.sections=window.Shopify.theme.sections||{};var a=window.Shopify.theme.sections.registered=window.Shopify.theme.sections.registered||{},s=window.Shopify.theme.sections.instances=window.Shopify.theme.sections.instances||[];function c(t,e){if("string"!=typeof t)throw new TypeError("Theme Sections: The first argument for .register must be a string that specifies the type of the section being registered");if(void 0!==a[t])throw new Error('Theme Sections: A section of type "'+t+'" has already been registered. You cannot register the same section type twice');function n(t){o.call(this,t,e)}return n.constructor=o,n.prototype=Object.create(o.prototype),n.prototype.type=t,a[t]=n}function u(t,e){t=h(t),void 0===e&&(e=document.querySelectorAll("["+i+"]")),e=l(e),t.forEach(function(t){var n=a[t];void 0!==n&&(e=e.filter(function(e){return!(p(e).length>0||null===e.getAttribute(i)||e.getAttribute(i)===t&&(s.push(new n(e)),1))}))})}function p(t){var e=[];if(NodeList.prototype.isPrototypeOf(t)||Array.isArray(t))var n=t[0];return t instanceof Element||n instanceof Element?l(t).forEach(function(t){e=e.concat(s.filter(function(e){return e.container===t}))}):"string"!=typeof t&&"string"!=typeof n||h(t).forEach(function(t){e=e.concat(s.filter(function(e){return e.type===t}))}),e}function d(t){for(var e,n=0;n<s.length;n++)if(s[n].id===t){e=s[n];break}return e}function h(t){return"*"===t?t=Object.keys(a):"string"==typeof t?t=[t]:t.constructor===o?t=[t.prototype.type]:Array.isArray(t)&&t[0].constructor===o&&(t=t.map(function(t){return t.prototype.type})),t.map(function(t){return t.toLowerCase()})}function l(t){return NodeList.prototype.isPrototypeOf(t)&&t.length>0?t=Array.prototype.slice.call(t):NodeList.prototype.isPrototypeOf(t)&&0===t.length?t=[]:null===t?t=[]:!Array.isArray(t)&&t instanceof Element&&(t=[t]),t}window.Shopify.designMode&&(document.addEventListener("shopify:section:load",function(t){var e=t.detail.sectionId,n=t.target.querySelector('[data-section-id="'+e+'"]');null!==n&&u(n.getAttribute(i),n)}),document.addEventListener("shopify:section:unload",function(t){var e=t.detail.sectionId,n=t.target.querySelector('[data-section-id="'+e+'"]');"object"==typeof p(n)[0]&&p(n).forEach(function(t){var e=s.map(function(t){return t.id}).indexOf(t.id);s.splice(e,1),t.onUnload()})}),document.addEventListener("shopify:section:select",function(t){var e=d(t.detail.sectionId);"object"==typeof e&&e.onSelect(t)}),document.addEventListener("shopify:section:deselect",function(t){var e=d(t.detail.sectionId);"object"==typeof e&&e.onDeselect(t)}),document.addEventListener("shopify:block:select",function(t){var e=d(t.detail.sectionId);"object"==typeof e&&e.onBlockSelect(t)}),document.addEventListener("shopify:block:deselect",function(t){var e=d(t.detail.sectionId);"object"==typeof e&&e.onBlockDeselect(t)}))},9:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.formatMoney=function(t,e){"string"==typeof t&&(t=t.replace(".",""));var n="",o=/\{\{\s*(\w+)\s*\}\}/,i=e||r;function a(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:",",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:".";if(isNaN(t)||null==t)return 0;var o=(t=(t/100).toFixed(e)).split(".");return o[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+n)+(o[1]?r+o[1]:"")}switch(i.match(o)[1]){case"amount":n=a(t,2);break;case"amount_no_decimals":n=a(t,0);break;case"amount_with_comma_separator":n=a(t,2,".",",");break;case"amount_no_decimals_with_comma_separator":n=a(t,0,".",",")}return i.replace(o,n)};var r="${{amount}}"}}]);
						if (null != r)
							for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
					}
					return e
				},
				writable: !0,
				configurable: !0
			}), n.d(e, "b", function() {
				return c
			}), n.d(e, "a", function() {
				return u
			});
			var i = "data-section-type";
			window.Shopify = window.Shopify || {}, window.Shopify.theme = window.Shopify.theme || {}, window.Shopify.theme.sections = window.Shopify.theme.sections || {};
			var a = window.Shopify.theme.sections.registered = window.Shopify.theme.sections.registered || {},
				s = window.Shopify.theme.sections.instances = window.Shopify.theme.sections.instances || [];

			function c(t, e) {
				if ("string" != typeof t) throw new TypeError("Theme Sections: The first argument for .register must be a string that specifies the type of the section being registered");
				if (void 0 !== a[t]) throw new Error('Theme Sections: A section of type "' + t + '" has already been registered. You cannot register the same section type twice');

				function n(t) {
					o.call(this, t, e)
				}
				return n.constructor = o, n.prototype = Object.create(o.prototype), n.prototype.type = t, a[t] = n
			}

			function u(t, e) {
				t = h(t), void 0 === e && (e = document.querySelectorAll("[" + i + "]")), e = l(e), t.forEach(function(t) {
					var n = a[t];
					void 0 !== n && (e = e.filter(function(e) {
						return !(p(e).length > 0 || null === e.getAttribute(i) || e.getAttribute(i) === t && (s.push(new n(e)), 1))
					}))
				})
			}

			function p(t) {
				var e = [];
				if (NodeList.prototype.isPrototypeOf(t) || Array.isArray(t)) var n = t[0];
				return t instanceof Element || n instanceof Element ? l(t).forEach(function(t) {
					e = e.concat(s.filter(function(e) {
						return e.container === t
					}))
				}) : "string" != typeof t && "string" != typeof n || h(t).forEach(function(t) {
					e = e.concat(s.filter(function(e) {
						return e.type === t
					}))
				}), e
			}

			function d(t) {
				for (var e, n = 0; n < s.length; n++)
					if (s[n].id === t) {
						e = s[n];
						break
					} return e
			}

			function h(t) {
				return "*" === t ? t = Object.keys(a) : "string" == typeof t ? t = [t] : t.constructor === o ? t = [t.prototype.type] : Array.isArray(t) && t[0].constructor === o && (t = t.map(function(t) {
					return t.prototype.type
				})), t.map(function(t) {
					return t.toLowerCase()
				})
			}

			function l(t) {
				return NodeList.prototype.isPrototypeOf(t) && t.length > 0 ? t = Array.prototype.slice.call(t) : NodeList.prototype.isPrototypeOf(t) && 0 === t.length ? t = [] : null === t ? t = [] : !Array.isArray(t) && t instanceof Element && (t = [t]), t
			}
			window.Shopify.designMode && (document.addEventListener("shopify:section:load", function(t) {
				var e = t.detail.sectionId,
					n = t.target.querySelector('[data-section-id="' + e + '"]');
				null !== n && u(n.getAttribute(i), n)
			}), document.addEventListener("shopify:section:unload", function(t) {
				var e = t.detail.sectionId,
					n = t.target.querySelector('[data-section-id="' + e + '"]');
				"object" == typeof p(n)[0] && p(n).forEach(function(t) {
					var e = s.map(function(t) {
						return t.id
					}).indexOf(t.id);
					s.splice(e, 1), t.onUnload()
				})
			}), document.addEventListener("shopify:section:select", function(t) {
				var e = d(t.detail.sectionId);
				"object" == typeof e && e.onSelect(t)
			}), document.addEventListener("shopify:section:deselect", function(t) {
				var e = d(t.detail.sectionId);
				"object" == typeof e && e.onDeselect(t)
			}), document.addEventListener("shopify:block:select", function(t) {
				var e = d(t.detail.sectionId);
				"object" == typeof e && e.onBlockSelect(t)
			}), document.addEventListener("shopify:block:deselect", function(t) {
				var e = d(t.detail.sectionId);
				"object" == typeof e && e.onBlockDeselect(t)
			}))
		},
		9: function(t, e, n) {
			"use strict";
			Object.defineProperty(e, "__esModule", {
				value: !0
			}), e.formatMoney = function(t, e) {
				"string" == typeof t && (t = t.replace(".", ""));
				var n = "",
					o = /\{\{\s*(\w+)\s*\}\}/,
					i = e || r;

				function a(t) {
					var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2,
						n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ",",
						r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ".";
					if (isNaN(t) || null == t) return 0;
					var o = (t = (t / 100).toFixed(e)).split(".");
					return o[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + n) + (o[1] ? r + o[1] : "")
				}
				switch (i.match(o)[1]) {
					case "amount":
						n = a(t, 2);
						break;
					case "amount_no_decimals":
						n = a(t, 0);
						break;
					case "amount_with_comma_separator":
						n = a(t, 2, ".", ",");
						break;
					case "amount_no_decimals_with_comma_separator":
						n = a(t, 0, ".", ",")
				}
				return i.replace(o, n)
			};
			var r = "${{amount}}"
		}
	}
]);