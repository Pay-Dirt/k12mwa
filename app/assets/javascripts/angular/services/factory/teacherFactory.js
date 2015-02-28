var schoolServices = angular.module('schoolServices');
schoolServices.factory('Teacher',['$http','Resource',function($http,Resource){
	return Resource.create('teachers/:id');
	
}]);
/*
 * {
		list: function(callback){
			$http.get('teachers').success(callback);
		},
		getTeacher: function(callback,teacherId)
		{
			var url = "teachers/"+teacherId;
			$http.get(url).success(callback);
		},
		create: function(data,callback){
			var url = "teachers";
			$http.post(url,data).success(callback);
		}
		};
 */