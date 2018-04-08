<template>
    <div>
       <van-nav-bar class="title-bar" fixed title="知识星球" />
       
       <van-row class="header">
          <van-col span="6" class="category" :key="i" v-for="(c,i) in categoryList">
            <div  :class="['category-circle',c.color]" @click="gotoChannelList(c)">
              <span>{{c.name}}</span>
            </div>
          </van-col>
       </van-row>
       <van-search v-model="keyword" placeholder="你想听什么?" @search="onSearch">
       </van-search>
       <HotChannel class="hotchannel"></HotChannel>
    </div>
</template>

<style scoped>
.header{
  margin-top:46px;
}
.category{
  padding: 10px;
  text-align: center;
}
.category div{
  border: 1px solid rgb(253, 253, 253);
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin: 0 auto;
}
.category span{
  color: #ffffff;
  font-size: 13px;
  line-height: 50px;
}
.c1{
  background-color: #00a5e2;
}
.c2{
  background-color: #f57070;
}
.c3{
  background-color: #ffb33e;
}
.c4{
  background-color: #6cc96c;
}
.hotchannel{
  margin-bottom: 50px;
}

</style>

<script>
import { NavBar, Search, Panel,Row, Col } from "vant";
import HotChannel from "./HotChannel.vue";
import Utils from "../../libs/utils";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Search.name]: Search,
    [Panel.name]: Panel,
    [Row.name]:Row,
    [Col.name]:Col,
    HotChannel
  },
  data() {
    return {
      keyword: "",
      categoryList:[
        {name:"儿歌",id:1365,color:"c1"},
        {name:"童话",id:1366,color:"c2"},
        {name:"绘本",id:1367,color:"c3"},
        {name:"卡通",id:1369,color:"c4"},
        {name:"国学",id:1373,color:"c4"},
        {name:"教育",id:1370,color:"c3"},
        {name:"英语",id:3350,color:"c4"},
        {name:"更多",id:null,color:"c1"},
      ]
    };
  },
  methods: {
    onSearch(e) {
      console.log(e);
    },
    gotoChannelList(c){
      if(c.id==null){
        this.$router.push("category");
        return
      }
      let openId = Utils.getQueryValue("openId");
      let url = `channel.html?openId=${openId}&attrId=${c.id}&name=${encodeURIComponent(c.name)}`;
      window.location.href=url;
    }
  }
};
</script>