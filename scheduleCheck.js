/*
	this is a simple pure js framework for check any particular task saved in cookie
	created by Shamrat Akbar
	it's free for any kinds of use and modification
	Date: 26/08/17
*/

(function(){

	this.ScheduleCheck = function(){

		this.isCookieExists = false;
		this.startTime  	= 10;
		this.timeLength  	= 15;
		this.accessTime  	= 5;//mins

		var defaults = {

		}

		if (arguments[0] && typeof arguments[0] == "object") {
			this.startTime = arguments[0].startTime
			this.timeLength = arguments[0].timeLength
			this.accessTime = arguments[0].accessTime
			console.log(arguments[0]);
		}
		initialize.call(this);
	}

	function initialize() {
		if (checkCookie()) {
			this.isCookieExists = true;
			console.log("Cookie Exits");
		}
		else{
			console.log("Cookie Setting");
			setCookie(this.accessTime , this.startTime, this.timeLength);
		}
		if (this.timeLength < 1000) {
			checkSessionTimer(this.accessTime,this.timeLength);
		}
	}
	function setCookie(accessTime, startTime, timeLength) {
	   var date = new Date();
	   date.setTime(date.getTime() + (accessTime*60*1000));
	   var expires = "expires="+date.toUTCString();
	   document.cookie = "startTime="+startTime+";timeLength="+timeLength+";expires="+expires+";path=/";	
	}

	function checkCookie() {
		var cname = getCookie("startTime");
	    console.log("checkCookie: "+cname);
	    if (cname != "") {
	    	return true;
	    } else {
	        return false;
	    }
	}
	function getCookie(cname) {
	    var name = cname + "=";
	    var decodedCookie = decodeURIComponent(document.cookie);
	    var ca = decodedCookie.split(';');
	    console.log("getCookie: "+ca);
	    for(var i = 0; i <ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return "";
	}
	function checkSessionTimer(accessTime, timeLength) {
		var date    = new Date(accessTime);

		if (timeLength < 5) {
			timeLength = timeLength * 60;
		}
		else if (timeLength > 100 || timeLength == ""){
			return;
		}
		else{
			date.setTime(date.getTime()+timeLength*60*1000);
			var sct = setInterval(
				function(){
					var now    = new Date();
					var isExpire = date.getTime() - now.getTime();

					if (isExpire <= 0) {
						window.location = location.origin+"/access_time_expired/";
					}
					console.log(date.getHours()+"-"+date.getMinutes());
					console.log(now.getHours()+"-"+now.getMinutes());
					console.log();
				 }, 1000);	
		}
	}
}());
