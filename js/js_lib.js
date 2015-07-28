/*=============================================================================================	
 Document   : Javascript Plugin Lib
 Author     : Rizki Nida Chaerulsyah - akuiki.net
 ==============================================================================================*/

$.fn.obla_slider = function (s) {
    var
            elem = this,
            wrapper = '',
            t = {},
            act = {};
    t.type = 'fade';
    t.intervalTime = 4;
    t.animDuration = 0.5;
    t.navPager = null;
    t.navDirection = null;
    t.randomStart = false;
    t.pauseOnFocus = false;
    t.zoomOnPause = true;
    t.zoomElement = 'img';
    t.index_slide = 0;
    t.slides_count = elem.children('.slide').length;
    t.interval = null;
    t.intervalStatus = 'play';
    t.ease = 'Linear.easeOut';
    t.afterSlide = function () {
    };
    t.beforeSlide = function () {
    };

    s = $.extend(t, s);

    s.intervalTime = parseFloat(s.intervalTime);
    s.animDuration = parseFloat(s.animDuration);


    act.init = function () {
        if (s.randomStart)
            s.index_slide = Math.floor((Math.random() * (s.slides_count - 1)) + 1);
        //init html    
        elem.wrap("<div class='obla_slider'></div>");
        elem.addClass('viewport');
        elem = elem.parent('.obla_slider');
        elem.find('.slide:eq(' + s.index_slide + ')').addClass('active');


        TweenLite.set(elem.find('.slide'), {
            zIndex: 0,
            opacity: 0
        });

        //---

        //init pause on focus
        if (s.pauseOnFocus) {
            elem.mouseenter(function () {
                elem.addClass('tweening');
            });
            elem.mouseleave(function () {
                elem.removeClass('tweening');
            });
        }
        //---

        act.navDirectionInit(); //init nav direction
        act.navPagerInit();//ini nav pager



        $(window).load(function () {
            var wrap_height = (elem.find('.slide').height() > 0) ? elem.find('.slide').height() : elem.find('.slide img').height();
            TweenLite.set(elem, {height: wrap_height});
            TweenLite.set(elem.find('.viewport'), {height: wrap_height});
            TweenLite.set(elem.find('.slide'), {width: elem.width(), height: wrap_height});

            wrap_height = (elem.find('.slide').height() > 0) ? elem.find('.slide').height() : elem.find('.slide img').height();
            TweenLite.set(elem, {height: wrap_height});
            TweenLite.set(elem.find('.viewport'), {height: wrap_height});
            TweenLite.set(elem.find('.slide'), {width: elem.width(), height: wrap_height});

            act.intervalInit(); //init interval looping slide
            if (s.type === "fade")
                act.zoomOnPause(elem.find('.slide.active'), 'start');//effect zoom when pause

            TweenLite.to(elem.find('.slide:eq(' + s.index_slide + ')'), 0.2, {
                zIndex: 2,
                opacity: 1
            });

        });

    };

    act.navDirectionInit = function () {
        if (s.navDirection === null) {
            elem.append("<div class='obla_navDirection'><a href='' class='prev'>prev</a><a href='' class='next'>next</a></div>");
        }
        elem.on('click', '.next', function (e) {
            e.preventDefault();
            act.slideAnim(s.type, 'next');
        });
        elem.on('click', '.prev', function (e) {
            e.preventDefault();
            act.slideAnim(s.type, 'prev');
        });
    };

    act.navPagerInit = function () {
        if (s.navPager === null) {
            elem.append("<div class='obla_navPager'></div>");
            var pager = elem.find(".obla_navPager");
            for (var i = 0; i < s.slides_count; i++) {
                pager.append("<a href='' data-index='" + i + "'>" + (i + 1) + "</a>")
            }
            pager.children("a[data-index=" + elem.find('.slide.active').index() + "]").addClass('active');
        }

        pager.on('click', 'a', function (e) {
            e.preventDefault();

            var
                    d_index = parseInt($(this).attr('data-index')),
                    c_index = act.getIndex();

            if (d_index !== c_index)
                if (c_index.current_index < d_index)
                    act.slideAnim(s.type, 'next', d_index);
                else
                    act.slideAnim(s.type, 'prev', d_index);
        });

    };

    act.intervalInit = function () {
        s.interval = setInterval(function () {
            if (s.intervalStatus === "play") {
                act.slideAnim(s.type, 'next');
            }
        }, (s.intervalTime + s.animDuration) * 1000);
    };

    act.clearInterval = function () {
        window.clearInterval(s.interval);
    };

    act.getIndex = function () {
        var index = {};
        index.current_index = elem.find('.slide.active').index();
        index.prev_index = (index.current_index === 0) ? (s.slides_count - 1) : (index.current_index - 1);
        index.next_index = ((s.slides_count - 1) === index.current_index) ? 0 : (index.current_index + 1);
        return index;
    };

    act.zoomOnPause = function (e, w) {
        var e_zoom = e.find(s.zoomElement);
        if (s.zoomOnPause) {
            TweenLite.killTweensOf(e);
            TweenLite.set(e_zoom, {scale: 1});

            var delay = (w === "start") ? 0 : s.animDuration / 2;
            TweenLite.to(e_zoom, s.intervalTime + (s.animDuration * 3), {
                scale: 1.08,
                ease: Linear.easeNone,
                delay: delay
            });
        }
    };

    act.slideAnim = function (type, direction, d_index) {
        var
                index = act.getIndex(),
                c_elem = elem.find('.slide:eq(' + index.current_index + ')'),
                n_elem = elem.find('.slide:eq(' + index.next_index + ')'),
                p_elem = elem.find('.slide:eq(' + index.prev_index + ')');

        if (d_index !== undefined) {
            n_elem = elem.find('.slide:eq(' + d_index + ')');
            p_elem = elem.find('.slide:eq(' + d_index + ')');
        }
//        console.log(d_index);

        onComplete = function () {
            c_elem.removeClass('active');
            TweenLite.set(c_elem, {zIndex: 0});
            if (direction === 'prev') {
                p_elem.addClass('active');
                TweenLite.set(p_elem, {zIndex: 2});
            } else if (direction === 'next') {
                n_elem.addClass('active');
                TweenLite.set(n_elem, {zIndex: 2});
            }

        };

        if (!elem.hasClass('tweening')) {

            elem.find(".obla_navPager a").removeClass('active');
            elem.find(".obla_navPager a[data-index=" + n_elem.index() + "]").addClass('active');

            s.beforeSlide(c_elem, n_elem, p_elem, index); //callback before slide

            act.clearInterval();
            elem.addClass('tweening');
            setTimeout(function () {
                elem.removeClass('tweening');
                act.intervalInit();
            }, s.animDuration * 1000);
            switch (type) {
                case "fade":
                    act.zoomOnPause(n_elem, 'switch');
                    if (direction === "next") {

                        TweenLite.set(n_elem, {zIndex: 1, opacity: 1, });
                        TweenLite.to(c_elem, s.animDuration, {
                            opacity: 0,
                            ease: s.ease,
                            onComplete: function () {
                                onComplete();
                                s.afterSlide(c_elem, n_elem, p_elem, index); //callback
                            }
                        });
                    } else if (direction === "prev") {

                        TweenLite.set(p_elem, {zIndex: 1, opacity: 1});
                        TweenLite.to(c_elem, s.animDuration, {
                            opacity: 0,
                            ease: s.ease,
                            onComplete: function () {
                                onComplete();
                                s.afterSlide(c_elem, n_elem, p_elem, index); //callback
                            }
                        });
                    }

                    break;

                case "slideX":
                    if (direction === "next") {
                        TweenLite.set(n_elem, {zIndex: 1, opacity: 1, left: '-100%'});
                        TweenLite.to(n_elem, s.animDuration, {
                            left: 0,
                            ease: s.ease
                        });
                        TweenLite.to(c_elem, s.animDuration, {
                            left: '100%',
                            ease: s.ease,
                            onComplete: function () {
                                onComplete();
                                TweenLite.set(c_elem, {left: 0});
                                s.afterSlide(c_elem, n_elem, p_elem, index); //callback
                            }
                        });
                    } else if (direction === "prev") {
                        TweenLite.set(p_elem, {zIndex: 1, opacity: 1, left: '100%'});
                        TweenLite.to(p_elem, s.animDuration, {
                            left: 0,
                            ease: s.ease
                        });
                        TweenLite.to(c_elem, s.animDuration, {
                            left: '-100%',
                            ease: s.ease,
                            onComplete: function () {
                                onComplete();
                                TweenLite.set(c_elem, {left: 0});
                                s.afterSlide(c_elem, n_elem, p_elem, index); //callback
                            }
                        });

                    }
                    break;

                case "slideY":
                    if (direction === "next") {
                        console.log(c_elem.height());
                        TweenLite.set(n_elem, {zIndex: 1, opacity: 1, top: "-" + n_elem.height() + "px"});
                        TweenLite.to(n_elem, s.animDuration, {
                            top: 0,
                            ease: s.ease
                        });
                        TweenLite.to(c_elem, s.animDuration, {
                            top: c_elem.height() + "px",
                            ease: s.ease,
                            onComplete: function () {
                                onComplete();
                                TweenLite.set(c_elem, {top: 0});
                                s.afterSlide(c_elem, n_elem, p_elem, index); //callback
                            }
                        });
                    } else if (direction === "prev") {
                        TweenLite.set(p_elem, {zIndex: 1, opacity: 1, top: n_elem.height() + "px"});
                        TweenLite.to(p_elem, s.animDuration, {
                            top: 0,
                            ease: s.ease
                        });
                        TweenLite.to(c_elem, s.animDuration, {
                            top: "-" + c_elem.height() + "px",
                            ease: s.ease,
                            onComplete: function () {
                                onComplete();
                                TweenLite.set(c_elem, {top: 0});
                                s.afterSlide(c_elem, n_elem, p_elem, index); //callback
                            }
                        });

                    }

                    break;

            }
        }
    };
    return act.init();
};