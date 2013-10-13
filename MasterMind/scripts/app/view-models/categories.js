var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        categories:[],
        selectCategory: selectCategory,
        change: onCategoryChanged
    });
    
    function init(e) {
        debugger;
        kendo.bind(e.view.element, viewModel);
        
        app.dataPersister.categories.all()
        .then(function (categories) {
            viewModel.set("categories", categories);            
        });
    }
    
    function selectCategory(e) {
        debugger;
        
        localStorage.setItem("categoryId", e.data.Id);
        
        
    }
    
    function onCategoryChanged(e) {             
        console.log(e.sender._selectedValue);
        
        httpRequest.getJSON(app.servicesBaseUrl  + "categories/" + e.sender._selectedValue)
        .then(function(category) {
            viewModel.set("selectedCategory", category);
            console.log(category);
        });
    }
    
    debugger;
    
    a.categories = {
        init:init
    };
}(app));