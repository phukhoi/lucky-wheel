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
      //validate form info
      var data = serialize(formInfo);
      var email = data.email;

      fnRequest('https://game-platform-staging.cnvloyalty.com/api/client/authorization?email='+email, 'POST', function(res) {
        console.log('authorization response:', res)
        // TODO: Need to check status of API save user's information
        // Check how many time left that user can play game
        if (res.status === 200) {
          var token = res.jwt
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
    xhttp.open(method, url, true);
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
    console.log(ele)
    if (!ele || !cls) return false;
    if (ele.classList) {
      return ele.classList.contains(cls);
    } else {
      return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
    }
  }

  // addClass
  function addClass(ele, cls) {
    console.log(ele)
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
  var css_md = `@charset "utf-8";

  html {
    color: #333;
    background: #fff;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-rendering: optimizelegibility;
  }

  html.borderbox *,
  html.borderbox *:before,
  html.borderbox *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  body,
  dl,
  dt,
  dd,
  ul,
  ol,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  pre,
  code,
  form,
  fieldset,
  legend,
  input,
  textarea,
  p,
  blockquote,
  th,
  td,
  hr,
  button,
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  menu,
  nav,
  section {
    margin: 0;
    padding: 0;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  menu,
  nav,
  section {
    display: block;
  }

  audio,
  canvas,
  video {
    display: inline-block;
  }

  body,
  button,
  input,
  select,
  textarea {
    font: 300 1em/1.8 PingFang SC, Lantinghei SC, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans;
  }

  button::-moz-focus-inner,
  input::-moz-focus-inner {
    padding: 0;
    border: 0;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  fieldset,
  img {
    border: 0;
  }

  blockquote {
    position: relative;
    color: #999;
    font-weight: 400;
    border-left: 1px solid #1abc9c;
    padding-left: 1em;
    margin: 1em 3em 1em 2em;
  }

  @media only screen and (max-width: 640px) {
    blockquote {
      margin: 1em 0;
    }
  }

  acronym,
  abbr {
    border-bottom: 1px dotted;
    font-variant: normal;
  }

  abbr {
    cursor: help;
  }

  del {
    text-decoration: line-through;
  }

  address,
  caption,
  cite,
  code,
  dfn,
  em,
  th,
  var {
    font-style: normal;
    font-weight: 400;
  }

  ul,
  ol {
    list-style: none;
  }

  caption,
  th {
    text-align: left;
  }

  q:before,
  q:after {
    content: '';
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
  }

  :root sub,
  :root sup {
    vertical-align: baseline;
    /* for ie9 and other modern browsers */
  }

  sup {
    top: -0.5em;
  }

  sub {
    bottom: -0.25em;
  }

  a {
    color: #1abc9c;
  }

  a:hover {
    text-decoration: underline;
  }

  .typo a {
    border-bottom: 1px solid #1abc9c;
  }

  .typo a:hover {
    border-bottom-color: #555;
    color: #555;
    text-decoration: none;
  }

  ins,
  a {
    text-decoration: none;
  }

  u,
  .typo-u {
    text-decoration: underline;
  }

  mark {
    background: #fffdd1;
    border-bottom: 1px solid #ffedce;
    padding: 2px;
    margin: 0 5px;
  }

  pre,
  code,
  pre tt {
    font-family: Courier, 'Courier New', monospace;
  }

  pre {
    background: #f8f8f8;
    border: 1px solid #ddd;
    padding: 1em 1.5em;
    display: block;
    -webkit-overflow-scrolling: touch;
  }

  hr {
    border: none;
    border-bottom: 1px solid #cfcfcf;
    margin-bottom: 0.8em;
    height: 10px;
  }

  small,
  .typo-small,
  figcaption {
    font-size: 0.9em;
    color: #888;
  }

  strong,
  b {
    font-weight: bold;
    color: #000;
  }

  [draggable] {
    cursor: move;
  }

  .clearfix:before,
  .clearfix:after {
    content: "";
    display: table;
  }

  .clearfix:after {
    clear: both;
  }

  .clearfix {
    zoom: 1;
  }

  .textwrap,
  .textwrap td,
  .textwrap th {
    word-wrap: break-word;
    word-break: break-all;
  }

  .textwrap-table {
    table-layout: fixed;
  }

  .serif {
    font-family: Palatino, Optima, Georgia, serif;
  }

  .typo p,
  .typo pre,
  .typo ul,
  .typo ol,
  .typo dl,
  .typo form,
  .typo hr,
  .typo table,
  .typo-p,
  .typo-pre,
  .typo-ul,
  .typo-ol,
  .typo-dl,
  .typo-form,
  .typo-hr,
  .typo-table,
  blockquote {
    margin-bottom: 1.2em
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: PingFang SC, Verdana, Helvetica Neue, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;
    font-weight: 100;
    color: #000;
    line-height: 1.35;
  }

  .typo h1,
  .typo h2,
  .typo h3,
  .typo h4,
  .typo h5,
  .typo h6,
  .typo-h1,
  .typo-h2,
  .typo-h3,
  .typo-h4,
  .typo-h5,
  .typo-h6 {
    margin-top: 1.2em;
    margin-bottom: 0.6em;
    line-height: 1.35;
  }

  .typo h1,
  .typo-h1 {
    font-size: 2em;
  }

  .typo h2,
  .typo-h2 {
    font-size: 1.8em;
  }

  .typo h3,
  .typo-h3 {
    font-size: 1.6em;
  }

  .typo h4,
  .typo-h4 {
    font-size: 1.4em;
  }

  .typo h5,
  .typo h6,
  .typo-h5,
  .typo-h6 {
    font-size: 1.2em;
  }

  /* 在文章中，应该还原 ul 和 ol 的样式 */
  .typo ul,
  .typo-ul {
    margin-left: 1.3em;
    list-style: disc;
  }

  .typo ol,
  .typo-ol {
    list-style: decimal;
    margin-left: 1.9em;
  }

  .typo li ul,
  .typo li ol,
  .typo-ul ul,
  .typo-ul ol,
  .typo-ol ul,
  .typo-ol ol {
    margin-bottom: 0.8em;
    margin-left: 2em;
  }

  .typo li ul,
  .typo-ul ul,
  .typo-ol ul {
    list-style: circle;
  }

  .typo table th,
  .typo table td,
  .typo-table th,
  .typo-table td,
  .typo table caption {
    border: 1px solid #ddd;
    padding: 0.5em 1em;
    color: #666;
  }

  .typo table th,
  .typo-table th {
    background: #fbfbfb;
  }

  .typo table thead th,
  .typo-table thead th {
    background: #f1f1f1;
  }

  .typo table caption {
    border-bottom: none;
  }

  .typo-input,
  .typo-textarea {
    -webkit-appearance: none;
    border-radius: 0;
  }

  .typo-em,
  .typo em,
  legend,
  caption {
    color: #000;
    font-weight: inherit;
  }

  .typo-em {
    position: relative;
  }

  .typo-em:after {
    position: absolute;
    top: 0.65em;
    left: 0;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    content: "・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・";
  }

  /* Responsive images */
  .typo img {
    max-width: 100%;
  }
  
  .hc-luckywheel ul,
  .hc-luckywheel li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .hc-luckywheel {
    position: relative;
    width: 500px;
    /*Change this when change size*/
    height: 500px;
    /*Change this when change size*/
    border-radius: 50%;
    border: 16px solid #e44025;
    box-shadow: 0 2px 3px #333, 0 0 2px #000;
  }

  .hc-luckywheel-container {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    background-clip: padding-box;
    background-color: #ffcb3f;
    -webkit-transition: transform 6s ease;
    transition: transform 6s ease;
    /*transition: transform 6s cubic-bezier(0.38, 0.85, 0.43, 0.9);*/
    /*-webkit-transition: transform 6s cubic-bezier(0.38, 0.85, 0.43, 0.9);*/
  }

  .hc-luckywheel-container canvas {
    width: inherit;
    height: inherit;
    border-radius: 50%;
  }

  .hc-luckywheel-list {
    position: absolute;
    left: 0;
    top: 0;
    width: inherit;
    height: inherit;
    z-index: 2;
  }

  .hc-luckywheel-item {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    color: #e4370e;
    font-weight: bold;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.6);
  }

  .hc-luckywheel-item span {
    position: relative;
    display: block;
    padding-top: 20px;
    /* width: 50px; */
    margin: 0 auto;
    text-align: center;
    -webkit-transform-origin: 50% 250px;
    /*Change this when change size*/
    -ms-transform-origin: 50% 250px;
    /*Change this when change size*/
    transform-origin: 50% 250px;
  }

  /*Change this when change size*/

  .hc-luckywheel-item img {
    position: relative;
    top: -20px;
    left: 0px;
    width: 100px;
    /*Change this when change size*/
    height: 100px;
  }

  /*Change this when change size*/

  .hc-luckywheel-btn {
    position: absolute;
    left: 210px;
    /*Change this when change size*/
    top: 210px;
    /*Change this when change size*/
    z-index: 3;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    color: #f4e9cc;
    background-color: #e44025;
    line-height: 80px;
    text-align: center;
    font-size: 20px;
    text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.6);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.6);
    text-decoration: none;
  }

  .hc-luckywheel-btn::after {
    position: absolute;
    display: block;
    content: "";
    left: 10px;
    top: -46px;
    width: 0;
    height: 0;
    overflow: hidden;
    border-width: 30px;
    border-style: solid;
    border-color: transparent;
    border-bottom-color: #e44025;
  }

  .hc-luckywheel-btn.disabled {
    pointer-events: none;
    background: #b07a7b;
    color: #ccc;
  }

  .hc-luckywheel-btn.disabled::after {
    border-bottom-color: #b07a7b;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100%;
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
    }
    .modal-content{
      border: none !important;
    }
  .hc-luckywheel {
    margin-left: auto;
    margin-right: auto;
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
