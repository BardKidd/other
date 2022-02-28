<template>
  <div class="table-wrap mb-3" :key="keyData">
    <table class="w-100 common-datatable datatable stripe order-column">
      <thead>
        <tr class="text-center">
          <th>品號</th>
          <th class="tdShort">品名/規格</th>
          <th v-if="!isDisabled">可退貨的數量</th>
          <th>退貨數量</th>
          <th>單價(含稅)</th>
          <th>小計(含稅)</th>
          <th v-if="!isDisabled"><!-- 移除 --></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) of allProduct" :key="product.Guid">
          <td>{{ product.ProductId }}</td>
          <td class="tdShort">
            {{ product.ProductName }}/{{ product.Specification }}
          </td>
          <td class="text-center" v-if="!isDisabled">
            {{ product.ReturnableQuantity }}
          </td>
          <VP
            tag="td"
            name="退貨數量"
            :rules="`max_value:${product.ReturnableQuantity}|min_value:1`"
          >
            <input
              class="w-100"
              type="number"
              max="999"
              min="1"
              :disabled="isDisabled"
              placeholder="請輸入數量"
              v-model.number="product.cardQuantity"
              @keyup="checkQuantity(product)"
              @change="checkQuantity(product)"
            />
          </VP>
          <td class="text-center">{{ product.UnitPrice }}</td>
          <td class="text-center">
            {{ parseInt(product.cardQuantity * product.UnitPrice) }}
          </td>
          <td v-if="!isDisabled">
            <button
              type="button"
              class="btn btn_danger"
              @click="delItem(index)"
            >
              移除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/* global $ */
export default {
  name: "AllExchangeReturn",
  props: {
    returnRows: {
      type: Array,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      allProduct: [], // 傳進來的訂購品項
      currentObj: {}, // 正在操作的該項產品

      keyData: 1, // 偵測渲染用
    };
  },
  methods: {
    // 檢查數量，假如大於庫存就顯示 Modal
    checkQuantity(product) {
      const vm = this;

      // 因為 table 標籤裡面只能放相關的標籤，所已把單一項的資料傳到這個物件裡。
      vm.currentObj = { ...product };

      // 畫面總數 > 庫存量和相減數量小於 0 就跳出庫存不足
      if (vm.currentObj.cardQuantity > vm.currentObj.ReturnableQuantity) {
        product.cardQuantity = vm.currentObj.ReturnableQuantity;
        vm.$notify({
          title: "提示",
          message: "退貨數量不得大於可退貨數量",
          type: "warning",
          duration: 3500,
        });
      }

      vm.$emit("getAllReturnQTY");
    },
    delItem(index) {
      const vm = this;
      vm.allProduct.splice(index, 1);
      vm.$store.commit("SUREPRODUCT", vm.allProduct);
    },
  },
  watch: {
    returnRows(n) {
      const vm = this;
      vm.allProduct = n;
    },
  },
  mounted() {
    const vm = this;
    vm.allProduct = vm.returnRows;
  },
  components: {},
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
