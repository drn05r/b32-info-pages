Building 32 Information Pages
=============================

This repo contains the Ninescreens App and Flickr feed for the Apple TV in the coffee room (Don't ask).  

If you want to contribute feel free to fork this codebase.  All you need to do to start playing is deploy this repo in a directory that can be rendered by your web server.  You will also have to make sure that your web server can support PHP.  (This repo was original developed on Apache with its PHP module).


Adding New Pages
----------------
If you want to add a page the easiest way is probably to email me (drn@ecs.soton.ac.uk) with the text you want to include, a title, a URL to more information and operationally (but preferably) and image to illustrate your page.  Otherwise, if you want to fork the codebase to do this you need to do the following:

1. Fork the codebase (or make sure you have the latest version).

2. Edit data.json and add a block something like the following. This must go before the last ] and you must make sure you add and endding comma (,) to the previous block.  Try to make sure the text is no longer than 180 characters:

	{
                "title":"More Information",
                "text":"To view these pages in their entirety use the QR code to the left or the bottom right of each page or go to http://bit.ly/17soaJV",
                "image":"qrcode.png",
                "url":"http://wais-demo.ecs.soton.ac.uk/b32info/slideshow.php"
        }

3. Place your image in the htdocs/img/ folder and make sure its name corresponds to what you set for image in data.json.

4. Run the following script where N is the number of the page you are adding.  You can calculate this by counting which block it is in data.json and taking away 1:

	scripts/make_images.sh N

5. If the script above does not work (it will probably only work on Linux and maybe only Debian-based systems) then just tell when you submit the pull request.  

6. Add and commit the changes and send a pull request to this GIT repo.


Useful Improvements
-------------------
There are a number of useful improvements that could be made to the codebase:

1. Provide an authenticated management interface so that the data in data.json can be edited from a web interface.

2. Test the make\_images.sh script work cross-platform, (All Linux and Mac).  If not find a way to make it work on more operating systems.

3. Add an option to scripts/make\_images.sh so that it can just generate images for new pages.

4. Use the Flickr API to automatically add/update images in the B32 Information Pages Flickr photoset.

5. Improve the CSS to try to avoid odd text spacing and justification.
