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
angular.module('schoolApp').controller('ModalInstanceCtrl',['$scope','$modalInstance','teacherToDelete','Teacher',function ($scope, $modalInstance,teacherToDelete,Teacher) {
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
	  console.log($scope.teacherToDelete.name);

		Teacher.destroy({id:$scope.teacherToDelete.id},
				function(data){
			$scope.teachers.splice($scope.teachers.indexOf($scope.teacherToDelete.id),1);
		});
	  
    $modalInstance.close('success');
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('failed');
  };
}]);
