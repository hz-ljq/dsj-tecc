<template>
<div id='app'>
  <div id='header'>
    <div id='title'>应急资源</div>
    <div id='time'></div>
  </div>

  <div id='map'></div>
  <div id='map-small'></div>

  <div id='chart1' v-show="false"></div>
  <div id='chart2' v-show="false"></div>

  <div id='info'></div>

  <div id='legend'>
    <div id='first'>
      <div class='icon yellow-circle'></div>
      <div class='title'>公路管理机构</div>
    </div>
    <div id='second'>
      <div class='icon blue-circle'></div>
      <div class='title'>高速公路经营单位</div>
    </div>
  </div>

  <div id='point-info-template'>
    <div class='title'>杭州市交通运输应急抢险与保障中心</div>
    <div class='sub-title'>杭州市西湖区转塘镇博联村柏树地103号</div>
    <div class='line'></div>
    <div class='body'>
      <div class='item' v-for='(item, index) in pointInfo' :key='index'>
        <div class='col1'>{{item.role}}</div>
        <div class='col2'>{{item.name}}</div>
        <div class='col3'>{{item.tel}}</div>
        <div class='col4'>{{item.num}}</div>
      </div>
    </div>
    <!-- <div class='triangle-down'></div> -->
  </div>

  <div id='table1'>
    <div class='header'>
      <div class='col1'>队伍名称</div>
      <div class='col2'>队伍人数</div>
    </div>
    <marquee direction="up" scrollamount="2" onmouseover="this.stop();" onmouseout="this.start()" class='body'>
      <div class='item' v-for='(item, index) in table1Data' :key='index'>
        <div class='col1' :title="item.name">{{item.name}}</div>
        <div class='col2' :title="item.value">{{item.value}}</div>
      </div>
    </marquee>
  </div>
  <div id='table2'>
    <div class='header'>
      <div class='col1'>机械名称</div>
      <div class='col2'>机械人数</div>
    </div>
    <marquee direction="up" scrollamount="2" onmouseover="this.stop();" onmouseout="this.start()" class='body'>
      <div class='item' v-for='(item, index) in table2Data' :key='index'>
        <div class='col1' :title="item.name">{{item.name}}</div>
        <div class='col2' :title="item.value">{{item.value}}</div>
      </div>
    </marquee>
  </div>
  <div id='table3'>
    <div class='header'>
      <div class='col1'>物资名称</div>
      <div class='col2'>物资数量</div>
      <div class='col3'>物资单位</div>
    </div>
    <marquee direction="up" scrollamount="2" onmouseover="this.stop();" onmouseout="this.start()" class='body'>
      <div class='item' v-for='(item, index) in table3Data' :key='index'>
        <div class='col1' :title="item.name">{{item.name}}</div>
        <div class='col2' :title="item.value">{{item.value}}</div>
        <div class='col3' :title="item.unit">{{item.unit}}</div>
      </div>
    </marquee>
  </div>



</div>
</template>

<script>
import './es.scss';
// import httpApi from '../../js/httpApi';
// import Util from '../../js/util';
// import esCenter from '../../js/esCenter';
import echarts from 'echarts';
import mapData_zhejiang from '../../assets/mapSource/province/zhejiang.json';

