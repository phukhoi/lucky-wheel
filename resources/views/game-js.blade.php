window.cnvwidget = {
    gameId: '{{ $game->code }}',
    productionUrl: '{{ config('app.url') }}',
    stagingUrl: '{{ config('app.url') }}',
    isDebugMode: {{ config('app.debug') ? 'true' : 'false' }}
  };

  var background_url = "{{ $gameType->background_url }}";
  var arrow_url = "{{ $gameType->arrow_url }}";
  var border_url = "{{ $gameType->border_url }}";
  var btn_background_url = "{{ $gameType->btn_background_url }}";
  var button_url = "{{ $gameType->button_url }}";
  var prize_colors = [ @foreach($gameType->prize_colors ?: [] as $color) "{{ $color }}", @endforeach ];
  var introduction_content = `{!! $game->introduction_content !!}`;
  var reward_content = `{!! $game->reward_content !!}`;

  var url_string = window.location.href
  var url = new URL(url_string);
  var appBarTextColor = url.searchParams.get("appbar_text_color");

  if(appBarTextColor == null){
    appBarTextColor = "#fff"
  }else{
    appBarTextColor = "#"+appBarTextColor
  }
  
var prizes = [
    @foreach ($gamePrizes as $prize) 
        {
            id: {{ $prize->position }},
            text: "{{ $prize->name }}",
            img: "{{ $prize->image_url }}",
            number: 1,
            percentpage: 0.24 // 24%
        },
    @endforeach
    ];
  
  function insertScript(url) {
    var a = document.createElement("script");
    a.async = 1;
    if (url) {
      a.src = url;
    }
    document.head.appendChild(a);
  }
  function initHTML() {
    document.body.innerHTML = `<div id="cnvWheel" class="game">
    <!-- The Modal -->
      <div id="cnvWidget" class="modal">
      <div class="modal-heading">
              <button id="app-btn-exit" class="popup-close">
                  <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="6" y="0" width="10" height="16">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0H16V16H6V0Z" fill="white"></path>
                      </mask>
                      <g mask="url(#mask0)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.3602 8.0032L15.7288 2.01813C15.9035 1.8528 16 1.63307 16 1.39947C16 1.1648 15.9035 0.945067 15.7288 0.7808L15.1705 0.256C14.9946 0.0906667 14.7608 0 14.5123 0C14.2626 0 14.0288 0.0906667 13.8529 0.256L6.27123 7.3824C6.09533 7.54773 5.99888 7.76853 6.00001 8.0032C5.99888 8.23893 6.09533 8.45973 6.27123 8.62507L13.8461 15.744C14.022 15.9093 14.2547 16 14.5054 16C14.754 16 14.9877 15.9093 15.1636 15.744L15.7208 15.2203C16.084 14.8789 16.084 14.3232 15.7208 13.9819L9.3602 8.0032Z" fill="${appBarTextColor}"></path>
                  </g>
                  </svg>
              </button>
              
              <span>Game vòng quay</span>
          </div>
          <!-- background_url -->
          <div class="modal-content" style="background-image: url(${background_url})">
             <!--<span class="cnv-md-close">&times;</span>-->
              <div class="wrapper typo" id="wrapper">
                  <img class="game-name" src="https://i.ibb.co/z6GQYWp/quay-la-tru-ng-02.png" />
                  
                  <div class="game-count">
                      BẠN CÓ
                      <span class="game-times">0</span>
                      LƯỢT QUAY
                  </div>
                  
                  <section id="luckywheel" class="hc-luckywheel">
                      <img class="hc-luckywheel-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" />
                      
                      <!-- arrow_url -->
                      <div class="hc-luckywheel-arrow">
                          <img src="${arrow_url}" />
                      </div>
                      <!-- arrow_url -->
  
                      <!-- border_url -->
                      <img class="hc-luckywheel-border" src="${border_url}" />
                      <!-- End of border_url -->
  
                      <div class="hc-luckywheel-container">
                          <canvas class="hc-luckywheel-canvas" width="500px" height="500px">Vòng Xoay May Mắn</canvas>
                      </div>
  
                      <a class="hc-luckywheel-btn" href="javascript:;">
                          <img class="hc-luckywheel-btn-icon hc-luckywheel-btn-bg" src="${btn_background_url}" />
                          <img class="hc-luckywheel-btn-icon hc-luckywheel-btn-text" src="${button_url}" />
                      </a>
                  </section>
                  
                  <div class="game-footer">
                      <button type="button" class="game-btn btn-guide">hướng dẫn</button>
                      <button type="button" class="game-btn btn-award">GIẢI THƯỞNG</button>
                      <button type="button" class="game-btn btn-show-histories">LỊCH SỬ</button>
                  </div>
              </div>
          </div>
      </div>
  
      <!-- Modal information -->
      <div class="popup popup--info">
            <div class="popup-inner">
              <div class="popup-content">
                  <button class="popup-close popup--info-popup-close">×</button>
                  <div class="title">BẠN VUI LÒNG NHẬP THÔNG TIN ĐỂ BÊN MÌNH GỬI QUÀ NHÉ!</div>
                  <form class="info-form" action="">
                  <div class="form-group">
                      <label class="form-label" for="Họ và tên">Họ và tên</label>
                      <input id="input-name" type="text" class="form-control" name="name" data-name="Họ và tên" placeholder="Họ và tên" />
                      <div class="form-error hidden"></div>
                  </div>
                  <div class="form-group">
                      <label class="form-label" for="Họ và tên">Email</label>
                      <input id="input-email" type="text" class="form-control" name="email" data-name="Email" placeholder="Email" required value="" />
                      <div class="form-error hidden"></div>
                </div>
                  <div class="form-group">
                      <label class="form-label" for="Số điện thoại">Số điện thoại</label>
                      <input id="input-phone" type="text" class="form-control" name="phone" data-name="Số điện thoại" placeholder="Số điện thoại" />
                      <div class="form-error hidden"></div>
                  </div>
                  <input id="input-userid" type="hidden" class="form-control" name="userid" />
                  <button type="button" class="btn btn--info form-btn--info">
                      XÁC NHẬN
                  </button>
                  </form>
                  <p class="desc">Vui lòng nhập đúng thông tin để nhận quà</p>
              </div>
            </div>
          </div>
      <!-- End of Modal information -->
      <!-- Modal Success -->
      <div class="popup popup--result popup--success">
          <div class="popup-inner">
              <div class="popup-content">
                  <button class="popup-close popup--success-popup-close">
                      <svg width="12" viewBox="0 0 329.26933 329" xmlns="http://www.w3.org/2000/svg">
                          <g fill="#ddd">
                              <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/>
                          </g>
                      </svg>
                  </button>
                  <p class="sub-title">PHẦN QUÀ CỦA BẠN LÀ:</p>
                  <p class="gift popup-gift"></p>
                  <p class="desc">Phần quà sẽ được thêm vào ƯU ĐÃI CỦA BẠN</p>
                  <div class="popup-footer">
                      <button class="popup-btn popup--success-popup-footer-popup-btn">QUAY TIẾP</button>
                  </div>
              </div>
          </div>
      </div>
      <!-- End of Modal Success -->
      <!-- Modal Over turn -->
      <div class="popup popup--result popup--over-turn">
          <div class="popup-inner">
              <div class="popup-content">
                  <button class="popup-close popup--over-turn-popup-close">
                      <svg width="12" viewBox="0 0 329.26933 329" xmlns="http://www.w3.org/2000/svg">
                          <g fill="#ddd">
                              <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/>
                          </g>
                      </svg>
                  </button>
                  <div class="icon">
                      <svg width="123" height="124" viewBox="0 0 123 124" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="123" height="123">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.595703 0.162109H122.88V122.446H0.595703V0.162109Z" fill="white"/>
                      </mask>
                      <g mask="url(#mask0)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.595703 61.3043C0.595703 27.5368 27.9704 0.162109 61.7379 0.162109C95.5062 0.162109 122.881 27.5368 122.881 61.3043C122.881 95.0726 95.5062 122.447 61.7379 122.447C27.9704 122.447 0.595703 95.0726 0.595703 61.3043Z" fill="#FFD153"/>
                      </g>
                      <mask id="mask1" mask-type="alpha" maskUnits="userSpaceOnUse" x="11" y="9" width="112" height="115">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0332 9.93945H122.884V123.297H11.0332V9.93945Z" fill="white"/>
                      </mask>
                      <g mask="url(#mask1)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M93.9413 9.93945C99.9859 19.4534 103.491 30.7658 103.491 42.9032C103.491 76.7013 76.3151 104.101 42.7911 104.101C31.1483 104.101 20.2725 100.794 11.0332 95.0636C21.8214 112.043 40.6988 123.297 62.1841 123.297C95.7074 123.297 122.884 95.8986 122.884 62.0991C122.884 40.0392 111.305 20.7077 93.9413 9.93945Z" fill="#FFC547"/>
                      </g>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.47701 68.0638C8.47701 36.4192 33.6879 10.7654 64.7877 10.7654C82.9661 10.7654 99.1294 19.533 109.425 33.1357C99.7015 15.9583 81.4761 4.39453 60.5965 4.39453C29.4967 4.39453 4.28516 30.0483 4.28516 61.6936C4.28516 74.8416 8.64067 86.9535 15.9591 96.6225C11.2002 88.2148 8.47701 78.4633 8.47701 68.0638Z" fill="#FFD87A"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M74.9134 85.7978C71.4129 82.6363 66.6705 80.8535 61.926 80.9468C57.2609 80.9657 52.5604 82.7417 49.0253 85.8257C47.2415 87.4015 45.7521 89.3213 44.7101 91.3938C43.6133 93.647 43.0446 95.9159 43.0215 98.1375C43.0165 98.6695 43.3376 99.1451 43.8189 99.3197C44.3017 99.4943 44.8349 99.328 45.1474 98.9081C46.421 97.1892 47.6297 95.8234 48.8355 94.7397C50.1343 93.5913 51.5148 92.631 52.9363 91.886C55.77 90.408 58.8982 89.62 61.9866 89.6065C65.1566 89.5809 68.1592 90.3244 70.9272 91.825C73.779 93.3475 76.3955 95.7278 78.7032 98.899C78.9319 99.2136 79.2848 99.389 79.6485 99.389C79.7777 99.389 79.9083 99.3664 80.0353 99.3212C80.5202 99.1459 80.8427 98.6673 80.8348 98.1322C80.7691 93.6583 78.5524 89.0451 74.9134 85.7978Z" fill="#654735"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M106.23 71.0601C106.23 71.0594 106.23 71.0594 106.23 71.0594C105.427 70.831 104.645 70.6188 103.848 70.4009C102.189 69.949 100.622 69.5209 99.1093 69.0095C96.8367 68.2612 94.795 67.4149 92.8662 66.4243C90.8389 65.379 88.995 64.2132 87.2273 62.8603C85.2942 61.3989 83.5006 59.688 81.8502 58.0577C81.679 57.8889 81.4129 57.8391 81.1885 57.9351C80.9649 58.0311 80.8225 58.2546 80.8347 58.4928C80.9613 61.0234 81.9868 63.6373 83.8005 66.0509C85.4524 68.2276 87.666 70.0611 90.1989 71.3537C92.5771 72.5727 95.2488 73.3203 97.9262 73.5164L98.2391 73.5367C98.6102 73.5557 98.9769 73.5655 99.3394 73.5655C101.912 73.5655 104.254 73.0863 106.317 72.1376C106.539 72.0354 106.675 71.807 106.656 71.5695C106.637 71.3313 106.466 71.1267 106.23 71.0601Z" fill="#2C2C2C"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M42.6665 57.9354C42.4422 57.8388 42.1768 57.8892 42.0056 58.058C40.3544 59.6883 38.5609 61.3984 36.627 62.8605C34.8615 64.2127 33.0176 65.3784 30.9896 66.4237C29.0608 67.415 27.0184 68.2606 24.7437 69.0103C23.2334 69.521 21.6664 69.9484 19.9728 70.4107C19.2097 70.6188 18.428 70.8311 17.6247 71.0588C17.6247 71.0588 17.6247 71.0588 17.6247 71.0595C17.3896 71.1267 17.2184 71.3313 17.199 71.5695C17.1803 71.807 17.3162 72.0354 17.5377 72.137C19.601 73.0863 21.9433 73.5655 24.5157 73.5655C24.8782 73.5655 25.2456 73.5557 25.6167 73.5367L25.9296 73.5164C28.607 73.3203 31.2787 72.5727 33.6555 71.353C36.1898 70.0611 38.4027 68.227 40.056 66.0503C41.869 63.6375 42.8938 61.0236 43.0204 58.4931C43.0326 58.2549 42.8909 58.0314 42.6665 57.9354Z" fill="#2C2C2C"/>
                      </svg>
  
                  </div>
                  <p class="sub-title">Rất tiếc <br/>bạn đã hết lượt quay!</p>
                  <div class="popup-footer">
                      <button class="popup-btn popup--over-turn-popup-footer-popup-btn">ĐÓNG</button>
                  </div>
              </div>
          </div>
      </div>
      <!-- End of Modal Over turn -->
      <!-- Modal Histories -->
      <div class="popup popup--full-screen popup--histories">
          <div class="popup-heading">
              <button class="popup-close popup--histories-popup-close">
                  <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="6" y="0" width="10" height="16">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0H16V16H6V0Z" fill="white"/>
                      </mask>
                      <g mask="url(#mask0)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.3602 8.0032L15.7288 2.01813C15.9035 1.8528 16 1.63307 16 1.39947C16 1.1648 15.9035 0.945067 15.7288 0.7808L15.1705 0.256C14.9946 0.0906667 14.7608 0 14.5123 0C14.2626 0 14.0288 0.0906667 13.8529 0.256L6.27123 7.3824C6.09533 7.54773 5.99888 7.76853 6.00001 8.0032C5.99888 8.23893 6.09533 8.45973 6.27123 8.62507L13.8461 15.744C14.022 15.9093 14.2547 16 14.5054 16C14.754 16 14.9877 15.9093 15.1636 15.744L15.7208 15.2203C16.084 14.8789 16.084 14.3232 15.7208 13.9819L9.3602 8.0032Z" fill="${appBarTextColor}"/>
                  </g>
                  </svg>
              </button>
              
              <span>Lịch sử</span>
          </div>
          <div class="popup-content">
              <div id="histories">
                  
              </div>
          </div>
      </div>
      <!-- End of Modal Success -->
      <!-- Modal Guide -->
      <div class="popup popup--full-screen popup--guide">
          <div class="popup-heading">
              <button class="popup-close popup--guide-popup-close">
                  <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="6" y="0" width="10" height="16">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0H16V16H6V0Z" fill="white"/>
                      </mask>
                      <g mask="url(#mask0)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.3602 8.0032L15.7288 2.01813C15.9035 1.8528 16 1.63307 16 1.39947C16 1.1648 15.9035 0.945067 15.7288 0.7808L15.1705 0.256C14.9946 0.0906667 14.7608 0 14.5123 0C14.2626 0 14.0288 0.0906667 13.8529 0.256L6.27123 7.3824C6.09533 7.54773 5.99888 7.76853 6.00001 8.0032C5.99888 8.23893 6.09533 8.45973 6.27123 8.62507L13.8461 15.744C14.022 15.9093 14.2547 16 14.5054 16C14.754 16 14.9877 15.9093 15.1636 15.744L15.7208 15.2203C16.084 14.8789 16.084 14.3232 15.7208 13.9819L9.3602 8.0032Z" fill="${appBarTextColor}"/>
                  </g>
                  </svg>
              </button>
              
              <span>Hướng Dẫn</span>
          </div>
          <div class="popup-content">
              ${introduction_content}
          </div>
      </div>
      <!-- End of Modal Guide -->
      <!-- Modal Award -->
      <div class="popup popup--full-screen popup--award">
          <div class="popup-heading">
              <button class="popup-close popup--award-popup-close">
                  <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="6" y="0" width="10" height="16">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0H16V16H6V0Z" fill="white"/>
                      </mask>
                      <g mask="url(#mask0)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.3602 8.0032L15.7288 2.01813C15.9035 1.8528 16 1.63307 16 1.39947C16 1.1648 15.9035 0.945067 15.7288 0.7808L15.1705 0.256C14.9946 0.0906667 14.7608 0 14.5123 0C14.2626 0 14.0288 0.0906667 13.8529 0.256L6.27123 7.3824C6.09533 7.54773 5.99888 7.76853 6.00001 8.0032C5.99888 8.23893 6.09533 8.45973 6.27123 8.62507L13.8461 15.744C14.022 15.9093 14.2547 16 14.5054 16C14.754 16 14.9877 15.9093 15.1636 15.744L15.7208 15.2203C16.084 14.8789 16.084 14.3232 15.7208 13.9819L9.3602 8.0032Z" fill="${appBarTextColor}"/>
                  </g>
                  </svg>
              </button>
              
              <span>Giải Thưởng</span>
          </div>
          <div class="popup-content">
              ${reward_content}
          </div>
      </div>
      <!-- End of Modal Award -->
      </div>`;
  }
  initHTML();
  //insertScript("./spinner.js?");
    insertScript(window.cnvwidget.stagingUrl + '/js/spinner.js?');
  var isPercentage = true;
  
  var w_ready = false;
  var w_is_ready = setInterval(function () {
    if (w_ready) {
      clearInterval(w_is_ready);
    }
    if (document.readyState !== "loading") {
      initWheel();
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        initWheel();
      });
    }
    function initWheel() {
      // console.log(document.getElementById('cnvWheel'));
      console.log('window.hcLuckywheel', window.hcLuckywheel);
      var hcLuckywheel = window.hcLuckywheel;
      
      if (hcLuckywheel) {
        hcLuckywheel.init({
          id: "luckywheel",
          config: function (callback) {
            callback && callback(prizes);
          },
          mode: "both",
          getPrize: function (callback) {
            var rand = randomIndex(prizes);
            var chances = rand;
            callback && callback([rand, chances]);
          },
          gotBack: function (data) {
            if (data == null) {
              console.log("Chương trình kết thúc");
            } else if (data == "Chúc bạn may mắn lần sau") {
              console.log("Bạn không trúng thưởng");
            } else {
              console.log("Bạn đã trúng giải");
            }
          },
        });
      }
    }
    function randomIndex(prizes) {
      if (isPercentage) {
        var counter = 1;
        for (let i = 0; i < prizes.length; i++) {
          if (prizes[i].number == 0) {
            counter++;
          }
        }
        if (counter == prizes.length) {
          return null;
        }
        let rand = Math.random();
        let prizeIndex = null;
        switch (true) {
          case rand < prizes[4].percentpage:
            prizeIndex = 4;
            break;
          case rand < prizes[4].percentpage + prizes[3].percentpage:
            prizeIndex = 3;
            break;
          case rand <
            prizes[4].percentpage + prizes[3].percentpage + prizes[2].percentpage:
            prizeIndex = 2;
            break;
          case rand <
            prizes[4].percentpage +
              prizes[3].percentpage +
              prizes[2].percentpage +
              prizes[1].percentpage:
            prizeIndex = 1;
            break;
          case rand <
            prizes[4].percentpage +
              prizes[3].percentpage +
              prizes[2].percentpage +
              prizes[1].percentpage +
              prizes[0].percentpage:
            prizeIndex = 0;
            break;
        }
        if (prizes[prizeIndex].number != 0) {
          prizes[prizeIndex].number = prizes[prizeIndex].number - 1;
          return prizeIndex;
        } else {
          return randomIndex(prizes);
        }
      } else {
        var counter = 0;
        for (let i = 0; i < prizes.length; i++) {
          if (prizes[i].number == 0) {
            counter++;
          }
        }
        if (counter == prizes.length) {
          return null;
        }
        var rand = (Math.random() * prizes.length) >>> 0;
        if (prizes[rand].number != 0) {
          prizes[rand].number = prizes[rand].number - 1;
          return rand;
        } else {
          return randomIndex(prizes);
        }
      }
    }
    clearInterval(w_is_ready);
  }, 400);
