/**
 * Created by Adam on 4/21/2015.
 */

'use strict';

angular.module('projectTracker')
    .directive('datepickerPopup', function () {
        return {
            restrict: 'EAC',
            require: 'ngModel',
            link: function (scope, element, attr, controller) {
                controller.$formatters.shift();
            }
        }
    });