import options from './options.js';
window.jQuery = window.$ = require('jquery'); // jquery安装3.2.1，最新的3.3.1版本不能与velocity配合，原因不明~~
require('velocity-animate');

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      chart1: null,
      chart2: null,

      pointInfo: [],
      markers: [],

      myMap: null,
      myMap2: null,

      activePoint: {},

      table1Data: [{
        name: '杭州市jj交通运输应急抢险与保障急抢险与保障中心1',
        value: 111
      }, {
        name: '杭州市jj交通运输应急抢险与保障中心1',
        value: 222
      }, {
        name: '杭州市jj交通运输应急抢险与保障中心1',
        value: 333
      }, {
        name: '杭州市jj交通运输应急抢险与保障中心1',
        value: 444
      }, {
        name: '杭州市jj交通运输应急抢险与保障中心1',
        value: 555
      }, {
        name: '杭州市jj交通运输应急抢险与保障中心1',
        value: 666
      }, {
        name: '杭州市jj交通运输应急抢险与保障中心1',
        value: 777
      }, {
        name: '杭州市jj交通运输应急抢险与保障中心1',
        value: 888
      }, {
        name: '杭州市jj交通运输应急抢险与保障中心1',
        value: 999
      }],

      table2Data: [{
        name: '航空发动机吹雪车航空发动机吹雪车',
        value: 111
      }, {
        name: '航空发动机吹雪车',
        value: 222
      }, {
        name: '航空发动机吹雪车',
        value: 333
      }, {
        name: '航空发动机吹雪车',
        value: 444
      }, {
        name: '航空发动机吹雪车',
        value: 555
      }, {
        name: '航空发动机吹雪车',
        value: 666
      }, {
        name: '航空发动机吹雪车',
        value: 777
      }, {
        name: '航空发动机吹雪车',
        value: 888
      }, {
        name: '航空发动机吹雪车',
        value: 999
      }],

      table3Data: [{
        name: '编织袋/草包编织袋/草包编织袋/草包',
        value: 1000,
        unit: '个'
      }, {
        name: '编织袋/草包',
        value: 10001,
        unit: '个'
      }, {
        name: '编织袋/草包',
        value: 1200,
        unit: '个'
      }, {
        name: '编织袋/草包',
        value: 100,
        unit: '个'
      }, {
        name: '编织袋/草包',
        value: 10,
        unit: '个'
      }, {
        name: '编织袋/草包',
        value: 3000,
        unit: '个'
      }, {
        name: '编织袋/草包',
        value: 1800,
        unit: '个'
      }, {
        name: '编织袋/草包',
        value: 1020,
        unit: '个'
      }, ]
    }
  },
  methods: {
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
    initMap() {
      window.minemap.domainUrl = '//minedata.cn';
      window.minemap.dataDomainUrl = '//datahive.minedata.cn';
      window.minemap.spriteUrl = '//minedata.cn/minemapapi/v1.3/sprite/sprite';
      window.minemap.serviceUrl = '//minedata.cn/service';
      window.minemap.accessToken = '0c95154806ed45369e3858f0c69caa59';
      window.minemap.solution = 5594;

      this.myMap = new window.minemap.Map({
        container: 'map',
        style: '//minedata.cn/service/solu/style/id/5594',
        center: [120.84146, 29.65949],
        zoom: 8,
        pitch: 10,
        // dragRotate: true,
        maxZoom: 17, // 地图最大缩放级别限制
        minZoom: 1, // 地图最小缩放级别限制
        logoControl: false
      });

      this.myMap2 = new window.minemap.Map({
        container: 'map-small',
        style: '//minedata.cn/service/solu/style/id/5594',
        center: [120.84146, 29.65949],
        zoom: 12,
        pitch: 10,
        // dragRotate: true,
        maxZoom: 17, // 地图最大缩放级别限制
        minZoom: 1, // 地图最小缩放级别限制
        logoControl: false
      });

      this.myMap.on('load', () => {
        let fate = this.getDataForPoint();

        for (let x of fate) {
          let el = document.createElement('div');
          // el.id = 'marker';
          el.setAttribute('class', x.color === 'yellow' ? 'yellow-circle' : 'blue-circle');
          el.setAttribute('id', `point-${+new Date()}`);
          // el.setAttribute('data-lng', x.lng);
          // el.setAttribute('data-lat', x.lat);

          this.markers[x.id] = new minemap.Marker(el, {
              offset: [2, -5]
            })
            .setLngLat([x.lng, x.lat])
            // .setPopup(popup)
            .addTo(this.myMap);

          el.addEventListener('mouseenter', (e) => {
            el.style.cursor = 'pointer';
          });
          el.addEventListener('mouseleave', (e) => {
            el.style.cursor = 'none';
          });
          el.addEventListener('click', (e) => {
            this.pointInfo = x.info;
            this.$nextTick(() => {
              // let popupDom = $('#point-info');
              let popupDom = document.getElementById('point-info-template');
              let popup = new minemap.Popup({
                  closeButton: true,
                  offset: [17, -10]
                })
                .setHTML('<div id="point-info-active">' + popupDom.innerHTML + '</div>');
              // .setText(x.info);
              this.markers[x.id].setPopup(popup);

              // console.log(e.target.style.transform);
              // if (e.target.id === this.activePoint.id) {
              //   return;
              // }
              // if (this.activePoint.id) {
              //   $(this.activePoint).velocity('reverse', {
              //     duration: 800,
              //     easing: 'swing'
              //   });
              // }
              //
              // let pos1 = e.target.style.transform.indexOf('(');
              // let pos2 = e.target.style.transform.indexOf(',');
              // let pos3 = e.target.style.transform.indexOf(')');
              // this.activePoint = {
              //   id: e.target.id,
              //   translateX: e.target.style.transform.substring(pos1 + 1, pos2),
              //   translateY: e.target.style.transform.substring(pos2 + 2, pos3)
              // }
              //
              // $(e.target).velocity({
              //   translateX: this.activePoint.translateX,
              //   translateY: this.activePoint.translateY
              // }, {
              //   duration: 0
              // }).velocity({
              //   translateX: this.activePoint.translateX,
              //   translateY: this.activePoint.translateY,
              //   scale: 2
              // }, {
              //   duration: 800,
              //   easing: 'swing'
              // });
            })
          });
        }

        let geoData = {
          type: 'FeatureCollection',
          features: []
        };
        for (let x = 0; x < 1000; x++) {
          geoData.features.push({
            geometry: {
              type: 'Point',
              coordinates: [
                120.84146 + Math.random() - 0.5,
                29.65949 + Math.random() - 0.5
              ]
            },
            type: 'Features'
          });
        }
        this.myMap2.addSource('data-point', {
          type: 'geojson',
          // data: '//minedata.cn/minemapapi/demo/assets/poi_suzhou.json',
          data: geoData,
          cluster: true,
          clusterMaxZoom: 15,
          clusterRadius: 50
        });
        //添加非聚合图层
        this.myMap2.addLayer({
          'id': 'unclustered-points',
          'type': 'symbol',
          'source': 'data-point',
          'filter': ['!has', 'point_count'],
          'layout': {
            'icon-image': 'bank-15'
          }
        });
        //添加聚合图层
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
              'circle-radius': 20
            },
            'filter': i === 0 ? ['>=', 'point_count', layer[0]] : ['all', ['>=', 'point_count', layer[0]],
              ['<', 'point_count', layers[i - 1][0]]
            ]
          });
        });
        //添加数量图层
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

      this.myMap.on('moveend', (e) => {
        // console.log(e.target.transform);
        this.myMap2.flyTo({
          center: [e.target.transform._center.lng, e.target.transform._center.lat],
          speed: 0.8,
          zoom: e.target.transform._zoom
        });
      });
    },
    initChart() {
      this.chart1 = echarts.init(document.getElementById('chart1'));
      this.chart2 = echarts.init(document.getElementById('chart2'));
      this.chart1.setOption(options);
      this.chart2.setOption(options);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
      this.$http.get(CONFIG.apiHost + '/RTS/queryPassengerStationStatistics').then((res) => {
        res.data.code === '100000' && console.log(res.data.dataBody);
      });

      this.$http.get(`${CONFIG.apiHost}/RTS/queryPassengerStationInformation?zd=05771`).then((res) => {
        console.log(res.data);
      });

      this.initChart();
    });
  }
}
</script>
