<template>
  <div>
    <article>
      <!-- 訂購品項 -->
      <div class="table-title">
        <span>訂購品項</span>
        <button
          type="button"
          class="btn btn_primary"
          data-toggle="modal"
          data-target="#placeordermodal"
        >
          新增品項
        </button>
      </div>

      <!-- 總共有幾項訂購品項 -->
      <section v-for="order of orderRows" :key="order.parentGuid">
        <!-- 傳入單一訂購品項 -->
        <OrderTemplate
          :key="keyData"
          @exportAllQuantity="getAllOrderTemplateQuantity"
          @removeTemplate="removeTemplate"
          @addNewDetailRows="addNewDetailRows"
          @removeRowsDetail="removeRowsDetail"
          :orderProduct="order"
        ></OrderTemplate>
      </section>
      <section v-if="orderRows.length === 0" class="pl-2 mb-2">
        暫無訂購品項...
      </section>

      <!-- 公關品項 -->
      <div class="table-title">
        <span>公關品項</span>
        <button
          type="button"
          class="btn btn_primary"
          data-toggle="modal"
          data-target="#placeordermodal"
        >
          新增品項
        </button>
      </div>
      <!-- 總共有幾項訂購品項 -->
      <section v-for="pr of prRows" :key="pr.parentGuid">
        <!-- 傳入單一訂購品項 -->
        <PRTemplate
          :key="keyData"
          @removeTemplate="removeTemplate"
          @exportAllQuantity="getAllPRTemplateQuantity"
          @addNewDetailRows="addNewDetailRows"
          @removeRowsDetail="removeRowsDetail"
          :PRProduct="pr"
        ></PRTemplate>
      </section>
      <section v-if="prRows.length === 0" class="pl-2 mb-2">
        暫無公關品項...
      </section>

      <div class="result-wrap">
        <div class="item">
          訂購總量 <span>{{ totalOrderQuantity }}</span>
        </div>
        <div class="item">
          公關總量 <span>{{ totalPRQuantity }}</span>
        </div>
        <div class="amount" style="background-color: #fff">
          總品項 <span>{{ totalOrderQuantity + totalPRQuantity }}</span>
        </div>
        <button type="button" class="btn btn_info" @click="openCheck">
          確認訂單
        </button>
      </div>
      <Order @sendData="sendData"></Order>

      <!-- check -->
      <CheckOrder
        :IsMainStore="true"
        :DeliveryDate="allDeliveryDate"
        :DeliveryTime="allDeliveryTime"
        :Charge="allCharge"
        :Freight="allFreight"
        :key="keyData"
      ></CheckOrder>
    </article>
  </div>
</template>
<script>
/*global $*/
import OrderTemplate from "@/views/OrderManagement/AllMainStoreOrder/OrderTemplate.vue";
import PRTemplate from "@/views/OrderManagement/AllMainStoreOrder/PRTemplate.vue";
import Order from "@/components/CommonModal/PlaceOrderModal.vue";
import CheckOrder from "@/components/OrderManagement/CheckOrderModal.vue";

// 包含 Guid 函式
import { commonFunction } from "@/mixins/commonFunction.js";

// 包含 concatRow、checkInventory 函式
import { OrderProcessing } from "@/mixins/orderProcessing.js";

// 包含 splitRow、filterTemplate 函式
import { shoppingCardProcessing } from "@/mixins/shoppingCardProcessing.js";
// import {
//   getDeliveryTime,
//   getCharge,
//   getFreight,
//   getDeliveryDate,
// } from "@/commonAPI/api.js";
import { mapGetters } from "vuex";

// 未串接 API 故直接引入 JSON。
import deliveryTime from "@/data/Other/DeliveryTime.json";
import deliveryRetentionDays from "@/data/Other/DeliveryRetentionDays.json";

