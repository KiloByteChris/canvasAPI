<?php
/*
	functions for mycanvas.php
*/
//$key = "9~OL3UKDFI4rCDcOWYqKGGD2nKqx1KbcjthA2xf0NZnBdwITg05cAzOTxaEMTs11nR";
//$userId = "4337133";
//open CURL
//$getUrl = $getUrl.$key;
//var_dump($getUrl);
// $key = "9~OL3UKDFI4rCDcOWYqKGGD2nKqx1KbcjthA2xf0NZnBdwITg05cAzOTxaEMTs11nR";
// $getUrl = "https://clarkcollege.instructure.com/api/v1/users/1/avatars.json";
// $curl = curl_init();
// curl_setopt($curl, CURLOPT_URL, $getUrl);
// curl_setopt($curl, CURLOPT_HEADER, true);
// curl_setopt($curl, CURLOPT_HTTPHEADER, array('Authorization: Bearer ' . $key));  
//var_dump($curl);
// $result = curl_exec($curl);
// var_dump($result);
// echo $result;

function getAvatar() {
	// Get avatar information from the canvas api and display it on the page
	$getUrl = "https://clarkcollege.instructure.com/api/v1/users/self/avatars.json?access_token=9~OL3UKDFI4rCDcOWYqKGGD2nKqx1KbcjthA2xf0NZnBdwITg05cAzOTxaEMTs11nR";
	$data = file_get_contents($getUrl);
	$data = json_decode($data);
	$avatarString = "<img src=".$data[0]->url.">";
	echo $avatarString;
}

function mainMenu() {
	// Build a header string that links to the homepage
	$menuString = "<a href="."mycanvas.php".">Home</a>";
	echo $menuString;
}

function getCourses() {
	// Get json data for courses
	$getUrl = "https://clarkcollege.instructure.com/api/v1/courses.json?access_token=9~OL3UKDFI4rCDcOWYqKGGD2nKqx1KbcjthA2xf0NZnBdwITg05cAzOTxaEMTs11nR";
	$data = file_get_contents($getUrl);
	$data = json_decode($data);
	//print_r($data);
	// Create a select box that allows the user to pick the courses
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
	$getUrl = "https://clarkcollege.instructure.com/api/v1/users/self/profile.json?access_token=9~OL3UKDFI4rCDcOWYqKGGD2nKqx1KbcjthA2xf0NZnBdwITg05cAzOTxaEMTs11nR";
	$data = file_get_contents($getUrl);
	$data = json_decode($data);
	$nameString = "<h2>".$data->name."</h2>";
	echo $nameString;
}

function getAssignments($data) {
	$course = $data->course;
	$getUrl = "https://clarkcollege.instructure.com/api/v1/users/self/courses/".$course."/assignments.json?access_token=9~OL3UKDFI4rCDcOWYqKGGD2nKqx1KbcjthA2xf0NZnBdwITg05cAzOTxaEMTs11nR";
	$data = file_get_contents($getUrl); 
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