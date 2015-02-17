var schoolServices = angular.module('schoolServices');

schoolServices.factory('Classroom',['Resource',function(Resource){
	return Resource.create("classrooms/:id");
	
	/*function createResource(url){
		return {
			//defining http service for all
			all: function(callback,error){
				$http.get(url).success(function(data,responseHeaders){
					callback(data);
				}).error(function(data){error(data);});
			},
			//this will create the classroom
			create: function(data,success,error){
				$http.post(url,data)
				.success(function(data,responseHeaders){success(data);})
				.error(function(data){error(data);});
			},
			destroy: function(id,success,error){
				$http.delete('url'+"/"+id)
				.success(function(data,responseHeaders){success(data);})
				.error(function(data,responseHeaders){});
			}
		};
	};*/
	
}]);