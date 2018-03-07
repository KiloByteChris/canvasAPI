<?php
/*
	functions for mycanvas.php
	$key = "9~OL3UKDFI4rCDcOWYqKGGD2nKqx1KbcjthA2xf0NZnBdwITg05cAzOTxaEMTs11nR";
 	$userId = "4337133";
*/

function callAPI($url) {
	// Main function used to make API requests using cURL
	$curl = curl_init(); // Start cURL
	// Set cURL options
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	// Make the request and then close the connection
	$data = curl_exec($curl);
	curl_close($curl);
	// Decode json into a php object before returning the data
	$data = json_decode($data);
	return $data;
}

function getAvatar() {
	// Get avatar information from the canvas api and display it on the page
	$avatarURL = "https://clarkcollege.instructure.com/api/v1/users/self/avatars.json?access_token=9~OL3UKDFI4rCDcOWYqKGGD2nKqx1KbcjthA2xf0NZnBdwITg05cAzOTxaEMTs11nR";
	$data = callAPI($avatarURL);
	$avatarString = "<img src=".$data[0]->url." id="."avatar".">";
	echo $avatarString;
}

function mainMenu() {
	// Build a header string that links to the homepage
	$menuString = "<a href="."mycanvas.php"." id ="."homeLink".">Home</a>";
	echo $menuString;
}

function getCourses() {
	// Get json data for courses and populate a select box
	$coursesURL = "https://clarkcollege.instructure.com/api/v1/courses.json?access_token=9~OL3UKDFI4rCDcOWYqKGGD2nKqx1KbcjthA2xf0NZnBdwITg05cAzOTxaEMTs11nR";
	// Create a select box that allows the user to pick the courses
	$data = callAPI($coursesURL);
	$selectString = "<form id="."selectCourseForm"."><select id="."selectCourseSelect".">";
	for($i=0;$i<count($data);$i++){
		if(array_key_exists("name", $data[$i])){
			$selectString .= "<option value=".$data[$i]->id.">".$data[$i]->name."</option>";
		}
	}
	$selectString .= "</select><button id="."selectCourse".">Select Course</button></form>";
	// Return html
	echo $selectString;
}

function getSelf() {
	// Get user infomration
	$selfURL = "https://clarkcollege.instructure.com/api/v1/users/self/profile.json?access_token=9~OL3UKDFI4rCDcOWYqKGGD2nKqx1KbcjthA2xf0NZnBdwITg05cAzOTxaEMTs11nR";
	$data = callAPI($selfURL);
	$nameString = "<h2>".$data->name."</h2>";
	echo $nameString;
}

function getAssignments($data) {
	// Get assignments based on the selected course
	$course = $data->course;
	$assignmentsURL = "https://clarkcollege.instructure.com/api/v1/users/self/courses/".$course."/assignments.json?access_token=9~OL3UKDFI4rCDcOWYqKGGD2nKqx1KbcjthA2xf0NZnBdwITg05cAzOTxaEMTs11nR";
	$data = file_get_contents($assignmentsURL); 
	$data = json_encode($data);
	$data = json_decode($data);
	echo $data;
}

// Code to fire specific php function from ajax request
if(isset($_GET["action"])){
	$data = json_encode($_GET);
	$data = json_decode($data);
	$action = $_GET["action"];
	$action($data);
}
?>