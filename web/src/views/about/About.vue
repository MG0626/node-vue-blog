<template>
  <v-card>
    <v-img
      style="position: fixed"
      height="100vh"
      color="rgba(0,0,0,.5)"
      src="https://picsum.photos/1920/1080"
    ></v-img>
    <v-card
      color="rgba(0,0,0,0.5)"
      class="d-flex justify-center"
      style="padding: 12em 0 2em 0"
    >
      <v-card width="80%" style="position: relative;">
        <v-img
          class="avatar rounded-circle"
          width="150px"
          height="150px"
          color="rgba(0,0,0,.5)"
          :src="detail.imgUrl"
        ></v-img>
        <v-card
          flat
          color="rgba(0,0,0,0)"
          class="py-4 d-flex flex-column flex-md-row align-center justify-end pt-sm-5 justify-md-space-around"
          :height="height"
        >
          <v-list
            class="d-flex  align-center justify-space-around"
            color="rgba(0,0,0,0)"
            :width="width"
            height="50"
          >
            <div class="d-flex flex-column align-center">
              <a
                @click="$router.push('/')"
                class="text-subtitle-1"
                style="text-decoration: underline"
                >{{ counts.articleCount }}</a
              >
              <span class="text-subtitle-2">文章</span>
            </div>
            <div class="d-flex flex-column align-center">
              <a
                @click="$router.push('/label')"
                class="text-subtitle-1"
                style="text-decoration: underline"
                >{{ counts.labelCount }}</a
              >
              <span class="text-subtitle-2">标签</span>
            </div>
            <div class="d-flex flex-column align-center">
              <a
                @click="$router.push('/category')"
                class="text-subtitle-1"
                style="text-decoration: underline"
                >{{ counts.categoryCount }}</a
              >
              <span class="text-subtitle-2">分类</span>
            </div>
          </v-list>
          <v-list class="align-self-md-end text-center" height="50">
            <div class="text-h6">{{detail.name}}</div>
            <div class="text-subtitle-2">{{detail.jobs}}</div>
          </v-list>
          <v-list
            class="d-flex align-center justify-space-around mt-2"
            color="rgba(0,0,0,0)"
            :width="width"
            height="50"
          >
            <v-btn
              depressed
              small
              v-for="i in items"
              :key="i.icon"
              class="mx-2"
              icon
              link
              :href="i.link"
            >
              <v-icon>
                {{ i.icon }}
              </v-icon>
            </v-btn>
          </v-list>
        </v-card>
        <v-card flat>
          <div class="text-center text-subtitle-2 pa-3">
            {{detail.desc}}
          </div>
        </v-card>
        <v-card flat>
          <v-sheet
            height="100"
            color="rgba(0,0,0,0)"
            class="d-flex align-center justify-center"
          >
            <v-chip color="rgba(0,0,0,0)" class="text-h5">
              <v-icon class="mr-2" size="34px"> mdi-projector </v-icon>
              我的项目
            </v-chip>
          </v-sheet>

          <v-container>
            <v-row class="my-4">
              <v-col cols="12" lg="4" md="4" sm="6" v-for="n in detail.projects" :key="n.id">
                <v-card class="text-center pa-2" flat link :href="n.address">
                  <v-btn class="mx-2" fab dark depressed large color="cyan">
                    <v-icon dark>
                      {{n.icon}}
                    </v-icon>
                  </v-btn>
                  <div class="text-h6 py-2">{{n.name}}</div>
                  <div
                    class="text-caption font-weight-bold text-center"
                    style="color: #999;"
                  >
                    {{n.desc}}
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-card>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      items: [
        {
          icon: 'mdi-github',
          link: 'https://github.com/MG0626',
        },
        {
          icon: 'mdi-email',
          link: 'mailto:1370636565@qq.com',
        },
        {
          icon: 'mdi-wechat',
          link: '#',
        },
        {
          icon: 'mdi-qqchat',
          link: 'http://wpa.qq.com/msgrd?v=3&uin=1370636565&site=qq&menu=yes',
        },
      ],
      counts: {},
      detail: {}
    };
  },
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 250;
        case 'sm':
          return 250;
        default:
          return 150;
      }
    },
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 150;
        case 'sm':
          return 150;
        default:
          return '15%';
      }
    },
  },
  methods: {
    async getCount() {
      const result = await this.$http.get('/about/count');
      this.counts = result.data[0];
    },

    async fetch(){
      const result = await this.$http.get('/about');
      this.detail = result.data;
    }
  },

  created(){
    this.getCount();
    this.fetch();
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  position: absolute;
  top: -75px;
  left: calc(50% - 75px);
  z-index: 1;
}
</style>
