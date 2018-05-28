let option = {
  color: ['#23d4a1', '#f1aa28'],
  title: {
    text: '各地市应急中心统计',
    // subtext: '数据来自网络'
    textStyle: {
      color: '#2bfbcf',
      fontWeight: 200,
      fontSize: 20
    },
    left: 230,
    top: 36
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['公路管理机构', '高速公路经营单位'],
    textStyle: {
      color: '#e3e5e6',
      fontWeight: 100,
      fontSize: 14,
    },
    right: 20,
    top: 80
  },
  grid: {
    left: '10%',
    right: '2%',
    top: '35%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)'],
    axisLabel: {
      color: '#e3e5e6',
      fontSize: 12
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
      barWidth: 10,
      barGap: 0.12,
      data: [18203, 23489, 29034, 104970, 131744, 630230],
      label: {
        normal: {
          show: true,
          offset: [4, 0],
          position: 'top',
          // position: ['-0%', '-10%'],
          align: 'right'
        }
      }
    },
    {
      name: '高速公路经营单位',
      type: 'bar',
      barWidth: 10,
      data: [19325, 23438, 31000, 121594, 134141, 681807],
      label: {
        normal: {
          show: true,
          offset: [-3, 0],
          position: 'top',
          align: 'left'
        }
      }
    }
  ]
};

export default option;
