//Created by Akash
var classroomCtrl = angular.module('schoolApp').controller('classroomCtrl',['$scope','$http','$rootScope','Classroom','Section','ClassroomSections','DefaultClassrooms','Notification','Auth','Error','$routeParams',
		 function($scope,$http,$rootScope,Classroom,Section,ClassroomSections,DefaultClassrooms,Notification,Auth,Error,$routeParams){
	
	$rootScope.main=0;
	$rootScope.tab=1;

	$scope.signout = function(){Auth.signout();};
	//fetch list of default classrooms in $scope.defaultClassrooms
	//fetch list of default classrooms
	var defaultClassroomLoad = function(){
		DefaultClassrooms.all({},function(data){
			Error.parse(data,function(data){
				$scope.defaultClassrooms = data.default_classrooms;
			},function(data){});
			});
	};
	defaultClassroomLoad();
	
	//here we load classrooms with all the section informations
	Classroom.all({},function(data,responseHeaders){
		
		Error.parse(data,function(data){
			if(data.classrooms.length==0){$rootScope.classrooms=[];$rootScope.sections=[];}
			else{fetchSection(data.classrooms);}
		},function(data){});
		
	},function(errData){
		//console.log(errData);
	});
	
	//this will add a new classroom
	$scope.addClassroom = function(classroomId){
		var data = '{"default_classroom_id":"' + classroomId +'"}';
		//this will return the classroom information along with section after it is created
		Classroom.create({},data,function(data){
			Error.parse(data,function(data){
				$rootScope.classrooms.push(data.classroom);
				$scope.newClassroom = "";
				ClassroomSections.all({classroomId:data.classroom.id},function(data){
					Error.parse(data,function(data){
						//console.log(data.sections[0]);
						//console.log($rootScope.sections);
						$rootScope.sections.push(data.sections[0]);
					},function(data){console.log(data);});
				});
			},function(data){
				Error.parse(data,function(data){},function(data){});
				$scope.newClassroom = "";
			});
			
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
		Section.all({},function(data,responseHeaders){
			Error.parse(data,function(data){
				$rootScope.sections = data.sections;$rootScope.classrooms = classroomData;
			},function(data){});
		});
	};
	
	//faltu function declared here

}]);
