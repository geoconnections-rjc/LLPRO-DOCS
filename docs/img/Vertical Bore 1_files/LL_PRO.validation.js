if (typeof(LL_PRO) == "undefined"){
	LL_PRO = {};
	$.fn.exists = function(){return this.length > 0 ? this : false;}
}

// ================================================================================
// Accepts a form. Iterates through all inputs, selections, radios and checkboxes
// Confirms if they have data and whether or not the data is valid for the specific field.
// Returns True or False
// Used to control whether or not AJAX is sent to server.
// is_new stops the flags from popping up on the fields

LL_PRO.validation = {
	'get_val': function(field_name){
		var val = $('#id_'+field_name).val();
		if (isNaN(val)){
			val = $('#id_'+field_name+' option:selected').val();
		}
		if (!val || isNaN(val)){
			val = $('input[name='+field_name+']:checked').val();
		}
		
		return val
		},
	'get_label_html':function(field_name){
		var label = $('#label_id_'+field_name).html();
		
		if (!label || label == ''){
			label = $('label [for='+field_name+']').html()
		};
		
		if (!label || label == ''){
			LL_PRO.validation.get_val(field_name)
		};
		
		return label
	},
	'pulse':{'warning':false,'error':false,'info':false,'success':false},
	'pulse_header':function(type){
			$("#page_header").toggleClass(type);
		},
	'last_vals':{},
	'field_validators':{
			// ================================================================================
			// This is a collection of field validations that will just return true/false
			// display issues and what to do with result are handled by the
			// generic flagger function or by the caller if not part of validation.
			is_even:function(val){return !(val % 2)},
			is_multiple:function(val,base){return !(val % base)},
			non_zero:function(val){return !(val == 0)},
			non_negative:function(val){return (val >= 0)},
			gt:function(val,comp){return (val>comp)},
			lt:function(val,comp){return (val<comp)},
			gte:function(val,comp){return (val>=comp)},
			lte:function(val,comp){return (val<=comp)},
			},
	'flag_descriptions':{
		/* These values are maintained outside of the validators
		 * to allow access to the flag_descrpition and flag functions
		 * without directly using the validate function.
		*/
			required:function(){return ('This value is required.')},
			is_even:function(val){return ('Ensure this value is even.')},
			is_multiple:function(val,base){return ('Ensure this value is a multiple of '+ base+'.')},
			non_zero:function(val){return ('This value cannot equal 0.')},
			non_negative:function(val){return ('Ensure this value is greater than or equal to zero.')},
			gt:function(val,comp){return ('Ensure this value is greater than '+ comp+'.')},
			lt:function(val,comp){return ('Ensure this value is less than '+ comp+'.')},
			gte:function(val,comp){return ('Ensure this value is greater than or equal to '+ comp+'.')},
			lte:function(val,comp){return ('Ensure this value is less than or equal to  '+ comp+'.')},
			},
	'validate':function(form,jQ_validators){
		
		var field, field_name, has_vldtrs, field_val, field_req, is_bad, bad_val_idx, fail_count=0, form_fail=0;
		var inputs = $(form).find(':input');
		var num_check_fields = Object.keys(jQ_validators).length;
		var last_vals = LL_PRO.validation.last_vals;
		
		inputs.each(function(){
			field = $(this);
			field_name = field.attr('name');
			has_vldtrs = jQ_validators[field_name] && jQ_validators[field_name] != undefined;
			field_val = parseFloat(field.val());
			field_req = field.attr('field_req');

			if(!last_vals[field_name]){
				fail_count = 0;
				last_vals[field_name]={};
				last_vals[field_name].field_val = field_val;
				last_vals[field_name].is_bad = field_val == null ? false : true;
				good_val = false;	
			}else{
				good_val = last_vals[field_name].field_val == field_val && !last_vals[field_name].is_bad;
			}
			
			last_vals[field_name].flags = [];
			if (has_vldtrs && isNaN(field_val)){
				fail_count = 1;
				description = LL_PRO.validation['flag_descriptions']['required'];
				last_vals[field_name].flags=[{type:'error',
												 description:description.apply(null)}];
			}else if(has_vldtrs && !good_val){
				
				var vldtrs = jQ_validators[field_name].validators;

				for(var key in jQ_validators[field_name]){
					var comp = jQ_validators[field_name][key],
						desc_comp = comp,
						vldtr = LL_PRO.validation['field_validators'][key];
						
					if (isNaN(comp)){
						switch (comp['operation']){
							case 'divide':
								// always assumes operands in the form [numerator,denominator]
								
								var numerator = LL_PRO.validation.get_val(comp['operands'][0]),
									denominator = LL_PRO.validation.get_val(comp['operands'][1]);
								desc_comp = LL_PRO.validation.get_label_html(comp['operands'][0])+'/'+LL_PRO.validation.get_label_html(comp['operands'][1])
								comp = (numerator/denominator).toFixed(2)
								
								break;
							case 'multiply':
								var product = 1;
								desc_comp = LL_PRO.validation.get_label_html(comp['operands'][0]);
								
								for (var k in comp['operands']){
									product = product * LL_PRO.validation.get_val(comp['operands'][k]);
									
									if(k >0){
										desc_comp += ' * ' + LL_PRO.validation.get_label_html(comp['operands'][k]);
									}
								}
								comp = product
								break;
							case 'add':
								var sum = 0;
								
								for (var k in comp['operands']){
									sum += LL_PRO.validation.get_val(comp['operands'][k]);
								}
								comp = sum
								break;
							case 'subtract':
								var diff = LL_PRO.validation.get_val(comp['operands'][0]);
								
								for (var k in comp['operands']){
									if(k >0){
										diff -= LL_PRO.validation.get_val(comp['operands'][k]);
									}
								}
								comp = diff
								break;
							default:
								desc_comp = LL_PRO.validation.get_label_html(comp['operands'][0]);
								comp = LL_PRO.validation.get_val(comp['operands'][0]);
								
								break;
						}
						
					}
					
					params = [field_val, comp]
					desc_params = [field_val, desc_comp]
					if(!vldtr.apply(null,params)){
						fail_count++;
						description = LL_PRO.validation['flag_descriptions'][key];
						last_vals[field_name].flags.push({type:'error',
														 description:description.apply(null,desc_params)});
					}
				}
			}
			
			last_vals[field_name].field_val = field_val
			last_vals[field_name].is_bad = (fail_count>0);
			form_fail += fail_count
			
			//flag field with all verification failures
			if(last_vals[field_name].flags.length > 0){
				for (var j=0; j<last_vals[field_name].flags.length; j++){
					LL_PRO.validation.flag(field, last_vals[field_name].flags )
				}
			}else{
				field.closest('div.label_input_pair').find('ul.errorlist').empty()
			}
		})
		
		if(form_fail){
			form.removeClass('validated')
		}else{
			form.addClass('validated')
			form.submit();
		}
	},
	'flag':function(field, flags){
			// field: is the field element to be flagged
			// flags array of flag objects
			//		flags[N].type: error or warning
			// 		flags[N].description: Text to display in flag
			//		flags[N].id: Optional id if it isn't availble it is replaced with field_id_type_N
			
			/*
			 * All fields display errors in an UL with class error list.
			 * This list will be present if the form has been submitted to the server once already.
			*/
			var	parent_div = field.closest('div.label_input_pair'),
				field_id = field.prop('id');
			
			if (! parent_div.find('.errorlist').exists()){
				$('<ul>',{
					id:field_id+'_errorlist',
					'class':'errorlist'
				}).appendTo(parent_div)
			}else{
				parent_div.find('.errorlist').empty()
			}
			
			for (var i=0;i<flags.length;i++){
				if (!flags[i].id){
					flags[i].id = field_id+'_'+flags[i].type+'_'+String(i)
				}
				$('<li>',{html:flags[i].description,'class':flags[i].type,'id':flags[i].id}).appendTo(parent_div.find('#'+field_id+'_errorlist'))
			}
			return
		},
	'page_flag':function(type,message, flag_id){
		var html  ='<div id="'+type+'" style="display:none;">',
			li = '<li id="'+flag_id+'">'+message+'</li>'
			html +='<div class="alert">'
			html +='<img src="/static/images/message_icon_'+type+'.png" />'
			html +='<h1>'+type+'</h1>'
			html +='<ul class="'+type+'_list">'
			html +='</ul><div class="hide_message button right">Hide '+type+'</div><br class="clear_both"/></div></div>'
		
		$("#page_header").toggleClass(type)
		
		clearInterval(LL_PRO.validation.pulse[type]);
		LL_PRO.validation.pulse[type] = setInterval(LL_PRO.validation.pulse_header,2000)
			
		if ($('#messages').find('#'+type).length == 0){
			$('#messages').html(html)
		}
		if($('#'+flag_id).exists()){
			$('#'+flag_id).html(message);
		}else{
			$('#messages #'+type+' ul').append(li);
		}
		LL_PRO.listeners.hide_messages(type);
		$('#'+type).fadeIn();
	},
}//end of validation object