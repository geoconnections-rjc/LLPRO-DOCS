function convert(target){

//target must be a containing elements id.  Not passing a target implies convert everything

//All Calls to this function must occur after the ip values have been passed to the screen.

	var v;
	var dp;
	var u;
	
	target = (target) ? '#'+target+' .output[unit]' : '.output[unit]'
	
	$(target).text(function(){
							 
		v = strip($(this).text());
		dp = precision($(this).text());
		u = $(this).attr('unit');
		  
		return (output_converter(v, dp, u));
	});
	
	//on save if in SI the server will invert this process and convert to ip	
}

function output_converter(v, dp, u){
	//ip to si
	switch(u){
		case 'power':
		// kBtu/hr  > kW
			v = (v * 0.29307121044271).toFixed(dp);
			break;
		case 'liquid_flow':
		// gpm  > L/s
			v = (v * 0.06309019666664083).toFixed(dp);
			break;
		case 'air_flow':
		// cfm  > mmm/s
			v = (v * 0.0004719429892869).toFixed(dp);
			break;
		case 'temperature':
		// F  > C
			v = ((v-32)/1.8).toFixed(dp);
			break;
		case 'abs_temperature':
		// R > K
			v = (v/1.8).toFixed(dp);
			break;
		case 'energy':
		// kBtu > kJ
			v = (v * 1055.056).toFixed(dp);
			break;
		}
	return(commafy(v));	
}


function strip(s){
	s = s.replace(/\,/g,'');
	return(parseFloat(s));
}

function precision(dp){
	return(dp.split(".")[1].length);
}

function commafy(amount) {
    var decimalLocation = (String(amount).indexOf("."));
    var delimiter = ",";

    var i = parseInt(amount);
    var floatVal = String(amount);
    var afterDecimal;

    if(decimalLocation <= 0 ){
   		afterDecimal = '';
    }else{
	    afterDecimal =floatVal.substring(decimalLocation);
    }


    if (isNaN(i)) {
        return '';
    }

    var origi = i; // store original to check sign
    i = Math.abs(i);

    var minus = '';
    if (origi < 0) {
        minus = '-';
    } // sign based on original
    var n = new String(i);
    var a = [];

    while (n.length > 3) {
        var nn = n.substr(n.length - 3);
        a.unshift(nn);
        n = n.substr(0, n.length - 3);
    }

    if (n.length > 0) {
        a.unshift(n);
    }

    n = a.join(delimiter);

    amount = minus + n + afterDecimal;

    return amount;

}