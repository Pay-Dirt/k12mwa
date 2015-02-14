var schoolApp = angular.module('schoolApp',['ngRoute','schoolServices','ui.bootstrap']);

schoolApp.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: '/template/classrooms',
		controller: 'classroomCtrl'
	})
	.when('/teacher',{
		templateUrl: '/template/teacher',
		controller: 'teacherCtrl'
	})
	.otherwise({redirectTo: '/'});
}]);