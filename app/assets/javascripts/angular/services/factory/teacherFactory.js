var schoolServices = angular.module('schoolServices');
schoolServices.factory('Teacher',['$http',function($http){
	return {
		list: function(callback){
			$http.get('teachers').success(callback);
		},
		getTeacher: function(callback,teacherId)
		{
			var url = "teachers/"+teacherId;
			$http.get(url).success(callback);
		}
	};
}]);
