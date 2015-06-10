/**
 * Created by Mihir.Desai on 6/10/2015.
 */
angular.module('app').controller("mvCourseListCtrl",function($scope,mvCourse){
      $scope.courses = mvCourse.query();
});
