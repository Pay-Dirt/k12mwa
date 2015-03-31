var schoolApp = angular.module('schoolApp');
schoolApp.factory('Holiday',function(Resource){
	return Resource.create('events/:id');
});