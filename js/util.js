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
  var region_name = jQuery('#region_name_wrapper');
  var stickyNavTop = viz_nav.offset().top;
  var regionNameTop = region_name.offset().top;
  var stickyNav = function(){
    // Navigation
    var NavscrollTop = jQuery(window).scrollTop() + jQuery('#od-selector').height() + region_name.height();
    if (NavscrollTop > stickyNavTop) {
        viz_nav.addClass('sticky');
    } else {
        viz_nav.removeClass('sticky');
    }

    //Region Name
    var RegionscrollTop = jQuery(window).scrollTop() + jQuery('#od-selector').height();
    if (RegionscrollTop > regionNameTop) {
      region_name.addClass('sticky');
      jQuery('#back_to_map').show();
    } else {
      region_name.removeClass('sticky');
      jQuery('#back_to_map').hide();
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


  jQuery(document).on('click', '.data_source_btn', function(e){
    e.preventDefault();
    var target = jQuery(this).data('target');
    jQuery('#'+target).slideToggle();
  });
  
});
