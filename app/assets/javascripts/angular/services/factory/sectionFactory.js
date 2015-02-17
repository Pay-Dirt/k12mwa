var schoolServices = angular.module('schoolServices');

schoolServices.factory('Section',['Resource',function(Resource){
	return Resource.create("sections/:id");
}]);