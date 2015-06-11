/**
 * Created by Mihir.Desai on 6/11/2015.
 */
angular.module("app").controller("mvCourseDetailsCtrl",function($scope,mvCachedCourses,$routeParams){
      //Below makes request to server everytime so use mvCachedCourse resource to fix the course you are looking for
      // $scope.course = mvCourse.get({_id : $routeParams.id});

    mvCachedCourses.query().$promise.then(function(collection){
        angular.forEach(collection , function(course){
           if(course._id === $routeParams.id) {
               $scope.course = course;
           }
        });
    })
});
