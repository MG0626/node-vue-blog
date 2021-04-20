<template>
  <v-card flat>
    <v-img
      style="position: fixed"
      height="100vh"
      color="rgba(0,0,0,.5)"
      src="https://picsum.photos/1920/1080"
    ></v-img>
    <v-card
      flat
      color="rgba(0,0,0,0.5)"
      class="d-flex flex-column justify-center pb-8"
    >
      <v-card
        flat
        height="30vh"
        dark
        class="d-flex align-center justify-center text-h5"
        color="rgba(0,0,0,0)"
      >
        {{ detail.title }}
      </v-card>
      <v-card flat :width="width" class="mx-auto rounded-lg">
        <v-card class="mt-n8  px-4 px-md-8">
          <v-sheet class="d-flex align-center justify-space-between">
            <v-card flat height="70" class="d-flex align-center">
              <v-chip
                class="blue lighten-1 ml-1"
                dark
                v-for="n in detail.labels"
                :key="n.id"
              >
                {{ n.name }}
              </v-chip>
            </v-card>
            <v-card flat>
              <v-btn label class="ma-2 rounded-lg">
                <v-icon dense> mdi-rocket-launch </v-icon>
                <span v-text="category.name"></span>
              </v-btn>
            </v-card>
          </v-sheet>
          <v-row
            class="text-caption font-weight-medium py-1 grey--text text--darken-3"
          >
            <v-col cols="12" lg="3" md="4">
              <v-icon small class="pr-1">
                mdi-calendar-clock
              </v-icon>
              <span>发布的日期: {{ detail.createTime }}</span>
            </v-col>
            <v-col cols="12" lg="3" md="4">
              <v-icon small class="pr-1">
                mdi-clock-time-three-outline
              </v-icon>
              <span>最后一次修改在<b class="blue--text">{{ detail.updateTime | updateTime}}</b>前</span>
            </v-col>
          </v-row>
        </v-card>
        <v-card width="90%" class="mx-auto mt-4" flat>
          <v-card-text v-html="detail.content" class="content"></v-card-text>
        </v-card>
      </v-card>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      detail: {},
      category: {},
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
          return '90%';
        case 'sm':
          return '90%';
        case 'md':
          return '80%';
        default:
          return '65%';
      }
    },
  },
  methods: {
    async getDetail() {
      const result = await this.$http.get(
        `/articles/${this.$route.params.id}/detail`,
      );
      this.detail = result.data[0];
      this.category = this.detail.category;
    },
  },

  created() {
    this.getDetail();
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
      return `${y}-${m}-${d}`;
    },

    updateTime(value){
      const time = new Date(value).getTime();
      // 现在的时间戳
      const newTime = Date.now();
      // 时间差(秒),1秒等于1000毫秒
      const difference = (newTime - time) / 1000;
      
      // 大于60秒，小于或等于60分钟
      if (difference > 60 && difference <= 3600) {
        return Number(difference/60).toFixed() + '分钟';
      }else if (difference > 3600 && difference <= 86400) {
        // 大于60分钟，小于或等于24小时
        return Number(difference/60/60).toFixed() + '小时';
      } else if (difference > 86400) {
        // 大于1天
        return Number(difference/60/60/24).toFixed() + '天';
      }else {
        // 小于或等于60秒
        return difference + '秒';
      }
      
    }
  }
};
</script>

<style lang="scss">
.content {
  /* table 样式 */
  table {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
  table td,
  table th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
  }
  table th {
    border-bottom: 2px solid #ccc;
    text-align: center;
  }

  /* blockquote 样式 */
  blockquote {
    display: block;
    border-left: 8px solid #d0e5f2 !important;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4em;
    font-size: 100%;
    background-color: #f1f1f1;
  }
  blockquote > p{
    margin: 0;
  }

  /* code 样式 */
  code {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    background-color: #f1f1f1;
    border-radius: 3px;
    padding: 3px 5px;
    margin: 0 3px;
  }
  pre code {
    display: block;
  }

  /* ul ol 样式 */
  ul,
  ol {
    margin: 10px 0 10px 20px;
  }

  h1,h2,h3,h5,h6{
    margin: 20px 0;
  }

  a {
    text-decoration: none;
  }
}
</style>
