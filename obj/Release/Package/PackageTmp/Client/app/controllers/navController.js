/**
 * Created by Adam on 6/18/2015.
 */

'use strict';

angular.module('projectTracker')
    .controller('NavController', ['$auth', '$state', '$scope', function($auth, $state, $scope){
        var vm = this;

        vm.isAuthenticated = $auth.isAuthenticated();

        vm.logout = function(){
            $auth.logout().then(function (){
                vm.isAuthenticated = false;
                $state.go('login');
            }).catch(function(err){
                console.log(err);
            });
        };

        $scope.$on('login', function(isAuthenticated){
            vm.isAuthenticated = isAuthenticated;
        });
    }]);
