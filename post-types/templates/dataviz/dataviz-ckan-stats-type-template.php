
<div id="ckan-stats-type"
  data-current-country-code="<?php echo odm_country_manager()->get_current_country_code(); ?>"
  data-ckan-domain="<?php echo wpckan_get_ckan_domain(); ?>"
  style="width: 100%; height: 200px;">
</div>

<script type="text/javascript">
	google.charts.load("current", {packages:["corechart"]});
	google.charts.setOnLoadCallback(drawChart);

	function getNumberOfRecordsByType(type){
		var ckan_domain = $('#ckan-stats-type').data('ckan-domain');
    var current_country_code = $('#ckan-stats-type').data('current-country-code');
		var request_url = 'https://data.opendevelopmentmekong.net' + '/api/3/action/package_search?fq=type:' + type;

    if (current_country_code !== 'mekong'){
      request_url = request_url + '+extras_odm_spatial_range:' + current_country_code;
    }

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
			['Dataset type', 'Number of records', { role: 'style' }],
			['Datasets',     		getNumberOfRecordsByType('dataset'), 'color: #c8c8c8'],
			['Library records',	getNumberOfRecordsByType('library_record'), 'color: #c8c8c8'],
			['Laws records',  	getNumberOfRecordsByType('laws_record'), 'color: #c8c8c8']
		]);

		var options = {
      title: "Number of records by type",
      legend: { position: "none" }
    };

		var chart = new google.visualization.BarChart(document.getElementById('ckan-stats-type'));
		chart.draw(data, options);
	};

</script>
