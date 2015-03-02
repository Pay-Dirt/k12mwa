
var schoolApp = angular.module('schoolApp',['ngRoute','schoolServices','errorServices','ui.bootstrap','ui-notification','authService','direct']);

schoolApp.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/',{
		
	})
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
	.when('/teacher/new',{
		templateUrl:'teacher_form.html',
		controller:'teacherCtrl'
	})
	.when('/schools/teacher',{
		templateUrl: 'template/teacher',
		controller: 'teacherCtrl'
	})
	.when('/schools/teacher/:teacherId',{
		templateUrl:'teacher_profile.html',
		controller:'teacherCtrl'
	})
	.when('/teacher/:teacherId/edit',{
		templateUrl:'teacher_form.html',
		controller:'teacherEditCtrl'
	})
	.when('/schools/classroom/:classroomId/section/:sectionId',{
		templateUrl:'/template/classroomHome',
		controller:'classroomSectionCtrl'
	})
	.when('/schools/classroom/:classroomId/section/:sectionId/classroomHome',{
		templateUrl:'/template/classroomHome',
		controller:'classroomSectionCtrl'
	})
	.when('/schools/classroom/:classroomId/section/:sectionId/classroomTakeAttendance',{
		templateUrl:'/template/classroomTakeAttendance',
		controller:'classroomAttendanceCtrl'
	})
	.when('/schools/classroom/:classroomId/section/:sectionId/classroomShowAttendance',{
		templateUrl:'/template/classroomShowAttendance',
		controller:'classroomAttendanceCtrl'
	})
	
	.otherwise({redirectTo: '/checklogin'});
}]);
