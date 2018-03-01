$(document).ready( function(){
	// function getAssignments(course) {

	// }

	$("#selectCourseForm").on("click", "#selectCourse", function(){
		event.preventDefault();
		var course = $("#selectCourseSelect").val();
		console.log(course);
		//getAssignments(course);
	});

});