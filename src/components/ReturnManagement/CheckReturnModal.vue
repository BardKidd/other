<template>
  <div
    id="commoncheckmodal"
    class="modal fade bd-example-modal-lg"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
    data-backdrop="static"
  >
    <div
      class="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered"
    >
      <!--  v-slot="{ handleSubmit }" -->
      <VO tag="section" class="modal-content">
        <div class="modal-body p-0 overflow-hidden">
          <div class="order-detail row">
            <!-- 左區塊，客戶資訊 -->
            <div class="info col-sm-12 col-md-3 col-lg-3">
              <h3>{{ customerData.CustomerFullName }}</h3>
              <div>{{ customerData.CustomerID }}</div>

              <table>
                <tr>
                  <td><i class="fas fa-barcode"></i></td>
                  <td>{{ customerData.TaxID }}</td>
                </tr>
                <tr>
                  <td><i class="fas fa-phone-volume"></i></td>
                  <td>{{ customerData.Contact }}</td>
                </tr>
                <tr>
                  <td><i class="fas fa-headset"></i></td>
                  <td>{{ customerData.TEL_NO }}</td>
                </tr>
              </table>
            </div>

            <div class="list col-md-9 col-lg-9 col-sm-12">
              <div class="p-3">
                <!-- 退貨明細 -->
                <slot name="orderTemplate"></slot>

                <!-- 其他輸入資訊，會以數字區別是因為這裡都是放輸入資訊，但表格內容可能會不一樣 -->
                <slot name="other_1"></slot>

                <!-- 換貨明細 -->
                <slot name="exchangeTemplate"></slot>

                <!-- 其他輸入資訊，會以數字區別是因為這裡都是放輸入資訊，但表格內容可能會不一樣 -->
                <slot name="other_2"></slot>
              </div>

              <div class="modal-footer">
                <button
                  type="reset"
                  class="btn btn_cancel"
                  data-dismiss="modal"
                >
                  取消
                </button>
                <!-- @click="handleSubmit(doubleCheck)" -->
                <!-- v-if="isReadOnly" -->
                <button
                  class="btn btn_primary"
                  @click="clickSave"
                  type="button"
                >
                  儲存
                </button>
              </div>
            </div>
          </div>
        </div>
      </VO>
    </div>
  </div>
</template>

<script>
import { OrderProcessing } from "@/mixins/orderProcessing.js";

/* global $ */
export default {
  name: "CommonCheckModal",
  mixins: [OrderProcessing],

  data() {
    return {
      sendData: {
        // 業務資訊
        SalesId: JSON.parse(localStorage.getItem("saleInfo")).EmpID, // 業務ID
        SalesName: JSON.parse(localStorage.getItem("saleInfo")).EmpCName, // 業務名稱
        SalesDept: JSON.parse(localStorage.getItem("saleInfo")).DeptCode, // 業務部門

        // 表頭
        IsHeadquarterInvoice: true, // 發票資訊

        CustomerName: JSON.parse(localStorage.getItem("customer"))
          .CustomerFullName, // 客戶名稱
        CustomerId: JSON.parse(localStorage.getItem("customer")).CustomerID, // 客戶代號(總店)
        TaxId: JSON.parse(localStorage.getItem("customer")).TaxID, // 統編
        PayTermCode: "", // 付款方式 代號
        NotTaxId: false, // 不開統編
        AttachInvoice: true, // 隨貨附發票

        InvoiceName: JSON.parse(localStorage.getItem("customer")).Contact, // 發票收貨人名稱
        InvoiceContact: JSON.parse(localStorage.getItem("customer")).TEL_NO, // 發票收貨人聯絡方式
        InvoiceAddress: JSON.parse(localStorage.getItem("customer"))
          .InvoiceAddress, // 發票收貨人地址
        Memo: "", // 備註

        // 分店
        Customers: JSON.parse(localStorage.getItem("pendingOrderConcat")),

        // 建立者
        CreateUser: localStorage.getItem("uofUserGuid"),
      },

      keyData: 1,
    };
  },
  methods: {
    // 點擊儲存的按鈕
    clickSave() {
      const vm = this;
      vm.$emit("clickSave");
    },
  },
  mounted() {
    const vm = this;
    vm.$store.commit("ISLOADING", true);

    vm.$store.commit("ISLOADING", false);
  },
  watch: {
    pendingOrderConcat(n) {
      const vm = this;
      vm.sendData.Customers = [...n];
    },
  },
  computed: {
    customerData() {
      return JSON.parse(localStorage.getItem("customer"));
    },
    // 畫面上的分店資料，主要使用 productData。
    branchStore() {
      return (
        this.$store.state.branchStore ||
        JSON.parse(localStorage.getItem("branchStore"))
      );
    },
    pendingOrderConcat() {
      return (
        this.$store.state.pendingOrderConcat ||
        JSON.parse(localStorage.getItem("pendingOrderConcat"))
      );
    },
    // 如果 UTypeName 前三碼為"B2B"，則不允許統編編輯；若前三碼為"B2C"，則可以允許變更。
    IsTaxIdDisabled() {
      if (
        Object.prototype.hasOwnProperty.call(
          JSON.parse(localStorage.getItem("customer")),
          "UTypeName"
        )
      ) {
        if (
          JSON.parse(localStorage.getItem("customer")).UTypeName.slice(0, 3) ===
          "B2B"
        ) {
          return true;
        }
        return true;
      } else {
        return false;
      }
    },
  },
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
