var schoolApp = angular.module('schoolApp');
schoolApp.factory('DefaultMainSubject',['Resource',function(Resource){
	return Resource.create("default_main_subjects/:id");
}]);