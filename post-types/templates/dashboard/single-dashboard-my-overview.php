<div id="region_name_wrapper">
	<div class="container">
		<div class="row">
			<div class="four columns" style="margin-left: 0px;">
				<h1 id="region_name" class="region_name_container">Myanmar</h1>			
			</div>
			<div class="ten columns">
				<div id="dash_search_box"></div>
			</div>
			<div class="two columns" id="back_to_map">
				<a href="#mymap"><i class="fa fa-angle-up"></i> <span class="text">back to map</span></a>
			</div>
		</div>
	</div>
</div>

<section id="content" class="container single-post">
	<div class="row">
		<div class="pcode_container">
			<div class="pcode_info_wrapper">
				<i class="fa fa-info-circle" id="pcode_info"></i> 
				<span class="pcode_info_text" style="display:none;">Pcode is an abbreviated term for “Place code”; this is similar to a zip code or postal code, and is a part of a data management system providing unique reference codes to around 67,000 locations across Myanmar. Learn more at about pcode <a href="http://themimu.info/place-codes" target="_blank">here</a></span>
				ST PCODE : <span id="st_pcode">MMR</span> 
			</div>
			<span class="ts_chart" style="margin-left:30px;">TS PCODE : <span id="ts_pcode"></span></span>
		</div>
		<!-- <div class="map_instruction">Double click to zoom in to township level and Click on <i class="fa fa-map-marker"></i> to go back to union level.</div> -->
		<div id="dash_map_wrapper">
			<div id="mymap"></div>	
		</div>
		<span id="overlayregion"></span>
		<div id="search_by_stpcode" style="display:none;"></div>
		<div class="general_info show-desktop">
			<h2 class="region_name_container">Myanmar</h2>
			<span class="parent_region_container"></span>
			<h5 id="total_population"></h5>
			<h5 id="total_population_non_enumerated"></h5>
			<h5 id="region_area"></h5>
			<h5 id="wards_num"></h5>
			<h5 id="village_tracts_num"></h5>
			<h5 id="villages_num"></h5>	
		</div>
	</div>
</section>
<!-- Navigation -->
<div id="viz_nav_wrapper">
	<div class="container">
		<ul id="viz_nav">
			<li>
				<a href="#demographic">
				<span class="fa-stack fa-lg">
  					<i class="fa fa-circle fa-stack-2x"></i>
					<i class="fa fa-globe fa-stack-1x fa-inverse"></i>
				</span>
				<span class="sec_title">Demographics</span>
				</a>
			</li>
			<li>
				<a href="#goverment">
				<span class="fa-stack fa-lg">
  					<i class="fa fa-circle fa-stack-2x"></i>
					<i class="fa fa-institution fa-stack-1x fa-inverse"></i>
				</span>
				<span class="sec_title">Government</span>
				</a>
			</li>
			<li>
				<a href="#economy">
				<span class="fa-stack fa-lg">
  					<i class="fa fa-circle fa-stack-2x"></i>
					<i class="fa fa-briefcase fa-stack-1x fa-inverse"></i>
				</span>
				<span class="sec_title">Economy and industry</span>
				</a>
			</li>
			<li>
				<a href="#education">
				<span class="fa-stack fa-lg">
  					<i class="fa fa-circle fa-stack-2x"></i>
					<i class="fa fa-graduation-cap fa-stack-1x fa-inverse"></i>
				</span>
				<span class="sec_title">Education</span>
				</a>
			</li>
			<li>
				<a href="#health">
				<span class="fa-stack fa-lg">
  					<i class="fa fa-circle fa-stack-2x"></i>
					<i class="fa fa-medkit fa-stack-1x fa-inverse"></i>
				</span>
				<span class="sec_title">Health</span>
				</a>
			</li>
			<li id="environment_nav">
				<a href="#environment">
				<span class="fa-stack fa-lg">
  					<i class="fa fa-circle fa-stack-2x"></i>
					<i class="fa fa-tree fa-stack-1x fa-inverse"></i>
				</span>
				<span class="sec_title">Environment</span>
				</a>
			</li>
			<li>
				<a href="#living">
				<span class="fa-stack fa-lg">
  					<i class="fa fa-circle fa-stack-2x"></i>
					<i class="fa fa-home fa-stack-1x fa-inverse"></i>
				</span>
				<span class="sec_title">Households and living</span>
				</a>
			</li>
		</ul>
	</div>
