<?php
/**
 * Plugin Name: ODM Dashboards
 * Plugin URI: http://github.com/OpenDevelopmentMekong/wpdash
 * Description: Internal wordpress plugin for exposing widgets with data visualizations.
 * Version: 0.9.0
 * Author: Alex Corbi (mail@lifeformapps.com)
 * Author URI: http://www.lifeformapps.com
 * License: GPLv3.
 */


// Require utils
require_once plugin_dir_path(__FILE__).'utils/wpdash-utils.php';

// Require post types
require_once plugin_dir_path(__FILE__).'post-types/dashboards.php';

include_once plugin_dir_path(__FILE__).'utils/wpdash-options.php';
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
            wp_enqueue_style('wpdash-style',  plugin_dir_url(__FILE__).'css/wpdash-style.css');
        }

        public function register_scripts()
        {

          wp_register_script('wpdash-leaflet', plugin_dir_url(__FILE__).'bower_components/leaflet/dist/leaflet.js', array('jquery'));
          wp_enqueue_script('wpdash-leaflet');
          wp_register_script('wpdash-leaflet-search', plugin_dir_url(__FILE__).'bower_components/leaflet-search/dist/leaflet-search.min.js', array('jquery'));
          wp_enqueue_script('wpdash-leaflet-search');
          wp_register_script('wpdash-loading-overlay', plugin_dir_url(__FILE__).'bower_components/jquery-loading-overlay/src/loadingoverlay.min.js', array('jquery'));
          wp_enqueue_script('wpdash-loading-overlay');

          wp_register_script('wpdash-app', plugin_dir_url(__FILE__).'js/app.js', array('jquery'));
          wp_enqueue_script('wpdash-app');
          wp_register_script('wpdash-chart-config', plugin_dir_url(__FILE__).'js/chart-config.js', array('jquery'));
          wp_enqueue_script('wpdash-chart-config');
          wp_register_script('wpdash-chart-class', plugin_dir_url(__FILE__).'js/chartClass.js', array('jquery'));
          wp_enqueue_script('wpdash-chart-class');
          wp_register_script('wpdash-util', plugin_dir_url(__FILE__).'js/util.js', array('jquery'));
          wp_enqueue_script('wpdash-util');
        }

        public function check_requirements()
        {
            if (!check_requirements_dashboards()):
              echo '<div class="error"><p>ODM Dashboards is missconfigured. Please check.</p></div>';
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
            add_options_page('WPDash Settings', 'wpdash', 'manage_options', 'wpdash', array(&$this, 'plugin_settings_page'));
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
