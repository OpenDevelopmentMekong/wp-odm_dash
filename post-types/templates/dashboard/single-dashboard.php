
<?php get_header(); ?>

<?php 
	$template = get_post_meta($post->ID, '_attributes_template_layout', true);
 ?>

<?php	if (have_posts()) : ?>

<section class="container">
	<div class="row">
		<div class="sixteen columns">
			<h1><?php the_title(); ?></h1>
		</div>
	</div>
</section>

<section class="container">
	<div class="row">
		<div class="sixteen columns">
	    <?php the_content(); ?>
	  </div>
	</div>
</section>

<section id="content" class="single-post">
  <?php 
    if ($template == 'my-overview'):
      include 'single-dashboard-my-overview.php';    
    else:
      include 'default-dashboard.php';
    endif;
  ?>
</section>


<?php endif; ?>

<?php get_footer(); ?>
