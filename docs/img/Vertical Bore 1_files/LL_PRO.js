if (typeof(LL_PRO) == "undefined"){
	LL_PRO = {};

}

LL_PRO.notification_poll = null;
LL_PRO.page_has_errors = false;
//*************************************************
LL_PRO.pe_update = function(project_id, form, reload){

	if (request)
		{
			request.abort()
			request = null
			$('.loads, .loops, .hwgs').sortable('destroy')
		}
	var request = $.ajax({async:true,
		    type: form ? "POST": "GET",
			url:'/'+project_id+'/pe/',
			data:form ? $(form).serialize() : '',
			dataType:'json',
			cache: false,
			success: function(project){
				if (! reload){
					LL_PRO.setup_project_elements(project);
					LL_PRO.page_poll.poll()
				}
			}
		})}

LL_PRO.setup_project_elements= function(project){
	var zones = project.zones;
	var ghex = project.ghex;
	var hwgs = project.hwgs;
	var zone_groups = project.zone_groups;
	
	function make_zone(id,display_name){
		this.id = id;
		this.display_name = display_name;
	}

	listen_to_zgs(project);
	listen_to_zones(project);
	listen_to_hwgs(project);
	listen_to_ghex(project);
	
	$('.zone_sort').off('click').on("click", function (){
		var property = $(this).attr('sort_by'),
			direction = $(this).attr('sort_dir'),
			zg_id = $(this).attr('zg_id'),
			assigned_zones = [],
			z_id,
			current_position,
			target_list = $('#'+zg_id+' ul.loads'),
			item;
		
		$('#'+zg_id+' li.zone').each(function(){
			assigned_zones.push(new make_zone($(this).prop('id'), $(this).attr('display_name')))
			});

			if(property =="display_name"){
				assigned_zones.humanSort(property)
			}else{
				assigned_zones.dynamicSort(property)
			}
			
			if (direction == 'asc'){
				$(this).attr('sort_dir' , 'dsc');
			}else{
				assigned_zones.reverse()
				$(this).attr('sort_dir', 'asc');
			}
		
			for (var i = 0; i < assigned_zones.length; i++){
				z_id = assigned_zones[i].id
				$('li.zone#'+z_id+' #'+z_id+'_id_ordinal').val(i)
				item = $('#'+zg_id+' li#'+z_id)
				target_list.append(item)
			}
		});
	
	$('.activate_all').off('click').on('click',function(){
		bulk_zone_state(true, $(this).attr('zg_id'));
		$(this).closest('ul').addClass('noHover');
		});
	$('.deactivate_all').off('click').on('click',function(){
		bulk_zone_state(false, $(this).attr('zg_id'));
		$(this).closest('ul').addClass('noHover');
		});

	}
	
