
<section id="content" class="container single-post">
	<div class="row">
			<!-- list $datavizs here -->
			<?php
				foreach ($datavizs as $dataviz): ?>
          <div class="four columns">
					<?php
            echo do_shortcode('[wpdash_dataviz id="' . $dataviz['ID'] . '"]');
          ?>
          </div>
			<?php
    	  endforeach;
			?>
	</div>
</section>
