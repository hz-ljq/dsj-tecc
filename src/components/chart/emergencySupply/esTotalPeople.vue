<!--应急物资——全省应急人员统计-->
<style>
    #esTotalPeople{
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
<template>
    <div id="esTotalPeople"></div>
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
                id:"esTotalPeople",
                chart:null,
                option:{
                    title: {
                        text: '全省应急人员统计',
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
                        data: [400,500,600,300,200]
                    }]
                }
            }
        },
        methods:{
            initChart:function(){
                this.chart=echarts.init(document.getElementById('esTotalPeople'),"myTheme");
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
