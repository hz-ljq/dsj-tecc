<!--地铁——地铁站topN流量排名-->
<style>
    #mtTSF{
        width: 100%;
        height: 100%;
        position: relative;
    }
    #mtTSF .el-input--mini .el-input__inner {
        height: 20px;
        line-height: 20px;
        width: 80px;
        background-color: transparent;
        color: #fff;
        font-weight: bold;
        font-size: 14px;
        border: none;
    }
    #mtTSF .el-select .el-input .el-select__caret{
        color:#fff;
    }
    #mtTopnStationFlow{
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
<template>
    <div id="mtTSF">
        <el-select style="position: absolute;z-index: 2;left:120px;top:2px;width: 80px;" size="mini"  v-model="curStation" @change="getData()" placeholder="请选择">
            <el-option v-for="station in stationList" :key="station.id" :label="station.name" :value="station.value"></el-option>
        </el-select>
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
        props:[],
        data:function(){
            return {
                id:"mtTopnStationFlow",
                chart:null,
                curStation:"0571",
                stationList:[{id:1,name:"杭州",value:"0571"},{id:2,name:"宁波",value:"0574"}],
                option:{
                    title: {
                        text: '地铁站点（TOP 5）实时流量排名',
                        textStyle:{
                            fontSize:16,
                            fontWeight:"bold",
                            color:"#ffe252"
                        },
                        right:10
                    },
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
        methods:{
            initChart:function(){
                this.chart=echarts.init(document.getElementById('mtTopnStationFlow'),"myTheme");
                this.chart.setOption(this.option);
            },
            getData:function(){
                var _this =this;
                httpApi.getTopNStation({n:5,areaCode:_this.curStation}).then(res=>res.json()).then(res=>{
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
                    }
                })
            }
        },
        mounted:function(){
            let _this =this;
            this.initChart();
            this.getData();
            window.setInterval(function(){//5分钟自动获取一次数据
                _this.getData();
            },1000*60*5);
        }
    }
</script>
