/**
 * Created by Mihir.Desai on 5/29/2015.
 */
angular.module('app').controller('mvSignUpCtrl',function($scope,$location,mvAuth,mvNotifier, mvUser){


    $scope.signup = function() {
        var user = {
            userName:$scope.username,
            password:$scope.password,
            firstName:$scope.fname,
            lastName:$scope.lname
        };

        mvAuth.createUser(user).then(function(){
            mvNotifier.notify('User created successfully!!');
            $location.path("/");
        },function(reason){
            console.log(reason);
            mvNotifier.error(reason);
        });
    };
});
