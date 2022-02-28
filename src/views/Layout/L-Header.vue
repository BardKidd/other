<template>
  <div class="center-content BG" :style="`backgroundImage: url(${BG})`">
    <div class="page-name">
      <span>
        <i class="fas fa-map-marker-alt"></i>
        {{ this.$store.state.headerTitle }}
      </span>
    </div>
    <NavBar></NavBar>
  </div>
</template>

<script>
import NavBar from "./L-NavBar.vue";
import BG from "@/assets/Images/bg.png";

export default {
  name: "Header",
  data() {
    return {
      BG,
    };
  },
  components: {
    NavBar,
  },
};
</script>

<style lang="scss" scoped>
.BG {
  background-position: bottom right;
  background-size: 600px;
  background-repeat: no-repeat;
}
</style>
