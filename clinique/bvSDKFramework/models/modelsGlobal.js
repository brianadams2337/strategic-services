function returnAPIParametersString (object) {
	var params = ""
	$bvsdk.each (object, function (parameter, parameterValue) {			
		if (parameter == "filter") {
			$bvsdk.each (this, function (filter, filterValue) {
				if (!(filterValue == null || filterValue == undefined || !filterValue)) {
					if (typeof filterValue === "string") {
						params += "&filter=" + filter + ":" + filterValue;
					} else {
						$bvsdk.each(filterValue, function(index, value) {
							params += "&filter=" + filter + ":" + value;
						});
					}
				};
			});
		} else if (parameter == "sort") {
			var i = 1;
			$bvsdk.each (this, function (sort, sortValue) {
				if (!(sortValue == null || sortValue == undefined || !sortValue)) {
					if (i == 1) {
						params += "&sort=" + sort + ":" + sortValue;
					} else {
						params += "," + sort + ":" + sortValue;
					};
					i++;
				};
			});
		} else {
			if (!(parameter == "URL" || parameter == "AjaxSettings" || parameterValue == null || parameterValue == undefined || !parameterValue)) {
				params += "&" + parameter + "=" + parameterValue;
			};
		};
	});
	// remove first ampersand character return parameters
	return params.substring(1);
}

function returnAPIParameters (object) {
	var params = new Object;
	$bvsdk.each (object, function (parameter, parameterValue) {			
		if (parameter == "filter") {
			var filters = new Object;
			$bvsdk.each (this, function (filter, filterValue) {
				if (!(filterValue == null || filterValue == undefined || !filterValue)) {
					filters[filter] = filterValue;
				};
			});
			params["filter"] = filters;
		} else if (parameter == "sort") {
			var sorts = new Object;
			$bvsdk.each (this, function (sort, sortValue) {
				if (!(sortValue == null || sortValue == undefined || !sortValue)) {
					sorts[sort] = sortValue;
				};
			});
			params["sort"] = sorts;
		} else {
			if (!(parameter == "URL" || parameter == "AjaxSettings" || parameterValue == null || parameterValue == undefined || !parameterValue)) {
				params[parameter] = parameterValue;
			};
		};
	});

	return params;
}

function defaultAjaxErrorFunction (content) {
	consoleLogFallback(content);
}


