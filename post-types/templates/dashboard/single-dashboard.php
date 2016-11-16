
<?php get_header(); ?>

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

<section class="container">
	<div class="row">
		<div class="eleven columns">

			<!-- Associated datavizs will be added here -->

	  </div>
	</div>
</section>


<?php endif; ?>

<?php get_footer(); ?>
