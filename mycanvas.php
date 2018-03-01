<!DOCTYPE html>
<html lang="en">
<!--
	Chris McGuire
	Canvas API
	CTEC 290 - API
	Winter 18
-->
<head>
	<title>Canvas API</title>
	<meta charset="utf-8">
	<!--CSS -->
	<link href="css/main.css" rel="stylesheet">
	<!-- JQUERY -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<!-- JAVASCRIPT -->
	<script src="js/mycanvas.js"></script>
</head>
<body>
	<div id="wrapper">
		<header>
			<?php
				require "includes/functions.inc.php";
				// Functions from he include file that display data from the Canavs API
				getAvatar();
				getSelf();
				mainMenu();
				getCourses();
			?>
		</header>
		<main>
			<div id="assignmentsDiv"></div>
		</main>
	</div>
</body>