/**
 * Created by Adam on 1/25/2015.
 */

'use strict';

angular.module('projectTracker')
    .run(function($httpBackend){
        var projects = [
            {
                id: 1,
                name: "Accounting System",
                progress: {
                    status: "In Progress",
                    order: 0
                },
                startDate: new Date('3/30/14'),
                endDate: new Date('9/25/16'),
                isOpen: true,
                tasks: [
                    {
                        id: 1,
                        projectId: 1,
                        name: "Bug fix",
                        progress: {
                            status: "Completed",
                            order: 3
                        },
                        assignedTo: [
                            {
                                id: 2,
                                name: "Jane",
                                role: "Developer"
                            },
                            {
                                id: 7,
                                name: "Steve",
                                role: "Developer"
                            },
                            {
                                id: 3,
                                name: "John",
                                role: "Business Analyst"
                            }
                        ]
                    },
                    {
                        id: 2,
                        projectId: 1,
                        name: "New item",
                        progress: {
                            status: "In Development",
                            order: 1
                        },
                        assignedTo: [
                            {
                                id: 1,
                                name: "Alice",
                                role: "Developer"
                            },
                            {
                                id: 3,
                                name: "John",
                                role: "Business Analyst"
                            }
                        ]
                    },
                    {
                        id: 3,
                        projectId: 1,
                        name: "Refactor",
                        progress: {
                            status: "Not Started",
                            order: 0
                        },
                        assignedTo: [
                            {
                                id: 4,
                                name: "Kate",
                                role: "Developer"
                            },
                            {
                                id:3,
                                name: "John",
                                role: "Business Analyst"
                            }
                        ]
                    },
                    {
                        id: 10,
                        projectId: 1,
                        name: "Create report",
                        progress: {
                            status: "Not Started",
                            order: 0
                        },
                        assignedTo: [
                            {
                                id: 7,
                                name: "Steve",
                                role: "Developer"
                            },
                            {
                                id:3,
                                name: "John",
                                role: "Business Analyst"
                            }
                        ]
                    },
                    {
                        id: 11,
                        projectId: 1,
                        name: "Meeting",
                        progress: {
                            status: "Completed",
                            order: 3
                        },
                        assignedTo: [
                            {
                                id: 1,
                                name: "Alice",
                                role: "Developer"
                            },
                            {
                                id: 2,
                                name: "Jane",
                                role: "Developer"
                            },
                            {
                                id: 7,
                                name: "Steve",
                                role: "Developer"
                            },
                            {
                                id: 4,
                                name: "Kate",
                                role: "Developer"
                            },
                            {
                                id:3,
                                name: "John",
                                role: "Business Analyst"
                            }
                        ]
                    }
                ]
            },
            {
                id: 2,
                name: "Issue Tracker",
                progress: {
                    status: "In Progress",
                    order: 0
                },
                startDate: new Date('1/30/15'),
                endDate: new Date('3/12/15'),
                isOpen: true,
                tasks: [
                    {
                        id: 4,
                        projectId: 2,
                        name: "Design layout",
                        progress: {
                            status: "In Testing",
                            order: 2
                        },
                        assignedTo: [
                            {
                                id: 1,
                                name: "Alice",
                                role: "Developer"
                            },
                            {
                                id: 5,
                                name: "Kyle",
                                role: "Business Analyst"
                            }
                        ]
                    },
                    {
                        id: 5,
                        projectId: 2,
                        name: "Add filtering",
                        progress: {
                            status: "Completed",
                            order: 3
                        },
                        assignedTo: [
                            {
                                id: 6,
                                name: "Mike",
                                role: "Developer"
                            },
                            {
                                id: 5,
                                name: "Kyle",
                                role: "Business Analyst"
                            }
                        ]
                    },
                    {
                        id: 6,
                        projectId: 2,
                        name: "Create details view",
                        progress: {
                            status: "In Development",
                            order: 1
                        },
                        assignedTo: [
                            {
                                id: 6,
                                name: "Mike",
                                role: "Developer"
                            },
                            {
                                id: 5,
                                name: "Kyle",
                                role: "Business Analyst"
                            }
                        ]
                    }
                ]
            },
            {
                id: 3,
                name: "Employee Portal",
                progress: {
                    status: "Not Started",
                    order: 1
                },
                startDate: new Date('5/10/15'),
                endDate: new Date('7/6/15'),
                isOpen: true,
                tasks: [
                    {
                        id: 7,
                        projectId: 3,
                        name: "Add items to UI",
                        progress: {
                            status: "Not Started",
                            order: 0
                        },
                        assignedTo: [
                            {
                                id: 6,
                                name: "Mike",
                                role: "Developer"
                            },
                            {
                                id: 5,
                                name: "Kyle",
                                role: "Business Analyst"
                            }
                        ]
                    },
                    {
                        id: 8,
                        projectId: 3,
                        name: "Add images",
                        progress: {
                            status: "Not Started",
                            order: 0
                        },
                        assignedTo: [
                            {
                                id: 6,
                                name: "Mike",
                                role: "Developer"
                            },
                            {
                                id: 5,
                                name: "Kyle",
                                role: "Business Analyst"
                            }
                        ]
                    },
                    {
                        id: 9,
                        projectId: 3,
                        name: "Discuss design",
                        progress: {
                            status: "Not Started",
                            order: 0
                        },
                        assignedTo: [
                            {
                                id: 1,
                                name: "Alice",
                                role: "Developer"
                            },
                            {
                                id: 5,
                                name: "Kyle",
                                role: "Business Analyst"
                            }
                        ]
                    }
                ]
            }
        ];
        var users = [
            {
                id: 1,
                name: "Alice",
                role: "Developer"
            },
            {
                id: 2,
                name: "Jane",
                role: "Developer"
            },
            {
                id:3,
                name: "John",
                role: "Business Analyst"
            },
            {
                id: 4,
                name: "Kate",
                role: "Developer"
            },
            {
                id: 5,
                name: "Kyle",
                role: "Business Analyst"
            },
            {
                id: 6,
                name: "Mike",
                role: "Developer"
            },
            {
                id: 7,
                name: "Steve",
                role: "Developer"
            }
        ];

        $httpBackend.whenGET("/api/projects").respond(projects);
        $httpBackend.whenGET("/api/users").respond(users);

        $httpBackend.whenGET(new RegExp("/api/projects" + "/[0-9][0-9]*", '')).respond(function(method,url,data){
            var project = {};
            var params = url.split("/");
            var id = params[params.length - 1];

            for (var i = 0; i < projects.length; i++){
                if (projects[i].id === id){
                    project = projects[i];
                    break;
                }
            }
            return [200, project, {}];
        });

        $httpBackend.whenGET(new RegExp("/api/projects" + "/[0-9][0-9]*" + "/tasks" + "/[0-9][0-9]*", '')).respond(function(method,url,data){
            console.log('here');
            var task = {};
            var params = url.split("/");
            var id = params[params.length - 1];

            for (var i = 0; i < projects.length; i++){
                for (var t = 0; t < projects[i].tasks.length; t++){
                    if (projects[i].tasks[t].id === id){
                        task = projects[i].tasks[t];
                        break;
                    }
                }
            }
            return [200, task, {}];
        });

        $httpBackend.whenPOST("/api/projects").respond(function(method,url,data){
            var project = angular.fromJson(data);
            project.isOpen = true;

            if (!project.id){
                project.id = projects[projects.length - 1].id + 1;
                projects.push(project);
            }
            else {
                for (var i = 0; i < projects.length; i++){
                    if (projects[i].id == project.id){
                        projects[i] = project;
                        break;
                    }
                }
            }
            return [200, project, {}];
        });

        $httpBackend.whenPOST(new RegExp("/api/projects" + "/[0-9][0-9]*" + "/tasks" + "/[0-9][0-9]*", '')).respond(function(method,url,data){
            var task = angular.fromJson(data);

            if (!task.id){
                var maxId = 0;
                for(var i = 0; i < projects.length; i++){
                    for(var t = 0; t < projects[i].tasks.length; t++){
                        if (projects[i].tasks[t].id > maxId){
                            maxId = projects[i].tasks[t].id;
                        }
                    }
                }
                task.id = maxId + 1;
                for (var i = 0; i < projects.length; i++){
                    if (projects[i].id == task.projectId){
                        projects[i].tasks.push(task);
                        break;
                    }
                }
            }
            else {
                for (var i = 0; i < projects.length; i++){
                    if (projects[i].id == task.projectId){
                        for (var t = 0; t < projects[i].tasks.length; t++){
                            if (projects[i].tasks[t].id == task.id){
                                projects[i].tasks[t] = task;
                                break;
                            }
                        }
                    }
                }
            }
            return [200, task, {}];
        });

        $httpBackend.whenDELETE(new RegExp("/api/projects" + "/[0-9][0-9]*" + "/tasks" + "/[0-9][0-9]*", '')).respond(function(method,url,data){
            var params = url.split("/");
            var projectId = params[params.length - 3];
            var taskId = params[params.length - 1];

            for (var i = 0; i < projects.length; i++){
                if (projects[i].id == projectId){
                    for (var t = 0; t < projects[i].tasks.length; t++){
                        if (projects[i].tasks[t].id == taskId){
                            projects[i].tasks.splice(t,1);
                            break;
                        }
                    }
                }
            }
            return [200, {id: taskId}, {}];
        });

        $httpBackend.whenGET(/app/).passThrough();

        $httpBackend.whenPOST('/auth/signup').passThrough();
        $httpBackend.whenGET('/auth/signup').passThrough();
        
        $httpBackend.whenPOST('/auth/login').passThrough();
        $httpBackend.whenGET('/auth/login').passThrough();

        $httpBackend.whenPOST('/auth/facebook').passThrough();
        $httpBackend.whenGET('/auth/facebook').passThrough();

        $httpBackend.whenPOST('/auth/google').passThrough();
        $httpBackend.whenGET('/auth/google').passThrough();

        $httpBackend.whenPOST('/auth/twitter').passThrough();
        $httpBackend.whenGET('/auth/twitter').passThrough();

        $httpBackend.whenPOST('/auth/instagram').passThrough();
        $httpBackend.whenGET('/auth/instagram').passThrough();
    });
