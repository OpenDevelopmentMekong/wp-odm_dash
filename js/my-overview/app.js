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

  var regionNameArea = jQuery('.region_name_container');

  var parentRegionArea = jQuery('.parent_region_container');

  var stpcodeArea = jQuery('#st_pcode');

  var tspcodeArea = jQuery('#ts_pcode');

  var totalPopulation = jQuery('#total_population');

  var currentRegionProperties = 'Myanmar';

  //Data Objects
  var chartData = {
    populationData : {},
    religionData : {}
  }

  var populationData;
  var religionData;

  var lastClickLayer;
  var lastClickLayerType;

  var pcodeSearchControl;

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
        backToUnionLevel();
      }
      return container;
    }

  });


  /* ======================== Initiate Map ========================================== */

  //Init
  var mymap = L.map('mymap', {
                scrollWheelZoom : 'center',
                center : config.init_map_view,
                zoom : config.init_zoom_view
              });

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

    //Add Search by STPcode Hidden Search box
    addSTPcodeSearchControl();

  });

  function addSTPcodeSearchControl() {

    pcodeSearchControl = new L.Control.Search({
      container: 'search_by_stpcode',
      layer: StateRegionLayer,
      propertyName: 'ST_PCODE',
      circleLocation: false,
      collapsed: false,
      moveToLocation: function(latlng, title, map) {
          mymap.setView(config.init_map_view, config.init_zoom_view); // access the zoom
      }
    });

    pcodeSearchControl.on('search_locationfound', function(e) {

      e.layer.setStyle({
        fillOpacity:0.7
      });

      actionOnSTLayer(e.layer);

      resetClickStyles();
      
      assignLastClickLayer(e.layer, 'ST');
      

    }).on('search_collapsed', function(e) {

      StateRegionLayer.eachLayer(function(layer) { //restore feature color
        StateRegionLayer.resetStyle(layer);
      });

    });

     mymap.addControl(pcodeSearchControl);

  }

  function backToUnionLevel() {
    mymap.setView(config.init_map_view, config.init_zoom_view);
    MapReset();
  }

  jQuery(document).on('click', '.zoom_out_to_union', function(e){
    backToUnionLevel();
  });

  jQuery(document).on('click', '.zoom_out_to_st', function(e){

    var pcode = jQuery(this).data('stpcode');
    if (pcode == 'MMR015' || pcode == 'MMR014') { //Shan
      pcode = 'MMR222';
    } else if(pcode == 'MMR007' || pcode == 'MMR008') { //Bago
      pcode = 'MMR111';
    }
    pcodeSearchControl.searchText(pcode);
    pcodeSearchControl._handleSubmit();

  });

  /* ============================= Layer Styling Callbacks ========================== */

  function styleStageRegionLayer(layer) {
    layer.setStyle({
      fillColor: getStateColors(layer.feature.properties.ST_PCODE),
      fillOpacity: 0.3,
      color:'#505050',
      weight:1
    });

    layer.on({
      click: onStateRegionClick,
      //dblclick : onSTdbClick,
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
    jQuery('.only_st').hide();
    jQuery('.union_chart').show();

    jQuery('#environment_nav').show();
    jQuery('#environment').show();
    jQuery('#living').removeClass('even');
    parentRegionArea.html('');

    currentRegionProperties = 'Myanmar';

    regionNameArea.text("Myanmar");
    stpcodeArea.text("MMR");
    assignLastClickLayer('', '');

    unionLevelCharts();

  }

  function onStateRegionClick(e) {

      mymap.setView(e.latlng, 7);

      resetClickStyles();
      actionOnSTLayer(this);
      assignLastClickLayer(e.target, 'ST');

  }

  function actionOnSTLayer(obj) {

    jQuery('.ts_chart').hide();
    jQuery('.st_chart').show();
    jQuery('.only_union').hide();

    jQuery('#environment_nav').show();
    jQuery('#environment').show();
    jQuery('#living').removeClass('even');

    obj.setStyle({
      fillOpacity: 0.7
    });

    var regionName = obj.feature.properties.ST;
    regionNameArea.text(regionName);

    currentRegionProperties = regionName;

    var ST_PCODE = obj.feature.properties.ST_PCODE;
    mymap.addLayer(tsLayer);
    stpcodeArea.text(ST_PCODE);

    jQuery('#pcode_wrapper').show();
    parentRegionArea.html(obj.feature.properties.ST_RG + " in <strong><a class='zoom_out_to_union'>Myanmar</a></strong>");

    stLevelCharts(ST_PCODE);

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
    jQuery('.union_chart').hide();
    jQuery('.ts_chart').show();

    jQuery('#environment_nav').hide();
    jQuery('#environment').hide();
    jQuery('#living').addClass('even');

    obj.setStyle({fillColor: '#000', fillOpacity: 0.3, color: '#000'});

    var TSName = obj.feature.properties.TS;
    regionNameArea.text(TSName);

    currentRegionProperties = TSName;

    parentRegionArea.html("Township in <strong><a class='zoom_out_to_st' data-stpcode='"+ obj.feature.properties.ST_PCODE +"'>" + obj.feature.properties.ST + "</a> ,<a class='zoom_out_to_union'>Myanmar</a></strong></strong>");
    
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
          weight:1,
          fillOpacity: 0.3
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
    showTooltip(regionName);

    this.setStyle({
      weight: 3
    });

    /*this.bringToFront();
    */
  }

  function showTooltip(regionName) {
    $tooltip.text(regionName).show();
    $tooltip.css('left', event.pageX - 150);      // <<< use pageX and pageY
    $tooltip.css('top', event.pageY - 450);
    $tooltip.css('display','inline');     
  }

  function leaveSTLayer(e){
    leaveLayer();
    this.setStyle({
      weight: 1
    });
  }

  function enterTSLayer(e){
    var regionName = this.feature.properties.TS;
    showTooltip(regionName);

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

    ElectionST2015.init(pcode);

  }

  function unionSTCharts(pcode) {

    ReligionChart.init(pcode);
    PopulationPyramid.init(pcode);
    STHealthEducation.init(pcode);
    STHouseHoldChart.init(pcode);
    PopulationOverYear.init(pcode);
    RevenueExpenditure.init(pcode);
    LifeExpectancy.init(pcode);
    TreeCover.init(pcode);
    MinisterList.init(pcode);

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

  var ElectionST2015 = new ElectionPartyChart(chartconfig.state_region_election_2015);

  var RevenueExpenditure = new ODChart(chartconfig.revenue_expenditure);

  var TreeCover = new ODChart(chartconfig.tree_cover);

  var LifeExpectancy = new ODChart(chartconfig.health_life_expectancy);

});
