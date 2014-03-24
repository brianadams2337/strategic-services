

var bvLocaleProperties = {
					
	/********** error messaging **********/

	"error" : {

		"universal" : {
			"ugc-nocontent" : "Sorry. There was an error retrieving content.",
		},

	},
	
	/********** headers **********/

	"header" : {

		"universal" : {
			"section-ugc" : "Review Highlights",
			"section-ugc-nocontent" : "There are no highlights for this product.",
		},

	},

	
	/********** overlays **********/

	"overlay" : {

		"universal" : {
			"loading" : "Loading Review Highlights...",
		},

	},
	
	/********** general display items **********/

	"ugc" : {
		
		"universal" : {
			// location
			"location-prefix" : "Location:",
			"location-suffix" : "",
			// nickname
			"nickname-prefix" : "",
			"nickname-suffix" : "",
			// pullquote
			"pullquote-prefix" : "&ldquo;",
			"pullquote-suffix" : "&rdquo;",
		},

	},
}

/* REQUIRED - MUST BE AT END OF ANY PROPERTIES.JS FILE */

// check to see if bvProperties object already exists
if (typeof bvProperties === "undefined") {
	// if not, create new object with local properties
	window.bvProperties = bvLocaleProperties;
} else {
	// if yes, extend object to inherit new local properties
	bvProperties = $.extend(true, bvProperties, bvLocaleProperties);
}

