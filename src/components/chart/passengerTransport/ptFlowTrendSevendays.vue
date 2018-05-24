<!--客运——各地区近7天流量趋势图-->
<style>
    #ptFlowTrendSevendays{
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
<template>
    <div id="ptFlowTrendSevendays"></div>
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
                id:"ptFlowTrendSevendays",
                chart:null,
                option:{
                    tooltip: {
                        trigger: 'axis'
                    },
//                    legend: {
//                        top:22,
////                        orient:'vertical',
//                        type:'scroll',
//                        data:['全省','杭州','湖州','嘉兴','绍兴','温州']
//                    },
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
                        data: []
                    },
                    yAxis: {type:"value",name:"人次",splitLine:{show: false}},
                    series: [
                        {
                            name: '全省',
                            type: 'line',
                            data: []
                        },
//                        {
//                            name: '杭州',
//                            type: 'line',
//                            data: []
//                        },
//                        {
//                            name: '湖州',
//                            type: 'line',
//                            data: []
//                        },
//                        {
//                            name: '嘉兴',
//                            type: 'line',
//                            data: []
//                        },
//                        {
//                            name: '绍兴',
//                            type: 'line',
//                            data: []
//                        },
//                        {
//                            name: '温州',
//                            type: 'line',
//                            data: []
//                        }
//                        {
//                            name: '金华',
//                            type: 'line',
//                            data: []
//                        }
                    ]
                }
            }
        },
        methods:{
            initChart:function(){
                this.chart=echarts.init(document.getElementById('ptFlowTrendSevendays'),"myTheme");
                this.chart.setOption(this.option);
            },
            getData:function(){
                let _this =this;
//                let codeArr =['','0571','0572','0573','0575','0577'];
                let codeArr =[''];
                let fetchArr =codeArr.map(i=>{
                    return httpApi.getTrendOfPassengerFlowInSevenDays({dq:i}).then(res=>res.json());
                });
                Promise.all(fetchArr).then(function(resArr){
                    if(resArr[0].code=="100000"){
                        _this.option.xAxis.data =[];
                        for(let i in resArr[0].dataBody){
                            _this.option.xAxis.data.push(util.getDateByStamp(new Date(i),'MM-dd'));
                        }
                        for(let i=0,n=resArr.length;i<n;i++){
                            let valArr =[];
                            for(let j in resArr[i].dataBody){
                                valArr.push(resArr[i].dataBody[j]);
                            }
                            _this.option.series[i].data =valArr;
                        }
                        _this.chart.setOption(_this.option);
                    }

                });
                setTimeout(function(){_this.getData},1000*60*60);
           }
        },
        mounted:function(){
            let _this =this;
            this.initChart();
            this.getData();
        }
    }
</script>
