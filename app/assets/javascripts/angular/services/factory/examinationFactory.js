angular.module('schoolApp').factory('Examination',['Resource',function(Resource){
	return Resource.create('examinations/:id');
}]);