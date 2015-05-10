/**
 * Created by Saloni on 5/10/2015.
 */
angular.module('app').factory('mvIdentity' ,function(){
    return {
        currentUser:undefined,
        isAuthenticated:function(){
            return !!this.currentUser;
        }

    }
})
