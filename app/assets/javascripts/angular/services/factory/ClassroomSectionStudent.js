angular.module('schoolServices').factory('ClassroomSectionStudents',['$http','Resource',function($http,Resource){
   return Resource.create('classrooms/:classroomId/sections/:sectionId/students/:id');
}]);