var schoolServices = angular.module('schoolServices');
schoolServices.factory('Teacher',['$http','Resource',function($http,Resource){
	return Resource.create('teachers/:id');
	
}]);
