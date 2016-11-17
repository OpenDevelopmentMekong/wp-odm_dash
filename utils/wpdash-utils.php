<?php

  function check_requirements_dashboards()
  {
    return function_exists('wpckan_get_ckan_domain') && function_exists('wpckan_validate_settings_read') && wpckan_validate_settings_read();
  }

?>
