var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
$(document).ready(function($) {
  $('.qtybox .btnqty').on('click', function(){
    var qty = parseInt($(this).parent('.qtybox').find('.quantity-input').val());
    if($(this).hasClass('qtyplus')) {
      qty++;
    }else {
      if(qty > 1) {
        qty--;
      }
    }
    qty = (isNaN(qty))?1:qty;
    $(this).parent('.qtybox').find('.quantity-input').val(qty);
  }); 
  
  var hc_append_height_old = $('.hc-append').height()
  var hc_append_height = $('nav.shop_menu').height() - $('.cart_bottom').height();
  if(hc_append_height_old > hc_append_height) {
    $('.hc-append').height(hc_append_height);
    $('.hc-append').css({'overflow':'auto', 'padding-right':'10px'});
  }
  
  var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  var deviceHeight = (window.innerHeight > 0) ? window.innerHeight : screen.height;

  var content_area_height =  $('.content_area div').height();

  if (content_area_height < deviceHeight ){
    paddingTop = (deviceHeight - content_area_height)/2;
    if (paddingTop > 130) {
      paddingTop = paddingTop - 130;
    }
    $('.content_area > div').css({"padding-top":paddingTop+"px"});
  }

  if (iOS) {
    if (deviceWidth < 992 ){
      $("#CartCount").css({"top":"7px"});
      $("#CartCount").css({"right":"4px"});
      $(".l-right svg.show_open").css({"width":"23px"});
    }
  }
if (deviceWidth < 575 ){
  $('#stories #fullpage section, .template-article #fullpage1 section, .template-product #fullpage1 section, .template-index #fullpage section, .template-index #fullpage1 section').each(function (index, value){
      //console.log(index);
      //console.log($(value).attr('data-section'));
      if($(value).attr('data-section') == "two-image") {
        $(value).find('.section1_imgl').each(function (i, v){
          var element_bgimage = $(v);
          //if( !$(v).hasClass('d-none') ){
            var mobile_url = element_bgimage.attr('data-mobile-url');
            if(typeof mobile_url !== undefined && mobile_url !== false && mobile_url != undefined) {
              element_bgimage.attr('data-bg', mobile_url);
              element_bgimage.css({"background-image": "url('"+mobile_url+"')"});
            }
          //}
        });
      } else if($(value).attr('data-section') == "video") {
        var element_bgimage = $(value).find('.vimeo-wrapper');
        var mobile_url = element_bgimage.attr('data-mobile-url');
        if(typeof mobile_url !== undefined && mobile_url !== false && mobile_url != undefined) {
          element_bgimage.attr('data-bg', mobile_url);
          element_bgimage.css({"background-image": "url('"+mobile_url+"')"});
        }
      } else {
        var element_bgimage = $(value);
        var mobile_url = element_bgimage.attr('data-mobile-url');
        if(typeof mobile_url !== undefined && mobile_url !== false && mobile_url != undefined) {
          element_bgimage.attr('data-bg', mobile_url);
          element_bgimage.css({"background-image": "url('"+mobile_url+"')"});
        }
      }
      // console.log(mobile_url);
      // if(typeof mobile_url !== undefined && mobile_url !== false && mobile_url != undefined) {
      //   console.log('inside condition');
      //   element_bgimage.css({"background-image": "url('"+mobile_url+"')"});
      // }
  });
}

jQuery('.dot_img').each(function( index ) {
  var data_src = $( this ).attr('data-src');
  console.log(data_src);
  if(deviceWidth > 575 ) {
    console.log(data_src.replace("_6", "_10"));
    new_data_src = data_src.replace("_6", "_10");
    jQuery( this ).attr('data-src', new_data_src);
    jQuery( this ).attr('src', new_data_src);
  }
});
  // fullpage customization
  if ($('#fullpage').length) {
    $('#fullpage').fullpage({
      //sectionsColor: ['#000000', '#000000', '#000000', '#000000', '#000000'],
      //sectionsColor: ['#686868', '#f5f5f5', '#686868', '#686868', '#f5f5f5', '#686868', '#686868', '#686868', '#686868'],
      sectionSelector: '.vertical-scrolling',
      slideSelector: '.container-fluid',
      navigation: true,
      slidesNavigation: true,
      controlArrows: false,
      scrollOverflow:false,
      anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection', 'sixthSection', 'seventhSection','eighthSection','ninethSection', 'thenthSection','elevenSection','twelfthSection'],
      menu: '#menu',
    });
  }
  
  $("#vl-overlay").click(function(event) {
    $('.header-top').removeClass('shop-menu');
    $('.header-top').removeClass('open-menu');
    $('.header-top').removeClass('open-searchbar');
    toggleScrollAndOverlay();
  });

  $('.menu_middle').on('click', function() {
    $('.header-top').toggleClass('open-menu');
    $('.header-top').removeClass('shop-menu');
    $('.header-top').removeClass('open-searchbar');
    toggleScrollAndOverlay();
  });

  $('.show_open').click(function(event) {
    $('.header-top').toggleClass('shop-menu');
    $('.header-top').removeClass('open-menu');
    $('.header-top').removeClass('open-searchbar');
    toggleScrollAndOverlay();
    $(window).scrollTop(0);
  });

  $('.search').click(function(event) {
    $('.header-top').addClass('open-searchbar');
    $('.header-top').removeClass('shop-menu');
    $('.header-top').removeClass('open-menu');
    toggleScrollAndOverlay();
  });

  $(".search-close").click(function(event) {
    $('.header-top').removeClass('open-searchbar');
    $('.header-top').removeClass('shop-menu');
    $('.header-top').removeClass('open-menu');
    toggleScrollAndOverlay();
  });

  function toggleScrollAndOverlay() {
    if(!$('body').hasClass('template-index') && !$('body').hasClass('template-blog')) {
      if($('.header-top').hasClass('open-menu') || $('.header-top').hasClass('shop-menu') || $('.header-top').hasClass('open-searchbar')) {
        $('body').css({"overflow":"hidden"});
      }else{
        $('body').css({"overflow":"auto"});
      }
    }
    if($('.header-top').hasClass('open-menu') || $('.header-top').hasClass('shop-menu') || $('.header-top').hasClass('open-searchbar')) {
      $("#vl-overlay").css("opacity", "0.7");
      $("#vl-overlay").fadeIn();
    }else{
      $("#vl-overlay").css("opacity", "0");
      $("#vl-overlay").fadeOut();
    }    
  }

  AOS.init({
    easing: 'ease-out-back',
    duration: 1000,
    once: true
  });

  /* for text hover change image on menu*/
  $("ul#menu a").hover(function() {
    $("#pic").removeClass().addClass($(this).attr('rel'));
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 36) {
      $('.header-top').addClass('stuck');
      $('.james').hide();
      $('.ays').show();
      // $('.l-left svg').attr("viewBox", "0 0 320 68.4"); 
    } else {
      $('.header-top').removeClass('stuck');
      //if($('body#store-locator').length || $('body.template-index').length){
      // if($('body#store-locator').length){
      //   $('.header-top').css({"background-color":"#ffffff"});
      // } else {
      //   $('.header-top').css({"background-color":"transparent"});
      // }
      $('.james').show();
      $('.ays').hide();
      // $('.l-left svg').attr("viewBox", "0 0 575 68.4");
    }
    if ( deviceWidth > 991 ) {
      $('.stuck').css({"top":"0px"});
    } else {
      $('.stuck').css({"top":"0px"});
      //$('.james').hide();
      //$('.ays').show();      
    }    
  });

  if ($('form[name="searchform"]').length) {
    document.forms['searchform'].elements['q'].focus();
  }

	$("#jamesay").click(function() {
      $('html, body').animate({scrollTop: $("#jamesay-data").offset().top-200}, 2000);
  });
  $("#customerservice").click(function() {
      $('html, body').animate({scrollTop: $("#customerservice-data").offset().top-200}, 2000);
  });
  $("#ambassador").click(function() {
      $('html, body').animate({scrollTop: $("#ambassador-data").offset().top-200}, 2000);
  });
  $("#press").click(function() {
      $('html, body').animate({scrollTop: $("#press-data").offset().top-200}, 2000);
  });

  // $(window).scroll(function() {
  //   if ($(this).scrollTop() >= 50) {
  //     $('#return-to-top').fadeIn(200);
  //   } else {
  //     $('#return-to-top').fadeOut(200);
  //   }
  // });
  // $('#return-to-top').click(function() {
  //   $('body,html').animate({
  //     scrollTop : 0
  //   }, 500);
  // });
  $(".tab_title").click(function() {
    if($(this).attr('aria-expanded') == "true") {
      $(this).find('span i:nth-child(2)').show();
    } else {
      $(this).find('span i:nth-child(2)').hide();
    }
  });
});

// $(window).on('load', function() {
//   AOS.refresh();
// });