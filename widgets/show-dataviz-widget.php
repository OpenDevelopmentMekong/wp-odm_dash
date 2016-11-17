<?php

class wpdash_show_dataviz_Widget extends WP_Widget
{

 public function __construct() {
  parent::__construct(
   'wpdash_show_dataviz_widget',
   __('WPDASH Show dataviz', 'wp-odm_dash'),
   array('description' => __('Integrate a data visualization on a widget area', 'wp-odm_dash'))
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

  $shortcode = '[wpdash_dataviz id="' . $instance['id'] . '"]';

  $output = do_shortcode($shortcode);

  if (!empty($output) && $output != ""):

    echo $args['before_widget'];
    if ( ! empty( $instance['title'] ) ) :
      echo $args['before_title'] . apply_filters( 'widget_title', __( $instance['title'], 'wp-odm_dash')). $args['after_title'];
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
  $id = ! empty( $instance['id'] ) ? __( $instance['id'], 'wp-odm_dash') : null;

  ?>
  <p>
   <label for="<?php echo $this->get_field_id( 'id' ); ?>"><?php _e( 'Id:' ); ?></label>
   <input class="widefat" id="<?php echo $this->get_field_id( 'id' ); ?>" name="<?php echo $this->get_field_name( 'id' ); ?>" type="text" value="<?php echo esc_attr( $id ); ?>">
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

  return $instance;
 }
}

add_action( 'widgets_init', create_function('', 'register_widget("wpdash_show_dataviz_Widget");'));

?>
