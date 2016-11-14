jQuery(function(){

	jQuery(document).on('click', '.data_source_btn', function(e){
	  e.preventDefault();
	  var target = jQuery(this).data('target');
	  jQuery('#'+target).slideToggle();
	  var btn_text = $(this).find('.data_source_btn_text');
	  btn_text.text( 
	  	btn_text.text() == 'Show Data' ? 'Hide Data' : 'Show Data'
	  );
	});
	
});