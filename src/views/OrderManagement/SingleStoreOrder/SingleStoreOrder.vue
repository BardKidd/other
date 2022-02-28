<template>
  <article>
    <CitySearch @searchCustomer="searchCustomer"></CitySearch>

    <el-table
      :data="rows.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="width: 100%"
    >
      <el-table-column
        :sortable="true"
        align="center"
        prop="CustomerID"
        label="客戶代碼"
      >
      </el-table-column>
      <el-table-column
        :sortable="true"
        align="center"
        prop="CustomerShtName"
        label="客戶名稱"
      >
      </el-table-column>
      <el-table-column
        :sortable="true"
        align="center"
        prop="Address"
        label="登記地址"
      >
      </el-table-column>
      <el-table-column label="" align="center">
        <template slot-scope="scope">
          <button
            type="button"
            class="btn btn_primary"
            @click="openModal(scope.row)"
          >
            下單
          </button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      @size="(val) => (pageSize = val)"
      @page="(val) => (currentPage = val)"
      v-if="rows.length > 0"
      :total="rows.length"
    ></Pagination>

    <OrderModal :customer="customer" @sendData="sendData"></OrderModal>
  </article>
</template>
<script>
/* global $ */
import OrderModal from "@/components/CommonModal/PlaceOrderModal.vue";
import Pagination from "@/components/CommonComponent/Pagination.vue";
import { commonFunction } from "@/mixins/commonFunction.js";
import CitySearch from "@/components/CommonComponent/CitySearch.vue";
import { mapState, mapGetters } from "vuex";
export default {
  name: "SingleStoreOrder",
  mixins: [commonFunction],
  data() {
    return {
      customer: {}, // 打開下訂 Modal 傳入的資料
      currentPage: 1,
      pageSize: 20,
    };
  },
  methods: {
    openModal(item) {
      const vm = this;
      let customer = {
        ...item,
        isHeadquarters: false, // 是否為總店
      };
      vm.customer = customer;

      vm.$store.commit("CUSTOMERDATA", vm.customer);

      $("#placeordermodal").modal("show");
    },

    // 搜尋
    searchCustomer(searchBox) {
      const vm = this;

      searchBox = {
        ...searchBox,
        purchaseType: "Single",
        IsDeactivated: "",
      };

      vm.$store.dispatch("getCustomer", searchBox);
    },

    sendData(product) {
      const vm = this;
      localStorage.setItem("routerFrom", "SingleStoreOrder"); // 從哪裡過去的
      // 在該次下單 Modal 被打勾的商品
      vm.$router.push({
        name: "AllSingleStoreOrder",
        params: { confirmProduct: product },
      });
    },
  },

  computed: {
    ...mapState({
      rows: "customerRows",
    }),
    ...mapGetters(["saleInfo"]),
  },
  mounted() {
    const vm = this;
    vm.$store.commit("HEADER", "單店訂單作業");
    vm.$store.commit("ISWELCOME", true);
    vm.$store.commit("ISGOBACK", false);
    vm.$store.commit("ISLOADING", true);
    localStorage.setItem("IsHeadquarterStorder", false); // 是否為總店訂購
    // 清空表單資料。
    vm.$store.commit("CLOSEALLORDERDATA");
  },
  components: {
    CitySearch,
    OrderModal,
    Pagination,
  },
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
