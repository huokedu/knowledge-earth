<template>
  <div>
    <van-nav-bar fixed title="我的" />

    <van-cell-group class="user-group">
      <van-cell icon="like-o" title="我的收藏" is-link @click="onLinkClick"/>
      <van-cell icon="exchange" title="我的课程" is-link  @click="onLinkClick"/>
      <van-cell icon="logistics" title="我的嘀嗒" is-link  @click="onLinkClick"/>
    </van-cell-group>
  </div>
</template>

<script>
import {NavBar, Row, Col, Icon, Cell, CellGroup,Toast } from 'vant';

export default {
  components: {
    [NavBar.name]:NavBar,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data(){
    return {

    }
  },
  mounted(){
    
  },
  methods:{
    onLinkClick(){
      Toast("功能建设中");
    }
  }
};
</script>

<style scoped>
  .user-poster {
    width: 100%;
    height: 200px;
    display: block;
  }

  .user-group {
    margin-bottom: .3rem;
    margin-top:3rem;
  }

  .user-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    
  }
  .van-icon {
      display: block;
      font-size: 24px;
    }
</style>