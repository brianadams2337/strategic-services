

var bvTargetContainer = {

	/********** headers - page, section **********/

	"header" : {

		"universal" : {
			"page" : "[data-bv-target='header-page-universal']",
			"section" : "[data-bv-target='header-section-universal']",
		},

	},

	/********** general display items **********/

	"ugc" : {
		
		"universal" : {
			"container-pullquote-widget" : "[data-bv-target='ugc-container-pullquote-widget-universal']", // pullquote highlight widget
			"pullquote" : "[data-bv-target='ugc-pullquote-universal']",

			"container-widget" : "[data-bv-target='ugc-container-widget-universal']", // entire ugc widget
			"container-group" : "[data-bv-target='ugc-container-group-universal']", // ugc group
			"container-individual" : "[data-bv-target='ugc-container-individual-universal']", // ugc individual item
			"nickname" : "[data-bv-target='ugc-nickname-universal']",
			"location" : "[data-bv-target='ugc-location-universal']",
		},

		"review" : {
			"rating-overall" : "[data-bv-target='ugc-rating-overall-review']", // overall rating module
		},

	},
}

var bvObjectVariables = {
	"container" : {
		"review" : ".BVReviewContainer",
		"rating-star" : "[data-bv-container='rating-star']",
		"rating-star-filled" : "[data-bv-container='rating-star-filled']",
		"rating-star-image-filled" : "[data-bv-container='rating-star-image-filled']",
		"rating-star-unfilled" : "[data-bv-container='rating-star-unfilled']",
		"rating-star-image-unfilled" : "[data-bv-container='rating-star-image-unfilled']",
		"rating-star-text" : "[data-bv-container='rating-star-text']",
	},
}
