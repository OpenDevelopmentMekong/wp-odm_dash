<?php get_header(); ?>

<?php if (have_posts()) : the_post(); ?>

	<section class="container">
		<?php include 'dataviz-single-template.php'; ?>
	</section>

	<!-- Google Chart -->
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>


<?php endif; ?>

<?php get_footer(); ?>