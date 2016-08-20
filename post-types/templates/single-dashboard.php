
<?php get_header(); ?>

<?php	if (have_posts()) : ?>

<section class="container">
	<div class="row">
		  <div class="eleven columns">
	    <?php the_content(); ?>
	  </div>
	</div>
</section>

<section class="container">
	<div class="row">
		<h1>Overview of Myanmar</h1>
	</div>
	<div>
		<div class="six columns" id="mapwrapper">
			<div id="dash_search_box"></div>
			<div id="mymap"></div>
			<span id="overlayregion"></span>
		</div>
		<div class="ten columns" id="overviewInfo">
			<h1 id="region_name">Myanmar</h1>
			<p class="pcode_wrapper">
				ST PCODE : <span id="st_pcode">MMR</span> 
				<span class="ts_chart" style="margin-left:30px;">TS PCODE : <span id="ts_pcode"></span></span>
			</p>
			<div class="general_info">
				<h5>Total Population : <span id="total_population"></span></h5>
				<h5>Area : <span id="region_area"></span> km<sup>2</sup></h5>
				<h5>Number of Wards : <span id="wards_num"></span></h5>
				<h5>Number of Village Tracts : <span id="village_tracts_num"></span></h5>
				<h5>Number of Villages : <span id="villages_num"></span></h5>	
			</div>
		</div>
	</div>
</section>
<!-- Navigation -->
<div id="viz_nav_wrapper">
	<div class="container">
		<ul id="viz_nav">
			<li>
				<a href="#demographic">
				<i class="fa fa-globe"></i>
				<span class="sec_title">Demographic</span>
				</a>
			</li>
			<li>
				<a href="#goverment">
				<i class="fa fa-institution"></i>
				<span class="sec_title">Goverment</span>
				</a>
			</li>
			<li>
				<a href="#economy">
				<i class="fa fa-briefcase"></i>
				<span class="sec_title">Economy & Industries</span>
				</a>
			</li>
			<li>
				<a href="#education">
				<i class="fa fa-graduation-cap"></i>
				<span class="sec_title">Education</span>
				</a>
			</li>
			<li>
				<a href="#health">
				<i class="fa fa-medkit"></i>
				<span class="sec_title">Health</span>
				</a>
			</li>
			<li id="environment_nav">
				<a href="#environment">
				<i class="fa fa-tree"></i>
				<span class="sec_title">Environment</span>
				</a>
			</li>
			<li>
				<a href="#living">
				<i class="fa fa-home"></i>
				<span class="sec_title">Households & Living</span>
				</a>
			</li>
		</ul>
	</div>
</div> <!-- end of Navigation -->

<section class="row viz-section" id="demographic">
	<div class="container">
		<h4 class="section_title">Demographic</h4>
		<div class="row char_wrapper st_chart union_chart">
			<div id="st_population_pyramid" style="height:600px;"></div>
		</div>
		<div class="row chart_wrapper st_chart union_chart">
			<div id="pop_over_year" class="normal_chart"></div>
		</div>
		<div class="row chart_wrapper">
			<div class="eight columns">
				<div id="population_u_r" class="normal_chart"></div>
			</div>
			<div class="eight columns">
				<div id="population_gender" class="normal_chart"></div>
			</div>
		</div>
		<div class="row chart_wrapper">
			<div class="eight columns">
				<div id="m_f_headed_household" class="normal_chart"></div>
			</div>
			<div class="eight columns st_chart union_chart">
				<div id="religion_chart" class="normal_chart"></div>
			</div>
		</div>
	</div>
</section> <!-- end of Demographic Section -->

<!-- GOVERMENT -->
<section class="row viz-section even" id="goverment">
	<div class="container">
		<h4 class="section_title">Goverment</h4>

		<div class="row chart_wrapper st_chart only_st">
			<div id="st_election_2015"></div>
		</div>

		<div class="row chart_wrapper union_chart only_union">
			Paliment seat coming soon .... 
		</div>

		<div class="row chart_wrapper ts_chart">
			<div id="election_lower_2010"></div>
			<div id="election_lower_2012"></div>
			<div id="election_lower_2015"></div>
		</div>
	</div>
</section> <!-- END OF GOVERMENT SECTION -->

<!-- EDUCATION -->
<div class="row viz-section" id="education">
	<div class="container">
		<h4 class="section_title">Education</h4>
		<div class="row chart_wrapper">
			<div id="lit_rate" style="height:500px;"></div>
		</div>
		<div class="row chart_wrapper">
			<div class="eight columns">
				<div id="school_chart" class="normal_chart"></div>
			</div>
			<div class="eight columns">
				<div id="student_chart" class="normal_chart"></div>
			</div>
		</div>
		<div class="row chart_wrapper">
			<div class="eight columns">
				<div id="teacher_chart" class="normal_chart"></div>
			</div>
		</div>
	</div>
</div> <!-- END OF EDUCTAION SECTION -->

