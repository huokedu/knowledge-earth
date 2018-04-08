const fogPath = "https://api.fogcloud.io/v3";
import axios from "axios";
let fog = {};
fog.fogPost = function (url, data, type) {
    let token = localStorage.getItem("token");
    if (token) {
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;;
    }
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    let config = {
        "transformRequest" : [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }]
    }
    return axios.post(url, data, config).then((res) => {
        return Promise.resolve(res.data);
    });
}

fog.fogGet = function (url, data) {
    let token = localStorage.getItem("token");
    if (token) {
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;;
    }
    return axios.get(url, data).then((res) => {
        return Promise.resolve(res.data);
    });
}

//获取token并持久化
fog.fetchToken = function () {
    let url = fogPath + "/open_api/token/";
    let data = {
        "grant_type": "client_credentials",
        "client_id": "7MFq7ZUgoqOhWft7zfUgSaSdgIz09oxRCTMx0SoV",
        "client_secret": "lRq8eWtBrk9MZ0zm687PsPZUPsVy0MBXknvIFMQ6lcYt4lOINeRC94pIXuOZm0ONi4uviIoeQMXwWZ0pnDuns896sDuKkoVypLpdk2OFZYCflO4UNmvMuGiMojdqcu5s"
    };
    this.fogPost(url, data, "json").then((res) => {
        localStorage.setItem("token", res.data["access_token"]);
    }).catch((error) => {
        console.log(error);
    })
}

//获取儿童分类的属性，category_id=1599
//包含分类、人群、精品、推荐
fog.getCategoryAttr = function () {
    let url = fogPath + "/story_qt/categoryattr/";
    let data = {
        "category_id": 1599
    }
    return this.fogPost(url, data);
}

//获取指定分类下的频道
fog.getAttrChannel = function (curpage, pagesize, attrId) {
    let url = fogPath + "/story_qt/attrchannel/";
    let data = {
        "category_id": 1599,
        "curpage": curpage,
        "pagesize": pagesize,
        "attrs": attrId
    }
    return this.fogPost(url, data);
}

//获取频道信息
fog.getChannelondemandInfo = function (channelId) {
    let url = fogPath + "/story_qt/channelondemand/";
    let data = {
        "channel_id": channelId
    }
    return this.fogPost(url, data);
}

//获取频道下面的节目清单
fog.getChannelondemandProgramList = function (channelId, curpage, pagesize) {
    let url = fogPath + "/story_qt/channelondemandprogramlist/";
    let data = {
        "channel_id": channelId,
        "curpage": curpage,
        "pagesize": pagesize
    }
    return this.fogPost(url, data);
}

//获取节目播放地址
fog.getProgramAttr = function (channelId, programId) {
    let url = fogPath + "/story_qt/channelondemandprogramaddr/";
    let data = {
        "channel_id": channelId,
        "program_id": programId
    }
    return this.fogPost(url, data);
}

//获取节目信息
fog.getProgramInfo = function (programId) {
    let url = fogPath + "/story_qt/program/";
    let data = {
        "program_id": programId
    }
    return this.fogPost(url, data);
}

//发送请求给设备
fog.sendVideoToDevice = function (openId,message){
    let url =`http://www.qkidsplay.com/didawechat/MessageHandler.ashx?`;
    url+=`action=SendMessageToDevice&openId=${openId}&message=${message}`;
    delete axios.defaults.headers.common['Authorization'];
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data);
    });
}

//长地址转短地址
fog.long2short = function (longurl) {
    let url =`http://www.qkidsplay.com/didawechat/DidaHandler.ashx?action=Long2Short&longurl=${longurl}`;
    delete axios.defaults.headers.common['Authorization'];
    return axios.get(url).then((res) => {
        let data = res.data;
        if(typeof data == "string"){
            data = JSON.parse(data);
        }
        return Promise.resolve(data);
    });
}

export default fog;