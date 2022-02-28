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
      <section v-if="orderRows.length > 0" class="mb-3">
        <OrderTemplate
          :orderProduct="orderRows"
          @exportAllQuantity="getAllOrderTemplateQuantity"
          @removeTemplate="removeProduct"
          :key="keyData"
        ></OrderTemplate>
      </section>
      <section v-else class="pl-2 mb-2">暫無訂購品項...</section>

      <div class="table-title mt-2">
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

      <section v-if="prRows.length > 0" class="mb-3">
        <PRTemplate
          :prProduct="prRows"
          @exportAllQuantity="getAllPRTemplateQuantity"
          @removeTemplate="removeProduct"
          :key="keyData * 2"
        ></PRTemplate>
      </section>
      <section v-else class="pl-2 mb-2">暫無公關品項...</section>

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
        :IsMainStore="false"
        :DeliveryDate="allDeliveryDate"
        :DeliveryTime="allDeliveryTime"
        :Charge="allCharge"
        :Freight="allFreight"
      ></CheckOrder>
    </article>
  </div>
</template>

<script>
/* global $ */
import OrderTemplate from "@/views/OrderManagement/AllSingleStoreOrder/OrderTemplate_Single.vue";
import PRTemplate from "@/views/OrderManagement/AllSingleStoreOrder/PRTemplate_Single.vue";
import Order from "@/components/CommonModal/PlaceOrderModal.vue";
import CheckOrder from "@/components/OrderManagement/CheckOrderModal.vue";

// 包含 splitRow、filterTemplate 函式
import { shoppingCardProcessing } from "@/mixins/shoppingCardProcessing.js";

// 包含 concatRow、checkInventory 函式
import { OrderProcessing } from "@/mixins/orderProcessing.js";

