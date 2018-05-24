/**
 * Created by TK0335807 on 2016/7/12.
 */
let  Util= {
    type:function(arg){//变量类型
        return Object.prototype.toString.call(arg);
    },
    isArray: function(o) { //是否是数组
        return util.type(o) === "[object Array]";
    },
    isObject: function(o) { //是否是对象
        return util.type(o) === "[object Object]";
    },
    isString: function(o) { //是否是字符串
        return util.type(o) === "[object String]";
    },
    isFunction: function(o) { //是否是函数
        return util.type(o) === "[object Function]";
    },
    isBoolean: function(o) { //是否是布尔值
        return util.type(o) === "[object Boolean]";
    },
    isNumber: function(o) { //是否是数字
        return util.type(o) === "[object Number]"
    },
    isInArr:function(val,arr){ // 某个值是否在该数组中存在
        for(var i= 0,n=arr.length;i<n;i++){
            if(arr[i]==val){
                return true;
            }
        }
        return false;
    },
    _validateByReg: function(sStr, sRegexp){
        if(sStr && (new RegExp(sRegexp)) && (new RegExp(sRegexp)).test(sStr)){
            return true;
        }
        return false;
    },
    isMobile: function(mobile) {//是否是手机号
        if (!mobile) {
            return false
        }
        return util._validateByReg(mobile, /^1[3|4|5|8]\d{9}$/)
    },
    isFullNumber: function(sStr) {// 是否全是数字
        if (!sStr) {
            return false
        }
        return util._validateByReg($.trim(sStr), /^\d+$/)
    },
    isFullTel: function(sStr) {//是否是座机号码格式
        var ret = sStr.split("-"),
            count = 0;
        if (!sStr || ret.length < 2) {
            return false
        }
        $.each(ret, function(i, item) {
            util.isFullNumber(item) && count++
        });
        return count === ret.length
    },
    isEmail:function(s) {//是否为邮箱格式
        var reg = /^([a-zA-Z0-9-]+[_|\_|\.]?)*[a-zA-Z0-9-]+@([a-zA-Z0-9-]+[_|\_|\.]?)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}$/;
        return reg.test(s);
    },
    isFullUrl:function(s){
        var reg =/^((https|http|ftp|rtsp|mms):\/\/)[^s]+/i;
        return reg.test(s);
    },
    isUrl:function(s){
        var reg =/^((https|http|ftp|rtsp|mms)?:\/\/)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)$/i ;
        return reg.test(s);
    },
    isAccount:function(s){//账号验证，6-20位，字母开头字母、数字、下划线组成
        var reg =/^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/;
        return reg.test(s);
    },
    isPassword:function(s){//密码验证，6-26位，字母开头字母、数字、下划线组成
        var reg =/^[a-zA-Z][a-zA-Z0-9_-]{5,25}$/;
        return reg.test(s);
    },
    isIDCard:function(id){//单纯验证身份证号格式是否正确 1800-2199年
        var cID =[11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91];
        var reg15 =/^\d{6}\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}$/i,
            reg18 =/^\d{6}(18|19|20|21)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
        id=id.toString();
        if(!util.isInArr(id.substr(0,2),cID)){
            return false;
        }
        if(id.length==15){
            return reg15.test(id);
        }else if(id.length==18){
            var f = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ],
                p = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ],
                v =id.substr(17,1);
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++){
                ai =parseInt(id.substr(i,1));
                wi = f[i];
                sum += ai * wi;
            }
            if(p[sum % 11] != v){
                return false;
            }else{
                return true;
            }
        }else{
            return false;
        }
    },
    isEmpty:function(str){
        return str==undefined ||typeof str=="undefined" ||str ==null ||(typeof str =="string"&&str.replace(/\s+/ig,"").length =="0");
    },

    getLocSearchObj:function(search){
        var searchObj ={}, url =search || window.location.search;
        if (url.indexOf("?") != -1) {
            var str = url.substr(1),strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                searchObj[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
            }
        }
        return searchObj;
    },
    getGUID:function(){
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16).toString(16);
            guid += n;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) {
                guid += "-"
            }
        }
        return guid;
    },
    /*
     * example: var html = template({a:1,b:2},"<span>{a}</span><span>{b}</span>");
     * */
    simTemp:function(d, h){
        var str = '';
        !util.isArray(d) && (d = [d]);
        $.each(d, function (i, l) {
            str += h.replace(/\{\s*([a-zA-Z0-9\_\.\-]+)\s*\}/igm, function ($1, $2) {
                if(l[$2] === 0){
                    return 0;
                }else{
                    return l[$2] || '';
                }
            });
        });
        return str;
    },
    getDateByStamp:function(timeStm,format){
        var date =new Date(timeStm);
        var dateObj={
            yyyy:date.getFullYear(),
            MM:(date.getMonth()+1).toString().length==1?("0"+(date.getMonth()+1)):date.getMonth()+1,
            dd:date.getDate().toString().length==1?("0"+date.getDate()):date.getDate(),
            hh:date.getHours().toString().length==1?("0"+date.getHours()):date.getHours(),
            mm:date.getMinutes().toString().length==1?("0"+date.getMinutes()):date.getMinutes(),
            ss:date.getSeconds().toString().length==1?("0"+date.getSeconds()):date.getSeconds()
        };
        var dateStr =format||"yyyy-MM-dd hh:mm:ss";
        dateStr =dateStr.replace("yyyy",dateObj["yyyy"]);
        dateStr =dateStr.replace("MM",dateObj["MM"]);
        dateStr =dateStr.replace("dd",dateObj["dd"]);
        dateStr =dateStr.replace("hh",dateObj["hh"]);
        dateStr =dateStr.replace("mm",dateObj["mm"]);
        dateStr =dateStr.replace("ss",dateObj["ss"]);
        return dateStr;
    },
    navigation:function(){
        var u = navigator.userAgent;
        return {//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 ,//是否web应用程序，没有头部与底部,
            weiXin: u.match(/MicroMessenger/i)=="micromessenger", //是否是微信浏览器，
            IE10: u.indexOf('MSIE 10') > -1,
            IE9: u.indexOf('MSIE 9') > -1,
            IE8: u.indexOf('MSIE 8') > -1,
            IE7: u.indexOf('MSIE 7') > -1
        };
    }
};
export default Util;