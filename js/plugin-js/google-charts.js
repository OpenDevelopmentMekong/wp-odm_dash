// ================================ Draw Google Chart Functions ==================== //

var googleChart = {

  draw : function(type, object, data, options) {

    var chart = eval("googleChart." + type + "(object)");
    var opts = jQuery.extend(true, {}, eval("this.options." + type))
    jQuery.extend(true, opts, options);
    chart.draw(data, opts);
  },

  options : {
    pie : {
      sliceVisibilityThreshold: 0
    },
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
      pieHole: 0.4,
      sliceVisibilityThreshold: 0
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