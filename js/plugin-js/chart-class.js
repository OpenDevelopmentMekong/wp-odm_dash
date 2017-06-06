/* Chart Class */
function ODChart(config) {

  var self = this;
  this.config = config; // Chart Resources and Config
  this.resource = this.config.resource;
  this.chart = this.config.chart;

  this.init = function() {

    var value = self.chart;

    if (value.chart_type !== 'text' || (value.prepare_data_from_array !== undefined && value.prepare_data_from_array === true)) {
      self.chart['ChartData'] = self.makeDataTable(value.columns);
      if (value.colors !== undefined) {
        value.ChartData.addColumn({type: 'string', role: 'style' });
      }
    }

    if (this.resource.data_source == "custom_data"){
      var jsonData = null;

      try {
        jsonData = JSON.parse(this.resource.custom_data);

        var preprocessedData = {
          result: {
            records: jsonData
          }
        }
        self.processAfterData(preprocessedData);

      } catch(e) {
        $('#chart_js_error').html(
          dashboard.config_error_msg + "<br> <span class='error_msg'> " + dashboard.invalid_json_custom_data_error + "</span>"
        ).show();
        $('#'+self.chart.container_id).hide();
      }

    }else{

      this.getData().done(function(data){

        //Show Error if there's no data record return
        if (data.result.records.length >= 1) {
          self.processAfterData(data);
        } else {
          $('#chart_js_error').html(
            dashboard.config_error_msg + "<br> <span class='error_msg'> " + dashboard.no_data_error + "</span>"
          ).show();
          $('#'+self.chart.container_id).hide();
        }

    	})
      .fail(function( jqXHR, textStatus, errorThrown ) {

        var responseText =  JSON.parse(jqXHR.responseText);

        if (responseText.error.message) {
          var errorMsg = responseText.error.message;
        } else {
          var errorMsg = JSON.stringify(responseText.error);
        }

      $('#chart_js_error').html(
                dashboard.config_error_msg + "<br> "+ dashboard.error_msg +"<span class='error_msg'>"
                + errorMsg + "</span>" //Errors are not same need to check all possible ways.
                ).show();
    });

  };

  this.getData = function() {

    var ajax_opt = {
      url: dashboard.ckan_url + '/api/action/datastore_search',
      data: {
        resource_id : this.resource.id,
        filters : this.resource.filters
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

    if (self.resource.singlerow || data.result.records.length == 1) {
      self.data = data.result.records[0];
    } else {
      self.data = data.result.records;
    }

    var value = self.chart;

    //$.map(self.charts, function(value, index){

      if(value.chart_type == 'text') {

        if ((self.data[value.field] === undefined || self.data[value.field] === null) || (self.data[value.field] === 0 && value.ignore_zero === true)) {

          $('#'+value.container_id).hide();

        } else {

          // Format Number
          var f_val = self.data[value.field];
          if (value.numberformat === true) {
            f_val = self.formatNumber(self.data[value.field]);
          }

          // Check if there *title* field option
          if (value.title !== undefined && value.title !== '') {
            f_val = value.title + ' : ' + f_val;
          }

          if (value.unit !== undefined && value.unit !== '') {
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

        var c_data = self.prepareData(value);
        if(value.chart_type == 'treemap') {
          c_data = self.prepareDataForTreeMap(value);
        } else if (value.fixed_structure === true) {
          c_data = self.prepareDataFromFixStructure(value);
        }

        if (c_data === false) {

          $("#"+value.container_id).parent('div').hide();

        } else {

          value.ChartData.addRows(c_data);

          googleChart.draw(value.chart_type, document.getElementById(value.container_id), value.ChartData, value.chart_options);

          if (value.data_source_table === true) {

            self.prepareDataSourceModal(value);

            googleChart.draw('table', document.getElementById(value.container_id + '_table_wrapper'), value.ChartData);

          }

          jQuery('#' + value.container_id + '_table_wrapper').prepend(self.getDataSourceLinkTemplate(value));

          //Add Title for table if it's in config
          if (value.chart_type == 'table' && value.chart_options.title !== undefined) {
            jQuery('#' + value.container_id).prepend('<h5>' + value.chart_options.title +'</h5>');
          }

        }

      }

    //});

  };

  this.prepareDataSourceModal = function(value) {

    var container = jQuery('#'+value.container_id);

    //Remove previous DOM
    container.siblings('.data_source_bar').remove();
    container.siblings('.source-table-wrapper').remove();

    container.before(self.getDataSourceButtonTemplate(value));

    container.after(self.getTableContainerTemplate(value));

  };

  this.getDataSourceLinkTemplate = function(value) {

    var resource_container = jQuery('<div>').addClass('resource_link');

    if (self.resource.dataset_id !== undefined) {

      var dataset_url = data_source_url + '?id=' + self.resource.dataset_id;

      resource_container.append(
        jQuery('<a>').attr('href', dataset_url)
          .attr('target', '_blank')
          .text( dashboard.data_source + ': ' + self.resource.resource_title)
      );
    }

    if (self.resource.download_link !== undefined) {

      resource_container.append(
        jQuery('<a>')
          .addClass('resource_download')
          .text(' ' + dashboard.download)
          .prepend(jQuery('<i>').addClass('fa fa-download'))
          .on('click', function(){
            self.downloadCSV(value.ChartData, value.container_id);
          })
      );

    }

    return resource_container;


  };

  this.getDataSourceButtonTemplate = function(value) {

    return jQuery('<div>').addClass('data_source_bar')
              .append(
                jQuery('<a>').addClass('data_source_btn')
                  .attr('data-target', value.container_id + "_table")
                  .html(' <span class="data_source_btn_text">'+ dashboard.show_data +'<span>')
                  .prepend(
                    jQuery('<i>').addClass('fa fa-gear')
                  )
              );

  };

  this.getTableContainerTemplate = function(value) {

    return jQuery('<div>').addClass('source-table-wrapper hide')
            .attr('id', value.container_id +"_table")
            .append(
              jQuery('<div>').addClass('modal-content')
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

      if (num_value === null || num_value === '') {
        num_value = 0;
      }

      if (num_value === 0) {
        zero_count++;
      }

      var row_data = [value, parseInt(num_value, 10)];
      if(chart.colors !== undefined) {
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
        if (index === 0) {
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
  };


  /* Download DataTable as CSV File

     Code from : https://gist.github.com/pilate/1477368
     Credit to : pilate(https://github.com/pilate) and olmomp(https://github.com/olmomp)

  */
  this.downloadCSV = function(ChartData, filename) {

    //DataTable to CSV
    var dt_cols = ChartData.getNumberOfColumns();
    var dt_rows = ChartData.getNumberOfRows();

    var csv_cols = [];
    var csv_out;

    // Iterate columns
    for (var i=0; i<dt_cols; i++) {
        // Replace any commas in column labels
        csv_cols.push(ChartData.getColumnLabel(i).replace(/,/g,""));
    }

    // Create column row of CSV
    csv_out = csv_cols.join(",")+"\r\n";

    // Iterate rows
    for (i=0; i<dt_rows; i++) {
        var raw_col = [];
        for (var j=0; j<dt_cols; j++) {
            // Replace any commas in row values
            raw_col.push(ChartData.getFormattedValue(i, j, 'label').replace(/,/g,""));
        }
        // Add row to CSV text
        csv_out += raw_col.join(",")+"\r\n";
    }



    //Download CSV
    var blob = new Blob([csv_out], {type: 'text/csv;charset=utf-8'});
    var url  = window.URL || window.webkitURL;
    var link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    link.href = url.createObjectURL(blob);
    link.download = filename;

    var event = document.createEvent("MouseEvents");
    event.initEvent("click", true, false);
    link.dispatchEvent(event);

  }

}
