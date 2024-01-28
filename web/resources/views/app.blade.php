<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ app(\App\Settings\GeneralSettings::class)->siteName }}</title>
    {{--    <title>{{ app(\App\Settings\GeneralSettings::class)->siteName }}</title>--}}

    <link rel="manifest" href="/manifest.json"/>
    <!--  Favicon  -->
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
    <link rel="icon" href="/favicon.ico"/>
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
    <!--  Fonts  -->
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com"/>
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"/>
    {{--    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400&display=swap"/>--}}
    {{--    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700&display=swap"/>--}}
    <!--  Vendors  -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"/>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800;900&display=swap"
          rel="stylesheet">


    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
    <style>
        * {
            box-sizing: border-box;
        }

        * {
            font-family: 'Montserrat', sans-serif;
        }

        body {
            display: flex;
            flex-flow: column nowrap;
            max-width: 100vw;
            overflow-x: hidden;
        }

        #app {
            max-width: 100vw;
            overflow-x: hidden;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex: 1 1 auto;
            -ms-flex: 1 1 auto;
            flex: 1 1 auto;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
            height: 100%;
        }

        a, a:visited {
            color: inherit;
            text-decoration: none;
        }
    </style>
</head>
<body class="" style="min-height: 100vh; height: 100%;">
<noscript>You need to enable JavaScript to run this app.</noscript>

</body>
</html>
