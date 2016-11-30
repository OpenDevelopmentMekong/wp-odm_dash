<?php

  function check_requirements_dashboards()
  {
    return function_exists('wpckan_get_ckan_domain') && function_exists('wpckan_validate_settings_read') && wpckan_validate_settings_read();
  }
  
  function get_dataviz_shortcode_template($template_url, $post, $atts) {

    ob_start();
    require $template_url;
    $output = ob_get_contents();
    ob_end_clean();
    return $output;

  }

?>
