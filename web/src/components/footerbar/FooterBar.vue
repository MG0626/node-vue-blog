<template>
  <v-footer padless>
      <v-card flat tile width="100%"  class=" indigo lighten-1 white--text text-center">
        <v-card class=" indigo lighten-1 py-2">
          <v-sheet class="indigo lighten-1 white--text pt-1">
            {{ new Date().getFullYear() }} —  岑明光
          </v-sheet>
          <v-btn depressed small v-for="i in footer" :key="i.icon" class="mx-2" icon link :href="i.link">
            <v-icon size="24px">
              {{ i.icon }}
            </v-icon>
          </v-btn>
        </v-card>
      </v-card>
    </v-footer>
</template>

<script>
export default {
  data: () => ({
    footer: [
      {
        icon: 'mdi-github',
        link: 'https://github.com/MG0626'
      },
      {
        icon: 'mdi-email',
        link: '#'
      },
      {
        icon: 'mdi-wechat',
        link: '#'
      },
      {
        icon: 'mdi-qqchat',
        link: 'http://wpa.qq.com/msgrd?v=3&uin=1370636565&site=qq&menu=yes'
      }
    ],
  }),
};
</script>

<style lang="scss" scoped></style>
