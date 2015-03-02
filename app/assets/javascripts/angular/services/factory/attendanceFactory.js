angular.module('schoolServices').factory('Attendance',['Resource',function(Resource){
return Resource.create('attendances/:id');	
}]);