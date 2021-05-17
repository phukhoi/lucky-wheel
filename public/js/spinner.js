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
    optsPrize,
    allowToPlay = false,
    targetPrize = null;

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
    // bind(btn, "click", function() {

    //   addClass(btn, "disabled");

    //   fnGetPrize(function(data) {
    //     data = [3,1]; // control giải thưởng
    //     if (data[0] == null && !data[1] == null) {
    //       return;
    //     }
    //     console.log(data);
    //     optsPrize = {
    //       prizeId: data[0],
    //       chances: data[1]
    //     };
    //     deg = deg || 0;
    //     console.log('deg', deg);
    //     console.log('num', num);
    //     console.log('add deg', 360/num);
    //     console.log('data[0]', data[0]);
    //     console.log('(360 - (deg % 360))', (360 - (deg % 360)));
    //   //   deg = deg + (360 - (deg % 360)) + (360 * 1 - data[0] * (360 / num)) ;
    //     var _turn = 2;
    //     var kichban = Math.floor((Math.random() * 2) + 1);
    //     // kichban = 1;
    //     if( kichban == 1 ){
    //       deg = deg + (360 - (deg % 360)) + (360 * _turn - data[0] * (360 / num) - (360/num) + (360/num/2) +20 ) ;
    //       runRotate(deg );
    //       setTimeout(() => {  
    //           container.style.transitionDuration = '0.8s';
    //           runRotate(deg + 360/num - (360/num/2) - 20);
    //           container.style.transitionDuration = '6s';
    //       }, 6000);
    //     }
    //     if( kichban == 2 ){
    //       deg = deg + (360 - (deg % 360)) + (360 * _turn - data[0] * (360 / num) + (360/num/2-10)  ) ;
    //       runRotate(deg );
    //       setTimeout(() => {  
    //           container.style.transitionDuration = '2s';
    //           runRotate(deg - 360/num + (360/num/2 + 10) );
    //           container.style.transitionDuration = '6s';
    //       }, 6000);
    //     }

    //   });
    //   bind(container, transitionEnd, eGot);
    // });
    
    btn.addEventListener('click', event => {
      if (!allowToPlay) {
        addClass(document.querySelector('.popup--info'), 'show');
      } else {
        targetPrize = 3;
        if (!targetPrize) return;
        // Spin to the target prize
        addClass(btn, "disabled");

        data = [targetPrize, 1]; // control giải thưởng
        if (data[0] == null && !data[1] == null) {
          return;
        }
        console.log(data);
        optsPrize = {
          prizeId: data[0],
          chances: data[1]
        };
        deg = deg || 0;
        var _turn = 2;
        var kichban = Math.floor((Math.random() * 2) + 1);
1;
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
        bind(container, transitionEnd, function () {
          // Select prize
          fnRequest('https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8', 'GET', function() {
            addClass(document.querySelector('.popup--success'), 'show');
            targetPrize = null;
            allowToPlay = false;
          })
        });
      }
    });
    
    var btnSubmit = document.querySelector('.form-btn--info');
    var formInfo = document.querySelector('.info-form');
    btnSubmit.addEventListener('click', event => {
      // TODO: Send data with post request ti save user's iunformation
      var data = serialize(formInfo);
      
      fnRequest('https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8', 'GET', function(res) {
        // TODO: Need to check status of API save user's information
        // Check how many time left that user can play game
        if (res.status === 200) {
          // Get prize
          fnRequest('https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8', 'GET', function() {
            // Clode popup
            removeClass(document.querySelector('.popup--info'), 'show');
            // TODO: update target prize need to animate to
            
            // TODO: If that user have times, allow to play 
            allowToPlay = true;
          })
        }
      });
    });
  }
  
  function fnRequest(url, method, cFunction) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        cFunction(this);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
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
  
  // 
  function serialize(form)
  {
    if (!form || form.nodeName !== "FORM") {
      return;
    }
    var i, j,
      obj = {};
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
      if (form.elements[i].name === "") {
        continue;
      }
      switch (form.elements[i].nodeName) {
      case 'INPUT':
        switch (form.elements[i].type) {
        case 'text':
        case 'hidden':
        case 'password':
        case 'button':
        case 'reset':
        case 'submit':
          obj[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
          break;
        case 'checkbox':
        case 'radio':
          if (form.elements[i].checked) {
            obj[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
          }
          break;
        case 'file':
          break;
        }
        break;
      case 'TEXTAREA':
        obj[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
        break;
      case 'SELECT':
        switch (form.elements[i].type) {
        case 'select-one':
          obj[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
          break;
        case 'select-multiple':
          for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
            if (form.elements[i].options[j].selected) {
              obj[form.elements[i].name] = encodeURIComponent(form.elements[i].options[j].value);
            }
          }
          break;
        }
        break;
      case 'BUTTON':
        switch (form.elements[i].type) {
        case 'reset':
        case 'submit':
        case 'button':
          obj[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
          break;
        }
        break;
      }
    }
    return obj;
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
    }
    .popup {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 999;
      display: none;
    }
    
    .popup.show {
      display: block;
    }
    
    .popup .popup-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    
    .popup .popup-content {
      background-color: #ffffff;
      max-width: 470px;
      padding: 40px;
    }
    
    .popup .form-group {
      margin-bottom: 15px;
    }
    
    .popup .form-label {
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 5px;
    }
    
    .popup .form-control {
      width: 100%;
      padding: 6px 12px;
      font-size: 14px;
      line-height: 1.5;
      color: #495057;
      background-color: #ffffff;
      background-clip: padding-box;
      border: 1px solid #ced4da;
      border-radius: 4px;
      box-sizing: border-box;
    }
    
    .popup .title {
      font-weight: bold;
      font-size: 18px;
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 24px;
    }
    
    .popup .btn {
      border: none;
      background-color: #F2994A;
      width: 100%;
      height: 40px;
      color: #ffffff;
      cursor: pointer;
      margin-bottom: 15px;
    }
    
    .popup .btn--green {
      background-color: #27AE60;
    }
    
    .popup .desc {
      text-align: center;
    }
    
    .popup--success {
      text-align: center;
    }
    
    .popup--success .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: calc(50% - 5px);
    }
    
    .popup--success .popup-footer {
      padding-top: 15px;
    }
    
    .popup .sub-title {
      color: #9F9F9F;
      font-weight: normal;
      font-size: 14px;
    }
    
    .popup .gift {
      font-weight: bold;
      font-size: 18px;
      text-transform: uppercase;
      margin-bottom: 24px;
      color: #EB5757;
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
