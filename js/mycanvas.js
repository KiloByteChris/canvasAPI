$(document).ready( function(){
	function getAssignments(course) {
		var url = "includes/functions.inc.php?action=getAssignments";
		data = {"course": course};
		$.ajax({
			url: url,
			data: data,
			method: "GET",
			datatype: "json"
			}).done( function(data) {
				data = JSON.parse(data);
				var assignmentsString = "<ol>";
				for(var i=0;i<data.length;i++){
					assignmentsString += "<li>"+data[i].name+"</li>";
				}
				assignmentsString += "</ol>";
				$("#assignmentsDiv").html(assignmentsString);
			});
	}

	$("#selectCourseForm").on("click", "#selectCourse", function(){
		event.preventDefault();
		var course = $("#selectCourseSelect").val();
		getAssignments(course);
	});

});