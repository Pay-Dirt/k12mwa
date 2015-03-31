angular.module('schoolApp').factory('ClassroomCourses',['Resource',function(Resource){
	return Resource.create('classrooms/:classroomId/courses/:id');
}]);