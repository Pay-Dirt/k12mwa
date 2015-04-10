var schoolApp = angular.module('schoolApp',['ngRoute','schoolServices','errorServices','ui.bootstrap','ui-notification','authService','direct','checklist-model','xeditable']);

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
	.when('/schools/course',{
		templateUrl: 'template/courses',
		controller: 'courseCtrl'
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
		templateUrl:'template/teacher_profile',
		controller:'teacherProfileCtrl'
	})
	.when('/schools/teacher/:teacherId/edit',{
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
		controller:'classroomTakeAttendanceCtrl'
	})
	.when('/schools/classroom/:classroomId/section/:sectionId/classroomShowAttendance',{
		templateUrl:'/template/classroomShowAttendance',
		controller:'classroomShowAttendanceCtrl'
	})
	.when('/schools/examination',{
		templateUrl: 'template/examination',
		controller: 'examinationCtrl'
	})
	.when('/schools/examination/:examinationId',{
		templateUrl:'template/selectedExam',
		controller:'selectedExamCtrl'
	})
	.when('/schools/examination/:examinationId/examinationSlot',{
		templateUrl:'template/examinationSlot',
		controller:'selectedExamCtrl'
	})
	.when('/schools/student/add',{
		templateUrl:'template/student_form',
		controller:'studentCtrl'
	})
	.when('/schools/student/view',{
		templateUrl:'',
		controller:'studentCtrl'
	})

	.otherwise({redirectTo: '/checklogin'});
}]);
