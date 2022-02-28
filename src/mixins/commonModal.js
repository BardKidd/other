// 未串接 API 所以改用直接引入 JSON 的方式
import productCategoryData from "@/data/Product/ProductCategory.json";
import whsesData from "@/data/Other/Whses.json";

// import productCategoryData from "@/commonAPI/productCategory.json";
export const commonModal = {
  data() {
    return {
      allProductCategory: [], // 全部產品系列
      allCategoryChild: [], // 全部產品分類
      allWhses: [], // 全部庫別
    };
  },
  methods: {
    // 取得商品系列及商品分類
    getAllProductCategory() {
      const vm = this;
      let url = `${process.env.VUE_APP_APIPATH}/Inventory/Product/GetProductCategory`;
      return vm.$http.get(url).catch(() => {
        vm.$store.commit("ISLOADING", false);
      });
    },
    // 取得庫別
    getAllWhses(/*saleDeptId*/) {
      const vm = this;
      vm.allWhses = whsesData.Data;

      // let url = `${process.env.VUE_APP_APIPATH}/Inventory/Whse/GetWhses/${saleDeptId}`;

      // vm.$store.commit("ISLOADING", true);

      // vm.$http
      //   .get(url)
      //   .then((res) => {
      //     vm.allWhses = res.data.Data;
      //     vm.$store.commit("ISLOADING", false);
      //   })
      //   .catch(() => {
      //     vm.$store.commit("ISLOADING", false);
      //   });
    },
  },
  mounted() {
    const vm = this;

    vm.allProductCategory = productCategoryData.Data;
    vm.allProductCategory.forEach((item) => {
      item.Code = item.Code.trim();
    });

    // vm.$store.commit("ISLOADING", true);
    // vm.axios.all([vm.getAllProductCategory()]).then(
    //   vm.axios.spread((allProductCategory) => {
    //     vm.allProductCategory = allProductCategory.data.Data;

    //     // vm.confirmProduct = vm.getsSureProduct;
    //     // Code 後面有一大片空白...
    //     vm.allProductCategory.forEach((item) => {
    //       item.Code = item.Code.trim();
    //     });
    //   })
    // );
    // vm.$store.commit("ISLOADING", false);
  },
};
