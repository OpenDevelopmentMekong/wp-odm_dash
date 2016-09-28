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
        if (value.colors != undefined) {
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

        if ((self.data[value.field] == undefined || self.data[value.field] == null) || (self.data[value.field] == 0 && value.ignore_zero == true)) {

          $('#'+value.container_id).hide();

        } else {

          // Format Number
          if (value.numberformat == true) {
            var f_val = self.formatNumber(self.data[value.field]);
          } else {
            var f_val = self.data[value.field];
          }

          // Check if there *title* field option
          if (value.title != undefined && value.title != '') {
            f_val = value.title + ' : ' + f_val;
          }

          if (value.unit != undefined && value.unit != '') {
            f_val += ' ' + value.unit;
          }

          $('#'+value.container_id).html(f_val);
          $('#'+value.container_id).show();

        }
  
      } else {
    
        var row_count = value.ChartData.getNumberOfRows();
        if (row_count > 0) {
          value.ChartData.removeRows(0, row_count);
        }

        if(value.chart_type == 'treemap') {
          var c_data = self.prepareDataForTreeMap(value);
        } else if (value.fixed_structure == true) {
          var c_data = self.prepareDataFromFixStructure(value);
        } else {
          var c_data = self.prepareData(value);  
        }

        if (c_data == false) {

          $("#"+value.container_id).parent('div').hide();

        } else {

          value.ChartData.addRows(c_data);

          self.prepareDataSourceModal(value);

          googleChart.draw(value.chart_type, document.getElementById(value.container_id), value.ChartData, value.chart_options);

          googleChart.draw('table', document.getElementById(value.container_id + '_table_wrapper'), value.ChartData);

          jQuery('#' + value.container_id + '_table_wrapper').prepend(self.getDataSourceLinkTemplate(value));

        }

      }

    });

  };

  this.prepareDataSourceModal = function(value) {

    var container = jQuery('#'+value.container_id);

    //Remove previous DOM
    container.siblings('.data_source_bar').remove();
    container.siblings('.modal').remove();

    container.before(self.getDataSourceButtonTemplate(value));

    container.after(self.getTableContainerTemplate(value));

  }

  this.getDataSourceLinkTemplate = function(value) {

    var resource_container = jQuery('<div>').addClass('resource_link');

    if (self.resource.dataset_id != undefined) {

      var dataset_url = data_source_url + '?id=' + self.resource.dataset_id;

      resource_container.append(
        jQuery('<a>').attr('href', dataset_url)
          .attr('target', '_blank')
          .text('Data Source : ' + self.resource.resource_title)
      );
    }

    if (self.resource.download_link != undefined) {

      resource_container.append(
        jQuery('<a>').attr('href', self.resource.download_link)
          .addClass('resource_download')
          .attr('target', '_blank')
          .text(' Download')
          .prepend(jQuery('<i>').addClass('fa fa-download'))
      );

    }

    return resource_container;


  };

  this.getDataSourceButtonTemplate = function(value) {

    return jQuery('<div>').addClass('data_source_bar')
              .append(
                jQuery('<a>').addClass('data_source_btn')
                  .attr('data-target', value.container_id + "_table")
                  .text(' Data')
                  .prepend(
                    jQuery('<i>').addClass('fa fa-gear')
                  )
              );

  }

  this.getTableContainerTemplate = function(value) {

    return jQuery('<div>').addClass('modal')
            .attr('id', value.container_id +"_table")
            .append(
              jQuery('<div>').addClass('modal-content')
                .append(
                  jQuery('<span>').addClass('modal-close').text('x')
                )
                .append (
                  jQuery('<div>').addClass('data_table_wrapper')
                    .attr('id', value.container_id + '_table_wrapper')
                )
            );

  };

  this.prepareData = function(chart) {

    var result = [];

    var zero_count = 0;

    $.map(chart.fields, function(value, index){
      var num_value = self.data[index];
      if (num_value && num_value.match(/,/g)) {
        num_value = num_value.replace(/,/g, '');
      }

      if (num_value == null || num_value == '') {
        num_value = 0;
      }

      if (num_value == 0) {
        zero_count++;
      }

      var row_data = [value, parseInt(num_value, 10)];
      if(chart.colors != undefined) {
        row_data.push(chart.colors[index]);
      }
      result.push(row_data);
    });

    if (result.length == zero_count) {
      return false;
    }

    return result;

  };

  this.prepareDataFromFixStructure = function(chart) {

    var result = [];
    
    $.map(chart.fields, function(value, index){

      var res = $.map(value, function(value, index){
        if (index == 0) {
          return value;
        } else {
          return parseInt(self.data[value]);
        }
      });

      result.push(res);

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

  this.formatNumber = function(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
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

  }

  this.addDataSourceLink = function(value) {
    if (self.resource.dataset_id != undefined) {
      var dataset_url = data_source_url + '?id=' + self.resource.dataset_id;
      jQuery('#'+value.container_id).append('<div class="resource_link">Data Source : <a href="'+ dataset_url +'" target="_blank">'+ self.resource.resource_title +'</a></div>');
    }
  }

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

// ================================ Draw Google Chart Functions ==================== //

var googleChart = {

  draw : function(type, object, data, options) {

    var chart = eval("googleChart." + type + "(object)");
    var opts = jQuery.extend(true, {}, eval("this.options." + type))
    jQuery.extend(true, opts, options);
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
    line : {
      backgroundColor : {
        fill : 'transparent'
      }
    },
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
      },
    },
    table : {
      width: '100%'
    },
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