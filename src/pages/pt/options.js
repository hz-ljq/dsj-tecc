let lineOption1 = {
  color: ['#2bfecf'],
  title: {
    text: '全省近7天客流趋势',
    // subtext: '数据来自网络'
    textStyle: {
      color: '#2bfbcf',
      fontWeight: 200,
      fontSize: 20
    },
    right: 6,
    top: 36
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line'
    }
  },
  grid: {
    left: '10%',
    right: '2%',
    top: '45%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
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
    name: '万人次     ',
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
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line',
    symbol: 'circle',
    symbolSize: 8,
    areaStyle: {
      normal: {
        color: 'rgba(43, 251, 207, 0.5)'
      }
    },
    label: {
      normal: {
        show: true,
        position: 'top'
      }
    },
    smooth: true
  }]
};

let lineOption2 = {
  color: ['#2bfecf', '#f1ad29'],
  title: {
    text: '全省近7天客流趋势',
    // subtext: '数据来自网络'
    textStyle: {
      color: '#2bfbcf',
      fontWeight: 200,
      fontSize: 20
    },
    right: 6,
    top: 36
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line'
    }
  },
  grid: {
    left: '10%',
    right: '2%',
    top: '45%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
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
    name: '万人次     ',
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
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line',
    symbol: 'circle',
    symbolSize: 8,
    areaStyle: {
      normal: {
        color: 'rgba(43, 251, 207, 0.5)'
      }
    },
    label: {
      normal: {
        show: true,
        position: 'top'
      }
    },
    smooth: true
  }, {
    data: [20, 1932, 301, 3934, 190, 130, 120],
    type: 'line',
    symbol: 'circle',
    symbolSize: 8,
    areaStyle: {
      normal: {
        color: 'rgba(243, 172, 40, 0.5)'
      }
    },
    label: {
      normal: {
        show: true,
        position: 'top'
      }
    },
    smooth: true
  }]
};

let barOption = {
  color: ['#23d4a1'],
  title: {
    text: '全省区域客运流量排名',
    // subtext: '数据来自网络'
    textStyle: {
      color: '#2bfbcf',
      fontWeight: 200,
      fontSize: 20
    },
    right: 2,
    top: 36
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
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
    name: '万人次     ',
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
    name: '全省区域客运流量排名',
    type: 'bar',
    barWidth: 22,
    label: {
      normal: {
        show: true,
        position: 'top'
      }
    },
    // barGap: 0.12,
    data: [100, 50, 120, 290, 320, 400]
  }]
};

let lineOptionForFlow = {
  color: ['#2bfecf', '#f1ad29'],
  // title: {
  //   text: '全省近7天客流趋势',
  //   // subtext: '数据来自网络'
  //   textStyle: {
  //     color: '#2bfbcf',
  //     fontWeight: 200,
  //     fontSize: 20
  //   },
  //   right: 6,
  //   top: 36
  // },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line'
    }
  },
  grid: {
    left: '2%',
    right: '2%',
    top: '16%',
    bottom: '0%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    data: [],
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
    name: '人次',
    nameGap: 4,
    type: 'value',
    // boundaryGap: [0, 0.01],
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
  series: [{
    data: [],
    type: 'line',
    symbol: 'circle',
    symbolSize: 6,
    // areaStyle: {
    //   normal: {
    //     color: 'rgba(43, 251, 207, 0.5)'
    //   }
    // },
    // label: {
    //   normal: {
    //     show: true,
    //     position: 'top'
    //   }
    // },
    smooth: true
  }, {
    data: [],
    type: 'line',
    symbol: 'circle',
    symbolSize: 6,
    // areaStyle: {
    //   normal: {
    //     color: 'rgba(243, 172, 40, 0.5)'
    //   }
    // },
    // label: {
    //   normal: {
    //     show: true,
    //     position: 'top'
    //   }
    // },
    smooth: true
  }]
};

let lineOptionForSevenFlow = {
  color: ['#2bfecf'],
  // title: {
  //   text: '全省近7天客流趋势',
  //   // subtext: '数据来自网络'
  //   textStyle: {
  //     color: '#2bfbcf',
  //     fontWeight: 200,
  //     fontSize: 20
  //   },
  //   right: 6,
  //   top: 36
  // },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line'
    }
  },
  grid: {
    left: '2%',
    right: '2%',
    top: '16%',
    bottom: '0%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
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
    name: '人次',
    nameGap: 4,
    type: 'value',
    // boundaryGap: [0, 0.01],
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
  series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line',
    symbol: 'circle',
    symbolSize: 6,
    // areaStyle: {
    //   normal: {
    //     color: 'rgba(43, 251, 207, 0.5)'
    //   }
    // },
    // label: {
    //   normal: {
    //     show: true,
    //     position: 'top'
    //   }
    // },
    smooth: true
  }]
};

export default {
  lineOption1,
  lineOption2,
  barOption,
  lineOptionForSevenFlow,
  lineOptionForFlow
};
