<!--全省客流统计总览-->
<style>
    #mainCount{
        width: 100%;
        height: 100%;
        position: relative;
        color:#fff;
        padding-top:36px;
    }
    .flexCenter{
        display: flex;
        flex-wrap:wrap;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        position: relative;
    }
    .cateCountContainer{
        display: flex;
        height: 100%;
        width: 100%;
    }
    .cateCountContainer li{
        flex:1;
        height: 100%;
    }
    .today,.yesterday{
        border-radius: 50%;
        margin-bottom: 6px;
    }
    .today{
        border:2px solid #fff;
    }
    .footMark{
        width: 100%;
        position: absolute;
        bottom:0;
        text-align: center;
    }
</style>
<template>
    <div id="mainCount">
        <div class="flashFont" style="font-size: 20px;text-align: center;width: 100%;position: absolute;top:0;left:0;">{{title}}</div>
        <ul class="cateCountContainer">
            <li class="flexCenter"><div class="today flexCenter" :style='{width:radioSize+"px",height:radioSize+"px",borderColor:"#2ec7c9"}'><p style="font-size: 20px;font-weight: bold;margin-bottom: 6px;">{{data.today.ptHZ}}</p><p style="font-size: 14px;">人次</p></div><p class="footMark"><span>杭州客运(今日)</span></p></li>
            <li class="flexCenter"><div class="today flexCenter" :style='{width:radioSize+"px",height:radioSize+"px",borderColor:"#b6a2de"}'><p style="font-size: 20px;font-weight: bold;margin-bottom: 6px;">{{data.today.mt}}</p><p style="font-size: 14px;">人次</p></div><p class="footMark"><span>全省地铁(今日)</span></p></li>
            <li class="flexCenter"><div class="today flexCenter" :style='{width:radioSize+"px",height:radioSize+"px",borderColor:"#5ab1ef"}'><p style="font-size: 20px;font-weight: bold;margin-bottom: 6px;">{{data.today.wt}}</p><p style="font-size: 14px;">人次</p></div><p class="footMark"><span>全省水运(今日)</span></p></li>
            <li class="flexCenter"><div class="yesterday flexCenter" :style='{width:radioSize+"px",height:radioSize+"px",backgroundColor:"#2ec7c9"}'><p style="font-size: 20px;font-weight: bold;margin-bottom: 6px;">{{data.yesterday.ptHZ}}</p><p style="font-size: 14px;">人次</p></div><p class="footMark"><span>全省客运(昨日)</span></p></li>
            <li class="flexCenter"><div class="yesterday flexCenter" :style='{width:radioSize+"px",height:radioSize+"px",backgroundColor:"#b6a2de"}'><p style="font-size: 20px;font-weight: bold;margin-bottom: 6px;">{{data.yesterday.mt}}</p><p style="font-size: 14px;">人次</p></div><p class="footMark"><span>全省地铁(昨日)</span></p></li>
            <li class="flexCenter"><div class="yesterday flexCenter" :style='{width:radioSize+"px",height:radioSize+"px",backgroundColor:"#5ab1ef"}'><p style="font-size: 20px;font-weight: bold;margin-bottom: 6px;">{{data.yesterday.wt}}</p><p style="font-size: 14px;">人次</p></div><p class="footMark"><span>全省水运(昨日)</span></p></li>
        </ul>
    </div>
</template>
<script>
    import util from '../../js/util';
    import httpApi from '../../js/httpApi';
    export default{
        props:[],
        data:function(){
            return {
                title:"全省客流量统计一览",
                radioSize:30,
                data:{
                  today:{
                      ptHZ:0,
                      mt:0,
                      wt:'-'
                  },
                  yesterday:{
                      ptHZ:0,
                      mt:0,
                      wt:'-'
                  }
                }
            }
        },
        methods:{
            getRadioSize:function(){
                let pNode =document.querySelector('li.flexCenter');
//                this.radioSize = Math.min(pNode.offsetWidth*0.5,pNode.offsetHeight-24);
                this.radioSize = pNode.offsetHeight-80;
            },
            getCountData:function(){
                let _this =this;
                httpApi.getHomePageStatistics().then(res=>res.json()).then(res=>{
                    if(res.code=="100000"){
                        _this.data.today.ptHZ =res.dataBody.totayPassengerFlowOfHz;
                        _this.data.today.mt =res.dataBody.subwayCll[util.getDateByStamp(Date.now(),"yyyyMMdd")];
                        _this.data.yesterday.ptHZ =res.dataBody.yuestodayTotalPassengerFlow;
                        _this.data.yesterday.mt =res.dataBody.subwayCll[util.getDateByStamp(Date.now()-1000*60*60*24,"yyyyMMdd")];
                    }
                });
            }
        },
        mounted:function(){
            let _this = this;
            this.getRadioSize();
            this.getCountData();
            window.setInterval(function(){
                _this.getCountData();
            },1000*60);
        }
    }
</script>