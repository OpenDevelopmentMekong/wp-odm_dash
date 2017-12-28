
<div id="ckan-stats-taxonomy"
  <?php
  if (isset($atts['type'])):
    echo 'data-type="' . $atts['type'] . '"';
  endif; ?>
  data-current-country-code="<?php echo odm_country_manager()->get_current_country_code(); ?>"
  data-ckan-domain="<?php echo wpckan_get_ckan_domain(); ?>" style="width: 100%; height: 200px;"
  style="width: 100%; height: 200px;">
</div>

<div id="ckan-stats-filter"></div>

<script type="text/javascript">
  	
	function drawChart() {
    
    var country_code = $('#ckan-stats-taxonomy').data('current-country-code')
    var taxonomy_definition_url = "stats/records_by_taxonomy_" + country_code + ".json";  
        
    $.ajax({
       type: 'GET',
       url: taxonomy_definition_url,
       dataType:'jsonp',
       jsonpCallback: function(data) {
        
        console.log("success");
        console.log(data);
        
        var chartData = new google.visualization.DataTable();
        chartData.addColumn('string', 'Topic');
        chartData.addColumn('string', 'Parent');
        chartData.addColumn('number', 'Number of records');
        chartData.addRows(data["config"]);
       
     		var options = {
          legend: { position: "none" },
          highlightOnMouseOver: true
        };

     		var chart = new google.visualization.TreeMap(document.getElementById('ckan-stats-taxonomy'));     		
        
        function selectHandler() {
          var selectedItem = chart.getSelection()[0];
          if (selectedItem) {
            var value = chartData.getValue(selectedItem.row, 0);            
            $('#ckan-stats-filter').html('<p>Filter only records about  <a href="?query=&taxonomy=' + encodeURIComponent(value) + '">' + value + '</a></p>')
          }
        }
        
        google.visualization.events.addListener(chart, 'select', selectHandler);
        chart.draw(chartData, options);
      
       },
       error: function(error){
         console.log("error", error);
       },
       async: false
   }); 
   
	};
  
  $(document).ready(function() {
    google.charts.load("current", {packages:["treemap"]});
    google.charts.setOnLoadCallback(drawChart);
  });

</script>
