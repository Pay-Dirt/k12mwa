var schoolApp = angular.module('schoolApp');
schoolApp.controller('loginCtrl',['$scope','$rootScope','$location','Session','Error','Auth','UserSessionData',function($scope,$rootScope,$location,Session,Error,Auth,UserSessionData){
	//if user is already present send him to home url
	if(UserSessionData.user.authenticated=="yes"){$location.path('/schools');}
	//to sign in
	$scope.signin = function(){
		Auth.signin($scope.session);
	};
	
	
}]);