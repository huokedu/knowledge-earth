<template>
  <div>
        <van-panel :title="channelName"  status="查看全部 >">
          <div @click="godoChannel(item)"  v-for="(item,i) in list" :key="i">
            <van-card
                :title="item.title"
                @click="onCardClick(item)"
                :thumb="item.thumbs['small_thumb']">
                <div slot="desc">
                    <div class="subtext">{{'播放: '+item.playcount}}</div>
                    <div class="subtext">{{'更新: '+item.update_time.split(' ')[0]}}</div>
                </div>
            </van-card>
          </div>
        </van-panel>
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
import { Panel,Card } from "vant";
import Fog from "../../libs/fogc";
import Utils from "../../libs/utils";

export default {
  components: {
      [Panel.name]:Panel,
      [Card.name]:Card
  },
  props:{
      attrId:{
          type:Number,
          default:3360
      },
      channelName:{
          type:String,
          default:"最热门"
      }
  },
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 10
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      Fog.getAttrChannel(this.page, this.pageSize, this.attrId).then(res => {
        for(let i in res.data){
          this.list.push(res.data[i]);
        }
      });
    },
    godoChannel(c){
      let openId = Utils.getQueryValue("openId");
       let url = `program.html?channelId=${c.id}&openId=${openId}`;
       window.location.href=url;
    }
  }
};
</script>