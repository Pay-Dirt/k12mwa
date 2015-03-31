var schoolApp = angular.module('schoolApp');
schoolApp.controller('courseCtrl',['$scope','Classroom','ClassroomMainSubjects','DefaultMainSubject','ClassroomCourses','Error',function($scope,Classroom,ClassroomMainSubjects,DefaultMainSubject,ClassroomCourses,Error){
	var loadAllClassrooms = function(){
		Classroom.all({},function(data){
			Error.parse(data,function(data){
				$scope.classrooms = data.classrooms;
				//console.log(data.classrooms);
			},function(data){});
		},function(data){});
	};
	loadAllClassrooms();
	
	var loadAllCourses = function(classroom){
		ClassroomCourses.all({classroomId:classroom.id},function(data){
			Error.parse(data,function(data){
				$scope.courses = data.courses;
			},function(data){});
		},function(data){});
	};
	
	//this will notify when we choose a classroom
	$scope.$watch('setClassroom',function(){
		if($scope.setClassroom != undefined){
			fetchSubjects($scope.setClassroom.id);$scope.turl="show_subjects.html";
			loadAllCourses($scope.setClassroom);$scope.courseTemplate='courseShow.html';}
		else{$scope.turl = "";}
	});
	
	$scope.add_subject_form = function(){
		$scope.turl = "add_subject.html";
		fetchSubjects($scope.setClassroom.id);
		fetchDefaultMainSubjects($scope.setClassroom.classroom_number);
	};
	
	//this will fetch all main subjects
	var fetchSubjects = function(classroomId){
		ClassroomMainSubjects.all({classroomId:classroomId},function(data){
			Error.parse(data,function(data){
				$scope.main_subjects = data.main_subjects;
			},function(data){});
		},function(data){});
	};
	
	//remove subject
	$scope.removeSubject = function(main_subject,index){
		ClassroomMainSubjects.destroy({id:main_subject.id,classroomId:main_subject.classroom_id},function(data){
			Error.parse(data,function(data){$scope.main_subjects.splice(index,1);},function(data){});
		},function(data){});
	};
	
	$scope.newChildSubject = function(newSubject){
		var d = new Object();
		d.is_practical=false;
		d.name = "";
		d.max_marks = "";
		//adding the return statement prevents the whole execution of function
		if(newSubject==undefined){alert("Please define main subject first.");return;}
		if(!newSubject.sub_subjects){newSubject.sub_subjects = new Array();}
		newSubject.sub_subjects.push(d);
	};
	//this will fetch the default list of available main_subjects and sub_subjects
	var fetchDefaultMainSubjects = function(classroomNumber){
		qdata = {keys:"classroom_number",classroom_number:classroomNumber};
		DefaultMainSubject.qfind({},qdata,function(data,responseHeaders){
			Error.parse(data,function(data){
				$scope.default_main_subjects = data.default_main_subjects;
			},function(data){});
		},function(data){});
	};
	
	$scope.submitSubject = function(newSubject,classroomId,isMore){
		ClassroomMainSubjects.create({classroomId:classroomId},newSubject,function(data,responseHeaders){
			if(newSubject.is_sub_subjects == false || newSubject.is_sub_subjects == undefined){
				newSubject.sub_subjects == null;
			}
			Error.parse(data,function(data){
				//console.log(data);
				if(!$scope.main_subjects){$scope.main_subjects = new Array();}
				$scope.main_subjects.push(data.main_subjects);
				if(isMore==true){$scope.add_more_subject = "";$scope.newSubject = null;}else{$scope.turl = "show_subjects.html";}
				$scope.newSubject = null;
			},function(data){});
		},function(data){});
	};
	
	$scope.add_more_subject_form = function(){
		$scope.isMore = true;
		$scope.add_more_subject = "add_subject.html";
		fetchDefaultMainSubjects($scope.setClassroom.classroom_number);};

	//course functions
	$scope.showCreateCourseForm = function(){$scope.createCourseForm='createCourseForm.html';$scope.course_subjects = angular.copy($scope.main_subjects);};
	$scope.closeCreateCourseForm = function(){$scope.createCourseForm=null;};
	$scope.createCourse = function(course){
		ClassroomCourses.create({classroomId:$scope.setClassroom.id},course,function(data){
			Error.parse(data,function(data){
				if(!$scope.courses){$scope.course = new Array();}
				$scope.courses.push(data.course);
				$scope.closeCreateCourseForm();
			},function(data){});
		},function(data){});
	};
	
	$scope.deleteCourse = function(course,index){
		ClassroomCourses.destroy({classroomId:$scope.setClassroom.id,id:course.id},function(data){
			Error.parse(data,function(data){
				$scope.courses.splice(index,1);
			},function(data){});
		},function(data){});
	};
}]);