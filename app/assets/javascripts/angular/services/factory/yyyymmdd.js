var schoolApp = angular.module('schoolApp');
schoolApp.factory('yyyymmdd', function() {

    var getData = function(d) {
	    var yyyy = d.getFullYear().toString();                                    
	    var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based         
	    var dd  = d.getDate().toString();             
	    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
    };
    return { getData: getData };
});

