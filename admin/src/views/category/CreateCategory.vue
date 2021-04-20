<template>
  <el-form
    :model="category"
    status-icon
    ref="category"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="分类名称">
      <el-input
        v-model="category.name"
        size="mini"
        placeholder="请输入分类名称"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="createLabel"
        >提交</el-button
      >
      <el-button size="mini" @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      category : {
        name: ''
      }
    };
  },
  methods: {
    async createLabel() {
      const result = await this.$http.post('category/create', this.category);
      console.log(result);
      if (result.data == '分类已存在!') {
        this.$message.error('分类已存在!');
      }else{
        this.$message({
          type: 'success',
          message: '分类添加成功~'
        });
        this.$router.push('/category/list');
      }
    },
    resetForm() {
      this.category.name = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 200px;
}
</style>