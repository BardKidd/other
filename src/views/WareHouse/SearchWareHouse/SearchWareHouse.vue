<template>
  <article>
    <div class="filter-block">
      <div class="filter-field">
        <span class="title d-block"> 起始日 </span>
        <DatePicker
          v-model="searchBox.from"
          value-type="format"
          format="YYYY-MM-DD"
          class="commonSearchDate"
          placeholder="請選擇起始日期"
        >
        </DatePicker>
      </div>
      <div class="filter-field">
        <span class="title d-block"> 結束日 </span>
        <DatePicker
          v-model="searchBox.to"
          placeholder="請選擇結束日期"
          value-type="format"
          format="YYYY-MM-DD"
          class="commonSearchDate"
        >
        </DatePicker>
      </div>
      <div class="filter-field">
        <span class="title"> 客戶名稱</span>
        <input
          type="text"
          class="pl-2"
          @keyup.enter="searchData"
          placeholder="請輸入客戶代碼或名稱"
          v-model="searchBox.keyword"
        />
      </div>
      <div class="filter-field">
        <span class="title"> 單據狀態 </span>
        <select v-model="searchBox.status">
          <option value="">全部</option>
          <option value="Cancel">作廢</option>
          <option value="Reject">否決</option>
          <option value="Signin">簽核中</option>
          <!-- <option value="Draft">草稿</option> -->
        </select>
      </div>
      <div class="filter-btn-wrap">
        <button type="button" class="btn btn_primary" @click="searchData">
          查詢
        </button>
      </div>
    </div>

    <el-table
      :data="rows.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="width: 100%"
    >
      <el-table-column
        :sortable="true"
        align="center"
        prop="WarehousePickupNo"
        label="訂單編號"
      >
      </el-table-column>
      <el-table-column
        :sortable="true"
        align="center"
        prop="CreateTime"
        label="取貨日期"
      >
      </el-table-column>
      <el-table-column
        :sortable="true"
        align="center"
        prop="CustomerFullName"
        label="客戶名稱"
      >
      </el-table-column>
      <el-table-column
        :sortable="true"
        align="center"
        prop="Status"
        label="取貨狀態"
      >
      </el-table-column>
      <el-table-column label="" align="center">
        <template slot-scope="scope">
          <button
            class="btn btn_primary"
            @click="openModal(scope.row, 'pickup')"
          >
            取貨明細
          </button>
        </template>
      </el-table-column>
      <el-table-column label="" align="center">
        <template slot-scope="scope">
          <button
            v-if="scope.row.WarehouseExchange.ExchangeReasonCode"
            class="btn btn_primary"
            @click="openModal(scope.row, 'exchange')"
          >
            換貨明細
          </button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      @size="(val) => (pageSize = val)"
      @page="(val) => (currentPage = val)"
      v-if="rows.length > 0"
      :total="rows.length"
    ></Pagination>

    <div class="order-note">
      <span class="note">!</span>
      如需作廢訂單，請至業務訂購單作廢
    </div>

    <PickupModal
      :orderDetail="orderDetail"
      :pickupRows="pickupRows"
    ></PickupModal>
    <ExchangeModal
      :orderDetail="orderDetail"
      :pickupRows="pickupRows"
      :exchangeData="exchangeData"
    ></ExchangeModal>
  </article>
</template>
<script>
/* global $ */
// import { getReturnReason, getPayTerm } from "@/commonAPI/api.js";
import { commonFunction } from "@/mixins/commonFunction.js";
import Pagination from "@/components/CommonComponent/Pagination.vue";
import PickupModal from "./ReadonlyPickup.vue";
import ExchangeModal from "./ReadonlyExchangeJob.vue";

// 未串接 API 故引入 JSON 檔。
import searchData from "@/data/Customers/SearchWareHouse.json";
import returnReason from "@/data/Other/ReturnReason.json";
import payTerm from "@/data/Other/PayTerm.json";

