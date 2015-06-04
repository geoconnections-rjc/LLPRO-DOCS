if (typeof(LL_PRO) == "undefined"){
	LL_PRO = {};
}

if (typeof(LL_PRO.validation) == "undefined"){
	LL_PRO.validation = {'pulse':null};
}

LL_PRO.listeners = {
	'hide_messages': function(type){
		
		var success_timeout = setTimeout(function(){fade_messages('success')},7500),
			info_timeout = setTimeout(function(){fade_messages('info')},15000),
			warning_timeout = setTimeout(function(){fade_messages('warning')},30000);
		
		function fade_messages(msg_type){
			clearInterval(LL_PRO.validation.pulse[msg_type]);

			$('#page_header').removeClass(msg_type);
			$('#messages #'+msg_type).slideUp(1000, 'easeOutExpo');
		}
		
		$('.hide_message').unbind('click').bind('click', function(){
			if($(this).parent().parent().children(':visible').length <=1){
				$(this).parent().parent().slideUp(1000, 'easeOutExpo');
				clearInterval(LL_PRO.validation.pulse[type]);
			}
			else{
				$(this).parent().slideUp(1000, 'easeOutExpo');
				clearInterval(LL_PRO.validation.pulse[type]);
			}
			$('#page_header').removeClass(type);
		})
	}
}