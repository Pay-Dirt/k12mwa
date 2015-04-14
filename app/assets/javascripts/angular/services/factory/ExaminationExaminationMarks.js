angular.module('schoolApp').factory('ExaminationExaminationMarks',['Resource',function(Resource){
	return Resource.create('examinations/:examinationId/results/:id');
}]);