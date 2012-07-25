(function(){
  window.utils.flot_bar_options = {

    series:{
      bars:{
        show : true,
        barWidth : 2000000*8, //absurdly high due to #ms in an hour
      }
    }, // end series

    xaxis: {
      ticks:8,
      /*color:'white',*/
      mode : 'time'
    },

    legend : {
      show : true,
      position: 'sw'
    },

    yaxis: {
      /*color:'white'*/
    },

    grid:{
      borderColor:'white'
    }

    /*colors : ['white']*/

  };
})();
