$.loadImage = function(url) {
  // Define a "worker" function that should eventually resolve or reject the deferred object.
  var loadImage = function(deferred) {
    var image = new Image();

    // Set up event handlers to know when the image has loaded
    // or fails to load due to an error or abort.
    image.onload = loaded;
    image.onerror = errored; // URL returns 404, etc
    image.onabort = errored; // IE may call this if user clicks "Stop"

    // Setting the src property begins loading the image.
    image.src = url;

    function loaded() {
      unbindEvents();
      // Calling resolve means the image loaded sucessfully and is ready to use.
      deferred.resolve(image);
    }
    function errored() {
      unbindEvents();
      // Calling reject means we failed to load the image (e.g. 404, server offline, etc).
      deferred.reject(image);
    }
    function unbindEvents() {
      // Ensures the event callbacks only get called once.
      image.onload = null;
      image.onerror = null;
      image.onabort = null;
    }
  };
return $.Deferred(loadImage).promise();
};

function getPages() {
	var url = "data.json";
	var ret = 0;
	$.ajax({
		type: "GET",
		url: url,
		dataType: "json",
		success: function(json) {
			ret = json;
		},
		error: function() {
			ret = Array;
		},
		async: false
	});

	return ret;
}

$(document).ready(function() {

	var pages = getPages();
	var nopages = pages.length;
        var currentpage = document.getElementById('current_page').innerHTML;
	if (currentpage.length == 0) {
		currentpage = '0';
	}
	currentpage = parseInt(currentpage);
	var item = pages[currentpage];
        var text = item['text'];
	var url = item['url'];
	var nextpage = currentpage + 1;
	if (nextpage == nopages) {
        	nextpage = 0;
        }
	while (pages[nextpage]['disabled'] == 1) {
		nextpage++;
		if (nextpage == nopages) {
			nextpage = 0;
		}
	}
	var prevpage = currentpage - 1;
	if (prevpage == -1) {
                        prevpage = nopages -1;
        }
	while (pages[prevpage]['disabled'] == 1) {
		prevpage--;
		if (prevpage == -1) {
			prevpage = nopages -1;
		}
	}
	var title = 'Building 32<br/>Information<br/>Pages';
        var qrcode = 'img/qrcode_small.png';
	var footer = '<img style="float: right; margin-left: 10px;" img src="' + qrcode + '" /><h2 style="color: #000080; font-family: verdana,sans-serif; margin: 0; text-align: right; display: inline; float: right;">' + title + '</h2>';
	var nomenu = document.getElementById('no_menu').innerHTML;
	if (nomenu == '0') {
        	footer = footer + '<h2 style="display: inline; float: left; vertical-align: top;"><a href="?page=' + prevpage + '"><img height="50px" width="50px" src="img/previous.jpg"/></a>&nbsp;<a style="text-decoration: none; font-family: verdana,sans-serif; font-size: 3em;" href="' + url + '" target="_blank">More Information</a>&nbsp;<a href="?page=' + nextpage + '"><img height="50px" width="50px" src="img/next.jpg"/></h2>';
	}
	footer = footer + '<div style="clear: both;"></div>';
        var viewportHeight = $(window).height()-180;

	var htmlcode = '<table style="height: '+viewportHeight+'px;"><tr><td style="vertical-align: middle; padding: 10px;">';

	var item = pages[currentpage];
	var text = item['text'];
	
	var fontsize = (window.innerWidth / 2.8) / Math.pow(text.length, 1/2);
	var imageurl = 'img/' + item['image'];
	var pblock = '<p style="color: #000080; font-family: verdana,sans-serif; line-height: 1.4em; margin: 0; font-size: ' + fontsize + 'pt; text-align: justify; font-weight: bold;">' + text + '</p></td></tr></table>';
	$.loadImage(imageurl)
	.done(function(image) {	
		var width = image.width;
		var height = image.height;
		var minwidth = 450;
		var maxwidth = 630;
		var maxheight = 630;
		var minheight = 0;
		if (width < minwidth) {
			height = height * ( minwidth / width );
			width = minwidth;
		}
		else if (width > maxwidth) {
			height = height * ( maxwidth / width );
			width = maxwidth;
		}
		if (height < minheight) {
                        width = width * ( minheight / height );
                        width = minwidth;
                }
                else if (height > maxheight) {
                        width = width * ( maxheight / height );
                        height = maxheight;
                }
		htmlcode = htmlcode + '<img style="margin-right: 50px; float: left;" height="' + height + '" width="' + width + '" src="' + imageurl + '" />' + pblock + footer;
		$('body').html(htmlcode);
	})
	.fail(function(image) {
		htmlcode = htmlcode + pblock + footer;
		$('body').html(htmlcode);
	});
});
