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
        
        /*viewModel.set("name", reminder.name);
        viewModel.set("description", reminder.description);
        viewModel.set("contacts", reminder.contacts);
        viewModel.set("reminderImage", reminder.reminderImage);
        viewModel.set("toBeCompletedOn", reminder.toBeCompletedOn);*/
        
        kendo.bind(e.view.element, viewModel);
    }
    
    
    a.reminderDetails = {
        init:init
    };
}(app));