<!-- ECONOMY AND INDUSTRIES -->
<div class="row viz-section even" id="economy">
	<div class="container">
		<h4 class="section_title">Economy & Industries</h4>
		<div class="row chart_wrapper st_chart union_chart">
			<div id="revenue_expenditure" class="normal_chart"></div>
		</div>
		<div class="row chart_wrapper">
			<div id="labour_usual_activity_10ab" class="normal_chart full-width-charts" style="height:auto;"></div>
			<div class="note-text">* Left click on parent section to go up one level.</div>
		</div>
	</div>
</div> <!-- END OF ECONOMY AND INDUSTRIES -->

<!-- HEALTH -->
<div class="row viz-section" id="health">
	<div class="container">
		<h4 class="section_title">Health</h4>
		<div class="row chart_wrapper st_chart union_chart">
			<div class="four columns">
				<div class="text_container">
					<h5 class="label">Crude Birth Rate</h5>
					<div class="value"><span id="health_cbr"></span> </div>	
				</div>
				<div class="text_container">
					<h5 class="label">Life Expectancy At Birth</h5>	
					<div class="value"><span id="health_life_expectancy"></span> years</div>
				</div>
			</div>
			<div class="twelve columns">
				<div id="health_mortality_rate" style="height:400px;"></div>
			</div>
		</div>
		<div class="row chart_wrapper">
			<div class="eight columns">
				<div id="medical_worker" class="normal_chart"></div>
			</div>
			<div class="eight columns">
				<div id="hospital_healthcenter" class="normal_chart full-width-charts" style="padding-top: 47px;height: 300px;"></div>
			</div>
		</div>
	</div>
</div> <!-- END OF HEALTH SECTION -->

<!-- ENVIRONMENT -->
<div class="row viz-section even" id="environment">
	<div class="container">
		<h4 class="section_title">Environment</h4>
		<div class="row chart_wrapper st_chart union_chart">
			<div class="four columns">
				<div class="text_container">
					<h5 class="label">Percent Tree Cover</h5>	
					<div class="value" style="color:#4CAF50;"><span id="tree_cover_percent"></span> %</div>
				</div>
				<div class="text_container">
					<h5 class="label">Tree Cover (2000)</h5>
					<div class="value" style="color:#4CAF50;"><span id="tree_cover_area"></span> Ha</div>
				</div>
				<div class="text_container">
					<h5 class="label">Tree Cover Gain (2001 - 2012)</h5>
					<div class="value" style="color:#2196F3;"><span id="tree_cover_gain_2001_2012"></span> Ha</div>
				</div>
			</div>
			<div class="twelve columns">
				<div id="tree_cover_loss" style="height:300px;"></div>
			</div>
		</div>
	</div>
</div> <!-- END OF ENVIRONMENT SECTION -->

<!-- HOUSEHOLD AND LIVING -->
<div class="row viz-section" id="living">
	<div class="container">
		<h4 class="section_title">Households & Living</h4>
		<div class="row chart_wrapper">
			<h5>Mean Household Size : <span id="mean_household_size"></span></h5>
			<div id="household_size_chart" class="normal_chart"></div>
		</div>
		<div class="row chart_wrapper">
			<div class="eight columns">
				<div id="household_ownership" class="normal_chart"></div>
			</div>
			<div class="eight columns">
				<div id="household_light" class="normal_chart"></div>
			</div>
		</div>
		<div class="row chart_wrapper">
			<div class="eight columns">
				<div id="household_com" class="normal_chart"></div>
			</div>
			<div class="eight columns">
				<div id="household_trans" class="normal_chart"></div>
			</div>
		</div>
	</div>
</div> <!-- END OF HOUSEHOLD & LIVING -->

<?php

	wp_register_script('wpdash-leaflet', plugins_url().'/wp-odm_dash/bower_components/leaflet/dist/leaflet.js', array('jquery'));
	wp_enqueue_script('wpdash-leaflet');
	wp_register_script('wpdash-leaflet-search', plugins_url().'/wp-odm_dash/bower_components/leaflet-search/dist/leaflet-search.min.js', array('jquery'));
	wp_enqueue_script('wpdash-leaflet-search');
	wp_register_script('wpdash-loading-overlay', plugins_url().'/wp-odm_dash/bower_components/jquery-loading-overlay/src/loadingoverlay.min.js', array('jquery'));
	wp_enqueue_script('wpdash-loading-overlay');

	wp_register_script('wpdash-app', plugins_url().'/wp-odm_dash/js/app.js', array('jquery'));
	wp_enqueue_script('wpdash-app');
	wp_register_script('wpdash-chart-config', plugins_url().'/wp-odm_dash/js/chart-config.js', array('jquery'));
	wp_enqueue_script('wpdash-chart-config');
	wp_register_script('wpdash-chart-class', plugins_url().'/wp-odm_dash/js/chartClass.js', array('jquery'));
	wp_enqueue_script('wpdash-chart-class');
	wp_register_script('wpdash-util', plugins_url().'/wp-odm_dash/js/util.js', array('jquery'));
	wp_enqueue_script('wpdash-util');

?>

<!-- JS -->
<script src="https://d3js.org/topojson.v1.min.js"></script>
<!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDBWFsA9Qk3_-_FiwWT3d38WHbXkIZ9EkE&callback=initMap"></script>
<script src="leaflet-google.js"></script> -->

<!-- Google Chart -->
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

<?php endif; ?>

<?php get_footer(); ?>
