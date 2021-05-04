<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Admin</title>

    <link rel="stylesheet" href="{{ asset('vendor/bootstrap/dist/css/bootstrap.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/metismenu/dist/metisMenu.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/switchery-npm/index.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/admin/css/common/main.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/admin/css/layouts/vertical/core/main.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/admin/css/layouts/vertical/menu-type/default.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/admin/css/layouts/vertical/themes/theme-cnv.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/fontawesome/css/fontawesome-all.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/admin/css/helpers.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/flag-icon-css/css/flag-icon.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/jquery.tagsinput/tagsinput.css') }}">
</head>

<body>
    <div id="app">
        @include('layouts.sidebar')

        <div class="content-wrapper">
            @include('layouts.navbar')

            <div class="content container">
                <div class="page-content container-fluid">
                    <div id="root"></div>
                </div>

                <div class="content-footer"></div>
            </div>
        </div>
    </div>

    <script src="{{ asset('vendor/modernizr/modernizr.custom.js') }}"></script>
    <script src="{{ asset('vendor/jquery/dist/jquery.min.js') }}"></script>
    <script src="{{ asset('vendor/bootstrap/dist/js/bootstrap.bundle.min.js') }}"></script>
    {{-- <script src="{{ asset('vendor/pace/pace.js') }}"></script>--}}
    <script src="{{ asset('vendor/metismenu/dist/metisMenu.js') }}"></script>
    <script src="{{ asset('vendor/switchery-npm/index.js') }}"></script>
    <script src="{{ asset('vendor/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js') }}"></script>
    <script src="{{ asset('vendor/jquery.tagsinput/tagsinput.js') }}"></script>
    <script src="{{ asset('vendor/admin/js/global/app.js') }}"></script>
    <script src="{{ asset('vendor/admin/js/system/app.js') }}"></script>

    <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>