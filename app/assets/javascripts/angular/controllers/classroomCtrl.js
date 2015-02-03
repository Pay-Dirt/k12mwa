var classroomCtrl = angular.module('schoolApp').controller('classroomCtrl',['$scope','Classroom',function($scope,Classroom){
	$scope.classrooms = Classroom.fetchClassrooms();
}]);