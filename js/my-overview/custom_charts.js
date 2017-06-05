// ============================== Election Class ==================== //
// *** Later need to extend from ODChart **** 

function ElectionPartyChart(config) {

  var self = this;
  this.config = config; // Chart Resources and Config
  this.resource = this.config.resource;
  this.charts = this.config.charts;

  this.init = function(pcode) {

    this.getData(pcode).done(function(data){

      self.processAfterData(data,false);

    });
  };

  this.getData = function(pcode) {
    var ajax_opt = {
      url: ckan_api_url,
      data: {
        resource_id : this.resource.id,
        filters : '{"'+ this.resource.filters.pcode +'":"'+ pcode +'"}',
        sort : this.resource.sort_by
      },
      dataType: 'json'
    };

    //Assign Authorization Header if resource is Private
    if(config.resource.private) {
      ajax_opt.headers = {
        Authorization : ckan_api_key
      };
    }

    return $.ajax(ajax_opt);

  };

  this.processAfterData = function(data) {

      $.map(self.charts, function(value, index){

        if (data.result.records.length > 0) {

          $('#'+value.container_id).show();

          var sorted = self.sortResults(data.result.records, self.resource.sort_by);

          self.prepareChart(sorted, value);

          self.addDataSourceLink(value);

        } else {

          $('#'+value.container_id).hide();

        }

      }); 

  };

  this.addDataSourceLink = function(value) {
    if (self.resource.dataset_id !== undefined) {
      var dataset_url = data_source_url + '?id=' + self.resource.dataset_id;
      jQuery('#'+value.container_id).append('<div class="resource_link">Data Source : <a href="'+ dataset_url +'" target="_blank">'+ self.resource.resource_title +'</a></div>');
    }
  };

  this.prepareChart = function(data, chart_conf) {

    var columns = ['Year'];
    var values = [chart_conf.columns['Y-value']];
    var colors = [];

    $.map(data, function(value, index){
      if (value[chart_conf.fields.value] > 0) {
        columns.push(value[chart_conf.fields.party]);
        values.push(parseInt(value[chart_conf.fields.value]));
        colors.push(self.getPartyColor(value[chart_conf.fields.party]));  
      }
    });

    if (columns.length > 1) {
      var f_data = [columns, values];

      chart_conf.chart_options.colors = colors;
      
      chart_conf.ChartData = new google.visualization.arrayToDataTable(f_data);

      googleChart.draw(chart_conf.chart_type, document.getElementById(chart_conf.container_id), chart_conf.ChartData, chart_conf.chart_options);
    }

  };

  this.sortResults = function(data, prop, asc) {

    return data.sort(function(a, b) {
        var x = parseInt(b[prop]);
        var y = parseInt(a[prop]);
        if (asc) {
            return (y > x) ? 1 : ((y < x) ? -1 : 0);
        } else {
            return (x > y) ? 1 : ((x < y) ? -1 : 0);
        }
    });

  };

  this.getPartyColor = function(partyname) {

    colors = ['#E91E63', 
              '#9C27B0', 
              '#673AB7', 
              '#2196F3',
              '#03A9F4',
              '#607D8B',
              '#009688',
              '#8BC34A',
              '#CDDC39',
              '#00BCD4',
              '#FFC107',
              '#FF9800',
              '#FF5722',
              '#795548'
              ];
    return partyname == 'National League for Democracy' ? '#F44336' : 
           partyname == 'Union Solidarity And Development Party' ? 'green'  :
           partyname == 'Union Solidarity and Development Party' ? 'green' :
           partyname == 'Shan Nationalities Democratic Party' ? '#4CAF50' :
           partyname == 'National Democratic Force' ? '#3F51B5' :
           partyname == 'National Unity Party' ? '#FFEB3B' :
           partyname == 'National Unity Party (NUP)' ? '#FFEB3B' :
           partyname == 'Rakhine Nationals Development Party' ? '#9E9E9E' : 
           partyname == 'Arakan National Party' ? '#0288D1' :
          colors[Math.floor(Math.random() * colors.length)];
  };

}

// ================ Population Pyramid ================== //

var PopulationPyramidData;

var PopulationPyramid = {
  init : function(pcode) {
    pcode = pcode || "MMR"
    PopulationPyramidData = prepareDataTable(charts.st_population.columns);

    PopulationPyramid.getData(pcode).done(function(data){
      PopulationPyramid.processAfterData(data.result.records,false);
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
    
    var pp_region_name = (data[0].name == 'Union') ? 'Myanmar' : data[0].name;

    var p_config = charts.st_population;

    var formatter = new google.visualization.NumberFormat({
                    pattern: ';'
                });
    p_config.chart_options.title = "Population Pyramid of " + pp_region_name;

    formatter.format(PopulationPyramidData, 1);

    googleChart.draw(p_config.chart_type, document.getElementById(p_config.container_id), PopulationPyramidData, p_config.chart_options);

    var resource_link = data_source_url + '?id=7bc0cabc-3c01-44fe-ba30-943a360c56fb';

    var resource_title = '2014 Myanmar Population and Housing Census';

    jQuery('#'+p_config.container_id).append('<div class="resource_link">Data Source : <a href="'+ resource_link +'" target="_blank">'+ resource_title +'</a></div>');

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

    var row_count = PopulationPyramidData.getNumberOfRows();
    if (row_count > 0) {
      PopulationPyramidData.removeRows(0, row_count);
    }

    $.map(charts.st_population.fields, function(value, index){
      PopulationPyramidData.addRow([value, -parseInt(MaleData[index]), parseInt(FemaleData[index])]);
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

// ============== Minister List ================= //

var MinisterList = {
  init: function(pcode) {

    $.ajax({
      url : data_resources.base_url,
      data : {
        resource_id : data_resources.adminstration_list.id,
        filters : '{"pcode_st" : "'+ pcode +'"}',
        sort : 'order'
      },
      dataType : 'json'
    }).done(function(data){

      var container = jQuery('#adminstration_list');

      var list = jQuery('<ul>');

      jQuery.map(data.result.records, function(value, index){

        //Ministry Name
        if (value['website'].length > 0) {
          var minsitry_name = '<a href="http://'+ value['website'] +'" target="_blank">'+ value.ministry +'</a>'; 
        } else {
          var minsitry_name = value.ministry;
        }

        //Minister Name
        if (value['more_info'].length > 0) {
          var minister_name = '<a href="'+ value['more_info'] +'" target="_blank"><strong>'+ value.name +'</strong></a>'; 
        } else {
          var minister_name = value.name;
        }

        var minister_info = '<div class="ministry_val">'+ minsitry_name +'</div>' +
                            '<div class="minister_name" style="font-weight:bold;">'+ minister_name +'</div>' + 
                            '<div class="minister_pos">'+ value.position +'</div>'; 

        var minister_item = jQuery('<li>')
                .addClass('four columns')
                .append(minister_info);

        list.append(minister_item);

      });

      container.html(list);
    });

  }
};