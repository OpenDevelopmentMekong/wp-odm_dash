/* Chart Class */
function ODChart(config) {

  /* =========== Config Structure =========== 
    
  var config = {
    resource : {
      id : 'resource_id',
      download_link : 'http:://data.opendevelopmentmekong.net/link-to-resource',
      filters : {
        pcode : 'pcode_ts',
        extra {
          'pop_type' : 'Total Population'
        }
      }
    },
    charts : {
      st_demographic : {
        container_id : 'st_demographic_chart',
        chart_type : 'bar',
        chart_options : {
          title : 'Chart Title'
        },
        columns : {
          Gender : 'string',
          Population : 'number'
        },
        fields : {
          field_1 : 'Field 1 something about',
          field_2 : 'Field 2 something about'
        }
      },
      total_population : {
        container_id : 'total_population',
        chart_type : 'text',
        field : 'pop_t'
      }
    }
  };

  =========================================== */

  var self = this;
  this.config = config; // Chart Resources and Config
  this.resource = this.config.resource;
  this.charts = this.config.charts;

  this.init = function(pcode) {

    $.map(this.charts, function(value, index){
      if (value.chart_type != 'text' || (value.prepare_data_from_array != undefined && value.prepare_data_from_array == true)) {
        self.charts[index]['ChartData'] = self.makeDataTable(value.columns);
        if (value.chart_type == 'column' && value.colors != undefined) {
          value.ChartData.addColumn({type: 'string', role: 'style' });
        }
      }
    });

  	this.getData(pcode).done(function(data){

      self.processAfterData(data);

  	});

  }

  this.getData = function(pcode) {

    var ajax_opt = {
      url: ckan_api_url,
      data: {
        resource_id : this.resource.id,
        filters : '{"'+ this.resource.filters.pcode +'":"'+ pcode +'"}'
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

  this.makeDataTable = function(columns) {

  	var dataTable = new google.visualization.DataTable();
  	$.map(columns, function(value, index){
  	  dataTable.addColumn(value, index);
  	});
  	
  	return dataTable;

  };

  this.processAfterData = function(data) {

    if (self.resource.singlerow) {
      self.data = data.result.records[0];
    } else {
      self.data = data.result.records;  
    }

    $.map(self.charts, function(value, index){

      if(value.chart_type == 'text') {
        $('#'+value.container_id).text(self.data[value.field]);
      } else {
    
        var row_count = value.ChartData.getNumberOfRows();
        if (row_count > 0) {
          value.ChartData.removeRows(0, row_count);
        }

        if(value.chart_type == 'treemap') {
          var c_data = self.prepareDataForTreeMap(value);
        } else {
          var c_data = self.prepareData(value);  
        }
        value.ChartData.addRows(c_data);
        googleChart.draw(value.chart_type, document.getElementById(value.container_id), value.ChartData, value.chart_options);
      }

    });

  };

  this.prepareData = function(chart) {

    var result = [];

    $.map(chart.fields, function(value, index){
      var num_value = self.data[index];
      if (num_value && num_value.match(/,/g)) {
        num_value = num_value.replace(/,/g, '');
      }
      var row_data = [value, parseInt(num_value, 10)];
      if(chart.colors != undefined) {
        row_data.push(chart.colors[index]);
      }
      result.push(row_data);
    });

    return result;

  };

  this.prepareDataForTreeMap = function(chart) {

    var results = [];

    $.map(chart.parents, function(value, index){
      results.push(value);
    });

    var fieldsArr = Object.keys(chart.fields);

    $.map(chart.fields, function(value, index){
      results.push([value.data_dictionary, value.parent, parseInt(self.data[index])]);
    });

    return results;

  };
}

// ============================== Election Class ==================== //
// *** Later need to extend from ODChart **** 

function ElectionPartyChart(config) {

  var self = this;
  this.config = config; // Chart Resources and Config
  this.resource = this.config.resource;
  this.charts = this.config.charts;

  this.init = function(pcode) {

    this.getData(pcode).done(function(data){

      self.processAfterData(data);

    });
  };

  this.getData = function(pcode) {
    var ajax_opt = {
      url: ckan_api_url,
      data: {
        resource_id : this.resource.id,
        filters : '{"'+ this.resource.filters.pcode +'":"'+ pcode +'"}',
        sort : 'votes'
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

          var sorted = self.sortResults(data.result.records, 'votes');

          self.prepareChart(sorted, value);

        } else {

          $('#'+value.container_id).hide();

        }

      }); 

  }

  this.prepareChart = function(data, chart_conf) {

    var columns = ['Year'];
    var values = [chart_conf.columns['Y-value']];
    var colors = [];

    $.map(data, function(value, index){
      columns.push(value.party_name);
      values.push(parseInt(value.votes));
      colors.push(self.getPartyColor(value.party_name));
    });

    var f_data = [columns, values];

    chart_conf.chart_options.colors = colors;
    
    chart_conf.ChartData = new google.visualization.arrayToDataTable(f_data);

    googleChart.draw(chart_conf.chart_type, document.getElementById(chart_conf.container_id), chart_conf.ChartData, chart_conf.chart_options);

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

// ================================ Draw Google Chart Functions ==================== //

var googleChart = {

  draw : function(type, object, data, options) {

    var chart = eval("googleChart." + type + "(object)");
    var opts = eval("this.options." + type);
    $.extend(opts, options);
    chart.draw(data, opts);
  },

  options : {
    pie : {},
    bar : {
      legend : {
        position : 'bottom'
      },
      backgroundColor : {
        fill : 'transparent'
      }
    },
    donut : {
      backgroundColor : {
        fill : 'transparent'
      },
      pieHole: 0.4
    },
    line : {},
    column : {
      backgroundColor : {
        fill : 'transparent'
      },
      animation:{
        duration: 1000,
        easing: 'linear',
        startup : true
      },
      legend : {
        position : 'bottom'
      }
    },
    table : {},
    treemap : {
      textStyle : {
        fontSize : 15
      }
    }
  },

  //Pie Chart
  pie : function(object) {

    return new google.visualization.PieChart(object);

  },

  bar : function(object) {

    return new google.visualization.BarChart(object);

  },

  donut : function(object) {

    return new google.visualization.PieChart(object);

  },

  line : function(object) {

    return new google.visualization.LineChart(object);

  },

  column : function(object) {

    return new google.visualization.ColumnChart(object);

  },

  table : function(object) {

    return new google.visualization.Table(object);

  },

  treemap : function(object) {

    return new google.visualization.TreeMap(object);

  }

};