$(document).ready(function(){

	
	$(".ga-form-checkbox").stf();
	
	//window.history.state
	$(".ga-main-menu-item").click(function(el) {
		url = $(this).attr("href");
		history.pushState({}, null, url)
		el.preventDefault(); 
	})	
	
	
	
	
	//// таймер слушает адресную строку	
	var GaLastURL;
	var GaURLbind = setInterval(function() {
		if (window.location.pathname != GaLastURL) {
			GaLastURL = window.location.pathname;
			GaAjax.preQuery(GaLastURL);
			if (GaLastURL != "/"){
				$("#ga-panel_back").addClass("active");
			}
			else{
				$("#ga-panel_back").removeClass("active");
			}
		}	  
	}, 50);

})


var ExStatus;
ExStatus = {
	loadimg : function(el){
		console.log("loadding ....");
		console.log(el);
		$(".load_site").css("display","block");
	},	
	loadimgClaer : function(el){
		
		console.log("loaded .");
		console.log(el);
		$(".load_site").css("display","none");
	}
}

var GaStructure
GaStructure = {
	loadedDate : function (url,data){
		$(".ga-scroll-wr").html("");
		$('.ga-scroll-content').animate({
			scrollTop: 0
		}, 100);
		console.log(data);
		
		///главная страница
		if (typeof(data) == "object" && url == "/"){
			$("#panel-title").html("Мой гараж")
			GaWindow.main(data,function(html){
				$(".ga-scroll-wr").html(html);
				GaAjax.stopHref()
			})
		}
		
		//списки
		if (typeof(data) == "object" && data.hasOwnProperty("LIST")){
			$("#panel-title").html("Выберите услугу")
			GaWindow.list(data.LIST,url,function(html){		
				$(".ga-scroll-wr").html(html);
				GaAjax.stopHref()
			})			
		}
		
		//блоки компаний
		if (typeof(data) == "object" && data.hasOwnProperty("LIST_BLOCK")){
			$("#panel-title").html("Выберите компанию")
			GaWindow.block_company(data.LIST_BLOCK,url,function(html){	
				$(".ga-scroll-wr").html(html);
				GaAjax.stopHref()
			})			
		}
		
		//Детально компания
		if (typeof(data) == "object" && data.hasOwnProperty("DETAIL")){			
			GaWindow.detail(data.DETAIL,url,function(html){		
				$("#panel-title").html(data.DETAIL.NAME)
				$(".ga-scroll-wr").html(html);
				$(".ga-form-checkbox").stf();
				$(".ga_phone").mask("+7(999)999-99-99");
				GaAjax.stopHref()
			})			
		}
		
		//заказы пользователя
		if (typeof(data) == "object" && data.hasOwnProperty("LIST_ORDER")){			
			GaWindow.order_list(data.LIST_ORDER,url,function(html){		
				$("#panel-title").html("Мои заказы")
				$(".ga-scroll-wr").html(html);
				GaAjax.stopHref()
			})			
		}
		
		// список авто
		if (typeof(data) == "object" && data.hasOwnProperty("LIST_AUTO")){
			$("#panel-title").html("Мои авто")
			GaWindow.list_auto(data.LIST_AUTO,url,function(html){		
				$(".ga-scroll-wr").html(html);
				GaAjax.stopHref()
			})			
		}
		
		//добавить авто
		if (typeof(data) == "object" && data.hasOwnProperty("CARS_ADD")){
			$("#panel-title").html("Добавить авто")
			GaWindow.cars_add(data.CARS_ADD,url,function(html){		
				$(".ga-scroll-wr").html(html);
				
				GaAjax.stopHref()
			})			
		}
		
		//Ответ
		if (typeof(data) == "object" && data.hasOwnProperty("NOT_QUERE")){
			$(".ga-scroll-wr").html("По данному запросу нет результата");
			GaAjax.stopHref()		
		}
		
		//ошибка
		if (typeof(data) == "object" && data.hasOwnProperty("statusText")){
			if (data.statusText == "error")
			{
				$(".ga-scroll-wr").html("Ошибка обновите страницу");
				GaAjax.stopHref()	
			}	
		}
		
	},
	loadedDateCars : function (id,data,window){
		///марка авто
		if (typeof(data) == "object" && data.hasOwnProperty("MARK_LIST")){
			GaWindow.cars_mark_list(id,data.MARK_LIST,function(html){		
				$("."+window).html(html);
			})			
		}		
		///модель авто
		if (typeof(data) == "object" && data.hasOwnProperty("MODEL_LIST")){
			GaWindow.cars_mark_list(id,data.MODEL_LIST,function(html){		
				$("."+window).html(html);
			})			
		}		
		///модель авто
		if (typeof(data) == "object" && data.hasOwnProperty("GENERATION_LIST")){
			GaWindow.cars_mark_list(id,data.GENERATION_LIST,function(html){		
				$("."+window).html(html);
			})			
		}		
		///серия авто
		if (typeof(data) == "object" && data.hasOwnProperty("SERIE_LIST")){
			GaWindow.cars_mark_list(id,data.SERIE_LIST,function(html){		
				$("."+window).html(html);
			})			
		}		
		///модификация авто
		if (typeof(data) == "object" && data.hasOwnProperty("MODIFICATION_LIST")){
			GaWindow.cars_mark_list(id,data.MODIFICATION_LIST,function(html){	
				$("."+window).html(html);
			})			
		}		
		//Ответ
		if (typeof(data) == "object" && data.hasOwnProperty("NOT_QUERE")){
			$("."+window).html("По данному запросу нет результата");		
		}
		//ошибка
		if (typeof(data) == "object" && data.hasOwnProperty("statusText")){
			if (data.statusText == "error")
			{
				$("."+window).html("Ошибка обновите страницу");
			}	
		}		
	}	
}

