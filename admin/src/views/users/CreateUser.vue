<template>
  <el-form
    :model="user"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="name">
      <el-input
        v-model.number="user.name"
        size="mini"
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="user.password"
        autocomplete="off"
        size="mini"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input
        type="password"
        v-model="user.checkPass"
        autocomplete="off"
        size="mini"
        placeholder="请再次输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="createUser"
        >提交</el-button
      >
      <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.user.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.user.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      user: {
        password: "",
        checkPass: "",
        name: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }],
      },
    };
  },
  methods: {
    async createUser() {
      const result = await this.$http.post('users', this.user);
      if (result.data == '用户名已存在!') {
        this.$message.error('用户名已存在!');
      }else{
        this.$message({
          type: 'success',
          message: '用户添加成功~'
        });
        this.$router.push('/users/list');
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 200px;
}
</style>