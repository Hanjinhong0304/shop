<template>
  <div class="right">
    <div class="foodlist">
      <h2>商品列表</h2>
      <div class="primary">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" :rules="searchRule">
          <el-form-item label="商品名称" prop="content">
            <el-input v-model="formInline.content" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="optionsValue" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <el-button class="addBanner" @click="openFn">
            <span>+</span>添加banner
          </el-button>
        </el-form>
      </div>
      <div>
        <el-table
          ref="multipleTable"
          :data="allShop_GETTERS.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="name" label="商品信息"></el-table-column>
          <el-table-column prop="price" label="价格"></el-table-column>
          <el-table-column prop="volume" label="销量"></el-table-column>
          <el-table-column prop="stock" label="库存"></el-table-column>
          <!-- <el-table-column prop="floor" label="楼层" ></el-table-column>
          <el-table-column prop="area" label="区域" width="120"></el-table-column>-->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 20px;">
          <el-pagination
            background
            layout="prev, pager, next, jumper, ->, total"
            :total="allShop_GETTERS.length"
            @current-change="current_change"
          ></el-pagination>
        </div>
      </div>
      <div class="dialog" v-show="flag">
        <div class="mask">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="商品名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动时间">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.date1"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker
                  type="fixed-time"
                  placeholder="选择时间"
                  v-model="form.date2"
                  style="width: 100%;"
                ></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="即时配送">
              <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源">
              <el-radio-group v-model="form.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button @click="closefn">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Action, namespace, Getter } from "vuex-class";
import api from "@/api/";
const someModule = namespace("home");
@Component
class Commodity extends Vue {
  formInline = {
    content: "",
    region: ""
  };
  total = 0; //默认页数
  pagesize = 7; //条数
  currentPage = 1; //页数
  optionsValue = "";
  options = [
    {
      value: "选项1",
      label: "黄金糕"
    },
    {
      value: "选项2",
      label: "双皮奶"
    },
    {
      value: "选项3",
      label: "蚵仔煎"
    },
    {
      value: "选项4",
      label: "龙须面"
    },
    {
      value: "选项5",
      label: "北京烤鸭"
    }
  ];
  //监听搜索内容为不为空，为空再次发起请求 下面的就是监听的函数你需要监听多少个参数，就需要@watch多少下
  @Watch("formInline.content")
  watchCount(newVal: any) {
    if (newVal.trim() === "") {
      this.allShop_ACTIONS();
    }
  }
  //搜索内容的判断
  searchContent = (rule: any, value: any, callback: any) => {
    let reg = /^[\u4e00-\u9fa5]+/;
    if (!value) {
      callback(new Error("请输入您要搜索的商品"));
      return;
    }
    if (!reg.test(value)) {
      callback(new Error("请输入正确格式:以汉字开头的内容"));
      return;
    }
  };
  searchRule = {
    content: {
      validator: this.searchContent,
      trigger: ["change", "blur"]
    }
  };
  @someModule.Action("allShop_ACTIONS")
  allShop_ACTIONS!: any;
  @someModule.Action("search_ACTION")
  search_ACTION!: any;
  @someModule.Getter("allShop_GETTERS")
  allShop_GETTERS!: any;
  data() {
    return {
      flag: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  }
  openFn() {
    this.flag = true;
  }
  closefn() {
    this.flag = false;
  }
  onSubmit() {
    this.flag = false;
  }
  //修改
  handleEdit() {}
  //删除
  handleDelete() {}
  //
  handleSelectionChange() {}
  current_change(currentPage: any) {
    this.currentPage = currentPage;
  }
  //点击搜索按钮
  search() {
    this.search_ACTION({ search_key: this.formInline.content });
  }
  created() {
    this.allShop_ACTIONS();
  }
}
export default Commodity;
</script>
<style lang="scss" scoped>
.foodlist {
  width: 100%;
  height: 100%;
  .type-header {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ededed;
    > div {
      font-weight: 900;
      font-size: 16px;
      float: left;
    }
    .el-button {
      float: right;
      margin-top: 10px;
      background: rgba(24, 144, 255, 1);
      color: #ffffff;
    }
  }
  .primary {
    width: 100%;
    line-height: 60px;
    height: 60px;
    border-bottom: 1px solid #ccc;
    font-size: 20px;
    font-weight: 500;
  }
  .primary {
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    margin: 10px 0;
    background: #ccc;
    display: flex;
    align-items: center;
    .el-form-item {
      margin-left: 38px;
      height: 30px;
    }
  }
}
.dialog {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999999;
  .mask {
    width: 50%;
    height: 80%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
  }
}
</style>