var GaConnect
GaConnect = {
	variab:{
		server: "http://192.168.0.77:6455/app",
		imgserver: "http://192.168.0.77:6455",
	}
}

var GaWindow;
GaWindow = {
	variab:{
		method: "ajax",
	},
	
	main : function (data,callback){
		
		html =		GaGUI.select_avto(data);
		html +=	    "<div class=\"ga-main-menu\">";
		html +=		GaGUI.menu("/repairs/", "Ремонт", "", "zap-to nothref");
		html +=		GaGUI.menu("/diagnostics/", "Диагностика авто", "", " nothref diagnostic");
		html +=		GaGUI.menu("/inspection/", "Запись на техосмотр", "", " nothref inspection");
		html +=		GaGUI.menu("/tire/", "Шиномонтаж", "", " nothref tire");
		html +=		GaGUI.menu("/reviews/", "Мои отзывы", "", " nothref myreview");
		html +=		GaGUI.menu("/order/", "Мои заказы", "", " nothref myorders");
		html +=		"</div>";
		
		if (typeof(callback) == "function")
			callback(html)
	},
	list : function (data,url,callback){	
		html = "";
		$.each(data,function(i, datael){
			html +=	GaGUI.menu_list(url+datael.ID+"/", datael.NAME, "", " nothref");
		})
		
		if (typeof(callback) == "function")
			callback(html)
	},
	list_auto : function (data,url,callback){	
		html = "";
		$.each(data,function(i, datael){
			html +=	GaGUI.menu_list_remove(url+datael.ID+"/", datael.NAME, "return GaCarEditing.Remove('"+datael.ID+"','"+datael.NAME+"')", "");
		})
		html +=	GaGUI.menu_list(url+"add_car/", "Добавить авто", "", " nothref");
		if (typeof(callback) == "function")
			callback(html)
	},
	block_company : function (data,url,callback){	
		html = "";
		$.each(data,function(i, datael){
			html +=	GaGUI.block_company(window.location.pathname+datael.ID+"/", datael.NAME, "",datael, " nothref");
		})
		
		if (typeof(callback) == "function")
			callback(html)
	},
	detail : function (data,url,callback){		
		html =	GaGUI.detail(data);
		
		if (typeof(callback) == "function")
			callback(html)
	},	
	order_list : function (data,url,callback){		
		html = "";
		$.each(data,function(i, datael){
			html +=	GaGUI.menu_list(url+datael.ID+"/", "Заявка №"+datael.ID+" от "+datael.DATE+", "+datael.SERVICE_NAME, " nothref");
		})

		if (typeof(callback) == "function")
			callback(html)
	},	
	cars_add : function (data,url,callback){		    
		html =	"<div class=\"ga-detail ga-shadow\">\n\
					<form id=\"add_dit_car_user\">\n\
					"+GaGUI.input_select("Марка", "ID_CAR_MARK", {}, "", "N",'GaCarEditing.loadMark')+"\n\
					"+GaGUI.input_select("Модель", "ID_CAR_MODEL", {}, "no-link-select", "N",'GaCarEditing.loadModel')+"\n\
					"+GaGUI.input_select("Поколение", "ID_CAR_GENERATION", {}, "no-link-select", "N",'GaCarEditing.loadGeneration')+"\n\
					"+GaGUI.input_select("Серия", "ID_CAR_SERIE", {}, "no-link-select", "N",'GaCarEditing.loadSerie')+"\n\
					"+GaGUI.input_select("Модификация", "ID_CAR_MODIFICATION", {}, "no-link-select", "N",'GaCarEditing.loadModification')+"\n\
					</form>\n\
					<div class=\"ga-detail-item\">\n\
						<a href=\"javascript:void(0)\" onclick=\"ExFormated.getModule('#add_dit_car_user','addCarUser','','','',true,'');\" class=\"ga-form-button\">Добавить</a>\n\
					</div>\n\
				</div>";
		
		 
		if (typeof(callback) == "function")
			callback(html)
	},
	cars_mark_list : function (id,data,callback){	
		
			html = "";
			$.each(data,function(i, data_el){	
				html += GaGUI.menu_list("/"+data_el.id+"/", data_el.name, "GaGUI.input_select_set(this,'"+id+"','"+data_el.name+"','"+data_el.id+"');return GaCarEditing.addEvent('"+id+"','"+data_el.id+"')","");
			})
		if (typeof(callback) == "function")
			callback(html)
	},
}

