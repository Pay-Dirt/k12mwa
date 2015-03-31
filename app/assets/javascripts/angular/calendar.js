var module=angular.module('schoolApp');
module.directive('calendarEvent',function(){
	return{
		
		restrict:'E',
		scope: {
			startingmonth:'=',
			classroom:'=',
			startingyear:'=',
			selecteddate:'=',
			clickme: '&myClick'
				
		},
		templateUrl:'calendar.html',
		controller:function($scope,$rootScope,ExaminationExamSchemas,Holiday,$routeParams,Error){
			$scope.click=function(t)
			{
				var selecteddate=($scope.date).setDate;
			};
			$scope.$watch('classroom',function(){
			if($scope.classroom!=undefined){	
				$scope.classroomDefined=true;
				
				//this part handles the calendar functionality
			$scope.currentDate=new Date();
			$scope.cy=angular.copy($scope.currentDate).getFullYear();//current year
			$scope.cm=angular.copy($scope.currentDate).getMonth();//current month
			$scope.cd=angular.copy($scope.currentDate).getDate();//current date
			$scope.date=new Date();
			
			$scope.$watch('date',function(){
				$scope.checkDate=function(t)
				{
					if($scope.year<$scope.cy)
						return true;
					else if($scope.year==$scope.cy)
						{
							if($scope.mday<$scope.cm)
								return true;
							else if($scope.mday==$scope.cm)
								{
									if(t<$scope.cd)
										return true;
									else return false;
								}
						}
					else return false;
				
				};
				//here we check if date is holiday or an exam
				//console.log($scope.exam_dates[0].getMonth());
				$scope.checkEvent=function(t)
				{
					t=parseInt(t);
					for(a in $scope.exam_dates)
						{
							if($scope.exam_dates[a].getMonth()==$scope.mday)
								{
									if(t==$scope.exam_dates[a].getDate())
										return true;
								}
						}
				};
				$scope.checkHoliday=function(t)
				{
					t=parseInt(t);
					for(a in $scope.holiday_dates)
						{
							if($scope.holiday_dates[a].getMonth()==$scope.mday)
								{
									if(t==$scope.holiday_dates[a].getDate())
										return true;
								}
						}
				};
				$scope.wday=angular.copy(($scope.date)).getDay();
				$scope.mday=angular.copy(($scope.date)).getMonth();
				$scope.year=angular.copy(($scope.date)).getFullYear();
			    $scope.monthName = $scope.date.toLocaleString("en-us", { month: "long" });
				cal(daysInMonth($scope.mday,$scope.year),firstday($scope.mday));
				
				//here we will define the type of class so that we can disable those dates which are less than current date
			});
			$scope.changeMonth=function(type){
				var m = ($scope.date).getMonth();
				var y = ($scope.date).getFullYear();
				var today = angular.copy($scope.date);
				if(type=="previous")
					{
					if(y==($scope.startingyear) && m==$scope.startingmonth)
					{}
				else
				{
					$scope.date = today.setMonth(m-1,1);
				}
					}
				else if(type=="next")
					{
						if(y==($scope.startingyear+1) && m==$scope.startingmonth)
							{}
						else
						{
							
							$scope.date = today.setMonth(m+1,1);
							
						}
					}
				
				$scope.date=new Date($scope.date);
				
			};
			$scope.checkSunday=function(t)
			{
				if((new Date(angular.copy($scope.date).setDate(t))).getDay()==0)
				return true;
			};
			$scope.tooltipDisplay=function(t){
			var today=angular.copy($scope.date);
			$scope.eventDate=new Date(today.setDate(t));
			$scope.eventName="";
			if($scope.checkEvent(t)==true)
			{
				for(a in $scope.exam_schemas)
					{
						if((new Date($scope.exam_schemas[a].exam_date)).toISOString().substring(0, 10)==$scope.eventDate.toISOString().substring(0, 10))
							{
								$scope.eventName+=$scope.exam_schemas[a].main_subject_id;
							}
					}
			}
		else if($scope.checkHoliday(t)==true)
		{
			for(a in $scope.holidaylist)
			{
				if($scope.holidaylist[a].event_date==$scope.eventDate.toISOString().substring(0, 10))
					{ 
						$scope.eventName+=$scope.holidaylist[a].details;
					}
			}
		}	
     return $scope.eventName;
		};

			var firstday=function(mday)
			{
			 	var t = new Date();
			 	t.setMonth(mday,1);
			    t.setDate(1);
			    return t.getDay();
			};
			var daysInMonth=function(month,year) {
				return new Date(year, month+1, 0).getDate();
			};
			$scope.days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
			var cal = function(days,start){
				$scope.rows = new Array();
				$scope.rows.push(new Array());
				var d = 1;
				var s = start;
				var left = 7-start;
				while(start>0){start--;var sp=" ";for(var k=start;k>=0;k--){sp=sp+" ";};$scope.rows[0].push(sp);}
				while(left>0){left--;$scope.rows[0].push(d);d++;}
				days = days-7+s;
				var c = 1;
				while(days>0){
					$scope.rows.push(new Array());
					for(var i=1;i<=7;i++){$scope.rows[c].push(d);d++;days--;if(days<=0){break;}}
					c++;
					if(days<0){break;}
				}
			};
			cal(daysInMonth($scope.mday,$scope.year),firstday($scope.mday,$scope.wday));			

			qdata={keys:"classroom_id",classroom_id:$scope.classroom};		
			ExaminationExamSchemas.qfind({examinationId:$routeParams.examinationId},qdata,function(data){
			Error.parse(data,function(data){
	        		$scope.exam_schemas=data.exam_schema;
	        		$scope.exam_dates=new Array();
	        		for(a in $scope.exam_schemas)
	        			{
	        				$scope.exam_dates[a]=new Date($scope.exam_schemas[a].exam_date);
	        			}
	        		
	        	},function(data){
	        	});
	        },function(data){});
			Holiday.find({},function(data){
				Error.parse(data,function(data){
					$scope.holidaylist=data.holiday;
	        		$scope.holiday_dates=new Array();
	        		for(a in $scope.holidaylist)
	        			{
	        				$scope.holiday_dates[a]=new Date($scope.holidaylist[a].event_date);
	        			}

				},function(data){
					
				});
			},function(data){
			});
			var startingmonth=$scope.startingmonth;
			var startingyear = $scope.startingyear;
			var classroom = $scope.classroom;
			}
			});
		}//end of controller
		};//end of return
var classroom=$scope.classroom;
});