//Created by Akash
var classroomCtrl = angular.module('schoolApp').controller('classroomCtrl',
		['$scope','$rootScope','Classroom','Section','ClassroomSections','DefaultClassrooms',
		 function($scope,$rootScope,Classroom,Section,ClassroomSections,DefaultClassrooms){
	$rootScope.main=0;
	$rootScope.tab=1;
	//fetch list of default classrooms in $scope.defaultClassrooms
	//fetch list of default classrooms
	var defaultClassroomLoad = function(){
		DefaultClassrooms.all({},function(data){$scope.defaultClassrooms = data;});
	};
	defaultClassroomLoad();
	
	//here we load classrooms with all the section informations
	Classroom.all({},function(data,responseHeaders){
		if(data.classrooms == "none"){}
		else{
			//this will make sure that classroom are loaded in scope only after sections are
			// this is important while we are using these with directives
			fetchSection(data);
		}
	},function(errData){
		console.log(errData);
	});
	
	//this will add a new classroom
	$scope.addClassroom = function(classroomId){
		var data = '{"default_classroom_id":"' + classroomId +'"}';
		//this will return the classroom information along with section after it is created
		Classroom.create({},data,
				function(data){
			if(data.success == "no"){
				alert("Can't create classroom");
				$scope.newClassroom = "";
			}
			else{
			$rootScope.classrooms.push(data);
			$scope.newClassroom = "";
			ClassroomSections.find({classroomId:data.id},{},function(data){
				$rootScope.sections.push(data[0]);
			});
			}
	});
	};
	
	//this will delete classroom along with its sections
	$scope.deleteClassroom = function(classroom){
		Classroom.destroy({id:classroom.id},
				function(data){
			$rootScope.classrooms.splice($rootScope.classrooms.indexOf(classroom),1);
		});
	};
	
	
	//this function will fetch 
	var fetchSection = function(classroomData){
		Section.all({},function(data,responseHeaders){$rootScope.sections = data;$rootScope.classrooms = classroomData;});
	};
	
	//faltu function declared here
	
}]);