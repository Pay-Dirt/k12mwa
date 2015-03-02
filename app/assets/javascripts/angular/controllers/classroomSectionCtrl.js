angular.module('schoolApp').controller('classroomSectionCtrl',['$scope','$rootScope','$routeParams','ClassroomSectionStudents','Error',function($scope,$rootScope,$routeParams,ClassroomSectionStudents,Error){
	$scope.classroomId=$routeParams.classroomId;
	$scope.sectionId=$routeParams.sectionId;
    $scope.buttonClass="btn btn-success";
    $scope.buttonName = "Present";
	$rootScope.currentUrl="schools/classroom/"+$scope.classroomId+"/section/"+$scope.sectionId;
	//get the list of all students in a particular section
	var classroomSectionStudent = function(){
		ClassroomSectionStudents.all({'classroomId':$routeParams.classroomId,'sectionId':$routeParams.sectionId},function(data){
			Error.parse(data,function(data){
				$scope.classroomSectionStudent = data.students;
				$scope.data = data.students;
			},function(data){});
			
			},function(error){$scope.error = error;});
	};
	classroomSectionStudent();
	
    

}]);