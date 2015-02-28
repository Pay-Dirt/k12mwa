var authService = angular.module('authService',['errorServices']);
authService.factory('UserSessionData',[function(){
	var userSessionData = {};
	return {
		user: userSessionData
	};
}]);
//this factory is to  signin, signout and set userdata
authService.factory('Auth',['$location','$http','Session','Notification','UserSessionData','Error',function($location,$http,Session,Notification,UserSessionData,Error){
	//inside user is userd here to bind the function in this service & have same data
	//var insideUser = {};
	return{
		//user: insideUser,
		signin: function(sessionData){
			Session.create({},sessionData,function(data){
				//data format {success:{success:"",type:"",}}
				Error.parse(data,function(data){
					console.log(data);
					UserSessionData.user.info = data.session;
					UserSessionData.user.authenticated = "yes";
					$location.path('schools/');
					//console.log(user);
				},function(data){
					UserSessionData.user = {};
				});
			});
		},
		signout: function(){
			Session.destroy({id:1},function(data){
				UserSessionData.user = {};
				$location.path('/checklogin');
			});
		},
		checklogin: function(){
			$http.get('sessions/checklogin').success(function(data,responseHeaders){
				//console.log(data);
				Error.parse(data,function(data){
					console.log(data);
					UserSessionData.user.info = data.session;
					UserSessionData.user.authenticated = "yes";
					$location.path('/schools');
				},function(data){console.log(data);});
			}).error(function(data){console.log(data);});
		}
	};
}]);

//this maps the rails restapi to Session factory
authService.factory('Session',['Resource',function(Resource){
	return Resource.create('/sessions/:id');
}]);
