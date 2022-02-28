<template>
  <div id="app">
    <loading :active.sync="isLoading" :width="100" :height="300" loader="dots">
      <template slot="after">
        <p
          style="
            display: block;
            font-weight: bold;
            font-size: 1.2rem;
            position: absolute;
            top: 60%;
            left: 25%;
          "
        >
          處理中
        </p>
      </template>
    </loading>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
  computed: {
    ...mapGetters(["isLoading"]),
  },
};
</script>

<style lang="scss">
@import "@/assets/Scss/BackEndLayout/BackEndLayout";
</style>