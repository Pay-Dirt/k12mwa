//Create by Akash
var schoolServices = angular.module('schoolServices');

schoolServices.factory('Classroom',['Resource',function(Resource){
	return Resource.create("classrooms/:id");
		
}]);
