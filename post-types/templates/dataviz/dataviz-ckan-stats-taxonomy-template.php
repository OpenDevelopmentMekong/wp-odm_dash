
<div id="ckan-stats-taxonomy" data-current-country-code="<?php echo odm_country_manager()->get_current_country_code(); ?>" data-ckan-domain="<?php echo wpckan_get_ckan_domain(); ?>" style="width: 100%; height: 200px;"></div>

<script type="text/javascript">
	google.charts.load("current", {packages:["corechart"]});
	google.charts.setOnLoadCallback(drawChart);

	function getNumberOfRecordsByTaxonomy(taxonomy){
		var ckan_domain = $('#ckan-stats-taxonomy').data('ckan-domain');
    var current_country_code = $('#ckan-stats-taxonomy').data('current-country-code');
		var request_url = 'https://data.opendevelopmentmekong.net' + '/api/3/action/package_search?fq=extras_taxonomy:"' + taxonomy + '"';

    if (current_country_code !== 'mekong'){
      request_url = 'https://data.opendevelopmentmekong.net' + '/api/3/action/package_search?fq=extras_taxonomy:"' + taxonomy + '"+extras_odm_spatial_range:' + current_country_code;
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
			['Topic', 'Number of records'],
			['Agriculture and fishing',     						getNumberOfRecordsByTaxonomy('Agriculture and fishing')],
			['Aid and development',     								getNumberOfRecordsByTaxonomy('Aid and development')],
			['Disasters and emergency response',     		getNumberOfRecordsByTaxonomy('Disasters and emergency response')],
			['Economy and commerce',     								getNumberOfRecordsByTaxonomy('Economy and commerce')],
			['Energy',     															getNumberOfRecordsByTaxonomy('Energy')],
			['Environment and natural resources',     	getNumberOfRecordsByTaxonomy('Environment and natural resources')],
			['Extractive industries',     							getNumberOfRecordsByTaxonomy('Extractive industries')],
			['Government',     													getNumberOfRecordsByTaxonomy('Government')],
			['Industries',     													getNumberOfRecordsByTaxonomy('Industries')],
			['Infrastructure',     											getNumberOfRecordsByTaxonomy('Infrastructure')],
			['Labor',     															getNumberOfRecordsByTaxonomy('Labor')],
			['Land',     																getNumberOfRecordsByTaxonomy('Land')],
			['Law and judiciary',     									getNumberOfRecordsByTaxonomy('Law and judiciary')],
			['Population and censuses',     						getNumberOfRecordsByTaxonomy('Population and censuses')],
			['Social development',     									getNumberOfRecordsByTaxonomy('Social development')],
			['Urban administration and development',    getNumberOfRecordsByTaxonomy('Urban administration and development')],
			['Science and technology',     							getNumberOfRecordsByTaxonomy('Science and technology')]
		]);

		var options = {
      title: "Number of datasets by topic",
      legend: { position: "none" }
    };

		var chart = new google.visualization.ColumnChart(document.getElementById('ckan-stats-taxonomy'));
		chart.draw(data, options);
	};

</script>
