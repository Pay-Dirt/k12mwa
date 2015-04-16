var schoolApp=angular.module('schoolApp');
schoolApp.controller('examinationMarksCtrl',[
    '$scope',
    'ExaminationExaminationMarks',
    'ExaminationExamSchemas',
    'Classroom',
    'ClassroomSectionStudents',
    'DefaultClassrooms',
    'Notification',
    'Auth',
    'Error',
    'ClassroomSections',
    '$routeParams',
    'ClassroomMainSubjects',
    'ClassroomCourses',
    '$filter',
    function(
    		$scope,
    		ExaminationExaminationMarks,
    		ExaminationExamSchemas,
    		Classroom,
    		ClassroomSectionStudents,
    		DefaultClassrooms,
    		Notification,
    		Auth,
    		Error,
    		ClassroomSections,
    		$routeParams,
    		ClassroomMainSubjects,
    		ClassroomCourses,
    		$filter){
	DefaultClassrooms.all({},function(data){
		Error.parse(data,function(data){
			$scope.defaultClassrooms = data.default_classrooms;
		},function(data){});
		});

	$scope.$watch('classroom',function(){
		if($scope.classroom!=undefined){
			$scope.allCourses=new Array();
			$scope.classroomSelected=true;
			ClassroomSections.find({classroomId:$scope.classroom},function(data){
				Error.parse(data,function(data){
					$scope.classroomSections=data.sections;
				},function(data){});
			},function(data){});
			
			//subsubject name
				
	 		ClassroomMainSubjects.all({classroomId:$scope.classroom},function(data){
				Error.parse(data,function(data){
				$scope.main_subjects = data.main_subjects;
				$scope.mainSubjectId =new Array();
				$scope.maxMarks=new Array();
				var id;
				for(a in $scope.main_subjects)
					{
						for(x in $scope.main_subjects[a].sub_subjects_detail)
							{
										id=$scope.main_subjects[a].sub_subjects_detail[x].id;
										$scope.mainSubjectId[id]=$scope.main_subjects[a].sub_subjects_detail[x].main_subject_id;
										$scope.maxMarks[id]=$scope.main_subjects[a].sub_subjects_detail[x].max_marks;
							}
					}
				$scope.load_exam_schema_data();
				}
				
				,function(data){});
			},function(data){
			});
	 		
			//examination schema data
			$scope.load_exam_schema_data = function(){
				var qdata={keys:"classroom_id",classroom_id:$scope.classroom};
				ExaminationExamSchemas.qfind({examinationId:$routeParams.examinationId},qdata,function(data){
				Error.parse(data,function(data){
					$scope.exam_schemas = data.exam_schema;
					for(a in $scope.exam_schemas){
						var id = $scope.exam_schemas[a].sub_subject_id;
						$scope.exam_schemas[a].main_subject_id = angular.copy($scope.mainSubjectId[id]);
						$scope.exam_schemas[a].max_marks = angular.copy($scope.maxMarks[id]);
					}
				},function(data){});	
				},function(data){});

			};
			//load id of all courses	
		ClassroomCourses.all({classroomId:$scope.classroom},function(data){
			Error.parse(data,function(data){
				var allCourseId=new Array();
				allCourseId=data.courses;
				var course;
				var id;
				for(a in allCourseId){
					id=allCourseId[a].id;
					$scope.loadSingleCourseData(id,$scope.allCourses);
				}
				
			},function(data){});
		},function(data){});
		
		$scope.loadSingleCourseData=function(courseId,allCourses)	
		{
			ClassroomCourses.find({classroomId:$scope.classroom,id:courseId},function(data){
				Error.parse(data,function(data){
					allCourses.push(data.course);
				},function(data){});
			},function(data){});
		};
		}
	});
	$scope.$watch('classroomSection',function(){
		if($scope.classroomSection!=undefined){
			$scope.sectionSelected=true;
			ClassroomSectionStudents.all({classroomId:$scope.classroom,sectionId:$scope.classroomSection},function(data){
				Error.parse(data,function(data){
					$scope.students=data.students;
				},function(data){});
			},function(data){});
		}
	});
		$scope.fillMarks=function(exam_schema){
//particular subject result starts
			var querydata = {keys:"exam_schema_id",exam_schema_id:exam_schema.id};
			ExaminationExaminationMarks.qfind({examinationId:$routeParams.examinationId},querydata,function(data){
			Error.parse(data,function(data){
				$scope.student_subject_results=data.result;
			},function(data){});	
			},function(data){});
//particular subject ends
			
			$scope.selected_schema=exam_schema;
			$scope.isSubjectSelected=true;
			$scope.availableCoursesIds=new Array();
			$scope.availableStudents=new Array();

		for(a in $scope.allCourses){
			{
				for(b in $scope.allCourses[a].subjects){
					if(exam_schema.main_subject_id==$scope.allCourses[a].subjects[b].id){
						if($scope.availableCoursesIds.indexOf($scope.allCourses[a].id)==-1)
						{$scope.availableCoursesIds.push($scope.allCourses[a].id);}
						break;
					}
				}
			}
		}
		//to store students who r studying particular subject
		var x=function(courseIds){
			for(a in courseIds){
				$scope.returnStudents(courseIds[a]);
			}
		};

		$scope.returnStudents=function(id){
			var listedStudents= $filter('filter')($scope.students,{course_id:id});
			for(a in listedStudents){
				$scope.availableStudents.push(listedStudents[a]);
			}
		};
		x($scope.availableCoursesIds);
	};
	$scope.saveExamSchemaMarks=function(studentSchemaMarks){
		for(a in studentSchemaMarks){
		var marks_data=new Object();
		marks_data.exam_schema_id=$scope.selected_schema.id;
		marks_data.student_id=studentSchemaMarks[a].id;
		marks_data.obtained_marks=studentSchemaMarks[a].marks;
		ExaminationExaminationMarks.create({examinationId:$routeParams.examinationId},marks_data,function(data){
			Error.parse(data,function(data){
				
			},function(data){});
		},function(data){});
		}
	};
	
//edit code starts here 
	$scope.isEditActive=new Array();
	$scope.isEnableEdit=new Array();
	$scope.editControl=function(x,id){
		if(x=='true'){
			$scope.isEditActive[id]=true;
		}
		else if(x=='false'){
			$scope.isEditActive[id]=false;
		}
	};
	
	$scope.close_edit_form = function(id){
		$scope.isEnableEdit[id] = false;
	};
	
	$scope.enableEdit=function(id,index){
		$scope.id_of_edit=id;
		$scope.isEnableEdit[id]=true;
		$scope.isEditActive[id]=false;
		$scope.editStudent_subject_result=angular.copy($scope.student_subject_results[index]);
		$scope.editStudent_subject_result.index = index;
		//$scope.editStudent_subject_result.data=angular.copy($scope.student_subject_results[index]);
	};
	$scope.update_edit_form=function(editedStudent){
		
		ExaminationExaminationMarks.update({examinationId:$routeParams.examinationId,id:editedStudent.id},editedStudent,function(data){
			$scope.close_edit_form(editedStudent.id);
			$scope.student_subject_results[editedStudent.index] = data.data.result;
		},function(data){});
		
	};

//edit code ends here	
}]);
