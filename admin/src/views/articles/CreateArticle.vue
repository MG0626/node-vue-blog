<template>
  <div class="home">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-page-header @back="goBack" :content="headerTitle"> </el-page-header>
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-tag
          :key="label.id"
          v-for="label in selectLabels"
          closable
          :disable-transitions="false"
          @close="handleClose(label)"
        >
          {{ label.name }}
        </el-tag>
        <el-select
          v-model="label"
          placeholder="请选择"
          size="mini"
          @change="selectChange()"
          v-if="selectVisible"
          ref="select"
        >
          <el-option
            v-for="(label, index) in labels"
            :key="label.id"
            :label="label.name"
            :value="index"
          >
          </el-option>
        </el-select>
        <el-button v-else class="button-new-tag" size="small" @click="showInput"
          >+ New Tag</el-button
        >
      </el-form-item>

      <el-form-item label="分类">
        <el-select
          v-model="category"
          placeholder="请选择"
          size="mini"
          ref="select"
        >
          <el-option
            v-for="(item) in categorys"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="文章内容">
        <div id="demo1"></div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="createArticle">{{
          $route.params.id ? "立即修改" : "立即创建"
        }}</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入 wangEditor
import wangEditor from "wangeditor";
import * as qiniu from "qiniu-js";
/// 富文本编辑代码高亮
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

export default {
  data() {
    return {
      editor: null,
      editorData: "",
      imageUrl: "", //传给后台的src
      ruleForm: {
        title: "",
        content: "",
        desc: ""
      },
      rules: {
        title: [
          { required: false, message: "请输入文章标题", trigger: "blur" },
          {
            min: 3,
            max: 30,
            message: "长度在 3 到 30 个字符",
            trigger: "blur",
          },
        ],
      },
      label: "",
      labels: [],
      selectLabels: [],
      selectVisible: false,
      category: "",
      categorys: []
    };
  },
  computed: {
    headerTitle() {
      return this.$route.params.id ? "修改" : "创建";
    },
  },
  mounted() {
    const editor = new wangEditor(`#demo1`);
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.editorData = newHtml;
    };

    

    editor.config.height = 500;
    let _this = this;
    editor.config.customUploadImg = async function (resultFiles, insertImgFn) {
      // resultFiles 是 input 中选中的文件列表
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法

      // 上传的文件重新命名
      const key = `${(Math.random() * 1000000)
        .toString()
        .slice(0, 5)}${new Date().getTime().toString().slice(-5)}_${
        resultFiles[0].name
      }`;

      let formData = new FormData();
      formData.append('file', resultFiles[0], key);
      const imageUrl =  await _this.$http.put("/token", formData);
      // 上传图片，返回结果，将图片插入到编辑器中
      insertImgFn('http://' + imageUrl.data);
    };
    // 挂载highlight插件
    editor.highlight = hljs;
    // 创建编辑器
    editor.create();
    this.editor = editor;
  },
  created() {
    this.getData();
    this.$route.params.id && this.modify(this.$route.params.id);
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.editor.txt.clear();
    },


    async getData() {
      const result1 = await this.$http.get("labels/list");
      const result2 = await this.$http.get("/category/list");
      this.labels = result1.data;
      this.categorys = result2.data;
    },
    handleClose(label) {
      this.selectLabels.splice(this.selectLabels.indexOf(label), 1);
    },
    // select选择器选择时方法
    selectChange() {
      if (this.selectLabels.indexOf(this.labels[this.label]) == -1) {
        this.selectLabels.push(this.labels[this.label]);
      } else {
        this.$message({
          type: "warning",
          message: "已经存在该标签~",
        });
      }
      this.selectVisible = !this.selectVisible;
    },
    showInput() {
      this.selectVisible = !this.selectVisible;
      this.$nextTick(() => {
        this.$refs.select.$refs.reference.$refs.input.focus();
      });
    },
    // 给后台传数据
    async createArticle() {
      let category;
      this.categorys.forEach(i => {
            if (i.id == this.category) {
              category = i;
            };
          })
      this.ruleForm.content = this.editor.txt.html();
      const id = this.$route.params.id;
      if (id) {
        let updateData = {
          title: this.ruleForm.title,
          content: this.ruleForm.content,
          desc: this.ruleForm.desc,
          labels: this.selectLabels,
          category: category
        };
        await this.$http.patch(`/articles/${id}/update`, updateData);
      } else {
        const result = await this.$http.post("/articles/create", this.ruleForm);
        if (result.data.insertId) {
          let associated = {
            id: result.data.insertId,
            labels: this.selectLabels,
            category: category
          };
          await this.$http.post("/articles/associated", associated);
        }
      }
      this.$router.push("/articles/list");
    },
    // 修改文章时获取数据
    async modify(id) {
      const result = await this.$http.get(`/articles/${id}/modify`);
      this.ruleForm.title = result.data[0].title;
      this.ruleForm.desc = result.data[0].art_desc;
      this.category = result.data[0].category[0].id;
      // console.log(result.data[0].category[0]);
      if (result.data[0].labels[0].id)
        this.selectLabels = result.data[0].labels;
      this.editor.txt.html(result.data[0].content);
    },

    goBack() {
      this.$router.go(-1);
    },
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  },
};
</script>

<style lang="scss">
.home {
  padding-top: 1em;
  width: 100%;
  padding-right: 1em;
  box-sizing: border-box;
  position: relative;
  #demo1 {
    position: relative;
    z-index: 1;
  }
  .el-select {
    margin-right: 10px;
    vertical-align: bottom;
  }
  .el-tag {
    margin-right: 10px;
  }
  .button-new-tag {
    margin-right: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .el-page-header {
    margin-bottom: 20px;
    font-weight: bold;
  }
}
</style>