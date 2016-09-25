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
	menu : function (url, name, on_click, cl){
		btn = "<a href=\""+url+"\" "+((on_click != "") ? "onclick="+on_click+"" : "")+" class=\"ga-main-menu-item ga-glyp ga-shadow "+cl+"\">\n\t<span>"+name+"</span>\n</a>";
		return btn;
	},	
	menu_list : function (url, name, on_click, cl){
		btn = "<a href=\""+url+"\" "+((on_click != "") ? "onclick="+on_click+"" : "")+" class=\"ga-list-item ga-glyp "+cl+"\">\n\t<span>"+name+"</span>\n</a>";
		return btn;
	},		
	block_company : function (url, name, on_click, obj, cl){
			btn  =	"<a href=\""+url+"\" "+((on_click != "") ? "onclick="+on_click+"" : "")+" class=\"ga-listblock-item ga-shadow "+cl+"\">\n\
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
	detail : function (obj){
		btn =	"<div class=\"ga-detail ga-shadow\">\n\
					<form role=\"form\" id=\"detail_company\">\n\
						<img class=\"ga-detail-logo\" src=\""+obj.img+"\" alt=\"\" />\n\
						"+this.rating_get(obj.rating,"a-text-center")+"\n\
						<div class=\"ga-detail-rating-text\">\n\
							"+obj.cont_review+"\n\
						</div>\n\
						<div class=\"ga-detail-title\">\n\
							"+obj.name+"\n\
						</div>\n\
						<div class=\"ga-detail-price\">\n\
							"+obj.price+"\n\
						</div>\n\
						<div class=\"ga-detail-address\">\n\
							<span class=\"glyphicon glyphicon-map-marker\"></span>\n\
							"+obj.addres+"\n\
						</div>\n\
						<div class=\"ga-title\">Контактная информация</div>\n\
						<div class=\"ga-hr\"></div>\n\
						"+this.input_text("Услуга", "SERVICE_NAME", "", "", "N")+"\n\
						"+this.input_text("Имя", "NAME", "", "", "N")+"\n\
						"+this.input_text("Телефон", "PHONE", "", "", "N")+"\n\
						"+this.input_select("Дата", "DATE", {1:{name:"один",value:"1"},2:{name:"два",value:"2"},3:{name:"три",value:"3"}}, "", "N")+"\n\
						"+this.input_checkbox("Свои запчасти", "REPAIR", "", "", "N")+"\n\
						"+this.input_textarea("Комментарий", "COMMENT", "", "", "N")+"\n\
						<div class=\"ga-detail-item\">\n\
							<a href=\"javascript:void(0)\" onclick=\"ExFormated.getModule('#detail_company','detail_company','','','',true,'');\" class=\"ga-form-button\">Отправить заявку</a>\n\
						</div>\n\
						<div class=\"ga-title\">\n\
							Отзывы о компании\n\
						</div>\n\
						<div class=\"ga-hr\"></div>\n\
						<div class=\"review\">\n\
						"+this.review_item("54654","5675","5645",5)+"\n\
						"+this.review_item("765","567567","5464",5)+"\n\
						</div>\n\
					</form>\n\
				</div>";		
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
	input_text : function (name, name_id, val, cl, req){
		btn  =	"<div class=\"ga-detail-item\">\n\
					<label class=\"ga-form-label\" for=\""+name_id+"_input\">"+name+"</label>\n\
					<input type=\"text\" c-data-needed=\""+((req == "Y") ? "1" : "0")+"\" c-data-name=\""+name+"\" name=\""+name_id+"\" class=\"ga-form-input "+cl+"\" id=\""+name_id+"_input\" value=\""+val+"\">\n\
				</div>";
		return btn;
	},	
	input_hidden : function (name, name_id, val, cl, req){
		btn  =	"<input type=\"hidden\" c-data-needed=\"0\" c-data-name=\""+name+"\" name=\""+name_id+"\" class=\""+cl+"\" id=\""+name_id+"_input\" value=\""+val+"\">";
		return btn;
	},	
	input_textarea : function (name, name_id, val, cl, req){
		btn  =	"<div class=\"ga-detail-item\">\n\
					<label class=\"ga-form-label\" for=\""+name_id+"_input\">"+name+"</label>\n\
					<textarea c-data-needed=\""+((req == "Y") ? "1" : "0")+"\" c-data-name=\""+name+"\" name=\""+name_id+"\" class=\"ga-form-textarea "+cl+"\" id=\""+name_id+"_input\" rows=\"4\">"+val+"</textarea>\n\
				</div>";
		return btn;
	},	
	input_checkbox : function (name, name_id, val, cl, req){
		btn  =	"<div class=\"ga-detail-item\">\n\
					<input type=\"checkbox\" "+((val == "Y") ? ("checked=\"checked\" ") : "")+" c-data-needed=\""+((req == "Y") ? "1" : "0")+"\" c-data-name=\""+name+"\" name=\""+name_id+"\" class=\"ga-form-checkbox "+cl+"\" id=\""+name_id+"_input\" >\n\
				</div>";
		return btn;
	},	
	input_select_set : function (el, name_id, name, value){
		$("#"+name_id+"_input").val(value);
		$("#"+name_id+"_a").html(name);
		modal_number = $(el).closest(".ga-popup").attr("c-data-id");
		ExModail.close(modal_number);
	},	
	input_select : function (name, name_id, valobj, cl, req){
		list = "";
		$.each(valobj,function(i, data){
			//console.log(data);		
			list += GaGUI.menu_list("javasctipt:void(0)", data.name, "GaGUI.input_select_set(this,'"+name_id+"','"+data.name+"','"+data.value+"')","");
		})
		btn =	"<div class=\"ga-detail-item\">\n\
					<label class=\"ga-form-label\" for=\"\">"+name+"</label>\n\
					<a href=\"javascript:void(0)\" onclick=\"ExModail.init('#"+name_id+"_modal')\" id=\""+name_id+"_a\" class=\"ga-form-select ga-glyp\">\n\
						Выберите из списка\n\
					</a>\n\
					<div id=\""+name_id+"_modal\" class=\"ga-modal-hide\">\n\
						<div class=\"ga-list ga-shadow\">\n\
							"+list+"\n\
						</div>\n\
					</div>\n\
					<input type=\"hidden\" c-data-needed=\"0\" c-data-name=\""+name+"\" name=\""+name_id+"\" class=\""+cl+"\" id=\""+name_id+"_input\" value=\"\">\n\
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