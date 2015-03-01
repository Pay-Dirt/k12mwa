
var schoolApp = angular.module('schoolApp',['ngRoute','schoolServices','errorServices','ui.bootstrap','ui-notification','authService','direct']);

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
	.when('/classroom/:classroomId/section/:sectionId',{
		templateUrl:'/template/classroom_section',
		controller:'classroomSectionCtrl'
	})
	.when('/classroomHome',{
		templateUrl:'/template/classroom_home',
		controller:'classroomHomeCtrl'
	})
	.when('/schools/classrooms/:classroomId/sections/:sectionId',{
		templateUrl: '/template/sections',
		controller: 'sectionCtrl'
	})
	.otherwise({redirectTo: '/login'});
}]);
