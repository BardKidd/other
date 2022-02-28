<template>
  <div
    id="warehousesalemodal"
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

            <div class="number">{{ customerData.OrderNumber }}</div>
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
            <div class="filter-field">
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
            <table class="common-datatable datatable stripe order-column w-100">
              <thead>
                <tr>
                  <th>產品圖示</th>
                  <th>品號</th>
                  <th>品名/規格</th>
                  <th class="text-center">單位</th>
                  <th class="text-center">訂購數量</th>
                  <th class="text-center">寄倉剩餘數量</th>
                  <th class="text-center">選擇產品</th>
                </tr>
              </thead>
              <tbody class="line">
                <!-- 已勾選 -->
                <tr
                  v-for="product of confirmProduct"
                  :key="product.ProductGuid"
                >
                  <td>
                    <img style="width: 70px" :src="product.img" />
                  </td>
                  <td>{{ product.ItemNo }}</td>
                  <td>{{ product.ItemName }}/{{ product.Specification }}</td>
                  <td class="text-center">{{ product.UOM }}</td>
                  <td class="text-center">{{ product.InvQty }}</td>
                  <td class="text-center">{{ product.UnitPrice }}</td>
                  <td class="text-center">
                    <label class="y-checkbox">
                      <input
                        disabled
                        v-model="product.IsConfirm"
                        type="checkbox"
                      />
                      <i class="fas fa-check-square text-secondary"></i>
                    </label>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <!-- 搜尋結果 -->
                <tr v-for="product of tempProduct" :key="product.ProductGuid">
                  <td>
                    <img style="width: 70px" :src="product.img" />
                  </td>
                  <td>{{ product.ItemNo }}</td>
                  <td>{{ product.ItemName }}/{{ product.Specification }}</td>
                  <td class="text-center">{{ product.UOM }}</td>
                  <td class="text-center">{{ product.InvQty }}</td>
                  <td class="text-center">{{ product.UnitPrice }}</td>
                  <td class="text-center">
                    <label class="y-checkbox">
                      <input
                        name="IsConfirm"
                        v-model="product.IsConfirm"
                        type="checkbox"
                      />
                      <i class="fas fa-check-square"></i>
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="reset"
            class="btn btn_cancel"
            data-dismiss="modal"
            @click="tempProduct = []"
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
  name: "WareHouseSaleModal",
  mixins: [commonFunction, commonModal],
  props: {
    // 客戶資料，沒有 required，因為要等按下退貨才會傳入，所以拿掉以防報錯。
    customer: {
      type: Object,
      required: true,
    },
    currentOrder: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // img,
      searchBox: {
        productSeries: null,
        productType: null,
        WhseName: null, // 庫別
        keyword: "",
      },
      tempProduct: [], // 搜尋出來的產品
      customerData: {}, // 顧客資料

      confirmProduct: [], // 搜尋結果打勾的存放處

      keyData: 0,
    };
  },
  methods: {
    searchData() {
      const vm = this;

      vm.tempProduct = [
        {
          OrderNo: "AA4894DF46",
          ItemNo: "DH01081306          ",
          ItemName: "全產品手冊",
          Specification: "A4",
          UOM: "本",
          SeriesCode: "AA",
          SeriesName: "HIQ_Health",
          ClassCode: "AA_001",
          ClassName: "褐抑定",
          UnitPrice: 0,
          InvTotal: 0,
          WhseID: "AQ001     ",
          InvQty: 100,
          Group: "",
          IsConfirm: false,
          OrderDate: "2020-11-18",
          ProductGuid: "14b3e155-4b15-45fd-887c-708877e7453c",
        },
        {
          OrderNo: "FSZ486465486",
          ItemNo: "11020123Z           ",
          ItemName: "褐抑定高純度PLUS配方-30包",
          Specification: "2.2g/包/30包/盒",
          UOM: "盒",
          SeriesCode: "AA",
          SeriesName: "HIQ_Health",
          ClassCode: "AA_002",
          ClassName: "褐抑定PLUS",
          UnitPrice: 0,
          InvTotal: 2552,
          WhseID: "AQ006     ",
          InvQty: 80,
          Group: "",
          OrderDate: "2020-11-18",
          IsConfirm: false,
          ProductGuid: "9dd85ca9-3594-46d9-8fef-001131a8dd7a",
        },
      ];
    },

    // 將商品變動結果傳出。
    saveOrder() {
      const vm = this;

      // tempCheck 存放搜尋結果所有被打勾的項目
      let tempCheck = [];
      vm.tempProduct.forEach((product) => {
        product.orderQuantity = 1;
        product.ERPUnitPrice = 0;
        if (product.IsConfirm) {
          tempCheck.push(product);
        }
      });

      // 把搜尋結果有打勾的商品和原本有購買的商品合併。
      if (!vm.confirmProduct) {
        vm.confirmProduct = []; // 一開始沒取到值會為 null
      }
      let allCheck = JSON.parse(
        JSON.stringify(vm.confirmProduct.concat(tempCheck))
      );

      // 將本次變更的結果重新賦予。
      vm.confirmProduct = allCheck;
      // 把剛剛異動的結果傳出去。
      if (tempCheck.length > 0) {
        this.$emit("sendData", vm.confirmProduct);
        // 傳到 store。
        vm.$store.commit("SUREPRODUCT", vm.confirmProduct);

        vm.$nextTick(() => {
          // 清除搜尋結果
          vm.tempProduct = [];
          vm.keyData += 1;
        });
      } else {
        vm.$notify({
          title: "提示",
          message: "請至少選擇一種產品",
          type: "warning",
          duration: 3500,
        });
      }
    },
  },
  created() {
    const vm = this;
    vm.customerData = JSON.parse(localStorage.getItem("customer"));
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
      if (n) {
        vm.customerData = { ...n };
        localStorage.setItem("customer", JSON.stringify(n));
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
