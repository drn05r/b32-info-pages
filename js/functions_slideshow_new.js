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
function scaleToHeight( node, height )
{
		node = $(node);
		node2 = node.clone();
		node2.css( "top","-200%" );
		$("body").append( node2 );
		node2.css( "height", "auto" );
		node2.css( "overflow","visible" );

		var size = 100;
		var inc = 20;
		var ttl = 4;
		while( tryHeight( size, node2 ) > height && ttl-- > 0 )
		{
			size/=2;
			inc/=2;
		}
		ttl = 50;
		while( tryHeight( size+inc, node2 ) < height && ttl-- > 0)
		{
			size += inc;
		}
		node2.remove();
		node.css( "font-size", size+"%" );
		node.css( "height", height+"px" );

	function tryHeight( size, node )
	{
		node.css( "font-size", size+"%" );
		return node.height();
	}
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
	var footer = '<img style="float: right; display: block; vertical-align: top; margin-left: 10px;" src="' + qrcode + '" /><div style="color: #000080; font-weight: bold; font-size: 30px !important; font-family: verdana,sans-serif; line-height: 110%; text-align: right; margin: 0; display: inline; float: right;">' + title + '</div>';
	var nomenu = document.getElementById('no_menu').innerHTML;
	if (nomenu == '0') {
        	footer = footer + '<p style="display: inline; float: left; vertical-align: top;"><a href="?page=' + prevpage + '"><img style="width:2em" src="img/previous.jpg"/></a>&nbsp;<a style="text-decoration: none; font-family: verdana,sans-serif; font-size: 3em;" href="' + url + '" target="_blank">More Information</a>&nbsp;<a href="?page=' + nextpage + '"><img style="width:2em" src="img/next.jpg"/></p>';
	}
	footer = footer + '<div style="clear: both;"></div>';
	footer = "<div id='footer' style='position:absolute; width:100%; left:0;top:80%;'><div style='margin:0 1em 1em 1em'>" + footer + "</div></div>";
        var viewportHeight = $(window).height()-180;

	var htmlcode = '<div id="main" style="position:absolute; width:100%; left:0; top:0;"><div style="vertical-align: middle; padding: 1em;">';

	var item = pages[currentpage];
	var text = item['text'];
	
	var fontsize = (window.innerWidth / 2.8) / Math.pow(text.length, 1/2);
	fontsize = 100;
	var imageurl = 'img/' + item['image'];
	var pblock = '<p style="color: #000080; font-family: verdana,sans-serif; line-height: 1.4em; margin: 0; font-size: ' + fontsize + '%; text-align: justify; font-weight: bold;">' + text + '</p></div></div>';
	$.loadImage(imageurl)
	.done(function(image) {	
		b='right';a='left';
		if( Math.random()<0.5 ) {  a='right'; b='left'; }
		htmlcode = htmlcode + '<img style="float:'+a+';margin-'+b+': 1em; max-width:40%;max-height:50%;" src="' + imageurl + '" />' + pblock + footer;
        	$('body').html(htmlcode);
		scaleToHeight( "#main", $(window).height()*0.8);
		scaleToHeight( "#footer", $(window).height()*0.2);
		
	})
	.fail(function(image) {
		htmlcode = htmlcode + pblock + footer;
	        $('body').html(htmlcode);
		skunge( ".resized"); });

});
