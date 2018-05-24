<template>
  <div id="app">
    <div class="shadowLayer flexCenter" :class="{hide:isDone}">资源加载中...</div>
    <div id="sideMenu" style="width: 600px;">
      <div class="menuItem">
        <div class="menuTitle">全省应急资源情况汇总</div>
        <es-total-count ref="esTotalCount" style="height:220px;width: 100%;margin:10px 0;"></es-total-count>
      </div>
      <div class="menuItem">
        <div class="menuTitle">各地市应急单位统计</div>
        <es-center-count ref="esCenterCount" style="height: 300px;width: 100%;"></es-center-count>
      </div>
      <div class="menuItem">
        <div class="menuTitle">各地市应急机械统计</div>
        <es-m-count ref="esMCount" style="height: 300px;width: 100%;"></es-m-count>
      </div>
    </div>
    <div id="mainContainer" style="width:calc(100% - 600px);height: 1080px;">
      <div id="headBar">
        <div style="color:#fff;width: 460px;height: 100%;margin:auto;" class="flexCenter"><span style="font-size: 36px;font-weight: bold;padding:0 14px;">应急物资</span></div>
      </div>
      <div id="mapbar"></div>
      <div id="chartOverview" style="width: 250px;height: 250px;position: absolute;bottom:10px;right:10px; z-index: 10;background-color:rgba(7,2,33,0.7);"></div>
      <img :src="resource.sample_dw" style="position: absolute;right:47px;bottom:300px;z-index: 3" alt="">
      <img :src="resource.sample_gs" style="position: absolute;right:10px;bottom:340px;z-index: 3" alt="">
      <div id="esDetail" class="panelDetail_full" :class="{hide:dIsHide}">
        <div @click="hideDS()" style="width: 30px;height: 30px;color:#fff;font-size: 40px;line-height: 30px;text-align: center;position:absolute;left:2px;top:2px;z-index: 2;cursor: pointer">×</div>
        <div class="esDTitle head" :style="{backgroundImage:'url('+resource.bg_esTitle_w+')'}">
          <div style="line-height: 40px;font-size: 20px;">{{curMarker.esInfo.unitName}}</div>
          <div style="line-height: 18px;font-size: 18px;">{{curMarker.esInfo.location}}</div>
        </div>
        <!--<div class="blueTitle">应急人员</div>-->
        <table class="table" style="border:1px solid #1F7DAA;margin:6px 0;">
          <colgroup>
            <col width="20%">
            <col width="20%">
            <col width="40%">
            <col width="20%">
          </colgroup>
          <tbody>
            <tr v-for="item in esDetail.contacts">
              <td>{{item.personType}}</td>
              <td>{{item.personName}}</td>
              <td>{{item.phone}}</td>
              <td>{{item.trafficPhone}}</td>
            </tr>
          </tbody>
        </table>
        <div class="blueTitle">应急队伍</div>
        <div class="thinTitle" :style="{backgroundImage:'url('+resource.bg_esTitle_t+')'}">
          <div style="display: inline-block;width: 70%;padding-left:10px;text-align: left;">队伍名称</div>
          <div style="display: inline-block;width: 30%;padding-right:10px;text-align: right;">队伍人数</div>
        </div>
        <table class="table" style="border:1px solid #1F7DAA;">
          <colgroup>
            <col width="70%">
            <col width="30%">
          </colgroup>
          <tbody>
            <tr v-for="item in esDetail.team">
              <td style="padding-left:10px;text-align: left;">{{item.emergencyTeamName}}</td>
              <td style="padding-right:10px;text-align: right;">{{item.personNumber}}</td>
            </tr>
          </tbody>
        </table>
        <div class="blueTitle">应急物资</div>
        <div class="thinTitle" :style="{backgroundImage:'url('+resource.bg_esTitle_t+')'}">
          <div style="display: inline-block;width: 70%;padding-left:10px;text-align: left;">物资名称</div>
          <div style="display: inline-block;width: 30%;padding-right:10px;text-align: right;">物资数量</div>
        </div>
        <table class="table" style="border:1px solid #1F7DAA;">
          <colgroup>
            <col width="70%">
            <col width="30%">
          </colgroup>
          <tbody>
            <tr v-for="item in esDetail.supplies" v-if="item.number>0">
              <td style="padding-left:10px;text-align: left;">{{item.materialName}}</td>
              <td style="padding-right:10px;text-align: right;">{{item.number}}</td>
            </tr>
          </tbody>
        </table>
        <div class="blueTitle">应急机械</div>
        <div class="thinTitle" :style="{backgroundImage:'url('+resource.bg_esTitle_t+')'}">
          <div style="display: inline-block;width: 70%;padding-left:10px;text-align: left;">机械名称</div>
          <div style="display: inline-block;width: 30%;padding-right:10px;text-align: right;">机械数量</div>
        </div>
        <div style="width: 100%;height: 390px;overflow: auto;">
          <table class="table" style="border:1px solid #1F7DAA;">
            <colgroup>
              <col width="70%">
              <col width="30%">
            </colgroup>
            <tbody>
              <tr v-for="item in esDetail.machinery" v-if="item.number>0">
                <td style="padding-left:10px;text-align: left;">{{item.mechanicalName}}</td>
                <td style="padding-right:10px;text-align: right;">{{item.number}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!--<div class="searchPanel" style="position:absolute;right:60px;top: 10px;">-->
    <!--<input type="text" id="search" v-model="keyword" placeholder="请输入名称搜索" />-->
    <!--<button id="btn-search" @click="getStationInfo(keyword)">搜索</button>-->
    <!--</div>-->
  </div>
</template>

<script>
import '../../css/reset.css';
import '../../css/common.css';
import './es.css';

// import Vue from 'vue';
import httpApi from '../../js/httpApi';
import Util from '../../js/util';
import esCenter from '../../js/esCenter';
import echarts from 'echarts';
import mapData_zhejiang from '../../assets/mapSource/province/zhejiang.json';
// import '../../js/myTheme';
import '../../../static/myTheme';

import icon_esAgent from '../../assets/es/icon-esAgent.png';
import icon_esCom from '../../assets/es/icon-esCom.png';
import icon_esAgent_loc from '../../assets/es/icon-esAgent-loc.png';
import icon_esCom_loc from '../../assets/es/icon-esCom-loc.png';
import sample_dw from '../../assets/es/sample_dw.png';
import sample_gs from '../../assets/es/sample_gs.png';
import bg_esTitle_t from '../../assets/es/bg_esTitle_t.png';
import bg_esTitle_w from '../../assets/es/bg_esTitle_w.png';

import esTotalCount from '../../components/chart/emergencySupply/esTotalCount.vue';
import esCenterCount from '../../components/chart/emergencySupply/esCenterCount.vue';
import esMCount from '../../components/chart/emergencySupply/esMCount.vue';

echarts.registerMap('ZJ', mapData_zhejiang);
window.maplet = null;
let areaPosition = {
  '衢州市': [118.87578, 28.95327],
  '杭州市': [120.17501, 30.26051],
  '湖州市': [120.09581, 30.86945],
  '嘉兴市': [120.75284, 30.76613],
  '宁波市': [121.5456, 29.87668],
  '绍兴市': [120.57757, 30.00338],
  '台州市': [121.42248, 28.66317],
  '温州市': [120.69534, 27.9982],
  '丽水市': [119.93541, 28.44563],
  '金华市': [119.64937, 29.10462],
  '舟山市': [122.10703, 30.01912]
};
let overviewOption = {
  tooltip: {
    trigger: 'item',
    formatter: function(params) {
      var res = params.name + '<br />';
      var myseries = overviewOption.series;
      for (var i = 0; i < myseries.length; i++) {
        for (var k = 0; k < myseries[i].data.length; k++) {
          if (myseries[i].data[k].name == params.name) {
            res += myseries[i].name + ':' + myseries[i].data[k].value + '<br />';
          }
        }
      }
      return res;
    }
  },
  visualMap: {
    min: 1,
    max: 50000,
    show: false,
    text: ['', ''],
    textStyle: {
      color: '#fff'
    },
    realtime: false,
    calculable: true,
    inRange: {
      color: ['#30dcca']
    }
  },
  series: [{
      name: '应急中心数',
      type: 'map',
      mapType: 'ZJ', // 自定义扩展图表类型
      label: {
        formatter: '{a}</br>{b}</br>{c}</br>{d}</br>{e}</br>{f}',
        normal: {
          show: true,
          textStyle: {
            color: '#2d2d2d',
            fontSize: 12

          }
        },
        emphasis: {
          show: true,
          textStyle: {
            color: '#2d2d2d',
            fontSize: 12
          }
        }
      },
      emphasis: {
        label: {
          show: true
        }
      },
      data: [],
      nameMap: {}
    },
    {
      name: '应急机械数',
      type: 'map',
      mapType: 'ZJ', // 自定义扩展图表类型
      label: {
        formatter: '{a}</br>{b}</br>{c}</br>{d}</br>{e}</br>{f}',
        normal: {
          show: true,
          textStyle: {
            color: '#2d2d2d',
            fontSize: 12

          }
        },
        emphasis: {
          show: true,
          textStyle: {
            color: '#2d2d2d',
            fontSize: 12
          }
        }
      },
      emphasis: {
        label: {
          show: true
        }
      },
      data: [],
      nameMap: {}
    },
    {
      name: '应急人员数',
      type: 'map',
      label: {
        formatter: '{a}</br>{b}</br>{c}</br>{d}</br>{e}</br>{f}',
        normal: {
          show: true,
          textStyle: {
            color: '#2d2d2d',
            fontSize: 12

          }
        },
        emphasis: {
          show: true,
          textStyle: {
            color: '#2d2d2d',
            fontSize: 12
          }
        }
      },
      emphasis: {
        label: {
          show: true
        }
      },
      mapType: 'ZJ', // 自定义扩展图表类型
      data: [],
      nameMap: {}
    }
  ]
}

export default {
  name: 'App',
  components: {
    esTotalCount,
    esCenterCount,
    esMCount
  },
  data() {
    return {
      resource: {
        icon_esAgent,
        icon_esCom,
        sample_dw,
        sample_gs,
        bg_esTitle_t,
        bg_esTitle_w
      },
      overviewChart: null,
      keyword: '',
      markerInstance_es: {},
      // dateTime:Util.getDateByStamp(Date.now(),'yyyy-MM-dd hh:mm:ss'),
      // date:Util.getDateByStamp(Date.now(),'yyyy-MM-dd'),
      dIsHide: true,
      isDone: false,
      curMarker: {
        esInfo: ''
      },
      preMarker: {
        esInfo: ''
      },
      esDetail: {
        machinery: [],
        supplies: [],
        team: [],
        contacts: []
      }
    }
  },
  computed: {

  },
  watch: {
    // dateTime:function(val){
    //     this.date = val.split(' ')[0];
    // }
  },
  methods: {
    init: function() {
      let _this = this;
      maplet = new Maplet('mapbar'); //挂载地图实例至全局对象
      maplet.centerAndZoom(new MPoint(120.80566, 29.54957), 8);
      maplet.setOverviewLocation({
        type: Maplet.LEFT_BOTTOM
      });
      //此处处理老版本地图无法自适应频幕尺寸的问题-----start
      let D_mapbar = document.getElementById('mapbar');
      maplet.resize(D_mapbar.offsetWidth, D_mapbar.offsetHeight);
      window.onresize = function() {
        D_mapbar.style.width = '100%';
        D_mapbar.style.height = 'calc(100% - 62px)';
        maplet.resize(D_mapbar.offsetWidth, D_mapbar.offsetHeight);
      }
      //此处处理老版本地图无法自适应频幕尺寸的问题-----end
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
        maplet.centerAndZoom(new MPoint(areaPosition[name][0], areaPosition[name][1]), 9);
      });
      this.getOverviewData();
    },
    getOverviewData: function() {
      let _this = this;
      httpApi.getEmergencyStationAndPersonnelStatistics().then(res => res.json()).then(res => {
        if (res.code == '100000' && res.dataBody) {
          let data = res.dataBody;
          let arr0 = [],
            arr1 = [],
            arr2 = [];
          let rangeArr = [];
          for (let i = 0, n = data.length; i < n; i++) {
            let json0 = {},
              json1 = {},
              json2 = {};
            json0.name = data[i].areaName + '市';
            json0.value = data[i].cCount;
            json1.name = data[i].areaName + '市';
            json1.value = data[i].eCount;
            json2.name = data[i].areaName + '市';
            json2.value = data[i].pCount;
            arr0.push(json0);
            arr1.push(json1);
            arr2.push(json2);
            rangeArr.push(data[i].cCount + data[i].eCount + data[i].pCount);
          }
          overviewOption.series[0].data = arr0;
          overviewOption.series[1].data = arr1;
          overviewOption.series[2].data = arr2;
          _this.overviewChart.setOption(overviewOption);
        }
      });

    },
    // watchDate:function(){
    //     let _this =this;
    //     this.dateTime =Util.getDateByStamp(Date.now(),'yyyy-MM-dd hh:mm:ss');
    //     setTimeout(_this.watchDate,1000);
    // },
    drawEsPoint: function() {
      let _this = this;
      let esList = esCenter;
      for (let i = 0, n = esCenter.length; i < n; i++) {
        let icon, icon_loc;
        if (esCenter[i].type === 'dw') {
          icon = icon_esAgent;
          icon_loc = icon_esAgent_loc;
        } else {
          icon = icon_esCom;
          icon_loc = icon_esCom_loc;
        }
        if (esCenter[i].longitude && esCenter[i].latitude) {}
        let esMarker = new MMarker(
          new MPoint(esCenter[i].longitude, esCenter[i].latitude),
          new MIcon(icon, 28, 28)
        );
        maplet.addOverlay(esMarker);
        esMarker.code = esCenter[i].unitCode;
        esMarker.esInfo = esCenter[i];
        MEvent.addListener(esMarker, 'click', function(e) { //添加marker点击事件
          // console.log(esMarker.esInfo);
          _this.preMaker = _this.curMarker || esMarker;
          _this.curMarker = esMarker;
          if (_this.preMaker.esInfo.type === 'dw') {
            _this.preMaker.setIcon(new MIcon(icon_esAgent, 28, 28), true);
          } else {
            _this.preMaker.setIcon(new MIcon(icon_esCom, 28, 28), true);
          }
          esMarker.setIcon(new MIcon(icon_loc, 44, 44), true);
          httpApi.getEmergencyStationDetail({
            unitCode: esMarker.esInfo.unitCode,
            sname: esMarker.esInfo.unitName
          }).then(res => res.json()).then(res => {
            _this.dIsHide = false;
            if (res.code == '100000' && res.dataBody) {
              _this.esDetail = res.dataBody;
            } else {
              _this.esDetail = {
                machinery: [],
                supplies: [],
                team: [],
                contacts: []
              }
            }
          });
        });
        _this.markerInstance_es[esCenter[i].id] = esMarker;
      }
    },
    hideDS: function() {
      this.dIsHide = true;
    }
  },
  mounted: function() {
    this.init();
    this.initOverviewChart();
    // this.watchDate();
    this.drawEsPoint();
    this.isDone = true;
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
