<?php

class wpdash_show_dataviz_Widget extends WP_Widget
{

 public function __construct() {
  parent::__construct(
   'wpdash_show_dataviz_widget',
   __('WPDASH Show dataviz', 'odi'),
   array('description' => __('Integrate a data visualization on a widget area', 'odi'))
  );
 }

 /**
  * Outputs the content of the widget
  *
  * @param array $args
  * @param array $instance
  */
 public function widget( $args, $instance ) {

  global $post;

  $shortcode = '[wpdash_dataviz id="' . $instance['id'] . '" hide_description='. var_export($instance['hide_description'], true) .' data_source_table='. var_export($instance['data_source_table'], true) .']';

  $output = do_shortcode($shortcode);

  if (!empty($output) && $output != ""):

    echo $args['before_widget'];
    if ( ! empty( $instance['title'] ) ) :
      echo $args['before_title'] . apply_filters( 'widget_title', __( $instance['title'], 'odi')). $args['after_title'];
    endif;

    echo $output;

    echo $args['after_widget'];

  endif;

 }

 /**
  * Outputs the options form on admin
  *
  * @param array $instance The widget options
  */
 public function form( $instance ) {
  // outputs the options form on admin
  $id = ! empty( $instance['id'] ) ? __( $instance['id'], 'odi') : null;
  $hide_desc = ! empty( $instance['hide_description'] ) ? __( $instance['hide_description'], 'odi') : false;
  $data_source_table = ! empty( $instance['data_source_table'] ) ? __( $instance['data_source_table'], 'odi') : false;
  ?>
  <p>
   <label for="<?php echo $this->get_field_id( 'id' ); ?>"><?php _e( 'Id:' ); ?></label>
   <input class="widefat" id="<?php echo $this->get_field_id( 'id' ); ?>" name="<?php echo $this->get_field_name( 'id' ); ?>" type="text" value="<?php echo esc_attr( $id ); ?>">
  </p>
  <p>
    <input type="checkbox" name="<?php echo $this->get_field_name( 'hide_description' ); ?>" id="<?php echo $this->get_field_id( 'hide_description' ); ?>" value=true<?php echo ($hide_desc == true) ? " checked" : "" ?>> <?php _e('Hide Description'); ?>
  </p>
  <p>
    <input type="checkbox" name="<?php echo $this->get_field_name( 'data_source_table' ); ?>" id="<?php echo $this->get_field_id( 'data_source_table' ); ?>" value=true<?php echo ($data_source_table == true) ? " checked" : "" ?>> <?php _e('Include data source table'); ?>
  </p>
  <?php
 }

 /**
  * Processing widget options on save
  *
  * @param array $new_instance The new options
  * @param array $old_instance The previous options
  */
 public function update( $new_instance, $old_instance ) {

  $instance = array();
  $instance['id'] = ( ! empty( $new_instance['id'] ) ) ? strip_tags( $new_instance['id'] ) : '';
  $instance['hide_description'] = ( ! empty( $new_instance['hide_description'] ) ) ? strip_tags( $new_instance['hide_description'] ) : false;
  $instance['data_source_table'] = ( ! empty( $new_instance['data_source_table'] ) ) ? strip_tags( $new_instance['data_source_table'] ) : false;

  return $instance;
 }
}

add_action( 'widgets_init', create_function('', 'register_widget("wpdash_show_dataviz_Widget");'));

?>
