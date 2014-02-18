function returnAPIParametersString (object) {
	var params = ""
	$.each (object, function (parameter, parameterValue) {			
		if (parameter == "filter") {
			$.each (this, function (filter, filterValue) {
				if (!(filterValue == null || filterValue == undefined || !filterValue)) {
					if (typeof filterValue === "string") {
						params += "&filter=" + filter + ":" + filterValue;
					} else {
						$.each(filterValue, function(index, value) {
							params += "&filter=" + filter + ":" + value;
						});
					}
				};
			});
		} else if (parameter == "sort") {
			var i = 1;
			$.each (this, function (sort, sortValue) {
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
	$.each (object, function (parameter, parameterValue) {			
		if (parameter == "filter") {
			var filters = new Object;
			$.each (this, function (filter, filterValue) {
				if (!(filterValue == null || filterValue == undefined || !filterValue)) {
					filters[filter] = filterValue;
				};
			});
			params["filter"] = filters;
		} else if (parameter == "sort") {
			var sorts = new Object;
			$.each (this, function (sort, sortValue) {
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

/***** UAS PARAMETERS *****/

function parseUAS (UAS) {
	var encodedString = UAS.substring(32); //Assumes MD5 hash is 32 digits and strips it from UAS
	var str = '';
	for (var i = 0; i < encodedString.length; i += 2) { //converts hex values to ascii
        str += String.fromCharCode(parseInt(encodedString.substr(i, 2), 16));
    }
    var params = {};
    $.each(str.split("&"), function(){ //converts decoded string to javascript object
    	var param = this.split("=");
    	if (param.length > 1) {
    		params[param[0]] = param[1];
    	}
    });
    return params;
}

// parsed UAS object
var userParams = parseUAS(bvUserDefaults['bvUAS']);

