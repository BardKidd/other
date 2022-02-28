<template>
  <div :key="keyData">
    <VO tag="article" v-slot="{ handleSubmit }">
      <!-- 訂購品項 -->
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
      <!-- 訂購品項 -->
      <div class="table-title">
        <span>訂購品項</span>
      </div>
      <section v-if="confirmProduct.length > 0">
        <ReturnTemplate
          :confirmProduct="confirmProduct"
          :allReturnReason="allReturnReason"
          :allPayTerm="allPayTerm"
          @getReturnData="getReturnData"
          @getAllReturnQTY="getAllReturnQTY"
          :customer="customer"
          :isDisabled="false"
        ></ReturnTemplate>
      </section>
      <section v-else class="pl-2 mb-2">暫無退貨品項...</section>

      <div class="result-wrap mt-2">
        <div class="item">
          退貨總品項 <span>{{ allReturnQTY }}</span>
        </div>
        <div class="amount">
          退貨總金額 <span>{{ totalPrice }}</span>
        </div>
        <button
          type="button"
          class="btn btn_info"
          @click="handleSubmit(checkOrder)"
        >
          確認退貨
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
    >
      <Table
        :key="keyData"
        :slot="'table'"
        :confirmProduct="confirmProduct"
        :tempProduct="tempProduct"
      ></Table>
    </AfterSaleModal>

    <CheckModal @clickSave="confirmReturn">
      <ReturnTemplate
        :confirmProduct="confirmProduct"
        :allReturnReason="allReturnReason"
        :allPayTerm="allPayTerm"
        :isDisabled="true"
        :customer="customer"
        :slot="'orderTemplate'"
        :returnData="returnData"
      ></ReturnTemplate>
    </CheckModal>
  </div>
</template>

<script>
/* global $ */
import ReturnTemplate from "@/views/ReturnManagement/AllReturnWork/ReturnTemplate.vue";

// 包含 splitRow、filterTemplate 函式
import { shoppingCardProcessing } from "@/mixins/shoppingCardProcessing.js";

// 包含 concatRow、checkInventory 函式
import { OrderProcessing } from "@/mixins/orderProcessing.js";

// 包含 concatProduct 函式
import { AfterSaleProcessing } from "@/mixins/afterSaleProcessing.js";

import { getPayTerm, getReturnReason } from "@/commonAPI/api.js";

import AfterSaleModal from "@/components/CommonModal/AfterSaleModal.vue";
import Table from "@/views/ReturnManagement/ReturnWork/ReturnModalTemplate.vue";

import CheckModal from "@/components/ReturnManagement/CheckReturnModal.vue";

import { mapGetters } from "vuex";

