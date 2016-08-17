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
		<div class="row">
			<div class="five columns" id="mapwrapper">
				<div id="dash_search_box"></div>
				<div id="mymap"></div>
				<span id="overlayregion"></span>
			</div>
			<div class="seven columns" id="overviewInfo">
				<h3 id="region_name">Myanmar</h3>
				<p id="pcode_wrapper">PCode - <span id="region_pcode"></span></p>
				<h5>Total Population : <span id="total_population"></span></h5>
				<h5>Area : <span id="region_area"></span> km<sup>2</sup></h5>
				<h5>Number of Wards : <span id="wards_num"></span></h5>
				<h5>Number of Village Tracts : <span id="village_tracts_num"></span></h5>
				<h5>Number of Villages : <span id="villages_num"></span></h5>
			</div>
		</div>
	</div>
	<div class="row" id="viz_nav_wrapper">
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
				<li>
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
	</div>

	<div class="row viz-section" id="demographic">
		<div class="container">
			<h4>Demographic</h4>
			<div class="row char_wrapper st_chart">
				<div id="st_population_pyramid" style="height:600px;"></div>
			</div>
			<div class="row chart_wrapper st_chart">
				<div id="pop_over_year" class="normal_chart"></div>
			</div>
			<div class="row chart_wrapper">
				<div class="six columns">
					<div id="population_u_r" class="normal_chart"></div>
				</div>
				<div class="six columns">
					<div id="population_gender" class="normal_chart"></div>
				</div>
			</div>
			<div class="row chart_wrapper">
				<div class="six columns">
					<div id="m_f_headed_household" class="normal_chart"></div>
				</div>
				<div class="six columns st_chart">
					<div id="religion_chart" class="normal_chart"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="row viz-section even" id="goverment">
		<div class="container">
			<h4>Goverment</h4>
			<div class="row chart_wrapper ts_chart">
				<div id="election_lower_2010"></div>
				<div id="election_lower_2012"></div>
				<div id="election_lower_2015"></div>
			</div>
		</div>
	</div>
	<div class="row viz-section" id="education">
		<div class="container">
			<h4>Education</h4>
			<div class="row chart_wrapper">
				<div class="six columns">
					<div id="lit_gender_ratio" class="normal_chart"></div>
				</div>
				<div class="six columns">
					<div id="illit_gender_ratio" class="normal_chart"></div>
				</div>
			</div>
			<div class="row chart_wrapper">
				<div class="six columns">
					<div id="school_chart" class="normal_chart"></div>
				</div>
				<div class="six columns">
					<div id="student_chart" class="normal_chart"></div>
				</div>
			</div>
			<div class="row chart_wrapper">
				<div class="six columns">
					<div id="teacher_chart" class="normal_chart"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="row viz-section even" id="economy">
		<div class="container">
			<h4>Economy & Industries</h4>
			<div class="row chart_wrapper ts_chart">
				<div id="labour_usual_activity_10ab" class="normal_chart" style="height:auto;"></div>
				<div class="note-text">* Left click on parent section to go up one level.</div>
			</div>
		</div>
	</div>
	<div class="row viz-section" id="health">
		<div class="container">
			<h4>Health</h4>
			<div class="row chart_wrapper">
				<div class="six columns">
					<div id="medical_worker" class="normal_chart"></div>
				</div>
				<div class="six columns">
					<div id="hospital_healthcenter" class="normal_chart"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="row viz-section even" id="environment">
		<div class="container">
			<h4>Environment</h4>
		</div>
	</div>
	<div class="row viz-section" id="living">
		<div class="container">
			<h4>Households & Living</h4>
			<div class="row chart_wrapper">
				<div id="household_size_chart" class="normal_chart"></div>
				<h5>Mean Household Size : <span id="mean_household_size"></span></h5>
			</div>
			<div class="row chart_wrapper">
				<div class="six columns">
					<div id="household_ownership" class="normal_chart"></div>
				</div>
				<div class="six columns">
					<div id="household_light" class="normal_chart"></div>
				</div>
			</div>
			<div class="row chart_wrapper">
				<div class="six columns">
					<div id="household_com" class="normal_chart"></div>
				</div>
				<div class="six columns">
					<div id="household_trans" class="normal_chart"></div>
				</div>
			</div>
		</div>
	</section>
<!-- JS -->
<script src="http://d3js.org/topojson.v1.min.js"></script>
<!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDBWFsA9Qk3_-_FiwWT3d38WHbXkIZ9EkE&callback=initMap"></script>
<script src="leaflet-google.js"></script> -->

<!-- Google Chart -->
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

<?php endif; ?>

<?php get_footer(); ?>
