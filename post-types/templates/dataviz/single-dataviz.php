<?php get_header(); ?>

<?php if (have_posts()) : the_post(); ?>

	<section class="container">
		<?php
			$post = get_post();
			include 'dataviz-single-template.php';
		?>
	</section>

<?php endif; ?>

<?php get_footer(); ?>
