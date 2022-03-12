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
          placeholder="請選擇起始日"
        >
        </DatePicker>
      </div>
      <div class="filter-field">
        <span class="title d-block"> 結束日 </span>
        <DatePicker
          v-model="searchBox.to"
          placeholder="請選擇結束日"
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
        <span class="title"> 退貨狀態 </span>
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
        prop="ProductReturnId"
        label="項次"
      >
      </el-table-column>
      <el-table-column
        :sortable="true"
        align="center"
        prop="ReturnNumber"
        label="訂單編號"
      >
      </el-table-column>
      <el-table-column
        :sortable="true"
        align="center"
        prop="ReturnDate"
        label="訂單日期"
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
        label="訂單狀態"
      >
      </el-table-column>
      <el-table-column label="" align="center">
        <template slot-scope="scope">
          <button
            class="btn btn_primary"
            @click="openModal(scope.row, 'return')"
          >
            退貨明細
          </button>
        </template>
      </el-table-column>
      <el-table-column label="" align="center">
        <template slot-scope="scope">
          <button
            v-if="scope.row.Exchange"
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

    <ReturnModal
      :orderDetail="orderDetail"
      :returnRows="returnRows"
    ></ReturnModal>
    <ExchangeModal
      :orderDetail="orderDetail"
      :returnRows="returnRows"
      :exchangeData="exchangeData"
    >
    </ExchangeModal>
  </article>
</template>
<script>
/* global $ */
// import { getReturnReason, getPayTerm } from "@/commonAPI/api.js";
import { commonFunction } from "@/mixins/commonFunction.js";
import Pagination from "@/components/CommonComponent/Pagination.vue";
import ReturnModal from "@/views/ReturnManagement/SearchReturnOrder/ReadonlyReturnWork.vue";
import ExchangeModal from "@/views/ReturnManagement/SearchReturnOrder/ReadonlyExchangeJob.vue";

// 未串接 API 故引入 JSON 檔。
import searchData from "@/data/Customers/SearchChturnOrder.json";
import returnReason from "@/data/Other/ReturnReason.json";
import payTerm from "@/data/Other/PayTerm.json";

export default {
  name: "SearchReturnOrder",
  mixins: [commonFunction],
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      rows: [],
      allReturnReason: [],
      allPayTerm: [],
      orderDetail: {}, // 退貨明細資料
      searchBox: {
        status: "",
        from: "",
        to: "",
        keyword: "",
      },

      returnRows: [],
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

        item.ReturnDate = item.ReturnDate.split("T")[0];
      });
      // vm.searchBox.from = vm.searchBox.from ? vm.searchBox.from : "";
      // vm.searchBox.to = vm.searchBox.to ? vm.searchBox.to : "";
      // const url = `${process.env.VUE_APP_APIPATH}/Inventory/Return/GetReturns?salesId=${vm.saleInfo.EmpID}&status=${vm.searchBox.status}&from=${vm.searchBox.from}&to=${vm.searchBox.to}&keyword=${vm.searchBox.keyword}`;

      // vm.$store.commit("ISLOADING", true);
      // return vm.$http
      //   .get(url)
      //   .then((res) => {
      //     if (res.data.Status >= 200 && res.data.Status < 300) {
      //       if (res.data.Data.length === 0) {
      //         vm.$notify({
      //           title: "提示",
      //           message: "未搜尋到任何退換貨單",
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

      //         item.ReturnDate = item.ReturnDate.split("T")[0];
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
      //         message: Object.values(error.response.data.errors),
      //         type: "error",
      //         duration: 3500,
      //       });
      //     }
      //   });
    },
    openModal(item, type) {
      const vm = this;
      item.ReturnReasonCode = vm.allReturnReason.find(
        (reason) => reason.ReasonCode === item.ReturnReasonCode
      )?.ReasonDesc;
      item.PaymentTermsCode = vm.allPayTerm.find(
        (pay) => pay.NF002 === item.PaymentTermsCode
      )?.NF003;
      vm.orderDetail = { ...item };
      vm.returnRows = vm.orderDetail.ReturnProducts;
      if (type === "return") {
        $("#readonlyreturnworkmodal").modal("show");
      } else if (type === "exchange") {
        item.difference =
          item.ReturnTotalAmount - item.Exchange.ExchangeTotalAmount;
        vm.exchangeData = vm.orderDetail.Exchange;
        $("#readonlyexchangejob").modal("show");
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
    vm.$store.commit("HEADER", "退換貨單查詢");
    vm.$store.commit("ISWELCOME", true);
    vm.$store.commit("ISGOBACK", false);

    vm.allReturnReason = returnReason.Data;
    vm.allPayTerm = payTerm.Data;
    vm.searchData();

    // vm.$store.commit("ISLOADING", true);
    // vm.axios.all([getReturnReason(), getPayTerm(), vm.searchData()]).then(
    //   vm.axios.spread((allReturnReason, allPayTerm) => {
    //     vm.allReturnReason = allReturnReason.data.Data;
    //     vm.allPayTerm = allPayTerm.data.Data;

    //     vm.$store.commit("ISLOADING", false);
    //   })
    // );

    vm.searchBox = {
      status: "",
      from: vm.today,
      to: vm.today,
      keyword: "",
    };

    // 清空表單資料。
    vm.$store.commit("CLOSEALLORDERDATA");
  },
  components: {
    ReturnModal,
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
