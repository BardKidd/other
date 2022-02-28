import axios from "axios";
// import store from "@/store";
import { Notification } from "element-ui";

const api = axios;

// 攔截器---------------------------------------------------------------------------
api.defaults.timeout = 20000;
api.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (config) => {
    switch (config.data.Status) {
      case 400:
        Notification({
          title: "錯誤",
          message: config.data.ErrorMessage,
          type: "error",
          duration: 5000,
        });
        break;
    }
    return config;
  },
  // 跑 catch
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // alert("登入驗證已過期，請重新透過UOF登入<interceptors>");
          // window.location.href = "http://yahome-test.com.tw/HiqbioUOF/";
          break;
        case 403:
          Notification({
            title: "錯誤",
            message: "403-伺服器連線錯誤，請聯絡IT人員",
            type: "error",
            duration: 5000,
          });
          break;
        case 404:
          Notification({
            title: "錯誤",
            message: "404-無法找到此網址，請聯絡IT人員",
            type: "error",
            duration: 5000,
          });
          break;
        case 405:
          Notification({
            title: "錯誤",
            message: "405 Error",
            type: "error",
            duration: 5000,
          });
          break;
        case 415:
          Notification({
            title: "錯誤",
            message: "415 Error",
            type: "error",
            duration: 5000,
          });

          break;
        case 500:
          Notification({
            title: "錯誤",
            message: "500-系統程式發生錯誤，請聯絡程式人員",
            type: "error",
            duration: 5000,
          });
          break;
      }
    } else {
      Notification({
        title: "錯誤",
        message: "CORS-系統連不上，請確認網路狀況與環境問題",
        type: "error",
        duration: 5000,
      });
    }
    return Promise.reject(error);
  }
);

export default api;
