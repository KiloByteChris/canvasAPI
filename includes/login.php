<?php
/*
	This file processes the login form and returns the user's api key to $_SESSION 
*/
// Database connection
require "database_connection.php";
// Begin session
session_start();
if($_SERVER['REQUEST_METHOD'] == "POST") {
	// Create an sql query with the data posted in the login form
	$userId = $_POST['userId'];
	$password = $_POST['password'];
	$sql = "SELECT * FROM users WHERE user_id = ".$userId." AND password = ".$password." "; 
	// Query the database
	$result = $connection->query($sql);
	// Create an array from the data returned from the database
	$row = $result->fetch_assoc();
	if($connection->affected_rows == 1){
		$status = ["status" => 1];
		// Assign session variables with the users information
		$_SESSION['userId'] = $row["user_id"];
		$_SESSION['password'] = $row["password"];
		$_SESSION['apiKey'] = $row["api_key"];
		// Redirect to the dashboard
		header("Location: ../mycanvas.php");
	}else{
		// Thro an error if the queary doesn't work
		$status = ["status" => 2];
		echo "<p>There was an error Logging into the account</p>";
	}
} else {
	// Throw an error if this file is accessed through a method other than POST
	echo "<p>There was an error</p>";
}
// Close the databsae connection
mysqli_close($connection);
?>