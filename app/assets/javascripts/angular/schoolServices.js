var schoolServices = angular.module('schoolServices',['ngResource','pg-resource']);

schoolServices.factory('ClassroomSections',['Resource',function(Resource){
	return Resource.create('classrooms/:classroomId/sections/:id');
}]);
schoolServices.factory('DefaultClassrooms',['Resource',function(Resource){
	return Resource.create('/default_classrooms/:id');
}]);
