/**
 * Created by Adam on 1/25/2015.
 */

'user strict';

angular.module('projectTracker')
    .controller('ProjectController', ['projectResource', '$scope', function (projectResource, $scope){
        var vm = this;

        projectResource.projects.query(function(data){
            vm.projects = data;
        });

        projectResource.users.query(function(data){
            vm.users = data;
        });

        vm.statusOptions = ['Not Started', 'In Progress', 'Completed', 'On Hold'];

        vm.projectProgressOptions = [
            {
                status: "Not Started",
                order: 1
            },
            {
                status: "In Progress",
                order: 0
            },
            {
                status: "Completed",
                order: 2
            },
            {
                status: "On Hold",
                order: 3
            }
        ];

        vm.taskProgressOptions = [
            {
                status: "Not Started",
                order: "0"
            },
            {
                status: "In Development",
                order: "1"
            },
            {
                status: "In Testing",
                order: "2"
            },
            {
                status: "Completed",
                order: "3"
            }];

        vm.filterText = '';
        vm.filterOptions = [
            {
                'value': 'name',
                'text': 'Name'
            },
            {
                'value': 'status',
                'text': 'Status'
            }
        ];
        vm.filterBy = vm.filterOptions[0];

        vm.filterProjects = function(){
            switch(vm.filterBy.value){
                case 'name':
                    return {
                      name: vm.filterText
                    };
                    break;
                case 'status':
                    return {
                        progress: {
                            status: vm.filterText
                        }
                    };
                    break;
            }
            return {};
        };

        vm.clearSearch = function () {
            vm.filterText = '';
        };

        vm.addProject = function () {
            bootbox.prompt("New project", function (result){
                if (result){
                    projectResource.projects.save({
                        name: result,
                        progress: {
                            status: 'Not Started',
                            order: 1
                        },
                        tasks: []
                    }, function (data){
                        vm.projects.push(data);
                    });
                }
            });
        };

        vm.expandAll = function () {
            for (var i = 0; i < vm.projects.length; i++){
                vm.projects[i].isOpen = true;
            }
        };

        vm.collapseAll = function () {
            for (var i = 0; i < vm.projects.length; i++){
                vm.projects[i].isOpen = false;
            }
        };

        vm.openStartDate = function (project, $event) {
            $event.preventDefault();
            $event.stopPropagation();
            project.startDateOpened = !project.startDateOpened;
        };

        vm.openEndDate = function (project, $event) {
            $event.preventDefault();
            $event.stopPropagation();
            project.endDateOpened = !project.endDateOpened;
        };

        vm.addTask = function (project) {
            bootbox.prompt("New task", function (result){
               if (result){
                   projectResource.tasks.save({
                       projectId: project.id,
                       taskId: 0
                   },{
                       projectId: project.id,
                       name: result,
                       progress: {
                           status: "Not Started",
                           order: 0
                       },
                       assignedTo: []
                   }, function (data){
                       project.tasks.push(data);
                   });
               }
            });
        };

        vm.removeTask = function (project, task) {
            bootbox.confirm("Are you sure you want to delete this task?", function (result) {
                if (result) {
                    projectResource.tasks.remove({
                        projectId: project.id,
                        taskId: task.id
                    }, function(data){
                        var index = 0;
                        for (var i = 0; i < project.tasks.length; i++){
                            if (project.tasks[i].id == data.id){
                                index = i;
                            }
                        }
                        project.tasks.splice(index,1);
                    });
                }
            });
        };

        vm.removeUser = function (task, user, project){
            var index = 0;
            for (var i = 0; i < task.assignedTo.length; i++){
                if (task.assignedTo[i].id == user.id){
                    index = i;
                }
            }
            task.assignedTo.splice(index, 1);
            projectResource.projects.save(project, function (data){
                project = data;
            });
        };

        vm.addResource = function (project, task) {
            var message = "<select id='newResource'>";
            for (var i = 0; i < vm.users.length; i++){
                message += ("<option value='" + vm.users[i].id + "'>" + vm.users[i].name + "</option>");
            }
            message += "</select>";

            bootbox.dialog({
                title: 'Add Resource',
                message: message,
                buttons: {
                    success: {
                        label: "Add",
                        className: "btn-default",
                        callback: function () {
                            $scope.$apply(function(){
                                var newId = angular.element('#newResource').val();
                                var exists = false;
                                for (var r = 0; r < task.assignedTo.length; r++){
                                    if (task.assignedTo[r].id == newId){
                                        exists = true;
                                    }
                                }
                                if (!exists){
                                    for (var i = 0; i < vm.users.length; i++){
                                        if (vm.users[i].id == newId){
                                            task.assignedTo.push(vm.users[i]);
                                            projectResource.tasks.save({
                                                projectId: project.id,
                                                taskId: task.id
                                            }, task, function (data){
                                                task = data;
                                            });
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
            });
        };
    }]);
