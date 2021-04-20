<template>
  <v-card flat>
    <v-img
      style="position: fixed;top: 0"
      height="100vh"
      color="rgba(0,0,0,.5)"
      src="https://picsum.photos/1920/1080"
    ></v-img>
    <card-container :title="title" :data="labels" @getRecommendData="getRecommendData"></card-container>
    <article-list v-if="$route.params.label" :data="recommendData"></article-list>
  </v-card>
</template>

<script>
import CardContainer from '../../components/cardcontainer/CardContainer';
import ArticleList from '../../components/articlelist/ArticleList';
export default {
  name: 'Label',
  data() {
    return {
      title: {
        text: '标签',
        icon: 'mdi-tag-multiple',
        name: 'label'
      },
      labels: [],
      recommendData: [],
    };
  },
  components: {
    CardContainer,
    ArticleList,
  },
  methods: {
    async getLabelList(){
      const result = await this.$http.get('/labels/list');
      this.labels = result.data;
      console.log(this.labels); 
    },
    async getRecommendData(name) {
      const result = await this.$http.get(`/articles/recommend/${name}`);
      this.recommendData = result.data;
      console.log(this.recommendData);
    },
  },
  created() {
    this.getLabelList();
    this.$route.params.label && this.getRecommendData(this.$route.params.label);
  },
};
</script>

<style lang="scss" scoped></style>
