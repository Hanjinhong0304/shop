<template>
    <div class="right">
        <div class="banner-header">
            <div class="header-top">
                <p>首页/运营管理/banner/</p>
            </div>
            <div class="header-bottom">
                <div class="header-left">首页banner</div>
                <div class="header-right">
                    <button class="addBanner" @click="openFn">
                        <span>+</span>添加banner
                    </button>
                    <el-dialog title="添加banner" :visible.sync="dialogFormVisible">
                        <el-form :model="form" ref="form">
                            <el-form-item prop="imageUrl" >
                                <el-upload
                                    class="avatar-uploader"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload"
                                >
                                    <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item prop="banner_title" class="add-list">
                                <span class="add-left">活动标题</span>
                                <el-input placeholder="请输入活动标题" class="add-right" v-model="form.banner_title"></el-input>
                            </el-form-item>
                            <el-form-item prop="banner_timer"  class="add-list"  >
                                <div class=" add-timer">
                                    <span class="add-left">活动时间</span>
                                    <el-date-picker
                                        class="add-right"
                                        v-model="form.banner_timer"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                    ></el-date-picker>
                                </div>
                                
                            </el-form-item>
                            <el-form-item prop="banner_url"  class="add-list">
                                <span class="add-left">活动链接</span>
                                <el-input placeholder="请输入活动链接" class="add-right"  v-model="form.banner_url"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="submitFn('form')">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </div>
        </div>
        <div class="banner-main" >
            <template v-if="homeShopBanner_GETTERS">
              <banner-list  v-for="(item,index) in homeShopBanner_GETTERS" :key="index" :item="item"></banner-list>
            </template>
            <template v-else>没有商品</template>
        </div>
        <div class="banner-page">
            <el-pagination layout="prev, pager, next" :prev-click="sizeChange" :total="50"></el-pagination>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import bannerList from "@/components/bannerList/index.vue";
import { namespace } from "vuex-class"
const someModule = namespace("home");

@Component({
  components: {
    bannerList
  }
})
class Banner extends Vue {
  // 进入首页渲染
  created(){
    this.homeShopBanner_ACTIONS();
  }
   // 获取banner最初数据
  @someModule.Action('homeShopBanner_ACTIONS') homeShopBanner_ACTIONS!:any;
  @someModule.Getter('homeShopBanner_GETTERS') homeShopBanner_GETTERS!:any;

  // banner 集成
  form = {
    // banner title
    banner_title:"",
    // banner 开始时间-截至时间
    banner_timer:"",
    // banner 链接地址
    banner_url:"",
    // banner 图片url
    imageUrl : "",
  };
  // 控制弹框的显示隐藏
  dialogFormVisible = false;
  // 点击添加banner控制弹框显示
  openFn() {
    this.dialogFormVisible = true;
  }
  // 点击分页
  sizeChange() {
    console.log("你点击了分页");
  }
  // 上传图片成功
  handleAvatarSuccess(res, file) {
    this.imageUrl = URL.createObjectURL(file.raw);
  }
  // 上传图片的文件
  beforeAvatarUpload(file) {
    const isJPG = file.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      this.$message.error("上传头像图片只能是 JPG 格式!");
    }
    if (!isLt2M) {
      this.$message.error("上传头像图片大小不能超过 2MB!");
    }
    return isJPG && isLt2M;
  }
  // 点击添加banner后获取所有的value
  submitFn(formName:any){
    this.dialogFormVisible = false;
    this.$refs[formName].validate((valid:any) => {
        console.log(valid,'------valid');
        console.log(this.form,'----form')
    });
  }
}
export default Banner;
</script>
<style lang="scss" >
.el-dialog__body {
  width: 500px;
  margin: 0 auto;
  .el-form {
    width: 100%;
    .add-list>.el-form-item__content {
      width: 100%;
      height: 50px;
        // margin-left:0px;
      display: flex;
      > .add-left {
        width: 100px;
        height: 100%;
      }
      > .add-right {
        flex: 1;
        input{
         width: 300px;
        }
      }
    }
  }
}
.el-dialog__footer {
 margin:0 auto;
}
.avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
     width: 300px;
      height: 200px;
      vertical-align: middle;
      text-align: center;
    }
    .avatar {
      width: 300px;
      height: 200px;
      display: block;
    }
.wrap {
  background: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .banner-header {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #dcdcdc;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 5px 10px red insert;
    .header-top {
      width: 100%;
      height: 30%;
      color: #999;
      font-size: 12px;
    }
    .header-bottom {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header-right {
        .addBanner {
          width: 120px;
          height: 40px;
          background: #1890ff;
          color: #fff;
          border: 0;
          border-radius: 5px;
        }
      }
    }
  }
  .banner-main {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    .banner-list {
      width: 250px;
      height: 290px;
      border: 1px solid #ccc;
      margin-left: 33px;
      margin-top: 31px;
      display: flex;
      flex-direction: column;
      > .list-top {
        width: 100%;
        height: 160px;
        > img {
          width: 100%;
          height: 100%;
        }
      }
      > .list-center {
        width: 100%;
        height: 90px;
        display: flex;
        flex-direction: column;
        text-indent: 20px;
        > h4 {
          width: 100%;
          height: 50%;
          font-weight: 500;
        }
        > p {
          width: 100%;
          height: 50%;
          font-size: 12px;
        }
      }
      > .list-bottom {
        flex: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        > span:hover {
          color: #1890ff;
        }
      }
    }
  }
  .banner-page {
    width: 100%;
    height: 150px;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
