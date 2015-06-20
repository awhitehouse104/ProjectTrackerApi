/**
 * Created by Adam on 1/25/2015.
 */

'use strict';

angular.module('projectTracker', ['ngResource', 'ngMockE2E','ui.router', 'ui.bootstrap', 'satellizer', 'ui.utils', 'ngToast', 'ngAnimate', 'ngSanitize'])
    .config(['$stateProvider', '$urlRouterProvider', '$authProvider', function ($stateProvider, $urlRouterProvider, $authProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state("projectList", {
                url: "/",
                templateUrl: "app/templates/projectListView.html",
                controller: "ProjectController as vm"
            })
            .state("editTask", {
                url: "/project/:projectId/task/:taskId",
                templateUrl: "app/templates/editTaskView.html",
                controller: "EditTaskController as vm",
                resolve: {
                    projectResource: "projectResource",
                    task: function(projectResource, $stateParams){
                        projectResource.tasks.get({projectId: $stateParams.projectId, taskId: $stateParams.taskId}).$promise.then(function(result){
                            console.log(result);
                        });
                        return projectResource.tasks.get({projectId: $stateParams.projectId, taskId: $stateParams.taskId});
                    }
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/templates/loginView.html',
                controller: 'LoginController as vm'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/templates/signupView.html',
                controller: 'LoginController as vm'
            });
        $authProvider.loginOnSignup = false;
        $authProvider.facebook({
            clientId: '470349823131204',
            url: '/auth/facebook'
        });
        $authProvider.google({
            clientId: '47749066735-0bovquj7m5ardb6bekicct21nv0hld1b.apps.googleusercontent.com',
            url: '/auth/google'
        });
        $authProvider.twitter({
            url: '/auth/twitter'
        });
        $authProvider.oauth2({
            name: 'instagram',
            clientId: 'fad298f4425140bc9acc3cfab0950fff',
            url: '/auth/instagram',
            authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            responseType: 'code',
            display: 'popup',
            type: '2.0',
            popupOptions: { width: 580, height: 400 }
        });
    }])
    .run(function($rootScope, $location, $state, $auth){
        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams){
            if (toState.name == 'login' || toState.name == 'signup'){
                return;
            }
            if (!$auth.isAuthenticated()){
                e.preventDefault();
                $state.go('login');
            }
        });
    });
