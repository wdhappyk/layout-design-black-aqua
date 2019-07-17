/*
 * Replace all SVG images with inline SVG
 */
$('img.svg').each(function() {
    var $img = $(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');

        // Add replaced image ID to the new SVG
        if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image classes to the new SVG
        if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
        }

        // Replace image with new SVG
        $img.replaceWith($svg);

    }, 'xml');
});

$('.carousel__items:not(.project-list)').slick({
    slidesToShow: 1,
    infinite: true,
    variableWidth: true,
    responsive: [
        {
            breakpoint: 630,
            settings: {
                slidesToShow: 2,
                variableWidth: false,
            }
        }
    ]
});

$('.banners:parent').slick({
    slidesToShow: 1,
    infinite: true,
    variableWidth: false,
    arrows: true
});

$('.projector').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    centerMode: true,
    asNavFor: '.project-list',
    infinite: false
});
$('.project-list').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.projector',
    dots: false,
    focusOnSelect: true,
    // variableWidth: true,
    infinite: false,
    // centerMode: true,
    arrows: false,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 1090,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 380,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

// $('.slider-for').slick({
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     fade: true,
//     asNavFor: '.slider-nav'
// });
// $('.slider-nav').slick({
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     asNavFor: '.slider-for',
//     dots: true,
//     centerMode: true,
//     focusOnSelect: true
// });

// $('.carouselTODO').each(function() {
//     var $carousel = $(this);
//     var $left = $carousel.find('.carousel__arrow_left');
//     var $right = $carousel.find('.carousel__arrow_right');
//     var $items = $carousel.find('.carousel__item');
//     var size = 1;
//     var sizeList = JSON.parse($carousel.data('carousel-screen-size').replace(/'/g, '"'));
//     var n = 0;
//
//     var $window = $(window);
//
//     $window.on('resize', setSize);
//
//     $left.on('click', prev);
//     $right.on('click', next);
//
//     setSize();
//     show(0);
//
//     $carousel.swipe({
//         swipeStatus: function(event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection)
//         {
//             if (phase === 'end'){
//                 switch(direction) {
//                     case 'right':
//                         prev();
//                         break;
//                     case 'left':
//                         next();
//                         break;
//                     default:
//                 }
//             }
//         },
//         triggerOnTouchEnd: false,
//         threshold: 50
//     });
//
//     function show(from) {
//         var to = from + size;
//
//         if (to > $items.length - 1) next();
//
//         $items.each(function(i) {
//             if (i >= from && i < to) {
//                 $($items.get(i)).show();
//             } else {
//                 $($items.get(i)).hide();
//             }
//         });
//     }
//
//     function next() {
//         var max = $items.length - size;
//
//         if (n === max) return;
//
//         n++;
//
//         if (n > max) n = max;
//
//         show(n);
//     }
//
//     function prev() {
//         if (n === 0) return;
//
//         n--;
//
//         if (n < 0) n = 0;
//
//         show(n);
//     }
//
//     function setSize() {
//         var windowWidth = $window.width();
//         var maxSize = 1;
//
//         $.each(sizeList, function(breakpoint, newSize) {
//             breakpoint = parseInt(breakpoint);
//             newSize = parseInt(newSize);
//
//             if (windowWidth >= breakpoint && newSize > maxSize) {
//                 maxSize = newSize;
//             }
//         });
//
//         if (size !== maxSize) {
//             size = maxSize;
//             show(n);
//         }
//     }
// });

var SideMenu = function (baseClass) {
    var $body = $(document.body);
    var $menu = $('#' + baseClass);
    var $box = $menu.parent();
    var $btnOpen = $('#' + baseClass + '-open');
    var $btnClose = $('#' + baseClass + '-close');

    $btnOpen.on('click', open);
    $btnClose.on('click', close);
    $box.on('click', close);

    $menu.on('click', function(e) {
        e.stopPropagation();
    });

    function open(e) {
        if (e !== undefined) e.preventDefault();
        $menu.addClass(baseClass + '_active');
        $box.addClass(baseClass + '-box_active');
        $body.addClass('overflow-hidden');
    }

    function close(e) {
        if (e !== undefined) e.preventDefault();
        $menu.removeClass(baseClass + '_active');
        $box.removeClass(baseClass + '-box_active');
        $body.removeClass('overflow-hidden');
    }

};

var leftMenu = SideMenu('left-menu');
var filter = SideMenu('filter');
var catalog = SideMenu('catalog');

$('.collapse-card__head').on('click', function (event) {
    event.preventDefault();
    $(this).next().collapse('toggle');
});

$('.collapse[data-arrow]')
    .on('show.bs.collapse', function() {
        $('#' + $(this).data('arrow'))
            .removeClass('icon-arrow-down')
            .addClass('icon-arrow-up');

    }).on('hide.bs.collapse', function() {
        $('#' + $(this).data('arrow'))
            .removeClass('icon-arrow-up')
            .addClass('icon-arrow-down');
    });

$('.photos').magnificPopup({
    delegate: 'a.photo_pop-up',
    type: 'image',
    gallery: {
        enabled: true
    }
});

$('.collapse[data-btn-more-photo]')
    .on('show.bs.collapse', function() {
        $($(this).data('btn-more-photo'))
            .text('Меньше фото');
    })
    .on('hide.bs.collapse', function() {
        $($(this).data('btn-more-photo'))
            .text('Больше фото');
    });

