<template>
  <div class="page-content">
    <div class="welcome-block" v-if="this.$store.state.isWelcome">
      <h4 class="font-weight-bold">
        Hello! {{ saleInfo.EmpCName }} {{ saleInfo.EmpID }}
      </h4>
      <span>{{ saleInfo.Sales_Zone }} {{ saleInfo.DeptCode }}</span>
    </div>
    <div class="order-head" v-if="this.$store.state.isGoBack">
      <button class="btn btn_primary" @click="goBack">
        <i class="fas fa-long-arrow-alt-left"></i>返回店家列表
      </button>
      <div class="order-info">
        <h3>
          <p class="m-0" v-if="customer.isHeadquarters">
            {{ customer.CustomerFullName }}
          </p>
          <p class="m-0" v-else>
            {{ customer.CustomerShtName }}
          </p>

          <span style="font-size: 0.8em">
            <span v-if="isVIP">(VIP) &amp; </span>
            {{ customer.sliceUTypeName }}</span
          >
        </h3>
        <span>{{ customer.CustomerID }}</span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import illustration from "@/assets/Images/illustration.png";
import { mapGetters, mapState } from "vuex";

export default {
  name: "NavBar",
  data() {
    return {
      illustration,
      isVIP: false,
      customer: {}, // 客戶資料
    };
  },
  methods: {
    goBack() {
      this.$store.commit("SUREPRODUCT", null);
      this.$router.back();
    },
  },
  watch: {
    stateCustomer(n) {
      const vm = this;
      // 選擇其他客戶的話就會替換客戶
      if (Object.prototype.hasOwnProperty.call(n, "CustomerID")) {
        vm.customer = n;
      }
    },
    customer(n) {
      if (n?.FAX_NO) {
        if (n.FAX_NO.slice(0, 3) === "VIP") {
          this.isVIP = true;
        } else {
          this.isVIP = false;
        }
      }
    },
  },
  computed: {
    saleInfo() {
      const vm = this;
      if (vm.$store.state.saleInfo === {}) {
        return vm.$store.state.saleInfo;
      } else {
        return JSON.parse(localStorage.getItem("saleInfo"));
      }
    },

    ...mapGetters({
      getterCustomer: "customerData",
    }),
    ...mapState({
      stateCustomer: "customerData",
    }),
  },
  mounted() {
    const vm = this;
    // 第一次進來該系統或是重新整理會取得 localStorage 的客戶資料
    vm.customer = vm.getterCustomer || vm.stateCustomer;
  },
};
</script>
