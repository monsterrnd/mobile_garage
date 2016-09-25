;(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
}(function($) {
	$.fn.extend({
        stf: function() {
			$.each($(this), function(key, el) {
				checked = $(el).prop('checked')
				name = $(el).attr('c-data-name')
				el_style= $(el).wrap("<div class=\"ga-form-checkbox-style ga-glyp "+((checked)? "checked":"")+"\">"+name+"</div>");
            })
			$.each($(".ga-form-checkbox-style"), function(key, el) {
				$(el).click(function() {
					checkbox = $(this).find(".ga-form-checkbox");
					if (checkbox.is(':checked')) {
						checkbox.prop('checked', false);
						$(this).removeClass('checked');
					} else {
						checkbox.prop('checked', true);
						$(this).addClass('checked');
					}
				})	
			})
        }        
    });
}));