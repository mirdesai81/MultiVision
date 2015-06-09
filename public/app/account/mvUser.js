/**
 * Created by Mihir.Desai on 5/28/2015.
 */
angular.module('app').factory('mvUser',function($resource){
   var UserResource = $resource('api/users/:id',{ id:'@id'},{
       update : { method : 'PUT' , isArray: false}
   });

    UserResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    return UserResource;
});
