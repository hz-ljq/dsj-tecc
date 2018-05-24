<!--应急物资——首页地图-->
<style>
    #esMainMapContainer{
        width: 100%;
        height: 100%;
        position: relative;
    }
    #esMainMap{
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
<template>
    <div id="esMainMapContainer">
        <div id="esMainMap"></div>
    </div>
</template>
<script>
    import echarts from 'echarts';
    // import '../../../js/myTheme';
    import '../../../../static/myTheme';
    import util from '../../../js/util';
    import httpApi from '../../../js/httpApi';
    import mapData_zhejiang from '../../../assets/mapSource/province/zhejiang.json';
    echarts.registerMap('ZJ', mapData_zhejiang);
    var option ={
        title: {
            text: '全省应急物资统计',
            textStyle:{
                fontSize:22,
                fontWeight:"bold",
                color:"#fff"
            },
            left:"44%"
        },
        tooltip: {
            trigger: 'item',
            formatter:function(params){
                let _this =this;
                //定义一个res变量来保存最终返回的字符结果,并且先把地区名称放到里面
                var res=params.name+'<br />';
                //定义一个变量来保存series数据系列
                var myseries=option.series;
                //循环遍历series数据系列
                for(var i=0;i<myseries.length;i++){
                    //在内部继续循环series[i],从data中判断：当地区名称等于params.name的时候就将当前数据和名称添加到res中供显示
                    for(var k=0;k<myseries[i].data.length;k++){
                        //console.log(myseries[i].data[k].name);
                        //如果data数据中的name和地区名称一样
                        if(myseries[i].data[k].name==params.name){
                            //将series数据系列每一项中的name和数据系列中当前地区的数据添加到res中
                            res+=myseries[i].name+':'+myseries[i].data[k].value+'<br />';
                        }
                    }
                }
                //返回res
                //console.log(res);
                return res;
            }
        },
        visualMap: {
            min: 10,
            max: 10000,
            realtime: false,
            calculable: true,
            text:["",""],
            textStyle:{
                color:"#fff"
            },
            inRange: {
                color: ['#2ec7c9', '#5ab1ef', '#b6a2de']
            }
        },
        series: [
            {
                name: '应急中心数',
                type: 'map',
                mapType: 'ZJ', // 自定义扩展图表类型
                label:{
                    formatter:'{a}</br>{b}</br>{c}</br>{d}</br>{e}</br>{f}',
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize:16

                        }
                    },
                    emphasis:{
                        show:true
                    }
                },
                emphasis:{
                    label:{
                        show:true
                    }
                },
                data: [],
                nameMap: {}
            },
            {
                name: '应急物资数',
                type: 'map',
                mapType: 'ZJ', // 自定义扩展图表类型
                label:{
                    formatter:'{a}</br>{b}</br>{c}</br>{d}</br>{e}</br>{f}',
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize:16

                        }
                    },
                    emphasis:{
                        show:true
                    }
                },
                emphasis:{
                    label:{
                        show:true
                    }
                },
                data: [],
                nameMap: {}
            },
            {
                name: '应急人员数',
                type: 'map',
                label:{
                    formatter:'{a}</br>{b}</br>{c}</br>{d}</br>{e}</br>{f}',
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize:16

                        }
                    },
                    emphasis:{
                        show:true
                    }
                },
                emphasis:{
                    label:{
                        show:true
                    }
                },
                mapType: 'ZJ', // 自定义扩展图表类型
                data: [],
                nameMap: {}
            }
        ]
    };
    export default {
        props:[],
        data:function(){
            return {
                id:"esMainMap",
                chart:null,
                option:option
            }
        },
        methods:{
            initChart:function(){
                this.chart=echarts.init(document.getElementById('esMainMap'),"myTheme");
                this.chart.setOption(this.option);
            },
            getData:function() {
                let _this = this;
                httpApi.getEmergencyStationAndPersonnelStatistics().then(res=>res.json()).then(res=>{
                    if(res.code=="100000"){

                        let data =res.dataBody;
                        let arr0=[],arr1=[],arr2=[];
                        let rangeArr=[];
                        for(let i=0,n=data.length;i<n;i++){
                            let json0={},json1={},json2={};
                            json0.name=data[i].areaName+"市";
                            json0.value=data[i].cCount;
                            json1.name=data[i].areaName+"市";
                            json1.value=data[i].eCount;
                            json2.name=data[i].areaName+"市";
                            json2.value=data[i].pCount;
                            arr0.push(json0);
                            arr1.push(json1);
                            arr2.push(json1);
                            rangeArr.push(data[i].cCount+data[i].eCount+data[i].pCount);
                        }
                        option.visualMap.min =Math.min.apply(null,rangeArr);
                        option.visualMap.max =Math.max.apply(null,rangeArr);
                        option.series[0].data =arr0;
                        option.series[1].data =arr1;
                        option.series[2].data =arr2;
                        _this.chart.setOption(_this.option);
                    }
                });
            }

        },
        mounted:function(){
            this.initChart();
            this.getData();
            window.setInterval(function(){
                _this.getData();
            },1000*60*60*12);
        }
    }
</script>