export default {
  name: "AllMainStoreOrder",
  mixins: [commonFunction, OrderProcessing, shoppingCardProcessing],
  data() {
    return {
      rows: [], // 前一頁帶過來的資料
      tempRows: [], // 暫時的 rows，在這頁新增的品項會在這裡。
      orderRows: [], // 訂購目前的品項
      prRows: [], // 公關目前的品項

      totalOrderQuantity: 0, // 訂購總量
      totalPRQuantity: 0, // 公關總量

      allDeliveryTime: [], // 送貨時段
      allCharge: {
        Sales_Fees: { Costs: 30 },
      }, // 手續費
      allFreight: {
        Sales_Fees: { Costs: 30 },
      }, // 運費
      allDeliveryDate: {}, // 送貨保留日

      keyData: 0, // 偵測刪除後畫面是否有變動
    };
  },
  methods: {
    openModal(item) {
      const vm = this;
      vm.item = { ...item };
    },

    // 打開確認訂單，檢查庫存量
    openCheck() {
      const vm = this;

      let rowsNotStore = false;
      let tempNotStore = false;
      // 新增品項的資料在 tempRows 裡面，所以全部清空購物車後再重新加入需要以 tempRows 判斷
      if (vm.rows.length === 0 && vm.tempRows.length === 0) {
        vm.$notify({
          title: "提示",
          message: "購物車尚無商品，請先行選擇",
          type: "warning",
          duration: 3500,
        });
        return false;
      }
      vm.rows.forEach((item) => {
        item.DetailRows.some((row) => {
          if (!row.store) {
            vm.$notify({
              title: "提示",
              message: "尚有未選擇分店的商品，請先行選擇",
              type: "warning",
              duration: 3500,
            });
            rowsNotStore = true;
            return true; // 直接跳出去
          }
        });
        if (rowsNotStore) {
          return true; // 直接跳出去
        }
      });
      if (rowsNotStore) {
        return false; // 結束 function
      }

      vm.tempRows.forEach((item) => {
        item.DetailRows.some((row) => {
          if (!row.store) {
            vm.$notify({
              title: "提示",
              message: "尚有未選擇分店的商品，請先行選擇",
              type: "warning",
              duration: 3500,
            });
            tempNotStore = true;
            return true; // 直接跳出去
          }
        });
        if (tempNotStore) {
          return true; // 直接跳出去
        }
      });
      if (tempNotStore) {
        return false; // 結束 function
      }

      // vm.$store.commit("PENDINGORDERCONCAT", vm.branchData);
      $("#check").modal("show");

      // let url = `${process.env.VUE_APP_APIPATH}/Inventory/Product/CheckProductInventory`;
      // vm.checkInventory();
      // vm.$nextTick(() => {
      //   vm.$http
      //     .post(url, vm.filterContented)
      //     .then((res) => {
      //       vm.$store.commit("ISLOADING", false);
      //       if (res.data.Status >= 200 && res.data.Status < 300) {
      //         vm.$store.commit("PENDINGORDERCONCAT", vm.branchData);
      //         $("#check").modal("show");
      //       } else {
      //         vm.$message.error({
      //           message: `<span>${res.data.ErrorMessage}<span>`,
      //           dangerouslyUseHTMLString: true,
      //           showClose: true,
      //           duration: 10000,
      //         });
      //       }
      //     })
      //     .catch((error) => {
      //       vm.$store.commit("ISLOADING", false);
      //       if (error.response.status === 400) {
      //         vm.$message.error({
      //           message: `<span>${error.response.data}<span>`,
      //           dangerouslyUseHTMLString: true,
      //           showClose: true,
      //           duration: 10000,
      //         });
      //       }
      //     });
      // });
    },

    sendData(tempCheck) {
      const vm = this;
      this.print("tmepCheck", tempCheck);

      // 如果有相同的資料，就把他拆成兩筆。
      tempCheck.some((item) => {
        if (item.IsOrder && item.IsPR) {
          vm.splitRow(tempCheck);
          return true;
        }
      });

      // 有值才執行，否則會在跑一次分類。
      if (tempCheck.length > 0) {
        vm.tempRows = JSON.parse(JSON.stringify(tempCheck));
      }

      $("#placeordermodal").modal("hide");
    },

    // 該商品的 templateId、prRows 還是 orderRows、是否將結果傳到 store。
    // 直接在畫面上刪除需要 commit 到 store，在新增品項 Modal 裡面取消勾選後會篩選結果並傳到 store，所以不需在這裡執行。
    removeTemplate(key, type, isCommit) {
      // 參考資料在 README.md 的總店訂購作業刪除參考資料
      const vm = this;

      vm[type].splice(key, 1);

      vm[type].forEach((item, index) => {
        if (type === "orderRows") {
          item.OrderTemplateId = index; // 重新賦予樣板索引值，否則會停留在舊有的索引值導致後續刪除出錯。
        }
        if (type === "prRows") {
          item.PRTemplateId = index; // 重新賦予樣板索引值，否則會停留在舊有的索引值導致後續刪除出錯。
        }
      });
      vm.rows = vm.orderRows.concat(vm.prRows); // 把刪除完的結果合併在一起。

      if (isCommit) {
        vm.$store.commit("SUREPRODUCT", vm.rows);
      }

      this.keyData += 1;
    },

    // 訂單查詢的資料好像不吃同個記憶體，所以手動刪除 rows 內的資料
    removeRowsDetail(item) {
      const vm = this;
      vm.rows.forEach((row) => {
        row.DetailRows.some((detail, index) => {
          // 這裡用 Guid 是因為每個產品的 Guid 都不一樣，就算是掛單，原生的 Guid 也不會一樣。
          if (detail.Guid === item.Guid) {
            row.DetailRows.splice(index, 1);
            return true;
          }
        });
      });
    },

    // 接收子元件的 DetailRows，讓數量跟子元件一樣
    // 用 type 判斷是訂購品項還是公關品項，否則傳出來的 templateId 無法識別。
    addNewDetailRows(detail, type, templateId) {
      this.print("addNewDetailRows", detail);
      const vm = this;
      if (type === "Order") {
        vm.orderRows.forEach((item) => {
          if (item.OrderTemplateId === templateId) {
            item.DetailRows = detail;
          }
        });
      }
      if (type === "PR") {
        vm.prRows.forEach((item) => {
          if (item.PRTemplateId === templateId) {
            item.DetailRows = detail;
          }
        });
      }
    },

    // 全部訂購品項加總
    getAllOrderTemplateQuantity() {
      const vm = this;
      let allInfo = [];
      vm.totalOrderQuantity = 0;
      vm.orderRows.forEach((item) => {
        item.DetailRows.forEach((detail) => {
          item.totalQuantityInfo = {
            totalQuantity: Number(detail.orderQuantity), // 該品項的全部訂購數量
            templateId: item.OrderTemplateId, // 該品項的 Id(就是元件 ID)，這個目前沒用到
          };
          allInfo.push(item.totalQuantityInfo);
        });
      });
      allInfo.forEach((info) => {
        vm.totalOrderQuantity += info.totalQuantity;
      });
    },

    // 全部公關品項加總
    getAllPRTemplateQuantity() {
      const vm = this;
      let allInfo = [];
      // 每次計算錢都歸零，以免重複累加
      vm.totalPRQuantity = 0;
      vm.prRows.forEach((item) => {
        item.DetailRows.forEach((detail) => {
          item.totalQuantityInfo = {
            totalQuantity: Number(detail.orderQuantity), // 該品項的全部訂購數量
            templateId: item.PRTemplateId, // 該品項的 Id(就是元件 ID)，這個目前沒用到
          };
          allInfo.push(item.totalQuantityInfo);
        });
      });
      allInfo.forEach((info) => {
        vm.totalPRQuantity += info.totalQuantity;
      });
    },
  },
  mounted() {
    const vm = this;
    vm.$store.commit("HEADER", "總店訂單作業");
    vm.$store.commit("ISWELCOME", false);
    vm.$store.commit("ISGOBACK", true);
    // vm.$store.commit("ISLOADING", true);

    vm.rows =
      vm.$route.params.confirmProduct ||
      JSON.parse(localStorage.getItem("sureProduct"));
    // 從總店訂購過來才需要執行，因為訂單搜尋已經先做好才傳進來的。
    if (localStorage.getItem("routerFrom") === "MainStoreOrder") {
      vm.splitRow(vm.rows);

      vm.filterTemplate(vm.rows);
    } else if (localStorage.getItem("routerFrom") === "OrderSearch") {
      vm.OrderSearchFilter(vm.rows);
    }

    vm.allDeliveryTime = deliveryTime.Data;
    vm.allDeliveryDate = deliveryRetentionDays.Data;

    // vm.axios
    //   .all([
    //     getDeliveryTime(),
    //     getCharge(vm.saleInfo.DeptCode),
    //     getFreight(vm.saleInfo.DeptCode),
    //     getDeliveryDate(vm.customerData.DeptID),
    //   ])
    //   .then(
    //     vm.axios.spread(
    //       (allDeliveryTime, allCharge, allFreight, allDeliveryDate) => {
    //         vm.allDeliveryTime = allDeliveryTime.data.Data;
    //         vm.allCharge = allCharge.data.Data;
    //         vm.allFreight = allFreight.data.Data;
    //         vm.allDeliveryDate = allDeliveryDate.data.Data;
    //         vm.$store.commit("ISLOADING", false);
    //       }
    //     )
    //   );
  },
  watch: {
    tempRows(n) {
      const vm = this;
      vm.filterTemplate(n);
    },
    // 如果全部被清空就把總量改為 0
    prRows(n) {
      const vm = this;
      if (n.length === 0) {
        vm.totalPRQuantity = 0;
      }
    },
    orderRows(n) {
      const vm = this;
      if (n.length === 0) {
        vm.totalOrderQuantity = 0;
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
    OrderTemplate,
    PRTemplate,
    Order,
    CheckOrder,
  },
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>

<style lang="scss" scoped>
.store {
  border: none;
  border-radius: 5px;
  padding: 1% 1%;
  font-size: 1rem;
  background-color: #f2f4fd;
  flex: 1;
}
.amount {
  border: none;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 0.9em;
  background-color: #f2f4fd;
  flex: 1;
  margin-left: 5px;
  text-align: right;
}
</style>
