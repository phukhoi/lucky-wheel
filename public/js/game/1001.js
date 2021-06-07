window.cnvwidget = {
    gameId: '11a01ac7-20cf-42ec-9173-702de1ea7de5',
    productionUrl: '',
    stagingUrl: 'https://game-platform-staging.cnvloyalty.com.vn/',
    isDebugMode: true
  };
  
  function insertScript(url) {
    var a = document.createElement('script');
    a.async = 1;
    if (url) {
        a.src = url;
    }
    document.head.appendChild(a);
  }
  
  function initHTML(){
    
    document.body.innerHTML = `<div id="cnvWheel"><!-- The Modal -->
    <div id="cnvWidget" class="modal">
      <div class="modal-content">
        <span class="cnv-md-close">&times;</span>
        <div class="wrapper typo" id="wrapper">
        <section id="luckywheel" class="hc-luckywheel">
            <img class="hc-luckywheel-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" />
            <div class="hc-luckywheel-container">
              <canvas class="hc-luckywheel-canvas" width="500px" height="500px">Vòng Xoay May Mắn</canvas>
            </div>
            <a class="hc-luckywheel-btn" href="javascript:;">Xoay</a>
          </section>
        </div>
      </div>
    </div>
    <!-- Modal information -->
    <div class="popup popup--info">
          <div class="popup-inner">
            <div class="popup-content">
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
    <div class="popup popup--success ">
        <div class="popup-inner">
        <div class="popup-content">
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
    </div>`; 
  
  }
  
  initHTML();
  
  insertScript('http://game-platform.test/js/spinner.js?');
//   insertScript('./spinner.js');
  
  
  
  var isPercentage = true;
  var prizes = [
        {
        text: "Mã giảm giá 1 (20%)",
        img: "https://img.icons8.com/bubbles/2x/prize.png",
        number: 1, // 1%,
        percentpage: 0.01 // 1%
        },
        {
        text: "Mã giảm giá 2 (15%)",
        img: "https://img.icons8.com/bubbles/2x/prize.png",
        number: 1,
        percentpage: 0.05 // 5%
        },
        {
        text: "Mã giảm giá 3 (10%)",
        img: "https://img.icons8.com/bubbles/2x/prize.png",
        number : 1,
        percentpage: 0.1 // 10%
        },
        {
        text: "Giải đặc biệt (5%)",
        img: "https://img.icons8.com/bubbles/2x/prize.png",
        number: 1,
        percentpage: 0.24 // 24%
        },
        {
        text: "Chúc bạn may mắn lần sau",
        img: "https://img.icons8.com/bubbles/2x/prize.png",
        percentpage: 0.6 // 60%
        },
    
    ];  
  
   
  var w_ready = false;   	
  var w_is_ready = setInterval(function() {
  
    if (w_ready) {
        clearInterval(w_is_ready);
    }
    if( document.readyState !== 'loading' ) {
        initWheel();
    } else {
        document.addEventListener('DOMContentLoaded', function () {
            initWheel();
        });
    }
  
  
  function initWheel(){
    // console.log(document.getElementById('cnvWheel'));
    hcLuckywheel.init({
        id: "luckywheel",
        config: function(callback) {
            callback &&
            callback(prizes);
        },
        mode : "both",
        getPrize: function(callback) {
            var rand = randomIndex(prizes);
            var chances = rand;
            callback && callback([rand, chances]);
        },
        gotBack: function(data) {
            console.log(data);
            if(data == null){
                console.log('Chương trình kết thúc');
            } else if (data == 'Chúc bạn may mắn lần sau'){
                console.log('Bạn không trúng thưởng');
            } else{
                console.log('Bạn đã trúng giải');
            }
        }
        });
  } 
  
  function randomIndex(prizes){
    if(isPercentage){
        var counter = 1;
        for (let i = 0; i < prizes.length; i++) {
        if(prizes[i].number == 0){
            counter++
        }
        }
        if(counter == prizes.length){
        return null
        }
        let rand = Math.random();
        let prizeIndex = null;
  
        switch (true) {
        case rand < prizes[4].percentpage:
            prizeIndex = 4 ;
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
        case rand < prizes[4].percentpage + prizes[3].percentpage + prizes[2].percentpage + prizes[1].percentpage  + prizes[0].percentpage:
            prizeIndex = 0;
            break;  
        }
        if(prizes[prizeIndex].number != 0){
        prizes[prizeIndex].number = prizes[prizeIndex].number - 1
        return prizeIndex
        }else{
        return randomIndex(prizes)
        }
    }else{
        var counter = 0;
        for (let i = 0; i < prizes.length; i++) {
        if(prizes[i].number == 0){
            counter++
        }
        }
        if(counter == prizes.length){
        return null
        }
        var rand = (Math.random() * (prizes.length)) >>> 0;
        if(prizes[rand].number != 0){
        prizes[rand].number = prizes[rand].number - 1
        return rand
        }else{
        return randomIndex(prizes)
        }
    }
  }
  
  
    clearInterval(w_is_ready);
  }, 400)
  
  
  
  