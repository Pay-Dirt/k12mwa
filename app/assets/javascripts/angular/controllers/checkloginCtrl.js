var schoolApp = angular.module('schoolApp');
schoolApp.controller('checkloginCtrl',['$scope','$location','Auth',function($scope,$location,Auth){
	Auth.checklogin();
}]);