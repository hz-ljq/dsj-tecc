<style>
    #ptTotalCount{
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
    <div id="ptTotalCount">
        <div class="countItem">
            <div class="title"><span style="color:#fff;padding-right:12px;">杭州今日累计</span><span style="color:yellow;padding-left:10px;">{{time}}</span></div>
            <ul class="digitList">
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
            <div class="title"><span style="color:#fff;padding-right:12px;">全省昨日总计</span></div>
            <ul class="digitList">
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
                id:"ptTotalCount",
                timeout:null,
                curHZ:'0000000',
                yesTotal:'0000000',
                time:Util.getDateByStamp(Date.now(),'hh:mm:ss'),
            }
        },
        computed:{

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
                httpApi.getPassengerStationStatistics().then(res=>res.json()).then(res=>{
                    if(res.code=="100000"&&res.dataBody){
                        let strHZ =res.dataBody.hzFlow.toString(),
                            strYesT =res.dataBody.flow.toString();
                        _this.curHZ =strHZ.split("").reverse().join("");
                        _this.yesTotal =strYesT.split("").reverse().join("");

                    }else{
                        _this.curHZ='0000000';
                        _this.yesTotal='0000000';
                    }
                });
                setTimeout(_this.getData,1000*60*1);
            }
        },
        mounted:function(){
            let _this =this;
            _this.watchDate();
            _this.getData();
        }
    }
</script>