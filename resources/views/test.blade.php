<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Admin</title>
    </head>

    <body>
        <div id="root"></div>

{{--        <div id="cnvWidget" class="modal">--}}
{{--            <div class="modal-content">--}}
{{--                <span class="cnv-md-close">&times;</span>--}}
{{--                <div class="wrapper typo" id="wrapper">--}}
{{--                    <section id="luckywheel" class="hc-luckywheel">--}}
{{--                        <div class="hc-luckywheel-container">--}}
{{--                            <canvas class="hc-luckywheel-canvas" width="500px" height="500px">Vòng Xoay May Mắn</canvas>--}}
{{--                        </div>--}}
{{--                        <a class="hc-luckywheel-btn" href="javascript:;">Xoay</a>--}}
{{--                    </section>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--        </div>--}}


<!-- Modal information -->
<!-- <div class="popup popup--info">
    <div class="popup-inner">
    <div class="popup-content">
        <div class="title">BẠN VUI LÒNG NHẬP THÔNG TIN ĐỂ BÊN MÌNH GỬI QUÀ NHÉ!</div>
        <form class="info-form" action="">
        <div class="form-group">
            <label class="form-label" for="Họ và tên">Họ và tên</label>
            <input type="text" class="form-control" name="name" data-name="Họ và tên" placeholder="Họ và tên" />
        </div>
        
        <div class="form-group">
            <label class="form-label" for="Số điện thoại">Số điện thoại</label>
            <input type="text" class="form-control" name="phone" data-name="Số điện thoại" placeholder="Số điện thoại" />
        </div>

        <button type="button" class="btn btn--info form-btn--info">
            XÁC NHẬN
        </button>
        </form>
        
        <p class="desc">Vui lòng nhập đúng thông tin để nhận quà</p>
    </div>
    </div>
</div> -->
<!-- End of Modal information -->

<!-- Modal Success -->
<!-- <div class="popup popup--success show">
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
</div> -->
<!-- End of Modal Success -->

        <script src="{{ asset('js/app.js') }}"></script>

{{--        <script src="http://bloomieboutique.com/game/1001.js"></script>--}}
    </body>
</html>