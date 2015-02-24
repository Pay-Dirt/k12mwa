/*angular.module('schoolApp').controller('teacherDeleteCtrl',['$scope','$modal',function ($scope, $modal){

  $scope.open = function (size) {
	  console.log('here');
	  var modalInstance = $modal.open({
		  templateUrl: 'teacher_delete.html',
	      controller: 'ModalInstanceCtrl',
	      size: size,
	  	});
	  };
}]);

*/
angular.module('schoolApp').controller('ModalInstanceCtrl',['$scope','$modalInstance','teacherToDelete',function ($scope, $modalInstance,teacherToDelete) {
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
	  
	  console.log($scope.teacherToDelete.id);
    $modalInstance.close('success');
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('failed');
  };
}]);
