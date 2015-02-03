var schoolServices = angular.module('schoolServices',['ngResource']);

schoolServices.factory('Classroom',['$resource',function($resource){
	return $resource('classrooms/:classroomId/sections/:sectionId',null,{
		fetchClassrooms: {method: 'GET', url: 'classrooms', isArray: true},
		addClassroom: {method: 'POST', url: 'classrooms', isArray: false}
	});
}]);

schoolServices.factory('Section',['$resource',function($resource){
	return $resource('sections/:sectionId',null,{
		
	});
}]);