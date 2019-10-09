<template>
    <div class="banner-list">
        <div class="list-top">
            <img :src="item.image"/>
        </div>
        <div class="list-center">
            <h4>{{item.active_name}}</h4>
            <p>11</p>
        </div>
        <div class="list-bottom">
            <span class="iconfont icon-xiazai"></span>
            <span class="iconfont icon-bianji1"></span>
            <span class="iconfont icon-fenxiang11"></span>
            <span class="iconfont icon-share"></span>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator';
@Component({
    props:{
        item:{
            type:Object,
            default:""
        }
    }
})
class BannerList extends Vue {
    
}
export default BannerList;
</script>
<style lang="scss">
.banner-list{
    width: 21%;
    height: 290px;
    border:1px solid #ccc;
    margin-left:33px;
    margin-top:31px;
    display: flex;
    flex-direction: column;
    >.list-top{
        width: 100%;
        height: 160px;
        >img{
            width: 100%;
            height: 100%;
        }
    }
    >.list-center{
        width: 100%;
        height:90px;
        display: flex;
        flex-direction: column;
        text-indent:20px;
        >h4{
            width: 100%;
            height: 50%;
            font-weight: 500;
        }
        >p{
            width: 100%;
            height: 50%;
            font-size:12px;
        }
    }
    >.list-bottom{
        flex:1;
        display:flex;
        justify-content: space-around;
        align-items: center;
    }
}
</style>

