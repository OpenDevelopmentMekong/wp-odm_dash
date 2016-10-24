<?php

if (!class_exists('Odm_DataViz_Post_Type')) {

    class Odm_DataViz_Post_Type
    {
        public function __construct()
        {
          add_action('init', array($this, 'register_post_type'));
          add_action('init', array($this, 'register_dataviz_taxonomy'));
          add_action('save_post', array($this, 'save_post_data'));
          add_filter('single_template', array($this, 'get_dataviz_template'));
        }

        public function get_dataviz_template($single_template)
        {
            global $post;

            if ($post->post_type == 'dataviz') {
                $single_template = plugin_dir_path(__FILE__).'templates/dataviz/single-dataviz.php';  
            }

            return $single_template;
        }

        public function register_post_type()
        {
            $labels = array(
            'name' => __('Data Visualizations', 'post type general name', 'wpdash'),
            'singular_name' => __('Data Visualization', 'post type singular name', 'wpdash'),
            'menu_name' => __('Visualizations', 'admin menu for dashboard', 'wpdash'),
            'name_admin_bar' => __('Data Visualization', 'add new on admin bar', 'wpdash'),
            'add_new' => __('Add new', 'dashboard', 'wpdash'),
            'add_new_item' => __('Add new visualization', 'wpdash'),
            'new_item' => __('New visualization', 'wpdash'),
            'edit_item' => __('Edit visualization', 'wpdash'),
            'view_item' => __('View visualization', 'wpdash'),
            'all_items' => __('All visualizations', 'wpdash'),
            'search_items' => __('Search visualization', 'wpdash'),
            'parent_item_colon' => __('Parent visualization:', 'wpdash'),
            'not_found' => __('No visualization found.', 'wpdash'),
            'not_found_in_trash' => __('No visualization found in trash.', 'wpdash'),
            );

            $args = array(
              'labels'             => $labels,
              'public'             => true,
              'publicly_queryable' => true,
              'show_ui'            => true,
              'show_in_menu'       => true,
  			      'menu_icon'          => 'dashicons-chart-pie',
              'query_var'          => true,
              'rewrite'            => array( 'slug' => 'dataviz' ),
              'capability_type'    => 'page',
              'has_archive'        => true,
              'hierarchical'       => true,
              'menu_position'      => 5,
              'taxonomies'         => array('dataviz_sections'),
              'supports' => array('title', 'editor', 'page-attributes', 'revisions', 'author', 'thumbnail')
            );

            register_post_type('dataviz', $args);
        }

        public function register_dataviz_taxonomy()
        {

          $labels = array(
              'name'              => _x( 'Dataviz sections', 'taxonomy general name', 'wpdash' ),
              'singular_name'     => _x( 'Dataviz section', 'taxonomy singular name', 'wpdash' ),
              'search_items'      => __( 'Search section', 'wpdash' ),
              'all_items'         => __( 'All Sections', 'wpdash' ),
              'parent_item'       => __( 'Parent Section', 'wpdash' ),
              'parent_item_colon' => __( 'Parent Section:', 'wpdash' ),
              'edit_item'         => __( 'Edit Section', 'wpdash' ),
              'update_item'       => __( 'Update Section', 'wpdash' ),
              'add_new_item'      => __( 'Add New Section', 'wpdash' ),
              'new_item_name'     => __( 'New Section Name', 'wpdash' ),
              'menu_name'         => __( 'Dataviz Section', 'wpdash' ),
            );

            $args = array(
              'hierarchical'      => true,
              'labels'            => $labels,
              'show_ui'           => true,
              'show_admin_column' => true,
              'query_var'         => true,
              'rewrite'           => array( 'slug' => 'genre' ),
            );

            register_taxonomy( 'dataviz_sections', 'dataviz', $args );

        }

        public function save_post_data($post_id)
        {
            global $post;
            if (isset($post->ID) && get_post_type($post->ID) == 'dataviz') {

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