//*********************************************
	function update_counts(){
		$('.toggle_list').each(function(){
			var tar = $(this).attr('list_target'),
				count = $('#'+tar).children().not('.empty_section').length;
				
			$('.toggle_list[list_target='+tar+'] .folder_count').text(count);
			
			if(count > 0){
				$('#'+tar+' .empty_section').addClass('hidden');
			}else{
				$('#'+tar+' .empty_section').removeClass('hidden');
			}
		})
	}
	function listen_to_zones(project){
		$(".loads").sortable({
			axis:'y',
			scrollSensitivity:200,
			scrollSpeed:30,
			revert:200,
			placeholder: "ui-state-highlight",
			handle: '.handle',
					cursorAt: { left: 100, top : 20 }, //:::NOTE::SORTABLE IN JQUERY-UI.min.js has been modified so positioning is set to relative not absolute otherwise cursor position is goofy ~line 233
			connectWith: $('.loads'),
			create:function(event,ui){
				$('.loads:not(.current_zg .loads, .current_model .loads, .default_open .loads)').hide();
				update_counts();
			},
			activate:function(event,ui){
				$(".loads").sortable('refresh');
				$(".loads").slideDown();
			},
			start:function(event,ui){
				ui.item.addClass('active_sort');
				$(".zone_label").addClass('available');
				ui.placeholder.height('2.5em');
			},
			receive:function(event, ui){
				ui.item.removeClass('active_sort',800, 'easeOutQuart')
				var receiver = $(this).attr('zg_id');
				
				$('#'+ui.item.prop('id')+' input[name=zone_group]').val(receiver)
				
				if(ui.item.hasClass('current_model')){
					$('#main_form #id_zone_group').val(receiver)
				}
				
				update_counts();
				
				},
			stop:function(event, ui){
				$('.loads:not(.current_zg .loads, .current_model .loads, .user_opened)').slideUp();
				$(".zone_label").removeClass('available')
				ui.item.removeClass('active_sort',800, 'easeOutQuart')
				var zone = ui.item.prop('id'),
					zones = $("li#" + zone).closest('ul').children('.zone'),
					order_set = {};
				
				zones.each(function(idx, li){
					order_set[$(li).prop('id')] = idx
					$('#'+zone+' input[name=ordinal]').val(idx)
				})
				zones.each(function(idx,li){$('#'+zone+' input[name=order_set]').val($.param(order_set))})
				
				LL_PRO.pe_update(project.id,$('#'+zone+'_form'))
				},
		}).disableSelection();
		
		$('.loads .element_toggle').off('click').on('click',function (){
			var z = '#'+$(this).attr('zone_id');
			var is_active = parseInt($(z+'_form input[name=active]').val());
			var reload = $(z).hasClass('current_model');
			var sender = $(z+'_form input[name=sender]').val();
			
			$(z+'_form input[name=active]').val(is_active ? '0' : '1')
			$(z).removeClass(is_active ? 'active' : 'inactive');
			$(z).addClass(is_active ? 'inactive' : 'active');
			
			LL_PRO.pe_update(project.id,$(z+'_form'), reload)
			
			if (reload){
				window.location.href = sender;
			}
		});
	}
	
	function listen_to_hwgs(project){
		$(".hwgs").sortable({
			axis:'y',
			scrollSensitivity:200,
			scrollSpeed:30,
			revert:200,
			placeholder: "ui-state-highlight",
			handle: '.handle',
					cursorAt: { left: 100, top : 20 }, //:::NOTE::SORTABLE IN JQUERY-UI.min.js has been modified so positioning is set to relative not absolute otherwise cursor position is goofy ~line 233
			connectWith: $('.hwgs'),
			create:function(event,ui){
				$('.hwgs:not(.current_zg .hwgs, .current_model .hwgs, .default_open .hwgs)').hide();
				update_counts();
			},
			activate:function(event,ui){
				$(".hwgs").sortable('refresh');
				$(".hwgs").slideDown();
			},
			start:function(event,ui){
				
				ui.item.addClass('active_sort');
				$(".hwg_label").addClass('available');
				ui.placeholder.height('2.5em');
			},
			receive:function(event, ui){
				ui.item.removeClass('active_sort',800, 'easeOutQuart')
				var receiver = $(this).attr('zg_id');
				$('#'+ui.item.prop('id')+' input[name=zone_group]').val(receiver)
				if(ui.item.hasClass('current_model')){
					$('#main_form #id_zone_group').val(receiver)
				}
				update_counts();
				},
			stop:function(event, ui){
				$('.hwgs:not(.current_zg .hwgs, .current_model .hwgs, .user_opened)').slideUp();
				$(".hwg_label").removeClass('available')
				ui.item.removeClass('active_sort',800, 'easeOutQuart')
				var hwg = ui.item.prop('id'),
					hwgs = $("li#" + hwg).closest('ul').children('.hwg'),
					order_set = {};
				
				hwgs.each(function(idx, li){
					order_set[$(li).prop('id')] = idx
					$('#'+hwg+' input[name=ordinal]').val(idx)
				})
				hwgs.each(function(idx,li){$('#'+hwg+' input[name=order_set]').val($.param(order_set))})
				LL_PRO.pe_update(project.id,$('#'+hwg+'_form'))
				},
		
		}).disableSelection();
		
		$('.hwgs .element_toggle').off('click').on('click',function (){
			var h = '#'+$(this).attr('hwg_id');
			var is_active = parseInt($(h+'_form input[name=active]').val());
			var reload = $(h).hasClass('current_model');
			var sender = $(h+'_form input[name=sender]').val();
			
			$(h+'_form input[name=active]').val(is_active ? '0' : '1')
			$(h).removeClass(is_active ? 'active' : 'inactive');
			$(h).addClass(is_active ? 'inactive' : 'active');

			LL_PRO.pe_update(project.id,$(h+'_form'), reload)
			
			if (reload){
				window.location.href = sender;
			}
		});
	}
	
	function listen_to_ghex(project){
		$(".loops").sortable({
			axis:'y',
			scrollSensitivity:200,
			scrollSpeed:30,
			revert:200,
			placeholder: "placeholder",
			handle: '.handle',
					cursorAt: { left: 100, top : 20 }, //:::NOTE::SORTABLE IN JQUERY-UI.min.js has been modified so positioning is set to relative not absolute otherwise cursor position is goofy ~line 233
			connectWith: $('.loops'),
			create:function(event,ui){
				$('.loops:not(.current_zg .loops, .current_model .loops, .default_open .loops)').hide();
				update_counts();
			},
			activate:function(event,ui){
				$(".loops").sortable('refresh');
				$(".loops").slideDown();
			},
			start:function(event,ui){
				
				ui.item.addClass('active_sort')
				$(".ghex_label").addClass('available');
				ui.placeholder.height('2.5em');
			},
			receive:function(event, ui){
				ui.item.removeClass('active_sort',800, 'easeOutQuart')
				var receiver = $(this).attr('zg_id');
				$('#'+ui.item.prop('id')+' input[name=zone_group]').val(receiver)
				if(ui.item.hasClass('current_model')){
					$('#main_form #id_zone_group').val(receiver)
				}
				update_counts();
				},
			remove:function(event, ui){ 	
				var giver = project[$(this).attr('zg_id')];
				//zone_tally(giver);
				},
			stop:function(event, ui){
				$('.loops:not(.current_zg .loops, .current_model .loops, .user_opened)').slideUp();
				$(".ghex_label").removeClass('available')
				ui.item.removeClass('active_sort',800, 'easeOutQuart')
				var ghex = ui.item.prop('id'),
					ghex_type = ui.item.prop('model_type'),
					loops = $("li#" + ghex).closest('ul').children('.ghex'),
					order_set = {},
					is_active = $('#'+ghex).hasClass('active');
				if (is_active){
					$("li#" + ghex).closest('ul').children('.ghex.active').not('#'+ghex).removeClass('active').addClass('inactive');
				}
				loops.each(function(idx, li){
						order_set[$(li).prop('id')] = idx;
						$('#'+ghex+' input[name=ordinal]').val(idx);
						$('#'+ghex+' input[name=order_set]').val($.param(order_set));
				})

				LL_PRO.pe_update(project.id,$('#'+ghex+'_form'))
				},
		
		}).disableSelection();
		
		$('.loops .element_toggle').off('click').on('click',function (){
			
			var zg = project[$(this).attr('ghex_id')].zone_group,
				g = '#'+$(this).attr('ghex_id'),
				is_active = project[$(this).attr('ghex_id')].active;
			
			//IMPORTANT: is_active is the state of the element prior to click event
			
			if (is_active == 1){
				$(g+'_form input[name=active]').val('0')
				$(g).removeClass('active').addClass('inactive')
			}else{
				$('#zg_'+zg+'_ghex li').not(g).each(function(){
					var this_id= $(this).prop('id');
					$(this).removeClass('active').addClass('inactive')
					$('#'+this_id+'_form input[name=active]').val('0')
					})
				$(g+'_form input[name=active]').val('1')
				$(g).removeClass('inactive').addClass('active')
			}
			
			LL_PRO.pe_update(project.id,$(g+'_form'))
		});
	}
	
	function listen_to_zgs(project){
		$(".zgs").sortable({
			axis:'y',
			scrollSensitivity:200,
			scrollSpeed:30,
			revert:200,
			placeholder: "placeholder",
			handle: '.handle',
					cursorAt: { left: 100, top : 20 }, //:::NOTE::SORTABLE IN JQUERY-UI.min.js has been modified so positioning is set to relative not absolute otherwise cursor position is goofy ~line 233
			start:function(event,ui){
				ui.item.addClass('active_sort');
				ui.placeholder.height(ui.item.height());
			},
			stop:function(event, ui){
				$(".zgs").each(function(idx, li){
					var zg = $(this).attr('id')
					$('#'+zg+' input[name=ordinal]').val(idx)
				})
				ui.item.removeClass('active_sort',800, 'easeOutQuart')
				$('#'+ui.item.prop('id')+'_form'+' input[name=ordinal]').val(ui.item.index())

				LL_PRO.pe_update(project.id,$('#'+ui.item.prop('id')+'_form'))
				},
		
		}).disableSelection();
		$('#project_elements .active')[0].scrollIntoView({block: "start"});
	}
