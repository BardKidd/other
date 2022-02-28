<template>
  <div
    id="placeordermodal"
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

        <div class="modal-body">
          <div class="customer-info">
            <div class="name" v-if="customerData.isHeadquarters">
              {{ customerData.CustomerFullName }}
            </div>
            <div class="name" v-else>
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
              <!-- valueFormat="object" -->
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
              <!-- valueFormat="object" -->
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
            <div>
              <table
                class="common-datatable datatable stripe order-column w-100"
              >
                <thead>
                  <tr>
                    <th>產品圖示</th>
                    <th>品號</th>
                    <th>品名/規格</th>
                    <th>單位</th>
                    <th>庫存量</th>
                    <th>標準售價(含稅)</th>
                    <th>訂購</th>
                    <th>公關</th>
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
                    <td>{{ product.UOM }}</td>
                    <td>{{ product.InvQty }}</td>
                    <td>{{ product.UnitPrice }}</td>
                    <td>
                      <label class="y-checkbox">
                        <input
                          disabled
                          v-model="product.IsOrder"
                          type="checkbox"
                        />
                        <i class="fas fa-check-square text-secondary"></i>
                      </label>
                    </td>
                    <td>
                      <label class="y-checkbox">
                        <input
                          disabled
                          v-model="product.IsPR"
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
                    <td>{{ product.UOM }}</td>
                    <td>{{ product.InvQty }}</td>
                    <td>{{ product.UnitPrice }}</td>
                    <td>
                      <label class="y-checkbox">
                        <input
                          name="IsOrder"
                          v-model="product.IsOrder"
                          type="checkbox"
                        />
                        <i class="fas fa-check-square"></i>
                      </label>
                    </td>
                    <td>
                      <label class="y-checkbox">
                        <input
                          name="IsPR"
                          v-model="product.IsPR"
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
          <!-- @click="goAllOrder" -->
          <button type="button" class="btn btn_primary" @click="saveOrder">
            儲存
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
import { mapGetters } from "vuex";

// import qs from "qs";

// 未串接 API 所以直接引入 JSON。
import SelectProductsData from "@/data/Product/SelectProducts.json";

