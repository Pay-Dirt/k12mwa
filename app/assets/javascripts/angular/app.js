var schoolApp = angular.module('schoolApp',['ngRoute','schoolServices','ui.bootstrap','direct']);

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
	.when('/teacher/new',{
		templateUrl:'teacher_form.html',
		controller:'teacherCtrl'
	})
	.when('/teacher/:teacherId',{
		templateUrl:'teacher_profile.html',
		controller:'teacherCtrl'
	})
	.when('/teacher/:teacherId/edit',{
		templateUrl:'teacher_form.html',
		controller:'teacherEditCtrl'
	})
	
	.otherwise({redirectTo: '/'});
}]);