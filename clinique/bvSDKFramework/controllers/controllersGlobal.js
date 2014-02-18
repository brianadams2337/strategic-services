/***** FILE PATHS *****/


function pathResource (relativeURI) {
	var path = relativeURI.substr(0,4) == 'http' ? relativeURI : siteBaseURL + relativeURI;
	return path;
}



/***** GENERAL *****/


function setStarRating (template, rating, range) {
	// set variables for images to load
	var imgLoad = $(template).find('img'); // all images in template 
	var imgLoadTotal = imgLoad.length; // total amount of images in template
	var imgLoadCount = 0; // total amount of images currently loaded in template
	// loop through all images to keep track of when they finish loading
	$.each(imgLoad, function() {
		// on image load
		$(this).load(function() {
			// increment 1 to total count of images loaded
			imgLoadCount++;
			// if all images are loaded, run function
			if (imgLoadCount == imgLoadTotal) {
				// calculate variables for image sizing
				var imgWidth = $(template).find(bvObjectVariables["container"]["rating-star-image-unfilled"]).andSelf().filter(bvObjectVariables["container"]["rating-star-image-unfilled"]).width(); // width of unfilled star image to use as a base size
			   	var avgDecimal = (rating/range); // rating decimal
			   	var avg = (avgDecimal * 100); // rating percentage
				var imgPercentage = (imgWidth / (imgWidth * avgDecimal)) * 100; // width of filled image based of rating percentage

				// set attr for star rating container - pos relative is needed to position imgs inside correctly
				$(template).find(bvObjectVariables["container"]["rating-star"]).andSelf().filter(bvObjectVariables["container"]["rating-star"]).css(
					"cssText", "position: relative !important;"
				);

				// set attr for filled star container
				$(template).find(bvObjectVariables["container"]["rating-star-filled"]).andSelf().filter(bvObjectVariables["container"]["rating-star-filled"]).css(
					"cssText", "width: " + avg + "% !important; position: absolute !important; top: 0px !important; left: 0px !important; overflow: hidden !important;"
				);
				// set attr for unfilled star container
				$(template).find(bvObjectVariables["container"]["rating-star-unfilled"]).andSelf().filter(bvObjectVariables["container"]["rating-star-unfilled"]).css(
					"cssText", "width: 100% !important;"
				);

				// set attr for filled star img - needed to counteract sizing of parent container
				$(template).find(bvObjectVariables["container"]["rating-star-image-filled"]).andSelf().filter(bvObjectVariables["container"]["rating-star-image-filled"]).css(
					"cssText", "width: " + imgPercentage + "% !important;"
				);
				// set attr for unfilled star img - needed to to keep constraints of parent container
				$(template).find(bvObjectVariables["container"]["rating-star-image-unfilled"]).andSelf().filter(bvObjectVariables["container"]["rating-star-image-unfilled"]).css(
					"cssText", "width: 100% !important;"
				);
				
				// set rating text - for SEO purposes - hidden by default
				$(template).find(bvObjectVariables["container"]["rating-star-text"]).andSelf().filter(bvObjectVariables["container"]["rating-star-text"]).text(rating + " stars");
			}
		});
	}).each(function(){
		// needed to trigger img load when cached by browser
		if (this.complete) {
			$(this).trigger('load');
		}
	});
}

function convertDecimalToPercentage (value) {
	return value.toFixed(2) * 100;
}

function returnFormParamaters (form, options) {
	var formData = $(form).serializeArray();
	var params = options;
	// add form data to params object
	if (formData != undefined) {
		$.each(formData, function(key) {
			params[this["name"]] = this["value"];
		});
	}
	// return updated parameters
	return params;
}

function returnTemplate (content, template) {
	// template to process
	var bvContent = content;
	var temp = $.parseHTML($(template).html());
	// find all images with data image urls
	$(temp).find("img[data-img-url]").andSelf().filter("img[data-img-url]").each(function() {
		// use Modernizr to check for svg support
		if(!Modernizr.svg){
			// image file name
			var img = $(this).attr("data-img-url");
			// split image name to get suffix
			img = img.split(".");
			// if image is svg
			if (img[1] == "svg") {
				// switch to png
				img = img[0] + ".png";
				$(this).attr("src", pathResource(img));
			} else {
				// use original image name
				$(this).attr("src", pathResource($(this).attr("data-img-url")));
			}
		} else {
			// use original image name
			$(this).attr("src", pathResource($(this).attr("data-img-url")));
		}
	});
	// inject bv content into template
	$.each($(temp).find("[data-bv-content]").andSelf().filter("[data-bv-content]"), function(key, value) {
		var content = eval("bvContent" + $(this).attr("data-bv-content"));
		if (content) {
			$(this).html(content);
		} else {
			// console.log(content);
		}
	});
	// inject bv properties into template
	$.each($(temp).find("[data-bv-property]").andSelf().filter("[data-bv-property]"), function(key, value) {
		var prop = eval("bvProperties" + $(this).attr("data-bv-property"));
		if (prop) {
			$(this).html(prop);
		} else {
			// console.log(prop);
		}
	});
	// return updated template
	return temp;
}

function consoleLogFallback (content) {
	if (!bvProduction) {
		var alertFallback = false;
		if (typeof console === "undefined" || typeof console.log === "undefined") {
			console = {};
			if (alertFallback) {
				console.log = function(content) {
					alert(content);
				};
			} else {
				console.log = function() {};
			}
		} else {
			console.log(content);
		}
	}
}


/***** ANIMATIONS *****/


function loadLoadingOverlay (container, template, scroll) {
	// set content
	var bvContent = {};
	// set template
	var $template = returnTemplate(bvContent, template);
	// add widget template
	$($template).appendTo(container);
	// set loading container height - this needs to be done to animate height once content is loaded
	$(container).css({"height":$(container).prop("scrollHeight")});
	// scroll to top of loading container
	if (scroll) {
		$('html, body').animate({
			scrollTop: $(container).offset().top
		}, defaultAnimationSpeed);
	}
}

function removeLoadingOverlay (container, template, scroll) {
	// animate height of loading container to fit content
	$(container).animate({"height":$(container).prop("scrollHeight")}, defaultAnimationSpeed, function() {
		// callback to remove inline height style from loading container in case a child element changes size
		$(container).css({"height":""});
	});
	// remove overlay template from loading container
	$(container).find(template).andSelf().filter(template).remove();
}

