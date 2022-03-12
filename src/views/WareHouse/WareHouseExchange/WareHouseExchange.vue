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
          <button
            type="button"
            class="btn btn_primary"
            data-toggle="modal"
            data-target="#returnorexchangemodal"
            @click="openModal(scope.row)"
          >
            換貨
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

    <!-- 選擇取貨產品 -->
    <AfterSaleModal
      ref="AfterSaleModal"
      @sendData="sendData"
      @searchData="searchData"
      @removeProduct="removeProduct"
      :customer="customer"
      :NoWarehouse="true"
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
import { commonFunction } from "@/mixins/commonFunction.js";
import AfterSaleModal from "@/components/CommonModal/AfterSaleModal.vue";
import { AfterSaleProcessing } from "@/mixins/afterSaleProcessing.js";

import CitySearch from "@/components/CommonComponent/CitySearch.vue";
import Pagination from "@/components/CommonComponent/Pagination.vue";

import Table from "@/views/WareHouse/PickUpWork/PickUpModalTemplate.vue";
import { mapState, mapGetters } from "vuex";

// 未串接 API，所以引入 JSON 檔。
import customersData from "@/data/Customers/WareHouseExchange.json";
import productsData from "@/data/Product/PickUpProducts.json";

export default {
  name: "WareHouseExchange",
  mixins: [commonFunction, AfterSaleProcessing],
  data() {
    return {
      currentPage: 1,
      pageSize: 20,

      customer: {}, // 客戶資訊
      currentOrder: {}, // 目前選取的訂單資料

      tempProduct: [],
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

      vm.$store.dispatch("getCustomer", searchBox);
    },
    openModal(item) {
      const vm = this;
      vm.customer = { ...item };

      vm.$store.commit("CUSTOMERDATA", vm.customer);

      $("#aftersalemodal").modal("show");
    },

    sendData() {
      const vm = this;

      vm.concatProduct("tempProduct", "confirmProduct");
      vm.$store.commit("SUREPRODUCT", vm.confirmProduct);
      vm.$router.push({
        name: "AllWareHouseExchange",
        params: {
          confirmProduct: vm.confirmProduct,
        },
      });
    },

    // 搜尋出來的產品資訊
    searchData() {
      const vm = this;

      vm.tempProduct = productsData.Data;
      vm.tempProduct = vm.tempProduct.filter((item) => {
        return item.PickableQuantity > 0;
      });
      if (vm.tempProduct.length === 0) {
        vm.$notify({
          title: "提示",
          message: "未搜尋到任何商品",
          type: "warning",
          duration: 3500,
        });
      }

      // let after = vm.$refs.AfterSaleModal.searchBox;

      // // 因為系列有分類的內容，所以只能保持 object
      // let productSeries = after.productSeries ? after.productSeries.Code : "";
      // const url = `${process.env.VUE_APP_APIPATH}/Inventory/Warehouse/GetPickableProducts?customerId=${vm.customer.CustomerID}&productSeries=${productSeries}&productClass=${after.productType}&keyword=${after.keyword}`;

      // vm.$store.commit("ISLOADING", true);
      // vm.$http
      //   .get(url)
      //   .then((res) => {
      //     if (!res.data.ErrorMessage) {
      //       vm.tempProduct = res.data.Data;
      //       vm.tempProduct = vm.tempProduct.filter((item) => {
      //         return item.PickableQuantity > 0;
      //       });
      //       if (vm.tempProduct.length === 0) {
      //         vm.$notify({
      //           title: "提示",
      //           message: "未搜尋到任何商品",
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
    vm.$store.commit("HEADER", "寄倉換貨作業");
    vm.$store.commit("ISWELCOME", true);
    vm.$store.commit("ISGOBACK", false);

    // 清空表單資料。
    vm.$store.commit("CLOSEALLORDERDATA");
    localStorage.removeItem("confirmExchangeProduct"); // 刪除換購
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
