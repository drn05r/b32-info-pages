<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>B32 Info Pages</title>
		<meta http-equiv="Content-Language" content="English" />
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="js/functions_slideshow_new.js"></script>
	</head>
	<body style="padding: 30px 50px; background-color: #FFFFFF; color: #000000; overflow: hidden;">
        	<div id="current_page" style="display: none;"><?php if (isset($_GET['page'])) { echo $_GET['page']; } else { echo '0'; } ?></div>
		<div id="no_menu" style="display: none;"><?php if (isset($_GET['nomenu'])) { echo $_GET['nomenu']; } else { echo '0'; } ?></div>
	</body>
</html>
