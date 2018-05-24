<!--应急物资——各地市应急中心统计-->
<style>

</style>
<template>
    <div id="esCenterCount"></div>
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
                id:"esCenterCount",
                chart:null,
                option:{
                    grid:{
                        left:40,
                        bottom:26,
                        top:26,
                        right:20
                    },
                    tooltip: {},
                    legend: {
                        data:['公路管理机构','高速公路经营单位'],
                        top:'0',
                        right:"10",
                        textStyle:{
                            color:'#fff'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        splitLine:{show: false},
                    },
                    yAxis: {
                        type: 'value',
                        name:"个数",
                        splitLine:{show: false},
                        data: []
                    },
                    series: [
                        {
                            name: '公路管理机构',
                            type: 'bar',
                            data: [],
                            stack:'sum'
                        },
                        {
                            name: '高速公路经营单位',
                            type: 'bar',
//                            barWidth:10,
                            data: [],
                            stack:'sum'
                        },
                    ]
                }
            }
        },
        methods:{
            initChart:function(){
                this.chart=echarts.init(document.getElementById('esCenterCount'),"myTheme");
                this.chart.setOption(this.option);
            },
            getData:function(){
                var _this =this;
                httpApi.getEmergencyStationByUnitType().then(res=>res.json()).then(res=>{
                    if(res.code==100000&&res.dataBody){
                        let data =res.dataBody;
                        let xData =[],yData1=[],yData2 =[];
                        for(let i=0,n=data.length;i<n;i++){
                            xData.push(data[i].areaName);
                            yData1.push(data[i].detail[0].count);
                            yData2.push(data[i].detail[1].count);
                        }
                        _this.option.xAxis.data =xData;
                        _this.option.series[0].data =yData1;
                        _this.option.series[1].data =yData2;
                        _this.chart.setOption(_this.option);
                    }
                });
            }
        },
        mounted:function(){
            let _this =this;
            this.initChart();
            this.getData();
        }
    }
</script>
