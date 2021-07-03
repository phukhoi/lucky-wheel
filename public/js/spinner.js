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
      targetPrizeName = null,
      endPoint = window.cnvwidget?.isDebugMode ? window.cnvwidget?.stagingUrl : window.cnvwidget?.productionUrl,
      animateCall = 0,
      appBarBgColor = "#332003",
      appBarTextColor ="#fff",
      timeOutAnimate = null;
  
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
      
      const searchUrlParams = new URLSearchParams(window.location.search);
      const urlParams = Object.fromEntries(searchUrlParams.entries());
      if( urlParams.appbar_bg_color ){
        appBarBgColor = "#"+urlParams.appbar_bg_color
      }
      if( urlParams.appbar_text_color ){
        appBarTextColor = "#"+urlParams.appbar_text_color
      }
      
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
      canvas = ele.getElementsByClassName("hc-luckywheel-canvas")[0];
      console.log('canvas', canvas)
      // canvas2 = ele.querySelector(".hc-luckywheel-canvas");
      container = ele.getElementsByClassName("hc-luckywheel-container")[0];
      btn = ele.getElementsByClassName("hc-luckywheel-btn")[0];
  
      if (!canvas.getContext) {
        showMsg("Browser is not support");
        return;
      }
  
      ctx = canvas.getContext("2d");
      
      var diameter = 270,
        numberOfSlices = num,
        radius = (diameter / 2),
        circumfrance = (Math.PI * 2 * radius),
        sliceHeight = (circumfrance / numberOfSlices),
        sliceOffeset = (sliceHeight / 2),
        sliceColor = '#095B8',
        rotation = 360 / numberOfSlices;
  
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
        
        var r = rotation * i;
        var prize = '';
        if (opts.mode == "both") {
          prize = `<div><img class="prize-image" src="${prizeList[i].img}" /></div><div class="prize-name">${prizeList[i].text}</div>`;
        } else if (prizeList[i].img) {
          prize = `<div><img class="prize-image" src="${prizeList[i].img}" />`;
        } else {
          prize = `</div>div class="prize-name">${prizeList[i].text}</div>`;
        }
        
        html.push(`
        <li class="hc-luckywheel-item" style="top: calc(50% - ${sliceOffeset}px); height: ${sliceHeight}px; transform: rotate(${r - 90}deg);">
          <div class="hc-luckywheel-item-inner">
            ${prize}
          </div>
        </li>`)
        
        // html.push('<li class="hc-luckywheel-item"> <span style="');
        // html.push(transform + ": rotate(" + turnNum * 1 + 'turn)">');
        // if (opts.mode == "both") {
        //   html.push('<img class="prize-image" src="' + prizeList[i].img + '" />');
        //   html.push("<p id='curve' class='prize-name'>" + prizeList[i].text + "</p>");
        // } else if (prizeList[i].img) {
        //   html.push('<img src="' + prizeList[i].img + '" />');
        // } else {
        //   html.push('<p id="curve">' + prizeList[i].text + "</p>");
        // }
        // html.push("</span> </li>");
  
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
      
      if (params.phone) {
        document.getElementById('input-name').value = params.name || '';
        document.getElementById('input-email').value = params.email || '';
        document.getElementById('input-phone').value = params.phone || '';
        
        if (`${params.submit}` === '1' &&  params.phone) {
          document.getElementsByClassName('form-btn--info')[0].click();
        } else {
          addClass(document.getElementsByClassName('popup--info')[0], 'show');
        }
      }
    }
    
    function events() {
      btn.addEventListener('click', event => {
        // Reset before run animate
        animateCall = 0;
  
        console.log('allow to play:', allowToPlay);
        if (!allowToPlay) {
          const gameUserToken = localStorage.getItem('gameUserToken');
          const claim_data = {
            game_code: window.cnvwidget?.gameId || ''
          }
          
          if (gameUserToken) {
            console.log('has token')
            makeRequest('GET', `${endPoint}/api/client/game-info`+'?'+'game_code='+claim_data.game_code)
              .then(res => {
                if (res) {
                  const resData = JSON.parse(res);
                  const { data } = resData;
                  if (data.turn_count != undefined) {
                      //update turn_count html
                    document.getElementsByClassName('game-times')[0].innerHTML = data.turn_count;
                  } 
                  // get historiest
                  const histories = data?.histories || [];
                    document.getElementById('histories').innerHTML = renderHistories(histories);
                  
                  if (data.turn_count) {
                    // Get prize                
                    makeRequest('POST', `${endPoint}/api/client/rewards/claim`, claim_data)
                      .then(res => {
                        if (res) {
                          const resData = JSON.parse(res);
                          const { data } = resData;
  
                          // memo: get position of game: targetPrize [position of game in the list]
                          targetPrize = data?.game_prize_position;
  
                          // memo: game_prize_id, game_prize_name
                          targetPrizeId = data?.id;
                          targetPrizeName = data?.game_prize_name;
                          allowToPlay = true;
                          
                          // Memo: Trigger click to auto spin
                          document.getElementsByClassName('popup-gift')[0].innerHTML = data?.game_prize_name;
                          document.getElementsByClassName("hc-luckywheel-btn")[0].click();
                        }
                      })
                      .catch(res => {
                        allowToPlay = false;
                        console.log('here')
                        // alert(res.message);
                      });
                  } else {
                    addClass(document.getElementsByClassName('popup--over-turn')[0], 'show');
                    allowToPlay = false;
                    targetPrize = null;
                    targetPrizeName = null;
                    targetPrizeId = null;
                    addClass(btn, "disabled");
                  }
                }
              })
            .catch(res => {
              if (res.status === 401) {
                localStorage.removeItem('gameUserPhone');
                localStorage.removeItem('gameUserToken');
                addClass(document.getElementsByClassName('popup--info')[0], 'show');
              }
            })
          } else {
            addClass(document.getElementsByClassName('popup--info')[0], 'show');
          }
        } else {
            console.log('target price:', targetPrize);
        //   targetPrize = 0;
          if (targetPrize === null) return;
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
          if( kichban == 1 ) {
            // easin back
            deg = deg + (360 - (deg % 360)) + (360 * _turn - data[0] * (360 / num) - (360/num) + (360/num/2) +20 ) ;
            removeClass(container, 'animate-script-2');
            addClass(container, 'animate-script-1');

            runRotate(deg );
            // if (timeOutAnimate) {
            //   clearTimeout(timeOutAnimate);
            // }
            // timeOutAnimate = setTimeout(() => {  
            //     container.style.transitionDuration = '0.8s';
            //     runRotate(deg + 360/num - (360/num/2) - 20);
            //     container.style.transitionDuration = '6s';
            // }, 6000);
          }
          if( kichban == 2 ){
            deg = deg + (360 - (deg % 360)) + (360 * _turn - data[0] * (360 / num) + (360/num/2-10)  ) ;
            addClass(container, 'animate-script-2'); 
            removeClass(container, 'animate-script-1');

            runRotate(deg );
            // if (timeOutAnimate) {
            //   clearTimeout(timeOutAnimate);
            // }
            // timeOutAnimate = setTimeout(() => {  
            //     container.style.transitionDuration = '2s';
            //     runRotate(deg - 360/num + (360/num/2 + 10) );
            //     container.style.transitionDuration = '6s';
            // }, 6000);
          }
        }
      });
      
      bind(container, transitionEnd, function () {
        // memo: check and apply this prize for user
        animateCall += 1;
        
        if (targetPrizeId && animateCall === 1) {
          makeRequest('POST', `${endPoint}/api/client/rewards/award`, { reward_id: targetPrizeId })
          .then(res => {

            //get game info 
            makeRequest('GET', `${endPoint}/api/client/game-info`+'?'+'game_code='+claim_data.game_code)
            .then(res => {
              if (res) {
                const resData = JSON.parse(res);
                const { data } = resData;
                // get historiest
                const histories = data?.histories || [];
                document.getElementById('histories').innerHTML = renderHistories(histories);
                
                document.getElementsByClassName('game-times')[0].innerHTML = data.turn_count;

                // if (data.turn_count == 0) {
                //   addClass(document.querySelector('.popup--over-turn'), 'show');
                  
                //   allowToPlay = false;
                //   targetPrize = null;
                //   targetPrizeId = null;
                //   addClass(btn, "disabled");
                // }

                //end get game info
                document.getElementsByClassName('popup-gift')[0].innerHTML = targetPrizeName;
                addClass(document.getElementsByClassName('popup--success')[0], 'show');
                      
                targetPrize = null;
                targetPrizeId = null;
                targetPrizeName = null;
                allowToPlay = false;
                animateCall = 0;
              }
            });
          })
          .catch(res => {
            alert(res.message);
            targetPrize = null;
            targetPrizeName = null;
            targetPrizeId = null;
            allowToPlay = false;
            animateCall = 0;

            removeClass(btn, 'disabled');
          });
        }
      });

      var btnSubmit = document.getElementsByClassName('form-btn--info')[0];
      var formInfo = document.getElementsByClassName('info-form')[0];
      function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
      }
      
      document.getElementById('input-name').addEventListener('focus', (event) => {
        console.log(event.target.parentNode);
        event.target.parentNode.getElementsByClassName('form-error')[0].innerHTML = '';
      }, true);
      
      document.getElementById('input-email').addEventListener('focus', (event) => {
        console.log(event.target.parentNode);
        event.target.parentNode.getElementsByClassName('form-error')[0].innerHTML = '';
      }, true);
      
      document.getElementById('input-phone').addEventListener('focus', (event) => {
        console.log(event.target.parentNode);
        event.target.parentNode.getElementsByClassName('form-error')[0].innerHTML = '';
      }, true);
  
      document.getElementsByClassName('popup--success-popup-close')[0].addEventListener('click', event => {
        removeClass(document.getElementsByClassName('popup--success show')[0], 'show');
        removeClass(btn, 'disabled');
      });
      
      document.getElementsByClassName('popup--over-turn-popup-close')[0].addEventListener('click', event => {
        removeClass(document.getElementsByClassName('popup--over-turn show')[0], 'show');
      });
  
      btnSubmit.addEventListener('click', event => {
        var data = serialize(formInfo);
        let countError = 0;
        
        // Validate only phone
        for (const [key, value] of Object.entries(data)) {
          if (!value && key === 'phone') {
            const inp = document.getElementById(`input-${key}`);
            inp.parentNode.getElementsByClassName('form-error')[0].innerHTML = 'Vui lòng nhập thông tin';
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
                  document.getElementById('histories').innerHTML = renderHistories(histories);
                  
                //update turn_count html
                document.getElementsByClassName('game-times')[0].innerHTML = data.turn_count;
                  if (typeof data.turn_count !== 'undefined' && data.turn_count) {
                    console.log('data.turn_count:', data.turn_count)
                    makeRequest('POST', `${endPoint}/api/client/rewards/claim`, claim_data)
                      .then(res => {
                        console.log('res', res)
                        if (res) {
                          const resData = JSON.parse(res);
                          const { data } = resData;
  
                          // memo: get position of game: targetPrize [position of game in the list]
                          targetPrize = data?.game_prize_position;
  
                          // memo: game_prize_id, game_prize_name
                          targetPrizeId = data?.id;
                          targetPrizeName = data?.game_prize_name;
                          allowToPlay = true;
  
                          
                          removeClass(document.getElementsByClassName('popup--info')[0], 'show');
                        }
                      })
                      .catch(res => {
                        alert(res.message);
                      });
                  } else {
                    removeClass(document.getElementsByClassName('popup--info')[0], 'show');
                    addClass(document.getElementsByClassName('popup--over-turn')[0], 'show');
                    allowToPlay = true;
                    targetPrize = null;
                    targetPrizeName = null;
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
      // document.querySelector('.hc-luckywheel-trigger-btn').addEventListener('click', event => {
      //   document.querySelector(".hc-luckywheel-btn").click();
      // });
      
      // Close popups
      document.getElementsByClassName('popup--info-popup-close')[0].addEventListener('click', event => {
        removeClass(document.getElementsByClassName('popup--info')[0], 'show');
      });
      
      document.getElementsByClassName('popup--success-popup-close')[0].addEventListener('click', event => {
        removeClass(document.getElementsByClassName('popup--success')[0], 'show');
        document.getElementsByClassName('popup-gift')[0].innerHTML = '';
      });
      
      document.getElementsByClassName('popup--histories-popup-close')[0].addEventListener('click', event => {
        removeClass(document.getElementsByClassName('popup--histories')[0], 'show');
        removeURLParam('show_header');
      });
      
      // Popup full screen
      document.getElementsByClassName('btn-guide')[0].addEventListener('click', event => {
        addClass(document.getElementsByClassName('popup--guide')[0], 'show');
        addURLParam('show_header', 'false');
      });
      
      document.getElementsByClassName('popup--guide-popup-close')[0].addEventListener('click', event => {
        removeClass(document.getElementsByClassName('popup--guide')[0], 'show');
        removeURLParam('show_header');
      });
      
      document.getElementsByClassName('btn-award')[0].addEventListener('click', event => {
        addClass(document.getElementsByClassName('popup--award')[0], 'show');
        addURLParam('show_header', 'false');
      });
      
      document.getElementsByClassName('popup--award-popup-close')[0].addEventListener('click', event => {
        removeClass(document.getElementsByClassName('popup--award')[0], 'show');
        removeURLParam('show_header');
      });
  
      document.getElementsByClassName('popup--success-popup-close')[0].addEventListener('click', event => {
        removeClass(document.getElementsByClassName('popup--success show')[0], 'show');
        removeClass(btn, 'disabled');
      });
      
      document.getElementsByClassName('popup--success-popup-footer-popup-btn')[0].addEventListener('click', event => {
        removeClass(document.getElementsByClassName('popup--success show')[0], 'show');
        removeClass(btn, 'disabled');
      });
      document.getElementById('app-btn-exit').addEventListener('click', event => {
        console.log('click')
        document.location.href = '/wheel/exit'
      });
      // Get uder information if has token
      const gameUserToken = localStorage.getItem('gameUserToken');
      const claim_data = {
        game_code: window.cnvwidget?.gameId || ''
      }
      if (gameUserToken) {
        console.log('have gameUserToken')
        makeRequest('GET', `${endPoint}/api/client/game-info`+'?'+'game_code='+claim_data.game_code)
          .then(res => {
            if (res) {
              const resData = JSON.parse(res);
              const { data } = resData;
              
              // get historiest
              const histories = data?.histories || [];
                document.getElementById('histories').innerHTML = histories.map(item => 
                `<div class="prize">
                  <div class="prize-name">Bạn nhận được ${item.game_prize_name}</div>
                </div>`
              ).join('');
              
              document.getElementsByClassName('game-times')[0].innerHTML = data.turn_count;
              if (data.turn_count == 0) {
                console.log(data.turn_count)
                addClass(document.getElementsByClassName('popup--over-turn')[0], 'show');
                allowToPlay = false;
                targetPrize = null;
                targetPrizeName = null;
                targetPrizeId = null;
                addClass(btn, "disabled");
              }
            }
          });
      }
      
      // Histories
      document.getElementsByClassName('btn-show-histories')[0].addEventListener('click', event => {
        addClass(document.getElementsByClassName('popup--histories')[0], 'show');
        addURLParam('show_header', 'false');
      });
    }
    
    function addURLParam(key, value) {
      var queryParams = new URLSearchParams(window.location.search);    
      queryParams.set(key, value);
      history.replaceState(null, null, "?" + queryParams.toString());
  
    }
    
    function removeURLParam(key) {
      var queryParams = new URLSearchParams(window.location.search);    
      queryParams.delete(key);
      history.replaceState(null, null, "?" + queryParams.toString());
  
    }
    function renderHistories (data) {
      return data.map(item => 
        `<div class="prize">
          <svg width="40" height="38" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M36.6528 16.4395H3.34584C2.99784 16.4395 2.71484 16.7225 2.71484 17.0715V36.6685C2.71484 37.0165 2.99784 37.2985 3.34584 37.2985H36.6528C37.0018 37.2985 37.2848 37.0165 37.2848 36.6685V17.0715C37.2848 16.7225 37.0018 16.4395 36.6528 16.4395Z" fill="#F7434C"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M36.6528 16.4395H3.34584C2.99784 16.4395 2.71484 16.7225 2.71484 17.0715V19.5975H37.2848V17.0715C37.2848 16.7225 37.0018 16.4395 36.6528 16.4395Z" fill="#DB2E37"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.2266 16.4395H16.7736C16.4246 16.4395 16.1426 16.7225 16.1426 17.0715V36.6685C16.1426 37.0165 16.4246 37.2985 16.7736 37.2985H23.2266C23.5756 37.2985 23.8586 37.0165 23.8586 36.6685V17.0715C23.8586 16.7225 23.5756 16.4395 23.2266 16.4395Z" fill="#FFDB57"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.2266 16.4395H16.7736C16.4246 16.4395 16.1426 16.7225 16.1426 17.0715V19.5845H23.8586V17.0715C23.8586 16.7225 23.5756 16.4395 23.2266 16.4395Z" fill="#F5BA3D"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M35.4227 4.77262C34.8037 3.15862 33.8257 1.58262 32.8087 0.555622C32.4357 0.178622 31.9327 -0.0123781 31.3607 0.000621907C29.4647 0.0436219 26.3737 2.42462 22.1767 7.07362C22.0707 7.18962 22.0137 7.34062 22.0137 7.49762V10.8376C22.0137 11.1866 22.2957 11.4696 22.6457 11.4696H32.3597C34.5257 11.4696 35.4177 10.4166 35.7867 9.53262C36.2777 8.35562 36.1487 6.66462 35.4227 4.77262Z" fill="#FFDB57"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M35.7845 5.87466C35.7665 5.80966 35.7395 5.74866 35.7025 5.69166C34.7485 4.24966 32.6875 4.78966 31.1275 5.49666C26.5935 7.54866 24.7205 10.3757 24.6425 10.4957C24.5165 10.6897 24.5075 10.9367 24.6175 11.1407C24.7275 11.3447 24.9405 11.4707 25.1725 11.4707H32.3605C33.7385 11.4707 34.7605 11.0477 35.3965 10.2137C36.1535 9.22366 36.2885 7.72266 35.7845 5.87466Z" fill="#EF9325"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.823 7.07453C13.625 2.42553 10.535 0.0455325 8.639 0.000532459C8.065 -0.0114675 7.564 0.179532 7.191 0.556532C6.173 1.58253 5.196 3.15953 4.577 4.77353C3.851 6.66553 3.722 8.35553 4.213 9.53353C4.581 10.4165 5.474 11.4705 7.639 11.4705H17.354C17.703 11.4705 17.986 11.1875 17.986 10.8385V7.49753C17.986 7.34153 17.928 7.19053 17.823 7.07453Z" fill="#FFDB57"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3568 10.4951C15.2798 10.3761 13.4068 7.5481 8.87277 5.4961C7.31177 4.7891 5.25177 4.2501 4.29777 5.6921C4.26077 5.7481 4.23277 5.8091 4.21477 5.8741C3.71177 7.7231 3.84577 9.2241 4.60277 10.2141C5.23977 11.0481 6.26177 11.4711 7.63877 11.4711H14.8278C15.0588 11.4711 15.2718 11.3441 15.3818 11.1411C15.4928 10.9371 15.4828 10.6891 15.3568 10.4951Z" fill="#EF9325"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.6447 6.24219H17.3537C17.0047 6.24219 16.7227 6.52519 16.7227 6.87319V10.8392C16.7227 11.1872 17.0047 11.4702 17.3537 11.4702H22.6447C22.9937 11.4702 23.2767 11.1872 23.2767 10.8392V6.87319C23.2767 6.52519 22.9937 6.24219 22.6447 6.24219Z" fill="#F5BA3D"/>
            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="10" width="40" height="8">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 10.209H39.9998V17.704H0V10.209Z" fill="white"/>
            </mask>
            <g mask="url(#mask0)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M39.368 10.209H0.631C0.283 10.209 0 10.492 0 10.84V17.073C0 17.421 0.283 17.704 0.631 17.704H39.368C39.718 17.704 40 17.421 40 17.073V10.84C40 10.492 39.718 10.209 39.368 10.209Z" fill="#F7434C"/>
            </g>
            <mask id="mask1" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="38">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 37.3H40V0H0V37.3Z" fill="white"/>
            </mask>
            <g mask="url(#mask1)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1484 17.703H24.8514V10.207H15.1484V17.703Z" fill="#FFDB57"/>
            </g>
          </svg>
          <div class="prize-inner">
            <div class="prize-name">Bạn nhận được ${item.game_prize_name}</div>
            <div class="prize-desc">
              <span>Hạn dùng: 15/04/2020</span>
              <!--<button class="btn-apply">Sử Dụng</button>-->
            </div>
          </div>
        </div>`
      ).join('');
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
        xhr.setRequestHeader('X-CSRF-TOKEN', getMetaContent('csrf-token'));
        if(method == "POST" && data) {
          xhr.send(JSON.stringify(data));
        }else{
          xhr.send();
        }
      });
    }
    function getMetaContent(name){
      name = document.getElementsByTagName('meta')[name];
      if(name != undefined){
          name = name.getAttribute("content");
          if(name != undefined){
              return name;
          }
      }
      return null;
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
      xhttp.setRequestHeader('X-CSRF-TOKEN', getMetaContent('csrf-token'));
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
      max-width: 336px;
      width: 100%;
      border-radius: 50%;
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
    }

    .hc-luckywheel-container.animate-script-1 {
      -webkit-transition: transform 8s cubic-bezier(0.17, 0.67, 0.35, 1.13);
      transition: transform 8s cubic-bezier(0.17, 0.67, 0.35, 1.13);
    }

    .hc-luckywheel-container.animate-script-2 {
      -webkit-transition: transform 8s ease;
      transition: transform 8s ease;
    }
  
    .hc-luckywheel-container canvas,
    .hc-luckywheel-list {
      width: 270px;
      height: 270px;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
    }
  
    .hc-luckywheel-list {
      z-index: 2;
    }
  
    .hc-luckywheel-item {    
      z-index: 150;
          position: absolute;
          left: 50%;
          width: 50%;
          display: block;
          transform-origin: left center;
      display: flex;
      align-items: center;
    }
    
    .hc-luckywheel-item-inner {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      position: absolute;
      width: 100%;
      right: 0;
          top: 50%;
      transform: translateY(-50%);
      padding-right: 20px;
    }
    
    .hc-luckywheel-item .prize-image {
      display: inline-block;
      max-height: 41px;
    }
    
    .hc-luckywheel-item .prize-name {
      font-size: 8px;
      line-height: 10px;
      font-weight: bold;
      text-align: center;
      color: #000000;
      text-transform: uppercase;
      display: inline-block;
      max-width: 87px;
      position: relative;
      transform: rotate(24deg);
    }
    
    .prize-image {
      position: relative;
      transform: rotate(24deg);
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
  
    /*Change this when change size*/
  
    .hc-luckywheel-item img {
      
    }
  
    /*Change this when change size*/
  
    .hc-luckywheel-btn {
      position: absolute;
      width: 75px;
      height: 75px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: none !important;
      z-index: 30;
    }
    
    .hc-luckywheel-btn .hc-luckywheel-btn-icon {
      width: auto;
      max-width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    
    .hc-luckywheel-btn .hc-luckywheel-btn-text {
      max-width: 61px;
    }
  
    .hc-luckywheel-btn.disabled {
      pointer-events: none;
      // background: #b07a7b;
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
      // max-width: 470px;
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
      top: -15px;
      right: -15px;
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
      min-height: 100%;
      padding: 0px 15px 67px 15px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      box-sizing: border-box;
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
    .group-prize .group-prize-title {
      font-weight: 500;
      font-size: 15px;
      line-height: 18px;
      text-align: justify;
      margin-bottom: 20px;
    }
    .prize {
      padding: 14px 15px;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      line-height: 20px;
      color: #7F7F7F;
    }
    
    .prize svg {
      width: 40px;
      height: autol
    }
    .prize + .prize {
      margin-top: 18px;
    }
    .prize .prize-name {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      text-align: justify;
      color: #000000;
      margin-bottom: 21px;
    }
    .prize .prize-inner {
      width: calc(100% - 66px);
    }
    .prize .prize-desc {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .prize .btn-apply {
      font-size: 13px;
      line-height: 16px;
      text-align: center;
      color: #415097;
      background: #FFFFFF;
      border: 1px solid #415097;
      box-sizing: border-box;
      border-radius: 3px;
      padding: 7px 21px;
    }
    #cnvWheel{
        height: 100vh;
    }
    #cnvWidget{
        height: 100%;
    }
    
    .game {
      font-family: Helvetica Neue;
    }
    
    .game-name {
      width: 228px;
      margin: 0 auto;
      display: block;
    }
    
    .game-count {
      font-weight: bold;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
      color: #FFFFFF;
      text-transform: uppercase;
      margin-bottom: 44px;
    }
    
    .game-btn {
      border: none;
      background: none;
      background-color: #FFCB3D;
      border-radius: 3px;
      font-weight: bold;
      font-size: 13px;
      line-height: 21px;
      text-align: center;
      text-transform: uppercase;
      color: #000000;
      padding: 7px 10px;
      min-height: 41px;
      cursor: pointer;
    }
    
    .game-footer {
      max-width: 336px;
      margin: 10px auto 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .hc-luckywheel-arrow,
    .hc-luckywheel-border {
      position: absolute;
      top: 0;
      left: 0;
    }
    
    .hc-luckywheel-border {
      width: 100%;
    }
    
    .hc-luckywheel-arrow {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 50;
      width: 69px;
    }
    
    .popup--result .popup-content {
      color: #FFFFFF;
      width: calc(100% - 30px);
      max-width: 344px;
      padding: 30px 15px;
      font-weight: bold;
      font-size: 14px;
      line-height: 17px;
      background: #201612;
    }
    
    .popup--result .popup-btn {
      border: none;
      background: none;
      background-color: #FFCB3D;
      border-radius: 3px;
      height: 49px;
      text-align: center;
      font-weight: bold;
      font-size: 17px;
      line-height: 21px;
      color: #070707;
      width: 100%;
      max-width: 262px;
    }
    
    .popup--success .sub-title {
      font-weight: bold;
      font-size: 20px;
      line-height: 24px;
      text-align: center;
      color: #FFFFFF;
      margin-bottom: 26px;
    }
    
    .popup--success .gift {
      font-weight: 900;
      font-size: 45px;
      line-height: 55px;
      text-align: center;
      color: #FFD714;
      margin-bottom: 41px;
    }
    
    .popup--result .desc {
      margin-bottom: 25px;
    }
    
    .popup--over-turn {
      text-align: center;
    }
    
    .popup--over-turn .icon {
      margin-bottom: 37px;
    }
    
    .popup--over-turn .sub-title {
      font-weight: bold;
      font-size: 24px;
      line-height: 35px;
      text-align: center;
      text-transform: uppercase;
      color: #FFD714;
      margin-bottom: 38px;
    }
  
    .popup--full-screen {
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      overflow: auto;
    }
    
    .popup--full-screen .popup-heading {
      height: 49px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background-color: `+appBarBgColor+`;
      color: `+appBarTextColor+`;
      font-size: 18px;
      line-height: 21px;
      text-align: center;
      padding-top: 46px;
    }
    
    .popup--full-screen .popup-close {
      top: 74%;
      transform: translateY(-50%);
      left: 0;
      right: auto;
    }
    
    .popup--full-screen .popup-content {
      font-size: 15px;
      line-height: 24px;
      text-align: justify;
      color: #000000;
      padding: 17px;
    }
    
    .popup--full-screen .popup-content p,
    .popup--full-screen .popup-content ul {
      margin-top: 30px;
    }
    
    .popup--full-screen .popup-content p:first-child,
    .popup--full-screen .popup-content ul:first-child {
      margin-top: 0;
    }
  
    //header
    button.popup-close {
      bottom: -11%;
      transform: translateY(-50%);
      left: 0;
      right: auto;
      font-size: 30px;
      border: none;
      background: none;
      width: 35px;
      height: 35px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      cursor: pointer;
    }
    .modal-heading {
      height: 49px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background-color: `+appBarBgColor+`;
      color: `+appBarTextColor+`;
      font-size: 18px;
      line-height: 21px;
      text-align: center;
      padding-top: 46px;
    }
    button.popup-close {
      bottom: -11%;
      transform: translateY(-50%);
      left: 0;
      right: auto;
      font-size: 30px;
      border: none;
      background: none;
      width: 35px;
      height: 35px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      cursor: pointer;
    }
    `;
  
    styleInject(css_md);
  
    var modal = document.getElementById("cnvWidget");
    var span = document.getElementsByClassName("cnv-md-close")[0];
  
    modal.style.display = "block";
    if(span != undefined){
      span.onclick = function() {
        modal.style.display = "none";
      }
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
  
  })();