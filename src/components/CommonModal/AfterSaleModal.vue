<template>
  <div
    id="aftersalemodal"
    class="modal fade bd-example-modal-lg"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
    data-backdrop="static"
    :key="keyData"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <section class="modal-content">
        <div class="modal-header">產品選擇</div>

        <div class="modal-body" style="overflow: unset">
          <div class="customer-info">
            <div class="name">
              {{ customerData.CustomerShtName }}
            </div>

            <div class="number">{{ customerData.CustomerID }}</div>
          </div>
          <div class="filter-block">
            <div class="filter-field">
              <span class="title"> 商品系列 </span>
              <VSelect
                :getOptionLabel="(opt) => opt.Name"
                placeholder="請選擇"
                valueFormat="object"
                :options="allProductCategory"
                v-model="searchBox.productSeries"
              >
                <span slot="no-options">暫無資料</span>
              </VSelect>
            </div>
            <div class="filter-field">
              <span class="title"> 商品分類 </span>
              <VSelect
                :getOptionLabel="(opt) => opt.Name"
                placeholder="請選擇"
                :options="allCategoryChild"
                :reduce="(opt) => opt.Code"
                v-model="searchBox.productType"
              >
                <span slot="no-options">暫無資料</span>
              </VSelect>
            </div>

            <!-- 寄倉不需要庫別，如果沒有庫別為 false 就顯示 -->
            <div class="filter-field" v-if="!NoWarehouse">
              <span class="title"> 庫別 </span>
              <VSelect
                :getOptionLabel="(opt) => opt.WhseName"
                placeholder="請選擇"
                :options="allWhses"
                :reduce="(opt) => opt.WhseID"
                v-model="searchBox.WhseName"
              >
                <span slot="no-options">暫無資料</span>
              </VSelect>
            </div>
            <div class="filter-field">
              <span class="title"> 關鍵字 </span>
              <input
                v-model.trim="searchBox.keyword"
                type="text"
                class="pl-2"
                @keyup.enter="searchData"
                placeholder="請輸入產品關鍵字"
              />
            </div>

            <div class="filter-btn-wrap">
              <button type="button" class="btn btn_primary" @click="searchData">
                查詢
              </button>
            </div>
          </div>

          <div class="table-wrap">
            <slot name="table"></slot>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="reset"
            class="btn btn_cancel"
            data-dismiss="modal"
            @click="closeModal"
          >
            取消
          </button>
          <button type="button" class="btn btn_primary" @click="saveOrder">
            確認
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
/* global $ */
import { commonFunction } from "@/mixins/commonFunction.js";
import { commonModal } from "@/mixins/commonModal.js";

export default {
  name: "AfterSaleModal",
  mixins: [commonFunction, commonModal],
  props: {
    customer: {
      type: Object,
      required: true,
    },
    NoWarehouse: {
      type: Boolean,
    },
  },
  data() {
    return {
      // img,
      searchBox: {
        productSeries: "",
        productType: "",
        WhseName: "", // 庫別
        keyword: "",
      },
      customerData: {
        CustomerShtName: "",
        CustomerID: "",
      }, // 顧客資料

      keyData: 0,

      tempProduct: [], // 之後應該不會用到
    };
  },
  methods: {
    searchData() {
      const vm = this;
      vm.$emit("searchData");
    },

    // 將商品變動結果傳出。
    saveOrder() {
      const vm = this;

      // 這裡傳出去會直接進 Vuex
      vm.$emit("sendData");
    },

    // 清除元件內的商品
    closeModal() {
      const vm = this;
      vm.tempProduct = [];
      vm.$emit("removeProduct");
    },
  },
  watch: {
    // 分類會跟系列作聯動，所以系列有變更就去更新分類的內容。
    "searchBox.productSeries"(n) {
      const vm = this;
      if (n) {
        // 送出去會被篩選成字串，所以要取出整包才能顯示在畫面上。
        if (typeof n !== "object") {
          n = vm.allProductCategory.find((item) => {
            return n === item.Code;
          });
          vm.searchBox.productSeries = n;
        }
        vm.searchBox.productType = null;
        vm.allCategoryChild = [...n.ProductCategories];
        vm.allCategoryChild.forEach((item) => {
          item.Code = item.Code.trim();
        });
      }
    },
    customer(n) {
      const vm = this;
      vm.customerData = { ...n };
      if (n && !vm.NoWarehouse) {
        localStorage.setItem("customer", JSON.stringify(n));
        this.print("??", vm.saleInfo?.DeptCode);
        if (!vm.saleInfo?.DeptCode) {
          vm.$notify({
            title: "提示",
            message: "此客戶暫無部門 ID，無法取得庫別",
            type: "warning",
            duration: 3500,
          });
          return false;
        }
        // 變更客戶時重新取得庫別
        vm.getAllWhses(vm.saleInfo.DeptCode);
      }
    },
  },
  mounted() {
    const vm = this;
    if (localStorage.getItem("customer")) {
      vm.customerData = JSON.parse(localStorage.getItem("customer"));
    }

    if (vm?.saleInfo?.DeptCode) {
      // 進入購物車後取得庫別
      vm.getAllWhses(vm.saleInfo.DeptCode);
    }
  },

  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
