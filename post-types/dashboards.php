<?php

if (!class_exists('Odm_Dashboards_Post_Type')) {

    class Odm_Dashboards_Post_Type
    {
        public function __construct()
        {
          add_action('init', array($this, 'register_post_type'));
          add_action('save_post', array($this, 'save_post_data'));
          add_filter('single_template', array($this, 'get_dashboards_template'));
        }

        public function get_dashboards_template($single_template)
        {
            global $post;

            if ($post->post_type == 'dashboard') {
                if (file_exists(plugin_dir_path(__FILE__).'templates/dashboard/single-dashboard-'.$post->post_name.'.php')) {
                  $single_template = plugin_dir_path(__FILE__).'templates/dashboard/single-dashboard-'.$post->post_name.'.php';
                } else {
                  $single_template = plugin_dir_path(__FILE__).'templates/dashboard/single-dashboard.php';  
                }
            }

            return $single_template;
        }

        public function register_post_type()
        {
            $labels = array(
            'name' => __('Dashboards', 'post type general name', 'wpdash'),
            'singular_name' => __('Dashboard', 'post type singular name', 'wpdash'),
            'menu_name' => __('Dashboards', 'admin menu for dashboard', 'wpdash'),
            'name_admin_bar' => __('Dashboards', 'add new on admin bar', 'wpdash'),
            'add_new' => __('Add new', 'dashboard', 'wpdash'),
            'add_new_item' => __('Add new dashboard', 'wpdash'),
            'new_item' => __('New dashboard', 'wpdash'),
            'edit_item' => __('Edit dashboard', 'wpdash'),
            'view_item' => __('View dashboard', 'wpdash'),
            'all_items' => __('All dashboard', 'wpdash'),
            'search_items' => __('Search dashboard', 'wpdash'),
            'parent_item_colon' => __('Parent dashboard:', 'wpdash'),
            'not_found' => __('No dashboard found.', 'wpdash'),
            'not_found_in_trash' => __('No dashboard found in trash.', 'wpdash'),
            );

            $args = array(
              'labels'             => $labels,
              'public'             => true,
              'publicly_queryable' => true,
              'show_ui'            => true,
              'show_in_menu'       => true,
  			      'menu_icon'          => 'dashicons-chart-pie',
              'query_var'          => true,
              'rewrite'            => array( 'slug' => 'dashboard' ),
              'capability_type'    => 'page',
              'has_archive'        => true,
              'hierarchical'       => true,
              'menu_position'      => 5,
              'taxonomies'         => array('category', 'language', 'post_tag'),
              'supports' => array('title', 'editor', 'page-attributes', 'revisions', 'author', 'thumbnail')
            );

            register_post_type('dashboard', $args);
        }

        public function save_post_data($post_id)
        {
            global $post;
            if (isset($post->ID) && get_post_type($post->ID) == 'dashboard') {

                if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
                    return;
                }

                if (defined('DOING_AJAX') && DOING_AJAX) {
                    return;
                }

                if (false !== wp_is_post_revision($post_id)) {
                    return;
                }

                if (!current_user_can('edit_post')) {
                    return;
                }

            }

          }

    }
}

?>
