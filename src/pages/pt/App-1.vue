<template>
  <div id='app'>
    <div id='header'>
      <div id='title'>长途客运</div>
      <div id='today'>{{today}}</div>
    </div>

    <div id='statistic'>
      <div id='hangzhou-statistic'>
        <div class='title'>杭州实时客流统计</div>
        <!-- <div class='time'>18:00</div> -->
        <div class='value'>{{statistic.hangzhou}}</div>
      </div>
      <div id='province-statistic'>
        <div class='title'>全省昨日客流统计</div>
        <div class='value'>{{statistic.province}}</div>
      </div>
    </div>

    <!-- <transition name="switch">
      <div id='emergency-info' v-show="!showPointInfo">
        <div id='unit'>
          <span class="title">应急单位</span>
          <div class="value">{{emergencyInfo.unit}}</div>
        </div>
        <div id='person'>
          <span class="title">应急人员</span>
          <div class="value">{{emergencyInfo.person}}</div>
        </div>
        <div id='machine'>
          <span class="title">应急机械</span>
          <div class="value">{{emergencyInfo.machine}}</div>
        </div>
        <div id='team'>
          <span class="title">应急队伍</span>
          <div class="value">{{emergencyInfo.team}}</div>
        </div>
      </div>
    </transition> -->

    <div id='map'></div>
    <div id='mini-map'></div>
    <div id='mini-map-ring'></div>

    <div id='chart1'></div>
    <div id='chart2'></div>
    <div id='chart3'></div>
    <div id='title-line1'></div>
    <div id='title-line2'></div>
    <div id='title-line3'></div>

    <!-- <div id='legend'>
      <div id='first'>
        <div class='icon yellow-circle'></div>
        <div class='title'>站点</div>
      </div>
      <div id='second'>
        <div class='icon blue-circle'></div>
        <div class='title'>大流量站点</div>
      </div>
    </div> -->

    <div id='point-info-template'>
      <div class='head'>{{stationName}}</div>
      <div class='body'>
        <div id='flow-ratio'>
          <div class="title">站点流量对比</div>
          <div class="row">
            <div class='name'>{{flowRatio.name1}}</div>
            <div class='value'>{{flowRatio.value1}}</div>
            <div class='unit'>人次</div>
          </div>
          <div class="row">
            <div class='name'>{{flowRatio.name2}}</div>
            <div class='value'>{{flowRatio.value2}}</div>
            <div class='unit'>人次</div>
          </div>
        </div>
        <div id='flow-tendency'>
          <div class="title">站点流量趋势图</div>
          <div id='flow-tendency-chart'></div>
        </div>
        <div id='seven-tendency'>
          <div class="title">站点近7天客流趋势</div>
          <div id='seven-tendency-chart'></div>
        </div>
      </div>

      <!-- <div class='body'>
        <div class='item' v-for='(item, index) in pointInfo' :key='index'>
          <div class='col1' :title="item.phone">{{item.personType}}</div>
          <div class='col2' :title="item.phone">{{item.personName}}</div>
          <div class='col3' :title="item.phone">{{item.phone}}</div>
          <div class='col4' :title="item.phone">{{item.trafficPhone}}</div>
        </div>
      </div> -->
    </div>

    <!-- <transition-group name="switch">
      <div id='table1' key="3" v-show="showPointInfo">
        <div class='title'>应急队伍</div>
        <div class='header'>
          <div class='col1'>队伍名称</div>
          <div class='col2'>队伍人数</div>
        </div>
        <marquee direction="up" scrollamount="2" onmouseover="this.stop();" onmouseout="this.start()" class='body'>
          <div class='item' v-for='(item, index) in table1Data' :key='index'>
            <div class='col1' :title="item.emergencyTeamName">{{item.emergencyTeamName}}</div>
            <div class='col2' :title="item.personNumber">{{item.personNumber}}</div>
          </div>
        </marquee>
      </div>
      <div id='table2' key="4" v-show="showPointInfo">
        <div class='title'>应急机械</div>
        <div class='header'>
          <div class='col1'>机械名称</div>
          <div class='col2'>机械人数</div>
        </div>
        <marquee direction="up" scrollamount="2" onmouseover="this.stop();" onmouseout="this.start()" class='body'>
          <div class='item' v-for='(item, index) in table2Data' :key='index'>
            <div class='col1' :title="item.mechanicalName">{{item.mechanicalName}}</div>
            <div class='col2' :title="item.number">{{item.number}}</div>
          </div>
        </marquee>
      </div>
      <div id='table3' key="5" v-show="showPointInfo">
        <div class='title'>应急物资</div>
        <div class='header'>
          <div class='col1'>物资名称</div>
          <div class='col2'>物资数量</div>
          <div class='col3'>物资单位</div>
        </div>
        <marquee direction="up" scrollamount="2" onmouseover="this.stop();" onmouseout="this.start()" class='body'>
          <div class='item' v-for='(item, index) in table3Data' :key='index'>
            <div class='col1' :title="item.materialName | deleteUnit">{{item.materialName | deleteUnit}}</div>
            <div class='col2' :title="item.number">{{item.number}}</div>
            <div class='col3' :title="item.materialName | filterUnit">{{item.materialName | filterUnit}}</div>
          </div>
        </marquee>
      </div>
    </transition-group> -->
  </div>
