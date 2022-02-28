<template>
  <div :key="keyData">
    <VO tag="article" v-slot="{ handleSubmit }">
      <div class="table-title">
        <span></span>
        <button
          type="button"
          class="btn btn_primary"
          data-toggle="modal"
          data-target="#aftersalemodal"
        >
          新增品項
        </button>
      </div>
      <!-- 取貨品項 -->
      <div class="table-title">
        <span>取貨品項</span>
      </div>
      <section v-if="confirmProduct.length > 0">
        <PickUpTemplate
          :pickupRows="confirmProduct"
          @getTotalData="getTotalData"
          @getPickupData="getPickupData"
          :customer="customer"
          :isDisabled="false"
        ></PickUpTemplate>
      </section>
      <section v-else class="pl-2 mb-2">暫無取貨品項...</section>

      <div class="result-wrap">
        <div class="item">
          取貨總數量 <span>{{ allPickUpQTY }}</span>
        </div>
        <div class="amount">
          取貨總金額 <span>{{ allPickUpPrice }}</span>
        </div>
        <button
          type="button"
          class="btn btn_info"
          @click="handleSubmit(checkOrder)"
        >
          確認取貨
        </button>
      </div>
    </VO>

    <!-- 選擇退貨產品 -->
    <AfterSaleModal
      ref="AfterSaleModal"
      @sendData="sendData"
      @searchData="searchData"
      @removeProduct="removeProduct"
      :customer="customer"
      :NoWarehouse="true"
    >
      <Table
        :key="keyData"
        slot="table"
        :confirmProduct="confirmProduct"
        :tempProduct="tempProduct"
      ></Table>
    </AfterSaleModal>

    <CheckModal @clickSave="confirmPickup">
      <PickUpTemplate
        :pickupRows="confirmProduct"
        @getTotalData="getTotalData"
        @getPickupData="getPickupData"
        :customer="customer"
        slot="orderTemplate"
        :isDisabled="true"
        :pickupData="pickupData"
      ></PickUpTemplate>
    </CheckModal>
  </div>
</template>

<script>
/* global $ */
import PickUpTemplate from "@/views/WareHouse/AllPickUpWork/PickUpTemplate.vue";

// 包含 splitRow、filterTemplate 函式
import { shoppingCardProcessing } from "@/mixins/shoppingCardProcessing.js";

// 包含 concatRow、checkInventory 函式
import { OrderProcessing } from "@/mixins/orderProcessing.js";
// 包含 concatProduct 函式
import { AfterSaleProcessing } from "@/mixins/afterSaleProcessing.js";

import AfterSaleModal from "@/components/CommonModal/AfterSaleModal.vue";
import Table from "@/views/WareHouse/PickUpWork/PickUpModalTemplate.vue";

import CheckModal from "@/components/ReturnManagement/CheckReturnModal.vue";

import { mapGetters } from "vuex";

