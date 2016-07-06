<?php
/**
 * Plugin Name: wpdash
 * Plugin URI: http://github.com/OpenDevelopmentMekong/wpdash
 * Description: wpdash is a wordpress plugin for exposing widgets with data visualizations.
 * Version: 0.9.0
 * Author: Alex Corbi (mail@lifeformapps.com)
 * Author URI: http://www.lifeformapps.com
 * License: GPLv3.
 */
 require 'vendor/autoload.php';
 include_once plugin_dir_path(__FILE__).'widgets/query-resources-widget.php';
 include_once plugin_dir_path(__FILE__).'utils/wpdash-utils.php';

if (!class_exists('wpdash')) {
    class wpdash
    {
        /**
         * Construct the plugin object.
         */
        public function __construct()
        {
            add_action('admin_init', array(&$this, 'wpdash_admin_init'));
            add_action('admin_menu', array(&$this, 'wpdash_add_menu'));
            add_action('admin_enqueue_scripts', array(&$this, 'wpdash_register_plugin_styles'));
            add_action('edit_post', array(&$this, 'wpdash_edit_post'));
            add_action('save_post', array(&$this, 'wpdash_save_post'));
        }

        public function wpdash_register_plugin_styles($hook)
        {
            wpdash_log('wpdash_register_plugin_styles');

            wp_register_style('wpdash_css', plugins_url('wpdash/css/wpdash_style.css'));
            wp_enqueue_style('wpdash_css');
        }

        public function wpdash_save_post($post_ID)
        {
            wpdash_log('wpdash_save_post: '.$post_ID);
        }

        public function wpdash_edit_post($post_ID)
        {
            wpdash_log('wpdash_edit_post: '.$post_ID);

          // If this is an autosave, our form has not been submitted,
          //     so we don't want to do anything.
          if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
              return $post_ID;
          }

          // Check the user's permissions.
          if (isset($_POST['post_type']) && 'page' == $_POST['post_type']) {
              if (!current_user_can('edit_page', $post_ID)) {
                  return $post_ID;
              }
          } else {
              if (!current_user_can('edit_post', $post_ID)) {
                  return $post_ID;
              }
          }

        }

        /**
         * Activate the plugin.
         */
        public static function activate()
        {
            // Do nothing
            wpdash_log('wpdash plugin activated');
        }

        /**
         * Deactivate the plugin.
         */
        public static function deactivate()
        {
            // Do nothing
            wpdash_log('wpdash plugin deactivated');
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
            register_setting('wpdash-group', 'wpdash_setting_1', 'wpdash_sanitize_url');
        }

        /**
         * add a menu.
         */
        public function wpdash_add_menu()
        {
            add_options_page('WPDASH Settings', 'wpdash', 'manage_options', 'wpdash', array(&$this, 'plugin_settings_page'));
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
    }
}

if (class_exists('wpdash')) {
    // Installation and uninstallation hooks
    register_activation_hook(__FILE__, array('wpdash', 'activate'));
    register_deactivation_hook(__FILE__, array('wpdash', 'deactivate'));

    // instantiate the plugin class
    $wpdash = new wpdash();

    // Add a link to the settings page onto the plugin page
    if (isset($wpdash)) {
        // Add the settings link to the plugins page
        function wpdash_plugin_settings_link($links)
        {
            $settings_link = '<a href="options-general.php?page=wpdash">Settings</a>';
            array_unshift($links, $settings_link);

            return $links;
        }

        $plugin = plugin_basename(__FILE__);
        add_filter("plugin_action_links_$plugin", 'wpdash_plugin_settings_link');
    }
}
