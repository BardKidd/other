import Vue from "vue";
import axios from "axios";
import Vuex from "vuex";
import print from "../printConsole/printConsole.js";
import { Notification } from "element-ui";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    headerTitle: "",
    isWelcome: false,
    isGoBack: false,
    singleData: [],
    isLoading: false,
    customerData: {}, // 客戶資訊
    customerRows: [], // 客戶 Rows
    sureProduct: [], // 這個命名是要跟 Modal 內的 confirmProduct 做區別。
    saleInfo: {
      // DeptCode: "23000",
      // EmpID: "H1010015",
      // EmpCName: "曾少斌",
      // ERP_SalesCode: "SHe0001",
      // Sales_Zone: "H_藥局組連",
    }, // 業務資訊 // 未串接 API 因此寫死
    token: "",
    loginMessage: "",
    UofUserGuid: "",
    branchStore: [], // 分店內容(含分店訂購品項)
    pendingOrderConcat: [], // 掛單合併
    IsHeadquartersOrder: true, // 是否為總店訂購
  },
  mutations: {
    // UOF 登入
    LOGIN(state, payload) {
      state.saleInfo = payload?.Sales;
      state.token = payload?.Token;
      state.UofUserGuid = payload?.UofUserGuid;
      localStorage.setItem("uofUserGuid", payload.UofUserGuid);
      localStorage.setItem("token", payload.Token);
      localStorage.setItem("saleInfo", JSON.stringify(payload.Sales));
    },
    LOGINMESSAGE(state, payload) {
      state.loginMessage = payload;
    },
    HEADER(state, payload) {
      state.headerTitle = payload;
    },
    // NavBar 顯示業務資訊
    ISWELCOME(state, payload) {
      state.isWelcome = payload;
    },
    // NavBar 顯示返回按鈕
    ISGOBACK(state, payload) {
      state.isGoBack = payload;
    },
    // Loading 特效
    ISLOADING(state, payload) {
      state.isLoading = payload;
    },
    // 客戶資料
    CUSTOMERDATA(state, payload) {
      payload.sliceUTypeName = payload.UTypeName.slice(0, 3);
      localStorage.setItem("customer", JSON.stringify(payload));
      state.customerData = payload;
    },
    // 搜尋出來的全部客戶資料
    CUSTOMERROWS(state, payload) {
      state.customerRows = payload;
    },
    // 目前下單 Modal 裡面已經確定購買的商品
    SUREPRODUCT(state, payload) {
      // 要放在 state 賦予值上面才有用
      localStorage.setItem("sureProduct", JSON.stringify(payload));
      state.sureProduct = payload;
    },
    // 改變分店資訊和新增一筆掛單資料時會觸發(總店)
    BRANCHSTORE(state, payload) {
      print("payload", payload);
      // 跟 DELBRANCHSTORE 基本上一樣
      // 如果有重複一筆資料就將該資料先刪除
      if (!payload.productData[0].IsPending) {
        let hasSame = false;
        state.branchStore.some((priorityBranch, key, branchArr) => {
          priorityBranch.productData.some((priorityProduct, index, arr) => {
            if (
              priorityProduct.StoreGuid === payload.productData[0].StoreGuid &&
              priorityProduct.ProductGuid === payload.productData[0].ProductGuid
            ) {
              arr.splice(index, 1);

              // 假如自己是最後一個，也把整個順便刪掉
              if (arr.length === 0) {
                branchArr.splice(key, 1);
              }
              hasSame = true;
              return true;
            }
          });
          if (hasSame) {
            return true;
          }
        });
      }

      state.branchStore.forEach((branch) => {
        // 檢查有的話相同的分店的話就把產品丟到他底下
        if (payload.store.CustomerID === branch.store.CustomerID) {
          branch.productData.push(payload.productData[0]);

          // 如果 productGuid 一樣，Row 的 Guid 也一樣。
          if (branch.Guid === payload.Guid) {
            branch.productData.some((item) => {
              // 如果也同樣是公關或訂購品項就代表真的有關聯。
              if (item.IsOrder) {
                if (item.ProductGuid === payload.productData[0].ProductGuid) {
                  item.orderQuantity = item.InvQty - payload.orderQuantity;
                  return true;
                }
              } else if (item.IsPR) {
                if (item.ProductGuid === payload.productData[0].ProductGuid) {
                  item.orderQuantity = item.InvQty - payload.orderQuantity;
                  return true;
                }
              }
            });
          }
        }
      });

      // 如果直接按 X 清除分店會沒辦法判斷商店資訊而直接新增一筆一樣 Guid 的資料。
      if (Object.prototype.hasOwnProperty.call(payload.store, "CustomerID")) {
        // 假如都沒有的話，就新增一家分店
        let hasBranch = state.branchStore.some(
          (branch) => payload.store.CustomerID === branch.store.CustomerID
        );
        if (!hasBranch) {
          state.branchStore.push(payload);
        }
      }

      localStorage.setItem("branchStore", JSON.stringify(state.branchStore));
    },
    // 整批掛單(總店)
    ENTIREBRANCHSTORE(state, payload) {
      let hasSame = false;
      state.branchStore.some((priorityBranch, key, branchArr) => {
        priorityBranch.productData.some((priorityProduct, index, arr) => {
          if (
            priorityProduct.StoreGuid === payload.productData[0].StoreGuid &&
            priorityProduct.ProductGuid === payload.productData[0].ProductGuid
          ) {
            arr.splice(index, 1);

            // 假如自己是最後一個，也把整個順便刪掉
            if (arr.length === 0) {
              branchArr.splice(key, 1);
            }
            hasSame = true;
            return true;
          }
        });
        if (hasSame) {
          return true;
        }
      });

      state.branchStore.forEach((branch) => {
        // 檢查有的話相同的分店的話就把產品丟到他底下
        if (payload.store.CustomerID === branch.store.CustomerID) {
          branch.productData.push(payload.productData[0]);
        }
      });

      // 假如都沒有的話，就新增一家分店
      let hasBranch = state.branchStore.some(
        (branch) => payload.store.CustomerID === branch.store.CustomerID
      );
      if (!hasBranch) {
        state.branchStore.push(payload);
      }

      localStorage.setItem("branchStore", JSON.stringify(state.branchStore));
    },
    //(總店)
    BRANCHCLOSE(state) {
      state.branchStore = [];
    },
    // 改變訂購數量時順便改變確認訂單內的數量(總店)
    CHANGEBRANCHQUANTITY(state, payload) {
      state.branchStore.forEach((branch) => {
        // 如果是相同產品的話
        branch.productData.some((item) => {
          if (item.StoreGuid === payload.productData[0].StoreGuid) {
            if (payload.productData[0].IsOrder) {
              if (item.ProductGuid === payload.productData[0].ProductGuid) {
                item.orderQuantity = payload.orderQuantity;
                item.warehousesNum = payload.warehousesNum;
                return true;
              }
            } else if (payload.productData[0].IsPR) {
              if (item.ProductGuid === payload.productData[0].ProductGuid) {
                item.orderQuantity = payload.orderQuantity;
                item.warehousesNum = payload.warehousesNum;
                return true;
              }
            }
          }
        });
      });

      localStorage.setItem("branchStore", JSON.stringify(state.branchStore));
    },
    // 刪除分店時觸發(總店)
    DELBRANCHSTORE(state, payload) {
      let hasSame = false;
      state.branchStore.some((priorityBranch, key, branchArr) => {
        priorityBranch.productData.some((priorityProduct, index, arr) => {
          if (
            priorityProduct.StoreGuid === payload.productData[0].StoreGuid &&
            priorityProduct.ProductGuid === payload.productData[0].ProductGuid
          ) {
            arr.splice(index, 1);

            // 假如自己是最後一個，也把整個順便刪掉
            if (arr.length === 0) {
              branchArr.splice(key, 1);
            }
            hasSame = true;
            return true;
          }
        });
        if (hasSame) {
          return true;
        }
      });
      localStorage.setItem("branchStore", JSON.stringify(state.branchStore));
    },
    // 將掛單與相關聯 Rows 合併(總店)
    PENDINGORDERCONCAT(state, payload) {
      localStorage.setItem("pendingOrderConcat", JSON.stringify(payload));
      state.pendingOrderConcat = payload;
    },

    // 送到確認訂單(單店)
    SENDBRANCHSTORE(state, payload) {
      localStorage.setItem("branchStore", JSON.stringify(payload));
      state.branchStore = payload;
    },
    // 清除所有跟訂購有關的資料
    CLOSEALLORDERDATA(state) {
      state.branchStore = [];
      state.customerData = {};
      state.pendingOrderConcat = [];
      state.sureProduct = [];
      state.customerRows = [];
      localStorage.removeItem("branchStore");
      localStorage.removeItem("sureProduct");
      localStorage.removeItem("pendingOrderConcat");
    },
  },
  actions: {
    // 登入
    login({ commit }, payload) {
      const url = `${process.env.VUE_APP_APIPATH}/Common/Auth/LoginSales`;
      return axios.post(url, payload).then((res) => {
        if (res.data.Data) {
          let obj = res.data.Data;
          obj.Sales.DeptCode = obj.Sales.DeptCode.trim();
          commit("LOGIN", obj);
        }
        commit("LOGINMESSAGE", res.data.ErrorMessage);
      });
    },
    // 登入後找不到使用者就註冊
    register({ commit }, payload) {
      const url = `${process.env.VUE_APP_APIPATH}/Common/Auth/RegisterSales`;
      return axios.post(url, payload).then((res) => {
        commit("LOGIN", res.data.Data);
        commit("LOGINMESSAGE", res.data.ErrorMessage);
      });
    },
    // 取得客戶資訊
    async getCustomer({ commit /*getters*/ }, payload) {
      // let url = `${process.env.VUE_APP_APIPATH}/User/Customer/GetCustomers?purchaseType=${payload.purchaseType}&salesCode=${getters.saleInfo.ERP_SalesCode}&keyword=${payload.keyword}&city=${payload.city}&district=${payload.district}&IsDeactivated=${payload.IsDeactivated}`;

      // commit("ISLOADING", true);

      if (!payload.customersData.ErrorMessage) {
        payload.customersData.Data.forEach((item) => {
          item.StoreType = item.HQCode ? "Headquarter" : "Single";
          item.StoreTypeCN = item.HQCode ? "連鎖" : "單店";
        });
        if (payload.customersData.Data.length === 0) {
          Notification({
            title: "提示",
            message: "未搜尋到任何客戶",
            type: "warning",
            duration: 3500,
          });
        }
        commit("CUSTOMERROWS", payload.customersData.Data);
      }

      // await axios
      //   .get(url)
      //   .then((res) => {
      //     if (!res.data.ErrorMessage) {
      //       res.data.Data.forEach((item) => {
      //         item.StoreType = item.HQCode ? "Headquarter" : "Single";
      //         item.StoreTypeCN = item.HQCode ? "連鎖" : "單店";
      //       });
      //       if (res.data.Data.length === 0) {
      //         Notification({
      //           title: "提示",
      //           message: "未搜尋到任何客戶",
      //           type: "warning",
      //           duration: 3500,
      //         });
      //       }
      //       commit("CUSTOMERROWS", res.data.Data);
      //     }
      //     commit("ISLOADING", false);
      //   })
      //   .catch(() => {
      //     commit("ISLOADING", false);
      //   });
    },
  },
  getters: {
    isLoading: (state) => state.isLoading,
    saleInfo: () => JSON.parse(localStorage.getItem("saleInfo")),
    customerData: () => JSON.parse(localStorage.getItem("customer")),
    token: (state) => state.token,
    isLogin: (state) => {
      if (state.saleInfo?.ERP_SalesCode) {
        return true;
      }
      return false;
    },
    loginMessage: (state) => state.loginMessage,

    // 用 getters 接收 localStorage 的值，不再各自元件接收，保持響應式
    confirmProduct() {
      return JSON.parse(localStorage.getItem("sureProduct"));
    },
  },
});
