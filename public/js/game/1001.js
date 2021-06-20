window.cnvwidget = {
    gameId: '11a01ac7-20cf-42ec-9173-702de1ea7de5',
    productionUrl: 'http://game-platform-staging.cnvloyalty.com',
    stagingUrl: 'http://game-platform-staging.cnvloyalty.com',
    isDebugMode: true
};
	
var background_url = "./background.jpg";
var arrow_url = "./arrow.png";
var border_url = "./broder.png";
var btn_background_url = "./btn-background.png";
var button_url = "./btn-url.png";
var prize_colors = ["#FFBD66", "#FFE255"];

function insertScript(url) {
    var a = document.createElement('script');
    a.async = 1;
    if (url) {
        a.src = url;
    }
    document.head.appendChild(a);
}
function initHTML() {
    document.body.innerHTML = `<div id="cnvWheel" class="game"><!-- The Modal -->
    <div id="cnvWidget" class="modal">
        <!-- background_url -->
        <div class="modal-content" style="background-image: url(${background_url})">
            <span class="cnv-md-close">&times;</span>
            <div class="wrapper typo" id="wrapper">
                <img class="game-name" src="./name.png" />
                
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
                    <button class="game-btn">hướng dẫn</button>
                    <button class="game-btn">GIẢI THƯỞNG</button>
                    <button class="game-btn btn-show-histories">LỊCH SỬ</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal information -->
    <div class="popup popup--info">
          <div class="popup-inner">
            <div class="popup-content">
                <button class="popup-close">×</button>
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
                <button class="popup-close">
                    <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="37" height="36">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.458984 0H36.2581V35.7984H0.458984V0Z" fill="white"/>
                        </mask>
                        <g mask="url(#mask0)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.9502 22.3817C25.5329 22.9643 25.5329 23.9076 24.9502 24.4902C24.6594 24.782 24.2772 24.9279 23.895 24.9279C23.5138 24.9279 23.1316 24.782 22.8408 24.4902L18.3587 20.0091L13.8757 24.4902C13.5857 24.782 13.2036 24.9279 12.8214 24.9279C12.4393 24.9279 12.058 24.782 11.7671 24.4902C11.1836 23.9076 11.1836 22.9643 11.7671 22.3817L16.2492 17.8987L11.7671 13.4166C11.1836 12.834 11.1836 11.8907 11.7671 11.3071C12.3498 10.7245 13.2931 10.7245 13.8757 11.3071L18.3587 15.7901L22.8408 11.3071C23.4243 10.7245 24.3667 10.7245 24.9502 11.3071C25.5329 11.8907 25.5329 12.834 24.9502 13.4166L20.4673 17.8987L24.9502 22.3817ZM18.3586 0C8.48788 0 0.458984 8.02889 0.458984 17.8988C0.458984 27.7704 8.48788 35.7984 18.3586 35.7984C28.2285 35.7984 36.2583 27.7704 36.2583 17.8988C36.2583 8.02889 28.2285 0 18.3586 0Z" fill="white"/>
                        </g>
                    </svg>
                </button>
                <p class="sub-title">PHẦN QUÀ CỦA BẠN LÀ:</p>
                <p class="gift">Voucher 15%</p>
                <p class="desc">Phần quà sẽ được thêm vào ƯU ĐÃI CỦA BẠN</p>
                <div class="popup-footer">
                    <button class="popup-btn">QUAY TIẾP</button>
                </div>
            </div>
        </div>
    </div>
    <!-- End of Modal Success -->
    <!-- Modal Over turn -->
    <div class="popup popup--result popup--over-turn" style="display: block">
        <div class="popup-inner">
            <div class="popup-content">
                <button class="popup-close">
                    <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="37" height="36">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.458984 0H36.2581V35.7984H0.458984V0Z" fill="white"/>
                        </mask>
                        <g mask="url(#mask0)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.9502 22.3817C25.5329 22.9643 25.5329 23.9076 24.9502 24.4902C24.6594 24.782 24.2772 24.9279 23.895 24.9279C23.5138 24.9279 23.1316 24.782 22.8408 24.4902L18.3587 20.0091L13.8757 24.4902C13.5857 24.782 13.2036 24.9279 12.8214 24.9279C12.4393 24.9279 12.058 24.782 11.7671 24.4902C11.1836 23.9076 11.1836 22.9643 11.7671 22.3817L16.2492 17.8987L11.7671 13.4166C11.1836 12.834 11.1836 11.8907 11.7671 11.3071C12.3498 10.7245 13.2931 10.7245 13.8757 11.3071L18.3587 15.7901L22.8408 11.3071C23.4243 10.7245 24.3667 10.7245 24.9502 11.3071C25.5329 11.8907 25.5329 12.834 24.9502 13.4166L20.4673 17.8987L24.9502 22.3817ZM18.3586 0C8.48788 0 0.458984 8.02889 0.458984 17.8988C0.458984 27.7704 8.48788 35.7984 18.3586 35.7984C28.2285 35.7984 36.2583 27.7704 36.2583 17.8988C36.2583 8.02889 28.2285 0 18.3586 0Z" fill="white"/>
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
                <p class="desc">Hãy trở lại vào ngày maiđể nhận thêm 3 lượt quay măn mắn nữa nhé!</p>
                <div class="popup-footer">
                    <button class="popup-btn">VỀ TRANG CHỦ</button>
                </div>
            </div>
        </div>
    </div>
    <!-- End of Modal Over turn -->
    <!-- Modal Histories -->
    <div class="popup popup--histories">
        <div class="popup-inner">
            <div class="popup-content">
                <button class="popup-close">×</button>
                <div id="histories"></div>
            </div>
        </div>
    </div>
    <!-- End of Modal Success -->
    </div>`;
}
initHTML();
  insertScript('./spinner.js?');
