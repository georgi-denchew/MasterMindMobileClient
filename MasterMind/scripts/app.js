/*(function (global) {
var mobileSkin = "",
app = global.app = global.app || {};

document.addEventListener("deviceready", function () {
app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout" });
}, false);

app.changeSkin = function (e) {
if (e.sender.element.text() === "Flat") {
e.sender.element.text("Native");
mobileSkin = "flat";
}
else {
e.sender.element.text("Flat");
mobileSkin = "";
}

app.application.skin(mobileSkin);
};
})(window);*/

var app = app || {};

(function() {
    //vmFactory.setPersister(dataPersister);
    
    app.dataPersister = persisters.get("http://localhost:24394/api/");
    
    //app.dataPersister = persisters.get("http://mastermindapp.apphb.com/api/");
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