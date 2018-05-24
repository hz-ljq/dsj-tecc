<!--客运——全省应急站点统计-->
<style>
    #ptMainMapContainer{
        width: 100%;
        height: 100%;
        position: relative;
    }
    #ptMainMap{
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
<template>
    <div id="ptMainMapContainer">
        <div id="ptMainMap"></div>
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
    var areaPosition={
        '衢州市':[118.87578,28.95327],
        '杭州市':[120.17501,30.26051],
        '湖州市':[120.09581,30.86945],
        '嘉兴市':[120.75284,30.76613],
        '宁波市':[121.5456,29.87668],
        '绍兴市':[120.57757,30.00338],
        '台州市':[121.42248,28.66317],
        '温州市':[120.69534,27.9982],
        '丽水市':[119.93541,28.44563],
        '金华市':[119.64937,29.10462],
        '舟山市':[122.10703,30.01912]
    };
    var option ={
        title: {
            text: '全省客运流量统计',
            subText:'全省共计：5个地市纳入统计',
            subtextStyle:{
                color:'#fff'
            },
            textStyle:{
                fontSize:22,
                fontWeight:"bold",
                color:"#fff",
                align:"center"
            },
            left:"44%"
        },
        tooltip: {
            trigger: 'item',
            formatter:function(params){
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
//        legend:{
//            data:['站点数','客流量'],
//            top:"20px",
//            left:"right"
//        },
        visualMap: {
            min: 1,
            max: 50000,
            text: ['', ''],
            textStyle:{
                color:"#fff"
            },
            realtime: false,
            calculable: true,
            inRange: {
                color: ['#2ec7c9', '#5ab1ef', '#b6a2de']
            }
        },
        series: [
            {
                name: '接入站点数',
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
                data: [
                    {name: '嘉兴市', value: 0},
                    {name: '杭州市', value: 0},
                    {name: '温州市', value: 0},
                    {name: '湖州市', value: 0},
                    {name: '绍兴市', value: 0}
                ],
                // 自定义名称映射
                nameMap: {}
            },
            {
                name: '接入客流量',
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
                data: [
                    {name: '嘉兴市', value: 0},
                    {name: '杭州市', value: 0},
                    {name: '温州市', value: 0},
                    {name: '湖州市', value: 0},
                    {name: '绍兴市', value: 0}
                ],
                // 自定义名称映射
                nameMap: {}
            }
        ]
    }
    export default {
        props:[],
        data:function(){
            return {
                id:"ptMainMap",
                chart:null,
                option:option
            }
        },
        methods:{
            initChart:function(){
                let _this =this;
                this.chart=echarts.init(document.getElementById('ptMainMap'),"myTheme");
                this.chart.setOption(this.option);
                this.chart.on("click",function(opt){
                    if(!opt.data||opt.dataIndex=="-1"){
                        return;
                    }
                    let name=opt.name;
                    _this.$root.showMap(areaPosition[name]);
                });
            },
            getData:function() {
                let _this = this;
                httpApi.getPassengerStationStatistics({date:util.getDateByStamp(Date.now() - 1000*60*60*24,"yyyy-MM-dd")}).then(res=>res.json()).then(res=>{
                    if(res.code=="100000"){
                        let data =res.dataBody.detail;
                        let arr0 =[],arr1=[];
                        let rangeArr =[];
                        for(let i=0,n=data.length;i<n;i++){
                            let json0={},json1={};
                            json0.name=data[i].areaName+"市";
                            json0.value=data[i].stationCount;
                            json1.name=data[i].areaName+"市";
                            json1.value=data[i].passengerFlow;
                            arr0.push(json0);
                            arr1.push(json1);
                            rangeArr.push(data[i].stationCount+data[i].passengerFlow);
                        }
                        option.visualMap.min =Math.min.apply(null,rangeArr);
                        option.visualMap.max =Math.max.apply(null,rangeArr);
                        option.series[0].data =arr0;
                        option.series[1].data =arr1;
                        _this.chart.setOption(_this.option);
                    }
                });
            }

        },
        mounted:function(){
            let _this =this;
            this.initChart();
            this.getData();
            window.setInterval(function(){
                _this.getData();
            },1000*60*5);
        }
    }
</script>
