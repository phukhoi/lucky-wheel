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
          data = [3,1]; // control giải thưởng
          if (data[0] == null && !data[1] == null) {
            return;
          }
          console.log(data);
          optsPrize = {
            prizeId: data[0],
            chances: data[1]
          };
          deg = deg || 0;
          console.log('deg', deg);
          console.log('num', num);
          console.log('add deg', 360/num);
          console.log('data[0]', data[0]);
          console.log('(360 - (deg % 360))', (360 - (deg % 360)));
        //   deg = deg + (360 - (deg % 360)) + (360 * 1 - data[0] * (360 / num)) ;
          var _turn = 2;
          var kichban = Math.floor((Math.random() * 2) + 1);
          // kichban = 1;
          if( kichban == 1 ){
            deg = deg + (360 - (deg % 360)) + (360 * _turn - data[0] * (360 / num) - (360/num) + (360/num/2) +20 ) ;
            runRotate(deg );
            setTimeout(() => {  
                container.style.transitionDuration = '0.8s';
                runRotate(deg + 360/num - (360/num/2) - 20);
                container.style.transitionDuration = '6s';
            }, 6000);
          }
          if( kichban == 2 ){
            deg = deg + (360 - (deg % 360)) + (360 * _turn - data[0] * (360 / num) + (360/num/2-10)  ) ;
            runRotate(deg );
            setTimeout(() => {  
                container.style.transitionDuration = '2s';
                runRotate(deg - 360/num + (360/num/2 + 10) );
                container.style.transitionDuration = '6s';
            }, 6000);
          }

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
      define("HC-Luckywheel", [], function() {
        return hcLuckywheel;
      });
    }

    //
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

  })();
  