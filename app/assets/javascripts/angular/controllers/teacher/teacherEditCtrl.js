var schoolApp=angular.module('schoolApp').controller('teacherEditCtrl',['$scope','$routeParams','Teacher','Error', function($scope,$routeParams,Teacher,Error){
var teacherId = $routeParams.teacherId;
$scope.bFunction = "Update";
$scope.nameDisabled = false;
$scope.fathers_nameDisabled = false;
$scope.contactDisabled = true;

Teacher.find({'id':teacherId},{},function(data){
	Error.parse(data,function(data){
		$scope.newTeacher = data.teachers;
	},function(data){});
	
});
$scope.addTeacher = function(newTeacher){
	console.log(teacherId);
	Teacher.update({'id':teacherId},newTeacher,function(data){
		Error.parse(data,function(data){
			$scope.newTeacher = data;
			window.history.back();
		},function(data){});

	});
};

}
]);