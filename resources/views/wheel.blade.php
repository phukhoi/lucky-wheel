<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="UTF-8">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <!-- Standardised web app manifest -->
    <link rel="manifest" href="appmanifest.json">

    <!-- Allow fullscreen mode on iOS devices. (These are Apple specific meta tags.) -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <link rel="apple-touch-icon" sizes="256x256" href="icon-256.png">
    <meta name="HandheldFriendly" content="true">

    <!-- Chrome for Android web app tags -->
    <meta name="mobile-web-app-capable" content="yes">
    <link rel="shortcut icon" sizes="256x256" href="icon-256.png">
    <title>Wheel</title>
</head>

<body>

    <script src="https://game-platform-staging.cnvloyalty.com/js/game/1001.js"></script>
</body>

</html>