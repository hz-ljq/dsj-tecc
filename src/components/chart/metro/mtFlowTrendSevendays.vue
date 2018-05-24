<!--地铁——7天流量趋势图-->
<style>
    #mtFlowTrendSevendays{
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
<template>
    <div id="mtFlowTrendSevendays"></div>
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
                id:"mtFlowTrendSevendays",
                chart:null,
                timeout:null,
                option:{
//                    title: {
//                        text: '地铁近7天客流趋势',
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
                    yAxis: {type:"value",name:"万人次",splitLine:{show: false}},
                    series: [
                        {
                            name: '杭州地铁',
                            type: 'line',
                            data: []
                        },
                        {
                            name: '宁波地铁',
                            type: 'line',
                            data: []
                        }
                    ]
                }
            }
        },
        methods:{
            initChart:function(){
                this.chart=echarts.init(document.getElementById('mtFlowTrendSevendays'),"myTheme");
                this.chart.setOption(this.option);
            },
            getData:function(){
                let _this =this;
                clearTimeout(_this.timeout);
                let codeArr =['0571','0574'];
                let fetchArr =codeArr.map(i=>{
                    return httpApi.getDaysFlow({areaCode:i}).then(res=>res.json());
                });
                Promise.all(fetchArr).then(function(resArr){
                    let xData =[];
                    for(let i=0,n=resArr[0].dataBody.length;i<n;i++){
                        let dataStr =resArr[0].dataBody[i].businessId.substr(4).substr(0,2)+"-"+resArr[0].dataBody[i].businessId.substr(4).substr(2);
                        xData.push(dataStr);
                    }
                    _this.option.xAxis.data =xData;
                    for(let i=0,n=resArr.length;i<n;i++){
                        if(resArr[i].code=="100000"){
                            _this.option.series[i].data=[];
                            let dataBody =resArr[i].dataBody;
                            for(let j=0,m=dataBody.length;j<m;j++){
                                _this.option.series[i].data.push((dataBody[j].cll/10000).toFixed(2));
                            }
                        }
                    }
                    _this.chart.setOption(_this.option);
                });
                _this.timeout =setTimeout(_this.getData,1000*60*60);
            }
        },
        mounted:function(){
            let _this =this;
            this.initChart();
            this.getData();
        }
    }
</script>
