<template>
  <div class="finish-page">
    <img src="@/assets/Images/finish.png" />
    <div class="finish-title">{{ text }}已送審</div>
    <div class="finish-desc">
      <span class="note">!</span>
      如需申請退貨，請於退換貨管理選取退貨項目。
    </div>
    <div class="finish-desc">
      <!-- 導去訂單查詢，帶入簽核中 -->
      <router-link
        :to="{ name: routerName, params: { OrderSearchParams: 'Signin' } }"
        class="btn btn_primary"
      >
        查看訂單
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderFinish",
  data() {
    return {
      text: "",
      routerName: "",
    };
  },
  watch: {
    text(n) {
      const vm = this;
      switch (n) {
        case "退貨單":
          vm.routerName = "SearchReturnOrder";
          break;
        case "訂單":
          vm.routerName = "OrderSearch";
          break;
        case "換貨單":
          vm.routerName = "SearchReturnOrder";
          break;
        case "寄倉取貨單":
          vm.routerName = "SearchWareHouse";
      }
    },
  },
  mounted() {
    const vm = this;
    vm.$store.commit("HEADER", "訂單完成");
    vm.$store.commit("ISWELCOME", false);
    vm.$store.commit("ISGOBACK", false);
    vm.$store.commit("CLOSEALLORDERDATA");
    vm.$store.commit("ISLOADING", false);

    vm.text = vm.$route.params.text;
  },
};
</script>