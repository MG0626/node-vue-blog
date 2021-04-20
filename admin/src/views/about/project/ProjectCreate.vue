<template>
  <el-form
    :model="project"
    status-icon
    ref="project"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="名称">
      <el-input
        v-model="project.name"
        size="mini"
        placeholder="请输入项目名称"
      ></el-input>
    </el-form-item>

     <el-form-item label="描述">
      <el-input
        v-model="project.desc"
        type="textarea"
        autosize
        size="mini"
        placeholder="请输入项目描述"
        style="width: 300px"
      ></el-input>
    </el-form-item>
     <el-form-item label="图标名称">
      <el-input
        v-model="project.icon"
        size="mini"
        placeholder="请输入图标名称"
      ></el-input>
    </el-form-item>
    <el-form-item label="项目地址">
      <el-input
        v-model="project.address"
        size="mini"
        type="textarea"
        autosize
        placeholder="请输入项目地址"
        style="width: 300px"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="create"
        >提交</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      project : {
        name: '',
        desc: '',
        icon: '',
        address: ''
      }
    };
  },
  methods: {
    async create() {
      const result = await this.$http.post('/about', this.project);
      this.$router.push('/about/project/list');
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 200px;
}
</style>