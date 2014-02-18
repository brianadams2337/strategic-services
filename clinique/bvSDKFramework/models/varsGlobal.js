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
	// "customerName": "bvpstemplates.ugc",
	"format": "json",
	"locale": bvConfigSDK["locale"] || "en_US",
	"apiVersion": "5.4",
	"passkey": "2q5a7l2d368m1t25qnprqpxrl",
	"offset": 0,
	"limitReviews": 10,
	"limitReviewComments": 2,
	"limitQuestions": 10,
	"limitAnswers": 2,
	"limitStories": 10,
	"limitStoryComments": 2,
	"page": 1
};

var bvUserDefaults = {
	"bvUAS": typeof userToken != 'undefined' ? userToken : "", // encoded user string, or userToken if set
	// "userId": "testuser",
	// "userEmail":"bvspambox@gmail.com", //User's email address
	// "userLocation":null, //User location text
	// "userNickname":"testuser", //User nickname display text
};


/***** SET SITE TO PRODUCTION *****/
// true = production
// false = staging

var bvProduction = true;



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
var defaultAnimationSpeed = 300; // milliseconds

var defaultToggleOptions = {
	duration: defaultAnimationSpeed,
	easing: "swing",
	queue: true
};

/***** INLINE VALIDATION OPTIONS *****/
var bvClassRequired = "BVRequired";
var bvClassSuccess = "BVSuccess";
var bvClassError = "BVError";


var defaultInlineValidationOption = {
	successClass: bvClassSuccess,
	errorClass: bvClassError,
	messages: {
		"required":"This is a required field.",
		"alphanum":"You may not enter spaces or special characters, numbers and letters only.",
	},
	errors: {
		container: function (elem, isRadioOrCheckbox) {
			return $(elem).closest(".BVField");
		},
		classHandler: function (elem, isRadioOrCheckbox) {
			return $(elem).closest(".BVField");
		},
		errorsWrapper:"<div class='BVErrorContainerInline'></div>",
		errorElem:"<div class='BVErrorInline'></div>",
	}
};

/***** DECIMAL TRUNCATION OPTIONS *****/
var defaultDecimalOptions = {
	"overallAverage": 1,
	"secondaryAverage": 1,
	"overall": 1,
	"secondary": 1,
	"overallRange": 0,
	"secondaryRange": 0
};


/***** GLOBAL CONFIG *****/
var bvUndoHelpfulnessAllowed = false; // MAKE SURE THE CONFIG ALLOWS THIS BEFORE SWITCHING TO TRUE!

var bvHostedAuth = false;

var bvDateFormat = "MMMM dd, yyyy";
switch (apiDefaults["locale"]) {
	case "en_US": 
		bvDateFormat = "MMMM dd, yyyy";
		break;

	default:
		bvDateFormat = "MMMM dd, yyyy";
		consoleLogFallback("no locale");
		break;

}


