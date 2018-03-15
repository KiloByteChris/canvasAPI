<?php
	// Create a database connection
	$connection = mysqli_connect("localhost", "root", "", "canvas_api") or die("Error " . mysqli_error($connection));
	$connection->set_charset("utf-8");
?>