//*************************************************	
	function bulk_zone_state(activate, zg_id){
	//if activate is true turn all zones with matching zg_id on otherwise turn them off.
		var z_id;

		$('#'+zg_id+' li.zone').each(function(){
			z_id = $(this).prop('id')
			$('#'+z_id+'_form input[name=active]').val(activate ? '1' : '0');
			$(this).removeClass(activate ? 'inactive' : 'active');
			$(this).addClass(activate ? 'active' : 'inactive');
			
			//LL_PRO.pe_update(project.id,$('#'+z_id+'_form'))
			
			})
		
		}
		
//*************************************************	

	//Update Zone Group: 	Changes values displayed on screen
	
	function update_zone_group(target_zg){
		$('#'+target_model.id+' .output.ewt_min').html(commafy(target_model.ewt_min.toFixed(2)));
		$('#'+target_model.id+' .output.ewt_max').html(commafy(target_model.ewt_max.toFixed(2)));

		$('#'+target_model.id+' .output.connected_flow').html(commafy(target_model.connected_flow.toFixed(2)));
	
		$('#'+target_model.id+' .output.cooling_cap').html(commafy(target_model.cooling_cap.toFixed(2)));
		$('#'+target_model.id+' .output.heating_cap').html(commafy(target_model.heating_cap.toFixed(2)));
		
		$('#'+target_model.id+' .output.peak_block_cooling_load').html(commafy(target_model.peak_block_cooling_load.toFixed(2)));
		$('#'+target_model.id+' .output.peak_block_heating_load').html(commafy(target_model.peak_block_heating_load.toFixed(2)));
	
		$('#'+target_model.id+' .output.peak_block_cooling_flow').html(commafy(target_model.peak_block_cooling_flow.toFixed(2)));
		$('#'+target_model.id+' .output.peak_block_heating_flow').html(commafy(target_model.peak_block_heating_flow.toFixed(2)));
		/*switch to if($('body').attr('class') == 'si') to test conversions in browser*/	
		if(LL_PRO.project.units == 'si'){
			convert(target_model.id);
		}
	}


//*************************************************	
		
		$('.zg_sort').on("click", function (){

				var property = $(this).attr('sort_by');
				var array_to_sort = $(this).attr('array_to_sort');
				var direction = $(this).attr('sort_dir');
	
				zone_groups.sort(function(a,b){
											 
						a  = a[property];
						b  = b[property];
					
						if(b==a)
							return 0;
						else if(b<a)
							return 1;
						else
							return -1;
				});
				
				//reset the list so sorts work the way expected when clicked next
				$('.zg_sort').attr('sort_dir','asc');
				$('.zg_sort').attr('active_sort',false);
				$(this).attr('active_sort',true);
	
				if (direction == 'asc'){
					$(this).attr('sort_dir' , 'dsc');
				}else{
					zone_groups.reverse();
					$(this).attr('sort_dir', 'asc');
				}
				build_zone_groups();
		});


LL_PRO.create_sender_fields = function(sender){
	var field = $('<input>').attr({
		type:'hidden',
		id:'sender',
		name:'sender',
		value: sender
		}).appendTo($('form'))
}
LL_PRO.category_listeners = function(){}

