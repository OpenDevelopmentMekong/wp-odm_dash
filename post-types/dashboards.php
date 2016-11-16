<?php

if (!class_exists('Odm_Dashboards_Post_Type')) {

    class Odm_Dashboards_Post_Type
    {
        public function __construct()
        {
          add_action('init', array($this, 'register_post_type'));
          add_action('save_post', array($this, 'save_post_data'));
          add_action('add_meta_boxes', array($this, 'add_meta_box'));
          add_filter('template_include', array($this, 'get_custom_page_template'));
        }
        
        public function get_custom_page_template($template){
              $template_slug = basename($template);
            if ( is_archive() && $template_slug == "archive-dashboards.php") {
                return $template;
            }else if(is_single() && $template_slug =="single.php") {
                $single_template = $this->get_profile_pages_template($template);
                return $single_template;
            }else if (!is_archive()) {
                return $template;
            }else {
              if (!is_post_type_archive("dashboards")):
                return $template;
              endif;
            }
        }
        
        public function get_profile_pages_template($single_template)
        {
          global $post;
          if ($post->post_type == 'dashboards') {
              $single_template = plugin_dir_path(__FILE__).'templates/dashboard/single-dashboard.php';
          }
            return $single_template;
        }
        
        public function add_meta_box()
        {
          add_meta_box(
           'dashboards_template_layout',
           __('Template layout', 'wp-odm_dash'),
           array($this, 'template_layout_settings_box'),
           'dashboards',
           'advanced',
           'high'
          );
        }

        public function template_layout_settings_box($post = false)
        {
            $template = get_post_meta($post->ID, '_attributes_template_layout', true); ?>
            <div id="template_layout_settings_box">
             <h4><?php _e('Choose template layout', 'wp-odm_dash');?></h4>
             <select id="_attributes_template_layout" name="_attributes_template_layout">
                <option value="default" <?php if ($template == "default"): echo "selected"; endif; ?>>Default</option>
                <option value="my-overview" <?php if ($template == "my-overview"): echo "selected"; endif; ?>>Myanmar overview</option>                
              </select>
            </div>
        <?php
        }

        public function register_post_type()
        {
            $labels = array(
            'name' => __('Dashboards', 'post type general name', 'wp-odm_dash'),
            'singular_name' => __('Dashboard', 'post type singular name', 'wp-odm_dash'),
            'menu_name' => __('Dashboards', 'admin menu for dashboard', 'wp-odm_dash'),
            'name_admin_bar' => __('Dashboards', 'add new on admin bar', 'wp-odm_dash'),
            'add_new' => __('Add new', 'dashboard', 'wp-odm_dash'),
            'add_new_item' => __('Add new dashboard', 'wp-odm_dash'),
            'new_item' => __('New dashboard', 'wp-odm_dash'),
            'edit_item' => __('Edit dashboard', 'wp-odm_dash'),
            'view_item' => __('View dashboard', 'wp-odm_dash'),
            'all_items' => __('All dashboard', 'wp-odm_dash'),
            'search_items' => __('Search dashboard', 'wp-odm_dash'),
            'parent_item_colon' => __('Parent dashboard:', 'wp-odm_dash'),
            'not_found' => __('No dashboard found.', 'wp-odm_dash'),
            'not_found_in_trash' => __('No dashboard found in trash.', 'wp-odm_dash'),
            );

            $args = array(
              'labels'             => $labels,
              'public'             => true,
              'publicly_queryable' => true,
              'show_ui'            => true,
              'show_in_menu'       => true,
  			      'menu_icon'          => 'dashicons-chart-pie',
              'query_var'          => true,
              'rewrite'            => array( 'slug' => 'dashboards' ),
              'capability_type'    => 'page',
              'has_archive'        => true,
              'hierarchical'       => true,
              'menu_position'      => 5,
              'taxonomies'         => array('category', 'language', 'post_tag'),
              'supports' => array('title', 'editor', 'page-attributes', 'revisions', 'author', 'thumbnail')
            );

            register_post_type('dashboards', $args);
        }

        public function save_post_data($post_id)
        {
            global $post;
            if (isset($post->ID) && get_post_type($post->ID) == 'dashboards') {

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
                
                if (isset($_POST['_attributes_template_layout'])) {
                    update_post_meta($post_id, '_attributes_template_layout', $_POST['_attributes_template_layout']);
                }

            }

          }

    }
}

?>
