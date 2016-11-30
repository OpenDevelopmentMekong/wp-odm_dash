
<div id="ckan-stats-taxonomy"
  <?php
  if (isset($atts['type'])):
    echo 'data-type="' . $atts['type'] . '"';
  endif; ?>
  data-current-country-code="<?php echo odm_country_manager()->get_current_country_code(); ?>"
  data-ckan-domain="<?php echo wpckan_get_ckan_domain(); ?>" style="width: 100%; height: 200px;"
  style="width: 100%; height: 200px;">
</div>

<script type="text/javascript">
	google.charts.load("current", {packages:["corechart"]});
	google.charts.setOnLoadCallback(drawChart);

	function getNumberOfRecordsByTaxonomy(taxonomy){
		var ckan_domain = $('#ckan-stats-taxonomy').data('ckan-domain');
    var current_country_code = $('#ckan-stats-taxonomy').data('current-country-code');
		var request_url = ckan_domain + '/api/3/action/package_search?fq=extras_taxonomy:"' + taxonomy + '"';
    var type = $('#ckan-stats-taxonomy').data('type');

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
			['Topic', 'Number of records', { role: 'style' }],
			['Agriculture and fishing',     						getNumberOfRecordsByTaxonomy('Agriculture and fishing'), 'color: #c8c8c8'],
			['Aid and development',     								getNumberOfRecordsByTaxonomy('Aid and development'), 'color: #c8c8c8'],
			['Disasters and emergency response',     		getNumberOfRecordsByTaxonomy('Disasters and emergency response'), 'color: #c8c8c8'],
			['Economy and commerce',     								getNumberOfRecordsByTaxonomy('Economy and commerce'), 'color: #c8c8c8'],
			['Energy',     															getNumberOfRecordsByTaxonomy('Energy'), 'color: #c8c8c8'],
			['Environment and natural resources',     	getNumberOfRecordsByTaxonomy('Environment and natural resources'), 'color: #c8c8c8'],
			['Extractive industries',     							getNumberOfRecordsByTaxonomy('Extractive industries'), 'color: #c8c8c8'],
			['Government',     													getNumberOfRecordsByTaxonomy('Government'), 'color: #c8c8c8'],
			['Industries',     													getNumberOfRecordsByTaxonomy('Industries'), 'color: #c8c8c8'],
			['Infrastructure',     											getNumberOfRecordsByTaxonomy('Infrastructure'), 'color: #c8c8c8'],
			['Labor',     															getNumberOfRecordsByTaxonomy('Labor'), 'color: #c8c8c8'],
			['Land',     																getNumberOfRecordsByTaxonomy('Land'), 'color: #c8c8c8'],
			['Law and judiciary',     									getNumberOfRecordsByTaxonomy('Law and judiciary'), 'color: #c8c8c8'],
			['Population and censuses',     						getNumberOfRecordsByTaxonomy('Population and censuses'), 'color: #c8c8c8'],
			['Social development',     									getNumberOfRecordsByTaxonomy('Social development'), 'color: #c8c8c8'],
			['Urban administration and development',    getNumberOfRecordsByTaxonomy('Urban administration and development'), 'color: #c8c8c8'],
			['Science and technology',     							getNumberOfRecordsByTaxonomy('Science and technology'), 'color: #c8c8c8']
		]);

		var options = {
      title: "Number of records by topic",
      legend: { position: "none" }
    };

		var chart = new google.visualization.ColumnChart(document.getElementById('ckan-stats-taxonomy'));
		chart.draw(data, options);
	};

</script>
