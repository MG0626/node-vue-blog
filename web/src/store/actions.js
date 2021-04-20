import {
  LABEL_COUNT,
  ARTICLE_COUNT,
  CATEGORY_COUNT
} from './mutations_types';

export default {

  addLabelCount({commit}, products){
    commit(LABEL_COUNT, products);
  },

  addArticleCount({commit}, products){
    commit(ARTICLE_COUNT, products);
  },

  addCategoryCount({commit}, products){
    commit(CATEGORY_COUNT, products);
  }
}