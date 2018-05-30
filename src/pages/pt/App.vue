<template>
<div id='app'>
  <div class='shadowLayer flexCenter' :class='{hide:isDone}'>资源加载中...</div>
  <div id='sideMenu'>
    <div class='menuItem'>
      <div class='menuTitle'>客流统计</div>
      <pt-total-count ref='ptTotalCount' style='height:200px;'></pt-total-count>
    </div>
    <div class='menuItem'>
      <div class='menuTitle'>杭州实时流量趋势图</div>
      <pt-realtime-flow-trend ref='ptRealtimeFlowTrend' style='height:190px;width:100%;'></pt-realtime-flow-trend>
    </div>
    <div class='menuItem'>
      <div class='menuTitle'>全省近7天客流趋势</div>
      <pt-flow-trend-sevendays ref='ptFlowTrendSevendays' style=' height: 190px;width: 100%;'></pt-flow-trend-sevendays>
    </div>
    <div class='menuItem'>
      <div class='menuTitle'>全省区域客流排名(昨日)</div>
      <pt-city-flow-rank ref='ptCityFlowRank' style=' height: 190px;width: 100%;'></pt-city-flow-rank>
    </div>
  </div>
  <div id='mainContainer' style='height: 1080px;'>
    <div id='headBar'>
      <div style='color:#fff;width: 460px;height: 100%;margin:auto;' class='flexCenter'><span style='font-size: 36px;font-weight: bold;padding:0 14px;'>长途客运</span><span style='font-size: 26px;font-weight: bold;'>{{date}}</span></div>
    </div>
    <div id='mapbar'></div>
    <!-- <div id='map'></div> -->
    <div id='chartOverview' style='width: 250px;height: 250px;position: absolute;bottom:10px;right:10px; z-index: 10;background-color:rgba(7,2,33,0.7);'></div>
    <div id='stationDetail' class='panelDetail' :class='{hide:dIsHide}'>
      <div @click='hideDS()' style='width: 30px;height: 30px;color:#fff;font-size: 40px;line-height: 30px;text-align: center;position:absolute;right:10px;top:10px;z-index: 2;cursor: pointer'>×</div>
      <div class='stationTitle'>
        <div class='SDot' style='display:inline-block;vertical-align: text-bottom; position: relative; width: 30px;height: 30px;background-size:100% 100%;' :style='{backgroundImage:' url( '+resource.iconBusRadio+') '}'></div>
        <div style='display: inline-block;padding-left:10px;color:#fff;font-size: 20px;font-weight: bold;'>{{curStation.name}}</div>
      </div>
      <div class='blueTitle'>站点流量对比</div>
      <div style='color: #fff;font-size:18px;'><span>{{curStation.curText}}：</span><span style='color:yellow;padding:0 10px;font-weight: bold;font-family:myDigit;font-size: 26px;letter-spacing: 6px;'>{{curStation.curTotal}}</span><span>人次</span></div>
      <div style='color: #fff;font-size:18px;'><span>{{curStation.yesText}}：</span><span style='color:yellow;padding:0 10px;font-weight: bold;font-family:myDigit;font-size: 26px;letter-spacing: 6px;'>{{curStation.yesTotal}}</span><span>人次</span></div>
      <div class='blueTitle'>站点流量趋势图</div>
      <div id='sChart_ss' style='height: 150px;'></div>
      <div class='blueTitle'>站点近7天客流趋势</div>
      <div id='sChart_days' style='height: 150px;'></div>
    </div>
  </div>
  <!--<div class='searchPanel' style='position:absolute;right:60px;top: 10px;'>-->
  <!--<input type='text' id='search' v-model='keyword' placeholder='请输入客运站名搜索' />-->
  <!--<button id='btn-search' @click='getStationInfo(keyword)'>搜索</button>-->
  <!--</div>-->
</div>
</template>

<script>
import '../../css/reset.css';
import '../../css/common.css';
import './pt.scss';
// import Vue from 'vue';
import httpApi from '../../js/httpApi';
import Util from '../../js/util';
import busStation from '../../js/busStation';
import echarts from 'echarts';
import mapData_zhejiang from '../../assets/mapSource/province/zhejiang.json';
// import '../../js/myTheme';
import '../../../static/myTheme';