export default {
  name: "SearchWareHouse",
  mixins: [commonFunction],
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      rows: [],

      allReturnReason: [],
      allPayTerm: [],
      orderDetail: {}, // 取換貨明細資料
      searchBox: {
        status: "",
        from: "",
        to: "",
        keyword: "",
      },

      pickupRows: [],
      exchangeData: {},
    };
  },
  methods: {
    searchData() {
      const vm = this;
      vm.rows = searchData.Data;
      vm.rows.forEach((item) => {
        switch (item.Status) {
          case "SignIn":
            item.Status = "簽核中";
            break;
          case "Reject":
            item.Status = "否決";
            break;
          case "Cancel":
            item.Status = "作廢";
            break;
          case "Draft":
            item.Status = "草稿";
            break;
        }
        item.CreateTime = item.CreateTime.split("T")[0];
      });

      // vm.searchBox.from = vm.searchBox.from ? vm.searchBox.from : "";
      // vm.searchBox.to = vm.searchBox.to ? vm.searchBox.to : "";
      // const url = `${process.env.VUE_APP_APIPATH}/Inventory/Warehouse/GetWarehousePickup?status=${vm.searchBox.status}&salesId=${vm.saleInfo.EmpID}&from=${vm.searchBox.from}&to=${vm.searchBox.to}&keyword=${vm.searchBox.keyword}`;
      // vm.$store.commit("ISLOADING", true);
      // vm.$http
      //   .get(url)
      //   .then((res) => {
      //     if (!res.data.ErrorMessage) {
      //       if (res.data.Data.length === 0) {
      //         vm.$notify({
      //           title: "提示",
      //           message: "未搜尋到任何寄貨取換貨單",
      //           type: "warning",
      //           duration: 3500,
      //         });
      //       }
      //       vm.rows = res.data.Data;
      //       vm.rows.forEach((item) => {
      //         switch (item.Status) {
      //           case "SignIn":
      //             item.Status = "簽核中";
      //             break;
      //           case "Reject":
      //             item.Status = "否決";
      //             break;
      //           case "Cancel":
      //             item.Status = "作廢";
      //             break;
      //           case "Draft":
      //             item.Status = "草稿";
      //             break;
      //         }
      //         item.CreateTime = item.CreateTime.split("T")[0];
      //       });
      //     } else {
      //       vm.$notify({
      //         title: "錯誤",
      //         message: res.data.ErrorMessage,
      //         type: "error",
      //         duration: 3500,
      //       });
      //     }
      //     vm.$store.commit("ISLOADING", false);
      //   })
      //   .catch((error) => {
      //     vm.$store.commit("ISLOADING", false);
      //     if (error.response.status === 400) {
      //       vm.$notify({
      //         title: "錯誤",
      //         message: error.response.data,
      //         type: "error",
      //         duration: 3500,
      //       });
      //     }
      //   });
    },
    openModal(item, type) {
      const vm = this;

      vm.orderDetail = { ...item };
      vm.pickupRows = vm.orderDetail.WarehousePickupProducts;
      if (type === "pickup") {
        $("#readonlypickupmodal").modal("show");
      } else if (type === "exchange") {
        vm.orderDetail.WarehouseExchange.ExchangeReasonCode = vm.allReturnReason.find(
          (reason) =>
            reason.ReasonCode ===
            vm.orderDetail.WarehouseExchange.ExchangeReasonCode
        )?.ReasonDesc;
        vm.orderDetail.WarehouseExchange.PaymentTermsCode = vm.allPayTerm.find(
          (pay) =>
            pay.NF002 === vm.orderDetail.WarehouseExchange.PaymentTermsCode
        )?.NF003;
        vm.orderDetail.difference =
          item.PickupTotalAmount - item.WarehouseExchange.ExchangeTotalAmount;
        vm.exchangeData = vm.orderDetail.WarehouseExchange;
        $("#readonlywarehouseexchangejob").modal("show");
      }
    },
  },
  computed: {
    saleInfo() {
      return JSON.parse(localStorage.getItem("saleInfo"));
    },
  },
  mounted() {
    const vm = this;
    vm.$store.commit("HEADER", "寄倉取換貨單查詢");
    vm.$store.commit("ISWELCOME", true);
    vm.$store.commit("ISGOBACK", false);

    vm.searchBox = {
      status: "",
      from: vm.today,
      to: vm.today,
      keyword: "",
    };

    vm.allReturnReason = returnReason.data.Data;
    vm.allPayTerm = payTerm.data.Data;

    // vm.$store.commit("ISLOADING", true);

    // vm.axios.all([getReturnReason(), getPayTerm(), vm.searchData()]).then(
    //   vm.axios.spread((allReturnReason, allPayTerm) => {
    //     vm.allReturnReason = allReturnReason.data.Data;
    //     vm.allPayTerm = allPayTerm.data.Data;

    //     vm.$store.commit("ISLOADING", false);
    //   })
    // );

    // 清空表單資料。
    vm.$store.commit("CLOSEALLORDERDATA");
  },
  components: {
    PickupModal,
    ExchangeModal,
    Pagination,
  },
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
