<template>
  <el-table :data="tableData" border>
    <el-table-column label="id" align="center" width="50">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="名称" align="center" width="150">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
          <el-tag size="medium">{{ scope.row.name }}</el-tag>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="描述" align="center" width="300">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
          <el-tag size="medium">{{ scope.row.desc }}</el-tag>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="图标" align="center" width="100">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
          <el-tag size="medium">{{ scope.row.icon }}</el-tag>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="地址" align="center" width="200">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
          <el-tag size="medium">{{ scope.row.address }}</el-tag>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="是否展示" align="center" width="100">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
          <el-tag size="medium">{{ scope.row.is_show == 0 ? '未展示' : '展示中'}}</el-tag>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="操作" align="center" >
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="isShow(scope.row.id, scope.row.is_show)"
          >{{scope.row.is_show == 0 ? '展示' : '不展示'}}</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="deleteProject(scope.row.id, scope.row.name)"
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
    async list() {
      const result = await this.$http.get("/about/project/list");
      this.tableData = result.data;
      console.log(result);
    },
    
    async isShow(id, is_show){
      let data = is_show == 0 ? 1 : 0;
      await this.$http.patch(`/about/project/${id}`, {'data' : data});
      this.list();
    },

    async deleteProject(id, name) {
      this.$confirm(`此操作将永久删除项目 "${name}", 是否继续?`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.delete(`/about/project/${id}`);
          this.list();
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
    this.list();
  },
};
</script>

<style lang="scss" scoped>
</style>