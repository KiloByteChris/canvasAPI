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
	<meta name="description" content="A website that uses the canvas api and my student access token to display canvas information" >
    <meta name="keywords" content="Clark, Canvas, API" >
    <meta name="author" content="Chris McGuire">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!--CSS -->
	<link href="css/reset.css" rel="stylesheet">
	<link href="css/main.css" rel="stylesheet">
	<!-- GOOGLE FONTS -->
	<link href="https://fonts.googleapis.com/css?family=Arimo" rel="stylesheet">
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
			<h1><a href="">Canvas API</a></h1>
			<div id="headerBox">
				<?php
					require "includes/functions.inc.php";
					// Functions from he include file that display data from the Canavs API
					// Dashboard
					getAvatar();
					getSelf();
					displayCourseSelect();
				?>	
				<div id="beefDiv"></div>
			</div>
			<nav></nav>
			<div id="subHeader"></div>
			<div id="gradeDiv"></div>
		</header>
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