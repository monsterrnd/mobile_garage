$(document).ready(function(){

	$(".ga_phone").mask("+7(999)999-99-99");
	$(".ga-form-checkbox").stf();
	
	
	$(".ga-main-menu-item").click(function(el) {
		url = $(this).attr("href");
		history.pushState({url: url}, 'Title', url)
		el.preventDefault(); 
	})	
	
	//tester ("");
	
//	window.onbeforeunload = function (evt) {
//		var message = "Document 'foo' is not saved. You will lost the changes if you leave the page.";
//		if (typeof evt == "undefined") {
//			evt = window.event;
//		}
//		if (evt) {
//			evt.returnValue = message;
//		}
//		return message;
//	}	
	
})



//function tester (id){
//	$.ajax({
//	url: 'http://192.168.0.77:6455/app/services/'+id+"/",
//	type: "GET",
//	data: {},
//	dataType: 'json',
//	})
//	.done(function(e){
//		$( ".ttttt" ).html("");
//		//history.pushState({foo: 'bar'}, 'Title', id+'/')
//		
//		$.each(e[0],function(i, data){
//			//console.log(data);
//			$( ".ttttt" ).append("<a class=\"ga-list-item\" href=\"javascript:void(0);\" onclick=\"tester("+data.ID+")\"><span>"+data.NAME+"</span></a>");
//		})
//		//console.log(e);	
//	})
//	.fail(function(e){
//		//console.log(e);	
//	});
//}
//
//

var GaWindow;

GaWindow = {
	variab:{
		method: "ajax",
	},
	initQuery : function (obj){

	}	
}

var GaGUI;
GaGUI = {
	menu : function (url, name, cl){
		btn = "<a href=\""+url+"\" class=\"ga-main-menu-item ga-glyp ga-shadow "+cl+"\">\n\t<span>"+name+"</span>\n</a>";
		return btn;
	},	
	menu_list : function (url, name, cl){
		btn = "<a href=\""+url+"\" class=\"ga-list-item ga-glyp "+cl+"\">\n\t<span>"+name+"</span>\n</a>";
		
		return btn;
	},		
	block_company : function (url, name, obj, cl){
			btn  =	"<a href=\""+url+"\" class=\"ga-listblock-item ga-shadow "+cl+"\">\n\
						<div class=\"a-grid\">\n\
							<div class=\"a-box-md-3-1\">\n\
								<div class=\"ga-listblock-logo\" style=\"background-image:url("+obj.img+")\"></div>\n\
							</div>\n\
							<div class=\"a-box-md-1-3\">\n\
								<div class=\"a-mr-5-0\">\n\
									<span class=\"ga-listblock-name\">\n\
										"+name+"\n\
									</span>\n\
								</div>\n\
								<div class=\"a-mr-5-0\">\n\
									<span class=\"ga-listblock-price\">"+obj.price+"</span>\n\
								</div>\n\
								<div class=\"a-mr-5-0\">\n\
									<span class=\"ga-listblock-address\"><span class=\"glyphicon glyphicon-map-marker\"><span> "+obj.addres+"</span>\n\
								</div>\n\
								<div class=\"a-mr-5-0\">\n\
								"+this.rating_get(obj.rating,"")+"\n\
								</div>\n\
							</div>\n\
						</div>\n\
					</a>";
		
		return btn;
	},
	detail : function (url, name, cl){
		
		
		return btn;
	},
	rating_get : function (count, cl){
		el = "";
		for (var i = 1; i <= 5; i++) {
			el += "\t<span class=\"glyphicon glyphicon-star "+((count < i) ? "nn" : "")+"\"></span>\n"	
		}
		btn = 	"<div class=\"ga-rating "+cl+"\">\n"+el+"</div>";
		return btn;
	},
	review_item : function (name, date, desc, rating){	
		btn  =	"<div class=\"review-item\">\n\
					<div class=\"review-date\">\n\
						"+date+"\n\
					</div>\n\
					<div class=\"review-name\">\n\
						"+name+"\n\
					</div>\n\
					"+this.rating_get(rating,"")+"\n\
					<div class=\"review-desc\">\n\
						"+desc+"\n\
					</div>\n\
				</div>";
		return btn;
	},
}

var GaAjax;
GaAjax = {
	variab:{
		method: "ajax",
		modules: {}
	},
	
	initQuery : function (obj,callback){
		////////добавляем к существующим модулям
		this.variab.modules = $.extend(this.variab.modules,obj);
		
		if (typeof(callback) == "function")
		{
			callback(true);	
		}
	}
}