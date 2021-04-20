<template>
  <v-carousel
    height="100vh"
    cycle
    interval="4000"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item v-for="(slide, i) in recommendData" :key="i">
      <v-sheet color="rgba(0,0,0,.5)" height="100%">
        <v-row no-gutters class="fill-height" align="center" justify="center">
          <v-card
            width="60%"
            flat
            class="mx-auto d-flex justify-center align-center flex-column"
            color="rgba(0, 0, 0, 0)"
          >
            <v-card-title primary-title class="text-md-h3 text-xs-body-1">
              {{ slide.title }} 
            </v-card-title>
            <v-card-text
              style="text-indent: 2em"
            >
              <div style="width: 100%" class="text-md-subtitle-1 text-xs-button text-center">{{slide.art_desc}}</div>
            </v-card-text>
            <v-hover v-slot="{ hover }">
              <v-btn
                rounded
                depressed
                plain
                outlined
                :class="{ 'red': hover}"
                :to="`/articles/${slide.id}/detail`"
              >
                <v-icon>mdi-eye</v-icon>
                <span class="ml-1">阅读更多</span>
              </v-btn>
            </v-hover>
          </v-card>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-1',
      ],
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
    };
  },
  props: {
    recommendData: {
      type: Array,
      default: []
    },
  },
};
</script>

<style lang="scss" scoped>
.active {
  background-color: red;
}
</style>
