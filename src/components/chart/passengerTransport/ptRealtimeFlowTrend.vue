<!--客运——杭州实时流量趋势图-->
<style>
    #ptRealtimeFlowTrend{
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
<template>
    <div id="ptRealtimeFlowTrend"></div>
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
                id:"ptRealtimeFlowTrend",
                chart:null,
                option:{
//                    title: {
//                        text: '杭州市客运实时流量趋势图 '+util.getDateByStamp(Date.now(),"yyyy-MM-dd"),
//                        textStyle:{
//                            fontSize:14,
//                            fontWeight:"normal",
//                            color:"#fff"
//                        },
//                        right:10
//                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid:{
                        left:40,
                        bottom:22,
                        top:40,
                        right:40
                    },
                    legend: {
                        top:18,
//                        data:['昨日','今日','今日预计']
                        data:['今日','昨日']
                    },
                    xAxis: {
                        name:"时刻",
                        type: 'category',
                        splitLine:{show: false},
                        boundaryGap: false,
                        position:{
                          bottom:12
                        },
                        data: []
                    },
                    yAxis: {type:"value",name:"千人次",splitLine:{show: false}},
                    series: [
                        {
                            name: '今日',
                            type: 'line',
                            data: []
                        },
                        {
                            name: '昨日',
                            type: 'line',
                            data: []
                        },
//                        {
//                            name: '今日预计',
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
                this.chart=echarts.init(document.getElementById('ptRealtimeFlowTrend'),"myTheme");
                this.chart.setOption(this.option);
            },
            getData:function(){
                var _this =this;
                httpApi.getRealTimeFlowTrendMap().then(res=>res.json()).then(res=>{
                    if(res.code=="100000"&&res.dataBody.length){
                        //databody[0]为昨日数据，[1]为今日数据，今日type=2的，为今日预计数据
                        //new  databody[0]为今日数据，[1]为昨日数据，今日type=2的，为今日预计数据
                        let data0 =res.dataBody[0].hourFlow||[],
                            data1 =(res.dataBody[1]?res.dataBody[1].hourFlow:[]);
                        let xData =[],yData0=[],yData1 =[],yData2 =[];
                        for(let i=0,n=data0.length;i<n;i++){
                            xData.push(data0[i].hour-1);
                            if(data0[i].type===1){
                                yData0.push((data0[i].total/1000).toFixed(2));
                            }
                        }
                        for(let i=0,n=data1.length;i<n;i++){
                            yData1.push((data1[i].total/1000).toFixed(2));
//                            if(data1[i].type===1){
//
//                                yData2.push("");
//                            }else{
//                                yData1.push("");
//                                yData2.push((data0[i].total/1000).toFixed(2));
//                            }
                        }
                        _this.option.xAxis.data = xData;
                        _this.option.series[0].data =yData0;
                        _this.option.series[1].data =yData1;
//                        _this.option.series[2].data =yData2;
                        _this.chart.setOption(_this.option);
                    }
                });
                setTimeout(_this.getData,1000*60*10);
            }
        },
        mounted:function(){
            this.initChart();
            this.getData();
        }
    }
</script>
