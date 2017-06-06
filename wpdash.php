<?php
/**
 * Plugin Name: ODM Dashboards
 * Plugin URI: http://github.com/OpenDevelopmentMekong/wpdash
 * Description: Internal wordpress plugin for exposing widgets with data visualizations.
 * Version: 2.1.5
 * Author: Alex Corbi (mail@lifeformapps.com)
 * Author URI: http://www.lifeformapps.com
 * License: GPLv3.
 */


// Require utils
require_once plugin_dir_path(__FILE__).'utils/wpdash-utils.php';
require_once plugin_dir_path(__FILE__).'utils/wpdash-ckan-utils.php';

// Require post types
require_once plugin_dir_path(__FILE__).'post-types/dashboards.php';
require_once plugin_dir_path(__FILE__).'post-types/datavizs.php';

include_once plugin_dir_path(__FILE__).'utils/wpdash-options.php';
include_once plugin_dir_path(__FILE__).'widgets/show-dataviz-widget.php';

$GLOBALS['wpdash_options'] = new Wpdash_Options();

if (!class_exists('Odm_Dashboards_Plugin')) {

    class Odm_Dashboards_Plugin
    {
        private static $instance;

        private static $post_type;

        public static function get_instance()
        {
            if (null == self::$instance) {
                self::$instance = new self();
            }

            if (null == self::$post_type) {
              self::$post_type = new Odm_Dashboards_Post_Type();
              self::$post_type = new Odm_DataViz_Post_Type();
            }

            return self::$instance;
        }

        private function __construct()
        {
            add_action('init', array($this, 'register_styles'));
            add_action('init', array($this, 'register_scripts'));
            add_action('admin_init', array(&$this, 'wpdash_admin_init'));
            add_action('admin_menu', array(&$this, 'wpdash_add_menu'));
            add_action('admin_notices', array($this, 'check_requirements'));
        }

        public function register_styles()
        {
            wp_enqueue_style('leaflet-search', plugin_dir_url(__FILE__).'bower_components/leaflet-search/dist/leaflet-search.min.css');
            wp_enqueue_style('wpdash-style',  plugin_dir_url(__FILE__).'css/wpdash-style.css');
        }

        public function register_scripts()
        {

            $i18n_params = array(
              'ckan_url' => wpckan_get_ckan_domain(),
              'config_error_msg' => __("There's something wrong with configuration.", 'wp-odm_dash'),
              'no_data_error' => __("No data records found.", 'wp-odm_dash'),
              'error_msg' => __("Error message :", 'wp-odm_dash'),
              'data_source' => __("Data source", 'wp-odm_dash'),
              'download' => __("Download", 'wp-odm_dash'),
              'show_data' =>  __("Show data", 'wp-odm_dash'),
              'hide_data' => __("Hide data", 'wp-odm_dash')
            );
            wp_register_script('wpdash-plugin-googlechart', plugins_url().'/wp-odm_dash/js/plugin-js/google-charts.js', array('jquery'));
            wp_enqueue_script('wpdash-plugin-googlechart');

            wp_register_script('wpdash-plugin-chartclass', plugins_url().'/wp-odm_dash/js/plugin-js/chart-class.js');
            wp_localize_script('wpdash-plugin-chartclass','dashboard', $i18n_params);
            wp_enqueue_script('wpdash-plugin-chartclass');

            wp_register_script('wpdash-plugin-util', plugins_url().'/wp-odm_dash/js/plugin-js/util.js');
            wp_localize_script('wpdash-plugin-util', 'dashboard', $i18n_params);
            wp_enqueue_script('wpdash-plugin-util');

            wp_register_script('wpdash-google-chart', 'https://www.gstatic.com/charts/loader.js');
            wp_enqueue_script('wpdash-google-chart');
        }

        public function check_requirements()
        {
            if (!check_requirements_dashboards()):
              echo '<div class="error"><p>ODM Dashboard: WPCKAN plugin is missing, deactivated or missconfigured. Please check.</p></div>';
            endif;
        }

        /**
         * hook into WP's admin_init action hook.
         */
        public function wpdash_admin_init()
        {
            $this->init_settings();
        }

        /**
         * Initialize some custom settings.
         */
        public function init_settings()
        {
            register_setting('wpdash-group', 'wpdash_setting_1', 'wpckan_sanitize_url');
        }

        /**
         * add a menu.
         */
        public function wpdash_add_menu()
        {
          // Settings page is disabled until some setting options are needed
          //add_options_page('WPDash Settings', 'wp-odm_dash', 'manage_options', 'wp-odm_dash', array(&$this, 'plugin_settings_page'));
        }

        /**
         * Menu Callback.
         */
        public function plugin_settings_page()
        {
            if (!current_user_can('manage_options')) {
                wp_die(__('You do not have sufficient permissions to access this page.'));
            }

            include sprintf('%s/templates/settings.php', dirname(__FILE__));
        }

        public static function activate()
        {
            // Do nothing
        }

        public static function deactivate()
        {
            // Do nothing
        }
    }
}

if (class_exists('Odm_Dashboards_Plugin')) {
  register_activation_hook(__FILE__, array('Odm_Dashboards_Plugin', 'activate'));
  register_deactivation_hook(__FILE__, array('Odm_Dashboards_Plugin', 'deactivate'));

  // Add the settings link to the plugins page
  function wpdash_plugin_settings_link($links)
  {
      $settings_link = '<a href="options-general.php?page=wp-odm_dash">Settings</a>';
      array_unshift($links, $settings_link);

      return $links;
  }

  $plugin = plugin_basename(__FILE__);
  add_filter("plugin_action_links_$plugin", 'wpdash_plugin_settings_link');
}


add_action('plugins_loaded', array('Odm_Dashboards_Plugin', 'get_instance'));
