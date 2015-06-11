/**
 * Created by Mihir.Desai on 6/10/2015.
 */
angular.module('app').controller("mvCourseListCtrl",function($scope,mvCachedCourses){
      $scope.courses = mvCachedCourses.query();
      $scope.sortOptions = [{value : 'title' , text : 'Sort By Title'},
            {value : 'published' , text : 'Sort By Publish Date'}];

      $scope.sortOrder = $scope.sortOptions[0].value;
});
