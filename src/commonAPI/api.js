// 這裡放通用的 API，也就是很多頁面都會 call 的。
import axios from "axios";
import store from "@/store";

// 因為未串接 API，所以將資料提取出來
// import cityData from "./citySearch.json";

// 取得地區
export const getAllCity = () => {
  // const vm = this;
  let url = `${process.env.VUE_APP_APIPATH}/User/Customer/GetCity`;
  return axios.get(url).catch(() => {
    store.commit("ISLOADING", false);
  });
  // return cityData;
};

// 取得送貨時段(訂單確認用)
export const getDeliveryTime = () => {
  // const vm = this;
  let url = `${process.env.VUE_APP_APIPATH}/User/Customer/GetDeliveryTime`;
  return axios.get(url).catch(() => {
    store.commit("ISLOADING", false);
  });
};

// 取得手續費(訂單確認用)
export const getCharge = (DeptCode) => {
  // const vm = this;
  let url = `${process.env.VUE_APP_APIPATH}/User/Customer/GetCharge/${DeptCode}`;
  return axios.get(url).catch(() => {
    store.commit("ISLOADING", false);
  });
};

// 取得運費(訂單確認用)
export const getFreight = (DeptCode) => {
  // const vm = this;
  let url = `${process.env.VUE_APP_APIPATH}/User/Customer/GetFreight/${DeptCode}`;
  return axios.get(url).catch(() => {
    store.commit("ISLOADING", false);
  });
};

// 取得客戶部門所記錄的送貨保留日(訂單確認用)
export const getDeliveryDate = (DeptID) => {
  // const vm = this;
  let url = `${process.env.VUE_APP_APIPATH}/User/Customer/GetDeliveryRetentionDays/${DeptID}`;
  return axios.get(url).catch(() => {
    store.commit("ISLOADING", false);
  });
};

// 取得付款方式
export const getPayTerm = () => {
  // const vm = this;
  let url = `${process.env.VUE_APP_APIPATH}/User/Customer/GetPayTerm`;
  return axios.get(url).catch(() => {
    store.commit("ISLOADING", false);
  });
};

// 取得退貨原因
export const getReturnReason = () => {
  // const vm = this;
  const url = `${process.env.VUE_APP_APIPATH}/Inventory/Return/GetReturnReason`;
  return axios.get(url).catch(() => {
    store.commit("ISLOADING", false);
  });
};
