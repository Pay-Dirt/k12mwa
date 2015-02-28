angular.module('schoolApp').controller('classroomSectionCtrl',['$scope','$routeParams','ClassroomSectionStudents',function($scope,$routeParams,ClassroomSectionStudents){
	$scope.classroomId=$routeParams.classroomId;
	$scope.sectionId=$routeParams.sectionId;
    $scope.buttonClass="btn btn-success";
    $scope.buttonName = "Present";
    $scope.toggleCustom = function() {
    	$scope.buttonName = $scope.buttonName === "Present" ? "Absent":"Present";
    	$scope.buttonClass = $scope.buttonClass === "btn btn-success" ? "btn btn-danger":"btn btn-success";
    };
	//get the list of all students in a particular section
	var classroomSectionStudent = function(){
		ClassroomSectionStudents.all({'classroomId':$routeParams.classroomId,'sectionId':$routeParams.sectionId},function(data){
			$scope.classroomSectionStudent = data;
			$scope.data = data;
			},function(error){$scope.error = error;});
	};
	classroomSectionStudent();
	
    

}]);