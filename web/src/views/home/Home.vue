<template>
  <div>
    <v-img
      style="position: fixed;"
      height="100vh"
      overflow-y-auto
      src="https://picsum.photos/1920/1080"
    ></v-img>
    <carousel :recommendData="recommendData"></carousel>
    <v-card color="rgba(0,0,0,.5)">
      <article-list ref="article_list" :data="releaseData"></article-list>
    </v-card>
  </div>
</template>

<script>
import Carousel from '../../components/carousel/Carousel';
import ArticleList from '../../components/articlelist/ArticleList';
export default {
  name: 'Home',
  data() {
    return {
      recommendData: [],
      releaseData: [],
    };
  },
  components: {
    Carousel,
    ArticleList,
  },
  methods: {
    async getRecommendData() {
      const result = await this.$http.get('/articles/recommend');
      this.recommendData = result.data;
    },
    async getReleaseData() {
      const result = await this.$http.get('/articles/release');
      this.releaseData = result.data;
      console.log(result);
    },
  },
  watch: {
    // isActive(newValue, oldValue) {
    //   setTimeout(() => {
    //     this.isActive = oldValue;
    //   }, 2000)
    // }
  },
  created() {
    this.getRecommendData();
    this.getReleaseData();
  },
  // mounted () {
  //   console.log(this.$refs.article_list.$el.offsetTop);
  // },
};
</script>

<style lang="scss" scoped></style>
