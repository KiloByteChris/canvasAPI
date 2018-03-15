<?php
/*
	This file processes the new user from in the index page
*/
// Database connection
require "database_connection.php";
// Start the session
session_start();

if($_SERVER['REQUEST_METHOD'] == "POST") {
	// Assign the data from $_POST to variables
	$userId = $_POST['userId'];
	$password = $_POST['password'];
	$apiKey = $_POST['apiKey'];
	// Create an sql querry to create a new user in the database
	$sql = "INSERT INTO users (user_id, password, api_key) VALUES ('$userId', '$password', '$apiKey')";
	$connection->query($sql);
	if($connection->affected_rows == 1){
		// Assign the data from $_POST to $_SESSION
		$status = ["status" => 1];
		$_SESSION['userId'] = $userId;
		$_SESSION['password'] = $password;
		$_SESSION['apiKey'] = $apiKey;
		header("Location: ../mycanvas.php");
	}else{
		// Thrown an error if there is a problem creating a new user
		$status = ["status" => 2];
		echo "<p>There was an error creating you account</p>";
	}
} else {
	// throw an error is the method != post
	echo "<p>There was an error</p>";
}
// LCose the databse connection
mysqli_close($connection);

?>