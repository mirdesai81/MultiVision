/**
 * Created by Saloni on 5/10/2015.
 */
angular.module('app').factory('mvAuth',function($http,mvIdentity,$q,mvUser){
    return {
      authenticateUser: function(username,password){
          var dfd = $q.defer();
          $http.post('/login',{username:username, password:password}).then(function(response){
              if(response.data.success){
                  var user = new mvUser();
                  angular.extend(user,response.data.user);
                  mvIdentity.currentUser = user;
                  dfd.resolve(true);
              }else{
                  dfd.resolve(false);
              }
          });
          return dfd.promise;
      },
      logoutUser:function(){
          var dfd = $q.defer();
          $http.post('/logout',{logout:true}).then(function(){
              mvIdentity.currentUser = undefined;
              dfd.resolve();
          });
          return dfd.promise;
      },
      authorizeCurrentUserForRoute:function(role){
          if(mvIdentity.isAuthorized(role)) {
              return true;
          } else {
              return $q.reject('not authorized');
          }
      },
        authorizeAuthenticatedUserForRoute:function(role){
            if(mvIdentity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },
        createUser : function(user){
            var dfd = $q.defer();
            var newUser = new mvUser(user);

            newUser.$save().then(function(){
                mvIdentity.currentUser = newUser;
                dfd.resolve();
            },function(response){
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentUser : function(user) {
            var dfd = $q.defer();
            var clone = angular.copy(mvIdentity.currentUser);
            angular.extend(clone,user);


            clone.$update().then(function(){
                mvIdentity.currentUser = clone;
                dfd.resolve();
            },function(response){
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    }

});
