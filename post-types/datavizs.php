<?php

if (!class_exists('Odm_DataViz_Post_Type')) {

    class Odm_DataViz_Post_Type
    {
        public function __construct()
        {
          add_action('init', array($this, 'register_post_type'));
          add_action('init', array($this, 'register_dataviz_taxonomy'));
          add_action('add_meta_boxes', array($this, 'register_metaboxs'));
          add_action('save_post', array($this, 'save_post_data'));
          add_filter('single_template', array($this, 'get_dataviz_template'));
          add_shortcode('wpdash_dataviz', array($this, 'dataviz_shortcode_callback'));
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
              'rewrite'            => array('slug' => 'dataviz', 'with_front' => false),
              'capability_type'    => 'page',
              'has_archive'        => true,
              'hierarchical'       => true,
              'menu_position'      => 5,
              'taxonomies'         => array('dataviz_sections'),
              'supports' => array('title', 'editor', 'revisions', 'author')
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

        public function register_metaboxs() {
          add_meta_box(
            'dataviz_dataset_info',
            __('Ckan Dataset Info', 'wpdash'),
            array($this, 'dataviz_dataset_info_callback'),
            'dataviz',
            'advanced',
            'high'
          );

          add_meta_box(
            'dataviz_options',
            __('Data Visualization Options', 'wpdash'),
            array($this, 'dataviz_options_callback'),
            'dataviz',
            'advanced',
            'high'
          );

          add_meta_box(
            'dataviz_style',
            __('Data Visualization Styles', 'wpdash'),
            array($this, 'dataviz_styles_callback'),
            'dataviz',
            'side'
          );

          //select dashboard metabox
        }

        public function dataviz_dataset_info_callback($post) {

          $resource_id_fieldname = '_ckan_resource_id';
          $resource_download_fieldname = '_ckan_resource_download_link';

          wp_nonce_field( plugin_basename( __FILE__ ), 'honeypot_content_nonce' );

          echo '<style>
             .form-table td {
              vertical-align: top;
             }
          </style>
          <div id="resource_settings_box">
                  <div class="resource_settings">
                    <table class="form-table resource_settings_box">
                      <tbody>
                        <tr>
                          <td>
                            <label for="'.$resource_id_fieldname.'">Ckan Resource ID :</label>
                          </td>
                          <td>
                            <input type="text" id="'.$resource_id_fieldname.'" name="'.$resource_id_fieldname.'" placeholder="fe0a5815-b58d-423b-816a-8347ec85b2bb" value="'.get_post_meta( $post->ID, $resource_id_fieldname, true ).'" style="width:100%;" />
                            <p class="description">
                              Ckan resource_id : d646bd1e-f377-4152-a4a7-8785e2b39fc5 <br>
                              Example : 
                              https://data.opendevelopmentmekong.net/dataset/7bc0cabc-3c01-44fe-ba30-943a360c56fb/resource/<strong>d646bd1e-f377-4152-a4a7-8785e2b39fc5<strong>
                              <br> ** bolded uri is where you can find resource_id in a resource url **
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label for="'.$resource_download_fieldname.'">Resource Download Link : </label>                  
                          </td>
                          <td>
                            <input type="text" id="'.$resource_download_fieldname.'" name="'.$resource_download_fieldname.'" placeholder="https://data.opendevelopmentmekong.net/dataset/dataset_id/resource/resource_id/download/Resource.csv" value="'.get_post_meta( $post->ID, $resource_download_fieldname, true ).'" style="width:100%;" />
                              <p class="description">
                                Ckan resource download url <br>
                                Example : https://data.opendevelopmentmekong.net/dataset/7bc0cabc-3c01-44fe-ba30-943a360c56fb/resource/d646bd1e-f377-4152-a4a7-8785e2b39fc5/download/HouseholdspopulationBasedDatasetSRUnion.csv
                              </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label for"_ckan_resource_filter">Resource Filter</label>
                          </td>
                          <td>
                            <textarea id="_ckan_resource_filter" name="_ckan_resource_filter" style="width:100%;" rows="5">'.get_post_meta($post->ID, '_ckan_resource_filter', true).'</textarea>
                            <p class="description">
                              Query filter for ckan datstore API in json format <br>
                              Example : 
                              <pre>
{
  pcode : "MMR001"
}
                              </pre>
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>';

        }

        public function dataviz_options_callback ($post) {

          //wp_nonce_field( plugin_basename( __FILE__ ), 'honeypot_content_nonce' );

          echo '<div id="resource_settings_box">
                  <div class="resource_settings">
                    <table class="form-table resource_settings_box">
                      <tbody>
                        <tr>
                          <td>
                            <label for="_viz_type">Visualization Type :</label>
                          </td>
                          <td>
                            <select name="_viz_type" id="viz_type">
                              <option value="">-- Select Visualization Type --</option>'
                            .
                              $this->get_viz_type_options(get_post_meta($post->ID, '_viz_type', true))
                            .'</select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label for="_viz_options">Visualization Options :</label>
                          </td>
                          <td>
                            <textarea id="_viz_options" name="_viz_options" style="width:100%;" rows="10">'.get_post_meta($post->ID, '_viz_options', true).'</textarea>
                            <p class="description">
                              Customize visualization options in json format <br>
                              Check avaliable options <a href="https://developers.google.com/chart/interactive/docs/" target=" _blank">here</a> <br>
                              Examples : 
                              <pre>
{
  hAxis : {
    title : \'Communication and amenities type\',
    slantedText : true,
    slantedTextAngle: 45
  },
  vAxis : {
    title : \'Number of households with access\'
  }
}
                              </pre>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label for="_viz_field_ids">Field IDs :</label>
                          </td>
                          <td>
                            <textarea id="_viz_field_ids" name="_viz_field_ids" style="width:100%;" rows="10">'.get_post_meta($post->ID, '_viz_field_ids', true).'</textarea>
                            <p class="description">
                              Column names from resource needed for visualization and labels to show on frontend in json format <br>
                              <pre>
{
  column_id : "Label"
}
                              </pre>
                              Example : 
                              <pre>
{
  "pri_school" : "Primary school",
  "mid_school" : "Middle school",
  "high_school" : "High school"
}
                              </pre>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label for="_viz_columns">Column Names :</label>
                          </td>
                          <td>
                            <textarea id="_viz_columns" name="_viz_columns" style="width:100%;" rows="10">'.get_post_meta($post->ID, '_viz_columns', true).'</textarea>
                            <p class="description">
                            Columns for visualization Data Table in json format <br>
                            Check <a href="https://developers.google.com/chart/interactive/docs/datatables_dataviews#creating-and-populating-a-datatable" target="_blank">here</a> for more info.
<pre>
{
   "Column Name" : "data_format"
}
</pre>
Example : 
<pre>
{
  "School" : "string",
  "Number of School" : "number"
}
</pre>

                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>';
        }

        public function dataviz_styles_callback($post) 
        {
          echo '<div id="resource_settings_box">
                  <div class="resource_settings">
                    <table class="form-table resource_settings_box">
                      <tbody>
                        <tr>
                          <td>
                            <label for="_viz_width">Width</label>
                          </td>
                          <td>
                            <input type="text" name="_viz_width" id="_viz_width" value="'.get_post_meta( $post->ID, '_viz_width', true ).'">
                            <p class="description">
                              Width of Visualization in pixel (px) or percent (%)
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label for="_viz_height">Height</label>
                          </td>
                          <td>
                            <input type="text" name="_viz_height" id="_viz_height" value="'.get_post_meta( $post->ID, '_viz_height', true ).'">
                            <p class="description">
                              Height of Visualization in pixel (px) or percent (%)
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>';
        }

        public function get_viz_type_options($selected_val) 
        {
          $viz_type_options = array(
            'pie' => 'Pie Chart',
            'donut' => 'Donut Chart',
            'bar' => 'Bar Chart',
            'line' => 'Line Chart',
            'column' => 'Column Chart',
            'table' => 'Table',
            'treemap' => 'Tree Map'
          );

          $template = '';
          foreach ($viz_type_options as $value => $name) {
            $selected = ($value == $selected_val) ? ' selected' : '';
            $template .= '<option value="'.$value.'"'.$selected.'>'.$name.'</option>';
          }

          return $template;
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

                $field_list = ['_ckan_resource_id', 
                              '_ckan_resource_download_link',
                              '_ckan_resource_filter',
                              '_viz_type',
                              '_viz_options',
                              '_viz_field_ids',
                              '_viz_columns',
                              '_viz_width',
                              '_viz_height'];

                foreach ($field_list as $field_name) {
                  if (isset($_POST[$field_name])) {
                    update_post_meta($post_id, $field_name, $_POST[$field_name]);
                  }
                }
            }


        } // end of save_post_data

        public function dataviz_shortcode_callback($atts, $content) 
        {
            if (isset($atts['id'])) {
                $atts['p'] = $atts['id'];
                unset($atts['id']);
            }

            $atts = shortcode_atts(
                        array( 
                           'posts_per_page' => '1',
                           'post_type' => 'dataviz',
                           'ignore_sticky_posts' => 1,
                           'p' => '',
                           'name' => '',
                           'width' => '100%',
                           'height' => '300px',
                           'hide_description' => false), $atts);

            global $post;

            $posts = new WP_Query($atts);

            $output = '';

            if ($posts->have_posts()) {

                return $this->get_dataviz_shortcode_template(plugin_dir_path(__FILE__).'templates/dataviz/dataviz-single-template.php', $posts->posts[0] , $atts);
                
            } else {
                return; // no posts found\
            }

            wp_reset_query();

        }

        public function get_dataviz_shortcode_template($template_url, $post, $atts) {

            ob_start();
            require $template_url;
            $output = ob_get_contents(); 
            ob_end_clean();
            return $output;

        }

    } // end of Class
}

?>
