/**
 * Created by Mihir.Desai on 6/10/2015.
 */
angular.module('app').factory('mvCachedCourses',function(mvCourse){
   var courseList;

    return {
        query : function() {
           if(!courseList) {
               courseList = mvCourse.query();
           }
           return courseList;
        }
    }

});
