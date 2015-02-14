var schoolApp = angular.module('schoolApp');
schoolApp.controller('modalCtrl',['$scope','$modal',function($scope,$modal){
	$scope.open = function(size){
		var modalIns = $modal.open({
			templateUrl: 'contactus.html',
			controller: 'modalInstanceCtrl',
			backdrop: false,
			size: size
		});
		
		modalIns.result.then(function(result){
			console.log(result+" akash");
		},function(result){
			console.log(result);
		});
	};
}]);

schoolApp.controller('modalInstanceCtrl',['$scope','$modalInstance',function($scope,$modalInstance){
	$scope.ok = function(){
		$modalInstance.close('success');
	};
	
	$scope.cancel = function(){
		$modalInstance.dismiss('failed');
	};
}]);