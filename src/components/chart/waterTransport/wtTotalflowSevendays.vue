<!--水运——全省近7天水运流量趋势图-->
<style>
    #wtTotalflowSevendays{
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
<template>
    <div id="wtTotalflowSevendays"></div>
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
                id:"wtTotalflowSevendays",
                chart:null,
                option:{
                    title: {
                        text: '全省水运近7天流量汇总',
                        textStyle:{
                            fontSize:16,
                            fontWeight:"bold",
                            color:"#ffe252"
                        },
                        right:10
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid:{
                        left:40,
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
                        data: []
                    },
                    yAxis: {type:"value",name:"人次",splitLine:{show: false}},
                    series: [
                        {
                            name: '客流量',
                            type: 'line',
                            data: []
                        }
                    ]
                }
            }
        },
        methods:{
            initChart:function(){
                this.chart=echarts.init(document.getElementById('wtTotalflowSevendays'),"myTheme");
                this.chart.setOption(this.option);
            },
            getData:function(){
                var _this =this;

            }
        },
        mounted:function(){
            this.initChart();
            this.getData();
        }
    }
</script>
