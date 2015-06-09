/**
 * Created by Mihir.Desai on 5/4/2015.
 */
angular.module('app', ['ngResource' , 'ngRoute']);

angular.module('app').config(function($routeProvider , $locationProvider){
    /*$locationProvider.html5Mode(true);*/
    var routeRoleChecks = {
        admin : {auth : function(mvAuth){
            return mvAuth.authorizeCurrentUserForRoute('admin');
        }},
        user : {auth : function(mvAuth){
            return mvAuth.authorizeAuthenticatedUserForRoute();
        }}

    };
    $locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider
        .when('/', {templateUrl : '/partials/main/main', controller: 'mvMainCtrl'})
        .when('/admin/users', {templateUrl : '/partials/admin/user-list',
            controller: 'mvUserListCtrl',
            resolve: routeRoleChecks.admin
        })
        .when('/signup', {templateUrl : '/partials/account/signup',
            controller: 'mvSignUpCtrl'
        })
        .when('/profile', {templateUrl : '/partials/account/profile',
            controller: 'mvProfileCtrl',
            resolve:routeRoleChecks.user
        });
});

angular.module('app').run(function($rootScope,$location){
    $rootScope.$on('$routeChangeError',function(evt,current,previous,rejection){
         if(rejection === 'not authorized'){
             $location.path('/');
         }
    });
});


