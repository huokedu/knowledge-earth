<template>
  <div id="app">
     <van-nav-bar fixed title="电台节目"  />
     <van-card
          class="info"
          :title="channel.title"
          :thumb="channel.thumbs['small_thumb']">
          <div slot="desc">
            <div class="subtext">{{'播放: '+channel.detail.playcount}}</div>
            <div class="subtext">{{'更新: '+channel.update_time.split(' ')[0]}}</div>
          </div>
          <div slot="footer">
             <van-icon name="like" style="font-size:32px;color:#ff5722" />
          </div>
     </van-card>
     <van-cell title="节目清单" icon="wap-nav" />
     <van-list
        class="list"
        v-model="loading"
        :finished="finished">
        <van-cell-group>
         <van-cell v-for="(item,i) in list" :key="i" :title="item.title + ''" :label="caculateTime(item.duration)" >
            <van-icon @click="selectProgram(item)" slot="right-icon" name="play" class="van-cell__right-icon" />
         </van-cell>
         </van-cell-group>
      </van-list>
      <div class="more" @click="loadMore" v-show="list.length!=0">加载更多</div>
      <van-actionsheet v-model="showAction" :actions="actions" />
  </div>
</template>

<style scoped>
.info {
  margin-top: 46px;
}
.subtext {
  color: #c1c0c0;
  font-size: 14px;
  margin-top: 4px;
}
.more {
  height: 40px;
  color: #ff5722;
  text-align: center;
  line-height: 40px;
}
</style>
<style>
.van-cell__right-icon {
  font-size: 20px;
}
</style>
<script>
import {
  NavBar,
  Search,
  List,
  Card,
  Icon,
  Cell,
  CellGroup,
  Actionsheet
} from "vant";
import Fog from "../../libs/fogc";
import Utils from "../../libs/utils";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Search.name]: Search,
    [List.name]: List,
    [Card.name]: Card,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Actionsheet.name]: Actionsheet
  },
  data() {
    return {
      channelId: "",
      channel: {
        title: "",
        thumbs: {},
        playcount: 0,
        update_time: "",
        detail: {}
      },
      list: [],
      page: 1,
      pageSize: 20,
      loading: false,
      finished: false,
      program: {},
      showAction: false,
      actions: [
        {
          name: "网页播放",
          callback: this.onWebPlay
        },
        {
          name: "推送嘀嗒播放",
          callback: this.onDidaPlay
        }
      ]
    };
  },
  mounted() {
    this.channelId = Utils.getQueryValue("channelId");
    this.fetchChannelInfo();
    this.fetchProgram();
  },
  methods: {
    fetchChannelInfo() {
      Fog.getChannelondemandInfo(this.channelId).then(res => {
        this.channel = res.data;
      });
    },
    fetchProgram() {
      Fog.getChannelondemandProgramList(
        this.channelId,
        this.page,
        this.pageSize
      ).then(res => {
        console.log(res);
        for (let i in res.data) {
          this.list.push(res.data[i]);
        }
        this.loading = false;
        this.finished = true;
      });
    },
    onClickLeft() {
      history.back();
    },
    loadMore() {
      ++this.page;
      this.fetchProgram();
    },
    caculateTime(s) {
      return `时长: ${Math.floor(s / 60)}分${s % 60}秒`;
    },
    selectProgram(item) {
      this.program = item;
      this.showAction = true;
    },
    onWebPlay() {
      this.showAction = false;
      let url = this.program.weburl;
      window.location.href = url;
    },
    onDidaPlay() {
      this.showAction = false;
      Fog.getProgramAttr(this.channelId, this.program.id).then(res => {
        console.log(res);
        let openId = Utils.getQueryValue("openId"); //"o0_Od08zsmX-Jx-5LBk0mu4GD-vU";
        let resUrl = res.data.editions[0].url[0];
        //生成短网址
        Fog.long2short(resUrl).then(res => {
          console.log(res);
          let shortUrl = res["short_url"];
          let message = {
            raw: {
              type: "remote|lesson",
              command: `0000|${shortUrl}|0`
            }
          };
          console.log(openId);
          console.log(JSON.stringify(message));
          Fog.sendVideoToDevice(openId, JSON.stringify(message));
        });
        return;
        let message = {
          raw: {
            type: "remote|lesson",
            command: `0000|http://www.qkidsplay.com/didawechat/course_mp3/liqingzhao-lesson.mp3|0`
          }
        };
        console.log(openId);
        console.log(JSON.stringify(message));
        Fog.sendVideoToDevice(openId, JSON.stringify(message));
      });
    }
  }
};
</script>

