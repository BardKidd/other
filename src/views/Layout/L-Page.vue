<template>
  <div class="main-content">
    <!-- SideBar 開關 -->
    <input id="menu-btn" type="checkbox" value="" />
    <label class="toggle-btn" for="menu-btn">
      <span></span>
      <span></span>
      <span></span>
    </label>
    <SideBar></SideBar>
    <Header></Header>
  </div>
</template>

<script>
import SideBar from "./L-SideBar.vue";
import Header from "./L-Header.vue";
export default {
  name: "LayoutPage",

  components: {
    SideBar,
    Header,
  },
};
</script>


