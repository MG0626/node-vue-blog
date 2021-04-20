<template>
  <v-card flat id="a" width="100%" tile color="rgba(0,0,0,0)" class="py-6">
    <v-card
      width="90%"
      flat
      class="mx-auto overflow-y-auto"
      color="rgba(0,0,0,0)"
    >
      <v-sheet
        height="100"
        dark
        color="rgba(0,0,0,0)"
        class="d-flex align-center justify-center"
      >
        <v-chip color="rgba(0,0,0,0)" class="text-h5">
          <v-icon class="mr-2"> mdi-thumb-up </v-icon>
          文章列表
        </v-chip>
      </v-sheet>

      <v-responsive>
        <v-row class="my-4">
          <v-col
            v-for="(slide, i) in data"
            :key="i"
            cols="12"
            lg="4"
            md="4"
            sm="6"
          >
            <v-hover v-slot:default="{ hover }">
              <v-lazy
                :options="{
                  threshold: 1,
                }"
                transition="scroll-y-reverse-transition"
              >
                <v-card
                  width="100%"
                  height="250"
                  :color="colors[index(i)]"
                  class="rounded-xl"
                  hover
                  :elevation="hover ? 24 : 4"
                  :to="`/articles/${slide.id}/detail`"
                >
                  <v-sheet
                    height="60%"
                    width="100%"
                    dark
                    color="rgba(0,0,0,0)"
                    class="d-flex overflow-hidden"
                  >
                    <v-img
                      width="100%"
                      :options="{
                        threshold: 0.3,
                      }"
                      :src="`https://picsum.photos/500?random=${slide.id}`"
                      class="d-flex align-end"
                      gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.5)"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                      <div class="pl-2 text-truncate text-h6">
                        {{ slide.title }}
                      </div>
                    </v-img>
                  </v-sheet>
                  <v-sheet height="40%" class="pa-1">
                    <v-card
                      height="70%"
                      width="100%"
                      class="text-justify pa-1 text-caption font-weight-medium block-with-text"
                      flat
                    >
                      {{ slide.art_desc }}
                    </v-card>
                    <v-card
                      height="30%"
                      flat
                      class="pa-1 d-flex align-center justify-space-between rounded-xl"
                    >
                      <v-sheet flat color="rgba(0,0,0,0)" class="text-caption">
                        <v-icon small class="pr-1">
                          mdi-clock-time-five-outline
                        </v-icon>
                        {{ slide.updateTime | time }}
                      </v-sheet>
                      <v-sheet flat color="rgba(0,0,0,0)">
                        <v-chip
                          v-for="i in slide.labels"
                          :key="i.id"
                          small
                          class="blue lighten-1 ml-1"
                          dark
                        >
                          {{ i.name }}
                        </v-chip>
                      </v-sheet>
                    </v-card>
                  </v-sheet>
                </v-card>
              </v-lazy>
            </v-hover>
          </v-col>
        </v-row>
      </v-responsive>
    </v-card>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-1',
      ],
    };
  },
  props: {
    data: {
      type: Array,
    },
  },
  methods: {
    index(i) {
      i = i + 1;
      return this.colors.length - i > 0
        ? this.colors.length - i
        : i - this.colors.length;
    },
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
  },
};
</script>

<style lang="scss" scoped>
.block-with-text {
  overflow: hidden;
  position: relative;
  word-break: break-all;
}
.hover{
  transform:scale(2);
}
</style>
