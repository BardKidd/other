<template>
  <div class="office-block">
    <div class="store-title">
      <span>
        {{ product.ItemNo }}-{{ product.ItemName }} (庫存量:{{
          product.InvQty
        }})
      </span>
    </div>
    <span class="templateDel" @click="delProduct(product.OrderTemplateId)">
      <i class="far fa-trash-alt"></i>
    </span>
    <div class="store-list">
      <!-- 排版用 -->
      <div class="row">
        <span class="px-0 col-6 pl-5 text-muted small mr-3">
          * 請先選擇分店再輸入數量
        </span>
        <span class="pl-0 ml-0 col-2 text-center font-weight-bold">
          訂購數量
        </span>
        <span class="pl-0 col-2 text-center font-weight-bold">寄倉數量</span>
        <span class="col-2"></span>
      </div>
    </div>

    <div class="store-list" v-for="(orderItem, key) of detailRows" :key="key">
      <div class="store bg-white">
        <span class="pendingOrder" v-show="orderItem.IsPending">掛單</span>
        <span class="pl-3 text-center font-weight-bold">{{ key + 1 }}.</span>
        <VSelect
          class="col-6"
          :getOptionLabel="(opt) => opt.customName"
          placeholder="請選擇"
          valueFormat="object"
          :options="filterStore"
          v-model="orderItem.store"
          :disabled="
            orderItem.IsPending && orderItem.store && product.InvQty > 0
          "
          @input="changeStore(orderItem)"
        >
          <span slot="no-options">暫無資料</span>
        </VSelect>
        <!-- 傳入的值為: 此欄位的數量、訂購還寄倉判斷、索引值、該行的 Guid、分店資料 -->
        <!-- 數量不能用 lazy，會報錯... -->
        <input
          class="amount col-2"
          type="number"
          placeholder="請輸入數量"
          :disabled="
            !orderItem.store || (orderItem.IsPending && product.InvQty > 0)
          "
          @keyup="checkQuantity(orderItem, '訂購')"
          @change="checkQuantity(orderItem, '訂購')"
          v-model.number="orderItem.orderQuantity"
        />

        <!-- 是掛單就不能有寄倉 -->
        <input
          class="amount col-2"
          type="number"
          placeholder="請輸入數量"
          :disabled="!orderItem.store || orderItem.IsPending"
          @keyup="checkQuantity(orderItem, '寄倉')"
          @change="checkQuantity(orderItem, '寄倉')"
          v-model.number="orderItem.warehousesNum"
        />

        <div class="col-2 px-0">
          <button
            class="btn btn_primary"
            type="button"
            @click="addNewItem(detailRows.length + 1)"
          >
            新增
          </button>
          <button
            class="btn btn_danger"
            type="button"
            @click="delItem(key, orderItem)"
          >
            移除
          </button>
          <!-- v-show="key + 1 === detailRows.length" -->
        </div>
      </div>
    </div>

    <!-- ref 和 Guid 是判斷哪張選單要打開的依據 -->
    <!-- ref 不是傳入的值，而是使用 v-bind 綁定 ref 屬性。 -->
    <InventoryShortageModal
      :ref="orderGuid"
      :Guid="orderGuid"
      :Store="orderStore"
      :InvQty="product.InvQty"
      :inputType="inputType"
      :screenTotal="nowTotal"
      :currentValue="currentValue"
      :totalMinusScreen="totalMinusNow"
      @confirmQuantity="InventoryShortItem"
      @returnMax="returnMax"
    ></InventoryShortageModal>
  </div>
</template>

<script>
import InventoryShortageModal from "@/components/CommonModal/InventoryShortageModal.vue";
import { commonFunction } from "@/mixins/commonFunction.js";
import { shoppingCardProcessing } from "@/mixins/shoppingCardProcessing.js";

// 未串接 API 所以引入 JSON
import branchsData from "@/data/Other/Branchs.json";

/* global $ */

