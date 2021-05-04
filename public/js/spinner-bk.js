! function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e) : function(e) {
        if (!e.document) throw new Error("CNV widget requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(l) {
    "use strict";
    // var m = {
    //     randomInt: function() {
    //         var e = Number.MIN_SAFE_INTEGER,
    //             t = Number.MAX_SAFE_INTEGER;
    //         return Math.floor(Math.random() * (t - e + 1)) + e
    //     },
    //     isMobile: function(e) {
    //         return e && screen && screen.width ? !!(screen.width <= 699 || navigator.userAgent.match(/(iPad|iPhone|iPod|Android)/g)) : !!navigator.userAgent.match(/(iPad|iPhone|iPod|Android)/g)
    //     },
    //     getNewGuid: function() {
    //         function e() {
    //             return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    //         }
    //         return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
    //     },
    //     setCookie: function(e, t, n, i) {
    //         var r = new Date;
    //         r.setTime(r.getTime() + 24 * n * 60 * 60 * 1e3);
    //         var o = e + "=" + t + ";" + ("expires=" + r.toUTCString()) + ";path=/;";
    //         i && (o += "SameSite=" + i + ";"), document.cookie = o
    //     },
    //     getCookie: function(e) {
    //         for (var t = e + "=", n = decodeURIComponent(document.cookie).split(";"), i = 0; i < n.length; i++) {
    //             for (var r = n[i];
    //                 " " == r.charAt(0);) r = r.substring(1);
    //             if (0 == r.indexOf(t)) return r.substring(t.length, r.length)
    //         }
    //         return ""
    //     },
    //     removeCookie: function(e, t, n) {
    //         document.cookie = encodeURIComponent(e) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (n ? "; domain=" + n : "") + (t ? "; path=" + t : "")
    //     },
    //     getParameterByName: function(e, t) {
    //         t || (t = l.location.href), e = e.replace(/[\[\]]/g, "\\$&");
    //         var n = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
    //         return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "" : null
    //     },
    //     addListener: function(e, t, n) {
    //         e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n
    //     },
    //     hasCustomerChat: !1
    // };
    // function r(e, t, n, i) {
    //     null != n && null != n && n.hasOwnProperty("type") && "customer_chat" === n.type && function(e, t, n, i) {
    //         if (!m.hasCustomerChat && null != i && null != i && 0 != i.length) {
    //             m.hasCustomerChat = !0;
    //             var r = document.createElement("div");
    //             if (r.setAttribute("class", "fb-customerchat"), r.setAttribute("page_id", t), i.greeting_dialog_display ? r.setAttribute("greeting_dialog_display", i.greeting_dialog_display) : r.setAttribute("greeting_dialog_display", "hide"), i.logged_in_greeting && r.setAttribute("logged_in_greeting", i.logged_in_greeting), i.logged_out_greeting && r.setAttribute("logged_out_greeting", i.logged_out_greeting), n.hasOwnProperty("ref")) {
    //                 var o = n.ref;
    //                 null != o && null != o && 0 < o.length && r.setAttribute("ref", o)
    //             }
    //             if (document.getElementsByTagName("body")[0].appendChild(r), m.isMobile(!0)) var a = setInterval(function() {
    //                 var e = document.getElementById("fb-root").getElementsByClassName("fb_dialog");
    //                 e && 0 < e.length && (e[0].style.display = "inline", e[0].innerHTML = '<img src="//staticxx.facebook.com/images/messaging/commerce/livechat/MessengerIcon.png" style="position:fixed;bottom:50px;right:30px" height="60" width="60" alt="" class="img">', e[0].onclick = function(e) {
    //                     l.open("//m.me/" + t + "?ref=" + o, "_blank")
    //                 }, clearInterval(a))
    //             }, 250)
    //         }
    //     }(0, t, n, i)
    // }
    // function o(e, t, n, i) {
    //     null != n && null != n && n.hasOwnProperty("type") && null != i && function(e, t, n, i) {
    //         if (null != i && null != i && 0 != i.length) {
    //             var r = null != i.settings ? i.settings.button_size : "standard",
    //                 o = null != i.settings && i.settings.plugin_align,
    //                 a = null != i.settings && 1 == i.settings.skin ? "light" : "dark",
    //                 l = document.createElement("div"),
    //                 s = "https://" + location.hostname;
    //             if (l.setAttribute("class", "fb-messenger-checkbox"), l.setAttribute("origin", s), l.setAttribute("page_id", t), l.setAttribute("minimized", "true"), l.setAttribute("messenger_app_id", e), l.setAttribute("prechecked", "false"), l.setAttribute("size", r), l.setAttribute("skin", a), l.setAttribute("center_align", o), l.setAttribute("id", i.growthtool_id), n.hasOwnProperty("ref")) {
    //                 var u = m.getNewGuid(),
    //                     d = n.id;
    //                 null != u && null != u && 0 < u.length && l.setAttribute("user_ref", u)
    //             }
    //             var c = "[data-widget-id='" + d + "']",
    //                 g = document.querySelectorAll(c);
    //             null != g && 0 < g.length && g[0].replaceWith(l)
    //         }
    //     }(e, t, n, i)
    // }
    // if (l.hasOwnProperty("hrfwidget") && (null != (i = l.hrfwidget) && null != i && i.hasOwnProperty("appId") && i.hasOwnProperty("pageId") && i.hasOwnProperty("widgets"))) {
    //     var a = i.appId,
    //         s = i.pageId,
    //         e = i.widgets,
    //         u = i.checkboxs,
    //         d = i.customer_chats,
    //         t = i.widgetLocale,
    //         n = i.fbSDKVersion;
    //     if (null == a || null == a) return;
    //     if (null == s || null == s) return;
    //     if (null == e || null == e || !Array.isArray(e) || 0 == e.length) return;
    //     var i, c = "facebook-jssdk";
    //     if (document.getElementById(c)) try {
    //         document.getElementById(c).remove()
    //     } catch (e) {}(i = document.createElement("script")).id = c, i.async = !0, i.src = "https://connect.facebook.net/" + t + "/sdk/xfbml.customerchat.js#xfbml=1&appId=" + a + "&version=" + n, i.onload = function() {
    //         e.map(function(e) {
    //             var t = e.type;
    //             if ("customer_chat" === t) {
    //                 var n = null; - 1 < (i = d.map(function(e) {
    //                     return e.growthtool_id
    //                 }).indexOf(e.id)) && (n = d[i]), r(0, s, e, n)
    //             } else if ("checkbox" === t) {
    //                 var i;
    //                 n = null; - 1 < (i = u.map(function(e) {
    //                     return e.growthtool_id
    //                 }).indexOf(e.id)) && (n = u[i]), o(a, s, e, n)
    //             }
    //         })
    //     }, l.intervalCheckBody = setInterval(function() {
    //         var e = document.getElementsByTagName("body");
    //         null != e && null != e && 0 < e.length && (clearInterval(l.intervalCheckBody), l.intervalCheckBody = void 0, document.getElementsByTagName("head")[0].appendChild(i))
    //     }, 500)
    // }

    //

    function initWidget(){

    }

    function styleInject(e, t) {
        void 0 === t && (t = {});
        var n = t.insertAt;
        if (e && "undefined" != typeof document) {
            var o = document.head || document.getElementsByTagName("head")[0],
                r = document.createElement("style");
            r.type = "text/css", "top" === n && o.firstChild ? o.insertBefore(r, o.firstChild) : o.appendChild(r), r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(document.createTextNode(e))
        }
    }
    var css_md = `.modal-content {
        background-color: #fefefe;
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 80%; /* Could be more or less, depending on screen size */
      }.modal-content {
        background-color: #fefefe;
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 80%; /* Could be more or less, depending on screen size */
      }.cnv-md-close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
      }.cnv-md-close:hover,
      .cnv-md-close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
      }`;

    styleInject(css_md);

    var modal = document.getElementById("cnvWidget");
    var span = document.getElementsByClassName("cnv-md-close")[0];

    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    //
    (function() {
        var $,
          ele,
          container,
          canvas,
          num,
          prizes,
          btn,
          deg = 0,
          fnGetPrize,
          fnGotBack,
          optsPrize;
      
        var cssPrefix,
          eventPrefix,
          vendors = {
            "": "",
            Webkit: "webkit",
            Moz: "",
            O: "o",
            ms: "ms"
          },
          testEle = document.createElement("p"),
          cssSupport = {};
      
        Object.keys(vendors).some(function(vendor) {
          if (
            testEle.style[vendor + (vendor ? "T" : "t") + "ransitionProperty"] !==
            undefined
          ) {
            cssPrefix = vendor ? "-" + vendor.toLowerCase() + "-" : "";
            eventPrefix = vendors[vendor];
            return true;
          }
        });
      
        /**
         * @param  {[type]} name [description]
         * @return {[type]}      [description]
         */
        function normalizeEvent(name) {
          return eventPrefix ? eventPrefix + name : name.toLowerCase();
        }
      
        /**
         * @param  {[type]} name [description]
         * @return {[type]}      [description]
         */
        function normalizeCss(name) {
          name = name.toLowerCase();
          return cssPrefix ? cssPrefix + name : name;
        }
      
        cssSupport = {
          cssPrefix: cssPrefix,
          transform: normalizeCss("Transform"),
          transitionEnd: normalizeEvent("TransitionEnd")
        };
      
        var transform = cssSupport.transform;
        var transitionEnd = cssSupport.transitionEnd;
      
        // alert(transform);
        // alert(transitionEnd);
      
        function init(opts) {
          fnGetPrize = opts.getPrize;
          fnGotBack = opts.gotBack;
          opts.config(function(data) {
            prizes = opts.prizes = data;
            num = prizes.length;
            draw(opts);
          });
          events();
        }
      
        /**
         * @param  {String} id
         * @return {Object} HTML element
         */
        $ = function(id) {
          return document.getElementById(id);
        };
      
        function draw(opts) {
          opts = opts || {};
          if (!opts.id || num >>> 0 === 0) return;
      
          var id = opts.id,
            rotateDeg = 360 / num / 2 + 90,
            ctx,
            prizeItems = document.createElement("ul"),
            turnNum = 1 / num,
            html = [];
      
          ele = $(id);
          canvas = ele.querySelector(".hc-luckywheel-canvas");
          container = ele.querySelector(".hc-luckywheel-container");
          btn = ele.querySelector(".hc-luckywheel-btn");
      
          if (!canvas.getContext) {
            showMsg("Browser is not support");
            return;
          }
      
          ctx = canvas.getContext("2d");
      
          for (var i = 0; i < num; i++) {
            ctx.save();
            ctx.beginPath();
            ctx.translate(250, 250); // Center Point
            ctx.moveTo(0, 0);
            ctx.rotate((((360 / num) * i - rotateDeg) * Math.PI) / 180);
            ctx.arc(0, 0, 250, 0, (2 * Math.PI) / num, false); // Radius
            if (i % 2 == 0) {
              ctx.fillStyle = "#ffb820";
            } else {
              ctx.fillStyle = "#ffcb3f";
            }
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#e4370e";
            ctx.stroke();
            ctx.restore();
            var prizeList = opts.prizes;
            html.push('<li class="hc-luckywheel-item"> <span style="');
            html.push(transform + ": rotate(" + i * turnNum + 'turn)">');
            if (opts.mode == "both") {
              html.push("<p id='curve'>" + prizeList[i].text + "</p>");
              html.push('<img src="' + prizeList[i].img + '" />');
            } else if (prizeList[i].img) {
              html.push('<img src="' + prizeList[i].img + '" />');
            } else {
              html.push('<p id="curve">' + prizeList[i].text + "</p>");
            }
            html.push("</span> </li>");
            if (i + 1 === num) {
              prizeItems.className = "hc-luckywheel-list";
              container.appendChild(prizeItems);
              prizeItems.innerHTML = html.join("");
            }
          }
        }
      
        /**
         * @param  {String} msg [description]
         */
        function showMsg(msg) {
          alert(msg);
        }
      
        /**
         * @param  {[type]} deg [description]
         * @return {[type]}     [description]
         */
        function runRotate(deg) {
          // runInit();
          // setTimeout(function() {
          container.style[transform] = "rotate(" + deg + "deg)";
          // }, 10);
        }
      
        /**
         * @return {[type]} [description]
         */
        function events() {
          bind(btn, "click", function() {
      
            addClass(btn, "disabled");
      
            fnGetPrize(function(data) {
              if (data[0] == null && !data[1] == null) {
                return;
              }
              optsPrize = {
                prizeId: data[0],
                chances: data[1]
              };
              deg = deg || 0;
              deg = deg + (360 - (deg % 360)) + (360 * 10 - data[0] * (360 / num));
              runRotate(deg);
            });
            bind(container, transitionEnd, eGot);
          });
        }
      
        function eGot() {
          if (optsPrize.chances == null) {
            return fnGotBack(null);
          } else {
            removeClass(btn, "disabled");
            return fnGotBack(prizes[optsPrize.prizeId].text);
          }
        }
      
        /**
         * Bind events to elements
         * @param {Object}    ele    HTML Object
         * @param {Event}     event  Event to detach
         * @param {Function}  fn     Callback function
         */
        function bind(ele, event, fn) {
          if (typeof addEventListener === "function") {
            ele.addEventListener(event, fn, false);
          } else if (ele.attachEvent) {
            ele.attachEvent("on" + event, fn);
          }
        }
      
        /**
         * hasClass
         * @param {Object} ele   HTML Object
         * @param {String} cls   className
         * @return {Boolean}
         */
        function hasClass(ele, cls) {
          if (!ele || !cls) return false;
          if (ele.classList) {
            return ele.classList.contains(cls);
          } else {
            return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
          }
        }
      
        // addClass
        function addClass(ele, cls) {
          if (ele.classList) {
            ele.classList.add(cls);
          } else {
            if (!hasClass(ele, cls)) ele.className += "" + cls;
          }
        }
      
        // removeClass
        function removeClass(ele, cls) {
          if (ele.classList) {
            ele.classList.remove(cls);
          } else {
            ele.className = ele.className.replace(
              new RegExp(
                "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
                "gi"
              ),
              " "
            );
          }
        }
      
        var hcLuckywheel = {
          init: function(opts) {
            return init(opts);
          }
        };
      
        window.hcLuckywheel === undefined && (window.hcLuckywheel = hcLuckywheel);
      
        if (typeof define == "function" && define.amd) {
          define("HellCat-Luckywheel", [], function() {
            return hcLuckywheel;
          });
        }
      })();
      

});