import iconBusStation from '../../assets/pt/icon-busStation_n.png';
import iconBusStation_hot from '../../assets/pt/icon-busStation_hot.png';
import iconBusRadio from '../../assets/pt/icon-busRadio.png';

import ptFlowTrendSevendays from '../../components/chart/passengerTransport/ptFlowTrendSevendays.vue';
import ptCityFlowRank from '../../components/chart/passengerTransport/ptCityFlowRank.vue';
import ptTotalCount from '../../components/chart/passengerTransport/ptTotalCount.vue';
import ptRealtimeFlowTrend from '../../components/chart/passengerTransport/ptRealtimeFlowTrend.vue';

import areaPosition from './json/areaPosition';
import overviewOption from './json/overviewOption';
import curStation from './json/curStation';

echarts.registerMap('ZJ', mapData_zhejiang);
window.maplet = null;


export default {
  name: 'App',
  components: {
    ptTotalCount,
    ptFlowTrendSevendays,
    ptCityFlowRank,
    ptRealtimeFlowTrend
  },
  data() {
    return {
      myMap: null,
      resource: {
        iconBusStation,
        iconBusStation_hot,
        iconBusRadio
      },
      overviewChart: null,
      keyword: '',
      markerInstance_bus: {},
      dateTime: Util.getDateByStamp(Date.now(), 'yyyy-MM-dd hh:mm:ss'),
      date: Util.getDateByStamp(Date.now(), 'yyyy-MM-dd'),
      curStation: curStation,
      dIsHide: true,
      isDone: false
    }
  },
  computed: {

  },
  watch: {
    dateTime: function(val) {
      this.date = val.split(' ')[0];
    }
  },
  methods: {
    init: function() {
      let _this = this;
      maplet = new Maplet('mapbar'); //挂载地图实例至全局对象
      maplet.centerAndZoom(new MPoint(120.84146, 29.65949), 8);
      // maplet.setOverviewLocation({
      //   type: Maplet.LEFT_BOTTOM
      // });
      //此处处理老版本地图无法自适应频幕尺寸的问题-----start
      let D_mapbar = document.getElementById('mapbar');
      maplet.resize(D_mapbar.offsetWidth, D_mapbar.offsetHeight);
      window.onresize = function() {
        D_mapbar.style.width = '100%';
        D_mapbar.style.height = 'calc(100% - 62px)';
        maplet.resize(D_mapbar.offsetWidth, D_mapbar.offsetHeight);
      }
      //此处处理老版本地图无法自适应频幕尺寸的问题-----end
      this.curStation.ssChart = echarts.init(document.getElementById('sChart_ss'), 'myTheme');
      this.curStation.daysChart = echarts.init(document.getElementById('sChart_days'), 'myTheme');
      this.curStation.ssChart.setOption(this.curStation.ssOption);
      this.curStation.daysChart.setOption(this.curStation.daysOption);
    },
    initOverviewChart: function() {
      let _this = this;
      this.overviewChart = echarts.init(document.getElementById('chartOverview'), 'myTheme');
      this.overviewChart.setOption(overviewOption);
      this.overviewChart.on('click', function(opt) {
        if (!opt.data || opt.dataIndex == '-1') {
          return;
        }
        let name = opt.name;
        // _this.$root.showMap(areaPosition[name]);
        // maplet.centerAndZoom(new MPoint(areaPosition[name][0], areaPosition[name][1]), 10);
      });
      this.getOverviewData();
    },
    getOverviewData: function() {
      let _this = this;
      httpApi.getPassengerStationStatistics({
        date: Util.getDateByStamp(Date.now() - 1000 * 60 * 60 * 24, 'yyyy-MM-dd')
      }).then(res => res.json()).then(res => {
        if (res.code == '100000' && res.dataBody.detail) {
          let data = res.dataBody.detail;
          let arr0 = [],
            arr1 = [];
          let rangeArr = [];
          for (let i = 0, n = data.length; i < n; i++) {
            let json0 = {},
              json1 = {};
            json0.name = data[i].areaName + '市';
            json0.value = data[i].stationCount;
            json1.name = data[i].areaName + '市';
            json1.value = data[i].passengerFlow;
            arr0.push(json0);
            arr1.push(json1);
            rangeArr.push(data[i].stationCount + data[i].passengerFlow);
          }
          overviewOption.visualMap.min = Math.min.apply(null, rangeArr);
          overviewOption.visualMap.max = Math.max.apply(null, rangeArr);
          overviewOption.series[0].data = arr0;
          overviewOption.series[1].data = arr1;
          _this.overviewChart.setOption(overviewOption);
        }
      });
    },
    watchDate: function() {
      let _this = this;
      this.dateTime = Util.getDateByStamp(Date.now(), 'yyyy-MM-dd hh:mm:ss');
      this.date = Util.getDateByStamp(Date.now(), 'yyyy-MM-dd');
      setTimeout(_this.watchDate, 1000);
    },
    drawBusStationPoint: function() {
      let _this = this;
      let stationList = busStation;
      for (let key in stationList) {
        let stationArr = stationList[key];
        for (let i = 0, n = stationArr.length; i < n; i++) {
          if (stationArr[i].latlon.length) {
            let busMarker = new MMarker(
              new MPoint(stationArr[i].latlon[0], stationArr[i].latlon[1]),
              new MIcon(iconBusStation, 24, 29)
            );
            maplet.addOverlay(busMarker);
            busMarker.areaCode = key;
            MEvent.addListener(busMarker, 'click', function(e) { //添加marker点击事件
              _this.getStationInfo(stationArr[i].name, stationArr[i].id);
            });
            _this.markerInstance_bus[stationArr[i].id] = busMarker;
          }
        }
      }
    },
    getStationInfo: function(zd, code) {
      console.log(zd, code);
      let _this = this;
      if (!zd) {
        return;
      }
      if (code.substr(0, 4) != '0571') {
        _this.curStation.curText = '昨日总计';
        _this.curStation.yesText = '前日总计';
      } else {
        _this.curStation.curText = '截止目前';
        _this.curStation.yesText = '昨日同期';
      }
      httpApi.getPStationInformation({
        zd: zd
      }).then(res => res.json()).then(res => {
        console.log(res);
        _this.dIsHide = false;
        if (res.code == '100000' && res.dataBody) {
          _this.curStation.name = res.dataBody.stationName || sName;
          _this.curStation.curTotal = res.dataBody.nowTotalFlow;
          _this.curStation.yesTotal = res.dataBody.lastTotalFlow;
          if (res.dataBody.detail && res.dataBody.detail.length > 1) {
            _this.curStation.ssOption.series[0].data = res.dataBody.detail[0].data;
            _this.curStation.ssOption.series[1].data = res.dataBody.detail[1].data;
          } else {
            _this.curStation.ssOption.series[0].data = [];
            _this.curStation.ssOption.series[1].data = [];
          }

          let xArr = [],
            yArr = [];
          for (let i = 0, n = res.dataBody.daysDetail.length; i < n; i++) {
            xArr.push(res.dataBody.daysDetail[i].businessDay.substr(4, 2) + '-' + res.dataBody.daysDetail[i].businessDay.substr(6, 2));
            yArr.push(res.dataBody.daysDetail[i].totalFlow);
          }
          _this.curStation.daysOption.xAxis.data = xArr;
          _this.curStation.daysOption.series[0].data = yArr;


          _this.curStation.ssChart.setOption(_this.curStation.ssOption);
          _this.curStation.daysChart.setOption(_this.curStation.daysOption);
        } else {
          _this.curStation.name = '--';
          _this.curStation.curTotal = 0;
          _this.curStation.yesTotal = 0;
          _this.curStation.ssOption.series[1].data = [];
          _this.curStation.ssOption.series[0].data = [];
          // _this.curStation.daysOption.xAxis.data =[];
          _this.curStation.daysOption.series[0].data = [];
          _this.curStation.ssChart.setOption(_this.curStation.ssOption);
          _this.curStation.daysChart.setOption(_this.curStation.daysOption);
        }
      });
    },
    hideDS: function() {
      this.dIsHide = true;
    }
  },
  mounted: function() {
    this.init();
    this.initOverviewChart();
    this.watchDate();
    this.drawBusStationPoint();
    this.isDone = true;
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
