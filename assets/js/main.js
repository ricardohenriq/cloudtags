$.fn.tagcloud.defaults = {
      size: {start: 14, end: 18, unit: 'pt'},
      color: {start: '#2c3e50', end: '#2c3e50'}
    };

$(document).ready(function(){
  $('#tag-cloud a').tagcloud();
});