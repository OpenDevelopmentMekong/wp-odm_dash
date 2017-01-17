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
            'name' => __('Data Visualizations', 'post type general name', 'wp-odm_dash'),
            'singular_name' => __('Data Visualization', 'post type singular name', 'wp-odm_dash'),
            'menu_name' => __('Visualizations', 'admin menu for dashboard', 'wp-odm_dash'),
            'name_admin_bar' => __('Data Visualization', 'add new on admin bar', 'wp-odm_dash'),
            'add_new' => __('Add new', 'dashboard', 'wp-odm_dash'),
            'add_new_item' => __('Add new visualization', 'wp-odm_dash'),
            'new_item' => __('New visualization', 'wp-odm_dash'),
            'edit_item' => __('Edit visualization', 'wp-odm_dash'),
            'view_item' => __('View visualization', 'wp-odm_dash'),
            'all_items' => __('All visualizations', 'wp-odm_dash'),
            'search_items' => __('Search visualization', 'wp-odm_dash'),
            'parent_item_colon' => __('Parent visualization:', 'wp-odm_dash'),
            'not_found' => __('No visualization found.', 'wp-odm_dash'),
            'not_found_in_trash' => __('No visualization found in trash.', 'wp-odm_dash'),
            );

            $args = array(
              'labels'             => $labels,
              'public'             => true,
              'publicly_queryable' => true,
              'show_ui'            => true,
              'show_in_menu'       => true,
  			      'menu_icon'          => 'dashicons-chart-pie',
              'query_var'          => true,
              'rewrite'            => array('slug' => 'datavizs', 'with_front' => false),
              'capability_type'    => 'page',
              'has_archive'        => true,
              'hierarchical'       => true,
              'menu_position'      => 5,
              'taxonomies'         => array('dataviz_sections'),
              'supports' => array('title', 'editor', 'revisions', 'author', 'custom-fields')
            );

            register_post_type('dataviz', $args);
        }

        public function register_dataviz_taxonomy()
        {

          $labels = array(
              'name'              => _x( 'Dataviz sections', 'taxonomy general name', 'wp-odm_dash' ),
              'singular_name'     => _x( 'Dataviz section', 'taxonomy singular name', 'wp-odm_dash' ),
              'search_items'      => __( 'Search section', 'wp-odm_dash' ),
              'all_items'         => __( 'All Sections', 'wp-odm_dash' ),
              'parent_item'       => __( 'Parent Section', 'wp-odm_dash' ),
              'parent_item_colon' => __( 'Parent Section:', 'wp-odm_dash' ),
              'edit_item'         => __( 'Edit Section', 'wp-odm_dash' ),
              'update_item'       => __( 'Update Section', 'wp-odm_dash' ),
              'add_new_item'      => __( 'Add New Section', 'wp-odm_dash' ),
              'new_item_name'     => __( 'New Section Name', 'wp-odm_dash' ),
              'menu_name'         => __( 'Dataviz Section', 'wp-odm_dash' ),
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
            __('Ckan Dataset Info', 'wp-odm_dash'),
            array($this, 'dataviz_dataset_info_callback'),
            'dataviz',
            'advanced',
            'high'
          );

          add_meta_box(
            'dataviz_options',
            __('Data Visualization Options', 'wp-odm_dash'),
            array($this, 'dataviz_options_callback'),
            'dataviz',
            'advanced',
            'high'
          );

          add_meta_box(
            'dataviz_style',
            __('Data Visualization Styles', 'wp-odm_dash'),
            array($this, 'dataviz_styles_callback'),
            'dataviz',
            'side'
          );

        }

        public function dataviz_dataset_info_callback($post) {
          $resource_url = get_post_meta($post->ID, '_ckan_resource_url', true);
          $ckan_resource_filter = get_post_meta($post->ID, '_ckan_resource_filter', true);
          wp_nonce_field( plugin_basename( __FILE__ ), 'honeypot_content_nonce' ); ?>

          <style>
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
                      <label for="_ckan_resource_url">Ckan Resource URL :</label>
                    </td>
                    <td>
                      <input type="text" id="_ckan_resource_url" name="_ckan_resource_url" placeholder="https://data.opendevelopmentmekong.net/dataset/dataset_id/resource/resource_id" value="<?php echo $resource_url ?>" style="width:100%;" />
                      <p class="description">
                        Ckan resource_id : d646bd1e-f377-4152-a4a7-8785e2b39fc5 <br>
                        Example :
                        https://data.opendevelopmentmekong.net/dataset/7bc0cabc-3c01-44fe-ba30-943a360c56fb/resource/d646bd1e-f377-4152-a4a7-8785e2b39fc5<strong>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for"_ckan_resource_filter">Resource Filter</label>
                    </td>
                    <td>
                      <textarea id="_ckan_resource_filter" name="_ckan_resource_filter" style="width:100%;" rows="5"><?php echo $ckan_resource_filter; ?></textarea>
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
          </div>

        <?php
        }

        public function dataviz_options_callback ($post) {
          $visualization_options = get_post_meta($post->ID, '_viz_options', true);
          $visualization_options_localization = get_post_meta($post->ID, '_viz_options_localization', true);
          $field_ids = get_post_meta($post->ID, '_viz_field_ids', true);
          $field_ids_localization = get_post_meta($post->ID, '_viz_field_ids_localization', true);
          $columns = get_post_meta($post->ID, '_viz_columns', true);
          $columns_localization = get_post_meta($post->ID, '_viz_columns_localization', true);
          ?>

          <div id="multiple-site">
      			<input type="radio" id="en" class="en" name="language_site" value="en" checked />
      			<label for="en"><?php _e('ENGLISH', 'wp-odm_dash');?></label> &nbsp;
              <?php if (odm_language_manager()->get_the_language_by_site() != 'English'): ?>
                <input type="radio" id="localization" class="localization" name="language_site" value="localization" />
          			<label for="localization"><?php _e(odm_language_manager()->get_the_language_by_site(), 'wp-odm_dash');?></label>
              <?php endif; ?>
      		</div>
          <div id="resource_settings_box">

            <div class="resource_settings">
              <table class="form-table resource_settings_box">
                <tbody>
                  <tr>
                    <td>
                      <label for="_viz_type">Visualization Type :</label>
                    </td>
                    <td>
                      <select name="_viz_type" id="viz_type">
                        <option value="">-- Select Visualization Type --</option><?php echo $this->get_viz_type_options(get_post_meta($post->ID, '_viz_type', true)) ?></select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="language_settings language-en">
              <table class="form-table resource_settings_box">
                <tbody>
                  <tr>
                    <td>
                      <label for="_viz_options">Visualization Options :</label>
                    </td>
                    <td>
                      <textarea id="_viz_options" name="_viz_options" style="width:100%;" rows="10"><?php echo $visualization_options ?></textarea>
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
                      <textarea id="_viz_field_ids" name="_viz_field_ids" style="width:100%;" rows="10"><?php echo $field_ids ?></textarea>
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
                      <textarea id="_viz_columns" name="_viz_columns" style="width:100%;" rows="10"><?php echo $columns ?></textarea>
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

            <div class="language_settings language-localization">
              <table class="form-table resource_settings_box">
                <tbody>
                  <tr>
                    <td>
                      <label for="_viz_options_localization">Visualization Options :</label>
                    </td>
                    <td>
                      <textarea id="_viz_options_localization" name="_viz_options_localization" style="width:100%;" rows="10"><?php echo $visualization_options_localization ?></textarea>
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
                      <label for="_viz_field_ids_localization">Field IDs :</label>
                    </td>
                    <td>
                      <textarea id="_viz_field_ids_localization" name="_viz_field_ids_localization" style="width:100%;" rows="10"><?php echo $field_ids_localization ?></textarea>
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
                      <label for="_viz_columns_localization">Column Names :</label>
                    </td>
                    <td>
                      <textarea id="_viz_columns_localization" name="_viz_columns_localization" style="width:100%;" rows="10"><?php echo $columns_localization ?></textarea>
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

          </div>
          <script type="text/javascript">
      		 jQuery(document).ready(function($) {
      			var $container = $('#multiple-site');
      			var $languageSelection = $('input[type="radio"]');
      			var $forms = $('.language_settings');
      			var showForms = function() {
      				  $forms.hide();
      					var selected = $('input[type="radio"][name=language_site]').filter(':checked').val();
      					$('.language-' + selected).show();
      			}
      			$languageSelection.on('change', function() {
      					$('.' + this.className).prop('checked', this.checked);
      			 	showForms();
      			});

      			showForms();
           });
          </script>
        <?php
        }

        public function dataviz_styles_callback($post)
        {
          $viz_height = get_post_meta( $post->ID, '_viz_height', true );
          $viz_width = get_post_meta( $post->ID, '_viz_width', true );
          ?>

          <div id="resource_settings_box">
            <div class="resource_settings">
              <table class="form-table resource_settings_box">
                <tbody>
                  <tr>
                    <td>
                      <label for="_viz_width">Width</label>
                    </td>
                    <td>
                      <input type="text" name="_viz_width" id="_viz_width" value="<?php echo $viz_width ?>">
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
                      <input type="text" name="_viz_height" id="_viz_height" value="<?php echo $viz_height ?>">
                      <p class="description">
                        Height of Visualization in pixel (px) or percent (%)
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        <?php
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

                $field_list = ['_ckan_resource_url',
                              '_ckan_resource_filter',
                              '_viz_type',
                              '_viz_options',
                              '_viz_options_localization',
                              '_viz_field_ids',
                              '_viz_field_ids_localization',
                              '_viz_columns',
                              '_viz_columns_localization',
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

            $atts = shortcode_atts(array(
                   'posts_per_page' => '1',
                   'post_type' => 'dataviz',
                   'ignore_sticky_posts' => 1,
                   'p' => '',
                   'name' => '',
                   'width' => '100%',
                   'height' => '300px',
                   'hide_description' => false,
                   'data_source_table' => true),
                $atts);

            global $post;

            $posts = new WP_Query($atts);

            $output = '';

            if ($posts->have_posts()) {
                return get_dataviz_shortcode_template(plugin_dir_path(__FILE__).'templates/dataviz/dataviz-single-template.php', $posts->posts[0] , $atts);
            } else {
                return; // no posts found\
            }

            wp_reset_query();

        }

    } // end of Class
}

?>
