/**
 * Created by Mihir.Desai on 6/10/2015.
 */
angular.module("app").factory("mvCourse",function($resource){
       var CourseResource = $resource("/api/courses/:_id" , {_id : "@id"}, {
           update : {method : 'PUT', isArray : false}
       });
    return CourseResource;
});
