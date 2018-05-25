let option = {
  color: ['#23d4a1', '#f1aa28'],
  // title: {
  //   text: '世界人口总量',
  //   subtext: '数据来自网络'
  // },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['公路管理机构', '高速公路经营单位'],
    textStyle: {
      color: '#e3e5e6'
    },
    right: 20
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)'],
    axisLabel: {
      color: '#e3e5e6',
      fontSize: 15
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#e3e5e6'
      }
    }
  },
  yAxis: {
    type: 'value',
    // boundaryGap: [0, 0.01],
    axisLabel: {
      color: '#e3e5e6',
      fontSize: 15
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#e3e5e6'
      }
    }
  },
  series: [{
      name: '公路管理机构',
      type: 'bar',
      barWidth: 15,
      barGap: 0.12,
      data: [18203, 23489, 29034, 104970, 131744, 630230]
    },
    {
      name: '高速公路经营单位',
      type: 'bar',
      barWidth: 15,
      data: [19325, 23438, 31000, 121594, 134141, 681807]
    }
  ]
};

export default option;
