<template>
  <el-container style="height: 100vh">
    <el-header height="80px">
      <div class="title">岑明光的博客后台</div>
      <div class="other">
        <el-dropdown @command="loginOut">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{ user.name }}</span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router unique-opened>
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-s-custom"></i>用户管理</template
            >
            <el-menu-item-group>
              <template slot="title">用户</template>
              <el-menu-item index="/users/list">用户列表</el-menu-item>
              <el-menu-item index="/users/create">创建用户</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-collection-tag"></i>标签管理</template
            >
            <el-menu-item-group>
              <template slot="title">标签</template>
              <el-menu-item index="/labels/list">标签列表</el-menu-item>
              <el-menu-item index="/labels/create">创建标签</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-collection-tag"></i>分类管理</template
            >
            <el-menu-item-group>
              <template slot="title">分类</template>
              <el-menu-item index="/category/list">分类列表</el-menu-item>
              <el-menu-item index="/category/create">创建分类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-document"></i>文章管理</template
            >
            <el-menu-item-group>
              <template slot="title">文章</template>
              <el-menu-item index="/articles/list">文章列表</el-menu-item>
              <el-menu-item index="/articles/create">创建文章</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title"
              ><i class="el-icon-document"></i>关于管理</template
            >
            <el-menu-item-group>
              <template slot="title">关于</template>
              <el-menu-item index="/about">详情</el-menu-item>
              <el-submenu index="5-1">
                <template slot="title">我的项目</template>
                <el-menu-item index="/about/project/list">项目列表</el-menu-item>
                <el-menu-item index="/about/project/create">添加项目</el-menu-item>
              </el-submenu>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<style>
.el-header {
  display: flex;
  align-items: center;
}
.el-header .title {
  width: 20%;
  font-size: 25px;
  padding-left: 1em;
}
.el-header .other {
  flex: 1;
  text-align: right;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
}

.el-aside {
  /* background-color: #d3dce6; */
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>

<script>
export default {
  data() {
    return {
      token: '',
      user: {},
    };
  },
  created() {
    this.token = window.localStorage.getItem('token');
    this.getUser();
  },
  methods: {
    async getUser() {
      const result = await this.$http.get('/users/active', {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          //把token放到请求头才能请求，这里的'Bearer '表示是后台希望更加的安全，依据后台给的信息看到底是加还是不加
          Authorization: 'Bearer ' + this.token,
        },
      });
      this.user = result.data;
    },
    loginOut() {
      window.localStorage.clear();
      this.$router.push('/login');
    },
  },
};
</script>
