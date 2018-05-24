
<style>
    #mtTotalCount{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .digitList{
        text-align: center;
    }
    .digitCeil{
        font-family: "myDigit";
        width: 38px;
        height: 45px;
        line-height: 45px;
        display: inline-block;
        margin-right: 4px;
        background-color:#021931;
        border:1px solid #133a61;
        font-size:40px;
        text-align: center;
        color:#01345a;
    }
    .digitCeil.today{
        color:#e7dd6c;
    }
    .digitCeil.yest{
        color:#03bbff;
    }
    .countItem .title{
        margin:10px 0;
        font-size: 18px;
    }
</style>
<template>
    <div id="mtTotalCount">
        <div class="countItem">
            <div class="title"><span style="color:#fff;padding-right:12px;">杭州今日累计</span><span style="color:yellow;padding-left:10px;">{{time}}</span></div>
            <ul class="digitList">
                <!--<li class="digitCeil" :class="{today:(curHZ[7])}">{{curHZ[7]||"0"}}</li>-->
                <li class="digitCeil" :class="{today:(curHZ[6])}">{{curHZ[6]||"0"}}</li>
                <li class="digitCeil" :class="{today:(curHZ[5])}">{{curHZ[5]||"0"}}</li>
                <li class="digitCeil" :class="{today:(curHZ[4])}">{{curHZ[4]||"0"}}</li>
                <li class="digitCeil" :class="{today:(curHZ[3])}">{{curHZ[3]||"0"}}</li>
                <li class="digitCeil" :class="{today:(curHZ[2])}">{{curHZ[2]||"0"}}</li>
                <li class="digitCeil" :class="{today:(curHZ[1])}">{{curHZ[1]||"0"}}</li>
                <li class="digitCeil" :class="{today:(curHZ[0])}">{{curHZ[0]||"0"}}</li>
            </ul>
        </div>
        <div class="countItem">
            <div class="title"><span style="color:#fff;padding-right:12px;">宁波今日累计</span></div>
            <ul class="digitList">
                <!--<li class="digitCeil" :class="{today:(curNB[7])}">{{curNB[7]||"0"}}</li>-->
                <li class="digitCeil" :class="{today:(curNB[6])}">{{curNB[6]||"0"}}</li>
                <li class="digitCeil" :class="{today:(curNB[5])}">{{curNB[5]||"0"}}</li>
                <li class="digitCeil" :class="{today:(curNB[4])}">{{curNB[4]||"0"}}</li>
                <li class="digitCeil" :class="{today:(curNB[3])}">{{curNB[3]||"0"}}</li>
                <li class="digitCeil" :class="{today:(curNB[2])}">{{curNB[2]||"0"}}</li>
                <li class="digitCeil" :class="{today:(curNB[1])}">{{curNB[1]||"0"}}</li>
                <li class="digitCeil" :class="{today:(curNB[0])}">{{curNB[0]||"0"}}</li>
            </ul>
        </div>
        <div class="countItem">
            <div class="title"><span style="color:#fff;padding-right:12px;">全省昨日总计</span></div>
            <ul class="digitList">
                <!--<li class="digitCeil" :class="{yest:(yesTotal[7])}">{{yesTotal[7]||"0"}}</li>-->
                <li class="digitCeil" :class="{yest:(yesTotal[6])}">{{yesTotal[6]||"0"}}</li>
                <li class="digitCeil" :class="{yest:(yesTotal[5])}">{{yesTotal[5]||"0"}}</li>
                <li class="digitCeil" :class="{yest:(yesTotal[4])}">{{yesTotal[4]||"0"}}</li>
                <li class="digitCeil" :class="{yest:(yesTotal[3])}">{{yesTotal[3]||"0"}}</li>
                <li class="digitCeil" :class="{yest:(yesTotal[2])}">{{yesTotal[2]||"0"}}</li>
                <li class="digitCeil" :class="{yest:(yesTotal[1])}">{{yesTotal[1]||"0"}}</li>
                <li class="digitCeil" :class="{yest:(yesTotal[0])}">{{yesTotal[0]||"0"}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import Util from '../../../js/util';
    import httpApi from '../../../js/httpApi';
    export default {
        props:[],
        data:function(){
            return {
                id:"mtTotalCount",
                timeout:null,
                curHZ:'0000000',
                curNB:'0000000',
                yesTotal:'0000000',
                time:Util.getDateByStamp(Date.now(),'hh:mm:ss'),
                curDailyCount:0,
                totalDailyCount:0,
                countInterval:null
            }
        },
        computed:{
            correctedValue:function(){//修正值，1000-4999以内的随机数
                let rate = Math.random();
                rate =(rate>0.1?rate:0.1);
                return parseInt(rate*8000);
            },
        },
        methods:{
            init:function(){

            },
            watchDate:function(){
                let _this =this;
                let now =Date.now();
                this.time=Util.getDateByStamp(now,'hh:mm:ss');
                setTimeout(_this.watchDate,1000);
            },
            getData:function(){
                let _this =this;
                httpApi.getTotalCount().then(res=>res.json()).then(res=>{
                    if(res.code=="100000"){
//                        let strHZ =res.dataBody[0]['0571'].toString();
//                        _this.curHZ =strHZ.split("").reverse().join("");
                        let strNB =res.dataBody[0]['0574'].toString(),
                            strYesT =res.dataBody[1]['total'].toString();
                        _this.curNB =strNB.split("").reverse().join("");
                        _this.yesTotal =strYesT.split("").reverse().join("");
                        //---------动态显示杭州地铁实时数据---------start
                        if(!window.localStorage.getItem("curDailyCount")||(new Date().getTime()-window.localStorage.getItem("lastCountTime"))>5*60*1000){//第一次登陆,无历史记录，或者是页面打开间隔大于5分钟,重新计算显示值
                            _this.curDailyCount = res.dataBody[0]['0571'] - _this.correctedValue;
                            _this.curDailyCount =(_this.curDailyCount<0?0:_this.curDailyCount);
                        }else{//从存储中取关闭页面时的值，并加上延迟时间。
                            _this.curDailyCount =parseInt(window.localStorage.getItem("curDailyCount"))+parseInt(window.localStorage.getItem("step"))*Math.floor(((new Date().getTime()-window.localStorage.getItem("lastCountTime"))/(1000*5))) ;
                        }
                        _this.totalDailyCount =res.dataBody[0]['0571'];
                        if(_this.curDailyCount>=_this.totalDailyCount){
                            _this.curDailyCount=_this.totalDailyCount;
                        }
                        let strHZ = _this.curDailyCount.toString();
                        _this.curHZ =strHZ.split("").reverse().join("");
                        _this.dynamicShowDailyCount();
                        //---------动态显示杭州地铁实时数据---------end
                    }else{
                        _this.curHZ='0000000';
                        _this.curNB='0000000';
                        _this.yesTotal='0000000';
                    }
                });

                setTimeout(_this.getData,1000*60*5);
            },
            dynamicShowDailyCount:function(){
                let _this =this;
                let frequency = 1000*3,  //刷新频率为5秒
                    total =1000*60*5;  //总计间隔5分钟
                let step = Math.floor((_this.totalDailyCount-_this.curDailyCount)/((total/frequency)+1)); //每隔一次刷新频率需要增加的数量
                window.localStorage.setItem("step",step);
                window.clearInterval(_this.countInterval);
                if(_this.curDailyCount>=_this.totalDailyCount){
                    _this.curDailyCount=_this.totalDailyCount;
                    window.clearInterval(_this.countInterval);
                }
                _this.countInterval =window.setInterval(function(){
                    _this.curDailyCount =parseInt(_this.curDailyCount)+step;

                    let strHZ = _this.curDailyCount.toString();
                    _this.curHZ =strHZ.split("").reverse().join("");

                    if(_this.curDailyCount>=_this.totalDailyCount){
                        _this.curDailyCount=_this.totalDailyCount;
                        window.clearInterval(_this.countInterval);
                    }
                    window.localStorage.setItem("curDailyCount",_this.curDailyCount);
                    window.localStorage.setItem("lastCountTime",new Date().getTime());
                },frequency);
            },
        },

        mounted:function(){
            let _this =this;
            _this.getData();
            _this.watchDate();
        }
    }
</script>