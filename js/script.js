$(document).ready(function(){

	$(".ga_phone").mask("+7(999)999-99-99");
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
		}	  
	}, 50);


//	window.addEventListener('popstate', function(e){
//		console.log(e);
//	}, false);
//	
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
		console.log(data);
		///главная страница
		if (typeof(data) != "object" && data == "/"){
			GaWindow.main(function(html){
				$(".ga-scroll-wr").html(html);
				GaAjax.stopHref()
			})
		}
		//списки
		if (typeof(data) == "object" && data.hasOwnProperty("LIST")){
			GaWindow.list(data.LIST,url,function(html){		
				$(".ga-scroll-wr").html(html);
				GaAjax.stopHref()
			})			
		}
		//блоки компаний
		if (typeof(data) == "object" && data.hasOwnProperty("LIST_BLOCK")){
			GaWindow.block_company(data.LIST_BLOCK,url,function(html){		
				$(".ga-scroll-wr").html(html);
				GaAjax.stopHref()
			})			
		}
		//Детально компания
		if (typeof(data) == "object" && data.hasOwnProperty("DETAIL")){
			GaWindow.detail(data.DETAIL,url,function(html){		
				$(".ga-scroll-wr").html(html);
				GaAjax.stopHref()
			})			
		}
		//Редактирование авто
		if (typeof(data) == "object" && data.hasOwnProperty("CARS_ADD")){
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
	}
}

var GaWindow;
GaWindow = {
	variab:{
		method: "ajax",
	},
	
	main : function (callback){
		
		html =		GaGUI.select_avto();
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
	cars_add : function (data,url,callback){		    
		html =	"<div class=\"ga-detail ga-shadow\">\n\
					"+GaGUI.input_select("Марка", "ID_CAR_MARK", {}, "", "N",'GaCarEditing.loadMark')+"\n\
					"+GaGUI.input_select("Модель", "ID_CAR_MODEL", {}, "", "N",'GaCarEditing.loadModel')+"\n\
					"+GaGUI.input_select("Поколение", "ID_CAR_GENERATION", {}, "", "N",'GaCarEditing.loadAuto')+"\n\
					"+GaGUI.input_select("Серия", "ID_CAR_SERIE", {}, "", "N",'GaCarEditing.loadAuto')+"\n\
					"+GaGUI.input_select("Модификация", "ID_CAR_MODIFICATION", {}, "", "N",'GaCarEditing.loadAuto')+"\n\
					<div class=\"ga-detail-item\">\n\
						<a href=\"javascript:void(0)\" onclick=\"ExFormated.getModule('#detail_company','detail_company','','','',true,'');\" class=\"ga-form-button\">Добавить</a>\n\
					</div>\n\
				</div>";
		
		 
		if (typeof(callback) == "function")
			callback(html)
	},
	cars_mark_list : function (id,data,callback){	
		
			html = "";
			$.each(data,function(i, data_el){	
				html += GaGUI.menu_list("javasctipt:void(0)", data_el.name, "GaGUI.input_select_set(this,'"+id+"','"+data_el.name+"','"+data_el.id+"')","");
			})
		if (typeof(callback) == "function")
			callback(html)
	},
}

var GaGUI;
GaGUI = {
	select_avto : function (){
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
								<a href=\"javascript:void(0)\" onclick=\"ExModail.init('#modal-test')\" class=\"ga-form-select ga-glyp\"> BMW,X6, 124 лс</a>\n\
								<div id=\"modal-test\" class=\"ga-modal-hide\">\n\
									<div class=\"ga-list ga-shadow\">\n\
										<a href=\"#\" class=\"ga-list-item ga-glyp \">\n\
											<span>BMW,X1, 124 лс</span>\n\
										</a>\n\
										<a href=\"#\" class=\"ga-list-item ga-glyp \">\n\
											<span>BMW,X3, 151 лс</span>\n\
										</a>\n\
										<a href=\"#\" class=\"ga-list-item ga-glyp \">\n\
											<span>BMW,X5, 180 лс</span>\n\
										</a>\n\
										<a href=\"#\" class=\"ga-list-item ga-glyp \">\n\
											<span>BMW,X6, 220 лс</span>\n\
										</a>\n\
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
	block_company : function (url, name, on_click, obj, cl){
			btn  =	"<a href=\""+url+"\" "+((on_click != "") ? "onclick=\""+on_click+"\"" : "")+" class=\"ga-listblock-item ga-shadow "+cl+"\">\n\
						<div class=\"a-grid\">\n\
							<div class=\"a-box-md-3-1\">\n\
								<div class=\"ga-listblock-logo\" style=\"background-image:url("+obj.IMG+")\"></div>\n\
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
						<img class=\"ga-detail-logo\" src=\""+obj.IMG+"\" alt=\"\" />\n\
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
						"+GaGUI.input_text("Услуга", "SERVICE_NAME", "", "", "N")+"\n\
						"+GaGUI.input_text("Имя", "NAME", "", "", "Y")+"\n\
						"+GaGUI.input_text("Телефон", "PHONE", "", "", "Y")+"\n\
						"+GaGUI.input_select("Дата", "DATE", {1:{name:"один",value:"1"},2:{name:"два",value:"2"},3:{name:"три",value:"3"}}, "", "Y")+"\n\
						"+GaGUI.input_checkbox("Свои запчасти", "REPAIR", "", "", "N")+"\n\
						"+GaGUI.input_textarea("Комментарий", "COMMENT", "", "", "N")+"\n\
						<div class=\"ga-detail-item\">\n\
							<a href=\"javascript:void(0)\" onclick=\"ExFormated.getModule('#detail_company','detail_company','','','',true,'');\" class=\"ga-form-button\">Отправить заявку</a>\n\
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
	input_select : function (name, name_id, valobj, cl, req, clickFunction){
		list = "";
		$.each(valobj,function(i, data){
			//console.log(data);		
			list += GaGUI.menu_list("javasctipt:void(0)", data.name, "GaGUI.input_select_set(this,'"+name_id+"','"+data.name+"','"+data.value+"')","");
		})
		btn =	"<div class=\"ga-detail-item\">\n\
					<label class=\"ga-form-label\" for=\"\">"+name+"</label>\n\
					<a href=\"javascript:void(0)\" onclick=\"ExModail.init('#"+name_id+"_modal','',"+((clickFunction) ? ('function(){'+clickFunction+'(\''+name_id+'\',\'W_'+name_id+'\')}') : '\'\'') +")\" id=\""+name_id+"_a\" class=\"ga-form-select ga-glyp\">\n\
						Выберите из списка\n\
					</a>\n\
					<div id=\""+name_id+"_modal\" class=\"ga-modal-hide\">\n\
						<div class=\"ga-list ga-shadow W_"+name_id+"\">\n\
							"+list+"\n\
						</div>\n\
					</div>\n\
					<input type=\"hidden\" c-data-needed=\"0\" c-data-name=\""+name+"\" name=\""+name_id+"\" class=\""+cl+"\" id=\""+name_id+"_input\" value=\"\">\n\
				</div>";
		return btn;
	},	
}

var GaCarEditing;
GaCarEditing = {
	loadMark : function (id,window){		
		GaAjax.getModule("/auto/","GET",function(data){
			GaStructure.loadedDateCars(id,data,window);
		},"");
	},	
	loadModel : function (id,window){		
		GaAjax.getModule("/auto/2/","GET",function(data){
			GaStructure.loadedDateCars(id,data,window);
		},"");
	},
	loadGeneration : function (id,window){		
		GaAjax.getModule("/auto/2/6/","GET",function(data){
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
			GaStructure.loadedDate(url,url);
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
	}
}
