angular.module('schoolServices').factory('ExaminationSlots',['Resource',function(Resource){
	return Resource.create('examinations/:examinationId/slots/:id');
}]);