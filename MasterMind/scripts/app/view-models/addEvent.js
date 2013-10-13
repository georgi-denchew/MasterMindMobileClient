var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        name: "",
        contacts: [],
        categories:[],
        selectedCategory: null,
        categoryId: 0,
        startDate: new Date(),
        duration: "1:00",
        description: "",
        change: onCategoryChanged,
        getLocation: false,
        addContact: function () {
            var name = $("#events-contacts-list>option:selected").text();
            var number = $("#events-contacts-list").val();
            
            var contact = {
                displayName: name,
                phoneNumber: number
            };
            
            var vmContacts = this.get("contacts");
            vmContacts.push(contact);
            this.set("contacts", vmContacts);
        },
        addEvent: function () {
            var event = {
                name: this.get("name"),
                contacts: this.get("contacts"),
                latitude: "",
                longitude: "",
                description: this.get("description"),
                startDate: this.get("startDate"),
                duration: this.get("duration"),
                categoryId: this.get("categoryId")
            };
            
            var toLocate = $("#toLocate").val();
            
            if (toLocate == "on") {
                navigator.geolocation.getCurrentPosition(function (position) {
                    debugger;
                    event.latitude = position.coords.latitude;
                    event.longitude = position.coords.longitude;
                }, positionError, {timeout:5000, enableHighAccuracy:true});
            }
            
            
            //DOESN'T GET TO SUCCESS HANDLER ?!?!
            app.dataPersister.events.create(event)
            .then(function () {
                navigator.notification.vibrate(300);
                console.log("success");
                app.application.navigate("views/events-view.html#events-view");
            }, function (e) {
                console.log(e);
                navigator.notification.vibrate(300);
                app.application.navigate("views/events-view.html#events-view");
            });
        }
    });
    
    function positionError() {
        alert("Cannot locate position");
    }
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        
        app.dataPersister.categories.all()
        .then(function (categories) {
            viewModel.set("categories", categories);
            viewModel.set("categoryId", categories[0].Id);
        });
        
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        var fields = ["displayName", "phoneNumbers"];
        navigator.contacts.find(fields, onSuccess, onError, options);
        
        viewModel.set("name", "");
        viewModel.set("contacts", []);
        viewModel.set("description", "");
        viewModel.set("startDate", new Date());
        viewModel.set("duration", "1:00");
        $("#toLocate")[0].checked = false;
        
        $("#listview").kendoMobileListView();
    }
    
    function onSuccess(contacts) {
        var contactsToDisplay = _.filter(contacts, function (contact) {
            return contact.displayName != null && contact.phoneNumbers;
        });
        
        var length = contactsToDisplay.length;
            
        for (i = 0; i < length; i++) {
            contactsToDisplay[i].phoneNumber = contactsToDisplay[i].phoneNumbers[0].value;
        }
        
        $("#events-contacts-list").kendoDropDownList({
            dataTextField: "displayName",
            dataValueField: "phoneNumber",
            dataSource: contactsToDisplay,
            index: 0
        });
    }
    
    function onError() {
        alert('Unable to get contacts list');
    }
    
    function onCategoryChanged(e) {
        viewModel.set("categoryId", e.sender._selectedValue);
        
        console.log(viewModel.get("categoryId"));
    }
    
    debugger;
    
    a.addEvent = {
        init:init
    };
}(app));