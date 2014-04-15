/* DEFAULT REVIEWS CONTROLLERS */

function bvInitPullquoteDefault () {
	getAllReviews (bvConfigSDK["productId"], bvTargetContainer["ugc"]["universal"]["container-pullquote-widget"], function(content) {
		// check to make sure at least 2 pieces of UGC exist
		if (content["Results"].length >= 2) {
			// slice concatenated UGC results to 2
			content["Results"] = content["Results"].slice(0,2);
			// callback functions
			loadPullquoteWidget (content, {
				"parentContainer":"body",
				"productId":bvConfigSDK["productId"],
			});
		} else {
			// if not enough moderated highlight UGC (at least 2), then find fallback UGC to use
			getAllReviews (bvConfigSDK["productId"], bvTargetContainer["ugc"]["universal"]["container-pullquote-widget"], function(contentFallback) {
				// concatenate original UGC results with fallback UFC results
				content["Results"] = content["Results"].concat(contentFallback["Results"]);
				// slice concatenated UGC results to 2
				content["Results"] = content["Results"].slice(0,2);
				// final UGC results to load - concatenated and sliced
				var ugcToLoad = content["Results"];
				// check to make sure UGC exist
				if (ugcToLoad != "" && ugcToLoad != null && ugcToLoad != undefined && !$bvsdk.isEmptyObject(ugcToLoad)) {
					// callback functions
					loadPullquoteWidget (content, {
						"parentContainer":"body",
						"productId":bvConfigSDK["productId"],
					});
				}

			}, {
				// api parameters
				"Parameters":{
					"attributes":"moderatorcodes,moderatorhighlights", // include moderator codes and highlights in response
					"filter":{
						"rating":"4,5", // only get 4 and 5 star reviews to ensure positive UGC
						"isratingsonly":"false", // set to false to ensure UGC has content
					},
					"sort":{
						"totalpositivefeedbackcount": "desc", // get most helpful UGC to ensure quality UGC content
					},
				}
			});
		}

	}, {
		// api parameters
		"Parameters":{
			"attributes":"moderatorcodes,moderatorhighlights", // include moderator codes and highlights in response
			"filter":{
				"moderatorcode":"mc", // only get UGC tagged with moderator highlights
			},
		}
	});
}

function loadPullquoteWidget (content, options) {
	var settings = $bvsdk.extend(true, {
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
	var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
	var $template = returnTemplate(bvContent, settings["viewContainer"]);
	// add widget template
	$container.html($template);

	// check to make sure reviews exist
	if (ugcToLoad != "" && ugcToLoad != null && ugcToLoad != undefined && !$bvsdk.isEmptyObject(ugcToLoad)) {

		/***** headers *****/
		loadSectionHeader (bvProperties["header"]["universal"]["section-ugc"], {
			"parentContainer":$template,
		});

		// load reviews
		$bvsdk.each (ugcToLoad, function(key) {
			loadIndividualReview (ugcToLoad[key], {
				"parentContainer":$template,
				"productId":settings["productId"],
			});
		});

		if (ugcToLoad.length == 1) {
			$bvsdk(settings["targetContainer"]).addClass("BVRRSingleReview");
		} else if (ugcToLoad.length == 0) {
			$bvsdk(settings["targetContainer"]).addClass("BVRRNoReview");
		}

	} else {

		/***** headers *****/
		loadSectionHeader (bvProperties["header"]["universal"]["section-ugc-nocontent"], {
			"parentContainer":$template,
		});

	}
}



function loadIndividualReview (content, options) {
	var settings = $bvsdk.extend(true, {
		"parentContainer":"", // template must be defined in call
		"targetContainer":bvTargetContainer["ugc"]["universal"]["container-group"],
		"viewContainer":bvView["ugc"]["universal"]["container-individual"],
		"loadOrder":"",
		"productId":"",
	}, options);
	// set content
	var bvContent = {};
	// set container & template
	var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
	var $template = returnTemplate(bvContent, settings["viewContainer"]);
	// add widget template
	$container.append($template);
	// set variables
	var contentId = content["Id"]
	var newID = "BVUGCContainer" + contentId;
	$bvsdk($template).attr("id",newID);

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
	var settings = $bvsdk.extend(true, {
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
	var $container = $bvsdk(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]);
	var $template = returnTemplate(bvContent, settings["viewContainer"]);
	// add template
	$container.append($template);
	// set star value
	setStarRating ($template, bvContent["rating-overall-value"], bvContent["rating-overall-value-range"]);
}


