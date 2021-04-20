<template>
  <div id="login">
    <div class="wrapper">
      <div class="title">LOGIN</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input
            placeholder="请输入用户名"
            v-model="ruleForm.name"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            placeholder="请输入密码"
            show-password
            v-model="ruleForm.password"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="0" style="width: 100%">
          <el-button type="primary" round  plain @click="login"
            >登录</el-button
          >
          <el-button type="primary" icon="el-icon-refresh-right" plain round @click="resetForm('ruleForm')"></el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate( async valida => {
        if (valida) {
          const result = await this.$http.post('/login', this.ruleForm);
          if (result.status !== 400) {
            this.$message({
              type: 'success',
              message: '登录成功~'
            });
            window.localStorage.setItem("token", result.data.token);
            this.$router.push('/');
          } else {
            this.$message({
              type: 'warning',
              message: result.data
            });
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/wallpaper.jpg");
  background-size: 100% 100%;

  .wrapper{
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 30px;
    color: #000;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.3);
    text-align: center;
    padding: 1em 0 0;

    .title{
      padding: 0.5em;
    }
    
    .el-form-item{
      width: 360px;
    }
  }
}
</style>