import Vue from "vue";
import VueRouter from "vue-router";
// import store from "@/store";

// 未串接 API 所以改用引入 JSON 的方式
import saleInfoData from "@/data/Other/SaleInfo.json";

Vue.use(VueRouter);

// 解決重復點擊路由報錯的BUG
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routerObj = new VueRouter({
  routes: [
    {
      path: "/admin",
      name: "L-Page",
      component: () =>
        import(/* webpackChunkName: "L-Page" */ "@/views/Layout/L-Page.vue"),
      children: [
        {
          path: "mainstoreorder",
          name: "MainStoreOrder",
          component: () =>
            import(
              /* webpackChunkName: "MainStoreOrder" */ "@/views/OrderManagement/MainStoreOrder/MainStoreOrder.vue"
            ),
        },
        {
          path: "allmainstoreorder",
          name: "AllMainStoreOrder",
          component: () =>
            import(
              /* webpackChunkName: "AllMainStoreOrder" */
              "@/views/OrderManagement/AllMainStoreOrder/AllMainStoreOrder.vue"
            ),
        },
        {
          path: "singlestoreorder",
          name: "SingleStoreOrder",
          component: () =>
            import(
              /* webpackChunkName: "SingleStoreOrder" */
              "@/views/OrderManagement/SingleStoreOrder/SingleStoreOrder.vue"
            ),
        },
        {
          path: "ordersearch",
          name: "OrderSearch",
          component: () =>
            import(
              /* webpackChunkName: "OrderSearch" */
              "@/views/OrderManagement/OrderSearch/OrderSearch.vue"
            ),
        },
        {
          path: "returnwork",
          name: "ReturnWork",
          component: () =>
            import(
              /* webpackChunkName: "ReturnWork" */
              "@/views/ReturnManagement/ReturnWork/ReturnWork.vue"
            ),
        },
        {
          path: "allreturnwork",
          name: "AllReturnWork",
          component: () =>
            import(
              /* webpackChunkName: "AllReturnWork" */
              "@/views/ReturnManagement/AllReturnWork/AllReturnWork.vue"
            ),
        },
        {
          path: "exchangejob",
          name: "ExchangeJob",
          component: () =>
            import(
              /* webpackChunkName: "ExchangeJob" */
              "@/views/ReturnManagement/ExchangeJob/ExchangeJob.vue"
            ),
        },
        {
          path: "allexchangejob",
          name: "AllExchangeJob",
          component: () =>
            import(
              /* webpackChunkName: "AllExchangeJob" */
              "@/views/ReturnManagement/AllExchangeJob/AllExchangeJob.vue"
            ),
        },
        {
          path: "searchreturnorder",
          name: "SearchReturnOrder",
          component: () =>
            import(
              /* webpackChunkName: "SearchExchangeOrder" */
              "@/views/ReturnManagement/SearchReturnOrder/SearchReturnOrder.vue"
            ),
        },
        {
          path: "pickupwork",
          name: "PickUpWork",
          component: () =>
            import(
              /* webpackChunkName: "PickUpWork" */
              "@/views/WareHouse/PickUpWork/PickUpWork.vue"
            ),
        },
        {
          path: "allpickupwork",
          name: "AllPickUpWork",
          component: () =>
            import(
              /* webpackChunkName: "AllPickUpWork" */
              "@/views/WareHouse/AllPickUpWork/AllPickUpWork.vue"
            ),
        },
        {
          path: "warehouseexchange",
          name: "WareHouseExchange",
          component: () =>
            import(
              /* webpackChunkName: "WareHouseExchange" */
              "@/views/WareHouse/WareHouseExchange/WareHouseExchange.vue"
            ),
        },
        {
          path: "allwarehouseexchange",
          name: "AllWareHouseExchange",
          component: () =>
            import(
              /* webpackChunkName: "AllWareHouseExchange" */
              "@/views/WareHouse/AllWareHouseExchange/AllWareHouseExchange.vue"
            ),
        },
        {
          path: "searchwarehouse",
          name: "SearchWareHouse",
          component: () =>
            import(
              /* webpackChunkName: "SearchWareHouse" */
              "@/views/WareHouse/SearchWareHouse/SearchWareHouse.vue"
            ),
        },
        {
          path: "customerdata",
          name: "CustomerData",
          component: () =>
            import(
              /* webpackChunkName: "CustomerData" */
              "@/views/CustomerData/CustomerData.vue"
            ),
        },
        {
          path: "orderfinish",
          name: "OrderFinish",
          component: () =>
            import(
              /* webpackChunkName: "OrderFinish" */
              "@/views/OrderFinish.vue"
            ),
        },
        {
          path: "allsinglestoreorder",
          name: "AllSingleStoreOrder",
          component: () =>
            import(
              /* webpackChunkName: "AllSingleStoreOrder" */
              "@/views/OrderManagement/AllSingleStoreOrder/AllSingleStoreOrder.vue"
            ),
        },
        // {
        //   path: "singlestoreordercheck",
        //   name: "SingleStoreOrderCheck",
        //   component: () =>
        //     import(
        //       /* webpackChunkName: "SingleStoreOrderCheck" */
        //       "@/views/OrderManagement/SingleStoreOrderCheck.vue"
        //     ),
        // },
      ],
    },
    {
      path: "*",
      redirect: "/admin/mainstoreorder",
    },
  ],
});

routerObj.beforeEach((to, from, next) => {
  localStorage.setItem("saleInfo", JSON.stringify(saleInfoData));
  next();
  // const isLogin = store.getters["isLogin"];
  // // 如果未登入
  // if (!isLogin) {
  //   // r 為帳號、p 為時間
  //   let qryParams = {};
  //   // 後端說不需 decode，但 query 好像自動幫我 decode 了...
  //   if (to.query.r && to.query.p) {
  //     qryParams = {
  //       Account: encodeURIComponent(to.query.r),
  //       LogInTime: encodeURIComponent(to.query.p),
  //     };
  //   } else if (from.query.r && to.query.p) {
  //     qryParams = {
  //       Account: encodeURIComponent(from.query.r),
  //       LogInTime: encodeURIComponent(from.query.p),
  //     };
  //   }
  //   if (qryParams.Account && qryParams.LogInTime) {
  //     store.dispatch("login", qryParams).then(() => {
  //       let saleInfo = store.getters["saleInfo"];
  //       let loginMessage = store.getters["loginMessage"];
  //       if (saleInfo && !loginMessage) {
  //         next();
  //       }
  //       // 幫他註冊，且錯誤資訊不是以下文字
  //       if (
  //         loginMessage &&
  //         loginMessage !== "登入驗證已過期，請重新透過UOF登入"
  //       ) {
  //         store.dispatch("register", qryParams).then(() => {
  //           saleInfo = store.getters["saleInfo"];
  //           if (saleInfo) {
  //             next();
  //           }
  //         });
  //       }
  //       // 逾時登入且不是 401 時
  //       if (loginMessage === "登入驗證已過期，請重新透過UOF登入") {
  //         alert("登入驗證已過期，請重新透過UOF登入<router>");
  //         window.location.href = "http://yahome-test.com.tw/HiqbioUOF/";
  //       }
  //     });
  //   } else if (localStorage.getItem("token")) {
  //     next();
  //   } else {
  //     // 直接輸入網址過來
  //     alert("請先透過UOF登入");
  //     window.location.href = "http://yahome-test.com.tw/HiqbioUOF/";
  //   }
  // } else {
  //   next();
  // }
});
export default routerObj;
