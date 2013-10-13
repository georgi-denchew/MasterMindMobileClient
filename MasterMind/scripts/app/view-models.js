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


    return {

        setPersister: function (persister) {
            data = persister
        },

        getLoginVM: new getLoginViewModel()
    };
}());