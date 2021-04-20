<template>
  <div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
      <el-form-item label="头像" prop="title">
        <el-upload
          ref="upload"
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/token'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="img" :src="img" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="姓名">
        <el-input type="text" v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="岗位">
        <el-input type="text" v-model="ruleForm.jobs"></el-input>
      </el-form-item>

      <el-form-item label="描述" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" autosize></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: '',
      imgData: '',
      value: '0',
      ruleForm: {
        name: '',
        jobs: '',
        desc: '',
        imgUrl: '',
      },
      projects: [],
      checkList: [],
    };
  },
  methods: {
    async fetch() {
      const result = await this.$http.get('/about');
      this.ruleForm = result.data[0];
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imgData = file.raw;
      console.log(this.imgData);
    },

    async save() {
      if (this.imgData) {
        let formData = new FormData();
        formData.append('file', this.imgData, this.imgData.name);
        const result = await this.$http.put('/token', formData);
        this.ruleForm.imgUrl = 'http://' + result.data;
      }
      await this.$http.post('/about/create', this.ruleForm);
    },
  },
  computed: {
    img() {
      return this.imgData ? this.imageUrl : this.ruleForm.imgUrl;
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader {
  width: 200px;
  border: 1px dashed #000;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader,
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
