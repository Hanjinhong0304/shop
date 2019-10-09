<template>
  <div class="wrap">
    <div class="type-header">
      <div class="type-header-title">分类管理</div>
      <el-button @click="add">+ 添加分类</el-button>
    </div>
    <div class="type-content">
      <el-table
        :data="GET_TYPE_GETTER.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
        tooltip-effect="dark"
      >
        <el-table-column prop="title" label="名称"></el-table-column>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addcategory(scope.row.id)">添加子类</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;margin-top: 30px;">
        <el-pagination
          :total="GET_TYPE_GETTER.length"
          :page-size="pagesize"
          :current-page="currentPage"
          @current-change="pageCurrentChange"
          layout="prev, pager, next, jumper, ->, total"
        ></el-pagination>
      </div>
      <el-dialog title="添加子类" :visible.sync="dialogFormVisible">
        <div class="type-dialog">
          <div class="type-dialog-show" v-if="categoryArr.length>0">
            <div>该商品子类有：</div>
            <div>
              <span v-for="item in categoryArr" :key="item.id" style="margin:0 6px">{{item.name}}</span>
            </div>
          </div>
          <div class="type-dialog-show" v-else>
            <div>暂无子分类，快去添加吧！！！</div>
          </div>
          <div class="type-dialog-add">
            <div>添加子分类</div>
            <el-input type="text" placeholder="添加子分类" v-model="categoryValue"></el-input>
          </div>
          <div class="type-dialog-btn">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addsure">确 定</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action, Getter, namespace, Mutation, State } from "vuex-class";
const someModule = namespace("type");
@Component
class Classified extends Vue {
  pagesize = 5;
  currentPage = 1;
  total = 0;
  dialogFormVisible = false; //添加子类的弹框开关
  categoryArr = []; //当前商品的子类
  categoryValue = ""; //添加子类的内容
  typeId = ""; //当前商品的id
  pageSizes = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  @someModule.Mutation("GET_TYPE_MUTATIONE") GET_TYPE_MUTATIONE!: any; //获取商品分类
  @someModule.Getter("GET_TYPE_GETTER") GET_TYPE_GETTER!: any; //获取商品分类
  @someModule.Action("GET_TYPE_ACTION") GET_TYPE_ACTION!: any; //获取商品分类
  @someModule.Action("ADD_TYPE_ACTION") ADD_TYPE_ACTION!: any; //添加商品分类
  @someModule.Action("GET_CATEGORY_ACTION") GET_CATEGORY_ACTION!: any; //获取商品子分类
  @someModule.Mutation("GET_CATEGORY_MUTATION") GET_CATEGORY_MUTATION!: any; //获取商品子分类
  @someModule.Getter("GET_CATEGORY_GETTER") GET_CATEGORY_GETTER!: any; //获取商品子分类
  @someModule.Action("ADD_CATEGORY_ACTION") ADD_CATEGORY_ACTION!: any; //添加商品子分类
  pageCurrentChange(currentPage: any) {
    //分页点击事件
    this.currentPage = currentPage;
  }
  add() {
    //添加商品分类
    this.$prompt("请输入类别", "添加分类", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      inputPattern: /^[\u4e00-\u9fa5]+/,
      inputErrorMessage: "不能为空且只能输入汉字"
    })
      .then(({ value }: any) => {
        this.ADD_TYPE_ACTION({ type_name: value }); //添加商品分类
        this.GET_TYPE_ACTION(); //获取商品分类
        this.$message({
          //成功提示
          type: "success",
          message: "添加成功"
        });
      })
      .catch(() => {
        this.$message({
          //取消提示
          type: "info",
          message: "取消添加"
        });
      });
  }
  addcategory(id: any) {
    //添加商品子分类 步骤1.出现弹框 筛选出当前商品的子类并显示
    let res = this.GET_CATEGORY_GETTER.filter(
      //筛选子类
      (item: any) => item.parent_id === id
    );
    this.dialogFormVisible = true; //弹框出现
    this.categoryArr = res; //子类赋值
    this.typeId = id; //记录当前商品id
  }
  addsure() {
    //添加商品子分类 步骤2. 确认添加
    if (
      //内容为空获取或者有字母时不执行
      this.categoryValue === "" ||
      !/^[\u4e00-\u9fa5]+/.test(this.categoryValue)
    ) {
      this.$message({
        type: "warning",
        message: "内容不能为空且内容只能为汉字"
      });
      this.categoryValue = "";
    } else {
      this.ADD_CATEGORY_ACTION({
        //添加商品子分类
        type_id: this.typeId,
        category_name: this.categoryValue
      });
      this.GET_CATEGORY_ACTION(); //获取商品子分类
      this.dialogFormVisible = false; //弹框消失
      this.categoryValue = ""; //添加子类的内容为空
    }
  }
  private created(GET_TYPE_ACTION: any): void {
    this.GET_TYPE_ACTION(); //获取商品分类
    this.GET_CATEGORY_ACTION(); //获取商品子分类
  }
}
export default Classified;
</script>
<style lang="scss">
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
.type-content {
  margin-top: 20px;
}
.type-dialog-show {
  font-size: 16px;
  div {
    height: 40px;
    line-height: 40px;
  }
}
.type-dialog-btn {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
.type-dialog-add {
  margin-top: 30px;
  > div {
    height: 40px;
    line-height: 40px;
  }
}
</style>
