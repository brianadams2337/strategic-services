
// version of jquery being used by SDK - if changed, make sure local file is updated for fallbacks
var jqueryVersion = "1.11.1";

var locationProtocol = location.protocol + "//";
var locationHostName = location.hostname;
var locationPort = (location.port) ? ":" + location.port : '';
var locationPathname = location.pathname;
var localPathToSDK = "http://e.clinique.na.us.eng.elcdev.net/sites/clinique/libraries/bvSDKFramework/";

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
	$bvsdk.when(
		// modernizr - must load for HTML 5 browser support (includes HTML5 shiv)
		$bvsdk.getScript("http://e.clinique.na.us.eng.elcdev.net/sites/clinique/libraries/bvSDKFramework/" + "js/modernizr.js"),
		// global variables - must load first for bv content
		$bvsdk.getScript("http://e.clinique.na.us.eng.elcdev.net/sites/clinique/libraries/bvSDKFramework/" + "models/varsGlobal.js")
	).done(function(){
		// load models (controllers depend on them)
		$bvsdk.when(
			// properties
			$bvsdk.when(
				// load language defaults first
				$bvsdk.getScript("http://e.clinique.na.us.eng.elcdev.net/sites/clinique/libraries/bvSDKFramework/" + "models/properties/" + (bvConfigSDK["language"] || "en") + "/properties.js")
			).done(function(){
				// load region specific overrides
				if (bvConfigSDK["region"]) {
					$bvsdk.getScript("http://e.clinique.na.us.eng.elcdev.net/sites/clinique/libraries/bvSDKFramework/" + "models/properties/" + (bvConfigSDK["language"] || "en") + "/" + bvConfigSDK["region"] + "/properties.js")
				}		
			}).fail(function(e){
				// console.log(e);
			}),
			// models
			$bvsdk.getScript("http://e.clinique.na.us.eng.elcdev.net/sites/clinique/libraries/bvSDKFramework/" + "models/varsTemplates.js"),
			$bvsdk.getScript("http://e.clinique.na.us.eng.elcdev.net/sites/clinique/libraries/bvSDKFramework/" + "models/varsContainers.js"),
			$bvsdk.getScript("http://e.clinique.na.us.eng.elcdev.net/sites/clinique/libraries/bvSDKFramework/" + "models/modelsGlobal.js"),
			$bvsdk.getScript("http://e.clinique.na.us.eng.elcdev.net/sites/clinique/libraries/bvSDKFramework/" + "models/modelsReviews.js")
		).done(function(){
			// load controllers, plugins, and css files
			$bvsdk.when(
				// controllers
				$bvsdk.getScript("http://e.clinique.na.us.eng.elcdev.net/sites/clinique/libraries/bvSDKFramework/" + "controllers/controllersGlobal.js"),
				$bvsdk.getScript("http://e.clinique.na.us.eng.elcdev.net/sites/clinique/libraries/bvSDKFramework/" + "controllers/controllersUGCDisplayUniversal.js"),
				$bvsdk.getScript("http://e.clinique.na.us.eng.elcdev.net/sites/clinique/libraries/bvSDKFramework/" + "controllers/controllersReviews.js"),

				// css files
				$bvsdk("head").append("<link href='" + "http://e.clinique.na.us.eng.elcdev.net/sites/clinique/libraries/bvSDKFramework/" + "css/bazaarvoiceUniversal.css' type='text/css' rel='stylesheet' />"),
				$bvsdk.get("http://e.clinique.na.us.eng.elcdev.net/sites/clinique/libraries/bvSDKFramework/" + "views/viewsUniversal.html", function(data) {
					$bvsdk("body").append(data);
				})
			).done(function(){
				console.log("testtest6");
				// load reviews
				switch (bvConfigSDK["pageType"]) {

					case "Product":
						// Product Page specific code
						bvInitPullquoteDefault();
						break;
					
					case "Category":
						// Category Page specific code
						bvInitPullquoteDefault();
						break;
					
					case "Misc":
						// Misc Page specific code (home page, etc)
						bvInitPullquoteDefault();
						break;

					default:
						// Default code
						bvInitPullquoteDefault();
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

loadScript(localPathToSDK + "js/jquery.bvsdk.min." + jqueryVersion + ".js", function() {
	bvLoadSDK();
})
