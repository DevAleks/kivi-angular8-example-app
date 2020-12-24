$(function(){
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1){
        $('.navbar-fixed-top').addClass("sticky");
      }
      else{
        $('.navbar-fixed-top').removeClass("sticky");
      }
    });	  
   
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1){
        $('.header').addClass("header--sticky");
      }
      else{
        $('.header').removeClass("header--sticky");
      }
    });	

    $("#nav-mobile #nav-mobile-panel-toggle").click(function(){
      $("#nav-mobile-body").slideToggle();
      $(this).toggleClass("active");
      $("body").toggleClass("nav-open");
    }); 

    $(".nav-menu__burgerbody").click(function(){
//      $(".nav-menu__burger, .nav-dropdown, .order-btn").toggleClass("active");
//      $("body").toggleClass("lock");
    });     

    $(function() {
      $.fn.scrollToTop = function() {
        $(this).hide().removeAttr("href");
        if ($(window).scrollTop() != "0") {
          $(this).fadeIn("slow")
        }
        var scrollDiv = $(this);
        $(window).scroll(function() {
          if ($(window).scrollTop() == "0") {
            $(scrollDiv).fadeOut("slow")
          } else {
            $(scrollDiv).fadeIn("slow")
          }
        });
        $(this).click(function() {
          $("html, body").animate({
            scrollTop: 0
          }, "slow")
        })
      }
    });

    $(function() {
      $("#go-top").scrollToTop();
    });

    $(function() {
      $(window).resize(function() {
        var width = $(window).outerWidth();
        if (width < 1025) {
          $("#go-top").addClass("go-top");
        } else {
          $("#go-top").removeClass("go-top");
        }
      });
      $(window).resize();
    });
    
});  
  