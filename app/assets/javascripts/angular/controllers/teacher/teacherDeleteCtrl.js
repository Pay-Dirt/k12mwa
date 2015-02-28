angular.module('schoolApp').controller('ModalInstanceCtrl',['$scope','$rootScope','$modalInstance','teacherToDelete','Teacher',function ($scope,$rootScope, $modalInstance,teacherToDelete,Teacher) {
	$scope.teacherToDelete=teacherToDelete;
	console.log($scope.teacherToDelete);
	$scope.isMatching=false;
	$scope.keyPress = function(keyCode){
		console.log($scope.teacherToDelete);
	   if($scope.teachers_name==$scope.teacherToDelete.name) {
		   $scope.isMatching=true;
	   }
	   else
		   $scope.isMatching=false;
		};

	
	
  $scope.ok = function () {
	  		Teacher.destroy({id:$scope.teacherToDelete.id},
				function(data){
			$rootScope.teachers.splice($rootScope.teachers.indexOf($scope.teacherToDelete),1);
		});
	  
    $modalInstance.close('success');
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('failed');
  };
}]);
