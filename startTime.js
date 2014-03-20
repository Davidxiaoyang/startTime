(function(){
	function extend(define,source){
		for(var property in source){
			define[property] = source[property];
		}
		return define;
	}
	function $(id){
		return document.getElementById(id);
	}
	var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
	var remainTime = function(options){
		this.opts = options;
		this.timer = null;
		this.init();
	};
	remainTime.prototype = {
		init : function(){
			if(reg.test(this.opts.strTime)){
				this.startTime();
			}else{
				alert('你输入的时间格式不正确！！！');
				return false;
			}
		},
		startTime : function(){
			var oDateEnd = new Date();
			var oDateNow = new Date();
			var iRemain = 0;
			var iDay=0;
			var iHour=0;
			var iMin=0;
			var iSec=0;
			var d = this.opts.strTime.split('-');
			oDateEnd.setFullYear(parseInt(d[0]));
			oDateEnd.setMonth(parseInt(d[1])-1);
			oDateEnd.setDate(parseInt(d[2]));
			oDateEnd.setHours(0);
			oDateEnd.setMinutes(0);
			oDateEnd.setSeconds(0);
			iRemain=(oDateEnd.getTime()-oDateNow.getTime())/1000;
			if(iRemain <= 0){
				return false;
			}
			iDay = parseInt(iRemain/86400);
			iRemain%=86400;
			iHour = parseInt(iRemain/3600);
			iRemain%=3600;
			iMin = parseInt(iRemain/60);
			iRemain%=60;
			iSec = iRemain;
			this.opts.distanceTime.innerHTML = '现在距离'+d[0]+'年'+d[1]+'月'+d[2]+'日还剩：';
			this.opts.date.innerHTML = iDay+'天'+iHour+'小时'+iMin+'分钟'+iSec+'秒';
			this.dateTime();
		},
		dateTime : function(){
			var self = this;
			clearTimeout(this.timer);
			this.timer = setTimeout(function(){
				self.startTime();
			},1000);
		} 
	}
	var defaults = {
		strTime : '2014-10-10',
		distanceTime : $('distanceTime'),
		date : $('date')
	}
	window.remainTime = function(options){
		new remainTime(options || defaults);
	}
}());
