<template>
  <div>
    <!-- SearchBar -->
    <CitySearch ref="searchBox" @searchCustomer="searchCustomer">
      <div class="filter-field" slot="another">
        <span class="title"> 狀態 </span>
        <select v-model="status">
          <option value="">未選擇</option>
          <option :value="false">在線</option>
          <option :value="true">停用</option>
        </select>
      </div>
    </CitySearch>
    <div class="table-title">
      <span></span>
      <button
        class="btn btn_primary"
        data-toggle="modal"
        data-target="#customerform"
        @click="openModal(true)"
      >
        新增客戶
      </button>
    </div>

    <template>
      <el-table
        :data="rows.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="客戶代號：">
                <span>{{ props.row.CustomerID }}</span>
              </el-form-item>
              <el-form-item label="客戶簡稱：">
                <span>{{ props.row.CustomerShtName }}</span>
              </el-form-item>
              <el-form-item label="客戶全名：">
                <span>{{ props.row.CustomerFullName }}</span>
              </el-form-item>
              <el-form-item label="公司別：">
                <span>{{ props.row.CustomerFullName }}</span>
              </el-form-item>
              <el-form-item label="負責人：">
                <span>{{ props.row.Owner }}</span>
              </el-form-item>
              <el-form-item label="連絡人：">
                <span>{{ props.row.Contact }}</span>
              </el-form-item>
              <el-form-item label="電話號碼：">
                <span>{{ props.row.TEL_NO }}</span>
              </el-form-item>
              <el-form-item label="電子郵件：">
                <span>{{ props.row.Email }}</span>
              </el-form-item>
              <el-form-item label="統一編號：">
                <span>{{ props.row.TaxID }}</span>
              </el-form-item>
              <el-form-item label="部門代號：">
                <span>{{ props.row.DeptID }}</span>
              </el-form-item>
              <el-form-item label="部門名稱：">
                <span>{{ props.row.DeptName }}</span>
              </el-form-item>
              <el-form-item label="業務員：">
                <span>{{ props.row.SalespersonName }}</span>
              </el-form-item>
              <el-form-item label="通路別：">
                <span>{{ props.row.Channel }}</span>
              </el-form-item>
              <el-form-item label="型態別：">
                <span>{{ props.row.TypeCode }}</span>
              </el-form-item>
              <el-form-item label="登記地址郵遞區號">
                <span>{{ props.row.ZipCode }}</span>
              </el-form-item>
              <el-form-item label="登記地址：">
                <span>{{ props.row.Address }}</span>
              </el-form-item>
              <el-form-item label="發票地址郵遞區號：">
                <span>{{ props.row.InvoiceZipCode }}</span>
              </el-form-item>
              <el-form-item label="發票地址：">
                <span>{{ props.row.InvoiceAddress }}</span>
              </el-form-item>
              <el-form-item label="送貨地址郵遞區號：">
                <span>{{ props.row.ShippingZipCode }}</span>
              </el-form-item>
              <el-form-item label="送貨地址：">
                <span>{{ props.row.ShippingAddress }}</span>
              </el-form-item>
              <el-form-item label="結帳日期：">
                <span>{{ props.row.ClosingDate }}</span>
              </el-form-item>
              <el-form-item label="銀行代碼：">
                <span>{{ props.row.BankCode }}</span>
              </el-form-item>
              <el-form-item label="銀行帳號：">
                <span>{{ props.row.BankAccount }}</span>
              </el-form-item>
              <el-form-item label="付款條件代號：">
                <span>{{ props.row.PaymentTermsCode }}</span>
              </el-form-item>
              <el-form-item label="付款條件描述：">
                <span>{{ props.row.PaymentTerms }}</span>
              </el-form-item>
              <el-form-item label="連鎖號：">
                <span>{{ props.row.HQCode }}</span>
              </el-form-item>
              <el-form-item label="分店數：">
                <span>{{ props.row.BranchCount }}</span>
              </el-form-item>
              <el-form-item label="總公司請款：">
                <span>{{ props.row.HQPayment }}</span>
              </el-form-item>
              <el-form-item label="加值中心代碼：">
                <span>{{ props.row.AddCenterCode }}</span>
              </el-form-item>
              <el-form-item label="客戶類型：">
                <span>{{ props.row.CType }}</span>
              </el-form-item>
              <el-form-item label="客戶描述：">
                <span>{{ props.row.CustomerDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column sortable label="客戶代號" prop="CustomerID">
        </el-table-column>
        <el-table-column sortable label="客戶簡稱" prop="CustomerShtName">
        </el-table-column>
        <el-table-column sortable label="負責人" prop="Owner">
        </el-table-column>
        <el-table-column sortable label="聯絡人" prop="Contact">
        </el-table-column>
        <el-table-column sortable label="電話號碼" prop="TEL_NO">
        </el-table-column>
        <el-table-column sortable label="統一編號" prop="TaxID">
        </el-table-column>
        <el-table-column sortable label="店家類型" prop="StoreTypeCN">
        </el-table-column>
        <el-table-column sortable label="狀態" prop="TypeCodeCN">
        </el-table-column>

        <el-table-column>
          <template slot-scope="scope">
            <button
              type="button"
              class="btn btn_primary"
              @click="openModal(false, scope.row)"
            >
              異動
            </button>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <button
              v-if="scope.row.TypeCode !== 'ZZ'"
              type="button"
              class="btn btn_danger"
              @click="openModal(false, scope.row, 'off')"
            >
              停用
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
    </template>

    <CustomerForm
      @searchCustomer="searchCustomer"
      :isOff="isOff"
      :isNew="isNew"
      :customer="customer"
      :allCustomerTypes="allCustomerTypes"
      :allPostalCodes="allPostalCodes"
      :allDepts="allDepts"
      :allSales="allSales"
      :allBanks="allBanks"
      :allWays="allWays"
      :allTypes="allTypes"
      :allPayTerm="allPayTerm"
      :allHeadquarter="allHeadquarter"
    ></CustomerForm>
  </div>
</template>

<script>
/* global $ */
import "@/assets/Scss/BackEndLayout/_pagination.scss";
import CustomerForm from "@/views/CustomerData/CustomerForm.vue";
import Pagination from "@/components/CommonComponent/Pagination.vue";
import CitySearch from "@/components/CommonComponent/CitySearch.vue";
import { mapState, mapGetters } from "vuex";
// import { getAllCity, getPayTerm } from "@/commonAPI/api.js";

//未串接 API，故引入 JSON 檔。
import payTermData from "@/data/Other/PayTerm.json";
import customerTypeData from "@/data/Other/CustomerType.json";
import deptsData from "@/data/Other/Depts.json";
import salesData from "@/data/Other/Sales.json";
import bankData from "@/data/Other/Banks.json";
import CMSMR from "@/data/Other/CMSMR.json";
import CMSMR1 from "@/data/Other/CMSMR1.json";
import CMSMR2 from "@/data/Other/CMSMR2.json";
import cityData from "@/data/Other/CitySearch.json";

import customersData from "@/data/Other/Customers.json";

export default {
  name: "CustomerData",
  data() {
    return {
      currentPage: 1,
      pageSize: 20,

      allCustomerTypes: [], // 客戶類型(分類)
      allPostalCodes: [], // 郵遞區號
      allPayTerm: [],
      allDepts: [], // 部門資訊
      allSales: [], // 業務資訊
      allBanks: [], // 銀行列表
      allTradingPartnersType: [], // 交易對象類別
      allHeadquarter: [], // 總店號
      allWays: [], // 通路別
      allTypes: [], // 型態別
      status: "", // 額外的搜尋欄屬性
      customer: {}, // 被選取的客戶資訊。
      isNew: true, // 是否是新增。
      isOff: false, // 是否要停用
    };
  },
  methods: {
    searchCustomer(/*searchBox*/) {
      const vm = this;
      // 更新資料後除新撈資料時是 undefined。
      // if (searchBox?.city === undefined) {
      //   searchBox = {
      //     city: vm.$refs.searchBox.searchBox.city,
      //     district: vm.$refs.searchBox.searchBox.district,
      //     keyword: vm.$refs.searchBox.searchBox.keyword,
      //   };
      // }
      // searchBox = {
      //   ...searchBox,
      //   purchaseType: "",
      //   IsDeactivated: vm.status,
      // };

      const searchBox = {
        customersData,
        purchaseType: "",
        IsDeactivated: vm.status,
      };

      vm.$store.dispatch("getCustomer", searchBox);
    },
    openModal(isNew, row, type) {
      const vm = this;
      vm.isNew = isNew;
      vm.isOff = type ? true : false;

      if (!isNew) {
        vm.customer = { ...row };
      }

      $("#customerform").modal("show");
    },
    getCustomerTypes() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/User/Customer/GetCustomerTypes`;
      return vm.$http.get(url).catch((error) => {
        vm.$store.commit("ISLOADING", false);
        if (error.response.status === 400) {
          vm.$notify({
            title: "錯誤",
            message: "取得客戶類型(分類)錯誤",
            type: "error",
            duration: 3500,
          });
        }
      });
    },
    getDepts() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/User/Customer/GetDepts`;
      return vm.$http.get(url).catch((error) => {
        vm.$store.commit("ISLOADING", false);
        if (error.response.status === 400) {
          vm.$notify({
            title: "錯誤",
            message: "取得部門資訊錯誤",
            type: "error",
            duration: 3500,
          });
        }
      });
    },
    getSales() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/User/Sales/GetSales`;
      return vm.$http.get(url).catch((error) => {
        vm.$store.commit("ISLOADING", false);
        if (error.response.status === 400) {
          vm.$notify({
            title: "錯誤",
            message: "取得業務資訊錯誤",
            type: "error",
            duration: 3500,
          });
        }
      });
    },
    getBanks() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/User/Customer/GetBanks`;
      return vm.$http.get(url).catch((error) => {
        vm.$store.commit("ISLOADING", false);
        if (error.response.status === 400) {
          vm.$notify({
            title: "錯誤",
            message: "取得銀行列表錯誤",
            type: "error",
            duration: 3500,
          });
        }
      });
    },
    getHeadquarter() {
      const vm = this;
      let url = `${process.env.VUE_APP_APIPATH}/User/Customer/GetCustomers?purchaseType=Headquarter&IsDeactivated=false`;

      return vm.$http.get(url).catch(() => {
        vm.$store.commit("ISLOADING", false);
      });
    },
    getTradingPartnersType() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/User/Customer/GetCMSMR`;
      return vm.$http.get(url).catch((error) => {
        vm.$store.commit("ISLOADING", false);
        if (error.response.status === 400) {
          vm.$notify({
            title: "錯誤",
            message: "取得交易對象類別錯誤",
            type: "error",
            duration: 3500,
          });
        }
      });
    },
    // 需要先取得交易對象類別，才能將類別代碼傳入
    getTradingPartnersInfo(type) {
      const vm = this;
      switch (type) {
        case "1":
          vm.allWays = CMSMR1.Data;
          vm.allWays = vm.allWays.map((type) => {
            return {
              ...type,
              CodeID: type.CodeID.trim(),
            };
          });
          break;
        case "2":
          vm.allTypes = CMSMR2.Data;
          vm.allTypes = vm.allTypes.map((type) => {
            return {
              ...type,
              CodeID: type.CodeID.trim(),
            };
          });
          break;
      }

      // const url = `${process.env.VUE_APP_APIPATH}/User/Customer/GetCMSMR/${type}`;
      // vm.$http
      //   .get(url)
      //   .then((res) => {
      //     switch (type) {
      //       case "1":
      //         vm.allWays = res.data.Data;
      //         vm.allWays = vm.allWays.map((type) => {
      //           return {
      //             ...type,
      //             CodeID: type.CodeID.trim(),
      //           };
      //         });
      //         break;
      //       case "2":
      //         vm.allTypes = res.data.Data;
      //         vm.allTypes = vm.allTypes.map((type) => {
      //           return {
      //             ...type,
      //             CodeID: type.CodeID.trim(),
      //           };
      //         });
      //         break;
      //     }
      //   })
      //   .catch((error) => {
      //     vm.$store.commit("ISLOADING", false);
      //     if (error.response.status === 400) {
      //       vm.$notify({
      //         title: "錯誤",
      //         message: "取得交易對象類別錯誤",
      //         type: "error",
      //         duration: 3500,
      //       });
      //     }
      //   });
    },
  },
  mounted() {
    const vm = this;
    vm.$store.commit("HEADER", "客戶資訊");
    vm.$store.commit("ISWELCOME", true);
    vm.$store.commit("ISGOBACK", false);

    /*---------------------------------------------------------------- */

    let cityName = Object.keys(cityData.Data.CityDistricts);
    let districts = Object.values(cityData.Data.CityDistricts);

    for (let i = 0; i < 99; i++) {
      if (!cityName[i]) break;

      // 每個鄉鎮加入縣市的屬性
      districts[i].forEach((dis) => {
        dis.CityName = cityName[i];
      });
    }
    let mergeCity = districts;

    vm.allPostalCodes = Object.values(mergeCity).flat(Infinity);

    vm.allPayTerm = payTermData.Data;
    vm.allCustomerTypes = customerTypeData.Data;
    vm.allDepts = deptsData.Data;
    vm.allDepts = vm.allDepts.map((dept) => {
      return {
        ...dept,
        DeptID: dept.DeptID.trim(),
      };
    });

    vm.allSales = salesData.Data;
    vm.allBanks = bankData.Data;
    vm.allBanks = vm.allBanks.map((bank) => {
      return {
        ...bank,
        customerLabel: `${bank.BankName}(${bank.BankID.trim()})`,
        BankID: bank.BankID.trim(),
      };
    });

    vm.allTradingPartnersType = CMSMR.Data;

    let wayType = vm.allTradingPartnersType.find((item) => {
      return item.TypeName === "通路";
    });
    let typeType = vm.allTradingPartnersType.find((item) => {
      return item.TypeName === "型態";
    });
    vm.getTradingPartnersInfo(wayType.TypeId);
    vm.getTradingPartnersInfo(typeType.TypeId);

    /*---------------------------------------------------------------- */

    // vm.$store.commit("ISLOADING", true);

    // vm.axios
    //   .all([
    //     getAllCity(),
    //     getPayTerm(),
    //     vm.getCustomerTypes(),
    //     vm.getDepts(),
    //     vm.getSales(),
    //     vm.getBanks(),
    //     vm.getTradingPartnersType(),
    //     vm.getHeadquarter(),
    //   ])
    //   .then(
    //     vm.axios.spread(
    //       (
    //         allCity,
    //         allPayTerm,
    //         allCustomerTypes,
    //         allDepts,
    //         allSales,
    //         allBanks,
    //         allTradingPartnersType,
    //         allHeadquarter
    //       ) => {
    //         if (!allCity.data.ErrorMessage) {
    //           let cityName = Object.keys(allCity.data.Data.CityDistricts);
    //           let districts = Object.values(allCity.data.Data.CityDistricts);

    //           for (let i = 0; i < 99; i++) {
    //             if (!cityName[i]) break;

    //             // 每個鄉鎮加入縣市的屬性
    //             districts[i].forEach((dis) => {
    //               dis.CityName = cityName[i];
    //             });
    //           }
    //           let mergeCity = districts;

    //           vm.allPostalCodes = Object.values(mergeCity).flat(Infinity);
    //         }

    //         if (!allPayTerm.data.ErrorMessage) {
    //           vm.allPayTerm = allPayTerm.data.Data;
    //         }

    //         if (!allCustomerTypes.data.ErrorMessage) {
    //           vm.allCustomerTypes = allCustomerTypes.data.Data;
    //         }

    //         if (!allDepts.data.ErrorMessage) {
    //           vm.allDepts = allDepts.data.Data;
    //           vm.allDepts = vm.allDepts.map((dept) => {
    //             return {
    //               ...dept,
    //               DeptID: dept.DeptID.trim(),
    //             };
    //           });
    //         }

    //         if (!allSales.data.ErrorMessage) {
    //           vm.allSales = allSales.data.Data;
    //         }

    //         if (!allBanks.data.ErrorMessage) {
    //           vm.allBanks = allBanks.data.Data;
    //           vm.allBanks = vm.allBanks.map((bank) => {
    //             return {
    //               ...bank,
    //               customerLabel: `${bank.BankName}(${bank.BankID.trim()})`,
    //               BankID: bank.BankID.trim(),
    //             };
    //           });
    //         }

    //         if (!allTradingPartnersType.data.ErrorMessage) {
    //           vm.allTradingPartnersType = allTradingPartnersType.data.Data;

    //           let wayType = vm.allTradingPartnersType.find((item) => {
    //             return item.TypeName === "通路";
    //           });
    //           let typeType = vm.allTradingPartnersType.find((item) => {
    //             return item.TypeName === "型態";
    //           });
    //           vm.getTradingPartnersInfo(wayType.TypeId);
    //           vm.getTradingPartnersInfo(typeType.TypeId);
    //         }

    //         if (!allHeadquarter.data.ErrorMessage) {
    //           vm.allHeadquarter = allHeadquarter.data.Data;
    //           vm.allHeadquarter = vm.allHeadquarter.map((headquarter) => {
    //             return {
    //               CustomerShtName: headquarter.CustomerShtName,
    //               CustomerID: headquarter.CustomerID,
    //             };
    //           });
    //         }
    //       }
    //     )
    //   );

    // 清空分店和下單 Model 的資料。
    vm.$store.commit("CLOSEALLORDERDATA");
  },
  watch: {
    rows(n) {
      n.forEach((item) => {
        item.TypeCodeCN = item.TypeCode === "ZZ" ? "停用" : "在線";
      });
    },
  },
  computed: {
    ...mapState({
      rows: "customerRows",
    }),
    ...mapGetters(["saleInfo"]),
  },
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
  components: {
    CustomerForm,
    Pagination,
    CitySearch,
  },
};
</script>

<style lang="scss" scoped>
// element-ui 官方的樣式
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
/* 參考資料在 README.md */
/* 1.取消原本展開的旋轉動畫 */
/deep/ .el-table__expand-icon {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
/* 2.展開按鈕為點擊的樣式是加號帶邊框 */
/deep/ .el-table__expand-icon .el-icon-arrow-right:before {
  content: "\e6d9";
  border: 1px solid #ccc;
  padding: 1px;
}
/* 3.按鈕已點擊展開之後的樣式是減號帶邊框 */
/deep/ .el-table__expand-icon--expanded .el-icon-arrow-right:before {
  content: "\e6d8";
}
</style>
