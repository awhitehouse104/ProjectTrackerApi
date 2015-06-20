/**
 * Created by Adam on 6/13/2015.
 */

'use strict';

angular.module('projectTracker')
    .controller('LoginController', ['$auth', '$rootScope', '$scope', 'ngToast', function($auth, $rootScope, $scope, ngToast){
        var vm = this;

        vm.authenticate = function (provider) {
            $auth.authenticate(provider).then(function (){
                $rootScope.$broadcast('login', $auth.isAuthenticated());
            }).catch(function(err){
                ngToast.danger('Login failed.');
            });
        };

        vm.login = function (isValid) {
            if (isValid) {
                $auth.login({
                    email: vm.email,
                    password: vm.password
                }).then(function () {
                    $rootScope.$broadcast('login', $auth.isAuthenticated());
                    vm.email = '';
                    vm.password = '';
                }).catch(function (err) {
                    ngToast.danger('Login failed.');
                    vm.email = '';
                    vm.password = '';
                    $scope.loginForm.$setPristine();
                });
            }
        };

        vm.signup = function (isValid) {
            if (isValid) {
                $auth.signup({
                    email: vm.newEmail,
                    password: vm.newPassword
                }).then(function () {
                    vm.newEmail = '';
                    vm.newPassword = '';
                    vm.newPasswordConfirm = '';
                }).catch(function (err) {
                    ngToast.danger('Failed to create account.');
                    vm.newEmail = '';
                    vm.newPassword = '';
                    vm.newPasswordConfirm = '';
                    $scope.signupForm.$setPristine();
                });
            }
        };
    }]);