export default {
  name: "AllReturnWork",
  mixins: [shoppingCardProcessing, OrderProcessing, AfterSaleProcessing],
  data() {
    return {
      allReturnReason: [], // 全部退貨原因
      allPayTerm: [], // 全部付款方式

      totalExchangeQuantity: 0, // 換貨總品項

      keyData: 1, // 偵測刪除後畫面是否有變動

      returnData: {}, // 退貨資訊

      customer: JSON.parse(localStorage.getItem("customer")),

      confirmProduct: [], // 全部退貨的商品，因為只有一層，所以都用這個操作
      tempProduct: [],

      UnitPrice: [], // 取得產品單價後的所有值。

      allReturnQTY: 1, // 退貨總品項
      totalPrice: 0, // 退貨總金額
    };
  },
  methods: {
    // 先確認畫面欄位是否填完才打開
    checkOrder() {
      $("#commoncheckmodal").modal("show");
    },

    // 確認退貨
    async confirmReturn() {
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
      await vm.getUnitPrice(vm.getUnitFormat(vm.confirmProduct));
      let url = `${process.env.VUE_APP_APIPATH}/Inventory/Return/ReturnProducts`;

      let ReturnProducts = vm.confirmProduct.map((item) => {
        return {
          ProductId: item.ProductId,
          ProductName: item.ProductName,
          Variant: item.Specification,
          ReturnQty: Number(item.cardQuantity),
          Uom: item.UOM,
          UnitPrice: item.UnitPrice || 0,
          GiftSpareQty: 0,
        };
      });

      let sendData = {
        SalesId: vm.saleInfo.EmpID,
        CustomerId: vm.customer.CustomerID,
        CustomerDeptId: vm.customer.DeptID,
        TaxId: vm.customer.TaxID,
        CustomerFullName: vm.customer.CustomerFullName,
        Contact: vm.customer.Contact,
        ContactTel: vm.customer.TEL_NO,
        PaymentTermsCode: vm.returnData.PaymentTerms,
        Memo: vm.returnData.Memo,
        ReturnReasonCode: vm.returnData.RtnReasons,
        ReturnContact: vm.returnData.Contact,
        ReturnContactTel: vm.returnData.TEL_NO,
        ReturnAddress: vm.returnData.ReceiveAddress,
        CreateUser: localStorage.getItem("uofUserGuid"),
        ReturnExchange: null,
        ReturnProducts,
      };
      vm.$store.commit("ISLOADING", true);
      await vm.$http
        .post(url, sendData)
        .then((res) => {
          console.log(res);
          if (res.data.Status >= 200 && res.data.Status < 300) {
            vm.$notify({
              title: "成功",
              message: "退貨成功",
              type: "success",
              duration: 3500,
            });

            vm.$router.push({
              name: "OrderFinish",
              params: { text: "退貨單" },
            });
          } else {
            vm.$notify({
              title: "錯誤",
              message: res.data.ErrorMessage,
              type: "error",
              duration: 5000,
            });
          }
          vm.$store.commit("ISLOADING", false);
        })
        .catch((error) => {
          vm.$store.commit("ISLOADING", false);

          vm.$notify({
            title: "錯誤",
            message: error.response.data,
            type: "error",
            duration: 5000,
          });
        });
    },

    sendData() {
      const vm = this;
      vm.concatProduct("tempProduct", "confirmProduct");

      vm.$store.commit("SUREPRODUCT", vm.confirmProduct);
      $("#aftersalemodal").modal("hide");
    },

    // 搜尋產品
    searchData() {
      const vm = this;
      let after = vm.$refs.AfterSaleModal.searchBox;
      // 因為系列有分類的內容，所以只能保持 object
      let productSeries = after.productSeries ? after.productSeries.Code : "";
      // this.print("after", after);
      const url = `${process.env.VUE_APP_APIPATH}/Inventory/Return/GetReturnableProduct?customerId=${vm.customer.CustomerID}&productSeries=${productSeries}&productClass=${after.productType}&whseId=${after.WhseName}&keyword=${after.keyword}`;

      vm.$store.commit("ISLOADING", true);
      vm.$http
        .get(url)
        .then((res) => {
          if (res.data.Status >= 200 && res.data.Status < 300) {
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

    // 取得退貨資料，不含訂購品項
    getReturnData(data) {
      const vm = this;
      vm.returnData = { ...data };
    },

    // 跟總店分店的取得付款方式寫法不太一樣
    getUnitFormat(row) {
      const vm = this;
      let arr = [];
      let obj = {};
      row.forEach((product) => {
        let tempObj = {
          ProductId: product.ProductId.trim(),
          PayTermCode: vm.returnData.PaymentTerms,
          Quantity: product.cardQuantity ? product.cardQuantity : 1,
        };
        arr.push(tempObj);
      });
      obj = {
        Products: arr,
      };

      return obj;
    },

    // 取得退貨總數量
    getAllReturnQTY() {
      const vm = this;
      let total = 0;
      if (vm.confirmProduct.length > 0) {
        vm.confirmProduct.forEach((item) => {
          total += Number(item.cardQuantity);
        });
      } else {
        total = 0;
      }
      vm.allReturnQTY = total;
    },

    // 取得產品單價
    getUnitPrice(params) {
      const vm = this;
      let url = `${process.env.VUE_APP_APIPATH}/Inventory/Product/GetProductUnitPrice`;
      vm.$store.commit("ISLOADING", true);
      vm.$http
        .post(url, params)
        .then((res) => {
          vm.UnitPrice = res.data.Data;

          vm.confirmProduct.forEach((product) => {
            vm.UnitPrice.forEach((price) => {
              if (price.ItemNo === product.ProductId.trim()) {
                product.UnitPrice = price.UnitPrice;
              }
            });
          });

          let total = 0;
          vm.UnitPrice.forEach((item) => {
            total += item.UnitPrice;
          });
          vm.totalPrice = total;
          vm.$store.commit("ISLOADING", false);
        })
        .catch(() => {
          vm.$store.commit("ISLOADING", false);
        });
    },
  },
  mounted() {
    const vm = this;
    vm.$store.commit("HEADER", "退貨作業");
    vm.$store.commit("ISWELCOME", false);
    vm.$store.commit("ISGOBACK", true);

    if (JSON.parse(localStorage.getItem("sureProduct")).length === 0) {
      vm.$router.back();
    }

    vm.confirmProduct = vm.$route.params.confirmProduct || vm.localSureProduct; // 前頁面下單 Modal 帶入的商品

    vm.$store.commit("ISLOADING", true);
    vm.axios.all([getReturnReason(), getPayTerm()]).then(
      vm.axios.spread((allReturnReason, allPayTerm) => {
        if (
          allReturnReason.data.Status >= 200 &&
          allReturnReason.data.Status < 300
        ) {
          vm.allReturnReason = allReturnReason.data.Data;
          if (allReturnReason.data.ErrorMessage) {
            vm.$notify({
              title: "錯誤",
              message: allReturnReason.data.ErrorMessage,
              type: "error",
              duration: 3500,
            });
          }
        }

        if (allPayTerm.data.Status >= 200 && allPayTerm.data.Status < 300) {
          vm.allPayTerm = allPayTerm.data.Data;
          if (allReturnReason.data.ErrorMessage) {
            vm.$notify({
              title: "錯誤",
              message: allPayTerm.data.ErrorMessage,
              type: "error",
              duration: 3500,
            });
          }
        }

        vm.$store.commit("ISLOADING", false);
      })
    );

    vm.$store.commit("ISLOADING", false);
  },
  watch: {
    confirmProduct(n) {
      const vm = this;
      vm.keyData += 1;

      vm.getAllReturnQTY();

      if (n.length === 0) {
        vm.totalPrice = 0;
      }
    },
    "returnData.PaymentTerms"(n) {
      const vm = this;
      if (n) {
        vm.getUnitPrice(vm.getUnitFormat(vm.confirmProduct));
      }
    },
  },
  computed: {
    // 業務資訊
    saleInfo() {
      return JSON.parse(localStorage.getItem("saleInfo"));
    },

    // 取得客戶資訊
    customerData() {
      return JSON.parse(localStorage.getItem("customer"));
    },

    ...mapGetters({
      localSureProduct: "confirmProduct",
    }),
  },
  components: {
    ReturnTemplate,
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
