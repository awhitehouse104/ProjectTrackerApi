/**
 * Created by Adam on 1/25/2015.
 */

'use strict';

angular.module('projectTracker')
    .controller('EditTaskController', ['task', function (task){
        var vm = this;
        console.log(task);
    }]);
