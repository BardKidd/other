<template>
  <article>
    <div class="filter-block">
      <div class="filter-field">
        <span class="title d-block"> 起始日 </span>
        <DatePicker
          v-model="searchBox.from"
          value-type="format"
          format="YYYY-MM-DD"
          placeholder="請選擇起始日期"
          class="commonSearchDate"
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
          @keyup.enter="getAllData"
          v-model="searchBox.keyword"
          placeholder="請輸入客戶代碼或名稱"
        />
      </div>
      <div class="filter-field">
        <span class="title"> 訂單狀態 </span>
        <select v-model="searchBox.status">
          <option value="">全部</option>
          <option value="Cancel">作廢</option>
          <!-- <option value="同意">同意</option> -->
          <option value="Reject">否決</option>
          <option value="Signin">簽核中</option>
          <!-- <option value="Draft">草稿</option> -->
        </select>
      </div>
      <div class="filter-btn-wrap">
        <button type="button" @click="getAllData" class="btn btn_primary">
          查詢
        </button>
      </div>
    </div>

    <el-table
      :data="rows.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="width: 100%"
    >
      <el-table-column :sortable="true" align="center" prop="Seq" label="項次">
      </el-table-column>
      <el-table-column
        :sortable="true"
        align="center"
        prop="OrderNumber"
        label="訂單編號"
      >
      </el-table-column>
      <el-table-column
        :sortable="true"
        align="center"
        prop="OrderDate"
        label="訂單日期"
      >
      </el-table-column>
      <el-table-column
        :sortable="true"
        align="center"
        prop="HQName"
        label="客戶名稱"
      >
      </el-table-column>
      <el-table-column
        :sortable="true"
        align="center"
        prop="OrderStatus"
        label="訂單狀態"
      >
      </el-table-column>
      <el-table-column label="" align="center">
        <template slot-scope="scope">
          <button
            type="button"
            class="btn btn_primary"
            @click="openModal(scope.row, 'copyOrder')"
          >
            複製訂單
          </button>
        </template>
      </el-table-column>
      <el-table-column label="" align="center">
        <template slot-scope="scope">
          <button
            type="button"
            class="btn btn_primary"
            @click="openModal(scope.row, 'viewDetail')"
          >
            觀看明細
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

    <ReadOnlyModal
      :IsViewDetail="IsViewDetail"
      :DeliveryTime="allDeliveryTime"
      :branchStore="branchStore"
    ></ReadOnlyModal>
  </article>
</template>
<script>
/* global $ */
import { commonFunction } from "@/mixins/commonFunction.js";
import ReadOnlyModal from "@/views/OrderManagement/OrderSearch/ReadonlySearchModal.vue";
// import { getDeliveryTime } from "@/commonAPI/api.js";
import Pagination from "@/components/CommonComponent/Pagination.vue";

// 未串接 API，所以直接引入 JSON 檔。
import OrderSearchData from "@/data/Customers/OrderSearch.json";
import Data1 from "@/data/Customers/OrderSearch1.json";
import Data2 from "@/data/Customers/OrderSearch2.json";
import deliveryTime from "@/data/Other/DeliveryTime.json";