var GaGUI;
GaGUI = {
	select_avto : function (data){
		list_auto = "";
		main_auto = "Выберите авто";
		$.each(data,function(i, data_el){	
			if (data_el.DEF == "Y"){
				main_auto = data_el.NAME;	
			}
			
			list_auto += GaGUI.menu_list(data_el.ID, data_el.NAME, "GaGUI.input_select_set(this,'selectauto','"+data_el.NAME+"','"+data_el.ID+"');return GaPostAjax.setMainAuto('"+data_el.ID+"')","");
		})
		html =	"<div class=\"ga-auto-select ga-shadow\">\n\
					<a href=\"#\" class=\"ga-auto-select-avatar ga-shadow\"></a>\n\
					<div class=\"a-grid\">\n\
						<div class=\"a-box-md-4-1\"></div>\n\
						<div class=\"a-box-md-4-1\">\n\
							<div class=\"a-mr-10-10 a-text-left nowrap\">Мой авто</div>\n\
						</div>\n\
						<div class=\"a-box-md-2-1\">\n\
							<div class=\"a-mr-10-10 a-text-right\">\n\
								<a href=\"/car/\" onclick=\"\" class=\"a-edit nothref \">Изменить</a>\n\
							</div>\n\
						</div>\n\
					</div>\n\
					<div class=\"a-grid color-w\">\n\
						<div class=\"a-box-md-4-1\">\n\
						</div>\n\
						<div class=\"a-box-md-3-4\">\n\
							<div class=\"a-mr-10-10\">\n\
								<a href=\"javascript:void(0)\" onclick=\"ExModail.init('#modal-test')\" class=\"ga-form-select ga-glyp\" id=\"selectauto_a\">\n\
								"+main_auto+"</a>\n\
								<div id=\"modal-test\" class=\"ga-modal-hide\">\n\
									<div class=\"ga-list ga-shadow\">\n\
										"+list_auto+"\n\
									</div>\n\
								</div>\n\
							</div>\n\
						</div>\n\
					</div>\n\
				</div>";
		return html;
	},	
	menu : function (url, name, on_click, cl){
		btn = "<a href=\""+url+"\" "+((on_click != "") ? "onclick=\""+on_click+"\"" : "")+" class=\"ga-main-menu-item ga-glyp ga-shadow "+cl+"\">\n\t<span>"+name+"</span>\n</a>";
		return btn;
	},	
	menu_list : function (url, name, on_click, cl){
		btn = "<a href=\""+url+"\" "+((on_click != "") ? "onclick=\""+on_click+"\"" : "")+" class=\"ga-list-item ga-glyp "+cl+"\">\n\t<span>"+name+"</span>\n</a>";
		return btn;
	},		
	menu_list_remove : function (url, name, on_click, cl){
		btn = "<a href=\""+url+"\" "+((on_click != "") ? "onclick=\""+on_click+"\"" : "")+" class=\"ga-list-item-remove ga-glyp "+cl+"\">\n\t<span>"+name+"</span>\n</a>";
		return btn;
	},		
	block_company : function (url, name, on_click, obj, cl){
			btn  =	"<a href=\""+url+"\" "+((on_click != "") ? "onclick=\""+on_click+"\"" : "")+" class=\"ga-listblock-item ga-shadow "+cl+"\">\n\
						<div class=\"a-grid\">\n\
							<div class=\"a-box-md-3-1\">\n\
								<div class=\"ga-listblock-logo\" style=\"background-image:url("+GaConnect.variab.imgserver+obj.LOGO+")\"></div>\n\
							</div>\n\
							<div class=\"a-box-md-1-3\">\n\
								<div class=\"a-mr-5-0\">\n\
									<span class=\"ga-listblock-name\">\n\
										"+name+"\n\
									</span>\n\
								</div>\n\
								<div class=\"a-mr-5-0\">\n\
									<span class=\"ga-listblock-price\">"+obj.PRICE+"</span>\n\
								</div>\n\
								<div class=\"a-mr-5-0\">\n\
									<span class=\"ga-listblock-address\"><span class=\"glyphicon glyphicon-map-marker\"></span> "+obj.ADDRESS+"</span>\n\
								</div>\n\
								<div class=\"a-mr-5-0\">\n\
								"+GaGUI.rating_get(obj.rating,"")+"\n\
								</div>\n\
							</div>\n\
						</div>\n\
					</a>";
		
		return btn;
	},
	detail : function (obj){
		btn =	"<div class=\"ga-detail ga-shadow\">\n\
					<form role=\"form\" id=\"detail_company\">\n\
						<img class=\"ga-detail-logo\" src=\""+GaConnect.variab.imgserver+obj.LOGO+"\" alt=\"\" />\n\
						"+this.rating_get(obj.RATING,"a-text-center")+"\n\
						<div class=\"ga-detail-rating-text\">\n\
							"+obj.COUNT_REVIEW+" Отзывов\n\
						</div>\n\
						<div class=\"ga-detail-title\">\n\
							"+obj.NAME+"\n\
						</div>\n\
						<div class=\"ga-detail-price\">\n\
							"+obj.PRICE+"\n\
						</div>\n\
						<div class=\"ga-detail-address\">\n\
							<span class=\"glyphicon glyphicon-map-marker\"></span>\n\
							"+obj.ADDRESS+"\n\
						</div>\n\
						<div class=\"ga-title\">Контактная информация</div>\n\
						<div class=\"ga-hr\"></div>\n\
						"+GaGUI.input_text("Услуга", "SERVICE_NAME", obj.SERVICE_NAME, "", "N","Y")+"\n\
						"+GaGUI.input_hidden("ID", "ID", obj.ID, "", "N")+"\n\
						"+GaGUI.input_text("Имя", "NAME", "", "", "Y")+"\n\
						"+GaGUI.input_text("Телефон", "PHONE", "", "ga_phone", "Y")+"\n\
						"+GaGUI.input_select("Дата", "DATE", obj.DATE, "", "Y")+"\n\
						"+GaGUI.input_checkbox("Свои запчасти", "REPAIR", "", "", "N")+"\n\
						"+GaGUI.input_textarea("Комментарий", "COMMENT", "", "", "N")+"\n\
						<div class=\"ga-detail-item\">\n\
							<a href=\"javascript:void(0)\" onclick=\"ExFormated.getModule('#detail_company','addOrder','','','',true,'');\" class=\"ga-form-button\">Отправить заявку</a>\n\
						</div>\n\
						<div class=\"ga-title\">\n\
							Отзывы о компании\n\
						</div>\n\
						<div class=\"ga-hr\"></div>\n\
						<div class=\"review\">\n\
						"+GaGUI.review_item("54654","5675","5645",5)+"\n\
						"+GaGUI.review_item("765","567567","5464",5)+"\n\
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
					"+GaGUI.rating_get(rating,"")+"\n\
					<div class=\"review-desc\">\n\
						"+desc+"\n\
					</div>\n\
				</div>";
		return btn;  
	},
	input_text : function (name, name_id, val, cl, req, disabled){
		btn  =	"<div class=\"ga-detail-item\">\n\
					<label class=\"ga-form-label\" for=\""+name_id+"_input\">"+name+"</label>\n\
					<input type=\"text\" "+((disabled == "Y") ? ("disabled=\"disabled\" ") : "")+" c-data-needed=\""+((req == "Y") ? "1" : "0")+"\" c-data-name=\""+name+"\" name=\""+name_id+"\" class=\"ga-form-input "+cl+"\" id=\""+name_id+"_input\" value=\""+val+"\">\n\
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
		return false;
	},	
	input_select : function (name, name_id, valobj, cl, req, clickFunction){
		list = "";
		$.each(valobj,function(i, data){
			//console.log(data);		
			list += GaGUI.menu_list(data.value, data.name, "return GaGUI.input_select_set(this,'"+name_id+"','"+data.name+"','"+data.value+"')","");
		})
		btn =	"<div class=\"ga-detail-item\">\n\
					<label class=\"ga-form-label\" for=\"\">"+name+"</label>\n\
					<a href=\"javascript:void(0)\"  onclick=\"ExModail.init('#"+name_id+"_modal','',"+((clickFunction) ? ('function(){'+clickFunction+'(\''+name_id+'\',\'W_'+name_id+'\')}') : '\'\'') +")\" id=\""+name_id+"_a\" class=\"ga-form-select ga-glyp "+cl+"\">\n\
						Выберите из списка\n\
					</a>\n\
					<div id=\""+name_id+"_modal\" class=\"ga-modal-hide\">\n\
						<div class=\"ga-list ga-shadow W_"+name_id+"\">\n\
							"+list+"\n\
						</div>\n\
					</div>\n\
					<input type=\"hidden\" c-data-needed=\"0\" c-data-name=\""+name+"\" name=\""+name_id+"\" id=\""+name_id+"_input\" value=\"\">\n\
				</div>";
		return btn;
	},	
}

