<template>
    <div class="wrap">
        <el-container>
            <my-head></my-head>
            <el-container class="conent">
                <my-left></my-left>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import MyLeft from "@/components/left/index.vue";
import MyHead from "@/components/head/index.vue";
@Component({
  components: {
    MyLeft,
    MyHead
  }
})
class Home extends Vue {
  data = {
    asideArr: [
      {
        title: "系统首页",
        children: [
          {
            path: "/banner",
            title: "系统首页"
          }
        ]
      },
      {
        title: "商品管理",
        children: [
          {
            path: "/commodity",
            title: "商品列表"
          }
        ]
      }
    ]
  };
}
export default Home;
</script>
<style scoped lang="scss">
.wrap {
  display: block;
  flex-direction: column;
  .conent {
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    .el-main {
      flex: 1;
      overflow: hidden;
      .right {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>