/**
 * Created by Adam on 1/25/2015.
 */

'use strict';

angular.module('projectTracker')
    .factory('projectResource', ['$resource', function($resource){
        return {
            projects: $resource("/api/projects/:projectId", {projectId:'@projectId'}),
            tasks: $resource("/api/projects/:projectId/tasks/:taskId", {projectId:'@projectId', taskId:'@taskId'}),
            users: $resource('/api/users/')
        }
    }]);
