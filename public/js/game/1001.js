window.cnvwidget = {
    gameId: '11a01ac7-20cf-42ec-9173-702de1ea7de5',
    productionUrl: 'http://game-platform-staging.cnvloyalty.com',
    stagingUrl: 'http://game-platform-staging.cnvloyalty.com',
    isDebugMode: true
};
	
var background_url = "https://game-platform-staging.cnvloyalty.com/storage/58dd4ae186bd031b15aa8fc2712fba5c_a72f278e8b90d473f8706cd33693a6a2.png";
var arrow_url = "https://game-platform-staging.cnvloyalty.com/storage/537bdc7173ad9f401009360a3adc3c24_f9cbacb9f7b77ee907ea8d039f2ebc53.png";
var border_url = "https://game-platform-staging.cnvloyalty.com/storage/f05594184354833649a3b2b509e5853c_1df4b275d6e311b008187ff9c107d7ac.png";
var btn_background_url = "https://game-platform-staging.cnvloyalty.com/storage/13080966db546a2480b0e3a234185f3d_e62f1f56f7259115bee595bad615a315.png";
var button_url = "https://game-platform-staging.cnvloyalty.com/storage/a58cfe310cc0c146f2c7f7631559dbee_7134de1115cab96cea2ef7b91b61bd62.gif";
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
    document.body.innerHTML = `<div id="cnvWheel"><!-- The Modal -->
    <div id="cnvWidget" class="modal">
        <!-- background_url -->
        <div class="modal-content" style="background-image: url(${background_url})">
            <span class="cnv-md-close">&times;</span>
            <div class="wrapper typo" id="wrapper">
            <div class="name">Vòng quay đêm 18</div>
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
                    <img src="${btn_background_url}" />
                    <img src="${button_url}" />
                </a>
            </section>
            <div class="your-information">
                <div class="turn-count">
                    Bạn còn
                    <span class="times">0</span>
                    lượt chơi
                </div>
                <div class="text-center">
                    <button class="btn-link btn-show-histories">Kiểm tra phần thưởng</button>
                </div>
            </div>
            <div class="text-center">
                <a class="hc-luckywheel-trigger-btn" href="javascript:;">Chơi ngay</a>
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
    <div class="popup popup--success">
        <div class="popup-inner">
            <div class="popup-content">
                <button class="popup-close">×</button>
                <p class="sub-title">Chúc mừng bạn đã nhận được phần quà
                </p>
                <p class="gift">VOUCHER 20%</p>
                <p class="desc">Số lượng có hạn vậy nên mong quý khách hàng bình luận hoặc inbox để được nhận phần thưởng.</p>
                <div class="popup-footer">
                <a class="btn btn--green" href="#">Inbox</a>
                <a class="btn" href="#">Mua hàng</a>
                </div>
            </div>
        </div>
    </div>
    <!-- End of Modal Success -->
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
//   insertScript('./spinner.js?');
insertScript(window.cnvwidget.stagingUrl + '/js/spinner.js?');
var isPercentage = true;
var prizes = [
    {
        id: 0,
        text: "Chúc bạn may mắn lần sau",
        img: "",
        number: 1,
        percentpage: 0.24 // 24%
    },
    {
        id: 1,
        text: "Giải đặc biệt",
        img: "",
        number: 1,
        percentpage: 0.24 // 24%
    },
    {
        id: 2,
        text: "Giảm giá 50%",
        img: "",
        number: 1,
        percentpage: 0.24 // 24%
    },
    {
        id: 3,
        text: "Giảm giá 15%",
        img: "",
        number: 1,
        percentpage: 0.24 // 24%
    },
    {
        id: 4,
        text: "Giảm giá 10%",
        img: "",
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