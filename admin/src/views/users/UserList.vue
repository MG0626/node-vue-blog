<template>
  <el-table :data="tableData" border style="width: 100%">
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
          @click="updateUser(scope.row.id, scope.row.name)"
          >修改</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="deleteUser(scope.row.id, scope.row.name)"
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
    async getUserList() {
      const result = await this.$http.get("users/list");
      this.tableData = result.data;
      console.log(this.tableData);
    },
    async updateUser(id, name) {
      this.$prompt(`请输入${name}的新密码`, '修改密码', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '密码不能为空或存在空格'
        }).then(async ({value}) => {
          const password = value;
          await this.$http.patch(`/users/${id}/update`, {password});
          this.getUserList();
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

    async deleteUser(id, name) {
      this.$confirm(`此操作将永久删除 "${name}", 是否继续?`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.delete(`users/${id}/delete`);
          this.getUserList();
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
  filters: {
    time: function (date) {
      return date.replace("T", " ").replace(".000Z", "");
    },
  },
  created() {
    this.getUserList();
  },
};
</script>

<style lang="scss" scoped>
</style>