(function(){
  window.utils.flot_bar_options = {

    series:{

      bars:{
        show : true,
        barWidth : 2000000*8, //absurdly high due to #ms in an hour
      }

    },
    xaxis: {
      ticks:8,
      color:'white',
      mode : 'time'
    },
    yaxis: {
      color:'white'
    },
    colors : ['white']

  };
})();
