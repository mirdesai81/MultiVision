/**
 * Created by Mihir.Desai on 5/6/2015.
 */
angular.module('app').controller('mvNavBarLoginCtrl',function($scope,$http,mvIdentity,mvNotifier,mvAuth,$location){
    $scope.identity = mvIdentity;
    $scope.signin = function(username,password){
        mvAuth.authenticateUser(username,password).then(function(success){
            if(success){
                mvNotifier.notify('Successfully logged in!!!');
            }else {
                mvNotifier.notify('Invalid username and password!!!');
            }
        })
     /*  $http.post('/login',{username:username, password:password}).then(function(response){
           if(response.data.success){
               mvIdentity.currentUser = response.data.user;
               mvNotifier.notify('Successfully logged in!!!');
           }else{

           }
       })*/
   };
   $scope.signout = function(){
       mvAuth.logoutUser().then(function(){
           $scope.username="";
           $scope.password="";
           mvNotifier.notify('You have logged out successfully!!');
           $location.path('/');
       })
   };

});
