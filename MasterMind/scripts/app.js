var app = app || {};

(function() {
    //app.dataPersister = persisters.get("http://localhost:24394/api/");
    
    app.dataPersister = persisters.get("http://mastermindapp.apphb.com/api/");
    vmFactory.setPersister(app.dataPersister);
    
    document.addEventListener("deviceready", function () {
        app.application = new kendo.mobile.Application(document.body);
    });
    
    document.addEventListener("offline", function () {
        alert("Internet connection lost. MasterMind will sleep now");
        navigator.app.exitApp();
    }, function (error) {
        alert(error);
    })
    
    
})();