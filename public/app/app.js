/**
 * Created by Mihir.Desai on 5/4/2015.
 */
angular.module('app', ['ngResource' , 'ngRoute']);

angular.module('app').config(function($routeProvider , $locationProvider){
    /*$locationProvider.html5Mode(true);*/
    $routeProvider
        .when('/', {
            templateUrl : '/partials/main/main',
            controller: 'mvMainCtrl'
        });
});


