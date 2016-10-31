(function (scope) {
	'use strict';

	// Make sure TMH can still use their own version
	var $ = scope.myQuery,
		query = (function (query) {
			return query.slice(1).split("&").map(function (v) {
				return v.split("=");
			}).reduce(function (obj, v) {
				obj[v[0]] = v[1];
				return obj;
			}, {});
		}(scope.location.search)),
		amto24 = function (time) {
			var hours, minutes, val;

			try {
				hours = Number(time.match(/^(\d+)/)[1]);
				minutes = Number(time.match(/:(\d+)/)[1]);
				val = time.match(/\s(AM|PM)$/)[1];
				if (val === "PM" && hours < 12) {
					hours = hours + 12;
				}
				if (val === "AM" && hours === 12) {
					hours = hours - 12;
				}

				return (('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2));
			} catch (e) {
				return '';
			}
		},
		utils = {amto24: amto24},
		page;

	// Replace logo
	$(".logo img").attr('src', $("link[rel=newlogo]").attr('href'));

	// Setup menu element
	$("ul.nav").prepend($("<li>").append($("<a>").attr("href", "/secure/hours?Project=0&DateRange=Today").text("Today")));

	// Check page
	if (query.DateRange === "Today" && query.Project === "0" && (!query.Employee || query.Employee === "")) {
		page = scope.pages.Today;
	} else if ((query.DateRange === "ThisWeek" || query.DateRange === "LastWeek") && query.Project === "0" && (!query.Employee || query.Employee === "") && !query.Edit) {
		page = scope.pages.Week;
	}

	if (page) {
		page.apply($, query, utils);
	}
}(this));
