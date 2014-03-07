
// version of jquery being used by SDK - if changed, make sure local file is updated for fallbacks
var jqueryVersion = "1.11.0";

// var locationProtocol = location.protocol + "//";
// var locationHostName = location.hostname;
// var locationPort = location.port ? ':' + location.port : '';
// var locationPathname = location.pathname;
// var localPathToSDK = "/strategic-services/clinique/bvSDKFramework";
var locationProtocol = "https:" + "//";
var locationHostName = "rawgithub.com";
var locationPort = '';
var locationPathname = location.pathname;
var localPathToSDK = "/brianadamsdesigns/strategic-services/styling-branch/clinique/bvSDKFramework";

// check if jquery does not exist or does not match version
if (typeof jQuery == 'undefined' || !(($.fn.jquery) == jqueryVersion)) {
	var otherJSLibrary;
	// check for other js libraries
	if (typeof $ == 'function') {
		otherJSLibrary = true;
	}
	
	loadScript('http://ajax.googleapis.com/ajax/libs/jquery/' + jqueryVersion + '/jquery.min.js', function() {
		if (typeof jQuery=='undefined') {
			// load local file as fallback if jquery did not load successfully from CDN
			loadScript(locationProtocol + locationHostName + locationPort + localPathToSDK + "/js/jquery.min." + jqueryVersion + ".js", function() {
				bvLoadSDK();
			})
		} else {
			// jquery script loaded successfully
			if (!otherJSLibrary) {
				// no conflicts - init bv
				bvLoadSDK();
			} else {
				// possible conflicts with other library
				// $.noConflict();
				bvLoadSDK();
			}
		}
	});
	
} else {
	// jQuery was already loaded
	bvLoadSDK();
}

function loadScript(url, callback) {
	// create script to load
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.src = url;
	// document head
	var head = document.getElementsByTagName('head')[0];
	// toggle to ensure script only loads once in browsers with onreadystatechange bugs (specifically Opera, maybe others)
	var complete = false;

	// handler for script load
	script.onload = script.onreadystatechange = function() {
		// check to make sure script is loaded
		if (!complete && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
			// toggle to stop script from loading more than once	
			complete = true;
			// callback function provided as param
			callback();
			// reset onreadystatechange of script for browser compatibility bugs (specifically Opera, maybe others)
			script.onload = script.onreadystatechange = null;
			// remove loaded script from head
			head.removeChild(script);
		};
	};

	// handler for script load error
	script.onerror = function() {
			// toggle to stop script from loading more than once	
			complete = true;
			// callback function provided as param
			callback();
			// reset onreadystatechange of script for browser compatibility bugs (specifically Opera, maybe others)
			script.onload = script.onreadystatechange = null;
			// remove loaded script from head
			head.removeChild(script);
	}

	// add script to head
	head.appendChild(script);
}

function bvLoadSDK () {
	// load dependant files first
	$.when(
		// modernizr - must load for HTML 5 browser support (includes HTML5 shiv)
		$.getScript(locationProtocol + locationHostName + locationPort + localPathToSDK + "/js/modernizr.js"),
		// global variables - must load first for bv content
		$.getScript(locationProtocol + locationHostName + locationPort + localPathToSDK + "/models/varsGlobal.js")
	).done(function(){
		// load models (controllers depend on them)
		$.when(
			// properties
			$.when(
				// load language defaults first
				$.getScript(siteBaseURL + "models/properties/" + bvConfigSDK["language"] + "/properties.js")
			).done(function(){
				// load region specific overrides
				if (bvConfigSDK["region"]) {
					$.getScript(siteBaseURL + "models/properties/" + bvConfigSDK["language"] + "/" + bvConfigSDK["region"] + "/properties.js")
				}		
			}).fail(function(e){
				// console.log(e);
			}),
			// models
			$.getScript(siteBaseURL + "models/varsTemplates.js"),
			$.getScript(siteBaseURL + "models/varsContainers.js"),
			$.getScript(siteBaseURL + "models/modelsGlobal.js"),
			$.getScript(siteBaseURL + "models/modelsReviews.js")
		).done(function(){
			// load controllers, plugins, and css files
			$.when(
				// controllers
				$.getScript(siteBaseURL + "controllers/controllersGlobal.js"),
				$.getScript(siteBaseURL + "controllers/controllersUGCDisplayUniversal.js"),
				$.getScript(siteBaseURL + "controllers/controllersReviews.js"),

				// css files
				$("head").append("<link href='" + siteBaseURL + "css/bazaarvoiceUniversal.css' type='text/css' rel='stylesheet' />"),
				$.get(siteBaseURL + "views/viewsUniversal.html", function(data) {
					$("body").append(data);
				})
			).done(function(){
				// load reviews
				switch (bvConfigSDK["pageType"]) {
					case "Product":
						// reviews
						getAllReviews (bvConfigSDK["productId"], bvTargetContainer["ugc"]["universal"]["container-pullquote-widget"], function(content) {
							// check to make sure at least 2 pieces of UGC exist
							if (content["Results"].length >= 2) {
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
									if (ugcToLoad != "" && ugcToLoad != null && ugcToLoad != undefined && !$.isEmptyObject(ugcToLoad)) {
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
										"limit":"1",
										"filter":{
											"rating":"4,5", // only get 4 and 5 star reviews to ensure positive UGC
											"isratingsonly":"false", // set to false to ensure UGC has content
											// "hasphoto":"true", // set to false to ensure UGC has content
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
								"limit":"1",
								"filter":{
									"moderatorcode":"mc", // only get UGC tagged with moderator highlights
									// "hasphoto":"true", // set to false to ensure UGC has content
								},
							}
						});

						break;

					case "Category":

						break;

					case "Misc":

						break;

					default:

						break;

					}

			}).fail(function(e){
				// console.log(e);
			});

		}).fail(function(e){
			// console.log(e);
		});
	}).fail(function(e){
		// console.log(e);
	});
}

