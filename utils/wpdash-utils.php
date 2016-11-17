<?php

  function check_requirements_dashboards()
  {
    return function_exists('wpckan_get_ckan_domain') && function_exists('wpckan_validate_settings_read') && wpckan_validate_settings_read();
  }

  function get_ckan_datastore() 
  {

  	$resource_id = $_POST['resource_id'];

  	$result = wpckan_get_datastore_resource(wpckan_get_ckan_domain(), $resource_id);

  	header('Content-Type: application/json;charset=UTF-8');
  	echo json_encode($result);

  	die();

  }

  add_action( 'wp_ajax_ckan_datastore', 'get_ckan_datastore' );
  add_action( 'wp_ajax_nopriv_ckan_datastore', 'get_ckan_datastore' );

  function get_ckan_datastore_filter()
  {
  	$resource_id = $_POST['resource_id'];
  	$filter_key = $_POST['filter_key'];
  	$filter_value = $_POST['filter_value'];

  	$result = wpckan_get_datastore_resources_filter(wpckan_get_ckan_domain(), $resource_id, $filter_key, $filter_value);

  	header('Content-Type: application/json;charset=UTF-8');
  	echo json_encode($result);

  	die();
  }

  add_action( 'wp_ajax_ckan_datastore_filter', 'get_ckan_datastore_filter' );
  add_action( 'wp_ajax_nopriv_ckan_datastore_filter', 'get_ckan_datastore_filter' );
  

?>
