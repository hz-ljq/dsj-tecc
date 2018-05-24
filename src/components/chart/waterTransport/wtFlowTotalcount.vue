<!--水运——全省水运流量统计-->
<style>
    #wtFlowTotalcount{
        width: 100%;
        height: 100%;
        position: relative;
        color:#fff;
        padding:5px 14px 5px;
    }
    .dataContainer{
        height: calc(100% - 18px);
        padding:10px 40px;
    }
    .dataBox{
        height: 80px;
        width: 40%;
        text-align: center;
        display: flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        border-radius: 40px;
        box-shadow: 0 0 10px rgba(255,255,255,0.4);
    }
</style>
<template>
    <div id="wtFlowTotalcount">
        <p style="text-align: right;font-size: 16px;font-weight: bold;color:#ffe252">{{title}}</p>
        <div class="dataContainer">
            <div id="total-people" class="dataBox" style="float: left;background-color: #2ec7c9;">
                <p style="font-size: 20px;font-weight: bold;">{{data.totalPeople}}</p>
                <p>人次</p>
            </div>
            <div id="total-ship" class="dataBox" style="float: right;background-color: #b6a2de;">
                <p style="font-size: 20px;font-weight: bold;">{{data.totalShip}}</p>
                <p>船次</p>
            </div>
        </div>
    </div>
</template>
<script>
    import util from '../../../js/util';
    import httpApi from '../../../js/httpApi';
    export default {
        props:[],
        data:function(){
            return {
                id:"wtFlowTotalcount",
                title:"全省水运流量汇总 "+'截止至:'+ util.getDateByStamp(Date.now(),'yyyy-MM-dd hh:mm'),
                data:{
                    totalPeople:"-",
                    totalShip:"-"
                }
            }
        },
        methods:{
            initChart:function(){

            },
            getData:function({dq="",type=1}={dq:"",type:1}){
                var _this =this;

            }
        },
        mounted:function(){
            this.initChart();
            this.getData();
        }
    }
</script>