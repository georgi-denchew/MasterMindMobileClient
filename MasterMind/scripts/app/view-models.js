/// <reference path="../libs/_references.js" />
var app = app || {};

window.vmFactory = (function () {
    var data = null;

    getLoginViewModel = kendo.data.ObservableObject.extend({
        username: "",
        password: "",
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
        
        hideForm: function () {
            console.log("hide");
            $("#login-form").hide();
            $("#welcome-message").show();
        },
        
        showForm: function () {
            $("#login-form").show();
            $("#welcome-message").hide();
        },
        
        isLoggedIn: function () {
            var sessionKey = localStorage.sessionKey;
            
            if (sessionKey != null && sessionKey != "" && sessionKey != "null") {
                return true;
            }
            
            return false;
        },

        register: function () {
            console.log(this.get("username") + " " + this.get("password"));
            data.users.register(this.get("username"), this.get("password"))
            .then(function () {
                app.application.navigate("views/events-view.html#events-view");
            });
        },
        
        logout: function () {
            var that = this;
            data.users.logout().then(function () {
                that.showForm();
            }, function () {
                that.showForm();
            });
        }
    });

    return {

        setPersister: function (persister) {
            data = persister
        },

        getLoginVM: new getLoginViewModel()
    };
}());