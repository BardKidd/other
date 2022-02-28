<template>
  <article>
    <!-- 取貨品項 -->
    <div class="table-title">
      <span>取貨品項</span>
      <button
        type="button"
        class="btn btn_primary"
        @click="openNewProduct('pickup')"
      >
        新增品項
      </button>
    </div>
    <section v-if="pickupRows.length > 0" class="mb-3">
      <PickUpTemplate
        :pickupRows="pickupRows"
        @removeTemplate="removeProduct"
        @getPickupData="getPickupData"
        :isDisabled="false"
        :key="keyData"
      ></PickUpTemplate>
    </section>
    <section v-else class="pl-2 mb-2">暫無取貨品項...</section>

    <div class="table-title">
      <span>換購品項</span>
      <button
        type="button"
        class="btn btn_primary"
        @click="openNewProduct('exchange')"
      >
        新增品項
      </button>
    </div>

    <section v-if="exchangeRows.length > 0" class="mb-3">
      <ExchangeTemplate
        :isDisabled="false"
        :exchangeRows="exchangeRows"
        @getExchangeData="getExchangeData"
        :key="keyData * 2"
      ></ExchangeTemplate>
    </section>
    <section v-else class="pl-2 mb-2">暫無換購品項...</section>

    <div class="result-wrap">
      <div class="item">
        取貨總品項 <span>{{ allPickupQTY }}</span>
      </div>
      <div class="item">
        取貨總金額 <span>{{ allPickupPrice }}</span>
      </div>
      <div class="item">
        換貨總品項 <span>{{ allExchangeQTY }}</span>
      </div>
      <div class="item">
        換貨總金額 <span>{{ allExchangePrice }}</span>
      </div>

      <div class="amount">
        總計差額 <span>{{ difference }}</span>
      </div>

      <button type="button" class="btn btn_info" @click="openCheck">
        確認換貨
      </button>
    </div>

    <!-- 選擇取貨產品 -->
    <AfterSaleModal
      ref="AfterSaleModal"
      @searchData="searchData"
      @removeProduct="removeProduct"
      :customer="customer"
      @sendData="sendData"
      :NoWarehouse="true"
    >
      <PickupTable
        :tempProduct="tempProduct"
        :confirmProduct="pickupRows"
        v-if="currentTable === 'pickup'"
        :slot="'table'"
      ></PickupTable>
      <ExchangeTable
        :tempProduct="tempExchangeProduct"
        :confirmProduct="exchangeRows"
        v-if="currentTable === 'exchange'"
        :slot="'table'"
      ></ExchangeTable>
    </AfterSaleModal>

    <Check @clickSave="checkInventory('sendOrder')">
      <PickUpTemplate
        :pickupRows="pickupRows"
        :isDisabled="true"
        :key="keyData"
        slot="orderTemplate"
      ></PickUpTemplate>
      <ExchangeTemplate
        :isDisabled="true"
        :exchangeRows="exchangeRows"
        :key="keyData * 2"
        slot="exchangeTemplate"
      ></ExchangeTemplate>
      <CheckReceipt
        :allPickupPrice="allPickupPrice"
        :allReturnReason="allReturnReason"
        slot="other_1"
        @getOther="getOther1"
        :customer="customer"
      ></CheckReceipt>
      <CheckPayInfo
        :allExchangePrice="allExchangePrice"
        :difference="difference"
        :allReturnReason="allReturnReason"
        :allPayTerm="allPayTerm"
        slot="other_2"
        @getOther="getOther2"
        :customer="customer"
      ></CheckPayInfo>
    </Check>
  </article>
</template>

<script>
/* global $ */
// 購物車畫面元件
import PickUpTemplate from "./PickupTemplate_WareHouse.vue";
import ExchangeTemplate from "./ExchangeTemplate_WareHouse.vue";

// 新增品項元件
import AfterSaleModal from "@/components/CommonModal/AfterSaleModal.vue";
import PickupTable from "@/views/WareHouse/PickUpWork/PickUpModalTemplate.vue";
import ExchangeTable from "@/views/WareHouse/WareHouseExchange/WareHouseModalTemplate.vue";

// 確認換貨共用元件
import Check from "@/components/ReturnManagement/CheckReturnModal.vue";
import CheckPayInfo from "./CheckTemplate/PayInfoTemplate.vue";
import CheckReceipt from "./CheckTemplate/ReceiptTemplate.vue";

