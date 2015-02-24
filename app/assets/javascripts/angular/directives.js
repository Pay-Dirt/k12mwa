var directive = angular.module('direct',[]).directive('teacher',function(){
	return{
			restrict: 'E',
			scope: {
				teacher:'=teacher'
				},
			templateUrl: 'teacher_directive.html',
			
	controller: function($scope,Teacher){
			var teacher = $scope.teacher;
		Teacher.find({'id':teacher},{},function(data){$scope.tosh = data;console.log(data);
	});
	 }
		};
});
var module = angular.module('direct');
module.directive('teacherData',function(){
	return{
		restrict :'E',
		scope: {
			teacher:'=teacher'
		},
		templateUrl:'teacher_directive.html',
		controller: function($scope,Teacher,$modal){
			
			
			$scope.open = function (size,teacher) {

				$scope.teacherToDelete=teacher;
//				console.log($scope.teacherToDelete);
				  var modalInstance = $modal.open({
					  templateUrl: 'teacher_delete.html',
				      controller: 'ModalInstanceCtrl',
				      size: size,
				      resolve: {
				          teacherToDelete: function () {
				            return $scope.teacherToDelete;
				          }}
				  	});
				  };
				  
				  
				  
				  
				  
			
			var teacher = $scope.teacher;
			$scope.removeTeacher=function(teacher){
				
			};
	 }
		};
});