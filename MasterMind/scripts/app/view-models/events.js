var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        categories:[],
        events:[],
        selectedCategory:null,
        change: onCategoryChanged
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
    
    function onCategoryChanged(e) {
        debugger;
        console.log(e.sender._selectedValue);
        
        app.dataPersister.categories.getEvents(e.sender._selectedValue)
        .then(function(category) {
            viewModel.set("selectedCategory", category);
        });
    }
    
    a.events = {
        init:init
    };
}(app));