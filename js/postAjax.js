var GaPostAjax;
GaPostAjax = {
	Output : function (module,objdata,objdataisname){
		switch (module)
		{
			case "addCarUser":
				GaAjax.getModule("/auto/","POST",function(data){
					window.history.go(-1);
				},objdata);	
			break;	
		
			case "addOrder":				
			console.log(objdata);
				GaAjax.getModule("/order/","POST",function(data){
						//window.history.go(-1);
				},objdata);	
			break;		
		}				
	},
	setMainAuto : function (value){
		GaAjax.getModule("/set_main_auto/","POST",function(data){

		},{ID:value});						
	}
}