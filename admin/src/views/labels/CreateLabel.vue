<template>
  <el-form
    :model="labels"
    status-icon
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="标签名">
      <el-input
        v-model="labels.name"
        size="mini"
        placeholder="请输入标签名"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="createLabel"
        >提交</el-button
      >
      <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      labels : {
        name: ''
      }
    };
  },
  methods: {
    async createLabel() {
      const result = await this.$http.post('labels/create', this.labels);
      console.log(result);
      if (result.data == '标签已存在!') {
        this.$message.error('标签已存在!');
      }else{
        this.$message({
          type: 'success',
          message: '标签添加成功~'
        });
        this.$router.push('/labels/list');
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