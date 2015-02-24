//Created by Akash
var classroomCtrl = angular.module('schoolApp').controller('classroomCtrl',
		['$scope','$http','Classroom','Section','ClassroomSections','DefaultClassrooms',
		 function($scope,$http,Classroom,Section,ClassroomSections,DefaultClassrooms){
	//fetch list of default classrooms in $scope.defaultClassrooms
	//fetch list of default classrooms
	var defaultClassroomLoad = function(){
		DefaultClassrooms.all({},function(data){$scope.defaultClassrooms = data;});
	};
	defaultClassroomLoad();
	$scope.classrooms = [];$scope.sections = [];
	//here we load classrooms with all the section informations
	Classroom.all({},function(data,responseHeaders){
		if(data.classrooms == "none"){}
		else{
			$scope.classrooms = data;
			fetchSection();
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
			$scope.classrooms.push(data);
			//console.log($scope.classrooms);
			$scope.newClassroom = "";
			ClassroomSections.find({classroomId:data.id},{},function(data){
				$scope.sections.push(data[0]);
			});
			}
	});
	};
	
	//this will delete classroom alongwith its sections
	$scope.deleteClassroom = function(classroom){
		Classroom.destroy({id:classroom.id},
				function(data){
			$scope.classrooms.splice($scope.classrooms.indexOf(classroom),1);
		});
	};
	
	//this function will increment section
	$scope.addSection = function(classroom){
		ClassroomSections.create({classroomId:classroom},{},
				function(data){
					if(data.success == "no"){alert(data.error);}
					else{$scope.sections.push(data);}
				});
	};
	
	//this function will remove last section added
	$scope.removeSection = function(classroom){
		var url = "classrooms/"+classroom+"/sections/1";
		$http.delete(url).success(function(data){
			//this will remove the section from the model of angular
			//console.log(data.success);
			if(data.success == "no"){
				alert("Can't delete");}
			else{
				$scope.sections.splice($scope.sections.indexOf(data),1);
			}
		});
	};
	
	//this function will fetch 
	var fetchSection = function(){
		Section.all({},function(data,responseHeaders){$scope.sections = data;});
	};
	
	//faltu function declared here
	
}]);