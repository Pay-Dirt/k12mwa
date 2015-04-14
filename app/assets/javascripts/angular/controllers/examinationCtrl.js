var schoolApp = angular.module('schoolApp');
schoolApp.controller('examinationCtrl',['$scope','Classroom','Error','$rootScope','$filter','ClassroomMainSubjects','ExaminationExamSchemas','Examination',function($scope,Classroom,Error,$rootScope,$filter,ClassroomMainSubjects,ExaminationExamSchemas,Examination){
	Examination.find({},function(data){
	Error.parse(data,function(data){
		$scope.examinations=data.examination;
	},function(data){});
	
},function(data){});
	
	$scope.addExamination=function(){
		Examination.create({},$scope.examination,function(data){
			Error.parse(data,function(data){
				
				Examination.find({},function(data){
					Error.parse(data,function(data){
						$scope.examinations=data.examination;
					    $scope.examination="";
					},function(data){});
					
				},function(data){});

			},function(data){});
		},function(data){});
	};
}]);
