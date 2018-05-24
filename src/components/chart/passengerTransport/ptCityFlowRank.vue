<!--客运——全省区域流量排名图-->
<style>
    #ptCityFlowRank{
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
<template>
    <div id="ptCityFlowRank"></div>
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
                id:"ptCityFlowRank",
                chart:null,
                option:{
//                    title: {
//                        text: '全省客运区域流量排名Top 5 '+util.getDateByStamp(Date.now() - 1000*60*60*24,"yyyy-MM-dd"),
//                        textStyle:{
//                            fontSize:16,
//                            fontWeight:"bold",
//                            color:"#ffe252"
//                        },
//                        right:10
//                    },
                    grid:{
                        left:50,
                        bottom:26,
                        top:45,
                        right:40
                    },
                    tooltip: {},
                    legend: {
                        data:[]
                    },
                    xAxis: {
                        splitLine:{show: false},
                        data: []
                    },
                    yAxis: {name:'人次',splitLine:{show: false}},
                    series: [{
                        type: 'bar',
                        data: []
                    }]
                }
            }
        },
        methods:{
            initChart:function(){
                this.chart=echarts.init(document.getElementById('ptCityFlowRank'),"myTheme");
                this.chart.setOption(this.option);
            },
            getData:function(){
                let _this =this;
                httpApi.getRankingOfRegionalFlow({date:util.getDateByStamp(Date.now() - 1000*60*60*24,"yyyy-MM-dd")}).then(res=>res.json()).then(res=>{
                    if(res.code=="100000"){
                        let data =res.dataBody;
                        let xData=[],yData=[];
                        for(let i=0,n=data.length;i<n;i++){
                            xData.push(data[i].dq);
                            yData.push(data[i].checkNum);
                        }
                        _this.option.xAxis.data =xData;
                        _this.option.series[0].data =yData;
                        _this.chart.setOption(_this.option);
                    }
                })
            }
        },
        mounted:function(){
            let _this =this;
            this.initChart();
            this.getData();
            window.setInterval(function(){//每个小时刷新一次数据
                _this.option.title.text ='全省客运区域流量排名 '+util.getDateByStamp(Date.now() - 1000*60*60*24,"yyyy-MM-dd");
                _this.chart.setOption(_this.option);
                _this.getData();
            },1000*60*60);
        }
    }
</script>
