/*
*created by TK0335807 on 2018/2/5
*/
import '../css/reset.css';
import 'element-ui/lib/theme-chalk/index.css';
import '../css/index.scss';
import Vue from 'vue';
import ElementUI from 'element-ui';
import echarts from 'echarts';
import 'echarts-gl';
import Util from './util';

import metroInfo from './metroInfo';
import metroInfo_nb from './metroInfo_nb';
import busStation from './busStation';
import iconMetro from '../assets/icon-metrolocation.png';
import iconMetroHot from '../assets/icon-metrolocation-hot.png';
import iconBusStation from '../assets/locationBusStation.png';
import httpApi from './httpApi';

import metroMenu from '../components/metroMenu.vue';
import metroMenuNb from '../components/metroMenu.vue';
import mainCount from '../components/chart/mainCount.vue';

import ptMainMap from '../components/chart/passengerTransport/ptMainMap.vue';
import ptCityFlowRank from '../components/chart/passengerTransport/ptCityFlowRank.vue';
import ptRealtimeFlowTrend from '../components/chart/passengerTransport/ptRealtimeFlowTrend.vue';
import ptFlowTrendSevendays from '../components/chart/passengerTransport/ptFlowTrendSevendays.vue';
import ptFlowAnalysis from '../components/chart/passengerTransport/ptFlowAnalysis.vue';

import wtFlowTotalcount from '../components/chart/waterTransport/wtFlowTotalcount.vue';
import wtTotalflowSevendays from '../components/chart/waterTransport/wtTotalflowSevendays.vue';

import mtTopnStationFlow from '../components/chart/metro/mtTopnStationFlow.vue';
import mtFlowTrendSevendays from '../components/chart/metro/mtFlowTrendSevendays.vue';
import mtFlowAnalysis from '../components/chart/metro/mtFlowAnalysis.vue';
import mtRealtimeTrend from '../components/chart/metro/mtRealtimeTrend.vue';

import esOverview from '../components/chart/emergencySupply/esOverview.vue';
import esTotalStation from '../components/chart/emergencySupply/esTotalStation.vue';
import esTotalPeople from '../components/chart/emergencySupply/esTotalPeople.vue';
import esMainMap from '../components/chart/emergencySupply/esMainMap.vue';

Vue.use(ElementUI);
window.maplet =null; //定义地图实例
window.maplet1 =null;

