$.fn.tagcloud.defaults = {
	size:{start:14, end:35, unit:'px'},
    color:{start:'#2C3E50', end:'#2C3E50'}
};

$(document).ready(function(){
	getTagCloudsQuantity();
});

function getFilesAjax(success, url, dataType, beforeSend){
    $.ajax({
        url: url,
		beforeSend: beforeSend,
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
	var beforeSend = function(){
		$("#tag-cloud").html('<img src="assets/images/big-loader.gif">');
	}
	var success = function(response){
		$("#tag-cloud").empty();
		getTagCloud(parseInt(response));
	}
	var dataType = 'text';
	var url = 'assets/json/sites-quantity.txt';
	getFilesAjax(success, url, dataType, beforeSend);
}

function getTagCloud(maxValue){
	var beforeSend = function(){
		$("#tag-cloud").html('<img src="assets/images/big-loader.gif">');
	}
	var success = function(response){
		$("#tag-cloud").empty();
		printTags(response);
	}
	var url = 'assets/json/' + randomIntFromInterval(1, maxValue) + '.json';
	var dataType = 'json';
	getFilesAjax(success, url, dataType, beforeSend);
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