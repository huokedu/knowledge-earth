export default {
    getQueryValue(key){
        let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
        let r = window.location.search.substr(1).match(reg);
        if (r != null) {
           return decodeURIComponent(r[2]);
        }
        return null;
    }
}