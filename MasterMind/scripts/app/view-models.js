/// <reference path="../libs/_references.js" />
var app = app || {};

window.vmFactory = (function () {
    var data = null;

    getLoginViewModel = kendo.data.ObservableObject.extend ({
        username: "user",
        password: "pass",
        login: function () {
            console.log(data);
            data.users.login(this.get("username"), this.get("password"))
            .then(function () {
                app.application.navigate("views/events-view.html#events-view");
                
            }, function () {
                if (errorCallback) {
                    errorCallback();
                }
            })
        },
        
        /*isLoggedIn: function () {
            var sessionKey = localStorage.sessionKey;
            
            if (sessionKey != null && sessionKey != ""){
                return true;
            }
            
            return false;
        },*/

        register: function () {
            console.log(this.get("username") + " " + this.get("password"));
            data.users.register(this.get("username"), this.get("password"))
            .then(function () {
                app.application.navigate("views/events-view.html#events-view");
            });
        }
    });

    function getAllAdvertsViewModel() {
        return data.adverts.all()
        .then(function (adverts) {
            var viewModel = {
                adverts: adverts,
                logout: function () {
                    data.users.logout()
                    .then(function () {
                        if (successCallback) {
                            successCallback();
                        }
                    }, function () {
                        if (errorCallback) {
                            errorCallback();
                        }
                    });
                },
            };

            return kendo.observable(viewModel);
        })
    }

    function getTodoListsVM() {
        return data.todolists.all()
        .then(function (todoLists) {
            var viewModel = {
                todoLists: todoLists
            };

            return kendo.observable(viewModel);
        })
    }

    function getDateVM() {
        var model = {
            date: "",
        };

        return kendo.observable(model);
    }

    function getAllAppointmentsVM() {
        return data.appointments.all()
        .then(function (appointments) {
            var viewModel = {
                appointments: appointments
            };

            return kendo.observable(viewModel);
        })
    }

    function getTodayAppointmentsVM() {
        return data.appointments.today()
        .then(function (appointments) {
            var viewModel = {
                appointments: appointments
            };

            return kendo.observable(viewModel);
        })
    }

    function getCommingAppointmentsVM() {
        return data.appointments.comming()
        .then(function (appointments) {
            var viewModel = {
                appointments: appointments
            };

            return kendo.observable(viewModel);
        })
    }

    function getCurrentAppointmentsVM() {
        return data.appointments.current()
        .then(function (appointments) {
            var viewModel = {
                appointments: appointments
            };

            return kendo.observable(viewModel);
        })
    }

    function getCreateAppointmentVM(successCallback) {
        var viewModel = {
            subject: "subject",
            description: "description",
            appointmentDate: "appointmentDate",
            duration: 1,
            state: "state",
            create: function () {
                var appointmentModel = {
                    subject: this.get("subject"),
                    description: this.get("description"),
                    appointmentDate: this.get("appointmentDate"),
                    duration: this.get("duration"),
                    state: this.get("state"),
                };
                data.appointments.create(appointmentModel)
                .then(function (result) {
                    if (successCallback) {
                        successCallback()
                    }
                });
            }
        }
        debugger;
        return new kendo.observable(viewModel);
    }

    function getSingleTodoListVM(id) {
        return data.todolists.getTodos(id)
        .then(function (resultList) {

            //var viewModel = {
            //    todoList: {
            //        title: resultList.title,
            //        todos: resultList.todos,
            //        //changeStatus: function (todoId) {
            //        //    data.todolists.changeStatus(todoId.data.id);
            //        //}
            //    }
            //};

            //function changeStatus() {
            //    var id = this.get("id");

            //    data.todolists.changeStatus(id);
            //}

            //for (var i = 0; i < resultList.todos.length; i++) {
            //    debugger;
            //    var todo = resultList.todos[i];
            //    //todo.changeStatus = function () {
            //    //    changeStatus();
            //    //}

            //    viewModel.todoList.todos.push(todo);
            //}

            var viewModel = {
                todos: resultList.todos,
                title: resultList.title
            }

            return kendo.observable(viewModel);
        })
    }

    function getDateAppointmentsVM(date) {
        return data.appointments.getByDate(date)
        .then(function (appointments) {
            var viewModel = {
                appointments: appointments
            };

            return kendo.observable(viewModel);
        })
    }

    function getCreateTodoListVM(successCallback) {
        var viewModel = {
            title: "title",
            todos: [],
            create: function () {
                var listModel = {
                    title: this.get("title"),
                    todos: this.get("todos")
                };
                data.todolists.create(listModel)
                .then(function (result) {
                    if (successCallback) {
                        successCallback();
                    }
                });
            }
        };

        return kendo.observable(viewModel);
    }

    function getCreateTodoVM(id, successCallback) {
        var viewModel = {
            text: "text",
            create: function () {
                var todoModel = {
                    text: this.get("text"),
                    isDone: false,
                };
                debugger;
                data.todolists.createNestedTodo(todoModel, id)
                .then(function (result) {
                    if (successCallback) {
                        successCallback();
                    }
                })
            }
        };

        return kendo.observable(viewModel);
    }

    return {

        setPersister: function (persister) {
            data = persister
        },

        getLoginVM: new getLoginViewModel(),
        getCreateAppointmentVM: getCreateAppointmentVM,
        getAllAppointmentsVM: getAllAppointmentsVM,
        getTodayAppointmentsVM: getTodayAppointmentsVM,
        getCommingAppointmentsVM: getCommingAppointmentsVM,
        getCurrentAppointmentsVM: getCurrentAppointmentsVM,
        getDateVM: getDateVM,
        getDateAppointmentsVM: getDateAppointmentsVM,
        getTodoListsVM: getTodoListsVM,
        getCreateTodoListVM: getCreateTodoListVM,
        getSingleTodoListVM: getSingleTodoListVM,
        getCreateTodoVM: getCreateTodoVM,
    };
}());