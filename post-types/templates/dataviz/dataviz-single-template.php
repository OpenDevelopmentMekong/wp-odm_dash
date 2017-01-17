<?php

$post_id = $post->ID;

$resource_url = get_post_meta($post_id, '_ckan_resource_url', true);

//For backward compatibility
if(empty($resource_url)) {
	$resource_id = get_post_meta($post_id, '_ckan_resource_id', true);
	$download_link = get_post_meta($post_id, '_ckan_resource_download_link', true);
} else {
	$explode_by_dataset = explode('/dataset/', $resource_url );
	$explode_by_resource = explode('/resource/', $explode_by_dataset[1]);

	$resource_id = $explode_by_resource[1];
	$download_link = site_url('/dataset/?id='.$explode_by_resource[0]);

}

$resource_filter = get_post_meta($post_id, '_ckan_resource_filter', true);
$viz_type = get_post_meta($post_id, '_viz_type', true);
$viz_options = odm_language_manager()->get_current_language() !== "en" ? get_post_meta($post_id, '_viz_options_localization', true) : get_post_meta($post_id, '_viz_options', true);
$viz_field_ids = odm_language_manager()->get_current_language() !== "en" ? get_post_meta($post_id, '_viz_field_ids_localization', true) : get_post_meta($post_id, '_viz_field_ids', true);
$viz_columns = odm_language_manager()->get_current_language() !== "en" ? get_post_meta($post_id, '_viz_columns_localization', true) : get_post_meta($post_id, '_viz_columns', true);

if (isset($atts["width"])) {
	$viz_width = $atts["width"];
} else {
	$viz_width = get_post_meta($post_id, '_viz_width', true);
}

if (isset($atts["height"])) {
	$viz_height = $atts["height"];
} else {
	$viz_height = get_post_meta($post_id, '_viz_height', true);
}

?>

<div class="chart_wrapper" style="width:<?php echo $viz_width; ?>;">
	<?php if (is_single($post_id)): ?>
		<h2><?php echo $post->post_title; ?></h2>
	<?php else: ?>
		<h2><a href="<?php echo get_permalink($post_id); ?>"><?php echo $post->post_title; ?></a></h2>
	<?php endif ?>

	<?php
		if (isset($atts["hide_description"]) && filter_var($atts["hide_description"], FILTER_VALIDATE_BOOLEAN) === true) {
			echo "";
		} else {
			echo $post->post_content;
		}

		$data_source_table = (isset($atts["data_source_table"]) ? $atts["data_source_table"] : true);

	 ?>
	<div id="wpdash_dataviz_<?php echo $post_id; ?>" style="height:<?php echo $viz_height; ?>;"></div>
</div>

<script>
	var config = {
		resource : {
			id : '<?php echo $resource_id; ?>',
			download_link : '<?php echo $download_link; ?>',
			filters : JSON.stringify(<?php echo $resource_filter; ?>)
		},
		chart : {
			container_id : 'wpdash_dataviz_<?php echo $post_id; ?>',
			chart_type : '<?php echo $viz_type; ?>',
			chart_options : <?php echo $viz_options; ?>,
			columns : <?php echo $viz_columns; ?>,
			fields : <?php echo $viz_field_ids; ?>,
			data_source_table : <?php echo $data_source_table; ?>
		}
	}

	var chart_<?php echo $post_id; ?> = new ODChart(config);

	jQuery(document).ready(function(){
		google.charts.load('current', {'packages':['corechart', 'table', 'treemap']});
		google.charts.setOnLoadCallback(initChart<?php echo $post_id; ?>);
	});

	function initChart<?php echo $post_id; ?>()
	{
		chart_<?php echo $post_id; ?>.init();
	}

</script>
