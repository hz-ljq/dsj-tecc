<!--地铁——地铁站topN流量排名-->
<style>
    #mtTopnStationFlow{
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
<template>
    <div id="mtTSF">
        <div id="mtTopnStationFlow"></div>
    </div>

</template>
<script>
    import echarts from 'echarts';
    // import '../../../js/myTheme';
    import '../../../../static/myTheme';
    import util from '../../../js/util';
    import httpApi from '../../../js/httpApi';
    export default {
        props:["code"],
        data:function(){
            return {
                id:"mtTopnStationFlow",
                chart:null,
                timeout:null,
                stationList:[{id:1,name:"杭州",value:"0571"},{id:2,name:"宁波",value:"0574"}],
                option:{
//                    title: {
//                        text: '地铁站点（TOP 5）实时流量排名',
//                        textStyle:{
//                            fontSize:16,
//                            fontWeight:"bold",
//                            color:"#ffe252"
//                        },
//                        right:10
//                    },
                    grid:{
                        left:60,
                        bottom:26,
                        top:46,
                        right:40
                    },
                    tooltip: {},
                    legend: {
                        data:['入站流量','出站流量'],
                        top:'25',
                        textStyle:{
                            color:'#fff'
                        }
                    },
                    xAxis: {
                        splitLine:{show: false},
                        axisLabel: {
                            interval:0
//                            margin:0,
//                            rotate:5
                        },
                        zlevel:10,
                        data: []
                    },
                    yAxis: {name:'人次',splitLine:{show: false}},
                    series: [
                        {
                            name: '入站流量',
                            type: 'bar',
                            barWidth:10,
                            data: []
                        },
                        {
                            name: '出站流量',
                            type: 'bar',
                            barWidth:10,
                            data: []
                        },
                    ]
                }
            }
        },
        watch:{
            code:function(val){
                this.getData();
            }
        },
        methods:{
            initChart:function(){
                window.ad=this;
                this.chart=echarts.init(document.getElementById('mtTopnStationFlow'),"myTheme");
                this.chart.setOption(this.option);
            },
            getData:function(cb){
                var _this =this;
                clearTimeout(_this.timeout);
                httpApi.getTopNStation({n:5,areaCode:_this.code}).then(res=>res.json()).then(res=>{
                    if(res.code==100000){
                        let xData =[],yData1 =[],yData2 =[];
                        let data =res.dataBody;
                        for(let i=0,n=data.length;i<n;i++){
                            xData.push(data[i].sname);
                            yData1.push(data[i].entryFlow);
                            yData2.push(data[i].exitFlow);
                        }
                        _this.option.xAxis.data =xData;
                        _this.option.series[0].data =yData1;
                        _this.option.series[1].data =yData2;
                        _this.chart.setOption(_this.option);
                        cb&&cb.call(null,xData);
                        if(_this.code=="0571"){
                            _this.$parent.hotDot_hz =xData;
                        }else if(_this.code=="0574"){
                            _this.$parent.hotDot_nb =xData;
                        }
                    }
                });
                _this.timeout = setTimeout(_this.getData,1000*60*5);
            }
        },
        mounted:function(){
            let _this =this;
            this.initChart();
        }
    }
</script>
