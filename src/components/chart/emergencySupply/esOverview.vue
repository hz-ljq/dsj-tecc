<!--应急物资——全省应急物资情况汇总-->
<style>
    #esOverview{
        width: 100%;
        height: 100%;
        position: relative;
        color:#fff;
        padding:10px;
    }
    #esOverviewContainer{
        width: 100%;
        height: calc(100% - 18px);
        display: flex;
        padding-top:4px;
    }
    .es-item{
        flex:1;
        display: flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        cursor: pointer;
    }
    .es-item .item-val{
        /*height: calc(100% - 20px);*/
        display: flex;
        flex-wrap:wrap;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        font-size: 22px;
        font-weight: bold;
        border-radius: 50%;
        box-shadow:0 0 10px rgba(255,255,255,0.4);
    }
    .item-title{font-size:14px;margin-top:4px;}
</style>
<template>
    <div id="esOverview">
        <p style="text-align: right;font-size: 16px;color:#ffe252;font-weight: bold;">{{title}}</p>
        <div id="esOverviewContainer">
            <div class="es-item" @click="showESmap">
                <div class="item-val" :style='{width:radioSize+"px",height:radioSize+"px",backgroundColor:"#2ec7c9"}'>{{data.cCount}}</div>
                <div class="item-title">应急中心数</div>
            </div>
            <div class="es-item" @click="showESmap">
                <div class="item-val" :style='{width:radioSize+"px",height:radioSize+"px",backgroundColor:"#b6a2de"}'>{{data.eCount}}</div>
                <div class="item-title">应急物资数</div>
            </div>
            <div class="es-item" @click="showESmap">
                <div class="item-val" :style='{width:radioSize+"px",height:radioSize+"px",backgroundColor:"#5ab1ef"}'>{{data.pCount}}</div>
                <div class="item-title">应急人员数</div>
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
                id:"esOverview",
                title:"全省应急物资情况汇总",
                radioSize:0,
                data:{
                    cCount:0,
                    eCount:0,
                    pCount:0
                }
            }
        },
        methods:{
            showESmap:function(){
                this.$root.$refs.carousel.setActiveItem('esMainMap');
            },
            getData:function(){
                var _this =this;
                httpApi.getSummaryOfEmergencyMaterials().then(res=>res.json()).then(res=>{
                    if(res.code=="100000"){
                        _this.data.cCount =res.dataBody[0].cCount;
                        _this.data.eCount =res.dataBody[0].eCount;
                        _this.data.pCount =res.dataBody[0].pCount;
                    }
                });
            },
            getRadioSize:function(){
                let pNode =document.querySelector('.es-item');
                this.radioSize = Math.min(pNode.offsetWidth*0.8,pNode.offsetHeight-20);
            }
        },
        computed:{

        },
        mounted:function(){
            this.getRadioSize();
            this.getData();
            window.setInterval(function(){},1000*60*60*12);
        }
    }
</script>