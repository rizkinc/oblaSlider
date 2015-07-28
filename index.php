<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Statict Template</title>
        <link rel="shortcut icon" type="images/x-icon" href="favicon.ico"/>
        <link rel="stylesheet" type="text/css" href="css/reset.css"/>	
        <link rel="stylesheet" type="text/css" href="css/style.css"/>
        <link rel="stylesheet" type="text/css" href="css/oblaSlider.css"/>

        <script type="text/javascript" src="js/jquery-1.11.2.min.js"></script>	
        <script type="text/javascript" src="js/TweenMax.min.js"></script>	
        <script type="text/javascript" src="js/oblaSlider.js"></script>
        <script type="text/javascript">
            $(document).ready(function () {
                $("#slider_1").obla_slider();
            });
        </script>

    </head>

    <body>
        <div class="container">
            <div class="title">
                <h2>Obla Slider</h2> 
                <nav>
                    <a href="#demo1">Demo 1</a>
                    <a href="#demo2">Demo 2</a>
                    <a href="#demo3">Demo 3</a>
                    <a href="#demo4">Demo 4</a>
                </nav>
            </div>

            <div class="wrap_slider">
                <ul id="slider_1">
                    <li class="slide"><img src="images/1.jpg" alt="" /></li>
                    <li class="slide"><img src="images/2.jpg" alt="" /></li>
                    <li class="slide"><img src="images/3.jpg" alt="" /></li>
                    <li class="slide"><img src="images/4.jpg" alt="" /></li>
                </ul>
            </div>

        </div>

    </body>
</html>