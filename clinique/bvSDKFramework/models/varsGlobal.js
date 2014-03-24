/***** CLIENT DEFAULTS *****/

// url path for staging site
var stagingURL = locationProtocol + locationHostName + locationPort + localPathToSDK + "/";
// url pate for production site
var productionURL = locationProtocol + locationHostName + locationPort + localPathToSDK + "/";

// api parameter defaults
var apiDefaults = {
	"stagURL": "stg.api.bazaarvoice.com/",
	"prodURL": "api.bazaarvoice.com/",
	"customerName": "clinique",
	"format": "json",
	"locale": (bvConfigSDK["region"]) ? bvConfigSDK["language"] + "_" + bvConfigSDK["region"] : bvConfigSDK["language"] || "en_US",
	"apiVersion": "5.4",
	"passkey": bvConfigSDK["passkey"] || "2q5a7l2d368m1t25qnprqpxrl", // production key
	"offset": 0,
	"limitReviews": 2,
};



/***** SET SITE TO PRODUCTION *****/
// true -> production
// false -> staging

var bvProduction = bvConfigSDK["production"] || false;



/***** SET SITE URLS *****/

var apiBaseURL;
if (bvProduction) {
	apiBaseURL = apiDefaults["prodURL"];
} else {
	apiBaseURL = apiDefaults["stagURL"];
};

var siteBaseURL;
if (bvProduction) {
	siteBaseURL = productionURL;
} else {
	siteBaseURL = stagingURL;
};


/***** TOGGLE OPTIONS *****/

// default speed of all jQuery animations (show,hide,etc)
var defaultAnimationSpeed = 300; // milliseconds

// default toggle options for all jQuery animations (show,hide,etc)
var defaultToggleOptions = {
	duration: defaultAnimationSpeed,
	easing: "swing",
	queue: true,
};



/***** DECIMAL TRUNCATION OPTIONS *****/

// the amount of decimal places to allow for the review ratings
var defaultDecimalOptions = {
	"overallAverage": 1,
	"secondaryAverage": 1,
	"overall": 1,
	"secondary": 1,
	"overallRange": 0,
	"secondaryRange": 0,
};


