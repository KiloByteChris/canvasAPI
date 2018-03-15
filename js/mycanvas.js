$(document).ready( function(){
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
		//menuString += "<li><button class=\"navButton\" id=\"gradeButton\" value="+course+">Grades</button></li>";
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
			for (var i = 0 ; i < data.length; i++) {
				// Select to correct course from the enrollment object
				if(data[i].course_id == course){
					// Display the current score int he class
					$("#gradeDiv").html("");
					var gradeString = "<p id=\"grade\">Current Score: "+data[i].grades["current_score"]+"</p>";
					$("#gradeDiv").html(gradeString);
				}
				// If no current score information is given. display "-"
				if(typeof gradeString == "undefined"){
					$("#gradeDiv").html("");
					var gradeString = "<p id=\"grade\">Current Score: - </p>";
					$("#gradeDiv").html(gradeString);
				}
			}
		});
	}

	/*--------------------------------------------------------------
	--------------------- ASSIGNMENTS ------------------------------
	--------------------------------------------------------------*/
	function displayAssignmentsTable(data) {
		// This function takes the data from the getAssignemtns function and displays the assignments as 3 differnt tables
		// There are tables for past, undated, and future assignments.
		$("#infoDiv").html("");
		//Create a string that creates tables for past, undated, and future assignments
		var tablesString = "<div id=\"accordion\">";
			tablesString += "<h4>Future Assignments</h4>";
				tablesString += "<div id=\"futureAssignments\">";
				tablesString += "<table id=\"futureAssignmentsTable\">";
					tablesString += "<tr><th>Assignment</th><th>Possible Points</th><th>Due Date</th></tr>";
					// check if the assignment is still in the future
					for(var i=0;i<data.length;i++){
						var dueDate = data[i].due_at;
						var now = new Date();
						var d1 = Date.parse(dueDate);
						if(now<d1){
							// check to see if points possible is NULL, if so, assign 0
							if(data[i].points_possible == null ) {
								var pointsPossible = "-";
							}else{
								var pointsPossible = data[i].points_possible;
							}
							tablesString += "<tr>";
							dueDate = moment(dueDate).format('MMMM Do YYYY, h:mm:ss a');
							tablesString += "<td><a href="+data[i].html_url+">"+data[i].name+"</a></td><td>"+pointsPossible+"</td><td>"+dueDate+"</td>";
							tablesString += "</tr>";
						}
					}
				tablesString += "</table>";
				tablesString += "</div>";
			tablesString += "<h4>Undated Assignments</h4>";
				tablesString += "<div id=\"undatedAssignments\">";
				tablesString += "<table id=\"undatedAssignmentsTable\">";
					tablesString += "<tr><th>Assignment</th><th>Possible Points</th><th>Score</th></tr>";
					// check if the assignment is undated
					for(var i=0;i<data.length;i++){
						var dueDate = data[i].due_at;
						if(dueDate == null){
							// check to see if points possible is NULL, if so, assign 0
							if(data[i].points_possible == null ) {
								var pointsPossible = "-";
							}else{
								var pointsPossible = data[i].points_possible;
							}
							tablesString += "<tr>";
							//dueDate = moment(dueDate).format('MMMM Do YYYY, h:mm:ss a');
							tablesString += "<td><a href="+data[i].html_url+">"+data[i].name+"</a></td><td>"+pointsPossible+"</td><td id="+data[i].id+"Grade"+"></td>";
							tablesString += "</tr>";
							getAssignmentGrade(data[i].course_id, data[i].id);
						}
					}
				tablesString += "</table>";
				tablesString += "</div>";
			tablesString += "<h4>Past Assignments</h4>";
				tablesString += "<div id=\"pastAssignments\">";
				tablesString += "<table id=\"pastAssignmentsTable\">";
					tablesString += "<tr><th>Assignment</th><th>Possible Points</th><th>Score</th><th>Due Date</th></tr>";
					// check if the assignment is still in the future
					for(var i=0;i<data.length;i++){
						var dueDate = data[i].due_at;
						var now = new Date();
						var d1 = Date.parse(dueDate);
						if(now>d1){
							// check to see if points possible is NULL, if so, assign "-"
							if(data[i].points_possible == null ) {
								var pointsPossible = "-";
							}else{
								var pointsPossible = data[i].points_possible;
							}
							tablesString += "<tr>";
							dueDate = moment(dueDate).format('MMMM Do YYYY, h:mm:ss a');
							tablesString += "<td><a href="+data[i].html_url+">"+data[i].name+"</a></td><td>"+pointsPossible+"</td><td id="+data[i].id+"Grade"+"></td><td>"+dueDate+"</td>";
							tablesString += "</tr>";
							getAssignmentGrade(data[i].course_id, data[i].id);
						}
					}
				tablesString += "</table>";
				tablesString += "</div>";
		tablesString += "</div>"; // end accordion
		$("#infoDiv").html(tablesString);
		$("#accordion").accordion();	
	}

	function getAssignments(course) {
		// Get all assignments for the selected Canvas course
		var url = "includes/functions.inc.php?action=getAssignments";
		var data = {"course": course};
		$.ajax({
			url: url,
			data: data,
			method: "GET",
			datatype: "json"
			}).done( function(data) {
				// Process the results of the ajax request
				data = JSON.parse(data);
				// Display the assingments
				console.log(data);
				displayAssignmentsTable(data);
			});
	}

	function getAssignmentGrade(course, assignment) {
		// Get the grade for an assignment
		// This function is called within the getAssignments funtion
		var url = "includes/functions.inc.php?action=getAssignmentGrade";
		var data = {
			"course" : course,
			"assignment" : assignment
		}
		$.ajax({
			url: url,
			data: data,
			method: "GET",
			datatype: "json"
		}).done( function(data) {
			data = JSON.parse(data);
			console.log(data);
			var assignmentID = data.assignment_id;
			var cellID = "#"+assignmentID+"Grade";
			console.log(data.score);
			console.log(cellID);
			$(cellID).text(data.score);
		})
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
		// Create the accordion div
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
					// Get the url for the api that returns the module items
					var itemsURL = data[i].items_url;
					// Build a string to display the module content
					var moduleString = "<h3>"+data[i].name+"</h3>";
					moduleString += "<div id="+data[i].id+"></div>";
					$("#accordion").append(moduleString);
					// Get the items for the module with another ajax request 
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
							var moduleItemString = "<a href="+moduleData[i].html_url+" ><h4 class=\"moduleItemLink\" id="+moduleData[i].id+" value="+moduleData[i].module_id+">"+moduleData[i].title+"</h4></a>";
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

	function getModuleItemContent(moduleID, itemID, course) {
		// Get the contetnts on an single module item
		var url = "includes/functions.inc.php?action=getModuleItemContentAPI";
		var data = {"moduleID": moduleID, "itemID": itemID, "course": course};
		$.ajax({
			url: url,
			data: data,
			datatype: "json",
			method: "GET"
		}).done( function(moduleItemData) {
			moduleItemData = JSON.parse(moduleItemData);
			console.log(moduleItemData);
		});
	}

	/*------------------------------------------------------------
	------------------------ QUIZZES -----------------------------
	------------------------------------------------------------*/
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

	/*------------------------------------------------------------
	------------------------ DISCUSSIONS -------------------------
	------------------------------------------------------------*/
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
			//Clear the page
			$("#infoDiv").html("");
			// Check to see if the discussions request returned any data
			if(data.length > 0){
				// If there is data, build a string to display the discussion data
				var discussionString = "<div id=\"accordion\">";
					// Begin Upcoming discussions
						discussionString += "<h3>Upcoming Discussions</h3>";
						discussionString += "<div id=\"openDiscussionsDiv\">";
						discussionString += "<table id=\"upcomingDiscussionsTable\">";
						discussionString += "<tr><th>Discussions</th><th>Points</th><th>Due Date</th>";
						// Iterate through the discussion data
						for(var i = 0; i < data.length; i++){
							console.log(data[i]);
							// Check to see if the due date for the discussion has expired
							var dueDate = data[i].assignment.due_at;
							var now = new Date();
							var d1 = Date.parse(dueDate);
							// Count to see if there are any upcoming discussions
							var j = 0;
							if(now<d1){
								j++
								discussionString += "<tr>";
								discussionString += "<td><a href="+data[i].html_url+"><h4>"+data[i].title+"</h4></a></td>";
								discussionString += "<td>"+data[i].assignment["points_possible"]+"</td>";
								discussionString += "<td>"+d1+"</td>";
								discussionString += "</tr>";
							}
						}
						// Check to see if there are any discussions, display a message if not
						if(j==0){
								discussionString += "<h4>No Upcoming Discusions</h4>";
						}
					discussionString +="</table>";
					discussionString +="</div>";// End of open discussions div
					// Begin past Discussions
					discussionString += "<h3>Past Discussions</h3>";
						discussionString += "<div id=\"pastDiscussionsDiv\">";
						discussionString += "<table id=\"upcomingDiscussionsTable\">";
						discussionString += "<tr><th>Discussions</th><th>Points</th><th>Due Date</th>";
						// Iterate through the discussion data
						for(var i = 0; i < data.length; i++){
							console.log(data[i]);
							//Check to see if the due date for the discussion has expired
							var dueDate = data[i].assignment.due_at;
							var now = new Date();
							var d1 = Date.parse(dueDate);
							var j = 0;
							if(now>d1){
								j++;
								discussionString += "<tr>";
								discussionString += "<td><a href="+data[i].html_url+"><h4>"+data[i].title+"</h4></a></td>";
								discussionString += "<td>"+data[i].assignment["points_possible"]+"</td>";
								discussionString += "<td>"+d1+"</td>";
								discussionString += "</tr>";
							}
						}
						// Check to see if there are any discussions, display a message if not
						if(j==0){
								discussionString += "<h4>No Past Discussions</h4>";
						}
					discussionString += "</table>";
					discussionString += "</div>";//End of past discussions div
				discussionString += "</div>";//End accordion div
				$("#infoDiv").html(discussionString);
				
			}else if(data.length == 0){
				// If the API request for discussion data didn't return any data, tell the user that there is no discussion data 
				// Build a string to display the messege
				var discussionString = "<h4>There are no discussions for this course</h4>";
				$("#infoDiv").html(discussionString);

			}
			// JQUERY UI accordion
			$("#accordion").accordion({
					heightStyle: "content"
			});	
		});
	}

	/*----------------------------------------------------------
	--------------------- CLICK EVENTS -------------------------
	-----------------------------------------------------------*/
	// SELECT COURSE
	$("#selectCourseForm").on("click", "#selectCourse", function(){
		// When the course selct button is clicked, stop the form from posting, and call a funtion to get assingments
		event.preventDefault();
		$("#infoDiv").html("");
		var course = $("#selectCourseSelect").val();
		// Use the course ID to get information about the course
		getCourseInfo(course);
		// Display a subheader for the course
		//var subHeaderString = "<h2>"+courseInfo.name+"</h2>";
		$("#subheader").html()
		displayMenu(course);
		// Display current grade
		var course = $("#selectCourseSelect").val();
		var grade = getGrades(course);
		console.log(grade);
	});
	// AUTO UPDATE SELECT COURSE
	$("#selectCourseSelect").change( function() {
		// When the course selct button is clicked, stop the form from posting, and call a funtion to get assingments
		event.preventDefault();
		$("#infoDiv").html("");
		$("#gradeDiv").html("");
		var course = $("#selectCourseSelect").val();
		// Use the course ID to get information about the course
		getCourseInfo(course);
		// Display a subheader for the course
		//var subHeaderString = "<h2>"+courseInfo.name+"</h2>";
		$("#subheader").html()
		displayMenu(course);
		// Display current grade
		var course = $("#selectCourseSelect").val();
		var grade = getGrades(course);
		console.log(grade);
	})
	// MODULES
	$("nav").on("click", "#moduleButton", function(){
		var course = $("#selectCourseSelect").val();
		getModules(course);	
	});
	// MODULE ITEM
	$("#infoDiv").on("click", ".moduleItemLink", function(){
		event.preventDefault();
		var course = $("#selectCourseSelect").val();
		var itemID = $(this).prop("id");
		var moduleID = $(this).attr("value");
		getModuleItemContent(moduleID, itemID, course);	
	});
	// GRADES
	$("nav").on("click", "#gradeButton", function(){
		var course = $("#selectCourseSelect").val();
		var grade = getGrades(course);
		console.log(grade);
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