<!--应急物资——全省应急站点统计-->
<style>
    #esTotalStation{
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
<template>
    <div id="esTotalStation"></div>
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
                id:"esTotalStation",
                chart:null,
                option:{
                    title: {
                        text: '全省应急站点统计',
                        textStyle:{
                            fontSize:14,
                            fontWeight:"normal",
                            color:"#fff"
                        },
                        right:10
                    },
                    grid:{
                        left:40,
                        bottom:22,
                        top:40,
                        right:40
                    },
                    tooltip: {},
                    legend: {
                        data:[]
                    },
                    xAxis: {
                        splitLine:{show: false},
                        data: ["杭州","宁波","舟山","衢州","温州"]
                    },
                    yAxis: {name:'个',splitLine:{show: false}},
                    series: [{
                        type: 'bar',
                        data: [40,50,60,30,20]
                    }]
                }
            }
        },
        methods:{
            initChart:function(){
                this.chart=echarts.init(document.getElementById('esTotalStation'),"myTheme");
                this.chart.setOption(this.option);
            },
            getData:function() {
                let _this = this;
            }

        },
        mounted:function(){
            this.initChart();
            this.getData();
        }
    }
</script>
