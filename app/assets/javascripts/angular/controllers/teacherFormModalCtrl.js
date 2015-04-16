//harshad
/*
var schoolApp = angular.module('schoolApp');
schoolApp.controller('teacherFormModalCtrl',['$scope','$modal',function($scope,$modal){
	$scope.open = function(){
		var modalIns = $modal.open({
			templateUrl: 'teacher_form.html',
			controller :'teacherFormModalInstanceCtrl',
			backdrop: true,
			
		});
	};
}]);

schoolApp.controller('teacherFormModalInstanceCtrl',['$scope','$modalInstance',function($scope,$modalInstance){
	$scope.ok = function(){
		console.log("dsf");
		$modalInstance.close('success');
		
	};
	
	$scope.cancel = function(){
		$modalInstance.dismiss('failed');
	};
}]);*/