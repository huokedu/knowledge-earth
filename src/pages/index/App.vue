<template>
  <div id="app">
    <Home v-show="active==0"></Home>
    <Category v-show="active==1"></Category>
    <Me v-show="active==2"></Me>
    <van-tabbar v-model="active" @change="onTabchange">
      <van-tabbar-item icon="point-gift">发现</van-tabbar-item>
      <van-tabbar-item icon="points-mall">分类</van-tabbar-item>
      <van-tabbar-item icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {Tabbar, TabbarItem } from "vant";
import Fog from "../../libs/fogc";
import Home from './Home.vue';
import Category from './Category.vue';
import Me from "./Me.vue";

export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    Home,Category,Me
  },
  data() {
    return {
      active: 0
    };
  },
  mounted(){
    Fog.fetchToken();
  },
  methods: {
    onTabchange(e) {
    }
  }
};
</script>

<style>
body {
  background-color: #f8f8f8;
}

.van-cell__title .van-icon {
  font-size: 18px;
}
.van-nav-bar__title{
  background-color:#4CAF50;
  color:#ffffff;
}
.van-nav-bar__text,.van-nav-bar .van-icon{
  color: #ffffff; 
}

.van-panel__status{
  color:#333
}
.van-card__thumb img{
    border-radius: 10px ; 
  }
</style>