export default {
  name: "OrderTemplate",
  mixins: [commonFunction, shoppingCardProcessing],
  props: {
    orderProduct: Object,
  },
  data() {
    return {
      // 有產品後畫面預設要有一欄
      detailRows: [],
      allBranch: [],
      // 要傳入庫存不足的 Modal 的類別，知道是訂購還是寄倉欄位輸入數量。
      inputType: "訂購",
      product: {},

      // 目前是哪個訂單輸入資料，要讓庫存不足 Modal 新增的那筆保持相同 保持相同 Guid
      orderGuid: "", // 打開哪個表單專用
      orderStore: {}, // 哪間分店
      // 部分 product 資料
      exceptProduct: {},

      nowTotal: 0, // 畫面上目前的總訂購量
      totalMinusNow: 0, // 庫存-畫面總訂購量的值
      currentValue: 0, // 目前正在輸入框輸入的值，僅用於傳入庫存不足 Modal 裡判斷。
    };
  },
  methods: {
    addNewItem() {
      const vm = this;
      vm.detailRows.push({
        Guid: vm.Guid(),
        IsPending: false,
        store: null,
        orderQuantity: 1,
        warehousesNum: 0,
        IsPartialDelivery: false, // 是否分批
        PartialDeliveryQuantity: 0, // 分批出貨數量
        productData: [
          {
            IsPending: false, // 訂單確認判斷用，外面那層是購物車判斷用
            StoreGuid: null,
            ...vm.exceptProduct,
          },
        ],
      });
      vm.$emit(
        "addNewDetailRows",
        vm.detailRows,
        "Order",
        vm.product.OrderTemplateId
      );
    },

    // 刪除某間分店
    delItem(key, item) {
      const vm = this;
      vm.detailRows.some((item, index) => {
        if (key === index) {
          vm.$store.commit("DELBRANCHSTORE", item);
          return true;
        }
      });

      if (localStorage.getItem("routerFrom") === "OrderSearch") {
        // 因為帶入的資料好像不是同個記憶體，所以不會同步刪除，因此要自己順便出去把 rows 的內容刪除
        vm.$emit("removeRowsDetail", item);
      }
      vm.detailRows.splice(key, 1);

      vm.$nextTick(() => {
        // 剩最後一個時把自己也刪除
        if (vm.detailRows.length === 0) {
          setTimeout(() => {
            vm.$emit(
              "removeTemplate",
              vm.product.OrderTemplateId,
              "orderRows",
              true
            );
          }, 50);
        }
      });
    },

    // 刪除整個商品
    delProduct(key) {
      const vm = this;
      // 把 Vuex 裡的 branch 對應資料刪除
      vm.detailRows.forEach((item) => {
        vm.$store.commit("DELBRANCHSTORE", item);
      });
      vm.$nextTick(() => {
        setTimeout(() => {
          vm.$emit("removeTemplate", key, "orderRows", true);
        }, 50);
      });
    },

    // 檢查數量，假如大於庫存就顯示 Modal
    checkQuantity(orderItem, type) {
      const vm = this;

      if (type === "寄倉") {
        if (orderItem.warehousesNum > orderItem.orderQuantity) {
          vm.$notify({
            title: "提示",
            message: "寄倉數量不得大於訂購數量",
            type: "warning",
            duration: 5000,
          });
          vm.$nextTick(() => {
            orderItem.warehousesNum = orderItem.orderQuantity;
          });
          return;
        }
      }
      vm.currentValue = Number(orderItem.orderQuantity);
      // orderItem 沒有 product 資料，所以要添加
      orderItem.productData = [];
      orderItem.productData[0] = {
        IsPartialDelivery: false, // 是否分批
        PartialDeliveryQuantity: 0, // 分批出貨數量
        IsPending: orderItem.IsPending,
        orderQuantity: orderItem.orderQuantity, // 訂購數量
        warehousesNum: orderItem.warehousesNum, // 寄倉數量
        StoreGuid: orderItem.Guid, // 這間分店的 Guid
        ...vm.exceptProduct,
      };

      // 改變訂購數量時順便改變確認訂單內的數量。
      vm.$store.commit("CHANGEBRANCHQUANTITY", orderItem);

      // 庫存減畫面上所有的數量，不包含掛單的數量，以防止掛單再次出現庫存不足 Modal。
      vm.nowTotal = 0;
      vm.detailRows.forEach((row) => {
        // 不計算掛單的數量
        if (!row.IsPending) vm.nowTotal += Number(row.orderQuantity);
      });
      vm.totalMinusNow = vm.product.InvQty - vm.nowTotal;
      // 畫面總數 > 庫存量和相減數量小於 0 就跳出庫存不足
      if (vm.nowTotal > vm.product.InvQty && vm.totalMinusNow < 0) {
        vm.inputType = type;
        vm.orderGuid = orderItem.Guid;
        vm.orderStore = orderItem.store;

        vm.$nextTick(() => {
          let element = vm.$refs[orderItem.Guid].$el;
          $(element).modal("show");
        });
      }
    },

    // 變更分店時觸發，把整行傳出去
    changeStore(orderItem) {
      const vm = this;

      let branchStoreData = {}; // 之後要傳到 store 裡面給確認訂單的資料

      // 一開始進來的第一筆資料不會有 productData，所以在他選擇分店的時候添加，其他則是按新增的時候就會增加。
      orderItem.productData = [];
      orderItem.productData.push({
        IsPartialDelivery: false, // 是否分批
        PartialDeliveryQuantity: 0, // 分批出貨數量
        IsPending: orderItem.IsPending, // 訂單確認判斷用，外面那層是購物車判斷用
        orderQuantity: orderItem.orderQuantity, // 訂購數量
        warehousesNum: orderItem.warehousesNum, // 寄倉數量
        StoreGuid: orderItem.Guid, // 這間分店的 Guid
        ...vm.exceptProduct,
      });

      branchStoreData = {
        TaxId: orderItem?.store?.TaxID || "", // 假如分店分別寄送，就要帶入各家店自己的統編
        ReceiveName: orderItem?.store?.Owner || "", // 預設帶出收貨人名稱
        ReceiveContact: orderItem?.store?.TEL_NO || "", // 預設帶出收貨人電話
        ReceiveAddress: orderItem?.store?.ShippingAddress || "", // 預設帶出收貨人電話
        InvoiceName: orderItem?.store?.Contact || "", // 預設帶出發票收件人名稱
        InvoiceContact: orderItem?.store?.TEL_NO || "", // 預設帶出發票收件人電話
        InvoiceAddress: orderItem?.store?.InvoiceAddress || "", // 預設帶出發票收件人地址
        Guid: orderItem.Guid, // 這間分店的 Guid
        productData: [...orderItem.productData], // 該間分店目前商品的資訊
        store: { ...orderItem.store }, // 該間分店自己的資訊
      };

      vm.$store.commit("BRANCHSTORE", branchStoreData);
    },

    // 庫存不足新增一筆資料
    // 從庫存不足 Modal 裡面把值傳出來
    InventoryShortItem(val, type, orderOrWare) {
      const vm = this;
      this.print("庫存不足表單傳出來的值", val);
      val.productData = [];
      val.productData[0] = {
        IsPartialDelivery: type, // 是否分批
        PartialDeliveryQuantity: Number(val.PartialDeliveryQuantity), // 分批出貨數量
        IsPending: val.IsPending,
        orderQuantity: val.orderQuantity, // 訂購數量
        warehousesNum: val.warehousesNum, // 寄倉數量
        StoreGuid: val.Guid, // 這間分店的 Guid
        ...vm.exceptProduct,
      };

      // 如果是分批才會新增一筆
      if (type) {
        // 因為原本那筆關聯的第一筆可以再重新修改資料，所以把與之關聯的第二筆刪掉
        vm.detailRows.some((item, index) => {
          if (item.Guid === val.Guid && item.IsPending) {
            vm.delItem(index + 1);
            return true;
          }
        });

        // val 沒有 product 資料，所以要添加
        vm.detailRows.some((item, index) => {
          if (item.Guid === val.Guid) {
            vm.detailRows.splice(index + 1, 0, val);
            return true;
          }
        });

        // 兩個 ProductGuid 會一樣，所以取第一個
        // 目前的值 - 庫存不足 Modal 的值
        vm.detailRows.some((order) => {
          if (order.Guid === val.Guid) {
            let isOrderOrWare =
              orderOrWare === "訂購" ? "orderQuantity" : "warehousesNum";
            order[isOrderOrWare] = vm.currentValue - val[isOrderOrWare];
            order.warehousesNum = 0; // 有掛單的話寄倉為 0
            return true;
          }
        });
      }
      // 整批不產生新的一筆，只有自己會產生掛單。
      else {
        vm.detailRows.some((item, index) => {
          if (item.Guid === val.Guid && item.IsPending) {
            vm.delItem(index);
            return true;
          }
        });

        // 相同 Guid 就顯示掛單
        vm.detailRows.forEach((order) => {
          if (order.Guid === val.Guid && !order.IsPending) {
            order.IsPending = true;
            order.orderQuantity = val.orderQuantity;
            order.warehousesNum = 0; // 有掛單的話寄倉為 0
          }
        });
      }

      // 從庫存不足 Modal 取得資料後，再送出去到購物車保持一致
      // 路徑: InventoryShortageModal > OrderTemplate > AllMainStoreOrder
      vm.$emit(
        "addNewDetailRows",
        vm.detailRows,
        "Order",
        vm.product.OrderTemplateId
      );

      // 送去確認訂單的資料
      let branchStoreData = {
        TaxId: val?.store?.TaxID || "", // 假如分店分別寄送，就要帶入各家店自己的統編
        ReceiveName: val?.store?.Owner || "", // 預設帶出收貨人名稱
        ReceiveContact: val?.store?.TEL_NO || "", // 預設帶出收貨人電話
        ReceiveAddress: val?.store?.ShippingAddress || "", // 預設帶出收貨人電話
        InvoiceName: val?.store?.Contact || "", // 預設帶出發票收件人名稱
        InvoiceContact: val?.store?.TEL_NO || "", // 預設帶出發票收件人電話
        InvoiceAddress: val?.store?.InvoiceAddress || "", // 預設帶出發票收件人地址
        Guid: val.Guid,
        productData: [...val.productData],
        store: val.store,
      };
      // 分批
      if (type) {
        // 還要送到確認訂單
        vm.$store.commit("BRANCHSTORE", branchStoreData);
      }
      // 整批
      else {
        // 還要送到確認訂單
        vm.$store.commit("ENTIREBRANCHSTORE", branchStoreData);
      }

      // 改變訂購數量時順便改變確認訂單內的數量。這裡要注意的是，需要等掛單項目改變資料時才能把跟他相關的該筆傳入。
      // 找出品項和分店 Guid 相同的第一個，去改變 store 裡面的資料。
      vm.detailRows.some((item) => {
        if (item.Guid === val.Guid) {
          if (
            item.productData[0].ProductGuid === val.productData[0].ProductGuid
          ) {
            vm.$store.commit("CHANGEBRANCHQUANTITY", item);
            return true;
          }
        }
      });
    },

    // 點擊關閉庫存不足 Modal，不做任何操作，會把原先超過的值改為庫存量。
    returnMax(Guid) {
      const vm = this;
      let nowMax = vm.product.InvQty;
      vm.detailRows.forEach((order) => {
        if (order.Guid !== Guid) {
          nowMax -= order.orderQuantity;
        }
      });
      vm.detailRows.some((order) => {
        if (order.Guid === Guid) {
          order.orderQuantity = nowMax;
          return true;
        }
      });
    },

    // 取得分店
    getBranch() {
      const vm = this;

      vm.allBranch = branchsData.Data;
      vm.allBranch.forEach((branch) => {
        branch.customName = `${branch.CustomerShtName} / ${branch.CustomerID}`;
      });

      // 未串接 API 的關係所以從訂單查詢過來找到自己分店資訊那段完全無用了。

      // const url = `${
      //   process.env.VUE_APP_APIPATH
      // }/User/Customer/GetCustomers?headquartersId=${
      //   JSON.parse(localStorage.getItem("customer")).HQCode
      // }&salesCode=${vm.saleInfo.ERP_SalesCode}`;
      // vm.$http
      //   .get(url)
      //   .then((res) => {
      //     if (res.data.Status >= 200 && res.data.Status < 300) {
      //       vm.allBranch = res.data.Data;
      //       vm.allBranch.forEach((branch) => {
      //         branch.customName = `${branch.CustomerShtName} / ${branch.CustomerID}`;
      //       });

      //       vm.$nextTick(() => {
      //         // 如果從訂單查詢過來才要找到自己的分店資訊。
      //         if (localStorage.getItem("routerFrom") === "OrderSearch") {
      //           vm.getSelfBranch(vm.detailRows, vm.allBranch);
      //           vm.detailRows.forEach((item) => {
      //             // 取道分店資料後把他傳到 Vuex 裡面，變成確認訂單的資料。
      //             // 複製訂單模式刪除資料後會更新畫面，所以會重跑一次，已經跑過一次的話屬性會不太一樣。
      //             // 有該屬性才去執行。
      //             if (item.productData[0]?.OrderStoreProductId) {
      //               vm.changeStore(item);
      //             }
      //           });
      //         }
      //       });
      //     }
      //     vm.$store.commit("ISLOADING", false);
      //   })
      //   .catch((error) => {
      //     if (error.response.statue === 400) {
      //       vm.$notify({
      //         title: "錯誤",
      //         message: error.response.data,
      //         type: "error",
      //         duration: 3500,
      //       });
      //     }
      //     vm.$store.commit("ISLOADING", false);
      //   });
    },
  },
  watch: {
    // 當輸入值後立刻傳給訂購總量
    allQuantity() {
      const vm = this;
      vm.$emit("exportAllQuantity");
    },
    product(n) {
      const vm = this;
      vm.exceptProduct = {
        ClassCode: n.ClassCode,
        ClassName: n.ClassName,
        ProductGuid: n.ProductGuid,
        InvQty: n.InvQty,
        InvTotal: n.InvTotal,
        IsOrder: n.IsOrder,
        IsPR: n.IsPR,
        ItemName: n.ItemName,
        ItemNo: n.ItemNo,
        Specification: n.Specification,
        UOM: n.UOM,
        UnitPrice: n.UnitPrice,
        WhseID: n.WhseID,
      };
    },
  },
  computed: {
    // 取得各 item 訂購數量 + 寄倉數量的值。這裡只是偵測變動，計算全部訂購品項是在外層
    allQuantity() {
      const vm = this;
      return vm.detailRows.map((item) => {
        return Number(item.orderQuantity);
      });
    },
    // 取得所有已經被選取的分店的 ID
    selectedStore() {
      const vm = this;
      return vm.detailRows.map((row) => {
        if (row.store) {
          return row.store.CustomerID;
        }
      });
    },
    // 過濾掉已被選取的分店
    filterStore() {
      const vm = this;
      if (vm.selectedStore.length === 0 || !vm.selectedStore) {
        vm.filterStore = vm.allBranch;
      }
      return vm.allBranch.filter((e) => {
        return vm.selectedStore.indexOf(e.CustomerID) === -1;
      });
    },

    // 業務資訊
    saleInfo() {
      return JSON.parse(localStorage.getItem("saleInfo"));
    },
  },
  mounted() {
    const vm = this;
    vm.product = vm.orderProduct;
    vm.detailRows = [...vm.product.DetailRows];
    vm.getBranch();
  },
  components: {
    InventoryShortageModal,
  },
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>

<style lang="scss" scoped>
// 這裡用紫色
/deep/ .v-select {
  background-color: #f2f4fd;
}
</style>
