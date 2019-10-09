<template>
  <div class="wrap">
    <el-form :model="userInfo" ref="userInfo" label-width="70px" class="demo-dynamic">
      <el-form-item
        label="用户名"
        prop="username"
        :rules="[
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ]"
      >
        <el-input type="text" v-model="userInfo.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        :rules="[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]"
      >
        <el-input type="password" v-model="userInfo.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('userInfo')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action, Getter, namespace, Mutation, State } from "vuex-class";
const someModule = namespace("login");
@Component
class Login extends Vue {
  userInfo = {
    username: "",
    password: ""
  };

  @someModule.Mutation("LOGIN_INFO") LOGIN_INFO!: any;
  @someModule.Action("LOGIN_INFO_ACTIONS") LOGIN_INFO_ACTIONS!: any;
  @someModule.Action("GETUSERINFO_ACTIONS") GETUSERINFO_ACTIONS!: any;
  login(formName: any) {
    this.$refs[formName].validate((valid: any) => {
      if (valid) {
        this.LOGIN_INFO_ACTIONS({
          username: this.userInfo.username,
          password: this.userInfo.password
        });
        this.GETUSERINFO_ACTIONS();
        this.$router.push("/home");
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
  created() {}
}
export default Login;
</script>
<style lang="scss" scoped>
.el-form {
  width: 300px;
  padding: 10px;
  margin: 20px auto;
  border-radius: 10px;
  border: 1px solid #ccc;
  .el-form-item {
    margin: 20px 0;
  }
  .el-button {
    margin-left: 20%;
    width: 100px;
  }
}
</style>