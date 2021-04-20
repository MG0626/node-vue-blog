<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column label="id" align="center" width="50">
      <template slot-scope="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="标题" align="center" width="150">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top" :content="scope.row.art_desc" width="200">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.title }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="标签" align="center" width="200">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
          <el-tag
            size="medium"
            v-for="label in scope.row.labels"
            :key="label.id"
            style="margin-right: 10px"
            >{{ label.name ? label.name : "无" }}</el-tag
          >
        </div>
      </template>
    </el-table-column>

    <el-table-column label="分类" align="center" width="100">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
          <el-tag
            size="medium"
            style="margin-right: 10px"
            >{{ scope.row.category[0].name ? scope.row.category[0].name : "无" }}</el-tag>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="是否发布" align="center" width="100">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
          <el-tag
            size="medium"
            style="margin-right: 10px"
            >{{ scope.row.is_release == 0 ? "未发布" : "已发布" }}</el-tag
          >
        </div>
      </template>
    </el-table-column>

    <el-table-column label="是否推荐" align="center" width="100">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
          <el-tag
            size="medium"
            style="margin-right: 10px"
            >{{ scope.row.is_recommend == 0 ? "不推荐" : "已推荐" }}</el-tag
          >
        </div>
      </template>
    </el-table-column>

    <el-table-column label="创建时间" align="center" width="200">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.createTime | time }}</span>
      </template>
    </el-table-column>
    <el-table-column label="最后一次修改时间" align="center" width="200">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.updateTime | time }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="updateArticleOther('release', scope.row, scope.row.id)"
          >{{scope.row.is_release == 0 ? "发布" : "下架"}}</el-button
        >
        <el-button
          size="mini"
          type="primary"
          @click="updateArticleOther('recommend', scope.row, scope.row.id)"
          >{{scope.row.is_recommend == 0 ? "推荐" : "不推荐"}}</el-button
        >
        <el-button
          size="mini"
          type="primary"
          @click="updateArticle(scope.row.id)"
          >修改</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="deleteArticle(scope.row.id, scope.row.title)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    async getArticleList() {
      const result = await this.$http.get("articles/list");
      this.tableData = result.data;
      console.log(this.tableData);
    },
    async updateArticle(id) {
      this.$router.push({
        name: 'articles_create',
        params: {
          id
        }
      })
    },

    async deleteArticle(id, title) {
      this.$confirm(`此操作将永久删除标题为 "${title}"的文章, 是否继续?`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.delete(`articles/${id}/delete`);
          this.getArticleList();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    async updateArticleOther(key, row, id){
      row[`is_${key}`] = row[`is_${key}`] == 0 ? 1 : 0
      let other = {
        key,
        value: row[`is_${key}`]
      }
      await this.$http.patch(`/articles/${id}/other`, other)
    }
  },
  filters: {
    time: function(value) {
      const time = new Date(value);
      const y = time.getFullYear();
      const m = time.getMonth() + 1;
      const d = time.getDate();
      const hh = time.getHours();
      const mm = time.getMinutes();
      const ss = time.getSeconds();
      // ${hh}:${mm}:${ss.toString().length == 1 ? '0' + ss : ss}
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    }
  },
  created() {
    this.getArticleList();
  },
};
</script>

<style lang="scss" scoped>
</style>