<!DOCTYPE html>
<html lang="en">
<!--
	Chris McGuire
	Canvas API
	CTEC 290 - API
	Winter 18

	Description:
 	Using the Canvas LMS REST API and PHP, JavaScript, HTML, CSS and MySQL, students are to create a professional looking, responsive, personalized, dynamic dashboard displaying information for the courses they are enrolled in. The dashboard will contain their current grade, upcoming assignments, past assignments, discussion topics, upcoming quizzes, past quizzes and any other relevant information that will make it easier for the student to see their Canvas work.

 	current grade 
 	upcoming assignments
 	past assignment 
 	discussion topics,
 	upcoming quizzes 
 	past quizzes
 	other relevant information
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
				getCourses();
			?>
		</header>
		<div id="subHeader"></div>
		<nav>
		</nav>
		<main>

			<div id="infoDiv"></div>
		</main>
		<footer>
			<p>Canvas API</p>
			<p>Chris McGuire</p>
		</footer>
	</div>
</body>