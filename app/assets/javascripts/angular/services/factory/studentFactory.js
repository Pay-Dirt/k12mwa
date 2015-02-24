//Created by Akash
//will be merged to school services file in near future
var schoolServices = angular.module('schoolServices');

schoolServices.factory('Student',['Resource',function(Resource){
	return Resource.create("students/:id");
}]);