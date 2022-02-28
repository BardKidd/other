<template>
  <article>
    <!-- 退貨品項 -->
    <div class="table-title">
      <span>退貨品項</span>
      <button
        type="button"
        class="btn btn_primary"
        @click="openNewProduct('return')"
      >
        新增品項
      </button>
    </div>
    <section v-if="returnRows.length > 0" class="mb-3">
      <ReturnTemplate
        :isDisabled="false"
        :returnRows="returnRows"
        @removeTemplate="removeProduct"
        @getAllReturnQTY="getAllReturnQTY"
        :key="keyData"
      ></ReturnTemplate>
    </section>
    <section v-else class="pl-2 mb-2">暫無退貨品項...</section>

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
        @getAllExchangeQTY="getAllExchangeQTY"
        :exchangeRows="exchangeRows"
        :key="keyData * 2"
      ></ExchangeTemplate>
    </section>
    <section v-else class="pl-2 mb-2">暫無換購品項...</section>

    <div class="result-wrap">
      <div class="item">
        退貨總品項 <span>{{ allReturnQTY }}</span>
      </div>
      <div class="item">
        退貨總金額 <span>{{ allReturnPrice }}</span>
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

    <AfterSaleModal
      ref="AfterSaleModal"
      @searchData="searchData"
      @removeProduct="removeProduct"
      :customer="customer"
      @sendData="sendData"
    >
      <ReturnTable
        :tempProduct="tempProduct"
        :confirmProduct="returnRows"
        v-if="currentTable === 'return'"
        :slot="'table'"
      ></ReturnTable>
      <ExchangeTable
        :tempProduct="tempExchangeProduct"
        :confirmProduct="exchangeRows"
        v-if="currentTable === 'exchange'"
        :slot="'table'"
      ></ExchangeTable>
    </AfterSaleModal>

    <Check @clickSave="checkInventory('sendOrder')">
      <ReturnTemplate
        :returnRows="returnRows"
        :isDisabled="true"
        slot="orderTemplate"
        :key="keyData * 3"
      ></ReturnTemplate>
      <ExchangeTemplate
        :isDisabled="true"
        :exchangeRows="exchangeRows"
        slot="exchangeTemplate"
        :key="keyData * 4"
      ></ExchangeTemplate>
      <CheckReceipt
        :allReturnPrice="allReturnPrice"
        :allReturnReason="allReturnReason"
        slot="other_1"
        :customer="customer"
        @getOther="getOther1"
      ></CheckReceipt>
      <CheckPayInfo
        :customer="customer"
        :allExchangePrice="allExchangePrice"
        :difference="difference"
        :allReturnReason="allReturnReason"
        :allPayTerm="allPayTerm"
        slot="other_2"
        @getOther="getOther2"
      ></CheckPayInfo>
    </Check>
  </article>
</template>

<script>
/* global $ */
import ReturnTemplate from "@/views/ReturnManagement/AllExchangeJob/ReturnTemplate_Exchange.vue";
import ExchangeTemplate from "@/views/ReturnManagement/AllExchangeJob/ExchangeTemplate_Exchange.vue";

import AfterSaleModal from "@/components/CommonModal/AfterSaleModal.vue";
import ReturnTable from "@/views/ReturnManagement/ReturnWork/ReturnModalTemplate.vue";
import ExchangeTable from "@/views/ReturnManagement/ExchangeJob/ExchangJobTemplate.vue";

import Check from "@/components/ReturnManagement/CheckReturnModal.vue";
import CheckPayInfo from "@/views/ReturnManagement/AllExchangeJob/ExchangeCheckTemplate/PayInfoTemplate.vue";
import CheckReceipt from "@/views/ReturnManagement/AllExchangeJob/ExchangeCheckTemplate/ReceiptTemplate.vue";

// 包含 splitRow、filterTemplate 函式
import { shoppingCardProcessing } from "@/mixins/shoppingCardProcessing.js";

// 包含 concatRow、checkInventory 函式
import { OrderProcessing } from "@/mixins/orderProcessing.js";

// 包含 concatProduct 函式
import { AfterSaleProcessing } from "@/mixins/afterSaleProcessing.js";

import { getPayTerm, getReturnReason } from "@/commonAPI/api.js";

import { mapGetters } from "vuex";

