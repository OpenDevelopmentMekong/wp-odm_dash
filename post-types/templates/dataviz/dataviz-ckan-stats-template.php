
<div id="ckan-stats" data-ckan-domain="<?php echo wpckan_get_ckan_domain(); ?>" style="width: 100%; height: 200px;"></div>

<script type="text/javascript">
	google.charts.load("current", {packages:["corechart"]});
	google.charts.setOnLoadCallback(drawChart);
	
	function getNumberOfRecordsByType(type){
		var ckan_domain = $('#ckan-stats').data('ckan-domain');
		var request_url = 'https://data.opendevelopmentmekong.net' + '/api/3/action/package_search?fq=type:' + type;
		
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
			['Dataset type', 'Number of records'],
			['Datasets',     		getNumberOfRecordsByType('dataset')],
			['Library records',	getNumberOfRecordsByType('library_record')],
			['Laws records',  	getNumberOfRecordsByType('laws_record')]
		]);

		var options = {};
		
		var chart = new google.visualization.ColumnChart(document.getElementById('ckan-stats'));
		chart.draw(data, options);
	};
	
</script>