import {
  getDeliveryTime,
  getCharge,
  getFreight,
  getDeliveryDate,
} from "@/commonAPI/api.js";
export default {
  name: "AllSingleStoreOrder",
  mixins: [shoppingCardProcessing, OrderProcessing],
  data() {
    return {
      rows: [], // 前一頁帶過來的資料
      tempRows: [], // 暫時的 rows，在這頁新增的品項會在這裡。
      orderRows: [], // 訂購目前的品項
      prRows: [], // 公關目前的品項

      totalOrderQuantity: 0, // 訂購總量
      totalPRQuantity: 0, // 公關總量

      allDeliveryTime: [], // 送貨時段
      allCharge: {}, // 手續費
      allFreight: {}, // 運費
      allDeliveryDate: {}, // 送貨保留日

      keyData: 1, // 偵測刪除後畫面是否有變動
    };
  },
  methods: {
    // 新增品項，跟總店訂購的有差異，所以沒有提成共用邏輯
    sendData(tempCheck) {
      const vm = this;
      this.print("tmepCheck", tempCheck);

      // 因為跟總店訂購共用邏輯，總店訂購的資料放在 DetailRows 裡面，但單店訂購不需要，所以需要調整屬性。
      tempCheck[0] = {
        ...tempCheck[0],
        IsPending: tempCheck[0].InvQty ? false : true,
        IsPartialDelivery: false,
        orderQuantity: 1,
        warehousesNum: 0,
      };
      delete tempCheck[0].DetailRows;

      // 如果有相同的資料，就把他拆成兩筆。
      tempCheck.some((item) => {
        if (item.IsOrder && item.IsPR) {
          vm.splitRow(tempCheck);
          return true;
        }
      });

      // 有值才執行，否則會在跑一次分類。
      if (tempCheck.length > 0) {
        vm.rows = vm.rows.concat(tempCheck);
        vm.$nextTick(() => {
          vm.filterTemplate(tempCheck);
        });
      }

      $("#placeordermodal").modal("hide");
    },

    // 刪除產品
    removeProduct(isCommit) {
      const vm = this;

      // 把刪除後的資料一併回傳到下單 Modal

      vm.$nextTick(() => {
        if (isCommit) {
          let set = new Set();
          // 使用 ItemNo 而不使用 ProductGuid 判斷是因為假如公關跟訂購品項的 Guid 不會一樣，所以會造成下單 Modal 的顯示看起來不太一樣。
          let result = vm.rows.filter((item) => {
            return !set.has(item.ItemNo) ? set.add(item.ItemNo) : false;
          });
          let filterRows = [...result];
          vm.$store.commit("SUREPRODUCT", filterRows);
        }
      });

      this.keyData += 1;
    },

    // 確認訂單
    openCheck() {
      const vm = this;

      if (vm.rows.length === 0) {
        vm.$notify({
          title: "提示",
          message: "請先選擇商品",
          type: "warning",
          duration: 3500,
        });
        return false;
      }

      let url = `${process.env.VUE_APP_APIPATH}/Inventory/Product/CheckProductInventory`;
      let tempRows = JSON.parse(JSON.stringify(vm.rows));
      this.print("tempRows", tempRows);
      let sendData = [
        {
          ReceiveAddress: vm.customerData.ShippingAddress, // 預設帶出收貨人地址
          ReceiveContact: vm.customerData.TEL_NO, // 預設帶出收貨人電話
          ReceiveName: vm.customerData.Owner, // 預設帶出收貨人名稱
          Guid: tempRows[0].ProductGuid,
          productData: tempRows,
          store: vm.customerData,
        },
      ];
      vm.$store.commit("SENDBRANCHSTORE", sendData);

      vm.checkInventory();
      this.print("跑完確認訂單邏輯?", "這裡");

      vm.$nextTick(() => {
        vm.$http
          .post(url, vm.filterContented)
          .then(() => {
            vm.$store.commit("ISLOADING", false);
            vm.$store.commit("PENDINGORDERCONCAT", vm.branchData);
            $("#check").modal("show");
          })
          .catch((error) => {
            vm.$store.commit("ISLOADING", false);
            if (error.response.status === 400) {
              vm.$message.error({
                message: `<span>${error.response.data}<span>`,
                dangerouslyUseHTMLString: true,
                showClose: true,
                duration: 10000,
              });
            }
          });
      });
    },

    // 全部訂購品項加總
    getAllOrderTemplateQuantity() {
      const vm = this;
      vm.totalOrderQuantity = 0;
      vm.orderRows.forEach((item) => {
        vm.totalOrderQuantity += Number(item.orderQuantity);
      });
    },

    // 全部公關品項加總
    getAllPRTemplateQuantity() {
      const vm = this;
      vm.totalPRQuantity = 0;
      vm.prRows.forEach((item) => {
        vm.totalPRQuantity += Number(item.orderQuantity);
      });
    },
  },
  mounted() {
    const vm = this;
    vm.$store.commit("HEADER", "單店訂單作業");
    vm.$store.commit("ISWELCOME", false);
    vm.$store.commit("ISGOBACK", true);

    vm.rows =
      vm.$route.params.confirmProduct ||
      JSON.parse(localStorage.getItem("sureProduct"));

    if (localStorage.getItem("routerFrom") === "SingleStoreOrder") {
      vm.splitRow(vm.rows);

      vm.filterTemplate(vm.rows);

      vm.$nextTick(() => {
        vm.rows.forEach((item) => {
          // 原本的掛單狀態、是否分批、訂購、寄倉數量會在 DetailRows 裡面，但這裡只有單一分店，所以直接放在最外層即可。
          (item.IsPending = item.InvQty ? false : true), // 是否為掛單，假如產品總量為 0，一進就會是掛單狀態;
            (item.IsPartialDelivery = false);
          item.orderQuantity = 1;
          item.warehousesNum = 0;

          // 因為分類邏輯跟總店訂購用同一個，但單店訂購不需要 DetailRows，所以移除掉。
          delete item.DetailRows;
          vm.keyData += 1;
        });
      });
    } else if (localStorage.getItem("routerFrom") === "OrderSearch") {
      vm.OrderSearchFilter(vm.rows);
    }

    vm.axios
      .all([
        getDeliveryTime(),
        getCharge(vm.saleInfo.DeptCode),
        getFreight(vm.saleInfo.DeptCode),
        getDeliveryDate(vm.customerData.DeptID),
      ])
      .then(
        vm.axios.spread(
          (allDeliveryTime, allCharge, allFreight, allDeliveryDate) => {
            vm.allDeliveryTime = allDeliveryTime.data.Data;
            vm.allCharge = allCharge.data.Data;
            vm.allFreight = allFreight.data.Data;
            vm.allDeliveryDate = allDeliveryDate.data.Data;
            vm.$store.commit("ISLOADING", false);
          }
        )
      );
  },
  watch: {
    orderRows(n) {
      const vm = this;
      vm.rows = vm.prRows.concat(n);
    },
    prRows(n) {
      const vm = this;
      vm.rows = vm.orderRows.concat(n);
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
