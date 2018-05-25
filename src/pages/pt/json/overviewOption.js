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
      name: '接入站点数',
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
      data: [{
          name: '嘉兴市',
          value: 0
        },
        {
          name: '杭州市',
          value: 0
        },
        {
          name: '温州市',
          value: 0
        },
        {
          name: '湖州市',
          value: 0
        },
        {
          name: '绍兴市',
          value: 0
        }
      ],
      // 自定义名称映射
      nameMap: {}
    },
    {
      name: '昨日客流量',
      type: 'map',
      mapType: 'ZJ', // 自定义扩展图表类型
      label: {
        formatter: '{a}</br>{b}</br>{c}</br>{d}</br>{e}</br>{f}',
        normal: {
          show: true,
          textStyle: {
            color: '#fff',
            fontSize: 16

          }
        },
        emphasis: {
          show: true
        }
      },
      emphasis: {
        label: {
          show: true
        }
      },
      data: [{
          name: '嘉兴市',
          value: 0
        },
        {
          name: '杭州市',
          value: 0
        },
        {
          name: '温州市',
          value: 0
        },
        {
          name: '湖州市',
          value: 0
        },
        {
          name: '绍兴市',
          value: 0
        }
      ],
      // 自定义名称映射
      nameMap: {}
    }
  ]
}

export default overviewOption;
