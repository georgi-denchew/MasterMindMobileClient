var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        categories:[],
        reminders:[],
        selectedCategory:null,
        change: onCategoryChanged,
        reminderDetails: reminderDetails,
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        
        app.dataPersister.categories.all()
        .then(function (categories) {
            viewModel.set("categories", categories);
            
            app.dataPersister.categories.getReminders(categories[0].Id).
            then(function (category) {
                viewModel.set("selectedCategory", category);
            });
        });
    }
    
    function reminderDetails (e) {
        console.log (e);
        var reminder = JSON.stringify(e.data);
        localStorage.setItem("reminderDetails", reminder);
        app.application.navigate("views/reminder-details-view.html#reminder-details-view");
    }
    
    function onCategoryChanged(e) {
        debugger;
        console.log(e.sender._selectedValue);
        
        app.dataPersister.categories.getReminders(e.sender._selectedValue)
        .then(function(category) {
            viewModel.set("selectedCategory", category);
        });
    }
    
    a.reminders = {
        init:init
    };
}(app));