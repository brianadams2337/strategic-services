

var bvLocaleProperties = {
					
}

/* REQUIRED - MUST BE AT END OF ANY PROPERTIES.JS FILE */

// check to see if bvProperties object already exists
if (typeof bvProperties === "undefined") {
	// if not, create new object with local properties
	window.bvProperties = bvLocaleProperties;
} else {
	// if yes, extend object to inherit new local properties
	bvProperties = $bvsdk.extend(true, bvProperties, bvLocaleProperties);
}

