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
	backclose: function (el){
		modalHash = document.location.hash;
		var OpenModal = setInterval(function() {
			if (document.location.hash != modalHash) {
				modalHash = document.location.hash;	
				ExModail.close(el,true);			
				clearTimeout(OpenModal);
			}	  
		}, 50);
	},
	
	init: function (el,paramEx,callback){
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
			document.location.hash = 'w_'+number_modal
			this.backclose(number_modal);
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
		if (typeof(callback) == "function")
		{
			callback()
		}
		return number_modal;
	},
	tab: function (el,name){
		$(el).closest('.ga-popup').find('[c-data-popup-tab]').addClass("ga-popup-tab").removeClass("ga-popup-tab-show");
		$(el).closest('.ga-popup').find('[c-data-popup-tab = ' + name + ']').removeClass("ga-popup-tab").addClass("ga-popup-tab-show");
	},
	close: function (id,not_back){
		var idvalid = /^[#].+$/i;
		
		$('[c-data-id = ' + id + ']').removeClass("ga-show");
		if (idvalid.test(this.variab[id]))
		{
			modail_html = $('[c-data-id = ' + id + '].ga-popup').html();
			$(this.variab[id]).html(modail_html);
		}

		if (not_back != true){
			window.history.go(-1);
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
				elForm.addClass("has-error");
				active_send = 0;
			}
			else
			{
				if (elForm.attr("name") == "EMAIL" && (!mailvalid.test(elForm.val())) )
				{
						elForm.val("");
						elForm.attr("placeholder","Введите корректный "+nameinput+"");
						elForm.closest(".form-group").addClass("has-error");
						elForm.addClass("bxmag-fild-needed");
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
		if (active_send == 0){
			$('.ga-scroll-content').animate({
				scrollTop: ($(".has-error").eq(0).position().top)-40
			}, 100);
		}
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
			GaPostAjax.Output(module,objforsend,objforsendandname);
			///Добавить авто
			//GaAjax.getModule("/auto/","POST",function(data){
			//	window.history.go(-1);
			//},objforsend);
		})
	}
}




