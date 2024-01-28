<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    


    <link rel="manifest" href="/manifest.json"/>
    <!--  Favicon  -->
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
    <link rel="icon" href="/favicon.ico"/>
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"/>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800;900&display=swap"
          rel="stylesheet">

    <?php echo app('Illuminate\Foundation\Vite')->reactRefresh(); ?>
    <?php echo app('Illuminate\Foundation\Vite')(['resources/js/app.jsx']); ?>

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
<body>
<div id="root"></div>
<script>
    window.routes = <?php echo json_encode((new \Tightenco\Ziggy\Ziggy())->toArray()); ?>;
</script>

</body>
</html>
<?php /**PATH /var/www/html/resources/views/main.blade.php ENDPATH**/ ?>