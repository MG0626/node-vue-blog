<template>
  <v-card height="100%" flat>
    <v-img
      style="position: fixed;top: 0"
      height="100vh"
      src="https://picsum.photos/1920/1080"
    ></v-img>
    <!-- style="margin: 56px 0;" -->
    <v-card flat color="rgba(0, 0, 0, 0.5)" width="100%" class="d-flex  flex-column align-center justify-center" style="padding: 15% 0;" height="100%">
      <v-stepper
        dark
        v-model="e6"
        vertical
        class="mx-auto stepper rounded-xl "
        style="background-color: rgba(0, 0, 0, .5);"
      >
        <v-card
          flat
          color="rgba(0, 0, 0, 0)"
          class="text-center white--text text-h6 py-5"
        >
          <v-icon large color="white" class="mr-1">mdi-archive</v-icon>
          <span class="ml-2">文章发布时间线</span>
        </v-card>
        <v-stepper-items>
          <template v-for="(n, i) in releaseData">
            <v-stepper-step :key="i" :step="releaseData.length - i" editable>
              <span class="blue--text">{{ n.createTime }}</span>
            </v-stepper-step>

            <v-stepper-content :step="releaseData.length - i" :key="`${i}-content`">
              <v-responsive>
                <v-row class="my-4">
                  <v-col
                    v-for="(slide, i) in n.articleList"
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
                              :src="
                                `https://picsum.photos/500?random=${slide.id}`
                              "
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
                              {{ slide.desc }}
                            </v-card>
                            <v-card
                              height="30%"
                              flat
                              class="pa-1 d-flex align-center justify-space-between rounded-xl"
                            >
                              <v-sheet
                                flat
                                color="rgba(0,0,0,0)"
                                class="text-caption"
                              >
                                <v-icon small class="pr-1">
                                  mdi-clock-time-five-outline
                                </v-icon>
                                {{ n.createTime }}
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
            </v-stepper-content>
          </template>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: 'Archive',
  data() {
    return {
      e6: 0,
      releaseData: []
    };
  },
  methods: {
    async getReleaseData() {
      const result = await this.$http.get('/articles/archive');
      this.releaseData = result.data;
      console.log(this.releaseData);
    }
  },
  created() {
    this.getReleaseData();
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
.stepper {
  width: 90%;
}
.block-with-text {
  overflow: hidden;
  position: relative;
  word-break: break-all;
}
</style>
