
<div id="ckan-stats-language"
  <?php
  if (isset($atts['type'])):
    echo 'data-type="' . $atts['type'] . '"';
  endif; ?>
  data-current-country-code="<?php echo odm_country_manager()->get_current_country_code(); ?>"
  data-ckan-domain="<?php echo wpckan_get_ckan_domain(); ?>"
  style="width: 100%; height: 200px;">
</div>

<script type="text/javascript">
	google.charts.load("current", {packages:["corechart"]});
	google.charts.setOnLoadCallback(drawChart);

	function getNumberOfRecordsByLanguage(language){
		var ckan_domain = $('#ckan-stats-language').data('ckan-domain');
    var current_country_code = $('#ckan-stats-language').data('current-country-code');
		var request_url = ckan_domain + '/api/3/action/package_search?fq=extras_odm_language:' + language;
    var type = $('#ckan-stats-language').data('type');

    if (current_country_code !== 'mekong'){
      request_url = request_url + '+extras_odm_spatial_range:' + current_country_code;
    }

    if (type){
      request_url = request_url + '+type:' + type;
    }

    console.log(request_url);

		var request = new XMLHttpRequest();
		request.open('GET', request_url, false);  // `false` makes the request synchronous
		request.send(null);

		if (request.status === 200) {
		  var json_response = JSON.parse(request.responseText);
			return json_response['result']['count'];
		}
	};

	function drawChart() {

		var data = google.visualization.arrayToDataTable([
			['Dataset language', 'Number of records', { role: 'style' }],
			['English',     		getNumberOfRecordsByLanguage('en'), 'color: #c8c8c8'],
			['Khmer',	          getNumberOfRecordsByLanguage('km'), 'color: #c8c8c8'],
			['Vietnamese',  	  getNumberOfRecordsByLanguage('vi'), 'color: #c8c8c8'],
			['Lao',  	          getNumberOfRecordsByLanguage('la'), 'color: #c8c8c8'],
			['Burmese',  	      getNumberOfRecordsByLanguage('mm'), 'color: #c8c8c8'],
			['Thai',  	        getNumberOfRecordsByLanguage('th'), 'color: #c8c8c8']
		]);

		var options = {
      title: "Number of records by language",
      legend: { position: "none" }
    };

		var chart = new google.visualization.BarChart(document.getElementById('ckan-stats-language'));
		chart.draw(data, options);
	};

</script>
