<!--地铁——流量对比分析-->
<style>
    #mtFlowAnalysis .el-input--mini .el-input__inner {
        height: 20px;
        line-height: 20px;
        background-color: transparent;
        color: #fff;
        font-weight: bold;
        font-size: 14px;
        border: none;
    }
    #mtFlowAnalysis .el-select .el-input .el-select__caret{
        color:#fff;
    }
    #mtFlowAnalysis{
        width: 100%;
        height: 100%;
        position: relative;
        color:#fff;
        padding:35px 10px 10px;
    }
    .mtFAchartContainer{
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
    }
    .mtFAchartContainer .rateText{
        width: 40%;
        height: 50%;
        position: absolute;
        z-index: 2;margin: auto;
        left: 0; right: 0;top: 0; bottom: 0;
        display: flex;
        flex-wrap:wrap;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        font-size:18px;
    }
    .mtFAitem{
        flex:1;
        display: flex;
        flex-wrap:wrap;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        height: 100%;
        position: relative;
    }
    .mtFAitemVal{
        border-radius: 50%;
        margin-bottom: 6px;
        display: flex;
        flex-wrap:wrap;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }
</style>
<template>
    <div id="mtFlowAnalysis">
        <p style="text-align: right;font-size: 16px;font-weight: bold;color:#ffe252; width:calc(100% - 20px);position: absolute;top:10px;right:10px;">{{title}}</p>
        <el-select style="position: absolute;z-index: 2;left:120px;top:8px;width: 80px;" size="mini"  v-model="dq" @change="getData()" placeholder="请选择">
            <el-option v-for="station in stationList" :key="station.id" :label="station.name" :value="station.value"></el-option>
        </el-select>
        <el-select style="position: absolute;z-index: 2;left:200px;top:8px;width: 100px;" size="mini"  v-model="type" @change="getData('week')" placeholder="请选择">
            <el-option v-for="type in typeList" :key="type.id" :label="type.name" :value="type.value"></el-option>
        </el-select>
        <div class="mtFAchartContainer">
            <div class="rateText" :style='{color:(rate.zf>=1?"#FFE252":"lightblue")}'>{{rate.text}} {{rate.value}}%</div>
            <div class="mtFAitem">
                <div class="mtFAitemVal" :style='{width:left.size+"px",height:left.size+"px",backgroundColor:"#2ec7c9"}'>
                    <p>{{left.value}}</p>
                    <p style="font-size: 14px;">人次</p>
                </div>
                <p style="position: absolute;bottom:0;font-size: 14px;width:100%;text-align: center;">{{left.text}}</p>
            </div>
            <div class="mtFAitem">
                <div class="mtFAitemVal" :style='{width:right.size+"px",height:right.size+"px",backgroundColor:"#b6a2de"}'>
                    <p>{{right.value}}</p>
                    <p style="font-size: 14px;">人次</p>
                </div>
                <p style="position: absolute;bottom:0;font-size: 14px;width:100%;text-align: center;">{{right.text}}</p>
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
                id:"mtFlowAnalysis",
                title:"地铁流量对比分析",
                dq:"0571",
                type:"1",
                rate:{
                    value:0,
                    text:"增长",
                    zf:1,
                },
                left:{
                    value:0,
                    text:'-',
                    size:70
                },
                right:{
                    value:0,
                    text:'-',
                    size:70
                },
                stationList:[
                    {id:1,name:"杭州",value:"0571"},
                    {id:2,name:"宁波",value:"0574"}
                ],
                typeList:[
                    {id:11,name:"日环比",value:"1"},
                    {id:12,name:"周环比",value:"2"}
                ]

            }
        },
        methods:{
            getData:function(type){
                let _this =this;
                httpApi.getAnalysisOfSybwayFlow({areaCode:_this.dq,type:_this.type}).then(res=>res.json()).then(res=>{
                    if(res.code=="100000"){
                        let data =res.dataBody.data;
                        let tempArr =[];
                        for(let i in data){
                            let json ={};
                            if(_this.type=="2"){
                                json.text ='第'+i+'周';
                            }else{
                                json.text=i.substr(0,4)+'-'+i.substr(4,2)+'-'+i.substr(6,2);
                            }
                            json.value = data[i];
                            tempArr.push(json);
                        }
                        _this.left.value =tempArr[0].value;
                        _this.left.text =tempArr[0].text;
                        if(tempArr[1]){
                            _this.right.value =tempArr[1].value;
                            _this.right.text =tempArr[1].text;
                        }else{
                            _this.right.value ='-';
                            _this.right.text ='-';
                        }

                        if(_this.left.value>_this.right.value){
                            _this.left.size =90;
                            _this.right.size =70;
                            _this.rate.zf = 0;
                        }else if(_this.left.value<_this.right.value){
                            _this.left.size =70;
                            _this.right.size =90;
                            _this.rate.zf = 1;
                        }else{
                            _this.left.size =70;
                            _this.right.size =70;
                            _this.rate.zf = 1;
                        }
                        if(tempArr[1]){
                            _this.rate.value =Math.abs((((_this.left.value-_this.right.value)/_this.left.value)*100).toFixed(1));
                        }else{
                            _this.rate.value ='-';
                        }
                         _this.rate.text = (res.dataBody.ratio>=1?"增长":"下降");

                    }
                })
            }
        },
        watch:{

        },
        mounted:function(){
            let _this =this;
            this.getData();
            window.setInterval(function(){
                _this.getData();
            },1000*60*10);
        }
    }
</script>