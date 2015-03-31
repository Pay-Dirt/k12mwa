var schoolApp = angular.module('schoolApp');
schoolApp.factory('ClassroomMainSubjects',['Resource',function(Resource){
	return Resource.create('classrooms/:classroomId/main_subjects/:id');
}]);