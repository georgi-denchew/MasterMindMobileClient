var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        name: "name",
        contacts: [],
        categories:[],
        selectedCategory: null,
        startDate: new Date(),
        duration: "1:00",
        description: "",
        change: onCategoryChanged,
        getLocation: false,
        addContact: function () {
            var name = $("#contacts-list>option:selected").text();
            var number = $("#contacts-list").val();
            
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
                latitude: null,
                longitude: null,
                description: this.get("description"),
                startDate: this.get("startDate"),
                duration: this.get("duration"),
                categoryId: this.get("selectedCategory").Id
            };
            
            debugger;
            
            
            var toLocate = $("#toLocate")[0].checked;
            console.log(toLocate)
            
            if (toLocate) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    event.latitude = position.coords.latitude;
                    event.longitude = position.coords.longitude;
                }, positionError);
            }
            
            //DOESN'T GET TO SUCCESS HANDLER ?!?!
            app.dataPersister.events.create(event)
            .then(function () {
                debugger;
                app.application.navigate("views/events-view.html#events-view");
                this.set("name", "");
                this.set("contacts", []);
                this.set("latitude", null);
                this.set("longitude", null);
                this.set("description", "");
                this.set("startDate", new Date());
                this.set("duration", "1:00");
                
            }, function () {
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
            viewModel.set("selectedCategory", categories[0]);
        });
        
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        var fields = ["displayName", "phoneNumbers"];
        //navigator.contacts.find(fields, onSuccess, onError, options);
    }
    
    function onSuccess(contacts) {
        var contactsToDisplay = _.filter(contacts, function (contact) {
            return contact.displayName != null && contact.phoneNumbers;
        });
        
        var length = contactsToDisplay.length;
            
        for (i = 0; i < length; i++) {
            /*$("#selected-contact").append("<div>" +
            contactsToDisplay[i].displayName + " numbers: " +
            contactsToDisplay[i].phoneNumbers[0].value +  "</div");*/
            contactsToDisplay[i].phoneNumber = contactsToDisplay[i].phoneNumbers[0].value;
        }
        
        //USE UNDERSCORE JS
        $("#contacts-list").kendoDropDownList({
            dataTextField: "displayName",
            dataValueField: "phoneNumber",
            dataSource: contactsToDisplay,
            index: 0
        });
    }
    
    function onError() {
        alert('Unable to get contacts list');
    }
    
    //TO BE CHANGED
    function onCategoryChanged(e) {
        console.log(e.sender._selectedValue);
        
        httpRequest.getJSON(app.servicesBaseUrl + "categories/" + e.sender._selectedValue)
        .then(function(category) {
            viewModel.set("selectedCategory", category);
            console.log(category);
        });
    }
    
    debugger;
    
    a.addEvent = {
        init:init
    };
}(app));