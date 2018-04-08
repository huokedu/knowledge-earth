<template>
  <div id="app">
    <Home></Home>
  </div>
</template>

<script>

import Home from "./Home.vue";
export default {
  components: {
    Home
  },
  data() {
    return {
      showProgram:false
    };
  },
  mounted(){

  },
  methods: {

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
