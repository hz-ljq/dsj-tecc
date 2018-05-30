/*
*created by TK0335807 on 2018/2/8
*/
import util from './util';
let apiHost ='http://10.100.254.132:8888';
// let apiHost ='http://47.98.129.186:8085';
let httpRequest = function({url,method='POST',data={}}){
    let opt ={
            method:method,
            credentials:'same-origin',
            mode:'cors',
            headers:new Headers({'Content-Type':"application/json"}),
            body:JSON.stringify(data),
        },
        furl = url;
    if (method.toUpperCase()==='GET'){
        let queryStr ='';
        if(Object.keys(data).length){
            for(let key in data){
                queryStr+=(key+"="+data[key]+"&");
            }
        }
        queryStr =queryStr.replace(/\&$/,"");
        furl+='?'+queryStr;
        delete opt.body;
    }
    let quest =new Request(furl,opt);
    return fetch(quest);
};
let httpApi ={
    //获取 全省客流统计一览
    getHomePageStatistics:function(){
        return httpRequest({
            url:apiHost+'/RTS/queryHomePageStatistics',
            method:"GET"
        });
    },
    //地铁 查询杭州、宁波今日客流量、昨日总计
    getTotalCount:function(){
        return httpRequest({
            url:apiHost+'/RTS/queryTotalCll',
            method:"GET"
        });
    },
    // 地铁 通过站名获取单个站点统计数据
    getStationStatistic:function({stationName}={}){
        return httpRequest({
            url:apiHost+'/RTS/queryStationStatistics',
            method:"GET",
            data:{stationName:stationName}
        });
    },
    //地铁 通过站名获取单个站点进出口流量
    getStationFlow:function({stationName,areaCode}={}){
        return httpRequest({
            url:apiHost+'/RTS/queryStationFlow',
            method:"GET",
            data:{stationName:stationName,areaCode:areaCode}
        });
    },
    //地铁 根据地区编码获取今日客流量  areaCode:地区编码
    getDailyCount:function({areaCode}={}){
        return httpRequest({
            url:apiHost+'/RTS/queryCLL',
            method:"GET",
            data:{areaCode:areaCode}
        });
    },
    //地铁 通过地区编码获取进出口总流量排名前N；
    getTopNStation:function({n,areaCode}){
        return httpRequest({
            url:apiHost+'/RTS/queryTopNStationFlow',
            method:"GET",
            data:{top:n,areaCode:areaCode}
        });
    },
    //地铁 根据地区编码获取今日24小时内每小时进出口流量
    getHoursFlow:function({areaCode}={}){
        return httpRequest({
            url:apiHost+'/RTS/queryHourCLL',
            method:"GET",
            data:{areaCode:areaCode}
        });
    },
    // 地铁 获取七天内每日客流量
    getDaysFlow:function({areaCode}={}){
        return httpRequest({
            url:apiHost+'/RTS/querySevenDayCLL',
            method:"GET",
            data:{areaCode:areaCode}
        });
    },
    //地铁 实时流量趋势图
    getRealTimeTrendMapOfSubwayFlow:function({areaCode,date=util.getDateByStamp(Date.now(),"yyyyMMdd")}={}){
        return httpRequest({
            url:apiHost+'/RTS/queryRealTimeTrendMapOfSubwayFlow',
            method:"GET",
            data:{areaCode:areaCode,date:date}
        });
    },
    //地铁  流量对比分析 areaCode:地区编码 type:类型：1、日环比，2、周环比
    getAnalysisOfSybwayFlow:function({areaCode,type}={}){
        return httpRequest({
            url:apiHost+'/RTS/queryAnalysisOfSybwayFlow',
            method:"GET",
            data:{areaCode:areaCode,type:type}
        });
    },
    //地铁  全省地铁统计总数据
    getSubwayStationStatistics:function(){
        return httpRequest({
            url:apiHost+'/RTS/querySubwayStationStatistics',
            method:"GET"
        });
    },
    //客运 根据地区编码和站点名称查询客运客流量
    getPassengerStationFlow:function({dq,zd}={}){
        return httpRequest({
            url:apiHost+'/RTS/queryPassengerStationFlow',
            method:"GET",
            data:{dq:dq,zd:zd}
        });
    },
    //客运 全省区域流量排名，默认为昨天排名。
    getRankingOfRegionalFlow:function({date}={date:util.getDateByStamp(Date.now() - 1000*60*60*24,"yyyy-MM-dd")}){
        return httpRequest({
            url:apiHost+'/RTS/queryRankingOfRegionalFlow',
            method:"GET",
            data:{date:date}
        })
    },
    //客运 杭州实时流量趋势
    getRealTimeFlowTrendMap:function({date}={}){
        return httpRequest({
            url:apiHost+'/RTS/queryRealTimeFlowTrendMap',
            method:"GET"
            // data:{date:date}
        })
    },
    //客运 按地区查询近7天客运流量趋势
    getTrendOfPassengerFlowInSevenDays:function({dq}={}){
        return httpRequest({
            url:apiHost+'/RTS/queryTrendOfPassengerFlowInSevenDays',
            method:"GET",
            data:{dq:dq}
        })
    },
    // 客运 流量环比，dq:"地区编码",type:"1:日环比，2:月环比,3:周环比"
    getAnalysisOfFlow:function({dq,type=1}={dq:"",type:1}){
        return httpRequest({
            url:apiHost+'/RTS/queryAnalysisOfFlow',
            method:"GET",
            data:{dq:dq,type:type}
        })
    },
    //客运  全省客运站以及客运数量统计 默认为前一天的统计
    getPassengerStationStatistics:function(){
        return httpRequest({
            url:apiHost+'/RTS/queryPassengerStationStatistics',
            method:"GET"
        })
    },
    //客运 全省各个站点流量汇总 默认为前一天的统计
    getSummaryOfSiteFlow:function({date}={date:util.getDateByStamp(Date.now() - 1000*60*60*24,"yyyy-MM-dd")}){
        return httpRequest({
            url:apiHost+'/RTS/querySummaryOfSiteFlow',
            method:"GET",
            data:{date:date}
        })
    },
    // 客运 根据客运站点名称查询站点统计数据
    getPStationInformation:function({zd}={}){
        return httpRequest({
            url:apiHost+'/RTS/queryPassengerStationInformation',
            method:"GET",
            data:{zd:zd}
        })
    },
    //
    //应急物资 全省各地市应急站点、应急人员、应急物资统计
    getEmergencyStationAndPersonnelStatistics:function(){
        return httpRequest({
            url:apiHost+'/RTS/queryEmergencyStationAndPersonnelStatistics',
            method:"GET"
        })
    },
    //应急物资  全省应急站点、人员、应急物资总计
    getSummaryOfEmergencyMaterials:function(){
        return httpRequest({
            url:apiHost+'/RTS/querySummaryOfEmergencyMaterials',
            method:"GET"
        })
    },
    //应急物资  应急站点详情查询 unitCode：企业/单位编码
    getEmergencyStationDetail:function({unitCode}={}){
        return httpRequest({
            url:apiHost+'/RTS/queryEmergencyStationDetail',
            method:"GET",
            data:{unitCode:unitCode}
        })
    },
    // 应急物资 全省应急站点查询
    getEmergencyStationList:function(){
        return httpRequest({
            url:apiHost+'/RTS/queryEmergencyStationList',
            method:"GET"
        })
    },
    //应急物资 各地市应急中心数量查询
    getEmergencyStationByUnitType:function(){
        return httpRequest({
            url:apiHost+'/RTS/queryEmergencyStationByUnitType',
            method:"GET"
        })
    },
    //应急物资 各地市应急机械数量查询
    getEmergencyMachineryByUnitType:function(){
        return httpRequest({
            url:apiHost+'/RTS/queryEmergencyMachineryByUnitType',
            method:"GET"
        })
    },
    //应急物资 根据 code 或name 查询应急中心详情
    getEmergencyStationDetail:function({unitCode,sname}={}){
        return httpRequest({
            url:apiHost+'/RTS/queryEmergencyStationDetail',
            method:"POST",
            data:{unitCode:unitCode,sname:sname}
        })
    }
};
export default httpApi;
