<template>
  <div
    id="selectordermodal"
    class="modal fade bd-example-modal-lg"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
    data-backdrop="static"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <section class="modal-content">
        <div class="modal-header">選擇訂單</div>

        <div class="modal-body" style="overflow: unset">
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
              <span class="title d-block"> 起始日 </span>
              <DatePicker
                v-model="searchBox.from"
                value-type="format"
                format="YYYY-MM-DD"
                class="commonSearchDate"
              >
              </DatePicker>
            </div>
            <div class="filter-field">
              <span class="title d-block"> 結束日 </span>
              <DatePicker
                v-model="searchBox.to"
                placeholder="請先選擇起始日"
                :disabled="!searchBox.from"
                value-type="format"
                format="YYYY-MM-DD"
                class="commonSearchDate"
              >
              </DatePicker>
            </div>
            <div class="filter-field">
              <span class="title"> 客戶名稱 </span>
              <input
                type="text"
                class="pl-2"
                @keyup.enter="getAllData"
                v-model="searchBox.keyword"
                placeholder="請輸入客戶代碼或名稱"
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
                  <th class="text-center">項次</th>
                  <th>訂單編號</th>
                  <th class="text-center">訂單日期</th>
                  <th class="text-center">客戶名稱</th>
                  <th class="text-center">訂單狀態</th>
                  <th class="text-center">選擇訂單</th>
                </tr>
              </thead>
              <tbody>
                <!-- 已勾選 -->
                <tr v-for="order of allOrder" :key="order.OrderNumber">
                  <td class="text-center">{{ order.Seq }}</td>
                  <td>{{ order.OrderNumber }}</td>
                  <td class="text-center">{{ order.OrderDate }}</td>
                  <td class="text-center">{{ order.HQName }}</td>
                  <td class="text-center">{{ order.OrderStatus }}</td>
                  <td class="text-center">
                    <label
                      class="y-checkbox"
                      @click="
                        order.IsThisOrder = true;
                        getCurrentOrder(order);
                      "
                    >
                      <input
                        name="IsThisOrder"
                        v-model="order.IsThisOrder"
                        type="radio"
                      />
                      <i class="fas fa-check-square text-secondary"></i>
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
            @click="allOrder = []"
          >
            取消
          </button>
          <button type="button" class="btn btn_primary" @click="selectOrder">
            確定
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
/* global $ */
import { commonFunction } from "@/mixins/commonFunction.js";
export default {
  name: "SelectOrder",
  mixins: [commonFunction],
  props: {
    customer: {
      type: Object,
      required: true,
    }, // 客戶資料
  },
  data() {
    return {
      searchBox: {
        status: "",
        from: "",
        to: "",
        keyword: "",
      },
      allOrder: [], // 搜尋出來的所有訂單
      customerData: {}, // 客戶資訊
      currentOrder: {}, // 目前選取到的訂單
    };
  },
  methods: {
    // 搜尋訂單
    searchData() {
      const vm = this;
      vm.allOrder = [
        {
          Seq: 0,
          OrderNumber: "AA4567894",
          OrderDate: "2021-10-10",
          HQName: "康宜庭",
          OrderStatus: "完成",
          IsThisOrder: false,
        },
      ];
    },
    getCurrentOrder(order) {
      const vm = this;
      vm.currentOrder = { ...order };
    },
    // 確認訂單
    selectOrder() {
      const vm = this;
      if (!vm.currentOrder?.IsThisOrder) {
        vm.$notify({
          title: "提示",
          message: "尚未選擇訂單，請先行選擇",
          type: "warning",
          duration: 3500,
        });
        return false;
      }
      vm.$emit("sendCurrentOrder", vm.currentOrder);
    },
  },
  watch: {
    customer(n) {
      const vm = this;
      vm.customerData = n;
    },
  },
  mounted() {
    const vm = this;
    vm.searchBox = {
      status: "",
      from: vm.today,
      to: vm.today,
      keyword: "",
    };
  },

  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