let App =new Vue({
    components:{
        metroMenu,
        metroMenuNb,
        mainCount,
        ptMainMap,
        ptCityFlowRank,
        ptRealtimeFlowTrend,
        ptFlowTrendSevendays,
        ptFlowAnalysis,
        wtFlowTotalcount,
        wtTotalflowSevendays,
        mtTopnStationFlow,
        mtFlowTrendSevendays,
        mtFlowAnalysis,
        mtRealtimeTrend,
        esOverview,
        esTotalStation,
        esTotalPeople,
        esMainMap
    },
    data:{
        title:"浙江省综合交通应急指挥中心",
        curStation:[// 因为地铁经纬度信息是从其他数据源获取的，并非是从接口获取，下列地铁站为从数据库查询到获取的已有的站点。
            '庆春广场站','振宁路站','乔司站','曹家桥站','滨康路站','盈丰路站','下沙西站','火车东站站','墩祥街站',
            '翁梅站','白洋站','下沙江滨站','景芳站','钱江路站','三墩站','西兴站','七堡站','建设三路站','复兴路站',
            '余杭高铁站站','金家渡站','定安路站','下宁桥站','江锦路站','城站站','湘湖站','九和路站','新塘站','市民中心站',
            '中医药大学站','水澄桥站','钱江世纪城站','近江站','云水站','凤起路站','九堡站','联庄站','金沙湖站','建国北路站',
            '高沙路站','浦沿站','江陵路站','沈塘桥站','三坝站','临平站','武林门站','庆菱路站','文海南路站','西湖文化广场站',
            '人民路站','潘水站','杭发厂站','古翠路站','南星桥站','人民广场站','学院路站','龙翔桥站','甬江路站','滨和路站',
            '彭埠站','良渚站','城星路站','飞虹路站','客运中心站','婺江路站','乔司南站','建设一路站','新风站','中河北路站',
            '虾龙圩站','文泽路站','南苑站','朝阳站','杜甫村站','武林广场站','闸弄口站','丰潭路站','文新站','杨家墩站',
            '打铁关站'
        ],
        areaCode:['0571','0574'],
        metroCity:"杭州地铁",
        markerInstance:{},
        markerInstance_nb:{},
        markerInstance_bus:{},
        curDailyCount:'--',
        curDailyCount_nb:'--',
        totalDailyCount:0,
        totalDailyCount_nb:0,
        countInterval:null,
        datetime:Util.getDateByStamp(new Date(),'yyyy-MM-dd hh:mm:ss'),
        hotPoints:[],
        hotPoints_nb:[],
        exHide:true,
        infoHide:true,
        info:{
            title:"",
            content:""
        }
    },
    computed:{
        correctedValue:function(){//修正值，1000-4999以内的随机数
            let rate = Math.random();
            rate =(rate>0.1?rate:0.1);
            return parseInt(rate*8000);
        },
        metroList:function(){
            let _this =this;
            let res =metroInfo;
            let filterList=[];
            let repeatedList=[];
            for(let i=0,n=res.length;i<n;i++){
                let station =res[i].station;
                for(let j=0,k=station.length;j<k;j++){//如果metrolInfo.js 里的数据不在curStation里或者没有经纬度坐标，状态置0；
                    if(!Util.isInArr(station[j].name,_this.curStation)){
                        station[j].state=0;
                    }else if(!station[j].latlon.length){
                        station[j].state=0;
                    }else{
                        station[j].state=1;
                    }
                    if(!filterList.length){
                        filterList.push(station[j]);
                    }else{
                        for(let l=0,m=filterList.length;l<m;l++){//遍历去重数组，如果有相同站名，则不把重复站点推进数组
                            if(filterList[l].name === station[j].name){
                                station[j].repId=filterList[l].id;
                                repeatedList.push(station[j]);
                                break;
                            }
                            if(l===m-1){
                                filterList.push(station[j]);
                            }
                        }
                    }
                }
            }
            return {
                groupList:res,
                filterList:filterList,
                repeatedList:repeatedList
            };
        },
        metroList_nb:function(){
            let _this =this;
            let res =metroInfo_nb;
            let filterList=[];
            let repeatedList=[];
            for(let i=0,n=res.length;i<n;i++){
                let station =res[i].station;
                for(let j=0,k=station.length;j<k;j++){//如果metrolInfo.js 里的数据不在curStation里或者没有经纬度坐标，状态置0；
                   if(!station[j].latlon.length){
                        station[j].state=0;
                    }else{
                        station[j].state=1;
                    }
                    if(!filterList.length){
                        filterList.push(station[j]);
                    }else{
                        for(let l=0,m=filterList.length;l<m;l++){//遍历去重数组，如果有相同站名，则不把重复站点推进数组
                            if(filterList[l].name === station[j].name){
                                station[j].repId=filterList[l].id;
                                repeatedList.push(station[j]);
                                break;
                            }
                            if(l===m-1){
                                filterList.push(station[j]);
                            }
                        }
                    }
                }
            }
            return {
                groupList:res,
                filterList:filterList,
                repeatedList:repeatedList
            };
        }
    },
    methods:{
        closeExMap:function(){
            this.exHide =true;
            this.infoHide =true;
        },
        closeExInfo:function(){
            this.infoHide =true;
        },
        openExInfo:function(){
            this.infoHide =false;
        },
        showMap:function(latlon){
            this.exHide =false;
            maplet1.centerAndZoom(new MPoint(latlon[0],latlon[1]),12);
        },
        initMap:function(){
            let _this =this;
            maplet =new Maplet("mapbar");//挂载地图实例至全局对象
            // maplet.addControl(new MStandardControl());
            maplet.centerAndZoom(new MPoint(120.20067,30.25738),12);
            //此处处理老版本地图无法自适应频幕尺寸的问题-----start
            let D_mapbar =document.getElementById("mapbar");
            maplet.resize(D_mapbar.offsetWidth,D_mapbar.offsetHeight);
            window.onresize=function(){
                D_mapbar.style.width="100%";
                D_mapbar.style.height="100%";
                maplet.resize(D_mapbar.offsetWidth,D_mapbar.offsetHeight);
            }
            //此处处理老版本地图无法自适应频幕尺寸的问题-----end
        },
        initMap1:function(){
            let _this =this;
            maplet1 =new Maplet("mapbar1");
            maplet1.centerAndZoom(new MPoint(120.20067,30.25738),12);
            let D_mapbar =document.getElementById("mapbar1");
            maplet1.resize(D_mapbar.offsetWidth,D_mapbar.offsetHeight);
            window.onresize=function(){
                D_mapbar.style.width="100%";
                D_mapbar.style.height="100%";
                maplet1.resize(D_mapbar.offsetWidth,D_mapbar.offsetHeight);
            }
        },
        changeMetroCity:function(name){
            if(name==="杭州地铁"){
                maplet.centerAndZoom(new MPoint(120.20067,30.25738),12);
            }else if(name==="宁波地铁"){

                maplet.centerAndZoom(new MPoint(121.5456,29.87668),12);
            }
        },
        triggerMapPoint:function(id,name,areaCode){
            let repList,marker ;
            if(areaCode=="0571"){
                repList =this.metroList.repeatedList;
            }else if(areaCode=="0574"){
                repList =this.metroList_nb.repeatedList;
            }
            for(let i=0,n=repList.length;i<n;i++){
                if(repList[i].id == id){
                    id =repList[i].repId;
                }
            }
            if(areaCode=="0571"){
                marker =this.markerInstance[id];
            }else if(areaCode=="0574"){
                marker =this.markerInstance_nb[id];
            }
            maplet.centerAndZoom(new MPoint(marker.pt.lon,marker.pt.lat),13);
            httpApi.getStationFlow({stationName:name,areaCode:areaCode}).then(res=>res.json()).then(res=>{
                if(res.code==100000){
                    let data =res.dataBody;
                    let content='<p style="color:#12202b;margin-bottom:10px;font-size: 18px;">今日进站：'+data.entryFlow+'人次</p><p style="color:#12202b;margin-bottom:10px;font-size: 18px;">今日出站：'+data.exitFlow+'人次</p><p style="color:#12202b;margin-bottom:10px;font-size: 18px;">进出站总量：'+(data.entryFlow+data.exitFlow)+'人次</p><p style="color:#12202b;margin-bottom:10px;font-size: 18px;">更新时间：'+'<span style="display: block;">'+data.updateTime.replace(/(.0)$/,"")+'</span>'+'</p>';
                    marker.setInfoWindow(new MInfoWindow(name,content));
                    marker.openInfoWindow();
                }
            }).catch(e=>{console.log(e);});
        },
        createMetroPoint:function(metroInfo){
            if(metroInfo.state&&metroInfo.latlon.length){
                let marker = new MMarker(
                    new MPoint(metroInfo.latlon[0],metroInfo.latlon[1]),
                    new MIcon(iconMetro,32,44),
                    new MInfoWindow(metroInfo.name,"-")
                );
                maplet.addOverlay(marker);
                MEvent.addListener(marker, "click", function(e) {//添加marker点击事件
                    // maplet.centerAndZoom(new MPoint(marker.pt.lon,marker.pt.lat),13);
                    httpApi.getStationFlow({stationName:metroInfo.name,areaCode:"0571"}).then(res=>res.json()).then(res=>{
                        if(res.code==100000){
                            let data =res.dataBody;
                            let content='<p style="color:#12202b;margin-bottom:10px;font-size: 18px;">今日进站：'+data.entryFlow+'人次</p><p style="color:#12202b;margin-bottom:10px;font-size: 18px;">今日出站：'+data.exitFlow+'人次</p><p style="color:#12202b;margin-bottom:10px;font-size: 18px;">进出站总量：'+(data.entryFlow+data.exitFlow)+'人次</p><p style="color:#12202b;margin-bottom:10px;font-size: 18px;">更新时间：'+'<span style="display: block;">'+data.updateTime.replace(/(.0)$/,"")+'</span>'+'</p>';
                            marker.setInfoWindow(new MInfoWindow(metroInfo.name,content));
                            marker.openInfoWindow();
                        }
                    }).catch(e=>{console.log(e);});
                });
                //存放marker实例
                this.markerInstance[metroInfo.id] =marker;
            }
        },
        createMetroPoint_nb:function(metroInfo){
            if(metroInfo.state&&metroInfo.latlon.length){
                let marker = new MMarker(
                    new MPoint(metroInfo.latlon[0],metroInfo.latlon[1]),
                    new MIcon(iconMetro,32,44),
                    new MInfoWindow(metroInfo.name,"-")
                );
                maplet.addOverlay(marker);
                MEvent.addListener(marker, "click", function(e) {//添加marker点击事件
                    // maplet.centerAndZoom(new MPoint(marker.pt.lon,marker.pt.lat),13);
                    httpApi.getStationFlow({stationName:metroInfo.name,areaCode:"0574"}).then(res=>res.json()).then(res=>{
                        if(res.code==100000){
                            let data =res.dataBody;
                            let content='<p style="color:#12202b;margin-bottom:10px;font-size: 18px;">今日进站：'+data.entryFlow+'人次</p><p style="color:#12202b;margin-bottom:10px;font-size: 18px;">今日出站：'+data.exitFlow+'人次</p><p style="color:#12202b;margin-bottom:10px;font-size: 18px;">进出站总量：'+(data.entryFlow+data.exitFlow)+'人次</p><p style="color:#12202b;margin-bottom:10px;font-size: 18px;">更新时间：'+'<span style="display: block;">'+data.updateTime.replace(/(.0)$/,"")+'</span>'+'</p>';
                            marker.setInfoWindow(new MInfoWindow(metroInfo.name,content));
                            marker.openInfoWindow();
                        }
                    }).catch(e=>{console.log(e);});
                });
                //存放marker实例
                this.markerInstance_nb[metroInfo.id] =marker;
            }
        },
        addMetroPoints:function(){
            let metroStation =this.metroList.filterList;
            let metroStation_nb =this.metroList_nb.filterList;
            // let metroStation =this.metroList.filterList.concat(this.metroList_nb.filterList);
            for(let i=0,n=metroStation.length;i<n;i++){
                this.createMetroPoint(metroStation[i]);
            }
            for(let i=0,n=metroStation_nb.length;i<n;i++){
                this.createMetroPoint_nb(metroStation_nb[i]);
            }
        },
        showTopStation:function(){
            let _this =this;
            httpApi.getTopNStation({n:5,areaCode:"0571"}).then(res=>res.json()).then(res=>{//获取前n名客流量站点
                if(res.code==100000){
                    let xData =[],yData1 =[],yData2 =[];
                    let data =res.dataBody;
                    _this.drawHotPoints(data); //跟新地图top n 红点
                }
            });
            httpApi.getTopNStation({n:5,areaCode:"0574"}).then(res=>res.json()).then(res=>{//获取前n名客流量站点
                if(res.code==100000){
                    let xData =[],yData1 =[],yData2 =[];
                    let data =res.dataBody;
                    _this.drawHotPoints_nb(data); //跟新地图top n 红点
                }
            });
            window.setInterval(function(){
                httpApi.getTopNStation({n:5,areaCode:"0571"}).then(res=>res.json()).then(res=>{//获取前n名客流量站点
                    if(res.code==100000){
                        let xData =[],yData1 =[],yData2 =[];
                        let data =res.dataBody;
                        _this.drawHotPoints(data); //跟新地图top n 红点
                    }
                });
                httpApi.getTopNStation({n:5,areaCode:"0574"}).then(res=>res.json()).then(res=>{//获取前n名客流量站点
                    if(res.code==100000){
                        let xData =[],yData1 =[],yData2 =[];
                        let data =res.dataBody;
                        _this.drawHotPoints_nb(data); //跟新地图top n 红点
                    }
                });
            },5*60*1000);
        },
        getDailyCountInfo:function(){
            let _this =this;
            httpApi.getDailyCount({areaCode:"0571"}).then(res=>res.json()).then(res=>{//获取今日客流量
                if(res.code==100000){
                    if(!window.localStorage.getItem("curDailyCount")||(new Date().getTime()-window.localStorage.getItem("lastCountTime"))>5*60*1000){//第一次登陆,无历史记录，或者是页面打开间隔大于5分钟,重新计算显示值
                        _this.curDailyCount = res.dataBody.cll - _this.correctedValue;
                        _this.curDailyCount =(_this.curDailyCount<0?0:_this.curDailyCount);
                    }else{//从存储中取关闭页面时的值，并加上延迟时间。
                        _this.curDailyCount =parseInt(window.localStorage.getItem("curDailyCount"))+parseInt(window.localStorage.getItem("step"))*Math.floor(((new Date().getTime()-window.localStorage.getItem("lastCountTime"))/(1000*5))) ;
                    }
                    _this.totalDailyCount = res.dataBody.cll;
                    if(_this.curDailyCount>=_this.totalDailyCount){
                        _this.curDailyCount=_this.totalDailyCount;
                    }
                    _this.dynamicShowDailyCount();
                }
            });
            window.setInterval(function(){ //每5分钟获取一次今日客流量；
                httpApi.getDailyCount({areaCode:"0571"}).then(res=>res.json()).then(res=>{
                    if(res.code==100000){
                        if(!window.localStorage.getItem("curDailyCount")||(new Date().getTime()-window.localStorage.getItem("lastCountTime"))>5*60*1000){//第一次登陆,无历史记录，或者是页面打开间隔大于5分钟,重新计算显示值
                            _this.curDailyCount = res.dataBody.cll - _this.correctedValue;
                            _this.curDailyCount =(_this.curDailyCount<0?0:_this.curDailyCount);
                        }else{
                            _this.curDailyCount = window.localStorage.getItem("curDailyCount");
                        }
                        _this.totalDailyCount = res.dataBody.cll;
                        _this.dynamicShowDailyCount();
                    }
                });
            },5*60*1000);
        },
        getDailyCountInfo_nb:function(){
            let _this =this;
            httpApi.getDailyCount({areaCode:"0574"}).then(res=>res.json()).then(res=>{//获取今日客流量
                if(res.code==100000){
                    _this.curDailyCount_nb =res.dataBody.cll;
                }
            });
            window.setInterval(function(){ //每5分钟获取一次今日客流量；
                httpApi.getDailyCount({areaCode:"0574"}).then(res=>res.json()).then(res=>{//获取今日客流量
                    if(res.code==100000){
                        _this.curDailyCount_nb =res.dataBody.cll;
                    }
                });
            },15*60*1000);
        },
        dynamicShowDailyCount:function(){
            let _this =this;
            let frequency = 1000*5,  //刷新频率为5秒
                total =1000*60*5;  //总计间隔5分钟
            let step = Math.floor((_this.totalDailyCount-_this.curDailyCount)/((total/frequency)+1)); //每隔一次刷新频率需要增加的数量
            window.localStorage.setItem("step",step);
            window.clearInterval(_this.countInterval);
            if(_this.curDailyCount>=_this.totalDailyCount){
                _this.curDailyCount=_this.totalDailyCount;
                window.clearInterval(_this.countInterval);
            }
            _this.countInterval =window.setInterval(function(){
                _this.curDailyCount =parseInt(_this.curDailyCount)+step;
                if(_this.curDailyCount>=_this.totalDailyCount){
                    _this.curDailyCount=_this.totalDailyCount;
                    window.clearInterval(_this.countInterval);
                }
                window.localStorage.setItem("curDailyCount",_this.curDailyCount);
                window.localStorage.setItem("lastCountTime",new Date().getTime());
            },frequency);
        },
        resetQuest:function(){ // 0点之后，重新发起新一天的数据请求
            let _this =this;
            _this.curDailyCount =0;
            _this.totalDailyCount =0;
            window.localStorage.setItem("curDailyCount",_this.curDailyCount);
            window.localStorage.setItem("lastCountTime",new Date().getTime());
        },
        drawHotPoints:function(hotList){ //给地图上最热的几个点换成红色图标
            let _this=this;
            for(let i=0,n =_this.hotPoints.length;i<n;i++){ //先将上一次的热点全部替换为蓝色
                _this.hotPoints[i].setIcon(new MIcon(iconMetro,32,44));
            }
            let tempArr =[];
            for(let i=0,n=hotList.length;i<n;i++){ //先遍历获取到的热点
                let filterList =_this.metroList.filterList;
                for(let j=0,m=filterList.length;j<m;j++){// 每个站点名与所有站点列表进行匹配
                    if(hotList[i].sname===filterList[j].name){
                        tempArr.push(_this.markerInstance[filterList[j].id]);
                        break;
                    }
                }
            }
            _this.hotPoints =tempArr;
            for(let i=0,n =_this.hotPoints.length;i<n;i++){ //将新的热点替换成红色图标
                _this.hotPoints[i].setIcon(new MIcon(iconMetroHot,36,70));
            }
        },
        drawHotPoints_nb:function(hotList){ //给地图上最热的几个点换成红色图标
            let _this=this;
            for(let i=0,n =_this.hotPoints_nb.length;i<n;i++){ //先将上一次的热点全部替换为蓝色
                _this.hotPoints_nb[i].setIcon(new MIcon(iconMetro,32,44));
            }
            let tempArr =[];
            for(let i=0,n=hotList.length;i<n;i++){ //先遍历获取到的热点
                let filterList =_this.metroList_nb.filterList;
                for(let j=0,m=filterList.length;j<m;j++){// 每个站点名与所有站点列表进行匹配
                    if(hotList[i].sname===filterList[j].name){
                        tempArr.push(_this.markerInstance_nb[filterList[j].id]);
                        break;
                    }
                }
            }
            _this.hotPoints_nb =tempArr;
            for(let i=0,n =_this.hotPoints_nb.length;i<n;i++){ //将新的热点替换成红色图标
                _this.hotPoints_nb[i].setIcon(new MIcon(iconMetroHot,36,70));
            }
        },
        drawBusStationPoint:function(){
            let _this =this;
            let stationList = busStation;
            for(let key in stationList){
                let stationArr = stationList[key];
                for(let i=0,n=stationArr.length;i<n;i++){
                    if(stationArr[i].latlon.length){
                        let busMarker = new MMarker(
                            new MPoint(stationArr[i].latlon[0],stationArr[i].latlon[1]),
                            new MIcon(iconBusStation,32,44)
                        );
                        maplet1.addOverlay(busMarker);
                        busMarker.areaCode =key;
                        MEvent.addListener(busMarker,"click", function(e) {//添加marker点击事件
                            httpApi.getPassengerStationFlow({dq:busMarker.areaCode,zd:stationArr[i].name}).then(res=>res.json()).then(res=>{
                                if(res.code=="100000"){
                                    _this.info.title=res.dataBody[0].zd;
                                    let str ='';
                                    if(res.dataBody.length=="2"){
                                        str +='<p style="color:#ffe900;">'+'今日客流量'+':'+res.dataBody[0].checkNum +'人次</p>';
                                        str += '<p style="color:#e6e6e6;">'+'昨日客流量'+':'+res.dataBody[1].checkNum +'人次</p>'
                                    }else{
                                        str += '<p style="color:#e6e6e6;">'+'昨日客流量'+':'+res.dataBody[0].checkNum +'人次</p>';
                                    }
                                    _this.info.content=str;
                                    _this.openExInfo();
                                }
                            });
                            // maplet1.centerAndZoom(new MPoint(stationArr[i].latlon[0],stationArr[i].latlon[1]),12);
                            // busMarker.setInfoWindow(new MInfoWindow(stationArr[i].name,'123123123123'));
                            // busMarker.openInfoWindow();


                            // httpApi.getStationFlow({stationName:metroInfo.name,areaCode:"0571"}).then(res=>res.json()).then(res=>{
                            //     if(res.code==100000){
                            //         let data =res.dataBody;
                            //         let content='<p style="color:#12202b;margin-bottom:10px;font-size: 18px;">今日进站：'+data.entryFlow+'人次</p><p style="color:#12202b;margin-bottom:10px;font-size: 18px;">今日出站：'+data.exitFlow+'人次</p><p style="color:#12202b;margin-bottom:10px;font-size: 18px;">进出站总量：'+(data.entryFlow+data.exitFlow)+'人次</p><p style="color:#12202b;margin-bottom:10px;font-size: 18px;">更新时间：'+'<span style="display: block;">'+data.updateTime.replace(/(.0)$/,"")+'</span>'+'</p>';
                            //         marker.setInfoWindow(new MInfoWindow(metroInfo.name,content));
                            //         marker.openInfoWindow();
                            //     }
                            // }).catch(e=>{console.log(e);});
                        });
                        _this.markerInstance_bus[stationArr[i].id] =busMarker;
                    }
                }
            }
        }
    },
    mounted:function(){
        let _this =this;
        window.setTimeout(function(){
            _this.$refs.ptMainMap.chart.resize();
            _this.$refs.esMainMap.chart.resize();
            _this.initMap();
            _this.initMap1();
            _this.addMetroPoints();
            _this.drawBusStationPoint();
            _this.showTopStation();
            _this.getDailyCountInfo();
            _this.getDailyCountInfo_nb();
            // window.asd =_this;
            // let arr =_this.metroList.filterList;
            // for(let i=0,n=arr.length;i<n;i++){
            //     delete arr[i].latlon;
            //     delete arr[i].state;
            //     arr[i].line = [arr[i].id.toString().substr(0,1)];
            //     arr[i].position = [];
            // }
            // console.log(arr);
            // document.write(JSON.stringify(arr));
        },10);
        window.setInterval(function(){//日期显示
            let curDate =new Date();
            _this.datetime=Util.getDateByStamp(curDate,'yyyy-MM-dd hh:mm:ss');
            if(curDate.getHours()===0&&curDate.getMinutes()===0&&curDate.getSeconds()===0){
                _this.resetQuest();
            }
        },1000);
    }
}).$mount("#app");