var GaCarEditing;
GaCarEditing = {
	variab : {
		"mark":"",
		"model":"",
		"generation":"",
		"serie":"",
		"modification":"",
	}, 
	Remove : function (id,name){
		deletee = confirm("Удалить авто "+name+"?");
		if (deletee == true){
			GaAjax.getModule("/auto/"+id+"/","DELETE",function(data){
				GaAjax.preQuery(window.location.pathname);
			},"");
		}
		return false;
	},
	addEvent : function (name,val){
	switch (name)
	{
		case "ID_CAR_MARK":
			GaCarEditing.variab.mark = val;
			$("#ID_CAR_MODEL_a,#ID_CAR_GENERATION_a,#ID_CAR_SERIE_a,#ID_CAR_MODIFICATION_a").text("Выберите из списка");
			$("#ID_CAR_MODEL_input,#ID_CAR_GENERATION_input,#ID_CAR_SERIE_input,#ID_CAR_MODIFICATION_input").val("Выберите из списка");
			$("#ID_CAR_GENERATION_a,#ID_CAR_SERIE_a,#ID_CAR_MODIFICATION_a").addClass("no-link-select");
			$("#ID_CAR_MODEL_a").removeClass("no-link-select");
		break;
		case "ID_CAR_MODEL":
			GaCarEditing.variab.model = val;
			$("#ID_CAR_GENERATION_a,#ID_CAR_SERIE_a,#ID_CAR_MODIFICATION_a").text("Выберите из списка");
			$("#ID_CAR_GENERATION_input,#ID_CAR_SERIE_input,#ID_CAR_MODIFICATION_input").val("Выберите из списка");
			$("#ID_CAR_SERIE_a,#ID_CAR_MODIFICATION_a").addClass("no-link-select");
			$("#ID_CAR_GENERATION_a").removeClass("no-link-select");
		break;
		case "ID_CAR_GENERATION":
			GaCarEditing.variab.generation = val;
			$("#ID_CAR_SERIE_a,#ID_CAR_MODIFICATION_a").text("Выберите из списка");
			$("#ID_CAR_SERIE_input,#ID_CAR_MODIFICATION_input").val("Выберите из списка");
			$("#ID_CAR_MODIFICATION_a").addClass("no-link-select");
			$("#ID_CAR_SERIE_a").removeClass("no-link-select");
		break;
		case "ID_CAR_SERIE":
			GaCarEditing.variab.serie = val;
			$("#ID_CAR_MODIFICATION_a").text("Выберите из списка");
			$("#ID_CAR_MODIFICATION_input").val("Выберите из списка");
			$("#ID_CAR_MODIFICATION_a").removeClass("no-link-select");
		break;
		case "ID_CAR_MODIFICATION":
			GaCarEditing.variab.modification = val;
		break;
	}
		return false;
	},
	loadMark : function (id,window){		
		GaAjax.getModule("/auto/","GET",function(data){
			GaStructure.loadedDateCars(id,data,window);
		},"");
	},	
	loadModel : function (id,window){		
		GaAjax.getModule("/auto/"+GaCarEditing.variab.mark+"/","GET",function(data){
			GaStructure.loadedDateCars(id,data,window);
		},"");
	},
	loadGeneration : function (id,window){		
		GaAjax.getModule("/auto/"+GaCarEditing.variab.mark+"/"+GaCarEditing.variab.model+"/","GET",function(data){
			GaStructure.loadedDateCars(id,data,window);
		},"");
	},	
	loadSerie : function (id,window){		
		GaAjax.getModule("/auto/"+GaCarEditing.variab.mark+"/"+GaCarEditing.variab.model+"/"+GaCarEditing.variab.generation+"/","GET",function(data){
			GaStructure.loadedDateCars(id,data,window);
		},"");
	},	
	loadModification : function (id,window){		
		GaAjax.getModule("/auto/"+GaCarEditing.variab.mark+"/"+GaCarEditing.variab.model+"/"+GaCarEditing.variab.generation+"/"+GaCarEditing.variab.serie+"/","GET",function(data){
			GaStructure.loadedDateCars(id,data,window);
		},"");
	},	
}
var GaAjax;
GaAjax = {

	getModule : function (url,method,callback,obj){
		ExStatus.loadimg(url);
		$.ajax({
			url: GaConnect.variab.server+url,
			type: method,
			data: obj,
			dataType: 'json',
		})
		.done(function(e){
			ExStatus.loadimgClaer(url);
			if (typeof(callback) == "function")
			{
				callback(e)
			}
		})
		.fail(function(e){
			ExStatus.loadimgClaer(url);
			if (typeof(callback) == "function")
			{
				callback(e)	
			}
		});
	},
	stopHref : function (){
		$(".nothref").click(function(el) {
			url = $(this).attr("href");
			history.pushState({}, '', url)
			//GaAjax.preQuery(url);
			el.preventDefault(); 
		})	 	
	},
	preQuery : function (url){
		//Главная страница
		if (url == "/"){
			GaAjax.getModule("/car_user/","GET",function(data){			
				GaStructure.loadedDate(url,data.LIST_AUTO);
			},"");			
		}
		
		//Ремонт авто
		if (url == "/repairs/"){
			GaAjax.getModule("/services/1/","GET",function(data){
				GaStructure.loadedDate(url,data);
			},"");
		}
		GaRest.Routing("/repairs/{%}/",function(data){
			url = "/repairs/";
			GaAjax.getModule("/services/"+data.REQUEST[2]+"/","GET",function(data){
				GaStructure.loadedDate(url,data);
			},"");
		})
		GaRest.Routing("/repairs/{%}/{%}/",function(data){
			url = "/repairs/";
			GaAjax.getModule("/services/"+data.REQUEST[2]+"/"+data.REQUEST[3]+"/","GET",function(data){
				GaStructure.loadedDate(url,data);
			},"");
		})
		
		//Диагностика авто
		if (url == "/diagnostics/"){
			GaAjax.getModule("/services/98/","GET",function(data){
				GaStructure.loadedDate(url,data);
			},"");
		}	
		GaRest.Routing("/diagnostics/{%}/",function(data){
			url = "/diagnostics/";
			GaAjax.getModule("/services/"+data.REQUEST[2]+"/","GET",function(data){
				GaStructure.loadedDate(url,data);
			},"");
		})	
		GaRest.Routing("/diagnostics/{%}/{%}/",function(data){
			url = "/diagnostics/";
			GaAjax.getModule("/services/"+data.REQUEST[2]+"/"+data.REQUEST[3]+"/","GET",function(data){
				GaStructure.loadedDate(url,data);
			},"");
		})		
		
		//Шиномантож
		if (url == "/tire/"){
			GaAjax.getModule("/services/51/","GET",function(data){
				GaStructure.loadedDate(url,data);
			},"");
		}
		GaRest.Routing("/tire/{%}/",function(data){
			url = "/tire/";
			GaAjax.getModule("/services/"+data.REQUEST[2]+"/","GET",function(data){
				GaStructure.loadedDate(url,data);
			},"");
		})			
		GaRest.Routing("/tire/{%}/{%}/",function(data){
			url = "/tire/";
			GaAjax.getModule("/services/"+data.REQUEST[2]+"/"+data.REQUEST[3]+"/","GET",function(data){
				GaStructure.loadedDate(url,data);
			},"");
		})	
		//запись на то
		if (url == "/inspection/"){
			GaAjax.getModule("/inspection/","GET",function(data){
				GaStructure.loadedDate(url,data);
			},"");
		}			
		//Авто пользователя
		if (url == "/car/"){
			GaAjax.getModule("/car_user/","GET",function(data){
				GaStructure.loadedDate(url,data);
			},"");
		}
		GaRest.Routing("/car/{%}/",function(data){
			url = "/car/";
			GaAjax.getModule("/car_user/"+data.REQUEST[2]+"/","GET",function(data){
				GaStructure.loadedDate(url,data);
			},"");
		})	
		//Отзывы
		if (url == "/reviews/"){
			GaAjax.getModule("/reviews/","GET",function(data){
				GaStructure.loadedDate(url,data);
			},"");
		}
		//заказы пользователя
		if (url == "/order/"){
			GaAjax.getModule("/order/","GET",function(data){
				GaStructure.loadedDate(url,data);
			},"");
		}
	},
}
var GaRest;
GaRest = {
	Routing : function (uri,callback){
		stop			= false;
		request			= window.location.pathname.split("/");
		call_request	= uri = uri.split("/");
		
		if (request.length == uri.length){
			
			$.each(request,function(key, request_uriEl){
				uri[key] = uri[key].replace("{%}",request_uriEl);
				
				if(request_uriEl != uri[key]) { 
					stop = true;
				}
			})
		}
		else{
			stop = true;
		}
		if(stop == false)
		{
			if (typeof(callback) == "function")
			{
				callback({REQUEST:request,CALL_REQUEST:call_request})	
			}
		}
	},
	noRouting : function (uri){
		request			= window.location.pathname.split("/");
		return {REQUEST:request};
	}
}
