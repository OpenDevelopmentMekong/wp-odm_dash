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
            if ( is_archive() && $template_slug == "archive-dashboard.php") {
                return $template;
            }else if(is_single() && $template_slug =="single.php") {
                $single_template = $this->get_profile_pages_template($template);
                return $single_template;
            }else if (!is_archive()) {
                return $template;
            }else {
              if (!is_post_type_archive("dashboard")):
                return $template;
              endif;
            }
        }
        
        public function get_profile_pages_template($single_template)
        {
          global $post;
          if ($post->post_type == 'dashboard') {
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
           'dashboard',
           'advanced',
           'high'
          );
          
          add_meta_box(
           'post-datavizs',
           __('Data visualizations', 'wp-odm_dash'),
           array($this, 'post_datavizs_box'),
           'dashboard',
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
              'supports' => array('title', 'editor', 'page-attributes', 'revisions', 'author', 'thumbnail', 'custom-fields')
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
            
            if (isset($_POST['_attributes_template_layout'])) {
              update_post_meta($post_id, '_attributes_template_layout', $_POST['_attributes_template_layout']);
            }
            
            if(isset($_REQUEST['_attributes_dashboard_datavizs'])) {
              update_post_meta($post_id, '_attributes_dashboard_datavizs', json_decode(stripslashes($_REQUEST['_attributes_dashboard_datavizs']), true));
            }
          }
        }
        
        function post_datavizs_box($post = false) 
        {

          $dataviz_query = new WP_Query(array('post_type' => 'datavizs', 'posts_per_page' => -1));
          $datavizs = array();
          $post_datavizs = $post ? $this->get_dashboard_datavizs($post->ID) : false;
          ?>

          <p>
           <?php
            printf(__('Add and manage <a href="%s" target="_blank">Data visualizations</a> on your dashboard.', 'wp-odm_dash'), admin_url('edit.php?post_type=datavizs'));
            if(!$dataviz_query->have_posts()):
              printf(__(' You haven\'t created any data visualizations yet, <a href="%s" target="_blank">click here</a> to create your first!'), admin_url('post-new.php?post_type=datavizs'));
            endif;
           ?>
          </p>

          <?php
          if($dataviz_query->have_posts()) {
           while($dataviz_query->have_posts()) {
            $dataviz_query->the_post();
            $datavizs[] = $this->get_dataviz(get_the_ID());
            wp_reset_postdata();
           }
           ?>
           <input type="text" data-bind="textInput: search" placeholder="<?php _e('Search for data visualizations', 'wp-odm_dash'); ?>" size="50">

           <!-- ko if: !search() -->
            <h4 class="results-title"><?php _e('Latest data visualizations', 'wp-odm_dash'); ?></h4>
           <!-- /ko -->

           <!-- ko if: search() -->
            <h4 class="results-title"><?php _e('Search results', 'wp-odm_dash'); ?></h4>
           <!-- /ko -->

           <!-- ko if: !filteredDatavizs().length && !search() -->
            <p style="font-style:italic;color: #999;"><?php _e('You are using all of your data visualizations.', 'wp-odm_dash'); ?></p>
           <!-- /ko -->

           <!-- ko if: !filteredDatavizs().length && search() -->
            <p style="font-style:italic;color: #999;"><?php _e('No data visualizations were found.', 'wp-odm_dash'); ?></p>
           <!-- /ko -->

           <table class="datavizs-list available-datavizs">
            <tbody data-bind="foreach: filteredDatavizs">
             <tr>
              <td><strong data-bind="text: title"></strong></td>
              <td style="width:1%;"><a class="button" data-bind="click: $parent.addDataviz" href="javascript:void(0);" title="<?php _e('Add data visualization', 'wp-odm_dash'); ?>">+ <?php _e('Add'); ?></a></td>
             </tr>
            </tbody>
           </table>

           <h4 class="selected-title"><?php _e('Selected data visualizations', 'wp-odm_dash'); ?></h4>

           <table class="datavizs-list selected-datavizs">
            <tbody class="selected-datavizs-list">
             <!-- ko foreach: {data: selectedDatavizs} -->
              <tr class="dataviz-item">
               <td style="width: 30%;">
                <p><strong data-bind="text: title"></strong></p>
               </td>
               
               <td style="width:1%;"><a class="button" data-bind="click: $parent.removeDataviz" href="javascript:void(0);" title="<?php _e('Remove data visualization', 'wp-odm_dash'); ?>"><?php _e('Remove'); ?></a></td>
              </tr>
             <!-- /ko -->
            </tbody>
           </table>

           <input type="hidden" name="_attributes_dashboard_datavizs" data-bind="textInput: selection" />

           <style type="text/css">
            #post-datavizs input[type='text'] {
             width: 100%;
            }
            #post-datavizs .datavizs-list {
             background: #fcfcfc;
             border-collapse: collapse;
             width: 100%;
            }
            #post-datavizs .selected-datavizs .dataviz-item {
             width: 100%;
             height: 100px;
            }
            #post-datavizs .dataviz-list tr td {
             margin: 0;
             border: 1px solid #f0f0f0;
             padding: 5px 8px;
            }
            #post-datavizs .datavizs-list tr:hover td {
             background: #fff;
            }
           </style>

           <script type="text/javascript">
            function DatavizsModel() {
             var self = this;

             var origDatavizs = <?php echo json_encode($datavizs); ?>;
             
             self.search = ko.observable('');

             self.addDataviz = function(dataviz) {
              var dataviz = dataviz || this;              
              self.selectedDatavizs.push(dataviz);
              self.datavizs.remove(dataviz);
             };

             self.removeDataviz = function(dataviz) {
              var dataviz = dataviz || this;
              self.datavizs.push(dataviz);
              self.selectedDatavizs.remove(dataviz);
             };

             self.datavizs = ko.observableArray(origDatavizs.slice(0));
             
             self.filteredDatavizs = ko.computed(function() {              
              if(!self.search()) {
               return self.datavizs().slice(0, 4);
              } else {                
               return ko.utils.arrayFilter(self.datavizs(), function(l) {
                return l.title.toLowerCase().indexOf(self.search().toLowerCase()) !== -1;
               }).slice(0, 4);
              }
             });

             /*
              * dataviz selection
              */
              
             self.selectedDatavizs = ko.observableArray([]);

             var initSelection = <?php if($post_datavizs) echo json_encode($post_datavizs); else echo '[]'; ?>;
             
             if(initSelection.length) {
              _.each(initSelection, function(l) {
                
               var dataviz = _.extend(_.find(self.datavizs(), function(dataviz) {
                if(dataviz.ID == l.ID) {
                 _.extend(l, dataviz);
                 return true;
                }
                return false;
               }), l);
               self.addDataviz(dataviz);
              });
             }
             
             self.selection = ko.computed(function() {
              var datavizs = [];              
              _.each(self.selectedDatavizs(), function(dataviz) {                             
               var dataviz = _.extend({}, dataviz);               
               datavizs.push(dataviz);
              });
              window.editingDatavizs = datavizs;
              return JSON.stringify(datavizs);
             });

             /*
              * Sortable selected datavizs
              */

             // jquery sort binding method
             self.bindSort = function(listSelector, listKey) {
              var startIndex = -1;

              var sortableSetup = {

               // on sorting start
               start: function (event, ui) {
                // cache the item index when the dragging starts
                startIndex = ui.item.index();
               },

               // on sorting stop
               stop: function (event, ui) {

                // get the new location item index
                var newIndex = ui.item.index();

                if (startIndex > -1) {
                 //  get the item to be moved
                 var item = self[listKey]()[startIndex];

                 //  move the item
                 self[listKey].remove(item);
                 self[listKey].splice(newIndex, 0, item);

                 //  ko rebinds to the array so we need to remove duplicate ui item
                 ui.item.remove();
                }

               }
              };

              // bind jquery using the .fruitList class selector
              jQuery(listSelector).sortable( sortableSetup );

             };
                          

            }

            jQuery(document).ready(function() {
             var model = new DatavizsModel();
             model.bindSort('.selected-datavizs-list', 'selectedDatavizs');
             ko.applyBindings(model);
            });
           </script>
           <?php

          }

         }
         
         function get_dashboard_datavizs($post_id = false) 
         {
            global $post;
            $post_id = $post_id ? $post_id : $post->ID;

            $datavizs = array();

            $dashboard_datavizs = get_post_meta($post_id, '_attributes_dashboard_datavizs', true);
            
            if($dashboard_datavizs) {
             foreach($dashboard_datavizs as $l) {
              $dataviz = $this->get_dataviz($l['ID']);              
              $datavizs[] = $dataviz;
             }
            }

            return $datavizs;
         }
         
         function get_dataviz($post_id = false) 
         {

          global $post;
          $post_id = $post_id ? $post_id : $post->ID;

          $post = get_post($post_id);
          setup_postdata($post);

          $dataviz = array(
           'ID' => $post->ID,
           'title' => get_the_title(),
           'post_content' => content(999),
           'excerpt' => content(40),
          );

          wp_reset_postdata();

          return $dataviz;

         }
    }
}

?>
