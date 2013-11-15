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
	var title = 'Building 32<br/>Information Pages';
	var qrcodeurl = 'http://wais-demo.ecs.soton.ac.uk/b32info/slideshow.php';
	var qrcode = 'img/qrcode_small.png';
	var footer = '<a href="' + qrcodeurl + '"><img style="float: right; margin-left: 10px;" src="' + qrcode + '" /></a><h2 style="color: #000080; font-family: verdana,sans-serif; font-size: 2.3em; margin: 0; text-align: right; display: inline; float: right;">' + title + '</h2><div style="clear: both;"></div>';
	var viewportHeight = $(window).height()-180;
	var htmlcode = '<table style="height: '+viewportHeight+'px;"><tr><td style="vertical-align: middle; padding: 10px;">';

	var c = pages.length;
	var r = Math.random();
	var i = parseInt(r * c);
	var attempts = 0;
	while (pages[i]['disabled'] == 1) {
		if (attempts > 10) {
                        i = 0;
                        break;
                }
		r = Math.random();
		i = parseInt(r * c);
		attempts++;
	}
	var item = pages[i];
	var text = item['text'];
	var fontsize = (window.innerWidth / 2.6) / Math.pow(text.length, 1/2);
	var imageurl = 'img/' + item['image'];
	var pblock = '<p style="color: #000080; font-family: verdana,sans-serif; line-height: 1.5em; margin: 0; font-size: ' + fontsize + 'pt; text-align: justify; font-weight: bold;">' + text + '</p></td></tr></table>';
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
		htmlcode = htmlcode + '<img style="margin-right: 30px; float: left;" height="' + height + '" width="' + width + '" src="' + imageurl + '" />' + pblock + footer;
		$('body').html(htmlcode);
	})
	.fail(function(image) {
		htmlcode = htmlcode + pblock + footer;
		$('body').html(htmlcode);
	});
});
