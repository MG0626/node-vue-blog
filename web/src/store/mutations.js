import {
  LABEL_COUNT,
  ARTICLE_COUNT,
  CATEGORY_COUNT
} from './mutations_types';

export default {

  [LABEL_COUNT](state, payload){
    state.labelCount = payload;
  },

  [ARTICLE_COUNT](state, payload){
    state.articleCount = payload;
  },

  [CATEGORY_COUNT](state, payload){
    state.categoryCount = payload;
  }

};