export default {
  name: "AllExchangeJob",
  mixins: [shoppingCardProcessing, OrderProcessing, AfterSaleProcessing],
  data() {
    return {
      keyData: 1, // 偵測刪除後畫面是否有變動
      currentTable: "return", // 要顯示哪個 table。
      returnRows: [], // 退貨用這個紀錄已選取的資料，退貨目前的品項
      tempProduct: [],
      exchangeRows:
        JSON.parse(localStorage.getItem("confirmExchangeProduct")) || [], // 換貨品項用這個紀錄以選取的資料，換貨目前的品項
      tempExchangeProduct: [],

      allReturnReason: [],
      allPayTerm: [],

      otherData1: {}, // check Modal 的其他資料
      otherData2: {}, // check Modal 的其他資料

      allReturnQTY: 0, // 退貨總品項
      allExchangeQTY: 0, // 換購總品項

      allExchangePrice: 0, // 換購總金額
      allReturnPrice: 0, // 退貨總金額

      UnitPrice: [], // 取得產品單價後的所有值。
    };
  },
  methods: {
    // 新增品項，跟總店訂購的有差異，所以沒有提成共用邏輯
    sendData() {
      const vm = this;
      if (vm.currentTable === "return") {
        vm.concatProduct("tempProduct", "returnRows");
        vm.$store.commit("SUREPRODUCT", vm.returnRows);
      } else if (vm.currentTable === "exchange") {
        vm.concatProduct("tempExchangeProduct", "exchangeRows");
        localStorage.setItem(
          "confirmExchangeProduct",
          JSON.stringify(vm.exchangeRows)
        );
      }

      // 新增品項時重新計算總品項
      vm.getAllReturnQTY();
      vm.getAllExchangeQTY();

      $("#aftersalemodal").modal("hide");
    },

    // 確認換貨
    openCheck() {
      const vm = this;
      if (vm.exchangeRows.length === 0) {
        vm.$notify({
          title: "提示",
          message: "請先選擇換購品項",
          type: "warning",
          duration: 3500,
        });
        return false;
      }

      vm.checkInventory("getMerge");
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
          if (res.data.Status >= 200 && res.data.Status < 300) {
            if (res.data.ErrorMessage) {
              vm.$message.error({
                message: `<span>${res.data.ErrorMessage}<span>`,
                dangerouslyUseHTMLString: true,
                showClose: true,
                duration: 10000,
              });
              return false;
            }

            if (type === "getMerge") {
              vm.keyData += 1; // 畫面刷新完才展開
              setTimeout(() => {
                $("#commoncheckmodal").modal("show");
              }, 50);
            } else {
              vm.sendOrder();
            }
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

    sendOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/Inventory/Return/ReturnProducts`;
      let ReturnProducts = vm.returnRows.map((item) => {
        return {
          ProductId: item.ProductId,
          ProductName: item.ProductName,
          Variant: item.Specification,
          ReturnQty: Number(item.cardQuantity),
          Uom: item.UOM,
          UnitPrice: parseInt(item.UnitPrice) || 0,
          GiftSpareQty: 0,
        };
      });
      let ExchangeProducts = vm.exchangeRows.map((item) => {
        return {
          ProductId: item.ItemNo,
          ProductName: item.ItemName,
          Variant: item.Specification,
          ExchangeQty: item.cardQuantity,
          Uom: item.UOM,
          UnitPrice: parseInt(item.UnitPrice),
          WhseId: item.WhseID,
        };
      });
      let ReturnExchange = {
        NotTaxId: vm.otherData2.NotTaxId,
        InvoiceTaxId: vm.otherData2.TaxId,
        InvoiceAttached: vm.otherData2.AttachInvoice,
        InvoiceName: vm.otherData2.InvoiceName,
        InvoiceContact: vm.otherData2.InvoiceContact,
        InvoiceAddress: vm.otherData2.InvoiceAddress,
        ExchangeProducts,
      };
      let sendData = {
        SalesId: vm.saleInfo.EmpID,
        CustomerId: vm.customer.CustomerID,
        CustomerDeptId: vm.customer.DeptID,
        TaxId: vm.customer.TaxID,
        CustomerFullName: vm.customer.CustomerFullName,
        Contact: vm.customer.Contact,
        ContactTel: vm.customer.TEL_NO,
        PaymentTermsCode: vm.otherData2.PaymentTerms,
        Memo: vm.otherData1.Memo,
        ReturnReasonCode: vm.otherData1.RtnReasons,
        ReturnContact: vm.otherData1.ReceiveName,
        ReturnContactTel: vm.otherData1.ReceiveContact,
        ReturnAddress: vm.otherData1.ReceiveAddress,
        CreateUser: localStorage.getItem("uofUserGuid"),
        ReturnExchange,
        ReturnProducts,
      };
      vm.$store.commit("ISLOADING", true);
      vm.$http
        .post(url, sendData)
        .then((res) => {
          vm.$store.commit("ISLOADING", false);
          if (res.data.Status >= 200 && res.data.Status < 300) {
            vm.$notify({
              title: "成功",
              message: "退換貨單送出成功",
              type: "success",
              duration: 3500,
            });
            vm.$router.push({
              name: "OrderFinish",
              params: { text: "換貨單" },
            });
          } else {
            vm.$notify({
              title: "錯誤",
              message: res.data.ErrorMessage,
              type: "error",
              duration: 3500,
            });
          }
        })
        .catch((error) => {
          vm.$store.commit("ISLOADING", false);
          vm.$notify({
            title: "錯誤",
            message: error.response.data,
            type: "error",
            duration: 3500,
          });
        });
    },

    // 新增品項
    openNewProduct(type) {
      const vm = this;
      vm.currentTable = type;

      $("#aftersalemodal").modal("show");
    },

    // 搜尋出來的產品資訊
    searchData() {
      const vm = this;
      let after = vm.$refs.AfterSaleModal.searchBox;

      let productSeries = after.productSeries ? after.productSeries.Code : "";
      let url = "";

      vm.$store.commit("ISLOADING", true);
      if (vm.currentTable === "return") {
        url = `${process.env.VUE_APP_APIPATH}/Inventory/Return/GetReturnableProduct?customerId=${vm.customer.CustomerID}&productSeries=${productSeries}&productClass=${after.productType}&whseId=${after.WhseName}&keyword=${after.keyword}`;

        vm.$http
          .get(url)
          .then((res) => {
            if (!res.data.ErrorMessage) {
              // 取出不重複產品
              let result = [];

              res.data.Data.some((product) => {
                let hasFlag = false;
                vm.returnRows.some((confirm) => {
                  // 沒有庫別，所以只能這樣判斷
                  if (
                    product.ProductId === confirm.ProductId &&
                    product.ProductName === confirm.ProductName &&
                    product.ReturnableQuantity > 0
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
      } else if (vm.currentTable === "exchange") {
        if (!vm.customer.DeptID) {
          vm.$notify({
            title: "錯誤",
            message: "此客戶暫無部門 ID",
            type: "error",
            duration: 3500,
          });
          vm.$store.commit("ISLOADING", false);
          return false;
        }
        url = `${process.env.VUE_APP_APIPATH}/Inventory/Product/GetProducts?salesDeptId=${vm.saleInfo.DeptCode}&productSeries=${productSeries}&productClass=${after.productType}&whseId=${after.WhseName}&keyword=${after.keyword}`;
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

    // 取得退貨總數量
    getAllReturnQTY() {
      const vm = this;
      let totalQTY = 0;
      let totalPrice = 0;
      if (vm.returnRows.length > 0) {
        vm.returnRows.forEach((item) => {
          totalQTY += Number(item.cardQuantity);
          totalPrice += Number(item.cardQuantity * item.UnitPrice);
        });
      } else {
        totalQTY = 0;
      }

      vm.allReturnQTY = totalQTY;

      if (totalPrice) {
        vm.allReturnPrice = parseInt(totalPrice);
      }
    },

    // 取得換購總數量
    getAllExchangeQTY() {
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
      if (totalPrice) {
        vm.allExchangePrice = parseInt(totalPrice);
      }
    },

    // 關閉 Modal 時會順便清除資料。
    removeProduct() {
      const vm = this;
      vm.tempProduct = [];
      vm.tempExchangeProduct = [];
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
            vm.getAllReturnQTY();
            vm.getAllExchangeQTY();
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
    returnRows(n) {
      const vm = this;
      vm.getAllReturnQTY();

      if (n.length === 0) {
        vm.allReturnPrice = 0;
      }
    },
    exchangeRows(n) {
      const vm = this;
      vm.getAllExchangeQTY();

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
      return vm.allReturnPrice - vm.allExchangePrice;
    },

    ...mapGetters({
      localSureProduct: "confirmProduct",
    }),
  },
  mounted() {
    const vm = this;
    vm.$store.commit("HEADER", "換貨作業");
    vm.$store.commit("ISWELCOME", false);
    vm.$store.commit("ISGOBACK", true);

    if (JSON.parse(localStorage.getItem("sureProduct")).length === 0) {
      vm.$router.back();
    }

    vm.returnRows = vm.$route.params.confirmProduct || vm.localSureProduct; // 前頁面下單 Modal 帶入的商品

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

    // 一開始進來時的退貨總品項數量調整
    vm.allReturnQTY = vm.returnRows.length;
    vm.$store.commit("ISLOADING", false);
  },
  components: {
    ReturnTemplate,
    ExchangeTemplate,
    AfterSaleModal,
    ReturnTable,
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
