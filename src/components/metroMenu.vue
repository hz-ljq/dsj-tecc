<style>
    .el-menu-item.disabled{
        cursor: not-allowed;
        color:#8a8a8a;
    }
    .el-menu-item span{
        font-size: 14px;
    }
    .el-menu-item.disabled span,.el-menu-item.disabled.is-active span{
        color:#8a8a8a;
    }
</style>

<template>
    <el-menu
             default-active="地铁一号线"
             :unique-opened="true"
             background-color="#021931"
             text-color="#fff"
             active-text-color="#ffd04b"
    >
        <el-submenu v-for="navItem_p in metroList" :key="navItem_p.id" :index="navItem_p.name">
            <template slot="title">
                <!--<i v-if="navItem_p.icon" :class="navItem_p.icon"></i>-->
                <img :src="(areaCode=='0571'?iconhzMetro:iconnbMetro)" alt="" />
                <span style="font-size:16px;">{{navItem_p.name}}</span>
            </template>
            <el-menu-item v-for="navItem_c in navItem_p.station" v-if="navItem_c.state==1"  v-on:click="triggerMap(navItem_c.id,navItem_c.name,areaCode)"  :key="navItem_c.id" :index="navItem_c.name">
                <img :src="iconmetroStation" alt="" />
                <span slot="title" style="font-size:14px;">{{navItem_c.name}}</span>
            </el-menu-item>
            <el-menu-item v-else class="disabled" :key="navItem_c.id" :index="navItem_c.name" v-on:click="showDisabled">
                <img :src="iconmetroStationD" alt="" />
                <span slot="title" style="font-size:14px;">{{navItem_c.name}}</span>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
    import iconhzMetro from '../assets/icon-hz-metro.png';
    import iconnbMetro from '../assets/icon-nb-metro.png';
    import iconmetroStation from '../assets/icon-metroStation.png';
    import iconmetroStationD from '../assets/icon-metroStation-disabled.png';
    export default {
        props:["metroList","areaCode"],
        data:function(){
            return {
                iconhzMetro:iconhzMetro,
                iconnbMetro:iconnbMetro,
                iconmetroStation:iconmetroStation,
                iconmetroStationD:iconmetroStationD
            }
        },
        methods:{
            triggerMap:function(id,name,areaCode){
                this.$root.triggerMapPoint(id,name,areaCode);
            },
            showDisabled:function(){
                window.alert("暂无该站点数据");
            }
        },
        mounted:function(){

        }
    }
</script>
