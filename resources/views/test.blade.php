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

        <script src="{{ asset('js/app.js') }}"></script>

{{--        <script src="http://bloomieboutique.com/game/1001.js"></script>--}}
    </body>
</html>