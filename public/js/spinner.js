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
    targetPrize = null,
    targetPrizeId = null,
    endPoint = window.cnvwidget?.isDebugMode ? window.cnvwidget?.stagingUrl : window.cnvwidget?.productionUrl;

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
        ctx.fillStyle = prize_colors[0] ? prize_colors[0] : "#ffb820";
      } else {
        ctx.fillStyle = prize_colors[1] ? prize_colors[1] : "#ffcb3f";
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
  function autoFillFormInfo() {
    // Memo: ?name=K&email=test@gmail.com&phone=123456
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    
    if (!isEmpty(params)) {
      document.querySelector('#input-name').value = params.name || '';
      document.querySelector('#input-email').value = params.email || '';
      document.querySelector('#input-phone').value = params.phone || '';
      
      if (`${params.submit}` === '1' &&  params.phone) {
        document.querySelector('.form-btn--info').click();
      } else {
        addClass(document.querySelector('.popup--info'), 'show');
      }
    }
  }
  
  function events() {
    var animateCall = 0;
    btn.addEventListener('click', event => {
        console.log('allow to play:', allowToPlay);
      if (!allowToPlay) {
        const gameUserToken = localStorage.getItem('gameUserToken');
        const claim_data = {
          game_code: window.cnvwidget?.gameId || ''
        }
        
        if (gameUserToken) {
          makeRequest('GET', `${endPoint}/api/client/game-info`+'?'+'game_code='+claim_data.game_code)
            .then(res => {
              if (res) {
                const resData = JSON.parse(res);
                const { data } = resData;
                if (data.turn_count != undefined) {
                    //update turn_count html
                  document.querySelector('.your-information .times').innerHTML = data.turn_count;
                } 
                // get historiest
                const histories = data?.histories || [];
                  document.getElementById('histories').innerHTML = histories.map(item => 
                  `<div>
                    <div>game_prize_name: ${item.game_prize_name}</div>
                  </div>`
                ).join('');
                
                if (data.turn_count) {
                  // Get prize                
                  makeRequest('POST', `${endPoint}/api/client/rewards/claim`, claim_data)
                    .then(res => {
                      if (res) {
                        const resData = JSON.parse(res);
                        const { data } = resData;

                        // todo: get position of game: targetPrize [position of game in the list]
                        targetPrize = 1; // need to change to this
                      //   targetPrize = data?.position_id; // need to change to this
                        // memo: game_prize_id, game_prize_name
                        targetPrizeId = data?.id;
                        allowToPlay = true;
                        
                        // Memo: Trigger click to auto spin
                        document.querySelector('.popup .gift').innerHTML = data?.game_prize_name;
                        document.querySelector(".hc-luckywheel-btn").click();
                      }
                    })
                    .catch(res => {
                      allowToPlay = false;
                      alert(res.message);
                    });
                } else {
                  alert('Bạn đã hết lượt quay');
                  allowToPlay = false;
                  targetPrize = null;
                  targetPrizeId = null;
                  addClass(btn, "disabled");
                }
              }
            })
          .catch(res => {
            if (res.status === 401) {
              localStorage.removeItem('gameUserPhone');
              localStorage.removeItem('gameUserToken');
              addClass(document.querySelector('.popup--info'), 'show');
            }
          })
        } else {
          addClass(document.querySelector('.popup--info'), 'show');
        }
      } else {
          console.log('target price:', targetPrize);
      //   targetPrize = 0;
        if (!targetPrize) return;
        // Spin to the target prize
        addClass(btn, "disabled");
          console.log('target price:', targetPrize);
        data = [targetPrize, 1]; // control giải thưởng
        if (data[0] == null && !data[1] == null) {
          return;
        }

        optsPrize = {
          prizeId: data[0],
          chances: data[1]
        };
        deg = deg || 0;
        var _turn = 2;
        var kichban = Math.floor((Math.random() * 2) + 1);
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
          // memo: check and apply this prize for user
          animateCall += 1;
          
          if (targetPrizeId && animateCall === 2) {
            makeRequest('POST', `${endPoint}/api/client/rewards/award`, { reward_id: targetPrizeId })
            .then(res => {

              //get game info 
              makeRequest('GET', `${endPoint}/api/client/game-info`+'?'+'game_code='+claim_data.game_code)
              .then(res => {
                if (res) {
                  const resData = JSON.parse(res);
                  const { data } = resData;
                  console.log(data.turn_count);
                  // get historiest
                  const histories = data?.histories || [];
                    document.getElementById('histories').innerHTML = histories.map(item => 
                    `<div class="prize">
                      <div class="prize-name">${item.game_prize_name}</div>
                    </div>`
                  ).join('');
                  
                  document.querySelector('.your-information .times').innerHTML = data.turn_count;
                  if (data.turn_count == 0) {
                    // alert('Bạn đã hết lượt quay');
                    allowToPlay = false;
                    targetPrize = null;
                    targetPrizeId = null;
                    addClass(btn, "disabled");
                  }
                }
              });
                    //end get game info
                    
              targetPrize = null;
              targetPrizeId = null;
              allowToPlay = false;
              animateCall  = 0;

              addClass(document.querySelector('.popup--success'), 'show');
            })
            .catch(res => {
              alert(res.message);
              targetPrize = null;
              targetPrizeId = null;
              allowToPlay = false;
              animateCall = 0;

              removeClass(btn, 'disabled');
            });
          }
        });
      }
    });
    
    var btnSubmit = document.querySelector('.form-btn--info');
    var formInfo = document.querySelector('.info-form');
    function insertAfter(referenceNode, newNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    
    document.getElementById('input-name').addEventListener('focus', (event) => {
      console.log(event.target.parentNode);
      event.target.parentNode.querySelector('.form-error').innerHTML = '';
    }, true);
    
    document.getElementById('input-email').addEventListener('focus', (event) => {
      console.log(event.target.parentNode);
      event.target.parentNode.querySelector('.form-error').innerHTML = '';
    }, true);
    
    document.getElementById('input-phone').addEventListener('focus', (event) => {
      console.log(event.target.parentNode);
      event.target.parentNode.querySelector('.form-error').innerHTML = '';
    }, true);
    
    document.querySelector('.popup--success .popup-close').addEventListener('click', event => {
      removeClass(document.querySelector('.popup--success.show'), 'show');
      removeClass(btn, 'disabled');
    });
    
    btnSubmit.addEventListener('click', event => {
      var data = serialize(formInfo);
      let countError = 0;
      
      // Validate
      for (const [key, value] of Object.entries(data)) {
        if (!value) {
          const inp = document.getElementById(`input-${key}`);
          inp.parentNode.querySelector('.form-error').innerHTML = 'Vui lòng nhập thông tin';
          countError += 1;
        }
      }
      
      if (countError === 0) {
        fnRequest(`${endPoint}/api/client/authorization?phone=`+data.phone, 'POST', function(res) {
          // TODO: Need to check status of API save user's information
          // Check how many time left that user can play game
          if (res.status === 200) {

            const jsonResponse = JSON.parse(res.responseText);
            const token = jsonResponse.jwt;
            const timeToPlay = jsonResponse.time || 1;

            localStorage.setItem('gameUserToken', token);
            localStorage.setItem('gameUserPhone', data.phone);
            localStorage.setItem('timeToPlay', timeToPlay);
            
            const claim_data = {
              game_code: window.cnvwidget?.gameId || ''
            }

            //get user history
            makeRequest('GET', `${endPoint}/api/client/game-info`+'?'+'game_code='+claim_data.game_code).then(res => {
              if (res) {
                const resData = JSON.parse(res);
                const { data } = resData;
                console.log('data line 414:', data);
                // get historiest
                const histories = data?.histories || [];
                document.getElementById('histories').innerHTML = histories.map(item => 
                `<div>
                  <div>game_prize_name: ${item.game_prize_name}</div>
                </div>`
              ).join('');
                
              //update turn_count html
              document.querySelector('.your-information .times').innerHTML = data.turn_count;
                if (data.turn_count) {
                  makeRequest('POST', `${endPoint}/api/client/rewards/claim`, claim_data)
                    .then(res => {
                      if (res) {
                        const resData = JSON.parse(res);
                        const { data } = resData;

                        // todo: get position of game: targetPrize [position of game in the list]
                        // memo: game_prize_id, game_prize_name
                        targetPrizeId = data?.id;
                        
                        targetPrize = 1; // need to change to this
                      //   targetPrize = data?.position_id; // need to change to this
                        allowToPlay = true;

                        
                        removeClass(document.querySelector('.popup--info'), 'show');
                      }
                    })
                    .catch(res => {
                      alert(res.message);
                    });
                } else {
                  removeClass(document.querySelector('.popup--info'), 'show');
                  alert('Bạn đã hết lượt quay');
                  allowToPlay = true;
                  targetPrize = null;
                  targetPrizeId = null;
                  addClass(btn, "disabled");
                }
              }
            })

          }
        });
      }
    });
    
    autoFillFormInfo();
    
    // Play now button
    document.querySelector('.hc-luckywheel-trigger-btn').addEventListener('click', event => {
      document.querySelector(".hc-luckywheel-btn").click();
    });
    
    // Close popups
    document.querySelector('.popup--info .popup-close').addEventListener('click', event => {
      removeClass(document.querySelector('.popup--info'), 'show');
    });
    
    document.querySelector('.popup--success .popup-close').addEventListener('click', event => {
      removeClass(document.querySelector('.popup--success'), 'show');
    });
    
    document.querySelector('.popup--histories .popup-close').addEventListener('click', event => {
      removeClass(document.querySelector('.popup--histories'), 'show');
    });
    
    // Get uder information if has token
    const gameUserToken = localStorage.getItem('gameUserToken');
    const claim_data = {
      game_code: window.cnvwidget?.gameId || ''
    }
    if (gameUserToken) {
      makeRequest('GET', `${endPoint}/api/client/game-info`+'?'+'game_code='+claim_data.game_code)
        .then(res => {
          if (res) {
            const resData = JSON.parse(res);
            const { data } = resData;
            
            // get historiest
            const histories = data?.histories || [];
              document.getElementById('histories').innerHTML = histories.map(item => 
              `<div class="prize">
                <div class="prize-name">${item.game_prize_name}</div>
              </div>`
            ).join('');
            
            document.querySelector('.your-information .times').innerHTML = data.turn_count;
            if (data.turn_count == 0) {
              // alert('Bạn đã hết lượt quay');
              allowToPlay = false;
              targetPrize = null;
              targetPrizeId = null;
              addClass(btn, "disabled");
            }
          }
        });
    }
    
    // Histories
    document.querySelector('.btn-show-histories').addEventListener('click', event => {
      addClass(document.querySelector('.popup--histories'), 'show');
    });
  }
  
  function makeRequest (method, url, data) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.getItem('gameUserToken'));
      if(method == "POST" && data) {
        xhr.send(JSON.stringify(data));
      }else{
        xhr.send();
      }
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
    // xhttp.responseType = 'json';
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

  function isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
  
    return JSON.stringify(obj) === JSON.stringify({});
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
    line-height: 1.2;
  }

  .hc-luckywheel {
    position: relative;
    max-width: 500px;
    width: 100%;
    border-radius: 50%;
    border: 16px solid #e44025;
    box-shadow: 0 2px 3px #333, 0 0 2px #000;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    line-height: 0;
  }
  
  .hc-luckywheel-image {
    width: 100%;
    opacity: 0;
  }

  .hc-luckywheel-container {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
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
    top: 12.39%;
    width: inherit;
    height: inherit;
    z-index: 2;
  }

  .hc-luckywheel-item {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 20%;
    color: #e4370e;
    font-weight: bold;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.6);
  }

  .hc-luckywheel-item span {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
    margin: 0 auto;
    text-align: center;
    -webkit-transform-origin: 50% 173%;
    /*Change this when change size*/
    -ms-transform-origin: 50% 173%;
    /*Change this when change size*/
    transform-origin: 50% 173%;
  }
  
  .hc-luckywheel-item p {
    position: absolute;
    width: 100%;
    top: -45px;
    text-align: center;
  }
  
  @media only screen and (max-width: 640px) {
    .hc-luckywheel-item p {
      font-size: 12px;
      line-height: 14px;
      top: -20px;
    }
  }

  /*Change this when change size*/

  .hc-luckywheel-item img {
    position: relative;
    top: 4%;
    left: 0px;
    width: 20%;
    height: 100%;
  }

  /*Change this when change size*/

  .hc-luckywheel-btn {
    position: absolute;
    left: 42%;
    /*Change this when change size*/
    top: 42%;
    /*Change this when change size*/
    z-index: 3;
    width: 16%;
    height: 16%;
    border-radius: 50%;
    color: #f4e9cc;
    background-color: #e44025;
    line-height: 1;
    text-align: center;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.6);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.6);
    text-decoration: none;
  }

  .hc-luckywheel-btn::after {
    position: absolute;
    display: block;
    content: "";
    left: 10%;
    top: -57.5%;
    width: 0;
    height: 0;
    overflow: hidden;
    border-width: 30px;
    border-style: solid;
    border-color: transparent;
    border-bottom-color: #e44025;
  }
  
  @media only screen and (max-width: 640px) {
    .hc-luckywheel-btn {
      font-size: 14px;
      line-height: 17px;
      width: 50px;
      height: 50px;
      top: 50%;
      left: 50%;
      margin-left: -30px;
      margin-top: -30px;
    }
    
    .hc-luckywheel-btn::after {
      border-width: 20px;
      left: 5px;
      top: -30px;
    }
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
  .hc-luckywheel {
    margin-left: auto;
    margin-right: auto;
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
    position: relative;
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
  }
  .popup .form-error {
    color: #dc3545;
    font-size: 12px;
    line-height: 15px;
    margin-top: 5px;
  }
  .popup .form-error:empty {
    margin-top: 0;
  }
  .popup .popup-close {
    font-size: 30px;
    border: none;
    background: none;
    width: 35px;
    height: 35px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }
  .your-information {
    // display: none;
  }
  .your-information.show {
    display: block;
  }
  .your-information .turn-count {
    font-weight: 900;
    font-size: 24px;
    color: #fff;
    margin-bottom: 15px;
    text-shadow: -1px -1px 0px #3c4915, 1px -1px 0px #3c4915, -1px 1px 0px #3c4915, 1px 1px 0px #3c4915;
    text-align: center;
  }
  .your-information .times {
    color: #FAC53B;
    font-size: 40px;
    text-shadow: -1px -1px 0px #3c4915, 1px -1px 0px #3c4915, -1px 1px 0px #3c4915, 1px 1px 0px #3c4915;
  }
  .modal-content {
    height: 100%;
    padding: 0px 15px 0px 15px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-image: url("https://niemvuilaptrinh.ams3.cdn.digitaloceanspaces.com/background-css-javascript/Background%20Jquery%20CSS.png");
  }
  .text-center {
    text-align: center;
  }
  .your-information .btn-link {
    border: none;
    background: none;
    color: #ffffff;
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 30px;
    cursor: pointer;
    text-decoration: underline;
  }
  .hc-luckywheel-trigger-btn {
    display: inline-block;
    border: none !important;
    outline: none;
    padding: 16px 80px;
    border-radius: 5px;
    font-weight: bold;
    font-size: 20px;
    color: rgb(255, 255, 255);
    background: rgb(250, 197, 59);
  }
  .hc-luckywheel-trigger-btn:hover {
    border: none !important;
    color: rgb(255, 255, 255) !important;
    background: rgb(250, 197, 59) !important;
  }
  .prize + .prize {
    margin-top: 10px;
  }
  .prize .prize-name {
    font-size: 14px;
    line-height: 17px;
  }
  #cnvWheel{
      height: 100vh;
  }
  #cnvWidget{
      height: 100%;
  }
  `;

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