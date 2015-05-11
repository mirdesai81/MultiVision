/**
 * Created by Saloni on 5/10/2015.
 */
angular.module('app').factory('mvIdentity' ,function($window){
    var currentUser;
    if(!!$window.bootstrappedUserObject){
        currentUser = $window.bootstrappedUserObject;
    }
    return {
        currentUser:currentUser,
        isAuthenticated:function(){
            return !!this.currentUser;
        }

    }
})
