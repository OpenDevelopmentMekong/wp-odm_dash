jQuery( document ).ready(function() {

  // ============== Variables ======================== //
  var config = {
    init_map_view : [20.081847,96.5488883],
    init_zoom_view : 5,
    tileLayer : 'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZHJhZ29udmlydXMiLCJhIjoiY2ltM3VxaTNnMDAwMXRzbTRuZTltNDJnbyJ9.AUe46-VTpFcABndWEHwR0Q',
    ts_default_style : {
      fillColor: '#c9c9c9',
      fillOpacity: 0.3,
      color:'#fff',
      weight:1
    }
  }

  var regionNameArea = jQuery('#region_name');

  var stpcodeArea = jQuery('#st_pcode');

  var tspcodeArea = jQuery('#ts_pcode');

  var totalPopulation = jQuery('#total_population')

  //Data Objects
  var chartData = {
    populationData : {},
    religionData : {}
  }

  var populationData;
  var religionData;

  var lastClickLayer;
  var lastClickLayerType;

  /* ================ Map Init Callbacks ==================== */

  L.TopoJSON = L.GeoJSON.extend({
    addData: function(jsonData) {
      if (jsonData.type === "Topology") {
        for (key in jsonData.objects) {
          geojson = topojson.feature(jsonData, jsonData.objects[key]);
          L.GeoJSON.prototype.addData.call(this, geojson);
        }
      }
      else {
        L.GeoJSON.prototype.addData.call(this, jsonData);
      }
    }
  });

  /* ========= Set to Default View Control ======= */
  var setViewControl = L.Control.extend({

    options : {
      position : 'topright'
    },
    onAdd : function(map) {
      var container = L.DomUtil.create('i', 'leaflet-control leaflet-setview-control');
      //container.innerHTML('<i class="fa fa-map-maker"></i>');
      container.onclick = function(){
        mymap.setView(config.init_map_view, config.init_zoom_view);
        MapReset();
      }
      return container;
    }

  });


  /* ======================== Initiate Map ========================================== */

  //Init
  var mymap = L.map('mymap').setView(config.init_map_view, config.init_zoom_view);

  mymap.addControl(new setViewControl());

  //Add TitleLayer
  L.tileLayer(config.tileLayer).addTo(mymap);

  var StateRegionLayer = new L.TopoJSON();
  var tsLayer = new L.TopoJSON();

  var regionLayer = L.layerGroup([
    tsLayer,
    StateRegionLayer
  ]);

  $.when(

    $.getJSON(data_resources.maps.states_regions, function(data){
      StateRegionLayer.addData(data);
      StateRegionLayer.eachLayer(styleStageRegionLayer);
    }),
    $.getJSON(data_resources.maps.township, function(data){
      tsLayer.addData(data);
      tsLayer.eachLayer(styleTSLayer);
    })

  ).then(function(){

    regionLayer.addTo(mymap);
    addSearchControl(tsLayer, 'TS');
    StateRegionLayer.bringToFront();

  });

  /* ============================= Layer Styling Callbacks ========================== */

  function styleStageRegionLayer(layer) {
    layer.setStyle({
      fillColor: getStateColors(layer.feature.properties.ST_PCODE),
      fillOpacity: 1,
      color:'#505050',
      weight:1
    });

    layer.on({
      click: onStateRegionClick,
      dblclick : onSTdbClick,
      mouseover: enterSTLayer,
      mouseout: leaveSTLayer
    });

  }

  function styleTSLayer(layer) {

    layer.setStyle(config.ts_default_style);

    layer.on({
      click: onTownshipClick,
      mouseover: enterTSLayer,
      mouseout: leaveTSLayer
    });
  }

  function getStateColors(prop) {
    return prop == 'MMR001' ? '#F44336' :
           prop == 'MMR002' ? '#E91E63' :
           prop == 'MMR003' ? '#9C27B0' :
           prop == 'MMR004' ? '#673AB7' :
           prop == 'MMR005' ? '#3F51B5' :
           prop == 'MMR006' ? '#2196F3' :
           prop == 'MMR111' ? '#03A9F4' :
           prop == 'MMR007' ? '#0288D1' :
           prop == 'MMR008' ? '#607D8B' :
           prop == 'MMR009' ? '#009688' :
           prop == 'MMR010' ? '#4CAF50' :
           prop == 'MMR011' ? '#8BC34A' :
           prop == 'MMR012' ? '#CDDC39' :
           prop == 'MMR013' ? '#FFEB3B' :
           prop == 'MMR222' ? '#00BCD4' :
           prop == 'MMR014' ? '#FFC107' :
           prop == 'MMR015' ? '#FF9800' :
           prop == 'MMR016' ? '#FF5722' :
           prop == 'MMR017' ? '#795548' :
           prop == 'MMR018' ? '#9E9E9E' :
          '#C9C9C9';
  }


  /* =============================== Map Action Callbacks =========================== */

  /* ======= Click ========= */

  function MapReset() {

    resetClickStyles();

    jQuery('.ts_chart').hide();
    jQuery('.st_chart').show();

    jQuery('#environment_nav').show();
    jQuery('#environment').show();
    jQuery('#living').removeClass('even');

    regionNameArea.text("Myanmar");
    stpcodeArea.text("MMR");
    assignLastClickLayer("{}", '');

    unionLevelCharts();

  }

  function onStateRegionClick(e) {

      jQuery('.ts_chart').hide();
      jQuery('.st_chart').show();

      jQuery('#environment_nav').show();
      jQuery('#environment').show();
      jQuery('#living').removeClass('even');

      resetClickStyles();
      this.setStyle({weight:3});

      var regionName = this.feature.properties.ST;
      regionNameArea.text(regionName);
      var ST_PCODE = this.feature.properties.ST_PCODE;
      mymap.addLayer(tsLayer);
      stpcodeArea.text(ST_PCODE);

      jQuery('#pcode_wrapper').show();

      assignLastClickLayer(e.target, 'ST');

      setTimeout(function(){
        stLevelCharts(ST_PCODE);
      }, 300);
  }

  function onSTdbClick(e) {
    mymap.setView(e.latlng, 7);
  }

  function assignLastClickLayer(layer, type) {
    lastClickLayer = layer;
    lastClickLayerType = type;
  }

  function onTownshipClick(e) {
    resetClickStyles();
    actionOnTSLayer(this);
    assignLastClickLayer(e.target, 'TS');
  }

  function actionOnTSLayer(obj) {

    jQuery('.st_chart').hide();
    jQuery('.ts_chart').show();

    jQuery('#environment_nav').hide();
    jQuery('#environment').hide();
    jQuery('#living').addClass('even');

    obj.setStyle({fillColor: '#000', fillOpacity: 0.3, color: '#000'});

    var TSName = obj.feature.properties.TS;
    regionNameArea.text(TSName).append(" (" + obj.feature.properties.ST + ")");

    
    var ts_pcode = obj.feature.properties.TS_PCODE;
    tspcodeArea.text(ts_pcode);
    stpcodeArea.text(obj.feature.properties.ST_PCODE);
    jQuery('#pcode_wrapper').show();
    tsLevelCharts(ts_pcode);
  }

  function resetClickStyles() {
    if (lastClickLayer) {
      if (lastClickLayerType == 'ST') {
        lastClickLayer.setStyle({
          weight:1
        });
      } else {
        lastClickLayer.setStyle(config.ts_default_style);
      }
    }
  }

  /* ========== Zoomed ============ */

  mymap.on('zoomend', function(){

    if (mymap.getZoom() >= 6) {
      tsLayer.bringToFront();
      //mymap.addLayer(districtLayer);
    } else {
      tsLayer.bringToBack();
    }

  });

  /* =========== Hover ============= */

  var $tooltip = jQuery('#overlayregion');

  function enterSTLayer(e){
    var regionName = this.feature.properties.ST;
    $tooltip.text(regionName).show();

    this.setStyle({
      fillOpacity:0.6
    });

    /*this.bringToFront();
    */
  }

  function leaveSTLayer(e){
    leaveLayer();
    this.setStyle({
      fillOpacity:1
    });
  }

  function enterTSLayer(e){
    var regionName = this.feature.properties.TS;
    $tooltip.text(regionName).show();

    this.setStyle({
      fillOpacity:0
    });
  }

  function leaveTSLayer(e) {

    leaveLayer();

    this.setStyle({
      fillOpacity:config.ts_default_style.fillOpacity
    });

  }

  function leaveLayer(e){
    $tooltip.hide();
  }

  /* ============================ Map Control =================================== */

  /* Add Search Control in Map */
  function addSearchControl(layer, propertyName) {
    //Search Control
    var searchControl = new L.Control.Search({
      container: 'dash_search_box',
      layer: layer,
      propertyName: propertyName,
      //initial: false,
      position:'topright',
      circleLocation: false,
      collapsed: false,
      moveToLocation: function(latlng, title, map) {
        //map.fitBounds( latlng.layer.getBounds() );
        var zoom = mymap.getBoundsZoom(latlng.layer.getBounds());
          mymap.setView(latlng, zoom - 1); // access the zoom
      }
    });

    searchControl.on('search_locationfound', function(e) {

      e.layer.setStyle({fillColor: '#000', fillOpacity: 0.3, color: '#000'});
      actionOnTSLayer(e.layer);

      resetClickStyles();
      
      assignLastClickLayer(e.layer, 'TS');
      /*if(e.layer._popup)
        e.layer.openPopup();*/

    }).on('search_collapsed', function(e) {

      tsLayer.eachLayer(function(layer) { //restore feature color
        tsLayer.resetStyle(layer);
      });
    });

    mymap.addControl(searchControl);

    jQuery('#dash_search_box input.search-input').attr("placeholder","Search for Township...");
  }

  /* ============================= GOOGLE CHART ================================== */

  google.charts.load('current', {'packages':['corechart', 'table', 'treemap']});
  google.charts.setOnLoadCallback(initChart);

  function initChart() {

    unionLevelCharts();

  }

  function unionLevelCharts() {

    unionSTCharts("MMR");

  }

  function stLevelCharts(pcode) {

    unionSTCharts(pcode);

  }

  function unionSTCharts(pcode) {

    ReligionChart.init(pcode);
    PopulationPyramid.init(pcode);
    STHealthEducation.init(pcode);
    STHouseHoldChart.init(pcode);
    PopulationOverYear.init(pcode);
    RevenueExpenditure.init(pcode);

  }

  function tsLevelCharts(PCODE) {

    TSHouseHoldChart.init(PCODE);
    ElectionTSLevel2010.init(PCODE);
    ElectionTSLevel2012.init(PCODE);
    ElectionTSLevel2015.init(PCODE);
    TSHealthEducation.init(PCODE);

  }

  // =========================== CHARTS ================================ //

  var STHealthEducation = new ODChart(chartconfig.st_health_education);

  var TSHealthEducation = new ODChart(chartconfig.ts_health_education);

  var TSHouseHoldChart = new ODChart(chartconfig.ts_household);

  var STHouseHoldChart = new ODChart(chartconfig.st_household);

  var ReligionChart = new ODChart(chartconfig.st_religion);

  var PopulationOverYear = new ODChart(chartconfig.population_over_year);

  var ElectionTSLevel2010 = new ElectionPartyChart(chartconfig.election_result_lower_2010);

  var ElectionTSLevel2012 = new ElectionPartyChart(chartconfig.election_result_lower_2012);

  var ElectionTSLevel2015 = new ElectionPartyChart(chartconfig.election_result_lower_2015);

  var RevenueExpenditure = new ODChart(chartconfig.revenue_expenditure);


  // ================ Population Pyramid ================== //

  var PopulationPyramidData;

  var PopulationPyramid = {
    init : function(pcode) {
      pcode = pcode || "MMR"
      PopulationPyramidData = prepareDataTable(charts.st_population.columns);

      PopulationPyramid.getData(pcode).done(function(data){
        PopulationPyramid.processAfterData(data.result.records);
      });
    },
    getData : function (pcode) {
      return $.ajax({
        url : data_resources.base_url,
        headers : {
          Authorization : data_resources.api_key
        },
        data : {
          resource_id : data_resources.state_region_pop_age_gp.id,
          filters : '{"pop_type" : "Total_population", "State_Region Pcode" : "'+ pcode +'"}'
        },
        dataType : 'json'
      })
    },
    processAfterData : function(data) {

      var f_data = PopulationPyramid.processData(data);

      //PopulationPyramidData.addRows(f_data);

      var p_config = charts.st_population;

      var formatter = new google.visualization.NumberFormat({
                      pattern: ';'
                  });

      formatter.format(PopulationPyramidData, 1);

      googleChart.draw(p_config.chart_type, document.getElementById(p_config.container_id), PopulationPyramidData, p_config.chart_options);

    },
    processData : function(data) {

      var MaleData;
      var FemaleData;

      var results = [];

      $.map(data, function(value, index){
        if(value.Gender == "Male") {
          MaleData = value;
        }
        if (value.Gender == "Female") {
          FemaleData = value;
        }
      });

      $.map(charts.st_population.fields, function(value, index){
        PopulationPyramidData.addRow([value, -parseInt(MaleData[value]), parseInt(FemaleData[value])]);
        //results.push([value, -parseInt(MaleData[value]), parseInt(FemaleData[value])]);
      });

      //return results;

    }
  };

  function prepareDataTable(columns) {

    var dataTable = new google.visualization.DataTable();
    $.map(columns, function(value, index){
      dataTable.addColumn(value, index);
    });

    return dataTable;

  }


  /* ======= LOADING =========== */

  /*jQuery( document ).ajaxStart(function() {
    $.LoadingOverlay("show");
  });

  jQuery( document ).ajaxComplete(function() {
    $.LoadingOverlay("hide");
  });*/

  /*
  function downloadButton(link) {

    return '<a href="'+ link +'" class="button button-primary data_download"><i class="fa fa-download"> Download Data</a>';

  }

  function showDataButton(link) {

    return '<a href="'+ link +'" class="button button-primary data_download"><i class="fa fa-database"> Show Data</a>';

  }

  jQuery('.show_chart_data').on('click', function(e){

    e.preventDefault();
    if (jQuery(this).hasClass('showing')) {
      jQuery(this).removeClass('showing');
      jQuery(this).parent().siblings('.data_table').hide();
      jQuery(this).find('span').text('Show Data');
    } else {
      jQuery(this).addClass('showing');
      jQuery(this).parent().siblings('.data_table').show();
      jQuery(this).find('span').text('Hide Data');
    }

  });
  */

});
