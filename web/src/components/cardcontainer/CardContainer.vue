<template>
  <v-card
    flat
    width="90%"
    class="card rounded-xl mx-auto"
    color="rgba(0,0,0,0)"
  >
    <v-card-text class="d-flex align-center justify-center white--text text-h5">
      <v-icon large color="white" class="mr-1">{{ title.icon }}</v-icon>
      <span>文章{{ title.text }}</span>
    </v-card-text>
    <v-sheet
      width="80%"
      class="mx-auto d-flex flex-wrap justify-center"
      color="rgba(0,0,0,0)"
    >
      <v-hover v-for="i in data" :key="i.id">
        <v-btn
          label
          :color="colors[color(i)]"
          class="ma-2 rounded-lg"
          active-class="red white--text"
          :to="`/${title.name}/${toName(i)}`"
          @click="getData(toName(i))"
        >
          {{ i.name }} <span class="ml-1">{{ i.count }}</span>
        </v-btn>
      </v-hover>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        'indigo',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-1',
        'indigo',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-1',
      ],
    };
  },
  methods: {
    color(i) {
      const length = this.colors.length;
      return length - i > 0 ? i : i - length;
    },
    getData(name) {
      this.$emit('getRecommendData', name);
    },
    toName(i){
      return this.title.name == 'label' ? i.name : i.id;
    }
  },
  props: {
    title: {
      type: Object,
      default: {},
    },
    data: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin-top: 56px;
  margin-bottom: 2em;
  padding-top: 1em;
  padding-bottom: 2em;
}
.v-btn:hover {
  background-color: red !important;
  color: #fff;
}
</style>