// insertScript(window.cnvwidget.stagingUrl + '/js/spinner.js?');
var isPercentage = true;
var prizes = [
    {
        id: 0,
        text: "Chúc bạn may mắn lần sau",
        img: "./prize-1.png",
        number: 1,
        percentpage: 0.24 // 24%
    },
    {
        id: 1,
        text: "Giải đặc biệt",
        img: "./prize-2.png",
        number: 1,
        percentpage: 0.24 // 24%
    },
    {
        id: 2,
        text: "Giảm giá 50%",
        img: "./prize-3.png",
        number: 1,
        percentpage: 0.24 // 24%
    },
    {
        id: 3,
        text: "Giảm giá 15%",
        img: "./prize-4.png",
        number: 1,
        percentpage: 0.24 // 24%
    },
    {
        id: 4,
        text: "Giảm giá 10%",
        img: "./prize-5.png",
        number: 1,
        percentpage: 0.24 // 24%
    },
];
var w_ready = false;
var w_is_ready = setInterval(function() {
    if (w_ready) {
        clearInterval(w_is_ready);
    }
    if (document.readyState !== 'loading') {
        initWheel();
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            initWheel();
        });
    }
    function initWheel() {
        // console.log(document.getElementById('cnvWheel'));
        hcLuckywheel.init({
            id: "luckywheel",
            config: function(callback) {
                callback &&
                    callback(prizes);
            },
            mode: "both",
            getPrize: function(callback) {
                var rand = randomIndex(prizes);
                var chances = rand;
                callback && callback([rand, chances]);
            },
            gotBack: function(data) {
                console.log(data);
                if (data == null) {
                    console.log('Chương trình kết thúc');
                } else if (data == 'Chúc bạn may mắn lần sau') {
                    console.log('Bạn không trúng thưởng');
                } else {
                    console.log('Bạn đã trúng giải');
                }
            }
        });
    }
    function randomIndex(prizes) {
        if (isPercentage) {
            var counter = 1;
            for (let i = 0; i < prizes.length; i++) {
                if (prizes[i].number == 0) {
                    counter++
                }
            }
            if (counter == prizes.length) {
                return null
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
                case rand < prizes[4].percentpage + prizes[3].percentpage + prizes[2].percentpage:
                    prizeIndex = 2;
                    break;
                case rand < prizes[4].percentpage + prizes[3].percentpage + prizes[2].percentpage + prizes[1].percentpage:
                    prizeIndex = 1;
                    break;
                case rand < prizes[4].percentpage + prizes[3].percentpage + prizes[2].percentpage + prizes[1].percentpage + prizes[0].percentpage:
                    prizeIndex = 0;
                    break;
            }
            if (prizes[prizeIndex].number != 0) {
                prizes[prizeIndex].number = prizes[prizeIndex].number - 1
                return prizeIndex
            } else {
                return randomIndex(prizes)
            }
        } else {
            var counter = 0;
            for (let i = 0; i < prizes.length; i++) {
                if (prizes[i].number == 0) {
                    counter++
                }
            }
            if (counter == prizes.length) {
                return null
            }
            var rand = (Math.random() * (prizes.length)) >>> 0;
            if (prizes[rand].number != 0) {
                prizes[rand].number = prizes[rand].number - 1
                return rand
            } else {
                return randomIndex(prizes)
            }
        }
    }
    clearInterval(w_is_ready);
}, 400)