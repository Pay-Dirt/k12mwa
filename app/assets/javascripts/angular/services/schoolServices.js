var schoolServices = angular.module('schoolServices',['ngResource']);

schoolServices.factory('Classroom',['$resource',function($resource){
	return $resource('classrooms/:classroomId',{classroomId:'@classroomId',sectionId:'@sectionId'},{
		fetchClassrooms: {method: 'GET', url: 'classrooms', isArray: true},
		addClassroom: {method: 'POST', url: 'classrooms', isArray: false},
		addSection: {method: 'POST',params: {classroomId:'1'},isArray: true}
	});
}]);

schoolServices.factory('Section',['$resource',function($resource){
	return $resource('sections/:sectionId',null,{
		
	});
}]);
