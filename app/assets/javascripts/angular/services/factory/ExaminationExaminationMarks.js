angular.module('schoolApp').factory('ExaminationExaminationMarks',['Resource',function(Resource){
	return Resource.create('examinations/:examinationId/examination_results/:id');
}]);