</template>

<script>
import './pt.scss';
// import httpApi from '../../js/httpApi';
// import Util from '../../js/util';
// import mapData_zhejiang from '../../assets/mapSource/province/zhejiang.json';
// import esCenter from './esCenter';
import busStation from './busStation';
import options from './options.js';

import echarts from 'echarts';
window.jQuery = window.$ = require('jquery'); // jquery安装3.2.1，最新的3.3.1版本不能与velocity配合，原因不明~~
require('velocity-animate');

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      stationName: 'stationName222',
      flowRatio: {
        name1: 'name1',
        value1: 'value',
        name2: 'name1',
        value2: 'value',
      },

      timerForToday: -1,
      timerForChart: -1,
      timerForStatistic: -1,
      // timerForEmergencyInfo: -1,

      today: '',

      emergencyInfo: {
        unit: 0,
        person: 0,
        machine: 0,
        team: 0
      },

      // showPointInfo: false,
      // clickOnPointFlag: false,
      chart1: null,
      chart2: null,
      chart3: null,
      chart4: null,
      chart5: null,

      pointInfo: [],
      // markers: [],

      myMap: null,
      myMap2: null,

      activePoint: {},

      statistic: {
        hangzhou: 0,
        province: 0
      }

      // table1Data: [{
      //   name: '杭州市jj交通运输应急抢险与保障急抢险与保障中心1',
      //   value: 111
      // }, {
      //   name: '杭州市jj交通运输应急抢险与保障中心1',
      //   value: 222
      // }],
      //
      // table2Data: [{
      //   name: '航空发动机吹雪车航空发动机吹雪车',
      //   value: 111
      // }, {
      //   name: '航空发动机吹雪车',
      //   value: 222
      // }, {
      //   name: '航空发动机吹雪车',
      //   value: 333
      // }],
      //
      // table3Data: [{
      //   name: '编织袋/草包编织袋/草包编织袋/草包',
      //   value: 1000,
      //   unit: '个'
      // }, {
      //   name: '编织袋/草包',
      //   value: 10001,
      //   unit: '个'
      // }]
    }
  },
  // filters: {
  //   // 删除单位
  //   deleteUnit(value) {
  //     if (!value) return '';
  //     let index = value.indexOf('（');
  //     return value.substring(0, index);
  //   },
  //
  //   // 过滤出单位
  //   filterUnit(value) {
  //     if (!value) return '';
  //     let begin = value.indexOf('（');
  //     let end = value.indexOf('）');
  //     return value.substring(begin + 1, end);
  //   }
  // },
  methods: {
    // 待删---------------
    getDataForPoint() {
      let fate = [{
        id: 'id1',
        lat: 29.5,
        lng: 120.6,
        color: 'blue',
        info: [{
          role: '应急负责人',
          name: '应急负责人1',
          tel: 13888888881,
          num: 111111
        }, {
          role: '部门负责人',
          name: '部门负责人1',
          tel: 13888888882,
          num: 22222
        }, {
          role: '应急联络人',
          name: '应急联络人1',
          tel: 13888888883,
          num: 333333
        }, {
          role: '队伍联络人',
          name: '队伍联络人1',
          tel: 13888888884,
          num: 444444
        }, {
          role: '物资联络人',
          name: '物资联络人1',
          tel: 13888888885,
          num: 555555
        }]
      }, {
        id: 'id2',
        lat: 29.65,
        lng: 120.84146,
        color: 'blue',
        info: [{
          role: '应急负责人',
          name: '应急负责人1',
          tel: 13888888881,
          num: 111111
        }, {
          role: '部门负责人',
          name: '部门负责人1',
          tel: 13888888882,
          num: 22222
        }, {
          role: '应急联络人',
          name: '应急联络人1',
          tel: 13888888883,
          num: 333333
        }, {
          role: '队伍联络人',
          name: '队伍联络人1',
          tel: 13888888884,
          num: 444444
        }, {
          role: '物资联络人',
          name: '物资联络人1',
          tel: 13888888885,
          num: 555555
        }]
      }, {
        id: 'id3',
        lat: 29.8,
        lng: 120.95,
        color: 'yellow',
        info: [{
          role: '应急负责人',
          name: '应急负责人1',
          tel: 1388888888122222,
          num: 111111
        }, {
          role: '部门负责人',
          name: '部门负责人1',
          tel: 13888888882,
          num: 22222
        }, {
          role: '应急联络人',
          name: '应急联络人1',
          tel: 13888888883,
          num: 333333
        }, {
          role: '队伍联络人',
          name: '队伍联络人1',
          tel: 13888888884,
          num: 444444
        }, {
          role: '物资联络人',
          name: '物资联络人1',
          tel: 13888888885,
          num: 555555
        }]
      }];
      return fate;
    },

    // 初始化地图
    initMap() {
      // 公网地图
      // window.minemap.domainUrl = '//minedata.cn';
      // window.minemap.dataDomainUrl = '//datahive.minedata.cn';
      // window.minemap.spriteUrl = '//minedata.cn/minemapapi/v1.3/sprite/sprite';
      // window.minemap.serviceUrl = '//minedata.cn/service';
      // window.minemap.accessToken = '0c95154806ed45369e3858f0c69caa59';
      // window.minemap.solution = 5594;
      // let option = {
      //   style: '//minedata.cn/service/solu/style/id/5594',
      //   // center: [120.84146, 29.65949],
      //   center: [120.04146, 29.65949],
      //   zoom: 7,
      //   pitch: 10,
      //   // dragRotate: true,
      //   maxZoom: 15, // 地图最大缩放级别限制
      //   minZoom: 3, // 地图最小缩放级别限制
      //   logoControl: false
      // };

      // 本地地图
      window.minemap.domainUrl = 'http://10.100.254.134';
      window.minemap.dataDomainUrl = '//datahive.minedata.cn';
      window.minemap.spriteUrl = 'http://10.100.254.134/minemapapi/v1.3/sprite/sprite';
      window.minemap.serviceUrl = 'http://10.100.254.134/service';
      window.minemap.accessToken = '9be4003e6e62452fa6c8e9c099b86457';
      window.minemap.solution = 4653;
      let option = {
        style: 'http://10.100.254.134/service/solu/style/id/4653',
        // center: [120.84146, 29.65949],
        center: [120.04146, 29.65949],
        zoom: 7,
        pitch: 10,
        // dragRotate: true,
        maxZoom: 15, // 地图最大缩放级别限制
        minZoom: 3, // 地图最小缩放级别限制
        logoControl: false
      };

      option.container = 'map';
      this.myMap = new window.minemap.Map(option);
      option.container = 'mini-map';
      this.myMap2 = new window.minemap.Map(option);

      this.myMap.on('load', () => {
        // let fate = this.getDataForPoint();
        // 渲染地图打点；
        for (let key in busStation) {
          for (let x of busStation[key]) {
            let el = document.createElement('div');
            el.setAttribute('class', x.type === 'dw' ? 'yellow-circle' : 'blue-circle');

            let marker = new minemap.Marker(el, {
                offset: [2, -5]
              })
              .setLngLat([x.latlon[0], x.latlon[1]])
              // .setPopup(popup)
              .addTo(this.myMap);

            el.addEventListener('mouseenter', (e) => {
              el.style.cursor = 'pointer';
            });
            el.addEventListener('mouseleave', (e) => {
              el.style.cursor = 'none';
            });
            el.addEventListener('click', (e) => { // marker的点击事件：出现marker信息的弹框；
              $('#point-info-active').remove();
              // this.clickOnPointFlag = true;
              // console.log('--point');

              // 获取弹框信息
              this.$http.get(CONFIG.apiHost + '/RTS/queryPassengerStationInformation?zd=' + x.name).then((res) => {
                if (res.data.code !== '100000') return;
                console.log(res.data.dataBody);
                this.stationName = res.data.dataBody.stationName;
                this.flowRatio = {
                  name1: key === '0571' ? '截止目前' : '昨日总计',
                  name2: key === '0571' ? '昨日同期' : '前日总计',
                  value1: res.data.dataBody.nowTotalFlow,
                  value2: res.data.dataBody.lastTotalFlow
                };

                // this.pointInfo = res.data.dataBody.contacts;
                this.$nextTick(() => {
                  let popupDom = document.getElementById('point-info-template');
                  let popup = new minemap.Popup({
                      closeButton: false,
                      offset: [17, -10]
                    })
                    .setHTML('<div id="point-info-active">' + popupDom.innerHTML + '</div>')
                    .setLngLat([x.latlon[0], x.latlon[1]])
                    .addTo(this.myMap);
                  // .setText(x.info);
                  // marker.setPopup(popup);

                  // let dom = document.getElementById('point-info-active');
                  // console.log(dom);
                  this.chart4 = echarts.init($('#point-info-active').find('#flow-tendency-chart')[0]);  // 【全省区域客运流量排名】图表
                  this.chart5 = echarts.init($('#point-info-active').find('#seven-tendency-chart')[0]);  // 【全省区域客运流量排名】图表

                  let myOption1 = JSON.parse(JSON.stringify(options.lineOptionForFlow));
                  let time = [];
                  for (let i = 0; i < 24; i++) {
                    time.push(i);
                  }
                  myOption1.xAxis.data = time;
                  if (res.data.dataBody.detail) {
                    myOption1.series[0].data = res.data.dataBody.detail[0].data;
                    myOption1.series[1].data = res.data.dataBody.detail[1].data;
                  }
                  this.chart4.clear();
                  this.chart4.setOption(myOption1);

                  let myOption2 = JSON.parse(JSON.stringify(options.lineOptionForSevenFlow));
                  myOption2.xAxis.data = res.data.dataBody.daysDetail.map(item => {
                    let month = +item.businessDay.substr(4, 2);
                    let date = +item.businessDay.substr(6, 2);
                    return month + '/' + date;
                  });
                  myOption2.series[0].data = res.data.dataBody.daysDetail.map(item => item.totalFlow)
                  this.chart5.clear();
                  this.chart5.setOption(myOption2);
                });

                // this.table1Data = res.data.dataBody.team;
                // this.table2Data = res.data.dataBody.machinery;
                // this.table3Data = res.data.dataBody.supplies;
              });
            });
          }
        }







        // for (let x of esCenter) {
        //   let el = document.createElement('div');
        //   el.setAttribute('class', x.type === 'dw' ? 'yellow-circle' : 'blue-circle');
        //
        //   let marker = new minemap.Marker(el, {
        //       offset: [2, -5]
        //     })
        //     .setLngLat([x.longitude, x.latitude])
        //     // .setPopup(popup)
        //     .addTo(this.myMap);
        //
        //   el.addEventListener('mouseenter', (e) => {
        //     el.style.cursor = 'pointer';
        //   });
        //   el.addEventListener('mouseleave', (e) => {
        //     el.style.cursor = 'none';
        //   });
        //   el.addEventListener('click', (e) => { // marker的点击事件：出现marker信息的弹框；
        //     $('#point-info-active').remove();
        //     // this.clickOnPointFlag = true;
        //     // console.log('--point');
        //
        //     // 获取弹框信息
        //     this.$http.post(CONFIG.apiHost + '/RTS/queryPassengerStationInformation', {unitCode: x.unitCode, sname: x.unitName}).then((res) => {
        //       if (res.data.code !== '100000') return;
        //       console.log(res.data.dataBody);
        //       this.pointInfo = res.data.dataBody.contacts;
        //       this.$nextTick(() => {
        //         let popupDom = document.getElementById('point-info-template');
        //         let popup = new minemap.Popup({
        //             closeButton: false,
        //             offset: [17, -10]
        //           })
        //           .setHTML('<div id="point-info-active">' + popupDom.innerHTML + '</div>')
        //           .setLngLat([x.longitude, x.latitude])
        //           .addTo(this.myMap);
        //         // .setText(x.info);
        //         // marker.setPopup(popup);
        //       });
        //
        //       // this.table1Data = res.data.dataBody.team;
        //       // this.table2Data = res.data.dataBody.machinery;
        //       // this.table3Data = res.data.dataBody.supplies;
        //     });
        //   });
        // }

        // 聚合点渲染
        let geoData = { // 创建聚合点的geojson；
          type: 'FeatureCollection',
          features: []
        };

        for (let key in busStation) {
          for (let x of busStation[key]) {
            geoData.features.push({
              geometry: {
                type: 'Point',
                coordinates: [
                  x.latlon[0],
                  x.latlon[1]
                ]
              },
              type: 'Features'
            });
          }
        }

        // 根据geojson创建数据源
        this.myMap2.addSource('data-point', {
          type: 'geojson',
          // data: '//minedata.cn/minemapapi/demo/assets/poi_suzhou.json',
          data: geoData,
          cluster: true,
          clusterMaxZoom: 15,
          clusterRadius: 50
        });

        // 根据数据源，添加非聚合图层
        // this.myMap2.addLayer({
        //   'id': 'unclustered-points',
        //   'type': 'symbol',
        //   'source': 'data-point',
        //   'filter': ['!has', 'point_count'],
        //   'layout': {
        //     'icon-image': 'bank-15'
        //   }
        // });
        this.myMap2.addLayer({
          'id': 'unclustered-points',
          'type': 'circle',
          'source': 'data-point',
          'filter': ['!has', 'point_count'],
          'paint': {
            'circle-color': '#23d3a1',
            'circle-radius': 12
          },
        });

        // 根据数据源，添加非聚合数量图层
        this.myMap2.addLayer({
          'id': 'unclustered-count',
          'type': 'symbol',
          'source': 'data-point',
          'layout': {
            'text-field': '1',
            'text-size': 14
          },
          'paint': {
            'text-color': 'black'
          },
          'filter': ['!has', 'point_count']
        });

        // 根据数据源，添加聚合图层
        // let layers = [
        //   [1000, '#f28cb1'],
        //   [100, '#f1f075'],
        //   [0, '#51bbd6']
        // ];
        let layers = [
          [1000, '#23d3a1'],
          [100, '#23d3a1'],
          [0, '#23d3a1']
        ];
        layers.forEach((layer, i) => {
          this.myMap2.addLayer({
            'id': 'cluster-' + i,
            'type': 'circle',
            'source': 'data-point',
            'paint': {
              'circle-color': layer[1],
              'circle-radius': 12
            },
            'filter': i === 0 ? ['>=', 'point_count', layer[0]] : ['all', ['>=', 'point_count', layer[0]],
              ['<', 'point_count', layers[i - 1][0]]
            ]
          });
        });

        // 根据数据源，添加聚合数量图层
        this.myMap2.addLayer({
          'id': 'cluster-count',
          'type': 'symbol',
          'source': 'data-point',
          'layout': {
            'text-field': '{point_count}',
            'text-size': 14
          },
          'paint': {
            'text-color': 'black'
          },
          'filter': ['has', 'point_count']
        });
      });

      // 根据大地图的鼠标操控，来同步mini地图的中心坐标和缩放
      this.myMap.on('moveend', (e) => {
        // console.log(e.target.transform); // minemap实例的信息都存放在e.target.transform里面
        this.myMap2.flyTo({
          center: [e.target.transform._center.lng, e.target.transform._center.lat],
          speed: 1,
          zoom: e.target.transform._zoom
        });
      });

      // // 用来分析鼠标单击在marker上，还是marker以外的地图区域上，以此来响应3个表格的显示/隐藏状态
      // this.myMap.on('click', (e) => {
      //   console.log('--map');
      //   if (!this.clickOnPointFlag) {
      //     this.showPointInfo = false;
      //   } else {
      //     this.showPointInfo = true;
      //   }
      //   this.clickOnPointFlag = false;
      // });
    },

    // 初始化echarts图表
    initChart() {
      this.chart1 = echarts.init(document.getElementById('chart1'));  // 【全省近7天客流趋势】图表
      this.chart2 = echarts.init(document.getElementById('chart2'));  // 【杭州实时流趋势】图表
      this.chart3 = echarts.init(document.getElementById('chart3'));  // 【全省区域客运流量排名】图表

      this.getDataAndRenderChart();
      this.timerForChart = setInterval(() => {
        this.getDataAndRenderChart();
      }, 300000);
    },

    // 获取数据，并渲染echarts图表
    getDataAndRenderChart() {
      // this.chart1.setOption(options.lineOption);
      // this.chart2.setOption(options.lineOption);
      // this.chart3.setOption(options.barOption);

      // 【全省近7天客流趋势】图表渲染
      this.$http.get(CONFIG.apiHost + '/RTS/queryTrendOfPassengerFlowInSevenDays', {dq: ''}).then((res) => {
        if (res.data.code !== '100000') return;
        // console.log(res.data.dataBody);
        let myOption = JSON.parse(JSON.stringify(options.lineOption1));

        let time = [];
        let value = [];
        for (let key in res.data.dataBody) {
          let month = +key.substr(5, 2);
          let date = +key.substr(8, 2);
          time.push(month + '/' + date);
          value.push(res.data.dataBody[key]);
        }
        myOption.xAxis.data = time;
        myOption.series[0].data = value;

        this.chart1.clear();
        this.chart1.setOption(myOption);
      }).catch(error => {
        console.log('----------报错啦，位置：【全省近7天客流趋势】图表渲染！！！');
        console.log(error);
      });

      // 【杭州实时流趋势】图表渲染
      this.$http.get(CONFIG.apiHost + '/RTS/queryRealTimeFlowTrendMap').then((res) => {
        if (res.data.code !== '100000') return;
        // console.log(res.data.dataBody);
        let myOption = JSON.parse(JSON.stringify(options.lineOption2));
        myOption.title.text = '杭州实时流趋势';

        let todayHours = res.data.dataBody[0].hourFlow.map(item => item.hour);
        let todayValue = res.data.dataBody[0].hourFlow.map(item => item.total);
        let yesterdayValue = res.data.dataBody[1].hourFlow.map(item => item.total);

        myOption.xAxis.data = todayHours;
        myOption.series[0].data = todayValue;
        myOption.series[1].data = yesterdayValue;
        this.chart2.clear();
        this.chart2.setOption(myOption);
      }).catch(error => {
        console.log('----------报错啦，位置：【杭州实时流趋势】图表渲染！！！');
        console.log(error);
      });

      // 【全省区域客运流量排名】图表渲染
      this.$http.get(CONFIG.apiHost + '/RTS/queryRankingOfRegionalFlow', {date: new Date(+new Date() - 24 * 60 * 60 * 1000).pattern('yyyy-MM-dd')}).then((res) => {
        if (res.data.code !== '100000') return;
        // console.log(res.data.dataBody);
        let myOption = JSON.parse(JSON.stringify(options.barOption));

        myOption.xAxis.data = res.data.dataBody.map(item => item.dq);
        myOption.series[0].data = res.data.dataBody.map(item => item.checkNum);
        this.chart3.clear();
        this.chart3.setOption(myOption);
      }).catch(error => {
        console.log('----------报错啦，位置：【全省区域客运流量排名】图表渲染！！！');
        console.log(error);
      });
    },

    // // 获取数据，并渲染应急信息
    // getDataAndRenderForEmergencyInfo() {
    //   this.$http.get(CONFIG.apiHost + '/RTS/querySummaryOfEmergencyMaterials').then((res) => {
    //     if (res.data.code !== '100000') return;
    //     this.emergencyInfo = {
    //       unit: res.data.dataBody[0].cCount,
    //       person: res.data.dataBody[0].pCount,
    //       machine: res.data.dataBody[0].eCount,
    //       team: res.data.dataBody[0].tCount
    //     }
    //   })
    // }
    // 获取统计数据，并渲染
    getDataForStatistic() {
      this.$http.get(CONFIG.apiHost + '/RTS/queryPassengerStationStatistics').then((res) => {
        console.log(res.data.dataBody);
        if (res.data.code !== '100000') return;
        this.statistic = {
          hangzhou: res.data.dataBody.hzFlow,
          province: res.data.dataBody.flow
        }
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
      this.initChart();

      this.today = new Date().pattern('yyyy年MM月dd日 EEE HH:mm:ss');
      this.timerForToday = setInterval(() => {
        this.today = new Date().pattern('yyyy年MM月dd日 EEE HH:mm:ss');
      }, 1000);

      this.getDataForStatistic();
      this.timerForStatistic = setInterval(() => {
        this.getDataForStatistic();
      }, 300000);

      // this.getDataAndRenderForEmergencyInfo();
      // this.timerForEmergencyInfo = setInterval(() => {
      //   this.getDataAndRenderForEmergencyInfo();
      // }, 300000);
    });
  },
  beforeDestroy() {
    if (this.chart1) {
      this.chart1.dispose();
    }
    if (this.chart2) {
      this.chart2.dispose();
    }
    if (this.chart3) {
      this.chart3.dispose();
    }
    clearInterval(this.timerForToday);
    clearInterval(this.timerForChart);
    clearInterval(this.timerForStatistic);
    // clearInterval(this.timerForEmergencyInfo);
  }
}
</script>
