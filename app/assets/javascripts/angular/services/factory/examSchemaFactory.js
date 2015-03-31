var schoolApp = angular.module('schoolApp');
schoolApp.factory('ExaminationExamSchemas',function(Resource){
	return Resource.create('examinations/:examinationId/exam_schemas/:id');
});