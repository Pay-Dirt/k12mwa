var schoolApp = angular.module('schoolApp');
schoolApp.controller('sectionCtrl',['$scope','$routeParams',function($scope,$routeParams){
	$scope.sectionId = $routeParams.classroomId;
	$scope.classroomId = $routeParams.sectionId;
	/*data required
	 * students list(done)
	 * classteacher
	 * teachers along with their lectures
	 * attendance
	 * 
	 */
	
	
}]);