<template>
  <div id="app">
     <van-nav-bar fixed :title="channelName"  />
     <van-list
        class="list"
        v-model="loading"
        :finished="finished">
        <div  v-for="(item,i) in list" :key="i" @click="onCardClick(item)">
          <van-card
            :title="item.title"
            :thumb="item.thumbs['small_thumb']">
            <div slot="desc">
              <div class="subtext">{{'播放: '+item.playcount}}</div>
              <div class="subtext">{{'更新: '+item.update_time.split(' ')[0]}}</div>
            </div>
          </van-card>
        </div>
      </van-list>
      <div class="more" @click="loadMore" v-show="list.length!=0">
        加载更多
      </div>
  </div>
</template>

<style scoped>
  .list{
    margin-top: 46px;
  }
  .subtext{
    color: #c1c0c0;
    font-size: 14px;
    margin-top: 4px;
  }
  .more{
    height: 40px;
    color:#FF5722;
    text-align: center;
  }
  
</style>
<style>
.van-card__thumb img{
    border-radius: 10px !important; 
  }
</style>
<script>
import { NavBar, Search, List,Card } from "vant";
import Fog from "../../libs/fogc";
import Utils from "../../libs/utils";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Search.name]: Search,
    [List.name]: List,
    [Card.name]: Card
  },
  data() {
    return {
      channelName: "",
      attrId: null,
      list: [],
      page: 1,
      pageSize: 30,
      loading: false,
      finished: false
    };
  },
  mounted() {
    this.attrId = Utils.getQueryValue("attrId");
    this.channelName = decodeURIComponent(Utils.getQueryValue("name"));
    this.fetchData();
  },
  methods: {
    fetchData() {
      Fog.getAttrChannel(this.page, this.pageSize, this.attrId).then(res => {
        for(let i in res.data){
          this.list.push(res.data[i]);
        }
        this.loading = false;
        this.finished = true;
      });
    },
    onClickLeft() {
      history.back();
    },
    loadMore(){
       ++this.page;
       this.fetchData();
    },
    onCardClick(item){
      let url =`program.html?channelId=${item.id}&openId=${Utils.getQueryValue("openId")}`;
       window.location.href =url;
    }
  }
};
</script>

