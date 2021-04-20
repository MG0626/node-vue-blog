<template>
  <v-app-bar
    fixed
    flat
    dark
    height="56"
    color="rgba(0, 0, 0, 0.5)"
    fade-img-on-scroll
    scroll-threshold="500"
  >
    <v-sheet
      height="56"
      color="rgba(0, 0, 0, 0)"
      class="d-flex align-center justify-space-between mx-auto"
      width="90%"
    >
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-icon>mdi-vuetify</v-icon>
        Blog
      </v-toolbar-title>
      <v-list
        height="56"
        color="rgba(0, 0, 0, 0)"
        flat
        class="d-flex align-center"
      >
        <v-list-item-group
          mandatory
          v-model="selectedItem"
          class="d-md-flex align-center hidden-md-and-down"
        >
          <v-list-item
            color="black"
            v-for="(item, index) in items"
            :key="index"
            :to="item.to"
            class="blue--text"
          >
            <v-icon class="mr-1" >{{ item.icon }}</v-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

        <!-- <v-scale-transition v-if="hover">
          <v-text-field
            hide-details="auto"
            label="搜索"
            rounded
            dense
            solo-inverted
          ></v-text-field>
        </v-scale-transition> -->
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-list>

      <!-- 导航抽屉，移动端显示 -->
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        light
        height="100vh"
      >
        <v-list flat>
          <v-list-item-group mandatory v-model="selectedItem">
            <v-list-item
              color="blue"
              v-for="(item, index) in items"
              :key="index"
              :to="item.to"
            >
              <v-icon class="mr-1">{{ item.icon }}</v-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      hover: true,
      selectedItem: 0,
      drawer: false,
      items: [
        { text: '首页', icon: 'mdi-home', to: '/' },
        { text: '标签', icon: 'mdi-tag-multiple', to: '/label' },
        { text: '分类', icon: 'mdi-shape', to: '/category' },
        { text: '归档', icon: 'mdi-archive', to: '/archive' },
        { text: '关于', icon: 'mdi-collage', to: '/about' },
      ],
    };
  },
  updated() {
    console.log(this.selectedItem);
  },
};
</script>

<style lang="scss" scoped>
.v-card--position {
}
</style>
