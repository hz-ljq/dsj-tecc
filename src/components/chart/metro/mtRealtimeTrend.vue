<!--地铁——24小时流量趋势图-->
<style>
    #mtRealtimeTrend{
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
<template>
    <div id="mtRealtimeTrend"></div>
</template>
<script>
    import echarts from 'echarts';
    // import '../../../js/myTheme';
    import '../../../../static/myTheme';
    import util from '../../../js/util';
    import httpApi from '../../../js/httpApi';
    export default {
        props:[],
        data:function(){
            return {
                id:"mtRealtimeTrend",
                chart:null,
                timeout:null,
                option:{
//                    title: {
//                        text: '地铁实时流量趋势图',
//                        textStyle:{
//                            fontSize:16,
//                            fontWeight:"bold",
//                            color:"#ffe252"
//                        },
//                        right:10
//                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend:{
                        top:22,
                        data:["杭州地铁","宁波地铁"]
                    },
                    grid:{
                        left:60,
                        bottom:26,
                        top:46,
                        right:40
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        splitLine:{show: false},
                        position:{
                            bottom:12
                        },
                        axisLabel: {
                            interval:0
                        },
                        name:"时刻",
                        data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
                    },
                    yAxis: {type:"value",name:"人次",splitLine:{show: false}},
                    series: [
                        {
                            name: '杭州地铁',
                            type: 'line',
                            data: []
                        },
//                        {
//                            name: '杭州预测',
//                            type: 'line',
//                            itemStyle:{
//                                normal:{
//                                    lineStyle:{
//                                        type:'dotted'
//                                    }
//                                }
//                            },
//                            data: []
//                        },
                        {
                            name: '宁波地铁',
                            type: 'line',
                            data: []
                        }
//                        {
//                            name: '宁波预测',
//                            type: 'line',
//                            itemStyle:{
//                                normal:{
//                                    lineStyle:{
//                                        type:'dotted'
//                                    }
//                                }
//                            },
//                            data: []
//                        }
                    ]
                }
            }
        },
        methods:{
            initChart:function(){
                this.chart=echarts.init(document.getElementById('mtRealtimeTrend'),"myTheme");
                this.chart.setOption(this.option);
            },
            getData:function(){
                let _this =this;
                clearTimeout(_this.timeout);
                let codeArr =['0571','0574'];
                let fetchArr =codeArr.map(i=>{
                    return httpApi.getRealTimeTrendMapOfSubwayFlow({areaCode:i}).then(res=>res.json());
                });
                Promise.all(fetchArr).then(function(resArr){
                    let hData =resArr[0],nData =resArr[1];
                    let hyData1 =[],hyData2=[],nyData1=[],nyData2=[];
                    if(hData.code=="100000"){
                        let tempDataH =hData.dataBody[0].hourFlow;
                        for(let i=0,n=Math.min(24,tempDataH.length);i<n;i++){
                            if(tempDataH[i].type=="1"){
                                hyData1.push(tempDataH[i].total);
//                                hyData2.push("");
                            }else if(tempDataH[i].type=="2"){
                                hyData1.push("");
//                                hyData2.push(tempDataH[i].total);
                            }
                        }
                    }
                    if(nData.code=="100000"){
                        let tempDataN =nData.dataBody[0].hourFlow;
                        for(let i=0,n=Math.min(24,tempDataN.length);i<n;i++){
                            if(tempDataN[i].type=="1"){
                                nyData1.push(tempDataN[i].total);
//                                nyData2.push("");
                            }else if(tempDataN[i].type=="2"){
                                nyData1.push("");
//                                nyData2.push(tempDataN[i].total);
                            }
                        }
                    }
                    _this.option.series[0].data =hyData1;
                    _this.option.series[1].data =nyData1;
//                    _this.option.series[2].data =nyData1;
//                    _this.option.series[3].data =nyData2;
                    _this.chart.setOption(_this.option);
                });
                _this.timeout =setTimeout(_this.getData,1000*60*5);
            }
        },
        mounted:function(){
            let _this =this;
            this.initChart();
            this.getData();
        }
    }
</script>
