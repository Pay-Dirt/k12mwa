var schoolApp=angular.module('schoolApp').controller('teacherEditCtrl',['$scope','$routeParams','Teacher', function($scope,$routeParams,Teacher){
var teacherId = $routeParams.teacherId;
$scope.bFunction = "Update";
$scope.nameDisabled = false;
$scope.fathers_nameDisabled = false;
$scope.contactDisabled = true;

Teacher.find({'id':teacherId},{},function(data){
	$scope.newTeacher = data;
});
$scope.addTeacher = function(newTeacher){
	console.log(teacherId);
	Teacher.update({'id':teacherId},newTeacher,function(data){
		$scope.newTeacher = data;
		window.history.back();
	});
};

}
]);