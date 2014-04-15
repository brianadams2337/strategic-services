/* UGC DATA */

function loadUGCPullquote (content, options) {
	var settings = $.extend(true, {
		"parentContainer":"", // container ($template) must be defined in call
		"targetContainer":bvTargetContainer["ugc"]["universal"]["pullquote"],
		"viewContainer":bvView["ugc"]["universal"]["pullquote"],
	}, options);
	// set content
	var bvContent = {
		// if UGC has a moderated highlight with MC code use it, if not use UGC title
		"pullquote" : (content['ModeratorHighlights']["MC"]) ? content['ModeratorHighlights']["MC"]["Highlights"][0]["SelectedText"] : content["Title"],
	};
	// set container & template
	var $container = $(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
	var $template = returnTemplate(bvContent, settings["viewContainer"]);
	// add template
	$container.append($template);
}

/* USER DATA */

function loadUGCUserNickname (content, options) {
	var settings = $.extend(true, {
		"parentContainer":"", // container ($template) must be defined in call
		"targetContainer":bvTargetContainer["ugc"]["universal"]["nickname"],
		"viewContainer":bvView["ugc"]["universal"]["nickname"],
	}, options);
	// set content
	var bvContent = {
		"nickname" : content["UserNickname"],
	};
	// set container & template
	var $container = $(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
	var $template = returnTemplate(bvContent, settings["viewContainer"]);
	// add template
	$container.append($template);
}

function loadUGCUserLocation (content, options) {
	var settings = $.extend(true, {
		"parentContainer":"", // container ($template) must be defined in call
		"targetContainer":bvTargetContainer["ugc"]["universal"]["location"],
		"viewContainer":bvView["ugc"]["universal"]["location"],
	}, options);
	// set content
	var bvContent = {
		"location" : content["UserLocation"],
	};
	// set container & template
	var $container = $(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
	var $template = returnTemplate(bvContent, settings["viewContainer"]);
	// add template
	$container.append($template);
}

/* HEADER */

// section headers
function loadSectionHeader (content, options) {
	var settings = $.extend(true, {
		"parentContainer":"", // container ($template) must be defined in call
		"targetContainer":bvTargetContainer["header"]["universal"]["section"],
		"viewContainer":bvView["header"]["universal"]["section"],
		"loadOrder":"",
		"productId":"",
	}, options);
	// set content
	var bvContent = {
		"header-section" : content,
	};
	// set container & template
	var $container = $(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
	var $template = returnTemplate(bvContent, settings["viewContainer"]);
	// add widget template
	$container.append($template);
}
