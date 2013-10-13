var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        name: "name",
        contacts: [],
        categories:[],
        selectedCategory: null,
        categoryId: 0,
        toBeCompletedOn: new Date(),
        description: "",
        change: onCategoryChanged,
        reminderImage: null,
        addImage: function () {
            console.log("about to take photo");
            var destinationType = navigator.camera.DestinationType;
            navigator.camera.getPicture(onPhotoDataSuccess, onPhotoDataFail, {
                quality: 50,
                destinationType: destinationType.DATA_URL
            });
        },
        addContact: function () {
            var name = $("#reminders-contacts-list>option:selected").text();
            var number = $("#reminders-contacts-list").val();
            var contact = {
                displayName: name,
                phoneNumber: number
            };
            
            var vmContacts = this.get("contacts");
            vmContacts.push(contact);
            this.set("contacts", vmContacts);

        },
        addReminder: function () {
            
            var networkState = navigator.connection.type;
            
            if (networkState == "2g" && this.get("reminderImage") != null) {
                alert("Sending an image is not allowed through 2G NETWORK");
                return;
            }
            
            
            app.dataPersister.reminders.create(this)
            .then(function () {
                debugger;
                navigator.notification.vibrate(300);
                app.application.navigate("views/reminders-view.html#reminders-view");
            }, function () {
                debugger;
                navigator.notification.vibrate(300);
                app.application.navigate("views/reminders-view.html#reminders-view");
            });
        }
    });
    
    function onPhotoDataSuccess(imageData) {
        viewModel.set("reminderImage", imageData);
    }
    
    function onPhotoDataFail() {
        alert("Could not retrieve image");
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
        viewModel.set("description", "");
        viewModel.set("reminderImage", null);
        viewModel.set("name", "");        
    }
    
    function onSuccess(contacts) {
        var contactsToDisplay = _.filter(contacts, function (contact) {
            return contact.displayName != null && contact.phoneNumbers;
        });
        
        var length = contactsToDisplay.length;
            
        for (i = 0; i < length; i++) {
            contactsToDisplay[i].phoneNumber = contactsToDisplay[i].phoneNumbers[0].value;
        }
        
        $("#reminders-contacts-list").kendoDropDownList({
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
    
    a.addReminder = {
        init:init
    };
}(app));