</div> <!-- end of Navigation -->

<section class="row viz-section" id="demographic">
	<div class="container">
		<h4 class="section_title">Demographics</h4>
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
		<h4 class="section_title">Government</h4>

		<div class="row chart_wrapper st_chart only_st">
			<div id="st_election_2015"></div>
		</div>

		<div class="row chart_wrapper union_chart only_union">
			<div class="row chart_wrapper">
				<div class="eight columns">
					<h3>Amyotha Hluttaw (Upper House), 2015 Election (Breakdown by seat)</h3>
					<img src="<?php echo plugins_url(); ?>/wp-odm_dash/images/UnionAmyoTha2015.svg" alt="2015 AmyoTha Hluttaw" style="width:80%">
					<div class="seating_legend">
						<div class="single_legend">
							<span class="circle" style="background:#1DE9B6;"></span>
							56 seats : Military
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#CA0A0A;"></span>
							135 seats : National League for Democracy
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#119134"></span>
							12 seats : Union Solidatory and Development Party
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#48F000"></span>
							3 seats : Shan Nationalities League for Democracy
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#179AFF"></span>
							10 seats : Arakan National Party
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#EE7137"></span>
							1 seat : Ta'Arng (Palaung) National Party
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#801CE6"></span>
							1 seat : Pao National Organization
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#CD42CD"></span>
							2 seats : Zomi Congress for Democracy
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#D1C680"></span>
							1 seat : Mon National Party
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#DFBB8E"></span>
							1 seat : National Unity Party
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#F5B1F6"></span>
							2 seats : Independent
						</div>
					</div>
					<div class="resource_link">
						Data Source : <a href="https://myanmar.opendevelopmentmekong.net/dataset/?id=election-results-at-union-level" target="_blank">Union Election Commission</a>
					</div>
				</div>
				<div class="eight columns">
					<h3>Pyithu Hluttaw (Lower House), 2015 Election (Breakdown by seat)</h3>
					<img src="<?php echo plugins_url(); ?>/wp-odm_dash/images/UnionPyiThu2015.svg" alt="2015 PyiThu Hluttaw" style="width:80%">
					<div class="seating_legend">
						<div class="single_legend">
							<span class="circle" style="background:#1DE9B6;"></span>
							110 seats : Military
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#CA0A0A;"></span>
							255 seats : National League for Democracy
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#119134"></span>
							30 seats : Union Solidatory and Development Party
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#48F000"></span>
							12 seats : Shan Nationalities League for Democracy
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#179AFF"></span>
							12 seats : Arakan National Party
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#EE7137"></span>
							3 seats : Ta'Arng (Palaung) National Party
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#801CE6"></span>
							3 seats : Pao National Organization
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#CD42CD"></span>
							2 seats : Zomi Congress for Democracy
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#171EBA"></span>
							2 seats : Lisu National Development Party
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#D0E483"></span>
							1 seat : Kachin State Democracy Party
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#46AE94"></span>
							1 seat : Wa Democratic Party
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#B79F8E"></span>
							1 seat : Independent
						</div>
						<div class="single_legend">
							<span class="circle" style="background:#84C666"></span>
							7 seats : Cancelled
						</div>
					</div>
					<div class="resource_link">
						Data Source : 
						<a href="https://myanmar.opendevelopmentmekong.net/dataset/?id=election-results-at-union-level" target="_blank">Union Election Commission</a>
					</div>
				</div>
			</div>
		</div>

		<div class="row chart_wrapper union_chart st_chart">
			<h5 style="font-size:20px;margin:20px 0px;text-align:center;">Adminstration</h5>
			<div id="adminstration_list"></div>
			<div class="resource_link" style="clear:both;">
				Data source : 
				<a href="https://myanmar.opendevelopmentmekong.net/dataset/?id=ministers-in-myanmar" target="_blank">Myanmar president office website, Open Myanmar Initiative</a>
			</div>
		</div>

		<div class="row chart_wrapper ts_chart">
			<div id="election_lower_2015"></div>
			<div id="election_lower_2012"></div>
			<div id="election_lower_2010"></div>
		</div>
	</div>
</section> <!-- END OF GOVERMENT SECTION -->

