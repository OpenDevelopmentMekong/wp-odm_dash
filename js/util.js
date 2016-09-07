/* Credit - https://css-tricks.com/snippets/jquery/smooth-scrolling/ */
jQuery(function() {

  jQuery('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = jQuery(this.hash);
      target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        jQuery('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  //Sticky Navigation
  var viz_nav = jQuery('#viz_nav_wrapper');
  var stickyNavTop = viz_nav.offset().top;
  var stickyNav = function(){
    var scrollTop = jQuery(window).scrollTop() + jQuery('#od-selector').height();
    if (scrollTop > stickyNavTop) {
        viz_nav.addClass('sticky');
    } else {
        viz_nav.removeClass('sticky');
    }
  };

  stickyNav();

  jQuery(window).scroll(function() {
    stickyNav();
  });

  jQuery('#dash_map_wrapper').click(function () {
      jQuery('#mymap').css("pointer-events", "auto");
  });

  jQuery( "#dash_map_wrapper" ).mouseleave(function() {
    jQuery('#mymap').css("pointer-events", "none"); 
  });

});
