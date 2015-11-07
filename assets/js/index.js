$.fn.tagcloud.defaults = {
      size: {start: 14, end: 35, unit: 'px'},
      color: {start: '#2c3e50', end: '#2c3e50'}
    };

$(document).ready(function(){
	getTagCloudsQuantity();
});

function getFilesAjax(success, url, dataType){
    $.ajax({
        url: url,
        success: success,
        error: function (XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        },
        dataType: dataType,
        global: false
    });
}

function getTagCloudsQuantity(){
	var success = function(response){
		getTagCloud(parseInt(response));
	}
	var dataType = 'text';
	var url = 'assets/json/sites-quantity.txt';
	getFilesAjax(success, url, dataType);
}

function getTagCloud(maxValue){
	var success = function(response){
		printTags(response);
	}
	var url = 'assets/json/' + randomIntFromInterval(1, maxValue) + '.json';
	var dataType = 'json';
	getFilesAjax(success, url, dataType);
}

function printTags(sites){
	sites.forEach(function(entry) {
		printHref(
			entry['href'], 
			randomIntFromInterval(1, 50),
			entry['name'],
			'#tag-cloud'
		);
	});
	$('#tag-cloud a').tagcloud();
}

function printHref(href, rel, nodo, fatherID){
	var aElement = document.createElement('a');
	$(aElement).append(nodo);
	$(aElement).attr('rel', rel);
	$(aElement).attr('href', href);
	$(fatherID).append(aElement);
	$(fatherID).append(' ');
}

function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}