// 包含 splitRow、filterTemplate 函式
import { shoppingCardProcessing } from "@/mixins/shoppingCardProcessing.js";

// 包含 concatRow、checkInventory 函式
import { OrderProcessing } from "@/mixins/orderProcessing.js";

// 包含 concatProduct 函式
import { AfterSaleProcessing } from "@/mixins/afterSaleProcessing.js";

import { getPayTerm, getReturnReason } from "@/commonAPI/api.js";

export default {
  name: "AllWareHouseExchangeJob",
  mixins: [shoppingCardProcessing, OrderProcessing, AfterSaleProcessing],
  data() {
    return {
      pickupRows: [], // 取貨目前的品項
      tempProduct: [], // 取貨目前搜尋出來的資料

      exchangeRows: [], // 換貨目前的品項
      tempExchangeProduct: [], // 換貨目前搜尋出來的資料

      currentTable: "pickup", // 要顯示哪個 table。

      otherData1: {}, // check Modal 的其他資料
      otherData2: {}, // check Modal 的其他資料

      allReturnReason: [],
      allPayTerm: [],

      keyData: 1, // 偵測刪除後畫面是否有變動

      allPickupQTY: 0, // 退貨總品項
      allExchangeQTY: 0, // 換購總品項

      allPickupPrice: 0, // 退貨總金額
      allExchangePrice: 0, // 換購總金額
    };
  },
  methods: {
    // 新增品項
    sendData() {
      const vm = this;
      if (vm.currentTable === "pickup") {
        vm.concatProduct("tempProduct", "pickupRows");
        vm.$store.commit("SUREPRODUCT", vm.pickupRows);
      } else if (vm.currentTable === "exchange") {
        vm.concatProduct("tempExchangeProduct", "exchangeRows");
        localStorage.setItem(
          "confirmExchangeProduct",
          JSON.stringify(vm.exchangeRows)
        );
      }
      $("#aftersalemodal").modal("hide");
    },

    // 打開新增品項 Modal
    openNewProduct(type) {
      const vm = this;
      vm.currentTable = type;

      $("#aftersalemodal").modal("show");
    },

    // 搜尋出來的產品資訊
    searchData() {
      const vm = this;
      let after = vm.$refs.AfterSaleModal.searchBox;
      let url = "";
      vm.$store.commit("ISLOADING", true);

      if (vm.currentTable === "pickup") {
        let productSeries = after.productSeries ? after.productSeries.Code : "";
        url = `${process.env.VUE_APP_APIPATH}/Inventory/Warehouse/GetPickableProducts?customerId=${vm.customer.CustomerID}&productSeries=${productSeries}&productClass=${after.productType}&keyword=${after.keyword}`;
        vm.$http
          .get(url)
          .then((res) => {
            if (!res.data.ErrorMessage) {
              // 取出不重複產品
              let result = [];

              res.data.Data.some((product) => {
                let hasFlag = false;
                vm.pickupRows.some((confirm) => {
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
      } else {
        let productSeries = after.productSeries ? after.productSeries.Code : "";
        url = `${process.env.VUE_APP_APIPATH}/Inventory/Product/GetProducts?salesDeptId=${vm.saleInfo.DeptCode}&productSeries=${productSeries}&productClass=${after.productType}&keyword=${after.keyword}`;

        vm.$http
          .get(url)
          .then((res) => {
            if (res.data.Data.length === 0) {
              vm.$notify({
                title: "提示",
                message: "未搜尋到任何產品",
                type: "warning",
                duration: 3500,
              });
            }
            if (!res.data.ErrorMessage) {
              // 取出不重複產品
              let result = [];

              res.data.Data.some((product) => {
                let hasFlag = false;
                if (product.InvQty > 0) {
                  vm.exchangeRows.some((confirm) => {
                    if (
                      product.ItemNo === confirm.ItemNo &&
                      product.WhseID === confirm.WhseID
                    ) {
                      hasFlag = true; // 相同的話打開 flag，不讓他 push。
                      return true;
                    }
                  });
                  if (!hasFlag) {
                    result.push(product);
                  }
                }
              });
              vm.tempExchangeProduct = result;
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
      }
    },

    // 刪除產品
    removeProduct() {
      const vm = this;
      vm.tempProduct = [];
      vm.tempExchangeProduct = [];
    },

    // 確認訂單
    openCheck() {
      const vm = this;
      if (vm.exchangeRows.length === 0) {
        vm.$notify({
          title: "提示",
          message: "請先選擇商品",
          type: "warning",
          duration: 3500,
        });
        return false;
      }
      vm.checkInventory("getMerge");
    },

    // 最後送出去的資料
    sendOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/Inventory/Warehouse/WarehousePickupProducts`;

      let WarehousePickups = vm.pickupRows.map((item) => {
        return {
          ItemNo: item.ProductId,
          ItemName: item.ProductName,
          Variant: item.Specification,
          Uom: item.UOM,
          GiftSpareQty: 0,
          PickupQty: item.cardQuantity,
        };
      });
      let WarehouseExchangeProducts = vm.exchangeRows.map((item) => {
        return {
          ItemNo: item.ItemNo,
          ItemName: item.ItemName,
          Variant: item.Specification,
          Uom: item.UOM,
          UnitPrice: item.UnitPrice,
          ExchangeQty: item.cardQuantity,
        };
      });
      let sendData = {
        CustomerId: vm.customer.CustomerID,
        DeptId: vm.customer.DeptID,
        CustomerFullName: vm.customer.CustomerFullName,
        Contact: vm.customer.Contact,
        ContactTel: vm.customer.TEL_NO,
        Memo: vm.otherData1.Memo,
        PickupContact: vm.otherData1.ReceiveName,
        PickupContactTel: vm.otherData1.ReceiveContact,
        PickupAddress: vm.otherData1.ReceiveAddress,
        SalesId: vm.saleInfo.EmpID,
        TaxId: vm.customer.TaxID,
        IsExchange: true,
        CreateUser: localStorage.getItem("uofUserGuid"),
        WarehousePickups,
        WarehouseExchange: {
          WithInvoiceTax: vm.otherData2.NotTaxId,
          InvoiceTax: vm.otherData2.TaxId,
          PaymentTermsCode: vm.otherData2.PaymentTerms,
          InvoiceAttached: vm.otherData2.AttachInvoice,
          InvoiceName: vm.otherData2.InvoiceName,
          InvoiceContact: vm.otherData2.InvoiceContact,
          InvoiceAddress: vm.otherData2.InvoiceAddress,
          ExchangeReasonCode: vm.otherData1.RtnReasons,
          WarehouseExchangeProducts,
        },
      };
      vm.$store.commit("ISLOADING", true);
      vm.$http
        .post(url, sendData)
        .then((res) => {
          if (!res.data.ErrorMessage) {
            vm.$notify({
              title: "成功",
              message: "換貨作業完成",
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

    // 檢查庫存量
    checkInventory(type) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/Inventory/Product/CheckProductInventory`;
      vm.$store.commit("ISLOADING", true);

      let result = vm.exchangeRows.map((item) => {
        return {
          ProductId: item.ItemNo.trim(),
          WhseID: item.WhseID.trim(),
          IsPending: false,
          PendingQuantity: 0,
          PurchaseQuantity: item.cardQuantity,
        };
      });
      let sendData = {
        Customers: [
          {
            CustomerId: vm.customer.CustomerID,
            Products: result,
          },
        ],
      };
      vm.$http
        .post(url, sendData)
        .then((res) => {
          vm.$store.commit("ISLOADING", false);
          if (!res.data.ErrorMessage) {
            if (type === "getMerge") {
              vm.keyData += 1; // 畫面刷新完才展開
              setTimeout(() => {
                $("#commoncheckmodal").modal("show");
              }, 50);
            } else {
              vm.sendOrder();
            }
          } else {
            vm.$message.error({
              message: `<span>${res.data.ErrorMessage}<span>`,
              dangerouslyUseHTMLString: true,
              showClose: true,
              duration: 10000,
            });
            return false;
          }
        })
        .catch((error) => {
          vm.$store.commit("ISLOADING", false);
          if (error.response.status === 400) {
            vm.$notify({
              title: "錯誤",
              message: error.response.data,
              type: "error",
              duration: 3500,
            });
          }
        });
    },

    // 取得取貨總品項和總金額
    getPickupData() {
      const vm = this;
      let totalQTY = 0;
      let totalPrice = 0;
      if (vm.pickupRows.length > 0) {
        vm.pickupRows.forEach((item) => {
          totalQTY += Number(item.cardQuantity);
          totalPrice += Number(item.cardQuantity * item.UnitPrice);
        });
      } else {
        totalQTY = 0;
      }
      vm.allPickupQTY = totalQTY;
      vm.allPickupPrice = totalPrice;
    },

    // 取得換購總品項和總金額
    getExchangeData() {
      const vm = this;
      let totalQTY = 0;
      let totalPrice = 0;
      if (vm.exchangeRows.length > 0) {
        vm.exchangeRows.forEach((item) => {
          totalQTY += Number(item.cardQuantity);
          totalPrice += Number(item.cardQuantity * item.UnitPrice);
        });
      } else {
        totalQTY = 0;
      }
      vm.allExchangeQTY = totalQTY;
      vm.allExchangePrice = totalPrice;
    },

    // 取得其他資料(退貨原因)
    getOther1(other) {
      const vm = this;
      vm.otherData1 = { ...other };
    },
    // 取得其他資料(付款資訊)
    getOther2(other) {
      const vm = this;
      vm.otherData2 = { ...other };
    },

    // 跟總店分店的取得付款方式寫法不太一樣
    getUnitFormat(row) {
      const vm = this;
      let arr = [];
      let obj = {};
      row.forEach((product) => {
        let tempObj = {
          ProductId: product.ItemNo.trim(),
          PayTermCode: vm.otherData2.PaymentTerms,
          Quantity: product.cardQuantity ? product.cardQuantity : 1,
        };
        arr.push(tempObj);
      });
      obj = {
        Products: arr,
      };

      return obj;
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

          if (vm.UnitPrice.length > 0) {
            vm.exchangeRows.forEach((product) => {
              vm.UnitPrice.forEach((price) => {
                if (price.ItemNo === product.ItemNo.trim()) {
                  product.UnitPrice = price.UnitPrice;
                }
              });
            });
          } else {
            vm.exchangeRows.forEach((product) => {
              product.UnitPrice = 0;
            });
          }

          setTimeout(() => {
            vm.getPickupData();
            vm.getExchangeData();
            vm.$store.commit("ISLOADING", false);
          }, 0);
        })
        .catch(() => {
          vm.$store.commit("ISLOADING", false);
        });
    },
  },

  watch: {
    "otherData2.PaymentTerms"(n) {
      const vm = this;
      if (n) {
        vm.getUnitPrice(vm.getUnitFormat(vm.exchangeRows));
      }
    },
    pickupRows(n) {
      const vm = this;
      vm.getPickupData();

      if (n.length === 0) {
        vm.allPickupPrice = 0;
      }
    },
    exchangeRows(n) {
      const vm = this;
      vm.getExchangeData();

      if (n.length === 0) {
        vm.allExchangePrice = 0;
      }
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

    difference() {
      const vm = this;
      return vm.allPickupPrice - vm.allExchangePrice;
    },
  },
  mounted() {
    const vm = this;
    vm.$store.commit("HEADER", "寄倉換貨作業");
    vm.$store.commit("ISWELCOME", false);
    vm.$store.commit("ISGOBACK", true);

    if (JSON.parse(localStorage.getItem("sureProduct")).length === 0) {
      vm.$router.back();
    }

    vm.pickupRows =
      vm.$route.params.confirmProduct ||
      JSON.parse(localStorage.getItem("sureProduct")); // 前頁面下單 Modal 帶入的商品

    vm.axios.all([getReturnReason(), getPayTerm()]).then(
      vm.axios.spread((allReturnReason, allPayTerm) => {
        if (!allReturnReason.data.ErrorMessage) {
          vm.allReturnReason = allReturnReason.data.Data;
        } else {
          vm.$notify({
            title: "錯誤",
            message: allReturnReason.data.ErrorMessage,
            type: "error",
            duration: 3500,
          });
        }

        if (!allPayTerm.data.ErrorMessage) {
          vm.allPayTerm = allPayTerm.data.Data;
        } else {
          vm.$notify({
            title: "錯誤",
            message: allPayTerm.data.ErrorMessage,
            type: "error",
            duration: 3500,
          });
        }
        vm.$store.commit("ISLOADING", false);
      })
    );

    // 一開始進來時的取貨總品項數量調整
    vm.allPickupQTY = vm.pickupRows.length;
    vm.$store.commit("ISLOADING", false);
  },
  components: {
    PickUpTemplate,
    ExchangeTemplate,
    AfterSaleModal,
    PickupTable,
    ExchangeTable,
    Check,
    CheckPayInfo,
    CheckReceipt,
  },

  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
