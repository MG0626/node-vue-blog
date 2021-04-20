<template>
  <el-table :data="tableData" border style="width: 500px">
    <el-table-column label="id" align="center" width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="name" align="center" width="200">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
          <el-tag size="medium">{{ scope.row.name }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="updateCategory(scope.row.id, scope.row.name)"
          >修改</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="deleteCategory(scope.row.id, scope.row.name)"
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
    async getCategoryList() {
      const result = await this.$http.get("/category/list");
      this.tableData = result.data;
    },
    async updateCategory(id, name) {
      this.$prompt(`请输入标签"${name}"的新名称`, '修改标签名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '名称不能为空或存在空格'
        }).then(async ({value}) => {
          const name = value;
          await this.$http.patch(`/category/${id}/update`, {name});
          this.getCategoryList();
          this.$message({
            type: 'success',
            message: "修改成功~"
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改~'
          });       
        });
    },

    async deleteCategory(id, name) {
      this.$confirm(`此操作将永久删除标签 "${name}", 是否继续?`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.delete(`/category/${id}/delete`);
          this.getCategoryList();
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
  },
  created() {
    this.getCategoryList();
  },
};
</script>

<style lang="scss" scoped>
</style>