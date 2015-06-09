/**
 * Created by Mihir.Desai on 6/8/2015.
 */
angular.module("app").controller("mvProfileCtrl",function($scope,mvAuth,mvUser,mvIdentity, mvNotifier){
    $scope.username = mvIdentity.currentUser.userName;
    $scope.fname = mvIdentity.currentUser.firstName;
    $scope.lname = mvIdentity.currentUser.lastName;

    $scope.update = function() {
        var userData = {
            userName : $scope.username,
            firstName : $scope.fname,
            lastName : $scope.lname
        };
        if($scope.password && $scope.password.length > 0) {
            userData.password = $scope.password;
        }

        mvAuth.updateCurrentUser(userData).then(function(){
            mvNotifier.notify('Your user account has been updated!!');
        },function(reason){
            mvNotfier.error(reason);
        });

    }
});

