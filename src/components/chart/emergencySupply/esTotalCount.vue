<!--应急物资——全省应急物资情况汇总-->
<style>
    #esTotalCount{
        width: 100%;
        height: 100%;
        position: relative;
        color:#fff;
        display: flex;
    }
    .panItem{
        flex:1;
        background-size:100% 100%;
        text-align: center;
        font-size: 34px;
        font-weight: bold;
        line-height: 11;
    }
    .es-item{
        flex:1;
        display: flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        cursor: pointer;
    }
</style>
<template>
    <div id="esTotalCount">
        <div class="panItem" :style="{backgroundImage:'url('+resource.pan_cCount+')'}">{{cCount}}</div>
        <div class="panItem" :style="{backgroundImage:'url('+resource.pan_tCount+')'}">{{tCount}}</div>
        <div class="panItem" :style="{backgroundImage:'url('+resource.pan_pCount+')'}">{{pCount}}</div>
        <div class="panItem" :style="{backgroundImage:'url('+resource.pan_eCount+')'}">{{eCount}}</div>
    </div>
</template>
<script>
    import util from '../../../js/util';
    import httpApi from '../../../js/httpApi';

    import pan_cCount from '../../../assets/es/pan_cCount.png';
    import pan_eCount from '../../../assets/es/pan_eCount.png';
    import pan_pCount from '../../../assets/es/pan_pCount.png';
    import pan_tCount from '../../../assets/es/pan_tCount.png';

    export default {
        props:[],
        data:function(){
            return {
                resource:{
                    pan_cCount,
                    pan_eCount,
                    pan_pCount,
                    pan_tCount
                },
                id:"esTotalCount",
                cCount:0,
                eCount:0,
                pCount:0,
                tCount:0
            }
        },
        methods:{
            getData:function(){
                var _this =this;
                httpApi.getSummaryOfEmergencyMaterials().then(res=>res.json()).then(res=>{
                    if(res.code=="100000"){
                        _this.cCount =res.dataBody[0].cCount;
                        _this.eCount =res.dataBody[0].eCount;
                        _this.pCount =res.dataBody[0].pCount;
                        _this.tCount =res.dataBody[0].tCount;
                    }
                });
            }
        },
        computed:{

        },
        mounted:function(){
            this.getData();
        }
    }
</script>
