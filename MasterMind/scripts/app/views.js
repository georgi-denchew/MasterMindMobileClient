/// <reference path="../libs/_references.js" />


window.viewsFactory = (function () {
	var rootUrl = "scripts/partials/";

	var templates = {};

	function getTemplate(name) {
		var promise = new RSVP.Promise(function (resolve, reject) {
			if (templates[name]) {
				resolve(templates[name])
			}
			else {
				$.ajax({
					url: rootUrl + name + ".html",
					type: "GET",
					success: function (templateHtml) {
						templates[name] = templateHtml;
						resolve(templateHtml);
					},
					error: function (err) {
						reject(err)
					}
				});
			}
		});
		return promise;
	}

	function getLoginView() {
	    return getTemplate("login-form");
	}

	function getAdvertsView() {
	    return getTemplate("adverts-list");
	}

	function getSingleAdvertView() {
	    return getTemplate("single-advert");
	}
	function getAdvertsViewWithLogOut() {
	    return getTemplate("adverts-list-with-logout");
	}

	function getCreateView() {
	    return getTemplate("create-view");
	}

	function getHomeView() {
	    return getTemplate("home-view");
	}

	function getAppointmentsView() {
	    return getTemplate("appointments-view");
	}

	function getDateView() {
	    return getTemplate("date-view");
	}

	function getCreateAppointmentVew() {
	    return getTemplate("create-appointment-view");
	}

	function getTodosView() {
	    return getTemplate("todolist-view");
	}

	function getCreateTodoListView() {
	    return getTemplate("create-todolist-view");
	}

	function getSingleTodoListView() {
	    return getTemplate("single-todolist-view");
	}

	function getCreateTodoView() {
	    return getTemplate("create-todo-view");
	}

	return {
	    getLoginView: getLoginView,
	    getHomeView: getHomeView,
	    getAppointmentsView: getAppointmentsView,
        getDateView: getDateView,
        getCreateAppointmentVew: getCreateAppointmentVew,
        getTodosView: getTodosView,
        getCreateTodoListView: getCreateTodoListView,
        getSingleTodoListView: getSingleTodoListView,
        getCreateTodoView: getCreateTodoView
	};
}());