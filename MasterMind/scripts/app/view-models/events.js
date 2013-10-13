var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        categories:[],
        events:[],
        selectedCategory:null,
        change: onCategoryChanged,
        eventDetails: eventDetails,
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        
        app.dataPersister.categories.all()
        .then(function (categories) {
            viewModel.set("categories", categories);
            
            app.dataPersister.categories.getEvents(categories[0].Id).
            then(function (category) {
                viewModel.set("selectedCategory", category);
            });
        });
    }
    
    function eventDetails(e) {
        debugger;
        var event = JSON.stringify(e.data);
        localStorage.setItem("eventDetails", event);
        app.application.navigate("views/event-details-view.html#event-details-view");
    }
    
    function onCategoryChanged(e) {
        
        
        app.dataPersister.categories.getEvents(e.sender._selectedValue)
        .then(function(category) {
            viewModel.set("selectedCategory", category);
        });
    }
    
    a.events = {
        init:init
    };
}(app));