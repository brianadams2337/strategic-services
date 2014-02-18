/* DEFAULT REVIEWS CONTROLLERS */

function loadPullquoteWidget (content, options) {
	var settings = $.extend(true, {
		"parentContainer":"body", // container ($template) must be defined in call or default is page body
		"targetContainer":bvTargetContainer["ugc"]["universal"]["container-pullquote-widget"],
		"viewContainer":bvView["ugc"]["universal"]["container-pullquote-widget"],
		"loadOrder":"",
		"productId":"",
	}, options);
	// set content
	var bvContent = {};
	var ugcToLoad = content["Results"]; // reviews
	// set container & template
	var $container = $(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
	var $template = returnTemplate(bvContent, settings["viewContainer"]);
	// add widget template
	$container.html($template);

	// check to make sure reviews exist
	if (ugcToLoad != "" && ugcToLoad != null && ugcToLoad != undefined && !$.isEmptyObject(ugcToLoad)) {

		/***** headers *****/
		loadSectionHeader (bvProperties["header"]["universal"]["section-ugc"], {
			"parentContainer":$template,
		});

		// load reviews
		$.each (ugcToLoad, function(key) {
			loadIndividualReview (ugcToLoad[key], {
				"parentContainer":$template,
				"productId":settings["productId"],
			});
		});

	} else {

		/***** headers *****/
		loadSectionHeader (bvProperties["header"]["universal"]["section-ugc-nocontent"], {
			"parentContainer":$template,
		});

	}
}



function loadIndividualReview (content, options) {
	var settings = $.extend(true, {
		"parentContainer":"", // template must be defined in call
		"targetContainer":bvTargetContainer["ugc"]["universal"]["container-group"],
		"viewContainer":bvView["ugc"]["universal"]["container-individual"],
		"loadOrder":"",
		"productId":"",
	}, options);
	// set content
	var bvContent = {};
	// set container & template
	var $container = $(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
	var $template = returnTemplate(bvContent, settings["viewContainer"]);
	// add widget template
	$container.append($template);
	// set variables
	var contentId = content["Id"]
	var newID = "BVUGCContainer" + contentId;
	$($template).attr("id",newID);

	// load review rating
	loadReviewRating (content, {
		"parentContainer":$template,
	});
	// load review pullquote
	loadUGCPullquote (content, {
		"parentContainer":$template,
	});
	// load review user nickname
	loadUGCUserNickname (content, {
		"parentContainer":$template,
	});
	// load review user location
	loadUGCUserLocation (content, {
		"parentContainer":$template,
	});

}

/* REVIEW RATINGS DATA */

function loadReviewRating (content, options) {
	var settings = $.extend(true, {
		"parentContainer":"", // container ($template) must be defined in call
		"targetContainer":bvTargetContainer["ugc"]["review"]["rating-overall"],
		"viewContainer":bvView["ugc"]["review"]["rating-overall"],
	}, options);
	// set content
	var bvContent = {
		"rating-overall-value" : content['Rating'].toFixed(defaultDecimalOptions["overall"]),
		"rating-overall-value-range" : content['RatingRange'].toFixed(defaultDecimalOptions["overallRange"]),
	};
	// set container & template
	var $container = $(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
	var $template = returnTemplate(bvContent, settings["viewContainer"]);
	// add template
	$container.append($template);
	// set star value
	setStarRating ($template, bvContent["rating-overall-value"], bvContent["rating-overall-value-range"]);
}


