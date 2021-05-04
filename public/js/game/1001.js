window.cnvwidget = {
    appId: '363772567412181',
    pageId: '103515201811807',
};

function insertScript(url) {
    var a = document.createElement('script');
    a.async = 1;
    if (url) {
        a.src = url;
    }
    document.head.appendChild(a);
}

// insertScript('http://bloomieboutique.com/js/spinner.js?');
insertScript('http://game-platform.test/js/spinner.js?');

var isPercentage = true;
var prizes = [
        {
        text: "Áo thun 0",
        img: "https://i.pinimg.com/originals/6f/5d/f7/6f5df76e5753e152aea0d39d9978d6b6.jpg",
        number: 1, // 1%,
        percentpage: 0.01 // 1%
        },
        {
        text: "Nón 1",
        img: "https://i.pinimg.com/originals/6f/5d/f7/6f5df76e5753e152aea0d39d9978d6b6.jpg",
        number: 1,
        percentpage: 0.05 // 5%
        },
        {
        text: "Vòng Tay 2",
        img: "https://i.pinimg.com/originals/6f/5d/f7/6f5df76e5753e152aea0d39d9978d6b6.jpg",
        number : 1,
        percentpage: 0.1 // 10%
        },
        {
        text: " Security 3",
        img: "https://i.pinimg.com/originals/6f/5d/f7/6f5df76e5753e152aea0d39d9978d6b6.jpg",
        number: 1,
        percentpage: 0.24 // 24%
        },
        {
        text: "Chúc bạn may mắn lần sau 4",
        img: "https://i.pinimg.com/originals/6f/5d/f7/6f5df76e5753e152aea0d39d9978d6b6.jpg",
        percentpage: 0.6 // 60%
        },
        {
        text: "Chúc bạn may mắn lần sau 5",
        img: "https://i.pinimg.com/originals/6f/5d/f7/6f5df76e5753e152aea0d39d9978d6b6.jpg",
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



