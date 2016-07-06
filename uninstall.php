<?php

 if ( !defined( 'WP_UNINSTALL_PLUGIN' ) )
  exit;

 if ( $GLOBALS['options']->get_option( 'wpdash_setting_1' ) != false ) {
  delete_option( 'wpdash_setting_1' );
  delete_site_option( 'wpdash_setting_1' );
 }


?>