export default {
  name: "AllPickUpWork",
  mixins: [shoppingCardProcessing, OrderProcessing, AfterSaleProcessing],
  data() {
    return {
      totalExchangeQuantity: 0, // 換貨總品項

      keyData: 1, // 偵測刪除後畫面是否有變動

      confirmProduct: JSON.parse(localStorage.getItem("sureProduct")), // 全部取貨的商品，因為只有一層，所以都用這個操作
      tempProduct: [],
      allPickUpPrice: 0,
      allPickUpQTY: 0,
      pickupData: {}, // 取貨資料
    };
  },
  methods: {
    checkOrder() {
      $("#commoncheckmodal").modal("show");
    },

    // 確認取貨
    confirmPickup() {
      const vm = this;
      if (vm.confirmProduct.length === 0) {
        vm.$notify({
          title: "提示",
          message: "請先選擇商品",
          type: "warning",
          duration: 3500,
        });
        return false;
      }
      const url = `${process.env.VUE_APP_APIPATH}/Inventory/Warehouse/WarehousePickupProducts`;
      let WarehousePickups = vm.confirmProduct.map((item) => {
        return {
          ItemNo: item.ProductId,
          ItemName: item.ProductName,
          Variant: item.Specification,
          Uom: item.UOM,
          GiftSpareQty: 0,
          PickupQty: item.cardQuantity,
        };
      });

      let sendData = {
        CustomerId: vm.pickupData.CustomerID,
        DeptId: vm.customer.DeptID,
        CustomerFullName: vm.pickupData.CustomerFullName,
        Contact: vm.pickupData.Contact,
        ContactTel: vm.pickupData.TEL_NO,
        Memo: vm.pickupData.Memo,
        PickupContact: vm.pickupData.ReceiveName,
        PickupContactTel: vm.pickupData.ReceiveContact,
        PickupAddress: vm.pickupData.ReceiveAddress,
        SalesId: vm.saleInfo.EmpID,
        TaxId: vm.pickupData.TaxID,
        IsExchange: false,
        CreateUser: localStorage.getItem("uofUserGuid"),
        WarehousePickups,
        WarehouseExchange: null,
      };
      vm.$store.commit("ISLOADING", true);
      vm.$http
        .post(url, sendData)
        .then((res) => {
          if (!res.data.ErrorMessage) {
            vm.$notify({
              title: "成功",
              message: "取貨作業完成",
              type: "success",
              duration: 3500,
            });
            vm.$store.commit("ISLOADING", false);

            vm.$router.push({
              name: "OrderFinish",
              params: { text: "寄倉取貨單" },
            });
          }
        })
        .catch((error) => {
          vm.$store.commit("ISLOADING", false);

          if (error.response.statue === 400) {
            vm.$notify({
              title: "錯誤",
              message: error.response.data,
              type: "error",
              duration: 3500,
            });
          }
        });
    },

    // 把搜尋結果和以選取的商品合併後送到購物車畫面上
    sendData() {
      const vm = this;
      vm.concatProduct("tempProduct", "confirmProduct");

      vm.$store.commit("SUREPRODUCT", vm.confirmProduct);
      $("#aftersalemodal").modal("hide");
    },

    getTotalData() {
      const vm = this;

      let totalQTY = 0;
      let totalPrice = 0;

      if (vm.confirmProduct.length > 0) {
        vm.confirmProduct.forEach((item) => {
          totalPrice += Number(item.UnitPrice * item.cardQuantity);
          totalQTY += Number(item.cardQuantity);
        });
      } else {
        totalQTY = 0;
      }
      vm.allPickUpQTY = totalQTY;
      vm.allPickUpPrice = totalPrice;
    },

    // 取貨資料
    getPickupData(data) {
      const vm = this;
      vm.pickupData = { ...data };
    },

    // 搜尋出來的產品資訊
    searchData() {
      const vm = this;
      let after = vm.$refs.AfterSaleModal.searchBox;

      // 因為系列有分類的內容，所以只能保持 object
      let productSeries = after.productSeries ? after.productSeries.Code : "";
      const url = `${process.env.VUE_APP_APIPATH}/Inventory/Warehouse/GetPickableProducts?customerId=${vm.customer.CustomerID}&productSeries=${productSeries}&productClass=${after.productType}&keyword=${after.keyword}`;

      vm.$store.commit("ISLOADING", true);
      vm.$http
        .get(url)
        .then((res) => {
          if (!res.data.ErrorMessage) {
            // 取出不重複產品
            let result = [];

            res.data.Data.some((product) => {
              let hasFlag = false;
              vm.confirmProduct.some((confirm) => {
                if (
                  product.ProductId === confirm.ProductId &&
                  product.ProductName === confirm.ProductName
                ) {
                  hasFlag = true; // 相同的話打開 flag，不讓他 push。
                  return true;
                }
              });
              if (!hasFlag) {
                result.push(product);
              }
            });
            // 取出可取貨數量大於 0 的商品
            result = result.filter((item) => {
              return item.PickableQuantity > 0;
            });
            vm.tempProduct = result;
          } else {
            vm.$notify({
              title: "錯誤",
              message: res.data.ErrorMessage,
              type: "error",
              duration: 3500,
            });
          }
          vm.$store.commit("ISLOADING", false);
        })
        .catch(() => {
          vm.$store.commit("ISLOADING", false);
        });
    },

    // 關閉 Modal 時會順便清除資料。
    removeProduct() {
      const vm = this;
      vm.tempProduct = [];
    },
  },
  watch: {
    confirmProduct() {
      const vm = this;
      vm.keyData += 1;

      vm.getTotalData();
    },
  },
  computed: {
    // 業務資訊
    saleInfo() {
      return JSON.parse(localStorage.getItem("saleInfo"));
    },

    // 取得客戶資訊
    customer() {
      return JSON.parse(localStorage.getItem("customer"));
    },

    ...mapGetters({
      localSureProduct: "confirmProduct",
    }),
  },
  mounted() {
    const vm = this;
    vm.$store.commit("HEADER", "寄倉取貨作業");
    vm.$store.commit("ISWELCOME", false);
    vm.$store.commit("ISGOBACK", true);

    if (JSON.parse(localStorage.getItem("sureProduct")).length === 0) {
      vm.$router.back();
    }

    vm.confirmProduct = vm.$route.params.confirmProduct || vm.localSureProduct; // 前頁面下單 Modal 帶入的商品

    vm.confirmProduct.forEach((item) => {
      vm.allPickUpQTY += item.cardQuantity;
    });
  },

  components: {
    PickUpTemplate,
    AfterSaleModal,
    Table,
    CheckModal,
  },
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
