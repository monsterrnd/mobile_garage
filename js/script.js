$(document).ready(function(){

	$(".ga_phone").mask("+7(999)999-99-99");
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
