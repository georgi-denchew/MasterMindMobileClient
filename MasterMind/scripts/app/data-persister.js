window.persisters = (function () {
	var sessionKey = "";
	var savedUsername = "";
	function clearLocalStorage() {
	    localStorage.removeItem("username");
	    localStorage.removeItem("sessionKey");
	    sessionKey = "";
	    savedUsername = "";
	}

	function saveSessionKey(sessionKeyNew,username) {
	    localStorage.setItem("username", username);
	    localStorage.setItem("sessionKey", sessionKeyNew);
	    savedUsername = username;
	    sessionKey = sessionKeyNew;
	}

	var DataPersister = Class.create({
	    init: function (apiUrl) {
	        this.apiUrl = apiUrl;
            
	        this.users = new UsersPersister(apiUrl);
	        this.categories = new CategoriesPersister(apiUrl);
	        this.events = new EventsPersister(apiUrl);
	        this.reminders = new RemindersPersister(apiUrl);
	    }
	});

	var UsersPersister = Class.create({
		init: function (apiUrl) {
			this.apiUrl = apiUrl + "users/";
		},
		login: function (username, password) {
			var user = {
			    Username: username,
			    AuthCode: CryptoJS.SHA1(password).toString()
			};

			return httpRequester.postJSON(this.apiUrl + "login", user)
				.then(function (data) {
				    saveSessionKey(data.sessionKey, data.displayName);
				    sessionKey = data.sessionKey;
				    savedUsername = data.displayName;
				}, function (err) {
				    console.log(err);
				});
		},
		register: function (username, password) {
		    var user = {
		        username: username,
		        authCode: CryptoJS.SHA1(password).toString()
		    };
            
		    return httpRequester.postJSON(this.apiUrl + "register", user)
				.then(function (data) {
				    saveSessionKey(data.sessionKey, data.displayName);
				    sessionKey = data.sessionKey;
				    savedUsername = data.displayName;
				});
		},
		logout: function () {
		    if (localStorage.getItem("sessionKey")) {

		        var headers = {
		            "X-sessionKey": localStorage.getItem("sessionKey")
		        };

		        return httpRequester.putJSON(this.apiUrl + "logout", {}, headers)
		    .then(function () {
                localStorage.setItem("username", null);
                localStorage.setItem("sessionKey", null);

		    }, function () {
		        localStorage.setItem("username", null);
                localStorage.setItem("sessionKey", null);
		    });
		    }
		},
		currentUser: function () {
		    return localStorage.getItem("username");
		},
	});

	var CategoriesPersister = Class.create({
	    init: function (apiUrl) {
	        this.apiUrl = apiUrl + "categories/";
	    },

	    all: function () {
	        var headers = {
	            "X-sessionKey": localStorage.getItem("sessionKey")
	        };

	        return httpRequester.getJSON(this.apiUrl + "all", headers);
	    },
        
        getEvents: function (categoryId) {
            var headers = {
	            "X-sessionKey": localStorage.getItem("sessionKey")
	        };
            return httpRequester.getJSON(this.apiUrl + categoryId + "/events", headers);
        },

        getReminders: function (categoryId) {
            var headers = {
	            "X-sessionKey": localStorage.getItem("sessionKey")
	        };
            return httpRequester.getJSON(this.apiUrl + categoryId + "/reminders", headers);
        },
        
        create: function (listModel) {
	        var headers = {
	            "X-sessionKey": localStorage.getItem("sessionKey")
	        };
	        return httpRequester.postJSON(this.apiUrl + "lists/", listModel, headers);
	    },

	});
    
    var EventsPersister = Class.create({
	    init: function (apiUrl) {
	        this.apiUrl = apiUrl + "events";
	    },

        create: function (eventsModel) {
	        var headers = {
	            "X-sessionKey": localStorage.getItem("sessionKey")
	        };

	        return httpRequester.postJSON(this.apiUrl + "/create", eventsModel, headers);
	    },
	});
    
    var RemindersPersister = Class.create({
	    init: function (apiUrl) {
	        this.apiUrl = apiUrl + "reminders";
	    },

        create: function (remindersModel) {
	        var headers = {
	            "X-sessionKey": localStorage.getItem("sessionKey")
	        };

	        return httpRequester.postJSON(this.apiUrl + "/create", remindersModel, headers);
	    },
	})    
    
	return {
		get: function (apiUrl) {
			return new DataPersister(apiUrl);
		}
	}
}());