export default {
  name: "PlaceOrderModal",
  mixins: [commonFunction, commonModal],
  props: {
    // outSideAllProduct: Array,
    customer: Object, // 客戶資料
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
      tempProduct: [], // 搜尋出來的產品，有打勾得之後會丟到 confirmProduct
      customerData: {}, // 顧客資料
      confirmProduct: [], // 從 Vuex 裡面取的已被打勾的資料

      keyData: 0,
    };
  },
  methods: {
    searchData() {
      const vm = this;
      if (!vm.customerData.DeptID) {
        vm.$notify({
          title: "錯誤",
          message: "此客戶暫無部門 ID",
          type: "error",
          duration: 3500,
        });
        return false;
      }

      // 取出不重複產品
      let result = [];

      SelectProductsData.Data.some((product) => {
        let hasFlag = false;
        vm.confirmProduct.some((confirm) => {
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
      });

      vm.tempProduct = result; // 搜尋的結果暫存區
      if (vm.tempProduct.length === 0) {
        vm.$notify({
          title: "提示",
          message: "未搜尋到任何產品",
          type: "warning",
          duration: 3500,
        });
      }

      // 加上是否為訂購和公關品項的判斷
      vm.tempProduct.forEach((item) => {
        item.IsOrder = false;
        item.IsPR = false;
        item.ProductGuid = vm.Guid();
      });

      // let url = `${process.env.VUE_APP_APIPATH}/Inventory/Product/GetProducts`;

      // // 因為系列有分類的內容，所以只能保持 object
      // let productSeries = vm.searchBox.productSeries
      //   ? vm.searchBox.productSeries.Code
      //   : null;

      // let sendData = {
      //   salesDeptId: vm.saleInfo.DeptCode,
      //   productSeries: productSeries,
      //   productClass: vm.searchBox.productType,
      //   whseId: vm.searchBox.WhseName,
      //   keyword: vm.searchBox.keyword,
      // };

      // vm.$store.commit("ISLOADING", true);
      // vm.$http
      //   .get(url, {
      //     params: sendData,
      //     paramsSerializer: (sendData) => {
      //       return qs.stringify(sendData);
      //     },
      //   })
      //   .then((res) => {
      //     // 取出不重複產品
      //     let result = [];

      //     res.data.Data.some((product) => {
      //       let hasFlag = false;
      //       vm.confirmProduct.some((confirm) => {
      //         if (
      //           product.ItemNo === confirm.ItemNo &&
      //           product.WhseID === confirm.WhseID
      //         ) {
      //           hasFlag = true; // 相同的話打開 flag，不讓他 push。
      //           return true;
      //         }
      //       });
      //       if (!hasFlag) {
      //         result.push(product);
      //       }
      //     });

      //     vm.tempProduct = result; // 搜尋的結果暫存區
      //     if (vm.tempProduct.length === 0) {
      //       vm.$notify({
      //         title: "提示",
      //         message: "未搜尋到任何產品",
      //         type: "warning",
      //         duration: 3500,
      //       });
      //     }

      //     // 加上是否為訂購和公關品項的判斷
      //     vm.tempProduct.forEach((item) => {
      //       item.IsOrder = false;
      //       item.IsPR = false;
      //       item.ProductGuid = vm.Guid();
      //     });
      //     vm.$store.commit("ISLOADING", false);
      //   })
      //   .catch(() => {
      //     vm.$store.commit("ISLOADING", false);
      //   });
    },

    // 將商品變動結果傳出。
    saveOrder() {
      const vm = this;

      // tempCheck 存放搜尋結果所有被打勾的項目
      let tempCheck = [];
      vm.tempProduct.forEach((product) => {
        if (product.IsOrder || product.IsPR) {
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
      // // this.print("allCheck", allCheck);

      // 把剛剛異動的結果傳出去。
      if (tempCheck.length > 0 || vm.confirmProduct.length > 0) {
        this.$emit("sendData", tempCheck);

        // 把已經取消選購的商品去除
        // let filterConfirm = vm.confirmProduct.filter((confirm) => {
        //   // this.print("confirm 變化??", confirm);
        //   if (confirm.IsOrder || confirm.IsPR) {
        //     return confirm;
        //   }
        // });
        // vm.confirmProduct = filterConfirm;
        vm.$nextTick(() => {
          // 傳到 store。
          vm.$store.commit("SUREPRODUCT", vm.confirmProduct);

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
    vm.customerData =
      JSON.parse(localStorage.getItem("customer")) ||
      vm.$store.state.customerData;
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

        if (!vm.saleInfo.DeptCode) {
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
    sureProduct(n) {
      const vm = this;
      vm.confirmProduct = n;
    },
  },
  computed: {
    ...mapGetters({
      localSureProduct: "confirmProduct",
      saleInfo: "saleInfo",
    }),
    sureProduct() {
      return this.$store.state.sureProduct;
    },
  },
  mounted() {
    const vm = this;

    if (vm?.saleInfo?.DeptCode) {
      // 進入購物車後取得庫別
      vm.getAllWhses(vm.saleInfo.DeptCode);
    }
    vm.confirmProduct =
      vm.$route.params.confirmProduct || vm.localSureProduct || [];

    // 如果是從訂單搜尋進來的需要把資料轉換成下單 Modal 的格式。
    if (
      vm.$route.name === "AllMainStoreOrder" &&
      localStorage.getItem("routerFrom") === "OrderSearch"
    ) {
      if (!vm.$route.params.confirmProduct) {
        vm.$router.back();
      }
      vm.$route.params.confirmProduct.forEach((product) => {
        let tempProduct = JSON.parse(JSON.stringify(product));
        delete tempProduct.DetailRows;
        delete tempProduct.Free;
        delete tempProduct.totalQuantityInfo;
        if (tempProduct.OrderTemplateId) {
          delete tempProduct.OrderTemplateId;
        }
        if (tempProduct.PRTemplateId) {
          delete tempProduct.PRTemplateId;
        }

        if (vm.confirmProduct.length === 0) {
          vm.confirmProduct.push(tempProduct);
        } else {
          // 從第 2 筆開始
          // 如果有同庫別同品號的產品，就去改變性質

          let hasSame = false;
          vm.confirmProduct.forEach((confirm, index) => {
            // 一般都會直接進來
            if (
              confirm.ItemNo !== tempProduct.ItemNo ||
              confirm.WhseID !== tempProduct.WhseID
            ) {
              // 已經是最後一筆，且都沒有相同的才丟進去。
              if (index === vm.confirmProduct.length - 1 && !hasSame) {
                vm.confirmProduct.push(tempProduct);
              }
            }
            // 不過假如有一個是全重的 hasSame 就為 true
            if (
              confirm.ItemNo === tempProduct.ItemNo &&
              confirm.WhseID === tempProduct.WhseID
            ) {
              hasSame = true;
              if (tempProduct.IsOrder) {
                confirm.IsOrder = true;
              }
              if (tempProduct.IsPR) {
                confirm.IsPR = true;
              }
            }
          });
        }
      });
      vm.$nextTick(() => {
        // 最後再傳到 Vuex，會順便傳到 localStorage
        vm.$store.commit("SUREPRODUCT", vm.confirmProduct);
      });
    }

    if (
      vm.$route.name === "AllSingleStoreOrder" &&
      localStorage.getItem("routerFrom") === "OrderSearch"
    ) {
      if (!vm.$route.params.confirmProduct) {
        vm.$router.back();
      }
      vm.$route.params.confirmProduct.forEach((product) => {
        let tempProduct = JSON.parse(JSON.stringify(product));
        if (vm.confirmProduct.length === 0) {
          vm.confirmProduct.push(tempProduct);
        } else {
          let hasSame = false;
          // 以下跟總店邏輯一樣，只有差在上面
          vm.confirmProduct.forEach((confirm, index) => {
            // 不過假如有一個是全重的 hasSame 就為 true
            if (
              confirm.ItemNo === tempProduct.ItemNo &&
              confirm.WhseID === tempProduct.WhseID
            ) {
              hasSame = true;
              if (tempProduct.IsOrder) {
                confirm.IsOrder = true;
              }
              if (tempProduct.IsPR) {
                confirm.IsPR = true;
              }
            }

            // 一般都會直接進來
            if (
              confirm.ItemNo !== tempProduct.ItemNo ||
              confirm.WhseID !== tempProduct.WhseID
            ) {
              // 已經是最後一筆，且都沒有相同的才丟進去。
              if (index === vm.confirmProduct.length - 1 && !hasSame) {
                vm.confirmProduct.push(tempProduct);
              }
            }
          });
        }
      });
    }
  },
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
