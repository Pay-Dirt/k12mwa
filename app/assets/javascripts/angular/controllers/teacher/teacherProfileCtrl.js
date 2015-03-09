var teacherCtrl = angular.module('schoolApp').controller('teacherProfileCtrl',['$scope','$rootScope','Teacher','$routeParams','Error',function($scope,$rootScope,Teacher,$routeParams,Error){
	$scope.nameDisabled = true;
	$scope.fathers_nameDisabled = true;
	$scope.contactDisabled = true;
	$scope.bFunction = "Add";
	$scope.teacherId = $routeParams.teacherId;
    Teacher.find({'id':$scope.teacherId},{},function(data){
    	Error.parse(data,function(data){
    		$scope.teacher = data.teachers;
        	$scope.newTeacher = data.teachers;
        	$scope.tttt = "teacher_form.html";
        	console.log(data.teachers);
    	},function(data){});
    	
    },function(data){});

}]);
