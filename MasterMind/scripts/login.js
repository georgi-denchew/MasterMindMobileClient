(function (global) {
    var LoginViewModel,
    app = global.app = global.app || {};

    LoginViewModel = kendo.data.ObservableObject.extend({
        isLoggedIn: false,
        username: "",
        password: "",

        onLogin: function () {
            var that = this,
            username = that.get("username").trim(),
            password = that.get("password").trim();

            if (username === "" || password === "") {
                navigator.notification.alert("Both fields are required!",
                                             function () {
                                             }, "Login failed", 'OK');

                return;
            }

            that.set("isLoggedIn", true);
        },

        onLogout: function () {
            var that = this;

            that.clearForm();
            that.set("isLoggedIn", false);
        },

        clearForm: function () {
            var that = this;

            that.set("username", "");
            that.set("password", "");
        }
    });
    
    getLoginViewModel = kendo.data.ObservableObject.extend ({
        username: "username",
        email: "email",
        password: "password",
        login: function () {
            data.users.login(this.get("username"), this.get("password"))
            .then(function () {
                if (successCallback) {
                    successCallback();
                }
            }, function () {
                if (errorCallback) {
                    errorCallback();
                }
            })
        },

        register: function () {
            data.users.register(this.get("username"), this.get("password"))
            .then(function () {
                if (successCallback) {
                    successCallback();
                }
            });
        }
    });

    app.loginService = {
        viewModel: new LoginViewModel(),
        gogoModel: new getLoginViewModel()
    };
})(window);