var schoolApp = angular.module('schoolApp',['ngRoute','schoolServices']);

schoolApp.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: '/template/classrooms',
		controller: 'classroomCtrl'
	})
	.otherwise({redirectTo: '/'});
}]);