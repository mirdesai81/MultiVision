/**
 * Created by Mihir.Desai on 5/28/2015.
 */
angular.module('app').controller("mvUserListCtrl",function($scope,mvUser){
    $scope.users = mvUser.query();
    console.log($scope.users);
});