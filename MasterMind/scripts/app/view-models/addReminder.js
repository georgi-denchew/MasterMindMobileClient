var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        name: "name",
        contacts: [],
        categories:[],
        selectedCategory: null,
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
        addReminder: function () {
            /*var reminder = {
                name: this.get("name"),
                contacts: this.get("contacts"),
                description: this.get("description"),
                
                categoryId: this.get("selectedCategory").Id
            };*/
            
            //DOESN'T GET TO SUCCESS HANDLER ?!?!
            app.dataPersister.reminders.create(this)
            .then(function () {
                debugger;
                app.application.navigate("views/reminders-view.html#reminders-view");
            }, function () {
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
            viewModel.set("selectedCategory", categories[0]);
        });
        
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        var fields = ["displayName", "phoneNumbers"];
        //navigator.contacts.find(fields, onContactsSuccess, onContactsError, options);
    }
    
    function onContactsSuccess(contacts) {
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
    
    function onContactsError() {
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
    
    a.addReminder = {
        init:init
    };
}(app));