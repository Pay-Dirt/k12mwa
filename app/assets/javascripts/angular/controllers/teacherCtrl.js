var classroomCtrl = angular.module('schoolApp').controller('teacherCtrl',['$scope','$http',function($scope,$http){
	$scope.loadTeachers = $http.get('teachers').success(function(data){
		$scope.teachers = data;
	});
}]);