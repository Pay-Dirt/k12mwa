var schoolApp = angular.module('schoolApp');
schoolApp.controller('sectionCtrl',['$scope','$routeParams','Student',function($scope,$routeParams,Student){
	$scope.sectionId = $routeParams.classroomId;
	$scope.classroomId = $routeParams.sectionId;
	/*data required
	 * students list(done)
	 * classteacher
	 * teachers along with their lectures
	 * attendance
	 * 
	 */
	Student.all({},function(data){
		$scope.students = data;
	});
	
}]);