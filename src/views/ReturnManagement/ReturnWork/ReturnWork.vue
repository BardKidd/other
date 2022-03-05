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
        prop="CustomerFullName"
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
      <el-table-column
        :sortable="true"
        align="center"
        prop="StoreTypeCN"
        label="店家類型"
      >
      </el-table-column>
      <el-table-column label="" align="center">
        <template slot-scope="scope">
          <button class="btn btn_primary" @click="openModal(scope.row)">
            退貨
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

    <div class="order-note">
      <span class="note">!</span>
      如需作廢訂單，請至業務訂購單作廢
    </div>

    <!-- 選擇退貨產品 -->
    <AfterSaleModal
      ref="AfterSaleModal"
      @sendData="sendData"
      @searchData="searchData"
      @removeProduct="removeProduct"
      :customer="customer"
    >
      <Table
        :slot="'table'"
        :confirmProduct="confirmProduct"
        :tempProduct="tempProduct"
      ></Table>
    </AfterSaleModal>
  </article>
</template>
<script>
/* global $ */
import AfterSaleModal from "@/components/CommonModal/AfterSaleModal.vue";
import Table from "./ReturnModalTemplate.vue";
import Pagination from "@/components/CommonComponent/Pagination.vue";

import { commonFunction } from "@/mixins/commonFunction.js";
import { AfterSaleProcessing } from "@/mixins/afterSaleProcessing.js";
import CitySearch from "@/components/CommonComponent/CitySearch.vue";
import { mapState, mapGetters } from "vuex";

// 未串接 API，所以引入 JSON 檔。
import customersData from "@/data/Customers/Return.json";
import productsData from "@/data/Product/ReturnProductSearch.json";

export default {
  name: "ReturnWork",
  mixins: [commonFunction, AfterSaleProcessing],
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      customer: {}, // 客戶資訊
      currentOrder: {}, // 目前選取的訂單資料

      tempProduct: [], // 產品搜尋出來的結果
      confirmProduct: [],
    };
  },
  methods: {
    searchCustomer(/*searchBox*/) {
      const vm = this;
      // searchBox = {
      //   ...searchBox,
      //   purchaseType: "",
      //   IsDeactivated: "",
      // };

      const searchBox = {
        customersData,
        purchaseType: "",
        IsDeactivated: "",
      };

      // vm.$store.commit("ISLOADING", true);
      vm.$store.dispatch("getCustomer", searchBox);
    },
    openModal(item) {
      const vm = this;
      vm.customer = {
        ...item,
      };

      vm.$store.commit("CUSTOMERDATA", vm.customer);

      $("#aftersalemodal").modal("show");
    },

    sendData() {
      const vm = this;

      vm.concatProduct("tempProduct", "confirmProduct");

      vm.$store.commit("SUREPRODUCT", vm.confirmProduct);
      vm.$router.push({
        name: "AllReturnWork",
        params: {
          confirmProduct: vm.confirmProduct,
        },
      });
    },

    // 搜尋產品
    searchData() {
      const vm = this;

      vm.tempProduct = productsData.Data;
      vm.tempProduct = vm.tempProduct.filter((item) => {
        return item.ReturnableQuantity > 0;
      });
      // let after = vm.$refs.AfterSaleModal.searchBox;
      // // 因為系列有分類的內容，所以只能保持 object
      // let productSeries = after.productSeries ? after.productSeries.Code : "";
      // // this.print("after", after);
      // const url = `${process.env.VUE_APP_APIPATH}/Inventory/Return/GetReturnableProduct?customerId=${vm.customer.CustomerID}&productSeries=${productSeries}&productClass=${after.productType}&whseId=${after.WhseName}&keyword=${after.keyword}`;

      // vm.$store.commit("ISLOADING", true);
      // vm.$http
      //   .get(url)
      //   .then((res) => {
      //     if (res.data.Status >= 200 && res.data.Status < 300) {
      //       vm.tempProduct = res.data.Data;
      //       vm.tempProduct = vm.tempProduct.filter((item) => {
      //         return item.ReturnableQuantity > 0;
      //       });
      //       if (vm.tempProduct.length === 0) {
      //         vm.$notify({
      //           title: "提示",
      //           message: "未搜尋到任何產品",
      //           type: "warning",
      //           duration: 3500,
      //         });
      //       }
      //     } else {
      //       vm.$notify({
      //         title: "錯誤",
      //         message: res.data.ErrorMessage,
      //         type: "error",
      //         duration: 3500,
      //       });
      //     }
      //     vm.$store.commit("ISLOADING", false);
      //   })
      //   .catch(() => {
      //     vm.$store.commit("ISLOADING", false);
      //   });
    },

    // 關閉 Modal 時會順便清除資料。
    removeProduct() {
      const vm = this;
      vm.tempProduct = [];
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
    vm.$store.commit("HEADER", "退貨作業");
    vm.$store.commit("ISWELCOME", true);
    vm.$store.commit("ISGOBACK", false);

    // 清空表單資料。
    vm.$store.commit("CLOSEALLORDERDATA");
  },
  components: {
    AfterSaleModal,
    Table,
    CitySearch,
    Pagination,
  },
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
