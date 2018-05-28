let curStation = {
  name: '--',
  curTotal: 0,
  yesTotal: 0,
  curText: '截止目前',
  yesText: '昨日同期',
  ssChart: null,
  daysChart: null,
  ssOption: {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      top: 22,
      data: ['今日实时', '昨日同期']
    },
    grid: {
      left: 40,
      bottom: 24,
      top: 26,
      right: 40
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: false
      },
      position: {
        bottom: 12
      },
      axisLabel: {
        interval: 0
      },
      name: '时刻',
      data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    },
    yAxis: {
      type: 'value',
      name: '人次',
      splitLine: {
        show: false
      }
    },
    series: [{
        name: '今日实时',
        type: 'line',
        data: []
      },
      {
        name: '昨日同期',
        type: 'line',
        data: []
      }
    ]
  },
  daysOption: {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: 40,
      bottom: 24,
      top: 26,
      right: 40
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: false
      },
      name: '日期',
      position: {
        bottom: 12
      },
      data: []
    },
    yAxis: {
      type: 'value',
      name: '人次',
      splitLine: {
        show: false
      }
    },
    series: [{
      name: '站点流量',
      type: 'line',
      data: []
    }]
  }
};

export default curStation;
