<template>
  <v-card flat>
    <v-img
      style="position: fixed;top: 0"
      height="100vh"
      color="rgba(0,0,0,.5)"
      src="https://picsum.photos/1920/1080"
    ></v-img>
    <card-container :title="title" :data="category" @getRecommendData="getRecommendData"></card-container>
    <article-list v-if="$route.params.category" :data="recommendData"></article-list>
  </v-card>
</template>

<script>
import CardContainer from '../../components/cardcontainer/CardContainer';
import ArticleList from '../../components/articlelist/ArticleList';
export default {
  name: 'Category',
  data() {
    return {
      title: {
        text: '分类',
        icon: 'mdi-shape',
        name: 'category'
      },
      category: [],
      recommendData: [],
    };
  },
  components: {
    CardContainer,
    ArticleList,
  },
  methods: {
    async getCategoryList(){
      const result = await this.$http.get('/category/list');
      this.category = result.data;
      this.$store.dispatch('addCategoryCount', this.category.length);
      console.log(this.category); 
    },
    async getRecommendData(id) {
      const result = await this.$http.get(`/articles/recommend_category/${id}`);
      this.recommendData = result.data;
      console.log(this.recommendData);
    },
  },
  created() {
    this.getCategoryList();
    this.$route.params.category && this.getRecommendData(this.$route.params.category);
  },
};
</script>

<style lang="scss" scoped></style>
