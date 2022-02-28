export const AfterSaleProcessing = {
  data() {
    return {};
  },
  methods: {
    // 因為換貨有兩種 confirmProduct，所以依據傳入的變化
    // 把搜尋結果與以選取的商品合併後送出
    concatProduct(temp, confirm) {
      const vm = this;

      // tempCheck 存放搜尋結果所有被打勾的項目
      let tempCheck = [];
      vm[temp].forEach((product) => {
        product.cardQuantity = 1; // 因為後端也有個 OrderQuantity，所以購物車內填的數量就改叫 cardQuantity
        product.Guid = vm.Guid();
        if (product.IsConfirm) {
          tempCheck.push(product);
        }
      });

      // 把搜尋結果有打勾的商品和原本有購買的商品合併。
      if (!vm[confirm]) {
        vm[confirm] = []; // 一開始沒取到值會為 null
      }
      // 將本次變更的結果重新賦予。
      vm[confirm] = vm[confirm].concat(tempCheck);

      // 把剛剛異動的結果傳出去。
      if (tempCheck.length > 0) {
        vm.$nextTick(() => {
          // 清除搜尋結果
          vm[temp] = [];
          vm.keyData += 1;
        });
      } else {
        vm.$notify({
          title: "提示",
          message: "請至少選擇一種產品",
          type: "warning",
          duration: 3500,
        });
      }
    },
  },
};
