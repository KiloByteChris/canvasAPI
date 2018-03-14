<!DOCTYPE html>
<html lang="en">
<!--
	Chris McGuire
	Canvas API
	CTEC 290 - API
	Winter 18

	Description:
 	This program uses the a private api key to request student information from canvas. It allows the user to view assignments, quizzes, discussions and modules for the classes they are currently enrolled it (or the courses where view in enables).

-->
<head>
	<title>Canvas API</title>
	<meta charset="utf-8">
	<!--CSS -->
	<link href="css/reset.css" rel="stylesheet">
	<link href="css/main.css" rel="stylesheet">
	<!-- JQUERY -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<!-- JQUERY UI -->
	<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
	<!-- MOMENTS.JS -->
	<script src="js/moment.js"></script>
  	<!-- JAVASCRIPT -->
	<script src="js/mycanvas.js"></script>
	
</head>
<body>
	<div id="wrapper">
		<header>
			<h1>Canvas API</h1>
			<?php
				require "includes/functions.inc.php";
				// Functions from he include file that display data from the Canavs API
				getAvatar();
				getSelf();
				mainMenu();
				displayCourseSelect();
			?>
		</header>
		<div id="subHeader"></div>
		<nav>
		</nav>
		<main>

			<div id="infoDiv">
			</div>
		</main>
		<footer>
			<p>Canvas API</p>
			<p>Chris McGuire</p>
		</footer>
	</div>
</body>