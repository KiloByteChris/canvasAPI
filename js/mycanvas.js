
$(document).ready( function(){
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
				var assignmentsString = "<ol>";
				for(var i=0;i<data.length;i++){
					assignmentsString += "<li>"+data[i].name+"</li>";
				}
				assignmentsString += "</ol>";
				$("#assignmentsDiv").html(assignmentsString);
			});
	}

	/*--------------------- CLICK EVENTS ------------------------*/
	$("#selectCourseForm").on("click", "#selectCourse", function(){
		// When the course selct button is clicked, stop the form from posting, and call a funtion to get assingments
		event.preventDefault();
		var course = $("#selectCourseSelect").val();
		getAssignments(course);
	});
});