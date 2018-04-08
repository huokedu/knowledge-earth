<template>
    <div>
        <van-nav-bar title="知识分类" />
        <van-panel title="精品推荐">
          <van-row>
            <van-col span="6" class="category" v-for="(c,i) in getValues('推荐')"  :key="i">
              <div class="category-div" @click="gotoChannelList(c)">{{c.name}}</div>
            </van-col>
          </van-row>
        </van-panel>
        <van-panel title="内容分类">
          <van-row>
            <van-col span="6" class="category" v-for="(c,i) in getValues('分类')"  :key="i">
              <div class="category-div"  @click="gotoChannelList(c)">{{c.name}}</div>
            </van-col>
          </van-row>
        </van-panel>
        <van-panel title="人群">
         <van-row>
            <van-col span="6" class="category" v-for="(c,i) in getValues('人群')"  :key="i">
              <div class="category-div"  @click="gotoChannelList(c)">{{c.name}}</div>
            </van-col>
          </van-row>
        </van-panel>
        <br><br><br><br>
    </div>
</template>

<style scoped>
.category{
  padding: 10px;
  text-align: center;
}
.category div{
  border: 1px solid #ddd;
  height: 30px;
  border-radius: 6px;
  margin: 0 auto;
  line-height: 30px;
  font-size: 13px;
}
.category-div:active{
  border: 1px solid #ff9800;
}
</style>
<script>
import { NavBar, Search, Panel,Row, Col } from "vant";
import Category from "../../data/category.json";
import Fog from "../../libs/fogc";
import Utils from "../../libs/utils";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Search.name]: Search,
    [Panel.name]: Panel,
    [Row.name]:Row,
    [Col.name]:Col
  },
  data() {
    return {
       categoryList:Category
    };
  },
  methods:{
    getValues(type){
      let objs = Category.filter((obj)=>{
        return obj.name==type;
      });
      if(objs.length>0){
        let values=objs[0].values;
        return values;
      }
      return [];
    },
    gotoChannelList(c){
      let openId = Utils.getQueryValue("openId");
      let url = `channel.html?openId=${openId}&attrId=${c.id}&name=${encodeURIComponent(c.name)}`;
      window.location.href=url;
    }
  },
  mounted(){

  }
};
</script>