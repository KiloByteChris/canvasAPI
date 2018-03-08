$(document).ready( function(){
	function selectCourse(course) {
		// Function that takes you from the dashboard to the course dashboard

	}

	function getCourseInfo(course) {
		var url = "includes/functions.inc.php?action=getCourseInfoAPI"
		var data = {"course": course};
		$.ajax({
			url: url,
			data: data,
			datatype: "json",
			method: "GET"
		}).done( function(data) {
			data = JSON.parse(data);
			var subHeaderString = "<h2>"+data.name+"</h2>";
			$("#subHeader").html(subHeaderString);	
		});
	}

	function displayMenu(course) {
		// Build a nav menu to get information about the courses
		var menuString = "";
		// Clean the nav area
		//$("nav").html(menuString);
		// Build the string
		menuString += "<ul>";
		menuString += "<li><button class=\"navButton\" id=\"gradeButton\" value="+course+">Grades</button></li>";
		menuString += "<li><button class=\"navButton\" id=\"moduleButton\" value="+course+">Modules</button></li>";
		menuString += "<li><button class=\"navButton\" id=\"assignmentButton\" value="+course+">Assignments</button></li>";
		menuString += "<li><button class=\"navButton\" id=\"quizButton\" value="+course+">Quizes</button></li>";
		menuString += "<li><button class=\"navButton\" id=\"discussionButton\" value="+course+">Discussions</button></li>";
		menuString += "</ul>";
		// Display the menu
		$("nav").html(menuString);
	}

	function getGrades(course) {
		// Get the current grades 
		var url = "includes/functions.inc.php?action=getGrades";
		var data = {"course": course};
		$.ajax({
			url: url,
			data: data,
			method: "GET",
			datatype: "json"
		}).done( function(data){
			data = JSON.parse(data);
			console.log(data);
		});
	}

	function getAssignments(course) {
		// Get all assignments for the selected Canvas course
		var url = "includes/functions.inc.php?action=getAssignments";
		data = {"course": course};
		$.ajax({
			url: url,
			data: data,
			method: "GET",
			datatype: "json"
			}).done( function(data) {
				// Process the results of the ajax request
				data = JSON.parse(data);
				// Display the assingments
				//console.log(data);
				var assignmentsString = "<ol>";
				for(var i=0;i<data.length;i++){
					assignmentsString += "<li>"+data[i].name+"</li>";
				}
				assignmentsString += "</ol>";
				$("#infoDiv").html(assignmentsString);
			});
	}

	/*------------------------------------------------------------
	------------------------ MODULES -----------------------------
	------------------------------------------------------------*/
	function getModules(course) {
		// Get the modules for the selected course
		var url = "includes/functions.inc.php?action=getModulesAPI";
		var data = {"course": course};
		//Empty the info DIV
		$("#infoDiv").html("");
		$("#infoDiv").append("<div id=\"accordion\"></div>");
		$.ajax({
			url: url,
			data: data,
			method: "GET",
			datatype: "json"
			}).done( function(data) {
				data = JSON.parse(data);
				// Iterate through each module
				for(var i=0;i<data.length;i++){
					var itemsURL = data[i].items_url;
					// Begin building a string to display the module content
					var moduleString = "";
					moduleString += "<h3>"+data[i].name+"</h3>";
					moduleString += "<div id="+data[i].id+"></div>";
					$("#accordion").append(moduleString);
					// Get the items for the module 
					var url = "includes/functions.inc.php?action=getModuleItemsAPI";
					var itemData = {"url": itemsURL};
					$.ajax({
					 	url: url,
					 	data: itemData,
						method: "GET",
						datatype: "json" 
					}).done( function(moduleData){
						moduleData = JSON.parse(moduleData);
						// Iterate through each item in the module
						for(var i=0;i<moduleData.length;i++) {
							// Create a header that links to more infomation about the module item
							// Attach the ID so it can be used to retrieve the item content
							var moduleItemString = "<h4 class=\"moduleItemLink\" id="+moduleData[i].id+">"+moduleData[i].title+"</h4>";
							// Select the moduleDiv by id. Then display the module item
							$("#"+moduleData[i].module_id).append(moduleItemString);
						}

					});
				}
				// Use JQUERY UI to create an accordion from the modules
						$("#accordion").accordion({
							heightStyle: "content"
						});
		});
	}

	function getQuizzes(course) {
		// Get the quizzes associated with a course
		var url = "includes/functions.inc.php?action=getQuizzesAPI";
		data = {"course": course};
		$.ajax({
			url: url,
			data: data,
			method: "GET",
			datatype: "json"
			}).done( function(data) {
				//data = JSON.parse(data);
				console.log(data);
		});
	}

	function getDiscussions(course) {
		// Get discussion info for the user
		var url = "includes/functions.inc.php?action=getDiscussionsAPI";
		data = {"course": course};
		$.ajax({
			url: url,
			data: data,
			method: "GET",
			datatype: "json"
		}).done( function(data){
			data = JSON.parse(data);
			console.log(data);
		});
	}

	/*--------------------- CLICK EVENTS ------------------------*/
	// SELECT COURSE
	$("#selectCourseForm").on("click", "#selectCourse", function(){
		// When the course selct button is clicked, stop the form from posting, and call a funtion to get assingments
		event.preventDefault();
		var course = $("#selectCourseSelect").val();
		// Use the course ID to get information about the course
		getCourseInfo(course);
		// Display a subheader for the course
		//var subHeaderString = "<h2>"+courseInfo.name+"</h2>";
		$("#subheader").html()
		displayMenu(course);
		//getAssignments(course);
	});
	// MODULES
	$("nav").on("click", "#moduleButton", function(){
		var course = $("#selectCourseSelect").val();
		getModules(course);
    	
	});
	// GRADES
	$("nav").on("click", "#gradeButton", function(){
		var course = $("#selectCourseSelect").val();
		getGrades(course);
	});
	// ASSIGNMENTS
	$("nav").on("click", "#assignmentButton", function(){
		var course = $("#selectCourseSelect").val();
		//displayMenu(course);
		getAssignments(course);
	});
	// QUIZZES
	$("nav").on("click", "#quizButton", function(){
		var course = $("#selectCourseSelect").val();
		getQuizzes(course);
	});
	// DISCUSSIONS
	$("nav").on("click", "#discussionButton", function(){
		var course = $("#selectCourseSelect").val();
		getDiscussions(course);
	});

});