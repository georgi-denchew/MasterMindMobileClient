var app = app || {};

(function(a) {

    function login() {
        data.users.login(viewModel.get("username"), viewModel.get("password"))
            .then(function () {
                app.application.navigate("views/categories-view.html#categories-view");
                
            }, function () {
                if (errorCallback) {
                    errorCallback();
                }
            })
    }
    
    function register() {
        
        console.log(viewModel.get("username") + " " + viewModel.get("password"));
            data.users.register(viewModel.get("username"), viewModel.get("password"))
            .then(function () {
                app.application.navigate("views/categories-view.html#categories-view");
            });
    }
    
    var viewModel = kendo.observable({
        username: "user",
        password: "pass",
    });
    
    function init(e) {
        console.log(e.view.element);
        kendo.bind(e.view.element, viewModel);
        debugger;
    }
    
    a.login = {
        init:init          
    };
}(app));