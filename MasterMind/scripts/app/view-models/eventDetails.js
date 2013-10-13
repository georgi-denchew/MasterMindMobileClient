var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        events: [],
        
    });
    
    function init(e) {
        debugger;
        var eventString = localStorage.getItem("eventDetails");
        var event = JSON.parse(eventString);
        var events = viewModel.get("events");
        events.push(event);
        viewModel.set("events", events);
        
        kendo.bind(e.view.element, viewModel);
    }
    
    
    a.eventDetails = {
        init:init
    };
}(app));