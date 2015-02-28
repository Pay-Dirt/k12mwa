var schoolApp = angular.module('schoolApp',['ngRoute','schoolServices','errorServices','ui.bootstrap','ui-notification','authService']);

schoolApp.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/',{})
	.when('/schools/',{
		templateUrl: '/template/classrooms',
		controller: 'classroomCtrl'
	})
	.when('/checklogin',{
		templateUrl: 'template/checklogin',
		controller: 'checkloginCtrl'
	})
	.when('/login',{
		templateUrl: '/template/login',
		controller: 'loginCtrl'
	})
	.when('/logout',{
		templateUrl: 'template/logout',
		controller: 'logoutCtrl'
	})
	.when('schools/teacher/:teacherId',{
		templateUrl: '/template/teacher',
		controller: 'teacherCtrl'
	})
	.when('/schools/classrooms/:classroomId/sections/:sectionId',{
		templateUrl: '/template/sections',
		controller: 'sectionCtrl'
	})
	.otherwise({redirectTo: '/login'});
}]);