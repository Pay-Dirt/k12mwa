var classroomCtrl = angular.module('schoolApp').controller('teacherCtrl',['$scope','$http','Teacher',function($scope,$http,Teacher){
	//$scope.loadTeachers = $http.get('teachers').success(function(data){
	//	$scope.teachers = data;
	//});
	Teacher.list(function(data){
		$scope.teachers = data;
	});
}]);