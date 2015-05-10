/**
 * Created by Saloni on 5/10/2015.
 */
angular.module('app').value('mvToastr',toastr);

angular.module('app').factory('mvNotifier',function(mvToastr){
 return {
     notify : function(msg){
         mvToastr.success(msg);
         console.log(msg);
     }
 }
});