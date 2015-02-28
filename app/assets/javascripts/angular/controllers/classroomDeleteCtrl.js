angular.module('schoolApp').controller('classroomModalInstanceCtrl',['$scope','$rootScope','$modalInstance','classroomToDelete','Classroom',function ($scope,$rootScope, $modalInstance,classroomToDelete,Classroom) {
	$scope.classroomToDelete=classroomToDelete;
	$scope.isMatching=false;
	$scope.keyPress = function(keyCode){
		console.log($scope.classroomToDelete);
	   if($scope.classroom_id==$scope.classroomToDelete.id) {
		   $scope.isMatching=true;
	   }
	   else
		   $scope.isMatching=false;
		};

	
	
  $scope.ok = function () {
	  console.log($scope.classroomToDelete.id);

		Classroom.destroy({id:$scope.classroomToDelete.id},
				function(data){
			$rootScope.classrooms.splice($rootScope.classrooms.indexOf($scope.classroomToDelete),1);
		});
	  
    $modalInstance.close('success');
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('failed');
  };
}]);