<!-- ECONOMY AND INDUSTRIES -->
<div class="row" id="economy">
	<div class="container">
		<h4 class="section_title">Economy and industry</h4>
		<div class="row chart_wrapper st_chart union_chart">
			<div id="revenue_expenditure" class="normal_chart"></div>
		</div>
		<div class="row chart_wrapper">
			<div id="labour_usual_activity_10ab" class="normal_chart full-width-charts" style="height:auto;margin-top: 50px;"></div>
			<div class="note-text">* Right click to go up one level.</div>
		</div>
	</div>
</div> <!-- END OF ECONOMY AND INDUSTRIES -->

<!-- EDUCATION -->
<div class="row viz-section even" id="education">
	<div class="container">
		<h4 class="section_title">Education</h4>
		<!-- <div class="row chart_wrapper">
			<div id="lit_rate" style="height:500px;"></div>
		</div> -->
		<h2>Literacy rate</h2>
		<div class="row chart_wrapper">
			<div class="eight columns">
				<div id="lit_rate_overall_pie" class="normal_chart"></div>
			</div>
			<div class="eight columns">
				<div id="lit_rate_overall_gender" class="normal_chart"></div>
			</div>
		</div>
		<div class="row chart_wrapper">
			<div class="eight columns">
				<div id="lit_rate_urban_pie" class="normal_chart"></div>
			</div>
			<div class="eight columns">
				<div id="lit_rate_urban_gender" class="normal_chart"></div>
			</div>
		</div>
		<div class="row chart_wrapper">
			<div class="eight columns">
				<div id="lit_rate_rural_pie" class="normal_chart"></div>
			</div>
			<div class="eight columns">
				<div id="lit_rate_rural_gender" class="normal_chart"></div>
			</div>
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

<!-- HEALTH -->
<div class="row viz-section" id="health">
	<div class="container">
		<h4 class="section_title">Health</h4>
		<div class="row chart_wrapper st_chart union_chart">
			<div class="four columns">
				<div class="text_container">
					<h5 class="label">
						Crude birth rate <br>
						<span>per 1,000 population</span>
					</h5>
					<div class="value"><span id="health_cbr"></span> </div>	
				</div>
				<div class="text_container">
					<h5 class="label">Life expectancy at birth</h5>	
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
				<div id="hospital_healthcenter" class="normal_chart full-width-charts" style="padding-top: 47px;height: 300px;">
				</div>
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
					<h5 class="label">Percent tree cover</h5>	
					<div class="value" style="color:#4CAF50;"><span id="tree_cover_percent"></span> %</div>
				</div>
				<div class="text_container">
					<h5 class="label">Tree Cover (2000)</h5>
					<div class="value" style="color:#4CAF50;"><span id="tree_cover_area"></span> Ha</div>
				</div>
				<div class="text_container">
					<h5 class="label">Tree cover gain (2001 - 2012)</h5>
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
		<h4 class="section_title">Households and living</h4>
		<div class="row chart_wrapper">
			<div class="four columns">
				<div class="text_container">
					<h5 class="label">Mean household size</h5>
					<div class="value"><span id="mean_household_size"></span></div>
				</div>
			</div>
			<div class="twelve columns">
				<div id="household_size_chart" class="normal_chart"></div>
			</div>
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

	wp_register_script('wpdash-app', plugins_url().'/wp-odm_dash/js/my-overview/app.js', array('jquery'));
	wp_enqueue_script('wpdash-app');
	wp_register_script('wpdash-chart-config', plugins_url().'/wp-odm_dash/js/my-overview/chart-config.js', array('jquery'));
	wp_enqueue_script('wpdash-chart-config');
	wp_register_script('wpdash-chart-class', plugins_url().'/wp-odm_dash/js/my-overview/chartClass.js', array('jquery'));
	wp_enqueue_script('wpdash-chart-class');
	wp_register_script('wpdash-util', plugins_url().'/wp-odm_dash/js/my-overview/util.js', array('jquery'));
	wp_localize_script('wpdash-util','dashboard', array(
		'ajax_url' => admin_url('admin-ajax.php')
	));
	wp_enqueue_script('wpdash-util');



?>

<!-- JS -->
<script src="https://d3js.org/topojson.v1.min.js"></script>