LL_PRO.setup_zone = function(has_hourly, has_monthly, initial_load_method, base_link, new_zone){
	LL_PRO.category_listeners = function(){
		var day_change_warn = false;
		
		if (initial_load_method==0){
			day_change_warn = true;
		}
		
		var times = ['08_12','12_16','16_20','20_08'],
			months =['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
			modes = ['h','c'];
		
		function has_day(){
			var load = 0;
			
			for (var t=0; t<4; t++){
				for (var m=0; m<2; m++){
					load += parseFloat($('#id_q_'+modes[m]+'_'+times[t]+'').val());
				}
			}
			return load > 0
		}
		function has_monthly(){
			var load=0;
			
			for(var month = 0; month < 12; month++){
				for(var m=0; m<2; m++){
					load += parseFloat($('#id_'+months[month]+'_q_'+modes[m]+'_total').val());
					load += parseFloat($('#id_'+months[month]+'_q_'+modes[m]+'_peak').val());
				}
			}
			
			return load > 0
		}
		
		$('#design_day input').change(function(){day_change_warn=true;})
		
		$('#design_day_toggle').click(function(){
			var cur_method = $('#id_load_input_method').val();
			
			function make_change(){
				if (cur_method == 2){
					$('#hourly_toggle').removeClass('active');
					$('#hourly_loads').hide('slide',{direction:'up'},100, function(){$('#design_day').show('slide',{direction:'up'},500)});
				}else if(cur_method==1){
					$('#monthly_toggle').removeClass('active');
					$('#monthly_loads').hide('slide',{direction:'up'},100, function(){$('#design_day').show('slide',{direction:'up'},500)});
				}
				
				$('#design_day_toggle').addClass('active');
				$('#id_load_input_method').val(0);
				$('#load_profile .help_link').attr('href','http://help.looplinkpro.com/en/latest/zone/#simple-load-entry-design-day');
			}
			
			if ($('#load_profile').hasClass('processing') || $(this).hasClass('inactive')){
				return
			}

			if (cur_method == 2){
				if(has_hourly){
					var message_html = '<p>You are switching from an 8760-hourly load profile to a design day load profile.</p>';
						message_html+='<ul>';
						message_html+='<li>If you choose "Continue", all hourly and calculated monthly load information will be permanently deleted.</li>'
						message_html+='<li>If you choose "Duplicate and Continue", a copy of this zone with only design day load information will be created and you will be redirected to the new zone.</li>'
						message_html+='</ul>';
					var options = { 'title':'WARNING: Data May Be Lost',
									'message_html':message_html,
									'change_code':20,
									'callback':make_change
									}
					load_delete_dialog(options);
				}else{
					make_change();
				}
				
			}
			if (cur_method == 1){
				if(has_monthly()){
					var message_html = '<p>You are switching from a monthly load profile to a design day load profile.</p>';
						message_html+='<ul>';
						message_html+='<li>If you choose "Continue", all monthly load information will be permanently deleted.</li>'
						message_html+='<li>If you choose "Duplicate and Continue", a copy of this zone with only design day load information will be created and you will be redirected to the new zone.</li>'
						message_html+='</ul>';
					var options = { 'title':'WARNING: Data May Be Lost',
									'message_html':message_html,
									'change_code':10,
									'callback':make_change
									}
					load_delete_dialog(options);
				}else{
					make_change();
				}	
			}
			
		})
		
		$('#monthly_toggle').click(function(){
			if ($('#load_profile').hasClass('processing') || $(this).hasClass('inactive')){
				return
			}
			
			var cur_method = $('#id_load_input_method').val();
			
			function make_change(){
				if (cur_method == 2){
					$('#hourly_toggle').removeClass('active');
					$('#hourly_loads').hide('slide',{direction:'up'},100, function(){$('#monthly_loads').show('slide',{direction:'up'},500)});
				}else if (cur_method == 0){
					$('#design_day_toggle').removeClass('active');
					$('#design_day').hide('slide',{direction:'up'},100, function(){$('#monthly_loads').show('slide',{direction:'up'},500)});
				}
				
				$('#monthly_toggle').addClass('active');
				$('#id_load_input_method').val(1);
				$('#load_profile .help_link').attr('href','http://help.looplinkpro.com/en/latest/zone/#monthly-load-entry');
			}
			
			if (cur_method == 2){
				if(has_hourly){
					var message_html = '<p>You are switching from an 8760-hourly load profile to a monthly load profile.</p>';
						message_html+='<ul>';
						message_html+='<li>If you choose "Continue", all hourly will be permanently deleted.</li>'
						message_html+='<li>If you choose "Duplicate and Continue", a copy of this zone with only monthly and calculated design day load information will be created and you will be redirected to the new zone.</li>'
						message_html+='</ul>';
					var options = { 'title':'WARNING: Data May Be Lost',
									'message_html':message_html,
									'change_code':21,
									'callback':make_change
									}
					load_delete_dialog(options);
				}else{
					make_change();
				}
			}
			if (cur_method == 0){
				if(has_day()){
					var message_html = '<p>You are switching from a design day load profile to a monthly load profile.</p>';
						message_html+='<ul>';
						message_html+='<li>If you choose "Continue", your design day load profile will be overwritten by calculated values.</li>'
						message_html+='<li>If you choose "Duplicate and Continue", a copy of this zone without loads will be created and you will be redirected to the new zone.</li>'
						message_html+='</ul>';
					var options = { 'title':'WARNING: Data May Be Lost',
									'message_html':message_html,
									'change_code':1,
									'callback':make_change
								}
					load_delete_dialog(options);
				}else{
					make_change();
				}
			}
		})
		
		$('#hourly_toggle').click(function(){
			if ($('#load_profile').hasClass('processing') || $(this).hasClass('inactive')){
				return
			}
			var cur_method = $('#id_load_input_method').val();
			
			function make_change(){
				if (cur_method == 1){
					$('.load_input_method').not(this).removeClass('active');
					$('#monthly_loads').hide('slide',{direction:'up'},500, function(){$('#hourly_loads').show('slide',{direction:'up'},100)});
				}else if (cur_method == 0){
					$('#design_day_toggle').removeClass('active');
					$('#design_day').hide('slide',{direction:'up'},500, function(){$('#hourly_loads').show('slide',{direction:'up'},100)});
				}
				
				$('#hourly_toggle').addClass('active');
				$('#id_load_input_method').val(2);
				$('#load_profile .help_link').attr('href','http://help.looplinkpro.com/en/latest/zone/#hourly-load-entry-import-only-csv');
			}
			
			
			if (cur_method == 1){
				if(has_monthly()){
					var message_html = '<p>You are switching from a monthly load profile to an 8760-hourly load profile.</p>';
						message_html+='<ul>';
						message_html+='<li>If you choose "Continue", your monthly load profile will be overwritten by calculated values.</li>'
						message_html+='<li>If you choose "Duplicate and Continue", a copy of this zone without loads will be created and you will be redirected to the new zone.</li>'
						message_html+='</ul>';
					var options = { 'title':'WARNING: Data May Be Lost',
									'message_html':message_html,
									'change_code':12,
									'callback':make_change
									}
					load_delete_dialog(options);
				}else{
					make_change();
				}
				
			}
			if (cur_method == 0){
				if (has_day()){
					var message_html = '<p>You are switching from a design day load profile to an 8760-hourly load profile.</p>';
						message_html+='<ul>';
						message_html+='<li>If you choose "Continue", your design day load profile will be overwritten by calculated values.</li>'
						message_html+='<li>If you choose "Duplicate and Continue", a copy of this zone without loads will be created and you will be redirected to the new zone.</li>'
						message_html+='</ul>';
					var options = { 'title':'WARNING: Data May Be Lost',
									'message_html':message_html,
									'change_code':2,
									'callback':make_change
									}
					load_delete_dialog(options);
				}else{
					make_change();
				}
			}
		})
	}
	load_delete_dialog = function(options){
		$("#load_delete_warning").dialog({
				autoOpen:true,
				width:500,
				modal:true,
				title:options.title,
				dialogClass:'edit_pane warning shadowed no_close',
				show: 'fade',
				hide: 'fade',
				draggable:false,
				resizable:false,
				open:function(){
					$(this).find('#delete_warning_message').html(options.message_html);
				},
				buttons: {
					'Continue':function(){
						options.callback()
						$( this ).dialog( "close" );
					},
					'Duplicate and Continue':function(){
						if (options.change_code == 20){
							window.location = base_link+'duplicate/hourly_to_day/';
						}
						if (options.change_code == 21){
							window.location = base_link+'duplicate/hourly_to_monthly/';
						}
						if (options.change_code == 22){
							window.location = base_link+'duplicate/hourly_new_loads/';
						}
						if (options.change_code == 10){
							window.location = base_link+'duplicate/monthly_to_day/';
						}
						if (options.change_code == 11){
							window.location = base_link+'duplicate/monthly_to_monthly/';
						}
						if (options.change_code == 12){
							window.location = base_link+'duplicate/monthly_to_hourly/';
						}
						if (options.change_code == 2){
							window.location = base_link+'duplicate/day_to_hourly/';
						}
						if (options.change_code == 1){
							window.location = base_link+'duplicate/day_to_monthly/';
						}
						if (options.change_code == 'eq_01'){
							window.location = base_link+'duplicate/equipment_qs_to_d/';
						}
						if (options.change_code == 'eq_10'){
							window.location = base_link+'duplicate/equipment_d_to_qs/';
						}

						$( this ).dialog( "close" );
					},
					Cancel: function() {
						$( this ).dialog( "close" );
					}
				},
			});
	}
	LL_PRO.processing_element = false;
	LL_PRO.category_listeners();
}

LL_PRO.ghex_header = function(table, design_hl_total, flushing_hl_total, abs_min_vel, min_vel_idx, min_flushing_flow, adj_flushing_hl_total , flagged_for_vel, flagged_for_hl_100, flagged_for_f_hl_100, design_mode, manual,mech_to_furthest, vault_to_furthest, return_length){
	LL_PRO.header_vars = {'table':table,
						'design_hl_total': design_hl_total,
						'flushing_hl_total': flushing_hl_total,
						'abs_min_vel': abs_min_vel,
						'min_vel_idx': min_vel_idx,
						'min_flushing_flow': min_flushing_flow,
						'adj_flushing_hl_total': adj_flushing_hl_total,
						'flagged_for_vel': flagged_for_vel,
						'flagged_for_hl_100': flagged_for_hl_100,
						'flagged_for_f_hl_100': flagged_for_f_hl_100,
						'design_mode': design_mode,
						'manual': manual,
						'mech_to_furthest':mech_to_furthest,
						'vault_to_furthest':vault_to_furthest,
						'return_length' : return_length
						}
	
	return;
}

LL_PRO.activate_polling = function(){
	LL_PRO.page_poll = {
		repollable:true,
		poll_req: null,
		clear_polling_timeout: function(){clearTimeout(LL_PRO.page_poll.poll_timer);},
		clear_poll_req:function(){
			if (LL_PRO.page_poll.poll_req){
				LL_PRO.page_poll.poll_req.abort();
				LL_PRO.page_poll.poll_req = null
			}},
		clear_outputs: function(){
			LL_PRO.page_poll.clear_polling_timeout();
			LL_PRO.page_poll.clear_poll_req();
			$('#object_summary .value').html('...');
			LL_PRO.page_poll.repollable = false;
			},
		destination:'',
		poll_timer:setTimeout(function(){LL_PRO.page_poll.poll()},1000),
		call_back: function(){},
		poll: function(){
			LL_PRO.page_poll.clear_polling_timeout();
			$('#object_summary .value').html('...');
			
			if(LL_PRO.page_poll.repollable){
				$('.processed').removeClass('processed').addClass('processing')
				
				LL_PRO.page_poll.poll_req = $.ajax({
					url:LL_PRO.page_poll.destination,
					type:"GET",
					async:true,
					success:function(response){
						if(response.status == 'DNE'){
							window.location = response.redirect_to;
						}
						if(response.status =='rocking'){
						   if(response.outputs && !LL_PRO.page_has_errors){
								$.each(response.outputs, function(section_key, section_values){
									  $.each(response.outputs[section_key], function(key,v){
										 $('#object_summary #'+section_key+'_'+key).text(String(v))
									 });
								});
							}
							
							$('.current_zg li').removeClass('processing')
							LL_PRO.page_poll.clear_polling_timeout();
							$('.processing').removeClass('processing').addClass('processed');
							LL_PRO.page_poll.call_back();
							setTimeout(function(){$('.processing').removeClass('processing').addClass('processed')},1000);
						}
					},
					error:function(){
						LL_PRO.page_poll.clear_polling_timeout();
						LL_PRO.page_poll.poll_timer = setTimeout(function(){LL_PRO.page_poll.poll()},5000)
					},
					dataType:"json",
					timeout:60000,
				});
			}
		}
		
	}
	
}

LL_PRO.activate_save = function(){
	$('#save_block').removeClass('no_save');
	$('#object_summary .value').html('...')
	LL_PRO.universal.warn_before_leave = true;
}
LL_PRO.deactivate_save = function(){
	$('#save_block').addClass('no_save');
	LL_PRO.universal.warn_before_leave = false;
}

LL_PRO.bind_delete = function(target){
	if (!target){
		target=$('.delete').not('.inactive');
	}
	
	target.click(function(){
		$('#delete_confirmation').attr('delete_url',$(this).attr('delete_url'))
		$('#delete_confirmation').attr('item_to_delete',$(this).attr('item_to_delete'))
		$('#delete_confirmation').attr('useajax',$(this).attr('useajax'))
		$('#delete_confirmation').attr('item_id',$(this).attr('item_id'))
		$('#delete_confirmation').dialog('open')
	});
};

LL_PRO.make_read_only = function(){
	$('input,select').not('.unlockable, input[name="csrfmiddlewaretoken"]').prop('disabled',true);
	$('input,select').not('.unlockable, input[name="csrfmiddlewaretoken"]').prop('readonly',true);
	$('#main_content .button, #main_content .large_button, #main_content .clickable, #main_content .delete, #main_content .edit').not('unlockable').off('click').addClass('inactive');
}
LL_PRO.make_modifiable = function(){
	// Firefox stores the disabled and readonly state of a field in session
	// cache. The forms have an autocomplete='off' function which seems to work
	// but just in case we will leave this around.
	$('input,select').not('input[name="csrfmiddlewaretoken"]').removeAttr('disabled');
	$('input,select').not('input[name="csrfmiddlewaretoken"]').removeAttr('readonly');
	$('#main_content .button, #main_content .large_button, #main_content .clickable, #main_content .delete, #main_content .edit').removeClass('inactive').on('click');
}

LL_PRO.universal = function(mode,jQ_validators){
	if(mode == 'read_only' || mode == 'processing'){
		LL_PRO.make_read_only();
	}
	//else{
	//	LL_PRO.make_modifiable();
	//}
	
	var warn_before_leave = false,
		skip_save_check=false,
		will_force_save = false;
	

	$('#main_form input, #main_form select').change(function(){
		LL_PRO.activate_save();
		if (typeof(LL_PRO.page_poll) !== "undefined"){
			LL_PRO.page_poll.clear_outputs();
			LL_PRO.page_poll.repollable = false;
		}
	});
	
	window.onbeforeunload = confirmExit;
	window.onunload = clearPoll;
	
	function confirmExit(){
		if(LL_PRO.universal.warn_before_leave && ! LL_PRO.universal.skip_save_check){
			message = 'There are unsaved changes on the page.'
			if (LL_PRO.universal.will_force_save){
				message += ' Your changes will automatically save if you Leave this Page.'
			}
			return message
		}
	};
	
	function clearPoll(){
		if (LL_PRO.notification_poll_req){
			LL_PRO.notification_poll_req.abort();
			LL_PRO.notification_poll_req = null
		}
	};
	
	function getCookie(name) {
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
	var csrftoken = getCookie('csrftoken');
	
	function csrfSafeMethod(method) {
		// these HTTP methods do not require CSRF protection
		return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}

	LL_PRO.bind_delete(false);
	
	$('#delete_confirmation').dialog({
		autoOpen:false,
		dialogClass:'delete_confirmation shadowed no_close',
		title:'Delete Confirmation',
		width:500,
		modal:true,
		show: 'fade',
		hide: 'fade',
		draggable:false,
		resizable:false,
		buttons:[
			{
				text: 'DELETE',
				class : 'delete',
				click:function(e){
					e.preventDefault();
					$('#delete_confirmation button.delete').prop('disabled',true);
					
					if ($('#delete_confirmation_field').val()==='DELETE'){
						if($('#delete_confirmation').attr('useajax')=='true'){
							$.ajax({
								url:$('#delete_confirmation').attr('delete_url'),
								type:"POST",
								data:$('#delete_form').serialize(),
								success:function(response){
									if(response.message_type == 'error'){
										
										LL_PRO.validation.page_flag('error',response.message)
									}else{
										$(response.del_id).remove();
										
										if(response.message){
											LL_PRO.validation.page_flag('success',response.message)
										}
										if(LL_PRO.page_poll !== undefined){
											LL_PRO.page_poll.poll();
										}
									}
									$('#delete_confirmation').dialog('close');
								},
								dataType:"json",
								timeout:5000,
							});
						}else{
							LL_PRO.universal.warn_before_leave = false;
							$('#delete_form').submit();
						}
					}else{
						//display error
						$('#delete_confirmation .errorlist').css('display','')
						$('#delete_confirmation_field').effect('shake','slow',{times:2,distance:10})
						$('#delete_confirmation_field').css('height','inherit')
						$('#delete_confirmation_field').promise().done(function(){$(this).val('').focus()})	
					}
				}
			},
			{
				text: 'CANCEL',
				click: function(){$(this).dialog('close')}
			}],
		open: function(){
			$('#item_to_delete').text($('#delete_confirmation').attr('item_to_delete'))
			$('#delete_form').prop('action',$(this).attr('delete_url'));
			$(window).unbind('keypress').bind('keypress',function(event){
				if (event.which == 13){
					event.preventDefault();
					$(':button:contains("DELETE")').click()
				}
			})
		},
		close: function(){
			$('#item_to_delete').text('')
			$('#delete_confirmation_field').val('')
			LL_PRO.listen_to_enter_for_main();
		}
	})
	
	$('.edit_EWT').click(function(){
		$("#EWT_window").attr('zg',$(this).attr('zg'));
		$("#EWT_window").attr('zg_name',$(this).attr('zg_name'));
		$("#EWT_window").attr('min',$(this).attr('min'));
		$("#EWT_window").attr('max',$(this).attr('max'));
		$("#EWT_window").attr('det',$(this).attr('det'));
		$("#EWT_window").dialog('open');
	});
	
	$('.rename_zg').click(function(){
		$("#rename_zg").attr('zg',$(this).attr('zg'));
		$("#rename_zg").attr('zg_name',$(this).attr('zg_name'));
		$("#rename_zg").dialog('open');
	});
	
	$(window).keypress(function(event){
		if (event.which == 13){
			event.preventDefault(); //stop event
		}
	})
	
	LL_PRO.allow_enter_save = true;
	// ENTER KEY SUBMITS ANYWHERE
	LL_PRO.listen_to_enter_for_main = function(){
		if (LL_PRO.allow_enter_save){
			$(window).keypress(function(event){
				if (event.which == 13){
					event.preventDefault(); //stop event
					save(event)
				}
			})
		}
	}
	$('#save_button').click(function(event){
		if(!$('#save_block').hasClass('no_save')){
			save(event)
		}
	})
	
	function save(event){
		LL_PRO.universal.warn_before_leave = false;
		event.preventDefault();
		if (jQ_validators!==''){
			LL_PRO.validation.validate($('#main_form'),jQ_validators)
		}else{
			$(this.form).submit();
		}
	}
	
	function isFloat(n) {
		if(isNaN(n)){
			return false;
		}
		return n === +n && n !== (n|0);
	}

	function isInteger(n) {
		if(isNaN(n)){
			return false;
		}
		return n === +n && n === (n|0);
	}
	
	

	$('.ellipsize').mouseover(function(e){
		$(this).removeClass('ellipsize');
		$(this).stop(true).animate({scrollLeft: $(this)[0].scrollWidth},5000, "linear");
	});
	$('.ellipsize').mouseout(function(e){
		$(this).addClass('ellipsize')
		$(this).stop(true).animate({scrollLeft: 0},200);
	});
	$('.decimals_two input').each(function(){
		var v = parseFloat($(this).val()).toFixed(2);
		$(this).val(v);
	});
	

}
LL_PRO.isEmail = function(str){
		var lastAtPos = str.lastIndexOf('@'),
			lastDotPos = str.lastIndexOf('.');
			
		return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') == -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
	}
// =============================================================================
// Session Timeout
// Accepts the timeout for the session in milliseconds as well as the relative link to the current page.
// 
// Purpose is to force expired user sessions on unattended screens to the login screen
// Changing the window.location.href to the current page instead of reloading ensures
// that when logged back in, the user will start where they left off.
LL_PRO.session_timeout_timeout = false;
LL_PRO.repo = false;

LL_PRO.session_timeout = function(seconds_to_timeout, current_page, cache_form){
	// check the time the page was loaded. The difference between
	// load_time and the 'current time' will be used to established ellapsed time
	// once ellapsed time exceeds, seconds_to_timeout... reload.
	
	// Unless the user is busy on the page so if they have:
	// Typed or Moved the mouse... reset load time.
	
	//This has to be ahead of the server by a bit so the
	//keep alive isn't ignored.
	
	var load_time = new Date().getTime(),
		display_update_interval = false,
		reset_session_timeout = false;
		
	clearInterval('display_update_interval')
	
	$('#session_timeout').dialog({autoOpen:false,
								 title: 'Logging Out In:',
								 modal: true,
								 dialogClass:'edit_pane staying_alive shadowed no_close',
								 show: 'fade',
								 hide: 'fade',
								 open: function(event,ui){
									clearInterval('display_update_interval');
									display_update_interval = setInterval(update_display_timer,1000);
									$(document).bind('mousemove', function(e){
										staying_alive();
									})
									$(document).bind('keypress', function(e){
										staying_alive();
									})
								},
								 close:function(event, ui){
									clearInterval('display_update_interval');
									$(document).unbind('mousemove')
									$(document).unbind('keypress')
								 }
	})
	
	
	function time_remaining(){
		var current_time = new Date().getTime(),
			ellapsed_time = Math.floor((current_time - load_time)/1000);
		// subtracting 1 second from the time remaining hopefully gets split
		// second keep alives ahead of the servers forced time out.
		return seconds_to_timeout-ellapsed_time-1
	}

	function check_session_timeout(){
		clearTimeout(LL_PRO.session_timeout_timeout)
		
		var t = time_remaining();
		if(t <= 60){
			$('#session_timeout').dialog('open');
		}

		LL_PRO.session_timeout_timeout = setTimeout(check_session_timeout, 5000);
	}
	
	function update_display_timer(){
		var t = time_remaining();
		
		if (t <= 0 ){
			setTimeout(force_reload(),500)
		}
		
		$('#session_timeout #time_to_exit').text(Math.max(0,t));
	}
	function force_reload(){
		// repo makes form data permanent on session expiration
		LL_PRO.universal.warn_before_leave = false;
		if(cache_form){
			LL_PRO.repo.preserve($('#main_form'));
		}
		window.location.href = current_page;
	}
	
	function reset_session(){
		$.ajax({url:'/reset_session/'});
		load_time = new Date().getTime();
	}
	
	function staying_alive(){
		var t = time_remaining();
		$('#session_timeout').dialog('close');
		if (t < 60){
			reset_session()
		}
	}
	
	check_session_timeout();
}



// =============================================================================
// Setup Ajax Updates
// Coopted from LL not extensively used because update strategy is different

LL_PRO.setup_ajax_updates = function(form, active_listener, update_URL, output_names, clear_fn, success_fn, error_fn)
{
	LL_PRO.ajax_enabled = true
	var request = null

	function clearOutputs()
	{
		for (var i in output_names)
		{
			var id = output_names[i]
			// First, try to find an element with the correct id.
			// Otherwise, find all elements with the correct class.
			var e = $("#"+id)
			if (e.length == 0)
			{
				e = $('.'+id)
			}

			if (!e.hasClass('no_clear'))
				e.html('<img src="/static/images/spinner_small.gif" width="10" height="10"/>')
		}

		if (clear_fn)
			clear_fn();
	}

	function handleError(XMLHttpRequest, textStatus, errorThrown)
	{
		request = null
		if (error_fn)
			error_fn()
	}


	function handleSuccess(data, textStatus)
	{
		var outputs = LL_PRO.urldecode(data);
		for (var i in output_names)
		{
			var id = output_names[i];
			var val = outputs[id];
			if (val) {
				// First, try to find an element with the correct id.
				// Otherwise, find all elements with the correct class.			
				var e = $("#"+id);
				if (e.length == 0){
					e = $('.'+id);
				}
				e.html(val);
			}
		}
		request = null;
		if (success_fn)
			success_fn(outputs);
	}


	function updateOutputs() 
	{
		if (!LL_PRO.ajax_enabled)
		{
			return
		}

		if (request)
		{
			request.abort()
			request = null
		}
		
		clearOutputs();
		
		var data = $(form).serialize();
		var req = $.ajax({
				'accepts': 'text/plain',
				'async': true,
				'cache': false,
				'contentType': 'application/x-www-form-urlencoded',
				'data': data,
				'dataType': 'text',
				'error': handleError,
				'global': false,  // Disable jQuery ajax events for this req.
				'ifModified': false,
				'success': handleSuccess,
				'timeout': 2000,
				'type': 'POST',
				'url': update_URL
		})
		request = req
	}

	if (!LL_PRO.is_ro){
		LL_PRO.update_outputs = updateOutputs;
	}
	else{
		LL_PRO.update_outputs = function (){};
	}

	// IE doesn't emit changed for checkboxes or radios until you blur them.
	// So, use clicked instead.
	// project elements will push the update event so we don't want to listen to form fields.
	
	if(active_listener){
		$('input, select').not(':checkbox').not(':radio').change(LL_PRO.update_outputs);
		$(':checkbox, :radio').click(LL_PRO.update_outputs);
	}
	LL_PRO.update_outputs();
}


// =============================================================================
// Decode an "application/x-www-form-urlencoded" object:
//   LL.urldecode("foo=bar&baz=bam") => {'foo':'bar', 'baz':'bam'}
LL_PRO.urldecode = function(str) 
{
	if (str == '')
		return {}

	var x = {}
	var parts = str.split('&')
	for (var i=0; i<parts.length; ++i)
	{
		var kv = parts[i].split('=')
		//decodeURIComponent() doesn't turn '+' back into spaces.
		// Any literal '+' should have been escaped as '%2B'
		x[decodeURIComponent(kv[0].replace(/\+/g, ' '))] = decodeURIComponent(kv[1].replace(/\+/g, ' '))
	}
	return x
}

