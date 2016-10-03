var debagger = 1;
var bag;
bag = {
	i : function (varib,name){
		if (debagger == 1){
			console.info(varib+"\n",name);
		}
	}
}



var ExModail;
ExModail = {
	variab: {
		"overlay_zindex" : 99999,
		"popup_zindex" : 100000,
	},
	indexmodal: function (el){
		this.variab.overlay_zindex = this.variab.overlay_zindex + 3 ;
		this.variab.popup_zindex =  this.variab.overlay_zindex + 2;
		number_modal = Math.floor(Math.random() * 9999999999);
		this.variab[number_modal] = el;
	},
	init: function (el,paramEx){
		var param = $.extend({},paramEx);
		var modal_length = false;
		var modal_string = false;
		var idvalid = /^[#].+$/i;
		if (idvalid.test(el)){
			if ($(el).html().length > 0){
				modal_length = true;
			}
		}
		else{		
			if (el.length > 0){
				modal_length = true;
				modal_string = true;
			}
		}
		
		
		if (modal_length){			
			this.indexmodal(el);
			$("body").prepend(
				"<div style=\"z-index:" + this.variab.overlay_zindex + "\" c-data-id=\""+number_modal+"\" class=\"ga-overlay ga-transition\"></div>\n\
				<div c-data-id=\""+number_modal+"\" style=\"z-index:" + this.variab.popup_zindex + "\" class=\"ga-popup ga-transition\">\n\
				<div c-data-id=\""+number_modal+"\" class=\"ga-modail-head\"></div>\n\
				<div c-data-id=\""+number_modal+"\" class=\"ga-close_popup\">\n\
				<span class = \"glyphicon glyphicon-remove-circle\"></span></div></div>"
			);
	
			if (param.hasOwnProperty("style")){
				$('[c-data-id = ' + number_modal + '].ga-popup').css(param.style)
			}
			
			setTimeout(function(){
				$(".ga-overlay, .ga-popup").addClass("ga-show");
				$(".ga-popup").css("top",window.pageYOffset+30+"px")
			}, 100);
			
			if (modal_string == true){
				modail_html = el;
			}
			else{
				modail_html = $(el).html();
				$(el).empty();
			}
			
			var form = $('[c-data-id = ' + number_modal + '].ga-popup').prepend(modail_html);
			//$(".user_tel").mask("+7(999)999-99-99"); //////////////плохой вызов
			
			if (param.hasOwnProperty("tab")){
				form.find('[c-data-popup-tab]').addClass("ga-popup-tab").removeClass("ga-popup-tab-show");
				$('[c-data-popup-tab = ' + param.tab + ']').removeClass("ga-popup-tab").addClass("ga-popup-tab-show");
			}
			
			bag.i("init var number_modal: ",number_modal);
			form.find('.ga-close_popup').click(function(){
				var number = $(this).closest('.ga-popup').attr('c-data-id');
				ExModail.close(number);
			});
			
		}
		return number_modal;
	},
	tab: function (el,name){
		$(el).closest('.ga-popup').find('[c-data-popup-tab]').addClass("ga-popup-tab").removeClass("ga-popup-tab-show");
		$(el).closest('.ga-popup').find('[c-data-popup-tab = ' + name + ']').removeClass("ga-popup-tab").addClass("ga-popup-tab-show");
	},
	close: function (id){
		var idvalid = /^[#].+$/i;
		
		$('[c-data-id = ' + id + ']').removeClass("ga-show");
		if (idvalid.test(this.variab[id]))
		{
			modail_html = $('[c-data-id = ' + id + '].ga-popup').html();
			$(this.variab[id]).html(modail_html);
		}
		
		setTimeout(function(){
			$('[c-data-id = ' + id + ']').remove();
		}, 500);
	},
	ok: function (id){
		$('[c-data-id = ' + id + '].ga-popup input').each(function(){
			$(this).attr("value",$(this).val());
		})
		
		bag.i("ok var id: ",id);
		ExModail.close(id);
	}, 
	info: function (text,time){
		var number = this.init(text);
		
		setTimeout(function(){
			ExModail.close(number);
		}, time);
	}
	
	
}



var MainAjax;
MainAjax = {
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
	},
	returnToBlocks : function (){
		this.getModule(function(res) {
			var res = res.modules_return;
			MainAjax.returnData(res)
			return res;
		});
	},		
	returnOneToBlocks : function (query,returnblock){
		this.getModule(function(res){			
			if (returnblock)
			{	
				res = res.modules_return;
				MainAjax.returnData(res)
			}
			return res;
		},true,query)
	},
	getModule : function (callback,one_query,obj){
		if (one_query)
		{
			var variab = {
				method: "ajax",
				modules: obj
			};
		}
		else
		{
			var variab = this.variab;
		}  
		
		bag.i("MainAjax.getModule.variab ",variab);
		ExStatus.loadimg(variab);
		$.ajax({
			url: '/core/modules/main/admin/ajax/ajax_routing.php',
			type: "POST",
			data: variab,
			dataType: 'json',
		})
		.done(function(e){
			ExStatus.loadimgClaer(e);
			if (typeof(callback) == "function")
			{
				callback(e)
			}
		})
		.fail(function(e){
			ExStatus.loadimgClear(e);
			if (typeof(callback) == "function")
			{
				callback(e)	
			}
		});
	},
	returnData : function (res){
		bag.i("MainAjax.returnData.res ",res);
		$.each(res,function(i, data){
			
			if (data.hasOwnProperty("HTML")){
				$(data.RETURN_PARAMS.BLOCK_RETURN).html(data.HTML)
				
				eval(data.RETURN_PARAMS.CALL_BACK);
				
				
			}
			
			if (data.hasOwnProperty("ERROR")){
					bag.i("returnData var data.ERROR: ",data.ERROR);
					ExModail.info("<div class=\"ga-info_modal\"><h2>Ошибка</h2><br>"+data.ERROR+"</div>",3000);
			}	
			
			if (data.hasOwnProperty("DONE")){
					bag.i("returnData var data.ERROR: ",data.DONE);
					ExModail.info("<div class=\"ga-info_modal\"><h2>Информация</h2><br>"+data.DONE+"</div>",3000);
			}		
			
		})
		initFunction()
	},
	clearAll : function (){
		this.variab = {
			method: "ajax",
			modules: {}
		}
	}
}



var ExForm;
ExForm = {
	////проверка формы перед отправкой
	validform : function (form){
		
		var mailvalid= /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;	
		
		active_send = 1;
		form.find("[c-data-needed]").each(function(){
			var elForm = $(this);
			var dataneeded = elForm.attr("c-data-needed");
			var nameinput = elForm.attr("c-data-name");
			
			if (elForm.val().length < 1 && (dataneeded == 1))
			{
				elForm.attr("placeholder","Введите "+nameinput);
				elForm.closest(".form-group").addClass("has-error");
				active_send = 0;
			}
			else
			{
				if (elForm.attr("name") == "EMAIL" && (!mailvalid.test(elForm.val())) )
				{
						elForm.val("");
						elForm.attr("placeholder","Введите корректный "+nameinput+"");
						elForm.closest(".form-group").addClass("has-error");
						active_send = 0;
				}
				else
				{
					elForm.closest(".form-group").removeClass("has-error")
				}	
			}
		});
		
		$(".has-error").click(function(){
			$(this).closest(".form-group").removeClass("has-error");
		})
		
		return active_send;
	},
	///////перебор из полей формы
	getData: function(name, form) {
		
		var selector = "[name='" + name + "']";
		var count = $(form).find(selector).length;
		
		if(count === 1) {
			if ($(form).find(selector).prop("type") == "checkbox"){
				return $(form).find(selector).prop('checked');
			}
			else{
				return $(form).find(selector).val();
			}
		}
		
		var data = [];
		
		for(var i = 0; i < count; i++) {
			var el = $(form).find(selector).eq(i);
			
			if(!el.prop('checked')) {
				continue;
			}
			data.push(el.val());
		}
		return data;
	},
	///////создает обект  из подготовленых полей формы
	serializeForm : function (form,callback){
		if (typeof(form) == "object")
			form = $(form).closest("form");
		else
			form = $(form);
		
		
		if (this.validform(form) == 1)
		{
			var objforsend = {};
			var objforsendandname = {};
			form.find("[name]").each(function(){
				var name, name_fild, value;
				
				bag.i("ExForm.serializeForm var name element form " + $(this).attr("name"), $(this).val())	
				
				
				name = $(this).attr("name");

				name_fild = $(this).attr("c-data-name");
				
				value = ExForm.getData($(this).attr('name'), form);
				
				objforsend[name] = value;
				objforsendandname[name] = {
					"NAME":name,
					"NAME_FILD":name_fild,
					"VALUE": value
				}
			})
				
			if (typeof(callback) == "function")
			{
				callback(objforsend,objforsendandname);
			}
			
		}
	}
}

var ExFormated;
ExFormated = {
	getModule : function (el,module,act,type,block,clear_form,call_back){
		ExForm.serializeForm(el,function(objforsend,objforsendandname){
			
			if (!clear_form)
				clear_form = "";
			
			bag.i("ExFormated.getModule.el ",el);
			bag.i("ExFormated.getModule.objforsendandname ",objforsendandname);
			

			if (typeof(el) == "object")
			{
				el = "";
			}
			
			var res;
			if (type == "c-data-name")
			{
				var query = {};
				query[module] = {
					"ACTION" : act,
					"BLOCK_RETURN" : block,
					"CALL_BACK" : call_back,
					"ELEMENT": el,
					"CLEAR_FORM": clear_form,
					"FILDS" : objforsendandname
				}
				MainAjax.returnOneToBlocks(query,true)		
				
			}
			else
			{
				var query = {};
				query[module] = {
					"ACTION" : act,
					"BLOCK_RETURN" : block,
					"CALL_BACK" : call_back,
					"ELEMENT": el,
					"CLEAR_FORM": clear_form,
					"FILDS" : objforsend
				}
				MainAjax.returnOneToBlocks(query,true)

			}
			bag.i("ExFormated.getModule.res ", res);
		})
	}
}