export default {
  name: "OrderSearch",
  mixins: [commonFunction],
  data() {
    return {
      currentPage: 1,
      pageSize: 20,

      customer: {}, // 客戶資料
      rows: [],
      searchBox: {
        status: "",
        from: "",
        to: "",
        keyword: "",
      },

      allDeliveryTime: [
        { Code: "1", Name: "1.早上(09~12點)" },
        { Code: "2", Name: "2.中午(12~17點)" },
        { Code: "3", Name: "3.下午(17~20點)" },
        { Code: "4", Name: "4.不分時段" },
      ], // 取得送貨時段 // 未串接 API 故寫死

      branchStore: [], // 拆開掛單邏輯
      IsViewDetail: true, // 是否為觀看明細。

      tempSearchProduct: [], // 取得產品詳細資料的時候暫存的資料
      store: {}, // call 取得客戶資訊得到的商店資料。總店的資料，不是各分店。
      checkModalBranchData: [], // 總店的確認訂單各分店的其他資料。e.g. 送貨日期、送貨時段...
    };
  },
  methods: {
    getAllData() {
      const vm = this;
      vm.searchBox.from = !vm.searchBox.from ? "" : vm.searchBox.from;
      vm.searchBox.to = !vm.searchBox.to ? "" : vm.searchBox.to;

      vm.rows = OrderSearchData.Data;
      vm.rows.forEach((item, index) => {
        // 訂單項次
        item.Seq = index + 1;

        if (!item.OrderDate.match("T")) {
          // 訂單日期格式
          item.OrderDate = `${item.OrderDate.split("T")[0]} ${
            item.OrderDate.split("T")[1]
          }`;
        }

        // 訂單狀態
        switch (item.OrderStatus) {
          case "Adopt":
            item.OrderStatus = "通過";
            break;
          case "Cancel":
            item.OrderStatus = "作廢";
            break;
          case "Reject":
            item.OrderStatus = "否決";
            break;
          case "Signin":
            item.OrderStatus = "簽核中";
            break;
          case "Draft":
            item.OrderStatus = "草稿";
            break;
        }
      });

      // let url = `${process.env.VUE_APP_APIPATH}/Inventory/Order/GetOrders/${vm.saleInfo.EmpID}?status=${vm.searchBox.status}&from=${vm.searchBox.from}&to=${vm.searchBox.to}&keyword=${vm.searchBox.keyword}`;
      // vm.$store.commit("ISLOADING", true);
      // vm.$http
      //   .get(url)
      //   .then((res) => {
      //     if (res.data.Data.length === 0) {
      //       vm.$notify({
      //         title: "提示",
      //         message: "未搜尋到任何訂單",
      //         type: "warning",
      //         duration: 3500,
      //       });
      //       vm.$store.commit("ISLOADING", false);
      //       return false;
      //     }
      //     vm.rows = res.data.Data;
      //     vm.rows.forEach((item, index) => {
      //       // 訂單項次
      //       item.Seq = index + 1;

      //       // 訂單日期格式
      //       item.OrderDate = `${item.OrderDate.split("T")[0]} ${
      //         item.OrderDate.split("T")[1]
      //       }`;

      //       // 訂單狀態
      //       switch (item.OrderStatus) {
      //         case "Adopt":
      //           item.OrderStatus = "通過";
      //           break;
      //         case "Cancel":
      //           item.OrderStatus = "作廢";
      //           break;
      //         case "Reject":
      //           item.OrderStatus = "否決";
      //           break;
      //         case "Signin":
      //           item.OrderStatus = "簽核中";
      //           break;
      //         case "Draft":
      //           item.OrderStatus = "草稿";
      //           break;
      //       }
      //     });

      //     vm.rows.reverse();
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

    async openModal(customer, type) {
      const vm = this;

      // 後端提供的資料被包在 Customer 裡面，所以把他取出來，否則 NavBar 會出錯。
      vm.customer = {
        ...customer,
        CustomerFullName: customer.Customer.CustomerFullName,
        CustomerID: customer.Customer.CustomerID,
        CustomerShtName: customer.Customer.CustomerShtName,
        FAX_NO: customer.Customer.FAX_NO,
        UTypeName: customer.Customer.UTypeName,
        isHeadquarters: customer.ChainOrder ? true : false,
      };

      // 雖然也是取得客戶資料，但跟複製功能的不一樣參數
      if (!vm.customer.IsHeadquarterInvoice && type === "viewDetail") {
        // 分店分別寄送時不會有左邊區塊資料，所以要 call 取得客戶 API 來取得資料
        let searchBox = {
          keyword: vm.customer.HQCode,
          city: "",
          district: "",
          purchaseType: "",
          IsDeactivated: "",
        };

        // action 也有 await 才會等待跑完。
        await vm.$store.dispatch("getCustomer", searchBox);
      }
      // 這裡把 vm.customer 傳給 Vuex，是因為觀看明細需要這些資料，複製訂單需要的屬性會在之後增加完。
      vm.$store.commit("CUSTOMERDATA", vm.customer);
      if (type === "viewDetail") {
        await vm.viewDetailData(customer.OrderId, "viewDetail");
      } else if (type === "copyOrder") {
        vm.viewDetailData(customer.OrderId, "copyOrder");
      }
    },

    // 取得訂單完整資訊
    viewDetailData(OrderId, type) {
      const vm = this;
      // let url = `${process.env.VUE_APP_APIPATH}/Inventory/Order/GetOrderDetail/${OrderId}`;
      // vm.$store.commit("ISLOADING", true);

      /* ----------------------------------------------- */
      vm.branchStore =
        OrderId === 2039
          ? Data2.Data.OrderStoreDetails
          : Data1.Data.OrderStoreDetails;

      // vm.branchStore = res.data.Data.OrderStoreDetails;
      vm.checkModalBranchData = []; // 底下用 push 的，所以每次打開都先清空資料

      // 一拿到就排序，除了單店訂購的複製訂單其他都適用，因為取得 API 順序的時間差，所以被 push 後位置可能又會亂掉，所以單店訂購會在跳頁前在 sort 一次。
      vm.sortProduct();

      vm.branchStore.forEach((branch) => {
        let subTotal = 0;
        // 取得分店其他資訊
        let branchOtherData = {
          Memo: branch.BranchRemark, // 分店備註
          ReceiveAddress: branch.ReceiveAddress, // 分店收貨地址
          ReceiveContact: branch.ReceiveContact, // 收貨人聯絡電貨
          ReceiveName: branch.ReceiveName, // 收獲人名稱

          DeliveryDate: branch.DeliveryDate.split("T")[0],
          DeliveryTime: branch.DeliveryTimeCode, // 這個是代號，所以進去購物車頁面時要去撈整包資料
          CustomerId: branch.CustomerId, // 用這個去判斷要丟入哪間分店

          InvoiceAddress: branch.InvoiceAddress, // 發票地址
          AttachInvoice: branch.InvoiceAttached, // 隨貨附發票
          InvoiceContact: branch.InvoiceContact, // 發票收件人電話
          InvoiceName: branch.InvoiceName, // 發票收件人名稱
          PayTermCode: branch.Payment, // 付款方式
          TaxId: branch.TaxID, // 統一編號
          NotTaxId: !branch.WithTaxID, // 不開統編，true 是開統編的意思

          Subtotal:
            Number(
              branch.ProductDtos.map((price) => (subTotal += price.Subtotal))
            ) +
            branch.Charge +
            branch.Fare, // 分店總計
        };
        vm.checkModalBranchData.push(branchOtherData);
      });

      vm.IsViewDetail = type === "viewDetail" ? true : false;

      // 觀看明細
      if (vm.IsViewDetail) {
        this.print("原始資料", vm.branchStore);

        vm.branchStore = vm.branchStore.map((branch) => {
          return {
            productData: branch.ProductDtos,
            branchData: {
              TotalQty: branch.TotalQty,
              DeliveryDate: branch.DeliveryDate,
              DeliveryTimeCode: branch.DeliveryTimeCode,
              ReceiveName: branch.ReceiveName,
              ReceiveContact: branch.ReceiveContact,
              ReceiveAddress: branch.ReceiveAddress,
              Charge: branch.Charge,
              Fare: branch.Fare,
              BranchRemark: branch.BranchRemark,
              Payment: branch.Payment,
              InvoiceAttached: branch.InvoiceAttached,
              InvoiceContact: branch.InvoiceContact,
              InvoiceName: branch.InvoiceName,
              InvoiceAddress: branch.InvoiceAddress,
              TaxID: branch.TaxID,
              WithTaxID: !branch.WithTaxID,
            },
            store: {
              CustomerShtName: branch.CustomerName,
              CustomerId: branch.CustomerId,
              OrderId: branch.OrderId,
            },
          };
        });
        $("#readonlycheck").modal("show");
        vm.$store.commit("ISLOADING", false);
      }
      // 複製訂單
      else {
        vm.tempSearchProduct = []; // 清除舊資料

        this.$notify({
          title: "提示",
          message: "此功能關閉中，因為無法取得分店 API",
          type: "warning",
          duration: 3500,
        });
        // this.print("複製訂單資料", vm.branchStore);
      }
      /* ------------------------------------------------- */

      // vm.$http
      //   .get(url)
      //   .then((res) => {

      //     if(OrderId === 2039) {
      //       vm.branchStore = Data2.Data
      //     }
      //     // vm.branchStore = res.data.Data.OrderStoreDetails;
      //     vm.checkModalBranchData = []; // 底下用 push 的，所以每次打開都先清空資料

      //     // 一拿到就排序，除了單店訂購的複製訂單其他都適用，因為取得 API 順序的時間差，所以被 push 後位置可能又會亂掉，所以單店訂購會在跳頁前在 sort 一次。
      //     vm.sortProduct();

      //     vm.branchStore.forEach((branch) => {
      //       let subTotal = 0;
      //       // 取得分店其他資訊
      //       let branchOtherData = {
      //         Memo: branch.BranchRemark, // 分店備註
      //         ReceiveAddress: branch.ReceiveAddress, // 分店收貨地址
      //         ReceiveContact: branch.ReceiveContact, // 收貨人聯絡電貨
      //         ReceiveName: branch.ReceiveName, // 收獲人名稱

      //         DeliveryDate: branch.DeliveryDate.split("T")[0],
      //         DeliveryTime: branch.DeliveryTimeCode, // 這個是代號，所以進去購物車頁面時要去撈整包資料
      //         CustomerId: branch.CustomerId, // 用這個去判斷要丟入哪間分店

      //         InvoiceAddress: branch.InvoiceAddress, // 發票地址
      //         AttachInvoice: branch.InvoiceAttached, // 隨貨附發票
      //         InvoiceContact: branch.InvoiceContact, // 發票收件人電話
      //         InvoiceName: branch.InvoiceName, // 發票收件人名稱
      //         PayTermCode: branch.Payment, // 付款方式
      //         TaxId: branch.TaxID, // 統一編號
      //         NotTaxId: !branch.WithTaxID, // 不開統編，true 是開統編的意思

      //         Subtotal:
      //           Number(
      //             branch.ProductDtos.map(
      //               (price) => (subTotal += price.Subtotal)
      //             )
      //           ) +
      //           branch.Charge +
      //           branch.Fare, // 分店總計
      //       };
      //       vm.checkModalBranchData.push(branchOtherData);
      //     });

      //     vm.IsViewDetail = type === "viewDetail" ? true : false;

      //     // 觀看明細
      //     if (vm.IsViewDetail) {
      //       this.print("原始資料", vm.branchStore);

      //       vm.branchStore = vm.branchStore.map((branch) => {
      //         return {
      //           productData: branch.ProductDtos,
      //           branchData: {
      //             TotalQty: branch.TotalQty,
      //             DeliveryDate: branch.DeliveryDate,
      //             DeliveryTimeCode: branch.DeliveryTimeCode,
      //             ReceiveName: branch.ReceiveName,
      //             ReceiveContact: branch.ReceiveContact,
      //             ReceiveAddress: branch.ReceiveAddress,
      //             Charge: branch.Charge,
      //             Fare: branch.Fare,
      //             BranchRemark: branch.BranchRemark,
      //             Payment: branch.Payment,
      //             InvoiceAttached: branch.InvoiceAttached,
      //             InvoiceContact: branch.InvoiceContact,
      //             InvoiceName: branch.InvoiceName,
      //             InvoiceAddress: branch.InvoiceAddress,
      //             TaxID: branch.TaxID,
      //             WithTaxID: !branch.WithTaxID,
      //           },
      //           store: {
      //             CustomerShtName: branch.CustomerName,
      //             CustomerId: branch.CustomerId,
      //             OrderId: branch.OrderId,
      //           },
      //         };
      //       });
      //       $("#readonlycheck").modal("show");
      //       vm.$store.commit("ISLOADING", false);
      //     }
      //     // 複製訂單
      //     else {
      //       vm.tempSearchProduct = []; // 清除舊資料

      //       this.print("複製訂單資料", vm.branchStore);
      //     }
      //   })
      //   .then(() => {
      //     if (!vm.IsViewDetail) {
      //       vm.getCustomerData();
      //     }
      //   })
      //   .catch(() => {
      //     vm.$store.commit("ISLOADING", false);
      //   });
    },

    async getCustomerData() {
      const vm = this;
      // 是否為總店，這裡後端是送文字
      let isHeadquarters = vm.customer.ChainOrder ? "Headquarter" : "Single";

      let url = `${process.env.VUE_APP_APIPATH}/User/Customer/GetCustomers?salesCode=${vm.saleInfo.ERP_SalesCode}&keyword=${vm.customer.Customer.CustomerFullName}&purchaseType=${isHeadquarters}`;

      // 取得客戶資訊
      await vm.$http
        .get(url)
        .then((res) => {
          vm.store = res.data.Data[0];
          // 新增的屬性是等取得客戶資訊後才有的，所以這裡再傳一次。
          vm.customer = {
            ...vm.customer,
            InvoiceAddress: vm.store.Address,
            DeptID: vm.store.DeptID,
            TaxID: vm.store.TaxID,
            TEL_NO: vm.store.TEL_NO,
            Contact: vm.store.Contact,
          };
          vm.$store.commit("CUSTOMERDATA", vm.customer);
        })
        .catch(() => {
          vm.$store.commit("ISLOADING", false);
        });

      // 取完後取的產品資訊
      for (let branch of vm.branchStore) {
        for (let product of branch.ProductDtos) {
          await vm.getProductData(product);
        }
      }

      vm.$store.commit("ISLOADING", false);
      localStorage.setItem("routerFrom", "OrderSearch"); // 從哪裡過去的

      if (vm.customer.ChainOrder) {
        // 將分店分類到各產品中。
        await vm.sameProduct();
        // 送過去的資料 DetailRows 是顛倒的，所以會在購物車頁面做反轉。
        vm.$router.push({
          name: "AllMainStoreOrder",
          params: {
            confirmProduct: vm.tempSearchProduct,
            checkModalBranchData: vm.checkModalBranchData,
          },
        });
      } else {
        vm.tempSearchProduct.sort((a, b) => {
          return a.SerialNumber - b.SerialNumber;
        });
        // 同掛單相同 ProductGuid， 第二筆才去執行
        vm.tempSearchProduct.forEach((item, index, arr) => {
          if (index > 0) {
            if (
              item.ItemNo === arr[index - 1].ItemNo &&
              item.WhseID === arr[index - 1].WhseID
            ) {
              item.ProductGuid = arr[index - 1].ProductGuid;
            }
          }
        });

        vm.$router.push({
          name: "AllSingleStoreOrder",
          params: {
            confirmProduct: vm.tempSearchProduct,
            checkModalBranchData: vm.checkModalBranchData,
          },
        });
      }
    },

    // 取得訂單產品個別資料
    async getProductData(product) {
      const vm = this;

      // WhseID 不用 trim、ItemNo 要...
      let url = `${
        process.env.VUE_APP_APIPATH
      }/Inventory/Product/GetProducts?salesDeptId=${
        vm.saleInfo.DeptCode
      }&whseId=${product.WhseID}&productId=${product.ItemNo.trim()}`;

      let tempData = {};
      await vm.$http
        .get(url)
        .then((res) => {
          if (res.data.Data.length === 0) {
            vm.$notify({
              title: "錯誤",
              message: "該 DepId 查無資料，將無法取出產品",
              type: "error",
              duration: 3500,
            });
            return false;
          }
          if (vm.customer.ChainOrder) {
            // 增加一些屬性，總店訂購外面那層，不是 DetailRows，DetailRows 會再 watch 製作。
            tempData = {
              ...res.data.Data[0],
              IsOrder: product.Free ? false : true,
              IsPR: product.Free ? true : false,
              Free: product.Free, // 進入購物車不會用到，但會在之後的判斷用到。
              ProductGuid: vm.Guid(),
              DetailRows: [],
              totalQuantityInfo: { totalQuantity: 1, templateId: 0 },
            };
          } else {
            // 總店、單店格式不一樣，所以需要調整一下屬性。
            tempData = {
              ...res.data.Data[0],
              IsOrder: product.Free ? false : true,
              IsPR: product.Free ? true : false,
              ProductGuid: vm.Guid(),
              IsPartialDelivery: product.PartialDelivery,
              orderQuantity: product.OrderQTY,
              warehousesNum: product.DepositQTY,
              IsPending:
                product.PendingTo || product.PartialDeliveryQTY === 0
                  ? false
                  : true,
              SerialNumber: product.SerialNumber, // 送出前排序會用到
            };
          }
        })
        .then(() => {
          if (vm.customer.ChainOrder) {
            // 這裡會模擬總店訂購購物車的 rows 的結構。
            // 第一筆直接 push 進來
            if (vm.tempSearchProduct.length === 0) {
              vm.tempSearchProduct.push(tempData);
            } else {
              // 是否有相同資料的 flag
              let hasSameProduct = false;
              vm.tempSearchProduct.forEach((item, key, arr) => {
                // 如果有一樣的就為 true。用是否為公關品、庫別、品號判斷。
                if (
                  arr[key].ItemNo === product.ItemNo &&
                  arr[key].WhseID === product.WhseID &&
                  arr[key].Free === product.Free
                ) {
                  hasSameProduct = true;
                }
                // 如果已經為最後一個了但還沒有相同資料就把他 push 進來。
                if (arr.length - 1 === key) {
                  if (!hasSameProduct) {
                    vm.tempSearchProduct.push(tempData);
                  }
                }
              });
            }
          } else {
            // 單店訂購不須排除重複商品
            vm.tempSearchProduct.push(tempData);
          }
        })
        .catch(() => {
          vm.$store.commit("ISLOADING", false);
        });
    },

    // 製作符合總店購物車的 DetailRows 資料。
    sameProduct() {
      const vm = this;
      vm.branchStore.forEach((branch) => {
        branch.ProductDtos.forEach((product) => {
          vm.tempSearchProduct.forEach((item, index) => {
            if (
              item.ItemNo === product.ItemNo &&
              item.WhseID === product.WhseID &&
              item.Free === product.Free
            ) {
              // 這裡存放暫時的分店 Id，等進入購物車後再從整包分店撈取完整分店資料
              let tempStore = branch.CustomerId;
              let tempProduct = {
                productData: [
                  {
                    ...product,
                  },
                ],
                Guid: vm.Guid(),
                store: tempStore,
                orderQuantity: product.OrderQTY,
                warehousesNum: product.DepositQTY,
                IsPartialDelivery: product.PartialDelivery,
                IsPending:
                  product.PendingTo || product.PartialDeliveryQTY === 0
                    ? false
                    : true,
              };

              // 分批的掛單一定會有第二筆，如果是分批的掛單兩個 Guid 要一樣。
              if (item.DetailRows?.length > 1 && index > 0) {
                // this.print("1", item.DetailRows[index]);
                // this.print("0", item.DetailRows[index - 1].store);
                if (
                  product.ItemNo ===
                    item.DetailRows[index - 1].productData[0].ItemNo &&
                  product.WhseID ===
                    item.DetailRows[index - 1].productData[0].WhseID &&
                  item.DetailRows[index]?.store ===
                    item.DetailRows[index - 1]?.store
                ) {
                  tempProduct = {
                    ...tempProduct,
                    Guid: item.DetailRows[index - 1].Guid,
                  };
                }
              }
              item.DetailRows.push(tempProduct);
            }
          });
        });
      });
    },

    // 產品排序
    // 取得後端的資料時，不一定跟你送出時的順序一樣，但可以用 SerialNumber 屬性來重新排序
    sortProduct() {
      const vm = this;
      vm.branchStore.forEach((branch) => {
        branch.ProductDtos.sort((a, b) => {
          return a.SerialNumber - b.SerialNumber;
        });
      });
    },
  },
  mounted() {
    const vm = this;
    vm.$store.commit("HEADER", "訂單查詢");
    vm.$store.commit("ISWELCOME", true);
    vm.$store.commit("ISGOBACK", false);
    // 取得兩周前的天數
    let twoWeekDate = new Date().getTime() - 15 * 24 * 3600 * 1000;
    let twoWeekDateYear = new Date(twoWeekDate).getFullYear();
    let twoWeekDateMonth = vm.AddZero(new Date(twoWeekDate).getMonth() + 1);
    let twoWeekDateDate = vm.AddZero(new Date(twoWeekDate).getDate());
    let twoWeekStr = `${twoWeekDateYear}-${twoWeekDateMonth}-${twoWeekDateDate}`;

    // 如果從訂購完成頁面來的話會帶資料
    if (vm.$route.params.OrderSearchParams) {
      vm.searchBox = {
        status: vm.$route.params.OrderSearchParams,
        from: vm.today,
        to: vm.today,
        keyword: "",
      };
    } else {
      vm.searchBox = {
        status: "",
        from: twoWeekStr,
        to: vm.today,
        keyword: "",
      };
    }
    // vm.$store.commit("ISLOADING", true);
    // 清空表單資料。
    vm.$store.commit("CLOSEALLORDERDATA");

    vm.allDeliveryTime = deliveryTime.Data;
    vm.getAllData();
    /*vm.axios.all([getDeliveryTime(), vm.getAllData()]).then(
      vm.axios.spread((allDeliveryTime) => {
        vm.allDeliveryTime = allDeliveryTime.data.Data;
        vm.$store.commit("ISLOADING", false);
      })
    );*/
  },

  watch: {
    // 有業務資訊才 call 這支 API。
    saleInfo() {
      const vm = this;
      vm.getAllData();
    },
  },
  computed: {
    // 業務資訊
    saleInfo() {
      const vm = this;
      return (
        JSON.parse(localStorage.getItem("saleInfo")) || vm.$store.state.saleInfo
      );
    },
  },
  components: {
    ReadOnlyModal,
    Pagination,
  },
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
