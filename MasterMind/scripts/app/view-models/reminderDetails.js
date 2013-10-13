var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        reminders: [],
    });
    
    function init(e) {
        debugger;
        var reminderString = localStorage.getItem("reminderDetails");
        var reminder = JSON.parse(reminderString);
        var reminders = viewModel.get("reminders");
        reminders.push(reminder);
        viewModel.set("reminders", reminders);
        
        kendo.bind(e.view.element, viewModel);
    }    
    
    a.reminderDetails = {
        init:init
    };
}(app));